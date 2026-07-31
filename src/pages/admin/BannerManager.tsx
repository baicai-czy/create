import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const API = 'http://localhost:8080/api/v1';
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('auth_token')}` });

interface Banner { id: number; image: string; title: string; subtitle: string; description: string; link_url: string; link_text: string; secondary_link_url: string; secondary_link_text: string; sort: number; published: number; }

const emptyBanner: Partial<Banner> = { image: '', title: '', subtitle: '', description: '', link_url: '', link_text: '', secondary_link_url: '', secondary_link_text: '', sort: 0, published: 1 };

/* ===== 图片拖拽上传 ===== */
function ImageUploadArea({ editing, setEditing }: { editing: any; setEditing: (v: any) => void }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) { showToast('error', '请选择图片文件'); return; }
    if (file.size > 5 * 1024 * 1024) { showToast('error', '图片不能超过5MB'); return; }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API}/upload/banner`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
        body: formData,
      });
      const json = await res.json();
      if (json.code === 200) {
        const imageUrl = `http://localhost:8080${json.data.url}`;
        setEditing({ ...editing, image: imageUrl });
        showToast('success', '背景图上传成功');
      } else {
        showToast('error', json.message || '上传失败');
      }
    } catch {
      showToast('error', '上传失败，请检查网络');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const preview = editing.image;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">Banner背景图</label>
      {preview ? (
        <div className="relative group rounded-xl overflow-hidden border border-gray-200">
          <img src={preview} alt="Banner预览" className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button onClick={() => inputRef.current?.click()} className="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-100">更换图片</button>
            <button onClick={() => setEditing({ ...editing, image: '' })} className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600">删除</button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragging ? 'border-primary bg-primary-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500">上传中...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                {dragging ? <Upload className="w-6 h-6 text-primary" /> : <ImageIcon className="w-6 h-6 text-gray-400" />}
              </div>
              <p className="text-sm text-gray-600 font-medium">{dragging ? '松开鼠标上传图片' : '拖拽图片到此处，或点击上传'}</p>
              <p className="text-xs text-gray-400">支持 JPG/PNG/GIF/WebP，不超过5MB</p>
            </div>
          )}
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); e.target.value = ''; }} />
    </div>
  );
}

export default function BannerManager() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editing, setEditing] = useState<Partial<Banner> | null>(null);
  const { showToast } = useToast();

  const load = async () => {
    const res = await fetch(`${API}/banners/all`, { headers: h() });
    const json = await res.json();
    setBanners(json.data || []);
  };
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!editing || !editing.title) { showToast('error', '标题不能为空'); return; }
    const method = editing.id ? 'PUT' : 'POST';
    const url = editing.id ? `${API}/banners/${editing.id}` : `${API}/banners`;
    const res = await fetch(url, { method, headers: h(), body: JSON.stringify(editing) });
    if (res.ok) { showToast('success', editing.id ? 'Banner更新成功' : 'Banner创建成功'); setEditing(null); load(); }
    else showToast('error', '操作失败');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定删除此Banner？删除后不可恢复。')) return;
    await fetch(`${API}/banners/${id}`, { method: 'DELETE', headers: h() });
    showToast('success', 'Banner已删除'); load();
  };

  const fields: { key: keyof Banner; label: string; placeholder: string; type?: string }[] = [
    { key: 'title', label: '主标题', placeholder: '如：城际云 · 城市云服务专家' },
    { key: 'subtitle', label: '副标题', placeholder: '如：自主可控 · 安全可靠' },
    { key: 'description', label: '描述文字', placeholder: 'Banner下方的描述内容' },
    { key: 'link_text', label: '按钮1文字', placeholder: '如：免费咨询' },
    { key: 'link_url', label: '按钮1链接', placeholder: '如：/contact' },
    { key: 'secondary_link_text', label: '按钮2文字', placeholder: '如：了解更多' },
    { key: 'secondary_link_url', label: '按钮2链接', placeholder: '如：/about' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Banner管理</h1><p className="text-sm text-gray-500 mt-1">管理首页轮播图，支持排序和上下架</p></div>
        <button onClick={() => setEditing({...emptyBanner})} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-600 text-sm font-medium shadow-sm">
          <Plus className="w-4 h-4" /> 新增Banner
        </button>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">{editing.id ? '编辑Banner' : '新增Banner'}</h2>
              <button onClick={() => setEditing(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            {/* 图片上传区域 */}
            <ImageUploadArea editing={editing} setEditing={setEditing} />

            <div className="space-y-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                  <input value={(editing as any)[f.key] || ''} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} placeholder={f.placeholder} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none" />
                </div>
              ))}
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">排序</label>
                  <input type="number" value={editing.sort || 0} onChange={(e) => setEditing({ ...editing, sort: Number(e.target.value) })} className="w-24 px-4 py-2.5 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">发布状态</label>
                  <select value={editing.published ?? 1} onChange={(e) => setEditing({ ...editing, published: Number(e.target.value) })} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                    <option value={1}>已上架</option>
                    <option value={0}>已下架</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-gray-100">
              <button onClick={() => setEditing(null)} className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">取消</button>
              <button onClick={handleSave} className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm flex items-center gap-2 hover:bg-primary-600"><Save className="w-4 h-4" /> 保存</button>
            </div>
          </div>
        </div>
      )}

      {banners.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <Eye className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">暂无Banner，点击上方按钮新增</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-600">主标题</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">按钮文字</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">排序</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">状态</th>
                <th className="text-right px-5 py-3 font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((b) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-5 py-3.5 text-gray-800 font-medium max-w-[300px] truncate">{b.title}</td>
                  <td className="px-5 py-3.5 text-gray-500">{b.link_text || '-'} / {b.secondary_link_text || '-'}</td>
                  <td className="px-5 py-3.5 text-gray-500">{b.sort}</td>
                  <td className="px-5 py-3.5"><span className={`text-xs px-2 py-1 rounded-full font-medium ${b.published ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{b.published ? '已上架' : '已下架'}</span></td>
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={() => setEditing(b)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 mr-1" title="编辑"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(b.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500" title="删除"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

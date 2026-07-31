import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const API = 'http://localhost:8080/api/v1';
const headers = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('auth_token')}` });

interface Banner { id: number; image: string; title: string; subtitle: string; description: string; link_url: string; link_text: string; secondary_link_url: string; secondary_link_text: string; sort: number; published: number; }

export default function BannerManager() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editing, setEditing] = useState<Partial<Banner> | null>(null);
  const { showToast } = useToast();

  const load = async () => {
    const res = await fetch(`${API}/banners/all`, { headers: headers() });
    const json = await res.json();
    setBanners(json.data || []);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    const method = editing.id ? 'PUT' : 'POST';
    const url = editing.id ? `${API}/banners/${editing.id}` : `${API}/banners`;
    await fetch(url, { method, headers: headers(), body: JSON.stringify(editing) });
    showToast('success', editing.id ? '更新成功' : '创建成功');
    setEditing(null);
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定删除？')) return;
    await fetch(`${API}/banners/${id}`, { method: 'DELETE', headers: headers() });
    showToast('success', '已删除');
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Banner管理</h1>
        <button onClick={() => setEditing({ title: '', subtitle: '', description: '', link_url: '', link_text: '', secondary_link_url: '', secondary_link_text: '', sort: 0, published: 1 })} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 text-sm">
          <Plus className="w-4 h-4" /> 新增Banner
        </button>
      </div>

      {/* Edit modal */}
      {editing !== null && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{editing.id ? '编辑Banner' : '新增Banner'}</h2>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {['title', 'subtitle', 'description', 'link_url', 'link_text', 'secondary_link_url', 'secondary_link_text'].map((field) => (
                <div key={field}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{field}</label>
                  <input value={(editing as any)[field] || ''} onChange={(e) => setEditing({ ...editing, [field]: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary/10 outline-none" />
                </div>
              ))}
              <div className="flex gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">排序</label>
                  <input type="number" value={editing.sort || 0} onChange={(e) => setEditing({ ...editing, sort: Number(e.target.value) })} className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">状态</label>
                  <select value={editing.published ?? 1} onChange={(e) => setEditing({ ...editing, published: Number(e.target.value) })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                    <option value={1}>已发布</option>
                    <option value={0}>已下架</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">取消</button>
              <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center gap-2"><Save className="w-4 h-4" /> 保存</button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">标题</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">排序</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((b) => (
              <tr key={b.id} className="border-b border-gray-50">
                <td className="px-4 py-3 text-gray-800">{b.title}</td>
                <td className="px-4 py-3 text-gray-500">{b.sort}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${b.published ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{b.published ? '已发布' : '已下架'}</span></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditing(b)} className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(b.id)} className="p-1.5 hover:bg-red-50 rounded text-red-500"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

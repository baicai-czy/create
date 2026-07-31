import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const API = 'http://localhost:8080/api/v1';
const h = (hasBody = true) => {
  const headers: Record<string, string> = {};
  if (hasBody) headers['Content-Type'] = 'application/json';
  const t = localStorage.getItem('auth_token');
  if (t) headers['Authorization'] = `Bearer ${t}`;
  return headers;
};

export default function ProductManager() {
  const [list, setList] = useState<any[]>([]);
  const [edit, setEdit] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const load = async () => {
    try {
      const r = await fetch(`${API}/products/all`, { headers: h(false) });
      const json = await r.json();
      setList(json.data || []);
    } catch { setList([]); }
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!edit || !edit.name) { showToast('error', '产品名称不能为空'); return; }
    setSaving(true);
    try {
      const body = {
        ...edit,
        features: typeof edit.features === 'string' ? edit.features.split(/[,，]/).map((s: string) => s.trim()).filter(Boolean) : (edit.features || []),
      };
      const method = edit.id ? 'PUT' : 'POST';
      const url = edit.id ? `${API}/products/${edit.id}` : `${API}/products`;
      const res = await fetch(url, { method, headers: h(), body: JSON.stringify(body) });
      if (res.ok) { showToast('success', edit.id ? '产品更新成功' : '产品创建成功'); setEdit(null); load(); }
      else { const j = await res.json(); showToast('error', j.message || '保存失败'); }
    } catch { showToast('error', '服务器连接失败'); }
    finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('确定删除此产品？')) return;
    try { await fetch(`${API}/products/${id}`, { method: 'DELETE', headers: h() }); showToast('success', '已删除'); load(); }
    catch { showToast('error', '删除失败'); }
  };

  const cats = { general: '通用服务', ai: '智算服务', integration: '云集成服务', ops: '运维服务' };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">产品管理</h1><p className="text-sm text-gray-500 mt-1">管理产品与服务内容</p></div>
        <button onClick={() => setEdit({ name: '', category: 'general', description: '', features: '', icon: 'Server', published: 1, sort: 0 })} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-600 text-sm font-medium shadow-sm"><Plus className="w-4 h-4" /> 新增产品</button>
      </div>

      {edit !== null && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setEdit(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5"><h2 className="text-lg font-bold text-gray-900">{edit.id ? '编辑产品' : '新增产品'}</h2><button onClick={() => setEdit(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button></div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">产品名称 <span className="text-red-500">*</span></label><input value={edit.name || ''} onChange={e => setEdit({ ...edit, name: e.target.value })} placeholder="如：弹性云服务器" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none" /></div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">产品分类</label>
                <select value={edit.category || 'general'} onChange={e => setEdit({ ...edit, category: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                  {(Object.entries(cats) as [string, string][]).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">产品描述</label><textarea value={edit.description || ''} onChange={e => setEdit({ ...edit, description: e.target.value })} rows={3} placeholder="请描述产品功能..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none resize-y" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">产品特性（逗号分隔）</label><input value={edit.features || ''} onChange={e => setEdit({ ...edit, features: e.target.value })} placeholder="如：弹性伸缩, 按量付费, 多规格" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">图标名 (Lucide)</label><input value={edit.icon || 'Server'} onChange={e => setEdit({ ...edit, icon: e.target.value })} placeholder="如：Server, Cpu, HardDrive" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none" /></div>
              <div className="flex gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">排序</label><input type="number" value={edit.sort || 0} onChange={e => setEdit({ ...edit, sort: Number(e.target.value) })} className="w-24 px-4 py-2.5 border border-gray-200 rounded-lg text-sm" /></div>
                <div className="flex items-end pb-2"><label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={edit.published === 1} onChange={e => setEdit({ ...edit, published: e.target.checked ? 1 : 0 })} className="rounded" /> 发布</label></div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-gray-100">
              <button onClick={() => setEdit(null)} className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">取消</button>
              <button onClick={save} disabled={saving} className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm flex items-center gap-2 hover:bg-primary-600 disabled:opacity-50"><Save className="w-4 h-4" /> {saving ? '保存中...' : '保存'}</button>
            </div>
          </div>
        </div>
      )}

      {list.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center"><Eye className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">暂无产品，点击上方按钮新增</p></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm"><thead className="bg-gray-50 border-b"><tr><th className="text-left px-5 py-3 font-medium text-gray-600">名称</th><th className="text-left px-5 py-3 font-medium text-gray-600">分类</th><th className="text-left px-5 py-3 font-medium text-gray-600">状态</th><th className="text-right px-5 py-3 font-medium text-gray-600">操作</th></tr></thead>
            <tbody>{list.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-5 py-3.5 text-gray-800 font-medium">{p.name}</td>
                <td className="px-5 py-3.5 text-gray-500 text-xs">{(cats as any)[p.category] || p.category}</td>
                <td className="px-5 py-3.5"><span className={`text-xs px-2 py-1 rounded-full font-medium ${p.published ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{p.published ? '已发布' : '下架'}</span></td>
                <td className="px-5 py-3.5 text-right">
                  <button onClick={() => setEdit({ ...p, features: (Array.isArray(p.features) ? p.features : []).join(', ') })} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 mr-1" title="编辑"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => del(p.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500" title="删除"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}</tbody></table>
        </div>
      )}
    </div>
  );
}

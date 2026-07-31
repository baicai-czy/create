import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const API = 'http://localhost:8080/api/v1';
const hdrs = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('auth_token')}` });

export default function NewsManager() {
  const [news, setNews] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const { showToast } = useToast();

  const load = async () => { const r = await fetch(`${API}/news/admin/all`, { headers: hdrs() }); setNews((await r.json()).data || []); };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const method = editing.id ? 'PUT' : 'POST';
    const url = editing.id ? `${API}/news/${editing.id}` : `${API}/news`;
    await fetch(url, { method, headers: hdrs(), body: JSON.stringify({...editing, tags: editing.tags || []}) });
    showToast('success', editing.id ? '更新成功' : '创建成功');
    setEditing(null); load();
  };

  const del = async (id: number) => {
    if (!confirm('确定删除？')) return;
    await fetch(`${API}/news/${id}`, { method: 'DELETE', headers: hdrs() });
    showToast('success', '已删除'); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">新闻管理</h1>
        <button onClick={() => setEditing({ title: '', category: 'company', summary: '', content: '', tags: [], featured: false, published: true })} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 text-sm"><Plus className="w-4 h-4" /> 新增新闻</button>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{editing.id ? '编辑新闻' : '新增新闻'}</h2>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {[{k:'title',l:'标题',t:'text'},{k:'category',l:'分类',t:'select',opts:[{v:'company',l:'公司动态'},{v:'industry',l:'行业资讯'},{v:'notice',l:'通知公告'}]},{k:'summary',l:'摘要',t:'text'},{k:'content',l:'正文(Markdown)',t:'textarea'},{k:'tags',l:'标签(逗号分隔)',t:'text'}].map((f:any) => (
                <div key={f.k}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{f.l}</label>
                  {f.t === 'select' ? <select value={editing[f.k]||''} onChange={e => setEditing({...editing, [f.k]: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"><option value="">请选择</option>{f.opts.map((o:any) => <option key={o.v} value={o.v}>{o.l}</option>)}</select>
                  : f.t === 'textarea' ? <textarea value={editing[f.k]||''} onChange={e => setEditing({...editing, [f.k]: e.target.value})} rows={6} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  : <input type="text" value={editing[f.k]||''} onChange={e => setEditing({...editing, [f.k]: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />}
                </div>
              ))}
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.featured} onChange={e => setEditing({...editing, featured: e.target.checked})} /> 推荐</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.published??true} onChange={e => setEditing({...editing, published: e.target.checked})} /> 发布</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">取消</button>
              <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center gap-2"><Save className="w-4 h-4" /> 保存</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr><th className="text-left px-4 py-3">标题</th><th className="text-left px-4 py-3">分类</th><th className="text-left px-4 py-3">状态</th><th className="text-left px-4 py-3">时间</th><th className="text-right px-4 py-3">操作</th></tr>
          </thead>
          <tbody>
            {news.map((n) => (
              <tr key={n.id} className="border-b border-gray-50">
                <td className="px-4 py-3 max-w-xs truncate">{n.title}</td>
                <td className="px-4 py-3 text-xs">{n.category==='company'?'公司动态':n.category==='industry'?'行业资讯':'通知公告'}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${n.published?'bg-green-50 text-green-600':'bg-gray-100 text-gray-500'}`}>{n.published?'已发布':'草稿'}</span>{n.featured?<span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-500">推荐</span>:''}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{n.published_at?.slice(0,10)}</td>
                <td className="px-4 py-3 text-right"><button onClick={()=>setEditing({...n, tags:typeof n.tags==='string'?JSON.parse(n.tags||'[]').join(','):(n.tags||[]).join(',')})} className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Edit className="w-4 h-4"/></button><button onClick={()=>del(n.id)} className="p-1.5 hover:bg-red-50 rounded text-red-500"><Trash2 className="w-4 h-4"/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

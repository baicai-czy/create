import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const API = 'http://localhost:8080/api/v1';
const hdrs = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('auth_token')}` });

export default function NewsManager() {
  const [news, setNews] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const { showToast } = useToast();

  const load = async () => {
    const r = await fetch(`${API}/news/admin/all`, { headers: hdrs() });
    setNews((await r.json()).data || []);
  };
  useEffect(() => { load(); }, []);

  const formatTags = (tags: any): string => {
    if (!tags) return '';
    if (typeof tags === 'string') {
      try { return JSON.parse(tags).join(', '); } catch { return tags; }
    }
    if (Array.isArray(tags)) return tags.join(', ');
    return '';
  };

  const save = async () => {
    if (!editing?.title) { showToast('error', '新闻标题不能为空'); return; }
    const tagsStr = typeof editing.tags === 'string' ? editing.tags.split(/[,，]/).map((s: string) => s.trim()).filter(Boolean) : (editing.tags || []);
    const body = { ...editing, tags: tagsStr };
    const method = editing.id ? 'PUT' : 'POST';
    const url = editing.id ? `${API}/news/${editing.id}` : `${API}/news`;
    try {
      const res = await fetch(url, { method, headers: hdrs(), body: JSON.stringify(body) });
      if (res.ok) { showToast('success', editing.id ? '新闻更新成功' : '新闻创建成功'); setEditing(null); load(); }
      else showToast('error', '操作失败');
    } catch { showToast('error', '服务器连接失败'); }
  };

  const del = async (id: number) => {
    if (!confirm('确定删除此新闻？删除后不可恢复。')) return;
    await fetch(`${API}/news/${id}`, { method: 'DELETE', headers: hdrs() });
    showToast('success', '新闻已删除'); load();
  };

  const catLabel = (c: string) => ({ company: '公司动态', industry: '行业资讯', notice: '通知公告' } as any)[c] || c;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">新闻管理</h1><p className="text-sm text-gray-500 mt-1">管理新闻中心内容，支持分类、推荐和多标签</p></div>
        <button onClick={() => setEditing({ title: '', category: 'company', summary: '', content: '', tags: '', featured: false, published: true })} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-600 text-sm font-medium shadow-sm"><Plus className="w-4 h-4" /> 新增新闻</button>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">{editing.id ? '编辑新闻' : '新增新闻'}</h2>
              <button onClick={() => setEditing(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">新闻标题 <span className="text-red-500">*</span></label>
                <input value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} placeholder="请输入新闻标题" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">分类</label>
                  <select value={editing.category || 'company'} onChange={e => setEditing({ ...editing, category: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                    <option value="company">公司动态</option>
                    <option value="industry">行业资讯</option>
                    <option value="notice">通知公告</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">标签（逗号分隔）</label>
                  <input value={editing.tags || ''} onChange={e => setEditing({ ...editing, tags: e.target.value })} placeholder="如：产品发布, 智算云, AI" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">摘要</label>
                <input value={editing.summary || ''} onChange={e => setEditing({ ...editing, summary: e.target.value })} placeholder="新闻摘要，将在列表页展示" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">正文内容（支持Markdown）</label>
                <textarea value={editing.content || ''} onChange={e => setEditing({ ...editing, content: e.target.value })} rows={8} placeholder="请输入新闻正文内容..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none resize-y" />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={editing.featured || false} onChange={e => setEditing({ ...editing, featured: e.target.checked })} className="rounded" /> 设为推荐</label>
                <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={editing.published ?? true} onChange={e => setEditing({ ...editing, published: e.target.checked })} className="rounded" /> 立即发布</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-gray-100">
              <button onClick={() => setEditing(null)} className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">取消</button>
              <button onClick={save} className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm flex items-center gap-2 hover:bg-primary-600"><Save className="w-4 h-4" /> 保存</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr><th className="text-left px-5 py-3 font-medium text-gray-600">标题</th><th className="text-left px-5 py-3 font-medium text-gray-600">分类</th><th className="text-left px-5 py-3 font-medium text-gray-600">状态</th><th className="text-left px-5 py-3 font-medium text-gray-600">发布时间</th><th className="text-right px-5 py-3 font-medium text-gray-600">操作</th></tr>
          </thead>
          <tbody>
            {news.map((n) => (
              <tr key={n.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-5 py-3.5 text-gray-800 font-medium max-w-xs truncate">{n.title}</td>
                <td className="px-5 py-3.5"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{catLabel(n.category)}</span></td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${n.published ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{n.published ? '已发布' : '草稿'}</span>
                    {n.featured && <span className="text-xs px-2 py-1 rounded-full bg-accent-50 text-accent-600 font-medium">推荐</span>}
                  </div>
                </td>
                <td className="px-5 py-3.5 text-gray-500 text-xs">{n.published_at?.slice(0, 10) || '-'}</td>
                <td className="px-5 py-3.5 text-right">
                  <button onClick={() => setEditing({ ...n, tags: formatTags(n.tags) })} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 mr-1" title="编辑新闻"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => del(n.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500" title="删除新闻"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

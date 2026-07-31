import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const API = 'http://localhost:8080/api/v1';
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('auth_token')}` });

interface Field { key: string; label: string; placeholder?: string; type?: string; opts?: { v: string; l: string }[] }

interface Props { title: string; endpoint: string; fields: Field[] }

export default function SimpleManager({ title, endpoint, fields }: Props) {
  const [list, setList] = useState<any[]>([]);
  const [edit, setEdit] = useState<any>(null);
  const { showToast } = useToast();

  const load = async () => {
    try {
      const r = await fetch(`${API}/${endpoint}`, { headers: h() });
      const json = await r.json();
      const data = json.data || [];
      setList(Array.isArray(data) ? data : Object.entries(data).map(([k, v]) => ({ key: k, value: v })));
    } catch { setList([]); }
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!edit) return;
    try {
      const isConfig = endpoint === 'config';
      const method = isConfig ? 'PUT' : (edit.id ? 'PUT' : 'POST');
      const url = isConfig ? `${API}/${endpoint}` : (edit.id ? `${API}/${endpoint}/${edit.id}` : `${API}/${endpoint}`);
      const body = isConfig ? { [edit.key]: edit.value } : edit;
      const res = await fetch(url, { method, headers: h(), body: JSON.stringify(body) });
      if (res.ok) { showToast('success', '保存成功'); setEdit(null); load(); }
      else showToast('error', '操作失败');
    } catch { showToast('error', '服务器连接失败'); }
  };

  const del = async (id: number) => {
    if (!confirm('确定删除此条目？')) return;
    await fetch(`${API}/${endpoint}/${id}`, { method: 'DELETE', headers: h() });
    showToast('success', '已删除'); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">{title}</h1><p className="text-sm text-gray-500 mt-1">管理后台数据</p></div>
        <button onClick={() => { const o: any = {}; fields.forEach(f => o[f.key] = ''); setEdit(o) }} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-600 text-sm font-medium shadow-sm"><Plus className="w-4 h-4" /> 新增</button>
      </div>

      {edit !== null && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setEdit(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">{edit.id ? '编辑' : '新增'}</h2>
              <button onClick={() => setEdit(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="space-y-4">
              {fields.map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                  {f.type === 'select' ? (
                    <select value={edit[f.key] || ''} onChange={e => setEdit({ ...edit, [f.key]: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                      {f.opts?.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                    </select>
                  ) : (
                    <input value={edit[f.key] || ''} onChange={e => setEdit({ ...edit, [f.key]: e.target.value })} placeholder={f.placeholder || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-gray-100">
              <button onClick={() => setEdit(null)} className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">取消</button>
              <button onClick={save} className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm flex items-center gap-2 hover:bg-primary-600"><Save className="w-4 h-4" /> 保存</button>
            </div>
          </div>
        </div>
      )}

      {list.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <Eye className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">暂无数据，点击上方按钮新增</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {fields.slice(0, 3).map(f => <th key={f.key} className="text-left px-5 py-3 font-medium text-gray-600">{f.label}</th>)}
                <th className="text-right px-5 py-3 font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, i) => (
                <tr key={item.id || item.key || i} className="border-b border-gray-50 hover:bg-gray-50/50">
                  {fields.slice(0, 3).map(f => (
                    <td key={f.key} className="px-5 py-3.5 text-gray-700 max-w-xs truncate">
                      {typeof item[f.key] === 'string' && item[f.key].length > 60 ? item[f.key].slice(0, 60) + '...' : String(item[f.key] ?? '-')}
                    </td>
                  ))}
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={() => setEdit(item)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 mr-1" title="编辑"><Edit className="w-4 h-4" /></button>
                    {item.id && <button onClick={() => del(item.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500" title="删除"><Trash2 className="w-4 h-4" /></button>}
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

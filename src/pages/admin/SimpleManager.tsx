import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const API = 'http://localhost:8080/api/v1';

function authHeaders(hasBody = true) {
  const token = localStorage.getItem('auth_token');
  const headers: Record<string, string> = {};
  if (hasBody) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

interface Field { key: string; label: string; placeholder?: string; type?: string; opts?: { v: string; l: string }[] }

interface Props { title: string; endpoint: string; fields: Field[] }

export default function SimpleManager({ title, endpoint, fields }: Props) {
  const [list, setList] = useState<any[]>([]);
  const [edit, setEdit] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const isConfig = endpoint === 'config';

  const load = async () => {
    try {
      const r = await fetch(`${API}/${endpoint}`, { headers: authHeaders(false) });
      const json = await r.json();
      const data = json.data || [];
      if (Array.isArray(data)) {
        setList(data);
      } else if (typeof data === 'object') {
        // Config 返回 {key: value} 对象，转成数组
        setList(Object.entries(data).map(([k, v]) => ({ key: k, value: String(v) })));
      } else {
        setList([]);
      }
    } catch { setList([]); }
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!edit) return;

    // 验证必填字段
    const firstField = fields[0];
    if (firstField && !edit[firstField.key]) {
      showToast('error', `"${firstField.label}"不能为空`);
      return;
    }

    setSaving(true);
    try {
      let method: string, url: string, body: any;

      if (isConfig) {
        // Config 特殊处理: PUT /config with {key: value}
        method = 'PUT';
        url = `${API}/config`;
        body = { [edit.key]: edit.value };
      } else if (edit.id) {
        method = 'PUT';
        url = `${API}/${endpoint}/${edit.id}`;
        body = edit;
      } else {
        method = 'POST';
        url = `${API}/${endpoint}`;
        body = edit;
      }

      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      const json = await res.json();

      if (res.ok) {
        showToast('success', edit.id ? '更新成功' : '创建成功');
        setEdit(null);
        load();
      } else {
        showToast('error', json.message || '保存失败');
      }
    } catch {
      showToast('error', '服务器连接失败，请检查后端是否启动');
    } finally {
      setSaving(false);
    }
  };

  const del = async (row: any) => {
    if (!confirm('确定删除此条目？')) return;
    try {
      const res = await fetch(`${API}/${endpoint}/${row.id}`, { method: 'DELETE', headers: authHeaders() });
      if (res.ok) { showToast('success', '已删除'); load(); }
      else { const j = await res.json(); showToast('error', j.message || '删除失败'); }
    } catch { showToast('error', '服务器连接失败'); }
  };

  const openNew = () => {
    const o: any = {};
    fields.forEach(f => o[f.key] = '');
    setEdit(o);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">{title}</h1><p className="text-sm text-gray-500 mt-1">管理后台数据</p></div>
        <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-600 text-sm font-medium shadow-sm"><Plus className="w-4 h-4" /> 新增</button>
      </div>

      {/* Edit Modal */}
      {edit !== null && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setEdit(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">{edit.id || edit.key ? '编辑' : '新增'}</h2>
              <button onClick={() => setEdit(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="space-y-4">
              {fields.map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                  {f.type === 'select' ? (
                    <select value={edit[f.key] || ''} onChange={e => setEdit({ ...edit, [f.key]: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                      <option value="">请选择</option>
                      {f.opts?.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                    </select>
                  ) : (
                    <input
                      value={edit[f.key] || ''}
                      onChange={e => setEdit({ ...edit, [f.key]: e.target.value })}
                      placeholder={f.placeholder || f.label}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                      disabled={isConfig && f.key === 'key' && !!edit.key}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-gray-100">
              <button onClick={() => setEdit(null)} className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">取消</button>
              <button onClick={save} disabled={saving} className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm flex items-center gap-2 hover:bg-primary-600 disabled:opacity-50">
                <Save className="w-4 h-4" /> {saving ? '保存中...' : '保存'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {list.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <Eye className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">暂无数据</p>
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
                      {String(item[f.key] ?? '-').slice(0, 80)}
                    </td>
                  ))}
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={() => setEdit(item)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 mr-1" title="编辑"><Edit className="w-4 h-4" /></button>
                    {item.id && <button onClick={() => del(item)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500" title="删除"><Trash2 className="w-4 h-4" /></button>}
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

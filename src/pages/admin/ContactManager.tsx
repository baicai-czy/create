import { useState, useEffect } from 'react';
import { Edit, Save, X, Eye } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const API = 'http://localhost:8080/api/v1';

function authHeaders(hb = true) {
  const headers: Record<string, string> = {};
  if (hb) headers['Content-Type'] = 'application/json';
  const t = localStorage.getItem('auth_token');
  if (t) headers['Authorization'] = `Bearer ${t}`;
  return headers;
}

export default function ContactManager() {
  const [list, setList] = useState<any[]>([]);
  const [edit, setEdit] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const load = async () => {
    try {
      const r = await fetch(`${API}/contacts`, { headers: authHeaders(false) });
      setList((await r.json()).data || []);
    } catch { setList([]); }
  };
  useEffect(() => { load(); }, []);

  const openEdit = async (row: any) => {
    setEdit(row);
    // T007: 自动标记已阅
    if (row.read_status === 'unread') {
      try {
        await fetch(`${API}/contacts/${row.id}`, {
          method: 'PUT', headers: authHeaders(),
          body: JSON.stringify({ read_status: 'read' }),
        });
      } catch { /* silent */ }
    }
  };

  const save = async () => {
    if (!edit) return;
    setSaving(true);
    try {
      const res = await fetch(`${API}/contacts/${edit.id}`, {
        method: 'PUT', headers: authHeaders(),
        body: JSON.stringify({ status: edit.status, read_status: edit.read_status }),
      });
      if (res.ok) { showToast('success', '更新成功'); setEdit(null); load(); }
      else showToast('error', '保存失败');
    } catch { showToast('error', '服务器连接失败'); }
    finally { setSaving(false); }
  };

  const typeLabel = (t: string) => t === 'consultation' ? '咨询' : t === 'cooperation' ? '合作' : t;
  const statusLabel = (s: string) => ({ pending: '待处理', processing: '处理中', resolved: '已解决' } as any)[s] || s;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">咨询管理</h1>
          <p className="text-sm text-gray-500 mt-1">查看和处理客户咨询与合作申请</p>
        </div>
      </div>

      {/* Edit Modal */}
      {edit !== null && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setEdit(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">咨询详情</h2>
              <button onClick={() => setEdit(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-gray-400 mb-1">姓名</label><p className="text-sm font-medium">{edit.name}</p></div>
                <div><label className="block text-xs text-gray-400 mb-1">类型</label><p className="text-sm">{typeLabel(edit.type)}</p></div>
                <div><label className="block text-xs text-gray-400 mb-1">公司</label><p className="text-sm">{edit.company || '-'}</p></div>
                <div><label className="block text-xs text-gray-400 mb-1">电话</label><p className="text-sm">{edit.phone}</p></div>
                <div><label className="block text-xs text-gray-400 mb-1">邮箱</label><p className="text-sm">{edit.email || '-'}</p></div>
                <div><label className="block text-xs text-gray-400 mb-1">服务</label><p className="text-sm">{edit.service || '-'}</p></div>
              </div>
              {edit.message && <div><label className="block text-xs text-gray-400 mb-1">咨询内容</label><p className="text-sm bg-gray-50 rounded-lg p-3">{edit.message}</p></div>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">处理状态</label>
                <select value={edit.status || 'pending'} onChange={e => setEdit({ ...edit, status: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                  <option value="pending">待处理</option>
                  <option value="processing">处理中</option>
                  <option value="resolved">已解决</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">查阅状态</label>
                <p className="text-sm">{edit.read_status === 'unread' ? '🔴 未阅' : '✅ 已阅'}</p>
              </div>
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
          <Eye className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">暂无咨询记录</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-600">提交者</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">类型</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">处理状态</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">查阅状态</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">时间</th>
                <th className="text-right px-5 py-3 font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      {/* T006: 未阅红色圆点 + 加粗 */}
                      {item.read_status === 'unread' && (
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full flex-shrink-0" title="未阅" />
                      )}
                      <span className={item.read_status === 'unread' ? 'font-bold text-gray-900' : 'text-gray-700'}>
                        {item.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{item.company || '-'}</p>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{typeLabel(item.type)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      item.status === 'resolved' ? 'bg-green-50 text-green-600' :
                      item.status === 'processing' ? 'bg-blue-50 text-blue-600' :
                      'bg-yellow-50 text-yellow-600'
                    }`}>
                      {statusLabel(item.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">
                    {item.read_status === 'unread' ? '未阅' : '已阅'}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{item.created_at?.slice(0, 10)}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={() => openEdit(item)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500" title="查看详情"><Edit className="w-4 h-4" /></button>
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

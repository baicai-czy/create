// API 接口层 — 连接后端 http://localhost:8080/api/v1
// 设置 VITE_USE_MOCK=true 可切回本地静态数据模式

const API = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api/v1';

// 通用请求
async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`);
  const json = await res.json();
  return json.data;
}

/* ===== 首页 ===== */
export const homeApi = {
  getBanners: () => get<any[]>('/banners'),
  getDataShowcase: () => {
    return { title: '城际云 · 用数据说话', items: [
      { value: 500, suffix: '+', label: '服务客户数' },
      { value: 100, suffix: ' PFLOPS', label: '总算力规模' },
      { value: 99.99, suffix: '%', label: '服务可用性', decimals: 2 },
      { value: 1500, suffix: '+', label: '持续运营天数' },
    ]} as const;
  },
  getPartners: () => get<string[]>('/partners').then(p => Array.isArray(p) ? p.map((p:any) => p.name) : []),
};

/* ===== 新闻 ===== */
export const newsApi = {
  getList: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return get<any>(`/news${qs}`);
  },
  getById: (id: string) => get<any>(`/news/${id}`),
};

/* ===== 产品 ===== */
export const productApi = {
  getByCategory: (category: string) => get<any[]>(`/products?category=${category}`),
  getAll: () => get<any[]>('/products'),
};

/* ===== 解决方案 ===== */
export const solutionApi = {
  getByCategory: (category: string) => get<any>(`/solutions?category=${category}`),
  getAll: () => get<any[]>('/solutions'),
};

/* ===== 联系我们 ===== */
export const contactApi = {
  getInfo: () => {
    return {
      info: [
        { icon: 'MapPin', label: '公司地址', value: '江苏省南京市建邺区XXX路XXX号\n南京大数据产业园A座' },
        { icon: 'Phone', label: '服务热线', value: '400-XXX-XXXX' },
        { icon: 'Mail', label: '电子邮箱', value: 'contact@cityintercloud.com' },
        { icon: 'Clock', label: '工作时间', value: '周一至周五 9:00 - 18:00' },
      ]
    } as const;
  },
  submitConsultation: (form: any) => {
    return fetch(`${API}/contacts`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...form, type:'consultation'}) }).then(r => r.json());
  },
  submitCooperation: (form: any) => {
    return fetch(`${API}/contacts`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...form, type:'cooperation'}) }).then(r => r.json());
  },
};

/* ===== 认证 ===== */
export const authApi = {
  login: (username: string, password: string) => {
    return fetch(`${API}/auth/login`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({username, password}) }).then(r => r.json());
  },
};

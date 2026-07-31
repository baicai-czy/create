// API 接口集合 — 模块化，便于对接后端
// 当前使用本地数据模拟，切换后端时替换 return 语句即可
import type {
  NewsItem as TNewsItem,
  PaginatedResponse,
  ConsultationForm,
  CooperationForm,
} from '../types';

// 本地数据文件
import { newsList } from '../data/news';
import { heroSlides, quickEntries, dataShowcase, partners as partnerNames } from '../data/home';
import { companyIntro, milestones, culture, qualifications } from '../data/about';
import { generalServices, aiServices, integrationServices, opsServices } from '../data/products';
import { solutions } from '../data/solutions';
import { contactInfo } from '../data/contact';

// 模拟网络延迟
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

/* ===== 新闻 API ===== */
export const newsApi = {
  getList: async (params?: { category?: string; page?: number; pageSize?: number }): Promise<PaginatedResponse<TNewsItem>> => {
    await delay();
    let list = newsList.map((n) => ({
      ...n,
      slug: n.id,
      coverImage: '',
      published: true,
      publishedAt: n.date,
      createdAt: n.date,
      updatedAt: n.date,
      author: '城际云',
    })) as unknown as TNewsItem[];
    if (params?.category && params.category !== 'all') {
      list = list.filter((n) => n.category === params.category);
    }
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const start = (page - 1) * pageSize;
    return {
      data: list.slice(start, start + pageSize),
      total: list.length,
      page,
      pageSize,
      totalPages: Math.ceil(list.length / pageSize),
    };
  },
  getById: async (id: string): Promise<TNewsItem | null> => {
    await delay();
    const n = newsList.find((n) => n.id === id);
    if (!n) return null;
    return { ...n, slug: n.id, coverImage: '', published: true, publishedAt: n.date, createdAt: n.date, updatedAt: n.date, author: '城际云' } as unknown as TNewsItem;
  },
};

/* ===== 首页 API ===== */
export const homeApi = {
  getBanners: async () => { await delay(); return heroSlides; },
  getQuickEntries: async () => { await delay(); return quickEntries; },
  getDataShowcase: async () => { await delay(); return dataShowcase; },
  getPartners: async () => { await delay(); return partnerNames; },
};

/* ===== 关于我们 API ===== */
export const aboutApi = {
  getCompanyIntro: async () => { await delay(); return companyIntro; },
  getMilestones: async () => { await delay(); return milestones; },
  getCulture: async () => { await delay(); return culture; },
  getQualifications: async () => { await delay(); return qualifications; },
};

/* ===== 产品 API ===== */
export const productApi = {
  getGeneralServices: async () => { await delay(); return generalServices; },
  getAIServices: async () => { await delay(); return aiServices; },
  getIntegrationServices: async () => { await delay(); return integrationServices; },
  getOpsServices: async () => { await delay(); return opsServices; },
};

/* ===== 解决方案 API ===== */
export const solutionApi = {
  getGovernment: async () => { await delay(); return solutions.government; },
  getEnterprise: async () => { await delay(); return solutions.enterprise; },
  getDigital: async () => { await delay(); return solutions.digital; },
};

/* ===== 联系我们 API ===== */
export const contactApi = {
  getInfo: async () => { await delay(); return contactInfo; },
  submitConsultation: async (_form: ConsultationForm) => {
    await delay(500);
    return { success: true, message: '提交成功，我们将尽快与您联系' };
  },
  submitCooperation: async (_form: CooperationForm) => {
    await delay(500);
    return { success: true, message: '合作申请已提交，我们将在3个工作日内审核' };
  },
};

/* ===== 认证 API ===== */
export const authApi = {
  login: async (_username: string, _password: string) => {
    await delay();
    return { token: 'mock_token', user: { id: '1', username: _username, role: 'content_editor' as const } };
  },
  logout: async () => { await delay(); },
};

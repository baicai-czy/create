// 核心实体类型 — 对齐 SOW 后台管理系统数据结构

/* ===== 新闻 ===== */
export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: 'company' | 'industry' | 'notice';
  summary: string;
  content: string;
  coverImage?: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author: string;
}

/* ===== Banner 轮播 ===== */
export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description?: string;
  linkUrl?: string;
  linkText?: string;
  secondaryLinkUrl?: string;
  secondaryLinkText?: string;
  sort: number;
  published: boolean;
}

/* ===== 产品 ===== */
export interface Product {
  id: string;
  name: string;
  category: 'general' | 'ai' | 'integration' | 'ops';
  description: string;
  features: string[];
  icon: string;
  published: boolean;
  sort: number;
}

/* ===== 解决方案 ===== */
export interface Solution {
  id: string;
  title: string;
  subtitle: string;
  intro: string;
  category: 'government' | 'enterprise' | 'digital';
  features: SolutionFeature[];
  architecture?: string[];
  industries?: string[];
  steps?: SolutionStep[];
  published: boolean;
}

export interface SolutionFeature {
  title: string;
  description: string;
  icon: string;
}

export interface SolutionStep {
  title: string;
  desc: string;
}

/* ===== 合作伙伴 ===== */
export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  sort: number;
}

/* ===== 资质证书 ===== */
export interface Certificate {
  id: string;
  name: string;
  category: string;
  image?: string;
  sort: number;
}

/* ===== 联系我们 ===== */
export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  mapEmbedUrl?: string;
}

export interface ConsultationForm {
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export interface CooperationForm {
  name: string;
  company: string;
  phone: string;
  email: string;
  industry: string;
  requirement: string;
}

/* ===== 用户/鉴权 ===== */
export type UserRole = 'super_admin' | 'content_editor' | 'reviewer' | 'customer_service';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  token?: string;
}

/* ===== 通用分页 ===== */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/* ===== API 响应 ===== */
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

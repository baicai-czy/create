import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import BannerManager from './pages/admin/BannerManager';
import NewsManager from './pages/admin/NewsManager';
import ProductManager from './pages/admin/ProductManager';
import SimpleManager from './pages/admin/SimpleManager';

// Lazy-loaded route pages for code splitting
const CompanyIntro = lazy(() => import('./pages/about/CompanyIntro'));
const DevelopmentHistory = lazy(() => import('./pages/about/DevelopmentHistory'));
const CorporateCulture = lazy(() => import('./pages/about/CorporateCulture'));
const Qualifications = lazy(() => import('./pages/about/Qualifications'));
const OrgStructure = lazy(() => import('./pages/about/OrgStructure'));
const CityCloud = lazy(() => import('./pages/business/CityCloud'));
const CloudIntegration = lazy(() => import('./pages/business/CloudIntegration'));
const GeneralServices = lazy(() => import('./pages/products/GeneralServices'));
const AIServices = lazy(() => import('./pages/products/AIServices'));
const CloudIntegrationServices = lazy(() => import('./pages/products/CloudIntegrationServices'));
const OpsServices = lazy(() => import('./pages/products/OpsServices'));
const GovernmentCloud = lazy(() => import('./pages/solutions/GovernmentCloud'));
const EnterpriseCloud = lazy(() => import('./pages/solutions/EnterpriseCloud'));
const DigitalTransformation = lazy(() => import('./pages/solutions/DigitalTransformation'));
const NewsList = lazy(() => import('./pages/news/NewsList'));
const NewsDetail = lazy(() => import('./pages/news/NewsDetail'));
const ContactUs = lazy(() => import('./pages/contact/ContactUs'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400">加载中...</p>
      </div>
    </div>
  );
}

function LazyPage({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        {/* About */}
        <Route path="/about" element={<LazyPage><CompanyIntro /></LazyPage>} />
        <Route path="/about/history" element={<LazyPage><DevelopmentHistory /></LazyPage>} />
        <Route path="/about/culture" element={<LazyPage><CorporateCulture /></LazyPage>} />
        <Route path="/about/qualifications" element={<LazyPage><Qualifications /></LazyPage>} />
        <Route path="/about/organization" element={<LazyPage><OrgStructure /></LazyPage>} />
        {/* Business */}
        <Route path="/business/city-cloud" element={<LazyPage><CityCloud /></LazyPage>} />
        <Route path="/business/cloud-integration" element={<LazyPage><CloudIntegration /></LazyPage>} />
        <Route path="/business" element={<LazyPage><CityCloud /></LazyPage>} />
        {/* Products */}
        <Route path="/products" element={<LazyPage><GeneralServices /></LazyPage>} />
        <Route path="/products/ai" element={<LazyPage><AIServices /></LazyPage>} />
        <Route path="/products/integration" element={<LazyPage><CloudIntegrationServices /></LazyPage>} />
        <Route path="/products/ops" element={<LazyPage><OpsServices /></LazyPage>} />
        {/* Solutions */}
        <Route path="/solutions" element={<LazyPage><GovernmentCloud /></LazyPage>} />
        <Route path="/solutions/enterprise" element={<LazyPage><EnterpriseCloud /></LazyPage>} />
        <Route path="/solutions/digital-transformation" element={<LazyPage><DigitalTransformation /></LazyPage>} />
        {/* News */}
        <Route path="/news" element={<LazyPage><NewsList /></LazyPage>} />
        <Route path="/news/:id" element={<LazyPage><NewsDetail /></LazyPage>} />
        {/* Contact */}
        <Route path="/contact" element={<LazyPage><ContactUs /></LazyPage>} />
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="banners" element={<BannerManager />} />
        <Route path="news" element={<NewsManager />} />
        <Route path="products" element={<ProductManager />} />
        <Route path="solutions" element={<SimpleManager title="解决方案管理" endpoint="solutions/all" fields={[{key:'title',label:'标题'},{key:'category',label:'分类'},{key:'published',label:'状态'}]} />} />
        <Route path="partners" element={<SimpleManager title="合作伙伴管理" endpoint="partners" fields={[{key:'name',label:'名称'},{key:'website',label:'网站'},{key:'sort',label:'排序'}]} />} />
        <Route path="certificates" element={<SimpleManager title="资质证书管理" endpoint="certificates" fields={[{key:'name',label:'名称'},{key:'category',label:'分类'},{key:'sort',label:'排序'}]} />} />
        <Route path="contacts" element={<SimpleManager title="咨询管理" endpoint="contacts" fields={[{key:'name',label:'姓名'},{key:'type',label:'类型'},{key:'status',label:'状态'}]} />} />
        <Route path="config" element={<SimpleManager title="网站配置" endpoint="config" fields={[{key:'key',label:'配置项'},{key:'value',label:'配置值'}]} />} />
        <Route path="users" element={<SimpleManager title="用户管理" endpoint="auth/users" fields={[{key:'username',label:'用户名'},{key:'role',label:'角色'},{key:'created_at',label:'创建时间'}]} />} />
        <Route path="logs" element={<SimpleManager title="操作日志" endpoint="logs" fields={[{key:'username',label:'用户'},{key:'action',label:'操作'},{key:'created_at',label:'时间'}]} />} />
      </Route>
    </Routes>
  );
}

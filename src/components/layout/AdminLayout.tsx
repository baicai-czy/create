import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Image, Newspaper, Package, Lightbulb,
  Handshake, Award, MessageSquare, Settings, FileText,
  Users, LogOut, Menu, X
} from 'lucide-react';

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, label: '控制台', exact: true },
  { path: '/admin/banners', icon: Image, label: 'Banner管理' },
  { path: '/admin/news', icon: Newspaper, label: '新闻管理' },
  { path: '/admin/products', icon: Package, label: '产品管理' },
  { path: '/admin/solutions', icon: Lightbulb, label: '解决方案' },
  { path: '/admin/partners', icon: Handshake, label: '合作伙伴' },
  { path: '/admin/certificates', icon: Award, label: '资质管理' },
  { path: '/admin/contacts', icon: MessageSquare, label: '咨询管理' },
  { path: '/admin/config', icon: Settings, label: '网站配置' },
  { path: '/admin/users', icon: Users, label: '用户管理' },
  { path: '/admin/logs', icon: FileText, label: '操作日志' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    navigate('/admin/login');
  };

  const userStr = localStorage.getItem('auth_user');
  const user = userStr ? JSON.parse(userStr) : null;

  if (!user && location.pathname !== '/admin/login') {
    // Redirect to login in production - currently just render anyway for dev
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">城</span>
            </div>
            <span className="font-bold">管理后台</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-gray-800 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="px-4 py-4 space-y-1 overflow-y-auto h-[calc(100vh-64px)]">
          {menuItems.map((item) => {
            const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-gray-800 mt-4">
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 w-full">
              <LogOut className="w-4 h-4" />
              退出登录
            </button>
          </div>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <Link to="/" className="text-sm text-primary hover:underline" target="_blank">
              查看网站 →
            </Link>
            <span className="text-sm text-gray-500">
              {user?.username || '管理员'}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

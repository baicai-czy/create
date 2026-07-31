import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, User } from 'lucide-react';
import { mainNav } from '../../data/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setActiveMega(null); }, [location]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-sm' : 'glass'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex items-center h-16 gap-6">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">城</span>
            </div>
            <span className="text-lg font-bold text-gray-900">城际云</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {mainNav.map((item) => (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => item.children && setActiveMega(item.label)}
                onMouseLeave={() => setActiveMega(null)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'text-primary bg-primary-50'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
                </Link>

                {/* Mega Menu */}
                {item.children && activeMega === item.label && (
                  <div className="absolute top-full left-0 pt-2 min-w-[220px]">
                    <div className="glass rounded-xl p-2 shadow-glass">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="text-sm font-medium text-gray-800 group-hover:text-primary">
                            {child.label}
                          </div>
                          {child.desc && (
                            <div className="text-xs text-gray-400 mt-0.5">{child.desc}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Search */}
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-gray-400 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">搜索产品</span>
            </button>

            {/* Console */}
            <Link
              to="/contact"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-[#0058E0] rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              <span>控制台</span>
            </Link>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {mainNav.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive(item.path) ? 'text-primary bg-primary-50' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 border-l border-gray-100 pl-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-2 rounded-lg text-sm text-gray-500 hover:text-primary hover:bg-gray-50"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Mobile search */}
            <div className="pt-4 px-4">
              <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-400 bg-gray-50 rounded-lg">
                <Search className="w-4 h-4" />
                搜索产品与服务
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

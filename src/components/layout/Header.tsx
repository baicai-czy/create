import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Headphones, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { mainNav } from '../../data/navigation';
import { useChat } from '../../hooks/useChatContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { openChat } = useChat();
  const location = useLocation();
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setActiveMega(null); setSearchOpen(false); }, [location]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleMegaEnter = (label: string) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setActiveMega(label);
  };

  const handleMegaLeave = () => {
    megaTimer.current = setTimeout(() => setActiveMega(null), 200);
  };

  const searchSuggestions = ['弹性云服务器', 'GPU算力', '对象存储', '政务云方案', '云迁移服务', '大模型服务'];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-sm' : 'glass'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex items-center h-16 gap-5">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-400 rounded-lg flex items-center justify-center transition-all group-hover:shadow-lg group-hover:scale-105">
              <span className="text-white font-bold text-base">城</span>
            </div>
            <span className="text-lg font-bold text-gray-900">城际云</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1" onMouseLeave={handleMegaLeave}>
            {mainNav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => (item.sections || item.children) && handleMegaEnter(item.label)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isActive(item.path)
                      ? 'text-primary bg-primary-50'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  {(item.sections || item.children) && (
                    <ChevronDown className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 ${activeMega === item.label ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {/* Sections Mega Menu (产品 / 解决方案) */}
                <AnimatePresence>
                  {item.sections && activeMega === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
                      className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-2xl"
                      onMouseEnter={() => handleMegaEnter(item.label)}
                      onMouseLeave={handleMegaLeave}
                    >
                    <div className="max-w-[1440px] mx-auto px-8 py-8">
                      <div className={`grid gap-8 ${item.sections.length <= 4 ? 'grid-cols-4' : 'grid-cols-6'}`}>
                        {item.sections.map((section) => (
                          <div key={section.title}>
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">{section.title}</h4>
                            <ul className="space-y-1.5">
                              {section.items.map((subItem) => (
                                <li key={subItem.label}>
                                  <Link
                                    to={subItem.path || item.path}
                                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary hover:bg-gray-50 rounded-md px-2 py-1.5 -mx-2 transition-colors"
                                  >
                                    {subItem.label}
                                    {subItem.tag && (
                                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                                        subItem.tag === '新品' ? 'bg-green-50 text-green-600' : 'bg-accent-50 text-accent-600'
                                      }`}>
                                        {subItem.tag}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {/* Bottom link */}
                      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                        <Link to={item.path} className="text-sm font-medium text-primary hover:underline">
                          查看全部{item.label} →
                        </Link>
                        <div className="flex items-center gap-6 text-xs text-gray-400">
                          <Link to="/products/ai" className="hover:text-primary transition-colors">GPU算力</Link>
                          <Link to="/products" className="hover:text-primary transition-colors">弹性计算</Link>
                          <Link to="/solutions" className="hover:text-primary transition-colors">政务云</Link>
                          <Link to="/contact" className="hover:text-primary transition-colors">免费咨询</Link>
                        </div>
                      </div>
                    </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Simple Dropdown (生态合作 / 客户案例 / 文档支持 / 关于城际云) */}
                <AnimatePresence>
                  {item.children && !item.sections && activeMega === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scaleY: 0.96 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -4, scaleY: 0.96 }}
                      transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
                      className="absolute top-full left-0 pt-2 min-w-[200px]"
                      onMouseEnter={() => handleMegaEnter(item.label)}
                      onMouseLeave={handleMegaLeave}
                      style={{ transformOrigin: 'top' }}
                    >
                    <div className="bg-white rounded-xl p-2 shadow-xl border border-gray-200">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="text-sm font-medium text-gray-800 hover:text-primary">{child.label}</div>
                          {child.desc && <div className="text-xs text-gray-400 mt-0.5">{child.desc}</div>}
                        </Link>
                      ))}
                    </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline text-gray-400">搜索产品</span>
              </button>

              {/* Search overlay */}
              <AnimatePresence>
                {searchOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setSearchOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      style={{ transformOrigin: 'top right' }}
                      className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50"
                    >
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="搜索产品、文档、解决方案..."
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        autoFocus
                      />
                    </div>
                    {!searchQuery && (
                      <div className="mt-4">
                        <p className="text-xs text-gray-400 mb-2">热门搜索</p>
                        <div className="flex flex-wrap gap-2">
                          {searchSuggestions.map((s) => (
                            <button
                              key={s}
                              onClick={() => setSearchQuery(s)}
                              className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md transition-colors"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {searchQuery && (
                      <div className="mt-4 border-t border-gray-50 pt-4">
                        <p className="text-xs text-gray-400">搜索结果为空</p>
                      </div>
                    )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* 智能客服 */}
            <button
              onClick={openChat}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-[#0058E0] rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Headphones className="w-4 h-4" />
              <span>智能客服</span>
            </button>

            {/* CTA */}
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:border-primary hover:bg-primary-50 rounded-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>免费咨询</span>
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
        <div className="lg:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-64px)] overflow-y-auto animate-fade-up">
          <div className="px-4 py-3">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索产品、文档、解决方案..."
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="px-4 py-2 space-y-1">
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
                {item.sections && (
                  <div className="ml-4 border-l border-gray-100 pl-4 space-y-1 mb-2">
                    {item.sections.flatMap(s => s.items).map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.path || item.path}
                        className="block px-4 py-2 rounded-lg text-sm text-gray-500 hover:text-primary hover:bg-gray-50"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
                {item.children && !item.sections && (
                  <div className="ml-4 border-l border-gray-100 pl-4 space-y-1 mb-2">
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
          </div>
        </div>
      )}
    </header>
  );
}

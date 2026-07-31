import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { footerLinks } from '../../data/navigation';

export default function Footer() {
  const sections = [footerLinks.products, footerLinks.solutions, footerLinks.business, footerLinks.support, footerLinks.contact];

  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">城</span>
            </div>
            <span className="text-white font-bold text-lg">城际云</span>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              江苏省南京市建邺区XXX路XXX号
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 flex-shrink-0" />
              400-XXX-XXXX
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 flex-shrink-0" />
              contact@cityintercloud.com
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <span>© 2026 城际云(江苏)科技有限公司 版权所有</span>
            <Link to="#" className="hover:text-white transition-colors">隐私政策</Link>
            <Link to="#" className="hover:text-white transition-colors">服务协议</Link>
            <Link to="#" className="hover:text-white transition-colors">网站地图</Link>
          </div>
          <div className="flex items-center gap-4">
            <span>苏ICP备XXXXXXXX号-1</span>
            <span>苏公网安备 XXXXXXXXXX号</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

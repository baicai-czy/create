import { useState, useEffect } from 'react';
import { Newspaper, Package, MessageSquare, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const API = 'http://localhost:8080/api/v1';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ news: 0, products: 0, contacts: 0, users: 0 });

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch(`${API}/news/admin/all`, { headers }).then(r => r.json()),
      fetch(`${API}/products/all`, { headers }).then(r => r.json()),
      fetch(`${API}/contacts`, { headers }).then(r => r.json()),
      fetch(`${API}/auth/users`, { headers }).then(r => r.json()),
    ]).then(([news, products, contacts, users]) => {
      setStats({
        news: news.data?.length || 0,
        products: products.data?.length || 0,
        contacts: contacts.data?.length || 0,
        users: users.data?.length || 0,
      });
    }).catch(console.error);
  }, []);

  const cards = [
    { label: '新闻总数', value: stats.news, icon: Newspaper, color: 'bg-blue-50 text-blue-600', path: '/admin/news' },
    { label: '产品数量', value: stats.products, icon: Package, color: 'bg-purple-50 text-purple-600', path: '/admin/products' },
    { label: '待处理咨询', value: stats.contacts, icon: MessageSquare, color: 'bg-orange-50 text-orange-600', path: '/admin/contacts' },
    { label: '用户数', value: stats.users, icon: Users, color: 'bg-green-50 text-green-600', path: '/admin/users' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">控制台</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <Link key={card.label} to={card.path} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-500 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">快捷操作</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '新建新闻', path: '/admin/news' },
            { label: '添加Banner', path: '/admin/banners' },
            { label: '查看咨询', path: '/admin/contacts' },
            { label: '网站配置', path: '/admin/config' },
          ].map((item) => (
            <Link key={item.label} to={item.path} className="p-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary transition-colors text-center">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

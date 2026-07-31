import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumb, Button } from '../../components/ui/index';
import { newsList } from '../../data/news';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const news = newsList.find((n) => n.id === id);

  if (!news) {
    return (
      <div className="max-w-[800px] mx-auto px-4 md:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">新闻不存在</h1>
        <p className="text-gray-500 mb-6">该新闻已被删除或链接无效</p>
        <Button onClick={() => navigate('/news')} variant="secondary">
          <ArrowLeft className="w-4 h-4" /> 返回新闻中心
        </Button>
      </div>
    );
  }

  const categoryLabel = () => {
    const map: Record<string, string> = { company: '公司动态', industry: '行业资讯', notice: '通知公告' };
    return map[news.category] || news.category;
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '新闻中心', path: '/news' }, { label: news.title }]} />

      <article className="bg-white rounded-xl shadow-card border border-gray-100 p-8 md:p-12">
        {/* Header */}
        <div className="mb-8 pb-8 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              news.category === 'company' ? 'bg-primary-50 text-primary' :
              news.category === 'industry' ? 'bg-purple-50 text-purple-600' :
              'bg-accent-50 text-accent-600'
            }`}>
              {categoryLabel()}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {news.date}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{news.title}</h1>
          <p className="text-gray-500 text-base leading-relaxed">{news.summary}</p>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none mb-8">
          {news.content.split('\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={i} className="text-lg font-semibold text-gray-800 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.match(/^\d+\.\s/)) {
              return <li key={i} className="text-gray-600 ml-4 mb-1">{paragraph.replace(/^\d+\.\s/, '')}</li>;
            }
            if (paragraph.startsWith('- ')) {
              return <li key={i} className="text-gray-600 ml-4 mb-1">{paragraph.replace('- ', '')}</li>;
            }
            if (paragraph.trim() === '') return <br key={i} />;
            return <p key={i} className="text-gray-600 leading-relaxed mb-4">{paragraph}</p>;
          })}
        </div>

        {/* Tags */}
        {news.tags.length > 0 && (
          <div className="flex items-center gap-2 pt-6 border-t border-gray-100">
            <Tag className="w-4 h-4 text-gray-400" />
            {news.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-50 text-gray-500 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Back */}
      <div className="mt-8 text-center">
        <Button onClick={() => navigate('/news')} variant="ghost">
          <ArrowLeft className="w-4 h-4" /> 返回新闻中心
        </Button>
      </div>
    </div>
  );
}

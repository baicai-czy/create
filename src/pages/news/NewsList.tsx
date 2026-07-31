import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Breadcrumb, SectionTitle, Badge } from '../../components/ui/index';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../../components/common/ScrollReveal';
import { newsCategories } from '../../data/news';
import { newsApi } from '../../api';
import { Calendar, ChevronRight } from 'lucide-react';

import { newsList as fallbackNews } from '../../data/news';

export default function NewsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [page, setPage] = useState(1);
  const [newsData, setNewsData] = useState<any[]>(fallbackNews);
  const [totalPages, setTotalPages] = useState(Math.ceil(fallbackNews.length / 6));
  const pageSize = 6;

  // 从后端API加载新闻
  useEffect(() => {
    const params: Record<string, string> = { page: String(page), pageSize: String(pageSize) };
    if (activeCategory !== 'all') params.category = activeCategory;
    newsApi.getList(params).then(res => {
      if (res?.data) {
        setNewsData(res.data);
        setTotalPages(res.totalPages || 1);
      }
    }).catch(() => {}); // 后端不可用时使用默认数据
  }, [activeCategory, page]);

  const handleCategory = (value: string) => {
    setPage(1);
    if (value === 'all') setSearchParams({});
    else setSearchParams({ category: value });
  };

  const pageItems = newsData;

  const categoryLabel = (cat: string) => {
    const map: Record<string, string> = { company: '公司动态', industry: '行业资讯', notice: '通知公告' };
    return map[cat] || cat;
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '新闻中心' }]} />
      <ScrollReveal>
        <SectionTitle title="新闻中心" subtitle="了解城际云最新动态与行业前沿" />
      </ScrollReveal>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {newsCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategory(cat.value)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat.value
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-gray-600 hover:text-primary hover:bg-primary-50 border border-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* News grid */}
      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {pageItems.map((news) => (
          <StaggerItem key={news.id}>
            <Link to={`/news/${news.id}`}>
              <div className="bg-white rounded-xl shadow-card border border-gray-100 p-6 card-hover h-full flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    news.category === 'company' ? 'bg-primary-50 text-primary' :
                    news.category === 'industry' ? 'bg-purple-50 text-purple-600' :
                    'bg-accent-50 text-accent-600'
                  }`}>
                    {categoryLabel(news.category)}
                  </span>
                  {news.featured && (
                    <Badge className="bg-red-50 text-red-500">推荐</Badge>
                  )}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors flex-1">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{news.summary}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {news.date}
                  </span>
                  <span className="flex items-center gap-1 text-primary">
                    阅读详情 <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                p === page ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

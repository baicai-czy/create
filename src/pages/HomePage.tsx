import { heroSlides, quickEntries, businessOverview, newsHighlights, dataShowcase, partners as defaultPartners } from '../data/home';
import { SectionTitle, LinkButton } from '../components/ui/index';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/common/ScrollReveal';
import { CountUp } from '../components/common/CountUp';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Cloud, Cpu, Lightbulb, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { homeApi } from '../api';

/* ===== HeroBanner ===== */
function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState(heroSlides);

  // 从后端加载Banner数据
  useEffect(() => {
    homeApi.getBanners().then(apiBanners => {
      if (apiBanners && apiBanners.length > 0) {
        const mapped = apiBanners.map((b: any) => ({
          id: b.id,
          title: b.title,
          subtitle: b.subtitle || '',
          description: b.description || '',
          cta1: { label: b.link_text || '了解更多', path: b.link_url || '/contact' },
          cta2: { label: b.secondary_link_text || '关于我们', path: b.secondary_link_url || '/about' },
          gradient: 'from-primary-600 via-primary-500 to-cyan-400',
          image: b.image || '',
        }));
        if (mapped.length > 0) setBanners(mapped);
      }
    }).catch(() => {}); // 后端不可用时使用默认数据
  }, []);

  const slide = banners[current % banners.length];

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <section className="relative min-h-[560px] md:min-h-[650px] flex items-center overflow-hidden bg-gray-900">
      {/* 极光渐变背景 */}
      <div className="absolute inset-0">
        {/* Banner背景图 */}
        {slide.image && (
          <div className="absolute inset-0 z-0">
            <img src={slide.image} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10" />
        {/* 弥散光 */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/30 via-purple-500/20 to-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/20 via-purple-500/15 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/10 to-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }} />
      </div>

      {/* 几何装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-32 right-24 w-80 h-80 border border-white/10 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-40 w-60 h-60 border border-white/5 rounded-2xl rotate-45 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-24 w-72 h-72 border border-white/8 rounded-full animate-float" style={{ animationDelay: '2.5s' }} />
        <div className="absolute bottom-40 left-40 w-48 h-48 border border-white/5 rounded-2xl -rotate-12 animate-float" style={{ animationDelay: '4s' }} />
        {/* 小方块 */}
        <div className="absolute top-60 right-80 w-12 h-12 border border-white/15 rounded-lg rotate-6 animate-float" style={{ animationDelay: '5s' }} />
        <div className="absolute bottom-60 left-60 w-8 h-8 border border-white/10 rounded rotate-45 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 py-20 md:py-28 z-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white/90 text-xs mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            {slide.subtitle}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {slide.title}
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-xl">{slide.description}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link to={slide.cta1.path} className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-medium rounded-xl hover:bg-gray-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              {slide.cta1.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to={slide.cta2.path} className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white font-medium rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              {slide.cta2.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-8 h-1 rounded-full transition-all ${i === current ? 'bg-white w-12' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ===== QuickEntry ===== */
function QuickEntry() {
  const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    Cloud, Cpu, Lightbulb, Phone,
  };

  return (
    <section className="relative pb-12 pt-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {quickEntries.map((entry) => {
            const Icon = iconMap[entry.icon] || Cloud;
            return (
              <StaggerItem key={entry.title}>
                <Link to={entry.path}>
                  <div className="glass rounded-2xl p-8 md:p-10 card-hover cursor-pointer h-full group border border-white/30">
                    <div className={`w-14 h-14 rounded-xl ${entry.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{entry.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{entry.description}</p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ===== BusinessOverview ===== */
function BusinessOverview() {
  return (
    <section className="pb-20 md:pb-28 pt-4">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <SectionTitle title={businessOverview.title} subtitle={businessOverview.subtitle} />
        <div className="grid md:grid-cols-2 gap-8">
          {businessOverview.items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.15}>
              <div className="bg-white rounded-xl shadow-card border border-gray-100 p-8 card-hover h-full">
                <div className="text-4xl mb-4">{item.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {item.features.map((f) => (
                    <span key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {f}
                    </span>
                  ))}
                </div>
                <Link to={item.path} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  了解更多 <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== NewsHighlights ===== */
function NewsHighlights() {
  return (
    <section className="section-py bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <SectionTitle title={newsHighlights.title} subtitle={newsHighlights.subtitle} />
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured news - large card */}
          {newsHighlights.featuredNews.slice(0, 2).map((news, i) => (
            <ScrollReveal key={news.id} delay={i * 0.1}>
              <Link to={`/news/${news.id}`}>
                <div className={`bg-gray-50 rounded-xl p-6 card-hover border border-gray-100 h-full ${i === 0 ? 'lg:col-span-1' : ''}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary font-medium">
                      {news.category === 'company' ? '公司动态' : news.category === 'industry' ? '行业资讯' : '通知公告'}
                    </span>
                    <span className="text-xs text-gray-400">{news.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{news.summary}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
          {/* Small news list */}
          <div className="space-y-3">
            {newsHighlights.featuredNews.slice(2, 6).map((news, i) => (
              <ScrollReveal key={news.id} delay={i * 0.1}>
                <Link to={`/news/${news.id}`}>
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group">
                    <div className="flex-shrink-0 w-1 h-1 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                        {news.title}
                      </p>
                      <span className="text-xs text-gray-400 mt-1 block">{news.date}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <LinkButton to="/news" variant="ghost">
            查看全部新闻 <ChevronRight className="w-4 h-4" />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

/* ===== DataShowcase ===== */
function DataShowcase() {
  return (
    <section className="section-py relative overflow-hidden">
      <div className="absolute inset-0 breathing-bg" />
      <div className="relative max-w-[1440px] mx-auto px-4 md:px-8">
        <SectionTitle title={dataShowcase.title} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {dataShowcase.items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <CountUp value={item.value} suffix={item.suffix} decimals={item.decimals || 0} />
                </div>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== PartnerLogos ===== */
function PartnerLogos() {
  const [partnerList, setPartnerList] = useState(defaultPartners);

  useEffect(() => {
    homeApi.getPartners().then(names => {
      if (names && names.length > 0) setPartnerList(names);
    }).catch(() => {});
  }, []);

  const doubled = [...partnerList, ...partnerList];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <p className="text-center text-sm text-gray-400 mb-8">合作伙伴</p>
        <div className="overflow-hidden">
          <div className="flex animate-scroll gap-16 items-center" style={{ width: 'max-content' }}>
            {doubled.map((name, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-6 py-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-400 hover:text-primary hover:bg-primary-50 transition-colors cursor-default"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== HomePage ===== */
export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <QuickEntry />
      <BusinessOverview />
      {/* About CTA Banner */}
      <ScrollReveal>
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
          <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-purple-500 rounded-2xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 right-20 w-60 h-60 border border-white/30 rounded-full" />
              <div className="absolute bottom-10 left-20 w-40 h-40 border border-white/20 rounded-full" />
            </div>
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">自主可控 · 集约高效 · 安全可靠</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                城际云依托南京大数据集团资源，为政企客户提供安全可控的云计算基础设施和服务
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link to="/about" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-50 transition-all">
                  了解城际云 <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 border border-white/40 text-white font-medium rounded-lg hover:bg-white/10 transition-all">
                  联系我们
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <NewsHighlights />
      <DataShowcase />
      <PartnerLogos />
    </>
  );
}

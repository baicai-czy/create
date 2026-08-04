import { heroSlides, quickEntries, businessOverview, newsHighlights, dataShowcase, partners as defaultPartners } from '../data/home';
import { SectionTitle, LinkButton } from '../components/ui/index';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/common/ScrollReveal';
import { CountUp } from '../components/common/CountUp';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Cloud, Cpu, Lightbulb, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { homeApi } from '../api';
import { ScrollFloat } from '../components/common/ScrollFloat';
import { SpecularButton } from '../components/common/SpecularButton';
import { AuroraBG } from '../components/common/AuroraBG';
import { DotField } from '../components/common/DotField';

/* ===== HeroBanner ===== */
function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState(heroSlides);
  const navigate = useNavigate();

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
    <section className="relative min-h-[560px] md:min-h-[680px] flex items-center overflow-hidden bg-[#0A1628]">
      {/* 夜空渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0F2440] to-[#0A1628]" />
      {/* Banner背景图 */}
      {slide.image && (<div className="absolute inset-0 z-0"><img src={slide.image} alt="" className="w-full h-full object-cover opacity-35" /><div className="absolute inset-0 bg-[#0A1628]/70" /></div>)}
      {/* 动态光晕 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb glow-orb-blue w-[800px] h-[800px] -top-40 -right-40 animate-float" style={{ animationDelay: '0s' }} />
        <div className="glow-orb glow-orb-purple w-[600px] h-[600px] -bottom-20 -left-20 animate-float" style={{ animationDelay: '3s' }} />
        <div className="glow-orb glow-orb-cyan w-[500px] h-[500px] top-1/2 left-1/3 animate-float" style={{ animationDelay: '6s' }} />
      </div>
      {/* 网格纹理 */}
      <div className="absolute inset-0 texture-grid opacity-20" />
      {/* 城市天际线剪影 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 96" preserveAspectRatio="none">
          <path d="M0,96 L0,60 L30,60 L30,40 L60,40 L60,55 L90,55 L90,25 L120,25 L120,50 L150,50 L150,20 L180,20 L180,45 L210,45 L210,65 L240,65 L240,30 L270,30 L270,50 L300,50 L300,15 L330,15 L330,40 L360,40 L360,55 L390,55 L390,22 L420,22 L420,48 L450,48 L450,35 L480,35 L480,58 L510,58 L510,18 L540,18 L540,42 L570,42 L570,28 L600,28 L600,52 L630,52 L630,20 L660,20 L660,45 L690,45 L690,60 L720,60 L720,25 L750,25 L750,40 L780,40 L780,55 L810,55 L810,30 L840,30 L840,48 L870,48 L870,38 L900,38 L900,58 L930,58 L930,22 L960,22 L960,44 L990,44 L990,32 L1020,32 L1020,50 L1050,50 L1050,35 L1080,35 L1080,48 L1110,48 L1110,28 L1140,28 L1140,42 L1170,42 L1170,55 L1200,55 L1200,15 L1230,15 L1230,38 L1260,38 L1260,50 L1290,50 L1290,25 L1320,25 L1320,45 L1350,45 L1350,52 L1380,52 L1380,30 L1410,30 L1410,48 L1440,48 L1440,96 Z" fill="rgba(26,91,179,0.3)"/>
        </svg>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 py-24 md:py-32 z-20 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
            className="max-w-2xl"
          >
          {/* 状态指示 + 小标题 */}
          <div className="flex items-center gap-3 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <ScrollFloat
              animationDuration={0.6}
              ease="back.out(1.4)"
              stagger={0.015}
              mode="auto"
              textClassName="text-sm md:text-base text-white/70 font-medium tracking-wide"
            >
              {slide.subtitle}
            </ScrollFloat>
          </div>
          {/* 大标题 */}
          <ScrollFloat
              animationDuration={0.9}
              ease="back.out(1.7)"
              stagger={0.018}
              mode="auto"
              textClassName="text-5xl md:text-7xl lg:text-[80px] font-black text-white leading-[1.05] tracking-tight"
            >
              {slide.title}
            </ScrollFloat>
          <ScrollFloat
            animationDuration={0.7}
            ease="back.out(1.4)"
            stagger={0.010}
            mode="auto"
            textClassName="text-base md:text-lg text-white/55 leading-relaxed max-w-xl"
          >
            {slide.description}
          </ScrollFloat>
          <div className="flex items-center gap-4 flex-wrap mt-10">
            <SpecularButton
              size="md"
              radius={14}
              lineColor="#1A5BB3"
              baseColor="#ffffff"
              textColor="#1A5BB3"
              intensity={1.2}
              shineSize={12}
              thickness={1.2}
              speed={0.4}
              onClick={() => navigate(slide.cta1.path)}
            >
              <span className="flex items-center gap-2">{slide.cta1.label} <ArrowRight className="w-4 h-4" /></span>
            </SpecularButton>
            <SpecularButton
              size="md"
              radius={14}
              lineColor="#1A5BB3"
              baseColor="#ffffff"
              textColor="#1A5BB3"
              intensity={1.2}
              shineSize={12}
              thickness={1.2}
              speed={0.4}
              onClick={() => navigate(slide.cta2.path)}
            >
              {slide.cta2.label}
            </SpecularButton>
          </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators — 进度条 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 items-center">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="relative h-1 rounded-full transition-all duration-500 overflow-hidden"
            style={{ width: i === current ? 40 : 8, background: i === current ? 'white' : 'rgba(255,255,255,0.3)' }}
          >
            {i === current && (
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
                key={current}
              />
            )}
          </button>
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
                  <div className="glass rounded-2xl p-8 md:p-10 card-hover cursor-pointer h-full group border border-white/30 relative overflow-hidden">
                    <AuroraBG colorStops={['#1A5BB3', '#6C5ED4', '#00B4D8']} speed={0.3} blend={0.3} amplitude={0.6} />
                    <div className={`relative z-10 w-14 h-14 rounded-xl ${entry.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="relative z-10 text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{entry.title}</h3>
                    <p className="relative z-10 text-sm text-gray-400 leading-relaxed">{entry.description}</p>
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
    <div className="relative min-h-screen">
      <DotField
        dotRadius={2}
        dotSpacing={22}
        cursorRadius={280}
        bulgeStrength={160}
        gradientFrom="rgba(26,91,179,0.45)"
        gradientTo="rgba(108,94,212,0.30)"
        glowColor="#1A5BB3"
      />
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
    </div>
  );
}

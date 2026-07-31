import { Breadcrumb, SectionTitle } from '../../components/ui/index';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../../components/common/ScrollReveal';
import { solutions } from '../../data/solutions';
import { Cloud, RefreshCcw, DollarSign, Lock, CheckCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = { Cloud, RefreshCcw, DollarSign, Lock };

export default function EnterpriseCloud() {
  const { enterprise } = solutions;
  const tabs = [
    { label: '政府云', path: '/solutions' },
    { label: '企业云', path: '/solutions/enterprise' },
    { label: '数字化转型', path: '/solutions/digital-transformation' },
  ];
  const location = useLocation();

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '解决方案' }, { label: '企业云' }]} />
      <ScrollReveal>
        <SectionTitle title={enterprise.title} subtitle={enterprise.subtitle} />
        <p className="text-gray-500 leading-relaxed max-w-4xl mx-auto text-center -mt-8 mb-12">{enterprise.intro}</p>
      </ScrollReveal>

      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {tabs.map((tab) => (
          <Link key={tab.path} to={tab.path} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${location.pathname === tab.path ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-600 hover:text-primary hover:bg-primary-50 border border-gray-200'}`}>
            {tab.label}
          </Link>
        ))}
      </div>

      <StaggerContainer className="grid sm:grid-cols-2 gap-6 mb-16">
        {enterprise.features.map((f) => {
          const Icon = iconMap[f.icon] || Cloud;
          return (
            <StaggerItem key={f.title}>
              <div className="bg-white rounded-xl shadow-card border border-gray-100 p-8 card-hover h-full">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.description}</p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <ScrollReveal>
        <div className="bg-white rounded-xl shadow-card border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">服务行业</h3>
          <div className="flex flex-wrap gap-3">
            {enterprise.industries.map((ind) => (
              <span key={ind} className="inline-flex items-center gap-2 px-5 py-3 bg-primary-50 text-primary font-medium rounded-lg text-sm">
                <CheckCircle className="w-4 h-4" /> {ind}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

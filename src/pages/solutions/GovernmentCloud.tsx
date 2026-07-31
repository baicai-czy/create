import { Breadcrumb, SectionTitle } from '../../components/ui/index';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../../components/common/ScrollReveal';
import { solutions } from '../../data/solutions';
import { Shield, Monitor, LayoutDashboard, Share2, CheckCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = { Shield, Monitor, LayoutDashboard, Share2 };

export default function GovernmentCloud() {
  const { government } = solutions;
  const tabs = [
    { label: '政府云', path: '/solutions' },
    { label: '企业云', path: '/solutions/enterprise' },
    { label: '数字化转型', path: '/solutions/digital-transformation' },
  ];
  const location = useLocation();

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '解决方案' }, { label: '政府云' }]} />
      <ScrollReveal>
        <SectionTitle title={government.title} subtitle={government.subtitle} />
        <p className="text-gray-500 leading-relaxed max-w-4xl mx-auto text-center -mt-8 mb-12">{government.intro}</p>
      </ScrollReveal>

      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {tabs.map((tab) => (
          <Link key={tab.path} to={tab.path} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${location.pathname === tab.path ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-600 hover:text-primary hover:bg-primary-50 border border-gray-200'}`}>
            {tab.label}
          </Link>
        ))}
      </div>

      <StaggerContainer className="grid sm:grid-cols-2 gap-6 mb-16">
        {government.features.map((f) => {
          const Icon = iconMap[f.icon] || Shield;
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
          <h3 className="text-xl font-bold text-gray-900 mb-6">方案架构</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {government.architecture.map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

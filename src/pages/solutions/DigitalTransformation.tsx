import { Breadcrumb, SectionTitle } from '../../components/ui/index';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../../components/common/ScrollReveal';
import { solutions } from '../../data/solutions';
import { Database, Brain, Radio, Code2, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = { Database, Brain, Radio, Code2 };

export default function DigitalTransformation() {
  const { digital } = solutions;
  const tabs = [
    { label: '政府云', path: '/solutions' },
    { label: '企业云', path: '/solutions/enterprise' },
    { label: '数字化转型', path: '/solutions/digital-transformation' },
  ];
  const location = useLocation();

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '解决方案' }, { label: '数字化转型' }]} />
      <ScrollReveal>
        <SectionTitle title={digital.title} subtitle={digital.subtitle} />
        <p className="text-gray-500 leading-relaxed max-w-4xl mx-auto text-center -mt-8 mb-12">{digital.intro}</p>
      </ScrollReveal>

      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {tabs.map((tab) => (
          <Link key={tab.path} to={tab.path} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${location.pathname === tab.path ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-600 hover:text-primary hover:bg-primary-50 border border-gray-200'}`}>
            {tab.label}
          </Link>
        ))}
      </div>

      <StaggerContainer className="grid sm:grid-cols-2 gap-6 mb-16">
        {digital.features.map((f) => {
          const Icon = iconMap[f.icon] || Database;
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

      {/* Implementation Steps */}
      <ScrollReveal>
        <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">实施路径</h3>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-0">
          {digital.steps.map((step, i) => (
            <div key={step.title} className="flex items-center">
              <div className="bg-white rounded-xl shadow-card border border-gray-100 p-6 text-center w-44 card-hover">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-3">
                  {i + 1}
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-xs text-gray-400">{step.desc}</p>
              </div>
              {i < digital.steps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-gray-300 hidden md:block mx-2 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

import { Breadcrumb, SectionTitle } from '../../components/ui/index';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { cloudIntegration } from '../../data/business';
import { Compass, Wrench, MoveRight, Settings2, Building2 } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = { Compass, Wrench, MoveRight, Settings2 };

export default function CloudIntegration() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '业务矩阵' }, { label: '云和信息集成' }]} />
      <ScrollReveal>
        <SectionTitle title={cloudIntegration.title} subtitle={cloudIntegration.subtitle} />
        <p className="text-gray-500 leading-relaxed max-w-4xl mx-auto text-center -mt-8 mb-16">{cloudIntegration.intro}</p>
      </ScrollReveal>

      {/* Process Flow */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        {cloudIntegration.process.map((step, i) => {
          const Icon = iconMap[step.icon] || Compass;
          return (
            <ScrollReveal key={step.step} delay={i * 0.15}>
              <div className="bg-white rounded-xl shadow-card border border-gray-100 p-6 card-hover h-full relative">
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{step.description}</p>
                <ul className="space-y-1.5">
                  {step.items.map((item) => (
                    <li key={item} className="text-xs text-gray-500 flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Cases */}
      <ScrollReveal>
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">典型案例</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {cloudIntegration.cases.map((c) => (
            <div key={c.title} className="bg-white rounded-xl shadow-card border border-gray-100 p-6 card-hover">
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium text-primary bg-primary-50 px-2 py-0.5 rounded">{c.industry}</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-2">{c.title}</h4>
              <p className="text-sm text-gray-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

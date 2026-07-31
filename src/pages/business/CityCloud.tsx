import { Breadcrumb, SectionTitle } from '../../components/ui/index';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../../components/common/ScrollReveal';
import { cityCloud } from '../../data/business';
import { Server, Shield, Building2, CheckCircle } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = { Server, Shield, Building2 };

export default function CityCloud() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '业务矩阵' }, { label: '城市云' }]} />
      <ScrollReveal>
        <SectionTitle title={cityCloud.title} subtitle={cityCloud.subtitle} />
        <p className="text-gray-500 leading-relaxed max-w-4xl mx-auto text-center -mt-8 mb-12">{cityCloud.intro}</p>
      </ScrollReveal>

      {/* Services */}
      <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-16">
        {cityCloud.services.map((svc) => {
          const Icon = iconMap[svc.icon] || Server;
          return (
            <StaggerItem key={svc.title}>
              <div className="bg-white rounded-xl shadow-card border border-gray-100 p-8 card-hover h-full">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{svc.title}</h3>
                <p className="text-sm text-gray-500 mb-6">{svc.description}</p>
                <ul className="space-y-2">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Advantages */}
      <ScrollReveal>
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-10 md:p-12 text-white text-center">
          <h3 className="text-2xl font-bold mb-8">为什么选择城际云城市云</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cityCloud.advantages.map((adv) => (
              <div key={adv.title}>
                <p className="text-lg font-bold mb-1">{adv.title}</p>
                <p className="text-white/70 text-sm">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

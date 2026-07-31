import { Breadcrumb, SectionTitle } from '../../components/ui/index';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../../components/common/ScrollReveal';
import { culture } from '../../data/about';
import { Target, Eye, Gem, Zap } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = { Target, Eye, Gem, Zap };

export default function CorporateCulture() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '关于我们', path: '/about' }, { label: '企业文化' }]} />
      <ScrollReveal>
        <SectionTitle title={culture.title} subtitle={culture.subtitle} />
      </ScrollReveal>

      <StaggerContainer className="grid md:grid-cols-2 gap-6">
        {culture.items.map((item) => {
          const Icon = iconMap[item.icon] || Target;
          return (
            <StaggerItem key={item.title}>
              <div className="bg-white rounded-xl shadow-card border border-gray-100 p-8 card-hover h-full">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}

import { Breadcrumb, SectionTitle } from '../../components/ui/index';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../../components/common/ScrollReveal';
import { productCategories, aiServices } from '../../data/products';
import { Cpu, Brain, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = { Cpu, Brain, Sparkles };

export default function AIServices() {
  const location = useLocation();
  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '产品与服务' }, { label: '智算服务' }]} />
      <ScrollReveal>
        <SectionTitle title={aiServices.title} subtitle={aiServices.subtitle} />
      </ScrollReveal>
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {productCategories.map((cat) => (
          <Link
            key={cat.id}
            to={cat.path}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              location.pathname === cat.path ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-600 hover:text-primary hover:bg-primary-50 border border-gray-200'
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>
      <StaggerContainer className="grid md:grid-cols-3 gap-6">
        {aiServices.products.map((p) => {
          const Icon = iconMap[p.icon] || Cpu;
          return (
            <StaggerItem key={p.name}>
              <div className="bg-white rounded-xl shadow-card border border-gray-100 p-8 card-hover h-full">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-6">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.features.map((f) => (
                    <span key={f} className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100">{f}</span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}

import { Breadcrumb, SectionTitle } from '../../components/ui/index';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../../components/common/ScrollReveal';
import { qualifications } from '../../data/about';
import { Award } from 'lucide-react';

export default function Qualifications() {
  const categories = [...new Set(qualifications.map((q) => q.category))];

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '关于我们', path: '/about' }, { label: '资质荣誉' }]} />
      <ScrollReveal>
        <SectionTitle title="资质荣誉" subtitle="资质认证与荣誉奖项" />
      </ScrollReveal>

      {categories.map((cat) => (
        <div key={cat} className="mb-12">
          <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            {cat}
          </h3>
          <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {qualifications.filter((q) => q.category === cat).map((q) => (
              <StaggerItem key={q.name}>
                <div className="bg-white rounded-xl shadow-card border border-gray-100 p-6 card-hover text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 leading-relaxed">{q.name}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      ))}
    </div>
  );
}

import { Breadcrumb, SectionTitle } from '../../components/ui/index';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { milestones } from '../../data/about';

export default function DevelopmentHistory() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '关于我们', path: '/about' }, { label: '发展历程' }]} />
      <ScrollReveal>
        <SectionTitle title="发展历程" subtitle="城际云的重要里程碑" />
      </ScrollReveal>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-translate-x-px" />

        <div className="space-y-8">
          {milestones.map((m, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-6 ring-4 ring-white" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-white rounded-xl shadow-card border border-gray-100 p-6 card-hover">
                    <span className="text-xs font-semibold text-primary bg-primary-50 px-2 py-0.5 rounded">
                      {m.year}.{m.month}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1">{m.title}</h3>
                    <p className="text-sm text-gray-500">{m.description}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Breadcrumb } from '../../components/ui/index';
import { SectionTitle } from '../../components/ui/index';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { companyIntro } from '../../data/about';
import { Building2 } from 'lucide-react';

export default function CompanyIntro() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '关于我们' }, { label: '公司简介' }]} />

      <ScrollReveal>
        <SectionTitle title={companyIntro.title} subtitle={companyIntro.subtitle} />
      </ScrollReveal>

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        <ScrollReveal className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-card border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">公司概况</h2>
            </div>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{companyIntro.content}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-white rounded-xl shadow-card border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">基本信息</h3>
            <div className="space-y-4">
              {companyIntro.highlights.map((h) => (
                <div key={h.label}>
                  <p className="text-xs text-gray-400 mb-1">{h.label}</p>
                  <p className="text-sm font-semibold text-gray-800">{h.value}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Business Scope */}
      <ScrollReveal>
        <div className="bg-white rounded-xl shadow-card border border-gray-100 p-8 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">业务范围</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {['云基础设施的建设与运维', '政务云的建设和运营', '信息化系统集成及技术服务', '企业云的建设和运营', '数据服务与数据治理', '安全咨询与安全服务'].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

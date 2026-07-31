import { Breadcrumb, SectionTitle } from '../../components/ui/index';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { organization } from '../../data/about';

export default function OrgStructure() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '关于我们', path: '/about' }, { label: '组织架构' }]} />
      <ScrollReveal>
        <SectionTitle title={organization.title} subtitle="高效协作的组织体系" />
      </ScrollReveal>

      <ScrollReveal>
        <div className="bg-white rounded-xl shadow-card border border-gray-100 p-8 md:p-12">
          {/* Level 1 */}
          <div className="flex justify-center mb-8">
            <div className="bg-primary text-white rounded-xl px-8 py-4 text-center">
              <p className="text-lg font-bold">总经理办公室</p>
            </div>
          </div>

          {/* Connectors */}
          <div className="flex justify-center mb-4">
            <div className="w-0.5 h-8 bg-gray-300" />
          </div>

          {/* Level 2 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {['技术研发中心', '运维管理中心', '市场销售部', '综合管理部'].map((dept) => (
              <div key={dept} className="bg-primary-50 border-2 border-primary-100 rounded-xl px-6 py-4 text-center">
                <p className="text-sm font-semibold text-primary-700">{dept}</p>
              </div>
            ))}
          </div>

          {/* Level 2 to 3 connectors */}
          <div className="flex justify-center gap-4 mb-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-0.5 h-6 bg-gray-200" />
            ))}
          </div>

          {/* Level 3 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              {['云平台研发组', 'AI研发组'].map((team) => (
                <div key={team} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-center">
                  <p className="text-xs text-gray-600">{team}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {['安全运维组', '客户支持组'].map((team) => (
                <div key={team} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-center">
                  <p className="text-xs text-gray-600">{team}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {['政府事业部', '企业事业部'].map((team) => (
                <div key={team} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-center">
                  <p className="text-xs text-gray-600">{team}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {['人力资源组', '财务组'].map((team) => (
                <div key={team} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-center">
                  <p className="text-xs text-gray-600">{team}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

import { useState } from 'react';
import { Breadcrumb, SectionTitle, Button, Input } from '../../components/ui/index';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../../components/common/ScrollReveal';
import { contactInfo } from '../../data/contact';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = { MapPin, Phone, Mail, Clock };

export default function ContactUs() {
  const [formType, setFormType] = useState<'consult' | 'cooperate'>('consult');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '联系我们' }]} />
      <ScrollReveal>
        <SectionTitle title={contactInfo.title} subtitle={contactInfo.subtitle} />
      </ScrollReveal>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1">
          <StaggerContainer className="space-y-4">
            {contactInfo.info.map((item) => {
              const Icon = iconMap[item.icon] || MapPin;
              return (
                <StaggerItem key={item.label}>
                  <div className="bg-white rounded-xl shadow-card border border-gray-100 p-6 card-hover">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                        <p className="text-sm font-semibold text-gray-800 whitespace-pre-line">{item.value}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Form */}
        <ScrollReveal className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-card border border-gray-100 p-8">
            {/* Form type tabs */}
            <div className="flex gap-1 bg-gray-50 rounded-lg p-1 mb-8 inline-flex">
              <button
                onClick={() => setFormType('consult')}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  formType === 'consult' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                在线咨询
              </button>
              <button
                onClick={() => setFormType('cooperate')}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  formType === 'cooperate' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                合作申请
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">提交成功!</h3>
                <p className="text-gray-500">感谢您的咨询，我们的业务顾问将在1个工作日内与您联系。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Input label="姓名" type="text" required placeholder="请输入您的姓名" />
                  <Input label="公司名称" type="text" required placeholder="请输入您的公司名称" />
                  <Input label="联系电话" type="tel" required placeholder="请输入您的联系电话" />
                  <Input label="电子邮箱" type="email" placeholder="请输入您的电子邮箱" />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">感兴趣的服务 *</label>
                  <select className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white" required>
                    <option value="">请选择</option>
                    {['通用云服务', '智算服务', '云集成服务', '运维服务', '解决方案', '其他'].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">咨询内容</label>
                  <textarea
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    rows={4}
                    placeholder="请描述您的需求或问题..."
                  />
                </div>

                <Button type="submit" size="lg">
                  <Send className="w-4 h-4" /> 提交咨询
                </Button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

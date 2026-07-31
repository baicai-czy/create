// 联系我们页面数据
export const contactInfo = {
  title: '联系我们',
  subtitle: '期待与您的合作',
  info: [
    {
      icon: 'MapPin',
      label: '公司地址',
      value: '江苏省南京市建邺区XXX路XXX号\n南京大数据产业园A座',
    },
    {
      icon: 'Phone',
      label: '服务热线',
      value: '400-XXX-XXXX',
    },
    {
      icon: 'Mail',
      label: '电子邮箱',
      value: 'contact@cityintercloud.com',
    },
    {
      icon: 'Clock',
      label: '工作时间',
      value: '周一至周五 9:00 - 18:00',
    },
  ],
  formTitle: '在线咨询',
  formDescription: '填写以下表单，我们的业务顾问将在1个工作日内与您联系',
  formFields: [
    { name: 'name', label: '姓名', type: 'text', required: true, placeholder: '请输入您的姓名' },
    { name: 'company', label: '公司名称', type: 'text', required: true, placeholder: '请输入您的公司名称' },
    { name: 'phone', label: '联系电话', type: 'tel', required: true, placeholder: '请输入您的联系电话' },
    { name: 'email', label: '电子邮箱', type: 'email', required: false, placeholder: '请输入您的电子邮箱' },
    { name: 'service', label: '感兴趣的服务', type: 'select', required: true, options: ['通用云服务', '智算服务', '云集成服务', '运维服务', '解决方案', '其他'] },
    { name: 'message', label: '咨询内容', type: 'textarea', required: false, placeholder: '请描述您的需求或问题...' },
  ],
  cooperationTitle: '合作申请',
  cooperationDescription: '如果您希望成为城际云的合作伙伴，请填写合作申请表',
};

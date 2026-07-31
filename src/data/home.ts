// 首页各模块数据
export const heroSlides = [
  {
    id: 1,
    title: '城际云 · 城市云服务专家',
    subtitle: '自主可控 · 集约高效 · 安全可靠',
    description: '依托南京大数据集团，建设并运营南京政务云，为江苏省内外提供核心算力节点资源',
    cta1: { label: '免费咨询', path: '/contact' },
    cta2: { label: '了解更多', path: '/about' },
    gradient: 'from-primary-600 via-primary-500 to-cyan-400',
  },
  {
    id: 2,
    title: '智算云平台 · AI 新时代',
    subtitle: 'GPU算力 · 大模型平台 · AI推理服务',
    description: '为企业提供高性能GPU云服务器、AI训练平台和大模型部署服务，加速智能化转型',
    cta1: { label: '了解智算服务', path: '/products/ai' },
    cta2: { label: '查看解决方案', path: '/solutions' },
    gradient: 'from-purple-600 via-primary-500 to-cyan-400',
  },
  {
    id: 3,
    title: '云和信息集成 · 全生命周期服务',
    subtitle: '规划 · 建设 · 运维 · 迁移',
    description: '从战略规划到架构设计，从平台搭建到运维管理，提供一站式云和信息集成服务',
    cta1: { label: '了解业务矩阵', path: '/business' },
    cta2: { label: '联系我们', path: '/contact' },
    gradient: 'from-cyan-600 via-primary-500 to-purple-500',
  },
];

export const quickEntries = [
  {
    icon: 'Cloud',
    title: '通用云',
    description: '弹性计算 · 云存储 · 云网络 · 云安全',
    path: '/products',
    color: 'bg-primary-50 text-primary-600',
  },
  {
    icon: 'Cpu',
    title: '智算云',
    description: 'GPU云服务器 · AI平台 · 大模型服务',
    path: '/products/ai',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: 'Lightbulb',
    title: '解决方案',
    description: '政府云 · 企业云 · 数字化转型',
    path: '/solutions',
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: 'Phone',
    title: '联系我们',
    description: '在线咨询 · 合作申请 · 技术支持',
    path: '/contact',
    color: 'bg-accent-50 text-accent-600',
  },
];

export const businessOverview = {
  title: '业务矩阵',
  subtitle: '两大核心业务板块，全方位赋能政企数字化转型',
  items: [
    {
      title: '城市云',
      description: '以城市关键基础设施为底座，建设运营城市云平台。涵盖通用云、专有云、行业云三大服务体系，为政务、金融、医疗、教育等行业提供安全可控的云计算服务。',
      features: ['通用云服务', '专有云部署', '行业云解决方案', '政务云平台运营'],
      path: '/business/city-cloud',
      image: '🏙️',
    },
    {
      title: '云和信息集成',
      description: '提供从云战略规划到架构设计，从平台建设到运维管理，从应用迁移到持续优化的全生命周期云和信息集成服务，助力企业高效上云、用好云。',
      features: ['云战略规划', '云平台建设', '应用系统迁移', '7×24运维保障'],
      path: '/business/cloud-integration',
      image: '🔗',
    },
  ],
};

export const newsHighlights = {
  title: '新闻动态',
  subtitle: '了解城际云最新动态与行业前沿',
  featuredNews: [
    { id: '1', title: '城际云正式发布智算云平台V2.0，全面升级AI算力服务', date: '2026-07-15', category: 'company', summary: '新一代智算云平台提供更大规模GPU集群、更高性能网络互联、更便捷的AI开发环境。' },
    { id: '2', title: '城际云与江苏省大数据管理中心达成战略合作', date: '2026-07-08', category: 'company', summary: '双方将在数据要素流通、隐私计算、数据安全等领域展开深度合作。' },
    { id: '3', title: '南京政务云节点扩容完成，算力规模突破100PFLOPS', date: '2026-06-28', category: 'company', summary: '本次扩容新增200台高性能服务器节点，全面满足政务信息化建设需求。' },
    { id: '4', title: '城际云通过ISO 27001信息安全管理体系认证', date: '2026-06-20', category: 'company', summary: '标志着城际云在信息安全管理和客户数据保护方面达到了国际先进水平。' },
    { id: '5', title: '云计算在智慧城市建设中的应用与展望', date: '2026-06-15', category: 'industry', summary: '探讨云计算如何作为智慧城市数字底座，赋能城市治理、民生服务和产业发展。' },
    { id: '6', title: '城际云荣获"2026年度优秀云服务商"称号', date: '2026-06-10', category: 'notice', summary: '在中国云计算产业大会上，城际云凭借卓越的服务能力和创新实践获得行业认可。' },
  ],
};

export const dataShowcase = {
  title: '城际云 · 用数据说话',
  items: [
    { value: 500, suffix: '+', label: '服务客户数' },
    { value: 100, suffix: ' PFLOPS', label: '总算力规模' },
    { value: 99.99, suffix: '%', label: '服务可用性', decimals: 2 },
    { value: 1500, suffix: '+', label: '持续运营天数' },
  ],
};

export const partners = [
  '华为云', '阿里云', '腾讯云', '百度智能云',
  '浪潮', '曙光', '新华三', '中兴通讯',
  '启明星辰', '深信服', '奇安信', '天融信',
];

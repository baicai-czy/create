// 关于我们页面数据
export const companyIntro = {
  title: '公司简介',
  subtitle: '城际云(江苏)科技有限公司',
  content: `城际云(江苏)科技有限公司（简称"城际云公司"）是南京大数据集团的全资子公司，注册资本4000万元。公司肩负着建设运营南京政务云、为江苏省内外提供核心算力节点资源的重要使命，同时围绕城市关键基础设施底座，建设并运营城市产业云。

城际云公司秉持"自主可控、集约高效、安全可靠"的发展原则，以成为最懂行业的云服务公司为使命愿景，踏实深耕行业价值，为政企客户提供专业贴心的端到端价值服务，并以此为基石逐步成为政企数字化转型的核心服务提供商。`,
  highlights: [
    { label: '注册资本', value: '4000万元' },
    { label: '母公司', value: '南京大数据集团' },
    { label: '业务定位', value: '城市云 + 云和信息集成' },
    { label: '服务区域', value: '江苏省及全国' },
  ],
};

export const milestones = [
  { year: '2023', month: '03', title: '公司成立', description: '城际云(江苏)科技有限公司正式注册成立' },
  { year: '2023', month: '06', title: '获得云服务牌照', description: '取得增值电信业务经营许可证' },
  { year: '2023', month: '09', title: '南京政务云上线', description: '首个政务云节点建成并投入运营' },
  { year: '2024', month: '03', title: '首个企业云项目', description: '签约首个大型企业云服务项目' },
  { year: '2024', month: '09', title: '通过等保三级认证', description: '信息系统安全等级保护三级认证' },
  { year: '2025', month: '01', title: '算力突破50PFLOPS', description: '总算力规模突破50PFLOPS' },
  { year: '2025', month: '06', title: '发布智算云平台V1.0', description: '正式发布智算云产品线' },
  { year: '2025', month: '12', title: '通过ISO 27001认证', description: '信息安全管理体系国际认证' },
  { year: '2026', month: '06', title: '算力突破100PFLOPS', description: '总算力规模突破100PFLOPS，服务客户超500家' },
  { year: '2026', month: '07', title: '发布智算云平台V2.0', description: '全面升级AI算力服务能力' },
];

export const culture = {
  title: '企业文化',
  subtitle: '使命 · 愿景 · 价值观',
  items: [
    {
      icon: 'Target',
      title: '企业使命',
      description: '以云计算为核心，为政企客户提供安全可控、集约高效的数字基础设施服务，助力城市数字化转型与产业升级。',
    },
    {
      icon: 'Eye',
      title: '企业愿景',
      description: '成为最懂行业的云服务公司，做政企数字化转型的核心服务提供商。',
    },
    {
      icon: 'Gem',
      title: '核心价值观',
      description: '自主可控、集约高效、安全可靠、客户至上、创新驱动、合作共赢。',
    },
    {
      icon: 'Zap',
      title: '发展原则',
      description: '坚持自主可控技术路线，走集约化发展道路，确保平台和数据安全可靠，为客户创造最大价值。',
    },
  ],
};

export const qualifications = [
  { name: '增值电信业务经营许可证', category: '运营资质' },
  { name: 'ISO 27001 信息安全管理体系认证', category: '管理体系' },
  { name: 'ISO 9001 质量管理体系认证', category: '管理体系' },
  { name: '信息系统安全等级保护三级', category: '安全认证' },
  { name: '高新技术企业证书', category: '企业资质' },
  { name: '2026年度优秀云服务商', category: '荣誉奖项' },
  { name: '江苏省大数据优秀企业', category: '荣誉奖项' },
  { name: 'CMMI 3级认证', category: '技术资质' },
];

export const organization = {
  title: '组织架构',
  departments: [
    { name: '总经理办公室', level: 1 },
    { name: '技术研发中心', level: 2, parent: '总经理办公室' },
    { name: '运维管理中心', level: 2, parent: '总经理办公室' },
    { name: '市场销售部', level: 2, parent: '总经理办公室' },
    { name: '综合管理部', level: 2, parent: '总经理办公室' },
    { name: '云平台研发组', level: 3, parent: '技术研发中心' },
    { name: 'AI研发组', level: 3, parent: '技术研发中心' },
    { name: '安全运维组', level: 3, parent: '运维管理中心' },
    { name: '客户支持组', level: 3, parent: '运维管理中心' },
    { name: '政府事业部', level: 3, parent: '市场销售部' },
    { name: '企业事业部', level: 3, parent: '市场销售部' },
    { name: '人力资源组', level: 3, parent: '综合管理部' },
    { name: '财务组', level: 3, parent: '综合管理部' },
  ],
};

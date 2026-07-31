// 导航结构数据 — 严格对齐 SOW 第二章第七节
// SOW: 7个一级栏目 — 首页/关于我们/业务矩阵/产品与服务/解决方案/新闻中心/联系我们
export interface MegaMenuItem {
  label: string;
  path: string;
  children?: { label: string; path: string; desc?: string }[];
  sections?: { title: string; items: { label: string; path?: string; tag?: string }[] }[];
}

export const mainNav: MegaMenuItem[] = [
  { label: '首页', path: '/' },
  {
    label: '关于我们',
    path: '/about',
    children: [
      { label: '公司简介', path: '/about', desc: '了解城际云的公司概况与发展' },
      { label: '发展历程', path: '/about/history', desc: '城际云的重要里程碑' },
      { label: '企业文化', path: '/about/culture', desc: '使命、愿景与核心价值观' },
      { label: '资质荣誉', path: '/about/qualifications', desc: '资质认证与荣誉奖项' },
      { label: '组织架构', path: '/about/organization', desc: '公司组织架构图' },
    ],
  },
  {
    label: '业务矩阵',
    path: '/business',
    children: [
      { label: '城市云', path: '/business/city-cloud', desc: '通用云 / 专有云 / 行业云' },
      { label: '云和信息集成', path: '/business/cloud-integration', desc: '规划 → 建设 → 运维 → 迁移' },
    ],
  },
  {
    label: '产品与服务',
    path: '/products',
    children: [
      { label: '通用服务', path: '/products', desc: '弹性计算 / 云存储 / 云网络 / 云安全' },
      { label: '智算服务', path: '/products/ai', desc: 'GPU云 / AI平台 / 大模型服务' },
      { label: '云集成服务', path: '/products/integration', desc: '规划咨询 / 建设实施 / 迁移' },
      { label: '运维服务', path: '/products/ops', desc: '7×24监控 / 故障处理 / 优化' },
    ],
  },
  {
    label: '解决方案',
    path: '/solutions',
    children: [
      { label: '政府云解决方案', path: '/solutions', desc: '安全合规的政务云平台' },
      { label: '企业云解决方案', path: '/solutions/enterprise', desc: '助力企业数字化转型' },
      { label: '数字化转型方案', path: '/solutions/digital-transformation', desc: '全面的数字化升级路径' },
    ],
  },
  {
    label: '新闻中心',
    path: '/news',
    children: [
      { label: '公司动态', path: '/news?category=company' },
      { label: '行业资讯', path: '/news?category=industry' },
      { label: '通知公告', path: '/news?category=notice' },
    ],
  },
  {
    label: '联系我们',
    path: '/contact',
    children: [
      { label: '联系方式', path: '/contact', desc: '地址 / 电话 / 邮箱' },
      { label: '在线咨询', path: '/contact', desc: '填写咨询表单' },
      { label: '合作申请', path: '/contact', desc: '成为城际云合作伙伴' },
    ],
  },
];

export const footerLinks = {
  products: {
    title: '产品与服务',
    links: [
      { label: '通用服务', path: '/products' },
      { label: '智算服务', path: '/products/ai' },
      { label: '云集成服务', path: '/products/integration' },
      { label: '运维服务', path: '/products/ops' },
      { label: '查看全部 →', path: '/products' },
    ],
  },
  solutions: {
    title: '解决方案',
    links: [
      { label: '政府云解决方案', path: '/solutions' },
      { label: '企业云解决方案', path: '/solutions/enterprise' },
      { label: '数字化转型方案', path: '/solutions/digital-transformation' },
    ],
  },
  business: {
    title: '业务矩阵',
    links: [
      { label: '城市云', path: '/business/city-cloud' },
      { label: '云和信息集成', path: '/business/cloud-integration' },
    ],
  },
  support: {
    title: '支持与服务',
    links: [
      { label: '产品文档', path: '/products' },
      { label: '常见问题', path: '/news' },
      { label: '联系我们', path: '/contact' },
      { label: '智能客服', path: '/contact' },
    ],
  },
  contact: {
    title: '联系我们',
    links: [
      { label: '服务热线：400-XXX-XXXX', path: '/contact' },
      { label: '邮箱：contact@cityintercloud.com', path: '/contact' },
      { label: '地址：南京市建邺区XXX路XXX号', path: '/contact' },
      { label: '在线咨询', path: '/contact' },
      { label: '合作申请', path: '/contact' },
    ],
  },
};

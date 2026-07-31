// 导航结构数据 — 对齐阿里云产品分类体系
export interface MegaMenuItem {
  label: string;
  path: string;
  children?: { label: string; path: string; desc?: string }[];
  sections?: { title: string; items: { label: string; path?: string; tag?: string }[] }[];
}

export const mainNav: MegaMenuItem[] = [
  { label: '首页', path: '/' },
  {
    label: '产品',
    path: '/products',
    sections: [
      {
        title: '计算',
        items: [
          { label: '弹性云服务器', tag: '热门' },
          { label: 'GPU云服务器' },
          { label: '轻量应用服务器' },
          { label: '弹性容器实例' },
          { label: '函数计算' },
        ],
      },
      {
        title: '存储',
        items: [
          { label: '对象存储' },
          { label: '文件存储' },
          { label: '块存储' },
          { label: '表格存储' },
          { label: '云备份' },
        ],
      },
      {
        title: '网络',
        items: [
          { label: '虚拟私有云' },
          { label: '负载均衡' },
          { label: 'CDN加速' },
          { label: 'NAT网关' },
        ],
      },
      {
        title: '安全',
        items: [
          { label: 'DDoS防护' },
          { label: 'Web应用防火墙' },
          { label: '云安全中心' },
          { label: 'SSL证书' },
          { label: '堡垒机' },
        ],
      },
      {
        title: '数据库',
        items: [
          { label: '云数据库MySQL' },
          { label: '云数据库Redis' },
          { label: '云数据库MongoDB' },
          { label: '数据传输服务' },
        ],
      },
      {
        title: 'AI与智算',
        items: [
          { label: 'GPU算力平台', tag: '新品' },
          { label: 'AI开发平台' },
          { label: '大模型服务' },
          { label: '文字识别' },
          { label: '语音交互' },
        ],
      },
    ],
  },
  {
    label: '解决方案',
    path: '/solutions',
    sections: [
      {
        title: '按行业',
        items: [
          { label: '政务云方案' },
          { label: '金融云方案' },
          { label: '医疗云方案' },
          { label: '教育云方案' },
          { label: '制造云方案' },
        ],
      },
      {
        title: '按场景',
        items: [
          { label: '数字化转型' },
          { label: '数据中台' },
          { label: '灾备容灾' },
          { label: '混合云架构' },
          { label: '安全合规' },
        ],
      },
      {
        title: '核心技术',
        items: [
          { label: '容器与微服务' },
          { label: 'Serverless' },
          { label: '大数据分析' },
          { label: '物联网平台' },
          { label: '区块链服务' },
        ],
      },
    ],
  },
  {
    label: '生态合作',
    path: '/business',
    children: [
      { label: '城市云生态', path: '/business/city-cloud', desc: '政务 / 金融 / 医疗 / 教育' },
      { label: '云和信息集成', path: '/business/cloud-integration', desc: '规划 → 建设 → 运维 → 迁移' },
      { label: '合作伙伴', path: '/about/qualifications', desc: '加入城际云生态体系' },
    ],
  },
  {
    label: '客户案例',
    path: '/solutions',
    children: [
      { label: '政务行业案例', path: '/solutions' },
      { label: '金融行业案例', path: '/solutions/enterprise' },
      { label: '医疗行业案例', path: '/solutions/digital-transformation' },
      { label: '更多案例', path: '/news' },
    ],
  },
  {
    label: '文档与支持',
    path: '/products',
    children: [
      { label: '产品文档', path: '/products' },
      { label: '最佳实践', path: '/solutions' },
      { label: '常见问题', path: '/news' },
      { label: '技术支持', path: '/contact' },
    ],
  },
  {
    label: '关于城际云',
    path: '/about',
    children: [
      { label: '公司简介', path: '/about', desc: '了解城际云的公司概况与发展' },
      { label: '发展历程', path: '/about/history', desc: '城际云的重要里程碑' },
      { label: '企业文化', path: '/about/culture', desc: '使命、愿景与核心价值观' },
      { label: '资质荣誉', path: '/about/qualifications', desc: '资质认证与荣誉奖项' },
      { label: '新闻中心', path: '/news', desc: '公司动态与行业资讯' },
    ],
  },
];

export const footerLinks = {
  products: {
    title: '产品与服务',
    links: [
      { label: '弹性云服务器', path: '/products' },
      { label: 'GPU云服务器', path: '/products/ai' },
      { label: '对象存储', path: '/products' },
      { label: '云数据库', path: '/products' },
      { label: '云安全', path: '/products' },
      { label: '查看全部产品 →', path: '/products' },
    ],
  },
  solutions: {
    title: '解决方案',
    links: [
      { label: '政务云方案', path: '/solutions' },
      { label: '金融云方案', path: '/solutions/enterprise' },
      { label: '数字化转型方案', path: '/solutions/digital-transformation' },
      { label: '数据中台', path: '/solutions/digital-transformation' },
      { label: '灾备容灾', path: '/solutions/enterprise' },
    ],
  },
  about: {
    title: '关于城际云',
    links: [
      { label: '公司简介', path: '/about' },
      { label: '发展历程', path: '/about/history' },
      { label: '企业文化', path: '/about/culture' },
      { label: '资质荣誉', path: '/about/qualifications' },
      { label: '合作伙伴', path: '/business' },
    ],
  },
  support: {
    title: '支持与服务',
    links: [
      { label: '产品文档', path: '/products' },
      { label: '最佳实践', path: '/solutions' },
      { label: '常见问题', path: '/news' },
      { label: '联系我们', path: '/contact' },
      { label: '提交工单', path: '/contact' },
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

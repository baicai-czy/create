// 产品与服务页面数据
export const productCategories = [
  {
    id: 'general',
    label: '通用服务',
    path: '/products',
    description: '弹性计算 · 云存储 · 云网络 · 云安全',
  },
  {
    id: 'ai',
    label: '智算服务',
    path: '/products/ai',
    description: 'GPU云 · AI平台 · 大模型服务',
  },
  {
    id: 'integration',
    label: '云集成服务',
    path: '/products/integration',
    description: '规划咨询 · 建设实施 · 迁移服务',
  },
  {
    id: 'ops',
    label: '运维服务',
    path: '/products/ops',
    description: '7×24监控 · 故障处理 · 优化建议',
  },
];

export const generalServices = {
  title: '通用云服务',
  subtitle: '弹性、安全、可靠的基础云服务',
  products: [
    {
      name: '弹性云服务器',
      description: '提供安全稳定、弹性可扩展的云端计算服务，支持多种规格实例，分钟级交付。',
      features: ['多种实例规格', '弹性伸缩', '镜像管理', '安全组防护'],
      icon: 'Server',
    },
    {
      name: '云存储',
      description: '提供对象存储、块存储、文件存储等多种存储服务，数据持久性高达99.9999999%。',
      features: ['对象存储', '块存储', '文件存储', '数据备份'],
      icon: 'HardDrive',
    },
    {
      name: '云网络',
      description: '提供虚拟私有云、负载均衡、云解析等网络服务，构建灵活安全的网络架构。',
      features: ['虚拟私有云', '负载均衡', 'NAT网关', '云解析DNS'],
      icon: 'Network',
    },
    {
      name: '云安全',
      description: '提供DDoS防护、Web应用防火墙、主机安全等全方位安全防护服务。',
      features: ['DDoS防护', 'Web应用防火墙', '主机安全', '漏洞扫描'],
      icon: 'ShieldCheck',
    },
  ],
};

export const aiServices = {
  title: '智算服务',
  subtitle: 'AI时代的智能计算基础设施',
  products: [
    {
      name: 'GPU云服务器',
      description: '提供NVIDIA A100/H100等高性能GPU实例，支持深度学习训练与推理。',
      features: ['A100/H100 GPU', 'RDMA高速网络', '弹性GPU集群', '训练/推理优化'],
      icon: 'Cpu',
    },
    {
      name: 'AI开发平台',
      description: '一站式AI模型开发平台，提供数据标注、模型训练、评估优化全流程支持。',
      features: ['数据标注工具', '分布式训练', 'AutoML', '模型评估'],
      icon: 'Brain',
    },
    {
      name: '大模型服务',
      description: '提供大语言模型API访问服务，支持文本生成、语义理解、代码生成等多场景。',
      features: ['LLM API', '语义理解', '文本生成', '定制微调'],
      icon: 'Sparkles',
    },
  ],
};

export const integrationServices = {
  title: '云集成服务',
  subtitle: '专业的上云咨询与实施服务',
  products: [
    {
      name: '云规划咨询',
      description: '资深架构师团队提供上云战略规划、架构设计和技术选型咨询服务。',
      features: ['业务调研', '架构设计', '技术选型', 'TCO评估'],
      icon: 'ClipboardList',
    },
    {
      name: '云建设实施',
      description: '专业团队负责云平台搭建、系统集成和环境部署，确保项目按时交付。',
      features: ['平台搭建', '系统集成', '环境部署', '联调测试'],
      icon: 'Hammer',
    },
    {
      name: '应用迁移服务',
      description: '提供数据库迁移、应用迁移、数据迁移的全套迁移方案与实施。',
      features: ['迁移评估', '方案设计', '数据迁移', '业务切换'],
      icon: 'Truck',
    },
  ],
};

export const opsServices = {
  title: '运维服务',
  subtitle: '7×24小时全天候运维保障',
  products: [
    {
      name: '基础设施监控',
      description: '7×24小时全方位监控云基础设施运行状态，主动发现并预警潜在问题。',
      features: ['全栈监控', '智能告警', '可视化大盘', '日报周报'],
      icon: 'Activity',
    },
    {
      name: '故障应急处理',
      description: '快速响应机制，专业运维团队及时处理各类故障，保障业务连续性。',
      features: ['2小时响应', '故障定位', '快速恢复', '根因分析'],
      icon: 'Siren',
    },
    {
      name: '性能优化服务',
      description: '定期对云上环境进行性能评估与优化，持续提升系统效率、降低运营成本。',
      features: ['性能评估', '资源优化', '成本管理', '架构改进'],
      icon: 'TrendingUp',
    },
  ],
};

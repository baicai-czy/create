// 解决方案页面数据
export const solutions = {
  government: {
    title: '政府云解决方案',
    subtitle: '安全合规、自主可控的政务云平台',
    intro: '基于城际云在南京政务云的建设和运营经验，为各级政府提供安全合规、稳定可靠的政务云解决方案。满足等保三级、国产化适配等政务信息化建设要求。',
    features: [
      {
        title: '安全合规',
        description: '严格遵循等保2.0三级要求，提供物理隔离、数据加密、访问控制等多层安全防护。',
        icon: 'Shield',
      },
      {
        title: '国产化适配',
        description: '全面适配国产CPU、操作系统、数据库和中间件，满足信创要求。',
        icon: 'Monitor',
      },
      {
        title: '统一管理',
        description: '提供统一的云管平台，实现多级政府部门资源的集中管理和按需分配。',
        icon: 'LayoutDashboard',
      },
      {
        title: '数据共享交换',
        description: '建设政务数据共享交换平台，打破信息孤岛，提升跨部门协同效率。',
        icon: 'Share2',
      },
    ],
    architecture: [
      '政务外网 + 互联网双区部署',
      '国产化硬件 + 云平台软件',
      '数据中台 + 业务中台双轮驱动',
      '统一运维 + 安全运营中心',
    ],
  },
  enterprise: {
    title: '企业云解决方案',
    subtitle: '助力企业高效上云、安全用云',
    intro: '针对企业上云过程中的痛点和需求，城际云提供端到端的企业云解决方案。覆盖金融、制造、零售、医疗等多个行业，帮助企业实现IT基础设施的现代化转型。',
    features: [
      {
        title: '混合云架构',
        description: '支持私有云+公有云混合部署模式，兼顾数据安全与弹性扩展需求。',
        icon: 'Cloud',
      },
      {
        title: '灾备容灾',
        description: '提供同城双活、异地灾备等高可用架构方案，保障业务连续性。',
        icon: 'RefreshCcw',
      },
      {
        title: '成本优化',
        description: '通过资源画像分析、弹性伸缩策略实现云资源成本精细化管理。',
        icon: 'DollarSign',
      },
      {
        title: '安全防护',
        description: '从网络边界到主机层面，提供纵深防御的安全体系方案。',
        icon: 'Lock',
      },
    ],
    industries: ['金融', '制造', '零售', '医疗', '教育', '交通'],
  },
  digital: {
    title: '数字化转型解决方案',
    subtitle: '以云计算为底座，驱动业务创新与增长',
    intro: '数字化转型不仅是技术升级，更是业务模式和管理方式的深刻变革。城际云以云计算为底座，融合大数据、AI、物联网等技术，为企业提供一站式数字化转型服务。',
    features: [
      {
        title: '数据中台建设',
        description: '构建企业级数据中台，实现数据资产的统一管理、治理和应用。',
        icon: 'Database',
      },
      {
        title: 'AI能力赋能',
        description: '将AI能力注入业务流程，实现智能客服、智能质检、智能预测等场景。',
        icon: 'Brain',
      },
      {
        title: '物联网平台',
        description: '构建IoT数据采集与分析平台，支撑智慧工厂、智慧园区等场景。',
        icon: 'Radio',
      },
      {
        title: '低代码开发',
        description: '提供低代码应用开发平台，快速响应业务需求，缩短应用上线周期。',
        icon: 'Code2',
      },
    ],
    steps: [
      { title: '评估诊断', desc: '全面评估企业数字化现状和转型需求' },
      { title: '战略规划', desc: '制定数字化转型路线图与实施计划' },
      { title: '平台建设', desc: '搭建云化、数据化、智能化的数字底座' },
      { title: '应用落地', desc: '分阶段实施业务系统改造与创新应用' },
      { title: '持续迭代', desc: '基于数据反馈持续优化和扩展数字化能力' },
    ],
  },
};

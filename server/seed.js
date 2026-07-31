import db from './src/db.js';

console.log('开始初始化种子数据...');

// 默认管理员
const admin = await db.get('SELECT id FROM users WHERE username = ?', ['admin']);
if (!admin) {
  await db.run('INSERT INTO users (username, password, role) VALUES (?,?,?)', ['admin', 'admin123', 'super_admin']);
  await db.run('INSERT INTO users (username, password, role) VALUES (?,?,?)', ['editor', 'editor123', 'content_editor']);
  await db.run('INSERT INTO users (username, password, role) VALUES (?,?,?)', ['reviewer', 'reviewer123', 'reviewer']);
  await db.run('INSERT INTO users (username, password, role) VALUES (?,?,?)', ['cs', 'cs123', 'customer_service']);
  console.log('默认用户已创建');
}

// Banner
const bc = await db.get('SELECT COUNT(*) as c FROM banners');
if (bc.c === 0) {
  const istmt = 'INSERT INTO banners (image, title, subtitle, description, link_url, link_text, secondary_link_url, secondary_link_text, sort, published) VALUES (?,?,?,?,?,?,?,?,?,?)';
  await db.run(istmt, ['', '城际云 · 城市云服务专家', '自主可控 · 集约高效 · 安全可靠', '依托南京大数据集团，建设并运营南京政务云，为江苏省内外提供核心算力节点资源', '/contact', '免费咨询', '/about', '了解更多', 0, 1]);
  await db.run(istmt, ['', '智算云平台 · AI 新时代', 'GPU算力 · 大模型平台 · AI推理服务', '为企业提供高性能GPU云服务器、AI训练平台和大模型部署服务', '/products/ai', '了解智算服务', '/solutions', '查看解决方案', 1, 1]);
  await db.run(istmt, ['', '云和信息集成 · 全生命周期服务', '规划 · 建设 · 运维 · 迁移', '从战略规划到架构设计，从平台搭建到运维管理', '/business', '了解业务矩阵', '/contact', '联系我们', 2, 1]);
  console.log('Banner种子数据已创建');
}

// 合作伙伴
const pc = await db.get('SELECT COUNT(*) as c FROM partners');
if (pc.c === 0) {
  const names = ['华为云', '阿里云', '腾讯云', '百度智能云', '浪潮', '曙光', '新华三', '中兴通讯', '启明星辰', '深信服', '奇安信', '天融信'];
  for (let i = 0; i < names.length; i++) {
    await db.run('INSERT INTO partners (name, sort) VALUES (?,?)', [names[i], i]);
  }
  console.log('合作伙伴已创建');
}

// 资质
const cc = await db.get('SELECT COUNT(*) as c FROM certificates');
if (cc.c === 0) {
  const certs = ['增值电信业务经营许可证', 'ISO 27001 信息安全管理体系认证', 'ISO 9001 质量管理体系认证', '信息系统安全等级保护三级', '高新技术企业证书', '2026年度优秀云服务商', 'CMMI 3级认证'];
  for (let i = 0; i < certs.length; i++) {
    await db.run('INSERT INTO certificates (name, category, sort) VALUES (?,?,?)', [certs[i], i < 4 ? '运营资质' : i < 6 ? '管理体系' : '荣誉奖项', i]);
  }
  console.log('资质已创建');
}

// 网站配置
const sc = await db.get('SELECT COUNT(*) as c FROM config');
if (sc.c === 0) {
  const configs = [
    ['网站标题', '城际云 — 城市云与云服务专家'],
    ['网站描述', '城际云(江苏)科技有限公司，专业的城市云与云和信息集成服务提供商'],
    ['公司名称', '城际云(江苏)科技有限公司'],
    ['公司地址', '江苏省南京市建邺区XXX路XXX号 南京大数据产业园A座'],
    ['联系电话', '400-XXX-XXXX'],
    ['联系邮箱', 'contact@cityintercloud.com'],
    ['工作时间', '周一至周五 9:00 - 18:00'],
    ['备案号', '苏ICP备XXXXXXXX号-1'],
    ['公安备案', '苏公网安备 XXXXXXXXXX号'],
  ];
  for (const [k, v] of configs) {
    await db.run('INSERT OR REPLACE INTO config (key, value) VALUES (?,?)', [k, v]);
  }
  console.log('网站配置已创建');
}

// 新闻
const nc = await db.get('SELECT COUNT(*) as c FROM news');
if (nc && nc.c === 0) {
  const newsItems = [
    ['城际云正式发布智算云平台V2.0，全面升级AI算力服务', 'company', '新一代智算云平台提供更大规模GPU集群、更高性能网络互联、更便捷的AI开发环境。', '## 核心升级\n\n- 算力规模突破100 PFLOPS\n- RDMA高速网络互联\n- 一站式AI开发平台\n- 大模型推理服务API', 1, '2026-07-15'],
    ['城际云与江苏省大数据管理中心达成战略合作', 'company', '双方将在数据要素流通、隐私计算、数据安全等领域展开深度合作。', '深度合作内容...', 1, '2026-07-08'],
    ['南京政务云节点扩容完成，算力规模突破100PFLOPS', 'company', '本次扩容新增200台高性能服务器节点，全面满足政务信息化建设需求。', '扩容详情...', 1, '2026-06-28'],
    ['城际云荣获2026年度优秀云服务商称号', 'notice', '在中国云计算产业大会上，城际云凭借卓越的服务能力和创新实践获得行业认可。', '获奖详情...', 1, '2026-06-10'],
    ['云计算在智慧城市建设中的应用与展望', 'industry', '探讨云计算如何作为智慧城市数字底座，赋能城市治理、民生服务和产业发展。', '行业分析...', 0, '2026-06-15'],
  ];
  for (const [title, category, summary, content, featured, date] of newsItems) {
    await db.run('INSERT INTO news (title, category, summary, content, featured, published, published_at, author, tags) VALUES (?,?,?,?,?,1,?,?,?)',
      [title, category, summary, content, featured, date, '城际云', '[]']);
  }
  console.log('新闻种子数据已创建');
}

// 产品
const prc = await db.get('SELECT COUNT(*) as c FROM products');
if (prc && prc.c === 0) {
  const products = [
    ['弹性云服务器', 'general', '安全稳定、弹性可扩展的云端计算服务，支持多种规格实例，分钟级交付。', '["多种实例规格","弹性伸缩","镜像管理","安全组防护"]', 'Server'],
    ['云存储', 'general', '提供对象存储、块存储、文件存储等多种存储服务。', '["对象存储","块存储","文件存储","数据备份"]', 'HardDrive'],
    ['GPU云服务器', 'ai', '提供NVIDIA A100/H100等高性能GPU实例，支持深度学习训练与推理。', '["A100/H100 GPU","RDMA高速网络","弹性GPU集群"]', 'Cpu'],
    ['AI开发平台', 'ai', '一站式AI模型开发平台，提供数据标注、模型训练、评估优化全流程支持。', '["数据标注工具","分布式训练","AutoML","模型评估"]', 'Brain'],
    ['7×24运维监控', 'ops', '7×24小时全方位监控云基础设施运行状态。', '["全栈监控","智能告警","可视化大盘"]', 'Activity'],
  ];
  for (const [name, category, description, features, icon] of products) {
    await db.run('INSERT INTO products (name, category, description, features, icon, published, sort) VALUES (?,?,?,?,?,1,0)', [name, category, description, features, icon]);
  }
  console.log('产品种子数据已创建');
}

console.log('种子数据初始化完成！');

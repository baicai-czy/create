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
    ['site_title', '城际云 — 城市云与云服务专家'],
    ['company_name', '城际云(江苏)科技有限公司'],
    ['contact_address', '江苏省南京市建邺区XXX路XXX号 南京大数据产业园A座'],
    ['contact_phone', '400-XXX-XXXX'],
    ['contact_email', 'contact@cityintercloud.com'],
    ['working_hours', '周一至周五 9:00 - 18:00'],
  ];
  for (const [k, v] of configs) {
    await db.run('INSERT OR REPLACE INTO config (key, value) VALUES (?,?)', [k, v]);
  }
  console.log('网站配置已创建');
}

console.log('种子数据初始化完成！');

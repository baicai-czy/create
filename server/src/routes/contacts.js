import { Router } from 'express';
import db from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();

// 前台提交咨询
router.post('/', async (req, res) => {
  const { type, name, company, phone, email, service, message } = req.body;
  const r = await db.run('INSERT INTO contacts (type, name, company, phone, email, service, message) VALUES (?,?,?,?,?,?,?)', [type||'consultation', name, company||'', phone, email||'', service||'', message||'']);
  res.json({ code: 200, data: { id: r.lastInsertRowid }, message: '提交成功' });
});

// 管理:获取咨询列表（支持 type / status / readStatus 筛选）
router.get('/', authMiddleware, async (req, res) => {
  const { type, status, readStatus } = req.query;
  let sql = 'SELECT * FROM contacts WHERE 1=1'; const params = [];
  if (type) { sql += ' AND type = ?'; params.push(type); }
  if (status) { sql += ' AND status = ?'; params.push(status); }
  if (readStatus) { sql += ' AND read_status = ?'; params.push(readStatus); }
  sql += ' ORDER BY created_at DESC';
  res.json({ code: 200, data: await db.query(sql, params) });
});

// 未阅数量（用于侧边栏角标）
router.get('/unread-count', authMiddleware, async (_req, res) => {
  const row = await db.get('SELECT COUNT(*) as count FROM contacts WHERE read_status = ?', ['unread']);
  res.json({ code: 200, data: { count: row.count } });
});

// 更新咨询（处理状态 + 查阅状态）
router.put('/:id', authMiddleware, async (req, res) => {
  const { status, read_status } = req.body;
  const updates = []; const params = [];
  if (status) { updates.push('status = ?'); params.push(status); }
  if (read_status) { updates.push('read_status = ?'); params.push(read_status); }
  if (updates.length === 0) return res.json({ code: 200, message: '无更新内容' });
  params.push(req.params.id);
  await db.run(`UPDATE contacts SET ${updates.join(', ')} WHERE id = ?`, params);
  res.json({ code: 200, message: '更新成功' });
});

export default router;

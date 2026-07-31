import { Router } from 'express';
import db from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();
router.post('/', async (req, res) => {
  const { type, name, company, phone, email, service, message } = req.body;
  const r = await db.run('INSERT INTO contacts (type, name, company, phone, email, service, message) VALUES (?,?,?,?,?,?,?)', [type||'consultation', name, company||'', phone, email||'', service||'', message||'']);
  res.json({ code: 200, data: { id: r.lastInsertRowid }, message: '提交成功' });
});
router.get('/', authMiddleware, async (req, res) => {
  const { type, status } = req.query;
  let sql = 'SELECT * FROM contacts WHERE 1=1'; const params = [];
  if (type) { sql += ' AND type = ?'; params.push(type); }
  if (status) { sql += ' AND status = ?'; params.push(status); }
  sql += ' ORDER BY created_at DESC';
  res.json({ code: 200, data: await db.query(sql, params) });
});
router.put('/:id', authMiddleware, async (req, res) => {
  await db.run('UPDATE contacts SET status = ? WHERE id = ?', [req.body.status, req.params.id]);
  res.json({ code: 200, message: '更新成功' });
});
export default router;

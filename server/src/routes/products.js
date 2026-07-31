import { Router } from 'express';
import db from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();
router.get('/', async (req, res) => {
  const { category } = req.query;
  let sql = 'SELECT * FROM products WHERE published = 1';
  const params = [];
  if (category) { sql += ' AND category = ?'; params.push(category); }
  sql += ' ORDER BY sort';
  const rows = await db.query(sql, params);
  res.json({ code: 200, data: rows.map(p => ({ ...p, features: JSON.parse(p.features || '[]') })) });
});
router.get('/all', authMiddleware, async (_req, res) => {
  const rows = await db.query('SELECT * FROM products ORDER BY category, sort');
  res.json({ code: 200, data: rows.map(p => ({ ...p, features: JSON.parse(p.features || '[]') })) });
});
router.post('/', authMiddleware, async (req, res) => {
  const { name, category, description, features, icon, published, sort } = req.body;
  const r = await db.run('INSERT INTO products (name, category, description, features, icon, published, sort) VALUES (?,?,?,?,?,?,?)', [name, category, description||'', JSON.stringify(features||[]), icon||'Server', published??1, sort||0]);
  await db.run('INSERT INTO logs (user_id, username, action, detail) VALUES (?,?,?,?)', [req.user.id, req.user.username, 'create_product', `创建产品: ${name}`]);
  res.json({ code: 200, data: { id: r.lastInsertRowid } });
});
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, category, description, features, icon, published, sort } = req.body;
  await db.run('UPDATE products SET name=?, category=?, description=?, features=?, icon=?, published=?, sort=?, updated_at=datetime(\'now\') WHERE id=?', [name, category, description||'', JSON.stringify(features||[]), icon||'Server', published??1, sort||0, req.params.id]);
  res.json({ code: 200, message: '更新成功' });
});
router.delete('/:id', authMiddleware, async (req, res) => {
  await db.run('DELETE FROM products WHERE id = ?', [req.params.id]);
  res.json({ code: 200, message: '删除成功' });
});
export default router;

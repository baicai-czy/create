import { Router } from 'express';
import db from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();
router.get('/', async (_req, res) => { res.json({ code: 200, data: await db.query('SELECT * FROM certificates ORDER BY sort') }); });
router.post('/', authMiddleware, async (req, res) => {
  const { name, category, image, sort } = req.body;
  const r = await db.run('INSERT INTO certificates (name, category, image, sort) VALUES (?,?,?,?)', [name, category||'企业资质', image||'', sort||0]);
  res.json({ code: 200, data: { id: r.lastInsertRowid } });
});
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, category, image, sort } = req.body;
  await db.run('UPDATE certificates SET name=?, category=?, image=?, sort=? WHERE id=?', [name, category||'企业资质', image||'', sort||0, req.params.id]);
  res.json({ code: 200, message: '更新成功' });
});
router.delete('/:id', authMiddleware, async (req, res) => {
  await db.run('DELETE FROM certificates WHERE id = ?', [req.params.id]);
  res.json({ code: 200, message: '删除成功' });
});
export default router;

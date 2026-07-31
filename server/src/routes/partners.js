import { Router } from 'express';
import db from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();
router.get('/', async (_req, res) => { res.json({ code: 200, data: await db.query('SELECT * FROM partners ORDER BY sort') }); });
router.post('/', authMiddleware, async (req, res) => {
  const { name, logo, website, sort } = req.body;
  const r = await db.run('INSERT INTO partners (name, logo, website, sort) VALUES (?,?,?,?)', [name, logo||'', website||'', sort||0]);
  res.json({ code: 200, data: { id: r.lastInsertRowid } });
});
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, logo, website, sort } = req.body;
  await db.run('UPDATE partners SET name=?, logo=?, website=?, sort=? WHERE id=?', [name, logo||'', website||'', sort||0, req.params.id]);
  res.json({ code: 200, message: '更新成功' });
});
router.delete('/:id', authMiddleware, async (req, res) => {
  await db.run('DELETE FROM partners WHERE id = ?', [req.params.id]);
  res.json({ code: 200, message: '删除成功' });
});
export default router;

import { Router } from 'express';
import db from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  res.json({ code: 200, data: await db.query('SELECT * FROM banners WHERE published = 1 ORDER BY sort') });
});

router.get('/all', authMiddleware, async (_req, res) => {
  res.json({ code: 200, data: await db.query('SELECT * FROM banners ORDER BY sort') });
});

router.post('/', authMiddleware, async (req, res) => {
  const b = req.body;
  const r = await db.run('INSERT INTO banners (image, title, subtitle, description, link_url, link_text, secondary_link_url, secondary_link_text, sort, published) VALUES (?,?,?,?,?,?,?,?,?,?)', [b.image||'', b.title, b.subtitle||'', b.description||'', b.link_url||'', b.link_text||'', b.secondary_link_url||'', b.secondary_link_text||'', b.sort||0, b.published??1]);
  await db.run('INSERT INTO logs (user_id, username, action, detail) VALUES (?,?,?,?)', [req.user.id, req.user.username, 'create_banner', `创建Banner: ${b.title}`]);
  res.json({ code: 200, data: { id: r.lastInsertRowid } });
});

router.put('/:id', authMiddleware, async (req, res) => {
  const b = req.body;
  await db.run('UPDATE banners SET image=?, title=?, subtitle=?, description=?, link_url=?, link_text=?, secondary_link_url=?, secondary_link_text=?, sort=?, published=?, updated_at=datetime(\'now\') WHERE id=?', [b.image||'', b.title, b.subtitle||'', b.description||'', b.link_url||'', b.link_text||'', b.secondary_link_url||'', b.secondary_link_text||'', b.sort||0, b.published??1, req.params.id]);
  res.json({ code: 200, message: '更新成功' });
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await db.run('DELETE FROM banners WHERE id = ?', [req.params.id]);
  res.json({ code: 200, message: '删除成功' });
});

export default router;

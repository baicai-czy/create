import { Router } from 'express';
import db from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();
const parse = (s) => ({ ...s, features: JSON.parse(s.features||'[]'), architecture: JSON.parse(s.architecture||'[]'), industries: JSON.parse(s.industries||'[]'), steps: JSON.parse(s.steps||'[]') });

router.get('/', async (_req, res) => { res.json({ code: 200, data: (await db.query('SELECT * FROM solutions WHERE published = 1')).map(parse) }); });
router.get('/all', authMiddleware, async (_req, res) => { res.json({ code: 200, data: (await db.query('SELECT * FROM solutions')).map(parse) }); });
router.post('/', authMiddleware, async (req, res) => {
  const b = req.body;
  const r = await db.run('INSERT INTO solutions (title, subtitle, intro, category, features, architecture, industries, steps, published) VALUES (?,?,?,?,?,?,?,?,?)', [b.title, b.subtitle||'', b.intro||'', b.category, JSON.stringify(b.features||[]), JSON.stringify(b.architecture||[]), JSON.stringify(b.industries||[]), JSON.stringify(b.steps||[]), b.published??1]);
  res.json({ code: 200, data: { id: r.lastInsertRowid } });
});
router.put('/:id', authMiddleware, async (req, res) => {
  const b = req.body;
  await db.run('UPDATE solutions SET title=?, subtitle=?, intro=?, category=?, features=?, architecture=?, industries=?, steps=?, published=?, updated_at=datetime(\'now\') WHERE id=?', [b.title, b.subtitle||'', b.intro||'', b.category, JSON.stringify(b.features||[]), JSON.stringify(b.architecture||[]), JSON.stringify(b.industries||[]), JSON.stringify(b.steps||[]), b.published??1, req.params.id]);
  res.json({ code: 200, message: '更新成功' });
});
router.delete('/:id', authMiddleware, async (req, res) => {
  await db.run('DELETE FROM solutions WHERE id = ?', [req.params.id]);
  res.json({ code: 200, message: '删除成功' });
});
export default router;

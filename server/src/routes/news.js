import { Router } from 'express';
import db from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();

router.get('/', async (req, res) => {
  const { category, page = '1', pageSize = '10', search } = req.query;
  let sql = 'WHERE published = 1';
  const params = [];
  if (category && category !== 'all') { sql += ' AND category = ?'; params.push(category); }
  if (search) { sql += ' AND (title LIKE ? OR summary LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
  const countRow = await db.get(`SELECT COUNT(*) as c FROM news ${sql}`, params);
  const p = Number(page), ps = Number(pageSize);
  const rows = await db.query(`SELECT id, title, slug, category, summary, cover_image, tags, featured, author, published_at FROM news ${sql} ORDER BY published_at DESC LIMIT ${ps} OFFSET ${(p-1)*ps}`, params);
  const data = rows.map(n => ({ ...n, tags: JSON.parse(n.tags || '[]') }));
  res.json({ code: 200, data: { data, total: countRow.c, page: p, pageSize: ps, totalPages: Math.ceil(countRow.c / ps) } });
});

router.get('/admin/all', authMiddleware, async (_req, res) => {
  const rows = await db.query('SELECT * FROM news ORDER BY created_at DESC');
  res.json({ code: 200, data: rows.map(n => ({ ...n, tags: JSON.parse(n.tags || '[]') })) });
});

router.get('/:id', async (req, res) => {
  const n = await db.get('SELECT * FROM news WHERE id = ? OR slug = ?', [req.params.id, req.params.id]);
  if (!n) return res.status(404).json({ code: 404, message: '新闻不存在' });
  n.tags = JSON.parse(n.tags || '[]');
  res.json({ code: 200, data: n });
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, category, summary, content, cover_image, tags, featured, published, author } = req.body;
  const slug = req.body.slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
  const r = await db.run('INSERT INTO news (title, slug, category, summary, content, cover_image, tags, featured, published, author) VALUES (?,?,?,?,?,?,?,?,?,?)', [title, slug, category||'company', summary||'', content||'', cover_image||'', JSON.stringify(tags||[]), featured?1:0, published??1, author||'城际云']);
  await db.run('INSERT INTO logs (user_id, username, action, detail) VALUES (?,?,?,?)', [req.user.id, req.user.username, 'create_news', `创建新闻: ${title}`]);
  res.json({ code: 200, data: { id: r.lastInsertRowid } });
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { title, category, summary, content, cover_image, tags, featured, published, author } = req.body;
  await db.run('UPDATE news SET title=?, category=?, summary=?, content=?, cover_image=?, tags=?, featured=?, published=?, author=?, updated_at=datetime(\'now\') WHERE id=?', [title, category||'company', summary||'', content||'', cover_image||'', JSON.stringify(tags||[]), featured?1:0, published??1, author||'城际云', req.params.id]);
  res.json({ code: 200, message: '更新成功' });
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await db.run('DELETE FROM news WHERE id = ?', [req.params.id]);
  await db.run('INSERT INTO logs (user_id, username, action, detail) VALUES (?,?,?,?)', [req.user.id, req.user.username, 'delete_news', `删除新闻 ID:${req.params.id}`]);
  res.json({ code: 200, message: '删除成功' });
});

export default router;

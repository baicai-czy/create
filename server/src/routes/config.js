import { Router } from 'express';
import db from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();
router.get('/', async (_req, res) => {
  const rows = await db.query('SELECT * FROM config');
  const config = {}; rows.forEach(r => { config[r.key] = r.value; });
  res.json({ code: 200, data: config });
});
router.put('/', authMiddleware, async (req, res) => {
  for (const [key, value] of Object.entries(req.body)) {
    await db.run('INSERT OR REPLACE INTO config (key, value) VALUES (?,?)', [key, String(value)]);
  }
  res.json({ code: 200, message: '配置更新成功' });
});
export default router;

import { Router } from 'express';
import db from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();
router.get('/', authMiddleware, async (req, res) => {
  const { page = '1', pageSize = '20' } = req.query;
  const p = Number(page), ps = Number(pageSize);
  const countRow = await db.get('SELECT COUNT(*) as c FROM logs');
  const data = await db.query(`SELECT * FROM logs ORDER BY created_at DESC LIMIT ${ps} OFFSET ${(p-1)*ps}`);
  res.json({ code: 200, data: { data, total: countRow.c, page: p, pageSize: ps, totalPages: Math.ceil(countRow.c / ps) } });
});
export default router;

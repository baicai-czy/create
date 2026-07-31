import { Router } from 'express';
import db from '../db.js';
import { generateToken, authMiddleware } from '../auth.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
  if (!user || user.password !== password) return res.status(401).json({ code: 401, message: '用户名或密码错误' });
  const token = generateToken(user);
  await db.run('INSERT INTO logs (user_id, username, action, detail) VALUES (?,?,?,?)', [user.id, user.username, 'login', '登录系统']);
  res.json({ code: 200, data: { token, user: { id: user.id, username: user.username, role: user.role } } });
});

router.get('/me', authMiddleware, async (req, res) => {
  const user = await db.get('SELECT id, username, role FROM users WHERE id = ?', [req.user.id]);
  res.json({ code: 200, data: user });
});

router.get('/users', authMiddleware, async (_req, res) => {
  const users = await db.query('SELECT id, username, role, created_at FROM users ORDER BY id');
  res.json({ code: 200, data: users });
});

router.post('/users', authMiddleware, async (req, res) => {
  const { username, password, role } = req.body;
  const existing = await db.get('SELECT id FROM users WHERE username = ?', [username]);
  if (existing) return res.status(400).json({ code: 400, message: '用户名已存在' });
  const result = await db.run('INSERT INTO users (username, password, role) VALUES (?,?,?)', [username, password, role || 'content_editor']);
  await db.run('INSERT INTO logs (user_id, username, action, detail) VALUES (?,?,?,?)', [req.user.id, req.user.username, 'create_user', `创建用户: ${username}`]);
  res.json({ code: 200, data: { id: result.lastInsertRowid } });
});

router.delete('/users/:id', authMiddleware, async (req, res) => {
  await db.run('DELETE FROM users WHERE id = ?', [req.params.id]);
  res.json({ code: 200, message: '删除成功' });
});

export default router;

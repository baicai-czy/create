import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// 路由
import authRouter from './routes/auth.js';
import bannersRouter from './routes/banners.js';
import newsRouter from './routes/news.js';
import productsRouter from './routes/products.js';
import solutionsRouter from './routes/solutions.js';
import partnersRouter from './routes/partners.js';
import certificatesRouter from './routes/certificates.js';
import contactsRouter from './routes/contacts.js';
import configRouter from './routes/config.js';
import logsRouter from './routes/logs.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// API 路由
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/banners', bannersRouter);
app.use('/api/v1/news', newsRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/solutions', solutionsRouter);
app.use('/api/v1/partners', partnersRouter);
app.use('/api/v1/certificates', certificatesRouter);
app.use('/api/v1/contacts', contactsRouter);
app.use('/api/v1/config', configRouter);
app.use('/api/v1/logs', logsRouter);

// 健康检查
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`城际云API服务已启动: http://localhost:${PORT}`);
  console.log(`API文档: http://localhost:${PORT}/api/v1`);
});

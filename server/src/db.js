import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'data.db');

// 全局数据库实例
let SQL = null;

async function getDb() {
  if (!SQL) {
    SQL = await initSqlJs();
  }
  let buffer;
  try {
    buffer = fs.readFileSync(DB_PATH);
  } catch {
    buffer = null;
  }
  return new SQL.Database(buffer);
}

function saveDb(db) {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

// 数据库包装器，提供与 better-sqlite3 兼容的 API
class Database {
  constructor() {
    this._db = null;
    this._ready = false;
  }

  async _ensureReady() {
    if (!this._ready) {
      this._db = await getDb();
      this._ready = true;
    }
  }

  // 执行查询，返回行数组
  async _query(sql, params = []) {
    await this._ensureReady();
    const stmt = this._db.prepare(sql);
    if (params.length > 0) stmt.bind(params);
    const rows = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
    return rows;
  }

  // 执行写操作，返回 { changes, lastInsertRowid }
  async _run(sql, params = []) {
    await this._ensureReady();
    this._db.run(sql, params);
    saveDb(this._db);
    return {
      changes: this._db.getRowsModified(),
      lastInsertRowid: this._db.exec("SELECT last_insert_rowid()")[0]?.values[0]?.[0] || 0
    };
  }

  // 建表等批量操作
  async exec(sql) {
    await this._ensureReady();
    this._db.run(sql);
    saveDb(this._db);
  }

  // 查询单个值（用于 count）
  async _get(sql, params = []) {
    const rows = await this._query(sql, params);
    return rows[0] || null;
  }

  // 便捷方法 - 在 async 路由中使用
  query(sql, params = []) { return this._query(sql, params); }
  run(sql, params = []) { return this._run(sql, params); }
  get(sql, params = []) { return this._get(sql, params); }
}

const db = new Database();

// 初始化数据库
await db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'content_editor',
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS banners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT, title TEXT NOT NULL, subtitle TEXT, description TEXT,
    link_url TEXT, link_text TEXT, secondary_link_url TEXT, secondary_link_text TEXT,
    sort INTEGER DEFAULT 0, published INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL, slug TEXT UNIQUE, category TEXT NOT NULL DEFAULT 'company',
    summary TEXT, content TEXT, cover_image TEXT, tags TEXT DEFAULT '[]',
    featured INTEGER DEFAULT 0, published INTEGER DEFAULT 1, author TEXT DEFAULT '城际云',
    published_at TEXT DEFAULT (datetime('now')),
    created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL, category TEXT NOT NULL, description TEXT, features TEXT DEFAULT '[]',
    icon TEXT DEFAULT 'Server', published INTEGER DEFAULT 1, sort INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS solutions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL, subtitle TEXT, intro TEXT, category TEXT NOT NULL,
    features TEXT DEFAULT '[]', architecture TEXT DEFAULT '[]', industries TEXT DEFAULT '[]', steps TEXT DEFAULT '[]',
    published INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS partners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL, logo TEXT, website TEXT, sort INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS certificates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL, category TEXT DEFAULT '企业资质', image TEXT, sort INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL DEFAULT 'consultation',
    name TEXT NOT NULL, company TEXT, phone TEXT NOT NULL, email TEXT, service TEXT, message TEXT,
    status TEXT DEFAULT 'pending', created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY, value TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER, username TEXT, action TEXT NOT NULL, detail TEXT, created_at TEXT DEFAULT (datetime('now'))
  );
`);

export default db;

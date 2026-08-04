# Data Model: 联系问题处理

## Entity: Contact（咨询记录）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | INTEGER | PK, AUTOINCREMENT | 主键 |
| `type` | TEXT | NOT NULL, DEFAULT 'consultation' | 'consultation' / 'cooperation' |
| `name` | TEXT | NOT NULL | 提交者姓名 |
| `company` | TEXT | | 公司名称 |
| `phone` | TEXT | NOT NULL | 联系电话 |
| `email` | TEXT | | 电子邮箱 |
| `service` | TEXT | | 感兴趣的服务 |
| `message` | TEXT | | 咨询内容 |
| `read_status` | TEXT | NOT NULL, DEFAULT 'unread' | **新增** — 'unread' / 'read' |
| `status` | TEXT | NOT NULL, DEFAULT 'pending' | 'pending' / 'processing' / 'resolved' |
| `created_at` | TEXT | DEFAULT datetime('now') | 提交时间 |

## 状态流转

```
查阅状态:  unread ──(管理员打开详情)──→ read

处理状态:  pending ──→ processing ──→ resolved
                      ↑               │
                      └───────────────┘ (可回转)
```

查阅状态和处理状态是**两个独立维度**，组合示例：
- `unread + pending` → 新提交未查看的待处理咨询
- `read + pending` → 已查阅但尚未开始处理
- `read + resolved` → 已查阅且已解决的咨询

## API 接口变更

### GET /api/v1/contacts
- 新增查询参数：`readStatus` (`unread` / `read` / 不传=全部)
- 新增查询参数：`status`（已有）
- 返回的每条记录包含 `read_status` 字段

### GET /api/v1/contacts/unread-count
- 返回 `{ code: 200, data: { count: N } }`
- 用于侧边栏角标

### PUT /api/v1/contacts/:id
- 新增请求体字段：`read_status`
- 当 `read_status` 从 `unread` → `read` 时，记录操作日志

# Research: 联系问题处理 — 查阅状态实现

## 1. 查阅状态存储方案

**Decision**: 新增 `read_status` 字段（独立于 `status` 处理状态字段）

**Rationale**:
- 查阅状态（未阅/已阅）与处理状态（待处理/处理中/已解决）是两个独立维度
- 在 `contacts` 表新增 `read_status TEXT DEFAULT 'unread'` 字段，极小改动
- 避免混淆：管理员可能先标记已阅，但尚未开始处理
- 与现有 `status` 字段命名空间不冲突

**Alternatives considered**:
- 选项 A：复用 `status` 字段，将"未阅"作为状态之一 → 否决：查阅和处理混在一起，无法区分
- 选项 B：新建独立 `contact_reads` 关联表 → 否决：过度设计，当前场景单字段足矣

## 2. 视觉标识方案

**Decision**: 红色圆点 + 标题加粗 + 菜单角标（Option C 组合方案）

**Rationale**:
- 红色圆点：最直观的"未读"隐喻，用户无需学习
- 标题加粗：列表快速扫描时可区分
- 菜单角标：提醒管理员有待查阅的新咨询

## 3. 自动标记"已阅"时机

**Decision**: 管理员打开详情弹窗时自动标记

**Rationale**:
- 无需手动操作，简化工作流
- 调用 `PUT /api/v1/contacts/:id` 更新 `read_status = 'read'`
- 只在首次从 unread → read 时触发，避免重复日志

## 4. API 变更影响

**Decision**: 新增 `GET /api/v1/contacts` 的 `readStatus` 查询参数

**Rationale**:
- 前端需要"只看未阅"筛选能力
- 向后兼容：不传参数时返回全部
- 新增 `GET /api/v1/contacts/unread-count` 返回未阅总数用于角标

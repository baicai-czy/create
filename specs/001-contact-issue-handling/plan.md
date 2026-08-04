# Implementation Plan: 联系问题处理

**Branch**: `001-contact-issue-handling` | **Date**: 2026-08-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-contact-issue-handling/spec.md`

## Summary

为城际云门户网站实现完整的联系问题处理功能。包括访客提交咨询/合作表单、管理后台查看和处理咨询、查阅状态（未阅/已阅）自动标记。核心数据模型已就绪（contacts 表 + API），需要在管理后台增加查阅状态维度和视觉标识。

## Technical Context

**Language/Version**: TypeScript 5.x (frontend), Node.js 24.x (backend)

**Primary Dependencies**: React 18, Express 4, better-sqlite3, Tailwind CSS

**Storage**: SQLite (better-sqlite3) → `contacts` 表，已有 `status` 字段，需新增 `read_status` 字段

**Testing**: 手动功能测试 + TypeScript 编译检查

**Target Platform**: Web (Chrome/Edge/Safari/Firefox 近 2 版 + 移动端)

**Project Type**: Web application (frontend portal + admin SPA + REST API)

**Performance Goals**: 表单提交 < 2s 响应，管理列表加载 < 1s

**Constraints**: 遵循 Constitution 五大原则（自主可控/安全可靠/集约高效/三端互通/响应式）

**Scale/Scope**: 单实例，预计日咨询量 < 100 条

## Constitution Check

*GATE: Must pass before Phase 0 research.*

| 原则 | 检查 | 状态 |
|------|------|:--:|
| I. 自主可控 | 新增字段仅涉及现有开源技术栈 | ✅ |
| II. 安全可靠 | API 使用已有 JWT 鉴权，输入校验复用现有逻辑 | ✅ |
| III. 集约高效 | 轻量改动，不引入新依赖 | ✅ |
| IV. 三端互通 | 前端/管理后台/API 统一使用 RESTful | ✅ |
| V. 响应式可访问 | 管理后台列表适配移动端，支持键盘导航 | ✅ |

## Project Structure

### Documentation (this feature)

```text
specs/001-contact-issue-handling/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── spec.md
```

### Source Code (repository root)

```text
server/
├── src/
│   ├── db.js                    # 数据库 schema（新增 read_status 字段）
│   └── routes/
│       └── contacts.js          # API（新增 read_status 筛选/更新）
└── seed.js                      # 种子数据

src/
├── types/
│   └── index.ts                 # Contact 类型（新增 readStatus）
├── api/
│   └── index.ts                 # API 调用层
├── pages/
│   ├── contact/
│   │   └── ContactUs.tsx        # 门户联系页（已有）
│   └── admin/
│       └── SimpleManager.tsx    # 通用管理组件（需适配查阅状态）
└── components/
    └── layout/
        └── AdminLayout.tsx      # 侧边栏（新增未阅数量角标）
```

**Structure Decision**: 复用现有 Web 应用结构，仅在现有文件上做增量修改。

## Complexity Tracking

> 无违规项，无需记录。

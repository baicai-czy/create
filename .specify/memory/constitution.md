<!--
Sync Impact Report
==================
Version change: 0.0.0 → 1.0.0 (Initial ratification)
Modified principles: N/A (new document)
Added sections: All (Core Principles, Security & Compliance, Architecture & Performance, Development Workflow, Governance)
Removed sections: None
Follow-up TODOs: None
-->

# 城际云门户网站 Constitution

## Core Principles

### I. 自主可控 (Independent & Controllable)

本项目优先采用开源技术栈，确保核心技术自主可控，避免对商业闭源软件的强依赖。
前端基于 React + TypeScript + Vite，后端基于 Node.js + Express + better-sqlite3，
所有依赖 MUST 为 MIT/Apache 2.0 等宽松开源许可证。

### II. 安全可靠 (Security & Reliability)

全站 MUST 遵循网络安全等保 2.0 要求。所有 API MUST 通过 JWT 认证鉴权。
用户提交数据 MUST 经过前端校验 + 后端二次校验双重过滤。
HTTPS MUST 覆盖全站，敏感数据 MUST 加密存储。
后台管理系统 MUST 实现 RBAC 角色权限控制，所有操作 MUST 记录审计日志。

### III. 集约高效 (Performance First)

首页首屏加载时间 MUST < 3 秒，内页加载时间 MUST < 2 秒。
生产构建 MUST 启用代码分割（Route-level lazy loading），初始 JS bundle MUST < 200KB (gzip)。
图片资源 MUST 使用懒加载和 WebP 格式。
数据库查询 MUST 使用参数化查询，禁止 SQL 拼接。

### IV. 三端互通 (Frontend-Admin-Backend Integration)

前端门户、管理后台、后端 API MUST 通过统一的 RESTful API 进行数据交互。
数据模型定义 MUST 在前端类型文件（`src/types/`）中统一声明，前后端共享接口契约。
管理后台的数据变更 MUST 即时反映到前端门户（通过 API 实时读取）。
API 响应格式 MUST 统一为 `{ code: number, data: T, message?: string }`。

### V. 响应式与可访问性 (Responsive & Accessible)

所有页面 MUST 支持 PC 端（1920/1440/1280）和移动端（768/375）自适应布局。
触摸设备 MUST 禁用 hover 依赖的交互效果，改用 click/tap。
动画效果 MUST 尊重 `prefers-reduced-motion` 用户偏好。
键盘导航 MUST 可见（`focus-visible` outline），所有交互元素 MUST 可 Tab 访问。

## Security & Compliance

- 全站 HTTPS 加密传输
- JWT Token 24h 过期，管理后台未登录自动跳转
- API 输入校验：前端 Zod / 后端参数化查询
- RBAC 四角色：超级管理员、内容编辑、审核员、客服人员
- 操作日志全量记录（用户、操作、时间、详情）
- 无高危漏洞（通过安全扫描）

## Architecture & Performance

- 前端：React 18 + TypeScript + Tailwind CSS + Framer Motion + Vite
- 后端：Node.js + Express + better-sqlite3
- 数据库：SQLite（开发）/ MySQL 8.0（生产迁移）
- 性能指标：LCP < 2.5s, TBT < 200ms, CLS < 0.1
- 并发支持：≥ 500 并发用户，可用性 ≥ 99.9%
- CDN 就绪：静态资源通过 Vite build 输出可部署至 CDN

## Development Workflow

- 代码规范：ESLint + Prettier 统一格式化
- 分支策略：`main` 分支保护，功能通过分支开发合并
- 提交规范：`feat:` / `fix:` / `docs:` / `refactor:` 前缀
- 构建验证：每次提交 MUST 通过 `npm run build`（tsc + vite build）零错误
- 种子数据：开发环境通过 `npm run seed` 初始化测试数据
- 部署：Vite build → Nginx 静态托管 + Express API 反向代理

## Governance

本章程是项目开发的最高准则，所有代码提交 MUST 符合上述原则。
修订流程：提出修订 → 团队讨论 → 更新版本号 → 同步至 `.specify/memory/constitution.md`。
版本号遵循语义化版本（MAJOR.MINOR.PATCH）：
- MAJOR：原则增删或重大重新定义
- MINOR：新增原则或实质性扩展
- PATCH：措辞澄清、格式修正

**Version**: 1.0.0 | **Ratified**: 2026-08-04 | **Last Amended**: 2026-08-04

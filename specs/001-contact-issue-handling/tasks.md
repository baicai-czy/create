# Tasks: 联系问题处理

**Input**: Design documents from `/specs/001-contact-issue-handling/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Not requested — only implementation tasks.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Database Schema)

**Goal**: Add `read_status` column to contacts table

- [x] T001 Add `read_status TEXT DEFAULT 'unread'` column to contacts table in `server/src/db.js`

## Phase 2: Foundational (API Layer)

**Goal**: API support for read_status read/write, blocking prerequisite for all user stories

- [x] T002 Add `readStatus` query parameter filter to `GET /api/v1/contacts` in `server/src/routes/contacts.js`
- [x] T003 Add `GET /api/v1/contacts/unread-count` endpoint returning `{count: N}` in `server/src/routes/contacts.js`
- [x] T004 Update `PUT /api/v1/contacts/:id` to accept and persist `read_status` field in `server/src/routes/contacts.js`

## Phase 3: User Story 1 — 访客提交咨询表单 (Priority: P1) ✅ 已存在

**Goal**: Visitors can submit consultation or cooperation forms via the portal contact page

**Independent Test**: Open /contact, fill form, submit → "提交成功" toast

- [ ] T005 Verify existing ContactUs.tsx at `src/pages/contact/ContactUs.tsx` works end-to-end (submit → API → DB)

## Phase 4: User Story 2 — 管理员查阅新咨询（未阅→已阅）(Priority: P2)

**Goal**: Admin sees unread consultations with visual indicators, auto-mark read on detail view

**Independent Test**: Submit a consultation, login to admin, see red dot + bold title, click edit → red dot disappears

- [x] T006 [US2] Created ContactManager with read_status indicator (🔴 red dot + bold title) in `src/pages/admin/ContactManager.tsx`
- [x] T007 [US2] Auto-mark contact as read on edit open in `src/pages/admin/ContactManager.tsx`

## Phase 5: User Story 3 — 处理状态流转 (Priority: P3) ✅ 已存在

**Goal**: Admin can update processing status (pending → processing → resolved)

**Independent Test**: In admin contacts, change status field and save → status updates

- [ ] T008 Verify existing status editing in SimpleManager works for contacts at `src/pages/admin/SimpleManager.tsx`

## Phase 6: User Story 4 — 菜单角标显示未阅数量 (Priority: P3)

**Goal**: Sidebar "咨询管理" menu item shows unread count badge

**Independent Test**: Submit a new consultation → sidebar badge shows count increment

- [x] T009 [P] [US4] Fetch unread count from `/contacts/unread-count` on admin page load in `src/components/layout/AdminLayout.tsx`
- [x] T010 [P] [US4] Render red badge with count on sidebar "咨询管理" menu item in `src/components/layout/AdminLayout.tsx`

## Phase 7: Polish & Verification

- [ ] T011 End-to-end smoke test per quickstart.md scenarios 1-5
- [ ] T012 Run `npm run build` and verify zero TypeScript errors
- [ ] T013 Update seed data in `server/seed.js` to include test contacts with mixed read_status values

## Dependencies & Execution Order

```
Phase 1 (T001) ──→ Phase 2 (T002-T004) ──→ Phase 4 (T006-T007)
                                          ──→ Phase 6 (T009-T010)
Phase 3 (T005) ── independent
Phase 5 (T008) ── independent
Phase 7 (T011-T013) ── after all phases
```

- **Phase 2 blocks Phase 4 and Phase 6** (API must exist before UI can consume it)
- **Phase 3 and Phase 5 are independent** (verification only)
- **Phase 6 tasks T009+T010 can run in parallel** (different concerns in same file)

## Parallel Opportunities

```
Batch 1: T002, T003, T004  (all in contacts.js — sequential within same file)
Batch 2: T006, T009+T010   (different files, can run in parallel)
```

## Suggested MVP Scope

Phase 1 + Phase 2 + Phase 4 = complete P2 user story (查阅状态功能)
This is the minimum viable increment that delivers the core new functionality.

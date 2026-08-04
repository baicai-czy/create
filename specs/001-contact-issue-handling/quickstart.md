# Quickstart: 联系问题处理

## 前置条件

- 后端服务运行：`cd server && node src/index.js`
- 前端开发服务：`cd D:\Portaltest && npm run dev`
- 数据库已初始化：`cd server && node seed.js`

## 验证场景

### 场景 1：访客提交咨询

1. 打开 http://localhost:5173/contact
2. 在"在线咨询"标签填写表单
3. 点击"提交咨询"
4. **预期**：显示"提交成功"提示，表单被清空

### 场景 2：管理员查看咨询列表

1. 打开 http://localhost:5173/admin/login，登录 admin/admin123
2. 进入"咨询管理"
3. **预期**：列表显示所有咨询，新提交的标记为 ❤️ 未阅（红色圆点 + 加粗）

### 场景 3：查阅状态变更

1. 在咨询管理中，点击某条"未阅"记录的编辑按钮
2. 打开弹窗查看详情后关闭
3. **预期**：该条目红色圆点消失，标题恢复正常字重

### 场景 4：菜单角标更新

1. 有新提交的未阅咨询时
2. **预期**：侧边栏"咨询管理"旁显示红色数字角标（= 未阅数量）

### 场景 5：处理状态流转

1. 在咨询管理编辑其他字段（如状态从"待处理"→"已解决"）
2. 点击保存
3. **预期**：处理状态更新，操作日志记录此次变更

## 运行命令

```bash
# 后端
cd D:\Portaltest\server
node src/index.js

# 前端
cd D:\Portaltest
npm run dev

# API 直接测试
curl http://localhost:8080/api/v1/contacts/unread-count

# 标记已阅
curl -X PUT http://localhost:8080/api/v1/contacts/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"read_status":"read"}'
```

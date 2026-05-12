# SaveAny: Vue 3 -> React Native (Expo) 迁移计划

## Context

当前 SaveAny 是一个 Vue 3 + FastAPI 全栈视频下载+AI摘要应用。目标是使用 React Native (Expo) + WebView 混合方案将其改写为跨端移动应用，以发布到 App Store / Google Play。后端 API 无需修改。

## 技术决策总览

| 功能 | Vue 方案 | RN 方案 | 原因 |
|------|---------|---------|------|
| 状态管理 | App.vue 中的 ref | Zustand | 原项目无 store，prop drilling 不适合复杂组件 |
| 路由 | 无（单页） | expo-router | Tab 导航 + push 导航 |
| SSE 流式 | fetch + ReadableStream | XMLHttpRequest onprogress | Hermes 引擎 ReadableStream 支持不完整 |
| 文件下载 | Blob + createObjectURL | expo-file-system + expo-sharing | 原生文件处理，自带进度条 |
| 思维导图 | markmap DOM 渲染 | WebView + postMessage | markmap 依赖 DOM，必须用 WebView |
| Markdown | marked (HTML) | react-native-markdown-display | 原生 RN 渲染 |
| 样式 | Tailwind CSS 4 | NativeWind (Tailwind 3) | NativeWind 4 要求 Tailwind 3 |
| 弹窗 | Teleport + absolute | @gorhom/bottom-sheet | RN 无 viewport 定位 |
| 支付 | window.location | Linking.openURL + deep link | 外部浏览器 + scheme 回调 |

## 项目结构

```
SaveAny/
├── app/                          # expo-router 文件路由
│   ├── _layout.tsx               # 根布局（providers, 全局弹窗）
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Tab 栏配置
│   │   ├── index.tsx             # 首页（HeroInput + VideoInfoCard）
│   │   ├── features.tsx          # 功能介绍页
│   │   ├── pricing.tsx           # 定价页
│   │   └── about.tsx             # 使用教程 + 对比 + 平台
│   ├── summary.tsx               # AI 摘要全屏页（4 Tab）
│   └── payment-result.tsx        # 支付回调 deep link
├── src/
│   ├── api/                      # API 模块
│   │   ├── client.ts             # axios 实例 + auth 拦截器
│   │   ├── auth.ts               # 认证（AsyncStorage 替代 localStorage）
│   │   ├── video.ts              # 视频解析（移除 blob 下载）
│   │   ├── payment.ts            # 支付
│   │   └── summarize.ts          # SSE 流式（XHR 替代 ReadableStream）
│   ├── stores/
│   │   ├── useAuthStore.ts       # 用户状态
│   │   └── useVideoStore.ts      # 视频/摘要状态
│   ├── components/
│   │   ├── ui/                   # Button, Input, Card, Badge, Toast, Spinner
│   │   ├── AppHeader.tsx
│   │   ├── HeroInput.tsx         # URL 输入 + 剪贴板粘贴
│   │   ├── VideoInfoCard.tsx     # 视频信息 + 格式选择
│   │   ├── FormatSelector.tsx
│   │   ├── SummaryTab.tsx        # Markdown 摘要
│   │   ├── SubtitleTab.tsx       # 字幕列表 + 导出
│   │   ├── MindmapWebView.tsx    # WebView 包装器
│   │   ├── ChatTab.tsx           # AI 问答
│   │   ├── AuthSheet.tsx         # 登录/注册底部弹窗
│   │   ├── FeatureCards.tsx      # 营销页面（简化版）
│   │   ├── HowToSteps.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── PricingCards.tsx
│   │   ├── PlatformGrid.tsx
│   │   └── AppFooter.tsx
│   ├── webviews/
│   │   └── mindmap.html          # markmark 独立 HTML 页面
│   ├── hooks/
│   │   ├── useClipboardPaste.ts
│   │   └── useDeepLink.ts
│   ├── theme/
│   │   ├── colors.ts             # 设计 token（移植 style.css）
│   │   └── typography.ts
│   └── utils/
│       ├── format.ts             # 数字/时间格式化
│       └── subtitleExport.ts     # SRT/VTT/TXT 生成
├── assets/                       # icon.png, splash.png, adaptive-icon.png
├── app.json                      # Expo 配置（scheme: "saveany"）
├── tailwind.config.js
├── metro.config.js
└── babel.config.js
```

## 实施阶段

### Phase 0: 项目脚手架
- `npx create-expo-app@latest SaveAny --template blank-typescript`
- 安装依赖：expo-router, nativewind, tailwindcss@3, zustand, axios, react-native-sse, expo-file-system, expo-sharing, expo-media-library, react-native-webview, react-native-markdown-display, @gorhom/bottom-sheet, react-native-reanimated, react-native-gesture-handler, expo-linear-gradient, @react-native-async-storage/async-storage, expo-clipboard
- 配置 NativeWind（tailwind.config.js, metro.config.js, babel.config.js, global.css）
- 配置 app.json（scheme, icons, splash, bundle ID）

### Phase 1: 数据层（API + Store + Theme）
**优先级最高，所有 UI 依赖此层**

1. **`src/theme/colors.ts`** — 移植 style.css 中 13 个自定义颜色
2. **`src/api/client.ts`** — axios 实例，baseURL 可配置，auth 拦截器
3. **`src/api/auth.ts`** — 移植 auth.js，localStorage -> AsyncStorage（全部变 async）
4. **`src/api/video.ts`** — 移植 video.js，移除 downloadViaServer 和 getDownloadUrl
5. **`src/api/summarize.ts`** — **最高风险**，将 ReadableStream 改为 XMLHttpRequest.onprogress
   - 保留原始 SSE 解析逻辑（event/data 字段分割）
   - 回调接口不变：{ subtitle, summary, mindmap, quota, done, error }
6. **`src/api/payment.ts`** — 移植 payment.js，checkout_url 用 Linking.openURL 打开
7. **`src/stores/useAuthStore.ts`** — 管理 user, authSheetVisible, authMode
8. **`src/stores/useVideoStore.ts`** — 管理 loading, videoData, currentUrl, downloading

### Phase 2: UI 基础组件
- Button（primary/outline/ghost + loading/disabled）
- Input（圆角 + icon 插槽）
- Card, Badge, Spinner, Toast

### Phase 3: 核心页面组件
1. **AppHeader** — 导航栏 + 用户菜单（dropdown -> bottom-sheet）
2. **HeroInput** — TextInput + 剪贴板粘贴（expo-clipboard）+ 示例链接
3. **VideoInfoCard** — 缩略图 + 格式选择 + 下载/摘要按钮
4. **FormatSelector** — 可选格式列表

### Phase 4: VideoSummary（最复杂）
1. **Tab 导航栏** — 自定义 Tab 指示器
2. **SummaryTab** — react-native-markdown-display 替代 marked
3. **SubtitleTab** — FlatList + expo-sharing 导出 SRT/VTT/TXT
4. **MindmapWebView** — WebView + postMessage 协议
   - RN -> WebView: `{ type: 'render', markdown }`, `{ type: 'exportSvg' }`, `{ type: 'exportPng' }`
   - WebView -> RN: `{ type: 'svg', data }`, `{ type: 'png', data }`
   - mindmap.html 加载 CDN 版 markmap-lib + markmap-view + d3
5. **ChatTab** — FlatList 消息列表 + SSE 流式回答 + Markdown 渲染

### Phase 5: 文件下载系统
- 使用 `/api/direct-url` 获取 CDN URL（不经过服务器代理）
- expo-file-system 下载（支持进度回调）
- expo-sharing 弹出系统分享/保存对话框
- **注意**：需检查后端 direct-url 响应是否包含 filename，可能需要小改动

### Phase 6: 导航和页面布局
- `app/_layout.tsx` — 根布局（GestureHandler, BottomSheet, AuthSheet, Toast）
- `app/(tabs)/_layout.tsx` — 4 个 Tab（首页/功能/定价/关于）
- `app/(tabs)/index.tsx` — 首页（HeroInput + VideoInfoCard）
- `app/summary.tsx` — AI 摘要全屏页
- `app/payment-result.tsx` — 支付回调处理

### Phase 7: 营销页面（简化版原生组件）
- FeatureCards — 5 个功能卡片，flexWrap 布局
- HowToSteps — 3 步教程
- ComparisonTable — 对比表格（ScrollView horizontal）
- PricingCards — 免费/VIP 双卡片（VIP 用 LinearGradient）
- PlatformGrid — 平台徽章网格
- AppFooter — 版权信息

### Phase 8: 支付集成
- 流程：VIP 按钮 -> createCheckoutSession -> Linking.openURL(checkout_url)
- Stripe 支付完成后重定向到 `saveany://payment-result?payment=success`
- **后端需改动**：success_url/cancel_url 使用 deep link scheme
  - 同时支持 Web 和 App：后端根据请求头/参数判断客户端类型

### Phase 9: 上架准备
- App 图标（1024x1024）、启动屏、自适应图标
- app.json 完整配置（bundle ID, permissions, scheme）
- EAS Build 配置（eas.json）
- 隐私政策页面（App Store 必需）
- App Store / Google Play 元数据

### Phase 10: 测试
- 单元测试：API 模块、工具函数
- 组件测试：HeroInput、VideoInfoCard、AuthSheet
- E2E 测试：完整流程（输入 URL -> 解析 -> 下载 -> AI 摘要）

## 关键源文件参考

| 迁移内容 | 源文件 | 关键行 |
|---------|--------|--------|
| SSE 流式解析 | `frontend/src/api/summarize.js` | L8-58（SSE 解析逻辑） |
| 思维导图渲染 | `frontend/src/components/VideoSummary.vue` | L130-195（markmap 创建） |
| 设计 token | `frontend/src/style.css` | L4-18（@theme 颜色定义） |
| 全局状态 | `frontend/src/App.vue` | L125-246（所有 ref 和 handler） |
| 认证存储 | `frontend/src/api/auth.js` | L1-80（localStorage 操作） |
| 字幕导出 | `frontend/src/components/VideoSummary.vue` | L566-623（SRT/VTT/TXT） |
| 视频解析 API | `frontend/src/api/video.js` | 全文件 |

## 后端需改动（最小化）

1. `/api/direct-url` 响应需包含 `filename` 字段（供 RN 命名下载文件）
2. `/api/payment/create-checkout` 的 success_url/cancel_url 需支持 deep link scheme
   - 可选方案：前端传入 `client_type: 'app'` 参数，后端返回对应 URL

## 验证方式

1. Phase 0+1 完成后：运行 `npx expo start`，在模拟器中验证 API 调用成功
2. Phase 3 完成后：输入视频 URL -> 看到解析结果和格式列表
3. Phase 4 完成后：触发 AI 摘要 -> 4 个 Tab 均正常工作（特别是思维导图 WebView）
4. Phase 5 完成后：选择格式 -> 下载视频 -> 系统分享弹窗出现
5. Phase 8 完成后：VIP 按钮 -> 跳转 Stripe -> 返回 App 显示成功
6. Phase 9：`eas build` 生成 APK/IPA，提交审核

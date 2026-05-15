# AI 视频摘要功能实现文档

## 功能概述

SaveAny 移动端 AI 视频摘要功能，完整链路：首页输入链接 → 解析视频 → 展示结果 → AI 摘要（SSE 流式渲染）。

## 交互流程

```
首页输入链接 → 点击解析（react-hook-form 校验）
    ↓ 调用 POST /api/parse
解析成功 → 携带视频数据跳转 result 页
    ↓ result 页展示视频信息 + 格式选择 + 下载/摘要按钮
点击"AI 摘要" → 跳转 ai-summary 页面
    ↓ 自动发起 POST /api/summarize SSE 请求
流式渲染：摘要 → 字幕 → 思维导图 → 配额
    ↓ 用户切换 Tab 查看不同视图
AI 问答 Tab → 输入问题 → POST /api/chat SSE 流式回答
```

## 技术方案

| 功能 | 方案 | 原因 |
|------|------|------|
| SSE 流式请求 | `react-native-sse` (EventSource) | Hermes 引擎 ReadableStream 支持不完整 |
| 状态管理 | Zustand Store | 项目已有方案，子组件选择性订阅避免重渲染 |
| URL 校验 | react-hook-form + zod | 项目已有方案，统一表单校验风格 |
| 思维导图 | WebView + markmap CDN | markmap 依赖 DOM，必须用 WebView |
| Markdown 渲染 | react-native-markdown-display | 原生 RN 渲染 |
| 缩略图加载 | expo-image + 后端代理 | 绕过防盗链 |

## 后端接口

### POST /api/parse — 视频解析

请求：`{ url: string }`

响应：
```json
{
  "success": true,
  "data": {
    "id": "BV1GJ411x7h7",
    "title": "视频标题",
    "thumbnail": "https://...",
    "duration": 212.393,
    "duration_string": "3:32",
    "uploader": "上传者",
    "platform": "BiliBili",
    "view_count": 99221530,
    "upload_date": "20191231",
    "description": "...",
    "formats": [
      {
        "format_id": "bestvideo+bestaudio/best",
        "ext": "mp4",
        "resolution": "852x480",
        "height": 480,
        "filesize": 20887948,
        "vcodec": "avc1.64001F",
        "acodec": "merged",
        "has_audio": true,
        "label": "480p 最佳 (视频+音频合并)"
      }
    ]
  }
}
```

### POST /api/summarize — AI 摘要（SSE 流式）

请求：`{ url: string, language?: string }`

SSE 事件流：
- `subtitle` — 字幕数据（`{ has_subtitle, segments, full_text, language, subtitle_type }`）
- `summary` — 流式文本 token（JSON 编码的字符串）
- `mindmap` — 思维导图 Markdown（`{ markdown: string }`）
- `quota` — 剩余配额（`{ remaining, limit }`）
- `done` — 完成标记 `[DONE]`
- `error` — 错误信息（`{ message, need_login?, need_vip? }`）

### POST /api/chat — AI 问答（SSE 流式）

请求：`{ url: string, question: string, subtitle_text?: string }`

SSE 事件流：
- `answer` — 流式文本 token
- `done` — 完成标记
- `error` — 错误信息

## 文件变更清单

### 新建文件

| 文件 | 职责 |
|------|------|
| `src/api/summarize.ts` | SSE 请求封装，基于 react-native-sse 的 EventSource |
| `src/stores/use-ai-summary-store.ts` | Zustand Store，管理摘要/字幕/思维导图/问答的全部状态 |

### 修改文件

| 文件 | 改动 |
|------|------|
| `src/api/client.ts` | 导出 `getBaseUrl()` 供 summarize.ts 复用 |
| `src/types/index.ts` | 新增 `SubtitleSegment`、`SubtitleData`、`ChatMessage` 类型 |
| `src/stores/index.ts` | 导出 `useAiSummaryStore` |
| `src/components/business/hero-section.tsx` | TextInput 改为 react-hook-form Controller 受控组件，新增 URL 校验错误提示 |
| `src/components/business/video-card.tsx` | props 改为真实字段（thumbnail/uploader/viewCount），缩略图用 expo-image 代理加载 |
| `src/components/business/ai-summary-content.tsx` | 去掉 Mock，从 Store 读取 summaryText，支持流式渲染 + 空状态 |
| `src/components/business/ai-subtitles-view.tsx` | 去掉 Mock，从 Store 读取 subtitleData，动态字幕数量/类型 |
| `src/components/business/ai-mindmap-view.tsx` | 去掉 Mock，从 Store 读取 mindmapMarkdown，useEffect 监听变化重新渲染 |
| `src/components/business/ai-mindmap-view.web.tsx` | 同上，Web 端实现 |
| `src/components/business/ai-mindmap-shared.tsx` | 删除 MOCK_MINDMAP_MARKDOWN 常量，保留 Toolbar 和 styles |
| `src/components/business/ai-chat-view.tsx` | 去掉 Mock，从 Store 读取消息/输入/状态，绑定发送逻辑 |
| `app/(tabs)/index.tsx` | react-hook-form + zod 校验 URL，调用 /api/parse 后携带完整数据跳转 |
| `app/result.tsx` | 路由参数接收完整视频数据，formats JSON 解析为格式列表 |
| `app/ai-summary.tsx` | useLocalSearchParams 获取 url，useEffect 启动 SSE，cleanup 取消请求 |

## 数据流架构

```
index.tsx (useForm + zod)
  │ POST /api/parse
  │ router.push({ url, title, thumbnail, ... })
  ▼
result.tsx (useLocalSearchParams)
  │ 展示 VideoCard + FormatSelector + ActionButtons
  │ router.push({ url }) → ai-summary
  ▼
ai-summary.tsx
  │ useLocalSearchParams → setVideoUrl → startSummarize
  │ useEffect cleanup → cancelSummarize
  ▼
useAiSummaryStore (Zustand)
  ├── SSE /api/summarize → subtitleData / summaryText / mindmapMarkdown / quotaInfo
  └── SSE /api/chat → chatMessages
       │
       ▼ (子组件选择性订阅)
  AiSummaryContent   ← s.summaryText
  AiSubtitlesView    ← s.subtitleData
  AiMindmapView      ← s.mindmapMarkdown
  AiChatView         ← s.chatMessages / s.chatInput / s.sendQuestion
```

## SSE 实现要点

`react-native-sse` 的 EventSource 支持 POST + body + headers，底层基于 XHR，兼容 Hermes 引擎。

```typescript
import EventSource from 'react-native-sse'

const es = new EventSource(`${BASE_URL}/api/summarize`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify({ url, language: 'zh' }),
})

es.addEventListener('subtitle', (e) => { /* 处理字幕 */ })
es.addEventListener('summary', (e) => { /* 流式追加摘要 */ })
es.addEventListener('mindmap', (e) => { /* 思维导图 Markdown */ })
es.addEventListener('done', () => es.close())
es.addEventListener('error', (e) => { /* 错误处理 */ es.close() })
```

## 需要安装的依赖

```bash
npm install react-native-sse
```

其余已安装：`zustand`、`react-native-webview`、`react-native-markdown-display`、`expo-image`、`react-hook-form`、`zod`、`@hookform/resolvers`。

## 待办事项

- [ ] HeroSection TextInput 剪贴板粘贴功能（expo-clipboard）
- [ ] 视频下载功能（expo-file-system + expo-sharing）
- [ ] 字幕导出功能（SRT/VTT/TXT）
- [ ] 思维导图导出（SVG/PNG）
- [ ] 登录态校验（未登录时弹出 AuthSheet）
- [ ] 配额不足时引导升级 VIP

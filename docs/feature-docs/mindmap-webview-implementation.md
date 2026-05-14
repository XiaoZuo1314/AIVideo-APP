# 思维导图 WebView 实现文档

## 概述

使用 `react-native-webview` + `markmap` 实现 AI 摘要页面的思维导图渲染。通过 `postMessage` / `injectJavaScript` 实现 React Native 与 WebView 的双向通信。

## 技术方案

### 为什么用 WebView

- 思维导图需要复杂的 SVG 渲染和交互（缩放、拖拽、折叠）
- markmap 是成熟的 Web 端思维导图库，直接在 WebView 中加载最可靠
- 避免在 RN 侧重新实现树形布局和手势交互

### 依赖

| 包 | 用途 |
|------|------|
| `react-native-webview` | RN 官方 WebView 组件 |
| `d3@7` (CDN) | markmap 的图表引擎依赖 |
| `markmap-view` (CDN) | SVG 渲染和交互 |
| `markmap-lib` (CDN) | markdown → 树形数据转换 |

markmap 相关库全部通过 CDN 在 WebView 内加载，不需要 npm 安装。

## 架构

```
┌─────────────────────────────────────┐
│  React Native                       │
│                                     │
│  AiMindmapView                      │
│  ├── Toolbar (放大/缩小/重置/全屏)    │
│  └── WebView                        │
│       ├── onMessage ← ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│       └── injectJavaScript ─ ─ → ─ ─ ─ ─ ┤
│                                          │
│  ┌───────────────────────────────────┐   │
│  │  WebView (HTML)                   │   │
│  │                                   │   │
│  │  window.__rnBridge(jsonStr)  ← ─ ─ ─ ┘
│  │       ↓                           │
│  │  renderMindmap(markdown)          │
│  │  mm.rescale() / mm.fit()          │
│  │       ↓                           │
│  │  window.ReactNativeWebView        │
│  │    .postMessage(jsonStr) ─ ─ → onMessage
│  └───────────────────────────────────┘
└─────────────────────────────────────┘
```

## 通信协议

### RN → WebView

通过 `injectJavaScript` 调用 `window.__rnBridge()` 全局函数：

```typescript
const json = JSON.stringify({ type, payload })
const encoded = encodeURIComponent(json)
webViewRef.current?.injectJavaScript(
  `window.__rnBridge(decodeURIComponent('${encoded}'));true;`
)
```

使用 `encodeURIComponent` 编码避免 markdown 中的换行、中文、引号等字符导致 JS 注入失败。

| type | payload | 说明 |
|------|---------|------|
| `render` | markdown 字符串 | 渲染思维导图 |
| `zoomIn` | — | 放大 1.2x |
| `zoomOut` | — | 缩小 0.8x |
| `reset` | — | 重置到初始视图 |

### WebView → RN

通过 `window.ReactNativeWebView.postMessage()` 发送 JSON：

| type | payload | 说明 |
|------|---------|------|
| `ready` | — | markmap 脚本加载完成，可以接收数据 |
| `error` | 错误信息 | 渲染或脚本执行出错 |

## 踩坑记录

### Bug 1: `ready` 事件不触发

**原因**: `window.addEventListener('load', ...)` 在内联 `<script>` 中注册时，`load` 事件可能已经触发过了。

**修复**: 改为轮询检测 markmap 是否加载完成：

```javascript
function checkReady() {
  if (window.markmap && window.markmap.Markmap && window.markmap.Transformer) {
    postMsg('ready');
  } else {
    setTimeout(checkReady, 200);
  }
}
checkReady();
```

### Bug 2: HTML 收不到 RN 发送的消息

**原因**: `document.dispatchEvent(new MessageEvent('message', ...))` 会被 WebView 的原生 `onMessage` 处理器截获并传回 RN，而不是被 HTML 内的 `document.addEventListener('message', ...)` 监听到。

**修复**: 不使用事件派发，改为直接调用全局函数 `window.__rnBridge()`。

### Bug 3: 拿不到 markmap 实例

**原因**: `svg.__bindedInstance` 不是 markmap 的公开 API，属性名不可靠。

**修复**: 使用 `markmap-lib` 的 `Transformer` + `markmap-view` 的 `Markmap.create()` 显式创建实例并持有引用：

```javascript
var transformer = new mmLib.Transformer();
var result = transformer.transform(markdown);
mm = mmLib.Markmap.create(svg, {}, result.root);
```

## 文件结构

| 文件 | 变更 |
|------|------|
| `package.json` | 新增 `react-native-webview` |
| `app/ai-summary.tsx` | mindmap 移出 ScrollView，与 chat 共享 `flex:1` 布局 |
| `src/components/business/ai-mindmap-view.tsx` | 重写为 WebView + markmap |

## 布局说明

WebView 需要固定高度容器，不能放在 `ScrollView` 内。因此 mindmap tab 与 chat tab 共享同一套 `flex:1` 布局：

```tsx
{activeTab === 'chat' || activeTab === 'mindmap' ? (
  <View style={styles.chatContainer}>       {/* flex: 1 */}
    <View style={styles.chatFixedArea}>     {/* 固定区域: 标签栏 + 配额 */}
      <AiQuotaBadge remaining={3} />
      <AiTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
    {activeTab === 'chat' ? <AiChatView /> : <AiMindmapView />}
  </View>
) : (
  <ScrollView ...>                          {/* summary / subtitles */}
    ...
  </ScrollView>
)}
```

## Mock 数据

使用 `MOCK_MINDMAP_MARKDOWN` 常量，标准 markdown 标题层级 + 列表，markmap 自动渲染为可折叠树形结构：

```markdown
# 苹果 WWDC 2024 重点回顾

## iOS 18 新特性
### 自定义锁屏
- 新增小组件排列方式
- 锁屏快捷操作自定义
...
```

## 后续优化

- **深色主题**: 当前 WebView 使用浅色背景，后续可通过 CSS 变量传递主题色
- **本地 CDN**: 生产环境可将 markmap JS 打包到 app 内，避免网络加载延迟
- **全屏模式**: 工具栏全屏按钮目前未实现，需要原生全屏 API 支持

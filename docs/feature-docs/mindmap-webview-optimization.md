# 思维导图 WebView 性能与安全优化方案

> 涉及文件：
> - `src/components/business/ai-mindmap-view.tsx` — Native 端（WebView 方案）
> - `src/components/business/ai-mindmap-view.web.tsx` — Web 端（直连 DOM 方案）
> - `src/components/business/ai-mindmap-shared.tsx` — 共享代码

---

## 一、当前架构概述

| 平台 | 渲染方式 | 脚本加载 | 通信机制 |
|------|---------|---------|---------|
| iOS / Android | `react-native-webview` 加载内联 HTML | HTML 内动态创建 `<script>` 加载 CDN | `injectJavaScript` + `postMessage` 双向桥接 |
| Web | 直接操作 DOM | 往主文档 `<head>` 插入 `<script>` | 直接 JS 调用，无桥接 |

三个 CDN 资源：`d3@7.9.0`、`markmap-view@0.18.12`、`markmap-lib@0.18.12`（jsdelivr）。

---

## 二、性能优化方案

### 2.1 CDN 资源加载优化

| 优化项 | 说明 | 优先级 |
|--------|------|--------|
| **预加载脚本** | 在 WebView 初始化前，用 `Linking` 或原生模块预下载 JS 文件到本地，`source` 改为 `{{ baseUrl: 'file://' }}` 加载本地资源，彻底消除 CDN 延迟 | 高 |
| **Script 并行加载** | 当前三个脚本通过 `forEach` 并行创建 `<script>` 标签，已经是并行加载，无需改动 | — |
| **版本锁定 + 缓存** | 当前已锁定具体版本（`@7.9.0`、`@0.18.12`），CDN 返回 `immutable` 缓存头，二次加载命中浏览器/WebView 缓存 | — |
| **资源按需拆分** | markmap-lib 仅用于 markdown → AST 转换，可考虑在服务端预处理，客户端只加载 `d3` + `markmap-view`（减少 ~30% 体积） | 中 |

### 2.2 WebView 实例优化

| 优化项 | 说明 | 优先级 |
|--------|------|--------|
| **延迟渲染** | 当前已实现：WebView `opacity: 0`，收到 `ready` 消息后才显示，避免白屏闪烁 | — |
| **避免重复创建** | 用 `React.memo` 包裹组件（已实现），props 不变时跳过重渲染 | — |
| **`scrollEnabled={false}`** | 已设置，禁用 WebView 内部滚动，避免与外层 ScrollView 冲突和多余的滚动计算 | — |
| **`overScrollMode="never"`** | 已设置（Android），阻止过度滚动弹性效果 | — |
| **按需加载 WebView** | 可考虑懒加载：只有用户滚动到思维导图区域时才挂载 WebView，减少首屏内存占用 | 中 |
| **组件卸载时清理** | 在 `useEffect` 清理函数中调用 `webViewRef.current?.injectJavaScript('mm=null;true;')` 释放 markmap 实例，避免内存泄漏 | 高 |

### 2.3 超时与重试策略

| 优化项 | 说明 | 优先级 |
|--------|------|--------|
| **超时时间** | 当前 15 秒，对于弱网环境可能不够，建议改为 20 秒或可配置 | 低 |
| **指数退避重试** | 当前重试是直接 `reload()`，建议加入退避策略（首次立即重试，后续间隔递增） | 低 |
| **重试时复用缓存** | WebView reload 会重新加载内联 HTML，但 CDN 资源命中缓存时会秒加载，无需额外处理 | — |

### 2.4 Web 端优化

| 优化项 | 说明 | 优先级 |
|--------|------|--------|
| **脚本去重** | 已实现：`loadScript` 检查 `document.querySelector` 是否已存在同 src 的 script 标签 | — |
| **重试清理** | 已实现：`handleRetry` 先移除旧 script 标签再重新加载 | — |
| **单例实例** | 多次渲染复用同一个 `mmRef`，不重复创建 Markmap 实例 | — |

---

## 三、安全优化方案

### 3.1 CSP（Content Security Policy）

当前策略（内联 HTML `<meta>` 标签）：

```
default-src 'none';
script-src https://cdn.jsdelivr.net 'unsafe-inline';
style-src 'unsafe-inline';
img-src data:;
```

| 指令 | 当前值 | 说明 |
|------|--------|------|
| `default-src 'none'` | 默认禁止所有资源加载 | 安全基线 |
| `script-src` | 允许 jsdelivr + 内联脚本 | `'unsafe-inline'` 为功能性必须，HTML 内含桥接代码 |
| `style-src 'unsafe-inline'` | 允许内联样式 | markmap 渲染需要动态注入 SVG 样式 |
| `img-src data:` | 允许 data URI 图片 | 如思维导图内嵌图片 |

**改进建议**：

- 可将内联脚本移到 CDN 上（计算 SHA256 哈希后用 `script-src 'sha256-xxx'` 替代 `'unsafe-inline'`），但维护成本高，当前场景收益有限
- 可添加 `connect-src 'none'` 明确禁止 XHR/Fetch 外连（当前被 `default-src 'none'` 隐式覆盖）

### 3.2 导航白名单

```tsx
originWhitelist={['https://cdn.jsdelivr.net', 'about:blank']}
onShouldStartLoadWithRequest={(request) => {
  return request.url.startsWith('https://cdn.jsdelivr.net/')
      || request.url === 'about:blank'
}}
```

**双层防护**：
- `originWhitelist`：拦截主框架导航
- `onShouldStartLoadWithRequest`：拦截所有子资源请求（包括 iframe、script）

**改进建议**：
- 添加 `navigate` 事件拦截，阻止任何非预期跳转
- 考虑锁定到具体路径：`https://cdn.jsdelivr.net/npm/` 而非整个域名

### 3.3 输入消毒

```tsx
const SANITIZE_RE = /[<>\\]/g
function sanitizeForInjection(str: string): string {
  return str.replace(SANITIZE_RE, '')
}
```

通过 `injectJavaScript` 注入到 WebView 的数据（如 markdown 内容）会先经过 `sanitizeForInjection` 过滤，移除 `<`、`>`、`\` 字符，防止注入恶意 HTML 或 JavaScript。

**改进建议**：
- 对 markdown 内容使用更完整的 sanitize 方案（如只允许 markdown 语法的白名单）
- URI 编码注入（`encodeURIComponent`）已实现，双重防护

### 3.4 SRI（Subresource Integrity）

所有三个 CDN 脚本均配置了 `integrity` 属性 + `crossOrigin="anonymous"`：

```javascript
{ src: 'https://cdn.jsdelivr.net/npm/d3@7.9.0',
  integrity: 'sha384-CjloA8y00+...' }
```

CDN 被篡改或传输损坏时，浏览器/WebView 会拒绝执行该脚本，触发 `onerror` 回调上报错误。

**维护注意**：升级 CDN 资源版本时必须同步更新 integrity 哈希值。

### 3.5 WebView 隔离

| 措施 | 状态 |
|------|------|
| 禁用文件访问 | 未显式设置，建议添加 `allowFileAccess={false}`（Android）和 `allowFileAccessFromFileURLs={false}` |
| 禁用通用链接 | 已通过 `onShouldStartLoadWithRequest` 间接实现 |
| 禁用弹窗 | WebView HTML 无 `window.open` 调用，风险可控 |
| 隐藏未就绪内容 | 已实现 `opacity: 0` 直到 `ready` 消息到达 |

---

## 四、优化优先级总结

### 立即可做（高优先级）

1. **组件卸载时释放 markmap 实例** — 防止内存泄漏
2. **Android `allowFileAccess={false}`** — 关闭不必要的文件访问权限

### 后续优化（中优先级）

3. **CDN 资源本地化** — 弱网环境体验提升显著
4. **按需加载 WebView** — 减少首屏资源消耗
5. **服务端预处理 markdown** — 减少客户端依赖（去掉 markmap-lib）

### 可选优化（低优先级）

6. CSP 用 `'sha256-xxx'` 替代 `'unsafe-inline'`
7. 超时时间可配置化
8. 重试指数退避策略

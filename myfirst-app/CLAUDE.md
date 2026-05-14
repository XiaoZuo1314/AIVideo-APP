# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SaveAny 移动端 — AI 视频下载器。基于 Expo SDK 54 + React Native 0.81 + TypeScript，使用 expo-router 文件路由。

## Development Commands

```bash
npm install
npx expo start              # 开发服务器
npx expo start --web        # Web 预览 http://localhost:8081
npx expo start --ios        # iOS 模拟器
npx expo start --android    # Android 模拟器
npm run lint                # eslint-config-expo
```

无测试框架。

## Tech Stack

- **导航**: expo-router 6（文件路由）+ NativeTabs（原生标签栏）
- **状态**: Zustand 5
- **网络**: Axios
- **动画**: react-native-reanimated 4 + react-native-gesture-handler
- **图标**: @expo/vector-icons (Ionicons) / expo-symbols (SF Symbols)
- **图片**: expo-image
- **底部弹窗**: @gorhom/bottom-sheet 5
- **样式**: 纯 StyleSheet.create()，无 NativeWind/Tailwind

## Architecture

### 路由

```
app/
  _layout.tsx          → ThemeProvider + Stack (headerShown: false)
  index.tsx            → Redirect → /(tabs)
  (tabs)/
    _layout.tsx        → NativeTabs: 首页/功能/定价/关于
    index.tsx          → 首页 (HeaderBar + HeroSection + Cards)
    features.tsx       → 功能页 (占位)
    pricing.tsx        → 定价页 (占位)
    about.tsx          → 关于页 (占位)
```

### 源码结构

```
src/
  theme/
    colors.ts          → Colors.light / Colors.dark 双主题 token
    typography.ts      → 字体预设 (heroTitle/cardTitle/subtitle 等)
  components/
    ui/                → ThemedText, ThemedView (主题感知基础组件)
    business/          → 页面级组件 (HeaderBar, HeroSection, RecentCard, FeatureCard)
  hooks/
    use-color-scheme.ts      → 系统主题
    use-theme-color.ts       → 颜色 token 查询
  stores/              → Zustand (占位)
  features/            → 功能模块 (占位)
  utils/               → 工具函数 (占位)
  constants/           → 常量 (占位)
  types/               → 类型定义 (占位)
```

Path alias: `@/*` → 项目根目录。

## vercel-react-native-skills 规范

项目遵循 `.agents/skills/vercel-react-native-skills/` 中的规范，核心规则：

| 规则 | 写法 |
|------|------|
| 样式 | `StyleSheet.create()`，禁止内联 style 对象 |
| 触摸 | `Pressable`，禁止 `TouchableOpacity` |
| 圆角 | `borderRadius` 必须配 `borderCurve: 'continuous'` |
| 间距 | 父级 `gap`，子级不用 `margin` |
| 渐变 | `experimental_backgroundImage: 'linear-gradient(...)'` |
| 阴影 | CSS `boxShadow` 字符串语法 |
| 安全区 | ScrollView 上 `contentInsetAdjustmentBehavior="automatic"`，不用 SafeAreaView |
| 图片 | `expo-image` 加载所有图片 |
| 文字 | 所有字符串必须包裹在 `<Text>` 中 |
| 条件渲染 | 避免 `falsy &&`，用三元表达式 |

## Theme System

双主题系统，token 定义在 `src/theme/colors.ts`：

```tsx
// 方式 1：Hook 获取颜色
const color = useThemeColor({}, 'primary')

// 方式 2：直接读取 token
const scheme = useColorScheme() ?? 'light'
const theme = Colors[scheme]

// 方式 3：主题组件
<ThemedText type="title">标题</ThemedText>
<ThemedView style={{ flex: 1 }}>内容</ThemedView>
```

新增颜色 token 必须在 `light` 和 `dark` 中**成对定义**。

## Expo Configuration

- New Architecture: 已启用 (`newArchEnabled: true`)
- React Compiler: 实验性启用 (`reactCompiler: true`)
- Typed Routes: 已启用
- Edge-to-Edge: Android 已启用

## Design Reference

Figma: `figma.com/design/eX5zE4Qf6WWY4A8Yuta8eM/ai`
主色: `#0057c2`
实现文档: `docs/feature-docs/home-page-implementation.md`

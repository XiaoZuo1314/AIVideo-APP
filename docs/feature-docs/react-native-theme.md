# React Native 亮色/暗色主题切换配置文档

## 概述

本项目使用 `@react-navigation/native` 的 `ThemeProvider` 实现系统级亮色/暗色主题切换。应用会自动跟随系统的颜色方案，无需手动切换。

## 架构设计

```
src/
├── theme/
│   ├── colors.ts          # 亮色/暗色双主题颜色定义
│   ├── typography.ts      # 字体配置
│   └── index.ts           # 统一导出
├── hooks/
│   ├── use-color-scheme.ts      # 获取当前系统颜色方案
│   ├── use-color-scheme.web.ts  # Web 端兼容版本
│   └── use-theme-color.ts       # 核心 hook，根据主题返回颜色
└── components/
    └── ui/
        ├── themed-text.tsx      # 主题感知 Text 组件
        └── themed-view.tsx      # 主题感知 View 组件
```

## 核心组件说明

### 1. Colors 颜色系统（`src/theme/colors.ts`）

定义 `Colors.light` 和 `Colors.dark` 两套颜色方案，包含以下颜色 Token：

| Token | 亮色值 | 暗色值 | 用途 |
|-------|--------|--------|------|
| primary | #1777FF | #4D9FFF | 主色调 |
| background | #FFFFFF | #151718 | 页面背景 |
| text | #1F1F1F | #ECEDEE | 主要文字 |
| textSecondary | #6B7280 | #9BA1A6 | 次要文字 |
| border | #E5E7EB | #2E3032 | 边框颜色 |
| success | #10B981 | #34D399 | 成功状态 |
| warning | #F59E0B | #FBBF24 | 警告状态 |
| error | #EF4444 | #F87171 | 错误状态 |

### 2. useColorScheme Hook（`src/hooks/use-color-scheme.ts`）

封装 React Native 原生的 `useColorScheme`，返回当前系统的颜色方案（`'light'` 或 `'dark'`）。

Web 端版本（`use-color-scheme.web.ts`）支持静态渲染，在客户端水合前默认返回 `'light'`。

### 3. useThemeColor Hook（`src/hooks/use-theme-color.ts`）

核心 hook，根据当前主题返回对应颜色。支持两种用法：

```tsx
// 用法 1：从 Colors 中获取
const color = useThemeColor({}, 'text')

// 用法 2：自定义亮暗色
const color = useThemeColor({ light: '#000', dark: '#fff' }, 'text')
```

### 4. ThemedText 组件（`src/components/ui/themed-text.tsx`）

主题感知的文字组件，自动根据当前主题切换文字颜色。

```tsx
import { ThemedText } from '@/src/components/ui/themed-text'

// 默认文字
<ThemedText>普通文字</ThemedText>

// 标题文字
<ThemedText type="title">标题</ThemedText>

// 自定义颜色
<ThemedText lightColor="#000" darkColor="#fff">自定义</ThemedText>
```

支持的 `type` 类型：
- `default` — 默认样式（16px）
- `title` — 标题（24px, 600）
- `subtitle` — 副标题（18px, 600）
- `secondary` — 次要文字（14px, 灰色）
- `muted` — 弱化文字（14px, 浅灰）
- `link` — 链接文字（16px, 蓝色）

### 5. ThemedView 组件（`src/components/ui/themed-view.tsx`）

主题感知的容器组件，自动根据当前主题切换背景颜色。

```tsx
import { ThemedView } from '@/src/components/ui/themed-view'

// 默认背景
<ThemedView style={{ flex: 1 }}>
  <ThemedText>内容</ThemedText>
</ThemedView>

// 自定义背景
<ThemedView lightColor="#f5f5f5" darkColor="#1a1a1a">
  <ThemedText>自定义背景</ThemedText>
</ThemedView>
```

## 使用方式

### 在页面中使用

```tsx
import { ThemedView } from '@/src/components/ui/themed-view'
import { ThemedText } from '@/src/components/ui/themed-text'

export default function MyScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">页面标题</ThemedText>
      <ThemedText type="secondary">副标题文字</ThemedText>
    </ThemedView>
  )
}
```

### 在 StyleSheet 中使用颜色

```tsx
import { Colors } from '@/src/theme'
import { useColorScheme } from '@/src/hooks/use-color-scheme'

export default function MyComponent() {
  const colorScheme = useColorScheme() ?? 'light'
  const theme = Colors[colorScheme]

  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>文字</Text>
    </View>
  )
}
```

### 直接使用 useThemeColor Hook

```tsx
import { useThemeColor } from '@/src/hooks/use-theme-color'

export default function MyComponent() {
  const textColor = useThemeColor({}, 'text')
  const bgColor = useThemeColor({}, 'background')

  return (
    <View style={{ backgroundColor: bgColor }}>
      <Text style={{ color: textColor }}>文字</Text>
    </View>
  )
}
```

## 根布局配置

`app/_layout.tsx` 使用 `ThemeProvider` 包裹整个应用：

```tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useColorScheme } from '@/src/hooks/use-color-scheme'

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack />
    </ThemeProvider>
  )
}
```

## 添加新颜色

1. 在 `src/theme/colors.ts` 的 `light` 和 `dark` 对象中同时添加新颜色
2. 更新 `Colors` 类型定义（TypeScript 会自动推导）
3. 在组件中通过 `useThemeColor` 或直接导入 `Colors` 使用

## 注意事项

1. **始终成对定义颜色** — 每个颜色必须在 `light` 和 `dark` 中同时定义
2. **使用主题组件** — 优先使用 `ThemedText` 和 `ThemedView`，避免硬编码颜色
3. **Web 端兼容** — 使用 `use-color-scheme.web.ts` 确保静态渲染正常
4. **StatusBar 样式** — 已在根布局中根据主题自动切换

## 参考文档

- [Expo 颜色方案指南](https://docs.expo.dev/guides/color-schemes/)
- [React Navigation 主题](https://reactnavigation.org/docs/themes/)
- [vercel-react-native-skills](https://skills.sh/vercel-labs/agent-skills/vercel-react-native-skills)

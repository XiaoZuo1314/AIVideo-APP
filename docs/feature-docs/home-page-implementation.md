# SaveAny 首页静态页面实现文档

## 概述

基于 Figma 设计稿实现 SaveAny 首页静态页面。设计稿地址：
`https://www.figma.com/design/eX5zE4Qf6WWY4A8Yuta8eM/ai?node-id=1-598`

## 设计稿分析

### 页面结构

SaveAny 首页为移动端单页设计（390px 宽），从上到下分为 5 个区域：

```
┌──────────────────────────┐
│   HeaderBar (56px)       │  ← 渐变圆形 Logo + "SaveAny" 品牌
├──────────────────────────┤
│   AI 智能加持 (胶囊徽章)   │
│   下载任意视频 (34px 标题)  │
│   副标题说明文字           │
│   ┌────────────────────┐ │
│   │ 🔗 输入框... [解析] │ │  ← TextInput + Pressable 按钮
│   └────────────────────┘ │
│   YouTube Bilibili Twitter│  ← 平台标签行
├──────────────────────────┤
│   最近解析卡片            │  ← 白色卡片，空状态
├──────────────────────────┤
│   高级功能卡片            │  ← 渐变背景，"了解更多"
└──────────────────────────┘
│   底部导航栏 (NativeTabs) │  ← 首页/功能/定价/关于
```

### 设计特征

| 属性 | 值 |
|------|-----|
| 主色调 | `#0057c2` (深蓝) |
| 页面背景 | `#FAF9FF` (浅紫白) |
| 卡片背景 | `#FFFFFF` |
| 圆角风格 | iOS continuous curve |
| 特效 | backdrop-blur, 渐变, boxShadow |

## 设计 Token 提取

### 颜色系统变更

从 Figma 设计稿提取后更新了 `src/theme/colors.ts`：

| Token | 旧值 | 新值 | 来源 |
|-------|------|------|------|
| primary | `#1777FF` | `#0057c2` | Figma 按钮/品牌 |
| primaryDark | `#1260DD` | `#004a9e` | Figma 深色变体 |
| tabIconSelected | `#1777FF` | `#0057c2` | 跟随主色 |

新增 Token（亮色/暗色双主题）：

| Token | 亮色 | 暗色 | 用途 |
|-------|------|------|------|
| badgeBackground | `#E8F1FF` | `#1A2A3A` | AI 标签背景 |
| badgeBorder | `rgba(0,87,194,0.1)` | `rgba(0,87,194,0.2)` | AI 标签边框 |
| tagBackground | `#F2F3FF` | `#1A1F36` | 平台标签背景 |
| tagBorder | `rgba(193,198,215,0.3)` | `rgba(60,70,100,0.3)` | 平台标签边框 |
| gradientStart | `#E8F1FF` | `#1A2A3A` | 功能卡片渐变起点 |

### 字体系统扩展

更新 `src/theme/typography.ts`，新增 5 个字体预设：

| 预设名 | fontSize | fontWeight | letterSpacing | 用途 |
|--------|----------|------------|---------------|------|
| heroTitle | 34 | 500 | -0.85 | 英雄区主标题 |
| brandTitle | 28 | 700 | - | "SaveAny" 品牌 |
| cardTitle | 20 | 600 | - | 卡片标题 |
| subtitle | 17 | 400 | - | 副标题 |
| tag | 12 | 500 | - | 平台标签 |

## 文件清单

### 修改的文件

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/theme/colors.ts` | 修改 | 主色更新 + 5 个新 Token |
| `src/theme/typography.ts` | 修改 | 新增 5 个字体预设 |
| `src/components/ui/themed-text.tsx` | 修改 | 链接颜色 `#1777FF` → `#0057c2` |
| `src/components/business/index.ts` | 修改 | 导出 4 个业务组件 |
| `app/(tabs)/index.tsx` | 替换 | 占位 → 完整首页 |

### 新建的文件

| 文件 | 说明 |
|------|------|
| `src/components/business/header-bar.tsx` | 顶部品牌导航栏 |
| `src/components/business/hero-section.tsx` | 英雄区（徽章+标题+输入框+标签） |
| `src/components/business/recent-card.tsx` | 最近解析卡片 |
| `src/components/business/feature-card.tsx` | 高级功能渐变卡片 |

## 组件设计

### HeaderBar — 顶部品牌栏

```
Props: 无（MVP 无交互）
布局: height 56, row, space-between
左侧: 渐变圆形 (linear-gradient 135deg #006EF3 → #316BF3) + download 图标
中间: "SaveAny" brandTitle (28px/700)
右侧: 32x32 占位 View
```

关键技术点：
- 使用 `experimental_backgroundImage` 实现渐变圆形，无需第三方库
- `borderCurve: 'continuous'` 实现 iOS 风格圆角

### HeroSection — 英雄区

```
Props: onParsePress?: () => void
布局: column, gap 16, alignItems center

子组件:
├── AI Badge: 胶囊 View + 蓝色圆点 + "AI 智能加持"
├── 主标题: "下载任意视频" (heroTitle 34px)
├── 副标题: 多行文字 (subtitle 17px)
├── InputRow: row 布局
│   ├── Ionicons link-outline (链接图标)
│   ├── TextInput (flex:1, 无边框)
│   └── Pressable "解析" (蓝色胶囊按钮)
└── TagsRow: row, gap 8
    └── PlatformTag ×3 (YouTube/Bilibili/Twitter/X)
```

关键技术点：
- 使用 `Pressable` 替代 `TouchableOpacity`（遵循 vercel-react-native-skills）
- 输入框使用 `TextInput`，placeholderTextColor 处理占位文字颜色
- CSS `boxShadow` 语法替代 RN legacy shadow 属性

### RecentCard — 最近解析卡片

```
Props: 无（空状态 MVP）
布局: 白色卡片, borderRadius 16, padding 25

子组件:
├── HeaderRow: row, space-between
│   ├── IconCircle: #E8F1FF 背景 + time-outline 图标
│   └── "刚刚" caption
├── "最近解析" cardTitle
└── 空状态文案 caption
```

关键技术点：
- `boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.06)'` CSS 语法
- 图标圆圈使用 `borderCurve: 'continuous'`

### FeatureCard — 高级功能卡片

```
Props: onPressLearnMore?: () => void
布局: 渐变背景卡片, borderRadius 16, overflow hidden

子组件:
├── BlurOverlay: 绝对定位半透明圆 (装饰性)
└── Content (relative)
    ├── IconCircle: 白色圆 + sparkles 图标
    ├── "高级功能" cardTitle
    ├── 描述文字 caption
    └── LearnMoreButton: Pressable row
        ├── "了解更多" (primary 色)
        └── chevron-forward 图标
```

关键技术点：
- `experimental_backgroundImage: 'linear-gradient(152deg, ...)'` 实现渐变
- 装饰性 blur overlay 用半透明圆模拟（`rgba(0, 110, 243, 0.06)`）
- `overflow: 'hidden'` 确保装饰圆不溢出卡片

### 首页组装 (index.tsx)

```tsx
<ScrollView contentInsetAdjustmentBehavior="automatic">
  <HeaderBar />
  <HeroSection />
  <View style={{ gap: 16 }}>
    <RecentCard />
    <FeatureCard />
  </View>
</ScrollView>
```

关键点：
- `contentInsetAdjustmentBehavior="automatic"` 替代 SafeAreaView（vercel-react-native-skills 规范）
- 使用 `gap` 属性做区域间距，不使用 margin

## vercel-react-native-skills 规范遵循

| 规则 | 应用位置 |
|------|----------|
| `StyleSheet.create()` 所有样式 | 全部组件 |
| `Pressable` 替代 TouchableOpacity | HeroSection 解析按钮、FeatureCard 了解更多 |
| `borderCurve: 'continuous'` | 所有 borderRadius 元素 |
| `gap` 替代 margin | 首页区域间距、卡片内元素间距 |
| `experimental_backgroundImage` | HeaderBar 渐变圆形、FeatureCard 渐变背景 |
| CSS `boxShadow` 语法 | 输入框、卡片阴影 |
| `contentInsetAdjustmentBehavior` | 首页 ScrollView |
| 文本包裹 `<Text>` | 所有文字节点 |
| `expo-image` 用于图片 | 预留，当前使用 Ionicons 图标 |

## 验证方法

1. 启动开发服务器：`cd myfirst-app && npx expo start`
2. Web 预览：打开 `http://localhost:8081`
3. 检查项：
   - 所有文字内容完整渲染
   - 输入框可聚焦、可输入
   - 亮色/暗色模式切换正常
   - 底部 Tab 导航可切换页面
4. 已知差异：
   - Web 端底部导航栏显示在顶部（NativeTabs Web 行为）
   - 在原生 iOS/Android 上导航栏会正确显示在底部
   - 图标使用 Ionicons 系统图标，与 Figma 自定义图标有轻微视觉差异

# React Native 项目框架搭建计划

## Context

将 Vue 3 前端应用（frontend/）迁移为 React Native 应用（myfirst-app/）。当前 myfirst-app 是 Expo 默认模板，需要按照 [目录结构.md](docs/feature-docs/目录结构.md) 重新组织项目结构，并遵循 vercel-react-native-skills 规范。本次只搭建框架，不写页面和业务功能。

## 当前状态

- **myfirst-app/**: Expo SDK 54 + React 19.1 + expo-router 6，仅有默认的 `_layout.tsx` 和 `index.tsx`
- **vercel-react-native-skills**: 已安装到 `.agents/skills/`，但 myfirst-app 内无 `.agents` 目录
- **目标目录结构**: 参照 `docs/feature-docs/目录结构.md`

## 实施步骤

### Step 1: 创建目录结构

按目标结构创建以下目录（仅目录，不含业务代码）：

```
myfirst-app/
├── app/                    # expo-router 文件路由
│   ├── (tabs)/             # 底部标签导航组
│   │   └── _layout.tsx     # Tab 布局占位
│   ├── _layout.tsx         # 根布局（已有，改造）
│   └── index.tsx           # 首页占位（已有，改造）
├── src/
│   ├── components/
│   │   ├── ui/             # 原子组件占位
│   │   └── business/       # 业务组件占位
│   ├── features/           # 功能模块（auth/post/profile 等）
│   ├── hooks/              # 全局 hooks
│   ├── stores/             # Zustand 状态管理
│   ├── utils/              # 工具函数
│   ├── constants/          # 静态常量
│   ├── theme/              # 主题配置
│   └── types/              # TypeScript 类型声明
├── assets/                 # 静态资源（已有）
├── config/                 # 第三方服务配置
├── .agents/skills/         # skills（symlink 或复制）
```

### Step 2: 安装核心依赖

```bash
# 状态管理
npx expo install zustand

# 网络请求
npx expo install axios

# UI 相关
npx expo install react-native-bottom-tabs
npx expo install @gorhom/bottom-sheet
npx expo install expo-image

# 存储
npx expo install @react-native-async-storage/async-storage

# 文件处理
npx expo install expo-file-system expo-sharing expo-clipboard
```

### Step 3: 配置 tsconfig.json 路径别名

更新 tsconfig.json，确保 `@/*` 路径别名指向项目根目录（已有配置，验证即可）。

### Step 4: 创建 src/ 下的占位文件

每个目录创建 `index.ts` 导出文件，便于后续模块化开发：

- `src/components/ui/index.ts`
- `src/components/business/index.ts`
- `src/hooks/index.ts`
- `src/stores/index.ts`
- `src/utils/index.ts`
- `src/constants/index.ts`
- `src/theme/index.ts`
- `src/types/index.ts`

### Step 5: 创建 theme 基础文件

按 vercel-react-native-skills 的 `ui-styling` 规范：

- `src/theme/colors.ts` — 颜色 token
- `src/theme/typography.ts` — 字体配置
- `src/theme/index.ts` — 统一导出

### Step 6: 改造根布局

改造 `app/_layout.tsx`，按 vercel-react-native-skills 的 `navigation-native-navigators` 规范使用 expo-router 原生导航。

### Step 7: 创建操作文档

在 `docs/feature-docs/` 下创建 React Native 项目搭建操作文档，记录：
- 项目结构说明
- 安装的依赖及用途
- vercel-react-native-skills 规范要点
- 后续开发指南

## 关键文件

| 文件 | 操作 |
|------|------|
| `myfirst-app/package.json` | 修改（添加依赖） |
| `myfirst-app/tsconfig.json` | 验证（已有路径别名） |
| `myfirst-app/app/_layout.tsx` | 改造（根布局） |
| `myfirst-app/app/(tabs)/_layout.tsx` | 新建（Tab 布局占位） |
| `myfirst-app/src/**` | 新建（目录结构 + 占位文件） |
| `myfirst-app/config/` | 新建（配置目录） |
| `docs/feature-docs/react-native-setup.md` | 新建（操作文档） |

## vercel-react-native-skills 规范要点

1. **导航**: 使用 expo-router 原生导航（native stack + native tabs）
2. **样式**: 使用 `StyleSheet.create`，`borderCurve: 'continuous'`，`gap` 代替 margin
3. **组件**: 使用 compound components 模式（Button + ButtonText + ButtonIcon）
4. **状态**: 最小化状态变量，派生值在渲染时计算
5. **导入**: 从 design system folder 导入，不直接从 react-native 导入

## 验证方式

1. `npx expo start` 能正常启动
2. 目录结构与目标一致
3. TypeScript 编译无错误
4. 导入路径别名正常工作

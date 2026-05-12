# React Native (Expo) 项目框架搭建文档

## 项目概述

将 Vue 3 前端应用迁移为 React Native 移动应用，基于 Expo SDK 54 + React 19.1 + TypeScript。

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Expo | SDK 54 |
| 导航 | expo-router | 6.x |
| 状态管理 | Zustand | 最新 |
| 网络请求 | Axios | 最新 |
| UI 图片 | expo-image | 最新 |
| 存储 | AsyncStorage | 最新 |
| 文件系统 | expo-file-system | 最新 |
| 分享 | expo-sharing | 最新 |
| 剪贴板 | expo-clipboard | 最新 |
| 底部弹窗 | @gorhom/bottom-sheet | 最新 |

## 目录结构

```
myfirst-app/
├── app/                          # expo-router 文件路由
│   ├── (tabs)/                   # 底部标签导航组
│   │   ├── _layout.tsx           # Tab 布局配置
│   │   └── index.tsx             # 首页
│   ├── _layout.tsx               # 根布局（全局 Provider）
│   └── index.tsx                 # 入口重定向
├── src/                          # 业务代码
│   ├── components/               # 可复用 UI 组件
│   │   ├── ui/                   # 原子组件（Button, Card, Input）
│   │   └── business/             # 业务组件（UserCard, PostItem）
│   ├── features/                 # 按功能拆分的模块
│   ├── hooks/                    # 全局复用 Hooks
│   ├── stores/                   # Zustand 状态管理
│   ├── utils/                    # 纯函数工具
│   ├── constants/                # 静态常量
│   ├── theme/                    # 主题、颜色、字体
│   └── types/                    # TypeScript 全局类型声明
├── assets/                       # 静态资源（图片、字体）
├── config/                       # 第三方服务配置
├── .agents/skills/               # vercel-react-native-skills 规范
├── app.json                      # Expo 核心配置
├── tsconfig.json                 # TypeScript 配置
└── package.json                  # 项目依赖
```

## 已安装依赖说明

| 包名 | 用途 |
|------|------|
| `zustand` | 轻量级状态管理，替代 Redux |
| `axios` | HTTP 客户端，处理 API 请求 |
| `expo-image` | 高性能图片组件，替代 Image |
| `@react-native-async-storage/async-storage` | 本地存储，替代 localStorage |
| `expo-file-system` | 文件系统操作，支持下载进度 |
| `expo-sharing` | 系统分享对话框 |
| `expo-clipboard` | 剪贴板操作 |
| `@gorhom/bottom-sheet` | 底部弹窗组件 |

## vercel-react-native-skills 规范要点

### 1. 导航规范
- 使用 expo-router 原生导航（native stack + native tabs）
- 避免 JS-based 导航器

### 2. 样式规范
- 使用 `StyleSheet.create` 定义样式
- 使用 `borderCurve: 'continuous'` 实现平滑圆角
- 使用 `gap` 代替 margin 做间距
- 使用 `boxShadow` CSS 语法代替 legacy shadow

### 3. 组件规范
- 使用 Compound Components 模式（Button + ButtonText + ButtonIcon）
- 使用 `Pressable` 代替 `TouchableOpacity`
- 使用 `expo-image` 代替 `Image`

### 4. 状态规范
- 最小化状态变量数量
- 派生值在渲染时计算，不存入 state
- State 代表真实状态，不是视觉输出

### 5. 导入规范
- 从 `@/src/theme` 导入主题配置
- 从 `@/src/components` 导入组件
- 避免直接从 `react-native` 导入基础组件

## 后续开发指南

### 添加新页面
1. 在 `app/` 目录下创建新的 `.tsx` 文件
2. 使用 `Stack.Screen` 配置页面选项
3. 页面组件使用 `@/src/` 下的模块

### 添加新组件
1. 原子组件放在 `src/components/ui/`
2. 业务组件放在 `src/components/business/`
3. 在对应 `index.ts` 中导出

### 添加新功能模块
1. 在 `src/features/` 下创建功能目录
2. 包含 `api.ts`、`hooks.ts`、`components/` 子目录
3. 在 `src/features/index.ts` 中导出

### 添加新状态管理
1. 在 `src/stores/` 下创建 Zustand store
2. 使用 `create` 函数定义 store
3. 在 `src/stores/index.ts` 中导出

## 验证方式

1. 运行 `npx expo start` 确认项目正常启动
2. 检查 TypeScript 编译无错误
3. 验证 `@/*` 路径别名正常工作
4. 确认 Tab 导航正常切换

## 参考文档

- [Expo Router 文档](https://docs.expo.dev/router/introduction/)
- [Zustand 文档](https://zustand-demo.pmnd.rs/)
- [vercel-react-native-skills](https://skills.sh/vercel-labs/agent-skills/vercel-react-native-skills)

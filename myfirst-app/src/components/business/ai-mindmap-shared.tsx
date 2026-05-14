/**
 * 思维导图 — 共享代码（Toolbar、mock 数据、样式）
 */

import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'

// ──────────────────────────────────────
// Mock 数据
// ──────────────────────────────────────

export const MOCK_MINDMAP_MARKDOWN = `# 苹果 WWDC 2024 重点回顾

## iOS 18 新特性
### 自定义锁屏
- 新增小组件排列方式
- 锁屏快捷操作自定义
### 控制中心改版
- 全新模块化设计
- 支持多页控制中心
### 信息应用升级
- RCS 消息支持
- 定时发送功能

## Apple Intelligence
### Siri 全新升级
- 屏幕感知能力
- 跨应用操作
- 自然语言理解增强
### 系统级 AI 功能
- 智能写作工具
- 图像生成 (Image Playground)
- 通知摘要

## macOS Sequoia
### iPhone 镜像
- 直接在 Mac 上操作 iPhone
- 通知同步显示
### Safari 升级
- Highlights 智能高亮
- 改进的阅读器模式

## watchOS 11
### 健康监测
- 训练负荷分析
- 睡眠呼吸暂停检测
### 表盘自定义
- 新增智能叠放
`

// ──────────────────────────────────────
// Toolbar
// ──────────────────────────────────────

export interface ToolbarProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}

export const Toolbar = React.memo(function Toolbar({ onZoomIn, onZoomOut, onReset }: ToolbarProps) {
  const textColor = useThemeColor({}, 'text')

  return (
    <View style={styles.toolbar}>
      <Pressable style={styles.toolButton} onPress={onZoomOut}>
        <Ionicons name="remove" size={16} color={textColor} />
      </Pressable>
      <Pressable style={styles.toolButton} onPress={onReset}>
        <Ionicons name="refresh-outline" size={16} color={textColor} />
      </Pressable>
      <Pressable style={styles.toolButton} onPress={onZoomIn}>
        <Ionicons name="add" size={16} color={textColor} />
      </Pressable>
    </View>
  )
})

// ──────────────────────────────────────
// 样式
// ──────────────────────────────────────

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: 'rgba(193,198,215,0.2)',
    padding: 16,
    gap: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.04)',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  toolButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderCurve: 'continuous',
    backgroundColor: '#F2F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: 'rgba(250,249,255,0.5)',
    borderRadius: 8,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderCurve: 'continuous' as const,
    backgroundColor: '#E8F1FF',
  },
  retryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0057c2',
  },
})

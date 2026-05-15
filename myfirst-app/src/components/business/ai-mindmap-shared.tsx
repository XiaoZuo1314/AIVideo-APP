/**
 * 思维导图 — 共享代码（Toolbar、样式）
 */

import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'

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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
})

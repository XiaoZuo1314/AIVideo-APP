/**
 * 关于页 - 占位文件
 * 后续实现使用教程 + 对比 + 平台展示
 */

import { StyleSheet } from 'react-native'
import { ThemedView } from '@/src/components/ui/themed-view'
import { ThemedText } from '@/src/components/ui/themed-text'

export default function AboutScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">关于我们</ThemedText>
      <ThemedText type="secondary">后续实现使用教程 + 对比表格 + 平台展示</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
})

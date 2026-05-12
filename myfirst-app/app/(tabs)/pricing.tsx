/**
 * 定价页 - 占位文件
 * 后续实现 PricingCards 组件
 */

import { StyleSheet } from 'react-native'
import { ThemedView } from '@/src/components/ui/themed-view'
import { ThemedText } from '@/src/components/ui/themed-text'

export default function PricingScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">定价方案</ThemedText>
      <ThemedText type="secondary">后续实现 PricingCards 组件</ThemedText>
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

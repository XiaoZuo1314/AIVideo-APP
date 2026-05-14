/**
 * 菜单分区 - 标题 + 卡片容器
 */

import { View, Text, StyleSheet } from 'react-native'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import type { ReactNode } from 'react'

interface MenuSectionProps {
  title: string
  children: ReactNode
}

export function MenuSection({ title, children }: MenuSectionProps) {
  const textSecondary = useThemeColor({}, 'textSecondary')
  const borderColor = useThemeColor({}, 'border')
  const bgColor = useThemeColor({}, 'background')

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: textSecondary }]}>{title}</Text>
      <View style={[styles.card, { borderColor, backgroundColor: bgColor }]}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  heading: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 13,
    letterSpacing: 0.65,
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 12,
    borderCurve: 'continuous' as const,
    borderWidth: 1,
    overflow: 'hidden',
    boxShadow: '0px 4px 10.5px rgba(0, 0, 0, 0.02)',
  },
})

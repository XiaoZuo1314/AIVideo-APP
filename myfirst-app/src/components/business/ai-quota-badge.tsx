/**
 * AI 配额药丸标签 — sparkles 图标 + 剩余次数
 */

import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'

interface AiQuotaBadgeProps {
  remaining: number
}

export function AiQuotaBadge({ remaining }: AiQuotaBadgeProps) {
  const primaryColor = useThemeColor({}, 'primary')

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Ionicons name="sparkles" size={16} color={primaryColor} />
        <Text style={styles.text}>今日剩余 {remaining} 次</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    borderCurve: 'continuous',
    backgroundColor: '#F2F3FF',
    borderWidth: 1,
    borderColor: 'rgba(193,198,215,0.5)',
  },
  text: {
    fontSize: 13,
    fontWeight: '500',
    color: '#414755',
  },
})

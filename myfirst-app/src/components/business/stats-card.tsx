/**
 * 统计卡片 - 显示下载次数/摘要次数等
 */

import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { typography } from '@/src/theme'

interface StatsCardProps {
  value: string | number
  label: string
  iconName: keyof typeof Ionicons.glyphMap
}

export function StatsCard({ value, label, iconName }: StatsCardProps) {
  const primaryColor = useThemeColor({}, 'primary')
  const profileText = useThemeColor({}, 'profileText')
  const textSecondary = useThemeColor({}, 'textSecondary')
  const borderColor = useThemeColor({}, 'border')
  const bgColor = useThemeColor({}, 'background')

  return (
    <View style={[styles.card, { borderColor, backgroundColor: bgColor }]}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={20} color={primaryColor} />
      </View>
      <Text style={[typography.statsNumber, { color: profileText }]}>{value}</Text>
      <Text style={[styles.label, { color: textSecondary }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 12,
    borderCurve: 'continuous' as const,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: '0px 4px 10.5px rgba(0, 0, 0, 0.02)',
  },
  iconContainer: {
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 13,
  },
})

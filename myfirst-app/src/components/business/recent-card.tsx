/**
 * 最近解析卡片 - 展示历史记录（空状态）
 */

import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { typography } from '@/src/theme'

export function RecentCard() {
  const textColor = useThemeColor({}, 'text')
  const secondaryColor = useThemeColor({}, 'textSecondary')
  const bgColor = useThemeColor({}, 'background')
  const borderColor = useThemeColor({}, 'border')
  const primaryColor = useThemeColor({}, 'primary')

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: bgColor,
          borderColor,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: '#E8F1FF' },
          ]}
        >
          <Ionicons name="time-outline" size={18} color={primaryColor} />
        </View>
        <Text style={[typography.caption, { color: secondaryColor }]}>
          刚刚
        </Text>
      </View>
      <Text style={[typography.cardTitle, { color: textColor }]}>
        最近解析
      </Text>
      <Text style={[typography.caption, { color: secondaryColor }]}>
        您还没有任何解析记录。{'\n'}粘贴链接开始您的第一次下载。
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderCurve: 'continuous',
    borderWidth: 1,
    padding: 25,
    gap: 4,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.06)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

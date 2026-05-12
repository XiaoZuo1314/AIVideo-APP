/**
 * 高级功能卡片 - 渐变背景 + "了解更多" 引导
 */

import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { typography } from '@/src/theme'
import { Colors } from '@/src/theme'
import { useColorScheme } from '@/src/hooks/use-color-scheme'

interface FeatureCardProps {
  onPressLearnMore?: () => void
}

export function FeatureCard({ onPressLearnMore }: FeatureCardProps) {
  const scheme = useColorScheme() ?? 'light'
  const theme = Colors[scheme]
  const textColor = useThemeColor({}, 'text')
  const secondaryColor = useThemeColor({}, 'textSecondary')
  const primaryColor = useThemeColor({}, 'primary')

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: 'rgba(0,87,194,0.2)',
          experimental_backgroundImage: `linear-gradient(152deg, ${theme.gradientStart}, ${theme.background})`,
        },
      ]}
    >
      <View style={styles.blurOverlay} />

      <View style={styles.content}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: '#FFFFFF', borderColor: theme.border },
          ]}
        >
          <Ionicons name="sparkles" size={18} color={primaryColor} />
        </View>

        <Text style={[typography.cardTitle, { color: textColor }]}>
          高级功能
        </Text>

        <Text style={[typography.caption, { color: secondaryColor }]}>
          解锁 4K 画质下载与批量处理功能。
        </Text>

        <Pressable
          style={styles.learnMoreButton}
          onPress={onPressLearnMore}
        >
          <Text style={[styles.learnMoreText, { color: primaryColor }]}>
            了解更多
          </Text>
          <Ionicons name="chevron-forward" size={14} color={primaryColor} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderCurve: 'continuous',
    borderWidth: 1,
    padding: 25,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
  },
  blurOverlay: {
    position: 'absolute',
    top: -24,
    right: -24,
    width: 128,
    height: 128,
    borderRadius: 64,
    borderCurve: 'continuous',
    backgroundColor: 'rgba(0, 110, 243, 0.06)',
  },
  content: {
    gap: 4,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.05)',
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 12,
  },
  learnMoreText: {
    fontSize: 13,
    fontWeight: '600',
  },
})

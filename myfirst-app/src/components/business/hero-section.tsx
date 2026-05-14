/**
 * 英雄区 - AI 徽章 + 标题 + 输入框 + 平台标签
 */

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { Colors, typography } from '@/src/theme'
import { useColorScheme } from '@/src/hooks/use-color-scheme'

const PLATFORMS = ['YouTube', 'Bilibili', 'Twitter/X']

interface HeroSectionProps {
  onParsePress?: () => void
}

export function HeroSection({ onParsePress }: HeroSectionProps) {
  const scheme = useColorScheme() ?? 'light'
  const theme = Colors[scheme]
  const textColor = useThemeColor({}, 'text')
  const secondaryColor = useThemeColor({}, 'textSecondary')
  const mutedColor = useThemeColor({}, 'textMuted')
  const primaryColor = useThemeColor({}, 'primary')
  const bgColor = useThemeColor({}, 'background')

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <View
          style={[
            styles.badgeDot,
            { backgroundColor: primaryColor },
          ]}
        />
        <Text style={[styles.badgeText, { color: primaryColor }]}>
          AI 智能加持
        </Text>
      </View>

      <Text style={[typography.heroTitle, { color: textColor }]}>
        下载任意视频
      </Text>

      <Text style={[typography.subtitle, { color: secondaryColor, textAlign: 'center' }]}>
        粘贴链接，即可获取高清无水印视频。{'\n'}支持主流平台。
      </Text>

      <View style={[styles.inputRow, { backgroundColor: bgColor, borderColor: theme.border }]}>
        <Ionicons name="link-outline" size={20} color={mutedColor} />
        <TextInput
          style={styles.input}
          placeholder="粘贴视频链接在此..."
          placeholderTextColor={mutedColor}
        />
        <Pressable
          style={[styles.parseButton, { backgroundColor: primaryColor }]}
          onPress={onParsePress}
        >
          <Text style={styles.parseButtonText}>解析</Text>
        </Pressable>
      </View>

      <View style={styles.tagsRow}>
        {PLATFORMS.map((platform) => (
          <View
            key={platform}
            style={[
              styles.tag,
              {
                backgroundColor: theme.tagBackground,
                borderColor: theme.tagBorder,
              },
            ]}
          >
            <Text style={[typography.tag, { color: secondaryColor }]}>
              {platform}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
    paddingTop: 24,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    borderCurve: 'continuous',
    backgroundColor: '#E8F1FF',
    borderWidth: 1,
    borderColor: 'rgba(0,87,194,0.1)',
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 8,
    gap: 8,
    width: '100%',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.04)',
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  parseButton: {
    borderRadius: 28,
    borderCurve: 'continuous',
    paddingHorizontal: 24,
    paddingVertical: 13,
    boxShadow: '0px 4px 6px rgba(0, 99, 235, 0.2)',
  },
  parseButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 20,
    borderCurve: 'continuous',
    borderWidth: 1,
  },
})

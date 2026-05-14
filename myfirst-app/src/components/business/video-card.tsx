/**
 * 视频信息卡片 - 缩略图 + 标题 + 元信息
 */

import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { typography } from '@/src/theme'

interface VideoCardProps {
  title: string
  platform: string
  views: string
  date: string
  duration: string
}

export function VideoCard({
  title,
  platform,
  views,
  date,
  duration,
}: VideoCardProps) {
  const textColor = useThemeColor({}, 'text')
  const secondaryColor = useThemeColor({}, 'textSecondary')
  const bgColor = useThemeColor({}, 'background')
  const borderColor = useThemeColor({}, 'border')

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: bgColor, borderColor },
      ]}
    >
      <View style={styles.thumbnail}>
        <View style={styles.thumbnailPlaceholder} />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{duration}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={[typography.cardTitle, { color: textColor }]}>
          {title}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="globe-outline" size={12} color={secondaryColor} />
            <Text style={[typography.caption, { color: secondaryColor }]}>
              {platform}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="play-outline" size={12} color={secondaryColor} />
            <Text style={[typography.caption, { color: secondaryColor }]}>
              {views}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={12} color={secondaryColor} />
            <Text style={[typography.caption, { color: secondaryColor }]}>
              {date}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
  },
  thumbnail: {
    height: 196,
    backgroundColor: '#e0e2ed',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  thumbnailPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e0e2ed',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(45, 48, 57, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderCurve: 'continuous',
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  details: {
    padding: 24,
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
})

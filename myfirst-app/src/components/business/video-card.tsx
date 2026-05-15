/**
 * 视频信息卡片 - 缩略图 + 标题 + 元信息
 */

import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { typography } from '@/src/theme'
import { getBaseUrl } from '@/src/api/client'

interface VideoCardProps {
  title: string
  thumbnail: string
  platform: string
  uploader: string
  duration: string
  viewCount: number
}

function formatViewCount(count: number): string {
  if (count >= 10000) {
    const wan = count / 10000
    return wan >= 1000
      ? `${(wan / 10000).toFixed(1)}亿`
      : `${wan.toFixed(1)}万`
  }
  return String(count)
}

export function VideoCard({
  title,
  thumbnail,
  platform,
  uploader,
  duration,
  viewCount,
}: VideoCardProps) {
  const textColor = useThemeColor({}, 'text')
  const secondaryColor = useThemeColor({}, 'textSecondary')
  const bgColor = useThemeColor({}, 'background')
  const borderColor = useThemeColor({}, 'border')

  const proxyUrl = thumbnail
    ? `${getBaseUrl()}/api/proxy/thumbnail?url=${encodeURIComponent(thumbnail)}`
    : undefined

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: bgColor, borderColor },
      ]}
    >
      <View style={styles.thumbnail}>
        {proxyUrl ? (
          <Image
            source={{ uri: proxyUrl }}
            style={styles.thumbnailImage}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={styles.thumbnailPlaceholder} />
        )}
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{duration}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={[typography.cardTitle, { color: textColor }]} numberOfLines={2}>
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
            <Ionicons name="person-outline" size={12} color={secondaryColor} />
            <Text style={[typography.caption, { color: secondaryColor }]} numberOfLines={1}>
              {uploader}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="play-outline" size={12} color={secondaryColor} />
            <Text style={[typography.caption, { color: secondaryColor }]}>
              {formatViewCount(viewCount)}
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
  thumbnailImage: {
    ...StyleSheet.absoluteFillObject,
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
    flexShrink: 1,
  },
})

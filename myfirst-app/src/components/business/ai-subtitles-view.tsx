/**
 * 视频字幕视图 — 从 Store 读取字幕数据
 */

import { View, Text, StyleSheet } from 'react-native'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { useAiSummaryStore } from '@/src/stores'

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${m}:${String(s).padStart(2, '0')}`
}

export function AiSubtitlesView() {
  const primaryColor = useThemeColor({}, 'primary')
  const mutedColor = useThemeColor({}, 'textMuted')

  const subtitleData = useAiSummaryStore((s) => s.subtitleData)
  const segments = subtitleData?.segments ?? []

  if (!subtitleData || !subtitleData.has_subtitle) {
    return (
      <View style={styles.emptyCard}>
        <Text style={[styles.emptyText, { color: mutedColor }]}>
          该视频暂无可用字幕
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Subheader */}
      <View style={styles.subheader}>
        <View style={styles.subheaderLeft}>
          <Text style={styles.subtitleCount}>共 {segments.length} 条字幕</Text>
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: primaryColor }]}>
              {subtitleData.subtitle_type === 'auto' ? '自动字幕' : '字幕'}
              {subtitleData.language ? ` · ${subtitleData.language}` : ''}
            </Text>
          </View>
        </View>
      </View>

      {/* Transcript List */}
      <View style={styles.list}>
        {segments.map((item, i) => (
          <View key={i} style={styles.transcriptItem}>
            <View style={styles.timeContainer}>
              <Text style={[styles.timeText, { color: primaryColor }]}>
                {formatTime(item.start)}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.transcriptText}>{item.text}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 0,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '500',
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193,198,215,0.2)',
    backgroundColor: '#FFFFFF',
  },
  subheaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  subtitleCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#414755',
  },
  badge: {
    backgroundColor: '#E8F1FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    borderCurve: 'continuous',
  },
  badgeText: {
    fontSize: 12,
  },
  list: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    gap: 24,
  },
  transcriptItem: {
    flexDirection: 'row',
    gap: 16,
  },
  timeContainer: {
    width: 64,
    paddingTop: 4,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'JetBrains Mono',
  },
  textContainer: {
    flex: 1,
  },
  transcriptText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 24,
    color: '#374151',
  },
})

/**
 * 视频字幕视图 — 字幕列表 + 下载按钮
 */

import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'

const MOCK_SUBTITLES = [
  { time: '0:04', text: '不愧是首都啊' },
  { time: '0:05', text: '兄弟们连酒店都这么有皇家特色' },
  { time: '0:09', text: '今天的穿搭呢是都市商务风' },
  { time: '0:22', text: '家人们' },
  { time: '0:23', text: '我改装的第一辆车居然上北京车展了' },
  { time: '0:26', text: '而且特别多人喜欢他' },
  { time: '0:30', text: '朋友们想知道这个车原本是什么样的吗' },
  { time: '0:34', text: '那我们把时间倒回几天前的素车版' },
  { time: '0:40', text: '作为我的第一辆改装车呢' },
  { time: '0:41', text: '我选择的就是这一台蔚来萤火虫' },
  { time: '0:44', text: '它是一台温柔治愈的城市精品小车' },
  { time: '0:48', text: '这次的改装呢我不打算去改它的动力' },
]

interface AiSubtitlesViewProps {
  onDownloadPress?: () => void
}

export function AiSubtitlesView({ onDownloadPress }: AiSubtitlesViewProps) {
  const primaryColor = useThemeColor({}, 'primary')

  return (
    <View style={styles.container}>
      {/* Subheader */}
      <View style={styles.subheader}>
        <View style={styles.subheaderLeft}>
          <Text style={styles.subtitleCount}>共 92 条字幕</Text>
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: primaryColor }]}>
              自动字幕 · ai-zh
            </Text>
          </View>
        </View>
        {/* <Pressable style={styles.downloadBtn} onPress={onDownloadPress}>
          <Ionicons name="download-outline" size={12} color={primaryColor} />
          <Text style={[styles.downloadBtnText, { color: primaryColor }]}>
            下载字幕
          </Text>
          <Ionicons name="chevron-forward" size={8} color={primaryColor} />
        </Pressable> */}
      </View>

      {/* Transcript List */}
      <View style={styles.list}>
        {MOCK_SUBTITLES.map((item, i) => (
          <View key={i} style={styles.transcriptItem}>
            <View style={styles.timeContainer}>
              <Text style={[styles.timeText, { color: primaryColor }]}>
                {item.time}
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
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  downloadBtnText: {
    fontSize: 14,
    fontWeight: '500',
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

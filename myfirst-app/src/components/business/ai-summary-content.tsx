/**
 * AI 摘要内容 — 从 Store 读取流式摘要文本
 */

import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Markdown from 'react-native-markdown-display'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { useAiSummaryStore } from '@/src/stores'

export function AiSummaryContent() {
  const textColor = useThemeColor({}, 'text')
  const primaryColor = useThemeColor({}, 'primary')
  const mutedColor = useThemeColor({}, 'textMuted')

  const summaryText = useAiSummaryStore((s) => s.summaryText)
  const isSummarizing = useAiSummaryStore((s) => s.isSummarizing)

  if (!summaryText && !isSummarizing) {
    return (
      <View style={styles.emptyCard}>
        <Text style={[styles.emptyText, { color: mutedColor }]}>
          暂无摘要内容
        </Text>
      </View>
    )
  }

  if (!summaryText && isSummarizing) {
    return (
      <View style={styles.emptyCard}>
        <ActivityIndicator size="small" color={primaryColor} />
        <Text style={[styles.emptyText, { color: mutedColor }]}>
          AI 正在分析视频内容...
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.card}>
      <Markdown
        style={{
          ...mdStyles,
          heading2: { ...mdStyles.heading2, color: textColor },
          heading3: { ...mdStyles.heading3, color: primaryColor },
          listUnorderedBullet: {
            ...mdStyles.listUnorderedBullet,
            color: primaryColor,
          },
        }}
      >
        {summaryText}
      </Markdown>
      {isSummarizing ? (
        <View style={styles.generatingRow}>
          <ActivityIndicator size="small" color={primaryColor} />
          <Text style={[styles.generatingText, { color: mutedColor }]}>
            AI 正在生成中...
          </Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 24,
    gap: 12,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 48,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '500',
  },
  generatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
  },
  generatingText: {
    fontSize: 13,
    fontWeight: '500',
  },
})

const mdStyles = StyleSheet.create({
  body: { fontSize: 15, fontWeight: '500', lineHeight: 24, color: '#374151' },
  heading2: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 4,
  },
  heading3: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    marginTop: 0,
    marginBottom: 4,
  },
  bulletList: { gap: 12 },
  bulletItem: { flexDirection: 'row', gap: 12 },
  bulletContent: { flex: 1 },
  hr: { backgroundColor: '#E5E7EB', height: 1, marginVertical: 12 },
  strong: { fontWeight: '600', color: '#374151' },
  paragraph: { marginTop: 0, marginBottom: 8 },
  listUnorderedItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listUnorderedContent: { flex: 1 },
  listUnorderedBullet: {
    fontSize: 15,
    lineHeight: 24,
    marginRight: 8,
  },
})

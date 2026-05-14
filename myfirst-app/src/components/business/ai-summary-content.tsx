/**
 * AI 摘要内容 — 核心观点 + 关键章节
 */

import { View, StyleSheet } from 'react-native'
import Markdown from 'react-native-markdown-display'
import { useThemeColor } from '@/src/hooks/use-theme-color'

const MOCK_MARKDOWN = `
## 核心观点

本次演讲主要探讨了人工智能在未来五年的发展趋势，特别强调了生成式AI在垂直领域的深度应用。讲者认为，未来的AI不仅是通用工具，更是具备行业专长的"数字专家"。

- **效率革命：** AI将使知识工作者的效率提升40%以上。
- **人机协同：** 未来的工作模式不是AI替代人类，而是"人类+AI"共同创造更大的价值。

---

## 关键章节

### 01. 技术演进路线

从大语言模型(LLM)到多模态模型(LMM)的跨越。视觉、听觉和文本的融合将打破现有的交互边界。

### 02. 行业落地挑战

数据隐私、模型可解释性和监管合规是AI在金融、医疗等行业落地的三大挑战。解决方案包括联邦学习和差分隐私技术。
`

export function AiSummaryContent() {
  const textColor = useThemeColor({}, 'text')
  const primaryColor = useThemeColor({}, 'primary')

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
        {MOCK_MARKDOWN}
      </Markdown>
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

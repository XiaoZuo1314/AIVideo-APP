/**
 * AI 摘要分析页 — 顶部 Tab 栏切换 4 个视图
 * 基于 .pen 设计稿实现
 */

import { useState } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { AiTabBar, type AiTab } from '@/src/components/business/ai-tab-bar'
import { AiQuotaBadge } from '@/src/components/business/ai-quota-badge'
import { AiSummaryContent } from '@/src/components/business/ai-summary-content'
import { AiSubtitlesView } from '@/src/components/business/ai-subtitles-view'
import { AiMindmapView } from '@/src/components/business/ai-mindmap-view'
import { AiChatView } from '@/src/components/business/ai-chat-view'
import { typography } from '@/src/theme'

const TAB_TITLES: Record<AiTab, string> = {
  summary: 'AI 摘要',
  subtitles: '视频字幕',
  mindmap: '思维导图',
  chat: 'AI 问答',
}

export default function AiSummaryScreen() {
  const [activeTab, setActiveTab] = useState<AiTab>('summary')
  const insets = useSafeAreaInsets()
  const textColor = useThemeColor({}, 'primary')
  const sectionBg = useThemeColor({}, 'backgroundSection')

  return (
    <View style={[styles.root, { paddingTop: insets.top, backgroundColor: sectionBg }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            borderBottomColor: 'rgba(193,198,215,0.3)',
          },
        ]}
      >
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={textColor} />
        </Pressable>
        <Text style={[typography.cardTitle, { color: textColor }]}>
          {TAB_TITLES[activeTab]}
        </Text>
        <View style={styles.headerRight} />
      </View>

      {activeTab === 'chat' || activeTab === 'mindmap' ? (
        <View style={styles.chatContainer}>
          <View style={styles.chatFixedArea}>
            <AiQuotaBadge remaining={3} />
            <AiTabBar activeTab={activeTab} onTabChange={setActiveTab} />
          </View>
          {activeTab === 'chat' ? <AiChatView /> : <AiMindmapView />}
        </View>
      ) : (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <AiQuotaBadge remaining={3} />
          <AiTabBar activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === 'summary' ? <AiSummaryContent /> : null}
          {activeTab === 'subtitles' ? <AiSubtitlesView /> : null}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  // headerTitle: {
  //   fontSize: 20,
  //   fontWeight: '600',
  //   lineHeight: 28,
  // },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    width: 32,
    height: 32,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 96,
    gap: 16,
  },
  chatContainer: {
    flex: 1,
  },
  chatFixedArea: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 16,
  },
  chatContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 16,
  },
})

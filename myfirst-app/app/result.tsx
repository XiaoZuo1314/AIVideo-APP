/**
 * 视频解析结果页 - 展示解析后的视频信息和下载选项
 * 基于 Figma 设计稿 node-id=1:411
 */

import { useState } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { typography } from '@/src/theme'
import { VideoCard } from '@/src/components/business/video-card'
import { FormatSelector, type FormatOption } from '@/src/components/business/format-selector'
import { ActionButtons } from '@/src/components/business/action-buttons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const MOCK_VIDEO = {
  title: '如何使用 AI 快速生成高质量 UI 设计稿 - 完整教程',
  platform: 'Bilibili',
  views: '12.5万 播放',
  date: '2024-05-20',
  duration: '3:42',
}

const FORMAT_OPTIONS: FormatOption[] = [
  { label: '1080p 高清', description: 'MP4 • 124 MB • 包含音频' },
  { label: '720p 标清', description: 'MP4 • 56 MB • 包含音频' },
  { label: '仅音频', description: 'M4A • 12 MB • 320kbps' },
]

export default function ResultScreen() {
  const [selectedFormat, setSelectedFormat] = useState(0)
  const sectionBg = useThemeColor({}, 'backgroundSection')
  const textColor = useThemeColor({}, 'primary')
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.root, { paddingTop: insets.top,backgroundColor: sectionBg }]}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={textColor} />
        </Pressable>
        <Text style={[typography.cardTitle, { color: textColor }]}>
          视频信息
        </Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <VideoCard
          title={MOCK_VIDEO.title}
          platform={MOCK_VIDEO.platform}
          views={MOCK_VIDEO.views}
          date={MOCK_VIDEO.date}
          duration={MOCK_VIDEO.duration}
        />

        <FormatSelector
          options={FORMAT_OPTIONS}
          selectedIndex={selectedFormat}
          onSelect={setSelectedFormat}
        />

        <ActionButtons onSummaryPress={() => router.push('/ai-summary')} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
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
    paddingTop: 0,
    paddingBottom: 96,
    gap: 15,
  },
})

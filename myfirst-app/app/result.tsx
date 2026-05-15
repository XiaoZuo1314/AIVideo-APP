/**
 * 视频解析结果页 - 展示解析后的视频信息和下载选项
 * 从路由参数获取视频数据
 */

import { useState, useMemo } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { typography } from '@/src/theme'
import { VideoCard } from '@/src/components/business/video-card'
import { FormatSelector, type FormatOption } from '@/src/components/business/format-selector'
import { ActionButtons } from '@/src/components/business/action-buttons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function formatFileSize(bytes: number): string {
  if (bytes >= 1073741824) {
    return `${(bytes / 1073741824).toFixed(1)} GB`
  }
  if (bytes >= 1048576) {
    return `${(bytes / 1048576).toFixed(0)} MB`
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`
  }
  return `${bytes} B`
}

export default function ResultScreen() {
  const [selectedFormat, setSelectedFormat] = useState(0)
  const sectionBg = useThemeColor({}, 'backgroundSection')
  const textColor = useThemeColor({}, 'primary')
  const insets = useSafeAreaInsets()

  const params = useLocalSearchParams<{
    url?: string
    title?: string
    thumbnail?: string
    platform?: string
    uploader?: string
    duration?: string
    viewCount?: string
    formats?: string
  }>()

  const videoUrl = params.url ?? ''
  const videoTitle = params.title ?? '视频解析结果'
  const thumbnail = params.thumbnail ?? ''
  const platform = params.platform ?? '未知平台'
  const uploader = params.uploader ?? '未知作者'
  const duration = params.duration ?? '0:00'
  const viewCount = Number(params.viewCount ?? '0')

  // 解析 formats JSON
  const formats = useMemo(() => {
    try {
      return params.formats ? JSON.parse(params.formats) as Array<{
        format_id: string
        label: string
        ext: string
        filesize: number
        has_audio: boolean
      }> : []
    } catch {
      return []
    }
  }, [params.formats])

  const formatOptions: FormatOption[] = useMemo(() => {
    if (formats.length === 0) {
      return [{ label: '默认格式', description: 'MP4 • 最佳画质' }]
    }
    return formats.map((f) => ({
      label: f.label,
      description: `${f.ext.toUpperCase()} • ${formatFileSize(f.filesize)}${f.has_audio ? ' • 包含音频' : ''}`,
    }))
  }, [formats])

  const handleSummaryPress = () => {
    if (videoUrl) {
      router.push({ pathname: '/ai-summary', params: { url: videoUrl } })
    }
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top, backgroundColor: sectionBg }]}>
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
          title={videoTitle}
          thumbnail={thumbnail}
          platform={platform}
          uploader={uploader}
          duration={duration}
          viewCount={viewCount}
        />

        <FormatSelector
          options={formatOptions}
          selectedIndex={selectedFormat}
          onSelect={setSelectedFormat}
        />

        <ActionButtons onSummaryPress={handleSummaryPress} />
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

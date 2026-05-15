/**
 * 首页 - SaveAny 主页面
 * 输入视频链接 → 解析 → 跳转结果页
 */

import { useState } from 'react'
import { ScrollView, View, StyleSheet, Alert } from 'react-native'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { apiFetch } from '@/src/api/client'
import {
  HeaderBar,
  HeroSection,
  RecentCard,
  FeatureCard,
} from '@/src/components/business'

const urlSchema = z.object({
  url: z
    .string()
    .min(1, '请输入视频链接')
    .refine(
      (val) => /^https?:\/\/.+/.test(val),
      { message: '请输入正确的链接格式' },
    ),
})

type UrlForm = z.infer<typeof urlSchema>

interface VideoFormat {
  format_id: string
  ext: string
  resolution: string
  height: number
  filesize: number
  filesize_approx: number
  vcodec: string
  acodec: string | null
  has_audio: boolean
  label: string
}

interface VideoData {
  id: string
  title: string
  thumbnail: string
  duration: number
  duration_string: string
  uploader: string
  platform: string
  view_count: number
  upload_date: string
  description: string
  formats: VideoFormat[]
  subtitles: unknown[]
  automatic_captions: unknown[]
}

interface ParseResponse {
  success: boolean
  data: VideoData
}

export default function HomeScreen() {
  const sectionBg = useThemeColor({}, 'backgroundSection')
  const [isParsing, setIsParsing] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm<UrlForm>({
    resolver: zodResolver(urlSchema),
    defaultValues: { url: '' },
  })

  const onSubmit = async (data: UrlForm) => {
    if (isParsing) return

    setIsParsing(true)
    try {
      const result = await apiFetch<ParseResponse>('/api/parse', {
        method: 'POST',
        body: JSON.stringify({ url: data.url }),
      })

      if (result.success && result.data) {
        const d = result.data
        router.push({
          pathname: '/result',
          params: {
            url: data.url,
            title: d.title ?? '',
            thumbnail: d.thumbnail ?? '',
            platform: d.platform ?? '',
            uploader: d.uploader ?? '',
            duration: d.duration_string ?? '',
            viewCount: String(d.view_count ?? 0),
            formats: JSON.stringify(d.formats ?? []),
          },
        })
      }
    } catch (err) {
      Alert.alert('解析失败', err instanceof Error ? err.message : '请检查链接是否正确')
    } finally {
      setIsParsing(false)
    }
  }

  return (
    <ScrollView
      style={{ backgroundColor: sectionBg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <HeaderBar />
      <HeroSection
        control={control}
        errors={errors}
        onParsePress={handleSubmit(onSubmit)}
        isParsing={isParsing}
      />
      <View style={styles.grid}>
        <RecentCard />
        <FeatureCard />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 24,
  },
  grid: {
    gap: 16,
  },
})

/**
 * 首页 - SaveAny 主页面
 * 基于 Figma 设计稿实现静态布局
 */

import { ScrollView, View, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import {
  HeaderBar,
  HeroSection,
  RecentCard,
  FeatureCard,
} from '@/src/components/business'

export default function HomeScreen() {
  const sectionBg = useThemeColor({}, 'backgroundSection')

  return (
    <ScrollView
      style={{ backgroundColor: sectionBg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <HeaderBar />
      <HeroSection onParsePress={() => router.push('/result')} />
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

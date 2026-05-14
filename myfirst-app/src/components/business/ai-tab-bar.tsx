/**
 * AI 功能页顶部 Tab 栏 — 摘要/字幕/思维导图/问答
 */

import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useThemeColor } from '@/src/hooks/use-theme-color'

export type AiTab = 'summary' | 'subtitles' | 'mindmap' | 'chat'

const TABS: { key: AiTab; label: string }[] = [
  { key: 'summary', label: '摘要' },
  { key: 'subtitles', label: '字幕' },
  { key: 'mindmap', label: '思维导图' },
  { key: 'chat', label: '问答' },
]

interface AiTabBarProps {
  activeTab: AiTab
  onTabChange: (tab: AiTab) => void
}

export function AiTabBar({ activeTab, onTabChange }: AiTabBarProps) {
  const primaryColor = useThemeColor({}, 'primary')
  const mutedColor = useThemeColor({}, 'textMuted')

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab
        return (
          <Pressable
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabChange(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: isActive ? primaryColor : mutedColor,
                  fontWeight: isActive ? '500' : '500',
                },
              ]}
            >
              {tab.label}
            </Text>
            {isActive ? (
              <View
                style={[
                  styles.indicator,
                  { backgroundColor: primaryColor },
                ]}
              />
            ) : null}
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 8,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 13,
    lineHeight: 13,
    textAlign: 'center',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    width: 26,
    height: 2,
    borderRadius: 9999,
    borderTopLeftRadius: 9999,
    borderTopRightRadius: 9999,
  },
})

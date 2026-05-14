/**
 * 操作按钮区域 - 下载视频 + AI 摘要
 */

import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'

interface ActionButtonsProps {
  onDownloadPress?: () => void
  onSummaryPress?: () => void
}

export function ActionButtons({
  onDownloadPress,
  onSummaryPress,
}: ActionButtonsProps) {
  const primaryColor = useThemeColor({}, 'primary')

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.downloadButton, { backgroundColor: primaryColor }]}
        onPress={onDownloadPress}
      >
        <Ionicons name="download" size={16} color="#FFFFFF" />
        <Text style={styles.downloadText}>下载视频</Text>
      </Pressable>

      <Pressable
        style={[styles.summaryButton, { borderColor: primaryColor }]}
        onPress={onSummaryPress}
      >
        <Ionicons name="sparkles" size={16} color={primaryColor} />
        <Text style={[styles.summaryText, { color: primaryColor }]}>
          AI 摘要
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingTop: 16,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: 24,
    borderCurve: 'continuous',
  },
  downloadText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
  },
  summaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: 24,
    borderCurve: 'continuous',
    borderWidth: 2,
  },
  summaryText: {
    fontSize: 17,
    fontWeight: '500',
  },
})

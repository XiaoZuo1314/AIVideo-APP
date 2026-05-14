/**
 * 登录页顶部导航栏 - 返回按钮 + SaveAny 品牌
 */

import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'

interface LoginHeaderProps {
  onBackPress: () => void
}

export function LoginHeader({ onBackPress }: LoginHeaderProps) {
  const brandColor = useThemeColor({}, 'loginBlue')

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={onBackPress}>
        <Ionicons name="chevron-back" size={16} color="#FFFFFF" />
      </Pressable>
      <Text style={[styles.brand, { color: brandColor }]}>SaveAny</Text>
      <View style={styles.rightPlaceholder} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderCurve: 'continuous' as const,
    alignItems: 'center',
    justifyContent: 'center',
    experimental_backgroundImage: 'linear-gradient(135deg, #1777FF, #1777FF)',
  },
  brand: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
  },
  rightPlaceholder: {
    width: 32,
    height: 32,
  },
})

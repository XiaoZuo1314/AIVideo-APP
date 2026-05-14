/**
 * 社交登录按钮 - Apple + 微信
 */

import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'

interface SocialLoginButtonsProps {
  onApplePress?: () => void
  onWeChatPress?: () => void
}

export function SocialLoginButtons({ onApplePress, onWeChatPress }: SocialLoginButtonsProps) {
  const borderColor = useThemeColor({}, 'border')
  const bgColor = useThemeColor({}, 'background')
  const textColor = useThemeColor({}, 'text')
  const socialGreen = useThemeColor({}, 'socialGreen')

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, { borderColor, backgroundColor: bgColor }]}
        onPress={onApplePress}
      >
        <Ionicons name="logo-apple" size={20} color={textColor} />
        <Text style={[styles.label, { color: textColor }]}>Apple</Text>
      </Pressable>
      <Pressable
        style={[styles.button, { borderColor, backgroundColor: bgColor }]}
        onPress={onWeChatPress}
      >
        <Ionicons name="chatbubbles" size={20} color={socialGreen} />
        <Text style={[styles.label, { color: textColor }]}>微信</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderCurve: 'continuous' as const,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
  },
})

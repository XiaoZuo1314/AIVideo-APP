/**
 * 主题感知 Text 组件
 * 根据当前亮色/暗色主题自动切换文字颜色
 */

import { Text, type TextProps, StyleSheet } from 'react-native'
import { useThemeColor } from '@/src/hooks/use-theme-color'

export type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?: 'default' | 'title' | 'subtitle' | 'secondary' | 'muted' | 'link'
}

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'secondary' ? styles.secondary : undefined,
        type === 'muted' ? styles.muted : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  secondary: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
  },
  muted: {
    fontSize: 14,
    lineHeight: 20,
    color: '#9CA3AF',
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    color: '#0057c2',
  },
})

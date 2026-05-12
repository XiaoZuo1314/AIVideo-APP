/**
 * 主题感知 View 组件
 * 根据当前亮色/暗色主题自动切换背景颜色
 */

import { View, type ViewProps } from 'react-native'
import { useThemeColor } from '@/src/hooks/use-theme-color'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}

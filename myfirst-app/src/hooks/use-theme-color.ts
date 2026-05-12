/**
 * 主题颜色 Hook
 * 根据当前亮色/暗色主题返回对应颜色
 */

import { Colors } from '@/src/theme'
import { useColorScheme } from '@/src/hooks/use-color-scheme'

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light'
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  }

  return Colors[theme][colorName]
}

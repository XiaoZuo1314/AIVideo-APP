/**
 * 菜单项 - 带图标、标签和右箭头
 */

import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'

interface MenuItemProps {
  label: string
  iconName: keyof typeof Ionicons.glyphMap
  iconBgColor: string
  iconColor?: string
  showBottomBorder?: boolean
  onPress?: () => void
}

export function MenuItem({
  label,
  iconName,
  iconBgColor,
  iconColor,
  showBottomBorder = false,
  onPress,
}: MenuItemProps) {
  const textColor = useThemeColor({}, 'text')
  const chevronColor = useThemeColor({}, 'menuChevron')
  const borderColor = useThemeColor({}, 'border')
  const primaryColor = useThemeColor({}, 'primary')

  return (
    <Pressable
      style={[styles.row, showBottomBorder ? { borderBottomWidth: 1, borderBottomColor: borderColor } : null]}
      onPress={onPress}
    >
      <View style={styles.left}>
        <View style={[styles.iconBg, { backgroundColor: iconBgColor }]}>
          <Ionicons name={iconName} size={18} color={iconColor ?? primaryColor} />
        </View>
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={12} color={chevronColor} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderCurve: 'continuous' as const,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 17,
    fontWeight: '500',
  },
})

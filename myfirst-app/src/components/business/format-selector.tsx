/**
 * 格式选择器 - 单选列表（radio 样式）
 */

import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { Colors, typography } from '@/src/theme'
import { useColorScheme } from '@/src/hooks/use-color-scheme'

export interface FormatOption {
  label: string
  description: string
}

interface FormatSelectorProps {
  options: FormatOption[]
  selectedIndex: number
  onSelect: (index: number) => void
}

export function FormatSelector({
  options,
  selectedIndex,
  onSelect,
}: FormatSelectorProps) {
  const scheme = useColorScheme() ?? 'light'
  const theme = Colors[scheme]
  const textColor = useThemeColor({}, 'text')
  const secondaryColor = useThemeColor({}, 'textSecondary')

  return (
    <View style={styles.section}>
      <Text style={[typography.cardTitle, { color: textColor }]}>
        选择格式
      </Text>
      <View style={styles.list}>
        {options.map((option, index) => {
          const isSelected = index === selectedIndex
          return (
            <Pressable
              key={option.label}
              style={[
                styles.option,
                {
                  backgroundColor: isSelected
                    ? theme.badgeBackground
                    : theme.background,
                  borderColor: isSelected
                    ? theme.primary
                    : theme.border,
                },
              ]}
              onPress={() => onSelect(index)}
            >
              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionLabel,
                    {
                      color: textColor,
                      fontWeight: isSelected ? '600' : '500',
                    },
                  ]}
                >
                  {option.label}
                </Text>
                <Text style={[typography.caption, { color: secondaryColor }]}>
                  {option.description}
                </Text>
              </View>
              <View
                style={[
                  styles.radioOuter,
                  {
                    borderColor: isSelected ? theme.primary : '#c1c6d7',
                  },
                ]}
              >
                {isSelected && (
                  <View
                    style={[
                      styles.radioInner,
                      { backgroundColor: theme.primary },
                    ]}
                  />
                )}
              </View>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  list: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 17,
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
    height: 83,
  },
  optionContent: {
    flex: 1,
    gap: 8,
  },
  optionLabel: {
    fontSize: 17,
    lineHeight: 25,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
})

/**
 * 表单输入框 - 带左侧图标和可选右侧操作按钮
 */

import { View, TextInput, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'

interface FormInputProps {
  placeholder: string
  iconName: keyof typeof Ionicons.glyphMap
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  rightIcon?: keyof typeof Ionicons.glyphMap
  onRightIconPress?: () => void
}

export function FormInput({
  placeholder,
  iconName,
  value,
  onChangeText,
  secureTextEntry,
  rightIcon,
  onRightIconPress,
}: FormInputProps) {
  const borderColor = useThemeColor({}, 'border')
  const bgColor = useThemeColor({}, 'background')
  const mutedColor = useThemeColor({}, 'textMuted')
  const textColor = useThemeColor({}, 'text')

  return (
    <View style={styles.container}>
      <View style={[styles.inputWrapper, { borderColor, backgroundColor: bgColor }]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder={placeholder}
          placeholderTextColor={mutedColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
      <View style={[styles.leftIcon, { justifyContent: 'center' }]}>
        <Ionicons name={iconName} size={20} color={mutedColor} />
      </View>
      {rightIcon ? (
        <Pressable style={[styles.rightIcon, { justifyContent: 'center' }]} onPress={onRightIconPress}>
          <Ionicons name={rightIcon} size={22} color={mutedColor} />
        </Pressable>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative' as const,
  },
  inputWrapper: {
    height: 52,
    borderRadius: 12,
    borderCurve: 'continuous' as const,
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 48,
    paddingRight: 48,
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
  },
  leftIcon: {
    position: 'absolute' as const,
    left: 16,
    top: 14,
    height: 24,
  },
  rightIcon: {
    position: 'absolute' as const,
    right: 16,
    top: 14,
    height: 24,
  },
})

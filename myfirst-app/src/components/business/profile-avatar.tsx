/**
 * 用户头像 - 渐变圆形头像
 */

import { View, Text, StyleSheet } from 'react-native'

interface ProfileAvatarProps {
  letter?: string
}

export function ProfileAvatar({ letter = 'U' }: ProfileAvatarProps) {
  return (
    <View style={styles.avatar}>
      <Text style={styles.letter}>{letter}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderCurve: 'continuous' as const,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    experimental_backgroundImage: 'linear-gradient(135deg, #0057C2, #B4C5FF)',
    boxShadow: '0px 4px 10.5px rgba(0, 0, 0, 0.06)',
  },
  letter: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 41,
  },
})

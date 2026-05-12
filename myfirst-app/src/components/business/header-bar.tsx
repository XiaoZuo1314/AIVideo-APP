/**
 * 顶部导航栏 - SaveAny 品牌栏
 */

import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { typography } from '@/src/theme'

export function HeaderBar() {
  const brandColor = useThemeColor({}, 'primary')

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Ionicons name="download" size={14} color="#FFFFFF" />
      </View>
      <Text style={[typography.brandTitle, { color: brandColor }]}>
        SaveAny
      </Text>
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
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
    experimental_backgroundImage:
      'linear-gradient(135deg, #006EF3, #316BF3)',
  },
  rightPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderCurve: 'continuous',
  },
})

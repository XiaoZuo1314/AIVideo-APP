/**
 * 设计 Token - 字体系统
 * 遵循 vercel-react-native-skills 规范：避免多种字号，用 weight 和 color 做层次
 */

import { StyleSheet } from 'react-native'

export const typography = StyleSheet.create({
  heroTitle: {
    fontSize: 34,
    fontWeight: '500',
    letterSpacing: -0.85,
    lineHeight: 44,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 25,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  tag: {
    fontSize: 12,
    fontWeight: '500',
  },
})

/**
 * 设计 Token - 颜色系统（亮色/暗色双主题）
 * 基于 Figma 设计稿 SaveAny 首页提取
 */

export const Colors = {
  light: {
    primary: '#0057c2',
    primaryDark: '#004a9e',
    primaryLight: '#E8F1FF',

    background: '#FFFFFF',
    backgroundSection: '#FAF9FF',

    text: '#1F1F1F',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',

    border: '#E5E7EB',
    borderLight: '#F3F4F6',

    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',

    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0057c2',

    badgeBackground: '#E8F1FF',
    badgeBorder: 'rgba(0,87,194,0.1)',

    tagBackground: '#F2F3FF',
    tagBorder: 'rgba(193,198,215,0.3)',

    gradientStart: '#E8F1FF',
  },
  dark: {
    primary: '#4DA3FF',
    primaryDark: '#0057c2',
    primaryLight: '#1A2A3A',

    background: '#151718',
    backgroundSection: '#1E2022',

    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    textMuted: '#6B7280',

    border: '#2E3032',
    borderLight: '#252729',

    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',

    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#4DA3FF',

    badgeBackground: '#1A2A3A',
    badgeBorder: 'rgba(0,87,194,0.2)',

    tagBackground: '#1A1F36',
    tagBorder: 'rgba(60,70,100,0.3)',

    gradientStart: '#1A2A3A',
  },
} as const

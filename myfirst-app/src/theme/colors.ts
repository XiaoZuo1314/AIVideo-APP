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

    chatBubbleAi: '#F2F3FF',
    chatBubbleUser: '#1777FF',
    aiAvatar: '#006EF3',

    loginBlue: '#1777FF',
    avatarGradientEnd: '#B4C5FF',
    profileText: '#181B23',
    menuIconBgBlue: 'rgba(217,226,255,0.3)',
    menuIconBgYellow: 'rgba(245,158,11,0.2)',
    menuIconBgGray: 'rgba(193,198,215,0.3)',
    menuChevron: '#C1C6D7',
    socialGreen: '#07C160',
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

    chatBubbleAi: '#1A1F36',
    chatBubbleUser: '#4DA3FF',
    aiAvatar: '#4DA3FF',

    loginBlue: '#4DA3FF',
    avatarGradientEnd: '#2A4A7F',
    profileText: '#ECEDEE',
    menuIconBgBlue: 'rgba(77,163,255,0.15)',
    menuIconBgYellow: 'rgba(251,191,36,0.15)',
    menuIconBgGray: 'rgba(60,70,100,0.3)',
    menuChevron: '#6B7280',
    socialGreen: '#07C160',
  },
} as const

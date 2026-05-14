/**
 * 个人中心页 - 用户资料 + 统计 + 菜单
 */

import { useEffect, useState } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator, Alert, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { HeaderBar, ProfileAvatar, StatsCard, MenuSection, MenuItem } from '@/src/components/business'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { typography } from '@/src/theme'
import { fetchMe, getToken } from '@/src/api/auth'
import { useAuthStore } from '@/src/stores'

export default function MyScreen() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const storeLogout = useAuthStore((s) => s.logout)

  const [loading, setLoading] = useState(!user)

  const profileText = useThemeColor({}, 'profileText')
  const textSecondary = useThemeColor({}, 'textSecondary')
  const menuIconBgBlue = useThemeColor({}, 'menuIconBgBlue')
  const menuIconBgYellow = useThemeColor({}, 'menuIconBgYellow')
  const menuIconBgGray = useThemeColor({}, 'menuIconBgGray')
  const errorColor = useThemeColor({}, 'error')

  useEffect(() => {
    if (user) return

    let cancelled = false
    setLoading(true)
    getToken().then((token) => {
      if (!token) {
        if (!cancelled) router.replace('/login')
        setLoading(false)
        return
      }
      fetchMe()
        .then((u) => {
          if (!cancelled) setUser(u)
        })
        .catch(() => {
          if (!cancelled) router.replace('/login')
        })
        .finally(() => {
          setLoading(false)
        })
    })
    return () => { cancelled = true }
  }, [user, setUser, router])

  const handleLogout = () => {
    const doLogout = async () => {
      await storeLogout()
      router.replace('/login')
    }

    if (Platform.OS === 'web') {
      if (window.confirm('确定要退出当前账号吗？')) doLogout()
      return
    }

    Alert.alert('退出登录', '确定要退出当前账号吗？', [
      { text: '取消', style: 'cancel' },
      { text: '退出', style: 'destructive', onPress: doLogout },
    ])
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  const displayName = user ? user.email.split('@')[0] : '账户'
  const avatarLetter = user ? user.email[0].toUpperCase() : 'U'

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
    >
      <View style={styles.content}>
        <HeaderBar />

        {/* Profile */}
        <View style={styles.profile}>
          <ProfileAvatar letter={avatarLetter} />
          <View style={styles.profileInfo}>
            <Text style={[typography.profileName, { color: profileText, textAlign: 'center' }]}>
              {displayName}
            </Text>
            <Text style={[styles.email, { color: textSecondary, textAlign: 'center' }]}>
              {user?.email ?? ''}
            </Text>
            {user?.is_vip ? (
              <View style={styles.vipBadge}>
                <Ionicons name="star" size={12} color="#FFFFFF" />
                <Text style={styles.vipText}>VIP</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatsCard value="128" label="下载次数" iconName="download-outline" />
          <StatsCard value="56" label="摘要次数" iconName="sparkles-outline" />
        </View>

        {/* Menu Sections */}
        <View style={styles.menuSections}>
          <MenuSection title="账户">
            <MenuItem
              label="个人资料"
              iconName="person-outline"
              iconBgColor={menuIconBgBlue}
              showBottomBorder
            />
            <MenuItem
              label="密码安全"
              iconName="lock-closed-outline"
              iconBgColor={menuIconBgBlue}
            />
          </MenuSection>

          <MenuSection title="订阅">
            <MenuItem
              label="订阅方案"
              iconName="star-outline"
              iconBgColor={menuIconBgYellow}
              showBottomBorder
            />
            <MenuItem
              label="账单管理"
              iconName="document-text-outline"
              iconBgColor={menuIconBgGray}
            />
          </MenuSection>

          <MenuSection title="帮助">
            <MenuItem
              label="帮助与反馈"
              iconName="help-circle-outline"
              iconBgColor={menuIconBgGray}
            />
          </MenuSection>
        </View>

        {/* Logout */}
        <View style={styles.logoutContainer}>
          <Pressable style={[styles.logoutButton, { borderColor: errorColor }]} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={18} color={errorColor} />
            <Text style={[styles.logoutText, { color: errorColor }]}>退出登录</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    // paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 128,
    gap: 32,
  },
  profile: {
    alignItems: 'center',
    gap: 15,
  },
  profileInfo: {
    alignItems: 'center',
    gap: 4,
  },
  email: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  menuSections: {
    gap: 16,
  },
  logoutContainer: {
    paddingTop: 16,
  },
  logoutButton: {
    height: 48,
    borderRadius: 9999,
    borderCurve: 'continuous' as const,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 26,
    textAlign: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    backgroundColor: '#F59E0B',
    gap: 2,
  },
  vipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 16,
  },
})

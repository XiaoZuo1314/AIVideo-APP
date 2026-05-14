/**
 * 登录页 - 邮箱/密码登录 + 社交登录
 */

import { useState } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LoginHeader, FormInput, SocialLoginButtons } from '@/src/components/business'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { typography } from '@/src/theme'
import { login } from '@/src/api/auth'
import { useAuthStore } from '@/src/stores'

const loginSchema = z.object({
  email: z.string().min(1, '请输入邮箱').email('邮箱格式不正确'),
  password: z.string().min(1, '请输入密码'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginScreen() {
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const textColor = useThemeColor({}, 'text')
  const textSecondary = useThemeColor({}, 'textSecondary')
  const textMuted = useThemeColor({}, 'textMuted')
  const loginBlue = useThemeColor({}, 'loginBlue')
  const borderColor = useThemeColor({}, 'border')

  const onSubmit = async (data: LoginForm) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      const user = await login(data.email, data.password)
      setUser(user)
      router.replace('/(tabs)')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '登录失败，请重试'
      Alert.alert('登录失败', message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View style={styles.root}>
      {/* Decorative blur circles */}
      <View style={styles.blurCircleTop} />
      <View style={styles.blurCircleBottom} />

      

        <View style={styles.content}>
          <LoginHeader onBackPress={() => router.back()} />
          {/* Welcome */}
          <View style={styles.welcome}>
            <Text style={[typography.heroTitle, { color: textColor, textAlign: 'center' }]}>
              欢迎使用
            </Text>
            <Text style={[styles.subtitle, { color: textSecondary, textAlign: 'center' }]}>
              登录以解锁 AI 视频分析功能
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <FormInput
                    placeholder="请输入邮箱"
                    iconName="mail-outline"
                    value={value}
                    onChangeText={onChange}
                  />
                  {error ? <Text style={styles.errorText}>{error.message}</Text> : null}
                </>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <FormInput
                    placeholder="请输入密码"
                    iconName="lock-closed-outline"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                    rightIcon={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    onRightIconPress={() => setShowPassword(!showPassword)}
                  />
                  {error ? <Text style={styles.errorText}>{error.message}</Text> : null}
                </>
              )}
            />
            <View style={styles.forgotRow}>
              <Pressable>
                <Text style={[styles.forgotText, { color: loginBlue }]}>忘记密码？</Text>
              </Pressable>
            </View>
            <Pressable
              style={[styles.loginButton, { backgroundColor: loginBlue }]}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              <Text style={styles.loginButtonText}>
                {isSubmitting ? '登录中...' : '登录'}
              </Text>
            </Pressable>
          </View>

          {/* Separator */}
          <View style={styles.separator}>
            <View style={[styles.separatorLine, { backgroundColor: borderColor }]} />
            <Text style={[styles.separatorText, { color: textMuted }]}>或者</Text>
            <View style={[styles.separatorLine, { backgroundColor: borderColor }]} />
          </View>

          {/* Social */}
          <SocialLoginButtons />

          {/* Register link */}
          <Pressable style={styles.registerLink} onPress={() => router.push('/register')}>
            <Text style={[styles.registerText, { color: textSecondary, textAlign: 'center' }]}>
              还没有账号？ 立即注册
            </Text>
          </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  blurCircleTop: {
    position: 'absolute',
    top: -88,
    right: 0,
    width: 234,
    height: 354,
    borderRadius: 9999,
    backgroundColor: 'rgba(23, 119, 255, 0.03)',
  },
  blurCircleBottom: {
    position: 'absolute',
    bottom: 0,
    left: -78,
    width: 195,
    height: 442,
    borderRadius: 9999,
    backgroundColor: 'rgba(23, 119, 255, 0.03)',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    // paddingTop: 99,
    paddingHorizontal: 20,
    paddingBottom: 252,
    gap: 32,
  },
  welcome: {
    gap: 8,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  form: {
    gap: 16,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#EF4444',
    lineHeight: 18,
    marginTop: -12,
  },
  forgotRow: {
    alignItems: 'flex-end',
    paddingBottom: 0,
  },
  forgotText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  loginButton: {
    height: 48,
    borderRadius: 9999,
    borderCurve: 'continuous' as const,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 10.5px rgba(23, 119, 255, 0.25)',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  separatorLine: {
    flex: 1,
    height: 1,
  },
  separatorText: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.8,
  },
  registerLink: {
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
})

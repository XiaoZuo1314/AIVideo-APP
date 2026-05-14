/**
 * 注册页 - 邮箱/密码注册 + 社交注册
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
import { register } from '@/src/api/auth'
import { useAuthStore } from '@/src/stores'

const registerSchema = z
  .object({
    email: z.string().min(1, '请输入邮箱').email('邮箱格式不正确'),
    password: z.string().min(6, '密码长度不能少于 6 位'),
    confirmPassword: z.string().min(1, '请再次输入密码'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  })

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterScreen() {
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { control, handleSubmit } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  const textColor = useThemeColor({}, 'text')
  const textSecondary = useThemeColor({}, 'textSecondary')
  const textMuted = useThemeColor({}, 'textMuted')
  const loginBlue = useThemeColor({}, 'loginBlue')
  const borderColor = useThemeColor({}, 'border')

  const onSubmit = async (data: RegisterForm) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      const user = await register(data.email, data.password)
      setUser(user)
      router.replace('/(tabs)')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '注册失败，请重试'
      Alert.alert('注册失败', message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View style={styles.root}>
      {/* Decorative blur circles */}
      <View style={styles.blurCircleTop} />
      <View style={styles.blurCircleBottom} />

      <LoginHeader onBackPress={() => router.back()} />

      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.content}>
          {/* Welcome */}
          <View style={styles.welcome}>
            <Text style={[typography.heroTitle, { color: textColor, textAlign: 'center' }]}>
              创建账户
            </Text>
            <Text style={[styles.subtitle, { color: textSecondary, textAlign: 'center' }]}>
              注册以解锁 AI 视频分析功能
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
                    placeholder="请输入密码（不少于 6 位）"
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
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <FormInput
                    placeholder="请再次输入密码"
                    iconName="lock-closed-outline"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                  />
                  {error ? <Text style={styles.errorText}>{error.message}</Text> : null}
                </>
              )}
            />
            <Pressable
              style={[styles.registerButton, { backgroundColor: loginBlue }]}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              <Text style={styles.registerButtonText}>
                {isSubmitting ? '注册中...' : '注册'}
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

          {/* Login link */}
          <Pressable style={styles.loginLink} onPress={() => router.back()}>
            <Text style={[styles.loginText, { color: textSecondary, textAlign: 'center' }]}>
              已有账号？ 立即登录
            </Text>
          </Pressable>
        </View>
      </ScrollView>
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
    paddingTop: 99,
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
  registerButton: {
    height: 48,
    borderRadius: 9999,
    borderCurve: 'continuous' as const,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 10.5px rgba(23, 119, 255, 0.25)',
  },
  registerButtonText: {
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
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
})

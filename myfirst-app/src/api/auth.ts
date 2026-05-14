/**
 * @module api/auth
 * @description 认证相关 API，对接后端 `/api/auth/*` 接口。
 * 提供登录、注册、获取用户信息、登出等功能。
 */

import { apiFetch } from './client'
import { setToken, removeToken, getToken } from '@/src/utils/token'

/** 用户信息 */
export interface User {
  /** 用户 ID */
  id: number
  /** 邮箱地址 */
  email: string
  /** 是否为 VIP 用户 */
  is_vip: boolean
  /** VIP 到期时间（ISO 字符串），非 VIP 时为 null */
  vip_expire_at: string | null
}

/** 登录/注册接口的响应体 */
interface AuthResponse {
  success: boolean
  data: {
    token: string
    user: User
  }
}

/** 获取当前用户信息的响应体 */
interface MeResponse {
  success: boolean
  data: User
}

/**
 * 用户登录
 * @param email - 邮箱地址
 * @param password - 密码
 * @returns 登录成功后的用户信息
 * @throws {Error} 邮箱或密码错误时抛出
 */
export async function login(email: string, password: string): Promise<User> {
  const res = await apiFetch<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  await setToken(res.data.token)
  return res.data.user
}

/**
 * 用户注册
 * @param email - 邮箱地址
 * @param password - 密码（不少于 6 位）
 * @returns 注册成功后的用户信息
 * @throws {Error} 邮箱格式不正确、密码太短或邮箱已注册时抛出
 */
export async function register(email: string, password: string): Promise<User> {
  const res = await apiFetch<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  await setToken(res.data.token)
  return res.data.user
}

/**
 * 获取当前登录用户信息
 * @returns 用户信息
 * @throws {Error} 未登录或令牌过期时抛出
 */
export async function fetchMe(): Promise<User> {
  const res = await apiFetch<MeResponse>('/api/auth/me')
  return res.data
}

/**
 * 登出，清除本地存储的认证令牌
 */
export async function logout(): Promise<void> {
  await removeToken()
}

export { getToken, setToken, removeToken }

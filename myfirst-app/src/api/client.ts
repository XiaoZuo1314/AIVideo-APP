/**
 * @module api/client
 * @description API 基础客户端，封装 fetch 并自动注入认证请求头。
 */

import Constants from 'expo-constants'
import { getToken } from '@/src/utils/token'

/**
 * 获取 API 基础地址
 * - 开发环境：从 Expo dev server URL 自动提取本机 IP，IP 变化无需手动改
 * - 生产环境：使用 EXPO_PUBLIC_API_URL 环境变量
 */
export function getBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL
  }

  if (__DEV__) {
    const hostUri = Constants.expoConfig?.hostUri
    const devHost = hostUri?.split(':')[0]
    if (devHost) {
      return `http://${devHost}:8000`
    }
  }

  return 'http://localhost:8000'
}

const BASE_URL = getBaseUrl()

/**
 * 发起带认证的 API 请求
 * @typeParam T - 响应体的期望类型
 * @param path - 接口路径，如 `/api/auth/login`
 * @param options - fetch 请求选项，默认为空对象
 * @returns 解析后的 JSON 响应体
 * @throws {Error} 当响应状态码非 2xx 时抛出，message 为后端返回的 detail 字段
 */
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getToken()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  if (options.headers) {
    const incoming = options.headers as Record<string, string>
    Object.assign(headers, incoming)
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.detail || '请求失败')
  }

  return data as T
}

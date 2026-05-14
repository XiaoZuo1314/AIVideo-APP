/**
 * @module utils/token
 * @description 认证令牌的本地存储管理。
 * Native 端使用 expo-secure-store，Web 端使用 localStorage。
 */

import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

const TOKEN_KEY = 'saveany_token'

/**
 * 从本地存储读取认证令牌
 * @returns 令牌字符串，未登录时返回 null
 */
export async function getToken(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return localStorage.getItem(TOKEN_KEY)
  }
  return SecureStore.getItemAsync(TOKEN_KEY)
}

/**
 * 将认证令牌写入本地存储
 * @param token - JWT 令牌字符串
 */
export async function setToken(token: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.setItem(TOKEN_KEY, token)
    return
  }
  await SecureStore.setItemAsync(TOKEN_KEY, token)
}

/**
 * 从本地存储删除认证令牌
 */
export async function removeToken(): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.removeItem(TOKEN_KEY)
    return
  }
  await SecureStore.deleteItemAsync(TOKEN_KEY)
}

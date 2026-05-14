/**
 * @module stores/use-auth-store
 * @description 认证状态管理，基于 Zustand。
 * 管理当前用户信息、登录状态，提供 setUser 和 logout 方法。
 */

import { create } from 'zustand'
import type { User } from '@/src/api/auth'
import { logout as apiLogout } from '@/src/api/auth'

/** 认证状态接口 */
interface AuthState {
  /** 当前登录用户，未登录时为 null */
  user: User | null
  /** 是否已登录 */
  isLoggedIn: boolean
  /**
   * 设置用户信息，同时更新登录状态
   * @param user - 用户信息，传 null 表示登出
   */
  setUser: (user: User | null) => void
  /**
   * 登出：清除服务端令牌并重置状态
   */
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  setUser: (user) =>
    set({ user, isLoggedIn: user !== null }),

  logout: async () => {
    await apiLogout()
    set({ user: null, isLoggedIn: false })
  },
}))

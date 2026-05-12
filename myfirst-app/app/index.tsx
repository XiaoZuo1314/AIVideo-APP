/**
 * 入口重定向 - 跳转到 Tab 首页
 */

import { Redirect } from 'expo-router'

export default function Index() {
  return <Redirect href="/(tabs)" />
}

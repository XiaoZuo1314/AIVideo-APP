/**
 * Tab 布局 - 使用 NativeTabs 实现原生标签导航
 * 遵循 vercel-react-native-skills：使用原生导航组件
 */

import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs'

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>首页</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="my">
        <Label>我的</Label>
        <Icon sf="person.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="pricing">
        <Label>定价</Label>
        <Icon sf="creditcard.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="about">
        <Label>关于</Label>
        <Icon sf="info.circle.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}

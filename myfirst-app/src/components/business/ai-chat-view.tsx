/**
 * AI 问答视图 — 上下文卡片 + 聊天消息 + 输入栏
 */

import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { Colors } from '@/src/theme'
import { useColorScheme } from '@/src/hooks/use-color-scheme'

const MOCK_MESSAGES = [
  {
    role: 'ai' as const,
    text: '您好！我已经分析完这段关于苹果 WWDC 2024 的视频。关于 iOS 18 的新特性、Apple Intelligence 的应用，或者其他发布内容，您想了解什么？',
  },
  {
    role: 'user' as const,
    text: '视频里有没有提到新的 Siri 具体能做什么？可以举几个例子吗？',
  },
  {
    role: 'ai' as const,
    text: '视频中详细介绍了全新 Siri 在 Apple Intelligence 加持下的升级，主要有以下几个方面：',
  },
  {
    role: 'user' as const,
    text: '屏幕感知那个功能，除了保存地址还能干嘛？',
  },
  {
    role: 'streaming' as const,
    text: '',
  },
]

export function AiChatView() {
  const scheme = useColorScheme() ?? 'light'
  const theme = Colors[scheme]
  const textColor = useThemeColor({}, 'text')
  const mutedColor = useThemeColor({}, 'textMuted')
  const primaryColor = useThemeColor({}, 'primary')

  return (
    <View style={styles.container}>
      {/* Context Card — fixed top */}
      <View style={styles.contextCardWrapper}>
        <View style={[styles.contextCard, { borderColor: theme.border }]}>
          <View style={styles.thumbnail}>
            <Ionicons name="play" size={12} color="#FFFFFF" />
          </View>
          <View style={styles.contextInfo}>
            <Text style={styles.contextTitle} numberOfLines={1}>
              2024 Apple 开发者大会完整回顾
            </Text>
            <Text style={[styles.contextStatus, { color: mutedColor }]}>
              AI 已就绪，您可以针对该视频内容提问
            </Text>
          </View>
        </View>
      </View>

      {/* Chat Messages — scrollable */}
      <ScrollView
        style={styles.messagesScroll}
        contentContainerStyle={styles.messages}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_MESSAGES.map((msg, i) => {
          if (msg.role === 'ai') {
            return (
              <View key={i} style={styles.aiMessageRow}>
                <View
                  style={[
                    styles.aiAvatar,
                    { backgroundColor: theme.aiAvatar },
                  ]}
                >
                  <Ionicons name="sparkles" size={16} color="#FFFFFF" />
                </View>
                <View
                  style={[
                    styles.aiBubble,
                    {
                      backgroundColor: theme.chatBubbleAi,
                      borderColor: 'rgba(229,231,235,0.5)',
                    },
                  ]}
                >
                  <Text style={[styles.messageText, { color: textColor }]}>
                    {msg.text}
                  </Text>
                </View>
              </View>
            )
          }

          if (msg.role === 'user') {
            return (
              <View key={i} style={styles.userMessageRow}>
                <View style={[styles.userBubble, { backgroundColor: theme.chatBubbleUser }]}>
                  <Text style={styles.userMessageText}>{msg.text}</Text>
                </View>
              </View>
            )
          }

          return (
            <View key={i} style={styles.aiMessageRow}>
              <View
                style={[
                  styles.aiAvatar,
                  { backgroundColor: theme.aiAvatar },
                ]}
              >
                <Ionicons name="sparkles" size={16} color="#FFFFFF" />
              </View>
              <View
                style={[
                  styles.aiBubble,
                  {
                    backgroundColor: theme.chatBubbleAi,
                    borderColor: 'rgba(229,231,235,0.5)',
                  },
                ]}
              >
                <View style={styles.streamingDots}>
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: primaryColor },
                    ]}
                  />
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: primaryColor },
                    ]}
                  />
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: primaryColor },
                    ]}
                  />
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>

      {/* Input Area — fixed bottom */}
      <View
        style={[
          styles.inputArea,
          { borderColor: theme.border },
        ]}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="针对视频内容向 AI 提问..."
            placeholderTextColor={mutedColor}
          />
          <Pressable
            style={[styles.sendButton, { backgroundColor: primaryColor }]}
          >
            <Ionicons name="arrow-up" size={16} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 0,
  },
  contextCardWrapper: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  contextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
  },
  thumbnail: {
    width: 80,
    height: 48,
    borderRadius: 8,
    borderCurve: 'continuous',
    backgroundColor: '#E0E2ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contextInfo: {
    flex: 1,
    gap: 4,
  },
  contextTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#1F1F1F',
  },
  contextStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  messagesScroll: {
    flex: 1,
  },
  messages: {
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  aiMessageRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiBubble: {
    maxWidth: 285,
    padding: 12,
    paddingLeft: 16,
    borderRadius: 2,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 24,
  },
  userMessageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  userBubble: {
    maxWidth: 285,
    padding: 12,
    paddingLeft: 16,
    borderRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  userMessageText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 24,
    color: '#FFFFFF',
  },
  streamingDots: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    paddingVertical: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  inputArea: {
    borderTopWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(250,249,255,0.9)',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 52,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  sendButton: {
    position: 'absolute',
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

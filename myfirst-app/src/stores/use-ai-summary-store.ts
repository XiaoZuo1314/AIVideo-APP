/**
 * AI 摘要 Zustand Store
 * 管理视频摘要、字幕、思维导图、问答的全部状态和 SSE 请求逻辑
 */

import { create } from 'zustand'
import type { SubtitleData, ChatMessage } from '@/src/types'
import { summarizeVideo, chatWithVideo } from '@/src/api/summarize'
import type EventSource from 'react-native-sse'

interface QuotaInfo {
  remaining: number
  limit: number
}

interface AiSummaryState {
  // 数据
  videoUrl: string
  summaryText: string
  subtitleData: SubtitleData | null
  mindmapMarkdown: string
  quotaInfo: QuotaInfo | null
  chatMessages: ChatMessage[]
  chatInput: string

  // 状态
  isSummarizing: boolean
  isChatLoading: boolean
  errorMessage: string | null
  loadingMessage: string

  // 操作
  setVideoUrl: (url: string) => void
  startSummarize: () => void
  cancelSummarize: () => void
  setChatInput: (input: string) => void
  sendQuestion: () => void
  reset: () => void
}

let summarizeES: EventSource | null = null
let chatES: EventSource | null = null

export const useAiSummaryStore = create<AiSummaryState>((set, get) => ({
  videoUrl: '',
  summaryText: '',
  subtitleData: null,
  mindmapMarkdown: '',
  quotaInfo: null,
  chatMessages: [],
  chatInput: '',

  isSummarizing: false,
  isChatLoading: false,
  errorMessage: null,
  loadingMessage: '正在提取视频字幕...',

  setVideoUrl: (url) => set({ videoUrl: url }),

  startSummarize: () => {
    const { videoUrl } = get()
    if (!videoUrl) return

    // 取消上一次请求
    if (summarizeES) {
      summarizeES.close()
      summarizeES = null
    }

    set({
      summaryText: '',
      subtitleData: null,
      mindmapMarkdown: '',
      quotaInfo: null,
      errorMessage: null,
      isSummarizing: true,
      loadingMessage: '正在提取视频字幕...',
    })

    summarizeVideo(videoUrl, 'zh', {
      subtitle: (data) => {
        try {
          const parsed = JSON.parse(data) as SubtitleData
          set({
            subtitleData: parsed,
            loadingMessage: parsed.has_subtitle
              ? 'AI 正在分析视频内容...'
              : '未找到字幕',
          })
        } catch {
          // ignore parse error
        }
      },
      summary: (data) => {
        try {
          const token = JSON.parse(data)
          set((s) => ({
            summaryText: s.summaryText + (typeof token === 'string' ? token : ''),
          }))
        } catch {
          // 如果不是 JSON，直接追加
          set((s) => ({ summaryText: s.summaryText + data }))
        }
      },
      mindmap: (data) => {
        try {
          const parsed = JSON.parse(data)
          set({ mindmapMarkdown: parsed.markdown ?? '' })
        } catch {
          // ignore parse error
        }
      },
      quota: (data) => {
        try {
          const parsed = JSON.parse(data)
          set({ quotaInfo: { remaining: parsed.remaining, limit: parsed.limit } })
        } catch {
          // ignore parse error
        }
      },
      done: () => {
        set({ isSummarizing: false })
        summarizeES = null
      },
      error: (data) => {
        try {
          const parsed = JSON.parse(data)
          set({
            errorMessage: parsed.message ?? '请求失败',
            isSummarizing: false,
          })
        } catch {
          set({ errorMessage: '请求失败', isSummarizing: false })
        }
        summarizeES = null
      },
    }).then((es) => {
      summarizeES = es
    })
  },

  cancelSummarize: () => {
    if (summarizeES) {
      summarizeES.close()
      summarizeES = null
    }
    set({ isSummarizing: false })
  },

  setChatInput: (input) => set({ chatInput: input }),

  sendQuestion: () => {
    const { chatInput, videoUrl, subtitleData, chatMessages } = get()
    const question = chatInput.trim()
    if (!question || !videoUrl) return

    const userMessage: ChatMessage = { role: 'user', content: question }
    const loadingMessage: ChatMessage = { role: 'assistant', content: '', loading: true }

    set({
      chatMessages: [...chatMessages, userMessage, loadingMessage],
      chatInput: '',
      isChatLoading: true,
    })

    chatWithVideo(videoUrl, question, subtitleData?.full_text ?? '', {
      answer: (data) => {
        try {
          const token = JSON.parse(data)
          set((s) => {
            const msgs = [...s.chatMessages]
            const last = msgs[msgs.length - 1]
            if (last && last.role === 'assistant') {
              last.content += typeof token === 'string' ? token : ''
            }
            return { chatMessages: msgs }
          })
        } catch {
          set((s) => {
            const msgs = [...s.chatMessages]
            const last = msgs[msgs.length - 1]
            if (last && last.role === 'assistant') {
              last.content += data
            }
            return { chatMessages: msgs }
          })
        }
      },
      done: () => {
        set((s) => {
          const msgs = [...s.chatMessages]
          const last = msgs[msgs.length - 1]
          if (last && last.role === 'assistant') {
            last.loading = false
          }
          return { chatMessages: msgs, isChatLoading: false }
        })
        chatES = null
      },
      error: (data) => {
        try {
          const parsed = JSON.parse(data)
          set((s) => {
            const msgs = [...s.chatMessages]
            const last = msgs[msgs.length - 1]
            if (last && last.role === 'assistant') {
              last.content = parsed.message ?? '回答失败'
              last.loading = false
            }
            return { chatMessages: msgs, isChatLoading: false }
          })
        } catch {
          set((s) => {
            const msgs = [...s.chatMessages]
            const last = msgs[msgs.length - 1]
            if (last && last.role === 'assistant') {
              last.content = '回答失败'
              last.loading = false
            }
            return { chatMessages: msgs, isChatLoading: false }
          })
        }
        chatES = null
      },
    }).then((es) => {
      chatES = es
    })
  },

  reset: () => {
    if (summarizeES) {
      summarizeES.close()
      summarizeES = null
    }
    if (chatES) {
      chatES.close()
      chatES = null
    }
    set({
      videoUrl: '',
      summaryText: '',
      subtitleData: null,
      mindmapMarkdown: '',
      quotaInfo: null,
      chatMessages: [],
      chatInput: '',
      isSummarizing: false,
      isChatLoading: false,
      errorMessage: null,
      loadingMessage: '正在提取视频字幕...',
    })
  },
}))

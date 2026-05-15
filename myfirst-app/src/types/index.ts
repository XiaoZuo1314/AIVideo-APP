// TypeScript 全局类型声明统一导出

export interface SubtitleSegment {
  start: number
  end: number
  text: string
}

export interface SubtitleData {
  has_subtitle: boolean
  full_text: string
  language?: string
  subtitle_type?: string
  segments: SubtitleSegment[]
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  loading?: boolean
}

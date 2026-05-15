/**
 * AI 视频总结 API — 基于 react-native-sse 的 SSE 流式请求
 */

import EventSource from 'react-native-sse'
import { getToken } from '@/src/utils/token'
import { getBaseUrl } from '@/src/api/client'

export type SSECallbacks = Record<string, (data: string) => void>

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  // getToken 是 async，但 EventSource 构造是同步的
  // 这里返回一个 Promise，调用方需 await getToken 后传入
  return headers
}

async function authHeaders(): Promise<Record<string, string>> {
  const token = await getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

/**
 * 发起 AI 视频总结 SSE 请求
 * @returns EventSource 实例，调用 .close() 可取消
 */
export async function summarizeVideo(
  url: string,
  language: string,
  callbacks: SSECallbacks,
): Promise<EventSource> {
  const headers = await authHeaders()
  const baseUrl = getBaseUrl()

  const es = new EventSource(`${baseUrl}/api/summarize`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ url, language }),
  })

  es.addEventListener('subtitle', (event: any) => {
    callbacks.subtitle?.(event.data)
  })

  es.addEventListener('summary', (event: any) => {
    callbacks.summary?.(event.data)
  })

  es.addEventListener('mindmap', (event: any) => {
    callbacks.mindmap?.(event.data)
  })

  es.addEventListener('quota', (event: any) => {
    callbacks.quota?.(event.data)
  })

  es.addEventListener('done', () => {
    callbacks.done?.('')
    es.close()
  })

  es.addEventListener('error', (event: any) => {
    callbacks.error?.(event.data ?? JSON.stringify({ message: '连接失败' }))
    es.close()
  })

  return es
}

/**
 * 发起 AI 视频问答 SSE 请求
 * @returns EventSource 实例，调用 .close() 可取消
 */
export async function chatWithVideo(
  url: string,
  question: string,
  subtitleText: string,
  callbacks: SSECallbacks,
): Promise<EventSource> {
  const headers = await authHeaders()
  const baseUrl = getBaseUrl()

  const es = new EventSource(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ url, question, subtitle_text: subtitleText }),
  })

  es.addEventListener('answer', (event: any) => {
    callbacks.answer?.(event.data)
  })

  es.addEventListener('done', () => {
    callbacks.done?.('')
    es.close()
  })

  es.addEventListener('error', (event: any) => {
    callbacks.error?.(event.data ?? JSON.stringify({ message: '连接失败' }))
    es.close()
  })

  return es
}

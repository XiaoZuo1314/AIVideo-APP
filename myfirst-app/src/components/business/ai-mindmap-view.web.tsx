/**
 * 思维导图视图 — Web
 * 直接在 DOM 中加载 markmap 脚本渲染，无需 WebView
 */

import React, { useState, useRef, useCallback } from 'react'
import { View, Text, ActivityIndicator, Pressable } from 'react-native'
import { Toolbar, styles } from './ai-mindmap-shared'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { useAiSummaryStore } from '@/src/stores'

interface ScriptConfig {
  src: string
  integrity: string
}

const MARKMAP_SCRIPTS: ScriptConfig[] = [
  {
    src: 'https://cdn.jsdelivr.net/npm/d3@7.9.0',
    integrity: 'sha384-CjloA8y00+1SDAUkjs099PVfnY2KmDC2BZnws9kh8D/lX1s46w6EPhpXdqMfjK6i',
  },
  {
    src: 'https://cdn.jsdelivr.net/npm/markmap-view@0.18.12',
    integrity: 'sha384-C8c2nsw+oZzYU5tGVHgXz8jVOoxdzionfzyQKFUQCqb/xLZgWZv2pnTamUfUiBSt',
  },
  {
    src: 'https://cdn.jsdelivr.net/npm/markmap-lib@0.18.12',
    integrity: 'sha384-mQgrLtILpAxOQmxspISBOEZByHJoRpKeG1+0/BEr0MO3hG1aBqcd4aJgrUoQGGE7',
  },
]

function loadScript(config: ScriptConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${config.src}"]`)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = config.src
    script.integrity = config.integrity
    script.crossOrigin = 'anonymous'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load ${config.src}`))
    document.head.appendChild(script)
  })
}

const LOAD_TIMEOUT_MS = 15_000

type MindmapLoadState = 'loading' | 'ready' | 'error'

export function AiMindmapView() {
  const primaryColor = useThemeColor({}, 'primary')
  const [loadState, setLoadState] = useState<MindmapLoadState>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [retryKey, setRetryKey] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const mmRef = useRef<any>(null)
  const scriptsLoadedRef = useRef(false)

  const mindmapMarkdown = useAiSummaryStore((s) => s.mindmapMarkdown)

  // Loading timeout — reset on retry
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadState(prev => prev === 'loading' ? 'error' : prev)
      setErrorMessage('加载超时，请检查网络连接后重试')
    }, LOAD_TIMEOUT_MS)
    return () => clearTimeout(timer)
  }, [retryKey])

  // Script loading & markmap init — re-run on retry
  React.useEffect(() => {
    let cancelled = false

    async function init() {
      try {
        for (const config of MARKMAP_SCRIPTS) {
          await loadScript(config)
        }
        if (cancelled) return

        scriptsLoadedRef.current = true
        setLoadState('ready')

        // 脚本加载完成后如果有数据则渲染
        const md = useAiSummaryStore.getState().mindmapMarkdown
        if (md && containerRef.current) {
          renderMindmap(md)
        }
      } catch (err) {
        if (!cancelled) {
          setLoadState('error')
          setErrorMessage(err instanceof Error ? err.message : '加载思维导图失败')
        }
      }
    }

    init()
    return () => { cancelled = true }
  }, [retryKey])

  function renderMindmap(markdown: string) {
    if (!containerRef.current) return
    try {
      const mmLib = (window as any).markmap
      const transformer = new mmLib.Transformer()
      const result = transformer.transform(markdown)

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('width', '100%')
      svg.setAttribute('height', '100%')
      containerRef.current.innerHTML = ''
      containerRef.current.appendChild(svg)

      mmRef.current = mmLib.Markmap.create(svg, {}, result.root)
    } catch {
      // ignore render error
    }
  }

  // mindmapMarkdown 变化时重新渲染
  React.useEffect(() => {
    if (scriptsLoadedRef.current && mindmapMarkdown) {
      renderMindmap(mindmapMarkdown)
    }
  }, [mindmapMarkdown])

  const handleRetry = useCallback(() => {
    setLoadState('loading')
    setErrorMessage('')
    scriptsLoadedRef.current = false
    MARKMAP_SCRIPTS.forEach(config => {
      const existing = document.querySelector(`script[src="${config.src}"]`)
      if (existing) existing.remove()
    })
    setRetryKey(prev => prev + 1)
  }, [])

  const handleZoomIn = useCallback(() => mmRef.current?.rescale(1.2), [])
  const handleZoomOut = useCallback(() => mmRef.current?.rescale(0.8), [])
  const handleReset = useCallback(() => mmRef.current?.fit(), [])

  return (
    <View style={styles.card}>
      <Toolbar
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
      />
      <View style={styles.webviewContainer}>
        {loadState === 'loading' ? (
          <ActivityIndicator style={styles.loader} size="small" color={primaryColor} />
        ) : null}
        {loadState === 'error' ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <Pressable style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryText}>重试</Text>
            </Pressable>
          </View>
        ) : null}
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: '100%',
            opacity: loadState === 'ready' ? 1 : 0,
            pointerEvents: loadState === 'ready' ? 'auto' : 'none',
          }}
        />
      </View>
    </View>
  )
}

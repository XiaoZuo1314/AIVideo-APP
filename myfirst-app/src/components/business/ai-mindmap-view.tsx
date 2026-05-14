/**
 * 思维导图视图 — Native (iOS / Android)
 * 通过 react-native-webview 加载 markmap HTML
 * Web 平台由 ai-mindmap-view.web.tsx 接管
 */

import React, { useState, useRef, useCallback } from 'react'
import { View, Text, ActivityIndicator, Platform, Pressable } from 'react-native'
import { Toolbar, MOCK_MINDMAP_MARKDOWN, styles } from './ai-mindmap-shared'
import { useThemeColor } from '@/src/hooks/use-theme-color'

// 条件加载，避免 web 平台打包 react-native-webview
const WebView = Platform.OS !== 'web'
  ? require('react-native-webview').WebView
  : null

const LOAD_TIMEOUT_MS = 15_000

const MINDMAP_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src https://cdn.jsdelivr.net 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:;">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #mindmap { width: 100%; height: 100%; overflow: hidden; }
    svg.markmap { width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div id="mindmap"></div>
  <script>
    var mm = null;
    var SCRIPTS = [
      { src: 'https://cdn.jsdelivr.net/npm/d3@7.9.0', integrity: 'sha384-CjloA8y00+1SDAUkjs099PVfnY2KmDC2BZnws9kh8D/lX1s46w6EPhpXdqMfjK6i' },
      { src: 'https://cdn.jsdelivr.net/npm/markmap-view@0.18.12', integrity: 'sha384-C8c2nsw+oZzYU5tGVHgXz8jVOoxdzionfzyQKFUQCqb/xLZgWZv2pnTamUfUiBSt' },
      { src: 'https://cdn.jsdelivr.net/npm/markmap-lib@0.18.12', integrity: 'sha384-mQgrLtILpAxOQmxspISBOEZByHJoRpKeG1+0/BEr0MO3hG1aBqcd4aJgrUoQGGE7' }
    ];

    function postMsg(type, payload) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: type, payload: payload }));
    }

    window.__rnBridge = function(jsonStr) {
      try {
        var msg = JSON.parse(jsonStr);
        if (msg.type === 'render') {
          renderMindmap(msg.payload);
        } else if (msg.type === 'zoomIn' && mm) {
          mm.rescale(1.2);
        } else if (msg.type === 'zoomOut' && mm) {
          mm.rescale(0.8);
        } else if (msg.type === 'reset' && mm) {
          mm.fit();
        }
      } catch (err) {
        postMsg('error', err.message);
      }
    };

    function renderMindmap(markdown) {
      try {
        var container = document.getElementById('mindmap');
        container.innerHTML = '';
        var mmLib = window.markmap;
        var transformer = new mmLib.Transformer();
        var result = transformer.transform(markdown);
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        container.appendChild(svg);
        mm = mmLib.Markmap.create(svg, {}, result.root);
      } catch (err) {
        postMsg('error', err.message);
      }
    }

    var scriptsLoaded = 0;
    SCRIPTS.forEach(function(cfg) {
      var s = document.createElement('script');
      s.src = cfg.src;
      s.integrity = cfg.integrity;
      s.crossOrigin = 'anonymous';
      s.onload = function() {
        scriptsLoaded++;
        if (scriptsLoaded === SCRIPTS.length) checkReady();
      };
      s.onerror = function() {
        postMsg('error', 'Failed to load script: ' + cfg.src);
      };
      document.head.appendChild(s);
    });

    function checkReady() {
      if (window.markmap && window.markmap.Markmap && window.markmap.Transformer) {
        postMsg('ready');
      } else {
        setTimeout(checkReady, 200);
      }
    }
  </script>
</body>
</html>`

interface WebViewMsg {
  type: string
  payload?: string
}

const SANITIZE_RE = /[<>\\]/g

function sanitizeForInjection(str: string): string {
  return str.replace(SANITIZE_RE, '')
}

type MindmapLoadState = 'loading' | 'ready' | 'error'

const NativeMindmap = React.memo(function NativeMindmap() {
  const primaryColor = useThemeColor({}, 'primary')
  const [loadState, setLoadState] = useState<MindmapLoadState>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const webViewRef = useRef<any>(null)

  // Loading timeout
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadState(prev => prev === 'loading' ? 'error' : prev)
      if (loadState === 'loading') {
        setErrorMessage('加载超时，请检查网络连接后重试')
      }
    }, LOAD_TIMEOUT_MS)
    return () => clearTimeout(timer)
  }, [])

  const sendToWebView = useCallback((type: string, payload?: string) => {
    const safePayload = payload ? sanitizeForInjection(payload) : undefined
    const json = JSON.stringify({ type, payload: safePayload })
    const encoded = encodeURIComponent(json)
    webViewRef.current?.injectJavaScript(
      `window.__rnBridge(decodeURIComponent('${encoded}'));true;`,
    )
  }, [])

  const handleMessage = useCallback(
    (event: { nativeEvent: { data: string } }) => {
      try {
        const msg: WebViewMsg = JSON.parse(event.nativeEvent.data)
        if (msg.type === 'ready') {
          setLoadState('ready')
          sendToWebView('render', MOCK_MINDMAP_MARKDOWN)
        } else if (msg.type === 'error') {
          setLoadState('error')
          setErrorMessage(msg.payload ?? '渲染出错')
        }
      } catch {
        // ignore parse errors
      }
    },
    [sendToWebView],
  )

  const handleWebViewError = useCallback(() => {
    setLoadState('error')
    setErrorMessage('加载思维导图失败，请重试')
  }, [])

  const handleShouldStartLoad = useCallback(
    (request: { url: string }) => {
      const allowed = ['https://cdn.jsdelivr.net/', 'about:blank']
      return allowed.some(prefix => request.url.startsWith(prefix))
    },
    [],
  )

  const handleRetry = useCallback(() => {
    setLoadState('loading')
    setErrorMessage('')
    webViewRef.current?.reload()
  }, [])

  const handleZoomIn = useCallback(() => sendToWebView('zoomIn'), [sendToWebView])
  const handleZoomOut = useCallback(() => sendToWebView('zoomOut'), [sendToWebView])
  const handleReset = useCallback(() => sendToWebView('reset'), [sendToWebView])

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
        <WebView
          ref={webViewRef}
          source={{ html: MINDMAP_HTML }}
          style={[styles.webview, loadState !== 'ready' && { opacity: 0 }]}
          originWhitelist={['https://cdn.jsdelivr.net', 'about:blank']}
          onShouldStartLoadWithRequest={handleShouldStartLoad}
          javaScriptEnabled
          onMessage={handleMessage}
          onError={handleWebViewError}
          onHttpError={handleWebViewError}
          onContentProcessDidTerminate={handleWebViewError}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          overScrollMode="never"
          nestedScrollEnabled={false}
        />
      </View>
    </View>
  )
})

export function AiMindmapView() {
  if (Platform.OS === 'web') {
    return null
  }
  return <NativeMindmap />
}

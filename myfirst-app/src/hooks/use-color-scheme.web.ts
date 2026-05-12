import { useEffect, useState } from 'react'
import { useColorScheme as useRNColorScheme } from 'react-native'

/**
 * Web 端兼容版本，支持静态渲染
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    setHasHydrated(true)
  }, [])

  const colorScheme = useRNColorScheme()

  if (hasHydrated) {
    return colorScheme
  }

  return 'light'
}

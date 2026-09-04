import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { THEME_KEY } from '../constants'

// Preferência inicial: valor salvo ou o esquema do sistema.
function getInitialTheme() {
  try {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  } catch {
    // ignora ambientes sem matchMedia
  }
  return 'light'
}

// Tema light/dark persistido; escreve data-theme no <html>.
export function useTheme() {
  const [theme, setTheme] = useLocalStorage(THEME_KEY, getInitialTheme())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggle }
}

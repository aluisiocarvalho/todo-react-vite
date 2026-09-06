import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { newId } from '../lib/id'
import { CATEGORIES_KEY, DEFAULT_CATEGORIES } from '../constants'

// Compara nomes ignorando caixa e espaços nas pontas.
function sameName(a, b) {
  return a.trim().toLowerCase() === b.trim().toLowerCase()
}

// Categorias gerenciáveis pelo usuário, persistidas no localStorage.
export function useCategories() {
  const [categories, setCategories] = useLocalStorage(CATEGORIES_KEY, DEFAULT_CATEGORIES)

  const addCategory = useCallback((name, color) => {
    const clean = name.trim()
    if (!clean) return
    setCategories((prev) => {
      if (prev.some((c) => sameName(c.name, clean))) return prev
      return [...prev, { id: newId(), name: clean, color: color || '#2563eb' }]
    })
  }, [setCategories])

  const renameCategory = useCallback((id, name) => {
    const clean = name.trim()
    if (!clean) return
    setCategories((prev) =>
      prev.some((c) => c.id !== id && sameName(c.name, clean))
        ? prev
        : prev.map((c) => (c.id === id ? { ...c, name: clean } : c)),
    )
  }, [setCategories])

  const setCategoryColor = useCallback((id, color) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, color } : c)))
  }, [setCategories])

  const removeCategory = useCallback((id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }, [setCategories])

  return { categories, addCategory, renameCategory, setCategoryColor, removeCategory }
}

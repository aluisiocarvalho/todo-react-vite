import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { newId } from '../lib/id'
import { STATUS, STORAGE_KEY } from '../constants'

export function useTodos() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, [])

  const addTask = useCallback((title, categoryIds = []) => {
    const clean = title.trim()
    if (!clean) return
    const now = Date.now()
    setTasks((prev) => [
      {
        id: newId(),
        title: clean,
        status: 'todo',
        categoryIds: [...categoryIds],
        createdAt: now,
        updatedAt: now,
      },
      ...prev,
    ])
  }, [setTasks])

  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [setTasks])

  const editTitle = useCallback((id, title) => {
    const clean = title.trim()
    if (!clean) return
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: clean, updatedAt: Date.now() } : t)),
    )
  }, [setTasks])

  const setStatus = useCallback((id, status) => {
    if (!STATUS[status]) return
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status, updatedAt: Date.now() } : t)),
    )
  }, [setTasks])

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => t.status !== 'done'))
  }, [setTasks])

  // Substitui as categorias (tags) de uma tarefa.
  const setTaskCategories = useCallback((id, categoryIds) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, categoryIds: [...categoryIds], updatedAt: Date.now() } : t,
      ),
    )
  }, [setTasks])

  // Adiciona/remove uma categoria da tarefa.
  const toggleTaskCategory = useCallback((id, categoryId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const current = t.categoryIds ?? []
        const next = current.includes(categoryId)
          ? current.filter((c) => c !== categoryId)
          : [...current, categoryId]
        return { ...t, categoryIds: next, updatedAt: Date.now() }
      }),
    )
  }, [setTasks])

  // Tira a categoria de todas as tarefas (cascade ao excluir a categoria).
  const removeCategoryFromTasks = useCallback((categoryId) => {
    setTasks((prev) =>
      prev.map((t) =>
        (t.categoryIds ?? []).includes(categoryId)
          ? { ...t, categoryIds: t.categoryIds.filter((c) => c !== categoryId) }
          : t,
      ),
    )
  }, [setTasks])

  // Move a tarefa `fromId` para a posição de `toId` (ordem persiste no localStorage).
  const reorderTasks = useCallback((fromId, toId) => {
    if (fromId === toId) return
    setTasks((prev) => {
      const from = prev.findIndex((t) => t.id === fromId)
      const to = prev.findIndex((t) => t.id === toId)
      if (from === -1 || to === -1) return prev
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }, [setTasks])

  const counts = useMemo(() => {
    const base = { todo: 0, doing: 0, done: 0 }
    for (const t of tasks) base[t.status] = (base[t.status] ?? 0) + 1
    return base
  }, [tasks])

  return {
    tasks,
    addTask,
    removeTask,
    editTitle,
    setStatus,
    clearCompleted,
    reorderTasks,
    setTaskCategories,
    toggleTaskCategory,
    removeCategoryFromTasks,
    counts,
  }
}

import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { STATUS, STORAGE_KEY } from '../constants'

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function useTodos() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, [])

  const addTask = useCallback((title) => {
    const clean = title.trim()
    if (!clean) return
    const now = Date.now()
    setTasks((prev) => [
      { id: newId(), title: clean, status: 'todo', createdAt: now, updatedAt: now },
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

  const counts = useMemo(() => {
    const base = { todo: 0, doing: 0, done: 0 }
    for (const t of tasks) base[t.status] = (base[t.status] ?? 0) + 1
    return base
  }, [tasks])

  return { tasks, addTask, removeTask, editTitle, setStatus, clearCompleted, counts }
}

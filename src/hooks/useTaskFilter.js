import { useCallback, useMemo, useState } from 'react'
import { STATUS } from '../constants'
import { filterTasks } from '../lib/filterTasks'

/**
 * Estado de busca/filtro de tarefas + lista derivada.
 * @param {Array<{id: string, title: string, status: string}>} tasks
 */
export function useTaskFilter(tasks) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')

  // Só aceita 'all' ou uma chave válida de STATUS.
  const changeStatus = useCallback((next) => {
    setStatus(next === 'all' || STATUS[next] ? next : 'all')
  }, [])

  const clear = useCallback(() => {
    setQuery('')
    setStatus('all')
  }, [])

  const visible = useMemo(
    () => filterTasks(tasks, { query, status }),
    [tasks, query, status],
  )

  const active = query.trim() !== '' || status !== 'all'

  return { query, setQuery, status, setStatus: changeStatus, clear, visible, active }
}

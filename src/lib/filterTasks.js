import { STATUS } from '../constants'

/**
 * @typedef {Object} TaskFilter
 * @property {string} [query] Texto buscado no título (case-insensitive).
 * @property {string} [status] Chave de STATUS ou 'all'.
 */

// Normaliza texto para busca (minúsculo e sem espaços nas pontas).
function norm(value) {
  return String(value ?? '').trim().toLowerCase()
}

/**
 * Filtra tarefas por texto no título e por status.
 * @param {Array<{id: string, title: string, status: string}>} tasks
 * @param {TaskFilter} [filter]
 * @returns {Array<{id: string, title: string, status: string}>}
 */
export function filterTasks(tasks, filter = {}) {
  const query = norm(filter.query)
  const status = filter.status && STATUS[filter.status] ? filter.status : 'all'

  return (tasks ?? []).filter((task) => {
    if (status !== 'all' && task.status !== status) return false
    if (query && !norm(task.title).includes(query)) return false
    return true
  })
}

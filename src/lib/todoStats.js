import { STATUS, STATUS_ORDER } from '../constants'

// Contagem por status (inclui status com valor 0) para o gráfico.
export function getStatusCounts(tasks) {
  const counts = Object.fromEntries(STATUS_ORDER.map((k) => [k, 0]))
  for (const t of tasks) {
    if (counts[t.status] != null) counts[t.status] += 1
  }
  return STATUS_ORDER.map((key) => ({
    key,
    name: STATUS[key].label,
    value: counts[key],
    color: STATUS[key].color,
  }))
}

// Contagem por categoria (mesma forma de getStatusCounts). Uma tarefa com
// várias tags conta em cada uma; adiciona "Sem categoria" quando houver.
export function getCategoryCounts(tasks, categories) {
  const list = categories ?? []
  const counts = Object.fromEntries(list.map((c) => [c.id, 0]))
  let uncategorized = 0

  for (const t of tasks ?? []) {
    const ids = (t.categoryIds ?? []).filter((id) => counts[id] != null)
    if (ids.length === 0) uncategorized += 1
    for (const id of ids) counts[id] += 1
  }

  const result = list.map((c) => ({
    key: c.id,
    name: c.name,
    value: counts[c.id],
    color: c.color,
  }))

  if (uncategorized > 0) {
    result.push({ key: '__none__', name: 'Sem categoria', value: uncategorized, color: '#cbd5e1' })
  }
  return result
}

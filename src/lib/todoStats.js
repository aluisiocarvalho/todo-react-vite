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

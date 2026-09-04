import { STATUS, STATUS_ORDER } from '../constants'

// Opções de status para os botões (inclui "Todas").
const STATUS_FILTERS = [
  { key: 'all', label: 'Todas' },
  ...STATUS_ORDER.map((k) => ({ key: k, label: STATUS[k].label })),
]

export default function TaskSearch({
  query,
  status,
  onQueryChange,
  onStatusChange,
  onClear,
  active,
}) {
  return (
    <div className="task-search">
      <input
        type="search"
        className="search-input"
        placeholder="Buscar tarefa..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label="Buscar tarefa"
      />

      <div className="filters">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={status === f.key ? 'active' : ''}
            onClick={() => onStatusChange(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {active && (
        <button type="button" className="ghost" onClick={onClear}>
          Limpar busca
        </button>
      )}
    </div>
  )
}

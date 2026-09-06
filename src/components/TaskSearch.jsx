import { STATUS, STATUS_ORDER } from '../constants'

// Opções de status para os botões (inclui "Todas").
const STATUS_FILTERS = [
  { key: 'all', label: 'Todas' },
  ...STATUS_ORDER.map((k) => ({ key: k, label: STATUS[k].label })),
]

export default function TaskSearch({
  query,
  status,
  categories = [],
  categoryId = 'all',
  onQueryChange,
  onStatusChange,
  onCategoryChange,
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

      {categories.length > 0 && (
        <select
          className="category-filter"
          value={categoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filtrar por categoria"
        >
          <option value="all">Todas as categorias</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      )}

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

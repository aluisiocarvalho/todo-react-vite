export const STATUS = {
  todo: { key: 'todo', label: 'A fazer', color: '#94a3b8' },
  doing: { key: 'doing', label: 'Em progresso', color: '#f59e0b' },
  done: { key: 'done', label: 'Concluída', color: '#22c55e' },
}

export const STATUS_ORDER = ['todo', 'doing', 'done']

export const STORAGE_KEY = 'todo.tasks'

export const THEME_KEY = 'todo.theme'

export const CATEGORIES_KEY = 'todo.categories'

// Paleta sugerida no seletor de cor do gerenciador de categorias.
export const COLOR_SWATCHES = [
  '#2563eb', '#0891b2', '#16a34a', '#ca8a04',
  '#ea580c', '#dc2626', '#db2777', '#9333ea',
]

// Categorias iniciais (o usuário pode renomear, recolorir ou excluir).
export const DEFAULT_CATEGORIES = [
  { id: 'cat-trabalho', name: 'Trabalho', color: '#2563eb' },
  { id: 'cat-pessoal', name: 'Pessoal', color: '#16a34a' },
  { id: 'cat-estudos', name: 'Estudos', color: '#9333ea' },
  { id: 'cat-urgente', name: 'Urgente', color: '#dc2626' },
]

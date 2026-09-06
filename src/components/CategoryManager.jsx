import { useEffect, useState } from 'react'
import { COLOR_SWATCHES } from '../constants'

// Uma linha do gerenciador: nome controlado que reverte se a renomeação for recusada.
function CategoryRow({ category, onRename, onSetColor, onRemove }) {
  const [draft, setDraft] = useState(category.name)

  // Ressincroniza quando o nome muda por fora (renomeação aceita, outra edição).
  useEffect(() => setDraft(category.name), [category.name])

  function commit() {
    if (draft.trim() === category.name) return
    onRename(category.id, draft)
    setDraft(category.name) // recusado (vazio/duplicado) mantém o nome atual
  }

  return (
    <li>
      <input
        type="color"
        value={category.color}
        onChange={(e) => onSetColor(category.id, e.target.value)}
        aria-label={`Cor de ${category.name}`}
      />
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.currentTarget.blur()
          if (e.key === 'Escape') setDraft(category.name)
        }}
        aria-label={`Nome de ${category.name}`}
      />
      <button
        type="button"
        className="remove"
        aria-label={`Excluir ${category.name}`}
        onClick={() => {
          if (window.confirm(`Excluir a categoria "${category.name}"? Ela sai de todas as tarefas.`)) {
            onRemove(category.id)
          }
        }}
      >
        ✕
      </button>
    </li>
  )
}

// Painel para criar, renomear, recolorir e excluir categorias.
export default function CategoryManager({ categories, onAdd, onRename, onSetColor, onRemove }) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLOR_SWATCHES[0])

  function handleAdd(e) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd(name, color)
    setName('')
  }

  return (
    <div className="category-manager card">
      <h2>Categorias</h2>

      <ul className="category-manager-list">
        {categories.map((c) => (
          <CategoryRow
            key={c.id}
            category={c}
            onRename={onRename}
            onSetColor={onSetColor}
            onRemove={onRemove}
          />
        ))}
      </ul>

      <form className="category-manager-add" onSubmit={handleAdd}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          aria-label="Cor da nova categoria"
        />
        <input
          type="text"
          placeholder="Nova categoria..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Nome da nova categoria"
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  )
}

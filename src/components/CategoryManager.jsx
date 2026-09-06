import { useState } from 'react'
import { COLOR_SWATCHES } from '../constants'

// Painel para criar, renomear, recolorir e excluir categorias.
export default function CategoryManager({
  categories,
  onAdd,
  onRename,
  onSetColor,
  onRemove,
}) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLOR_SWATCHES[0])

  function handleAdd(e) {
    e.preventDefault()
    onAdd(name, color)
    setName('')
  }

  return (
    <div className="category-manager card">
      <h2>Categorias</h2>

      <ul className="category-manager-list">
        {categories.map((c) => (
          <li key={c.id}>
            <input
              type="color"
              value={c.color}
              onChange={(e) => onSetColor(c.id, e.target.value)}
              aria-label={`Cor de ${c.name}`}
            />
            <input
              type="text"
              defaultValue={c.name}
              onBlur={(e) => onRename(c.id, e.target.value)}
              aria-label={`Nome de ${c.name}`}
            />
            <button
              type="button"
              className="remove"
              aria-label={`Excluir ${c.name}`}
              onClick={() => {
                if (window.confirm(`Excluir a categoria "${c.name}"? Ela sai de todas as tarefas.`)) {
                  onRemove(c.id)
                }
              }}
            >
              ✕
            </button>
          </li>
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

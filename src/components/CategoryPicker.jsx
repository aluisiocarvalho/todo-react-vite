import { readableTextColor } from '../lib/color'

// Pills alternáveis para escolher categorias: preenchida = selecionada.
export default function CategoryPicker({ categories, value, onChange }) {
  const selected = new Set(value ?? [])

  function toggle(id) {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    onChange([...next])
  }

  if (categories.length === 0) {
    return <p className="empty">Nenhuma categoria. Crie uma no painel ao lado.</p>
  }

  return (
    <div className="category-picker">
      {categories.map((c) => {
        const on = selected.has(c.id)
        const style = on
          ? { background: c.color, color: readableTextColor(c.color), borderColor: c.color }
          : { color: 'var(--text)', borderColor: c.color }
        return (
          <button
            key={c.id}
            type="button"
            className={`category-pill toggle ${on ? 'on' : ''}`}
            style={style}
            aria-pressed={on}
            onClick={() => toggle(c.id)}
          >
            {c.name}
          </button>
        )
      })}
    </div>
  )
}

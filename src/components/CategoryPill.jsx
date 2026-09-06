import { readableTextColor } from '../lib/color'

// Badge colorido com o nome da categoria; "×" opcional para remover.
export default function CategoryPill({ category, onRemove }) {
  const style = { background: category.color, color: readableTextColor(category.color) }
  return (
    <span className="category-pill" style={style}>
      {category.name}
      {onRemove && (
        <button
          type="button"
          className="pill-remove"
          onClick={onRemove}
          aria-label={`Remover categoria ${category.name}`}
        >
          ×
        </button>
      )}
    </span>
  )
}

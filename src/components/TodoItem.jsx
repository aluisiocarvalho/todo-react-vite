import { useState } from 'react'
import { STATUS, STATUS_ORDER } from '../constants'
import CategoryPill from './CategoryPill'
import CategoryPicker from './CategoryPicker'

export default function TodoItem({
  task,
  categories = [],
  onSetStatus,
  onRemove,
  onEditTitle,
  onToggleCategory,
  onSetCategories,
  canReorder = false,
  dragging = false,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(task.title)
  const [pickingCats, setPickingCats] = useState(false)

  const taskCategoryIds = task.categoryIds ?? []
  const assigned = categories.filter((c) => taskCategoryIds.includes(c.id))

  function commit() {
    setEditing(false)
    if (draft.trim() && draft.trim() !== task.title) onEditTitle(task.id, draft)
    else setDraft(task.title)
  }

  return (
    <li
      className={`todo-item status-${task.status} ${dragging ? 'dragging' : ''}`}
      draggable={canReorder && !editing}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={(e) => canReorder && e.preventDefault()}
      onDragEnd={onDragEnd}
    >
      <div className="todo-item-row">
        {canReorder && (
          <span className="drag-handle" aria-hidden="true" title="Arraste para reordenar">
            ⠿
          </span>
        )}
        <span className="dot" style={{ background: STATUS[task.status].color }} />

        {editing ? (
          <input
            className="edit-input"
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit()
              if (e.key === 'Escape') {
                setDraft(task.title)
                setEditing(false)
              }
            }}
          />
        ) : (
          <span
            className={`title ${task.status === 'done' ? 'done' : ''}`}
            onDoubleClick={() => setEditing(true)}
            title="Duplo clique para editar"
          >
            {task.title}
          </span>
        )}

        <button
          type="button"
          className={`tag-btn ${pickingCats ? 'active' : ''}`}
          onClick={() => setPickingCats((v) => !v)}
          aria-label="Editar categorias"
          aria-pressed={pickingCats}
          disabled={categories.length === 0}
        >
          🏷
        </button>

        <select
          value={task.status}
          onChange={(e) => onSetStatus(task.id, e.target.value)}
          aria-label="Status da tarefa"
        >
          {STATUS_ORDER.map((k) => (
            <option key={k} value={k}>
              {STATUS[k].label}
            </option>
          ))}
        </select>

        <button className="remove" onClick={() => onRemove(task.id)} aria-label="Remover">
          ✕
        </button>
      </div>

      {(assigned.length > 0 || pickingCats) && (
        <div className="todo-item-tags">
          {pickingCats ? (
            <CategoryPicker
              categories={categories}
              value={taskCategoryIds}
              onChange={(ids) => onSetCategories(task.id, ids)}
            />
          ) : (
            assigned.map((c) => (
              <CategoryPill
                key={c.id}
                category={c}
                onRemove={() => onToggleCategory(task.id, c.id)}
              />
            ))
          )}
        </div>
      )}
    </li>
  )
}

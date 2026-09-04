import { useState } from 'react'
import { STATUS, STATUS_ORDER } from '../constants'

export default function TodoItem({ task, onSetStatus, onRemove, onEditTitle }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(task.title)

  function commit() {
    setEditing(false)
    if (draft.trim() && draft.trim() !== task.title) onEditTitle(task.id, draft)
    else setDraft(task.title)
  }

  return (
    <li className={`todo-item status-${task.status}`}>
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
    </li>
  )
}

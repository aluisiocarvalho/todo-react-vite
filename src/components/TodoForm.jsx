import { useState } from 'react'
import CategoryPicker from './CategoryPicker'

export default function TodoForm({ onAdd, categories }) {
  const [title, setTitle] = useState('')
  const [categoryIds, setCategoryIds] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    onAdd(title, categoryIds)
    setTitle('')
    setCategoryIds([])
  }

  return (
    <form className="todo-form-wrap" onSubmit={handleSubmit}>
      <div className="todo-form">
        <input
          type="text"
          placeholder="Nova tarefa..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Título da tarefa"
        />
        <button type="submit">Adicionar</button>
      </div>
      {categories.length > 0 && (
        <CategoryPicker
          categories={categories}
          value={categoryIds}
          onChange={setCategoryIds}
        />
      )}
    </form>
  )
}

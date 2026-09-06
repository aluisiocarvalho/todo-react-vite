import { useState } from 'react'
import TodoItem from './TodoItem'
import TaskSearch from './TaskSearch'
import { useTaskFilter } from '../hooks/useTaskFilter'

export default function TodoList({
  tasks,
  categories,
  onSetStatus,
  onRemove,
  onEditTitle,
  onReorder,
  onToggleCategory,
  onSetCategories,
}) {
  const { query, setQuery, status, setStatus, categoryId, setCategoryId, clear, visible, active } =
    useTaskFilter(tasks)
  const [dragId, setDragId] = useState(null)

  // Só reordena com a lista completa à vista (sem busca/filtro ativos).
  const canReorder = !active

  function handleDragEnter(targetId) {
    if (dragId && dragId !== targetId) onReorder(dragId, targetId)
  }

  return (
    <div className="todo-list">
      <TaskSearch
        query={query}
        status={status}
        categories={categories}
        categoryId={categoryId}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
        onCategoryChange={setCategoryId}
        onClear={clear}
        active={active}
      />

      {visible.length === 0 ? (
        <p className="empty">
          {active ? 'Nenhuma tarefa corresponde à busca.' : 'Nenhuma tarefa aqui.'}
        </p>
      ) : (
        <ul>
          {visible.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              categories={categories}
              onSetStatus={onSetStatus}
              onRemove={onRemove}
              onEditTitle={onEditTitle}
              onToggleCategory={onToggleCategory}
              onSetCategories={onSetCategories}
              canReorder={canReorder}
              dragging={dragId === task.id}
              onDragStart={() => setDragId(task.id)}
              onDragEnter={() => handleDragEnter(task.id)}
              onDragEnd={() => setDragId(null)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

import TodoItem from './TodoItem'
import TaskSearch from './TaskSearch'
import { useTaskFilter } from '../hooks/useTaskFilter'

export default function TodoList({ tasks, onSetStatus, onRemove, onEditTitle }) {
  const { query, setQuery, status, setStatus, clear, visible, active } = useTaskFilter(tasks)

  return (
    <div className="todo-list">
      <TaskSearch
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
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
              onSetStatus={onSetStatus}
              onRemove={onRemove}
              onEditTitle={onEditTitle}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

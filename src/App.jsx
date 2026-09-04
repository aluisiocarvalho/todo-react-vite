import { useTodos } from './hooks/useTodos'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import StatusChart from './components/StatusChart'

export default function App() {
  const {
    tasks,
    addTask,
    removeTask,
    editTitle,
    setStatus,
    clearCompleted,
    counts,
  } = useTodos()

  return (
    <div className="app">
      <header>
        <h1>Todo + Dashboard</h1>
        <p className="subtitle">
          {tasks.length} tarefa(s) &middot; {counts.done} concluída(s)
        </p>
      </header>

      <main className="layout">
        <section className="panel">
          <TodoForm onAdd={addTask} />
          <div className="toolbar">
            <button
              className="ghost"
              onClick={clearCompleted}
              disabled={counts.done === 0}
            >
              Limpar concluídas
            </button>
          </div>
          <TodoList
            tasks={tasks}
            onSetStatus={setStatus}
            onRemove={removeTask}
            onEditTitle={editTitle}
          />
        </section>

        <aside className="panel">
          <StatusChart tasks={tasks} />
        </aside>
      </main>
    </div>
  )
}

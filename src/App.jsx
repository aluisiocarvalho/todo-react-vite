import { useTodos } from './hooks/useTodos'
import { useTheme } from './hooks/useTheme'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import StatusChart from './components/StatusChart'

export default function App() {
  const { theme, toggle } = useTheme()
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
      <header className="app-header">
        <div>
          <h1>Todo + Dashboard</h1>
          <p className="subtitle">
            {tasks.length} tarefa(s) &middot; {counts.done} concluída(s)
          </p>
        </div>
        <button
          type="button"
          className="theme-toggle ghost"
          onClick={toggle}
          aria-label="Alternar tema"
        >
          {theme === 'dark' ? '☀️ Claro' : '🌙 Escuro'}
        </button>
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

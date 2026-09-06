import { useCallback } from 'react'
import { useTodos } from './hooks/useTodos'
import { useTheme } from './hooks/useTheme'
import { useCategories } from './hooks/useCategories'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import StatusChart from './components/StatusChart'
import CategoryManager from './components/CategoryManager'

export default function App() {
  const { theme, toggle } = useTheme()
  const {
    tasks,
    addTask,
    removeTask,
    editTitle,
    setStatus,
    clearCompleted,
    reorderTasks,
    setTaskCategories,
    toggleTaskCategory,
    removeCategoryFromTasks,
    counts,
  } = useTodos()
  const { categories, addCategory, renameCategory, setCategoryColor, removeCategory } =
    useCategories()

  // Excluir uma categoria também a remove de todas as tarefas.
  const handleRemoveCategory = useCallback(
    (id) => {
      removeCategory(id)
      removeCategoryFromTasks(id)
    },
    [removeCategory, removeCategoryFromTasks],
  )

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
          <TodoForm onAdd={addTask} categories={categories} />
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
            categories={categories}
            onSetStatus={setStatus}
            onRemove={removeTask}
            onEditTitle={editTitle}
            onReorder={reorderTasks}
            onToggleCategory={toggleTaskCategory}
            onSetCategories={setTaskCategories}
          />
        </section>

        <aside className="panel">
          <StatusChart tasks={tasks} categories={categories} />
          <CategoryManager
            categories={categories}
            onAdd={addCategory}
            onRename={renameCategory}
            onSetColor={setCategoryColor}
            onRemove={handleRemoveCategory}
          />
        </aside>
      </main>
    </div>
  )
}

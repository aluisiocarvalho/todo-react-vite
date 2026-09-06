import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getStatusCounts, getCategoryCounts } from '../lib/todoStats'

export default function StatusChart({ tasks, categories = [] }) {
  const [view, setView] = useState('status') // 'status' | 'category'

  const data =
    view === 'category' ? getCategoryCounts(tasks, categories) : getStatusCounts(tasks)
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const title = view === 'category' ? 'Tarefas por categoria' : 'Status das tarefas'

  return (
    <div className="status-chart card">
      <h2>{title}</h2>

      <div className="filters chart-toggle">
        <button
          type="button"
          className={view === 'status' ? 'active' : ''}
          onClick={() => setView('status')}
        >
          Status
        </button>
        <button
          type="button"
          className={view === 'category' ? 'active' : ''}
          onClick={() => setView('category')}
        >
          Categorias
        </button>
      </div>

      {total === 0 ? (
        <p className="empty">
          {view === 'category'
            ? 'Nenhuma tarefa categorizada ainda.'
            : 'Nenhuma tarefa ainda. Adicione uma para ver o gráfico.'}
        </p>
      ) : (
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={(d) => (d.value > 0 ? `${d.value}` : '')}
              >
                {data.map((entry) => (
                  <Cell key={entry.key} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} tarefa(s)`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <ul className="chart-legend">
        {data.map((d) => (
          <li key={d.key}>
            <span className="dot" style={{ background: d.color }} />
            {d.name}: <strong>{d.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

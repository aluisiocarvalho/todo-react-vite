import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getStatusCounts } from '../lib/todoStats'

export default function StatusChart({ tasks }) {
  const data = getStatusCounts(tasks)
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="status-chart card">
      <h2>Status das tarefas</h2>

      {total === 0 ? (
        <p className="empty">Nenhuma tarefa ainda. Adicione uma para ver o gráfico.</p>
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

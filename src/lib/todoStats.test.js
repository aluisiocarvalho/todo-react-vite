import { describe, it, expect } from 'vitest'
import { getCategoryCounts } from './todoStats'

const categories = [
  { id: 'a', name: 'Trabalho', color: '#111111' },
  { id: 'b', name: 'Pessoal', color: '#222222' },
]

describe('getCategoryCounts', () => {
  it('conta tarefas por categoria, incluindo as de contagem zero', () => {
    const tasks = [{ categoryIds: ['a'] }, { categoryIds: ['a'] }]
    const r = getCategoryCounts(tasks, categories)
    expect(r.find((d) => d.key === 'a').value).toBe(2)
    expect(r.find((d) => d.key === 'b').value).toBe(0)
  })

  it('uma tarefa com várias tags conta em cada uma', () => {
    const r = getCategoryCounts([{ categoryIds: ['a', 'b'] }], categories)
    expect(r.find((d) => d.key === 'a').value).toBe(1)
    expect(r.find((d) => d.key === 'b').value).toBe(1)
  })

  it('adiciona "Sem categoria" só quando houver tarefas sem tag válida', () => {
    const semTag = getCategoryCounts([{ categoryIds: [] }, { categoryIds: ['x'] }], categories)
    const none = semTag.find((d) => d.key === '__none__')
    expect(none.value).toBe(2)

    const todasComTag = getCategoryCounts([{ categoryIds: ['a'] }], categories)
    expect(todasComTag.find((d) => d.key === '__none__')).toBeUndefined()
  })
})

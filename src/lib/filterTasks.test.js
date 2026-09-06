import { describe, it, expect } from 'vitest'
import { filterTasks } from './filterTasks'

const tasks = [
  { id: '1', title: 'Comprar pão', status: 'todo', categoryIds: ['casa'] },
  { id: '2', title: 'Pagar conta de luz', status: 'doing', categoryIds: ['casa', 'financas'] },
  { id: '3', title: 'Entregar relatório', status: 'done', categoryIds: ['trabalho'] },
  { id: '4', title: 'Comprar leite', status: 'done' },
]

describe('filterTasks', () => {
  it('retorna tudo sem filtro', () => {
    expect(filterTasks(tasks)).toHaveLength(4)
  })

  it('filtra por texto no título (case-insensitive)', () => {
    const r = filterTasks(tasks, { query: 'COMPRAR' })
    expect(r.map((t) => t.id)).toEqual(['1', '4'])
  })

  it('filtra por status', () => {
    const r = filterTasks(tasks, { status: 'done' })
    expect(r.map((t) => t.id)).toEqual(['3', '4'])
  })

  it('combina texto e status', () => {
    const r = filterTasks(tasks, { query: 'comprar', status: 'done' })
    expect(r.map((t) => t.id)).toEqual(['4'])
  })

  it('filtra por categoria', () => {
    const r = filterTasks(tasks, { categoryId: 'casa' })
    expect(r.map((t) => t.id)).toEqual(['1', '2'])
  })

  it('combina categoria com texto e status', () => {
    const r = filterTasks(tasks, { categoryId: 'casa', status: 'doing', query: 'luz' })
    expect(r.map((t) => t.id)).toEqual(['2'])
  })

  it('categoryId "all" ou ausente não filtra por categoria', () => {
    expect(filterTasks(tasks, { categoryId: 'all' })).toHaveLength(4)
    expect(filterTasks(tasks, {})).toHaveLength(4)
  })

  it('ignora status inválido e lista vazia/undefined (edge case)', () => {
    expect(filterTasks(tasks, { status: 'xpto' })).toHaveLength(4)
    expect(filterTasks(undefined)).toEqual([])
    expect(filterTasks(tasks, { query: 'nada disso' })).toEqual([])
  })
})

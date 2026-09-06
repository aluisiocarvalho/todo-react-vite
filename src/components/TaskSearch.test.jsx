import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskSearch from './TaskSearch'

function setup(props = {}) {
  const onQueryChange = vi.fn()
  const onStatusChange = vi.fn()
  const onClear = vi.fn()
  const onCategoryChange = vi.fn()
  render(
    <TaskSearch
      query=""
      status="all"
      categories={[]}
      categoryId="all"
      onQueryChange={onQueryChange}
      onStatusChange={onStatusChange}
      onCategoryChange={onCategoryChange}
      onClear={onClear}
      active={false}
      {...props}
    />,
  )
  return { onQueryChange, onStatusChange, onClear, onCategoryChange }
}

describe('TaskSearch', () => {
  it('renderiza o campo de busca e os botões de status', () => {
    setup()
    expect(screen.getByLabelText('Buscar tarefa')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Todas' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Concluída' })).toBeInTheDocument()
  })

  it('dispara onQueryChange ao digitar e onStatusChange ao clicar num status', async () => {
    const user = userEvent.setup()
    const { onQueryChange, onStatusChange } = setup()
    await user.type(screen.getByLabelText('Buscar tarefa'), 'x')
    expect(onQueryChange).toHaveBeenCalledWith('x')
    await user.click(screen.getByRole('button', { name: 'Concluída' }))
    expect(onStatusChange).toHaveBeenCalledWith('done')
  })

  it('só mostra "Limpar busca" quando há filtro ativo (edge case)', async () => {
    const user = userEvent.setup()
    const { onClear } = setup({ active: true })
    const btn = screen.getByRole('button', { name: 'Limpar busca' })
    await user.click(btn)
    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it('esconde "Limpar busca" sem filtro ativo', () => {
    setup({ active: false })
    expect(screen.queryByRole('button', { name: 'Limpar busca' })).not.toBeInTheDocument()
  })

  it('mostra o filtro de categoria e dispara onCategoryChange', async () => {
    const user = userEvent.setup()
    const { onCategoryChange } = setup({
      categories: [{ id: 'c1', name: 'Trabalho', color: '#000' }],
    })
    const select = screen.getByLabelText('Filtrar por categoria')
    await user.selectOptions(select, 'c1')
    expect(onCategoryChange).toHaveBeenCalledWith('c1')
  })

  it('esconde o filtro de categoria quando não há categorias', () => {
    setup({ categories: [] })
    expect(screen.queryByLabelText('Filtrar por categoria')).not.toBeInTheDocument()
  })
})

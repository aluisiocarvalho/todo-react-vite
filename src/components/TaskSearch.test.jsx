import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskSearch from './TaskSearch'

function setup(props = {}) {
  const onQueryChange = vi.fn()
  const onStatusChange = vi.fn()
  const onClear = vi.fn()
  render(
    <TaskSearch
      query=""
      status="all"
      onQueryChange={onQueryChange}
      onStatusChange={onStatusChange}
      onClear={onClear}
      active={false}
      {...props}
    />,
  )
  return { onQueryChange, onStatusChange, onClear }
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
})

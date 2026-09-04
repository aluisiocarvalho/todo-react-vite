# Todo + Dashboard

App de lista de tarefas em React (Vite) com gráfico de pizza (Recharts) para
acompanhar a distribuição das tarefas por status. Os dados ficam salvos no
`localStorage` do navegador.

## Pré-requisito

Node.js LTS (18+). Instale em https://nodejs.org e reabra o terminal.
Verifique: `node -v` e `npm -v`.

## Rodando

```bash
cd todo
npm install
npm run dev
```

Abra o endereço mostrado no terminal (geralmente http://localhost:5173).

## Build de produção

```bash
npm run build
npm run preview
```

## Funcionalidades

- Criar, editar (duplo clique no título), remover tarefas
- Status: A fazer / Em progresso / Concluída (seletor em cada item)
- Filtro por status
- "Limpar concluídas"
- Gráfico de pizza com a contagem por status, atualizado em tempo real
- Persistência automática no `localStorage` (chave `todo.tasks`)

## Estrutura

```
src/
  constants.js              status, cores, chave de storage
  hooks/useLocalStorage.js  persistência genérica
  hooks/useTodos.js         estado e ações das tarefas
  lib/todoStats.js          contagem por status para o gráfico
  components/
    TodoForm.jsx
    TodoList.jsx
    TodoItem.jsx
    StatusChart.jsx
```

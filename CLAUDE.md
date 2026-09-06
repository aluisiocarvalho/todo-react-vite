# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Escreva todo o conteúdo deste arquivo em português. Mantenha os comentários nos componentes sucintos (uma linha).

## Ambiente

- **Este projeto NÃO pode ficar dentro de um caminho do Google Drive** (`G:\Meu Drive\...`). O `npm install` falha lá com erros `EBADF`/`EPERM` de escrita. Foi movido para cá (`C:\Users\semarh\Documents\01- ALUISIO\Todo`) por isso.
- Node.js v24 / npm 11 estão instalados, mas **fora do PATH em shells não-interativos**. No Bash, prefixe `/c/Program Files/nodejs`; no PowerShell, recarregue o PATH das variáveis de Máquina + Usuário.
- O npm aqui tem trava de scripts de instalação. Depois do `npm install`, o postinstall do esbuild é pulado — rode `node node_modules/esbuild/install.js` uma vez ou o Vite não inicia.

## Comandos

```bash
npm install                         # depois: node node_modules/esbuild/install.js
npm run dev                          # servidor de dev em http://localhost:5173
npm run build                       # build de produção em dist/
npm run preview                     # serve o dist/ já buildado
```

Não há runner de testes nem linter configurado.

## Arquitetura

SPA em React 18 + Vite. Lista de tarefas com um gráfico de pizza (Recharts) do status das tarefas em tempo real. Sem backend — o estado persiste no `localStorage`.

- **Fonte única de estado: `src/hooks/useTodos.js`** — dono do array de tarefas e de todas as mutações (`addTask`, `removeTask`, `editTitle`, `setStatus`, `clearCompleted`, `reorderTasks`) mais um `counts` derivado. A ordem do array é a ordem exibida e persiste no `localStorage`; o drag-and-drop (nativo HTML5, em `TodoItem`/`TodoList`) só funciona sem busca/filtro ativos. O `App.jsx` chama esse hook uma vez e passa os callbacks para baixo; os demais componentes são sem estado, exceto por estado local de UI (input do formulário, filtro, rascunho de edição inline).
- **Persistência: `src/hooks/useLocalStorage.js`** — wrapper genérico de `useState` que hidrata a partir do `localStorage` e escreve nele (chave `todo.tasks`, definida em `constants.js`). Ignora erros de JSON/quota.
- **`src/constants.js`** — o mapa `STATUS` (`todo` / `doing` / `done` → label + cor hex) e `STATUS_ORDER`. É a definição canônica de status; o gráfico, o `<select>` do item e os filtros derivam dela. Adicionar ou renomear um status aqui propaga para todo o resto. Também define `DEFAULT_CATEGORIES` e `COLOR_SWATCHES`.
- **Categorias (tags): `src/hooks/useCategories.js`** — dono da lista de categorias `{ id, name, color }`, persistida no `localStorage` (chave `todo.categories`). O usuário cria/renomeia/recolore/exclui pelo `CategoryManager.jsx` no `aside`. Cada tarefa tem `categoryIds: string[]` (várias tags). **Excluir uma categoria é cascade**: `App.jsx` chama `removeCategory` (no hook de categorias) + `removeCategoryFromTasks` (em `useTodos`) juntos. Componentes leem sempre `task.categoryIds ?? []` (sem migração de dados antigos).
- **`src/lib/todoStats.js`** — funções puras `getStatusCounts(tasks)` e `getCategoryCounts(tasks, categories)`; pontes entre o estado e o `StatusChart.jsx` (que alterna entre as duas visões). Sempre retornam todas as chaves, inclusive as de contagem zero.
- **`src/lib/id.js`** — `newId()` compartilhado (`crypto.randomUUID()` com fallback), usado por `useTodos` e `useCategories`.
- Formato da tarefa: `{ id, title, status, categoryIds, createdAt, updatedAt }`.

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

- **Fonte única de estado: `src/hooks/useTodos.js`** — dono do array de tarefas e de todas as mutações (`addTask`, `removeTask`, `editTitle`, `setStatus`, `clearCompleted`) mais um `counts` derivado. O `App.jsx` chama esse hook uma vez e passa os callbacks para baixo; os demais componentes são sem estado, exceto por estado local de UI (input do formulário, filtro, rascunho de edição inline).
- **Persistência: `src/hooks/useLocalStorage.js`** — wrapper genérico de `useState` que hidrata a partir do `localStorage` e escreve nele (chave `todo.tasks`, definida em `constants.js`). Ignora erros de JSON/quota.
- **`src/constants.js`** — o mapa `STATUS` (`todo` / `doing` / `done` → label + cor hex) e `STATUS_ORDER`. É a definição canônica de status; o gráfico, o `<select>` do item e os filtros derivam dela. Adicionar ou renomear um status aqui propaga para todo o resto.
- **`src/lib/todoStats.js`** — função pura `getStatusCounts(tasks)`; única ponte entre o estado das tarefas e o `StatusChart.jsx`. Sempre retorna todos os status, inclusive os de contagem zero.
- Formato da tarefa: `{ id, title, status, createdAt, updatedAt }`, `id` via `crypto.randomUUID()`.

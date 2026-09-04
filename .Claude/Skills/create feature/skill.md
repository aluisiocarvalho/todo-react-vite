---

name: create-feature

description: >

 Cria uma feature completa com componente, tipos e testes seguindo os padrões

 do projeto. Use quando pedirem para criar uma feature, módulo ou

 funcionalidade nova.

allowed-tools: Read, Write, Edit, Bash, Glob, Grep

argument-hint: [nome-da-feature] [descrição]

---

# Criar Feature Completa

Você vai gerar uma feature completa para este projeto. Siga os passos na ordem.

## Passo 1: Entender o projeto

Antes de escrever qualquer código:

1. Leia o `package.json` para identificar framework, styling e testing
2. Use Glob para encontrar componentes existentes e entender a estrutura de pastas
3. Leia 1-2 componentes existentes como referência de padrão

Mostre um resumo breve do que encontrou antes de continuar.

## Passo 2: Planejar

Liste os arquivos que serão criados com o caminho completo.
Diga qual arquivo existente está usando como referência de padrão.

**Espere o usuário confirmar antes de codar.**

## Passo 3: Criar os arquivos

Crie todos os arquivos da feature:

- **Componente** — seguindo o mesmo padrão dos existentes (mesmo estilo de função, export, styling)
- **Tipos** — tipagem estrita, sem `any`
- **Testes** — mínimo 3 testes: renderiza, interação principal funciona, edge case

Regras:

- Seguir EXATAMENTE o estilo de código que já existe no projeto
- Não inventar padrões novos
- Incluir estado vazio ("nenhum resultado") quando aplicável

## Passo 4: Validar

1. Rode o lint do projeto (se existir)
2. Rode os testes que você criou
3. Corrija qualquer erro antes de finalizar

## Passo 5: Resumo

Finalize com:

```
✅ Feature "$ARGUMENTS" criada!

Arquivos criados:

- [caminho/componente]
- [caminho/tipos]
- [caminho/testes]

Próximos passos:

- [ ] Importar o componente em [arquivo pai]

```
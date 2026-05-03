# Tarefas Prontas

Executar uma tarefa por vez.

## Tarefa 1: estabilizar base

Corrigir TypeScript, build, textos com codificação corrompida e remover upload prematuro do formulário público.

Critério:

- `npm run typecheck` passa.
- `npm run build` passa ou bloqueio externo é documentado.
- Formulário público não contém upload.

## Tarefa 2: criar tipos de estatísticas públicas

Criar tipos em:

```txt
src/features/public-cases/types/case-stats.types.ts
```

Os tipos devem representar apenas dados agregados.

## Tarefa 3: criar mock de estatísticas

Criar mock em:

```txt
src/features/public-cases/data/mock-case-stats.ts
```

Os dados devem ser fictícios e identificados como demonstrativos.

## Tarefa 4: criar componentes da página estatística

Criar cards, gráficos, tabela por cidade e aviso público.

## Tarefa 5: montar rota pública

Criar:

```txt
src/app/casos/[caseSlug]/estatisticas/page.tsx
```

Não implementar banco, login, upload ou documentos.

## Tarefa 6: ajustar formulário inicial

Adaptar o formulário para relato inicial sem upload e com aviso LGPD.

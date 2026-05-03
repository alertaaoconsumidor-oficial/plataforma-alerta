# Plano de Implementação

## Fase 0: saneamento

Objetivo: deixar documentação e código prontos para evolução.

Tarefas:

- Consolidar documentação.
- Remover blueprint legado.
- Corrigir codificação de textos.
- Corrigir TypeScript.
- Corrigir build no Windows.
- Remover upload prematuro do formulário.
- Criar `.env.example`.
- Verificar estado do Git.

Critério de aceite:

- `npm run typecheck` passa.
- `npm run build` passa ou bloqueio externo está documentado.
- Documentação está sintética e em português do Brasil.

## Fase 1: estatísticas públicas demonstrativas

Objetivo: criar primeira entrega funcional sem risco de LGPD.

Status: implementada a primeira versão demonstrativa em `/casos/varejo-digital-demo/estatisticas`.

Rota recomendada:

```txt
/casos/[caseSlug]/estatisticas
```

Conteúdo:

- cabeçalho do caso;
- aviso de dados demonstrativos;
- cards agregados;
- gráficos;
- tabela por cidade/Estado;
- aviso LGPD.

Não incluir:

- login;
- banco;
- upload;
- documentos;
- dados reais.

## Fase 2: formulário inicial sem upload

Objetivo: receber pré-relatos sem documentos.

Campos:

- empresa reclamada;
- cidade;
- estado;
- valor aproximado;
- data aproximada;
- tipo de problema;
- resumo;
- aceite dos termos.

Enquanto não houver backend, o envio deve ser simulado.

## Fase 3: backend e persistência

Decidir entre Supabase/PostgreSQL e Firebase.

Regra:

- relatos são privados;
- página pública lê apenas estatísticas agregadas.

## Fase 4 em diante

1. Autenticação e área da vítima.
2. Moderação.
3. Upload privado.
4. Dossiês.
5. Direito de resposta.
6. Segurança avançada.

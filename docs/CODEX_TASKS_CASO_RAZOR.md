# Tarefas Codex: CASO RAZOR como Caso Inicial

## Tarefa R1: atualizar AGENTS.md com diretriz do CASO RAZOR

```txt
Atualize o AGENTS.md para incluir a diretriz estratégica do CASO RAZOR como caso inicial.

Incluir:
- o CASO RAZOR é o foco operacional inicial
- a empresa encerrada/inativa é eixo documental, não único alvo
- não usar linguagem acusatória
- não publicar nomes de sócios ou vítimas
- não publicar documentos
- usar dados agregados e preliminares
- preservar direito de resposta
- direcionar vítimas ao formulário oficial

Preservar todas as instruções já existentes.
```

## Tarefa R2: criar página pública CASO RAZOR

```txt
Crie a página pública do CASO RAZOR.

Rota preferencial:
src/app/(public)/casos/razor/page.tsx

Se não houver route groups:
src/app/casos/razor/page.tsx

Conteúdo:
- título: CASO RAZOR
- subtítulo: caso inicial do Alerta ao Consumidor
- texto explicando que a empresa está encerrada/inativa, mas os relatos permanecem relevantes para documentação coletiva
- chamada para registrar relato
- cards com dados agregados preliminares
- link para estatísticas
- link para direito de resposta
- aviso de privacidade
- aviso de que a plataforma não declara culpa definitiva

Não mencionar sócios.
Não publicar documentos.
Não usar termos como golpe, golpista, criminoso, roubo ou fraude comprovada.
```

## Tarefa R3: criar dados preliminares agregados do CASO RAZOR

```txt
Crie um arquivo de dados preliminares agregados para o CASO RAZOR.

Arquivo:
src/features/public-cases/data/razor-preliminary-stats.ts

Usar o tipo PublicCaseStats, se já existir.

Campos:
- totalReports
- totalVictims
- totalEstimatedLoss
- averageLoss
- affectedCities
- affectedStates
- averageDaysUnresolved
- longestDaysUnresolved
- reportsWithDocuments
- reportsWithPaymentProof
- reportsWithContract
- reportsWithMessages
- reportsWithProtocol
- statusDistribution
- lossRanges
- monthlyReports
- cities
- problemTypes
- lastUpdatedAt

Os dados devem ser agregados.
Não inserir dados pessoais.
Não inserir documentos.
Não inserir nomes de vítimas.
Usar comentários indicando onde substituir por dados reais autorizados.
```

## Tarefa R4: adaptar página estatística para /casos/razor/estatisticas

```txt
Crie ou adapte a página estatística do CASO RAZOR em:

src/app/(public)/casos/razor/estatisticas/page.tsx

A página deve usar dados de razor-preliminary-stats.ts e exibir:
- cards principais
- evolução mensal
- status dos relatos
- faixas de prejuízo
- documentação informada
- ranking de cidades
- aviso de dados preliminares
- aviso LGPD

Não exibir dados pessoais.
```

## Tarefa R5: criar página de direito de resposta do CASO RAZOR

```txt
Crie a página:

src/app/(public)/casos/razor/direito-de-resposta/page.tsx

Conteúdo:
- explicação sobre canal de manifestação
- quem pode se manifestar: empresa, representante legal, administrador judicial, compliance, empresas mencionadas
- aviso de que respostas serão analisadas antes de publicação
- aviso de proteção de dados
- e-mail placeholder para contato, caso ainda não exista formulário

Não permitir publicação automática.
Não implementar upload nesta tarefa.
```

## Tarefa R6: adaptar formulário Registrar Caso para foco RAZOR

```txt
Atualize a página /registrar-caso para mostrar que o foco operacional inicial é o CASO RAZOR.

Adicionar:
- aviso sobre foco inicial
- campo caseSlug com valor padrão "razor" ou seleção travada, conforme estágio atual
- texto de privacidade
- texto de que documentos não serão solicitados nessa fase
- texto de que o relato não será publicado automaticamente

Não implementar upload.
```

## Tarefa R7: criar aviso sobre empresa encerrada/inativa

```txt
Crie um componente reutilizável:

src/features/public-cases/components/ClosedCompanyNotice.tsx

Texto base:
"A empresa encontra-se encerrada/inativa, conforme informações disponíveis, mas os relatos de consumidores permanecem relevantes para fins de documentação coletiva, preservação de provas, identificação de padrões e eventual encaminhamento jurídico ou institucional."

O componente deve ser usado na página do CASO RAZOR.
```

## Tarefa R8: criar política de foco em outros casos futuros

```txt
Crie uma seção na página /orientacoes ou /casos explicando:

- o foco operacional inicial é o CASO RAZOR
- outros casos poderão ser avaliados futuramente
- novos casos exigem volume mínimo de relatos, documentação e capacidade de moderação
- não misturar estatísticas de empresas diferentes

Usar linguagem institucional.
```

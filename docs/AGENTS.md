# Instruções Para Agentes

## Projeto

Nome: Alerta ao Consumidor.

Objetivo: construir uma plataforma independente, educativa e documental para registrar relatos de consumidores, organizar informações privadas, gerar estatísticas públicas agregadas e apoiar encaminhamentos responsáveis.

O projeto não é tribunal público, órgão fiscalizador, ferramenta de exposição, constrangimento ou ataque coordenado.

## Estado atual

O site possui identidade visual definida, páginas públicas, formulário simulado e dados mockados. Ainda não existe backend real, autenticação, moderação, storage privado, auditoria ou fluxo seguro para documentos.

## Stack atual

- Next.js com App Router.
- TypeScript.
- Tailwind CSS.
- Radix/shadcn.
- Recharts.
- React Hook Form + Zod.
- Firebase e Genkit instalados, ainda sem decisão final de uso funcional.

## Regras obrigatórias

1. Página pública mostra somente dados agregados, anonimizados e moderados.
2. Relatos individuais, documentos e dados pessoais nunca são fonte direta de tela pública.
3. Nenhum documento deve ser público por padrão.
4. Não criar upload antes de autenticação, storage privado, autorização, logs e moderação.
5. Não publicar relato automaticamente.
6. Toda ação administrativa sensível deve gerar log quando a camada existir.
7. Manter linguagem institucional, moderada e não acusatória.
8. Preservar direito de resposta da empresa ou representante legal.
9. Não inserir segredos, tokens ou credenciais no código.
10. Não avançar fase se `typecheck` ou build estiverem quebrados sem justificativa registrada.

## Ordem de implementação

1. Estabilizar código e documentação.
2. Criar página estatística pública com dados mockados e aviso demonstrativo.
3. Ajustar formulário inicial sem upload.
4. Definir backend.
5. Persistir relatos privados.
6. Gerar estatísticas agregadas.
7. Criar autenticação e área da vítima.
8. Criar moderação.
9. Liberar upload privado.
10. Criar dossiês.
11. Criar direito de resposta.
12. Adicionar segurança avançada.

## Critérios de conclusão

Uma tarefa só termina quando:

- `npm run typecheck` passa;
- `npm run build` passa ou o bloqueio está documentado;
- não há dados pessoais em páginas públicas;
- não há upload ou documento público indevido;
- textos públicos estão em português do Brasil e com linguagem neutra;
- a alteração é pequena, revisável e coerente com a identidade visual atual.

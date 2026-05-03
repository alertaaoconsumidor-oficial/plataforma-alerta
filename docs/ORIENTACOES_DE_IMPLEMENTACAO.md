# Orientações de Implementação

## Objetivo

O Alerta ao Consumidor deve orientar consumidores, receber relatos de forma responsável, organizar informações privadas e publicar apenas estatísticas agregadas. A plataforma deve informar e documentar, sem acusar, julgar ou expor pessoas indevidamente.

## Diretriz principal

```txt
Público: dados agregados, anonimizados e moderados.
Vítima: seus próprios relatos e documentos.
Moderação: revisão e aprovação das versões públicas.
Administração/jurídico: acesso restrito e auditado.
Documentos: privados por padrão.
```

## Ordem obrigatória

1. Corrigir documentação e base técnica.
2. Criar página pública de estatísticas com dados demonstrativos.
3. Ajustar formulário inicial sem upload.
4. Definir backend.
5. Persistir relatos privados.
6. Gerar estatísticas agregadas.
7. Criar autenticação e área da vítima.
8. Criar moderação.
9. Implementar upload privado.
10. Gerar dossiês.
11. Criar direito de resposta.
12. Reforçar segurança, logs, backups, rate limit e monitoramento.

## O que não fazer agora

- Não criar upload público.
- Não publicar relatos automaticamente.
- Não expor documentos.
- Não criar listagem pública de vítimas.
- Não buscar por CPF.
- Não criar mapa com localização precisa.
- Não implementar painel jurídico antes de autenticação e permissões.
- Não usar linguagem acusatória em tela pública.

## Critério de aceite

Toda entrega deve passar por:

- `npm run typecheck`;
- `npm run build`;
- revisão de LGPD;
- revisão de linguagem;
- teste manual da tela afetada;
- atualização de documentação quando houver mudança de direção.

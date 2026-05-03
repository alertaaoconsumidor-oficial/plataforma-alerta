# Status Atual do Projeto

Data da análise: 2026-05-03.

## Resumo

O projeto está em estágio de protótipo visual. A identidade visual amarela e preta, a logo e o assistente flutuante já estão definidos e devem ser preservados nas próximas implementações.

## Implementado

- Next.js com App Router.
- Layout público com header, footer, logo e botão flutuante do assistente.
- Página inicial.
- Página pública por empresa.
- Página de envio de relato com validação client-side e envio simulado.
- Páginas institucionais: metodologia, aviso legal e contato.
- Tela visual de acesso administrativo.
- Dados mockados em `src/lib/seed-data.ts`.
- Camada fake de API em `src/lib/api.ts`.

## Ainda não implementado

- Banco de dados real.
- Autenticação.
- Autorização por papel.
- Área da vítima.
- Moderação real.
- Persistência de relatos.
- Storage privado.
- Upload seguro de documentos.
- Logs de auditoria.
- Estatísticas reais agregadas.
- Direito de resposta funcional.
- Dossiês.

## Saneamento técnico realizado

- `npm run typecheck` passa.
- `npm run build` passa.
- O script de build foi ajustado para funcionar no Windows.
- O build não ignora mais erros de TypeScript pelo `next.config.ts`.
- O formulário público não exibe mais campo de upload.
- O título global foi ajustado para linguagem institucional.
- Textos críticos com codificação corrompida foram revisados.

## Pendência técnica

O script `npm run lint` ainda não é uma validação automatizada, pois `next lint` abre um prompt interativo de configuração. A próxima decisão técnica deve ser configurar ESLint explicitamente ou remover o script até a configuração existir.

## Próxima meta

Deixar a base limpa, compilando e pronta para a primeira implementação segura: página pública de estatísticas demonstrativas com dados agregados.

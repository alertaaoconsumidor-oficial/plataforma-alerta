# Arquitetura

## Princípio central

A página pública nunca deve consultar dados pessoais, documentos ou relatos privados diretamente.

Fluxo correto:

```txt
Relatos privados
  -> banco privado
  -> rotina de agregação
  -> estatísticas públicas
  -> página pública
```

## Camadas

### Pública

Pode exibir:

- nome da empresa ou caso;
- CNPJ quando aplicável;
- total de relatos;
- total estimado de consumidores afetados;
- valores estimados agregados;
- cidades e estados agregados;
- gráficos e tabelas agregadas;
- direito de resposta aprovado.

Não pode exibir:

- nome completo da vítima;
- CPF, RG, e-mail, telefone ou endereço;
- documentos;
- prints;
- dados bancários;
- localização precisa;
- relato privado bruto.

### Privada da vítima

Permite criar e acompanhar o próprio relato, aceitar termos, solicitar correção ou exclusão e, em fase futura, anexar documentos privados.

### Moderação

Permite revisar relatos, remover dados pessoais, criar versão pública anonimizada e registrar decisões.

### Administração/jurídico

Permite consultar casos autorizados, gerar dossiês e registrar encaminhamentos, sempre com permissão e auditoria.

## Estrutura recomendada

```txt
src/
  app/
    casos/[caseSlug]/estatisticas/
    enviar-relato/
    empresa/[slug]/
    admin/
  features/
    public-cases/
    reports/
    moderation/
    dossiers/
  lib/
    auth/
    db/
    storage/
    audit/
    security/
    formatting/
```

## Decisão pendente

O backend ainda precisa ser definido. Supabase/PostgreSQL é recomendado para agregações, RLS e relatórios. Firebase é aceitável se as regras de segurança e agregações forem desenhadas antes de usar dados reais.

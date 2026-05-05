# Arquitetura Escalavel da Plataforma

Este documento registra a decisao estrutural para que o Alerta ao Consumidor possa crescer alem do Caso Razor, recebendo milhares de empresas e milhoes de relatos sem perder clareza, performance, cautela juridica e capacidade operacional.

## Problema Central

Se cada empresa ganhar uma pagina artesanal com todos os recursos do Caso Razor, a plataforma se torna inviavel.

Tambem nao e sustentavel pesquisar manualmente cada CNPJ informado por consumidores, gerar PDF da Receita Federal para todos eles e manter relacoes empresariais complexas sem criterio de confianca.

Portanto, a plataforma precisa operar com:

- templates dinamicos;
- dados agregados;
- niveis de exibicao;
- relacao cautelosa entre marca, CNPJ e caso publico;
- moderacao antes de publicacao;
- CNPJs com status de conferencia;
- casos especiais apenas quando houver justificativa.

## Principio de Apresentacao Publica

A pagina publica deve responder:

```txt
O que esta sendo relatado?
Qual empresa/marca foi informada?
Quais CNPJs aparecem nos relatos ou fontes?
Qual e o volume agregado?
Onde os relatos se concentram?
Quais problemas se repetem?
Existem fontes publicas relevantes?
A empresa tem direito de resposta?
Como o consumidor pode relatar com responsabilidade?
```

A pagina publica nao deve:

```txt
Declarar culpa definitiva.
Expor dados pessoais.
Publicar documentos privados.
Confundir CNPJs relacionados com responsabilidade juridica automatica.
Transformar informacao preliminar em acusacao.
```

## Camadas de Informacao

### 1. Busca e descoberta

Home, busca global e paginas de listagem.

Objetivo:

- ajudar o consumidor a encontrar empresa, marca ou caso;
- sugerir empresas com relatos recentes;
- exibir indicadores gerais da plataforma;
- direcionar para relato ou consulta.

### 2. Empresa

Rota padrao:

```txt
/empresa/[slug]
```

Objetivo:

- apresentar informacoes basicas da marca ou empresa;
- consolidar relatos moderados;
- exibir indicadores proporcionais ao volume;
- permitir direito de resposta;
- abrir caminho para pagina de relatos.

Nem toda empresa precisa de hero premium, reportagens, dossie ou frente solidaria.

### 3. Relatos da empresa

Rota padrao:

```txt
/empresa/[slug]/relatos
```

Objetivo:

- suportar muitos relatos;
- oferecer filtros;
- ordenar por relevancia, data, prejuizo e documentacao;
- paginar resultados;
- abrir relato completo moderado.

Essa rota evita que a pagina principal da empresa fique pesada.

### 4. Caso publico

Rota especial:

```txt
/casos/[slug]
```

Objetivo:

- organizar caso de alta relevancia;
- apresentar linha do tempo;
- mapa;
- reportagens;
- fontes publicas;
- indicadores premium;
- frente de organizacao coletiva;
- dossie.

Exemplo atual:

```txt
/casos/razor
```

### 5. Relatos do caso publico

Rota especial:

```txt
/casos/[slug]/relatos
```

Objetivo:

- separar a massa de relatos do resumo executivo;
- permitir filtros e paginacao;
- preservar performance;
- organizar milhares de relatos sem poluir o caso principal.

## Criterios para Promover uma Empresa a Caso Publico

Uma empresa ou marca so deve virar caso publico quando houver pelo menos um dos criterios:

- volume relevante de relatos;
- padrao recorrente de problema;
- prejuizo agregado expressivo;
- varias cidades ou estados;
- fonte publica relevante;
- encerramento, inatividade ou dificuldade de resposta;
- interesse coletivo evidente;
- necessidade de dossie;
- decisao editorial/admin.

## Estrategia para CNPJs

### O que pode entrar automaticamente

- CNPJ informado pelo consumidor;
- nome empresarial informado em nota, pedido, contrato ou comprovante;
- dominio, email, telefone ou endereco informado em relato;
- raiz do CNPJ quando o CNPJ completo for valido.

### O que exige conferencia

- socios;
- atividade economica;
- situacao cadastral;
- endereco cadastral;
- vinculo com outros CNPJs;
- documento emitido pela Receita Federal;
- relacao com empresa encerrada ou sucessora.

### Como exibir publicamente

Usar rotulos:

- `CNPJ principal informado`;
- `CNPJ informado por consumidor`;
- `CNPJ conferido em fonte publica`;
- `CNPJ com mesma raiz cadastral`;
- `CNPJ relacionado por fonte publica`;
- `Pendente de conferencia`.

Evitar:

- "empresa do mesmo dono" sem prova;
- "grupo economico" sem revisao juridica;
- "responsavel" sem decisao competente;
- "fraude", "golpe" ou linguagem acusatoria.

## Documento da Receita Federal

O comprovante de inscricao e situacao cadastral deve ser tratado como documento de conferencia.

Recomendacao:

- nao gerar manualmente para todos os CNPJs;
- anexar apenas quando houver caso publico, alto volume ou revisao admin;
- guardar campos estruturados no banco;
- guardar arquivo PDF ou imagem em storage privado/admin;
- publicar apenas os dados permitidos e contextualizados.

Fluxo:

```txt
CNPJ citado
  -> cadastrado como LegalEntity
  -> status: consumer_informed
  -> admin confere fonte publica
  -> status: public_source_checked
  -> admin anexa comprovante oficial
  -> status: officially_checked
  -> exibicao publica com data de conferencia
```

## Templates de Pagina

### Template Empresa Basica

Usado para alto volume de empresas.

Componentes:

- hero simples;
- resumo;
- total de relatos;
- status;
- ultimos relatos;
- CTA de relato;
- direito de resposta;
- link para relatos.

### Template Empresa Monitorada

Usado quando ha volume suficiente.

Componentes adicionais:

- indicadores;
- tendencia mensal;
- mapa;
- comparativo por estado;
- faixas de prejuizo;
- tipos de problema;
- CNPJs informados.

### Template Caso Premium

Usado em casos especiais.

Componentes:

- hero premium;
- cards executivos;
- timeline;
- mapa;
- indicadores publicos;
- graficos;
- relatos destacados;
- reportagens;
- fontes publicas;
- LGPD;
- CTA de participacao;
- pagina dedicada de relatos.

## Performance e Escala

Para milhoes de relatos:

- relatos publicos devem ser paginados;
- busca deve usar indice textual;
- graficos devem usar snapshots agregados;
- paginas principais nao devem carregar todos os relatos;
- imagens remotas devem ter fallback;
- listagens devem usar filtros por URL;
- admin deve ter fila de moderacao separada.

## Paginas Recomendadas no Produto

Rotas publicas:

```txt
/
/empresa/[slug]
/empresa/[slug]/relatos
/casos/[slug]
/casos/[slug]/relatos
/casos/[slug]/direito-de-resposta
/metodologia
/golpes
/cdc
/aviso-legal
/contato
/enviar-relato
```

Rotas privadas:

```txt
/usuario
/usuario/relatos
/usuario/documentos
/usuario/dossies
/admin
/admin/relatos
/admin/empresas
/admin/cnpjs
/admin/casos
/admin/fontes
/admin/moderacao
/admin/dossies
```

## Regras de Publicacao

Uma informacao pode aparecer publicamente quando:

- nao contem dado pessoal;
- nao contem documento privado;
- foi moderada;
- esta em linguagem cautelosa;
- indica fonte e data quando aplicavel;
- nao atribui responsabilidade definitiva;
- oferece direito de resposta quando necessario.

## Proxima Implementacao Recomendada

1. Adaptar `/empresa/[slug]` para funcionar como template de empresa basica/monitorada.
2. Criar `/empresa/[slug]/relatos` seguindo o padrao ja criado em `/casos/razor/relatos`.
3. Criar tipos e mock data genericos para `CompanyGroup`, `LegalEntity`, `PublicCase` e `Report`.
4. Preparar o admin para revisar CNPJs e alterar status de conferencia.
5. Definir backend e storage antes de aceitar documentos reais.

## Decisao Final

O Caso Razor deve continuar como caso premium e demonstrativo. Ele nao deve virar o padrao operacional de todas as empresas.

O padrao operacional deve ser:

```txt
Empresa basica -> Empresa monitorada -> Caso publico premium
```

Essa progressao conserva custo, evita excesso de paginas complexas e permite que a plataforma cresca com seguranca.

# Modelo de Dados da Plataforma

Este documento define o modelo conceitual que deve orientar a implementacao futura do Alerta ao Consumidor. O objetivo central e permitir crescimento para milhares de empresas e milhoes de relatos sem transformar cada caso em uma tela artesanal, sem criar custo operacional excessivo com pesquisas manuais e sem expor dados pessoais.

## Decisao Estrutural

A plataforma nao deve tratar "empresa", "CNPJ" e "caso publico" como a mesma coisa.

Modelo correto:

```txt
Marca percebida pelo consumidor
  -> empresas/CNPJs juridicos relacionados
  -> relatos recebidos
  -> agregacoes publicas
  -> paginas publicas por template
  -> casos especiais quando houver relevancia
```

Exemplo:

```txt
CompanyGroup: Razor
LegalEntity: 19.847.182/0001-69 - Razor do Brasil Ltda.
LegalEntity: outro CNPJ informado por consumidor ou fonte publica
PublicCase: Caso Razor
Reports: relatos individuais privados ou moderados
```

## Entidades Principais

### CompanyGroup

Representa a marca, nome comercial ou agrupamento percebido pelo consumidor.

```ts
type CompanyGroup = {
  id: string;
  slug: string;
  displayName: string;
  normalizedName: string;
  category?: string;
  publicStatus: "indexed" | "monitored" | "public_case" | "archived";
  primaryLegalEntityId?: string;
  createdAt: string;
  updatedAt: string;
};
```

Uso:

- pagina publica de empresa;
- agrupamento de relatos por marca;
- base para sugestoes de busca;
- vinculacao com um ou varios CNPJs.

### LegalEntity

Representa um CNPJ especifico.

```ts
type LegalEntity = {
  id: string;
  cnpj: string;
  rootCnpj: string;
  legalName: string;
  tradeName?: string;
  cadastralStatus?: string;
  openedAt?: string;
  mainActivity?: string;
  addressCity?: string;
  addressState?: string;
  publicSource: "receita_federal" | "consumer_document" | "public_news" | "manual_review";
  verificationStatus: "unverified" | "consumer_informed" | "public_source_checked" | "officially_checked";
  lastCheckedAt?: string;
  officialDocumentFileId?: string;
  createdAt: string;
  updatedAt: string;
};
```

Regra:

- o CNPJ informado pelo consumidor pode entrar como `consumer_informed`;
- dados conferidos em fonte publica entram como `public_source_checked`;
- comprovante oficial da Receita Federal anexado pelo admin entra como `officially_checked`;
- nenhum CNPJ deve ser apresentado como responsavel por outro automaticamente.

### CompanyLegalEntityLink

Relaciona uma marca/grupo com um CNPJ e registra o motivo da relacao.

```ts
type CompanyLegalEntityLink = {
  id: string;
  companyGroupId: string;
  legalEntityId: string;
  relationType:
    | "same_root_cnpj"
    | "consumer_reported"
    | "same_trade_name"
    | "same_partner"
    | "same_address"
    | "same_domain_or_contact"
    | "public_source_reference"
    | "manual_review";
  confidence: "high" | "medium" | "low";
  publicLabel: string;
  evidenceSummary?: string;
  sourceId?: string;
  reviewedByUserId?: string;
  reviewedAt?: string;
  createdAt: string;
};
```

Regra publica:

- alta confianca: pode aparecer como "CNPJ relacionado por raiz cadastral ou conferencia oficial";
- media confianca: aparecer como "CNPJ citado em fontes ou relatos, pendente de conferencia";
- baixa confianca: preferencialmente fica restrito ao admin ate revisao.

### PublicCase

Representa uma frente publica especial. Nem toda empresa tera um caso publico.

```ts
type PublicCase = {
  id: string;
  slug: string;
  companyGroupId: string;
  title: string;
  subtitle?: string;
  status: "draft" | "published" | "paused" | "archived";
  visibilityTier: "standard" | "monitored" | "featured";
  summary: string;
  heroImageFileId?: string;
  publishedAt?: string;
  lastUpdatedAt: string;
  createdAt: string;
  updatedAt: string;
};
```

Uso:

- casos como Razor;
- campanhas informativas;
- paginas com linha do tempo, fontes publicas, mapas e dossies;
- direito de resposta destacado.

### Report

Representa um relato individual. O relato bruto e privado por padrao.

```ts
type Report = {
  id: string;
  companyGroupId: string;
  legalEntityId?: string;
  publicCaseId?: string;
  userId?: string;
  city?: string;
  state?: string;
  amountRange?: string;
  estimatedLoss?: number;
  purchaseDate?: string;
  problemType: string;
  channelUsed?: string;
  privateNarrative: string;
  publicNarrative?: string;
  isAnonymous: boolean;
  moderationStatus: "pending" | "under_review" | "approved_public" | "rejected" | "archived";
  publicStatus: "private" | "public_summary" | "hidden";
  relevanceScore?: number;
  documentationScore?: number;
  createdAt: string;
  updatedAt: string;
};
```

Regra:

- `privateNarrative` nunca aparece em pagina publica;
- `publicNarrative` so existe apos moderacao;
- dados pessoais, documentos, prints, comprovantes e contatos ficam em area privada.

### ReportEvidence

Representa documentos ou evidencias privadas.

```ts
type ReportEvidence = {
  id: string;
  reportId: string;
  userId: string;
  type:
    | "invoice"
    | "payment_proof"
    | "contract"
    | "conversation"
    | "protocol"
    | "delivery_record"
    | "other";
  fileId: string;
  privateLabel: string;
  validationStatus: "pending" | "valid" | "invalid" | "needs_review";
  createdAt: string;
};
```

### PublicSource

Representa fonte publica usada para contextualizar uma empresa ou caso.

```ts
type PublicSource = {
  id: string;
  companyGroupId?: string;
  publicCaseId?: string;
  legalEntityId?: string;
  title: string;
  sourceName: string;
  url: string;
  sourceType: "news" | "official_record" | "company_site" | "court_public_info" | "consumer_agency" | "other";
  publishedAt?: string;
  accessedAt: string;
  thumbnailUrl?: string;
  excerpt?: string;
  createdAt: string;
};
```

### AggregateSnapshot

Representa estatisticas materializadas para leitura publica rapida.

```ts
type AggregateSnapshot = {
  id: string;
  scopeType: "company_group" | "public_case" | "legal_entity";
  scopeId: string;
  totalReports: number;
  totalEstimatedLoss: number;
  affectedCities: number;
  affectedStates: number;
  averageDaysUnresolved?: number;
  silenceDocumentedCount?: number;
  postEscalationResolutionRate?: number;
  problemDistribution: { label: string; value: number }[];
  statusDistribution: { label: string; value: number }[];
  lossRanges: { label: string; value: number }[];
  monthlyReports: { month: string; value: number }[];
  cities: { city: string; state: string; reports: number; estimatedLoss?: number }[];
  generatedAt: string;
};
```

Regra:

- paginas publicas devem consultar agregados, nao relatos privados;
- grandes volumes devem usar snapshots e indices, nao calculo em tempo real para cada visitante.

### ModerationEvent

Registra decisoes editoriais, juridicas e de privacidade.

```ts
type ModerationEvent = {
  id: string;
  reportId?: string;
  companyGroupId?: string;
  legalEntityId?: string;
  publicCaseId?: string;
  actorUserId: string;
  action: string;
  reason?: string;
  before?: unknown;
  after?: unknown;
  createdAt: string;
};
```

### RightOfReply

Canal formal de manifestacao da empresa, representante ou interessado.

```ts
type RightOfReply = {
  id: string;
  companyGroupId?: string;
  legalEntityId?: string;
  publicCaseId?: string;
  senderName: string;
  senderRole?: string;
  senderEmail: string;
  messagePrivate: string;
  messagePublic?: string;
  status: "received" | "under_review" | "published" | "rejected" | "archived";
  createdAt: string;
  updatedAt: string;
};
```

## Estrategia para CNPJs Relacionados

A plataforma nao deve assumir automaticamente que todos os CNPJs parecidos pertencem ao mesmo responsavel.

Fluxo recomendado:

```txt
Consumidor informa CNPJ ou nome usado na compra
  -> sistema normaliza nome, CNPJ e raiz do CNPJ
  -> verifica se ja existe LegalEntity
  -> cria ou vincula LegalEntity
  -> registra motivo da relacao
  -> exibe publicamente apenas conforme nivel de confianca
```

Politica publica:

- exibir o CNPJ principal informado nos relatos;
- exibir outros CNPJs apenas com rotulo de origem;
- mostrar data de conferencia;
- separar "informado por consumidor" de "conferido em fonte oficial";
- disponibilizar documento oficial apenas quando houver arquivo conferido por admin.

## Niveis de Pagina

### Nivel 1: Empresa Indexada

Criada quando existe pelo menos um relato validado.

Rota:

```txt
/empresa/[slug]
```

Conteudo:

- nome publico;
- CNPJ principal quando houver;
- status de monitoramento;
- total de relatos;
- ultimos relatos moderados;
- botao de envio de relato;
- direito de resposta.

### Nivel 2: Empresa Monitorada

Ativada por criterio de volume, relevancia ou revisao administrativa.

Conteudo adicional:

- indicadores;
- tendencia mensal;
- mapa por UF/cidade;
- tipos de problema;
- faixas de prejuizo;
- CNPJs informados ou relacionados;
- pagina de relatos.

Rota de relatos:

```txt
/empresa/[slug]/relatos
```

### Nivel 3: Caso Publico

Ativado manualmente quando houver interesse coletivo, fontes publicas, alto volume, risco recorrente ou necessidade de organizacao especial.

Rotas:

```txt
/casos/[slug]
/casos/[slug]/relatos
/casos/[slug]/direito-de-resposta
```

Conteudo adicional:

- hero especifico;
- linha do tempo;
- reportagens;
- fontes publicas;
- dossie;
- frente solidaria;
- mapa e graficos premium;
- pagina dedicada de relatos.

## Estrategia de Escala

A plataforma nao tera paginas fisicas duplicadas para cada empresa. Ela tera templates dinamicos.

Correto:

```txt
1 template de empresa -> milhares de empresas
1 template de relatos -> milhoes de relatos paginados
1 template de caso publico -> apenas casos promovidos
```

Evitar:

```txt
Criar tela manual para cada empresa.
Criar caso publico para toda empresa automaticamente.
Consultar Receita manualmente para cada CNPJ citado.
Calcular graficos publicos em tempo real para cada visita.
Exibir relatos privados brutos.
```

## Indices Recomendados

Quando o banco for definido, priorizar indices:

- `reports.companyGroupId`;
- `reports.publicCaseId`;
- `reports.legalEntityId`;
- `reports.createdAt`;
- `reports.state`;
- `reports.problemType`;
- `reports.amountRange`;
- `reports.moderationStatus`;
- `reports.publicStatus`;
- `legalEntities.cnpj`;
- `legalEntities.rootCnpj`;
- `companyGroups.slug`;
- busca textual em `publicNarrative`, `displayName`, `legalName` e `tradeName`.

## Fontes Publicas e Receita Federal

Fontes oficiais usadas como referencia conceitual:

- Portal gov.br de consulta ao Cadastro Nacional da Pessoa Juridica;
- pagina da Receita Federal sobre CNPJ;
- leiautes e bases publicas de CNPJ disponibilizadas pela Receita Federal.

Data desta diretriz: 05/05/2026.

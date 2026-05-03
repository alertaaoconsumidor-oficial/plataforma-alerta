# Modelo de Dados

Este modelo é conceitual e deve guiar a implementação futura.

## Case

Representa uma empresa, grupo de relatos ou caso coletivo.

```ts
type Case = {
  id: string;
  slug: string;
  companyName: string;
  companyDocument?: string;
  publicStatus: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
};
```

## Report

Representa um relato privado.

```ts
type Report = {
  id: string;
  caseId: string;
  victimId?: string;
  city: string;
  state: string;
  estimatedLoss?: number;
  problemDate?: string;
  problemType: string;
  privateNarrative: string;
  publicNarrative?: string;
  status: "received" | "under_review" | "approved_public" | "rejected" | "resolved" | "archived";
  createdAt: string;
  updatedAt: string;
};
```

## PublicCaseStats

Representa estatísticas públicas agregadas.

```ts
type PublicCaseStats = {
  caseId: string;
  caseSlug: string;
  companyName: string;
  totalReports: number;
  totalEstimatedLoss: number;
  affectedCities: number;
  affectedStates: number;
  reportsWithDocuments: number;
  monthlyReports: { month: string; reports: number }[];
  cities: { city: string; state: string; reports: number; estimatedLoss: number }[];
  lastUpdatedAt: string;
};
```

## Tabelas futuras

- `users`
- `cases`
- `reports`
- `report_documents`
- `public_case_stats`
- `case_city_stats`
- `case_monthly_stats`
- `moderation_events`
- `legal_responses`
- `audit_logs`
- `consents`

## Regra de acesso

Visitantes leem apenas estatísticas e conteúdo público aprovado. Vítimas acessam apenas os próprios relatos. Moderadores revisam relatos. Admins gerenciam configurações e permissões.

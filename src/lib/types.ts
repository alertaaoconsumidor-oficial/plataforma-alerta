export type Company = {
  id: string;
  name: string;
  slug: string;
  cnpj?: string;
  category: string;
  status: 'Em monitoramento' | 'Alto volume de relatos' | 'Sem dados suficientes';
  createdAt: string;
  updatedAt: string;
};

export type Report = {
  id: string;
  companyId: string;
  companyName: string;
  companySlug: string;
  amountRange: string;
  purchaseDate: string;
  promisedDeadline?: string;
  currentStatus: string;
  narrative: string;
  isAnonymous: boolean;
  publicNameInitials?: string;
  moderationStatus: 'Pendente' | 'Aprovado' | 'Recusado';
  createdAt: string;
};

export type Event = {
  id: string;
  companyId: string;
  type: 'news' | 'report' | 'update';
  title: string;
  description: string;
  sourceUrl?: string;
  date: string;
  createdAt: string;
};

export type News = {
  id:string;
  companyId: string;
  title: string;
  sourceName: string;
  url: string;
  publishedAt: string;
  excerpt: string;
  createdAt: string;
};

export type Metric = {
  tmr: number; // Tempo médio sem resolução (dias)
  sd: number; // Silêncio documentado (casos)
  trpe: number; // % resolvido após escalonamento
  totalReports: number;
};

export type MonthlyReportData = {
  month: string;
  count: number;
};

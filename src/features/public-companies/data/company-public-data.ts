import { companies, events, metrics, monthlyReportData, news, reports } from "@/lib/seed-data";
import type { Company, Event, Metric, MonthlyReportData, News, Report } from "@/lib/types";
import type { CaseCityStat, CaseDistributionItem, RelatedCnpj } from "@/features/public-cases/types";

export type CompanyVisibilityTier = "basic" | "monitored" | "featured";

export type CompanyReportDirectoryItem = Report & {
  city: string;
  state: string;
  problemType: string;
  lossValue: number;
  documentationScore: number;
  relevanceScore: number;
  views: number;
  documents: string[];
  summary: string;
};

export type PublicCompanyProfile = {
  company: Company;
  tier: CompanyVisibilityTier;
  heroImageUrl: string;
  summary: string;
  cnpjLabel: string;
  legalEntities: RelatedCnpj[];
  cityStats: CaseCityStat[];
  statusDistribution: CaseDistributionItem[];
  problemTypes: CaseDistributionItem[];
  lossRanges: CaseDistributionItem[];
  documentMetrics: CaseDistributionItem[];
  metrics: Metric;
  reports: Report[];
  reportDirectory: CompanyReportDirectoryItem[];
  news: News[];
  events: Event[];
  monthlyData: MonthlyReportData[];
  estimatedLoss: number;
  affectedStates: number;
  affectedCities: number;
};

const defaultMetric: Metric = {
  totalReports: 0,
  tmr: 0,
  sd: 0,
  trpe: 0,
};

const companyEnhancements: Record<
  string,
  {
    tier: CompanyVisibilityTier;
    heroImageUrl: string;
    summary: string;
    cnpjLabel: string;
    legalEntities: RelatedCnpj[];
    cityStats: CaseCityStat[];
    statusDistribution: CaseDistributionItem[];
    problemTypes: CaseDistributionItem[];
    lossRanges: CaseDistributionItem[];
    documentMetrics: CaseDistributionItem[];
    estimatedLoss: number;
  }
> = {
  "loja-varejista-express": {
    tier: "monitored",
    heroImageUrl:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1800&auto=format&fit=crop",
    summary:
      "Empresa em monitoramento por relatos de atraso, nao entrega, dificuldade de cancelamento e ausencia de resposta documentada em canais de atendimento.",
    cnpjLabel: "CNPJ principal informado em relatos",
    estimatedLoss: 284300,
    legalEntities: [
      {
        cnpj: "12.345.678/0001-99",
        legalName: "Loja Varejista Express Comercio Digital Ltda.",
        tradeName: "Loja Varejista Express",
        status: "Ativa",
        openedAt: "15/01/2020",
        mainActivity: "Comercio varejista por internet",
        address: "Avenida Comercial, 1200 - Sala 18",
        city: "Sao Paulo",
        state: "SP",
        partners: ["Administrador informado A"],
        sourceNote:
          "CNPJ principal informado em relatos demonstrativos. Conferencia oficial pendente para ambiente de producao.",
        sourceName: "Receita Federal",
        lastCheckedAt: "Pendente",
        federalDocumentStatus: "Pendente",
      },
      {
        cnpj: "12.345.678/0002-70",
        legalName: "Loja Varejista Express Logistica Ltda.",
        tradeName: "Varejista Express",
        status: "Ativa",
        openedAt: "03/06/2021",
        mainActivity: "Atividades de logistica e distribuicao",
        address: "Rua dos Centros, 90",
        city: "Guarulhos",
        state: "SP",
        partners: ["Administrador informado A"],
        sourceNote:
          "CNPJ relacionado por mesma raiz cadastral em dados demonstrativos.",
        sourceName: "Receita Federal",
        lastCheckedAt: "Pendente",
        federalDocumentStatus: "Pendente",
      },
    ],
    cityStats: [
      {
        city: "Sao Paulo",
        state: "SP",
        reports: 58,
        estimatedLoss: 126000,
        latitude: -23.5505,
        longitude: -46.6333,
      },
      {
        city: "Rio de Janeiro",
        state: "RJ",
        reports: 32,
        estimatedLoss: 69500,
        latitude: -22.9068,
        longitude: -43.1729,
      },
      {
        city: "Belo Horizonte",
        state: "MG",
        reports: 21,
        estimatedLoss: 38600,
        latitude: -19.9167,
        longitude: -43.9345,
      },
      {
        city: "Curitiba",
        state: "PR",
        reports: 15,
        estimatedLoss: 26700,
        latitude: -25.4284,
        longitude: -49.2733,
      },
      {
        city: "Salvador",
        state: "BA",
        reports: 12,
        estimatedLoss: 23500,
        latitude: -12.9777,
        longitude: -38.5016,
      },
    ],
    statusDistribution: [
      { label: "Aguardando resposta", value: 67 },
      { label: "Com documentacao informada", value: 48 },
      { label: "Em analise publica", value: 24 },
      { label: "Resolvido apos escalonamento", value: 13 },
    ],
    problemTypes: [
      { label: "Produto nao entregue", value: 61 },
      { label: "Cancelamento nao processado", value: 38 },
      { label: "Estorno nao realizado", value: 29 },
      { label: "Atendimento sem resposta", value: 24 },
    ],
    lossRanges: [
      { label: "Ate R$ 500", value: 34 },
      { label: "R$ 500 a R$ 1 mil", value: 48 },
      { label: "R$ 1 mil a R$ 3 mil", value: 51 },
      { label: "Acima de R$ 3 mil", value: 19 },
    ],
    documentMetrics: [
      { label: "Comprovantes de pagamento", value: 103 },
      { label: "Pedidos ou notas", value: 91 },
      { label: "Conversas e protocolos", value: 78 },
      { label: "Tentativas de cancelamento", value: 36 },
    ],
  },
  "telefonia-conecta-mais": {
    tier: "basic",
    heroImageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop",
    summary:
      "Empresa acompanhada por relatos de cobranca indevida, portabilidade nao concluida e dificuldade de atendimento em canais digitais.",
    cnpjLabel: "CNPJ informado nos relatos",
    estimatedLoss: 38400,
    legalEntities: [
      {
        cnpj: "98.765.432/0001-11",
        legalName: "Telefonia Conecta Mais Servicos Digitais Ltda.",
        tradeName: "Telefonia Conecta+",
        status: "Ativa",
        openedAt: "20/02/2019",
        mainActivity: "Servicos de telecomunicacoes",
        address: "Rua das Redes, 500",
        city: "Campinas",
        state: "SP",
        partners: ["Administrador informado B"],
        sourceNote:
          "CNPJ demonstrativo informado para teste de interface e arquitetura.",
        sourceName: "Receita Federal",
        lastCheckedAt: "Pendente",
        federalDocumentStatus: "Pendente",
      },
    ],
    cityStats: [
      {
        city: "Campinas",
        state: "SP",
        reports: 16,
        estimatedLoss: 14200,
        latitude: -22.9099,
        longitude: -47.0626,
      },
      {
        city: "Goiania",
        state: "GO",
        reports: 9,
        estimatedLoss: 7800,
        latitude: -16.686,
        longitude: -49.264,
      },
      {
        city: "Recife",
        state: "PE",
        reports: 7,
        estimatedLoss: 6200,
        latitude: -8.0476,
        longitude: -34.877,
      },
    ],
    statusDistribution: [
      { label: "Aguardando resposta", value: 19 },
      { label: "Com protocolo informado", value: 13 },
      { label: "Resolvido apos escalonamento", value: 11 },
    ],
    problemTypes: [
      { label: "Cobranca indevida", value: 18 },
      { label: "Portabilidade nao concluida", value: 12 },
      { label: "Servico indisponivel", value: 8 },
      { label: "Atendimento sem retorno", value: 5 },
    ],
    lossRanges: [
      { label: "Sem valor informado", value: 14 },
      { label: "Ate R$ 500", value: 19 },
      { label: "R$ 500 a R$ 1 mil", value: 7 },
      { label: "Acima de R$ 1 mil", value: 3 },
    ],
    documentMetrics: [
      { label: "Protocolos", value: 28 },
      { label: "Faturas", value: 21 },
      { label: "Prints de atendimento", value: 17 },
      { label: "Comprovantes de pagamento", value: 9 },
    ],
  },
};

export function getPublicCompanySlugs() {
  return companies.map((company) => ({ slug: company.slug }));
}

export function getPublicCompanyProfile(slug: string): PublicCompanyProfile | undefined {
  const company = companies.find((item) => item.slug === slug);

  if (!company) {
    return undefined;
  }

  const enhancement = companyEnhancements[slug];
  const companyReports = reports.filter(
    (report) => report.companyId === company.id && report.moderationStatus === "Aprovado"
  );

  const directory = buildReportDirectory(companyReports, enhancement);

  return {
    company,
    tier: enhancement?.tier ?? "basic",
    heroImageUrl:
      enhancement?.heroImageUrl ??
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1800&auto=format&fit=crop",
    summary:
      enhancement?.summary ??
      "Empresa com relatos em acompanhamento pela plataforma, exibidos em formato agregado e moderado.",
    cnpjLabel: enhancement?.cnpjLabel ?? "CNPJ informado",
    legalEntities: enhancement?.legalEntities ?? [],
    cityStats: enhancement?.cityStats ?? [],
    statusDistribution: enhancement?.statusDistribution ?? buildStatusDistribution(companyReports),
    problemTypes: enhancement?.problemTypes ?? buildProblemTypes(companyReports),
    lossRanges: enhancement?.lossRanges ?? [],
    documentMetrics: enhancement?.documentMetrics ?? [],
    metrics: metrics[company.id] ?? defaultMetric,
    reports: companyReports,
    reportDirectory: directory,
    news: news.filter((item) => item.companyId === company.id),
    events: events[company.id] ?? [],
    monthlyData: monthlyReportData[company.id] ?? [],
    estimatedLoss:
      enhancement?.estimatedLoss ??
      directory.reduce((total, report) => total + report.lossValue, 0),
    affectedStates: new Set((enhancement?.cityStats ?? []).map((city) => city.state)).size,
    affectedCities: enhancement?.cityStats.length ?? 0,
  };
}

function buildReportDirectory(
  companyReports: Report[],
  enhancement?: (typeof companyEnhancements)[string]
): CompanyReportDirectoryItem[] {
  const cities = enhancement?.cityStats ?? [];

  return companyReports.map((report, index) => {
    const city = cities[index % Math.max(cities.length, 1)];
    const fallbackLoss = index === 0 ? 2800 : index === 1 ? 650 : 1300;

    return {
      ...report,
      city: city?.city ?? "Cidade nao informada",
      state: city?.state ?? "UF",
      problemType: inferProblemType(report.currentStatus),
      lossValue: parseAmountRange(report.amountRange) || fallbackLoss,
      documentationScore: Math.max(62, 92 - index * 9),
      relevanceScore: Math.max(68, 96 - index * 7),
      views: 2400 - index * 420,
      documents: inferDocuments(report.currentStatus),
      summary: report.narrative,
    };
  });
}

function buildStatusDistribution(companyReports: Report[]): CaseDistributionItem[] {
  return companyReports.map((report) => ({
    label: report.currentStatus,
    value: 1,
  }));
}

function buildProblemTypes(companyReports: Report[]): CaseDistributionItem[] {
  return companyReports.reduce<CaseDistributionItem[]>((acc, report) => {
    const label = inferProblemType(report.currentStatus);
    const current = acc.find((item) => item.label === label);

    if (current) {
      current.value += 1;
    } else {
      acc.push({ label, value: 1 });
    }

    return acc;
  }, []);
}

function inferProblemType(status: string) {
  const normalized = status.toLowerCase();

  if (normalized.includes("entreg")) {
    return "Produto nao entregue";
  }

  if (normalized.includes("cobran")) {
    return "Cobranca indevida";
  }

  if (normalized.includes("cancel") || normalized.includes("estorno")) {
    return "Cancelamento ou estorno";
  }

  if (normalized.includes("portabilidade")) {
    return "Portabilidade";
  }

  return "Atendimento sem solucao";
}

function inferDocuments(status: string) {
  const normalized = status.toLowerCase();

  if (normalized.includes("cobran")) {
    return ["Fatura", "Protocolo", "Print de atendimento"];
  }

  if (normalized.includes("cancel") || normalized.includes("estorno")) {
    return ["Pedido", "Comprovante de pagamento", "Solicitacao de cancelamento"];
  }

  return ["Pedido", "Comprovante de pagamento", "Conversas"];
}

function parseAmountRange(value: string) {
  const numbers = value.match(/\d+[.,]?\d*/g);

  if (!numbers?.length) {
    return 0;
  }

  const parsed = numbers.map((number) =>
    Number(number.replace(".", "").replace(",", "."))
  );

  return Math.max(...parsed);
}

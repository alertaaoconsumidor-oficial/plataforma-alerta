import type { PublicCaseStats } from "../types";

export const razorPreliminaryStats: PublicCaseStats = {
  slug: "razor",
  title: "CASO RAZOR",
  subtitle: "Caso inicial do Alerta ao Consumidor",
  lastUpdatedAt: "2026-05-03",
  totalReports: 20,
  totalVictims: 20,
  totalEstimatedLoss: 186400,
  averageLoss: 9320,
  affectedCities: 7,
  affectedStates: 3,
  averageDaysUnresolved: 214,
  longestDaysUnresolved: 390,
  reportsWithDocuments: 14,
  reportsWithPaymentProof: 16,
  reportsWithContract: 9,
  reportsWithMessages: 18,
  reportsWithProtocol: 6,
  statusDistribution: [
    { label: "Aguardando validacao", value: 11 },
    { label: "Com documentacao informada", value: 6 },
    { label: "Em organizacao coletiva", value: 3 },
  ],
  lossRanges: [
    { label: "Ate R$ 2 mil", value: 3 },
    { label: "R$ 2 mil a R$ 5 mil", value: 4 },
    { label: "R$ 5 mil a R$ 10 mil", value: 6 },
    { label: "Acima de R$ 10 mil", value: 7 },
  ],
  monthlyReports: [
    { label: "Jan", value: 2 },
    { label: "Fev", value: 3 },
    { label: "Mar", value: 5 },
    { label: "Abr", value: 6 },
    { label: "Mai", value: 4 },
  ],
  cities: [
    {
      city: "Cuiaba",
      state: "MT",
      reports: 7,
      estimatedLoss: 68500,
      latitude: -15.601,
      longitude: -56.097,
    },
    {
      city: "Varzea Grande",
      state: "MT",
      reports: 4,
      estimatedLoss: 37400,
      latitude: -15.646,
      longitude: -56.132,
    },
    {
      city: "Campo Grande",
      state: "MS",
      reports: 3,
      estimatedLoss: 28200,
      latitude: -20.469,
      longitude: -54.621,
    },
    {
      city: "Goiania",
      state: "GO",
      reports: 2,
      estimatedLoss: 18100,
      latitude: -16.686,
      longitude: -49.264,
    },
    {
      city: "Rondonopolis",
      state: "MT",
      reports: 2,
      estimatedLoss: 17600,
      latitude: -16.467,
      longitude: -54.637,
    },
    {
      city: "Dourados",
      state: "MS",
      reports: 1,
      estimatedLoss: 8400,
      latitude: -22.221,
      longitude: -54.806,
    },
    {
      city: "Anapolis",
      state: "GO",
      reports: 1,
      estimatedLoss: 8200,
      latitude: -16.328,
      longitude: -48.953,
    },
  ],
  problemTypes: [
    { label: "Produto ou servico nao entregue", value: 8 },
    { label: "Reembolso nao realizado", value: 5 },
    { label: "Promessa comercial divergente", value: 4 },
    { label: "Falta de resposta documentada", value: 3 },
  ],
};

export const razorPrimaryMetrics = [
  {
    label: "Relatos registrados",
    value: razorPreliminaryStats.totalReports.toString(),
    helper: "Dados preliminares e agregados",
  },
  {
    label: "Vitimas identificadas",
    value: razorPreliminaryStats.totalVictims.toString(),
    helper: "Sem exibicao de dados pessoais",
  },
  {
    label: "Prejuizo estimado",
    value: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(razorPreliminaryStats.totalEstimatedLoss),
    helper: "Valores declarados pelos consumidores",
  },
  {
    label: "Cidades afetadas",
    value: razorPreliminaryStats.affectedCities.toString(),
    helper: `${razorPreliminaryStats.affectedStates} Estados informados`,
  },
];

export const razorDocumentationMetrics = [
  {
    label: "Documentos informados",
    value: razorPreliminaryStats.reportsWithDocuments,
  },
  {
    label: "Comprovantes de pagamento",
    value: razorPreliminaryStats.reportsWithPaymentProof,
  },
  {
    label: "Contrato ou proposta",
    value: razorPreliminaryStats.reportsWithContract,
  },
  {
    label: "Prints ou conversas",
    value: razorPreliminaryStats.reportsWithMessages,
  },
  {
    label: "Protocolos",
    value: razorPreliminaryStats.reportsWithProtocol,
  },
];

export const razorTimeline = [
  {
    date: "Etapa 1",
    title: "Organizacao inicial",
    description:
      "Consolidacao dos primeiros relatos conhecidos e definicao de linguagem institucional.",
  },
  {
    date: "Etapa 2",
    title: "Painel preliminar",
    description:
      "Publicacao de dados agregados para dar dimensao coletiva ao caso sem expor vitimas.",
  },
  {
    date: "Etapa 3",
    title: "Chamamento de consumidores",
    description:
      "Direcionamento de novas vitimas ao formulario oficial para ampliar a base documental.",
  },
  {
    date: "Proxima etapa",
    title: "Dossie e encaminhamentos",
    description:
      "Validacao dos relatos, organizacao privada de provas e preparacao de material tecnico.",
  },
];

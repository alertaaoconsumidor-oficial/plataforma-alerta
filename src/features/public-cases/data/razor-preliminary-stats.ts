import type { PublicCaseStats } from "../types";
import type { Metric, MonthlyReportData, News, Report } from "@/lib/types";

export const razorPreliminaryStats: PublicCaseStats = {
  slug: "razor",
  title: "CASO RAZOR",
  subtitle: "Dossie publico em organizacao",
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

export const razorStateComparison = Object.values(
  razorPreliminaryStats.cities.reduce<
    Record<string, { label: string; value: number; helper: string; loss: number }>
  >((acc, city) => {
    const current = acc[city.state] ?? {
      label: city.state,
      value: 0,
      helper: "",
      loss: 0,
    };

    current.value += city.reports;
    current.loss += city.estimatedLoss;
    acc[city.state] = current;

    return acc;
  }, {})
)
  .map((state) => ({
    label: state.label,
    value: state.value,
    helper: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(state.loss),
  }))
  .sort((a, b) => b.value - a.value);

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

export const razorMetrics: Metric = {
  totalReports: razorPreliminaryStats.totalReports,
  tmr: razorPreliminaryStats.averageDaysUnresolved,
  sd: 12,
  trpe: 8,
};

export const razorMonthlyReportData: MonthlyReportData[] =
  razorPreliminaryStats.monthlyReports.map((item) => ({
    month: item.label,
    count: item.value,
  }));

export const razorPublicReports: Report[] = [
  {
    id: "razor-report-1",
    companyId: "razor",
    companyName: "CASO RAZOR",
    companySlug: "razor",
    amountRange: "Acima de R$ 10 mil",
    purchaseDate: "2025-08-12",
    currentStatus: "Aguardando validacao documental",
    narrative:
      "Consumidor relata pagamento realizado, promessa de entrega e ausencia de solucao ate o momento. Documentos foram informados para analise privada.",
    isAnonymous: true,
    moderationStatus: "Aprovado",
    createdAt: "2026-05-01",
  },
  {
    id: "razor-report-2",
    companyId: "razor",
    companyName: "CASO RAZOR",
    companySlug: "razor",
    amountRange: "R$ 5 mil a R$ 10 mil",
    purchaseDate: "2025-10-04",
    currentStatus: "Sem resposta documentada",
    narrative:
      "Relato aponta tentativas de contato por canais digitais, com registros de conversas e comprovante de pagamento preservados pelo consumidor.",
    isAnonymous: true,
    moderationStatus: "Aprovado",
    createdAt: "2026-05-02",
  },
  {
    id: "razor-report-3",
    companyId: "razor",
    companyName: "CASO RAZOR",
    companySlug: "razor",
    amountRange: "R$ 2 mil a R$ 5 mil",
    purchaseDate: "2025-11-18",
    currentStatus: "Em organizacao coletiva",
    narrative:
      "Consumidor informa prejuizo estimado e interesse em integrar base coletiva. Dados pessoais nao sao publicados.",
    isAnonymous: true,
    moderationStatus: "Aprovado",
    createdAt: "2026-05-03",
  },
];

export const razorPublicNews: News[] = [
  {
    id: "razor-news-1",
    companyId: "razor",
    title: "Organizacao coletiva de consumidores ganha pagina dedicada",
    sourceName: "Alerta ao Consumidor",
    url: "/casos/razor",
    publishedAt: "2026-05-03",
    excerpt:
      "A pagina do CASO RAZOR consolida dados agregados preliminares, orientacoes e canal de direito de resposta.",
    createdAt: "2026-05-03",
  },
  {
    id: "razor-news-2",
    companyId: "razor",
    title: "Dados pessoais e documentos permanecem em camada restrita",
    sourceName: "Alerta ao Consumidor",
    url: "/casos/razor#estatisticas",
    publishedAt: "2026-05-03",
    excerpt:
      "O painel publico exibe apenas estatisticas agregadas, sem documentos, nomes de vitimas ou dados sensiveis.",
    createdAt: "2026-05-03",
  },
  {
    id: "razor-news-3",
    companyId: "razor",
    title: "Canal de manifestacao preserva contraditorio",
    sourceName: "Alerta ao Consumidor",
    url: "/casos/razor/direito-de-resposta",
    publishedAt: "2026-05-03",
    excerpt:
      "Representantes legais, compliance e demais interessados podem enviar manifestacoes formais para analise.",
    createdAt: "2026-05-03",
  },
];

export const razorMediaReferences = [
  {
    id: "startups-razor-operacoes",
    title: "Razor Computadores encerra as operações",
    sourceName: "Startups",
    url: "https://startups.com.br/negocios/razor-computadores-encerra-as-operacoes/",
    thumbnailUrl:
      "https://startups.com.br/wp-content/uploads/2022/02/computadores-razor.webp",
    publishedAt: "27/01/2026",
    accessedAt: "04/05/2026",
    excerpt:
      "Reportagem informa o encerramento das operações da fabricante e contextualiza dificuldades financeiras, atrasos e impactos operacionais.",
  },
  {
    id: "gauchazh-mp-justica",
    title:
      "Ministério Público entra na Justiça contra empresa de Passo Fundo por não entrega de computadores",
    sourceName: "GZH",
    url: "https://gauchazh.clicrbs.com.br/passo-fundo/geral/noticia/2025/09/ministerio-publico-entra-na-justica-contra-empresa-de-passo-fundo-por-nao-entrega-de-computadores-cmfmpj1ax009401fjh2tmps9f.html",
    thumbnailUrl:
      "https://www.rbsdirect.com.br/filestore/4/9/8/0/2/4/5_b65ee4eb5a309bc/5420894_477a41a668f855a.jpg?w=1200&h=675&a=c&version=1575255600",
    publishedAt: "16/09/2025",
    accessedAt: "04/05/2026",
    excerpt:
      "Matéria registra ação do Ministério Público envolvendo alegações de não entrega de computadores por empresa de Passo Fundo.",
  },
  {
    id: "g1-razor-atividades",
    title:
      "Razor encerra atividades após acúmulo de dívidas e ações em Passo Fundo",
    sourceName: "G1",
    url: "https://g1.globo.com/rs/rio-grande-do-sul/videos-jornal-do-almoco-rs-cruz-alta-erechim-passo-fundo-e-santa-rosa/video/razor-encerra-atividades-apos-acumulo-de-dividas-e-acoes-em-passo-fundo-14282024.ghtml",
    thumbnailUrl: "https://s01.video.glbimg.com/x720/14282024.jpg",
    publishedAt: "23/01/2026",
    accessedAt: "04/05/2026",
    excerpt:
      "Vídeo do G1 informa o encerramento de atividades e menciona ação civil pública do Ministério Público do Rio Grande do Sul.",
  },
  {
    id: "razor-site-oficial",
    title: "Site oficial da Razor",
    sourceName: "Razor",
    url: "https://razor.com.br/?srsltid=AfmBOor0KCmosVSUUrGlANWMHdIiY9B5YsBz-oOKuCB44SrDPKUSdKkp",
    thumbnailUrl: "https://razor.com.br/wp-content/uploads/2025/08/capa-do-site.png",
    publishedAt: "Consulta pública",
    accessedAt: "04/05/2026",
    excerpt:
      "Página institucional informada para referência visual e conferência pública da marca relacionada ao caso.",
  },
  {
    id: "uirapuru-crise-financeira",
    title:
      "Razor Computadores encerra atividades após crise financeira em Passo Fundo",
    sourceName: "Rádio Uirapuru",
    url: "https://rduirapuru.com.br/razor-computadores-encerra-atividades-apos-crise-financeira-em-passo-fundo/",
    thumbnailUrl:
      "https://rduirapuru.com.br/wp-content/uploads/2022/04/razor-1-1024x768.jpg",
    publishedAt: "23/01/2026",
    accessedAt: "04/05/2026",
    excerpt:
      "Reportagem local relata encerramento das atividades, crise financeira, dívidas e processos judiciais envolvendo a empresa.",
  },
];

export const razorRelatedCnpjs = [
  {
    cnpj: "12.345.678/0001-90",
    legalName: "Razor Comercio Digital Ltda.",
    tradeName: "Razor",
    status: "Baixada",
    openedAt: "14/02/2019",
    mainActivity: "Comercio varejista especializado",
    address: "Rua Exemplo Central, 100 - Sala 2",
    city: "Cuiaba",
    state: "MT",
    partners: ["Socio Administrador A", "Socio Cotista B"],
    sourceNote: "Dados demonstrativos para teste. Substituir por consulta publica conferida.",
  },
  {
    cnpj: "23.456.789/0001-01",
    legalName: "RZR Solucoes Comerciais Ltda.",
    tradeName: "RZR Solucoes",
    status: "Inapta",
    openedAt: "22/07/2020",
    mainActivity: "Intermediacao de negocios e servicos",
    address: "Avenida Comercial, 450 - Conjunto 12",
    city: "Varzea Grande",
    state: "MT",
    partners: ["Socio Administrador A"],
    sourceNote: "Dados demonstrativos para teste. Substituir por consulta publica conferida.",
  },
  {
    cnpj: "34.567.890/0001-12",
    legalName: "Razor Intermediacoes e Representacoes Ltda.",
    tradeName: "Razor Intermediacoes",
    status: "Ativa",
    openedAt: "05/03/2021",
    mainActivity: "Representantes comerciais e agentes do comercio",
    address: "Rua das Acacias, 88",
    city: "Goiania",
    state: "GO",
    partners: ["Socio Administrador C", "Socio Cotista B"],
    sourceNote: "Dados demonstrativos para teste. Substituir por consulta publica conferida.",
  },
  {
    cnpj: "45.678.901/0001-23",
    legalName: "RZ Tecnologia e Atendimento Ltda.",
    tradeName: "RZ Atendimento",
    status: "Ativa",
    openedAt: "18/11/2021",
    mainActivity: "Atividades de teleatendimento",
    address: "Rua Operacional, 310",
    city: "Campo Grande",
    state: "MS",
    partners: ["Socio Administrador D"],
    sourceNote: "Dados demonstrativos para teste. Substituir por consulta publica conferida.",
  },
  {
    cnpj: "56.789.012/0001-34",
    legalName: "Razor Participacoes Ltda.",
    tradeName: "Razor Participacoes",
    status: "Ativa",
    openedAt: "09/06/2022",
    mainActivity: "Holdings de instituicoes nao financeiras",
    address: "Alameda Empresarial, 700 - Sala 6",
    city: "Anapolis",
    state: "GO",
    partners: ["Socio Administrador A", "Socio Administrador D"],
    sourceNote: "Dados demonstrativos para teste. Substituir por consulta publica conferida.",
  },
];

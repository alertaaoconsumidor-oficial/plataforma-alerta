import type { Company, Report, News, Metric, Event, MonthlyReportData } from './types';

export const companies: Company[] = [
  {
    id: '1',
    name: 'Loja Varejista Express',
    slug: 'loja-varejista-express',
    cnpj: '12.345.678/0001-99',
    category: 'E-commerce',
    status: 'Alto volume de relatos',
    createdAt: '2023-01-15T09:00:00Z',
    updatedAt: '2023-10-28T14:30:00Z',
  },
  {
    id: '2',
    name: 'Telefonia Conecta+',
    slug: 'telefonia-conecta-mais',
    cnpj: '98.765.432/0001-11',
    category: 'Telecomunicações',
    status: 'Em monitoramento',
    createdAt: '2023-02-20T11:00:00Z',
    updatedAt: '2023-10-25T18:00:00Z',
  },
];

export const reports: Report[] = [
  {
    id: 'r1',
    companyId: '1',
    companyName: 'Loja Varejista Express',
    companySlug: 'loja-varejista-express',
    amountRange: 'R$ 500 - R$ 1.000',
    purchaseDate: '2023-09-01',
    promisedDeadline: '2023-09-10',
    currentStatus: 'Produto não entregue, sem resposta do SAC',
    narrative: 'Comprei um smartphone no site e o prazo de entrega expirou há 15 dias. A empresa não responde meus e-mails e o telefone de contato não funciona. O código de rastreio fornecido é inválido.',
    isAnonymous: false,
    publicNameInitials: 'J.S.',
    moderationStatus: 'Aprovado',
    createdAt: '2023-09-25T10:00:00Z',
  },
  {
    id: 'r2',
    companyId: '1',
    companyName: 'Loja Varejista Express',
    companySlug: 'loja-varejista-express',
    amountRange: 'R$ 100 - R$ 200',
    purchaseDate: '2023-08-15',
    currentStatus: 'Produto entregue com defeito, devolução negada',
    narrative: 'Recebi um fone de ouvido que não funciona. Tentei devolver dentro do prazo de 7 dias, mas a loja alegou que a embalagem foi aberta e recusou a troca ou o estorno do valor.',
    isAnonymous: true,
    moderationStatus: 'Aprovado',
    createdAt: '2023-09-22T15:20:00Z',
  },
  {
    id: 'r3',
    companyId: '2',
    companyName: 'Telefonia Conecta+',
    companySlug: 'telefonia-conecta-mais',
    amountRange: 'N/A',
    purchaseDate: '2023-07-01',
    currentStatus: 'Cobrança indevida na fatura mensal',
    narrative: 'Fui cobrado por um serviço de "serviços digitais" que nunca contratei. Já liguei 3 vezes para a central, eles dizem que vão remover a cobrança, mas ela continua aparecendo nas faturas seguintes.',
    isAnonymous: false,
    publicNameInitials: 'M.O.',
    moderationStatus: 'Aprovado',
    createdAt: '2023-09-20T08:45:00Z',
  },
  {
    id: 'r4',
    companyId: '1',
    companyName: 'Loja Varejista Express',
    companySlug: 'loja-varejista-express',
    amountRange: 'R$ 2.000 - R$ 3.000',
    purchaseDate: '2023-09-05',
    promisedDeadline: '2023-09-15',
    currentStatus: 'Cancelamento não processado e valor não estornado',
    narrative: 'Cancelei a compra de uma TV no dia seguinte, conforme orientação do site. Já se passaram 20 dias e o estorno não foi realizado no meu cartão de crédito. A empresa alega "problemas sistêmicos".',
    isAnonymous: true,
    moderationStatus: 'Aprovado',
    createdAt: '2023-09-28T11:00:00Z',
  },
  {
    id: 'r5',
    companyId: '2',
    companyName: 'Telefonia Conecta+',
    companySlug: 'telefonia-conecta-mais',
    amountRange: 'N/A',
    purchaseDate: '2023-09-10',
    currentStatus: 'Portabilidade de número não concluída',
    narrative: 'Solicitei a portabilidade do meu número para a Conecta+ e o prazo era de 3 dias úteis. Já se passaram 10 dias e ainda estou sem serviço. A empresa de origem diz que o pedido foi liberado e a Conecta+ não me dá uma posição.',
    isAnonymous: false,
    publicNameInitials: 'A.L.',
    moderationStatus: 'Aprovado',
    createdAt: '2023-09-25T18:00:00Z',
  },
];

export const news: News[] = [
    {
        id: 'n1',
        companyId: '1',
        title: 'Procon notifica Varejista Express por atraso generalizado nas entregas da Black Friday',
        sourceName: 'G1 Notícias',
        url: '#',
        publishedAt: '2023-12-05',
        excerpt: 'O órgão de defesa do consumidor deu 48 horas para a empresa prestar esclarecimentos sobre o alto volume de reclamações.',
        createdAt: '2023-12-05T14:00:00Z',
    },
    {
        id: 'n2',
        companyId: '2',
        title: 'Anatel multa Conecta+ por falhas na prestação de serviço de banda larga',
        sourceName: 'Agência Brasil',
        url: '#',
        publishedAt: '2023-11-20',
        excerpt: 'A multa, no valor de R$ 5 milhões, foi aplicada após a agência constatar o não cumprimento de metas de qualidade.',
        createdAt: '2023-11-20T10:00:00Z',
    }
];


export const metrics: Record<string, Metric> = {
  '1': {
    tmr: 25, // dias
    sd: 18, // casos
    trpe: 35, // %
    totalReports: 152,
  },
  '2': {
    tmr: 12, // dias
    sd: 5, // casos
    trpe: 68, // %
    totalReports: 43,
  },
};


export const events: Record<string, Event[]> = {
    '1': [
        { id: 'e1', companyId: '1', type: 'news', title: 'Notificação do Procon', description: 'Empresa notificada por atrasos.', date: '2023-12-05', createdAt: '2023-12-05T14:00:00Z' },
        { id: 'e2', companyId: '1', type: 'update', title: 'Alto volume de relatos', description: 'Status alterado para "Alto volume de relatos".', date: '2023-12-01', createdAt: '2023-12-01T09:00:00Z' },
        { id: 'e3', companyId: '1', type: 'report', title: 'Novo relato de não entrega', description: 'Relato sobre TV não entregue.', date: '2023-09-28', createdAt: '2023-09-28T11:00:00Z' },
    ],
    '2': [
        { id: 'e4', companyId: '2', type: 'news', title: 'Multa da Anatel', description: 'Empresa multada por falhas na banda larga.', date: '2023-11-20', createdAt: '2023-11-20T10:00:00Z' },
        { id: 'e5', companyId: '2', type: 'update', title: 'Monitoramento iniciado', description: 'Empresa adicionada à plataforma.', date: '2023-02-20', createdAt: '2023-02-20T11:00:00Z' },
    ]
}

export const monthlyReportData: Record<string, MonthlyReportData[]> = {
    '1': [
        { month: 'Abr', count: 12 },
        { month: 'Mai', count: 18 },
        { month: 'Jun', count: 15 },
        { month: 'Jul', count: 25 },
        { month: 'Ago', count: 30 },
        { month: 'Set', count: 52 },
    ],
    '2': [
        { month: 'Abr', count: 5 },
        { month: 'Mai', count: 3 },
        { month: 'Jun', count: 8 },
        { month: 'Jul', count: 6 },
        { month: 'Ago', count: 10 },
        { month: 'Set', count: 11 },
    ],
}

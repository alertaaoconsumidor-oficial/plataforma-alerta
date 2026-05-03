import type { PublicCaseStats } from "../types/case-stats.types";

export const mockPublicCaseStats: PublicCaseStats = {
  caseId: "case-demo-001",
  caseSlug: "varejo-digital-demo",
  companyName: "Varejo Digital Demonstrativo",
  companyDocument: "00.000.000/0001-00",
  companyStatus: "active",
  isDemonstrative: true,
  lastUpdatedAt: "2026-05-03T20:00:00-04:00",
  totalReports: 184,
  totalConsumers: 171,
  totalEstimatedLoss: 286450,
  averageDaysUnresolved: 38,
  affectedCities: 26,
  affectedStates: 9,
  reportsWithDocuments: 139,
  statusDistribution: [
    { status: "Recebido", total: 54 },
    { status: "Em análise", total: 62 },
    { status: "Documentado", total: 41 },
    { status: "Resolvido parcialmente", total: 18 },
    { status: "Resolvido", total: 9 },
  ],
  lossRanges: [
    { range: "Até R$ 250", total: 32 },
    { range: "R$ 251 a R$ 1 mil", total: 79 },
    { range: "R$ 1 mil a R$ 5 mil", total: 51 },
    { range: "Acima de R$ 5 mil", total: 22 },
  ],
  monthlyReports: [
    { month: "Dez", reports: 14, estimatedLoss: 18400 },
    { month: "Jan", reports: 22, estimatedLoss: 31200 },
    { month: "Fev", reports: 31, estimatedLoss: 45800 },
    { month: "Mar", reports: 38, estimatedLoss: 58300 },
    { month: "Abr", reports: 43, estimatedLoss: 70650 },
    { month: "Mai", reports: 36, estimatedLoss: 62100 },
  ],
  cities: [
    { city: "São Paulo", state: "SP", reports: 34, estimatedLoss: 68400 },
    { city: "Rio de Janeiro", state: "RJ", reports: 22, estimatedLoss: 39800 },
    { city: "Belo Horizonte", state: "MG", reports: 18, estimatedLoss: 27100 },
    { city: "Curitiba", state: "PR", reports: 15, estimatedLoss: 23400 },
    { city: "Salvador", state: "BA", reports: 12, estimatedLoss: 18750 },
    { city: "Cuiabá", state: "MT", reports: 10, estimatedLoss: 14600 },
  ],
  problemTypes: [
    { type: "Produto não entregue", total: 68 },
    { type: "Estorno pendente", total: 45 },
    { type: "Atendimento sem resposta", total: 39 },
    { type: "Produto divergente", total: 21 },
    { type: "Outros relatos", total: 11 },
  ],
};

export function getMockPublicCaseStats(caseSlug: string) {
  if (caseSlug !== mockPublicCaseStats.caseSlug) {
    return undefined;
  }

  return mockPublicCaseStats;
}

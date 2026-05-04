export type CaseMetric = {
  label: string;
  value: string;
  helper: string;
};

export type CaseDistributionItem = {
  label: string;
  value: number;
  helper?: string;
};

export type CaseCityStat = {
  city: string;
  state: string;
  reports: number;
  estimatedLoss: number;
  latitude: number;
  longitude: number;
};

export type CaseTimelineItem = {
  date: string;
  title: string;
  description: string;
};

export type RelatedCnpj = {
  cnpj: string;
  legalName: string;
  tradeName: string;
  status: string;
  openedAt: string;
  mainActivity: string;
  address: string;
  city: string;
  state: string;
  partners: string[];
  sourceNote: string;
};

export type PublicCaseStats = {
  slug: string;
  title: string;
  subtitle: string;
  lastUpdatedAt: string;
  totalReports: number;
  totalVictims: number;
  totalEstimatedLoss: number;
  averageLoss: number;
  affectedCities: number;
  affectedStates: number;
  averageDaysUnresolved: number;
  longestDaysUnresolved: number;
  reportsWithDocuments: number;
  reportsWithPaymentProof: number;
  reportsWithContract: number;
  reportsWithMessages: number;
  reportsWithProtocol: number;
  statusDistribution: CaseDistributionItem[];
  lossRanges: CaseDistributionItem[];
  monthlyReports: CaseDistributionItem[];
  cities: CaseCityStat[];
  problemTypes: CaseDistributionItem[];
};

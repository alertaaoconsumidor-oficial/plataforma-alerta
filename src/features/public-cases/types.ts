export type CaseMetric = {
  label: string;
  value: string;
  helper: string;
};

export type CaseDistributionItem = {
  label: string;
  value: number;
};

export type CaseCityStat = {
  city: string;
  state: string;
  reports: number;
  estimatedLoss: number;
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

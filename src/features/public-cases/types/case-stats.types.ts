export type CompanyStatus = "active" | "inactive" | "bankrupt" | "unknown";

export type StatusDistributionItem = {
  status: string;
  total: number;
};

export type LossRangeItem = {
  range: string;
  total: number;
};

export type MonthlyReportItem = {
  month: string;
  reports: number;
  estimatedLoss: number;
};

export type CityStatsItem = {
  city: string;
  state: string;
  reports: number;
  estimatedLoss: number;
};

export type ProblemTypeItem = {
  type: string;
  total: number;
};

export type PublicCaseStats = {
  caseId: string;
  caseSlug: string;
  companyName: string;
  companyDocument?: string;
  companyStatus: CompanyStatus;
  isDemonstrative: boolean;
  lastUpdatedAt: string;
  totalReports: number;
  totalConsumers: number;
  totalEstimatedLoss: number;
  averageDaysUnresolved: number;
  affectedCities: number;
  affectedStates: number;
  reportsWithDocuments: number;
  statusDistribution: StatusDistributionItem[];
  lossRanges: LossRangeItem[];
  monthlyReports: MonthlyReportItem[];
  cities: CityStatsItem[];
  problemTypes: ProblemTypeItem[];
};

import { companies, reports, metrics, news, events, monthlyReportData } from './seed-data';
import type { Company, Report, Metric, News, Event, MonthlyReportData } from './types';

// Simulate API latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getCompanies(): Promise<Company[]> {
  await delay(100);
  return companies;
}

export async function getCompanyBySlug(slug: string): Promise<Company | undefined> {
  await delay(100);
  return companies.find(c => c.slug === slug);
}

export async function getReportsByCompanyId(companyId: string): Promise<Report[]> {
  await delay(100);
  return reports.filter(r => r.companyId === companyId && r.moderationStatus === 'Aprovado');
}

export async function getRecentReports(limit: number): Promise<Report[]> {
  await delay(100);
  return [...reports]
    .filter(r => r.moderationStatus === 'Aprovado')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export async function getTopCompaniesByReports(limit: number): Promise<(Company & { reportCount: number })[]> {
    await delay(100);
    const reportCounts = reports.reduce((acc, report) => {
        acc[report.companyId] = (acc[report.companyId] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return companies
        .map(company => ({
            ...company,
            reportCount: reportCounts[company.id] || 0,
        }))
        .sort((a, b) => b.reportCount - a.reportCount)
        .slice(0, limit);
}

export async function getMetricsByCompanyId(companyId: string): Promise<Metric | undefined> {
  await delay(100);
  return metrics[companyId];
}

export async function getNewsByCompanyId(companyId: string): Promise<News[]> {
  await delay(100);
  return news.filter(n => n.companyId === companyId);
}

export async function getEventsByCompanyId(companyId: string): Promise<Event[]> {
    await delay(100);
    return events[companyId] || [];
}

export async function getMonthlyReportData(companyId: string): Promise<MonthlyReportData[]> {
    await delay(100);
    return monthlyReportData[companyId] || [];
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BarChart3, MapPinned } from "lucide-react";

import {
  getMockPublicCaseStats,
  mockPublicCaseStats,
} from "@/features/public-cases/data/mock-case-stats";
import { CaseCityTable } from "@/features/public-cases/components/case-city-table";
import { CaseDocumentationStats } from "@/features/public-cases/components/case-documentation-stats";
import { CaseLossRangeChart } from "@/features/public-cases/components/case-loss-range-chart";
import { CaseProblemTypes } from "@/features/public-cases/components/case-problem-types";
import { CasePublicNotice } from "@/features/public-cases/components/case-public-notice";
import { CaseStatsCards } from "@/features/public-cases/components/case-stats-cards";
import { CaseStatsHeader } from "@/features/public-cases/components/case-stats-header";
import { CaseStatusChart } from "@/features/public-cases/components/case-status-chart";
import { CaseTimelineChart } from "@/features/public-cases/components/case-timeline-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  params: Promise<{ caseSlug: string }>;
};

export function generateStaticParams() {
  return [{ caseSlug: mockPublicCaseStats.caseSlug }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { caseSlug } = await params;
  const stats = getMockPublicCaseStats(caseSlug);

  if (!stats) {
    return {
      title: "Painel não encontrado",
    };
  }

  return {
    title: `${stats.companyName} | Estatísticas demonstrativas`,
    description:
      "Painel público demonstrativo com dados agregados e anonimizados.",
  };
}

export default async function CaseStatsPage({ params }: Props) {
  const { caseSlug } = await params;
  const stats = getMockPublicCaseStats(caseSlug);

  if (!stats) {
    notFound();
  }

  return (
    <div className="bg-background">
      <CaseStatsHeader stats={stats} />

      <main className="container mx-auto space-y-8 px-4 py-10 md:px-6 md:py-12">
        <CasePublicNotice />

        <CaseStatsCards stats={stats} />

        <section className="grid gap-6 xl:grid-cols-2">
          <CaseTimelineChart data={stats.monthlyReports} />
          <CaseStatusChart data={stats.statusDistribution} />
          <CaseLossRangeChart data={stats.lossRanges} />
          <CaseDocumentationStats stats={stats} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPinned className="h-5 w-5 text-primary" />
                Cidades com relatos agregados
              </CardTitle>
              <CardDescription>
                Dados fictícios por cidade e Estado. Não há bairro, endereço ou
                localização individual.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CaseCityTable cities={stats.cities} />
            </CardContent>
          </Card>

          <CaseProblemTypes data={stats.problemTypes} />
        </section>

        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Como este painel deverá funcionar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Na fase atual, todos os números são demonstrativos. Em produção,
              esta página deverá consumir somente tabelas ou coleções de
              estatísticas públicas agregadas.
            </p>
            <p>
              Relatos privados, dados pessoais e documentos permanecerão em
              camadas restritas, com autenticação, autorização e moderação antes
              de qualquer publicação.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

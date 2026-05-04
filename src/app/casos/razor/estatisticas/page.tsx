import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarClock, FileCheck2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseBarList } from "@/features/public-cases/components/case-bar-list";
import { CaseCityTable } from "@/features/public-cases/components/case-city-table";
import { CaseLgpdNotice } from "@/features/public-cases/components/case-lgpd-notice";
import { CaseStatCardGrid } from "@/features/public-cases/components/case-stat-card-grid";
import {
  razorPreliminaryStats,
  razorPrimaryMetrics,
} from "@/features/public-cases/data/razor-preliminary-stats";

export const metadata: Metadata = {
  title: "Estatisticas do CASO RAZOR | Alerta ao Consumidor",
  description:
    "Painel preliminar com estatisticas agregadas do CASO RAZOR, sem dados pessoais.",
};

const documentationItems = [
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

export default function CasoRazorEstatisticasPage() {
  return (
    <div className="bg-background">
      <section className="border-b bg-muted/40">
        <div className="container mx-auto px-4 py-10 md:px-6 md:py-14">
          <Button asChild variant="ghost" className="mb-6 px-0">
            <Link href="/casos/razor">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao caso
            </Link>
          </Button>
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Estatisticas preliminares do CASO RAZOR
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Dados agregados para documentacao coletiva. Os numeros abaixo
              representam relatos informados voluntariamente e ainda podem ser
              revisados durante a etapa de validacao.
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarClock className="h-4 w-4" />
              Atualizado em {razorPreliminaryStats.lastUpdatedAt}
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto space-y-8 px-4 py-10 md:px-6 md:py-14">
        <CaseLgpdNotice />
        <CaseStatCardGrid metrics={razorPrimaryMetrics} />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Status dos relatos</CardTitle>
            </CardHeader>
            <CardContent>
              <CaseBarList
                items={razorPreliminaryStats.statusDistribution}
                total={razorPreliminaryStats.totalReports}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Faixas de prejuizo informado</CardTitle>
            </CardHeader>
            <CardContent>
              <CaseBarList
                items={razorPreliminaryStats.lossRanges}
                total={razorPreliminaryStats.totalReports}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evolucao mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <CaseBarList
                items={razorPreliminaryStats.monthlyReports}
                total={Math.max(
                  ...razorPreliminaryStats.monthlyReports.map(
                    (item) => item.value
                  )
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tipos de problema relatado</CardTitle>
            </CardHeader>
            <CardContent>
              <CaseBarList
                items={razorPreliminaryStats.problemTypes}
                total={razorPreliminaryStats.totalReports}
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Cidades informadas</CardTitle>
            </CardHeader>
            <CardContent>
              <CaseCityTable cities={razorPreliminaryStats.cities} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileCheck2 className="h-5 w-5 text-primary" />
                Documentacao informada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CaseBarList
                items={documentationItems}
                total={razorPreliminaryStats.totalReports}
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

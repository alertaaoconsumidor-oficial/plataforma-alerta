import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  FileCheck2,
  FileText,
  MapPinned,
  MessageSquareText,
  ShieldCheck,
  TriangleAlert,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { KpiOverview } from "@/components/charts/kpi-overview";
import { MonthlyReportsChart } from "@/components/charts/monthly-reports-chart";
import { AnimatedNumber } from "@/features/public-cases/components/animated-number";
import { CaseBarList } from "@/features/public-cases/components/case-bar-list";
import { BrazilCaseMap } from "@/features/public-cases/components/brazil-case-map";
import { CaseLgpdNotice } from "@/features/public-cases/components/case-lgpd-notice";
import { ClosedCompanyNotice } from "@/features/public-cases/components/closed-company-notice";
import { PublicNewsLinks } from "@/features/public-cases/components/public-news-links";
import { RelatedCnpjsDialog } from "@/features/public-cases/components/related-cnpjs-dialog";
import {
  razorDocumentationMetrics,
  razorMediaReferences,
  razorMetrics,
  razorMonthlyReportData,
  razorPreliminaryStats,
  razorRelatedCnpjs,
  razorPublicReports,
  razorStateComparison,
  razorTimeline,
} from "@/features/public-cases/data/razor-preliminary-stats";

export const metadata: Metadata = {
  title: "CASO RAZOR | Alerta ao Consumidor",
  description:
    "Dossie publico do CASO RAZOR com organizacao documental e estatistica de relatos agregados.",
};

export default function CasoRazorPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-10 md:px-6 md:py-12">
        <header className="mb-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
            <div className="max-w-4xl">
              <Badge className="mb-4 border-amber-200 bg-amber-100 text-base text-amber-800">
                Em organizacao coletiva
              </Badge>
              <div className="flex items-center gap-3">
                <TriangleAlert className="h-10 w-10 shrink-0 text-primary md:h-12 md:w-12" />
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  {razorPreliminaryStats.title}
                </h1>
              </div>
              <p className="mt-3 text-base font-semibold text-foreground/80">
                CNPJ principal informado: 12.345.678/0001-90
              </p>
              <p className="mt-4 max-w-3xl text-muted-foreground">
                Organizacao de relatos, preservacao de provas privadas e
                consolidacao de dados preliminares com responsabilidade
                informativa.
              </p>
            </div>

            <div className="space-y-4 lg:pt-10">
              <p className="text-sm text-muted-foreground lg:text-right">
                Atualizado em {razorPreliminaryStats.lastUpdatedAt}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border-primary/40 bg-primary text-primary-foreground shadow-md">
                  <CardContent className="p-5">
                    <p className="text-sm font-semibold opacity-80">
                      Total de relatos
                    </p>
                    <p className="mt-3 text-4xl font-bold">
                      <AnimatedNumber
                        value={razorPreliminaryStats.totalReports}
                      />
                    </p>
                    <p className="mt-2 text-xs font-medium opacity-75">
                      Relatos agregados
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-foreground/10 bg-foreground text-background shadow-md">
                  <CardContent className="p-5">
                    <p className="text-sm font-semibold opacity-75">
                      Prejuizo estimado
                    </p>
                    <p className="mt-3 text-3xl font-bold">
                      <AnimatedNumber
                        value={razorPreliminaryStats.totalEstimatedLoss}
                        currency
                      />
                    </p>
                    <p className="mt-2 text-xs font-medium opacity-70">
                      Valor declarado
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/enviar-relato?caso=razor">
                <FileText className="mr-2 h-4 w-4" />
                Registrar relato sobre o caso
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/casos/razor/direito-de-resposta">
                <MessageSquareText className="mr-2 h-4 w-4" />
                Direito de resposta
              </Link>
            </Button>
            <RelatedCnpjsDialog items={razorRelatedCnpjs} />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <main className="space-y-12 lg:col-span-2">
            <ClosedCompanyNotice />

            <section id="estatisticas" className="scroll-mt-24">
              <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold">
                <ShieldCheck className="h-7 w-7 text-primary" />
                Indicadores Chave
              </h2>
              <KpiOverview metrics={razorMetrics} />
            </section>

            <Separator />

            <section className="space-y-6">
              <div>
                <h2 className="flex items-center gap-3 text-3xl font-bold">
                  <MapPinned className="h-7 w-7 text-primary" />
                  Distribuicao geografica
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Mapa interativo com estados reais do Brasil e comparativo por
                  UF para leitura rapida do alcance.
                </p>
              </div>
              <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <BrazilCaseMap cities={razorPreliminaryStats.cities} />
                <Card>
                  <CardHeader>
                    <CardTitle>Comparativo por estado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CaseBarList
                      items={razorStateComparison}
                      total={razorPreliminaryStats.totalReports}
                      valueSuffix=" relatos"
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            <section className="grid gap-6 md:grid-cols-2">
              <MonthlyReportsChart data={razorMonthlyReportData} />

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
                  <CardTitle>Tipos de problema relatado</CardTitle>
                </CardHeader>
                <CardContent>
                  <CaseBarList
                    items={razorPreliminaryStats.problemTypes}
                    total={razorPreliminaryStats.totalReports}
                  />
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
                    items={razorDocumentationMetrics}
                    total={razorPreliminaryStats.totalReports}
                  />
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold">
                <FileText className="h-7 w-7 text-primary" />
                Relatos de Consumidores
              </h2>
              <div className="space-y-6">
                {razorPublicReports.map((report) => (
                  <Card key={report.id}>
                    <CardHeader>
                      <CardTitle className="text-xl">
                        Relato sobre: {report.currentStatus}
                      </CardTitle>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <User className="h-4 w-4" />
                          {report.isAnonymous
                            ? "Anonimo"
                            : report.publicNameInitials}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {new Date(report.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-card-foreground/80">
                        {report.narrative}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            <PublicNewsLinks items={razorMediaReferences} />

            <CaseLgpdNotice />
          </main>

          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Calendar className="h-6 w-6 text-primary" />
                    Linha do Tempo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative space-y-8 pl-6 before:absolute before:inset-y-0 before:left-2 before:w-px before:bg-border">
                    {razorTimeline.map((event) => (
                      <div key={event.title} className="relative">
                        <div className="absolute left-[-29px] top-1 h-4 w-4 rounded-full border-4 border-background bg-primary" />
                        <p className="font-semibold">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.date}
                        </p>
                        <p className="mt-1 text-sm">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

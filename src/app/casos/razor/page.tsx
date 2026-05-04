import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  FileCheck2,
  FileText,
  MapPinned,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseBarList } from "@/features/public-cases/components/case-bar-list";
import { BrazilCaseMap } from "@/features/public-cases/components/brazil-case-map";
import { CaseCityTable } from "@/features/public-cases/components/case-city-table";
import { CaseLgpdNotice } from "@/features/public-cases/components/case-lgpd-notice";
import { CaseStatCardGrid } from "@/features/public-cases/components/case-stat-card-grid";
import { ClosedCompanyNotice } from "@/features/public-cases/components/closed-company-notice";
import {
  razorDocumentationMetrics,
  razorPreliminaryStats,
  razorPrimaryMetrics,
  razorTimeline,
} from "@/features/public-cases/data/razor-preliminary-stats";

export const metadata: Metadata = {
  title: "CASO RAZOR | Alerta ao Consumidor",
  description:
    "Caso inicial do Alerta ao Consumidor para organizacao documental e estatistica de relatos agregados.",
};

const actionCards = [
  {
    title: "Registrar relato",
    description:
      "Consumidores afetados podem registrar informacoes factuais para organizacao coletiva.",
    href: "/enviar-relato?caso=razor",
    icon: FileText,
  },
  {
    title: "Direito de resposta",
    description:
      "Canal para manifestacao formal de representantes, compliance ou interessados.",
    href: "/casos/razor/direito-de-resposta",
    icon: MessageSquareText,
  },
];

export default function CasoRazorPage() {
  return (
    <div className="bg-background">
      <section className="border-b bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-4xl">
              <Badge variant="secondary">Caso piloto</Badge>
              <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
                {razorPreliminaryStats.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-primary-foreground/90 md:text-xl">
                {razorPreliminaryStats.subtitle}: organizacao de relatos,
                preservacao de provas privadas e consolidacao de dados
                preliminares com responsabilidade informativa.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/enviar-relato?caso=razor">
                    Registrar relato <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href="#estatisticas">Ver painel do caso</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-primary-foreground/30 bg-primary-foreground/10 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <CalendarClock className="h-4 w-4" />
                Atualizado em {razorPreliminaryStats.lastUpdatedAt}
              </p>
              <p className="mt-3 text-sm leading-6 text-primary-foreground/85">
                Os dados sao preliminares, agregados e baseados em relatos
                informados voluntariamente. Nenhum dado pessoal ou documento e
                exibido publicamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto space-y-10 px-4 py-10 md:px-6 md:py-14">
        <ClosedCompanyNotice />

        <div id="estatisticas" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-primary">
                Painel do caso
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Panorama preliminar
              </h2>
            </div>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Esta secao consolida a visao estatistica, geografica e documental
              do CASO RAZOR em uma unica pagina.
            </p>
          </div>

          <CaseStatCardGrid metrics={razorPrimaryMetrics} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {actionCards.map((card) => (
            <Card key={card.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <card.icon className="h-5 w-5 text-primary" />
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
                <Button asChild variant="link" className="mt-4 px-0">
                  <Link href={card.href}>
                    Acessar <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Comunicacao responsavel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Dados publicos sempre agregados e preliminares.</li>
                <li>Nenhum documento e publicado automaticamente.</li>
                <li>Nomes de vitimas e dados pessoais nao sao exibidos.</li>
                <li>A plataforma nao declara culpa definitiva.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Finalidade do caso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                O CASO RAZOR reune relatos de consumidores que afirmam ter
                sofrido prejuizos relacionados a contratacoes, pagamentos ou
                negociacoes vinculadas a empresa atualmente encerrada, inativa
                ou sem operacao identificada.
              </p>
              <p>
                A finalidade publica e dar escala, contexto e organizacao aos
                relatos, sem substituir avaliacao juridica ou institucional dos
                fatos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MapPinned className="h-5 w-5 text-primary" />
                Alcance territorial
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-muted-foreground">
              As cidades informadas ajudam a visualizar a distribuicao
              preliminar dos relatos. A localizacao no mapa e aproximada e tem
              finalidade informativa, nao pericial.
            </CardContent>
          </Card>
        </div>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Distribuicao geografica
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Mapa do Brasil com marcacoes aproximadas nas cidades informadas e
              tabela de apoio para leitura detalhada.
            </p>
          </div>
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <BrazilCaseMap cities={razorPreliminaryStats.cities} />
            <Card>
              <CardHeader>
                <CardTitle>Cidades informadas</CardTitle>
              </CardHeader>
              <CardContent>
                <CaseCityTable cities={razorPreliminaryStats.cities} />
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
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
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
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

          <Card>
            <CardHeader>
              <CardTitle>Linha do tempo coletiva</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-6 pl-6 before:absolute before:inset-y-0 before:left-2 before:w-px before:bg-border">
                {razorTimeline.map((event) => (
                  <div key={event.title} className="relative">
                    <div className="absolute left-[-23px] top-1 h-4 w-4 rounded-full border-4 border-background bg-primary" />
                    <p className="text-xs font-semibold uppercase text-primary">
                      {event.date}
                    </p>
                    <p className="mt-1 font-semibold">{event.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <CaseLgpdNotice />
      </section>
    </div>
  );
}

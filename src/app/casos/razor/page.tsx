import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  FileCheck2,
  FileText,
  LockKeyhole,
  MapPinned,
  MessageSquareText,
  ShieldCheck,
  TriangleAlert,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimatedNumber } from "@/features/public-cases/components/animated-number";
import { BrazilCaseMap } from "@/features/public-cases/components/brazil-case-map";
import { CaseBarList } from "@/features/public-cases/components/case-bar-list";
import { CaseLgpdNotice } from "@/features/public-cases/components/case-lgpd-notice";
import { ClosedCompanyNotice } from "@/features/public-cases/components/closed-company-notice";
import { PublicNewsLinks } from "@/features/public-cases/components/public-news-links";
import { PublicReportCard } from "@/features/public-cases/components/public-report-card";
import { ScrollAnimatedNumber } from "@/features/public-cases/components/scroll-animated-number";
import { ScrollGrowBar } from "@/features/public-cases/components/scroll-grow-bar";
import {
  razorDocumentationMetrics,
  razorMediaReferences,
  razorMetrics,
  razorMonthlyReportData,
  razorPreliminaryStats,
  razorPublicReports,
  razorStateComparison,
  razorTimeline,
} from "@/features/public-cases/data/razor-preliminary-stats";

export const metadata: Metadata = {
  title: "Caso Razor | Alerta ao Consumidor",
  description:
    "Página pública do Caso Razor com relatos agregados, distribuição geográfica, indicadores e referências públicas.",
};

const heroHighlights = [
  {
    title: "Dados agregados",
    description: "Apenas números consolidados aparecem em área pública.",
    icon: BarChart3,
  },
  {
    title: "Provas privadas",
    description: "Documentos e anexos permanecem em camada restrita.",
    icon: LockKeyhole,
  },
  {
    title: "Direito de resposta",
    description: "Há canal próprio para manifestação e contextualização.",
    icon: MessageSquareText,
  },
];

const executiveCards = [
  {
    title: "O que a página organiza",
    description:
      "Relatos de consumidores, datas, valores declarados, status de atendimento e evidências informadas, sempre em linguagem cautelosa.",
    icon: ClipboardCheck,
  },
  {
    title: "Como os dados são exibidos",
    description:
      "A leitura pública prioriza indicadores coletivos, mapa por UF/cidade e referências externas, sem expor vítimas ou documentos.",
    icon: ShieldCheck,
  },
  {
    title: "Para que serve",
    description:
      "Dar contexto informativo, apoiar decisões de consumo e orientar pessoas afetadas a preservar documentos e relatar com responsabilidade.",
    icon: Users,
  },
];

const nextSteps = [
  "Validar novos relatos recebidos pelo formulário oficial.",
  "Classificar documentos privados por tipo de evidência.",
  "Atualizar o painel agregado quando houver base conferida.",
  "Preparar dossiê informativo com metodologia e fontes públicas.",
];

const reportViews = [4800, 3400, 2700];

export default function CasoRazorPage() {
  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden bg-[#0c0c0c] text-white">
        <Image
          src="/razor-bg.webp"
          alt="Imagem pública relacionada ao Caso Razor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/88 to-[#050505]/34" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-primary/18 blur-3xl" />

        <div className="container relative mx-auto px-4 py-14 md:px-6 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div className="max-w-4xl">
              <Badge className="mb-5 border-primary/40 bg-primary text-primary-foreground">
                Em organização coletiva
              </Badge>
              <div className="flex items-center gap-4">
                <TriangleAlert className="h-12 w-12 shrink-0 text-primary md:h-16 md:w-16" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                    Frente solidária informativa
                  </p>
                  <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-6xl">
                    {razorPreliminaryStats.title}
                  </h1>
                </div>
              </div>

              <p className="mt-5 text-lg font-semibold text-white/88">
                CNPJ principal informado: 12.345.678/0001-90
              </p>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/72 md:text-lg">
                Página pública para organizar relatos, preservar provas privadas
                e apresentar indicadores preliminares com cautela jurídica,
                transparência e direito de resposta.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg">
                  <Link href="/enviar-relato?caso=razor">
                    <FileText className="mr-2 h-4 w-4" />
                    Registrar relato
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <Link href="#indicadores">
                    Ver indicadores <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-black/20 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/casos/razor/direito-de-resposta">
                    <MessageSquareText className="mr-2 h-4 w-4" />
                    Direito de resposta
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/25 !bg-black/20 text-white hover:border-primary hover:!bg-primary hover:text-primary-foreground"
                >
                  <Link href="/casos/razor/cnpjs">
                    <Building2 className="mr-2 h-4 w-4" />
                    CNPJs relacionados
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <HeroMetric
                label="Total de relatos"
                value={razorPreliminaryStats.totalReports}
                description="Relatos agregados na base preliminar."
                icon={FileCheck2}
                tone="primary"
              />
              <HeroMetric
                label="Prejuízo estimado"
                value={razorPreliminaryStats.totalEstimatedLoss}
                description="Valor declarado pelos consumidores."
                icon={CircleDollarSign}
                currency
              />
            </div>
          </div>

          <div className="mt-12 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-3">
            {heroHighlights.map((item) => (
              <TrustHighlight key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <main className="space-y-14">
            <ClosedCompanyNotice />

            <section id="resumo" className="scroll-mt-24">
              <SectionHeading
                eyebrow="Resumo executivo"
                title="O caso em leitura pública"
                description="A página foi organizada para dar contexto, consolidar informações preliminares e orientar próximos passos sem expor dados pessoais."
                icon={ShieldCheck}
              />
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {executiveCards.map((card) => (
                  <ExecutiveCard key={card.title} {...card} />
                ))}
              </div>
            </section>

            <section id="distribuicao" className="scroll-mt-24">
              <SectionHeading
                eyebrow="Alcance informado"
                title="Distribuição geográfica"
                description="Mapa interativo com estados reais do Brasil, marcadores por cidade e comparativo agregado por UF."
                icon={MapPinned}
              />
              <div className="mt-6 grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
                <div className="rounded-lg border bg-card p-2 shadow-sm">
                  <BrazilCaseMap cities={razorPreliminaryStats.cities} />
                </div>
                <Card className="shadow-sm">
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

            <section
              id="indicadores"
              className="relative isolate scroll-mt-24 overflow-hidden rounded-lg bg-[#111111] p-5 text-white shadow-xl md:p-7"
            >
              <Image
                src="/home-hero-consumo.png"
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-center opacity-20 mix-blend-screen"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/88 to-[#111111]/62" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/65" />

              <div className="relative mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                    Indicadores públicos
                  </p>
                  <h2 className="mt-2 text-3xl font-bold">
                    Métricas do Caso Razor
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
                    Números preliminares calculados para leitura coletiva, sem
                    conclusão definitiva sobre responsabilidade.
                  </p>
                </div>
                <Button asChild variant="link" className="px-0 text-primary">
                  <Link href="/metodologia">
                    Ver metodologia completa{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <DarkMetricCard
                  label="Relatos"
                  value={razorMetrics.totalReports}
                  description="Base agregada"
                  icon={FileCheck2}
                />
                <DarkMetricCard
                  label="TMR"
                  value={razorMetrics.tmr}
                  suffix="dias"
                  description="Tempo médio sem resolução"
                  icon={Calendar}
                />
                <DarkMetricCard
                  label="SD"
                  value={razorMetrics.sd}
                  suffix="casos"
                  description="Silêncio documentado"
                  icon={MessageSquareText}
                />
                <DarkMetricCard
                  label="TRPE"
                  value={razorMetrics.trpe}
                  suffix="%"
                  description="Pós-escalonamento"
                  icon={ShieldCheck}
                />
                <DarkMetricCard
                  label="Cidades"
                  value={razorPreliminaryStats.affectedCities}
                  description={`${razorPreliminaryStats.affectedStates} estados informados`}
                  icon={MapPinned}
                />
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <ChartShell className="md:col-span-2">
                <MonthlyTrend />
              </ChartShell>

              <DistributionCard
                title="Status dos relatos"
                items={razorPreliminaryStats.statusDistribution}
              />
              <DistributionCard
                title="Faixas de prejuízo informado"
                items={razorPreliminaryStats.lossRanges}
              />
              <DistributionCard
                title="Tipos de problema relatado"
                items={razorPreliminaryStats.problemTypes}
              />
              <DistributionCard
                title="Documentação informada"
                items={razorDocumentationMetrics}
                icon={FileCheck2}
              />
            </section>

            <Separator />

            <section id="relatos" className="scroll-mt-24">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <SectionHeading
                  eyebrow="Relatos públicos"
                  title="Experiências de consumidores"
                  description="Amostras moderadas com dados pessoais suprimidos. Documentos, prints e comprovantes não são publicados automaticamente."
                  icon={FileText}
                />
                <Button asChild variant="outline">
                  <Link href="/casos/razor/relatos">
                    Ver todos os relatos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-6 grid gap-5">
                {razorPublicReports.map((report, index) => (
                  <PublicReportCard
                    key={report.id}
                    report={report}
                    views={reportViews[index] ?? 1200}
                  />
                ))}
              </div>
            </section>

            <PublicNewsLinks items={razorMediaReferences} />

            <CaseLgpdNotice />

            <section className="relative isolate overflow-hidden rounded-lg border border-primary/40 bg-primary p-6 shadow-lg md:p-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/55" />
              <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-900/65">
                    Participação responsável
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
                    Teve relação com o Caso Razor?
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-zinc-900/78">
                    Envie um relato factual, preserve documentos e ajude a
                    ampliar a leitura coletiva do caso com responsabilidade.
                  </p>
                </div>
                <Button asChild className="bg-zinc-950 text-white hover:bg-zinc-800">
                  <Link href="/enviar-relato?caso=razor">
                    Enviar relato <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </section>
          </main>

          <aside className="lg:sticky lg:top-24">
            <TimelinePanel />
          </aside>
        </div>
      </div>
    </main>
  );
}

function HeroMetric({
  label,
  value,
  description,
  icon: Icon,
  currency = false,
  tone = "dark",
}: {
  label: string;
  value: number;
  description: string;
  icon: LucideIcon;
  currency?: boolean;
  tone?: "primary" | "dark";
}) {
  return (
    <div
      className={`rounded-lg border p-5 shadow-xl backdrop-blur ${
        tone === "primary"
          ? "border-primary/50 bg-primary text-primary-foreground"
          : "border-white/12 bg-white/10 text-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-bold opacity-75">{label}</p>
        <Icon className="h-5 w-5 opacity-70" />
      </div>
      <p className="mt-4 text-4xl font-extrabold">
        <AnimatedNumber value={value} currency={currency} />
      </p>
      <p className="mt-2 text-xs font-medium opacity-70">{description}</p>
    </div>
  );
}

function TrustHighlight({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      <div>
        <p className="font-bold">{title}</p>
        <p className="mt-1 text-sm leading-5 text-white/62">{description}</p>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 flex items-center gap-3 text-3xl font-bold">
        <Icon className="h-7 w-7 text-primary" />
        {title}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function ExecutiveCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="group border-0 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 transition group-hover:bg-primary">
          <Icon className="h-6 w-6 text-primary transition group-hover:text-primary-foreground" />
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function DarkMetricCard({
  label,
  value,
  description,
  suffix,
  icon: Icon,
}: {
  label: string;
  value: number;
  description: string;
  suffix?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="group rounded-lg border border-white/12 bg-white/[0.05] p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-primary/10 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-primary">
          {label}
        </p>
        <Icon className="h-5 w-5 text-primary/80 transition duration-300 group-hover:-translate-y-1 group-hover:text-primary" />
      </div>
      <p className="mt-4 text-4xl font-extrabold">
        <ScrollAnimatedNumber value={value} duration={1700} />
        {suffix ? (
          <span className="ml-1 text-base text-white/58">{suffix}</span>
        ) : null}
      </p>
      <p className="mt-2 text-xs leading-5 text-white/55">{description}</p>
    </div>
  );
}

function ChartShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

function MonthlyTrend() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Tendência de relatos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 md:grid-cols-[1fr_220px] md:items-center">
          <div className="h-[260px]">
            <MiniMonthlyChart />
          </div>
          <div className="space-y-3 rounded-lg bg-muted/60 p-4 text-sm leading-6">
            <p className="font-bold">Leitura preliminar</p>
            <p className="text-muted-foreground">
              O volume mensal ajuda a identificar concentração de relatos e
              momentos de maior procura pela plataforma.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniMonthlyChart() {
  const max = Math.max(...razorMonthlyReportData.map((item) => item.count), 1);

  return (
    <div className="flex h-full items-end gap-3">
      {razorMonthlyReportData.map((item, index) => (
        <div
          key={item.month}
          className="group/bar relative flex flex-1 flex-col items-center gap-2"
          title={`${item.month}: ${item.count} relatos`}
        >
          <div className="pointer-events-none absolute -top-10 z-10 rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition duration-200 group-hover/bar:-translate-y-1 group-hover/bar:opacity-100">
            {item.month}: {item.count} relatos
          </div>
          <div className="flex h-[210px] w-full items-end rounded-lg bg-muted/70 px-2">
            <ScrollGrowBar
              percent={Math.max((item.count / max) * 100, 12)}
              delayMs={index * 300}
            />
          </div>
          <span className="text-xs text-muted-foreground">{item.month}</span>
        </div>
      ))}
    </div>
  );
}

function DistributionCard({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: { label: string; value: number; helper?: string }[];
  icon?: LucideIcon;
}) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {Icon ? <Icon className="h-5 w-5 text-primary" /> : null}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CaseBarList items={items} total={razorPreliminaryStats.totalReports} />
      </CardContent>
    </Card>
  );
}

function TimelinePanel() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Calendar className="h-6 w-6 text-primary" />
          Linha do tempo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-7 pl-6 before:absolute before:inset-y-0 before:left-2 before:w-px before:bg-border">
          {razorTimeline.map((event) => (
            <div key={event.title} className="relative">
              <div className="absolute left-[-29px] top-1 h-4 w-4 rounded-full border-4 border-background bg-primary" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                {event.date}
              </p>
              <p className="mt-1 font-bold">{event.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {event.description}
              </p>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="space-y-3">
          <p className="font-bold">Próximas frentes</p>
          {nextSteps.map((step) => (
            <div key={step} className="flex gap-3 text-sm leading-6">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{step}</span>
            </div>
          ))}
        </div>

        <Button asChild className="mt-6 w-full">
          <Link href="/enviar-relato?caso=razor">
            Participar da organização
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

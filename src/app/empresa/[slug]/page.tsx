import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  CircleDollarSign,
  ExternalLink,
  FileCheck2,
  FileText,
  MapPinned,
  MessageSquareText,
  Newspaper,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BrazilCaseMap } from "@/features/public-cases/components/brazil-case-map";
import { CaseBarList } from "@/features/public-cases/components/case-bar-list";
import { CaseLgpdNotice } from "@/features/public-cases/components/case-lgpd-notice";
import { PublicReportCard } from "@/features/public-cases/components/public-report-card";
import { ScrollAnimatedNumber } from "@/features/public-cases/components/scroll-animated-number";
import { ScrollGrowBar } from "@/features/public-cases/components/scroll-grow-bar";
import {
  getPublicCompanyProfile,
  getPublicCompanySlugs,
  type PublicCompanyProfile,
} from "@/features/public-companies/data/company-public-data";

type Props = {
  params: Promise<{ slug: string }>;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function generateStaticParams() {
  return getPublicCompanySlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getPublicCompanyProfile(slug);

  if (!profile) {
    return {
      title: "Empresa não encontrada | Alerta ao Consumidor",
    };
  }

  return {
    title: `${profile.company.name} | Alerta ao Consumidor`,
    description: `Consulte relatos, indicadores públicos e informações agregadas sobre ${profile.company.name}.`,
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const profile = getPublicCompanyProfile(slug);

  if (!profile) {
    notFound();
  }

  return (
    <main className="bg-background">
      <CompanyHero profile={profile} />

      <div className="container mx-auto px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <main className="space-y-14">
            <section id="resumo" className="scroll-mt-24">
              <SectionHeading
                eyebrow="Leitura pública"
                title="Resumo da empresa"
                description="Dados exibidos em formato agregado, moderado e com cautela jurídica. A presença nesta página indica existência de relatos cadastrados, não conclusão definitiva de responsabilidade."
                icon={ShieldCheck}
              />

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <ExecutiveCard
                  title="Dados agregados"
                  description="A página resume indicadores públicos sem expor consumidores, documentos ou relatos privados brutos."
                  icon={BarChart3}
                />
                <ExecutiveCard
                  title="CNPJ contextualizado"
                  description="CNPJs informados ou relacionados aparecem com origem, status de conferência e linguagem cautelosa."
                  icon={Building2}
                />
                <ExecutiveCard
                  title="Direito de resposta"
                  description="Empresas e representantes podem solicitar correção, contextualização e manifestação formal."
                  icon={MessageSquareText}
                />
              </div>
            </section>

            <section id="indicadores" className="scroll-mt-24">
              <div className="relative isolate overflow-hidden rounded-lg bg-[#111111] p-5 text-white shadow-xl md:p-7">
                <Image
                  src="/home-hero-consumo.png"
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover object-center opacity-18 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#111111]/62" />

                <div className="relative mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                      Indicadores públicos
                    </p>
                    <h2 className="mt-2 text-3xl font-bold">
                      Painel de monitoramento
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
                      Métricas demonstrativas calculadas a partir de relatos
                      moderados e agregados.
                    </p>
                  </div>
                  <Button asChild variant="link" className="px-0 text-primary">
                    <Link href="/metodologia">
                      Ver metodologia <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  <DarkMetricCard
                    label="Relatos"
                    value={profile.metrics.totalReports}
                    description="Base pública agregada"
                    icon={FileCheck2}
                  />
                  <DarkMetricCard
                    label="TMR"
                    value={profile.metrics.tmr}
                    suffix="dias"
                    description="Tempo médio sem resolução"
                    icon={Calendar}
                  />
                  <DarkMetricCard
                    label="SD"
                    value={profile.metrics.sd}
                    suffix="casos"
                    description="Silêncio documentado"
                    icon={MessageSquareText}
                  />
                  <DarkMetricCard
                    label="TRPE"
                    value={profile.metrics.trpe}
                    suffix="%"
                    description="Resolução pós-escalonamento"
                    icon={ShieldCheck}
                  />
                  <DarkMetricCard
                    label="Cidades"
                    value={profile.affectedCities}
                    description={`${profile.affectedStates} estados informados`}
                    icon={MapPinned}
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-sm md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Tendência de relatos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MonthlyBars data={profile.monthlyData} />
                </CardContent>
              </Card>

              <DistributionCard
                title="Status dos relatos"
                items={profile.statusDistribution}
                total={profile.metrics.totalReports}
              />
              <DistributionCard
                title="Tipos de problema"
                items={profile.problemTypes}
                total={profile.metrics.totalReports}
              />
              <DistributionCard
                title="Faixas de valor informado"
                items={profile.lossRanges}
                total={profile.metrics.totalReports}
              />
              <DistributionCard
                title="Documentação informada"
                items={profile.documentMetrics}
                total={profile.metrics.totalReports}
                icon={FileCheck2}
              />
            </section>

            {profile.cityStats.length > 0 ? (
              <section id="mapa" className="scroll-mt-24">
                <SectionHeading
                  eyebrow="Distribuição"
                  title="Alcance geográfico"
                  description="Mapa com leitura agregada por cidade e estado, sem localização precisa dos consumidores."
                  icon={MapPinned}
                />
                <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-lg border bg-card p-2 shadow-sm">
                    <BrazilCaseMap cities={profile.cityStats} />
                  </div>
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle>Estados em destaque</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CaseBarList
                        items={buildStateComparison(profile.cityStats)}
                        total={profile.metrics.totalReports}
                        valueSuffix=" relatos"
                      />
                    </CardContent>
                  </Card>
                </div>
              </section>
            ) : null}

            {profile.legalEntities.length > 0 ? (
              <section id="cnpjs" className="scroll-mt-24">
                <SectionHeading
                  eyebrow="Identificação"
                  title="CNPJs informados"
                  description="CNPJs são exibidos com status de origem e conferência. Relações entre empresas não implicam responsabilidade automática."
                  icon={Building2}
                />
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {profile.legalEntities.slice(0, 2).map((entity) => (
                    <Card key={entity.cnpj} className="shadow-sm">
                      <CardContent className="p-5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold">
                            {entity.tradeName}
                          </h3>
                          <Badge variant="outline">{entity.status}</Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {entity.legalName}
                        </p>
                        <p className="mt-3 font-mono text-sm font-bold">
                          {entity.cnpj}
                        </p>
                        <p className="mt-3 text-xs leading-5 text-muted-foreground">
                          {entity.sourceNote}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ) : null}

            <Separator />

            <section id="relatos" className="scroll-mt-24">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <SectionHeading
                  eyebrow="Relatos públicos"
                  title="Experiências recentes"
                  description="Amostras moderadas, com dados pessoais removidos e documentos preservados em camada privada."
                  icon={FileText}
                />
                <Button asChild variant="outline">
                  <Link href={`/empresa/${profile.company.slug}/relatos`}>
                    Ver todos os relatos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-6 grid gap-5">
                {profile.reports.slice(0, 3).map((report, index) => (
                  <PublicReportCard
                    key={report.id}
                    report={report}
                    views={profile.reportDirectory[index]?.views ?? 900}
                  />
                ))}
              </div>
            </section>

            <CompanyNewsSection news={profile.news} />

            <CaseLgpdNotice />
          </main>

          <aside className="lg:sticky lg:top-24">
            <CompanySidebar profile={profile} />
          </aside>
        </div>
      </div>
    </main>
  );
}

function CompanyHero({ profile }: { profile: PublicCompanyProfile }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0c0c0c] text-white">
      <Image
        src={profile.heroImageUrl}
        alt={`Imagem relacionada a ${profile.company.name}`}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-48"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-[#050505]/34" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/35" />

      <div className="container relative mx-auto px-4 py-14 md:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div className="max-w-4xl">
            <Badge className="mb-5 border-primary/40 bg-primary text-primary-foreground">
              {tierLabel(profile.tier)}
            </Badge>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-primary/45 bg-primary/15">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                  {profile.company.category}
                </p>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-6xl">
                  {profile.company.name}
                </h1>
              </div>
            </div>

            <p className="mt-5 text-lg font-semibold text-white/88">
              {profile.cnpjLabel}: {profile.company.cnpj ?? "Não informado"}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/72 md:text-lg">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg">
                <Link href={`/enviar-relato?companyId=${profile.company.id}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Enviar relato
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <Link href={`/empresa/${profile.company.slug}/relatos`}>
                  Ver relatos <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 bg-black/20 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/contato">
                  <MessageSquareText className="mr-2 h-4 w-4" />
                  Direito de resposta
                </Link>
                </Button>
                {profile.legalEntities.length > 0 ? (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/25 !bg-black/20 text-white hover:border-primary hover:!bg-primary hover:text-primary-foreground"
                  >
                    <Link href={`/empresa/${profile.company.slug}/cnpjs`}>
                      <Building2 className="mr-2 h-4 w-4" />
                      CNPJs relacionados
                    </Link>
                  </Button>
                ) : null}
              </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <HeroMetric
              label="Total de relatos"
              value={profile.metrics.totalReports}
              description="Relatos agregados na leitura pública."
              icon={FileCheck2}
              tone="primary"
            />
            <HeroMetric
              label="Prejuízo estimado"
              value={profile.estimatedLoss}
              description="Valor declarado em relatos demonstrativos."
              icon={CircleDollarSign}
              currency
            />
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-3">
          <TrustHighlight
            title="Dados moderados"
            description="A página usa resumos públicos e números agregados."
            icon={ShieldCheck}
          />
          <TrustHighlight
            title="CNPJs com contexto"
            description="Origem e conferência são apresentadas com cautela."
            icon={Building2}
          />
          <TrustHighlight
            title="Monitoramento contínuo"
            description="Relatos novos alimentam indicadores e tendências."
            icon={Sparkles}
          />
        </div>
      </div>
    </section>
  );
}

function CompanySidebar({ profile }: { profile: PublicCompanyProfile }) {
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
          {profile.events.length > 0 ? (
            profile.events.map((event) => (
              <div key={event.id} className="relative">
                <div className="absolute left-[-29px] top-1 h-4 w-4 rounded-full border-4 border-background bg-primary" />
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  {formatDate(event.date)}
                </p>
                <p className="mt-1 font-bold">{event.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {event.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Ainda não há eventos públicos registrados.
            </p>
          )}
        </div>

        <Separator className="my-6" />

        <div className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p className="font-bold text-foreground">Critério de exibição</p>
          <p>
            Empresas comuns usam este template sustentável. Casos especiais
            podem ser promovidos para página premium, como o Caso Razor.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function MonthlyBars({ data }: { data: { month: string; count: number }[] }) {
  const max = Math.max(...data.map((item) => item.count), 1);

  if (!data.length) {
    return (
      <p className="text-sm text-muted-foreground">
        Ainda não há dados mensais suficientes para exibição.
      </p>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_220px] md:items-center">
      <div className="flex h-[260px] items-end gap-3">
        {data.map((item, index) => (
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
      <div className="space-y-3 rounded-lg bg-muted/60 p-4 text-sm leading-6">
        <p className="font-bold">Leitura preliminar</p>
        <p className="text-muted-foreground">
          A tendência ajuda a identificar crescimento, concentração de relatos e
          momentos de maior procura pela plataforma.
        </p>
      </div>
    </div>
  );
}

function CompanyNewsSection({ news }: { news: { id: string; title: string; sourceName: string; url: string; publishedAt: string; excerpt: string }[] }) {
  if (!news.length) {
    return null;
  }

  return (
    <section>
      <SectionHeading
        eyebrow="Fontes públicas"
        title="Notícias e registros"
        description="Links externos ajudam a contextualizar a leitura pública, sempre com fonte e data."
        icon={Newspaper}
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {news.map((item) => (
          <Card
            key={item.id}
            className="group transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
          >
            <CardContent className="p-5">
              <Badge variant="secondary">{item.sourceName}</Badge>
              <h3 className="mt-3 text-lg font-bold leading-snug">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Publicação: {formatDate(item.publishedAt)}
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href={item.url} target="_blank" rel="noreferrer">
                    Acessar fonte <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
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

function DistributionCard({
  title,
  items,
  total,
  icon: Icon,
}: {
  title: string;
  items: { label: string; value: number; helper?: string }[];
  total: number;
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
        {items.length > 0 ? (
          <CaseBarList items={items} total={total} />
        ) : (
          <p className="text-sm text-muted-foreground">
            Dados agregados ainda insuficientes.
          </p>
        )}
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
        {suffix ? <span className="ml-1 text-base text-white/58">{suffix}</span> : null}
      </p>
      <p className="mt-2 text-xs leading-5 text-white/55">{description}</p>
    </div>
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
        {currency ? currencyFormatter.format(value) : value}
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

function buildStateComparison(cities: PublicCompanyProfile["cityStats"]) {
  return Object.values(
    cities.reduce<
      Record<string, { label: string; value: number; helper: string; loss: number }>
    >((acc, city) => {
      const current = acc[city.state] ?? {
        label: city.state,
        value: 0,
        helper: "",
        loss: 0,
      };

      current.value += city.reports;
      current.loss += city.estimatedLoss;
      acc[city.state] = current;

      return acc;
    }, {})
  )
    .map((state) => ({
      label: state.label,
      value: state.value,
      helper: currencyFormatter.format(state.loss),
    }))
    .sort((a, b) => b.value - a.value);
}

function formatDate(value: string) {
  const [date] = value.split("T");
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day) {
    return value;
  }

  return dateFormatter.format(new Date(year, month - 1, day));
}

function tierLabel(tier: PublicCompanyProfile["tier"]) {
  if (tier === "featured") {
    return "Caso público";
  }

  if (tier === "monitored") {
    return "Empresa monitorada";
  }

  return "Empresa indexada";
}

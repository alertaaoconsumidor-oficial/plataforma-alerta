import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  ClipboardCheck,
  Eye,
  FileCheck2,
  FileText,
  Info,
  LockKeyhole,
  MessageSquareText,
  PenLine,
  Search,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnimatedNumber } from "@/features/public-cases/components/animated-number";
import { getRecentReports, getTopCompaniesByReports } from "@/lib/api";

export const metadata: Metadata = {
  title: "Alerta ao Consumidor",
  description:
    "Pesquise empresas, envie relatos e acesse indicadores sobre direitos do consumidor.",
};

const homePhotos = {
  hero: "/home-hero-consumo.png",
  campaign: "/razor-bg.webp",
  alertThumbs: [
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=420&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=420&q=80",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=420&q=80",
  ],
};

const heroPillars = [
  { title: "Metodologia Transparente", icon: FileCheck2 },
  { title: "Direito de Resposta", icon: MessageSquareText },
  { title: "Proteção de Dados", icon: ShieldCheck },
  { title: "Monitoramento Preventivo", icon: TrendingUp },
];

const valueCards = [
  {
    title: "Relatos documentados",
    description:
      "Informações verificadas e organizadas com cautela jurídica e contexto.",
    icon: FileText,
  },
  {
    title: "Consulta por empresa",
    description:
      "Pesquise e visualize dados públicos sobre empresas e seus indicadores.",
    icon: Search,
  },
  {
    title: "Indicadores públicos",
    description:
      "Acompanhe métricas que ajudam a entender padrões de atendimento.",
    icon: BarChart3,
  },
  {
    title: "Orientação preventiva",
    description:
      "Conteúdos e orientações para decisões de consumo mais seguras.",
    icon: ShieldCheck,
  },
];

const alertMeta = [
  {
    category: "Caso Razor",
    badge: "Atenção",
    date: "04/05/2026",
    reports: "20 relatos",
    views: "4,8 mil",
    icon: FileCheck2,
  },
  {
    category: "Telecomunicações",
    badge: "Observação",
    date: "16/05/2024",
    reports: "87 relatos",
    views: "3,4 mil",
    icon: MessageSquareText,
  },
  {
    category: "Marketplace",
    badge: "Atenção",
    date: "15/05/2024",
    reports: "64 relatos",
    views: "2,7 mil",
    icon: Building2,
  },
];

const companyTableMeta = [
  {
    category: "Caso público",
    reports: "20",
    updatedAt: "04/05/2026",
    status: "Em organização coletiva",
    statusColor: "bg-primary",
  },
  {
    category: "Varejo",
    reports: "122",
    updatedAt: "17/05/2024",
    status: "Em análise",
    statusColor: "bg-blue-400",
  },
  {
    category: "Telecomunicações",
    reports: "98",
    updatedAt: "16/05/2024",
    status: "Resposta parcial",
    statusColor: "bg-orange-400",
  },
];

const indicatorCards = [
  {
    label: "TMR",
    title: "Tempo médio sem resolução",
    value: 26,
    suffix: "dias",
    description:
      "Tempo médio em dias que os relatos permanecem sem solução efetiva.",
    chart: "line",
  },
  {
    label: "SD",
    title: "Silêncio documentado",
    value: 46,
    suffix: "%",
    description:
      "Percentual de relatos sem qualquer resposta da empresa no prazo.",
    chart: "donut",
    percent: 46,
  },
  {
    label: "TRPE",
    title: "Resolução pós-escalonamento",
    value: 38,
    suffix: "%",
    description:
      "Percentual de relatos resolvidos após escalonamento à empresa.",
    chart: "donut",
    percent: 38,
  },
];

const workflowSteps = [
  {
    title: "Pesquise a empresa",
    description: "Digite nome ou CNPJ para encontrar a empresa desejada.",
    icon: Search,
  },
  {
    title: "Consulte relatos",
    description: "Veja relatos documentados e o contexto de cada situação.",
    icon: FileText,
  },
  {
    title: "Entenda os indicadores",
    description: "Analise métricas públicas e histórico de atendimento.",
    icon: BarChart3,
  },
  {
    title: "Envie seu relato",
    description: "Relate sua experiência com responsabilidade e documentos.",
    icon: PenLine,
  },
];

const responsibilityCards = [
  {
    title: "Aviso Legal",
    description:
      "Os conteúdos são informativos e não constituem juízo definitivo sobre responsabilidade ou irregularidade.",
    icon: ClipboardCheck,
  },
  {
    title: "Privacidade",
    description:
      "Protegemos dados pessoais em conformidade com a LGPD e boas práticas de segurança.",
    icon: LockKeyhole,
  },
  {
    title: "Direito de resposta",
    description:
      "Empresas têm assegurado o direito de resposta, correção de informações e contextualização de dados.",
    icon: MessageSquareText,
  },
];

export default async function Home() {
  const recentReports = await getRecentReports(3);
  const topCompanies = await getTopCompaniesByReports(3);

  const companyRows = [
    {
      name: "CASO RAZOR",
      slug: "casos/razor",
      ...companyTableMeta[0],
    },
    ...topCompanies.slice(0, 2).map((company, index) => ({
      name: company.name,
      slug: `empresa/${company.slug}`,
      ...companyTableMeta[index + 1],
    })),
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0">
          <Image
            src={homePhotos.hero}
            alt="Mesa escura com notebook, balança, documentos e calculadora"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/82 to-[#050505]/18" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/35" />
        </div>

        <div className="container relative mx-auto px-4 py-16 md:px-6 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Consulte antes de comprar.
              <br />
              Relate com{" "}
              <span className="text-primary">responsabilidade.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              Veja relatos documentados, indicadores públicos e orientações
              preventivas para tomar decisões de consumo mais seguras.
            </p>

            <div className="mt-8 flex max-w-2xl flex-col gap-3 rounded-lg bg-white p-2 shadow-2xl sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Digite o nome da empresa ou CNPJ"
                  className="h-12 border-0 pl-11 text-foreground shadow-none focus-visible:ring-0"
                />
              </div>
              <Button className="h-12 shrink-0 px-7">Consultar empresa</Button>
            </div>

            <div className="mt-4">
              <Button
                asChild
                variant="outline"
                className="border-white/25 bg-black/20 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/metodologia">
                  <FileText className="mr-2 h-4 w-4" />
                  Conhecer metodologia
                </Link>
              </Button>
            </div>

            <p className="mt-6 flex max-w-2xl items-start gap-3 text-sm leading-6 text-white/75">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              Relatos organizados com cautela jurídica, foco preventivo e
              espaço para direito de resposta.
            </p>
          </div>

          <div className="mt-14 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {heroPillars.map((pillar) => (
              <PillarItem key={pillar.title} {...pillar} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-8">
        <div className="container mx-auto grid gap-4 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4">
          {valueCards.map((card) => (
            <ValueCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="bg-background py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold">Últimos alertas</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Informações recentes publicadas pela plataforma.
              </p>
            </div>
            <Button asChild variant="link" className="hidden md:inline-flex">
              <Link href="/enviar-relato">
                Ver todos os alertas <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {recentReports.map((report, index) => {
              const meta = alertMeta[index % alertMeta.length];

              return (
                <AlertCard
                  key={report.id}
                  title={report.companyName}
                  href={`/empresa/${report.companySlug}`}
                  excerpt={report.narrative}
                  image={homePhotos.alertThumbs[index]}
                  meta={meta}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section id="empresas" className="bg-[#111111] py-12 text-white md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-bold">
                  Empresas com relatos recentes
                </h2>
                <Badge className="bg-primary text-primary-foreground">
                  Monitoramento preventivo
                </Badge>
              </div>
              <p className="mt-2 text-sm text-white/60">
                Lista demonstrativa para leitura rápida de volume e resposta.
              </p>
            </div>
            <Button asChild variant="link" className="px-0 text-primary">
              <Link href="/casos/razor">
                Ver ranking completo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
            <div className="grid grid-cols-[1.4fr_1fr_0.8fr_1fr_1.1fr_40px] border-b border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white/45 max-lg:hidden">
              <span>Empresa</span>
              <span>Categoria</span>
              <span>Relatos</span>
              <span>Última atualização</span>
              <span>Status de resposta</span>
              <span />
            </div>
            {companyRows.map((company) => (
              <Link
                key={company.name}
                href={`/${company.slug}`}
                className="grid gap-3 border-b border-white/10 px-4 py-4 text-sm transition hover:bg-white/[0.06] lg:grid-cols-[1.4fr_1fr_0.8fr_1fr_1.1fr_40px] lg:items-center"
              >
                <span className="flex items-center gap-3 font-semibold">
                  <Building2 className="h-4 w-4 text-primary" />
                  {company.name}
                </span>
                <span className="text-white/65">{company.category}</span>
                <span>{company.reports}</span>
                <span className="text-white/65">{company.updatedAt}</span>
                <span className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${company.statusColor}`}
                  />
                  {company.status}
                </span>
                <ArrowRight className="hidden h-4 w-4 text-white/40 lg:block" />
              </Link>
            ))}
          </div>

          <p className="mt-4 flex gap-2 text-xs leading-5 text-white/55">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            A presença nesta seção indica apenas a existência de relatos
            cadastrados, sem conclusão definitiva sobre responsabilidade.
          </p>
        </div>
      </section>

      <section id="indicadores" className="bg-[#111111] pb-12 text-white md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Indicadores</h2>
              <p className="mt-1 text-sm text-white/60">
                Métricas públicas para análise e comparação.
              </p>
            </div>
            <Button asChild variant="link" className="px-0 text-primary">
              <Link href="/metodologia">
                Ver metodologia completa{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {indicatorCards.map((item) => (
              <IndicatorCard key={item.label} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-8 md:py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative isolate overflow-hidden rounded-lg border border-primary/45 bg-primary px-5 py-6 shadow-lg md:px-8">
            <Image
              src={homePhotos.campaign}
              alt="Pessoas de mãos dadas com balança da justiça ao fundo"
              fill
              sizes="100vw"
              className="object-cover object-center opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/35" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-5 md:flex-row md:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#111111] shadow-xl">
                  <Image
                    src="/chatbot-icon.svg"
                    alt="Logo do Alerta ao Consumidor"
                    width={72}
                    height={72}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold md:text-3xl">
                    Frente solidária: Caso Razor
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-zinc-900/80">
                    Espaço de organização colaborativa de relatos e documentos
                    relacionados ao caso, com finalidade informativa,
                    preventiva e apoio às pessoas afetadas.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-zinc-950 text-white hover:bg-zinc-800">
                  <Link href="/casos/razor">
                    Acompanhar caso <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-zinc-900/30 bg-white/20 text-zinc-950 hover:bg-white/40"
                >
                  <Link href="/enviar-relato?caso=razor">
                    Enviar informações
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold">Como funciona</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Entenda o passo a passo para usar a plataforma.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <WorkflowStep
                key={step.title}
                index={index + 1}
                showConnector={index < workflowSteps.length - 1}
                {...step}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold">
            Compromisso com responsabilidade
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {responsibilityCards.map((item) => (
              <ResponsibilityCard key={item.title} {...item} />
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-5xl text-center text-sm leading-6 text-muted-foreground">
            A plataforma atua com finalidade informativa, preventiva e
            educativa, para apoio às decisões de consumo mais conscientes. Não
            substitui órgãos oficiais de defesa do consumidor e não realiza
            intermediação ou mediação de conflitos.
          </p>
        </div>
      </section>
    </>
  );
}

function PillarItem({ title, icon: Icon }: { title: string; icon: LucideIcon }) {
  return (
    <div className="flex items-center gap-3 border-white/10 text-sm font-bold text-white/85 lg:border-r lg:last:border-r-0">
      <Icon className="h-6 w-6 text-primary" />
      {title}
    </div>
  );
}

function ValueCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="group border-0 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function AlertCard({
  title,
  href,
  excerpt,
  image,
  meta,
}: {
  title: string;
  href: string;
  excerpt: string;
  image: string;
  meta: (typeof alertMeta)[number];
}) {
  const Icon = meta.icon;

  return (
    <Card className="group overflow-hidden border-0 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-0">
        <div className="relative h-36 bg-muted">
          <Image
            src={image}
            alt={`Imagem relacionada a ${title}`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#111111] text-primary">
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{meta.category}</Badge>
            <Badge className="bg-primary/20 text-primary-foreground">
              {meta.badge}
            </Badge>
          </div>
          <h3 className="mt-4 font-bold">{title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {excerpt}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {meta.date}
            </span>
            <span className="flex items-center gap-1">
              <Bell className="h-3.5 w-3.5" />
              {meta.reports}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {meta.views}
            </span>
          </div>
          <Button asChild variant="link" className="mt-3 px-0">
            <Link href={href}>
              Ver detalhes <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function IndicatorCard({
  label,
  title,
  value,
  suffix,
  description,
  chart,
  percent,
}: {
  label: string;
  title: string;
  value: number;
  suffix?: string;
  description: string;
  chart: string;
  percent?: number;
}) {
  return (
    <div className="rounded-lg border border-white/15 bg-white/[0.04] p-6">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-5xl font-extrabold text-primary">{label}</p>
          <h3 className="mt-2 font-bold">{title}</h3>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold">
            <AnimatedNumber value={value} duration={1150} />
            {suffix ? (
              <span
                className={`text-base text-white/60 ${
                  suffix === "%" ? "ml-0" : "ml-1"
                }`}
              >
                {suffix}
              </span>
            ) : null}
          </p>
        </div>
      </div>
      <div className="mt-6 grid min-h-24 grid-cols-[1fr_110px] gap-4">
        <p className="text-sm leading-6 text-white/65">{description}</p>
        {chart === "line" ? (
          <MiniLineChart />
        ) : (
          <DonutChart value={percent ?? 0} />
        )}
      </div>
    </div>
  );
}

function MiniLineChart() {
  return (
    <svg viewBox="0 0 120 80" className="h-24 w-full">
      <polyline
        className="line-chart-draw"
        fill="none"
        stroke="rgba(255, 214, 0, 0.95)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="4,18 20,28 36,24 52,42 68,38 84,55 102,62 116,70"
      />
      {[4, 20, 36, 52, 68, 84, 102, 116].map((x, index) => (
        <circle
          key={x}
          cx={x}
          cy={[18, 28, 24, 42, 38, 55, 62, 70][index]}
          r="3"
          fill="#ffd600"
          className="line-chart-dot"
          style={{ animationDelay: `${1250 + index * 75}ms` }}
        />
      ))}
    </svg>
  );
}

function DonutChart({ value }: { value: number }) {
  return (
    <div
      className="donut-chart-grow mx-auto flex h-24 w-24 items-center justify-center rounded-full"
      style={{
        "--donut-target": `${value * 3.6}deg`,
      } as CSSProperties}
    >
      <div className="h-14 w-14 rounded-full bg-[#111111]" />
    </div>
  );
}

function WorkflowStep({
  title,
  description,
  icon: Icon,
  index,
  showConnector,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
  showConnector: boolean;
}) {
  return (
    <div className="group relative rounded-lg bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 md:bg-transparent md:p-0 md:shadow-none">
      {showConnector ? (
        <div className="absolute left-[calc(50%+2.5rem)] top-8 hidden h-px w-[calc(100%-5rem)] border-t border-dashed border-border md:block" />
      ) : null}
      <div className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center">
        <div
          className="soft-float-up relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition duration-300 group-hover:-translate-y-2 group-hover:shadow-lg"
          style={{ animationDelay: `${index * 90}ms` }}
        >
          <Icon className="h-8 w-8 text-[#111111]" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold">
            {index}
          </span>
        </div>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function ResponsibilityCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="group transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex gap-4 p-5">
        <Icon className="h-7 w-7 shrink-0 text-[#111111] transition duration-300 group-hover:-translate-y-1 group-hover:text-primary" />
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

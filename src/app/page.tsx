import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  FileCheck2,
  LockKeyhole,
  MessageSquareText,
  Search,
  ShieldCheck,
  TrendingUp,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getRecentReports, getTopCompaniesByReports } from "@/lib/api";

export const metadata: Metadata = {
  title: "Alerta ao Consumidor",
  description:
    "Pesquise empresas, envie relatos e acesse indicadores sobre direitos do consumidor.",
};

const platformMetrics = [
  { label: "TMR", title: "Tempo médio sem resolução", value: "7,8 dias" },
  { label: "SD", title: "Casos de silêncio documentado", value: "352 casos" },
  { label: "TRPE", title: "Resolução pós-escalonamento", value: "38%" },
];

const workflowSteps = [
  {
    title: "Pesquise",
    description: "Consulte empresas por nome ou CNPJ antes de decidir.",
    icon: Search,
  },
  {
    title: "Relate",
    description: "Registre o ocorrido com linguagem objetiva e responsável.",
    icon: MessageSquareText,
  },
  {
    title: "Preserve provas",
    description: "Documentos e evidências ficam tratados com cautela.",
    icon: FileCheck2,
  },
  {
    title: "Acompanhe",
    description: "Veja indicadores públicos e evolução dos casos.",
    icon: BarChart3,
  },
];

const commitments = [
  {
    title: "Proteção de dados",
    description:
      "Relatos públicos não devem expor dados pessoais sensíveis de consumidores.",
    icon: LockKeyhole,
  },
  {
    title: "Metodologia clara",
    description:
      "Indicadores são apresentados com contexto, limites e linguagem informativa.",
    icon: ShieldCheck,
  },
  {
    title: "Direito de resposta",
    description:
      "Empresas citadas contam com espaço próprio para manifestação pública.",
    icon: MessageSquareText,
  },
  {
    title: "Dados verificáveis",
    description:
      "A plataforma diferencia relato, evidência privada e informação pública.",
    icon: CheckCircle2,
  },
];

const frontItems = [
  "Relatos individuais padronizados",
  "Registro cronológico dos fatos",
  "Documentação de evidências",
  "Indicadores públicos agregados",
  "Orientação para caminhos legais e administrativos",
];

const homePhotos = {
  hero:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=85",
  evidence:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85",
  phone:
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=85",
  campaign:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=85",
  alertThumbs: [
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=420&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=420&q=80",
    "https://images.unsplash.com/photo-1605902711622-cfb43c4437d7?auto=format&fit=crop&w=420&q=80",
  ],
};

export default async function Home() {
  const recentReports = await getRecentReports(3);
  const topCompanies = await getTopCompaniesByReports(3);

  return (
    <div className="flex flex-col bg-background">
      <section className="relative w-full overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0">
          <Image
            src={homePhotos.hero}
            alt="Consumidora analisando documentos em ambiente de trabalho"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center] opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/92 to-[#111111]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
        </div>

        <div className="container relative mx-auto grid min-h-[560px] px-4 py-16 md:px-6 lg:items-center lg:py-20">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-5 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Informação responsável para decisões de consumo
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Consulte antes de comprar. Relate com responsabilidade.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 md:text-base">
              O Alerta ao Consumidor reúne relatos, indicadores e informações
              públicas para ajudar consumidores a tomar decisões mais seguras,
              com transparência, cautela jurídica e direito de resposta.
            </p>

            <div className="mt-9 flex max-w-xl flex-col gap-3 rounded-lg bg-white p-2 shadow-2xl sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar empresa por nome ou CNPJ"
                  className="h-12 border-0 pl-11 text-foreground shadow-none focus-visible:ring-0"
                />
              </div>
              <Button className="h-12 shrink-0 px-6">Pesquisar</Button>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/enviar-relato">
                  Consultar empresa <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/enviar-relato">Enviar relato documentado</Link>
              </Button>
            </div>
            <div className="mt-10 hidden max-w-sm rounded-lg border border-white/15 bg-black/45 p-4 text-sm text-white shadow-2xl backdrop-blur md:block">
              <p className="font-bold text-primary">Dados com contexto</p>
              <p className="mt-1 text-white/75">
                Relatos organizados para consulta publica, sem exposicao
                automatica de dados pessoais.
              </p>
            </div>
          </div>

          <div className="hidden" aria-hidden="true">
            <Image
              src={homePhotos.hero}
              alt="Consumidora analisando documentos em ambiente de trabalho"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/45 to-transparent lg:from-[#111111]/35" />
            <div className="absolute bottom-6 left-6 hidden max-w-xs rounded-lg border border-white/15 bg-black/50 p-4 text-sm text-white shadow-2xl backdrop-blur md:block">
              <p className="font-bold text-primary">Dados com contexto</p>
              <p className="mt-1 text-white/75">
                Relatos organizados para consulta pública, sem exposição
                automática de dados pessoais.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b bg-primary py-16 text-primary-foreground md:py-24">
        <Image
          src={homePhotos.campaign}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-22 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-primary/78" />
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Frente solidária para consumidores afetados pela Razor
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-primary-foreground/72">
                A plataforma disponibiliza sua estrutura para organização
                responsável de relatos, documentação de evidências e orientação
                informativa aos consumidores impactados.
              </p>
            </div>
            <div className="space-y-3 lg:justify-self-end">
              {frontItems.slice(0, 4).map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-primary-foreground/20 bg-primary-foreground/88 px-4 py-3 text-sm font-bold text-primary-foreground shadow-md backdrop-blur-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/80 text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </span>
                  {item}
                </div>
              ))}
              <div className="flex flex-col gap-3 pt-3 sm:flex-row lg:justify-end">
                <Button asChild variant="secondary">
                  <Link href="/enviar-relato?caso=razor">
                    Participar da frente{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary-foreground/25 bg-transparent hover:bg-primary-foreground/10"
                >
                  <Link href="/metodologia">Entender metodologia</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-5">
              <SectionHeader
                icon={Bell}
                title="Últimos alertas"
                href="/enviar-relato"
                action="Enviar relato"
              />
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <Card key={report.id} className="overflow-hidden">
                    <CardContent className="grid gap-4 p-4 sm:grid-cols-[96px_1fr]">
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={
                            homePhotos.alertThumbs[
                              index % homePhotos.alertThumbs.length
                            ]
                          }
                          alt={`Imagem relacionada ao relato sobre ${report.companyName}`}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-bold">
                          {report.companyName}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                          {report.narrative}
                        </p>
                        <Link
                          href={`/empresa/${report.companySlug}`}
                          className="mt-3 inline-flex items-center text-sm font-semibold text-primary-foreground/80 hover:text-primary-foreground"
                        >
                          Ver detalhes{" "}
                          <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <SectionHeader icon={TrendingUp} title="Empresas em destaque" />
              <div className="space-y-4">
                {topCompanies.map((company) => (
                  <Card key={company.id}>
                    <CardContent className="flex items-center gap-4 p-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {company.name
                          .split(" ")
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join("")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold">{company.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {company.reportCount} relatos recentes
                        </p>
                      </div>
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/empresa/${company.slug}`}>
                          <ArrowRight className="h-5 w-5" />
                          <span className="sr-only">Ver empresa</span>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  O que medimos?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {platformMetrics.map((metric) => (
                  <div key={metric.label} className="flex items-start gap-4">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-bold text-foreground">
                          {metric.label}:
                        </span>{" "}
                        {metric.title}
                      </p>
                      <p className="mt-1 text-xl font-bold">{metric.value}</p>
                    </div>
                  </div>
                ))}
                <p className="text-sm leading-6 text-muted-foreground">
                  Indicadores são calculados com base em dados públicos e
                  relatos moderados, sempre com leitura informativa.
                </p>
                <Button asChild variant="link" className="px-0">
                  <Link href="/metodologia">
                    Saiba mais sobre a metodologia
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-y bg-card py-16 md:py-24">
        <div className="container mx-auto grid gap-10 px-4 md:px-6 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Como funciona</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <Card key={step.title}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-lg">
            <Image
              src={homePhotos.phone}
              alt="Pessoa usando celular para consultar informações de consumo"
              fill
              sizes="(min-width: 1024px) 360px, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-white/92 p-4 shadow-xl">
              <p className="text-sm font-bold">Consulta rápida</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                A experiência deve orientar a próxima ação do consumidor sem
                excesso de texto.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto grid gap-10 px-4 md:px-6 lg:grid-cols-[360px_1fr] lg:items-center">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg">
            <Image
              src={homePhotos.evidence}
              alt="Documentos, anotações e evidências organizadas sobre uma mesa"
              fill
              sizes="(min-width: 1024px) 360px, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-primary p-4 text-primary-foreground shadow-xl">
              <p className="text-sm font-bold">Evidências preservadas</p>
              <p className="mt-1 text-xs leading-5 opacity-75">
                A plataforma diferencia informação pública de prova privada.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Compromissos da plataforma
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {commitments.map((item) => {
                const Icon = item.icon;

                return (
                  <Card key={item.title}>
                    <CardContent className="p-6">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="hidden bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto flex flex-col gap-6 px-4 md:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Receba alertas e novidades</h2>
            <p className="mt-2 max-w-2xl text-sm text-primary-foreground/75">
              Acompanhe melhorias da plataforma, novos casos públicos e
              orientações preventivas.
            </p>
          </div>
          <div className="flex w-full max-w-md gap-3">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              className="h-12 border-primary-foreground/20 bg-white text-foreground"
            />
            <Button variant="secondary" className="h-12 px-6">
              Assinar
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  href,
  action,
}: {
  icon: typeof Bell;
  title: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="flex items-center gap-3 text-2xl font-bold">
        <Icon className="h-6 w-6 text-primary" />
        {title}
      </h2>
      {href && action ? (
        <Link
          href={href}
          className="text-xs font-bold uppercase text-muted-foreground hover:text-foreground"
        >
          {action}
        </Link>
      ) : null}
    </div>
  );
}

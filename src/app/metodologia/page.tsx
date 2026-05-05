import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  LockKeyhole,
  MessageSquareText,
  Scale,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Metodologia | Alerta ao Consumidor",
  description:
    "Entenda como o Alerta ao Consumidor coleta relatos, protege dados pessoais, modera informações e calcula indicadores públicos.",
};

const principles = [
  {
    title: "Finalidade informativa",
    description:
      "A plataforma organiza relatos e indicadores para apoiar decisões de consumo, sem substituir órgãos públicos ou análise jurídica individual.",
    icon: BookOpenCheck,
  },
  {
    title: "Cautela jurídica",
    description:
      "A linguagem pública evita acusações pessoais e conclusões definitivas. O foco é em fatos, datas, valores, documentos e contexto.",
    icon: Scale,
  },
  {
    title: "Dados agregados",
    description:
      "Indicadores são apresentados em conjunto, reduzindo exposição individual e ajudando a identificar padrões de atendimento.",
    icon: Database,
  },
  {
    title: "Direito de resposta",
    description:
      "Empresas podem solicitar correção, contextualização e manifestação formal dentro do fluxo institucional da plataforma.",
    icon: MessageSquareText,
  },
];

const moderationSteps = [
  {
    title: "Recebimento do relato",
    description:
      "O consumidor informa empresa, datas, valor aproximado, canal de contato e descrição objetiva do ocorrido.",
    icon: FileText,
  },
  {
    title: "Triagem de segurança",
    description:
      "Dados pessoais, documentos sensíveis, ofensas e acusações diretas são removidos da camada pública.",
    icon: ShieldCheck,
  },
  {
    title: "Organização documental",
    description:
      "Evidências informadas ficam associadas ao relato em ambiente privado para análise e geração futura de dossiê.",
    icon: FileCheck2,
  },
  {
    title: "Classificação do problema",
    description:
      "O relato é vinculado a categorias, status, UF, cidade, faixa de valor e nível documental.",
    icon: Filter,
  },
  {
    title: "Publicação agregada",
    description:
      "Somente resumos moderados e indicadores consolidados aparecem publicamente, com leitura cautelosa.",
    icon: Eye,
  },
];

const indicators = [
  {
    label: "TMR",
    title: "Tempo médio sem resolução",
    description:
      "Média de dias em que relatos permanecem sem solução efetiva, considerando datas informadas e status atual.",
    formula: "dias sem resolução / relatos elegíveis",
    icon: CalendarClock,
  },
  {
    label: "SD",
    title: "Silêncio documentado",
    description:
      "Quantidade ou percentual de relatos em que o consumidor informa ausência de resposta pelos canais utilizados.",
    formula: "relatos sem resposta / base moderada",
    icon: MessageSquareText,
  },
  {
    label: "TRPE",
    title: "Resolução pós-escalonamento",
    description:
      "Percentual de relatos resolvidos após tentativa formal de escalonamento, resposta da empresa ou órgão competente.",
    formula: "resolvidos após escalonamento / relatos escalonados",
    icon: BarChart3,
  },
];

const dataPolicy = [
  {
    title: "O que pode aparecer publicamente",
    items: [
      "Nome da empresa, CNPJ informado e categoria.",
      "Resumo moderado do relato, sem dados pessoais.",
      "Cidade, UF, faixa de valor e status do problema.",
      "Indicadores agregados e fontes públicas contextualizadas.",
    ],
    icon: Eye,
  },
  {
    title: "O que permanece protegido",
    items: [
      "CPF, endereço, telefone, e-mail e nome completo do consumidor.",
      "Comprovantes, contratos, notas fiscais e prints integrais.",
      "Dados bancários, documentos pessoais e anexos sensíveis.",
      "Comunicações privadas não autorizadas para publicação.",
    ],
    icon: LockKeyhole,
  },
  {
    title: "Como tratamos CNPJs",
    items: [
      "CNPJs informados por consumidores entram como dado declaratório.",
      "CNPJs relacionados exigem conferência de fonte pública.",
      "A ficha da Receita deve ter data, fonte e documento associado.",
      "Relação cadastral não implica responsabilidade automática.",
    ],
    icon: Building2,
  },
];

const scaleModel = [
  "Uma empresa usa rota dinâmica própria, como /empresa/[slug].",
  "Relatos extensos ficam em página dedicada, com filtros, ordenação e paginação.",
  "Casos especiais podem receber página editorial premium, como o Caso Razor.",
  "CNPJs, relatos, documentos e indicadores devem nascer como registros estruturados no banco.",
];

export default function MetodologiaPage() {
  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden bg-[#0b0b0b] text-white">
        <Image
          src="/home-hero-consumo.png"
          alt="Mesa escura com documentos, notebook e elementos de análise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/88 to-[#050505]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />

        <div className="container relative mx-auto px-4 py-16 md:px-6 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div className="max-w-4xl">
              <Badge className="mb-5 border-primary/40 bg-primary text-primary-foreground">
                Transparência operacional
              </Badge>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                Metodologia
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                Como organizamos relatos com responsabilidade.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/74 md:text-lg">
                O Alerta ao Consumidor combina moderação humana, proteção de
                dados, indicadores públicos e direito de resposta para publicar
                informações úteis sem transformar relato em condenação.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg">
                  <Link href="/enviar-relato">
                    Enviar relato documentado
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <Link href="/casos/razor">Ver metodologia aplicada</Link>
                </Button>
              </div>
            </div>

            <Card className="border-white/12 bg-white/10 text-white shadow-2xl backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">Critério central</p>
                    <p className="mt-2 text-sm leading-6 text-white/68">
                      Toda informação pública deve ser útil, verificável,
                      contextualizada e proporcional ao risco de exposição.
                    </p>
                  </div>
                </div>
                <Separator className="my-5 bg-white/10" />
                <div className="grid gap-3 text-sm">
                  <MetricLine label="Relatos" value="moderados" />
                  <MetricLine label="Documentos" value="privados" />
                  <MetricLine label="Indicadores" value="agregados" />
                  <MetricLine label="Empresas" value="com resposta assegurada" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-14 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <HeroPrinciple key={principle.title} {...principle} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <SectionHeading
          eyebrow="Fluxo de moderação"
          title="Do relato bruto à leitura pública"
          description="A publicação não é automática. O processo organiza fatos, reduz exposição de dados pessoais e prepara a informação para consulta responsável."
          icon={ClipboardCheck}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-5">
          {moderationSteps.map((step, index) => (
            <ProcessStep
              key={step.title}
              index={index + 1}
              showConnector={index < moderationSteps.length - 1}
              {...step}
            />
          ))}
        </div>
      </section>

      <section className="bg-[#111111] py-12 text-white md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Indicadores públicos"
              title="Métricas com leitura cautelosa"
              description="Os indicadores ajudam a comparar padrões, mas não definem culpa, irregularidade ou obrigação individual da empresa."
              icon={BarChart3}
              dark
            />
            <Button asChild variant="link" className="px-0 text-primary">
              <Link href="/aviso-legal">
                Ver aviso legal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {indicators.map((indicator) => (
              <IndicatorMethodCard key={indicator.label} {...indicator} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Privacidade e evidências"
              title="O público vê contexto, não documentos pessoais"
              description="A plataforma separa o que ajuda a coletividade do que precisa permanecer protegido para preservar consumidores e empresas."
              icon={LockKeyhole}
            />
            <div className="mt-6 rounded-lg border border-primary/35 bg-primary/10 p-5">
              <p className="flex items-center gap-2 font-bold">
                <UserRoundCheck className="h-5 w-5 text-primary" />
                LGPD como premissa
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Dados pessoais, documentos e evidências não são publicados
                automaticamente. A camada pública trabalha com anonimização,
                minimização e contexto agregado.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            {dataPolicy.map((policy) => (
              <PolicyCard key={policy.title} {...policy} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-card py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Modelo sustentável"
                title="Escala sem perder qualidade"
                description="A arquitetura da plataforma precisa funcionar para uma empresa, mil empresas ou milhões de relatos. Por isso, a metodologia também define como a informação deve nascer no sistema."
                icon={Sparkles}
              />
              <div className="mt-6 grid gap-3">
                {scaleModel.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-[#111111] p-6 text-white shadow-xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Regra de produto
              </p>
              <h2 className="mt-3 text-2xl font-bold">
                Página pública é síntese. Relato completo é diretório.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/65">
                A página da empresa deve apresentar visão executiva, indicadores,
                mapa, CNPJs e contexto. Quando houver volume, os relatos migram
                para uma página dedicada com filtros, relevância, paginação e
                busca.
              </p>
              <Button asChild className="mt-6">
                <Link href="/empresa/loja-varejista-express/relatos">
                  Ver exemplo de diretório
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="relative isolate overflow-hidden rounded-lg border border-primary/40 bg-primary p-6 shadow-lg md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.42),transparent_32%),linear-gradient(135deg,rgba(255,214,0,1),rgba(234,179,8,0.92))]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-zinc-900/65">
                Próxima ação
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Relate fatos. Preserve provas. Proteja dados.
              </h2>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-zinc-900/75">
                Quanto mais objetivo e documentado for o relato, melhor será a
                leitura coletiva dos indicadores e mais seguro será o uso público
                da informação.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-zinc-950 text-white hover:bg-zinc-800">
                <Link href="/enviar-relato">
                  Enviar relato <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-zinc-900/30 bg-white/20 text-zinc-950 hover:bg-white/40"
              >
                <Link href="/cdc">Consultar CDC</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MetricLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
      <span className="text-white/55">{label}</span>
      <span className="font-bold text-primary">{value}</span>
    </div>
  );
}

function HeroPrinciple({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="group rounded-lg border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/10">
      <Icon className="h-6 w-6 text-primary transition duration-300 group-hover:-translate-y-1" />
      <p className="mt-3 font-bold">{title}</p>
      <p className="mt-2 text-sm leading-5 text-white/62">{description}</p>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  dark?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>
      <h2
        className={`mt-2 flex items-center gap-3 text-3xl font-bold ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        <Icon className="h-7 w-7 text-primary" />
        {title}
      </h2>
      <p
        className={`mt-2 max-w-3xl text-sm leading-6 ${
          dark ? "text-white/62" : "text-muted-foreground"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function ProcessStep({
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
    <div className="group relative rounded-lg border bg-card p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg">
      {showConnector ? (
        <div className="absolute left-[calc(100%-0.25rem)] top-10 hidden h-px w-6 border-t border-dashed border-border lg:block" />
      ) : null}
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary transition duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <span className="mt-5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#111111] text-xs font-bold text-primary">
        {index}
      </span>
      <h3 className="mt-4 font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function IndicatorMethodCard({
  label,
  title,
  description,
  formula,
  icon: Icon,
}: {
  label: string;
  title: string;
  description: string;
  formula: string;
  icon: LucideIcon;
}) {
  return (
    <div className="group rounded-lg border border-white/15 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-primary/10 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <p className="text-5xl font-extrabold text-primary">{label}</p>
        <Icon className="h-6 w-6 text-primary/80 transition duration-300 group-hover:-translate-y-1 group-hover:text-primary" />
      </div>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/65">{description}</p>
      <div className="mt-5 rounded-md border border-white/10 bg-black/30 p-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
          Leitura base
        </p>
        <p className="mt-1 font-mono text-sm text-primary">{formula}</p>
      </div>
    </div>
  );
}

function PolicyCard({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: string[];
  icon: LucideIcon;
}) {
  return (
    <Card className="group shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary transition duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <div className="mt-4 grid gap-2">
          {items.map((item) => (
            <div key={item} className="flex gap-3 text-sm leading-6">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

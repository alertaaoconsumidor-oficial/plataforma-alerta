import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileArchive,
  FileText,
  LockKeyhole,
  MapPinned,
  MessageSquareText,
  Scale,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react"

import { ReportForm } from "@/components/report-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getCompanies } from "@/lib/api"

export const metadata: Metadata = {
  title: "Enviar Relato | Alerta ao Consumidor",
  description:
    "Descreva sua experiência com uma empresa de forma estruturada, segura e responsável. Ajude a construir indicadores públicos de consumo.",
}

const heroHighlights = [
  {
    title: "Linguagem factual",
    description: "Datas, valores, canais e status atual valem mais que acusações.",
    icon: FileText,
  },
  {
    title: "Dados protegidos",
    description: "Dados pessoais, documentos e anexos ficam fora da publicação aberta.",
    icon: LockKeyhole,
  },
  {
    title: "Moderação humana",
    description: "O relato passa por triagem antes de virar informação pública.",
    icon: ShieldCheck,
  },
  {
    title: "Base de indicadores",
    description: "A informação agregada alimenta mapas, gráficos e páginas públicas.",
    icon: MapPinned,
  },
]

const journeySteps = [
  {
    title: "Relate com contexto",
    description:
      "Informe empresa, CNPJ quando houver, cidade, data, valor, canal usado e status atual.",
    icon: ClipboardCheck,
  },
  {
    title: "Preserve evidências",
    description:
      "Separe comprovantes, prints, contratos, protocolos e mensagens para uso em área privada.",
    icon: FileArchive,
  },
  {
    title: "Aguarde triagem",
    description:
      "A equipe avalia linguagem, dados pessoais, duplicidade, pertinência e enquadramento do relato.",
    icon: ShieldCheck,
  },
  {
    title: "Acompanhe evolução",
    description:
      "Na próxima etapa, o relato poderá alimentar página pública, dossiê e painel do usuário.",
    icon: MessageSquareText,
  },
]

const sideChecklist = [
  "Evite CPF, telefone, endereço, e-mail pessoal e dados de terceiros.",
  "Informe datas aproximadas, número do pedido e protocolos quando tiver.",
  "Explique o que foi prometido, o que ocorreu e o que ainda falta resolver.",
  "Mantenha prints, comprovantes e documentos para upload privado futuro.",
]

const futureArchitecture = [
  {
    title: "Página da empresa",
    description:
      "Cada empresa terá leitura pública agregada, com indicadores e histórico sem expor dados pessoais.",
    icon: Scale,
  },
  {
    title: "Página de relatos",
    description:
      "Relatos serão listados em página própria, com busca, filtros e ordenação quando houver grande volume.",
    icon: FileText,
  },
  {
    title: "Dossiê privado",
    description:
      "Documentos e anexos ficarão associados ao usuário, preparados para geração de dossiê em PDF.",
    icon: UploadCloud,
  },
]

export default async function EnviarRelatoPage() {
  const companies = await getCompanies()

  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden bg-[#0b0b0b] text-white">
        <Image
          src="/home-hero-consumo.png"
          alt="Documentos, notebook e elementos de análise de consumo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-42"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-[#050505]/38" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/45" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-primary/12 blur-3xl" />

        <div className="container relative mx-auto px-4 py-16 md:px-6 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div className="max-w-4xl">
              <Badge className="mb-5 border-primary/40 bg-primary text-primary-foreground">
                Fluxo oficial
              </Badge>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                Enviar relato
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                Transforme sua experiência em informação útil e responsável.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/74 md:text-lg">
                O relato é o coração da plataforma: ele organiza fatos, preserva
                provas privadas e alimenta indicadores públicos com cautela
                jurídica, transparência e proteção de dados.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg">
                  <Link href="#formulario">
                    Começar relato
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <Link href="/aviso-legal">Ler Aviso Legal</Link>
                </Button>
              </div>
            </div>

            <Card className="border-white/12 bg-white/10 text-white shadow-2xl backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">O que nasce aqui</p>
                    <p className="mt-2 text-sm leading-6 text-white/68">
                      Base para triagem, página pública da empresa, mapa por UF,
                      gráficos, área do usuário e dossiê em PDF.
                    </p>
                  </div>
                </div>
                <Separator className="my-5 bg-white/10" />
                <div className="grid gap-3 text-sm">
                  <MetricLine label="Publicação" value="somente após moderação" />
                  <MetricLine label="Documentos" value="camada privada futura" />
                  <MetricLine label="Relato" value="responsabilidade do autor" />
                  <MetricLine label="Empresa" value="direito de resposta" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-4">
            {heroHighlights.map((item) => (
              <HeroHighlight key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b bg-card">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <div className="relative isolate overflow-hidden rounded-lg border border-primary/40 bg-primary p-6 shadow-lg md:p-8">
            <Image
              src="/razor-bg.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-20 mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/55" />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-900/65">
                  Frente solidária informativa
                </p>
                <h2 className="mt-2 text-3xl font-extrabold">
                  Relatos do Caso Razor estão priorizados neste momento.
                </h2>
                <p className="mt-2 text-sm font-medium leading-6 text-zinc-900/78">
                  A plataforma está organizando relatos relacionados ao caso com
                  foco em dados agregados, preservação de provas privadas e
                  direito de resposta.
                </p>
              </div>
              <Button asChild className="bg-zinc-950 text-white hover:bg-zinc-800">
                <Link href="/casos/razor">
                  Ver página do caso
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <SectionHeading
          eyebrow="Jornada do relato"
          title="Do envio à inteligência pública da plataforma"
          description="A estrutura já foi pensada para escalar: relatos alimentam empresas, casos, mapas, indicadores, dossiês e painéis internos."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {journeySteps.map((step, index) => (
            <JourneyCard key={step.title} index={index + 1} {...step} />
          ))}
        </div>
      </section>

      <section
        id="formulario"
        className="container mx-auto scroll-mt-24 px-4 pb-12 md:px-6 md:pb-16"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
          <Suspense
            fallback={
              <div className="rounded-lg border bg-card p-8 text-center text-sm text-muted-foreground shadow-sm">
                Carregando formulário...
              </div>
            }
          >
            <ReportForm companies={companies} />
          </Suspense>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <p className="flex items-center gap-2 text-lg font-bold">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Relato seguro
                </p>
                <div className="mt-5 grid gap-4">
                  <SideItem
                    title="Nada é publicado automaticamente"
                    description="O envio entra em triagem antes de qualquer exibição pública."
                  />
                  <SideItem
                    title="Dados pessoais são protegidos"
                    description="Não inclua CPF, telefone, endereço, e-mail ou dados de terceiros no texto."
                  />
                  <SideItem
                    title="Direito de resposta preservado"
                    description="Empresas poderão se manifestar por canal próprio."
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-primary/10 shadow-sm">
              <CardContent className="p-6">
                <p className="font-bold">Checklist antes de enviar</p>
                <div className="mt-4 grid gap-3">
                  {sideChecklist.map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-6">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <p className="font-bold">Quando houver milhares de relatos</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  A página pública da empresa exibirá amostras e indicadores. O
                  acervo completo ficará em página dedicada de relatos, com busca,
                  filtros, ordenação e paginação.
                </p>
                <Button asChild variant="outline" className="mt-5 w-full">
                  <Link href="/casos/razor/relatos">Ver modelo de relatos</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      <section className="border-y bg-[#111111] py-12 text-white md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            eyebrow="Arquitetura preparada"
            title="O relato alimenta toda a base da plataforma"
            description="Nesta fase o envio é mockado, mas o front já está organizado para receber banco de dados, moderação, upload privado e geração de dossiê."
            dark
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {futureArchitecture.map((item) => (
              <DarkCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function MetricLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
      <span className="text-white/55">{label}</span>
      <span className="font-bold text-primary">{value}</span>
    </div>
  )
}

function HeroHighlight({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: LucideIcon
}) {
  return (
    <div className="group flex gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-primary/10">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary transition group-hover:-translate-y-1" />
      <div>
        <p className="font-bold">{title}</p>
        <p className="mt-1 text-sm leading-5 text-white/62">{description}</p>
      </div>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string
  title: string
  description: string
  dark?: boolean
}) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>
      <h2
        className={`mt-2 text-3xl font-bold ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
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
  )
}

function JourneyCard({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string
  description: string
  icon: LucideIcon
  index: number
}) {
  return (
    <Card className="group shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary transition duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            {index}
          </span>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

function SideItem({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3 text-sm leading-6">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <div>
        <p className="font-bold text-foreground">{title}</p>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function DarkCard({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: LucideIcon
}) {
  return (
    <div className="group rounded-lg border border-white/15 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-primary/10 hover:shadow-xl">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary transition duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/65">{description}</p>
    </div>
  )
}

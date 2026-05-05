import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  FileText,
  Gavel,
  Info,
  LockKeyhole,
  MessageSquareText,
  Scale,
  ShieldAlert,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Aviso Legal e Termos de Uso | Alerta ao Consumidor",
  description:
    "Entenda os limites, responsabilidades, direito de resposta, moderação e proteção de dados do Alerta ao Consumidor.",
}

const legalPillars = [
  {
    title: "Finalidade informativa",
    description:
      "O portal organiza relatos, fontes públicas e indicadores preventivos. Não substitui Procon, Judiciário, Ministério Público, Defensoria Pública ou advogado.",
    icon: Info,
  },
  {
    title: "Ausência de juízo definitivo",
    description:
      "A presença de uma empresa ou caso não significa condenação, comprovação de irregularidade ou conclusão final sobre responsabilidade.",
    icon: Scale,
  },
  {
    title: "Moderação proporcional",
    description:
      "A plataforma pode editar, ocultar ou remover conteúdo para reduzir exposição indevida, linguagem ofensiva, dados pessoais ou risco jurídico.",
    icon: ShieldAlert,
  },
  {
    title: "Direito de resposta",
    description:
      "Empresas e representantes podem solicitar correção, contextualização, manifestação formal ou remoção fundamentada.",
    icon: MessageSquareText,
  },
]

const useRules = [
  {
    title: "O usuário responde pelo relato",
    description:
      "Ao enviar informações, o usuário declara que descreve fatos de boa-fé, com base em experiência real ou documentação legítima.",
    icon: UserRoundCheck,
  },
  {
    title: "Dados pessoais devem ser protegidos",
    description:
      "CPF, endereço, telefone, e-mail, documentos, dados bancários e comprovantes não devem ser publicados em campo aberto.",
    icon: LockKeyhole,
  },
  {
    title: "Fatos antes de conclusões",
    description:
      "Relatos devem priorizar datas, valores, pedidos, canais, protocolos, prazos e status atual, sem acusações pessoais desnecessárias.",
    icon: FileText,
  },
  {
    title: "Fontes públicas com contexto",
    description:
      "Notícias, CNPJs e dados públicos devem ser apresentados com origem, data, cautela e sem inferência automática de responsabilidade.",
    icon: BookOpenCheck,
  },
]

const moderationRules = [
  "Remoção de CPF, documentos, endereço, telefone, e-mail e dados bancários.",
  "Adequação de linguagem ofensiva, acusatória ou sem contexto documental.",
  "Ocultação de anexos privados, conversas integrais e dados de terceiros.",
  "Revisão de CNPJs, fontes públicas e datas quando houver contestação fundamentada.",
  "Registro interno de alterações relevantes para auditoria e rastreabilidade.",
]

const legalReferences = [
  {
    title: "Código de Defesa do Consumidor",
    description:
      "Base legal para direitos de informação clara, oferta, publicidade, vícios e práticas de consumo.",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm",
    label: "CDC",
  },
  {
    title: "Lei Geral de Proteção de Dados",
    description:
      "A LGPD orienta tratamento de dados pessoais, direitos dos titulares, finalidade e proteção de informações sensíveis.",
    href: "https://www.gov.br/anpd/pt-br",
    label: "LGPD",
  },
  {
    title: "Marco Civil da Internet",
    description:
      "A Lei nº 12.965/2014 estabelece princípios, garantias e regras para uso da internet no Brasil, incluindo conteúdo de terceiros.",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm",
    label: "Marco Civil",
  },
]

const contactFlows = [
  "Correção de informação pública exibida na plataforma.",
  "Direito de resposta ou manifestação institucional da empresa.",
  "Pedido relacionado a dados pessoais ou privacidade.",
  "Comunicação de conteúdo indevido, duplicado, desatualizado ou sem contexto.",
]

export default function AvisoLegalPage() {
  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden bg-[#0b0b0b] text-white">
        <Image
          src="/home-hero-consumo.png"
          alt="Documentos e elementos de análise sobre mesa escura"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/88 to-[#050505]/34" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/45" />

        <div className="container relative mx-auto px-4 py-16 md:px-6 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div className="max-w-4xl">
              <Badge className="mb-5 border-primary/40 bg-primary text-primary-foreground">
                Termos e limites
              </Badge>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                Aviso legal
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                Informação pública exige cautela, contexto e responsabilidade.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/74 md:text-lg">
                O Alerta ao Consumidor atua com finalidade informativa,
                preventiva e educativa. O uso da plataforma pressupõe respeito à
                verdade factual, proteção de dados e direito de resposta.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg">
                  <Link href="/contato">
                    Solicitar correção ou resposta
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <Link href="/metodologia">Ver metodologia</Link>
                </Button>
              </div>
            </div>

            <Card className="border-white/12 bg-white/10 text-white shadow-2xl backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Gavel className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">Resumo essencial</p>
                    <p className="mt-2 text-sm leading-6 text-white/68">
                      A plataforma publica leitura agregada e moderada. Não
                      decide litígios, não acusa empresas e não promete solução
                      individual.
                    </p>
                  </div>
                </div>
                <Separator className="my-5 bg-white/10" />
                <div className="grid gap-3 text-sm">
                  <MetricLine label="Natureza" value="informativa" />
                  <MetricLine label="Relatos" value="responsabilidade do autor" />
                  <MetricLine label="Dados pessoais" value="protegidos" />
                  <MetricLine label="Empresas" value="direito de resposta" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <SectionHeading
          eyebrow="Princípios de uso"
          title="O que este aviso estabelece"
          description="Estas regras orientam a leitura das páginas públicas, o envio de relatos, a moderação e a relação com empresas mencionadas."
          icon={ShieldCheck}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {legalPillars.map((pillar) => (
            <InfoCard key={pillar.title} {...pillar} />
          ))}
        </div>
      </section>

      <section className="bg-[#111111] py-12 text-white md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            eyebrow="Responsabilidades"
            title="Regras para envio, publicação e leitura"
            description="O relato responsável protege consumidores, empresas e a própria qualidade da informação pública."
            icon={ClipboardCheck}
            dark
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-4">
            {useRules.map((rule) => (
              <DarkCard key={rule.title} {...rule} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Moderação"
              title="O que pode ser ajustado antes ou depois da publicação"
              description="A moderação não tem finalidade de julgar o mérito do relato. Ela protege dados, organiza linguagem e preserva contexto."
              icon={ShieldAlert}
            />
            <div className="mt-6 rounded-lg border border-primary/35 bg-primary/10 p-5">
              <p className="flex items-center gap-2 font-bold">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Conteúdo pode ser recusado
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Relatos com ofensas, dados sensíveis, documentos públicos
                indevidos, acusações sem contexto ou spam podem não ser
                publicados.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {moderationRules.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-lg border bg-card p-4 text-sm leading-6 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-card py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            eyebrow="Bases legais e referências"
            title="Leis e fontes que orientam a plataforma"
            description="Estas referências não esgotam a análise jurídica de casos concretos, mas ajudam a estruturar uma política de informação responsável."
            icon={BookOpenCheck}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {legalReferences.map((reference) => (
              <ReferenceCard key={reference.title} {...reference} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Correção e resposta"
              title="Canal institucional para ajustar informações"
              description="Empresas, titulares de dados e terceiros interessados podem solicitar análise de conteúdo público quando houver fundamento."
              icon={MessageSquareText}
            />
            <div className="mt-6 grid gap-3">
              {contactFlows.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-[#111111] p-6 text-white shadow-xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Procedimento esperado
            </p>
            <h2 className="mt-3 text-2xl font-bold">
              Solicitações precisam ser identificáveis e fundamentadas.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65">
              Para análise eficiente, informe URL, empresa, CNPJ quando houver,
              motivo do pedido, documentos de suporte e dados de contato do
              responsável pela solicitação.
            </p>
            <Button asChild className="mt-6">
              <Link href="/contato">
                Abrir contato institucional
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12 md:px-6 md:pb-16">
        <div className="relative isolate overflow-hidden rounded-lg border border-primary/40 bg-primary p-6 shadow-lg md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.42),transparent_32%),linear-gradient(135deg,rgba(255,214,0,1),rgba(234,179,8,0.92))]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-zinc-900/65">
                Uso responsável
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Informação pública precisa servir à prevenção.
              </h2>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-zinc-900/75">
                Relatos objetivos, dados protegidos e direito de resposta são a
                base para uma plataforma séria e sustentável.
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
                <Link href="/metodologia">Ver metodologia</Link>
              </Button>
            </div>
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

function SectionHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
  dark = false,
}: {
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
  dark?: boolean
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
  )
}

function InfoCard({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: LucideIcon
}) {
  return (
    <Card className="group shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary transition duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
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

function ReferenceCard({
  title,
  description,
  href,
  label,
}: {
  title: string
  description: string
  href: string
  label: string
}) {
  return (
    <Card className="group shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg">
      <CardContent className="flex h-full flex-col p-6">
        <Badge className="w-fit">{label}</Badge>
        <h3 className="mt-4 text-xl font-bold">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        <Button asChild variant="outline" className="mt-5 w-fit">
          <Link href={href} target="_blank" rel="noreferrer">
            Acessar fonte <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

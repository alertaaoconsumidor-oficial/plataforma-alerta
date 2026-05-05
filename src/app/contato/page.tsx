import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FilePenLine,
  LockKeyhole,
  Mail,
  MessageSquareReply,
  Newspaper,
  ShieldCheck,
} from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Contato | Alerta ao Consumidor",
  description:
    "Canal institucional para direito de resposta, correções, privacidade, imprensa, parcerias e suporte da plataforma.",
}

const contactReasons = [
  {
    title: "Direito de resposta",
    description:
      "Canal para manifestação institucional, contextualização de informações e resposta pública quando aplicável.",
    icon: MessageSquareReply,
  },
  {
    title: "Correção de informação",
    description:
      "Solicite revisão de CNPJ, fonte pública, data, número agregado ou texto que precise de ajuste fundamentado.",
    icon: FilePenLine,
  },
  {
    title: "Privacidade e dados",
    description:
      "Pedidos relacionados a dados pessoais, identificação indevida, exposição sensível ou solicitação de titular.",
    icon: LockKeyhole,
  },
  {
    title: "Imprensa e parcerias",
    description:
      "Contato para entrevistas, cooperação institucional, projetos editoriais e iniciativas de educação do consumidor.",
    icon: Newspaper,
  },
]

const evidenceItems = [
  "URL da página, empresa, CNPJ ou identificador do relato.",
  "Motivo objetivo da solicitação e trecho que deve ser analisado.",
  "Documentos ou links que sustentem a correção ou manifestação.",
  "Nome, cargo, e-mail institucional e vínculo com a empresa quando aplicável.",
]

const sideNotes = [
  {
    title: "Não é SAC individual",
    description:
      "O contato institucional não substitui atendimento da empresa, Procon, Consumidor.gov.br ou órgãos competentes.",
    icon: ShieldCheck,
  },
  {
    title: "Relatos têm fluxo próprio",
    description:
      "Consumidores devem usar o formulário de relato para organizar fatos, datas, canais e documentos preservados.",
    icon: FilePenLine,
  },
  {
    title: "Contato precisa de contexto",
    description:
      "Quanto mais precisa for a referência enviada, mais rápida e segura será a análise pela plataforma.",
    icon: Building2,
  },
]

export default function ContatoPage() {
  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden bg-[#0b0b0b] text-white">
        <Image
          src="/home-hero-consumo.png"
          alt="Documentos e notebook sobre mesa escura"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/88 to-[#050505]/34" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/45" />

        <div className="container relative mx-auto px-4 py-16 md:px-6 lg:py-20">
          <div className="max-w-4xl">
            <Badge className="mb-5 border-primary/40 bg-primary text-primary-foreground">
              Canal institucional
            </Badge>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
              Contato
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
              Fale com a plataforma com contexto, fundamento e segurança.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/74 md:text-lg">
              Este canal organiza solicitações institucionais, direito de
              resposta, correções, privacidade, imprensa e parcerias. Relatos de
              consumidores devem seguir o fluxo próprio da plataforma.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg">
                <Link href="#formulario">
                  Abrir formulário
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <Link href="/enviar-relato">Enviar relato de consumidor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <SectionHeading
          eyebrow="Como podemos ajudar"
          title="Escolha o canal certo para cada tipo de solicitação"
          description="A organização correta do contato protege a plataforma, quem relata e as empresas mencionadas."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {contactReasons.map((reason) => (
            <InfoCard key={reason.title} {...reason} />
          ))}
        </div>
      </section>

      <section className="bg-[#111111] py-12 text-white md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Antes de enviar
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                Solicitações completas reduzem ruído e aceleram a análise.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/65">
                A plataforma trabalha com informação pública, dados agregados e
                moderação. Por isso, pedidos institucionais precisam de
                identificação, referência e fundamento.
              </p>
            </div>
            <div className="grid gap-3">
              {evidenceItems.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-lg border border-white/12 bg-white/[0.05] p-4 text-sm leading-6"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="formulario"
        className="container mx-auto scroll-mt-24 px-4 py-12 md:px-6 md:py-16"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
          <Card className="shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="mb-7">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                  Formulário institucional
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  Envie sua solicitação para análise
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Preencha os campos com precisão. Nesta etapa, o envio é
                  demonstrativo e será conectado ao fluxo de atendimento da
                  plataforma nas próximas integrações.
                </p>
              </div>
              <ContactForm />
            </CardContent>
          </Card>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-lg border border-primary/35 bg-primary/10 p-5">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-bold">E-mail institucional</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Para comunicações formais, imprensa e parcerias.
                  </p>
                  <a
                    href="mailto:contato@alertaaoconsumidor.com.br"
                    className="mt-2 block text-sm font-bold text-primary"
                  >
                    contato@alertaaoconsumidor.com.br
                  </a>
                </div>
              </div>
            </div>
            {sideNotes.map((note) => (
              <SideNote key={note.title} {...note} />
            ))}
            <div className="rounded-lg border bg-card p-5 shadow-sm">
              <p className="font-bold">Representa uma empresa?</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Informe CNPJ, cargo, e-mail institucional e URL exata da página
                para direito de resposta, correção ou contextualização.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12 md:px-6 md:pb-16">
        <div className="relative isolate overflow-hidden rounded-lg border border-primary/40 bg-primary p-6 shadow-lg md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.42),transparent_32%),linear-gradient(135deg,rgba(255,214,0,1),rgba(234,179,8,0.92))]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-zinc-900/65">
                Relato de consumidor
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Tem um problema de consumo para registrar?
              </h2>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-zinc-900/75">
                Use o fluxo de relato para organizar fatos, datas, valores,
                canais de contato e documentos preservados.
              </p>
            </div>
            <Button asChild className="bg-zinc-950 text-white hover:bg-zinc-800">
              <Link href="/enviar-relato">
                Enviar relato <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
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

function SideNote({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: LucideIcon
}) {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-md">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 text-primary" />
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

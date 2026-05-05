import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Banknote,
  BellRing,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  FileWarning,
  GlobeLock,
  KeyRound,
  Landmark,
  Link2Off,
  MessageCircleWarning,
  MonitorSmartphone,
  PhoneCall,
  ShieldAlert,
  ShieldCheck,
  Siren,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Golpes e Fraudes | Alerta ao Consumidor",
  description:
    "Orientações preventivas para identificar golpes, proteger pagamentos digitais e preservar provas em caso de fraude.",
};

const warningSigns = [
  {
    title: "Urgência artificial",
    description:
      "Mensagens que exigem decisão imediata, pagamento rápido ou sigilo costumam reduzir a capacidade de conferência.",
    icon: BellRing,
  },
  {
    title: "Link ou domínio suspeito",
    description:
      "Golpistas imitam bancos, lojas, transportadoras, marketplaces e órgãos públicos com páginas visualmente parecidas.",
    icon: Link2Off,
  },
  {
    title: "Pedido de senha ou código",
    description:
      "Empresas e bancos não devem pedir senha, token, código SMS ou acesso remoto por telefone ou mensagem.",
    icon: KeyRound,
  },
  {
    title: "Pagamento fora do fluxo",
    description:
      "Pix, boleto ou transferência para favorecido estranho ao fornecedor é sinal de risco e exige conferência adicional.",
    icon: Banknote,
  },
];

const preventionCards = [
  {
    title: "Antes de pagar",
    icon: CreditCard,
    items: [
      "Digite o endereço do site manualmente e confira domínio, CNPJ, razão social e canais de atendimento.",
      "Compare preços. Descontos muito abaixo da média podem indicar fraude, produto falso ou prática enganosa.",
      "Confira favorecido do Pix, boleto ou cartão antes de confirmar a transação.",
    ],
  },
  {
    title: "Durante o atendimento",
    icon: PhoneCall,
    items: [
      "Não informe senhas, tokens, códigos de verificação ou dados completos do cartão.",
      "Recuse instalação de aplicativo de acesso remoto solicitado por suposto atendente.",
      "Registre data, canal, número, protocolo e nome informado pelo atendente.",
    ],
  },
  {
    title: "Se suspeitar de golpe",
    icon: FileWarning,
    items: [
      "Interrompa a conversa e procure o canal oficial da empresa, banco ou órgão público.",
      "Guarde prints, comprovantes, URLs, telefones, chaves Pix, boletos e histórico de conversa.",
      "Acione banco, cartão ou instituição financeira rapidamente e registre ocorrência quando aplicável.",
    ],
  },
];

const pixActions = [
  "Conteste a transação no aplicativo da sua instituição financeira o quanto antes.",
  "Em caso de Pix, solicite o Mecanismo Especial de Devolução quando houver suspeita de fraude.",
  "Registre boletim de ocorrência e preserve comprovantes, mensagens e dados do recebedor.",
  "Se a instituição não resolver, avalie Procon, Banco Central, Judiciário ou orientação jurídica.",
];

const officialSources = [
  {
    title: "Senacon",
    description:
      "Orientações sobre compras on-line, pagamentos seguros, reembolso, devolução e registro em canais oficiais.",
    href: "https://www.gov.br/mj/pt-br/assuntos/noticias/senacon-explica-como-evitar-fraudes-em-compras-on-line-1",
    label: "Compras on-line",
  },
  {
    title: "Banco Central",
    description:
      "Informações sobre segurança no Pix, MED, contestação e mecanismos de proteção contra fraude.",
    href: "https://www.bcb.gov.br/estabilidadefinanceira/pix-seguranca",
    label: "Pix e MED",
  },
  {
    title: "Anatel",
    description:
      "Dicas de segurança digital, privacidade, senhas, autenticação em dois fatores e golpes por telecomunicações.",
    href: "https://www.gov.br/anatel/pt-br/assuntos/dicas-contra-fraudes/dicas-de-seguranca",
    label: "Segurança digital",
  },
];

const reportModel = [
  {
    title: "Contexto do golpe",
    description:
      "Explique como chegou à oferta, mensagem, ligação, perfil, site ou suposto atendimento.",
    icon: MessageCircleWarning,
  },
  {
    title: "Dados verificáveis",
    description:
      "Informe datas, valores, comprovantes, URLs, chaves Pix, boletos e canais usados.",
    icon: MonitorSmartphone,
  },
  {
    title: "Providências tomadas",
    description:
      "Registre contato com banco, empresa, cartão, boletim de ocorrência e protocolos oficiais.",
    icon: Landmark,
  },
];

export default function GolpesPage() {
  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden bg-[#0b0b0b] text-white">
        <Image
          src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1800&q=80"
          alt="Pessoa usando notebook e cartão para compra digital"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/88 to-[#050505]/34" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/45" />

        <div className="container relative mx-auto px-4 py-16 md:px-6 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div className="max-w-4xl">
              <Badge className="mb-5 border-primary/40 bg-primary text-primary-foreground">
                Prevenção e prova
              </Badge>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                Golpes e fraudes
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                Identifique sinais de risco antes de perder dinheiro.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/74 md:text-lg">
                Golpes digitais exploram pressa, confiança, aparência de
                autoridade e distração no pagamento. Esta página organiza
                cuidados preventivos e passos para preservar provas.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg">
                  <Link href="/enviar-relato">
                    Registrar relato preventivo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <Link href="/cdc">Ver direitos no CDC</Link>
                </Button>
              </div>
            </div>

            <Card className="border-white/12 bg-white/10 text-white shadow-2xl backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Siren className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">Regra de ouro</p>
                    <p className="mt-2 text-sm leading-6 text-white/68">
                      Se a mensagem exige pressa, segredo, pagamento imediato ou
                      código de segurança, pare e confira pelo canal oficial.
                    </p>
                  </div>
                </div>
                <Separator className="my-5 bg-white/10" />
                <div className="grid gap-3 text-sm">
                  <MetricLine label="Pressa" value="sinal de risco" />
                  <MetricLine label="Senha ou token" value="nunca informe" />
                  <MetricLine label="Pix suspeito" value="conteste rápido" />
                  <MetricLine label="Provas" value="preserve tudo" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <SectionHeading
          eyebrow="Sinais de alerta"
          title="Como golpes costumam se apresentar"
          description="As táticas mudam com frequência, mas muitos golpes repetem padrões de pressão, imitação visual e desvio do pagamento para fora do fluxo esperado."
          icon={ShieldAlert}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {warningSigns.map((sign) => (
            <WarningCard key={sign.title} {...sign} />
          ))}
        </div>
      </section>

      <section className="bg-[#111111] py-12 text-white md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Conduta preventiva"
              title="Checklist antes, durante e depois"
              description="O objetivo é diminuir risco financeiro e preservar elementos que permitam contestar a operação, registrar ocorrência ou relatar o padrão."
              icon={ShieldCheck}
              dark
            />
            <Button asChild variant="link" className="px-0 text-primary">
              <Link href="/metodologia">
                Ver metodologia <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {preventionCards.map((card) => (
              <PreventionCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Pix e pagamentos"
              title="Aja rápido quando houver suspeita"
              description="O Banco Central orienta que vítimas acionem a instituição financeira. No Pix, pode haver contestação por mecanismos próprios, como o MED, conforme análise das instituições envolvidas."
              icon={Banknote}
            />
            <div className="mt-6 rounded-lg border border-primary/35 bg-primary/10 p-5">
              <p className="flex items-center gap-2 font-bold">
                <AlertTriangle className="h-5 w-5 text-primary" />
                MED não é garantia automática
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A eventual devolução depende da análise do caso e da existência
                de saldo bloqueável na conta do recebedor ou envolvidos.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {pixActions.map((item) => (
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
            eyebrow="Relato no Alerta"
            title="Como documentar um golpe sem se expor"
            description="O relato deve ajudar outros consumidores a reconhecer padrões, mas dados pessoais, documentos e conversas completas precisam ser protegidos."
            icon={GlobeLock}
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {reportModel.map((item) => (
              <ReportModelCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <SectionHeading
          eyebrow="Fontes oficiais"
          title="Onde conferir orientações"
          description="Use fontes oficiais para validar procedimentos, canais de reclamação e medidas de segurança antes de tomar decisões."
          icon={ExternalLink}
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {officialSources.map((source) => (
            <OfficialCard key={source.title} {...source} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12 md:px-6 md:pb-16">
        <div className="relative isolate overflow-hidden rounded-lg border border-primary/40 bg-primary p-6 shadow-lg md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.42),transparent_32%),linear-gradient(135deg,rgba(255,214,0,1),rgba(234,179,8,0.92))]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-zinc-900/65">
                Informação preventiva
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Compartilhe o padrão. Proteja seus dados.
              </h2>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-zinc-900/75">
                Um relato bem documentado pode alertar outros consumidores sem
                publicar documentos, CPF, telefone, endereço ou dados bancários.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-zinc-950 text-white hover:bg-zinc-800">
                <Link href="/enviar-relato">
                  Registrar relato <ArrowRight className="ml-2 h-4 w-4" />
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

function WarningCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
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
  );
}

function PreventionCard({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: string[];
  icon: LucideIcon;
}) {
  return (
    <div className="group rounded-lg border border-white/15 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-primary/10 hover:shadow-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary transition duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm leading-6">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-white/68">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportModelCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
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
  );
}

function OfficialCard({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description: string;
  href: string;
  label: string;
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
  );
}

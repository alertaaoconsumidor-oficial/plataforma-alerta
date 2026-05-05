import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeHelp,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  FileText,
  Handshake,
  MessageSquareText,
  ReceiptText,
  RotateCcw,
  Scale,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Código de Defesa do Consumidor | Alerta ao Consumidor",
  description:
    "Guia informativo sobre direitos essenciais do consumidor brasileiro, com base no CDC e em fontes oficiais.",
};

const rights = [
  {
    article: "Art. 6º",
    title: "Informação adequada e clara",
    description:
      "Preço, prazo, características, composição, riscos, tributos e condições da oferta precisam ser compreensíveis antes da contratação.",
    icon: BookOpenCheck,
  },
  {
    article: "Arts. 30 e 35",
    title: "Oferta deve ser cumprida",
    description:
      "A informação ou publicidade suficientemente precisa vincula o fornecedor. Em descumprimento, o consumidor pode buscar as alternativas previstas no CDC.",
    icon: ClipboardCheck,
  },
  {
    article: "Art. 37",
    title: "Publicidade enganosa ou abusiva",
    description:
      "Anúncios não podem induzir o consumidor a erro sobre natureza, preço, qualidade, origem, prazo ou demais características do produto ou serviço.",
    icon: BadgeHelp,
  },
  {
    article: "Art. 49",
    title: "Arrependimento em compra fora da loja",
    description:
      "Em compras feitas fora do estabelecimento comercial, como internet ou telefone, o CDC prevê prazo de reflexão de 7 dias.",
    icon: RotateCcw,
  },
  {
    article: "Art. 18",
    title: "Produto com vício ou defeito",
    description:
      "Quando o problema não é sanado no prazo legal aplicável, o consumidor pode escolher as alternativas previstas no CDC.",
    icon: ShoppingCart,
  },
  {
    article: "Art. 52",
    title: "Crédito e parcelamento",
    description:
      "Em vendas a prazo, informações sobre juros, encargos, parcelas, custo total e condições precisam ser apresentadas com clareza.",
    icon: ReceiptText,
  },
];

const journey = [
  {
    title: "Antes de comprar",
    description:
      "Compare preço, verifique CNPJ, reputação, prazo, frete, política de troca e identificação do fornecedor.",
    icon: ShoppingCart,
  },
  {
    title: "Durante a contratação",
    description:
      "Guarde prints, oferta, comprovante, número do pedido, contrato, nota fiscal e protocolos de atendimento.",
    icon: FileText,
  },
  {
    title: "Quando houver problema",
    description:
      "Registre tentativa de solução pelo canal oficial da empresa e acompanhe prazos, respostas e documentos.",
    icon: MessageSquareText,
  },
  {
    title: "Se não resolver",
    description:
      "Procure canais oficiais como Consumidor.gov.br, Procon, Defensoria Pública, Juizado Especial ou orientação profissional adequada.",
    icon: Scale,
  },
];

const officialChannels = [
  {
    title: "Texto oficial do CDC",
    description:
      "Lei nº 8.078/1990 compilada no portal da Presidência da República.",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm",
    label: "Planalto",
  },
  {
    title: "Consumidor.gov.br",
    description:
      "Serviço público em que empresas participantes respondem reclamações em até 10 dias, com avaliação posterior pelo consumidor.",
    href: "https://www.consumidor.gov.br/pages/principal/como-funciona",
    label: "Consumidor.gov.br",
  },
  {
    title: "Orientações da Senacon",
    description:
      "Cuidados com compras, ofertas, métodos de pagamento e canais oficiais de defesa do consumidor.",
    href: "https://www.gov.br/mj/pt-br/assuntos/noticias/black-friday-2025-senacon-orienta-consumidores-a-evitar-golpes-e-comprar-com-seguranca",
    label: "Senacon",
  },
];

const platformUse = [
  "A plataforma não substitui Procon, Poder Judiciário, Defensoria Pública, Ministério Público ou advogado.",
  "O relato público deve ser factual: datas, valores, prazos, protocolos, status e canais utilizados.",
  "Documentos e dados pessoais devem permanecer em camada privada, não em descrição pública.",
  "Indicadores ajudam a leitura coletiva, mas não encerram discussão sobre responsabilidade individual.",
];

export default function CdcPage() {
  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden bg-[#0b0b0b] text-white">
        <Image
          src="/home-hero-consumo.png"
          alt="Documentos e elementos de análise sobre mesa escura"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-42"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/88 to-[#050505]/34" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/45" />

        <div className="container relative mx-auto px-4 py-16 md:px-6 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div className="max-w-4xl">
              <Badge className="mb-5 border-primary/40 bg-primary text-primary-foreground">
                Lei nº 8.078/1990
              </Badge>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                Código de Defesa do Consumidor
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                Direitos do consumidor para decisões mais seguras.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/74 md:text-lg">
                Um guia informativo sobre pontos essenciais do CDC para ajudar
                consumidores a pesquisar empresas, organizar relatos e preservar
                provas com responsabilidade.
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
                  <Link
                    href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Texto oficial <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <Card className="border-white/12 bg-white/10 text-white shadow-2xl backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Scale className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">Leitura responsável</p>
                    <p className="mt-2 text-sm leading-6 text-white/68">
                      Esta página não é consultoria jurídica. Ela organiza
                      referências públicas e orienta como registrar fatos com
                      segurança.
                    </p>
                  </div>
                </div>
                <Separator className="my-5 bg-white/10" />
                <div className="grid gap-3 text-sm">
                  <MetricLine label="Base legal" value="CDC" />
                  <MetricLine label="Uso no Alerta" value="informativo" />
                  <MetricLine label="Relatos" value="fatos e provas" />
                  <MetricLine label="Dados pessoais" value="protegidos" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <SectionHeading
          eyebrow="Direitos essenciais"
          title="O que o CDC ajuda a proteger"
          description="Os pontos abaixo foram estruturados para leitura prática. Para interpretação jurídica completa, consulte o texto oficial e órgãos competentes."
          icon={ShieldCheck}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rights.map((right) => (
            <RightCard key={right.title} {...right} />
          ))}
        </div>
      </section>

      <section className="bg-[#111111] py-12 text-white md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Como agir"
              title="Da pesquisa ao registro responsável"
              description="A boa documentação nasce antes do problema. O consumidor que guarda oferta, comprovantes e protocolos consegue relatar com mais precisão."
              icon={ClipboardCheck}
              dark
            />
            <Button asChild variant="link" className="px-0 text-primary">
              <Link href="/metodologia">
                Ver metodologia <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {journey.map((step, index) => (
              <JourneyStep
                key={step.title}
                index={index + 1}
                showConnector={index < journey.length - 1}
                {...step}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Uso dentro da plataforma"
              title="O CDC orienta o relato, não autoriza exposição indevida"
              description="O objetivo é transformar experiência individual em informação pública útil, sem publicar documentos privados ou acusações sem contexto."
              icon={Handshake}
            />
            <div className="mt-6 rounded-lg border border-primary/35 bg-primary/10 p-5">
              <p className="flex items-center gap-2 font-bold">
                <Building2 className="h-5 w-5 text-primary" />
                Empresas também têm direito de resposta
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A plataforma deve preservar espaço para manifestação,
                correção, atualização de informações e contextualização de dados.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {platformUse.map((item) => (
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
            eyebrow="Fontes oficiais"
            title="Onde conferir e reclamar"
            description="Links úteis para consulta de lei, registro de reclamação e orientação oficial. Estes canais têm papel diferente do Alerta ao Consumidor."
            icon={ExternalLink}
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {officialChannels.map((channel) => (
              <OfficialCard key={channel.title} {...channel} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="relative isolate overflow-hidden rounded-lg border border-primary/40 bg-primary p-6 shadow-lg md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.42),transparent_32%),linear-gradient(135deg,rgba(255,214,0,1),rgba(234,179,8,0.92))]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-zinc-900/65">
                Próximo passo
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Use o CDC para organizar fatos, não para expor pessoas.
              </h2>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-zinc-900/75">
                Relatos objetivos, com documentos preservados em ambiente
                privado, ajudam outros consumidores e reduzem risco jurídico.
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
                <Link href="/golpes">Ver prevenção a golpes</Link>
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

function RightCard({
  article,
  title,
  description,
  icon: Icon,
}: {
  article: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="group shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary transition duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <Badge variant="secondary">{article}</Badge>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function JourneyStep({
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
    <div className="group relative rounded-lg border border-white/12 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-primary/10 hover:shadow-xl">
      {showConnector ? (
        <div className="absolute left-[calc(100%-0.25rem)] top-10 hidden h-px w-6 border-t border-dashed border-white/18 lg:block" />
      ) : null}
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary transition duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <span className="mt-5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {index}
      </span>
      <h3 className="mt-4 font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/64">{description}</p>
    </div>
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

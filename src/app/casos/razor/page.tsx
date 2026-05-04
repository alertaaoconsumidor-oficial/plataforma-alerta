import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  FileText,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClosedCompanyNotice } from "@/features/public-cases/components/closed-company-notice";
import { CaseLgpdNotice } from "@/features/public-cases/components/case-lgpd-notice";
import { CaseStatCardGrid } from "@/features/public-cases/components/case-stat-card-grid";
import {
  razorPreliminaryStats,
  razorPrimaryMetrics,
} from "@/features/public-cases/data/razor-preliminary-stats";

export const metadata: Metadata = {
  title: "CASO RAZOR | Alerta ao Consumidor",
  description:
    "Caso inicial do Alerta ao Consumidor para organizacao documental e estatistica de relatos agregados.",
};

const actionCards = [
  {
    title: "Registrar relato",
    description:
      "Consumidores afetados podem registrar informacoes factuais para organizacao coletiva.",
    href: "/enviar-relato?caso=razor",
    icon: FileText,
  },
  {
    title: "Ver estatisticas",
    description:
      "Painel preliminar com dados agregados, sem exposicao de dados pessoais.",
    href: "/casos/razor/estatisticas",
    icon: BarChart3,
  },
  {
    title: "Direito de resposta",
    description:
      "Canal para manifestacao formal de representantes, compliance ou interessados.",
    href: "/casos/razor/direito-de-resposta",
    icon: MessageSquareText,
  },
];

export default function CasoRazorPage() {
  return (
    <div className="bg-background">
      <section className="border-b bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl">
            <Badge variant="secondary">Caso piloto</Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
              {razorPreliminaryStats.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-primary-foreground/90 md:text-xl">
              {razorPreliminaryStats.subtitle}: organizacao de relatos,
              preservacao de provas privadas e consolidacao de dados
              preliminares com responsabilidade informativa.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/enviar-relato?caso=razor">
                  Registrar relato <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="/casos/razor/estatisticas">Ver estatisticas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto space-y-10 px-4 py-12 md:px-6 md:py-16">
        <ClosedCompanyNotice />
        <CaseStatCardGrid metrics={razorPrimaryMetrics} />

        <div className="grid gap-6 lg:grid-cols-3">
          {actionCards.map((card) => (
            <Card key={card.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <card.icon className="h-5 w-5 text-primary" />
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
                <Button asChild variant="link" className="mt-4 px-0">
                  <Link href={card.href}>
                    Acessar <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Finalidade do caso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                O CASO RAZOR reune relatos de consumidores que afirmam ter
                sofrido prejuizos relacionados a contratacoes, pagamentos ou
                negociacoes vinculadas a empresa atualmente encerrada, inativa
                ou sem operacao identificada.
              </p>
              <p>
                A plataforma nao declara culpa definitiva de pessoas ou
                empresas. O objetivo e organizar relatos, proteger dados
                pessoais, consolidar dados agregados e preservar canal para
                manifestacao formal das partes interessadas.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Comunicacao responsavel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Dados publicos sempre agregados e preliminares.</li>
                <li>Nenhum documento e publicado automaticamente.</li>
                <li>Nomes de vitimas e dados pessoais nao sao exibidos.</li>
                <li>Ha canal especifico para direito de resposta.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <CaseLgpdNotice />
      </section>
    </div>
  );
}

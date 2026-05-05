import type { Metadata } from "next";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  LockKeyhole,
  MessageSquareText,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Área do Usuário",
  description:
    "Painel do consumidor para acompanhar relatos, documentos, respostas e notificações.",
};

const userStats = [
  { label: "Relatos enviados", value: "3", icon: FileText },
  { label: "Em validação", value: "2", icon: Clock3 },
  { label: "Com resposta", value: "1", icon: MessageSquareText },
  { label: "Documentos privados", value: "6", icon: LockKeyhole },
];

const reports = [
  {
    title: "Produto não entregue",
    company: "CASO RAZOR",
    status: "Aguardando validação",
    updatedAt: "Atualizado em 03/05/2026",
  },
  {
    title: "Reembolso pendente",
    company: "Loja Varejista Express",
    status: "Com documentação informada",
    updatedAt: "Atualizado em 28/04/2026",
  },
  {
    title: "Atendimento sem retorno",
    company: "Telefonia Conecta+",
    status: "Resposta recebida",
    updatedAt: "Atualizado em 18/04/2026",
  },
];

const nextSteps = [
  "Revisar dados antes da publicação pública.",
  "Anexar comprovantes quando a área privada estiver liberada.",
  "Acompanhar direito de resposta da empresa citada.",
  "Receber alertas sobre mudanças de status do caso.",
];

export default function UsuarioPage() {
  return (
    <main className="bg-background">
      <section className="border-b bg-card">
        <div className="container mx-auto grid gap-8 px-4 py-12 md:px-6 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <Badge className="mb-4">Preparado para integração</Badge>
            <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight md:text-5xl">
              <UserRound className="h-9 w-9 text-primary" />
              Área do usuário
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Espaço para o consumidor acompanhar relatos, documentos privados,
              respostas, notificações e próximos passos. A tela já fica pronta
              para futura conexão com autenticação e banco de dados.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Privacidade primeiro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                Dados pessoais, anexos e evidências devem permanecer em área
                privada, com publicação apenas de informações moderadas.
              </p>
              <Button asChild className="w-full">
                <Link href="/enviar-relato">Registrar novo relato</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto space-y-8 px-4 py-12 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {userStats.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.label}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </p>
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="mt-4 text-3xl font-bold">{item.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card>
            <CardHeader>
              <CardTitle>Meus relatos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reports.map((report) => (
                <div
                  key={`${report.company}-${report.title}`}
                  className="rounded-lg border p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-bold">{report.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {report.company}
                      </p>
                    </div>
                    <Badge variant="secondary">{report.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {report.updatedAt}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Central de notificações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Alertas de validação, resposta da empresa e novas etapas.</p>
                <p className="rounded-lg bg-primary/10 p-3 text-foreground">
                  Próxima integração: preferências de e-mail, WhatsApp e painel.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck2 className="h-5 w-5 text-primary" />
                  Próximos passos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nextSteps.map((step) => (
                  <div key={step} className="flex gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{step}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

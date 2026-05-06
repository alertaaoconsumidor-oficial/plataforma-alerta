"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Bell,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  FileArchive,
  FileCheck2,
  FileText,
  Home,
  LockKeyhole,
  MessageSquareText,
  Printer,
  Search,
  ShieldCheck,
  UploadCloud,
  UserRound,
  WalletCards,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DossierTemplate } from "@/components/dashboard/dossier-template";
import { ProfileSettingsDialog } from "@/components/dashboard/profile-settings-dialog";
import { UploadPanel } from "@/components/dashboard/upload-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { label: "Resumo", href: "#resumo", icon: Home, active: true },
  { label: "Perfil", href: "#perfil", icon: UserRound },
  { label: "Meus relatos", href: "#relatos", icon: FileText, badge: "3" },
  { label: "Arquivos", href: "#arquivos", icon: UploadCloud, badge: "6" },
  { label: "Dossiê", href: "#dossie", icon: FileArchive },
  { label: "Notificações", href: "#notificacoes", icon: Bell },
  { label: "Privacidade", href: "#privacidade", icon: LockKeyhole },
];

const userStats = [
  { label: "Relatos enviados", value: "3", detail: "2 ativos", icon: FileText },
  { label: "Em validação", value: "2", detail: "moderação", icon: Clock3 },
  { label: "Com resposta", value: "1", detail: "empresa", icon: MessageSquareText },
  { label: "Documentos privados", value: "6", detail: "armazenados", icon: LockKeyhole },
];

const reports = [
  {
    title: "Produto não entregue",
    company: "CASO RAZOR",
    status: "Aguardando validação",
    protocol: "RZR-001",
    date: "01/05/2026",
    nextStep: "Equipe revisará documentos e linguagem pública.",
    progress: 42,
  },
  {
    title: "Reembolso pendente",
    company: "Loja Varejista Express",
    status: "Com documentação informada",
    protocol: "LVE-014",
    date: "28/04/2026",
    nextStep: "Aguardando classificação de comprovantes.",
    progress: 68,
  },
  {
    title: "Atendimento sem retorno",
    company: "Telefonia Conecta+",
    status: "Resposta recebida",
    protocol: "TCM-009",
    date: "16/04/2026",
    nextStep: "Consumidor pode contextualizar a resposta recebida.",
    progress: 82,
  },
];

const userFiles = [
  {
    name: "comprovante-pagamento.pdf",
    type: "PDF",
    size: "312 KB",
    status: "Privado",
    category: "Comprovante",
    linkedTo: "RZR-001",
    visibility: "Privado",
  },
  {
    name: "conversa-atendimento.png",
    type: "Imagem",
    size: "860 KB",
    status: "Aguardando validação",
    category: "Conversa",
    linkedTo: "RZR-001",
    visibility: "Privado",
  },
  {
    name: "pedido-cancelamento.pdf",
    type: "PDF",
    size: "140 KB",
    status: "Classificado",
    category: "Protocolo",
    linkedTo: "LVE-014",
    visibility: "Privado",
  },
];

const notifications = [
  "Seu relato RZR-001 foi recebido e aguarda validação.",
  "Foi adicionada uma etapa de organização coletiva no CASO RAZOR.",
  "O template de dossiê já pode ser pré-visualizado.",
];

const nextSteps = [
  ["Completar perfil", "86% preenchido", 86],
  ["Vincular documentos ao relato principal", "4 de 6 classificados", 66],
  ["Revisar dossiê preliminar", "Pronto para conferência", 78],
];

export function UserDashboard() {
  const [dossierStatus, setDossierStatus] = useState(
    "Modelo individual pronto para conferência."
  );

  function handleGenerateDossier() {
    setDossierStatus(
      "Dossiê individual preparado. Use a impressão do navegador para salvar como PDF."
    );
    window.print();
  }

  return (
    <DashboardLayout
      eyebrow="Área do consumidor"
      title="Minha central de acompanhamento"
      description="Painel premium para acompanhar relatos, anexos privados, notificações, perfil completo e dossiê individual."
      navItems={navItems}
      actions={
        <>
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar meus relatos"
              className="bg-white pl-9"
            />
          </div>
          <ProfileSettingsDialog variant="user" />
          <Button onClick={handleGenerateDossier} className="print:hidden">
            <Printer className="mr-2 h-4 w-4" />
            Gerar dossiê
          </Button>
        </>
      }
      sidebarFooter={
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4">
          <p className="text-sm font-bold">Dados privados</p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Anexos e documentos são tratados como privados até revisão e
            autorização expressa de uso.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <section id="resumo" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {userStats.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.label}
                className="border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/10"
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </p>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                  </div>
                  <p className="mt-4 text-3xl font-extrabold">{item.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.detail}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <Card id="perfil" className="overflow-hidden border bg-white shadow-sm">
            <CardHeader className="border-b bg-[#111111] text-white">
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Central do perfil
              </CardTitle>
              <p className="text-sm leading-6 text-white/65">
                Perfil, consentimentos e documentos devem formar um histórico
                claro antes de qualquer publicação pública.
              </p>
            </CardHeader>
            <CardContent className="grid gap-4 p-5 md:grid-cols-3">
              {nextSteps.map(([title, description, progress]) => (
                <div key={title} className="rounded-2xl border bg-muted/30 p-4">
                  <p className="font-bold">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                  </p>
                  <Progress value={Number(progress)} className="mt-4" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card id="notificacoes" className="border bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl bg-muted/50 p-3 text-sm leading-6"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <Card id="relatos" className="border bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck2 className="h-5 w-5 text-primary" />
                Meus relatos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reports.map((report) => (
                <div
                  key={`${report.company}-${report.title}`}
                  className="rounded-2xl border bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold">{report.title}</p>
                        <Badge variant="outline">{report.protocol}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {report.company}
                      </p>
                    </div>
                    <Badge variant="secondary">{report.status}</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                      <span>Andamento</span>
                      <span>{report.progress}%</span>
                    </div>
                    <Progress value={report.progress} />
                  </div>
                  <div className="mt-4 grid gap-3 rounded-xl bg-muted/40 p-3 text-sm md:grid-cols-[150px_1fr_auto] md:items-center">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <CalendarCheck2 className="h-4 w-4 text-primary" />
                      {report.date}
                    </span>
                    <span>{report.nextStep}</span>
                    <Button variant="ghost" size="sm">
                      Ver relato
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WalletCards className="h-5 w-5 text-primary" />
                Prioridades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Confirmar dados cadastrais antes de gerar o dossiê.",
                "Classificar anexos por tipo de evidência.",
                "Evitar dados pessoais em texto público.",
                "Aguardar moderação antes de compartilhar link.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-sm leading-6">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="arquivos" className="grid gap-6 xl:grid-cols-[minmax(0,1fr)]">
          <UploadPanel
            title="Upload de documentos"
            description="Envie comprovantes, conversas, contratos, notas fiscais e protocolos para compor seu histórico privado."
            initialFiles={userFiles}
            variant="user"
          />
        </section>

        <section id="privacidade" className="grid gap-4 md:grid-cols-3">
          {[
            ["Privacidade", "Dados pessoais e anexos não são exibidos publicamente."],
            ["Anonimato", "O consumidor pode solicitar exibição pública sem nome."],
            ["Direito de resposta", "Empresas podem contextualizar informações publicadas."],
          ].map(([title, description]) => (
            <Card
              key={title}
              className="border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/10"
            >
              <CardContent className="p-5">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="mt-4 font-bold">{title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section id="dossie" className="space-y-3">
          <div className="flex flex-col gap-3 rounded-2xl border bg-white p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-bold">Dossiê individual</p>
              <p className="text-sm text-muted-foreground">{dossierStatus}</p>
            </div>
            <Button onClick={handleGenerateDossier} variant="outline" className="print:hidden">
              <Printer className="mr-2 h-4 w-4" />
              Gerar PDF
            </Button>
          </div>
          <DossierTemplate audience="user" />
        </section>
      </div>
    </DashboardLayout>
  );
}

"use client";

import { useState } from "react";
import {
  Bell,
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
  { label: "Meus relatos", href: "#relatos", icon: FileText, badge: "3" },
  { label: "Arquivos", href: "#arquivos", icon: UploadCloud, badge: "6" },
  { label: "Dossiê", href: "#dossie", icon: FileArchive },
  { label: "Notificações", href: "#notificacoes", icon: Bell },
  { label: "Privacidade", href: "#privacidade", icon: LockKeyhole },
];

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
    progress: 42,
  },
  {
    title: "Reembolso pendente",
    company: "Loja Varejista Express",
    status: "Com documentação informada",
    progress: 68,
  },
  {
    title: "Atendimento sem retorno",
    company: "Telefonia Conecta+",
    status: "Resposta recebida",
    progress: 82,
  },
];

const userFiles = [
  {
    name: "comprovante-pagamento.pdf",
    type: "PDF",
    size: "312 KB",
    status: "Privado",
  },
  {
    name: "conversa-atendimento.png",
    type: "Imagem",
    size: "860 KB",
    status: "Aguardando validação",
  },
  {
    name: "pedido-cancelamento.pdf",
    type: "PDF",
    size: "140 KB",
    status: "Classificado",
  },
];

const notifications = [
  "Seu relato RZR-001 foi recebido e aguarda validação.",
  "Foi adicionada uma etapa de organização coletiva no CASO RAZOR.",
  "O template de dossiê já pode ser pré-visualizado.",
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
      description="Painel inspirado no TailAdmin para acompanhar relatos, anexos privados, notificações, perfil completo e dossiê individual."
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
        <div className="rounded-xl border bg-primary/10 p-4">
          <p className="text-sm font-bold">Dados privados</p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Anexos e documentos são tratados como privados até revisão e
            autorização de uso.
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
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
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
                  className="rounded-xl border bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/10"
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
                  <div className="mt-4">
                    <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                      <span>Andamento</span>
                      <span>{report.progress}%</span>
                    </div>
                    <Progress value={report.progress} />
                  </div>
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
                <div key={item} className="flex gap-3 rounded-lg bg-muted/50 p-3 text-sm leading-6">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="arquivos" className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <UploadPanel
            title="Upload de documentos"
            description="Envie comprovantes, conversas, contratos, notas fiscais e protocolos para compor seu histórico privado."
            initialFiles={userFiles}
          />

          <Card id="privacidade" className="border bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Funcionalidades previstas
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {[
                ["Perfil completo", "Dados cadastrais, contato e consentimentos."],
                ["Arquivos privados", "Anexos classificados por tipo e vínculo com relato."],
                ["Dossiê em PDF", "Documento consolidado para conferência e uso pessoal."],
                ["Histórico", "Linha do tempo de atualizações e respostas."],
                ["Alertas", "Notificações por painel e e-mail."],
                ["LGPD", "Controle de privacidade, anonimato e exclusão futura."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-xl border bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/10"
                >
                  <p className="font-bold">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="dossie" className="space-y-3">
          <div className="flex flex-col gap-3 rounded-xl border bg-white p-4 md:flex-row md:items-center md:justify-between">
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

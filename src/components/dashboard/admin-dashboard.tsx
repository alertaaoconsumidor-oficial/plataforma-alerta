"use client";

import { useState } from "react";
import {
  Activity,
  BarChart3,
  Building2,
  Database,
  FileArchive,
  FileCheck2,
  FileText,
  Gauge,
  LayoutDashboard,
  LockKeyhole,
  MessageSquareText,
  Printer,
  Scale,
  Search,
  Shield,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const navItems = [
  { label: "Visão geral", href: "#visao-geral", icon: LayoutDashboard, active: true },
  { label: "Moderação", href: "#moderacao", icon: Shield, badge: "18" },
  { label: "Empresas e CNPJs", href: "#empresas", icon: Building2 },
  { label: "Evidências", href: "#evidencias", icon: FileArchive, badge: "31" },
  { label: "Dossiês", href: "#dossie", icon: FileText },
  { label: "Governança", href: "#governanca", icon: Scale },
  { label: "Banco futuro", href: "#integracoes", icon: Database },
];

const metrics = [
  { label: "Relatos pendentes", value: "24", trend: "+8 na semana", icon: FileCheck2 },
  { label: "Empresas monitoradas", value: "12", trend: "3 com alto volume", icon: Building2 },
  { label: "Direitos de resposta", value: "5", trend: "2 aguardando revisão", icon: MessageSquareText },
  { label: "Evidências privadas", value: "118", trend: "controle restrito", icon: LockKeyhole },
];

const moderationRows = [
  ["RZR-001", "Produto não entregue", "Dados pessoais encontrados", "Alta"],
  ["RZR-002", "Reembolso pendente", "Aguardando comprovante", "Média"],
  ["RZR-003", "Atendimento sem retorno", "Pronto para publicação", "Baixa"],
  ["RZR-004", "Direito de resposta", "Revisão institucional", "Alta"],
];

const analytics = [
  { label: "Tendência de relatos", value: "Alta moderada", progress: 74 },
  { label: "Risco de exposição de dados", value: "Baixo após moderação", progress: 22 },
  { label: "Tempo médio de validação", value: "1,8 dia", progress: 58 },
  { label: "Casos com documentação", value: "62%", progress: 62 },
];

const adminFiles = [
  {
    name: "relatos-validados-razor.xlsx",
    type: "Planilha",
    size: "248 KB",
    status: "Conferido",
  },
  {
    name: "prints-atendimento-lote-01.zip",
    type: "Arquivo compactado",
    size: "8.4 MB",
    status: "Restrito",
  },
  {
    name: "minuta-direito-resposta.pdf",
    type: "PDF",
    size: "420 KB",
    status: "Em revisão",
  },
];

export function AdminDashboard() {
  const [dossierStatus, setDossierStatus] = useState(
    "Template pronto para geração em PDF."
  );

  function handleGenerateDossier() {
    setDossierStatus(
      "Dossiê preparado. Use a impressão do navegador para salvar como PDF."
    );
    window.print();
  }

  return (
    <DashboardLayout
      eyebrow="Administração"
      title="Administração da plataforma"
      description="Painel inspirado no TailAdmin para moderação, empresas, CNPJs, evidências privadas, perfis, auditoria e dossiês institucionais."
      navItems={navItems}
      actions={
        <>
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar relato, empresa ou CNPJ"
              className="bg-white pl-9"
            />
          </div>
          <ProfileSettingsDialog variant="admin" />
          <Button onClick={handleGenerateDossier} className="print:hidden">
            <Printer className="mr-2 h-4 w-4" />
            Gerar dossiê em PDF
          </Button>
        </>
      }
      sidebarFooter={
        <div className="rounded-xl border bg-primary/10 p-4">
          <p className="text-sm font-bold">Operação segura</p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Perfis, logs, uploads e dossiês estão modelados para integração com
            banco, storage privado e auditoria.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <section id="visao-geral" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((item) => {
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
                    {item.trend}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
          <Card id="moderacao" className="border bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Fila de moderação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Assunto</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prioridade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {moderationRows.map((row) => (
                    <TableRow key={row[0]}>
                      {row.map((cell, index) => (
                        <TableCell key={`${row[0]}-${cell}`}>
                          {index === 3 ? <Badge>{cell}</Badge> : cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="border bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Inteligência operacional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analytics.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted-foreground">{item.value}</span>
                  </div>
                  <Progress value={item.progress} />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="evidencias" className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <UploadPanel
            title="Upload administrativo"
            description="Área para anexar documentos de validação, lotes de evidências, respostas públicas, planilhas e peças internas."
            initialFiles={adminFiles}
          />

          <Card id="governanca" className="border bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-primary" />
                Frentes previstas para gestão
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {[
                ["Moderação", "Regras de linguagem, privacidade e duplicidade."],
                ["Empresas", "Cadastro, CNPJs relacionados e direito de resposta."],
                ["Documentos", "Storage privado, classificação e trilha de acesso."],
                ["Relatórios", "Dossiês, indicadores e exportação de dados agregados."],
                ["Usuários", "Perfil, consentimentos, notificações e histórico."],
                ["Auditoria", "Logs de alteração, retenção e conformidade LGPD."],
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
              <p className="font-bold">Gerador de dossiê</p>
              <p className="text-sm text-muted-foreground">{dossierStatus}</p>
            </div>
            <Button onClick={handleGenerateDossier} variant="outline" className="print:hidden">
              <Printer className="mr-2 h-4 w-4" />
              Pré-visualizar PDF
            </Button>
          </div>
          <DossierTemplate audience="admin" />
        </section>

        <section id="integracoes" className="grid gap-4 md:grid-cols-3">
          {[
            ["Banco de dados", "Modelar usuários, relatos, empresas, CNPJs e anexos."],
            ["PDF server-side", "Gerar PDF oficial com fila, assinatura e versionamento."],
            ["Notificações", "E-mail, painel e alertas de resposta ou validação."],
          ].map(([title, description]) => (
            <Card
              key={title}
              className="border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/10"
            >
              <CardContent className="p-5">
                <Activity className="h-5 w-5 text-primary" />
                <p className="mt-4 font-bold">{title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </DashboardLayout>
  );
}

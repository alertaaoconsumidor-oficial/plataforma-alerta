import type { Metadata } from "next";
import {
  Activity,
  BarChart3,
  Building2,
  FileArchive,
  FileCheck2,
  Gauge,
  LockKeyhole,
  MessageSquareText,
  Scale,
  Shield,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Administração",
  description:
    "Dashboard administrativo para gestão de relatos, empresas, moderação e indicadores.",
};

const metrics = [
  { label: "Relatos pendentes", value: "24", trend: "+8 na semana", icon: FileCheck2 },
  { label: "Empresas monitoradas", value: "12", trend: "3 com alto volume", icon: Building2 },
  { label: "Direitos de resposta", value: "5", trend: "2 aguardando revisão", icon: MessageSquareText },
  { label: "Evidências privadas", value: "118", trend: "controle restrito", icon: LockKeyhole },
];

const queues = [
  {
    title: "Moderação de relatos",
    description: "Revisar linguagem, dados pessoais, duplicidade e aderência à metodologia.",
    icon: Shield,
    count: "18 itens",
  },
  {
    title: "Empresas e CNPJs",
    description: "Consolidar cadastros, vínculos societários, status público e direito de resposta.",
    icon: Building2,
    count: "7 itens",
  },
  {
    title: "Documentos privados",
    description: "Validar recebimento, classificar evidências e manter trilha de acesso.",
    icon: FileArchive,
    count: "31 itens",
  },
  {
    title: "Comunicações",
    description: "Acompanhar newsletters, avisos, contatos institucionais e respostas públicas.",
    icon: UsersRound,
    count: "9 itens",
  },
];

const governance = [
  "Permissões por perfil: administrador, moderador, jurídico e suporte.",
  "Log de auditoria para alterações em relatos, empresas, documentos e indicadores.",
  "Controle LGPD para dados privados, anonimização e prazos de retenção.",
  "Fila de revisão para publicações sensíveis e direito de resposta.",
  "Exportação de relatórios agregados sem exposição indevida de consumidores.",
];

const analytics = [
  { label: "Tendência de relatos", value: "Alta moderada" },
  { label: "Risco de exposição de dados", value: "Baixo após moderação" },
  { label: "Tempo médio de validação", value: "1,8 dia" },
  { label: "Casos com documentação", value: "62%" },
];

export default function AdminPage() {
  return (
    <main className="bg-background">
      <section className="border-b bg-card">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge className="mb-4">Painel estrutural</Badge>
              <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight md:text-5xl">
                <Gauge className="h-9 w-9 text-primary" />
                Dashboard administrativo
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
                Visão preparada para gestão de relatos, empresas, CNPJs,
                moderação, evidências privadas, governança e indicadores. Os
                dados abaixo são demonstrativos até a integração com banco.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button>Revisar fila</Button>
              <Button variant="outline">Exportar relatório</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto space-y-8 px-4 py-12 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((item) => {
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
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.trend}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card>
            <CardHeader>
              <CardTitle>Frentes de gestão</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {queues.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold">{item.title}</p>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">{item.count}</Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Inteligência operacional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analytics.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-lg bg-muted/50 p-3"
                >
                  <span className="text-sm text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Governança e compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {governance.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Próximas integrações
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground">
              <p>Autenticação de equipe e usuários.</p>
              <p>Banco de dados para relatos, empresas, CNPJs e anexos.</p>
              <p>Armazenamento privado de documentos com trilha de auditoria.</p>
              <p>Notificações por e-mail e painel para direito de resposta.</p>
              <p>Dashboard real com filtros por caso, UF, empresa e status.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

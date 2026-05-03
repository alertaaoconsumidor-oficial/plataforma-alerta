import { AlertTriangle, Building2, CalendarClock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { PublicCaseStats } from "../types/case-stats.types";
import { formatDateTime } from "./formatters";

const companyStatusLabels = {
  active: "Empresa ativa",
  inactive: "Empresa inativa",
  bankrupt: "Em recuperação/falência",
  unknown: "Status não confirmado",
};

export function CaseStatsHeader({ stats }: { stats: PublicCaseStats }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-black/10 bg-black text-white hover:bg-black">
                Painel demonstrativo
              </Badge>
              <Badge variant="outline" className="border-black/30 text-black">
                Dados agregados e anonimizados
              </Badge>
            </div>

            <div className="space-y-3">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-black/70">
                <Building2 className="h-4 w-4" />
                Estatísticas públicas
              </p>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">
                {stats.companyName}
              </h1>
              <p className="max-w-3xl text-lg text-black/75">
                Panorama visual com informações fictícias para validar a
                experiência pública da plataforma antes de receber dados reais.
              </p>
            </div>
          </div>

          <Card className="border-black/10 bg-white/90 text-foreground shadow-sm">
            <CardContent className="space-y-4 p-5">
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  CNPJ demonstrativo
                </p>
                <p className="font-mono text-lg font-semibold">
                  {stats.companyDocument}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Status
                </p>
                <p className="font-semibold">
                  {companyStatusLabels[stats.companyStatus]}
                </p>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <CalendarClock className="mt-0.5 h-4 w-4 text-primary" />
                <span>Atualizado em {formatDateTime(stats.lastUpdatedAt)}</span>
              </div>
              <div className="flex items-start gap-2 rounded-md bg-primary/10 p-3 text-sm">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  Estes dados são exemplos visuais e não representam relatos
                  reais de consumidores.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

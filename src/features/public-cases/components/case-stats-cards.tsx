import {
  Banknote,
  Clock,
  FileCheck2,
  FileText,
  MapPinned,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PublicCaseStats } from "../types/case-stats.types";
import { formatCurrency, formatNumber } from "./formatters";

const statItems = [
  {
    key: "totalReports",
    title: "Relatos agregados",
    icon: FileText,
    value: (stats: PublicCaseStats) => formatNumber(stats.totalReports),
    caption: "Registros fictícios para visualização",
  },
  {
    key: "totalConsumers",
    title: "Consumidores estimados",
    icon: Users,
    value: (stats: PublicCaseStats) => formatNumber(stats.totalConsumers),
    caption: "Sem identificação individual",
  },
  {
    key: "totalEstimatedLoss",
    title: "Valor total estimado",
    icon: Banknote,
    value: (stats: PublicCaseStats) =>
      formatCurrency(stats.totalEstimatedLoss),
    caption: "Soma demonstrativa por faixa",
  },
  {
    key: "affectedCities",
    title: "Cidades afetadas",
    icon: MapPinned,
    value: (stats: PublicCaseStats) => formatNumber(stats.affectedCities),
    caption: (stats: PublicCaseStats) =>
      `${formatNumber(stats.affectedStates)} estados no painel`,
  },
  {
    key: "averageDaysUnresolved",
    title: "Tempo médio sem solução",
    icon: Clock,
    value: (stats: PublicCaseStats) =>
      `${formatNumber(stats.averageDaysUnresolved)} dias`,
    caption: "Métrica agregada",
  },
  {
    key: "reportsWithDocuments",
    title: "Com documentação",
    icon: FileCheck2,
    value: (stats: PublicCaseStats) => formatNumber(stats.reportsWithDocuments),
    caption: "Apenas indicador agregado",
  },
];

export function CaseStatsCards({ stats }: { stats: PublicCaseStats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statItems.map((item) => {
        const Icon = item.icon;
        const caption =
          typeof item.caption === "function" ? item.caption(stats) : item.caption;

        return (
          <Card key={item.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value(stats)}</div>
              <p className="mt-1 text-xs text-muted-foreground">{caption}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

import { FileCheck2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PublicCaseStats } from "../types/case-stats.types";
import { formatNumber } from "./formatters";

export function CaseDocumentationStats({ stats }: { stats: PublicCaseStats }) {
  const percentage = Math.round(
    (stats.reportsWithDocuments / stats.totalReports) * 100
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck2 className="h-5 w-5 text-primary" />
          Documentação apresentada
        </CardTitle>
        <CardDescription>
          Indicador agregado. Nenhum arquivo é exibido publicamente.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-3xl font-bold">{percentage}%</div>
          <p className="text-sm text-muted-foreground">
            {formatNumber(stats.reportsWithDocuments)} de{" "}
            {formatNumber(stats.totalReports)} relatos demonstrativos indicam
            documentação privada.
          </p>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Em operação, documentos serão acessíveis apenas em área autenticada,
          com controle de permissão e registro de acesso.
        </p>
      </CardContent>
    </Card>
  );
}

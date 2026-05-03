import { ListChecks } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProblemTypeItem } from "../types/case-stats.types";
import { formatNumber } from "./formatters";

export function CaseProblemTypes({ data }: { data: ProblemTypeItem[] }) {
  const total = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-primary" />
          Tipos de relato
        </CardTitle>
        <CardDescription>
          Classificação demonstrativa por assunto informado.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((item) => {
          const percentage = Math.round((item.total / total) * 100);

          return (
            <div key={item.type} className="space-y-1.5">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium">{item.type}</span>
                <span className="text-muted-foreground">
                  {formatNumber(item.total)}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

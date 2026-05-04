import { Card, CardContent } from "@/components/ui/card";

import type { CaseMetric } from "../types";

export function CaseStatCardGrid({ metrics }: { metrics: CaseMetric[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">
              {metric.label}
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight">
              {metric.value}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {metric.helper}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

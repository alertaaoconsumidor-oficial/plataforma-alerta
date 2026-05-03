"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { StatusDistributionItem } from "../types/case-stats.types";

const chartConfig = {
  total: {
    label: "Relatos",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function CaseStatusChart({ data }: { data: StatusDistributionItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição por status</CardTitle>
        <CardDescription>
          Classificação demonstrativa dos relatos no fluxo interno.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="status"
              tickLine={false}
              axisLine={false}
              width={128}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="total" fill="var(--color-total)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

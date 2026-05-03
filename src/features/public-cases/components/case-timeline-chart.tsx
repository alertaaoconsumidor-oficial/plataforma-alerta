"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import type { MonthlyReportItem } from "../types/case-stats.types";

const chartConfig = {
  reports: {
    label: "Relatos",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function CaseTimelineChart({ data }: { data: MonthlyReportItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução mensal</CardTitle>
        <CardDescription>
          Volume demonstrativo de relatos agregados por mês.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={data} margin={{ left: -20, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="reports"
              fill="var(--color-reports)"
              fillOpacity={0.25}
              stroke="var(--color-reports)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

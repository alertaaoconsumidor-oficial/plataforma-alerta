"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"
import type { MonthlyReportData } from "@/lib/types"

const chartConfig = {
  count: {
    label: "Relatos",
    color: "hsl(var(--primary))",
  },
} satisfies import("recharts/types/chart/generateCategoricalChart").ChartProps;


export function MonthlyReportsChart({ data }: { data: MonthlyReportData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendência de Relatos</CardTitle>
        <CardDescription>Volume de relatos recebidos por mês.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
           <ChartContainer config={chartConfig} className="w-full h-full">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                    cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 2, strokeDasharray: '3 3' }}
                    content={<ChartTooltipContent />}
                />
                <Line
                    type="monotone"
                    dataKey="count"
                    name="Relatos"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "hsl(var(--primary))" }}
                    activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

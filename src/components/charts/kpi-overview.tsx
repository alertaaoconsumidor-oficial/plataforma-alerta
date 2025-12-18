"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metric } from "@/lib/types"
import { Clock, MessageCircle, FileText } from "lucide-react"
import { ChartContainer } from "@/components/ui/chart";

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ElementType;
}

function KpiCard({ title, value, unit, icon: Icon }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {unit && <p className="text-xs text-muted-foreground">{unit}</p>}
      </CardContent>
    </Card>
  )
}

const chartConfig = {
  value: {
    label: "Value",
  },
} satisfies import("recharts/types/chart/generateCategoricalChart").ChartProps;


export function KpiOverview({ metrics }: { metrics: Metric | undefined }) {
  const trpeData = [{ name: "TRPE", value: metrics?.trpe || 0 }];
  
  return (
    <Card className="col-span-1 md:col-span-2">
        <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                <KpiCard title="Total de Relatos" value={metrics?.totalReports || 0} icon={FileText} />
                <KpiCard title="Tempo Médio sem Resolução" value={metrics?.tmr || 0} unit="dias" icon={Clock} />
                <KpiCard title="Silêncio Documentado" value={metrics?.sd || 0} unit="casos" icon={MessageCircle} />
            </div>
             <div>
                <h3 className="text-md font-medium mb-2">Resolução Pós-Escalonamento (TRPE)</h3>
                <div className="h-[80px] w-full">
                <ChartContainer config={chartConfig} className="w-full h-full">
                    <BarChart data={trpeData} layout="vertical" margin={{ left: -10 }}>
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis type="category" dataKey="name" hide />
                        <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 4, 4]} background={{ fill: 'hsl(var(--muted))', radius: 4 }}>
                             {/* @ts-ignore */}
                            <labelList
                                dataKey="value"
                                position="insideRight"
                                offset={-8}
                                className="fill-primary-foreground font-bold"
                                formatter={(value: number) => `${value}%`}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

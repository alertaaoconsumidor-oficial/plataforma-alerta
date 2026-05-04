"use client"

import { Clock, FileText, MessageCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metric } from "@/lib/types"

interface KpiCardProps {
  title: string
  value: string | number
  unit?: string
  icon: React.ElementType
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
        {unit ? <p className="text-xs text-muted-foreground">{unit}</p> : null}
      </CardContent>
    </Card>
  )
}

function getTrpeColor(value: number) {
  if (value >= 70) {
    return "bg-emerald-600"
  }

  if (value >= 35) {
    return "bg-amber-500"
  }

  return "bg-red-600"
}

export function KpiOverview({ metrics }: { metrics: Metric | undefined }) {
  const trpe = metrics?.trpe || 0

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Visao Geral</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <KpiCard
            title="Total de Relatos"
            value={metrics?.totalReports || 0}
            icon={FileText}
          />
          <KpiCard
            title="Tempo Medio sem Resolucao"
            value={metrics?.tmr || 0}
            unit="dias"
            icon={Clock}
          />
          <KpiCard
            title="Silencio Documentado"
            value={metrics?.sd || 0}
            unit="casos"
            icon={MessageCircle}
          />
        </div>

        <div>
          <h3 className="mb-2 text-md font-medium">
            Resolucao Pos-Escalonamento (TRPE)
          </h3>
          <div className="rounded-md border bg-muted/60 p-3">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Resolvidos apos escalonamento
              </span>
              <span className="font-bold">{trpe}%</span>
            </div>
            <div className="h-5 overflow-hidden rounded-full bg-background">
              <div
                className={`flex h-full min-w-8 items-center justify-end rounded-full px-2 text-xs font-bold text-white ${getTrpeColor(trpe)}`}
                style={{ width: `${Math.max(trpe, 8)}%` }}
              >
                {trpe}%
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 text-xs text-muted-foreground">
              <span>Baixa</span>
              <span className="text-center">Media</span>
              <span className="text-right">Alta</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

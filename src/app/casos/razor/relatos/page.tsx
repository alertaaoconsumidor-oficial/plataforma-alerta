import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CaseReportsDirectory } from "@/features/public-cases/components/case-reports-directory";
import {
  razorPreliminaryStats,
  razorReportDirectory,
} from "@/features/public-cases/data/razor-preliminary-stats";

export const metadata: Metadata = {
  title: "Relatos do Caso Razor | Alerta ao Consumidor",
  description:
    "Listagem pública de relatos moderados do Caso Razor, com filtros, classificação e paginação para consulta responsável.",
};

export default function CasoRazorRelatosPage() {
  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden bg-[#0c0c0c] text-white">
        <Image
          src="/razor-bg.webp"
          alt="Imagem pública relacionada ao Caso Razor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-42"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/88 to-[#050505]/42" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />

        <div className="container relative mx-auto px-4 py-14 md:px-6 lg:py-16">
          <Button
            asChild
            variant="outline"
            className="mb-8 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            <Link href="/casos/razor">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Caso Razor
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <Badge className="mb-5 border-primary/40 bg-primary text-primary-foreground">
                Relatos moderados
              </Badge>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Consulta pública organizada
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl">
                Relatos do Caso Razor
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 md:text-lg">
                Área dedicada para consultar relatos aprovados, filtrar por
                relevância, cidade, faixa de prejuízo e tipo de problema, sem
                exposição de dados pessoais ou documentos privados.
              </p>
            </div>

            <Card className="border-white/12 bg-white/10 text-white backdrop-blur">
              <CardContent className="grid gap-4 p-5">
                <div className="flex items-start gap-3">
                  <FileText className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-3xl font-extrabold">
                      {razorPreliminaryStats.totalReports}
                    </p>
                    <p className="text-sm text-white/62">
                      relatos agregados na base preliminar
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-white/10 pt-4">
                  <ShieldCheck className="mt-1 h-5 w-5 text-primary" />
                  <p className="text-sm leading-6 text-white/66">
                    Exibição pública apenas com linguagem moderada, dados
                    pessoais suprimidos e informações agregadas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 md:px-6 md:py-12">
        <CaseReportsDirectory items={razorReportDirectory} />
      </section>
    </main>
  );
}

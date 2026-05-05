"use client";

import type { ElementType } from "react";
import { Calendar, Eye, FileText, ShieldCheck, User } from "lucide-react";

import { AnimatedNumber } from "@/features/public-cases/components/animated-number";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Report } from "@/lib/types";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return value;
  }

  return dateFormatter.format(new Date(year, month - 1, day));
}

export function PublicReportCard({
  report,
  views,
}: {
  report: Report;
  views: number;
}) {
  const author = report.isAnonymous ? "Anônimo" : report.publicNameInitials;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          role="button"
          tabIndex={0}
          className="group cursor-pointer shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <Badge variant="secondary">{report.amountRange}</Badge>
                <CardTitle className="mt-3 text-xl transition group-hover:text-primary">
                  {report.currentStatus}
                </CardTitle>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(report.createdAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <AnimatedNumber value={views} duration={1200} /> views
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-7 text-card-foreground/78">
              {report.narrative}
            </p>
            <p className="mt-4 inline-flex items-center text-sm font-bold text-primary">
              Ver relato completo
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100vh-4rem)] overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="border-b p-6 pr-12">
          <DialogTitle>Relato público moderado</DialogTitle>
          <DialogDescription>
            Detalhamento demonstrativo sem exposição de dados pessoais ou
            documentos privados.
          </DialogDescription>
        </DialogHeader>

        <div className="custom-scrollbar max-h-[calc(100vh-12rem)] overflow-y-auto p-6">
          <div className="flex flex-wrap gap-2">
            <Badge>{report.companyName}</Badge>
            <Badge variant="secondary">{report.amountRange}</Badge>
            <Badge variant="outline">{report.moderationStatus}</Badge>
          </div>

          <h3 className="mt-5 text-2xl font-bold">{report.currentStatus}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {report.narrative}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <InfoTile
              label="Autor público"
              value={author ?? "Não informado"}
              icon={User}
            />
            <InfoTile
              label="Data do relato"
              value={formatDate(report.createdAt)}
              icon={Calendar}
            />
            <InfoTile
              label="Data da compra"
              value={formatDate(report.purchaseDate)}
              icon={FileText}
            />
            <InfoTile
              label="Visualizações"
              value={`${new Intl.NumberFormat("pt-BR").format(views)} views`}
              icon={Eye}
            />
          </div>

          <div className="mt-6 rounded-lg border bg-primary/10 p-4">
            <p className="flex items-center gap-2 font-bold">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Observação da plataforma
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Este relato é exibido em linguagem pública e resumida. Evidências,
              comprovantes, conversas e documentos permanecem privados até
              validação e autorização de uso conforme a metodologia da
              plataforma.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoTile({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: ElementType;
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </p>
      <p className="mt-2 font-bold">{value}</p>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Download,
  ExternalLink,
  FileSearch,
  FileText,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { getCnpjAnchorId } from "../related-cnpjs-utils";
import type { RelatedCnpj } from "../types";

type RelatedCnpjsDirectoryProps = {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
  heroImageSrc: string;
  items: RelatedCnpj[];
};

export function RelatedCnpjsDirectory({
  title,
  description,
  backHref,
  backLabel,
  heroImageSrc,
  items,
}: RelatedCnpjsDirectoryProps) {
  const checkedItems = items.filter(
    (item) => item.lastCheckedAt && item.lastCheckedAt !== "Pendente"
  );
  const attachedDocuments = items.filter(
    (item) => item.federalDocumentStatus === "Disponivel"
  );

  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden bg-[#0c0c0c] text-white">
        <Image
          src={heroImageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-[#050505]/36" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />

        <div className="container relative mx-auto px-4 py-14 md:px-6 lg:py-16">
          <Button
            asChild
            variant="outline"
            className="mb-8 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            <Link href={backHref}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backLabel}
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <Badge className="mb-5 border-primary/40 bg-primary text-primary-foreground">
                Cadastro público contextualizado
              </Badge>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Consulta de CNPJs
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 md:text-lg">
                {description}
              </p>
            </div>

            <Card className="border-white/12 bg-white/10 text-white backdrop-blur">
              <CardContent className="grid gap-4 p-5">
                <HeroSummary
                  icon={Building2}
                  label="CNPJs listados"
                  value={items.length.toString()}
                />
                <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                  <MiniSummary label="Conferidos" value={checkedItems.length} />
                  <MiniSummary
                    label="PDF Receita"
                    value={attachedDocuments.length}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 md:px-6 md:py-12">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <InfoNotice
            icon={ShieldCheck}
            title="Leitura cautelosa"
            description="A existência de CNPJs relacionados não gera conclusão automática sobre responsabilidade."
          />
          <InfoNotice
            icon={FileSearch}
            title="Fonte pública"
            description="Cada ficha deve indicar origem, data de conferência e documento oficial quando anexado."
          />
          <InfoNotice
            icon={Users}
            title="Escala sustentável"
            description="O modal resume. Esta página concentra a leitura completa e os documentos."
          />
        </div>

        <div className="space-y-5">
          {items.map((item, index) => (
            <article
              key={item.cnpj}
              id={getCnpjAnchorId(item.cnpj)}
              className="scroll-mt-24 overflow-hidden rounded-xl border bg-card shadow-sm"
            >
              <div className="grid gap-5 border-b p-5 lg:grid-cols-[minmax(0,1fr)_360px]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-black">{item.tradeName}</h2>
                    {index === 0 ? (
                      <Badge className="bg-primary text-primary-foreground">
                        Principal
                      </Badge>
                    ) : null}
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.legalName}
                  </p>
                  <p className="mt-4 flex items-center gap-2 font-mono text-sm font-black">
                    <FileText className="h-4 w-4 text-primary" />
                    {item.cnpj}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <StatCard
                    icon={CalendarDays}
                    label="Abertura"
                    value={item.openedAt}
                  />
                  <StatCard
                    icon={CheckCircle2}
                    label="Conferência"
                    value={item.lastCheckedAt ?? "Pendente"}
                  />
                  <StatCard
                    icon={Download}
                    label="Documento"
                    value={
                      item.federalDocumentStatus === "Disponivel"
                        ? "Anexado"
                        : "Pendente"
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 p-5 md:grid-cols-2">
                <DetailBlock
                  title="Atividade principal"
                  description={item.mainActivity}
                />
                <DetailBlock
                  title="Endereço cadastral"
                  description={`${item.address} - ${item.city}/${item.state}`}
                  icon={MapPin}
                />
              </div>

              <div className="grid gap-4 px-5 pb-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="rounded-xl border p-4">
                  <p className="flex items-center gap-2 text-sm font-black">
                    <Users className="h-4 w-4 text-primary" />
                    Sócios ou administradores informados
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.partners.map((partner) => (
                      <Badge
                        key={partner}
                        variant="secondary"
                        className="border bg-background font-bold"
                      >
                        {partner}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border bg-muted/40 p-4">
                  <p className="text-sm font-black">Fonte e documento</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.sourceNote}
                  </p>
                  <div className="mt-4 grid gap-2">
                    {item.sourceUrl ? (
                      <Button asChild variant="outline">
                        <Link
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Consultar fonte
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    ) : null}
                    {item.federalDocumentUrl ? (
                      <Button asChild>
                        <Link href={item.federalDocumentUrl}>
                          <Download className="mr-2 h-4 w-4" />
                          Baixar PDF Receita
                        </Link>
                      </Button>
                    ) : (
                      <Button disabled variant="secondary">
                        <Download className="mr-2 h-4 w-4" />
                        PDF Receita pendente
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function HeroSummary({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-1 h-5 w-5 text-primary" />
      <div>
        <p className="text-3xl font-extrabold">{value}</p>
        <p className="text-sm text-white/62">{label}</p>
      </div>
    </div>
  );
}

function MiniSummary({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-2xl font-extrabold">{value}</p>
      <p className="text-xs text-white/58">{label}</p>
    </div>
  );
}

function InfoNotice({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mt-4 font-black">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-muted p-3">
      <Icon className="mb-2 h-4 w-4 text-primary" />
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-black">{value}</p>
    </div>
  );
}

function DetailBlock({
  title,
  description,
  icon: Icon = FileSearch,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="rounded-xl bg-muted p-4 text-sm">
      <p className="flex items-center gap-2 font-black">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </p>
      <p className="mt-2 leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusLower = status.toLowerCase();
  const active = statusLower === "ativa";
  const inactive = statusLower.includes("baixada");
  const warning =
    statusLower.includes("inativa") ||
    statusLower.includes("inapta") ||
    statusLower.includes("suspensa");

  return (
    <Badge
      variant="outline"
      className={cn(
        "shrink-0 font-bold",
        active && "border-emerald-500/45 bg-emerald-50 text-emerald-700",
        inactive && "border-zinc-400/45 bg-zinc-100 text-zinc-700",
        warning && "border-red-500/40 bg-red-50 text-red-700"
      )}
    >
      {status}
    </Badge>
  );
}

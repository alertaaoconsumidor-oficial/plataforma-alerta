import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  Download,
  ExternalLink,
  FileSearch,
  FileText,
  Landmark,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
          className="object-cover object-center opacity-[0.38]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/92 to-[#050505]/42" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />

        <div className="container relative mx-auto px-4 py-14 md:px-6 lg:py-16">
          <Button
            asChild
            variant="outline"
            className="mb-8 border-white/20 bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:text-white"
          >
            <Link href={backHref}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backLabel}
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            <div>
              <Badge className="mb-5 border-primary/40 bg-primary text-primary-foreground">
                Consulta cadastral contextualizada
              </Badge>
              <p className="text-sm font-bold uppercase text-primary">
                CNPJs relacionados
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-extrabold md:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/74 md:text-lg">
                {description}
              </p>
            </div>

            <div className="rounded-2xl border border-white/14 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-primary/55 hover:bg-white/14">
              <HeroSummary
                icon={Building2}
                label="CNPJs listados"
                value={items.length.toString()}
              />
              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
                <MiniSummary label="Conferidos" value={checkedItems.length} />
                <MiniSummary
                  label="PDF Receita"
                  value={attachedDocuments.length}
                />
              </div>
            </div>
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
            icon={Landmark}
            title="Padrão escalável"
            description="A página dedicada concentra a leitura completa sem sobrecarregar a página principal."
          />
        </div>

        <div className="mb-6 flex flex-col gap-3 border-y py-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-primary">
              Empresas vinculadas
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Fichas cadastrais em leitura pública
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            O objetivo é organizar CNPJs informados em relatos ou em conferência
            pública. Dados sensíveis e conclusões de responsabilidade não são
            exibidos nesta etapa.
          </p>
        </div>

        <div className="space-y-5">
          {items.map((item, index) => (
            <CnpjRecordCard
              key={item.cnpj}
              item={item}
              index={index}
              isPrimary={index === 0}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function CnpjRecordCard({
  item,
  index,
  isPrimary,
}: {
  item: RelatedCnpj;
  index: number;
  isPrimary: boolean;
}) {
  const documentStatus =
    item.federalDocumentStatus === "Disponivel" ? "Anexado" : "Pendente";

  return (
    <article
      id={getCnpjAnchorId(item.cnpj)}
      className={cn(
        "group scroll-mt-24 overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-500 ease-out animate-in fade-in-0 slide-in-from-bottom-4 hover:-translate-y-1 hover:border-primary/55 hover:shadow-2xl hover:shadow-primary/10",
        isPrimary && "border-primary/50 bg-primary/[0.045]"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="grid gap-5 p-5 md:p-6 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-black md:text-3xl">
              {item.tradeName}
            </h2>
            {isPrimary ? (
              <Badge className="bg-primary text-primary-foreground">
                Principal
              </Badge>
            ) : null}
            <StatusBadge status={item.status} />
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {item.legalName}
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 font-mono font-black">
              <FileText className="h-4 w-4 text-primary" />
              {item.cnpj}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              {item.city}/{item.state}
            </span>
          </div>
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
          <StatCard icon={Download} label="Documento" value={documentStatus} />
        </div>
      </div>

      <div className="border-t bg-muted/25 p-5 md:p-6">
        <div className="grid gap-4 lg:grid-cols-2">
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

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="rounded-xl border bg-background p-4 transition-all duration-500 group-hover:border-primary/35">
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

          <div className="rounded-xl border bg-background p-4 transition-all duration-500 group-hover:border-primary/35">
            <p className="flex items-center gap-2 text-sm font-black">
              <BadgeCheck className="h-4 w-4 text-primary" />
              Fonte e documento
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.sourceNote}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {item.sourceUrl ? (
                <Button asChild variant="outline" className="w-full">
                  <Link href={item.sourceUrl} target="_blank" rel="noreferrer">
                    Consultar fonte
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : null}
              {item.federalDocumentUrl ? (
                <Button asChild className="w-full">
                  <Link href={item.federalDocumentUrl}>
                    <Download className="mr-2 h-4 w-4" />
                    PDF Receita
                  </Link>
                </Button>
              ) : (
                <Button disabled variant="secondary" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  PDF pendente
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
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
        <p className="text-4xl font-extrabold">{value}</p>
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
    <div className="rounded-2xl border bg-card p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/10">
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
    <div className="rounded-xl border bg-background p-3 transition-all duration-500 group-hover:border-primary/35 group-hover:bg-primary/5">
      <Icon className="mb-2 h-4 w-4 text-primary" />
      <p className="text-[10px] font-bold uppercase text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-black">{value}</p>
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
    <div className="rounded-xl bg-background p-4 text-sm ring-1 ring-border/70 transition-all duration-500 hover:ring-primary/35">
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

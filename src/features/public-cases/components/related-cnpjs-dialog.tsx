"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Download,
  ExternalLink,
  FileSearch,
  FileText,
  MapPin,
  Search,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import type { RelatedCnpj } from "../types";

const hiddenScrollClass =
  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

export function RelatedCnpjsDialog({
  items,
  triggerClassName,
  triggerSize,
  triggerVariant = "outline",
}: {
  items: RelatedCnpj[];
  triggerClassName?: string;
  triggerSize?: ButtonProps["size"];
  triggerVariant?: ButtonProps["variant"];
}) {
  const [query, setQuery] = useState("");
  const [selectedCnpj, setSelectedCnpj] = useState(items[0]?.cnpj ?? "");

  const checkedItemsCount = useMemo(
    () =>
      items.filter((item) => item.lastCheckedAt && item.lastCheckedAt !== "Pendente")
        .length,
    [items]
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) => {
      const searchable = normalizeText(
        [
          item.cnpj,
          item.tradeName,
          item.legalName,
          item.status,
          item.city,
          item.state,
          item.mainActivity,
        ].join(" ")
      );

      return searchable.includes(normalizedQuery);
    });
  }, [items, query]);

  const selectedItem =
    filteredItems.find((item) => item.cnpj === selectedCnpj) ??
    filteredItems[0] ??
    items[0];

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open && items[0] && !selectedCnpj) {
          setSelectedCnpj(items[0].cnpj);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={triggerVariant}
          size={triggerSize}
          className={triggerClassName}
        >
          <Building2 className="mr-2 h-4 w-4" />
          Outros CNPJs relacionados
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 grid -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-2xl border bg-background p-0 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          style={{
            height: "min(90vh, 800px)",
            maxHeight: "calc(100vh - 2rem)",
            maxWidth: "calc(100vw - 2rem)",
            width: "min(1280px, calc(100vw - 2rem))",
          }}
        >
          <DialogHeader className="border-b bg-background px-5 py-4 pr-14">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="min-w-[220px]">
                  <DialogTitle className="text-sm font-black uppercase tracking-[0.2em]">
                    Consulta de CNPJs
                  </DialogTitle>
                  <DialogDescription className="mt-1 max-w-xl text-xs leading-5">
                    Leitura cadastral pública, conferência de fonte e documentos
                    oficiais sem presumir responsabilidade automática.
                  </DialogDescription>
                </div>

                <div className="relative w-full lg:max-w-[360px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                    }}
                    placeholder="Buscar CNPJ, empresa ou cidade"
                    className="h-10 border-input bg-muted/50 pl-9 text-sm focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pr-8">
                <SummaryPill
                  label="Registros"
                  tone="amber"
                  value={items.length.toString()}
                />
                <SummaryPill
                  label="Conferidos"
                  tone="green"
                  value={checkedItemsCount.toString()}
                />
              </div>
            </div>
          </DialogHeader>

          <div className="grid min-h-0 grid-rows-[minmax(190px,34%)_minmax(0,1fr)] bg-background md:grid-cols-[minmax(300px,30%)_minmax(0,1fr)] md:grid-rows-1">
            <aside className="min-h-0 border-b bg-muted/20 md:border-b-0 md:border-r">
              <div
                className={cn(
                  hiddenScrollClass,
                  "h-full overflow-y-auto p-3.5"
                )}
              >
                <div className="mb-3 flex items-center justify-between gap-2 px-1">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Empresas vinculadas
                  </p>
                  <span className="rounded-full bg-primary/15 px-2 py-1 text-[11px] font-bold text-primary">
                    {filteredItems.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => {
                      const isSelected = selectedItem?.cnpj === item.cnpj;

                      return (
                        <button
                          key={item.cnpj}
                          type="button"
                          onClick={() => setSelectedCnpj(item.cnpj)}
                          className={cn(
                            "w-full rounded-xl border bg-card p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/5 hover:shadow-md",
                            isSelected &&
                              "border-primary bg-primary/10 shadow-md ring-1 ring-primary/20"
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="truncate text-sm font-black">
                                  {item.tradeName}
                                </p>
                                {index === 0 && !query ? (
                                  <Badge className="bg-primary text-primary-foreground">
                                    Principal
                                  </Badge>
                                ) : null}
                              </div>
                              <p className="mt-1 truncate text-xs text-muted-foreground">
                                {item.legalName}
                              </p>
                            </div>
                            <StatusBadge status={item.status} />
                          </div>

                          <div className="mt-3 grid gap-2 border-t pt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5 font-mono font-semibold text-foreground">
                              <FileText className="h-3.5 w-3.5 text-primary" />
                              {item.cnpj}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-primary" />
                              {item.city}/{item.state}
                            </span>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
                      Nenhum CNPJ encontrado para o filtro informado.
                    </div>
                  )}
                </div>
              </div>
            </aside>

            <section className="min-h-0 min-w-0 bg-background">
              {selectedItem ? (
                <div
                  className={cn(
                    hiddenScrollClass,
                    "h-full overflow-y-auto p-5 md:p-6"
                  )}
                >
                  <div className="mb-4 rounded-xl border border-primary/35 bg-primary/10 px-4 py-3">
                    <p className="flex items-center gap-2 text-sm font-black">
                      <FileSearch className="h-4 w-4 text-primary" />
                      Padrão de leitura cadastral
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Dados públicos estruturados para consulta contextual. Em
                      produção, cada CNPJ terá fonte, conferência, PDF oficial e
                      histórico de atualização.
                    </p>
                  </div>

                  <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                    <div className="grid gap-5 border-b p-5 xl:grid-cols-[minmax(0,1fr)_360px]">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-2xl font-black leading-tight md:text-3xl">
                            {selectedItem.tradeName}
                          </h3>
                          <StatusBadge status={selectedItem.status} />
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {selectedItem.legalName}
                        </p>
                        <p className="mt-4 font-mono text-sm font-black">
                          CNPJ: {selectedItem.cnpj}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <StatCard
                          icon={CalendarDays}
                          label="Abertura"
                          value={selectedItem.openedAt}
                        />
                        <StatCard
                          icon={CheckCircle2}
                          label="Conferência"
                          value={selectedItem.lastCheckedAt ?? "Pendente"}
                        />
                        <StatCard
                          icon={ShieldCheck}
                          label="Documento"
                          value={
                            selectedItem.federalDocumentStatus === "Disponivel"
                              ? "Anexado"
                              : "Pendente"
                          }
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 p-5 md:grid-cols-2">
                      <InfoBlock
                        title="Atividade principal"
                        value={selectedItem.mainActivity}
                      />
                      <InfoBlock
                        title="Endereço cadastral"
                        value={`${selectedItem.address} - ${selectedItem.city}/${selectedItem.state}`}
                      />
                    </div>

                    <div className="px-5 pb-5">
                      <div className="rounded-xl border p-4">
                        <p className="flex items-center gap-2 text-sm font-black">
                          <Users className="h-4 w-4 text-primary" />
                          Sócios ou administradores informados
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {selectedItem.partners.map((partner) => (
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
                    </div>

                    <div className="border-t bg-muted/30 p-5">
                      <p className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {selectedItem.sourceNote}
                      </p>

                      <div className="mt-4 flex flex-col gap-4 border-t pt-4 md:flex-row md:items-center md:justify-between">
                        <div className="text-sm">
                          <p className="font-black">
                            Fonte prevista:{" "}
                            {selectedItem.sourceName ?? "Receita Federal"}
                          </p>
                          <p className="mt-1 text-muted-foreground">
                            Documento oficial:{" "}
                            {selectedItem.federalDocumentStatus === "Disponivel"
                              ? "disponível"
                              : "pendente de anexação"}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          {selectedItem.sourceUrl ? (
                            <Button
                              asChild
                              variant="outline"
                              className="w-full shadow-primary/10 transition-all hover:-translate-y-0.5 sm:min-w-[180px]"
                            >
                              <Link
                                href={selectedItem.sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Consultar fonte
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          ) : null}
                          {selectedItem.federalDocumentUrl ? (
                            <Button
                              asChild
                              className="w-full shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 sm:min-w-[180px]"
                            >
                              <Link href={selectedItem.federalDocumentUrl}>
                                <Download className="mr-2 h-4 w-4" />
                                Baixar PDF Receita
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              disabled
                              variant="secondary"
                              className="w-full sm:min-w-[180px]"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              PDF Receita pendente
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>

                  <div className="mt-4 flex items-start gap-3 rounded-xl border bg-background p-4 text-sm leading-6 text-muted-foreground">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_0_4px_rgba(255,194,0,0.16)] animate-pulse" />
                    <p>
                      Sincronização ativa para o padrão cadastral. Este modelo
                      será reutilizado em todas as páginas com CNPJs relacionados.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-sm text-muted-foreground">
                  Nenhum CNPJ disponível.
                </div>
              )}
            </section>
          </div>

          <DialogClose className="absolute right-4 top-4 rounded-full p-1 opacity-70 ring-offset-background transition-all hover:bg-muted hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </DialogClose>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

function SummaryPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "amber" | "green";
}) {
  return (
    <div
      className={cn(
        "min-w-[78px] rounded-xl border px-3 py-2",
        tone === "amber" && "border-primary/30 bg-primary/10",
        tone === "green" && "border-emerald-500/25 bg-emerald-50"
      )}
    >
      <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
      <p className="text-base font-black">{value}</p>
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

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
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

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted p-4 text-sm">
      <p className="font-black">{title}</p>
      <p className="mt-2 leading-6 text-muted-foreground">{value}</p>
    </div>
  );
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

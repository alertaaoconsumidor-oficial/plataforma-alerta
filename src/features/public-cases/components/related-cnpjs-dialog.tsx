"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileText,
  MapPin,
  Search,
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

import { getCnpjAnchorId } from "../related-cnpjs-utils";
import type { RelatedCnpj } from "../types";

export function RelatedCnpjsDialog({
  items,
  detailsHref,
  ownerLabel = "esta página",
  triggerClassName,
  triggerSize,
  triggerVariant = "outline",
}: {
  items: RelatedCnpj[];
  detailsHref: string;
  ownerLabel?: string;
  triggerClassName?: string;
  triggerSize?: ButtonProps["size"];
  triggerVariant?: ButtonProps["variant"];
}) {
  const [query, setQuery] = useState("");

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
        ].join(" ")
      );

      return searchable.includes(normalizedQuery);
    });
  }, [items, query]);

  const checkedItems = items.filter(
    (item) => item.lastCheckedAt && item.lastCheckedAt !== "Pendente"
  );
  const visibleItems = filteredItems.slice(0, 8);

  return (
    <Dialog>
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
          className="fixed left-1/2 top-1/2 z-50 grid max-h-[calc(100vh-2rem)] -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-2xl border bg-background p-0 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          style={{
            width: "min(920px, calc(100vw - 2rem))",
          }}
        >
          <DialogHeader className="border-b bg-background px-5 py-4 pr-12">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
              <div>
                <DialogTitle className="text-xl font-black">
                  CNPJs relacionados
                </DialogTitle>
                <DialogDescription className="mt-2 max-w-2xl text-sm leading-6">
                  Resumo objetivo dos CNPJs informados ou relacionados a{" "}
                  {ownerLabel}. A ficha completa fica em página própria.
                </DialogDescription>
              </div>

              <div className="flex gap-2">
                <SummaryPill label="Registros" value={items.length} />
                <SummaryPill label="Conferidos" value={checkedItems.length} />
              </div>
            </div>

            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                placeholder="Buscar por CNPJ, nome, cidade ou situação"
                className="h-11 bg-muted/45 pl-9 focus-visible:ring-primary"
              />
            </div>
          </DialogHeader>

          <div className="min-h-0 overflow-y-auto px-5 py-4">
            <div className="space-y-3">
              {visibleItems.length > 0 ? (
                visibleItems.map((item, index) => (
                  <article
                    key={item.cnpj}
                    className={cn(
                      "rounded-xl border bg-card p-4 transition hover:border-primary/50 hover:bg-primary/5",
                      index === 0 &&
                        !query &&
                        "border-primary/60 bg-primary/10 ring-1 ring-primary/20"
                    )}
                  >
                    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-base font-black">
                            {item.tradeName}
                          </h3>
                          {index === 0 && !query ? (
                            <Badge className="bg-primary text-primary-foreground">
                              Principal
                            </Badge>
                          ) : null}
                          <StatusBadge status={item.status} />
                        </div>
                        <p className="mt-1 truncate text-sm text-muted-foreground">
                          {item.legalName}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                          <span className="flex items-center gap-1.5 font-mono font-bold">
                            <FileText className="h-4 w-4 text-primary" />
                            {item.cnpj}
                          </span>
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            {item.city}/{item.state}
                          </span>
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Conferência: {item.lastCheckedAt ?? "Pendente"}
                          </span>
                        </div>
                      </div>

                      <Button
                        asChild
                        variant="outline"
                        className="shrink-0 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Link href={`${detailsHref}#${getCnpjAnchorId(item.cnpj)}`}>
                          Ver ficha
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-xl border bg-card p-5 text-sm text-muted-foreground">
                  Nenhum CNPJ encontrado para o filtro informado.
                </div>
              )}
            </div>

            {filteredItems.length > visibleItems.length ? (
              <p className="mt-4 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
                Mostrando {visibleItems.length} de {filteredItems.length}{" "}
                registros. Abra a página completa para ver todos com mais
                filtros.
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 border-t bg-muted/35 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-6 text-muted-foreground">
              A relação entre CNPJs é informativa e depende de conferência de
              fonte pública antes de qualquer conclusão.
            </p>
            <Button asChild className="shrink-0">
              <Link href={detailsHref}>
                Abrir página completa
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
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

function SummaryPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-[82px] rounded-xl border bg-primary/10 px-3 py-2">
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

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

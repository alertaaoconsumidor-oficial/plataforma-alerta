"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Download,
  ExternalLink,
  FileSearch,
  Search,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import type { RelatedCnpj } from "../types";

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
          className="fixed left-1/2 top-1/2 z-50 grid -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-xl border bg-background p-0 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          style={{
            height: "calc(100vh - 2rem)",
            maxHeight: "calc(100vh - 2rem)",
            maxWidth: "calc(100vw - 2rem)",
            width: "min(1180px, calc(100vw - 2rem))",
          }}
        >
        <DialogHeader className="shrink-0 border-b bg-background p-5 pr-12 md:p-6 md:pr-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <DialogTitle>CNPJs relacionados</DialogTitle>
              <DialogDescription className="mt-2">
                Painel público para leitura cadastral com origem, status de
                conferência e documento oficial quando anexado. Relação entre
                CNPJs não implica responsabilidade automática.
              </DialogDescription>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm md:min-w-[240px]">
              <SummaryPill label="Registros" value={items.length.toString()} />
              <SummaryPill
                label="Conferidos"
                value={items
                  .filter((item) => item.lastCheckedAt && item.lastCheckedAt !== "Pendente")
                  .length.toString()}
              />
            </div>
          </div>
        </DialogHeader>

        <div className="grid min-h-0 bg-muted/35 md:grid-cols-[330px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="flex min-h-0 flex-col border-b bg-background md:border-b-0 md:border-r">
            <div className="shrink-0 border-b p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                  placeholder="Buscar por nome, CNPJ, cidade ou status"
                  className="pl-9"
                />
              </div>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Selecione um CNPJ para abrir a ficha detalhada ao lado.
              </p>
            </div>

            <ScrollArea className="h-[260px] md:h-auto md:min-h-0 md:flex-1">
              <div className="space-y-2 p-3">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <button
                      key={item.cnpj}
                      type="button"
                      onClick={() => setSelectedCnpj(item.cnpj)}
                      className={cn(
                        "w-full rounded-lg border bg-card p-3 text-left shadow-sm transition hover:border-primary/60 hover:bg-primary/5",
                        selectedItem?.cnpj === item.cnpj &&
                          "border-primary bg-primary/10"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate font-bold">{item.tradeName}</p>
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
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-mono font-semibold">{item.cnpj}</span>
                        <span className="text-muted-foreground">
                          {item.city}/{item.state}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Conferência: {item.lastCheckedAt ?? "Pendente"}
                      </p>
                    </button>
                  ))
                ) : (
                  <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
                    Nenhum CNPJ encontrado para o filtro informado.
                  </div>
                )}
              </div>
            </ScrollArea>
          </aside>

          <section className="min-h-0 min-w-0">
            {selectedItem ? (
              <ScrollArea className="h-[520px] md:h-full">
                <div className="p-4 md:p-6">
                  <div className="mb-5 rounded-lg border border-primary/30 bg-primary/10 p-4">
                    <p className="flex items-center gap-2 text-sm font-bold">
                      <FileSearch className="h-4 w-4 text-primary" />
                      Padrão de leitura cadastral
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      A ficha exibe apenas dados públicos estruturados. Em
                      produção, cada CNPJ deve ter data de conferência, fonte,
                      documento oficial anexado e histórico de atualização.
                    </p>
                  </div>

                  <div className="rounded-lg border bg-card shadow-sm">
                    <div className="border-b p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-2xl font-bold">
                              {selectedItem.tradeName}
                            </h3>
                            <StatusBadge status={selectedItem.status} />
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {selectedItem.legalName}
                          </p>
                          <p className="mt-3 font-mono text-base font-bold">
                            CNPJ: {selectedItem.cnpj}
                          </p>
                        </div>

                        <div className="grid gap-2 rounded-lg bg-muted p-3 text-sm md:min-w-[230px]">
                          <DetailRow label="Abertura" value={selectedItem.openedAt} />
                          <DetailRow
                            label="Conferência"
                            value={selectedItem.lastCheckedAt ?? "Pendente"}
                          />
                          <DetailRow
                            label="Documento"
                            value={
                              selectedItem.federalDocumentStatus === "Disponivel"
                                ? "Anexado"
                                : "Pendente"
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 p-5 md:grid-cols-2">
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
                      <div className="rounded-lg border p-4">
                        <p className="flex items-center gap-2 text-sm font-semibold">
                          <Users className="h-4 w-4 text-primary" />
                          Sócios ou administradores informados
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {selectedItem.partners.map((partner) => (
                            <Badge key={partner} variant="secondary">
                              {partner}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t bg-muted/45 p-5">
                      <p className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {selectedItem.sourceNote}
                      </p>

                      <Separator className="my-4" />

                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="text-sm">
                          <p className="font-semibold">
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
                            <Button asChild variant="outline">
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
                            <Button asChild>
                              <Link href={selectedItem.federalDocumentUrl}>
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
                  </div>

                  <div className="mt-4 rounded-lg border bg-background p-4 text-sm leading-6 text-muted-foreground">
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p>
                        Este padrão será usado em todas as páginas que
                        consultarem CNPJs relacionados, mantendo consistência de
                        leitura e facilitando conferência futura no painel
                        administrativo.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="p-6 text-sm text-muted-foreground">
                Nenhum CNPJ disponível.
              </div>
            )}
          </section>
        </div>

          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </DialogClose>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

function SummaryPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusLower = status.toLowerCase();
  const active = statusLower === "ativa";
  const warning =
    statusLower.includes("inativa") ||
    statusLower.includes("inapta") ||
    statusLower.includes("baixada") ||
    statusLower.includes("suspensa");

  return (
    <Badge
      variant="outline"
      className={cn(
        "shrink-0",
        active && "border-emerald-500/50 bg-emerald-500/10 text-emerald-700",
        warning && "border-amber-500/60 bg-amber-500/10 text-amber-700"
      )}
    >
      {status}
    </Badge>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted p-4 text-sm">
      <p className="font-semibold">{title}</p>
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

"use client";

import { Building2, Download, ExternalLink, FileSearch, Users } from "lucide-react";
import Link from "next/link";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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
      <DialogContent className="flex max-h-[calc(100vh-3rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-5xl">
        <DialogHeader className="shrink-0 border-b p-6 pb-4 pr-12">
          <DialogTitle>CNPJs relacionados ao caso</DialogTitle>
          <DialogDescription>
            Informações cadastrais públicas em formato demonstrativo. Na versão
            operacional, cada ficha será conferida em fonte oficial, vinculada
            ao documento gerado na Receita Federal e contextualizada com
            linguagem cautelosa.
          </DialogDescription>
        </DialogHeader>

        <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto p-6">
          <div className="mb-5 rounded-lg border border-primary/30 bg-primary/10 p-4">
            <p className="flex items-center gap-2 text-sm font-bold">
              <FileSearch className="h-4 w-4 text-primary" />
              Arquitetura prevista para alimentação cadastral
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Os dados entram por um registro estruturado do CNPJ, com data de
              conferência, fonte pública, documento oficial anexado e histórico
              de alterações. Ao integrar o banco de dados, o painel poderá
              diferenciar informação conferida, pendente e substituída.
            </p>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.cnpj}
              className="rounded-lg border bg-card p-4 shadow-sm transition hover:border-primary/60 hover:shadow-md"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold">{item.tradeName}</h3>
                    <Badge variant="outline">{item.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.legalName}
                  </p>
                  <p className="mt-2 text-sm font-medium">CNPJ: {item.cnpj}</p>
                </div>
                <div className="text-sm text-muted-foreground sm:text-right">
                  <p>Abertura: {item.openedAt}</p>
                  {item.lastCheckedAt ? (
                    <p>Conferência: {item.lastCheckedAt}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-md bg-muted p-3 text-sm">
                  <p className="font-semibold">Atividade principal</p>
                  <p className="mt-1 text-muted-foreground">
                    {item.mainActivity}
                  </p>
                </div>
                <div className="rounded-md bg-muted p-3 text-sm">
                  <p className="font-semibold">Endereço cadastral</p>
                  <p className="mt-1 text-muted-foreground">
                    {item.address} - {item.city}/{item.state}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-md border p-3">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Users className="h-4 w-4 text-primary" />
                  Sócios ou administradores informados
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.partners.map((partner) => (
                    <Badge key={partner} variant="secondary">
                      {partner}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                <ExternalLink className="mt-0.5 h-3.5 w-3.5" />
                {item.sourceNote}
              </p>

              <div className="mt-4 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-muted-foreground">
                  <p className="font-semibold text-foreground">
                    Fonte prevista: {item.sourceName ?? "Receita Federal"}
                  </p>
                  <p>
                    Documento oficial:{" "}
                    {item.federalDocumentStatus === "Disponivel"
                      ? "disponível"
                      : "pendente de anexação"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.sourceUrl ? (
                    <Button asChild size="sm" variant="outline">
                      <Link href={item.sourceUrl} target="_blank" rel="noreferrer">
                        Consultar fonte
                        <ExternalLink className="ml-2 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  ) : null}
                  <Button
                    asChild={Boolean(item.federalDocumentUrl)}
                    size="sm"
                    variant="secondary"
                    disabled={!item.federalDocumentUrl}
                    title={
                      item.federalDocumentUrl
                        ? "Baixar comprovante da Receita Federal"
                        : "Documento será anexado após conferência oficial"
                    }
                  >
                    {item.federalDocumentUrl ? (
                      <Link href={item.federalDocumentUrl}>
                        <Download className="mr-2 h-3.5 w-3.5" />
                        Baixar ficha
                      </Link>
                    ) : (
                      <>
                        <Download className="mr-2 h-3.5 w-3.5" />
                        PDF Receita
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

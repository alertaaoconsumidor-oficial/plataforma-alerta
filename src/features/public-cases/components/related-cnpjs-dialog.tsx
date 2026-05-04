"use client";

import { Building2, ExternalLink, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
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

export function RelatedCnpjsDialog({ items }: { items: RelatedCnpj[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Building2 className="mr-2 h-4 w-4" />
          Outros CNPJs relacionados
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[52%] flex max-h-[88vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="border-b p-6 pb-4">
          <DialogTitle>CNPJs relacionados ao caso</DialogTitle>
          <DialogDescription>
            Informacoes cadastrais publicas em formato demonstrativo para teste
            de interface. Antes de publicacao definitiva, cada registro deve ser
            conferido em fonte oficial e contextualizado com linguagem cautelosa.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 overflow-y-auto p-6">
          {items.map((item) => (
            <div key={item.cnpj} className="rounded-lg border p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
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
                <p className="text-sm text-muted-foreground">
                  Abertura: {item.openedAt}
                </p>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-md bg-muted p-3 text-sm">
                  <p className="font-semibold">Atividade principal</p>
                  <p className="mt-1 text-muted-foreground">
                    {item.mainActivity}
                  </p>
                </div>
                <div className="rounded-md bg-muted p-3 text-sm">
                  <p className="font-semibold">Endereco cadastral</p>
                  <p className="mt-1 text-muted-foreground">
                    {item.address} - {item.city}/{item.state}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-md border p-3">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Users className="h-4 w-4 text-primary" />
                  Socios ou administradores informados
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
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

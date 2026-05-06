"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import {
  CheckCircle2,
  FileArchive,
  FileText,
  FolderCheck,
  LockKeyhole,
  Trash2,
  UploadCloud,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UploadPanelProps = {
  title: string;
  description: string;
  initialFiles: FileSummary[];
  variant?: "admin" | "user";
};

type FileSummary = {
  name: string;
  type: string;
  size: string;
  status: string;
  category?: string;
  linkedTo?: string;
  visibility?: string;
};

const defaultCategories = [
  "Comprovante de pagamento",
  "Conversa ou protocolo",
  "Contrato ou proposta",
  "Nota fiscal",
  "Documento institucional",
];

export function UploadPanel({
  title,
  description,
  initialFiles,
  variant = "user",
}: UploadPanelProps) {
  const [files, setFiles] = useState<FileSummary[]>(initialFiles);
  const isAdmin = variant === "admin";

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    const nextFiles = selectedFiles.map((file) => ({
      name: file.name,
      type: file.type || "Arquivo",
      size: formatBytes(file.size),
      status: "Aguardando classificação",
      category: "A classificar",
      linkedTo: isAdmin ? "Fila administrativa" : "Relato não vinculado",
      visibility: "Privado",
    }));

    setFiles((current) => [...nextFiles, ...current]);
    event.target.value = "";
  }

  function removeFile(fileName: string) {
    setFiles((current) => current.filter((file) => file.name !== fileName));
  }

  return (
    <Card className="overflow-hidden border bg-white shadow-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <UploadCloud className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardHeader>
      <CardContent className="space-y-5 p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-primary/60 bg-primary/5 px-4 py-8 text-center transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/10">
            <UploadCloud className="h-10 w-10 text-primary transition-transform duration-300 group-hover:-translate-y-1" />
            <span className="mt-3 font-bold">Selecionar arquivos</span>
            <span className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">
              PDF, imagens, comprovantes, contratos, conversas exportadas e
              registros de protocolo.
            </span>
            <Input
              type="file"
              multiple
              className="sr-only"
              onChange={handleFiles}
            />
          </label>

          <div className="rounded-2xl border bg-[#111111] p-4 text-white">
            <p className="flex items-center gap-2 font-bold">
              <LockKeyhole className="h-4 w-4 text-primary" />
              Classificação privada
            </p>
            <div className="mt-4 space-y-3">
              <div className="space-y-2">
                <Label className="text-white/75">Categoria padrão</Label>
                <Select defaultValue="comprovante">
                  <SelectTrigger className="border-white/15 bg-white/10 text-white">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {defaultCategories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.08] p-3 text-xs leading-5 text-white/65">
                Arquivos não são publicados automaticamente. Eles ficam
                vinculados ao relato ou à fila administrativa até validação.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={`${file.name}-${file.size}`}
              className="grid gap-3 rounded-2xl border bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/10 lg:grid-cols-[1fr_170px_150px_auto]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                  <FileArchive className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.type} • {file.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FolderCheck className="h-4 w-4 text-primary" />
                <span>{file.category ?? "A classificar"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{file.status}</Badge>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Abrir
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Remover ${file.name}`}
                  onClick={() => removeFile(file.name)}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-bold">Lote preparado para persistência</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                A próxima etapa técnica é conectar este painel a storage
                privado, metadados de classificação e trilha de auditoria.
              </p>
            </div>
          </div>
          <Button variant="outline" className="bg-white">
            Salvar lote privado
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function formatBytes(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  const kb = size / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  return `${(kb / 1024).toFixed(1)} MB`;
}

export type { FileSummary };

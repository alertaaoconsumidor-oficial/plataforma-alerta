"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { FileArchive, UploadCloud } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type UploadPanelProps = {
  title: string;
  description: string;
  initialFiles: FileSummary[];
};

type FileSummary = {
  name: string;
  type: string;
  size: string;
  status: string;
};

export function UploadPanel({
  title,
  description,
  initialFiles,
}: UploadPanelProps) {
  const [files, setFiles] = useState<FileSummary[]>(initialFiles);

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    const nextFiles = selectedFiles.map((file) => ({
      name: file.name,
      type: file.type || "Arquivo",
      size: formatBytes(file.size),
      status: "Aguardando classificação",
    }));

    setFiles((current) => [...nextFiles, ...current]);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UploadCloud className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/50 bg-primary/5 px-4 py-8 text-center transition hover:bg-primary/10">
          <UploadCloud className="h-9 w-9 text-primary" />
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

        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={`${file.name}-${file.size}`}
              className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <FileArchive className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.type} • {file.size}
                  </p>
                </div>
              </div>
              <Badge variant="secondary">{file.status}</Badge>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full">
          Salvar lote na área privada
        </Button>
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

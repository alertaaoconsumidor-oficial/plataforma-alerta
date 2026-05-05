"use client";

import { useMemo, useState } from "react";
import {
  Calendar,
  Eye,
  FileText,
  Filter,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AnimatedProgressBar } from "@/features/public-cases/components/animated-progress-bar";
import type { CompanyReportDirectoryItem } from "../data/company-public-data";

type SortMode = "relevancia" | "recentes" | "prejuizo" | "views" | "documentacao";

const allValue = "todos";
const pageSize = 6;

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("pt-BR");

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function formatDate(value: string) {
  const [date] = value.split("T");
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day) {
    return value;
  }

  return dateFormatter.format(new Date(year, month - 1, day));
}

export function CompanyReportsDirectory({
  companyName,
  items,
}: {
  companyName: string;
  items: CompanyReportDirectoryItem[];
}) {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState(allValue);
  const [problemFilter, setProblemFilter] = useState(allValue);
  const [sortMode, setSortMode] = useState<SortMode>("relevancia");
  const [page, setPage] = useState(1);

  const states = useMemo(
    () => Array.from(new Set(items.map((item) => item.state))).sort(),
    [items]
  );
  const problemTypes = useMemo(
    () => Array.from(new Set(items.map((item) => item.problemType))).sort(),
    [items]
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = items.filter((item) => {
      const searchable = [
        item.currentStatus,
        item.summary,
        item.narrative,
        item.city,
        item.state,
        item.problemType,
        item.amountRange,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesState =
        stateFilter === allValue || item.state === stateFilter;
      const matchesProblem =
        problemFilter === allValue || item.problemType === problemFilter;

      return matchesQuery && matchesState && matchesProblem;
    });

    return filtered.sort((a, b) => {
      if (sortMode === "recentes") {
        return b.createdAt.localeCompare(a.createdAt);
      }

      if (sortMode === "prejuizo") {
        return b.lossValue - a.lossValue;
      }

      if (sortMode === "views") {
        return b.views - a.views;
      }

      if (sortMode === "documentacao") {
        return b.documentationScore - a.documentationScore;
      }

      return b.relevanceScore - a.relevanceScore;
    });
  }, [items, problemFilter, query, sortMode, stateFilter]);

  const pageCount = Math.max(Math.ceil(filteredItems.length / pageSize), 1);
  const currentPage = Math.min(page, pageCount);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function resetFilters() {
    setQuery("");
    setStateFilter(allValue);
    setProblemFilter(allValue);
    setSortMode("relevancia");
    setPage(1);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <main className="space-y-5">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Filter className="h-5 w-5 text-primary" />
              Filtros dos relatos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                className="pl-9"
                placeholder={`Buscar relatos sobre ${companyName}`}
              />
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <Select
                value={stateFilter}
                onValueChange={(value) => {
                  setStateFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={allValue}>Todos os estados</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={problemFilter}
                onValueChange={(value) => {
                  setProblemFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Problema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={allValue}>Todos os problemas</SelectItem>
                  {problemTypes.map((problem) => (
                    <SelectItem key={problem} value={problem}>
                      {problem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={sortMode}
                onValueChange={(value) => {
                  setSortMode(value as SortMode);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Ordenação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevancia">Mais relevantes</SelectItem>
                  <SelectItem value="recentes">Mais recentes</SelectItem>
                  <SelectItem value="prejuizo">Maior prejuízo</SelectItem>
                  <SelectItem value="views">Mais visualizados</SelectItem>
                  <SelectItem value="documentacao">
                    Melhor documentados
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-3 border-t pt-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
              <p>
                {filteredItems.length} relatos encontrados. Exibindo{" "}
                {paginatedItems.length} nesta página.
              </p>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Limpar filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {paginatedItems.length > 0 ? (
          paginatedItems.map((item, index) => (
            <ReportCard key={item.id} item={item} delayMs={index * 300} />
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              Nenhum relato público encontrado com os filtros atuais.
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Página {currentPage} de {pageCount}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.min(currentPage + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              Próxima
            </Button>
          </div>
        </div>
      </main>

      <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
        <Card className="border-primary/35 bg-primary/10 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              Leitura responsável
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>
              A listagem exibe apenas relatos moderados, com dados pessoais e
              documentos privados removidos da camada pública.
            </p>
            <Separator />
            <p>
              Em produção, esta área deve buscar dados paginados no banco, com
              filtros por URL e índices por empresa, data, UF, status e tipo de
              problema.
            </p>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

function ReportCard({
  item,
  delayMs,
}: {
  item: CompanyReportDirectoryItem;
  delayMs: number;
}) {
  const author = item.isAnonymous ? "Anônimo" : item.publicNameInitials;

  return (
    <Card className="group shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg">
      <CardContent className="p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>{item.amountRange}</Badge>
              <Badge variant="secondary">{item.problemType}</Badge>
              <Badge variant="outline">{item.moderationStatus}</Badge>
            </div>
            <h3 className="mt-3 text-xl font-bold transition group-hover:text-primary">
              {item.currentStatus}
            </h3>
            <p className="mt-3 text-sm leading-7 text-card-foreground/78">
              {item.summary}
            </p>
          </div>

          <div className="grid min-w-[220px] gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(item.createdAt)}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {item.city}/{item.state}
            </span>
            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {numberFormatter.format(item.views)} views
            </span>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_180px] md:items-end">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium">Qualidade documental</span>
              <span className="text-muted-foreground">
                {item.documentationScore}%
              </span>
            </div>
            <AnimatedProgressBar
              percent={item.documentationScore}
              delayMs={delayMs}
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Ver relato completo</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[calc(100vh-4rem)] overflow-hidden p-0 sm:max-w-2xl">
              <DialogHeader className="border-b p-6 pr-12">
                <DialogTitle>{item.currentStatus}</DialogTitle>
                <DialogDescription>
                  Relato público moderado, sem dados pessoais ou documentos
                  privados.
                </DialogDescription>
              </DialogHeader>
              <div className="custom-scrollbar max-h-[calc(100vh-12rem)] overflow-y-auto p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge>{item.amountRange}</Badge>
                  <Badge variant="secondary">{item.problemType}</Badge>
                  <Badge variant="outline">
                    Relevância {item.relevanceScore}%
                  </Badge>
                </div>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  {item.narrative}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <InfoTile label="Cidade/UF" value={`${item.city}/${item.state}`} />
                  <InfoTile
                    label="Prejuízo declarado"
                    value={currencyFormatter.format(item.lossValue)}
                  />
                  <InfoTile
                    label="Data da compra"
                    value={formatDate(item.purchaseDate)}
                  />
                  <InfoTile
                    label="Visualizações"
                    value={`${numberFormatter.format(item.views)} views`}
                  />
                </div>
                <div className="mt-5 rounded-lg border bg-muted/40 p-4">
                  <p className="flex items-center gap-2 font-bold">
                    <FileText className="h-5 w-5 text-primary" />
                    Documentos informados
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.documents.map((document) => (
                      <Badge key={document} variant="secondary">
                        {document}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-5 rounded-lg border border-primary/30 bg-primary/10 p-4">
                  <p className="flex items-center gap-2 font-bold">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Proteção de dados
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Este resumo é público apenas após moderação. Evidências,
                    comprovantes e dados sensíveis permanecem em área privada.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}

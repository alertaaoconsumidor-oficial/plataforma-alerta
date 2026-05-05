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
import { AnimatedProgressBar } from "./animated-progress-bar";

type DirectoryReport = {
  id: string;
  amountRange: string;
  purchaseDate: string;
  currentStatus: string;
  narrative: string;
  isAnonymous: boolean;
  publicNameInitials?: string;
  moderationStatus: "Pendente" | "Aprovado" | "Recusado";
  createdAt: string;
  city: string;
  state: string;
  problemType: string;
  lossValue: number;
  documentationScore: number;
  relevanceScore: number;
  views: number;
  documents: string[];
  summary: string;
};

type SortMode = "relevancia" | "recentes" | "prejuizo" | "views" | "documentacao";

const pageSize = 5;
const allValue = "todos";

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
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return value;
  }

  return dateFormatter.format(new Date(year, month - 1, day));
}

export function CaseReportsDirectory({
  items,
}: {
  items: DirectoryReport[];
}) {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState(allValue);
  const [amountFilter, setAmountFilter] = useState(allValue);
  const [problemFilter, setProblemFilter] = useState(allValue);
  const [sortMode, setSortMode] = useState<SortMode>("relevancia");
  const [page, setPage] = useState(1);

  const states = useMemo(
    () => Array.from(new Set(items.map((item) => item.state))).sort(),
    [items]
  );
  const amountRanges = useMemo(
    () => Array.from(new Set(items.map((item) => item.amountRange))),
    [items]
  );
  const problemTypes = useMemo(
    () => Array.from(new Set(items.map((item) => item.problemType))).sort(),
    [items]
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = items.filter((item) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          item.currentStatus,
          item.narrative,
          item.summary,
          item.city,
          item.state,
          item.problemType,
          item.amountRange,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesState =
        stateFilter === allValue || item.state === stateFilter;
      const matchesAmount =
        amountFilter === allValue || item.amountRange === amountFilter;
      const matchesProblem =
        problemFilter === allValue || item.problemType === problemFilter;

      return matchesQuery && matchesState && matchesAmount && matchesProblem;
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
  }, [amountFilter, items, problemFilter, query, sortMode, stateFilter]);

  const pageCount = Math.max(Math.ceil(filteredItems.length / pageSize), 1);
  const currentPage = Math.min(page, pageCount);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function resetFilters() {
    setQuery("");
    setStateFilter(allValue);
    setAmountFilter(allValue);
    setProblemFilter(allValue);
    setSortMode("relevancia");
    setPage(1);
  }

  function updatePage(nextPage: number) {
    setPage(Math.min(Math.max(nextPage, 1), pageCount));
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <main className="space-y-5">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Filter className="h-5 w-5 text-primary" />
              Filtros e classificação
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
                placeholder="Buscar por cidade, status, problema ou termo do relato"
              />
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
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
                value={amountFilter}
                onValueChange={(value) => {
                  setAmountFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Faixa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={allValue}>Todas as faixas</SelectItem>
                  {amountRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
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
                Exibindo {paginatedItems.length} de {filteredItems.length}{" "}
                relatos filtrados.
              </p>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Limpar filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {paginatedItems.map((item, index) => (
          <ReportDirectoryCard key={item.id} item={item} delayMs={index * 300} />
        ))}

        <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Página {currentPage} de {pageCount}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updatePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updatePage(currentPage + 1)}
              disabled={currentPage === pageCount}
            >
              Proxima
            </Button>
          </div>
        </div>
      </main>

      <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
        <Card className="border-primary/35 bg-primary/10 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              Preparado para escala
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>
              Esta pagina foi desenhada para receber milhares de relatos sem
              sobrecarregar a pagina principal do caso.
            </p>
            <Separator />
            <p>
              No banco de dados, os índices principais devem considerar caso,
              data, status, faixa de valor, cidade, UF e busca textual.
            </p>
            <p>
              A ordenação por relevância pode combinar volume documental,
              atualidade, impacto estimado, visualizações e status de moderação.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Fluxo recomendado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>1. Relato entra como pendente e privado.</p>
            <p>2. Moderação remove dados pessoais e classifica o problema.</p>
            <p>3. Indicadores agregados são recalculados.</p>
            <p>4. Apenas resumo público aprovado aparece nesta listagem.</p>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

function ReportDirectoryCard({
  item,
  delayMs,
}: {
  item: DirectoryReport;
  delayMs: number;
}) {
  const author = item.isAnonymous ? "Anônimo" : item.publicNameInitials;

  return (
    <Card className="group shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg">
      <CardContent className="p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
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

          <div className="grid min-w-[230px] gap-2 text-sm text-muted-foreground">
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
                  Relato público moderado, com dados pessoais suprimidos.
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
                    Observação da plataforma
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Este registro é demonstrativo. Na operação real, anexos e
                    dados sensíveis permanecem privados, com exibição pública
                    apenas após moderação e adequação jurídica.
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

"use client";

import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { MapPin } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { CaseCityStat } from "../types";

type StateFeature = {
  type: "Feature";
  id: string;
  properties: {
    nome: string;
  };
  geometry: unknown;
};

type BrazilTopology = {
  type: "Topology";
  objects: {
    estados: unknown;
  };
};

type StateSummary = {
  state: string;
  stateName: string;
  reports: number;
  estimatedLoss: number;
  cities: CaseCityStat[];
};

const stateNames: Record<string, string> = {
  AC: "Acre",
  AL: "Alagoas",
  AM: "Amazonas",
  AP: "Amapa",
  BA: "Bahia",
  CE: "Ceara",
  DF: "Distrito Federal",
  ES: "Espirito Santo",
  GO: "Goias",
  MA: "Maranhao",
  MG: "Minas Gerais",
  MS: "Mato Grosso do Sul",
  MT: "Mato Grosso",
  PA: "Para",
  PB: "Paraiba",
  PE: "Pernambuco",
  PI: "Piaui",
  PR: "Parana",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RO: "Rondonia",
  RR: "Roraima",
  RS: "Rio Grande do Sul",
  SC: "Santa Catarina",
  SE: "Sergipe",
  SP: "Sao Paulo",
  TO: "Tocantins",
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

function buildStateSummaries(cities: CaseCityStat[]) {
  return cities.reduce<Record<string, StateSummary>>((acc, city) => {
    const current = acc[city.state] ?? {
      state: city.state,
      stateName: stateNames[city.state] ?? city.state,
      reports: 0,
      estimatedLoss: 0,
      cities: [],
    };

    current.reports += city.reports;
    current.estimatedLoss += city.estimatedLoss;
    current.cities.push(city);
    acc[city.state] = current;

    return acc;
  }, {});
}

function markerRadius(reports: number) {
  return Math.max(5, Math.min(15, 5 + reports * 1.2));
}

export function BrazilCaseMap({ cities }: { cities: CaseCityStat[] }) {
  const [features, setFeatures] = useState<StateFeature[]>([]);
  const [hoveredState, setHoveredState] = useState<StateSummary | null>(null);
  const [selectedState, setSelectedState] = useState<StateSummary | null>(null);

  const stateSummaries = useMemo(() => buildStateSummaries(cities), [cities]);
  const affectedStates = Object.values(stateSummaries).sort(
    (a, b) => b.reports - a.reports
  );
  const totalReports = affectedStates.reduce(
    (sum, state) => sum + state.reports,
    0
  );

  const projection = useMemo(
    () =>
      geoMercator()
        .center([-52, -15])
        .scale(560)
        .translate([260, 260]),
    []
  );
  const path = useMemo(() => geoPath(projection), [projection]);

  useEffect(() => {
    let cancelled = false;

    async function loadMap() {
      const response = await fetch("/maps/br-states.json");
      const topology = (await response.json()) as BrazilTopology;
      const collection = feature(
        topology as never,
        topology.objects.estados as never
      ) as unknown as {
        features: StateFeature[];
      };

      if (!cancelled) {
        setFeatures(collection.features);
      }
    }

    loadMap().catch(() => {
      if (!cancelled) {
        setFeatures([]);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="border-b p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Mapa de alcance</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Passe o mouse ou clique nos estados destacados para ver detalhes
                agregados do CASO RAZOR.
              </p>
            </div>
            <div className="rounded-md bg-primary px-3 py-2 text-right text-primary-foreground">
              <p className="text-xs font-medium">Relatos</p>
              <p className="text-xl font-bold">{totalReports}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-0 xl:grid-cols-[1fr_220px]">
          <div className="relative bg-[#171716] p-4">
            {hoveredState ? (
              <div className="absolute left-4 top-4 z-10 max-w-[230px] rounded-md border bg-background p-3 text-sm shadow-lg">
                <p className="font-bold">
                  {hoveredState.stateName} ({hoveredState.state})
                </p>
                <p className="mt-1 text-muted-foreground">
                  {hoveredState.reports} relatos em{" "}
                  {hoveredState.cities.length} cidades
                </p>
                <p className="text-muted-foreground">
                  {currencyFormatter.format(hoveredState.estimatedLoss)}
                </p>
              </div>
            ) : null}

            <svg
              viewBox="0 0 520 520"
              role="img"
              aria-label="Mapa real dos estados do Brasil com marcadores do CASO RAZOR"
              className="mx-auto aspect-square w-full max-w-[620px]"
            >
              {features.map((geo) => {
                const state = geo.id;
                const summary = stateSummaries[state];
                const isAffected = Boolean(summary);
                const d = path(geo as never);

                if (!d) {
                  return null;
                }

                return (
                  <path
                    key={state}
                    d={d}
                    tabIndex={0}
                    role="button"
                    aria-label={
                      summary
                        ? `${summary.stateName}: ${summary.reports} relatos`
                        : `${geo.properties.nome}: sem relatos informados`
                    }
                    onMouseEnter={() => setHoveredState(summary ?? null)}
                    onMouseLeave={() => setHoveredState(null)}
                    onFocus={() => setHoveredState(summary ?? null)}
                    onBlur={() => setHoveredState(null)}
                    onClick={() => {
                      if (summary) {
                        setSelectedState(summary);
                      }
                    }}
                    className="outline-none transition-colors focus-visible:stroke-primary"
                    fill={isAffected ? "hsl(var(--primary))" : "#20201f"}
                    fillOpacity={isAffected ? 0.92 : 1}
                    stroke="#f4f2eb"
                    strokeWidth={isAffected ? 1.8 : 1}
                  />
                );
              })}

              {cities.map((city) => {
                const point = projection([city.longitude, city.latitude]);

                if (!point) {
                  return null;
                }

                return (
                  <g key={`${city.city}-${city.state}`}>
                    <circle
                      cx={point[0]}
                      cy={point[1]}
                      r={markerRadius(city.reports) + 7}
                      fill="hsl(var(--primary))"
                      opacity="0.25"
                    />
                    <circle
                      cx={point[0]}
                      cy={point[1]}
                      r={markerRadius(city.reports)}
                      fill="#171716"
                      stroke="hsl(var(--primary))"
                      strokeWidth="4"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="space-y-4 p-5">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Estados destacados
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {affectedStates.map((state) => (
                  <button
                    key={state.state}
                    type="button"
                    onClick={() => setSelectedState(state)}
                    className="rounded-md bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-80"
                  >
                    {state.state}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {affectedStates.map((state) => (
                <button
                  key={state.state}
                  type="button"
                  onClick={() => setSelectedState(state)}
                  className="w-full rounded-md border p-3 text-left transition-colors hover:border-primary hover:bg-primary/10"
                >
                  <p className="flex items-center gap-2 text-sm font-bold">
                    <MapPin className="h-4 w-4 text-primary" />
                    {state.stateName}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {state.reports} relatos -{" "}
                    {currencyFormatter.format(state.estimatedLoss)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={Boolean(selectedState)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedState(null);
          }
        }}
      >
        <DialogContent>
          {selectedState ? (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedState.stateName} ({selectedState.state})
                </DialogTitle>
                <DialogDescription>
                  Dados agregados preliminares dos relatos informados neste
                  estado.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border p-3">
                  <p className="text-sm text-muted-foreground">Relatos</p>
                  <p className="text-2xl font-bold">
                    {selectedState.reports}
                  </p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-sm text-muted-foreground">
                    Prejuizo estimado
                  </p>
                  <p className="text-2xl font-bold">
                    {currencyFormatter.format(selectedState.estimatedLoss)}
                  </p>
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold">
                  Cidades informadas
                </p>
                <div className="space-y-2">
                  {selectedState.cities.map((city) => (
                    <div
                      key={`${city.city}-${city.state}`}
                      className="flex items-center justify-between gap-4 rounded-md bg-muted px-3 py-2 text-sm"
                    >
                      <span>{city.city}</span>
                      <span className="font-medium">
                        {city.reports} relatos
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

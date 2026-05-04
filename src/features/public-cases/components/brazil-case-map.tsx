"use client";

import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
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
  return Math.max(3.5, Math.min(9, 3.5 + reports * 0.65));
}

export function BrazilCaseMap({ cities }: { cities: CaseCityStat[] }) {
  const [features, setFeatures] = useState<StateFeature[]>([]);
  const [hoveredState, setHoveredState] = useState<StateSummary | null>(null);
  const [selectedState, setSelectedState] = useState<StateSummary | null>(null);

  const stateSummaries = useMemo(() => buildStateSummaries(cities), [cities]);
  const projection = useMemo(
    () =>
      geoMercator()
        .center([-52, -15])
        .scale(500)
        .translate([235, 235]),
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
        <div className="relative bg-white p-4">
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

          <div className="mx-auto max-w-[560px]">
            <svg
              viewBox="0 0 470 470"
              role="img"
              aria-label="Mapa real dos estados do Brasil com marcadores do CASO RAZOR"
              className="aspect-square w-full"
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
                    fill={isAffected ? "hsl(var(--primary))" : "#f1f1ef"}
                    fillOpacity={isAffected ? 0.9 : 1}
                    stroke="#ffffff"
                    strokeWidth={isAffected ? 1.6 : 1}
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
                      opacity="0.22"
                    />
                    <circle
                      cx={point[0]}
                      cy={point[1]}
                      r={markerRadius(city.reports)}
                      fill="#1c1c1a"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2.5"
                    />
                  </g>
                );
              })}
            </svg>
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

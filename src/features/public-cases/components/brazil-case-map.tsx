import { MapPin } from "lucide-react";

import type { CaseCityStat } from "../types";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const longitudeRange = { min: -74, max: -34 };
const latitudeRange = { min: -34, max: 6 };

function projectCity(city: CaseCityStat) {
  const x =
    ((city.longitude - longitudeRange.min) /
      (longitudeRange.max - longitudeRange.min)) *
    420;
  const y =
    ((latitudeRange.max - city.latitude) /
      (latitudeRange.max - latitudeRange.min)) *
    420;

  return {
    x: Math.round(x),
    y: Math.round(y),
  };
}

function markerRadius(reports: number) {
  return Math.max(7, Math.min(18, 6 + reports * 1.4));
}

export function BrazilCaseMap({ cities }: { cities: CaseCityStat[] }) {
  const totalReports = cities.reduce((sum, city) => sum + city.reports, 0);
  const states = [...new Set(cities.map((city) => city.state))].sort();

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="border-b p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">Mapa de alcance</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Marcacoes aproximadas das cidades informadas nos relatos
              preliminares.
            </p>
          </div>
          <div className="rounded-md bg-primary px-3 py-2 text-right text-primary-foreground">
            <p className="text-xs font-medium">Relatos</p>
            <p className="text-xl font-bold">{totalReports}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_180px]">
        <div className="bg-[#161616] p-4">
          <svg
            viewBox="0 0 420 420"
            role="img"
            aria-label="Mapa aproximado do Brasil com marcadores em cidades do CASO RAZOR"
            className="mx-auto aspect-square w-full max-w-[520px]"
          >
            <path
              d="M116 35 151 49 183 42 209 59 245 50 284 74 318 72 344 105 351 142 374 166 356 199 368 232 344 267 314 287 301 321 274 334 253 373 218 388 194 358 162 345 147 309 112 294 103 257 70 239 81 199 56 169 73 133 68 91 96 72Z"
              fill="#20201f"
              stroke="#f6f6f3"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M116 35 132 91 113 139 142 174 137 221 158 252 147 309"
              fill="none"
              stroke="#f6f6f3"
              strokeOpacity="0.78"
              strokeWidth="1.4"
            />
            <path
              d="M183 42 184 107 210 138 204 190 228 229 218 287 218 388"
              fill="none"
              stroke="#f6f6f3"
              strokeOpacity="0.78"
              strokeWidth="1.4"
            />
            <path
              d="M245 50 245 111 272 151 260 205 283 246 274 334"
              fill="none"
              stroke="#f6f6f3"
              strokeOpacity="0.78"
              strokeWidth="1.4"
            />
            <path
              d="M318 72 303 124 328 162 310 212 344 267"
              fill="none"
              stroke="#f6f6f3"
              strokeOpacity="0.78"
              strokeWidth="1.4"
            />
            <path
              d="M73 133 142 174 204 190 260 205 356 199"
              fill="none"
              stroke="#f6f6f3"
              strokeOpacity="0.78"
              strokeWidth="1.4"
            />
            <path
              d="M70 239 137 221 228 229 310 212 368 232"
              fill="none"
              stroke="#f6f6f3"
              strokeOpacity="0.78"
              strokeWidth="1.4"
            />
            <path
              d="M112 294 158 252 218 287 314 287"
              fill="none"
              stroke="#f6f6f3"
              strokeOpacity="0.78"
              strokeWidth="1.4"
            />

            {cities.map((city) => {
              const point = projectCity(city);
              const radius = markerRadius(city.reports);

              return (
                <g key={`${city.city}-${city.state}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={radius + 5}
                    fill="hsl(var(--primary))"
                    opacity="0.18"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={radius}
                    fill="hsl(var(--primary))"
                    stroke="#111"
                    strokeWidth="3"
                  />
                  <text
                    x={point.x + radius + 7}
                    y={point.y + 4}
                    fill="#f6f6f3"
                    fontSize="12"
                    fontWeight="700"
                  >
                    {city.state}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">
              Estados com relatos
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {states.map((state) => (
                <span
                  key={state}
                  className="rounded-md bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground"
                >
                  {state}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {cities.slice(0, 4).map((city) => (
              <div key={city.city} className="rounded-md border p-3">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <MapPin className="h-4 w-4 text-primary" />
                  {city.city}/{city.state}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {city.reports} relatos -{" "}
                  {currencyFormatter.format(city.estimatedLoss)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

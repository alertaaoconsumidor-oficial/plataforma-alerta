import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { CaseCityStat } from "../types";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function CaseCityTable({ cities }: { cities: CaseCityStat[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cidade</TableHead>
          <TableHead>UF</TableHead>
          <TableHead className="text-right">Relatos</TableHead>
          <TableHead className="text-right">Prejuizo estimado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cities.map((city) => (
          <TableRow key={`${city.city}-${city.state}`}>
            <TableCell className="font-medium">{city.city}</TableCell>
            <TableCell>{city.state}</TableCell>
            <TableCell className="text-right">{city.reports}</TableCell>
            <TableCell className="text-right">
              {currencyFormatter.format(city.estimatedLoss)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

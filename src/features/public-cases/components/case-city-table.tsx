import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CityStatsItem } from "../types/case-stats.types";
import { formatCurrency, formatNumber } from "./formatters";

export function CaseCityTable({ cities }: { cities: CityStatsItem[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cidade</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Relatos</TableHead>
          <TableHead className="text-right">Prejuízo estimado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cities.map((item) => (
          <TableRow key={`${item.city}-${item.state}`}>
            <TableCell className="font-medium">{item.city}</TableCell>
            <TableCell>{item.state}</TableCell>
            <TableCell className="text-right">
              {formatNumber(item.reports)}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(item.estimatedLoss)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

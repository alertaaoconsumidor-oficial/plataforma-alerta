import type { CaseDistributionItem } from "../types";

export function CaseBarList({
  items,
  total,
}: {
  items: CaseDistributionItem[];
  total: number;
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;

        return (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="text-muted-foreground">{item.value}</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${Math.max(percent, 4)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

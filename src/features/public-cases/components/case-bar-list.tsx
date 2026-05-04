import type { CaseDistributionItem } from "../types";

export function CaseBarList({
  items,
  total,
  valueSuffix = "",
}: {
  items: CaseDistributionItem[];
  total: number;
  valueSuffix?: string;
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;

        return (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-medium">
                {item.label}
                {item.helper ? (
                  <span className="ml-2 font-normal text-muted-foreground">
                    {item.helper}
                  </span>
                ) : null}
              </span>
              <span className="text-muted-foreground">
                {item.value}
                {valueSuffix}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary transition-[width] duration-1000 ease-out"
                style={{ width: `${Math.max(percent, 4)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

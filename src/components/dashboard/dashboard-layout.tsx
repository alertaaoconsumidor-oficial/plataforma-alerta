import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
  badge?: string;
};

type DashboardLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  navItems: DashboardNavItem[];
  children: React.ReactNode;
  actions?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
};

export function DashboardLayout({
  eyebrow,
  title,
  description,
  navItems,
  children,
  actions,
  sidebarFooter,
}: DashboardLayoutProps) {
  return (
    <main className="min-h-screen bg-[#f6f7fb]">
      <div className="mx-auto flex max-w-[1680px]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-r bg-white px-4 py-5 lg:flex lg:flex-col">
          <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2">
            <Image
              src="/chatbot-icon.svg"
              alt=""
              width={42}
              height={42}
              className="object-contain"
            />
            <div className="leading-tight">
              <p className="text-sm font-extrabold uppercase">Alerta ao</p>
              <p className="text-sm font-extrabold uppercase">Consumidor</p>
            </div>
          </Link>

          <nav className="mt-8 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-primary/10 hover:text-foreground",
                    item.active && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  {item.badge ? (
                    <Badge
                      variant={item.active ? "secondary" : "outline"}
                      className="h-5 px-2 text-[10px]"
                    >
                      {item.badge}
                    </Badge>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">{sidebarFooter}</div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-16 z-30 border-b bg-white/90 px-4 py-4 backdrop-blur md:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  {eyebrow}
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
                  {title}
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">{actions}</div>
            </div>
          </header>

          <div className="px-4 py-6 md:px-6 lg:px-8">{children}</div>
        </section>
      </div>
    </main>
  );
}

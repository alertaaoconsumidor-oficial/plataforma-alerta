import Link from "next/link";
import { cn } from "@/lib/utils";

const MagnifyingGlassExclamation = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10.5 7.5a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" />
    <path d="m21 21-6-6" />
    <path d="M10.5 10.5V7.5" />
    <path d="M10.5 5.5h.01" />
  </svg>
);


export function Logo({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Alerta ao Consumidor - Página Inicial">
      <MagnifyingGlassExclamation className={cn("h-7 w-7", isMobile && "text-primary")} />
      <span className={cn(
        "font-bold text-xl tracking-tighter font-headline",
        isMobile ? "text-foreground" : "text-primary-foreground"
      )}>
        ALERTA AO CONSUMIDOR
      </span>
    </Link>
  );
}

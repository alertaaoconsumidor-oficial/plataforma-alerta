import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="Alerta ao Consumidor - Página Inicial"
    >
      {/* Usando o componente Image do Next.js para carregar seu SVG da pasta public */}
      <Image
        src="/logo-alerta.svg"
        alt="Logo Alerta ao Consumidor"
        width={isMobile ? 180 : 220} // Ajuste esses valores conforme o tamanho do seu SVG
        height={50}
        priority // Carrega a logo com prioridade (LCP)
        className="object-contain"
      />
    </Link>
  );
}

import Link from "next/link";
import Image from "next/image";

export function Logo({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="Alerta ao Consumidor - Página inicial"
    >
      <Image
        src="/logo-alerta.svg"
        alt="Logo Alerta ao Consumidor"
        width={isMobile ? 180 : 220}
        height={50}
        priority
        className="object-contain"
      />
    </Link>
  );
}

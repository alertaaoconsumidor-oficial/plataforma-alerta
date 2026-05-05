"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, Send, X } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const mainLinks = [
  { href: "/", label: "Início" },
  { href: "/#como-funciona", label: "Como Funciona" },
  { href: "/#empresas", label: "Empresas" },
  { href: "/metodologia", label: "Metodologia" },
  { href: "/casos/razor", label: "Caso Razor" },
  { href: "/contato", label: "Contato" },
];

const moreLinks = [
  { href: "/#indicadores", label: "Indicadores" },
  { href: "/golpes", label: "Golpes" },
  { href: "/cdc", label: "CDC" },
  { href: "/aviso-legal", label: "Aviso Legal" },
  { href: "/usuario", label: "Área do usuário" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-950/10 bg-primary/95 text-primary-foreground shadow-sm backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {mainLinks.map(({ href, label }) => (
            <HeaderLink key={href} href={href} pathname={pathname}>
              {label}
            </HeaderLink>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-primary-foreground/70 transition hover:text-primary-foreground">
              Mais
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {moreLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Button asChild variant="secondary">
            <Link href="/enviar-relato">
              <Send className="mr-2 h-4 w-4" />
              Enviar Relato
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/50 focus-visible:bg-primary/50"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] bg-background p-0 text-foreground"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b p-4">
                  <Logo isMobile />

                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Fechar menu</span>
                    </Button>
                  </SheetTrigger>
                </div>

                <nav className="flex flex-col gap-2 p-4 text-lg font-medium">
                  {[...mainLinks, ...moreLinks].map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2 transition-colors hover:bg-muted",
                        isCurrentPath(pathname, href)
                          ? "bg-primary/15 font-bold text-foreground"
                          : "text-foreground/70"
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto border-t p-4">
                  <Button asChild size="lg" className="w-full">
                    <Link
                      href="/enviar-relato"
                      onClick={() => setIsOpen(false)}
                    >
                      Enviar Relato
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function HeaderLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) {
  const active = isCurrentPath(pathname, href);

  return (
    <Link
      href={href}
      className={cn(
        "relative py-2 transition-colors hover:text-primary-foreground",
        active ? "text-primary-foreground" : "text-primary-foreground/68"
      )}
    >
      {children}
      {active ? (
        <span className="absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-8 rounded-full bg-primary-foreground" />
      ) : null}
    </Link>
  );
}

function isCurrentPath(pathname: string, href: string) {
  if (href.includes("#")) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

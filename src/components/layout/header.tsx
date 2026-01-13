"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { useState } from "react";

import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

import { Logo } from "@/components/logo";

const navLinks = [
  { href: "/", label: "Início" },

  { href: "/metodologia", label: "Metodologia" },

  { href: "/aviso-legal", label: "Aviso Legal" },

  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-primary text-primary-foreground shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "transition-colors hover:text-primary-foreground/80",

                pathname === href
                  ? "text-primary-foreground"
                  : "text-primary-foreground/60"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="secondary">
            <Link href="/enviar-relato">Enviar Relato</Link>
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
              className="w-[280px] bg-background text-foreground p-0"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Logo isMobile />

                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />

                      <span className="sr-only">Fechar menu</span>
                    </Button>
                  </SheetTrigger>
                </div>

                <nav className="flex flex-col gap-4 p-4 text-lg font-medium">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "transition-colors hover:text-foreground/80 py-2",

                        pathname === href
                          ? "text-foreground font-bold"
                          : "text-foreground/60"
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto p-4 border-t">
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

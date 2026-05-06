"use client";

import { usePathname } from "next/navigation";

import { ChatbotButton } from "@/components/chatbot/chatbot-button";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";

const appOnlyRoutes = ["/admin", "/usuario", "/entrar", "/cadastro"];

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const useAppShell = appOnlyRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (useAppShell) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  return (
    <>
      <div className="relative flex min-h-dvh flex-col bg-background">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <ChatbotButton />
      <Toaster />
    </>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { AppChrome } from "@/components/layout/app-chrome";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Alerta ao Consumidor | Orientação Preventiva",
  description: "Portal informativo e preventivo para direitos do consumidor.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          poppins.variable
        )}
      >
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}

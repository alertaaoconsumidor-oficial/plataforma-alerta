import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

type AuthPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

const trustItems = [
  "Dados privados tratados com cautela",
  "Relatos vinculados ao histórico do consumidor",
  "Base preparada para autenticação e auditoria",
];

export function AuthPageShell({
  eyebrow,
  title,
  description,
  children,
}: AuthPageShellProps) {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)]">
        <section className="relative hidden overflow-hidden lg:block">
          <Image
            src="/home-hero-consumo.png"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover opacity-[0.48]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/[0.82] to-black/[0.34]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,214,0,0.22),transparent_28%)]" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/chatbot-icon.svg"
                alt=""
                width={48}
                height={48}
                className="object-contain"
              />
              <div className="text-lg font-extrabold uppercase leading-none">
                <p>Alerta ao</p>
                <p>Consumidor</p>
              </div>
            </Link>

            <div className="max-w-xl">
              <span className="inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Área segura
              </span>
              <h2 className="mt-6 text-4xl font-black leading-tight xl:text-5xl">
                Central privada para relatos, documentos e acompanhamento.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/68">
                O usuário acessa seus relatos, organiza evidências, acompanha
                respostas e prepara dossiês sem expor dados pessoais em páginas
                públicas.
              </p>
            </div>

            <div className="grid gap-3">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.08] px-4 py-3 backdrop-blur"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-white/78">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-screen flex-col bg-[#f7f7f7] text-foreground">
          <div className="flex items-center justify-between px-5 py-5 md:px-8 lg:px-10">
            <Button asChild variant="ghost" className="text-muted-foreground">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao site
              </Link>
            </Button>
            <div className="lg:hidden">
              <Logo isMobile />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center px-5 pb-10 md:px-8 lg:px-10">
            <div className="w-full max-w-[520px]">
              <div className="mb-7">
                <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-foreground">
                  <LockKeyhole className="mr-2 h-3.5 w-3.5 text-primary" />
                  {eyebrow}
                </span>
                <h1 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
                  {title}
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-5 shadow-2xl shadow-black/5 md:p-7">
                {children}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

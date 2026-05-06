import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Cadastro | Alerta ao Consumidor",
  description:
    "Crie sua conta para organizar relatos, documentos privados e dossiês informativos.",
};

export default function CadastroPage() {
  return (
    <AuthPageShell
      eyebrow="Cadastro seguro"
      title="Crie sua conta no Alerta"
      description="Deixe sua área preparada para registrar relatos, preservar evidências e acompanhar atualizações com privacidade."
    >
      <SignUpForm />
    </AuthPageShell>
  );
}

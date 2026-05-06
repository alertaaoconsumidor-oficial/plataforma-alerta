import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Entrar | Alerta ao Consumidor",
  description:
    "Acesse sua área segura para acompanhar relatos, documentos e dossiês.",
};

export default function EntrarPage() {
  return (
    <AuthPageShell
      eyebrow="Acesso do usuário"
      title="Entre na sua central privada"
      description="Acompanhe seus relatos, envie documentos com segurança e consulte notificações da plataforma."
    >
      <SignInForm />
    </AuthPageShell>
  );
}

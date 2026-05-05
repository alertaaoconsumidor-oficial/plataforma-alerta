import type { Metadata } from "next";

import { UserDashboard } from "@/components/dashboard/user-dashboard";

export const metadata: Metadata = {
  title: "Área do Usuário",
  description:
    "Painel do consumidor para acompanhar relatos, documentos, respostas, uploads e dossiês.",
};

export default function UsuarioPage() {
  return <UserDashboard />;
}

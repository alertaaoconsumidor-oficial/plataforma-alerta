import type { Metadata } from "next";

import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export const metadata: Metadata = {
  title: "Administração",
  description:
    "Dashboard administrativo para gestão de relatos, empresas, moderação, uploads e dossiês.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}

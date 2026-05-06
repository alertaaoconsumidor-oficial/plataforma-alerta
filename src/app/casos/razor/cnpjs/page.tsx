import type { Metadata } from "next";

import { RelatedCnpjsDirectory } from "@/features/public-cases/components/related-cnpjs-directory";
import { razorRelatedCnpjs } from "@/features/public-cases/data/razor-preliminary-stats";

export const metadata: Metadata = {
  title: "CNPJs do Caso Razor | Alerta ao Consumidor",
  description:
    "Consulta pública contextualizada dos CNPJs informados ou relacionados ao Caso Razor.",
};

export default function CasoRazorCnpjsPage() {
  return (
    <RelatedCnpjsDirectory
      title="CNPJs do Caso Razor"
      description="Área dedicada para consultar CNPJs informados ou relacionados ao Caso Razor, com situação cadastral, fonte, conferência e documento oficial quando disponível."
      backHref="/casos/razor"
      backLabel="Voltar ao Caso Razor"
      heroImageSrc="/razor-bg.webp"
      items={razorRelatedCnpjs}
    />
  );
}

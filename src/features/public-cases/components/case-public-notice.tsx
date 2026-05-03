import { ShieldCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function CasePublicNotice() {
  return (
    <Card className="border-primary/30 bg-primary/10">
      <CardContent className="flex gap-3 p-5 text-sm text-muted-foreground">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p>
          As estatísticas exibidas nesta página são demonstrativas. Em operação,
          a página pública deverá exibir somente dados agregados e anonimizados.
          Dados pessoais, documentos e relatos privados não serão publicados. As
          informações possuem finalidade informativa e preventiva, sem substituir
          a análise de órgãos competentes ou assessoria jurídica.
        </p>
      </CardContent>
    </Card>
  );
}

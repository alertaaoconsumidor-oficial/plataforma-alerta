import { ShieldCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function CaseLgpdNotice() {
  return (
    <Alert>
      <ShieldCheck className="h-4 w-4" />
      <AlertTitle>Dados pessoais protegidos</AlertTitle>
      <AlertDescription>
        Os dados apresentados neste painel sao preliminares e agregados,
        baseados em relatos informados voluntariamente por consumidores em
        processo de organizacao coletiva. Nenhum dado pessoal, documento,
        telefone, CPF, endereco ou comprovante e exibido publicamente.
      </AlertDescription>
    </Alert>
  );
}

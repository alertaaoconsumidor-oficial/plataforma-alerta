import { ShieldCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function CaseLgpdNotice() {
  return (
    <Alert className="border-amber-300 bg-amber-50 text-amber-950">
      <ShieldCheck className="h-4 w-4 text-amber-700" />
      <AlertTitle>Dados pessoais protegidos</AlertTitle>
      <AlertDescription className="text-amber-900/85">
        Os dados apresentados neste painel são preliminares e agregados,
        baseados em relatos informados voluntariamente por consumidores em
        processo de organização coletiva. Nenhum dado pessoal, documento,
        telefone, CPF, endereço ou comprovante é exibido publicamente.
      </AlertDescription>
    </Alert>
  );
}

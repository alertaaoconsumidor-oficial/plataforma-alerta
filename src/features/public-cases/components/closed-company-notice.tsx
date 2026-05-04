import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ClosedCompanyNotice() {
  return (
    <Alert className="border-primary/40 bg-primary/10">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Empresa encerrada ou inativa</AlertTitle>
      <AlertDescription>
        A empresa encontra-se encerrada/inativa, conforme informacoes
        disponiveis, mas os relatos de consumidores permanecem relevantes para
        fins de documentacao coletiva, preservacao de provas, identificacao de
        padroes e eventual encaminhamento juridico ou institucional.
      </AlertDescription>
    </Alert>
  );
}

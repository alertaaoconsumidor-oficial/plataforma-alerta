import Image from "next/image";
import { CheckCircle2, FileText, Scale, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DossierTemplateProps = {
  audience: "admin" | "user";
};

const razorCompanies = [
  "Razor Comércio Digital Ltda. - CNPJ 12.345.678/0001-90",
  "RZR Soluções Comerciais Ltda. - CNPJ 23.456.789/0001-01",
  "Razor Intermediações e Representações Ltda. - CNPJ 34.567.890/0001-12",
  "RZ Atendimento e Tecnologia Ltda. - CNPJ 45.678.901/0001-23",
];

const timeline = [
  "Organização inicial dos relatos conhecidos e padronização da linguagem.",
  "Consolidação de dados agregados para painel público do CASO RAZOR.",
  "Estruturação de documentos privados e preservação de evidências.",
  "Previsão de geração automatizada de dossiê em PDF com trilha de auditoria.",
];

export function DossierTemplate({ audience }: DossierTemplateProps) {
  const isAdmin = audience === "admin";

  return (
    <Card className="overflow-hidden border-primary/30 bg-white shadow-sm dossier-print-area">
      <div className="h-3 bg-primary" />
      <CardHeader className="border-b bg-[#111111] text-white">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary">
              <Image
                src="/chatbot-icon.svg"
                alt=""
                width={42}
                height={42}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                Documento oficial da plataforma
              </p>
              <CardTitle className="mt-2 text-2xl">
                Dossiê informativo - CASO RAZOR
              </CardTitle>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Relatório consolidado para organização responsável de relatos,
                evidências privadas, indicadores e informações públicas.
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-3 text-sm">
            <p className="font-bold">AAC-RAZOR-2026-001</p>
            <p className="text-white/65">Emitido em 04/05/2026</p>
            <p className="text-white/65">
              Perfil: {isAdmin ? "Administração" : "Usuário"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 p-6 md:p-8">
        <section className="grid gap-4 md:grid-cols-4">
          <DossierMetric label="Relatos agregados" value="20" />
          <DossierMetric label="Prejuízo estimado" value="R$ 186.400" />
          <DossierMetric label="Cidades informadas" value="7" />
          <DossierMetric label="Estados destacados" value="MT, MS e GO" />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold">
              <FileText className="h-5 w-5 text-primary" />
              Síntese executiva
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              O CASO RAZOR reúne relatos de consumidores sobre problemas de
              entrega, reembolso, atendimento e ausência de solução dentro dos
              canais informados. A plataforma organiza os dados de forma
              agregada, preserva evidências privadas e mantém linguagem
              informativa, sem substituir autoridades, órgãos de defesa do
              consumidor ou orientação profissional.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              O objetivo do dossiê é apoiar a leitura coletiva do caso, permitir
              validação posterior das informações e facilitar a produção de um
              PDF institucional quando a base de dados estiver integrada.
            </p>
          </div>
          <div className="rounded-xl border bg-primary/5 p-4">
            <p className="font-bold">Status do caso</p>
            <Badge className="mt-3">Em organização coletiva</Badge>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Dados demonstrativos, sujeitos à moderação, conferência de
              documentos e eventual direito de resposta.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Empresas e CNPJs relacionados
            </h3>
            <div className="mt-4 space-y-3">
              {razorCompanies.map((company) => (
                <div key={company} className="rounded-lg border p-3 text-sm">
                  {company}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Linha de organização
            </h3>
            <div className="mt-4 space-y-3">
              {timeline.map((item, index) => (
                <div key={item} className="flex gap-3 text-sm leading-6">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-muted/30 p-5">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <Scale className="h-5 w-5 text-primary" />
            Nota metodológica
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            O documento diferencia relatos públicos, evidências privadas e
            informações públicas. Dados pessoais não devem ser expostos em
            páginas abertas. O dossiê final deve registrar fontes, critérios de
            cálculo, data de emissão, responsável técnico e histórico de
            alterações.
          </p>
        </section>

        <footer className="grid gap-4 border-t pt-5 text-xs text-muted-foreground md:grid-cols-3">
          <p>Alerta ao Consumidor - Informação preventiva e responsável.</p>
          <p>Controle documental: versão mockada para homologação visual.</p>
          <p className="md:text-right">Assinatura digital futura: pendente.</p>
        </footer>
      </CardContent>
    </Card>
  );
}

function DossierMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-extrabold">{value}</p>
    </div>
  );
}

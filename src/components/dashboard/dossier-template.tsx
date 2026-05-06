import Image from "next/image";
import {
  CheckCircle2,
  ClipboardList,
  FileText,
  LockKeyhole,
  Scale,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DossierTemplateProps = {
  audience: "admin" | "user";
};

const razorCompanies = [
  ["Razor Comércio Digital Ltda.", "12.345.678/0001-90", "Baixada"],
  ["RZR Soluções Comerciais Ltda.", "23.456.789/0001-01", "Inapta"],
  ["Razor Intermediações e Representações Ltda.", "34.567.890/0001-12", "Ativa"],
  ["RZ Atendimento e Tecnologia Ltda.", "45.678.901/0001-23", "Ativa"],
];

const timeline = [
  ["Etapa 1", "Organização inicial dos relatos conhecidos e padronização da linguagem."],
  ["Etapa 2", "Consolidação de dados agregados para painel público do CASO RAZOR."],
  ["Etapa 3", "Estruturação de documentos privados e preservação de evidências."],
  ["Etapa 4", "Previsão de geração automatizada de dossiê em PDF com trilha de auditoria."],
];

const attachments = [
  ["Comprovante de pagamento", "PDF", "Privado", "Consumidor"],
  ["Registro de conversa", "Imagem", "Privado", "Consumidor"],
  ["Planilha de relatos", "XLSX", "Restrito", "Administração"],
  ["Fontes públicas", "Links", "Público", "Plataforma"],
];

export function DossierTemplate({ audience }: DossierTemplateProps) {
  const isAdmin = audience === "admin";

  return (
    <Card className="dossier-print-area overflow-hidden border-primary/30 bg-white shadow-sm">
      <div className="h-3 bg-primary" />
      <CardHeader className="border-b bg-[#111111] text-white">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary">
              <Image
                src="/chatbot-icon.svg"
                alt=""
                width={46}
                height={46}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                Documento oficial da plataforma
              </p>
              <CardTitle className="mt-2 text-2xl md:text-3xl">
                Dossiê informativo - CASO RAZOR
              </CardTitle>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/65">
                Relatório consolidado para organização responsável de relatos,
                evidências privadas, indicadores públicos e informações
                cadastrais relacionadas.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm">
            <p className="font-bold">AAC-RAZOR-2026-001</p>
            <p className="mt-1 text-white/65">Emitido em 04/05/2026</p>
            <p className="text-white/65">
              Perfil: {isAdmin ? "Administração" : "Usuário"}
            </p>
            <Badge className="mt-3">Mock homologação</Badge>
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

        <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
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
              Este documento foi modelado para futura geração em PDF, com
              versão, data de emissão, histórico de alterações, lista de
              documentos, informações públicas e nota metodológica.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4">
            <p className="font-bold">Status do caso</p>
            <Badge className="mt-3">Em organização coletiva</Badge>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Dados demonstrativos, sujeitos à moderação, conferência de
              documentos, atualização cadastral e eventual direito de resposta.
            </p>
          </div>
        </section>

        <section>
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Empresas e CNPJs relacionados
          </h3>
          <div className="mt-4 overflow-hidden rounded-2xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Situação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {razorCompanies.map(([company, cnpj, status]) => (
                  <TableRow key={cnpj}>
                    <TableCell className="font-medium">{company}</TableCell>
                    <TableCell>{cnpj}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Linha de organização
            </h3>
            <div className="mt-4 space-y-3">
              {timeline.map(([step, description]) => (
                <div
                  key={step}
                  className="flex gap-3 rounded-2xl border bg-white p-3 text-sm leading-6"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.replace("Etapa ", "")}
                  </span>
                  <div>
                    <p className="font-bold">{step}</p>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <ClipboardList className="h-5 w-5 text-primary" />
              Documentos classificados
            </h3>
            <div className="mt-4 space-y-3">
              {attachments.map(([name, type, visibility, source]) => (
                <div
                  key={name}
                  className="grid gap-2 rounded-2xl border bg-muted/30 p-3 text-sm md:grid-cols-[1fr_auto]"
                >
                  <div>
                    <p className="font-bold">{name}</p>
                    <p className="text-muted-foreground">
                      {type} • Origem: {source}
                    </p>
                  </div>
                  <Badge variant={visibility === "Público" ? "default" : "secondary"}>
                    {visibility}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border bg-muted/30 p-5">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <Scale className="h-5 w-5 text-primary" />
            Nota metodológica
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            O documento diferencia relatos públicos, evidências privadas e
            informações públicas. Dados pessoais, documentos, telefone, CPF,
            endereço e comprovantes não devem ser expostos em páginas abertas.
            O dossiê final deve registrar fontes, critérios de cálculo, data de
            emissão, responsável técnico e histórico de alterações.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <SignatureBlock title="Responsável pela emissão" value="Plataforma Alerta ao Consumidor" />
          <SignatureBlock title="Controle documental" value="Versão mockada para homologação visual" />
          <SignatureBlock title="Assinatura digital" value="Pendente de integração" />
        </section>

        <footer className="flex flex-col gap-3 border-t pt-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2">
            <LockKeyhole className="h-4 w-4 text-primary" />
            Alerta ao Consumidor - Informação preventiva e responsável.
          </p>
          <p>Documento demonstrativo, sem valor de certidão pública.</p>
        </footer>
      </CardContent>
    </Card>
  );
}

function DossierMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-extrabold">{value}</p>
    </div>
  );
}

function SignatureBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <div className="mt-8 border-t pt-3">
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

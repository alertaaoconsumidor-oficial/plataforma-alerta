import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeHelp,
  BookOpenCheck,
  FileText,
  ReceiptText,
  RotateCcw,
  Scale,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Código de Defesa do Consumidor",
  description:
    "Guia informativo com direitos essenciais previstos no Código de Defesa do Consumidor.",
};

const rights = [
  {
    title: "Informação clara",
    description:
      "Preço, prazo, características, riscos, cobrança e condições da oferta devem ser apresentados de forma compreensível.",
    icon: BookOpenCheck,
  },
  {
    title: "Proteção contra práticas abusivas",
    description:
      "O consumidor não deve ser constrangido, induzido a erro ou submetido a vantagem manifestamente excessiva.",
    icon: ShieldCheck,
  },
  {
    title: "Publicidade enganosa",
    description:
      "Ofertas e anúncios precisam corresponder ao produto ou serviço entregue, sem omissões capazes de confundir.",
    icon: BadgeHelp,
  },
  {
    title: "Direito de arrependimento",
    description:
      "Em contratações fora do estabelecimento comercial, como compras on-line, o CDC prevê prazo de reflexão conforme a lei.",
    icon: RotateCcw,
  },
  {
    title: "Cobrança e comprovantes",
    description:
      "Guarde notas, contratos, boletos, prints e protocolos. Eles ajudam a demonstrar a relação de consumo.",
    icon: ReceiptText,
  },
  {
    title: "Reclamações fundamentadas",
    description:
      "Órgãos públicos de defesa do consumidor mantêm cadastros e registros que podem orientar decisões de consumo.",
    icon: FileText,
  },
];

const practicalTips = [
  "Leia oferta, prazo, política de troca e identificação do fornecedor antes de comprar.",
  "Registre protocolos e salve comunicações em canais oficiais.",
  "Evite publicar dados pessoais, documentos e informações sensíveis em espaços abertos.",
  "Quando o problema persistir, procure Procon, Consumidor.gov.br ou orientação profissional adequada.",
];

export default function CdcPage() {
  return (
    <main className="bg-background">
      <section className="border-b bg-card">
        <div className="container mx-auto grid gap-8 px-4 py-12 md:px-6 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <Badge className="mb-4">Lei 8.078/1990</Badge>
            <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight md:text-5xl">
              <Scale className="h-9 w-9 text-primary" />
              Código de Defesa do Consumidor
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
              Um guia direto sobre pontos essenciais do CDC para ajudar o
              consumidor a pesquisar, relatar e preservar informações com
              responsabilidade.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Importante</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                Este conteúdo é informativo. Para decisões jurídicas sobre um
                caso concreto, procure Procon, Defensoria Pública, advogado ou
                órgão competente.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm">
                  Ver texto oficial no Planalto
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto space-y-8 px-4 py-12 md:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rights.map((right) => {
            const Icon = right.icon;

            return (
              <Card key={right.title}>
                <CardContent className="p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">{right.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {right.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Como usar estas informações no Alerta</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-[1fr_320px]">
            <div className="grid gap-3">
              {practicalTips.map((tip) => (
                <div key={tip} className="flex gap-3 text-sm leading-6">
                  <BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-primary/10 p-5">
              <p className="font-bold">Relato responsável</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Descreva fatos, datas, valores, protocolos e status atual. Evite
                acusações pessoais e preserve documentos privados em ambiente
                seguro.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

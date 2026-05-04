import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Direito de Resposta do CASO RAZOR | Alerta ao Consumidor",
  description:
    "Canal institucional para manifestacoes formais relacionadas ao CASO RAZOR.",
};

export default function DireitoDeRespostaRazorPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-10 md:px-6 md:py-16">
        <Button asChild variant="ghost" className="mb-6 px-0">
          <Link href="/casos/razor">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao caso
          </Link>
        </Button>

        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Direito de resposta
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            O Alerta ao Consumidor mantem canal especifico para manifestacao
            formal de partes reclamadas, representantes legais,
            administradores judiciais, empresas mencionadas em relatos ou areas
            de compliance.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Como funciona</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                Este canal permite o envio de esclarecimentos, documentos,
                pedidos de correcao ou contestacao de informacoes relacionadas
                ao CASO RAZOR.
              </p>
              <p>
                As manifestacoes serao analisadas pela equipe de moderacao
                antes de eventual publicacao, vinculacao ao caso correspondente
                ou atualizacao de dados agregados.
              </p>
              <p>
                A plataforma nao publica respostas automaticamente e nao
                substitui analise juridica, administrativa ou judicial.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                Contato formal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Enquanto o formulario dedicado nao estiver disponivel, use o
                canal institucional:
              </p>
              <p className="font-medium text-foreground">
                contato@alertaaoconsumidor.com.br
              </p>
              <p>
                Inclua identificacao do representante, resumo objetivo e
                documentos que sustentem a manifestacao.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Protecao de dados
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            Dados pessoais, documentos privados e informacoes sensiveis
            recebidas por este canal nao serao exibidos publicamente sem
            avaliacao previa, base legal adequada e criterio de necessidade.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

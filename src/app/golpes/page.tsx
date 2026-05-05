import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  BadgeCheck,
  CreditCard,
  FileWarning,
  LockKeyhole,
  ShieldAlert,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Golpes e Fraudes",
  description:
    "Orientações preventivas para consumidores identificarem golpes e preservarem provas.",
};

const warningSigns = [
  "Pressa artificial: desconto ou solução disponível apenas por poucos minutos.",
  "Pedido de Pix, boleto ou transferência para pessoa física sem vínculo claro.",
  "Link recebido por mensagem que imita banco, loja, transportadora ou órgão público.",
  "Atendente que solicita senha, código de verificação ou acesso remoto ao celular.",
  "Promessa de estorno, prêmio, entrega ou renegociação mediante pagamento antecipado.",
];

const preventionCards = [
  {
    title: "Antes de pagar",
    icon: CreditCard,
    items: [
      "Confirme CNPJ, razão social, domínio do site e reputação em fontes públicas.",
      "Digite o endereço do site manualmente; evite entrar por links de mensagens.",
      "Confira o favorecido do Pix ou boleto antes de autorizar a transação.",
    ],
  },
  {
    title: "Durante o atendimento",
    icon: LockKeyhole,
    items: [
      "Não informe senhas, tokens, códigos SMS ou dados completos do cartão.",
      "Desconfie de pedido de instalação de aplicativo de acesso remoto.",
      "Registre protocolo, data, canal utilizado e nome informado pelo atendente.",
    ],
  },
  {
    title: "Depois de suspeitar",
    icon: FileWarning,
    items: [
      "Entre em contato com banco, cartão ou plataforma pelo canal oficial.",
      "Guarde prints, comprovantes, URLs, números de telefone e conversas.",
      "Quando houver fraude, registre boletim de ocorrência e acompanhe o caso.",
    ],
  },
];

export default function GolpesPage() {
  return (
    <main className="bg-background">
      <section className="border-b bg-card">
        <div className="container mx-auto grid gap-8 px-4 py-12 md:px-6 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <Badge className="mb-4">Prevenção</Badge>
            <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight md:text-5xl">
              <ShieldAlert className="h-9 w-9 text-primary" />
              Como se defender de golpes
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
              Golpes digitais costumam explorar urgência, aparência de
              autoridade e distração no pagamento. Esta página reúne cuidados
              práticos para reduzir riscos e organizar informações caso algo
              aconteça.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Regra de ouro
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              <p>
                Se a mensagem exige pressa, segredo ou pagamento imediato,
                interrompa a conversa e procure o canal oficial da empresa ou
                instituição.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto space-y-8 px-4 py-12 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Sinais de alerta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {warningSigns.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            {preventionCards.map((card) => {
              const Icon = card.icon;

              return (
                <Card key={card.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Icon className="h-5 w-5 text-primary" />
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {card.items.map((item) => (
                      <div key={item} className="flex gap-3 text-sm leading-6">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fontes úteis e canais oficiais</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm leading-6 text-muted-foreground md:grid-cols-3">
            <p>
              A Senacon orienta consumidores sobre compras seguras, pagamentos
              digitais e prevenção de fraudes em ambientes on-line.
            </p>
            <p>
              A Anatel mantém materiais sobre golpes digitais, phishing,
              mensagens falsas e proteção de dados pessoais.
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild variant="outline">
                <Link href="https://www.gov.br/mj/pt-br/assuntos/noticias/senacon-explica-como-evitar-fraudes-em-compras-on-line-1">
                  Orientações da Senacon
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="https://www.gov.br/anatel/pt-br/assuntos/dicas-contra-fraudes/dicas-de-seguranca-contra-fraudes">
                  Dicas da Anatel
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

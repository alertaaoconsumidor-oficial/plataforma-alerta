import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Clock, FileText, SlashCircle } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Metodologia de Cálculo',
  description: 'Entenda como calculamos nossos indicadores e qual nossa política de verificação de relatos.',
};

export default function MetodologiaPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-center">
            Nossa Metodologia
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-center">
            Transparência é o nosso pilar. Veja como coletamos dados e calculamos os indicadores que você vê no portal.
          </p>

          <div className="mt-12 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                    <FileText className="h-7 w-7 text-primary" />
                    Política de Relatos e Verificação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>O Alerta ao Consumidor é uma plataforma de caráter informativo e preventivo. Nosso objetivo não é julgar ou acusar, mas sim apresentar um panorama factual baseado em relatos de consumidores e dados públicos.</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Moderação Humana:</strong> Todos os relatos enviados passam por uma moderação antes de serem publicados.</li>
                  <li><strong>Remoção de Dados Sensíveis:</strong> Removemos nomes completos (exceto iniciais, se autorizado), CPFs, endereços, e-mails, telefones e qualquer linguagem ofensiva ou acusatória.</li>
                  <li><strong>Foco em Fatos:</strong> Priorizamos relatos que descrevem a situação de forma objetiva, com datas, valores e prazos.</li>
                  <li><strong>Evidências Privadas:</strong> As evidências enviadas (notas fiscais, e-mails) são confidenciais e usadas apenas pela nossa equipe para verificação interna. Elas nunca são publicadas.</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                    <BarChart2 className="h-7 w-7 text-primary" />
                    Cálculo dos Indicadores (KPIs)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2"><Clock className="h-5 w-5" /> TMR: Tempo Médio sem Resolução</h3>
                  <p className="mt-1 text-muted-foreground">Mede a média de dias entre a data prometida para entrega/resolução e a data do relato, para casos ainda não solucionados. Ajuda a quantificar a demora da empresa.</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2"><SlashCircle className="h-5 w-5" /> SD: Silêncio Documentado</h3>
                  <p className="mt-1 text-muted-foreground">Contabiliza o número de relatos onde o consumidor afirma não ter recebido nenhuma resposta da empresa através dos canais oficiais de atendimento. Indica falha na comunicação.</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2"><BarChart2 className="h-5 w-5" /> TRPE: % Resolvido Após Escalonamento</h3>
                   <p className="mt-1 text-muted-foreground">Este é um indicador mais complexo que mede, em relatos onde houve necessidade de acionar um órgão de defesa do consumidor (como Procon), qual a porcentagem de casos que foram resolvidos após essa intervenção.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

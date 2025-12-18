import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gavel, Info, ShieldAlert } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal e Termos de Uso',
  description: 'Conheça a finalidade do portal, a responsabilidade sobre os relatos e nossa política de moderação.',
};

export default function AvisoLegalPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-center">
            Aviso Legal e Termos de Uso
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-center">
            Ao utilizar o Alerta ao Consumidor, você concorda com os termos descritos abaixo.
          </p>

          <div className="mt-12 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                    <Info className="h-7 w-7 text-primary" />
                    Finalidade Informativa e Preventiva
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>O Alerta ao Consumidor é uma plataforma de utilidade pública com o objetivo de centralizar informações e dar voz a consumidores. O conteúdo aqui apresentado tem caráter puramente informativo e preventivo.</p>
                <p>Não somos um órgão oficial, um tribunal ou uma entidade de mediação. Não fazemos acusações, não emitimos juízo de valor e não garantimos a resolução de qualquer problema individual.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                    <ShieldAlert className="h-7 w-7 text-primary" />
                    Responsabilidade do Autor do Relato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>Todo o conteúdo dos relatos é de inteira responsabilidade de seus autores. Ao enviar um relato, o usuário declara que as informações são verdadeiras e que não está agindo de má-fé.</p>
                <p>A plataforma atua como um veículo para a publicação, e a moderação visa apenas adequar a linguagem e proteger dados sensíveis, sem alterar o mérito do que foi relatado.</p>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                    <Gavel className="h-7 w-7 text-primary" />
                    Moderação e Direito de Resposta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>Reservamo-nos o direito de não publicar, editar ou remover qualquer conteúdo que viole nossos termos, contenha linguagem ofensiva, acusações criminais sem provas, ou exponha dados pessoais de forma indevida.</p>
                <p>As empresas citadas têm o direito de resposta garantido. Caso uma empresa deseje contestar uma informação, fornecer um esclarecimento ou solicitar a remoção de um conteúdo por violação dos termos, deve entrar em contato através do nosso canal oficial na página de <a href="/contato" className="text-primary underline">Contato</a>.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquareWarning } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Fale conosco para correções, contestações ou direito de resposta.',
};

export default function ContatoPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">
              Fale Conosco
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Utilize os canais abaixo para dúvidas, sugestões ou para exercer seu direito de resposta.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                        <MessageSquareWarning className="h-7 w-7 text-primary" />
                        Correção ou Contestação
                    </CardTitle>
                    <CardDescription>
                        É uma empresa e deseja contestar uma informação ou fornecer um esclarecimento? Utilize o formulário.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
            </Card>
            <div className="space-y-6 rounded-lg border bg-card text-card-foreground shadow-sm p-8">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Email Institucional</h3>
                        <p className="text-muted-foreground text-sm">Para parcerias, imprensa e outros assuntos gerais.</p>
                        <a href="mailto:contato@alertaconsumidor.com.br" className="text-primary font-medium mt-1 block">
                            contato@alertaconsumidor.com.br
                        </a>
                    </div>
                </div>
                 <p className="text-sm text-muted-foreground pt-4 border-t">
                    <strong>Atenção:</strong> Não oferecemos suporte individual para casos de consumidores por e-mail. Para relatar um problema com uma empresa, por favor, utilize a página <a href="/enviar-relato" className="text-primary underline">Enviar Relato</a>.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

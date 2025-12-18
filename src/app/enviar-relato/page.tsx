import { ReportForm } from "@/components/report-form";
import { getCompanies } from "@/lib/api";
import { ShieldCheck } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enviar Relato',
  description: 'Descreva sua experiência com uma empresa de forma estruturada e segura. Ajude outros consumidores.',
};

export default async function EnviarRelatoPage() {
    const companies = await getCompanies();
    
    return (
        <div className="bg-background">
          <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">
                  Enviar um Relato
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Descreva sua experiência de forma factual e objetiva. Seu relato ajuda a construir um mercado mais transparente.
                </p>
              </div>
    
              <div className="mt-12 grid md:grid-cols-3 gap-8 lg:gap-12">
                <div className="md:col-span-2">
                    <ReportForm companies={companies} />
                </div>
                <div className="space-y-6">
                    <div className="p-6 rounded-lg border bg-card">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            Seu Relato Seguro
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">✔</span>
                                <span><strong>Linguagem neutra:</strong> Seu relato será moderado para remover acusações e ofensas. Apenas fatos.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">✔</span>
                                <span><strong>Dados privados:</strong> Documentos enviados como evidência são confidenciais e jamais serão publicados.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">✔</span>
                                <span><strong>Anonimato opcional:</strong> Você pode escolher publicar seu relato de forma anônima.</span>
                            </li>
                        </ul>
                    </div>
                     <div className="p-6 rounded-lg border bg-card">
                        <h3 className="font-bold text-lg">Dicas para um bom relato</h3>
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                            <li>Seja claro e objetivo.</li>
                            <li>Informe datas e números de protocolo.</li>
                            <li>Não use palavrões ou acusações diretas.</li>
                            <li>Descreva o problema e as tentativas de solução.</li>
                        </ul>
                     </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="max-w-2xl">
                <h3 className="font-bold text-lg font-headline">Aviso Legal</h3>
                <p className="text-sm text-secondary-foreground/80 mt-2">
                Conteúdo informativo e preventivo. Relatos são de responsabilidade dos autores. Sem acusação. Sem juízo de valor. Fontes e dados públicos.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
                <div className="flex flex-col gap-2">
                    <Link href="/metodologia" className="font-medium hover:text-primary transition-colors">Metodologia</Link>
                    <Link href="/aviso-legal" className="font-medium hover:text-primary transition-colors">Termos e Aviso Legal</Link>
                </div>
                 <div className="flex flex-col gap-2">
                    <Link href="/contato" className="font-medium hover:text-primary transition-colors">Contato</Link>
                    <Link href="/admin" className="font-medium hover:text-primary transition-colors">Acesso Restrito</Link>
                </div>
            </div>
        </div>
        <Separator className="my-6 bg-border/50" />
        <div className="text-center text-sm text-secondary-foreground/60">
          <p>&copy; {currentYear} Alerta ao Consumidor. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

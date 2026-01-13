import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getRecentReports, getTopCompaniesByReports } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BarChart2,
  FileText,
  Search,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alerta ao Consumidor",
  description:
    "Pesquise empresas, envie relatos e acesse indicadores sobre direitos do consumidor.",
};

export default async function Home() {
  const recentReports = await getRecentReports(3);
  const topCompanies = await getTopCompaniesByReports(3);

  return (
    <div className="flex flex-col">
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            Alerta Preventivo ao Consumidor
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/90">
            Informação é a sua melhor defesa. Pesquise, relate e proteja-se.
          </p>
          <div className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Pesquisar empresa por nome ou CNPJ"
                className="w-full pl-10 text-base py-6 text-foreground"
              />
            </div>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 shrink-0"
            >
              Pesquisar
            </Button>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild variant="secondary" size="lg">
              <Link href="/enviar-relato">
                Enviar Relato <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/metodologia">Ver Metodologia</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-headline flex items-center">
                <FileText className="mr-3 h-6 w-6 text-primary" />
                Últimos Alertas
              </h2>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <Card key={report.id}>
                    <CardContent className="pt-6">
                      <p className="font-bold">{report.companyName}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {report.narrative}
                      </p>
                      <Link
                        href={`/empresa/${report.companySlug}`}
                        className="text-sm text-primary hover:underline mt-2 inline-block"
                      >
                        Ver detalhes <ArrowRight className="inline h-3 w-3" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-headline flex items-center">
                <TrendingUp className="mr-3 h-6 w-6 text-primary" />
                Empresas em Destaque
              </h2>
              <div className="space-y-4">
                {topCompanies.map((company) => (
                  <Card key={company.id} className="flex items-center p-4">
                    <div className="flex-1">
                      <p className="font-bold text-lg">{company.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {company.reportCount} relatos recentes
                      </p>
                    </div>
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/empresa/${company.slug}`}>
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-headline flex items-center">
                <BarChart2 className="mr-3 h-6 w-6 text-primary" />
                Nossos Indicadores
              </h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">O que medimos?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-1">●</span>{" "}
                        <strong>TMR:</strong> Tempo médio sem resolução
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-1">●</span>{" "}
                        <strong>SD:</strong> Casos de silêncio documentado
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-1">●</span>{" "}
                        <strong>TRPE:</strong> % de resolução pós-escalonamento
                      </li>
                    </ul>
                    <p className="text-sm mt-4">
                      Nossos indicadores são calculados com base em dados
                      públicos e relatos de consumidores.
                    </p>
                    <Button asChild variant="link" className="px-0">
                      <Link href="/metodologia">
                        Saiba mais sobre a metodologia
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

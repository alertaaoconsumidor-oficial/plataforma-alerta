import { getCompanyBySlug, getMetricsByCompanyId, getReportsByCompanyId, getNewsByCompanyId, getEventsByCompanyId, getMonthlyReportData } from "@/lib/api";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Building, Clock, FileText, Newspaper, BarChart2, MessageCircle, ExternalLink, User, Calendar } from "lucide-react";
import type { Metadata, ResolvingMetadata } from 'next';
import { KpiOverview } from "@/components/charts/kpi-overview";
import { MonthlyReportsChart } from "@/components/charts/monthly-reports-chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const company = await getCompanyBySlug(params.slug);
  if (!company) {
    return {
      title: 'Empresa não encontrada',
    }
  }
 
  return {
    title: company.name,
    description: `Veja o status, indicadores, relatos e notícias sobre ${company.name}.`,
    openGraph: {
        title: `${company.name} | Alerta ao Consumidor`,
        description: `Acompanhe o histórico de ${company.name} em nosso portal.`,
    },
  }
}

function StatusBadge({ status }: { status: string }) {
    const statusStyles: Record<string, string> = {
        'Em monitoramento': 'bg-blue-100 text-blue-800 border-blue-200',
        'Alto volume de relatos': 'bg-amber-100 text-amber-800 border-amber-200',
        'Sem dados suficientes': 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return <Badge className={`text-base ${statusStyles[status] || 'bg-gray-100'}`}>{status}</Badge>;
}

export default async function CompanyPage({ params }: Props) {
  const company = await getCompanyBySlug(params.slug);

  if (!company) {
    notFound();
  }
  
  const [metrics, reports, news, events, monthlyData] = await Promise.all([
    getMetricsByCompanyId(company.id),
    getReportsByCompanyId(company.id),
    getNewsByCompanyId(company.id),
    getEventsByCompanyId(company.id),
    getMonthlyReportData(company.id),
  ]);

  return (
    <div className="bg-background">
        <div className="container mx-auto px-4 md:px-6 py-12">
            <header className="mb-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <Building className="h-8 w-8 text-muted-foreground" />
                            <h1 className="text-4xl md:text-5xl font-bold font-headline">{company.name}</h1>
                        </div>
                        <p className="text-muted-foreground mt-2 text-lg">CNPJ: {company.cnpj || 'Não informado'}</p>
                    </div>
                     <div className="flex flex-col items-start md:items-end gap-2">
                        <StatusBadge status={company.status} />
                        <p className="text-sm text-muted-foreground">Atualizado em: {new Date(company.updatedAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                </div>
                 <Button asChild className="mt-8 w-full md:w-auto">
                    <Link href={`/enviar-relato?companyId=${company.id}`}>
                        <FileText className="mr-2 h-4 w-4" />
                        Enviar relato sobre esta empresa
                    </Link>
                </Button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <main className="lg:col-span-2 space-y-12">
                    {/* KPIs and Charts */}
                    <section>
                         <h2 className="text-3xl font-bold font-headline mb-6 flex items-center gap-3"><BarChart2 className="h-7 w-7 text-primary" /> Indicadores Chave</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <KpiOverview metrics={metrics} />
                            <MonthlyReportsChart data={monthlyData} />
                         </div>
                    </section>

                    <Separator />

                    {/* Reports */}
                    <section>
                         <h2 className="text-3xl font-bold font-headline mb-6 flex items-center gap-3"><FileText className="h-7 w-7 text-primary" /> Relatos de Consumidores</h2>
                         <div className="space-y-6">
                            {reports.length > 0 ? reports.map(report => (
                                <Card key={report.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                 <CardTitle className="text-xl">Relato sobre: {report.currentStatus}</CardTitle>
                                                 <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                                    <div className="flex items-center gap-1.5"><User className="h-4 w-4" />{report.isAnonymous ? 'Anônimo' : report.publicNameInitials}</div>
                                                    <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{new Date(report.createdAt).toLocaleDateString('pt-BR')}</div>
                                                 </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-card-foreground/80">{report.narrative}</p>
                                    </CardContent>
                                </Card>
                            )) : (
                                <p className="text-muted-foreground">Ainda não há relatos públicos para esta empresa.</p>
                            )}
                         </div>
                    </section>
                    
                    <Separator />
                    
                    {/* News */}
                    <section>
                        <h2 className="text-3xl font-bold font-headline mb-6 flex items-center gap-3"><Newspaper className="h-7 w-7 text-primary" /> Notícias Públicas</h2>
                        <div className="space-y-6">
                            {news.length > 0 ? news.map(item => (
                                <Card key={item.id}>
                                    <CardHeader>
                                        <CardTitle className="text-xl">{item.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground">Fonte: {item.sourceName} - {new Date(item.publishedAt).toLocaleDateString('pt-BR')}</p>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-card-foreground/80 mb-4">{item.excerpt}</p>
                                        <Button asChild variant="outline" size="sm">
                                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                Ler na fonte <ExternalLink className="ml-2 h-4 w-4"/>
                                            </a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )) : (
                                <p className="text-muted-foreground">Nenhuma notícia pública encontrada recentemente.</p>
                            )}
                        </div>
                    </section>
                </main>
                
                {/* Sidebar with Timeline */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-24">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-2xl font-headline"><Clock className="h-6 w-6 text-primary" /> Linha do Tempo</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative space-y-8 pl-6 before:absolute before:inset-y-0 before:w-px before:bg-border before:left-2">
                                    {events.length > 0 ? events.map(event => (
                                        <div key={event.id} className="relative">
                                            <div className="absolute top-1 -left-[29px] h-4 w-4 rounded-full bg-primary border-4 border-background"></div>
                                            <p className="font-semibold">{event.title}</p>
                                            <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString('pt-BR', {day: '2-digit', month: 'long', year: 'numeric'})}</p>
                                            <p className="text-sm mt-1">{event.description}</p>
                                        </div>
                                    )) : (
                                        <p className="text-muted-foreground">Nenhum evento registrado.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </aside>
            </div>
        </div>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RelatedCnpjsDirectory } from "@/features/public-cases/components/related-cnpjs-directory";
import {
  getPublicCompanyProfile,
  getPublicCompanySlugs,
} from "@/features/public-companies/data/company-public-data";

type CompanyCnpjsPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublicCompanySlugs();
}

export async function generateMetadata({
  params,
}: CompanyCnpjsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getPublicCompanyProfile(slug);

  if (!profile) {
    return {
      title: "CNPJs não encontrados | Alerta ao Consumidor",
    };
  }

  return {
    title: `CNPJs de ${profile.company.name} | Alerta ao Consumidor`,
    description: `Consulta pública contextualizada dos CNPJs informados ou relacionados a ${profile.company.name}.`,
  };
}

export default async function CompanyCnpjsPage({
  params,
}: CompanyCnpjsPageProps) {
  const { slug } = await params;
  const profile = getPublicCompanyProfile(slug);

  if (!profile) {
    notFound();
  }

  return (
    <RelatedCnpjsDirectory
      title={`CNPJs de ${profile.company.name}`}
      description={`Área dedicada para consultar CNPJs informados ou relacionados a ${profile.company.name}, com situação cadastral, fonte, conferência e documento oficial quando disponível.`}
      backHref={`/empresa/${profile.company.slug}`}
      backLabel="Voltar para a empresa"
      heroImageSrc={profile.heroImageUrl}
      items={profile.legalEntities}
    />
  );
}

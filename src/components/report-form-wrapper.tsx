"use client"

import { useSearchParams } from "next/navigation";
import { ReportForm } from "./report-form";
import type { Company } from "@/lib/types";

export function ReportFormWrapper({ companies }: { companies: Company[] }) {
    const searchParams = useSearchParams();
    const companyId = searchParams.get("companyId");

    return <ReportForm companies={companies} companyId={companyId} />;
}

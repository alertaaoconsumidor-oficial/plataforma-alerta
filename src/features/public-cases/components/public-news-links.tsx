"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Newspaper } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type PublicNewsReference = {
  id: string;
  title: string;
  sourceName: string;
  url: string;
  thumbnailUrl: string;
  publishedAt: string;
  accessedAt: string;
  excerpt: string;
};

type PublicNewsLinksProps = {
  items: PublicNewsReference[];
};

export function PublicNewsLinks({ items }: PublicNewsLinksProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, 4);

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-bold">
            <Newspaper className="h-7 w-7 text-primary" />
            Reportagens e fontes públicas
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Links externos organizados para leitura contextual do CASO RAZOR,
            com fonte e data de acesso.
          </p>
        </div>
        {!expanded ? (
          <Button variant="outline" onClick={() => setExpanded(true)}>
            Ver mais reportagens
          </Button>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {visibleItems.map((item) => (
          <Card
            key={item.id}
            className="group overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
          >
            <CardContent className="p-0">
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <Image
                  src={item.thumbnailUrl}
                  alt={`Miniatura da fonte ${item.sourceName}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {item.sourceName}
                </p>
              </div>
              <div className="min-w-0 p-5">
                <h3 className="line-clamp-2 text-lg font-bold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {item.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span>Publicação: {item.publishedAt}</span>
                  <span>Acesso em: {item.accessedAt}</span>
                </div>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href={item.url} target="_blank" rel="noreferrer">
                    Acessar fonte <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

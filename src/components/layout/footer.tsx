import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const platformLinks = [
  { href: "/", label: "Início" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#empresas", label: "Empresas" },
  { href: "/#indicadores", label: "Indicadores" },
  { href: "/casos/razor", label: "Caso Razor" },
];

const institutionalLinks = [
  { href: "/aviso-legal", label: "Sobre" },
  { href: "/metodologia", label: "Metodologia" },
  { href: "/usuario", label: "Equipe" },
  { href: "/aviso-legal", label: "Transparência" },
  { href: "/casos/razor#estatisticas", label: "Relatórios públicos" },
];

const helpLinks = [
  { href: "/contato", label: "Perguntas frequentes" },
  { href: "/enviar-relato", label: "Como enviar relato" },
  { href: "/golpes", label: "Dicas de segurança" },
  { href: "/contato", label: "Fale conosco" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0d0d0d] text-white">
      <section className="py-12">
        <div className="container mx-auto grid gap-10 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-[1.35fr_0.85fr_0.95fr_0.95fr_1.25fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/chatbot-icon.svg"
                alt=""
                width={48}
                height={48}
                className="object-contain"
              />
              <div className="text-lg font-bold uppercase leading-none">
                <p>Alerta ao</p>
                <p>Consumidor</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/62">
              Informação responsável para decisões de consumo mais seguras.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink
                label="Instagram"
                href="https://www.instagram.com/alertaaoconsumidor"
              >
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink
                label="Facebook"
                href="https://www.facebook.com/alertaaoconsumidor"
              >
                <Facebook className="h-4 w-4" />
              </SocialLink>
              <SocialLink label="X" href="https://x.com/alertaaoconsumidor">
                <Twitter className="h-4 w-4" />
              </SocialLink>
              <SocialLink
                label="LinkedIn"
                href="https://www.linkedin.com/company/alerta-ao-consumidor"
              >
                <Linkedin className="h-4 w-4" />
              </SocialLink>
              <SocialLink
                label="YouTube"
                href="https://www.youtube.com/@alertaaoconsumidor"
              >
                <Youtube className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <FooterColumn title="Plataforma" links={platformLinks} />
          <FooterColumn title="Institucional" links={institutionalLinks} />
          <FooterColumn title="Ajuda" links={helpLinks} />

          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white/50">
              Receba alertas e novidades
            </h3>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="h-11 border-white/10 bg-white text-foreground"
              />
              <Button className="h-11 px-5">Assinar</Button>
            </div>
            <p className="mt-3 text-xs leading-5 text-white/45">
              🔒 Respeitamos sua privacidade. Você pode cancelar quando quiser.
            </p>
          </div>
        </div>

        <div className="container mx-auto mt-10 border-t border-white/10 px-4 pt-6 text-center text-xs text-white/35 md:px-6">
          © {currentYear} Alerta ao Consumidor - informação responsável para
          decisões mais seguras.
        </div>
      </section>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white/50">
        {title}
      </h3>
      <ul className="space-y-3 text-sm font-medium text-white/62">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link href={link.href} className="hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-primary hover:text-primary"
    >
      {children}
    </Link>
  );
}

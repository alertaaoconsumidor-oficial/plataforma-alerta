import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/casos/razor", label: "Caso Razor" },
  { href: "/metodologia", label: "Metodologia" },
  { href: "/golpes", label: "Golpes" },
  { href: "/cdc", label: "CDC" },
  { href: "/aviso-legal", label: "Aviso Legal" },
  { href: "/contato", label: "Contato" },
];

const institutionalLinks = [
  { href: "/aviso-legal", label: "Sobre a plataforma" },
  { href: "/metodologia", label: "Como funciona" },
  { href: "/usuario", label: "Área do usuário" },
  { href: "/admin", label: "Administração" },
  { href: "/aviso-legal", label: "Termos de uso" },
  { href: "/aviso-legal", label: "Privacidade" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <section className="bg-primary py-5 text-primary-foreground">
        <div className="container mx-auto flex flex-col gap-4 px-4 md:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-foreground text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Receba alertas e novidades</h2>
              <p className="text-sm text-primary-foreground/75">
                Assine nossa newsletter e fique informado.
              </p>
            </div>
          </div>
          <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              className="h-12 border-primary-foreground/20 bg-white text-foreground"
            />
            <Button variant="secondary" className="h-12 px-8">
              Assinar
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] py-12 text-white">
        <div className="container mx-auto grid gap-10 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-[1.4fr_0.85fr_1fr_1.15fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Image
                  src="/chatbot-icon.svg"
                  alt=""
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>
              <div className="text-lg font-bold uppercase leading-none">
                <p>Alerta ao</p>
                <p>Consumidor</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
              Informação é a sua melhor defesa. Transparência e segurança para
              todos.
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
              <SocialLink
                label="LinkedIn"
                href="https://www.linkedin.com/company/alerta-ao-consumidor"
              >
                <Linkedin className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <FooterColumn title="Navegação" links={navLinks} />
          <FooterColumn title="Institucional" links={institutionalLinks} />

          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white/50">
              Transparência
            </h3>
            <p className="text-sm leading-6 text-white/62">
              Acesse relatórios, indicadores e orientações atualizadas da
              plataforma.
            </p>
            <Link
              href="/casos/razor#estatisticas"
              className="mt-4 inline-flex items-center text-sm font-bold text-primary hover:underline"
            >
              Ver relatórios
            </Link>
          </div>
        </div>

        <div className="container mx-auto mt-10 border-t border-white/10 px-4 pt-6 text-center text-xs text-white/35 md:px-6">
          © {currentYear} Alerta ao Consumidor. Todos os direitos reservados.
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

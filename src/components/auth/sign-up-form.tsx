"use client";

import Link from "next/link";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Eye, EyeOff, Mail, Phone, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="signup-name"
          label="Nome completo"
          placeholder="Seu nome"
          icon={UserRound}
        />
        <Field
          id="signup-phone"
          label="Telefone"
          placeholder="(65) 99999-0000"
          icon={Phone}
        />
      </div>

      <Field
        id="signup-email"
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        icon={Mail}
      />

      <div className="space-y-2">
        <Label htmlFor="signup-password">Senha</Label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="Crie uma senha segura"
            className="h-12 bg-muted/40 pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-primary/[0.08] p-4">
        <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
          <Checkbox id="privacy-acceptance" className="mt-1" />
          <span>
            Confirmo que li os termos de uso, a política de privacidade e
            compreendo que documentos enviados serão tratados em área privada
            para moderação e organização do relato.
          </span>
        </label>
      </div>

      <Button type="button" className="h-12 w-full font-bold">
        Criar cadastro seguro
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Já possui conta?{" "}
        <Link href="/entrar" className="font-bold text-foreground hover:text-primary">
          Entrar
        </Link>
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  icon: Icon,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  icon: LucideIcon;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="h-12 bg-muted/40 pl-10"
        />
      </div>
    </div>
  );
}

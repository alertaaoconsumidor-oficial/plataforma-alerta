"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          className="h-12 bg-white transition hover:-translate-y-0.5 hover:border-primary"
        >
          <GoogleMark />
          Entrar com Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-12 bg-white transition hover:-translate-y-0.5 hover:border-primary"
        >
          <ShieldCheck className="h-4 w-4 text-primary" />
          Gov.br futuro
        </Button>
      </div>

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 font-medium uppercase tracking-[0.18em] text-muted-foreground">
            ou acesse com e-mail
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signin-email">E-mail</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="signin-email"
            type="email"
            placeholder="seu@email.com"
            className="h-12 bg-muted/40 pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signin-password">Senha</Label>
        <div className="relative">
          <Input
            id="signin-password"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
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

      <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-muted-foreground">
          <Checkbox id="remember-user" />
          Manter conectado
        </label>
        <Link href="/contato" className="font-semibold text-foreground hover:text-primary">
          Esqueci minha senha
        </Link>
      </div>

      <Button type="button" className="h-12 w-full font-bold">
        Entrar na área segura
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Ainda não tem cadastro?{" "}
        <Link href="/cadastro" className="font-bold text-foreground hover:text-primary">
          Criar conta
        </Link>
      </p>
    </form>
  );
}

function GoogleMark() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.171 10.194c0-.613-.055-1.203-.157-1.768H10v3.34h4.579a3.914 3.914 0 0 1-1.698 2.568v2.135h2.75c1.607-1.48 2.54-3.659 2.54-6.275Z"
        fill="#4285F4"
      />
      <path
        d="M10 18.5c2.295 0 4.22-.76 5.63-2.031l-2.75-2.135c-.76.51-1.734.812-2.88.812-2.215 0-4.09-1.495-4.76-3.505H2.4v2.205A8.497 8.497 0 0 0 10 18.5Z"
        fill="#34A853"
      />
      <path
        d="M5.24 11.641A5.108 5.108 0 0 1 4.972 10c0-.568.098-1.12.268-1.641V6.154H2.4A8.497 8.497 0 0 0 1.5 10c0 1.37.328 2.663.9 3.846l2.84-2.205Z"
        fill="#FBBC05"
      />
      <path
        d="M10 4.854c1.248 0 2.37.43 3.253 1.273l2.44-2.44C14.216 2.31 12.29 1.5 10 1.5a8.497 8.497 0 0 0-7.6 4.654l2.84 2.205C5.91 6.349 7.785 4.854 10 4.854Z"
        fill="#EA4335"
      />
    </svg>
  );
}

"use client";

import { ShieldCheck, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type ProfileSettingsDialogProps = {
  variant: "admin" | "user";
};

export function ProfileSettingsDialog({ variant }: ProfileSettingsDialogProps) {
  const isAdmin = variant === "admin";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white">
          <UserRound className="mr-2 h-4 w-4" />
          Configurar perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Cadastro completo do perfil</DialogTitle>
          <DialogDescription>
            Estrutura pronta para autenticação, banco de dados, preferências e
            trilha de auditoria.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-2">
          <section className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
            <Field label="Nome completo" id={`${variant}-name`} value={isAdmin ? "Dimas Webdev" : "Consumidor Teste"} />
            <Field label="CPF" id={`${variant}-cpf`} value="000.000.000-00" />
            <Field label="E-mail" id={`${variant}-email`} value={isAdmin ? "admin@alertaaoconsumidor.com.br" : "consumidor@email.com"} />
            <Field label="Telefone" id={`${variant}-phone`} value="(65) 99999-0000" />
            <Field label="Cidade" id={`${variant}-city`} value="Cuiabá" />
            <Field label="UF" id={`${variant}-uf`} value="MT" />
          </section>

          <section className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
            {isAdmin ? (
              <>
                <div className="space-y-2">
                  <Label>Perfil de acesso</Label>
                  <Select defaultValue="admin">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador geral</SelectItem>
                      <SelectItem value="moderador">Moderador</SelectItem>
                      <SelectItem value="juridico">Jurídico</SelectItem>
                      <SelectItem value="suporte">Suporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Field label="Cargo" id="admin-role" value="Coordenação da plataforma" />
                <Field label="Equipe" id="admin-team" value="Moderação e governança" />
                <Field label="Documento funcional" id="admin-doc" value="ADM-2026-001" />
              </>
            ) : (
              <>
                <Field label="Relato principal" id="user-case" value="CASO RAZOR" />
                <Field label="CNPJ relacionado" id="user-cnpj" value="12.345.678/0001-90" />
                <Field label="Canal preferencial" id="user-channel" value="E-mail e painel" />
                <Field label="Data de nascimento" id="user-birth" value="01/01/1990" />
              </>
            )}
          </section>

          <section className="space-y-2 rounded-lg border p-4">
            <Label htmlFor={`${variant}-address`}>Endereço completo</Label>
            <Textarea
              id={`${variant}-address`}
              defaultValue="Rua Exemplo, 100 - Bairro Centro - Cuiabá/MT - CEP 78000-000"
            />
          </section>

          <section className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
            <Preference
              title={isAdmin ? "Autenticação em dois fatores" : "Receber alertas do caso"}
              description={isAdmin ? "Obrigatória para perfis administrativos." : "Notificações sobre validação e resposta da empresa."}
            />
            <Preference
              title="Aceite de privacidade"
              description="Confirma ciência sobre dados pessoais, anexos e uso institucional."
            />
          </section>
        </div>

        <DialogFooter>
          <Button type="button">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Salvar cadastro mockado
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  id,
  value,
}: {
  label: string;
  id: string;
  value: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} defaultValue={value} />
    </div>
  );
}

function Preference({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg bg-muted/50 p-4">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch defaultChecked />
    </div>
  );
}

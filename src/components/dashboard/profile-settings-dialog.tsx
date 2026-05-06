"use client";

import {
  BellRing,
  ClipboardCheck,
  Fingerprint,
  IdCard,
  KeyRound,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type ProfileSettingsDialogProps = {
  variant: "admin" | "user";
};

const userAuditEvents = [
  "Cadastro criado em ambiente demonstrativo.",
  "Consentimento LGPD marcado para relatos públicos moderados.",
  "Preferência de anonimato configurada para relatos futuros.",
];

const adminAuditEvents = [
  "Perfil administrativo criado para homologação.",
  "Escopo de acesso vinculado à moderação e governança.",
  "Autenticação em dois fatores prevista como obrigatória.",
];

export function ProfileSettingsDialog({ variant }: ProfileSettingsDialogProps) {
  const isAdmin = variant === "admin";
  const auditEvents = isAdmin ? adminAuditEvents : userAuditEvents;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white shadow-sm">
          <UserRound className="mr-2 h-4 w-4" />
          Configurar perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="custom-scrollbar max-h-[92vh] overflow-y-auto p-0 sm:max-w-5xl">
        <DialogHeader className="border-b bg-[#111111] px-6 py-5 text-white">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <IdCard className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Cadastro seguro
                </p>
                <DialogTitle className="mt-2 text-2xl">
                  Perfil {isAdmin ? "administrativo" : "do consumidor"}
                </DialogTitle>
                <DialogDescription className="mt-2 max-w-2xl text-white/70">
                  Estrutura preparada para autenticação, banco de dados,
                  preferências, consentimentos e trilha de auditoria.
                </DialogDescription>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">
                Completude
              </p>
              <p className="mt-1 text-2xl font-extrabold">86%</p>
              <Progress value={86} className="mt-3 h-2 bg-white/15" />
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-5">
          <Tabs defaultValue="cadastro" className="space-y-5">
            <TabsList className="grid h-auto w-full grid-cols-2 rounded-2xl bg-muted p-1 md:grid-cols-4">
              <TabsTrigger value="cadastro" className="rounded-xl">
                Cadastro
              </TabsTrigger>
              <TabsTrigger value="acesso" className="rounded-xl">
                Acesso
              </TabsTrigger>
              <TabsTrigger value="preferencias" className="rounded-xl">
                Preferências
              </TabsTrigger>
              <TabsTrigger value="auditoria" className="rounded-xl">
                Auditoria
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cadastro" className="space-y-5">
              <section className="grid gap-4 rounded-2xl border bg-white p-4 md:grid-cols-2">
                <Field
                  label="Nome completo"
                  id={`${variant}-name`}
                  value={isAdmin ? "Dimas Webdev" : "Consumidor Teste"}
                />
                <Field label="CPF" id={`${variant}-cpf`} value="000.000.000-00" />
                <Field
                  label="E-mail"
                  id={`${variant}-email`}
                  value={
                    isAdmin
                      ? "admin@alertaaoconsumidor.com.br"
                      : "consumidor@email.com"
                  }
                />
                <Field label="Telefone" id={`${variant}-phone`} value="(65) 99999-0000" />
                <Field label="Cidade" id={`${variant}-city`} value="Cuiabá" />
                <Field label="UF" id={`${variant}-uf`} value="MT" />
              </section>

              <section className="grid gap-4 rounded-2xl border bg-white p-4 md:grid-cols-2">
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

              <section className="space-y-2 rounded-2xl border bg-white p-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <Label htmlFor={`${variant}-address`}>Endereço completo</Label>
                </div>
                <Textarea
                  id={`${variant}-address`}
                  defaultValue="Rua Exemplo, 100 - Bairro Centro - Cuiabá/MT - CEP 78000-000"
                />
              </section>
            </TabsContent>

            <TabsContent value="acesso" className="grid gap-5 lg:grid-cols-[1fr_360px]">
              <section className="space-y-4 rounded-2xl border bg-white p-4">
                <div className="flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-primary" />
                  <p className="font-bold">Segurança de acesso</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="E-mail de recuperação" id={`${variant}-recovery`} value="recuperacao@email.com" />
                  <Field label="Telefone de recuperação" id={`${variant}-recovery-phone`} value="(65) 98888-0000" />
                  <Field label="Nova senha" id={`${variant}-password`} value="********" type="password" />
                  <Field label="Confirmar senha" id={`${variant}-password-confirm`} value="********" type="password" />
                </div>
                <Preference
                  title="Autenticação em dois fatores"
                  description={
                    isAdmin
                      ? "Obrigatória para perfis administrativos."
                      : "Recomendada para proteger documentos e dossiês."
                  }
                />
              </section>

              <section className="space-y-3 rounded-2xl border bg-muted/30 p-4">
                <p className="flex items-center gap-2 font-bold">
                  <Fingerprint className="h-5 w-5 text-primary" />
                  Sessões recentes
                </p>
                {["Windows - Cuiabá/MT", "Chrome - acesso atual", "Mobile - último login"].map(
                  (item) => (
                    <div key={item} className="rounded-xl border bg-white p-3">
                      <p className="text-sm font-semibold">{item}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Registro demonstrativo para futura auditoria.
                      </p>
                    </div>
                  )
                )}
              </section>
            </TabsContent>

            <TabsContent value="preferencias" className="grid gap-4 md:grid-cols-2">
              <Preference
                title={isAdmin ? "Alertas de moderação" : "Receber alertas do caso"}
                description={
                  isAdmin
                    ? "Notificar novos relatos, denúncias sensíveis e direitos de resposta."
                    : "Notificações sobre validação, resposta da empresa e novas etapas."
                }
                icon={BellRing}
              />
              <Preference
                title="Aceite de privacidade"
                description="Confirma ciência sobre dados pessoais, anexos e uso institucional."
                icon={LockKeyhole}
              />
              <Preference
                title="Relatórios por e-mail"
                description="Enviar resumos periódicos de atualizações relevantes."
                icon={ClipboardCheck}
              />
              <Preference
                title="Anonimato em relatos públicos"
                description="Permitir publicação moderada sem exibir nome completo."
                icon={ShieldCheck}
              />
            </TabsContent>

            <TabsContent value="auditoria" className="grid gap-5 lg:grid-cols-[1fr_340px]">
              <section className="space-y-3 rounded-2xl border bg-white p-4">
                <p className="font-bold">Linha de auditoria</p>
                {auditEvents.map((event, index) => (
                  <div key={event} className="flex gap-3 rounded-xl border bg-muted/30 p-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6">{event}</p>
                  </div>
                ))}
              </section>

              <section className="rounded-2xl border border-primary/30 bg-primary/10 p-4">
                <p className="font-bold">Pronto para banco</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  O formulário separa identidade, acesso, preferências e logs,
                  facilitando a futura modelagem em tabelas de usuário,
                  consentimentos e auditoria.
                </p>
                <Badge className="mt-4">Mock de homologação</Badge>
              </section>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="border-t bg-muted/30 px-6 py-4">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
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
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} defaultValue={value} type={type} />
    </div>
  );
}

function Preference({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border bg-white p-4">
      <div className="flex gap-3">
        {Icon ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15">
            <Icon className="h-4 w-4 text-primary" />
          </span>
        ) : null}
        <div>
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <Switch defaultChecked />
    </div>
  );
}

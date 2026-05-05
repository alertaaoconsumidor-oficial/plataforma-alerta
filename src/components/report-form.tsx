"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  FileArchive,
  FileText,
  LockKeyhole,
  MapPin,
  ShieldCheck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { Company } from "@/lib/types"

const CASE_RAZOR_ID = "case-razor"

const brazilStates = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]

const amountRanges = [
  "Até R$ 500",
  "R$ 500 a R$ 2 mil",
  "R$ 2 mil a R$ 5 mil",
  "R$ 5 mil a R$ 10 mil",
  "Acima de R$ 10 mil",
  "Não se aplica",
]

const problemTypes = [
  "Produto ou serviço não entregue",
  "Reembolso ou estorno não realizado",
  "Cobrança indevida",
  "Garantia, defeito ou suporte",
  "Contrato ou promessa comercial divergente",
  "Empresa sem resposta documentada",
  "Outro problema de consumo",
]

const contactChannels = [
  "E-mail",
  "WhatsApp",
  "Telefone/SAC",
  "Chat ou formulário do site",
  "Loja física",
  "Consumidor.gov.br",
  "Procon",
  "Outro canal",
]

const currentStatuses = [
  "Aguardando resposta da empresa",
  "Sem resposta documentada",
  "Resposta parcial ou insuficiente",
  "Produto/serviço ainda não entregue",
  "Pedido cancelado sem estorno",
  "Resolvido após insistência",
  "Em organização coletiva",
]

const evidenceTypes = [
  "Comprovante de pagamento",
  "Pedido, contrato ou proposta",
  "Prints de conversas",
  "Protocolos de atendimento",
  "E-mails enviados ou recebidos",
  "Nota fiscal ou comprovante fiscal",
  "Notificação extrajudicial ou órgão público",
]

const formSchema = z.object({
  companyId: z.string({ required_error: "Selecione a empresa ou caso." }),
  informedCnpj: z.string().optional(),
  city: z.string().min(2, "Informe a cidade."),
  state: z.string().min(2, "Selecione a UF."),
  purchaseDate: z
    .string()
    .min(1, "Informe a data da compra ou contratação.")
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Informe uma data válida.",
    }),
  promisedDeadline: z.string().optional(),
  amountRange: z.string().min(2, "Informe a faixa de valor."),
  problemType: z.string().min(2, "Selecione o tipo de problema."),
  channel: z.string().min(2, "Informe o canal usado."),
  protocol: z.string().optional(),
  currentStatus: z.string().min(2, "Selecione o status atual."),
  narrative: z
    .string()
    .min(80, "Descreva o ocorrido com pelo menos 80 caracteres."),
  resolutionAttempts: z
    .string()
    .min(30, "Informe as tentativas de solução com pelo menos 30 caracteres."),
  evidenceTypes: z
    .array(z.string())
    .min(1, "Selecione pelo menos um tipo de evidência disponível."),
  wantsUploadInvite: z.boolean().default(true),
  isAnonymous: z.boolean().default(true),
  terms: z.boolean().refine((value) => value === true, {
    message: "Você deve concordar com o Aviso Legal.",
  }),
  privacy: z.boolean().refine((value) => value === true, {
    message: "Confirme a ciência sobre proteção de dados.",
  }),
})

type ReportFormValues = z.infer<typeof formSchema>

type ReportFormProps = {
  companies: Company[]
}

export function ReportForm({ companies }: ReportFormProps) {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const companyId = searchParams.get("companyId")
  const caseParam = searchParams.get("caso")

  const selectableCompanies = [
    {
      id: CASE_RAZOR_ID,
      name: "CASO RAZOR",
      cnpj: "12.345.678/0001-90",
      category: "Frente solidária informativa",
    },
    ...companies.map((company) => ({
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      category: company.category,
    })),
  ]

  const initialCompanyId =
    companyId || (caseParam === "razor" ? CASE_RAZOR_ID : undefined)

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyId: initialCompanyId,
      informedCnpj: "",
      city: "",
      state: "",
      purchaseDate: "",
      promisedDeadline: "",
      amountRange: "",
      problemType: "",
      channel: "",
      protocol: "",
      currentStatus: "",
      narrative: "",
      resolutionAttempts: "",
      evidenceTypes: [],
      wantsUploadInvite: true,
      isAnonymous: true,
      terms: false,
      privacy: false,
    },
  })

  useEffect(() => {
    if (initialCompanyId) {
      form.setValue("companyId", initialCompanyId)
    }
  }, [form, initialCompanyId])

  const selectedEvidence = form.watch("evidenceTypes")
  const selectedCompanyId = form.watch("companyId")
  const selectedCompany = selectableCompanies.find(
    (company) => company.id === selectedCompanyId
  )

  function onSubmit(values: ReportFormValues) {
    console.log(values)
    toast({
      title: "Relato enviado para análise",
      description:
        "Recebemos sua contribuição. A equipe fará a triagem antes de qualquer publicação.",
    })
    form.reset({
      companyId: initialCompanyId,
      informedCnpj: "",
      city: "",
      state: "",
      purchaseDate: "",
      promisedDeadline: "",
      amountRange: "",
      problemType: "",
      channel: "",
      protocol: "",
      currentStatus: "",
      narrative: "",
      resolutionAttempts: "",
      evidenceTypes: [],
      wantsUploadInvite: true,
      isAnonymous: true,
      terms: false,
      privacy: false,
    })
  }

  return (
    <Card className="overflow-hidden border-0 shadow-xl">
      <div className="border-b bg-[#111111] px-6 py-5 text-white md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="mb-3 bg-primary text-primary-foreground">
              Relato estruturado
            </Badge>
            <h2 className="text-2xl font-bold">Conte o que aconteceu</h2>
            <p className="mt-1 text-sm leading-6 text-white/62">
              Organize fatos, datas, valores, tentativas de solução e evidências
              disponíveis. Dados pessoais não são publicados automaticamente.
            </p>
          </div>
          <div className="rounded-lg border border-white/12 bg-white/[0.05] px-4 py-3 text-sm">
            <p className="font-bold text-primary">Triagem antes da publicação</p>
            <p className="mt-1 text-white/58">Moderação, cautela e contexto.</p>
          </div>
        </div>
      </div>

      <CardContent className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
            <FormSection
              step="1"
              title="Empresa, caso e localização"
              description="Estas informações alimentam páginas públicas, mapa geográfico e indicadores por empresa."
              icon={Building2}
            >
              <div className="grid gap-5">
                <FormField
                  control={form.control}
                  name="companyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa ou caso relacionado</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a empresa ou o caso" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectableCompanies.map((company) => (
                            <SelectItem key={company.id} value={company.id}>
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedCompany ? (
                        <FormDescription>
                          {selectedCompany.category}
                          {selectedCompany.cnpj
                            ? ` · CNPJ informado: ${selectedCompany.cnpj}`
                            : ""}
                        </FormDescription>
                      ) : null}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-5 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="informedCnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ informado na compra</FormLabel>
                        <FormControl>
                          <Input placeholder="00.000.000/0000-00" {...field} />
                        </FormControl>
                        <FormDescription>Opcional, se você tiver.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Cuiabá" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UF</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="UF" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brazilStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </FormSection>

            <Separator />

            <FormSection
              step="2"
              title="Fato de consumo"
              description="Informe valores, datas e canais para que o relato possa ser analisado com precisão."
              icon={FileText}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="purchaseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data da compra ou contratação</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="promisedDeadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prazo prometido</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        Opcional, quando houver prazo de entrega ou resposta.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amountRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Faixa de valor aproximado</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma faixa" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {amountRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="problemType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo principal de problema</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o problema" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {problemTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="channel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Canal usado para tentar resolver</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o canal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {contactChannels.map((channel) => (
                            <SelectItem key={channel} value={channel}>
                              {channel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="protocol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Protocolo ou referência</FormLabel>
                      <FormControl>
                        <Input placeholder="Número de pedido, protocolo ou OS" {...field} />
                      </FormControl>
                      <FormDescription>Opcional, mas ajuda muito.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>

            <Separator />

            <FormSection
              step="3"
              title="Descrição e status atual"
              description="Escreva em linguagem objetiva, sem ofensas e sem incluir CPF, telefone, endereço ou documentos."
              icon={MapPin}
            >
              <div className="grid gap-5">
                <FormField
                  control={form.control}
                  name="currentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status atual do problema</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status atual" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currentStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="narrative"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descreva o ocorrido</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Informe o que foi comprado ou contratado, quando aconteceu, qual promessa foi feita, o que não foi cumprido e qual é a situação atual."
                          className="min-h-[160px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Mínimo de 80 caracteres. Não inclua dados pessoais.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="resolutionAttempts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tentativas de solução</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Liste canais usados, datas aproximadas, respostas recebidas e se houve protocolo, contestação, Procon ou Consumidor.gov.br."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>

            <Separator />

            <FormSection
              step="4"
              title="Evidências, privacidade e consentimentos"
              description="A plataforma precisa saber quais evidências existem, mas documentos privados ficarão em fluxo restrito."
              icon={FileArchive}
            >
              <FormField
                control={form.control}
                name="evidenceTypes"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Quais evidências você possui?</FormLabel>
                      <FormDescription>
                        Selecione os tipos disponíveis. O upload será tratado em
                        área privada.
                      </FormDescription>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {evidenceTypes.map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="evidenceTypes"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4 transition hover:border-primary/60 hover:bg-primary/5">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="cursor-pointer text-sm font-medium leading-5">
                                  {item}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="rounded-lg border border-primary/35 bg-primary/10 p-4 text-sm leading-6">
                <div className="flex gap-3">
                  <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-bold">Documentos ficam em camada privada</p>
                    <p className="mt-1 text-muted-foreground">
                      Nenhum documento, print, comprovante, CPF, endereço,
                      telefone ou e-mail será exibido publicamente sem etapa
                      específica de moderação e autorização.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="wantsUploadInvite"
                  render={({ field }) => (
                    <ConsentBox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title="Quero ser avisado quando o upload privado for liberado"
                      description="O upload será conectado à área logada, com controle de acesso e uso para dossiê."
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="isAnonymous"
                  render={({ field }) => (
                    <ConsentBox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title="Publicar eventual amostra de forma anônima"
                      description="Se publicado, o relato será moderado e exibido sem nome completo ou dados pessoais."
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <ConsentBox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title="Estou ciente de que não devo inserir dados pessoais sensíveis no texto"
                      description="Documentos, CPF, endereço, telefone, e-mail e dados de terceiros não devem ser enviados em campo aberto."
                      required
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem>
                      <ConsentBox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        title="Declaro que as informações são verdadeiras e concordo com o Aviso Legal"
                        description={
                          <>
                            Leia o{" "}
                            <Link
                              href="/aviso-legal"
                              className="font-bold text-primary underline"
                            >
                              Aviso Legal
                            </Link>{" "}
                            antes de enviar.
                          </>
                        }
                        required
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>

            <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <p>
                  O envio não representa conclusão sobre responsabilidade da
                  empresa. O relato entrará em triagem e poderá ser ajustado para
                  linguagem factual, proteção de dados e contexto jurídico.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t pt-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p>
                  Selecionados:{" "}
                  <span className="font-bold text-foreground">
                    {selectedEvidence.length}
                  </span>{" "}
                  tipo(s) de evidência.
                </p>
              </div>
              <Button type="submit" size="lg" className="md:min-w-[260px]">
                Enviar relato para análise
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

function FormSection({
  step,
  title,
  description,
  icon: Icon,
  children,
}: {
  step: string
  title: string
  description: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
            Etapa {step}
          </p>
          <h3 className="mt-1 text-xl font-bold">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      {children}
    </section>
  )
}

function ConsentBox({
  checked,
  onCheckedChange,
  title,
  description,
  required = false,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  title: string
  description: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4 shadow-sm transition hover:border-primary/60 hover:bg-primary/5">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <div className="space-y-1 leading-none">
        <FormLabel className="cursor-pointer">
          {title}
          {required ? <span className="text-primary"> *</span> : null}
        </FormLabel>
        <FormDescription>{description}</FormDescription>
      </div>
    </div>
  )
}

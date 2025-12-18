"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect } from "react"
import { useSearchParams } from 'next/navigation'

import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import type { Company } from "@/lib/types"
import Link from "next/link"

const formSchema = z.object({
  companyId: z.string({ required_error: "Por favor, selecione uma empresa." }),
  purchaseDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Por favor, insira uma data de compra válida.",
  }),
  amountRange: z.string().min(2, "Informe o valor aproximado."),
  narrative: z.string().min(50, "Descreva sua experiência com pelo menos 50 caracteres."),
  channel: z.string().min(2, "Informe o canal de contato."),
  isAnonymous: z.boolean().default(false),
  evidence: z.any().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "Você deve concordar com os termos.",
  }),
})

type ReportFormProps = {
    companies: Company[];
}

export function ReportForm({ companies }: ReportFormProps) {
  const { toast } = useToast();
  const searchParams = useSearchParams()
  const companyId = searchParams.get('companyId')
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyId: companyId || undefined,
      isAnonymous: false,
      terms: false,
    },
  })

  useEffect(() => {
    if (companyId) {
      form.setValue("companyId", companyId);
    }
  }, [companyId, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Relato Enviado para Moderação!",
      description: "Agradecemos sua contribuição. Seu relato será analisado por nossa equipe em breve.",
    })
    form.reset()
  }

  return (
    <div className="p-8 rounded-lg border bg-card text-card-foreground shadow-sm">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Qual é a empresa?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione a empresa relacionada ao seu relato" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {companies.map(company => (
                        <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />

            <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="purchaseDate"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Data da compra/contratação</FormLabel>
                    <FormControl>
                        <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="amountRange"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Valor aproximado</FormLabel>
                    <FormControl>
                        <Input placeholder="Ex: R$ 500,00" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
             <FormField
                control={form.control}
                name="channel"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Canal de contato utilizado</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Qual canal você usou para tentar resolver?" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="email">E-mail</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="site">Chat do Site / Formulário</SelectItem>
                            <SelectItem value="telefone">Telefone (SAC)</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
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
                    placeholder="Seja factual e objetivo. Informe o que aconteceu, as datas, os protocolos (se houver) e qual o status atual do seu problema."
                    className="min-h-[150px]"
                    {...field}
                    />
                </FormControl>
                <FormDescription>
                    Mínimo de 50 caracteres. Não inclua dados pessoais.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            
            <FormField
            control={form.control}
            name="evidence"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Anexar evidência (opcional)</FormLabel>
                <FormControl>
                    <Input type="file" {...field} />
                </FormControl>
                <FormDescription>
                    Nota fiscal, prints de conversas, e-mails. O arquivo é privado e não será publicado.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="isAnonymous"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                <FormControl>
                    <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                </FormControl>
                <div className="space-y-1 leading-none">
                    <FormLabel>
                    Publicar relato de forma anônima
                    </FormLabel>
                    <FormDescription>
                    Se marcado, seu nome não será exibido. Usaremos apenas suas iniciais se você não marcar.
                    </FormDescription>
                </div>
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                    <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                </FormControl>
                 <div className="space-y-1 leading-none">
                    <FormLabel>
                    Declaro que as informações são verdadeiras e concordo com os termos.
                    </FormLabel>
                    <FormDescription>
                       Leia nosso <Link href="/aviso-legal" className="text-primary underline">Aviso Legal</Link>.
                    </FormDescription>
                    <FormMessage />
                </div>
                </FormItem>
            )}
            />


            <Button type="submit" size="lg" className="w-full">Enviar Relato para Análise</Button>
        </form>
        </Form>
    </div>
  )
}
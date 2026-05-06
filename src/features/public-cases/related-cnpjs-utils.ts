export function getCnpjAnchorId(cnpj: string) {
  return `cnpj-${cnpj.replace(/\D/g, "")}`;
}

import type { ConfigSite } from '@/types/strapi';

export type CartItem = {
  produtoId: number;
  slug: string;
  nome: string;
  preco: number;
  fotoUrl?: string | null;
  customizacao: {
    cor_desejada?: string;
    tamanho_preferencia?: string;
    acabamento?: string;
    categoria?: Record<string, string>;
    observacoes?: string;
  };
};

function formatCustomizacao(c: CartItem['customizacao']): string {
  const lines: string[] = [];
  if (c.cor_desejada) lines.push(`  cor desejada: ${c.cor_desejada}`);
  if (c.tamanho_preferencia) lines.push(`  tamanho: ${c.tamanho_preferencia}`);
  if (c.acabamento) lines.push(`  acabamento: ${c.acabamento}`);
  if (c.categoria) {
    for (const [k, v] of Object.entries(c.categoria)) {
      if (v) lines.push(`  ${k}: ${v}`);
    }
  }
  if (c.observacoes) lines.push(`  observações: ${c.observacoes}`);
  return lines.join('\n');
}

export function buildItemBlock(item: CartItem, siteUrl: string): string {
  const url = `${siteUrl}/pecas/${item.slug}`;
  const custom = formatCustomizacao(item.customizacao);
  const parts = [
    `*${item.nome}* — R$ ${item.preco}`,
    url,
  ];
  if (custom) parts.push(custom);
  return parts.join('\n');
}

export function buildCartMessage(
  items: CartItem[],
  config: Pick<ConfigSite, 'whatsapp_numero'>,
  siteUrl: string
): string {
  if (items.length === 0) return '';
  const blocks = items.map((i) => buildItemBlock(i, siteUrl));
  const total = items.reduce((s, i) => s + i.preco, 0);
  const body = [
    'Olá Marina! Tenho interesse nas peças abaixo:',
    '',
    blocks.join('\n\n'),
    '',
    `Total: R$ ${total}`,
  ].join('\n');
  return whatsappLink(config.whatsapp_numero, body);
}

export function buildSinglePieceMessage(
  item: CartItem,
  config: Pick<ConfigSite, 'whatsapp_numero'>,
  siteUrl: string
): string {
  const body = [
    'Olá Marina! Tenho interesse:',
    '',
    buildItemBlock(item, siteUrl),
  ].join('\n');
  return whatsappLink(config.whatsapp_numero, body);
}

export function buildSoldContactMessage(
  nome: string,
  slug: string,
  config: Pick<ConfigSite, 'whatsapp_numero'>,
  siteUrl: string
): string {
  const url = `${siteUrl}/pecas/${slug}`;
  const body = `Olá Marina! Gostaria de encomendar uma peça igual à *${nome}* (${url}). Podemos conversar?`;
  return whatsappLink(config.whatsapp_numero, body);
}

function whatsappLink(numero: string, text: string): string {
  const cleaned = numero.replace(/\D/g, '');
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(text)}`;
}

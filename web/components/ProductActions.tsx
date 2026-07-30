'use client';

import type { Produto, ConfigSite } from '@/types/strapi';
import { useCart } from './CartProvider';
import { mediaUrl } from '@/lib/strapi';
import { placeholderDataUri } from '@/lib/placeholder';
import type { CartItem } from '@/lib/whatsapp';
import {
  buildSinglePieceMessage,
  buildSoldContactMessage,
} from '@/lib/whatsapp';

export function ProductActions({
  produto,
  config,
  siteUrl,
}: {
  produto: Produto;
  config: ConfigSite;
  siteUrl: string;
}) {
  const { add } = useCart();

  const fotoUrl =
    mediaUrl(produto.fotos?.[0]) ?? placeholderDataUri(400, 400);

  const buildItem = (): CartItem => ({
    produtoId: produto.id,
    slug: produto.slug,
    nome: produto.nome,
    preco: produto.preco,
    fotoUrl,
    customizacao: {},
  });

  const isSold = produto.situacao === 'vendido';

  if (isSold) {
    const href = buildSoldContactMessage(
      produto.nome,
      produto.slug,
      config,
      siteUrl
    );
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center bg-terracota hover:bg-terracota-dark text-white py-3 rounded transition"
      >
        Encomende esta peça
      </a>
    );
  }

  const singleWaHref = buildSinglePieceMessage(buildItem(), config, siteUrl);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <button
        onClick={() => add(buildItem())}
        className="w-full bg-ink text-cream py-3 rounded hover:bg-ink-soft transition"
      >
        Adicionar ao carrinho
      </button>
      <a
        href={singleWaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center bg-terracota hover:bg-terracota-dark text-white py-3 rounded transition"
      >
        Comprar via WhatsApp
      </a>
    </div>
  );
}

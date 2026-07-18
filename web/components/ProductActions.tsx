'use client';

import { useState } from 'react';
import type { Produto, ConfigSite } from '@/types/strapi';
import { CustomizeDrawer } from './CustomizeDrawer';
import { useCart } from './CartProvider';
import { mediaUrl, picsumFallback } from '@/lib/strapi';
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customizacao, setCustomizacao] = useState<CartItem['customizacao']>({});
  const { add } = useCart();

  const fotoUrl =
    mediaUrl(produto.fotos?.[0]) ??
    picsumFallback(`${produto.slug}-1`, 400, 400);

  const buildItem = (): CartItem => ({
    produtoId: produto.id,
    slug: produto.slug,
    nome: produto.nome,
    preco: produto.preco,
    fotoUrl,
    customizacao,
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
        Entrar em contato
      </a>
    );
  }

  const singleWaHref = buildSinglePieceMessage(buildItem(), config, siteUrl);

  const hasCustomization =
    !!customizacao.cor_desejada ||
    !!customizacao.tamanho_preferencia ||
    !!customizacao.acabamento ||
    !!customizacao.observacoes ||
    (customizacao.categoria &&
      Object.values(customizacao.categoria).some((v) => !!v));

  return (
    <div className="space-y-3">
      <button
        onClick={() => setDrawerOpen(true)}
        className="w-full border border-ink py-3 rounded hover:bg-cream-dark transition"
      >
        {hasCustomization ? 'Editar personalização' : 'Personalizar'}
      </button>

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

      <CustomizeDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onApply={setCustomizacao}
        camposCategoria={produto.categoria?.campos_customizacao ?? []}
        initial={customizacao}
      />
    </div>
  );
}

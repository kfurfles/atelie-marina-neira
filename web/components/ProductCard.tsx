'use client';

import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';
import type { Produto } from '@/types/strapi';
import { mediaUrl, picsumFallback } from '@/lib/strapi';
import { formatPreco, statusLabel } from '@/lib/formatters';

export function ProductCard({ produto }: { produto: Produto }) {
  const [hover, setHover] = useState(false);

  const fotos = produto.fotos ?? [];
  const foto1 = mediaUrl(fotos[0]) ?? picsumFallback(`${produto.slug}-1`, 600, 600);
  const foto2 = fotos[1] ? mediaUrl(fotos[1]) : null;

  return (
    <Link
      href={`/pecas/${produto.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden bg-cream-dark rounded-sm">
        <img
          src={foto1}
          alt={produto.nome}
          className={clsx(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
            hover && foto2 ? 'opacity-0' : 'opacity-100'
          )}
          loading="lazy"
        />
        {foto2 && (
          <img
            src={foto2}
            alt=""
            aria-hidden
            className={clsx(
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
              hover ? 'opacity-100' : 'opacity-0'
            )}
            loading="lazy"
          />
        )}
      </div>
      <div className="pt-3">
        <h3 className="font-serif text-lg leading-tight group-hover:text-terracota transition">
          {produto.nome}
        </h3>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-ink">{formatPreco(produto.preco)}</span>
          <span
            className={clsx(
              'text-xs',
              produto.situacao === 'vendido' ? 'text-terracota' : 'text-ink-soft'
            )}
          >
            {statusLabel(produto)}
          </span>
        </div>
      </div>
    </Link>
  );
}

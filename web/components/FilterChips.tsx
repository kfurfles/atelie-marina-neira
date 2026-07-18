'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import type { Categoria } from '@/types/strapi';

const statusOptions = [
  { key: 'em_estoque', label: 'Em estoque' },
  { key: 'encomenda', label: 'Sob encomenda' },
];

export function FilterChips({ categorias }: { categorias: Categoria[] }) {
  const sp = useSearchParams();
  const currentCat = sp.get('categoria') ?? '';
  const currentStatus = sp.get('status') ?? '';

  const buildHref = (cat: string, status: string) => {
    const q = new URLSearchParams();
    if (cat) q.set('categoria', cat);
    if (status) q.set('status', status);
    const s = q.toString();
    return s ? `/pecas?${s}` : '/pecas';
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Chip active={!currentCat} href={buildHref('', currentStatus)}>Todas</Chip>
        {categorias.map((c) => (
          <Chip
            key={c.slug}
            active={currentCat === c.slug}
            href={buildHref(c.slug, currentStatus)}
          >
            {c.nome}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip active={!currentStatus} href={buildHref(currentCat, '')}>
          Todos
        </Chip>
        {statusOptions.map((s) => (
          <Chip
            key={s.key}
            active={currentStatus === s.key}
            href={buildHref(currentCat, s.key)}
          >
            {s.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        'px-3 py-1.5 rounded-full border text-sm transition',
        active
          ? 'bg-ink text-cream border-ink'
          : 'border-cream-dark text-ink-soft hover:border-ink hover:text-ink'
      )}
    >
      {children}
    </Link>
  );
}

import Link from 'next/link';
import type { Produto } from '@/types/strapi';
import { ProductCard } from './ProductCard';

export function FeaturedGrid({ produtos }: { produtos: Produto[] }) {
  if (!produtos.length) return null;
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-serif text-3xl">Peças em destaque</h2>
        <Link href="/pecas" className="text-sm text-ink-soft hover:text-ink">
          ver todas →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map((p) => (
          <ProductCard key={p.id} produto={p} />
        ))}
      </div>
    </section>
  );
}

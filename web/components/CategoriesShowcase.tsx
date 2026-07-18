import Link from 'next/link';
import type { Categoria } from '@/types/strapi';
import { mediaUrl, picsumFallback } from '@/lib/strapi';

export function CategoriesShowcase({ categorias }: { categorias: Categoria[] }) {
  if (!categorias.length) return null;
  return (
    <section className="bg-cream-dark/60 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl mb-8">Explore por categoria</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categorias.map((c) => {
            const cover =
              mediaUrl(c.foto_capa ?? null) ??
              picsumFallback(`cat-${c.slug}`, 600, 700);
            return (
              <Link
                key={c.id}
                href={`/pecas?categoria=${c.slug}`}
                className="group block"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-sm">
                  <img
                    src={cover}
                    alt={c.nome}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 font-serif text-xl">{c.nome}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

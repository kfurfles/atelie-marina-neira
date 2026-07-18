import Link from 'next/link';
import { getCategorias } from '@/lib/strapi';
import { mediaUrl, picsumFallback } from '@/lib/strapi';

export const dynamic = 'force-dynamic';

export default async function CategoriasPage() {
  const categorias = await getCategorias();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl mb-2">Categorias</h1>
      <p className="text-ink-soft mb-10">Explore por tipo de peça.</p>

      {categorias.length === 0 ? (
        <p className="text-ink-soft">Nenhum item</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categorias.map((c) => {
            const cover =
              mediaUrl(c.foto_capa ?? null) ??
              picsumFallback(`cat-${c.slug}`, 700, 900);
            const count = c.produtos?.length ?? 0;
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
                <h2 className="mt-3 font-serif text-2xl">{c.nome}</h2>
                <p className="text-sm text-ink-soft">
                  {count} {count === 1 ? 'peça' : 'peças'}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

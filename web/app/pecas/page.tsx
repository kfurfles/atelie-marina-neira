import { Suspense } from 'react';
import { getCategorias, getProdutos } from '@/lib/strapi';
import { ProductCard } from '@/components/ProductCard';
import { FilterChips } from '@/components/FilterChips';

export const dynamic = 'force-dynamic';

export default async function PecasPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; status?: string }>;
}) {
  const params = await searchParams;
  const [categorias, produtos] = await Promise.all([
    getCategorias(),
    getProdutos({
      categoriaSlug: params.categoria,
      status: params.status,
    }),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl mb-8">Peças</h1>

      <div className="mb-10">
        <Suspense fallback={null}>
          <FilterChips categorias={categorias} />
        </Suspense>
      </div>

      {produtos.length === 0 ? (
        <p className="text-ink-soft">Nenhum item</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {produtos.map((p) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
      )}
    </div>
  );
}

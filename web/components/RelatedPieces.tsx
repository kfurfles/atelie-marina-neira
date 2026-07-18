import { getProdutos } from '@/lib/strapi';
import { ProductCard } from './ProductCard';

export async function RelatedPieces({
  categoriaSlug,
  excludeSlug,
}: {
  categoriaSlug?: string;
  excludeSlug: string;
}) {
  if (!categoriaSlug) return null;
  const all = await getProdutos({ categoriaSlug, limit: 8 });
  const related = all.filter((p) => p.slug !== excludeSlug).slice(0, 4);
  if (!related.length) return null;

  return (
    <section className="mt-16 border-t border-cream-dark pt-10">
      <h2 className="font-serif text-2xl mb-6">Da mesma categoria</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((p) => (
          <ProductCard key={p.id} produto={p} />
        ))}
      </div>
    </section>
  );
}

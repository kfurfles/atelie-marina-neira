import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProdutoBySlug } from '@/lib/strapi';
import { getConfig } from '@/lib/config';
import { PhotoGallery } from '@/components/PhotoGallery';
import { ProductActions } from '@/components/ProductActions';
import { RichText } from '@/components/RichText';
import { RelatedPieces } from '@/components/RelatedPieces';
import { formatPreco, statusLabel } from '@/lib/formatters';

export const dynamic = 'force-dynamic';

export default async function ProdutoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [produto, config] = await Promise.all([
    getProdutoBySlug(slug),
    getConfig(),
  ]);

  if (!produto) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const isVendido = produto.situacao === 'vendido';

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        <PhotoGallery
          fotos={produto.fotos ?? []}
          fallbackSeed={produto.slug}
          alt={produto.nome}
        />

        <div>
          {produto.categoria && (
            <Link
              href={`/pecas?categoria=${produto.categoria.slug}`}
              className="text-xs uppercase tracking-widest text-ink-soft hover:text-terracota"
            >
              {produto.categoria.nome}
            </Link>
          )}

          <h1 className="font-serif text-4xl mt-2">{produto.nome}</h1>

          {produto.frase_poetica && (
            <p className="mt-3 font-serif italic text-xl text-ink-soft">
              {produto.frase_poetica}
            </p>
          )}

          <div className="mt-6 flex items-baseline justify-between">
            <span className="text-2xl">{formatPreco(produto.preco)}</span>
            <span
              className={`text-sm ${isVendido ? 'text-terracota' : 'text-ink-soft'}`}
            >
              {statusLabel(produto)}
            </span>
          </div>

          <Link
            href="/autografo"
            className="inline-flex items-center gap-1 text-xs text-ink-soft mt-3 hover:text-terracota"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 20l6-6M4 20l6-6c1-1 2.5-1 3.5 0l0.5.5c1 1 1 2.5 0 3.5l-6 6" />
              <path d="M14 6l4 4-8 8H6v-4z" />
            </svg>
            Peça autografada · saiba mais
          </Link>

          <div className="mt-8">
            <ProductActions produto={produto} config={config} siteUrl={siteUrl} />
          </div>

          {produto.descricao && (
            <div className="mt-10">
              <h2 className="font-serif text-xl mb-3">Sobre a peça</h2>
              <RichText content={produto.descricao} />
            </div>
          )}

          <div className="mt-10">
            <h2 className="font-serif text-xl mb-3">Cuidados e orientações</h2>
            <RichText content={config.texto_cuidados_geral || null} />
          </div>
        </div>
      </div>

      <RelatedPieces
        categoriaSlug={produto.categoria?.slug}
        excludeSlug={produto.slug}
      />
    </div>
  );
}

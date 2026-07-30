import { getCategorias, getProdutos } from '@/lib/strapi';
import { getConfig } from '@/lib/config';
import { Hero } from '@/components/Hero';
import { FeaturedGrid } from '@/components/FeaturedGrid';
import { CategoriesShowcase } from '@/components/CategoriesShowcase';
import { SobreTeaser } from '@/components/SobreTeaser';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [config, destaques, categorias] = await Promise.all([
    getConfig(),
    getProdutos({ destaque: true, limit: 6 }),
    getCategorias(),
  ]);

  return (
    <>
      <Hero config={config} />
      <FeaturedGrid produtos={destaques} />
      <CategoriesShowcase categorias={categorias} />
      <SobreTeaser config={config} />
    </>
  );
}

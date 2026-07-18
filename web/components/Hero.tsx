import type { ConfigSite, Sobre } from '@/types/strapi';
import { mediaUrl, picsumFallback } from '@/lib/strapi';

export function Hero({ config, sobre }: { config: ConfigSite; sobre: Sobre | null }) {
  const bg =
    mediaUrl(sobre?.foto_marina ?? null) ??
    picsumFallback('marina-maos-argila', 1600, 900);

  return (
    <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
      <img
        src={bg}
        alt="Marina trabalhando com argila"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/25" />
      <div className="relative h-full flex items-end">
        <div className="max-w-6xl mx-auto w-full px-6 pb-16">
          <p className="font-serif text-3xl md:text-5xl text-cream leading-tight max-w-2xl">
            {config.frase_filosofia ?? 'Cerâmica feita à mão, uma peça por vez.'}
          </p>
        </div>
      </div>
    </section>
  );
}

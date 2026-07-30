import type { ConfigSite } from '@/types/strapi';
import { mediaUrl } from '@/lib/strapi';
import { placeholderDataUri } from '@/lib/placeholder';

export function Hero({ config }: { config: ConfigSite }) {
  const desktop = mediaUrl(config.hero_foto_desktop ?? null);
  const mobile = mediaUrl(config.hero_foto_mobile ?? null);
  const placeholder = placeholderDataUri(1600, 900);

  const desktopSrc = desktop ?? mobile ?? placeholder;
  const mobileSrc = mobile ?? desktop ?? placeholder;

  return (
    <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileSrc} />
        <img
          src={desktopSrc}
          alt="Marina trabalhando com argila"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
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

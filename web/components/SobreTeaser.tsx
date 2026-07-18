import Link from 'next/link';
import type { Sobre } from '@/types/strapi';
import { mediaUrl, picsumFallback } from '@/lib/strapi';

export function SobreTeaser({ sobre }: { sobre: Sobre | null }) {
  const foto =
    mediaUrl(sobre?.foto_marina ?? null) ??
    picsumFallback('marina-retrato', 700, 900);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
      <div className="aspect-[4/5] overflow-hidden rounded-sm">
        <img src={foto} alt="Marina" className="w-full h-full object-cover" />
      </div>
      <div>
        <h2 className="font-serif text-3xl mb-4">Quem faz</h2>
        <p className="text-ink-soft leading-relaxed mb-6">
          Sou Marina. Trabalho a argila com as mãos, uma peça por vez. Cada
          peça carrega tempo, silêncio e uma marca discreta que é minha
          assinatura.
        </p>
        <Link
          href="/sobre"
          className="inline-block border-b border-ink pb-0.5 hover:text-terracota transition"
        >
          Conheça minha trajetória →
        </Link>
      </div>
    </section>
  );
}

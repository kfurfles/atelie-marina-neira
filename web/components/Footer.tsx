import Link from 'next/link';
import type { ConfigSite } from '@/types/strapi';

export function Footer({ config }: { config: ConfigSite }) {
  const year = 2026;
  const waHref = config.whatsapp_numero
    ? `https://wa.me/${config.whatsapp_numero.replace(/\D/g, '')}`
    : '#';
  const igHref = config.instagram_url ?? '#';

  return (
    <footer className="border-t border-cream-dark py-6 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-ink-soft">
        <span>© Marina Cerâmicas {year}</span>
        <span aria-hidden>·</span>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
          WhatsApp
        </a>
        <span aria-hidden>·</span>
        <a href={igHref} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
          Instagram
        </a>
        <span aria-hidden>·</span>
        <Link href="/cuidados" className="hover:text-ink">Cuidados</Link>
        <span aria-hidden>·</span>
        <Link href="/autografo" className="hover:text-ink">Autógrafo</Link>
      </div>
    </footer>
  );
}

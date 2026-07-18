'use client';

import clsx from 'clsx';
import { useCart } from './CartProvider';
import { buildCartMessage } from '@/lib/whatsapp';
import type { ConfigSite } from '@/types/strapi';

export function CartDrawer({ config }: { config: ConfigSite }) {
  const { items, remove, clear, total, drawerOpen, closeDrawer } = useCart();

  const siteUrl =
    (typeof window !== 'undefined' && window.location.origin) ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000';

  const waHref = items.length
    ? buildCartMessage(items, config, siteUrl)
    : '#';

  return (
    <>
      <div
        onClick={closeDrawer}
        className={clsx(
          'fixed inset-0 bg-ink/30 z-40 transition-opacity duration-300',
          drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      />
      <aside
        aria-hidden={!drawerOpen}
        className={clsx(
          'fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 shadow-xl',
          'transition-transform duration-300 ease-out',
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-cream-dark flex items-center justify-between">
            <h2 className="font-serif text-xl">Carrinho</h2>
            <button
              onClick={closeDrawer}
              className="w-8 h-8 rounded-full hover:bg-cream-dark inline-flex items-center justify-center"
              aria-label="Fechar carrinho"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <p className="text-ink-soft">Nenhum item</p>
            ) : (
              <ul className="space-y-4">
                {items.map((item, i) => (
                  <li key={i} className="flex gap-3 pb-4 border-b border-cream-dark">
                    {item.fotoUrl && (
                      <img
                        src={item.fotoUrl}
                        alt={item.nome}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.nome}</div>
                      <div className="text-sm text-ink-soft">R$ {item.preco}</div>
                      {renderCustomSummary(item.customizacao)}
                    </div>
                    <button
                      onClick={() => remove(i)}
                      className="text-sm text-ink-soft hover:text-terracota self-start"
                      aria-label={`Remover ${item.nome}`}
                    >
                      remover
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-cream-dark px-6 py-4 space-y-3">
              <div className="flex justify-between text-lg">
                <span>Total</span>
                <span className="font-medium">R$ {total}</span>
              </div>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-terracota hover:bg-terracota-dark text-white py-3 rounded transition"
              >
                Finalizar via WhatsApp
              </a>
              <button
                onClick={clear}
                className="block w-full text-sm text-ink-soft hover:text-ink"
              >
                Esvaziar carrinho
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function renderCustomSummary(c: { [k: string]: unknown }): React.ReactNode {
  const parts: string[] = [];
  if (typeof c.cor_desejada === 'string' && c.cor_desejada) parts.push(`cor: ${c.cor_desejada}`);
  if (typeof c.tamanho_preferencia === 'string' && c.tamanho_preferencia) parts.push(`tamanho: ${c.tamanho_preferencia}`);
  if (typeof c.acabamento === 'string' && c.acabamento) parts.push(`acab.: ${c.acabamento}`);
  if (c.categoria && typeof c.categoria === 'object') {
    for (const [k, v] of Object.entries(c.categoria as Record<string, string>)) {
      if (v) parts.push(`${k}: ${v}`);
    }
  }
  if (typeof c.observacoes === 'string' && c.observacoes) parts.push(`obs: ${c.observacoes}`);
  if (!parts.length) return null;
  return <div className="text-xs text-ink-soft mt-1 line-clamp-2">{parts.join(' · ')}</div>;
}

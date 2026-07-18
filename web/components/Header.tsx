'use client';

import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';
import { CartIcon } from './CartIcon';

const links = [
  { href: '/pecas', label: 'Peças' },
  { href: '/categorias', label: 'Categorias' },
  { href: '/sobre', label: 'Sobre' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-cream/90 backdrop-blur border-b border-cream-dark">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-wide">
          Marina Cerâmicas
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-ink-soft hover:text-ink transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartIcon />
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-cream-dark"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={clsx(
          'md:hidden overflow-hidden transition-[max-height] duration-300 border-t border-cream-dark',
          mobileOpen ? 'max-h-64' : 'max-h-0'
        )}
      >
        <nav className="flex flex-col px-6 py-4 gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-ink-soft hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

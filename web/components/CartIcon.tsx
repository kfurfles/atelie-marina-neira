'use client';

import { useCart } from './CartProvider';

export function CartIcon() {
  const { count, openDrawer } = useCart();
  return (
    <button
      onClick={openDrawer}
      aria-label={`Abrir carrinho (${count} ${count === 1 ? 'item' : 'itens'})`}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-cream-dark transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6 text-ink"
      >
        <path d="M6 6h15l-1.5 9h-12z" strokeLinejoin="round" />
        <path d="M6 6L5 3H2" strokeLinecap="round" />
        <circle cx="9" cy="19" r="1.5" fill="currentColor" />
        <circle cx="18" cy="19" r="1.5" fill="currentColor" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-terracota text-white text-xs font-medium flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { mediaUrl, picsumFallback } from '@/lib/strapi';
import type { StrapiMedia } from '@/types/strapi';

export function PhotoGallery({
  fotos,
  fallbackSeed,
  alt,
}: {
  fotos: StrapiMedia[];
  fallbackSeed: string;
  alt: string;
}) {
  const urls =
    fotos.length > 0
      ? fotos.slice(0, 3).map((f) => mediaUrl(f) ?? '')
      : [
          picsumFallback(`${fallbackSeed}-1`, 900, 900),
          picsumFallback(`${fallbackSeed}-2`, 900, 900),
          picsumFallback(`${fallbackSeed}-3`, 900, 900),
        ];

  const [main, setMain] = useState(0);

  return (
    <div>
      <div className="aspect-square bg-cream-dark rounded overflow-hidden">
        <img
          key={urls[main]}
          src={urls[main]}
          alt={alt}
          className="w-full h-full object-cover fade-in"
        />
      </div>
      {urls.length > 1 && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {urls.map((u, i) => (
            <button
              key={i}
              onClick={() => setMain(i)}
              className={clsx(
                'aspect-square overflow-hidden rounded border-2 transition',
                main === i ? 'border-terracota' : 'border-transparent hover:border-cream-dark'
              )}
            >
              <img src={u} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

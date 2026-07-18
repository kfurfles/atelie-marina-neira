'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';
import { mediaUrl, picsumFallback } from '@/lib/strapi';
import type { StrapiMedia } from '@/types/strapi';

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  media?: StrapiMedia | null;
  fallbackSeed: string;
  alt: string;
  width: number;
  height: number;
};

export function SmartImage({
  media,
  fallbackSeed,
  alt,
  width,
  height,
  className,
  ...rest
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const src = mediaUrl(media) ?? picsumFallback(fallbackSeed, width, height);
  return (
    <Image
      src={src}
      alt={media?.alternativeText ?? alt}
      width={width}
      height={height}
      onLoad={() => setLoaded(true)}
      className={clsx(
        'transition-opacity duration-500',
        loaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      {...rest}
    />
  );
}

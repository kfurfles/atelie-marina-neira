import type {
  Categoria,
  ConfigSite,
  Produto,
  Sobre,
  StrapiListResponse,
  StrapiMedia,
  StrapiSingleResponse,
} from '@/types/strapi';

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const PUBLIC_STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

export function mediaUrl(media?: StrapiMedia | null): string | null {
  if (!media?.url) return null;
  if (media.url.startsWith('http')) return media.url;
  return `${PUBLIC_STRAPI_URL}${media.url}`;
}

import { placeholderDataUri } from './placeholder';

// Mantém a assinatura antiga (seed continua aceito mas ignorado) pra reduzir mudanças.
export function picsumFallback(_seed: string, w = 800, h = 800) {
  return placeholderDataUri(w, h);
}

async function strapiFetch<T>(path: string, revalidate = 30): Promise<T> {
  const url = `${STRAPI_URL}${path}`;
  const res = await fetch(url, {
    next: { revalidate },
    headers: { accept: 'application/json' },
  });
  if (res.status === 404) {
    return { data: null } as unknown as T;
  }
  if (!res.ok) {
    throw new Error(`Strapi ${res.status} ${res.statusText} @ ${path}`);
  }
  return (await res.json()) as T;
}

export async function getProdutos(params: {
  categoriaSlug?: string;
  status?: string;
  destaque?: boolean;
  limit?: number;
} = {}): Promise<Produto[]> {
  const q = new URLSearchParams();
  q.set('populate', '*');
  q.set('status', 'published');
  q.set('sort[0]', 'createdAt:desc');
  if (params.categoriaSlug) {
    q.set('filters[categoria][slug][$eq]', params.categoriaSlug);
  }
  if (params.status) {
    q.set('filters[situacao][$eq]', params.status);
  }
  if (params.destaque) {
    q.set('filters[destaque][$eq]', 'true');
  }
  if (params.limit) {
    q.set('pagination[pageSize]', String(params.limit));
  }
  try {
    const res = await strapiFetch<StrapiListResponse<Produto>>(
      `/api/produtos?${q.toString()}`
    );
    return res.data ?? [];
  } catch (err) {
    console.error('[strapi] getProdutos falhou:', err);
    return [];
  }
}

export async function getProdutoBySlug(slug: string): Promise<Produto | null> {
  const q = new URLSearchParams();
  q.set('populate', '*');
  q.set('filters[slug][$eq]', slug);
  q.set('status', 'published');
  try {
    const res = await strapiFetch<StrapiListResponse<Produto>>(
      `/api/produtos?${q.toString()}`
    );
    return res.data?.[0] ?? null;
  } catch (err) {
    console.error('[strapi] getProdutoBySlug falhou:', err);
    return null;
  }
}

export async function getCategorias(): Promise<Categoria[]> {
  const q = new URLSearchParams();
  q.set('populate', '*');
  q.set('sort[0]', 'ordem:asc');
  q.set('status', 'published');
  try {
    const res = await strapiFetch<StrapiListResponse<Categoria>>(
      `/api/categorias?${q.toString()}`
    );
    return res.data ?? [];
  } catch (err) {
    console.error('[strapi] getCategorias falhou:', err);
    return [];
  }
}

export async function getCategoriaBySlug(slug: string): Promise<Categoria | null> {
  const q = new URLSearchParams();
  q.set('filters[slug][$eq]', slug);
  q.set('populate', '*');
  q.set('status', 'published');
  try {
    const res = await strapiFetch<StrapiListResponse<Categoria>>(
      `/api/categorias?${q.toString()}`
    );
    return res.data?.[0] ?? null;
  } catch (err) {
    console.error('[strapi] getCategoriaBySlug falhou:', err);
    return null;
  }
}

export async function getSobre(): Promise<Sobre | null> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<Sobre>>(
      `/api/sobre?populate=*`
    );
    return res.data ?? null;
  } catch (err) {
    console.error('[strapi] getSobre falhou:', err);
    return null;
  }
}

export async function getConfigSite(): Promise<ConfigSite | null> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<ConfigSite>>(
      `/api/config-site`
    );
    return res.data ?? null;
  } catch (err) {
    console.error('[strapi] getConfigSite falhou:', err);
    return null;
  }
}

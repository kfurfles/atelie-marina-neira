import { cache } from 'react';
import { getConfigSite } from './strapi';
import type { ConfigSite } from '@/types/strapi';

const FALLBACK: ConfigSite = {
  whatsapp_numero: '5511999999999',
  instagram_url: 'https://instagram.com',
  frase_filosofia: 'Cerâmica feita à mão, uma peça por vez.',
  hero_titulo: 'Marina Cerâmicas',
  hero_subtitulo: null,
  texto_selo_autografo:
    'Toda peça leva uma marca discreta na base — minha assinatura e garantia de autenticidade.',
  texto_cuidados_geral:
    'Lave à mão com água morna e sabão neutro. Evite choque térmico.',
};

export const getConfig = cache(async (): Promise<ConfigSite> => {
  const cfg = await getConfigSite();
  return cfg ?? FALLBACK;
});

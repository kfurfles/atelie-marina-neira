export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
};

export type CampoCustomizacao = {
  id: number;
  label: string;
  tipo: 'dropdown' | 'texto' | 'numero';
  opcoes?: string | null;
};

export type EventoTimeline = {
  id: number;
  ano?: string | null;
  titulo: string;
  descricao?: string | null;
};

export type Categoria = {
  id: number;
  documentId?: string;
  nome: string;
  slug: string;
  foto_capa?: StrapiMedia | null;
  ordem: number;
  campos_customizacao?: CampoCustomizacao[];
  produtos?: Produto[];
};

export type ProdutoStatus = 'em_estoque' | 'encomenda' | 'vendido';

export type Produto = {
  id: number;
  documentId?: string;
  nome: string;
  slug: string;
  categoria?: Categoria | null;
  descricao?: string | null;
  frase_poetica?: string | null;
  preco: number;
  fotos?: StrapiMedia[];
  situacao: ProdutoStatus;
  prazo_encomenda_dias?: number | null;
  cuidados?: string | null;
  destaque?: boolean;
};

export type Sobre = {
  foto_marina?: StrapiMedia | null;
  timeline?: EventoTimeline[];
};

export type ConfigSite = {
  whatsapp_numero: string;
  instagram_url?: string | null;
  frase_filosofia?: string | null;
  hero_titulo?: string | null;
  hero_subtitulo?: string | null;
  texto_selo_autografo?: string | null;
  texto_cuidados_geral?: string | null;
};

export type StrapiListResponse<T> = {
  data: T[];
  meta?: { pagination?: { total: number } };
};

export type StrapiSingleResponse<T> = {
  data: T | null;
};

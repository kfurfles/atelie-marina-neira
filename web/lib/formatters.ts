import type { Produto, ProdutoStatus } from '@/types/strapi';

export function formatPreco(preco: number): string {
  return `R$ ${Math.round(preco)}`;
}

export function statusLabel(produto: Pick<Produto, 'situacao' | 'prazo_encomenda_dias'>): string {
  switch (produto.situacao) {
    case 'em_estoque':
      return 'Em estoque';
    case 'encomenda':
      return produto.prazo_encomenda_dias
        ? `Encomenda: ${produto.prazo_encomenda_dias} dias`
        : 'Sob encomenda';
    case 'vendido':
      return 'Vendida';
    default:
      return '';
  }
}

export function statusIsVendido(s: ProdutoStatus) {
  return s === 'vendido';
}

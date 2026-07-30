// SVG placeholder neutro para quando uma foto não foi cadastrada no Strapi.
// Retorna como data URI para uso em <img src="..."> ou <Image src="...">.

const CREAM_DARK = '#EAE2D3';
const INK_SOFT = '#B8AC9C';

function svg(w: number, h: number): string {
  const iconSize = Math.round(Math.min(w, h) * 0.18);
  const cx = w / 2;
  const cy = h / 2;
  const half = iconSize / 2;
  // Ícone simples de "moldura de foto": retângulo arredondado com uma "montanha" e um "sol"
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="${CREAM_DARK}"/>
    <g transform="translate(${cx - half}, ${cy - half})" fill="none" stroke="${INK_SOFT}" stroke-width="${Math.max(1.5, iconSize * 0.04)}" stroke-linejoin="round">
      <rect x="0" y="0" width="${iconSize}" height="${iconSize}" rx="${iconSize * 0.08}"/>
      <circle cx="${iconSize * 0.72}" cy="${iconSize * 0.28}" r="${iconSize * 0.08}" fill="${INK_SOFT}"/>
      <path d="M ${iconSize * 0.1} ${iconSize * 0.82} L ${iconSize * 0.38} ${iconSize * 0.5} L ${iconSize * 0.58} ${iconSize * 0.68} L ${iconSize * 0.78} ${iconSize * 0.48} L ${iconSize * 0.9} ${iconSize * 0.6} L ${iconSize * 0.9} ${iconSize * 0.9} L ${iconSize * 0.1} ${iconSize * 0.9} Z" fill="${INK_SOFT}" fill-opacity="0.3"/>
    </g>
  </svg>`;
}

export function placeholderDataUri(w = 800, h = 800): string {
  const raw = svg(w, h);
  // encodeURIComponent evita problemas com # e < em atributos src
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(raw)}`;
}

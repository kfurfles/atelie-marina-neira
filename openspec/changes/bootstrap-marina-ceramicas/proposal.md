## Why

Marina é ceramista e precisa de um site que sirva como vitrine + portfolio + canal de venda artesanal. Não existe site hoje. A venda acontece via WhatsApp e o site precisa preservar esse contato humano - "comprar um pedacinho da Marina" - enquanto profissionaliza a apresentação das peças, história e oferta de customização.

## What Changes

- Bootstrap do projeto: pasta única contendo Next.js (App Router) + Strapi (SQLite), orquestrados via `docker-compose.yml` e um script `start.sh` na raiz que sobe tudo com um comando.
- Site público em Next.js com paleta off-white + terracota, tipografia serifada (títulos) + sans (corpo), animações em fade sutis, apenas responsivo (sem tratamento mobile especial).
- Páginas: Home, Peças (catálogo), Categorias (vitrine), Peça individual, Sobre Marina, Cuidados (rodapé), Autógrafo (rodapé). Sem página de contato, busca, newsletter, depoimentos ou diário.
- Carrinho em `localStorage` como drawer lateral, com finalização gerando link `wa.me` contendo lista detalhada de itens, customizações, link de cada peça e total.
- Página de peça com split narrativo, 3 fotos, painel "personalizar" em drawer lateral, dois botões (adicionar carrinho + WhatsApp direto), status de estoque/encomenda visível, cuidados por peça, seção "Da mesma categoria".
- Customização por peça combina: campos globais fixos + campos por categoria + textarea livre.
- Peça vendida permanece no site marcada, com botão "Entrar em contato" abrindo WhatsApp para encomenda similar.
- Selo de autógrafo discreto (badge sutil) + página explicativa dedicada.
- Strapi como CMS com content types: Produto, Categoria, Sobre (single), ConfigSite (single). Marina cadastra tudo pelo admin. Imagens usam placeholders de `picsum.photos` até fotos reais existirem.
- Rodapé enxuto de uma linha: copyright + WhatsApp + Instagram.
- Sem checkout automatizado, sem pagamento online, sem cálculo de frete, sem login, sem i18n, sem SEO/analytics, sem deploy (localhost only).

## Capabilities

### New Capabilities
- `project-bootstrap`: estrutura de pastas, docker-compose, script de start único, dependências de raiz.
- `content-management`: modelo de conteúdo no Strapi (content types, componentes de customização, seeds/configuração inicial).
- `site-shell`: layout global do site (header, rodapé, tipografia, paleta, animações, responsividade).
- `home-page`: composição da home com hero (Marina + argila), destaques, categorias, sobre curto.
- `catalog-browsing`: página Peças (grid + filtros chips) e página Categorias (vitrine visual).
- `product-detail`: página da peça (split narrativo, 3 fotos, personalizar drawer, cuidados, status, relacionadas, autógrafo, estado vendida).
- `cart-and-checkout`: drawer de carrinho localStorage + geração da mensagem WhatsApp com link por peça.
- `artist-story`: página Sobre Marina em timeline com foto.
- `informational-pages`: páginas Cuidados (geral) e Autógrafo (significado do selo) linkadas no rodapé.

### Modified Capabilities
- (nenhuma - projeto novo)

## Impact

- Novo repositório de código: cria estrutura em `web/` (Next.js), `cms/` (Strapi), raiz com `docker-compose.yml` e `start.sh`.
- Dependências: Node/npm para ambos apps, Docker + Docker Compose no host da Marina/dev.
- Sem impacto em sistemas externos (nenhum deploy, tudo local).
- Fluxo operacional da Marina: passa a cadastrar peças via admin Strapi; passa a receber pedidos via WhatsApp com mensagem estruturada.

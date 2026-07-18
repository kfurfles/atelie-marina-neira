## Context

Projeto novo, começando do zero. Marina é ceramista, precisa de site de venda + portfolio. Sem experiência técnica no lado dela - vai gerenciar conteúdo via admin Strapi. Toda venda é encaminhada via WhatsApp (não há checkout). O site roda 100% em localhost por enquanto (fase de desenvolvimento e prototipagem); deploy fica pra depois. O ambiente-alvo é a máquina de desenvolvimento (macOS) com Docker Desktop instalado. As decisões técnicas priorizam simplicidade, um-comando-pra-subir-tudo, e evitar overengineering pra V1.

## Goals / Non-Goals

**Goals:**
- Um repositório em pasta única com dois apps independentes (`web/` Next.js, `cms/` Strapi) e docker-compose orquestrando os dois.
- Comando único (`./start.sh`) sobe web + cms.
- Content model no Strapi permite Marina cadastrar peças, categorias (com campos de customização por tipo), páginas Sobre e Config Site sem tocar código.
- Site Next.js consome API REST do Strapi e renderiza páginas conforme decisões do grill (identidade visual off-white/terracota, tom autoral 1ª pessoa em textos, animações fade).
- Fluxo de compra termina em `wa.me` com mensagem detalhada por peça (nome, preço, customização, link canônico da peça no site).
- Carrinho persiste em `localStorage`, sem backend.

**Non-Goals:**
- Deploy em produção (Vercel/VPS) - fica pra depois.
- Autenticação de cliente, contas, favoritos persistentes por usuário.
- Checkout automatizado, pagamento online, cálculo de frete, integração com Correios/transportadora.
- Newsletter, embed do Instagram, blog/diário, depoimentos, busca no site.
- i18n / multi-idioma.
- SEO avançado, sitemap dinâmico, analytics.
- Testes automatizados extensivos (V1 foca em existir e funcionar; testes mínimos apenas).
- CI/CD.
- App mobile / PWA offline.

## Decisions

### 1. Stack: Next.js (App Router) + Strapi + SQLite
- **Escolha**: Next.js 15 App Router pro frontend; Strapi 5 headless CMS com SQLite como banco.
- **Alternativas**: (a) Sanity/Contentful como CMS SaaS - rejeitado, quer localhost total; (b) Payload CMS - viável mas Strapi tem admin mais amigável pra não-devs; (c) Astro em vez de Next - rejeitado, Next foi requisito do usuário.
- **Rationale**: Strapi tem UI polida pro admin (Marina usa direto), SQLite elimina container extra de banco, App Router é o padrão atual do Next.

### 2. Estrutura "monorepo simples" (sem workspaces)
- **Escolha**: raiz contém `web/` e `cms/` como projetos npm independentes. Nenhum `pnpm-workspace.yaml`, nenhum turbo. Cada app tem seu próprio `package.json`, `node_modules`, `Dockerfile`.
- **Alternativas**: pnpm workspaces + Turborepo - rejeitado explicitamente pelo usuário.
- **Rationale**: menor complexidade, sem ferramenta a mais pra aprender, docker-compose já resolve orquestração.

### 3. Orquestração via Docker Compose + script start.sh
- **Escolha**: `docker-compose.yml` na raiz define dois serviços (`web`, `cms`) com volumes montados pra hot reload em dev. Script `start.sh` executa `docker compose up --build`.
- **Alternativas**: (a) rodar cada app direto no host sem Docker - rejeitado, requisito do usuário; (b) `Makefile` em vez de shell script - shell script é mais portável e simples.
- **Rationale**: um comando único que qualquer pessoa (inclusive Marina no futuro) roda sem instalar Node localmente - só Docker.

### 4. Consumo do CMS: REST API + fetch nativo no Server Components
- **Escolha**: componentes de servidor do App Router chamam Strapi via `fetch` nativo do Next. Sem cliente SDK oficial, sem GraphQL.
- **Alternativas**: GraphQL (plugin do Strapi) - overhead sem necessidade em V1; SDK oficial `@strapi/client` - dependência a mais pouco benefício vs fetch puro.
- **Rationale**: fetch nativo tem cache/revalidate integrado ao Next, tipos podem ser declarados manualmente (ou gerados depois via strapi-generate-types).

### 5. Content model no Strapi
- **Content types (collection)**: `Produto`, `Categoria`.
- **Content types (single)**: `Sobre`, `ConfigSite`.
- **Component (repeatable, dentro de Categoria)**: `CampoCustomizacao` (label: string, tipo: enum[dropdown, texto, numero], opcoes: string opcional).
- **Produto** tem: nome, slug, categoria (relation to-one), descricao (rich text), frase_poetica (text curto), preco (int), fotos (media multi, 1-3), status (enum: em_estoque | encomenda | vendido), prazo_encomenda_dias (int, opcional), cuidados (rich text), destaque (bool).
- **Categoria** tem: nome, slug, foto_capa (media), ordem (int), campos_customizacao (repeatable component).
- **Sobre** tem: foto_marina (media), timeline (repeatable component `EventoTimeline` com ano+titulo+descricao).
- **ConfigSite** tem: whatsapp_numero (E164), instagram_url, frase_filosofia (text), hero_titulo, hero_subtitulo, texto_selo_autografo (rich text), texto_cuidados_geral (rich text).
- **Rationale**: modelo mínimo que cobre tudo do grill sem ficar rígido. Campos globais fixos de customização (cor, tamanho, acabamento) ficam definidos em código no site (form base) e os campos por categoria vêm do Strapi como extras.

### 6. Customização por peça - implementação
- **Combinação decidida no grill**: campos globais fixos (código) + campos por categoria (Strapi) + textarea livre.
- **Globais fixos**: `cor_desejada` (texto livre), `tamanho_preferencia` (texto livre), `acabamento` (dropdown: fosco / brilho / sem preferência). Todos opcionais.
- **Por categoria**: renderizados dinamicamente do array `campos_customizacao` da categoria da peça.
- **Textarea livre**: campo `observacoes` sempre presente.
- **Estado**: form vive no drawer lateral, valores compõem objeto anexo ao item no carrinho.

### 7. Carrinho e fluxo WhatsApp
- Estado global via React Context + `localStorage` (key `marina.cart`).
- Item do carrinho: `{ produtoId, slug, nome, preco, fotoUrl, customizacao: {globais, categoria, observacoes} }`.
- Drawer disparado por: (a) clique no ícone carrinho do header; (b) clique "Adicionar ao carrinho" na página da peça (abre + adiciona).
- Botão "Comprar via WhatsApp direto" pula carrinho: gera link com só aquela peça.
- Botão "Finalizar via WhatsApp" no drawer: gera link com todos itens.
- Formato da mensagem: uma peça por bloco (nome em negrito, preço, customizações listadas, URL canônica). Total no fim. Encoded via `encodeURIComponent`.
- Número WhatsApp e URL base do site vêm do ConfigSite (Strapi) - Marina troca sem tocar código.

### 8. Peça vendida
- Se `status === "vendido"` na página da peça: botão principal vira "Entrar em contato" (link WhatsApp com mensagem tipo "gostei desta peça vendida ($nome, $url), faz uma parecida?"). Sem "Adicionar carrinho". Card no grid mostra "Vendida" no lugar de "Em estoque"/"Encomenda". Foto sem efeito visual especial (só o texto muda).

### 9. Identidade visual e tipografia
- **Paleta** (Tailwind config):
  - `bg-cream` #F5F0E8 (off-white base)
  - `bg-cream-dark` #EAE2D3
  - `terracota` #C87456 (acento único)
  - `ink` #1F1B18 (texto principal)
  - `ink-soft` #5A524B (texto secundário)
- **Fontes**: `Cormorant Garamond` (títulos) + `Inter` (corpo) via `next/font/google`.
- **Animações**: transições `duration-300 ease-out` em imagens (fade-in on load), botões, hover de cards (troca de foto). Sem bibliotecas de animação em V1.

### 10. Imagens placeholder
- Enquanto não há fotos reais: usar `picsum.photos/seed/{slug}/{w}/{h}` no site quando `fotos` do Strapi vier vazia (fallback). Seeds são fixas por slug pra imagens serem consistentes entre reloads. Também permite Marina cadastrar peça sem foto ainda e ver preview no site.

### 11. Rotas do site
- `/` (Home)
- `/pecas` (catálogo, com query params `?categoria=slug&status=estoque|encomenda`)
- `/categorias` (vitrine visual)
- `/categorias/[slug]` (redireciona para `/pecas?categoria=slug`)
- `/pecas/[slug]` (peça individual)
- `/sobre`
- `/cuidados`
- `/autografo`

### 12. Header, rodapé e header modal
- Header: `[logo Marina] [Peças] [Categorias] [Sobre] [ícone carrinho com contador]`. Sem "Contato" (decisão P14). Fixo no topo, com fundo `bg-cream` levemente translúcido em scroll.
- Rodapé: uma linha centralizada `© Marina Cerâmicas {ano} · WhatsApp · Instagram · Cuidados · Autógrafo`. Links "Cuidados" e "Autógrafo" apontam pras páginas informacionais.

### 13. Dependências mínimas do web
- `next` 15+, `react`, `react-dom`, `tailwindcss`, `postcss`, `autoprefixer`.
- `clsx` pra composição de classes.
- Nenhuma lib de estado (Context basta), nenhuma UI kit, nenhuma animation lib.

### 14. Testes
- V1: sem suite de testes automatizados. Verificação manual conforme tasks.md ao final.

## Risks / Trade-offs

- **[Sem tipos gerados do Strapi] → Tipos escritos à mão em `web/src/types/strapi.ts`.** Divergência possível se schema mudar. Mitigação: manter arquivo curto e atualizar quando mudar content type. Fase 2 pode adotar `strapi-plugin-generate-types`.
- **[SQLite não escala pra prod] → Aceito.** V1 é localhost. Quando for pra prod, migra pra Postgres via variáveis de env do Strapi.
- **[localStorage não sincroniza entre abas] → Aceito.** Comportamento normal de e-commerce pequeno; usuário fecha aba e reabre = carrinho preservado, mas duas abas concorrentes podem divergir. Não é problema real pra volume esperado.
- **[Placeholders `picsum.photos` requerem internet mesmo em localhost] → Aceito.** Trivial. Se offline, imagem quebra - fallback é o próprio texto/layout.
- **[Docker compose exige Docker Desktop rodando] → Aceito.** É requisito do usuário.
- **[Sem CI/testes = risco de regressão silenciosa] → Aceito em V1.** Escopo é bootstrap; disciplina de qualidade entra em changes seguintes.
- **[Marina precisa aprender Strapi] → Mitigação: tarefa final inclui `README-marina.md` curto explicando como cadastrar peça e mudar textos.**

## Migration Plan

Não aplicável - projeto novo, nada pra migrar. Passos de bring-up estão em `tasks.md`.

## Open Questions

- Cidade da Marina pra Sobre / eventual "endereço do ateliê"? Não usado em V1 (contato = WhatsApp), mas pode entrar no ConfigSite depois.
- Fonte exata do rodapé (mesmo tamanho do corpo? menor?). Decisão de detalhe de layout deixada pra momento da implementação.
- Ícones (WhatsApp, Instagram, carrinho): usar SVG inline ou lib como `lucide-react`? Deixado pra tasks.md decidir - preferência por SVG inline pra evitar dependência.

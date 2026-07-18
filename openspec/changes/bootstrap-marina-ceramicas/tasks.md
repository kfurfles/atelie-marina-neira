## 1. Project scaffolding

- [x] 1.1 Create `web/` and `cms/` directories at the repo root
- [x] 1.2 Create root `docker-compose.yml` defining `web` (Next.js on port 3000) and `cms` (Strapi on port 1337) services with bind mounts for hot reload
- [x] 1.3 Create root `start.sh` that checks Docker availability and runs `docker compose up --build`; make it executable
- [x] 1.4 Add root `.gitignore` covering `node_modules/`, `.next/`, `.strapi/`, `cms/.tmp/`, `cms/build/`, `cms/database/*.db`, `.env*`
- [x] 1.5 Add root `README.md` with quickstart (`./start.sh`) and short description
- [x] 1.6 Add `README-marina.md` at the root explaining how Marina cadastra peças e edita textos via Strapi admin

## 2. Strapi CMS setup

- [x] 2.1 Bootstrap Strapi 5 in `cms/` with SQLite (`npx create-strapi-app@latest cms --quickstart --skip-cloud --no-run`)
- [x] 2.2 Create `cms/Dockerfile` (Node 20 alpine, `npm install`, `npm run develop` in dev)
- [x] 2.3 Configure Strapi to use SQLite via `cms/config/database.ts`
- [x] 2.4 Create `Categoria` collection type with schema fields: `nome`, `slug` (uid), `foto_capa` (media), `ordem` (int), `campos_customizacao` (component repeatable)
- [x] 2.5 Create `CampoCustomizacao` component (`label`, `tipo` enum, `opcoes` optional)
- [x] 2.6 Create `Produto` collection type with schema fields per `content-management` spec
- [x] 2.7 Create `EventoTimeline` component (`ano`, `titulo`, `descricao`)
- [x] 2.8 Create `Sobre` single type (`foto_marina`, `timeline` component repeatable)
- [x] 2.9 Create `ConfigSite` single type with all fields per spec
- [x] 2.10 Configure public role permissions: read access on `produto`, `categoria`, `sobre`, `config-site`
- [x] 2.11 Seed one Categoria ("Chicrinhas"), one Produto exemplo, populate Sobre and ConfigSite via admin walkthrough documented in `README-marina.md`

## 3. Next.js web setup

- [x] 3.1 Bootstrap Next.js 15 App Router in `web/` (`npx create-next-app@latest web --typescript --tailwind --app --no-src-dir --import-alias "@/*"`)
- [x] 3.2 Create `web/Dockerfile` (Node 20 alpine, `npm install`, `npm run dev` in dev)
- [x] 3.3 Add `clsx` dependency; configure `next.config.js` to allow images from `picsum.photos` and `localhost:1337`
- [x] 3.4 Configure Tailwind theme with palette (`cream`, `cream-dark`, `terracota`, `ink`, `ink-soft`) and `next/font` for Cormorant Garamond + Inter
- [x] 3.5 Create `lib/strapi.ts` with `fetchStrapi(path, opts)` helper reading `STRAPI_URL` env var; add basic types in `types/strapi.ts` for Produto/Categoria/Sobre/ConfigSite
- [x] 3.6 Create `lib/config.ts` fetching ConfigSite once (cached) and exposing `getConfig()`

## 4. Site shell

- [x] 4.1 Implement root `app/layout.tsx` with global fonts, palette CSS variables, and language `pt-BR`
- [x] 4.2 Implement `components/Header.tsx` with logo (text "Marina Cerâmicas" in serif), nav links Peças/Categorias/Sobre, cart icon with counter; hamburger on mobile
- [x] 4.3 Implement `components/Footer.tsx` as a single line with copyright, WhatsApp link, Instagram link, Cuidados link, Autógrafo link
- [x] 4.4 Implement `components/CartDrawer.tsx` as a right-side slide-in drawer with fade transition
- [x] 4.5 Implement `components/CartProvider.tsx` (React Context + localStorage sync under key `marina.cart`)
- [x] 4.6 Implement `components/Image.tsx` wrapper that falls back to `picsum.photos/seed/{seed}/{w}/{h}` when no source

## 5. Home page

- [x] 5.1 Implement `app/page.tsx` fetching ConfigSite, featured Produtos (`destaque = true`), Categorias, and Sobre
- [x] 5.2 Implement `components/Hero.tsx` (full-viewport image + overlaid `frase_filosofia`)
- [x] 5.3 Implement `components/FeaturedGrid.tsx` (grid of ProductCard)
- [x] 5.4 Implement `components/CategoriesShowcase.tsx` (card per Categoria linking to `/pecas?categoria={slug}`)
- [x] 5.5 Implement `components/SobreTeaser.tsx` (photo + short text + link to `/sobre`)

## 6. Catalog and categories

- [x] 6.1 Implement `app/pecas/page.tsx` with grid rendering (3 col desktop, 2 col mobile) reading query params
- [x] 6.2 Implement `components/FilterChips.tsx` (categoria + status) that updates the URL
- [x] 6.3 Implement `components/ProductCard.tsx` (photo, name, price `R$ {inteiro}`, status label, hover photo swap)
- [x] 6.4 Implement `app/categorias/page.tsx` (visual card per Categoria with count)
- [x] 6.5 Implement `app/categorias/[slug]/page.tsx` as a redirect to `/pecas?categoria={slug}`

## 7. Product detail

- [x] 7.1 Implement `app/pecas/[slug]/page.tsx` with split layout (photo left, details right); 404 when slug missing
- [x] 7.2 Implement `components/PhotoGallery.tsx` (main image + thumbnails, click swaps main with fade)
- [x] 7.3 Implement `components/CustomizeDrawer.tsx` (right drawer) with global fields, category-specific fields, `observacoes`; local state persists while page open
- [x] 7.4 Implement primary buttons: `Adicionar ao carrinho` (adds + opens CartDrawer briefly) and `Comprar via WhatsApp` (single-item link)
- [x] 7.5 Implement sold-piece branch: replace buttons with `Entrar em contato` linking to WhatsApp with "quero uma parecida" message
- [x] 7.6 Implement `Cuidados com a peça` section (produto.cuidados or fallback to ConfigSite.texto_cuidados_geral)
- [x] 7.7 Implement autograph badge linking to `/autografo`
- [x] 7.8 Implement `components/RelatedPieces.tsx` (up to 4 pieces from same Categoria; hide when none)

## 8. Cart and WhatsApp checkout

- [x] 8.1 Wire cart state through the app (add, remove, clear); update header counter
- [x] 8.2 Persist cart to `localStorage` on every change; hydrate on mount
- [x] 8.3 Implement `lib/whatsapp.ts` with `buildCartMessage(items, config)` and `buildSinglePieceMessage(item, config)`; both `encodeURIComponent`
- [x] 8.4 Message format per spec: one block per item (`*{nome}* — R$ {preco}`, canonical URL, customization key/value lines), `Total: R$ {soma}` at the end
- [x] 8.5 Implement `Finalizar via WhatsApp` button in CartDrawer opening `wa.me/{numero}?text=...` in new tab
- [x] 8.6 Implement empty cart message: display `Nenhum item`

## 9. Artist and informational pages

- [x] 9.1 Implement `app/sobre/page.tsx` (photo top, timeline entries sorted by year ascending)
- [x] 9.2 Implement `app/cuidados/page.tsx` rendering `ConfigSite.texto_cuidados_geral`
- [x] 9.3 Implement `app/autografo/page.tsx` rendering `ConfigSite.texto_selo_autografo`

## 10. Verification (requer execução manual - rode `./start.sh`)

- [ ] 10.1 `./start.sh` boots both containers with no errors
- [ ] 10.2 Strapi admin reachable at `http://localhost:1337/admin`; create admin user and cadastrar dados de exemplo (siga `README-marina.md`)
- [ ] 10.3 Home renders hero + featured + categorias + sobre teaser at `http://localhost:3000/`
- [ ] 10.4 `/pecas` shows grid; category and status filter chips update URL and results
- [ ] 10.5 Product card hover swaps to second photo (when present)
- [ ] 10.6 `/pecas/{slug}` renders split layout, Personalizar drawer opens with global + category fields, `Adicionar ao carrinho` adds and opens CartDrawer, `Comprar via WhatsApp` opens wa.me link with single-item message
- [ ] 10.7 Sold Produto shows `Vendida` in grid and `Entrar em contato` button on detail
- [ ] 10.8 CartDrawer persists items across reload; `Finalizar via WhatsApp` produces expected multi-item URL-encoded message
- [ ] 10.9 `/sobre`, `/cuidados`, `/autografo` render with content from Strapi
- [ ] 10.10 Header has no `Contato` link; rodapé shows single line with all required links

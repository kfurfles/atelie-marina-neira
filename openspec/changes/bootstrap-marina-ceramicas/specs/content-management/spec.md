## ADDED Requirements

### Requirement: Produto content type
The CMS SHALL provide a `Produto` collection type with fields: `nome` (string, required), `slug` (uid from nome, required), `categoria` (relation to Categoria, required), `descricao` (rich text), `frase_poetica` (text, short), `preco` (integer BRL, required), `fotos` (media, multiple, 1–3), `status` (enum: em_estoque, encomenda, vendido; required; default em_estoque), `prazo_encomenda_dias` (integer, optional), `cuidados` (rich text), `destaque` (boolean, default false).

#### Scenario: Publishing a piece
- **WHEN** Marina creates a Produto with all required fields and publishes it
- **THEN** the Produto is exposed via Strapi REST API and visible on the public site

#### Scenario: Missing required
- **WHEN** Marina tries to publish a Produto without a categoria
- **THEN** Strapi blocks publication and shows a validation error

### Requirement: Categoria content type with custom fields
The CMS SHALL provide a `Categoria` collection type with fields: `nome` (string, required), `slug` (uid, required), `foto_capa` (media, single, required), `ordem` (integer, default 0), `campos_customizacao` (repeatable component with `label`, `tipo` enum [dropdown, texto, numero], `opcoes` string optional).

#### Scenario: Category defines extra fields
- **WHEN** Marina creates a Categoria "Incensário" with `campos_customizacao` `[{label: "Furos", tipo: "numero"}, {label: "Aroma", tipo: "texto"}]`
- **THEN** the site's customization drawer for any Produto in that Categoria renders those two extra fields below the global fields

### Requirement: Sobre single type
The CMS SHALL provide a `Sobre` single type with fields: `foto_marina` (media, required) and `timeline` (repeatable component with `ano` integer, `titulo` string, `descricao` text).

#### Scenario: Timeline update
- **WHEN** Marina adds an entry `{ano: 2023, titulo: "Primeira exposição", descricao: "..."}` and publishes
- **THEN** the `/sobre` page renders that entry in chronological order

### Requirement: ConfigSite single type
The CMS SHALL provide a `ConfigSite` single type with fields: `whatsapp_numero` (string, E.164 format), `instagram_url` (string), `frase_filosofia` (text), `hero_titulo` (string), `hero_subtitulo` (string), `texto_selo_autografo` (rich text), `texto_cuidados_geral` (rich text).

#### Scenario: WhatsApp number drives checkout link
- **WHEN** Marina updates `whatsapp_numero` in ConfigSite
- **THEN** subsequent "Comprar via WhatsApp" clicks on the site use the new number

### Requirement: Public API access
The CMS SHALL expose read access to Produto, Categoria, Sobre, and ConfigSite to the `public` role without authentication.

#### Scenario: Anonymous fetch
- **WHEN** the Next.js site fetches `/api/produtos` without an API token
- **THEN** Strapi returns the published Produto list

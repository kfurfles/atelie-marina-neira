## ADDED Requirements

### Requirement: Product detail page
The site SHALL provide `/pecas/[slug]` rendering a single Produto with a split narrative layout: primary photo left, and right column with name, `frase_poetica`, price, status, and action buttons.

#### Scenario: Detail loads
- **WHEN** the user visits `/pecas/cinzeiro-lua` for a published Produto with that slug
- **THEN** the page renders with photo left and details right

#### Scenario: Slug not found
- **WHEN** the user visits a slug with no matching published Produto
- **THEN** the site returns a 404 page

### Requirement: Photo gallery
The detail page SHALL render up to 3 photos of the Produto (frente, lado, detalhe) as a small gallery under the main photo, clicking swaps the main image.

#### Scenario: Gallery navigation
- **WHEN** the user clicks a thumbnail
- **THEN** the main image updates to that photo with a fade transition

### Requirement: Customize drawer
The detail page SHALL provide a "Personalizar" button that opens a right-side drawer with global fields (`cor_desejada`, `tamanho_preferencia`, `acabamento`), category-specific fields from the Produto's Categoria, and a free-text `observacoes` field.

#### Scenario: Open drawer
- **WHEN** the user clicks "Personalizar"
- **THEN** a drawer slides in from the right showing all applicable fields
- **AND** the piece photo remains visible behind/beside the drawer

#### Scenario: Category-specific fields
- **WHEN** the Produto belongs to a Categoria with two custom fields defined
- **THEN** the drawer renders those two fields in addition to the global ones

#### Scenario: Persist across sessions
- **WHEN** the user fills the drawer, closes it, and reopens
- **THEN** their values are preserved in the drawer form state until they add to cart or leave the page

### Requirement: Two action buttons
The detail page SHALL render two primary buttons: "Adicionar ao carrinho" and "Comprar via WhatsApp".

#### Scenario: Add to cart
- **WHEN** the user clicks "Adicionar ao carrinho"
- **THEN** the current Produto plus customization payload is appended to the cart
- **AND** the cart drawer opens briefly to confirm

#### Scenario: Direct WhatsApp
- **WHEN** the user clicks "Comprar via WhatsApp"
- **THEN** the browser opens `wa.me/{whatsapp_numero}?text={mensagem}` in a new tab with a message containing only this piece and its customization

### Requirement: Sold piece behavior
If a Produto has `status = vendido`, the detail page SHALL replace both primary buttons with a single "Entrar em contato" button that opens WhatsApp with a "quero uma parecida" message.

#### Scenario: Sold piece
- **WHEN** the user opens the detail page of a sold Produto
- **THEN** they see one button "Entrar em contato"
- **AND** the button opens WhatsApp with text like "Olá Marina! Vi a peça {nome} ({url}) que está vendida. Você faria uma parecida?"

### Requirement: Care instructions section
The detail page SHALL render the Produto's `cuidados` (rich text) as a section labeled "Cuidados com a peça" below the description.

#### Scenario: Cuidados present
- **WHEN** the Produto has `cuidados` content
- **THEN** the section renders that rich text
- **AND** if `cuidados` is empty, the section falls back to `ConfigSite.texto_cuidados_geral`

### Requirement: Autograph seal badge
The detail page SHALL display a discreet autograph badge with a link to `/autografo`.

#### Scenario: Badge visible
- **WHEN** viewing the detail page
- **THEN** a small badge "Peça autografada" appears near the price
- **AND** clicking it navigates to `/autografo`

### Requirement: Related pieces section
The detail page SHALL render a "Da mesma categoria" section at the bottom showing up to 4 other Produtos from the same Categoria.

#### Scenario: Related grid
- **WHEN** viewing a Produto whose Categoria has 6 other published pieces
- **THEN** 4 of them appear at the bottom as small cards
- **AND** if fewer than 4 exist, all are shown
- **AND** if none exist, the section is hidden

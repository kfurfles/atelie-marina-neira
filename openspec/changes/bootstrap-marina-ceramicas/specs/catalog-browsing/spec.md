## ADDED Requirements

### Requirement: Pieces catalog page
The site SHALL provide `/pecas` rendering all published Produtos in a 3-column grid on desktop, 2 columns on mobile.

#### Scenario: Grid renders
- **WHEN** the user visits `/pecas`
- **THEN** all published Produtos are displayed as cards in a responsive grid

### Requirement: Category and status filters
The catalog page SHALL provide horizontal filter chips at the top allowing filtering by category and by stock status (em estoque, encomenda).

#### Scenario: Filter by category
- **WHEN** the user clicks the chip for a category
- **THEN** the URL updates to `/pecas?categoria={slug}` and the grid shows only pieces in that category

#### Scenario: Filter by status
- **WHEN** the user activates the "Em estoque" chip
- **THEN** only Produtos with `status = em_estoque` remain visible

#### Scenario: Combined filters
- **WHEN** both a category chip and a status chip are active
- **THEN** results match both filters

### Requirement: Product card composition
Each card SHALL show the product's primary photo, name, price formatted as `R$ {inteiro}` (no cents), and status label.

#### Scenario: Card shows status
- **WHEN** viewing a card with `status = encomenda` and `prazo_encomenda_dias = 20`
- **THEN** the card displays `Encomenda: 20 dias` below the price

#### Scenario: Card shows sold
- **WHEN** viewing a card with `status = vendido`
- **THEN** the card displays `Vendida` in place of the stock status label

### Requirement: Hover photo swap
On non-touch devices, a product card SHALL swap to the second photo on hover, fading between the two.

#### Scenario: Two photos
- **WHEN** the user hovers a card whose Produto has ≥2 photos
- **THEN** the visible image fades from photo 1 to photo 2

#### Scenario: Single photo
- **WHEN** the user hovers a card whose Produto has only 1 photo
- **THEN** no swap occurs

### Requirement: Placeholder fallback
When a Produto has no photos, the card and detail page SHALL render `picsum.photos/seed/{slug}/{w}/{h}` deterministically.

#### Scenario: Missing photos
- **WHEN** a published Produto has zero images
- **THEN** the site renders a picsum placeholder seeded by the Produto slug

### Requirement: Categories showcase page
The site SHALL provide `/categorias` rendering each Categoria as a visual card (foto_capa + nome + count of pieces).

#### Scenario: Category card
- **WHEN** the user visits `/categorias`
- **THEN** each Categoria appears as a card with cover photo, name, and count of published Produtos in that category

#### Scenario: Category card click
- **WHEN** the user clicks a category card on `/categorias`
- **THEN** they land on `/pecas?categoria={slug}`

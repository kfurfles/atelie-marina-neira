## ADDED Requirements

### Requirement: Hero section
The home page SHALL render a hero occupying the first viewport with a photograph of Marina's hands working clay and the `frase_filosofia` from ConfigSite overlaid.

#### Scenario: Hero renders
- **WHEN** the user opens `/`
- **THEN** the first fold shows the hero image full-width with the philosophical phrase overlaid in serif type

### Requirement: Featured pieces section
The home page SHALL render a section of featured pieces (Produtos with `destaque = true`) after the hero, as a grid of cards.

#### Scenario: Featured grid
- **WHEN** the user scrolls past the hero
- **THEN** they see a grid of up to 6 pieces where `destaque = true`
- **AND** each card matches the product card contract from `catalog-browsing`

### Requirement: Categories showcase section
The home page SHALL render a categories section listing all Categorias sorted by `ordem`, each as a visual card leading to that category on `/pecas`.

#### Scenario: Category cards navigate
- **WHEN** the user clicks a category card
- **THEN** they are taken to `/pecas?categoria={slug}`

### Requirement: Short "Sobre" teaser
The home page SHALL render a short "Sobre Marina" teaser before the footer, with a photo and a brief text ending in a link to `/sobre`.

#### Scenario: Teaser links
- **WHEN** the user clicks the "Conheça Marina" link in the teaser
- **THEN** they navigate to `/sobre`

### Requirement: Home section order
The home page SHALL render sections in this order: Hero → Featured pieces → Categories → Sobre teaser → Footer.

#### Scenario: Order enforced
- **WHEN** the user scrolls from top to bottom
- **THEN** sections appear in the order above

## ADDED Requirements

### Requirement: Global palette
The site SHALL use an off-white base palette with terracota as the sole accent color, and dark ink for text.

#### Scenario: Palette tokens present
- **WHEN** inspecting the Tailwind config
- **THEN** color tokens include `cream` (#F5F0E8), `cream-dark` (#EAE2D3), `terracota` (#C87456), `ink` (#1F1B18), `ink-soft` (#5A524B)

### Requirement: Typography pairing
The site SHALL use a serif font for headings and a sans-serif font for body text, both loaded via `next/font`.

#### Scenario: Fonts applied
- **WHEN** viewing any page
- **THEN** `h1`, `h2`, `h3` render in Cormorant Garamond
- **AND** paragraph and UI text renders in Inter

### Requirement: Header navigation
The site SHALL render a persistent header with logo, links `Peças`, `Categorias`, `Sobre`, and a cart icon showing item count.

#### Scenario: Header on every page
- **WHEN** the user visits any public route
- **THEN** the header is visible at the top with logo left, nav links center, cart icon right

#### Scenario: No Contato link
- **WHEN** viewing the header
- **THEN** there is no "Contato" link in the navigation

### Requirement: Footer
The site SHALL render a single-line footer containing copyright, WhatsApp link, Instagram link, and links to `/cuidados` and `/autografo`.

#### Scenario: Footer content
- **WHEN** the user scrolls to the bottom of any page
- **THEN** the footer displays `© Marina Cerâmicas {ano} · WhatsApp · Instagram · Cuidados · Autógrafo` in one line (wrapping only on very narrow screens)

### Requirement: Subtle fade animations
The site SHALL apply subtle fade transitions to image loads, hover states, and drawer/modal open/close animations, without heavy motion libraries.

#### Scenario: Image fade-in
- **WHEN** an image finishes loading
- **THEN** it fades in over ~300ms

### Requirement: Responsive layout
The site SHALL be responsive across mobile, tablet, and desktop breakpoints using standard Tailwind breakpoints, without a mobile-specific feature set.

#### Scenario: Mobile viewport
- **WHEN** the user opens the site on a viewport under 640px wide
- **THEN** grids collapse to fewer columns, header nav becomes a hamburger, and content remains legible without horizontal scroll

### Requirement: Portuguese-only content
The site SHALL render all UI text in Brazilian Portuguese with no i18n toggle.

#### Scenario: No language switcher
- **WHEN** inspecting the site
- **THEN** there is no language toggle in the UI
- **AND** all copy is in pt-BR

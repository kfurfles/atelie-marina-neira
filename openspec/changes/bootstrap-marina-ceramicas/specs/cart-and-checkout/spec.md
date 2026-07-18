## ADDED Requirements

### Requirement: Cart drawer
The site SHALL provide a right-side cart drawer accessible from the header cart icon, showing all added items with photo, name, price, customization summary, and a remove control.

#### Scenario: Open cart drawer
- **WHEN** the user clicks the cart icon in the header
- **THEN** the drawer slides in from the right showing current items and the total

#### Scenario: Empty cart
- **WHEN** the drawer opens with no items
- **THEN** it shows the message "Nenhum item"

#### Scenario: Remove item
- **WHEN** the user clicks remove on an item
- **THEN** that item is removed from the cart and the total updates

### Requirement: Cart persistence
The cart SHALL persist across page reloads via `localStorage` under a stable key (`marina.cart`), without requiring login.

#### Scenario: Reload preserves cart
- **WHEN** the user adds two items and reloads the page
- **THEN** both items are still present in the drawer

#### Scenario: New tab
- **WHEN** the user opens the site in a new tab in the same browser
- **THEN** the cart contents match the other tab at load time

### Requirement: WhatsApp checkout link
The cart drawer SHALL provide a "Finalizar via WhatsApp" button that opens `wa.me/{whatsapp_numero}?text={mensagem}` with a message listing every item.

#### Scenario: Multi-item message
- **WHEN** the user has 2 items and clicks Finalizar
- **THEN** the message includes two blocks (one per item), each with `*{nome}* — R$ {preco}`, item URL, customization fields, and a `Total: R$ {soma}` line at the end
- **AND** the message is URI-encoded

### Requirement: Item URL in checkout
Each item block in the WhatsApp message SHALL include the canonical URL of the piece on the site.

#### Scenario: URL included
- **WHEN** the checkout message is generated
- **THEN** each item block contains `{origin}/pecas/{slug}`

### Requirement: No online payment
The site SHALL NOT process payment; all sales complete outside the site via WhatsApp.

#### Scenario: No checkout page
- **WHEN** inspecting the site's routes
- **THEN** there is no `/checkout` or payment page
- **AND** the only completion path is the WhatsApp link

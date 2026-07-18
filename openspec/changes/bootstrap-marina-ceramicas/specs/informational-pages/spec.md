## ADDED Requirements

### Requirement: Cuidados page
The site SHALL provide `/cuidados` rendering `ConfigSite.texto_cuidados_geral` as a static informational page.

#### Scenario: Cuidados content
- **WHEN** the user visits `/cuidados`
- **THEN** the page renders the general care rich text from ConfigSite

### Requirement: Autografo page
The site SHALL provide `/autografo` rendering `ConfigSite.texto_selo_autografo` explaining the discreet autograph mark on every piece.

#### Scenario: Autografo content
- **WHEN** the user visits `/autografo`
- **THEN** the page renders the autograph explanation with a photo of the seal (if configured) and text

### Requirement: Rodapé linking
The Cuidados and Autografo pages SHALL be reachable from the site rodapé links.

#### Scenario: Reach via rodapé
- **WHEN** the user clicks "Cuidados" or "Autógrafo" in the rodapé of any page
- **THEN** they arrive on the corresponding informational page

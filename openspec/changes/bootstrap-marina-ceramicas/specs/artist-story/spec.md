## ADDED Requirements

### Requirement: Sobre page
The site SHALL provide `/sobre` rendering Marina's photo (`Sobre.foto_marina`) at the top and a chronological timeline of her trajectory below.

#### Scenario: Sobre page loads
- **WHEN** the user visits `/sobre`
- **THEN** the page shows Marina's photo followed by timeline entries in ascending year order

### Requirement: Timeline entries
Each timeline entry SHALL display `ano`, `titulo`, and `descricao`.

#### Scenario: Entry rendering
- **WHEN** rendering an entry `{ano: 2020, titulo: "Primeiro forno", descricao: "..."}`
- **THEN** the year, title, and description are visible with clear visual hierarchy

### Requirement: First-person tone
Copy on the Sobre page SHALL be authored in first person (Marina speaking directly).

#### Scenario: Voice check
- **WHEN** reading the Sobre page copy
- **THEN** the narration uses first-person forms (e.g., "meu ateliê", "comecei", "trabalho")

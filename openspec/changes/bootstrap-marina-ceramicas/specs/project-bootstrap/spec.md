## ADDED Requirements

### Requirement: Repository structure
The repository SHALL have `web/` (Next.js app) and `cms/` (Strapi app) as sibling directories at the root, with `docker-compose.yml` and `start.sh` at the root.

#### Scenario: Fresh clone layout
- **WHEN** a developer clones the repository
- **THEN** they see `web/`, `cms/`, `docker-compose.yml`, `start.sh`, `openspec/` at the root
- **AND** `web/` and `cms/` each contain their own `package.json` and `Dockerfile`

### Requirement: Single-command startup
The project SHALL provide a `start.sh` script at the root that builds and starts both `web` and `cms` services via docker compose.

#### Scenario: First run
- **WHEN** the developer runs `./start.sh` on a machine with Docker Desktop running
- **THEN** docker compose builds both images and starts both services
- **AND** the Next.js site becomes reachable at `http://localhost:3000`
- **AND** the Strapi admin becomes reachable at `http://localhost:1337/admin`

#### Scenario: Missing Docker
- **WHEN** the developer runs `./start.sh` without Docker available on PATH
- **THEN** the script exits with a clear error message indicating Docker is required

### Requirement: Isolated npm projects
The `web/` and `cms/` directories SHALL be independent npm projects with no monorepo tooling (no pnpm workspaces, no Turbo, no root-level `package.json` that declares workspaces).

#### Scenario: Independent install
- **WHEN** a developer runs `npm install` inside `web/`
- **THEN** dependencies install only for `web/`, without touching `cms/`

### Requirement: Local-only runtime
The project SHALL run entirely on localhost with no external deploy dependencies.

#### Scenario: No cloud config
- **WHEN** inspecting the repository
- **THEN** there are no deploy configurations (no Vercel, no fly.toml, no CI workflows)
- **AND** the CMS database is SQLite stored inside `cms/` (file-based, no external DB service)

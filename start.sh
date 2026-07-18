#!/usr/bin/env bash
set -euo pipefail

if ! command -v docker >/dev/null 2>&1; then
  echo "Erro: Docker não encontrado no PATH." >&2
  echo "Instale o Docker Desktop e abra o app antes de rodar este script." >&2
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "Erro: Docker está instalado mas não está rodando." >&2
  echo "Abra o Docker Desktop e tente de novo." >&2
  exit 1
fi

echo "→ Subindo Marina Cerâmicas (web + cms)..."
echo "  Site:  http://localhost:3000"
echo "  Admin: http://localhost:1337/admin"
echo ""

docker compose up --build

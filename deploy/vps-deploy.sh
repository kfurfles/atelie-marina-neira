#!/usr/bin/env bash
# Executa na VPS. Extrai release, faz symlink atomic, restart dos serviços.
# Uso: bash vps-deploy.sh <RELEASE> <TARGET: both|web|cms>
set -euo pipefail

RELEASE="${1:?release required}"
TARGET="${2:-both}"

ROOT=/opt/marina
RELEASE_DIR="$ROOT/releases/$RELEASE"
CURRENT="$ROOT/current"
SHARED="$ROOT/shared"
UPLOADS="/var/marina/uploads"
TARBALL="/tmp/marina-$RELEASE.tar.gz"

echo "[deploy] release=$RELEASE target=$TARGET"

# Se for parcial (só web ou só cms), começa a partir da release atual
if [ "$TARGET" != "both" ] && [ -L "$CURRENT" ]; then
  CURRENT_PATH=$(readlink -f "$CURRENT")
  mkdir -p "$RELEASE_DIR"
  cp -a "$CURRENT_PATH"/. "$RELEASE_DIR/"
else
  mkdir -p "$RELEASE_DIR"
fi

# Extrai novo tarball por cima (sobrescreve web/ e/ou cms/)
tar -xzf "$TARBALL" -C "$RELEASE_DIR"

# --- WEB ---
if [ "$TARGET" = "both" ] || [ "$TARGET" = "web" ]; then
  ln -sf "$SHARED/web.env" "$RELEASE_DIR/web/.env"
fi

# --- CMS ---
if [ "$TARGET" = "both" ] || [ "$TARGET" = "cms" ]; then
  ln -sf "$SHARED/cms.env" "$RELEASE_DIR/cms/.env"

  # Symlink uploads (persistente entre releases)
  mkdir -p "$RELEASE_DIR/cms/public"
  rm -rf "$RELEASE_DIR/cms/public/uploads"
  ln -s "$UPLOADS" "$RELEASE_DIR/cms/public/uploads"

  # Prod deps do CMS
  echo "[deploy] npm ci cms..."
  (cd "$RELEASE_DIR/cms" && npm ci --omit=dev --legacy-peer-deps --silent)
fi

# Atomic swap
ln -sfn "$RELEASE_DIR" "$CURRENT.new"
mv -Tf "$CURRENT.new" "$CURRENT"

# Restart serviços
if [ "$TARGET" = "both" ] || [ "$TARGET" = "cms" ]; then
  echo "[deploy] restart marina-cms..."
  sudo -n /bin/systemctl restart marina-cms
fi
if [ "$TARGET" = "both" ] || [ "$TARGET" = "web" ]; then
  echo "[deploy] restart marina-web..."
  sudo -n /bin/systemctl restart marina-web
fi

# Cleanup
rm -f "$TARBALL"

# Mantém últimas 3 releases
ls -1t "$ROOT/releases" | tail -n +4 | while read old; do
  echo "[deploy] removendo release antiga: $old"
  rm -rf "$ROOT/releases/$old"
done

# Health check
sleep 4
CMS_OK=$(curl -sf http://127.0.0.1:1337/admin -o /dev/null -w "%{http_code}" || echo "fail")
WEB_OK=$(curl -sf http://127.0.0.1:3000 -o /dev/null -w "%{http_code}" || echo "fail")
echo "[deploy] cms=$CMS_OK web=$WEB_OK"

if [ "$CMS_OK" != "200" ] || [ "$WEB_OK" != "200" ]; then
  echo "[deploy] HEALTHCHECK FAILED"
  exit 1
fi

echo "[deploy] OK - release $RELEASE ativa"

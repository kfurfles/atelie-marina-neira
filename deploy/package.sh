#!/usr/bin/env bash
# Empacota release em /tmp/marina-<RELEASE>.tar.gz
# Uso: deploy/package.sh <RELEASE> <TARGET: both|web|cms>
set -euo pipefail

RELEASE="${1:?release name required}"
TARGET="${2:-both}"
STAGE="/tmp/marina-stage-$RELEASE"
OUT="/tmp/marina-$RELEASE.tar.gz"

rm -rf "$STAGE"
mkdir -p "$STAGE"

# --- WEB ---
if [ "$TARGET" = "both" ] || [ "$TARGET" = "web" ]; then
  mkdir -p "$STAGE/web/.next"
  cp -r web/.next/standalone/. "$STAGE/web/"
  cp -r web/.next/static "$STAGE/web/.next/static"
  [ -d web/public ] && cp -r web/public "$STAGE/web/public" || mkdir -p "$STAGE/web/public"
  echo "web: $(du -sh $STAGE/web | cut -f1)"
fi

# --- CMS ---
if [ "$TARGET" = "both" ] || [ "$TARGET" = "cms" ]; then
  mkdir -p "$STAGE/cms/public"
  cp -r cms/config cms/src cms/package.json cms/package-lock.json "$STAGE/cms/"
  [ -d cms/build ] && cp -r cms/build "$STAGE/cms/"
  [ -d cms/dist ] && cp -r cms/dist "$STAGE/cms/"
  echo "cms: $(du -sh $STAGE/cms | cut -f1)"
fi

# Remove macOS metadata (only affects when packaging on macOS locally)
find "$STAGE" -name '._*' -delete 2>/dev/null || true
find "$STAGE" -name '.DS_Store' -delete 2>/dev/null || true

tar -C "$STAGE" -czf "$OUT" .
rm -rf "$STAGE"

echo ""
echo "package: $OUT ($(du -h $OUT | cut -f1))"

#!/bin/bash
set -e

# ===== KONFIGURACJA =====
LOGIN="asbrowszone"
SSH_HOST="s1.small.pl"
DOMENA="browszone.pl"
NODE_VERSION="node18"
REMOTE_PATH="/usr/home/$LOGIN/domains/$DOMENA"
OUTPUT_DIR="./public_nodejs"

# ===== BUDOWANIE FRONTENDU =====
echo "=== Czyszczenie starej wersji ==="
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR/public"

echo "=== Budowanie frontendu (React + Vite) ==="
npm install
npm run build
cp -r dist/* "$OUTPUT_DIR/public"

# Pliki SEO i .htaccess
[ -f backend/.htaccess ] && cp backend/.htaccess "$OUTPUT_DIR/public/.htaccess"
[ -f backend/robots.txt ] && cp backend/robots.txt "$OUTPUT_DIR/public/robots.txt"
[ -f backend/sitemap.xml ] && cp backend/sitemap.xml "$OUTPUT_DIR/public/sitemap.xml"
[ -f backend/favicon.ico ] && cp backend/favicon.ico "$OUTPUT_DIR/public/favicon.ico"

# ===== BUDOWANIE BACKENDU =====
cd backend
npm install
npx esbuild src/index.js --bundle --platform=node --outdir=dist
cd ..

mkdir -p "$OUTPUT_DIR/dist"
cp -r backend/dist/* "$OUTPUT_DIR/dist"
cp -r backend/src/templates "$OUTPUT_DIR/templates"

echo "require('./dist/index.js');" > "$OUTPUT_DIR/app.js"

cp backend/package*.json "$OUTPUT_DIR"
cp -r backend/node_modules "$OUTPUT_DIR/node_modules"
[ -f backend/.env ] && cp backend/.env "$OUTPUT_DIR/.env"
[ -d backend/prisma ] && cp -r backend/prisma "$OUTPUT_DIR/prisma"
[ -f backend/service-account.json ] && cp backend/service-account.json "$OUTPUT_DIR/service-account.json"

# ===== DEPLOY =====
echo "=== Wysyłanie na serwer ==="
tar -czf - public_nodejs | ssh "$LOGIN@$SSH_HOST" "
  cd '$REMOTE_PATH' &&
  rm -rf public_nodejs &&
  tar -xzf - &&
  $NODE_VERSION && npm --prefix public_nodejs install --production &&
  devil www restart '$DOMENA'
"

echo "=== DEPLOY ZAKOŃCZONY ==="
echo "Aplikacja powinna być dostępna pod: https://$DOMENA"

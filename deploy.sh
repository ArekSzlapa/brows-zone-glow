#!/bin/bash
set -e

# ======= KONFIGURACJA =======
LOGIN="asbrowszone"         # login do small.pl (np. jan_kowalski)
SSH_HOST="s1.small.pl"
DOMENA="browszone.pl"    # Twoja domena przypisana do Node.js
NODE_VERSION="node18"      # wersja node na serwerze (np. node20, node22)
REMOTE_PATH="/usr/home/$LOGIN/domains/$DOMENA"
OUTPUT_DIR="./public_nodejs"
PACKAGE_NAME="public_nodejs.tar.gz"


# ======= BUDOWANIE =======
echo "=== Czyszczenie starej wersji ==="
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR/public"

echo "=== Budowanie frontendu (React + Vite) ==="
npm install
npm run build
cp -r dist/* "$OUTPUT_DIR/public"

echo "=== Budowanie backendu (Express + TypeScript) ==="
cd backend
npm install
npx tsc
cd ..

echo "=== Kopiowanie backendu do public_nodejs/dist ==="
mkdir -p "$OUTPUT_DIR/dist"
cp -r backend/dist/* "$OUTPUT_DIR/dist"

echo "=== Tworzenie pliku startowego app.js ==="
echo "require('./dist/index.js');" > "$OUTPUT_DIR/app.js"

echo "=== Kopiowanie package.json i node_modules ==="
cp backend/package*.json "$OUTPUT_DIR"
cp -r backend/node_modules "$OUTPUT_DIR/node_modules"

echo "=== Kopiowanie plików konfiguracyjnych (opcjonalnych) ==="
[ -f backend/.env ] && cp backend/.env "$OUTPUT_DIR/.env"
[ -d backend/prisma ] && cp -r backend/prisma "$OUTPUT_DIR/prisma"
[ -f backend/service-account.json ] && cp backend/service-account.json "$OUTPUT_DIR/service-account.json"

# ======= DEPLOY (1 połączenie SSH) =======
echo "=== Wysyłanie i instalacja na serwerze (jedno połączenie) ==="
tar -czf - public_nodejs | ssh "$LOGIN@$SSH_HOST" "
  cd '$REMOTE_PATH' &&
  rm -rf public_nodejs &&
  tar -xzf - &&
  $NODE_VERSION && npm --prefix public_nodejs install --production &&
  devil www restart '$DOMENA'
"

echo "=== DEPLOY ZAKOŃCZONY ==="
echo "Aplikacja powinna być dostępna pod: https://$DOMENA"
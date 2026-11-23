#!/bin/sh
# FamLink — publică versiunea curentă (deja salvată cu git commit). Rulează: sh deploy.sh
#  1) Firebase Hosting → https://famlink-push.web.app/  (adresa principală din v4.3.0)
#  2) GitHub Pages     → https://drg2121.github.io/famlink/ (adresa veche: arată anunțul de mutare)
# Publică DOAR site-ul (--only hosting). Backend-ul Firebase (functions, reguli) nu se atinge de aici.
cd "$(dirname "$0")" || exit 1
if [ -n "$(git status --porcelain)" ]; then
  echo "Ai modificări nesalvate în git. Fă întâi commit, apoi rulează din nou."; exit 1
fi
firebase deploy --only hosting --project famlink-push || exit 1
git push origin main || exit 1
VER=$(grep -oE "APP_VER='[^']+'" index.html | cut -d"'" -f2)
echo ""
echo "Gata. Verifică pe https://famlink-push.web.app/ că scrie v$VER jos în Setări → Date & backup."

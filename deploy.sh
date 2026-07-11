#!/bin/sh
# FamLink — deploy pe GitHub Pages. Ruleaza: sh deploy.sh
cd "$(dirname "$0")" || exit 1
rm -f .git/index.lock                       # curata lock-ul ramas
git add index.html README.md MODIFICARI.md PUSH-SETUP.md NOTIFICARI-PUSH-CE-AM-FACUT.md \
        firebase-config.js firebase-messaging-sw.js manifest.json
git commit -m "feat: logo=acasa, obiective AI pe membru/familie, purjare emailuri vechi (v3.6)"
git pull --no-rebase --no-edit -X ours origin main   # reconciliaza cu ce e pe GitHub (local castiga la conflicte)
git push
echo ""
echo "Gata. Verifica in ~1 min pe https://drg2121.github.io/famlink/?v=36 ca scrie v3.6 jos in Setari."

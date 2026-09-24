# FamLink — Calendarul Familiei

Aplicație într-un singur fișier (`index.html`), pe modelul ArhiLink: fără server, datele stau local în browser (localStorage), backup/restore JSON.

**Module:** Azi (ecranul zilei), Calendar (Lună / An / Zi / Obiective, recurențe, notificări, motto-ul lunii, print A3/A4 landscape, export .ics pentru iPhone) și Sănătate (profil + IMC/BMR/TDEE, jurnal greutate cu grafic, fasting cu contor și notificări, mese + calorii, analiză foto și meniuri cu Gemini AI).

## Noutăți v4.1

- **Poza farfuriei se notează singură** (Mese, „Poză la masă” sau în chat): caloriile se calculează și masa intră direct în jurnal, cu porție ajustabilă și „Anulează”.
- **Poza meniului primește sugestii**: asistentul îți spune direct ce și cât să-ți pui, fără întrebări în plus.
- **Import din Apple Health fără dubluri**: ziua are un singur rând, oricâte dispozitive ale familiei o citesc și de câte ori rulează scurtătura. Dublurile vechi se curăță singure.

## Noutăți v4.0 — mai simplu, mai automat

- **Ecranul „Azi"** (prima filă, se deschide implicit): salut cu o frază de susținere construită din cifrele tale, inele pentru calorii, apă, mișcare și fasting/pași, câte calorii mai ai, șase acțiuni rapide (+250 ml, „Ce-am mâncat" în chat, poză la masă, cântărire, fasting, mișcare), fastingul în curs, calendarul zilei cu bifă și datele din ceas.
- **Mesele din chat se notează pe loc**, fără fereastra de confirmare. Sub răspuns apare un card cu porția (½ · ¾ · 1 · 1¼ · 1½ · 2), kcal editabile, tipul mesei și „Anulează". „Am mâncat mai mult / mai puțin" corectează ultima masă; „am mai mâncat și…" adaugă una nouă. După un card din meniu, „am mâncat tot piureul și jumătate din tocană" reface cardul și îl notează direct (a doua corectură înlocuiește mesele, nu le dublează).
- **Fasting automat**: pornește singur seara la ora aleasă (sau de la ultima masă, dacă mănânci după), se oprește când notezi prima masă (dacă abia începuse, îl reia de la ora mesei), se închide singur la țintă. Recuperează corect și ce s-a întâmplat cât aplicația a stat închisă. Tot ce face singur apare într-un mesaj cu „Anulează".
- **Notificări cu măsură** (Mementouri): un singur planificator pentru cântărire, apă, mese, mișcare, bilanț și „te așteptăm înapoi". Fiecare vine doar dacă mai are rost, cu plafon pe zi (Liniștit 2 · Echilibrat 4 · Mai des 7), la distanță una de alta și niciodată în orele de liniște. Apa vine doar când rămâi în urmă față de ritmul zilei și niciodată la mai puțin de 2 ore după un pahar. Ecranul arată exact ce mai urmează azi. Texte calde, cu cifrele tale, în loc de „E momentul!".
- **Import automat din Apple Health** (Sănătate → Ceas): o scurtătură pe iPhone trimite în fiecare seară pașii, caloriile active și în repaus, minutele de exercițiu, distanța și greutatea (de la cântarul inteligent) în gistul privat de sincronizare; FamLink le preia la următoarea sincronizare și șterge fișierul. Ghid pas cu pas în aplicație, cu butoane de copiere.
- Grafică: meniu cu 5 file și indicator, mesaje (toast) cu buton de acțiune, carduri noi pe Azi, Mementouri și Fasting, temă întunecată pentru tot ce e nou.

## Noutăți v3.13

- **Meniul de la cantină, până la capăt.** Asistentul îți spune cât să-ți pui, iar după masă îi spui ce ai mâncat de fapt: „tot piureul, jumătate din tocană și murături". Cardul se reface cu cantitățile tale (inclusiv felurile din meniu pe care nu ți le propusese), devine „Ce ai în farfurie" și intră în mese. Fiecare fel are și butoane ½ · ¾ · 1 · 1½ · 2. Dacă ai adăugat deja masa și te răzgândești („de fapt am mâncat doar jumătate din tocană"), asistentul corectează masa notată, nu creează alta. La poza din Mese, aceleași butoane de porție.
- **Planul tău** (Sănătate → Profil): ținta de kg, data până la care vrei să ajungi, ritmul necesar (lejer / sănătos / ambițios / prea rapid), ritmul tău real din cântăriri și caloriile pe zi care corespund — cu un buton care le setează. Fără dată, alegi un ritm și aplicația fixează data și caloriile.
- **Săptămâna asta**: obiective mici pe săptămână (kg, cântăriri, minute de mișcare, mese notate, apă la țintă, fasting), bifate din datele reale, editabile.
- **Notificări inteligente** (Mementouri): cântărire, mișcare, apă, mese și bilanțul de duminică — vin doar când e cazul, cu cifrele tale, pe loc când aplicația e deschisă și prin push când e închisă.
- Cântarul: afișajul citit ca „E 211" e recunoscut ca 112,3 kg răsturnat și când cifrele vin cu spații sau în câmpul de cod.

## Noutăți v3.12

- **Sănătate redesenată.** Profilul se deschide cu un card mare: greutatea de acum, cât ai dat jos de la start, ritmul pe săptămână, inelul „din drum" și bara start → țintă cu data estimată la care ajungi. Sub el, tile-uri cu iconițe (IMC, BMR, menținere, țintă, serie de cântăriri, talie). Graficul greutății e netezit, are umplere gradient, media pe 7 zile, linia țintei, un comutator 30 zile / 3 luni / tot și tooltip la atingere.
- **Progres refăcut.** Un hero cu inelul reperelor atinse și nivelul tău (Start → Început → Pe drum → Constant → Avansat → Maestru), „Urmează" cu cele mai apropiate trei repere, „Ultimele 7 zile" (greutate, mișcare, mese notate, apă, fasting, pași), „Ce ai atins" ca o cronologie cu date, filtre pe grupă și insigne colorate pe grupă, cu inel de progres pentru cele neatinse.
- **Fasting cu etape.** Inel mai mare cu strălucire, etapa curentă (digestie, glicogen, ardere, autofagie) și istoricul ca bule verzi/galbene.
- **Sport pe 7 zile** (bare cu minutele pe zi, inclusiv cele din ceas) și **inele concentrice** din ceas, ca pe telefon, în tabul Ceas. Corp primește un gauge pentru grăsimea corporală.
- **Asistentul citește cântarul și ceasul.** Trimiți poza afișajului de cântar sau o captură din aplicația de fitness direct în chat: recunoaște singur ce e, citește cifrele și îți dă un card de confirmare (editabil) înainte să salveze.

## Noutăți v3.11

- **Cântărire din poză** (Sănătate → Profil): fotografiezi afișajul cântarului și AI-ul citește kilogramele — inclusiv `lb`/`st`, convertite în kg. Dacă afișajul arată un cod de eroare sau cifre neclare, îți spune ce a văzut, îți dă pașii de reîncercare și te lasă să scrii greutatea de mână.
- **Repere de progres** (Sănătate → Progres): 37 de borne pe greutate, sănătate, constanță, mișcare și fasting, fiecare cu progresul real și cu următorul reper scos în față. Cele deja atinse se însămânțează tăcut la prima deschidere; de acolo încolo, fiecare reper nou se sărbătorește o dată.
- **Calibrare după ceas** (Sănătate → Ceas): trimiți un screenshot din Apple Fitness/Health, Google Fit, Samsung Health, Fitbit sau Garmin, iar aplicația își corectează consumul zilnic estimat după cifra măsurată, nu după formulă. Caloriile active ale zilei intră direct în bugetul de la Mese, în locul estimării MET a sesiunilor de sport.

## Sincronizare privată între dispozitive (v1.3)

Datele NU se publică pe GitHub Pages — stau doar în browserul tău. Dacă vrei să le ai pe mai multe dispozitive, activează sincronizarea din **Setări → Sincronizare privată**:

1. Creează un token GitHub: **Settings → Developer settings → Personal access tokens (classic) → Generate**, bifând **doar** scope-ul `gist`.
2. Lipește tokenul + o **parolă de criptare** aleasă de tine (ține-o minte — fără ea datele nu pot fi citite).
3. Apasă **Conectează**. Datele se salvează criptate (AES-256) într-un gist **privat**. Pe alt dispozitiv, pui același token și aceeași parolă și apeși Conectează/Încarcă.

Criptarea e end-to-end: nici GitHub, nici altcineva nu poate citi datele fără parola ta. Emailul/numele personal nu mai sunt în cod.


## Iconițe & design

Iconițe profesionale [Lucide](https://lucide.dev) (CDN jsdelivr), paletă verde după logo-ul FamLink (monograma F cu frunză).

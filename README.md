# FamLink — Calendarul Familiei

Aplicație într-un singur fișier (`index.html`), pe modelul ArhiLink: fără server, datele stau local în browser (localStorage), backup/restore JSON.

**Module:** Calendar (Lună / An / Zi / Obiective, recurențe, notificări, motto-ul lunii, print A3/A4 landscape, export .ics pentru iPhone) și Sănătate (profil + IMC/BMR/TDEE, jurnal greutate cu grafic, fasting cu contor și notificări, mese + calorii, analiză foto și meniuri cu Gemini AI).

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

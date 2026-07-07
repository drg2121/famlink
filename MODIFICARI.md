# FamLink — Istoric modificări & decizii

Aplicație single-file (`index.html`), arhitectură ArhiLink: fără server, date în localStorage, backup/restore JSON, publicare pe GitHub Pages.

---

## Decizii inițiale (2026-07-06)

- **Nume ales: FamLink** (variante propuse: FamLink, NestCal, KinDay, VitaFam).
- **Logo ales: varianta 3** — monogramă F cu frunză, paletă verde. Fișiere: `logo-1-calendar-inima.svg`, `logo-2-verigi-familie.svg`, `logo-3-monogram-frunza.svg`.
- **Limbă:** română. **AI:** cheie Gemini introdusă de utilizator în Setări (salvată doar local).
- **Locație:** subfolder `famlink/` în repo-ul `arhilink` → live la `https://drg2121.github.io/arhilink/famlink/` după push.

---

## v1.0 — aplicația de bază

**Calendar familie**
- Vizualizări: Lună (grilă cu toate zilele, start luni), An (12 mini-calendare), Zi (listă cu bifare „făcut").
- Activități: titlu, dată, oră, durată, categorie (Familie/Sport/Școală/Sănătate/Muncă/Altele), participanți, notițe.
- Recurențe: zilnic/săptămânal/lunar/anual, interval „la fiecare N", dată de final.
- Notificări browser înainte de eveniment (0 min – 1 zi); verificare la 30 s.
- Motto-ul lunii (click în header), editabil per lună.
- Obiective pe lună/an, per membru, cu bară de progres; apar și pe cardul lunii + pe print.
- Export .ics (tot / luna curentă / un eveniment) cu RRULE + VALARM → import direct în Calendar iPhone/Google; trimitere pe email (Web Share / mailto).
- Print lună landscape A4/A3.

**Slăbit / Sănătate**
- Profil per membru: sex, vârstă, înălțime, greutate, țintă, activitate → IMC, BMR (Mifflin-St Jeor), TDEE, țintă calorică (TDEE−500, min. 1200).
- Jurnal greutate cu grafic SVG + linie de țintă.
- Fasting 14/16/18/20 h: inel de progres live, notificare la atingerea țintei, istoric ultimele 7.
- Mese pe zi (tip, denumire, kcal) cu bară calorii vs țintă; recomandări statice de mese.
- Gemini AI: analiză poză mâncare (kcal + macro + evaluare + sugestie, JSON) și meniu personalizat pe restul zilei. Modele: gemini-2.0-flash (implicit), 2.5-pro, 2.5-flash.

**Setări:** membri familie, cheie Gemini, notificări, format print, backup/restore JSON, reset.

---

## v1.1 — rebranding logo 3 + Lucide + 2 taburi

- Temă verde după logo 3: #0e7c60 / #16a37f / #7bd94a; favicon și logo header noi.
- Iconuri profesionale **Lucide** (CDN jsdelivr, versiune fixată 0.462.0) în toată interfața.
- Navigare simplificată: **doar 2 taburi** — Calendar (sub-taburi Lună/An/Zi/Obiective) și Sănătate (Profil/Fasting/Mese/AI). Setările la rotița din header.
- Mobile friendly: taburi jos pe telefon, safe-area iPhone, grilă compactă sub 560px.
- Ghid pas-cu-pas cheie Gemini în Setări (notă: abonamentul Gemini Pro e separat de API; cheia din AI Studio are nivel gratuit).
- `README.md` cu pașii de publicare GitHub Pages.

---

## v1.2 — fără emoji, Corp, fasting custom, print full-page (curent)

- **Zero emoji**: avatare = cerc colorat cu inițiala numelui (câmpul emoji eliminat de la membri); toate iconurile Lucide.
- **Fasting custom**: opțiune „Custom…" cu ore proprii (1–72, pas 0,5).
- **Tab nou „Corp" (analiză corporală)**: talie + gât (+ șold la femei) → % grăsime corporală (metoda US Navy, Hodgdon & Beckett 1984), masă grasă/slabă, raport talie/înălțime, risc talie (praguri OMS: F 80/88 cm, M 94/102 cm). Sfaturi condiționate pe rezultate, din ghiduri publice: OMS activitate fizică 2020 (150–300 min/săpt + 2 forță), CDC/NIH deficit ~500 kcal/zi ≈ 0,5 kg/săpt, proteine 1,2–1,6 g/kg, zahăr <10%, fibre 25–30 g, somn 7–9 h. Sursele afișate în aplicație.
- **AI la profil**: „Interpretare AI" (stadiu, ritm realist, ETA țintă, 3 recomandări) și „Sfaturi AI" la Corp (mini-plan 4 săptămâni).
- **Centrare**: conținut pe coloană de max 920px, butoane de acțiune centrate.
- **Print redesenat**: umple toată pagina A3/A4 landscape (înălțimea rândurilor calculată automat după numărul de săptămâni), bandă verde cu logo + lună + motto, weekend evidențiat, ziua curentă conturată, evenimente ca etichete colorate, legendă categorii + obiectivele lunii în subsol, culori forțate la print (`print-color-adjust: exact`).

---

## v1.3 — AI în calendar, sincronizare privată, model cu fallback

- **Adaugă cu AI** în calendar: scrii/dictezi natural („ședință echipă în fiecare luni la 10"; „congres 12–14 septembrie") → AI creează activitatea, cu recurență și evenimente multi-zi. Dictare vocală (Web Speech, ro-RO) cu transcriere live și butoane Anulează/Editează/Gata.
- **Categorie nouă „Eveniment"** (congrese/evenimente speciale), culoare teal.
- **Reguli membri (AI):** implicit activitatea e a utilizatorului conectat; dacă menționezi alt membru real → comună de familie; „doar pentru X" → doar acel membru; un nume care NU e membru rămâne individual (intră în titlu).
- **Verificare „Ești sigur?"** înainte de a adăuga ceva neobișnuit (prea multe, dată aberantă, repetare zilnică infinită).
- **Sincronizare privată** end-to-end criptată (AES-256 + PBKDF2) într-un gist privat GitHub; token cu scope `gist` + parolă aleasă de utilizator. Emailul personal scos din cod (membru implicit „Eu").
- **Fallback automat de model:** dacă modelul atinge 429, aplicația încearcă automat alt model gratuit; recomandat `gemini-3.1-flash-lite` (~500/zi). Mesaje de eroare clare.
- **Ton AI uman** (nu „a robot") la interpretări; dropdown-uri și formulare în tonul aplicației.

## v1.4 — asistent flotant, Sport, apă, mementouri

- **Asistent flotant** (buton jos-dreapta): scrii sau vorbești și execută în aplicație — pornește/oprește fasting, „am băut un pahar cu apă", „am mâncat o pizza", „am alergat 30 min", „am 84 kg", motto, obiective, mementouri, „programează … în calendar".
- **Secțiune Sport** (Sănătate): tip + minute, estimare kcal (MET × greutate × timp), total pe zi + rezumat săptămânal (vs. 150 min OMS).
- **Tracker apă** în Mese (+250/+500 ml) și băuturi (cafea etc. cu kcal).
- **Mementouri** configurabile (mic dejun, prânz, cină, cântărire, apă la fiecare 2h, personalizate) → notificări la oră.
- Recomandările AI se pot închide/șterge (nu mai persistă).

## v1.5 — export PDF propriu, modal zi, culori pe participanți

- **Salvează PDF** (html2canvas + jsPDF): PDF propriu, **fără** antet/subsol de browser (`file:///`, dată, „Page 1 of N"), **pagină plină landscape** (A4/A3, aspect exact), toate activitățile afișate împachetate frumos în căsuțe (fără „..."), culori pe participanți + buline categorie + legendă.
- **Click pe o zi → modal** cu activitățile zilei (editabile) + buton de adăugare; nu mai duce la tabul Zi.
- **Culoare pe participanți** în calendar: comun/familie = verde, individual = culoarea membrului (nu mai rămâne totul pe „familie").
- **Iconiță iOS** proprie (`apple-touch-icon.png`) + nume scurt „FamLink" pe ecranul principal.
- Fix bară de jos pe iPhone (safe-area + `min-height:100dvh`), header sub status bar.

## v1.6 — sincronizare robustă (merge + tombstones), notificări, acces

- **Merge la sync (nu șterge date):** union pe id pentru activități/obiective/mese/sport/membri, îmbinare mottos/greutăți/apă; cheia Gemini și modelul se propagă între dispozitive.
- **Tombstones:** ștergerile se propagă corect — ce ștergi pe un dispozitiv nu mai „învie" de pe copia veche a altuia; editarea ulterioară (mai nouă) învinge ștergerea. Fiecare înregistrare are amprentă de timp `u`.
- **Auto-push instant** la orice modificare (~0,7 s), cu iconița de sync care se învârte scurt; intervalul (Manual/1/5/15/30 min) rămâne doar pentru a aduce ce schimbă ceilalți.
- **Buton sync în header** + **notificări in-app** (clopoțel cu badge): la sincronizare, dacă apare o activitate nouă de familie sau care te include, primești notificare (+ notificare de sistem).
- **Trimite acces altui dispozitiv:** link care conține token + gist + parola → celălalt îl deschide și se conectează automat (datele se combină).
- **Editare membri** (nume/email/culoare) în modal; **Adaugă membru** în modal.
- **Setări pliabile** (7 secțiuni, închise implicit); **profil pliabil** (câmpurile apar doar la „Editează datele mele").
- Calendar uniform pe mobil: max 2–3 activități/zi + „+N" (toate se văd la tap pe zi).

---

## Publicare (repo separat `famlink`)

```bash
cd ~/Downloads/arhilink/famlink
git add .
git commit -m "FamLink v1.6"
git push
```

Live în 1–2 min la **https://drg2121.github.io/famlink/**. Pe iPhone: Safari → Share → Add to Home Screen (iconiță „F", nume „FamLink").

## Sincronizare între dispozitive

Setări → Sincronizare: token GitHub (scope `gist`) + parolă de criptare → **Conectează** (creează gist criptat, urcă datele). Pe alt dispozitiv: același token + parolă (sau linkul „Trimite acces") → date combinate. Cheia Gemini se propagă automat.

## Structura datelor (localStorage)

- `famlink_v1` (state): `members` (id, nume, culoare, email, u) · `events` (dată, oră, durată, cat, membri, recur{f,int,until}, notify, doneOn[], u) · `goals` (titlu, ym, done, memberId) · `mottos{ym}` · `tomb{id:ts}` (marcaje ștergere) · `diet.profiles` · `diet.weights` · `diet.meals` · `diet.sports` (name, minutes, kcal) · `diet.water{mid}{data}` · `diet.fasting` · `settings` (geminiKey, model, printSize, activeUser, reminders[]).
- `famlink_sync` (per dispozitiv): token, gistId, pass, intervalMin, auto, seeded, last.
- `famlink_notifs` (per dispozitiv): listă notificări in-app.

---

## v1.x — AI corectabil + asistent conversațional (2026-07-07)

**Analiza foto (Gemini) — rezultat editabil**
- Numele alimentului și kcal apar în câmpuri editabile înainte de „Adaugă la mesele de azi".
- Câmp „Corectează": scrii ex. „e măr, nu prună" → AI reface toată analiza (nume, porție, calorii, macro, evaluare) pornind de la corecția ta, folosind poza doar pentru porție.
- Prompt mai precis: estimare porție în grame, atenție la alimente asemănătoare și preparate românești, câmp „incredere" (avertizează când e nesigur), temperatură 0.2.

**Asistentul flotant — conversație reală**
- Memorie de conversație (ultimele 10 replici trimise la fiecare mesaj) — poți face referire la ce ai zis înainte.
- Context real injectat în prompt: profil, cântăriri, mesele + kcal de azi, apă, fasting, următoarele activități din calendar, obiective → răspunsuri concrete cu cifrele tale („mai ai X kcal azi").
- Răspunde și la întrebări libere, nu doar comenzi; ton natural, fără robotisme.
- Suportă mai multe acțiuni într-un singur mesaj („am mâncat o ciorbă și am băut 2 pahare de apă").

**Integrare Gemini întărită**
- Mod JSON nativ (`responseMimeType: application/json`) pentru toate cererile structurate → fără erori de parsare; fallback automat fără JSON-mode dacă modelul nu-l suportă.
- `parseAIJson()`: extrage JSON chiar dacă modelul pune text sau ``` în jur.
- Temperaturi per sarcină (0.2 analiză/calendar, 0.5 chat).

**Redesign asistent (feedback: „arată ca un AI generic")**
- Asistentul are identitate: „Lumi", cu avatar, punct verde „online" animat și header cu gradient + cercuri decorative.
- Salut personalizat după oră și numele membrului activ, generat la prima deschidere.
- Sugestii rapide (chips cu iconițe) sub mesajul de bun venit — dispar după primul mesaj.
- Bule redesenate: bot cu mini-avatar și umbră moale, user cu gradient; animație de intrare pentru fiecare mesaj; panou cu colțuri 24px și animație „pop" elastică.
- Indicator „scrie..." cu 3 puncte animate în loc de „…".

**Ajustări după feedback (2026-07-07)**
- Scos numele „Lumi" — asistentul e simplu „Asistent".
- Mementourile mutate din Setări în meniul de jos: tab dedicat „Mementouri" (Calendar · Mementouri · Sănătate), cu buton de activare notificări + status direct în pagină.
- Asistent mai fidel comenzii: regulă nouă în prompt — execută DOAR ce s-a cerut explicit, fără să schimbe cantități/ore; dacă mesajul e ambiguu întreabă în loc să ghicească; în confirmare spune exact ce a notat.

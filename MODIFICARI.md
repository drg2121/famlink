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

---

## v3.9.8 — notificări fără dubluri, linii de masă editabile, mobil mai curat (2026-07-16)

**Notificări duble (apă, cântărire) — rezolvate la rădăcină**
- Cauza: verificarea anti-dublură din service worker era doar asincronă (Cache API). Două push-uri identice sosite în aceeași secundă (două sloturi de cron pe același email) se verificau în paralel, ambele vedeau „nimic în cache" și ambele se afișau.
- Acum: marcaj sincron în memorie + verificările puse la coadă una după alta + Cache API ca plasă de siguranță; fereastra anti-dublură crescută de la 90 s la 5 min.
- Același anti-dublură și pentru mesajele primite cu aplicația deschisă (foreground) — înainte nu exista deloc acolo.
- Tag-ul notificării e acum pe titlu, nu doar pe tip: două notificări identice se înlocuiesc între ele, dar mementouri diferite (Cântărire vs. Vitamine) nu se mai șterg reciproc cum se întâmpla cu tag-ul comun `fl-rem`.
- Cache PWA trecut la `famlink-v46` ca SW-ul nou să se activeze imediat.

**Mesele — liniile rămân editabile și după salvare**
- La „Editează" pe o masă salvată, liniile ei (ingredientele) apar în formular: poți schimba numele, categoria, gramele și kcal-ul fiecărei linii, poți șterge sau adăuga linii noi — inclusiv la mese care n-au avut deloc.
- Schimbi gramele → kcal-ul liniei se recalculează din densitatea lui (kcal/g); totalul de sus = suma liniilor, mereu la zi.
- Dacă scrii de mână alt total decât suma liniilor, liniile se scalează proporțional la totalul tău.
- Macro-urile (P/C/G) se scalează proporțional cu noul total de calorii la salvare.

**Grafică pe mobil**
- Fix zoom iOS: orice input sub 16px făcea Safari să dea zoom la focus și pagina rămânea mărită/„ciudată". Pe mobil toate inputurile au acum minim 16px.
- Componentele mesei apar ca listă curată (nume la stânga, g · kcal la dreapta) în loc de chips-uri care se rupeau pe 3 rânduri.
- Rânduri de masă mai aerisite, editorul de linii aliniat pe ecrane înguste, inputurile de oră/dată mai înalte (44px, țintă de atins mai ușor).

---

## v3.9.9 — dublurile „doar la un membru": slot de cron pe email, nu pe dispozitiv (2026-07-16)

**Diagnostic** (simptom: Cosmin primea totul dublu, Alisa nu): slotul de programare a mementourilor zilnice era legat de DISPOZITIV (`device: DID`). Cine folosește FamLink pe două dispozitive cu același email (telefon + computer) avea DOUĂ sloturi pe server → serverul trimitea fiecare memento de două ori, către toate dispozitivele acelui email. „Repară notificările" curăța doar slotul dispozitivului curent, deci nu ajuta.

**Rezolvare**
- Slotul de cron e acum legat de EMAIL (`em_<email>`): toate dispozitivele aceluiași membru scriu în același slot → o singură trimitere, indiferent de câte aparate folosești.
- Migrare automată la pornire (o dată pe dispozitiv): golește slotul vechi legat de dispozitiv.
- Aplicația ține evidența (sincronizată) a dispozitivelor folosite; „Repară notificările" golește acum sloturile vechi ale TUTUROR dispozitivelor tale + slotul de email, apoi reprogramează curat.
- De reținut: fix-urile din service worker (v3.9.8) se activează abia după deploy + o închidere/redeschidere completă a aplicației — dublura de la 08:00 a venit cu SW-ul vechi încă activ.

---

## v3.10.0 — atașamente în asistent: „ce mănânc din meniul ăsta și cât?" (2026-07-28)

**De ce**: la cantină/restaurant primești o poză cu meniul zilei. Întrebarea reală nu e „câte calorii are pastrama", ci „din tot ce scrie aici, ce-mi pun în farfurie și **cât**, ca să-mi iasă ziua".

**Cum funcționează**
- Buton de agrafă în bara asistentului (lângă microfon) → poză din galerie, poză făcută pe loc sau PDF. Maximum 3 atașamente odată, pozele se micșorează la 1400 px înainte de trimitere.
- Asistentul recunoaște singur ce i-ai trimis: **meniu**, **farfurie** (ce ai mâncat deja), **etichetă de produs**, **rețetă** sau altceva — și se poartă diferit la fiecare.
- Recomandarea pleacă de la **bugetul real al zilei**, nu de la o valoare generică: ținta ta calorică + caloriile arse la sportul bifat − ce ai mâncat deja. Ține cont și de ora curentă și de mesele deja înregistrate, ca să nu-ți dea tot restul zilei la prânz.
- Cantitățile se spun **în măsuri de casă** — „3 linguri cu vârf", „un polonic", „o bucată cât palma", „două pumnuri" — cu gramajul și kcal-ul alături. Promptul are un tabel de repere (lingură 15 g, polonic 200 ml, felie de pâine 30–35 g, palmă de carne 100–120 g etc.).
- **Întreabă când nu e sigur**: dacă nu se citește, dacă nu știe ce porție se servește, la ce masă e sau dacă se bate cap în cap cu o restricție din memoria lui de lungă durată → pune 1–2 întrebări scurte și nu inventează nimic.
- Poza **rămâne prinsă de discuție** până o scoți cu ✕ sau închizi asistentul, deci răspunsurile tale la întrebări se leagă tot de ea („e cină", „porția e mică"). În conversație apare o singură dată, nu la fiecare mesaj.

**Cardul de plan (în conversație)**
- Fiecare fel are checkbox; debifezi ce nu iei și totalul + „îți rămân X kcal" se recalculează pe loc (roșu dacă depășești).
- „Mai bine sari peste" pentru ce nu merită caloriile.
- Un buton trece tot ce ai bifat în mesele de azi, prin cardul obișnuit de confirmare (poți edita tipul mesei, numele și kcal-ul înainte de salvare).

**Pe lângă**
- Mesele adăugate de asistent păstrează acum **gramajul și macro-urile** (P/C/G), nu doar caloriile — apar în lista de mese ca la analiza din poză.
- `askCtx()` (rezumatul trimis la fiecare cerere) include acum bugetul explicit: țintă, bonusul de la sport, cât a mâncat, **cât i-a mai rămas** și macro-urile zilei. Înainte AI-ul primea doar ținta și totalul și trebuia să scadă singur — de aici răspunsuri greșite la „câte calorii mai am azi".
- Temă întunecată: antetul și bara asistentului aveau fundalul crem scris fix în CSS, iar titlul „Asistentul FamLink" abia se citea pe întuneric. Acum urmează tema.

---

## v3.10.1 — „AI-ul a răspuns într-un format neașteptat" la poza cu meniul (2026-07-28)

**Cauza**: cererea pentru atașamente avea `maxTokens: 1800`. Dar `gemini-2.5-flash` „gândește" înainte să scrie, iar token-urile de gândire se scad tot din `maxOutputTokens` — bugetul se termina pe gândire și API-ul întorcea un candidat **fără `parts`**. `gemini()` transforma asta în șir gol, iar `parseAIJson('')` arunca „format neașteptat", deși formatul n-avea nicio vină. (Analiza foto din Sănătate merge tocmai pentru că n-a avut niciodată plafon.)

**Reparat**
- Scos plafonul de token-uri la cererea cu atașamente — la fel ca la analiza foto.
- `gemini()` nu mai returnează șir gol în tăcere: se uită la `finishReason` și spune ce s-a întâmplat — „Răspunsul a fost tăiat", „Modelul a refuzat să răspundă (SAFETY)", „Modelul a răspuns gol". Diagnostic în loc de ghicit.
- `parseAIJson` repară acum răspunsurile tăiate la mijloc: taie la ultima virgulă completă și închide parantezele rămase deschise, ținând cont de ghilimelele escapate. Un răspuns întrerupt dă tot un plan folosibil, cu felurile care au apucat să iasă întregi.
- Reparația se încearcă **înaintea** vechii căutări cu regex — altfel aceasta apuca prima pereche de paranteze din text și întorcea un fragment din mijlocul răspunsului.
- Felurile recuperate pe jumătate (fără kcal) nu mai ajung în card ca rânduri de 0 kcal.

---

## v3.11.0 — cântărire din poză, repere de progres, calibrare după ceas (2026-09-22)

Trei lucruri noi în modulul Sănătate, toate în jurul aceleiași idei: aplicația să afle singură cifrele reale, nu să le ceară scrise de mână, și să spună ce înseamnă ele.

### 1. Cântărire din poză (Sănătate → Profil)

Fotografiezi afișajul cântarului, AI-ul citește kilogramele și le trece în jurnal.

- Zonă foto proprie („Fă o poză cântarului" + „Alege din galerie"). Modala de cameră e aceeași ca la mâncare, cu un mod nou: `openCamera('scale')` schimbă titlul și rutează captura către `scaleAnalyze()` în loc de `aiAnalyze()`.
- `SCALE_PROMPT` e scris ca un OCR de afișaje cu segmente: citire caracter cu caracter, atenție la confuziile 8/0/6 și 1/7/5, fără „corectarea" cifrelor care nu se văd. Întoarce `{citire, tip, valoare, unitate, kg, cod, explicatie, incredere}`.
- Trei rezultate posibile, fiecare cu propriul ecran:
  - **greutate** — card cu cifra mare, diferența față de ultima cântărire, câmp de corecție și alegerea zilei; `lb`, `st` și `jin` se convertesc în kg. Avertisment separat când încrederea e mică sau când saltul față de ultima cântărire depășește 4 kg.
  - **cod de eroare** (ex. afișajul care arată `E211`) — explicație marcată explicit ca presupunere, pentru că fiecare producător are alte coduri, plus patru pași de reîncercare (podea tare, așteaptă `0.0`, desculț și nemișcat, poză de sus).
  - **necitibil** — spune ce a distins din afișaj și de ce n-a salvat nimic.
- În toate cazurile rămâne o cale manuală de salvare. Plafon de plauzibilitate 20–350 kg: nimic din afara intervalului nu se salvează automat.
- Poza se micșorează la 1200 px înainte de trimitere (`askShrink`), ca la atașamentele din asistent.

### 2. Repere de progres (Sănătate → Progres)

Un tab nou cu 37 de repere pe cinci grupe: **Greutate** (primul kilogram, 2,5 / 5 / 7,5 / 10 / 15 / 20 kg, 5% și 10% din greutatea de start, ținta atinsă), **Sănătate** (ieșirea din IMC 30 și 25, talia sub jumătate din înălțime, talia sub pragul OMS), **Constanță** (3/7/14/30/60/100 zile la rând cu cântărire, 7 și 30 de zile cu mesele notate, 7 zile cu apa bifată), **Mișcare** (1/10/25/50/100 de antrenamente, 150 min într-o săptămână — recomandarea OMS, 10.000 de pași într-o zi, 7 zile la rând peste 8.000 de pași) și **Fasting** (1/5/10/25/50 de posturi duse la capăt).

- Fiecare reper are o valoare curentă și un prag, deci reperele neatinse arată progresul real, nu doar un lacăt.
- Cardul „Urmează" alege reperul cel mai aproape de a fi atins și spune cât mai e până la el.
- Reperele irelevante nu se afișează: cele de slăbit dispar dacă ținta e peste greutatea de start, cele de IMC apar doar dacă ai pornit din categoria respectivă, cele de pași doar după primul import din ceas.
- **La prima rulare reperele deja atinse se însămânțează tăcut** (`bag._seed`), ca să nu primești un potop de sărbătoriri retroactive. De acolo încolo, fiecare reper nou apare o singură dată, într-un card de felicitare cu text scris pe grupă (mai multe repere deodată se strâng într-un singur card).
- Verificarea se declanșează la cântărire, la adăugarea unui sport, la bifarea apei, la încheierea unui fasting și la importul din ceas. `checkMilestones()` e protejat de re-intrare, nu mai redesenează singur și e apelat înaintea randărilor care îl afișează.
- În **Profil** a apărut o linie de încurajare care leagă cifrele între ele: cât ai dat jos și ce procent înseamnă, a câta zi la rând te cântărești, ritmul pe ultimele 6 săptămâni (regresie liniară) și **data estimată la care ajungi la țintă**, plus următorul reper. Când cifra a urcat, o spune direct, dar explică de ce ziua de azi contează mai puțin decât linia pe două săptămâni.

### 3. Calibrare după aplicația de fitness (Sănătate → Ceas)

Până acum consumul zilnic era o formulă (Mifflin-St Jeor × factor de activitate ales din patru opțiuni). Acum poate fi o măsurătoare.

- Trimiți unul sau mai multe screenshot-uri (max 4 odată) din Apple Fitness/Health, Google Fit, Samsung Health, Fitbit, Garmin, Huawei Health, Mi Fitness sau Strava. Capturile din **aceeași zi se combină** într-o singură intrare — rezumatul și ecranul cu inele se completează unul pe altul.
- Promptul distinge explicit lucrurile care se confundă ușor: „Move 510/800 CAL" sunt calorii **active**, în timp ce „TOTAL 2 885 CAL" de sub grafic e consumul **total** al zilei; „TOTAL 12H 48M" de sub Exercise e timp de mișcare, nu minute de exercițiu. Data de pe ecran („Monday, Sep 21, 2026") se convertește în `YYYY-MM-DD`. Ce nu se vede rămâne `null` — nimic nu se estimează.
- Rezultatul vine ca formular editabil (calorii active și obiectiv, total, minute de exercițiu, ore în picioare, pași, distanță, etaje, minute de mers) înainte de salvare.
- **Calibrarea**: media consumului total măsurat pe ultimele 28 de zile importate se împarte la BMR-ul tău → factorul de activitate real, limitat la 1,1–2,0. Cardul arată una lângă alta cifra măsurată, cifra calculată de aplicație, BMR-ul, factorul vechi și cel nou. Cu mai puțin de 3 zile spune cât mai are nevoie; sub 60 kcal diferență spune că nu e nimic de corectat. Butonul scrie factorul în profil, iar `pAct` primește o opțiune „Calibrat după ceas (×1,556)" — de unde te poți întoarce oricând la calculul standard.
- **Bugetul zilei**: dacă ziua de azi are calorii active importate, acelea intră în buget în locul estimării MET a sesiunilor de sport (funcția nouă `burnToday()`, folosită în `rMeals()` și `askBudget()`). Sesiunile manuale rămân vizibile ca jurnal, dar dezactivate, cu explicația de ce — altfel aceeași mișcare s-ar număra de două ori. Comutatorul e pe cardul zilei de azi.
- Asistentul primește în `askCtx()` datele din ceas pentru ziua curentă, kilogramele date jos, seria de cântăriri și următorul reper.

### Date și sincronizare

- Structuri noi: `diet.fitness[membru] = [{id, d, src, move, moveGoal, total, exMin, exGoal, moveMin, stand, standGoal, steps, km, floors, useMove, u}]` și `diet.badges[membru] = {cheie: {d, t}}`.
- `mergeFitness()` merge pe `id` cu tombstones, ca mesele și sporturile. `mergeBadges()` păstrează **data cea mai veche** — un reper atins pe telefon rămâne atins și pe laptop, cu data reală.

### Reparat pe drum

- `.tabs2` (bara de taburi secundare, inclusiv cea din Calendar) rămăsese pe fundal bej și în tema întunecată, cu text gri abia lizibil.
- Pe ecrane sub 480 px, bara de taburi din Sănătate ascunde iconițele, ca toate cele șase etichete să încapă fără scroll orizontal.
- `logWeightKg(kg, zi)` acceptă acum și o zi anume, nu doar „azi" — cântăririle din poză se pot salva retroactiv.

---

## v3.11.1 — cântarul fotografiat cu susul în jos (2026-09-22)

**Simptomul**: un afișaj care arăta limpede `112.3` era raportat ca eroare `E211`, cu explicația (corectă în sine, dar nelalocul ei) că „E" e cod de eroare de măsurare.

**Cauza**: poza fusese făcută cu cântarul rotit 180° — se întâmplă firesc, urci pe cântar de pe partea opusă afișajului și fotografiezi de sus. Un afișaj cu șapte segmente citit invers nu devine ilizibil, devine **alt text plauzibil**: `3` arată exact ca `E`, `6` ca `9`, `9` ca `6`, `2`/`5`/`8`/`0` rămân la fel, `1` rămâne `1` dar sare pe marginea stângă a casetei, iar punctul zecimal urcă sus. Așa `112.3` devine literalmente `E211` cu un punct în aer. Modelul citea corect pixelii și greșea doar orientarea — deci nici un prompt mai insistent despre „citește cu atenție" n-ar fi ajutat.

**Reparat, în două straturi independente**

1. **Ambele orientări ajung la model.** `imgRot180()` rotește poza pe canvas, iar cererea trimite originalul *și* varianta întoarsă, spunând explicit care e care. Promptul dă regula decisivă — *punctul zecimal al unui cântar stă întotdeauna jos, pe linia de bază; dacă apare sus, imaginea e răsturnată* — plus tabelul de cifre care se transformă una în alta. Mai adaugă o regulă de bun-simț: un șir care începe cu literă dar continuă cu trei cifre nu e cod de eroare, fiindcă erorile reale sunt scurte (`Err`, `E1`, `Lo`, `O-Ld`, `bAt`) și n-au zecimale. Răspunsul întoarce acum și `orientare`, iar cardul spune „poza era răsturnată, am întors-o".
2. **Plasă de siguranță în cod, fără AI.** `segFlip()` aplică transformarea de 180° pe șirul citit, iar `readingToKg()` îl validează ca greutate (2–3 cifre cu cel mult o zecimală, 20–350 kg; fără punct, ultima cifră devine zecimala — `1123` → `112,3`). `weightFromDisplay()` încearcă întâi citirea directă, apoi pe cea întoarsă. Dacă iese o greutate plauzibilă, ecranul de eroare e înlocuit cu propunerea gata de salvat, plus un buton „Nu e asta — citește din nou".

**Pragul care ține plasa strânsă**: minimum 3 caractere. Altfel `E5` s-ar fi „recuperat" ca 53 kg, iar codurile scurte de eroare trebuie să rămână erori. Verificat: `E211`→112,3 · `1123`→112,3 · `9.16`→91,6 · `92.4`→92,4, în timp ce `Err`, `E1`, `E5`, `Lo`, `O-Ld`, `bAt`, `0.0` și `---` rămân neinterpretate.

**Pe lângă**: promptul primește ultimele trei cântăriri, dar strict ca departajare între două citiri la fel de plauzibile vizual — cu instrucțiunea explicită să nu forțeze cifra spre istoric.

---

## v3.12.0 — grafică nouă în Sănătate, Progres refăcut, asistentul citește cântarul și ceasul (2026-09-22)

Un update de grafică, nu de date: structurile din localStorage rămân aceleași, sincronizarea nu se schimbă. Ce se schimbă e felul în care se văd cifrele și un drum în plus pentru cântar și ceas, prin asistent.

### Profil

- **Hero de profil** (`#pHero`, `paintStats`): greutatea de acum cu cifre mari, chips cu „−X kg de la start", „mai ai Y kg", ritmul pe săptămână (panta pe 42 de zile, din `weightSlope`), inelul „din drum" (procentul parcurs între start și țintă) și **bara start → țintă** cu marker pe poziția curentă și data estimată la care ajungi la țintă. Se recalculează live când modifici câmpurile din „Editează datele mele" (`previewProfile`).
- **Tile-uri cu iconițe** (`.stat` v2, aliniate stânga, iconiță în colț): IMC colorat pe categorie, BMR, menținere (cu „după ceas" când profilul e calibrat), ținta zilnică, seria de cântăriri (sau numărul lor) și talia cu raportul talie/înălțime.
- **Graficul greutății** (`paintChart`): curbă netezită Catmull-Rom → Bézier, umplere gradient, **media mobilă pe 7 zile** (linia pe care merită să te uiți), linia țintei, grilă, etichete de dată, minimul marcat, ultimul punct evidențiat, **comutator 30 zile / 3 luni / tot** (`_wRange`) și **tooltip** la atingere/mișcare (cel mai apropiat punct). Culorile vin din variabilele temei (prin `style=`, nu atribute), deci graficul urmează și tema întunecată.

### Progres (`rProg`)

- **Hero**: inel cu reperele atinse din cele relevante, procent, **nivel** (`pgLevel`: Start / Început / Pe drum / Constant / Avansat / Maestru, după numărul de repere) și patru cifre-cheie: zile la rând, antrenamente, fasting-uri, kg date jos.
- **Urmează**: cele trei repere cele mai apropiate, fiecare cu inel de progres în culoarea grupei și „mai ai …". Reperele de tip da/nu (ex. „Primul pas") arată descrierea și „încă neatins", nu „0 / 1".
- **Ultimele 7 zile**: greutatea (Δ pe 7 zile), minute de mișcare (sesiuni + minute din ceas, față de 150), zile cu mese notate, zile cu apa la țintă, fasting-uri reușite, pași din ceas — fiecare cu bară de progres.
- **Ce ai atins**: cronologie cu ultimele șase repere bifate, iconița în culoarea grupei și data reală (din `badges`).
- **Toate reperele**: filtre pe grupă (cu contor n/total), insigne colorate pe grupă (`.g-w`, `.g-h`, `.g-c`, `.g-m`, `.g-f` → `--gc`/`--gc2`), cele atinse cu gradient și bifă, cele neatinse cu **inel de progres în jurul iconiței** în loc de bară. Pe telefon, trei pe rând.

### Fasting, Sport, Ceas, Corp

- **Fasting**: inel de 240 px cu gradient și strălucire (`feGaussianBlur`), etapa curentă în interiorul inelului (`FAST_STAGES`: digestie 0–4 h, glicogen 4–12 h, ardere 12–16 h, autofagie 16 h+) și un rând cu cele patru etape, cea curentă evidențiată, cele trecute estompate. Istoricul e o linie de bule: verde = țintă atinsă, galben = oprit mai devreme, cu orele și data. Randările pe secundă compară HTML-ul înainte să-l rescrie, ca să nu clipească.
- **Sport**: tile-uri cu iconițe și **grafic cu minutele pe fiecare zi din ultimele 7** (verde = sesiuni notate, albastru = minute de exercițiu citite din ceas, când sunt mai multe), plus bara față de cele 150 min OMS.
- **Ceas**: fiecare zi importată are **inele concentrice** (active / exercițiu / în picioare) desenate în SVG, ca pe telefon, cu legenda alături; cifrele (total, pași, km, etaje, minute de mers) rămân dedesubt. `fitRingsSvg`, `fitLegend`, `fitStatsGrid` sunt reutilizate și în asistent.
- **Corp**: gauge pentru grăsimea corporală cu benzile atletic / fitness / mediu / ridicat (pragurile diferă pe sex) și marker pe valoarea ta; tile-urile primesc iconițe.

### Asistentul citește cântarul și capturile din ceas

- Promptul pentru atașamente primește două tipuri noi: `cantar` și `fitness`. Când le recunoaște, nu inventează cifre — răspunde cu o frază scurtă și lasă cititul **pașilor dedicați**: `askScaleFlow` (același OCR de segmente ca în Profil, cu poza trimisă în ambele orientări și plasa de siguranță `weightFromDisplay`) și `askFitFlow` (același `fitPrompt` ca în tabul Ceas).
- Rezultatul apare **în chat**, ca un card: la cântar — kilogramele, ce arată afișajul, dacă poza era răsturnată, diferența față de ultima cântărire, avertismente pentru încredere mică sau salt mare, câmp de corectare și ziua; la ceas — inelele, cifrele și trei câmpuri editabile (active, total, pași). Nimic nu se salvează fără apăsarea butonului.
- La salvare, asistentul confirmă cu cifrele reale: kg notate, diferența, cât ai dat jos de la start, a câta zi la rând; la ceas — caloriile active intrate în buget și dacă merită aplicată calibrarea (`fitCalib`). Salvarea din ceas trece prin `saveFitRecords()`, aceeași funcție ca butonul din Sănătate → Ceas.
- Atașamentul se scoate din discuție după ce a fost citit (nu mai e retrimis cu mesajele următoare), iar chips-urile de bun venit includ „Poza cu cântarul" și „Captură din ceas".

### Mese și restul cardurilor

- Hero-ul din Mese primește un **inel cu procentul din țintă** lângă cifra mare (roz când depășești), fundal în același gradient ca hero-urile din Sănătate și linia „Mișcare azi (din ceas)" lizibilă (era albastru închis pe verde închis). Pe telefon cifra, ținta și creionul stau pe două rânduri curate, iar „îți mai rămân" trece dedesubt.
- Cardurile au un contur fin, antetele de secțiune (`.sech`) au iconiță în chip verde și subtitlu, tile-urile `.stat` sunt aceleași peste tot (Profil, Corp, Sport).
- Pe telefon: taburile Sănătate rămân compacte, comutatorul de perioadă al graficului coboară pe rândul lui, insignele sunt trei pe rând.

### Testat

- Profil, Progres, Fasting, Sport, Ceas, Corp, Mese — desktop și 375 px, temă luminoasă și întunecată, cu date de test (62 de cântăriri pe 70 de zile, mese, sport, apă, fasting, 7 zile din ceas) și cu stare goală (utilizator nou, fără nicio cifră): fără erori în consolă.
- Fluxurile din asistent cu Gemini simulat: poza de cântar → clasificare → OCR → card → salvare (91,6 kg, mesaj cu diferența și seria, reperul „7,5 kg" sărbătorit); captură din ceas → card cu inele → salvare → ziua intră în `diet.fitness`, cele 530 kcal active intră în bugetul de la Mese, mesajul propune calibrarea (×1,572).
- Cache PWA: `famlink-v47`.


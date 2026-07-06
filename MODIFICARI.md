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

## Publicare

```bash
cd ~/Downloads/arhilink
git add famlink
git commit -m "FamLink v1.2"
git push
```

Live în 1–2 min la **https://drg2121.github.io/arhilink/famlink/**. Pe iPhone: Safari → Share → Add to Home Screen.

## Structura datelor (localStorage, cheia `famlink_v1`)

`members` (id, nume, culoare, email) · `events` (dată, oră, durată, cat, membri, recur{f,int,until}, notify, doneOn[]) · `goals` (titlu, ym, done, memberId) · `mottos{ym}` · `diet.profiles` (sex, vârstă, h, țintă, activitate, talie, gât, șold) · `diet.weights` · `diet.meals` · `diet.fasting` (active, start, hours, history) · `settings` (geminiKey, model, printSize).

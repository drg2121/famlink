# FamLink — Calendarul Familiei

Aplicație într-un singur fișier (`index.html`), pe modelul ArhiLink: fără server, datele stau local în browser (localStorage), backup/restore JSON.

**Module:** Calendar (Lună / An / Zi / Obiective, recurențe, notificări, motto-ul lunii, print A3/A4 landscape, export .ics pentru iPhone) și Sănătate (profil + IMC/BMR/TDEE, jurnal greutate cu grafic, fasting cu contor și notificări, mese + calorii, analiză foto și meniuri cu Gemini AI).

## Sincronizare privată între dispozitive (v1.3)

Datele NU se publică pe GitHub Pages — stau doar în browserul tău. Dacă vrei să le ai pe mai multe dispozitive, activează sincronizarea din **Setări → Sincronizare privată**:

1. Creează un token GitHub: **Settings → Developer settings → Personal access tokens (classic) → Generate**, bifând **doar** scope-ul `gist`.
2. Lipește tokenul + o **parolă de criptare** aleasă de tine (ține-o minte — fără ea datele nu pot fi citite).
3. Apasă **Conectează**. Datele se salvează criptate (AES-256) într-un gist **privat**. Pe alt dispozitiv, pui același token și aceeași parolă și apeși Conectează/Încarcă.

Criptarea e end-to-end: nici GitHub, nici altcineva nu poate citi datele fără parola ta. Emailul/numele personal nu mai sunt în cod.

## Noutăți (v1.2)

- **Adaugă cu AI** în calendar: scrii sau **dictezi cu vocea** (ex: „ședință echipă în fiecare luni la 10"; „congres 12-14 septembrie") și activitatea se creează singură, cu recurență și evenimente pe mai multe zile.
- **Categorie nouă „Eveniment"** pentru congrese / evenimente speciale.
- **Selector de utilizator** la pornire + zona Familia refăcută: culoare editabilă inline, membru activ marcat, comutare rapidă („Folosește").
- **Mementouri** configurabile (mese, cântărire, bea apă la fiecare 2h, personalizate).
- Recomandările AI se pot **închide/șterge** și nu mai persistă.
- Print curățat: fără logo/antet aplicație, verde mai discret, culori pe membri (comun vs. individual).
- Ton AI natural (nu mai „sună a robot"); dropdown-uri și formulare în tonul aplicației.

## Publicare pe GitHub Pages (ca ArhiLink)

Folderul `famlink/` e deja în repo-ul `arhilink`. În Terminal:

```bash
cd ~/Downloads/arhilink
git add famlink
git commit -m "FamLink v1.1: calendar familie + sanatate"
git push
```

După 1–2 minute aplicația e live la:

**https://drg2121.github.io/arhilink/famlink/**

(GitHub Pages e deja activ pe repo — orice folder nou pushat pe `main` devine automat o pagină.)

Pe iPhone: deschide linkul în Safari → Share → **Add to Home Screen** — arată și se comportă ca o aplicație.

## Cheia Gemini AI (pas cu pas)

1. Intră pe **aistudio.google.com** cu contul tău Google.
2. **Get API key** → **Create API key** → copiază cheia (`AIza…`).
3. În FamLink: rotița Setări → **Gemini AI** → lipește cheia.

În **Setări → Model** alege un model **„flash"** (ex: `gemini-2.5-flash`) — au cotă gratuită mare (~1.500 cereri/zi). Modelele **„pro"** au foarte puține cereri gratuite pe API și dau eroare **429** aproape imediat.

Notă: abonamentul Gemini Pro (din aplicația Gemini) și abonamentul Claude sunt **separate de API** — nu adaugă cotă pe API. Cheia din AI Studio (Free tier) e suficientă pentru uz personal dacă folosești un model „flash".

## Iconițe & design

Iconițe profesionale [Lucide](https://lucide.dev) (CDN jsdelivr), paletă verde după logo-ul FamLink (monograma F cu frunză).

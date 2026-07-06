# FamLink — Calendarul Familiei

Aplicație într-un singur fișier (`index.html`), pe modelul ArhiLink: fără server, datele stau local în browser (localStorage), backup/restore JSON.

**Module:** Calendar (Lună / An / Zi / Obiective, recurențe, notificări, motto-ul lunii, print A3/A4 landscape, export .ics pentru iPhone) și Sănătate (profil + IMC/BMR/TDEE, jurnal greutate cu grafic, fasting cu contor și notificări, mese + calorii, analiză foto și meniuri cu Gemini AI).

## Sincronizare privată între dispozitive (v1.3)

Datele NU se publică pe GitHub Pages — stau doar în browserul tău. Dacă vrei să le ai pe mai multe dispozitive, activează sincronizarea din **Setări → Sincronizare privată**:

1. Creează un token GitHub: **Settings → Developer settings → Personal access tokens (classic) → Generate**, bifând **doar** scope-ul `gist`.
2. Lipește tokenul + o **parolă de criptare** aleasă de tine (ține-o minte — fără ea datele nu pot fi citite).
3. Apasă **Conectează**. Datele se salvează criptate (AES-256) într-un gist **privat**. Pe alt dispozitiv, pui același token și aceeași parolă și apeși Conectează/Încarcă.

Criptarea e end-to-end: nici GitHub, nici altcineva nu poate citi datele fără parola ta. Emailul/numele personal nu mai sunt în cod.


## Iconițe & design

Iconițe profesionale [Lucide](https://lucide.dev) (CDN jsdelivr), paletă verde după logo-ul FamLink (monograma F cu frunză).

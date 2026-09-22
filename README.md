# FamLink — Calendarul Familiei

Aplicație într-un singur fișier (`index.html`), pe modelul ArhiLink: fără server, datele stau local în browser (localStorage), backup/restore JSON.

**Module:** Calendar (Lună / An / Zi / Obiective, recurențe, notificări, motto-ul lunii, print A3/A4 landscape, export .ics pentru iPhone) și Sănătate (profil + IMC/BMR/TDEE, jurnal greutate cu grafic, fasting cu contor și notificări, mese + calorii, analiză foto și meniuri cu Gemini AI).

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

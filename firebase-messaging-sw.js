/* FamLink — service worker pentru notificări push (FCM)
   Rulează în fundal și afișează notificarea chiar și când FamLink e închis.
   v3.8: notificările au butoane de acțiune potrivite tipului (apă / fasting /
   eveniment), iar atingerea notificării deschide foaia rapidă din aplicație. */

importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
importScripts('firebase-config.js'); // aceleași valori ca în pagină

try { firebase.initializeApp(self.FB_CONFIG); } catch (e) {}

var messaging = firebase.messaging();

/* tipul notificării: din datele trimise de backend sau, ca plasă de siguranță
   (până la redeploy-ul backendului), dedus din titlu/corp */
function famlinkKind(d) {
  if (d.kind) return d.kind;
  var t = String(d.title || ''), b = String(d.body || '');
  if (/^Fasting/i.test(t)) return 'fast';
  if (/^Memento:/i.test(t) && /ap[ăa]|water/i.test(t)) return 'water';
  if (/^Memento:/i.test(t) && /Începe/i.test(b)) return 'event';
  if (/^Memento:/i.test(t)) return 'rem';
  return '';
}
/* butoane pe tip (max. 2 — limita platformelor); pe iOS sistemul nu afișează
   butoane, dar atingerea notificării deschide foaia rapidă din aplicație */
function famlinkActions(kind) {
  if (kind === 'water') return [{ action: 'water:250', title: '+250 ml' }, { action: 'qs:water', title: 'Altă cantitate…' }];
  if (kind === 'fast') return [{ action: 'fast:stop', title: 'Finalizează' }, { action: 'fast:ext30', title: '+30 min' }];
  if (kind === 'event') return [{ action: 'ev:done', title: 'Finalizat ✓' }, { action: 'ev:snooze', title: 'Amână 15 min' }];
  return [{ action: 'open', title: 'Deschide FamLink' }];
}
function famlinkNotifOptions(d) {
  var kind = famlinkKind(d);
  return {
    body: d.body || '',
    icon: 'icon-512.png',
    badge: 'apple-touch-icon.png',
    image: d.image || undefined,
    data: { url: d.url || './', kind: kind, evId: d.evId || '', evDate: d.evDate || '', title: d.title || '' },
    /* v3.9.8: tag pe TITLU, nu doar pe tip — două notificări identice se înlocuiesc între
       ele (încă o plasă anti-dublură), dar mementouri diferite (Cântărire vs. Vitamine)
       nu se mai șterg una pe alta cum se întâmpla când toate aveau tag-ul 'fl-rem'. */
    tag: kind === 'event' ? ('fl-ev-' + (d.evId || d.title || '')) : (kind ? ('fl-' + kind + '-' + String(d.title || '')) : (d.tag || undefined)),
    renotify: true,
    requireInteraction: true,          // rămâne pe ecran până o închizi (desktop)
    vibrate: [90, 40, 90],             // vibrează pe telefon
    timestamp: Date.now(),
    actions: famlinkActions(kind)
  };
}

/* ANTI-DUBLURĂ prin memorie persistentă: dacă serverul trimite aceeași notificare de
   două ori (două „sloturi" de cron pe același email, ori push repetat), amândouă ajung
   la ACELAȘI service worker. Reținem semnătura (titlu+corp) și, dacă una identică a
   fost afișată în ultimele 5 minute, NU o mai afișăm a doua oară.
   v3.9.8: vechea verificare era DOAR asincronă (Cache API) — două push-uri sosite în
   aceeași secundă se verificau în paralel, ambele vedeau „nimic în cache" și ambele se
   afișau (exact cazul „Cântărire de 2 ori la 07:00"). Acum: (1) un marcaj SINCRON în
   memorie prinde dublurile simultane, (2) verificările se pun la coadă una după alta,
   (3) Cache API rămâne ca plasă de siguranță dacă SW-ul e repornit între cele două. */
var FLND_WIN = 300000;                 // fereastra anti-dublură: 5 minute
var _flndMem = {};                     // semnături văzute de această instanță de SW (sincron)
var _flndQ = Promise.resolve();        // coadă: o singură verificare de dubluri o dată
function famlinkDedupe(d) {
  var sig = String(d.title || '') + '|' + String(d.body || '');
  var check = function () {
    var now = Date.now();
    if (_flndMem[sig] && now - _flndMem[sig] < FLND_WIN) return Promise.resolve(true); // dublură simultană → blocată sincron
    _flndMem[sig] = now;
    for (var k in _flndMem) if (now - _flndMem[k] > FLND_WIN) delete _flndMem[k];
    var key = 'flnd:' + encodeURIComponent(sig);
    return caches.open('famlink-notif-dedupe').then(function (c) {
      return c.match(key).then(function (m) {
        if (!m) return c.put(key, new Response(String(now))).then(function () { return false; });
        return m.text().then(function (ts) {
          if (now - Number(ts) < FLND_WIN) return true;            // afișată recent (chiar de altă instanță SW) → duplicat
          return c.put(key, new Response(String(now))).then(function () { return false; });
        });
      });
    }).catch(function () { return false; });
  };
  var p = _flndQ.then(check, check);
  _flndQ = p.catch(function () {});
  return p;
}

/* Trimitem mesaje „data-only" din backend → afișăm noi notificarea aici,
   ca să avem control complet și să nu apară dubluri cu handler-ul din pagină.
   ANTI-DUBLURĂ: dacă backendul (încă) trimite și un câmp `notification`, browserul
   afișează AUTOMAT acea notificare — atunci NU mai adăugăm încă una aici, altfel
   apăreau două notificări identice pentru același memento. */
messaging.onBackgroundMessage(function (payload) {
  if (payload && payload.notification) return;   // browserul o afișează deja → nu dubla
  var d = (payload && payload.data) || {};
  return famlinkDedupe(d).then(function (dup) {
    if (dup) return;                             // identică afișată acum câteva secunde → o sărim
    return self.registration.showNotification(d.title || 'FamLink', famlinkNotifOptions(d));
  });
});

/* Trimite acțiunea către aplicație: dacă e deschisă, prin postMessage (fără să o
   aducă în față decât dacă acțiunea are nevoie de UI); altfel o deschide cu #act=… */
function famlinkDeliver(act, extra, needsUI) {
  var p = new URLSearchParams(Object.assign({ act: act }, extra || {}));
  return clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].url.indexOf(self.location.origin) === 0) {
        var payload = Object.assign({ famlink: 'act', act: act }, extra || {});
        list[i].postMessage(payload);
        return needsUI && 'focus' in list[i] ? list[i].focus() : Promise.resolve();
      }
    }
    if (clients.openWindow) return clients.openWindow('./#' + p.toString());
  });
}

/* Click pe notificare sau pe unul dintre butoanele ei */
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  var d = event.notification.data || {};
  var kind = d.kind || '';
  var extra = { evId: d.evId || '', evDate: d.evDate || '', title: d.title || '' };
  var a = event.action || '';
  var job;
  if (a === 'water:250')      job = famlinkDeliver('water:add', { ml: 250 }, false);
  else if (a === 'qs:water')  job = famlinkDeliver('qs:water', {}, true);
  else if (a === 'fast:stop') job = famlinkDeliver('fast:stop', {}, false);
  else if (a === 'fast:ext30')job = famlinkDeliver('fast:ext30', {}, false);
  else if (a === 'ev:done')   job = famlinkDeliver('ev:done', extra, false);
  else if (a === 'ev:snooze') job = famlinkDeliver('ev:snooze', extra, false);
  else { // atingerea notificării: te duce în secțiunea potrivită (+ foaia rapidă unde ajută)
    if (kind === 'water')      job = famlinkDeliver('qs:water', { kind: 'water' }, true);
    else if (kind === 'fast')  job = famlinkDeliver('qs:fast', { kind: 'fast' }, true);
    else if (kind === 'event') job = famlinkDeliver('qs:ev', Object.assign({ kind: 'event' }, extra), true);
    else job = famlinkDeliver('open', { kind: kind || 'rem', title: d.title || '' }, true); // memento general → deschide Mementouri
  }
  event.waitUntil(job);
});

/* ============ Mod offline (PWA) ============
   Aplicația e single-file cu date în localStorage — cache-uim pagina + assets +
   CDN-urile cunoscute, ca FamLink să pornească și fără internet.
   Strategie: network-first pentru pagină (update-urile ajung imediat, cache doar
   ca fallback offline); cache-first pentru CDN-uri (librării versionate). */
var CACHE = 'famlink-v46';
var ASSETS = ['./', 'index.html', 'manifest.json', 'firebase-config.js',
              'apple-touch-icon.png', 'icon-512.png'];
var CDN_HOSTS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'www.gstatic.com'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).catch(function(){}).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var u = new URL(req.url);
  // CDN-uri cunoscute: cache-first (librăriile sunt versionate, nu se schimbă)
  if (CDN_HOSTS.indexOf(u.hostname) >= 0) {
    e.respondWith(caches.match(req).then(function (m) {
      return m || fetch(req).then(function (r) {
        var cp = r.clone(); caches.open(CACHE).then(function (c) { c.put(req, cp); }); return r;
      });
    }));
    return;
  }
  // alte origini (API-uri: Gemini, GitHub, FCM…) — nu ne atingem de ele
  if (u.origin !== self.location.origin) return;
  // pagina + assets locale: network-first, fallback pe cache când ești offline
  e.respondWith(fetch(req).then(function (r) {
    if (r && r.ok) { var cp = r.clone(); caches.open(CACHE).then(function (c) { c.put(req, cp); }); }
    return r;
  }).catch(function () {
    return caches.match(req, { ignoreSearch: true }).then(function (m) {
      return m || (req.mode === 'navigate' ? caches.match('index.html') : Response.error());
    });
  }));
});

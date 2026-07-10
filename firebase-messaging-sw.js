/* FamLink — service worker pentru notificări push (FCM)
   Rulează în fundal și afișează notificarea chiar și când FamLink e închis. */

importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
importScripts('firebase-config.js'); // aceleași valori ca în pagină

try { firebase.initializeApp(self.FB_CONFIG); } catch (e) {}

var messaging = firebase.messaging();

/* Trimitem mesaje „data-only" din backend → afișăm noi notificarea aici,
   ca să avem control complet și să nu apară dubluri cu handler-ul din pagină. */
function famlinkNotifOptions(d) {
  return {
    body: d.body || '',
    icon: 'icon-512.png',
    badge: 'apple-touch-icon.png',
    image: d.image || undefined,
    data: { url: d.url || './' },
    tag: d.tag || undefined,
    renotify: !!d.tag,
    requireInteraction: true,          // rămâne pe ecran până o închizi (desktop)
    vibrate: [90, 40, 90],             // vibrează pe telefon
    timestamp: Date.now(),
    actions: [{ action: 'open', title: 'Deschide FamLink' }]
  };
}

/* Trimitem mesaje „data-only" din backend → afișăm noi notificarea aici,
   ca să avem control complet și să nu apară dubluri cu handler-ul din pagină. */
messaging.onBackgroundMessage(function (payload) {
  var d = (payload && payload.data) || {};
  return self.registration.showNotification(d.title || 'FamLink', famlinkNotifOptions(d));
});

/* Click pe notificare (sau pe butonul „Deschide") → adu FamLink în față. */
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) || './';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].url.indexOf(self.location.origin) === 0 && 'focus' in list[i]) {
          return list[i].focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

/* ============ Mod offline (PWA) ============
   Aplicația e single-file cu date în localStorage — cache-uim pagina + assets +
   CDN-urile cunoscute, ca FamLink să pornească și fără internet.
   Strategie: network-first pentru pagină (update-urile ajung imediat, cache doar
   ca fallback offline); cache-first pentru CDN-uri (librării versionate). */
var CACHE = 'famlink-v32';
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

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

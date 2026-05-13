const CACHE_NAME = 'workhub-v11.0';
const ASSETS = [
  './',
  './index.html',
  './admin.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon-512.png'
];

// Install: Eski keshni kutmasdan darhol yangisiga o'tish
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activate: Barcha eski kesh xotiralarini majburan o'chirish
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Avval internetdan yuklash (Network-first), bo'lmasa keshdan olish
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

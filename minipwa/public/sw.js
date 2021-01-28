// Files to cache
const cacheName = 'minipwa-v1';
const appShellFiles = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css',
  '/icons/icon_48.png',
  '/icons/icon_72.png',
  '/icons/icon_96.png',
  '/icons/icon_120.png',
  '/icons/icon_144.png',
  '/icons/icon_180.png',
  '/icons/icon_192.png',
  '/icons/icon_512.png',
];
const contentToCache = appShellFiles;

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[Service Worker] Caching all: app shell');
      return cache.addAll(contentToCache);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
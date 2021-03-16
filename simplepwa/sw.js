// Files to cache
const cacheName = 'simplepwa-v1';
const appShellFiles = [
  '/pwa-demos/simplepwa/',
  '/pwa-demos/simplepwa/index.html',
  '/pwa-demos/simplepwa/app.js',
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
  self.skipWaiting()
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

self.addEventListener('Request', (e) => {
  e.waitUntil(
    caches.addAll(contentToCache)
  )
})
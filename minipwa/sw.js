// Files to cache
const cacheName = 'minipwa-v1';
const appShellFiles = [
  '/pwa-demos/minipwa/',
  '/pwa-demos/minipwa/index.html',
  '/pwa-demos/minipwa/app.js',
  '/pwa-demos/minipwa/style.css',
  '/pwa-demos/minipwa/icons/icon_48.png',
  '/pwa-demos/minipwa/icons/icon_72.png',
  '/pwa-demos/minipwa/icons/icon_96.png',
  '/pwa-demos/minipwa/icons/icon_144.png',
  '/pwa-demos/minipwa/icons/icon_192.png',
  '/pwa-demos/minipwa/icons/icon_512.png',
];
const contentToCache = appShellFiles;

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await cache.open(cacheName);
    console.log('[Service Worker] Caching all: app shell');
    await cache.addAll(contentToCache);
  })());
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
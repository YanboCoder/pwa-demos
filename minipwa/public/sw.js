// Files to cache
const cacheName = 'minipwa-v1';
const appShellFiles = [
  '/pwa-demos/minipwa/public/',
  '/pwa-demos/minipwa/public/index.html',
  '/pwa-demos/minipwa/public/app.js',
  '/pwa-demos/minipwa/public/style.css',
  '/pwa-demos/minipwa/public/favicon.ico',
  '/pwa-demos/minipwa/public/images/launch_1125x2436.png',
  '/pwa-demos/minipwa/public/icons/icon_48.png',
  '/pwa-demos/minipwa/public/icons/icon_72.png',
  '/pwa-demos/minipwa/public/icons/icon_96.png',
  '/pwa-demos/minipwa/public/icons/icon_120.png',
  '/pwa-demos/minipwa/public/icons/icon_144.png',
  '/pwa-demos/minipwa/public/icons/icon_180.png',
  '/pwa-demos/minipwa/public/icons/icon_192.png',
  '/pwa-demos/minipwa/public/icons/icon_512.png',
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
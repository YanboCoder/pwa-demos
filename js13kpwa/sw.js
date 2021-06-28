self.importScripts('data/games.js');

// Files to cache
const cacheName = 'js13kPWA-v1';
const appShellFiles = [
  '/pwa-demos/js13kpwa/',
  '/pwa-demos/js13kpwa/index.html',
  '/pwa-demos/js13kpwa/app.js',
  '/pwa-demos/js13kpwa/style.css',
  '/pwa-demos/js13kpwa/fonts/graduate.eot',
  '/pwa-demos/js13kpwa/fonts/graduate.ttf',
  '/pwa-demos/js13kpwa/fonts/graduate.woff',
  '/pwa-demos/js13kpwa/favicon.ico',
  '/pwa-demos/js13kpwa/img/js13kgames.png',
  '/pwa-demos/js13kpwa/img/bg.png',
  '/pwa-demos/js13kpwa/icons/icon-32.png',
  '/pwa-demos/js13kpwa/icons/icon-64.png',
  '/pwa-demos/js13kpwa/icons/icon-96.png',
  '/pwa-demos/js13kpwa/icons/icon-128.png',
  '/pwa-demos/js13kpwa/icons/icon-168.png',
  '/pwa-demos/js13kpwa/icons/icon-192.png',
  '/pwa-demos/js13kpwa/icons/icon-256.png',
  '/pwa-demos/js13kpwa/icons/icon-512.png',
];
const gamesImages = [];
for (let i = 0; i < games.length; i++) {
  gamesImages.push(`data/img/${games[i].slug}.jpg`);
}
const contentToCache = appShellFiles.concat(gamesImages);

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
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
    console.log(`[Service Worker] Fetching response: ${response.toString()}`, response.body.toString());
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});

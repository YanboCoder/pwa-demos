// Registering Service Worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.addEventListener('message', function(event) {
    console.log('navigator.serviceWorker.onmessage', event);
  });

	navigator.serviceWorker.register('/pwa-demos/minipwa/public/sw.js').then(function() {
      return navigator.serviceWorker.ready;
    })
    .then(navigator.serviceWorker.controller.postMessage("serviceworker actived!"));
}
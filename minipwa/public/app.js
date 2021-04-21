// Registering Service Worker
if ('serviceWorker' in navigator) {
	// navigator.serviceWorker.addEventListener('message', function(event) {
  //   console.log('navigator.serviceWorker.onmessage', event);
  // });

	navigator.serviceWorker.register('./sw.js');
}
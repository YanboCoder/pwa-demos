// Registering Service Worker
// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('/pwa-demos/simplepwa/sw.js');
// }

try {
	window.webkit.messageHandlers.SWWebView.postMessage('hello')
} catch (error) {
	console.log('postMessage error:', error)
}
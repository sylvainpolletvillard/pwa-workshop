self.addEventListener('install', event => {
	console.log('Service Worker installing.');
});

self.addEventListener('activate', event => {
	console.log('Service Worker activating.');
});
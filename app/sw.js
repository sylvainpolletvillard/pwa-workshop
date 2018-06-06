const CACHE_NAME = 'V1';
const STATIC_CACHE_URLS = ['/', 'styles.css', 'scripts.js'];

const delay = ms => _ => new Promise(resolve => setTimeout(() => resolve(_), ms))

self.addEventListener('install', event => {
	console.log('Service Worker installing.');
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => cache.addAll(STATIC_CACHE_URLS))
	)
});

self.addEventListener('activate', event => {
	console.log('Service Worker activating.');
	// delete any unexpected caches
	event.waitUntil(
		caches.keys()
		.then(keys => keys.filter(key => key !== CACHE_NAME))
		.then(keys => Promise.all(keys.map(key => {
			console.log(`Deleting cache ${key}`);
			return caches.delete(key)
		})))
	);
});

self.addEventListener('fetch', event => {
	if(event.request.url.includes("/api/")){
		// réponse aux requêtes API, stratégie Cache Update Refresh
		event.respondWith(caches.match(event.request))
		event.waitUntil(update(event.request).then(refresh))
	} else {
		// réponse aux requêtes de fichiers statiques, stratégie Cache-First
		event.respondWith(
			caches.match(event.request) // On vérifie si la requête a déjà été mise en cache
				.then(cached => cached || fetch(event.request)) // sinon on requête le réseau
		);
	}
})

function update(request) {
	// mockup: on charge au hasard entre 1 et 10 participants
	return fetch(request.url + `?per_page=${Math.ceil(Math.random() * 10)}`)
	.then(delay(3000)) // on ajoute une fausse latence de 3 secondes
	.then(response => {
		if (!response.ok) { throw new Error('Network error'); }

		// on peut mettre en cache la réponse
		return caches.open(CACHE_NAME)
			.then(cache => cache.put(request, response.clone()))
			.then(() => response) // résout la promesse avec l'objet Response
	})
}

function refresh(response) {
	return response.json() // lit et parse la réponse JSON
		.then(jsonResponse => {
			self.clients.matchAll().then(clients => {
				clients.forEach(client => {
					// signaler et envoyer au client les nouvelles données
					client.postMessage(JSON.stringify({
						type: response.url,
						data: jsonResponse.data
					}))
				})
			})
			return jsonResponse.data; // résout la promesse avec les nouvelles données
		})
}
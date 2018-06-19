---
title: 4. Stratégie de Cache pour API REST
lang: fr
---

# Etape 4: Stratégie de Cache/Update/Refresh pour les requêtes GET de l'API REST

Nous avons vu à l'étape précédente comment mettre en cache des fichiers statiques. La stratégie que nous avons mis en place pour ces fichiers est dite *Cache-First*, c'est-à-dire qu'on servira toujours la version en cache en priorité. Qu'en est-il des données dynamiques, typiquement des réponses d'API ?

Pour les besoins du mode offline, il nous faut également mettre ces données dans un cache local. En revanche, contrairement aux fichiers statiques, il est important pour l'utilisateur de disposer des données les plus récentes (les plus "fraîches"), et ce le plus tôt possible. Il nous faut donc changer de stratégie.

## Cache, Update, Refresh

Cette stratégie de cache est légèrement plus complexe mais permet d'utiliser le cache local pour accélérer considérablement le temps de premier chargement, quitte à afficher temporairement des données non à jour.

Pour chaque requête, le service Worker va dans un premier temps retourner immédiatement une réponse en cache si elle existe, puis en parallèle requêter le réseau. A la réception de la réponse depuis le réseau, l'entrée en cache sera mise à jour et l'interface utilisateur sera mise à jour automatiquement.

Ce rafraichissement de l'interface peut se concrétiser de différentes manières selon les cas. On peut simplement ajouter dynamiquement des éléments à une liste, comme des messages dans une conversation instantanée par exemple. Ou alors notifier l'utilisateur d'une autre manière, par exemple avec un lien proposant de charger le nouveau contenu disponible.

![Schema de fonctionnement](./readme_assets/schema.png)

Avantages:

- Chargement instantané si une réponse est en cache
- Peut aider à dynamiser l'expérience utilisateur

Inconvénients:

- L'utilisateur ne doit pas pouvoir être en mesure d'interagir avec des données en cours de rafraichissement
- Le rafraichissement de l'interface à la réception de la réponse réseau peut gêner l'utilisateur si l'UX n'est pas bien pensée

## Implémentation

Nous allons pour notre application implémenter cette stratégie de *Cache, Update, Refresh* pour le chargement de la liste des participants au workshop. Cette liste va probablement peu évoluer entre chaque chargement et la plupart des évolutions successives consisteront en un ajout de un ou plusieurs autres participants. Le rafraichissement à l'écran devrait donc être naturel pour l'utilisateur. Cette stratégie semble donc la plus adaptée dans le cas présent.

### Choix de la stratégie selon la requête

Repartons du code du Service Worker, dans le callback d'événement `fetch`. Nous allons distinguer les requêtes vers notre API des requêtes statiques, afin d'appliquer une stratégie différente pour les données:

```js
self.addEventListener('fetch', event => {
    if(event.request.url.includes("/api/")){
    	// réponse aux requêtes API, stratégie Cache Update Refresh
    } else {
        // réponse aux requêtes de fichiers statiques, stratégie Cache-First
    }
})
```

Toutes nos requêtes vers l'API passent par le même endpoint contenant `/api/` dans l'URL. On peut donc facilement identifier ces requêtes en se basant sur l'URL accessible depuis `event.request.url`. Voici la [documentation de l'API FetchEvent](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent).

### 1. Cache

La première étape est de répondre immédiatement avec la réponse en cache si elle existe. Vous pouvez pour cela réutiliser la fonction `caches.match` vu à l'étape 3 pour la réponse aux requêtes de ressources statiques.

<Solution>
```js
if (event.request.url.includes("/api/")) {
    // réponse aux requêtes API, stratégie Cache Update Refresh
    event.respondWith(caches.match(event.request))
    //TODO: update et refresh
}
```
</Solution>

### 2. Update

En parallèle, la requête au réseau doit également être faite avec la méthode `fetch(request)`, puis on met à jour le cache avec la réponse via la méthode `cache.put`. Déclarez la fonction `update` ci-dessous dans le code du Service Worker:

```js
function update(request) {
	return fetch(request.url)
	.then(response => {		
		if (!response.ok) { throw new Error('Network error'); }

		// on peut mettre en cache la réponse
		return caches.open(CACHE_NAME)
		.then(cache => cache.put(request, response.clone()))
		.then(() => response) // résout la promesse avec l'objet Response
	})	
}
```

::: warning Attention
Une réponse ne peut être lue qu'une seule fois, elle doit donc être clonée avec la méthode `.clone()` avant de la stocker en cache.
:::

Ensuite, appelez cette fonction `update` dans le callback de `fetch` en parallèle de la réponse avec la version en cache. Vous pouvez tout à fait continuer à utiliser l'objet `event` dans la suite du code même après un premier `event.respondWith`. Cependant, vous devrez alors utiliser la méthode `event.waitUntil()` pour étendre la durée de vie de l'événement et indiquer au navigateur que d'autres tâches doivent être effectuées au delà de la réponse initiale.

<Solution>
```js
if (event.request.url.includes("/api/")) {
    // réponse aux requêtes API, stratégie Cache Update Refresh
    event.respondWith(caches.match(event.request))
    event.waitUntil(update(event.request)) //TODO: refresh
}
```
</Solution>

### 3. Refresh

Si le réseau a répondu et que la réponse a été mise en cache, on souhaite indiquer à l'application que de nouvelles données sont disponibles afin d'actualiser l'affichage.

Les applications ayant un Service Worker inscrit et installé sont appelés "clients" au regard de ce Service Worker, et sont accessibles via [l'API `Clients` documentée ici](https://developer.mozilla.org/en-US/docs/Web/API/Clients). Le Service Worker communique avec le client par le biais de la méthode `client.postMessage`. Le format d'échange est textuel, vous devrez donc sérialiser vos données en JSON. Le message transmis sera un objet constitué a minima d'une propriété pour identifier le type de message (ici on a choisi l'URL de la requête correspondante) et d'une autre propriété contenant les données à transmettre (le contenu de la réponse).

Déclarez la fonction `refresh` ci-dessous dans le code du Service Worker. 

```js
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
```

Il ne reste plus qu'à assembler les 3 blocs `cache`, `update` et `refresh` pour établir la stratégie: la réponse du cache avec un `event.respondWith`, puis en parallèle l'update suivi du refresh dans un `event.waitUntil`. La fonction `update` retourne une `Promise` résolue avec la réponse réseau, vous pouvez donc la chaîner avec `.then()` pour exécuter une autre fonction à la suite d'une réponse réseau.

<Solution>
```js
if(event.request.url.includes("/api/")){
    // réponse aux requêtes API, stratégie Cache Update Refresh
    event.respondWith(caches.match(event.request))
    event.waitUntil(update(event.request).then(refresh))
}
```
</Solution>

## Rafraîchissement côté applicatif

Le client peut écouter les messages émis par le Service Worker via le callback `navigator.serviceWorker.onmessage`. Vous pouvez ensuite désérialiser le message avec `JSON.parse(event.data)`. Dans `scripts.js`, une fois le Service Worker enregistré, déclarez le callback suivant:

```js
navigator.serviceWorker.onmessage = event => {
	const message = JSON.parse(event.data);
	//TODO: détecter le type de message et actualiser l'affichage
}
```

La fonction `renderAttendees` permet d'actualiser la liste des participants. L'affichage sera donc mis à jour quand le Service Worker enverra le message avec les nouvelles données. Complétez le code ci-dessus en vérifiant si le message correspond à une mise à jour des participants, puis rappelez la fonction `renderAttendees` avec les données reçues dans le message.

<Solution>
```js
navigator.serviceWorker.onmessage = event => {
	const message = JSON.parse(event.data);
	if(message && message.type.includes("/api/users")){
		console.log("Liste des participants à jour", message.data)
		renderAttendees(message.data)
	}
}
```
</Solution>

## Test de bon fonctionnement

Pour tester le bon fonctionnement de la stratégie de chargement, puisque l'application utilise pour le moment une API mockup avec de fausses données, nous allons simuler des changements dans le nombre de participants et ajouter une fausse latence réseau pour nous laisser le temps d'observer la stratégie en action.

Modifiez la fonction `update` dans `sw.js` comme ceci:

```js
const delay = ms => _ => new Promise(resolve => setTimeout(() => resolve(_), ms))

function update(request) {
	// mockup: on charge au hasard entre 1 et 10 participants
	return fetch(request.url + `?per_page=${Math.ceil(Math.random() * 10)}`)
	.then(delay(3000)) // on ajoute une fausse latence de 3 secondes
	.then(response => {		
		(...)
		
```

Assurez-vous que le Service Worker est bien actualisé et réinstallé (dans les Developer Tools, onglet Application > Service Workers, cochez la case *Update on reload*, voir étape 2), puis rechargez la page. Vous devriez voir l'ancien nombre de participants, puis 3 secondes plus tard la liste se rafraîchir avec un nouveau nombre de participants.

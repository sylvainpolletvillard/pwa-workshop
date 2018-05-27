---
title: 3. Precaching et mode offline basique
lang: fr
---

# Etape 3 : Precaching des assets statiques pour un mode offline basique

On a vu dans l'étape précédent deux méthodes du cycle de vie d'un Service Worker: `install` et `activate`. Dans cette partie, on va poursuivre notre exploration des PWA en mettant en cache les fichiers statiques.

Parmi les [API dont dispose le Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), celle qui nous intéresse est [l'API Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache). En effet, elle permet de mettre dans un cache persistant des réponses aux requêtes. Il est possible de spécifier l'URL à mettre en cache, ou bien de donner une réponse personnalisée avec les différentes fonctions `add`, `addAll` et `put`. On peut également supprimer des entrées du cache si on le souhaite. Les réponses sont identifiées dans le cache par une clé de type *string*.

Les différents caches sont gérés par la propriété `caches` du Service Worker. C'est l'API [CacheStorage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) qui permet, entre-autres, de créer/obtenir un objet cache ou d'en supprimer un avec les fonctions `open` et `delete`. Les différents caches sont identifiés par des clés de type *string* dans le `CacheStorage`.

Une autre fonction intéressante est `match` qui vérifie dans les tous les objets `Cache` gérés par le `CacheStorage` si une requête correspond à cette passées en paramètre. Si c'est le cas, elle retourne un promesse qui permet d'accéder à la réponse en cache.

Pour résumer, voici les différentes étapes pour mettre des fichiers statiques en cache:

1.  Ouvrir l'object cache avec `caches.open('clé_du_cache')` et récupérer l'instance de l'object `cache` dans la promesse.
2.  ajouter les fichiers statiques avec `cache.add(urlFichier)` et `cache.addAll(urls)`.

Le moment opportun pour mettre en cache le contenu statiques est l'évènement `install` du Service Worker. Car il n'est appelé qu'une fois lors de son installation. Le bout de code suivant illustre l'ajout du fichier`index.html` dans le cache.

```js
var CACHE_NAME = 'V1';
var STATIC_FILES = ['/', '/main.js'];
self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');
  self.caches.open(CACHE_NAME).then(function(cache) {
    cache.addAll(STATIC_FILES);
  });
});
```

On peut vérifier que les fichiers sont ajoutés dans le cache en consultant l'écran **Cache Storage** de l'onglet **Applications** des dev tools.

![Cache storage](./readme_assets/cache_storage.png 'Service Worker en attente')

Maintenant que les fichiers sont en cache, il nous reste à les charger localement lorsque le navigateur les demande. Pour ce faire, nous allons passer par l'évènement `fetch`. Ce dernier intercepte tous les appels émis par les clients gérés per le Service Worker. On peut retourner une réponse personnalisés en appelant `event.respondWith` où `event` est le paramètre du gestionnaire d'évènement `fetch`. La fonction `event.respondWith` renvoie une promesse qui résout vers un object réponse. Justement, la fonction `caches.match` renvoie une promesse qui résout vers un object réponse. Donc, en combinant les deux appels, on peut retourner les fichiers statiques en cache au lieu d'aller les chercher sur internet.

```js
self.addEventListener('fetch', function(event) {
  //Personnalisation de la réponse
  event.respondWith(
    //ON vérifie si la requête a déjà été mise en cache
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
```

On peut tester le mode offline maintenant en cochant la case **offline** et en décochant la case **update on reload** car on veut garder le Service Worker.

```js
// A ajouter dans fetch si pour ne pas gérer les requete autre que http
if (!event.request.url.startsWith('http')) {
  return;
}
```

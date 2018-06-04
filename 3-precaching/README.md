---
title: 3. Precaching et mode offline basique
lang: fr
---

# Etape 3 : Precaching des assets statiques pour un mode offline basique

On a vu dans l'étape précédent deux méthodes du cycle de vie d'un Service Worker: `install` et `activate`. Dans cette partie, on va poursuivre notre exploration des PWA en mettant en cache les fichiers statiques.

## Exploration des API de mise en cache

Parmi les [API auquel a accès le Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), celle qui nous intéresse est [l'API Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache). En effet, elle permet de mettre dans un cache persistant les paires Requêtes/Réponses via la méthode `put(request, response)`. Il est également possible de passer une ou plusieurs URL en argument des méthodes `add` et `addAll` ; elles seront requêtées et la réponse sera ajoutée au cache. On peut également supprimer des entrées du cache avec la méthode `delete`.

Les différents caches sont accessibles via la variable `caches` depuis le Service Worker. C'est l'API [CacheStorage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) qui permet, entre autres, de créer/obtenir un objet cache ou d'en supprimer un avec les fonctions `open` et `delete`. Les différents caches sont identifiés par des clés de type _string_ dans le `CacheStorage`.

Enfin, une autre méthode intéressante du cache est `match`: elle vérifie dans les tous les objets `Cache` gérés par le `CacheStorage` si une requête est identique à celle passée en paramètre. Si c'est le cas, elle retourne un promesse qui permet d'accéder à la réponse en cache.

## Ajout des fichiers statiques dans le cache

Nous allons mettre les fichiers statiques essentiels de l'application en cache. Le moment opportun pour mettre en cache le contenu statique est l'évènement `install` du Service Worker, car il n'est appelé qu'une fois lors de son installation.

1. Placez-vous dans le code du Service Worker dans le callback de l'événement `install` que vous avez dû ajouter à l'étape 2.
2. Ouvrez le cache avec [`caches.open('nom_du_cache')`](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open), qui retourne une promesse résolue avec l'instance de l'objet `cache`. Pensez à indiquer un numéro de version dans le nom du cache, cela nous sera utile pour les mises à jour ultérieures.
3. Une fois le cache ouvert, ajoutez ensuite les fichiers statiques `index.html`, `styles.css` et `scripts.js` au cache avec [`cache.addAll(liste_des_urls)`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll).

<!-- Solution:
const CACHE_NAME = 'V1';
const STATIC_FILES = ['index.html', 'styles.css', 'scripts.js'];

self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  self.caches.open(CACHE_NAME)
  .then(cache => cache.addAll(STATIC_FILES))
});
-->

Rechargez la page et le Service Worker, en vérifiant bien que la nouvelle version du Service Worker remplace l'ancienne comme vu à l'étape 2. On peut alors vérifier que les fichiers sont ajoutés dans le cache en consultant l'écran *Cache Storage* de l'onglet *Application* des Developer Tools.

![Cache storage](./readme_assets/cache_storage.png 'Service Worker en attente')

## Réponse avec le cache en priorité

Maintenant que les fichiers sont en cache, il nous reste à indiquer d'utiliser la version en cache lorsque le navigateur les demande. Pour ce faire, nous allons passer par l'évènement `fetch`. Ce dernier intercepte tous les appels émis par les clients ayant installé le Service Worker. On peut alors retourner une réponse personnalisée avec `event.respondWith`, où `event` est l'évènement `fetch`. La fonction [`event.respondWith`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) prend comme unique argument une promesse qui devra être résolue avec la réponse à retourner. Justement, la fonction [`caches.match`](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/match) retourne une promesse résolue avec un objet `Response`. Donc, en combinant les deux appels, on peut retourner les fichiers statiques en cache au lieu d'aller les chercher sur le réseau.

1. Ajoutez un callback pour l'événement `fetch`, de la même façon que vous l'avez fait pour `install` à l'étape précédente.
2. Appelez la méthode `caches.match(event.request)` pour checher dans le cache une éventuelle réponse mise en cache pour la requête correspondante.
3. Si aucune entrée dans le cache n'est trouvée, la promesse est résolue avec la valeur `undefined`. Dans ce cas, il faut requêter le réseau et retourner `fetch(event.request)` à la place.
4. Il ne reste plus qu'à retourner cette promesse de réponse à la requête en la passant en argument à `event.responseWith()` 

<!-- Solution:
self.addEventListener('fetch', event => {
  //Personnalisation de la réponse
  event.respondWith(
    caches.match(event.request) // On vérifie si la requête a déjà été mise en cache
    .then(response => response || fetch(event.request)) // sinon on requête le réseau
  );
});
-->

## Test de fonctionnement offline

Si tout a été fait correctement, vous devriez désormais pouvoir tester l'application en mode offline. Dans Developer Tools > Application > Service Workers, cochez la case *Offline* et décochez la case **Update on reload**, car on ne pourra pas recharger le Service Worker une fois offline. Enfin, rechargez l'application. La page en cache devrait alors s'afficher, mais la liste de participants ne se charge plus. Nous allons y remédier à l'étape suivante.

*Selon les extensions installées sur votre navigateur, il se peut que des erreurs s'affichent sur Chrome, liées à des requêtes d'autres protocoles que HTTP. Vous pouvez ajouter ce code au début du gestionnaire d'évènement fetch pour contourner ce problème.*

```js
// A ajouter dans le callback de fetch pour ignorer les requêtes non HTTP
if (!event.request.url.startsWith('http')) return;
```

## Mise à jour du cache statique

La mise en cache des fichiers statiques pose un problème; que se passe-t-il si j'ajoute, supprime, ou modifie des fichiers ?

Tel que nous avons codé actuellement notre Service Worker, on rechargera toujours les fichiers en cache, donc les nouvelles versions déployées sur le serveur ne seront jamais utilisées.

Pour gérer ce problème, une solution est de passer vers un nouveau cache avec un autre nom. L'idée ici serait de créer un nouveau cache nommé ou suffixé **V2** qui contient les nouveaux fichiers et de supprimer l'ancien cache. 

1. Dans le callback de l'événement `install`, créez le nouveau cache en changeant son nom
2. Dans le callback de l'événement `activate`, supprimez l'ancien cache avec `caches.delete(nomDuCache)`
3. Améliorez votre code de nettoyage des anciens caches en supprimant tous les caches qui ne font pas partie de votre liste connue de caches utilisés. Vous pouvez parcourir tous les caches existants avec la méthode `caches.keys()`

<!-- Solution:
```js
const CACHE_NAME = 'V2';

(...)

self.addEventListener('activate', event => {
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
```
-->

[Plus d'informations sur le cycle de vie d'un Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle).

## Installation de la PWA

Selon le navigateur et l'OS, les conditions techniques requises pour pouvoir installer la PWA sur le système varient. Il est possible que vous ayez déjà pu installer la PWA  avant d'arriver à cette étape. Mais en principe, si vous avez un manifeste et un Service Worker actif gérant les requêtes entrantes avec `fetch`, alors vous pourrez installer la PWA sur toutes les plates-formes supportées, qui mettront à profit le manifeste et le Service Worker.

L'installation de PWA est supportée sur Chrome OS mais encore expérimentale sur les autres systèmes avec Chrome. Vous pouvez activer l'installation de PWA avec Chrome sur Windows en activant ce flag: **chrome://flags/#enable-pwa-full-code-cache** ; mais le support est encore incomplet.

La plate-forme ayant la meilleure intégration ce jour est **Android**. Si vous disposez d'un smartphone Android, ouvrez l'application depuis celui-ci. Une fois la page web ouverte, ouvrir le menu de Chrome et choisir l'option: **Add to home screen**

![Add to home screen](./readme_assets/pwa_install_menu.jpg 'dd to home screen')

Poursuivre l'installation. Un nouveau raccourci devrait apparaitre dans l'écran d'accueil du smartphone. C'est le raccourci vers notre PWA !

![PWA bookmark](./readme_assets/pwa_install.jpg 'PWA bookmark')
![Splash-screen](./readme_assets/splash-screen.jpg 'Splash-screen')

Une fois la PWA installée, quand on clique sur le raccourci, un splash screen est affiché brièvement. Celui-ci reprend les couleurs et l'icône spécifiée dans le manifeste.

Vous remarquerez que la barre d'adresse et le reste de l'interface du navigateur ne sont plus présentes, si vous avez configuré la propriété `display` correctement dans le manifeste.

![PWA run from bookmark](./readme_assets/pwa-fullscreen.jpg 'PWA run from bookmark')

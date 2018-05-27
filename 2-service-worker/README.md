---
title: 2. Installation d'un Service Worker
lang: fr
---

# Etape 2 : Installation d'un Service Worker

Le service worker permet principalement de simplifier la mise en cache et la support du mode offline.

Voici quelques [spécificités](https://developers.google.com/web/fundamentals/primers/service-workers/) des service workers:

* Ce sont des workers javascript. Il ne peuvent pas accéder au DOM directement mais il peuvent communiquer avec les pages qu'ils contrôlent et ces dernières peuvent manipuler le DOM. L'API utilisée pour la communication est `postMessage`.
* Ce sont des proxy réseau programmables. En effet, il proposent des évènement qui permettent personnaliser la gestion des requêtes émises pas vos pages.
* Ils sont automatiquement terminés lorsqu'ils ne sont pas utilisés et ils sont redémarres si besoin.
* Plusieurs API sont disponibles pour persister les données dans le services worker, par exemple [**Cache API**](https://developer.mozilla.org/fr/docs/Web/API/Cache) et `IndexdedDB`.
* Il se base sur l'utilisation des promesses.

Il faut d'abord enregistrer un service worker avant de l'utiliser. On l'ajout généralement au chargement de la page.

```js
/**
 * Installation du service worker au chargement du document
 */
addEventListener('DOMContentLoaded', function(event) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function(serviceWorker) {
        console.log('Service worker registered ' + serviceWorker);
      })
      .catch(function(error) {
        console.log('Service worker registered ' + error);
      });
  }
});
```

Avant de rafraichir la page, créez un fichier _sw.js_ vide (pour l'instant). Rechargez la page, le log suivant devrait apparaitre une fois la page chargée.

> Service worker registered [object ServiceWorkerRegistration]

Cela signifie que le service worker a bien été enregistré. On peut vérifier cela grâce à l'onglet **Application** des ChromeDev tools.

![Service worker bien installé](./readme_assets/service-worker-setup.png 'Cycle de vie du service worker')

Nous allons voir dans le section qui suite ce qui se passe après l'enregistrement d'un service worker.

## Cycle de vie du service worker

Quand on enregistre un service worker, son cycle de vie démarre. Le schéma suivant représente les différentes étapes du cycle de vie d'un service worker ([source](https://developers.google.com/web/fundamentals/primers/service-workers/)).

![Cycle de vie du service worker](./readme_assets/sw-lifecycle.png 'Cycle de vie du service worker')

Les premières étapes sont l'installation et l'activation. Vérifions cela en ajoutant le code suivant dans le fichier _sw.js_.

```js
self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.');
});
```

Recharger la page et vérifier les logs.

![Chrome apps tab](./readme_assets/chrome_apps_tab.png 'Chrome apps tab')

Lorsqu'on développe un service worker, il est pratique d'activer la case **Update on reload**.

When developing a service worker, it is recommended to check the **Update on reload** checkbox. It makes chrome reinstall the Service Worker after each registration. Otherwise, when you register a new service worker, w will have to manually unregister the previous one before. So, please go ahead and check it.

Next, create a javascript file at the root folder called **sw.js** (or whatever name you specified to the register method). As explained above, the service worker is a set of event handlers that allow us to mainly provide caching behavior. With respect to that, we are going to implement two event handlers: **install** and **fetch**.

The first event is `install`. It is called once after a successful service worker **registration**. It is the best place to cache the app shell and all static content. We are going to use Cache API of the service worker to add those files as follows. Add the following code to sw.js.

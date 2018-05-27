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

```
Service worker registered [object ServiceWorkerRegistration]
```

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

Rechargez la page et vérifier les logs. Tiens, on ne voit que le log d'installation.

```
Service worker registered [object ServiceWorkerRegistration]
Service Worker installing.
```

Vérifions, l'écran service worker des devtools. Un affichage similaire à la capture suivante devrait apparaitre:

![Service worker en attente d'installation](./readme_assets/sw-waiting.png 'Service worker en attente')

Quand on rafraîchit la page, le navigateur essaye d'installer puis d'activer un nouveau service worker. Comme ce dernier est différent du service worker actif, son activation est suspendue. Dans ce cas, Il entre en attente et ne sera installé que si le précédent service worker ne contrôle aucun client. On a deux solutions dans ce cas: soit fermer tous les onglets controlés par le premier service worker ou bien cliquer sur le bouton **skipWaiting**.

Cliquez sur le bouton **skipWaiting**. Et là, on remarque que l'ancien service worker a disparu et que celui qui était en attente prend sa place. Le log d'activation s'affiche également.

```
Service Worker activating.
```

Quand on rafraîchit la page sans modifier le service worker. On remarque qu'on ne passe plus par les étapes d'installation et d'activation.

On peut comprendre qu'il est nécessaire de gérer en production la montée en version des services workers. En développement, on peut s'en passer en cochant la case **Update on reload**. Cette dernière permet d'activer immédiatement les futurs nouveaux service workers. C'est un équivalent d'un clic automatique sur **skipWaiting** à chaque fois.

Dans cette partie, on a installé un service worker. On a également gérer deux évènements qui sont **install** et **activate**.

---
title: 2. Installation d'un Service Worker
lang: fr
---

# Etape 2 : Installation d'un Service Worker

Le Service Worker permet principalement de simplifier la mise en cache et la support du mode offline.

Voici quelques [spécificités](https://developers.google.com/web/fundamentals/primers/service-workers/) des Service Workers:

* Ce sont des workers javascript. Il ne peuvent pas accéder au DOM directement mais il peuvent communiquer avec les pages qu'ils contrôlent et ces dernières peuvent manipuler le DOM. L'API utilisée pour la communication est `postMessage`.
* Ce sont des proxy réseau programmables. En effet, il proposent des évènement qui permettent personnaliser la gestion des requêtes émises pas vos pages.
* Ils sont automatiquement terminés lorsqu'ils ne sont pas utilisés et ils sont redémarres si besoin.
* Plusieurs API sont disponibles pour persister les données dans le services worker, par exemple [**Cache API**](https://developer.mozilla.org/fr/docs/Web/API/Cache) et `IndexdedDB`.
* Il se base sur l'utilisation des promesses.

Dans le dossier `app`, créez un fichier `sw.js` vide (pour l'instant). Il contiendra le code de votre Service Worker.

## Enregistrement du Service Worker

Avant d'utiliser un Service Worker, il faut le faire enregistrer par l'application. On enregistre généralement le Service Worker au chargement de la page. Dans le fichier `scripts.js`, complétez la fonction appelée au chargement du document avec le code suivant :

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function(serviceWorker) {
      console.log('Service Worker registered: ' + serviceWorker);
    })
    .catch(function(error) {
      console.log('Error registering the Service Worker: ' + error);
    });
}
```

Avant de rafraichir la page, Rechargez la page, le log suivant devrait apparaitre une fois la page chargée.

```
Service Worker registered: [object ServiceWorkerRegistration]
```

Cela signifie que le Service Worker a bien été enregistré. On peut vérifier cela grâce à l'onglet **Application** des ChromeDev tools.

![Service Worker bien installé](./readme_assets/service-worker-setup.png 'Cycle de vie du Service Worker')

Nous allons voir dans le section qui suite ce qui se passe après l'enregistrement d'un Service Worker.

## Cycle de vie du Service Worker

Quand on enregistre un Service Worker, son cycle de vie démarre. Le schéma suivant représente les différentes étapes du cycle de vie d'un Service Worker ([source](https://developers.google.com/web/fundamentals/primers/service-workers/)).

![Cycle de vie du Service Worker](./readme_assets/sw-lifecycle.png 'Cycle de vie du Service Worker')

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
Service Worker registered [object ServiceWorkerRegistration]
Service Worker installing.
```

Vérifions, l'écran Service Worker des devtools. Un affichage similaire à la capture suivante devrait apparaitre:

![Service Worker en attente d'installation](./readme_assets/sw-waiting.png 'Service Worker en attente')

Quand on rafraîchit la page, le navigateur essaie d'installer puis d'activer un nouveau Service Worker. Comme ce dernier est différent du Service Worker actif, son activation est suspendue. Dans ce cas, Il entre en attente et ne sera installé que si le précédent Service Worker ne contrôle aucun client. On a deux solutions dans ce cas: soit fermer tous les onglets controlés par le premier Service Worker ou bien cliquer sur le bouton **skipWaiting**.

Cliquez sur le bouton **skipWaiting**. Et là, on remarque que l'ancien Service Worker a disparu et que celui qui était en attente prend sa place. Le log d'activation s'affiche également.

```
Service Worker activating.
```

Quand on rafraîchit la page sans modifier le Service Worker, on remarque qu'on ne passe plus par les étapes d'installation et d'activation.

On peut comprendre qu'il est nécessaire de gérer en production la montée en version des Service Workers. En développement, on peut s'en passer en cochant la case **Update on reload**. Cette option permet d'activer immédiatement les futurs nouveaux Service Workers. C'est un équivalent d'un clic automatique sur **skipWaiting** à chaque fois.

Est-ce que la fonction _Add to home screen_ fonctionne ?

Dans cette partie, nous avons vu comment installer un Service Worker. On a également géré deux évènements du cycle de vie du Service Worker: **install** et **activate**. Nous allons maintenant voir comment faire quelque-chose d'utile avec ce Service Worker.

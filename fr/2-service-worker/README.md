---
title: 2. Installation d'un Service Worker
lang: fr
---

# Etape 2 : Installation d'un Service Worker

Les [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/) constituent une API assez vaste et présentant beaucoup de potentiel. Dans le cadre d'une PWA, le Service Worker va principalement nous permettre de définir une stratégie de mise en cache et ainsi mieux gérer les connexions capricieuses, voire un mode offline complet pour notre application.

Ce que vous devez retenir au sujet des Service Workers:

* Ce sont des workers codés en JavaScript. Ils s'éxécutent dans un thread distinct du script applicatif et ne peuvent pas accéder au DOM ni aux variables globales, mais l'application peut communiquer avec le worker grâce à l'API `postMessage`.
* Ils peuvent être considérés comme des proxy réseau programmables. En effet, ils permettent d'intercepter les requêtes réseau en partance du navigateur et de personnaliser les réponses.
* Ils ont un cycle de vie indépendant de l'application web associée. Ils s'arrêtent lorsqu'ils ne sont pas utilisés et redémarrent au besoin.
* Ils peuvent fonctionner sans que l'application web associée tourne, ce qui permet certaines fonctionnalités inédites comme l'envoi de notifications Push.
* Plusieurs API sont disponibles au sein du Service Worker pour persister les données localement, par exemple l'[**API Cache**](https://developer.mozilla.org/fr/docs/Web/API/Cache) et l'[**API IndexedDB**](https://developer.mozilla.org/fr/docs/Web/API/API_IndexedDB).
* La plupart des API associées sont basées sur l'utilisation des promesses ([`Promise`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise)).

Dans le dossier `app`, créez un fichier `sw.js` vide (pour l'instant). Il contiendra le code de votre Service Worker.

## Enregistrement du Service Worker

Avant d'utiliser un Service Worker, il faut le faire enregistrer par l'application. On enregistre généralement le Service Worker au chargement de la page. Dans le fichier `scripts.js`, complétez la fonction appelée au chargement du document avec le code suivant :

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(serviceWorker => {
      console.log('Service Worker registered: ' + serviceWorker);
    })
    .catch(error => {
      console.log('Error registering the Service Worker: ' + error);
    });
}
```

Rechargez la page, le log suivant devrait apparaitre une fois la page chargée.

```
Service Worker registered: [object ServiceWorkerRegistration]
```

Cela signifie que le Service Worker a bien été enregistré. On peut vérifier cela en regardant dans l'onglet **Application** des Chrome Developer Tools, puis dans la sous-section **Service Workers**.

![Service Worker bien installé](../../2-service-worker/readme_assets/service-worker-setup.png 'Cycle de vie du Service Worker')

Nous allons voir dans le section qui suite ce qui se passe après l'enregistrement d'un Service Worker.

## Cycle de vie du Service Worker

Quand on enregistre un Service Worker, son cycle de vie démarre. Le schéma suivant représente les différentes étapes du cycle de vie d'un Service Worker ([source](https://developers.google.com/web/fundamentals/primers/service-workers/)).

![Cycle de vie du Service Worker](../../2-service-worker/readme_assets/sw-lifecycle.png 'Cycle de vie du Service Worker')

Les premières étapes sont l'installation et l'activation. Vérifions cela en ajoutant le code suivant dans le fichier _sw.js_.

```js
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
});
```

Rechargez la page et vérifier les logs. Curieusement, on ne voit que le log d'installation.

```
Service Worker registered [object ServiceWorkerRegistration]
Service Worker installing.
```

Regardons ce qui se passe dans la section Service Worker des Dev Tools. Un affichage similaire à la capture suivante devrait apparaitre:

![Service Worker en attente d'installation](../../2-service-worker/readme_assets/sw-waiting.png 'Service Worker en attente')

Quand on rafraîchit la page, le navigateur essaie d'installer puis d'activer le Service Worker avec le nouveau code. Comme ce dernier est différent du Service Worker actif, celui enregistré au début de l'étape 2, l'activation du nouveau Service Worker est suspendue. Dans ce cas, il est mis en attente et ne sera installé que si le précédent Service Worker ne contrôle plus aucun client. On a deux solutions dans ce cas: soit fermer tous les onglets controlés par le premier Service Worker ou bien cliquer sur le lien **skipWaiting** dans les outils développeur.

Cliquez sur le lien **skipWaiting**. On remarque que l'ancien Service Worker a disparu et que celui qui était en attente prend sa place. Le log d'activation s'affiche également.

```
Service Worker activating.
```

Quand on rafraîchit la page sans modifier le Service Worker, on remarque qu'on ne passe plus par les étapes d'installation et d'activation.

Ce comportement est nécessaire pour gérer les montées de version des Service Workers en production. En pratique, vous aurez à écrire du code dans le Service Worker pour gérer ce processus de mise à jour et appeler `skipWaiting` programmatiquement une fois que tout est prêt. 

Pendant le développement toutefois, on peut s'en passer en cochant la case **Update on reload**. Cette option permet d'activer immédiatement les futurs nouveaux Service Workers. C'est un équivalent d'un clic automatique sur **skipWaiting** à chaque fois.

::: tip Note
Activez l'option **Update on reload** lorsque vous travaillez sur le code d'un Service Worker pour toujours disposer de la dernière version.

![Update on reload](../../2-service-worker/readme_assets/devtools-update-on-reload.png) 

Attention toutefois, cette option installera et activera le Service Worker **avant** d'afficher la page, ce qui ne vous permettra pas de voir les logs associés à ces évènements en console.
:::

Dans cette partie, nous avons vu comment installer un Service Worker. On a également géré deux évènements du cycle de vie du Service Worker: **install** et **activate**. Nous allons maintenant voir comment faire quelque-chose d'utile avec ce Service Worker.
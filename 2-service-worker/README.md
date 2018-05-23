---
title: 2. Installation d'un Service Worker
lang: fr
---

# Etape 2 : Installation d'un Service Worker

Le service worker permet principalement de simplifier la mise en cache et la conception d'expériences offlines.

Voici quelques [spécificités](https://developers.google.com/web/fundamentals/primers/service-workers/) des service workers:

* Ce sont des workers javascript. Il ne peuvent pas accéder au DOM directement mais il peuvent communiquer avec les pages qu'ils contrôlent et ces dernières peuvent manipuler le DOM. L'API utilisée pour la communication est `postMessage`.
* Ce sont des proxy réseau programmables. En effet, il proposent des évènement qui permettent personnaliser la gestion des requêtes émises pas vos pages.
* Ils sont automatiquement terminés lorsqu'ils ne sont pas utilisés et ils sont redémarres si besoin.
* Plusieurs API sont disponibles pour persister les données dans le services worker, par exemple [**Cache API**](https://developer.mozilla.org/fr/docs/Web/API/Cache) et `IndexdedDB`.
* Ils utilisent énormément les promesses.

The service worker is basically a set of event handlers for some browser events that must be implemented in a separate file, often called **sw.js**. In order to use it, we need to first register it to the browser. Registration is done by calling `navigator.serviceWorker.register`.

Add the following function to the **main.js** file and add it to the `onload` event handler of your **index.html** page.

```js
/**
 * Install the service worker
 */
async function installServiceWorkerAsync() {
  if ('serviceWorker' in navigator) {
    try {
      let serviceWorker = await navigator.serviceWorker.register('/sw.js');
      console.log(`Service worker registered ${serviceWorker}`);
    } catch (err) {
      console.error(`Failed to register service worker: ${err}`);
    }
  }
}
```

When the page reloads, you should see the following log line in the console of your browser.

> Service worker registered [object ServiceWorkerRegistration]

This means that the file **sw.js** specified in `let serviceWorker = await navigator.serviceWorker.register('/sw.js')` has been successfully registered as a service worker. You can confirm that by checking the **Applications** tab of the Chrome developer tools.

![Chrome apps tab](./readme_assets/chrome_apps_tab.png 'Chrome apps tab')

_The application tab is a very useful tool for debugging your PWA. I invite you to play with its different menus._

When developing a service worker, it is recommended to check the **Update on reload** checkbox. It makes chrome reinstall the Service Worker after each registration. Otherwise, when you register a new service worker, w will have to manually unregister the previous one before. So, please go ahead and check it.

Next, create a javascript file at the root folder called **sw.js** (or whatever name you specified to the register method). As explained above, the service worker is a set of event handlers that allow us to mainly provide caching behavior. With respect to that, we are going to implement two event handlers: **install** and **fetch**.

The first event is `install`. It is called once after a successful service worker **registration**. It is the best place to cache the app shell and all static content. We are going to use Cache API of the service worker to add those files as follows. Add the following code to sw.js.

```js
const CACHE_NAME = 'V1';

/**
 * The install event is fired when the registration succeeds.
 * After the install step, the browser tries to activate the service worker.
 * Generally, we cache static resources that allow the website to run offline
 */
this.addEventListener('install', async function() {
  const cache = await caches.open(CACHE_NAME);
  cache.addAll(['/index.html', '/main.css', '/main.js']);
});
```

Using the cache is pretty straightforward; we first `open` it and then `addAll` static files.

You can check that the files are successfully added by clicking on the **Cache Storage** on the left menu.

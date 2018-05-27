---
title: 3. Precaching et mode offline basique
lang: fr
---

# Etape 3 : Precaching des assets statiques pour un mode offline basique

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

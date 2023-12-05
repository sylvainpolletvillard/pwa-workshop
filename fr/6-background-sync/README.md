---
title: 6. Background sync et notifications
lang: fr
---

# Etape 6 : Background sync et notifications

Dans cette section, nous allons mettre à profit le Service Worker et une nouvelle API, **Background Sync**, pour mettre à jour la liste des participants en tâche de fond et notifier l'utilisateur lorsqu'il y a des nouveaux participants.

::: danger Non standard
L'API Background Sync n'est pas encore standardisée. La [spécification](https://wicg.github.io/BackgroundSync/spec/) est toujours à l'étude. Elle est déjà implémentée sur Chrome, Edge et Android depuis 2016. Cette API distingue deux types de synchronisation: _One-Time_ et _Périodique_.
:::

Concernant les notifications, L'API Push permet aux applications web de recevoir des notifications push poussées depuis un serveur, même lorsque l'application web n'est pas au premier plan et même lorsqu'elle n'est actuellement pas chargée sur l'agent utilisateur. Néanmoins, cela implique l’utilisation côté serveur d’un service de push tel que Google Cloud Messenger.

Dans le cadre de ce workshop, nous n'allons pas utiliser l'API Push mais l'**API Notification**. Cette API permet également d'envoyer des notifications sans nécessiter de partie serveur, mais requiert que le navigateur soit ouvert. Ces notifications sont multi-plateformes, elles s’adapteront donc à la plate-forme cible: notifications Android ou centre de notifications de Windows 10 par exemple.

## Notifications et permissions

La synchronisation en tâche de fond ne nécessite pas de permissions particulières, en revanche afficher des notifications requiert le consentement de l'utilisateur. Pour éviter le spam, les navigateurs ont ajouté des contraintes à respecter pour pouvoir demander ces permissions. On peut par exemple le faire suite à une action de l'utilisateur comme le clic sur un lien.

Ajoutez donc le lien ci-dessous quelque-part dans la page `index.html` pour activer les notifications:

```html
<a onclick="registerNotification()">Notify me when there are new attendees</a>
```

Puis déclarez la fonction suivante dans `scripts.js`

```js
function registerNotification() {
  Notification.requestPermission((permission) => {
    if (permission === "granted") {
      registerBackgroundSync();
    } else console.error("Permission was not granted.");
  });
}
```

Lorsque l'utilisateur aura donné sa permission d'afficher des notifications, nous appellerons la fonction `registerBackgroundSync` pour mettre en place la synchronisation en arrière-plan.

## Synchronisation en tâche de fond

Le client doit explicitement s'inscrire aux tâches de synchronisation en tâche de fond. Pour ce faire, on commence par récupérer une référence à la `ServiceWorkerRegistration`, qui représente le lien d'enregistrement entre votre Service Worker et votre client. Le plus simple pour cela est d'utiliser [`navigator.serviceWorker.ready`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/ready) qui retourne une `Promise` résolue avec la `ServiceWorkerRegistration` lorsque le Service Worker est installé et actif.

Une fois l'objet `registration` de type `ServiceWorkerRegistration` récupéré, nous pouvons appeler la méthode `registration.sync.register` pour s'inscrire à une tâche de synchronisation One-Time en arrière-plan.

```js
function registerBackgroundSync() {
  if (!navigator.serviceWorker) {
    return console.error("Service Worker not supported");
  }

  navigator.serviceWorker.ready
    .then((registration) => registration.sync.register("syncAttendees"))
    .then(() => console.log("Registered background sync"))
    .catch((err) => console.error("Error registering background sync", err));
}
```

Côté Service Worker, un évènement de type `sync` sera émis lorsque le système décide de déclencher une synchronisation. Cette décision se base sur différents paramètres: la connectivité, l'état de la batterie, la source d'alimentation etc. ; ainsi nous ne pouvons pas être sûrs du moment où la synchronisation est déclenchée. La spécification prévoit des possibilités de paramétrage à terme, mais pour le moment, tout ce que nous pouvons faire est attendre. Toutefois, dans les conditions du workshop, cela ne devrait prendre que quelques secondes.

```js
self.addEventListener("sync", function (event) {
  console.log("sync event", event);
  if (event.tag === "syncAttendees") {
    event.waitUntil(syncAttendees()); // on lance la requête de synchronisation
  }
});
```

## Actualisation et notification

La requête de synchronisation est similaire à l'`update` et `refresh` de l'étape 4, à la différence qu'elle est faite à la demande du système et non du client:

```js
function syncAttendees() {
  return update({ url: `https://reqres.in/api/users` })
    .then(refresh)
    .then((attendees) =>
      self.registration.showNotification(
        `${attendees.length} attendees to the PWA Workshop`
      )
    );
}
```

Si le client dispose de la permission d'afficher des notifications, la méthode `self.registration.showNotification` devrait afficher une notification avec le texte désiré sur le client enregistré.

## Test de bon fonctionnement

::: warning Attention
Comme pour les étapes précédentes, assurez-vous que la case **Update on reload** est cochée dans les Developer Tools afin de toujours recharger la dernière version du Service Worker.
:::

Au clic sur le lien d'activation des notifications, une demande de permission devrait s'afficher. Après avoir accepté, vous devriez observer dans la console le log `Registered background sync`. Il ne vous reste plus qu'à attendre que le système déclenche une synchronisation et affiche la notification, ce qui devrait prendre quelques secondes, 1 minute tout au plus. Si l'application web est au premier plan, la liste des participants devrait également être actualisée grâce à la fonction `refresh` dans `syncAttendees`.

Vous pouvez cliquer à nouveau sur le lien de notification pour demander une nouvelle requête de synchronisation.

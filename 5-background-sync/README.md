---
title: 5. Background sync et notifications
lang: fr
---

# Etape 5 : Background sync et notifications

Pour conclure ce workshop, nous allons mettre à profit le Service Worker pour mettre à jour la liste des participants en tâche de fond et notifier l'utilisateur lorsqu'il y a des nouveaux participants.

L'API Push permet aux applications web de recevoir des notifications push poussées depuis un serveur, même lorsque l'application web n'est pas au premier plan et même lorsqu'elle n'est actuellement pas chargée sur l'agent utilisateur. Néanmoins, cela implique l’utilisation côté serveur d’un service de push tel que Google Cloud Messenger. Dans le cadre de ce workshop, nous n'allons pas utiliser l'API Push mais l'API Notification. Cette API permet également d'envoyer des notifications sans nécessiter de partie serveur, mais requiert que le navigateur soit ouvert.

Ces notifications sont multi-plateformes, elles s’adapteront donc à la plate-forme cible: notifications Android ou centre de notifications de Windows 10 par exemple.

L'API Background Sync quant à elle ne fait pas encore partie de la spécification standard des Service Workers. Une [spécification](https://wicg.github.io/BackgroundSync/spec/) est néanmoins à l'étude et est déjà implémentée par Google sur Chrome et Android depuis 2016. Cette API distingue deux types de synchronisation: One-Time et Périodique.

## Notifications et permissions

La synchronisation en tâche de fond ne nécessite pas de permissions particulières, en revanche afficher des notifications requiert le consentement de l'utilisateur. Pour éviter le spam, les navigateurs ont ajouté des contraintes à respecter pour pouvoir demander ces permissions. On peut par exemple le faire suite à une action de l'utilisateur comme le clic sur un lien.

Ajoutez donc un lien dans l'interface pour activer les notifications:

```html
<a onclick="registerNotification()">Notify me when there are new attendees</a>
```

Puis déclarez la fonction suivante dans `scripts.js`

```js
function registerNotification() {
	Notification.requestPermission(permission => {
		if (permission === 'granted') registerBackgroundSync()
		else console.error("Permission was not granted.")
	});
}
```

Lorsque l'utilisateur aura donné sa permission d'afficher des notifications, nous appellerons la fonction `registerBackgroundSync` pour mettre en place la synchronisation en arrière-plan.

## Synchronisation en tâche de fond

Le client doit explicitement s'inscrire aux tâches de synchronisation en tâche de fond. Pour ce faire, on commence par récupérer une référence à la `ServiceWorkerRegistration`, qui représente le lien d'enregistrement entre votre Service Worker et votre client. Le plus simple pour cela est d'utiliser [`navigator.serviceWorker.ready`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/ready) qui retourne une `Promise` résolue avec la `ServiceWorkerRegistration` lorsque le Service Worker est installé et actif.

Une fois l'objet `registration` de type `ServiceWorkerRegistration` récupéré, nous pouvons appeler la méthode `registration.periodicSync.register` pour s'inscrire à une tâche de synchronisation périodique en arrière-plan.

```js
function registerBackgroundSync() {
    if (!navigator.serviceWorker){
        return console.error("Service Worker not supported")
    }

    navigator.serviceWorker.ready
        .then(registration => registration.periodicSync.register({
            tag: 'syncAttendees',
            minPeriod: 60 * 1000, // 1 minute
            powerState: 'auto',
            networkState: 'any'
        }))
        .then(() => console.log("Registered background sync"))
        .catch(err => console.error("Error registering background sync", err))
}
```

Voici une description des différents paramètres :

Paramètre         | Description
------------------|--------------
tag              | Identifiant de la tâche de synchronisation |
minPeriod        | Période minimum en millisecondes entre deux synchronisations. Si à zéro, géré par le système
powerState       | "auto" (par défaut) ou "avoid draining". Permet de reporter les synchronisations si la batterie de l''appareil se décharge
networkState     | "online" (par défaut) ou "avoid-cellular" ou "any". Permet de reporter les synchronisations si l'appareil est en connexion cellulaire.
-----------------------------------------

Notez que ces paramètres ne seront pas forcément respectés, car peuvent être surchargés par une configuration propre à l'appareil, au système ou aux préférences de l'utilisateur.

Côté Service Worker, un évènement de type `periodicsync` sera émis lorsque le système décide de déclencher une synchronisation. Notez que pour les synchronisations périodiques, puisqu'elles sont gérées par le système, nous ne pouvons pas être sûrs du moment où elles sont déclenchées. Tout ce que nous pouvons faire est de renseigner les paramètres évoqués ci-dessus et attendre que le système déclenche une synchronisation.

```js
self.addEventListener('periodicsync', function(event) {
    if (event.registration.tag === 'syncAttendees') {
        event.waitUntil(syncAttendees()); // lance la requête d'actualisation
    }
});
```

## Actualisation et notification

La requête d'actualisation sera similaire à celle de l'étape 4, à la différence qu'elle est faite à la demande du système et non du client. Pour la démonstration, nous tirons un nombre aléatoire de nouveaux participants à chaque synchronisation.

```js
let nbAttendees = 10;

function syncAttendees(){
	let nbNew = Math.ceil(Math.random() * 3);
	nbAttendees += nbNew;
    
	return fetch(`https://reqres.in/api/users?per_page=${nbAttendees}`)
    	.then(refresh)
    	.then(() => self.registration.showNotification(
    		`${nbNew} new attendees to the PWA Workshop`
    	))
}
```

Si le client dispose de la permission d'afficher des notifications, la méthode `self.registration.showNotification` devrait afficher une notification avec le texte désiré sur le client enregistré.

## Test de bon fonctionnement

Comme pour les étapes précédentes, assurez-vous que la case *Update on reload* est cochée dans les Developer Tools afin de toujours recharger la dernière version du Service Worker. De la même façon, vérifiez également que `scripts.js` n'est pas servi en precaching suite à l'étape 3.

Au clic sur le lien d'activation des notifications, une demande de permission devrait s'afficher. Après avoir accepté, vous devriez observer dans la console le log `Registered background sync`. Il ne vous reste plus qu'à attendre que le système déclenche une synchronisation et affiche la notification, ce qui devrait prendre 30 secondes maximum d'après le paramétrage Si l'application web est au premier plan, la liste des participants devrait également être actualisée grâce à la fonction `refresh` dans `syncAttendees`.
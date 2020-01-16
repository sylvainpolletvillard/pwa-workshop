---
title: 6. Background sync and notifications
lang: en
---

# Step 6 : Background sync and notifications

In this step, we will use the Service Worker and a new API, **Background Sync**, to update the list of attendees in the background and notify the user when there are new attendees.

::: danger Non-standard
The Background Sync API is not yet standardized. The [specification](https://wicg.github.io/BackgroundSync/spec/) is still under study. It has already been implemented on Chrome and Android since 2016, and is under development on Edge and Firefox. This API distinguishes two types of synchronization: * One-Time * and * Periodic *. Currently, only **One-Time** synchronization is implemented in Chrome, and there may be some implementation bugs.
:::

Regarding notifications, the Push API allows web applications to receive push notifications pushed from a server, even when the web application is not in the foreground and even when it is not currently loaded on the user system. Nevertheless, this implies the use of a server-side push service such as Google Cloud Messenger.
 
During this workshop, we will not use the Push API but the **Notification API**. This API also allows you to send notifications without requiring a server part, but requires the browser to be open. These notifications are multi-platform, so they will adapt to the target platform: Android notifications or the notification center of Windows 10 for example.


## Notifications and permissions

Synchronization in the background does not require special permissions, but posting notifications requires the user's consent. To avoid spam, browsers have added constraints to be able to request these permissions. For example, we can do this after a specific user action such as clicking on a link.

So add this link below somewhere in the `index.html` page to enable notifications:

```html
<a onclick="registerNotification()">Notify me when there are new attendees</a>
```

Then declare the following function in `scripts.js`

```js
function registerNotification() {
	Notification.requestPermission(permission => {
		if (permission === 'granted'){ registerBackgroundSync() }
		else console.error("Permission was not granted.")
	})
}
```

When the user has given permission to display notifications, we will call the `registerBackgroundSync` function to set up background synchronization.

## Background Synchronization

The client must explicitly register for synchronization tasks in the background. To do this, we first retrieve a reference to the `ServiceWorkerRegistration`, which represents the registration link between your Service Worker and your client. The simplest way to do this is to use [`navigator.serviceWorker.ready`] (https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/ready) which returns a` Promise` resolved with the `ServiceWorkerRegistration` when the Service Worker is installed and running.

Once the `registration` object of type `ServiceWorkerRegistration` is retrieved, we can call the `registration.sync.register` method to register for a One-Time synchronization task in the background.

```js
function registerBackgroundSync() {
    if (!navigator.serviceWorker){
        return console.error("Service Worker not supported")
    }

    navigator.serviceWorker.ready
    .then(registration => registration.sync.register('syncAttendees'))
    .then(() => console.log("Registered background sync"))
    .catch(err => console.error("Error registering background sync", err))
}
```

On the Service Worker side, a `sync` event will be emitted when the system decides to trigger a synchronization. This decision is based on various parameters: connectivity, battery status, power source, etc. ; so we can not be sure when synchronization will be triggered. The specification is planning for future parameterization options, but for now, all we can do is wait. However, under the conditions of this workshop, this should only take a few seconds.

```js
self.addEventListener('sync', function(event) {
	console.log("sync event", event);
    if (event.tag === 'syncAttendees') {
        event.waitUntil(syncAttendees()); // sending sync request
    }
});
```

## Update and notification

The synchronization request is similar to the `update` and` refresh` at step 4, except that it is requested by the system and not the client:

```js
function syncAttendees(){
	return update({ url: `https://reqres.in/api/users` })
    	.then(refresh)
    	.then((attendees) => self.registration.showNotification(
    		`${attendees.length} attendees to the PWA Workshop`
    	))
}
```

If the client has permission to view notifications, the `self.registration.showNotification` method should display a notification with the desired text on the registered client.

## Testing

::: warning Warning
As with the previous steps, make sure that the **Update on reload** box is checked in the Developer Tools to always reload the latest version of the Service Worker.
:::

When clicking on the notifications activation link, a request for permission should be displayed. After accepting, you should observe `Registered background sync` in the console. All you have to do is wait until the system triggers a synchronization and displays the notification, which should take a few seconds, 1 minute at most. If the web application is in the foreground, the list of participants should also be updated with the `refresh` function in` syncAttendees`.

You can click the notification link again to request a new sync.
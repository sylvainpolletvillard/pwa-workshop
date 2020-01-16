---
title: Introduction
lang: fr
prev: false
next: ./1-manifest/
---

# Workshop: Transformer une web app en PWA

![Logo](../logo-192.png)

<SuggestLocale></SuggestLocale>

Le terme Progressive Web App (PWA) n'a sans doute pas échappé à toute personne qui suit l'actualité web. À quoi correspond ce terme et qu'apporte t-il à une application web ? Ce workshop vous permettra de mieux comprendre les PWA avec un peu de pratique 💪.

Nous allons ensemble transformer une application web classique en une PWA. Cela permettra à l'utilisateur de disposer d'un mode offline basique pour consulter l'application et de pouvoir l'ajouter en raccourci sur l'écran d'accueil de son smartphone.

## Pré-requis

- Connaître les bases du HTML, CSS et JavaScript.
- Un poste de travail muni d'un **éditeur de code** tel que [Visual Studio Code](https://code.visualstudio.com/)
- **Google Chrome** (_les PWA sont supportées par la plupart des navigateurs mais pour faciliter l'organisation, nous utiliserons tous le même navigateur pendant le développement_)
- Un **serveur web local** supportant HTTPS (si vous n'en avez pas, essayez [npmjs.com/http-server](http://npmjs.com/http-server) et la commande `cd app && http-server`

## Préparation

- [Clôner ou télécharger la web app d'exemple](https://github.com/sylvainpolletvillard/pwa-workshop.git) qui se trouve dans le dossier [app](https://github.com/sylvainpolletvillard/pwa-workshop/tree/master/app) de ce repo.
- Ouvrir le dossier `app` dans votre éditeur de code.
- Configurer votre serveur local pour servir le dossier `app` en HTTPS (voir instructions ci-dessous).
- Charger la page `app/index.html` sur Google Chrome. Une liste de participants devrait s'afficher.

## Développement local avec SSL

Les PWA nécessitent l'utilisation de HTTPS. Ce n’est pas problématique pour une PWA déployée car la plupart des hébergeurs supportent nativement HTTPS. Cependant, ce n'est pas aussi simple pour le développement local.
En effet, il faut pour cela générer et installer manuellement des certificats dans le magasin de certificats.
Heureusement, il existe un outil CLI intéressant appelé [mkcert](https://mkcert.dev/) qui simplifie ces étapes.

Configurons notre serveur HTTPS local en procédant comme suit:

- Installer [mkcert](https://github.com/FiloSottile/mkcert#installation) en suivant les instruction indiquées dans le GitHub
- Lancer `mkcert -install` Pour installer une CA (Autorité de certification)

```console
Created a new local CA at "/Users/****/Library/Application Support/mkcert" 💥
The local CA is now installed in the system trust store! ⚡️
The local CA is now installed in the Firefox trust store (requires browser restart)! 🦊
```

- cd jusqu'à la racine du site
- Lancer cette commande qui génère les certificats pour notre serveur de dev: `mkcert localhost 127.0.0.1 ::1`

```console
Using the local CA at "/Users/****yassinebenabbas****/Library/Application Support/mkcert" ✨

Created a new certificate valid for the following names 📜
 - "localhost"
 - "127.0.0.1"
 - "::1"

The certificate is at "./localhost+2.pem" and the key at "./localhost+2-key.pem" ✅
```

- Nous aurons deux fichiers PEM. Ceux-ci seront utilisés par notre serveur de développement compatible SSL.

![certs](../assets/certs.png)

- Installer le package `http-server` si ce n'est pas déjà fait avec la commande: `npm i -g http-server`
- Lancer le serveur en mode SSL: `http-server -S -o -C "localhost+2.pem" -K "localhost+2-key.pem"`

Et voilà, on est bien en HTTPs en local. C'est le top !

![certs](../assets/certok.png)

Dans cette partie, nous avons vu comment installer un Service Worker.
On a également géré deux évènements du cycle de vie du Service Worker: **install** et **activate**. Nous allons maintenant voir comment faire quelque-chose d'utile avec ce Service Worker.

## Etapes du workshop

1. Ajout d'un manifeste d'application web
2. Installation et activation d'un Service Worker
3. Precaching des assets statiques pour un mode offline basique
4. Stratégie de Cache/Update/Refresh pour les requêtes GET de l'API
5. Background sync et exemple de notification push
6. Présentation de l'invite d'installation

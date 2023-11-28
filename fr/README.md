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
- Un **serveur web local** supportant HTTPS (nous recommandons [Vite](http://npmjs.com/vite), un serveur basé sur [Node.js](https://nodejs.org/) ; une préconfiguration vous est fournie avec le projet, qui génère automatiquement un certificat SSL au démarrage avec [mkcert](https://mkcert.dev/))

## Préparation

- [Clôner ou télécharger la web app d'exemple](https://github.com/sylvainpolletvillard/pwa-workshop.git) qui se trouve dans le dossier [app](https://github.com/sylvainpolletvillard/pwa-workshop/tree/master/app) de ce repo.
- Ouvrir le dossier `app` dans votre éditeur de code.
- Configurer votre serveur local pour servir le dossier `app` en HTTPS (voir instructions ci-dessous).
- Charger la page `app/index.html` sur Google Chrome. Une liste de participants devrait s'afficher.

## Développement local avec SSL

Les PWA nécessitent l’utilisation de HTTPS. Ce n'est pas un gros problème pour une PWA déployée, car la plupart des hébergeurs Web fournissent HTTPS dès le départ. Ce n’est cependant pas le cas pour le développement local. En fait, cela nécessite de générer et d’installer manuellement des certificats dans le magasin de certificats de votre système. Heureusement, il existe un outil CLI appelé [mkcert](https://mkcert.dev/) qui simplifie ces étapes.

Nous proposons pour ce workshop un serveur web configuré automatiquement avec [Vite](http://npmjs.com/vite) qui utilise [mkcert](https://mkcert.dev/) pour générer un certificat SSL local. Si vous souhaitez l'utiliser, vous devrez avoir [Node.js](https://nodejs.org/) installé sur votre ordinateur. Après cela, lancez le serveur avec : `cd app && npm i && npm run dev`. Lors de la première exécution, il vous demandera d'installer le certificat dans votre magasin de certificats. Acceptez-le et vous êtes prêt à démarrer.

Bien entendu, vous pouvez utiliser n’importe quel autre serveur Web prenant en charge HTTPS. Dans ce cas, vous devrez générer un certificat avec [mkcert](https://mkcert.dev/) et configurer votre serveur pour l'utiliser.
## Etapes du workshop

1. Ajout d'un manifeste d'application web
2. Installation et activation d'un Service Worker
3. Precaching des assets statiques pour un mode offline basique
4. Stratégie de Cache/Update/Refresh pour les requêtes GET de l'API
5. Background sync et exemple de notification push
6. Présentation de l'invite d'installation

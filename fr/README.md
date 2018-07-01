---
title: Introduction
lang: fr
prev: false
next: ./1-manifest/
---

<SuggestLocale></SuggestLocale>

# Introduction

Le terme Progressive Web App (PWA) n'a sans doute pas échappé à toute personne qui suit l'actualité web. À quoi correspond ce terme et qu'apporte t-il à une application web ? Ce workshop vous permettra de mieux comprendre les PWA avec un peu de pratique 💪.

Nous allons ensemble transformer une application web classique en une PWA. Cela permettra à l'utilisateur de disposer d'un mode offline basique pour consulter l'application et de pouvoir l'ajouter en raccourci sur l'écran d'accueil de son smartphone.

# Prérequis

- Connaître les bases du HTML, CSS et JavaScript.
- Un poste de travail muni d'un **éditeur de code** tel que [Visual Studio Code](https://code.visualstudio.com/)
- **Google Chrome** (*les PWA sont supportées par la plupart des navigateurs mais pour faciliter l'organisation, nous utiliserons tous le même navigateur pendant le développement*)
- Un **serveur web local** (si vous n'en avez pas, essayez [npmjs.com/serve](http://npmjs.com/serve) et la commande `cd app && serve`

# Préparation
- [Clôner ou télécharger la web app d'exemple](https://github.com/sylvainpolletvillard/pwa-workshop.git) qui se trouve dans le dossier [app](https://github.com/sylvainpolletvillard/pwa-workshop/tree/master/app) de ce repo.
- Ouvrir le dossier `app` dans votre éditeur de code.
- Configurer votre serveur local pour servir le dossier `app`.
- Charger la page `app/index.html` sur Google Chrome. Une liste de participants devrait s'afficher.


# Etapes du workshop

1. Ajout d'un manifeste d'application web
2. Installation et activation d'un Service Worker
3. Precaching des assets statiques pour un mode offline basique
4. Stratégie de Cache/Update/Refresh pour les requêtes GET de l'API
5. Background sync et exemple de notification push




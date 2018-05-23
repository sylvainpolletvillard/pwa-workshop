---
title: 1. Ajout d'un Web App Manifest
lang: fr
---

# Etape 1 : Ajout d'un Web App Manifest

Commençons par créer le fichier manifest. Ce fichier est défini ainsi par [MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest):

> The web app manifest provides information about an application (such as name, author, icon, and description) in a JSON text file.

En français; le manifeste d'application web fournit des informations sur l'application (comme son nom, son icône et sa description) dans un fichier JSON.

La présence d'un manifeste procure également d'autres avantages. En voici quelques uns:

* Il permet à certains navigateurs d'ajouter au bureau un raccourci vers la PWA
* Il permet à la PWA d'être référencée par certains moteurs de recherche et reconnue par le store [Windows](https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps).
* Il permet d'afficher un écran initial (splashscreen) lors de l'ouverture de la PWA

Le fichier JSON constitiaunt le manifest contient plusieurs champs. Il est recommandé de renseigner un maximum de champs afin de permettre à la PWA d'être reconnue pas les navigateurs et les stores. Voici la liste des attributs du manifeste [source](https://medium.com/@subodhgarg/web-app-manifest-file-make-your-web-app-installable-b5fcdb2919b9), [source](https://developer.mozilla.org/fr/docs/Web/Manifest):

* name — affiché sur le splashscreen
* short_name — affiché en dessous du raccourci sur le bureau ou l'écran d'accueil
* description — une description générale de l'application. On renseigne notamment les fonctions de la PWA.
* start_url — L'URL qui est chargée en premier quand on ouvre l'application depuis son raccourci sur le bureau ou l'écran d'accueil
* scope — les pages du site qu'on font partie de l'expérience PWA. "." inclue tout ce qui se situe dans l'arborescence de manifeste. Donc, il est plus pertinent de placer ce dernier à la racine du site
* background_color — L'arrière-plan du splashscreen
* theme_color — la couleur de la status bar dans le cas où elle est affichée
* display — spécifie le mode d'affichage. Voici les différents modes disponibles triés par ordre de fallback. La valeur par défaut étant ‘browser’.
  * fullscreen: Toute la zone d'affichage disponible est utilisée et aucun agent utilisateur chrome n'est montré.
  * ‘standalone’, Comportement similaire a une application native. Cela peut inclure que l'application ait une fenêtre différente, sa propre icône dans le lanceur d'applications, etc. Dans ce mode, l'agent utilisateur va exclure les élements d'interface qui permettent de contrôler la navigation mais peut inclure d'autres éléments comme une barre de statut.
  * ‘minimal-ui’, L'application va ressembler et se comporter comme une application autonome, mais elle aura quelques élements d'interface permettant de contrôler la navigation. Les éléments varient en fonction du navigateur web.
  * ‘browser’. L'application s'ouvre dans un nouvel onglet ou une nouvelle fenêtre du navigateur, en fonction du navigateur et de la plateforme
* orientation — pour forcer une ou orientation particulière
  * ‘portrait-primary’: uniquement en portrait.
  * Autres options : landscape, any, portrait, etc.
* dir — la direction du texte. ‘ltr’(default) means left to right.
* lang — la langue principale de l'application. la valeur par défaut est ‘en-US’.
* related_applications — Lien vers l'application Android native. A ignorer s'il n'y a pas d'application native.
* icons — tableau listant les différentes résolutions de l'icone de l'application utilisée notamment pour le raccourci et le splashscreen. Les tailles recommandées sont : 48, 96, 144, 192, 256, 384, 512. L'appareil choisira la meilleure icone automatiquement.

Comme le manifeste d'application web est un fichier texte, il est possible de l'écrire à la main à l'aide d'un VIM ou d'un bloc notes. On peut également utiliser un outil qui simplifie sa création. Plusieurs outils sont disponibles sur internet:

* [https://app-manifest.firebaseapp.com/](https://app-manifest.firebaseapp.com/)
* [Web App Manifest Generator](https://tomitm.github.io/appmanifest/).

En utilisant l'outil, générons un fichier manifeste exhaustif.

```json
{
  "name": "PWA from scratch",
  "short_name": "PWA from 0",
  "lang": "fr",
  "start_url": "/",
  "display": "fullscreen",
  "theme_color": "#c2f442",
  "icons": [
    {
      "src": "pwa0-64.png",
      "sizes": "64x64"
    },
    {
      "src": "pwa0-128.png",
      "sizes": "128x128"
    },
    {
      "src": "pwa0-512.png",
      "sizes": "512x512"
    }
  ]
}
```

On peut ensuite enregistrer le manifest dans un fichier texte appelé `manifest.json`. Ensuite, déplaçons ec fichier ainsi que les icones à la racine du site.

Voici un lien mettant à disposition des icones gratuitement [FLATICON](https://www.flaticon.com/).

La dernière étape consiste à rensigner le manifeste dans le fichier html. Ceci est possible grâce à cette balise `link` à mettre dans le `head` : `<link rel="manifest" href="manifest.json">`.

```html
<link rel="manifest" href="manifest.json">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="application-name" content="PWA from scratch">
<meta name="apple-mobile-web-app-title" content="PWA from scratch">
<meta name="msapplication-starturl" content="/index.html">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
```

On peut tester en ouvrant l'application depuis un mobile. Une fois l'app ouverte, ouvrir le menu et choisir l'option: **Add to home screen**

![Add to home screen](./readme_assets/pwa_install_menu.jpg 'dd to home screen')

Poursuivre l'installation. Un nouveau raccourci devrait apparaitre dans l'écran d'accueil du smartphone. C'est n'est autre que le raccourci de notre PWA !

![PWA bookmark](./readme_assets/pwa_bookmark.jpg 'PWA bookmark')

Une fois la PWA installé, on peut remarquer que le raccourci a été ajouté. Quand on clique sur le raccourci, un splash screen est affiché brièvement Celui-ci reprend les couleurs et l'icône spécifiée dans le manifeste.

![Splash-screen](./readme_assets/pwa_splashscreen.jpg 'Splash-screen')

Lancer et manipuler la PWA. On remarque que la barre d'adresse n'est pas présente.

![PWA run from bookmark](./readme_assets/pwa_chrome_fullscreen.jpg 'PWA run from bookmark')

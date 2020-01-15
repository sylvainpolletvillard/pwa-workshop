---
title: 1. Ajout d'un Web App Manifest
lang: fr
---

# Etape 1 : Ajout d'un Web App Manifest

Commençons par créer le fichier manifest. Ce fichier est défini ainsi par [MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest):

> The web app manifest provides information about an application (such as name, author, icon, and description) in a JSON text file.

En français: le manifeste d'application web fournit des informations sur l'application (comme son nom, son icône et sa description) dans un fichier texte JSON.

La présence d'un manifeste procure également d'autres avantages. En voici quelques uns:

- Il permet à certains navigateurs d'ajouter au bureau ou à l'écran d'accueil un raccourci vers la PWA
- Il permet à la PWA d'être référencée sur certains apps stores tels que le [Windows Store](https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps).
- Il permet d'afficher la PWA en plein écran, sans UI navigateur, avec un écran de lancement initial (splashscreen) lors de l'ouverture de la PWA

## Propriétés du manifeste

Le manifeste est un fichier JSON contient plusieurs champs. Il est recommandé de renseigner un maximum de champs afin de permettre à la PWA d'être reconnue comme telle par les navigateurs et les stores. [La liste des attributs du manifeste est disponible dans la documentation de Mozilla](https://developer.mozilla.org/fr/docs/Web/Manifest). Vous trouverez ci-dessous une partie des attributs:

- `name`:  affiché sur le splash-screen
- `short_name`:  affiché en dessous du raccourci sur le bureau ou l'écran d'accueil
- `description`:  une description générale de l'application
- `start_url`: l'URL qui est chargée en premier quand on ouvre l'application depuis son raccourci sur le bureau ou l'écran d'accueil
- `background_color`:   La couleur d'arrière-plan du splash-screen
- `theme_color`:  la couleur de thème général de l'application, utilisée notamment dans les barres de statut si elles sont affichées
- `display`:   spécifie le mode d'affichage. Voici les différents modes disponibles triés par ordre de fallback :
  - `fullscreen`: toute la zone d'affichage disponible est utilisée et aucun agent utilisateur n'est montré.
  - `standalone`: comportement similaire a une application native. Cela peut signifier que l'application a sa propre fenêtre, sa propre icône dans le lanceur d'applications, etc. Dans ce mode, l'agent utilisateur va exclure les éléments d'interface qui permettent de contrôler la navigation mais peut inclure d'autres éléments comme une barre de statut par exemple.
  - `minimal-ui`: l'application va ressembler et se comporter comme une application autonome, mais elle aura quelques élements d'interface permettant de contrôler la navigation. Les éléments varient en fonction du navigateur et du système.
  - `browser` (par défaut): l'application s'ouvre dans un nouvel onglet ou une nouvelle fenêtre du navigateur, en fonction du navigateur et de la plateforme
- `icons`:  liste d'icônes de l'application de différentes résolutions, utilisées notamment pour le raccourci et le splashscreen. Les tailles à fournir recommandées sont a minima 192x192px et 512x512px. L'appareil choisira la meilleure icône automatiquement selon les cas. Il est également intéressant de fournir en fallback une version vectorielle SVG de l'icône qui s'adaptera à un maximum de tailles.

## Utilisation d'un générateur de manifeste

Comme le manifeste d'application est un fichier texte, on peut opter pour l'écrire à la main ou alors utiliser un outil qui simplifie sa création. Plusieurs outils sont disponibles sur internet:

- [https://app-manifest.firebaseapp.com/](https://app-manifest.firebaseapp.com/): Recommandé car il permet de générer les icones à partir d'un PNG de 512x512 (_attention à bien passer un png_)
- [Web App Manifest Generator](https://tomitm.github.io/appmanifest/)

En utilisant un de ces outils, générez un fichier manifeste exhaustif. Votre manifeste devra au moins contenir les propriétés suivantes: `name`, `short_name`, `lang`, `start_url`, `display: "standalone"`, `theme_color` et `icons` avec au moins deux icônes PNG de tailles 192x192 et 512x512 et une au format vectoriel SVG.

Voici quelques outils en ligne qui permettent de créer une icône:

- [Method Draw](https://editor.method.ac/)
- [SVG Editor: Vector Paint](http://vectorpaint.yaks.co.nz/)
- [Googel drawings](https://docs.google.com/drawings/)

::: tip

Pour vous faire gagner du temps, des icônes au format demandé sont déjà disponibles dans le dossier `icons`

:::

On peut ensuite enregistrer le manifeste dans un fichier texte appelé `manifest.webmanifest` (ou `manifest.json`) à la racine du site.

<Solution>
```json
{
  "name": "Progressive Web Apps Workshop",
  "short_name": "PWA Workshop",
  "lang": "fr",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "pink",
  "icons": [
    {
      "src": "icons/logo-192.png",
      "sizes": "192x192"
    },
    {
      "src": "icons/logo-512.png",
      "sizes": "512x512"
    },
    {
      "src": "icons/logo.svg",
      "sizes": "513x513"
    }
  ]
}
```
</Solution>

Si vous souhaitez générer le manifeste d'une site déjà déployé, vous pouvez utiliser [pwabuilder](https://www.pwabuilder.com/) en lui fournissant l'URL de vote site.

## Ajout du manifeste dans l'application

La dernière étape consiste à référencer le manifeste dans la page HTML de notre application, grâce à cette balise `link` à mettre dans le `head` : `<link rel="manifest" href="manifest.json">`.

Notez que d'autres métadonnées sont également exploitées par certains navigateurs et peuvent s'avérer utiles. Il est probable qu'à l'avenir, ces métadonnées tendent à disparaître au profit de nouvelles propriétés dans le manifeste d'application. En voici un exemple :

```html
<link rel="manifest" href="manifest.webmanifest" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="application-name" content="PWA Workshop" />
<meta name="apple-mobile-web-app-title" content="PWA Workshop" />
<meta name="msapplication-starturl" content="/index.html" />
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, shrink-to-fit=no"
/>
```

## Test de bon fonctionnement

Vous pouvez vérifier la prise en compte du manifeste en regardant dans l'onglet _Applications_ des Developer Tools de Chrome. La liste des propriétés du manifeste devrait être affichée.

![Manifest dev tools](../../1-manifest/readme_assets/manifest_dev_tools.png)

## Bibliothèque de compatibilité PWA

Certains navigateurs anciens ne supportent pas encore certaines fonctionnalités du manifeste d'application. Par exemple, Safari 12 mobile ne prend pas en charge l'écran d’accueil (ou splash-screen). La bibliothèque [pwacompat](https://github.com/GoogleChromeLabs/pwacompat) de Google Chrome Labs permet de résoudre en partie ce problème. Nous vous recommandons vivement d’ajouter ce script à vos PWA pour une meilleure compatibilité.

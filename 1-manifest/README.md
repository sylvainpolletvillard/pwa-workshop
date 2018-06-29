---
title: 1. Adding a Web App Manifest
lang: en
---

# Step 1: Adding a Web App Manifest

Let's start by creating the manifest file. This file is defined by [MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest) as follows:

The web app manifest provides information about an application (such as its name, author, icon, and description) in a JSON text file.

The presence of a manifest also provides other benefits. Here are a few:

- It allows some browsers to add a bookmark or shortcut for the PWA on the home screen
- It allows the PWA to be referenced on some apps stores such as the [Windows Store](https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps).
- It allows to display the PWA in full screen or as standalone window, without browser chrome.

## Manifest Properties

The manifest is a JSON file that contains several fields. It is recommended to fill in as much of them as possible to imporove the support and the discovery of the PWA. Here are [the available attributes to date](https://developer.mozilla.org/en/docs/Web/Manifest):

- `name` - displayed on the splash-screen below the app icon
- `short_name` - displayed below the shortcut on the desktop or the home screen
- `description` - a general description of the application
- `start_url` - the URL that is loaded first when you open the application from its shortcut on the desktop or home screen
- `scope` - the pages of the site that are part of the PWA experience. The ``. "` Value includes everything in the manifest tree. It is therefore more relevant to place the latter at the root of the site
- `background_color` - The background color of the splash-screen
- `theme_color` - the general theme color of the application, used in particular in the status bars if they are displayed
- `display` - specifies the display mode. Here are the different modes available sorted by order of fallback:
  - `fullscreen`: the entire available display area is used and no browser chrome is shown.
  - `standalone`: similar behavior to a native application. This means that the application will have its own window, its own icon in the launcher, and so on. In this mode, the browser will exclude interface elements that control the navigation but may include other elements such as a status bar.
  - `minimal-ui`: the application will look and behave like a stand-alone application, but it will have some interface elements to control the navigation. Items vary by browser and system.
  - `browser` (default): the application opens in a new tab or browser window, depending on the browser and the platform
- `guidance` - to force or encourage a particular orientation for mobile devices:`any`, `natural`,`landscape`, `portrait` ...
- `dir` - the reading direction of the text:`ltr`, `rtl` or`auto`.
- `lang` - the main language of the application.
- `related_applications` - indicates links to native applications that can be installed on the underlying platform, and may be an alternative or supplement to the PWA; for example a native version of the web application. Ignore if there is no native application.
- `icons` - list of application icons of different resolutions, used especially for shortcut and splashscreen. The recommended sizes to be supplied are at least 192x192px and 512x512px. The device will choose the best icon automatically depending on the case. It is also interesting to provide in fallback an SVG vector version of the icon that will fit a maximum of sizes.

## Using a manifest generator

Since the application manifest is a text file, you can choose to write it by hand or use a tool that simplifies its creation. Several tools are available on the internet:

- [https://app-manifest.firebaseapp.com/](https://app-manifest.firebaseapp.com/)
- [Web App Manifest Generator](https://tomitm.github.io/appmanifest/).

Using one of these tools, generate a comprehensive manifest file. Your manifest should at least contain the following properties: `name`,`short_name`, `lang`,`start_url`, `display: 'standalone` `,` theme_color`and`icons` with at least two PNG icons and one SVG to the recommended sizes.

The manifest can then be saved in a text file called `manifest.json` at the root of the site.

<Solution>
`` `Json
{
  "name": "Progressive Web Apps Workshop",
  "short_name": "PWA Workshop",
  "lang": "fr",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "# c6acee",
  "icons": [
    {
      "src": "icons / logo-192.png",
      "sizes": "192x192"
    }
    {
      "src": "icons / logo-512.png",
      "sizes": "512x512"
    }
    {
      "src": "icons / logo.svg",
      "sizes": "513x513"
    }
  ]
}
`` `
</ Solution>

## Adding the manifest in the application

The last step is to reference the manifest in the HTML page of our application, thanks to this `link` tag to put in the`head`: `<link rel =" manifest "href =" manifest.json ">`.

Note that other metadata are also exploited by some browsers and may be useful. It is likely that in the future these metadata will tend to disappear in favor of new properties in the application manifest. Here is an example:

`` Html

<link rel = "manifest" href = "manifest.json">
<meta name = "mobile-web-app-able" content = "yes">
<meta name = "apple-mobile-web-app-capable" content = "yes">
<meta name = "application-name" content = "PWA Workshop">
<meta name = "apple-mobile-web-app-title" content = "PWA Workshop">
<meta name = "msapplication-starturl" content = "/ index.html">
<meta name = "viewport" content = "width = device-width, initial-scale = 1, shrink-to-fit = no">
`` `

## Functionality test

You can check that the manifest is taken into account by looking in the _ Applications _ tab of Chrome's Developer Tools. The list of manifest properties should be displayed.

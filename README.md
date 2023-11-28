---
title: Introduction
lang: en
prev: false
next: ./1-manifest/
---

# Workshop: Turning a web app into a PWA

![Logo](./logo-192.png)

<SuggestLocale></SuggestLocale>

You may have heard about Progressive Web Apps (PWA) in the latest web trends. What is it all about and how do they improve classic web applications ? This workshop will let you understand PWA better with a bit of practice 💪.

We will transform together a classic web application into a PWA. This will enable the user to have a basic offline mode, and to install the app on his smartphone with a shortcut on the homescreen.

## Requirements

- Basic knowledge of HTML, CSS and JavaScript. Understanding Promises and asynchronicity in JS can be a plus.
- A computer with a **code editor** such as [Visual Studio Code](https://code.visualstudio.com/)
- **Google Chrome** (_PWA are supported on most browsers but to facilitate the organization of the workshop, we will all use the same browser during development_)
- A **local web server** with a SSL certificate (we recommend [Vite](http://npmjs.com/vite), a [Node.js](https://nodejs.org/) based server ; there is a pre-configured setup with automatically generated SSL certificate with [mkcert](https://mkcert.dev/))

## Preparation

- [Clone or download the example web app](https://github.com/sylvainpolletvillard/pwa-workshop.git) which is located in the [app folder](https://github.com/sylvainpolletvillard/pwa-workshop/tree/master/app) of this repo.
- Open the `app` folder in your code editor.
- Configure your local server to serve the `app` folder with HTTPS (see instructions below).
- Load the `app/index.html` page on Google Chrome. A list of attendees should be displayed.

## Local development with SSL

PWA require the use of HTTPS. This not a big matter for a deployed PWA because most web hosts provide HTTPS out of the box. However, it is not the case for local development. In fact, it requires manually generating and installing certificates to the certificate store. Fortunately, there is a cool CLI tool called [mkcert](https://mkcert.dev/) that simplifies these steps.

We propose for this workshop an automatically configured web server with [Vite](http://npmjs.com/vite) that uses [mkcert](https://mkcert.dev/) to generate a local SSL certificate. If you want to use it, you will need to have [Node.js](https://nodejs.org/) installed on your computer. After that, run the server with: `cd app && npm i && npm run dev`. On first run, it will ask you to install the certificate in your certificate store. Accept it and you are good to go.

Of course, you can use any other web server that supports HTTPS. In this case, you will need to generate a certificate with [mkcert](https://mkcert.dev/) and configure your server to use it.

## Steps of the workshop

1. Add a web application manifest
2. Install and activate a Service Worker
3. Pre-caching of static assets for a basic offline mode
4. Cache/Update/Refresh Strategy for the API GET requests
5. Background sync and examples of push notifications
6. Presenting an install button

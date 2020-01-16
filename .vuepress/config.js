module.exports = {
	base: '/',
	port: '7999',
	serviceWorker: true,
	head: [
		['link', {
			rel: 'manifest',
			href: 'manifest.json'
		}],
		['meta', {
			name: "mobile-web-app-capable",
			content: "yes"
		}],
		['meta', {
			name: "apple-mobile-web-app-capable",
			content: "yes"
		}],
		['meta', {
			name: "application-name",
			content: "PWA Workshop Docs"
		}],
		['meta', {
			name: "apple-mobile-web-app-title",
			content: "PWA Workshop Docs"
		}]
	],
	locales: {
		'/': {
			lang: 'en-US', // this will be set as the lang attribute on <html>
			title: 'PWA Workshop',
			description: 'Introduction to Progressive Web Applications'
		},
		'/fr/': {
			lang: 'fr-FR',
			title: 'PWA Workshop',
			description: "Introduction aux Progressive Web Applications",
		}
	},
	themeConfig: {
		locales: {
			'/': {
				// text for the language dropdown
				selectText: 'Language',
				// label for this locale in the language dropdown
				label: 'English',
				// text for the edit-on-github link
				editLinkText: 'Edit this page on GitHub',
				sidebar: [
					'/',
					'/1-manifest/',
					'/2-service-worker/',
					'/3-precaching/',
					'/4-api-cache/',
					'/5-pwa-install/',
					'/6-background-sync/',
					'/finish'
				]
			},
			'/fr/': {
				selectText: 'Langue',
				label: 'Français',
				editLinkText: 'Editer sur GitHub',
				sidebar: [
					'/fr/',
					'/fr/1-manifest/',
					'/fr/2-service-worker/',
					'/fr/3-precaching/',
					'/fr/4-api-cache/',
					'/fr/5-pwa-install/',
					'/fr/6-background-sync/',
					'/fr/finish'
				]
			}
		},
		nav: [{
			text: 'Cookbook',
			link: 'https://pwa-cookbook.js.org'
		},
		{
			text: 'Github',
			link: 'https://github.com/sylvainpolletvillard/pwa-workshop'
		}
		]
	}
}
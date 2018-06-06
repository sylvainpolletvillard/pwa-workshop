module.exports = {
	title: 'PWA Workshop',
	description: "Introduction aux Progressive Web Applications",
	base: '/',
	serviceWorker: true,
	head: [
		['link', { rel: 'manifest', href: 'manifest.json' }],
		['meta', { name: "mobile-web-app-capable", content: "yes" }],
		['meta', { name: "apple-mobile-web-app-capable", content: "yes" }],
		['meta', { name: "application-name", content: "PWA Workshop Docs" }],
		['meta', { name: "apple-mobile-web-app-title", content: "PWA Workshop Docs" }]
	],
	themeConfig: {
		sidebar: [
			'/',
			'/1-manifest/',
			'/2-service-worker/',
			'/3-precaching/',
			'/4-api-cache/',
			'/5-background-sync/',
			'/finish'
		]
	}
}
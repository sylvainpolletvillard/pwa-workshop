<template>
	<div class="tip custom-block" v-if="suggestedLocale !== currentLocale">
		<p><a :href="suggestedLocale.path">{{ message }}</a></p>
	</div>
</template>

<script>
	import VuepressConfig from "../config";

	const locales = Object.assign({}, ...Object.entries(VuepressConfig.locales).map(([path, locale]) => ({ [locale.lang]: { ...locale, path } })));
	const defaultLocale = locales[VuepressConfig.locales["/"].lang];

	export default {
		name: "SuggestLocale",

		data(){
			return {
				currentLocale: null,
				suggestedLocale: null
			}
		},

		beforeMount(){
			this.currentLocale = locales[this.$localeConfig.lang];
			this.suggestedLocale = locales[window.navigator.language]|| defaultLocale
		},

		computed: {
			message() {
				switch(this.suggestedLocale.lang) {
					case "fr-FR": return `Vous préférez peut-être lire ce guide en français ?`
					case "en-US": return `You might prefer to read this guide in english ?`
				}
			}
		}
	}
</script>
(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{312:function(e,t){e.exports={base:"/",port:"7999",serviceWorker:!0,head:[["link",{rel:"manifest",href:"manifest.json"}],["meta",{name:"mobile-web-app-capable",content:"yes"}],["meta",{name:"apple-mobile-web-app-capable",content:"yes"}],["meta",{name:"application-name",content:"PWA Workshop Docs"}],["meta",{name:"apple-mobile-web-app-title",content:"PWA Workshop Docs"}]],locales:{"/":{lang:"en-US",title:"PWA Workshop",description:"Introduction to Progressive Web Applications"},"/fr/":{lang:"fr-FR",title:"PWA Workshop",description:"Introduction aux Progressive Web Applications"}},themeConfig:{locales:{"/":{selectText:"Language",label:"English",editLinkText:"Edit this page on GitHub",sidebar:["/","/1-manifest/","/2-service-worker/","/3-precaching/","/4-api-cache/","/5-pwa-install/","/6-background-sync/","/finish"]},"/fr/":{selectText:"Langue",label:"Français",editLinkText:"Editer sur GitHub",sidebar:["/fr/","/fr/1-manifest/","/fr/2-service-worker/","/fr/3-precaching/","/fr/4-api-cache/","/fr/5-pwa-install/","/fr/6-background-sync/","/fr/finish"]}},nav:[{text:"Cookbook",link:"https://pwa-cookbook.js.org"},{text:"Github",link:"https://github.com/sylvainpolletvillard/pwa-workshop"}]}}},346:function(e,t,a){"use strict";a.r(t);var s=a(312),i=a.n(s);const n=Object.assign({},...Object.entries(i.a.locales).map(([e,t])=>({[t.lang]:{...t,path:e}}))),o=n[i.a.locales["/"].lang];var r={name:"SuggestLocale",data:()=>({currentLocale:null,suggestedLocale:null}),mounted(){this.currentLocale=n[this.$localeConfig.lang],this.suggestedLocale=n[window.navigator.language]||o},computed:{message(){switch(this.suggestedLocale.lang){case"fr-FR":return"Vous préférez peut-être lire ce guide en français ?";case"en-US":return"You might prefer to read this guide in english ?"}}}},l=a(14),c=Object(l.a)(r,(function(){var e=this._self._c;return this.suggestedLocale!==this.currentLocale?e("div",{staticClass:"tip custom-block"},[e("p",[e("a",{attrs:{href:this.suggestedLocale.path}},[this._v(this._s(this.message))])])]):this._e()}),[],!1,null,null,null);t.default=c.exports}}]);
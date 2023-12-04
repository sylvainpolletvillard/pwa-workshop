(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{371:function(t,e,s){"use strict";s.r(e);var a=s(14),n=Object(a.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"mime-types"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mime-types"}},[t._v("#")]),t._v(" mime-types")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://npmjs.org/package/mime-types",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://badgen.net/npm/v/mime-types",alt:"NPM Version"}}),e("OutboundLink")],1),t._v(" "),e("a",{attrs:{href:"https://npmjs.org/package/mime-types",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://badgen.net/npm/dm/mime-types",alt:"NPM Downloads"}}),e("OutboundLink")],1),t._v(" "),e("a",{attrs:{href:"https://nodejs.org/en/download",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://badgen.net/npm/node/mime-types",alt:"Node.js Version"}}),e("OutboundLink")],1),t._v(" "),e("a",{attrs:{href:"https://github.com/jshttp/mime-types/actions/workflows/ci.yml",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://badgen.net/github/checks/jshttp/mime-types/master?label=ci",alt:"Build Status"}}),e("OutboundLink")],1),t._v(" "),e("a",{attrs:{href:"https://coveralls.io/r/jshttp/mime-types?branch=master",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://badgen.net/coveralls/c/github/jshttp/mime-types/master",alt:"Test Coverage"}}),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("The ultimate javascript content-type utility.")]),t._v(" "),e("p",[t._v("Similar to "),e("a",{attrs:{href:"https://www.npmjs.com/package/mime",target:"_blank",rel:"noopener noreferrer"}},[t._v("the "),e("code",[t._v("mime@1.x")]),t._v(" module"),e("OutboundLink")],1),t._v(", except:")]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("No fallbacks.")]),t._v(" Instead of naively returning the first available type,\n"),e("code",[t._v("mime-types")]),t._v(" simply returns "),e("code",[t._v("false")]),t._v(", so do\n"),e("code",[t._v("var type = mime.lookup('unrecognized') || 'application/octet-stream'")]),t._v(".")]),t._v(" "),e("li",[t._v("No "),e("code",[t._v("new Mime()")]),t._v(" business, so you could do "),e("code",[t._v("var lookup = require('mime-types').lookup")]),t._v(".")]),t._v(" "),e("li",[t._v("No "),e("code",[t._v(".define()")]),t._v(" functionality")]),t._v(" "),e("li",[t._v("Bug fixes for "),e("code",[t._v(".lookup(path)")])])]),t._v(" "),e("p",[t._v("Otherwise, the API is compatible with "),e("code",[t._v("mime")]),t._v(" 1.x.")]),t._v(" "),e("h2",{attrs:{id:"install"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#install"}},[t._v("#")]),t._v(" Install")]),t._v(" "),e("p",[t._v("This is a "),e("a",{attrs:{href:"https://nodejs.org/en/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js"),e("OutboundLink")],1),t._v(" module available through the\n"),e("a",{attrs:{href:"https://www.npmjs.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("npm registry"),e("OutboundLink")],1),t._v(". Installation is done using the\n"),e("a",{attrs:{href:"https://docs.npmjs.com/getting-started/installing-npm-packages-locally",target:"_blank",rel:"noopener noreferrer"}},[e("code",[t._v("npm install")]),t._v(" command"),e("OutboundLink")],1),t._v(":")]),t._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[t._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" mime-types\n")])])]),e("h2",{attrs:{id:"adding-types"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#adding-types"}},[t._v("#")]),t._v(" Adding Types")]),t._v(" "),e("p",[t._v("All mime types are based on "),e("a",{attrs:{href:"https://www.npmjs.com/package/mime-db",target:"_blank",rel:"noopener noreferrer"}},[t._v("mime-db"),e("OutboundLink")],1),t._v(",\nso open a PR there if you'd like to add mime types.")]),t._v(" "),e("h2",{attrs:{id:"api"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[t._v("#")]),t._v(" API")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" mime "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mime-types'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("p",[t._v("All functions return "),e("code",[t._v("false")]),t._v(" if input is invalid or not found.")]),t._v(" "),e("h3",{attrs:{id:"mime-lookup-path"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mime-lookup-path"}},[t._v("#")]),t._v(" mime.lookup(path)")]),t._v(" "),e("p",[t._v("Lookup the content-type associated with a file.")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("mime"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("lookup")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'json'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'application/json'")]),t._v("\nmime"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("lookup")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'.md'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'text/markdown'")]),t._v("\nmime"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("lookup")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'file.html'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'text/html'")]),t._v("\nmime"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("lookup")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'folder/file.js'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'application/javascript'")]),t._v("\nmime"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("lookup")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'folder/.htaccess'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\n\nmime"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("lookup")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'cats'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\n")])])]),e("h3",{attrs:{id:"mime-contenttype-type"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mime-contenttype-type"}},[t._v("#")]),t._v(" mime.contentType(type)")]),t._v(" "),e("p",[t._v("Create a full content-type header given a content-type or extension.\nWhen given an extension, "),e("code",[t._v("mime.lookup")]),t._v(" is used to get the matching\ncontent-type, otherwise the given content-type is used. Then if the\ncontent-type does not already have a "),e("code",[t._v("charset")]),t._v(" parameter, "),e("code",[t._v("mime.charset")]),t._v("\nis used to get the default charset and add to the returned content-type.")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("mime"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("contentType")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'markdown'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'text/x-markdown; charset=utf-8'")]),t._v("\nmime"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("contentType")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'file.json'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'application/json; charset=utf-8'")]),t._v("\nmime"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("contentType")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'text/html'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'text/html; charset=utf-8'")]),t._v("\nmime"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("contentType")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'text/html; charset=iso-8859-1'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'text/html; charset=iso-8859-1'")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// from a full path")]),t._v("\nmime"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("contentType")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("path"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("extname")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/path/to/file.json'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'application/json; charset=utf-8'")]),t._v("\n")])])]),e("h3",{attrs:{id:"mime-extension-type"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mime-extension-type"}},[t._v("#")]),t._v(" mime.extension(type)")]),t._v(" "),e("p",[t._v("Get the default extension for a content-type.")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("mime"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("extension")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'application/octet-stream'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'bin'")]),t._v("\n")])])]),e("h3",{attrs:{id:"mime-charset-type"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mime-charset-type"}},[t._v("#")]),t._v(" mime.charset(type)")]),t._v(" "),e("p",[t._v("Lookup the implied default charset of a content-type.")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("mime"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("charset")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'text/markdown'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'UTF-8'")]),t._v("\n")])])]),e("h3",{attrs:{id:"var-type-mime-types-extension"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#var-type-mime-types-extension"}},[t._v("#")]),t._v(" var type = mime.types[extension]")]),t._v(" "),e("p",[t._v("A map of content-types by extension.")]),t._v(" "),e("h3",{attrs:{id:"extensions-mime-extensions-type"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#extensions-mime-extensions-type"}},[t._v("#")]),t._v(" [extensions...] = mime.extensions[type]")]),t._v(" "),e("p",[t._v("A map of extensions by content-type.")]),t._v(" "),e("h2",{attrs:{id:"license"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#license"}},[t._v("#")]),t._v(" License")]),t._v(" "),e("p",[e("a",{attrs:{href:"LICENSE"}},[t._v("MIT")])])])}),[],!1,null,null,null);e.default=n.exports}}]);
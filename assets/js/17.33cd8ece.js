(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{379:function(e,t,s){"use strict";s.r(t);var a=s(25),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"installation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[e._v("#")]),e._v(" Installation")]),e._v(" "),s("p",[e._v("To install Destroyer2, start by cloning the code:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" clone https://github.com/umcconnell/destroyer2.git\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" destroyer2\n")])])]),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("REQUIREMENTS")]),e._v(" "),s("p",[e._v("If you are planning to deploy or develop Destroyer2 with Docker™ containers,\nmake sure you have "),s("code",[e._v("docker")]),e._v(" and "),s("code",[e._v("docker-compose")]),e._v(" installed on your machine.\nCheck out the "),s("a",{attrs:{href:"https://docs.docker.com/get-docker/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Docker™ docs"),s("OutboundLink")],1),e._v(" for\ninstallation instructions.")]),e._v(" "),s("p",[e._v("To deploy or develop Destroyer2 without Docker™, you'll need "),s("code",[e._v("node")]),e._v(" with "),s("code",[e._v("npm")]),e._v("\nand "),s("code",[e._v("redis")]),e._v(" installed on your machine. Check out the\n"),s("a",{attrs:{href:"https://nodejs.org/en/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Node.js™"),s("OutboundLink")],1),e._v(" and "),s("a",{attrs:{href:"https://redis.io/download",target:"_blank",rel:"noopener noreferrer"}},[e._v("Redis™"),s("OutboundLink")],1),e._v(" docs\nrespectively for installation instructions.")])]),e._v(" "),s("h2",{attrs:{id:"production"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#production"}},[e._v("#")]),e._v(" Production")]),e._v(" "),s("p",[e._v("If you are using Docker™ containers to deploy Destroyer2, you are done! Head\nover to the "),s("RouterLink",{attrs:{to:"/guide/docker.html"}},[e._v("Docker instructions")]),e._v(" to quickly deploy.")],1),e._v(" "),s("p",[e._v("For a plain installation with npm, run this command to install all production\ndependencies:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" --only"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("production\n")])])]),s("p",[e._v("Assuming you have Redis™ installed, you can now start the database in a\ndifferent shell:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" path/to/destroyer2/db/\nredis-server\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# If you have a redis configuration file, instead run:")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# redis-server redis.conf")]),e._v("\n")])])]),s("p",[e._v("Head back to your first shell and start the Node.js™ server:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" run start\n")])])]),s("p",[e._v("Open "),s("a",{attrs:{href:"http://localhost:8080",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://localhost:8080"),s("OutboundLink")],1),e._v(" in your browser to start\nplaying 🚀")]),e._v(" "),s("h2",{attrs:{id:"development"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#development"}},[e._v("#")]),e._v(" Development")]),e._v(" "),s("p",[e._v("To develop Destroyer2 you must install all dependencies, including the developer\ndependencies:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v("\n")])])]),s("p",[e._v("Head over to a new shell to start the database:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" path/to/destroyer2/db/\nredis-server\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# If you have a redis configuration file, instead run:")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# redis-server redis.conf")]),e._v("\n")])])]),s("p",[e._v("Back in the first shell, you can then start the game server:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" run dev\n")])])]),s("p",[e._v("Navigate to "),s("a",{attrs:{href:"http://localhost:8080",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://localhost:8080"),s("OutboundLink")],1),e._v(" to get started!")]),e._v(" "),s("h2",{attrs:{id:"docs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docs"}},[e._v("#")]),e._v(" Docs")]),e._v(" "),s("p",[e._v("To improve the docs, run the Vuepress dev server:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" run docs:dev\n")])])]),s("p",[e._v("No need to reload while writing as Vuepress offers hot reloading 😄")]),e._v(" "),s("p",[e._v("Visit "),s("a",{attrs:{href:"http://localhost:8000",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://localhost:8000"),s("OutboundLink")],1),e._v(" to see the docs.")])])}),[],!1,null,null,null);t.default=n.exports}}]);
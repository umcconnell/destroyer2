(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{286:function(e,t,r){"use strict";r.r(t);var s=r(10),a=Object(s.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"auth"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#auth"}},[e._v("#")]),e._v(" Auth")]),e._v(" "),t("p",[e._v("User authorization is done using JSON Web Tokens. The\n"),t("abbr",{attrs:{title:"JSON Web Token"}},[e._v("JWT")]),e._v("s issued by the server are valid for one\nday. See the "),t("RouterLink",{attrs:{to:"/docs/api.html#login"}},[e._v("API docs")]),e._v(" for the login endpoint that issues the\n"),t("abbr",{attrs:{title:"JSON Web Token"}},[e._v("JWT")]),e._v("s.")],1),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("INFO")]),e._v(" "),t("p",[t("abbr",{attrs:{title:"JSON Web Token"}},[e._v("JWT")]),e._v("s are cryptographically signed JSON\nobjects containing user information. The "),t("abbr",{attrs:{title:"JSON Web Token"}},[e._v("JWT")]),e._v("\nis signed by the server using a secret key. A user can thus claim his or her\nidentity using the signed "),t("abbr",{attrs:{title:"JSON Web Token"}},[e._v("JWT")]),e._v(". The server\ncan verify this claim by checking if the signature is correct.")]),e._v(" "),t("p",[e._v("See "),t("a",{attrs:{href:"https://jwt.io",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://jwt.io"),t("OutboundLink")],1),e._v(" and\n"),t("a",{attrs:{href:"https://tools.ietf.org/html/rfc7519",target:"_blank",rel:"noopener noreferrer"}},[e._v("RFC 7519"),t("OutboundLink")],1),e._v(" for more information.")])]),e._v(" "),t("h2",{attrs:{id:"secret-key"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#secret-key"}},[e._v("#")]),e._v(" Secret Key")]),e._v(" "),t("p",[e._v("The HS256 algorithm is used to sign "),t("abbr",{attrs:{title:"JSON Web Token"}},[e._v("JWT")]),e._v("s.\nHS256 uses a single secret key to sign payloads. It is important to specify a\nsecret key, as potential malicious users could otherwise circumvent auth.")]),e._v(" "),t("p",[e._v("The secret key must be specified under the "),t("code",[e._v("JWT_KEY")]),e._v(" key in the "),t("code",[e._v(".env")]),e._v(" file.\nSee the "),t("RouterLink",{attrs:{to:"/guide/customizing.html"}},[e._v("customizing section")]),e._v(" for more information on\navailable environment variables.")],1),e._v(" "),t("h2",{attrs:{id:"authorization"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#authorization"}},[e._v("#")]),e._v(" Authorization")]),e._v(" "),t("p",[t("abbr",{attrs:{title:"JSON Web Token"}},[e._v("JWT")]),e._v("s issued by the server and returned from\nthe "),t("RouterLink",{attrs:{to:"/docs/api.html#login"}},[e._v("API login")]),e._v(" endpoint must be saved client-side, for example\nin "),t("code",[e._v("localStorage")]),e._v(".")],1),e._v(" "),t("p",[e._v("When calling an endpoint API requiring auth, the saved\n"),t("abbr",{attrs:{title:"JSON Web Token"}},[e._v("JWT")]),e._v(" must be passed as an HTTP header. Use\nthe "),t("code",[e._v("Authorization")]),e._v(" header for this. The header has the following form:\n"),t("code",[e._v("Authorization: Bearer <JWT>")]),e._v(" where "),t("code",[e._v("<JWT>")]),e._v(" is the saved\n"),t("abbr",{attrs:{title:"JSON Web Token"}},[e._v("JWT")]),e._v(".")])])}),[],!1,null,null,null);t.default=a.exports}}]);
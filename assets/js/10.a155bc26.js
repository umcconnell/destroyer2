(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{417:function(t,s,a){"use strict";a.r(s);var r=a(31),e=Object(r.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[t._v("#")]),t._v(" API")]),t._v(" "),a("p",[t._v("A quick overview of the available API endpoints:")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("HTTP Method")]),t._v(" "),a("th",[t._v("URL")]),t._v(" "),a("th",[t._v("Description")]),t._v(" "),a("th",[t._v("Parameters")]),t._v(" "),a("th",[t._v("Requires Auth")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("GET")]),t._v(" "),a("td",[a("a",{attrs:{href:"#open-rooms"}},[a("code",[t._v("/api/openrooms")])])]),t._v(" "),a("td",[t._v("Get an array of open rooms")]),t._v(" "),a("td",[t._v("none")]),t._v(" "),a("td",[t._v("No")])]),t._v(" "),a("tr",[a("td",[t._v("POST")]),t._v(" "),a("td",[a("a",{attrs:{href:"#login"}},[a("code",[t._v("/api/login")])])]),t._v(" "),a("td",[t._v("Log a user in and generate a "),a("abbr",{attrs:{title:"JSON Web Token"}},[t._v("JWT")])]),t._v(" "),a("td",[t._v("userName")]),t._v(" "),a("td",[t._v("No")])]),t._v(" "),a("tr",[a("td",[t._v("POST")]),t._v(" "),a("td",[a("a",{attrs:{href:"#new-room"}},[a("code",[t._v("/api/newroom")])])]),t._v(" "),a("td",[t._v("Create a new (private) room")]),t._v(" "),a("td",[a("abbr",{attrs:{title:"JSON Web Token"}},[t._v("JWT")]),t._v(", roomName, [private=false]")]),t._v(" "),a("td",[t._v("Yes")])]),t._v(" "),a("tr",[a("td",[t._v("DELETE")]),t._v(" "),a("td",[a("a",{attrs:{href:"#delete-room"}},[a("code",[t._v("/api/deleteroom")])])]),t._v(" "),a("td",[t._v("Delete a room and kick out players")]),t._v(" "),a("td",[a("abbr",{attrs:{title:"JSON Web Token"}},[t._v("JWT")]),t._v(", roomId")]),t._v(" "),a("td",[t._v("Yes")])])])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("The "),a("abbr",{attrs:{title:"JSON Web Token"}},[t._v("JWT")]),t._v(" authorization token has to be passed\nin the "),a("code",[t._v("Authorization")]),t._v(" header of HTTP requests that require auth (see\n"),a("a",{attrs:{href:"https://tools.ietf.org/html/rfc6750",target:"_blank",rel:"noopener noreferrer"}},[t._v("RFC 6750"),a("OutboundLink")],1),t._v(").")]),t._v(" "),a("p",[t._v("The header should look like this: "),a("code",[t._v("Authorization: Bearer <JWT>")]),t._v(". See below for more examples on how to call the API.")])]),t._v(" "),a("p",[t._v("Following endpoints are exposed:")]),t._v(" "),a("h2",{attrs:{id:"open-rooms"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#open-rooms"}},[t._v("#")]),t._v(" Open Rooms")]),t._v(" "),a("p",[t._v("Return json data about open / available rooms.")]),t._v(" "),a("ul",[a("li",[a("p",[a("strong",[t._v("URL")])]),t._v(" "),a("p",[a("code",[t._v("/api/openrooms")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Method:")])]),t._v(" "),a("p",[a("code",[t._v("GET")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("URL Params")])]),t._v(" "),a("p",[t._v("None")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Data Params")])]),t._v(" "),a("p",[a("strong",[t._v("Optional:")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("if-modified-since=[UTC String]")]),t._v(" "),a("br"),t._v("\n(see: "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since",target:"_blank",rel:"noopener noreferrer"}},[t._v("mdn.io/If-Modified-Since"),a("OutboundLink")],1),t._v(")")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Success Response:")])]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 200 "),a("br"),t._v(" "),a("strong",[t._v("Content:")]),t._v(" "),a("code",[t._v("[{id: <UUID>, name: <String>, owner: <String>}, ...]")])])]),t._v(" "),a("p",[t._v("OR")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 304 (Content not Modified)")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Error Response:")])]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 500 "),a("br"),t._v(" "),a("strong",[t._v("Content:")]),t._v(" "),a("code",[t._v('{ error : "Internal Server Error" }')])])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Sample Call:")])]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fetch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/api/openrooms"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("headers")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("Accept")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"If-Modified-Since"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Fri, 14 Mar 2015 09:26:53 GMT"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),a("h2",{attrs:{id:"login"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#login"}},[t._v("#")]),t._v(" Login")]),t._v(" "),a("p",[t._v("Log a user in and return a "),a("abbr",{attrs:{title:"JSON Web Token"}},[t._v("JWT")]),t._v(" containing\nthe username und uuid. The "),a("abbr",{attrs:{title:"JSON Web Token"}},[t._v("JWT")]),t._v(" is\n"),a("strong",[t._v("valid for one day")]),t._v(". See the "),a("RouterLink",{attrs:{to:"/docs/auth.html"}},[t._v("auth docs")]),t._v(" for more information.")],1),t._v(" "),a("ul",[a("li",[a("p",[a("strong",[t._v("URL")])]),t._v(" "),a("p",[a("code",[t._v("/api/login")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Method:")])]),t._v(" "),a("p",[a("code",[t._v("POST")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("URL Params")])]),t._v(" "),a("p",[t._v("None")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Data Params")])]),t._v(" "),a("p",[a("strong",[t._v("Required:")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("userName=<String maxlength 20>")])])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Success Response:")])]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 200 "),a("br"),t._v(" "),a("strong",[t._v("Content:")]),t._v(" "),a("code",[t._v("{ token : <JWT token string> }")])])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Error Response:")])]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 400 "),a("br"),t._v(" "),a("strong",[t._v("Content:")]),t._v(" "),a("code",[t._v("{ error : <Validation error message> }")])])]),t._v(" "),a("p",[t._v("OR")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 500 "),a("br"),t._v(" "),a("strong",[t._v("Content:")]),t._v(" "),a("code",[t._v('{ error : "Internal Server Error" }')])])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Sample Call:")])]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fetch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/api/login"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("method")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"POST"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("headers")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("Accept")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"Content-Type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("body")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("userName")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Username"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),a("h2",{attrs:{id:"new-room"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#new-room"}},[t._v("#")]),t._v(" New Room")]),t._v(" "),a("p",[t._v("Create a new room and return a uuid for the room. This endpoints\n"),a("strong",[t._v("requires auth")]),t._v(".")]),t._v(" "),a("ul",[a("li",[a("p",[a("strong",[t._v("URL")])]),t._v(" "),a("p",[a("code",[t._v("/api/newroom")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Method:")])]),t._v(" "),a("p",[a("code",[t._v("POST")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("URL Params")])]),t._v(" "),a("p",[t._v("None")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Data Params")])]),t._v(" "),a("p",[a("strong",[t._v("Required:")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("roomName=<String maxlength 20>")])])]),t._v(" "),a("p",[a("strong",[t._v("Optional:")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("secret=<Boolean default:false>")])])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Success Response:")])]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 200 "),a("br"),t._v(" "),a("strong",[t._v("Content:")]),t._v(" "),a("code",[t._v("{ roomId: <UUID> }")])])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Error Response:")])]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 400 "),a("br"),t._v(" "),a("strong",[t._v("Content:")]),t._v(" "),a("code",[t._v("{ error : <Validation error message> }")])])]),t._v(" "),a("p",[t._v("OR")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 401 "),a("br"),t._v(" "),a("strong",[t._v("Content:")]),t._v(" "),a("code",[t._v('{ error : "unauthorized" }')])])]),t._v(" "),a("p",[t._v("OR")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 500 "),a("br"),t._v(" "),a("strong",[t._v("Content:")]),t._v(" "),a("code",[t._v('{error: "Internal Server Error"}')])])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Sample Call:")])]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fetch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/api/newroom"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("method")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"POST"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("headers")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("Accept")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"Content-Type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("Authorization")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Bearer <JWT>"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("body")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("roomName")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ROOMNAME")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// secret: true")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),a("h2",{attrs:{id:"delete-room"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#delete-room"}},[t._v("#")]),t._v(" Delete Room")]),t._v(" "),a("p",[t._v("Delete a room and kick out any players still in the room. This endpoints\n"),a("strong",[t._v("requires auth")]),t._v(".")]),t._v(" "),a("ul",[a("li",[a("p",[a("strong",[t._v("URL")])]),t._v(" "),a("p",[a("code",[t._v("/api/deleteroom")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Method:")])]),t._v(" "),a("p",[a("code",[t._v("DELETE")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("URL Params")])]),t._v(" "),a("p",[t._v("None")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Data Params")])]),t._v(" "),a("p",[a("strong",[t._v("Required:")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("roomId=<UUID>")])])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Success Response:")])]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 200 "),a("br"),t._v(" "),a("strong",[t._v("Content:")]),t._v(" "),a("code",[t._v('{ message: "successfully deleted room" }')])])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Error Response:")])]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 400 "),a("br"),t._v(" "),a("strong",[t._v("Content:")]),t._v(" "),a("code",[t._v("{ error : <Validation error message> }")])])]),t._v(" "),a("p",[t._v("OR")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 401 "),a("br"),t._v(" "),a("strong",[t._v("Content:")]),t._v(" "),a("code",[t._v('{ error : "unauthorized" }')])])]),t._v(" "),a("p",[t._v("OR")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 403 "),a("br"),t._v(" "),a("strong",[t._v("Content:")]),t._v(" "),a("code",[t._v('{ error: "you are not the owner of this room" }')])])]),t._v(" "),a("p",[t._v("OR")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 404 "),a("br"),t._v(" "),a("strong",[t._v("Content:")]),t._v(" "),a("code",[t._v('{ error: "room doesn\'t exist" }')])])]),t._v(" "),a("p",[t._v("OR")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Code:")]),t._v(" 500 "),a("br"),t._v(" "),a("strong",[t._v("Content")]),t._v(" "),a("code",[t._v('{error: "Internal Server Error"}')])])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Sample Call:")])]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fetch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/api/deleteroom"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("method")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"DELETE"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("headers")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("Accept")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"Content-Type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("Authorization")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Bearer <JWT>"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("body")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("roomId")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ROOMID")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])])])}),[],!1,null,null,null);s.default=e.exports}}]);
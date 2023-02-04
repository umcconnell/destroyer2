(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{285:function(t,s,a){"use strict";a.r(s);var r=a(10),n=Object(r.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[t._v("#")]),t._v(" API")]),t._v(" "),s("p",[t._v("A quick overview of the available API endpoints:")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("HTTP Method")]),t._v(" "),s("th",[t._v("URL")]),t._v(" "),s("th",[t._v("Description")]),t._v(" "),s("th",[t._v("Parameters")]),t._v(" "),s("th",[t._v("Requires Auth")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("GET")]),t._v(" "),s("td",[s("a",{attrs:{href:"#open-rooms"}},[s("code",[t._v("/api/openrooms")])])]),t._v(" "),s("td",[t._v("Get an array of open rooms")]),t._v(" "),s("td",[t._v("none")]),t._v(" "),s("td",[t._v("No")])]),t._v(" "),s("tr",[s("td",[t._v("POST")]),t._v(" "),s("td",[s("a",{attrs:{href:"#login"}},[s("code",[t._v("/api/login")])])]),t._v(" "),s("td",[t._v("Log a user in and generate a "),s("abbr",{attrs:{title:"JSON Web Token"}},[t._v("JWT")])]),t._v(" "),s("td",[t._v("userName")]),t._v(" "),s("td",[t._v("No")])]),t._v(" "),s("tr",[s("td",[t._v("POST")]),t._v(" "),s("td",[s("a",{attrs:{href:"#new-room"}},[s("code",[t._v("/api/newroom")])])]),t._v(" "),s("td",[t._v("Create a new (private) room")]),t._v(" "),s("td",[s("abbr",{attrs:{title:"JSON Web Token"}},[t._v("JWT")]),t._v(", roomName, [private=false]")]),t._v(" "),s("td",[t._v("Yes")])]),t._v(" "),s("tr",[s("td",[t._v("DELETE")]),t._v(" "),s("td",[s("a",{attrs:{href:"#delete-room"}},[s("code",[t._v("/api/deleteroom")])])]),t._v(" "),s("td",[t._v("Delete a room and kick out players")]),t._v(" "),s("td",[s("abbr",{attrs:{title:"JSON Web Token"}},[t._v("JWT")]),t._v(", roomId")]),t._v(" "),s("td",[t._v("Yes")])])])]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("The "),s("abbr",{attrs:{title:"JSON Web Token"}},[t._v("JWT")]),t._v(" authorization token has to be passed\nin the "),s("code",[t._v("Authorization")]),t._v(" header of HTTP requests that require auth (see\n"),s("a",{attrs:{href:"https://tools.ietf.org/html/rfc6750",target:"_blank",rel:"noopener noreferrer"}},[t._v("RFC 6750"),s("OutboundLink")],1),t._v(").")]),t._v(" "),s("p",[t._v("The header should look like this: "),s("code",[t._v("Authorization: Bearer <JWT>")]),t._v(". See below for more examples on how to call the API.")])]),t._v(" "),s("p",[t._v("Following endpoints are exposed:")]),t._v(" "),s("h2",{attrs:{id:"open-rooms"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#open-rooms"}},[t._v("#")]),t._v(" Open Rooms")]),t._v(" "),s("p",[t._v("Return json data about open / available rooms.")]),t._v(" "),s("ul",[s("li",[s("p",[s("strong",[t._v("URL")])]),t._v(" "),s("p",[s("code",[t._v("/api/openrooms")])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Method:")])]),t._v(" "),s("p",[s("code",[t._v("GET")])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("URL Params")])]),t._v(" "),s("p",[t._v("None")])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Data Params")])]),t._v(" "),s("p",[s("strong",[t._v("Optional:")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("if-modified-since=[UTC String]")]),t._v(" "),s("br"),t._v("\n(see: "),s("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since",target:"_blank",rel:"noopener noreferrer"}},[t._v("mdn.io/If-Modified-Since"),s("OutboundLink")],1),t._v(")")])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Success Response:")])]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 200 "),s("br"),t._v(" "),s("strong",[t._v("Content:")]),t._v(" "),s("code",[t._v("[{id: <UUID>, name: <String>, owner: <String>}, ...]")])])]),t._v(" "),s("p",[t._v("OR")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 304 (Content not Modified)")])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Error Response:")])]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 500 "),s("br"),t._v(" "),s("strong",[t._v("Content:")]),t._v(" "),s("code",[t._v('{ error : "Internal Server Error" }')])])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Sample Call:")])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fetch")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/api/openrooms"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("headers")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("Accept")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"If-Modified-Since"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Fri, 14 Mar 2015 09:26:53 GMT"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),s("h2",{attrs:{id:"login"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#login"}},[t._v("#")]),t._v(" Login")]),t._v(" "),s("p",[t._v("Log a user in and return a "),s("abbr",{attrs:{title:"JSON Web Token"}},[t._v("JWT")]),t._v(" containing\nthe username und uuid. The "),s("abbr",{attrs:{title:"JSON Web Token"}},[t._v("JWT")]),t._v(" is\n"),s("strong",[t._v("valid for one day")]),t._v(". See the "),s("RouterLink",{attrs:{to:"/docs/auth.html"}},[t._v("auth docs")]),t._v(" for more information.")],1),t._v(" "),s("ul",[s("li",[s("p",[s("strong",[t._v("URL")])]),t._v(" "),s("p",[s("code",[t._v("/api/login")])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Method:")])]),t._v(" "),s("p",[s("code",[t._v("POST")])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("URL Params")])]),t._v(" "),s("p",[t._v("None")])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Data Params")])]),t._v(" "),s("p",[s("strong",[t._v("Required:")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("userName=<String maxlength 20>")])])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Success Response:")])]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 200 "),s("br"),t._v(" "),s("strong",[t._v("Content:")]),t._v(" "),s("code",[t._v("{ token : <JWT token string> }")])])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Error Response:")])]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 400 "),s("br"),t._v(" "),s("strong",[t._v("Content:")]),t._v(" "),s("code",[t._v("{ error : <Validation error message> }")])])]),t._v(" "),s("p",[t._v("OR")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 500 "),s("br"),t._v(" "),s("strong",[t._v("Content:")]),t._v(" "),s("code",[t._v('{ error : "Internal Server Error" }')])])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Sample Call:")])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fetch")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/api/login"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("method")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"POST"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("headers")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("Accept")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"Content-Type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("body")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("userName")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Username"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),s("h2",{attrs:{id:"new-room"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#new-room"}},[t._v("#")]),t._v(" New Room")]),t._v(" "),s("p",[t._v("Create a new room and return a uuid for the room. This endpoints\n"),s("strong",[t._v("requires auth")]),t._v(".")]),t._v(" "),s("ul",[s("li",[s("p",[s("strong",[t._v("URL")])]),t._v(" "),s("p",[s("code",[t._v("/api/newroom")])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Method:")])]),t._v(" "),s("p",[s("code",[t._v("POST")])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("URL Params")])]),t._v(" "),s("p",[t._v("None")])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Data Params")])]),t._v(" "),s("p",[s("strong",[t._v("Required:")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("roomName=<String maxlength 20>")])])]),t._v(" "),s("p",[s("strong",[t._v("Optional:")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("secret=<Boolean default:false>")])])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Success Response:")])]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 200 "),s("br"),t._v(" "),s("strong",[t._v("Content:")]),t._v(" "),s("code",[t._v("{ roomId: <UUID> }")])])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Error Response:")])]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 400 "),s("br"),t._v(" "),s("strong",[t._v("Content:")]),t._v(" "),s("code",[t._v("{ error : <Validation error message> }")])])]),t._v(" "),s("p",[t._v("OR")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 401 "),s("br"),t._v(" "),s("strong",[t._v("Content:")]),t._v(" "),s("code",[t._v('{ error : "unauthorized" }')])])]),t._v(" "),s("p",[t._v("OR")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 500 "),s("br"),t._v(" "),s("strong",[t._v("Content:")]),t._v(" "),s("code",[t._v('{error: "Internal Server Error"}')])])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Sample Call:")])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fetch")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/api/newroom"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("method")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"POST"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("headers")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("Accept")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"Content-Type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("Authorization")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Bearer <JWT>"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("body")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("roomName")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ROOMNAME")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// secret: true")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),s("h2",{attrs:{id:"delete-room"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#delete-room"}},[t._v("#")]),t._v(" Delete Room")]),t._v(" "),s("p",[t._v("Delete a room and kick out any players still in the room. This endpoints\n"),s("strong",[t._v("requires auth")]),t._v(".")]),t._v(" "),s("ul",[s("li",[s("p",[s("strong",[t._v("URL")])]),t._v(" "),s("p",[s("code",[t._v("/api/deleteroom")])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Method:")])]),t._v(" "),s("p",[s("code",[t._v("DELETE")])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("URL Params")])]),t._v(" "),s("p",[t._v("None")])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Data Params")])]),t._v(" "),s("p",[s("strong",[t._v("Required:")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("roomId=<UUID>")])])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Success Response:")])]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 200 "),s("br"),t._v(" "),s("strong",[t._v("Content:")]),t._v(" "),s("code",[t._v('{ message: "successfully deleted room" }')])])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Error Response:")])]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 400 "),s("br"),t._v(" "),s("strong",[t._v("Content:")]),t._v(" "),s("code",[t._v("{ error : <Validation error message> }")])])]),t._v(" "),s("p",[t._v("OR")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 401 "),s("br"),t._v(" "),s("strong",[t._v("Content:")]),t._v(" "),s("code",[t._v('{ error : "unauthorized" }')])])]),t._v(" "),s("p",[t._v("OR")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 403 "),s("br"),t._v(" "),s("strong",[t._v("Content:")]),t._v(" "),s("code",[t._v('{ error: "you are not the owner of this room" }')])])]),t._v(" "),s("p",[t._v("OR")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 404 "),s("br"),t._v(" "),s("strong",[t._v("Content:")]),t._v(" "),s("code",[t._v('{ error: "room doesn\'t exist" }')])])]),t._v(" "),s("p",[t._v("OR")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Code:")]),t._v(" 500 "),s("br"),t._v(" "),s("strong",[t._v("Content")]),t._v(" "),s("code",[t._v('{error: "Internal Server Error"}')])])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Sample Call:")])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fetch")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/api/deleteroom"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("method")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"DELETE"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("headers")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("Accept")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"Content-Type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("Authorization")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Bearer <JWT>"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("body")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("roomId")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ROOMID")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])])])}),[],!1,null,null,null);s.default=n.exports}}]);
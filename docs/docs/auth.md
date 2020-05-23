# Auth

User authorization is done using JSON Web Tokens. The
<abbr title="JSON Web Token">JWT</abbr>s issued by the server are valid for one
day. See the [API docs](./api#login) for the login endpoint that issues the
<abbr title="JSON Web Token">JWT</abbr>s.

::: tip INFO
<abbr title="JSON Web Token">JWT</abbr>s are cryptographically signed JSON
objects containing user information. The <abbr title="JSON Web Token">JWT</abbr>
is signed by the server using a secret key. A user can thus claim his or her
identity using the signed <abbr title="JSON Web Token">JWT</abbr>. The server
can verify this claim by checking if the signature is correct.

See [https://jwt.io](https://jwt.io) and
[RFC 7519](https://tools.ietf.org/html/rfc7519) for more information.
:::

## Secret Key

The HS256 algorithm is used to sign <abbr title="JSON Web Token">JWT</abbr>s.
HS256 uses a single secret key to sign payloads. It is important to specify a
secret key, as potential malicious users could otherwise circumvent auth.

The secret key must be specified under the `JWT_KEY` key in the `.env` file.
See the [customizing section](./customizing#environment) for more information on
available environment variables.

## Authorization

<abbr title="JSON Web Token">JWT</abbr>s issued by the server and returned from
the [API login](./api#login) endpoint must be saved client-side, for example in
`localStorage`.

When calling an endpoint API requiring auth, the saved
<abbr title="JSON Web Token">JWT</abbr> must be passed as an HTTP header. Use
the `Authorization` header for this. The header has the following form:
`Authorization: Bearer <JWT>` where `<JWT>` is the saved
<abbr title="JSON Web Token">JWT</abbr>.

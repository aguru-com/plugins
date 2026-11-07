# Credentials

How a workflow authenticates to an API it calls with `http`: which credential
to create for the scheme the API documents, and what the YAML writes. For
third-party connectors, see [connectors/README.md](connectors/README.md); for
model keys, template 10.

## Where credentials live

A credential is a row in **Settings → API & HTTP Credentials** of an org,
named by its **Credential ID**. YAML names it, never its value:
`{{ secret("acme-api-token") }}`.

- **Only a person creates one, in the product.** Neither the CLI nor the
  manifest provisions credentials, and the value never passes through this
  workspace. Your job is to tell the user exactly what to enter (see
  [Hand the user a setup table](#hand-the-user-a-setup-table)).
- **It is looked up when the block runs**, in the org that runs it, then up
  its parent orgs; the nearest one with that ID wins. A child org overrides a
  parent's credential by saving its own under the same ID.
- **A secret reference works in any string of an `http` request**: `url`,
  `headers`, `query` and `body`. Headers are the usual place; a query string
  can end up in the provider's logs.

## The two types

| Authentication Type | What `secret()` returns   | Use for                                         |
| ------------------- | ------------------------- | ----------------------------------------------- |
| Bearer Token        | The current access token  | Static tokens, and tokens fetched automatically |
| API Key             | The key, exactly as saved | API keys, and any other fixed secret string     |

`secret()` returns the bare value. The YAML writes the header name and any
scheme prefix itself (`Bearer `, `Basic `, `Token `). The API Key's **Header
Name** field is not applied by `http`.

A Bearer Token with **Auto-refresh** on fetches its token from a token
endpoint, and the platform keeps it fresh:

- Before an `http` request, a token expiring within five minutes, or within
  its **Refresh Buffer** if that is longer, is refreshed.
- A static token or an API key is never refreshed.

On a `401`, any request that names a secret is sent once more, after every
refreshing credential it names is refreshed; a request naming only static
credentials is resent unchanged. When the second answer is still `401`, the
block fails, or with `fail-on-error: false` returns that response with
`success: false` for the workflow to handle. A request naming no secret is
not resent.

## From the API's documentation to a credential

Find how the API authenticates: its OpenAPI `securitySchemes`, or the
"Authentication" page of its docs. Then:

| The API documents                                                  | Create                                                                 | YAML                                         |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------- | -------------------------------------------- |
| A bearer or personal access token (`type: http`, `scheme: bearer`) | Bearer Token, auto-refresh off                                         | `Authorization: 'Bearer {{ secret("id") }}'` |
| An API key in a header (`type: apiKey`, `in: header`)              | API Key                                                                | `<header name>: '{{ secret("id") }}'`        |
| An API key in the query (`type: apiKey`, `in: query`)              | API Key                                                                | `query: { <param>: '{{ secret("id") }}' }`   |
| HTTP Basic (`type: http`, `scheme: basic`)                         | API Key holding base64 of `username:password`                          | `Authorization: 'Basic {{ secret("id") }}'`  |
| OAuth2 client credentials (`flows.clientCredentials`)              | Bearer Token, auto-refresh on, see [below](#oauth2-client-credentials) | `Authorization: 'Bearer {{ secret("id") }}'` |
| OAuth2 refresh token that the provider never rotates               | Bearer Token, auto-refresh on, `grant_type=refresh_token`              | `Authorization: 'Bearer {{ secret("id") }}'` |
| OAuth2 authorization code, or a refresh token rotated on every use | Not supported with `http`; look for a connector                        |                                              |
| A request signature (HMAC over the body, AWS SigV4)                | Not supported with `http`; look for a connector                        |                                              |

Many APIs also need a non-secret header that picks the account, tenant or
region (`X-Account-Id`, `Tenant`). That is configuration, not a credential:
declare it in the manifest's `install` tier and send it as
`'${config.accountId}'`.

## OAuth2 client credentials

The API issues a client id and secret; you trade them at its token endpoint
for a short-lived access token. Create a **Bearer Token** with
**Auto-refresh** on:

| Field                | Value                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------- |
| Token                | Leave blank; the first call fetches one                                                 |
| Refresh URL          | The token endpoint, e.g. `https://auth.acme-jobs.example/oauth/token`                   |
| Method               | `POST`                                                                                  |
| Request Headers      | `{}`, or `{"Authorization": "Basic {{secret(\"acme-client-basic\")}}"}` (see below)     |
| Request Body         | Form Data: `grant_type=client_credentials`, plus the client id and secret if sent there |
| Token Path           | Where the token sits in the response, usually `access_token`                            |
| Expiry Path          | Where its lifetime sits, usually `expires_in`                                           |
| Expiry Type          | How to read it: `expires_in` is **Seconds from now**                                    |
| Default TTL (sec)    | Used when the response carries no expiry; the provider's documented lifetime            |
| Refresh Buffer (sec) | How early to refresh; `60` is fine                                                      |

**Test Connection** on the dialog calls the token endpoint and shows the
result; use it before any run.

- **Form Data is URL-encoded**, one `key=value` per line, which is what OAuth
  token endpoints expect. JSON is for the few that document a JSON body.
- **Where the client secret goes** is the provider's choice: in the body
  (`client_id=…`, `client_secret=…`) or as `Authorization: Basic` with base64
  of `client_id:client_secret`. Read its docs; the wrong one returns `401`
  or `invalid_client`.
- **Keep the client secret masked.** A refresh header or body value may name
  an API Key credential as `{{secret("id")}}`; it is filled in just before
  the token request. Typed directly into the dialog, it is shown in plain text
  to every admin who opens the credential.
- **Scopes and audience** go in the body (`scope=jobs.read`,
  `audience=https://api.acme-jobs.example`) when the provider asks for them.
- **The token endpoint and the API must be the same environment.** When the
  base URL is configuration (`config.acmeBaseUrl`), a sandbox token sent to
  production, or the reverse, returns `401` on every call. Keep one
  credential per environment and say which one the base URL needs.
- **The token endpoint must be public.** Like `http`, the refresh cannot
  reach localhost or private addresses.
- **Use `https://` for the Refresh URL and the API.** Both accept plain
  `http://`, which sends the client credentials and the token in cleartext.

[Template 11](../templates/11-oauth-client-credentials/README.md) is a
complete example.

## Hand the user a setup table

Before the first live run, give the user one table per credential the project
needs, in the shape of the ones above: the Credential ID exactly as it is
spelled where it is used, the Authentication Type, and every field to fill in,
with where to find each value in the provider's console.

A project needs every credential its YAML names **and** every credential a
refreshing credential's Request Headers or Request Body name, such as the
client secret behind `{{secret("acme-client-basic")}}`. List those first and
tell the user to create them first: until they exist, the token request, and
**Test Connection** with it, fails. Name the secret values (client
secret, API key) but never ask for them in chat. Then ask the user to press
**Test Connection** for a refreshing credential and confirm it before you
start a run.

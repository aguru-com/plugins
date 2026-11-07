# 11 OAuth client credentials

Reads one job from the Acme Jobs API with an access token the platform
fetches from Acme's token endpoint and refreshes before it expires. Start
here for any API that gives you a client id and secret rather than a token.
[credentials.md](../../docs/credentials.md) maps other schemes.

- `acme-oauth-fetch-job.yaml` is template 01's request with two changes: the
  token comes from the refreshing credential `acme-oauth`, and the
  `X-Acme-Account` header picks the account from install config. The YAML
  never sees the client secret or calls the token endpoint; the credential
  does both.

## Save the credentials

In the org where you will run the project, open **Settings → API & HTTP
Credentials** and add two credentials. First the client secret, so the token
request can name it without showing it:

| Field               | Value                                                                  |
| ------------------- | ---------------------------------------------------------------------- |
| Credential ID       | `acme-client-basic`                                                    |
| Authentication Type | API Key                                                                |
| API Key             | base64 of `<client id>:<client secret>`, from Acme's developer console |
| Header Name         | Leave blank                                                            |

Then the token itself:

| Field                | Value                                                          |
| -------------------- | -------------------------------------------------------------- |
| Credential ID        | `acme-oauth`                                                   |
| Authentication Type  | Bearer Token                                                   |
| Token                | Leave blank                                                    |
| Auto-refresh         | On                                                             |
| Refresh URL          | `https://api.acme-jobs.example/v1/oauth/token`                 |
| Method               | `POST`                                                         |
| Request Headers      | `{"Authorization": "Basic {{secret(\"acme-client-basic\")}}"}` |
| Request Body         | Form Data: `grant_type=client_credentials`                     |
| Token Path           | `access_token`                                                 |
| Expiry Path          | `expires_in`                                                   |
| Expiry Type          | Seconds from now                                               |
| Default TTL (sec)    | `3600`                                                         |
| Refresh Buffer (sec) | `60`                                                           |

Press **Test Connection**: it should show a token and its expiry. A `401` or
`invalid_client` there is the client id or secret, not the workflow.

## Deploy and run

The Acme API is fictional, so a live run needs your own API: point
`acmeBaseUrl`, the Refresh URL and the request at it, on a public `https://`
address. Plain `http://` is accepted and sends the token and the client
credentials in cleartext.
Set `acmeBaseUrl` and `acmeAccountId` on the installation, deploy (see
[the deployment guide](../../docs/deploy.md)), and start the workflow with a
real `jobId`. In the run history, `get-job`'s input shows the header as a
secret reference and its output the API's `200`.

**Change first:** the URL, the account header (or remove it), the credential
ID, and the token request's headers and body to what your provider documents.

**Tests**

| Test           | Proves                                                                   |
| -------------- | ------------------------------------------------------------------------ |
| `get-job` unit | The token is a secret reference and the account header comes from config |
| workflow e2e   | The projection's shape and the id conversion                             |

A test never fetches a token; only a live run proves the credential.

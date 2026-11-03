# HTTP (OAuth2)

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-http-oauth2'
  version: '0.3.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> OAuth2

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `authUrl` | string | yes |  | Authorize URL. OAuth2 Authorize URL. |
| `tokenUrl` | string | yes |  | Token URL. OAuth2 Token URL. |
| `scopes` | string | yes |  | Scopes (whitespace separated). OAuth2 Scopes. |

## Actions

### `send-oauth2-request`

**Send an OAuth2 Request.** Calls any HTTP endpoint with an OAuth 2.0 bearer token injected from the connection, choosing the method (GET/POST/PUT/PATCH/DELETE) and body mode (none, JSON, raw, or form-data), optionally routing through an HTTP proxy or returning the error text instead of throwing when the failsafe option is on. Prefer it over the core HTTP piece Send HTTP Request action only when the target API needs a managed OAuth2 token that Activepieces refreshes; it requires an OAuth2 connection set up with the authorize URL, token URL, and scopes, plus a full request URL. Not idempotent in general: the effect depends on the chosen method, and non-GET calls can create or change data on each call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. |
| `method` | string | yes |  | Method. One of `"GET"`, `"POST"`, `"PUT"`, `"PATCH"`, `"DELETE"`. |
| `headers` | object | no |  | Headers. |
| `queryParams` | object | no |  | Query Parameters. |
| `body_type` | string | no | `"none"` | Body Type. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `use_proxy` | boolean | no | `false` | Use Proxy. Use a proxy for this request. |
| `proxy_settings` | object | no |  | Proxy Settings. An object whose fields depend on other inputs; the product shows them. |
| `failsafe` | boolean | no |  | No Error on Failure. |
| `timeout` | number | no |  | Timeout (in seconds). |

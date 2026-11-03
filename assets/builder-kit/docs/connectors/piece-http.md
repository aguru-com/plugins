# HTTP

Send HTTP requests to any URL and use the response in your flow

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-http'
  version: '0.13.0'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `send_request`

**Send HTTP request.** Sends an HTTP request to any URL with a chosen method, optional Basic or Bearer auth, an optional JSON, raw or multipart body, and can retry or continue the flow on 4xx/5xx. Use it as the generic escape hatch for an API with no dedicated piece — prefer that app's own piece when one exists, and Parse URL to pull a URL apart without calling it. Requires an absolute URL and a method; not idempotent, since a call's effect follows the method and POST/PATCH-style calls mutate remote data.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `method` | string | yes | `"GET"` | Method. GET reads data, POST creates it. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `url` | string | yes |  | URL. The full URL to call, including https:// or http://. |
| `headers` | object | no |  | Headers. Sent with the request as key-value pairs. |
| `queryParams` | object | no |  | Query params. Appended to the URL as a query string. |
| `authType` | string | no | `"NONE"` | Authentication. One of `"NONE"`, `"BASIC"`, `"BEARER_TOKEN"`. |
| `authFields` | object | no |  | Authentication Fields. An object whose fields depend on other inputs; the product shows them. |
| `body_type` | string | no | `"none"` | Body Type. How to encode the request body. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary. Return the response as base64, for files like PDFs. |
| `use_proxy` | boolean | no | `false` | Use Proxy. Route this request through an HTTP proxy. |
| `proxy_settings` | object | no |  | Proxy Settings. An object whose fields depend on other inputs; the product shows them. |
| `timeout` | number | no |  | Timeout. Seconds to wait for a response. Empty: up to the flow limit (10 min). |
| `followRedirects` | boolean | no | `false` | Follow redirects. Follow 3xx redirects instead of returning the response. |
| `failureMode` | string | no | `"continue_none"` | On Failure. One of `"retry_all"`, `"retry_5xx"`, `"retry_none"`, `"continue_all"`, `"continue_4xx"`, `"continue_none"`. |

### `parse_url`

**Parse URL.** Breaks an absolute URL string into its component parts locally, returning each query value as an array by default so repeated keys are preserved, or the first value only when that is switched off. Use it to read a value out of a link (e.g. a utm_source or a record id) before branching or composing a request; use Send HTTP Request when you need to call the URL. Requires a valid absolute URL including the scheme — no network call is made, so it is read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The full URL you want to parse (e.g., https://example.com/page?utm_source=twitter) |
| `returnArrays` | boolean | no | `true` | Return Values as Arrays. If checked (recommended), all query parameters are returned as JSON arrays to safely group duplicate keys (e.g., {"tags": ["shoes", "hats"]}). If unchecked, standard web behavior applies, returning only the first value as text. |

Output fields:

- `base_url`: Base URL (url)
- `domain`: Domain
- `path`: Path
- `query_parameters`: Query Parameters (an object whose keys vary)
- `hash`: Hash

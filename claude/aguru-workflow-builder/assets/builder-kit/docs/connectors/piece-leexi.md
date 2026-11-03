# Leexi

AI Notetaker

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-leexi'
  version: '0.2.1'
```

Categories: ARTIFICIAL_INTELLIGENCE, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `BASIC_AUTH`: Connection

> You can obtain Key ID and secret from [API Keys Settings](https://app.leexi.ai/en/settings/api_keys).

## Actions

### `get-call`

**Get Call.** Retrieves the full details of a single Leexi call (recording/transcription session) by its call ID. Use this to look up a specific call when you already have its ID, e.g. after a "New Call Created" trigger fires. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `callId` | string | yes |  | Call ID. |

### `custom_api_call`

**Custom API Call.** Make a custom API call to a specific endpoint. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `method` | string | yes | `"GET"` | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `headers` | object | no |  | Headers. Authorization headers are injected automatically from your connection. |
| `queryParams` | object | no |  | Query Parameters. Appended to the URL as ?key=value. |
| `body_type` | string | no | `"none"` | Body Type. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary. Enable for files like PDFs, images, etc. |
| `failsafe` | boolean | no |  | Return Error as Output. On a failed request, output the error instead of failing the step. |
| `timeout` | number | no |  | Timeout. Seconds to wait for a response. Empty: up to the flow limit (10 min). |
| `followRedirects` | boolean | no | `false` | Follow redirects. Follow 3xx redirects instead of returning them as the response. |

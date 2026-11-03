# LiveSession

LiveSession is the analytics platform that helps businesses scale up based on data.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-livesession'
  version: '0.1.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> r LiveSession API authentication.
>
> **How to get your API Key:**
> 1. Go to [LiveSession settings](https://app.livesession.io/app/settings/api?tab=api_tokens)
> 2. Click **API Tokens** from the left menu
> 3. Click the creation button in the upper-right corner
> 4. Give your token a descriptive name
> 5. Select the website you want to access through the REST API
> 6. Select the scopes you'd like to grant this token e.g webhooks:read, webhooks:write, sessions:read, recordings:read etc.
> 7. Click confirm

## Actions

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

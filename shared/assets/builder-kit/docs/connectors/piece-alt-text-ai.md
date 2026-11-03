# AltText.ai

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-alt-text-ai'
  version: '0.2.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key from [Account Settings](https://alttext.ai/account/api_keys).

## Actions

### `generate-alt-text`

**Generate Alt Text.** Sends an image to AltText.ai and returns AI-generated descriptive alt text for accessibility/SEO. Use when you have an image (uploaded file passed as raw base64) and need a human-readable description; optionally bias the output with keywords, negative keywords, or a keyword-source text. Each call submits the image for fresh generation, so it is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `image` | file | yes |  | Image. Files are not supported; an action that needs one fails. |
| `keywords` | array | no |  | Keywords. keywords / phrases to be considered when generating the alt text. |
| `negativeKeywords` | array | no |  | Negative Keywords. negative keywords / phrases to be removed from any generated alt text. |
| `keywordSource` | string | no |  | Keyword Source. Text to use as the source of keywords for the alt text. |

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

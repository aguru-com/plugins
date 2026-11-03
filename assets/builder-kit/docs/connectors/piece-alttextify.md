# AltTextify

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-alttextify'
  version: '0.2.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain an API key, navigate to the [API keys](https://alttextify.net/settings/apikeys) section within your account settings.

## Actions

### `generate-alt-text`

**Generate Image Alt Text.** Generates descriptive alt text for an image file by sending it to AltTextify. Use when an agent needs accessibility alt text or an SEO caption for an image. Requires the image as a file input; optionally accepts a language code and keyword/negative-keyword lists to steer the output. Idempotent: the same image and options yield the same alt text and create nothing. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `image` | file | yes |  | Image File. Files are not supported; an action that needs one fails. |
| `lang` | string | no | `"en"` | Language. Specifies the language for the alt text. Supported language codes are accepted. |
| `keywords` | array | no |  | Keywords. List of keywords/phrases for SEO-optimized alt text. |
| `negative_keywords` | array | no |  | Negative Keywords. List of negative keywords/phrases for SEO-optimized alt text. |

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

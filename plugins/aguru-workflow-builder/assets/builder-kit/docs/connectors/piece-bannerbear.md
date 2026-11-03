# Bannerbear

Automate image generation

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bannerbear'
  version: '0.5.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Bannerbear API Key

## Actions

### `bannerbear_create_image`

**Create Image.** Renders a new image (or PDF) from a Bannerbear template by applying layer modifications (text, image URLs, ratings, charts, bar codes, colors). Choose this to programmatically generate branded graphics; requires a valid template UID and modifications matching that template's available layers. Not idempotent — each call submits a new render and produces a new image. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | string | yes |  | Template. The template to use in image creation. A value the product loads from the provider, such as an id; write the value itself. |
| `template_version` | number | no |  | Template version. Create image based on a specific version of the template. |
| `modifications` | object | yes |  | Template modifications. A list of modifications you want to make on the template. An object whose fields depend on other inputs; the product shows them. |
| `transparent` | boolean | no |  | Transparent background. Render a PNG with a transparent background. Default is false. |
| `render_pdf` | boolean | no |  | Render a PDF. Render a PDF instead of a PNG. Default is false. |
| `metadata` | string | no |  | Metadata. Any metadata that you need to store e.g. ID of a record in your DB. |

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

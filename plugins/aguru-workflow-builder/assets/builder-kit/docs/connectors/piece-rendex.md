# Rendex

Render raw HTML, a URL, or Markdown to a PNG, JPEG, or WebP image or a PDF via the Rendex API.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-rendex'
  version: '0.1.1'
```

Categories: CONTENT_AND_FILES, DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Rendex API key. Create one in your dashboard at rendex.dev under API Keys (the free tier includes 500 renders per month).

## Actions

### `render_to_image`

**Render to Image.** Renders source content into a downloadable image (PNG/JPEG/WebP) or PDF via the Rendex screenshot API, returning the rendered file. The Source mode determines what the content input means: raw HTML markup, a live page URL to capture, or Markdown. Use to turn HTML/Markdown or a webpage into a captured image or PDF; optionally capture the full scrollable page instead of just the viewport. Not idempotent: each call performs a fresh remote render that produces a new file, and in URL mode the capture reflects the live page at request time. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source_type` | string | yes | `"html"` | Source. Render from raw HTML, a live URL, or Markdown. One of `"html"`, `"url"`, `"markdown"`. |
| `content` | object | yes |  | Content. The content to render, based on the Source you selected. An object whose fields depend on other inputs; the product shows them. |
| `format` | string | no | `"png"` | Format. One of `"png"`, `"jpeg"`, `"webp"`, `"pdf"`. |
| `full_page` | boolean | no | `false` | Full Page. Capture the full scrollable page instead of just the viewport. |

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

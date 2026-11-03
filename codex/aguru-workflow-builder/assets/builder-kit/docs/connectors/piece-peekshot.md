# PeekShot

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-peekshot'
  version: '0.2.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key by navigating to [API Keys](https://dashboard.peekshot.com/dashboard/api-keys) menu.

## Actions

### `captureScreenshot`

**Capture Screenshot.** Captures a screenshot of a given web page URL via PeekShot and waits (polling up to ~5 minutes) for the rendered image to be ready. Use when an agent needs to render a live web page to an image; supports optional viewport width/height, PNG/JPEG output, full-page capture, and injecting custom CSS/JS before the shot. Requires a PeekShot project id and a target URL. Not idempotent: each call submits a new capture request. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `url` | string | yes |  | Target URL. |
| `width` | string | no |  | Custom Screenshot Width. |
| `height` | string | no |  | Custom Screenshot Height. |
| `file_type` | string | no |  | Image Format. Output format for the screenshot. One of `"png"`, `"jpeg"`. |
| `inject_css` | string | no |  | Custom CSS. Custom CSS to apply. |
| `inject_js` | string | no |  | Custom JavaScript. Custom JavaScript to apply. |
| `full_page` | boolean | no |  | Full Page?. To capture the entire page. |

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

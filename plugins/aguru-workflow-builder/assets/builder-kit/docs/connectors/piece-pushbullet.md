# Pushbullet

Cross-device notification service

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pushbullet'
  version: '0.2.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> 1. Login to your Pushbullet Dashboard.
> 2. Go to **https://www.pushbullet.com/#settings/account**.
> 3.  **Create Access Token** then copy to the clipboard and paste it.

## Actions

### `sendALink`

**Send a Link.** Pushes a clickable link notification to the authenticated Pushbullet account (and its connected devices). Use this when the agent needs to deliver a URL the recipient should open, optionally with a title and body line. Requires a URL; sends a new push on every call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL to send. |
| `title` | string | no |  | Title. |
| `body` | string | no |  | Body. |

### `sendANote`

**Send a Note.** Pushes a plain-text note notification (title plus body) to the authenticated Pushbullet account and its connected devices. Use this for a simple text alert or message rather than a link or file. Both title and body are required; sends a new push on every call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Note Title. |
| `body` | string | yes |  | Note Body. |

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

# Matrix

Open standard for interoperable, decentralized, real-time communication

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-matrix'
  version: '0.5.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To obtain access token & Home server:
>
> 1. Log in to the account you want to get the access token for on Element.
> 2. Click on the name in the top left corner of the screen, then select "Settings" from the dropdown menu.
> 3. In the Settings dialog, click the "Help & About" tab on the left side of the screen.
> 4. Scroll to the bottom of the page and click on the "click to reveal" part of the "Access Token" section.
> 5. Copy your access token & Home Server URL and paste them into the fields below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes |  | Home Server. |
| `access_token` | string | yes |  | Access Token. |

## Actions

### `send_message`

**Send Message.** Posts a markdown message to a Matrix room, resolving the room alias to its internal room ID first. Use to deliver chat notifications or updates to a Matrix/Element channel. Requires the room alias (from room settings -> advanced -> room addresses -> main address); not idempotent, as each call posts a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `room_alias` | string | yes |  | Room Alias. Copy it from room settings -> advanced -> room addresses -> main address. |
| `message` | string | yes |  | Message. The message to send (markdown) |

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

# Mattermost

Open-source, self-hosted Slack alternative

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mattermost'
  version: '0.5.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> **Workspace URL**: The url of mattermost instance (e.g `https://activepieces.mattermost.com`)
>
> **Bot Token**: Obtain it from settings > integrations > bot accounts > add bot account

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_url` | string | yes |  | Workspace URL. The workspace URL of the Mattermost instance (e.g https://activepieces.mattermost.com) |
| `token` | string | yes |  | Bot Token. The bot token to use to authenticate. |

## Actions

### `send_message`

**Send Message.** Post a new text message to a Mattermost channel, identified by its channel ID (not name). Use when an agent needs to notify or post into a specific channel. Not idempotent: each call creates a separate post, so repeating it sends duplicate messages. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The channel to send the message to, get that ID by clicking on info near start call butto. |
| `text` | string | yes |  | Message Text. The text of the message to send. |

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

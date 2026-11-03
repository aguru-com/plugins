# Chatwoot

Receive and reply to customer messages with Chatwoot

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chatwoot'
  version: '0.1.2'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Chatwoot Connection

> To connect your Chatwoot account:
>
> **Chatwoot URL:**
> - For Chatwoot Cloud, use: `https://app.chatwoot.com`
> - For self-hosted instances, use your server URL (e.g. `https://chatwoot.yourcompany.com`)
>
> **API Access Token:**
> 1. Log in to your Chatwoot dashboard.
> 2. Click your avatar in the bottom-left corner and go to **Profile Settings**.
> 3. Scroll down to the **Access Token** section.
> 4. Copy your access token.
>
> **Account ID:**
> 1. In your Chatwoot dashboard, the Account ID is visible in the URL: `/app/accounts/{ACCOUNT_ID}/...`
> 2. It is a numeric value (e.g. 1, 2, etc.)

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes | `"https://app.chatwoot.com"` | Chatwoot URL. Your Chatwoot instance URL (e.g. https://app.chatwoot.com) |
| `apiAccessToken` | string | yes |  | API Access Token. Your user API access token from Profile Settings. |
| `accountId` | number | yes |  | Account ID. Your numeric account ID (visible in the dashboard URL) |

## Actions

### `send_message`

**Send Message.** Posts a new message to an existing Chatwoot conversation, identified by its numeric conversation display ID. Use to reply to a customer or, by enabling the private-note option, to leave an internal note visible only to agents rather than to the contact. Not idempotent — each call appends another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | number | yes |  | Conversation ID. The numeric conversation display ID. Available from the trigger output. |
| `message` | string | yes |  | Message. The text message to send. |
| `isPrivate` | boolean | yes | `false` | Private Note. If checked, sends as a private note visible only to agents (not the contact) |

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

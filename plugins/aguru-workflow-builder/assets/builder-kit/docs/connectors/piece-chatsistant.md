# Chatsistant

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chatsistant'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Chatsistant API Key

> To get your API Key:
>
> 1. Go to [Chatsistant platform](https://app.chatsistant.com/)
> 2. Sign up or log in to your account
> 3. Click on the "Account" menu in the navigation bar
> 4. Navigate to the "API Keys" section
> 5. Click "Generate new key"
> 6. Enter a description for your key and click "Generate"
> 7. Copy and save your API key securely

## Actions

### `sendMessage`

**Send Message.** Sends a user message to a Chatsistant chatbot and returns its streamed reply. Provide the chatbot UUID and the message text; supply a session UUID to continue an existing conversation, or omit it to start a fresh session automatically. Not idempotent — each call appends a new message and generates a new response. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbot_uuid` | string | yes |  | Chatbot UUID. The UUID of the chatbot to send the message to. |
| `query` | string | yes |  | Message. The message to send to the chatbot. |
| `session_uuid` | string | no |  | Session UUID. The UUID of the session to send the message to. |

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

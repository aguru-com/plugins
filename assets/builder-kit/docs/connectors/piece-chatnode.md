# ChatNode

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chatnode'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To generate an API key, go to Team Settings and navigate to the API Access tab. There, you’ll find the option to generate a new API key.

## Actions

### `ask-chatbot`

**Ask Chatbot.** Sends a user message to a ChatNode chatbot (identified by Bot ID) and returns the bot's generated answer. Choose this to query a ChatNode-trained knowledge-base bot conversationally. Optionally pass a Chat Session ID to continue an existing conversation thread; omitting it starts a fresh session each call. Not idempotent: each call posts a new message and produces a new model-generated response. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `botId` | string | yes |  | Bot ID. You can obtain Bot ID from bot's settings menu. |
| `message` | string | yes |  | Message. |
| `chatSessionId` | string | no |  | Chat Session ID. The chat session id to keep track of a unique conversation. If not provided, it will default to generate a new one each time.You can obtain it from URL after /chats/. |

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

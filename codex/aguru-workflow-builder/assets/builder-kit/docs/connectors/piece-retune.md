# re:tune

Everything you need to transform your business with AI, from custom chatbots to autonomous agents.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-retune'
  version: '0.2.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Follow these instructions to get your re:tune chat ID and API Key:
>
> 1. Visit the chatbots page: https://retune.so/chats
> 2. Once on the website, locate and click on the chatbot you want to use
> 3. From the URL, copy the chat ID you want to use;
> e.g from this: https://retune.so/chat/acewocwe-123123-123123-123123/ your chat ID is "acewocwe-123123-123123-123123"
> 4. To get the API key, go to https://retune.so/settings
> 5. Scroll to the bottom to find "Re:tune API Keys" and copy your key below

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatId` | string | yes |  | Chat ID. The ID of the chat you want to use. |
| `apiKey` | string | yes |  | API Key. Your re:tune API key. |

## Actions

### `ask_chatbot`

**Ask Chatbot.** Sends a user message to an existing re:tune chatbot conversation thread and returns the bot's generated reply. Use this to interact with a configured re:tune chatbot; requires both a thread ID (a conversation context that must already exist) and the message text. Not idempotent — each call appends a turn to the thread and produces a fresh AI response. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `thread` | string | yes |  | Thread. The thread you want to send the message to. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | yes |  | Message. The message you want to send. |

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

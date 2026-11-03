# CometAPI

Access multiple AI models through CometAPI - unified interface for GPT, Claude, Gemini, and more.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-cometapi'
  version: '0.2.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Follow these instructions to get your CometAPI Key:
>
> 1. Visit the CometAPI Dashboard: https://api.cometapi.com/console/token
> 2. Go to the API settings page to get your key.
> 3. Copy the key and paste it below.

## Actions

### `ask-cometapi`

**Ask CometAPI.** Sends a single-turn chat completion (one prompt plus an optional system message, with no multi-turn history) to any model in the CometAPI catalog, which fronts OpenAI, Anthropic, Gemini and other vendors behind one key. Requires a model id chosen from CometAPI's live model list, and accepts temperature, top_p and max tokens as optional sampling controls; pick it when the model should be selectable at runtime rather than fixed to a single vendor, and use this piece's Custom API Call for any other CometAPI endpoint such as image generation or embeddings. Not idempotent: each call runs a fresh generation and consumes tokens. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. The prompt to send to the AI model. |
| `systemMessage` | string | no |  | System Message. Optional system message to set the behavior of the AI. |
| `temperature` | number | no | `1` | Temperature. Controls randomness (0-2). Lower values make output more focused. |
| `maxTokens` | number | no | `1000` | Max Tokens. Maximum number of tokens to generate. |
| `topP` | number | no | `1` | Top P. Controls diversity via nucleus sampling (0-1). |

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

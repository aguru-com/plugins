# Cohere

Generate text using Cohere AI language models

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-cohere'
  version: '0.1.3'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your Cohere API Key:
>
> 1. Go to the [Cohere Dashboard](https://dashboard.cohere.com/api-keys).
> 2. Sign in or create a free account.
> 3. Navigate to **API Keys** in the left sidebar.
> 4. Click **Create Trial Key** (free) or use a production key.
> 5. Copy the key and paste it below.

## Actions

### `generate_text`

**Generate Text.** Runs a single-turn completion against Cohere's v2 Chat API - one user prompt in, one generated message out - with optional model, temperature, and max-token controls. This is the only purpose-built action in the Cohere piece and covers only chat-style generation, not multi-turn conversation history, embeddings, rerank, or classify; use the piece's Custom API Call action to reach those Cohere endpoints. Requires a prompt and a chat-capable model name. Not idempotent: each call bills a fresh generation and the wording varies unless temperature is set to 0. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. The user message to send to the model. |
| `model` | string | yes | `"command-a-03-2025"` | Model. The Cohere model to use for generation. A value the product loads from the provider, such as an id; write the value itself. |
| `temperature` | number | no | `0.3` | Temperature. Controls randomness (0.0 = deterministic, 1.0 = maximum randomness). Default: 0.3. |
| `maxTokens` | number | no |  | Max Tokens. Maximum number of tokens to generate. Leave empty for model default. |

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

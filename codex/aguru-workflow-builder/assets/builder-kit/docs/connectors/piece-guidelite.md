# GuideLite

GuideLite is a platform that helps organizations build and utilize AI assistants

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-guidelite'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Guidelite API Key

> To get your API key:
> 1. Sign in to your GuideLite dashboard
> 2. Click on your account in the left panel
> 3. Select "Profile" from the dropdown menu
> 4. Navigate to the API Keys tab and click "Generate API Key"
> 5. Copy your unique API key (you won't be able to view it again unless you delete and create a new one)
>
> For more information, visit: https://docs.guidelite.ai/reference/quickstart

## Actions

### `sendAPrompt`

**Send a Prompt.** Sends a message to a specified GuideLite AI assistant and returns its reply. Provide a conversationId to continue an existing conversation, or omit it to start a new one. Each call posts a new message and produces a fresh assistant response, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assistantId` | string | yes |  | Assistant. Please select assistant. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | yes |  | Message. The input message to be processed by the assistant. |
| `conversationId` | string | no |  | Conversation ID. The Conversation ID of the previous conversation. If empty, a new conversation will be created. |

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

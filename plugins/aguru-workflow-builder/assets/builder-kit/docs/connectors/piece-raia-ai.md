# raia

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-raia-ai'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> 1. Open your agent in raiaAI Launch Pad and go to Agent → Skills.
> 2. Add/enable “API Skill” (toggle it Active).
> 3. In the API Skill settings, click “Generate Secret Key” (your agent’s API key).

## Actions

### `prompt-agent`

**Prompt Agent.** Send a text prompt to the connected Raia AI agent and get its response. Use to query or instruct the agent inline within a flow. Not idempotent: each call creates a new prompt/conversation turn on the agent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. |

### `upload-agent-file`

**Upload Agent File.** Upload a file to the connected Raia AI agent so it can reference that content in subsequent prompts. Use when the agent needs a document as context. Requires the file binary; not idempotent, as each call uploads a new file to the agent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |

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

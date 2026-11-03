# SwarmNode

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-swarmnode'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key from [Settings](https://app.swarmnode.ai/settings/api-keys/).

## Actions

### `execute-agent`

**Execute Agent.** Runs an existing SwarmNode AI agent (selected by agent ID) with a JSON input payload, then polls until the execution completes and returns its result. Use to trigger an agent and get its output in one step; the call blocks until success or times out after ~5 minutes. Each call starts a new execution, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent. A value the product loads from the provider, such as an id; write the value itself. |
| `payload` | JSON | yes |  | Agent Input Payload. |

### `get-execution`

**Get Execution.** Retrieves the details and result of a single SwarmNode agent execution by its agent executor job ID. Use to look up the status or output of a previously started execution. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobId` | string | yes |  | Agent Executor Job ID. |

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

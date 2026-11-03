# Griptape Cloud

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-griptape'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE, DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

## Actions

### `createAssistantRun`

**Create Assistant Run.** Starts a Griptape Cloud assistant run by sending an input prompt to a chosen assistant, then blocks and polls until the run reaches SUCCEEDED before returning. Use to actually invoke an assistant and get its result in one step; optionally attach extra knowledge bases, rulesets, structures, or tools, and reuse or create a thread for conversation context. Not idempotent: each call creates a new run. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assistant_id` | string | yes |  | Assistant. Select the assistant. A value the product loads from the provider, such as an id; write the value itself. |
| `input` | string | yes |  | Input. Input to provide to the assistant. |
| `knowledgeBaseIds` | array | no |  | Knowledge Bases. Select knowledge bases to use. Values the product loads from the provider, such as ids; write an array of them. |
| `rulesets` | array | no |  | Rulesets. Select rulesets to apply. Values the product loads from the provider, such as ids; write an array of them. |
| `structures` | array | no |  | Structures. Select structures to use. Values the product loads from the provider, such as ids; write an array of them. |
| `tools` | array | no |  | Tools. Select tools to use. Values the product loads from the provider, such as ids; write an array of them. |
| `thread` | array | no |  | Thread. Select the thread. Values the product loads from the provider, such as ids; write an array of them. |
| `create_new_thread` | boolean | no | `false` | Create New Thread. Create a new thread for this run. |

### `createStructureRun`

**Create Structure Run.** Starts a Griptape Cloud structure run by passing input arguments to a chosen structure, then blocks and polls until the run reaches SUCCEEDED before returning. Use to execute a deployed structure (workflow/agent) and get its result in one step. Not idempotent: each call creates a new run. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `structure_id` | string | yes |  | Structure. Select the structure. A value the product loads from the provider, such as an id; write the value itself. |
| `input_args` | array | yes |  | Input Arguments. Input arguments for the structure run. |

### `getAssistantRun`

**Get Assistant Run.** Fetches the details and current status/output of a single existing Griptape Cloud assistant run by its run ID. Use to check or retrieve the result of a run started elsewhere; requires a known assistant run ID. Idempotent read-only lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assistant_id` | string | yes |  | Assistant. Select the assistant. A value the product loads from the provider, such as an id; write the value itself. |
| `assistant_run_id` | string | yes |  | Assistant Run. Select the assistant run. A value the product loads from the provider, such as an id; write the value itself. |

### `getStructureRun`

**Get Structure Run.** Fetches the details and current status/output of a single existing Griptape Cloud structure run by its run ID. Use to check or retrieve the result of a structure run started elsewhere; requires a known structure run ID. Idempotent read-only lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `structure_id` | string | yes |  | Structure. Select the structure. A value the product loads from the provider, such as an id; write the value itself. |
| `structure_run_id` | string | yes |  | Structure Run. Select the structure run. A value the product loads from the provider, such as an id; write the value itself. |

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

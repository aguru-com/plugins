# AirOps

Build and deploy AI-powered workflows and agents.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-air-ops'
  version: '0.2.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your API key can be found in the **Workspace Settings** section of your AirOps account.

## Actions

### `run_workflow`

**Run Workflow.** Run a selected AirOps workflow synchronously and wait for its result, passing optional input values. Use when you need the workflow output back in the same call rather than polling; for long-running workflows prefer the async variant. Requires the target workflow (selected from the account) and triggers a new execution each time, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `app` | string | yes |  | Workflow. Select the workflow to execute. A value the product loads from the provider, such as an id; write the value itself. |
| `inputs` | JSON | no | `{}` | Inputs. Input values for the workflow. |
| `inputs_schema` | JSON | no |  | Inputs Schema. Schema defining the workflow inputs (advanced). |
| `definition` | JSON | no |  | Definition. Custom workflow definition steps (advanced). |

### `run_workflow_async`

**Run Workflow (Async).** Queue a selected AirOps workflow for asynchronous execution and return immediately without waiting for the result. Use for long-running workflows, then retrieve the outcome later with Get Execution; use the synchronous Run Workflow instead when you need the output in the same call. Each call starts a new execution, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `app` | string | yes |  | Workflow. Select the workflow to execute. A value the product loads from the provider, such as an id; write the value itself. |
| `inputs` | JSON | no | `{}` | Inputs. Input values for the workflow. |
| `inputs_schema` | JSON | no |  | Inputs Schema. Schema defining the workflow inputs (advanced). |
| `definition` | JSON | no |  | Definition. Custom workflow definition steps (advanced). |

### `get_execution`

**Get Execution.** Retrieve a single workflow execution and its status, inputs, and output by looking up its UUID within a selected AirOps workflow. Use to poll or check the result of an execution started by Run Workflow (Async), or to inspect any past run. Requires both the workflow and the execution UUID, and throws if no matching execution exists. Read-only, so repeated calls are idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `app` | string | yes |  | Workflow. Select the workflow. A value the product loads from the provider, such as an id; write the value itself. |
| `execution_uuid` | string | yes |  | Execution UUID. The UUID of the execution to retrieve. |

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

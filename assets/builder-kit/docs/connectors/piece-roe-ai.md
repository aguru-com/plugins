# Roe AI

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-roe-ai'
  version: '0.1.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Roe AI Auth

> Authenticate with Roe AI using your API key

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Enter your Roe AI API key. |
| `organization_id` | string | yes |  | Organization ID. Enter your Roe AI Organization ID. |

## Actions

### `runAgent`

**Run Agent.** Runs a configured Roe AI agent by its agent ID, passing dynamic input fields (text or file inputs the agent expects) and optional metadata, and returns the execution result synchronously. Use to invoke a prebuilt agent rather than write a raw query. Each call triggers a fresh agent run, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agent_id` | string | yes |  | Agent. Select Agent. A value the product loads from the provider, such as an id; write the value itself. |
| `agent_input` | object | yes |  | Agent Input. Dynamic input fields based on agent configuration. Can include text or file inputs. |
| `metadata` | object | no |  | Metadata. Optional metadata as JSON object. |

### `runQuery`

**Run Query.** Executes an arbitrary SQL query against the Roe AI database synchronously and returns the results, optionally scoped to a worksheet ID or run with admin privileges. Use to read or manipulate data directly via SQL. Because the query can mutate data and each run executes independently, treat this as not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | SQL Query. SQL query to execute. |
| `worksheet_id` | string | no |  | Worksheet ID. Optional worksheet ID. |
| `use_admin` | boolean | no | `false` | Use Admin Privileges. Use admin privileges for the query. |

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

# Captain-data

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-captain-data'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API key. |
| `projectId` | string | yes |  | Project ID. |

## Actions

### `launchWorkflow`

**Launch a workflow.** Schedules a run of an existing Captain Data workflow, identified by its workflow UID, optionally supplying input rows, per-step account/parameter configuration, and a start delay. Use this to kick off a scraping/enrichment automation; it creates a new job on each call, so it is not idempotent. Each step requires the account UIDs and step UID matching the workflow definition. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflow` | string | yes |  | Workflow. A value the product loads from the provider, such as an id; write the value itself. |
| `jobName` | string | no |  | Job name. |
| `inputs` | JSON | no | `[]` | Inputs. Inputs are the starting point of your workflow. |
| `steps` | JSON | no | `[]` | Steps. You need to configure each steps with: - accounts : The identifiers of the accounts you want to use for this step. The accounts indicated must match the integration used in the step (e.g A Linkedin account for a Search Linkedin People Profile step). You can find the UIDs in the "Integrations' tab o… |
| `delay` | number | no |  | Delay (seconds). |

### `getJobResults`

**Get job results.** Retrieves all output records produced by a specific Captain Data job (a single past run of a workflow), identified by its workflow UID and job UID. Use this to read the data a launched workflow has gathered. Read-only and idempotent; results are not paginated. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflow` | string | yes |  | Workflow. A value the product loads from the provider, such as an id; write the value itself. |
| `job` | string | yes |  | Job. A value the product loads from the provider, such as an id; write the value itself. |

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

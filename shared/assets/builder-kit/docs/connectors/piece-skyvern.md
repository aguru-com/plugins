# Skyvern

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-skyvern'
  version: '0.2.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key by navigating to [Settings](https://app.skyvern.com/settings).

## Actions

### `run-agent-task`

**Run Agent Task.** Launches a Skyvern browser-automation agent task from a natural-language prompt to navigate and act on a website, optionally starting at a given URL and extracting structured data via a schema. Use to have an AI agent perform a web task (browse, fill forms, click) rather than running a predefined workflow. Each call starts a new asynchronous run, so it is not idempotent; the response returns a run identifier you poll separately with Get Workflow/Task Run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. The goal or task description for Skyvern to accomplish. |
| `url` | string | no |  | URL. The starting URL for the task. |
| `engine` | string | no |  | Engine. One of `"skyvern-1.0"`, `"skyvern-2.0"`, `"openai-cua"`, `"anthropic-cua"`. |
| `webhookUrl` | string | no |  | Webhook Callback URL. URL to send task status updates to after a run is finished. |
| `proxyLocation` | string | no |  | Proxy Location. One of `"RESIDENTIAL"`, `"RESIDENTIAL_ES"`, `"RESIDENTIAL_IE"`, `"RESIDENTIAL_GB"`, `"RESIDENTIAL_IN"`, `"RESIDENTIAL_JP"`, `"RESIDENTIAL_FR"`, `"RESIDENTIAL_DE"`, `"RESIDENTIAL_NZ"`, `"RESIDENTIAL_ZA"`, `"RESIDENTIAL_AR"`, `"RESIDENTIAL_ISP"`, `"US-CA"`, `"US-NY"`, `"US-TX"`, `"US-FL"`, `"US-WA"`, `"NONE"`. |
| `maxSteps` | number | no |  | Max Steps. Maximum number of steps the task can take. Task will fail if it exceeds this number. |
| `dataExtractionSchema` | JSON | no |  | Data Extraction Schema. The schema for data to be extracted from the webpage. |

### `run-workflow`

**Run Workflow.** Starts a run of an existing Skyvern workflow identified by its workflow ID, passing any workflow parameters. Use when an agent should execute a predefined multi-step automation rather than an ad-hoc prompt-driven task. Each call triggers a new asynchronous run (not idempotent); the response returns a run identifier you poll separately with Get Workflow/Task Run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflowId` | string | yes |  | Workflow. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Workflow Run Title. The title for this workflow run. |
| `proxyLocation` | string | no |  | Proxy Location. One of `"RESIDENTIAL"`, `"RESIDENTIAL_ES"`, `"RESIDENTIAL_IE"`, `"RESIDENTIAL_GB"`, `"RESIDENTIAL_IN"`, `"RESIDENTIAL_JP"`, `"RESIDENTIAL_FR"`, `"RESIDENTIAL_DE"`, `"RESIDENTIAL_NZ"`, `"RESIDENTIAL_ZA"`, `"RESIDENTIAL_AR"`, `"RESIDENTIAL_ISP"`, `"US-CA"`, `"US-NY"`, `"US-TX"`, `"US-FL"`, `"US-WA"`, `"NONE"`. |
| `webhookUrl` | string | no |  | Webhook Callback URL. |
| `parameters` | object | no |  | Workflow Params. An object whose fields depend on other inputs; the product shows them. |

### `cancel-run`

**Cancel Run.** Cancels an in-progress Skyvern workflow or task run identified by its run ID. Use to stop a run an agent previously started (via Run Agent Task or Run Workflow). Idempotent: cancelling an already-cancelled or finished run converges to the same cancelled state with no additional effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `runId` | string | yes |  | Workflow/Task Run ID. |

### `get-run`

**Get Workflow/Task Run.** Retrieves the current status and details of a Skyvern workflow or task run by its run ID. Use to poll a run started via Run Agent Task or Run Workflow until it completes and to read its results. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `runId` | string | yes |  | Workflow/Task Run ID. |

### `find-workflow`

**Find Workflow.** Searches Skyvern workflows by title, paging through all results and returning every match. Use to resolve a workflow title into its workflow ID before calling Run Workflow. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Workflow Title. |

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

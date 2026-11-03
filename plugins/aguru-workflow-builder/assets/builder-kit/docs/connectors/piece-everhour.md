# Everhour

Time tracking software that integrates into project management tools to track billable hours, set budgets, and monitor spending.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-everhour'
  version: '0.2.2'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can find your API key by going to **Settings -> API** in Everhour.

## Actions

### `create-task`

**Create Task.** Creates a new task inside an Everhour project, identified by its project ID, with the given task name. Use when an agent needs to add a trackable work item before logging time or starting a timer against it. Not idempotent: each call creates a separate task even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The ID of the project to create the task in. |
| `name` | string | yes |  | Task Name. The name of the task. |

### `start-timer`

**Start Timer.** Starts a running Everhour time timer against the task identified by the given task ID. Use when an agent needs to begin live time tracking on a task. Requires a valid task ID; not idempotent, since each call starts a new timing session (and only one timer can run at a time). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. The ID of the task to start the timer for. |

### `stop-timer`

**Stop Timer.** Stops the Everhour timer that is currently running and records its tracked time; takes no input. Use when an agent needs to end the active timing session. Not idempotent: it fails if no timer is active, so it cannot be safely repeated after the timer has already been stopped. Needs authentication.

Kind: not safe to repeat.

No inputs.

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

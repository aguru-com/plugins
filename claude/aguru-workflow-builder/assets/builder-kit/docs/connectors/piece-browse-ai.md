# Browse AI

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-browse-ai'
  version: '0.2.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can find your Browse AI API key on the dashboard under Settings → API Key.

## Actions

### `get-task-details`

**Get Task Details.** Fetches the full record of one previously-run Browse AI scraping task by robot ID and task ID, including its status and any captured/extracted data. Use to check the outcome or pull results of a known task. Requires both the robot ID and the task ID; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `robotId` | string | yes |  | Robot. Select a robot from your Browse AI account. A value the product loads from the provider, such as an id; write the value itself. |
| `taskId` | string | yes |  | Task. Select a task associated with the selected robot. A value the product loads from the provider, such as an id; write the value itself. |

### `list-robots`

**List Robots.** Lists all Browse AI robots in the connected account, returning each robot and its ID. Use to discover the available robots or resolve a robot name to the ID needed by other Browse AI actions. Takes no input; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `run-robot`

**Run a Robot.** Starts a new on-demand run of a Browse AI robot, creating a fresh scraping task with the robot-specific input parameters (the required inputs vary per robot and are pulled from its definition). Use to trigger a scrape/extraction; results arrive asynchronously, so poll Get Task Details or use a task-finished trigger for the outcome. Not idempotent: each call queues another task run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `robotId` | string | yes |  | Robot. Select a robot from your Browse AI account. A value the product loads from the provider, such as an id; write the value itself. |
| `recordVideo` | boolean | no | `false` | Record Video. Try to record a video while running the task. |
| `robotParams` | object | yes |  | Input Parameters. An object whose fields depend on other inputs; the product shows them. |

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

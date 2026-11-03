# Clockify

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-clockify'
  version: '0.2.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key by navigating to **Preferences->Advanced**.

## Actions

### `create-task`

**Create Task.** Creates a new task inside a specific Clockify project, optionally setting a status and assignees. Requires the workspace and project to target. Not idempotent: each call creates a separate task even with identical inputs. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Task Name. |
| `status` | string | no |  | Status. One of `"ACTIVE"`, `"DONE"`, `"ALL"`. |
| `assigneeIds` | array | no |  | Assignee. Values the product loads from the provider, such as ids; write an array of them. |

### `create-time-entry`

**Create Time Entry.** Logs a completed time entry on a Clockify workspace for an explicit start and end datetime, optionally tied to a project, task, tags, and billable flag. Use to record past or fixed-duration work rather than to start a live timer (use Start Timer for that). Not idempotent: each call adds a new entry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `start` | ISO date-time string | yes |  | Start Datetime. |
| `end` | ISO date-time string | yes |  | End Datetime. |
| `description` | string | no |  | Entry Description. |
| `projectId` | string | no |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `taskId` | string | no |  | Task. A value the product loads from the provider, such as an id; write the value itself. |
| `billable` | boolean | no |  | Billable. |
| `tagIds` | array | no |  | Tags. Values the product loads from the provider, such as ids; write an array of them. |

### `start-timer`

**Start Timer.** Starts a live, currently-running timer on a Clockify workspace from the current moment, optionally tied to a project, task, tags, and billable flag. Use to begin tracking ongoing work; use Stop Timer to end it and Create Time Entry to log a finished interval. Not idempotent: each call starts a new running entry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Entry Description. |
| `projectId` | string | no |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `taskId` | string | no |  | Task. A value the product loads from the provider, such as an id; write the value itself. |
| `billable` | boolean | no |  | Billable. |
| `tagIds` | array | no |  | Tags. Values the product loads from the provider, such as ids; write an array of them. |

### `stop-timer`

**Stop Timer.** Stops the authenticated user's currently running timer on the given workspace by setting its end time to now. Use after Start Timer to finalize tracked work. Not idempotent in effect: if no timer is running there is nothing to stop, and the stopped time depends on when it is called. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |

### `find-task`

**Find Task.** Searches for tasks by name within a specific Clockify project and returns matches. Toggle Exact Match for strict name matching versus a looser substring search. Use to resolve a task id or confirm a task exists before creating time entries. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Task Name. |
| `exactMatch` | boolean | no |  | Exact Match ?. |

### `find-time-entry`

**Find Time Entry.** Searches the authenticated user's time entries on a workspace, optionally filtered by description, start/end datetime, project, or task. With no filters it returns recent entries; supplied filters narrow the results. Use to locate an existing entry or verify logged time. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `start` | ISO date-time string | no |  | Start Datetime. |
| `end` | ISO date-time string | no |  | End Datetime. |
| `description` | string | no |  | Entry Description. |
| `projectId` | string | no |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `taskId` | string | no |  | Task. A value the product loads from the provider, such as an id; write the value itself. |

### `find-running-timer`

**Find Running Timer.** Returns the in-progress (currently running) time entries for the authenticated user on the given workspace. Use to check whether a timer is active before starting or stopping one. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |

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

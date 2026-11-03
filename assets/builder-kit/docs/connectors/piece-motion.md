# Motion

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-motion'
  version: '0.2.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain API key from [API Settings](https://app.usemotion.com/web/settings/api).

## Actions

### `create-task`

**Create Task.** Creates a new task in a Motion workspace, with optional due date, duration, status, priority, project, assignee, and labels. Use when an agent needs to add a to-do or scheduled item to Motion. Requires the target workspace ID and a task name. Not idempotent: each call creates a separate task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace ID. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Task Name. |
| `description` | string | no |  | Description. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `duration` | number | no |  | Duration. Duration in minutes. |
| `statusId` | string | no |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `priority` | string | no |  | Priority. One of `"ASAP"`, `"HIGH"`, `"MEDIUM"`, `"LOW"`. |
| `projectId` | string | no |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `assigneeId` | string | no |  | Assignee. A value the product loads from the provider, such as an id; write the value itself. |
| `labels` | array | no |  | Labels. The names of the labels to be added to the task. |

### `update-task`

**Update Task.** Updates fields on an existing Motion task identified by task ID — name, description, due date, duration, status, priority, assignee, and labels. Use when an agent needs to modify a known task rather than create one. Requires the task ID; only the provided fields are changed. Idempotent: re-applying the same values leaves the task in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace ID. A value the product loads from the provider, such as an id; write the value itself. |
| `taskId` | string | yes |  | Task ID. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Task Name. |
| `description` | string | no |  | Description. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `duration` | number | no |  | Duration. Duration in minutes. |
| `statusId` | string | no |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `priority` | string | no |  | Priority. One of `"ASAP"`, `"HIGH"`, `"MEDIUM"`, `"LOW"`. |
| `projectId` | string | no |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `assigneeId` | string | no |  | Assignee. A value the product loads from the provider, such as an id; write the value itself. |
| `labels` | array | no |  | Labels. The names of the labels to be added to the task. |

### `create-project`

**Create Project.** Creates a new project in a Motion workspace, with optional description, due date, priority, and labels. Use when an agent needs a container to organize tasks under. Requires the target workspace ID and a project name. Not idempotent: each call creates a separate project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace ID. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Project Name. |
| `description` | string | no |  | Description. |
| `dueDate` | ISO date-time string | no |  | Due Date. ISO 8601 Due date on the project. |
| `priority` | string | no |  | Priority. One of `"ASAP"`, `"HIGH"`, `"MEDIUM"`, `"LOW"`. |
| `labels` | array | no |  | Labels. |

### `get-task`

**Get Task.** Retrieves the full details of a single Motion task by its task ID. Use when an agent already has a task ID and needs to read its current fields. Idempotent: a read-only lookup with no side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. |

### `moveTask`

**Move Task.** Moves an existing Motion task to a different workspace. Use when an agent needs to relocate a known task between workspaces. Requires the task ID and the target workspace ID. Idempotent: moving a task to a workspace it already belongs to leaves it in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Current Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `taskId` | string | yes |  | Task ID. A value the product loads from the provider, such as an id; write the value itself. |
| `newWorkspaceId` | string | yes |  | Target Workspace. A value the product loads from the provider, such as an id; write the value itself. |

### `find-task`

**Find Task.** Searches tasks in a Motion workspace by name, paging through all results, and optionally narrows by status, assignee, or project; set include-all-statuses to also match completed/resolved tasks. Use when an agent needs to locate a task ID before reading, updating, or moving it. Requires the workspace ID and a task name to match. Idempotent: a read-only search with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace ID. A value the product loads from the provider, such as an id; write the value itself. |
| `includeAllStatuses` | boolean | no |  | Include All Statuses. |
| `name` | string | yes |  | Task Name. |
| `status` | string | no |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `assigneeId` | string | no |  | Assignee. A value the product loads from the provider, such as an id; write the value itself. |
| `projectId` | string | no |  | Project. A value the product loads from the provider, such as an id; write the value itself. |

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

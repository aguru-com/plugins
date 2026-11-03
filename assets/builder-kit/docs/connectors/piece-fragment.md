# Fragment

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-fragment'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> You can obtain your API token by navigating to [Developer Settings](https://app.onfragment.com/settings/account/developers).

## Actions

### `create_task`

**Create Task.** Creates a new task in Fragment with a title and optional URL, due date, assignee email, tags, and custom fields. Use to add a work item to a Fragment queue. Not idempotent: each call creates a separate task even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The title of the task. |
| `url` | string | no |  | URL. A URL associated with the task (e.g., link to a ticket or resource) |
| `due_at` | ISO date-time string | no |  | Due Date. When the task is due. |
| `assignee` | string | no |  | Assignee. Email of the person to assign this task to. |
| `tags` | array | no |  | Tags. Tags to categorize the task. |
| `custom_fields` | object | no |  | Custom Fields. Additional custom fields for the task. |

### `update_task`

**Update Task.** Updates an existing Fragment task identified by its task UID, changing any of title, URL, due date, status (TODO/STARTED/DONE), assignee email, tags, or custom fields. Only the fields you supply are modified. Idempotent: re-applying the same field values to the same task yields the same end state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_uid` | string | yes |  | Task UID. The unique identifier of the task to update. |
| `title` | string | no |  | Title. The updated title of the task. |
| `url` | string | no |  | URL. The updated URL for the task. |
| `due_at` | ISO date-time string | no |  | Due Date. The updated due date. |
| `status` | string | no |  | Status. The status of the task. One of `"TODO"`, `"STARTED"`, `"DONE"`. |
| `assignee` | string | no |  | Assignee. Email of the person to assign this task to. |
| `tags` | array | no |  | Tags. Updated tags for the task. |
| `custom_fields` | object | no |  | Custom Fields. Updated custom fields. |

### `get_task`

**Get Task.** Fetches the full details of a single Fragment task by its unique task UID. Use when you already have a task identifier and need its current data. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_uid` | string | yes |  | Task UID. The unique identifier of the task to retrieve. |

### `list_tasks`

**List Tasks.** Lists tasks from Fragment, optionally filtered by status (TODO/STARTED/DONE) and assignee, and capped by a limit (default 50). Omit the filters to return recent tasks across all statuses. Use to discover task UIDs or survey tasks before acting on them. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. Filter tasks by status. One of `"TODO"`, `"STARTED"`, `"DONE"`. |
| `assignee` | string | no |  | Assignee. Filter tasks by assignee email or ID. |
| `limit` | number | no | `50` | Limit. Maximum number of tasks to return (default: 50) |

### `delete_task`

**Delete Task.** Permanently deletes a Fragment task identified by its unique task UID. Use to remove a task; this is destructive and cannot be undone. Effectively idempotent: re-deleting an already-removed task has no further effect, though the API may return a not-found error. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_uid` | string | yes |  | Task UID. The unique identifier of the task to delete. |

### `custom_api_call`

**Custom API Call.** Make a custom API call to any Fragment endpoint. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `method` | string | yes |  | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `headers` | object | yes |  | Headers. Authorization headers are injected automatically from your connection. |
| `queryParams` | object | yes |  | Query Parameters. |
| `body_type` | string | no | `"none"` | Body Type. One of `"none"`, `"json"`, `"form_data"`, `"raw"`. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary ?. Enable for files like PDFs, images, etc. |
| `failsafe` | boolean | no |  | No Error on Failure. |
| `timeout` | number | no |  | Timeout (in seconds). |
| `followRedirects` | boolean | no | `false` | Follow redirects. |

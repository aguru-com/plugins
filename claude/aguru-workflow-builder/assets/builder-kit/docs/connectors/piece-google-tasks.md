# Google Tasks

Task list management application

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-tasks'
  version: '0.7.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `add_task`

**Add Task.** Creates a new task in a specific Google Tasks list, with optional notes, due date, and a completed flag. Use to add a to-do item for the authenticated user; requires a valid task-list ID (resolve it first if you only have a list name). Not idempotent: each call appends a separate task even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tasks_list` | string | yes |  | Task List. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. |
| `notes` | string | no |  | Notes. |
| `due` | ISO date-time string | no |  | Due Date. Google Tasks keeps the date only; the time is ignored. |
| `completed` | boolean | no | `false` | Completed. Add the task already checked off. |

Output fields:

- `body`: Task
- `body.title`: Title
- `body.status`: Status
- `body.id`: Task ID
- `body.notes`: Notes
- `body.due`: Due Date (date)
- `body.completed`: Completed At (datetime)
- `body.updated`: Updated At (datetime)
- `body.parent`: Parent Task ID
- `body.position`: Position
- `body.webViewLink`: Task Link (url)

### `find_tasks`

**Find Tasks.** List tasks in a task list, filtered by due/completed/updated date ranges and status. The piece is otherwise write-only — call this first to find a task's id before completing, updating, or deleting it. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tasks_list` | string | yes |  | Task List. A value the product loads from the provider, such as an id; write the value itself. |
| `show_completed` | boolean | no | `true` | Show Completed. Include completed tasks in results. Defaults to true. |
| `show_hidden` | boolean | no | `false` | Show Hidden. Include hidden tasks (tasks that have been completed and a day has passed). Defaults to false. |
| `due_min` | ISO date-time string | no |  | Due Date From. Return tasks due on or after this date. RFC 3339 timestamp, e.g. 2026-06-01T00:00:00Z. |
| `due_max` | ISO date-time string | no |  | Due Date To. Return tasks due before this date (exclusive). RFC 3339 timestamp, e.g. 2026-07-01T00:00:00Z. |
| `completed_min` | ISO date-time string | no |  | Completed Date From. Return tasks completed on or after this date. RFC 3339 timestamp. |
| `completed_max` | ISO date-time string | no |  | Completed Date To. Return tasks completed before this date (exclusive). RFC 3339 timestamp. |
| `updated_min` | ISO date-time string | no |  | Updated Since. Return tasks last modified on or after this date. Useful for "since last run" incremental reads. RFC 3339 timestamp. |
| `max_results` | number | no |  | Max Results. Maximum number of tasks to return (1–100). Defaults to 20 when omitted. |

Output fields:

- `tasks`: Tasks
- `tasks[].title`: Title
- `tasks[].status`: Status
- `tasks[].id`: Task ID
- `tasks[].notes`: Notes
- `tasks[].due`: Due Date (date)
- `tasks[].completed`: Completed At (datetime)
- `tasks[].updated`: Updated At (datetime)
- `tasks[].parent`: Parent Task ID
- `tasks[].position`: Position
- `tasks[].webViewLink`: Task Link (url)
- `count`: Count (number)

### `complete_task`

**Mark Task Complete.** Mark an existing task as completed (by task id). Idempotent — re-completing a done task is a no-op. Use Update Task to reopen or edit other fields. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tasks_list` | string | yes |  | Task List. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task ID. The ID of the task to mark as completed. Obtain the id from Find Tasks. |

Output fields:

- `title`: Title
- `status`: Status
- `id`: Task ID
- `notes`: Notes
- `due`: Due Date (date)
- `completed`: Completed At (datetime)
- `updated`: Updated At (datetime)
- `parent`: Parent Task ID
- `position`: Position
- `webViewLink`: Task Link (url)

### `update_task`

**Update Task.** Edit an existing task's title, notes, due date, or status (e.g. rename, change due date, reopen). Partial update — only provided fields change. Not idempotent (use Mark Task Complete for the common complete case). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tasks_list` | string | yes |  | Task List. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task ID. The ID of the task to update. Obtain the id from Find Tasks. |
| `title` | string | no |  | Title. New title for the task. |
| `notes` | string | no |  | Notes. New notes / description for the task. |
| `due` | ISO date-time string | no |  | Due Date. New due date for the task. RFC 3339 timestamp, e.g. 2026-07-15T00:00:00Z. |
| `status` | string | no |  | Status. Task status. To simply complete a task prefer Mark Task Complete; set needsAction here to reopen a completed task. One of `"needsAction"`, `"completed"`. |

Output fields:

- `title`: Title
- `status`: Status
- `id`: Task ID
- `notes`: Notes
- `due`: Due Date (date)
- `completed`: Completed At (datetime)
- `updated`: Updated At (datetime)
- `parent`: Parent Task ID
- `position`: Position
- `webViewLink`: Task Link (url)

### `delete_task`

**Delete Task.** Delete a task by id. Idempotent — deleting an already-removed task succeeds (converges to absent). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tasks_list` | string | yes |  | Task List. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task ID. The ID of the task to delete. Obtain the id from Find Tasks. |

Output fields:

- `deleted`: Deleted (boolean)
- `alreadyAbsent`: Already Absent (boolean)

### `create_task`

**Create Task.** Create a new task in a task list, optionally as a subtask of a parent task (parent_task_id) and/or positioned after a sibling (previous_task_id); resolve those ids via Find Tasks. Use to add a single to-do; for marking an existing task done use Mark Task Complete. Not idempotent — each call creates a separate task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tasks_list` | string | yes |  | Task List. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. |
| `notes` | string | no |  | Notes. |
| `due_date` | ISO date-time string | no |  | Due Date. Google Tasks keeps the date only; the time is ignored. |
| `parent_task_id` | string | no |  | Parent Task ID. Make this a subtask of the task with this id (must be in the same list). Obtain the id from Find Tasks. Omit to create a top-level task. |
| `previous_task_id` | string | no |  | Previous Task ID. Place the new task immediately after the sibling with this id. Obtain the id from Find Tasks. Omit to place it first among its siblings. |

Output fields:

- `title`: Title
- `status`: Status
- `id`: Task ID
- `notes`: Notes
- `due`: Due Date (date)
- `completed`: Completed At (datetime)
- `updated`: Updated At (datetime)
- `parent`: Parent Task ID
- `position`: Position
- `webViewLink`: Task Link (url)

### `get_task`

**Get Task.** Fetch a single task's full details (title, notes, due, status, parent, position, links) by its id. Use when you already have a specific task id and want its current state; to find tasks by criteria use Find Tasks instead. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tasks_list` | string | yes |  | Task List. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task ID. The ID of the task to fetch. Obtain the id from Find Tasks. |

Output fields:

- `title`: Title
- `status`: Status
- `id`: Task ID
- `notes`: Notes
- `due`: Due Date (date)
- `completed`: Completed At (datetime)
- `updated`: Updated At (datetime)
- `parent`: Parent Task ID
- `position`: Position
- `webViewLink`: Task Link (url)

### `move_task`

**Move Task.** Move a task to a new position within its list — reparent it under another task (parent_task_id) and/or place it after a sibling (previous_task_id); omit both to move it to the top level. Optionally move it to a different list (destination_tasklist_id). All ids come from Find Tasks, and parent/previous must reference tasks in the destination list. Use this for reordering/nesting; use Update Task to change a task's fields. Not idempotent — position depends on current order. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tasks_list` | string | yes |  | Task List. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task ID. The ID of the task to move. Obtain the id from Find Tasks. |
| `parent_task_id` | string | no |  | Parent Task ID. Reparent the task under the task with this id (must be in the destination list). Obtain the id from Find Tasks. Omit to move it to the top level. |
| `previous_task_id` | string | no |  | Previous Task ID. Place the task immediately after the sibling with this id (must be in the destination list). Obtain the id from Find Tasks. Omit to place it first among its siblings; to move it to the end, pass the last sibling's id (read the current order with Find Tasks). |
| `destination_tasklist_id` | string | no |  | Destination Task List ID. Move the task to this task list. Omit to keep it in the current list. Recurring tasks cannot be moved between lists. |

Output fields:

- `title`: Title
- `status`: Status
- `id`: Task ID
- `notes`: Notes
- `due`: Due Date (date)
- `completed`: Completed At (datetime)
- `updated`: Updated At (datetime)
- `parent`: Parent Task ID
- `position`: Position
- `webViewLink`: Task Link (url)

### `clear_completed_tasks`

**Clear Completed Tasks.** Hide all completed tasks in a task list (they are marked hidden and drop out of the default view, not permanently deleted). Use to tidy a list after a batch of completions. Affects every completed task at once — there is no per-task selection; to remove a single task use Delete Task. Not idempotent — operates on whatever is completed at call time. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tasks_list` | string | yes |  | Task List. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `cleared`: Cleared (boolean)

### `list_task_lists`

**List Task Lists.** List the authenticated user's task lists, returning each list's id and title. Use to resolve a list name to its id before operating on tasks, or to discover available lists. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `max_results` | number | no |  | Max Results. Maximum number of task lists to return (1–100). Defaults to 20 when omitted. |

Output fields:

- `taskLists`: Task Lists
- `taskLists[].title`: Title
- `taskLists[].id`: Task List ID
- `taskLists[].updated`: Updated At (datetime)
- `count`: Count (number)

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

# MeisterTask

Intuitive online task manager for teams, personal productivity, and everything in between.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-meistertask'
  version: '0.2.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Authentication for MeisterTask (uses MindMeister OAuth2)

## Actions

### `create_label`

**Create Label.** Create a new label in a MeisterTask project, optionally with a hex color. Use to define a reusable tag for tasks; requires the target project and a label name. Not idempotent — each call creates another label even if one with the same name already exists (use Find or Create Label to avoid duplicates). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Label Name. |
| `color` | string | no |  | Color. Hex color code (e.g., #FF0000) |

### `create_task_label`

**Create Task Label.** Attach an existing project label to a specific task in MeisterTask, creating the task-label association. Use to tag a task with an already-defined label; requires the task ID and the label ID. Not idempotent — each call adds another label association. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task. A value the product loads from the provider, such as an id; write the value itself. |
| `label` | string | yes |  | Label. A value the product loads from the provider, such as an id; write the value itself. |

### `create_attachment`

**Create Attachment.** Upload a file as an attachment on a specific MeisterTask task, with an optional display name. Use to attach a document or image to a task; requires the task ID and the file. Not idempotent — each call adds another attachment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task. A value the product loads from the provider, such as an id; write the value itself. |
| `file_url` | file | yes |  | File URL. URL of the file to attach. Files are not supported; an action that needs one fails. |
| `name` | string | no |  | Attachment Name. |

### `create_task`

**Create Task.** Create a new task within a section of a MeisterTask project, optionally setting notes, an assignee, and a due date. Use to add a to-do item to a board; requires the target section and a task name. Not idempotent — each call creates another task even if the name matches an existing one (use Find or Create Task to avoid duplicates). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `section` | string | yes |  | Section. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Task Name. |
| `notes` | string | no |  | Notes. |
| `assigned_to` | string | no |  | Person. A value the product loads from the provider, such as an id; write the value itself. |
| `due_date` | ISO date-time string | no |  | Due Date. |

### `update_task`

**Update Task.** Update fields on an existing MeisterTask task identified by task ID — name, notes, status (Open, Completed, or Trashed), assignee, or due date. Use to change or close out a known task; only the fields you supply are modified. Idempotent: re-sending the same field values leaves the task in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `Project` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Task Name. |
| `notes` | string | no |  | Notes. |
| `status` | string | no |  | Status. One of `1`, `2`, `18`. |
| `assigned_to` | string | no |  | Person. A value the product loads from the provider, such as an id; write the value itself. |
| `due_date` | ISO date-time string | no |  | Due Date. |

### `find_attachment`

**Find Attachment.** Look up attachments on a specific MeisterTask task and return the first match. With a name supplied it returns the first attachment whose name contains that text (case-insensitive); leaving the name empty returns the first attachment on the task. Read-only and idempotent. Requires the task ID; returns null if no attachment matches. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Attachment Name. |

### `find_label`

**Find Label.** Search a MeisterTask project's labels by name and return the first one whose name contains the given text (case-insensitive). Use to resolve a label name to its record/ID before tagging tasks. Read-only and idempotent. Requires the project and a name; returns null if no label matches. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Label Name. |

### `find_person`

**Find Person.** Retrieve a single MeisterTask person (user) by their numeric person ID. Use to resolve a known ID into the person's details such as name and email. Read-only and idempotent; requires the exact person ID — it does not search by name. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `person_id` | number | yes |  | Person ID. |

### `find_task`

**Find Task.** Look up tasks in a specific MeisterTask section and return the first match. With a name supplied it returns the first task whose name contains that text (case-insensitive); leaving the name empty returns the first task in the section. Read-only and idempotent. Requires the project and section; returns null if no task matches. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `section` | string | yes |  | Section. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Task Name. |

### `find_or_create_attachment`

**Find or Create Attachment.** Ensure an attachment with a given name exists on a MeisterTask task: returns the existing attachment if one matches the name exactly (case-insensitive), otherwise uploads the supplied file under that name. Use to attach a file at most once. Idempotent on the name — repeat calls return the existing attachment rather than uploading again. Requires the task ID, a name, and the file. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Attachment Name. |
| `file_url` | file | yes |  | File URL. URL of the file to attach (used if creating) Files are not supported; an action that needs one fails. |

### `find_or_create_task`

**Find or Create Task.** Ensure a task with a given name exists in a MeisterTask section: returns the existing task if one matches the name exactly (case-insensitive), otherwise creates it with the supplied notes, assignee, and due date. Use to add a task without duplicating it. Idempotent on the name — repeat calls return the existing task rather than creating another. Requires the project, section, and task name. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `section` | string | yes |  | Section. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Task Name. |
| `notes` | string | no |  | Notes. Notes for the task (used if creating) |
| `assigned_to` | string | no |  | Person. A value the product loads from the provider, such as an id; write the value itself. |
| `due_date` | ISO date-time string | no |  | Due Date. Due date for the task (used if creating) |

### `find_or_create_label`

**Find or Create Label.** Ensure a label with a given name exists in a MeisterTask project: returns the existing label if one matches the name exactly (case-insensitive), otherwise creates it with the optional hex color. Use to obtain a label without duplicating it. Idempotent on the name — repeat calls return the existing label rather than creating another. Requires the project and a label name. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Label Name. |
| `color` | string | no |  | Color. Hex color code (e.g., #FF0000) - used if creating. |

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

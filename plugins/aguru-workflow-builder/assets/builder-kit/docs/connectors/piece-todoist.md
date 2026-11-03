# Todoist

To-do list and task manager

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-todoist'
  version: '0.6.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `create_task`

**Create Task.** Creates a new task in Todoist with content, optional description, labels, priority (1-4), and a natural-language or ISO due date. Use to add a to-do item; without a project_id it lands in the user's Inbox. Not idempotent: each call appends a separate task even if the content is identical. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project. Leave empty to add the task to your Inbox. A value the product loads from the provider, such as an id; write the value itself. |
| `section_id` | string | no |  | Section. Leave empty to add the task outside any section. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | Title. Markdown and links are supported. |
| `description` | string | no |  | Description. Extra details shown under the title. Markdown is supported. |
| `labels` | array | no |  | Labels. Names of personal or shared labels to add. |
| `priority` | number | no |  | Priority. 1 is normal, 4 is urgent; Todoist shows 4 as P1. |
| `due_date` | string | no |  | Due Date. YYYY-MM-DD or English words. Repeating dates work too. |

Output fields:

- `id`: Task ID
- `content`: Content
- `description`: Description
- `project_id`: Project ID
- `section_id`: Section ID
- `parent_id`: Parent Task ID
- `labels`: Labels
- `priority`: Priority (number)
- `due`: Due
- `due.date`: Date (date)
- `due.string`: Human-Readable Date
- `due.is_recurring`: Is Recurring (boolean)
- `due.timezone`: Timezone
- `checked`: Completed (boolean)
- `is_deleted`: Is Deleted (boolean)
- `added_at`: Added At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `added_by_uid`: Added By User ID
- `completed_by_uid`: Completed By User ID
- `responsible_uid`: Assigned To User ID

### `update_task`

**Update Task.** Updates fields (content, description, labels, priority, due date) on an existing Todoist task identified by task_id. Use to edit a task you already know the ID of; only the fields you pass are changed. Idempotent: re-sending the same values overwrites to the same end state with no extra effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The task's ID, from a Create Task or Find Task step. |
| `content` | string | no |  | Title. Markdown and links are supported. |
| `description` | string | no |  | Description. Extra details shown under the title. Markdown is supported. |
| `labels` | array | no |  | Labels. Replaces the task's labels with these names. |
| `priority` | number | no |  | Priority. 1 is normal, 4 is urgent; Todoist shows 4 as P1. |
| `due_date` | string | no |  | Due Date. YYYY-MM-DD or English words. Repeating dates work too. |

Output fields:

- `id`: Task ID
- `content`: Content
- `description`: Description
- `project_id`: Project ID
- `section_id`: Section ID
- `parent_id`: Parent Task ID
- `labels`: Labels
- `priority`: Priority (number)
- `due`: Due
- `due.date`: Date (date)
- `due.string`: Human-Readable Date
- `due.is_recurring`: Is Recurring (boolean)
- `due.timezone`: Timezone
- `checked`: Completed (boolean)
- `is_deleted`: Is Deleted (boolean)
- `added_at`: Added At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `added_by_uid`: Added By User ID
- `completed_by_uid`: Completed By User ID
- `responsible_uid`: Assigned To User ID

### `find_task`

**Find Task.** Looks up an active Todoist task by exact content match, optionally scoped to one project (all projects if left blank). Use to resolve a task name to its full record (including its ID) before updating or completing it. Read-only and idempotent; errors if no task matches the name exactly. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Title. Matches an open task whose title is exactly this text. |
| `project_id` | string | no |  | Project. Leave empty to search every project. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Task ID
- `content`: Content
- `description`: Description
- `project_id`: Project ID
- `section_id`: Section ID
- `parent_id`: Parent Task ID
- `labels`: Labels
- `priority`: Priority (number)
- `due`: Due
- `due.date`: Date (date)
- `due.string`: Human-Readable Date
- `due.is_recurring`: Is Recurring (boolean)
- `due.timezone`: Timezone
- `checked`: Completed (boolean)
- `is_deleted`: Is Deleted (boolean)
- `added_at`: Added At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `added_by_uid`: Added By User ID
- `completed_by_uid`: Completed By User ID
- `responsible_uid`: Assigned To User ID

### `mark_task_completed`

**Mark Task as Completed.** Closes (completes) an active Todoist task by its task_id; recurring tasks advance to their next occurrence. Use once you have the task ID (e.g. from Find Task) and want to mark it done. Idempotent: completing an already-completed task leaves it completed with no additional effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The task's ID, from a Create Task or Find Task step. |

### `todoist_create_task`

**Create Task.** Creates a new Todoist task from explicit structured fields (content, project, section, labels, priority 1-4, due date). Use this when you already have the individual field values; if you only have a free-text sentence like "buy milk tomorrow #Shopping p1", prefer Quick Add Task which parses inline syntax. Without a project it lands in the Inbox. Not idempotent: each call appends a separate task even with identical content. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project. Task project ID. If not set, task is put to user's Inbox. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | content. The task's content. It may contain some markdown-formatted text and hyperlinks. |
| `description` | string | no |  | Description. A description for the task. This value may contain some markdown-formatted text and hyperlinks. |
| `labels` | array | no |  | Labels. The task's labels (a list of names that may represent either personal or shared labels) |
| `priority` | number | no |  | Priority. Task priority from 1 (normal) to 4 (urgent) |
| `due_date` | string | no |  | Due date. Can be either a specific date in YYYY-MM-DD format relative to user's timezone, a specific date and time in RFC3339 format, or a human defined date (e.g. 'next Monday') using local time. |
| `section_id` | string | no |  | Section. Leave empty to add the task outside any section. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Task ID
- `content`: Content
- `description`: Description
- `project_id`: Project ID
- `section_id`: Section ID
- `parent_id`: Parent Task ID
- `labels`: Labels
- `priority`: Priority (number)
- `due`: Due
- `due.date`: Date (date)
- `due.string`: Human-Readable Date
- `due.is_recurring`: Is Recurring (boolean)
- `due.timezone`: Timezone
- `checked`: Completed (boolean)
- `is_deleted`: Is Deleted (boolean)
- `added_at`: Added At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `added_by_uid`: Added By User ID
- `completed_by_uid`: Completed By User ID
- `responsible_uid`: Assigned To User ID

### `todoist_update_task`

**Update Task.** Updates content, description, labels, priority, or due date on an existing Todoist task identified by task_id. Use to edit a task you already have the ID for (resolve a name via Find Task first); only the fields you pass are changed. This endpoint cannot change a task's project or section — use Move Task for that. Idempotent: re-sending the same values yields the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The ID of the task to update (obtain from Find Task, Filter Tasks, or Get Task). |
| `content` | string | no |  | content. The task's content. It may contain some markdown-formatted text and hyperlinks. |
| `description` | string | no |  | Description. A description for the task. This value may contain some markdown-formatted text and hyperlinks. |
| `labels` | array | no |  | Labels. The task's labels (a list of names that may represent either personal or shared labels) |
| `priority` | number | no |  | Priority. Task priority from 1 (normal) to 4 (urgent) |
| `due_date` | string | no |  | Due date. Can be either a specific date in YYYY-MM-DD format relative to user's timezone, a specific date and time in RFC3339 format, or a human defined date (e.g. 'next Monday') using local time. |

Output fields:

- `id`: Task ID
- `content`: Content
- `description`: Description
- `project_id`: Project ID
- `section_id`: Section ID
- `parent_id`: Parent Task ID
- `labels`: Labels
- `priority`: Priority (number)
- `due`: Due
- `due.date`: Date (date)
- `due.string`: Human-Readable Date
- `due.is_recurring`: Is Recurring (boolean)
- `due.timezone`: Timezone
- `checked`: Completed (boolean)
- `is_deleted`: Is Deleted (boolean)
- `added_at`: Added At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `added_by_uid`: Added By User ID
- `completed_by_uid`: Completed By User ID
- `responsible_uid`: Assigned To User ID

### `todoist_find_task`

**Find Task.** Looks up a single active Todoist task by exact content match, optionally scoped to one project (all projects if blank). Use to resolve a known task name to its full record and ID before updating, moving, completing, or deleting it. For querying by date/priority/label or returning many matches, use Filter Tasks instead. Read-only and idempotent; errors if no task matches exactly. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The name of the task to search for. |
| `project_id` | string | no |  | Project. Search for tasks within the selected project. If left blank, then all projects are searched. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Task ID
- `content`: Content
- `description`: Description
- `project_id`: Project ID
- `section_id`: Section ID
- `parent_id`: Parent Task ID
- `labels`: Labels
- `priority`: Priority (number)
- `due`: Due
- `due.date`: Date (date)
- `due.string`: Human-Readable Date
- `due.is_recurring`: Is Recurring (boolean)
- `due.timezone`: Timezone
- `checked`: Completed (boolean)
- `is_deleted`: Is Deleted (boolean)
- `added_at`: Added At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `added_by_uid`: Added By User ID
- `completed_by_uid`: Completed By User ID
- `responsible_uid`: Assigned To User ID

### `todoist_complete_task`

**Complete Task.** Closes (completes) an active Todoist task by its task_id. Use once you have the ID (e.g. from Find Task) and want to mark it done; to permanently remove a task instead use Delete Task, and to undo a completion use Reopen Task. Idempotent for non-recurring tasks (re-closing a completed task is a no-op), but each close of a RECURRING task advances it to its next due date, so do not call it twice for one occurrence. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The ID of the task to complete (obtain from Find Task, Filter Tasks, or Get Task). |

### `todoist_filter_tasks`

**Filter Tasks.** Returns active tasks matching a Todoist filter query (e.g. "today | overdue", "p1 & !#Work", "search: meeting", "no due date"). Use this to find tasks by date, priority, label, or project rather than by exact name; for a single task whose exact title you already know use Find Task instead. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Todoist filter query. Examples: "today \| overdue", "p1 & !#Work", "search: meeting", "no due date". Uses Todoist's native filter syntax. |
| `lang` | string | no |  | Language. IETF language code for parsing date keywords in the query (e.g. "en", "de"). Defaults to the account language. |
| `limit` | number | no |  | Limit. Maximum number of tasks to return per page (1-200, default 50). All matching pages are followed automatically. |

Output fields:

- `tasks`: Tasks
- `tasks[].id`: Task ID
- `tasks[].content`: Content
- `tasks[].description`: Description
- `tasks[].project_id`: Project ID
- `tasks[].section_id`: Section ID
- `tasks[].parent_id`: Parent Task ID
- `tasks[].labels`: Labels
- `tasks[].priority`: Priority (number)
- `tasks[].due`: Due
- `tasks[].due.date`: Date (date)
- `tasks[].due.string`: Human-Readable Date
- `tasks[].due.is_recurring`: Is Recurring (boolean)
- `tasks[].due.timezone`: Timezone
- `tasks[].checked`: Completed (boolean)
- `tasks[].is_deleted`: Is Deleted (boolean)
- `tasks[].added_at`: Added At (datetime)
- `tasks[].updated_at`: Updated At (datetime)
- `tasks[].completed_at`: Completed At (datetime)
- `tasks[].added_by_uid`: Added By User ID
- `tasks[].completed_by_uid`: Completed By User ID
- `tasks[].responsible_uid`: Assigned To User ID
- `count`: Count (number)

### `todoist_delete_task`

**Delete Task.** Permanently deletes a Todoist task (and its sub-tasks) by task_id. This is destructive and not recoverable via the API — prefer Complete Task when the work is simply done, since completing preserves history. Resolve the ID via Find Task or Filter Tasks first. Idempotent: deleting an already-deleted task is treated as success. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The ID of the task to delete (obtain from Find Task, Filter Tasks, or Get Task). |

### `todoist_reopen_task`

**Reopen Task.** Reopens a completed Todoist task by task_id, restoring it to the active list (the inverse of Complete Task). Use to undo a completion. Idempotent: reopening an already-active task is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The ID of the completed task to reopen (obtain from a completed-task list or Get Task). |

### `todoist_move_task`

**Move Task.** Reparents a Todoist task to a different project, section, or parent task. Provide task_id plus at least one destination (project, section, or parent). Use this to relocate a task — Update Task cannot change a task's project or section. All IDs must be the 16-character base32 form returned by Find Task / Filter Tasks. Idempotent: moving to the same destination is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The ID of the task to move (obtain from Find Task or Filter Tasks). |
| `project_id` | string | no |  | Destination Project ID. Move the task into this project. 16-character base32 ID from List Projects. Provide at least one of project, section, or parent. |
| `section_id` | string | no |  | Destination Section ID. Move the task into this section. 16-character base32 ID from List Sections. Provide at least one of project, section, or parent. |
| `parent_id` | string | no |  | Parent Task ID. Make the task a sub-task of this parent task. 16-character base32 ID. Provide at least one of project, section, or parent. |

Output fields:

- `id`: Task ID
- `content`: Content
- `description`: Description
- `project_id`: Project ID
- `section_id`: Section ID
- `parent_id`: Parent Task ID
- `labels`: Labels
- `priority`: Priority (number)
- `due`: Due
- `due.date`: Date (date)
- `due.string`: Human-Readable Date
- `due.is_recurring`: Is Recurring (boolean)
- `due.timezone`: Timezone
- `checked`: Completed (boolean)
- `is_deleted`: Is Deleted (boolean)
- `added_at`: Added At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `added_by_uid`: Added By User ID
- `completed_by_uid`: Completed By User ID
- `responsible_uid`: Assigned To User ID

### `todoist_quick_add_task`

**Quick Add Task.** Creates a Todoist task by parsing a natural-language sentence with inline syntax — e.g. "Buy milk tomorrow #Shopping @errands p1" sets the due date, project, label, and priority. Prefer this when you have a free-text instruction; use Create Task when you already have the fields broken out separately. Not idempotent: each call creates a new task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The task text with inline syntax. Use #Project to set the project, @label for labels, p1-p4 for priority, and natural-language dates. Example: "Submit report by Friday 5pm #Work p2". |
| `note` | string | no |  | Note. Optional note (comment) to attach to the created task. |
| `reminder` | string | no |  | Reminder. Optional natural-language reminder, e.g. "tomorrow at 9am". |
| `auto_reminder` | boolean | no |  | Auto Reminder. Add a default reminder to the task if it has a due time. |

Output fields:

- `id`: Task ID
- `content`: Content
- `description`: Description
- `project_id`: Project ID
- `section_id`: Section ID
- `parent_id`: Parent Task ID
- `labels`: Labels
- `priority`: Priority (number)
- `due`: Due
- `due.date`: Date (date)
- `due.string`: Human-Readable Date
- `due.is_recurring`: Is Recurring (boolean)
- `due.timezone`: Timezone
- `checked`: Completed (boolean)
- `is_deleted`: Is Deleted (boolean)
- `added_at`: Added At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `added_by_uid`: Added By User ID
- `completed_by_uid`: Completed By User ID
- `responsible_uid`: Assigned To User ID

### `todoist_get_task`

**Get Task.** Fetches the full current record of one Todoist task by its task_id. Use when you already have an ID (e.g. from a trigger or webhook payload) and need the task's up-to-date state. To find a task whose ID you do not yet know, use Find Task or Filter Tasks. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The ID of the task to fetch (e.g. from a trigger payload, Find Task, or Filter Tasks). |

Output fields:

- `id`: Task ID
- `content`: Content
- `description`: Description
- `project_id`: Project ID
- `section_id`: Section ID
- `parent_id`: Parent Task ID
- `labels`: Labels
- `priority`: Priority (number)
- `due`: Due
- `due.date`: Date (date)
- `due.string`: Human-Readable Date
- `due.is_recurring`: Is Recurring (boolean)
- `due.timezone`: Timezone
- `checked`: Completed (boolean)
- `is_deleted`: Is Deleted (boolean)
- `added_at`: Added At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `added_by_uid`: Added By User ID
- `completed_by_uid`: Completed By User ID
- `responsible_uid`: Assigned To User ID

### `todoist_list_completed_tasks`

**List Completed Tasks (by Completion Date).** Lists tasks that were completed (checked off) between the since and until timestamps. Use this for "what got done in this period" reports keyed on when work was finished; use List Completed Tasks by Due Date instead to key on when tasks were originally due. The window is bounded (roughly 3 months max). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `since` | string | yes |  | Since. Start of the window, RFC3339 datetime (e.g. "2026-06-01T00:00:00Z"). Tasks completed at or after this time are included. |
| `until` | string | yes |  | Until. End of the window, RFC3339 datetime (e.g. "2026-06-27T23:59:59Z"). Must be within ~3 months of Since. |
| `project_id` | string | no |  | Project ID. Optional. Limit results to this project (16-character base32 ID from List Projects). |
| `section_id` | string | no |  | Section ID. Optional. Limit results to this section (16-character base32 ID from List Sections). |
| `parent_id` | string | no |  | Parent Task ID. Optional. Limit results to sub-tasks of this parent task. |
| `filter_query` | string | no |  | Filter Query. Optional Todoist filter query to further narrow the results (same syntax as Filter Tasks). |
| `limit` | number | no |  | Limit. Maximum tasks per page (default 200). All pages are followed automatically. |

Output fields:

- `tasks`: Tasks
- `tasks[].id`: Task ID
- `tasks[].content`: Content
- `tasks[].description`: Description
- `tasks[].project_id`: Project ID
- `tasks[].section_id`: Section ID
- `tasks[].parent_id`: Parent Task ID
- `tasks[].labels`: Labels
- `tasks[].priority`: Priority (number)
- `tasks[].due`: Due
- `tasks[].due.date`: Date (date)
- `tasks[].due.string`: Human-Readable Date
- `tasks[].due.is_recurring`: Is Recurring (boolean)
- `tasks[].due.timezone`: Timezone
- `tasks[].checked`: Completed (boolean)
- `tasks[].is_deleted`: Is Deleted (boolean)
- `tasks[].added_at`: Added At (datetime)
- `tasks[].updated_at`: Updated At (datetime)
- `tasks[].completed_at`: Completed At (datetime)
- `tasks[].added_by_uid`: Added By User ID
- `tasks[].completed_by_uid`: Completed By User ID
- `tasks[].responsible_uid`: Assigned To User ID
- `count`: Count (number)

### `todoist_list_completed_tasks_by_due_date`

**List Completed Tasks (by Due Date).** Lists completed tasks whose original DUE date falls between since and until. Use this for "what was scheduled for this period and got done" reports; use List Completed Tasks (by Completion Date) instead to key on when each task was actually finished. The window is bounded (roughly 6 weeks max). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `since` | string | yes |  | Since. Start of the due-date window, date "YYYY-MM-DD" or RFC3339 datetime (e.g. "2026-06-01"). |
| `until` | string | yes |  | Until. End of the due-date window, date "YYYY-MM-DD" or RFC3339 datetime (e.g. "2026-06-27"). Must be within the allowed window of Since. |
| `project_id` | string | no |  | Project ID. Optional. Limit results to this project (16-character base32 ID from List Projects). |
| `section_id` | string | no |  | Section ID. Optional. Limit results to this section (16-character base32 ID from List Sections). |
| `parent_id` | string | no |  | Parent Task ID. Optional. Limit results to sub-tasks of this parent task. |
| `filter_query` | string | no |  | Filter Query. Optional Todoist filter query to further narrow the results (same syntax as Filter Tasks). |
| `limit` | number | no |  | Limit. Maximum tasks per page (default 200). All pages are followed automatically. |

Output fields:

- `tasks`: Tasks
- `tasks[].id`: Task ID
- `tasks[].content`: Content
- `tasks[].description`: Description
- `tasks[].project_id`: Project ID
- `tasks[].section_id`: Section ID
- `tasks[].parent_id`: Parent Task ID
- `tasks[].labels`: Labels
- `tasks[].priority`: Priority (number)
- `tasks[].due`: Due
- `tasks[].due.date`: Date (date)
- `tasks[].due.string`: Human-Readable Date
- `tasks[].due.is_recurring`: Is Recurring (boolean)
- `tasks[].due.timezone`: Timezone
- `tasks[].checked`: Completed (boolean)
- `tasks[].is_deleted`: Is Deleted (boolean)
- `tasks[].added_at`: Added At (datetime)
- `tasks[].updated_at`: Updated At (datetime)
- `tasks[].completed_at`: Completed At (datetime)
- `tasks[].added_by_uid`: Added By User ID
- `tasks[].completed_by_uid`: Completed By User ID
- `tasks[].responsible_uid`: Assigned To User ID
- `count`: Count (number)

### `todoist_create_project`

**Create Project.** Creates a new Todoist project with the given name and optional color, parent project, view style, description and favorite flag. Use to add a fresh project; to nest it under another project pass that project's ID as parent_id (resolve via List Projects). Not idempotent: each call creates a separate project even with an identical name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Name of the new project. |
| `color` | string | no |  | Color. Color of the project icon. A Todoist color name, e.g. 'berry_red', 'blue', 'charcoal'. |
| `parent_id` | string | no |  | Parent Project ID. ID of a parent project to nest this project under, making it a sub-project. Resolve the name to an ID via List Projects. Leave blank for a top-level project. |
| `view_style` | string | no |  | View Style. How the project is displayed in Todoist. One of `"list"`, `"board"`. |
| `description` | string | no |  | Description. Description for the project. |
| `is_favorite` | boolean | no |  | Is Favorite. Whether the project is marked as a favorite. |

Output fields:

- `id`: Project ID
- `name`: Name
- `description`: Description
- `color`: Color
- `parent_id`: Parent Project ID
- `view_style`: View Style
- `inbox_project`: Is Inbox (boolean)
- `is_favorite`: Is Favorite (boolean)
- `is_archived`: Is Archived (boolean)
- `is_shared`: Is Shared (boolean)
- `creator_uid`: Creator User ID
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `todoist_update_project`

**Update Project.** Updates fields (name, color, view style, description, favorite flag) on an existing Todoist project identified by project_id. Use to edit a project once you have its ID (resolve via List Projects or Search Projects); only the fields you pass change. Idempotent: re-sending the same values overwrites to the same end state. Cannot reparent a project — use Move Task for tasks, not this. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. ID of the project to update. Resolve via List Projects or Search Projects. |
| `name` | string | no |  | Name. New name for the project. |
| `color` | string | no |  | Color. New color of the project icon. A Todoist color name, e.g. 'berry_red', 'blue', 'charcoal'. |
| `view_style` | string | no |  | View Style. How the project is displayed in Todoist. One of `"list"`, `"board"`. |
| `description` | string | no |  | Description. New description for the project. |
| `is_favorite` | boolean | no |  | Is Favorite. Whether the project is marked as a favorite. |

Output fields:

- `id`: Project ID
- `name`: Name
- `description`: Description
- `color`: Color
- `parent_id`: Parent Project ID
- `view_style`: View Style
- `inbox_project`: Is Inbox (boolean)
- `is_favorite`: Is Favorite (boolean)
- `is_archived`: Is Archived (boolean)
- `is_shared`: Is Shared (boolean)
- `creator_uid`: Creator User ID
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `todoist_get_project`

**Get Project.** Fetches the full record of one Todoist project by its project_id. Use when you already have a project ID (e.g. from a task or List Projects) and need its current details; to find a project by name use Search Projects or List Projects instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. ID of the project to fetch. Resolve via List Projects or Search Projects. |

Output fields:

- `id`: Project ID
- `name`: Name
- `description`: Description
- `color`: Color
- `parent_id`: Parent Project ID
- `view_style`: View Style
- `inbox_project`: Is Inbox (boolean)
- `is_favorite`: Is Favorite (boolean)
- `is_archived`: Is Archived (boolean)
- `is_shared`: Is Shared (boolean)
- `creator_uid`: Creator User ID
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `todoist_list_projects`

**List Projects.** Lists every Todoist project (active, not archived) with id and name. Use this to resolve a project name to its ID before any project-scoped operation, or to enumerate available projects; to match by a name fragment use Search Projects, for archived ones use List Archived Projects. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `projects`: Projects
- `projects[].id`: Project ID
- `projects[].name`: Name
- `projects[].description`: Description
- `projects[].color`: Color
- `projects[].parent_id`: Parent Project ID
- `projects[].view_style`: View Style
- `projects[].inbox_project`: Is Inbox (boolean)
- `projects[].is_favorite`: Is Favorite (boolean)
- `projects[].is_archived`: Is Archived (boolean)
- `projects[].is_shared`: Is Shared (boolean)
- `projects[].creator_uid`: Creator User ID
- `projects[].created_at`: Created At (datetime)
- `projects[].updated_at`: Updated At (datetime)
- `count`: Count (number)

### `todoist_search_projects`

**Search Projects.** Finds Todoist projects whose name contains the given query (case-insensitive substring match over all active projects). Use to resolve a project by a partial or remembered name to its ID; to list every project use List Projects, to fetch one known ID use Get Project. Read-only and idempotent; matches client-side, so a blank query returns all projects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Query. Case-insensitive substring to match against project names, e.g. 'work'. Leave blank to return all projects. |

Output fields:

- `projects`: Projects
- `projects[].id`: Project ID
- `projects[].name`: Name
- `projects[].description`: Description
- `projects[].color`: Color
- `projects[].parent_id`: Parent Project ID
- `projects[].view_style`: View Style
- `projects[].inbox_project`: Is Inbox (boolean)
- `projects[].is_favorite`: Is Favorite (boolean)
- `projects[].is_archived`: Is Archived (boolean)
- `projects[].is_shared`: Is Shared (boolean)
- `projects[].creator_uid`: Creator User ID
- `projects[].created_at`: Created At (datetime)
- `projects[].updated_at`: Updated At (datetime)
- `count`: Count (number)

### `todoist_unarchive_project`

**Unarchive Project.** Restores an archived Todoist project back to the active project list, identified by project_id. Use to bring back a project found via List Archived Projects; unarchiving an already-active project has no effect. Idempotent: re-running leaves the project active. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. ID of the archived project to restore. Resolve via List Archived Projects. |

### `todoist_list_archived_projects`

**List Archived Projects.** Lists the archived (personal) Todoist projects with id and name. Use to find an archived project so you can restore it with Unarchive Project; for active projects use List Projects instead. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `projects`: Projects
- `projects[].id`: Project ID
- `projects[].name`: Name
- `projects[].description`: Description
- `projects[].color`: Color
- `projects[].parent_id`: Parent Project ID
- `projects[].view_style`: View Style
- `projects[].inbox_project`: Is Inbox (boolean)
- `projects[].is_favorite`: Is Favorite (boolean)
- `projects[].is_archived`: Is Archived (boolean)
- `projects[].is_shared`: Is Shared (boolean)
- `projects[].creator_uid`: Creator User ID
- `projects[].created_at`: Created At (datetime)
- `projects[].updated_at`: Updated At (datetime)
- `count`: Count (number)

### `todoist_create_section`

**Create Section.** Creates a new section with the given name inside a specific project, identified by project_id. Use to add a column/grouping to a project; resolve the project ID via List Projects first. Not idempotent: each call creates a separate section even with an identical name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Name of the new section. |
| `project_id` | string | yes |  | Project ID. ID of the project to add the section to. Resolve via List Projects or Search Projects. |
| `order` | number | no |  | Order. Order of the section among the other sections in the project (lower is higher). |

Output fields:

- `id`: Section ID
- `name`: Name
- `description`: Description
- `project_id`: Project ID
- `section_order`: Order (number)
- `is_archived`: Is Archived (boolean)
- `is_deleted`: Is Deleted (boolean)
- `added_at`: Added At (datetime)
- `updated_at`: Updated At (datetime)
- `archived_at`: Archived At (datetime)

### `todoist_update_section`

**Update Section.** Renames an existing Todoist section identified by section_id (rename is the only field the section update endpoint supports). Use once you have the section ID (resolve via List Sections or Search Sections); to move a section to a different project this endpoint cannot help. Idempotent: re-sending the same name leaves the section at the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `section_id` | string | yes |  | Section ID. ID of the section to rename. Resolve via List Sections or Search Sections. |
| `name` | string | yes |  | Name. New name for the section. |

Output fields:

- `id`: Section ID
- `name`: Name
- `description`: Description
- `project_id`: Project ID
- `section_order`: Order (number)
- `is_archived`: Is Archived (boolean)
- `is_deleted`: Is Deleted (boolean)
- `added_at`: Added At (datetime)
- `updated_at`: Updated At (datetime)
- `archived_at`: Archived At (datetime)

### `todoist_get_section`

**Get Section.** Fetches the full record of one Todoist section by its section_id (including its name and parent project_id). Use when you already have a section ID and need its current details; to find a section by name use Search Sections or List Sections instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `section_id` | string | yes |  | Section ID. ID of the section to fetch. Resolve via List Sections or Search Sections. |

Output fields:

- `id`: Section ID
- `name`: Name
- `description`: Description
- `project_id`: Project ID
- `section_order`: Order (number)
- `is_archived`: Is Archived (boolean)
- `is_deleted`: Is Deleted (boolean)
- `added_at`: Added At (datetime)
- `updated_at`: Updated At (datetime)
- `archived_at`: Archived At (datetime)

### `todoist_delete_section`

**Delete Section.** Permanently deletes a Todoist section identified by section_id AND every task within that section. Destructive — confirm the section is empty or that losing its tasks is intended before calling; to only rename a section use Update Section. Idempotent: deleting an already-removed section succeeds with no effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `section_id` | string | yes |  | Section ID. ID of the section to delete. Resolve via List Sections or Search Sections. |

### `todoist_list_sections`

**List Sections.** Lists Todoist sections with id, name and project_id, optionally restricted to a single project via project_id (all sections across all projects if left blank). Use to resolve a section name to its ID before a section-scoped operation; to match by a name fragment use Search Sections, for archived ones use List Archived Sections. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project ID. Restrict to sections in this project. Resolve via List Projects. Leave blank to list sections across all projects. |

Output fields:

- `sections`: Sections
- `sections[].id`: Section ID
- `sections[].name`: Name
- `sections[].description`: Description
- `sections[].project_id`: Project ID
- `sections[].section_order`: Order (number)
- `sections[].is_archived`: Is Archived (boolean)
- `sections[].is_deleted`: Is Deleted (boolean)
- `sections[].added_at`: Added At (datetime)
- `sections[].updated_at`: Updated At (datetime)
- `sections[].archived_at`: Archived At (datetime)
- `count`: Count (number)

### `todoist_search_sections`

**Search Sections.** Finds Todoist sections whose name contains the given query (case-insensitive substring match), optionally scoped to one project via project_id. Use to resolve a section by a partial or remembered name to its ID; to list every section use List Sections, to fetch one known ID use Get Section. Read-only and idempotent; matches client-side, so a blank query returns all sections in scope. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Query. Case-insensitive substring to match against section names, e.g. 'todo'. Leave blank to return all sections in scope. |
| `project_id` | string | no |  | Project ID. Restrict the search to sections in this project. Resolve via List Projects. Leave blank to search all projects. |

Output fields:

- `sections`: Sections
- `sections[].id`: Section ID
- `sections[].name`: Name
- `sections[].description`: Description
- `sections[].project_id`: Project ID
- `sections[].section_order`: Order (number)
- `sections[].is_archived`: Is Archived (boolean)
- `sections[].is_deleted`: Is Deleted (boolean)
- `sections[].added_at`: Added At (datetime)
- `sections[].updated_at`: Updated At (datetime)
- `sections[].archived_at`: Archived At (datetime)
- `count`: Count (number)

### `todoist_list_archived_sections`

**List Archived Sections.** Lists the archived sections inside one specific project, identified by project_id (required). Use to inspect a project's archived sections; for active sections use List Sections instead. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. ID of the project whose archived sections to list. Resolve via List Projects or Search Projects. |

Output fields:

- `sections`: Sections
- `sections[].id`: Section ID
- `sections[].name`: Name
- `sections[].description`: Description
- `sections[].project_id`: Project ID
- `sections[].section_order`: Order (number)
- `sections[].is_archived`: Is Archived (boolean)
- `sections[].is_deleted`: Is Deleted (boolean)
- `sections[].added_at`: Added At (datetime)
- `sections[].updated_at`: Updated At (datetime)
- `sections[].archived_at`: Archived At (datetime)
- `count`: Count (number)

### `todoist_create_label`

**Create Label.** Creates a new personal Todoist label by name (1-128 chars), with optional color, order, and favorite flag. Use to add a label before tagging tasks with it; to change an existing label use Update Label instead. Not idempotent: a duplicate name returns an error, so call List Labels first to check whether the label already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The label name. Between 1 and 128 characters. |
| `color` | string | no |  | Color. The label's color, as a Todoist color name (e.g. 'berry_red', 'blue', 'charcoal'). |
| `order` | number | no |  | Order. Number used to sort the label in the list view (lower comes first). |
| `is_favorite` | boolean | no |  | Is Favorite. Whether the label is marked as a favorite. |

Output fields:

- `id`: Label ID
- `name`: Name
- `color`: Color
- `order`: Order (number)
- `is_favorite`: Is Favorite (boolean)

### `todoist_update_label`

**Update Label.** Updates fields (name, color, order, favorite flag) on an existing personal Todoist label identified by label_id; only the fields you pass are changed. Resolve label_id first via List Labels or Search Labels. To rename a shared (workspace) label across all tasks use Rename Shared Label instead. Idempotent: re-sending the same values yields the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label_id` | string | yes |  | Label ID. The ID of the personal label to update. Obtain it via List Labels or Search Labels. |
| `name` | string | no |  | Name. New label name. Between 1 and 128 characters. |
| `color` | string | no |  | Color. The label's color, as a Todoist color name (e.g. 'berry_red', 'blue', 'charcoal'). |
| `order` | number | no |  | Order. Number used to sort the label in the list view (lower comes first). |
| `is_favorite` | boolean | no |  | Is Favorite. Whether the label is marked as a favorite. |

Output fields:

- `id`: Label ID
- `name`: Name
- `color`: Color
- `order`: Order (number)
- `is_favorite`: Is Favorite (boolean)

### `todoist_get_label`

**Get Label.** Fetches a single personal Todoist label by label_id (full record: name, color, order, favorite). Use when you already have the ID and want its current state; to discover IDs from names list everything with List Labels or filter with Search Labels. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label_id` | string | yes |  | Label ID. The ID of the personal label to fetch. Obtain it via List Labels or Search Labels. |

Output fields:

- `id`: Label ID
- `name`: Name
- `color`: Color
- `order`: Order (number)
- `is_favorite`: Is Favorite (boolean)

### `todoist_delete_label`

**Delete Label.** Permanently deletes a personal Todoist label by label_id, removing it from every task it was applied to. Resolve label_id first via List Labels or Search Labels. This affects only personal labels; to drop a shared (workspace) label across all tasks use Remove Shared Label. Idempotent: deleting an already-gone label is treated as success, so retries are safe. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label_id` | string | yes |  | Label ID. The ID of the personal label to delete. Obtain it via List Labels or Search Labels. |

### `todoist_list_labels`

**List Labels.** Lists all of the user's personal Todoist labels (id, name, color, order, favorite). Use this to resolve a label name to its ID before updating, deleting, or getting a single label. For shared (workspace) labels use List Shared Labels instead; to filter by name client-side use Search Labels. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].color`: Color
- `labels[].order`: Order (number)
- `labels[].is_favorite`: Is Favorite (boolean)
- `count`: Count (number)

### `todoist_search_labels`

**Search Labels.** Finds the user's personal Todoist labels whose name contains the given query (case-insensitive substring match), evaluated client-side over all labels. Use to resolve a partial or fuzzy name to label records when you do not know the exact name; use List Labels to fetch every label, or Get Label when you already have an ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Text to match against label names, case-insensitively (e.g. 'work'). |

Output fields:

- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].color`: Color
- `labels[].order`: Order (number)
- `labels[].is_favorite`: Is Favorite (boolean)
- `count`: Count (number)

### `todoist_list_shared_labels`

**List Shared Labels.** Lists the names of shared (workspace) labels — labels applied to tasks but not saved in the personal label list. Use this to resolve the exact name before renaming or removing a shared label; for the user's own saved labels use List Labels instead. Shared labels are identified by name, not ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `omit_personal` | boolean | no |  | Omit Personal. When true, names that also exist as personal labels are excluded, returning only purely shared labels. |

Output fields:

- `shared_labels`: Shared Labels
- `count`: Count (number)

### `todoist_rename_shared_label`

**Rename Shared Label.** Renames a shared (workspace) label from its current name to a new name across every active task that uses it. Shared labels have no ID, so they are matched by name — resolve the current name with List Shared Labels first. This affects shared labels only; to rename a personal label use Update Label. Idempotent: once renamed, re-running with the same new name is a no-op since the old name no longer exists. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Current Name. The existing shared label name to rename. Resolve it via List Shared Labels. |
| `new_name` | string | yes |  | New Name. The new name to apply to the shared label. |

### `todoist_remove_shared_label`

**Remove Shared Label.** Removes a shared (workspace) label, identified by name, from every active task that uses it. Resolve the exact name with List Shared Labels first. This affects shared labels only; to delete a personal label (and strip it from tasks) use Delete Label. Idempotent: removing a name with no remaining instances succeeds, so retries are safe. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The shared label name to remove from all tasks. Resolve it via List Shared Labels. |

### `todoist_create_task_comment`

**Create Task Comment.** Adds a comment to a specific Todoist task identified by task_id (resolve the ID via Find Task or List Tasks). Use for task-level comments; to comment on a project instead use Create Project Comment. Each call appends a new comment, so retries create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The ID of the task to comment on (e.g. "6X4Vv2hfXjqWf3wj"). Obtain it from Find Task or List Tasks. |
| `content` | string | yes |  | Content. The comment text, 1 to 15000 characters. May contain markdown-formatted text and hyperlinks. |
| `attachment` | object | no |  | Attachment. Optional pre-formed attachment object (e.g. { "resource_type": "file", "file_url": "https://...", "file_name": "doc.pdf", "file_type": "application/pdf" }). |

Output fields:

- `id`: Comment ID
- `content`: Content
- `item_id`: Task ID
- `project_id`: Project ID
- `posted_uid`: Posted By User ID
- `posted_at`: Posted At (datetime)
- `is_deleted`: Is Deleted (boolean)
- `file_attachment`: File Attachment

### `todoist_create_project_comment`

**Create Project Comment.** Adds a comment to a specific Todoist project identified by project_id (resolve the ID via List Projects). Use for project-level comments; to comment on a single task instead use Create Task Comment. Each call appends a new comment, so retries create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. The ID of the project to comment on (e.g. "6X4Vv2hfXjqWf3wj"). Obtain it from List Projects. |
| `content` | string | yes |  | Content. The comment text, 1 to 15000 characters. May contain markdown-formatted text and hyperlinks. |
| `attachment` | object | no |  | Attachment. Optional pre-formed attachment object (e.g. { "resource_type": "file", "file_url": "https://...", "file_name": "doc.pdf", "file_type": "application/pdf" }). |

Output fields:

- `id`: Comment ID
- `content`: Content
- `item_id`: Task ID
- `project_id`: Project ID
- `posted_uid`: Posted By User ID
- `posted_at`: Posted At (datetime)
- `is_deleted`: Is Deleted (boolean)
- `file_attachment`: File Attachment

### `todoist_get_comment`

**Get Comment.** Fetches one Todoist comment by its comment_id (resolve the ID via List Comments). Use when you already have a comment ID and want its full record; to read every comment on a task or project use List Comments instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. The ID of the comment to retrieve (e.g. "2992679862"). Obtain it from List Comments. |

Output fields:

- `id`: Comment ID
- `content`: Content
- `item_id`: Task ID
- `project_id`: Project ID
- `posted_uid`: Posted By User ID
- `posted_at`: Posted At (datetime)
- `is_deleted`: Is Deleted (boolean)
- `file_attachment`: File Attachment

### `todoist_list_comments`

**List Comments.** Lists every comment on one Todoist task OR one project. Provide exactly one of task_id (resolve via Find Task) or project_id (resolve via List Projects) — not both. Use to read a comment thread or to resolve a comment_id before Get Comment. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | no |  | Task ID. The task whose comments to list (e.g. "6X4Vv2hfXjqWf3wj"). Provide this OR Project ID, not both. |
| `project_id` | string | no |  | Project ID. The project whose comments to list (e.g. "6X4Vv2hfXjqWf3wj"). Provide this OR Task ID, not both. |

Output fields:

- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].content`: Content
- `comments[].item_id`: Task ID
- `comments[].project_id`: Project ID
- `comments[].posted_uid`: Posted By User ID
- `comments[].posted_at`: Posted At (datetime)
- `comments[].is_deleted`: Is Deleted (boolean)
- `comments[].file_attachment`: File Attachment
- `count`: Count (number)

### `todoist_get_current_user`

**Get Current User.** Retrieves the profile of the currently authenticated Todoist user (id, email, full name, timezone, etc.). Use to resolve the connected account's own user ID for assignee or collaborator workflows, or to read the user timezone before scheduling. Takes no input; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID
- `email`: Email (email)
- `full_name`: Full Name
- `lang`: Language
- `inbox_project_id`: Inbox Project ID
- `karma`: Karma (number)
- `karma_trend`: Karma Trend
- `is_premium`: Is Premium (boolean)
- `premium_status`: Premium Status
- `mfa_enabled`: MFA Enabled (boolean)
- `daily_goal`: Daily Goal (number)
- `weekly_goal`: Weekly Goal (number)
- `completed_count`: Total Completed Count (number)
- `completed_today`: Completed Today (number)
- `joined_at`: Joined At (datetime)
- `tz_info`: Timezone
- `tz_info.timezone`: Timezone Name
- `tz_info.gmt_string`: GMT Offset

### `todoist_get_productivity_stats`

**Get Productivity Stats.** Retrieves the authenticated user's Todoist productivity statistics: karma score and trend, completed-task counts, and daily and weekly goals. Use for reporting or progress summaries; for the raw list of completed tasks use List Completed Tasks instead. Takes no input; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `completed_count`: Total Completed Count (number)
- `karma`: Karma (number)
- `karma_trend`: Karma Trend
- `karma_last_update`: Karma Last Update (number)
- `goals`: Goals
- `goals.daily_goal`: Daily Goal (number)
- `goals.weekly_goal`: Weekly Goal (number)
- `goals.current_daily_streak`: Current Daily Streak
- `goals.current_daily_streak.count`: Count (number)
- `goals.current_daily_streak.start`: Start (date)
- `goals.current_daily_streak.end`: End (date)
- `goals.current_weekly_streak`: Current Weekly Streak
- `goals.current_weekly_streak.count`: Count (number)
- `goals.current_weekly_streak.start`: Start (date)
- `goals.current_weekly_streak.end`: End (date)
- `days_items`: Daily Breakdown
- `days_items[].date`: Date (date)
- `days_items[].total_completed`: Total Completed (number)
- `week_items`: Weekly Breakdown
- `week_items[].from`: From (date)
- `week_items[].to`: To (date)
- `week_items[].total_completed`: Total Completed (number)
- `karma_graph_data`: Karma Graph
- `karma_graph_data[].date`: Date (date)
- `karma_graph_data[].karma_avg`: Karma Average (number)
- `project_colors`: Project Colors (an object whose keys vary)

### `todoist_list_activity_log`

**List Activity Log.** Retrieves the Todoist activity log — the history of events (added, updated, completed, deleted) across projects, tasks, and comments. Use for audit or reporting; narrow with object_type, event_type, a project/task scope, or a date range. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object_type` | string | no |  | Object Type. Restrict to one object type. One of: "project", "item" (task), "note" (comment). One of `"project"`, `"item"`, `"note"`. |
| `event_type` | string | no |  | Event Type. Restrict to a single event type across all object types, e.g. "added", "updated", "completed", "deleted". |
| `object_id` | string | no |  | Object ID. Restrict to one specific object. Must be paired with Object Type (e.g. a task ID with object_type "item"). |
| `parent_project_id` | string | no |  | Parent Project ID. Restrict to one project and all of its tasks and comments. Resolve the ID via List Projects. |
| `parent_item_id` | string | no |  | Parent Task ID. Restrict to one task and all of its comments. Resolve the ID via Find Task. |
| `date_from` | string | no |  | Date From. Only events on or after this instant, ISO 8601 (e.g. "2026-01-01T00:00:00Z"). |
| `date_to` | string | no |  | Date To. Only events before this instant (exclusive), ISO 8601 (e.g. "2026-02-01T00:00:00Z"). |
| `limit` | number | no |  | Limit. Maximum number of events to return per page. |

Output fields:

- `events`: Events
- `events[].id`: Event ID
- `events[].event_type`: Event Type
- `events[].event_date`: Event Date (datetime)
- `events[].object_type`: Object Type
- `events[].object_id`: Object ID
- `events[].parent_project_id`: Parent Project ID
- `events[].parent_item_id`: Parent Task ID
- `events[].initiator_id`: Initiator User ID
- `events[].extra_data`: Extra Data
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

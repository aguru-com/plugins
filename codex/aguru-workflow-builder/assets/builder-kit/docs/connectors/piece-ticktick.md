# TickTick

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-ticktick'
  version: '0.3.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `create_task`

**Create Task.** Creates a new task in a TickTick list, with optional content, checklist description, start/due dates, and priority. Use to add a to-do item. Requires the target list (project) ID and a task title. Not idempotent: each call creates a separate task even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | List. The list to create the task in. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Task Title. |
| `content` | string | no |  | Task Content. |
| `desc` | string | no |  | Description (Checklist). Description of the checklist, often used with subtasks (items). |
| `startDate` | ISO date-time string | no |  | Start Date. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `priority` | string | no |  | Priority. One of `0`, `1`, `3`, `5`. |

Output fields:

- `id`: ID
- `projectId`: Project ID
- `sortOrder`: Sort Order (number)
- `title`: Title
- `content`: Content
- `startDate`: Start Date (datetime)
- `dueDate`: Due Date (datetime)
- `timeZone`: Time Zone
- `isAllDay`: Is All Day (boolean)
- `priority`: Priority (number)
- `isFloating`: Is Floating (boolean)
- `status`: Status (number)
- `tags`: Tags
- `kind`: Kind
- `modifiedTime`: Modified Time (datetime)
- `createdTime`: Created Time (datetime)

### `update_task`

**Update Task.** Updates fields (title, content, checklist description, start/due dates, priority) on an existing TickTick task identified by its list and task ID. Only the fields you supply are changed. Use to edit a known task. Idempotent: repeating with the same values leaves the task in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | List. The list to update the task in. A value the product loads from the provider, such as an id; write the value itself. |
| `taskId` | string | yes |  | Task ID. The ID of the task to update. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. |
| `content` | string | no |  | Content. |
| `desc` | string | no |  | Description (Checklist). New description of the checklist items. Replaces existing. |
| `startDate` | ISO date-time string | no |  | Start Date. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `priority` | string | no |  | Priority. One of `0`, `1`, `3`, `5`. |

Output fields:

- `id`: ID
- `projectId`: Project ID
- `sortOrder`: Sort Order (number)
- `title`: Title
- `content`: Content
- `startDate`: Start Date (datetime)
- `dueDate`: Due Date (datetime)
- `timeZone`: Time Zone
- `isAllDay`: Is All Day (boolean)
- `priority`: Priority (number)
- `isFloating`: Is Floating (boolean)
- `status`: Status (number)
- `kind`: Kind
- `modifiedTime`: Modified Time (datetime)
- `createdTime`: Created Time (datetime)

### `get_task`

**Get Task.** Fetches the full details of a single TickTick task by its list (project) ID and task ID. Use when you already know both IDs and need the task data; to discover a task ID by title, use Find Task first. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | List. The list the task belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `taskId` | string | yes |  | Task ID. The ID of the task to retrieve. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: ID
- `projectId`: Project ID
- `sortOrder`: Sort Order (number)
- `title`: Title
- `content`: Content
- `startDate`: Start Date (datetime)
- `dueDate`: Due Date (datetime)
- `timeZone`: Time Zone
- `isAllDay`: Is All Day (boolean)
- `priority`: Priority (number)
- `isFloating`: Is Floating (boolean)
- `status`: Status (number)
- `tags`: Tags
- `kind`: Kind
- `modifiedTime`: Modified Time (datetime)
- `createdTime`: Created Time (datetime)

### `delete_task`

**Delete Task.** Permanently deletes a TickTick task identified by its list (project) ID and task ID. Use to remove a task you no longer need; this is destructive and cannot be undone. Idempotent on the end state: re-deleting the same task leaves it gone. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | List. The list the task belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `taskId` | string | yes |  | Task ID. The ID of the task to delete. A value the product loads from the provider, such as an id; write the value itself. |

### `complete_task`

**Complete Task.** Marks a TickTick task as completed, identified by its list (project) ID and task ID. Use to close out a task. Idempotent: completing an already-completed task leaves it completed with no further effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |
| `taskId` | string | yes |  | Task ID. The ID of the task to complete. A value the product loads from the provider, such as an id; write the value itself. |

### `find_task`

**Find Task.** Searches the tasks in a TickTick list (project) for ones whose title matches a given string, with a match-type option for case-insensitive 'contains' (substring) or 'exact' matching. Use to resolve a task by name into its ID before getting, updating, completing, or deleting it. Requires the list ID and a title. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | List. The list to search within. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Task Title. |
| `matchType` | string | yes | `"contains"` | Match Type. Select how the title should be matched. One of `"contains"`, `"exact"`. |

Output fields:

- `found`: Found (boolean)
- `result`: Result
- `result[].id`: ID
- `result[].projectId`: Project ID
- `result[].sortOrder`: Sort Order (number)
- `result[].title`: Title
- `result[].content`: Content
- `result[].startDate`: Start Date (datetime)
- `result[].dueDate`: Due Date (datetime)
- `result[].timeZone`: Time Zone
- `result[].isAllDay`: Is All Day (boolean)
- `result[].priority`: Priority (number)
- `result[].isFloating`: Is Floating (boolean)
- `result[].status`: Status (number)
- `result[].kind`: Kind
- `result[].modifiedTime`: Modified Time (datetime)
- `result[].createdTime`: Created Time (datetime)

### `get_project`

**Get Task List.** Fetches the details of a single TickTick task list (project) by its list ID. Use when you have a list ID and need its metadata. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | List ID. Select the list to retrieve details for. |

Output fields:

- `id`: ID
- `name`: Name
- `color`: Color
- `sortOrder`: Sort Order (number)
- `viewMode`: View Mode
- `kind`: Kind

### `ticktick_list_projects`

**List Projects.** Lists the account's projects with their ids, names, view modes and group ids. Use first to resolve a project name to the projectId other actions need. The Inbox is not returned; task actions accept "inbox" as a projectId. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `offset` | number | no |  | Offset. Zero-based result offset. Omit to use the vendor default. |
| `limit` | number | no |  | Limit. Maximum number of projects to return. The vendor default is 200. |

Output fields:

- `projects`: Projects
- `projects[].id`: ID
- `projects[].name`: Name
- `projects[].color`: Color
- `projects[].sortOrder`: Sort Order (number)
- `projects[].viewMode`: View Mode
- `projects[].kind`: Kind
- `count`: Count (number)

### `ticktick_get_project`

**Get Project.** Fetches one project's metadata (name, color, view mode, group, permission, kind) by projectId from ticktick_list_projects. Use ticktick_get_project_data instead when you also need its tasks. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, from the List Projects action. |

Output fields:

- `id`: ID
- `name`: Name
- `color`: Color
- `sortOrder`: Sort Order (number)
- `viewMode`: View Mode
- `kind`: Kind

### `ticktick_get_project_data`

**Get Project With Tasks.** Returns { project, tasks, columns } for a projectId from ticktick_list_projects. Only incomplete tasks are included; use ticktick_list_completed_tasks for finished ones. Columns are present for kanban projects only. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, from the List Projects action. Use "inbox" for the Inbox. |

Output fields:

- `project`: Project
- `project.id`: ID
- `project.name`: Name
- `project.color`: Color
- `project.sortOrder`: Sort Order (number)
- `project.viewMode`: View Mode
- `project.kind`: Kind
- `tasks`: Tasks
- `tasks[].id`: ID
- `tasks[].projectId`: Project ID
- `tasks[].sortOrder`: Sort Order (number)
- `tasks[].title`: Title
- `tasks[].content`: Content
- `tasks[].startDate`: Start Date (datetime)
- `tasks[].dueDate`: Due Date (datetime)
- `tasks[].timeZone`: Time Zone
- `tasks[].isAllDay`: Is All Day (boolean)
- `tasks[].priority`: Priority (number)
- `tasks[].isFloating`: Is Floating (boolean)
- `tasks[].status`: Status (number)
- `tasks[].tags`: Tags
- `tasks[].kind`: Kind
- `tasks[].modifiedTime`: Modified Time (datetime)
- `tasks[].createdTime`: Created Time (datetime)
- `columns`: Columns
- `columns[].id`: ID
- `columns[].projectId`: Project ID
- `columns[].name`: Name
- `columns[].sortOrder`: Sort Order (number)

### `ticktick_list_project_members`

**List Project Members.** Lists a shared project's members (username, displayName, self). Use to get the username that ticktick_assign_task needs. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, from the List Projects action. |

Output fields:

- `members`: Members
- `members[].username`: Username (email)
- `members[].displayName`: Display Name
- `members[].self`: Self (boolean)
- `count`: Count (number)

### `ticktick_create_project`

**Create Project.** Creates a project and returns it with its new id. Not idempotent: calling twice creates two projects, so check ticktick_list_projects first when unsure. Use viewMode "kanban" if you plan to add columns. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The project name. |
| `color` | string | no |  | Color. Hex color, for example "#F18181". |
| `sortOrder` | number | no |  | Sort Order. Sort order value of the project. |
| `viewMode` | string | no |  | View Mode. One of `"list"`, `"kanban"`, `"timeline"`. |
| `kind` | string | no |  | Kind. One of `"TASK"`, `"NOTE"`. |

Output fields:

- `id`: ID
- `name`: Name
- `color`: Color
- `sortOrder`: Sort Order (number)
- `viewMode`: View Mode
- `kind`: Kind

### `ticktick_update_project`

**Update Project.** Changes only the fields you supply on a project by projectId from ticktick_list_projects; omitted fields keep their value. Sets state, so repeating it is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, from the List Projects action. |
| `name` | string | no |  | Name. |
| `color` | string | no |  | Color. Hex color, for example "#F18181". |
| `sortOrder` | number | no |  | Sort Order. |
| `viewMode` | string | no |  | View Mode. One of `"list"`, `"kanban"`, `"timeline"`. |
| `kind` | string | no |  | Kind. One of `"TASK"`, `"NOTE"`. |

Output fields:

- `id`: ID
- `name`: Name
- `color`: Color
- `sortOrder`: Sort Order (number)
- `viewMode`: View Mode
- `kind`: Kind

### `ticktick_delete_project`

**Delete Project.** Deletes a project by projectId from ticktick_list_projects, including the tasks inside it. Confirm the target before calling. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, from the List Projects action. |

Output fields:

- `success`: Success (boolean)
- `projectId`: Project ID

### `ticktick_list_project_groups`

**List Project Groups.** Lists project groups with their ids and names. Use to get the projectGroupId for ticktick_update_project_group or ticktick_delete_project_group. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `groups`: Groups
- `groups[].id`: ID
- `groups[].name`: Name
- `groups[].showAll`: Show All (boolean)
- `count`: Count (number)

### `ticktick_create_project_group`

**Create Project Group.** Creates a project group and returns it with its id. Not idempotent: check ticktick_list_project_groups first to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The group name (max 64 characters). |

Output fields:

- `id`: ID
- `name`: Name
- `sortOrder`: Sort Order (number)
- `showAll`: Show All (boolean)

### `ticktick_update_project_group`

**Update Project Group.** Renames a project group by projectGroupId from ticktick_list_project_groups. Sets state, so repeating it is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectGroupId` | string | yes |  | Project Group ID. The group ID, from the List Project Groups action. |
| `name` | string | yes |  | Name. The new group name (max 64 characters). |

Output fields:

- `id`: ID
- `name`: Name
- `showAll`: Show All (boolean)

### `ticktick_delete_project_group`

**Delete Project Group.** Deletes a project group by projectGroupId from ticktick_list_project_groups. Confirm the target before calling. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectGroupId` | string | yes |  | Project Group ID. The group ID, from the List Project Groups action. |

Output fields:

- `success`: Success (boolean)
- `projectGroupId`: Project Group ID

### `ticktick_list_columns`

**List Columns.** Lists a kanban project's columns with their ids and names. Only meaningful for projects with viewMode "kanban". Use to get the columnId for ticktick_update_column. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The kanban project ID, from the List Projects action. |

Output fields:

- `columns`: Columns
- `columns[].id`: ID
- `columns[].projectId`: Project ID
- `columns[].name`: Name
- `columns[].sortOrder`: Sort Order (number)
- `count`: Count (number)

### `ticktick_create_column`

**Create Column.** Adds a column to a kanban project and returns it with its id. Kanban projects only. Not idempotent, and the API has no delete-column endpoint, so check ticktick_list_columns first. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The kanban project ID, from the List Projects action. |
| `name` | string | yes |  | Name. The column name (max 1000 characters). |

Output fields:

- `id`: ID
- `projectId`: Project ID
- `name`: Name
- `sortOrder`: Sort Order (number)

### `ticktick_update_column`

**Update Column.** Renames a kanban column by columnId from ticktick_list_columns. Sets state, so repeating it is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The kanban project ID, from the List Projects action. |
| `columnId` | string | yes |  | Column ID. The column ID, from the List Columns action. |
| `name` | string | yes |  | Name. The new column name (max 1000 characters). |

Output fields:

- `id`: ID
- `projectId`: Project ID
- `name`: Name
- `sortOrder`: Sort Order (number)

### `ticktick_get_task`

**Get Task.** Fetches one task in full (dates, tags, reminders, subtasks, assignee) by projectId and taskId. Get the ids from ticktick_list_tasks, ticktick_search_tasks or ticktick_get_project_data. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project the task belongs to. Use "inbox" for the Inbox. |
| `taskId` | string | yes |  | Task ID. |

Output fields:

- `id`: ID
- `projectId`: Project ID
- `sortOrder`: Sort Order (number)
- `title`: Title
- `content`: Content
- `startDate`: Start Date (datetime)
- `dueDate`: Due Date (datetime)
- `timeZone`: Time Zone
- `isAllDay`: Is All Day (boolean)
- `priority`: Priority (number)
- `isFloating`: Is Floating (boolean)
- `status`: Status (number)
- `tags`: Tags
- `kind`: Kind
- `modifiedTime`: Modified Time (datetime)
- `createdTime`: Created Time (datetime)

### `ticktick_create_task`

**Create Task.** Creates a task in a project (projectId from ticktick_list_projects, or "inbox") and returns it with its id. Supports dates, time zone, reminders, tags, repeat rule, priority and subtasks. Not idempotent: each call creates a new task, so search first when unsure. Use ticktick_batch_save_tasks for many tasks. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project to create the task in. Use "inbox" for the Inbox. |
| `title` | string | yes |  | Title. |
| `content` | string | no |  | Content. The task content (notes). |
| `desc` | string | no |  | Checklist Description. Description of the checklist, used together with subtasks. |
| `isAllDay` | string | no |  | All Day. One of `true`, `false`. |
| `startDate` | ISO date-time string | no |  | Start Date. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `timeZone` | string | no |  | Time Zone. IANA time zone the dates are specified in, for example "America/Los_Angeles". |
| `reminders` | array | no |  | Reminders. Reminder triggers, for example "TRIGGER:P0DT9H0M0S" or "TRIGGER:PT0S". |
| `tags` | array | no |  | Tags. Tag names to put on the task. |
| `repeatFlag` | string | no |  | Repeat Rule. Recurrence rule, for example "RRULE:FREQ=DAILY;INTERVAL=1". |
| `priority` | string | no |  | Priority. One of `0`, `1`, `3`, `5`. |
| `sortOrder` | number | no |  | Sort Order. |
| `items` | JSON | no |  | Subtasks. Array of subtasks, each like {"title": "Step", "status": 0}. Status 0 is open, 1 is completed. |

Output fields:

- `id`: ID
- `projectId`: Project ID
- `sortOrder`: Sort Order (number)
- `title`: Title
- `content`: Content
- `startDate`: Start Date (datetime)
- `dueDate`: Due Date (datetime)
- `timeZone`: Time Zone
- `isAllDay`: Is All Day (boolean)
- `priority`: Priority (number)
- `isFloating`: Is Floating (boolean)
- `status`: Status (number)
- `tags`: Tags
- `kind`: Kind
- `modifiedTime`: Modified Time (datetime)
- `createdTime`: Created Time (datetime)

### `ticktick_update_task`

**Update Task.** Changes only the fields you supply on a task, identified by projectId and taskId (from ticktick_list_tasks or ticktick_search_tasks). Omitted fields are not sent. Empty values cannot clear a field. Use ticktick_complete_task to finish a task and ticktick_move_tasks to change its project. Sets state, so repeating it is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project the task belongs to. Use "inbox" for the Inbox. |
| `taskId` | string | yes |  | Task ID. |
| `title` | string | no |  | Title. |
| `content` | string | no |  | Content. The task content (notes). |
| `desc` | string | no |  | Checklist Description. Description of the checklist, used together with subtasks. |
| `isAllDay` | string | no |  | All Day. One of `true`, `false`. |
| `startDate` | ISO date-time string | no |  | Start Date. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `timeZone` | string | no |  | Time Zone. IANA time zone the dates are specified in, for example "America/Los_Angeles". |
| `reminders` | array | no |  | Reminders. Reminder triggers, for example "TRIGGER:P0DT9H0M0S" or "TRIGGER:PT0S". |
| `tags` | array | no |  | Tags. Tag names to put on the task. |
| `repeatFlag` | string | no |  | Repeat Rule. Recurrence rule, for example "RRULE:FREQ=DAILY;INTERVAL=1". |
| `priority` | string | no |  | Priority. One of `0`, `1`, `3`, `5`. |
| `sortOrder` | number | no |  | Sort Order. |
| `items` | JSON | no |  | Subtasks. Array of subtasks, each like {"title": "Step", "status": 0}. Status 0 is open, 1 is completed. |

Output fields:

- `id`: ID
- `projectId`: Project ID
- `sortOrder`: Sort Order (number)
- `title`: Title
- `content`: Content
- `startDate`: Start Date (datetime)
- `dueDate`: Due Date (datetime)
- `timeZone`: Time Zone
- `isAllDay`: Is All Day (boolean)
- `priority`: Priority (number)
- `isFloating`: Is Floating (boolean)
- `status`: Status (number)
- `tags`: Tags
- `kind`: Kind
- `modifiedTime`: Modified Time (datetime)
- `createdTime`: Created Time (datetime)

### `ticktick_complete_task`

**Complete Task.** Marks one task completed by projectId and taskId. Use ticktick_complete_tasks for several tasks in one project. Setting an already-completed task again is harmless. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project the task belongs to. Use "inbox" for the Inbox. |
| `taskId` | string | yes |  | Task ID. |

Output fields:

- `success`: Success (boolean)
- `projectId`: Project ID
- `taskId`: Task ID

### `ticktick_delete_task`

**Delete Task.** Deletes a task by projectId and taskId. Use ticktick_complete_task instead when the task is just finished. Confirm the target before calling. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project the task belongs to. Use "inbox" for the Inbox. |
| `taskId` | string | yes |  | Task ID. |

Output fields:

- `success`: Success (boolean)
- `projectId`: Project ID
- `taskId`: Task ID

### `ticktick_list_tasks`

**List Tasks.** Single-call task filter returning at most 200 tasks. Filters: projectIds, startDate/endDate (on the task start date), priority, tag (tasks must have all given tags), kind, status. Use ticktick_search_tasks for keyword search and ticktick_list_completed_tasks to filter on completion time. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectIds` | array | no |  | Project IDs. Only tasks in these projects, from the List Projects action. |
| `startDate` | ISO date-time string | no |  | Start Date From. Only tasks whose start date is on or after this time. |
| `endDate` | ISO date-time string | no |  | Start Date To. Only tasks whose start date is on or before this time. |
| `priority` | array | no |  | Priority. One of `0`, `1`, `3`, `5`. |
| `tag` | array | no |  | Tags. Only tasks that have all of these tags. |
| `kind` | array | no |  | Kind. One of `"TEXT"`, `"NOTE"`, `"CHECKLIST"`. |
| `status` | array | no |  | Status. One of `0`, `2`, `-1`. |

Output fields:

- `tasks`: Tasks
- `tasks[].id`: ID
- `tasks[].projectId`: Project ID
- `tasks[].sortOrder`: Sort Order (number)
- `tasks[].title`: Title
- `tasks[].timeZone`: Time Zone
- `tasks[].isAllDay`: Is All Day (boolean)
- `tasks[].priority`: Priority (number)
- `tasks[].isFloating`: Is Floating (boolean)
- `tasks[].status`: Status (number)
- `tasks[].tags`: Tags
- `tasks[].kind`: Kind
- `tasks[].modifiedTime`: Modified Time (datetime)
- `tasks[].createdTime`: Created Time (datetime)
- `tasks[].content`: Content
- `tasks[].startDate`: Start Date (datetime)
- `tasks[].dueDate`: Due Date (datetime)
- `count`: Count (number)

### `ticktick_search_tasks`

**Search Tasks.** Keyword search across tasks, optionally narrowed by projectIds, tags, status and a due-date window. Use to resolve a task name into its id and projectId. A blank keyword returns nothing, so omit it to search by filters only. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `keywords` | string | no |  | Keywords. Text to search for. |
| `projectIds` | array | no |  | Project IDs. Only search in these projects, from the List Projects action. |
| `tags` | array | no |  | Tags. |
| `status` | array | no |  | Status. One of `0`, `2`, `-1`. |
| `dueFrom` | ISO date-time string | no |  | Due From. Only tasks due on or after this time. |
| `dueTo` | ISO date-time string | no |  | Due To. Only tasks due on or before this time. |

Output fields:

- `tasks`: Tasks
- `tasks[].id`: ID
- `tasks[].projectId`: Project ID
- `tasks[].sortOrder`: Sort Order (number)
- `tasks[].title`: Title
- `tasks[].content`: Content
- `tasks[].startDate`: Start Date (datetime)
- `tasks[].dueDate`: Due Date (datetime)
- `tasks[].timeZone`: Time Zone
- `tasks[].isAllDay`: Is All Day (boolean)
- `tasks[].priority`: Priority (number)
- `tasks[].isFloating`: Is Floating (boolean)
- `tasks[].status`: Status (number)
- `tasks[].tags`: Tags
- `tasks[].kind`: Kind
- `tasks[].modifiedTime`: Modified Time (datetime)
- `tasks[].createdTime`: Created Time (datetime)
- `count`: Count (number)

### `ticktick_list_completed_tasks`

**List Completed Tasks.** Returns at most 200 completed tasks, filtered by projectIds and by completion time (startDate/endDate). Use to review what was finished; use ticktick_list_tasks for open tasks. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectIds` | array | no |  | Project IDs. Only tasks in these projects, from the List Projects action. |
| `startDate` | ISO date-time string | no |  | Completed From. Only tasks completed on or after this time. |
| `endDate` | ISO date-time string | no |  | Completed To. Only tasks completed on or before this time. |

Output fields:

- `tasks`: Tasks
- `tasks[].id`: ID
- `tasks[].projectId`: Project ID
- `tasks[].sortOrder`: Sort Order (number)
- `tasks[].title`: Title
- `tasks[].timeZone`: Time Zone
- `tasks[].isAllDay`: Is All Day (boolean)
- `tasks[].priority`: Priority (number)
- `tasks[].isFloating`: Is Floating (boolean)
- `tasks[].completedTime`: Completed Time (datetime)
- `tasks[].status`: Status (number)
- `tasks[].kind`: Kind
- `tasks[].modifiedTime`: Modified Time (datetime)
- `tasks[].createdTime`: Created Time (datetime)
- `tasks[].content`: Content
- `tasks[].startDate`: Start Date (datetime)
- `tasks[].dueDate`: Due Date (datetime)
- `tasks[].tags`: Tags
- `count`: Count (number)

### `ticktick_list_undone_tasks`

**List Undone Tasks.** Returns open tasks within a start/end window of at most 14 days (both required; an invalid range returns nothing). Optionally restrict to projectIds ("inbox" for the Inbox) or taskIds. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `startDate` | ISO date-time string | yes |  | Start Date. |
| `endDate` | ISO date-time string | yes |  | End Date. Must not be before the start date, and at most 14 days after it. |
| `projectIds` | array | no |  | Project IDs. Only search these projects. Omit to search all, use "inbox" for the Inbox. |
| `taskIds` | array | no |  | Task IDs. Restrict results to these tasks. |

Output fields:

- `tasks`: Tasks
- `tasks[].id`: ID
- `tasks[].projectId`: Project ID
- `tasks[].sortOrder`: Sort Order (number)
- `tasks[].title`: Title
- `tasks[].content`: Content
- `tasks[].startDate`: Start Date (datetime)
- `tasks[].dueDate`: Due Date (datetime)
- `tasks[].timeZone`: Time Zone
- `tasks[].isAllDay`: Is All Day (boolean)
- `tasks[].priority`: Priority (number)
- `tasks[].isFloating`: Is Floating (boolean)
- `tasks[].status`: Status (number)
- `tasks[].tags`: Tags
- `tasks[].kind`: Kind
- `tasks[].modifiedTime`: Modified Time (datetime)
- `tasks[].createdTime`: Created Time (datetime)
- `count`: Count (number)

### `ticktick_complete_tasks`

**Complete Multiple Tasks.** Completes up to 50 tasks that all belong to one project. projectId defaults to the Inbox when omitted. Returns the ids actually completed; ids missing from that list were not. Re-applying is harmless. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskIds` | array | yes |  | Task IDs. Up to 50 task IDs, all in the same project. |
| `projectId` | string | no |  | Project ID. The project the tasks belong to. Defaults to the Inbox. |

Output fields:

- `success`: Success (boolean)
- `completedTaskIds`: Completed Task IDs
- `completedCount`: Completed Count (number)
- `notCompletedTaskIds`: Not Completed Task IDs

### `ticktick_move_tasks`

**Move Tasks.** Moves one or more tasks from a source project to a destination project (ids from ticktick_list_projects, "inbox" for the Inbox). Returns each moved task id with its new etag. Moving to the project a task is already in is harmless. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromProjectId` | string | yes |  | From Project ID. |
| `toProjectId` | string | yes |  | To Project ID. |
| `taskIds` | array | yes |  | Task IDs. The tasks to move, all currently in the source project. |

Output fields:

- `moved`: Moved
- `moved[].id`: ID
- `moved[].etag`: Etag
- `moved[].isAllDay`: Is All Day (boolean)
- `moved[].isFloating`: Is Floating (boolean)
- `moved[].modifiedTime`: Modified Time (datetime)
- `count`: Count (number)

### `ticktick_batch_save_tasks`

**Batch Create or Update Tasks.** Creates up to 50 tasks (add) and updates up to 50 tasks (update) in one call. Each add item needs title and projectId; each update item needs id and projectId. Returns id2etag for saved tasks and failed (task id to error code) for rejected ones. Not idempotent because add creates new tasks. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `add` | JSON | no |  | Tasks to Create. Array of up to 50 tasks, each like {"title": "New task", "projectId": "..."}. |
| `update` | JSON | no |  | Tasks to Update. Array of up to 50 tasks, each like {"id": "...", "projectId": "...", "title": "..."}. |

Output fields:

- `success`: Success (boolean)
- `savedCount`: Saved Count (number)
- `id2etag`: Task ID to Etag (an object whose keys vary)
- `failed`: Failed

### `ticktick_assign_task`

**Assign Task.** Assigns a task to a project member by username (from ticktick_list_project_members). The assignee must be a member of the task's project. Sets state, so repeating it is safe. Use ticktick_unassign_task to remove the assignee. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project containing the task. |
| `taskId` | string | yes |  | Task ID. |
| `assigneeUsername` | string | yes |  | Assignee Username. Username of a project member, from the List Project Members action. |

Output fields:

- `id`: ID
- `projectId`: Project ID
- `sortOrder`: Sort Order (number)
- `title`: Title
- `content`: Content
- `startDate`: Start Date (datetime)
- `dueDate`: Due Date (datetime)
- `timeZone`: Time Zone
- `isAllDay`: Is All Day (boolean)
- `priority`: Priority (number)
- `isFloating`: Is Floating (boolean)
- `status`: Status (number)
- `tags`: Tags
- `assigneeUsername`: Assignee Username (email)
- `kind`: Kind
- `modifiedTime`: Modified Time (datetime)
- `createdTime`: Created Time (datetime)

### `ticktick_unassign_task`

**Unassign Task.** Removes the assignee from a task identified by projectId and taskId. Returns the updated task. Repeating it on an unassigned task is harmless. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project containing the task. |
| `taskId` | string | yes |  | Task ID. |

Output fields:

- `id`: ID
- `projectId`: Project ID
- `sortOrder`: Sort Order (number)
- `title`: Title
- `content`: Content
- `startDate`: Start Date (datetime)
- `dueDate`: Due Date (datetime)
- `timeZone`: Time Zone
- `isAllDay`: Is All Day (boolean)
- `priority`: Priority (number)
- `isFloating`: Is Floating (boolean)
- `status`: Status (number)
- `tags`: Tags
- `kind`: Kind
- `modifiedTime`: Modified Time (datetime)
- `createdTime`: Created Time (datetime)

### `ticktick_list_task_comments`

**List Task Comments.** Lists a task's comments with their ids and text. Use to get the comment id for ticktick_delete_task_comment. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project containing the task. |
| `taskId` | string | yes |  | Task ID. |

Output fields:

- `comments`: Comments
- `comments[].id`: ID
- `comments[].userId`: User ID (number)
- `comments[].title`: Title
- `comments[].modifiedTime`: Modified Time (number)
- `comments[].createdTime`: Created Time (number)
- `count`: Count (number)

### `ticktick_add_task_comment`

**Add Task Comment.** Adds a comment to a task by projectId and taskId and returns it with its id. Not idempotent: calling twice adds the comment twice. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project containing the task. |
| `taskId` | string | yes |  | Task ID. |
| `title` | string | yes |  | Comment. The comment text. |

Output fields:

- `id`: ID
- `userId`: User ID (number)
- `title`: Title
- `modifiedTime`: Modified Time (number)
- `createdTime`: Created Time (number)

### `ticktick_delete_task_comment`

**Delete Task Comment.** Permanently deletes a comment by its id (from ticktick_list_task_comments or ticktick_add_task_comment). Confirm the target before calling. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project containing the task. |
| `taskId` | string | yes |  | Task ID. |
| `commentId` | string | yes |  | Comment ID. The comment ID, from the List Task Comments action. |

Output fields:

- `success`: Success (boolean)
- `projectId`: Project ID
- `taskId`: Task ID
- `commentId`: Comment ID

### `ticktick_list_tags`

**List Tags.** Lists all tags with their names and labels. Use to check whether a tag exists before ticktick_create_tag, or to find tag names for task filters. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `tags`: Tags
- `count`: Count (number)

### `ticktick_create_tag`

**Create Tag.** Creates a tag with the given label; its name is the label lowercased and trimmed. Check ticktick_list_tags first to avoid duplicates. Not idempotent, and the API has no delete-tag endpoint. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label` | string | yes |  | Label. The tag label (max 64 characters). |

Output fields:

- `name`: Name
- `label`: Label
- `sortOrder`: Sort Order (number)
- `type`: Type (number)

### `ticktick_list_countdowns`

**List Countdowns.** Lists the account's countdowns (named dates counting down to or up from an event). Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `countdowns`: Countdowns
- `count`: Count (number)

### `ticktick_get_user_preferences`

**Get User Preferences.** Returns the current user's preferences, including their IANA time zone. Use it to interpret or set task dates in the user's time zone. Read-only, despite using POST. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `timeZone`: Time Zone

### `ticktick_list_focuses`

**List Focus Records.** Lists focus records of one type (pomodoro or timing) between from and to. Ranges longer than 30 days are clamped to the 30 days before "to". Use to get the focusId for ticktick_get_focus or ticktick_delete_focus. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | ISO date-time string | yes |  | From. |
| `to` | ISO date-time string | yes |  | To. |
| `type` | string | yes |  | Type. One of `0`, `1`. |

Output fields:

- `focuses`: Focuses
- `focuses[].id`: ID
- `focuses[].userId`: User ID (number)
- `focuses[].type`: Type (number)
- `focuses[].note`: Note
- `focuses[].tasks`: Tasks
- `focuses[].tasks[].startTime`: Start Time (datetime)
- `focuses[].tasks[].endTime`: End Time (datetime)
- `focuses[].startTime`: Start Time (datetime)
- `focuses[].endTime`: End Time (datetime)
- `focuses[].pauseDuration`: Pause Duration (number)
- `focuses[].added`: Added (boolean)
- `focuses[].createdTime`: Created Time (datetime)
- `focuses[].modifiedTime`: Modified Time (datetime)
- `focuses[].duration`: Duration (number)
- `focuses[].relationType`: Relation Type
- `count`: Count (number)

### `ticktick_get_focus`

**Get Focus Record.** Fetches one focus record by focusId from ticktick_list_focuses. The type (pomodoro or timing) must match the record. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `focusId` | string | yes |  | Focus ID. The focus record ID, from the List Focus Records action. |
| `type` | string | yes |  | Type. One of `0`, `1`. |

Output fields:

- `id`: ID
- `userId`: User ID (number)
- `type`: Type (number)
- `note`: Note
- `tasks`: Tasks
- `tasks[].startTime`: Start Time (datetime)
- `tasks[].endTime`: End Time (datetime)
- `startTime`: Start Time (datetime)
- `endTime`: End Time (datetime)
- `pauseDuration`: Pause Duration (number)
- `added`: Added (boolean)
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `duration`: Duration (number)
- `relationType`: Relation Type

### `ticktick_create_focus`

**Create Focus Record.** Logs a focus session, optionally tied to a task (taskId) with start/end time, duration in seconds and a note. Returns it with its id. Not idempotent: each call logs a new record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Type. One of `0`, `1`. |
| `taskId` | string | no |  | Task ID. |
| `note` | string | no |  | Note. Focus note (max 5000 characters). |
| `startTime` | ISO date-time string | no |  | Start Time. |
| `endTime` | ISO date-time string | no |  | End Time. |
| `pauseDuration` | number | no |  | Pause Duration. Pause duration in seconds. |
| `duration` | number | no |  | Duration. Focus duration in seconds. |

Output fields:

- `id`: ID
- `userId`: User ID (number)
- `type`: Type (number)
- `note`: Note
- `tasks`: Tasks
- `tasks[].startTime`: Start Time (datetime)
- `tasks[].endTime`: End Time (datetime)
- `startTime`: Start Time (datetime)
- `endTime`: End Time (datetime)
- `pauseDuration`: Pause Duration (number)
- `added`: Added (boolean)
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `duration`: Duration (number)
- `relationType`: Relation Type

### `ticktick_delete_focus`

**Delete Focus Record.** Deletes a focus record by focusId from ticktick_list_focuses; the type must match the record. Returns the deleted record. Confirm the target before calling. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `focusId` | string | yes |  | Focus ID. The focus record ID, from the List Focus Records action. |
| `type` | string | yes |  | Type. One of `0`, `1`. |

Output fields:

- `id`: ID
- `userId`: User ID (number)
- `type`: Type (number)
- `note`: Note
- `tasks`: Tasks
- `tasks[].startTime`: Start Time (datetime)
- `tasks[].endTime`: End Time (datetime)
- `startTime`: Start Time (datetime)
- `endTime`: End Time (datetime)
- `pauseDuration`: Pause Duration (number)
- `added`: Added (boolean)
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `duration`: Duration (number)
- `relationType`: Relation Type

### `ticktick_list_habits`

**List Habits.** Lists all habits with their ids, names, goals and repeat rules. Use to get the habitId for other habit actions. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `habits`: Habits
- `habits[].id`: ID
- `habits[].name`: Name
- `habits[].sortOrder`: Sort Order (number)
- `habits[].status`: Status (number)
- `habits[].totalCheckIns`: Total Check Ins (number)
- `habits[].createdTime`: Created Time (datetime)
- `habits[].modifiedTime`: Modified Time (datetime)
- `habits[].type`: Type
- `habits[].goal`: Goal (number)
- `habits[].step`: Step (number)
- `habits[].unit`: Unit
- `habits[].repeatRule`: Repeat Rule
- `habits[].recordEnable`: Record Enable (boolean)
- `habits[].completedCycles`: Completed Cycles (number)
- `count`: Count (number)

### `ticktick_list_habit_sections`

**List Habit Sections.** Lists habit sections with their ids. Use to get the sectionId for ticktick_create_habit or ticktick_update_habit. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `sections`: Sections
- `count`: Count (number)

### `ticktick_get_habit`

**Get Habit.** Fetches one habit in full by habitId from ticktick_list_habits. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `habitId` | string | yes |  | Habit ID. The habit ID, from the List Habits action. |

Output fields:

- `id`: ID
- `name`: Name
- `sortOrder`: Sort Order (number)
- `status`: Status (number)
- `totalCheckIns`: Total Check Ins (number)
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `type`: Type
- `goal`: Goal (number)
- `step`: Step (number)
- `unit`: Unit
- `repeatRule`: Repeat Rule
- `completedCycles`: Completed Cycles (number)

### `ticktick_create_habit`

**Create Habit.** Creates a habit and returns it with its id. Check ticktick_list_habits first to avoid duplicates. Not idempotent, and the API has no delete-habit endpoint. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The habit name (max 1000 characters). |
| `iconRes` | string | no |  | Icon. Habit icon resource, for example "habit_reading". |
| `color` | string | no |  | Color. Hex color, for example "#4D8CF5". |
| `sortOrder` | number | no |  | Sort Order. |
| `encouragement` | string | no |  | Encouragement. Encouragement message shown for the habit. |
| `type` | string | no |  | Type. "Boolean" for done or not done, "Real" for a numeric goal. |
| `goal` | number | no |  | Goal. Daily goal, for example 1 for a Boolean habit. |
| `step` | number | no |  | Step. Amount added per check-in tap. |
| `unit` | string | no |  | Unit. Goal unit, for example "Count". |
| `repeatRule` | string | no |  | Repeat Rule. Recurrence rule, for example "RRULE:FREQ=DAILY;INTERVAL=1". |
| `reminders` | array | no |  | Reminders. Reminder times, for example "08:00". |
| `recordEnable` | string | no |  | Record Enabled. Whether check-in notes (records) are enabled. One of `true`, `false`. |
| `sectionId` | string | no |  | Section ID. The habit section ID, from the List Habit Sections action. |
| `targetDays` | number | no |  | Target Days. |
| `targetStartDate` | number | no |  | Target Start Date. Start date as YYYYMMDD, for example 20240101. |

Output fields:

- `id`: ID
- `name`: Name
- `sortOrder`: Sort Order (number)
- `status`: Status (number)
- `totalCheckIns`: Total Check Ins (number)
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `type`: Type
- `goal`: Goal (number)
- `step`: Step (number)
- `unit`: Unit
- `repeatRule`: Repeat Rule
- `completedCycles`: Completed Cycles (number)

### `ticktick_update_habit`

**Update Habit.** Changes only the fields you supply on a habit identified by habitId from ticktick_list_habits; omitted fields are not sent. Empty values cannot clear a field. Sets state, so repeating it is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `habitId` | string | yes |  | Habit ID. The habit ID, from the List Habits action. |
| `name` | string | no |  | Name. The new habit name (max 1000 characters). |
| `iconRes` | string | no |  | Icon. Habit icon resource, for example "habit_reading". |
| `color` | string | no |  | Color. Hex color, for example "#4D8CF5". |
| `sortOrder` | number | no |  | Sort Order. |
| `encouragement` | string | no |  | Encouragement. Encouragement message shown for the habit. |
| `type` | string | no |  | Type. "Boolean" for done or not done, "Real" for a numeric goal. |
| `goal` | number | no |  | Goal. Daily goal, for example 1 for a Boolean habit. |
| `step` | number | no |  | Step. Amount added per check-in tap. |
| `unit` | string | no |  | Unit. Goal unit, for example "Count". |
| `repeatRule` | string | no |  | Repeat Rule. Recurrence rule, for example "RRULE:FREQ=DAILY;INTERVAL=1". |
| `reminders` | array | no |  | Reminders. Reminder times, for example "08:00". |
| `recordEnable` | string | no |  | Record Enabled. Whether check-in notes (records) are enabled. One of `true`, `false`. |
| `sectionId` | string | no |  | Section ID. The habit section ID, from the List Habit Sections action. |
| `targetDays` | number | no |  | Target Days. |
| `targetStartDate` | number | no |  | Target Start Date. Start date as YYYYMMDD, for example 20240101. |

Output fields:

- `id`: ID
- `name`: Name
- `sortOrder`: Sort Order (number)
- `status`: Status (number)
- `totalCheckIns`: Total Check Ins (number)
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `type`: Type
- `goal`: Goal (number)
- `step`: Step (number)
- `unit`: Unit
- `repeatRule`: Repeat Rule
- `completedCycles`: Completed Cycles (number)

### `ticktick_checkin_habit`

**Check In Habit.** Records a check-in for a habit (habitId from ticktick_list_habits) on one date given as a YYYYMMDD stamp, with an optional value and goal (both default to 1). Creates the check-in or overwrites the one for that date, so repeating it is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `habitId` | string | yes |  | Habit ID. The habit ID, from the List Habits action. |
| `stamp` | number | yes |  | Date. The check-in date as YYYYMMDD, for example 20260407. |
| `time` | ISO date-time string | no |  | Check-in Time. |
| `value` | number | no |  | Value. Check-in value. Defaults to 1. |
| `goal` | number | no |  | Goal. Check-in goal. Defaults to 1. |

Output fields:

- `habitId`: Habit ID
- `checkins`: Checkins
- `checkins[].id`: ID
- `checkins[].stamp`: Stamp (number)
- `checkins[].time`: Time
- `checkins[].opTime`: Op Time
- `checkins[].value`: Value (number)
- `checkins[].goal`: Goal (number)
- `checkins[].status`: Status

### `ticktick_list_habit_checkins`

**List Habit Check-Ins.** Lists check-ins for the given habitIds (from ticktick_list_habits) between two YYYYMMDD stamps. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `habitIds` | array | yes |  | Habit IDs. The habit IDs, from the List Habits action. |
| `from` | number | yes |  | From. Start date as YYYYMMDD, for example 20260401. |
| `to` | number | yes |  | To. End date as YYYYMMDD, for example 20260407. |

Output fields:

- `checkins`: Checkins
- `checkins[].id`: ID
- `checkins[].habitId`: Habit ID
- `checkins[].year`: Year (number)
- `checkins[].checkins`: Checkins
- `checkins[].checkins[].id`: ID
- `checkins[].checkins[].stamp`: Stamp (number)
- `checkins[].checkins[].time`: Time
- `checkins[].checkins[].opTime`: Op Time (datetime)
- `checkins[].checkins[].value`: Value (number)
- `checkins[].checkins[].goal`: Goal (number)
- `checkins[].checkins[].status`: Status
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

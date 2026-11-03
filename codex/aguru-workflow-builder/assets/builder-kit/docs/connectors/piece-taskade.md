# Taskade

Collaboration platform for remote teams to organize projects, tasks and AI agents.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-taskade'
  version: '0.3.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Personal Token

> 1. Go to https://www.taskade.com/settings/api (Settings > API).
> 2. Under Personal Access Tokens, create a token with any name and copy it (it starts with tskdp_).

## Actions

### `taskade-create-task`

**Create Task.** Adds a new task to a Taskade project, with the task body supplied as markdown or plain text and positioned at the start or end of the project. Use to append work items to an existing project; requires the target project id. Creates a new task on every call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `folder_id` | string | no |  | Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `content_type` | string | yes | `"text/markdown"` | Content Type. One of `"text/markdown"`, `"text/plain"`. |
| `content` | string | yes |  | Task Content. Up to 2,000 characters. |
| `placement` | string | yes | `"afterbegin"` | Placement. Where to add the task in the project. One of `"afterbegin"`, `"beforeend"`. |

Output fields:

- `ok`: OK (boolean)
- `item`: Created Tasks
- `item[].id`: Task ID
- `item[].completed`: Completed (boolean)

### `taskade-complete-task`

**Complete Task.** Marks an existing Taskade task as completed within a given project. Use when an agent needs to check off or close out a task; requires the project id and task id. Idempotent, since re-running leaves the task in the same completed state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `folder_id` | string | no |  | Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `ok`: OK (boolean)
- `item`: Task
- `item.id`: Task ID
- `item.text`: Text
- `item.parentId`: Parent Task ID
- `item.completed`: Completed (boolean)

### `taskade-delete-task`

**Delete Task.** Permanently removes a task from a Taskade project, identified by project id and task id. Use to discard a task an agent no longer needs; this is destructive and cannot be undone. A repeat call finds the task gone and returns ok with alreadyDeleted=true, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `folder_id` | string | no |  | Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `ok`: Deleted (boolean)
- `alreadyDeleted`: Was Already Deleted (boolean)

### `list_workspaces`

**List Workspaces.** Lists every Taskade workspace the connected user belongs to, with ID and name. Use first to get a workspace ID for List Folders, List Projects, Create Project or List AI Agents (a workspace ID also works as its home folder ID). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Workspaces
- `items[].id`: ID
- `items[].name`: Name

### `list_folders`

**List Folders.** Lists the folders of one Taskade workspace, with ID and name. The list includes the workspace home folder, whose ID equals the workspace ID. Use to pick a folder ID for List Projects, Create Project or List AI Agents. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace ID. Get it from List Workspaces. |

Output fields:

- `items`: Folders
- `items[].id`: ID
- `items[].name`: Name

### `list_projects`

**List Projects.** Lists all projects in one Taskade workspace or folder (a workspace ID lists its home folder), with ID, name, archived state and link. Optionally keeps only names containing some text (case-insensitive) and can hide archived projects. Use to find a project ID by name. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes |  | Workspace or Folder ID. A workspace ID or folder ID. A workspace ID works for its home folder. Get IDs from List Workspaces and List Folders. |
| `nameContains` | string | no |  | Name Contains. Only return projects whose name contains this text (case-insensitive). |
| `includeCompleted` | boolean | no | `true` | Include Archived Projects. Include completed (archived) projects. |

Output fields:

- `items`: Projects
- `items[].id`: Project ID
- `items[].name`: Name
- `items[].icon`: Icon Emoji
- `items[].completed`: Completed (Archived) (boolean)
- `items[].url`: Project Link (url)

### `list_recent_projects`

**List My Recent Projects.** Lists Taskade projects the connected user can access across all workspaces, ordered by when they were last viewed, one page at a time. Use when you do not know which workspace or folder a project is in; pass nextPage to continue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sort` | string | no | `"viewed-desc"` | Order. One of `"viewed-desc"`, `"viewed-asc"`. |
| `limit` | number | no | `100` | Limit. How many items to return (1-100, default 100). |
| `page` | number | no | `1` | Page. Page number, starting at 1. Pass nextPage from the previous result to get more. |

Output fields:

- `items`: Projects
- `items[].id`: Project ID
- `items[].name`: Name
- `items[].icon`: Icon Emoji
- `items[].completed`: Completed (Archived) (boolean)
- `items[].url`: Project Link (url)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)

### `get_project`

**Get Project.** Returns one Taskade project (ID, name, icon, archived state and link) from its ID or https://www.taskade.com/d/ link. Use to check a project exists or is archived before working on it. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |

Output fields:

- `id`: Project ID
- `name`: Name
- `icon`: Icon Emoji
- `completed`: Completed (Archived) (boolean)
- `url`: Project Link (url)

### `create_project`

**Create Project.** Creates a new Taskade project in a workspace or folder (a workspace ID uses its home folder) with the given title, and optional Markdown content where each "- item" line becomes a task. Returns the new project ID and link. Not idempotent: each call creates another project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes |  | Workspace or Folder ID. A workspace ID or folder ID. A workspace ID works for its home folder. Get IDs from List Workspaces and List Folders. |
| `title` | string | yes |  | Project Title. |
| `content` | string | no |  | Content (Markdown). Optional. Each line starting with "- " becomes a task; indent with two spaces for subtasks. |

Output fields:

- `id`: Project ID
- `name`: Name
- `icon`: Icon Emoji
- `completed`: Completed (Archived) (boolean)
- `url`: Project Link (url)

### `create_project_from_template`

**Create Project from Template.** Creates a new Taskade project in a workspace or folder from a project template (get template IDs from List Project Templates). Returns the new project ID and link. Not idempotent: each call creates another project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes |  | Workspace or Folder ID. Where to create the project. A workspace ID works for its home folder. |
| `templateId` | string | yes |  | Template ID. Get it from List Project Templates. |

Output fields:

- `id`: Project ID
- `name`: Name
- `icon`: Icon Emoji
- `completed`: Completed (Archived) (boolean)
- `url`: Project Link (url)

### `list_project_templates`

**List Project Templates.** Lists the project templates saved in one Taskade workspace or folder, with ID and name, one page at a time. Use to get a template ID for Create Project from Template; pass nextPage to continue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes |  | Workspace or Folder ID. A workspace ID or folder ID. A workspace ID works for its home folder. Get IDs from List Workspaces and List Folders. |
| `limit` | number | no | `20` | Limit. How many items to return (1-100, default 20). |
| `page` | number | no | `1` | Page. Page number, starting at 1. Pass nextPage from the previous result to get more. |

Output fields:

- `items`: Templates
- `items[].id`: ID
- `items[].name`: Name
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)

### `copy_project`

**Copy Project.** Duplicates a Taskade project with all its tasks into a workspace or folder, optionally with a new title. Returns the copy's project ID and link. Not idempotent: each call makes another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project to Copy. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `folderId` | string | yes |  | Workspace or Folder ID. Where to put the copy. A workspace ID works for its home folder. |
| `projectTitle` | string | no |  | New Title. Optional title for the copy. Leave empty to keep the original title. |

Output fields:

- `id`: Project ID
- `name`: Name
- `icon`: Icon Emoji
- `completed`: Completed (Archived) (boolean)
- `url`: Project Link (url)

### `complete_project`

**Complete (Archive) Project.** Marks a whole Taskade project as completed, which archives it; Restore Project undoes it. Repeating it leaves the project completed, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |

Output fields:

- `id`: Project ID
- `name`: Name
- `icon`: Icon Emoji
- `completed`: Completed (Archived) (boolean)
- `url`: Project Link (url)

### `restore_project`

**Restore Project.** Restores a completed (archived) Taskade project so it is active again; the opposite of Complete (Archive) Project. Repeating it leaves the project active, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |

Output fields:

- `id`: Project ID
- `name`: Name
- `icon`: Icon Emoji
- `completed`: Completed (Archived) (boolean)
- `url`: Project Link (url)

### `list_project_members`

**List Project Members.** Lists the members of one Taskade project with their handle and display name, one page at a time. Use to get the handle to pass to Assign Task; pass nextPage to continue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `limit` | number | no | `100` | Limit. How many items to return (1-100, default 100). |
| `page` | number | no | `1` | Page. Page number, starting at 1. Pass nextPage from the previous result to get more. |

Output fields:

- `items`: Members
- `items[].handle`: Handle
- `items[].displayName`: Display Name
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)

### `list_project_fields`

**List Custom Fields.** Lists the custom fields defined on one Taskade project: field ID, type (for example number, string, Select), name and, for Select fields, the option IDs and names. Use before Set Custom Field Value to get the field ID and a valid option ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |

Output fields:

- `items`: Custom Fields
- `items[].id`: Field ID
- `items[].type`: Type
- `items[].displayName`: Name
- `items[].options`: Options
- `items[].options[].id`: ID
- `items[].options[].name`: Name
- `items[].data`: Raw Field Settings

### `get_project_share_link`

**Get Project Share Link.** Returns the share links of one Taskade project (view link, edit link, and a check-only link when present), or enabled=false when the project has no share link. It does not turn sharing on. Anyone with the edit link can change the project, so only pass it to people the user names. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |

Output fields:

- `projectId`: Project ID
- `enabled`: Share Link Enabled (boolean)
- `viewUrl`: View Link (url)
- `editUrl`: Edit Link (url)
- `checkUrl`: Check-only Link (url)

### `list_tasks`

**List Tasks.** Lists tasks of one Taskade project in outline order, one page at a time, with ID, text, parent task ID and completion. Use to get task IDs before updating, completing, moving or deleting; pass nextCursor as Cursor to continue. The first item of the first page is the project root (isRoot=true), not a real task. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `limit` | number | no | `100` | Limit. How many items to return (1-1000, default 100). |
| `cursor` | string | no |  | Cursor. Pass nextCursor from the previous result to get the next page. Leave empty to start at the top. |

Output fields:

- `items`: Tasks
- `items[].id`: Task ID
- `items[].text`: Text
- `items[].parentId`: Parent Task ID
- `items[].completed`: Completed (boolean)
- `items[].isRoot`: Is Project Root (boolean)
- `nextCursor`: Next Cursor
- `hasMore`: Has More (boolean)

### `find_tasks`

**Find Tasks.** Finds tasks in one Taskade project whose text contains the given words (case-insensitive), optionally only open or only completed ones, scanning up to 5,000 tasks per call (truncated=true and nextCursor when more remain). Use when the user names a task instead of giving its ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `textContains` | string | yes |  | Text Contains. Words to look for in the task text (case-insensitive). |
| `status` | string | no | `"any"` | Status. One of `"any"`, `"open"`, `"completed"`. |
| `maxResults` | number | no | `50` | Max Results. Stop after this many matches (1-500, default 50). |
| `startCursor` | string | no |  | Start Cursor. To continue a truncated search, pass nextCursor from the previous result. |

Output fields:

- `items`: Matching Tasks
- `items[].id`: Task ID
- `items[].text`: Text
- `items[].parentId`: Parent Task ID
- `items[].completed`: Completed (boolean)
- `items[].isRoot`: Is Project Root (boolean)
- `found`: Found (boolean)
- `scanned`: Tasks Scanned (number)
- `truncated`: Scan Truncated (boolean)
- `nextCursor`: Next Cursor

### `get_task`

**Get Task.** Returns one Taskade task by project and task ID: text, parent, completion and, unless Include Details is off, its date, note, assignees and custom field values (empty when not set). With details it makes 5 requests, so turn details off when you only need the text. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `taskId` | string | yes |  | Task ID. The task ID. Get it from List Tasks or Find Tasks. |
| `includeDetails` | boolean | no | `true` | Include Details. Also fetch the date, note, assignees and custom field values (4 more requests). |

Output fields:

- `id`: Task ID
- `text`: Text
- `parentId`: Parent Task ID
- `completed`: Completed (boolean)
- `isRoot`: Is Project Root (boolean)
- `date`: Date
- `date.start`: Start
- `date.start.date`: Date (date)
- `date.start.time`: Time
- `date.start.timezone`: Timezone
- `date.end`: End
- `date.end.date`: Date (date)
- `date.end.time`: Time
- `date.end.timezone`: Timezone
- `note`: Note
- `note.type`: Note Format
- `note.value`: Note Text
- `assignees`: Assignees
- `assignees[].handle`: Handle
- `assignees[].displayName`: Display Name
- `fields`: Custom Field Values
- `fields[].fieldId`: Field ID
- `fields[].value`: Value

### `create_tasks`

**Create Tasks.** Adds 1-20 tasks to a Taskade project in one request, at the top or bottom of the project, or before, after or inside (as first or last subtask of) an existing task given by Relative To Task ID. Each task text is one line of up to 2,000 characters of Markdown or plain text. Returns the created task IDs. Not idempotent: each call adds new tasks. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `tasks` | array | yes |  | Tasks. One entry per task (1-20). Each entry is a single line of up to 2,000 characters. |
| `format` | string | no | `"text/markdown"` | Text Format. One of `"text/markdown"`, `"text/plain"`. |
| `position` | string | no | `"bottom"` | Position. One of `"bottom"`, `"top"`, `"before"`, `"after"`, `"first_child"`, `"last_child"`. |
| `relativeToTaskId` | string | no |  | Relative To Task ID. Required for Before, After, First subtask and Last subtask positions. |

Output fields:

- `items`: Created Tasks
- `items[].id`: Task ID
- `items[].text`: Text
- `items[].completed`: Completed (boolean)
- `count`: Created Count (number)

### `update_task`

**Update Task Text.** Replaces the text of one Taskade task (a single line, up to 2,000 characters, Markdown or plain text). Use to rename or rewrite a task; use Set Task Note for longer details. Setting the same text again changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `taskId` | string | yes |  | Task ID. The task ID. Get it from List Tasks or Find Tasks. |
| `text` | string | yes |  | New Text. Single line, up to 2,000 characters. |
| `format` | string | no | `"text/markdown"` | Text Format. One of `"text/markdown"`, `"text/plain"`. |

Output fields:

- `id`: Task ID
- `text`: Text
- `parentId`: Parent Task ID
- `completed`: Completed (boolean)
- `isRoot`: Is Project Root (boolean)

### `complete_task_by_id`

**Complete Task (by ID).** Marks one Taskade task as completed, given its project ID (or link) and task ID (from List Tasks or Find Tasks). Use to check off work; Reopen Task undoes it. Completing an already completed task changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `taskId` | string | yes |  | Task ID. The task ID. Get it from List Tasks or Find Tasks. |

Output fields:

- `id`: Task ID
- `text`: Text
- `parentId`: Parent Task ID
- `completed`: Completed (boolean)
- `isRoot`: Is Project Root (boolean)

### `reopen_task`

**Reopen Task.** Marks a completed Taskade task as open again, by project and task ID. Use to undo Complete Task. Reopening an open task changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `taskId` | string | yes |  | Task ID. The task ID. Get it from List Tasks or Find Tasks. |

Output fields:

- `id`: Task ID
- `text`: Text
- `parentId`: Parent Task ID
- `completed`: Completed (boolean)
- `isRoot`: Is Project Root (boolean)

### `delete_task_by_id`

**Delete Task (by ID).** Permanently deletes one Taskade task and all its subtasks by project ID and task ID; it cannot be undone. Use only when the user asks to remove a task. A repeat call finds it gone and reports alreadyDeleted=true, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `taskId` | string | yes |  | Task ID. The task ID. Get it from List Tasks or Find Tasks. |

Output fields:

- `projectId`: Project ID
- `taskId`: Task ID
- `deleted`: Deleted (boolean)
- `alreadyDeleted`: Was Already Deleted (boolean)

### `move_task`

**Move Task.** Moves one Taskade task (with its subtasks) within the same project: before or after a target task, or inside it as its first or last subtask. Moving it to where it already is changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `taskId` | string | yes |  | Task ID to Move. The task ID. Get it from List Tasks or Find Tasks. |
| `targetTaskId` | string | yes |  | Target Task ID. The task to move next to or into. |
| `position` | string | yes | `"afterend"` | Position. One of `"beforebegin"`, `"afterend"`, `"afterbegin"`, `"beforeend"`. |

Output fields:

- `id`: Task ID
- `text`: Text
- `parentId`: Parent Task ID
- `completed`: Completed (boolean)
- `isRoot`: Is Project Root (boolean)

### `set_task_date`

**Set Task Date.** Sets a Taskade task's start date and optional end date (YYYY-MM-DD, optional HH:MM time, optional IANA timezone such as Europe/Berlin), or removes the date when Clear Date is on. Use for due dates and schedules. Setting the same date again changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `taskId` | string | yes |  | Task ID. The task ID. Get it from List Tasks or Find Tasks. |
| `startDate` | string | no |  | Start Date. YYYY-MM-DD. Required unless Clear Date is on. For a single due date, set only this. |
| `startTime` | string | no |  | Start Time. Optional, 24-hour HH:MM or HH:MM:SS. |
| `endDate` | string | no |  | End Date. Optional, YYYY-MM-DD, for a date range. |
| `endTime` | string | no |  | End Time. Optional, 24-hour HH:MM or HH:MM:SS. Needs End Date. |
| `timezone` | string | no |  | Timezone. Optional IANA timezone for the times, for example America/New_York. |
| `clearDate` | boolean | no | `false` | Clear Date. Remove the date from the task. The date fields above are ignored. |

Output fields:

- `projectId`: Project ID
- `taskId`: Task ID
- `cleared`: Date Cleared (boolean)
- `date`: Date
- `date.start`: Start
- `date.start.date`: Date (date)
- `date.start.time`: Time
- `date.start.timezone`: Timezone
- `date.end`: End
- `date.end.date`: Date (date)
- `date.end.time`: Time
- `date.end.timezone`: Timezone

### `set_task_note`

**Set Task Note.** Replaces the note attached to a Taskade task (single line, Markdown or plain text), or removes it when Clear Note is on. Use for details that do not fit in the task text. Setting the same note again changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `taskId` | string | yes |  | Task ID. The task ID. Get it from List Tasks or Find Tasks. |
| `note` | string | no |  | Note. Required unless Clear Note is on. Taskade accepts a single line. |
| `format` | string | no | `"text/markdown"` | Text Format. One of `"text/markdown"`, `"text/plain"`. |
| `clearNote` | boolean | no | `false` | Clear Note. Remove the note from the task. Note is ignored. |

Output fields:

- `projectId`: Project ID
- `taskId`: Task ID
- `cleared`: Note Cleared (boolean)
- `note`: Note
- `note.type`: Note Format
- `note.value`: Note Text

### `assign_task`

**Assign Task.** Assigns one or more project members (by handle, from List Project Members) to a Taskade task; Taskade notifies them. Returns the task and its full assignee list. Assigning someone already assigned changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `taskId` | string | yes |  | Task ID. The task ID. Get it from List Tasks or Find Tasks. |
| `handles` | array | yes |  | Member Handles. Handles of project members, without @. Get them from List Project Members. |

Output fields:

- `id`: Task ID
- `text`: Text
- `parentId`: Parent Task ID
- `completed`: Completed (boolean)
- `isRoot`: Is Project Root (boolean)
- `assignees`: Assignees
- `assignees[].handle`: Handle
- `assignees[].displayName`: Display Name

### `unassign_task`

**Unassign Task.** Removes one member (by handle) from the assignees of a Taskade task. If that person was not assigned, nothing changes and wasAssigned is false, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `taskId` | string | yes |  | Task ID. The task ID. Get it from List Tasks or Find Tasks. |
| `handle` | string | yes |  | Member Handle. Handle without @, from List Project Members or Get Task. |

Output fields:

- `id`: Task ID
- `text`: Text
- `parentId`: Parent Task ID
- `completed`: Completed (boolean)
- `isRoot`: Is Project Root (boolean)
- `removedHandle`: Removed Handle
- `wasAssigned`: Was Assigned (boolean)

### `set_task_field_value`

**Set Custom Field Value.** Sets the value of one custom field on a Taskade task, or clears it when Clear Value is on. Get the field ID and, for Select fields, the option ID from List Custom Fields; number fields need a number. Setting the same value again changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |
| `taskId` | string | yes |  | Task ID. The task ID. Get it from List Tasks or Find Tasks. |
| `fieldId` | string | yes |  | Field ID. Get it from List Custom Fields. |
| `value` | string | no |  | Value. Text, a number for number fields, or the option ID for Select fields. Required unless Clear Value is on. |
| `clearValue` | boolean | no | `false` | Clear Value. Remove the value from the task. Value is ignored. |

Output fields:

- `projectId`: Project ID
- `taskId`: Task ID
- `fieldId`: Field ID
- `value`: Value
- `cleared`: Value Cleared (boolean)

### `list_agents`

**List AI Agents.** Lists the Taskade AI agents in one workspace or folder (a workspace ID lists its home folder), with ID, name, workspace ID, description and command names, one page at a time. Use to get an agent ID for Ask AI Agent; pass nextPage to continue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes |  | Workspace or Folder ID. A workspace ID or folder ID. A workspace ID works for its home folder. Get IDs from List Workspaces and List Folders. |
| `limit` | number | no | `20` | Limit. How many items to return (1-100, default 20). |
| `page` | number | no | `1` | Page. Page number, starting at 1. Pass nextPage from the previous result to get more. |

Output fields:

- `items`: Agents
- `items[].id`: Agent ID
- `items[].name`: Name
- `items[].spaceId`: Workspace ID
- `items[].description`: Description (System Prompt)
- `items[].knowledgeEnabled`: Knowledge Enabled (boolean)
- `items[].commands`: Commands
- `items[].commands[].id`: Command ID
- `items[].commands[].name`: Command Name
- `items[].commands[].prompt`: Command Prompt
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)

### `get_agent`

**Get AI Agent.** Returns one Taskade AI agent by ID: name, workspace ID, description (its system prompt), whether knowledge is on, and its commands with their prompts. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The AI agent ID. Get it from List AI Agents. |

Output fields:

- `id`: Agent ID
- `name`: Name
- `spaceId`: Workspace ID
- `description`: Description (System Prompt)
- `knowledgeEnabled`: Knowledge Enabled (boolean)
- `commands`: Commands
- `commands[].id`: Command ID
- `commands[].name`: Command Name
- `commands[].prompt`: Command Prompt

### `ask_agent`

**Ask AI Agent.** Sends a prompt to a Taskade AI agent and returns its written answer (can take up to a few minutes). Use to delegate research, writing or summaries to an agent the user set up; get agent IDs from List AI Agents. Uses Taskade AI credits and starts a new conversation each time, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The AI agent ID. Get it from List AI Agents. |
| `prompt` | string | yes |  | Prompt. |
| `workspaceId` | string | no |  | Workspace ID. Optional. The agent's workspace ID; looked up from the agent when empty (one extra request). |

Output fields:

- `agentId`: Agent ID
- `spaceId`: Workspace ID
- `response`: Agent Response

### `list_agent_conversations`

**List Agent Conversations.** Lists the conversations of one Taskade AI agent with ID, title and status, one page at a time. Use to get a conversation ID for Get Agent Conversation; pass nextPage to continue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The AI agent ID. Get it from List AI Agents. |
| `limit` | number | no | `20` | Limit. How many items to return (1-100, default 20). |
| `page` | number | no | `1` | Page. Page number, starting at 1. Pass nextPage from the previous result to get more. |

Output fields:

- `items`: Conversations
- `items[].id`: Conversation ID
- `items[].agentId`: Agent ID
- `items[].title`: Title
- `items[].status`: Status
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)

### `get_agent_conversation`

**Get Agent Conversation.** Returns one conversation of a Taskade AI agent (title, status) and, unless turned off, its transcript as text, capped at 100,000 characters (truncated=true when cut). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The AI agent ID. Get it from List AI Agents. |
| `conversationId` | string | yes |  | Conversation ID. Get it from List Agent Conversations. |
| `includeTranscript` | boolean | no | `true` | Include Transcript. |

Output fields:

- `id`: Conversation ID
- `agentId`: Agent ID
- `title`: Title
- `status`: Status
- `transcript`: Transcript
- `truncated`: Transcript Truncated (boolean)

### `generate_agent`

**Generate AI Agent.** Creates a new Taskade AI agent in a workspace or folder from a plain-language description of what it should do; Taskade writes its name, system prompt and commands. Returns the new agent ID. Uses Taskade AI credits; not idempotent: each call creates another agent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes |  | Workspace or Folder ID. A workspace ID or folder ID. A workspace ID works for its home folder. Get IDs from List Workspaces and List Folders. |
| `description` | string | yes |  | What the Agent Should Do. For example: "An agent that drafts friendly replies to customer support emails". |

Output fields:

- `id`: Agent ID
- `name`: Name
- `spaceId`: Workspace ID
- `description`: Description (System Prompt)
- `knowledgeEnabled`: Knowledge Enabled (boolean)
- `commands`: Commands
- `commands[].id`: Command ID
- `commands[].name`: Command Name
- `commands[].prompt`: Command Prompt

### `delete_agent`

**Delete AI Agent.** Permanently deletes one Taskade AI agent by ID, including its commands and settings; it cannot be undone. Use only when the user asks. A repeat call finds it gone and reports alreadyDeleted=true, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The AI agent ID. Get it from List AI Agents. |

Output fields:

- `agentId`: Agent ID
- `deleted`: Deleted (boolean)
- `alreadyDeleted`: Was Already Deleted (boolean)

### `add_agent_knowledge_project`

**Add Project to Agent Knowledge.** Adds a Taskade project to an AI agent's knowledge so the agent can read it when answering. Adding a project that is already linked leaves it linked, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The AI agent ID. Get it from List AI Agents. |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |

Output fields:

- `agentId`: Agent ID
- `projectId`: Project ID
- `linked`: Project Is In Knowledge (boolean)

### `remove_agent_knowledge_project`

**Remove Project from Agent Knowledge.** Removes a Taskade project from an AI agent's knowledge; the project itself is not changed. Removing a project that is not linked also succeeds, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The AI agent ID. Get it from List AI Agents. |
| `projectId` | string | yes |  | Project ID. The project ID, or the project link (https://www.taskade.com/d/<project id>). Get it from List Projects or List My Recent Projects. |

Output fields:

- `agentId`: Agent ID
- `projectId`: Project ID
- `linked`: Project Is In Knowledge (boolean)

### `trigger_automation`

**Trigger Taskade Automation.** Starts a Taskade automation whose trigger is a Webhook, by POSTing a JSON object to the automation's https://www.taskade.com/webhooks/... URL; the payload fields become automation variables. Use when the user gives that URL. Not idempotent: each call runs the automation again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhookUrl` | string | yes |  | Automation Webhook URL. In the Taskade automation, add a Webhook trigger and copy its URL (https://www.taskade.com/webhooks/...). |
| `payload` | JSON | no | `{}` | Payload. JSON object to send. Each field becomes a variable in the automation. |
| `bearerToken` | string | no |  | Webhook Bearer Token. Only if the webhook trigger has Bearer Token authentication turned on. This is the webhook's own secret, not your personal access token. |

Output fields:

- `status`: HTTP Status (number)
- `ok`: Accepted (boolean)

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

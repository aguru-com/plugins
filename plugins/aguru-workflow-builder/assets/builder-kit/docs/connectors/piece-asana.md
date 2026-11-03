# Asana

Work management platform designed to help teams organize, track, and manage their work.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-asana'
  version: '0.7.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `create_task`

**Create Task.** Create a new task in an Asana project, setting its name, description (notes), optional due date, assignee, and tags. Use when an agent needs to add a work item to Asana. Requires a workspace and project; not idempotent — each call creates a separate task even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace. Asana workspace to create the task in. A value the product loads from the provider, such as an id; write the value itself. |
| `project` | string | yes |  | Project. Asana Project to create the task in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Task Name. The name of the task to create. |
| `notes` | string | yes |  | Task Description. Free-form textual information associated with the task (i.e. its description). |
| `due_on` | string | no |  | Due Date. The date on which this task is due in any format. |
| `tags` | array | no |  | Tags. Tags to add to the task. Values the product loads from the provider, such as ids; write an array of them. |
| `assignee` | string | no |  | Assignee. Assignee for the task. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `gid`: Task GID
- `name`: Name
- `resource_subtype`: Task Type
- `notes`: Notes
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `due_on`: Due On (date)
- `due_at`: Due At (datetime)
- `start_on`: Start On (date)
- `start_at`: Start At (datetime)
- `assignee`: Assignee
- `assignee.gid`: User GID
- `assignee.name`: Name
- `assignee.email`: Email (email)
- `parent`: Parent Task
- `parent.gid`: Task GID
- `parent.name`: Task Name
- `projects`: Projects
- `projects[].gid`: Project GID
- `projects[].name`: Project Name
- `memberships`: Project Placements
- `memberships[].project`: Project
- `memberships[].project.gid`: Project GID
- `memberships[].project.name`: Project Name
- `memberships[].section`: Section
- `memberships[].section.gid`: Section GID
- `memberships[].section.name`: Section Name
- `tags`: Tags
- `tags[].gid`: GID
- `tags[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Task URL (url)
- `assignee_status`: Assignee Status
- `num_likes`: Likes (number)

### `get_current_user`

**Get Current User.** Returns the connected Asana user (gid, name, email) and the workspaces they belong to. Call it first to learn your own user gid and the workspace gids other actions need; "me" also works wherever a user is expected. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `gid`: User GID
- `name`: Name
- `email`: Email (email)
- `workspaces`: Workspaces
- `workspaces[].gid`: Workspace GID
- `workspaces[].name`: Workspace Name

### `list_workspaces`

**List Workspaces.** Lists the workspaces and organizations visible to the connected user, with is_organization (teams exist only in organizations). Use it to find the workspace gid that projects, tags, typeahead search and assigned-task listing require. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of workspaces to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Workspaces
- `data[].gid`: Workspace GID
- `data[].name`: Name
- `data[].is_organization`: Is Organization (boolean)
- `data[].email_domains`: Email Domains
- `next_offset`: Next Page Offset

### `list_teams`

**List Teams.** Lists the teams in an organization that the connected user can see. Teams exist only in organizations (company-domain workspaces); a plain workspace returns an error. Use it to find the team gid Create Project needs in an organization. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Organization (Workspace) GID. Gid of the organization, for example 1201234567890123. Obtain it from List Workspaces (is_organization must be true). |
| `limit` | number | no |  | Limit. Maximum number of teams to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Teams
- `data[].gid`: Team GID
- `data[].name`: Name
- `data[].description`: Description
- `data[].visibility`: Visibility
- `data[].organization`: Organization
- `data[].organization.gid`: Workspace GID
- `data[].organization.name`: Workspace Name
- `data[].permalink_url`: Team URL (url)
- `next_offset`: Next Page Offset

### `search_workspace_objects`

**Search Workspace Objects.** Name-based typeahead lookup in one workspace: returns the gid and name of matching tasks, projects, users, tags, teams and more. Use it to turn a name into the gid other actions need; it works on free plans. Results are fuzzy and capped at one page (up to 100), with no pagination. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace to search, for example 1201234567890123. Obtain it from List Workspaces or Get Current User. |
| `resource_type` | string | yes |  | Object Type. Which kind of object to return. One of `"task"`, `"project"`, `"user"`, `"tag"`, `"team"`, `"portfolio"`, `"goal"`, `"custom_field"`, `"project_template"`. |
| `query` | string | no |  | Query. Text to match against object names, for example "Q4 launch". Leave empty to get recently relevant objects of this type. |
| `count` | number | no |  | Count. Number of results to return, from 1 to 100. Defaults to 20. |

Output fields:

- `data`: Results
- `data[].gid`: GID
- `data[].name`: Name
- `data[].resource_type`: Object Type
- `data[].resource_subtype`: Subtype

### `create_project_task`

**Create Project Task.** Creates a new top-level task in a project, with optional description, assignee, due date or due time, start date, followers and tags (by gid or exact name; an unknown tag name fails the call instead of being dropped). Use Create Subtask to add a task under another task. Each call creates a separate task, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace that owns the project, for example 1201234567890123. Obtain it from List Workspaces or Get Current User. |
| `project` | string | yes |  | Project GID. Gid of the project to create the task in. Obtain it from List Projects or Search Workspace Objects (object type project). |
| `name` | string | yes |  | Task Name. Short title of the task, for example "Draft launch email". |
| `notes` | string | no |  | Description. Plain-text description of the task. Cannot be combined with HTML Description. |
| `html_notes` | string | no |  | HTML Description. Rich-text description in Asana rich text, wrapped in <body>...</body>, for example <body>See <strong>brief</strong></body>. Cannot be combined with Description. |
| `assignee` | string | no |  | Assignee. User to assign: "me", an email address or a user gid. |
| `due_on` | string | no |  | Due Date. All-day due date in YYYY-MM-DD format, for example 2026-10-15. Cannot be combined with Due Date and Time. |
| `due_at` | string | no |  | Due Date and Time. Exact due moment as an ISO 8601 date-time that ends in Z (UTC) or a +hh:mm/-hh:mm offset, for example 2026-10-15T17:00:00Z or 2026-10-15T19:00:00+02:00; a value without an offset is rejected. Cannot be combined with Due Date. |
| `start_on` | string | no |  | Start Date. Start date in YYYY-MM-DD format. Asana requires a due date or due time when a start date is set. |
| `followers` | array | no |  | Followers. Users to add as followers, one per item: "me", an email address or a user gid. |
| `tags` | array | no |  | Tags. Tags to apply, one per item: a tag gid or the exact tag name in this workspace. Names are matched case-insensitively; an all-digit value is used as a gid when such a tag exists and is otherwise matched as a name; an unknown name fails the call. Create new tags first with Create Tag. |

Output fields:

- `gid`: Task GID
- `name`: Name
- `resource_subtype`: Task Type
- `notes`: Notes
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `due_on`: Due On (date)
- `due_at`: Due At (datetime)
- `start_on`: Start On (date)
- `start_at`: Start At (datetime)
- `assignee`: Assignee
- `assignee.gid`: User GID
- `assignee.name`: Name
- `assignee.email`: Email (email)
- `parent`: Parent Task
- `parent.gid`: Task GID
- `parent.name`: Task Name
- `projects`: Projects
- `projects[].gid`: Project GID
- `projects[].name`: Project Name
- `memberships`: Project Placements
- `memberships[].project`: Project
- `memberships[].project.gid`: Project GID
- `memberships[].project.name`: Project Name
- `memberships[].section`: Section
- `memberships[].section.gid`: Section GID
- `memberships[].section.name`: Section Name
- `tags`: Tags
- `tags[].gid`: GID
- `tags[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Task URL (url)

### `get_task`

**Get Task.** Returns one task by gid with its name, description, completion, dates, assignee, parent, projects and sections, tags, followers and link. Use it to read the current state before Update Task, or to inspect a task found by a list or search action. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task, for example 1204567890123456. Obtain it from List Project Tasks, List Assigned Tasks or Search Workspace Objects. |

Output fields:

- `gid`: Task GID
- `name`: Name
- `resource_subtype`: Task Type
- `notes`: Notes
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `due_on`: Due On (date)
- `due_at`: Due At (datetime)
- `start_on`: Start On (date)
- `start_at`: Start At (datetime)
- `assignee`: Assignee
- `assignee.gid`: User GID
- `assignee.name`: Name
- `assignee.email`: Email (email)
- `parent`: Parent Task
- `parent.gid`: Task GID
- `parent.name`: Task Name
- `projects`: Projects
- `projects[].gid`: Project GID
- `projects[].name`: Project Name
- `memberships`: Project Placements
- `memberships[].project`: Project
- `memberships[].project.gid`: Project GID
- `memberships[].project.name`: Project Name
- `memberships[].section`: Section
- `memberships[].section.gid`: Section GID
- `memberships[].section.name`: Section Name
- `tags`: Tags
- `tags[].gid`: GID
- `tags[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Task URL (url)
- `num_subtasks`: Subtask Count (number)

### `update_task`

**Update Task.** Updates only the task fields you set (name, description, assignee, due date or due time, start date, completed); everything else is left unchanged. Use it to complete or reopen a task too. Projects, tags, followers and parent are changed with their own actions (Add Task to Project, Add Tag to Task, Add Task Followers, Set Task Parent). Setting the same values again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task to update. Obtain it from List Project Tasks, List Assigned Tasks or Search Workspace Objects. |
| `name` | string | no |  | Task Name. New title of the task. Leave empty to keep the current name. |
| `notes` | string | no |  | Description. New plain-text description; replaces the whole current description. Cannot be combined with HTML Description. Leave empty to keep it. |
| `html_notes` | string | no |  | HTML Description. New rich-text description wrapped in <body>...</body>; replaces the whole current description. Cannot be combined with Description. |
| `assignee` | string | no |  | Assignee. New assignee: "me", an email address or a user gid. Leave empty to keep the current assignee. |
| `due_on` | string | no |  | Due Date. New all-day due date in YYYY-MM-DD format. Cannot be combined with Due Date and Time. |
| `due_at` | string | no |  | Due Date and Time. New exact due moment as an ISO 8601 date-time that ends in Z (UTC) or a +hh:mm/-hh:mm offset, for example 2026-10-15T17:00:00Z or 2026-10-15T19:00:00+02:00; a value without an offset is rejected. Cannot be combined with Due Date. |
| `start_on` | string | no |  | Start Date. New start date in YYYY-MM-DD format. The task must have (or get) a due date. |
| `completed` | string | no |  | Completed. Yes marks the task complete, No reopens it. Leave empty to keep the current state. One of `true`, `false`. |

Output fields:

- `gid`: Task GID
- `name`: Name
- `resource_subtype`: Task Type
- `notes`: Notes
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `due_on`: Due On (date)
- `due_at`: Due At (datetime)
- `start_on`: Start On (date)
- `start_at`: Start At (datetime)
- `assignee`: Assignee
- `assignee.gid`: User GID
- `assignee.name`: Name
- `assignee.email`: Email (email)
- `parent`: Parent Task
- `parent.gid`: Task GID
- `parent.name`: Task Name
- `projects`: Projects
- `projects[].gid`: Project GID
- `projects[].name`: Project Name
- `memberships`: Project Placements
- `memberships[].project`: Project
- `memberships[].project.gid`: Project GID
- `memberships[].project.name`: Project Name
- `memberships[].section`: Section
- `memberships[].section.gid`: Section GID
- `memberships[].section.name`: Section Name
- `tags`: Tags
- `tags[].gid`: GID
- `tags[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Task URL (url)

### `delete_task`

**Delete Task.** Deletes a task. It moves to the trash of the connected user and can be restored from the Asana app for 30 days, after which it is removed permanently. To finish a task instead, use Update Task with Completed set to Yes. Not idempotent: repeating the call on the same task may fail. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task to delete. Obtain it from List Project Tasks, List Assigned Tasks or Search Workspace Objects. |

Output fields:

- `success`: Success (boolean)
- `task_gid`: Deleted Task GID

### `duplicate_task`

**Duplicate Task.** Starts an asynchronous copy of a task and returns a job (gid, status, new_task). The copy may not be finished yet: poll Get Job with the returned job gid until status is succeeded. Choose which parts to copy with Include. Each call starts a new copy, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task to copy. Obtain it from List Project Tasks or Search Workspace Objects. |
| `name` | string | yes |  | New Task Name. Name of the new task, for example "Copy of Draft launch email". |
| `include` | array | no |  | Include. Parts of the original task to copy. Leave empty to copy only the name. One of `"assignee"`, `"attachments"`, `"dates"`, `"dependencies"`, `"followers"`, `"notes"`, `"parent"`, `"projects"`, `"subtasks"`, `"tags"`. |

Output fields:

- `gid`: Job GID
- `resource_subtype`: Job Type
- `status`: Status
- `new_task`: New Task
- `new_task.gid`: Task GID
- `new_task.name`: Task Name
- `new_project`: New Project
- `new_project.gid`: Project GID
- `new_project.name`: Project Name
- `new_project_template`: New Project Template
- `new_project_template.gid`: Project Template GID
- `new_project_template.name`: Project Template Name

### `get_job`

**Get Job.** Reads the current status of an asynchronous job started by Duplicate Task or Duplicate Project: not_started, in_progress, succeeded or failed, plus the new_task or new_project it produced. A single status read, not a wait; call it again later while the job is still running. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job` | string | yes |  | Job GID. Gid of the job returned by Duplicate Task or Duplicate Project. |

Output fields:

- `gid`: Job GID
- `resource_subtype`: Job Type
- `status`: Status
- `new_task`: New Task
- `new_task.gid`: Task GID
- `new_task.name`: Task Name
- `new_project`: New Project
- `new_project.gid`: Project GID
- `new_project.name`: Project Name
- `new_project_template`: New Project Template
- `new_project_template.gid`: Project Template GID
- `new_project_template.name`: Project Template Name

### `list_assigned_tasks`

**List Assigned Tasks.** Lists tasks assigned to one user (use "me" for the connected user's My Tasks) in a workspace, optionally only incomplete ones or ones changed since a moment. Use List Project Tasks for a project's tasks instead. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assignee` | string | yes | `"me"` | Assignee. "me", an email address or a user gid. |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace, for example 1201234567890123. Obtain it from List Workspaces or Get Current User. |
| `completed_since` | string | no |  | Completed Since. Return incomplete tasks plus tasks completed after this ISO 8601 date-time. Use "now" to return only incomplete tasks. Leave empty to return all tasks. |
| `modified_since` | string | no |  | Modified Since. Only return tasks changed after this ISO 8601 date-time, for example 2026-09-01T00:00:00Z. |
| `limit` | number | no |  | Limit. Maximum number of tasks to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Tasks
- `data[].gid`: Task GID
- `data[].name`: Name
- `data[].resource_subtype`: Task Type
- `data[].completed`: Completed (boolean)
- `data[].completed_at`: Completed At (datetime)
- `data[].due_on`: Due On (date)
- `data[].due_at`: Due At (datetime)
- `data[].start_on`: Start On (date)
- `data[].assignee`: Assignee
- `data[].assignee.gid`: User GID
- `data[].assignee.name`: Name
- `data[].parent`: Parent Task
- `data[].parent.gid`: Task GID
- `data[].parent.name`: Task Name
- `data[].created_at`: Created At (datetime)
- `data[].modified_at`: Modified At (datetime)
- `data[].permalink_url`: Task URL (url)
- `next_offset`: Next Page Offset

### `list_project_tasks`

**List Project Tasks.** Lists the tasks of one project in project order, optionally only incomplete ones. This is the free-plan way to browse tasks; use List Section Tasks for one board column or List Assigned Tasks for one person. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project. Obtain it from List Projects or Search Workspace Objects (object type project). |
| `completed_since` | string | no |  | Completed Since. Return incomplete tasks plus tasks completed after this ISO 8601 date-time. Use "now" to return only incomplete tasks. Leave empty to return all tasks. |
| `limit` | number | no |  | Limit. Maximum number of tasks to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Tasks
- `data[].gid`: Task GID
- `data[].name`: Name
- `data[].resource_subtype`: Task Type
- `data[].completed`: Completed (boolean)
- `data[].completed_at`: Completed At (datetime)
- `data[].due_on`: Due On (date)
- `data[].due_at`: Due At (datetime)
- `data[].start_on`: Start On (date)
- `data[].assignee`: Assignee
- `data[].assignee.gid`: User GID
- `data[].assignee.name`: Name
- `data[].parent`: Parent Task
- `data[].parent.gid`: Task GID
- `data[].parent.name`: Task Name
- `data[].created_at`: Created At (datetime)
- `data[].modified_at`: Modified At (datetime)
- `data[].permalink_url`: Task URL (url)
- `next_offset`: Next Page Offset

### `list_subtasks`

**List Subtasks.** Lists the direct subtasks of one task (one level deep; call again on a subtask for deeper levels). Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Parent Task GID. Gid of the parent task. Obtain it from List Project Tasks or Search Workspace Objects. |
| `limit` | number | no |  | Limit. Maximum number of subtasks to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Tasks
- `data[].gid`: Task GID
- `data[].name`: Name
- `data[].resource_subtype`: Task Type
- `data[].completed`: Completed (boolean)
- `data[].completed_at`: Completed At (datetime)
- `data[].due_on`: Due On (date)
- `data[].due_at`: Due At (datetime)
- `data[].start_on`: Start On (date)
- `data[].assignee`: Assignee
- `data[].assignee.gid`: User GID
- `data[].assignee.name`: Name
- `data[].parent`: Parent Task
- `data[].parent.gid`: Task GID
- `data[].parent.name`: Task Name
- `data[].created_at`: Created At (datetime)
- `data[].modified_at`: Modified At (datetime)
- `data[].permalink_url`: Task URL (url)
- `next_offset`: Next Page Offset

### `create_subtask`

**Create Subtask.** Creates a new subtask under a parent task, with optional description, assignee, due date or due time, start date and followers. Use Create Project Task for a top-level task in a project. Each call creates a separate subtask, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Parent Task GID. Gid of the task that will contain the subtask. Obtain it from List Project Tasks or Search Workspace Objects. |
| `name` | string | yes |  | Subtask Name. Short title of the subtask, for example "Collect screenshots". |
| `notes` | string | no |  | Description. Plain-text description. Cannot be combined with HTML Description. |
| `html_notes` | string | no |  | HTML Description. Rich-text description wrapped in <body>...</body>. Cannot be combined with Description. |
| `assignee` | string | no |  | Assignee. User to assign: "me", an email address or a user gid. |
| `due_on` | string | no |  | Due Date. All-day due date in YYYY-MM-DD format. Cannot be combined with Due Date and Time. |
| `due_at` | string | no |  | Due Date and Time. Exact due moment as an ISO 8601 date-time that ends in Z (UTC) or a +hh:mm/-hh:mm offset, for example 2026-10-15T17:00:00Z or 2026-10-15T19:00:00+02:00; a value without an offset is rejected. Cannot be combined with Due Date. |
| `start_on` | string | no |  | Start Date. Start date in YYYY-MM-DD format. Requires a due date or due time. |
| `followers` | array | no |  | Followers. Users to add as followers, one per item: "me", an email address or a user gid. |

Output fields:

- `gid`: Task GID
- `name`: Name
- `resource_subtype`: Task Type
- `notes`: Notes
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `due_on`: Due On (date)
- `due_at`: Due At (datetime)
- `start_on`: Start On (date)
- `start_at`: Start At (datetime)
- `assignee`: Assignee
- `assignee.gid`: User GID
- `assignee.name`: Name
- `assignee.email`: Email (email)
- `parent`: Parent Task
- `parent.gid`: Task GID
- `parent.name`: Task Name
- `projects`: Projects
- `projects[].gid`: Project GID
- `projects[].name`: Project Name
- `memberships`: Project Placements
- `memberships[].project`: Project
- `memberships[].project.gid`: Project GID
- `memberships[].project.name`: Project Name
- `memberships[].section`: Section
- `memberships[].section.gid`: Section GID
- `memberships[].section.name`: Section Name
- `tags`: Tags
- `tags[].gid`: GID
- `tags[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Task URL (url)

### `set_task_parent`

**Set Task Parent.** Moves an existing task under a new parent task (making it a subtask), or detaches it to top level when Parent is "none". Optionally positions it before or after a sibling subtask. Setting the same parent again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task to move. Obtain it from List Project Tasks or Search Workspace Objects. |
| `parent` | string | yes |  | Parent Task GID. Gid of the new parent task, or "none" to remove the current parent. |
| `insert_before` | string | no |  | Insert Before Subtask. Gid of an existing subtask of the new parent to place this task before. Cannot be combined with Insert After Subtask. |
| `insert_after` | string | no |  | Insert After Subtask. Gid of an existing subtask of the new parent to place this task after. Cannot be combined with Insert Before Subtask. |

Output fields:

- `gid`: Task GID
- `name`: Name
- `resource_subtype`: Task Type
- `notes`: Notes
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `due_on`: Due On (date)
- `due_at`: Due At (datetime)
- `start_on`: Start On (date)
- `start_at`: Start At (datetime)
- `assignee`: Assignee
- `assignee.gid`: User GID
- `assignee.name`: Name
- `assignee.email`: Email (email)
- `parent`: Parent Task
- `parent.gid`: Task GID
- `parent.name`: Task Name
- `projects`: Projects
- `projects[].gid`: Project GID
- `projects[].name`: Project Name
- `memberships`: Project Placements
- `memberships[].project`: Project
- `memberships[].project.gid`: Project GID
- `memberships[].project.name`: Project Name
- `memberships[].section`: Section
- `memberships[].section.gid`: Section GID
- `memberships[].section.name`: Section Name
- `tags`: Tags
- `tags[].gid`: GID
- `tags[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Task URL (url)

### `list_task_projects`

**List Task Projects.** Lists the projects a task is directly in (a task can be in several). Use it before Remove Task from Project or to find where a task lives. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task. Obtain it from List Project Tasks or Search Workspace Objects. |
| `limit` | number | no |  | Limit. Maximum number of projects to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Projects
- `data[].gid`: Project GID
- `data[].name`: Name
- `data[].archived`: Archived (boolean)
- `data[].color`: Color
- `data[].privacy_setting`: Privacy
- `data[].start_on`: Start On (date)
- `data[].due_on`: Due On (date)
- `data[].owner`: Owner
- `data[].owner.gid`: User GID
- `data[].owner.name`: Name
- `data[].team`: Team
- `data[].team.gid`: GID
- `data[].team.name`: Name
- `data[].created_at`: Created At (datetime)
- `data[].modified_at`: Modified At (datetime)
- `data[].permalink_url`: Project URL (url)
- `next_offset`: Next Page Offset

### `add_task_to_project`

**Add Task to Project.** Adds an existing task to a project (a task can live in several projects), optionally into a section or next to another task; also reorders a task already in the project. Use Move Task to Section to move it between sections of one project. Adding it again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task. Obtain it from List Project Tasks or Search Workspace Objects. |
| `project` | string | yes |  | Project GID. Gid of the project to add the task to. Obtain it from List Projects. |
| `section` | string | no |  | Section GID. Gid of a section in that project to put the task in (at the bottom). Obtain it from List Sections. |
| `insert_before` | string | no |  | Insert Before Task. Gid of a task in the project to place this task before. Cannot be combined with Insert After Task. |
| `insert_after` | string | no |  | Insert After Task. Gid of a task in the project to place this task after. Cannot be combined with Insert Before Task. |

Output fields:

- `success`: Success (boolean)
- `task_gid`: Task GID
- `project_gid`: Project GID

### `remove_task_from_project`

**Remove Task from Project.** Removes a task from one project without deleting it; the task stays in its other projects (or becomes project-less) and can be added back with Add Task to Project, though its section position is lost. Use Delete Task to delete it. Removing it again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task. Obtain it from List Project Tasks or Search Workspace Objects. |
| `project` | string | yes |  | Project GID. Gid of the project to remove the task from. Obtain it from List Task Projects. |

Output fields:

- `success`: Success (boolean)
- `task_gid`: Task GID
- `project_gid`: Project GID

### `add_task_followers`

**Add Task Followers.** Adds users as followers of a task so they get its notifications, and returns the updated task. Users already following are unaffected, so repeating the call converges and is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task. Obtain it from List Project Tasks or Search Workspace Objects. |
| `followers` | array | yes |  | Followers. Users to add, one per item: "me", an email address or a user gid. |

Output fields:

- `gid`: Task GID
- `name`: Name
- `resource_subtype`: Task Type
- `notes`: Notes
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `due_on`: Due On (date)
- `due_at`: Due At (datetime)
- `start_on`: Start On (date)
- `start_at`: Start At (datetime)
- `assignee`: Assignee
- `assignee.gid`: User GID
- `assignee.name`: Name
- `assignee.email`: Email (email)
- `parent`: Parent Task
- `parent.gid`: Task GID
- `parent.name`: Task Name
- `projects`: Projects
- `projects[].gid`: Project GID
- `projects[].name`: Project Name
- `memberships`: Project Placements
- `memberships[].project`: Project
- `memberships[].project.gid`: Project GID
- `memberships[].project.name`: Project Name
- `memberships[].section`: Section
- `memberships[].section.gid`: Section GID
- `memberships[].section.name`: Section Name
- `tags`: Tags
- `tags[].gid`: GID
- `tags[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Task URL (url)

### `remove_task_followers`

**Remove Task Followers.** Removes users from the followers of a task so they stop getting its notifications, and returns the updated task. Users not following are ignored, so repeating the call converges and is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task. Obtain it from List Project Tasks or Search Workspace Objects. |
| `followers` | array | yes |  | Followers. Users to remove, one per item: "me", an email address or a user gid. |

Output fields:

- `gid`: Task GID
- `name`: Name
- `resource_subtype`: Task Type
- `notes`: Notes
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `due_on`: Due On (date)
- `due_at`: Due At (datetime)
- `start_on`: Start On (date)
- `start_at`: Start At (datetime)
- `assignee`: Assignee
- `assignee.gid`: User GID
- `assignee.name`: Name
- `assignee.email`: Email (email)
- `parent`: Parent Task
- `parent.gid`: Task GID
- `parent.name`: Task Name
- `projects`: Projects
- `projects[].gid`: Project GID
- `projects[].name`: Project Name
- `memberships`: Project Placements
- `memberships[].project`: Project
- `memberships[].project.gid`: Project GID
- `memberships[].project.name`: Project Name
- `memberships[].section`: Section
- `memberships[].section.gid`: Section GID
- `memberships[].section.name`: Section Name
- `tags`: Tags
- `tags[].gid`: GID
- `tags[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Task URL (url)

### `add_task_comment`

**Add Task Comment.** Posts a comment on a task as the connected user, in plain text or Asana rich text (one of the two), optionally pinned. Followers of the task are notified. Each call posts a new comment, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task to comment on. Obtain it from List Project Tasks or Search Workspace Objects. |
| `text` | string | no |  | Text. Plain-text comment. Provide this or HTML Text, not both. |
| `html_text` | string | no |  | HTML Text. Rich-text comment in Asana rich text, wrapped in <body>...</body>, for example <body>Done, see <a href="https://example.com">the doc</a></body>. Provide this or Text, not both. |
| `is_pinned` | string | no |  | Pin Comment. Yes pins the comment to the top of the task. Leave empty to post it unpinned. One of `true`, `false`. |

Output fields:

- `gid`: Story GID
- `type`: Story Type
- `resource_subtype`: Event
- `text`: Text
- `html_text`: Rich Text (html)
- `is_pinned`: Pinned (boolean)
- `is_edited`: Edited (boolean)
- `is_editable`: Editable (boolean)
- `sticker_name`: Sticker
- `target`: Task
- `target.gid`: Task GID
- `target.name`: Task Name
- `created_by`: Created By
- `created_by.gid`: User GID
- `created_by.name`: Name
- `created_at`: Created At (datetime)

### `list_task_stories`

**List Task Stories.** Lists the stories of a task, oldest first: comments (resource_subtype comment_added) plus system activity such as assignments and due-date changes. Use it to read the comment thread or to find a comment gid for Update Comment or Delete Comment. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task. Obtain it from List Project Tasks or Search Workspace Objects. |
| `limit` | number | no |  | Limit. Maximum number of stories to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Stories
- `data[].gid`: Story GID
- `data[].type`: Story Type
- `data[].resource_subtype`: Event
- `data[].text`: Text
- `data[].is_pinned`: Pinned (boolean)
- `data[].is_edited`: Edited (boolean)
- `data[].created_by`: Created By
- `data[].created_by.gid`: User GID
- `data[].created_by.name`: Name
- `data[].created_at`: Created At (datetime)
- `next_offset`: Next Page Offset

### `get_story`

**Get Story.** Returns one story (a comment or a system activity entry) by gid, including its text, rich text, author, pin state and whether it can be edited. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `story` | string | yes |  | Story GID. Gid of the story. Obtain it from List Task Stories or Add Task Comment. |

Output fields:

- `gid`: Story GID
- `type`: Story Type
- `resource_subtype`: Event
- `text`: Text
- `html_text`: Rich Text (html)
- `is_pinned`: Pinned (boolean)
- `is_edited`: Edited (boolean)
- `is_editable`: Editable (boolean)
- `sticker_name`: Sticker
- `target`: Task
- `target.gid`: Task GID
- `target.name`: Task Name
- `created_by`: Created By
- `created_by.gid`: User GID
- `created_by.name`: Name
- `created_at`: Created At (datetime)

### `update_comment`

**Update Comment.** Replaces the text of a comment (plain text or rich text, one of the two) and/or pins or unpins it; unset fields stay unchanged. Only comment stories can be edited, and usually only by their author. Setting the same values again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `story` | string | yes |  | Comment (Story) GID. Gid of the comment story. Obtain it from List Task Stories or Add Task Comment. |
| `text` | string | no |  | Text. New plain-text comment; replaces the current text. Cannot be combined with HTML Text. |
| `html_text` | string | no |  | HTML Text. New rich-text comment wrapped in <body>...</body>; replaces the current text. Cannot be combined with Text. |
| `is_pinned` | string | no |  | Pinned. Yes pins the comment, No unpins it. Leave empty to keep the current state. One of `true`, `false`. |

Output fields:

- `gid`: Story GID
- `type`: Story Type
- `resource_subtype`: Event
- `text`: Text
- `html_text`: Rich Text (html)
- `is_pinned`: Pinned (boolean)
- `is_edited`: Edited (boolean)
- `is_editable`: Editable (boolean)
- `sticker_name`: Sticker
- `target`: Task
- `target.gid`: Task GID
- `target.name`: Task Name
- `created_by`: Created By
- `created_by.gid`: User GID
- `created_by.name`: Name
- `created_at`: Created At (datetime)

### `delete_comment`

**Delete Comment.** Permanently deletes a comment story. Asana only lets users delete stories they created. Irreversible; repeating the call on the same comment fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `story` | string | yes |  | Comment (Story) GID. Gid of the comment story. Obtain it from List Task Stories or Add Task Comment. |

Output fields:

- `success`: Success (boolean)
- `story_gid`: Deleted Comment GID

### `create_project`

**Create Project.** Creates a new empty project in a workspace, with optional description, color, default view, privacy and dates. In an organization a Team gid (from List Teams) is optional; without one Asana creates a teamless project visible only to its members; to copy an existing project with its tasks use Duplicate Project instead. Each call creates a separate project, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace or organization, for example 1201234567890123. Obtain it from List Workspaces. |
| `team` | string | no |  | Team GID. Gid of the team to share the project with. Needed when the workspace is an organization; obtain it from List Teams. Asana is phasing this field out in favour of Create Membership with the team as member. |
| `name` | string | yes |  | Project Name. Name of the project, for example "Q4 Launch". |
| `notes` | string | no |  | Description. Plain-text description of the project. |
| `color` | string | no |  | Color. Project color. Leave empty for the default. One of `"dark-pink"`, `"dark-green"`, `"dark-blue"`, `"dark-red"`, `"dark-teal"`, `"dark-brown"`, `"dark-orange"`, `"dark-purple"`, `"dark-warm-gray"`, `"light-pink"`, `"light-green"`, `"light-blue"`, `"light-red"`, `"light-teal"`, `"light-brown"`, `"light-orange"`, `"light-purple"`, `"light-warm-gray"`. |
| `default_view` | string | no |  | Default View. View the project opens in. Leave empty for list. One of `"list"`, `"board"`, `"calendar"`, `"timeline"`. |
| `privacy_setting` | string | no |  | Privacy. Who can see the project. Leave empty for the workspace default. Admins may restrict the allowed values. One of `"public_to_workspace"`, `"private"`. |
| `start_on` | string | no |  | Start Date. Project start date in YYYY-MM-DD format. Requires a due date. |
| `due_on` | string | no |  | Due Date. Project due date in YYYY-MM-DD format. |

Output fields:

- `gid`: Project GID
- `name`: Name
- `notes`: Notes
- `archived`: Archived (boolean)
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `color`: Color
- `default_view`: Default View
- `privacy_setting`: Privacy
- `start_on`: Start On (date)
- `due_on`: Due On (date)
- `owner`: Owner
- `owner.gid`: User GID
- `owner.name`: Name
- `team`: Team
- `team.gid`: GID
- `team.name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `members`: Members
- `members[].gid`: User GID
- `members[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `current_status_update`: Latest Status Update
- `current_status_update.gid`: Status Update GID
- `current_status_update.title`: Title
- `current_status_update.status_type`: Status
- `project_brief`: Project Brief
- `project_brief.gid`: Project Brief GID
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Project URL (url)

### `get_project`

**Get Project.** Returns one project by gid with its name, description, archived and completed state, dates, owner, team, privacy, latest status update, members, followers and link. Use Get Project Task Counts for task totals. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project. Obtain it from List Projects or Search Workspace Objects (object type project). |

Output fields:

- `gid`: Project GID
- `name`: Name
- `notes`: Notes
- `archived`: Archived (boolean)
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `color`: Color
- `default_view`: Default View
- `privacy_setting`: Privacy
- `start_on`: Start On (date)
- `due_on`: Due On (date)
- `owner`: Owner
- `owner.gid`: User GID
- `owner.name`: Name
- `team`: Team
- `team.gid`: GID
- `team.name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `members`: Members
- `members[].gid`: User GID
- `members[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `current_status_update`: Latest Status Update
- `current_status_update.gid`: Status Update GID
- `current_status_update.title`: Title
- `current_status_update.status_type`: Status
- `project_brief`: Project Brief
- `project_brief.gid`: Project Brief GID
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Project URL (url)

### `list_projects`

**List Projects.** Lists the projects in a workspace that the connected user can see, optionally only archived or only active ones. Use Search Workspace Objects to find a project by name, or List Memberships with a team to list a team's projects. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace or organization, for example 1201234567890123. Obtain it from List Workspaces. |
| `archived` | string | no |  | Archived. Yes returns only archived projects, No only active ones. Leave empty to return both. One of `true`, `false`. |
| `limit` | number | no |  | Limit. Maximum number of projects to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Projects
- `data[].gid`: Project GID
- `data[].name`: Name
- `data[].archived`: Archived (boolean)
- `data[].color`: Color
- `data[].privacy_setting`: Privacy
- `data[].start_on`: Start On (date)
- `data[].due_on`: Due On (date)
- `data[].owner`: Owner
- `data[].owner.gid`: User GID
- `data[].owner.name`: Name
- `data[].team`: Team
- `data[].team.gid`: GID
- `data[].team.name`: Name
- `data[].created_at`: Created At (datetime)
- `data[].modified_at`: Modified At (datetime)
- `data[].permalink_url`: Project URL (url)
- `next_offset`: Next Page Offset

### `update_project`

**Update Project.** Updates only the project fields you set (name, description, color, default view, privacy, owner, dates, archived); everything else is left unchanged. Archiving hides the project but keeps it, and Archived set to No restores it. Members and followers are changed with Add Project Members and Add Project Followers. Setting the same values again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project to update. Obtain it from List Projects or Search Workspace Objects. |
| `name` | string | no |  | Project Name. New project name. Leave empty to keep it. |
| `notes` | string | no |  | Description. New plain-text description; replaces the current one. Leave empty to keep it. |
| `color` | string | no |  | Color. New project color. Leave empty to keep it. One of `"dark-pink"`, `"dark-green"`, `"dark-blue"`, `"dark-red"`, `"dark-teal"`, `"dark-brown"`, `"dark-orange"`, `"dark-purple"`, `"dark-warm-gray"`, `"light-pink"`, `"light-green"`, `"light-blue"`, `"light-red"`, `"light-teal"`, `"light-brown"`, `"light-orange"`, `"light-purple"`, `"light-warm-gray"`. |
| `default_view` | string | no |  | Default View. New default view. Leave empty to keep it. One of `"list"`, `"board"`, `"calendar"`, `"timeline"`. |
| `privacy_setting` | string | no |  | Privacy. New privacy setting. Making a project private hides it from non-members. Leave empty to keep it. One of `"public_to_workspace"`, `"private"`. |
| `owner` | string | no |  | Owner. New owner: "me", an email address or a user gid. Leave empty to keep it. |
| `start_on` | string | no |  | Start Date. New start date in YYYY-MM-DD format. The project must have a due date. |
| `due_on` | string | no |  | Due Date. New due date in YYYY-MM-DD format. |
| `archived` | string | no |  | Archived. Yes archives the project, No unarchives it. Leave empty to keep the current state. One of `true`, `false`. |

Output fields:

- `gid`: Project GID
- `name`: Name
- `notes`: Notes
- `archived`: Archived (boolean)
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `color`: Color
- `default_view`: Default View
- `privacy_setting`: Privacy
- `start_on`: Start On (date)
- `due_on`: Due On (date)
- `owner`: Owner
- `owner.gid`: User GID
- `owner.name`: Name
- `team`: Team
- `team.gid`: GID
- `team.name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `members`: Members
- `members[].gid`: User GID
- `members[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `current_status_update`: Latest Status Update
- `current_status_update.gid`: Status Update GID
- `current_status_update.title`: Title
- `current_status_update.status_type`: Status
- `project_brief`: Project Brief
- `project_brief.gid`: Project Brief GID
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Project URL (url)

### `delete_project`

**Delete Project.** Deletes a project; the API offers no restore, so treat it as permanent. Tasks that live only in this project may go with it, so move any you need first with Add Task to Project. To keep the project but hide it, use Update Project with Archived set to Yes instead. Not idempotent: repeating the call on the same project fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project to delete. Obtain it from List Projects or Search Workspace Objects. |

Output fields:

- `success`: Success (boolean)
- `project_gid`: Deleted Project GID

### `duplicate_project`

**Duplicate Project.** Starts an asynchronous copy of a project (tasks, views and rules are always copied) and returns a job (gid, status, new_project). The copy may not be finished yet: poll Get Job with the returned job gid until status is succeeded. Choose extra parts with Include. Each call starts a new copy, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project to copy. Obtain it from List Projects or Search Workspace Objects. |
| `name` | string | yes |  | New Project Name. Name of the new project, for example "Q1 Launch". |
| `include` | array | no |  | Include. Optional parts to copy in addition to tasks, views and rules. One of `"members"`, `"notes"`, `"forms"`, `"permissions"`, `"allocations"`, `"task_assignee"`, `"task_attachments"`, `"task_dates"`, `"task_dependencies"`, `"task_followers"`, `"task_notes"`, `"task_projects"`, `"task_subtasks"`, `"task_tags"`, `"task_templates"`, `"task_type_default"`. |

Output fields:

- `gid`: Job GID
- `resource_subtype`: Job Type
- `status`: Status
- `new_task`: New Task
- `new_task.gid`: Task GID
- `new_task.name`: Task Name
- `new_project`: New Project
- `new_project.gid`: Project GID
- `new_project.name`: Project Name
- `new_project_template`: New Project Template
- `new_project_template.gid`: Project Template GID
- `new_project_template.name`: Project Template Name

### `get_project_task_counts`

**Get Project Task Counts.** Returns task and milestone totals for one project (total, completed, incomplete). Use it for progress summaries instead of paging through List Project Tasks. Asana rate-limits this endpoint more strictly, so avoid calling it in tight loops. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project. Obtain it from List Projects or Search Workspace Objects. |

Output fields:

- `project_gid`: Project GID
- `num_tasks`: Tasks (number)
- `num_completed_tasks`: Completed Tasks (number)
- `num_incomplete_tasks`: Incomplete Tasks (number)
- `num_milestones`: Milestones (number)
- `num_completed_milestones`: Completed Milestones (number)
- `num_incomplete_milestones`: Incomplete Milestones (number)

### `add_project_members`

**Add Project Members.** Adds users as members of a project with the project's default access level and returns the updated project; their notification settings may also make them followers. Use Create Membership to add a team or to choose the access level. Existing members are unaffected, so repeating the call converges and is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project. Obtain it from List Projects or Search Workspace Objects. |
| `members` | array | yes |  | Members. Users to add, one per item: "me", an email address or a user gid. |

Output fields:

- `gid`: Project GID
- `name`: Name
- `notes`: Notes
- `archived`: Archived (boolean)
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `color`: Color
- `default_view`: Default View
- `privacy_setting`: Privacy
- `start_on`: Start On (date)
- `due_on`: Due On (date)
- `owner`: Owner
- `owner.gid`: User GID
- `owner.name`: Name
- `team`: Team
- `team.gid`: GID
- `team.name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `members`: Members
- `members[].gid`: User GID
- `members[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `current_status_update`: Latest Status Update
- `current_status_update.gid`: Status Update GID
- `current_status_update.title`: Title
- `current_status_update.status_type`: Status
- `project_brief`: Project Brief
- `project_brief.gid`: Project Brief GID
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Project URL (url)

### `remove_project_members`

**Remove Project Members.** Removes users from the members of a project, revoking the access that membership gave them (a private project becomes invisible to them), and returns the updated project. Use Remove Project Followers to only stop notifications. Users who are not members are ignored, so repeating the call converges. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project. Obtain it from List Projects or Search Workspace Objects. |
| `members` | array | yes |  | Members. Users to remove, one per item: "me", an email address or a user gid. |

Output fields:

- `gid`: Project GID
- `name`: Name
- `notes`: Notes
- `archived`: Archived (boolean)
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `color`: Color
- `default_view`: Default View
- `privacy_setting`: Privacy
- `start_on`: Start On (date)
- `due_on`: Due On (date)
- `owner`: Owner
- `owner.gid`: User GID
- `owner.name`: Name
- `team`: Team
- `team.gid`: GID
- `team.name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `members`: Members
- `members[].gid`: User GID
- `members[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `current_status_update`: Latest Status Update
- `current_status_update.gid`: Status Update GID
- `current_status_update.title`: Title
- `current_status_update.status_type`: Status
- `project_brief`: Project Brief
- `project_brief.gid`: Project Brief GID
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Project URL (url)

### `add_project_followers`

**Add Project Followers.** Adds users as followers of a project so they are notified when tasks are added, and returns the updated project. Users who are not yet members also become members. Existing followers are unaffected, so repeating the call converges and is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project. Obtain it from List Projects or Search Workspace Objects. |
| `followers` | array | yes |  | Followers. Users to add, one per item: "me", an email address or a user gid. |

Output fields:

- `gid`: Project GID
- `name`: Name
- `notes`: Notes
- `archived`: Archived (boolean)
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `color`: Color
- `default_view`: Default View
- `privacy_setting`: Privacy
- `start_on`: Start On (date)
- `due_on`: Due On (date)
- `owner`: Owner
- `owner.gid`: User GID
- `owner.name`: Name
- `team`: Team
- `team.gid`: GID
- `team.name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `members`: Members
- `members[].gid`: User GID
- `members[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `current_status_update`: Latest Status Update
- `current_status_update.gid`: Status Update GID
- `current_status_update.title`: Title
- `current_status_update.status_type`: Status
- `project_brief`: Project Brief
- `project_brief.gid`: Project Brief GID
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Project URL (url)

### `remove_project_followers`

**Remove Project Followers.** Removes users from the followers of a project so they stop getting "task added" notifications, and returns the updated project. Their membership is not affected (use Remove Project Members for that). Users not following are ignored, so repeating the call converges and is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project. Obtain it from List Projects or Search Workspace Objects. |
| `followers` | array | yes |  | Followers. Users to remove, one per item: "me", an email address or a user gid. |

Output fields:

- `gid`: Project GID
- `name`: Name
- `notes`: Notes
- `archived`: Archived (boolean)
- `completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `color`: Color
- `default_view`: Default View
- `privacy_setting`: Privacy
- `start_on`: Start On (date)
- `due_on`: Due On (date)
- `owner`: Owner
- `owner.gid`: User GID
- `owner.name`: Name
- `team`: Team
- `team.gid`: GID
- `team.name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `members`: Members
- `members[].gid`: User GID
- `members[].name`: Name
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `current_status_update`: Latest Status Update
- `current_status_update.gid`: Status Update GID
- `current_status_update.title`: Title
- `current_status_update.status_type`: Status
- `project_brief`: Project Brief
- `project_brief.gid`: Project Brief GID
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)
- `permalink_url`: Project URL (url)

### `create_section`

**Create Section.** Creates a new section in a project, at the end or before/after an existing section. Sections are list headings or board columns; move tasks into one with Move Task to Section. Each call creates a separate section, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project. Obtain it from List Projects or Search Workspace Objects. |
| `name` | string | yes |  | Section Name. Name of the section, for example "In review". Cannot be empty. |
| `insert_before` | string | no |  | Insert Before Section. Gid of an existing section in this project to place the new one before. Cannot be combined with Insert After Section. |
| `insert_after` | string | no |  | Insert After Section. Gid of an existing section in this project to place the new one after. Cannot be combined with Insert Before Section. |

Output fields:

- `gid`: Section GID
- `name`: Name
- `project`: Project
- `project.gid`: Project GID
- `project.name`: Project Name
- `created_at`: Created At (datetime)

### `get_section`

**Get Section.** Returns one section by gid with its name, creation time and project. Use List Section Tasks for its tasks. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `section` | string | yes |  | Section GID. Gid of the section. Obtain it from List Sections. |

Output fields:

- `gid`: Section GID
- `name`: Name
- `project`: Project
- `project.gid`: Project GID
- `project.name`: Project Name
- `created_at`: Created At (datetime)

### `list_sections`

**List Sections.** Lists the sections (list headings or board columns) of a project in display order. Use it to find the section gid for Move Task to Section, List Section Tasks or Move Section. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project. Obtain it from List Projects or Search Workspace Objects. |
| `limit` | number | no |  | Limit. Maximum number of sections to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Sections
- `data[].gid`: Section GID
- `data[].name`: Name
- `data[].project`: Project
- `data[].project.gid`: Project GID
- `data[].project.name`: Project Name
- `data[].created_at`: Created At (datetime)
- `next_offset`: Next Page Offset

### `update_section`

**Rename Section.** Renames a section; the name is the only section field Asana lets you change. Use Move Section to reorder it. Setting the same name again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `section` | string | yes |  | Section GID. Gid of the section. Obtain it from List Sections. |
| `name` | string | yes |  | Section Name. New name of the section. Cannot be empty. |

Output fields:

- `gid`: Section GID
- `name`: Name
- `project`: Project
- `project.gid`: Project GID
- `project.name`: Project Name
- `created_at`: Created At (datetime)

### `delete_section`

**Delete Section.** Permanently deletes a section. Asana only deletes empty sections and never the last remaining section of a project, so move its tasks out first with Move Task to Section. Not idempotent: repeating the call on the same section fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `section` | string | yes |  | Section GID. Gid of the section to delete. Obtain it from List Sections. |

Output fields:

- `success`: Success (boolean)
- `section_gid`: Deleted Section GID

### `move_section`

**Move Section.** Moves a section immediately before or after another section of the same project (exactly one of the two). Sections cannot move between projects. Repeating the same move converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project both sections belong to. Obtain it from List Projects. |
| `section` | string | yes |  | Section GID. Gid of the section to move. Obtain it from List Sections. |
| `before_section` | string | no |  | Before Section. Gid of the section to place it immediately before. Provide this or After Section. |
| `after_section` | string | no |  | After Section. Gid of the section to place it immediately after. Provide this or Before Section. |

Output fields:

- `success`: Success (boolean)
- `section_gid`: Section GID
- `project_gid`: Project GID

### `move_task_to_section`

**Move Task to Section.** Puts a task into a section (list heading or board column), removing it from its other sections in that project; it goes to the top unless you place it before or after another task. Use Add Task to Project to put a task into another project. Repeating the same move converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `section` | string | yes |  | Section GID. Gid of the target section. Obtain it from List Sections. |
| `task` | string | yes |  | Task GID. Gid of the task to move. Obtain it from List Project Tasks or Search Workspace Objects. |
| `insert_before` | string | no |  | Insert Before Task. Gid of a task in the section to place this task before. Cannot be combined with Insert After Task. |
| `insert_after` | string | no |  | Insert After Task. Gid of a task in the section to place this task after. Cannot be combined with Insert Before Task. |

Output fields:

- `success`: Success (boolean)
- `task_gid`: Task GID
- `section_gid`: Section GID

### `list_section_tasks`

**List Section Tasks.** Lists the tasks in one section (board column or list heading), optionally only incomplete ones. Asana documents this endpoint for board-view projects; if it returns nothing for a list-view project, use List Project Tasks instead. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `section` | string | yes |  | Section GID. Gid of the section. Obtain it from List Sections. |
| `completed_since` | string | no |  | Completed Since. Return incomplete tasks plus tasks completed after this ISO 8601 date-time. Use "now" to return only incomplete tasks. Leave empty to return all tasks. |
| `limit` | number | no |  | Limit. Maximum number of tasks to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Tasks
- `data[].gid`: Task GID
- `data[].name`: Name
- `data[].resource_subtype`: Task Type
- `data[].completed`: Completed (boolean)
- `data[].completed_at`: Completed At (datetime)
- `data[].due_on`: Due On (date)
- `data[].due_at`: Due At (datetime)
- `data[].start_on`: Start On (date)
- `data[].assignee`: Assignee
- `data[].assignee.gid`: User GID
- `data[].assignee.name`: Name
- `data[].parent`: Parent Task
- `data[].parent.gid`: Task GID
- `data[].parent.name`: Task Name
- `data[].created_at`: Created At (datetime)
- `data[].modified_at`: Modified At (datetime)
- `data[].permalink_url`: Task URL (url)
- `next_offset`: Next Page Offset

### `create_membership`

**Create Membership.** Adds a user or a team as a member of a project (also goals, portfolios and custom fields on paid plans) with a chosen access level, and returns the new membership. Projects accept admin, editor or commenter; goals viewer, commenter, editor or admin; portfolios admin, editor or viewer; custom fields admin, editor or user. A user must already belong to the workspace; otherwise Asana answers "Member is required". Use Add Project Members to add several users at the default level. Not idempotent: a repeat may fail or create a second record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent` | string | yes |  | Parent GID. Gid of the project (or goal, portfolio, custom field or custom type) to share. Obtain a project gid from List Projects, or a custom field gid from List Custom Fields. |
| `member` | string | yes |  | Member GID. Gid of the user or team to add. Obtain a team gid from List Teams, or a user gid from Get Current User or Search Workspace Objects. |
| `access_level` | string | no |  | Access Level. Access to grant; valid values depend on the parent type. Leave empty for the parent's default. One of `"admin"`, `"editor"`, `"commenter"`, `"viewer"`, `"user"`. |

Output fields:

- `gid`: Membership GID
- `resource_subtype`: Membership Type
- `access_level`: Access Level
- `parent`: Parent
- `parent.gid`: Parent GID
- `parent.resource_type`: Parent Type
- `parent.name`: Parent Name
- `member`: Member
- `member.gid`: Member GID
- `member.resource_type`: Member Type
- `member.name`: Member Name

### `get_membership`

**Get Membership.** Returns one membership by gid: the member (user or team), the parent (project, goal, portfolio or custom field) and the access level. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `membership` | string | yes |  | Membership GID. Gid of the membership. Obtain it from List Memberships or Create Membership. |

Output fields:

- `gid`: Membership GID
- `resource_subtype`: Membership Type
- `access_level`: Access Level
- `parent`: Parent
- `parent.gid`: Parent GID
- `parent.resource_type`: Parent Type
- `parent.name`: Parent Name
- `member`: Member
- `member.gid`: Member GID
- `member.resource_type`: Member Type
- `member.name`: Member Name

### `list_memberships`

**List Memberships.** Lists memberships with their access levels. Pass a Parent (project, goal or portfolio gid) to see its members, optionally filtered to one Member; or pass only a team as Member to list the projects shared with that team. Use it to find the membership gid for Delete Membership. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent` | string | no |  | Parent GID. Gid of the project, goal or portfolio whose members to list. Leave empty only when Member is a team. |
| `member` | string | no |  | Member GID. Gid of a user or team to filter on. Required (and must be a team) when Parent is empty. |
| `limit` | number | no |  | Limit. Maximum number of memberships to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Memberships
- `data[].gid`: Membership GID
- `data[].resource_subtype`: Membership Type
- `data[].access_level`: Access Level
- `data[].parent`: Parent
- `data[].parent.gid`: Parent GID
- `data[].parent.resource_type`: Parent Type
- `data[].parent.name`: Parent Name
- `data[].member`: Member
- `data[].member.gid`: Member GID
- `data[].member.resource_type`: Member Type
- `data[].member.name`: Member Name
- `next_offset`: Next Page Offset

### `delete_membership`

**Delete Membership.** Deletes one membership, revoking that user's or team's access to the project, goal or portfolio. Access can only come back through a new membership. Not idempotent: repeating the call on the same membership fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `membership` | string | yes |  | Membership GID. Gid of the membership to delete. Obtain it from List Memberships. |

Output fields:

- `success`: Success (boolean)
- `membership_gid`: Deleted Membership GID

### `create_status_update`

**Create Status Update.** Posts a status update (status type, title, text) on a project, and on paid plans a portfolio or goal; it becomes the current status and notifies followers. Projects accept on_track, at_risk, off_track, on_hold, complete or dropped; goals on_track, at_risk, off_track, achieved, partial, missed or dropped. Each call posts a new update, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent` | string | yes |  | Parent GID. Gid of the project (or portfolio or goal) to post on. Obtain a project gid from List Projects. |
| `status_type` | string | yes |  | Status. Overall status; valid values depend on the parent type. One of `"on_track"`, `"at_risk"`, `"off_track"`, `"on_hold"`, `"complete"`, `"achieved"`, `"partial"`, `"missed"`, `"dropped"`. |
| `title` | string | no |  | Title. Headline of the update, for example "Week 40: on track for launch". |
| `text` | string | yes |  | Text. Plain-text body of the update. Required by Asana even when HTML Text is also set. |
| `html_text` | string | no |  | HTML Text. Optional rich-text body in Asana rich text, wrapped in <body>...</body>. |

Output fields:

- `gid`: Status Update GID
- `title`: Title
- `status_type`: Status
- `text`: Text
- `resource_subtype`: Update Type
- `parent`: Parent
- `parent.gid`: GID
- `parent.name`: Name
- `author`: Author
- `author.gid`: User GID
- `author.name`: Name
- `created_by`: Created By
- `created_by.gid`: User GID
- `created_by.name`: Name
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)

### `get_status_update`

**Get Status Update.** Returns one status update by gid with its status type, title, text, author, parent and timestamps. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_update` | string | yes |  | Status Update GID. Gid of the status update. Obtain it from List Status Updates or Create Status Update. |

Output fields:

- `gid`: Status Update GID
- `title`: Title
- `status_type`: Status
- `text`: Text
- `resource_subtype`: Update Type
- `parent`: Parent
- `parent.gid`: GID
- `parent.name`: Name
- `author`: Author
- `author.gid`: User GID
- `author.name`: Name
- `created_by`: Created By
- `created_by.gid`: User GID
- `created_by.name`: Name
- `created_at`: Created At (datetime)
- `modified_at`: Modified At (datetime)

### `list_status_updates`

**List Status Updates.** Lists the status updates posted on a project (or portfolio or goal), optionally only those created after a moment. Use it to review project health over time. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent` | string | yes |  | Parent GID. Gid of the project, portfolio or goal. Obtain a project gid from List Projects. |
| `created_since` | string | no |  | Created Since. Only return updates created after this ISO 8601 date-time, for example 2026-09-01T00:00:00Z. |
| `limit` | number | no |  | Limit. Maximum number of status updates to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Status Updates
- `data[].gid`: Status Update GID
- `data[].title`: Title
- `data[].status_type`: Status
- `data[].text`: Text
- `data[].resource_subtype`: Update Type
- `data[].parent`: Parent
- `data[].parent.gid`: GID
- `data[].parent.name`: Name
- `data[].author`: Author
- `data[].author.gid`: User GID
- `data[].author.name`: Name
- `data[].created_by`: Created By
- `data[].created_by.gid`: User GID
- `data[].created_by.name`: Name
- `data[].created_at`: Created At (datetime)
- `data[].modified_at`: Modified At (datetime)
- `next_offset`: Next Page Offset

### `delete_status_update`

**Delete Status Update.** Permanently deletes one status update. Irreversible; repeating the call on the same update fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_update` | string | yes |  | Status Update GID. Gid of the status update to delete. Obtain it from List Status Updates. |

Output fields:

- `success`: Success (boolean)
- `status_update_gid`: Deleted Status Update GID

### `create_project_brief`

**Create Project Brief.** Creates the project brief, the overview document shown on a project's Overview tab, with a title and a body in rich text (preferred) or plain text, not both; plain text is escaped and wrapped in <body> for Asana. A project has at most one brief; use Get Project to find an existing one (project_brief) and Update Project Brief to change it. Available on the free plan. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project. Obtain it from List Projects or Search Workspace Objects. |
| `title` | string | no |  | Title. Title of the brief, for example "Launch plan". |
| `html_text` | string | no |  | HTML Text. Body in Asana rich text, wrapped in <body>...</body>. Cannot be combined with Text. |
| `text` | string | no |  | Text. Plain-text body; it is sent to Asana as escaped rich text inside <body>...</body>. Cannot be combined with HTML Text. |

Output fields:

- `gid`: Project Brief GID
- `title`: Title
- `text`: Text
- `html_text`: Rich Text (html)
- `project`: Project
- `project.gid`: Project GID
- `project.name`: Project Name
- `permalink_url`: Brief URL (url)

### `get_project_brief`

**Get Project Brief.** Returns one project brief by gid with its title, plain text, rich text, project and link. The brief gid is the project_brief field of Get Project. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_brief` | string | yes |  | Project Brief GID. Gid of the project brief. Obtain it from the project_brief field of Get Project, or from Create Project Brief. |

Output fields:

- `gid`: Project Brief GID
- `title`: Title
- `text`: Text
- `html_text`: Rich Text (html)
- `project`: Project
- `project.gid`: Project GID
- `project.name`: Project Name
- `permalink_url`: Brief URL (url)

### `update_project_brief`

**Update Project Brief.** Updates only the brief fields you set: the title, and/or the body in rich text (preferred) or plain text, not both. A new body replaces the whole current body. Setting the same values again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_brief` | string | yes |  | Project Brief GID. Gid of the project brief. Obtain it from the project_brief field of Get Project. |
| `title` | string | no |  | Title. New title. Leave empty to keep it. |
| `html_text` | string | no |  | HTML Text. New body in Asana rich text, wrapped in <body>...</body>. Cannot be combined with Text. |
| `text` | string | no |  | Text. New plain-text body. Cannot be combined with HTML Text. |

Output fields:

- `gid`: Project Brief GID
- `title`: Title
- `text`: Text
- `html_text`: Rich Text (html)
- `project`: Project
- `project.gid`: Project GID
- `project.name`: Project Name
- `permalink_url`: Brief URL (url)

### `delete_project_brief`

**Delete Project Brief.** Permanently deletes a project brief (the project itself is not affected). Irreversible; repeating the call on the same brief fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_brief` | string | yes |  | Project Brief GID. Gid of the project brief to delete. Obtain it from the project_brief field of Get Project. |

Output fields:

- `success`: Success (boolean)
- `project_brief_gid`: Deleted Project Brief GID

### `create_tag`

**Create Tag.** Creates a new tag in a workspace, with optional color and description. Check List Tags or Search Workspace Objects first to reuse an existing tag instead of making a look-alike; apply it with Add Tag to Task. Each call creates a separate tag, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace, for example 1201234567890123. Obtain it from List Workspaces. |
| `name` | string | yes |  | Tag Name. Name of the tag, for example "urgent". |
| `color` | string | no |  | Color. Tag color. Leave empty for no color. One of `"dark-pink"`, `"dark-green"`, `"dark-blue"`, `"dark-red"`, `"dark-teal"`, `"dark-brown"`, `"dark-orange"`, `"dark-purple"`, `"dark-warm-gray"`, `"light-pink"`, `"light-green"`, `"light-blue"`, `"light-red"`, `"light-teal"`, `"light-brown"`, `"light-orange"`, `"light-purple"`, `"light-warm-gray"`. |
| `notes` | string | no |  | Description. Optional description of what the tag means. |

Output fields:

- `gid`: Tag GID
- `name`: Name
- `color`: Color
- `notes`: Notes
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `created_at`: Created At (datetime)
- `permalink_url`: Tag URL (url)

### `get_tag`

**Get Tag.** Returns one tag by gid with its name, color, description, followers, workspace and link. Use List Tag Tasks for the tasks carrying it. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag` | string | yes |  | Tag GID. Gid of the tag. Obtain it from List Tags, List Task Tags or Search Workspace Objects (object type tag). |

Output fields:

- `gid`: Tag GID
- `name`: Name
- `color`: Color
- `notes`: Notes
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `created_at`: Created At (datetime)
- `permalink_url`: Tag URL (url)

### `list_tags`

**List Tags.** Lists the tags of a workspace with their gid, name and color. Use it to find a tag gid for Add Tag to Task or List Tag Tasks; Search Workspace Objects finds one tag by name faster. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace, for example 1201234567890123. Obtain it from List Workspaces. |
| `limit` | number | no |  | Limit. Maximum number of tags to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Tags
- `data[].gid`: Tag GID
- `data[].name`: Name
- `data[].color`: Color
- `data[].created_at`: Created At (datetime)
- `data[].permalink_url`: Tag URL (url)
- `next_offset`: Next Page Offset

### `update_tag`

**Update Tag.** Updates only the tag fields you set (name, color, description); the change shows on every task carrying the tag. Setting the same values again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag` | string | yes |  | Tag GID. Gid of the tag. Obtain it from List Tags or Search Workspace Objects. |
| `name` | string | no |  | Tag Name. New name. Leave empty to keep it. |
| `color` | string | no |  | Color. New color. Leave empty to keep it. One of `"dark-pink"`, `"dark-green"`, `"dark-blue"`, `"dark-red"`, `"dark-teal"`, `"dark-brown"`, `"dark-orange"`, `"dark-purple"`, `"dark-warm-gray"`, `"light-pink"`, `"light-green"`, `"light-blue"`, `"light-red"`, `"light-teal"`, `"light-brown"`, `"light-orange"`, `"light-purple"`, `"light-warm-gray"`. |
| `notes` | string | no |  | Description. New description; replaces the current one. Leave empty to keep it. |

Output fields:

- `gid`: Tag GID
- `name`: Name
- `color`: Color
- `notes`: Notes
- `followers`: Followers
- `followers[].gid`: User GID
- `followers[].name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `created_at`: Created At (datetime)
- `permalink_url`: Tag URL (url)

### `delete_tag`

**Delete Tag.** Permanently deletes a tag and removes it from every task that carries it (the tasks themselves stay). To take the tag off one task only, use Remove Tag from Task. Irreversible; repeating the call on the same tag fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag` | string | yes |  | Tag GID. Gid of the tag to delete. Obtain it from List Tags. |

Output fields:

- `success`: Success (boolean)
- `tag_gid`: Deleted Tag GID

### `list_task_tags`

**List Task Tags.** Lists the tags currently applied to one task. Use it before Remove Tag from Task. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task. Obtain it from List Project Tasks or Search Workspace Objects. |
| `limit` | number | no |  | Limit. Maximum number of tags to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Tags
- `data[].gid`: Tag GID
- `data[].name`: Name
- `data[].color`: Color
- `data[].created_at`: Created At (datetime)
- `data[].permalink_url`: Tag URL (url)
- `next_offset`: Next Page Offset

### `add_tag_to_task`

**Add Tag to Task.** Applies an existing tag to a task, by tag gid (resolve a name with List Tags or Search Workspace Objects, or make a new tag with Create Tag). Applying a tag the task already has converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task. Obtain it from List Project Tasks or Search Workspace Objects. |
| `tag` | string | yes |  | Tag GID. Gid of the tag to apply. Obtain it from List Tags or Search Workspace Objects (object type tag). |

Output fields:

- `success`: Success (boolean)
- `task_gid`: Task GID
- `tag_gid`: Tag GID

### `remove_tag_from_task`

**Remove Tag from Task.** Removes one tag from one task; the tag itself and its other tasks are unaffected (use Delete Tag to delete the tag everywhere). Removing a tag the task does not have converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task. Obtain it from List Project Tasks or Search Workspace Objects. |
| `tag` | string | yes |  | Tag GID. Gid of the tag to remove. Obtain it from List Task Tags. |

Output fields:

- `success`: Success (boolean)
- `task_gid`: Task GID
- `tag_gid`: Tag GID

### `list_tag_tasks`

**List Tag Tasks.** Lists the tasks carrying one tag, across all projects of the workspace. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag` | string | yes |  | Tag GID. Gid of the tag. Obtain it from List Tags or Search Workspace Objects (object type tag). |
| `limit` | number | no |  | Limit. Maximum number of tasks to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Tasks
- `data[].gid`: Task GID
- `data[].name`: Name
- `data[].resource_subtype`: Task Type
- `data[].completed`: Completed (boolean)
- `data[].completed_at`: Completed At (datetime)
- `data[].due_on`: Due On (date)
- `data[].due_at`: Due At (datetime)
- `data[].start_on`: Start On (date)
- `data[].assignee`: Assignee
- `data[].assignee.gid`: User GID
- `data[].assignee.name`: Name
- `data[].parent`: Parent Task
- `data[].parent.gid`: Task GID
- `data[].parent.name`: Task Name
- `data[].created_at`: Created At (datetime)
- `data[].modified_at`: Modified At (datetime)
- `data[].permalink_url`: Task URL (url)
- `next_offset`: Next Page Offset

### `get_user`

**Get User.** Returns one user (gid, name, email) and the workspaces they share with the connected user. Accepts "me", an email address or a user gid, so it also turns an email into a gid. Use Get Current User for yourself and List Users to browse a workspace or team. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | yes |  | User. User to look up: "me", an email address or a user gid. Obtain gids from List Users or Search Workspace Objects (object type user). |

Output fields:

- `gid`: User GID
- `name`: Name
- `email`: Email (email)
- `workspaces`: Workspaces
- `workspaces[].gid`: Workspace GID
- `workspaces[].name`: Workspace Name

### `list_users`

**List Users.** Lists users (gid, name, email) in a workspace or in a team, sorted by user gid. Set Workspace GID, Team GID or both. Use it to find a user gid for assignees, followers or memberships; to look up one known email use Get User instead. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | no |  | Workspace GID. Gid of the workspace or organization whose users to list. Obtain it from List Workspaces. Set this, Team GID, or both. |
| `team` | string | no |  | Team GID. Gid of the team whose users to list. Obtain it from List Teams. Set this, Workspace GID, or both. |
| `limit` | number | no |  | Limit. Maximum number of users to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Users
- `data[].gid`: User GID
- `data[].name`: Name
- `data[].email`: Email (email)
- `next_offset`: Next Page Offset

### `list_favorites`

**List My Favorites.** Lists the connected user's own favorites (projects, tasks, tags, users, portfolios or project templates) in one workspace, in sidebar order. Asana only returns favorites for the authenticated user, so there is no way to read another user's favorites. A quick way to find the projects the user cares about. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace to read favorites from. Obtain it from List Workspaces or Get Current User. |
| `resource_type` | string | yes |  | Favorite Type. Kind of favorites to return. One of `"project"`, `"task"`, `"tag"`, `"user"`, `"portfolio"`, `"project_template"`. |
| `limit` | number | no |  | Limit. Maximum number of favorites to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Favorites
- `data[].gid`: GID
- `data[].name`: Name
- `next_offset`: Next Page Offset

### `get_workspace`

**Get Workspace.** Returns one workspace: name, is_organization and its email domains. Check is_organization before using team actions, because teams exist only in organizations. Use List Workspaces to find workspace gids. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace or organization. Obtain it from List Workspaces or Get Current User. |

Output fields:

- `gid`: Workspace GID
- `name`: Name
- `is_organization`: Is Organization (boolean)
- `email_domains`: Email Domains

### `list_workspace_memberships`

**List Workspace Memberships.** Lists workspace memberships: each user with is_active, is_admin, is_guest and is_view_only flags. Filter by one user to check whether they are an admin or a guest before workspace or team changes. Use List Users when only names and emails are needed. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace or organization. Obtain it from List Workspaces. |
| `user` | string | no |  | User. Only return the membership of this user: "me", an email address or a user gid. Leave empty to list everyone. |
| `limit` | number | no |  | Limit. Maximum number of memberships to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Workspace Memberships
- `data[].gid`: Workspace Membership GID
- `data[].user`: User
- `data[].user.gid`: User GID
- `data[].user.name`: Name
- `data[].workspace`: Workspace
- `data[].workspace.gid`: Workspace GID
- `data[].workspace.name`: Workspace Name
- `data[].is_active`: Active (boolean)
- `data[].is_admin`: Admin (boolean)
- `data[].is_guest`: Guest (boolean)
- `data[].is_view_only`: View Only (boolean)
- `data[].created_at`: Created At (datetime)
- `next_offset`: Next Page Offset

### `get_workspace_membership`

**Get Workspace Membership.** Returns one workspace membership: the user, the workspace and the is_active, is_admin, is_guest and is_view_only flags. Use List Workspace Memberships to find membership gids or to look up a user's membership directly. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_membership` | string | yes |  | Workspace Membership GID. Gid of the workspace membership. Obtain it from List Workspace Memberships. |

Output fields:

- `gid`: Workspace Membership GID
- `user`: User
- `user.gid`: User GID
- `user.name`: Name
- `workspace`: Workspace
- `workspace.gid`: Workspace GID
- `workspace.name`: Workspace Name
- `is_active`: Active (boolean)
- `is_admin`: Admin (boolean)
- `is_guest`: Guest (boolean)
- `is_view_only`: View Only (boolean)
- `created_at`: Created At (datetime)

### `add_user_to_workspace`

**Add User to Workspace.** Adds a user to a workspace or organization by email or gid and returns the user record. Only workspace admins can do this. An email that has no Asana account receives an invitation, and a new member may take a paid seat on paid plans, so confirm with the user first. Adding someone who is already a member leaves them in place. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace or organization. Obtain it from List Workspaces. |
| `user` | string | yes |  | User. User to add: an email address or a user gid. |

Output fields:

- `gid`: User GID
- `name`: Name
- `email`: Email (email)

### `remove_user_from_workspace`

**Remove User from Workspace.** Removes a user from a workspace or organization. Admin only. Ownership of the removed user's resources is transferred to the connected user, and their private resources become inaccessible unless they were made public before removal; re-adding the user does not restore that. Confirm with the user first. Not idempotent: a repeat call on a removed user fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace or organization. Obtain it from List Workspaces. |
| `user` | string | yes |  | User. User to remove: an email address or a user gid. Obtain it from List Users or List Workspace Memberships. |

Output fields:

- `success`: Success (boolean)
- `workspace_gid`: Workspace GID
- `user`: Removed User

### `create_team`

**Create Team.** Creates a new team in an organization and returns it; the connected user becomes a member. Teams exist only in organizations (company-domain workspaces), so a plain workspace fails. Check List Teams first to avoid duplicates: each call creates a separate team, so retries duplicate. Visibility "secret" may need a paid plan; on a free plan Asana answers with HTTP 500 instead of a plan error. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization` | string | yes |  | Organization (Workspace) GID. Gid of the organization, for example 1201234567890123. Obtain it from List Workspaces (is_organization must be true). |
| `name` | string | yes |  | Team Name. Name of the new team, for example "Marketing". |
| `description` | string | no |  | Description. Plain-text description of the team. |
| `visibility` | string | no |  | Visibility. Who can see and join the team; empty uses the Asana default. Secret may need a paid plan. One of `"public"`, `"request_to_join"`, `"secret"`. |

Output fields:

- `gid`: Team GID
- `name`: Name
- `description`: Description
- `visibility`: Visibility
- `organization`: Organization
- `organization.gid`: Workspace GID
- `organization.name`: Workspace Name
- `permalink_url`: Team URL (url)
- `html_description`: Rich Description (html)
- `endorsed`: Endorsed (boolean)

### `get_team`

**Get Team.** Returns one team: name, description, visibility, endorsed flag, organization and link. Use List Teams or List User Teams to find team gids, and List Team Memberships or List Users (with a team) for its members. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team` | string | yes |  | Team GID. Gid of the team. Obtain it from List Teams or List User Teams. |

Output fields:

- `gid`: Team GID
- `name`: Name
- `description`: Description
- `visibility`: Visibility
- `organization`: Organization
- `organization.gid`: Workspace GID
- `organization.name`: Workspace Name
- `permalink_url`: Team URL (url)
- `html_description`: Rich Description (html)
- `endorsed`: Endorsed (boolean)

### `update_team`

**Update Team.** Updates only the team fields you set (name, description, visibility, endorsed); everything else is left unchanged. Team settings may be limited to team admins. Members are changed with Add User to Team and Remove User from Team. Setting the same values again converges, so it is safe to retry. Visibility "secret" may need a paid plan; on a free plan Asana answers with HTTP 500 instead of a plan error. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team` | string | yes |  | Team GID. Gid of the team to update. Obtain it from List Teams or List User Teams. |
| `name` | string | no |  | Team Name. New team name. Leave empty to keep it. |
| `description` | string | no |  | Description. New plain-text description; replaces the current one. Leave empty to keep it. |
| `visibility` | string | no |  | Visibility. New visibility; empty keeps it. Secret may need a paid plan. One of `"public"`, `"request_to_join"`, `"secret"`. |
| `endorsed` | string | no |  | Endorsed. Yes to mark the team as endorsed, No to remove the endorsement. Leave empty to keep it. One of `true`, `false`. |

Output fields:

- `gid`: Team GID
- `name`: Name
- `description`: Description
- `visibility`: Visibility
- `organization`: Organization
- `organization.gid`: Workspace GID
- `organization.name`: Workspace Name
- `permalink_url`: Team URL (url)
- `html_description`: Rich Description (html)
- `endorsed`: Endorsed (boolean)

### `list_user_teams`

**List User Teams.** Lists the teams one user belongs to in an organization. Use "me" for the connected user's own teams; use List Teams for every team in the organization. Teams exist only in organizations, so a plain workspace returns an error. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | yes |  | User. User whose teams to list: "me", an email address or a user gid. |
| `organization` | string | yes |  | Organization (Workspace) GID. Gid of the organization to list teams in. Obtain it from List Workspaces (is_organization must be true). |
| `limit` | number | no |  | Limit. Maximum number of teams to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Teams
- `data[].gid`: Team GID
- `data[].name`: Name
- `data[].description`: Description
- `data[].visibility`: Visibility
- `data[].organization`: Organization
- `data[].organization.gid`: Workspace GID
- `data[].organization.name`: Workspace Name
- `data[].permalink_url`: Team URL (url)
- `next_offset`: Next Page Offset

### `add_user_to_team`

**Add User to Team.** Adds a user to a team and returns the team membership. The connected user must already be a member of the team, and the added user must belong to the same organization (use Add User to Workspace first if needed). Adding an existing member leaves them in place, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team` | string | yes |  | Team GID. Gid of the team. Obtain it from List Teams or List User Teams. |
| `user` | string | yes |  | User. User to add: "me", an email address or a user gid. |

Output fields:

- `gid`: Team Membership GID
- `user`: User
- `user.gid`: User GID
- `user.name`: Name
- `team`: Team
- `team.gid`: GID
- `team.name`: Name
- `is_admin`: Admin (boolean)
- `is_guest`: Guest (boolean)
- `is_limited_access`: Limited Access (boolean)

### `remove_user_from_team`

**Remove User from Team.** Removes a user from a team, revoking the access they had through it (team projects that are not shared with them otherwise). The connected user must be a member of the team to remove themselves or others. The user's own tasks and projects are kept, and Add User to Team restores the membership. Converges on repeat: the user stays out of the team. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team` | string | yes |  | Team GID. Gid of the team. Obtain it from List Teams or List User Teams. |
| `user` | string | yes |  | User. User to remove: "me", an email address or a user gid. Obtain it from List Team Memberships. |

Output fields:

- `success`: Success (boolean)
- `team_gid`: Team GID
- `user`: Removed User

### `list_team_memberships`

**List Team Memberships.** Lists team memberships with is_admin, is_guest and is_limited_access flags. Set Team GID for everyone in one team, or User together with Workspace GID for every team membership of that user. Use it to check who administers a team before changing it. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team` | string | no |  | Team GID. Gid of the team whose members to list. Obtain it from List Teams. Set this, or User with Workspace GID. |
| `user` | string | no |  | User. User whose team memberships to list: "me", an email address or a user gid. Requires Workspace GID. |
| `workspace` | string | no |  | Workspace GID. Gid of the organization to search in. Required with User, and only used with User. |
| `limit` | number | no |  | Limit. Maximum number of memberships to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Team Memberships
- `data[].gid`: Team Membership GID
- `data[].user`: User
- `data[].user.gid`: User GID
- `data[].user.name`: Name
- `data[].team`: Team
- `data[].team.gid`: GID
- `data[].team.name`: Name
- `data[].is_admin`: Admin (boolean)
- `data[].is_guest`: Guest (boolean)
- `data[].is_limited_access`: Limited Access (boolean)
- `next_offset`: Next Page Offset

### `get_team_membership`

**Get Team Membership.** Returns one team membership: the user, the team and the is_admin, is_guest and is_limited_access flags. Use List Team Memberships to find membership gids. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_membership` | string | yes |  | Team Membership GID. Gid of the team membership. Obtain it from List Team Memberships or Add User to Team. |

Output fields:

- `gid`: Team Membership GID
- `user`: User
- `user.gid`: User GID
- `user.name`: Name
- `team`: Team
- `team.gid`: GID
- `team.name`: Name
- `is_admin`: Admin (boolean)
- `is_guest`: Guest (boolean)
- `is_limited_access`: Limited Access (boolean)

### `get_attachment`

**Get Attachment.** Returns one attachment: name, size, host, parent and its download, view and permanent URLs. The download_url is short-lived, so fetch it right before downloading. Use List Attachments to find attachment gids on a task, project or project brief. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `attachment` | string | yes |  | Attachment GID. Gid of the attachment. Obtain it from List Attachments. |

Output fields:

- `gid`: Attachment GID
- `name`: Name
- `resource_subtype`: Attachment Type
- `host`: Host
- `size`: Size (bytes) (number)
- `view_url`: View URL (url)
- `download_url`: Download URL (url)
- `permanent_url`: Permanent URL (url)
- `connected_to_app`: Connected to App (boolean)
- `parent`: Parent
- `parent.gid`: GID
- `parent.name`: Name
- `created_at`: Created At (datetime)

### `list_attachments`

**List Attachments.** Lists the files attached to a task, to a project (its Key resources) or to a project brief, with names, sizes and download links. Inline images in a task description are not included. Use Get Attachment for a fresh download_url on one file. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent` | string | yes |  | Parent GID. Gid of the task, project or project brief whose attachments to list. Obtain a task gid from List Project Tasks or Get Task. |
| `limit` | number | no |  | Limit. Maximum number of attachments to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Attachments
- `data[].gid`: Attachment GID
- `data[].name`: Name
- `data[].resource_subtype`: Attachment Type
- `data[].host`: Host
- `data[].size`: Size (bytes) (number)
- `data[].view_url`: View URL (url)
- `data[].download_url`: Download URL (url)
- `data[].permanent_url`: Permanent URL (url)
- `data[].connected_to_app`: Connected to App (boolean)
- `data[].parent`: Parent
- `data[].parent.gid`: GID
- `data[].parent.name`: Name
- `data[].created_at`: Created At (datetime)
- `next_offset`: Next Page Offset

### `delete_attachment`

**Delete Attachment.** Permanently deletes one attachment from its task, project or project brief; the file cannot be restored through the API. Confirm the gid with Get Attachment or List Attachments first. Not idempotent: repeating the call on the same attachment fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `attachment` | string | yes |  | Attachment GID. Gid of the attachment to delete. Obtain it from List Attachments. |

Output fields:

- `success`: Success (boolean)
- `attachment_gid`: Deleted Attachment GID

### `upload_attachment`

**Upload Attachment.** Adds one attachment to a task, a project (its Key resources) or a project brief. Either upload a file (up to 100 MB; files from Dropbox, Box, Vimeo or Google Drive cannot be pulled in by URL, download them first) or attach an external link with a URL and a display name; set exactly one. Returns the new attachment with its gid, host and view/download URLs. Use List Attachments to see what is already attached. Not idempotent: every call creates another attachment, so check List Attachments before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent` | string | yes |  | Parent GID. Gid of the task, project or project brief to attach to. Obtain a task gid from List Project Tasks or Get Task, a project gid from List Projects. |
| `file` | file | no |  | File. The file to upload (up to 100 MB). Leave empty when attaching an External URL. Files are not supported; an action that needs one fails. |
| `url` | string | no |  | External URL. An http(s) link to attach instead of a file. Requires Name. Leave empty when uploading a File. |
| `name` | string | no |  | Name. Display name of the attachment. Required with External URL; for a File it replaces the file name. |

Output fields:

- `gid`: Attachment GID
- `name`: Name
- `resource_subtype`: Attachment Type
- `host`: Host
- `size`: Size (bytes) (number)
- `view_url`: View URL (url)
- `download_url`: Download URL (url)
- `permanent_url`: Permanent URL (url)
- `connected_to_app`: Connected to App (boolean)
- `parent`: Parent
- `parent.gid`: GID
- `parent.name`: Name
- `created_at`: Created At (datetime)

### `list_access_requests`

**List Access Requests.** Lists the pending access requests on one project or portfolio, optionally from one requester, with each request's message and status. Use the returned gids with Approve Access Request or Reject Access Request. Returns every pending request in one response (Asana does not paginate this list). Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes |  | Project or Portfolio GID. Gid of the project or portfolio whose access requests to list. Obtain a project gid from List Projects. |
| `user` | string | no |  | Requester. Only return requests from this user: "me", an email address or a user gid. Leave empty for all requesters. |

Output fields:

- `data`: Access Requests
- `data[].gid`: Access Request GID
- `data[].approval_status`: Approval Status
- `data[].message`: Message
- `data[].target`: Target
- `data[].target.gid`: Target GID
- `data[].target.resource_type`: Target Type
- `data[].requester`: Requester
- `data[].requester.gid`: User GID
- `data[].requester.name`: Name

### `create_access_request`

**Request Access.** Submits a request, as the connected user, to join a private project or portfolio, with an optional message for its owners, and returns the request with its approval_status. Use it when a project returns a permission error. Asana may treat this as a paid feature on some plans. Not idempotent: a repeat call while the connected user already has a pending request for the same target fails with an "already requested" error instead of creating a second request, so treat that error as meaning a request is already pending. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes |  | Project or Portfolio GID. Gid of the private project or portfolio to request access to. |
| `message` | string | no |  | Message. Optional note for the owners explaining why access is needed. |

Output fields:

- `gid`: Access Request GID
- `approval_status`: Approval Status
- `message`: Message
- `target`: Target
- `target.gid`: Target GID
- `target.resource_type`: Target Type
- `requester`: Requester
- `requester.gid`: User GID
- `requester.name`: Name

### `approve_access_request`

**Approve Access Request.** Approves one pending access request, which gives the requester editor access to the project or portfolio (approving a request made by the connected user themself sets their own membership to editor, so they may lose admin rights such as deleting the project). Only people who can manage the target's members can approve. Find request gids with List Access Requests; use Reject Access Request to decline. Not idempotent: a request that was already handled cannot be approved again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `access_request` | string | yes |  | Access Request GID. Gid of the pending access request. Obtain it from List Access Requests. |

Output fields:

- `success`: Success (boolean)
- `access_request_gid`: Access Request GID
- `approval_status`: Approval Status

### `reject_access_request`

**Reject Access Request.** Rejects one pending access request; the requester does not get access and can ask again later. Only people who can manage the target's members can reject. Find request gids with List Access Requests; use Approve Access Request to grant access instead. Not idempotent: a request that was already handled cannot be rejected again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `access_request` | string | yes |  | Access Request GID. Gid of the pending access request. Obtain it from List Access Requests. |

Output fields:

- `success`: Success (boolean)
- `access_request_gid`: Access Request GID
- `approval_status`: Approval Status

### `list_reactions`

**List Reactions.** Lists the reactions with one emoji on a story (such as a task comment) or a status update, including who reacted. The emoji is required: Asana only returns reactions for the emoji you name. Get story gids from List Task Stories and status update gids from List Status Updates. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes |  | Story or Status Update GID. Gid of the story (for example a task comment) or status update. Obtain it from List Task Stories or List Status Updates. |
| `emoji_base` | string | yes |  | Emoji. The emoji character itself, not a name or shortcode, for example the thumbs-up character (U+1F44D). Use the base emoji without a skin-tone variant. |
| `limit` | number | no |  | Limit. Maximum number of reactions to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

### `search_tasks`

**Search Tasks.** Runs Asana advanced search over a whole workspace: full text on task name and description, plus filters on assignee, projects, sections, tags, completion, blocked state and dates. Needs a paid (premium) Asana workspace or team; a free workspace gets a paid-plan error, so use List Project Tasks, List Assigned Tasks or Search Workspace Objects there instead. Results lag writes by 10 to 60 seconds, so do not use it to read back a task you just changed. There is no offset pagination: to page, sort by Created at ascending and pass the created_at of the last task you saw as Created After on the next call. Tasks created at the same moment as that last task can be skipped at the page boundary; narrow the filters when you need every match. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace to search. Obtain it from List Workspaces. |
| `text` | string | no |  | Text. Words to match in the task name and description. Leave empty to filter only. |
| `resource_subtype` | string | no |  | Task Type. Only return tasks of this type. Leave empty for all types. One of `"default_task"`, `"milestone"`, `"approval"`, `"custom"`. |
| `assignees` | array | no |  | Assigned To (any of). Users, any of whom may be the assignee: "me", an email address or a user gid. |
| `projects` | array | no |  | In Projects (any of). Project gids; tasks in any of them (or inheriting them from a parent task) match. Obtain gids from List Projects. |
| `sections` | array | no |  | In Sections (any of). Section gids; tasks in any of them match. Setting Projects as well also returns every task of those projects, so leave Projects empty to search inside sections only. |
| `tags` | array | no |  | Tagged With (any of). Tag gids; tasks carrying any of them match. Obtain gids from List Tags. |
| `completed` | string | no |  | Completed. Yes for completed tasks only, No for incomplete tasks only. Leave empty for both. One of `true`, `false`. |
| `is_blocked` | string | no |  | Blocked. Yes for tasks that wait on incomplete dependencies, No for tasks that do not. Leave empty for both. One of `true`, `false`. |
| `is_subtask` | string | no |  | Subtask. Yes for subtasks only, No for top-level tasks only. Leave empty for both. One of `true`, `false`. |
| `due_on_after` | string | no |  | Due After. Only tasks due after this date, YYYY-MM-DD. |
| `due_on_before` | string | no |  | Due Before. Only tasks due before this date, YYYY-MM-DD. |
| `modified_at_after` | string | no |  | Modified After. Only tasks modified after this ISO 8601 date-time, which must end in Z or an offset, for example 2026-10-01T00:00:00Z. |
| `created_at_after` | string | no |  | Created After. Only tasks created after this ISO 8601 date-time (ending in Z or an offset). Use it with Sort By Created at, ascending, to fetch the next page. |
| `sort_by` | string | no |  | Sort By. Result order. Leave empty for most recently modified first. One of `"modified_at"`, `"created_at"`, `"due_date"`, `"completed_at"`, `"likes"`, `"relevance"`. |
| `sort_ascending` | string | no |  | Sort Ascending. Yes to sort oldest or smallest first. Leave empty for descending. One of `true`, `false`. |
| `limit` | number | no |  | Limit. Maximum number of tasks to return in this page, from 1 to 100. Defaults to 50. |

Output fields:

- `data`: Tasks
- `data[].gid`: Task GID
- `data[].name`: Name
- `data[].resource_subtype`: Task Type
- `data[].completed`: Completed (boolean)
- `data[].completed_at`: Completed At (datetime)
- `data[].due_on`: Due On (date)
- `data[].due_at`: Due At (datetime)
- `data[].start_on`: Start On (date)
- `data[].assignee`: Assignee
- `data[].assignee.gid`: User GID
- `data[].assignee.name`: Name
- `data[].parent`: Parent Task
- `data[].parent.gid`: Task GID
- `data[].parent.name`: Task Name
- `data[].created_at`: Created At (datetime)
- `data[].modified_at`: Modified At (datetime)
- `data[].permalink_url`: Task URL (url)

### `add_task_dependencies`

**Add Task Dependencies.** Marks the given tasks as dependencies of a task, meaning the task is blocked until they are complete. A task can have at most 30 dependencies and dependents combined, so check List Task Dependencies first when it already has many. Undo with Remove Task Dependencies. Dependencies need a paid Asana plan; a free workspace gets a paid-plan error. Tasks that are already dependencies are left as they are, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the blocked task. Obtain it from List Project Tasks or Search Workspace Objects. |
| `dependencies` | array | yes |  | Dependency Task GIDs. Gids of the tasks that must be completed first, at most 30. |

Output fields:

- `success`: Success (boolean)
- `task_gid`: Task GID
- `dependency_gids`: Added Dependency GIDs

### `list_task_dependencies`

**List Task Dependencies.** Lists the tasks a task is waiting on (its dependencies), with name, completion, due dates and assignee. Use it before Add Task Dependencies (30 dependencies and dependents combined at most) or to find the gids for Remove Task Dependencies. Needs a paid Asana plan; a free workspace gets a paid-plan error. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the task whose dependencies to list. Obtain it from List Project Tasks or Search Workspace Objects. |
| `limit` | number | no |  | Limit. Maximum number of tasks to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Tasks
- `data[].gid`: Task GID
- `data[].name`: Name
- `data[].resource_subtype`: Task Type
- `data[].completed`: Completed (boolean)
- `data[].completed_at`: Completed At (datetime)
- `data[].due_on`: Due On (date)
- `data[].due_at`: Due At (datetime)
- `data[].start_on`: Start On (date)
- `data[].assignee`: Assignee
- `data[].assignee.gid`: User GID
- `data[].assignee.name`: Name
- `data[].parent`: Parent Task
- `data[].parent.gid`: Task GID
- `data[].parent.name`: Task Name
- `data[].created_at`: Created At (datetime)
- `data[].modified_at`: Modified At (datetime)
- `data[].permalink_url`: Task URL (url)
- `next_offset`: Next Page Offset

### `remove_task_dependencies`

**Remove Task Dependencies.** Unlinks the given dependency tasks from a task so it no longer waits on them; the tasks themselves are not changed or deleted. Read the current dependencies with List Task Dependencies. Needs a paid Asana plan; a free workspace gets a paid-plan error. Removing a link that is already gone converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task GID. Gid of the blocked task. Obtain it from List Project Tasks or Search Workspace Objects. |
| `dependencies` | array | yes |  | Dependency Task GIDs. Gids of the dependency tasks to unlink. Obtain them from List Task Dependencies. |

Output fields:

- `success`: Success (boolean)
- `task_gid`: Task GID
- `removed_dependency_gids`: Removed Dependency GIDs

### `create_custom_field`

**Create Custom Field.** Creates a workspace-wide custom field definition (text, number, single-select, multi-select, date or people) and returns it with its enum options. The name must be unique in the workspace and must not clash with built-in fields such as Due Date or Assignee; the type can never be changed later. Check List Custom Fields first to avoid a duplicate. For select fields, pass the option names here or add them later with Create Custom Field Enum Option. Custom fields need a paid Asana plan; a free workspace gets a paid-plan error. Not idempotent: a repeat fails on the duplicate name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace that will own the field; it cannot be moved later. Obtain it from List Workspaces. |
| `name` | string | yes |  | Field Name. Name of the field, unique in the workspace, for example "Priority". |
| `resource_subtype` | string | yes |  | Field Type. Kind of value the field holds. It cannot be changed after creation. One of `"text"`, `"number"`, `"enum"`, `"multi_enum"`, `"date"`, `"people"`. |
| `description` | string | no |  | Description. Plain-text description shown with the field. |
| `enum_options` | array | no |  | Option Names. Only for single-select and multi-select fields: the option names in display order, for example High, Medium, Low (1 to 500 options). |
| `precision` | number | no |  | Decimal Places. Only for number fields: digits after the decimal point, 0 to 6. |
| `format` | string | no |  | Number Format. Only for number fields: how the value is displayed. Leave empty for plain numbers. One of `"none"`, `"currency"`, `"percentage"`, `"custom"`, `"duration"`, `"identifier"`. |
| `currency_code` | string | no |  | Currency Code. ISO 4217 code such as USD or EUR. Only used with the Currency format. |
| `custom_label` | string | no |  | Custom Label. Unit text shown next to the value, for example "pts". Only used with the Custom label format. |
| `custom_label_position` | string | no |  | Custom Label Position. Where the custom label goes. Only used with the Custom label format. One of `"prefix"`, `"suffix"`. |
| `has_notifications_enabled` | string | no |  | Notify Followers on Change. Yes to notify task followers when this field changes, No to stay silent. Leave empty for the Asana default. One of `true`, `false`. |

### `get_custom_field`

**Get Custom Field.** Returns one custom field definition: name, type, description, number format and precision, notification setting and, for select fields, every enum option with its gid, color and enabled flag. Use it to find enum option gids before Update Custom Field Enum Option or Reorder Custom Field Enum Option. Needs a paid Asana plan; a free workspace gets a paid-plan error. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_field` | string | yes |  | Custom Field GID. Gid of the custom field. Obtain it from List Custom Fields. |

### `list_custom_fields`

**List Custom Fields.** Lists the custom field definitions of a workspace with type, format and enum options. Use it to find a field gid by name, or to check that a name is free before Create Custom Field. Needs a paid Asana plan; a free workspace gets a paid-plan error. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace. Obtain it from List Workspaces. |
| `limit` | number | no |  | Limit. Maximum number of custom fields to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

### `update_custom_field`

**Update Custom Field.** Updates only the custom field settings you set (name, description, number format, precision, currency, custom label, follower notifications); everything else is left unchanged. The field type can never change, and select options are edited with Create, Update and Reorder Custom Field Enum Option, not here. Locked fields can only be changed by the user who locked them. Needs a paid Asana plan; a free workspace gets a paid-plan error. Setting the same values again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_field` | string | yes |  | Custom Field GID. Gid of the custom field to update. Obtain it from List Custom Fields. |
| `name` | string | no |  | Field Name. New name, unique in the workspace. Leave empty to keep it. |
| `description` | string | no |  | Description. New plain-text description; replaces the current one. Leave empty to keep it. |
| `precision` | number | no |  | Decimal Places. Number fields only: digits after the decimal point, 0 to 6. Leave empty to keep it. |
| `format` | string | no |  | Number Format. Number fields only: new display format. Leave empty to keep it. One of `"none"`, `"currency"`, `"percentage"`, `"custom"`, `"duration"`, `"identifier"`. |
| `currency_code` | string | no |  | Currency Code. ISO 4217 code such as USD, used with the Currency format. Leave empty to keep it. |
| `custom_label` | string | no |  | Custom Label. Unit text used with the Custom label format. Leave empty to keep it. |
| `custom_label_position` | string | no |  | Custom Label Position. Where the custom label goes. Leave empty to keep it. One of `"prefix"`, `"suffix"`. |
| `has_notifications_enabled` | string | no |  | Notify Followers on Change. Yes to notify task followers when this field changes, No to stop those notifications. Leave empty to keep the current setting. One of `true`, `false`. |

### `delete_custom_field`

**Delete Custom Field.** Permanently deletes a custom field definition from the workspace; the API offers no way to restore it, and every task, project or portfolio using the field is affected. To retire a single select option instead, set its Enabled to No with Update Custom Field Enum Option. Locked fields can only be deleted by the user who locked them. Needs a paid Asana plan. Irreversible; repeating the call on the same field fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_field` | string | yes |  | Custom Field GID. Gid of the custom field to delete. Obtain it from List Custom Fields. |

Output fields:

- `success`: Success (boolean)
- `custom_field_gid`: Deleted Custom Field GID

### `create_custom_field_enum_option`

**Create Custom Field Enum Option.** Adds a selectable option to a single-select or multi-select custom field and returns it (gid, name, color, enabled). New options go at the end unless Insert Before or Insert After names an existing option. A field holds at most 500 options, including disabled ones; options can never be deleted, only disabled with Update Custom Field Enum Option. Check Get Custom Field first to avoid a duplicate option. Needs a paid Asana plan. Not idempotent: each call adds another option. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_field` | string | yes |  | Custom Field GID. Gid of the single-select or multi-select custom field. Obtain it from List Custom Fields. |
| `name` | string | yes |  | Option Name. Label of the new option, for example "Blocked". |
| `color` | string | no |  | Color. Asana option color name, for example red, orange, yellow, green, blue, purple or none. Leave empty for none. |
| `insert_before` | string | no |  | Insert Before Option GID. Gid of an existing option of this field to place the new option before. Obtain it from Get Custom Field. Do not combine with Insert After. |
| `insert_after` | string | no |  | Insert After Option GID. Gid of an existing option of this field to place the new option after. Do not combine with Insert Before. |

### `reorder_custom_field_enum_option`

**Reorder Custom Field Enum Option.** Moves an existing option of a single-select or multi-select custom field so it sits directly before or directly after another option of the same field, and returns the moved option (gid, name, color, enabled). Set exactly one of Before Option GID or After Option GID; read the option gids and current order with Get Custom Field. It only changes the order, never the option itself; use Update Custom Field Enum Option to rename, recolor or disable. Locked fields can only be reordered by the user who locked them. Needs a paid Asana plan. Moving to the same position again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_field` | string | yes |  | Custom Field GID. Gid of the custom field that owns the options. Obtain it from List Custom Fields. |
| `enum_option` | string | yes |  | Option GID to Move. Gid of the option to move. Obtain it from Get Custom Field (enum_options). |
| `before_enum_option` | string | no |  | Before Option GID. Gid of the option to place the moved option directly before. Set this or After Option GID, not both. |
| `after_enum_option` | string | no |  | After Option GID. Gid of the option to place the moved option directly after. Set this or Before Option GID, not both. |

### `update_custom_field_enum_option`

**Update Custom Field Enum Option.** Updates only the option fields you set (name, color, enabled) and returns the option. Setting Enabled to No retires the option: it can no longer be picked, but tasks that already have it keep the value; options can never be deleted. A select field must keep at least one enabled option. Change the order with Reorder Custom Field Enum Option. Needs a paid Asana plan. Setting the same values again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `enum_option` | string | yes |  | Option GID. Gid of the option to update. Obtain it from Get Custom Field (enum_options). |
| `name` | string | no |  | Option Name. New label. Leave empty to keep it. |
| `color` | string | no |  | Color. New Asana option color name, for example red, green, blue or none. Leave empty to keep it. |
| `enabled` | string | no |  | Enabled. Yes to make the option selectable again, No to disable (retire) it. Leave empty to keep the current state. One of `true`, `false`. |

### `list_project_templates`

**List Project Templates.** Lists custom project templates in a workspace or a team, with the date variables (requested_dates) and roles (requested_roles) each one needs. Use it to get the template gid and the date and role gids before Instantiate Project Template. Set Team GID or Workspace GID, not both. In an organization (a company-domain workspace, is_organization=true in List Workspaces) Asana rejects Workspace GID with "Not a valid regular workspace", so use Team GID there (get it from List Teams); Workspace GID only works for plain workspaces. Custom templates need a paid Asana plan. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | no |  | Workspace GID. Gid of a plain (non-organization) workspace whose templates to list. Asana rejects organizations here; use Team GID for them. Set this or Team GID. |
| `team` | string | no |  | Team GID. Gid of the team whose templates to list (preferred; required in organizations). Obtain it from List Teams. Set this or Workspace GID. |
| `limit` | number | no |  | Limit. Maximum number of templates to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

### `instantiate_project_template`

**Instantiate Project Template.** Starts an asynchronous job that creates a new project from a custom project template and returns the job (gid, status, new_project). The project may not be ready yet: poll Get Job with the returned job gid until status is succeeded. Get the template gid and its date and role gids from List Project Templates; when the template has dates, give each date variable a value in Requested Dates (gid 1 is the project start date, gid 2 the due date). Custom templates need a paid Asana plan. Each call creates another project, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_template` | string | yes |  | Project Template GID. Gid of the template. Obtain it from List Project Templates. |
| `name` | string | yes |  | Project Name. Name of the new project. |
| `team` | string | no |  | Team GID. Organizations only: gid of the team for the new project. Leave empty to use the template's team. |
| `privacy_setting` | string | no |  | Privacy. Who can see the new project. Leave empty for the default; organization admins may restrict the choices. One of `"public_to_workspace"`, `"private"`. |
| `requested_dates` | array | no |  | Requested Dates. One row per date variable of the template: its gid (from requested_dates in List Project Templates; 1 = project start date, 2 = project due date) and a date in YYYY-MM-DD format. Each item: { `gid`, `value` }. |
| `requested_roles` | array | no |  | Requested Roles. One row per template role: its gid (from requested_roles in List Project Templates) and the user to assign, as "me", an email address or a user gid. Each item: { `gid`, `value` }. |
| `is_strict` | string | no |  | Strict Dates. Yes to fail when any date variable of the template has no value in Requested Dates; No to leave missing dates empty. Leave empty for the Asana default. One of `true`, `false`. |

Output fields:

- `gid`: Job GID
- `resource_subtype`: Job Type
- `status`: Status
- `new_task`: New Task
- `new_task.gid`: Task GID
- `new_task.name`: Task Name
- `new_project`: New Project
- `new_project.gid`: Project GID
- `new_project.name`: Project Name
- `new_project_template`: New Project Template
- `new_project_template.gid`: Project Template GID
- `new_project_template.name`: Project Template Name

### `list_task_templates`

**List Task Templates.** Lists the task templates saved in one project, with name, creator and creation time. Templates are per project, so set Project GID. Custom templates need a paid Asana plan. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project GID. Gid of the project whose task templates to list. Obtain it from List Projects. |
| `limit` | number | no |  | Limit. Maximum number of templates to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

### `list_portfolios`

**List My Portfolios.** Lists the portfolios in a workspace that the connected user owns, with owner, dates, privacy and color. Asana requires an owner filter and only returns the calling user's own portfolios to OAuth apps, so the action always sends owner=me. Use it to find a portfolio gid for Get Portfolio, List Portfolio Items or Add Portfolio Item. Portfolios need an Advanced or higher Asana plan; lower plans get a paid-plan error. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace. Obtain it from List Workspaces. |
| `limit` | number | no |  | Limit. Maximum number of portfolios to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

### `get_portfolio`

**Get Portfolio.** Returns one portfolio: name, owner, creator, members, dates, privacy, color, archived state, latest status update and link. For the projects inside it use List Portfolio Items. Portfolios need an Advanced or higher Asana plan. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `portfolio` | string | yes |  | Portfolio GID. Gid of the portfolio. Obtain it from List My Portfolios. |

### `list_portfolio_items`

**List Portfolio Items.** Lists the items of a portfolio (projects and nested portfolios) as compact records with gid, name and resource_type. Use Get Project or Get Portfolio for details of an item. Portfolios need an Advanced or higher Asana plan. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `portfolio` | string | yes |  | Portfolio GID. Gid of the portfolio. Obtain it from List My Portfolios. |
| `limit` | number | no |  | Limit. Maximum number of items to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

### `add_portfolio_item`

**Add Portfolio Item.** Adds a project (or a nested portfolio) to a portfolio, optionally placed before or after an existing item. The project itself is not changed. Remove it again with Remove Portfolio Item. Portfolios need an Advanced or higher Asana plan. Adding an item that is already in the portfolio converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `portfolio` | string | yes |  | Portfolio GID. Gid of the portfolio. Obtain it from List My Portfolios. |
| `item` | string | yes |  | Item GID. Gid of the project or portfolio to add. Obtain a project gid from List Projects. |
| `insert_before` | string | no |  | Insert Before Item GID. Gid of an item already in the portfolio to place the new item before. Do not combine with Insert After. |
| `insert_after` | string | no |  | Insert After Item GID. Gid of an item already in the portfolio to place the new item after. Do not combine with Insert Before. |

Output fields:

- `success`: Success (boolean)
- `portfolio_gid`: Portfolio GID
- `item_gid`: Item GID

### `remove_portfolio_item`

**Remove Portfolio Item.** Removes a project (or nested portfolio) from a portfolio. The project itself is kept and nobody loses access to it; to delete a project use Delete Project. Portfolios need an Advanced or higher Asana plan. Removing an item that is already gone converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `portfolio` | string | yes |  | Portfolio GID. Gid of the portfolio. Obtain it from List My Portfolios. |
| `item` | string | yes |  | Item GID. Gid of the project or portfolio to remove. Obtain it from List Portfolio Items. |

Output fields:

- `success`: Success (boolean)
- `portfolio_gid`: Portfolio GID
- `item_gid`: Item GID

### `list_goals`

**List Goals.** Lists goals with status, dates, owner, team and time period. Scope the list with Workspace GID or Team GID, or find the goals a project, task or portfolio supports; narrow by time period gids from List Time Periods. Use Get Goal for metrics and notes. Goals need an Advanced or higher Asana plan; lower plans get a paid-plan error. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | no |  | Workspace GID. Gid of the workspace whose goals to list. Obtain it from List Workspaces. |
| `team` | string | no |  | Team GID. Gid of a team, to list only that team's goals. Obtain it from List Teams. |
| `project` | string | no |  | Supporting Project GID. Gid of a project, to list the goals it supports. |
| `task` | string | no |  | Supporting Task GID. Gid of a task, to list the goals it supports. |
| `portfolio` | string | no |  | Supporting Portfolio GID. Gid of a portfolio, to list the goals it supports. |
| `is_workspace_level` | string | no |  | Workspace-Level Goals. Yes for company-wide (workspace-level) goals only, No for team goals only. Requires Workspace GID. Leave empty for both. One of `true`, `false`. |
| `time_periods` | array | no |  | Time Period GIDs. Only goals in these time periods. Obtain gids from List Time Periods. |
| `limit` | number | no |  | Limit. Maximum number of goals to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

### `get_goal`

**Get Goal.** Returns one goal: name, notes, status, dates, owner, team, time period, followers, latest status update and its progress metric (initial, current and target values, unit and progress source). For the subgoals, projects, tasks or portfolios that feed it use List Goal Relationships. Goals need an Advanced or higher Asana plan. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `goal` | string | yes |  | Goal GID. Gid of the goal. Obtain it from List Goals. |

### `list_goal_relationships`

**List Goal Relationships.** Lists what supports a goal: its subgoals and the projects, tasks and portfolios linked as supporting work, each with its contribution weight. Use it before Add Goal Supporting Relationship to avoid linking the same resource twice. Goals need an Advanced or higher Asana plan. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `supported_goal` | string | yes |  | Goal GID. Gid of the goal whose supporting relationships to list. Obtain it from List Goals. |
| `resource_subtype` | string | no |  | Relationship Type. Only return this kind of relationship. Leave empty for both. One of `"subgoal"`, `"supporting_work"`. |
| `limit` | number | no |  | Limit. Maximum number of relationships to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

### `add_goal_supporting_relationship`

**Add Goal Supporting Relationship.** Links a goal, project, task or portfolio as supporting a parent goal and returns the new goal relationship (gid, type, contribution weight). Contribution Weight (0 to 1, default 0) sets how much the supporter's progress counts toward an automatically calculated parent goal; it must be above 0 to count. Check List Goal Relationships first so the same resource is not linked twice. Goals need an Advanced or higher Asana plan. Not idempotent: it creates a relationship record, and Asana does not document what a repeat does. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `goal` | string | yes |  | Parent Goal GID. Gid of the goal being supported. Obtain it from List Goals. |
| `supporting_resource` | string | yes |  | Supporting Resource GID. Gid of the goal, project, task or portfolio that supports the parent goal. |
| `contribution_weight` | number | no |  | Contribution Weight. Share of the supporter's progress that counts toward the parent goal, from 0 to 1, for example 0.25. Leave empty for 0. |
| `insert_before` | string | no |  | Insert Before Subgoal GID. For a subgoal: gid of an existing subgoal to place it before. Do not combine with Insert After. |
| `insert_after` | string | no |  | Insert After Subgoal GID. For a subgoal: gid of an existing subgoal to place it after. Do not combine with Insert Before. |

### `list_time_periods`

**List Time Periods.** Lists the time periods goals are set against (for example FY26 or Q3 FY26), with display name, period type, start and end dates and parent period. Use the gids to filter List Goals by time period. Start On and End On narrow the list by the dates of the periods. Goals need an Advanced or higher Asana plan. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace. Obtain it from List Workspaces. |
| `start_on` | string | no |  | Start On. Narrow the list by period start date, YYYY-MM-DD (sent to Asana as start_on). |
| `end_on` | string | no |  | End On. Narrow the list by period end date, YYYY-MM-DD (sent to Asana as end_on). |
| `limit` | number | no |  | Limit. Maximum number of time periods to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

Output fields:

- `data`: Time Periods
- `data[].gid`: Time Period GID
- `data[].display_name`: Name
- `data[].period`: Period
- `data[].start_on`: Start On (date)
- `data[].end_on`: End On (date)
- `data[].parent`: Parent Period
- `data[].parent.gid`: Parent GID
- `data[].parent.display_name`: Parent Name
- `next_offset`: Next Page Offset

### `get_time_period`

**Get Time Period.** Returns one time period: display name, period type, start and end dates and its parent period (for example the fiscal year of a quarter). Goals need an Advanced or higher Asana plan. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `time_period` | string | yes |  | Time Period GID. Gid of the time period. Obtain it from List Time Periods or from the time_period of a goal. |

Output fields:

- `gid`: Time Period GID
- `display_name`: Name
- `period`: Period
- `start_on`: Start On (date)
- `end_on`: End On (date)
- `parent`: Parent Period
- `parent.gid`: Parent GID
- `parent.display_name`: Parent Name

### `create_allocation`

**Create Allocation.** Creates a resource-management allocation: a user (or placeholder) assigned to a project from Start Date to End Date, optionally with an effort as hours or a percentage of their time, and returns it. Check List Allocations first to avoid a duplicate for the same person, project and dates. Allocations need an Advanced or higher Asana plan with resource management; lower plans get a paid-plan error. Not idempotent: each call creates another allocation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent` | string | yes |  | Project GID. Gid of the project the time is allocated to. Obtain it from List Projects. |
| `assignee` | string | yes |  | Assignee GID. Gid of the user or placeholder whose time is allocated. Obtain a user gid from List Users or Get Current User. |
| `start_date` | string | yes |  | Start Date. First day of the allocation, YYYY-MM-DD. |
| `end_date` | string | yes |  | End Date. Last day of the allocation, YYYY-MM-DD, on or after Start Date. |
| `effort_type` | string | no |  | Effort Unit. Unit of Effort Value. Set together with Effort Value, or leave both empty. One of `"hours"`, `"percent"`. |
| `effort_value` | number | no |  | Effort Value. Amount of effort in the chosen unit, for example 20 (hours) or 50 (percent). |

### `get_allocation`

**Get Allocation.** Returns one allocation: the assignee, the project, start and end dates, effort (hours or percent) and who created it. Allocations need an Advanced or higher Asana plan with resource management. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `allocation` | string | yes |  | Allocation GID. Gid of the allocation. Obtain it from List Allocations. |

### `list_allocations`

**List Allocations.** Lists allocations (who is booked on which project, for which dates, with what effort) filtered to a project, a user or placeholder, or both. Set Project GID or Assignee GID. Use it to check existing bookings before Create Allocation, or to find the gid for Update Allocation or Delete Allocation. Allocations need an Advanced or higher Asana plan with resource management. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent` | string | no |  | Project GID. Gid of a project, to list its allocations. Obtain it from List Projects. |
| `assignee` | string | no |  | Assignee GID. Gid of a user or placeholder, to list their allocations. |
| `workspace` | string | no |  | Workspace GID. Gid of the workspace, to scope an assignee's allocations. Obtain it from List Workspaces. |
| `limit` | number | no |  | Limit. Maximum number of allocations to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

### `update_allocation`

**Update Allocation.** Updates only the allocation fields you set (start date, end date, effort, assignee); everything else is left unchanged, and it returns the updated allocation. Effort Unit and Effort Value go together. When you change only one date, make sure the range stays valid against the other date (read it with Get Allocation). Allocations need an Advanced or higher Asana plan. Setting the same values again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `allocation` | string | yes |  | Allocation GID. Gid of the allocation to update. Obtain it from List Allocations. |
| `start_date` | string | no |  | Start Date. New first day, YYYY-MM-DD. Leave empty to keep it. |
| `end_date` | string | no |  | End Date. New last day, YYYY-MM-DD. Leave empty to keep it. |
| `effort_type` | string | no |  | Effort Unit. Unit of Effort Value. Set together with Effort Value, or leave both empty to keep the effort. One of `"hours"`, `"percent"`. |
| `effort_value` | number | no |  | Effort Value. New amount of effort in the chosen unit. |
| `assignee` | string | no |  | Assignee GID. Gid of the user or placeholder to move the allocation to. Leave empty to keep it. |

### `delete_allocation`

**Delete Allocation.** Permanently deletes one allocation, freeing that person's booked time on the project; the project and the user are not affected. To shorten or reassign a booking instead, use Update Allocation. Allocations need an Advanced or higher Asana plan. Irreversible; repeating the call on the same allocation fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `allocation` | string | yes |  | Allocation GID. Gid of the allocation to delete. Obtain it from List Allocations. |

Output fields:

- `success`: Success (boolean)
- `allocation_gid`: Deleted Allocation GID

### `list_time_tracking_entries`

**List Time Tracking Entries.** Lists native Asana time tracking entries (minutes logged, date entered, who logged it, attributed project, categories). Filter by task, attributed project, portfolio or user. Asana requires Entered From or Entered To whenever Workspace GID is set, even together with another filter, so to list one user's time without a date range set User GID alone. Use it to total time spent on a task or project. Time tracking needs an Advanced or higher Asana plan; lower plans get a paid-plan error. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | no |  | Task GID. Gid of a task, to list the time logged on it. |
| `attributable_to` | string | no |  | Attributed Project GID. Gid of a project, to list the time attributed to it. |
| `portfolio` | string | no |  | Portfolio GID. Gid of a portfolio, to list the time logged on its work. |
| `user` | string | no |  | User GID. Gid of a user, to list the time they logged. |
| `workspace` | string | no |  | Workspace GID. Gid of the workspace, to list time across it. Requires Entered From or Entered To. |
| `entered_on_start_date` | string | no |  | Entered From. Start of the entry date range, YYYY-MM-DD. |
| `entered_on_end_date` | string | no |  | Entered To. End of the entry date range, YYYY-MM-DD. |
| `limit` | number | no |  | Limit. Maximum number of entries to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

### `list_custom_types`

**List Custom Types.** Lists custom task types (for example Bug or Request) with their status options (name, color, enabled, completion state). Set exactly one of Project GID (types used in that project) or Workspace GID (every type in the workspace, including ones created by Asana products). Custom types need an Advanced or higher Asana plan. Paginated with next_offset; read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | no |  | Project GID. Gid of a project, to list the custom types it uses. Set this or Workspace GID, not both. |
| `workspace` | string | no |  | Workspace GID. Gid of a workspace, to list all its custom types. Set this or Project GID, not both. |
| `limit` | number | no |  | Limit. Maximum number of custom types to return in this page, from 1 to 100. Defaults to 50. |
| `offset` | string | no |  | Offset. Pagination token for the next page. Pass the `next_offset` value returned by the previous call of this same action; leave empty for the first page. Tokens expire after a while. |

### `update_user`

**Update User.** Updates a user's profile in one workspace: values of user-profile custom fields (keyed by custom field gid) and, only when the user is the connected user, their name. Only the fields you set change. Custom field values are text, a number, an enum option gid, or a date as YYYY-MM-DD; find field gids with List Custom Fields. User profile custom fields are a higher-tier Asana feature (likely Enterprise); lower plans get a paid-plan or permission error. Setting the same values again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace GID. Gid of the workspace whose user profile to update. Obtain it from List Workspaces. |
| `user` | string | yes |  | User. User to update: "me", an email address or a user gid. |
| `name` | string | no |  | Name. New display name. Asana only accepts this for the connected user ("me"). Leave empty to keep it. |
| `custom_fields` | object | no |  | Custom Field Values. Map of custom field gid to new value, for example 1201234567890 = "Berlin office". Leave empty to keep them. |

Output fields:

- `gid`: User GID
- `name`: Name
- `email`: Email (email)
- `custom_fields`: Profile Custom Fields
- `custom_fields[].gid`: Custom Field GID
- `custom_fields[].name`: Name
- `custom_fields[].display_value`: Value

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

# Nifty

Project management made simple

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-nifty'
  version: '0.3.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> # How to add a new connection
> 1. Login to your nifty account at https://niftypm.com/
> 2. From your account settings, click on App Center
> 3. After that click on Integrate with API
> 4. Then Create a new app
> 5. Select the Name and Description you want
> 6. copy the redirect url from the piece and fill the url field ( without https:// )
> 7. check out Milestones , Subtasks , Projects , Statuses , Tasks and Portfolios
> 8. copy the client id and client secret and paste them in the piece

## Actions

### `create_task`

**Create Task.** Creates a new task in Nifty in a chosen project and status column, optionally in a milestone or list, as a subtask, with dates and assignees, picked from dropdowns (agents: use nifty_task_create, which takes IDs). Requires a task name and a status. Not idempotent: each call creates a separate task even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `portfolio` | string | no |  | Portfolio. Optional. Narrows the project list to one portfolio. Leave empty to pick from all your projects. A value the product loads from the provider, such as an id; write the value itself. |
| `project` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | yes |  | Status. The board column the task starts in. A value the product loads from the provider, such as an id; write the value itself. |
| `milestone` | string | no |  | Milestone. Optional. When empty, Nifty puts the task in the project default list. A value the product loads from the provider, such as an id; write the value itself. |
| `task_name` | string | yes |  | Task Name. |
| `task_description` | string | no |  | Task Description. |
| `parent_task` | string | no |  | Parent Task. Optional. Pick a task to create this one as its subtask. A value the product loads from the provider, such as an id; write the value itself. |
| `start_date` | ISO date-time string | no |  | Start Date. |
| `due_date` | ISO date-time string | no |  | Due Date. |
| `assignees` | array | no |  | Assignees. Optional. Members to assign to the task. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `[].id`: Task ID
- `[].nice_id`: Task Key
- `[].name`: Name
- `[].description`: Description
- `[].project`: Project ID
- `[].task_group`: Status ID
- `[].milestone`: Milestone or List ID
- `[].task`: Parent Task ID
- `[].completed`: Completed (boolean)
- `[].completed_on`: Completed On (datetime)
- `[].completed_by`: Completed By (Member ID)
- `[].archived`: Archived (boolean)
- `[].start_date`: Start Date (datetime)
- `[].due_date`: Due Date (datetime)
- `[].story_points`: Story Points
- `[].assignees`: Assignee IDs
- `[].labels`: Label IDs
- `[].subscribers`: Subscriber IDs
- `[].total_subtasks`: Subtasks (number)
- `[].completed_subtasks`: Completed Subtasks (number)
- `[].comments`: Comments (number)
- `[].created_at`: Created At (datetime)
- `[].created_by`: Created By (Member ID)

### `update_task`

**Update Task.** Updates fields on a Nifty task picked from cascading project and task dropdowns (agents: use nifty_task_update, which takes IDs). Only the fields you fill change; clear options blank the description or a date. Idempotent: repeating the same update leaves the task in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `portfolio` | string | no |  | Portfolio. Optional. Narrows the project list to one portfolio. Leave empty to pick from all your projects. A value the product loads from the provider, such as an id; write the value itself. |
| `project` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `task` | string | yes |  | Task. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | New Name. |
| `description` | string | no |  | New Description. |
| `clear_description` | boolean | no | `false` | Clear Description. |
| `status` | string | no |  | Status. Move the task to this status column. A value the product loads from the provider, such as an id; write the value itself. |
| `milestone` | string | no |  | Milestone. Move the task to this milestone or list. A value the product loads from the provider, such as an id; write the value itself. |
| `start_date` | ISO date-time string | no |  | Start Date. |
| `clear_start_date` | boolean | no | `false` | Clear Start Date. |
| `due_date` | ISO date-time string | no |  | Due Date. |
| `clear_due_date` | boolean | no | `false` | Clear Due Date. |
| `story_points` | number | no |  | Story Points. |

Output fields:

- `id`: Task ID
- `nice_id`: Task Key
- `name`: Name
- `description`: Description
- `project`: Project ID
- `task_group`: Status ID
- `milestone`: Milestone or List ID
- `task`: Parent Task ID
- `completed`: Completed (boolean)
- `completed_on`: Completed On (datetime)
- `completed_by`: Completed By (Member ID)
- `archived`: Archived (boolean)
- `start_date`: Start Date (datetime)
- `due_date`: Due Date (datetime)
- `story_points`: Story Points
- `assignees`: Assignee IDs
- `labels`: Label IDs
- `subscribers`: Subscriber IDs
- `total_subtasks`: Subtasks (number)
- `completed_subtasks`: Completed Subtasks (number)
- `comments`: Comments (number)
- `created_at`: Created At (datetime)
- `created_by`: Created By (Member ID)

### `complete_task`

**Complete or Reopen Task.** Marks a Nifty task complete or reopens it, picked from cascading project and task dropdowns (agents: use nifty_task_update with completion). Idempotent: completing an already completed task leaves it completed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `portfolio` | string | no |  | Portfolio. Optional. Narrows the project list to one portfolio. Leave empty to pick from all your projects. A value the product loads from the provider, such as an id; write the value itself. |
| `project` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `task` | string | yes |  | Task. A value the product loads from the provider, such as an id; write the value itself. |
| `action` | string | yes | `"complete"` | Action. One of `"complete"`, `"reopen"`. |

Output fields:

- `id`: Task ID
- `nice_id`: Task Key
- `name`: Name
- `description`: Description
- `project`: Project ID
- `task_group`: Status ID
- `milestone`: Milestone or List ID
- `task`: Parent Task ID
- `completed`: Completed (boolean)
- `completed_on`: Completed On (datetime)
- `completed_by`: Completed By (Member ID)
- `archived`: Archived (boolean)
- `start_date`: Start Date (datetime)
- `due_date`: Due Date (datetime)
- `story_points`: Story Points
- `assignees`: Assignee IDs
- `labels`: Label IDs
- `subscribers`: Subscriber IDs
- `total_subtasks`: Subtasks (number)
- `completed_subtasks`: Completed Subtasks (number)
- `comments`: Comments (number)
- `created_at`: Created At (datetime)
- `created_by`: Created By (Member ID)

### `delete_task`

**Delete Task.** Permanently deletes a Nifty task picked from project and task dropdowns; it cannot be undone. Prefer Complete or Reopen Task when the work should stay on record. Idempotent in end state: a repeat call fails with not found because the task is already gone. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `portfolio` | string | no |  | Portfolio. Optional. Narrows the project list to one portfolio. Leave empty to pick from all your projects. A value the product loads from the provider, such as an id; write the value itself. |
| `project` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `task` | string | yes |  | Task. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Deleted Task ID
- `deleted`: Deleted (boolean)
- `message`: Message

### `get_task`

**Get Task.** Returns one Nifty task by ID with its status, milestone/list, parent task, dates, completion, assignee IDs and subtask counts. Use after a trigger or search to read current details before updating. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The task ID, e.g. from a trigger or Find Tasks (not the short key like ANP-1). |

Output fields:

- `id`: Task ID
- `nice_id`: Task Key
- `name`: Name
- `description`: Description
- `project`: Project ID
- `task_group`: Status ID
- `milestone`: Milestone or List ID
- `task`: Parent Task ID
- `completed`: Completed (boolean)
- `completed_on`: Completed On (datetime)
- `completed_by`: Completed By (Member ID)
- `archived`: Archived (boolean)
- `start_date`: Start Date (datetime)
- `due_date`: Due Date (datetime)
- `story_points`: Story Points
- `assignees`: Assignee IDs
- `labels`: Label IDs
- `subscribers`: Subscriber IDs
- `total_subtasks`: Subtasks (number)
- `completed_subtasks`: Completed Subtasks (number)
- `comments`: Comments (number)
- `created_at`: Created At (datetime)
- `created_by`: Created By (Member ID)

### `find_tasks`

**Find Tasks.** Lists Nifty tasks filtered by project, status, milestone/list, assignee, completion and a due-date window, one page at a time (pass next_offset to continue while has_more is true). Subtasks are only included when a project_id is given. Use to locate a task_id before updating, completing or deleting. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project ID. |
| `status_id` | string | no |  | Status ID. |
| `milestone_id` | string | no |  | Milestone or List ID. |
| `assignee_id` | string | no |  | Assignee Member ID. |
| `completion` | string | no | `"any"` | Completion. One of `"any"`, `"open"`, `"completed"`. |
| `include_subtasks` | boolean | no | `false` | Include Subtasks. Only works together with a Project ID. |
| `include_archived` | boolean | no | `false` | Include Archived. |
| `due_from` | ISO date-time string | no |  | Due From. Set together with Due To. |
| `due_to` | ISO date-time string | no |  | Due To. Set together with Due From. |
| `limit` | number | no | `100` | Limit. 1 to 1000. Default 100. |
| `offset` | number | no | `0` | Offset. Use next_offset from the previous page. |

Output fields:

- `items`: Tasks
- `items[].id`: Task ID
- `items[].nice_id`: Task Key
- `items[].name`: Name
- `items[].description`: Description
- `items[].project`: Project ID
- `items[].task_group`: Status ID
- `items[].milestone`: Milestone or List ID
- `items[].task`: Parent Task ID
- `items[].completed`: Completed (boolean)
- `items[].completed_on`: Completed On (datetime)
- `items[].completed_by`: Completed By (Member ID)
- `items[].archived`: Archived (boolean)
- `items[].start_date`: Start Date (datetime)
- `items[].due_date`: Due Date (datetime)
- `items[].story_points`: Story Points
- `items[].assignees`: Assignee IDs
- `items[].labels`: Label IDs
- `items[].subscribers`: Subscriber IDs
- `items[].total_subtasks`: Subtasks (number)
- `items[].completed_subtasks`: Completed Subtasks (number)
- `items[].comments`: Comments (number)
- `items[].created_at`: Created At (datetime)
- `items[].created_by`: Created By (Member ID)
- `has_more`: More Pages (boolean)
- `next_offset`: Next Offset (number)

### `add_task_assignees`

**Add Task Assignees.** Adds one or more members to a Nifty task's assignees without touching the others. Use after List Members to get member IDs; requires task_id and at least one member ID. Idempotent: adding someone already assigned changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. |
| `member_ids` | array | yes |  | Member IDs. Member IDs from List Members. |

Output fields:

- `task_id`: Task ID
- `member_ids`: Member IDs Sent
- `task`: Task (after the change)
- `task.id`: Task ID
- `task.nice_id`: Task Key
- `task.name`: Name
- `task.description`: Description
- `task.project`: Project ID
- `task.task_group`: Status ID
- `task.milestone`: Milestone or List ID
- `task.task`: Parent Task ID
- `task.completed`: Completed (boolean)
- `task.completed_on`: Completed On (datetime)
- `task.completed_by`: Completed By (Member ID)
- `task.archived`: Archived (boolean)
- `task.start_date`: Start Date (datetime)
- `task.due_date`: Due Date (datetime)
- `task.story_points`: Story Points
- `task.assignees`: Assignee IDs
- `task.labels`: Label IDs
- `task.subscribers`: Subscriber IDs
- `task.total_subtasks`: Subtasks (number)
- `task.completed_subtasks`: Completed Subtasks (number)
- `task.comments`: Comments (number)
- `task.created_at`: Created At (datetime)
- `task.created_by`: Created By (Member ID)

### `remove_task_assignees`

**Remove Task Assignees.** Removes one or more members from a Nifty task's assignees and leaves the others in place; the task itself is kept. Requires task_id and at least one member ID. Idempotent: removing someone not assigned changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. |
| `member_ids` | array | yes |  | Member IDs. Member IDs from List Members. |

Output fields:

- `task_id`: Task ID
- `member_ids`: Member IDs Sent
- `task`: Task (after the change)
- `task.id`: Task ID
- `task.nice_id`: Task Key
- `task.name`: Name
- `task.description`: Description
- `task.project`: Project ID
- `task.task_group`: Status ID
- `task.milestone`: Milestone or List ID
- `task.task`: Parent Task ID
- `task.completed`: Completed (boolean)
- `task.completed_on`: Completed On (datetime)
- `task.completed_by`: Completed By (Member ID)
- `task.archived`: Archived (boolean)
- `task.start_date`: Start Date (datetime)
- `task.due_date`: Due Date (datetime)
- `task.story_points`: Story Points
- `task.assignees`: Assignee IDs
- `task.labels`: Label IDs
- `task.subscribers`: Subscriber IDs
- `task.total_subtasks`: Subtasks (number)
- `task.completed_subtasks`: Completed Subtasks (number)
- `task.comments`: Comments (number)
- `task.created_at`: Created At (datetime)
- `task.created_by`: Created By (Member ID)

### `create_project`

**Create Project.** Creates a Nifty project, optionally in a portfolio picked from a dropdown (agents: use nifty_project_create). Not idempotent: each call creates another project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `portfolio` | string | no |  | Portfolio. Optional. When empty, Nifty uses your default portfolio. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Project Name. Up to 100 characters. |
| `description` | string | no |  | Description. |
| `access_type` | string | no |  | Access Type. One of `"public"`, `"workspace"`, `"limited"`. |
| `default_tasks_view` | string | no |  | Default Tasks View. One of `"table"`, `"kanban"`, `"swimlane"`, `"timeline"`. |

Output fields:

- `id`: Project ID
- `nice_id`: Project Key
- `name`: Name
- `description`: Description
- `subteam`: Portfolio ID
- `access_type`: Access Type
- `default_tasks_view`: Default Tasks View
- `archived`: Archived (boolean)
- `owner`: Owner (Member ID)
- `progress`: Progress (number)
- `total_story_points`: Total Story Points (number)
- `completed_story_points`: Completed Story Points (number)
- `email`: Project Email (email)
- `color`: Color

### `update_project`

**Update Project.** Updates a Nifty project picked from a dropdown (agents: use nifty_project_update): name, description, access level, default view, or archive/unarchive. Only filled fields change. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `portfolio` | string | no |  | Portfolio. Optional. Narrows the project list to one portfolio. Leave empty to pick from all your projects. A value the product loads from the provider, such as an id; write the value itself. |
| `project` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | New Name. |
| `description` | string | no |  | New Description. Nifty does not allow blanking a project description through the API. |
| `access_type` | string | no |  | Access Type. One of `"public"`, `"workspace"`, `"limited"`. |
| `default_tasks_view` | string | no |  | Default Tasks View. One of `"table"`, `"kanban"`, `"swimlane"`, `"timeline"`. |
| `archive` | string | no | `"unchanged"` | Archive. One of `"unchanged"`, `"archive"`, `"unarchive"`. |

Output fields:

- `id`: Project ID
- `nice_id`: Project Key
- `name`: Name
- `description`: Description
- `subteam`: Portfolio ID
- `access_type`: Access Type
- `default_tasks_view`: Default Tasks View
- `archived`: Archived (boolean)
- `owner`: Owner (Member ID)
- `progress`: Progress (number)
- `total_story_points`: Total Story Points (number)
- `completed_story_points`: Completed Story Points (number)
- `email`: Project Email (email)
- `color`: Color

### `get_project`

**Get Project.** Returns one Nifty project by ID with its portfolio, access level, default view, archive state, owner and progress. Use to check a project before creating tasks or milestones in it. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. |

Output fields:

- `id`: Project ID
- `nice_id`: Project Key
- `name`: Name
- `description`: Description
- `subteam`: Portfolio ID
- `access_type`: Access Type
- `default_tasks_view`: Default Tasks View
- `archived`: Archived (boolean)
- `owner`: Owner (Member ID)
- `progress`: Progress (number)
- `total_story_points`: Total Story Points (number)
- `completed_story_points`: Completed Story Points (number)
- `email`: Project Email (email)
- `color`: Color

### `find_projects`

**Find Projects.** Lists the Nifty projects you can see, optionally only those whose name contains a text (case-insensitive), in one portfolio, or archived ones too. Leave the name empty to list them all. Use to get the project_id that task, status and milestone actions need. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name_contains` | string | no |  | Name Contains. |
| `portfolio_id` | string | no |  | Portfolio ID. |
| `include_archived` | boolean | no | `false` | Include Archived. |

Output fields:

- `items`: Projects
- `items[].id`: Project ID
- `items[].nice_id`: Project Key
- `items[].name`: Name
- `items[].description`: Description
- `items[].subteam`: Portfolio ID
- `items[].access_type`: Access Type
- `items[].default_tasks_view`: Default Tasks View
- `items[].archived`: Archived (boolean)
- `items[].owner`: Owner (Member ID)
- `items[].progress`: Progress (number)
- `items[].total_story_points`: Total Story Points (number)
- `items[].completed_story_points`: Completed Story Points (number)
- `items[].email`: Project Email (email)
- `items[].color`: Color
- `truncated`: Truncated (boolean)

### `create_milestone`

**Create Milestone.** Creates a milestone (needs start and end dates) or a plain task list in a Nifty project picked from a dropdown (agents: use nifty_milestone_create). Not idempotent: each call creates another milestone. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `portfolio` | string | no |  | Portfolio. Optional. Narrows the project list to one portfolio. Leave empty to pick from all your projects. A value the product loads from the provider, such as an id; write the value itself. |
| `project` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `start_date` | ISO date-time string | no |  | Start Date. Required for a milestone. |
| `end_date` | ISO date-time string | no |  | End Date. Required for a milestone. |
| `create_as_list` | boolean | no | `false` | Create as List. Turn on to create a plain task list without dates instead of a milestone. |

Output fields:

- `id`: Milestone or List ID
- `name`: Name
- `description`: Description
- `is_list`: Is Plain List (boolean)
- `project`: Project ID
- `start`: Start (datetime)
- `end`: End (datetime)
- `archived`: Archived (boolean)
- `created_at`: Created At (datetime)
- `created_by`: Created By (Member ID)
- `statistic`: Task Statistics
- `statistic.total`: Total Tasks (number)
- `statistic.completed`: Completed Tasks (number)
- `statistic.overdue`: Overdue Tasks (number)

### `list_statuses`

**List Statuses.** Lists every status (board column) of a Nifty project in board order. Use to get the status_id that Create Task and Update Task need. Requires project_id. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. |
| `include_archived` | boolean | no | `false` | Include Archived. |

Output fields:

- `items`: Statuses
- `items[].id`: Status ID
- `items[].name`: Name
- `items[].project`: Project ID
- `items[].order`: Order (number)
- `items[].color`: Color

### `list_milestones`

**List Milestones and Lists.** Lists the dated milestones and plain task lists of a Nifty project, or only one kind. Use to get the milestone_id for creating or moving tasks. Requires project_id. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. |
| `kind` | string | no | `"all"` | Kind. One of `"all"`, `"milestones"`, `"lists"`. |

Output fields:

- `items`: Milestones and Lists
- `items[].id`: Milestone or List ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].is_list`: Is Plain List (boolean)
- `items[].project`: Project ID
- `items[].start`: Start (datetime)
- `items[].end`: End (datetime)
- `items[].archived`: Archived (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].created_by`: Created By (Member ID)
- `items[].statistic`: Task Statistics
- `items[].statistic.total`: Total Tasks (number)
- `items[].statistic.completed`: Completed Tasks (number)
- `items[].statistic.overdue`: Overdue Tasks (number)

### `list_members`

**List Members.** Lists the members of the Nifty workspace with their member ID, name, email and role; removed members are left out unless asked for. Use to get the member IDs that assignee options need. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `include_removed` | boolean | no | `false` | Include Removed Members. |

Output fields:

- `items`: Members
- `items[].id`: Member ID
- `items[].name`: Name
- `items[].email`: Email (email)
- `items[].initials`: Initials
- `items[].role`: Role
- `items[].pending`: Invite Pending (boolean)
- `items[].removed`: Removed (boolean)

### `nifty_task_create`

**Create Task (AI).** Creates a task in a Nifty project by placing it in a status column (status_id decides the project), optionally in a milestone or list, as a subtask of another task, with start/due dates, story points and assignees. Use for agents adding work items by ID; get status_id from List Statuses, milestone_id from List Milestones and member IDs from List Members. Requires status_id and name. Not idempotent: each call creates a new task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. ID of the status (board column) the task starts in. It also sets the project. Get it from List Statuses. |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `milestone_id` | string | no |  | Milestone or List ID. Optional. When empty, Nifty uses the project default list. |
| `parent_task_id` | string | no |  | Parent Task ID. Optional. Creates the task as a subtask of this task. |
| `start_date` | ISO date-time string | no |  | Start Date. ISO 8601, e.g. 2026-10-20. |
| `due_date` | ISO date-time string | no |  | Due Date. ISO 8601, e.g. 2026-10-27. |
| `story_points` | number | no |  | Story Points. |
| `assignee_ids` | array | no |  | Assignee IDs. Optional member IDs from List Members. |

Output fields:

- `id`: Task ID
- `nice_id`: Task Key
- `name`: Name
- `description`: Description
- `project`: Project ID
- `task_group`: Status ID
- `milestone`: Milestone or List ID
- `task`: Parent Task ID
- `completed`: Completed (boolean)
- `completed_on`: Completed On (datetime)
- `completed_by`: Completed By (Member ID)
- `archived`: Archived (boolean)
- `start_date`: Start Date (datetime)
- `due_date`: Due Date (datetime)
- `story_points`: Story Points
- `assignees`: Assignee IDs
- `labels`: Label IDs
- `subscribers`: Subscriber IDs
- `total_subtasks`: Subtasks (number)
- `completed_subtasks`: Completed Subtasks (number)
- `comments`: Comments (number)
- `created_at`: Created At (datetime)
- `created_by`: Created By (Member ID)

### `nifty_task_update`

**Update Task (AI).** Changes fields on an existing Nifty task by ID: name, description, status column, milestone/list, start and due dates, story points, and completion (complete or reopen). Only the fields you pass change; use the clear options to blank the description or a date, and Add/Remove Task Assignees for people. Requires task_id and at least one change. Idempotent: repeating the same update leaves the task in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `clear_description` | boolean | no | `false` | Clear Description. |
| `status_id` | string | no |  | Status ID. Moves the task to this status column. Get it from List Statuses. |
| `milestone_id` | string | no |  | Milestone or List ID. |
| `start_date` | ISO date-time string | no |  | Start Date. |
| `clear_start_date` | boolean | no | `false` | Clear Start Date. |
| `due_date` | ISO date-time string | no |  | Due Date. |
| `clear_due_date` | boolean | no | `false` | Clear Due Date. |
| `story_points` | number | no |  | Story Points. |
| `completion` | string | no | `"unchanged"` | Completion. One of `"unchanged"`, `"complete"`, `"reopen"`. |

Output fields:

- `id`: Task ID
- `nice_id`: Task Key
- `name`: Name
- `description`: Description
- `project`: Project ID
- `task_group`: Status ID
- `milestone`: Milestone or List ID
- `task`: Parent Task ID
- `completed`: Completed (boolean)
- `completed_on`: Completed On (datetime)
- `completed_by`: Completed By (Member ID)
- `archived`: Archived (boolean)
- `start_date`: Start Date (datetime)
- `due_date`: Due Date (datetime)
- `story_points`: Story Points
- `assignees`: Assignee IDs
- `labels`: Label IDs
- `subscribers`: Subscriber IDs
- `total_subtasks`: Subtasks (number)
- `completed_subtasks`: Completed Subtasks (number)
- `comments`: Comments (number)
- `created_at`: Created At (datetime)
- `created_by`: Created By (Member ID)

### `nifty_project_create`

**Create Project (AI).** Creates a Nifty project, optionally in a given portfolio (otherwise the workspace default), with a description, access level (public, workspace or limited) and default task view (table, kanban, swimlane or timeline). Use when an agent must start a new project; requires name. Not idempotent: each call creates another project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Up to 100 characters. |
| `portfolio_id` | string | no |  | Portfolio ID. Optional. The portfolio field (subteam) of any existing project shows the ID. |
| `description` | string | no |  | Description. |
| `access_type` | string | no |  | Access Type. One of `"public"`, `"workspace"`, `"limited"`. |
| `default_tasks_view` | string | no |  | Default Tasks View. One of `"table"`, `"kanban"`, `"swimlane"`, `"timeline"`. |

Output fields:

- `id`: Project ID
- `nice_id`: Project Key
- `name`: Name
- `description`: Description
- `subteam`: Portfolio ID
- `access_type`: Access Type
- `default_tasks_view`: Default Tasks View
- `archived`: Archived (boolean)
- `owner`: Owner (Member ID)
- `progress`: Progress (number)
- `total_story_points`: Total Story Points (number)
- `completed_story_points`: Completed Story Points (number)
- `email`: Project Email (email)
- `color`: Color

### `nifty_project_update`

**Update Project (AI).** Updates a Nifty project's name, description, access level or default task view, or archives/unarchives it; only the fields you pass change. Archiving hides the project but keeps its tasks and is undone with unarchive. Nifty cannot blank a project description. Requires project_id and at least one change. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `access_type` | string | no |  | Access Type. One of `"public"`, `"workspace"`, `"limited"`. |
| `default_tasks_view` | string | no |  | Default Tasks View. One of `"table"`, `"kanban"`, `"swimlane"`, `"timeline"`. |
| `archive` | string | no | `"unchanged"` | Archive. One of `"unchanged"`, `"archive"`, `"unarchive"`. |

Output fields:

- `id`: Project ID
- `nice_id`: Project Key
- `name`: Name
- `description`: Description
- `subteam`: Portfolio ID
- `access_type`: Access Type
- `default_tasks_view`: Default Tasks View
- `archived`: Archived (boolean)
- `owner`: Owner (Member ID)
- `progress`: Progress (number)
- `total_story_points`: Total Story Points (number)
- `completed_story_points`: Completed Story Points (number)
- `email`: Project Email (email)
- `color`: Color

### `nifty_milestone_create`

**Create Milestone or List (AI).** Creates either a dated milestone (shown on the project roadmap, needs start_date and end_date) or a plain task list (create_as_list true, dates optional) in a Nifty project. Use before creating tasks that should sit under a milestone; requires project_id and name. Not idempotent: each call creates another milestone or list. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `start_date` | ISO date-time string | no |  | Start Date. Required for a milestone. |
| `end_date` | ISO date-time string | no |  | End Date. Required for a milestone. |
| `create_as_list` | boolean | no | `false` | Create as List. Turn on to create a plain task list without dates instead of a milestone. |

Output fields:

- `id`: Milestone or List ID
- `name`: Name
- `description`: Description
- `is_list`: Is Plain List (boolean)
- `project`: Project ID
- `start`: Start (datetime)
- `end`: End (datetime)
- `archived`: Archived (boolean)
- `created_at`: Created At (datetime)
- `created_by`: Created By (Member ID)
- `statistic`: Task Statistics
- `statistic.total`: Total Tasks (number)
- `statistic.completed`: Completed Tasks (number)
- `statistic.overdue`: Overdue Tasks (number)

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

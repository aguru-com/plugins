# ClickUp

All-in-one productivity platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-clickup'
  version: '0.9.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `create_task`

**Create Task.** Create a new top-level task in a ClickUp list, with optional status, priority, assignees, description, dates, time estimate, and custom fields. Pick this for a standalone task; use Create Subtask to nest under a parent or Create Task From Template to inherit a template. Each call creates a new task, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Task Name. The title people see on the task. |
| `status_id` | string | no |  | Status. Statuses come from the selected list. A value the product loads from the provider, such as an id; write the value itself. |
| `priority_id` | string | no | `null` | Priority. How urgent the task is. One of `1`, `2`, `3`, `4`. |
| `assignee_id` | array | no |  | Assignees. People to assign the task to. Values the product loads from the provider, such as ids; write an array of them. |
| `description` | string | no |  | Description. Details shown on the task. |
| `is_markdown` | boolean | no | `false` | Use Markdown. Send the description as Markdown so ClickUp formats it. |
| `due_date` | ISO date-time string | no |  | Due Date. When the task is due. |
| `due_date_time` | boolean | no | `false` | Include Due Time. Keep the time of day, not just the date. |
| `start_date` | ISO date-time string | no |  | Start Date. When work on the task starts. |
| `start_date_time` | boolean | no | `false` | Include Start Time. Keep the time of day, not just the date. |
| `time_estimate` | number | no |  | Time Estimate. In milliseconds, e.g. 3600000 for one hour. |
| `check_required_custom_fields` | boolean | no | `false` | Check Required Custom Fields. Reject the task if a required custom field is empty. |
| `custom_fields` | object | yes |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `name`: Task Name
- `id`: Task ID
- `description`: Description
- `status`: Status
- `status.status`: Status
- `status.type`: Type
- `status.color`: Color
- `url`: URL (url)
- `date_created`: Date Created (datetime)
- `date_updated`: Date Updated (datetime)
- `due_date`: Due Date (datetime)
- `start_date`: Start Date (datetime)
- `priority`: Priority
- `time_spent`: Time Spent (duration)
- `archived`: Archived (boolean)
- `creator`: Creator
- `creator.username`: Username
- `creator.email`: Email (email)
- `creator.id`: User ID
- `watchers`: Watchers
- `watchers[].username`: Username
- `watchers[].email`: Email (email)
- `watchers[].id`: User ID
- `list`: List
- `list.name`: Name
- `list.id`: List ID
- `folder`: Folder
- `folder.name`: Name
- `folder.id`: Folder ID
- `space`: Space
- `space.id`: Space ID
- `team_id`: Team ID

### `create_task_from_template`

**Create Task From Template.** Create a new ClickUp task in a list by instantiating an existing task template, supplying only the new task name. Pick this when the task should inherit structure (subtasks, fields, defaults) from a saved template; use Create Task for a task built from scratch. Each call creates a distinct task, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `template_id` | string | yes |  | Template. A task template saved in the workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Task Name. Name of the new task. |

Output fields:

- `name`: Task Name
- `id`: Task ID
- `description`: Description
- `status`: Status
- `status.status`: Status
- `status.type`: Type
- `status.color`: Color
- `url`: URL (url)
- `date_created`: Date Created (datetime)
- `date_updated`: Date Updated (datetime)
- `due_date`: Due Date (datetime)
- `start_date`: Start Date (datetime)
- `priority`: Priority
- `time_spent`: Time Spent (duration)
- `archived`: Archived (boolean)
- `creator`: Creator
- `creator.username`: Username
- `creator.email`: Email (email)
- `creator.id`: User ID
- `watchers`: Watchers
- `watchers[].username`: Username
- `watchers[].email`: Email (email)
- `watchers[].id`: User ID
- `list`: List
- `list.name`: Name
- `list.id`: List ID
- `folder`: Folder
- `folder.name`: Name
- `folder.id`: Folder ID
- `space`: Space
- `space.id`: Space ID
- `team_id`: Team ID

### `create_folderless_list`

**Create Folderless List.** Create a new list directly under a ClickUp space (not inside a folder). Each call creates a separate list even with the same name, so it is not idempotent. Use when you need a top-level list in a space; to create a list inside a folder, use a folder-scoped list action instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | List Name. Name of the new list. |

Output fields:

- `name`: List Name
- `id`: List ID
- `content`: Content
- `task_count`: Task Count (number)
- `archived`: Archived (boolean)
- `permission_level`: Permission Level
- `override_statuses`: Override Statuses (boolean)
- `inbound_address`: Inbound Email Address (email)
- `folder`: Folder
- `folder.name`: Folder Name
- `folder.id`: Folder ID
- `folder.hidden`: Hidden (boolean)
- `folder.archived`: Archived (boolean)
- `space`: Space
- `space.name`: Space Name
- `space.id`: Space ID
- `space.archived`: Archived (boolean)
- `statuses`: Statuses
- `statuses[].status`: Status
- `statuses[].id`: Status ID
- `statuses[].type`: Type
- `statuses[].color`: Color
- `statuses[].orderindex`: Order Index (number)

### `create_task_comments`

**Create Task Comment.** Post a new comment on a ClickUp task and notify the workspace. Each call adds a distinct comment, so repeated calls create duplicates (not idempotent). If no assignee is given, the comment is attributed to the authenticated user. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes | `null` | Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `comment` | string | yes |  | Text. What the comment says. |
| `assignee_id` | string | no |  | Assignee. Who should act on the comment. Empty: you. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Comment ID
- `hist_id`: History ID
- `date`: Date

### `create_subtask`

**Create Subtask.** Create a child task nested under an existing parent task in a ClickUp list, with optional status, priority, assignees, dates, time estimate, and custom fields. Pick this when the new task must belong to a parent task; use Create Task for a standalone top-level task. Each call creates a new subtask, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes | `null` | Parent Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Subtask Name. The title people see on the task. |
| `status_id` | string | no |  | Status. Statuses come from the selected list. A value the product loads from the provider, such as an id; write the value itself. |
| `priority_id` | string | no | `null` | Priority. How urgent the task is. One of `1`, `2`, `3`, `4`. |
| `assignee_id` | array | no |  | Assignees. People to assign the task to. Values the product loads from the provider, such as ids; write an array of them. |
| `description` | string | no |  | Description. Details shown on the task. |
| `is_markdown` | boolean | no | `false` | Use Markdown. Send the description as Markdown so ClickUp formats it. |
| `due_date` | ISO date-time string | no |  | Due Date. When the task is due. |
| `due_date_time` | boolean | no | `false` | Include Due Time. Keep the time of day, not just the date. |
| `start_date` | ISO date-time string | no |  | Start Date. When work on the task starts. |
| `start_date_time` | boolean | no | `false` | Include Start Time. Keep the time of day, not just the date. |
| `time_estimate` | number | no |  | Time Estimate. In milliseconds, e.g. 3600000 for one hour. |
| `check_required_custom_fields` | boolean | no | `false` | Check Required Custom Fields. Reject the task if a required custom field is empty. |
| `custom_fields` | object | yes |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `name`: Task Name
- `id`: Task ID
- `description`: Description
- `status`: Status
- `status.status`: Status
- `status.type`: Type
- `status.color`: Color
- `url`: URL (url)
- `date_created`: Date Created (datetime)
- `date_updated`: Date Updated (datetime)
- `due_date`: Due Date (datetime)
- `start_date`: Start Date (datetime)
- `priority`: Priority
- `time_spent`: Time Spent (duration)
- `archived`: Archived (boolean)
- `creator`: Creator
- `creator.username`: Username
- `creator.email`: Email (email)
- `creator.id`: User ID
- `watchers`: Watchers
- `watchers[].username`: Username
- `watchers[].email`: Email (email)
- `watchers[].id`: User ID
- `list`: List
- `list.name`: Name
- `list.id`: List ID
- `folder`: Folder
- `folder.name`: Name
- `folder.id`: Folder ID
- `space`: Space
- `space.id`: Space ID
- `team_id`: Team ID

### `create_channel`

**Create Channel.** Create a standalone Chat channel in a ClickUp workspace with a name and visibility. Each call creates a new channel, so it is not idempotent. Use this for a workspace-level channel; to tie the channel to a space, folder, or list, use Create Channel in Space/Folder/List instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes | `""` | Name. Name people see in the sidebar. |
| `description` | string | no | `""` | Description. What the channel is for. |
| `topic` | string | no | `""` | Topic. A short line shown at the top of the channel. |
| `visibility` | string | yes | `"PUBLIC"` | Visibility. Who can see and join the channel. One of `"PUBLIC"`, `"PRIVATE"`. |

Output fields:

- `data`: Channel
- `data.name`: Name
- `data.type`: Type
- `data.visibility`: Visibility
- `data.id`: Channel ID
- `data.creator`: Creator ID
- `data.workspace_id`: Workspace ID
- `data.archived`: Archived (boolean)
- `data.created_at`: Created At (datetime)
- `data.updated_at`: Updated At (datetime)
- `data.parent`: Parent
- `data.parent.id`: Parent ID
- `data.parent.type`: Parent Type

### `create_channel_in_space_folder_list`

**Create Channel in Space/Folder/List.** Create a Chat channel attached to a specific location (space, folder, or list) in a ClickUp workspace, set via the location type and ID. Each call creates a new channel, so it is not idempotent. Use this variant when the channel should be tied to a location; use Create Channel for a standalone workspace channel. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no | `""` | Description. What the channel is for. |
| `topic` | string | no | `""` | Topic. A short line shown at the top of the channel. |
| `locationType` | string | yes | `"folder"` | Attach To. What the channel belongs to. One of `"space"`, `"folder"`, `"list"`. |
| `locationId` | string | yes |  | Location ID. The number at the end of the space, folder or list URL. |
| `visibility` | string | yes | `"PUBLIC"` | Visibility. Who can see and join the channel. One of `"PUBLIC"`, `"PRIVATE"`. |

Output fields:

- `data`: Channel
- `data.name`: Name
- `data.type`: Type
- `data.visibility`: Visibility
- `data.id`: Channel ID
- `data.creator`: Creator ID
- `data.workspace_id`: Workspace ID
- `data.archived`: Archived (boolean)
- `data.created_at`: Created At (datetime)
- `data.updated_at`: Updated At (datetime)
- `data.parent`: Parent
- `data.parent.id`: Parent ID
- `data.parent.type`: Parent Type

### `create_message`

**Create Message.** Post a new top-level message into a ClickUp Chat channel, given the workspace and channel IDs. Each call sends a separate message, so repeated calls create duplicates (not idempotent). Use Create Message Reply to respond within an existing message thread instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `channel_id` | string | yes |  | Channel. A chat channel in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | Message. ClickUp formats Markdown in the message. |
| `type` | string | yes | `"message"` | Message Type. How the message appears in the channel. One of `"message"`, `"post"`. |

Output fields:

- `content`: Content
- `type`: Type
- `id`: Message ID
- `date`: Date (datetime)
- `user_id`: User ID
- `parent_channel`: Parent Channel
- `replies_count`: Replies Count (number)
- `resolved`: Resolved (boolean)

### `create_message_reaction`

**Create Message Reaction.** Add an emoji reaction to a Chat message in a ClickUp workspace, given the workspace and message IDs plus the emoji. Adding the same emoji again has no additional effect, but this is a write that changes the message state. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `message_id` | string | yes |  | Message ID. Returned by Get Channel Messages or Create Message. |
| `emoji` | string | yes |  | Emoji. The emoji's name, without the colons. |

Output fields:

- `reaction`: Reaction
- `date`: Date
- `user_id`: User ID

### `create_message_reply`

**Create Message Reply.** Post a reply to an existing Chat message in a ClickUp workspace, creating a threaded response under that message. Each call adds a new reply, so repeated calls create duplicates (not idempotent). Use Create Message to start a new top-level message in a channel instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `message_id` | string | yes |  | Message ID. Returned by Get Channel Messages or Create Message. |
| `content` | string | yes |  | Message. ClickUp formats Markdown in the message. |
| `type` | string | yes | `"message"` | Message Type. How the reply appears in the thread. One of `"message"`, `"post"`. |

Output fields:

- `content`: Content
- `type`: Type
- `id`: Message ID
- `date`: Date (datetime)
- `user_id`: User ID
- `parent_channel`: Parent Channel
- `replies_count`: Replies Count (number)
- `resolved`: Resolved (boolean)

### `get_list`

**Get List.** Read-only: fetch the details of a single ClickUp list by its list ID. Use when you already know the list ID; does not modify anything and is safe to call repeatedly. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. The number at the end of the list's URL in ClickUp. |

Output fields:

- `name`: List Name
- `id`: List ID
- `content`: Content
- `task_count`: Task Count (number)
- `archived`: Archived (boolean)
- `permission_level`: Permission Level
- `override_statuses`: Override Statuses (boolean)
- `inbound_address`: Inbound Email Address (email)
- `folder`: Folder
- `folder.name`: Folder Name
- `folder.id`: Folder ID
- `folder.hidden`: Hidden (boolean)
- `folder.archived`: Archived (boolean)
- `space`: Space
- `space.name`: Space Name
- `space.id`: Space ID
- `space.archived`: Archived (boolean)
- `statuses`: Statuses
- `statuses[].status`: Status
- `statuses[].id`: Status ID
- `statuses[].type`: Type
- `statuses[].color`: Color
- `statuses[].orderindex`: Order Index (number)

### `get_list_task`

**Get Task.** Retrieve a single ClickUp task by its task ID, optionally including subtasks. Pick this when you already know the task ID; use Get Task by Name to resolve a name within a list or List Team Tasks to search broadly. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The code at the end of the task's URL in ClickUp. |
| `include_subtasks` | boolean | no | `false` | Include Subtasks. Also return the task's subtasks. |

Output fields:

- `name`: Task Name
- `id`: Task ID
- `description`: Description
- `status`: Status
- `status.status`: Status
- `status.type`: Type
- `status.color`: Color
- `url`: URL (url)
- `date_created`: Date Created (datetime)
- `date_updated`: Date Updated (datetime)
- `due_date`: Due Date (datetime)
- `start_date`: Start Date (datetime)
- `priority`: Priority
- `time_spent`: Time Spent (duration)
- `archived`: Archived (boolean)
- `creator`: Creator
- `creator.username`: Username
- `creator.email`: Email (email)
- `creator.id`: User ID
- `watchers`: Watchers
- `watchers[].username`: Username
- `watchers[].email`: Email (email)
- `watchers[].id`: User ID
- `list`: List
- `list.name`: Name
- `list.id`: List ID
- `folder`: Folder
- `folder.name`: Name
- `folder.id`: Folder ID
- `space`: Space
- `space.id`: Space ID
- `team_id`: Team ID

### `get_task_by_name`

**Get Task by Name.** Look up a single ClickUp task by its exact name within a specific list, paging through the list until the first exact-name match is found. Pick this when you know a task name but not its ID; use Get Task if you already have the ID. Read-only and idempotent; matching is exact and case-sensitive, and it errors if no task with that name exists in the list. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_name` | string | yes |  | Task Name. Must match exactly, including capital letters. |

Output fields:

- `name`: Task Name
- `id`: Task ID
- `description`: Description
- `status`: Status
- `status.status`: Status
- `status.type`: Type
- `status.color`: Color
- `url`: URL (url)
- `date_created`: Date Created (datetime)
- `date_updated`: Date Updated (datetime)
- `due_date`: Due Date (datetime)
- `start_date`: Start Date (datetime)
- `priority`: Priority
- `time_spent`: Time Spent (duration)
- `archived`: Archived (boolean)
- `creator`: Creator
- `creator.username`: Username
- `creator.email`: Email (email)
- `creator.id`: User ID
- `watchers`: Watchers
- `watchers[].username`: Username
- `watchers[].email`: Email (email)
- `watchers[].id`: User ID
- `list`: List
- `list.name`: Name
- `list.id`: List ID
- `folder`: Folder
- `folder.name`: Name
- `folder.id`: Folder ID
- `space`: Space
- `space.id`: Space ID
- `team_id`: Team ID

### `get_space`

**Get Space.** Read-only: fetch the details of a single ClickUp space by its space ID. Use when you already know which space you want; to discover space IDs first, use the list-spaces action instead. Safe to call repeatedly. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `name`: Name
- `id`: Space ID
- `private`: Private (boolean)
- `color`: Color
- `admin_can_manage`: Admin Can Manage (boolean)
- `multiple_assignees`: Multiple Assignees (boolean)
- `archived`: Archived (boolean)
- `statuses`: Statuses
- `statuses[].status`: Status
- `statuses[].type`: Type
- `statuses[].id`: Status ID
- `statuses[].color`: Color
- `statuses[].orderindex`: Order Index (number)
- `features`: Features
- `features.due_dates.enabled`: Due Dates Enabled (boolean)
- `features.sprints.enabled`: Sprints Enabled (boolean)
- `features.time_tracking.enabled`: Time Tracking Enabled (boolean)
- `features.tags.enabled`: Tags Enabled (boolean)
- `features.custom_fields.enabled`: Custom Fields Enabled (boolean)
- `features.milestones.enabled`: Milestones Enabled (boolean)
- `features.priorities.enabled`: Priorities Enabled (boolean)
- `features.priorities.priorities`: Priorities
- `features.priorities.priorities[].priority`: Priority
- `features.priorities.priorities[].id`: Priority ID
- `features.priorities.priorities[].color`: Color
- `features.priorities.priorities[].orderindex`: Order Index

### `get_spaces`

**Get Spaces.** Read-only: list all spaces in a ClickUp workspace (team). Use to discover available spaces and their IDs before drilling into a specific space, folder, or list. Safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `spaces`: Spaces
- `spaces[].name`: Name
- `spaces[].id`: Space ID
- `spaces[].color`: Color
- `spaces[].private`: Private (boolean)
- `spaces[].admin_can_manage`: Admin Can Manage (boolean)
- `spaces[].multiple_assignees`: Multiple Assignees (boolean)
- `spaces[].archived`: Archived (boolean)
- `spaces[].statuses`: Statuses
- `spaces[].statuses[].status`: Status
- `spaces[].statuses[].type`: Type
- `spaces[].statuses[].color`: Color
- `spaces[].statuses[].orderindex`: Order Index (number)
- `spaces[].statuses[].id`: Status ID
- `spaces[].features`: Features
- `spaces[].features.due_dates.enabled`: Due Dates Enabled (boolean)
- `spaces[].features.sprints.enabled`: Sprints Enabled (boolean)
- `spaces[].features.time_tracking.enabled`: Time Tracking Enabled (boolean)
- `spaces[].features.points.enabled`: Points Enabled (boolean)
- `spaces[].features.tags.enabled`: Tags Enabled (boolean)
- `spaces[].features.custom_fields.enabled`: Custom Fields Enabled (boolean)
- `spaces[].features.milestones.enabled`: Milestones Enabled (boolean)
- `spaces[].features.priorities.priorities`: Priorities
- `spaces[].features.priorities.priorities[].priority`: Priority
- `spaces[].features.priorities.priorities[].color`: Color
- `spaces[].features.priorities.priorities[].id`: Priority ID

### `get_task_comments`

**Get Task Comments.** Read-only: retrieve the existing comments on a ClickUp task by its task ID. Use to review discussion or activity on a known task; does not create or modify anything. Safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The code at the end of the task's URL in ClickUp. |

Output fields:

- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].comment_text`: Comment Text
- `comments[].resolved`: Resolved (boolean)
- `comments[].date`: Date
- `comments[].user`: User
- `comments[].user.id`: User ID
- `comments[].user.username`: Username
- `comments[].user.email`: Email (email)
- `comments[].user.color`: Color
- `comments[].user.initials`: Initials
- `comments[].user.profilePicture`: Profile Picture (image)

### `get_channel`

**Get Channel.** Read-only: fetch the details of a single ClickUp Chat channel by its workspace and channel IDs. Use when you already know the channel ID; to discover channels first, use Get Channels. Safe to call repeatedly. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `channel_id` | string | yes |  | Channel. A chat channel in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `data`: Channels
- `data[].name`: Name
- `data[].id`: ID
- `data[].type`: Type
- `data[].visibility`: Visibility
- `data[].chat_room_category`: Category
- `data[].creator`: Creator
- `data[].archived`: Archived (boolean)
- `data[].is_canonical_channel`: Is Canonical Channel (boolean)
- `data[].workspace_id`: Workspace ID
- `data[].created_at`: Created At (datetime)
- `data[].updated_at`: Updated At (datetime)
- `data[].latest_comment_at`: Latest Comment At (datetime)
- `data[].parent`: Parent
- `data[].parent.id`: Parent ID
- `data[].parent.type`: Parent Type

### `get_channels`

**Get Channels.** Read-only: list the Chat channels in a ClickUp workspace, optionally including hidden ones and capping the count (1-100). Use to discover channel IDs before reading or posting messages. Safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `include_hidden` | boolean | no | `false` | Include Hidden Channels. Also list channels you have hidden. |
| `limit` | number | no | `50` | Max Results. How many channels to return, up to 100. |

Output fields:

- `data`: Channels
- `data[].name`: Name
- `data[].type`: Type
- `data[].visibility`: Visibility
- `data[].id`: Channel ID
- `data[].creator`: Creator ID
- `data[].archived`: Archived (boolean)
- `data[].chat_room_category`: Category
- `data[].is_canonical_channel`: Is Canonical Channel (boolean)
- `data[].workspace_id`: Workspace ID
- `data[].created_at`: Created At (datetime)
- `data[].updated_at`: Updated At (datetime)
- `data[].latest_comment_at`: Latest Comment At (datetime)
- `data[].parent`: Parent
- `data[].parent.id`: Parent ID
- `data[].parent.type`: Parent Type
- `next_cursor`: Next Cursor

### `get_channel_messages`

**Get Channel Messages.** Read-only: list the messages in a ClickUp Chat channel, given the workspace and channel IDs, with an optional limit (1-100) and markdown or plain-text content format. Use to read channel history; does not post anything. Safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `channel_id` | string | yes |  | Channel. A chat channel in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no | `50` | Max Results. How many messages to return, up to 100. |
| `content_format` | string | no | `"text/md"` | Content Format. How the message text comes back. One of `"text/md"`, `"text/plain"`. |

Output fields:

- `data`: Messages
- `data[].content`: Content
- `data[].id`: Message ID
- `data[].type`: Type
- `data[].user_id`: User ID
- `data[].parent_channel`: Parent Channel
- `data[].resolved`: Resolved (boolean)
- `data[].replies_count`: Replies Count (number)
- `data[].date`: Date (datetime)
- `data[].date_assigned`: Date Assigned (datetime)
- `next_cursor`: Next Cursor

### `get_message_reactions`

**Get Message Reactions.** Read-only: list the emoji reactions on a specific Chat message in a ClickUp workspace, given the workspace and message IDs. Use to inspect who reacted and with what; does not modify the message. Safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `message_id` | string | yes |  | Message ID. Returned by Get Channel Messages or Create Message. |

Output fields:

- `data`: Reactions
- `data[].reaction`: Reaction
- `data[].date`: Date
- `data[].user_id`: User ID
- `next_cursor`: Next Cursor

### `get_message_replies`

**Get Message Replies.** Read-only: retrieve the threaded replies to a specific Chat message in a ClickUp workspace, given the workspace and message IDs. Use to read a reply thread; does not post anything. Safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `message_id` | string | yes |  | Message ID. Returned by Get Channel Messages or Create Message. |

Output fields:

- `data`: Replies
- `data[].content`: Content
- `data[].id`: Reply ID
- `data[].type`: Type
- `data[].user_id`: User ID
- `data[].date`: Date (datetime)
- `data[].resolved`: Resolved (boolean)
- `data[].parent_message`: Parent Message ID
- `data[].parent_channel`: Parent Channel
- `data[].date_assigned`: Date Assigned (datetime)
- `next_cursor`: Next Cursor

### `list_workspace_tasks`

**List Workspace Tasks.** List tasks across an entire ClickUp workspace, filtered by space, folder, list, assignees, and tags, with paging, ordering, and inclusion of closed tasks. Pick this to search or browse tasks broadly when you do not know a specific task ID; use Get Task for a known ID or Get Task by Name to resolve a name within one list. Read-only and idempotent; results are paginated (page starts at 0). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | array | no |  | Spaces. Only tasks in these spaces. Values the product loads from the provider, such as ids; write an array of them. |
| `folder_id` | array | no |  | Folders. Only tasks in these folders. Values the product loads from the provider, such as ids; write an array of them. |
| `list_id` | array | no |  | Lists. Only tasks in these lists. Values the product loads from the provider, such as ids; write an array of them. |
| `assignees` | array | no |  | Assignees. Only tasks assigned to these people. Values the product loads from the provider, such as ids; write an array of them. |
| `tags` | array | no |  | Tags. Only tasks with these tags. Pick a space first. Values the product loads from the provider, such as ids; write an array of them. |
| `include_closed` | boolean | no | `false` | Include Closed Tasks. Closed tasks are left out unless this is on. |
| `order_by` | string | no |  | Sort By. Empty: sorted by date created. One of `"id"`, `"created"`, `"updated"`, `"due_date"`. |
| `page` | number | no | `0` | Page. Each page holds up to 100 tasks; the first page is 0. |
| `reverse` | boolean | no | `false` | Reverse Order. Flip the sort direction. |

Output fields:

- `tasks`: Tasks
- `tasks[].name`: Name
- `tasks[].id`: Task ID
- `tasks[].status.status`: Status
- `tasks[].url`: URL (url)
- `tasks[].description`: Description
- `tasks[].priority.priority`: Priority
- `tasks[].due_date`: Due Date (date)
- `tasks[].start_date`: Start Date (date)
- `tasks[].date_created`: Date Created (date)
- `tasks[].date_updated`: Date Updated (date)
- `tasks[].archived`: Archived (boolean)
- `tasks[].creator`: Creator
- `tasks[].creator.username`: Username
- `tasks[].creator.email`: Email (email)
- `tasks[].creator.id`: User ID
- `tasks[].assignees`: Assignees
- `tasks[].assignees[].username`: Username
- `tasks[].assignees[].email`: Email (email)
- `tasks[].assignees[].id`: User ID
- `tasks[].list`: List
- `tasks[].list.name`: List Name
- `tasks[].list.id`: List ID
- `tasks[].folder`: Folder
- `tasks[].folder.name`: Folder Name
- `tasks[].folder.id`: Folder ID
- `tasks[].space.id`: Space ID
- `tasks[].team_id`: Team ID
- `last_page`: Last Page (boolean)

### `list_workspace_time_entries`

**List Time Entries.** List tracked time entries across a ClickUp workspace, optionally narrowed by date range, assignee, and a single scope (task, list, folder, or space). Pick this to report on or audit logged time; it is read-only and idempotent. Scope filters are mutually exclusive, with task taking precedence over list, folder, then space. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | no |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `folder_id` | string | no |  | Folder. A folder in the selected space. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | no |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | no | `null` | Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `start_date` | ISO date-time string | no |  | Start Date. Entries from this moment on. Empty: the last 30 days. |
| `end_date` | ISO date-time string | no |  | End Date. Entries up to this moment. Empty: now. |
| `assignee` | array | no |  | Assignees. Whose entries to include. Empty: only yours. Values the product loads from the provider, such as ids; write an array of them. |
| `include_task_tags` | boolean | no | `false` | Include Task Tags. Add each task's tags to the results. |
| `include_location_names` | boolean | no | `false` | Include Location Names. Add list, folder and space names to the results. |

Output fields:

- `data`: Time Entries
- `data[].id`: ID
- `data[].task`: Task
- `data[].task.id`: Task ID
- `data[].task.name`: Task Name
- `data[].wid`: Workspace ID
- `data[].user`: User
- `data[].user.id`: User ID
- `data[].user.username`: Username
- `data[].user.email`: Email (email)
- `data[].user.color`: Color
- `data[].user.initials`: Initials
- `data[].user.profilePicture`: Profile Picture (image)
- `data[].billable`: Billable (boolean)
- `data[].start`: Start
- `data[].end`: End
- `data[].duration`: Duration
- `data[].description`: Description

### `update_task`

**Update Task.** Modify fields of an existing ClickUp task identified by its task ID, including name, description, status, priority, and adding or removing assignees. Pick this to change a task you already have the ID for; use Create Task to make a new one. Only the fields you supply are changed, so repeating the same update produces the same end state. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes | `null` | Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Task Name. New name for the task. |
| `description` | string | no |  | Description. New details for the task. |
| `status_id` | string | no |  | Status. Statuses come from the selected list. A value the product loads from the provider, such as an id; write the value itself. |
| `priority_id` | string | no | `null` | Priority. How urgent the task is. One of `1`, `2`, `3`, `4`. |
| `add_assignee` | array | no |  | Add Assignees. People to add to the task. Values the product loads from the provider, such as ids; write an array of them. |
| `rem_assignee` | array | no |  | Remove Assignees. People to take off the task. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `name`: Task Name
- `id`: Task ID
- `description`: Description
- `status`: Status
- `status.status`: Status
- `status.type`: Type
- `status.color`: Color
- `url`: URL (url)
- `date_created`: Date Created (datetime)
- `date_updated`: Date Updated (datetime)
- `due_date`: Due Date (datetime)
- `start_date`: Start Date (datetime)
- `priority`: Priority
- `time_spent`: Time Spent (duration)
- `archived`: Archived (boolean)
- `creator`: Creator
- `creator.username`: Username
- `creator.email`: Email (email)
- `creator.id`: User ID
- `watchers`: Watchers
- `watchers[].username`: Username
- `watchers[].email`: Email (email)
- `watchers[].id`: User ID
- `list`: List
- `list.name`: Name
- `list.id`: List ID
- `folder`: Folder
- `folder.name`: Name
- `folder.id`: Folder ID
- `space`: Space
- `space.id`: Space ID
- `team_id`: Team ID

### `update_message`

**Update Message.** Replace the content of an existing ClickUp chat message, identified by its message ID, within a workspace. Pick this to edit a message that was already posted; you must already know the message ID and supply the new content plus its format (Markdown or plain text). Overwrites the message content rather than appending, so re-running with the same content is effectively idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `message_id` | string | yes |  | Message ID. Returned by Get Channel Messages or Create Message. |
| `content` | string | yes |  | Message. ClickUp formats Markdown in the message. |
| `content_format` | string | yes | `"text/md"` | Content Format. How ClickUp should read the new text. One of `"text/md"`, `"text/plain"`. |

Output fields:

- `content`: Content
- `type`: Type
- `id`: Message ID
- `date`: Date (datetime)
- `user_id`: User ID
- `parent_channel`: Parent Channel
- `replies_count`: Replies Count (number)
- `resolved`: Resolved (boolean)

### `delete_message`

**Delete Message.** Permanently delete a Chat message in a ClickUp workspace by its workspace and message IDs. This is a destructive write; once deleted the message cannot be recovered. Repeating the call on an already-deleted message has no further effect. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `message_id` | string | yes |  | Message ID. Returned by Get Channel Messages or Create Message. |

### `delete_message_reaction`

**Delete Message Reaction.** Remove a specific reaction from a Chat message in a ClickUp workspace, identified by workspace, message, and reaction IDs. This mutates the message; once the reaction is gone, repeating the call has no further effect, but it is a destructive operation against the current state. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `message_id` | string | yes |  | Message ID. Returned by Get Channel Messages or Create Message. |
| `reaction_id` | string | yes |  | Emoji. The emoji's name, without the colons. |

### `delete_task`

**Delete Task.** Permanently delete a ClickUp task identified by its task ID. Pick this to remove a task entirely; this is destructive and cannot be undone, so confirm the ID before calling. Deleting an already-deleted task fails rather than succeeding, so treat it as non-idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes | `null` | Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |

### `get_accessible_custom_fields`

**Get List Custom Fields.** Read-only: list the custom fields defined for tasks in a given ClickUp list, including each field ID, type, and configuration. Use this to discover valid field IDs before setting a custom field value on a task. Safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `[].id`: Field ID
- `[].name`: Name
- `[].type`: Type
- `[].date_created`: Date Created
- `[].hide_from_guests`: Hide From Guests (boolean)

### `set_custom_fields_value`

**Set Custom Field Value.** Set the value of a specific custom field on a ClickUp task, given the task ID and field ID. This overwrites the field with the supplied value, so repeating with the same value leaves the task in the same state (upsert by field). Use get-accessible-custom-fields first to find the field ID and its expected value format. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | no |  | List. Needed to pick the task and the field. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes | `null` | Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `field_id` | string | yes | `null` | Field. A custom field on the selected list. A value the product loads from the provider, such as an id; write the value itself. |
| `value` | string | yes |  | Value. Numbers as digits, dates as Unix milliseconds, dropdowns as the option ID. |

### `clickup_create_checklist_item`

**Create Checklist Item.** Add a line item to an existing ClickUp checklist, identified by its checklist ID (obtained from Create Checklist). Optionally assign the item to a user. Each call adds a separate item, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `checklist_id` | string | yes |  | Checklist ID. The ID of the checklist to add the item to (from Create Checklist) |
| `name` | string | yes |  | Item Name. The text of the checklist item. |
| `assignee` | number | no |  | Assignee. The user ID to assign this checklist item to. |

Output fields:

- `checklist`: Checklist
- `checklist.id`: Checklist ID
- `checklist.task_id`: Task ID
- `checklist.name`: Name
- `checklist.resolved`: Resolved Count (number)
- `checklist.unresolved`: Unresolved Count (number)
- `checklist.items`: Items
- `checklist.items[].id`: Item ID
- `checklist.items[].name`: Name
- `checklist.items[].resolved`: Resolved (boolean)
- `checklist.items[].assignee`: Assignee
- `checklist.items[].parent`: Parent Item ID

### `clickup_create_checklist`

**Create Checklist.** Create a new checklist on a ClickUp task. The response contains the new checklist ID, which you then pass to Create Checklist Item to add items. Each call creates a separate checklist, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes | `null` | Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Checklist Name. The name of the checklist. |

Output fields:

- `checklist`: Checklist
- `checklist.id`: Checklist ID
- `checklist.task_id`: Task ID
- `checklist.name`: Name
- `checklist.resolved`: Resolved Count (number)
- `checklist.unresolved`: Unresolved Count (number)
- `checklist.items`: Items
- `checklist.items[].id`: Item ID
- `checklist.items[].name`: Name
- `checklist.items[].resolved`: Resolved (boolean)
- `checklist.items[].assignee`: Assignee
- `checklist.items[].parent`: Parent Item ID

### `clickup_delete_checklist_item`

**Delete Checklist Item.** Delete one item from a ClickUp checklist, identified by its checklist ID and checklist item ID. To remove the whole checklist at once, use Delete Checklist instead. Each call targets a specific item ID that no longer exists after deletion, so it is not idempotent on retry. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `checklist_id` | string | yes |  | Checklist ID. The ID of the parent checklist (from Create Checklist) |
| `checklist_item_id` | string | yes |  | Checklist Item ID. The ID of the checklist item to delete. |

### `clickup_delete_checklist`

**Delete Checklist.** Delete an entire ClickUp checklist (and all its items) by its checklist ID. To remove a single item instead, use Delete Checklist Item. Deleting an already-removed checklist is treated as a no-op, so this is safe to retry. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `checklist_id` | string | yes |  | Checklist ID. The ID of the checklist to delete (from Create Checklist) |

### `clickup_update_checklist_item`

**Update Checklist Item.** Update a single ClickUp checklist item: rename it, mark it resolved/unresolved, reassign it, or nest it under another item as a parent. Requires the checklist ID and the checklist item ID. This sets the item to the supplied end state, so repeating the same update is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `checklist_id` | string | yes |  | Checklist ID. The ID of the parent checklist (from Create Checklist) |
| `checklist_item_id` | string | yes |  | Checklist Item ID. The ID of the checklist item to update. |
| `name` | string | no |  | Item Name. The new text of the checklist item. |
| `resolved` | boolean | no |  | Resolved. Whether the checklist item is resolved (checked) |
| `assignee` | number | no |  | Assignee. The user ID to assign this checklist item to. |
| `parent` | string | no |  | Parent Item ID. The ID of another checklist item to nest this one under as a child. |

Output fields:

- `checklist`: Checklist
- `checklist.id`: Checklist ID
- `checklist.task_id`: Task ID
- `checklist.name`: Name
- `checklist.resolved`: Resolved Count (number)
- `checklist.unresolved`: Unresolved Count (number)
- `checklist.items`: Items
- `checklist.items[].id`: Item ID
- `checklist.items[].name`: Name
- `checklist.items[].resolved`: Resolved (boolean)
- `checklist.items[].assignee`: Assignee
- `checklist.items[].parent`: Parent Item ID

### `clickup_update_checklist`

**Update Checklist.** Rename a ClickUp checklist or change its position, identified by its checklist ID (obtained from Create Checklist or the task data). To edit the items inside it use Update Checklist Item instead. This sets the checklist to the supplied end state, so repeating the same update is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `checklist_id` | string | yes |  | Checklist ID. The ID of the checklist to update (from Create Checklist) |
| `name` | string | no |  | Checklist Name. The new name of the checklist. |
| `position` | number | no |  | Position. The zero-based position of the checklist relative to other checklists on the task. |

Output fields:

- `checklist`: Checklist
- `checklist.id`: Checklist ID
- `checklist.task_id`: Task ID
- `checklist.name`: Name
- `checklist.resolved`: Resolved Count (number)
- `checklist.unresolved`: Unresolved Count (number)
- `checklist.items`: Items
- `checklist.items[].id`: Item ID
- `checklist.items[].name`: Name
- `checklist.items[].resolved`: Resolved (boolean)
- `checklist.items[].assignee`: Assignee
- `checklist.items[].parent`: Parent Item ID

### `clickup_create_task_comment`

**Create Task Comment.** Post a new comment on a ClickUp task identified by its task ID. Use this to add a discussion note or @-style update to a task; to read existing comments use Get Task Comments, and to reply within a thread use Create Threaded Comment. Each call adds a distinct comment, so it is not idempotent; if no assignee is given the comment is attributed to the authenticated user. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes | `null` | Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `comment` | string | yes |  | Comment. Comment to make on the task. |
| `assignee_id` | string | no |  | Assignee Id. ID of assignee for Task Comment. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Comment ID
- `hist_id`: History ID
- `date`: Date

### `clickup_delete_comment`

**Delete Comment.** Delete a ClickUp comment identified by its comment ID. Obtain the comment ID from Get Task Comments or Get Threaded Comments. Removing an already-deleted comment is treated as a no-op, so this is safe to retry. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. The ID of the comment to delete (from Get Task Comments or Get Threaded Comments) |

### `clickup_get_task_comments`

**Get Task Comments.** Read-only: retrieve the comments on a ClickUp task by its task ID. Use to review discussion or activity on a known task, or to obtain a comment ID to feed Update Comment, Delete Comment, or Create Threaded Comment. Does not modify anything and is safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The ID of the task to get. |

Output fields:

- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].comment_text`: Comment Text
- `comments[].resolved`: Resolved (boolean)
- `comments[].date`: Date
- `comments[].user`: User
- `comments[].user.id`: User ID
- `comments[].user.username`: Username
- `comments[].user.email`: Email (email)
- `comments[].user.color`: Color
- `comments[].user.initials`: Initials
- `comments[].user.profilePicture`: Profile Picture (image)

### `clickup_update_comment`

**Update Comment.** Edit a ClickUp comment identified by its comment ID: change its text, reassign it, or mark it resolved/unresolved. Obtain the comment ID from Get Task Comments or Get Threaded Comments. This sets the comment to the supplied end state, so repeating the same update is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. The ID of the comment to update (from Get Task Comments or Get Threaded Comments) |
| `comment_text` | string | yes |  | Comment Text. The new text of the comment. |
| `assignee` | number | no |  | Assignee. The user ID to assign the comment to. |
| `resolved` | boolean | no |  | Resolved. Whether the comment is resolved. |

### `clickup_get_accessible_custom_fields`

**Get Accessible Custom Fields.** Read-only: list the custom fields defined for tasks in a given ClickUp list, including each field ID, type, and configuration. Use this to discover valid field IDs and their expected value formats before calling Set Custom Field Value or Remove Custom Field Value on a task. Safe to call repeatedly (idempotent). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `[].id`: Field ID
- `[].name`: Name
- `[].type`: Type
- `[].date_created`: Date Created
- `[].hide_from_guests`: Hide From Guests (boolean)

### `clickup_create_folder`

**Create Folder.** Create a new folder inside a ClickUp space to group lists. Pick this to add an organizational container under a space; to add a list directly, use Create Folderless List. Each call creates a new folder even with the same name, so retries duplicate it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Folder Name. The name of the folder to create. |

Output fields:

- `id`: Folder ID
- `name`: Name
- `task_count`: Task Count (number)
- `archived`: Archived (boolean)
- `hidden`: Hidden (boolean)
- `space`: Space
- `space.id`: Space ID
- `space.name`: Name

### `clickup_delete_folder`

**Delete Folder.** Permanently delete a ClickUp folder (and all lists and tasks it contains) by folder ID. This is destructive and cannot be undone, so confirm the ID before calling. Resolve the folder ID with Get Folders for the intended space first — do not reuse a stale or copied ID, as any folder the connection can access will be deleted. Deleting an already-deleted folder fails rather than succeeding, so treat it as non-idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder ID. The ID of the folder to delete. |

### `clickup_get_folders`

**Get Folders.** Read-only: list every folder in a ClickUp space, returning their IDs and names. Use to discover folder IDs before acting on a folder or creating a list inside one. Safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `folders`: Folders
- `folders[].id`: Folder ID
- `folders[].name`: Name
- `folders[].task_count`: Task Count (number)
- `folders[].archived`: Archived (boolean)
- `folders[].hidden`: Hidden (boolean)
- `folders[].space`: Space
- `folders[].space.id`: Space ID
- `folders[].space.name`: Name

### `clickup_get_folder`

**Get Folder.** Read-only: fetch the details of one ClickUp folder by folder ID. Use when you already know the folder ID; to discover folder IDs first, use Get Folders. Safe to call repeatedly. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder ID. The ID of the folder to get. |

Output fields:

- `id`: Folder ID
- `name`: Name
- `task_count`: Task Count (number)
- `archived`: Archived (boolean)
- `hidden`: Hidden (boolean)
- `space`: Space
- `space.id`: Space ID
- `space.name`: Name

### `clickup_update_folder`

**Update Folder.** Rename an existing ClickUp folder by folder ID. Pick this to change a folder you already have the ID for; use Create Folder to make a new one. Re-running with the same name yields the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder ID. The ID of the folder to update. |
| `name` | string | yes |  | Folder Name. The new name for the folder. |

Output fields:

- `id`: Folder ID
- `name`: Name
- `task_count`: Task Count (number)
- `archived`: Archived (boolean)
- `hidden`: Hidden (boolean)
- `space`: Space
- `space.id`: Space ID
- `space.name`: Name

### `clickup_create_folderless_list`

**Create Folderless List.** Create a new list directly under a ClickUp space, not inside a folder. Pick this for a top-level list in a space; use Create List (in Folder) when the list belongs to a folder. Each call creates a new list even with the same name, so retries duplicate it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | List Name. The name of the list to create. |

Output fields:

- `name`: List Name
- `id`: List ID
- `content`: Content
- `task_count`: Task Count (number)
- `archived`: Archived (boolean)
- `permission_level`: Permission Level
- `override_statuses`: Override Statuses (boolean)
- `inbound_address`: Inbound Email Address (email)
- `folder`: Folder
- `folder.name`: Folder Name
- `folder.id`: Folder ID
- `folder.hidden`: Hidden (boolean)
- `folder.archived`: Archived (boolean)
- `space`: Space
- `space.name`: Space Name
- `space.id`: Space ID
- `space.archived`: Archived (boolean)
- `statuses`: Statuses
- `statuses[].status`: Status
- `statuses[].id`: Status ID
- `statuses[].type`: Type
- `statuses[].color`: Color
- `statuses[].orderindex`: Order Index (number)

### `clickup_create_list`

**Create List (in Folder).** Create a new list inside a specific ClickUp folder. Pick this when the list should live under a folder; use Create Folderless List when it should sit directly under a space. Each call creates a new list even with the same name, so retries duplicate it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `folder_id` | string | yes |  | Folder. A folder in the selected space. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | List Name. The name of the list to create. |
| `content` | string | no |  | Content. Optional description/content for the list. |

Output fields:

- `name`: List Name
- `id`: List ID
- `content`: Content
- `task_count`: Task Count (number)
- `archived`: Archived (boolean)
- `permission_level`: Permission Level
- `override_statuses`: Override Statuses (boolean)
- `inbound_address`: Inbound Email Address (email)
- `folder`: Folder
- `folder.name`: Folder Name
- `folder.id`: Folder ID
- `folder.hidden`: Hidden (boolean)
- `folder.archived`: Archived (boolean)
- `space`: Space
- `space.name`: Space Name
- `space.id`: Space ID
- `space.archived`: Archived (boolean)
- `statuses`: Statuses
- `statuses[].status`: Status
- `statuses[].id`: Status ID
- `statuses[].type`: Type
- `statuses[].color`: Color
- `statuses[].orderindex`: Order Index (number)

### `clickup_delete_list`

**Delete List.** Permanently delete a ClickUp list (and all tasks it contains) by list ID. This is destructive and cannot be undone, so confirm the ID before calling. Resolve the list ID with Get Folder Lists / Get Folderless Lists for the intended folder/space first — do not reuse a stale or copied ID, as any list the connection can access will be deleted. Deleting an already-deleted list fails rather than succeeding, so treat it as non-idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. The ID of the list to delete. |

### `clickup_get_folderless_lists`

**Get Folderless Lists.** Read-only: list the lists that sit directly under a ClickUp space (not inside any folder), returning their IDs and names. Use to discover top-level list IDs in a space; for lists inside a folder, use Get Folder Lists instead. Safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `lists`: Lists
- `lists[].id`: List ID
- `lists[].name`: Name
- `lists[].content`: Content
- `lists[].task_count`: Task Count (number)
- `lists[].archived`: Archived (boolean)

### `clickup_get_folder_lists`

**Get Folder Lists.** Read-only: list every list inside a specific ClickUp folder, returning their IDs and names. Use to discover list IDs within a folder before acting on a list; for lists that sit directly under a space, use Get Folderless Lists instead. Safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `folder_id` | string | yes |  | Folder. A folder in the selected space. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `lists`: Lists
- `lists[].id`: List ID
- `lists[].name`: Name
- `lists[].content`: Content
- `lists[].task_count`: Task Count (number)
- `lists[].archived`: Archived (boolean)

### `clickup_get_list_members`

**Get List Members.** Read-only: list the people who have access to a specific ClickUp list, returning their user IDs and names. Use to discover who can see or be assigned within a list. Safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. The ID of the list to read members for. |

Output fields:

- `members`: Members
- `members[].id`: User ID
- `members[].username`: Username
- `members[].email`: Email (email)
- `members[].color`: Color
- `members[].initials`: Initials
- `members[].profilePicture`: Profile Picture (image)

### `clickup_get_list`

**Get List.** Read-only: fetch the details of one ClickUp list (including its available statuses) by list ID. Use when you already know the list ID; to discover list IDs first, use Get Folder Lists or Get Folderless Lists. Safe to call repeatedly. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. The ID of the list to get. |

Output fields:

- `name`: List Name
- `id`: List ID
- `content`: Content
- `task_count`: Task Count (number)
- `archived`: Archived (boolean)
- `permission_level`: Permission Level
- `override_statuses`: Override Statuses (boolean)
- `inbound_address`: Inbound Email Address (email)
- `folder`: Folder
- `folder.name`: Folder Name
- `folder.id`: Folder ID
- `folder.hidden`: Hidden (boolean)
- `folder.archived`: Archived (boolean)
- `space`: Space
- `space.name`: Space Name
- `space.id`: Space ID
- `space.archived`: Archived (boolean)
- `statuses`: Statuses
- `statuses[].status`: Status
- `statuses[].id`: Status ID
- `statuses[].type`: Type
- `statuses[].color`: Color
- `statuses[].orderindex`: Order Index (number)

### `clickup_update_list`

**Update List.** Update properties of an existing ClickUp list (such as renaming it or changing its content) by list ID. Pick this to modify a list you already have the ID for; use Create List to make a new one. Only the fields you supply are changed, so repeating the same update yields the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. The ID of the list to update. |
| `name` | string | no |  | List Name. The new name for the list. |
| `content` | string | no |  | Content. The new description/content for the list. |

Output fields:

- `name`: List Name
- `id`: List ID
- `content`: Content
- `task_count`: Task Count (number)
- `archived`: Archived (boolean)
- `permission_level`: Permission Level
- `override_statuses`: Override Statuses (boolean)
- `inbound_address`: Inbound Email Address (email)
- `folder`: Folder
- `folder.name`: Folder Name
- `folder.id`: Folder ID
- `folder.hidden`: Hidden (boolean)
- `folder.archived`: Archived (boolean)
- `space`: Space
- `space.name`: Space Name
- `space.id`: Space ID
- `space.archived`: Archived (boolean)
- `statuses`: Statuses
- `statuses[].status`: Status
- `statuses[].id`: Status ID
- `statuses[].type`: Type
- `statuses[].color`: Color
- `statuses[].orderindex`: Order Index (number)

### `clickup_list_workspace_members`

**List Workspace Members.** List every member of a ClickUp workspace, returning each member ID, username, and email. Pick this to resolve a person name or email to the numeric member ID needed for assigning tasks anywhere in the workspace; use Get List Members or Get Task Members to scope the result to a single list or task. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `members`: Members
- `members[].user`: User
- `members[].user.id`: User ID
- `members[].user.username`: Username
- `members[].user.email`: Email (email)
- `members[].user.color`: Color
- `members[].user.initials`: Initials
- `members[].user.profilePicture`: Profile Picture (image)

### `clickup_create_space`

**Create Space.** Create a new space in a ClickUp workspace (team) to hold folders and lists. Pick this to add a new top-level container in a workspace; to add a folder or list within an existing space, use Create Folder or Create Folderless List. Each call creates a new space even with the same name, so retries duplicate it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Space Name. The name of the space to create. |
| `multiple_assignees` | boolean | no | `true` | Multiple Assignees. Allow tasks in this space to have multiple assignees. |

Output fields:

- `name`: Name
- `id`: Space ID
- `private`: Private (boolean)
- `color`: Color
- `admin_can_manage`: Admin Can Manage (boolean)
- `multiple_assignees`: Multiple Assignees (boolean)
- `archived`: Archived (boolean)
- `statuses`: Statuses
- `statuses[].status`: Status
- `statuses[].type`: Type
- `statuses[].id`: Status ID
- `statuses[].color`: Color
- `statuses[].orderindex`: Order Index (number)
- `features`: Features
- `features.due_dates.enabled`: Due Dates Enabled (boolean)
- `features.sprints.enabled`: Sprints Enabled (boolean)
- `features.time_tracking.enabled`: Time Tracking Enabled (boolean)
- `features.tags.enabled`: Tags Enabled (boolean)
- `features.custom_fields.enabled`: Custom Fields Enabled (boolean)
- `features.milestones.enabled`: Milestones Enabled (boolean)
- `features.priorities.enabled`: Priorities Enabled (boolean)
- `features.priorities.priorities`: Priorities
- `features.priorities.priorities[].priority`: Priority
- `features.priorities.priorities[].id`: Priority ID
- `features.priorities.priorities[].color`: Color
- `features.priorities.priorities[].orderindex`: Order Index

### `clickup_delete_space`

**Delete Space.** Permanently delete a ClickUp space along with every folder, list, and task inside it, by space ID. This has a large blast radius and cannot be undone, so confirm the ID before calling. Deleting an already-deleted space fails rather than succeeding, so treat it as non-idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |

### `clickup_get_spaces`

**Get Spaces.** Read-only: list all spaces in a ClickUp workspace (team), returning their IDs and names. Use to discover available spaces before drilling into a specific space, folder, or list. Safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `spaces`: Spaces
- `spaces[].name`: Name
- `spaces[].id`: Space ID
- `spaces[].color`: Color
- `spaces[].private`: Private (boolean)
- `spaces[].admin_can_manage`: Admin Can Manage (boolean)
- `spaces[].multiple_assignees`: Multiple Assignees (boolean)
- `spaces[].archived`: Archived (boolean)
- `spaces[].statuses`: Statuses
- `spaces[].statuses[].status`: Status
- `spaces[].statuses[].type`: Type
- `spaces[].statuses[].color`: Color
- `spaces[].statuses[].orderindex`: Order Index (number)
- `spaces[].statuses[].id`: Status ID
- `spaces[].features`: Features
- `spaces[].features.due_dates.enabled`: Due Dates Enabled (boolean)
- `spaces[].features.sprints.enabled`: Sprints Enabled (boolean)
- `spaces[].features.time_tracking.enabled`: Time Tracking Enabled (boolean)
- `spaces[].features.points.enabled`: Points Enabled (boolean)
- `spaces[].features.tags.enabled`: Tags Enabled (boolean)
- `spaces[].features.custom_fields.enabled`: Custom Fields Enabled (boolean)
- `spaces[].features.milestones.enabled`: Milestones Enabled (boolean)
- `spaces[].features.priorities.priorities`: Priorities
- `spaces[].features.priorities.priorities[].priority`: Priority
- `spaces[].features.priorities.priorities[].color`: Color
- `spaces[].features.priorities.priorities[].id`: Priority ID

### `clickup_get_space`

**Get Space.** Read-only: fetch the details of one ClickUp space by space ID. Use when you already know which space you want; to discover space IDs first, use Get Spaces. Safe to call repeatedly. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `name`: Name
- `id`: Space ID
- `private`: Private (boolean)
- `color`: Color
- `admin_can_manage`: Admin Can Manage (boolean)
- `multiple_assignees`: Multiple Assignees (boolean)
- `archived`: Archived (boolean)
- `statuses`: Statuses
- `statuses[].status`: Status
- `statuses[].type`: Type
- `statuses[].id`: Status ID
- `statuses[].color`: Color
- `statuses[].orderindex`: Order Index (number)
- `features`: Features
- `features.due_dates.enabled`: Due Dates Enabled (boolean)
- `features.sprints.enabled`: Sprints Enabled (boolean)
- `features.time_tracking.enabled`: Time Tracking Enabled (boolean)
- `features.tags.enabled`: Tags Enabled (boolean)
- `features.custom_fields.enabled`: Custom Fields Enabled (boolean)
- `features.milestones.enabled`: Milestones Enabled (boolean)
- `features.priorities.enabled`: Priorities Enabled (boolean)
- `features.priorities.priorities`: Priorities
- `features.priorities.priorities[].priority`: Priority
- `features.priorities.priorities[].id`: Priority ID
- `features.priorities.priorities[].color`: Color
- `features.priorities.priorities[].orderindex`: Order Index

### `clickup_update_space`

**Update Space.** Update properties of an existing ClickUp space (such as renaming it or toggling multiple-assignee support) by space ID. Pick this to modify a space you already have the ID for; use Create Space to make a new one. Only the fields you supply are changed, so repeating the same update yields the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Space Name. The new name for the space. |
| `multiple_assignees` | boolean | no |  | Multiple Assignees. Allow tasks in this space to have multiple assignees. |

Output fields:

- `name`: Name
- `id`: Space ID
- `private`: Private (boolean)
- `color`: Color
- `admin_can_manage`: Admin Can Manage (boolean)
- `multiple_assignees`: Multiple Assignees (boolean)
- `archived`: Archived (boolean)
- `statuses`: Statuses
- `statuses[].status`: Status
- `statuses[].type`: Type
- `statuses[].id`: Status ID
- `statuses[].color`: Color
- `statuses[].orderindex`: Order Index (number)
- `features`: Features
- `features.due_dates.enabled`: Due Dates Enabled (boolean)
- `features.sprints.enabled`: Sprints Enabled (boolean)
- `features.time_tracking.enabled`: Time Tracking Enabled (boolean)
- `features.tags.enabled`: Tags Enabled (boolean)
- `features.custom_fields.enabled`: Custom Fields Enabled (boolean)
- `features.milestones.enabled`: Milestones Enabled (boolean)
- `features.priorities.enabled`: Priorities Enabled (boolean)
- `features.priorities.priorities`: Priorities
- `features.priorities.priorities[].priority`: Priority
- `features.priorities.priorities[].id`: Priority ID
- `features.priorities.priorities[].color`: Color
- `features.priorities.priorities[].orderindex`: Order Index

### `clickup_create_space_tag`

**Create Space Tag.** Create a new tag in a ClickUp space with a name and optional foreground/background colors. Use this before Add Tag To Task when the tag does not yet exist; to rename or recolor an existing tag use Update Space Tag instead. Creating a tag whose name already exists may fail, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Tag Name. The name of the new tag. |
| `tag_fg` | string | no |  | Foreground Color. Foreground (text) color as a hex value, e.g. #FFFFFF. |
| `tag_bg` | string | no |  | Background Color. Background color as a hex value, e.g. #000000. |

### `clickup_delete_space_tag`

**Delete Space Tag.** Delete a tag from a ClickUp space by name, which also removes it from every task it was applied to in that space. To merely detach a tag from a single task without deleting it, use Remove Tag From Task instead. This is destructive across the space; confirm the name (via List Space Tags) before calling. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `tag_name` | string | yes |  | Tag. The name of the tag to delete. A value the product loads from the provider, such as an id; write the value itself. |

### `clickup_get_space_tags`

**List Space Tags.** Read-only: list every tag defined in a ClickUp space. Use this to discover valid tag names before calling Add Tag To Task, Remove Tag From Task, Update Space Tag, or Delete Space Tag. Safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `tags`: Tags
- `tags[].name`: Name
- `tags[].tag_fg`: Foreground Color
- `tags[].tag_bg`: Background Color
- `tags[].creator`: Creator ID

### `clickup_update_space_tag`

**Update Space Tag.** Rename or recolor an existing ClickUp space tag, identified by its current name. Use List Space Tags to find the current name; to add a brand-new tag use Create Space Tag instead. This sets the tag to the supplied end state, so repeating the same update is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `tag_name` | string | yes |  | Tag. The current name of the tag to update. A value the product loads from the provider, such as an id; write the value itself. |
| `new_name` | string | yes |  | New Name. The new name for the tag. |
| `tag_fg` | string | no |  | Foreground Color. Foreground (text) color as a hex value, e.g. #FFFFFF. |
| `tag_bg` | string | no |  | Background Color. Background color as a hex value, e.g. #000000. |

Output fields:

- `tag`: Tag
- `tag.name`: Name
- `tag.fg_color`: Foreground Color
- `tag.bg_color`: Background Color

### `clickup_add_tag_to_task`

**Add Tag To Task.** Add an existing space-level tag to a ClickUp task by tag name. The tag must already exist in the space (list them with Get Space Tags or create one with Create Space Tag); this does not create new tags. Use Remove Tag From Task to take a tag off. Re-adding a tag the task already has is a no-op, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes | `null` | Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `tag_name` | string | yes |  | Tag. The name of the space tag to add. A value the product loads from the provider, such as an id; write the value itself. |

### `clickup_add_task_dependency`

**Add Task Dependency.** Create a dependency relationship for a ClickUp task. Provide exactly one of "Depends On" (the task that must finish first / blocks this task) or "Blocks" (the task that this task blocks). For a non-blocking association between tasks use Link Tasks instead; to remove a dependency use Delete Task Dependency. Each call creates a new dependency, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The task that the dependency is set on. |
| `depends_on` | string | no |  | Depends On. The ID of the task that must be done first (it blocks this task). Provide exactly one of Depends On or Blocks. |
| `dependency_of` | string | no |  | Blocks. The ID of the task that this task blocks. Provide exactly one of Depends On or Blocks. |

### `clickup_create_task`

**Create Task.** Create a new top-level task in a ClickUp list, with optional status, priority, assignees, description, dates, time estimate, and custom fields. Pick this for a standalone task; for setting only the status of an existing task use Set Task Status, and to modify other fields of an existing task use Update Task. Each call creates a new task, so retries duplicate it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. The name of task. |
| `status_id` | string | no |  | Status. Statuses come from the selected list. A value the product loads from the provider, such as an id; write the value itself. |
| `priority_id` | string | no | `null` | Priority. How urgent the task is. One of `1`, `2`, `3`, `4`. |
| `assignee_id` | array | no |  | Assignee Id. ID of assignee for Clickup Task. Values the product loads from the provider, such as ids; write an array of them. |
| `description` | string | no |  | Description. The description of task. |
| `is_markdown` | boolean | no | `false` | Is Markdown. Is the description in markdown format. |
| `due_date` | ISO date-time string | no |  | Due Date. The due date of the task. |
| `due_date_time` | boolean | no | `false` | Due Date Time. Whether to include time in the due date. |
| `start_date` | ISO date-time string | no |  | Start Date. The start date of the task. |
| `start_date_time` | boolean | no | `false` | Start Date Time. Whether to include time in the start date. |
| `time_estimate` | number | no |  | Time Estimate. The time estimate for the task in milliseconds. |
| `check_required_custom_fields` | boolean | no | `false` | Check Required Custom Fields. Re-enable required custom fields validation for the task. |
| `custom_fields` | object | yes |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `name`: Task Name
- `id`: Task ID
- `description`: Description
- `status`: Status
- `status.status`: Status
- `status.type`: Type
- `status.color`: Color
- `url`: URL (url)
- `date_created`: Date Created (datetime)
- `date_updated`: Date Updated (datetime)
- `due_date`: Due Date (datetime)
- `start_date`: Start Date (datetime)
- `priority`: Priority
- `time_spent`: Time Spent (duration)
- `archived`: Archived (boolean)
- `creator`: Creator
- `creator.username`: Username
- `creator.email`: Email (email)
- `creator.id`: User ID
- `watchers`: Watchers
- `watchers[].username`: Username
- `watchers[].email`: Email (email)
- `watchers[].id`: User ID
- `list`: List
- `list.name`: Name
- `list.id`: List ID
- `folder`: Folder
- `folder.name`: Name
- `folder.id`: Folder ID
- `space`: Space
- `space.id`: Space ID
- `team_id`: Team ID

### `clickup_delete_task_dependency`

**Delete Task Dependency.** Remove a dependency relationship from a ClickUp task. Provide exactly one of "Depends On" or "Blocks" matching the dependency to remove (the same way it was created with Add Task Dependency). Removing a dependency that no longer exists is a no-op, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The task the dependency is set on. |
| `depends_on` | string | no |  | Depends On. The ID of the task this task depended on. Provide exactly one of Depends On or Blocks. |
| `dependency_of` | string | no |  | Blocks. The ID of the task this task blocked. Provide exactly one of Depends On or Blocks. |

### `clickup_delete_task`

**Delete Task.** Permanently delete a ClickUp task identified by its task ID. Pick this to remove a task entirely; to move it to another list instead use Move Task To List. This is destructive and cannot be undone, and deleting an already-deleted task errors, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes | `null` | Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |

### `clickup_get_bulk_tasks_time_in_status`

**Get Bulk Tasks Time In Status.** Retrieve the status dwell times for several ClickUp tasks in one call, given a list of task IDs. Pick this for multiple tasks; for a single task use Get Task Time In Status. Provide up to about 100 task IDs per call. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_ids` | array | yes |  | Task IDs. The task IDs to read status dwell times for (up to ~100). |

Output fields:

- `current_status`: Current Status
- `current_status.status`: Status
- `current_status.color`: Color
- `current_status.total_time`: Total Time
- `current_status.total_time.by_minute`: Minutes (number)
- `current_status.total_time.since`: Since
- `status_history`: Status History
- `status_history[].status`: Status
- `status_history[].color`: Color
- `status_history[].type`: Type
- `status_history[].total_time`: Total Time
- `status_history[].total_time.by_minute`: Minutes (number)
- `status_history[].total_time.since`: Since
- `status_history[].orderindex`: Order Index (number)

### `clickup_get_task_members`

**Get Task Members.** List the people who have access to a ClickUp task, identified by its task ID. Use this to discover member IDs (e.g. before assigning) or to check who can see a task. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The ID of the task to list members for. |

Output fields:

- `members`: Members
- `members[].id`: User ID
- `members[].username`: Username
- `members[].email`: Email (email)
- `members[].color`: Color
- `members[].initials`: Initials
- `members[].profilePicture`: Profile Picture (image)

### `clickup_get_task`

**Get Task.** Retrieve a single ClickUp task by its task ID, optionally including its subtasks. Pick this when you already know the task ID; to find a task without an ID use List Tasks or List List Tasks. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The ID of the task to get. |
| `include_subtasks` | boolean | no | `false` | Include Subtasks. Include subtasks in the response. |

Output fields:

- `name`: Task Name
- `id`: Task ID
- `description`: Description
- `status`: Status
- `status.status`: Status
- `status.type`: Type
- `status.color`: Color
- `url`: URL (url)
- `date_created`: Date Created (datetime)
- `date_updated`: Date Updated (datetime)
- `due_date`: Due Date (datetime)
- `start_date`: Start Date (datetime)
- `priority`: Priority
- `time_spent`: Time Spent (duration)
- `archived`: Archived (boolean)
- `creator`: Creator
- `creator.username`: Username
- `creator.email`: Email (email)
- `creator.id`: User ID
- `watchers`: Watchers
- `watchers[].username`: Username
- `watchers[].email`: Email (email)
- `watchers[].id`: User ID
- `list`: List
- `list.name`: Name
- `list.id`: List ID
- `folder`: Folder
- `folder.name`: Name
- `folder.id`: Folder ID
- `space`: Space
- `space.id`: Space ID
- `team_id`: Team ID

### `clickup_link_tasks`

**Link Tasks.** Create a non-dependency link between two ClickUp tasks (a simple association, not a blocking relationship). For a blocking/depends-on relationship use Add Task Dependency instead; to remove a link use Unlink Tasks. Re-linking already-linked tasks is a no-op, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The ID of the first task. |
| `links_to` | string | yes |  | Links To Task ID. The ID of the task to link to. |

Output fields:

- `task`: Task
- `task.name`: Task Name
- `task.id`: Task ID
- `task.description`: Description
- `task.status`: Status
- `task.status.status`: Status
- `task.status.type`: Type
- `task.status.color`: Color
- `task.url`: URL (url)
- `task.date_created`: Date Created (datetime)
- `task.date_updated`: Date Updated (datetime)
- `task.due_date`: Due Date (datetime)
- `task.start_date`: Start Date (datetime)
- `task.priority`: Priority
- `task.time_spent`: Time Spent (duration)
- `task.archived`: Archived (boolean)
- `task.creator`: Creator
- `task.creator.username`: Username
- `task.creator.email`: Email (email)
- `task.creator.id`: User ID
- `task.watchers`: Watchers
- `task.watchers[].username`: Username
- `task.watchers[].email`: Email (email)
- `task.watchers[].id`: User ID
- `task.list`: List
- `task.list.name`: Name
- `task.list.id`: List ID
- `task.folder`: Folder
- `task.folder.name`: Name
- `task.folder.id`: Folder ID
- `task.space`: Space
- `task.space.id`: Space ID
- `task.team_id`: Team ID

### `clickup_list_list_tasks`

**List List Tasks.** List the tasks of one specific ClickUp list (resolve the list ID via Get List or the List dropdown), with paging and ordering. Pick this when you know the target list and want only its tasks; to search tasks across the whole workspace use List Tasks. Read-only and idempotent; results are paginated (page starts at 0). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `page` | number | no | `0` | Page. Page to fetch (starts at 0). |
| `reverse` | boolean | no | `false` | Reverse. Tasks are displayed in reverse order. |
| `include_closed` | boolean | no | `false` | Include Closed. Include or exclude closed tasks. By default, they are excluded. |
| `subtasks` | boolean | no | `false` | Include Subtasks. Include subtasks in the response. |
| `order_by` | string | no |  | Order By. Order by a particular field. By default, tasks are ordered by created. One of `"id"`, `"created"`, `"updated"`, `"due_date"`. |

Output fields:

- `tasks`: Tasks
- `tasks[].name`: Name
- `tasks[].id`: Task ID
- `tasks[].status.status`: Status
- `tasks[].url`: URL (url)
- `tasks[].description`: Description
- `tasks[].priority.priority`: Priority
- `tasks[].due_date`: Due Date (date)
- `tasks[].start_date`: Start Date (date)
- `tasks[].date_created`: Date Created (date)
- `tasks[].date_updated`: Date Updated (date)
- `tasks[].archived`: Archived (boolean)
- `tasks[].creator`: Creator
- `tasks[].creator.username`: Username
- `tasks[].creator.email`: Email (email)
- `tasks[].creator.id`: User ID
- `tasks[].assignees`: Assignees
- `tasks[].assignees[].username`: Username
- `tasks[].assignees[].email`: Email (email)
- `tasks[].assignees[].id`: User ID
- `tasks[].list`: List
- `tasks[].list.name`: List Name
- `tasks[].list.id`: List ID
- `tasks[].folder`: Folder
- `tasks[].folder.name`: Folder Name
- `tasks[].folder.id`: Folder ID
- `tasks[].space.id`: Space ID
- `tasks[].team_id`: Team ID
- `last_page`: Last Page (boolean)

### `clickup_list_tasks`

**List Tasks.** List tasks across an entire ClickUp workspace, filtered by space, folder, list, assignees, and tags, with paging and ordering. Pick this to search or browse tasks broadly across the workspace when you do not know a task ID; to list only the tasks of one specific list use List List Tasks, and for a known ID use Get Task. Read-only and idempotent; results are paginated (page starts at 0). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | array | no |  | Space. A space in the selected workspace. Values the product loads from the provider, such as ids; write an array of them. |
| `folder_id` | array | no |  | Folder. A folder in the selected space. Values the product loads from the provider, such as ids; write an array of them. |
| `list_id` | array | no |  | List. Lists from every folder in the space are shown. Values the product loads from the provider, such as ids; write an array of them. |
| `assignees` | array | no |  | Assignee Id. ID of assignee for Clickup Task. Values the product loads from the provider, such as ids; write an array of them. |
| `tags` | array | no |  | Tags. The tags to filter for. Values the product loads from the provider, such as ids; write an array of them. |
| `page` | number | no | `0` | Page. Page to fetch (starts at 0). |
| `reverse` | boolean | no | `false` | Reverse. Tasks are displayed in reverse order. |
| `include_closed` | boolean | no | `false` | Include Closed. Include or exclude closed tasks. By default, they are excluded. |
| `order_by` | string | no |  | Order By. Order by a particular field. By default, tasks are ordered by created. One of `"id"`, `"created"`, `"updated"`, `"due_date"`. |

Output fields:

- `tasks`: Tasks
- `tasks[].name`: Name
- `tasks[].id`: Task ID
- `tasks[].status.status`: Status
- `tasks[].url`: URL (url)
- `tasks[].description`: Description
- `tasks[].priority.priority`: Priority
- `tasks[].due_date`: Due Date (date)
- `tasks[].start_date`: Start Date (date)
- `tasks[].date_created`: Date Created (date)
- `tasks[].date_updated`: Date Updated (date)
- `tasks[].archived`: Archived (boolean)
- `tasks[].creator`: Creator
- `tasks[].creator.username`: Username
- `tasks[].creator.email`: Email (email)
- `tasks[].creator.id`: User ID
- `tasks[].assignees`: Assignees
- `tasks[].assignees[].username`: Username
- `tasks[].assignees[].email`: Email (email)
- `tasks[].assignees[].id`: User ID
- `tasks[].list`: List
- `tasks[].list.name`: List Name
- `tasks[].list.id`: List ID
- `tasks[].folder`: Folder
- `tasks[].folder.name`: Folder Name
- `tasks[].folder.id`: Folder ID
- `tasks[].space.id`: Space ID
- `tasks[].team_id`: Team ID
- `last_page`: Last Page (boolean)

### `clickup_move_task_to_list`

**Move Task To List.** Re-home a ClickUp task by moving it to a different list, changing the task's home (primary) list. Pick this to relocate a task; to instead make a task appear in an extra list without changing its home use Add Task To List, and to remove a task entirely use Delete Task. Provide the destination list ID (resolve via Get List). Moving a task to its current home list is a no-op, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes | `null` | Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `destination_list_id` | string | yes |  | Destination List ID. The ID of the list to move the task into (its new home list). Resolve via Get List. |

Output fields:

- `data`: Move Result
- `data.task_id`: Task ID
- `data.new_list_id`: New List ID

### `clickup_remove_tag_from_task`

**Remove Tag From Task.** Remove a tag from a ClickUp task by tag name. This only detaches the tag from this task; the tag itself remains in the space. Use Add Tag To Task to attach one. Removing a tag the task does not have is a no-op, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes | `null` | Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `tag_name` | string | yes |  | Tag. The name of the space tag to remove. A value the product loads from the provider, such as an id; write the value itself. |

### `clickup_remove_task_from_list`

**Remove Task From List.** Remove a ClickUp task from an additional (non-home) list. This requires the "Tasks in Multiple Lists" ClickApp to be enabled. It only detaches the task from an extra list — it does not delete the task or change its home list (use Delete Task or Move Task To List for those). Removing it from a list it is not in is a no-op, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task ID. The ID of the task to remove from the list. |

### `clickup_set_task_status`

**Set Task Status.** Change only the status of an existing ClickUp task (e.g. to In Progress or Complete). Pick this for the common "move the task to status X" intent; use Update Task to change other fields too. The status must be a valid label for the task list (select it from the Status dropdown, which lists the list-specific statuses) — a free-text or unknown status is rejected. Setting a status it already has is a no-op, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes | `null` | Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `status_id` | string | yes |  | Status. Statuses come from the selected list. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `name`: Task Name
- `id`: Task ID
- `description`: Description
- `status`: Status
- `status.status`: Status
- `status.type`: Type
- `status.color`: Color
- `url`: URL (url)
- `date_created`: Date Created (datetime)
- `date_updated`: Date Updated (datetime)
- `due_date`: Due Date (datetime)
- `start_date`: Start Date (datetime)
- `priority`: Priority
- `time_spent`: Time Spent (duration)
- `archived`: Archived (boolean)
- `creator`: Creator
- `creator.username`: Username
- `creator.email`: Email (email)
- `creator.id`: User ID
- `watchers`: Watchers
- `watchers[].username`: Username
- `watchers[].email`: Email (email)
- `watchers[].id`: User ID
- `list`: List
- `list.name`: Name
- `list.id`: List ID
- `folder`: Folder
- `folder.name`: Name
- `folder.id`: Folder ID
- `space`: Space
- `space.id`: Space ID
- `team_id`: Team ID

### `clickup_unlink_tasks`

**Unlink Tasks.** Remove a non-dependency link between two ClickUp tasks. Use Link Tasks to create one. Removing a link that does not exist is a no-op, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. The ID of the first task. |
| `links_to` | string | yes |  | Linked Task ID. The ID of the task to unlink from. |

Output fields:

- `task`: Task
- `task.name`: Task Name
- `task.id`: Task ID
- `task.description`: Description
- `task.status`: Status
- `task.status.status`: Status
- `task.status.type`: Type
- `task.status.color`: Color
- `task.url`: URL (url)
- `task.date_created`: Date Created (datetime)
- `task.date_updated`: Date Updated (datetime)
- `task.due_date`: Due Date (datetime)
- `task.start_date`: Start Date (datetime)
- `task.priority`: Priority
- `task.time_spent`: Time Spent (duration)
- `task.archived`: Archived (boolean)
- `task.creator`: Creator
- `task.creator.username`: Username
- `task.creator.email`: Email (email)
- `task.creator.id`: User ID
- `task.watchers`: Watchers
- `task.watchers[].username`: Username
- `task.watchers[].email`: Email (email)
- `task.watchers[].id`: User ID
- `task.list`: List
- `task.list.name`: Name
- `task.list.id`: List ID
- `task.folder`: Folder
- `task.folder.name`: Name
- `task.folder.id`: Folder ID
- `task.space`: Space
- `task.space.id`: Space ID
- `task.team_id`: Team ID

### `clickup_update_task`

**Update Task.** Modify fields of an existing ClickUp task identified by its task ID, including name, description, status, priority, and adding or removing assignees. Pick this to change multiple fields of a task you already have the ID for; for only the status use Set Task Status, and to create a new task use Create Task. Only the fields you supply are changed, so repeating the same update yields the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `space_id` | string | yes |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes | `null` | Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Task Name. The name of the task to update. |
| `description` | string | no |  | Task Description. The description of the task to update. |
| `status_id` | string | no |  | Status. Statuses come from the selected list. A value the product loads from the provider, such as an id; write the value itself. |
| `priority_id` | string | no | `null` | Priority. How urgent the task is. One of `1`, `2`, `3`, `4`. |
| `add_assignee` | array | no |  | Add Assignees. assignee(s) you want to add for the task. Values the product loads from the provider, such as ids; write an array of them. |
| `rem_assignee` | array | no |  | Remove Assignees. assignee(s) you want to remove from the task. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `name`: Task Name
- `id`: Task ID
- `description`: Description
- `status`: Status
- `status.status`: Status
- `status.type`: Type
- `status.color`: Color
- `url`: URL (url)
- `date_created`: Date Created (datetime)
- `date_updated`: Date Updated (datetime)
- `due_date`: Due Date (datetime)
- `start_date`: Start Date (datetime)
- `priority`: Priority
- `time_spent`: Time Spent (duration)
- `archived`: Archived (boolean)
- `creator`: Creator
- `creator.username`: Username
- `creator.email`: Email (email)
- `creator.id`: User ID
- `watchers`: Watchers
- `watchers[].username`: Username
- `watchers[].email`: Email (email)
- `watchers[].id`: User ID
- `list`: List
- `list.name`: Name
- `list.id`: List ID
- `folder`: Folder
- `folder.name`: Name
- `folder.id`: Folder ID
- `space`: Space
- `space.id`: Space ID
- `team_id`: Team ID

### `clickup_create_time_entry`

**Create Time Entry.** Log a completed (historical) block of tracked time in a ClickUp workspace, given a start time and a duration in milliseconds. Pick this to record time already spent; use Start Time Entry / Stop Time Entry instead to run a live timer. Each call creates a new entry, so retries duplicate (not idempotent). Optionally attach it to a task via its task ID. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `start` | ISO date-time string | yes |  | Start. When the tracked block started. |
| `duration` | number | yes |  | Duration (ms). Length of the time entry in milliseconds (e.g. 3600000 for one hour). |
| `description` | string | no |  | Description. Optional note describing the time entry. |
| `space_id` | string | no |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | no |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | no | `null` | Task to attach the time entry to. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `billable` | boolean | no | `false` | Billable. Mark the time entry as billable. |

Output fields:

- `data`: Time Entry
- `data.id`: Time Entry ID
- `data.task`: Task
- `data.task.id`: Task ID
- `data.task.name`: Task Name
- `data.wid`: Workspace ID
- `data.user`: User
- `data.user.id`: User ID
- `data.user.username`: Username
- `data.user.email`: Email (email)
- `data.user.color`: Color
- `data.user.initials`: Initials
- `data.user.profilePicture`: Profile Picture (image)
- `data.billable`: Billable (boolean)
- `data.start`: Start (datetime)
- `data.end`: End (datetime)
- `data.duration`: Duration (duration)
- `data.description`: Description
- `data.at`: Last Updated At (datetime)

### `clickup_delete_time_entry`

**Delete Time Entry.** Permanently delete a tracked time entry by its time entry ID within a workspace. This is destructive and cannot be undone; a repeated call on an already-deleted entry errors (not idempotent). Use List Time Entries to confirm the entry ID before deleting. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `timer_id` | string | yes |  | Time Entry ID. The ID of the time entry to delete. Obtain it from List Time Entries. |

Output fields:

- `data`: Time Entries
- `data[].id`: Time Entry ID
- `data[].task`: Task
- `data[].task.id`: Task ID
- `data[].task.name`: Task Name
- `data[].wid`: Workspace ID
- `data[].user`: User
- `data[].user.id`: User ID
- `data[].user.username`: Username
- `data[].user.email`: Email (email)
- `data[].user.color`: Color
- `data[].user.initials`: Initials
- `data[].user.profilePicture`: Profile Picture (image)
- `data[].billable`: Billable (boolean)
- `data[].start`: Start (datetime)
- `data[].end`: End (datetime)
- `data[].duration`: Duration (duration)
- `data[].description`: Description
- `data[].at`: Last Updated At (datetime)

### `clickup_get_running_time_entry`

**Get Running Time Entry.** Retrieve the time entry whose timer is currently running for the authenticated user in a workspace. Pick this to check whether a timer is active before calling Stop Time Entry; use Get Time Entry for a specific completed entry by ID. Read-only and idempotent; returns empty when no timer is running. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `data`: Time Entry
- `data.id`: Time Entry ID
- `data.task`: Task
- `data.task.id`: Task ID
- `data.task.name`: Task Name
- `data.wid`: Workspace ID
- `data.user`: User
- `data.user.id`: User ID
- `data.user.username`: Username
- `data.user.email`: Email (email)
- `data.user.color`: Color
- `data.user.initials`: Initials
- `data.user.profilePicture`: Profile Picture (image)
- `data.billable`: Billable (boolean)
- `data.start`: Start (datetime)
- `data.end`: End (datetime)
- `data.duration`: Duration (duration)
- `data.description`: Description
- `data.at`: Last Updated At (datetime)

### `clickup_get_time_entry`

**Get Time Entry.** Retrieve one tracked time entry by its time entry (timer) ID within a workspace. Pick this when you already know the entry ID; use List Time Entries to find entries by date or scope, or Get Running Time Entry for the timer currently in progress. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `timer_id` | string | yes |  | Time Entry ID. The ID of the time entry to retrieve. Obtain it from List Time Entries. |

Output fields:

- `data`: Time Entry
- `data.id`: Time Entry ID
- `data.task`: Task
- `data.task.id`: Task ID
- `data.task.name`: Task Name
- `data.wid`: Workspace ID
- `data.user`: User
- `data.user.id`: User ID
- `data.user.username`: Username
- `data.user.email`: Email (email)
- `data.user.color`: Color
- `data.user.initials`: Initials
- `data.user.profilePicture`: Profile Picture (image)
- `data.billable`: Billable (boolean)
- `data.start`: Start (datetime)
- `data.end`: End (datetime)
- `data.duration`: Duration (duration)
- `data.description`: Description
- `data.at`: Last Updated At (datetime)

### `clickup_list_time_entries`

**List Time Entries.** List tracked time entries across a ClickUp workspace, optionally narrowed by date range, assignee, and a single scope (task, list, folder, or space). Pick this to report on or audit logged time over a period; use Get Time Entry for one known entry ID or Get Running Time Entry for the timer in progress. Read-only and idempotent; scope filters are mutually exclusive (task takes precedence over list, folder, then space). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `start_date` | ISO date-time string | no |  | Start date. |
| `end_date` | ISO date-time string | no |  | End date. |
| `space_id` | string | no |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `folder_id` | string | no |  | Folder. A folder in the selected space. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | no |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | no | `null` | Task. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `assignee` | array | no |  | Assignee Id. ID of assignee for Clickup Task. Values the product loads from the provider, such as ids; write an array of them. |
| `include_task_tags` | boolean | no | `false` | Include task tags. Include task tags in the response for time entries associated with tasks. |
| `include_location_names` | boolean | no | `false` | Include location names. Include the names of the List, Folder, and Space along with the list_id, folder_id, and space_id. |

Output fields:

- `data`: Time Entries
- `data[].id`: Time Entry ID
- `data[].task`: Task
- `data[].task.id`: Task ID
- `data[].task.name`: Task Name
- `data[].wid`: Workspace ID
- `data[].user`: User
- `data[].user.id`: User ID
- `data[].user.username`: Username
- `data[].user.email`: Email (email)
- `data[].user.color`: Color
- `data[].user.initials`: Initials
- `data[].user.profilePicture`: Profile Picture (image)
- `data[].billable`: Billable (boolean)
- `data[].start`: Start (datetime)
- `data[].end`: End (datetime)
- `data[].duration`: Duration (duration)
- `data[].description`: Description
- `data[].at`: Last Updated At (datetime)

### `clickup_start_time_entry`

**Start Time Entry.** Start a live running timer in a ClickUp workspace, optionally attached to a task. Pick this to begin tracking time now and later call Stop Time Entry; use Create Time Entry instead to log a completed block with a known duration. Starting a timer is stateful and fails if one is already running, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. Optional note for the running timer. |
| `space_id` | string | no |  | Space. A space in the selected workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | no |  | List. Lists from every folder in the space are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | no | `null` | Task to track time against. Open tasks in the selected list, up to the first 1,000. A value the product loads from the provider, such as an id; write the value itself. |
| `billable` | boolean | no | `false` | Billable. Mark the tracked time as billable. |

Output fields:

- `data`: Time Entry
- `data.id`: Time Entry ID
- `data.task`: Task
- `data.task.id`: Task ID
- `data.task.name`: Task Name
- `data.wid`: Workspace ID
- `data.user`: User
- `data.user.id`: User ID
- `data.user.username`: Username
- `data.user.email`: Email (email)
- `data.user.color`: Color
- `data.user.initials`: Initials
- `data.user.profilePicture`: Profile Picture (image)
- `data.billable`: Billable (boolean)
- `data.start`: Start (datetime)
- `data.end`: End (datetime)
- `data.duration`: Duration (duration)
- `data.description`: Description
- `data.at`: Last Updated At (datetime)

### `clickup_stop_time_entry`

**Stop Time Entry.** Stop the timer that is currently running for the authenticated user in a workspace, finalizing it into a completed time entry. Pick this to end a timer previously begun with Start Time Entry; call Get Running Time Entry first to confirm a timer is active, since stopping when none is running errors (not idempotent). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `data`: Time Entry
- `data.id`: Time Entry ID
- `data.task`: Task
- `data.task.id`: Task ID
- `data.task.name`: Task Name
- `data.wid`: Workspace ID
- `data.user`: User
- `data.user.id`: User ID
- `data.user.username`: Username
- `data.user.email`: Email (email)
- `data.user.color`: Color
- `data.user.initials`: Initials
- `data.user.profilePicture`: Profile Picture (image)
- `data.billable`: Billable (boolean)
- `data.start`: Start (datetime)
- `data.end`: End (datetime)
- `data.duration`: Duration (duration)
- `data.description`: Description
- `data.at`: Last Updated At (datetime)

### `clickup_update_time_entry`

**Update Time Entry.** Update fields on an existing tracked time entry (description, start, duration, billable flag) by its time entry ID. This sets the entry to the supplied values, so repeating with the same values leaves it unchanged (idempotent). Use Get Time Entry or List Time Entries first to obtain the entry ID. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The ClickUp workspace to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `timer_id` | string | yes |  | Time Entry ID. The ID of the time entry to update. Obtain it from List Time Entries. |
| `description` | string | no |  | Description. New note for the time entry. |
| `start` | ISO date-time string | no |  | Start. New start time for the entry. |
| `duration` | number | no |  | Duration (ms). New length of the entry in milliseconds. |
| `billable` | boolean | no |  | Billable. Whether the time entry is billable. |

Output fields:

- `data`: Time Entry
- `data.id`: Time Entry ID
- `data.task`: Task
- `data.task.id`: Task ID
- `data.task.name`: Task Name
- `data.wid`: Workspace ID
- `data.user`: User
- `data.user.id`: User ID
- `data.user.username`: Username
- `data.user.email`: Email (email)
- `data.user.color`: Color
- `data.user.initials`: Initials
- `data.user.profilePicture`: Profile Picture (image)
- `data.billable`: Billable (boolean)
- `data.start`: Start (datetime)
- `data.end`: End (datetime)
- `data.duration`: Duration (duration)
- `data.description`: Description
- `data.at`: Last Updated At (datetime)

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

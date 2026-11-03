# Microsoft To Do

Cloud based task management application.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-todo'
  version: '0.5.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> If you’d like to use your own custom Azure app instead of the default app, follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application),
> set the **Redirect URI** to {{redirectUrl}} and add the following **Microsoft Graph (Delegated) permissions** under **API permissions**:
> - User.Read
> - Tasks.ReadWrite
> - offline_access

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cloud` | string | yes | `"login.microsoftonline.com"` | Cloud Environment. Select your Microsoft cloud environment. One of `"login.microsoftonline.com"`, `"login.microsoftonline.us"`. |

## Actions

### `create_task`

**Create Task.** Create a new to-do task inside a specific Microsoft To Do task list, optionally setting title, body/notes, importance, status, due/reminder/start dates, and categories. Use to add an item to a user's list; requires a target task list id (resolve via the list-tasks/find actions if you only have a name). Not idempotent — each call appends a new task even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_list_id` | string | yes |  | Task List. The task list to create the task in. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The title of the task. |
| `body_content` | string | no |  | Body Content. The body or notes for the task. |
| `importance` | string | no |  | Importance. The importance of the task. One of `"low"`, `"normal"`, `"high"`. |
| `status` | string | no | `"notStarted"` | Status. The status of the task. One of `"notStarted"`, `"inProgress"`, `"completed"`, `"waitingOnOthers"`, `"deferred"`. |
| `due_date_time` | ISO date-time string | no |  | Due Date. |
| `reminder_date_time` | ISO date-time string | no |  | Reminder Date. |
| `start_date_time` | ISO date-time string | no |  | Start Date. The date and time the task is scheduled to start. |
| `categories` | string | no |  | Categories. Comma-separated categories for the task (e.g., Work, Personal). |

Output fields:

- `id`: Task ID
- `title`: Title
- `status`: Status
- `importance`: Importance
- `isReminderOn`: Reminder On (boolean)
- `categories`: Categories
- `hasAttachments`: Has Attachments (boolean)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `body`: Body
- `body.content`: Content
- `body.contentType`: Content Type
- `dueDateTime`: Due Date
- `dueDateTime.dateTime`: Date (datetime)
- `dueDateTime.timeZone`: Time Zone

### `create_task_list`

**Create Task List.** Create a new Microsoft To Do task list (a named container for tasks) for the authenticated user. Use when a task needs to live in a list that does not yet exist. Not idempotent — repeating the call creates another list with the same name rather than reusing the existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `displayName` | string | yes |  | Title. The name for the new task list. |

Output fields:

- `id`: List ID
- `displayName`: Name
- `isOwner`: Owner (boolean)
- `isShared`: Shared (boolean)
- `wellknownListName`: Well-Known List Name

### `list_tasks`

**List Tasks.** List the tasks in a given Microsoft To Do task list, paging through all results. Optionally narrow by a title substring and/or a status filter (not started, in progress, completed, waiting on others, deferred); with no filters it returns every task in the list. Use to enumerate or browse a list's contents. Read-only and idempotent. Requires a task list id. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_list_id` | string | yes |  | Task List. The task list to get tasks from. A value the product loads from the provider, such as an id; write the value itself. |
| `search` | string | no |  | Search. Search for tasks by title. |
| `status` | string | no |  | Status. Filter tasks by status. One of `"notStarted"`, `"inProgress"`, `"completed"`, `"waitingOnOthers"`, `"deferred"`. |

Output fields:

- `[].id`: Task ID
- `[].title`: Title
- `[].status`: Status
- `[].importance`: Importance
- `[].isReminderOn`: Reminder On (boolean)
- `[].categories`: Categories
- `[].hasAttachments`: Has Attachments (boolean)
- `[].createdDateTime`: Created At (datetime)
- `[].lastModifiedDateTime`: Last Modified At (datetime)
- `[].body`: Body
- `[].body.content`: Content
- `[].body.contentType`: Content Type
- `[].dueDateTime`: Due Date
- `[].dueDateTime.dateTime`: Date (datetime)
- `[].dueDateTime.timeZone`: Time Zone

### `list_task_lists`

**List Task Lists.** List all of the authenticated user's Microsoft To Do task lists, paging through all results. Use to discover available lists or to resolve a list id before creating, reading, or filtering tasks. Takes no input. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: List ID
- `[].displayName`: Name
- `[].isOwner`: Owner (boolean)
- `[].isShared`: Shared (boolean)
- `[].wellknownListName`: Well-Known List Name

### `update_task`

**Update Task.** Update fields of an existing Microsoft To Do task identified by its task list id and task id — title, body/notes, importance, status, due/reminder/start dates, or categories. Use to edit an already-created task; resolve the task id first via list/find actions. Idempotent in effect: re-sending the same field values converges the task to that state without additional side effects. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_list_id` | string | yes |  | Task List. The task list containing the task to update. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task. The task to update. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. The title of the task. |
| `body_content` | string | no |  | Body Content. The body or notes for the task. |
| `importance` | string | no |  | Importance. The importance of the task. One of `"low"`, `"normal"`, `"high"`. |
| `status` | string | no |  | Status. The status of the task. One of `"notStarted"`, `"inProgress"`, `"completed"`, `"waitingOnOthers"`, `"deferred"`. |
| `due_date_time` | ISO date-time string | no |  | Due Date. |
| `reminder_date_time` | ISO date-time string | no |  | Reminder Date. |
| `start_date_time` | ISO date-time string | no |  | Start Date. The date and time the task is scheduled to start. |
| `categories` | string | no |  | Categories. Comma-separated categories for the task (e.g., Work, Personal). |

Output fields:

- `id`: Task ID
- `title`: Title
- `status`: Status
- `importance`: Importance
- `isReminderOn`: Reminder On (boolean)
- `categories`: Categories
- `hasAttachments`: Has Attachments (boolean)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `body`: Body
- `body.content`: Content
- `body.contentType`: Content Type
- `dueDateTime`: Due Date
- `dueDateTime.dateTime`: Date (datetime)
- `dueDateTime.timeZone`: Time Zone

### `update_task_list`

**Update Task List.** Rename an existing Microsoft To Do task list, identified by its task list id, to a new display name. Use to change a list's title. Idempotent: re-sending the same name leaves the list in the same state. The new name is required and cannot be empty. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_list_id` | string | yes |  | Task List. The task list to update. A value the product loads from the provider, such as an id; write the value itself. |
| `displayName` | string | yes |  | New Name. The new name for the task list. |

Output fields:

- `id`: List ID
- `displayName`: Name
- `isOwner`: Owner (boolean)
- `isShared`: Shared (boolean)
- `wellknownListName`: Well-Known List Name

### `complete_task`

**Complete Task.** Mark a specific Microsoft To Do task as completed, setting its status to completed and stamping a completion time. Use when a task should be closed out; identify it by task list id and task id (resolve via list/find actions). Idempotent in effect — completing an already-completed task leaves it completed, though it refreshes the completion timestamp. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_list_id` | string | yes |  | Task List. The task list containing the task you want to complete. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task. The specific task to mark as complete. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Task ID
- `title`: Title
- `status`: Status
- `importance`: Importance
- `isReminderOn`: Reminder On (boolean)
- `categories`: Categories
- `hasAttachments`: Has Attachments (boolean)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `body`: Body
- `body.content`: Content
- `body.contentType`: Content Type
- `dueDateTime`: Due Date
- `dueDateTime.dateTime`: Date (datetime)
- `dueDateTime.timeZone`: Time Zone
- `completedDateTime`: Completed At
- `completedDateTime.dateTime`: Date (datetime)
- `completedDateTime.timeZone`: Time Zone

### `delete_task`

**Delete Task.** Permanently delete a specific Microsoft To Do task identified by its task list id and task id. Use to remove a task; resolve the task id first via list/find actions. Idempotent on the end state (the task ends up gone), but destructive and irreversible — a repeat call on an already-deleted task will error. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_list_id` | string | yes |  | Task List. The list containing the task you want to delete. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task. The specific task to delete. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `message`: Message

### `add_attachment`

**Add an Attachment.** Upload a file as an attachment onto a specific Microsoft To Do task, identified by task list id and task id. Handles both small files (inline upload) and larger ones (chunked upload session) automatically; files must be 25 MB or smaller. Use to attach a document to a task. Not idempotent — each call adds another attachment even if the same file was already attached. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_list_id` | string | yes |  | Task List. The task list that contains the task. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task. The task to which you are adding the attachment. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to attach (up to 25 MB supported). Files are not supported; an action that needs one fails. |
| `filename` | string | no |  | Attachment Name (Optional). The name to display for the attachment. If left blank, the original filename will be used. |

Output fields:

- `id`: Attachment ID
- `name`: File Name
- `contentType`: Content Type
- `size`: Size (filesize)
- `lastModifiedDateTime`: Last Modified At (datetime)

### `get_task`

**Get Task.** Retrieve the full details of a single Microsoft To Do task by its task list id and task id. Use when you already know the exact task and need its current fields (title, status, dates, etc.). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_list_id` | string | yes |  | Task List. The list containing the task you want to retrieve. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | yes |  | Task. The specific task to retrieve. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Task ID
- `title`: Title
- `status`: Status
- `importance`: Importance
- `isReminderOn`: Reminder On (boolean)
- `categories`: Categories
- `hasAttachments`: Has Attachments (boolean)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `body`: Body
- `body.content`: Content
- `body.contentType`: Content Type
- `dueDateTime`: Due Date
- `dueDateTime.dateTime`: Date (datetime)
- `dueDateTime.timeZone`: Time Zone

### `find_task_list_by_name`

**Find Task List.** Search the authenticated user's Microsoft To Do task lists by display name and return all matches. The match mode is configurable — contains (default), starts-with, or exact — so you can do a loose lookup or pin down one list. Use to resolve a list id from a name before acting on it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Title. The name (or partial name) of the task list to find. |
| `match_type` | string | no | `"contains"` | Match Type. How to match the list name. One of `"contains"`, `"startsWith"`, `"exact"`. |

Output fields:

- `[].id`: List ID
- `[].displayName`: Name
- `[].isOwner`: Owner (boolean)
- `[].isShared`: Shared (boolean)
- `[].wellknownListName`: Well-Known List Name

### `find_task_by_title`

**Find Task.** Search a specific Microsoft To Do task list for tasks whose title matches the given text and return all matches. The match mode is configurable — contains (default), starts-with, or exact. Use to resolve a task id from its title before reading, updating, completing, or deleting it. Requires a task list id; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_list_id` | string | yes |  | Task List. Select a specific task list to search within. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Task Title. The title (or partial title) of the task to find. |
| `match_type` | string | no | `"contains"` | Match Type. How to match the task title. One of `"contains"`, `"startsWith"`, `"exact"`. |

Output fields:

- `[].id`: Task ID
- `[].title`: Title
- `[].status`: Status
- `[].importance`: Importance
- `[].isReminderOn`: Reminder On (boolean)
- `[].categories`: Categories
- `[].hasAttachments`: Has Attachments (boolean)
- `[].createdDateTime`: Created At (datetime)
- `[].lastModifiedDateTime`: Last Modified At (datetime)
- `[].body`: Body
- `[].body.content`: Content
- `[].body.contentType`: Content Type
- `[].dueDateTime`: Due Date
- `[].dueDateTime.dateTime`: Date (datetime)
- `[].dueDateTime.timeZone`: Time Zone

### `microsoft_todo_complete_task`

**Complete Task.** Mark a Microsoft To Do task as completed, identified by list ID and task ID (from List Tasks); To Do records the completion time. To reopen a task, use Update Task with status Not Started. Completing an already completed task keeps it completed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |

Output fields:

- `id`: Task ID
- `title`: Title
- `status`: Status
- `importance`: Importance
- `body`: Body
- `bodyContentType`: Body Content Type
- `categories`: Categories
- `dueDateTime`: Due Date (datetime)
- `dueTimeZone`: Due Time Zone
- `startDateTime`: Start Date (datetime)
- `startTimeZone`: Start Time Zone
- `reminderDateTime`: Reminder Date (datetime)
- `reminderTimeZone`: Reminder Time Zone
- `isReminderOn`: Reminder On (boolean)
- `completedDateTime`: Completed At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `recurrence`: Recurrence
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `bodyLastModifiedDateTime`: Body Last Modified At (datetime)

### `microsoft_todo_create_checklist_item`

**Add Checklist Item.** Add a checklist item (a "step" or subtask) to a Microsoft To Do task, identified by list ID and task ID from List Tasks, optionally already checked. Not idempotent: every call adds another item, even with the same text. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |
| `display_name` | string | yes |  | Text. Text of the checklist item. |
| `is_checked` | boolean | no | `false` | Checked. Create the item already checked off. |

Output fields:

- `id`: Checklist Item ID
- `displayName`: Name
- `isChecked`: Checked (boolean)
- `checkedDateTime`: Checked At (datetime)
- `createdDateTime`: Created At (datetime)

### `microsoft_todo_create_linked_resource`

**Create Linked Resource.** Attach a linked resource to a Microsoft To Do task: a link back to the item that created it (an email, ticket, CRM record or web page), shown in the task details. Identify the task by list ID and task ID from List Tasks. Not idempotent: every call adds another link. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |
| `display_name` | string | yes |  | Title. Title of the linked item, for example the email subject. |
| `application_name` | string | yes |  | Application Name. Name of the app the item comes from, for example "Zendesk". |
| `web_url` | string | no |  | URL. Link that opens the item. |
| `external_id` | string | no |  | External ID. ID of the item in the source app. |

Output fields:

- `id`: Linked Resource ID
- `displayName`: Name
- `applicationName`: Application Name
- `webUrl`: Web URL (url)
- `externalId`: External ID

### `microsoft_todo_create_task`

**Create Task.** Create a task in a Microsoft To Do task list (ID from List Task Lists) with a title and optional notes, importance, status, due, start and reminder times (UTC) and categories. Setting a reminder turns the reminder on. Not idempotent: every call adds another task, even with the same title. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `title` | string | yes |  | Title. Title of the task. |
| `body` | string | no |  | Notes. Plain-text notes for the task. |
| `importance` | string | no |  | Importance. Defaults to Normal. One of `"low"`, `"normal"`, `"high"`. |
| `status` | string | no |  | Status. Defaults to Not Started. One of `"notStarted"`, `"inProgress"`, `"completed"`, `"waitingOnOthers"`, `"deferred"`. |
| `due_date_time` | ISO date-time string | no |  | Due Date. When the task is due, in UTC. |
| `start_date_time` | ISO date-time string | no |  | Start Date. When the task is scheduled to start, in UTC. |
| `reminder_date_time` | ISO date-time string | no |  | Reminder. When to remind the user, in UTC. |
| `categories` | array | no |  | Categories. Category names, matching the user's Outlook categories. |

Output fields:

- `id`: Task ID
- `title`: Title
- `status`: Status
- `importance`: Importance
- `body`: Body
- `bodyContentType`: Body Content Type
- `categories`: Categories
- `dueDateTime`: Due Date (datetime)
- `dueTimeZone`: Due Time Zone
- `startDateTime`: Start Date (datetime)
- `startTimeZone`: Start Time Zone
- `reminderDateTime`: Reminder Date (datetime)
- `reminderTimeZone`: Reminder Time Zone
- `isReminderOn`: Reminder On (boolean)
- `completedDateTime`: Completed At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `recurrence`: Recurrence
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `bodyLastModifiedDateTime`: Body Last Modified At (datetime)

### `microsoft_todo_create_task_list`

**Create Task List.** Create a new Microsoft To Do task list and return its ID. To Do allows several lists with the same name, so check List Task Lists first if a duplicate would be a problem. Not idempotent: every call creates another list. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `display_name` | string | yes |  | Name. Name of the new task list. |

Output fields:

- `id`: List ID
- `displayName`: Name
- `isOwner`: Owner (boolean)
- `isShared`: Shared (boolean)
- `wellknownListName`: Well-Known List Name

### `microsoft_todo_delete_checklist_item`

**Delete Checklist Item.** Permanently remove one checklist item (step) from a Microsoft To Do task; this cannot be undone. Get the ID from List Checklist Items; to just tick it off, use Update Checklist Item instead. A retry after success fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |
| `checklist_item_id` | string | yes |  | Checklist Item ID. ID of the checklist item, from List Checklist Items or Add Checklist Item. |

Output fields:

- `success`: Success (boolean)
- `listId`: List ID
- `taskId`: Task ID
- `checklistItemId`: Checklist Item ID

### `microsoft_todo_delete_linked_resource`

**Delete Linked Resource.** Permanently remove one linked resource from a Microsoft To Do task; the source item itself is not touched. Get the ID from List Linked Resources. A retry after success fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |
| `linked_resource_id` | string | yes |  | Linked Resource ID. ID of the linked resource, from List Linked Resources or Create Linked Resource. |

Output fields:

- `success`: Success (boolean)
- `listId`: List ID
- `taskId`: Task ID
- `linkedResourceId`: Linked Resource ID

### `microsoft_todo_delete_task`

**Delete Task.** Permanently delete a Microsoft To Do task with its checklist items, links and attachments; this cannot be undone. Identify it by list ID and task ID from List Tasks. Prefer Complete Task when the work is done. A retry after success fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |

Output fields:

- `success`: Success (boolean)
- `listId`: List ID
- `taskId`: Task ID

### `microsoft_todo_delete_task_attachment`

**Delete Task Attachment.** Permanently delete one file attached to a Microsoft To Do task; this cannot be undone. Get the attachment ID from List Task Attachments. A retry after success fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |
| `attachment_id` | string | yes |  | Attachment ID. ID of the attachment, from List Task Attachments or Upload Task Attachment. |

Output fields:

- `success`: Success (boolean)
- `listId`: List ID
- `taskId`: Task ID
- `attachmentId`: Attachment ID

### `microsoft_todo_delete_task_list`

**Delete Task List.** Permanently delete a Microsoft To Do task list together with every task in it; this cannot be undone. Get the ID from List Task Lists. The built-in "Tasks" and "Flagged email" lists cannot be deleted, and a retry after success fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |

Output fields:

- `success`: Success (boolean)
- `listId`: List ID

### `microsoft_todo_download_task_attachment`

**Download Task Attachment.** Download the content of one file attached to a Microsoft To Do task and return it as a file reference other steps can use. Get the attachment ID from List Task Attachments. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |
| `attachment_id` | string | yes |  | Attachment ID. ID of the attachment, from List Task Attachments or Upload Task Attachment. |

Output fields:

- `id`: Attachment ID
- `name`: File Name
- `contentType`: Content Type
- `size`: Size (filesize)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `file`: File

### `microsoft_todo_get_checklist_item`

**Get Checklist Item.** Read one checklist item (step) of a Microsoft To Do task: its text, checked state and dates. Get the checklist item ID from List Checklist Items. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |
| `checklist_item_id` | string | yes |  | Checklist Item ID. ID of the checklist item, from List Checklist Items or Add Checklist Item. |

Output fields:

- `id`: Checklist Item ID
- `displayName`: Name
- `isChecked`: Checked (boolean)
- `checkedDateTime`: Checked At (datetime)
- `createdDateTime`: Created At (datetime)

### `microsoft_todo_get_current_user`

**Get Current User.** Return the profile (ID, name, email, user principal name) of the Microsoft account this connection uses, so you can confirm whose tasks you are working with. Takes no input. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID
- `displayName`: Display Name
- `givenName`: First Name
- `surname`: Last Name
- `mail`: Email (email)
- `userPrincipalName`: User Principal Name (email)
- `jobTitle`: Job Title
- `preferredLanguage`: Preferred Language

### `microsoft_todo_get_linked_resource`

**Get Linked Resource.** Read one linked resource of a Microsoft To Do task (app name, title, URL, external ID). Get the linked resource ID from List Linked Resources. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |
| `linked_resource_id` | string | yes |  | Linked Resource ID. ID of the linked resource, from List Linked Resources or Create Linked Resource. |

Output fields:

- `id`: Linked Resource ID
- `displayName`: Name
- `applicationName`: Application Name
- `webUrl`: Web URL (url)
- `externalId`: External ID

### `microsoft_todo_get_task`

**Get Task.** Read one Microsoft To Do task (title, notes, status, importance, dates, categories, recurrence) by its list ID and task ID. Use List Tasks first when you only know the title. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |

Output fields:

- `id`: Task ID
- `title`: Title
- `status`: Status
- `importance`: Importance
- `body`: Body
- `bodyContentType`: Body Content Type
- `categories`: Categories
- `dueDateTime`: Due Date (datetime)
- `dueTimeZone`: Due Time Zone
- `startDateTime`: Start Date (datetime)
- `startTimeZone`: Start Time Zone
- `reminderDateTime`: Reminder Date (datetime)
- `reminderTimeZone`: Reminder Time Zone
- `isReminderOn`: Reminder On (boolean)
- `completedDateTime`: Completed At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `recurrence`: Recurrence
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `bodyLastModifiedDateTime`: Body Last Modified At (datetime)

### `microsoft_todo_get_task_attachment`

**Get Task Attachment.** Read the details (name, content type, size, last modified) of one file attached to a Microsoft To Do task, without its content. Get the attachment ID from List Task Attachments; use Download Task Attachment for the file itself. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |
| `attachment_id` | string | yes |  | Attachment ID. ID of the attachment, from List Task Attachments or Upload Task Attachment. |

Output fields:

- `id`: Attachment ID
- `name`: File Name
- `contentType`: Content Type
- `size`: Size (filesize)
- `lastModifiedDateTime`: Last Modified At (datetime)

### `microsoft_todo_get_task_list`

**Get Task List.** Read one Microsoft To Do task list (name, owner and sharing flags, built-in list type) by its ID from List Task Lists. Use List Task Lists instead when you only know the name. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |

Output fields:

- `id`: List ID
- `displayName`: Name
- `isOwner`: Owner (boolean)
- `isShared`: Shared (boolean)
- `wellknownListName`: Well-Known List Name

### `microsoft_todo_list_checklist_items`

**List Checklist Items.** List every checklist item (the "steps" or subtasks) of one Microsoft To Do task, with their IDs and checked state. Identify the task by list ID and task ID from List Tasks. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |

Output fields:

- `checklistItems`: Checklist Items
- `checklistItems[].id`: Checklist Item ID
- `checklistItems[].displayName`: Name
- `checklistItems[].isChecked`: Checked (boolean)
- `checklistItems[].checkedDateTime`: Checked At (datetime)
- `checklistItems[].createdDateTime`: Created At (datetime)
- `count`: Count (number)

### `microsoft_todo_list_linked_resources`

**List Linked Resources.** List the linked resources of one Microsoft To Do task: links back to the item the task came from, such as an email, ticket or web page, with app name, title, URL and external ID. Identify the task by list ID and task ID from List Tasks. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |

Output fields:

- `linkedResources`: Linked Resources
- `linkedResources[].id`: Linked Resource ID
- `linkedResources[].displayName`: Name
- `linkedResources[].applicationName`: Application Name
- `linkedResources[].webUrl`: Web URL (url)
- `linkedResources[].externalId`: External ID
- `count`: Count (number)

### `microsoft_todo_list_task_attachments`

**List Task Attachments.** List the files attached to one Microsoft To Do task with their IDs, names, types and sizes, without their content. Identify the task by list ID and task ID from List Tasks; use Download Task Attachment for a file's content. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |

Output fields:

- `attachments`: Attachments
- `attachments[].id`: Attachment ID
- `attachments[].name`: File Name
- `attachments[].contentType`: Content Type
- `attachments[].size`: Size (filesize)
- `attachments[].lastModifiedDateTime`: Last Modified At (datetime)
- `count`: Count (number)

### `microsoft_todo_list_task_lists`

**List Task Lists.** List the connected user's Microsoft To Do task lists with their IDs, optionally filtered by name (contains, starts with or exact match). Use it to resolve a list ID from a name before working with tasks; the built-in "Tasks" list has wellknownListName "defaultList". Returns one page; pass nextPageToken back as Page Token for more. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Only return lists whose name matches this text. |
| `match_type` | string | no |  | Match Type. How Name is matched. Defaults to Contains. One of `"contains"`, `"startsWith"`, `"exact"`. |
| `limit` | number | no |  | Limit. Maximum number of results per page (1-100). Defaults to 50. |
| `page_token` | string | no |  | Page Token. The nextPageToken returned by the previous call. Leave empty for the first page. |

Output fields:

- `lists`: Task Lists
- `lists[].id`: List ID
- `lists[].displayName`: Name
- `lists[].isOwner`: Owner (boolean)
- `lists[].isShared`: Shared (boolean)
- `lists[].wellknownListName`: Well-Known List Name
- `count`: Count (number)
- `nextPageToken`: Next Page Token

### `microsoft_todo_list_tasks`

**List Tasks.** List the tasks in one Microsoft To Do task list (ID from List Task Lists), optionally filtered by title (contains, starts with or exact match) and status. Use it to find a task ID by title before reading, updating, completing or deleting the task. Checklist items, linked resources and attachments are not included; use their own list actions. Returns one page; pass nextPageToken back as Page Token for more. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `title` | string | no |  | Title. Only return tasks whose title matches this text. |
| `match_type` | string | no |  | Match Type. How Title is matched. Defaults to Contains. One of `"contains"`, `"startsWith"`, `"exact"`. |
| `status` | string | no |  | Status. Only return tasks with this status. One of `"notStarted"`, `"inProgress"`, `"completed"`, `"waitingOnOthers"`, `"deferred"`. |
| `limit` | number | no |  | Limit. Maximum number of results per page (1-100). Defaults to 50. |
| `page_token` | string | no |  | Page Token. The nextPageToken returned by the previous call. Leave empty for the first page. |

Output fields:

- `tasks`: Tasks
- `tasks[].id`: Task ID
- `tasks[].title`: Title
- `tasks[].status`: Status
- `tasks[].importance`: Importance
- `tasks[].body`: Body
- `tasks[].bodyContentType`: Body Content Type
- `tasks[].categories`: Categories
- `tasks[].dueDateTime`: Due Date (datetime)
- `tasks[].dueTimeZone`: Due Time Zone
- `tasks[].startDateTime`: Start Date (datetime)
- `tasks[].startTimeZone`: Start Time Zone
- `tasks[].reminderDateTime`: Reminder Date (datetime)
- `tasks[].reminderTimeZone`: Reminder Time Zone
- `tasks[].isReminderOn`: Reminder On (boolean)
- `tasks[].completedDateTime`: Completed At (datetime)
- `tasks[].hasAttachments`: Has Attachments (boolean)
- `tasks[].recurrence`: Recurrence
- `tasks[].createdDateTime`: Created At (datetime)
- `tasks[].lastModifiedDateTime`: Last Modified At (datetime)
- `tasks[].bodyLastModifiedDateTime`: Body Last Modified At (datetime)
- `count`: Count (number)
- `nextPageToken`: Next Page Token

### `microsoft_todo_search_tasks`

**Search Tasks in All Lists.** Search every Microsoft To Do task list for tasks matching a title (contains, starts with or exact match) and/or status, and return each match with its list ID and list name. Use it when you don't know which list a task is in; use List Tasks when you do. Stops as soon as Limit matches are found; truncated is then true unless every list was already searched, so more matches may exist. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | no |  | Title. Only return tasks whose title matches this text. |
| `match_type` | string | no |  | Match Type. How Title is matched. Defaults to Contains. One of `"contains"`, `"startsWith"`, `"exact"`. |
| `status` | string | no |  | Status. Only return tasks with this status. One of `"notStarted"`, `"inProgress"`, `"completed"`, `"waitingOnOthers"`, `"deferred"`. |
| `limit` | number | no |  | Limit. Maximum number of tasks to return (1-200). Defaults to 50. |

Output fields:

- `tasks`: Tasks
- `tasks[].id`: Task ID
- `tasks[].title`: Title
- `tasks[].status`: Status
- `tasks[].importance`: Importance
- `tasks[].body`: Body
- `tasks[].bodyContentType`: Body Content Type
- `tasks[].categories`: Categories
- `tasks[].dueDateTime`: Due Date (datetime)
- `tasks[].dueTimeZone`: Due Time Zone
- `tasks[].startDateTime`: Start Date (datetime)
- `tasks[].startTimeZone`: Start Time Zone
- `tasks[].reminderDateTime`: Reminder Date (datetime)
- `tasks[].reminderTimeZone`: Reminder Time Zone
- `tasks[].isReminderOn`: Reminder On (boolean)
- `tasks[].completedDateTime`: Completed At (datetime)
- `tasks[].hasAttachments`: Has Attachments (boolean)
- `tasks[].recurrence`: Recurrence
- `tasks[].createdDateTime`: Created At (datetime)
- `tasks[].lastModifiedDateTime`: Last Modified At (datetime)
- `tasks[].bodyLastModifiedDateTime`: Body Last Modified At (datetime)
- `tasks[].listId`: List ID
- `tasks[].listName`: List Name
- `count`: Count (number)
- `truncated`: Truncated (boolean)

### `microsoft_todo_move_task`

**Move Task to Another List.** Move a Microsoft To Do task to another list. To Do has no move call, so this copies the task (fields, checklist items, linked resources) into the target list and then deletes the original; the task gets a new ID, returned here. Tasks with attachments are refused so no file is lost, and the original is only deleted if it is unchanged since the copy; otherwise the copy is removed and the move fails. Not idempotent: a retry after success fails because the original is gone. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |
| `target_list_id` | string | yes |  | Target Task List ID. ID of the list to move the task to, from List Task Lists. |

Output fields:

- `id`: Task ID
- `title`: Title
- `status`: Status
- `importance`: Importance
- `body`: Body
- `bodyContentType`: Body Content Type
- `categories`: Categories
- `dueDateTime`: Due Date (datetime)
- `dueTimeZone`: Due Time Zone
- `startDateTime`: Start Date (datetime)
- `startTimeZone`: Start Time Zone
- `reminderDateTime`: Reminder Date (datetime)
- `reminderTimeZone`: Reminder Time Zone
- `isReminderOn`: Reminder On (boolean)
- `completedDateTime`: Completed At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `recurrence`: Recurrence
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `bodyLastModifiedDateTime`: Body Last Modified At (datetime)
- `listId`: List ID
- `previousListId`: Previous List ID
- `previousTaskId`: Previous Task ID
- `checklistItemCount`: Checklist Items Copied (number)
- `linkedResourceCount`: Linked Resources Copied (number)

### `microsoft_todo_update_checklist_item`

**Update Checklist Item.** Change the text and/or checked state of one checklist item (step) of a Microsoft To Do task; use it to check off or uncheck a step. Get the checklist item ID from List Checklist Items. Fields left empty keep their values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |
| `checklist_item_id` | string | yes |  | Checklist Item ID. ID of the checklist item, from List Checklist Items or Add Checklist Item. |
| `display_name` | string | no |  | Text. New text for the checklist item. |
| `is_checked` | string | no |  | Checked. Check or uncheck the item. Leave empty to keep it as is. One of `"yes"`, `"no"`. |

Output fields:

- `id`: Checklist Item ID
- `displayName`: Name
- `isChecked`: Checked (boolean)
- `checkedDateTime`: Checked At (datetime)
- `createdDateTime`: Created At (datetime)

### `microsoft_todo_update_linked_resource`

**Update Linked Resource.** Change one or more fields of a linked resource on a Microsoft To Do task. Get the linked resource ID from List Linked Resources. Fields left empty keep their values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |
| `linked_resource_id` | string | yes |  | Linked Resource ID. ID of the linked resource, from List Linked Resources or Create Linked Resource. |
| `display_name` | string | no |  | Title. |
| `application_name` | string | no |  | Application Name. |
| `web_url` | string | no |  | URL. |
| `external_id` | string | no |  | External ID. |

Output fields:

- `id`: Linked Resource ID
- `displayName`: Name
- `applicationName`: Application Name
- `webUrl`: Web URL (url)
- `externalId`: External ID

### `microsoft_todo_update_task`

**Update Task.** Change one or more fields of a Microsoft To Do task, identified by list ID and task ID (from List Tasks). Only the fields you provide change; the rest keep their values. To remove a due date, start date, reminder, notes or categories, pick it in Clear Fields (not together with a new value for the same field). Times are UTC. Use Complete Task to just mark it done. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |
| `title` | string | no |  | Title. New title. |
| `body` | string | no |  | Notes. New plain-text notes, replacing the current ones. |
| `importance` | string | no |  | Importance. One of `"low"`, `"normal"`, `"high"`. |
| `status` | string | no |  | Status. One of `"notStarted"`, `"inProgress"`, `"completed"`, `"waitingOnOthers"`, `"deferred"`. |
| `due_date_time` | ISO date-time string | no |  | Due Date. New due date, in UTC. |
| `start_date_time` | ISO date-time string | no |  | Start Date. New start date, in UTC. |
| `reminder_date_time` | ISO date-time string | no |  | Reminder. New reminder time, in UTC. Turns the reminder on. |
| `categories` | array | no |  | Categories. Category names, replacing the current ones. |
| `clear_fields` | array | no |  | Clear Fields. Fields to empty on the task. One of `"dueDateTime"`, `"startDateTime"`, `"reminderDateTime"`, `"body"`, `"categories"`. |

Output fields:

- `id`: Task ID
- `title`: Title
- `status`: Status
- `importance`: Importance
- `body`: Body
- `bodyContentType`: Body Content Type
- `categories`: Categories
- `dueDateTime`: Due Date (datetime)
- `dueTimeZone`: Due Time Zone
- `startDateTime`: Start Date (datetime)
- `startTimeZone`: Start Time Zone
- `reminderDateTime`: Reminder Date (datetime)
- `reminderTimeZone`: Reminder Time Zone
- `isReminderOn`: Reminder On (boolean)
- `completedDateTime`: Completed At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `recurrence`: Recurrence
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `bodyLastModifiedDateTime`: Body Last Modified At (datetime)

### `microsoft_todo_update_task_list`

**Rename Task List.** Rename a Microsoft To Do task list, identified by its ID from List Task Lists. The built-in "Tasks" and "Flagged email" lists cannot be renamed. Setting the same name again changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `display_name` | string | yes |  | New Name. The new name for the task list. |

Output fields:

- `id`: List ID
- `displayName`: Name
- `isOwner`: Owner (boolean)
- `isShared`: Shared (boolean)
- `wellknownListName`: Well-Known List Name

### `microsoft_todo_upload_task_attachment`

**Upload Task Attachment.** Attach a file of up to 25 MB to a Microsoft To Do task, identified by list ID and task ID from List Tasks. Files under 3 MB are sent in one request and larger ones through an upload session. Not idempotent: every call adds another attachment, even for the same file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Task List ID. ID of the task list, from List Task Lists or Create Task List. |
| `task_id` | string | yes |  | Task ID. ID of the task, from List Tasks or Create Task. |
| `file` | file | yes |  | File. The file to attach, up to 25 MB. Files are not supported; an action that needs one fails. |
| `file_name` | string | no |  | File Name. Name shown for the attachment. Defaults to the file's own name. |

Output fields:

- `id`: Attachment ID
- `name`: File Name
- `contentType`: Content Type
- `size`: Size (filesize)
- `lastModifiedDateTime`: Last Modified At (datetime)

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

# Podio

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-podio'
  version: '0.2.2'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your Podio account to automate workspace management and item operations.

## Actions

### `create_item`

**Create Item.** Creates a new item (record) in a specified Podio app, populating its fields. Field values can be supplied via the structured app-field inputs or, for complex cases, a raw legacy-fields JSON map keyed by field id. Use when adding a record to a Podio app; requires an app id and at least one field value. Not idempotent — each call creates a separate item. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orgId` | string | no |  | Organization (Optional). Select an organization to filter apps by workspace. Leave empty to see all apps. A value the product loads from the provider, such as an id; write the value itself. |
| `spaceId` | string | no |  | Space (Optional). Select a workspace to filter apps. Leave empty to see all apps in the organization. A value the product loads from the provider, such as an id; write the value itself. |
| `appId` | string | yes |  | App. Select a Podio app. A value the product loads from the provider, such as an id; write the value itself. |
| `externalId` | string | no |  | External ID. The external id of the item. This can be used to hold a reference to the item in an external system. |
| `appFields` | object | yes |  | App Fields. Configure values for the fields in the selected app. An object whose fields depend on other inputs; the product shows them. |
| `legacyFields` | object | no |  | Advanced: Custom Fields JSON. Advanced: Use this for complex field configurations. Format: {"field_id": {"value": "content"}}. Only use if the dynamic fields above don't meet your needs. |
| `fileIds` | array | no |  | File IDs. Temporary files that have been uploaded and should be attached to this item. |
| `tags` | array | no |  | Tags. The tags to put on the item. |
| `reminder` | object | no |  | Reminder. Optional reminder on this item. Format: {"remind_delta": minutes_before_due_date}. |
| `recurrence` | object | no |  | Recurrence. The recurrence for the task, if any. Format: {"name": "weekly\|monthly\|yearly", "config": {...}, "step": 1, "until": "date"}. |
| `linkedAccountId` | number | no |  | Linked Account ID. The linked account to use for the meeting. |
| `ref` | object | no |  | Reference. The reference for the new item, if any. Format: {"type": "item", "id": reference_id}. |
| `hook` | boolean | no | `true` | Execute Hooks. If false, webhooks and integrations will not be triggered for this operation. |
| `silent` | boolean | no | `false` | Silent Mode. If true, notifications will not be triggered and the object will not appear in activity streams. |

### `update_item`

**Update Item.** Updates fields on an existing Podio item identified by item id; only the fields you supply are changed (via structured app-field inputs or a raw legacy-fields JSON map). Use when modifying an existing record rather than creating one; requires the app id and item id. Idempotent — repeating with the same values leaves the item in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | App. Select a Podio app. A value the product loads from the provider, such as an id; write the value itself. |
| `itemId` | string | yes |  | Item. Select a Podio item. A value the product loads from the provider, such as an id; write the value itself. |
| `appFields` | object | no |  | App Fields. Configure values for the fields you want to update in the selected app. An object whose fields depend on other inputs; the product shows them. |
| `revision` | number | no |  | Revision. The revision of the item that is being updated. Optional for conflict detection. |
| `externalId` | string | no |  | External ID. The new external_id of the item. |
| `legacyFields` | object | no |  | Legacy Fields (Advanced). Manual field configuration using field_id or external_id as keys. Use this for advanced scenarios or when dynamic fields are not sufficient. |
| `fileIds` | array | no |  | File IDs. The list of attachments. |
| `tags` | array | no |  | Tags. The list of tags. |
| `reminder` | object | no |  | Reminder. Optional reminder on this item. Format: {"remind_delta": minutes_before_due_date}. |
| `recurrence` | object | no |  | Recurrence. The recurrence for the task, if any. Format: {"name": "weekly\|monthly\|yearly", "config": {...}, "step": 1, "until": "date"}. |
| `linkedAccountId` | number | no |  | Linked Account ID. The linked account to use for meetings. |
| `ref` | object | no |  | Reference. The reference of the item. Format: {"type": "reference_type", "id": reference_id}. |
| `hook` | boolean | no | `true` | Execute Hooks. If false, webhooks and integrations will not be triggered for this operation. |
| `silent` | boolean | no | `false` | Silent Mode. If true, notifications will not be triggered and the object will not appear in activity streams. |

### `create_task`

**Create Task.** Creates a Podio task, optionally attached to a reference object (item, status, or another task via the reference type/id) or standalone if no reference is given. Supports due date/time, a responsible assignee, file attachments, labels, reminders, and recurrence. Use to add a to-do; requires task text. Not idempotent — each call creates a new task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Task Text. The description or text of the task. |
| `description` | string | no |  | Description. Additional description for the task. |
| `private` | boolean | no | `false` | Private. Whether the task should be private (only creator, assignee and assignor can see it) |
| `dueDate` | ISO date-time string | no |  | Due Date. Due date in local time (date only) |
| `dueTime` | string | no |  | Due Time. Due time in local time (HH:MM:SS format, e.g., "14:30:00") |
| `dueOn` | ISO date-time string | no |  | Due Date & Time (UTC). Complete due date and time in UTC. Alternative to separate date/time fields. |
| `orgId` | string | yes |  | Organization. Select a Podio organization. A value the product loads from the provider, such as an id; write the value itself. |
| `spaceId` | string | yes |  | Space. Select a Podio workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `appId` | string | yes |  | App. Select a Podio app. A value the product loads from the provider, such as an id; write the value itself. |
| `refType` | string | no |  | Reference Type. The type of object to reference. A value the product loads from the provider, such as an id; write the value itself. |
| `refId` | string | no |  | Reference Object. Select the specific object to reference. A value the product loads from the provider, such as an id; write the value itself. |
| `responsible` | object | no |  | Responsible Person. Who is responsible for this task. Can be a user ID (number) or contact identifier object with type and id. |
| `fileIds` | array | no |  | File IDs. List of file IDs to attach to this task. |
| `labels` | array | no |  | Labels (Text). List of label names in text form. |
| `labelIds` | array | no |  | Label IDs. List of label IDs (alternative to text labels) |
| `reminder` | object | no |  | Reminder. Reminder settings. Format: {"remind_delta": minutes_before_due_date}. |
| `recurrence` | object | no |  | Recurrence. Recurring task settings. Format: {"name": "weekly\|monthly\|yearly", "config": {...}, "step": 1, "until": "date"}. |
| `externalId` | string | no |  | External ID. External system identifier for this task. |
| `hook` | boolean | no | `true` | Execute Hooks. If false, webhooks and integrations will not be triggered for this operation. |
| `silent` | boolean | no | `false` | Silent Mode. If true, notifications will not be triggered and the object will not appear in activity streams. |

### `update_task`

**Update Task.** Updates an existing Podio task identified by task id; only the fields you supply change, and this includes toggling its completed flag, reassigning it, or editing text, due date, labels, and reminders. Use to edit or complete a known task; requires the task id and at least one field to change. Idempotent — repeating with the same values yields the same task state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task. Select a Podio task. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | no |  | Text. The updated text (title) for the task. |
| `description` | string | no |  | Description. The updated description for the task. |
| `dueDate` | ISO date-time string | no |  | Due Date. The new due date for the task (in users timezone) |
| `dueTime` | string | no |  | Due Time. The new due time for the task in local timezone (HH:MM:SS format, e.g., "14:30:00") |
| `private` | boolean | no |  | Private. Whether the task should be private (only creator, assignee and assignor can see it) |
| `completed` | boolean | no |  | Completed. Mark the task as completed or not completed. |
| `orgId` | string | yes |  | Organization. Select a Podio organization. A value the product loads from the provider, such as an id; write the value itself. |
| `spaceId` | string | yes |  | Space. Select a Podio workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `appId` | string | yes |  | App. Select a Podio app. A value the product loads from the provider, such as an id; write the value itself. |
| `refType` | string | no |  | Reference Type. The type of object to reference. A value the product loads from the provider, such as an id; write the value itself. |
| `refId` | string | no |  | Reference Object. Select the specific object to reference. A value the product loads from the provider, such as an id; write the value itself. |
| `responsible` | number | no |  | Responsible User ID. The user ID of the person responsible for this task. |
| `labels` | array | no |  | Labels. The labels for the task. Either a list of label ids or label texts. |
| `fileIds` | array | no |  | File IDs. The list of files that should be attached to the task. |
| `reminder` | object | no |  | Reminder. Optional reminder on this task. Format: {"remind_delta": minutes_before_due_date}. If empty, existing reminder is deleted. |
| `hook` | boolean | no | `true` | Execute Hooks. If false, webhooks and integrations will not be triggered for this operation. |
| `silent` | boolean | no | `false` | Silent Mode. If true, notifications will not be triggered and the object will not appear in activity streams. |

### `attach_file`

**Attach File.** Attaches an already-uploaded Podio file to a target object — an item, task, status update, comment, or space — selected via the reference type and id. Use when linking an existing file to a Podio object; requires the file id, a space, and the target type/id. Not idempotent — each call adds another attachment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orgId` | string | yes |  | Organization. Select a Podio organization. A value the product loads from the provider, such as an id; write the value itself. |
| `spaceId` | string | yes |  | Space. Select a Podio workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `appId` | string | yes |  | App. Select a Podio app. A value the product loads from the provider, such as an id; write the value itself. |
| `fileId` | string | yes |  | File. Select a file from the space. A value the product loads from the provider, such as an id; write the value itself. |
| `refType` | string | yes |  | Attach To. What type of object to attach the file to. A value the product loads from the provider, such as an id; write the value itself. |
| `refId` | string | no |  | Reference Object. Select the specific object to reference. A value the product loads from the provider, such as an id; write the value itself. |
| `silent` | boolean | no | `false` | Silent Mode. If true, notifications will not be triggered and the object will not appear in activity streams. |

### `create_comment`

**Create Comment.** Posts a text comment on a Podio item or task, chosen via the comment-on type and object id, with optional file or embed attachments. Use to add a note or reply to a record; requires the target type/id and comment text. Not idempotent — each call posts a separate comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orgId` | string | yes |  | Organization. Select a Podio organization. A value the product loads from the provider, such as an id; write the value itself. |
| `spaceId` | string | yes |  | Space. Select a Podio workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `appId` | string | yes |  | App. Select a Podio app. A value the product loads from the provider, such as an id; write the value itself. |
| `type` | string | yes |  | Comment On. What type of object to comment on. A value the product loads from the provider, such as an id; write the value itself. |
| `id` | string | yes |  | Object. Select the specific object to comment on. A value the product loads from the provider, such as an id; write the value itself. |
| `value` | string | yes |  | Comment Text. The content of your comment. |
| `externalId` | string | no |  | External ID. Optional external identifier for the comment. |
| `fileIds` | array | no |  | Attach Files. Select files from the space to attach to this comment (enter file IDs from the space) |
| `embedId` | number | no |  | Embed ID. ID of a previously created embedded link. |
| `embedUrl` | string | no |  | Embed URL. URL to embed in the comment. |
| `alertInvite` | boolean | no | `false` | Auto-Invite Mentioned Users. Automatically invite mentioned users to the workspace if they lack access. |
| `silent` | boolean | no | `false` | Silent Mode. If true, notifications will not be triggered and the object will not appear in activity streams. |
| `hook` | boolean | no | `true` | Execute Hooks. If false, webhooks and integrations will not be triggered for this operation. |

### `create_status`

**Create Status Update.** Posts a status update to a Podio workspace (space) stream, optionally with file/embed attachments or an attached poll. Use to share an announcement or post to a space feed; requires the space id and a status message. Not idempotent — each call posts a new status update. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orgId` | string | yes |  | Organization. Select a Podio organization. A value the product loads from the provider, such as an id; write the value itself. |
| `spaceId` | string | yes |  | Space. Select a Podio workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `value` | string | yes |  | Status Message. What would you like to share? |
| `fileIds` | array | no |  | Attach Files. File IDs to attach to this status update (enter file IDs from the space) |
| `embedId` | number | no |  | Embed ID. ID of a previously created embedded link. |
| `embedUrl` | string | no |  | Embed URL. URL to embed in the status update. |
| `question` | object | no |  | Add Poll. Create a poll with your status. Format: {"text": "Question?", "options": ["Option 1", "Option 2"]}. |
| `alertInvite` | boolean | no | `false` | Auto-Invite Mentioned Users. Automatically invite mentioned users to the workspace if they lack access. |

### `find_item`

**Find Item.** Looks up Podio items in one of two modes: fetch a single item directly by its item id, or filter items within an app by field criteria (with limit, offset, and sorting). Use to read a known record or search an app for matching records; the filter mode requires an app id. Idempotent — a read that does not modify data. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchType` | string | yes |  | Search Method. How to find the item. A value the product loads from the provider, such as an id; write the value itself. |
| `itemId` | number | no |  | Item ID. The specific item ID to retrieve. |
| `selectedItem` | string | yes |  | Item. Select a Podio item. A value the product loads from the provider, such as an id; write the value itself. |
| `markAsViewed` | boolean | no | `true` | Mark as Viewed. Mark any new notifications on this item as viewed. |
| `orgId` | string | yes |  | Organization. Select a Podio organization. A value the product loads from the provider, such as an id; write the value itself. |
| `spaceId` | string | yes |  | Space. Select a Podio workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `appId` | string | yes |  | App. Select a Podio app. A value the product loads from the provider, such as an id; write the value itself. |
| `filters` | object | no |  | Search Filters. Filter criteria as JSON object. Use field external_id as keys. |
| `limit` | number | no | `20` | Limit. Maximum number of results to return (1-500, default: 20) |
| `offset` | number | no | `0` | Offset. Number of results to skip for pagination (default: 0) |
| `sortBy` | string | no |  | Sort By. Field to sort results by (e.g., "created_on", "last_edit_on") |
| `sortDesc` | boolean | no | `false` | Sort Descending. Sort results in descending order. |

### `find_task`

**Find Task.** Fetches a single Podio task by its task id. Use to read a task's current details before updating it or to verify it exists; requires the task id. Idempotent — a read that does not modify data. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task. Select a Podio task. A value the product loads from the provider, such as an id; write the value itself. |

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

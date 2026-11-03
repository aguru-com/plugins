# Attio

Modern, collaborative CRM platform built to be fully customizable and real-time.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-attio'
  version: '0.3.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Access Token

> To use Attio, you need to generate an Access Token:
> 1. Login to your Attio account at https://app.attio.com.
> 2. From the dropdown beside your workspace name, click Workspace settings.
> 3. Click the Developers tab.
> 4. Click on the "New Access Token" button.
> 5. Set the appropriate Scopes for the integration.
> 6. Copy the generated Access Token.

## Actions

### `create_record`

**Create Record.** Creates a new record (person, company, deal, or any custom object type) in Attio with the given attribute values. Choose this to add a brand-new CRM entity; the object type must be selected and its attributes supplied. Not idempotent — each call creates a separate record even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectTypeId` | string | yes |  | Object. A value the product loads from the provider, such as an id; write the value itself. |
| `attributes` | object | no |  | Object Attributes. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.record_id`: Record ID
- `created_at`: Created At (datetime)
- `web_url`: Web URL (url)
- `values`: Values (an object whose keys vary)

### `update_record`

**Update Record.** Updates an existing record in a given Attio object type by record ID, overwriting the supplied attribute values (multiselect values are appended). Choose this when you already know the record ID and want to change its fields. Idempotent — re-applying the same values leaves the record in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectTypeId` | string | yes |  | Object. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. The unique identifier of the record to update. |
| `attributes` | object | no |  | Object Attributes. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.record_id`: Record ID
- `created_at`: Created At (datetime)
- `web_url`: Web URL (url)
- `values`: Values (an object whose keys vary)

### `find_record`

**Find Record.** Looks up records of a chosen Attio object type. Operates in two modes: supply a Record ID to fetch that exact record (all attribute filters are then ignored), or leave it empty and provide at least one attribute filter to query for matching records (fails when no filter is given). Use this to resolve a record before updating or referencing it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectTypeId` | string | yes |  | Object. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | no |  | Record ID. Look up a record by its exact ID. When provided, all attribute filters are ignored. |
| `attributes` | object | no |  | Object Attributes. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `found`: Found (boolean)
- `result`: Records
- `result[].id`: ID
- `result[].id.workspace_id`: Workspace ID
- `result[].id.object_id`: Object ID
- `result[].id.record_id`: Record ID
- `result[].created_at`: Created At (datetime)
- `result[].web_url`: Web URL (url)
- `result[].values`: Values (an object whose keys vary)

### `get_record`

**Get Record.** Fetches one record by its exact ID within a given Attio object type and returns its normalized attribute values. Choose this when you already have the record ID and want its current data; use Find Record instead when you need to search by attributes. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectTypeId` | string | yes |  | Object. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.record_id`: Record ID
- `created_at`: Created At (datetime)
- `web_url`: Web URL (url)
- `values`: Values (an object whose keys vary)

### `create_entry`

**Create List Entry.** Adds an existing record to a specified Attio list as a new entry, optionally setting the list-specific entry attribute values. Requires the list, the parent record's object type, and the parent record ID. Not idempotent — each call creates another entry, so the same record can be added to the list multiple times. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |
| `parentObjectId` | string | yes |  | Parent Object. A value the product loads from the provider, such as an id; write the value itself. |
| `parentRecordId` | string | yes |  | Parent Record ID. |
| `attributes` | object | no |  | List Attributes. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.list_id`: List ID
- `id.entry_id`: Entry ID
- `parent_record_id`: Parent Record ID
- `parent_object`: Parent Object
- `created_at`: Created At (datetime)
- `entry_values`: Entry Values (an object whose keys vary)

### `update_entry`

**Update List Entry.** Updates the list-specific attribute values of an existing list entry, identified by its list and entry ID (multiselect values are appended). Choose this to change an entry already on a list rather than to add a record to a list. Idempotent for scalar values — re-applying the same values leaves the entry unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |
| `entryId` | string | yes |  | Entry ID. The unique identifier of the entry to update. |
| `attributes` | object | no |  | List Attributes. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.list_id`: List ID
- `id.entry_id`: Entry ID
- `parent_record_id`: Parent Record ID
- `parent_object`: Parent Object
- `created_at`: Created At (datetime)
- `entry_values`: Entry Values (an object whose keys vary)

### `find_list_entry`

**Find List Entry.** Queries the entries of a specific Attio list, returning entries that match the supplied attribute filters; at least one filter is required. Use this to find list entries before updating or referencing them. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |
| `attributes` | object | no |  | List Attributes. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `found`: Found (boolean)
- `result`: Entries
- `result[].id`: ID
- `result[].id.workspace_id`: Workspace ID
- `result[].id.list_id`: List ID
- `result[].id.entry_id`: Entry ID
- `result[].parent_record_id`: Parent Record ID
- `result[].parent_object`: Parent Object
- `result[].created_at`: Created At (datetime)
- `result[].values`: Values (an object whose keys vary)

### `create_note`

**Create Note.** Creates a note attached to a specific record, with a title and body content interpreted as either plaintext or markdown. Requires the parent object type, the parent record ID, and the note text. Not idempotent — each call appends another note to the record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parentObject` | string | yes |  | Parent Object. The object type the record belongs to (e.g. person, company). A value the product loads from the provider, such as an id; write the value itself. |
| `parentRecordId` | string | yes |  | Parent Record ID. The ID of the record to attach this note to. |
| `title` | string | yes |  | Title. The plaintext title of the note. |
| `format` | string | yes | `"plaintext"` | Format. How the note content should be interpreted. One of `"plaintext"`, `"markdown"`. |
| `content` | string | yes |  | Content. The body of the note. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.note_id`: Note ID
- `parent_object`: Parent Object
- `parent_record_id`: Parent Record ID
- `title`: Title
- `meeting_id`: Meeting ID
- `content_plaintext`: Content (Plain Text)
- `content_markdown`: Content (Markdown)
- `tags`: Tags
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `get_call_transcript`

**Get Call Transcript.** Retrieves the full transcript for a specific call recording, identified by its meeting ID and call recording ID. Use this to obtain the spoken text of a recorded call, typically after a call-recording event. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting. The meeting that contains the call recording. A value the product loads from the provider, such as an id; write the value itself. |
| `call_recording_id` | string | yes |  | Call Recording. The call recording to fetch the transcript for. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `data`: Transcript
- `data.id`: ID
- `data.id.workspace_id`: Workspace ID
- `data.id.meeting_id`: Meeting ID
- `data.id.call_recording_id`: Call Recording ID
- `data.transcript`: Segments
- `data.transcript[].speech`: Speech
- `data.transcript[].start_time`: Start Time (s) (number)
- `data.transcript[].end_time`: End Time (s) (number)
- `data.transcript[].speaker`: Speaker
- `data.transcript[].speaker.name`: Name
- `data.raw_transcript`: Raw Transcript
- `data.web_url`: Web URL (url)
- `pagination`: Pagination
- `pagination.next_cursor`: Next Cursor

### `create_task`

**Create Task.** Creates a new task in Attio with text content, optionally a deadline, completion flag, a linked record (object type plus record ID), and an assignee by workspace member email. Choose this to add a to-do item, optionally tied to a CRM record. Not idempotent — each call creates a separate task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Task Content. The text content of the task. |
| `deadline_at` | ISO date-time string | no |  | Deadline. |
| `is_completed` | boolean | no |  | Mark as Completed. |
| `linked_object` | string | no |  | Linked Object. The object type of the record to link this task to. A value the product loads from the provider, such as an id; write the value itself. |
| `linked_record_id` | string | no |  | Linked Record. The record to link this task to. A value the product loads from the provider, such as an id; write the value itself. |
| `assignee_email` | string | no |  | Assignee Email. Email address of the workspace member to assign this task to. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.task_id`: Task ID
- `content_plaintext`: Content
- `is_completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `deadline_at`: Deadline (datetime)
- `linked_records`: Linked Records
- `linked_records[].target_object_id`: Object ID
- `linked_records[].target_record_id`: Record ID
- `assignees`: Assignees
- `assignees[].referenced_actor_type`: Actor Type
- `assignees[].referenced_actor_id`: Actor ID
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `list_tasks`

**List Tasks.** Lists tasks in Attio, optionally narrowed by linked object type, linked record, assignee (member email/ID, or "null" for unassigned), and completion status. With no filters it returns all tasks. Use this to find tasks before getting or updating one. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linked_object` | string | no |  | Linked Object. Filter tasks linked to records of this object type. A value the product loads from the provider, such as an id; write the value itself. |
| `linked_record_id` | string | no |  | Linked Record. Filter tasks linked to this specific record. A value the product loads from the provider, such as an id; write the value itself. |
| `assignee` | string | no |  | Assignee. Filter by workspace member email or ID. Enter "null" to find unassigned tasks. |
| `is_completed` | string | no |  | Completion Status. One of `"all"`, `"true"`, `"false"`. |

Output fields:

- `found`: Found (boolean)
- `result`: Tasks
- `result[].id`: ID
- `result[].id.workspace_id`: Workspace ID
- `result[].id.task_id`: Task ID
- `result[].content_plaintext`: Content
- `result[].is_completed`: Completed (boolean)
- `result[].completed_at`: Completed At (datetime)
- `result[].deadline_at`: Deadline (datetime)
- `result[].linked_records`: Linked Records
- `result[].linked_records[].target_object_id`: Object ID
- `result[].linked_records[].target_record_id`: Record ID
- `result[].assignees`: Assignees
- `result[].assignees[].referenced_actor_type`: Actor Type
- `result[].assignees[].referenced_actor_id`: Actor ID
- `result[].created_by_actor`: Created By
- `result[].created_by_actor.type`: Type
- `result[].created_by_actor.id`: ID
- `result[].created_at`: Created At (datetime)

### `get_task`

**Get Task.** Fetches a single task by its ID and returns its details. Choose this when you already have the task ID; use List Tasks to find a task by its attributes. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task. The task to retrieve. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.task_id`: Task ID
- `content_plaintext`: Content
- `is_completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `deadline_at`: Deadline (datetime)
- `linked_records`: Linked Records
- `linked_records[].target_object_id`: Object ID
- `linked_records[].target_record_id`: Record ID
- `assignees`: Assignees
- `assignees[].referenced_actor_type`: Actor Type
- `assignees[].referenced_actor_id`: Actor ID
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `delete_task`

**Delete Task.** Permanently deletes a task identified by its ID. Use this to remove a task you no longer need; the deletion cannot be undone. Effectively idempotent on end-state — once the task is gone, repeating the call has no further effect (though the second call may error on the missing task). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task. The task to delete. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)

### `update_task`

**Update Task.** Updates an existing task by ID, changing any supplied fields: content, deadline, completion status, linked record, or assignee email. At least one field must be provided. Choose this to modify a task you already know the ID of. Idempotent — re-applying the same values leaves the task in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task. The task to update. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | no |  | Task Content. Update the text content of the task. |
| `deadline_at` | ISO date-time string | no |  | Deadline. Update the task deadline. Leave empty to keep existing value. |
| `is_completed` | string | no |  | Completion Status. Update the completion status of the task. One of `"true"`, `"false"`. |
| `linked_object` | string | no |  | Linked Object. The object type of the record to link this task to. A value the product loads from the provider, such as an id; write the value itself. |
| `linked_record_id` | string | no |  | Linked Record. The record to link this task to. A value the product loads from the provider, such as an id; write the value itself. |
| `assignee_email` | string | no |  | Assignee Email. Email address of the workspace member to assign this task to. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.task_id`: Task ID
- `content_plaintext`: Content
- `is_completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `deadline_at`: Deadline (datetime)
- `linked_records`: Linked Records
- `linked_records[].target_object_id`: Object ID
- `linked_records[].target_record_id`: Record ID
- `assignees`: Assignees
- `assignees[].referenced_actor_type`: Actor Type
- `assignees[].referenced_actor_id`: Actor ID
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_create_attribute`

**Create Attribute.** Creates a new attribute (field) on an object or list. Attributes cannot be deleted through the API, only archived with Update Attribute. Record-reference and currency types need Config. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes |  | Target. Whether the attribute belongs to an object or a list. One of `"objects"`, `"lists"`. |
| `identifier` | string | yes |  | Object or List. Slug or ID of the object or list the attribute belongs to. |
| `title` | string | yes |  | Title. |
| `api_slug` | string | yes |  | API Slug. Unique snake_case slug. |
| `type` | string | yes |  | Type. One of `text`, `number`, `checkbox`, `currency`, `date`, `timestamp`, `rating`, `status`, `select`, `record-reference`, `actor-reference`, `location`, `domain`, `email-address`, `phone-number`. |
| `description` | string | no |  | Description. |
| `is_required` | boolean | no |  | Required. |
| `is_unique` | boolean | no |  | Unique. |
| `is_multiselect` | boolean | no |  | Multiselect. |
| `config` | JSON | no |  | Config. Type-specific config, e.g. {"currency": {"default_currency_code": "USD", "display_type": "symbol"}} or {"record_reference": {"allowed_objects": ["people"]}}. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.attribute_id`: Attribute ID
- `title`: Title
- `description`: Description
- `api_slug`: API Slug
- `type`: Type
- `is_system_attribute`: System Attribute (boolean)
- `is_writable`: Writable (boolean)
- `is_required`: Required (boolean)
- `is_unique`: Unique (boolean)
- `is_multiselect`: Multiselect (boolean)
- `is_default_value_enabled`: Default Value Enabled (boolean)
- `is_archived`: Archived (boolean)
- `default_value`: Default Value
- `relationship`: Relationship
- `relationship.id`: ID
- `relationship.id.workspace_id`: Workspace ID
- `relationship.id.object_id`: Object ID
- `relationship.id.attribute_id`: Attribute ID
- `relationship.object_slug`: Object Slug
- `relationship.api_slug`: API Slug
- `relationship.is_multiselect`: Multiselect (boolean)
- `relationship.title`: Title
- `created_at`: Created At (datetime)

### `attio_create_call_recording`

**Create Call Recording.** Attaches a call recording to a meeting from a video URL and/or transcript segments. Always include a transcript. Rate limited to 1 request per second. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting ID. From List Meetings or Create Meeting. |
| `video_url` | string | no |  | Video URL. Publicly reachable URL of the recording. |
| `transcript` | array | yes |  | Transcript. Transcript segments in order. Each item: { `speech`, `start_time`, `end_time`, `speaker_name`, `speaker_email`? }. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.meeting_id`: Meeting ID
- `id.call_recording_id`: Call Recording ID
- `status`: Status
- `web_url`: Web URL (url)
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_create_comment`

**Create Comment.** Posts a comment as a workspace member (ID from List Workspace Members). Give exactly one target: Thread ID to reply, Object with Record ID for a record, or List with Entry ID for a list entry. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Content. |
| `author_id` | string | yes |  | Author ID. Workspace member ID, from List Workspace Members. |
| `thread_id` | string | no |  | Thread ID. Reply in this thread. |
| `object` | string | no |  | Object. Object slug, with Record ID. |
| `record_id` | string | no |  | Record ID. |
| `list` | string | no |  | List. List slug or ID, with Entry ID. |
| `entry_id` | string | no |  | Entry ID. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.comment_id`: Comment ID
- `thread_id`: Thread ID
- `content_plaintext`: Content
- `author`: Author
- `author.type`: Type
- `author.id`: ID
- `record`: Record
- `record.record_id`: Record ID
- `record.object_id`: Object ID
- `entry`: Entry
- `resolved_at`: Resolved At (datetime)
- `resolved_by`: Resolved By
- `created_at`: Created At (datetime)

### `attio_create_folder`

**Create Folder.** Creates a native folder in the files of a record. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `record_id` | string | yes |  | Record ID. ID of the record the files belong to. |
| `name` | string | yes |  | Name. |
| `parent_folder_id` | string | no |  | Parent Folder ID. Folder to put it in; empty for the root. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.file_id`: File ID
- `name`: Name
- `file_type`: File Type
- `parent_folder_id`: Parent Folder ID
- `object_id`: Object ID
- `object_slug`: Object Slug
- `record_id`: Record ID
- `storage_provider`: Storage Provider
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_create_list_entry`

**Create List Entry.** Adds a record to a list as a new entry, optionally setting list-specific values. A record can be added to the same list more than once; use Upsert List Entry to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. List slug or ID. Use List Lists to find it. |
| `parent_object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `parent_record_id` | string | yes |  | Record ID. ID of the record to add to the list. |
| `entry_values` | JSON | no |  | Entry Values. List-specific attribute values keyed by attribute slug, e.g. {"stage": "Qualified"}. Use List Attributes with target `lists` for slugs. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.list_id`: List ID
- `id.entry_id`: Entry ID
- `parent_record_id`: Parent Record ID
- `parent_object`: Parent Object
- `created_at`: Created At (datetime)
- `entry_values`: Entry Values (an object whose keys vary)

### `attio_create_list`

**Create List.** Creates a new list whose entries are records of the parent object. Lists cannot be deleted through the API. Workspace access other than Full access may need a paid plan; Full access works on every plan. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `api_slug` | string | yes |  | API Slug. Unique snake_case slug, e.g. `enterprise_pipeline`. |
| `parent_object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `workspace_access` | string | yes |  | Workspace Access. Access level for all workspace members. Full access works on every plan. One of `"full-access"`, `"read-and-write"`, `"read-only"`. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.list_id`: List ID
- `api_slug`: API Slug
- `name`: Name
- `parent_object`: Parent Object
- `workspace_access`: Workspace Access
- `workspace_member_access`: Workspace Member Access
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_create_meeting`

**Create Meeting.** Creates a meeting, e.g. to log an external call before attaching a recording with Create Call Recording. Not idempotent: repeated calls create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `description` | string | no |  | Description. |
| `start` | ISO date-time string | yes |  | Start. |
| `end` | ISO date-time string | yes |  | End. |
| `is_all_day` | boolean | no |  | All Day. Only the dates of Start and End are used. |
| `timezone` | string | no |  | Timezone. IANA timezone, e.g. `Europe/London`. |
| `participants` | array | yes |  | Participants. Each item: { `email_address`, `name`?, `is_organizer`?, `status`? }. |
| `linked_records` | array | no |  | Linked Records. Records to link to the meeting. Each item: { `object`, `record_id` }. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.meeting_id`: Meeting ID
- `title`: Title
- `description`: Description
- `is_all_day`: All Day (boolean)
- `start`: Start
- `start.datetime`: Date Time (datetime)
- `start.timezone`: Timezone
- `end`: End
- `end.datetime`: Date Time (datetime)
- `end.timezone`: Timezone
- `participants`: Participants
- `participants[].email_address`: Email (email)
- `participants[].name`: Name
- `participants[].status`: Status
- `participants[].is_organizer`: Organizer (boolean)
- `linked_records`: Linked Records
- `linked_records[].object_slug`: Object Slug
- `linked_records[].object_id`: Object ID
- `linked_records[].record_id`: Record ID
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_create_note`

**Create Note.** Creates a note on a record, in plain text or markdown, optionally linked to a meeting. Not idempotent: each call adds a new note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent_object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `parent_record_id` | string | yes |  | Record ID. ID of the record the note belongs to. |
| `title` | string | yes |  | Title. |
| `content` | string | yes |  | Content. |
| `format` | string | no |  | Format. Defaults to plain text. One of `"plaintext"`, `"markdown"`. |
| `meeting_id` | string | no |  | Meeting ID. Optional meeting to link, from List Meetings. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.note_id`: Note ID
- `parent_object`: Parent Object
- `parent_record_id`: Parent Record ID
- `title`: Title
- `meeting_id`: Meeting ID
- `content_plaintext`: Content (Plain Text)
- `content_markdown`: Content (Markdown)
- `tags`: Tags
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_create_object`

**Create Object.** Creates a new custom object type in the workspace. Add attributes to it with Create Attribute. Not idempotent; slugs must be unique. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `api_slug` | string | yes |  | API Slug. Unique snake_case slug, e.g. `projects`. |
| `singular_noun` | string | yes |  | Singular Noun. e.g. `Project`. |
| `plural_noun` | string | yes |  | Plural Noun. e.g. `Projects`. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `api_slug`: API Slug
- `singular_noun`: Singular Noun
- `plural_noun`: Plural Noun
- `created_at`: Created At (datetime)

### `attio_create_record`

**Create Record.** Creates a new record (person, company, deal or custom object) with the given attribute values. Use Upsert Record instead when the record may already exist. Not idempotent: each call creates a separate record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `values` | JSON | yes |  | Values. Attribute values keyed by attribute slug, e.g. {"name": "Acme", "domains": ["acme.com"]}. Use List Attributes for slugs and types. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.record_id`: Record ID
- `created_at`: Created At (datetime)
- `web_url`: Web URL (url)
- `values`: Values (an object whose keys vary)

### `attio_create_select_option`

**Create Select Option.** Adds a new option to a select or multiselect attribute. Options cannot be deleted, only archived with Update Select Option. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes |  | Target. Whether the attribute belongs to an object or a list. One of `"objects"`, `"lists"`. |
| `identifier` | string | yes |  | Object or List. Slug or ID of the object or list the attribute belongs to. |
| `attribute` | string | yes |  | Attribute. Attribute slug or ID. Use List Attributes to find it. |
| `title` | string | yes |  | Title. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.attribute_id`: Attribute ID
- `id.option_id`: Option ID
- `title`: Title
- `is_archived`: Archived (boolean)

### `attio_create_status`

**Create Status.** Adds a new status, e.g. a deal stage, to a status attribute. Statuses cannot be deleted, only archived with Update Status. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes |  | Target. Whether the attribute belongs to an object or a list. One of `"objects"`, `"lists"`. |
| `identifier` | string | yes |  | Object or List. Slug or ID of the object or list the attribute belongs to. |
| `attribute` | string | yes |  | Attribute. Attribute slug or ID. Use List Attributes to find it. |
| `title` | string | yes |  | Title. |
| `celebration_enabled` | boolean | no |  | Celebration Enabled. Show a celebration when a record reaches this status. |
| `target_time_in_status` | string | no |  | Target Time in Status. ISO 8601 duration, e.g. `P7D`. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.attribute_id`: Attribute ID
- `id.status_id`: Status ID
- `title`: Title
- `is_archived`: Archived (boolean)
- `target_time_in_status`: Target Time In Status (duration)
- `celebration_enabled`: Celebration Enabled (boolean)

### `attio_create_task`

**Create Task.** Creates a task with optional deadline, linked records and assignees (by workspace member email). Task content cannot be changed later. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Content. |
| `deadline_at` | ISO date-time string | no |  | Deadline. |
| `is_completed` | boolean | no |  | Completed. |
| `linked_records` | array | no |  | Linked Records. Records to link the task to. Each item: { `target_object`, `target_record_id` }. |
| `assignee_emails` | array | no |  | Assignee Emails. Workspace member email addresses to assign. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.task_id`: Task ID
- `content_plaintext`: Content
- `is_completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `deadline_at`: Deadline (datetime)
- `linked_records`: Linked Records
- `linked_records[].target_object_id`: Object ID
- `linked_records[].target_record_id`: Record ID
- `assignees`: Assignees
- `assignees[].referenced_actor_type`: Actor Type
- `assignees[].referenced_actor_id`: Actor ID
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_delete_call_recording`

**Delete Call Recording.** Permanently deletes a call recording and its transcript. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting ID. From List Meetings or Create Meeting. |
| `call_recording_id` | string | yes |  | Call Recording ID. From List Call Recordings. |

Output fields:

- `success`: Success (boolean)
- `call_recording_id`: Call Recording ID

### `attio_delete_comment`

**Delete Comment.** Permanently deletes a comment. Deleting the first comment of a thread deletes the whole thread. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. From List Threads or Create Comment. |

Output fields:

- `success`: Success (boolean)
- `comment_id`: Comment ID

### `attio_delete_file`

**Delete File.** Permanently deletes a file or folder; deleting a folder deletes everything inside it. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. From List Files. |

Output fields:

- `success`: Success (boolean)
- `file_id`: File ID

### `attio_delete_list_entry`

**Delete List Entry.** Removes an entry from a list. The parent record itself is not deleted. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. List slug or ID. Use List Lists to find it. |
| `entry_id` | string | yes |  | Entry ID. List entry ID (`id.entry_id`), from Query List Entries or Create List Entry. |

Output fields:

- `success`: Success (boolean)
- `entry_id`: Entry ID

### `attio_delete_meeting`

**Delete Meeting.** Permanently deletes a meeting and its recordings. Meetings from calendar sync cannot be deleted this way. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting ID. From List Meetings or Create Meeting. |

Output fields:

- `success`: Success (boolean)
- `meeting_id`: Meeting ID

### `attio_delete_note`

**Delete Note.** Permanently deletes a note by ID. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `note_id` | string | yes |  | Note ID. From List Notes or Create Note. |

Output fields:

- `success`: Success (boolean)
- `note_id`: Note ID

### `attio_delete_object`

**Delete Object.** Permanently deletes a custom object together with every record, attribute and list that depends on it. Only custom objects can be deleted; system objects such as people and companies are refused. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |

Output fields:

- `success`: Success (boolean)
- `object`: Object

### `attio_delete_record`

**Delete Record.** Permanently deletes a record by object and record ID. This cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `record_id` | string | yes |  | Record ID. Record ID (`id.record_id`), from Query Records, Search Records or Create Record. |

Output fields:

- `success`: Success (boolean)
- `record_id`: Record ID

### `attio_delete_task`

**Delete Task.** Permanently deletes a task by ID. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. From List Tasks or Create Task. |

Output fields:

- `success`: Success (boolean)
- `task_id`: Task ID

### `attio_download_file`

**Download File.** Downloads a native Attio file and returns it as a file reference with its name and type. Folders and connected files cannot be downloaded. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. From List Files. |

Output fields:

- `file`: File (url)
- `name`: Name
- `content_type`: Content Type
- `content_size`: Size (filesize)

### `attio_get_attribute`

**Get Attribute.** Gets one attribute by slug or ID, including its type and configuration. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes |  | Target. Whether the attribute belongs to an object or a list. One of `"objects"`, `"lists"`. |
| `identifier` | string | yes |  | Object or List. Slug or ID of the object or list the attribute belongs to. |
| `attribute` | string | yes |  | Attribute. Attribute slug or ID. Use List Attributes to find it. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.attribute_id`: Attribute ID
- `title`: Title
- `description`: Description
- `api_slug`: API Slug
- `type`: Type
- `is_system_attribute`: System Attribute (boolean)
- `is_writable`: Writable (boolean)
- `is_required`: Required (boolean)
- `is_unique`: Unique (boolean)
- `is_multiselect`: Multiselect (boolean)
- `is_default_value_enabled`: Default Value Enabled (boolean)
- `is_archived`: Archived (boolean)
- `default_value`: Default Value
- `relationship`: Relationship
- `relationship.id`: ID
- `relationship.id.workspace_id`: Workspace ID
- `relationship.id.object_id`: Object ID
- `relationship.id.attribute_id`: Attribute ID
- `relationship.object_slug`: Object Slug
- `relationship.api_slug`: API Slug
- `relationship.is_multiselect`: Multiselect (boolean)
- `relationship.title`: Title
- `created_at`: Created At (datetime)

### `attio_get_call_recording`

**Get Call Recording.** Gets one call recording, including its transcript when processing has finished (status `completed`). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting ID. From List Meetings or Create Meeting. |
| `call_recording_id` | string | yes |  | Call Recording ID. From List Call Recordings. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.meeting_id`: Meeting ID
- `id.call_recording_id`: Call Recording ID
- `status`: Status
- `web_url`: Web URL (url)
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)
- `video_url`: Video URL (url)
- `transcript`: Transcript
- `transcript.segments`: Segments
- `transcript.segments[].speech`: Speech
- `transcript.segments[].start_time`: Start Time (s) (number)
- `transcript.segments[].end_time`: End Time (s) (number)
- `transcript.segments[].speaker`: Speaker
- `transcript.segments[].speaker.name`: Name
- `transcript.raw_transcript`: Raw Transcript

### `attio_get_comment`

**Get Comment.** Gets one comment by ID, with its thread, author and the record or entry it is on. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. From List Threads or Create Comment. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.comment_id`: Comment ID
- `thread_id`: Thread ID
- `content_plaintext`: Content
- `author`: Author
- `author.type`: Type
- `author.id`: ID
- `record`: Record
- `record.record_id`: Record ID
- `record.object_id`: Object ID
- `entry`: Entry
- `resolved_at`: Resolved At (datetime)
- `resolved_by`: Resolved By
- `created_at`: Created At (datetime)

### `attio_get_file`

**Get File.** Gets metadata of one file or folder. Use Download File for the content. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. From List Files. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.file_id`: File ID
- `name`: Name
- `file_type`: File Type
- `content_type`: Content Type
- `content_size`: Size (filesize)
- `parent_folder_id`: Parent Folder ID
- `object_id`: Object ID
- `object_slug`: Object Slug
- `record_id`: Record ID
- `storage_provider`: Storage Provider
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_get_list_entry`

**Get List Entry.** Gets one list entry by list and entry ID, with its list-specific values. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. List slug or ID. Use List Lists to find it. |
| `entry_id` | string | yes |  | Entry ID. List entry ID (`id.entry_id`), from Query List Entries or Create List Entry. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.list_id`: List ID
- `id.entry_id`: Entry ID
- `parent_record_id`: Parent Record ID
- `parent_object`: Parent Object
- `created_at`: Created At (datetime)
- `entry_values`: Entry Values (an object whose keys vary)

### `attio_get_list`

**Get List.** Gets one list by slug or ID, including its parent object and access settings. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. List slug or ID. Use List Lists to find it. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.list_id`: List ID
- `api_slug`: API Slug
- `name`: Name
- `parent_object`: Parent Object
- `workspace_access`: Workspace Access
- `workspace_member_access`: Workspace Member Access
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_get_meeting`

**Get Meeting.** Gets one meeting by ID, with participants and linked records. Use List Call Recordings for its recordings. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting ID. From List Meetings or Create Meeting. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.meeting_id`: Meeting ID
- `title`: Title
- `description`: Description
- `is_all_day`: All Day (boolean)
- `start`: Start
- `start.datetime`: Date Time (datetime)
- `start.timezone`: Timezone
- `end`: End
- `end.datetime`: Date Time (datetime)
- `end.timezone`: Timezone
- `participants`: Participants
- `participants[].email_address`: Email (email)
- `participants[].name`: Name
- `participants[].status`: Status
- `participants[].is_organizer`: Organizer (boolean)
- `linked_records`: Linked Records
- `linked_records[].object_slug`: Object Slug
- `linked_records[].object_id`: Object ID
- `linked_records[].record_id`: Record ID
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_get_note`

**Get Note.** Gets one note by ID, with its title and content in plaintext and markdown. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `note_id` | string | yes |  | Note ID. From List Notes or Create Note. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.note_id`: Note ID
- `parent_object`: Parent Object
- `parent_record_id`: Parent Record ID
- `title`: Title
- `meeting_id`: Meeting ID
- `content_plaintext`: Content (Plain Text)
- `content_markdown`: Content (Markdown)
- `tags`: Tags
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_get_object`

**Get Object.** Gets one object by slug or ID, with its singular and plural names. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `api_slug`: API Slug
- `singular_noun`: Singular Noun
- `plural_noun`: Plural Noun
- `created_at`: Created At (datetime)

### `attio_get_record`

**Get Record.** Gets one record by object and record ID, with its attribute values flattened. Use Query Records or Search Records to find the ID first. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `record_id` | string | yes |  | Record ID. Record ID (`id.record_id`), from Query Records, Search Records or Create Record. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.record_id`: Record ID
- `created_at`: Created At (datetime)
- `web_url`: Web URL (url)
- `values`: Values (an object whose keys vary)

### `attio_get_self`

**Get Current Token.** Returns whether the token is active, its workspace and granted scopes. Use it to check which actions the connection can run. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `active`: Active (boolean)
- `workspace_id`: Workspace ID
- `workspace_name`: Workspace Name
- `workspace_slug`: Workspace Slug
- `workspace_logo_url`: Workspace Logo (image)
- `authorized_by_workspace_member_id`: Authorized By Member ID
- `token_level`: Token Level
- `scope`: Scopes

### `attio_get_task`

**Get Task.** Gets one task by ID, with its content, deadline, assignees and linked records. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. From List Tasks or Create Task. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.task_id`: Task ID
- `content_plaintext`: Content
- `is_completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `deadline_at`: Deadline (datetime)
- `linked_records`: Linked Records
- `linked_records[].target_object_id`: Object ID
- `linked_records[].target_record_id`: Record ID
- `assignees`: Assignees
- `assignees[].referenced_actor_type`: Actor Type
- `assignees[].referenced_actor_id`: Actor ID
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_get_thread`

**Get Thread.** Gets a thread with its comments, oldest first, up to 250 per page. Pass the returned cursor to read more. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `thread_id` | string | yes |  | Thread ID. From List Threads or a comment. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 250). |
| `cursor` | string | no |  | Cursor. Pagination cursor from the previous response (`pagination.next_cursor`). |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.thread_id`: Thread ID
- `comments`: Comments
- `comments[].id`: ID
- `comments[].id.workspace_id`: Workspace ID
- `comments[].id.comment_id`: Comment ID
- `comments[].thread_id`: Thread ID
- `comments[].content_plaintext`: Content
- `comments[].author`: Author
- `comments[].author.type`: Type
- `comments[].author.id`: ID
- `comments[].record`: Record
- `comments[].record.record_id`: Record ID
- `comments[].record.object_id`: Object ID
- `comments[].entry`: Entry
- `comments[].resolved_at`: Resolved At (datetime)
- `comments[].resolved_by`: Resolved By
- `comments[].created_at`: Created At (datetime)
- `created_at`: Created At (datetime)
- `next_cursor`: Next Cursor

### `attio_get_workspace_member`

**Get Workspace Member.** Gets one workspace member by ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_member_id` | string | yes |  | Workspace Member ID. From List Workspace Members. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.workspace_member_id`: Workspace Member ID
- `first_name`: First Name
- `last_name`: Last Name
- `email_address`: Email (email)
- `avatar_url`: Avatar (image)
- `access_level`: Access Level
- `created_at`: Created At (datetime)

### `attio_link_meeting_records`

**Link Meeting Records.** Adds records to the meeting linked records; already-linked records are ignored and existing links are kept. Use Replace Meeting Records to unlink. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting ID. From List Meetings or Create Meeting. |
| `linked_records` | array | no |  | Linked Records. Records to link to the meeting. Each item: { `object`, `record_id` }. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.meeting_id`: Meeting ID
- `title`: Title
- `description`: Description
- `is_all_day`: All Day (boolean)
- `start`: Start
- `start.datetime`: Date Time (datetime)
- `start.timezone`: Timezone
- `end`: End
- `end.datetime`: Date Time (datetime)
- `end.timezone`: Timezone
- `participants`: Participants
- `participants[].email_address`: Email (email)
- `participants[].name`: Name
- `participants[].status`: Status
- `participants[].is_organizer`: Organizer (boolean)
- `linked_records`: Linked Records
- `linked_records[].object_slug`: Object Slug
- `linked_records[].object_id`: Object ID
- `linked_records[].record_id`: Record ID
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_list_attributes`

**List Attributes.** Lists attributes (fields) of an object or list with their slug, type and settings. Use it before writing values to learn slugs and types. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes |  | Target. Whether the attribute belongs to an object or a list. One of `"objects"`, `"lists"`. |
| `identifier` | string | yes |  | Object or List. Slug or ID of the object or list the attribute belongs to. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 1000). |
| `offset` | number | no |  | Offset. Number of results to skip, for pagination. |
| `show_archived` | boolean | no |  | Show Archived. Include archived items. |

Output fields:

- `attributes`: Attributes
- `attributes[].id`: ID
- `attributes[].id.workspace_id`: Workspace ID
- `attributes[].id.object_id`: Object ID
- `attributes[].id.attribute_id`: Attribute ID
- `attributes[].title`: Title
- `attributes[].description`: Description
- `attributes[].api_slug`: API Slug
- `attributes[].type`: Type
- `attributes[].is_system_attribute`: System Attribute (boolean)
- `attributes[].is_writable`: Writable (boolean)
- `attributes[].is_required`: Required (boolean)
- `attributes[].is_unique`: Unique (boolean)
- `attributes[].is_multiselect`: Multiselect (boolean)
- `attributes[].is_default_value_enabled`: Default Value Enabled (boolean)
- `attributes[].is_archived`: Archived (boolean)
- `attributes[].default_value`: Default Value
- `attributes[].relationship`: Relationship
- `attributes[].relationship.id`: ID
- `attributes[].relationship.id.workspace_id`: Workspace ID
- `attributes[].relationship.id.object_id`: Object ID
- `attributes[].relationship.id.attribute_id`: Attribute ID
- `attributes[].relationship.object_slug`: Object Slug
- `attributes[].relationship.api_slug`: API Slug
- `attributes[].relationship.is_multiselect`: Multiselect (boolean)
- `attributes[].relationship.title`: Title
- `attributes[].created_at`: Created At (datetime)
- `count`: Count (number)

### `attio_list_call_recordings`

**List Call Recordings.** Lists call recordings of a meeting with their status. Use Get Call Recording for the transcript. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting ID. From List Meetings or Create Meeting. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 200). |
| `cursor` | string | no |  | Cursor. Pagination cursor from the previous response (`pagination.next_cursor`). |

Output fields:

- `call_recordings`: Call Recordings
- `call_recordings[].id`: ID
- `call_recordings[].id.workspace_id`: Workspace ID
- `call_recordings[].id.meeting_id`: Meeting ID
- `call_recordings[].id.call_recording_id`: Call Recording ID
- `call_recordings[].status`: Status
- `call_recordings[].web_url`: Web URL (url)
- `call_recordings[].created_by_actor`: Created By
- `call_recordings[].created_by_actor.type`: Type
- `call_recordings[].created_by_actor.id`: ID
- `call_recordings[].created_at`: Created At (datetime)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `attio_list_files`

**List Files.** Lists files and folders attached to a record, optionally inside one folder or from one storage provider. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `record_id` | string | yes |  | Record ID. ID of the record the files belong to. |
| `parent_folder_id` | string | no |  | Parent Folder ID. Only list this folder. |
| `storage_provider` | string | no |  | Storage Provider. One of `"attio"`, `"dropbox"`, `"box"`, `"google-drive"`, `"microsoft-onedrive"`. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 200). |
| `cursor` | string | no |  | Cursor. Pagination cursor from the previous response (`pagination.next_cursor`). |

Output fields:

- `files`: Files
- `files[].id`: ID
- `files[].id.workspace_id`: Workspace ID
- `files[].id.file_id`: File ID
- `files[].name`: Name
- `files[].file_type`: File Type
- `files[].content_type`: Content Type
- `files[].content_size`: Size (filesize)
- `files[].parent_folder_id`: Parent Folder ID
- `files[].object_id`: Object ID
- `files[].object_slug`: Object Slug
- `files[].record_id`: Record ID
- `files[].storage_provider`: Storage Provider
- `files[].created_by_actor`: Created By
- `files[].created_by_actor.type`: Type
- `files[].created_by_actor.id`: ID
- `files[].created_at`: Created At (datetime)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `attio_list_list_entry_attribute_values`

**List List Entry Attribute Values.** Lists the values of one list attribute on an entry, optionally including historic values to see how it changed, e.g. stage history. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. List slug or ID. Use List Lists to find it. |
| `entry_id` | string | yes |  | Entry ID. List entry ID (`id.entry_id`), from Query List Entries or Create List Entry. |
| `attribute` | string | yes |  | Attribute. Attribute slug or ID. Use List Attributes to find it. |
| `show_historic` | boolean | no |  | Show Historic. Include values that are no longer active. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 500). |
| `offset` | number | no |  | Offset. Number of results to skip, for pagination. |

Output fields:

- `values`: Values
- `values[].active_from`: Active From (datetime)
- `values[].active_until`: Active Until (datetime)
- `values[].created_by_actor`: Created By
- `values[].created_by_actor.type`: Type
- `values[].created_by_actor.id`: ID
- `values[].value`: Value
- `values[].attribute_type`: Attribute Type
- `count`: Count (number)

### `attio_list_list_views`

**List List Views.** Lists saved views for a list, with their IDs and titles. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. List slug or ID. Use List Lists to find it. |
| `show_archived` | boolean | no |  | Show Archived. Include archived views. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 100). |
| `cursor` | string | no |  | Cursor. Pagination cursor from the previous response (`pagination.next_cursor`). |

Output fields:

- `views`: Views
- `views[].id`: ID
- `views[].id.workspace_id`: Workspace ID
- `views[].id.list_id`: List ID
- `views[].id.view_id`: View ID
- `views[].title`: Title
- `views[].created_at`: Created At (datetime)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `attio_list_lists`

**List Lists.** Lists every list in the workspace with its ID, slug and parent object. Use it to resolve a list name to the slug or ID the list-entry actions need. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `lists`: Lists
- `lists[].id`: ID
- `lists[].id.workspace_id`: Workspace ID
- `lists[].id.list_id`: List ID
- `lists[].api_slug`: API Slug
- `lists[].name`: Name
- `lists[].parent_object`: Parent Object
- `lists[].workspace_access`: Workspace Access
- `lists[].workspace_member_access`: Workspace Member Access
- `lists[].created_by_actor`: Created By
- `lists[].created_by_actor.type`: Type
- `lists[].created_by_actor.id`: ID
- `lists[].created_at`: Created At (datetime)
- `count`: Count (number)

### `attio_list_meetings`

**List Meetings.** Lists meetings, optionally filtered by linked record, participant emails or time range, sorted by start time. Paginate with the returned cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linked_object` | string | no |  | Linked Object. Object slug, with Linked Record ID. |
| `linked_record_id` | string | no |  | Linked Record ID. |
| `participants` | string | no |  | Participants. Comma-separated participant email addresses. |
| `ends_from` | ISO date-time string | no |  | Ends From. Only meetings ending at or after this time. |
| `starts_before` | ISO date-time string | no |  | Starts Before. Only meetings starting before this time. |
| `sort` | string | no |  | Sort. One of `"start_asc"`, `"start_desc"`. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 200). |
| `cursor` | string | no |  | Cursor. Pagination cursor from the previous response (`pagination.next_cursor`). |

Output fields:

- `meetings`: Meetings
- `meetings[].id`: ID
- `meetings[].id.workspace_id`: Workspace ID
- `meetings[].id.meeting_id`: Meeting ID
- `meetings[].title`: Title
- `meetings[].description`: Description
- `meetings[].is_all_day`: All Day (boolean)
- `meetings[].start`: Start
- `meetings[].start.datetime`: Date Time (datetime)
- `meetings[].start.timezone`: Timezone
- `meetings[].end`: End
- `meetings[].end.datetime`: Date Time (datetime)
- `meetings[].end.timezone`: Timezone
- `meetings[].participants`: Participants
- `meetings[].participants[].email_address`: Email (email)
- `meetings[].participants[].name`: Name
- `meetings[].participants[].status`: Status
- `meetings[].participants[].is_organizer`: Organizer (boolean)
- `meetings[].linked_records`: Linked Records
- `meetings[].linked_records[].object_slug`: Object Slug
- `meetings[].linked_records[].object_id`: Object ID
- `meetings[].linked_records[].record_id`: Record ID
- `meetings[].created_by_actor`: Created By
- `meetings[].created_by_actor.type`: Type
- `meetings[].created_by_actor.id`: ID
- `meetings[].created_at`: Created At (datetime)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `attio_list_notes`

**List Notes.** Lists notes in the workspace, or only those on one record when Parent Object and Parent Record ID are given. Returns plaintext and markdown content. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent_object` | string | no |  | Parent Object. Object slug, e.g. `people`. Use with Parent Record ID. |
| `parent_record_id` | string | no |  | Parent Record ID. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 50). |
| `offset` | number | no |  | Offset. Number of results to skip, for pagination. |

Output fields:

- `notes`: Notes
- `notes[].id`: ID
- `notes[].id.workspace_id`: Workspace ID
- `notes[].id.note_id`: Note ID
- `notes[].parent_object`: Parent Object
- `notes[].parent_record_id`: Parent Record ID
- `notes[].title`: Title
- `notes[].meeting_id`: Meeting ID
- `notes[].content_plaintext`: Content (Plain Text)
- `notes[].content_markdown`: Content (Markdown)
- `notes[].tags`: Tags
- `notes[].created_by_actor`: Created By
- `notes[].created_by_actor.type`: Type
- `notes[].created_by_actor.id`: ID
- `notes[].created_at`: Created At (datetime)
- `count`: Count (number)

### `attio_list_object_views`

**List Object Views.** Lists saved views for an object. A view ID can be used as `filter_view_id` context when browsing records in the Attio UI. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `show_archived` | boolean | no |  | Show Archived. Include archived views. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 100). |
| `cursor` | string | no |  | Cursor. Pagination cursor from the previous response (`pagination.next_cursor`). |

Output fields:

- `views`: Views
- `views[].id`: ID
- `views[].id.workspace_id`: Workspace ID
- `views[].id.object_id`: Object ID
- `views[].id.view_id`: View ID
- `views[].title`: Title
- `views[].created_at`: Created At (datetime)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `attio_list_objects`

**List Objects.** Lists every object (people, companies, deals, users, workspaces and custom objects) with its ID and slug. Use it to find the object slug other actions need. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `objects`: Objects
- `objects[].id`: ID
- `objects[].id.workspace_id`: Workspace ID
- `objects[].id.object_id`: Object ID
- `objects[].api_slug`: API Slug
- `objects[].singular_noun`: Singular Noun
- `objects[].plural_noun`: Plural Noun
- `objects[].created_at`: Created At (datetime)
- `count`: Count (number)

### `attio_list_record_attribute_values`

**List Record Attribute Values.** Lists the values of one attribute on a record, optionally including historic values to see how it changed over time. Historic values are not available for some attribute types (e.g. COMINT or enriched attributes). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `record_id` | string | yes |  | Record ID. Record ID (`id.record_id`), from Query Records, Search Records or Create Record. |
| `attribute` | string | yes |  | Attribute. Attribute slug or ID. Use List Attributes to find it. |
| `show_historic` | boolean | no |  | Show Historic. Include values that are no longer active. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 500). |
| `offset` | number | no |  | Offset. Number of results to skip, for pagination. |

Output fields:

- `values`: Values
- `values[].active_from`: Active From (datetime)
- `values[].active_until`: Active Until (datetime)
- `values[].created_by_actor`: Created By
- `values[].created_by_actor.type`: Type
- `values[].created_by_actor.id`: ID
- `values[].value`: Value
- `values[].attribute_type`: Attribute Type
- `count`: Count (number)

### `attio_list_record_entries`

**List Record Entries.** Lists every list entry whose parent is this record, i.e. which lists the record is in, with list and entry IDs for the list-entry actions. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `record_id` | string | yes |  | Record ID. Record ID (`id.record_id`), from Query Records, Search Records or Create Record. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 1000). |
| `offset` | number | no |  | Offset. Number of results to skip, for pagination. |

Output fields:

- `entries`: Entries
- `entries[].entry_id`: Entry ID
- `entries[].list_id`: List ID
- `entries[].list_api_slug`: List API Slug
- `entries[].created_at`: Created At (datetime)
- `count`: Count (number)

### `attio_list_select_options`

**List Select Options.** Lists the options of a select or multiselect attribute, with IDs and titles to use when writing values. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes |  | Target. Whether the attribute belongs to an object or a list. One of `"objects"`, `"lists"`. |
| `identifier` | string | yes |  | Object or List. Slug or ID of the object or list the attribute belongs to. |
| `attribute` | string | yes |  | Attribute. Attribute slug or ID. Use List Attributes to find it. |
| `show_archived` | boolean | no |  | Show Archived. Include archived items. |

Output fields:

- `options`: Options
- `options[].id`: ID
- `options[].id.workspace_id`: Workspace ID
- `options[].id.object_id`: Object ID
- `options[].id.attribute_id`: Attribute ID
- `options[].id.option_id`: Option ID
- `options[].title`: Title
- `options[].is_archived`: Archived (boolean)
- `count`: Count (number)

### `attio_list_statuses`

**List Statuses.** Lists the statuses of a status attribute, e.g. deal stages, with IDs and titles to use when writing values. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes |  | Target. Whether the attribute belongs to an object or a list. One of `"objects"`, `"lists"`. |
| `identifier` | string | yes |  | Object or List. Slug or ID of the object or list the attribute belongs to. |
| `attribute` | string | yes |  | Attribute. Attribute slug or ID. Use List Attributes to find it. |
| `show_archived` | boolean | no |  | Show Archived. Include archived items. |

Output fields:

- `statuses`: Statuses
- `statuses[].id`: ID
- `statuses[].id.workspace_id`: Workspace ID
- `statuses[].id.object_id`: Object ID
- `statuses[].id.attribute_id`: Attribute ID
- `statuses[].id.status_id`: Status ID
- `statuses[].title`: Title
- `statuses[].is_archived`: Archived (boolean)
- `statuses[].target_time_in_status`: Target Time In Status (duration)
- `statuses[].celebration_enabled`: Celebration Enabled (boolean)
- `count`: Count (number)

### `attio_list_tasks`

**List Tasks.** Lists tasks, optionally filtered by linked record, assignee or completion, and sorted by creation or completion date. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linked_object` | string | no |  | Linked Object. Object slug, e.g. `people`. Use with Linked Record ID. |
| `linked_record_id` | string | no |  | Linked Record ID. |
| `assignee` | string | no |  | Assignee. Workspace member email or ID. |
| `is_completed` | string | no |  | Completed. Leave empty for all tasks. One of `"true"`, `"false"`. |
| `sort` | string | no |  | Sort. One of `"created_at:asc"`, `"created_at:desc"`, `"completed_at:asc"`, `"completed_at:desc"`. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 500). |
| `offset` | number | no |  | Offset. Number of results to skip, for pagination. |

Output fields:

- `tasks`: Tasks
- `tasks[].id`: ID
- `tasks[].id.workspace_id`: Workspace ID
- `tasks[].id.task_id`: Task ID
- `tasks[].content_plaintext`: Content
- `tasks[].is_completed`: Completed (boolean)
- `tasks[].completed_at`: Completed At (datetime)
- `tasks[].deadline_at`: Deadline (datetime)
- `tasks[].linked_records`: Linked Records
- `tasks[].linked_records[].target_object_id`: Object ID
- `tasks[].linked_records[].target_record_id`: Record ID
- `tasks[].assignees`: Assignees
- `tasks[].assignees[].referenced_actor_type`: Actor Type
- `tasks[].assignees[].referenced_actor_id`: Actor ID
- `tasks[].created_by_actor`: Created By
- `tasks[].created_by_actor.type`: Type
- `tasks[].created_by_actor.id`: ID
- `tasks[].created_at`: Created At (datetime)
- `count`: Count (number)

### `attio_list_threads`

**List Threads.** Lists comment threads on a record (Object with Record ID) or a list entry (List with Entry ID). Each thread includes up to 80 replies; use Get Thread for more. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | no |  | Object. Object slug, with Record ID. |
| `record_id` | string | no |  | Record ID. |
| `list` | string | no |  | List. List slug or ID, with Entry ID. |
| `entry_id` | string | no |  | Entry ID. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 50). |
| `offset` | number | no |  | Offset. Number of results to skip, for pagination. |

Output fields:

- `threads`: Threads
- `threads[].id`: ID
- `threads[].id.workspace_id`: Workspace ID
- `threads[].id.thread_id`: Thread ID
- `threads[].comments`: Comments
- `threads[].comments[].id`: ID
- `threads[].comments[].id.workspace_id`: Workspace ID
- `threads[].comments[].id.comment_id`: Comment ID
- `threads[].comments[].thread_id`: Thread ID
- `threads[].comments[].content_plaintext`: Content
- `threads[].comments[].author`: Author
- `threads[].comments[].author.type`: Type
- `threads[].comments[].author.id`: ID
- `threads[].comments[].record`: Record
- `threads[].comments[].record.record_id`: Record ID
- `threads[].comments[].record.object_id`: Object ID
- `threads[].comments[].entry`: Entry
- `threads[].comments[].resolved_at`: Resolved At (datetime)
- `threads[].comments[].resolved_by`: Resolved By
- `threads[].comments[].created_at`: Created At (datetime)
- `threads[].has_more_comments`: Has More Comments (boolean)
- `threads[].created_at`: Created At (datetime)
- `count`: Count (number)

### `attio_list_workspace_members`

**List Workspace Members.** Lists workspace members with ID, name, email and access level. Use it to resolve a person to the member ID or email that tasks, comments and actor attributes need. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `members`: Members
- `members[].id`: ID
- `members[].id.workspace_id`: Workspace ID
- `members[].id.workspace_member_id`: Workspace Member ID
- `members[].first_name`: First Name
- `members[].last_name`: Last Name
- `members[].email_address`: Email (email)
- `members[].avatar_url`: Avatar (image)
- `members[].access_level`: Access Level
- `members[].created_at`: Created At (datetime)
- `count`: Count (number)

### `attio_merge_records`

**Merge Records.** Merges the secondary record into the primary one; where both have a value the primary wins, and the secondary record is removed. This cannot be undone. Both IDs must belong to the same object. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `primary_record_id` | string | yes |  | Record ID. ID of the record to keep. |
| `secondary_record_id` | string | yes |  | Record ID. ID of the record merged into the primary and then removed. |

Output fields:

- `new_record_id`: Merged Record ID

### `attio_overwrite_list_entry`

**Overwrite List Entry.** Updates the supplied values on a list entry, replacing (not appending to) multiselect values. Use Update List Entry to append instead. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. List slug or ID. Use List Lists to find it. |
| `entry_id` | string | yes |  | Entry ID. List entry ID (`id.entry_id`), from Query List Entries or Create List Entry. |
| `entry_values` | JSON | yes |  | Entry Values. List-specific attribute values keyed by attribute slug, e.g. {"stage": "Qualified"}. Use List Attributes with target `lists` for slugs. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.list_id`: List ID
- `id.entry_id`: Entry ID
- `parent_record_id`: Parent Record ID
- `parent_object`: Parent Object
- `created_at`: Created At (datetime)
- `entry_values`: Entry Values (an object whose keys vary)

### `attio_overwrite_record`

**Overwrite Record.** Updates the supplied attribute values on a record, replacing (not appending to) multiselect values. Attributes not supplied are left untouched. Use Update Record to append instead. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `record_id` | string | yes |  | Record ID. Record ID (`id.record_id`), from Query Records, Search Records or Create Record. |
| `values` | JSON | yes |  | Values. Attribute values keyed by attribute slug, e.g. {"name": "Acme", "domains": ["acme.com"]}. Use List Attributes for slugs and types. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.record_id`: Record ID
- `created_at`: Created At (datetime)
- `web_url`: Web URL (url)
- `values`: Values (an object whose keys vary)

### `attio_query_list_entries`

**Query List Entries.** Lists entries of one list, optionally filtered and sorted by list or parent-record attributes, e.g. {"stage": "Won"}. Paginate with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. List slug or ID. Use List Lists to find it. |
| `filter` | JSON | no |  | Filter. Attio filter object, e.g. {"stage": "Won"}. |
| `sorts` | array | no |  | Sorts. Sort order, applied in sequence. Each item: { `attribute`, `field`?, `direction` }. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 500). |
| `offset` | number | no |  | Offset. Number of results to skip, for pagination. |

Output fields:

- `entries`: Entries
- `entries[].id`: ID
- `entries[].id.workspace_id`: Workspace ID
- `entries[].id.list_id`: List ID
- `entries[].id.entry_id`: Entry ID
- `entries[].parent_record_id`: Parent Record ID
- `entries[].parent_object`: Parent Object
- `entries[].created_at`: Created At (datetime)
- `entries[].entry_values`: Entry Values (an object whose keys vary)
- `count`: Count (number)

### `attio_query_records`

**Query Records.** Lists records of one object, optionally filtered and sorted with Attio filter syntax, e.g. {"name": "Acme"} or {"email_addresses": {"$contains": "@acme.com"}}. Use Search Records for fuzzy text search across objects. Paginate with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `filter` | JSON | no |  | Filter. Attio filter object, e.g. {"name": "Acme"} or {"$and": [...]}. |
| `sorts` | array | no |  | Sorts. Sort order, applied in sequence. Each item: { `attribute`, `field`?, `direction` }. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 500). |
| `offset` | number | no |  | Offset. Number of results to skip, for pagination. |

Output fields:

- `records`: Records
- `records[].id`: ID
- `records[].id.workspace_id`: Workspace ID
- `records[].id.object_id`: Object ID
- `records[].id.record_id`: Record ID
- `records[].created_at`: Created At (datetime)
- `records[].web_url`: Web URL (url)
- `records[].values`: Values (an object whose keys vary)
- `count`: Count (number)

### `attio_replace_meeting_records`

**Replace Meeting Records.** Sets the meeting linked records to exactly the given list; any record not in it is unlinked, including ones linked automatically. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting ID. From List Meetings or Create Meeting. |
| `linked_records` | array | no |  | Linked Records. Records to link to the meeting. Each item: { `object`, `record_id` }. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.meeting_id`: Meeting ID
- `title`: Title
- `description`: Description
- `is_all_day`: All Day (boolean)
- `start`: Start
- `start.datetime`: Date Time (datetime)
- `start.timezone`: Timezone
- `end`: End
- `end.datetime`: Date Time (datetime)
- `end.timezone`: Timezone
- `participants`: Participants
- `participants[].email_address`: Email (email)
- `participants[].name`: Name
- `participants[].status`: Status
- `participants[].is_organizer`: Organizer (boolean)
- `linked_records`: Linked Records
- `linked_records[].object_slug`: Object Slug
- `linked_records[].object_id`: Object ID
- `linked_records[].record_id`: Record ID
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_search_records`

**Search Records.** Fuzzy-searches records by text (names, domains, emails, phone numbers) across the given objects. Results are eventually consistent and may miss very recent changes; use Query Records for exact filters. Returns record IDs for Get Record. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Text to search for. An empty string returns default results. |
| `objects` | array | yes |  | Objects. Object slugs or IDs to search, e.g. `people`, `companies`. |
| `limit` | number | no |  | Limit. Maximum number of results to return (up to 25). |

Output fields:

- `results`: Results
- `results[].id`: ID
- `results[].id.workspace_id`: Workspace ID
- `results[].id.object_id`: Object ID
- `results[].id.record_id`: Record ID
- `results[].object_slug`: Object Slug
- `results[].record_text`: Record Text
- `results[].record_image`: Record Image (image)
- `results[].domains`: Domains
- `count`: Count (number)

### `attio_unsubscribe_emails`

**Unsubscribe Emails.** Adds email addresses to the workspace sequence unsubscribe list, so they cannot be enrolled in sequences and active enrolments stop. The API cannot remove addresses again. Re-adding an address is harmless. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_addresses` | array | yes |  | Email Addresses. |

Output fields:

- `unsubscribed`: Unsubscribed
- `unsubscribed[].email_address`: Email (email)
- `unsubscribed[].created_at`: Created At (datetime)
- `count`: Count (number)

### `attio_update_attribute`

**Update Attribute.** Updates only the supplied fields of an attribute. Set Archived to Yes to archive it (the API has no delete). Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes |  | Target. Whether the attribute belongs to an object or a list. One of `"objects"`, `"lists"`. |
| `identifier` | string | yes |  | Object or List. Slug or ID of the object or list the attribute belongs to. |
| `attribute` | string | yes |  | Attribute. Attribute slug or ID. Use List Attributes to find it. |
| `title` | string | no |  | Title. |
| `api_slug` | string | no |  | API Slug. |
| `description` | string | no |  | Description. |
| `is_required` | string | no |  | Required. Leave empty to keep the current setting. One of `"true"`, `"false"`. |
| `is_unique` | string | no |  | Unique. Leave empty to keep the current setting. One of `"true"`, `"false"`. |
| `is_archived` | string | no |  | Archived. Yes archives the attribute; No restores it. One of `"true"`, `"false"`. |
| `config` | JSON | no |  | Config. Type-specific config to change. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.attribute_id`: Attribute ID
- `title`: Title
- `description`: Description
- `api_slug`: API Slug
- `type`: Type
- `is_system_attribute`: System Attribute (boolean)
- `is_writable`: Writable (boolean)
- `is_required`: Required (boolean)
- `is_unique`: Unique (boolean)
- `is_multiselect`: Multiselect (boolean)
- `is_default_value_enabled`: Default Value Enabled (boolean)
- `is_archived`: Archived (boolean)
- `default_value`: Default Value
- `relationship`: Relationship
- `relationship.id`: ID
- `relationship.id.workspace_id`: Workspace ID
- `relationship.id.object_id`: Object ID
- `relationship.id.attribute_id`: Attribute ID
- `relationship.object_slug`: Object Slug
- `relationship.api_slug`: API Slug
- `relationship.is_multiselect`: Multiselect (boolean)
- `relationship.title`: Title
- `created_at`: Created At (datetime)

### `attio_update_list_entry`

**Update List Entry.** Updates only the supplied values on a list entry; multiselect values are appended. Use Overwrite List Entry to replace multiselect values. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. List slug or ID. Use List Lists to find it. |
| `entry_id` | string | yes |  | Entry ID. List entry ID (`id.entry_id`), from Query List Entries or Create List Entry. |
| `entry_values` | JSON | yes |  | Entry Values. List-specific attribute values keyed by attribute slug, e.g. {"stage": "Qualified"}. Use List Attributes with target `lists` for slugs. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.list_id`: List ID
- `id.entry_id`: Entry ID
- `parent_record_id`: Parent Record ID
- `parent_object`: Parent Object
- `created_at`: Created At (datetime)
- `entry_values`: Entry Values (an object whose keys vary)

### `attio_update_list`

**Update List.** Updates only the supplied fields of a list; omitted fields keep their current value. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. List slug or ID. Use List Lists to find it. |
| `name` | string | no |  | Name. |
| `api_slug` | string | no |  | API Slug. |
| `workspace_access` | string | no |  | Workspace Access. One of `"full-access"`, `"read-and-write"`, `"read-only"`. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.list_id`: List ID
- `api_slug`: API Slug
- `name`: Name
- `parent_object`: Parent Object
- `workspace_access`: Workspace Access
- `workspace_member_access`: Workspace Member Access
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_update_note`

**Update Note.** Updates only the supplied fields of a note. Content replaces the existing body. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `note_id` | string | yes |  | Note ID. From List Notes or Create Note. |
| `title` | string | no |  | Title. |
| `content` | string | no |  | Content. Replaces the whole note body. |
| `format` | string | no |  | Format. Format of Content. Defaults to plain text. One of `"plaintext"`, `"markdown"`. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.note_id`: Note ID
- `parent_object`: Parent Object
- `parent_record_id`: Parent Record ID
- `title`: Title
- `meeting_id`: Meeting ID
- `content_plaintext`: Content (Plain Text)
- `content_markdown`: Content (Markdown)
- `tags`: Tags
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_update_object`

**Update Object.** Updates only the supplied fields of an object. Changing the slug breaks integrations that use the old one. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `api_slug` | string | no |  | API Slug. |
| `singular_noun` | string | no |  | Singular Noun. |
| `plural_noun` | string | no |  | Plural Noun. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `api_slug`: API Slug
- `singular_noun`: Singular Noun
- `plural_noun`: Plural Noun
- `created_at`: Created At (datetime)

### `attio_update_record`

**Update Record.** Updates only the supplied attribute values on a record; other attributes are left untouched. Multiselect values are appended to existing ones; use Overwrite Record to replace them. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `record_id` | string | yes |  | Record ID. Record ID (`id.record_id`), from Query Records, Search Records or Create Record. |
| `values` | JSON | yes |  | Values. Attribute values keyed by attribute slug, e.g. {"name": "Acme", "domains": ["acme.com"]}. Use List Attributes for slugs and types. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.record_id`: Record ID
- `created_at`: Created At (datetime)
- `web_url`: Web URL (url)
- `values`: Values (an object whose keys vary)

### `attio_update_select_option`

**Update Select Option.** Renames or archives a select option; omitted fields are unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes |  | Target. Whether the attribute belongs to an object or a list. One of `"objects"`, `"lists"`. |
| `identifier` | string | yes |  | Object or List. Slug or ID of the object or list the attribute belongs to. |
| `attribute` | string | yes |  | Attribute. Attribute slug or ID. Use List Attributes to find it. |
| `option` | string | yes |  | Option. Option ID or title, from List Select Options. |
| `title` | string | no |  | Title. |
| `is_archived` | string | no |  | Archived. Yes archives the option; No restores it. One of `"true"`, `"false"`. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.attribute_id`: Attribute ID
- `id.option_id`: Option ID
- `title`: Title
- `is_archived`: Archived (boolean)

### `attio_update_status`

**Update Status.** Updates only the supplied fields of a status; set Archived to Yes to archive it. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes |  | Target. Whether the attribute belongs to an object or a list. One of `"objects"`, `"lists"`. |
| `identifier` | string | yes |  | Object or List. Slug or ID of the object or list the attribute belongs to. |
| `attribute` | string | yes |  | Attribute. Attribute slug or ID. Use List Attributes to find it. |
| `status` | string | yes |  | Status. Status ID or title, from List Statuses. |
| `title` | string | no |  | Title. |
| `celebration_enabled` | string | no |  | Celebration Enabled. Leave empty to keep the current setting. One of `"true"`, `"false"`. |
| `target_time_in_status` | string | no |  | Target Time in Status. ISO 8601 duration, e.g. `P7D`. |
| `is_archived` | string | no |  | Archived. Yes archives the status; No restores it. One of `"true"`, `"false"`. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.attribute_id`: Attribute ID
- `id.status_id`: Status ID
- `title`: Title
- `is_archived`: Archived (boolean)
- `target_time_in_status`: Target Time In Status (duration)
- `celebration_enabled`: Celebration Enabled (boolean)

### `attio_update_task`

**Update Task.** Updates only the supplied fields of a task. Linked Records and Assignee Emails replace the current ones when given; leaving them empty keeps the current ones, so links and assignees cannot be cleared to none. Content cannot be changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. From List Tasks or Create Task. |
| `deadline_at` | ISO date-time string | no |  | Deadline. |
| `is_completed` | string | no |  | Completed. Leave empty to keep the current state. One of `"true"`, `"false"`. |
| `linked_records` | array | no |  | Linked Records. Records to link the task to. Each item: { `target_object`, `target_record_id` }. |
| `assignee_emails` | array | no |  | Assignee Emails. Workspace member email addresses to assign. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.task_id`: Task ID
- `content_plaintext`: Content
- `is_completed`: Completed (boolean)
- `completed_at`: Completed At (datetime)
- `deadline_at`: Deadline (datetime)
- `linked_records`: Linked Records
- `linked_records[].target_object_id`: Object ID
- `linked_records[].target_record_id`: Record ID
- `assignees`: Assignees
- `assignees[].referenced_actor_type`: Actor Type
- `assignees[].referenced_actor_id`: Actor ID
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_upload_file`

**Upload File.** Uploads a file to the native files of a record, optionally into a folder. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `record_id` | string | yes |  | Record ID. ID of the record the files belong to. |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |
| `parent_folder_id` | string | no |  | Parent Folder ID. Folder to put it in; empty for the root. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.file_id`: File ID
- `name`: Name
- `file_type`: File Type
- `content_type`: Content Type
- `content_size`: Size (filesize)
- `parent_folder_id`: Parent Folder ID
- `object_id`: Object ID
- `object_slug`: Object Slug
- `record_id`: Record ID
- `storage_provider`: Storage Provider
- `created_by_actor`: Created By
- `created_by_actor.type`: Type
- `created_by_actor.id`: ID
- `created_at`: Created At (datetime)

### `attio_upsert_list_entry`

**Upsert List Entry.** Adds the record to the list, or updates its existing entry if the record is already in the list. Prefer this over Create List Entry to avoid duplicate entries. Multiselect values are replaced. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. List slug or ID. Use List Lists to find it. |
| `parent_object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `parent_record_id` | string | yes |  | Record ID. ID of the record to add to the list. |
| `entry_values` | JSON | no |  | Entry Values. List-specific attribute values keyed by attribute slug, e.g. {"stage": "Qualified"}. Use List Attributes with target `lists` for slugs. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.list_id`: List ID
- `id.entry_id`: Entry ID
- `parent_record_id`: Parent Record ID
- `parent_object`: Parent Object
- `created_at`: Created At (datetime)
- `entry_values`: Entry Values (an object whose keys vary)

### `attio_upsert_record`

**Upsert Record.** Creates a record or updates the existing one whose unique matching attribute (e.g. `email_addresses` for people, `domains` for companies) equals the supplied value. Prefer this over Create Record to avoid duplicates. Multiselect values are added to existing ones. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `matching_attribute` | string | yes |  | Matching Attribute. Slug or ID of a unique attribute used to find an existing record, e.g. `email_addresses` or `domains`. Its value must be included in Values. |
| `values` | JSON | yes |  | Values. Attribute values keyed by attribute slug, e.g. {"name": "Acme", "domains": ["acme.com"]}. Use List Attributes for slugs and types. |

Output fields:

- `id`: ID
- `id.workspace_id`: Workspace ID
- `id.object_id`: Object ID
- `id.record_id`: Record ID
- `created_at`: Created At (datetime)
- `web_url`: Web URL (url)
- `values`: Values (an object whose keys vary)

### `attio_write_list_entry_attribute_values`

**Write List Entry Attribute Values.** Replaces the entire value history of one list attribute on an entry, e.g. to backfill stage history. Existing history for that attribute is overwritten. Use Update List Entry to just set the current value. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. List slug or ID. Use List Lists to find it. |
| `entry_id` | string | yes |  | Entry ID. List entry ID (`id.entry_id`), from Query List Entries or Create List Entry. |
| `attribute` | string | yes |  | Attribute. Attribute slug or ID. Use List Attributes to find it. |
| `values` | array | yes |  | Values. The full value history to write. Each value needs the time it became active. Each item: { `value`, `active_from`, `active_until`? }. |

Output fields:

- `values`: Values
- `values[].active_from`: Active From (datetime)
- `values[].active_until`: Active Until (datetime)
- `values[].created_by_actor`: Created By
- `values[].created_by_actor.type`: Type
- `values[].created_by_actor.id`: ID
- `values[].value`: Value
- `values[].attribute_type`: Attribute Type
- `count`: Count (number)

### `attio_write_record_attribute_values`

**Write Record Attribute Values.** Replaces the entire value history of one attribute on a record, e.g. to backfill historic deal stages. Existing history for that attribute is overwritten. Use Update Record to just set the current value. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object slug or ID, e.g. `people`, `companies`, `deals`. Use List Objects to find custom objects. |
| `record_id` | string | yes |  | Record ID. Record ID (`id.record_id`), from Query Records, Search Records or Create Record. |
| `attribute` | string | yes |  | Attribute. Attribute slug or ID. Use List Attributes to find it. |
| `values` | array | yes |  | Values. The full value history to write. Each value needs the time it became active. Each item: { `value`, `active_from`, `active_until`? }. |

Output fields:

- `values`: Values
- `values[].active_from`: Active From (datetime)
- `values[].active_until`: Active Until (datetime)
- `values[].created_by_actor`: Created By
- `values[].created_by_actor.type`: Type
- `values[].created_by_actor.id`: ID
- `values[].value`: Value
- `values[].attribute_type`: Attribute Type
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

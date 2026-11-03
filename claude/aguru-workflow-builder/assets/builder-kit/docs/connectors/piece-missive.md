# Missive

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-missive'
  version: '0.2.0'
```

Categories: COMMUNICATION, SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> To get your API token:
>
> 1. Go to your Missive preferences
> 2. Click the API tab
> 3. Click "Create a new token"
> 4. Copy the generated token (starts with 'missive_pat-')
>
> Note: You need to be part of an organization subscribed to the Productive plan to generate API tokens.

## Actions

### `create_contact`

**Create Contact.** Create a new contact in a given Missive contact book, optionally with names, phone/email/address infos, and organization/group memberships. Use to add a person to Missive contacts. Not idempotent: each call creates a separate contact even with identical input; to change an existing one use Update Contact. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_book` | string | yes |  | Contact Book. Select the contact book where the contact will be created. A value the product loads from the provider, such as an id; write the value itself. |
| `first_name` | string | no |  | First Name. First name of the contact. |
| `last_name` | string | no |  | Last Name. Last name of the contact. |
| `middle_name` | string | no |  | Middle Name. Middle name of the contact. |
| `phonetic_first_name` | string | no |  | Phonetic First Name. Phonetic spelling of the first name. |
| `phonetic_last_name` | string | no |  | Phonetic Last Name. Phonetic spelling of the last name. |
| `phonetic_middle_name` | string | no |  | Phonetic Middle Name. Phonetic spelling of the middle name. |
| `prefix` | string | no |  | Prefix. Name prefix (e.g., Mr., Mrs., Dr.) |
| `suffix` | string | no |  | Suffix. Name suffix (e.g., Jr., Sr., III) |
| `nickname` | string | no |  | Nickname. Nickname for the contact. |
| `file_as` | string | no |  | File As. How the contact should be filed/sorted. |
| `notes` | string | no |  | Notes. Additional notes about the contact. |
| `starred` | boolean | no | `false` | Starred. Whether the contact should be starred. |
| `gender` | string | no |  | Gender. Gender of the contact. One of `"Male"`, `"Female"`, `"Other"`. |
| `infos` | array | no |  | Contact Information. Email addresses, phone numbers, and other contact information. Each item: { `kind`, `label`, `value`?, `custom_label`?, `name`?, `street`?, `extended_address`?, `city`?, `region`?, `postal_code`?, `po_box`?, `country`? }. |
| `memberships` | object | no |  | Memberships. Organizations and groups the contact belongs to. An object whose fields depend on other inputs; the product shows them. |

### `update_contact`

**Update Contact.** Update an existing Missive contact identified by its contact ID, changing names, notes, infos, memberships, or moving it to another contact book. Use when you already have the target contact and want to edit it rather than create one. Note that any provided infos/memberships replace the existing sets rather than merging. Idempotent in effect for a fixed set of fields, but each call mutates the contact. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_book` | string | yes |  | Contact Book. Select the contact book where the contact will be created. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. Select the contact to update. A value the product loads from the provider, such as an id; write the value itself. |
| `move_to_contact_book` | string | no |  | Move to Contact Book. Move contact to a different contact book (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `first_name` | string | no |  | First Name. First name of the contact. |
| `last_name` | string | no |  | Last Name. Last name of the contact. |
| `middle_name` | string | no |  | Middle Name. Middle name of the contact. |
| `phonetic_first_name` | string | no |  | Phonetic First Name. Phonetic spelling of the first name. |
| `phonetic_last_name` | string | no |  | Phonetic Last Name. Phonetic spelling of the last name. |
| `phonetic_middle_name` | string | no |  | Phonetic Middle Name. Phonetic spelling of the middle name. |
| `prefix` | string | no |  | Prefix. Name prefix (e.g., Mr., Mrs., Dr.) |
| `suffix` | string | no |  | Suffix. Name suffix (e.g., Jr., Sr., III) |
| `nickname` | string | no |  | Nickname. Nickname for the contact. |
| `file_as` | string | no |  | File As. How the contact should be filed/sorted. |
| `notes` | string | no |  | Notes. Additional notes about the contact. |
| `starred` | boolean | no |  | Starred. Whether the contact should be starred. |
| `gender` | string | no |  | Gender. Gender of the contact. One of `"Male"`, `"Female"`, `"Other"`. |
| `infos` | array | no |  | Contact Information. Email addresses, phone numbers, and other contact information. Note: When updating infos, all existing infos will be replaced with the ones provided here. Each item: { `kind`, `label`, `value`, `custom_label`?, `street`?, `extended_address`?, `city`?, `region`?, `postal_code`?, `po_box`?, `country`?, `name`? }. |
| `memberships` | object | no |  | Memberships. Organizations and groups the contact belongs to. Note: When updating memberships, all existing memberships will be replaced with the ones provided here. An object whose fields depend on other inputs; the product shows them. |

### `create_draft_post`

**Create Draft/Post.** Compose a message in Missive across a chosen channel (email, SMS, WhatsApp, live chat, custom channel, Messenger, or Instagram), either saving it as a draft or sending it immediately (optionally scheduled for a future timestamp). Use to send or queue an outbound message; sender/recipient fields and any account IDs depend on the selected message type. Not idempotent: each call creates a new draft and, if send is enabled, dispatches a message. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_type` | string | yes |  | Message Type. Type of message to create. One of `"email"`, `"sms"`, `"whatsapp"`, `"live_chat"`, `"custom_channel"`, `"messenger"`, `"instagram"`. |
| `subject` | string | no |  | Subject. Subject line (primarily for email) |
| `body` | string | yes |  | Message Body. The content of your message (supports HTML for email) |
| `message_fields` | object | no |  | Message Configuration. Configure sender, recipients, and message-specific options. An object whose fields depend on other inputs; the product shows them. |
| `conversation_options` | object | no |  | Conversation Options. Advanced conversation management options. An object whose fields depend on other inputs; the product shows them. |
| `send_immediately` | boolean | no | `false` | Send Immediately. Send the draft immediately instead of saving as draft. |
| `schedule_send` | boolean | no | `false` | Schedule Send. Schedule the message to be sent later. |
| `send_at_timestamp` | number | no |  | Send At (Unix Timestamp). Unix timestamp when to send the message (required if scheduling) |
| `auto_followup` | boolean | no | `false` | Auto Follow-up. Cancel scheduled send if there is a reply (requires scheduling) |
| `attachments` | array | no |  | Attachments. File attachments (up to 25 files, max 10MB total) Each item: { `filename`, `base64_data` }. |

### `create_task`

**Create Task.** Create a Missive task in one of two modes: a standalone task assigned to a team or specific users, or a subtask attached to a conversation (selected by ID or found/created via message references). Use to add a to-do item; standalone tasks need a team or assignees, subtasks need a parent conversation. Not idempotent: each call creates a new task. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_type` | string | yes |  | Task Type. Type of task to create. One of `"standalone"`, `"subtask"`. |
| `title` | string | yes |  | Task Title. Title of the task (max 1000 characters) |
| `description` | string | no |  | Description. Description of the task (max 10000 characters) |
| `state` | string | no | `"todo"` | Task State. Current state of the task. One of `"todo"`, `"in_progress"`, `"closed"`. |
| `due_at` | ISO date-time string | no |  | Due Date. Due date for the task. |
| `task_configuration` | object | no |  | Task Configuration. Configure task assignment and organization based on task type. An object whose fields depend on other inputs; the product shows them. |

### `find_contact`

**Find Contact.** Search a Missive contact book for contacts matching a free-text term across name, email, phone, organization, and other fields; leave the search term empty to list all contacts in the book. Use to look up or enumerate contacts before acting on them. A contact book is required; supports paging, sort order, and a count/summary/full result format. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_book` | string | yes |  | Contact Book. Select the contact book where the contact will be created. A value the product loads from the provider, such as an id; write the value itself. |
| `search` | string | no |  | Search Term. Search across all contact information including name, email, phone, organization, custom fields, notes, etc. Leave empty to get all contacts. |
| `search_options` | object | no |  | Search & Filter Options. Configure how to search and filter contacts. An object whose fields depend on other inputs; the product shows them. |
| `result_format` | string | no | `"full"` | Result Format. How to format the returned contact data. One of `"full"`, `"summary"`, `"count"`. |

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

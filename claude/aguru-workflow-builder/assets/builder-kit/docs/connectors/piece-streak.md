# Streak

CRM built into Gmail. Manage pipelines, boxes, tasks, comments, contacts and organizations from your flows.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-streak'
  version: '0.1.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your personal Streak API key.
>
> **How to get your API key:**
> 1. Open Gmail with the Streak Chrome extension installed.
> 2. Click the Streak icon in the right sidebar.
> 3. Click the **Settings** (gear) button, then go to **Integrations**.
> 4. In the **Streak API** section, click **Create New Key** and copy the key.
>
> Your API key gives full access to your Streak account — keep it secret.

## Actions

### `create_box`

**Create Box.** Create a new box (Streak's CRM record, e.g. a deal, lead, or candidate) inside a pipeline. Use when an agent needs to add a new record to a Streak pipeline; requires the target pipeline and a name, with optional starting stage, notes, and assignee emails. Not idempotent: each call creates another box even with identical inputs. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pipelineKey` | string | yes |  | Pipeline. The pipeline to use. Pipelines are your workflows in Streak (e.g. Sales CRM, Hiring, Project Tracker). A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. The display name for this box (e.g. the deal name or the candidate name). |
| `stageKey` | string | no |  | Stage. The stage that the box should be in. Stages are the columns of a pipeline (e.g. Lead, Negotiating, Closed Won). A value the product loads from the provider, such as an id; write the value itself. |
| `notes` | string | no |  | Notes. Free-form notes attached to the box. |
| `assignedToEmails` | array | no |  | Assigned To (Emails). Email addresses of Streak users to assign to this box. Leave empty for no assignees. |

### `update_box`

**Update Box.** Update fields on an existing box identified by its box key, setting any of name, stage, notes, assignee emails, or custom fields (only provided fields change). Use when an agent needs to modify or advance an existing Streak record, such as moving a deal to a new stage. Idempotent: re-applying the same values leaves the box in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pipelineKey` | string | yes |  | Pipeline. The pipeline to use. Pipelines are your workflows in Streak (e.g. Sales CRM, Hiring, Project Tracker). A value the product loads from the provider, such as an id; write the value itself. |
| `boxKey` | string | yes |  | Box. The box (record) inside the selected pipeline to operate on. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | New Name. Leave empty to keep the existing name. |
| `stageKey` | string | no |  | Stage. The stage that the box should be in. Stages are the columns of a pipeline (e.g. Lead, Negotiating, Closed Won). A value the product loads from the provider, such as an id; write the value itself. |
| `notes` | string | no |  | Notes. Replaces the existing notes. Leave empty to keep them unchanged. |
| `assignedToEmails` | array | no |  | Assigned To (Emails). Replaces the current assignees with these emails. Leave empty to keep assignees unchanged. |
| `fields` | object | no |  | Custom Fields. Map of custom field key to value (e.g. {"1007": "Closed", "1039": 42}). Find the field keys in Streak under Pipeline Settings → Fields. |

### `get_box`

**Get Box.** Retrieve a single box by its box key, including its current stage, custom field values, and counts. Use when an agent already has a specific box key (e.g. from a trigger or a Find Boxes result) and needs its full current details. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pipelineKey` | string | yes |  | Pipeline. The pipeline to use. Pipelines are your workflows in Streak (e.g. Sales CRM, Hiring, Project Tracker). A value the product loads from the provider, such as an id; write the value itself. |
| `boxKey` | string | yes |  | Box. The box (record) inside the selected pipeline to operate on. A value the product loads from the provider, such as an id; write the value itself. |

### `find_box`

**Find Boxes.** Search for boxes by a text query matched against box name, notes, emails, and text custom fields, returning the matching boxes; by default it spans all pipelines, or it can be restricted to a single pipeline. Use when an agent needs to look up a box by name or content rather than by a known box key. Read-only and idempotent; a search query is required. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The text to search for. Matches against box name, notes, emails, and text custom fields. |
| `pipelineKey` | string | no |  | Pipeline. The pipeline to use. Pipelines are your workflows in Streak (e.g. Sales CRM, Hiring, Project Tracker). A value the product loads from the provider, such as an id; write the value itself. |

### `create_stage`

**Create Stage.** Add a new stage (a pipeline column representing a step like "Negotiating") to the specified pipeline. Use when an agent needs to extend a pipeline's set of stages before placing boxes in them; requires the target pipeline and a stage name. Not idempotent: each call appends another stage even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pipelineKey` | string | yes |  | Pipeline. The pipeline to use. Pipelines are your workflows in Streak (e.g. Sales CRM, Hiring, Project Tracker). A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Stage Name. The name of the new stage. Must be unique within the pipeline (e.g. "Negotiating"). |

### `create_task`

**Create Task.** Create a new task (a to-do item) attached to a specific box, with task text and an optional due date and assignee emails. Use when an agent needs to add a follow-up or action item to a Streak record; requires the box key and task text. Not idempotent: each call creates another task on the box. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pipelineKey` | string | yes |  | Pipeline. The pipeline to use. Pipelines are your workflows in Streak (e.g. Sales CRM, Hiring, Project Tracker). A value the product loads from the provider, such as an id; write the value itself. |
| `boxKey` | string | yes |  | Box. The box (record) inside the selected pipeline to operate on. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Task Text. The task description, shown in Streak (e.g. "Send follow-up email"). |
| `dueDate` | ISO date-time string | no |  | Due Date. When the task is due. Leave empty for no due date. |
| `assignedToEmails` | array | no |  | Assigned To (Emails). Email addresses of Streak users to assign this task to. Leave empty to leave unassigned. |

### `create_comment`

**Create Comment.** Post a comment with the given message text onto a specific box. Use when an agent needs to record a note or update on a Streak record's activity feed; requires the box key and message. Not idempotent: each call appends another comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pipelineKey` | string | yes |  | Pipeline. The pipeline to use. Pipelines are your workflows in Streak (e.g. Sales CRM, Hiring, Project Tracker). A value the product loads from the provider, such as an id; write the value itself. |
| `boxKey` | string | yes |  | Box. The box (record) inside the selected pipeline to operate on. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | yes |  | Message. The comment text to post on the box. |

### `create_contact`

**Create or Find Contact.** Create a person contact in a team, or return the existing one if a contact with the same email already exists (get-if-existing upsert keyed on email). Use when an agent needs to ensure a contact exists for a given email before linking it elsewhere; requires the team and at least one email address. Idempotent: repeating with the same email returns the same contact rather than duplicating. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamKey` | string | yes |  | Team. The Streak team that owns this contact or organization. Contacts and organizations are shared at the team level. A value the product loads from the provider, such as an id; write the value itself. |
| `emailAddresses` | array | yes |  | Email Addresses. One or more email addresses for this contact. |
| `givenName` | string | no |  | First Name. |
| `familyName` | string | no |  | Last Name. |
| `title` | string | no |  | Title. Job title or role (e.g. "VP of Sales"). |
| `phoneNumbers` | array | no |  | Phone Numbers. |
| `addresses` | array | no |  | Addresses. |
| `twitterHandle` | string | no |  | Twitter Handle. Without the leading @ (e.g. "janedoe"). |
| `linkedinHandle` | string | no |  | LinkedIn Handle. |
| `other` | string | no |  | Notes. |

### `create_organization`

**Create or Find Organization.** Create a company/organization record in a team, or return the existing one if an organization with the same domain already exists (get-if-existing upsert keyed on domain). Use when an agent needs to ensure a company exists before associating contacts or boxes; requires the team plus at least one of name or domains. Idempotent when matched by domain: repeating returns the same organization rather than duplicating. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamKey` | string | yes |  | Team. The Streak team that owns this contact or organization. Contacts and organizations are shared at the team level. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Organization Name. The company name. Required unless a domain is provided (at least one of name or domains must be set). |
| `domains` | array | no |  | Domains. Website domains for this organization (e.g. "acme.com"). Used to match existing organizations. |
| `industry` | string | no |  | Industry. |
| `employeeCount` | number | no |  | Employee Count. |
| `phoneNumbers` | array | no |  | Phone Numbers. |
| `addresses` | array | no |  | Addresses. |
| `description` | string | no |  | Description. |

### `get_current_user`

**Get Current User.** Retrieve the Streak user account tied to the connected API key, including its user key, email, and display name. Use when an agent needs the current user's identity or user key (for example to set assignees or attribute actions). Takes no input; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

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

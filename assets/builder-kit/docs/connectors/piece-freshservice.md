# Freshservice

IT service management software for ticketing, asset management, and IT operations.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-freshservice'
  version: '0.2.3'
```

Categories: CUSTOMER_SUPPORT. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To get your API key:
> 1. Log in to your **Freshservice** account as an agent.
> 2. Click your **profile picture** in the top-right corner.
> 3. Go to **Profile Settings**.
> 4. Your API key is displayed on the right side of the page.
>
> For the domain, enter only the subdomain. For example, if your URL is **mycompany.freshservice.com**, enter **mycompany**.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Freshservice Domain. Your Freshservice subdomain (e.g., "mycompany" from mycompany.freshservice.com). |
| `api_key` | string | yes |  | API Key. Your Freshservice API key from Profile Settings. |

## Actions

### `create_ticket`

**Create Ticket.** Opens a new IT service ticket in Freshservice on behalf of a requester. Use to log an incident or service request from an end user; requires a subject, an HTML description, and the requester (identified by id). Not idempotent — each call creates a separate ticket. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | yes |  | Subject. The subject of the ticket. |
| `description` | string | yes |  | Description. HTML content of the ticket. You can use basic HTML tags for formatting. |
| `requester_id` | string | yes |  | Requester. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | yes |  | Status. One of `2`, `3`, `4`, `5`. |
| `priority` | string | yes |  | Priority. One of `1`, `2`, `3`, `4`. |
| `source` | string | no |  | Source. One of `1`, `2`, `3`, `7`, `9`, `10`. |
| `urgency` | string | no |  | Urgency. One of `1`, `2`, `3`. |
| `impact` | string | no |  | Impact. One of `1`, `2`, `3`. |
| `type` | string | no |  | Type. The type of ticket (e.g., Incident, Service Request). |
| `responder_id` | string | no |  | Agent. A value the product loads from the provider, such as an id; write the value itself. |
| `department_id` | string | no |  | Department. A value the product loads from the provider, such as an id; write the value itself. |
| `group_id` | string | no |  | Group. A value the product loads from the provider, such as an id; write the value itself. |
| `category` | string | no |  | Category. The category of the ticket. |
| `sub_category` | string | no |  | Sub Category. The sub-category of the ticket. |
| `tags` | array | no |  | Tags. Tags to add to the ticket. |
| `custom_fields` | JSON | no |  | Custom Fields. A JSON object of custom field names and values. |

### `add_note_to_ticket`

**Add Note to Ticket.** Appends a note (conversation entry) to an existing Freshservice ticket identified by ticket id. The note can be private (agent-only, the default) or public (visible to the requester). Use to record an update or comment on a ticket. Not idempotent — each call appends another note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Note Content. The content of the note. HTML is supported. |
| `private` | boolean | no | `true` | Private Note. If checked, the note is only visible to agents. If unchecked, the requester can also see it. |

### `create_requester`

**Create Requester.** Creates a new requester (end-user) record in Freshservice. Use to onboard a person who will submit tickets; requires a first name and primary email. Not idempotent — each call creates a new requester and will fail if the email already belongs to an existing requester. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | yes |  | First Name. The first name of the requester. |
| `primary_email` | string | yes |  | Email. The primary email address of the requester. |
| `last_name` | string | no |  | Last Name. The last name of the requester. |
| `job_title` | string | no |  | Job Title. The job title of the requester. |
| `phone` | string | no |  | Work Phone. The work phone number of the requester. |
| `mobile_phone_number` | string | no |  | Mobile Phone. The mobile phone number of the requester. |
| `department_id` | string | no |  | Department. A value the product loads from the provider, such as an id; write the value itself. |
| `custom_fields` | JSON | no |  | Custom Fields. A JSON object of custom field names and values. |

### `request_ticket_approval`

**Request Ticket Approval.** Sends an approval request on a Freshservice ticket to a designated approver agent. Use when a ticket needs sign-off before proceeding; requires the ticket id and the approver agent id, and optionally sets whether all approvers or any one must approve. Not idempotent — each call raises a new approval request. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket. A value the product loads from the provider, such as an id; write the value itself. |
| `approver_id` | string | yes |  | Agent. A value the product loads from the provider, such as an id; write the value itself. |
| `approval_type` | string | no | `2` | Approval Type. How approval is determined when there are multiple approvers. One of `1`, `2`. |

### `create_change`

**Create Change.** Opens a new change request (change management record) in Freshservice. Use to propose an IT change for planning, approval, and tracking; requires a subject and the requester id, with optional risk, impact, change type, status, and planned start/end dates. Not idempotent — each call creates a separate change. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | yes |  | Subject. The subject of the change. |
| `requester_id` | string | yes |  | Requester. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. HTML content describing the change. |
| `agent_id` | string | no |  | Agent. A value the product loads from the provider, such as an id; write the value itself. |
| `group_id` | string | no |  | Group. A value the product loads from the provider, such as an id; write the value itself. |
| `department_id` | string | no |  | Department. A value the product loads from the provider, such as an id; write the value itself. |
| `priority` | string | yes |  | Priority. One of `1`, `2`, `3`, `4`. |
| `impact` | string | no |  | Impact. One of `1`, `2`, `3`. |
| `status` | string | no |  | Status. One of `1`, `2`, `3`, `4`, `5`, `6`. |
| `risk` | string | no |  | Risk. One of `1`, `2`, `3`, `4`. |
| `change_type` | string | no |  | Change Type. One of `1`, `2`, `3`, `4`. |
| `planned_start_date` | string | no |  | Planned Start Date. Planned start date and time (ISO 8601, e.g. 2025-01-15T09:00:00Z). |
| `planned_end_date` | string | no |  | Planned End Date. Planned end date and time (ISO 8601, e.g. 2025-01-15T17:00:00Z). |
| `category` | string | no |  | Category. Category of the change. |
| `sub_category` | string | no |  | Sub Category. Sub-category of the change. |
| `item_category` | string | no |  | Item Category. Item category of the change. |
| `custom_fields` | JSON | no |  | Custom Fields. A JSON object of custom field names and values. |

### `update_change`

**Update Change.** Modifies fields on an existing Freshservice change request identified by change id (e.g. subject, status, priority, risk, planned dates, assignment). Use to progress or revise a change; at least one field must be supplied or the call errors. Idempotent — re-sending the same field values leaves the change in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `change_id` | string | yes |  | Change. A value the product loads from the provider, such as an id; write the value itself. |
| `subject` | string | no |  | Subject. New subject for the change. |
| `description` | string | no |  | Description. HTML content describing the change. |
| `requester_id` | string | no |  | Requester. A value the product loads from the provider, such as an id; write the value itself. |
| `agent_id` | string | no |  | Agent. A value the product loads from the provider, such as an id; write the value itself. |
| `group_id` | string | no |  | Group. A value the product loads from the provider, such as an id; write the value itself. |
| `department_id` | string | no |  | Department. A value the product loads from the provider, such as an id; write the value itself. |
| `priority` | string | yes |  | Priority. One of `1`, `2`, `3`, `4`. |
| `impact` | string | no |  | Impact. One of `1`, `2`, `3`. |
| `status` | string | no |  | Status. One of `1`, `2`, `3`, `4`, `5`, `6`. |
| `risk` | string | no |  | Risk. One of `1`, `2`, `3`, `4`. |
| `change_type` | string | no |  | Change Type. One of `1`, `2`, `3`, `4`. |
| `planned_start_date` | string | no |  | Planned Start Date. Planned start date and time (ISO 8601, e.g. 2025-01-15T09:00:00Z). |
| `planned_end_date` | string | no |  | Planned End Date. Planned end date and time (ISO 8601, e.g. 2025-01-15T17:00:00Z). |
| `category` | string | no |  | Category. Category of the change. |
| `sub_category` | string | no |  | Sub Category. Sub-category of the change. |
| `item_category` | string | no |  | Item Category. Item category of the change. |
| `custom_fields` | JSON | no |  | Custom Fields. A JSON object of custom field names and values. |

### `delete_change`

**Delete Change.** Permanently deletes a change request from Freshservice, identified by change id. Use to remove a change that should no longer exist. Idempotent in effect — once deleted the change stays deleted, though repeat calls on an already-removed id may return a not-found error. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `change_id` | string | yes |  | Change. A value the product loads from the provider, such as an id; write the value itself. |

### `add_note_to_change`

**Add Note to Change.** Appends a note to an existing Freshservice change request identified by change id. The note can be private (agent-only, the default) or public. Use to record commentary or an update on a change. Not idempotent — each call appends another note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `change_id` | string | yes |  | Change. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Note Content. The content of the note. HTML is supported. |
| `private` | boolean | no | `true` | Private Note. If checked, the note is only visible to agents. If unchecked, the requester can also see it. |

### `create_change_task`

**Create Change Task.** Adds a task (sub-item of work) to an existing Freshservice change request identified by change id. Use to break a change into actionable steps; requires a title, with optional assignee, group, status, and due date. Not idempotent — each call creates a separate task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `change_id` | string | yes |  | Change. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The title of the task. |
| `description` | string | no |  | Description. Description of the task. |
| `agent_id` | string | no |  | Agent. A value the product loads from the provider, such as an id; write the value itself. |
| `group_id` | string | no |  | Group. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Task Status. One of `1`, `2`, `3`. |
| `due_date` | string | no |  | Due Date. Task due date and time (ISO 8601, e.g. 2025-01-15T17:00:00Z). |
| `notify_before` | number | no |  | Notify Before (seconds). Time in seconds before the due date to send a reminder notification. |

### `update_change_task`

**Update Change Task.** Modifies fields on an existing task within a Freshservice change request, identified by change id and task id (e.g. title, status, assignee, due date). Use to progress or revise a change task; at least one field must be supplied or the call errors. Idempotent — re-sending the same field values leaves the task in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `change_id` | string | yes |  | Change. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | number | yes |  | Task ID. The ID of the task to update. |
| `title` | string | no |  | Title. New title for the task. |
| `description` | string | no |  | Description. Description of the task. |
| `agent_id` | string | no |  | Agent. A value the product loads from the provider, such as an id; write the value itself. |
| `group_id` | string | no |  | Group. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Task Status. One of `1`, `2`, `3`. |
| `due_date` | string | no |  | Due Date. Task due date and time (ISO 8601, e.g. 2025-01-15T17:00:00Z). |
| `notify_before` | number | no |  | Notify Before (seconds). Time in seconds before the due date to send a reminder notification. |

### `delete_change_task`

**Delete Change Task.** Permanently deletes a task from a Freshservice change request, identified by change id and task id. Use to remove a task that should no longer exist. Idempotent in effect — once deleted the task stays deleted, though repeat calls on an already-removed id may return a not-found error. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `change_id` | string | yes |  | Change. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | number | yes |  | Task ID. The ID of the task to delete. |

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

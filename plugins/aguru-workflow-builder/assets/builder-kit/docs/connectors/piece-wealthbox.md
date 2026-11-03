# Wealthbox

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-wealthbox'
  version: '0.1.6'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Access Token

> Enter your Wealthbox API access token. Get it from Settings → API Access Tokens in your Wealthbox account.

## Actions

### `create_contact`

**Create Contact.** Creates a new contact record in Wealthbox CRM with name, contact details, classification, address, and tags. Use to add a person, organization, trust, or household to the CRM; the Contact Type prop switches between these entity kinds (a Household type maps the first name to the household name). Not idempotent: each call creates a separate contact even with identical input, so guard against duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | yes |  | First Name. The first name of the contact. |
| `last_name` | string | yes |  | Last Name. The last name of the contact. |
| `prefix` | string | no |  | Prefix. The preferred prefix for the contact (e.g., Mr., Ms., Dr.) |
| `middle_name` | string | no |  | Middle Name. The middle name of the contact. |
| `suffix` | string | no |  | Suffix. The suffix associated with the contact (e.g., Jr., Sr., M.D.) |
| `nickname` | string | no |  | Nickname. A preferred shortname for the contact. |
| `job_title` | string | no |  | Job Title. The title the contact holds at their present company. |
| `company_name` | string | no |  | Company Name. The name of the contact's present company. |
| `type` | string | no | `"Person"` | Contact Type. The type of the contact being created. One of `"Person"`, `"Household"`, `"Organization"`, `"Trust"`. |
| `contact_type` | string | no |  | Contact Classification. A string further classifying the contact. One of `"Client"`, `"Past Client"`, `"Prospect"`, `"Vendor"`, `"Organization"`. |
| `status` | string | no | `"Active"` | Status. Whether the contact is currently active. One of `"Active"`, `"Inactive"`. |
| `gender` | string | no |  | Gender. The gender of the contact. One of `"Female"`, `"Male"`, `"Non-binary"`, `"Unknown"`. |
| `birth_date` | ISO date-time string | no |  | Birth Date. The birthdate of the contact (YYYY-MM-DD format) |
| `marital_status` | string | no |  | Marital Status. The marital status of the contact. One of `"Married"`, `"Single"`, `"Divorced"`, `"Widowed"`, `"Life Partner"`, `"Separated"`, `"Unknown"`. |
| `email_address` | string | no |  | Email Address. Primary email address for the contact. |
| `phone_number` | string | no |  | Phone Number. Primary phone number for the contact (e.g., (555) 123-4567) |
| `street_line_1` | string | no |  | Street Address Line 1. First line of street address. |
| `street_line_2` | string | no |  | Street Address Line 2. Second line of street address (apt, suite, etc.) |
| `city` | string | no |  | City. City for the address. |
| `state` | string | no |  | State. State or province for the address. |
| `zip_code` | string | no |  | ZIP Code. ZIP or postal code for the address. |
| `country` | string | no | `"United States"` | Country. Country for the address. |
| `twitter_name` | string | no |  | Twitter Handle. The twitter handle of the contact. |
| `linkedin_url` | string | no |  | LinkedIn URL. The LinkedIn URL for the contact. |
| `background_information` | string | no |  | Background Information. A brief description of the contact. |
| `important_information` | string | no |  | Important Information. Any other important info for the contact. |
| `personal_interests` | string | no |  | Personal Interests. Personal interests for the contact. |
| `contact_source` | string | no |  | Contact Source. The method in which this contact was acquired. One of `"Referral"`, `"Conference"`, `"Direct Mail"`, `"Cold Call"`, `"Other"`. |
| `tags` | array | no |  | Tags. Tags to associate with the contact (e.g., "Client", "VIP", "Referral") |
| `external_unique_id` | string | no |  | External Unique ID. A unique identifier for this contact in an external system. |

### `create_note`

**Create Note.** Creates a note in Wealthbox and links it to a specified contact, optionally with visibility scope and tags. Use to log call summaries, meeting notes, or client interactions against a contact record; requires the note content and a contact id. Not idempotent: each call appends a new note even with identical content. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Note Content. The main body of the note (e.g., call summary, meeting notes, client interaction details) |
| `contact_id` | string | yes |  | Contact. Select the contact to link this note to. A value the product loads from the provider, such as an id; write the value itself. |
| `visible_to` | string | no |  | Visible To. Select who can view this note. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | object | no |  | Tags. Select tags to associate with this note. An object whose fields depend on other inputs; the product shows them. |

### `create_project`

**Create Project.** Creates a new project record in Wealthbox with a name, description, optional organizer, visibility, and custom fields. Use to start a tracked initiative such as client onboarding; requires both a name and a description. Not idempotent: each call creates a separate project. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Project Name. The name of the project (e.g., "Client Onboarding", "Q1 Review Process") |
| `description` | string | yes |  | Project Description. A detailed explanation of the project goals and scope. |
| `organizer` | string | no |  | Organizer. Select the user who will be responsible for organizing this project. A value the product loads from the provider, such as an id; write the value itself. |
| `visible_to` | string | no |  | Visible To. Select who can view this project. A value the product loads from the provider, such as an id; write the value itself. |
| `custom_fields` | object | no |  | Custom Fields. Add custom fields to this project. An object whose fields depend on other inputs; the product shows them. |

### `add_household_member`

**Add Member to Household.** Adds an existing contact as a member of an existing Wealthbox household, assigning a household role/title (Head, Spouse, Child, etc.). Use to attach a person to a household after both records exist; requires the household id, the contact id, and a title. Not idempotent: it appends the membership on each call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `household_id` | string | yes |  | Household. Select the household that will receive the new member. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. Select the contact to add to the household. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Household Title. The household title to assign to the added contact. One of `"Head"`, `"Spouse"`, `"Partner"`, `"Child"`, `"Grandchild"`, `"Parent"`, `"Grandparent"`, `"Sibling"`, `"Other"`, `"Dependent"`. |

### `create_household`

**Create Household.** Creates a household contact record in Wealthbox (name, address, email, phone, tags) and, in the same call, can attach existing contacts as Head and Spouse members if those contact ids are supplied. Use to group family members under one household; requires a household name. Not idempotent: each call creates a new household and re-adds the members. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Household Name. The name of the household (e.g., "The Anderson Family", "Smith Household") |
| `head_contact_id` | string | no |  | Head of Household. Select the contact who will be the head of this household. A value the product loads from the provider, such as an id; write the value itself. |
| `spouse_contact_id` | string | no |  | Spouse/Partner (Optional). Select the spouse or partner to automatically add to this household. A value the product loads from the provider, such as an id; write the value itself. |
| `email_address` | string | no |  | Primary Email Address. Primary email address for the household. |
| `street_line_1` | string | no |  | Street Address Line 1. First line of street address. |
| `street_line_2` | string | no |  | Street Address Line 2. Second line of street address (apt, suite, etc.) |
| `city` | string | no |  | City. City for the household address. |
| `state` | string | no |  | State. State or province for the household address. |
| `zip_code` | string | no |  | ZIP Code. ZIP or postal code for the household address. |
| `country` | string | no | `"United States"` | Country. Country for the household address. |
| `phone_number` | string | no |  | Primary Phone Number. Primary phone number for the household. |
| `type` | string | no | `"Household"` | Household Type. The type of household being created. One of `"Household"`, `"Organization"`, `"Trust"`. |
| `status` | string | no | `"Active"` | Status. Whether the household is currently active. One of `"Active"`, `"Inactive"`. |
| `background_information` | string | no |  | Background Information. Background information about the household. |
| `important_information` | string | no |  | Important Information. Any important information about the household. |
| `tags` | object | no |  | Tags. Select tags to associate with this household. An object whose fields depend on other inputs; the product shows them. |
| `visible_to` | string | no |  | Visible To. Select who can view this household. A value the product loads from the provider, such as an id; write the value itself. |
| `external_unique_id` | string | no |  | External Unique ID. A unique identifier for this household in an external system. |

### `create_event`

**Create Event.** Creates a calendar event in Wealthbox with title, start/end times, location, invitees, category, and an optional linked contact. Use to schedule a meeting or appointment; requires a title and both start and end date-times. Not idempotent: each call creates a separate event and can re-send email invitations. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Event Title. The name of the event (e.g., "Client Meeting", "Portfolio Review") |
| `starts_at` | ISO date-time string | yes |  | Start Date & Time. When the event starts (yyyy-mm-dd hh:mm format) |
| `ends_at` | ISO date-time string | yes |  | End Date & Time. When the event ends (yyyy-mm-dd hh:mm format) |
| `location` | string | no |  | Location. Where the event takes place (e.g., "Conference Room", "Client Office", "Zoom Meeting") |
| `description` | string | no |  | Description. A detailed explanation of the event purpose and agenda. |
| `all_day` | boolean | no | `false` | All Day Event. Check if this is an all-day event. |
| `repeats` | boolean | no | `false` | Repeating Event. Check if this event repeats. |
| `state` | string | no | `"unconfirmed"` | Event Status. The current state of the event. One of `"unconfirmed"`, `"confirmed"`, `"tentative"`, `"completed"`, `"cancelled"`. |
| `contact_id` | string | no |  | Linked Contact. Select the contact to link this event to. A value the product loads from the provider, such as an id; write the value itself. |
| `invitees` | object | no |  | Invitees. Add people to invite to this event. An object whose fields depend on other inputs; the product shows them. |
| `event_category` | string | no |  | Event Category. Select the category for this event. A value the product loads from the provider, such as an id; write the value itself. |
| `email_invitees` | boolean | no | `true` | Email Invitees. Send email invitations to invitees. |
| `visible_to` | string | no |  | Visible To. Select who can view this event. A value the product loads from the provider, such as an id; write the value itself. |
| `custom_fields` | object | no |  | Custom Fields. Add custom fields to this event. An object whose fields depend on other inputs; the product shows them. |

### `create_opportunity`

**Create Opportunity.** Creates a sales opportunity in Wealthbox with name, target close date, probability, amount/currency, pipeline stage, and a linked contact. Use to record a deal in the pipeline; requires name, target close, probability (0-100), amount, stage, and a contact id. Not idempotent: each call creates a separate opportunity. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Opportunity Name. The name of the opportunity (e.g., "Financial Plan", "Investment Advisory", "Estate Planning") |
| `target_close` | ISO date-time string | yes |  | Target Close Date. When the opportunity should close. |
| `probability` | number | yes |  | Probability (%). The chance the opportunity will close, as a percentage (0-100) |
| `amount` | number | yes |  | Amount. The monetary value of the opportunity. |
| `currency` | string | no | `"$"` | Currency. The currency for the opportunity amount. One of `"$"`, `"€"`, `"£"`, `"C$"`, `"A$"`. |
| `amount_kind` | string | no | `"Fee"` | Amount Type. The type of amount this represents. One of `"Fee"`, `"Commission"`, `"AUM"`, `"Other"`. |
| `stage` | string | yes |  | Stage. Select the current stage of this opportunity. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Linked Contact. Select the contact linked to this opportunity. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. A detailed explanation of the opportunity. |
| `manager` | string | no |  | Opportunity Manager. Select the user designated as manager of this opportunity. A value the product loads from the provider, such as an id; write the value itself. |
| `visible_to` | string | no |  | Visible To. Select who can view this opportunity. A value the product loads from the provider, such as an id; write the value itself. |
| `custom_fields` | object | no |  | Custom Fields. Add custom fields to this opportunity. An object whose fields depend on other inputs; the product shows them. |

### `create_task`

**Create Task.** Creates a task in Wealthbox with a name and due date, optionally assigned to a user, prioritized, and linked to a record. Use to schedule a follow-up action; the Link To prop chooses whether the task is attached to a Contact, Project, or Opportunity. Requires a name and a due date. Not idempotent: each call creates a separate task. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Task Name. The name of the task (e.g., "Return Bill's call", "Follow up on proposal") |
| `due_date` | ISO date-time string | yes |  | Due Date. When the task is due. |
| `assigned_to` | string | no |  | Assigned To. Select the user who the task is assigned to. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. A detailed explanation of the task. |
| `priority` | string | no | `"Medium"` | Priority. The priority level of the task. One of `"Low"`, `"Medium"`, `"High"`. |
| `complete` | boolean | no | `false` | Mark as Complete. Check if the task should be created as already completed. |
| `link_type` | string | no |  | Link To. What type of record to link this task to. One of `"Contact"`, `"Project"`, `"Opportunity"`. |
| `linked_record` | object | no |  | Linked Record. Select the record to link this task to. An object whose fields depend on other inputs; the product shows them. |
| `category` | string | no |  | Category. Select the category this task belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `visible_to` | string | no |  | Visible To. Select who can view this task. A value the product loads from the provider, such as an id; write the value itself. |
| `due_later` | string | no |  | Due Later. Interval for when this task is due after start (e.g., "2 days later at 5:00 PM") |
| `custom_fields` | object | no |  | Custom Fields. Add custom fields to this task. An object whose fields depend on other inputs; the product shows them. |

### `start_workflow`

**Start Workflow.** Starts an instance of a Wealthbox workflow template, attached to a specific record; the Link To prop chooses whether it runs against a Contact, Project, or Opportunity. Use to kick off a predefined multi-step sequence (e.g. client onboarding); requires a workflow template id, a link type, and the linked record. Not idempotent: each call launches a new workflow instance. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflow_template` | string | yes |  | Workflow Template. Select the workflow template to trigger. A value the product loads from the provider, such as an id; write the value itself. |
| `linked_type` | string | yes |  | Link To. What type of record to link this workflow to. One of `"Contact"`, `"Project"`, `"Opportunity"`. |
| `linked_record` | object | yes |  | Linked Record. Select the record to link this workflow to. An object whose fields depend on other inputs; the product shows them. |
| `label` | string | no |  | Workflow Label. A short name for the workflow (e.g., "Onboard a new client to the firm") |
| `starts_at` | ISO date-time string | no |  | Start Date & Time. When you want the workflow to start (optional, defaults to now) |
| `visible_to` | string | no |  | Visible To. Select who can view this workflow. A value the product loads from the provider, such as an id; write the value itself. |
| `workflow_milestones` | object | no |  | Workflow Milestones. Add milestones to this workflow. An object whose fields depend on other inputs; the product shows them. |

### `find_contact`

**Find Contact.** Searches Wealthbox contacts by name, email, phone, external id, or filters (type, tags, active status, update date). Supplying a Contact ID alone fetches that single record directly; otherwise it runs a filtered list query and can return all matches or just the first. Use to look up an existing contact or resolve its id before another call; at least one criterion is required. Idempotent: read-only, no data is modified. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Search by name (supports partial matches across prefix, first, middle, last, suffix, nickname, and full name for households/companies) |
| `email` | string | no |  | Email Address. Search by email address. |
| `phone` | string | no |  | Phone Number. Search by phone number (delimiters like -, (), will be stripped automatically) |
| `contact_id` | number | no |  | Contact ID. Search by specific contact ID (most precise search) |
| `external_unique_id` | string | no |  | External Unique ID. Search by external unique identifier. |
| `contact_type` | string | no |  | Contact Type. Filter by contact type. One of `"Client"`, `"Past Client"`, `"Prospect"`, `"Vendor"`, `"Organization"`. |
| `type` | string | no |  | Contact Entity Type. Filter by entity type. One of `"person"`, `"household"`, `"organization"`, `"trust"`. |
| `household_title` | string | no |  | Household Title. Filter by household title (only applies to household members) One of `"Head"`, `"Spouse"`, `"Partner"`, `"Child"`, `"Grandchild"`, `"Parent"`, `"Grandparent"`, `"Sibling"`, `"Other"`, `"Dependent"`. |
| `tags_filter` | array | no |  | Tags Filter. Filter contacts by tags. Values the product loads from the provider, such as ids; write an array of them. |
| `active` | string | no |  | Active Status. Filter by active status. One of `"true"`, `"false"`, `""`. |
| `include_deleted` | boolean | no | `false` | Include Deleted Contacts. Include contacts that have been deleted. |
| `updated_since` | ISO date-time string | no |  | Updated Since. Only return contacts updated on or after this date/time. |
| `updated_before` | ISO date-time string | no |  | Updated Before. Only return contacts updated on or before this date/time. |
| `order` | string | no |  | Sort Order. How to order the results. One of `"recent"`, `"created"`, `"updated"`, `"asc"`, `"desc"`. |
| `limit` | number | no | `50` | Result Limit. Maximum number of contacts to return (default: 50, max: 1000) |
| `return_single_result` | boolean | no | `false` | Return Single Result Only. If checked, returns only the first matching contact. If unchecked, returns all matching contacts. |

### `find_task`

**Find Task.** Searches Wealthbox tasks by linked resource, assignee, creator, completion status, type, or update date. Supplying a Task ID alone fetches that single record directly; otherwise it runs a filtered list query and can return all matches or just the first. Use to look up existing tasks or resolve a task id; at least one criterion is required. Idempotent: read-only, no data is modified. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | number | no |  | Task ID (Optional). Search for a specific task by its unique ID. Leave empty to search using filters. |
| `resource_type` | string | no |  | Linked Resource Type. Filter tasks by the type of resource they are linked to. One of `"Contact"`, `"Project"`, `"Opportunity"`. |
| `resource_record` | object | no |  | Linked Resource. Select the specific resource to filter tasks by. An object whose fields depend on other inputs; the product shows them. |
| `assigned_to` | string | no |  | Assigned To. Filter tasks by the user they are assigned to. A value the product loads from the provider, such as an id; write the value itself. |
| `assigned_to_team` | number | no |  | Assigned to Team ID. Filter tasks by the team they are assigned to. |
| `created_by` | string | no |  | Created By. Filter tasks by the user who created them. A value the product loads from the provider, such as an id; write the value itself. |
| `completed` | string | no |  | Completion Status. Filter by task completion status. One of `""`, `"true"`, `"false"`. |
| `task_type` | string | no |  | Task Type. Filter by task type. One of `"all"`, `"parents"`, `"subtasks"`. |
| `updated_since` | ISO date-time string | no |  | Updated Since. Only return tasks updated on or after this date/time. |
| `updated_before` | ISO date-time string | no |  | Updated Before. Only return tasks updated on or before this date/time. |
| `limit` | number | no | `50` | Result Limit. Maximum number of tasks to return (default: 50, max: 1000) |
| `return_single_result` | boolean | no | `false` | Return Single Result Only. If checked, returns only the first matching task. If unchecked, returns all matching tasks. |

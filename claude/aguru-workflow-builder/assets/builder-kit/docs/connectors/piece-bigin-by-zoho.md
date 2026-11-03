# Bigin by Zoho CRM

Bigin by Zoho CRM is a lightweight CRM designed for small businesses to manage contacts, companies, deals (pipeline records), tasks, calls, and events.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bigin-by-zoho'
  version: '0.1.7'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes | `"https://accounts.zoho.com"` | Your Data Center Region. Select your Zoho data center region for your account. One of `"https://accounts.zoho.com"`, `"https://accounts.zoho.com"`, `"https://accounts.zoho.com"`, `"https://accounts.zoho.com"`, `"https://accounts.zoho.com.cn"`, `"https://accounts.zoho.com"`, `"https://accounts.zoho.com"`, `"https://accounts.zoho.com"`. |

## Actions

### `createCompany`

**Create Company.** Creates a new company (account) record in Bigin CRM with a name plus optional phone, website, billing address, owner, tags, and description. Use to add an organization the business deals with. Not idempotent: each call creates a new company even if one with the same name already exists, so search first if you need to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountName` | string | yes |  | Account Name. Provide the name of the company. |
| `phone` | string | no |  | Phone. Provide a phone number for the company. |
| `website` | string | no |  | Website. Provide a website URL for the company. |
| `tag` | array | no | `[]` | Tags. Select tags to associate with this module, "Accounts". Values the product loads from the provider, such as ids; write an array of them. |
| `description` | string | no |  | Description. Provide additional descriptions or notes related to the company. |
| `owner` | string | no |  | Owner. Select the owner to which the record will be assigned. A value the product loads from the provider, such as an id; write the value itself. |
| `billingStreet` | string | no |  | Billing Street. The street address of the company. |
| `billingCity` | string | no |  | Billing City. The city where the company is located. |
| `billingState` | string | no |  | Billing State. The state or province where the company is located. |
| `billingCountry` | string | no |  | Billing Country. The country of the company. |
| `billingCode` | string | no |  | Billing Code. The ZIP or postal code of the company. |

### `updateCompany`

**Update Company.** Updates an existing company (account) record in Bigin CRM, identified by selecting the company; its current fields are prepopulated and any you set are overwritten (owner, tags, billing address, and module-defined fields). Use to modify an organization that already exists. Idempotent: re-sending the same field values leaves the record in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Select Company. Choose a company to update. A value the product loads from the provider, such as an id; write the value itself. |
| `owner` | string | no |  | Owner. Select the owner to which the record will be assigned. A value the product loads from the provider, such as an id; write the value itself. |
| `companyDetails` | object | yes |  | Company Details. These fields will be prepopulated with company data. An object whose fields depend on other inputs; the product shows them. |
| `tag` | array | no | `[]` | Tags. Select tags to associate with this module, "Accounts". Values the product loads from the provider, such as ids; write an array of them. |

### `createContact`

**Create Contact.** Creates a new contact (person) record in Bigin CRM. Last name is required; optionally set email, mobile, title, owner, associated company, tags, mailing address, and description. Use to add a person to the CRM. Not idempotent: each call creates a new contact even with identical details, so search first to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | no |  | First Name. First name of the contact. |
| `lastName` | string | yes |  | Last Name. Last name of the contact. |
| `title` | string | no |  | Title. Job title of the contact. |
| `email` | string | no |  | Email. Email address of the contact. |
| `mobile` | string | no |  | Mobile. Mobile phone number. |
| `emailOptOut` | boolean | no | `false` | Email Opt Out. Whether the contact has opted out of emails. |
| `owner` | string | no |  | Owner. Select the owner to which the record will be assigned. A value the product loads from the provider, such as an id; write the value itself. |
| `accountName` | string | no |  | Company. The ID of the company to which the record will be associated. If not provided, the record will not be associated with any company. A value the product loads from the provider, such as an id; write the value itself. |
| `tag` | array | no | `[]` | Tags. Select tags to associate with this module, "Contacts". Values the product loads from the provider, such as ids; write an array of them. |
| `description` | string | no |  | Description. Provide additional descriptions or notes related to the contact. |
| `mailingStreet` | string | no |  | Mailing Street. Street address for mailing. |
| `mailingCity` | string | no |  | Mailing City. City for mailing address. |
| `mailingState` | string | no |  | Mailing State. State for mailing address. |
| `mailingCountry` | string | no |  | Mailing Country. Country for mailing address. |
| `mailingZip` | string | no |  | Mailing Zip. ZIP/postal code. |

### `updateContact`

**Update Contact.** Updates an existing contact (person) record in Bigin CRM, identified by selecting the contact; its current fields are prepopulated and any you set are overwritten (owner, associated company, tags, and module-defined fields). Use to modify a person who already exists. Idempotent: re-sending the same field values leaves the record in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Select Contact. Choose a contact to update. A value the product loads from the provider, such as an id; write the value itself. |
| `contactDetails` | object | yes |  | Contact Fields. Edit any of these fields. An object whose fields depend on other inputs; the product shows them. |
| `accountName` | string | no |  | Company. The ID of the company to which the record will be associated. If not provided, the record will not be associated with any company. A value the product loads from the provider, such as an id; write the value itself. |
| `tag` | array | no | `[]` | Tags. Select tags to associate with this module, "Contacts". Values the product loads from the provider, such as ids; write an array of them. |

### `createTask`

**Create Task.** Creates a new task in Bigin CRM with a subject plus optional due date, owner, priority, status, description, and tags. Supports optional recurrence (daily/weekly/monthly/yearly RRULE) and reminders, and can be linked to a related Contact, Pipeline, or Company record. Use to schedule follow-up work. Not idempotent: each call creates a new task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | yes |  | Subject. Provide the subject or title of the task. |
| `owner` | string | no |  | Owner. Select the owner to which the record will be assigned. A value the product loads from the provider, such as an id; write the value itself. |
| `dueDate` | ISO date-time string | no |  | Due Date. Provide the due date of the task (YYYY-MM-DD format) |
| `enableRecurring` | boolean | no |  | Make Task Recurring. make this task recurring. |
| `recurringInfo` | object | no |  | Recurring Info. Please note: Due Date must be set above for recurring tasks. An object whose fields depend on other inputs; the product shows them. |
| `enableReminder` | boolean | no |  | Enable Reminder. Enable reminder for this task. |
| `reminderInfo` | object | no |  | Reminder Information. An object whose fields depend on other inputs; the product shows them. |
| `relatedModule` | string | no | `"Contacts"` | Related Module. Select the type of entity the task is related to. Options: Contacts, Pipelines, Companies. One of `"Contacts"`, `"Pipelines"`, `"Companies"`. |
| `relatedTo` | string | no | `{}` | Related To. Select the specific record the task is related to. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. Provide additional descriptions or notes related to the task. |
| `priority` | string | no |  | Priority. Provide the priority level of the task. One of `"High"`, `"Normal"`, `"Low"`, `"Lowest"`, `"Highest"`. |
| `status` | string | no |  | Status. Provide the current status of the task. One of `"In Progress"`, `"Completed"`, `"Deferred"`, `"Waiting on someone else"`, `"Not Started"`. |
| `tag` | array | no | `[]` | Tags. Select tags to associate with this module, "Tasks". Values the product loads from the provider, such as ids; write an array of them. |

### `updateTask`

**Update Task.** Updates an existing task in Bigin CRM, identified by selecting the task; its current fields are prepopulated and any you set are overwritten (subject, owner, due date, priority, status, description, tags), with optional recurrence and reminder settings and a related Contact/Pipeline/Company link. Use to modify a task that already exists. Idempotent: re-sending the same field values leaves the record in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Select Task. Choose a task to update. A value the product loads from the provider, such as an id; write the value itself. |
| `owner` | string | no |  | Owner. Select the owner to which the record will be assigned. A value the product loads from the provider, such as an id; write the value itself. |
| `taskDetails` | object | yes |  | Task Details. These fields will be prepopulated with task data. An object whose fields depend on other inputs; the product shows them. |
| `enableRecurring` | boolean | no |  | Make Task Recurring. make this task recurring. |
| `recurringInfo` | object | no |  | Recurring Info. Please note: Due Date must be set above for recurring tasks. An object whose fields depend on other inputs; the product shows them. |
| `enableReminder` | boolean | no |  | Enable Reminder. Enable reminder for this task. |
| `reminderInfo` | object | no |  | Reminder Information. An object whose fields depend on other inputs; the product shows them. |
| `relatedModule` | string | no | `"Contacts"` | Related Module. Select the type of entity the task is related to. Options: Contacts, Pipelines, Companies. A value the product loads from the provider, such as an id; write the value itself. |
| `relatedTo` | string | no |  | Related To. Select the specific record the task is related to. A value the product loads from the provider, such as an id; write the value itself. |
| `tag` | array | no | `[]` | Tags. Select tags to associate with this module, "Tasks". Values the product loads from the provider, such as ids; write an array of them. |

### `createCall`

**Create Call.** Logs a call in Bigin CRM with a required start time, duration in minutes, and type (Outbound, Inbound, or Missed), plus optional subject, description, agenda, reminder, dialed number, owner, contact, and a related Pipeline or Company record. Use to record a phone interaction. Not idempotent: each call creates a new call log entry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `callStartTime` | ISO date-time string | yes |  | Call Start Time. Provide the start time of the call in ISO8601 format. |
| `callDuration` | number | yes |  | Call Duration (minutes). Provide the duration of the call in minutes (numeric). For example, 30 for a 30-minute call. |
| `callType` | string | yes |  | Call Type. Type of call. One of `"Outbound"`, `"Inbound"`, `"Missed"`. |
| `owner` | string | no |  | Owner. Select the owner to which the record will be assigned. A value the product loads from the provider, such as an id; write the value itself. |
| `contactName` | string | no |  | Contacts. The ID of the contact to which the record will be associated. If not provided, the record will not be associated with any contact. A value the product loads from the provider, such as an id; write the value itself. |
| `subject` | string | no |  | Subject. Subject of the call. |
| `description` | string | no |  | Description. Description or notes about the call. |
| `callAgenda` | string | no |  | Call Agenda. Agenda or purpose of the call. |
| `reminder` | ISO date-time string | no |  | Reminder. Reminder date and time for the call. |
| `dialledNumber` | string | no |  | Dialed Number. Provide the number dialed for the call. |
| `relatedModule` | string | no | `"Pipelines"` | Related Module. Select the type of entity the call is related to. One of `"Pipelines"`, `"Companies"`. |
| `relatedTo` | string | no | `{}` | Related To. Select the specific record the call is related to. A value the product loads from the provider, such as an id; write the value itself. |
| `tag` | array | no | `[]` | Tags. Select tags to associate with this module, "Calls". Values the product loads from the provider, such as ids; write an array of them. |

### `createEvent`

**Create Event.** Creates a calendar event in Bigin CRM with a title, start and end date/time (end must be after start), plus optional all-day flag, venue, participants, description, and tags. Supports optional recurrence (daily/weekly/monthly/yearly RRULE) and reminders, and can be linked to a related Contact, Pipeline, or Company record. Use to schedule a meeting or appointment. Not idempotent: each call creates a new event. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventTitle` | string | yes |  | Event Title. Provide the title or name of the event. |
| `owner` | string | no |  | Owner. Select the owner to which the record will be assigned. A value the product loads from the provider, such as an id; write the value itself. |
| `startDateTime` | ISO date-time string | yes |  | Start Date & Time. Start date and time of the event. |
| `endDateTime` | ISO date-time string | yes |  | End Date & Time. End date and time of the event. |
| `allDay` | boolean | no |  | All Day Event. Mark this as an all-day event. |
| `enableRecurring` | boolean | no |  | Make Event Recurring. Make this event recurring. |
| `recurringInfo` | object | no |  | Recurring Info. An object whose fields depend on other inputs; the product shows them. |
| `enableReminder` | boolean | no |  | Enable Reminder. Enable reminder for this event. |
| `reminderInfo` | object | no |  | Reminder Information. An object whose fields depend on other inputs; the product shows them. |
| `venue` | string | no |  | Venue. Location or venue of the event. |
| `relatedModule` | string | no | `"Contacts"` | Related Module. Select the type of entity the event is related to. One of `"Contacts"`, `"Pipelines"`, `"Companies"`. |
| `relatedTo` | string | no | `{}` | Related To. Select the specific record the event is related to. A value the product loads from the provider, such as an id; write the value itself. |
| `participants` | array | no |  | Participants. Add participants to the event. Each item: { `type`, `participant` }. |
| `description` | string | no |  | Description. Additional descriptions or notes related to the event. |
| `tag` | array | no | `[]` | Tags. Select tags to associate with this module, "Events". Values the product loads from the provider, such as ids; write an array of them. |

### `updateEvent`

**Update Event.** Updates an existing calendar event in Bigin CRM, identified by selecting the event; its current fields are prepopulated and any you set are overwritten (title, start/end time, all-day, venue, participants, owner, tags), with optional recurrence and reminder settings. Use to modify an event that already exists. Idempotent: re-sending the same field values leaves the record in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventId` | string | yes |  | Select Event. Choose the event to update. A value the product loads from the provider, such as an id; write the value itself. |
| `eventFields` | object | no |  | Event Fields. An object whose fields depend on other inputs; the product shows them. |
| `enableRecurring` | boolean | no |  | Make Event Recurring. Make this event recurring. |
| `recurringInfo` | object | no |  | Recurring Info. An object whose fields depend on other inputs; the product shows them. |
| `enableReminder` | boolean | no |  | Enable Reminder. Enable reminder for this event. |
| `reminderInfo` | object | no |  | Reminder Information. An object whose fields depend on other inputs; the product shows them. |
| `owner` | string | no |  | Owner. Select the owner to which the record will be assigned. A value the product loads from the provider, such as an id; write the value itself. |
| `relatedModule` | string | no |  | Related Module. Select the type of entity the event is related to. A value the product loads from the provider, such as an id; write the value itself. |
| `relatedTo` | string | no |  | Related To. Select the specific record the event is related to. A value the product loads from the provider, such as an id; write the value itself. |
| `tag` | array | no | `[]` | Tags. Select tags to associate with this module, "Events". Values the product loads from the provider, such as ids; write an array of them. |

### `createPipeline`

**Create Pipeline.** Creates a new pipeline record (deal) in Bigin CRM with a deal name, pipeline, sub-pipeline, stage, and closing date, plus optional amount, owner, company, contact, secondary contacts, associated products, tags, and module-defined fields. Use to open a new sales opportunity. Not idempotent: each call creates a new deal. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealName` | string | yes |  | Deal Name. Provide the name for the pipeline record (deal) |
| `pipeline` | string | no |  | Pipelines. Provide the Team Pipeline to which the pipeline record (deal) belongs. A value the product loads from the provider, such as an id; write the value itself. |
| `subPipeline` | string | yes |  | Sub Pipeline. Pick one of the configured sub-pipelines. A value the product loads from the provider, such as an id; write the value itself. |
| `stage` | string | yes |  | Stage. Provide the current stage of the pipeline record (deal) within the Sub-Pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `amount` | number | no |  | Amount. The amount of the pipeline record (deal) |
| `secondaryContacts` | array | no |  | Secondary Contacts. Provide a list of additional contacts associated with the record. Values the product loads from the provider, such as ids; write an array of them. |
| `closingDate` | ISO date-time string | yes |  | Closing Date. Provide the expected or actual closing date of the pipeline record (deal) in YYYY-MM-DD format. |
| `owner` | string | no |  | Owner. Select the owner to which the record will be assigned. A value the product loads from the provider, such as an id; write the value itself. |
| `accountName` | string | no |  | Company. The ID of the company to which the record will be associated. If not provided, the record will not be associated with any company. A value the product loads from the provider, such as an id; write the value itself. |
| `contactName` | string | no |  | Contacts. The ID of the contact to which the record will be associated. If not provided, the record will not be associated with any contact. A value the product loads from the provider, such as an id; write the value itself. |
| `associatedProducts` | array | no |  | Associated Products. Provide a list of products associated with the record. Values the product loads from the provider, such as ids; write an array of them. |
| `tag` | array | no | `[]` | Tags. Select tags to associate with this module, "Pipelines". Values the product loads from the provider, such as ids; write an array of them. |
| `additionalFields` | object | no |  | Additional Fields. Optional fields from the Pipelines module. An object whose fields depend on other inputs; the product shows them. |

### `updatePipeline`

**Update Pipeline.** Updates an existing pipeline record (deal) in Bigin CRM, identified by selecting the record; any fields you set are overwritten (deal name, sub-pipeline, stage, amount, closing date, owner, company, contact, secondary contacts, associated products, tags). Use to advance a deal stage or revise its details. Idempotent: re-sending the same field values leaves the record in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pipelineRecordId` | string | no |  | Pipeline Record. Select a pipeline record. A value the product loads from the provider, such as an id; write the value itself. |
| `pipelineDetails` | object | yes |  | Pipeline Details. These fields will be prepopulated with pipeline data. An object whose fields depend on other inputs; the product shows them. |
| `pipeline` | string | no |  | Pipelines. Provide the Team Pipeline to which the pipeline record (deal) belongs. A value the product loads from the provider, such as an id; write the value itself. |
| `subPipeline` | string | yes |  | Sub Pipeline. Pick one of the configured sub-pipelines. A value the product loads from the provider, such as an id; write the value itself. |
| `stage` | string | yes |  | Stage. Provide the current stage of the pipeline record (deal) within the Sub-Pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `owner` | string | no |  | Owner. Select the owner to which the record will be assigned. A value the product loads from the provider, such as an id; write the value itself. |
| `accountName` | string | no |  | Company. The ID of the company to which the record will be associated. If not provided, the record will not be associated with any company. A value the product loads from the provider, such as an id; write the value itself. |
| `contactName` | string | no |  | Contacts. The ID of the contact to which the record will be associated. If not provided, the record will not be associated with any contact. A value the product loads from the provider, such as an id; write the value itself. |
| `secondaryContacts` | array | no |  | Secondary Contacts. Provide a list of additional contacts associated with the record. Values the product loads from the provider, such as ids; write an array of them. |
| `associatedProducts` | array | no |  | Associated Products. Provide a list of products associated with the record. Values the product loads from the provider, such as ids; write an array of them. |
| `tag` | array | no | `[]` | Tags. Select tags to associate with this module, "Pipelines". Values the product loads from the provider, such as ids; write an array of them. |

### `searchPipelineRecord`

**Search Pipeline Record.** Searches pipeline records (deals) in Bigin CRM and returns matches. Choose between Criteria mode (matches the Deal Name with equals or starts-with) and Word mode (a free-text word search across the module). Use to find a deal by name before referencing or updating it. Idempotent: read-only, repeating the search returns the same matches. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mode` | string | yes | `"criteria"` | Search Mode. One of `"criteria"`, `"word"`. |
| `dealName` | string | yes |  | Search Term. Deal Name (criteria) or word. |

### `searchCompanyRecord`

**Search Company Record.** Searches company (account) records in Bigin CRM and returns matches. Choose between Criteria mode (matches the Account Name with equals or starts-with) and Word mode (a free-text word search across the module). Use to find a company by name before referencing or updating it. Idempotent: read-only, repeating the search returns the same matches. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mode` | string | yes | `"criteria"` | Search Mode. One of `"criteria"`, `"word"`. |
| `companyName` | string | yes |  | Search Term. Company full name (criteria) or word. |

### `searchContactRecord`

**Search Contact Record.** Searches contact (person) records in Bigin CRM and returns matches. The search mode selects what the term is matched against: Criteria (name/email/mobile with equals or starts-with), a dedicated Email lookup, a dedicated Phone lookup, or a free-text Word search. Use to find a person by name, email, or phone before referencing or updating them. Idempotent: read-only, repeating the search returns the same matches. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mode` | string | yes | `"criteria"` | Search Mode. Choose how to search Contacts. One of `"criteria"`, `"email"`, `"phone"`, `"word"`. |
| `searchTerm` | string | yes |  | Search Term. Text, email, phone, or word based on the selected mode. |

### `searchProductRecord`

**Search Product Record.** Searches product records in Bigin CRM and returns matches. Choose between Criteria mode (matches Product Name or Product Code with equals or starts-with) and Word mode (a free-text word search across the module). Use to find a product by name or code before associating it with a deal. Idempotent: read-only, repeating the search returns the same matches. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mode` | string | yes | `"criteria"` | Search Mode. One of `"criteria"`, `"word"`. |
| `searchTerm` | string | yes |  | Search Term. Product name/code (criteria) or word. |

### `searchUser`

**Search User.** Finds Bigin CRM org users whose email contains the given term (case-insensitive substring match), filtering client-side over the user list; an optional user-type filter (e.g. active, admin, current user) and pagination narrow the fetched set. Use to resolve a user id for assigning records as owner. Idempotent: read-only, repeating the search returns the same matches. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. User email address (full or partial, case-insensitive match) |
| `type` | string | no |  | User Type (optional). One of `"AllUsers"`, `"ActiveUsers"`, `"DeactiveUsers"`, `"ConfirmedUsers"`, `"NotConfirmedUsers"`, `"DeletedUsers"`, `"ActiveConfirmedUsers"`, `"AdminUsers"`, `"ActiveConfirmedAdmins"`, `"CurrentUser"`. |
| `page` | number | no |  | Page. Page index (default 1) |
| `per_page` | number | no |  | Per Page. Records per page (max 200, default 200) |

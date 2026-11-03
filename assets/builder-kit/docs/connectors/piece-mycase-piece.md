# MyCase

Automate legal case management workflows with MyCase. Create and manage cases, clients, companies, events, tasks, time entries, documents, and more. Get notified when cases, events, people, companies, or leads are added or updated.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mycase-piece'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> ## MyCase OAuth 2.0 Setup
>
> ### Obtaining Client Credentials
> 1. Contact MyCase support at [https://www.mycase.com/support/](https://www.mycase.com/support/) to request OAuth 2.0 client credentials
> 2. Provide your application details and request a client ID and client secret
> 3. MyCase support will provide you with:
> - **Client ID**: Your OAuth Client ID
> - **Client Secret**: Your OAuth Client secret
> - **Redirect URI**: A pre-configured redirect URI for your application
>
> ### Required Permissions
> The authorizing user must have the **"Manage your firm's preferences, billing, and payment options"** permission set to **Yes** in MyCase.
>
> ### Authorization Flow
> MyCase uses OAuth 2.0 Authorization Code Grant flow with the following endpoints:
>
> **Authorization URL**: `https://auth.mycase.com/login_sessions/new`
> **Token URL**: `https://auth.mycase.com/tokens`
>
> ### Rate Limits
> - 25 requests per second per client
> - Access tokens are valid for 24 hours
> - Refresh tokens are valid for 2 weeks
>
> For detailed API documentation, visit: [https://mycaseapi.stoplight.io/docs/mycase-api-documentation/k5xpc4jyhkom7-getting-started](https://mycaseapi.stoplight.io/docs/mycase-api-documentation/k5xpc4jyhkom7-getting-started)

## Actions

### `create_case`

**Create Case.** Always inserts a new MyCase case with the given name plus optional stage, practice area, client/company/staff associations, and billing details. Case name must be unique and stage/practice-area values must already exist in MyCase. Not idempotent: calling twice creates two cases, so use Find or Create Case when you want to avoid duplicates, or Update Case to modify an existing one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Case Name. The name of the case (must be unique) |
| `case_number` | string | no |  | Case Number. An identifier for this case (recommended to be unique) |
| `opened_date` | string | no |  | Opened Date. The date the case was created/opened (ISO-8601 format: YYYY-MM-DD) |
| `case_stage` | string | no |  | Case Stage. The stage the case is currently in (must match MyCase system) |
| `practice_area` | string | no |  | Practice Area. The practice area for this case (must match MyCase system) |
| `description` | string | no |  | Description. A description for the case. |
| `sol_date` | string | no |  | Statute of Limitations Date. The statute of limitations date (ISO-8601 date format: YYYY-MM-DD) |
| `status` | string | no | `"open"` | Status. The status of the case. One of `"open"`, `"closed"`. |
| `outstanding_balance` | number | no |  | Outstanding Balance. The outstanding balance of this case. |
| `billing_contact_id` | number | no |  | Billing Contact ID. The ID of the client or company to assign as the billing contact. |
| `client_ids` | string | no |  | Client IDs. Comma-separated list of client IDs to associate with the case. |
| `company_ids` | string | no |  | Company IDs. Comma-separated list of company IDs to associate with the case. |
| `staff_id` | number | no |  | Staff ID. ID of staff member to associate with the case. |
| `lead_lawyer` | boolean | no | `false` | Lead Lawyer. Is the staff member the lead lawyer for this case? |
| `originating_lawyer` | boolean | no | `false` | Originating Lawyer. Is the staff member the originating lawyer for this case? |

### `create_case_stage`

**Create Case Stage.** Always inserts a new case stage with the given name, which can then be assigned to cases. Not idempotent: calling twice with the same name creates two stages, so verify the stage does not already exist before creating. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Case Stage Name. The name of the case stage. |

### `create_company`

**Create Company.** Create a new company (organization) record in MyCase, optionally setting contact details, an address, and linking it to existing cases and clients. Use when adding a firm or business contact; not idempotent, so calling it repeatedly creates duplicate companies. To revise an existing company instead, use Update Company. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Company Name. The name of the company. |
| `email` | string | no |  | Email. Company email address. |
| `website` | string | no |  | Website. Company website URL. |
| `main_phone_number` | string | no |  | Main Phone Number. Main phone number for the company. |
| `fax_phone_number` | string | no |  | Fax Phone Number. Fax phone number for the company. |
| `address1` | string | no |  | Address Line 1. Street address line 1. |
| `address2` | string | no |  | Address Line 2. Street address line 2. |
| `city` | string | no |  | City. City. |
| `state` | string | no |  | State. State. |
| `zip_code` | string | no |  | ZIP Code. ZIP/Postal code. |
| `country` | string | no |  | Country. Country. |
| `notes` | string | no |  | Notes. Additional information about the company (visible to firm members only) |
| `cases` | array | no |  | Cases. Cases to associate with the company. Values the product loads from the provider, such as ids; write an array of them. |
| `clients` | array | no |  | Clients. Clients to associate with the company. Values the product loads from the provider, such as ids; write an array of them. |

### `create_custom_field`

**Create Custom Field.** Always defines a new custom field on a MyCase resource type (case, client, company, expense, time, or time-and-expense), with a chosen field type. When the field type is "list" you must supply at least one list option. This is a schema/configuration change, not data entry. Not idempotent: each call adds another custom field. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Field Name. The name of the custom field. |
| `parent_type` | string | yes |  | Parent Type. The parent resource type of the custom field. One of `"case"`, `"client"`, `"company"`, `"expense"`, `"time"`, `"time_and_expense"`. |
| `field_type` | string | yes |  | Field Type. The field type of the custom field. One of `"short_text"`, `"long_text"`, `"numeric"`, `"boolean"`, `"date"`, `"list"`, `"currency"`. |
| `list_options` | array | no |  | List Options. List of options for the custom field (required if field type is "list") Each item: { `option` }. |

### `create_document`

**Create Document.** Always creates a new document metadata record in MyCase, either as a firm document or attached to a specific case (firm vs case mode is selected by Document Type, and a case must be chosen in case mode). This registers the document and returns a pre-signed S3 upload URL; it does not upload file bytes itself. Not idempotent: each call creates another document record. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_type` | string | yes | `"firm"` | Document Type. Choose whether to create a firm document or associate it with a specific case. One of `"firm"`, `"case"`. |
| `case` | string | no |  | Case. Select the case to associate this document with. A value the product loads from the provider, such as an id; write the value itself. |
| `path` | string | yes |  | Document Path. The relative path including document name (e.g., folder1/folder2/document_name). Folders will be created automatically. |
| `filename` | string | yes |  | Filename. The filename of the physical file including extension (e.g., file.pdf) |
| `description` | string | no |  | Description. The description of this document. |
| `assigned_date` | ISO date-time string | no |  | Assigned Date. The assigned date of this document. |
| `staff` | array | no |  | Staff. Staff members to share this document with (only for firm documents) Values the product loads from the provider, such as ids; write an array of them. |

### `create_event`

**Create Event.** Create a new calendar event in MyCase with a name, start/end times, and at least one assigned staff member, optionally flagging required attendees, marking all-day or private, and linking a location and case. Use to schedule meetings, hearings, or appointments; not idempotent, so repeated calls create duplicate events. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Event Name. The name of this event. |
| `start` | ISO date-time string | yes |  | Start Date/Time. The start date and time of this event. |
| `end` | ISO date-time string | yes |  | End Date/Time. The end date and time of this event. |
| `staff` | array | yes |  | Staff. Staff members to associate with this event. Values the product loads from the provider, such as ids; write an array of them. |
| `required_staff` | array | no |  | Required Staff. Staff members who are required to attend (all others are optional) Values the product loads from the provider, such as ids; write an array of them. |
| `description` | string | no |  | Description. Event description. |
| `all_day` | boolean | no | `false` | All Day Event. Is this an all day event? |
| `private` | boolean | no | `false` | Private Event. Is this a private event? |
| `location` | string | no |  | Location. The location associated with this event. A value the product loads from the provider, such as an id; write the value itself. |
| `case` | string | no |  | Case. The case associated with this event. A value the product loads from the provider, such as an id; write the value itself. |

### `create_expense`

**Create Expense.** Always inserts a new expense entry tied to a specific case, with activity name, entry date, cost, units, billable flag, and an optional staff member. The activity name is created automatically if it does not already exist. Not idempotent: each call records another expense, so guard against re-runs when retrying. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `activity_name` | string | yes |  | Activity Name. The activity name for this expense (will be created if it doesn't exist) |
| `case` | string | yes |  | Case. The case to associate with this expense. A value the product loads from the provider, such as an id; write the value itself. |
| `entry_date` | ISO date-time string | yes |  | Entry Date. The entry date of this expense. |
| `cost` | number | yes |  | Cost. Cost of the expense. |
| `units` | number | yes |  | Units. Number of units. |
| `billable` | boolean | yes | `true` | Billable. Is this expense billable? |
| `description` | string | no |  | Description. Description of the expense. |
| `staff` | string | no |  | Staff. The staff member associated with this expense. A value the product loads from the provider, such as an id; write the value itself. |

### `create_lead`

**Create Lead.** Always inserts a new lead (prospective client) with first and last name plus optional contact, address, drivers-license, referral-source, and referred-by details. Distinct from Create Person, which creates an established client rather than a lead. Not idempotent: each call creates another lead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | yes |  | First Name. The first name of the lead. |
| `last_name` | string | yes |  | Last Name. The last name of the lead. |
| `email` | string | no |  | Email. The email of the lead. |
| `middle_initial` | string | no |  | Middle Initial. The middle name or initial of the lead. |
| `cell_phone_number` | string | no |  | Cell Phone Number. Cell phone number. |
| `work_phone_number` | string | no |  | Work Phone Number. Work phone number. |
| `home_phone_number` | string | no |  | Home Phone Number. Home phone number. |
| `birthdate` | ISO date-time string | no |  | Birthdate. Date of birth. |
| `drivers_license_number` | string | no |  | Drivers License Number. Drivers license number. |
| `drivers_license_state` | string | no |  | Drivers License State. Drivers license state. |
| `lead_details` | string | no |  | Lead Details. Additional information (visible to firm members only) |
| `address1` | string | no |  | Address Line 1. Street address line 1. |
| `address2` | string | no |  | Address Line 2. Street address line 2. |
| `city` | string | no |  | City. City. |
| `state` | string | no |  | State. State. |
| `zip_code` | string | no |  | ZIP Code. ZIP/Postal code. |
| `country` | string | no |  | Country. Country. |
| `referral_source` | string | no |  | Referral Source. The referral source to associate with this lead. A value the product loads from the provider, such as an id; write the value itself. |
| `referred_by` | string | no |  | Referred By. Existing client or company who referred this lead. A value the product loads from the provider, such as an id; write the value itself. |

### `create_location`

**Create Location.** Always inserts a new location with the given name and optional address fields. Not idempotent: calling twice with the same name creates two locations, so use Find or Create Location when you want to avoid duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Location Name. The name of the location. |
| `address1` | string | no |  | Address Line 1. Street address line 1. |
| `address2` | string | no |  | Address Line 2. Street address line 2. |
| `city` | string | no |  | City. City. |
| `state` | string | no |  | State. State. |
| `zip_code` | string | no |  | ZIP Code. ZIP/Postal code. |
| `country` | string | no |  | Country. Country. |

### `create_note`

**Create Note.** Add a note (subject, body, and date) to a MyCase case, client, or company, selected via the entity type and entity ID. Use to attach written notes to a record; not idempotent, so repeated calls create duplicate notes. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity_type` | string | yes | `"case"` | Entity Type. Choose the type of entity to create the note for. One of `"case"`, `"client"`, `"company"`. |
| `entity` | string | yes |  | Entity. Select the entity to create the note for. A value the product loads from the provider, such as an id; write the value itself. |
| `subject` | string | yes |  | Subject. Subject of the note. |
| `note` | string | yes |  | Note. The body text of the note. |
| `date` | ISO date-time string | yes |  | Date. The date and time of the note. |

### `create_person`

**Create Person (Client).** Always inserts a new individual client (person) with first and last name plus optional contact, address, people-group, and case associations. Not idempotent: calling twice creates two clients, so use Find or Create Person to avoid duplicates, or Update Person to edit an existing one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | yes |  | First Name. The first name of the client. |
| `last_name` | string | yes |  | Last Name. The last name of the client. |
| `email` | string | no |  | Email. The email of the client. |
| `middle_name` | string | no |  | Middle Name. The middle name of the client. |
| `cell_phone_number` | string | no |  | Cell Phone Number. Cell phone number. |
| `work_phone_number` | string | no |  | Work Phone Number. Work phone number. |
| `home_phone_number` | string | no |  | Home Phone Number. Home phone number. |
| `fax_phone_number` | string | no |  | Fax Phone Number. Fax phone number. |
| `birthdate` | ISO date-time string | no |  | Birthdate. Date of birth. |
| `notes` | string | no |  | Notes. Additional information (visible to firm members only) |
| `address1` | string | no |  | Address Line 1. Street address line 1. |
| `address2` | string | no |  | Address Line 2. Street address line 2. |
| `city` | string | no |  | City. City. |
| `state` | string | no |  | State. State. |
| `zip_code` | string | no |  | ZIP Code. ZIP/Postal code. |
| `country` | string | no |  | Country. Country. |
| `people_group` | string | no |  | People Group. The people group to associate with this client. A value the product loads from the provider, such as an id; write the value itself. |
| `cases` | array | no |  | Cases. Cases to associate with this client. Values the product loads from the provider, such as ids; write an array of them. |

### `create_practice_area`

**Create Practice Area.** Create a new practice area in MyCase by name. Use to add a new area of legal practice; not idempotent and performs no duplicate check, so repeated calls may create multiple practice areas with the same name. To look up existing practice areas first, use Find Practice Area. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Practice Area Name. The name of the practice area. |

### `create_referral_source`

**Create Referral Source.** Always inserts a new MyCase referral source with the given name. Not idempotent: calling twice with the same name creates two sources, so check Find Referral Source first if you need to avoid duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Referral Source Name. The name of the referral source. |

### `create_task`

**Create Task.** Create a new task in MyCase with a name, priority, due date, and at least one assigned staff member, optionally linking it to a case. Use to add to-do items for the firm; not idempotent, so repeated calls create duplicate tasks. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Task Name. The name of this task. |
| `priority` | string | yes | `"Medium"` | Priority. The priority of this task. One of `"Low"`, `"Medium"`, `"High"`. |
| `due_date` | ISO date-time string | yes |  | Due Date. The due date of this task. |
| `staff` | array | yes |  | Staff. Staff members to assign this task to. Values the product loads from the provider, such as ids; write an array of them. |
| `description` | string | no |  | Description. Task description. |
| `completed` | boolean | no | `false` | Completed. Is this task completed? |
| `case` | string | no |  | Case. The case to associate with this task. A value the product loads from the provider, such as an id; write the value itself. |

### `create_time_entry`

**Create Time Entry.** Create a billable or non-billable time entry in MyCase against a specific case and staff member, recording an activity name, entry date, rate, and hours. Use to log work time for billing; not idempotent, so repeated calls create duplicate entries. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `activity_name` | string | yes |  | Activity Name. The activity name for this time entry. |
| `case` | string | yes |  | Case. The case to associate with this time entry. A value the product loads from the provider, such as an id; write the value itself. |
| `staff` | string | yes |  | Staff. The staff member associated with this time entry. A value the product loads from the provider, such as an id; write the value itself. |
| `entry_date` | ISO date-time string | yes |  | Entry Date. The entry date of this time entry. |
| `rate` | number | yes |  | Rate. The rate in dollars. |
| `hours` | number | yes |  | Hours. The duration in hours. |
| `description` | string | no |  | Description. Description of the time entry. |
| `billable` | boolean | no | `true` | Billable. Is this time entry billable? |
| `flat_fee` | boolean | no | `false` | Flat Fee. Is this time entry a flat fee? |

### `create_call`

**Create Call.** Log a phone call in MyCase, recording when it happened, the caller phone number, a message, and the staff member it is for. Identify the caller by name (unknown), an existing client, or an existing lead via the caller type. Use to record inbound/outbound calls; not idempotent, so repeated calls create duplicate log entries. To review logged calls, use Find Call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `called_at` | ISO date-time string | yes |  | Called At. When the call happened. |
| `caller_phone_number` | string | yes |  | Caller Phone Number. The caller's phone number. |
| `call_for` | string | yes |  | Call For. The staff member this call is associated with. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | yes |  | Message. A description of the call. |
| `caller_type` | string | yes | `"unknown"` | Caller Type. Choose how to identify the caller. One of `"unknown"`, `"client"`, `"lead"`. |
| `caller_name` | string | no |  | Caller Name. The caller's name. |
| `client` | string | no |  | Client. The existing client. A value the product loads from the provider, such as an id; write the value itself. |
| `lead` | string | no |  | Lead. The existing lead. A value the product loads from the provider, such as an id; write the value itself. |
| `call_type` | string | no | `"incoming"` | Call Type. Type of call. One of `"incoming"`, `"outgoing"`. |
| `resolved` | boolean | no | `false` | Resolved. Should this call show as resolved? |

### `update_case`

**Update Case.** Overwrites an existing case (selected by ID) with the supplied name, stage, practice area, parties, staff, and billing fields. Use to modify a known case rather than create one. The update replaces the named fields wholesale, so pass complete values; lawyer roles are derived from which selected staff member matches the chosen lead/originating lawyer. Re-running with the same input lands the case in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `case_id` | string | yes |  | Case. Select the case to update. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Case Name. The name of the case (must be unique) |
| `case_number` | string | no |  | Case Number. An identifier for this case. |
| `opened_date` | ISO date-time string | no |  | Opened Date. The date the case was created/opened. |
| `case_stage` | string | no |  | Case Stage. The stage the case is currently in. A value the product loads from the provider, such as an id; write the value itself. |
| `practice_area` | string | no |  | Practice Area. The practice area for this case. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. A description for the case. |
| `sol_date` | ISO date-time string | no |  | Statute of Limitations Date. The statute of limitations date. |
| `status` | string | no |  | Status. The status of the case. One of `"open"`, `"closed"`. |
| `outstanding_balance` | number | no |  | Outstanding Balance. The outstanding balance of this case. |
| `billing_contact` | string | no |  | Billing Contact. The client or company to assign as the billing contact. A value the product loads from the provider, such as an id; write the value itself. |
| `clients` | array | no |  | Clients. Clients to associate with the case. Values the product loads from the provider, such as ids; write an array of them. |
| `companies` | array | no |  | Companies. Companies to associate with the case. Values the product loads from the provider, such as ids; write an array of them. |
| `staff` | array | no |  | Staff. Staff members to associate with the case. Values the product loads from the provider, such as ids; write an array of them. |
| `lead_lawyer` | string | no |  | Lead Lawyer. Select the lead lawyer for this case. A value the product loads from the provider, such as an id; write the value itself. |
| `originating_lawyer` | string | no |  | Originating Lawyer. Select the originating lawyer for this case. A value the product loads from the provider, such as an id; write the value itself. |

### `update_company`

**Update Company.** Update an existing MyCase company identified by its company ID, replacing contact details, address, and linked cases/clients with the supplied values. Use to modify a company you have already resolved (e.g. via Find Case/clients lookups); requires a valid company_id. Idempotent for a given set of inputs. To add a brand-new company, use Create Company. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_id` | string | yes |  | Company. Select the company to update. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Company Name. The name of the company. |
| `email` | string | no |  | Email. Company email address. |
| `website` | string | no |  | Website. Company website URL. |
| `main_phone_number` | string | no |  | Main Phone Number. Main phone number for the company. |
| `fax_phone_number` | string | no |  | Fax Phone Number. Fax phone number for the company. |
| `address1` | string | no |  | Address Line 1. Street address line 1. |
| `address2` | string | no |  | Address Line 2. Street address line 2. |
| `city` | string | no |  | City. City. |
| `state` | string | no |  | State. State. |
| `zip_code` | string | no |  | ZIP Code. ZIP/Postal code. |
| `country` | string | no |  | Country. Country. |
| `notes` | string | no |  | Notes. Additional information about the company (visible to firm members only) |
| `cases` | array | no |  | Cases. Cases to associate with the company. Values the product loads from the provider, such as ids; write an array of them. |
| `clients` | array | no |  | Clients. Clients to associate with the company. Values the product loads from the provider, such as ids; write an array of them. |

### `update_person`

**Update Person (Client).** Overwrites an existing client (selected by ID) with the supplied name, contact, address, people-group, and case-association fields. Use to modify a known client rather than create one; first and last name are always sent, so provide complete values. Re-running with the same input lands the client in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `client_id` | string | yes |  | Client. Select the client to update. A value the product loads from the provider, such as an id; write the value itself. |
| `first_name` | string | yes |  | First Name. The first name of the client. |
| `last_name` | string | yes |  | Last Name. The last name of the client. |
| `email` | string | no |  | Email. The email of the client. |
| `middle_name` | string | no |  | Middle Name. The middle name of the client. |
| `cell_phone_number` | string | no |  | Cell Phone Number. Cell phone number. |
| `work_phone_number` | string | no |  | Work Phone Number. Work phone number. |
| `home_phone_number` | string | no |  | Home Phone Number. Home phone number. |
| `fax_phone_number` | string | no |  | Fax Phone Number. Fax phone number. |
| `birthdate` | ISO date-time string | no |  | Birthdate. Date of birth. |
| `notes` | string | no |  | Notes. Additional information (visible to firm members only) |
| `address1` | string | no |  | Address Line 1. Street address line 1. |
| `address2` | string | no |  | Address Line 2. Street address line 2. |
| `city` | string | no |  | City. City. |
| `state` | string | no |  | State. State. |
| `zip_code` | string | no |  | ZIP Code. ZIP/Postal code. |
| `country` | string | no |  | Country. Country. |
| `people_group` | string | no |  | People Group. The people group to associate with this client. A value the product loads from the provider, such as an id; write the value itself. |
| `cases` | array | no |  | Cases. Cases to associate with this client. Values the product loads from the provider, such as ids; write an array of them. |

### `make_request`

**API Request.** Escape hatch that sends an arbitrary authenticated HTTP request (GET/POST/PUT/PATCH/DELETE) to any MyCase API path with custom query params, body, and headers. Use only for endpoints not covered by a dedicated action; prefer the specific actions when one fits. Idempotency depends entirely on the method and path you supply, so treat write methods as unsafe to retry. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `method` | string | yes | `"GET"` | Method. HTTP method to use. One of `"GET"`, `"POST"`, `"PUT"`, `"PATCH"`, `"DELETE"`. |
| `path` | string | yes |  | Path. API endpoint path (e.g., /cases or /clients/123) |
| `query_params` | object | no |  | Query Parameters. Query parameters as JSON object. |
| `body` | JSON | no |  | Request Body. Request body as JSON (for POST, PUT, PATCH) |
| `headers` | object | no |  | Additional Headers. Additional headers as JSON object. |

### `find_case`

**Find Case.** List or search MyCase legal cases, optionally filtering by open/closed status and last-updated date, and selecting which client and custom-field columns to include. Use to look up cases or resolve a case to its ID before linking it to other records. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. Filter by case status. One of `"open"`, `"closed"`. |
| `updated_after` | ISO date-time string | no |  | Updated After. Filter cases updated after this date and time. |
| `page_size` | number | no | `25` | Page Size. Number of results per page (1-1000) |
| `client_fields` | string | no |  | Client Fields. Comma-separated list of client fields to include (e.g., id,first_name,last_name) |
| `custom_field_fields` | string | no |  | Custom Field Fields. Comma-separated list of custom field fields to include (e.g., id,field_type) |

### `find_call`

**Find Call.** List or search MyCase call-log entries, optionally filtering by last-updated date and limiting page size. Use to review logged phone calls or look one up. Read-only and idempotent. To log a new call, use Create Call. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `updated_after` | ISO date-time string | no |  | Updated After. Filter calls updated after this date and time. |
| `page_size` | number | no | `25` | Page Size. Number of results per page (1-1000) |

### `find_case_stage`

**Find Case Stage.** List or search MyCase case stages, optionally filtering by last-updated date and limiting page size. Use to resolve a stage name to its ID or browse configured stages. Read-only and idempotent. To create a stage when none matches, use Find or Create Case Stage. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `updated_after` | ISO date-time string | no |  | Updated After. Filter case stages updated after this date and time. |
| `page_size` | number | no | `25` | Page Size. Number of results per page (1-1000) |

### `find_company`

**Find Company.** Read-only search of MyCase companies by name, email, phone, fax, or an updated-after timestamp. Use to resolve a company ID before associating it with a case or a billing contact. Returns matches without modifying anything; if you instead want to guarantee a company exists, use Find or Create Company. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Filter by company name. |
| `email` | string | no |  | Email. Filter by email address. |
| `main_phone_number` | string | no |  | Main Phone Number. Filter by main phone number. |
| `fax_phone_number` | string | no |  | Fax Phone Number. Filter by fax phone number. |
| `updated_after` | ISO date-time string | no |  | Updated After. Filter companies updated after this date and time. |
| `page_size` | number | no | `25` | Page Size. Number of results per page (1-1000) |

### `find_location`

**Find Location.** List or search MyCase office/event locations, optionally filtering by last-updated date and limiting page size. Use to resolve a location name to its ID before referencing it elsewhere (e.g. when creating an event). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `updated_after` | ISO date-time string | no |  | Updated After. Filter locations updated after this date and time. |
| `page_size` | number | no | `25` | Page Size. Number of results per page (1-1000) |

### `find_people_group`

**Find People Group.** List or search MyCase people groups, optionally filtering by last-updated date and limiting page size. Use to browse contact groupings or resolve a group to its ID. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `updated_after` | ISO date-time string | no |  | Updated After. Filter people groups updated after this date and time. |
| `page_size` | number | no | `25` | Page Size. Number of results per page (1-1000) |

### `find_person`

**Find Person (Client).** List or search MyCase clients (individual people), filtering by name, email, phone numbers, or last-updated date. Use to find a person or resolve them to a client ID before linking elsewhere. Read-only and idempotent. Note this returns clients only, not leads or staff. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | no |  | First Name. Filter by first name. |
| `last_name` | string | no |  | Last Name. Filter by last name. |
| `email` | string | no |  | Email. Filter by email address. |
| `cell_phone_number` | string | no |  | Cell Phone Number. Filter by cell phone number. |
| `work_phone_number` | string | no |  | Work Phone Number. Filter by work phone number. |
| `home_phone_number` | string | no |  | Home Phone Number. Filter by home phone number. |
| `updated_after` | ISO date-time string | no |  | Updated After. Filter clients updated after this date and time. |
| `page_size` | number | no | `25` | Page Size. Number of results per page (1-1000) |

### `find_practice_area`

**Find Practice Area.** List or search MyCase practice areas, optionally filtering by last-updated date and limiting page size. Use to resolve a practice-area name to its ID or browse available practice areas. Read-only and idempotent. To add a missing practice area, use Create Practice Area. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `updated_after` | ISO date-time string | no |  | Updated After. Filter practice areas updated after this date and time. |
| `page_size` | number | no | `25` | Page Size. Number of results per page (1-1000) |

### `find_referral_source`

**Find Referral Source.** Read-only list of MyCase referral sources, optionally filtered by an updated-after timestamp and page size. Use to find an existing referral source ID before attaching it to a lead. Pure lookup with no side effects, safe to call repeatedly. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `updated_after` | ISO date-time string | no |  | Updated After. Filter referral sources updated after this date and time. |
| `page_size` | number | no | `25` | Page Size. Number of results per page (1-1000) |

### `find_staff`

**Find Staff.** Read-only list of MyCase staff (firm users), optionally narrowed by active/inactive status, an updated-after timestamp, and page size. Use to look up staff IDs needed when assigning lawyers or sharing documents. Returns whatever matches the filters and does not modify anything, so it is safe to call repeatedly. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. Filter by staff status. One of `"active"`, `"inactive"`. |
| `updated_after` | ISO date-time string | no |  | Updated After. Filter staff updated after this date and time. |
| `page_size` | number | no | `25` | Page Size. Number of results per page (1-1000) |

### `find_or_create_case`

**Find or Create Case.** Returns the MyCase case matching the given name (case-insensitive), creating it with the optional stage, practice area, parties, staff, and other fields only if no match exists. Use to guarantee a case exists without creating duplicates; repeat calls with the same name converge to one record and the extra fields apply only on creation. Use Create Case to always insert or Update Case to modify an existing one. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Case Name. The name of the case to find or create. |
| `case_number` | string | no |  | Case Number. An identifier for this case (used only when creating) |
| `opened_date` | ISO date-time string | no |  | Opened Date. The date the case was created/opened (used only when creating) |
| `case_stage` | string | no |  | Case Stage. The stage the case is currently in (used only when creating) A value the product loads from the provider, such as an id; write the value itself. |
| `practice_area` | string | no |  | Practice Area. The practice area for this case (used only when creating) A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. A description for the case (used only when creating) |
| `sol_date` | ISO date-time string | no |  | Statute of Limitations Date. The statute of limitations date (used only when creating) |
| `status` | string | no | `"open"` | Status. The status of the case (used only when creating) One of `"open"`, `"closed"`. |
| `outstanding_balance` | number | no |  | Outstanding Balance. The outstanding balance of this case (used only when creating) |
| `billing_contact` | string | no |  | Billing Contact. The client or company to assign as the billing contact (used only when creating) A value the product loads from the provider, such as an id; write the value itself. |
| `clients` | array | no |  | Clients. Clients to associate with the case (used only when creating) Values the product loads from the provider, such as ids; write an array of them. |
| `companies` | array | no |  | Companies. Companies to associate with the case (used only when creating) Values the product loads from the provider, such as ids; write an array of them. |
| `staff` | array | no |  | Staff. Staff members to associate with the case (used only when creating) Values the product loads from the provider, such as ids; write an array of them. |
| `lead_lawyer` | string | no |  | Lead Lawyer. Select the lead lawyer for this case (used only when creating) A value the product loads from the provider, such as an id; write the value itself. |
| `originating_lawyer` | string | no |  | Originating Lawyer. Select the originating lawyer for this case (used only when creating) A value the product loads from the provider, such as an id; write the value itself. |

### `find_or_create_case_stage`

**Find or Create Case Stage.** Resolve a MyCase case stage by exact (case-insensitive) name, creating it if no match exists, and return the stage. Use to guarantee a named stage is present without risking duplicates. Idempotent: repeated calls with the same name return the existing stage rather than creating another. Use Find Case Stage instead for a pure read with no creation. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Case Stage Name. The name of the case stage to find or create. |

### `find_or_create_company`

**Find or Create Company.** Returns the MyCase company matching the given name (case-insensitive), creating it with the optional contact, address, and association fields only if no match exists. Use to guarantee a company exists without creating duplicates; repeat calls with the same name converge to one record. The extra fields apply only on creation. Use Find Company for a pure lookup or Create Company to always insert. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Company Name. The name of the company to find or create. |
| `email` | string | no |  | Email. Company email address (used only when creating) |
| `website` | string | no |  | Website. Company website URL (used only when creating) |
| `main_phone_number` | string | no |  | Main Phone Number. Main phone number for the company (used only when creating) |
| `fax_phone_number` | string | no |  | Fax Phone Number. Fax phone number for the company (used only when creating) |
| `address1` | string | no |  | Address Line 1. Street address line 1 (used only when creating) |
| `address2` | string | no |  | Address Line 2. Street address line 2 (used only when creating) |
| `city` | string | no |  | City. City (used only when creating) |
| `state` | string | no |  | State. State (used only when creating) |
| `zip_code` | string | no |  | ZIP Code. ZIP/Postal code (used only when creating) |
| `country` | string | no |  | Country. Country (used only when creating) |
| `notes` | string | no |  | Notes. Additional information about the company (used only when creating) |
| `cases` | array | no |  | Cases. Cases to associate with the company (used only when creating) Values the product loads from the provider, such as ids; write an array of them. |
| `clients` | array | no |  | Clients. Clients to associate with the company (used only when creating) Values the product loads from the provider, such as ids; write an array of them. |

### `find_or_create_location`

**Find or Create Location.** Returns the MyCase location matching the given name (case-insensitive), creating it with the optional address fields only if no match exists. Use to guarantee a location exists without risking duplicates; repeat calls with the same name converge to one record. The address fields are applied only on creation, never to an existing match. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Location Name. The name of the location to find or create. |
| `address1` | string | no |  | Address Line 1. Street address line 1 (used only when creating) |
| `address2` | string | no |  | Address Line 2. Street address line 2 (used only when creating) |
| `city` | string | no |  | City. City (used only when creating) |
| `state` | string | no |  | State. State (used only when creating) |
| `zip_code` | string | no |  | ZIP Code. ZIP/Postal code (used only when creating) |
| `country` | string | no |  | Country. Country (used only when creating) |

### `find_or_create_person`

**Find or Create Person (Client).** Returns the MyCase client (individual person) matching the given first and last name (case-insensitive), creating it with the optional contact, address, people-group, and case fields only if no match exists. Use to guarantee a client exists without creating duplicates; matching is name-only, so distinct people sharing a name collapse to the first match. The extra fields apply only on creation. Use Create Person to always insert. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | yes |  | First Name. The first name of the client. |
| `last_name` | string | yes |  | Last Name. The last name of the client. |
| `email` | string | no |  | Email. The email of the client (used only when creating) |
| `middle_name` | string | no |  | Middle Name. The middle name of the client (used only when creating) |
| `cell_phone_number` | string | no |  | Cell Phone Number. Cell phone number (used only when creating) |
| `work_phone_number` | string | no |  | Work Phone Number. Work phone number (used only when creating) |
| `home_phone_number` | string | no |  | Home Phone Number. Home phone number (used only when creating) |
| `fax_phone_number` | string | no |  | Fax Phone Number. Fax phone number (used only when creating) |
| `birthdate` | string | no |  | Birthdate. Date of birth in ISO-8601 format: YYYY-MM-DD (used only when creating) |
| `notes` | string | no |  | Notes. Additional information (used only when creating) |
| `address1` | string | no |  | Address Line 1. Street address line 1 (used only when creating) |
| `address2` | string | no |  | Address Line 2. Street address line 2 (used only when creating) |
| `city` | string | no |  | City. City (used only when creating) |
| `state` | string | no |  | State. State (used only when creating) |
| `zip_code` | string | no |  | ZIP Code. ZIP/Postal code (used only when creating) |
| `country` | string | no |  | Country. Country (used only when creating) |
| `people_group` | string | no |  | People Group. The people group to associate (used only when creating) A value the product loads from the provider, such as an id; write the value itself. |
| `cases` | array | no |  | Cases. Cases to associate with the client (used only when creating) Values the product loads from the provider, such as ids; write an array of them. |

### `find_or_create_practice_area`

**Find or Create Practice Area.** Returns the MyCase practice area matching the given name (case-insensitive), creating it only if no match exists. Use to guarantee a practice area exists before assigning it to a case; repeat calls with the same name converge to one record rather than duplicating. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Practice Area Name. The name of the practice area to find or create. |

### `find_or_create_referral_source`

**Find or Create Referral Source.** Resolve a MyCase referral source by exact (case-insensitive) name, creating it if no match exists, and return the source. Use to ensure a named referral source is present without risking duplicates. Idempotent: repeated calls with the same name return the existing source rather than creating another. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Referral Source Name. The name of the referral source to find or create. |

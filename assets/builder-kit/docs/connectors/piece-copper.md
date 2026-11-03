# Copper

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-copper'
  version: '0.2.0'
```

Categories: SALES_AND_CRM, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. Email Address of the Token Owner. |
| `apiKey` | string | yes |  | API Key. Your API Key in settings > integrations. |

## Actions

### `createPerson`

**Create Person.** Creates a new person (contact) in Copper CRM with a name, one or more categorized emails, and optional phone numbers and address. Use to add a contact to the CRM. Requires at least one valid email. Not idempotent: each call creates a separate person record even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Full Name. |
| `emails` | array | yes | `[]` | Emails. Each item: { `email`, `category` }. |
| `phone_numbers` | array | no | `[]` | Phone Numbers. Each item: { `number`, `category` }. |
| `address_street` | string | no |  | Street. |
| `address_city` | string | no |  | City. |
| `address_state` | string | no |  | State/Region. |
| `address_postal_code` | string | no |  | Postal Code. |
| `address_country` | string | no |  | Country. |

### `updatePerson`

**Update Person.** Updates an existing person (contact) in Copper CRM, identified by person ID, overwriting name, emails, phone numbers, and address with the supplied values. Use to modify a known contact; requires the target person ID and at least one valid email. Idempotent: re-applying the same values leaves the record in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personId` | string | yes |  | Person. select a person. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | no |  | . An object whose fields depend on other inputs; the product shows them. |

### `createLead`

**Create Lead.** Creates a new lead in Copper CRM with a name, a single categorized email, and optional phone numbers and address. Use to capture a prospect not yet qualified into a person/opportunity. Not idempotent: each call creates a separate lead even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Full Name. |
| `email` | string | yes |  | Email. |
| `category` | string | yes |  | Category of the email address (e.g., work, personal). |
| `phone_numbers` | array | no | `[]` | Phone Numbers. Each item: { `number`, `category` }. |
| `address_street` | string | no |  | Street. |
| `address_city` | string | no |  | City. |
| `address_state` | string | no |  | State/Region. |
| `address_postal_code` | string | no |  | Postal Code. |
| `address_country` | string | no |  | Country. |

### `updateLead`

**Update Lead.** Updates an existing lead in Copper CRM, identified by lead ID, overwriting name, email, phone numbers, and address with the supplied values. Use to modify a known lead; requires the target lead ID. Idempotent: re-applying the same values leaves the record in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | yes |  | Lead. select a Lead. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | no |  | . An object whose fields depend on other inputs; the product shows them. |

### `convertLead`

**Convert Lead.** Converts a qualified lead in Copper CRM into a person, optionally linking it to an existing company and/or creating an opportunity from the selected opportunity template. Use once a lead is ready to be promoted into the contact/deal pipeline; requires the lead ID. Not idempotent: it consumes the lead and creates new records, so repeating it is not safe. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | yes |  | Lead. select a Lead. A value the product loads from the provider, such as an id; write the value itself. |
| `companyId` | string | no |  | Company. select a Company. A value the product loads from the provider, such as an id; write the value itself. |
| `opportunityId` | string | no |  | Opportunity. select an Opportunity. A value the product loads from the provider, such as an id; write the value itself. |

### `createCompany`

**Create Company.** Creates a new company in Copper CRM with a name and optional email domain, details, phone numbers, address, and a primary contact. Use to add an organization record. Not idempotent: each call creates a separate company even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Full Name. |
| `email_domain` | string | no |  | Email Domain. E.g. democompany.com. |
| `details` | string | no |  | Details. |
| `phone_numbers` | array | no | `[]` | Phone Numbers. Each item: { `number`, `category` }. |
| `address_street` | string | no |  | Street. |
| `address_city` | string | no |  | City. |
| `address_state` | string | no |  | State/Region. |
| `address_postal_code` | string | no |  | Postal Code. |
| `address_country` | string | no |  | Country. |
| `primaryContactId` | string | no |  | Primary Contact. select a primary contact. A value the product loads from the provider, such as an id; write the value itself. |

### `updateCompany`

**Update Company.** Updates an existing company in Copper CRM, identified by company ID, overwriting name, email domain, details, phone numbers, address, and primary contact with the supplied values. Use to modify a known company; requires the target company ID. Idempotent: re-applying the same values leaves the record in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company. select a Company. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | no |  | . An object whose fields depend on other inputs; the product shows them. |
| `primaryContactId` | string | no |  | Primary Contact. select a primary contact. A value the product loads from the provider, such as an id; write the value itself. |

### `createOpportunity`

**Create Opportunity.** Creates a new opportunity (deal) in Copper CRM with a name, placing it in a chosen pipeline and stage and optionally linking a primary contact. Use to open a new deal in the sales pipeline; requires a name and pipeline. Not idempotent: each call creates a separate opportunity even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The name of the opportunity. |
| `pipelineId` | string | no |  | Pipeline. select a Pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `pipelineStageId` | string | no |  | Pipeline Stage. Select a stage. A value the product loads from the provider, such as an id; write the value itself. |
| `primaryContactId` | string | no |  | Primary Contact. select a primary contact. A value the product loads from the provider, such as an id; write the value itself. |

### `updateOpportunity`

**Update Opportunity.** Updates an existing opportunity (deal) in Copper CRM, identified by opportunity ID, overwriting its name, pipeline, stage, and primary contact with the supplied values. Use to move a deal between stages/pipelines or rename it; requires the target opportunity ID and a pipeline. Idempotent: re-applying the same values leaves the record in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunityId` | string | yes |  | Opportunity. select an Opportunity. A value the product loads from the provider, such as an id; write the value itself. |
| `updateFields` | object | no |  | . An object whose fields depend on other inputs; the product shows them. |
| `pipelineId` | string | no |  | Pipeline. select a Pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `pipelineStageId` | string | no |  | Pipeline Stage. Select a stage. A value the product loads from the provider, such as an id; write the value itself. |
| `primaryContactId` | string | no |  | Primary Contact. select a primary contact. A value the product loads from the provider, such as an id; write the value itself. |

### `createProject`

**Create Project.** Creates a new project in Copper CRM with a name and optional details. Use to add a project record. Requires a name. Not idempotent: each call creates a separate project even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The name of the project. |
| `details` | string | no |  | Details. The details of the project. |

### `updateProject`

**Update Project.** Updates an existing project in Copper CRM, identified by project ID, overwriting its name and details with the supplied values. Use to modify a known project; requires the target project ID. Idempotent: re-applying the same values leaves the record in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. select a Project. A value the product loads from the provider, such as an id; write the value itself. |
| `updateFields` | object | no |  | . An object whose fields depend on other inputs; the product shows them. |

### `createTask`

**Create Task.** Creates a new task in Copper CRM with a name and optional details, assignee, due/reminder dates, priority, and tags, optionally linked to a related record (person, company, lead, opportunity, or project). Use to schedule follow-up work; requires a task name. Not idempotent: each call creates a separate task even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Task Name. |
| `details` | string | no |  | Details. Details fo this task. |
| `custom_activity_type_id` | string | yes |  | Activity Type. Select activity Type. A value the product loads from the provider, such as an id; write the value itself. |
| `assigneeId` | string | no |  | Assignee. select a user to assign to. A value the product loads from the provider, such as an id; write the value itself. |
| `entity` | string | no |  | Related Record Type. Choose the type of Copper record this task should be linked to (e.g. Person, Company, Lead, Opportunity, or Project). One of `"person"`, `"company"`, `"lead"`, `"opportunity"`, `"project"`. |
| `entityItemId` | string | no |  | Related Record. Select the specific record (from the chosen type above) that this task should be attached to. For example, pick the Person or Opportunity the task relates to. A value the product loads from the provider, such as an id; write the value itself. |
| `due_date` | ISO date-time string | no |  | Due Date/Time. Enter date and time in 24-hour format, e.g. `2025-09-09 11:40` (11:40 AM) or `2025-09-09 13:00` (1:00 PM). |
| `reminder_date` | ISO date-time string | no |  | Reminder Date/Time. Enter date and time in 24-hour format, e.g. `2025-09-09 11:40` (11:40 AM) or `2025-09-09 13:00` (1:00 PM) |
| `priority` | string | no |  | Priority. One of `"None"`, `"Low"`, `"Medium"`, `"High"`. |
| `tags` | array | no | `[]` | Tags. Each item: { `tag` }. |

### `createActivity`

**Create Activity.** Logs an activity (e.g. a note or interaction of a chosen activity type) against a parent Copper record — a person, company, lead, opportunity, project, or task. Use to record an interaction or note on an existing record; requires the parent entity type, the specific parent record, and an activity type. Not idempotent: each call appends a separate activity entry. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity` | string | yes |  | Parent Entity. Select parent entity. One of `"person"`, `"company"`, `"lead"`, `"opportunity"`, `"project"`, `"task"`. |
| `entityItemId` | string | yes |  | Parent Entity Resource. Select Resource. A value the product loads from the provider, such as an id; write the value itself. |
| `details` | string | no |  | Details. The details of the project. |
| `type` | string | yes |  | Activity Type. Select activity Type. A value the product loads from the provider, such as an id; write the value itself. |

### `searchForAnActivity`

**Search for an Activity.** Searches logged activities in Copper CRM, optionally narrowing by parent record (person, company, lead, opportunity, project, or task), activity types, and an activity-date range, with paging. Use to retrieve activity history; with no filters it returns recent activities across the account. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity` | string | no |  | Parent Entity. Select parent entity. One of `"person"`, `"company"`, `"lead"`, `"opportunity"`, `"project"`, `"task"`. |
| `entityItemId` | string | no |  | Parent Entity Resource. Select Resource. A value the product loads from the provider, such as an id; write the value itself. |
| `activity_types` | array | no |  | Activity Type. Select activity Type. Values the product loads from the provider, such as ids; write an array of them. |
| `page_size` | number | no | `50` | Page Size. Default 50. Max 200. |
| `page_number` | number | no | `1` | Page Number. |
| `minimum_activity_date` | ISO date-time string | no |  | Minimum Activity Date. 24-hour format, e.g. 2025-09-10 11:40. The timestamp of the earliest activity date. |
| `maximum_activity_date` | ISO date-time string | no |  | Maximum Activity Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest activity date. |
| `full_result` | boolean | no | `false` | Full Result. (Optional) If set, search performance improves but duplicate activity logs may be returned. |

### `searchForAPerson`

**Search for a Person.** Searches people (contacts) in Copper CRM, filtering by any combination of name, email, phone, contact type, assignee, company, opportunity, location, tags, socials, interaction counts/dates, and creation date, with sorting and paging. Use to find one or more contacts; with no filters it lists people across the account. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Full name of the People to search for. |
| `phone_number` | string | no |  | Phone Number. Phone Number of the People to search for. |
| `emails` | array | no | `[]` | Emails. Emails of the People to search for. |
| `contact_type_ids` | array | no |  | Contact Type. Select contact Type. Values the product loads from the provider, such as ids; write an array of them. |
| `assignee_ids` | array | no |  | Assignee. select assignees. Values the product loads from the provider, such as ids; write an array of them. |
| `company_ids` | array | no |  | Company. select Companies. Values the product loads from the provider, such as ids; write an array of them. |
| `opportunity_ids` | array | no |  | Opportunity. select Opportunities. Values the product loads from the provider, such as ids; write an array of them. |
| `city` | string | no |  | City. The city in which People must be located. |
| `state` | string | no |  | State. The state or province in which People must be located. |
| `postal_code` | string | no |  | Postal Code. The postal code in which People must be located. |
| `country` | string | no |  | Country. The two character country code where People must be located. |
| `tags` | array | no | `[]` | Tags. Filter People to those that match at least one of the tags specified. |
| `socials` | array | no | `[]` | Socials. Filter People to those that match at least one of the social accounts specified. |
| `followed` | string | no |  | Followed. Filter by followed state. One of `"1"`, `"2"`. |
| `age` | number | no |  | Age. The maximum age in seconds that People must be. |
| `page_size` | number | no | `50` | Page Size. Default 50. Max 200. |
| `page_number` | number | no | `1` | Page Number. |
| `sort_by` | string | no |  | Sort By. The field on which to sort the results. One of `"name"`, `"title"`, `"email"`, `"phone"`, `"date_modified"`, `"date_created"`, `"city"`, `"state"`, `"country"`, `"zip"`, `"socials"`. |
| `sort_direction` | string | no |  | Sort Direction. The direction in which to sort the result. One of `"asc"`, `"desc"`. |
| `minimum_interaction_count` | number | no |  | Minimum Interaction Count. The minimum number of interactions People must have had. |
| `maximum_interaction_count` | number | no |  | Maximum Interaction Count. The maximum number of interactions People must have had. |
| `minimum_interaction_date` | ISO date-time string | no |  | Minimum Interaction Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the earliest date of the last interaction. |
| `maximum_interaction_date` | ISO date-time string | no |  | Maximum Interaction Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest date of the last interaction. |
| `minimum_created_date` | ISO date-time string | no |  | Minimum Created Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the earliest date People are created. |
| `maximum_created_date` | ISO date-time string | no |  | Maximum Created Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest date People are Created. |

### `searchForALead`

**Search for a Lead.** Searches leads in Copper CRM, filtering by any combination of name, email, phone, assignee, status, customer source, location, tags, socials, monetary value, interaction counts/dates, and creation/modification dates, with sorting and paging; can optionally include already-converted leads. Use to find one or more leads; with no filters it lists leads across the account. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Full name of the Lead to search for. |
| `phone_number` | string | no |  | Phone Number. Phone Number of the Lead to search for. |
| `emails` | string | no |  | Emails. Emails of the Lead to search for. |
| `assignee_ids` | array | no |  | Assignee. select assignees. Values the product loads from the provider, such as ids; write an array of them. |
| `status_ids` | array | no |  | Lead Status. Select lead status. Values the product loads from the provider, such as ids; write an array of them. |
| `customer_source_ids` | array | no |  | Customer Source. Select customer source. Values the product loads from the provider, such as ids; write an array of them. |
| `city` | string | no |  | City. The city in which Lead must be located. |
| `state` | string | no |  | State. The state or province in which Lead must be located. |
| `postal_code` | string | no |  | Postal Code. The postal code in which Lead must be located. |
| `country` | string | no |  | Country. The two character country code where Lead must be located. |
| `tags` | array | no | `[]` | Tags. Filter Lead to those that match at least one of the tags specified. |
| `socials` | array | no | `[]` | Socials. Filter Lead to those that match at least one of the social accounts specified. |
| `followed` | string | no |  | Followed. Filter by followed state. One of `"1"`, `"2"`. |
| `age` | number | no |  | Age. The maximum age in seconds that Lead must be. |
| `page_size` | number | no | `50` | Page Size. Default 50. Max 200. |
| `page_number` | number | no | `1` | Page Number. |
| `sort_by` | string | no |  | Sort By. The field on which to sort the results. One of `"name"`, `"company_name"`, `"title"`, `"value"`, `"email"`, `"phone"`, `"date_modified"`, `"date_created"`, `"city"`, `"state"`, `"country"`, `"zip"`, `"inactive_days"`, `"socials"`. |
| `sort_direction` | string | no |  | Sort Direction. The direction in which to sort the result. One of `"asc"`, `"desc"`. |
| `include_converted_leads` | boolean | no | `false` | Include Converted Leads. Specify if response should contain converted leads. |
| `minimum_monetary_value` | number | no |  | Minimum Monetary Value. The minimum monetary value Leads must have. |
| `maximum_monetary_value` | number | no |  | Maximum Monetary Value. The maximum monetary value Leads must have. |
| `minimum_interaction_count` | number | no |  | Minimum Interaction Count. The minimum number of interactions Lead must have had. |
| `maximum_interaction_count` | number | no |  | Maximum Interaction Count. The maximum number of interactions Lead must have had. |
| `minimum_interaction_date` | ISO date-time string | no |  | Minimum Interaction Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the earliest date of the last interaction. |
| `maximum_interaction_date` | ISO date-time string | no |  | Maximum Interaction Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest date of the last interaction. |
| `minimum_created_date` | ISO date-time string | no |  | Minimum Created Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the earliest date Lead are created. |
| `maximum_created_date` | ISO date-time string | no |  | Maximum Created Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest date Lead are Created. |
| `minimum_modified_date` | ISO date-time string | no |  | Minimum Modified Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the earliest date Lead are Modified. |
| `maximum_modified_date` | ISO date-time string | no |  | Maximum Modified Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest date Lead are Modified. |

### `searchForACompany`

**Search for a Company.** Searches companies in Copper CRM, filtering by any combination of name, email domain, phone, contact type, assignee, location, tags, socials, interaction counts/dates, and creation date, with sorting and paging. Use to find one or more companies; with no filters it lists companies across the account. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Full name of the Company to search for. |
| `phone_number` | string | no |  | Phone Number. Phone Number of the Company to search for. |
| `email_domains` | string | no |  | Email Domain. Email Domain of the Company to search for. |
| `contact_type_ids` | array | no |  | Contact Type. Select contact Type. Values the product loads from the provider, such as ids; write an array of them. |
| `assignee_ids` | array | no |  | Assignee. select assignees. Values the product loads from the provider, such as ids; write an array of them. |
| `city` | string | no |  | City. The city in which Company must be located. |
| `state` | string | no |  | State. The state or province in which Company must be located. |
| `postal_code` | string | no |  | Postal Code. The postal code in which Company must be located. |
| `country` | string | no |  | Country. The two character country code where Company must be located. |
| `tags` | array | no | `[]` | Tags. Filter Company to those that match at least one of the tags specified. |
| `socials` | array | no | `[]` | Socials. Filter Company to those that match at least one of the social accounts specified. |
| `followed` | string | no |  | Followed. Filter by followed state. One of `"1"`, `"2"`. |
| `age` | number | no |  | Age. The maximum age in seconds that Company must be. |
| `page_size` | number | no | `50` | Page Size. Default 50. Max 200. |
| `page_number` | number | no | `1` | Page Number. |
| `sort_by` | string | no |  | Sort By. The field on which to sort the results. One of `"name"`, `"phone"`, `"contact"`, `"contact_first_name"`, `"contact_last_name"`, `"date_modified"`, `"date_created"`, `"email_domain"`, `"city"`, `"state"`, `"country"`, `"zip"`, `"assignee"`, `"contact_group"`, `"last_interaction"`, `"interaction_count"`, `"primary_website"`, `"socials"`. |
| `sort_direction` | string | no |  | Sort Direction. The direction in which to sort the result. One of `"asc"`, `"desc"`. |
| `minimum_interaction_count` | number | no |  | Minimum Interaction Count. The minimum number of interactions Company must have had. |
| `maximum_interaction_count` | number | no |  | Maximum Interaction Count. The maximum number of interactions Company must have had. |
| `minimum_interaction_date` | ISO date-time string | no |  | Minimum Interaction Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the earliest date of the last interaction. |
| `maximum_interaction_date` | ISO date-time string | no |  | Maximum Interaction Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest date of the last interaction. |
| `minimum_created_date` | ISO date-time string | no |  | Minimum Created Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the earliest date Company are created. |
| `maximum_created_date` | ISO date-time string | no |  | Maximum Created Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest date Company are Created. |

### `searchForAnOpportunity`

**Search for an Opportunity.** Searches opportunities (deals) in Copper CRM, filtering by any combination of name, assignee, status, priority, pipeline and stage, company, primary contact, customer source, loss reason, tags, monetary value, interaction counts/dates, close/stage-change dates, and creation/modification dates, with sorting and paging. Use to find one or more deals; with no filters it lists opportunities across the account. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Full name of the Opportunity to search for. |
| `assignee_ids` | array | no |  | Assignee. select assignees. Values the product loads from the provider, such as ids; write an array of them. |
| `company_ids` | array | no |  | Company. select Companies. Values the product loads from the provider, such as ids; write an array of them. |
| `status_ids` | array | no |  | Status. Filter by Opportunity status. One of `"0"`, `"1"`, `"2"`, `"3"`. |
| `priorities` | array | no |  | Priority. One of `"None"`, `"Low"`, `"Medium"`, `"High"`. |
| `pipeline_ids` | array | no |  | Pipeline. select a Pipeline. Values the product loads from the provider, such as ids; write an array of them. |
| `pipeline_stage_ids` | array | no |  | Pipeline Stage. Select a stage. Values the product loads from the provider, such as ids; write an array of them. |
| `primary_contact_ids` | array | no |  | Primary Contacts. select primary contacts. Values the product loads from the provider, such as ids; write an array of them. |
| `customer_source_ids` | array | no |  | Customer Source. Select customer source. Values the product loads from the provider, such as ids; write an array of them. |
| `loss_reason_ids` | array | no |  | Loss Reason. Select loss reason. Values the product loads from the provider, such as ids; write an array of them. |
| `tags` | array | no | `[]` | Tags. Filter People to those that match at least one of the tags specified. |
| `followed` | string | no |  | Followed. Filter by followed state. One of `"1"`, `"2"`. |
| `page_size` | number | no | `50` | Page Size. Default 50. Max 200. |
| `page_number` | number | no | `1` | Page Number. |
| `sort_by` | string | no |  | Sort By. The field on which to sort the results. One of `"assignee"`, `"company_name"`, `"customer_source_id"`, `"date_created"`, `"date_modified"`, `"inactive_days"`, `"interaction_count"`, `"last_interaction"`, `"monetary_unit"`, `"monetary_value"`, `"name"`, `"primary_contact"`, `"priority"`, `"stage"`, `"status"`. |
| `sort_direction` | string | no |  | Sort Direction. The direction in which to sort the result. One of `"asc"`, `"desc"`. |
| `minimum_monetary_value` | number | no |  | Minimum Monetary Value. The minimum monetary value Opportunities must have. |
| `maximum_monetary_value` | number | no |  | Maximum Monetary Value. The maximum monetary value Opportunities must have. |
| `minimum_interaction_count` | number | no |  | Minimum Interaction Count. The minimum number of interactions Opportunity must have had. |
| `maximum_interaction_count` | number | no |  | Maximum Interaction Count. The maximum number of interactions Opportunity must have had. |
| `minimum_close_date` | ISO date-time string | no |  | Minimum Interaction Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the earliest date close date. |
| `maximum_close_date` | ISO date-time string | no |  | Maximum Interaction Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest date close date. |
| `minimum_interaction_date` | ISO date-time string | no |  | Minimum Interaction Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the earliest date of the last interaction. |
| `maximum_interaction_date` | ISO date-time string | no |  | Maximum Interaction Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest date of the last interaction. |
| `minimum_stage_change_date` | ISO date-time string | no |  | Minimum Stage Change Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the earliest date of a stage change. |
| `maximum_stage_change_date` | ISO date-time string | no |  | Maximum Stage Change Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest date of a stage change. |
| `minimum_created_date` | ISO date-time string | no |  | Minimum Created Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the earliest date Opportunity are created. |
| `maximum_created_date` | ISO date-time string | no |  | Maximum Created Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest date Opportunity are Created. |
| `minimum_modified_date` | ISO date-time string | no |  | Minimum Modified Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the earliest date Opportunity are Modified. |
| `maximum_modified_date` | ISO date-time string | no |  | Maximum Modified Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest date Opportunity are Modified. |

### `searchForAProject`

**Search for a Project.** Searches projects in Copper CRM, filtering by any combination of name, assignee, status (Open/Completed), tags, followed state, and creation/modification dates, with sorting and paging. Use to find one or more projects; with no filters it lists projects across the account. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Full name of the Opportunity to search for. |
| `assignee_ids` | array | no |  | Assignee. select assignees. Values the product loads from the provider, such as ids; write an array of them. |
| `statuses` | array | no |  | Status. Filter by Opportunity status. One of `"Open"`, `"Completed"`. |
| `tags` | array | no | `[]` | Tags. Filter People to those that match at least one of the tags specified. |
| `followed` | string | no |  | Followed. Filter by followed state. One of `"1"`, `"2"`. |
| `page_size` | number | no | `50` | Page Size. Default 50. Max 200. |
| `page_number` | number | no | `1` | Page Number. |
| `sort_by` | string | no |  | Sort By. The field on which to sort the results. One of `"name"`, `"assigned_to"`, `"related_to"`, `"status"`, `"date_modified"`, `"date_created"`. |
| `sort_direction` | string | no |  | Sort Direction. The direction in which to sort the result. One of `"asc"`, `"desc"`. |
| `minimum_created_date` | ISO date-time string | no |  | Minimum Created Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the earliest date Opportunity are created. |
| `maximum_created_date` | ISO date-time string | no |  | Maximum Created Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest date Opportunity are Created. |
| `minimum_modified_date` | ISO date-time string | no |  | Minimum Modified Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the earliest date Opportunity are Modified. |
| `maximum_modified_date` | ISO date-time string | no |  | Maximum Modified Date. 24-hour format, e.g. 2025-09-10 13:00. The timestamp of the latest date Opportunity are Modified. |

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

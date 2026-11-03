# Zoho CRM

Customer relationship management software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-zoho-crm'
  version: '0.4.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Authentication for Zoho CRM

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | string | yes |  | Location. The location of your Zoho CRM account. One of `"zoho.eu"`, `"zoho.com"`, `"zoho.com.au"`, `"zoho.jp"`, `"zoho.in"`, `"zohocloud.ca"`. |

## Actions

### `read-file`

**Read file.** Downloads the binary content of a Zoho CRM file (e.g. a data backup or bulk-read result) from its full https URL and returns it as a stored file. Only URLs on the connection's own Zoho API host under /crm/ or its data centre's download host are accepted, because the token is sent with the request. The file size limit of this Activepieces deployment applies. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes | `""` | URL. Full https URL on your Zoho API host (/crm/...) or download host. |

### `create_record`

**Create Record.** Creates one record in a chosen Zoho CRM module (standard or custom) from a form of that module's fields, custom fields included. Use to add a lead, contact, deal or custom-module record; use Create or Update Record instead when the record may already exist. Not idempotent: each call creates a new record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. The Zoho CRM module (for example Leads, Contacts, Deals or a custom module). A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Fields. Standard and custom fields of the module. Read-only, formula, subform and file fields are not listed. An object whose fields depend on other inputs; the product shows them. |
| `additional_fields` | JSON | no |  | Additional Fields (JSON). Optional raw fields by API name, for fields the form does not list (e.g. subform rows). Values set in the form above win over the same key here. |
| `triggers` | array | no |  | Automation to Run. Empty runs Zoho's default workflows; pick some to run only those. One of `"workflow"`, `"approval"`, `"blueprint"`, `"pathfinder"`, `"orchestration"`. |
| `skip_automation` | boolean | no | `false` | Skip All Automation. Run no workflow, approval or blueprint for this record. |

Output fields:

- `id`: Record ID
- `module`: Module
- `status`: Status
- `code`: Code
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `created_by_id`: Created By ID
- `created_by_name`: Created By
- `modified_by_id`: Modified By ID
- `modified_by_name`: Modified By

### `update_record`

**Update Record.** Updates selected fields of one existing Zoho CRM record by module and id; fields left empty keep their current value, and "Clear Fields" blanks named fields. Multi-select picklists are replaced, not merged. Not idempotent: every call counts as an edit and runs the module's on-edit workflows unless automation is skipped. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. The Zoho CRM module (for example Leads, Contacts, Deals or a custom module). A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. Pick one of the 200 most recently modified records, or map a record id from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | no |  | Fields. Only the fields you fill in are changed. Use "Clear Fields" to blank a field. An object whose fields depend on other inputs; the product shows them. |
| `clear_fields` | array | no |  | Clear Fields. Field API names to set to empty (e.g. "Phone", "Custom_Field__c"). |
| `additional_fields` | JSON | no |  | Additional Fields (JSON). Optional raw fields by API name, for fields the form does not list (e.g. subform rows). Values set in the form above win over the same key here. |
| `skip_automation` | boolean | no | `false` | Skip All Automation. Run no workflow, approval or blueprint for this update. |

Output fields:

- `id`: Record ID
- `module`: Module
- `status`: Status
- `code`: Code
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `created_by_id`: Created By ID
- `created_by_name`: Created By
- `modified_by_id`: Modified By ID
- `modified_by_name`: Modified By

### `get_record`

**Get Record.** Fetches one Zoho CRM record by module and id with all its fields (keys are field API names, custom fields included). Use when you know the record id. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. The Zoho CRM module (for example Leads, Contacts, Deals or a custom module). A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. Pick one of the 200 most recently modified records, or map a record id from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Record ID
- `Created_Time`: Created Time (datetime)
- `Modified_Time`: Modified Time (datetime)

### `upsert_record`

**Create or Update Record.** Inserts or updates one Zoho CRM record, matching an existing record on duplicate-check fields (Zoho default: Email for Leads/Contacts, Account_Name for Accounts, Deal_Name for Deals). Use for find-or-create without search. Not idempotent: when the data has no value for a duplicate-check field, every call inserts a new record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. The Zoho CRM module (for example Leads, Contacts, Deals or a custom module). A value the product loads from the provider, such as an id; write the value itself. |
| `duplicate_check_fields` | array | no |  | Duplicate Check Fields. Fields used to find an existing record. Leave empty to use Zoho's default (Email for Leads/Contacts, Account_Name for Accounts, Deal_Name for Deals, Name for custom modules). Values the product loads from the provider, such as ids; write an array of them. |
| `fields` | object | no |  | Fields. Standard and custom fields of the module. Read-only, formula, subform and file fields are not listed. An object whose fields depend on other inputs; the product shows them. |
| `additional_fields` | JSON | no |  | Additional Fields (JSON). Optional raw fields by API name, for fields the form does not list (e.g. subform rows). Values set in the form above win over the same key here. |
| `skip_automation` | boolean | no | `false` | Skip All Automation. |

Output fields:

- `id`: Record ID
- `module`: Module
- `status`: Status
- `code`: Code
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `created_by_id`: Created By ID
- `created_by_name`: Created By
- `modified_by_id`: Modified By ID
- `modified_by_name`: Modified By
- `action`: Action (insert or update)
- `duplicate_field`: Matched On Field

### `delete_record`

**Delete Record.** Deletes one Zoho CRM record by module and id; it moves to the Recycle Bin and can be restored from the Zoho UI. Use only when the record must go; to change it use Update Record. Not idempotent: deleting the same id again returns an error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. The Zoho CRM module (for example Leads, Contacts, Deals or a custom module). A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. Pick one of the 200 most recently modified records, or map a record id from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |
| `run_workflows` | boolean | no | `true` | Run Workflows. Run delete workflows configured in Zoho (Zoho default: on). |

Output fields:

- `id`: Record ID
- `module`: Module
- `deleted`: Deleted (boolean)
- `status`: Status
- `message`: Message

### `convert_lead`

**Convert Lead.** Converts one Zoho CRM lead into a contact plus an account (or links it to existing ones) and can create a deal in the same call. Use when a qualified lead should become a customer record. Not idempotent: a lead can be converted only once and a second call fails with ID_ALREADY_CONVERTED. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | yes |  | Lead. Pick one of the 200 most recently modified records, or map a record id from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |
| `account_id` | string | no |  | Existing Account. Link to this account; the lead's Company must match its name. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | no |  | Existing Contact. Merge into this contact; the lead's name and email must match. A value the product loads from the provider, such as an id; write the value itself. |
| `overwrite` | boolean | no | `false` | Overwrite Contact's Account. Move the existing contact to the given account. |
| `assign_to` | string | no |  | Owner. Active user who owns the new records; empty keeps the lead owner. A value the product loads from the provider, such as an id; write the value itself. |
| `notify_lead_owner` | boolean | no | `false` | Notify Lead Owner. |
| `notify_new_entity_owner` | boolean | no | `false` | Notify New Owner. |
| `create_deal` | boolean | no | `false` | Create a Deal. |
| `deal_name` | string | no |  | Deal Name. |
| `deal_stage` | string | no |  | Deal Stage. A Stage picklist value of your org, e.g. "Qualification". |
| `deal_closing_date` | string | no |  | Deal Closing Date. Date as yyyy-MM-dd, e.g. 2026-12-31. |
| `deal_amount` | number | no |  | Deal Amount. |
| `deal_pipeline` | string | no |  | Deal Pipeline. Required when your org uses pipelines, e.g. "Standard (Standard)". |
| `deal_extra` | JSON | no |  | Other Deal Fields (JSON). |

Output fields:

- `lead_id`: Lead ID
- `status`: Status
- `message`: Message
- `contact_id`: Contact ID
- `contact_name`: Contact Name
- `account_id`: Account ID
- `account_name`: Account Name
- `deal_id`: Deal ID
- `deal_name`: Deal Name

### `add_note`

**Add Note.** Adds a note (optional title plus content) to one Zoho CRM record in any module. Use to log a call summary or context on a lead, contact, deal or account. Not idempotent: each call adds another note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. The Zoho CRM module (for example Leads, Contacts, Deals or a custom module). A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. Pick one of the 200 most recently modified records, or map a record id from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. |
| `content` | string | yes |  | Content. |

Output fields:

- `id`: ID
- `parent_module`: Parent Module
- `parent_id`: Parent Record ID
- `status`: Status
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `created_by_name`: Created By

### `add_tags_to_record`

**Add Tags to Record.** Adds tags to one Zoho CRM record, creating any tag name that does not exist yet in the module. Existing tags on the record are kept. Idempotent: adding a tag the record already has changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. The Zoho CRM module (for example Leads, Contacts, Deals or a custom module). A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. Pick one of the 200 most recently modified records, or map a record id from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Existing Tags. Tags already defined for the module. Values the product loads from the provider, such as ids; write an array of them. |
| `new_tags` | array | no |  | New Tag Names. Tag names to create (if missing) and add. |

Output fields:

- `module`: Module
- `success_count`: Records Updated (number)
- `failed_count`: Records Failed (number)
- `results`: Results
- `results[].id`: Record ID
- `results[].status`: Status
- `results[].message`: Message
- `results[].tags`: Tags Now On Record

### `upload_attachment`

**Upload Attachment.** Uploads a file from the flow as an attachment on one Zoho CRM record in any module. Use when you hold file bytes from an earlier step. Not idempotent: each call adds another attachment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. The Zoho CRM module (for example Leads, Contacts, Deals or a custom module). A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. Pick one of the 200 most recently modified records, or map a record id from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |
| `file_name` | string | no |  | File Name. Optional. Overrides the file name. |

Output fields:

- `id`: ID
- `parent_module`: Parent Module
- `parent_id`: Parent Record ID
- `status`: Status
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `created_by_name`: Created By

### `zoho_crm_list_modules`

**List Modules.** Lists the Zoho CRM modules the API can use, with each module's API name, labels and whether records can be created, edited or deleted. Call this first to get the module_api_name every record, note, tag and attachment action needs; the API name can differ from the label (e.g. "Deals" labelled "Opportunities", custom modules named "CustomModule1"). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `count`: Count (number)
- `modules`: Modules
- `modules[].api_name`: API Name
- `modules[].module_name`: Module Name
- `modules[].plural_label`: Plural Label
- `modules[].singular_label`: Singular Label
- `modules[].generated_type`: Type
- `modules[].creatable`: Creatable (boolean)
- `modules[].editable`: Editable (boolean)
- `modules[].deletable`: Deletable (boolean)

### `zoho_crm_get_module_fields`

**Get Module Fields.** Lists every field of one Zoho CRM module with its API name, label, data type, whether it is required on create, read-only status, picklist values and lookup target. Call before creating or updating records to learn field API names, allowed picklist values (e.g. Deal Stage) and custom fields. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name from List Modules, e.g. "Leads", "Contacts", "Deals", "Accounts" or "CustomModule1". Not the display label. |
| `include_read_only` | boolean | no | `true` | Include Read-Only Fields. Also list fields that cannot be written (formula, system, auto-number). |

Output fields:

- `module`: Module
- `count`: Count (number)
- `fields`: Fields
- `fields[].api_name`: API Name
- `fields[].field_label`: Label
- `fields[].data_type`: Data Type
- `fields[].required`: Required on Create (boolean)
- `fields[].read_only`: Read Only (boolean)
- `fields[].custom_field`: Custom Field (boolean)
- `fields[].lookup_module`: Lookup Module
- `fields[].max_length`: Max Length (number)
- `fields[].picklist_values`: Picklist Values

### `zoho_crm_get_related_lists`

**Get Related Lists.** Lists the related lists of one Zoho CRM module (e.g. Contacts, Deals or Campaigns under Accounts) with the related_list API name and the related module. Call before List Related Records or Link Related Record to get the related_list_api_name. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name from List Modules, e.g. "Leads", "Contacts", "Deals", "Accounts" or "CustomModule1". Not the display label. |

Output fields:

- `module`: Module
- `count`: Count (number)
- `related_lists`: Related Lists
- `related_lists[].api_name`: API Name
- `related_lists[].display_label`: Label
- `related_lists[].module_api_name`: Related Module
- `related_lists[].type`: Type
- `related_lists[].href`: Path
- `related_lists[].status`: Status

### `zoho_crm_list_users`

**List Users.** Lists users of the Zoho CRM org, filtered by type (active users by default), one page of up to 200 (page numbers reach the first 2,000 users). Use to find a user id for a record Owner or a lead conversion assignee; use Get Current User for the connected user. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no | `"ActiveUsers"` | User Type. One of `"AllUsers"`, `"ActiveUsers"`, `"DeactiveUsers"`, `"ConfirmedUsers"`, `"NotConfirmedUsers"`, `"DeletedUsers"`, `"ActiveConfirmedUsers"`, `"AdminUsers"`, `"ActiveConfirmedAdmins"`. |
| `page` | number | no |  | Page. Page number, starting at 1. |
| `per_page` | number | no |  | Per Page. 1 to 200 (default 200). |

Output fields:

- `count`: Count (number)
- `more_records`: More Records (boolean)
- `users`: Users
- `users[].id`: User ID
- `users[].full_name`: Full Name
- `users[].first_name`: First Name
- `users[].last_name`: Last Name
- `users[].email`: Email (email)
- `users[].status`: Status
- `users[].role_id`: Role ID
- `users[].role_name`: Role
- `users[].profile_id`: Profile ID
- `users[].profile_name`: Profile
- `users[].time_zone`: Time Zone
- `users[].confirm`: Confirmed (boolean)

### `zoho_crm_get_user`

**Get User.** Fetches one Zoho CRM user by id with name, email, role, profile and status. Use to resolve an Owner id seen on a record; to find users by listing use List Users. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Numeric user id, e.g. "5725767000000411001". |

Output fields:

- `id`: User ID
- `full_name`: Full Name
- `first_name`: First Name
- `last_name`: Last Name
- `email`: Email (email)
- `status`: Status
- `role_id`: Role ID
- `role_name`: Role
- `profile_id`: Profile ID
- `profile_name`: Profile
- `time_zone`: Time Zone
- `confirm`: Confirmed (boolean)

### `zoho_crm_get_current_user`

**Get Current User.** Returns the Zoho CRM user this connection acts as (id, name, email, role, profile). Use to get the default Owner id or the "from" address for an email draft. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID
- `full_name`: Full Name
- `first_name`: First Name
- `last_name`: Last Name
- `email`: Email (email)
- `status`: Status
- `role_id`: Role ID
- `role_name`: Role
- `profile_id`: Profile ID
- `profile_name`: Profile
- `time_zone`: Time Zone
- `confirm`: Confirmed (boolean)

### `zoho_crm_list_records`

**List Records.** Lists records of one Zoho CRM module one page at a time (up to 200), sorted by id, Created_Time or Modified_Time, optionally within a custom view. Use to browse or page through a module; it does not filter by field value, so use Get Record when you know the id. Returns at most 50 fields per record (default: id, then custom fields, then standard fields, up to 50). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name from List Modules, e.g. "Leads", "Contacts", "Deals" or "CustomModule1". |
| `fields` | array | no |  | Fields. Field API names to return (max 50). Leave empty for id, then the custom fields of the module, then its standard fields (50 in total). |
| `per_page` | number | no |  | Per Page. 1 to 200. Default 50. |
| `page` | number | no |  | Page. Page number for the first 2,000 records. Do not combine with page_token. |
| `page_token` | string | no |  | Page Token. next_page_token from a previous call, needed beyond 2,000 records. |
| `sort_by` | string | no |  | Sort By. One of `"id"`, `"Created_Time"`, `"Modified_Time"`. |
| `sort_order` | string | no |  | Sort Order. One of `"desc"`, `"asc"`. |
| `custom_view_id` | string | no |  | Custom View ID. Optional id of a custom view (cvid) to list only its records. |

Output fields:

- `module`: Module
- `count`: Count (number)
- `more_records`: More Records (boolean)
- `page`: Page (number)
- `next_page_token`: Next Page Token
- `fields_requested`: Fields Requested
- `records`: Records

### `zoho_crm_get_record`

**Get Record.** Fetches one Zoho CRM record by module API name and record id, with all fields (keys are field API names, custom fields included) unless a field list is given. Use when you hold a record id; use List Records to browse. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name from List Modules, e.g. "Leads", "Contacts", "Deals" or "CustomModule1". |
| `record_id` | string | yes |  | Record ID. Numeric Zoho record id, e.g. "5725767000000524157" (from List Records or a create result). |
| `fields` | array | no |  | Fields. Optional field API names to return; empty returns all fields. |

Output fields:

- `id`: Record ID
- `Created_Time`: Created Time (datetime)
- `Modified_Time`: Modified Time (datetime)

### `zoho_crm_create_record`

**Create Record.** Creates one record in any Zoho CRM module (standard or custom) from a JSON object of field API names; prefer Create Lead, Create Contact, Create Deal or Create Event for those modules, and Upsert Record when the record may already exist. Resolve field API names and required fields with Get Module Fields first. Not idempotent: each call creates a new record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name from List Modules, e.g. "Leads", "Contacts", "Deals" or "CustomModule1". |
| `data` | JSON | yes |  | Data. JSON object of field API names to values, e.g. {"Last_Name": "Doe", "Email": "jane@example.com", "Owner": {"id": "5725767000000411001"}}. Get API names and picklist values from Get Module Fields. Dates as "2026-10-01", date-times as "2026-10-01T09:00:00+02:00", lookups as {"id": "..."}. |
| `skip_automation` | boolean | no | `false` | Skip Automation. When true, no workflow, approval or blueprint runs for this change. Default false (Zoho runs its automation). |

Output fields:

- `id`: Record ID
- `module`: Module
- `status`: Status
- `code`: Code
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `created_by_id`: Created By ID
- `created_by_name`: Created By
- `modified_by_id`: Modified By ID
- `modified_by_name`: Modified By

### `zoho_crm_update_record`

**Update Record.** Updates only the fields present in data on one Zoho CRM record; fields you omit keep their values and a field set to null is cleared. Multi-select picklists are replaced unless listed in append_multiselect_fields. Not idempotent: every call counts as an edit and runs the module's on-edit workflows unless automation is skipped. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name from List Modules, e.g. "Leads", "Contacts", "Deals" or "CustomModule1". |
| `record_id` | string | yes |  | Record ID. Numeric Zoho record id, e.g. "5725767000000524157" (from List Records or a create result). |
| `data` | JSON | yes |  | Data. JSON object of field API names to values, e.g. {"Last_Name": "Doe", "Email": "jane@example.com", "Owner": {"id": "5725767000000411001"}}. Get API names and picklist values from Get Module Fields. Dates as "2026-10-01", date-times as "2026-10-01T09:00:00+02:00", lookups as {"id": "..."}. |
| `append_multiselect_fields` | array | no |  | Append Multi-Select Fields. Multi-select picklist API names whose new values should be added to the current ones instead of replacing them. |
| `skip_automation` | boolean | no | `false` | Skip Automation. When true, no workflow, approval or blueprint runs for this change. Default false (Zoho runs its automation). |

Output fields:

- `id`: Record ID
- `module`: Module
- `status`: Status
- `code`: Code
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `created_by_id`: Created By ID
- `created_by_name`: Created By
- `modified_by_id`: Modified By ID
- `modified_by_name`: Modified By

### `zoho_crm_delete_record`

**Delete Record.** Deletes one Zoho CRM record by module and id; it moves to the Recycle Bin, restorable only from the Zoho UI. Only use when the user asked to delete; to change data use Update Record. Not idempotent: a second call on the same id fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name from List Modules, e.g. "Leads", "Contacts", "Deals" or "CustomModule1". |
| `record_id` | string | yes |  | Record ID. Numeric Zoho record id, e.g. "5725767000000524157" (from List Records or a create result). |
| `run_workflows` | boolean | no | `true` | Run Workflows. Default true. |

Output fields:

- `id`: Record ID
- `module`: Module
- `deleted`: Deleted (boolean)
- `status`: Status
- `message`: Message

### `zoho_crm_upsert_record`

**Upsert Record.** Inserts or updates one Zoho CRM record, matching on duplicate_check_fields (Zoho default: Email for Leads/Contacts, Account_Name for Accounts, Deal_Name for Deals, Name for custom modules); the result says action insert or update. Use as find-or-create. Not idempotent: when the data has no value for a duplicate-check field, every call inserts a new record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name from List Modules, e.g. "Leads", "Contacts", "Deals" or "CustomModule1". |
| `data` | JSON | yes |  | Data. JSON object of field API names to values, e.g. {"Last_Name": "Doe", "Email": "jane@example.com", "Owner": {"id": "5725767000000411001"}}. Get API names and picklist values from Get Module Fields. Dates as "2026-10-01", date-times as "2026-10-01T09:00:00+02:00", lookups as {"id": "..."}. |
| `duplicate_check_fields` | array | no |  | Duplicate Check Fields. Field API names to match on, e.g. ["Email"]. Empty uses the module default. |
| `skip_automation` | boolean | no | `false` | Skip Automation. When true, no workflow, approval or blueprint runs for this change. Default false (Zoho runs its automation). |

Output fields:

- `id`: Record ID
- `module`: Module
- `status`: Status
- `code`: Code
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `created_by_id`: Created By ID
- `created_by_name`: Created By
- `modified_by_id`: Modified By ID
- `modified_by_name`: Modified By
- `action`: Action (insert or update)
- `duplicate_field`: Matched On Field

### `zoho_crm_create_lead`

**Create Lead.** Creates one Zoho CRM lead with typed fields (Last Name required; company, email, phone, source, status) plus optional custom fields. Use for new prospects; use Upsert Record on Leads with Email to avoid duplicates, or Create Contact for an existing customer. Not idempotent: each call creates another lead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `last_name` | string | yes |  | Last Name. |
| `first_name` | string | no |  | First Name. |
| `company` | string | no |  | Company. Required in many orgs' layouts. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `mobile` | string | no |  | Mobile. |
| `title` | string | no |  | Title. Job title (Designation). |
| `website` | string | no |  | Website. |
| `lead_source` | string | no |  | Lead Source. A Lead_Source picklist value of your org, e.g. "Web Download". |
| `lead_status` | string | no |  | Lead Status. A Lead_Status picklist value of your org, e.g. "Not Contacted". |
| `description` | string | no |  | Description. |
| `owner_id` | string | no |  | Owner User ID. Optional user id (from List Users or Get Current User). Default: the connected user. |
| `additional_fields` | JSON | no |  | Additional Fields. Optional JSON of other field API names, including custom fields, e.g. {"Custom_Field__c": "x"}. The named props above win over the same key here. |

Output fields:

- `id`: Record ID
- `module`: Module
- `status`: Status
- `code`: Code
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `created_by_id`: Created By ID
- `created_by_name`: Created By
- `modified_by_id`: Modified By ID
- `modified_by_name`: Modified By

### `zoho_crm_create_contact`

**Create Contact.** Creates one Zoho CRM contact with typed fields (Last Name required; email, phone, account, mailing address) plus optional custom fields. Use for a person tied to a customer account; use Upsert Record on Contacts with Email to avoid duplicates. Not idempotent: each call creates another contact. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `last_name` | string | yes |  | Last Name. |
| `first_name` | string | no |  | First Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `mobile` | string | no |  | Mobile. |
| `title` | string | no |  | Title. |
| `account_id` | string | no |  | Account ID. Id of an existing Accounts record. |
| `mailing_street` | string | no |  | Mailing Street. |
| `mailing_city` | string | no |  | Mailing City. |
| `mailing_state` | string | no |  | Mailing State. |
| `mailing_zip` | string | no |  | Mailing Zip. |
| `mailing_country` | string | no |  | Mailing Country. |
| `description` | string | no |  | Description. |
| `owner_id` | string | no |  | Owner User ID. Optional user id (from List Users or Get Current User). Default: the connected user. |
| `additional_fields` | JSON | no |  | Additional Fields. Optional JSON of other field API names, including custom fields, e.g. {"Custom_Field__c": "x"}. The named props above win over the same key here. |

Output fields:

- `id`: Record ID
- `module`: Module
- `status`: Status
- `code`: Code
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `created_by_id`: Created By ID
- `created_by_name`: Created By
- `modified_by_id`: Modified By ID
- `modified_by_name`: Modified By

### `zoho_crm_create_deal`

**Create Deal.** Creates one Zoho CRM deal (Deal Name and Stage required; amount, closing date, pipeline, account and contact optional). Stage and Pipeline values are org-specific, so read them from Get Module Fields on Deals first. Not idempotent: each call creates another deal. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `deal_name` | string | yes |  | Deal Name. |
| `stage` | string | yes |  | Stage. A Stage picklist value of your org, e.g. "Qualification". |
| `closing_date` | string | no |  | Closing Date. yyyy-MM-dd, e.g. "2026-12-31". Required in many layouts. |
| `amount` | number | no |  | Amount. |
| `pipeline` | string | no |  | Pipeline. Pipeline name when the org uses pipelines, e.g. "Standard (Standard)". |
| `account_id` | string | no |  | Account ID. |
| `contact_id` | string | no |  | Contact ID. |
| `description` | string | no |  | Description. |
| `owner_id` | string | no |  | Owner User ID. Optional user id (from List Users or Get Current User). Default: the connected user. |
| `additional_fields` | JSON | no |  | Additional Fields. Optional JSON of other field API names, including custom fields, e.g. {"Custom_Field__c": "x"}. The named props above win over the same key here. |

Output fields:

- `id`: Record ID
- `module`: Module
- `status`: Status
- `code`: Code
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `created_by_id`: Created By ID
- `created_by_name`: Created By
- `modified_by_id`: Modified By ID
- `modified_by_name`: Modified By

### `zoho_crm_create_event`

**Create Event.** Creates one Zoho CRM event (meeting) with a title, start and end date-time, optional venue and an optional link to a record (What_Id plus its module, e.g. a Deal or Account). Use to log or schedule a meeting against a CRM record. Not idempotent: each call creates another event. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event_title` | string | yes |  | Title. |
| `start_datetime` | string | yes |  | Start. ISO 8601 with offset, e.g. "2026-10-01T09:00:00+02:00". |
| `end_datetime` | string | yes |  | End. ISO 8601 with offset, after Start. |
| `all_day` | boolean | no | `false` | All Day. |
| `venue` | string | no |  | Venue. |
| `description` | string | no |  | Description. |
| `related_module` | string | no |  | Related Module. Module API name of the record to link (What_Id), e.g. "Deals" or "Accounts". Give with related_record_id. |
| `related_record_id` | string | no |  | Related Record ID. |
| `owner_id` | string | no |  | Owner User ID. Optional user id (from List Users or Get Current User). Default: the connected user. |
| `additional_fields` | JSON | no |  | Additional Fields. Optional JSON of other field API names, including custom fields, e.g. {"Custom_Field__c": "x"}. The named props above win over the same key here. |

Output fields:

- `id`: Record ID
- `module`: Module
- `status`: Status
- `code`: Code
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `created_by_id`: Created By ID
- `created_by_name`: Created By
- `modified_by_id`: Modified By ID
- `modified_by_name`: Modified By

### `zoho_crm_convert_lead`

**Convert Lead.** Converts one Zoho CRM lead into a contact and account (new, or existing ones by id) and optionally creates a deal when deal_name is given (deal_stage and deal_closing_date then required). Use once a lead is qualified. Not idempotent: a converted lead cannot be converted again (ID_ALREADY_CONVERTED). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | yes |  | Lead ID. |
| `account_id` | string | no |  | Existing Account ID. |
| `contact_id` | string | no |  | Existing Contact ID. |
| `assign_to` | string | no |  | Owner User ID. |
| `overwrite` | boolean | no | `false` | Overwrite Contact Account. |
| `notify_lead_owner` | boolean | no | `false` | Notify Lead Owner. |
| `notify_new_entity_owner` | boolean | no | `false` | Notify New Owner. |
| `deal_name` | string | no |  | Deal Name. Set to also create a deal. |
| `deal_stage` | string | no |  | Deal Stage. |
| `deal_closing_date` | string | no |  | Deal Closing Date. yyyy-MM-dd. |
| `deal_amount` | number | no |  | Deal Amount. |
| `deal_pipeline` | string | no |  | Deal Pipeline. |

Output fields:

- `lead_id`: Lead ID
- `status`: Status
- `message`: Message
- `contact_id`: Contact ID
- `contact_name`: Contact Name
- `account_id`: Account ID
- `account_name`: Account Name
- `deal_id`: Deal ID
- `deal_name`: Deal Name

### `zoho_crm_list_notes`

**List Notes.** Lists notes attached to one Zoho CRM record (give parent_module and parent_id), or all notes in the org when both are empty (admin users only), one page of up to 200; page numbers reach the first 2,000 notes. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent_module` | string | no |  | Parent Module. Module API name of the record, e.g. "Leads". Give with parent_id. |
| `parent_id` | string | no |  | Parent Record ID. |
| `page` | number | no |  | Page. |
| `per_page` | number | no |  | Per Page. 1 to 200 (default 50). |

Output fields:

- `count`: Count (number)
- `more_records`: More Records (boolean)
- `notes`: Notes
- `notes[].id`: Note ID
- `notes[].title`: Title
- `notes[].content`: Content
- `notes[].parent_module`: Parent Module
- `notes[].parent_id`: Parent Record ID
- `notes[].parent_name`: Parent Record
- `notes[].owner_id`: Owner ID
- `notes[].owner_name`: Owner
- `notes[].created_time`: Created Time (datetime)
- `notes[].modified_time`: Modified Time (datetime)

### `zoho_crm_get_note`

**Get Note.** Fetches one Zoho CRM note by id with its title, content, parent record and owner. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `note_id` | string | yes |  | Note ID. Numeric note id from List Notes. |

Output fields:

- `id`: Note ID
- `title`: Title
- `content`: Content
- `parent_module`: Parent Module
- `parent_id`: Parent Record ID
- `parent_name`: Parent Record
- `owner_id`: Owner ID
- `owner_name`: Owner
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)

### `zoho_crm_create_note`

**Create Note.** Adds a note (content required, title optional) to one Zoho CRM record identified by module API name and record id. Use to log context such as a call summary. Not idempotent: each call adds another note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent_module` | string | yes |  | Module API Name. Module API name from List Modules, e.g. "Leads" or "Deals". |
| `parent_id` | string | yes |  | Parent Record ID. |
| `title` | string | no |  | Title. |
| `content` | string | yes |  | Content. |

Output fields:

- `id`: ID
- `parent_module`: Parent Module
- `parent_id`: Parent Record ID
- `status`: Status
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `created_by_name`: Created By

### `zoho_crm_update_note`

**Update Note.** Changes the title and/or content of one Zoho CRM note; a field you leave out keeps its value (only title and content can change). Idempotent: re-sending the same text converges on the same note. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `note_id` | string | yes |  | Note ID. Numeric note id from List Notes. |
| `title` | string | no |  | Title. |
| `content` | string | no |  | Content. |

Output fields:

- `id`: ID
- `status`: Status
- `code`: Code
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `modified_by_name`: Modified By

### `zoho_crm_delete_note`

**Delete Note.** Deletes one Zoho CRM note by id. Only use when asked to remove the note. Not idempotent: deleting it again returns an error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `note_id` | string | yes |  | Note ID. Numeric note id from List Notes. |

Output fields:

- `id`: ID
- `status`: Status
- `code`: Code
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `modified_by_name`: Modified By

### `zoho_crm_list_tags`

**List Tags.** Lists the tags defined for one Zoho CRM module (name, id, color). Use to check tag names before Add Tags or Remove Tags. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name from List Modules, e.g. "Leads" or "Deals". |

Output fields:

- `module`: Module
- `count`: Count (number)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].color_code`: Color
- `tags[].created_time`: Created Time (datetime)
- `tags[].modified_time`: Modified Time (datetime)

### `zoho_crm_create_tag`

**Create Tag.** Gets or creates a tag by name (case-insensitive) in one Zoho CRM module, returning created false when it already existed. Use before Add Tags when the tag may be new; a module holds at most 100 tags. Idempotent: repeating returns the same tag. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name from List Modules, e.g. "Leads" or "Deals". |
| `name` | string | yes |  | Tag Name. |
| `color_code` | string | no |  | Color. One of `"#F17574"`, `"#F48435"`, `"#E7A826"`, `"#A8C026"`, `"#63C57E"`, `"#1DB9B4"`, `"#57B1FD"`, `"#879BFC"`, `"#D297EE"`, `"#FD87BD"`, `"#969696"`, `"#658BA8"`, `"#B88562"`. |

Output fields:

- `id`: Tag ID
- `name`: Name
- `color_code`: Color
- `module`: Module
- `created`: Created (false = already existed) (boolean)

### `zoho_crm_add_tags`

**Add Tags.** Adds tags by name to up to 500 records of one Zoho CRM module, keeping tags the records already have (max 10 per record). A tag name the module does not have yet is created by Zoho on the fly; use Create Tag first only to pick its color. Idempotent: re-adding an existing tag changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name from List Modules, e.g. "Leads" or "Deals". |
| `record_ids` | array | yes |  | Record IDs. Numeric record ids (max 500). |
| `tags` | array | yes |  | Tag Names. Tag names, e.g. ["VIP", "Webinar 2026"]. |

Output fields:

- `module`: Module
- `success_count`: Records Updated (number)
- `failed_count`: Records Failed (number)
- `results`: Results
- `results[].id`: Record ID
- `results[].status`: Status
- `results[].message`: Message
- `results[].tags`: Tags Now On Record

### `zoho_crm_remove_tags`

**Remove Tags.** Removes tags by name from up to 500 records of one Zoho CRM module; the tags themselves stay defined in the module. Idempotent: removing a tag that is not on a record changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name from List Modules, e.g. "Leads" or "Deals". |
| `record_ids` | array | yes |  | Record IDs. Numeric record ids (max 500). |
| `tags` | array | yes |  | Tag Names. Tag names, e.g. ["VIP", "Webinar 2026"]. |

Output fields:

- `module`: Module
- `success_count`: Records Updated (number)
- `failed_count`: Records Failed (number)
- `results`: Results
- `results[].id`: Record ID
- `results[].status`: Status
- `results[].message`: Message
- `results[].tags`: Tags Now On Record

### `zoho_crm_list_related_records`

**List Related Records.** Lists the records in one related list of a Zoho CRM record, e.g. the Contacts or Deals of an Account, one page of up to 200 (at most 50 fields per record; default id, then custom fields, then standard fields of the related module). Get related_list_api_name from Get Related Lists. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name of the parent record, e.g. "Accounts" or "Leads". |
| `record_id` | string | yes |  | Record ID. Numeric id of the parent record. |
| `related_list_api_name` | string | yes |  | Related List API Name. api_name from Get Related Lists, e.g. "Contacts", "Deals", "Campaigns", "Products". |
| `fields` | array | no |  | Fields. Field API names to return (max 50). |
| `page` | number | no |  | Page. |
| `per_page` | number | no |  | Per Page. 1 to 200 (default 50). |
| `page_token` | string | no |  | Page Token. next_page_token from a previous call (beyond 2,000 records). |

Output fields:

- `module`: Module
- `record_id`: Record ID
- `related_list`: Related List
- `count`: Count (number)
- `more_records`: More Records (boolean)
- `next_page_token`: Next Page Token
- `records`: Related Records

### `zoho_crm_link_related_record`

**Link Related Record.** Associates an existing record with a Zoho CRM record through a related list, or updates the relation's own fields (e.g. add a Contact to a Campaign with a Member_Status, or a Product to a Deal). Supported relations include Campaigns with Leads/Contacts and Products with Leads/Accounts/Contacts/Deals/Price Books. Idempotent: linking the same pair again leaves one link. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name of the parent record, e.g. "Accounts" or "Leads". |
| `record_id` | string | yes |  | Record ID. Numeric id of the parent record. |
| `related_list_api_name` | string | yes |  | Related List API Name. api_name from Get Related Lists, e.g. "Contacts", "Deals", "Campaigns", "Products". |
| `related_record_id` | string | yes |  | Related Record ID. Id of the record to link. |
| `relation_fields` | JSON | no |  | Relation Fields. Optional fields of the relation, e.g. {"Member_Status": "Invited"}. |

Output fields:

- `module`: Module
- `record_id`: Record ID
- `related_list`: Related List
- `related_record_id`: Related Record ID
- `status`: Status
- `code`: Code
- `message`: Message

### `zoho_crm_list_attachments`

**List Attachments.** Lists the attachments of one Zoho CRM record (file name, size, type, link URL, owner, attachment id), one page of up to 200 (page numbers reach the first 2,000). Use to find the attachment_id for Download Attachment; a "Link URL" attachment cannot be downloaded and carries its link_url instead. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name of the parent record, e.g. "Accounts" or "Leads". |
| `record_id` | string | yes |  | Record ID. Numeric id of the parent record. |
| `page` | number | no |  | Page. |
| `per_page` | number | no |  | Per Page. 1 to 200 (default 50). |

Output fields:

- `count`: Count (number)
- `more_records`: More Records (boolean)
- `attachments`: Attachments
- `attachments[].id`: Attachment ID
- `attachments[].file_name`: File Name
- `attachments[].size`: Size (filesize)
- `attachments[].type`: Type
- `attachments[].link_url`: Link URL (url)
- `attachments[].file_id`: File ID
- `attachments[].parent_module`: Parent Module
- `attachments[].owner_name`: Owner
- `attachments[].created_by_name`: Created By
- `attachments[].created_time`: Created Time (datetime)
- `attachments[].modified_time`: Modified Time (datetime)

### `zoho_crm_upload_attachment`

**Attach Link.** Adds a link attachment (a public http(s) URL plus an optional title) to one Zoho CRM record. Use to attach a document that lives online; Zoho stores the link, not a copy of the file. Not idempotent: each call adds another attachment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name of the parent record, e.g. "Accounts" or "Leads". |
| `record_id` | string | yes |  | Record ID. Numeric id of the parent record. |
| `attachment_url` | string | yes |  | Attachment URL. Full URL, e.g. "https://example.com/proposal.pdf". |
| `title` | string | no |  | Title. |

Output fields:

- `id`: ID
- `parent_module`: Parent Module
- `parent_id`: Parent Record ID
- `status`: Status
- `message`: Message
- `created_time`: Created Time (datetime)
- `modified_time`: Modified Time (datetime)
- `created_by_name`: Created By

### `zoho_crm_download_attachment`

**Download Attachment.** Downloads one file attachment of a Zoho CRM record by attachment id (from List Attachments) and returns it as a stored file. Link attachments cannot be downloaded. The file size limit of this Activepieces deployment applies. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module API name of the parent record, e.g. "Accounts" or "Leads". |
| `record_id` | string | yes |  | Record ID. Numeric id of the parent record. |
| `attachment_id` | string | yes |  | Attachment ID. |

Output fields:

- `file`: File
- `file_name`: File Name
- `size`: Size (filesize)
- `content_type`: Content Type

### `zoho_crm_create_email_draft`

**Create Email Draft.** Saves an email draft (from, to, cc, bcc, subject, body) in the Emails related list of one Zoho CRM record, without sending it; a person can review and send it from the CRM. The from address must be one the connected user may send from (their own email, see Get Current User). Not idempotent: each call saves another draft. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module of the record, e.g. "Leads", "Contacts", "Deals" or "Accounts". |
| `record_id` | string | yes |  | Record ID. Numeric id of the record the draft belongs to. |
| `from` | string | yes |  | From. Sender email, e.g. the connected user's email. |
| `to` | array | no |  | To. Recipient emails. |
| `cc` | array | no |  | Cc. |
| `bcc` | array | no |  | Bcc. |
| `subject` | string | no |  | Subject. |
| `content` | string | no |  | Body. |
| `rich_text` | string | no |  | Content Format. HTML (rich text) or plain text. Default HTML. One of `"true"`, `"false"`. |
| `reply_to` | string | no |  | Reply To. |

Output fields:

- `id`: Draft ID
- `module`: Module
- `record_id`: Record ID
- `status`: Status
- `message`: Message

### `zoho_crm_list_email_drafts`

**List Email Drafts.** Lists email drafts saved on one Zoho CRM record (at most 10 per page), or returns one draft when draft_id is given. Use to find a draft id before Update Email Draft. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module of the record, e.g. "Leads", "Contacts", "Deals" or "Accounts". |
| `record_id` | string | yes |  | Record ID. Numeric id of the record the draft belongs to. |
| `draft_id` | string | no |  | Draft ID. Optional: return only this draft. |
| `page` | number | no |  | Page. |
| `per_page` | number | no |  | Per Page. 1 to 10 (Zoho maximum 10). |

Output fields:

- `count`: Count (number)
- `more_records`: More Records (boolean)
- `drafts`: Drafts
- `drafts[].id`: Draft ID
- `drafts[].subject`: Subject
- `drafts[].from`: From (email)
- `drafts[].to`: To
- `drafts[].cc`: Cc
- `drafts[].bcc`: Bcc
- `drafts[].reply_to`: Reply To (email)
- `drafts[].summary`: Summary
- `drafts[].content`: Content (html)
- `drafts[].rich_text`: Rich Text (boolean)
- `drafts[].scheduled_time`: Scheduled Time (datetime)
- `drafts[].attachment_count`: Attachments (number)
- `drafts[].created_time`: Created Time (datetime)
- `drafts[].modified_time`: Modified Time (datetime)

### `zoho_crm_update_email_draft`

**Update Email Draft.** Changes an existing email draft on a Zoho CRM record without sending it; it reads the draft first and keeps every field you do not pass (recipients, subject, body, attachments, schedule). A recipient list you pass replaces that list; Zoho cannot empty a list, so an empty list is refused. Idempotent: the same changes give the same draft. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_api_name` | string | yes |  | Module API Name. Module of the record, e.g. "Leads", "Contacts", "Deals" or "Accounts". |
| `record_id` | string | yes |  | Record ID. Numeric id of the record the draft belongs to. |
| `draft_id` | string | yes |  | Draft ID. Draft id from List Email Drafts (a long hex string). |
| `from` | string | no |  | From. |
| `to` | array | no |  | To. Replaces the To list; omit it to keep the current list. |
| `cc` | array | no |  | Cc. Replaces the Cc list; omit it to keep the current list. |
| `bcc` | array | no |  | Bcc. Replaces the Bcc list; omit it to keep the current list. |
| `subject` | string | no |  | Subject. |
| `content` | string | no |  | Body. |
| `rich_text` | string | no |  | Content Format. Leave empty to keep the current format. One of `"true"`, `"false"`. |
| `reply_to` | string | no |  | Reply To. |

Output fields:

- `id`: Draft ID
- `module`: Module
- `record_id`: Record ID
- `status`: Status
- `message`: Message

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

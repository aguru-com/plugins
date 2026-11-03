# Vtiger

CRM software for sales, marketing, and support teams

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-vtiger'
  version: '1.5.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To obtain your Access Key, follow these steps:
>
> 1. Login to Vtiger CRM:
> Open a web browser and log in to your Vtiger CRM instance.
>
> 2. Navigate to User Profile:
> In the top right corner, click on your profile name.
> Select "My Preferences."
>
> 3. The system will generate an access key for you.
> Copy and securely store the access key. This key will be used for authentication when making API requests.
> Note:
>
> Access keys are sensitive information, and they should be kept secure.
> Treat the access key like a password. Do not share it publicly or expose it in an insecure manner.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `instance_url` | string | yes |  | VTiger Instance URL. For the instance URL, add the url without the endpoint. For example enter https://<instance>.od2.vtiger.com instead of https://<instance>.od2.vtiger.com/restapi/v1/vtiger/default. |
| `username` | string | yes |  | Username. Enter your username/email. |
| `password` | string | yes |  | Access Key. Enter your access Key. |

## Actions

### `create_record`

**Create Record.** Creates a new record of a given Vtiger module (element type, e.g. Contacts, Leads, Accounts) with the supplied field values. Choose this to add a new CRM entity. Each call inserts a new record, so repeated calls create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `elementType` | string | yes |  | Module Type. The module / element type. A value the product loads from the provider, such as an id; write the value itself. |
| `record` | object | yes |  | Record Fields. Add new fields to be created in the new record. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `result`: Record

### `get_record`

**Get Record.** Retrieves a single Vtiger record by its id within a given module (element type). Choose this when you already have the record id and need its current field values. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `elementType` | string | yes |  | Module Type. The module / element type. A value the product loads from the provider, such as an id; write the value itself. |
| `record` | object | yes |  | Record Fields. Add new fields to be created in the new record. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `result`: Record

### `update_record`

**Update Record.** Updates an existing Vtiger record, identified by its id within a given module (element type), with the supplied field values using Vtiger revise (only the sent fields change). Idempotent: re-running with the same fields leaves the record in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `elementType` | string | yes |  | Module Type. The module / element type. A value the product loads from the provider, such as an id; write the value itself. |
| `id` | string | yes |  | Id. The record's id. Only the first 100 records of the module are listed; use an expression to pass another id. A value the product loads from the provider, such as an id; write the value itself. |
| `record` | object | yes |  | Record Fields. Fields to update. Values shown are the record values when the step was configured. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `result`: Record

### `delete_record`

**Delete Record.** Deletes a Vtiger record by its id within a given module (element type). Choose this to remove a known record. Deleting an id that no longer exists fails the step. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `elementType` | string | yes |  | Module Type. The module / element type. A value the product loads from the provider, such as an id; write the value itself. |
| `record` | object | yes |  | Record Fields. Add new fields to be created in the new record. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `result`: Result
- `result.status`: Status

### `query_records`

**Query Records.** Runs a Vtiger VTQL read query (e.g. SELECT * FROM Contacts WHERE lastname = 'Smith' LIMIT 0, 100;) and returns the matching rows or aggregates such as count(*). Choose this for custom conditions or columns that Search Module Records cannot express. Add LIMIT offset, count to page through large result sets. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Enter the query statement, e.g. SELECT count(*) FROM Contacts; Add LIMIT offset, count to page through large results. |

### `search_records`

**Search Records.** Searches a Vtiger module (element type) by field-value criteria; text fields match case-insensitive substrings and other fields match exactly. Leaving the criteria empty returns all records up to the limit. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `elementType` | string | yes |  | Module Type. The module / element type. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Search Fields. Enter your filter criteria. Unchecked checkboxes are ignored. An object whose fields depend on other inputs; the product shows them. |
| `limit` | number | no |  | Limit. Enter the maximum number of records to return (default and maximum 1000). |

### `make_api_call`

**Custom API Call (Deprecated).** Deprecated. Makes an arbitrary authenticated HTTP call to the connected Vtiger instance, routing to the legacy webservice.php endpoint or the REST base depending on the URL given. Prefer the dedicated actions. Treat write calls as non-idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `method` | string | yes |  | Http Method. Select the HTTP method you want to use. One of `"GET"`, `"POST"`, `"PUT"`, `"PATCH"`, `"DELETE"`. |
| `url` | string | no |  | URL. Path (e.g. /me, /listtypes, /describe) called against the REST base, or an absolute URL on the connected instance. |
| `urlPath` | string | no |  | URL Path (deprecated). Deprecated. Use 'URL' instead. API endpoint's URL path (example: /me, /listtypes, /describe) |
| `headers` | JSON | no | `{}` | Headers. Enter the desired request headers. Skip the authorization headers. |
| `data` | JSON | no | `{}` | Data. Enter the data to pass. if its POST, it will be sent as body data, and if GET, as query string. |

### `get_current_user`

**Get Current User.** Returns the profile of the connected Vtiger user (webservice user ID, name, email, role, time zone, date format). Use it to get your own user ID for assigned_user_id fields or to read the user time zone before interpreting record timestamps. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID
- `user_name`: Username
- `first_name`: First Name
- `last_name`: Last Name
- `email1`: Email (email)
- `userlabel`: Display Name
- `user_type`: User Type
- `status`: Status
- `is_admin`: Is Admin
- `roleid`: Role ID
- `time_zone`: Time Zone
- `date_format`: Date Format
- `hour_format`: Hour Format
- `language`: Language

### `list_modules`

**List Modules.** Lists every Vtiger module (element type) visible to the connected user with its API name and label. Call this first to find the exact module name (e.g. Accounts for Organizations, Potentials for Deals) that the other actions take. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `modules`: Modules
- `modules[].name`: API Name
- `modules[].label`: Label
- `modules[].singular`: Singular Label
- `modules[].isEntity`: Is Entity (boolean)
- `count`: Count (number)

### `describe_module`

**Describe Module.** Returns the fields of one Vtiger module: API name, label, type, whether it is mandatory, picklist values and the modules a reference field points to. Call it before creating, updating or filtering records so you use real field names (e.g. lastname, cf_853) and valid picklist values. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. API name of the Vtiger module, for example Contacts, Leads, Accounts, Potentials or Cases. Get the exact names from List Modules. |

Output fields:

- `name`: Module
- `label`: Label
- `idPrefix`: ID Prefix
- `createable`: Createable (boolean)
- `updateable`: Updateable (boolean)
- `deleteable`: Deleteable (boolean)
- `labelFields`: Label Fields
- `fields`: Fields
- `fields[].name`: API Name
- `fields[].label`: Label
- `fields[].type`: Type
- `fields[].mandatory`: Mandatory (boolean)
- `fields[].editable`: Editable (boolean)
- `fields[].picklistValues`: Picklist Values
- `fields[].refersTo`: Refers To
- `fieldCount`: Field Count (number)

### `create_module_record`

**Create Module Record.** Creates one record in a Vtiger module (e.g. Contacts, Leads, Cases) from field API names and values; mandatory fields (see Describe Module) must be included, and assigned_user_id defaults to the connected user when omitted. Each call creates a new record, so use Find or Create Record to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. API name of the Vtiger module, for example Contacts, Leads, Accounts, Potentials or Cases. Get the exact names from List Modules. |
| `fields` | JSON | yes |  | Fields. JSON object of field API name to value, for example {"lastname": "Smith", "email": "jo@example.com"}. |

Output fields:

- `id`: Record ID
- `record`: Record

### `get_record_by_id`

**Get Record by ID.** Fetches every field of one Vtiger record from its webservice ID (e.g. 12x345); the module is implied by the ID prefix. Use it when you already have the ID; to find a record by field values use Search Module Records. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recordId` | string | yes |  | Record ID. Vtiger webservice ID of the record, for example 12x345. Get it from Search Module Records, Query Records or a previous create. |

Output fields:

- `id`: Record ID
- `record`: Record

### `update_record_fields`

**Update Record Fields.** Changes only the fields you pass on one record (Vtiger revise); every other field keeps its value and mandatory fields need not be restated. Send an empty string to clear a field. Re-running with the same values leaves the record unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recordId` | string | yes |  | Record ID. Vtiger webservice ID of the record, for example 12x345. Get it from Search Module Records, Query Records or a previous create. |
| `fields` | JSON | yes |  | Fields. JSON object of only the fields to change, for example {"leadstatus": "Contacted"}. |

Output fields:

- `id`: Record ID
- `record`: Record

### `list_changed_records`

**List Changed Records.** Returns the IDs of records in one module that changed or were deleted since a timestamp, using the Vtiger sync API. When more is true, call again with lastModifiedTime as Modified Since to continue. Fetch full records with Get Record by ID. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. API name of the Vtiger module, for example Contacts, Leads, Accounts, Potentials or Cases. Get the exact names from List Modules. |
| `modifiedSince` | string | yes |  | Modified Since. Unix seconds (e.g. 1735689600) or an ISO 8601 date such as 2026-01-01T00:00:00Z. |
| `syncType` | string | no | `"application"` | Scope. Which records to include. One of `"application"`, `"userandgroup"`, `"user"`. |

Output fields:

- `updatedIds`: Created or Updated IDs
- `deletedIds`: Deleted IDs
- `updatedCount`: Updated Count (number)
- `deletedCount`: Deleted Count (number)
- `more`: More (boolean)
- `lastModifiedTime`: Last Modified Time

### `delete_record_by_id`

**Delete Record by ID.** Deletes one record by webservice ID. Vtiger moves it to the Recycle Bin, where only an admin can restore it from the web UI. Deleting an ID that is already gone fails with HTTP 400. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recordId` | string | yes |  | Record ID. Vtiger webservice ID of the record, for example 12x345. Get it from Search Module Records, Query Records or a previous create. |

Output fields:

- `id`: Record ID
- `deleted`: Deleted (boolean)

### `list_relation_types`

**List Relation Types.** Lists the relations of a Vtiger module (e.g. Accounts to Contacts, Potentials, Documents) with their labels and related modules. Call it to get the relation label (relationLabel, not translatedLabel) and related module that Link Records, List Related Records and Query Related Records need. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. API name of the source module, for example Accounts. |

Output fields:

- `relations`: Relations
- `relations[].relationId`: Relation ID
- `relations[].relatedModule`: Related Module
- `relations[].relationLabel`: Relation Label
- `relations[].translatedLabel`: Display Label
- `relations[].actions`: Allowed Actions
- `count`: Count (number)

### `reopen_record`

**Reopen Record.** Reopens a closed record by webservice ID, for example a deal in Closed Won or Closed Lost (its isclosed field is 1). Vtiger returns HTTP 400 when the record is not closed, including a Case whose status was only set to Closed. Requires permission to edit the record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recordId` | string | yes |  | Record ID. Vtiger webservice ID of the record, for example 12x345. Get it from Search Module Records, Query Records or a previous create. |

Output fields:

- `id`: Record ID
- `reopened`: Reopened (boolean)
- `message`: Message

### `unlink_records`

**Unlink Records.** Removes the link between two records (e.g. takes a Contact off an Account) without deleting either record; Link Records restores it. Unlinking a pair that is not linked succeeds and changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceRecordId` | string | yes |  | Source Record ID. Webservice ID of the parent record. |
| `relatedRecordId` | string | yes |  | Related Record ID. Webservice ID of the linked record. |

Output fields:

- `sourceRecordId`: Source Record ID
- `relatedRecordId`: Related Record ID
- `unlinked`: Unlinked (boolean)

### `add_tags_to_record`

**Add Tags to Record.** Adds one or more tags to a record; tags that do not exist yet are created. Adding a tag the record already has changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recordId` | string | yes |  | Record ID. Vtiger webservice ID of the record, for example 12x345. Get it from Search Module Records, Query Records or a previous create. |
| `tags` | array | yes |  | Tags. Tag names to add. |

Output fields:

- `recordId`: Record ID
- `tags`: Requested Tags
- `message`: Vtiger Message

### `get_record_tags`

**Get Record Tags.** Returns the tags attached to one Vtiger record. Use it to check tags before adding or removing them. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recordId` | string | yes |  | Record ID. Vtiger webservice ID of the record, for example 12x345. Get it from Search Module Records, Query Records or a previous create. |

Output fields:

- `recordId`: Record ID
- `tags`: Tags
- `count`: Count (number)

### `remove_tags_from_record`

**Remove Tags from Record.** Removes one or more tags from a single record only; the tags stay on other records and can be re-added with Add Tags to Record. Removing a tag the record does not have changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recordId` | string | yes |  | Record ID. Vtiger webservice ID of the record, for example 12x345. Get it from Search Module Records, Query Records or a previous create. |
| `tags` | array | yes |  | Tags. Tag names to remove from this record. |

Output fields:

- `recordId`: Record ID
- `tags`: Requested Tags
- `message`: Vtiger Message

### `get_account_hierarchy`

**Get Account Hierarchy.** Returns the account hierarchy (parent and member organizations) around one Accounts (Organizations) record. Only works with Accounts IDs. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. Webservice ID of an Accounts (Organizations) record, for example 11x42. |

Output fields:

- `accountId`: Account ID
- `hierarchy`: Hierarchy
- `hierarchy[].id`: Account ID
- `hierarchy[].name`: Name
- `hierarchy[].level`: Level (number)
- `hierarchy[].label`: Level Label
- `hierarchy[].current`: Is Requested Account

### `find_records_by_email_or_phone`

**Find Records by Email or Phone.** Looks up records by an email address or phone number across every email or phone field of the chosen modules (default Contacts, Leads, Accounts). Prefer it over Search Module Records when you only have an email or phone and do not know which field or module holds it. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes | `"email"` | Lookup Type. One of `"email"`, `"phone"`. |
| `value` | string | yes |  | Value. The email address or phone number to look for. |
| `modules` | array | no |  | Modules. Module API names to search in. Defaults to Contacts, Leads and Accounts. |

Output fields:

- `records`: Records
- `count`: Count (number)

### `get_picklist_dependency`

**Get Picklist Dependency.** Returns the picklist dependency between two picklist fields of a module: for each source value, the target values Vtiger allows. Use it before setting dependent picklists so the update is accepted. hasDependency is false and mappings is empty when no dependency is configured for the pair. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. API name of the Vtiger module, for example Contacts, Leads, Accounts, Potentials or Cases. Get the exact names from List Modules. |
| `sourceField` | string | yes |  | Source Field. API name of the controlling picklist field (from Describe Module). |
| `targetField` | string | yes |  | Target Field. API name of the dependent picklist field (from Describe Module). |

Output fields:

- `module`: Module
- `sourceField`: Source Field
- `targetField`: Target Field
- `hasDependency`: Has Dependency (boolean)
- `mappings`: Mappings
- `mappings[].sourceValue`: Source Value
- `mappings[].targetValues`: Allowed Target Values

### `convert_lead`

**Convert Lead.** Converts one Lead into a new Contact, optionally also creating an Organization and a Deal. Cannot be undone: the Lead is marked converted and leaves lead lists, and a second call fails or creates duplicates. A Deal needs potentialname, closingdate and sales_stage. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | yes |  | Lead ID. Webservice ID of the Leads record, for example 10x123. |
| `assignedTo` | string | no |  | Assigned To. Webservice ID of the user who will own the new records. Defaults to the connected user. |
| `contactFields` | JSON | no |  | Contact Fields. Optional JSON of extra Contacts fields. Lead values are mapped automatically. |
| `createAccount` | boolean | no | `false` | Create Organization. |
| `accountFields` | JSON | no |  | Organization Fields. Optional JSON of Accounts fields, for example {"accountname": "Acme"}. |
| `createPotential` | boolean | no | `false` | Create Deal. |
| `potentialFields` | JSON | no |  | Deal Fields. JSON of Potentials fields; required when Create Deal is on, for example {"potentialname": "Acme deal", "closingdate": "2026-12-31", "sales_stage": "Prospecting"}. |

Output fields:

- `leadId`: Lead ID
- `contactId`: Contact ID
- `accountId`: Organization ID
- `potentialId`: Deal ID

### `link_records`

**Link Records.** Links two existing records through a relation, e.g. adds a Contact to an Account or a Document to a Ticket. Take the relation label from List Relation Types for the source module. Linking a pair that is already linked succeeds and changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceRecordId` | string | yes |  | Source Record ID. Webservice ID of the parent record. |
| `relatedRecordId` | string | yes |  | Related Record ID. Webservice ID of the record to add. |
| `relationLabel` | string | yes |  | Relation Label. Relation label from List Relation Types, for example Contacts. |

Output fields:

- `sourceRecordId`: Source Record ID
- `relatedRecordId`: Related Record ID
- `relationLabel`: Relation Label
- `linked`: Linked (boolean)

### `list_related_records`

**List Related Records.** Returns the records in one related list of a record, e.g. the Contacts of an Account. Take the relation label and related module from List Relation Types for the record's module. Use Query Related Records when you need paging. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recordId` | string | yes |  | Record ID. Webservice ID of the parent record, for example 11x42. |
| `relatedLabel` | string | yes |  | Relation Label. The relation label from List Relation Types (its label, not the translated label), for example Contacts or Activities. |
| `relatedModule` | string | yes |  | Related Module. API name of the related module, for example Contacts. |

Output fields:

- `records`: Records
- `count`: Count (number)

### `query_related_records`

**Query Related Records.** Returns one page (up to 100) of the records of a related module linked to a record, e.g. Potentials of an Account. When hasMore is true, call again with offset + limit. Take the relation label and related module from List Relation Types; they differ for some relations (Calendar is labelled Activities). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recordId` | string | yes |  | Record ID. Webservice ID of the parent record, for example 11x42. |
| `relatedModule` | string | yes |  | Related Module. API name of the related module, for example Contacts. |
| `relatedLabel` | string | yes |  | Relation Label. The relation label from List Relation Types (its label, not the translated label), for example Contacts or Activities. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100 (default 100). |
| `offset` | number | no |  | Offset. Number of records to skip (default 0). |

Output fields:

- `records`: Records
- `count`: Count (number)
- `offset`: Offset (number)
- `hasMore`: Has More (boolean)

### `download_attachment`

**Download Attachment.** Downloads one attachment (e.g. a contact photo or product image) and returns it as a file. The input is an attachment ID taken from a record's imageattachmentids field (Get Record by ID), not the record ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `attachmentId` | string | yes |  | Attachment ID. Value from the record's imageattachmentids field. |

Output fields:

- `attachmentId`: Attachment ID
- `fileName`: File Name
- `fileType`: File Type
- `fileSize`: File Size (filesize)
- `file`: File (url)

### `search_module_records`

**Search Module Records.** Finds records in one module whose fields match all given values, filtered server-side. Exact match by default; contains does a substring match on text values. With no filters it lists records. Use Describe Module for field names and Query Records for OR conditions or sorting. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. API name of the Vtiger module, for example Contacts, Leads, Accounts, Potentials or Cases. Get the exact names from List Modules. |
| `filters` | JSON | no |  | Filters. JSON object of field API name to value, for example {"lastname": "Smith", "leadsource": "Web Site"}. |
| `match` | string | no | `"exact"` | Match. One of `"exact"`, `"contains"`. |
| `limit` | number | no |  | Limit. Maximum records to return, 1 to 1000 (default 100). |

Output fields:

- `records`: Records
- `count`: Count (number)
- `hasMore`: Has More (boolean)

### `find_or_create_record`

**Find or Create Record.** Looks up a record in a module by one field (exact match, e.g. email) and returns the first match; only when nothing matches it creates a record with that value plus the given fields. Safe to retry only when the match field is unique in Vtiger; two concurrent calls can both create. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. API name of the Vtiger module, for example Contacts, Leads, Accounts, Potentials or Cases. Get the exact names from List Modules. |
| `matchField` | string | yes |  | Match Field. Field API name to match on, for example email. |
| `matchValue` | string | yes |  | Match Value. Value the field must equal exactly. |
| `fields` | JSON | no |  | Fields. JSON of fields used only when a record is created; include the mandatory fields, for example {"lastname": "Smith"}. |

Output fields:

- `created`: Created (boolean)
- `matchCount`: Match Count (number)
- `id`: Record ID
- `record`: Record

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

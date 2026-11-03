# Airtable

Low‒code platform to build apps.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-airtable'
  version: '0.9.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Personal Access Token

> To obtain your personal token, follow these steps:
>
> 1. Log in to your Airtable account.
> 2. Visit https://airtable.com/create/tokens/ to create one
> 3. Click on "+ Add a base" and select the base you want to use or all bases. To create new bases, also add the workspace under "+ Add a workspace".
> 4. Click on "+ Add a scope" and select "data.records:read", "data.records:write", "data.recordComments:read", "data.recordComments:write", "schema.bases:read" and "schema.bases:write" for full functionality.
> 5. Click on "Create token" and copy the token.

## Actions

### `airtable_create_record`

**Create Airtable Record.** Creates a new record in an Airtable table from a set of field values, resolving any linked-record/attachment fields before insert. Use to append a row to a base. Requires a base and table; each call appends a distinct record, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Record ID
- `createdTime`: Created Time (datetime)
- `fields`: Fields (an object whose keys vary)

### `airtable_find_record`

**Find Airtable Record.** Searches a table for records whose chosen field contains the given search value, using a substring (FIND) match, and optionally limits the search to a specific view. Use to look up records by a field value when you do not have the record ID. The search field and a non-empty search value are required; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `searchField` | string | yes |  | Search Field. A value the product loads from the provider, such as an id; write the value itself. |
| `searchValue` | string | yes |  | Search Value. Case-sensitive. Records whose field contains this text are returned. |
| `limitToView` | string | no |  | View. Only records in this view are used. Empty: the whole table. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `[].id`: Record ID
- `[].createdTime`: Created Time (datetime)
- `[].fields`: Fields (an object whose keys vary)

### `airtable_update_record`

**Update Airtable Record.** Updates an existing record identified by its record ID, writing only the supplied non-empty field values and leaving other fields untouched (PATCH semantics). Use when you already know the record ID and want to change specific fields. Idempotent: repeating with the same input yields the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. Starts with rec. Copy it from the record URL or an earlier step. |
| `fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Record ID
- `createdTime`: Created Time (datetime)
- `fields`: Fields (an object whose keys vary)

### `airtable_clean_record`

**Clean Record.** Clears (empties) the specified fields on an existing record identified by its record ID, leaving unspecified fields untouched. Use to blank out field values rather than set them. Idempotent: re-running with the same input leaves the same cleared state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. Starts with rec. Copy it from the record URL or an earlier step. |
| `fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Record ID
- `createdTime`: Created Time (datetime)
- `fields`: Fields (an object whose keys vary)

### `airtable_delete_record`

**Delete Airtable Record.** Permanently deletes a single record from a table by its record ID. Use to remove a row when you have its ID. Effectively idempotent: once the record is gone, repeating the call has no further effect (later calls error on the missing ID). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. Starts with rec. Copy it from the record URL or an earlier step. |

Output fields:

- `id`: Deleted Record ID
- `deleted`: Deleted (boolean)

### `airtable_upload_file_to_column`

**Upload File to Column.** Uploads a file (given as a public URL or base64) into a multiple-attachments column on an existing record, identified by base, table, record ID and the attachment column. Use to attach files to a record. The file content type is required; each call adds an attachment, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `attachment_column` | string | yes |  | Attachment Column. Only attachment-type fields are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. Starts with rec. Copy it from the record URL or an earlier step. |
| `file` | file | yes |  | File. A file from an earlier step or a public URL. Files are not supported; an action that needs one fails. |
| `file_content_type` | string | yes |  | File Content Type. MIME type of the file. |
| `filename` | string | no |  | File Name. Name shown in Airtable. Empty: the uploaded file's own name. |

Output fields:

- `id`: Record ID
- `createdTime`: Created Time (datetime)
- `fields`: Fields (an object whose keys vary)

### `airtable_add_comment_to_record`

**Add Comment to Record.** Posts a text comment on an existing record, optionally as a threaded reply to a parent comment ID. Use to leave a note on a record; mention users with @[userId] or @[userEmail] in the text. Not idempotent — each call adds a new comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. Starts with rec. Copy it from the record URL or an earlier step. |
| `text` | string | yes |  | Comment. Mention someone with @[userId] or @[userEmail]. |
| `parentCommentId` | string | no |  | Parent Comment ID. Reply in this comment's thread. Empty: a new top-level comment. |

Output fields:

- `id`: Comment ID
- `createdTime`: Created Time (datetime)
- `lastUpdatedTime`: Last Updated Time (datetime)
- `text`: Comment Text
- `parentCommentId`: Parent Comment ID
- `author`: Author
- `author.id`: User ID
- `author.email`: Email (email)
- `author.name`: Name
- `mentioned`: Mentioned Users (an object whose keys vary)
- `mentioned.id`: ID
- `mentioned.type`: Type
- `mentioned.displayName`: Display Name
- `mentioned.email`: Email (email)
- `reactions`: Reactions
- `reactions[].emoji`: Emoji
- `reactions[].emoji.unicodeCharacter`: Character
- `reactions[].reactingUser`: Reacting User
- `reactions[].reactingUser.userId`: User ID
- `reactions[].reactingUser.email`: Email (email)
- `reactions[].reactingUser.name`: Name

### `airtable_create_base`

**Create Base.** Creates a new Airtable base inside a workspace, seeded with one or more tables defined by a JSON structure (the first field of each table becomes its primary field). Use to provision a brand-new base. Requires a workspace ID and base name; not idempotent — each call creates a separate base. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace. Listed by ID because Airtable has no workspace name API. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Base Name. |
| `tables` | JSON | yes | `[{"name":"My First Table","fields":[{"name":"Name","type":"singleLineText"},{"name":"Status","type":"singleSelect","options":{"choices":[{"name":"Todo"},{"name":"In Progress"},{"name":"Done"}]}}]}]` | Tables. Tables to create. The first field of each table is its primary field. |

Output fields:

- `id`: Base ID
- `tables`: Tables
- `tables[].id`: Table ID
- `tables[].name`: Table Name
- `tables[].description`: Description
- `tables[].primaryFieldId`: Primary Field ID
- `tables[].fields`: Fields
- `tables[].fields[].id`: Field ID
- `tables[].fields[].name`: Field Name
- `tables[].fields[].type`: Field Type
- `tables[].fields[].description`: Description
- `tables[].fields[].options`: Options
- `tables[].views`: Views
- `tables[].views[].id`: View ID
- `tables[].views[].name`: View Name
- `tables[].views[].type`: View Type

### `airtable_create_table`

**Create Table.** Creates a new table in an existing base from a JSON array of field definitions (the first field becomes the primary field), with an optional table description. Use to add a table to a base you already have. Not idempotent — each call creates a new table. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Table Name. |
| `description` | string | no |  | Description. Shown under the table name in Airtable. |
| `fields` | JSON | yes | `[{"name":"Name","type":"singleLineText","description":"This will be the primary field"},{"name":"Notes","type":"multilineText"}]` | Fields. Fields for the table. The first one becomes the primary field. |

Output fields:

- `id`: Table ID
- `name`: Table Name
- `description`: Description
- `primaryFieldId`: Primary Field ID
- `fields`: Fields
- `fields[].id`: Field ID
- `fields[].name`: Field Name
- `fields[].type`: Field Type
- `fields[].description`: Description
- `fields[].options`: Options
- `views`: Views
- `views[].id`: View ID
- `views[].name`: View Name
- `views[].type`: View Type

### `airtable_find_base`

**Find Base.** Lists all accessible bases and returns those whose name contains the given keyword (case-insensitive substring match). Use to resolve a base ID from a name before other operations. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseName` | string | yes |  | Base Name. Bases whose name contains this text are returned. |

Output fields:

- `[].id`: Base ID
- `[].name`: Base Name
- `[].permissionLevel`: Permission Level

### `airtable_find_table_by_id`

**Find Table by ID.** Fetches a single table's details and field schema by its base and table ID. Use when you already have the table ID and need its structure (field names, types) before reading or writing records. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Table ID
- `name`: Table Name
- `description`: Description
- `primaryFieldId`: Primary Field ID
- `fields`: Fields
- `fields[].id`: Field ID
- `fields[].name`: Field Name
- `fields[].type`: Field Type
- `fields[].description`: Description
- `fields[].options`: Options
- `views`: Views
- `views[].id`: View ID
- `views[].name`: View Name
- `views[].type`: View Type

### `airtable_get_record_by_id`

**Get Record by ID.** Retrieves a single record and its field values from a table by the record ID. Use when you already know the exact record ID; to find records by a field value instead, use Find Airtable Record. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record. Lists the first 500 records by their primary field. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Record ID
- `createdTime`: Created Time (datetime)
- `fields`: Fields (an object whose keys vary)

### `airtable_find_table`

**Find Table.** Looks up a single table in a base by an exact (case-insensitive) name match and returns it, or null if no table matches. Use to resolve a table ID from its name. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `tableName` | string | yes |  | Table Name. Exact table name. Case does not matter. |

Output fields:

- `id`: Table ID
- `name`: Table Name
- `description`: Description
- `primaryFieldId`: Primary Field ID
- `fields`: Fields
- `fields[].id`: Field ID
- `fields[].name`: Field Name
- `fields[].type`: Field Type
- `fields[].description`: Description
- `fields[].options`: Options
- `views`: Views
- `views[].id`: View ID
- `views[].name`: View Name
- `views[].type`: View Type

### `airtable_get_base_schema`

**Get Base Schema.** Returns the full schema of a base — the list of all its tables along with their fields and types. Use to discover what tables and fields a base contains before reading or writing records. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `[].id`: Table ID
- `[].name`: Table Name
- `[].description`: Description
- `[].primaryFieldId`: Primary Field ID
- `[].fields`: Fields
- `[].fields[].id`: Field ID
- `[].fields[].name`: Field Name
- `[].fields[].type`: Field Type
- `[].fields[].description`: Description
- `[].fields[].options`: Options
- `[].views`: Views
- `[].views[].id`: View ID
- `[].views[].name`: View Name
- `[].views[].type`: View Type

### `create_record_ai`

**Create Record (Agent).** Creates a single new record in an Airtable table from a JSON map of field-name to value. Call Get Base Schema (Agent) first to learn the exact field names and types; linked-record and multi-select fields take arrays of ids/strings. Each call creates a new record, so it is not idempotent (retries duplicate). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `table_id_or_name` | string | yes |  | Table ID or Name. The table ID (e.g. "tblXXXXXXXXXXXXXX") or its exact name. Resolve it with Get Base Schema (Agent). |
| `fields` | JSON | yes |  | Fields. A JSON object mapping field names to values, e.g. {"Name": "Acme", "Status": "Active"}. Use Get Base Schema (Agent) to learn field names and types. Linked-record and multi-select fields take arrays of ids/strings; attachment fields take an array of objects like [{"url": "https://..."}]. Values are … |

Output fields:

- `id`: Record ID
- `createdTime`: Created Time (datetime)
- `fields`: Fields (an object whose keys vary)

### `get_record`

**Get Record (Agent).** Retrieves a single record and its field values by record ID. Use when you already know the exact record ID; to find records by a field value instead use Search Records (Agent) or List Records (Agent). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `table_id_or_name` | string | yes |  | Table ID or Name. The table ID (e.g. "tblXXXXXXXXXXXXXX") or its exact name. Resolve it with Get Base Schema (Agent). |
| `record_id` | string | yes |  | Record ID. The record ID (e.g. "recXXXXXXXXXXXXXX"). Resolve it with Search Records (Agent) or List Records (Agent). |

Output fields:

- `id`: Record ID
- `createdTime`: Created Time (datetime)
- `fields`: Fields (an object whose keys vary)

### `update_record_ai`

**Update Record (Agent).** Updates an existing record by its ID, writing only the supplied fields and leaving the rest untouched (PATCH semantics). Use when you know the record ID and want to change specific fields; to set a field empty pass null. Idempotent: repeating with the same input yields the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `table_id_or_name` | string | yes |  | Table ID or Name. The table ID (e.g. "tblXXXXXXXXXXXXXX") or its exact name. Resolve it with Get Base Schema (Agent). |
| `record_id` | string | yes |  | Record ID. The record ID (e.g. "recXXXXXXXXXXXXXX"). Resolve it with Search Records (Agent) or List Records (Agent). |
| `fields` | JSON | yes |  | Fields. A JSON object mapping field names to new values, e.g. {"Status": "Done"}. Only the keys you supply are changed; pass null to clear a field. Linked-record and multi-select fields take arrays of ids/strings; attachment fields take an array of objects like [{"url": "https://..."}]. Use Get Base Schema… |

Output fields:

- `id`: Record ID
- `createdTime`: Created Time (datetime)
- `fields`: Fields (an object whose keys vary)

### `delete_record_ai`

**Delete Record (Agent).** Permanently deletes a single record from a table by its record ID. Use to remove one row when you have its ID; to delete several at once use Delete Records Batch (Agent). Effectively idempotent: once the record is gone the end state is unchanged (a repeat call errors on the missing ID). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `table_id_or_name` | string | yes |  | Table ID or Name. The table ID (e.g. "tblXXXXXXXXXXXXXX") or its exact name. Resolve it with Get Base Schema (Agent). |
| `record_id` | string | yes |  | Record ID. The record ID (e.g. "recXXXXXXXXXXXXXX") to delete. Resolve it with Search Records (Agent) or List Records (Agent). |

Output fields:

- `id`: Deleted Record ID
- `deleted`: Deleted (boolean)

### `list_records`

**List Records (Agent).** Lists records from a table with optional Airtable filterByFormula, view, sort, field selection and limits — the power-user query path. Use this when you need a formula filter or sorting; for a simple "field equals/contains value" lookup prefer Search Records (Agent). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `table_id_or_name` | string | yes |  | Table ID or Name. The table ID (e.g. "tblXXXXXXXXXXXXXX") or its exact name. Resolve it with Get Base Schema (Agent). |
| `filter_by_formula` | string | no |  | Filter By Formula. Optional Airtable formula to filter rows, e.g. {Status}="Done" or AND({Score}>5, FIND("ace", LOWER({Name}))). Field names go in {curly braces}. |
| `view` | string | no |  | View. Optional view ID or name to restrict and order results to that view. |
| `max_records` | number | no |  | Max Records. Optional maximum total number of records to return; the action paginates across pages up to this number. Omit to return just the first page (with an offset cursor to continue). |
| `page_size` | number | no |  | Page Size. Optional number of records per page (1-100, default 100). |
| `sort` | JSON | no |  | Sort. Optional JSON array of sort directives, e.g. [{"field": "Name", "direction": "asc"}]. Direction is "asc" or "desc". |
| `fields` | array | no |  | Fields. Optional list of field names to return; omit to return all fields. |

Output fields:

- `count`: Record Count (number)
- `offset`: Next Page Offset
- `records`: Records
- `records[].id`: Record ID
- `records[].createdTime`: Created Time (datetime)
- `records[].fields`: Fields (an object whose keys vary)

### `list_bases`

**List Bases (Agent).** Returns every base the connected token can access, each with its id, name and permission level — the top resolver for turning a base name into a base ID. Call this first, then Get Base Schema (Agent) to discover tables and fields. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `count`: Base Count (number)
- `bases`: Bases
- `bases[].id`: Base ID
- `bases[].name`: Base Name
- `bases[].permissionLevel`: Permission Level

### `get_base_schema_ai`

**Get Base Schema (Agent).** Returns the full schema of a base — every table with its id, name, and the names and types of all its fields. This is the key resolver: call it to turn a base ID into table IDs and exact field names before reading or writing records. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |

Output fields:

- `count`: Table Count (number)
- `tables`: Tables
- `tables[].id`: Table ID
- `tables[].name`: Table Name
- `tables[].description`: Description
- `tables[].primaryFieldId`: Primary Field ID
- `tables[].fields`: Fields
- `tables[].fields[].id`: Field ID
- `tables[].fields[].name`: Field Name
- `tables[].fields[].type`: Field Type
- `tables[].fields[].description`: Description

### `upload_attachment_ai`

**Upload Attachment (Agent).** Uploads a file (base64-encoded content) into a multiple-attachments field on an existing record. Provide the attachment field ID (from Get Base Schema (Agent)), the record ID, the base64 content, its MIME content type, and a filename. Each call adds a new attachment, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `record_id` | string | yes |  | Record ID. The record ID (e.g. "recXXXXXXXXXXXXXX") to attach the file to. |
| `attachment_field_id` | string | yes |  | Attachment Field ID. The field ID (e.g. "fldXXXXXXXXXXXXXX") of a multiple-attachments column. Resolve it with Get Base Schema (Agent) (pick a field whose type is multipleAttachments). |
| `file` | string | yes |  | File (Base64). The file content encoded as a base64 string (no data: prefix). |
| `content_type` | string | yes |  | Content Type. The MIME type of the file, e.g. 'image/png' or 'application/pdf'. |
| `filename` | string | no |  | File Name. Optional name for the file as it should appear after upload. |

Output fields:

- `id`: Record ID
- `createdTime`: Created Time (datetime)
- `fields`: Fields (an object whose keys vary)

### `upsert_records`

**Upsert Records (Agent).** Batch upserts up to 10 records in one PATCH call. When Fields To Merge On is set, each record is matched on those field values and updated if found or created if not (keyed upsert). Without it, records that include an id are updated and the rest created. Idempotent: re-running with the same merge keys converges to the same state rather than duplicating. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `table_id_or_name` | string | yes |  | Table ID or Name. The table ID (e.g. "tblXXXXXXXXXXXXXX") or its exact name. Resolve it with Get Base Schema (Agent). |
| `records` | JSON | yes |  | Records. A JSON array of up to 10 records, each shaped {"fields": {"Name": "Acme", "Status": "Active"}}. To update an existing record without merge keys, include its id: {"id": "recXXXX", "fields": {...}}. Use Get Base Schema (Agent) for field names. |
| `fields_to_merge_on` | array | no |  | Fields To Merge On. Optional list of field names used as the match key for upsert, e.g. ["Email"]. When set, records matching on these fields are updated, others created. Leave empty for a plain batch update by id. |
| `typecast` | boolean | no | `true` | Typecast. When true (default), Airtable coerces string values to the field type and auto-creates select options. Set false for strict typing. |

Output fields:

- `count`: Record Count (number)
- `records`: Records
- `records[].id`: Record ID
- `records[].createdTime`: Created Time (datetime)
- `records[].fields`: Fields (an object whose keys vary)
- `createdRecords`: Created Record IDs
- `updatedRecords`: Updated Record IDs

### `delete_records_batch`

**Delete Records Batch (Agent).** Permanently deletes up to 10 records from a table in one call, given their record IDs. Use to remove several rows at once; to delete a single record use Delete Record (Agent). Effectively idempotent: the end state is the records gone (a repeat call reports the already-deleted IDs). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `table_id_or_name` | string | yes |  | Table ID or Name. The table ID (e.g. "tblXXXXXXXXXXXXXX") or its exact name. Resolve it with Get Base Schema (Agent). |
| `record_ids` | array | yes |  | Record IDs. A list of up to 10 record IDs to delete, e.g. ["recAAA", "recBBB"]. Resolve IDs with Search Records (Agent) or List Records (Agent). |

Output fields:

- `count`: Deleted Count (number)
- `records`: Deleted Records
- `records[].id`: Deleted Record ID
- `records[].deleted`: Deleted (boolean)

### `get_current_user`

**Get Current User (Agent).** Returns the identity of the connected personal access token — its user id, and (where exposed) the scopes the token carries. Use to confirm which account is connected and which permissions are available before attempting scope-gated operations. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID

### `search_records`

**Search Records (Agent).** Finds records in a table where a single field contains or exactly equals a value — the simple "find the record where X = Y" path that builds the Airtable formula for you. Use this by default to resolve a record ID from a known field value; for complex formula filters or sorting use List Records (Agent). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `table_id_or_name` | string | yes |  | Table ID or Name. The table ID (e.g. "tblXXXXXXXXXXXXXX") or its exact name. Resolve it with Get Base Schema (Agent). |
| `search_field` | string | yes |  | Search Field. The exact name of the field to match against. Resolve names with Get Base Schema (Agent). |
| `search_value` | string | yes |  | Search Value. The value to look for in the search field. |
| `match_mode` | string | no | `"contains"` | Match Mode. "contains" (default) does a case-sensitive substring match; "exact" requires the whole field to equal the value. Exact compares the field as text, so it also matches number and checkbox fields by their text value. One of `"contains"`, `"exact"`. |
| `view` | string | no |  | View. Optional view ID or name to restrict the search to. |
| `max_records` | number | no |  | Max Records. Optional maximum number of matching records to return. |

Output fields:

- `count`: Record Count (number)
- `records`: Records
- `records[].id`: Record ID
- `records[].createdTime`: Created Time (datetime)
- `records[].fields`: Fields (an object whose keys vary)

### `add_comment_to_record_ai`

**Add Comment to Record (Agent).** Posts a text comment on an existing record, optionally as a threaded reply to a parent comment ID. Mention users with @[userId] or @[userEmail] in the text. Requires a token with the data.recordComments:write scope. Not idempotent — each call adds a new comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `table_id_or_name` | string | yes |  | Table ID or Name. The table ID (e.g. "tblXXXXXXXXXXXXXX") or its exact name. Resolve it with Get Base Schema (Agent). |
| `record_id` | string | yes |  | Record ID. The record ID (e.g. "recXXXXXXXXXXXXXX") to comment on. |
| `text` | string | yes |  | Comment Text. The comment content. Mention a user with @[userId] or @[userEmail]. |
| `parent_comment_id` | string | no |  | Parent Comment ID. Optional ID of a parent comment to reply to (creates a threaded reply). Find IDs with List Record Comments (Agent). |

Output fields:

- `id`: Comment ID
- `createdTime`: Created Time (datetime)
- `lastUpdatedTime`: Last Updated Time (datetime)
- `text`: Comment Text
- `parentCommentId`: Parent Comment ID
- `author`: Author
- `author.id`: User ID
- `author.email`: Email (email)
- `author.name`: Name
- `mentioned`: Mentioned Users (an object whose keys vary)
- `mentioned.id`: ID
- `mentioned.type`: Type
- `mentioned.displayName`: Display Name
- `mentioned.email`: Email (email)
- `reactions`: Reactions
- `reactions[].emoji`: Emoji
- `reactions[].emoji.unicodeCharacter`: Character
- `reactions[].reactingUser`: Reacting User
- `reactions[].reactingUser.userId`: User ID
- `reactions[].reactingUser.email`: Email (email)
- `reactions[].reactingUser.name`: Name

### `create_table_ai`

**Create Table (Agent).** Creates a new table in an existing base from a JSON array of field definitions (the first field becomes the primary field), with an optional description. Requires a token with the schema.bases:write scope. Not idempotent — each call creates a new table. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `name` | string | yes |  | Table Name. The name for the new table. |
| `description` | string | no |  | Description. Optional description for the new table. |
| `fields` | JSON | yes | `[{"name":"Name","type":"singleLineText","description":"This will be the primary field"},{"name":"Notes","type":"multilineText"}]` | Fields. A JSON array of field definitions; the first entry becomes the primary field. Each entry is {"name": "...", "type": "singleLineText", "description"?: "..."}. Select fields need {"type": "singleSelect", "options": {"choices": [{"name": "Todo"}]}}. |

Output fields:

- `id`: Table ID
- `name`: Table Name
- `description`: Description
- `primaryFieldId`: Primary Field ID
- `fields`: Fields
- `fields[].id`: Field ID
- `fields[].name`: Field Name
- `fields[].type`: Field Type
- `fields[].description`: Description
- `fields[].options`: Options
- `views`: Views
- `views[].id`: View ID
- `views[].name`: View Name
- `views[].type`: View Type

### `create_base_ai`

**Create Base (Agent).** Creates a new Airtable base in a workspace, seeded with one or more tables defined by a JSON structure (the first field of each table is its primary field). Requires a token with the schema.bases:write scope. There is no list-workspaces endpoint: obtain the workspaceId from an existing base's URL/metadata or the Airtable UI. Not idempotent — each call creates a separate base. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. The workspace ID (e.g. "wspXXXXXXXXXXXXXX") to create the base in. Airtable has no list-workspaces API; get it from a base's metadata or the Airtable UI URL. |
| `name` | string | yes |  | Base Name. The name for the new base. |
| `tables` | JSON | yes | `[{"name":"My First Table","fields":[{"name":"Name","type":"singleLineText"},{"name":"Status","type":"singleSelect","options":{"choices":[{"name":"Todo"},{"name":"In Progress"},{"name":"Done"}]}}]}]` | Tables. A JSON array of tables for the new base. Each table is {"name": "...", "fields": [{"name": "Name", "type": "singleLineText"}, ...]}. The first field of each table becomes its primary field. |

Output fields:

- `id`: Base ID
- `tables`: Tables
- `tables[].id`: Table ID
- `tables[].name`: Table Name
- `tables[].description`: Description
- `tables[].primaryFieldId`: Primary Field ID
- `tables[].fields`: Fields
- `tables[].fields[].id`: Field ID
- `tables[].fields[].name`: Field Name
- `tables[].fields[].type`: Field Type
- `tables[].fields[].description`: Description
- `tables[].fields[].options`: Options
- `tables[].views`: Views
- `tables[].views[].id`: View ID
- `tables[].views[].name`: View Name
- `tables[].views[].type`: View Type

### `update_table`

**Update Table (Agent).** Renames a table and/or changes its description. Supply at least one of name or description. Requires a token with the schema.bases:write scope. Idempotent: setting the same name/description converges to the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `table_id_or_name` | string | yes |  | Table ID or Name. The table ID (e.g. "tblXXXXXXXXXXXXXX") or its exact name. Resolve it with Get Base Schema (Agent). |
| `name` | string | no |  | New Name. Optional new name for the table. |
| `description` | string | no |  | New Description. Optional new description for the table. |

Output fields:

- `id`: Table ID
- `name`: Table Name
- `description`: Description
- `primaryFieldId`: Primary Field ID
- `fields`: Fields
- `fields[].id`: Field ID
- `fields[].name`: Field Name
- `fields[].type`: Field Type
- `fields[].description`: Description
- `fields[].options`: Options
- `views`: Views
- `views[].id`: View ID
- `views[].name`: View Name
- `views[].type`: View Type

### `create_field`

**Create Field (Agent).** Adds a new field (column) to a table. The type must be a valid Airtable field type (e.g. singleLineText, number, singleSelect, multipleSelects, date, checkbox); select-type fields require an options object with choices. Requires a token with the schema.bases:write scope. Not idempotent — each call creates a new field. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `table_id_or_name` | string | yes |  | Table ID or Name. The table ID (e.g. "tblXXXXXXXXXXXXXX") or its exact name. Resolve it with Get Base Schema (Agent). |
| `name` | string | yes |  | Field Name. The name for the new field. |
| `type` | string | yes |  | Field Type. A valid Airtable field type, e.g. "singleLineText", "number", "singleSelect", "multipleSelects", "date", "checkbox", "multipleRecordLinks". |
| `description` | string | no |  | Description. Optional description for the field. |
| `options` | JSON | no |  | Options. Type-specific options as JSON. Required for select fields, e.g. {"choices": [{"name": "Todo"}, {"name": "Done"}]}; for number {"precision": 0}. Omit for simple text fields. |

Output fields:

- `id`: Field ID
- `name`: Field Name
- `type`: Field Type
- `description`: Description
- `options`: Options

### `update_field`

**Update Field (Agent).** Renames a field and/or changes its description. Airtable does NOT allow changing a field's type or options via the API — only name and description are editable. Supply at least one of name or description. Note this endpoint requires the table ID (not the table name). Requires a token with the schema.bases:write scope. Idempotent: setting the same values converges to the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `table_id` | string | yes |  | Table ID. The table ID (e.g. "tblXXXXXXXXXXXXXX") — this endpoint requires the ID, not the name. Resolve it with Get Base Schema (Agent). |
| `field_id` | string | yes |  | Field ID. The field ID (e.g. "fldXXXXXXXXXXXXXX") to update. Resolve it with Get Base Schema (Agent). |
| `name` | string | no |  | New Name. Optional new name for the field. |
| `description` | string | no |  | New Description. Optional new description for the field. |

Output fields:

- `id`: Field ID
- `name`: Field Name
- `type`: Field Type
- `description`: Description
- `options`: Options

### `list_record_comments`

**List Record Comments (Agent).** Returns the comments on a record, each with its comment ID, author and text — use to read a record's discussion or to find a parent comment ID for a threaded reply. Requires a token with the data.recordComments:read scope. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base ID. The Airtable base ID (e.g. "appXXXXXXXXXXXXXX"). Resolve it with List Bases (Agent). |
| `table_id_or_name` | string | yes |  | Table ID or Name. The table ID (e.g. "tblXXXXXXXXXXXXXX") or its exact name. Resolve it with Get Base Schema (Agent). |
| `record_id` | string | yes |  | Record ID. The record ID (e.g. "recXXXXXXXXXXXXXX") whose comments to list. |
| `page_size` | number | no |  | Page Size. Optional number of comments per page (max 100). |
| `offset` | string | no |  | Offset. Optional pagination offset returned by a previous call to fetch the next page. |

Output fields:

- `count`: Comment Count (number)
- `offset`: Next Page Offset
- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].createdTime`: Created Time (datetime)
- `comments[].lastUpdatedTime`: Last Updated Time (datetime)
- `comments[].text`: Comment Text
- `comments[].parentCommentId`: Parent Comment ID
- `comments[].author`: Author
- `comments[].author.id`: User ID
- `comments[].author.email`: Email (email)
- `comments[].author.name`: Name
- `comments[].mentioned`: Mentioned Users (an object whose keys vary)
- `comments[].mentioned.id`: ID
- `comments[].mentioned.type`: Type
- `comments[].mentioned.displayName`: Display Name
- `comments[].mentioned.email`: Email (email)
- `comments[].reactions`: Reactions
- `comments[].reactions[].emoji`: Emoji
- `comments[].reactions[].emoji.unicodeCharacter`: Character
- `comments[].reactions[].reactingUser`: Reacting User
- `comments[].reactions[].reactingUser.userId`: User ID
- `comments[].reactions[].reactingUser.email`: Email (email)
- `comments[].reactions[].reactingUser.name`: Name

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

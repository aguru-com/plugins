# Teable

No-code database built on PostgreSQL

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-teable'
  version: '0.3.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your Teable account using OAuth2 (Teable Cloud only).

### `CUSTOM_AUTH`: Personal Access Token

> Authenticate using a Teable Personal Access Token. Also use this option for self-hosted instances.
>
> To obtain your token:
> 1. Log in to your Teable account.
> 2. Click your profile icon (top-right corner).
> 3. Go to **Settings** > **Personal Access Token**.
> 4. Click **New Token**, set a name and the required scopes.
> 5. Copy and save the generated token.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `token` | string | yes |  | Personal Access Token. Your Teable personal access token. |
| `baseUrl` | string | no |  | Base URL. Teable Cloud: https://app.teable.ai — for self-hosted, enter your instance origin, e.g. https://teable.example.com. |

## Actions

### `teable_create_record`

**Create Record.** Adds one new row to a Teable table. Each call appends another record, so a retry makes a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. The table inside the selected base. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Fields. The fields to set on the record. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `records`: Created Records
- `records[].id`: Record ID
- `records[].fields`: Fields (an object whose keys vary)

### `teable_create_records`

**Create Records.** Adds up to 1000 new rows to a Teable table in one call. Records is a JSON array of objects keyed by field name. Each call appends all records again, so a retry makes duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. The table inside the selected base. A value the product loads from the provider, such as an id; write the value itself. |
| `records` | JSON | yes |  | Records. A JSON array of records, each an object keyed by field name. |

Output fields:

- `records`: Created Records
- `records[].id`: Record ID
- `records[].fields`: Fields (an object whose keys vary)

### `teable_list_records`

**List Records.** Lists records from a Teable table, optionally narrowed by a filter expression, a view, or a search term. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. The table inside the selected base. A value the product loads from the provider, such as an id; write the value itself. |
| `view_id` | string | no |  | View. Only return records visible in this view. A value the product loads from the provider, such as an id; write the value itself. |
| `filter` | string | no |  | Filter. A filter expression for the records. Use the visual query builder at https://app.teable.ai/developer/tool/query-builder to build one. |
| `search` | string | no |  | Search. Only return records containing this text in any field. |
| `orderBy` | string | no |  | Order By. A JSON array of sort conditions. |
| `cellFormat` | string | no | `"json"` | Cell Format. The format of the cell values in the response. One of `"json"`, `"text"`. |
| `take` | number | no | `100` | Max Records. The maximum number of records to return (1-5000). The action pages through the table automatically. |
| `skip` | number | no | `0` | Skip. The number of records to skip before collecting results. |
| `selectedRecordIds` | array | no |  | Selected Record IDs. Only return the records with these IDs. |

Output fields:

- `records`: Records
- `records[].id`: Record ID
- `records[].name`: Record Name
- `records[].fields`: Fields (an object whose keys vary)
- `records[].autoNumber`: Auto Number (number)
- `records[].createdTime`: Created Time (datetime)
- `records[].lastModifiedTime`: Last Modified Time (datetime)
- `records[].createdBy`: Created By
- `records[].lastModifiedBy`: Last Modified By
- `recordCount`: Record Count (number)
- `hasMore`: Has More (boolean)

### `teable_get_record`

**Get Record.** Fetches one record by its exact record ID and returns its current field values. For lookups by value use Search Records (Agent). Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. The table inside the selected base. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. The record to act on. Shows the first 1000 records; pass a record ID directly for larger tables. A value the product loads from the provider, such as an id; write the value itself. |
| `cellFormat` | string | no | `"json"` | Cell Format. The format of the cell values in the response. One of `"json"`, `"text"`. |

Output fields:

- `id`: Record ID
- `name`: Record Name
- `fields`: Fields (an object whose keys vary)
- `autoNumber`: Auto Number (number)
- `createdTime`: Created Time (datetime)
- `lastModifiedTime`: Last Modified Time (datetime)
- `createdBy`: Created By
- `lastModifiedBy`: Last Modified By

### `teable_update_record`

**Update Record.** Changes the given fields of one existing record; other fields keep their values, and Fields to Clear are emptied. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. The table inside the selected base. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. The record to act on. Shows the first 1000 records; pass a record ID directly for larger tables. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Fields. The fields to set on the record. An object whose fields depend on other inputs; the product shows them. |
| `fields_to_clear` | array | no |  | Fields to Clear. Fields whose value should be removed from the record. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `fields`: Fields (an object whose keys vary)

### `teable_update_records`

**Update Records.** Changes up to 1000 existing rows in one call. Records is a JSON array of {"id", "fields"} objects; a field value of null clears that field. Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. The table inside the selected base. A value the product loads from the provider, such as an id; write the value itself. |
| `records` | JSON | yes |  | Records. A JSON array of updates with record IDs; a null field value clears it. |

Output fields:

- `[].id`: Record ID
- `[].fields`: Fields (an object whose keys vary)

### `teable_delete_record`

**Delete Record.** Permanently removes one record from a Teable table by its record ID. Deleting the same ID again still succeeds and the record stays gone, so a retry is safe. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. The table inside the selected base. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. The record to act on. Shows the first 1000 records; pass a record ID directly for larger tables. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `recordId`: Record ID

### `teable_delete_records`

**Delete Records.** Permanently removes up to 1000 records from a Teable table in one call, by their record IDs. Refuses an empty ID list. Deleting the same IDs again still succeeds, so a retry is safe. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. The table inside the selected base. A value the product loads from the provider, such as an id; write the value itself. |
| `recordIds` | array | yes |  | Record IDs. The IDs of the records to delete. |

Output fields:

- `success`: Success (boolean)
- `deletedCount`: Deleted Count (number)
- `recordIds`: Record IDs

### `teable_upload_attachment`

**Upload Attachment.** Attaches a file to an attachment field of an existing record. The File input accepts a URL or binary data. Each call adds another attachment, so a retry duplicates the file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. The table inside the selected base. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. The record to act on. Shows the first 1000 records; pass a record ID directly for larger tables. A value the product loads from the provider, such as an id; write the value itself. |
| `field_id` | string | yes |  | Attachment Field. The attachment field to upload the file to. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to upload. Accepts a URL or a binary file. Files are not supported; an action that needs one fails. |

Output fields:

- `id`: Record ID
- `fields`: Fields (an object whose keys vary)

### `teable_list_bases`

**List Bases.** Returns every Teable base this connection can access, with its ID, name, space ID, and role. Call this first to find the base ID the other actions need. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `[].id`: Base ID
- `[].name`: Base Name
- `[].spaceId`: Space ID
- `[].icon`: Icon
- `[].role`: Role

### `teable_list_tables`

**List Tables.** Returns every table in a Teable base, with its ID, name, and description. Needs the base ID from List Bases. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `[].id`: Table ID
- `[].name`: Table Name
- `[].description`: Description
- `[].defaultViewId`: Default View ID
- `[].lastModifiedTime`: Last Modified Time (datetime)

### `teable_list_fields`

**List Fields.** Returns every field of a Teable table, with its ID, name, type, and select options. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. The table inside the selected base. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `[].id`: Field ID
- `[].name`: Field Name
- `[].type`: Type
- `[].description`: Description
- `[].isPrimary`: Is Primary (boolean)
- `[].isComputed`: Is Computed (boolean)
- `[].notNull`: Required (boolean)
- `[].unique`: Unique (boolean)
- `[].dbFieldName`: Database Field Name

### `teable_list_views`

**List Views.** Returns every view of a Teable table, with its ID, name, and type (grid, kanban, calendar, form, gallery). Use a view ID to scope List Records. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. The table inside the selected base. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `[].id`: View ID
- `[].name`: View Name
- `[].type`: Type

### `teable_create_table`

**Create Table.** Creates a new table in a Teable base with a default grid view and default fields, and returns the table with its field IDs. Each call creates another table, so a retry makes a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. The name of the new table. |
| `description` | string | no |  | Description. |

Output fields:

- `id`: Table ID
- `name`: Table Name
- `description`: Description
- `dbTableName`: Database Table Name
- `defaultViewId`: Default View ID
- `fields`: Fields
- `fields[].id`: Field ID
- `fields[].name`: Field Name
- `fields[].type`: Type
- `fields[].isPrimary`: Is Primary (boolean)

### `teable_create_field`

**Create Field.** Adds a new column to a Teable table with the given name and type, and optional type-specific options such as select choices. Each call adds another column; duplicate names fail. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. The table inside the selected base. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. The name of the new field. Must be unique within the table. |
| `type` | string | yes |  | Type. One of `"singleLineText"`, `"longText"`, `"user"`, `"attachment"`, `"checkbox"`, `"multipleSelect"`, `"singleSelect"`, `"date"`, `"number"`, `"rating"`, `"formula"`, `"link"`, `"createdTime"`, `"lastModifiedTime"`, `"createdBy"`, `"lastModifiedBy"`, `"autoNumber"`. |
| `description` | string | no |  | Description. |
| `options` | JSON | no |  | Options. Type-specific options as JSON. See the Teable field documentation. |

Output fields:

- `id`: Field ID
- `name`: Field Name
- `type`: Type
- `description`: Description
- `isPrimary`: Is Primary (boolean)
- `isComputed`: Is Computed (boolean)
- `notNull`: Required (boolean)
- `unique`: Unique (boolean)
- `dbFieldName`: Database Field Name

### `teable_add_comment`

**Add Comment.** Posts a plain-text comment on a Teable record, identified by its table and record ID. Each call adds another comment, so a retry duplicates it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_id` | string | yes |  | Base. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. The table inside the selected base. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. The record to act on. Shows the first 1000 records; pass a record ID directly for larger tables. A value the product loads from the provider, such as an id; write the value itself. |
| `comment` | string | yes |  | Comment. The text of the comment. |

Output fields:

- `success`: Success (boolean)
- `recordId`: Record ID
- `comment`: Comment

### `get_base_schema_ai`

**Get Base Schema (Agent).** Returns every table in a Teable base with all its fields: field ID, name, type, primary/computed flags, and select options. Call this first, before you create, update, or search records. Needs the base ID from List Bases. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseId` | string | yes |  | Base ID. The Teable base ID. Get it from List Bases. |

Output fields:

- `baseId`: Base ID
- `tableCount`: Table Count (number)
- `tables`: Tables
- `tables[].id`: Table ID
- `tables[].name`: Table Name
- `tables[].description`: Description
- `tables[].fields`: Fields
- `tables[].fields[].id`: Field ID
- `tables[].fields[].name`: Field Name
- `tables[].fields[].type`: Type
- `tables[].fields[].isPrimary`: Is Primary (boolean)
- `tables[].fields[].writable`: Writable (boolean)
- `tables[].fields[].notNull`: Required (boolean)
- `tables[].fields[].unique`: Unique (boolean)
- `tables[].fields[].options`: Select Options
- `tables[].fields[].options[].id`: Option ID
- `tables[].fields[].options[].name`: Option Name

### `create_record_ai`

**Create Record (Agent).** Adds one new record to a Teable table. Agents: use this instead of Create Record. Needs the base ID, the table name or ID, and a JSON object of values keyed by field name (case-insensitive) or field ID — see Get Base Schema (Agent). Values are typecast, so select options, links, and users accept names. Returns the new record with values keyed by field name. Each call adds a new record, so a retry makes a duplicate; use Upsert Record (Agent) to avoid that. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseId` | string | yes |  | Base ID. The Teable base ID. Get it from List Bases. |
| `table` | string | yes |  | Table (name or ID). The table name or table ID. Get both from Get Base Schema (Agent). |
| `fields` | JSON | yes |  | Fields. A JSON object keyed by field name or field ID, e.g. {"Name": "Jane", "Age": 30, "Status": "Open"}. Select fields take the option name; link and user fields take names or IDs. |

Output fields:

- `id`: Record ID
- `fields`: Fields (an object whose keys vary)

### `update_record_ai`

**Update Record (Agent).** Changes the given fields of one existing Teable record; other fields stay as they are, and a value of null clears a field. Agents: use this instead of Update Record. Needs the base ID, the table name or ID, the record ID, and a JSON object of new values keyed by field name (case-insensitive) or field ID. Returns the updated record with values keyed by field name. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseId` | string | yes |  | Base ID. The Teable base ID. Get it from List Bases. |
| `table` | string | yes |  | Table (name or ID). The table name or table ID. Get both from Get Base Schema (Agent). |
| `recordId` | string | yes |  | Record ID. The ID of the record, e.g. from Search Records (Agent). |
| `fields` | JSON | yes |  | Fields. A JSON object keyed by field name or field ID, e.g. {"Name": "Jane", "Age": 30, "Status": "Open"}. Select fields take the option name; link and user fields take names or IDs. |

Output fields:

- `id`: Record ID
- `fields`: Fields (an object whose keys vary)

### `upsert_record_ai`

**Upsert Record (Agent).** Finds the record whose key field exactly equals the key value in Fields (the Teable "is" filter on that field). If none exists it creates one; if one exists it updates it, where a null value clears that field; if several match it stops with an error and changes nothing. Use this to avoid duplicates, e.g. key on Email, but run upserts for the same key one at a time: Teable has no atomic create-if-absent, so two parallel calls with the same new key can both create a record; when the action detects that after creating, it returns a warning. Needs the base ID, the table name or ID, the key field, and Fields including the key value. Returns {action: "created" or "updated", record, warning?}. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseId` | string | yes |  | Base ID. The Teable base ID. Get it from List Bases. |
| `table` | string | yes |  | Table (name or ID). The table name or table ID. Get both from Get Base Schema (Agent). |
| `keyColumn` | string | yes |  | Key Field (name or ID). The field that identifies the record, e.g. Email. |
| `fields` | JSON | yes |  | Fields. A JSON object keyed by field name or field ID, e.g. {"Name": "Jane", "Age": 30, "Status": "Open"}. Select fields take the option name; link and user fields take names or IDs. |

Output fields:

- `action`: Action
- `record`: Record
- `record.id`: Record ID
- `record.fields`: Fields (an object whose keys vary)
- `warning`: Warning

### `search_records_ai`

**Search Records (Agent).** Finds records in a Teable table. Give a search text (matched against all fields), a JSON object of exact field values ({"Status": "Open"}), or both; with neither it lists the first records. Agents: use this instead of List Records. Needs the base ID and the table name or ID. Returns {records, recordCount, hasMore} with field values keyed by field name. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseId` | string | yes |  | Base ID. The Teable base ID. Get it from List Bases. |
| `table` | string | yes |  | Table (name or ID). The table name or table ID. Get both from Get Base Schema (Agent). |
| `search` | string | no |  | Search Text. Only return records containing this text in any field. |
| `filters` | JSON | no |  | Field Filters. Exact matches keyed by field name or ID; all conditions must match. |
| `limit` | number | no | `50` | Limit. The maximum number of records to return (1-1000). |

Output fields:

- `records`: Records
- `records[].id`: Record ID
- `records[].name`: Record Name
- `records[].fields`: Fields (an object whose keys vary)
- `records[].autoNumber`: Auto Number (number)
- `records[].createdTime`: Created Time (datetime)
- `records[].lastModifiedTime`: Last Modified Time (datetime)
- `records[].createdBy`: Created By
- `records[].lastModifiedBy`: Last Modified By
- `recordCount`: Record Count (number)
- `hasMore`: Has More (boolean)

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

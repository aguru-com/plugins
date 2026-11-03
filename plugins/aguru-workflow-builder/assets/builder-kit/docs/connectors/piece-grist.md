# Grist

open source spreadsheet

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-grist'
  version: '0.3.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Log in to your Grist account. Navigate to the account menu at the top right, and select **Profile Settings** to manage or create your API Key.
> In the **Domain URL** field, enter the domain URL of your Grist instance.For example,if you have team site it will be "https://team.getgist.com".

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. |
| `domain` | string | yes | `"https://docs.getgrist.com"` | Domain URL. |

## Actions

### `grist-create-record`

**Create Record.** Adds one new row to a Grist table, mapping the values you supply onto that table's columns. Use it to append data to a known document/table; requires the document and table identifiers. Not idempotent — each call inserts another record even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `document_id` | string | yes |  | Document. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `table_columns` | object | yes |  | Table Columns. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Row ID (number)
- `fields`: Fields (an object whose keys vary)

### `grist-search-record`

**Search Record.** Looks up records in a Grist table by filtering one chosen column against a value. Use it to find rows before reading or updating them; the match is case-sensitive, exact, and only works on Text-type columns. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `document_id` | string | yes |  | Document. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `column` | string | yes |  | Column. A value the product loads from the provider, such as an id; write the value itself. |
| `value` | string | yes |  | Value. Enter the search text. The search operation is case sensitive, exact text match, and supports column-type Text only. |

Output fields:

- `records`: Records
- `records[].id`: Row ID (number)
- `records[].fields`: Fields (an object whose keys vary)

### `grist-update-record`

**Update Record.** Updates the fields of an existing Grist record identified by its numeric Record ID in a given document/table. Use it to modify a row you already know the ID of (typically from a search or trigger). Idempotent — re-running with the same ID and values leaves the record in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `document_id` | string | yes |  | Document. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | number | yes |  | Record ID. |
| `table_columns` | object | yes |  | Table Columns. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Row ID (number)
- `fields`: Updated Fields (an object whose keys vary)

### `grist-upload-attachments-to-document`

**Upload Attachment to Document.** Uploads a file as an attachment to a specific Grist document and returns its attachment metadata. Use it to store a file in Grist before referencing it from an attachment-type column; requires the document identifier and a file. Not idempotent — each call uploads a new attachment with a fresh ID. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `document_id` | string | yes |  | Document. A value the product loads from the provider, such as an id; write the value itself. |
| `attachment` | file | yes |  | Attachment. Files are not supported; an action that needs one fails. |
| `attachment_name` | string | no |  | Attachment Name. In case you want to change the name of the attachment. |

Output fields:

- `id`: ID (number)
- `fields`: Fields
- `fields.fileName`: File Name
- `fields.fileSize`: File Size (filesize)
- `fields.timeUploaded`: Time Uploaded (datetime)

### `grist_add_records`

**Add Records.** Appends rows to a Grist table in one call. Each item maps column IDs to values (use **List Columns** for the column IDs; reference-list and choice-list cells take `["L", ...]`). Returns the new row IDs. Not idempotent: every call inserts new rows. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `tableId` | string | yes |  | Table ID. The table ID, as returned by the **List Tables** action (for example `Table1`). |
| `records` | JSON | yes |  | Records. A JSON array of objects, one per row, mapping column ID to value. Example: `[{"Name": "Ada", "Age": 36}]`. |

Output fields:

- `record_ids`: Record IDs
- `count`: Count (number)

### `grist_update_records`

**Update Records.** Partially updates existing rows by row ID: only the columns you list change, other cells keep their values. Row IDs come from **List Records** or **Add Records**. Setting the same values again is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `tableId` | string | yes |  | Table ID. The table ID, as returned by the **List Tables** action (for example `Table1`). |
| `records` | JSON | yes |  | Records. A JSON array of `{"id": <rowId>, "fields": {"<columnId>": <value>}}` objects. |

Output fields:

- `success`: Success (boolean)
- `updated_count`: Updated Count (number)

### `grist_list_records`

**List Records.** Reads rows from a Grist table with optional exact-match filters, sort and limit (default 100 rows; Grist has no paging, so narrow with a filter or sort to reach other rows). Use it to find row IDs before updating or deleting. Filter values are matched exactly against the listed values for each column. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `tableId` | string | yes |  | Table ID. The table ID, as returned by the **List Tables** action (for example `Table1`). |
| `filter` | JSON | no |  | Filter. Optional JSON object mapping column ID to the list of accepted values. Example: `{"Status": ["Open", "Pending"]}`. |
| `sort` | string | no |  | Sort. Optional comma-separated column IDs; prefix with `-` for descending, e.g. `-Age,Name`. |
| `limit` | number | no | `100` | Limit. Maximum number of rows to return. Defaults to 100. |

Output fields:

- `records`: Records
- `records[].id`: Row ID (number)
- `records[].fields`: Fields (an object whose keys vary)
- `count`: Count (number)

### `grist_delete_records`

**Delete Records.** Permanently deletes rows by row ID (get IDs from **List Records**). Rows that no longer exist are ignored by Grist, so repeating the call is harmless. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `tableId` | string | yes |  | Table ID. The table ID, as returned by the **List Tables** action (for example `Table1`). |
| `rowIds` | array | yes |  | Row IDs. The numeric IDs of the rows to delete. |

Output fields:

- `success`: Success (boolean)
- `deleted_count`: Deleted Count (number)

### `grist_create_document`

**Create Document.** Creates a new empty Grist document in a workspace and returns its document ID. The workspace ID comes from **List Workspaces**. Not idempotent: each call creates another document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | number | yes |  | Workspace ID. Numeric workspace ID from the **List Workspaces** action. |
| `name` | string | no |  | Name. Name of the new document. |
| `isPinned` | boolean | no | `false` | Pin Document. |

Output fields:

- `id`: ID

### `grist_get_document`

**Get Document.** Returns a Grist document's name, access level, pinned state and workspace. Use it to confirm a document ID before working on its tables. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |

Output fields:

- `id`: ID
- `name`: Name
- `access`: Access
- `isPinned`: Is Pinned (boolean)
- `urlId`: URL ID
- `type`: Type
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `workspace`: Workspace
- `workspace.id`: ID (number)
- `workspace.name`: Name
- `workspace.access`: Access
- `workspace.org`: Organization
- `workspace.org.id`: ID (number)
- `workspace.org.name`: Name
- `workspace.org.domain`: Domain

### `grist_update_document`

**Update Document.** Changes a document's name and/or pinned state; omitted fields are left unchanged. Does not touch document contents. Setting the same values again is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `name` | string | no |  | Name. New document name. Leave empty to keep the current name. |
| `isPinned` | string | no |  | Pinned. Leave unset to keep the current pinned state. One of `"true"`, `"false"`. |

Output fields:

- `success`: Success (boolean)

### `grist_list_tables`

**List Tables.** Returns the table IDs of a Grist document (optionally with their columns). Use it to get the table ID that record, column and SQL actions need. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `includeColumns` | boolean | no | `false` | Include Columns. Also return each table's columns. |

Output fields:

- `tables`: Tables
- `tables[].id`: Table ID
- `tables[].fields`: Fields
- `tables[].fields.onDemand`: On Demand (boolean)
- `tables[].columns`: Columns
- `tables[].columns[].id`: Column ID
- `tables[].columns[].fields`: Fields
- `tables[].columns[].fields.label`: Label
- `tables[].columns[].fields.type`: Type
- `count`: Count (number)

### `grist_create_table`

**Create Table.** Adds a new table with the given columns to a Grist document and returns its table ID. Not idempotent: Grist renames the table if the ID already exists, so repeating the call creates another table. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `tableId` | string | no |  | Table ID. Desired table ID (must start with a letter). Grist may adjust it; leave empty to let Grist choose. |
| `columns` | JSON | yes |  | Columns. A JSON array of column definitions, e.g. `[{"id": "Name", "fields": {"type": "Text", "label": "Name"}}]`. |

Output fields:

- `tables`: Tables
- `tables[].id`: ID

### `grist_update_table`

**Update Table.** Updates table-level settings (for example renaming via `{"tableId": "NewName"}` or `{"onDemand": true}`). Only the fields supplied change. Setting the same values again is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `tableId` | string | yes |  | Table ID. The table ID, as returned by the **List Tables** action (for example `Table1`). |
| `fields` | JSON | yes |  | Fields. A JSON object of table fields to change. |

Output fields:

- `success`: Success (boolean)

### `grist_list_columns`

**List Columns.** Returns each column's ID, type, label and formula flag for a table. Use it to learn the column IDs and types needed by record actions. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `tableId` | string | yes |  | Table ID. The table ID, as returned by the **List Tables** action (for example `Table1`). |
| `includeHidden` | boolean | no | `false` | Include Hidden Columns. |

Output fields:

- `columns`: Columns
- `columns[].id`: Column ID
- `columns[].fields`: Fields
- `columns[].fields.label`: Label
- `columns[].fields.type`: Type
- `columns[].fields.isFormula`: Is Formula (boolean)
- `columns[].fields.formula`: Formula
- `columns[].fields.widgetOptions`: Widget Options
- `columns[].fields.description`: Description
- `count`: Count (number)

### `grist_add_columns`

**Add Columns.** Adds one or more columns to an existing table and returns their IDs. Not idempotent: repeating the call adds further columns (Grist renames duplicates). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `tableId` | string | yes |  | Table ID. The table ID, as returned by the **List Tables** action (for example `Table1`). |
| `columns` | JSON | yes |  | Columns. A JSON array like `[{"id": "Age", "fields": {"type": "Int", "label": "Age"}}]`. |

Output fields:

- `columns`: Columns
- `columns[].id`: ID

### `grist_update_columns`

**Update Columns.** Updates column settings (label, type, formula, widget options) by column ID; only the supplied fields change. Changing a label also renames the column ID unless `untieColIdFromLabel` is true, so re-list columns before using the ID again. Not safe to repeat after a rename: the old column ID no longer exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `tableId` | string | yes |  | Table ID. The table ID, as returned by the **List Tables** action (for example `Table1`). |
| `columns` | JSON | yes |  | Columns. A JSON array like `[{"id": "Age", "fields": {"label": "Years"}}]`. |

Output fields:

- `success`: Success (boolean)
- `updated_count`: Updated Count (number)

### `grist_delete_column`

**Delete Column.** Permanently removes a column and all its cell values. Get column IDs from **List Columns**. Deleting a column that is already gone fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `tableId` | string | yes |  | Table ID. The table ID, as returned by the **List Tables** action (for example `Table1`). |
| `columnId` | string | yes |  | Column ID. The column ID from **List Columns**. |

Output fields:

- `success`: Success (boolean)

### `grist_list_attachments`

**List Attachments.** Returns metadata (ID, file name, size, upload time) of the attachments in a document. Use it to get the attachment ID for **Download Attachment**. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `sort` | string | no |  | Sort. Optional comma-separated fields, prefix `-` for descending. |
| `limit` | number | no |  | Limit. |

Output fields:

- `attachments`: Attachments
- `attachments[].id`: ID (number)
- `attachments[].fields`: Fields
- `attachments[].fields.fileName`: File Name
- `attachments[].fields.fileSize`: File Size (filesize)
- `attachments[].fields.timeUploaded`: Time Uploaded (datetime)
- `count`: Count (number)

### `grist_download_attachment`

**Download Attachment.** Downloads the contents of one attachment by ID and returns a file reference plus its name. Get the ID from **List Attachments** or a record's Attachments cell. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `attachmentId` | number | yes |  | Attachment ID. |

Output fields:

- `file`: File (url)
- `file_name`: File Name
- `size`: Size (filesize)

### `grist_download_attachments_archive`

**Download Attachments Archive.** Downloads every attachment in a document as a single zip or tar file. Can be large; prefer **Download Attachment** when you need one file. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `format` | string | no | `"zip"` | Format. One of `"zip"`, `"tar"`. |

Output fields:

- `file`: File (url)
- `file_name`: File Name
- `size`: Size (filesize)

### `grist_upload_attachment`

**Upload Attachment.** Uploads a file into a Grist document and returns its attachment ID and metadata. To show it in a table, set an Attachments column cell to `["L", <attachmentId>]` with **Update Records**. Not idempotent: each call stores a new attachment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `attachment` | file | yes |  | Attachment. Files are not supported; an action that needs one fails. |
| `attachmentName` | string | no |  | Attachment Name. Overrides the file name. |

Output fields:

- `id`: ID (number)
- `fields`: Fields
- `fields.fileName`: File Name
- `fields.fileSize`: File Size (filesize)
- `fields.timeUploaded`: Time Uploaded (datetime)

### `grist_remove_unused_attachments`

**Remove Unused Attachments.** Permanently deletes ALL attachments in a document that no Attachments cell references (it cannot target one attachment). To delete a specific file, first clear its cell with **Update Records**, then run this. Repeating it is harmless. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `expiredOnly` | boolean | no | `false` | Expired Only. Only remove attachments unreferenced for longer than the server retention period. |

Output fields:

- `success`: Success (boolean)

### `grist_run_sql_query`

**Run SQL Query.** Runs a SQLite SELECT statement against a Grist document (table IDs are SQL table names) and returns rows shaped as `{fields: {...}}`. Use `?` placeholders with Arguments. Read-only; use it for joins and aggregates that **List Records** cannot do. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The Grist document ID (a string like `kRosSWLjYzm7iaHwV6XnXM`). Get it from the **List Workspaces** action. |
| `sql` | string | yes |  | SQL. A single SELECT statement. |
| `args` | array | no |  | Arguments. Values for the `?` placeholders, in order. |
| `timeout` | number | no |  | Timeout (ms). |

Output fields:

- `rows`: Rows
- `rows[].fields`: Fields (an object whose keys vary)
- `count`: Count (number)

### `grist_list_organizations`

**List Organizations.** Returns the Grist orgs (team sites and personal areas) the API key can access, with their IDs and your access level. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `organizations`: Organizations
- `organizations[].id`: ID (number)
- `organizations[].name`: Name
- `organizations[].domain`: Domain
- `organizations[].access`: Access
- `organizations[].createdAt`: Created At (datetime)
- `organizations[].updatedAt`: Updated At (datetime)
- `count`: Count (number)

### `grist_get_org_access`

**Get Org Access.** Returns the users of an organization with their emails and access roles (owner, editor, viewer). Use it to look up user IDs or check permissions. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orgId` | string | no | `"current"` | Organization ID. Numeric org ID or subdomain from **List Organizations**. Use `current` for the site in the connection domain. |

Output fields:

- `users`: Users
- `users[].id`: ID (number)
- `users[].email`: Email (email)
- `users[].name`: Name
- `users[].picture`: Picture (url)
- `users[].ref`: Ref
- `users[].access`: Access
- `users[].isMember`: Is Member (boolean)

### `grist_list_workspaces`

**List Workspaces.** Returns every workspace in an org together with the documents each contains. This is where workspace IDs (for **Create Document**) and document IDs (for every other action) come from. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orgId` | string | no | `"current"` | Organization ID. Numeric org ID or subdomain from **List Organizations**. Use `current` for the site in the connection domain. |

Output fields:

- `workspaces`: Workspaces
- `workspaces[].id`: ID (number)
- `workspaces[].name`: Name
- `workspaces[].access`: Access
- `workspaces[].orgDomain`: Org Domain
- `workspaces[].docs`: Documents
- `count`: Count (number)

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

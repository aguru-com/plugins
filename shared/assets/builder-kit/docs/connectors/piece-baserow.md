# Baserow

Open-source online database tool, alternative to Airtable

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-baserow'
  version: '0.11.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Authentication

> Connect to Baserow using either a Database Token (recommended) or your Email & Password. Fill in only the fields for your chosen method — leave the other section blank.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `authType` | string | yes | `"database_token"` | Authentication Method. Choose **Database Token** (recommended) for scoped, per-table access compatible with 2FA. Choose **Email & Password** only if you need automatic webhook registration on triggers — 2FA accounts are not supported. One of `"database_token"`, `"jwt"`. |
| `apiUrl` | string | yes | `"https://api.baserow.io"` | API URL. Your Baserow instance URL. Leave the default for Baserow Cloud. |
| `md_token` | markdown | no |  | Markdown. --- #### 🔑 Database Token Go to **Settings → Database tokens** in Baserow, create a token, copy it, and paste it below. Leave Email and Password blank. |
| `token` | string | no |  | Database Token. Your Baserow database token. Leave blank when using Email & Password. |
| `md_jwt` | markdown | no |  | Markdown. --- #### 👤 Email & Password (JWT) Enter your Baserow login credentials below. Leave Database Token blank. Accounts with 2FA enabled are not supported. |
| `email` | string | no |  | Email. Your Baserow account email. Leave blank when using Database Token. |
| `password` | string | no |  | Password. Your Baserow account password. Leave blank when using Database Token. |

## Actions

### `baserow_create_row`

**Create Row.** Creates one new row in a chosen Baserow table, setting field values by field name. Use to add a single record; for many rows at once use Batch Create Rows, and to avoid duplicates by a key field use Upsert Row. Not idempotent — each call inserts another row. Optionally auto-creates missing single/multi-select options referenced in the payload. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `table_fields` | object | yes |  | Table Fields. An object whose fields depend on other inputs; the product shows them. |
| `create_missing_select_options` | boolean | no | `false` | Create missing select options. When enabled, single/multi-select values that do not yet exist in the field will be added before creating the row. Existing options are preserved. |

Output fields:

- `id`: Row ID (number)
- `order`: Order

### `baserow_get_row`

**Get Row.** Fetches one row from a Baserow table by its numeric row ID. Use when you already know the exact row ID and want its full current field values; to locate a row by a field value instead, use Find Row. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `row_id` | string | yes |  | Row. Select the row. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Row ID (number)
- `order`: Order

### `baserow_list_rows`

**List Rows.** Retrieves a page of rows from a Baserow table. With no search/filters it returns all rows (paginated); supply a free-text search, an order-by field, or structured field filters (each a JSON object with field ID, operator, and value, combined with AND/OR) to narrow results. Use to browse or query many rows; for a single row by ID use Get Row, or by one field value use Find Row. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `page` | number | no | `1` | Page. Page number to return. Defaults to 1. |
| `limit` | number | no | `100` | Page Size. Number of rows to return per page. Maximum 200. Defaults to 100. |
| `search` | string | no |  | Search. Return only rows whose cell data matches this search term. |
| `order_by` | string | no |  | Order By. Field name to sort by. Prefix with **-** for descending or **+** for ascending. Example: `-Name` sorts by Name Z→A. |
| `filter_type` | string | no | `"AND"` | Filter Combination. How to combine multiple filters. **AND** requires all filters to match; **OR** requires any one filter to match. One of `"AND"`, `"OR"`. |
| `filters` | array | no |  | Filters. Each entry is a JSON object with "field" (numeric ID), "type" (operator), and "value". Leave empty to return all rows. |

Output fields:

- `count`: Count (number)
- `rows`: Rows
- `rows[].id`: Row ID (number)
- `rows[].order`: Order
- `rows[]`: Row Fields (an object whose keys vary)

### `baserow_find_row`

**Find Row.** Looks up the first row in a Baserow table whose chosen field exactly equals a given value. Use to resolve a row from a known field value (e.g. an email or external key) when you do not have its row ID; for ID lookups use Get Row, and for multi-condition or partial-text queries use List Rows. The match field must be a filterable type (link, multi-select, file, formula/lookup, and date-type fields are excluded). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `field_name` | string | yes |  | Field. Select the field to search by. A value the product loads from the provider, such as an id; write the value itself. |
| `field_value` | string | yes |  | Field Value. The value to search for (exact match). |

Output fields:

- `found`: Found (boolean)
- `count`: Match Count (number)
- `id`: Row ID (number)
- `order`: Order

### `baserow_update_row`

**Update Row.** Updates field values on one existing Baserow row identified by its numeric row ID. Only the fields you supply are changed and empty values are skipped, so it cannot clear a field — use Clean Row for that. Requires a known row ID (resolve one first with Find Row or List Rows if needed). Optionally auto-creates missing single/multi-select options. Idempotent: applying the same values to the same row leaves it in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `row_id` | string | yes |  | Row. Select the row. A value the product loads from the provider, such as an id; write the value itself. |
| `table_fields` | object | yes |  | Table Fields. An object whose fields depend on other inputs; the product shows them. |
| `create_missing_select_options` | boolean | no | `false` | Create missing select options. When enabled, single/multi-select values that do not yet exist in the field will be added before updating the row. Existing options are preserved. |

Output fields:

- `id`: Row ID (number)
- `order`: Order

### `baserow_upsert_row`

**Upsert Row.** Inserts or updates a single Baserow row keyed on a match field value: if a row whose match field exactly equals the given value exists it is updated, otherwise a new row is created with that value. Use to sync records idempotently without creating duplicates. The match field must be a writable, filterable type (read-only, link, select, file, date, and auto-number fields are excluded). Idempotent on the match key — repeating the same call converges the row to the same state rather than adding rows. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `match_field` | string | yes |  | Match Field. Select the field to search for an existing row. A value the product loads from the provider, such as an id; write the value itself. |
| `match_value` | string | yes |  | Match Value. The value to search for (exact match). If a row with this value is found it will be updated; otherwise a new row is created. |
| `table_fields` | object | yes |  | Table Fields. An object whose fields depend on other inputs; the product shows them. |
| `create_missing_select_options` | boolean | no | `false` | Create missing select options. When enabled, single/multi-select values that do not yet exist in the field will be added before creating or updating the row. Existing options are preserved. |

Output fields:

- `action`: Action Taken
- `row`: Row
- `row.id`: Row ID (number)
- `row.order`: Order
- `row`: Row Fields (an object whose keys vary)

### `baserow_delete_row`

**Delete Row.** Permanently deletes one row from a Baserow table by its numeric row ID. Use to remove a single known record; for multiple rows use Batch Delete Rows. Destructive — confirm the row ID first (resolve via Find Row or List Rows if unknown). Not idempotent against changing data: once the row is gone a repeat call targets a no-longer-existing ID. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `row_id` | string | yes |  | Row. Select the row. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)

### `baserow_clean_row`

**Clean Row.** Clears the supplied fields on one existing Baserow row (identified by row ID) to empty/null, including blank values that Update Row would skip. Use specifically to wipe field contents rather than set new values; to change only some fields to new values use Update Row. Idempotent: re-clearing the same row leaves it in the same empty state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `row_id` | string | yes |  | Row. Select the row. A value the product loads from the provider, such as an id; write the value itself. |
| `table_fields` | object | yes |  | Table Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Row ID (number)
- `order`: Order

### `baserow_batch_create_rows`

**Batch Create Rows.** Creates many new rows in a Baserow table in one request from a JSON array of row objects (field names as keys), up to 200 rows per call. Use for bulk inserts instead of repeated Create Row calls. Not idempotent — each call appends another set of rows, so it can produce duplicates if re-run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `rows` | JSON | yes | `[{"Name":"Row 1"},{"Name":"Row 2"}]` | Rows. A JSON array of objects. Each object represents a row with field names as keys. |

Output fields:

- `count`: Count (number)
- `rows`: Rows
- `rows[].id`: Row ID (number)
- `rows[].order`: Order
- `rows[]`: Row Fields (an object whose keys vary)

### `baserow_batch_update_rows`

**Batch Update Rows.** Updates many existing Baserow rows in one request from a JSON array, up to 200 rows per call. Every object must carry an "id" identifying the row plus the fields to change. Use for bulk edits to known rows instead of repeated Update Row calls. Idempotent: re-sending the same id/field values converges those rows to the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `rows` | JSON | yes | `[{"id":1,"Name":"Updated Row 1"}]` | Rows. A JSON array of objects. Each object must include an "id" field and the fields to update. |

Output fields:

- `count`: Count (number)
- `rows`: Rows
- `rows[].id`: Row ID (number)
- `rows[].order`: Order
- `rows[]`: Row Fields (an object whose keys vary)

### `baserow_batch_delete_rows`

**Batch Delete Rows.** Permanently deletes many Baserow rows in one request from a list of numeric row IDs, up to 200 per call. Use for bulk removal of known rows; for a single row use Delete Row. Destructive — verify the IDs first (List Rows or Find Row can supply them). Not idempotent against changing data once the rows are removed. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `row_ids` | array | yes |  | Row IDs. Numeric IDs of the rows to delete. You can get row IDs from the List Rows or Find Row actions. |

Output fields:

- `deleted_count`: Deleted Count (number)

### `baserow_aggregate_field`

**Aggregate Field.** Computes a single aggregate value (sum, average, min, max, median, std dev, variance, or empty/non-empty/unique counts) over one field across all rows of a Baserow grid view. Use for roll-up metrics over a whole view rather than fetching rows yourself; numeric aggregations require a number field. Requires a grid view ID and a field ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `view_id` | string | yes |  | View. Select the grid view to aggregate. A value the product loads from the provider, such as an id; write the value itself. |
| `field_id` | string | yes |  | Field. Select the field to aggregate. A value the product loads from the provider, such as an id; write the value itself. |
| `aggregation_type` | string | yes |  | Aggregation Type. The calculation to run over the field. **Sum, Average, Min, Max, Median, Std Dev, and Variance** only work with number fields. One of `"sum"`, `"average"`, `"min"`, `"max"`, `"not_empty_count"`, `"empty_count"`, `"unique_count"`, `"median"`, `"std_dev"`, `"variance"`. |

Output fields:

- `result`: Result

### `baserow_upload_file`

**Upload File.** Downloads a file from a public URL and uploads it into Baserow user files, producing a file reference you can then assign to a file field via Create/Update Row. Use as the first step before attaching files to rows. Not idempotent — each call uploads a new file copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | File URL. The public URL of the file to upload to Baserow. |

Output fields:

- `name`: File Name
- `original_name`: Original Name
- `url`: URL (url)
- `size`: Size (filesize)
- `mime_type`: MIME Type
- `is_image`: Is Image (boolean)
- `image_width`: Image Width (number)
- `image_height`: Image Height (number)
- `uploaded_at`: Uploaded At (datetime)
- `thumbnails`: Thumbnails (an object whose keys vary)

### `baserow_create_row_ai`

**Create Row.** Creates one new row in a Baserow table from a JSON object of field name to value. Call Get Table Fields first to learn field names and types; for many rows use Batch Create Rows, and to avoid duplicates by a key field use Upsert Row. Not idempotent — each call inserts another row. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `fields` | JSON | yes |  | Fields. JSON object mapping field names to values, e.g. {"Name": "Acme", "Status": "Active"}. Single select takes the option name or ID; multiple select, link-to-table and collaborator fields take arrays (link rows accept row IDs or primary field values; collaborators take [{"id": 1}]). File fields take [{… |
| `create_missing_select_options` | boolean | no | `false` | Create Missing Select Options. Adds single/multiple select values that do not exist yet as new options before writing. Requires an Email & Password connection. |

Output fields:

- `id`: Row ID (number)
- `order`: Order

### `baserow_get_row_ai`

**Get Row.** Fetches one row and all its field values (keyed by field name) from a Baserow table by numeric row ID. Use when the row ID is known; to locate a row by a field value use Find Row. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `row_id` | number | yes |  | Row ID. The numeric row ID. Resolve it with Find Row or List Rows. |

Output fields:

- `id`: Row ID (number)
- `order`: Order

### `baserow_list_rows_ai`

**List Rows.** Returns one page of rows from a Baserow table, optionally narrowed by free-text search, structured filters (AND/OR over field names), a view, and a field selection. Use to browse or query many rows; for one row by ID use Get Row, or for an exact single-field match use Find Row. Page size is at most 200 — follow `next` by incrementing Page. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `search` | string | no |  | Search. Only return rows with cell data matching this text. |
| `filters` | JSON | no |  | Filters. Optional filter tree: {"filter_type": "AND" \| "OR", "filters": [{"field": "<field name or ID>", "type": "<operator>", "value": "<value>"}], "groups": [<nested tree>]}. Operators include equal, not_equal, contains, contains_not, higher_than, lower_than, date_is, empty, not_empty, boolean, link_row_h… |
| `order_by` | string | no |  | Order By. Comma-separated field names; prefix a name with "-" for descending, e.g. "-Created,Name". |
| `include` | array | no |  | Include Fields. Only return these field names. Leave empty for all fields. |
| `exclude` | array | no |  | Exclude Fields. Field names to leave out of the response. |
| `view_id` | number | no |  | View ID. Apply the filters and sorts saved on this view. Resolve with List Views. |
| `page` | number | no | `1` | Page. Page number, starting at 1. |
| `size` | number | no | `100` | Page Size. Rows per page, 1–200. Defaults to 100. |

Output fields:

- `count`: Total Matching Rows (number)
- `has_more`: Has More Pages (boolean)
- `rows`: Rows
- `rows[].id`: Row ID (number)
- `rows[].order`: Order
- `rows[]`: Row Fields (an object whose keys vary)

### `baserow_find_row_ai`

**Find Row.** Returns the first row in a Baserow table whose named field exactly equals a value, plus the total match count. Use to resolve a row ID from a known key such as an email or external ID; for partial-text or multi-condition queries use List Rows. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `field_name` | string | yes |  | Field Name. Exact name of the field to match on. Resolve with Get Table Fields. |
| `value` | string | yes |  | Value. The value the field must equal. |

Output fields:

- `found`: Found (boolean)
- `count`: Match Count (number)
- `row`: Row
- `row.id`: Row ID (number)
- `row.order`: Order
- `row`: Row Fields (an object whose keys vary)

### `baserow_update_row_ai`

**Update Row.** Updates an existing Baserow row by ID, writing only the fields present in the JSON object and leaving all others unchanged. Pass null (or [] for select, link and file fields) to clear a cell. To update many rows use Batch Update Rows; to create-or-update by a key use Upsert Row. Idempotent — repeating the same values converges on the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `row_id` | number | yes |  | Row ID. The numeric row ID. Resolve it with Find Row or List Rows. |
| `fields` | JSON | yes |  | Fields. JSON object of field name to new value, e.g. {"Status": "Done"}. Only these fields are written. Use null to clear a value. Formats match Create Row. |
| `create_missing_select_options` | boolean | no | `false` | Create Missing Select Options. Adds single/multiple select values that do not exist yet as new options before writing. Requires an Email & Password connection. |

Output fields:

- `id`: Row ID (number)
- `order`: Order

### `baserow_upsert_row_ai`

**Upsert Row.** Looks up the first row whose match field equals the match value; updates it with the given fields if found, otherwise creates a new row with those fields plus the match value (the match value always wins over the same field in Fields). Use to sync records by a unique key (email, external ID) without duplicates. Idempotent only when the match value is unique in the table — the lookup and write are separate calls, so concurrent calls can still create two rows. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `match_field` | string | yes |  | Match Field Name. Exact name of the key field to match on. Must be a writable text, long text, number, rating, boolean, email, URL, phone number or single select field. |
| `match_value` | string | yes |  | Match Value. The key value to look for. For a single select field, pass the option name, or its option ID when no option has that name. |
| `fields` | JSON | yes |  | Fields. JSON object of field name to value to write on the matched or new row. Formats match Create Row. The match field is not changed on an existing row. |
| `create_missing_select_options` | boolean | no | `false` | Create Missing Select Options. Adds single/multiple select values that do not exist yet as new options before writing. Requires an Email & Password connection. |

Output fields:

- `action`: Action Taken
- `row`: Row
- `row.id`: Row ID (number)
- `row.order`: Order
- `row`: Row Fields (an object whose keys vary)

### `baserow_delete_row_ai`

**Delete Row.** Deletes one row from a Baserow table by numeric row ID; the row moves to the Baserow trash and can be restored there. For many rows use Batch Delete Rows. Confirm the ID first with Find Row or Get Row. Not idempotent — a repeat call fails because the row is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `row_id` | number | yes |  | Row ID. The numeric row ID. Resolve it with Find Row or List Rows. |

Output fields:

- `deleted`: Deleted (boolean)
- `table_id`: Table ID (number)
- `row_id`: Row ID (number)

### `baserow_batch_create_rows_ai`

**Batch Create Rows.** Creates up to 200 new rows in a Baserow table in a single request from a JSON array of field-name-to-value objects. Use for bulk inserts instead of repeated Create Row calls; split larger sets into chunks of 200. Not idempotent — re-running appends the rows again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `rows` | JSON | yes |  | Rows. JSON array of row objects keyed by field name, e.g. [{"Name": "A"}, {"Name": "B"}]. Maximum 200. Value formats match Create Row. |

Output fields:

- `count`: Count (number)
- `rows`: Rows
- `rows[].id`: Row ID (number)
- `rows[].order`: Order
- `rows[]`: Row Fields (an object whose keys vary)

### `baserow_batch_update_rows_ai`

**Batch Update Rows.** Updates up to 200 existing Baserow rows in one request; each object needs the row "id" plus only the fields to change, and omitted fields are left as they are. Use for bulk edits instead of repeated Update Row calls. Idempotent — repeating the same values converges on the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `rows` | JSON | yes |  | Rows. JSON array of objects, each with the numeric row "id" and the field names to change, e.g. [{"id": 1, "Status": "Done"}]. Maximum 200. |

Output fields:

- `count`: Count (number)
- `rows`: Rows
- `rows[].id`: Row ID (number)
- `rows[].order`: Order
- `rows[]`: Row Fields (an object whose keys vary)

### `baserow_batch_delete_rows_ai`

**Batch Delete Rows.** Deletes up to 200 rows from a Baserow table by row ID in one request; the rows move to the Baserow trash and can be restored there. Use instead of repeated Delete Row calls. Does not fire row-deleted webhooks. Not idempotent — a repeat call fails for IDs that are already gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `row_ids` | array | yes |  | Row IDs. Numeric IDs of the rows to delete. Maximum 200. |

Output fields:

- `deleted`: Deleted (boolean)
- `count`: Deleted Count (number)
- `row_ids`: Deleted Row IDs

### `baserow_aggregate_field_ai`

**Aggregate Field.** Computes one aggregate (sum, average, min, max, median, std dev, variance, decile, distribution, or empty/non-empty/unique counts) over a field across all rows visible in a Baserow grid view. Use for totals and metrics instead of paging through rows. Numeric aggregations need a number field. Requires an Email & Password connection. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `view_id` | number | yes |  | Grid View ID. ID of a grid view on the table. Resolve with List Views. |
| `field_id` | number | yes |  | Field ID. The numeric field ID. Resolve it with Get Table Fields. |
| `aggregation_type` | string | yes |  | Aggregation Type. The calculation to run. One of `"sum"`, `"average"`, `"min"`, `"max"`, `"median"`, `"std_dev"`, `"variance"`, `"decile"`, `"distribution"`, `"count"`, `"empty_count"`, `"not_empty_count"`, `"unique_count"`. |

Output fields:

- `aggregation_type`: Aggregation Type
- `value`: Value

### `baserow_list_workspaces`

**List Workspaces.** Lists the Baserow workspaces the connected user belongs to, with ID, name and the user's permission level. Use to get the Workspace ID for Create Database, List Workspace Users or Search Workspace. Requires an Email & Password connection. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `count`: Count (number)
- `workspaces`: Workspaces
- `workspaces[].id`: Workspace ID (number)
- `workspaces[].name`: Workspace Name
- `workspaces[].permissions`: Permission Level

### `baserow_list_databases`

**List Databases.** Lists every Baserow database the connected user can access across workspaces, with its ID, name, workspace and tables. Use to get the Database ID for Create Table; to just find a table use List Tables. Requires an Email & Password connection. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `count`: Count (number)
- `databases`: Databases
- `databases[].id`: Database ID (number)
- `databases[].name`: Database Name
- `databases[].workspace_id`: Workspace ID (number)
- `databases[].workspace_name`: Workspace Name
- `databases[].tables`: Tables
- `databases[].tables[].id`: Table ID (number)
- `databases[].tables[].name`: Table Name

### `baserow_list_tables`

**List Tables.** Lists every Baserow table the connection can reach, with its ID, name and database ID. Call this first to get the Table ID every row action needs. Works with Database Token and Email & Password connections. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `count`: Count (number)
- `tables`: Tables
- `tables[].id`: Table ID (number)
- `tables[].name`: Table Name
- `tables[].database_id`: Database ID (number)

### `baserow_get_table`

**Get Table.** Returns a Baserow table's ID, name, order and database ID. Use to confirm a table ID or its parent database; to discover tables use List Tables and for its columns use Get Table Fields. Requires an Email & Password connection. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |

Output fields:

- `id`: Table ID (number)
- `name`: Table Name
- `order`: Order (number)
- `database_id`: Database ID (number)

### `baserow_get_table_fields`

**Get Table Fields.** Returns every field of a Baserow table with its ID, name, type, primary/read-only flags and select options. Call before creating, updating or filtering rows to learn exact field names, types and valid select values. Works with Database Token and Email & Password connections. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |

Output fields:

- `count`: Count (number)
- `fields`: Fields
- `fields[].id`: Field ID (number)
- `fields[].name`: Field Name
- `fields[].type`: Field Type
- `fields[].primary`: Primary (boolean)
- `fields[].read_only`: Read Only (boolean)
- `fields[].select_options`: Select Options
- `fields[].select_options[].id`: Option ID (number)
- `fields[].select_options[].value`: Value
- `fields[].link_row_table_id`: Linked Table ID (number)

### `baserow_list_views`

**List Views.** Lists all views (grid, gallery, form, kanban, calendar, timeline) of a Baserow table with their ID, name and type. Use to get a View ID for List Rows or a grid View ID for Aggregate Field. Requires an Email & Password connection. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |

Output fields:

- `count`: Count (number)
- `views`: Views
- `views[].id`: View ID (number)
- `views[].name`: View Name
- `views[].type`: View Type

### `baserow_list_row_names`

**List Row Names.** Returns the display name (primary field value) of each given row ID in a Baserow table. Use to turn linked-row IDs into readable names without fetching whole rows. Works with Database Token and Email & Password connections. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `row_ids` | array | yes |  | Row IDs. Numeric row IDs to look up. |

Output fields:

- `rows`: Rows
- `rows[].id`: Row ID (number)
- `rows[].name`: Name

### `baserow_get_field_unique_values`

**Get Field Unique Values.** Returns the distinct values stored in a Baserow field, most frequent first. Use to discover valid values before filtering rows or to profile a column without paging through rows. Requires an Email & Password connection. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `field_id` | number | yes |  | Field ID. The numeric field ID. Resolve it with Get Table Fields. |
| `limit` | number | no |  | Limit. Maximum number of values to return. Defaults to 10. |
| `split_comma_separated` | boolean | no | `false` | Split Comma-Separated Values. Treat "a,b" as two values a and b. |

Output fields:

- `count`: Count (number)
- `values`: Values

### `baserow_list_workspace_users`

**List Workspace Users.** Lists the members of a Baserow workspace with user ID, name, email and role. Use to find the user ID needed for collaborator fields ([{"id": <user_id>}]). Only workspace admins can call it, with an Email & Password connection. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | number | yes |  | Workspace ID. The numeric workspace ID. Resolve it with List Workspaces. |
| `search` | string | no |  | Search. Only return users whose name or email contains this text. |

Output fields:

- `count`: Count (number)
- `users`: Users
- `users[].user_id`: User ID (number)
- `users[].name`: Name
- `users[].email`: Email (email)
- `users[].permissions`: Role

### `baserow_search_workspace`

**Search Workspace.** Runs Baserow's workspace-wide search across databases, tables, fields and row content, returning matches with their type and IDs. Use when you do not know which table holds a record; within a known table use List Rows with Search. Requires an Email & Password connection. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | number | yes |  | Workspace ID. The numeric workspace ID. Resolve it with List Workspaces. |
| `query` | string | yes |  | Query. Text to search for. |
| `limit` | number | no |  | Limit. Maximum results to return. |
| `offset` | number | no |  | Offset. Number of results to skip, for paging. |

Output fields:

- `has_more`: Has More (boolean)
- `results`: Results
- `results[].type`: Result Type
- `results[].id`: Result ID (number)
- `results[].title`: Title
- `results[].subtitle`: Subtitle
- `results[].description`: Description
- `results[].metadata`: Location
- `results[].metadata.workspace_id`: Workspace ID (number)
- `results[].metadata.database_id`: Database ID (number)
- `results[].metadata.database_name`: Database Name
- `results[].metadata.table_id`: Table ID (number)
- `results[].metadata.table_name`: Table Name
- `results[].metadata.row_id`: Row ID (number)
- `results[].metadata.field_id`: Field ID (number)
- `results[].metadata.field_name`: Field Name
- `results[].metadata.primary_field_value`: Primary Field Value

### `baserow_create_database`

**Create Database.** Creates a new, empty Baserow database in a workspace and returns its ID. Follow with Create Table to add tables. Requires an Email & Password connection. Not idempotent — each call creates another database. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | number | yes |  | Workspace ID. The numeric workspace ID. Resolve it with List Workspaces. |
| `name` | string | yes |  | Name. Name of the new database (max 160 characters). |

Output fields:

- `id`: Database ID (number)
- `name`: Database Name
- `workspace`: Workspace
- `workspace.id`: Workspace ID (number)
- `workspace.name`: Workspace Name

### `baserow_create_table`

**Create Table.** Creates a new table in a Baserow database. Pass Data as rows of cell values; with First Row Is Header the first row becomes the field names and all fields are created as text. Without Data the table gets a single "Name" field and no rows. Add typed fields afterwards with Create Field. Requires an Email & Password connection. Not idempotent — each call creates another table. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database_id` | number | yes |  | Database ID. The database to create the table in. Resolve with List Databases. |
| `name` | string | yes |  | Name. Name of the new table. |
| `data` | JSON | no |  | Data. Optional JSON array of rows, each an array of cell values, e.g. [["Name", "Email"], ["Ada", "ada@example.com"]]. |
| `first_row_header` | boolean | no | `true` | First Row Is Header. Use the first row of Data as the field names. |

Output fields:

- `id`: Table ID (number)
- `name`: Table Name
- `database_id`: Database ID (number)

### `baserow_update_table`

**Rename Table.** Renames an existing Baserow table. Requires an Email & Password connection. Idempotent — applying the same name again changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `name` | string | yes |  | Name. The new table name. |

Output fields:

- `id`: Table ID (number)
- `name`: Table Name
- `order`: Order (number)
- `database_id`: Database ID (number)

### `baserow_delete_table`

**Delete Table.** Deletes a Baserow table together with all its fields, views and rows; it moves to the Baserow trash and can be restored there until the trash is emptied. Confirm the table with Get Table first. Requires an Email & Password connection. Not idempotent — a repeat call fails because the table is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |

Output fields:

- `deleted`: Deleted (boolean)
- `table_id`: Table ID (number)

### `baserow_create_field`

**Create Field.** Adds a new field to a Baserow table with a given name and type, plus optional type-specific settings (select options, number decimals, linked table, formula). Use Get Table Fields first to avoid duplicate names. Requires an Email & Password connection — Database Tokens cannot create fields. Not idempotent — a repeat call fails on the duplicate name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `name` | string | yes |  | Name. Name of the new field. Must be unique in the table. |
| `type` | string | yes |  | Type. Baserow field type, e.g. text, long_text, number, boolean, date, email, url, phone_number, rating, single_select, multiple_select, link_row, file, formula, duration, autonumber. |
| `options` | JSON | no |  | Type Options. Optional JSON object of type-specific settings, e.g. {"number_decimal_places": 2}, {"select_options": [{"value": "Open", "color": "blue"}]}, {"link_row_table_id": 12}, {"formula": "field('Price') * 2"}, {"date_include_time": true}. |

Output fields:

- `id`: Field ID (number)
- `table_id`: Table ID (number)
- `name`: Field Name
- `type`: Field Type
- `primary`: Primary (boolean)
- `read_only`: Read Only (boolean)
- `description`: Description
- `select_options`: Select Options
- `select_options[].id`: Option ID (number)
- `select_options[].value`: Value
- `select_options[].color`: Color

### `baserow_update_field`

**Update Field.** Updates a Baserow field: rename it, change type-specific settings such as select options, or convert its type. Only the given properties change. Converting the type can lose cell data that does not fit the new type. Requires an Email & Password connection. Idempotent — the same update converges on the same field. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `field_id` | number | yes |  | Field ID. The numeric field ID. Resolve it with Get Table Fields. |
| `name` | string | no |  | New Name. Leave empty to keep the current name. |
| `type` | string | no |  | New Type. Leave empty to keep the current type. Changing type can drop incompatible values. |
| `options` | JSON | no |  | Type Options. Optional JSON object of type-specific settings to change. For select fields, "select_options" replaces the whole list — include existing options (with their "id") to keep them. |

Output fields:

- `id`: Field ID (number)
- `table_id`: Table ID (number)
- `name`: Field Name
- `type`: Field Type
- `primary`: Primary (boolean)
- `read_only`: Read Only (boolean)
- `description`: Description
- `select_options`: Select Options
- `select_options[].id`: Option ID (number)
- `select_options[].value`: Value
- `select_options[].color`: Color

### `baserow_delete_field`

**Delete Field.** Deletes a Baserow field and every value stored in it; the field moves to the Baserow trash and can be restored there. The primary field cannot be deleted. Requires an Email & Password connection. Not idempotent — a repeat call fails because the field is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `field_id` | number | yes |  | Field ID. The numeric field ID. Resolve it with Get Table Fields. |

Output fields:

- `deleted`: Deleted (boolean)
- `field_id`: Field ID (number)
- `related_fields`: Related Fields Changed
- `related_fields[].id`: Field ID (number)
- `related_fields[].table_id`: Table ID (number)
- `related_fields[].name`: Field Name
- `related_fields[].type`: Field Type
- `related_fields[].primary`: Primary (boolean)
- `related_fields[].read_only`: Read Only (boolean)
- `related_fields[].description`: Description
- `related_fields[].select_options`: Select Options
- `related_fields[].select_options[].id`: Option ID (number)
- `related_fields[].select_options[].value`: Value
- `related_fields[].select_options[].color`: Color

### `baserow_create_view`

**Create View.** Creates a new grid, gallery or form view on a Baserow table and returns its ID. Use when a separate saved view is needed, for example a grid view to aggregate over. Requires an Email & Password connection. Not idempotent — each call creates another view. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `name` | string | yes |  | Name. Name of the new view. |
| `type` | string | yes | `"grid"` | Type. The kind of view to create. One of `"grid"`, `"gallery"`, `"form"`. |

Output fields:

- `id`: View ID (number)
- `name`: View Name
- `type`: View Type
- `table_id`: Table ID (number)

### `baserow_get_row_history`

**Get Row History.** Returns the change log of a Baserow row, newest first: who changed which fields, when, and the before/after values. Use to audit edits or recover a previous value. History is kept for a limited period (180 days by default). Requires an Email & Password connection. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `row_id` | number | yes |  | Row ID. The numeric row ID. Resolve it with Find Row or List Rows. |
| `limit` | number | no |  | Limit. Maximum entries to return. |
| `offset` | number | no |  | Offset. Number of entries to skip, for paging. |

Output fields:

- `count`: Total Entries (number)
- `has_more`: Has More (boolean)
- `entries`: Entries
- `entries[].id`: Entry ID (number)
- `entries[].action_type`: Action Type
- `entries[].timestamp`: Changed At (datetime)
- `entries[].user`: Changed By
- `entries[].user.id`: User ID (number)
- `entries[].user.name`: Name
- `entries[].before`: Before (an object whose keys vary)
- `entries[].after`: After (an object whose keys vary)

### `baserow_export_table`

**Export Table.** Starts an asynchronous export of a Baserow table (or one of its views) to CSV and returns the export job ID. The file is not ready yet — call Get Export Job with the job ID until its state is "finished" to get the download URL. Requires an Email & Password connection. Not idempotent — each call starts a new export job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | number | yes |  | Table ID. The numeric Baserow table ID. Resolve it with List Tables. |
| `view_id` | number | no |  | View ID. Export only the rows and fields visible in this view. Leave empty for the whole table. |

Output fields:

- `job_id`: Export Job ID (number)
- `state`: State

### `baserow_get_export_job`

**Get Export Job.** Returns the state (pending, exporting, finished, failed, cancelled), progress and — once finished — the download URL of a Baserow export job started by Export Table. Call again later while the state is pending or exporting; it does not wait. Requires an Email & Password connection. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | number | yes |  | Job ID. The job ID returned by Export Table. |

Output fields:

- `job_id`: Export Job ID (number)
- `state`: State
- `progress_percentage`: Progress (%) (number)
- `file_name`: File Name
- `url`: Download URL (url)

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

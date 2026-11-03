# Tables

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-tables'
  version: '0.5.3'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `tables-create-table`

**Create Table.** Creates a new Activepieces Table in the current project, optionally defining its columns up front - each field takes a name plus a type of text, number, date, date & time, or single select, with single-select choices supplied as one comma-separated string. Date and date & time both hold an ISO-8601 UTC timestamp; date & time additionally shows the time of day. Pick this when a flow needs somewhere to store data that does not exist yet. Only those five column types are supported; not idempotent, since each call creates another table and repeating it with the same name yields duplicates.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Table Name. |
| `fields` | array | no |  | Fields. The columns to create. Leave empty to create a table with no fields. Each item: { `name`, `type`, `options`? }. |

Output fields:

- `id`: Internal ID
- `name`: Table Name
- `externalId`: Table ID
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `fields`: Fields
- `fields[].name`: Field Name
- `fields[].type`: Type
- `fields[].externalId`: Field ID

### `tables-delete-table`

**Delete Table.** Permanently drops an Activepieces Table together with all of its records and column definitions. Pick this only when the table itself should cease to exist; use Clear Table to wipe the rows but keep the schema, or Delete Record(s) to remove individual rows. Requires the table ID and is irreversible, with no confirmation prompt or recovery path; idempotent, since the table ends up gone regardless of how many times it runs.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)

### `tables-create-records`

**Create Record(s).** Inserts one or more new rows into an Activepieces Table via either a per-field form built from the columns of the selected table, or a raw JSON array of objects keyed by column name that overrides the form, for when the table is chosen dynamically at runtime. Use Update Record instead to change a row that already exists. Requires a table ID, and any value whose key does not match a real column is silently dropped; not idempotent, since every call appends new records with new IDs.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `values` | object | yes |  | Values. One entry per record to insert. An object whose fields depend on other inputs; the product shows them. |
| `records` | JSON | no |  | Records as JSON. Array of objects keyed by field name. Overrides the form above. |

Output fields:

- `[].id`: Record ID
- `[].created`: Created (datetime)
- `[].updated`: Updated (datetime)
- `[].cells`: Cells (an object whose keys vary)

### `tables-delete-record`

**Delete Record(s).** Deletes one or more rows from an Activepieces Table by record ID, accepting a list of IDs in a single call. Pick this to remove specific known rows; use Clear Table to empty a table wholesale, or Delete Table to drop the table along with its schema. Requires the table ID plus the record IDs, which come from Find Records or a table trigger payload, and cannot delete by filter or field value; idempotent.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `records_ids` | array | yes |  | Record IDs. Usually mapped from a Find Records step or a table trigger. |

Output fields:

- `success`: Success (boolean)

### `tables-update-record`

**Update Record.** Overwrites cell values on one existing Activepieces Table record addressed by its record ID, changing only the columns supplied - blank values are skipped and keep whatever the record already holds. Pick this to modify a known row; use Create Record(s) to insert new rows, since this action only edits a record that already exists. Requires both the table ID and the record ID, and each value is validated against the type of its column; idempotent, since re-applying the same values leaves the record unchanged.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record ID. Usually comes from a Find Records step or a table trigger. |
| `values` | object | yes |  | Values. Leave a field empty to keep its current value. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Record ID
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `cells`: Cells (an object whose keys vary)

### `tables-get-record`

**Get Record.** Fetches one Activepieces Table record by its record ID and returns its cell values. Pick this when the exact record ID is already in hand, for example from a table trigger payload or an earlier Find Records step; use Find Records to look rows up by column value instead. Requires both the table ID and the record ID, and cannot search by column content; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record ID. Usually comes from a Find Records step or a table trigger. |

Output fields:

- `id`: Record ID
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `cells`: Cells (an object whose keys vary)

### `tables-find-records`

**Find Records.** Queries rows in an Activepieces Table, optionally narrowing them with a list of column/operator/value filter conditions and an optional row limit. This is the main way to read or search a table and to resolve the record IDs needed by Get Record, Update Record, or Delete Record(s); use Get Record when the record ID is already known. Requires the table ID; with no filters it returns every row, and filter values are type-checked against the column, so number and date columns reject unparseable values; on date and date & time columns the gt/gte/lt/lte operators compare chronologically while eq/neq compare the stored text exactly; read-only and idempotent.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `filters` | object | no |  | Filters. All conditions must match. Empty returns every record. An object whose fields depend on other inputs; the product shows them. |
| `limit` | number | no |  | Limit. Maximum records to return. Empty returns all records. |

Output fields:

- `[].id`: Record ID
- `[].created`: Created (datetime)
- `[].updated`: Updated (datetime)
- `[].cells`: Cells (an object whose keys vary)

### `tables-clear-table`

**Clear Table.** Removes every record from an Activepieces Table while leaving the table and its field/column definitions intact. Pick this to empty a table before reloading it; use Delete Record(s) to remove specific rows by ID, or Delete Table to drop the table itself. Requires the table ID and deletes all rows with no filter or confirmation step; idempotent, since the table ends up empty no matter how many times it runs.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)

### `tables-download-table`

**Download Table.** Exports all records of an Activepieces Table as a CSV file, optionally prefixed with a header row of column names. Pick this when a whole table is needed as a file; use Find Records instead to read rows as structured data. Requires the table ID and always exports the full table - it accepts no filters, column selection, or row limit; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `include_headers` | boolean | no | `true` | Include Headers. Adds the column names as the first row of the CSV. |

Output fields:

- `file`: File (url)
- `name`: File Name
- `rowCount`: Row Count (number)

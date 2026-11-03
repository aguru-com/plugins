# Oracle Database

Enterprise-grade relational database

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-oracle-database'
  version: '0.1.15'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect to Oracle Database using either Service Name (host/port/service) or a full connection string.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `connectionType` | string | yes | `"serviceName"` | Connection Type. How you want to connect. One of `"serviceName"`, `"connectionString"`. |
| `host` | string | no |  | Host. Database server hostname or IP. |
| `port` | number | no | `1521` | Port. Database port. |
| `serviceName` | string | no |  | Service Name. Oracle service name. |
| `connectionString` | string | no |  | Connection String. Full connection string (e.g., host:port/serviceName) |
| `user` | string | yes |  | Username. |
| `password` | string | yes |  | Password. |
| `thickMode` | boolean | no | `false` | Thick Mode. Enable to support older Oracle Database versions (11g, 10g password verifiers). Oracle Instant Client will be downloaded and installed automatically if not already present. |

## Actions

### `insert_row`

**Insert Row.** Inserts a single row into an Oracle Database table, mapping column names to values. Use to add one record; for many records in one call prefer Insert Rows. Not idempotent — each call appends a new row. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableName` | string | yes |  | Table Name. A value the product loads from the provider, such as an id; write the value itself. |
| `row` | object | yes | `{"COLUMN_NAME":"value"}` | Row. Column names and values to insert. |

### `insert_rows`

**Insert Rows.** Bulk-inserts multiple rows into an Oracle Database table from an array of objects keyed by column name. Use when adding several records at once instead of repeated single inserts. Requires a non-empty array; not idempotent — each call appends new rows. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableName` | string | yes |  | Table Name. A value the product loads from the provider, such as an id; write the value itself. |
| `rows` | array | yes | `[{"COLUMN_1":"value_a","COLUMN_2":1},{"COLUMN_1":"value_b","COLUMN_2":2}]` | Rows. Array of objects with column names and values. |

### `run_custom_sql`

**Run Custom SQL.** Executes an arbitrary SQL or PL/SQL statement against Oracle Database, with optional named bind parameters (:param). Use as the escape hatch for queries the structured row actions cannot express (joins, aggregates, DDL, fetch/delete all rows). Idempotency depends on the statement — a SELECT is safe to repeat, but any INSERT/UPDATE/DELETE/DDL mutates and is not; pass user-supplied values via binds to avoid SQL injection. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sql` | string | yes | `"SELECT * FROM employees WHERE department_id = :dept_id"` | SQL Query. SQL or PL/SQL to execute. Use :param for bind parameters. |
| `binds` | object | no | `{"dept_id":90}` | Bind Parameters. Key-value pairs for bind variables. |

### `update_row`

**Update Row.** Updates rows in an Oracle Database table, setting the given column values on every row that matches the filter (WHERE) conditions. Use to modify existing records. Critical: an empty filter object updates ALL rows in the table, so always scope the filter unless a full-table update is intended. Repeating the same call re-applies the same values (effectively idempotent for fixed values), but counts as a mutation each time. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableName` | string | yes |  | Table Name. A value the product loads from the provider, such as an id; write the value itself. |
| `values` | object | yes | `{"SALARY":8000}` | Values. Column names and new values to set. |
| `filter` | object | yes | `{"ID":101}` | Filter (WHERE). Conditions to match rows. Empty object updates ALL rows. |

### `delete_row`

**Delete Row.** Deletes rows from an Oracle Database table that match the filter (WHERE) conditions. Use to remove specific records. The filter cannot be empty (use Run Custom SQL to delete all rows); not idempotent in effect — the first matching call removes rows, later calls find nothing to delete. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableName` | string | yes |  | Table Name. A value the product loads from the provider, such as an id; write the value itself. |
| `filter` | object | yes | `{"ID":101}` | Filter (WHERE). Conditions to match rows for deletion. |

### `find_row`

**Find Row.** Looks up rows in an Oracle Database table matching the filter (WHERE) conditions. Use to read existing records by exact-match column values. The filter cannot be empty (use Run Custom SQL to fetch all rows); read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableName` | string | yes |  | Table Name. A value the product loads from the provider, such as an id; write the value itself. |
| `filter` | object | yes | `{"ID":101}` | Filter (WHERE). Conditions to match rows. |

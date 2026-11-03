# Postgres

The world's most advanced open-source relational database

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-postgres'
  version: '0.4.1'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `host` | string | yes |  | Host. A string indicating the hostname of the PostgreSQL server to connect to. |
| `port` | number | yes | `5432` | Port. An integer indicating the port of the PostgreSQL server to connect to. |
| `user` | string | yes |  | User. A string indicating the user to authenticate as when connecting to the PostgreSQL server. |
| `password` | string | yes |  | Password. A string indicating the password to use for authentication. |
| `database` | string | yes |  | Database. A string indicating the name of the database to connect to. |
| `enable_ssl` | boolean | yes | `true` | Enable SSL. Connect to the postgres database over SSL. |
| `reject_unauthorized` | boolean | yes | `false` | Verify server certificate. Verify the server certificate against trusted CAs or a CA provided in the certificate field below. This will fail if the database server is using a self signed certificate. |
| `certificate` | string | no | `""` | Certificate. The CA certificate to use for verification of server certificate. |

## Actions

### `find-rows`

**Find Rows.** Reads rows from a PostgreSQL table, optionally narrowed by a SQL WHERE condition and limited to specific columns. Use to look up or filter records by arbitrary criteria. Returns at most 100 rows unless limit is raised or cleared. The condition is interpolated raw into the query, so pass dynamic values through the args array and reference them as $1, $2 placeholders to avoid SQL injection. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `condition` | string | no |  | Condition. SQL condition without the WHERE keyword, such as `status = $1 AND age > $2`. Leave empty to read every row. |
| `args` | array | no |  | Arguments. Values for the $1, $2, ... placeholders used in the condition. |
| `columns` | array | no |  | Columns. The columns to return. Leave empty to return every column. Values the product loads from the provider, such as ids; write an array of them. |
| `limit` | number | no | `100` | Limit. The maximum number of rows to return. Raise it to read more, or clear the field to return every matching row. |

Output fields:

- `rows`: Rows
- `rowCount`: Row Count (number)

### `insert-row`

**Insert Row.** Inserts a single row into a PostgreSQL table from a map of column names to values, and by default returns the inserted row as stored by the database (including defaults and generated ids). Use to add a record. Turn off Return Inserted Row when the connection only has INSERT permission, since returning the row also needs SELECT. Not idempotent: each call performs a fresh INSERT, so repeating it adds duplicate rows or errors on a unique-key collision. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `values` | object | yes |  | Values. Column names mapped to the values to insert. |
| `return_row` | boolean | no | `true` | Return Inserted Row. Return the stored row, including generated ids and column defaults. Requires SELECT permission on the table as well as INSERT — turn this off for an append-only role. |

Output fields:

- `row`: Inserted Row
- `rowCount`: Inserted Rows (number)

### `insert-rows`

**Insert Multiple Rows.** Inserts an array of rows into a PostgreSQL table, each row a map of column names to values, using multi-row INSERT statements inside one transaction: if any row fails, none are inserted. Columns a row omits get the column default. Returns the inserted count and, when Return Inserted Rows is on, the stored rows including generated ids. Use instead of repeated single inserts for bulk loads. Not idempotent: each call appends new rows, so repeating it adds duplicates or errors on a unique-key collision. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `batch` | object | yes |  | Rows. An object whose fields depend on other inputs; the product shows them. |
| `keep_empty_strings` | boolean | no | `false` | Keep Empty Strings. Insert empty fields as empty strings instead of the column default. |
| `return_rows` | boolean | no | `false` | Return Inserted Rows. Return the inserted rows, including generated ids. Needs SELECT permission on the table. |

Output fields:

- `rows`: Inserted Rows
- `rowCount`: Inserted Row Count (number)

### `update-row`

**Update Row.** Updates every row in a PostgreSQL table whose search column equals a given value, setting the supplied column-to-value pairs, and returns how many rows changed. Use to modify existing records matched by a single column. Enable Return Updated Rows to also get the rows themselves back, but leave it off when the update can match many rows. Idempotent: re-running with the same input writes the same values and has no additional effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `values` | object | yes |  | Values. Column names mapped to their new values. |
| `search_column` | string | yes |  | Search Column. The column to match rows on. A value the product loads from the provider, such as an id; write the value itself. |
| `search_value` | string | yes |  | Search Value. Rows whose search column equals this value are updated. |
| `return_rows` | boolean | no | `false` | Return Updated Rows. Return every updated row in the output. Leave off when the update can match a large number of rows — the row count is always returned. |

Output fields:

- `rows`: Updated Rows
- `rowCount`: Updated Row Count (number)

### `delete-row`

**Delete Row.** Deletes every row in a PostgreSQL table whose search column equals a given value, and returns how many rows were removed. Use to remove records matched by a single column. Enable Return Deleted Rows to also get the deleted rows back, but leave it off when the delete can match many rows. Idempotent: once the matching rows are gone, re-running with the same input deletes nothing further. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `search_column` | string | yes |  | Search Column. The column to match rows on. A value the product loads from the provider, such as an id; write the value itself. |
| `search_value` | string | yes |  | Search Value. Rows whose search column equals this value are deleted. |
| `return_rows` | boolean | no | `false` | Return Deleted Rows. Return every deleted row in the output. Leave off when the delete can match a large number of rows — the row count is always returned. |

Output fields:

- `rows`: Deleted Rows
- `rowCount`: Deleted Row Count (number)

### `get-tables`

**Get Tables.** Lists every base table in the connected PostgreSQL database, each with its schema and table name. Use to discover the schema before reading or writing rows. Takes no input; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `tables`: Tables
- `tables[].table_schema`: Schema
- `tables[].table_name`: Table

### `run-query`

**Run Query.** Executes an arbitrary SQL statement against the connected PostgreSQL database and returns the resulting rows. Use this to read, write, or otherwise operate on a Postgres database when no more specific tool fits. Always pass dynamic values via the args array with $1/$2 placeholders (never string-interpolate them) to avoid SQL injection. Not idempotent: the statement can be a mutation (INSERT/UPDATE/DELETE/DDL), so repeating the same call may change data or have side effects each time. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Please use $1, $2, etc. for parameterized queries to avoid SQL injection. |
| `args` | array | no |  | Arguments. Arguments to be used in the query. |
| `query_timeout` | number | no | `30000` | Query Timeout. An integer indicating the maximum number of milliseconds to wait for a query to complete before timing out. |
| `connection_timeout_ms` | number | no | `30000` | Connection Timeout (ms). An integer indicating the maximum number of milliseconds to wait for a connection to be established before timing out. |
| `application_name` | string | no |  | Application Name. A string indicating the name of the client application connecting to the server. |

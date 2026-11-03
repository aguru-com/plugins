# MySQL

The world's most popular open-source database

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mysql'
  version: '0.3.0'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `host` | string | yes |  | Host. The hostname or address of the mysql server. |
| `port` | number | yes | `3306` | Port. The port to use for connecting to the mysql server. |
| `user` | string | yes |  | Username. The username to use for connecting to the mysql server. |
| `password` | string | yes |  | Password. The password to use to identify at the mysql server. |
| `database` | string | no |  | Database. The name of the database to use. Required if you are not using the "Execute Query" Action. |

## Actions

### `find_rows`

**Find Rows.** Reads rows from a MySQL table that match a SQL WHERE condition, optionally limited to specific columns. Use to look up or filter records by arbitrary criteria. The condition is required and is interpolated raw into the query, so pass dynamic values through the args array (referenced as ? placeholders) to avoid SQL injection. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `timezone` | string | no |  | Timezone. Timezone for the MySQL server to use. |
| `table` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `condition` | string | yes |  | Condition. SQL condition, can also include logic operators, etc. |
| `args` | array | no |  | Arguments. Arguments can be used using ? in the condition. |
| `columns` | array | no |  | Columns. Specify the columns you want to select. |

Output fields:

- `results`: Rows

### `insert_row`

**Insert Row.** Inserts a new row into a MySQL table from a map of column names to values. Use to add a record. Not idempotent: each call performs a fresh INSERT, so repeating it adds duplicate rows (or errors on a unique-key collision). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `timezone` | string | no |  | Timezone. Timezone for the MySQL server to use. |
| `table` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `values` | object | yes |  | Values. |

Output fields:

- `affectedRows`: Affected Rows (number)
- `insertId`: Insert ID (number)
- `warningCount`: Warning Count (number)
- `message`: Message

### `insert_rows`

**Insert Multiple Rows.** Inserts an array of rows into a MySQL table, each row a map of column names to values, using multi-row INSERT statements inside one transaction: if any row fails, none are inserted (InnoDB tables only). Columns a row omits get the column default. Returns the inserted row count and the auto-increment id of the first inserted row. Use instead of repeated single inserts for bulk loads. Not idempotent: each call appends new rows, so repeating it adds duplicates or errors on a unique-key collision. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `timezone` | string | no |  | Timezone. Timezone for the MySQL server to use. |
| `table` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `batch` | object | yes |  | Rows. An object whose fields depend on other inputs; the product shows them. |
| `keep_empty_strings` | boolean | no | `false` | Keep Empty Strings. Insert empty fields as empty strings instead of the column default. |

Output fields:

- `affectedRows`: Inserted Rows (number)
- `firstInsertId`: First Insert ID (number)

### `update_row`

**Update Row.** Updates every row in a MySQL table whose search column equals a given value, setting the supplied column-to-value pairs. Use to modify existing records matched by a single column. Idempotent: re-running with the same input writes the same values and has no additional effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `timezone` | string | no |  | Timezone. Timezone for the MySQL server to use. |
| `table` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `values` | object | yes |  | Values. |
| `search_column` | string | yes |  | Search Column. |
| `search_value` | string | yes |  | Search Value. |

Output fields:

- `affectedRows`: Matched Rows (number)
- `changedRows`: Changed Rows (number)
- `warningCount`: Warning Count (number)
- `message`: Message

### `delete_row`

**Delete Row.** Deletes every row in a MySQL table whose search column equals a given value. Use to remove records matched by a single column. Idempotent: once the matching rows are gone, re-running with the same input deletes nothing further. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `timezone` | string | no |  | Timezone. Timezone for the MySQL server to use. |
| `table` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `search_column` | string | yes |  | Search Column. |
| `search_value` | string | yes |  | Search Value. |

Output fields:

- `affectedRows`: Deleted Rows (number)
- `warningCount`: Warning Count (number)
- `message`: Message

### `get_tables`

**Get Tables.** Lists the names of all tables in the connected MySQL database (SHOW TABLES). Use to discover the schema before reading or writing rows. Takes no input; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

Output fields:

- `tables`: Tables

### `execute_query`

**Execute Query.** Runs an arbitrary SQL statement against the MySQL database and returns its results. Use as the escape hatch when the dedicated find/insert/update/delete actions cannot express the operation (joins, DDL, multi-table writes, aggregates). Pass dynamic values through the args array as ? placeholders to avoid SQL injection. Not idempotent in general: the effect and repeat-safety depend entirely on the SQL you supply (a SELECT is safe to repeat, an INSERT or UPDATE may not be). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `timezone` | string | no |  | Timezone. Timezone for the MySQL server to use. |
| `query` | string | yes |  | Query. The query string to execute, use ? for arguments to avoid SQL injection. |
| `args` | array | no |  | Arguments. Arguments to use in the query, if any. Should be in the same order as the ? in the query string.. |

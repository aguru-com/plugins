# Microsoft SQL Server

Microsoft's relational database engine, on-premise or as Azure SQL

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-sql-server'
  version: '0.1.1'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> **Connection String (Azure SQL, SQL authentication):** in the portal open your database, choose Connection strings, and copy the ADO.NET (SQL authentication) one, not an Active Directory variant. Replace the {your_password} placeholder, and quote a password containing a semicolon: Password="my;pass";.
>
> **Microsoft Entra ID (service principal):** leave Username and Password empty, and fill in Tenant ID, Client ID and Client Secret from an app registration instead. See [Create Microsoft Entra Users Using Service Principals](https://learn.microsoft.com/en-us/azure/azure-sql/database/authentication-aad-service-principal?view=azuresql) for how to register the app and grant it a database user.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `connection_string` | string | no |  | Connection String. Azure SQL only. When set, the fields below are ignored except CA Certificate and Minimum TLS Version. |
| `host` | string | no |  | Host. The hostname or address of the SQL Server. Use Host and Port rather than a named instance, which needs UDP port 1434. |
| `port` | number | no | `1433` | Port. The port the SQL Server listens on. |
| `database` | string | no |  | Database. The name of the database to connect to. |
| `user` | string | no |  | Username. The SQL Server login to authenticate as. On Azure SQL this is usually user@servername. Leave empty when authenticating with Tenant ID, Client ID and Client Secret below. |
| `password` | string | no |  | Password. The password for the login above. |
| `tenant_id` | string | no |  | Tenant ID. Microsoft Entra ID tenant ID, for authenticating as a service principal instead of a SQL login. Requires Client ID and Client Secret below, and leaves Username and Password empty. |
| `client_id` | string | no |  | Client ID. Application (client) ID of the Entra ID app registration. |
| `client_secret` | string | no |  | Client Secret. Client secret value of the Entra ID app registration. |
| `encrypt` | boolean | yes | `true` | Encrypt Connection. Encrypt the connection with TLS. Required by Azure SQL; turn off only for an on-premise server with no TLS configured. |
| `trust_server_certificate` | boolean | yes | `false` | Trust Server Certificate. Skip server certificate verification, for an on-premise server with a self-signed certificate. Leave off for Azure SQL or when a CA certificate is supplied below. |
| `certificate` | string | no |  | CA Certificate. Optional CA certificate (PEM) to verify a self-signed server certificate. |
| `min_tls_version` | string | no |  | Minimum TLS Version. Optional. Lower this only to reach an older server such as SQL Server 2012 that cannot negotiate TLS 1.2. One of `"TLSv1.3"`, `"TLSv1.2"`, `"TLSv1.1"`, `"TLSv1"`. |

## Actions

### `find_rows`

**Find Rows.** Reads rows from one SQL Server table, optionally filtered by a WHERE condition, restricted to chosen columns, sorted, and capped to a maximum number of rows. Use to look up or list records without writing a full query. The condition is inserted into the statement as written, so pass dynamic values through the Parameters map as named @placeholders instead of embedding them. Not idempotent in general: the condition is raw T-SQL, so a statement that writes can be smuggled through it and repeating the call would repeat the write. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. The table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `columns` | array | no |  | Columns. Columns to return. Leave empty to return every column. |
| `condition` | string | no |  | Condition. The WHERE clause without the WHERE keyword, for example: balance >= @min AND is_active = 1. Leave empty to return every row. |
| `parameters` | object | no |  | Parameters. Values for the @placeholders used in the condition. Enter the name without the @ prefix. |
| `order_by` | string | no |  | Order By. Column to sort the rows by. A value the product loads from the provider, such as an id; write the value itself. |
| `order_direction` | string | no | `"ASC"` | Order Direction. One of `"ASC"`, `"DESC"`. |
| `limit` | number | no |  | Limit. Maximum number of rows to return. Leave empty for no limit. |

### `insert_row`

**Insert Row.** Inserts one row into a SQL Server table from a map of column names to values, and returns the row as stored — including columns filled in by the database such as an IDENTITY id or a default timestamp. Use to add a record. Not idempotent: each call performs a fresh INSERT, so repeating it adds duplicate rows or fails on a unique-key collision. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. The table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `values` | object | yes |  | Values. Column name to value. Omit columns that the database fills in, such as an identity id or a default timestamp. |

### `insert_rows`

**Insert Multiple Rows.** Inserts an array of rows into a SQL Server table, each row a map of column names to values, using multi-row INSERT statements inside one transaction: if any row fails, none are inserted. Columns a row omits get the column default. Returns the inserted row count and, when Return Inserted Rows is on, the stored rows including IDENTITY ids. Use instead of repeated single inserts for bulk loads. Not idempotent: each call appends new rows, so repeating it adds duplicates or fails on a unique-key collision. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. The table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `batch` | object | yes |  | Rows. An object whose fields depend on other inputs; the product shows them. |
| `keep_empty_strings` | boolean | no | `false` | Keep Empty Strings. Insert empty fields as empty strings instead of the column default. |
| `return_rows` | boolean | no | `false` | Return Inserted Rows. Return the inserted rows, including identity ids. Fails on tables with triggers. |

Output fields:

- `rows`: Inserted Rows
- `row_count`: Inserted Row Count (number)

### `update_rows`

**Update Rows.** Updates every row in a SQL Server table whose search column equals a given value, setting the supplied column-to-value pairs, and returns the updated rows. Use to modify existing records matched on a single column; for anything more complex use Run Query. Idempotent: re-running with the same input writes the same values and changes nothing further. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. The table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `values` | object | yes |  | Values. Column name to new value. |
| `search_column` | string | yes |  | Search Column. Rows are updated where this column equals the value below. A value the product loads from the provider, such as an id; write the value itself. |
| `search_value` | string | yes |  | Search Value. The value the search column must equal. |

Output fields:

- `rows`: Affected Rows
- `rows_affected`: Rows Affected (number)

### `delete_rows`

**Delete Rows.** Deletes every row in a SQL Server table whose search column equals a given value, and returns the rows that were removed. Use to delete records matched on a single column; for anything more complex use Run Query. Idempotent: once the matching rows are gone, re-running deletes nothing further. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. The table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `search_column` | string | yes |  | Search Column. Rows are deleted where this column equals the value below. A value the product loads from the provider, such as an id; write the value itself. |
| `search_value` | string | yes |  | Search Value. The value the search column must equal. |

Output fields:

- `rows`: Affected Rows
- `rows_affected`: Rows Affected (number)

### `get_tables`

**Get Tables.** Lists every base table in the connected SQL Server database, with its schema and name (from INFORMATION_SCHEMA.TABLES). Use to discover the schema before reading or writing rows. Takes no input; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

Output fields:

- `[].table_schema`: Schema
- `[].table_name`: Table Name
- `[].full_name`: Qualified Name

### `run_query`

**Run Query.** Executes an arbitrary T-SQL statement against the connected SQL Server database and returns the resulting rows. Use this when no more specific action fits: joins, aggregates, DDL, stored procedures or multi-table writes. Pass every dynamic value through the Parameters map as a named @placeholder rather than building it into the query text, to avoid SQL injection. Not idempotent in general: the statement may be a mutation, so repeating the call can change data each time. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. The T-SQL to run. Refer to values as @name and define them in Parameters below, for example: SELECT * FROM customers WHERE id = @id. |
| `parameters` | object | no |  | Parameters. Values for the @placeholders in the query. Enter the name without the @ prefix — a key of id fills @id. |
| `query_timeout` | number | no | `30000` | Query Timeout (ms). How long to wait for the statement before giving up. |

Output fields:

- `rows`: Rows
- `result_sets`: Result Sets
- `row_count`: Row Count (number)
- `rows_affected`: Rows Affected (number)

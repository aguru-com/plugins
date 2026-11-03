# Snowflake

Data warehouse built for the cloud

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-snowflake'
  version: '0.3.6'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: OAuth

> Connect via Snowflake OAuth using a custom security integration.
>
> > **Prerequisite:** You need the `ACCOUNTADMIN` role (or a role with the `CREATE INTEGRATION` privilege).
>
> ---
>
> ### Step 1 — Create a security integration
>
> Open a **SQL Worksheet** in your Snowflake console and run:
>
> ```sql
> CREATE SECURITY INTEGRATION "activepieces"
> TYPE = OAUTH
> OAUTH_CLIENT = CUSTOM
> OAUTH_CLIENT_TYPE = 'CONFIDENTIAL'
> OAUTH_REDIRECT_URI = 'https://cloud.activepieces.com/redirect'
> ENABLED = TRUE
> OAUTH_ISSUE_REFRESH_TOKENS = TRUE
> OAUTH_USE_SECONDARY_ROLES = IMPLICIT;
> ```
>
> > Replace the redirect URI with the one shown on your Activepieces OAuth connection page.
> >
> > `OAUTH_USE_SECONDARY_ROLES = IMPLICIT` lets the access token use any role granted to the user. Without it, the token is bound to the user's default Snowflake role and the **Default Role** field below will be ignored.
>
> ---
>
> ### Step 2 — Retrieve client credentials
>
> Run the following query to get your **Client ID** and **Client Secret**:
>
> ```sql
> SELECT SYSTEM$SHOW_OAUTH_CLIENT_SECRETS('activepieces');
> ```
>
> Copy `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` from the JSON result.
>
> ---
>
> ### Step 3 — Find your Account Identifier
>
> Click the **account icon** at the bottom-left of the Snowflake console → **View account details**.
> Copy the **Account Identifier** (e.g. `xy12345.us-east-1` or `orgname-accountname`).
>
> ---
>
> ### Step 4 — Connect
>
> Enter the **Client ID** and **Client Secret** in the Activepieces OAuth2 settings for this connection, fill in the **Account Identifier** below, then click **Connect**.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account` | string | yes |  | Account Identifier. Account icon (bottom-left) → **View account details** → copy the **Account Identifier**. Examples: `xy12345.us-east-1`, `orgname-accountname`. |
| `database` | string | no |  | Default Database. Optional. Default database for queries. Find names under **Data → Databases**. |
| `warehouse` | string | no |  | Default Warehouse. Optional. Default virtual warehouse. Find names under **Admin → Warehouses**. |
| `role` | string | no |  | Default Role. Optional. Default security role. Find names under **Admin → Users & Roles → Roles**. |

### `CUSTOM_AUTH`: Username & Password / Key Pair

> Connect using your Snowflake username with either a **password** or an **RSA private key**.
>
> ### Finding your Account Identifier
>
> Click the **account icon** at the bottom-left of the Snowflake console → **View account details**.
> Copy the **Account Identifier** (e.g. `xy12345.us-east-1` or `orgname-accountname`).
>
> ---
>
> ### Option A — Password
>
> Use your Snowflake username and the password you use to log in at [app.snowflake.com](https://app.snowflake.com).
> Your username is shown in the profile section at the top-left of the console, or under **Admin → Users & Roles → Users**.
>
> ---
>
> ### Option B — Key Pair *(recommended for automation)*
>
> **1. Generate a key pair** (run in your terminal):
>
> ```bash
> # Unencrypted (no passphrase needed)
> openssl genrsa 2048 | openssl pkcs8 -topk8 -nocrypt -out rsa_key.p8
> openssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub
>
> # Encrypted (you will be prompted for a passphrase)
> openssl genrsa 2048 | openssl pkcs8 -topk8 -out rsa_key_encrypted.p8
> openssl rsa -in rsa_key_encrypted.p8 -pubout -out rsa_key.pub
> ```
>
> **2. Register the public key** with your Snowflake user (run in a SQL Worksheet):
>
> ```sql
> ALTER USER <your_username>
> SET RSA_PUBLIC_KEY='<contents of rsa_key.pub, excluding the BEGIN/END lines>';
> ```
>
> **3. Paste the private key** — copy the full contents of `rsa_key.p8` (including the `-----BEGIN PRIVATE KEY-----` header and footer) into the **Private Key** field below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account` | string | yes |  | Account Identifier. Account icon (bottom-left) → **View account details** → copy the **Account Identifier**. Examples: `xy12345.us-east-1`, `orgname-accountname`. |
| `username` | string | yes |  | Username. Your Snowflake login name. Shown in the profile section (top-left of the console) or under **Admin → Users & Roles → Users**. |
| `password` | string | no |  | Password. Your Snowflake password *(Option A)*. Leave blank if you are using a Private Key. |
| `privateKey` | string | no |  | Private Key. RSA private key in PEM format *(Option B)*. Paste the full contents of your `.p8` file, including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines. Leave blank if you are using a Password. |
| `privateKeyPassphrase` | string | no |  | Private Key Passphrase. Passphrase for the private key. Only required if you generated an **encrypted** key pair. |
| `database` | string | no |  | Default Database. Optional. Default database for queries. Find names under **Data → Databases**. |
| `role` | string | no |  | Default Role. Optional. Default security role. Find names under **Admin → Users & Roles → Roles**. |
| `warehouse` | string | no |  | Default Warehouse. Optional. Default virtual warehouse. Find names under **Admin → Warehouses**. |

## Actions

### `runQuery`

**Run Query.** Runs an arbitrary SQL statement against Snowflake (SELECT, DML, or DDL). Use this for any query the dedicated row/table actions do not cover, or when you need full SQL control. Pass dynamic values via the parameters array bound to `:1`/`?` placeholders rather than concatenating into the SQL. Idempotency depends on the statement: a SELECT is safe to repeat, but an INSERT/UPDATE/DELETE mutates state on each call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sqlText` | string | yes |  | SQL Query. The SQL statement to execute. Use `:1`, `:2`… or `?` as placeholders for the **Parameters** values below to safely pass dynamic values without SQL injection risk. |
| `binds` | array | no |  | Parameters. Values to bind to the placeholders (`:1`, `:2`…, or `?`) in the SQL query. Provide them in the same order they appear in the query. Using parameters is the safe way to pass dynamic values — never concatenate user input directly into the SQL. |
| `timeout` | number | no | `30000` | Query Timeout (ms). Maximum time in milliseconds to wait for the query to complete before cancelling it. Defaults to 30 000 ms (30 seconds). |
| `application` | string | no | `"ActivePieces"` | Application Name. An optional label sent to Snowflake to identify this client. Visible in query history under **Monitoring → Query History → Client Application**. Useful for auditing which automation triggered a query. |

### `runMultipleQueries`

**Run Multiple Queries.** Runs an ordered list of SQL statements against Snowflake in a single connection, with an option to wrap the whole batch in one transaction so a failure rolls back all preceding changes. Use this for multi-statement scripts or when several statements must succeed or fail together; for a single statement use Run Query. Bind shared dynamic values via numbered `:1`/`:2` placeholders (avoid `?` here). Not idempotent when the batch contains DML/DDL, since those mutate state on each call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sqlTexts` | array | yes |  | SQL Queries. List of SQL statements to run in order. Use `:1`, `:2`… placeholders to reference shared **Parameters** values. Avoid `?` placeholders when running multiple queries — use numbered placeholders instead to prevent unexpected behaviour. |
| `binds` | array | no |  | Parameters. Values shared across all queries for the numbered placeholders (`:1`, `:2`…). Provide them in order. Unused parameters are allowed. |
| `useTransaction` | boolean | no | `false` | Use Transaction. When enabled, all queries run inside a single transaction. If any query fails, every preceding change in this batch is rolled back automatically. |
| `timeout` | number | no | `30000` | Query Timeout (ms). Maximum time in milliseconds to wait for each query to complete before cancelling it. Defaults to 30 000 ms (30 seconds). |
| `application` | string | no | `"ActivePieces"` | Application Name. An optional label sent to Snowflake to identify this client. Visible in query history under **Monitoring → Query History → Client Application**. |

### `insert-row`

**Insert Row.** Inserts a single new row into a specified Snowflake table (database, schema, table, and a map of column values). Use when adding one record; for many rows at once use Insert Multiple Rows. Not idempotent: each call issues an INSERT, so repeating it appends a duplicate row unless the table enforces uniqueness. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | yes |  | Database. Select the Snowflake database to use. Databases are listed under **Data → Databases** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `schema` | string | yes |  | Schema. Select the schema within the chosen database. Schemas are listed under **Data → Databases → [your database]** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `table` | string | yes |  | Table. Select the table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `table_column_values` | object | yes |  | Row Data. Enter the value for each column in the new row. An object whose fields depend on other inputs; the product shows them. |

### `update_row`

**Update Row.** Runs an UPDATE on a Snowflake table, setting the provided column values on every row matching the given WHERE condition; leaving the condition empty updates ALL rows. Use to modify existing records in place. Repeating the same call generally yields the same final state (it sets values rather than incrementing), but it is a mutating write and the WHERE clause is embedded directly into SQL, so supply only trusted values there. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | yes |  | Database. Select the Snowflake database to use. Databases are listed under **Data → Databases** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `schema` | string | yes |  | Schema. Select the schema within the chosen database. Schemas are listed under **Data → Databases → [your database]** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `table` | string | yes |  | Table. Select the table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `table_update_values` | object | yes |  | Columns to Update. Only filled columns will be updated. Leave a column empty to keep its existing value. An object whose fields depend on other inputs; the product shows them. |
| `where_clause` | string | no |  | WHERE Condition. A SQL condition to filter which rows to update (e.g. `id = 42` or `status = 'active'`). Leave empty to update ALL rows in the table (use with caution). **Security note:** this value is embedded directly in SQL. Only use static values or data from trusted, internal steps — never pass unvalidated end… |

### `delete_row`

**Delete Row.** Runs a DELETE on a Snowflake table, removing every row matching the required WHERE condition. Use to remove records; the condition is mandatory to guard against wiping the whole table, and it is embedded directly into SQL so pass only trusted values. Re-running after the matching rows are gone deletes nothing further, but treat this as a destructive mutating operation. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | yes |  | Database. Select the Snowflake database to use. Databases are listed under **Data → Databases** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `schema` | string | yes |  | Schema. Select the schema within the chosen database. Schemas are listed under **Data → Databases → [your database]** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `table` | string | yes |  | Table. Select the table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `where_clause` | string | yes |  | WHERE Condition. A SQL condition to filter which rows to delete (e.g. `id = 42` or `status = 'archived'`). This field is required to prevent accidental deletion of all rows. **Security note:** this value is embedded directly in SQL. Only use static values or data from trusted, internal steps — never pass unvalidate… |

### `upsert_row`

**Upsert Row.** Inserts a row into a Snowflake table, or updates the existing row when one already matches on the chosen match column, via MERGE INTO. Use when you want create-or-update semantics keyed on a stable identifier instead of separate insert/update logic. The match column must be among the supplied column values, and at least one other column is required. Idempotent when the match column is a stable unique key: repeating the call converges to the same row state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | yes |  | Database. Select the Snowflake database to use. Databases are listed under **Data → Databases** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `schema` | string | yes |  | Schema. Select the schema within the chosen database. Schemas are listed under **Data → Databases → [your database]** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `table` | string | yes |  | Table. Select the table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `match_column` | string | yes |  | Match Column. The column used to identify whether a row already exists (e.g. the primary key or a unique identifier column). A value the product loads from the provider, such as an id; write the value itself. |
| `table_column_values` | object | yes |  | Row Data. Enter the value for each column in the new row. An object whose fields depend on other inputs; the product shows them. |

### `insert_multiple_rows`

**Insert Multiple Rows.** Bulk-inserts an array of rows into a Snowflake table in one INSERT statement. Use when adding several records at once (e.g. mapping an array from a previous step); for a single record use Insert Row. Every row object must share the same set of column keys as the first row. Not idempotent: each call appends the rows again, duplicating them unless the table enforces uniqueness. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | yes |  | Database. Select the Snowflake database to use. Databases are listed under **Data → Databases** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `schema` | string | yes |  | Schema. Select the schema within the chosen database. Schemas are listed under **Data → Databases → [your database]** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `table` | string | yes |  | Table. Select the table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `rows` | array | yes |  | Rows. One item per row. Each item must be a JSON object with column names as keys. Example: `{"name": "Alice", "age": 30}`. When mapping from a previous step, pass the entire array directly. |

### `get_row_by_id`

**Get Row by ID.** Looks up and returns a single row from a Snowflake table where the chosen ID column equals a given value (the first match, LIMIT 1). Use for a targeted point lookup by primary key or unique identifier; for multi-row or condition-based queries use Search Rows. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | yes |  | Database. Select the Snowflake database to use. Databases are listed under **Data → Databases** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `schema` | string | yes |  | Schema. Select the schema within the chosen database. Schemas are listed under **Data → Databases → [your database]** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `table` | string | yes |  | Table. Select the table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `id_column` | string | yes |  | ID Column. The column to search in (e.g. the primary key or unique identifier column). A value the product loads from the provider, such as an id; write the value itself. |
| `id_value` | string | yes |  | ID Value. The value to look up in the ID column. |

### `search_rows`

**Search Rows.** Returns rows from a Snowflake table with an optional WHERE filter, ORDER BY sort, and row limit (default 100); leaving the filter empty returns all rows up to the limit. Use to retrieve a filtered or sorted set of records; for a single row by key use Get Row by ID. The filter and sort clauses are embedded directly into SQL, so pass only trusted values. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | yes |  | Database. Select the Snowflake database to use. Databases are listed under **Data → Databases** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `schema` | string | yes |  | Schema. Select the schema within the chosen database. Schemas are listed under **Data → Databases → [your database]** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `table` | string | yes |  | Table. Select the table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `where_clause` | string | no |  | Filter Condition. Optional SQL WHERE condition to narrow down results (e.g. `status = 'active' AND age > 18`). Leave empty to return all rows (subject to the row limit). **Security note:** this value is embedded directly in SQL. Only use static values or data from trusted, internal steps — never pass unvalidated end… |
| `order_by` | string | no |  | Sort By. Optional column(s) to sort results by (SQL ORDER BY clause). Examples: `created_at DESC` sorts newest first; `name ASC, age DESC` sorts by name then age. **Security note:** this value is embedded directly in SQL. Only use static values or data from trusted, internal steps — never pass unvalidated e… |
| `limit` | number | no | `100` | Row Limit. Maximum number of rows to return. Defaults to 100. |

### `get_table_schema`

**Get Table Schema.** Describes a Snowflake table, returning its column definitions (name, data type, nullability, default, key flags, comment) via DESCRIBE TABLE. Use to discover a table's structure before building inserts, updates, or queries against it. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | yes |  | Database. Select the Snowflake database to use. Databases are listed under **Data → Databases** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `schema` | string | yes |  | Schema. Select the schema within the chosen database. Schemas are listed under **Data → Databases → [your database]** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `table` | string | yes |  | Table. Select the table to work with. A value the product loads from the provider, such as an id; write the value itself. |

### `list_tables`

**List Tables.** Lists the tables in a given Snowflake database and schema (via SHOW TABLES), returning each table's name, kind, row/byte counts, owner, and creation time. Use to discover what tables exist before querying or to enumerate a schema. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | yes |  | Database. Select the Snowflake database to use. Databases are listed under **Data → Databases** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `schema` | string | yes |  | Schema. Select the schema within the chosen database. Schemas are listed under **Data → Databases → [your database]** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |

### `execute_stored_procedure`

**Execute Stored Procedure.** Calls a named stored procedure in a Snowflake database/schema with optional positional arguments and returns its result (CALL). Use to invoke server-side procedural logic rather than ad-hoc SQL. Idempotency depends on what the procedure does internally; assume not idempotent since a procedure may mutate data or have side effects on each call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | yes |  | Database. Select the Snowflake database to use. Databases are listed under **Data → Databases** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `schema` | string | yes |  | Schema. Select the schema within the chosen database. Schemas are listed under **Data → Databases → [your database]** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `procedure_name` | string | yes |  | Stored Procedure. Select the stored procedure to call. A value the product loads from the provider, such as an id; write the value itself. |
| `arguments` | array | no |  | Arguments. Positional arguments to pass to the stored procedure in order. Leave empty if the procedure takes no arguments. |

### `create_dynamic_table`

**Create / Refresh Dynamic Table.** Creates or replaces a Snowflake Dynamic Table whose contents are derived from a SELECT query and auto-refresh on a target-lag schedule, using a specified warehouse. Use to set up or redefine a declarative, self-refreshing derived table. Effectively idempotent in result via CREATE OR REPLACE (re-running with the same inputs yields the same table definition), though REPLACE drops and recreates the object. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | yes |  | Database. Select the Snowflake database to use. Databases are listed under **Data → Databases** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `schema` | string | yes |  | Schema. Select the schema within the chosen database. Schemas are listed under **Data → Databases → [your database]** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `table_name` | string | yes |  | Dynamic Table Name. The name for the new dynamic table (e.g. `DAILY_SALES_SUMMARY`). Only letters, digits, underscores, and `$` are allowed. |
| `target_lag` | string | yes | `"1 hour"` | Refresh Interval. How up-to-date the dynamic table data should be (called **Target Lag** in Snowflake). Examples: `1 minute`, `5 minutes`, `1 hour`. Use `DOWNSTREAM` to only refresh when a downstream object explicitly requests it. |
| `warehouse` | string | no |  | Warehouse. Select the virtual warehouse to use for this operation. Warehouses are listed under **Admin → Warehouses** in the Snowflake console. Leave empty to use the warehouse set in your connection. A value the product loads from the provider, such as an id; write the value itself. |
| `query` | string | yes |  | Source Query. The SELECT statement that defines the content of the dynamic table. Example: `SELECT user_id, SUM(amount) AS total FROM orders GROUP BY user_id`. |

### `load_data_from_stage`

**Load Data from Stage.** Bulk-loads files from a named internal or external Snowflake stage into a target table via COPY INTO, with configurable file format, file-name pattern, header skipping, and on-error behavior. Use to ingest staged CSV/JSON/Parquet/etc. data. By default COPY INTO skips files it has already loaded, but re-running may load newly added files; treat as a mutating load (not strictly idempotent). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | yes |  | Database. Select the Snowflake database to use. Databases are listed under **Data → Databases** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `schema` | string | yes |  | Schema. Select the schema within the chosen database. Schemas are listed under **Data → Databases → [your database]** in the Snowflake console. A value the product loads from the provider, such as an id; write the value itself. |
| `table` | string | yes |  | Table. Select the table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `stage_path` | string | yes |  | Stage Path. Path to the Snowflake stage (a staging area that holds files before loading). For **internal stages**: use `@stage_name` or `@schema.stage_name/folder/`. For **external stages** (S3, GCS, Azure): use `@schema.stage_name/prefix/`. Example: `@my_stage/data/`. You can find your stage names under **Dat… |
| `file_format_type` | string | yes | `"CSV"` | File Format. The file format of the data files in the stage. One of `"CSV"`, `"JSON"`, `"PARQUET"`, `"AVRO"`, `"ORC"`, `"XML"`. |
| `file_pattern` | string | no |  | File Pattern. Optional regular expression to load only files whose names match the pattern (e.g. `.*\.csv` loads only `.csv` files, `sales_2024.*` loads files that start with `sales_2024`). Leave empty to load all files in the stage path. |
| `skip_header` | number | no | `0` | Skip Header Rows. Number of rows to skip at the top of each CSV file (e.g. `1` to skip a column-header row). Only applies to CSV files. Defaults to 0. |
| `error_on_column_count_mismatch` | boolean | no | `true` | Fail on Column Count Mismatch. When enabled, the load fails if the number of columns in a file does not match the number of columns in the target table. Disable to allow files with fewer columns. |
| `on_error` | string | no | `"ABORT_STATEMENT"` | On Error. What to do when a row fails validation during loading. One of `"ABORT_STATEMENT"`, `"CONTINUE"`, `"SKIP_FILE"`. |

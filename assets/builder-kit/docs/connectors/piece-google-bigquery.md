# Google BigQuery

Query, analyze, and stream data into Google BigQuery — the fully managed, serverless data warehouse

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-bigquery'
  version: '0.1.2'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Sign in with your Google account. If you are using your own OAuth2 credentials, make sure to include the following scope: `https://www.googleapis.com/auth/bigquery`

### `CUSTOM_AUTH`: Service Account

> Use a GCP service account for automated, server-to-server access — no user sign-in required. Recommended for production workflows.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `instructions` | markdown | no |  | Markdown. **How to create a service account key:** 1. Open [Google Cloud Console](https://console.cloud.google.com/) and select your project from the top dropdown. 2. Go to **IAM & Admin** → **Service Accounts** in the left sidebar. 3. Click **Create Service Account** (or open an existing one). 4. Give it a … |
| `serviceAccountJson` | string | yes |  | Service Account JSON. Paste the full contents of the downloaded .json key file here. |

## Actions

### `run_query`

**Run a Query.** Runs an arbitrary standard-SQL (or legacy-SQL) statement against BigQuery in a given project and returns the result rows, paginating up to the max-rows cap. Use it for any ad-hoc read or aggregation when no purpose-built action fits, or when you need full SQL control. Note that BigQuery SQL is not limited to reads — a DML/DDL statement passed here will mutate data — so idempotency depends on the query you supply; a plain SELECT is safe to repeat. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. Select your Google Cloud project. A value the product loads from the provider, such as an id; write the value itself. |
| `query` | string | yes |  | SQL Query. The SQL query to run. Uses standard SQL syntax. Example: `SELECT * FROM \`my_dataset.my_table\` LIMIT 100`. |
| `max_results` | number | no | `1000` | Max Rows. Maximum number of rows to return (up to 10,000) |
| `location` | string | no |  | Location. Geographic location of your dataset (e.g. US, EU, us-central1). Leave blank for US. |
| `use_legacy_sql` | boolean | no | `false` | Use Legacy SQL. Enable only if your query uses BigQuery Legacy SQL syntax (not recommended) |

### `create_row`

**Create Row.** Streams one new row into a BigQuery table via the streaming insert API, with each column supplied as a separate value (loaded from the live table schema; empty values are dropped rather than written as nulls). Choose this when an agent has a single record to append and knows the target project, dataset, and table. Not idempotent: each call appends another row, so repeating it duplicates the record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. Select your Google Cloud project. A value the product loads from the provider, such as an id; write the value itself. |
| `dataset_id` | string | yes |  | Dataset. Select the BigQuery dataset. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. Select the BigQuery table. A value the product loads from the provider, such as an id; write the value itself. |
| `values` | object | yes |  | Row Values. Enter a value for each column. Fields are loaded from the table schema. An object whose fields depend on other inputs; the product shows them. |

### `create_rows`

**Create Rows.** Streams a batch of rows into a BigQuery table in one streaming-insert call, taking a JSON array of objects whose keys match the column names. Choose this over Create Row when appending multiple records at once. Optional flags control whether the whole batch fails on a bad row or skips invalid rows / unknown fields. Not idempotent: every call appends the rows again, so repeating it duplicates them. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. Select your Google Cloud project. A value the product loads from the provider, such as an id; write the value itself. |
| `dataset_id` | string | yes |  | Dataset. Select the BigQuery dataset. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. Select the BigQuery table. A value the product loads from the provider, such as an id; write the value itself. |
| `rows` | JSON | yes |  | Rows. An array of row objects to insert. Keys must match the table column names. Example: `[{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]`. |
| `skip_invalid_rows` | boolean | no | `false` | Skip Invalid Rows. If enabled, valid rows are inserted even when some rows in the batch are invalid. If disabled (default), the entire batch fails if any row is invalid. |
| `ignore_unknown_values` | boolean | no | `false` | Ignore Unknown Fields. If enabled, fields not in the table schema are silently discarded. If disabled (default), unknown fields cause the row to fail. |

### `delete_rows`

**Delete Rows.** Deletes every row matching a SQL WHERE condition from a BigQuery table by running a DELETE DML statement (supply only the condition body, without the WHERE keyword). Use it to remove records that meet a filter. Effectively idempotent on the same data — a repeat matches no remaining rows — but it is a destructive mutation, so an overly broad condition can remove far more than intended. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. Select your Google Cloud project. A value the product loads from the provider, such as an id; write the value itself. |
| `dataset_id` | string | yes |  | Dataset. Select the BigQuery dataset. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. Select the BigQuery table. A value the product loads from the provider, such as an id; write the value itself. |
| `where_clause` | string | yes |  | WHERE Clause. SQL condition to match the rows to delete. Do not include the WHERE keyword. Example: `status = "inactive" AND created_at < "2023-01-01"`. |
| `location` | string | no |  | Location. Dataset location (e.g. US, EU). Leave blank to use the default. |

### `update_rows`

**Update Row(s).** Updates rows in a BigQuery table by running an UPDATE DML statement, applying a comma-separated SET assignment to every row matching a WHERE condition (supply both as raw SQL fragments without the SET/WHERE keywords). Use it to change column values on existing records. Mutates state on each run, so it is not safe to assume idempotency — assignments to fixed literal values repeat harmlessly, but relative expressions (e.g. incrementing a counter) compound on every call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. Select your Google Cloud project. A value the product loads from the provider, such as an id; write the value itself. |
| `dataset_id` | string | yes |  | Dataset. Select the BigQuery dataset. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. Select the BigQuery table. A value the product loads from the provider, such as an id; write the value itself. |
| `set_expression` | string | yes |  | SET Expression. Comma-separated column assignments. Do not include the SET keyword. Example: `status = "active", updated_at = CURRENT_TIMESTAMP()`. |
| `where_clause` | string | yes |  | WHERE Clause. SQL condition to match the rows to update. Do not include the WHERE keyword. Example: `id = "abc123"`. |
| `location` | string | no |  | Location. Dataset location (e.g. US, EU). Leave blank to use the default. |

### `find_one_row`

**Find One Row.** Looks up a single row in a BigQuery table that matches a SQL WHERE condition, with an optional ORDER BY to control which row is picked when several match. Choose this for a simple keyed lookup or "does this record exist" check rather than writing a full query. Read-only and idempotent; returns the first match (or a not-found flag) without altering data. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. Select your Google Cloud project. A value the product loads from the provider, such as an id; write the value itself. |
| `dataset_id` | string | yes |  | Dataset. Select the BigQuery dataset. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. Select the BigQuery table. A value the product loads from the provider, such as an id; write the value itself. |
| `where_clause` | string | yes |  | WHERE Clause. SQL condition to filter rows. Do not include the WHERE keyword. Example: `email = "user@example.com"`. |
| `order_by` | string | no |  | ORDER BY. Optional column(s) to sort results before picking the first row. Example: `created_at DESC`. |
| `location` | string | no |  | Location. Dataset location (e.g. US, EU). Leave blank to use the default. |

### `find_or_create_row`

**Find or Create Record.** Finds the first row matching a SQL WHERE condition in a BigQuery table and returns it; if none matches, streams the supplied JSON row in and returns that instead, flagging whether it was found or created. Use it as a get-or-insert to avoid duplicates when ensuring a record exists. Conditionally idempotent: it only inserts when nothing matches, but because the WHERE condition and the inserted data are independent, a poorly aligned condition can let repeated calls insert duplicate rows. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. Select your Google Cloud project. A value the product loads from the provider, such as an id; write the value itself. |
| `dataset_id` | string | yes |  | Dataset. Select the BigQuery dataset. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. Select the BigQuery table. A value the product loads from the provider, such as an id; write the value itself. |
| `where_clause` | string | yes |  | WHERE Clause. SQL condition to search for an existing row. Do not include WHERE. Example: `email = "user@example.com"`. |
| `create_data` | JSON | yes |  | Row to Create (if not found). A JSON object of column/value pairs to insert if no matching row exists. Example: `{"email": "user@example.com", "name": "Alice"}`. |
| `location` | string | no |  | Location. Dataset location (e.g. US, EU). Leave blank to use the default. |

### `get_rows_for_job`

**Get Rows for Job Completed.** Fetches the cached result rows of an already-completed BigQuery query job by its job ID, paginating up to the max-rows cap. Use it to retrieve the full result set after a "Query Job Completed" trigger or a "Run a Query" action hands you a job ID. The job must already be finished — it errors if the job is still running. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. Select your Google Cloud project. A value the product loads from the provider, such as an id; write the value itself. |
| `job_id` | string | yes |  | Job ID. The BigQuery job ID to fetch results for. This is returned by the "Query Job Completed" trigger or a "Run a Query" action. |
| `max_results` | number | no | `1000` | Max Rows. Maximum number of rows to return (up to 10,000). Default: 1,000. |
| `location` | string | no |  | Location. Dataset location where the job ran (e.g. US, EU). Leave blank for US. |

### `import_data`

**Import Data.** Bulk-imports rows into a BigQuery table via streaming inserts, accepting either a JSON array of objects or a newline-delimited JSON (NDJSON) string and automatically splitting large datasets into chunks. Choose this for ingesting a large or variably-formatted dataset in one step; optional flags control whether the batch fails on bad rows or skips invalid rows / unknown fields. Not idempotent: each call appends the rows again, duplicating data if re-run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. Select your Google Cloud project. A value the product loads from the provider, such as an id; write the value itself. |
| `dataset_id` | string | yes |  | Dataset. Select the BigQuery dataset. A value the product loads from the provider, such as an id; write the value itself. |
| `table_id` | string | yes |  | Table. Select the BigQuery table. A value the product loads from the provider, such as an id; write the value itself. |
| `data` | JSON | yes |  | Data. The data to import. Provide a JSON array of objects (`[{...}, {...}]`) or a newline-delimited JSON string where each line is one row object. |
| `skip_invalid_rows` | boolean | no | `false` | Skip Invalid Rows. Continue importing valid rows even if some rows fail validation. Default: off (fail entire batch). |
| `ignore_unknown_values` | boolean | no | `false` | Ignore Unknown Fields. Silently drop fields not present in the table schema. Default: off (fail on unknown fields). |

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

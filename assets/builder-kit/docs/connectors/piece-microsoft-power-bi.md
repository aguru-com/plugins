# Microsoft Power BI

Create and manage Power BI datasets and reports, and push data to them

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-power-bi'
  version: '0.4.2'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> If you'd like to use your own custom Azure app instead of the default app, follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application),
> set the **Redirect URI** to {{redirectUrl}} and add the following **Power BI Service (Delegated) permissions** under **API permissions**:
> - Dataset.ReadWrite.All
> - Report.ReadWrite.All
> - Content.Create
> - Workspace.Read.All
> - offline_access

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cloud` | string | yes | `"login.microsoftonline.com"` | Cloud Environment. Select your Microsoft cloud environment. One of `"login.microsoftonline.com"`, `"login.microsoftonline.us"`. |

## Actions

### `create_dataset`

**Create Dataset.** Creates a new Power BI dataset in the user's default workspace, defining its tables and column schema. Choose this to provision a fresh push/streaming dataset before pushing rows into it. The defaultMode prop selects between Push, Streaming, and PushStreaming behavior, and the tables prop must be a JSON array of table definitions (each with a name and typed columns). Not idempotent: each call creates a new dataset even if one with the same name already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dataset_name` | string | yes | `"ActivepiecesDataset"` | Dataset Name. Name of the dataset to create. |
| `mode` | string | yes | `"Push"` | Dataset Mode. The mode of the dataset. One of `"Push"`, `"Streaming"`, `"PushStreaming"`. |
| `tables` | JSON | yes | `[{"name":"Data","columns":[{"name":"Id","dataType":"Int64"},{"name":"Name","dataType":"String"},{"name":"Value","dataType":"Double"},{"name":"Timestamp","dataType":"DateTime"}]}]` | Tables. Define the tables and their columns for the dataset (JSON format) |

### `push_rows_to_dataset_table`

**Push Rows to Dataset Table.** Appends rows of data to a specific table within an existing Power BI dataset, then (unless Skip Dataset Refresh is set) triggers a dataset refresh. Use this to feed live or batch data into a push/streaming dataset created beforehand. Requires the target dataset id and table name; rows must be a JSON array (or an object with a rows array) whose fields match the table schema. Not idempotent: each call appends new rows rather than replacing existing data. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dataset_id` | string | yes |  | Dataset. Select a dataset. A value the product loads from the provider, such as an id; write the value itself. |
| `table_name` | string | yes |  | Table. Select a table. A value the product loads from the provider, such as an id; write the value itself. |
| `rows` | JSON | yes | `{"rows":[{"Id":1,"Name":"Example","Value":42.5,"Timestamp":"2026-11-05T09:55:15.314Z"}]}` | Rows. JSON object containing the rows to add to the table. Each row must match your table schema. |
| `skip_refresh` | boolean | no | `false` | Skip Dataset Refresh. Skip refreshing the dataset after pushing data (only applies to Push and PushStreaming modes) |

### `refresh_dataset`

**Refresh Dataset.** Starts an asynchronous refresh of a Power BI dataset in a workspace. Use this after loading new data into the dataset's source, or on a schedule, to update the dataset without waiting inside the flow (the refresh continues in the background). Not idempotent: each call queues another refresh, and Shared-capacity workspaces are limited to 8 refreshes per day. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The Power BI workspace to use. Defaults to "My workspace" (your personal workspace). A value the product loads from the provider, such as an id; write the value itself. |
| `dataset_id` | string | yes |  | Dataset. Select a dataset from the chosen workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `notify_option` | string | no | `"NoNotification"` | Notification Option. When to send a mail notification about the refresh outcome. One of `"NoNotification"`, `"MailOnFailure"`, `"MailOnCompletion"`. |

### `run_dax_query`

**Run DAX Query.** Runs a single read-only DAX query against a Power BI dataset and returns the result rows. Use this to pull specific values or a table out of a dataset without exporting a whole report. Only one query per call and one table per query are supported, up to 100,000 rows or 15MB. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The Power BI workspace to use. Defaults to "My workspace" (your personal workspace). A value the product loads from the provider, such as an id; write the value itself. |
| `dataset_id` | string | yes |  | Dataset. Select a dataset from the chosen workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `dax_query` | string | yes |  | DAX Query. The DAX query to run, e.g. "EVALUATE VALUES(MyTable)" or "EVALUATE TOPN(10, MyTable)". Only DAX is supported (no MDX/DMV). |
| `impersonated_user_name` | string | no |  | Impersonated User (UPN). Optional. The user principal name (e.g. "jane@contoso.com") to impersonate for row-level security. Ignored if the dataset has no RLS roles. |
| `include_nulls` | boolean | no | `false` | Include Null Values. Whether blank/null values should be included in the result rows. |

### `export_report_to_file`

**Export Report to File.** Exports a Power BI report to a PDF, PowerPoint, or PNG file and returns the downloaded file. This is an asynchronous job under the hood: the action polls until the export finishes before returning, so it can take a while for large reports. Requires the report's workspace to be on Premium, Embedded, or Fabric capacity (not supported on Premium Per User). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The Power BI workspace to use. Defaults to "My workspace" (your personal workspace). A value the product loads from the provider, such as an id; write the value itself. |
| `report_id` | string | yes |  | Report. Select a report from the chosen workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `file_format` | string | yes | `"PDF"` | File Format. The format to export the report to. One of `"PDF"`, `"PPTX"`, `"PNG"`. |
| `max_wait_seconds` | number | no | `300` | Max Wait Time (seconds). How long to keep polling for the export to finish before giving up. |

### `list_reports`

**List Reports.** Lists every report in a Power BI workspace, including each report's ID, dataset ID, and web/embed URLs. Use this to discover which reports exist before exporting, cloning, or otherwise referencing one by ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The Power BI workspace to use. Defaults to "My workspace" (your personal workspace). A value the product loads from the provider, such as an id; write the value itself. |

### `clone_report`

**Clone Report.** Clones an existing Power BI report under a new name, optionally into a different workspace and/or bound to a different dataset. Use this to duplicate a report template for a new audience instead of rebuilding it. Not idempotent: each call creates another report copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The Power BI workspace to use. Defaults to "My workspace" (your personal workspace). A value the product loads from the provider, such as an id; write the value itself. |
| `report_id` | string | yes |  | Report. Select a report from the chosen workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `new_report_name` | string | yes |  | New Report Name. The name to give the cloned report. |
| `target_workspace_id` | string | no |  | Target Workspace. Where to place the cloned report. Defaults to the same workspace as the source report. A value the product loads from the provider, such as an id; write the value itself. |
| `target_dataset_id` | string | no |  | Target Dataset ID. Optional. The ID of the dataset the cloned report should bind to (found in the dataset's Power BI portal URL, e.g. ".../datasets/{this-id}/details"). Leave blank to keep the source report's dataset. |

### `import_pbix`

**Import File (.pbix).** Imports a .pbix, .xlsx, or .rdl file into a Power BI workspace, publishing it as a new dataset (and report, unless skipped). Use this to deploy a report/dataset built elsewhere. Not idempotent unless Name Conflict is set to Abort or Overwrite: by default a repeated call creates another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The Power BI workspace to use. Defaults to "My workspace" (your personal workspace). A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The .pbix, .xlsx, or .rdl file to import. Files are not supported; an action that needs one fails. |
| `dataset_display_name` | string | no |  | Dataset Display Name. The display name for the imported dataset, including its file extension (e.g. "MyReport.pbix"). Defaults to the uploaded file's name. |
| `name_conflict` | string | no | `"Ignore"` | On Name Conflict. What to do if a dataset with the same name already exists in the workspace. One of `"Ignore"`, `"Abort"`, `"Overwrite"`, `"CreateOrOverwrite"`, `"GenerateUniqueName"`. |
| `skip_report` | boolean | no | `false` | Skip Report Import. Only import the dataset, skipping the report. Only applies to .pbix files. |
| `max_wait_seconds` | number | no | `120` | Max Wait Time (seconds). How long to keep polling for the import to finish before returning its current status. |

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

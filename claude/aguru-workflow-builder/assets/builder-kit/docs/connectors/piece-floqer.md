# Floqer

Run Floqer shortcuts and push rows into workflow sheets.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-floqer'
  version: '0.1.2'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Floqer API key. It starts with `floq_`. Create one from your workspace settings in [Floqer](https://app.floqer.com).

## Actions

### `run_shortcut`

**Run Shortcut.** Run a published Floqer shortcut and return its result. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `shortcutId` | string | yes |  | Shortcut. Published Floqer shortcuts you can run. A value the product loads from the provider, such as an id; write the value itself. |
| `inputData` | object | yes |  | Inputs. The inputs this shortcut expects. An object whose fields depend on other inputs; the product shows them. |

### `add_rows`

**Add Rows.** Add rows to a Floqer workflow sheet, and optionally run them through its actions. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflowId` | string | yes |  | Workflow. The Floqer workflow that owns the sheet. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Sheet. The sheet inside the selected workflow. A value the product loads from the provider, such as an id; write the value itself. |
| `rows` | array | yes |  | Rows. Each row is an object whose keys are the sheet's input column names. Up to 1000 rows per call. |
| `runAfterAdd` | string | no | `"none"` | Run After Adding. What to run once the rows are written. Only the rows added by this step are affected. One of `"none"`, `"first_10"`, `"all"`. |

Output fields:

- `row_count`: Rows Added (number)
- `row_ids`: Row IDs
- `rows_queued_for_run`: Rows Queued For Run (number)
- `rejected`: Rejected Rows
- `rejected[].row`: Original Row
- `rejected[].errors`: Errors
- `rejected[].errors[].field`: Field
- `rejected[].errors[].code`: Code
- `rejected[].errors[].message`: Message
- `warnings`: Warnings
- `warnings[].field`: Field
- `warnings[].code`: Code
- `warnings[].message`: Message

### `run_rows`

**Run Rows.** Queue rows on a Floqer sheet through its action chain. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflowId` | string | yes |  | Workflow. The Floqer workflow that owns the sheet. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Sheet. The sheet inside the selected workflow. A value the product loads from the provider, such as an id; write the value itself. |
| `mode` | string | yes | `"row_ids"` | Rows To Run. Which rows on the sheet to queue. One of `"row_ids"`, `"first_10"`. |
| `rowIds` | array | no |  | Row IDs. Row UUIDs to queue. Add Rows returns these as `row_ids`. Ignored unless "Specific row IDs" is selected. |

Output fields:

- `rows_queued`: Rows Queued (number)

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

# SeekTable

Generate and automate reports from SeekTable.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-seek-table'
  version: '0.0.9'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Get your API key from Manage Account → Get API Key dialog in your SeekTable dashboard.

## Actions

### `upload_csv`

**Upload CSV File.** Uploads a CSV file (plain or gzip/zip-compressed) to SeekTable to back a cube. Operates in two modes: pass an existing cube id to refresh that CSV cube with the new data, or omit it to create a brand-new cube. Use when an agent needs to load tabular data into SeekTable before reporting on it. Not idempotent — each call ingests the file, creating a new cube or re-importing data into the targeted one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cubeId` | string | no |  | Existing Cube (Optional). Select an existing CSV cube to refresh, or leave empty to create a new cube. A value the product loads from the provider, such as an id; write the value itself. |
| `filename` | string | no |  | Filename (Optional). Custom filename for the uploaded CSV. Include .gz or .zip extension if the file is compressed. |
| `csvFile` | file | yes |  | CSV File. The CSV file to upload. Can be plain CSV or compressed (.gz, .zip) Files are not supported; an action that needs one fails. |

### `share_report_email`

**Share Report by Email.** Emails an existing SeekTable report to a recipient, optionally embedding the report HTML in the body and attaching exports (PDF, CSV, Excel, or Excel pivot table). Use when an agent needs to deliver a report by email rather than just generate it. Requires a valid report id and recipient address; report parameters can be passed to filter the data. Not idempotent — each call sends a new email. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reportId` | string | yes |  | Report. Select the report to share. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Email. Email address of the recipient. |
| `subject` | string | yes |  | Subject. Email subject line. |
| `message` | string | no |  | Message (Optional). Additional text content included in the email body. |
| `include_report_html` | boolean | no | `true` | Include Report HTML in Email Body. Place the report HTML directly into the email body. |
| `attach_export` | array | no |  | Attach Export Files. Select which export formats to attach to the email. One of `"pdf"`, `"csv"`, `"excel"`, `"excelpivottable"`. |
| `report_parameters` | object | no |  | Report Parameters (Optional). JSON object with report parameters like {"param_name": "value"}. |

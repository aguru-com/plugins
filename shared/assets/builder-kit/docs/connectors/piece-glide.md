# Glide

Manage Glide Big Tables and rows with Glide’s API.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-glide'
  version: '0.1.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Secret Token

> To get your token:
> 1. Open Glide and go to the **Data** editor.
> 2. Open a Big Table and click **Show API**.
> 3. Copy the **secret token** shown in the API details.
> 4. Paste it below.
>
> This piece uses Glide's Big Tables API, so the available actions work with Big Tables only.

## Actions

### `add-rows`

**Add Rows.** Append one or more new rows to a Glide Big Table identified by table ID. Use to insert records; each row is a JSON object whose keys must match the table column IDs. Not idempotent — every call appends, so re-running creates duplicate rows. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table. Select the Glide Big Table to use. A value the product loads from the provider, such as an id; write the value itself. |
| `rows` | JSON | yes |  | Rows. Provide an array of JSON objects where each object matches the Glide table columns. |

### `get-rows`

**Get Rows.** Read rows from a Glide Big Table identified by table ID, paginating up to an optional limit (default 100). Use to fetch existing records for inspection or downstream processing. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table. Select the Glide Big Table to use. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no | `100` | Limit. Maximum number of rows to return. |

### `update-row`

**Update Row.** Patch an existing row in a Glide Big Table, targeted by table ID and the specific row ID. Supply a JSON object with only the columns to change; omitted columns are left untouched. Requires a known row ID (look one up first via Get Rows if needed). Idempotent — repeating with the same values yields the same row state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table. Select the Glide Big Table to use. A value the product loads from the provider, such as an id; write the value itself. |
| `rowId` | string | yes |  | Row ID. The Glide row ID to update. |
| `row` | JSON | yes |  | Row. Provide a JSON object containing only the columns you want to update. |

### `delete-row`

**Delete Row.** Permanently remove a single row from a Glide Big Table, targeted by table ID and the specific row ID. Requires a known row ID (look one up first via Get Rows if needed). Idempotent on a stable row ID — the end state is the row no longer existing, and re-running has no further effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table. Select the Glide Big Table to use. A value the product loads from the provider, such as an id; write the value itself. |
| `rowId` | string | yes |  | Row ID. The Glide row ID to delete. |

### `list-tables`

**List Tables.** List all Glide Big Tables accessible to the authenticated team, returning their IDs and names. Use this first to discover the table ID required by the row-level actions (get, add, update, delete). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

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

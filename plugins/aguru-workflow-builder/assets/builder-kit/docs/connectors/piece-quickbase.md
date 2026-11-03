# Quickbase

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-quickbase'
  version: '0.2.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> ## Quickbase Authentication Setup
>
> ### 1. Get Your User Token
> - Log in to your Quickbase account
> - Go to **My Preferences** → **My User Information**
> - Click on **Manage User Tokens**
> - Click **New User Token**
> - Enter a name for your token and click **Create**
> - Copy the generated token (it will only be shown once)
>
> ### 2. Required Permissions
> Your user token needs access to:
> - Read/write permissions for the apps and tables you want to use
> - Admin permissions for creating/deleting records (if needed)
>
> **Security Note:** Keep your user token secure - it provides access to your Quickbase data.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `realmHostname` | string | yes |  | Realm Hostname. Enter your Quickbase Realm Hostname (e.g., yourrealm.quickbase.com) |
| `userToken` | string | yes |  | User Token. Enter your Quickbase User Token. |

## Actions

### `create_record`

**Create Record.** Insert a single new record into a Quickbase table, setting the given field values. Use when adding one new row; for many rows or to upsert against an existing key use Create / Update Records From Array, and to avoid duplicates use Find or Create Record. Requires the app and table; each call inserts a fresh record, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | App. Select the Quickbase app. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Field Values. Select and set values for table fields. An object whose fields depend on other inputs; the product shows them. |

### `update_record`

**Update Record.** Update the field values of one existing Quickbase record, identified by its record ID. Use when you already know which record to change; to create when none exists use Create or Find or Create Record. Requires the app, table, and record ID; only the provided fields are written. Repeating with the same input re-writes the same values, so it is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | App. Select the Quickbase app. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record. Select a record from the table. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Field Values. Select and set values for table fields. An object whose fields depend on other inputs; the product shows them. |

### `delete_record`

**Delete Record.** Permanently delete a single record from a Quickbase table, matched by its record ID. Use when removing one specific row. Requires the app, table, and record ID. Idempotent: re-running after the record is gone deletes nothing further (numberDeleted will be 0), but the destructive removal cannot be undone. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | App. Select the Quickbase app. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record. Select a record from the table. A value the product loads from the provider, such as an id; write the value itself. |

### `find_record`

**Find Record.** Query records from a Quickbase table, optionally narrowing with filter conditions, sorting, and a max-record cap. With no filters it returns all records (up to the limit); with filters it returns only matching rows. Use to look up or list records before acting on them. Requires the app and table. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | App. Select the Quickbase app. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `filters` | object | no |  | Filters. Filter criteria to find records. Use field names or field IDs as keys. |
| `sortField` | string | no |  | Sort Field. Field to sort records by (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `sortOrder` | string | no | `"ASC"` | Sort Order. Order to sort records. One of `"ASC"`, `"DESC"`. |
| `maxRecords` | number | no | `100` | Maximum Records. Maximum number of records to return. |

### `find_or_create_record`

**Find or Create Record.** Look up a record by matching a chosen merge field value, returning it if found, otherwise create a new record with the supplied fields. Use to avoid duplicates when the record may or may not already exist. Requires the app, table, a merge field, and a value for it. Idempotent on the merge key: once the record exists, repeat calls find rather than recreate it. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | App. Select the Quickbase app. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `mergeField` | string | yes |  | Merge Field. Field to use for matching existing records (for upsert operations) A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Fields. Map the fields to update. Use field names or field IDs. |

### `create_update_records_bulk`

**Create / Update Records From Array.** Upsert many Quickbase records in one call from an array, chunked in batches of 1000. A merge-behavior mode controls handling of existing rows: overwrite all fields on the matched merge key, update only the provided fields, or always insert new records (no merge). Use for batch imports or syncs. Requires the app, table, merge field, and records array. Idempotent only in the merge modes (keyed on the merge field); the always-create mode inserts new rows on each call and is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | App. Select the Quickbase app. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `mergeField` | string | yes |  | Merge Field. Field to use for matching existing records (for upsert operations) A value the product loads from the provider, such as an id; write the value itself. |
| `records` | array | yes |  | Records. Array of records to create or update. |
| `mergeFieldBehavior` | string | yes | `"merge-overwrite"` | Merge Behavior. How to handle existing records when upserting. One of `"merge-overwrite"`, `"merge-update"`, `"always-create"`. |

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

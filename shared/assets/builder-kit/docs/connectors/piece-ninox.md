# Ninox

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-ninox'
  version: '0.2.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Ninox API Key

> **Enter your Ninox Personal Access Token (API key).**
>
> ---
>
> ### How to obtain your API key
>
> 1. Visit [ninox.com](https://ninox.com) and log in.
> 2. Click the **Start Ninox** button to open the web app.
> 3. In the top-right corner, click the **Actions** gear icon.
> 4. Select **Integrations** from the drop-down menu.
> 5. In the pop-up window, click the **Generate** button.
> 6. Copy the API key to your clipboard and paste it here.

## Actions

### `createRecord`

**Create Record.** Inserts a new record into a Ninox table identified by team, database, and table. Use to add a row of field values; empty field values are dropped before sending. Not idempotent — each call creates a separate record. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamid` | string | yes |  | Team ID. Select the team containing the database. A value the product loads from the provider, such as an id; write the value itself. |
| `dbid` | string | yes |  | Database ID. Select the database containing the table. A value the product loads from the provider, such as an id; write the value itself. |
| `tid` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Record Fields. An object whose fields depend on other inputs; the product shows them. |

### `updateRecord`

**Update Record.** Updates field values on one existing Ninox record, addressed by team, database, table, and record id. Use when the target record id is known and you want to overwrite specific fields; empty field values are dropped before sending. Idempotent — repeating with the same input leaves the record in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamid` | string | yes |  | Team ID. Select the team containing the database. A value the product loads from the provider, such as an id; write the value itself. |
| `dbid` | string | yes |  | Database ID. Select the database containing the table. A value the product loads from the provider, such as an id; write the value itself. |
| `tid` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `rid` | string | yes |  | Record ID. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Record Fields. An object whose fields depend on other inputs; the product shows them. |

### `deleteRecord`

**Delete Record.** Permanently removes one record from a Ninox table, addressed by team, database, table, and record id. Use when the target record id is known and it should be deleted. Idempotent in effect — once removed, repeating the call leaves the record absent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamid` | string | yes |  | Team ID. Select the team containing the database. A value the product loads from the provider, such as an id; write the value itself. |
| `dbid` | string | yes |  | Database ID. Select the database containing the table. A value the product loads from the provider, such as an id; write the value itself. |
| `tid` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. A value the product loads from the provider, such as an id; write the value itself. |

### `uploadFile`

**Upload File.** Attaches a file as an upload to one Ninox record, addressed by team, database, table, and record id. Use to add a file attachment to an existing record. Not idempotent — each call appends another attachment. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamid` | string | yes |  | Team ID. Select the team containing the database. A value the product loads from the provider, such as an id; write the value itself. |
| `dbid` | string | yes |  | Database ID. Select the database containing the table. A value the product loads from the provider, such as an id; write the value itself. |
| `tid` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `rid` | string | yes |  | Record ID. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to upload to the record. Files are not supported; an action that needs one fails. |

### `downloadFileFromRecord`

**Download File from Record.** Retrieves one named file attachment from a Ninox record, addressed by team, database, table, record id, and the file name, returning its metadata and the downloaded content. Use to fetch an existing attachment. Idempotent — a read-only download with no side effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamid` | string | yes |  | Team ID. Select the team containing the database. A value the product loads from the provider, such as an id; write the value itself. |
| `dbid` | string | yes |  | Database ID. Select the database containing the table. A value the product loads from the provider, such as an id; write the value itself. |
| `tid` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `rid` | string | yes |  | Record ID. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | string | yes |  | File ID. A value the product loads from the provider, such as an id; write the value itself. |

### `findRecord`

**Find Record.** Searches a Ninox table for records whose chosen field matches a given value, addressed by team, database, and table. Use to look up records by a single field; returns whether a match was found along with the matching data. Idempotent — a read-only query with no side effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamid` | string | yes |  | Team ID. Select the team containing the database. A value the product loads from the provider, such as an id; write the value itself. |
| `dbid` | string | yes |  | Database ID. Select the database containing the table. A value the product loads from the provider, such as an id; write the value itself. |
| `tid` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `searchField` | string | yes |  | Table Field. A value the product loads from the provider, such as an id; write the value itself. |
| `searchValue` | string | yes |  | Search Value. The value to search for in the specified field. |

### `listFilesFromRecord`

**List Files from Record.** Lists the file attachments on one Ninox record, addressed by team, database, table, and record id, returning their metadata without downloading content. Use to enumerate or check which files are attached before downloading. Idempotent — a read-only listing with no side effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamid` | string | yes |  | Team ID. Select the team containing the database. A value the product loads from the provider, such as an id; write the value itself. |
| `dbid` | string | yes |  | Database ID. Select the database containing the table. A value the product loads from the provider, such as an id; write the value itself. |
| `tid` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `rid` | string | yes |  | Record ID. A value the product loads from the provider, such as an id; write the value itself. |

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

# AITable

Interactive spreadsheets with collaboration

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-apitable'
  version: '0.4.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To get your API token:
> 1. Sign in to AITable.
> 2. Click your avatar at the bottom left, then **My Settings**.
> 3. Open **Developer** and click **Generate new token**.
> 4. Copy the token and paste it below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `token` | string | yes |  | API Token. Generate it in AITable under My Settings → Developer. |
| `apiTableUrl` | string | yes | `"https://aitable.ai"` | Instance URL. Keep the default unless you self-host AITable. |

## Actions

### `apitable_create_record`

**Create Record.** Creates a new row in an AITable datasheet from a set of field values. Use when an agent needs to add data to a datasheet; requires the target space and datasheet IDs. Not idempotent: each call appends a new record, so repeating it creates duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The AITable workspace that holds your datasheet. A value the product loads from the provider, such as an id; write the value itself. |
| `datasheet_id` | string | yes |  | Datasheet. The table inside the space. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Fields. Values for the new record. Blank fields are left empty. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `code`: Code (number)
- `message`: Message
- `data`: Data
- `data.records`: Records
- `data.records[].recordId`: Record ID
- `data.records[].fields`: Fields (an object whose keys vary)

### `apitable_update_record`

**Update Record.** Updates the field values of an existing record in an AITable datasheet, identified by its record ID. Use when an agent needs to modify a row it can already locate. Idempotent: re-applying the same field values to the same record ID yields the same result with no extra side effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The AITable workspace that holds your datasheet. A value the product loads from the provider, such as an id; write the value itself. |
| `datasheet_id` | string | yes |  | Datasheet. The table inside the space. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. Map it from a trigger or a Find Records step. |
| `fields` | object | yes |  | Fields. Blank fields keep their value; unticked checkboxes are cleared. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `code`: Code (number)
- `message`: Message
- `data`: Data
- `data.records`: Records
- `data.records[].recordId`: Record ID
- `data.records[].createdAt`: Created At (datetime)
- `data.records[].updatedAt`: Updated At (datetime)
- `data.records[].fields`: Fields (an object whose keys vary)

### `apitable_find_record`

**Find Records.** Reads records from an AITable datasheet, optionally narrowing by record IDs, a formula filter, or a field-name projection, with pagination controls; leaving the filters empty returns all records (paged). Use to look up or list datasheet rows before acting on them. Idempotent: it only reads data. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The AITable workspace that holds your datasheet. A value the product loads from the provider, such as an id; write the value itself. |
| `datasheet_id` | string | yes |  | Datasheet. The table inside the space. A value the product loads from the provider, such as an id; write the value itself. |
| `filter` | string | no |  | Filter Formula. Only records where this formula is true are returned. |
| `recordIds` | array | no |  | Record IDs. Only return these records. Empty: search all. |
| `fieldNames` | array | no |  | Fields to Return. Field names to include. Empty: every field. |
| `pageSize` | number | no | `100` | Page Size. Records returned per page. |
| `maxRecords` | number | no |  | Max Records. Caps matching records before paging. Empty: no cap. |
| `pageNum` | number | no |  | Page Number. Which page to return, starting at 1. |

Output fields:

- `success`: Success (boolean)
- `code`: Code (number)
- `message`: Message
- `data`: Data
- `data.total`: Total (number)
- `data.pageNum`: Page Number (number)
- `data.pageSize`: Page Size (number)
- `data.records`: Records
- `data.records[].recordId`: Record ID
- `data.records[].createdAt`: Created At (datetime)
- `data.records[].updatedAt`: Updated At (datetime)
- `data.records[].fields`: Fields (an object whose keys vary)

### `apitable_delete_record`

**Delete Record.** Permanently deletes one or more records from an AITable datasheet by record ID; obtain the IDs from Find Records first. Use only when records should be removed entirely, not just updated. Not idempotent: retrying after a successful delete errors because the records no longer exist. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The AITable workspace that holds your datasheet. A value the product loads from the provider, such as an id; write the value itself. |
| `datasheet_id` | string | yes |  | Datasheet. The table inside the space. A value the product loads from the provider, such as an id; write the value itself. |
| `recordIds` | array | yes |  | Record IDs. The IDs of the records to delete. |

Output fields:

- `success`: Success (boolean)
- `code`: Code (number)
- `message`: Message

### `apitable_list_spaces`

**List Spaces.** Lists every space (workspace) the authenticated AITable account can access, returning each space's ID and name. Use to discover a space ID before listing its datasheets. Idempotent: it only reads data. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `success`: Success (boolean)
- `code`: Code (number)
- `message`: Message
- `data`: Data
- `data.spaces`: Spaces
- `data.spaces[].id`: Space ID
- `data.spaces[].name`: Name
- `data.spaces[].isAdmin`: Is Admin (boolean)

### `apitable_list_datasheets`

**List Datasheets.** Lists the datasheets in an AITable space, returning each datasheet's ID and name. Use to discover a datasheet ID before creating, finding, updating, or deleting its records. Idempotent: it only reads data. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The AITable workspace that holds your datasheet. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `code`: Code (number)
- `message`: Message
- `data`: Data
- `data.nodes`: Datasheets
- `data.nodes[].id`: Node ID
- `data.nodes[].name`: Name
- `data.nodes[].type`: Type
- `data.nodes[].icon`: Icon
- `data.nodes[].isFav`: Favorite (boolean)
- `data.nodes[].permission`: Permission (number)
- `data.nodes[].parentId`: Parent ID

### `apitable_get_datasheet_fields`

**Get Datasheet Fields.** Reads the field (column) definitions of an AITable datasheet, including each field's name, type, and the option list for select/member fields. Use before creating or updating records to learn the valid field names and choices for that datasheet. Idempotent: it only reads data. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The AITable workspace that holds your datasheet. A value the product loads from the provider, such as an id; write the value itself. |
| `datasheet_id` | string | yes |  | Datasheet. The table inside the space. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `code`: Code (number)
- `message`: Message
- `data`: Data
- `data.fields`: Fields
- `data.fields[].id`: Field ID
- `data.fields[].name`: Name
- `data.fields[].type`: Type
- `data.fields[].editable`: Editable (boolean)
- `data.fields[].isPrimary`: Primary Field (boolean)
- `data.fields[].property`: Property
- `data.fields[].property.defaultValue`: Default Value
- `data.fields[].property.options`: Options
- `data.fields[].property.options[].id`: ID
- `data.fields[].property.options[].name`: Name
- `data.fields[].property.options[].color`: Color
- `data.fields[].property.options[].color.name`: Name
- `data.fields[].property.options[].color.value`: Value

### `apitable_list_views`

**List Views.** Lists the views (Grid, Kanban, Gallery, etc.) of an AITable datasheet, returning each view's ID, name, and type. Use to discover a view ID to scope Find Records to that view's rows and sort order. Idempotent: it only reads data. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The AITable workspace that holds your datasheet. A value the product loads from the provider, such as an id; write the value itself. |
| `datasheet_id` | string | yes |  | Datasheet. The table inside the space. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `code`: Code (number)
- `message`: Message
- `data`: Data
- `data.views`: Views
- `data.views[].id`: View ID
- `data.views[].name`: Name
- `data.views[].type`: Type

### `apitable_upload_attachment`

**Upload Attachment.** Uploads a single file to an AITable datasheet and returns its stored token and URL. Use to obtain the URL for a file before writing it into an Attachment field with Create Record or Update Record. Not idempotent: each call stores a new file, so repeating it duplicates the upload. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The AITable workspace that holds your datasheet. A value the product loads from the provider, such as an id; write the value itself. |
| `datasheet_id` | string | yes |  | Datasheet. The table inside the space. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to upload. Files are not supported; an action that needs one fails. |

Output fields:

- `success`: Success (boolean)
- `code`: Code (number)
- `message`: Message
- `data`: Data
- `data.token`: Token
- `data.name`: File Name
- `data.mimeType`: MIME Type
- `data.size`: Size (filesize)
- `data.width`: Width (number)
- `data.height`: Height (number)
- `data.url`: URL (url)

### `apitable_search_nodes`

**Search Nodes.** Searches every file node in an AITable space by type and/or name query, regardless of folder hierarchy; returns id, name, type and parent for each match. Use to find folders, forms, dashboards, or mirrors that List Datasheets does not surface since it only returns datasheets. Idempotent: it only reads data. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The AITable workspace that holds your datasheet. A value the product loads from the provider, such as an id; write the value itself. |
| `type` | string | yes |  | Node Type. The type of node to search for. One of `"Datasheet"`, `"Folder"`, `"Form"`, `"Dashboard"`, `"Mirror"`. |
| `query` | string | no |  | Name Query. Filter results to node names containing this text. |

Output fields:

- `success`: Success (boolean)
- `code`: Code (number)
- `message`: Message
- `data`: Data
- `data.nodes`: Nodes
- `data.nodes[].id`: Node ID
- `data.nodes[].name`: Name
- `data.nodes[].type`: Type
- `data.nodes[].icon`: Icon
- `data.nodes[].isFav`: Favorite (boolean)
- `data.nodes[].permission`: Permission (number)
- `data.nodes[].parentId`: Parent ID

### `apitable_get_node_details`

**Get Node Details.** Reads a single AITable node (datasheet, folder, form, dashboard, etc.) by ID, returning its name, type, and, for a folder, the child nodes inside it. Use to confirm a node's type or list a folder's contents; obtain the node ID from Search Nodes or List Datasheets. Idempotent: it only reads data. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The AITable workspace that holds your datasheet. A value the product loads from the provider, such as an id; write the value itself. |
| `node_id` | string | yes |  | Node ID. The ID of the node to read. |

Output fields:

- `success`: Success (boolean)
- `code`: Code (number)
- `message`: Message
- `data`: Node
- `data.id`: Node ID
- `data.name`: Name
- `data.type`: Type
- `data.icon`: Icon
- `data.isFav`: Favorite (boolean)
- `data.permission`: Permission (number)
- `data.children`: Children
- `data.children[].id`: Node ID
- `data.children[].name`: Name
- `data.children[].type`: Type
- `data.children[].icon`: Icon
- `data.children[].isFav`: Favorite (boolean)
- `data.children[].permission`: Permission (number)

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

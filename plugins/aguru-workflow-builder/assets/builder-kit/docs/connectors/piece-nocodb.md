# NocoDB

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-nocodb'
  version: '0.5.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> 1. Log in to your NocoDB Account.
> 2. Click on your profile-pic(bottom-left) and navigate to **Account Settings->Tokens**.
> 3. Create new token with any name and copy API Token.
> 4. Your Base URL is where your app is hosted.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes | `"https://app.nocodb.com"` | NocoDB Base URL. |
| `apiToken` | string | yes |  | API Token. |
| `version` | string | no | `0` | API Version. Required only for self-hosted instances. Not needed for the cloud version. One of `1`, `2`, `3`, `4`. |

## Actions

### `nocodb-create-record`

**Create a Record.** Inserts a new row into a specific NocoDB table, with column values supplied as fields. Use when an agent needs to add data to a base; the target table is required and the create is determined by base/table plus the provided column values. Not idempotent: each call appends another record, so repeating it creates duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | no |  | Workspace ID. For self-hosted instances,select "No Workspace". A value the product loads from the provider, such as an id; write the value itself. |
| `baseId` | string | yes |  | Base ID. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. A value the product loads from the provider, such as an id; write the value itself. |
| `tableColumns` | object | yes |  | Table Columns. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `Id`: ID (number)
- `id`: ID (API v4)
- `fields`: Fields (API v4) (an object whose keys vary)

### `nocodb-delete-record`

**Delete a Record.** Permanently removes a single row from a NocoDB table, identified by its numeric Record ID within the chosen base and table. Use when an agent needs to delete a known record. Idempotent: repeating the call with the same Record ID leaves the record absent and produces no additional effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | no |  | Workspace ID. For self-hosted instances,select "No Workspace". A value the product loads from the provider, such as an id; write the value itself. |
| `baseId` | string | yes |  | Base ID. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | number | yes |  | Record ID. |

Output fields:

- `Id`: ID (number)
- `id`: ID (API v4)
- `fields`: Fields (API v4) (an object whose keys vary)

### `nocodb-update-record`

**Update a Record.** Patches an existing NocoDB row identified by its numeric Record ID, overwriting only the supplied column values within the chosen base and table. Use when an agent needs to modify a record it already knows by ID. Idempotent: re-applying the same field values to the same Record ID yields the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | no |  | Workspace ID. For self-hosted instances,select "No Workspace". A value the product loads from the provider, such as an id; write the value itself. |
| `baseId` | string | yes |  | Base ID. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | number | yes |  | Record ID. |
| `tableColumns` | object | yes |  | Table Columns. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `Id`: ID (number)
- `id`: ID (API v4)
- `fields`: Fields (API v4) (an object whose keys vary)

### `nocodb-get-record`

**Get a Record.** Fetches a single NocoDB row by its numeric Record ID from the chosen base and table. Use when an agent already knows the exact Record ID and needs that row's current field values; to find records by criteria instead, use Search Records. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | no |  | Workspace ID. For self-hosted instances,select "No Workspace". A value the product loads from the provider, such as an id; write the value itself. |
| `baseId` | string | yes |  | Base ID. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | number | yes |  | Record ID. |

Output fields:

- `Id`: ID (number)
- `Title`: Title
- `CreatedAt`: Created At (datetime)
- `UpdatedAt`: Updated At (datetime)
- `id`: ID (API v4)
- `fields`: Fields (API v4) (an object whose keys vary)

### `nocodb-search-records`

**Search Records.** Lists rows from a NocoDB table within the chosen base, optionally narrowed by a Where filter expression and ordered by a Sort field list; leaving the Where condition empty returns all records up to the Limit. Use when an agent needs to find or browse records by criteria rather than by a known Record ID. Idempotent read-only query. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | no |  | Workspace ID. For self-hosted instances,select "No Workspace". A value the product loads from the provider, such as an id; write the value itself. |
| `baseId` | string | yes |  | Base ID. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. A value the product loads from the provider, such as an id; write the value itself. |
| `columnId` | array | no |  | Fields. Allows you to specify the fields that you wish to include in your API response. By default, all the fields are included in the response. Values the product loads from the provider, such as ids; write an array of them. |
| `whereCondition` | string | no |  | Where. Enables you to define specific conditions for filtering records.See docs [here](https://docs.nocodb.com/0.109.7/developer-resources/rest-apis/#comparison-operators). |
| `limit` | number | yes | `10` | Limit. Enables you to set a limit on the number of records you want to retrieve. |
| `sort` | string | no |  | Sort. Comma separated field names without space.Example: **field1,-field2** will sort the records first by 'field1' in ascending order and then by 'field2' in descending order. |

Output fields:

- `[].Id`: ID (number)
- `[].Title`: Title
- `[].CreatedAt`: Created At (datetime)
- `[].UpdatedAt`: Updated At (datetime)
- `[].id`: ID (API v4)
- `[].fields`: Fields (API v4) (an object whose keys vary)

### `nocodb-get-current-user`

**Get Current User.** Returns the identity, email, and roles of the account the connection belongs to, optionally scoped to a base. Use to confirm which account is authenticated or to check its role before a write. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseId` | string | no |  | Base ID. |

Output fields:

- `id`: ID
- `email`: Email (email)
- `display_name`: Display Name
- `is_api_token`: Is API Token (boolean)
- `is_new_user`: Is New User (boolean)
- `isAuthorized`: Is Authorized (boolean)
- `roles`: Roles (an object whose keys vary)

### `nocodb-list-workspaces`

**List Workspaces.** Lists the Cloud/Enterprise workspaces the account belongs to, used to resolve a workspace ID before listing its bases. On self-hosted Community Edition, workspaces do not exist and this returns an empty list rather than an error. Idempotent read-only query. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `list`: List
- `list[].id`: ID
- `list[].title`: Title
- `list[].description`: Description
- `list[].status`: Status (number)
- `pageInfo`: Page Info
- `pageInfo.totalRows`: Total Rows (number)
- `pageInfo.page`: Page (number)
- `pageInfo.pageSize`: Page Size (number)
- `pageInfo.isFirstPage`: Is First Page (boolean)
- `pageInfo.isLastPage`: Is Last Page (boolean)

### `nocodb-list-bases`

**List Bases.** Lists bases (projects), used to resolve a Base ID before listing its tables. Pass a workspace ID from List Workspaces, or leave it unset on self-hosted instances. Idempotent read-only query. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | no |  | Workspace ID. Leave unset on self-hosted instances. |

Output fields:

- `list`: List
- `list[].id`: ID
- `list[].title`: Title
- `list[].prefix`: Prefix
- `list[].status`: Status
- `list[].description`: Description
- `list[].color`: Color
- `list[].type`: Type
- `list[].default_role`: Default Role
- `list[].created_at`: Created At (datetime)
- `list[].updated_at`: Updated At (datetime)
- `list[].last_accessed`: Last Accessed (datetime)
- `pageInfo`: Page Info
- `pageInfo.totalRows`: Total Rows (number)
- `pageInfo.page`: Page (number)
- `pageInfo.pageSize`: Page Size (number)
- `pageInfo.isFirstPage`: Is First Page (boolean)
- `pageInfo.isLastPage`: Is Last Page (boolean)

### `nocodb-get-table-schema`

**Get Table Schema.** Returns a table's columns (name, id, type, and select options) and metadata. Use before creating or updating a record to see which fields exist and what values they accept, or to resolve a column ID for the view-column actions. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseId` | string | yes |  | Base ID. |
| `tableId` | string | yes |  | Table ID. |

Output fields:

- `id`: Table ID
- `base_id`: Base ID
- `table_name`: Table Name
- `title`: Title
- `enabled`: Enabled (boolean)
- `order`: Order (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `description`: Description
- `views`: Views
- `views[].id`: View ID
- `views[].title`: Title
- `views[].type`: Type (number)
- `views[].is_default`: Is Default (boolean)
- `views[].show_system_fields`: Show System Fields (boolean)
- `views[].order`: Order (number)
- `views[].created_at`: Created At (datetime)
- `views[].updated_at`: Updated At (datetime)
- `views[].description`: Description
- `columns`: Columns
- `columns[].id`: Column ID
- `columns[].title`: Title
- `columns[].column_name`: Column Name
- `columns[].uidt`: UI Data Type
- `columns[].pk`: Primary Key (boolean)
- `columns[].pv`: Primary Value (boolean)
- `columns[].rqd`: Required (boolean)
- `columns[].system`: System (boolean)
- `columns[].readonly`: Readonly (boolean)
- `columns[].order`: Order (number)
- `columns[].description`: Description
- `fields`: Fields (API v4)
- `fields[].id`: Column ID
- `fields[].title`: Title
- `fields[].type`: Type

### `nocodb-list-view-sorts`

**List View Sorts.** Lists the field/direction sort rules applied to a view. Use to inspect a view's current ordering before changing it. Idempotent read-only query. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `viewId` | string | yes |  | View ID. |

Output fields:

- `list`: List
- `list[].id`: Sort ID
- `list[].fk_column_id`: Column ID
- `list[].direction`: Direction

### `nocodb-create-grid-view`

**Create Grid View.** Creates a new grid view on a table with the given title. Use when an agent needs a dedicated view to configure (columns, sort) separately from the table's default view. Not idempotent: each call creates another view. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. |
| `title` | string | yes |  | Title. |

Output fields:

- `base_id`: Base ID
- `fk_model_id`: Table ID
- `id`: View ID
- `title`: Title
- `type`: Type (number)
- `is_default`: Is Default (boolean)
- `show_system_fields`: Show System Fields (boolean)
- `order`: Order (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `description`: Description

### `nocodb-list-view-columns`

**List View Columns.** Lists a view's columns along with their visibility, order, and view-scoped column ID. That ID is required by Update View Column and is different from the table column ID returned by Get Table Schema. Idempotent read-only query. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `viewId` | string | yes |  | View ID. |

Output fields:

- `list`: List
- `list[].id`: View Column ID
- `list[].fk_column_id`: Column ID
- `list[].label`: Label
- `list[].show`: Show (boolean)
- `list[].order`: Order (number)

### `nocodb-update-view-column`

**Update View Column.** Updates a column's visibility and/or order within a specific view, identified by the view-scoped column ID from List View Columns (not the table column ID). Use to curate what an agent or user sees in a view. Idempotent: re-applying the same show/order state yields the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `viewId` | string | yes |  | View ID. |
| `columnId` | string | yes |  | View Column ID. The view-scoped column ID from List View Columns, not the table column ID. |
| `show` | boolean | no |  | Show. |
| `order` | number | no |  | Order. |

### `nocodb-delete-view`

**Delete View.** Permanently deletes a view by its ID. Only removes the view itself, not the underlying table or its records. Not idempotent: deleting an already-deleted view fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `viewId` | string | yes |  | View ID. |

### `nocodb-list-notifications`

**List Notifications.** Lists the authenticated account's notifications. Leave Read Only unset to return all notifications regardless of read state, or check it to return only already-read ones; there is no unread-only filter. Use to check for recent activity across bases the account has access to. Idempotent read-only query. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `isRead` | boolean | no |  | Read Only. When checked, returns only already-read notifications. Leave unchecked to return all notifications (read and unread) — there is no unread-only filter. |
| `limit` | number | no | `25` | Limit. |
| `offset` | number | no | `0` | Offset. |

Output fields:

- `list`: List
- `list[].id`: ID
- `list[].type`: Type
- `list[].body`: Body
- `list[].is_read`: Is Read (boolean)
- `list[].created_at`: Created At (datetime)
- `pageInfo`: Page Info
- `pageInfo.totalRows`: Total Rows (number)
- `pageInfo.page`: Page (number)
- `pageInfo.pageSize`: Page Size (number)
- `pageInfo.isFirstPage`: Is First Page (boolean)
- `pageInfo.isLastPage`: Is Last Page (boolean)
- `unreadCount`: Unread Count (number)

### `nocodb-get-shared-view-grouped-data`

**Get Shared View Grouped Data.** Reads a public shared-view link's records grouped by a column, without requiring an authenticated connection to the base. Needs the shared view's UUID (from the view's share link) and the column ID to group by; pass the share password if the link is password-protected. Idempotent read-only query. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sharedViewUuid` | string | yes |  | Shared View UUID. The UUID from the view's public share link. |
| `columnId` | string | yes |  | Column ID. The table column ID to group records by. |
| `password` | string | no |  | Share Password. Only required if the shared view link is password-protected. |

Output fields:

- `[].key`: Key
- `[].value`: Value
- `[].value.list`: List
- `[].value.list[].Id`: ID (number)
- `[].value.list[].Title`: Title
- `[].value.pageInfo`: Page Info
- `[].value.pageInfo.totalRows`: Total Rows (number)
- `[].value.pageInfo.page`: Page (number)
- `[].value.pageInfo.pageSize`: Page Size (number)
- `[].value.pageInfo.isFirstPage`: Is First Page (boolean)
- `[].value.pageInfo.isLastPage`: Is Last Page (boolean)

### `nocodb-upload-attachment-by-url`

**Upload Attachment By URL.** Fetches a file from a public URL and stores it in NocoDB storage, returning the attachment metadata to place into an attachment column value on a subsequent create/update record call. Not idempotent: each call stores another copy of the file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | File URL. |
| `path` | string | yes |  | Target Path. The storage path to upload to, e.g. download/noco/<base>/<table>/attachment. |
| `title` | string | no |  | Title. Display name for the attachment. |
| `mimetype` | string | no |  | MIME Type. |

Output fields:

- `[].url`: URL (image)
- `[].title`: Title
- `[].mimetype`: Mimetype
- `[].size`: Size (filesize)
- `[].width`: Width (number)
- `[].height`: Height (number)
- `[].signedUrl`: Signed URL (image)

# monday.com

Work operating system for businesses

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-monday'
  version: '0.4.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API v2 Token

> 1.Log into your monday.com account.
>
> 2.Click on your avatar/profile picture in the top right corner.
>
> 3.Select **Administration** (this requires you to have admin permissions).
>
> 4.Go to the **API** section.
>
> 5.Copy your personal token

## Actions

### `monday_create_column`

**Create Column.** Adds a new column of a chosen type (text, status, date, number, etc.) to a monday.com board. Use to extend a board's structure before writing data into it. Not idempotent: each call creates a separate column even with the same title. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. A value the product loads from the provider, such as an id; write the value itself. |
| `board_id` | string | yes |  | Board ID. A value the product loads from the provider, such as an id; write the value itself. |
| `column_title` | string | yes |  | Column Title. |
| `column_type` | string | yes |  | Column Type. One of `"auto_number"`, `"color_picker"`, `"checkbox"`, `"country"`, `"creation_log"`, `"date"`, `"dropdown"`, `"email"`, `"hour"`, `"item_id"`, `"last_updated"`, `"link"`, `"location"`, `"long_text"`, `"numbers"`, `"people"`, `"phone"`, `"progress"`, `"rating"`, `"status"`, `"tags"`, `"text"`, `"timeline"`, `"time_tracking"`, `"vote"` and 2 more. |

Output fields:

- `data.create_column.id`: Column ID

### `monday_create_group`

**Create Group.** Creates a new group (section that holds items) on a monday.com board. Use to organize items under a named section before adding them. Not idempotent: each call creates a separate group even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. A value the product loads from the provider, such as an id; write the value itself. |
| `board_id` | string | yes |  | Board ID. A value the product loads from the provider, such as an id; write the value itself. |
| `group_name` | string | yes |  | Group Name. |

Output fields:

- `data.create_group.id`: Group ID

### `monday_create_item`

**Create Item.** Creates a new item (row) on a monday.com board, optionally placed in a group and pre-populated with column values that are auto-coerced to each column's type. Use to add a record to a board. Requires the board id and an item name; enable create-labels-if-missing only when allowed to modify board structure. Not idempotent: each call creates a separate item. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. A value the product loads from the provider, such as an id; write the value itself. |
| `board_id` | string | yes |  | Board ID. A value the product loads from the provider, such as an id; write the value itself. |
| `group_id` | string | no |  | Board Group ID. A value the product loads from the provider, such as an id; write the value itself. |
| `item_name` | string | yes |  | Item Name. Item Name. |
| `column_values` | object | yes |  | Columns. An object whose fields depend on other inputs; the product shows them. |
| `create_labels_if_missing` | boolean | no | `false` | Create Labels if Missing. Creates status/dropdown labels if they are missing. This requires permission to change the board structure. |

Output fields:

- `data.create_item.id`: Item ID

### `monday_create_update`

**Create Update.** Posts an update (a comment/note in the item's update feed) to a monday.com item identified by item id. Use to add a message or log to an item. Not idempotent: each call appends a new update. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_id` | string | yes |  | Item ID. |
| `body` | string | yes |  | Body. |

Output fields:

- `data.create_update.id`: Update ID

### `monday_get_board_values`

**Get Board Values.** Retrieves all items on a monday.com board with their column values, optionally narrowed to specific column ids. Use to read or list the rows of a board. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. A value the product loads from the provider, such as an id; write the value itself. |
| `board_id` | string | yes |  | Board ID. A value the product loads from the provider, such as an id; write the value itself. |
| `column_ids` | array | no |  | Column IDs. Limit data output by specifying column IDs; leave empty to display all columns. Values the product loads from the provider, such as ids; write an array of them. |

### `monday_get_item_column_values`

**Get an Item's Column Values.** Retrieves the column values for a single monday.com item identified by board and item id, optionally limited to specific column ids. Use to read one item's field values. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. A value the product loads from the provider, such as an id; write the value itself. |
| `board_id` | string | yes |  | Board ID. A value the product loads from the provider, such as an id; write the value itself. |
| `item_id` | string | yes |  | Item ID. A value the product loads from the provider, such as an id; write the value itself. |
| `column_ids` | array | no |  | Column IDs. Limit data output by specifying column IDs; leave empty to display all columns. Values the product loads from the provider, such as ids; write an array of them. |

### `monday_update_column_values_of_item`

**Update Column Values of Specific Item.** Updates one or more column values on an existing monday.com item identified by board and item id; provided values are auto-coerced to each column's type. Use to edit an item's fields. Idempotent: re-applying the same values leaves the item in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. A value the product loads from the provider, such as an id; write the value itself. |
| `board_id` | string | yes |  | Board ID. A value the product loads from the provider, such as an id; write the value itself. |
| `item_id` | string | yes |  | Item ID. A value the product loads from the provider, such as an id; write the value itself. |
| `column_values` | object | yes |  | Columns. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `data.change_multiple_column_values.id`: Item ID
- `data.change_multiple_column_values.name`: Item Name

### `monday_update_item_name`

**Update Item Name.** Renames an existing monday.com item identified by board and item id. Use to change an item's title. Idempotent: re-applying the same name leaves the item unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. A value the product loads from the provider, such as an id; write the value itself. |
| `board_id` | string | yes |  | Board ID. A value the product loads from the provider, such as an id; write the value itself. |
| `item_id` | string | yes |  | Item ID. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | New Item name. |

Output fields:

- `data.change_multiple_column_values.id`: Item ID
- `data.change_multiple_column_values.name`: Item Name

### `monday_upload_file_to_column`

**Upload File to Column.** Uploads a file (from URL or base64) and attaches it to a file-type column on a monday.com item, identified by board, item, and file column id. Use to add an attachment to an item. Not idempotent: each call uploads and attaches another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. A value the product loads from the provider, such as an id; write the value itself. |
| `board_id` | string | yes |  | Board ID. A value the product loads from the provider, such as an id; write the value itself. |
| `item_id` | string | yes |  | Item ID. A value the product loads from the provider, such as an id; write the value itself. |
| `file_column_id` | string | yes |  | File Column ID. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file URL or base64 to upload. Files are not supported; an action that needs one fails. |
| `file_name` | string | yes |  | File Name. |

Output fields:

- `data.add_file_to_column.id`: File ID
- `data.add_file_to_column.url`: File URL (url)
- `data.add_file_to_column.name`: File Name
- `data.add_file_to_column.file_size`: File Size (filesize)
- `data.add_file_to_column.file_extension`: File Extension
- `data.add_file_to_column.created_at`: Created At (datetime)

### `monday_add_teams_to_board`

**Add Teams to Board.** Give whole teams access to a monday.com board as subscribers or owners. Use to share a board with a team; to share with individual people use Add Users to Board. Requires board-owner rights. Re-adding teams already on the board leaves them unchanged, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `team_ids` | array | yes |  | Team IDs. Numeric team IDs. Resolve them with List Teams. |
| `kind` | string | yes | `"subscriber"` | Role. One of `"subscriber"`, `"owner"`. |

Output fields:

- `board_id`: Board ID
- `teams`: Teams
- `teams[].id`: Team ID
- `teams[].name`: Team Name
- `count`: Count (number)

### `monday_add_users_to_board`

**Add Users to Board.** Give users access to a monday.com board as subscribers or owners. Use to share a board with specific people; to share with a whole team use Add Teams to Board. Requires board-owner rights. It sets each user role to the chosen kind, so adding an existing owner as a subscriber demotes them; repeating the same call is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `user_ids` | array | yes |  | User IDs. Numeric user IDs. Resolve them with List Users. |
| `kind` | string | yes | `"subscriber"` | Role. One of `"subscriber"`, `"owner"`. |

Output fields:

- `board_id`: Board ID
- `role`: Role
- `users`: Users
- `users[].id`: User ID
- `users[].name`: User Name
- `users[].email`: Email (email)
- `count`: Count (number)

### `monday_archive_board`

**Archive Board.** Archive a monday.com board so it leaves active views but can be restored from the archive in the monday.com UI. Prefer this over Delete Board when a board is no longer needed. Fails if the board is already archived. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |

Output fields:

- `id`: Board ID
- `name`: Board Name
- `state`: State

### `monday_create_board`

**Create Board.** Create a new monday.com board, optionally inside a workspace and folder or from a template. Use to start a new board; to copy an existing board with its structure or items use Duplicate Board instead. Each call creates another board, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_name` | string | yes |  | Board Name. |
| `board_kind` | string | yes | `"public"` | Board Kind. Who can see the board. One of `"public"`, `"private"`, `"share"`. |
| `description` | string | no |  | Description. |
| `workspace_id` | string | no |  | Workspace ID. Workspace to create the board in. Resolve it with List Workspaces. Omit for the main workspace. |
| `folder_id` | string | no |  | Folder ID. Folder to place the board in; must belong to the workspace. Resolve it with List Folders. |
| `template_id` | string | no |  | Template ID. Board or template ID to create the board from. |
| `board_owner_ids` | array | no |  | Owner User IDs. Users to add as board owners. Resolve them with List Users. |
| `board_subscriber_ids` | array | no |  | Subscriber User IDs. Users to add as board subscribers. Resolve them with List Users. |

Output fields:

- `id`: Board ID
- `name`: Board Name
- `description`: Description
- `state`: State
- `board_kind`: Board Kind
- `url`: Board URL (url)
- `workspace_id`: Workspace ID
- `folder_id`: Folder ID

### `monday_delete_board`

**Delete Board.** Delete a monday.com board together with all its groups, items and updates. Destructive: only use when the user explicitly asks to delete; prefer Archive Board, which is recoverable. Requires board-owner rights; a retry after success fails because the board is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |

Output fields:

- `id`: Board ID
- `name`: Board Name
- `state`: State

### `monday_duplicate_board`

**Duplicate Board.** Copy an existing monday.com board: structure only, structure plus items, or structure plus items and updates. Use to clone a template-like board; to start from scratch use Create Board. Large boards are duplicated asynchronously, so items may appear shortly after the call returns. Each call creates another board. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `duplicate_type` | string | yes | `"duplicate_board_with_structure"` | What to Copy. One of `"duplicate_board_with_structure"`, `"duplicate_board_with_pulses"`, `"duplicate_board_with_pulses_and_updates"`. |
| `board_name` | string | no |  | New Board Name. Defaults to "Duplicate of <original name>". |
| `workspace_id` | string | no |  | Workspace ID. Destination workspace. Defaults to the original board’s workspace. |
| `folder_id` | string | no |  | Folder ID. Destination folder. Defaults to the original board’s folder. |
| `keep_subscribers` | boolean | no | `false` | Keep Subscribers. |

Output fields:

- `id`: New Board ID
- `name`: New Board Name
- `url`: New Board URL (url)
- `workspace_id`: Workspace ID
- `source_board_id`: Source Board ID

### `monday_get_board_activity_logs`

**Get Board Activity Logs.** Read the activity log of a monday.com board: who changed what and when (column value changes, item creation, moves, deletes). Narrow by time range, users, items, groups or columns. Use to audit recent changes; to read comments use List Item Updates. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `from` | ISO date-time string | no |  | From. Only logs at or after this time (ISO 8601). |
| `to` | ISO date-time string | no |  | To. Only logs at or before this time (ISO 8601). |
| `item_ids` | array | no |  | Item IDs. |
| `user_ids` | array | no |  | User IDs. |
| `group_ids` | array | no |  | Group IDs. |
| `column_ids` | array | no |  | Column IDs. |
| `limit` | number | no | `25` | Limit. Logs per page (default 25). |
| `page` | number | no | `1` | Page. |

Output fields:

- `activity_logs`: Activity Logs
- `activity_logs[].id`: Log ID
- `activity_logs[].event`: Event
- `activity_logs[].entity`: Entity
- `activity_logs[].user_id`: User ID
- `activity_logs[].account_id`: Account ID
- `activity_logs[].created_at`: Created At (datetime)
- `activity_logs[].data`: Event Data
- `count`: Count (number)

### `monday_list_board_views`

**List Board Views.** List the views (table, kanban, form, dashboard, etc.) configured on a monday.com board, with their type and access level. Use to discover a board’s views or find a form view. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |

Output fields:

- `views`: Views
- `views[].id`: View ID
- `views[].name`: View Name
- `views[].type`: View Type
- `views[].access_level`: Access Level
- `views[].source_view_id`: Source View ID
- `views[].board_id`: Board ID
- `count`: Count (number)

### `monday_list_boards`

**List Boards.** List monday.com boards the connected user can access, with their workspace, folder, owners and item count. Use to resolve a board name to the board ID that every item, column and group action needs. Filter by workspace IDs or board IDs; paginate with page and limit. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_ids` | array | no |  | Workspace IDs. Only return boards in these workspaces. Resolve them with List Workspaces. |
| `board_ids` | array | no |  | Board IDs. Only return these boards. |
| `state` | string | no | `"active"` | State. One of `"active"`, `"archived"`, `"deleted"`, `"all"`. |
| `board_kind` | string | no |  | Board Kind. One of `"public"`, `"private"`, `"share"`. |
| `limit` | number | no | `50` | Limit. Boards per page (default 50). |
| `page` | number | no | `1` | Page. Page number, starting at 1. |

Output fields:

- `boards`: Boards
- `boards[].id`: Board ID
- `boards[].name`: Board Name
- `boards[].description`: Description
- `boards[].state`: State
- `boards[].board_kind`: Board Kind
- `boards[].url`: Board URL (url)
- `boards[].workspace_id`: Workspace ID
- `boards[].folder_id`: Folder ID
- `boards[].items_count`: Items Count (number)
- `boards[].updated_at`: Updated At (datetime)
- `boards[].owner_ids`: Owner IDs
- `boards[].owner_names`: Owner Names
- `count`: Count (number)

### `monday_remove_board_subscribers`

**Remove Users from Board.** Revoke users' subscriber or owner access to a monday.com board. Use to unshare a board with specific people; to remove a whole team use Remove Teams from Board. Requires board-owner rights. Removing users who are no longer members has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `user_ids` | array | yes |  | User IDs. Numeric user IDs. Resolve them with List Users. |

Output fields:

- `board_id`: Board ID
- `removed_users`: Removed Users
- `removed_users[].id`: User ID
- `removed_users[].name`: User Name
- `count`: Count (number)

### `monday_remove_teams_from_board`

**Remove Teams from Board.** Revoke whole teams' access to a monday.com board. Use to unshare a board with a team; to remove individual people use Remove Users from Board. Requires board-owner rights. Removing teams that are no longer on the board has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `team_ids` | array | yes |  | Team IDs. Numeric team IDs. Resolve them with List Teams. |

Output fields:

- `board_id`: Board ID
- `removed_teams`: Removed Teams
- `removed_teams[].id`: Team ID
- `removed_teams[].name`: Team Name
- `count`: Count (number)

### `monday_update_board_hierarchy`

**Move Board.** Move a monday.com board to a different workspace, folder, or account product. Only the destinations you provide are changed. To rename a board or edit its description use Update Board. Requires board-owner rights in both places; moving to the same destination again is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `workspace_id` | string | no |  | Destination Workspace ID. Resolve it with List Workspaces. |
| `folder_id` | string | no |  | Destination Folder ID. Must belong to the destination workspace. Resolve it with List Folders. |
| `account_product_id` | string | no |  | Account Product ID. The account product (e.g. work management, CRM) to move the board to. Requires the destination workspace ID too. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `board_id`: Board ID
- `workspace_id`: Workspace ID
- `folder_id`: Folder ID

### `monday_update_board`

**Update Board.** Change one attribute of an existing monday.com board: its name, description, or communication value. Only the chosen attribute is changed. To move a board to another workspace or folder use Update Board Hierarchy. Setting the same value again leaves the board unchanged, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `board_attribute` | string | yes |  | Attribute. One of `"name"`, `"description"`, `"communication"`. |
| `new_value` | string | yes |  | New Value. |

Output fields:

- `board_id`: Board ID
- `attribute`: Updated Attribute
- `new_value`: New Value
- `success`: Success (boolean)

### `monday_add_board_column`

**Add Board Column.** Add a new column to a monday.com board by type (e.g. text, status, date, numbers, people, dropdown, long_text, email, link). Optionally set a description, position it after another column, and pass type defaults such as status labels (shape from Get Column Type Schema). Check List Columns first to avoid duplicates; each call creates a new column. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `title` | string | yes |  | Title. |
| `column_type` | string | yes |  | Column Type. monday.com column type, e.g. text, long_text, status, dropdown, date, timeline, numbers, people, email, phone, link, checkbox, rating, tags, file. |
| `description` | string | no |  | Description. |
| `after_column_id` | string | no |  | After Column ID. Place the new column after this column ID. Leave empty to append. |
| `defaults` | JSON | no |  | Defaults. Type-specific settings, e.g. {"labels": {"1": "Done", "2": "Stuck"}} for status. See Get Column Type Schema. |

Output fields:

- `id`: Column ID
- `board_id`: Board ID
- `title`: Title
- `type`: Type
- `description`: Description

### `monday_delete_column`

**Delete Column.** Delete a column from a monday.com board, removing that column's values from every item. Cannot be undone through the API; to only rename use Update Column. A retry after success fails because the column no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `column_id` | string | yes |  | Column ID. The column ID (e.g. "status", "date4"). Resolve it with List Columns. |

Output fields:

- `id`: Column ID
- `board_id`: Board ID
- `deleted`: Deleted (boolean)

### `monday_get_column_type_schema`

**Get Column Type Schema.** Return the JSON Schema (draft-07) describing the settings/defaults a monday.com column type accepts, e.g. status labels or dropdown options. Use before Add Board Column with defaults so the payload is valid. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `column_type` | string | yes |  | Column Type. monday.com column type, e.g. status, dropdown, date, numbers, people, timeline, rating. |

Output fields:

- `column_type`: Column Type
- `schema`: JSON Schema

### `monday_list_columns`

**List Columns.** List the columns of a monday.com board with each column's ID, title, type, description and settings (e.g. status labels, dropdown options). Call this before writing column values to learn the column IDs and accepted labels; use Get Column Type Schema for the JSON shape of a type. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `column_ids` | array | no |  | Column IDs. Only return these columns. Leave empty for all columns. |

Output fields:

- `board_id`: Board ID
- `columns`: Columns
- `columns[].id`: Column ID
- `columns[].title`: Title
- `columns[].type`: Type
- `columns[].description`: Description
- `columns[].settings`: Settings (JSON)
- `columns[].archived`: Archived (boolean)
- `columns[].width`: Width (number)
- `count`: Count (number)

### `monday_update_column`

**Update Column.** Rename a monday.com board column and/or change its description. Only the fields you provide change; the column type and settings are untouched. Resolve the column ID with List Columns. Re-applying the same values is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `column_id` | string | yes |  | Column ID. The column ID (e.g. "status", "date4"). Resolve it with List Columns. |
| `title` | string | no |  | New Title. Leave empty to keep the current title. |
| `description` | string | no |  | New Description. Leave empty to keep the current description. |

Output fields:

- `id`: Column ID
- `board_id`: Board ID
- `title`: Title
- `description`: Description

### `monday_append_markdown_to_doc`

**Append Markdown to Doc.** Convert markdown (headings, lists, bold, code, quotes, tables) into blocks and add them to an existing monday.com doc, at the end or after a given block ID. Prefer this over Create Doc Block for anything beyond a single block. Not idempotent: each call inserts another copy of the content. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `doc_id` | string | yes |  | Doc ID. The doc ID (not the doc object ID). Resolve it with List Docs. |
| `markdown` | string | yes |  | Markdown. |
| `after_block_id` | string | no |  | After Block ID. Insert the content after this block. Resolve it with Get Doc Blocks. Leave empty to append. |

Output fields:

- `doc_id`: Doc ID
- `success`: Success (boolean)
- `block_ids`: New Block IDs
- `block_count`: Block Count (number)

### `monday_create_doc_block`

**Create Doc Block.** Insert one typed block (text, title, list, quote, code, divider, notice box, table, layout, image, video, page break) into a monday.com doc, at the top or after a given block. The content is the block JSON, e.g. {"deltaFormat":[{"insert":"Hello"}]} for text; tables need column_count and row_count. For multi-block text prefer Append Markdown to Doc. Each call inserts a new block. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `doc_id` | string | yes |  | Doc ID. The doc ID (not the doc object ID). Resolve it with List Docs. |
| `type` | string | yes | `"normal_text"` | Block Type. One of `"normal_text"`, `"large_title"`, `"medium_title"`, `"small_title"`, `"bulleted_list"`, `"numbered_list"`, `"check_list"`, `"quote"`, `"code"`, `"notice_box"`, `"divider"`, `"page_break"`, `"table"`, `"layout"`, `"image"`, `"video"`. |
| `content` | JSON | yes |  | Content. Block content JSON, e.g. {"alignment":"left","direction":"ltr","deltaFormat":[{"insert":"new block"}]}. |
| `after_block_id` | string | no |  | After Block ID. Place the new block after this block. Resolve it with Get Doc Blocks. Leave empty to insert at the top. |
| `parent_block_id` | string | no |  | Parent Block ID. Create the block inside this parent block (e.g. a table cell or layout). |

Output fields:

- `id`: Block ID
- `type`: Type
- `position`: Position (number)
- `parent_block_id`: Parent Block ID
- `content`: Content (JSON)
- `doc_id`: Doc ID

### `monday_create_doc`

**Create Doc.** Create an empty monday.com doc either in a workspace (needs workspace ID and name) or inside a doc column on an item (needs item ID and doc column ID). Add content afterwards with Append Markdown to Doc; to create a doc with content in one step from HTML use Import Doc from HTML. Each call creates a new doc. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | string | yes | `"workspace"` | Location. One of `"workspace"`, `"item"`. |
| `workspace_id` | string | no |  | Workspace ID. Required for the workspace location. Resolve it with List Workspaces. |
| `name` | string | no |  | Doc Name. Required for the workspace location. |
| `kind` | string | no |  | Doc Kind. Access level for a workspace doc (default public). One of `"public"`, `"private"`, `"share"`. |
| `item_id` | string | no |  | Item ID. Required for the item location. Resolve it with List Board Items. |
| `column_id` | string | no |  | Doc Column ID. Required for the item location: the ID of a doc-type column. Resolve it with List Columns. |

Output fields:

- `id`: Doc ID
- `object_id`: Doc Object ID
- `name`: Name
- `url`: URL (url)
- `workspace_id`: Workspace ID

### `monday_delete_doc_block`

**Delete Doc Block.** Delete one block from a monday.com doc by block ID; the rest of the doc is untouched. Resolve the block ID with Get Doc Blocks. Not idempotent: a retry on an already-deleted block errors. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `block_id` | string | yes |  | Block ID. The block to delete. Resolve it with Get Doc Blocks. |

Output fields:

- `id`: Block ID
- `deleted`: Deleted (boolean)

### `monday_delete_doc`

**Delete Doc.** Delete a monday.com doc by its internal doc ID, removing all of its content. Only use when the user explicitly asks to delete the doc. Not idempotent: a retry on an already-deleted doc errors. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `doc_id` | string | yes |  | Doc ID. The doc ID (not the doc object ID). Resolve it with List Docs. |

Output fields:

- `doc_id`: Doc ID
- `deleted`: Deleted (boolean)

### `monday_duplicate_doc`

**Duplicate Doc.** Create an exact copy of an existing monday.com doc, with its content and optionally its updates, and return the new doc ID. Use to start from an existing doc as a template. Each call creates another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `doc_id` | string | yes |  | Doc ID. The doc ID (not the doc object ID). Resolve it with List Docs. |
| `duplicate_type` | string | no | `"duplicate_doc_with_content"` | Duplicate Type. One of `"duplicate_doc_with_content"`, `"duplicate_doc_with_content_and_updates"`. |

Output fields:

- `source_doc_id`: Source Doc ID
- `new_doc_id`: New Doc Object ID

### `monday_export_doc_as_markdown`

**Export Doc as Markdown.** Read a monday.com doc (or only selected block IDs) as a single markdown string. Prefer this over Get Doc Blocks whenever you need to read or summarize the doc content. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `doc_id` | string | yes |  | Doc ID. The doc ID (not the doc object ID). Resolve it with List Docs. |
| `block_ids` | array | no |  | Block IDs. Only export these blocks. Resolve them with Get Doc Blocks. Leave empty for the whole doc. |

Output fields:

- `doc_id`: Doc ID
- `markdown`: Markdown

### `monday_get_doc_blocks`

**Get Doc Blocks.** Fetch the raw content blocks (ID, type, position, parent and JSON content) of a monday.com doc, paginated. Use when you need block IDs to update, delete or insert after a specific block; to read the doc as text prefer Export Doc as Markdown. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `doc_id` | string | yes |  | Doc ID. The doc ID (not the doc object ID). Resolve it with List Docs. |
| `limit` | number | no |  | Limit. Number of blocks per page (default 25). |
| `page` | number | no |  | Page. Page number, starting at 1. |

Output fields:

- `doc_id`: Doc ID
- `blocks`: Blocks
- `blocks[].id`: Block ID
- `blocks[].type`: Type
- `blocks[].position`: Position (number)
- `blocks[].parent_block_id`: Parent Block ID
- `blocks[].content`: Content (JSON)
- `blocks[].created_by_id`: Created By ID
- `blocks[].created_at`: Created At (date)
- `blocks[].updated_at`: Updated At (date)
- `count`: Count (number)

### `monday_import_doc_from_html`

**Import Doc from HTML.** Create a new monday.com doc in a workspace (optionally inside a folder) from HTML; text styles, headings, lists, quotes, tables, code and dividers are converted to doc blocks. Use when you have HTML content; for an empty doc use Create Doc, to add to an existing doc use Append Markdown to Doc. Each call creates a new doc. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. The numeric workspace ID. Resolve it with List Workspaces. |
| `html` | string | yes |  | HTML. |
| `title` | string | no |  | Title. Doc title. If empty, monday.com infers it from the HTML. |
| `folder_id` | string | no |  | Folder ID. The folder ID. Resolve it with List Folders. |
| `kind` | string | no |  | Doc Kind. One of `"public"`, `"private"`, `"share"`. |

Output fields:

- `doc_id`: Doc ID
- `success`: Success (boolean)

### `monday_list_docs`

**List Docs.** List monday.com docs (workdocs) with their internal doc ID, object ID, name, workspace and URL, optionally filtered by workspace IDs, doc IDs or object IDs (the ID in the doc URL). Use to resolve a doc ID for the other doc atomics; to find a doc by keyword use Search. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_ids` | array | no |  | Workspace IDs. Only return docs in these workspaces. Resolve them with List Workspaces. |
| `doc_ids` | array | no |  | Doc IDs. Only return these internal doc IDs. |
| `object_ids` | array | no |  | Object IDs. Only return docs with these object IDs (the ID that appears in the doc URL and in doc column values). |
| `order_by` | string | no |  | Order By. One of `"created_at"`, `"used_at"`. |
| `limit` | number | no |  | Limit. Number of docs per page (default 25). |
| `page` | number | no |  | Page. Page number, starting at 1. |

Output fields:

- `docs`: Docs
- `docs[].id`: Doc ID
- `docs[].object_id`: Doc Object ID
- `docs[].name`: Name
- `docs[].url`: URL (url)
- `docs[].workspace_id`: Workspace ID
- `docs[].doc_kind`: Doc Kind
- `docs[].folder_id`: Folder ID
- `docs[].created_by_id`: Created By ID
- `docs[].created_by_name`: Created By
- `docs[].created_at`: Created At (date)
- `docs[].updated_at`: Updated At (date)
- `count`: Count (number)

### `monday_rename_doc`

**Rename Doc.** Rename an existing monday.com doc by its internal doc ID. Only changes the title, never the content. Safe to retry: re-applying the same name leaves the doc unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `doc_id` | string | yes |  | Doc ID. The doc ID (not the doc object ID). Resolve it with List Docs. |
| `name` | string | yes |  | New Name. |

Output fields:

- `doc_id`: Doc ID
- `name`: Name

### `monday_update_doc_block`

**Update Doc Block.** Replace the JSON content of one existing monday.com doc block by block ID (e.g. {"deltaFormat":[{"insert":"new text"}]}). The block type cannot change and table dimensions cannot be edited. Read the current content first with Get Doc Blocks when you only want to change part of it. Safe to retry: the same content converges on the same block. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `block_id` | string | yes |  | Block ID. The block to update. Resolve it with Get Doc Blocks. |
| `content` | JSON | yes |  | Content. The full new block content JSON. |

Output fields:

- `id`: Block ID
- `type`: Type
- `position`: Position (number)
- `parent_block_id`: Parent Block ID
- `content`: Content (JSON)

### `monday_get_assets`

**Get Assets.** Fetch metadata for monday.com files (assets) by ID: name, size, extension, uploader, an account-restricted URL and a public URL valid for about one hour. Asset IDs appear in file column values (from Get Items) and in upload results. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `asset_ids` | array | yes |  | Asset IDs. Numeric asset IDs. |

Output fields:

- `assets`: Assets
- `assets[].id`: Asset ID
- `assets[].name`: File Name
- `assets[].url`: File URL (url)
- `assets[].public_url`: Public URL (url)
- `assets[].thumbnail_url`: Thumbnail URL (image)
- `assets[].file_extension`: File Extension
- `assets[].file_size`: File Size (filesize)
- `assets[].created_at`: Created At (datetime)
- `assets[].uploaded_by_id`: Uploaded By ID
- `assets[].uploaded_by_name`: Uploaded By Name
- `count`: Count (number)

### `monday_upload_file`

**Upload File.** Upload a file (URL or base64, max 500 MB) to monday.com, attaching it either to a file-type column on an item (Target "column" with Item ID and Column ID) or to an existing update (Target "update" with Update ID). Resolve file column IDs with List Columns. Each call uploads another copy, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes | `"column"` | Target. Where to attach the file. One of `"column"`, `"update"`. |
| `item_id` | string | no |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |
| `column_id` | string | no |  | File Column ID. ID of a file-type column (required when Target is "column"). Resolve it with List Columns. |
| `update_id` | string | no |  | Update ID. The update ID. Resolve it with List Item Updates. |
| `file` | file | yes |  | File. The file URL or base64 to upload. Files are not supported; an action that needs one fails. |
| `file_name` | string | no |  | File Name. Name to store the file under, including extension. Defaults to the source file name. |

Output fields:

- `id`: Asset ID
- `name`: File Name
- `url`: File URL (url)
- `file_extension`: File Extension
- `file_size`: File Size (filesize)
- `created_at`: Created At (datetime)
- `target`: Target
- `target_id`: Target ID

### `monday_create_folder`

**Create Folder.** Create a folder in a monday.com workspace, optionally nested under a parent folder, to organize boards and docs. Use before placing boards with Create Board or Move Board. Each call creates another folder even with the same name, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. The numeric workspace ID. Resolve it with List Workspaces. |
| `name` | string | yes |  | Name. |
| `parent_folder_id` | string | no |  | Parent Folder ID. Nest the new folder under this folder. Resolve it with List Folders. |
| `color` | string | no |  | Color. Folder color enum value, e.g. DONE_GREEN, BRIGHT_BLUE, WORKING_ORANGE, STUCK_RED. |

Output fields:

- `id`: Folder ID
- `name`: Folder Name
- `color`: Color
- `workspace_id`: Workspace ID
- `parent_folder_id`: Parent Folder ID
- `created_at`: Created At (datetime)

### `monday_delete_folder`

**Delete Folder.** Delete a monday.com folder together with ALL boards, docs and sub-folders inside it. Destructive: only use when the user explicitly asks to delete the folder and its contents; to keep the boards, move them out first with Move Board, or archive boards individually with Archive Board. A retry after success fails because the folder is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder ID. The folder ID. Resolve it with List Folders. |

Output fields:

- `id`: Folder ID
- `name`: Folder Name
- `deleted`: Deleted (boolean)

### `monday_list_folders`

**List Folders.** List monday.com folders with their workspace, parent folder, sub-folders and the boards inside them. Use to resolve a folder name to the folder ID needed by Create Board, Move Board and the folder actions. Filter by workspace IDs or folder IDs; max 100 per page. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_ids` | array | no |  | Workspace IDs. Only return folders in these workspaces. Resolve them with List Workspaces. |
| `folder_ids` | array | no |  | Folder IDs. Only return these folders. |
| `limit` | number | no | `25` | Limit. Folders per page (default 25, max 100). |
| `page` | number | no | `1` | Page. |

Output fields:

- `folders`: Folders
- `folders[].id`: Folder ID
- `folders[].name`: Folder Name
- `folders[].color`: Color
- `folders[].created_at`: Created At (datetime)
- `folders[].owner_id`: Owner ID
- `folders[].workspace_id`: Workspace ID
- `folders[].workspace_name`: Workspace Name
- `folders[].parent_folder_id`: Parent Folder ID
- `folders[].parent_folder_name`: Parent Folder Name
- `folders[].sub_folder_ids`: Sub-folder IDs
- `folders[].board_ids`: Board IDs
- `folders[].board_names`: Board Names
- `count`: Count (number)

### `monday_update_folder`

**Update Folder.** Rename, recolor, or move a monday.com folder to another parent folder or workspace. Only the fields you provide are changed; omitted fields keep their current value. Setting the same values again leaves the folder unchanged, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder ID. The folder ID. Resolve it with List Folders. |
| `name` | string | no |  | Name. |
| `color` | string | no |  | Color. Folder color enum value, e.g. DONE_GREEN, BRIGHT_BLUE, WORKING_ORANGE, STUCK_RED. |
| `parent_folder_id` | string | no |  | New Parent Folder ID. Move the folder under this folder. Resolve it with List Folders. |
| `workspace_id` | string | no |  | New Workspace ID. Move the folder to this workspace. Resolve it with List Workspaces. |

Output fields:

- `id`: Folder ID
- `name`: Folder Name
- `color`: Color
- `workspace_id`: Workspace ID
- `parent_folder_id`: Parent Folder ID

### `monday_add_board_group`

**Add Board Group.** Create a new group (section that holds items) on a monday.com board, optionally with a HEX color and positioned before or after an existing group. Check List Groups first to avoid duplicates; each call creates a new group, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `group_name` | string | yes |  | Group Name. Max 255 characters. |
| `group_color` | string | no |  | Group Color. HEX color, e.g. #ff642e. |
| `relative_to` | string | no |  | Relative To Group ID. Position the new group next to this group ID. |
| `position_relative_method` | string | no |  | Position. Place before or after the Relative To group. One of `"before_at"`, `"after_at"`. |

Output fields:

- `id`: Group ID
- `board_id`: Board ID
- `title`: Title
- `color`: Color

### `monday_archive_group`

**Archive Group.** Archive a monday.com group, hiding it and its items from the board while keeping them restorable from the board archive in the monday.com UI. Prefer this over Delete Group when the items may be needed later. Archiving an already-archived group has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `group_id` | string | yes |  | Group ID. The group ID (e.g. "topics"). Resolve it with List Groups. |

Output fields:

- `id`: Group ID
- `board_id`: Board ID
- `title`: Title
- `archived`: Archived (boolean)

### `monday_delete_group`

**Delete Group.** Delete a group and every item in it from a monday.com board. Prefer Archive Group when the items may be needed later. A board's last remaining group cannot be deleted. A retry after success fails because the group no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `group_id` | string | yes |  | Group ID. The group ID (e.g. "topics"). Resolve it with List Groups. |

Output fields:

- `id`: Group ID
- `board_id`: Board ID
- `deleted`: Deleted (boolean)

### `monday_duplicate_group`

**Duplicate Group.** Duplicate a monday.com group, including its items, on the same board, optionally with a new title and placed at the top. Limited by monday.com to 40 duplications per minute. Each call creates another copy, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `group_id` | string | yes |  | Group ID. The group ID (e.g. "topics"). Resolve it with List Groups. |
| `group_title` | string | no |  | New Group Title. Title for the copy. Defaults to the original title with a "Duplicate of" prefix. |
| `add_to_top` | boolean | no |  | Add To Top. Place the copy at the top of the board. |

Output fields:

- `id`: New Group ID
- `board_id`: Board ID
- `source_group_id`: Source Group ID
- `title`: Title
- `color`: Color

### `monday_list_groups`

**List Groups.** List the groups (sections that hold items) of a monday.com board with each group's ID, title, color and archived state. Use to resolve a group ID before creating, moving or filtering items. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |

Output fields:

- `board_id`: Board ID
- `groups`: Groups
- `groups[].id`: Group ID
- `groups[].title`: Title
- `groups[].color`: Color
- `groups[].archived`: Archived (boolean)
- `groups[].deleted`: Deleted (boolean)
- `count`: Count (number)

### `monday_update_group`

**Update Group.** Change a monday.com group's title and/or color, or move it before or after another group. Only the fields you provide change. Resolve group IDs with List Groups. Re-applying the same values is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `group_id` | string | yes |  | Group ID. The group ID (e.g. "topics"). Resolve it with List Groups. |
| `title` | string | no |  | New Title. |
| `color` | string | no |  | New Color. monday.com group color name or HEX value. |
| `move_after_group_id` | string | no |  | Move After Group ID. Move the group directly after this group ID. |
| `move_before_group_id` | string | no |  | Move Before Group ID. Move the group directly before this group ID. |

Output fields:

- `id`: Group ID
- `board_id`: Board ID
- `title`: Title
- `color`: Color
- `updated_attributes`: Updated Attributes

### `monday_archive_item`

**Archive Item.** Archive a monday.com item, removing it from board views while keeping it restorable from the archive. Prefer this over Delete Item unless permanent removal is explicitly wanted. Safe to retry: archiving an archived item is a no-op. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_id` | string | yes |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |

Output fields:

- `id`: Item ID
- `name`: Item Name
- `state`: State
- `url`: Item URL (url)
- `board_id`: Board ID
- `group_id`: Group ID

### `monday_change_column_value`

**Change Column Value.** Set a single column on a monday.com item using the column type's JSON value format, e.g. timeline {"from": "2026-01-01", "to": "2026-01-31"}, people {"personsAndTeams": [{"id": 123, "kind": "person"}]}, or {"clear_all": true} to clear a file column. Get the exact format with Get Column Type Schema. Use Change Simple Column Value for plain labels/text. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `item_id` | string | yes |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |
| `column_id` | string | yes |  | Column ID. The column ID (e.g. "status", "date4"). Resolve it with List Columns. |
| `value` | JSON | yes |  | Value. The column value as a JSON object, in the format for that column type. |
| `create_labels_if_missing` | boolean | no | `false` | Create Labels If Missing. Create missing status/dropdown labels. Requires permission to change the board structure. |

Output fields:

- `id`: Item ID
- `name`: Item Name
- `state`: State
- `url`: Item URL (url)
- `board_id`: Board ID
- `group_id`: Group ID

### `monday_change_item_position`

**Change Item Position.** Reorder a monday.com item: place it before or after another item on the same board, or at the top or bottom of a group. Provide either Relative To Item ID with Position, or Group ID with Group Placement. Subitems cannot be repositioned. Use Move Item to Group for a plain group change. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_id` | string | yes |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |
| `relative_to` | string | no |  | Relative To Item ID. An item on the same board to position this item next to. |
| `position_relative_method` | string | no |  | Position. Where to place the item relative to Relative To Item ID. One of `"after_at"`, `"before_at"`. |
| `group_id` | string | no |  | Group ID. The group ID (e.g. "topics"). Resolve it with List Groups. |
| `group_top` | string | no |  | Group Placement. Place the item at the top or bottom of Group ID. One of `"top"`, `"bottom"`. |

Output fields:

- `id`: Item ID
- `name`: Item Name
- `state`: State
- `url`: Item URL (url)
- `board_id`: Board ID
- `group_id`: Group ID

### `monday_change_simple_column_value`

**Change Simple Column Value.** Set a single column on a monday.com item from a plain string, e.g. a status or dropdown label ("Done"), text, a number, or a date ("2026-01-31"). Use Change Column Value for structured JSON values (people, timeline, link) and Set Item Column Values to change several columns at once. An empty string clears the column. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `item_id` | string | yes |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |
| `column_id` | string | yes |  | Column ID. The column ID (e.g. "status", "date4"). Resolve it with List Columns. |
| `value` | string | no |  | Value. The new value as a string. Leave empty to clear the column. |
| `create_labels_if_missing` | boolean | no | `false` | Create Labels If Missing. Create a missing status/dropdown label. Requires permission to change the board structure. |

Output fields:

- `id`: Item ID
- `name`: Item Name
- `state`: State
- `url`: Item URL (url)
- `board_id`: Board ID
- `group_id`: Group ID

### `monday_clear_item_updates`

**Clear Item Updates.** Permanently delete every update (comment thread) on a monday.com item. Use Delete Update to remove a single update instead. Irreversible; re-running on an item with no updates is harmless. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_id` | string | yes |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |

Output fields:

- `success`: Success (boolean)
- `id`: Item ID
- `name`: Item Name
- `state`: State
- `url`: Item URL (url)
- `board_id`: Board ID
- `group_id`: Group ID

### `monday_create_board_item`

**Create Board Item.** Create a new item (row) on a monday.com board by board ID, optionally in a specific group and with column values given as a JSON map of column ID to value. Use Create Subitem for a child item instead. Check column IDs and value formats with List Columns and Get Column Type Schema first. Each call creates a new item, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `item_name` | string | yes |  | Item Name. |
| `group_id` | string | no |  | Group ID. The group ID (e.g. "topics"). Resolve it with List Groups. |
| `column_values` | JSON | no |  | Column Values. JSON map of column ID to value, e.g. {"status": {"label": "Done"}, "date4": {"date": "2026-01-31"}, "text": "Hello"}. |
| `create_labels_if_missing` | boolean | no | `false` | Create Labels If Missing. Create missing status/dropdown labels. Requires permission to change the board structure. |

Output fields:

- `id`: Item ID
- `name`: Item Name
- `state`: State
- `url`: Item URL (url)
- `board_id`: Board ID
- `group_id`: Group ID

### `monday_create_subitem`

**Create Subitem.** Create a subitem under a parent monday.com item, optionally with column values as a JSON map of subitem-board column ID to value. Subitems live on a separate subitems board, so their column IDs differ from the parent board; read them with List Subitems or List Columns on that board. Each call creates a new subitem, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent_item_id` | string | yes |  | Parent Item ID. The item to add the subitem under. Resolve it with List Board Items. |
| `item_name` | string | yes |  | Subitem Name. |
| `column_values` | JSON | no |  | Column Values. JSON map of subitem column ID to value, e.g. {"status": {"label": "Working on it"}}. |
| `create_labels_if_missing` | boolean | no | `false` | Create Labels If Missing. Create missing status/dropdown labels. Requires permission to change the board structure. |

Output fields:

- `id`: Item ID
- `name`: Item Name
- `state`: State
- `url`: Item URL (url)
- `board_id`: Board ID
- `group_id`: Group ID
- `parent_item_id`: Parent Item ID

### `monday_delete_item`

**Delete Item.** Delete a monday.com item or subitem; it moves to the account trash and cannot be restored through the API. Prefer Archive Item when the item may be needed later. A retry on an already-deleted item fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_id` | string | yes |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |

Output fields:

- `success`: Success (boolean)
- `id`: Deleted Item ID

### `monday_duplicate_item`

**Duplicate Item.** Duplicate a monday.com item on its board, copying its column values and optionally its updates; returns the new item. Use Create Board Item to start from scratch instead. Each call creates another copy, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `item_id` | string | yes |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |
| `with_updates` | boolean | no | `false` | Include Updates. Also copy the item's updates. |

Output fields:

- `id`: Item ID
- `name`: Item Name
- `state`: State
- `url`: Item URL (url)
- `board_id`: Board ID
- `group_id`: Group ID

### `monday_get_items`

**Get Items.** Fetch up to 100 monday.com items or subitems by ID, including every column value as text plus raw JSON. Use when you already hold item IDs; to enumerate a board use List Board Items, to find items by a column value use Search Items by Column Values. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_ids` | array | yes |  | Item IDs. Numeric item or subitem IDs (max 100). |

Output fields:

- `items`: Items
- `items[].id`: Item ID
- `items[].name`: Item Name
- `items[].state`: State
- `items[].url`: Item URL (url)
- `items[].board_id`: Board ID
- `items[].board_name`: Board Name
- `items[].group_id`: Group ID
- `items[].group_title`: Group Title
- `items[].parent_item_id`: Parent Item ID
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].column_values`: Column Values
- `items[].column_values[].column_id`: Column ID
- `items[].column_values[].type`: Column Type
- `items[].column_values[].text`: Text
- `items[].column_values[].value`: Raw Value (JSON)
- `count`: Count (number)

### `monday_list_board_items`

**List Board Items.** List items on a monday.com board, or only one group, with their column values, one page (up to 500) at a time; pass the returned cursor to get the next page (cursors expire 60 minutes after the first request). Supports server-side filtering and sorting via Query Params. For an exact match on a column value prefer Search Items by Column Values; for known IDs use Get Items. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `group_id` | string | no |  | Group ID. The group ID (e.g. "topics"). Resolve it with List Groups. |
| `limit` | number | no |  | Limit. Items per page, 1-500. Defaults to 50. |
| `cursor` | string | no |  | Cursor. Cursor from a previous page. When set, Group ID and Query Params are ignored. |
| `query_params` | JSON | no |  | Query Params. Optional ItemsQuery filter, e.g. {"rules": [{"column_id": "status", "compare_value": [1], "operator": "any_of"}], "operator": "and", "order_by": [{"column_id": "date4", "direction": "desc"}]}. |
| `column_ids` | array | no |  | Column IDs. Only return these column values. Leave empty for all columns. |

Output fields:

- `items`: Items
- `items[].id`: Item ID
- `items[].name`: Item Name
- `items[].state`: State
- `items[].url`: Item URL (url)
- `items[].board_id`: Board ID
- `items[].group_id`: Group ID
- `items[].group_title`: Group Title
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].column_values`: Column Values
- `items[].column_values[].column_id`: Column ID
- `items[].column_values[].type`: Column Type
- `items[].column_values[].text`: Text
- `items[].column_values[].value`: Raw Value (JSON)
- `count`: Count (number)
- `cursor`: Next Page Cursor

### `monday_list_subitems`

**List Subitems.** List all subitems of a monday.com item with their column values and the subitems board ID (needed to update subitem columns). Use Get Items when you already hold subitem IDs. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_id` | string | yes |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |
| `column_ids` | array | no |  | Column IDs. Only return these subitem column values. Leave empty for all columns. |

Output fields:

- `subitems`: Subitems
- `subitems[].id`: Item ID
- `subitems[].name`: Item Name
- `subitems[].state`: State
- `subitems[].url`: Item URL (url)
- `subitems[].board_id`: Board ID
- `subitems[].group_id`: Group ID
- `subitems[].group_title`: Group Title
- `subitems[].created_at`: Created At (datetime)
- `subitems[].updated_at`: Updated At (datetime)
- `subitems[].column_values`: Column Values
- `subitems[].column_values[].column_id`: Column ID
- `subitems[].column_values[].type`: Column Type
- `subitems[].column_values[].text`: Text
- `subitems[].column_values[].value`: Raw Value (JSON)
- `subitems[].parent_item_id`: Parent Item ID
- `count`: Count (number)

### `monday_move_item_to_board`

**Move Item to Board.** Move a monday.com item (with its subitems) to a group on another board, optionally mapping source column IDs to target column IDs so values carry over; unmapped columns may lose their values. Use Move Item to Group for a move within the same board. Safe to retry: moving to where it already is is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_id` | string | yes |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |
| `board_id` | string | yes |  | Target Board ID. The board to move the item to. Resolve it with List Boards. |
| `group_id` | string | yes |  | Target Group ID. The group on the target board. Resolve it with List Groups. |
| `columns_mapping` | array | no |  | Columns Mapping. Optional mapping of source column IDs to target column IDs. Each item: { `source`, `target` }. |

Output fields:

- `id`: Item ID
- `name`: Item Name
- `state`: State
- `url`: Item URL (url)
- `board_id`: Board ID
- `group_id`: Group ID

### `monday_move_item_to_group`

**Move Item to Group.** Move a monday.com item (with its subitems) to a different group on the same board. Use Move Item to Board to move it across boards, or Change Item Position to reorder it within a group. Safe to retry: moving to the group it is already in is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_id` | string | yes |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |
| `group_id` | string | yes |  | Group ID. The group ID (e.g. "topics"). Resolve it with List Groups. |

Output fields:

- `id`: Item ID
- `name`: Item Name
- `state`: State
- `url`: Item URL (url)
- `board_id`: Board ID
- `group_id`: Group ID

### `monday_rename_item`

**Rename Item.** Rename an existing monday.com item or subitem (its name column) without touching other columns. Use Set Item Column Values to change other fields. Safe to retry: setting the same name leaves the item unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `item_id` | string | yes |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |
| `name` | string | yes |  | New Name. |

Output fields:

- `id`: Item ID
- `name`: Item Name
- `state`: State
- `url`: Item URL (url)
- `board_id`: Board ID
- `group_id`: Group ID

### `monday_search_items_by_column_values`

**Search Items by Column Values.** Find items on a monday.com board whose column values exactly match the given values (e.g. an email, a status label, the item name via column "name"); values for the same column are OR-ed, different columns are AND-ed. Supported column types include text, status, dropdown, email, phone, numbers, date, people, checkbox and long text; not formula, mirror, connect-boards, file or tags. For fuzzy or rule-based filters use List Board Items with Query Params. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `filters` | array | no |  | Filters. One row per column/value pair. Each item: { `column_id`, `value` }. |
| `limit` | number | no |  | Limit. Items per page, 1-500. Defaults to 50. |
| `cursor` | string | no |  | Cursor. Cursor from a previous page. When set, Filters are ignored. |
| `column_ids` | array | no |  | Column IDs. Only return these column values. Leave empty for all columns. |

Output fields:

- `items`: Items
- `items[].id`: Item ID
- `items[].name`: Item Name
- `items[].state`: State
- `items[].url`: Item URL (url)
- `items[].board_id`: Board ID
- `items[].group_id`: Group ID
- `items[].group_title`: Group Title
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].column_values`: Column Values
- `items[].column_values[].column_id`: Column ID
- `items[].column_values[].type`: Column Type
- `items[].column_values[].text`: Text
- `items[].column_values[].value`: Raw Value (JSON)
- `count`: Count (number)
- `cursor`: Next Page Cursor

### `monday_set_item_column_values`

**Set Item Column Values.** Update several column values on an existing monday.com item in one call, given a JSON map of column ID to value; only the listed columns change. Prefer Change Simple Column Value for a single text/status/dropdown label, and Change Column Value for one complex column. File columns cannot be set here (use Upload File). Safe to retry: re-applying the same values converges on the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `item_id` | string | yes |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |
| `column_values` | JSON | yes |  | Column Values. JSON map of column ID to value, e.g. {"status": {"label": "Done"}, "numbers": "42", "people": {"personsAndTeams": [{"id": 123, "kind": "person"}]}}. |
| `create_labels_if_missing` | boolean | no | `false` | Create Labels If Missing. Create missing status/dropdown labels. Requires permission to change the board structure. |

Output fields:

- `id`: Item ID
- `name`: Item Name
- `state`: State
- `url`: Item URL (url)
- `board_id`: Board ID
- `group_id`: Group ID

### `monday_update_assets_on_item`

**Update Files on Item.** Set the contents of a file column on a monday.com item from files that already exist: uploaded assets (by asset ID), monday docs (by doc object ID), or links (Google Drive, Dropbox, OneDrive, Box or a plain URL). Use Upload File to upload new file bytes. Safe to retry with the same list. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `item_id` | string | yes |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |
| `column_id` | string | yes |  | File Column ID. The ID of a file-type column. Resolve it with List Columns. |
| `files` | array | yes |  | Files. Each item: { `file_type`, `name`, `asset_id`?, `object_id`?, `link_to_file`? }. |

Output fields:

- `item_id`: Item ID
- `assets`: Assets
- `assets[].id`: Asset ID
- `assets[].name`: File Name
- `assets[].url`: File URL (url)
- `count`: Count (number)

### `monday_aggregate_board_data`

**Aggregate Board Data.** Compute a count, sum, average, median, min or max over a monday.com board's items server-side, optionally grouped by one column (e.g. items per status, story points per owner) and filtered with an items_page-style query. Prefer this over listing items and counting yourself: it is far cheaper and exact. Group values are raw: status returns hex colors, people "person-<id>", dates epoch ms. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `function` | string | yes | `"COUNT_ITEMS"` | Function. One of `"COUNT_ITEMS"`, `"COUNT_SUBITEMS"`, `"COUNT"`, `"COUNT_DISTINCT"`, `"SUM"`, `"AVERAGE"`, `"MEDIAN"`, `"MIN"`, `"MAX"`. |
| `column_id` | string | no |  | Column ID. The column to aggregate. Required for every function except the item/subitem counts. Resolve it with List Columns. |
| `group_by_column_id` | string | no |  | Group By Column ID. Optional column to group results by (e.g. "status", "person"). |
| `group_limit` | number | no |  | Group Limit. Maximum number of groups to return (default 1000). |
| `filter` | JSON | no |  | Filter. Optional items query, e.g. {"rules":[{"column_id":"status","compare_value":[1],"operator":"any_of"}]}. |

Output fields:

- `board_id`: Board ID
- `function`: Function
- `column_id`: Column ID
- `group_by_column_id`: Group By Column ID
- `rows`: Rows
- `rows[].group_value`: Group Value
- `rows[].value`: Value (number)
- `count`: Count (number)

### `monday_create_or_get_tag`

**Create or Get Tag.** Return the monday.com tag with the given name, creating it first if it does not exist, and give back its ID for use in a tags column value ({"tag_ids":[id]}). Pass a board ID only for private or shareable boards; omit it for a public tag. A new tag only shows in the UI once it is used. Safe to retry: the same name returns the same tag. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_name` | string | yes |  | Tag Name. |
| `board_id` | string | no |  | Board ID. Only for private or shareable boards. Leave empty to create a public tag. |

Output fields:

- `id`: Tag ID
- `name`: Name
- `color`: Color

### `monday_get_board_mute_settings`

**Get Board Mute Settings.** Return the notification mute state of one or more monday.com boards for the connected user (e.g. CURRENT_USER_MUTE_ALL, MENTIONS_AND_ASSIGNS_ONLY, or an owner-level MUTE_ALL / NOT_MUTED). Use before changing it with Update Board Mute Settings. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_ids` | array | yes |  | Board IDs. Boards to check. Resolve them with List Boards. |

Output fields:

- `settings`: Settings
- `settings[].board_id`: Board ID
- `settings[].mute_state`: Mute State
- `count`: Count (number)

### `monday_get_favorites`

**Get Favorites.** List the monday.com favorites of the user who owns the API token, each with the favorited object's ID and type (e.g. Board, Overview for dashboards, Document). Use to find the boards and docs the user works with most. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `favorites`: Favorites
- `favorites[].id`: Favorite ID
- `favorites[].object_id`: Object ID
- `favorites[].object_type`: Object Type
- `favorites[].folder_id`: Folder ID
- `favorites[].position`: Position (number)
- `favorites[].created_at`: Created At (datetime)
- `favorites[].updated_at`: Updated At (datetime)
- `count`: Count (number)

### `monday_get_form`

**Get Form.** Fetch a monday.com WorkForm's metadata and questions (ID, title, type, required, visible) by its form token, the string after /forms/ in the form URL. Use to learn what a form asks before interpreting its board items. Requires access to the form's board. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_token` | string | yes |  | Form Token. The token after "/forms/" and before "?" in the form's share URL. |

Output fields:

- `id`: Form ID
- `title`: Title
- `description`: Description
- `active`: Active (boolean)
- `is_anonymous`: Anonymous (boolean)
- `owner_id`: Owner ID
- `question_count`: Question Count (number)
- `questions`: Questions
- `questions[].id`: Question ID
- `questions[].title`: Title
- `questions[].type`: Type
- `questions[].required`: Required (boolean)
- `questions[].visible`: Visible (boolean)

### `monday_list_notifications`

**List My Notifications.** List the bell notifications of the monday.com user who owns the API token, newest first, with the linked board, item and update IDs; optionally only unread ones or since a date. Use to see what needs the user's attention. Page with the last notification ID as the cursor. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `unread_only` | boolean | no | `false` | Unread Only. |
| `since` | ISO date-time string | no |  | Since. Only return notifications from this date and time (inclusive). |
| `limit` | number | no |  | Limit. Number of notifications to return (default 25). |
| `cursor` | string | no |  | Cursor. The ID of the last notification from the previous page. |

Output fields:

- `notifications`: Notifications
- `notifications[].id`: Notification ID
- `notifications[].title`: Title
- `notifications[].text`: Text
- `notifications[].read`: Read (boolean)
- `notifications[].created_at`: Created At (datetime)
- `notifications[].board_id`: Board ID
- `notifications[].board_name`: Board Name
- `notifications[].item_id`: Item ID
- `notifications[].item_name`: Item Name
- `notifications[].update_id`: Update ID
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `monday_list_tags`

**List Tags.** List monday.com tags (ID, name, color). Without a board ID it returns the account's public tags; with a board ID it returns the tags stored on that private or shareable board. Use to resolve tag IDs before writing a tags column; to create a missing tag use Create or Get Tag. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | no |  | Board ID. Only for private or shareable boards: return that board's tags. Resolve it with List Boards. |
| `tag_ids` | array | no |  | Tag IDs. Only return these public tag IDs. |

Output fields:

- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].color`: Color
- `count`: Count (number)

### `monday_search`

**Search.** Search the whole monday.com account by free-text query (keyword plus semantic matching) for items, boards, docs or workspaces and get back IDs, names and URLs ranked by relevance (max 20). Use when you know roughly what something is called but not its ID; to filter items on a known board by exact column values use Search Items by Column Values. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity_type` | string | yes | `"items"` | Search For. One of `"items"`, `"boards"`, `"docs"`, `"workspaces"`. |
| `query` | string | yes |  | Query. |
| `limit` | number | no |  | Limit. Maximum results (default 10, max 20). |
| `board_ids` | array | no |  | Board IDs. Items and boards only: restrict to these boards. |
| `workspace_ids` | array | no |  | Workspace IDs. Items, boards and docs only: restrict to these workspaces. |

Output fields:

- `results`: Results
- `results[].id`: ID
- `results[].entity_type`: Entity Type
- `results[].name`: Name
- `results[].url`: URL Path
- `results[].board_id`: Board ID
- `results[].workspace_id`: Workspace ID
- `results[].description`: Description
- `count`: Count (number)

### `monday_send_notification`

**Send Notification.** Send a bell notification (and possibly an email, per the recipient's preferences) to one monday.com user, linked to an item or board (target type Project) or to an update or reply (target type Post). Use to alert a specific person; to comment on an item for everyone use Post Item Update. monday.com returns no notification ID. Each call sends another notification. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. The recipient. Resolve it with List Users. |
| `target_type` | string | yes | `"Project"` | Target Type. One of `"Project"`, `"Post"`. |
| `target_id` | string | yes |  | Target ID. An item or board ID for "Item or board", or an update/reply ID for "Update or reply". |
| `text` | string | yes |  | Text. |

Output fields:

- `sent`: Sent (boolean)
- `user_id`: User ID
- `target_type`: Target Type
- `target_id`: Target ID
- `text`: Text

### `monday_update_board_mute_settings`

**Update Board Mute Settings.** Set the connected user's own notification preferences for one monday.com board: mute everything, only mentions and assignments, or custom (choose any of assigned, mentioned, automation notify). Affects only the current user, never other board members. Safe to retry: the same settings converge on the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `mute_state` | string | yes | `"CUSTOM_SETTINGS"` | Mute State. One of `"CUSTOM_SETTINGS"`, `"MENTIONS_AND_ASSIGNS_ONLY"`, `"CURRENT_USER_MUTE_ALL"`. |
| `enabled` | array | no |  | Notify Me When. Only used with the Custom mute state. One of `"IM_ASSIGNED"`, `"IM_MENTIONED"`, `"AUTOMATION_NOTIFIED"`. |

Output fields:

- `board_id`: Board ID
- `mute_state`: Mute State
- `enabled`: Enabled Notifications

### `monday_delete_update`

**Delete Update.** Permanently delete a monday.com update or reply by its ID. Irreversible; prefer Edit Update to correct text. A retry after success fails because the update no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `update_id` | string | yes |  | Update ID. The update ID. Resolve it with List Item Updates. |

Output fields:

- `id`: Update ID
- `deleted`: Deleted (boolean)

### `monday_edit_update`

**Edit Update.** Replace the body of an existing monday.com update or reply with new text. Use to correct a posted comment; to add a new comment use Post Item Update. Only the update's author can edit it. Safe to retry with the same body. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `update_id` | string | yes |  | Update ID. The update ID. Resolve it with List Item Updates. |
| `body` | string | yes |  | Body. The new update text. HTML is supported. Replaces the whole body. |

Output fields:

- `id`: Update ID
- `item_id`: Item ID
- `body`: Body (html)
- `text_body`: Text Body
- `updated_at`: Updated At (datetime)

### `monday_like_update`

**Like Update.** Add a like from the connected user to a monday.com update. Use to acknowledge an update without replying; undo with Unlike Update. Liking an already-liked update is a no-op, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `update_id` | string | yes |  | Update ID. The update ID. Resolve it with List Item Updates. |

Output fields:

- `id`: Update ID
- `item_id`: Item ID
- `liked`: Liked (boolean)

### `monday_list_board_updates`

**List Board Updates.** List updates (comments) posted across a whole monday.com board, optionally limited to a date range, each tagged with its item ID. Use for board-wide activity digests; for one item's conversation with replies use List Item Updates. Updates posted in the last ~30 seconds may not appear yet. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The numeric board ID. Resolve it with List Boards. |
| `from_date` | string | no |  | From Date. Only updates created on or after this ISO 8601 date-time (e.g. 2026-09-01T00:00:00Z). |
| `to_date` | string | no |  | To Date. Only updates created on or before this ISO 8601 date-time (e.g. 2026-09-30T23:59:59Z). |
| `limit` | number | no |  | Limit. Updates per page (default 25, max 100). |
| `page` | number | no |  | Page. Page number, starting at 1. |

Output fields:

- `updates`: Updates
- `updates[].board_id`: Board ID
- `updates[].id`: Update ID
- `updates[].item_id`: Item ID
- `updates[].body`: Body (html)
- `updates[].text_body`: Text Body
- `updates[].creator_id`: Creator ID
- `updates[].creator_name`: Creator Name
- `updates[].created_at`: Created At (datetime)
- `updates[].updated_at`: Updated At (datetime)
- `count`: Count (number)

### `monday_list_item_updates`

**List Item Updates.** List the updates (comments) posted on one monday.com item, newest first, each with its replies. Use to read an item's conversation or to find an Update ID for Edit, Delete, Like, Pin or reply. For updates across a whole board use List Board Updates. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_id` | string | yes |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |
| `limit` | number | no |  | Limit. Updates per page (default 25, max 100). |
| `page` | number | no |  | Page. Page number, starting at 1. |

Output fields:

- `updates`: Updates
- `updates[].id`: Update ID
- `updates[].item_id`: Item ID
- `updates[].body`: Body (html)
- `updates[].text_body`: Text Body
- `updates[].creator_id`: Creator ID
- `updates[].creator_name`: Creator Name
- `updates[].created_at`: Created At (datetime)
- `updates[].updated_at`: Updated At (datetime)
- `updates[].reply_count`: Reply Count (number)
- `updates[].replies`: Replies
- `updates[].replies[].id`: Reply ID
- `updates[].replies[].body`: Body (html)
- `updates[].replies[].text_body`: Text Body
- `updates[].replies[].creator_id`: Creator ID
- `updates[].replies[].created_at`: Created At (datetime)
- `count`: Count (number)

### `monday_pin_update`

**Pin Update.** Pin a monday.com update to the top of its item's update feed so it stays visible. Undo with Unpin Update. Pinning an already-pinned update leaves it pinned, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `update_id` | string | yes |  | Update ID. The update ID. Resolve it with List Item Updates. |
| `item_id` | string | no |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |

Output fields:

- `id`: Update ID
- `item_id`: Item ID
- `pinned`: Pinned (boolean)

### `monday_post_item_update`

**Post Item Update.** Post a new update (comment) to a monday.com item, or reply to an existing update by passing its Parent Update ID instead of the item. Body accepts HTML. Use Edit Update to change an existing update. Each call posts a new update, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_id` | string | no |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |
| `parent_id` | string | no |  | Parent Update ID. Set to reply to an existing update (from List Item Updates). Leave empty to post a top-level update on the item. |
| `body` | string | yes |  | Body. The update text. HTML is supported. |

Output fields:

- `id`: Update ID
- `item_id`: Item ID
- `parent_id`: Parent Update ID
- `body`: Body (html)
- `text_body`: Text Body
- `creator_id`: Creator ID
- `created_at`: Created At (datetime)

### `monday_unlike_update`

**Unlike Update.** Remove the connected user's like from a monday.com update, reversing Like Update. Unliking an update that is not liked leaves it unchanged, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `update_id` | string | yes |  | Update ID. The update ID. Resolve it with List Item Updates. |

Output fields:

- `id`: Update ID
- `item_id`: Item ID
- `liked`: Liked (boolean)

### `monday_unpin_update`

**Unpin Update.** Unpin a monday.com update from the top of its item's update feed, reversing Pin Update. Unpinning an update that is not pinned leaves it unchanged, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `update_id` | string | yes |  | Update ID. The update ID. Resolve it with List Item Updates. |
| `item_id` | string | no |  | Item ID. The numeric item ID. Resolve it with List Board Items or Search Items by Column Values. |

Output fields:

- `id`: Update ID
- `item_id`: Item ID
- `pinned`: Pinned (boolean)

### `monday_get_account`

**Get Account.** Return the connected monday.com account: ID, name, slug, tier, plan, trial state, active member count, first day of week and active products. Use to check plan limits or account settings before relying on a plan-gated feature. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: Account ID
- `name`: Name
- `slug`: Slug
- `tier`: Tier
- `country_code`: Country Code
- `active_members_count`: Active Members (number)
- `first_day_of_the_week`: First Day of the Week
- `is_during_trial`: In Trial (boolean)
- `is_trial_expired`: Trial Expired (boolean)
- `show_timeline_weekends`: Show Timeline Weekends (boolean)
- `plan_tier`: Plan Tier
- `plan_period`: Plan Period
- `plan_max_users`: Plan Max Users (number)
- `plan_version`: Plan Version
- `products`: Products

### `monday_get_me`

**Get Current User.** Return the profile of the monday.com user who owns the connected API token (ID, name, email, role kind, status, time zone, account). Use to learn "who am I" before assigning items, sending notifications or filtering by the current user. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID
- `name`: Name
- `email`: Email (email)
- `title`: Title
- `kind`: Kind
- `status`: Status
- `url`: Profile URL (url)
- `time_zone`: Time Zone
- `country_code`: Country Code
- `created_at`: Created At (datetime)
- `photo_url`: Photo (image)
- `account_id`: Account ID
- `account_name`: Account Name
- `account_slug`: Account Slug

### `monday_list_teams`

**List Teams.** List monday.com teams (optionally only given team IDs) with their member and owner user IDs and names. Use to resolve team IDs for board or workspace access, or to see who belongs to a team. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_ids` | array | no |  | Team IDs. Only return these team IDs. Leave empty for all teams. |

Output fields:

- `teams`: Teams
- `teams[].id`: Team ID
- `teams[].name`: Name
- `teams[].picture_url`: Picture (image)
- `teams[].member_count`: Member Count (number)
- `teams[].member_ids`: Member IDs
- `teams[].member_names`: Member Names
- `teams[].member_emails`: Member Emails
- `teams[].owner_ids`: Owner IDs
- `teams[].owner_names`: Owner Names
- `count`: Count (number)

### `monday_list_users`

**List Users.** List monday.com account users with ID, name, email, role kind and status; filter by exact emails (the way to resolve a user ID from an email), fuzzy name, user IDs, kind or status. Use to find the user IDs needed for people columns, board/workspace access and notifications. Returns up to 200 per page by default (max 1000). Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `emails` | array | no |  | Emails. Only return users with these exact email addresses. |
| `name` | string | no |  | Name. Fuzzy search by user name. |
| `user_ids` | array | no |  | User IDs. Only return these user IDs. |
| `user_kind` | string | no |  | User Kind. Only return users of this kind. One of `"BASIC"`, `"ADMIN"`, `"MEMBER"`, `"GUEST"`, `"VIEW_ONLY"`. |
| `status` | array | no |  | Status. Filter by activation status (default: active and pending). One of `"ACTIVE"`, `"PENDING"`, `"INACTIVE"`. |
| `limit` | number | no |  | Limit. Users per page (default 200, max 1000). |
| `page` | number | no |  | Page. Page number, starting at 1. |

Output fields:

- `users`: Users
- `users[].id`: User ID
- `users[].name`: Name
- `users[].email`: Email (email)
- `users[].title`: Title
- `users[].kind`: Kind
- `users[].status`: Status
- `users[].url`: Profile URL (url)
- `users[].time_zone`: Time Zone
- `users[].country_code`: Country Code
- `users[].created_at`: Created At (datetime)
- `users[].location`: Location
- `users[].phone`: Phone
- `count`: Count (number)

### `monday_add_teams_to_workspace`

**Add Teams to Workspace.** Add whole teams to a monday.com workspace as subscribers or owners. Use to share a workspace with a team; for individual people use Add Users to Workspace. Re-adding teams already in the workspace leaves them unchanged, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. The numeric workspace ID. Resolve it with List Workspaces. |
| `team_ids` | array | yes |  | Team IDs. Numeric team IDs. Resolve them with List Teams. |
| `kind` | string | yes | `"subscriber"` | Role. One of `"subscriber"`, `"owner"`. |

Output fields:

- `workspace_id`: Workspace ID
- `teams`: Teams
- `teams[].id`: Team ID
- `teams[].name`: Team Name
- `count`: Count (number)

### `monday_add_users_to_workspace`

**Add Users to Workspace.** Add users to a monday.com workspace as subscribers or owners so they can see its boards and docs. Use for individual people; to add a whole team use Add Teams to Workspace. It sets each user role to the chosen kind, so adding an existing owner as a subscriber demotes them; repeating the same call is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. The numeric workspace ID. Resolve it with List Workspaces. |
| `user_ids` | array | yes |  | User IDs. Numeric user IDs. Resolve them with List Users. |
| `kind` | string | yes | `"subscriber"` | Role. One of `"subscriber"`, `"owner"`. |

Output fields:

- `workspace_id`: Workspace ID
- `role`: Role
- `users`: Users
- `users[].id`: User ID
- `users[].name`: User Name
- `count`: Count (number)

### `monday_create_workspace`

**Create Workspace.** Create a new monday.com workspace, open to the whole account or closed to invited members. Use before creating boards or folders for a new team or project. Account admins may restrict who can create workspaces. Each call creates another workspace, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `kind` | string | yes | `"open"` | Kind. Open workspaces are visible to everyone in the account; closed ones only to members. One of `"open"`, `"closed"`. |
| `description` | string | no |  | Description. |
| `account_product_id` | string | no |  | Account Product ID. The account product (e.g. work management, CRM) to create the workspace in. Defaults to the main product. |

Output fields:

- `id`: Workspace ID
- `name`: Workspace Name
- `kind`: Kind
- `description`: Description
- `state`: State
- `created_at`: Created At (datetime)

### `monday_delete_teams_from_workspace`

**Remove Teams from Workspace.** Revoke whole teams' membership of a monday.com workspace. Use for teams; for individual people use Remove Users from Workspace. Removing teams that are no longer members has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. The numeric workspace ID. Resolve it with List Workspaces. |
| `team_ids` | array | yes |  | Team IDs. Numeric team IDs. Resolve them with List Teams. |

Output fields:

- `workspace_id`: Workspace ID
- `removed_teams`: Removed Teams
- `removed_teams[].id`: Team ID
- `removed_teams[].name`: Team Name
- `count`: Count (number)

### `monday_delete_users_from_workspace`

**Remove Users from Workspace.** Revoke users' membership of a monday.com workspace. Use for individual people; to remove a whole team use Remove Teams from Workspace. Removing users who are no longer members has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. The numeric workspace ID. Resolve it with List Workspaces. |
| `user_ids` | array | yes |  | User IDs. Numeric user IDs. Resolve them with List Users. |

Output fields:

- `workspace_id`: Workspace ID
- `removed_users`: Removed Users
- `removed_users[].id`: User ID
- `removed_users[].name`: User Name
- `count`: Count (number)

### `monday_delete_workspace`

**Delete Workspace.** Delete a monday.com workspace. Destructive: the workspace and the boards, docs and folders inside it are removed for everyone, so only use when the user explicitly asks to delete this workspace. To remove a single board prefer Archive Board. A retry after success fails because the workspace is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. The numeric workspace ID. Resolve it with List Workspaces. |

Output fields:

- `id`: Workspace ID
- `name`: Workspace Name
- `deleted`: Deleted (boolean)

### `monday_list_workspaces`

**List Workspaces.** List monday.com workspaces the connected user can see, with kind (open/closed), state and description. Use to resolve a workspace name to the workspace ID needed by List Boards, Create Board, List Folders and the workspace membership actions. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_ids` | array | no |  | Workspace IDs. Only return these workspaces. |
| `kind` | string | no |  | Kind. One of `"open"`, `"closed"`. |
| `state` | string | no | `"active"` | State. One of `"active"`, `"archived"`, `"deleted"`, `"all"`. |
| `membership_kind` | string | no | `"all"` | Membership. Only workspaces the user is a member of, or all visible workspaces. One of `"all"`, `"member"`. |
| `limit` | number | no | `50` | Limit. Workspaces per page (default 50). |
| `page` | number | no | `1` | Page. |

Output fields:

- `workspaces`: Workspaces
- `workspaces[].id`: Workspace ID
- `workspaces[].name`: Workspace Name
- `workspaces[].kind`: Kind
- `workspaces[].description`: Description
- `workspaces[].state`: State
- `workspaces[].created_at`: Created At (datetime)
- `workspaces[].is_default_workspace`: Is Default Workspace (boolean)
- `count`: Count (number)

### `monday_update_workspace`

**Update Workspace.** Change a monday.com workspace's name, description, kind (open/closed), or account product. Only the fields you provide are changed; omitted fields keep their current value. To remove the description, set Clear Description. Setting the same values again leaves the workspace unchanged, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. The numeric workspace ID. Resolve it with List Workspaces. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `clear_description` | boolean | no | `false` | Clear Description. Remove the current description. Leave unchecked to keep it. |
| `kind` | string | no |  | Kind. Leave empty to keep the current kind. One of `"open"`, `"closed"`. |
| `account_product_id` | string | no |  | Account Product ID. Move the workspace to this account product. |

Output fields:

- `id`: Workspace ID
- `name`: Workspace Name
- `kind`: Kind
- `description`: Description
- `state`: State

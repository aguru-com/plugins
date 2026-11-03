# Coda

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-coda'
  version: '0.3.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Coda API Key

> Create an API token in Coda (now Superhuman Docs): open [Account settings](https://coda.io/account), scroll to **API settings**, click **Generate API token**, and paste it here.

## Actions

### `create-row`

**Create Row.** Append a new row to a table in a Coda doc, with cell values keyed by column. Use to add data to a Coda table; choose Upsert Row instead if you want to match-and-update existing rows on key columns. Requires the doc, table, and at least one non-empty cell value. Not idempotent — each call inserts a separate row. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Document. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `rowData` | object | yes |  | Row Data. Define the data for the new row based on table columns. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `rowId`: Row ID
- `requestId`: Request ID

### `update-row`

**Update Row.** Overwrite cell values on an existing Coda table row, identified by its row ID or a unique row name. Use when you already know which row to change; use Upsert Row instead when the row may not yet exist. Idempotent — repeating with the same values leaves the row in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Document. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `rowIdOrName` | string | yes |  | Row ID or Name. |
| `rowData` | object | yes |  | Row Data. Define the data for the new row based on table columns. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `rowId`: Row ID
- `requestId`: Request ID

### `upsert-row`

**Upsert Row.** Insert a row into a Coda table, or update an existing row when its values match the chosen key columns. Use when you want create-or-update semantics keyed on stable columns rather than a known row ID. Idempotent when key columns uniquely identify a row — repeating the same input converges to one matching row; with no matching columns it behaves like an insert. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Document. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `keyColumns` | array | yes |  | Matching Columns. Values the product loads from the provider, such as ids; write an array of them. |
| `rowData` | object | yes |  | Row Data. Define the data for the new row based on table columns. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `requestId`: Request ID

### `find-row`

**Find Row(s).** Search a Coda table for rows where a chosen column equals a given value, paging through all matches. Use to look up rows by a field value before reading or updating them; pair with Update Row using a returned row ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Document. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `searchColumn` | string | yes |  | Search Column. A value the product loads from the provider, such as an id; write the value itself. |
| `searchValue` | string | yes |  | Search Value. Rows whose column equals this value are returned. |
| `maxRows` | number | no |  | Max Rows. Stop after this many matching rows. Leave empty to return every match. |

Output fields:

- `found`: Found (boolean)
- `result`: Rows
- `result[].id`: Row ID
- `result[].name`: Name
- `result[].values`: Column Values (an object whose keys vary)
- `result[].index`: Row Index (number)
- `result[].createdAt`: Created At (datetime)
- `result[].updatedAt`: Updated At (datetime)
- `result[].browserLink`: Browser Link (url)

### `get-row`

**Get Row.** Fetch one row from a Coda table by its row ID or unique row name, returning its cell values. Use when you already have a specific row identifier; use Find Row(s) instead to search by a column value. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Document. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `rowIdOrName` | string | yes |  | Row ID or Name. |

Output fields:

- `id`: Row ID
- `name`: Name
- `values`: Column Values (an object whose keys vary)
- `index`: Row Index (number)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `browserLink`: Browser Link (url)
- `parent`: Table
- `parent.id`: Table ID
- `parent.name`: Name
- `parent.tableType`: Table Type
- `parent.browserLink`: Browser Link (url)

### `list-tables`

**List Table(s).** List the tables in a Coda doc, up to a caller-specified maximum, returning each table reference. Use to discover available tables and their IDs before reading or writing rows. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Document. A value the product loads from the provider, such as an id; write the value itself. |
| `max` | number | yes |  | Max Tables. Maximum number of results to return. |

Output fields:

- `found`: Found (boolean)
- `result`: Tables
- `result[].id`: Table ID
- `result[].name`: Name
- `result[].tableType`: Table Type
- `result[].browserLink`: Browser Link (url)
- `result[].parent`: Page
- `result[].parent.id`: Page ID
- `result[].parent.name`: Name
- `result[].parent.browserLink`: Browser Link (url)

### `get-table`

**Get Table.** Retrieve the metadata of a single Coda table: name, type, row count, display column and layout. It does not return the columns; use List Columns for those. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Document. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Table ID
- `name`: Name
- `tableType`: Table Type
- `browserLink`: Browser Link (url)
- `parent`: Page
- `parent.id`: Page ID
- `parent.name`: Name
- `parent.browserLink`: Browser Link (url)
- `rowCount`: Row Count (number)
- `displayColumn`: Display Column
- `displayColumn.id`: Column ID
- `layout`: Layout
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `get_current_user`

**Get Current User.** Returns the name, login email and workspace of the Coda account behind this connection, and whether the token is limited to some docs. Use to confirm which account you are acting as. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `name`: Name
- `loginId`: Login Email (email)
- `tokenName`: Token Name
- `scoped`: Token Is Restricted (boolean)
- `pictureLink`: Picture (image)
- `workspace`: Workspace
- `workspace.id`: ID
- `workspace.name`: Name

### `list_docs`

**List Docs.** Lists Coda docs the account can access, optionally filtered by a name search, owner, starred state, folder or workspace, one page at a time. Use to find a doc ID before working inside a doc; pass Next Page Token to continue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search. Only docs whose name contains this text. |
| `isOwner` | boolean | no | `false` | Only Docs I Own. |
| `isStarred` | boolean | no | `false` | Only Starred Docs. |
| `folderId` | string | no |  | Folder ID. Only docs in this folder (starts with "fl-"). Use List Folders to find it. |
| `workspaceId` | string | no |  | Workspace ID. Only docs in this workspace (starts with "ws-"). |
| `limit` | number | no | `25` | Limit. How many items to return in this page (1-100). |
| `pageToken` | string | no |  | Page Token. Leave empty for the first page. To get the next page, pass the Next Page Token from the previous result. |

Output fields:

- `items`: Docs
- `items[].id`: Doc ID
- `items[].name`: Name
- `items[].browserLink`: Browser Link (url)
- `items[].owner`: Owner Email (email)
- `items[].ownerName`: Owner Name
- `items[].createdAt`: Created At (datetime)
- `items[].updatedAt`: Updated At (datetime)
- `items[].workspace`: Workspace
- `items[].workspace.id`: ID
- `items[].workspace.name`: Name
- `items[].folder`: Folder
- `items[].folder.id`: ID
- `items[].folder.name`: Name
- `nextPageToken`: Next Page Token
- `hasMore`: Has More (boolean)

### `get_doc`

**Get Doc.** Returns one Coda doc's metadata (name, owner, browser link, folder, workspace, page/table/row counts) by doc ID or link. Use to check a doc exists or to get its link; it does not return page text (use Get Page Content). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |

Output fields:

- `id`: Doc ID
- `name`: Name
- `browserLink`: Browser Link (url)
- `owner`: Owner Email (email)
- `ownerName`: Owner Name
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `workspace`: Workspace
- `workspace.id`: ID
- `workspace.name`: Name
- `folder`: Folder
- `folder.id`: ID
- `folder.name`: Name
- `docSize`: Doc Size
- `docSize.totalRowCount`: Total Rows (number)
- `docSize.tableAndViewCount`: Tables and Views (number)
- `docSize.pageCount`: Pages (number)
- `docSize.overApiSizeLimit`: Over API Size Limit (boolean)

### `create_doc`

**Create Doc.** Creates a new Coda doc, blank with an optional first page of Markdown/HTML, or as a full copy of a source doc (tables, formulas and buttons included). Use a copy when a template doc already has the tables you need, since tables cannot be created through the API. Requires the Doc Maker role. Not idempotent: each call creates another doc. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `sourceDoc` | string | no |  | Copy From Doc (ID or Link). Optional. The doc to copy. Leave empty to create a blank doc. |
| `folderId` | string | no |  | Folder ID. Optional folder for the new doc (starts with "fl-"). Defaults to your "My docs" folder. Use List Folders to find it. |
| `timezone` | string | no |  | Time Zone. Optional, for example America/New_York. |
| `pageName` | string | no |  | First Page Name. Optional. Only used for a blank doc. |
| `pageContent` | string | no |  | First Page Content. Optional. Only used for a blank doc. |
| `contentFormat` | string | no | `"markdown"` | Content Format. One of `"markdown"`, `"html"`. |
| `waitForCompletion` | boolean | no | `true` | Wait for Coda to Apply. Coda applies changes in the background. When on, the step waits up to 30 seconds until the change is applied; if it takes longer, the step still succeeds with Completed = false and you can check later with Get Mutation Status. |

Output fields:

- `id`: Doc ID
- `name`: Name
- `browserLink`: Browser Link (url)
- `owner`: Owner Email (email)
- `ownerName`: Owner Name
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `workspace`: Workspace
- `workspace.id`: ID
- `workspace.name`: Name
- `folder`: Folder
- `folder.id`: ID
- `folder.name`: Name
- `sourceDoc`: Copied From
- `sourceDoc.id`: Doc ID
- `requestId`: Request ID
- `completed`: Completed (boolean)
- `warning`: Warning

### `update_doc`

**Rename Doc.** Renames a Coda doc and/or changes its icon, by doc ID or link. Give at least one of Title or Icon Name. Requires the Doc Maker role. Setting the same values again changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `title` | string | no |  | Title. |
| `iconName` | string | no |  | Icon Name. A Coda icon name, for example "rocket". |

Output fields:

- `id`: Doc ID
- `title`: New Title
- `iconName`: New Icon Name

### `delete_doc`

**Delete Doc.** Permanently deletes a whole Coda doc with all its pages and tables. Use only when the user explicitly asks to delete the doc. A repeat call finds it gone and reports Already Deleted instead of failing, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |

Output fields:

- `id`: Doc ID
- `deleted`: Deleted (boolean)
- `alreadyDeleted`: Already Deleted (boolean)

### `list_folders`

**List Folders.** Lists Coda folders (ID, name, workspace) the account can see, one page at a time. Use to find a folder ID for Create Doc or List Docs. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | no |  | Workspace ID. Only folders in this workspace (starts with "ws-"). |
| `isStarred` | boolean | no | `false` | Only Starred Folders. |
| `limit` | number | no | `25` | Limit. How many items to return in this page (1-100). |
| `pageToken` | string | no |  | Page Token. Leave empty for the first page. To get the next page, pass the Next Page Token from the previous result. |

Output fields:

- `items`: Folders
- `items[].id`: Folder ID
- `items[].name`: Name
- `items[].browserLink`: Browser Link (url)
- `items[].canEdit`: Can Edit (boolean)
- `items[].workspace`: Workspace
- `items[].workspace.id`: ID
- `items[].workspace.name`: Name
- `nextPageToken`: Next Page Token
- `hasMore`: Has More (boolean)

### `list_pages`

**List Pages.** Lists the pages (and subpages) of a Coda doc with their IDs, names, parent and visibility, one page of results at a time. Use to find a page ID before Get Page Content, Update Page or Delete Page; pass Next Page Token to continue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `limit` | number | no | `25` | Limit. How many items to return in this page (1-100). |
| `pageToken` | string | no |  | Page Token. Leave empty for the first page. To get the next page, pass the Next Page Token from the previous result. |

Output fields:

- `items`: Pages
- `items[].id`: Page ID
- `items[].name`: Name
- `items[].subtitle`: Subtitle
- `items[].browserLink`: Browser Link (url)
- `items[].contentType`: Content Type
- `items[].isHidden`: Hidden (boolean)
- `items[].parent`: Parent Page
- `items[].parent.id`: ID
- `items[].parent.name`: Name
- `items[].children`: Subpages
- `items[].children[].id`: ID
- `items[].children[].name`: Name
- `items[].createdAt`: Created At (datetime)
- `items[].updatedAt`: Updated At (datetime)
- `items[].createdBy`: Created By
- `items[].createdBy.name`: Name
- `items[].createdBy.email`: Email (email)
- `items[].updatedBy`: Updated By
- `items[].updatedBy.name`: Name
- `items[].updatedBy.email`: Email (email)
- `nextPageToken`: Next Page Token
- `hasMore`: Has More (boolean)

### `get_page`

**Get Page.** Returns one Coda page's metadata (name, subtitle, parent, subpages, hidden state, authors, link) by page ID or name. It does not return the page text; use Get Page Content for that. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `pageIdOrName` | string | yes |  | Page ID or Name. The page ID (starts with "canvas-") or its exact name. Use List Pages to find it. |

Output fields:

- `id`: Page ID
- `name`: Name
- `subtitle`: Subtitle
- `browserLink`: Browser Link (url)
- `contentType`: Content Type
- `isHidden`: Hidden (boolean)
- `parent`: Parent Page
- `parent.id`: ID
- `parent.name`: Name
- `children`: Subpages
- `children[].id`: ID
- `children[].name`: Name
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `createdBy`: Created By
- `createdBy.name`: Name
- `createdBy.email`: Email (email)
- `updatedBy`: Updated By
- `updatedBy.name`: Name
- `updatedBy.email`: Email (email)

### `get_page_content`

**Get Page Content.** Returns the text of a Coda page as Markdown (or HTML), capped at 5 MB. Use to read or summarise a page; use Get Page for its metadata only. If Coda needs more than a minute, it returns Completed = false and an Export ID to pass back in a second call. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `pageIdOrName` | string | yes |  | Page ID or Name. The page ID (starts with "canvas-") or its exact name. Use List Pages to find it. |
| `outputFormat` | string | yes | `"markdown"` | Format. One of `"markdown"`, `"html"`. |
| `exportId` | string | no |  | Export ID. Leave empty. Only fill it to resume an export that returned Completed = false earlier. |

Output fields:

- `content`: Content
- `format`: Format
- `completed`: Completed (boolean)
- `exportId`: Export ID
- `truncated`: Truncated (boolean)
- `pageId`: Page

### `create_page`

**Create Page.** Adds a new page (or subpage, with Parent Page ID) to a Coda doc, optionally filled with Markdown or HTML, and by default waits until Coda has created it. Use Update Page to change an existing page. Requires the Doc Maker role. Not idempotent: each call adds another page. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `name` | string | yes |  | Page Name. |
| `subtitle` | string | no |  | Subtitle. |
| `iconName` | string | no |  | Icon Name. A Coda icon name, for example "rocket". |
| `parentPageId` | string | no |  | Parent Page ID. Optional. Creates the page as a subpage of this page. |
| `content` | string | no |  | Content. |
| `contentFormat` | string | no | `"markdown"` | Content Format. One of `"markdown"`, `"html"`. |
| `waitForCompletion` | boolean | no | `true` | Wait for Coda to Apply. Coda applies changes in the background. When on, the step waits up to 30 seconds until the change is applied; if it takes longer, the step still succeeds with Completed = false and you can check later with Get Mutation Status. |

Output fields:

- `id`: Page ID
- `requestId`: Request ID
- `completed`: Completed (boolean)
- `warning`: Warning

### `update_page`

**Update Page.** Changes a Coda page's name, subtitle, icon or hidden state, and can append, prepend or replace its content with Markdown or HTML. Use Replace only when the user wants the page overwritten. Append and Prepend are not idempotent: each call adds the content again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `pageIdOrName` | string | yes |  | Page ID or Name. The page ID (starts with "canvas-") or its exact name. Use List Pages to find it. |
| `name` | string | no |  | New Page Name. |
| `subtitle` | string | no |  | New Subtitle. |
| `iconName` | string | no |  | New Icon Name. |
| `visibility` | string | no |  | Visibility. Hiding pages needs a paid Coda plan. One of `"hidden"`, `"visible"`. |
| `content` | string | no |  | Content. Optional content to add to the page. |
| `insertionMode` | string | no | `"append"` | Content Placement. Where the content goes. Replace overwrites everything on the page. One of `"append"`, `"prepend"`, `"replace"`. |
| `contentFormat` | string | no | `"markdown"` | Content Format. One of `"markdown"`, `"html"`. |
| `waitForCompletion` | boolean | no | `true` | Wait for Coda to Apply. Coda applies changes in the background. When on, the step waits up to 30 seconds until the change is applied; if it takes longer, the step still succeeds with Completed = false and you can check later with Get Mutation Status. |

Output fields:

- `id`: Page ID
- `requestId`: Request ID
- `completed`: Completed (boolean)
- `warning`: Warning

### `delete_page`

**Delete Page.** Deletes a Coda page with its content and any tables on it. Use only when the user asks to remove the page. A repeat call finds it gone and reports Already Deleted instead of failing, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `pageIdOrName` | string | yes |  | Page ID or Name. The page ID (starts with "canvas-") or its exact name. Use List Pages to find it. |
| `waitForCompletion` | boolean | no | `true` | Wait for Coda to Apply. Coda applies changes in the background. When on, the step waits up to 30 seconds until the change is applied; if it takes longer, the step still succeeds with Completed = false and you can check later with Get Mutation Status. |

Output fields:

- `id`: Page ID
- `alreadyDeleted`: Already Deleted (boolean)
- `requestId`: Request ID
- `completed`: Completed (boolean)
- `warning`: Warning

### `list_doc_tables`

**List Tables (by Doc ID).** Lists the tables (and optionally views) in a Coda doc given its ID or link, with each table ID, name, type and page, one page at a time. Use to find a table ID before List Columns or List Rows; pass Next Page Token to continue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `tableTypes` | string | no | `"table"` | Include. One of `"table"`, `"view"`, `"table,view"`. |
| `limit` | number | no | `25` | Limit. How many items to return in this page (1-100). |
| `pageToken` | string | no |  | Page Token. Leave empty for the first page. To get the next page, pass the Next Page Token from the previous result. |

Output fields:

- `items`: Tables
- `items[].id`: Table ID
- `items[].name`: Name
- `items[].tableType`: Table Type
- `items[].browserLink`: Browser Link (url)
- `items[].parent`: Page
- `items[].parent.id`: Page ID
- `items[].parent.name`: Name
- `items[].parent.browserLink`: Browser Link (url)
- `nextPageToken`: Next Page Token
- `hasMore`: Has More (boolean)

### `get_table_by_id`

**Get Table (by ID).** Returns one Coda table's metadata (name, type, row count, display column, page, link) by doc ID and table ID or name. It does not return columns; use List Columns for those. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `tableIdOrName` | string | yes |  | Table ID or Name. The table ID (starts with "grid-" or "table-") or its exact name. IDs are safer: names can change or repeat. Use List Tables to find it. |

Output fields:

- `id`: Table ID
- `name`: Name
- `tableType`: Table Type
- `browserLink`: Browser Link (url)
- `parent`: Page
- `parent.id`: Page ID
- `parent.name`: Name
- `parent.browserLink`: Browser Link (url)
- `rowCount`: Row Count (number)
- `displayColumn`: Display Column
- `displayColumn.id`: Column ID
- `layout`: Layout
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `list_columns`

**List Columns.** Lists the columns of a Coda table with ID, name, type (text, number, date, checkbox, select, button…), whether it is calculated (read-only) and whether it is the display column. Use before writing rows to learn the column names and which ones accept values. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `tableIdOrName` | string | yes |  | Table ID or Name. The table ID (starts with "grid-" or "table-") or its exact name. IDs are safer: names can change or repeat. Use List Tables to find it. |
| `visibleOnly` | boolean | no | `false` | Visible Columns Only. |
| `limit` | number | no | `100` | Limit. How many items to return in this page (1-100). |
| `pageToken` | string | no |  | Page Token. Leave empty for the first page. To get the next page, pass the Next Page Token from the previous result. |

Output fields:

- `items`: Columns
- `items[].id`: Column ID
- `items[].name`: Name
- `items[].display`: Display Column (boolean)
- `items[].calculated`: Calculated (boolean)
- `items[].formula`: Formula
- `items[].format`: Format
- `items[].format.type`: Type
- `items[].format.isArray`: Holds a List (boolean)
- `nextPageToken`: Next Page Token
- `hasMore`: Has More (boolean)

### `list_rows`

**List Rows.** Lists rows of a Coda table one page at a time, optionally only those whose column equals a value, with values keyed by column name. Use to find row IDs before Get Row, Update Row or Delete Rows; pass Next Page Token to continue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `tableIdOrName` | string | yes |  | Table ID or Name. The table ID (starts with "grid-" or "table-") or its exact name. IDs are safer: names can change or repeat. Use List Tables to find it. |
| `filterColumn` | string | no |  | Filter Column. Optional column ID or name. Only rows where this column equals Filter Value are returned. |
| `filterValue` | string | no |  | Filter Value. The value the Filter Column must equal. Required when Filter Column is set. |
| `sortBy` | string | no | `"natural"` | Sort By. One of `"natural"`, `"createdAt"`, `"updatedAt"`. |
| `useColumnNames` | boolean | no | `true` | Key Values by Column Name. When off, values are keyed by column ID, which does not change if a column is renamed. |
| `valueFormat` | string | no | `"simpleWithArrays"` | Value Format. One of `"simpleWithArrays"`, `"simple"`, `"rich"`. |
| `visibleOnly` | boolean | no | `false` | Visible Columns Only. |
| `limit` | number | no | `100` | Limit. How many items to return in this page (1-500). |
| `pageToken` | string | no |  | Page Token. Leave empty for the first page. To get the next page, pass the Next Page Token from the previous result. |

Output fields:

- `items`: Rows
- `items[].id`: Row ID
- `items[].name`: Name
- `items[].values`: Column Values (an object whose keys vary)
- `items[].index`: Row Index (number)
- `items[].createdAt`: Created At (datetime)
- `items[].updatedAt`: Updated At (datetime)
- `items[].browserLink`: Browser Link (url)
- `nextPageToken`: Next Page Token
- `hasMore`: Has More (boolean)

### `get_row_by_id`

**Get Row (by ID).** Returns one Coda row with its values keyed by column name, given the doc, table and row ID. Use when you already have the row ID (from List Rows or a write); use List Rows to search by value. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `tableIdOrName` | string | yes |  | Table ID or Name. The table ID (starts with "grid-" or "table-") or its exact name. IDs are safer: names can change or repeat. Use List Tables to find it. |
| `rowIdOrName` | string | yes |  | Row ID. The row ID (starts with "i-"), for example from List Rows. A display-column value also works, but if several rows share it Coda picks one at random. |
| `valueFormat` | string | no | `"simpleWithArrays"` | Value Format. One of `"simpleWithArrays"`, `"simple"`, `"rich"`. |

Output fields:

- `id`: Row ID
- `name`: Name
- `values`: Column Values (an object whose keys vary)
- `index`: Row Index (number)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `browserLink`: Browser Link (url)
- `parent`: Table
- `parent.id`: Table ID
- `parent.name`: Name
- `parent.tableType`: Table Type
- `parent.browserLink`: Browser Link (url)

### `create_rows`

**Add Rows.** Adds 1-500 new rows to a Coda base table (not a view), each given as an object of column name or ID → value, and by default waits until Coda has applied them. Use Upsert Rows instead when rows may already exist. Not idempotent: each call inserts new rows. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `tableIdOrName` | string | yes |  | Table ID or Name. The table ID (starts with "grid-" or "table-") or its exact name. IDs are safer: names can change or repeat. Use List Tables to find it. |
| `rows` | JSON | yes | `[{"Name":"Example"}]` | Rows. A list of rows, each an object of column name or ID → value. Example: [{"Name": "Ada", "Amount": 5, "Done": false}]. |
| `disableParsing` | boolean | no | `false` | Store Values Exactly as Given. When on, Coda does not convert text like "5" or "2026-01-31" into numbers or dates. |
| `waitForCompletion` | boolean | no | `true` | Wait for Coda to Apply. Coda applies changes in the background. When on, the step waits up to 30 seconds until the change is applied; if it takes longer, the step still succeeds with Completed = false and you can check later with Get Mutation Status. |

Output fields:

- `addedRowIds`: Added Row IDs
- `requestId`: Request ID
- `completed`: Completed (boolean)
- `warning`: Warning

### `upsert_rows`

**Upsert Rows.** Inserts rows or updates existing ones whose key-column values match; every matching row is updated, so pick key columns that are unique. Each row must include all key columns. Use for create-or-update sync on stable keys. Repeating the same input converges to the same rows, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `tableIdOrName` | string | yes |  | Table ID or Name. The table ID (starts with "grid-" or "table-") or its exact name. IDs are safer: names can change or repeat. Use List Tables to find it. |
| `keyColumns` | array | yes |  | Key Columns. Column names or IDs that identify a row, for example Email. |
| `rows` | JSON | yes | `[{"Name":"Example"}]` | Rows. A list of rows, each an object of column name or ID → value, including every key column. Example: [{"Email": "ada@example.com", "Amount": 5}]. |
| `disableParsing` | boolean | no | `false` | Store Values Exactly as Given. When on, Coda does not convert text like "5" or "2026-01-31" into numbers or dates. |
| `waitForCompletion` | boolean | no | `true` | Wait for Coda to Apply. Coda applies changes in the background. When on, the step waits up to 30 seconds until the change is applied; if it takes longer, the step still succeeds with Completed = false and you can check later with Get Mutation Status. |

Output fields:

- `rowCount`: Rows Sent (number)
- `requestId`: Request ID
- `completed`: Completed (boolean)
- `warning`: Warning

### `update_row_by_id`

**Update Row (by ID).** Changes cells of one Coda row by row ID; columns you leave out stay as they are, and null or "" clears a cell. Use after List Rows or Get Row; calculated columns cannot be written. Setting the same values again changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `tableIdOrName` | string | yes |  | Table ID or Name. The table ID (starts with "grid-" or "table-") or its exact name. IDs are safer: names can change or repeat. Use List Tables to find it. |
| `rowIdOrName` | string | yes |  | Row ID. The row ID (starts with "i-"), for example from List Rows. A display-column value also works, but if several rows share it Coda picks one at random. |
| `cells` | JSON | yes | `{"Name":"New value"}` | Cells. Object of column name or ID → new value. Use null or "" to clear a cell. Example: {"Status": "Closed", "Notes": null}. |
| `disableParsing` | boolean | no | `false` | Store Values Exactly as Given. |
| `waitForCompletion` | boolean | no | `true` | Wait for Coda to Apply. Coda applies changes in the background. When on, the step waits up to 30 seconds until the change is applied; if it takes longer, the step still succeeds with Completed = false and you can check later with Get Mutation Status. |

Output fields:

- `id`: Row ID
- `requestId`: Request ID
- `completed`: Completed (boolean)
- `warning`: Warning

### `delete_rows`

**Delete Rows.** Permanently deletes 1-500 rows (by row ID) from a Coda table or view. Use only when the user asks to remove rows; get the IDs from List Rows first. Row IDs that no longer exist are ignored, so a repeat call leaves the same end state and it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `tableIdOrName` | string | yes |  | Table ID or Name. The table ID (starts with "grid-" or "table-") or its exact name. IDs are safer: names can change or repeat. Use List Tables to find it. |
| `rowIds` | array | yes |  | Row IDs. IDs of the rows to delete (they start with "i-"). |
| `waitForCompletion` | boolean | no | `true` | Wait for Coda to Apply. Coda applies changes in the background. When on, the step waits up to 30 seconds until the change is applied; if it takes longer, the step still succeeds with Completed = false and you can check later with Get Mutation Status. |

Output fields:

- `rowIds`: Deleted Row IDs
- `requestId`: Request ID
- `completed`: Completed (boolean)
- `warning`: Warning

### `push_button`

**Push Button.** Presses the button in one row's button column, which runs the action the doc owner configured (it can edit rows, send notifications or call Packs). Use only when the user asks to press that button. A button disabled for that row is accepted but does nothing; check the row afterwards if the outcome matters. Not idempotent: each press runs the action again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `tableIdOrName` | string | yes |  | Table ID or Name. The table ID (starts with "grid-" or "table-") or its exact name. IDs are safer: names can change or repeat. Use List Tables to find it. |
| `rowIdOrName` | string | yes |  | Row ID. The row ID (starts with "i-"), for example from List Rows. A display-column value also works, but if several rows share it Coda picks one at random. |
| `columnIdOrName` | string | yes |  | Button Column ID or Name. The button column (List Columns shows it with type "button"). |
| `waitForCompletion` | boolean | no | `true` | Wait for Coda to Apply. Coda applies changes in the background. When on, the step waits up to 30 seconds until the change is applied; if it takes longer, the step still succeeds with Completed = false and you can check later with Get Mutation Status. |

Output fields:

- `rowId`: Row ID
- `columnId`: Button Column ID
- `requestId`: Request ID
- `completed`: Completed (boolean)
- `warning`: Warning

### `list_formulas`

**List Named Formulas.** Lists the named formulas of a Coda doc (ID, name, page) one page at a time. Use to find a formula before Get Named Formula reads its current value. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `limit` | number | no | `25` | Limit. How many items to return in this page (1-100). |
| `pageToken` | string | no |  | Page Token. Leave empty for the first page. To get the next page, pass the Next Page Token from the previous result. |

Output fields:

- `items`: Formulas
- `items[].id`: Formula ID
- `items[].name`: Name
- `items[].parent`: Page
- `items[].parent.id`: Page ID
- `items[].parent.name`: Name
- `items[].parent.browserLink`: Browser Link (url)
- `nextPageToken`: Next Page Token
- `hasMore`: Has More (boolean)

### `get_formula`

**Get Named Formula.** Returns the current computed value of a named formula in a Coda doc (for example a total), by formula ID or name. Use List Named Formulas to find it. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `formulaIdOrName` | string | yes |  | Formula ID or Name. The formula ID (starts with "f-") or its exact name. |

Output fields:

- `id`: Formula ID
- `name`: Name
- `parent`: Page
- `parent.id`: Page ID
- `parent.name`: Name
- `parent.browserLink`: Browser Link (url)
- `value`: Value

### `list_controls`

**List Controls.** Lists the controls of a Coda doc (sliders, select lists, date pickers, buttons…) with ID, name and page, one page at a time. Use to find a control before Get Control reads its value. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `limit` | number | no | `25` | Limit. How many items to return in this page (1-100). |
| `pageToken` | string | no |  | Page Token. Leave empty for the first page. To get the next page, pass the Next Page Token from the previous result. |

Output fields:

- `items`: Controls
- `items[].id`: Control ID
- `items[].name`: Name
- `items[].parent`: Page
- `items[].parent.id`: Page ID
- `items[].parent.name`: Name
- `items[].parent.browserLink`: Browser Link (url)
- `nextPageToken`: Next Page Token
- `hasMore`: Has More (boolean)

### `get_control`

**Get Control.** Returns a Coda control's type and current value (for example a slider position or a selected option), by control ID or name. Use List Controls to find it. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `controlIdOrName` | string | yes |  | Control ID or Name. The control ID (starts with "ctrl-") or its exact name. |

Output fields:

- `id`: Control ID
- `name`: Name
- `parent`: Page
- `parent.id`: Page ID
- `parent.name`: Name
- `parent.browserLink`: Browser Link (url)
- `controlType`: Control Type
- `value`: Value

### `get_mutation_status`

**Get Mutation Status.** Checks whether an earlier Coda write, identified by the Request ID it returned, has been applied, and returns any warning. Use when a write returned Completed = false. Coda keeps statuses for about a day. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `requestId` | string | yes |  | Request ID. The Request ID returned by a previous Coda step. |

Output fields:

- `requestId`: Request ID
- `completed`: Completed (boolean)
- `warning`: Warning

### `resolve_browser_link`

**Resolve Coda Link.** Turns a Coda / Superhuman Docs URL into the object it points to (doc, page, table, row, column…) with its ID and the doc and table IDs. Use first whenever the user gives a link instead of IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Link. A coda.io or docs.superhuman.com link copied from the browser. |

Output fields:

- `resourceType`: Object Type
- `id`: Object ID
- `name`: Name
- `docId`: Doc ID
- `tableId`: Table ID
- `browserLink`: Browser Link (url)

### `list_permissions`

**List Doc Sharing.** Lists the people, domains or link-sharing entries a Coda doc is shared with, each with a permission ID and access level (readonly, comment, write), one page at a time. Use to find the permission ID before Remove Doc Sharing. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `limit` | number | no | `25` | Limit. How many items to return in this page (1-100). |
| `pageToken` | string | no |  | Page Token. Leave empty for the first page. To get the next page, pass the Next Page Token from the previous result. |

Output fields:

- `items`: Sharing
- `items[].id`: Permission ID
- `items[].access`: Access
- `items[].principal`: Shared With
- `items[].principal.type`: Type
- `items[].principal.email`: Email (email)
- `items[].principal.domain`: Domain
- `nextPageToken`: Next Page Token
- `hasMore`: Has More (boolean)

### `add_permission`

**Share Doc.** Shares a Coda doc with one email address or one email domain at readonly, comment or write access, optionally without the notification email. Use only when the user asks to share the doc with that person or domain; public or workspace-wide sharing is not offered. Sharing again with the same person updates the same entry, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `principalType` | string | yes | `"email"` | Share With. One of `"email"`, `"domain"`. |
| `principal` | string | yes |  | Email or Domain. For a person: their email, for example ada@example.com. For a domain: example.com. |
| `access` | string | yes | `"readonly"` | Access. One of `"readonly"`, `"comment"`, `"write"`. |
| `suppressEmail` | boolean | no | `false` | Do Not Send Notification Email. |

Output fields:

- `docId`: Doc ID
- `permissionId`: Permission ID
- `principalType`: Shared With Type
- `principal`: Shared With
- `access`: Access

### `remove_permission`

**Remove Doc Sharing.** Removes one sharing entry from a Coda doc by permission ID, so that person or domain loses access. Get the ID from List Doc Sharing. Removing an entry that is already gone succeeds without error, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `permissionId` | string | yes |  | Permission ID. From List Doc Sharing or Share Doc. |

Output fields:

- `docId`: Doc ID
- `permissionId`: Permission ID
- `removed`: Removed (boolean)
- `alreadyRemoved`: Already Removed (boolean)

### `trigger_automation`

**Trigger Automation.** Runs a Coda automation rule set to "Webhook invoked", passing an optional JSON payload the rule can read. The rule does whatever the doc owner configured (edit rows, notify people). Use only for that rule ID. Not idempotent: each call runs the rule again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `docId` | string | yes |  | Doc ID or Link. The doc ID (for example AbC123xyZ) or the doc's browser link. Use List Docs to find it. |
| `ruleId` | string | yes |  | Automation Rule ID. In the doc, open Automations, pick the rule with the "Webhook invoked" trigger, and copy its rule ID (it looks like grid-auto-xxxx). |
| `payload` | JSON | no |  | Payload. Optional JSON object the automation can read as its webhook payload. |

Output fields:

- `ruleId`: Rule ID
- `requestId`: Request ID

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

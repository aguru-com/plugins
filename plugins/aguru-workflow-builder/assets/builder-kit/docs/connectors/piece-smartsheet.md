# Smartsheet

Dynamic work execution platform for teams to plan, capture, manage, automate, and report on work at scale.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-smartsheet'
  version: '0.1.10'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Access Token

> To obtain your Smartsheet access token:
>
> 1. Sign in to your Smartsheet account.
> 2. Click on your profile picture in the top right corner.
> 3. Select **Personal Settings** from the dropdown menu.
> 4. In the left panel, click **API Access**.
> 5. Click **Generate new access token**.
> 6. Enter a name for your token (e.g., "Activepieces Integration").
> 7. Click **OK** to generate the token..
> 8. Copy the access token and paste it into the connection field.

## Actions

### `add_row_to_sheet`

**Add Row to Sheet.** Appends a new row to a Smartsheet sheet, populating cells by column ID; position is controlled by a top-or-bottom prop. Use when adding records to a sheet identified by its sheet ID. At least one cell value is required. Not idempotent: each call inserts another distinct row. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sheet_id` | string | yes |  | Sheet. Select a sheet. A value the product loads from the provider, such as an id; write the value itself. |
| `cells` | object | yes |  | Cells. Cell data with properties based on column types. An object whose fields depend on other inputs; the product shows them. |
| `location_type` | string | yes | `"bottom"` | Add Row to Top or Bottom. One of `"top"`, `"bottom"`. |

### `update_row`

**Update Row.** Updates cell values on an existing row in a Smartsheet sheet, matched by sheet ID and row ID. Use to modify fields on a row you can already identify; only the provided cells are changed. Idempotent: re-applying the same cell values to the same row leaves it in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sheet_id` | string | yes |  | Sheet. Select a sheet. A value the product loads from the provider, such as an id; write the value itself. |
| `row_id` | string | yes |  | Row. A value the product loads from the provider, such as an id; write the value itself. |
| `cells` | object | yes |  | Cells. Cell data with properties based on column types. An object whose fields depend on other inputs; the product shows them. |

### `attach_file_to_row`

**Attach File to Row.** Attaches a file or link to a row in a Smartsheet sheet, identified by sheet ID and row ID. The attachment type switches between two modes: uploading a binary file (FILE), or linking an external URL such as a Box, Dropbox, Google Drive, OneDrive, or plain web link. Use to add supporting documents to a row. Not idempotent: each call adds another attachment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sheet_id` | string | yes |  | Sheet. Select a sheet. A value the product loads from the provider, such as an id; write the value itself. |
| `row_id` | string | yes |  | Row. A value the product loads from the provider, such as an id; write the value itself. |
| `attachment_type` | string | yes | `"FILE"` | Attachment Type. Type of attachment to add. One of `"FILE"`, `"LINK"`, `"BOX_COM"`, `"DROPBOX"`, `"EGNYTE"`, `"EVERNOTE"`, `"GOOGLE_DRIVE"`, `"ONEDRIVE"`. |
| `file` | file | no |  | File. The file to attach (required for FILE type) Files are not supported; an action that needs one fails. |
| `url` | string | no |  | URL. The URL to attach (required for URL-based attachment types) |
| `attachment_name` | string | no |  | Attachment Name. Name for the attachment (optional, will use file name or URL if not provided) |
| `attachment_sub_type` | string | no |  | Attachment Sub Type. Sub type for Google Drive and Egnyte attachments. One of `"DOCUMENT"`, `"DRAWING"`, `"FOLDER"`, `"PDF"`, `"PRESENTATION"`, `"SPREADSHEET"`. |
| `mime_type` | string | no |  | MIME Type. MIME type of the attachment (optional, auto-detected for files) |

### `find_rows_by_query`

**Find Row.** Runs a text search in Smartsheet and returns matching items. The search scope switches between two modes: a single sheet (requires its sheet ID) or every sheet the account can access. Use to locate rows (or other object types such as comments, attachments, or sheets) by keyword before acting on them; results can be narrowed by content scope, object type, and modified-since date. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_scope` | string | yes | `"specific_sheet"` | Search Scope. Choose whether to search within a specific sheet or across all accessible sheets. One of `"specific_sheet"`, `"all_sheets"`. |
| `sheet_id` | string | no |  | Sheet. Select a sheet. A value the product loads from the provider, such as an id; write the value itself. |
| `query` | string | yes |  | Search Query. Text to search for. Use double quotes for exact phrase matching (e.g., "project status") |
| `search_scopes` | array | no |  | Search Scopes. Specify what types of content to search in (leave empty to search all) One of `"cellData"`, `"comments"`, `"attachments"`, `"sheetNames"`, `"folderNames"`, `"reportNames"`, `"sightNames"`, `"templateNames"`, `"workspaceNames"`, `"summaryFields"`. |
| `include_favorites` | boolean | no | `false` | Include Favorite Flags. Include information about which items are marked as favorites. |
| `modified_since` | ISO date-time string | no |  | Modified Since. Only return results modified on or after this date/time. |
| `max_results` | number | no | `50` | Max Results. Maximum number of results to return (default: 50, max: 100) |
| `object_types_filter` | array | no |  | Filter by Object Types. Only return results of specific object types (leave empty for all types) One of `"row"`, `"sheet"`, `"attachment"`, `"discussion"`, `"dashboard"`, `"report"`, `"folder"`, `"template"`, `"workspace"`, `"summaryField"`. |

### `find_attachment_by_row_id`

**List Row Attachments.** Lists the attachments on a specific Smartsheet row, identified by sheet ID and row ID, covering both row-level and discussion-level attachments. Use to discover or download files and links tied to a row; results can be paginated and filtered by attachment type, parent type, and file size. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sheet_id` | string | yes |  | Sheet. Select a sheet. A value the product loads from the provider, such as an id; write the value itself. |
| `row_id` | string | yes |  | Row. A value the product loads from the provider, such as an id; write the value itself. |
| `include_all` | boolean | no | `false` | Include All Results. If true, include all results without pagination (overrides page and page size) |
| `page` | number | no | `1` | Page Number. Which page to return (defaults to 1, ignored if "Include All Results" is true) |
| `page_size` | number | no | `100` | Page Size. Maximum number of items to return per page (defaults to 100, max 10000, ignored if "Include All Results" is true) |
| `attachment_type_filter` | array | no |  | Filter by Attachment Type. Only return attachments of specific types (leave empty for all types) One of `"FILE"`, `"LINK"`, `"BOX_COM"`, `"DROPBOX"`, `"EGNYTE"`, `"EVERNOTE"`, `"GOOGLE_DRIVE"`, `"ONEDRIVE"`, `"TRELLO"`. |
| `parent_type_filter` | array | no |  | Filter by Parent Type. Only return attachments from specific parent types (leave empty for all) One of `"ROW"`, `"COMMENT"`, `"SHEET"`, `"PROOF"`. |
| `min_file_size_kb` | number | no |  | Minimum File Size (KB). Only return files with size greater than or equal to this value (applies to FILE type only) |
| `max_file_size_kb` | number | no |  | Maximum File Size (KB). Only return files with size less than or equal to this value (applies to FILE type only) |

### `find_sheet_by_name`

**Find Sheet(s).** Lists the sheets the account can access in Smartsheet. Leaving the name filter empty returns all sheets, while supplying a name filters to partial (or exact) matches. Use to resolve a sheet name to its sheet ID or to enumerate available sheets before another action; results can be filtered by access level and modification date. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sheet_name` | string | no |  | Sheet Name Filter. Filter sheets by name (partial or exact match). Leave empty to list all sheets. |
| `exact_match` | boolean | no | `false` | Exact Name Match. When filtering by name, require exact match instead of partial match. |
| `include_all` | boolean | no | `false` | Include All Results. If true, include all results without pagination (overrides page and page size) |
| `page` | number | no | `1` | Page Number. Which page to return (defaults to 1, ignored if "Include All Results" is true) |
| `page_size` | number | no | `100` | Page Size. Maximum number of items to return per page (defaults to 100, max 10000, ignored if "Include All Results" is true) |
| `access_api_level` | string | no | `"0"` | Access API Level. API access level for viewing and filtering permissions. One of `"0"`, `"1"`. |
| `access_level_filter` | array | no |  | Filter by Access Level. Only return sheets where you have specific access levels (leave empty for all) One of `"OWNER"`, `"ADMIN"`, `"EDITOR_SHARE"`, `"EDITOR"`, `"COMMENTER"`, `"VIEWER"`. |
| `modified_since` | ISO date-time string | no |  | Modified Since. Only return sheets modified on or after this date/time. |
| `include_sheet_version` | boolean | no | `false` | Include Sheet Version. Include current version number of each sheet. |
| `include_source_info` | boolean | no | `false` | Include Source Information. Include information about the source (template/sheet) each sheet was created from. |
| `numeric_dates` | boolean | no | `false` | Numeric Dates. Return dates as milliseconds since UNIX epoch instead of ISO strings. |
| `created_date_range` | string | no |  | Created Date Range. Filter sheets by creation date range. One of `"all"`, `"week"`, `"month"`, `"quarter"`, `"year"`. |
| `sort_by` | string | no | `"name"` | Sort Results By. How to sort the returned sheets. One of `"name"`, `"created_desc"`, `"created_asc"`, `"modified_desc"`, `"modified_asc"`, `"access"`. |

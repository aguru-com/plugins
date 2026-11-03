# Google Sheets

Create, edit, and collaborate on spreadsheets online

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-sheets'
  version: '0.18.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

### `CUSTOM_AUTH`: Service Account (Advanced)

> Authenticate via service account from https://console.cloud.google.com/ > IAM & Admin > Service Accounts > Create Service Account > Keys > Add key.  <br> <br> You can optionally use domain-wide delegation (https://support.google.com/a/answer/162106?hl=en#zippy=%2Cset-up-domain-wide-delegation-for-a-client) to access spreadsheets without adding the service account to each one. <br> <br> **Note:** Without a user email, the service account only has access to files/folders you explicitly share with it.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `serviceAccount` | string | yes |  | Service Account JSON Key. |
| `userEmail` | string | no |  | User Email. Email address of the user to impersonate for domain-wide delegation. |

## Actions

### `insert_row`

**Add Row.** Appends a single new row to the end of a worksheet. Use when an agent needs to record one new entry into a Google Sheet. Requires a spreadsheet and sheet to be selected; values map to columns either positionally or by header name. Not idempotent — calling it again appends another row. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `first_row_headers` | boolean | no | `false` | First Row Contains Headers. Enter values by column name instead of left to right. |
| `as_string` | boolean | no |  | As String. Store dates and formulas as plain text instead of evaluating them. |
| `values` | object | yes |  | Values. The values to add. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `spreadsheetId`: Spreadsheet ID
- `tableRange`: Table Range
- `row`: Row Number
- `updates`: Updates
- `updates.updatedRange`: Updated Range
- `updates.updatedRows`: Updated Rows (number)
- `updates.updatedColumns`: Updated Columns (number)
- `updates.updatedCells`: Updated Cells (number)

### `insert-row-at-top`

**Add Row at Top.** Inserts a blank row near the top of a worksheet and writes the supplied values into it, shifting every existing row below it down by one; the insertion point defaults to just under row 1 but can be moved with Insert After Row. Use when newest-first ordering matters — prefer Add Row to append at the bottom, which is cheaper and does not renumber existing rows. Not idempotent: each call inserts another row and shifts the rest down again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `first_row_headers` | boolean | no | `false` | First Row Contains Headers. Enter values by column name instead of left to right. |
| `as_string` | boolean | no |  | As String. Store dates and formulas as plain text instead of evaluating them. |
| `insertAfterRow` | number | no | `1` | Insert After Row. Insert the new row below this row. Defaults to 1, the header row. |
| `values` | object | yes |  | Values. The values to add. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `row`: Row Number (number)
- `updates`: Updates
- `updates.spreadsheetId`: Spreadsheet ID
- `updates.updatedRange`: Updated Range
- `updates.updatedRows`: Updated Rows (number)
- `updates.updatedColumns`: Updated Columns (number)
- `updates.updatedCells`: Updated Cells (number)

### `google-sheets-insert-multiple-rows`

**Add Multiple Rows.** Bulk-appends many rows to a worksheet in one call, accepting input as CSV, JSON, or per-column values. Use for batch inserts instead of calling Add Row repeatedly. Optional flags can overwrite existing data or skip duplicates keyed on a chosen column; in default append mode it is not idempotent — repeating it adds the rows again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `input_type` | string | yes | `"column_names"` | Rows Data Format. Select the format of the input values to be added into the worksheet. One of `"csv"`, `"json"`, `"column_names"`. |
| `values` | object | yes |  | Values. The values to add. An object whose fields depend on other inputs; the product shows them. |
| `overwrite` | boolean | no | `false` | Overwrite Existing Data. Replace every existing row with the new data. Extra rows are cleared. |
| `check_for_duplicate` | boolean | no | `false` | Skip Duplicate Rows. Skip rows whose value in the chosen column already exists. |
| `check_for_duplicate_column` | object | no |  | Duplicate Value Column. The column to check for duplicate values. An object whose fields depend on other inputs; the product shows them. |
| `as_string` | boolean | no |  | As String. Store dates and formulas as plain text instead of evaluating them. |
| `headerRow` | number | yes | `1` | Header Row. The row that contains the column names. |

Output fields:

- `tableRange`: Table Range
- `spreadsheetId`: Spreadsheet ID
- `updates`: Updates
- `updates.updatedRange`: Updated Range
- `updates.updatedRows`: Updated Rows (number)
- `updates.updatedColumns`: Updated Columns (number)
- `updates.updatedCells`: Updated Cells (number)
- `updates.spreadsheetId`: Spreadsheet ID

### `update_row`

**Update Row.** Overwrites the cell values of one existing row, identified by its row number, in a selected worksheet. Use when an agent already knows the target row (e.g. from a Find or Get action) and wants to change its contents. Idempotent — re-running with the same row number and values leaves the sheet in the same state; empty values skip (do not clear) those cells. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `row_id` | number | yes |  | Row Number. The row number to update. |
| `first_row_headers` | boolean | no | `false` | First Row Contains Headers. Enter values by column name instead of left to right. |
| `values` | object | yes |  | Values. The values to add. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `row`: Row Number
- `updates.updatedRange`: Updated Range
- `updates.spreadsheetId`: Spreadsheet ID

### `update-multiple-rows`

**Update Multiple Rows.** Overwrites several existing rows in one batch call, each targeted by its own row id. Use when an agent needs to apply edits to multiple known rows efficiently rather than calling Update Row repeatedly. Idempotent — re-running with the same row ids and values produces the same sheet state; rows without a row id are skipped. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `values` | object | yes |  | Values. The values to update. An object whose fields depend on other inputs; the product shows them. |
| `as_string` | boolean | no |  | As String. Store dates and formulas as plain text instead of evaluating them. |
| `headerRow` | number | yes | `1` | Header Row. The row that contains the column names. |

Output fields:

- `totalUpdatedRows`: Total Updated Rows (number)
- `totalUpdatedColumns`: Total Updated Columns (number)
- `totalUpdatedCells`: Total Updated Cells (number)
- `totalUpdatedSheets`: Total Updated Sheets (number)
- `spreadsheetId`: Spreadsheet ID
- `responses`: Responses
- `responses[].updatedRange`: Updated Range
- `responses[].updatedRows`: Updated Rows (number)
- `responses[].updatedColumns`: Updated Columns (number)
- `responses[].updatedCells`: Updated Cells (number)
- `responses[].spreadsheetId`: Spreadsheet ID

### `delete_row`

**Delete Row.** Removes one row, identified by its row number, from a worksheet and shifts all rows below it up. Use when an agent needs to delete a known row. Not idempotent — because remaining rows renumber after deletion, repeating the same row number deletes a different row each time, so re-target the row before any retry. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `rowId` | number | yes |  | Row Number. The number of the row you want to delete. |

Output fields:

- `success`: Success (boolean)

### `delete-multiple-rows`

**Delete Multiple Rows.** Permanently deletes rows from a worksheet in one batch, in either of two modes: a contiguous range given by starting and ending row, or a comma-separated list of specific 1-based row numbers. Use instead of Delete Row when several rows must go at once, and Clear Row(s) instead when the rows should stay in place with only their contents erased. Not idempotent — surviving rows renumber after each deletion, so repeating the same call removes different rows; re-resolve the targets before any retry. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `mode` | string | yes | `"range"` | Mode. Delete a range of rows, or a list of specific row numbers. One of `"range"`, `"list"`. |
| `startingRow` | number | no |  | Starting Row. First row to delete (used in "Contiguous Range" mode). |
| `endingRow` | number | no |  | Ending Row. Last row to delete (used in "Contiguous Range" mode). |
| `rowNumbers` | string | no |  | Row Numbers. Comma-separated row numbers to delete. |

Output fields:

- `success`: Success (boolean)
- `deletedRanges`: Deleted Ranges
- `deletedRanges[].startRow`: Start Row (number)
- `deletedRanges[].endRow`: End Row (number)

### `find_rows`

**Find Rows.** Searches a worksheet for rows whose value in a chosen column matches a search value (exact or contains), returning up to a requested number of matches. Use to locate rows before reading, updating, or deleting them; leave the search value empty to fetch rows sequentially. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `columnName` | string | yes |  | Column Name. The name of the column to search in. A value the product loads from the provider, such as an id; write the value itself. |
| `searchValue` | string | no |  | Search Value. The value to look for. Leave empty to return all rows. |
| `matchCase` | boolean | yes | `false` | Exact Match. Only return rows whose cell matches the value exactly. |
| `startingRow` | number | no |  | Starting Row. Start searching from this row number. |
| `numberOfRows` | number | no | `1` | Number of Rows. How many matching rows to return. |
| `headerRow` | number | yes | `1` | Header Row. The row that contains the column names. |
| `useHeaderNames` | boolean | no | `false` | Use Column Names. Key each row by column name instead of A, B, C. |

Output fields:

- `[].row`: Row Number
- `[].values`: Values (an object whose keys vary)

### `find-or-create-row`

**Find or Create Row.** Looks up the first row in a worksheet whose value in a chosen column matches a search value and returns it, or appends a new row from the supplied values when nothing matches, flagging which happened. Use instead of Add Row when the entry may already exist and duplicates must be avoided, and Find Rows when creation is not wanted. Matching is a case-insensitive substring test unless Exact Match is on; idempotent in practice — a second call finds the row the first one created, provided that row carries the search value in the searched column. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `columnName` | string | yes |  | Column Name. The name of the column to search in. A value the product loads from the provider, such as an id; write the value itself. |
| `searchValue` | string | yes |  | Search Value. The value to look for in the selected column. |
| `matchCase` | boolean | yes | `false` | Exact Match. Only treat exact matches as found. |
| `headerRow` | number | yes | `1` | Header Row. The row that contains the column names. |
| `useHeaderNames` | boolean | no | `false` | Use Column Names. Key each row by column name instead of A, B, C. |
| `first_row_headers` | boolean | no | `false` | First Row Contains Headers. Enter values by column name instead of left to right. |
| `as_string` | boolean | no |  | As String. Store dates and formulas as plain text instead of evaluating them. |
| `values` | object | yes |  | Values. The values to add. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `found`: Found (boolean)
- `created`: Created (boolean)
- `row`: Row Number
- `values`: Values (an object whose keys vary)
- `values.A`: Column A
- `values.B`: Column B
- `values.C`: Column C

### `create-spreadsheet`

**Create Spreadsheet.** Creates a new, empty Google Sheets spreadsheet with the given title, optionally inside a specified Drive folder. Use when an agent needs a fresh spreadsheet to populate. Not idempotent — each call creates a separate spreadsheet even if the title is identical. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The title of the new spreadsheet. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `folder` | string | no |  | Parent Folder. Where to create the spreadsheet. Defaults to My Drive. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Spreadsheet ID

### `create-worksheet`

**Create Worksheet.** Adds a new worksheet (tab) to an existing spreadsheet, optionally seeding a header row. Use when an agent needs another tab within a spreadsheet. Not idempotent — each call adds a separate worksheet even if a tab with the same title already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to add the worksheet to. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The title of the new worksheet. |
| `headers` | array | no |  | Headers. Column names to write into the first row. |

Output fields:

- `id`: Worksheet ID
- `spreadsheetId`: Spreadsheet ID
- `updates.updatedRange`: Updated Range

### `find-or-create-worksheet`

**Find or Create Worksheet.** Looks up a worksheet (tab) by exact, case-sensitive title inside a spreadsheet and returns it, or creates that tab — optionally seeding a header row — when no tab with the title exists, flagging which happened. Use instead of Create Worksheet when the tab may already exist, since Create Worksheet adds a duplicate tab regardless. Idempotent — a second call with the same title returns the existing tab rather than creating another, and the headers are written only on creation. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to look in. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Worksheet Title. The title to look up. The match is exact and case-sensitive. |
| `headers` | array | no |  | Headers (Only Used When Creating). Column headers to add to the new worksheet if it has to be created. |

Output fields:

- `found`: Found (boolean)
- `created`: Created (boolean)
- `worksheet`: Worksheet
- `worksheet.title`: Title
- `worksheet.sheetId`: Sheet ID
- `worksheet.index`: Index (number)
- `worksheet.sheetType`: Sheet Type
- `worksheet.gridProperties`: Grid Properties
- `worksheet.gridProperties.rowCount`: Row Count (number)
- `worksheet.gridProperties.columnCount`: Column Count (number)

### `clear_sheet`

**Clear Sheet.** Deletes all data rows from a worksheet, optionally preserving the header row. Use when an agent needs to empty a sheet before repopulating it. Idempotent — clearing an already-empty sheet leaves it empty; this is destructive and removes all existing row content. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `is_first_row_headers` | boolean | no | `false` | First Row Contains Headers. Enter values by column name instead of left to right. |
| `headerRow` | number | yes | `1` | Header Row. The row that contains the column names. |

Output fields:

- `spreadsheetId`: Spreadsheet ID

### `clear-rows`

**Clear Row(s).** Blanks the cell contents of one row or a contiguous row range in a worksheet without removing the rows, so row numbers and downstream references stay stable — prefer Delete Row or Delete Multiple Rows when the rows themselves should disappear, and Clear Sheet when the whole sheet should be emptied. Requires a selected spreadsheet and worksheet plus a 1-based starting row; leaving the ending row empty clears only that single row. Idempotent — re-running over the same range leaves it equally empty, but the erased values cannot be recovered. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `startingRow` | number | yes | `2` | Starting Row. The first row to clear. |
| `endingRow` | number | no |  | Ending Row. The last row to clear. Leave empty to only clear the starting row. |

Output fields:

- `success`: Success (boolean)
- `clearedRange`: Cleared Range
- `startingRow`: Starting Row (number)
- `endingRow`: Ending Row (number)

### `delete-worksheet`

**Delete Worksheet.** Permanently removes one worksheet (tab) from a spreadsheet, identified by its stable sheet id. Use when an agent needs to drop an entire tab and its data. Idempotent on the stable sheet id — the tab ends up absent; this is destructive and cannot be undone. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab to delete. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `spreadsheetId`: Spreadsheet ID

### `rename-worksheet`

**Rename Worksheet.** Changes the title of an existing worksheet, identified by its stable sheet id, within a spreadsheet. Use when an agent needs to relabel a tab. Idempotent — re-running with the same new name leaves the title unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab to rename. A value the product loads from the provider, such as an id; write the value itself. |
| `newName` | string | yes |  | New Worksheet Name. |

Output fields:

- `spreadsheetId`: Spreadsheet ID

### `format-row`

**Format Row(s).** Applies cell formatting (background color, text color, bold, italic, strikethrough) to a range of rows in a worksheet, leaving cell values untouched. Use when an agent needs to style rows rather than change data. Colors are given as HEX codes; idempotent — re-applying the same formatting produces the same appearance. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `startingRow` | number | yes |  | Starting Row. The first row number where formatting should begin. |
| `endingRow` | number | no |  | Ending Row. Last row to format. Leave empty to format only the starting row. |
| `bgColor` | string | no |  | Background Color. Provide a HEX color code (example: #FFD966) |
| `textColor` | string | no |  | Text Color. Provide a HEX color code (example: #FFD966) |
| `bold` | boolean | no |  | Bold. |
| `italic` | boolean | no |  | Italic. |
| `strikethrough` | boolean | no |  | Strikethrough. |

Output fields:

- `success`: Success (boolean)
- `spreadsheetId`: Spreadsheet ID

### `find_row_by_num`

**Get Row by Number.** Reads a single row from a worksheet by its row number, optionally keyed by header names instead of column letters. Use when an agent already knows the exact row to fetch. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `rowNumber` | number | yes |  | Row Number. The row to retrieve, counting from 1. |
| `headerRow` | number | yes | `1` | Header Row. The row that contains the column names. |
| `useHeaderNames` | boolean | no | `true` | Use Column Names. Key each row by column name instead of A, B, C. |

Output fields:

- `found`: Found (boolean)
- `row`: Row Number
- `values`: Values (an object whose keys vary)

### `get_next_rows`

**Get Next Rows.** Reads the next batch of rows from a worksheet, advancing a cursor stored under a memory key so successive calls walk through the sheet without reprocessing rows. Use to iterate a sheet in chunks across runs. Not idempotent — each non-test call moves the stored cursor forward and returns a different batch. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `startRow` | number | yes | `1` | Start Row. The row to start reading from on the first run. |
| `headerRow` | number | yes | `1` | Header Row. The row that contains the column names. |
| `useHeaderNames` | boolean | no | `false` | Use Column Names. Key each row by column name instead of A, B, C. |
| `memKey` | string | yes | `"row_number"` | Memory Key. The key used to store the current row number in memory. |
| `groupSize` | number | yes | `1` | Group Size. The number of rows to get. |

Output fields:

- `[].row`: Row Number
- `[].values`: Values (an object whose keys vary)

### `get-many-rows`

**Get All Rows.** Reads every row from a worksheet in a single call, optionally keyed by header names. Use when an agent needs the full contents of a sheet rather than a search or a single row; be mindful of size on large sheets. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `first_row_headers` | boolean | no | `false` | First Row Contains Headers. Enter values by column name instead of left to right. |

Output fields:

- `[].row`: Row Number
- `[].values`: Values (an object whose keys vary)

### `read-data-range`

**Read Data Range.** Reads raw cell values from a worksheet using an A1-notation range, where leaving the range empty reads the entire worksheet, with switchable orientation (one array per row or per column) and rendering (formatted text, unformatted values, or the underlying formulas). Use when an agent needs a specific block of cells or the formulas behind them; prefer Get All Rows or Find Rows when header-keyed row objects are wanted instead of positional arrays. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `range` | string | no |  | Range (A1 Notation). The cells to read. Leave empty to read the whole worksheet. |
| `majorDimension` | string | yes | `"ROWS"` | Return Data As. Group the results one array per row, or one array per column. One of `"ROWS"`, `"COLUMNS"`. |
| `valueRenderOption` | string | yes | `"FORMATTED_VALUE"` | Cell Values. Return values as displayed, as raw values, or as formulas. One of `"FORMATTED_VALUE"`, `"UNFORMATTED_VALUE"`, `"FORMULA"`. |

Output fields:

- `range`: Resolved Range
- `majorDimension`: Major Dimension
- `values`: Rows

### `find_spreadsheets`

**Find Spreadsheet(s).** Searches Google Drive for spreadsheets whose name matches a query (exact or contains) and returns the matches. Use to resolve a spreadsheet id from a human-readable name before acting on it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `spreadsheet_name` | string | yes |  | Spreadsheet Name. Enter the name of the spreadsheet to search for. |
| `exact_match` | boolean | no | `false` | Exact Match. Only return spreadsheets whose name matches exactly. |

Output fields:

- `found`: Found (boolean)
- `spreadsheets`: Spreadsheets
- `spreadsheets[].name`: Name
- `spreadsheets[].id`: Spreadsheet ID
- `spreadsheets[].webViewLink`: Web View Link (url)
- `spreadsheets[].createdTime`: Created Time (datetime)
- `spreadsheets[].modifiedTime`: Modified Time (datetime)

### `find-worksheet`

**Find Worksheet(s).** Searches the worksheets (tabs) of a given spreadsheet for ones whose title matches a query (exact or contains). Use to resolve a worksheet/sheet id from its tab name before acting on it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to search in. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The worksheet title to search for. |
| `exact_match` | boolean | no | `false` | Exact Match. Only return worksheets whose title matches exactly. |

Output fields:

- `found`: Found (boolean)
- `worksheets`: Worksheets
- `worksheets[].properties.sheetId`: Sheet ID
- `worksheets[].properties.title`: Title
- `worksheets[].properties.index`: Index (number)
- `worksheets[].properties.sheetType`: Sheet Type
- `worksheets[].properties.gridProperties.rowCount`: Row Count (number)
- `worksheets[].properties.gridProperties.columnCount`: Column Count (number)

### `copy-worksheet`

**Copy Worksheet.** Copies an existing worksheet (tab), with its data, into a destination spreadsheet as a new worksheet. Use when an agent needs to duplicate a tab within or across spreadsheets. Not idempotent — each call creates another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `spreadsheetId` | string | yes |  | Source Spreadsheet. The spreadsheet holding the worksheet you want to copy. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet to Copy. The tab to copy. A value the product loads from the provider, such as an id; write the value itself. |
| `desinationSpeadsheetId` | string | yes |  | Destination Spreadsheet. The spreadsheet to copy the worksheet into. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `title`: Title
- `sheetId`: Sheet ID
- `index`: Index (number)
- `sheetType`: Sheet Type
- `gridProperties`: Grid Properties
- `gridProperties.rowCount`: Row Count (number)
- `gridProperties.columnCount`: Column Count (number)

### `create-column`

**Create Column.** Inserts a new column into a worksheet and writes a header name into its first row, either at a given column index or after the last existing column. Use when an agent needs to add a field to a sheet. Not idempotent — each call inserts another column. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `columnName` | string | yes |  | Column Name. The header text for the new column. |
| `columnIndex` | number | no |  | Column Index. Position of the new column, counting from 1. Empty adds it last. |

Output fields:

- `updatedRange`: Updated Range
- `spreadsheetId`: Spreadsheet ID
- `updatedColumns`: Updated Columns (number)
- `updatedRows`: Updated Rows (number)
- `updatedCells`: Updated Cells (number)

### `export_sheet`

**Export Worksheet.** Exports a worksheet as a CSV or TSV file, returned either as a file reference or as raw text. Use when an agent needs the sheet contents in a flat delimited format for downstream processing or attachment. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheetId` | string | yes |  | Spreadsheet. The spreadsheet to work in. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetId` | string | yes |  | Worksheet. The tab inside that spreadsheet. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Shared Drives. Also include spreadsheets stored in shared drives. |
| `format` | string | yes | `"csv"` | Export Format. Select the file type to export the sheet as. One of `"csv"`, `"tsv"`. |
| `returnAsText` | boolean | no | `false` | Return as Text. Return the exported data as text instead of a file. |

Output fields:

- `filename`: File Name
- `format`: Format
- `file`: File (url)

### `sheets_add_column`

**Add Column.** Inserts a new column into a worksheet and writes a header name into its first row, at a given 1-based column index or after the last column. Use to add a field. Not idempotent — each call inserts another column. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `column_name` | string | yes |  | Column Name. The header name to write into the first row of the new column. |
| `column_index` | number | no |  | Column Index. The 1-based column index where the column is inserted (e.g. 3 inserts at the third column). If less than 1 or omitted, the column is added after the last current column. |

Output fields:

- `spreadsheetId`: Spreadsheet ID
- `updatedRange`: Updated Range
- `updatedRows`: Updated Rows (number)
- `updatedColumns`: Updated Columns (number)
- `updatedCells`: Updated Cells (number)

### `sheets_add_multiple_rows`

**Add Multiple Rows.** Bulk-appends many rows in one call from CSV, JSON, or per-column values, with optional overwrite or duplicate-skip keyed on a column. Use for batch inserts instead of repeated sheets_add_row; in default append mode it is not idempotent. Overwrite mode replaces the existing data block (assuming a header at row 1). JSON mode adds any missing columns to the header row. Duplicate matching is case-insensitive. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `input_type` | string | yes | `"json"` | Rows Data Format. Select the format of the input values to be added into the worksheet. One of `"csv"`, `"json"`, `"column_names"`. |
| `values` | JSON | yes |  | Values. The rows to add. For "JSON": an array of objects keyed by header name, e.g. [{"Name":"a","Age":"1"}]. For "CSV": a CSV string whose first row is the headers. For "Column Names": an array of objects keyed by column letter, e.g. [{"A":"a","B":"1"}]. |
| `overwrite` | boolean | no | `false` | Overwrite Existing Data?. Enable this option to replace all existing data in the sheet with new data from your input. This will clear any extra rows beyond the updated range. |
| `check_for_duplicate` | boolean | no | `false` | Avoid Duplicates?. Enable this option to check for duplicate values before inserting data into the sheet. Only unique rows will be added based on the selected column. |
| `duplicate_column` | string | no |  | Duplicate Value Column. The column letter (e.g. "A") to check for duplicate values. Required when "Avoid Duplicates?" is on. |
| `as_string` | boolean | no |  | As String. Inserted values that are dates and formulas will be entered as strings and have no effect. |
| `header_row` | number | yes | `1` | Header Row Number. The row number where your column headers are located (usually row 1). |

Output fields:

- `spreadsheetId`: Spreadsheet ID
- `tableRange`: Table Range
- `updates`: Updates
- `updates.spreadsheetId`: Spreadsheet ID
- `updates.updatedRange`: Updated Range
- `updates.updatedRows`: Updated Rows (number)
- `updates.updatedColumns`: Updated Columns (number)
- `updates.updatedCells`: Updated Cells (number)

### `sheets_add_row_at_top`

**Add Row at Top.** Inserts a new row near the top of a worksheet (default: just under the header row), shifting existing rows down. Use to prepend an entry; to append at the end use sheets_add_row. Not idempotent — each call inserts another row and renumbers rows below. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `first_row_headers` | boolean | yes | `false` | Values Keyed by Column Letter. When true, "values" is an object keyed by column letter, e.g. {"A":"x","B":"y"}. When false, "values" is a positional array, e.g. ["x","y"] mapped to columns A, B, … in order. |
| `as_string` | boolean | no |  | As String. Inserted values that are dates and formulas will be entered as strings and have no effect. |
| `insert_after_row` | number | no | `1` | Insert After Row. The row above which the new row will be inserted. Defaults to 1 (insert right under row 1, which is the header in most sheets). |
| `values` | JSON | yes |  | Values. The row values. If "Values Keyed by Column Letter" is on, pass an object like {"A":"x","B":"y"}; otherwise pass an array like ["x","y"]. |

Output fields:

- `row`: Row Number (number)
- `updates`: Updates
- `updates.spreadsheetId`: Spreadsheet ID
- `updates.updatedRange`: Updated Range
- `updates.updatedRows`: Updated Rows (number)
- `updates.updatedColumns`: Updated Columns (number)
- `updates.updatedCells`: Updated Cells (number)

### `sheets_add_row`

**Add Row.** Appends a single new row to the end of a worksheet, mapping values to columns positionally or by header name. Use to record one new entry; for raw A1-array appends use sheets_append_values, for many rows at once use sheets_add_multiple_rows. Not idempotent — each call appends another row. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `first_row_headers` | boolean | yes | `false` | Values Keyed by Column Letter. When true, "values" is an object keyed by column letter, e.g. {"A":"x","B":"y"}. When false, "values" is a positional array, e.g. ["x","y"] mapped to columns A, B, … in order. |
| `as_string` | boolean | no |  | As String. Inserted values that are dates and formulas will be entered as strings and have no effect. |
| `values` | JSON | yes |  | Values. The row values. If "Values Keyed by Column Letter" is on, pass an object like {"A":"x","B":"y"}; otherwise pass an array like ["x","y"]. |

Output fields:

- `spreadsheetId`: Spreadsheet ID
- `tableRange`: Table Range
- `updates`: Updates
- `updates.spreadsheetId`: Spreadsheet ID
- `updates.updatedRange`: Updated Range
- `updates.updatedRows`: Updated Rows (number)
- `updates.updatedColumns`: Updated Columns (number)
- `updates.updatedCells`: Updated Cells (number)
- `row`: Row Number (number)

### `sheets_add_worksheet`

**Add Worksheet.** Adds a new worksheet (tab) to a spreadsheet, optionally seeding a header row. Use when an agent needs another tab; to find-or-reuse a tab by title use sheets_find_or_create_worksheet. Not idempotent — each call adds a separate tab even if the title already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `title` | string | yes |  | Title. The title of the new worksheet. |
| `headers` | array | no |  | Headers. Optional column headers to seed into the first row of the new worksheet. |

Output fields:

- `id`: Worksheet ID (number)
- `spreadsheetId`: Spreadsheet ID
- `updates`: Updates
- `updates.spreadsheetId`: Spreadsheet ID
- `updates.updatedRange`: Updated Range
- `updates.updatedRows`: Updated Rows (number)
- `updates.updatedColumns`: Updated Columns (number)
- `updates.updatedCells`: Updated Cells (number)

### `sheets_append_dimension`

**Append Rows/Columns.** Appends N blank rows or columns to the end of a worksheet's grid (grows the grid, no shifting). Use to enlarge a sheet before a big write. Not idempotent — each call grows the grid further. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id (gid). Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `dimension` | string | yes | `"ROWS"` | Dimension. Whether to append rows or columns. One of `"ROWS"`, `"COLUMNS"`. |
| `length` | number | yes |  | Length. The number of blank rows or columns to append to the end of the grid. |

Output fields:

- `success`: Success (boolean)
- `spreadsheetId`: Spreadsheet ID

### `sheets_append_values`

**Append Values (Raw).** Appends rows of values after the last row with data in a worksheet, as a raw 2D array. Use when you have explicit values and don't need header-to-column mapping; for header-aware single-row insert use sheets_add_row. Each call adds new rows, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `worksheet_title` | string | yes |  | Worksheet Title. The exact tab title to append to. Must match the tab name exactly (including spacing/case). Resolve via sheets_get_spreadsheet or sheets_find_worksheet. |
| `range` | string | yes |  | Range (A1 Notation). The A1 range that locates the table to append after, e.g. A1 or A:D. The API finds the last row with data inside this range and appends below it; it does not overwrite the range itself. |
| `values` | JSON | yes |  | Values. A 2D array of rows to append, e.g. [["Alice",30],["Bob",25]]. Each inner array is one new row. |
| `value_input_option` | string | yes | `"USER_ENTERED"` | Value Input Option. USER_ENTERED parses values like the Sheets UI (formulas, dates, numbers). RAW stores them verbatim as strings. One of `"USER_ENTERED"`, `"RAW"`. |

Output fields:

- `updatedRange`: Updated Range
- `updatedRows`: Updated Rows (number)
- `updatedColumns`: Updated Columns (number)
- `updatedCells`: Updated Cells (number)

### `sheets_auto_resize_dimensions`

**Auto-Resize Columns/Rows.** Auto-fits the width of columns (or height of rows) to their content over a range. Use after writing data to make it readable. Indices are 0-based and half-open [start,end). Safe to retry — re-fitting produces the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id (gid). Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `dimension` | string | yes | `"COLUMNS"` | Dimension. Whether to auto-resize columns (width) or rows (height). One of `"COLUMNS"`, `"ROWS"`. |
| `start_index` | number | yes |  | Start Index (0-based). The first column/row to resize, 0-based and inclusive. Column A / row 1 is index 0. The range is half-open: [start, end). |
| `end_index` | number | yes |  | End Index (0-based, exclusive). The index just past the last column/row to resize (exclusive). To resize only column A use start 0, end 1; to resize A–C use start 0, end 3. |

Output fields:

- `success`: Success (boolean)
- `spreadsheetId`: Spreadsheet ID

### `sheets_clear_values`

**Clear Cell Range.** Clears the contents of one or more rows over an A1 range without removing the rows themselves (formatting and references stay stable). Use to blank cells while keeping row structure; to remove rows entirely use sheets_delete_multiple_rows, and to drop a whole tab's data use the structural delete atomics. Safe to retry — re-clearing an empty range is a no-op. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `starting_row` | number | yes | `2` | Starting Row. The first row to clear (1-based). |
| `ending_row` | number | no |  | Ending Row. The last row to clear. Leave empty to only clear the starting row. |

Output fields:

- `success`: Success (boolean)
- `startingRow`: Starting Row (number)
- `endingRow`: Ending Row (number)
- `clearedRange`: Cleared Range

### `sheets_copy_worksheet`

**Copy Worksheet.** Copies a worksheet (with its data) into a destination spreadsheet as a new tab. Use to duplicate a tab within or across spreadsheets. Not idempotent — each call creates another copy (named "Copy of …"). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Source Spreadsheet ID. The ID of the spreadsheet containing the worksheet to copy. Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID to Copy. The numeric worksheet (tab) id to copy. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `destination_spreadsheet_id` | string | yes |  | Destination Spreadsheet ID. The ID of the spreadsheet to copy the worksheet into. |

Output fields:

- `sheetId`: Worksheet ID (number)
- `title`: Title
- `index`: Index (number)
- `sheetType`: Sheet Type
- `gridProperties`: Grid Properties
- `gridProperties.rowCount`: Row Count (number)
- `gridProperties.columnCount`: Column Count (number)

### `sheets_create_spreadsheet`

**Create Spreadsheet.** Creates a new, empty Google Sheets spreadsheet with the given title, optionally inside a Drive folder (resolve the folder id via the Drive piece's search). Use when an agent needs a fresh spreadsheet to populate. Not idempotent — each call creates a separate spreadsheet even with the same title. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_title` | string | yes |  | Title. The title of the new spreadsheet. |
| `parent_folder_id` | string | no |  | Parent Folder ID. Optional Drive folder id to create the spreadsheet in. By default, the new spreadsheet is created in the root folder of Drive. |

Output fields:

- `id`: Spreadsheet ID

### `sheets_delete_dimension`

**Delete Rows/Columns.** Deletes a range of rows or columns, shifting the rest. Use to remove whole columns (which the row-delete atomics cannot) or a row range by 0-based index. For deleting rows by 1-based row number prefer sheets_delete_multiple_rows. Not idempotent — indices shift after deletion. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id (gid). Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `dimension` | string | yes | `"ROWS"` | Dimension. Whether to delete rows or columns. One of `"ROWS"`, `"COLUMNS"`. |
| `start_index` | number | yes |  | Start Index (0-based). The first row/column to delete, 0-based and inclusive. Row 1 / column A is index 0, so deleting "row 5" means start 4. The range is half-open: [start, end). |
| `end_index` | number | yes |  | End Index (0-based, exclusive). The index just past the last deleted row/column (exclusive). To delete only row 5 use start 4, end 5; to delete rows 5–7 use start 4, end 7. |

Output fields:

- `success`: Success (boolean)
- `spreadsheetId`: Spreadsheet ID

### `sheets_delete_multiple_rows`

**Delete Multiple Rows.** Deletes a contiguous range of rows or a comma-separated list of row numbers (1-based) in one batch. Use to remove several rows; the action deletes list rows in descending order so indices stay valid. Not idempotent — rows renumber after deletion. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `mode` | string | yes | `"range"` | Mode. Choose whether to delete a contiguous range (start/end) or a comma-separated list of row numbers. One of `"range"`, `"list"`. |
| `starting_row` | number | no |  | Starting Row. First row to delete (used in "Contiguous Range" mode). |
| `ending_row` | number | no |  | Ending Row. Last row to delete (used in "Contiguous Range" mode). |
| `row_numbers` | string | no |  | Row Numbers. Comma-separated row numbers to delete (used in "Specific Row Numbers" mode), e.g. "3, 5, 8". |

Output fields:

- `success`: Success (boolean)
- `deletedRanges`: Deleted Ranges
- `deletedRanges[].startRow`: Start Row (number)
- `deletedRanges[].endRow`: End Row (number)

### `sheets_delete_row`

**Delete Row.** Removes one row by its row number and shifts all rows below it up. Use to delete a single known row; for several rows use sheets_delete_multiple_rows. Not idempotent — because rows renumber after deletion, repeating the same row number deletes a different row, so re-resolve the row before any retry. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `row_id` | number | yes |  | Row Number. The number of the row you want to delete (1-based). |

Output fields:

- `success`: Success (boolean)

### `sheets_delete_worksheet`

**Delete Worksheet.** Permanently removes one worksheet (tab) and all its data, identified by its numeric sheet id (resolve via sheets_get_spreadsheet). Destructive and not undoable. Use only when a whole tab should be dropped; to clear a tab's data but keep it use sheets_clear_values. A repeat call fails because the tab is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id to delete. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |

Output fields:

- `spreadsheetId`: Spreadsheet ID

### `sheets_export_worksheet`

**Export Worksheet (CSV/TSV).** Exports one worksheet as a CSV or TSV file (returned as a file reference or raw text). Use to get a tab's contents in a flat delimited format for downstream processing or attachment. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id to export. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `format` | string | yes | `"csv"` | Export Format. Select the file type to export the sheet as. One of `"csv"`, `"tsv"`. |
| `return_as_text` | boolean | no | `false` | Return as Text. Return the exported data as text instead of a file. |

Output fields:

- `format`: Format
- `filename`: File Name
- `file`: File (url)
- `text`: Text

### `sheets_find_or_create_row`

**Find or Create Row.** Looks up a row by a column value; if none matches, appends a new row with the provided values (returns created:true/false). Use to avoid duplicating a row keyed on a stable value. Idempotent — the wrapper returns the existing row instead of inserting a duplicate when the key already exists. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `column_name` | string | no |  | Column. The column letter to search in (e.g. "A", "B", "C"). Defaults to "A" if omitted. |
| `search_value` | string | yes |  | Search Value. The value to look for in the selected column. |
| `match_case` | boolean | yes | `false` | Exact Match. Only treat exact matches as found. |
| `header_row` | number | yes | `1` | Header Row. The row that contains the column names. |
| `use_header_names` | boolean | no | `false` | Use Column Names. Return found rows with header names as keys instead of A, B, C. |
| `first_row_headers` | boolean | yes | `false` | Values Keyed by Column Letter. When true, "values" is an object keyed by column letter, e.g. {"A":"x","B":"y"}. When false, "values" is a positional array, e.g. ["x","y"] mapped to columns A, B, … in order. |
| `as_string` | boolean | no |  | As String. Inserted values that are dates and formulas will be entered as strings and have no effect. |
| `values` | JSON | yes |  | Values. The values to write when creating a new row. If "Values Keyed by Column Letter" is on, pass an object like {"A":"x","B":"y"}; otherwise pass an array like ["x","y"]. |

Output fields:

- `found`: Found (boolean)
- `created`: Created (boolean)
- `row`: Row Number (number)
- `values`: Values (an object whose keys vary)

### `sheets_find_or_create_worksheet`

**Find or Create Worksheet.** Looks up a worksheet by exact title; if not found, creates it with optional headers (returns created:true/false). Use to ensure a named tab exists without duplicating it. Idempotent — returns the existing tab when the title already matches. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `title` | string | yes |  | Worksheet Title. The title to look up. The match is exact and case-sensitive. |
| `headers` | array | no |  | Headers (Only Used When Creating). Column headers to add to the new worksheet if it has to be created. |

Output fields:

- `found`: Found (boolean)
- `created`: Created (boolean)
- `worksheet`: Worksheet
- `worksheet.sheetId`: Worksheet ID (number)
- `worksheet.title`: Title
- `worksheet.index`: Index (number)
- `worksheet.sheetType`: Sheet Type
- `worksheet.gridProperties`: Grid Properties
- `worksheet.gridProperties.rowCount`: Row Count (number)
- `worksheet.gridProperties.columnCount`: Column Count (number)

### `sheets_find_rows`

**Find Rows.** Searches a worksheet for rows whose value in a chosen column matches a search value (exact or contains), returning up to a requested number of matches with their row numbers. Use to locate rows before reading, updating, or deleting them; leave the search value empty to fetch rows sequentially. This is the resolver that yields the row numbers other atomics need. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `column_name` | string | no |  | Column. The column letter to search in (e.g. "A", "B", "C"). Defaults to "A" if omitted. |
| `search_value` | string | no |  | Search Value. The value to look for in the selected column. Leave empty to return all rows. |
| `match_case` | boolean | yes | `false` | Exact Match. Only return rows where the cell value exactly matches the search value. |
| `starting_row` | number | no |  | Starting Row. Start searching from this row number. |
| `number_of_rows` | number | no | `1` | Number of Rows. How many matching rows to return. Defaults to 1 if not specified. |
| `header_row` | number | yes | `1` | Header Row. The row number that contains the column names. |
| `use_header_names` | boolean | no | `false` | Use Column Names. Use column names as keys instead of A, B, C. |

Output fields:

- `[].row`: Row Number (number)
- `[].values`: Values (an object whose keys vary)

### `sheets_find_worksheet`

**Find Worksheets.** Searches the worksheets (tabs) of a spreadsheet for ones whose title matches a query (exact or contains), returning each match's title and numeric sheet id. Use to resolve a tab name to its sheet_id; to list all tabs at once use sheets_get_spreadsheet. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `title` | string | yes |  | Title. The worksheet (tab) title to search for. |
| `exact_match` | boolean | no | `false` | Exact Match. If true, only return worksheets that exactly match the title. If false, return worksheets that contain it. |

Output fields:

- `found`: Found (boolean)
- `worksheets`: Worksheets
- `worksheets[].sheetId`: Worksheet ID (number)
- `worksheets[].title`: Title
- `worksheets[].index`: Index (number)
- `worksheets[].sheetType`: Sheet Type
- `worksheets[].gridProperties`: Grid Properties
- `worksheets[].gridProperties.rowCount`: Row Count (number)
- `worksheets[].gridProperties.columnCount`: Column Count (number)

### `sheets_format_cells`

**Format Cells.** Applies cell formatting (background color, text color, bold, italic, strikethrough) to a range of rows, leaving cell values untouched. Colors are HEX codes. Use to style rows rather than change data. Safe to retry — re-applying the same formatting converges. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `starting_row` | number | yes |  | Starting row. The first row number where formatting should begin (1-based). |
| `ending_row` | number | no |  | Ending row. The last row number where formatting should stop (leave empty to format only the starting row). |
| `bg_color` | string | no |  | Background Color. Provide a HEX color code (example: #FFD966). |
| `text_color` | string | no |  | Text Color. Provide a HEX color code (example: #FFD966). |
| `bold` | boolean | no |  | Make text bold. |
| `italic` | boolean | no |  | Make text Italic. |
| `strikethrough` | boolean | no |  | Make text Strikethrough. |

Output fields:

- `success`: Success (boolean)
- `spreadsheetId`: Spreadsheet ID

### `sheets_get_all_rows`

**Get All Rows.** Reads every row from a worksheet in one call, optionally keying values by the header row. Use when an agent needs the full sheet contents rather than a search or a single row; be mindful of size on large sheets (prefer sheets_find_rows or sheets_get_next_rows for big sheets). Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id (gid). Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `first_row_headers` | boolean | no | `true` | First Row Headers. When true, the first row is treated as headers (excluded from the data and used to key each row's values by header name). When false, every row is returned and keyed by column letter (A, B, C, ...). |

Output fields:

- `rows`: Rows
- `rows[].row`: Row Number (number)
- `rows[].values`: Values (an object whose keys vary)
- `count`: Count (number)

### `sheets_get_next_rows`

**Get Next Rows (Paginated).** Reads the next batch of rows from a worksheet, advancing a cursor stored under a memory key so successive runs walk the sheet without reprocessing rows. Use to iterate a large sheet in chunks across flow runs; for a one-shot full read use sheets_get_all_rows. Not idempotent — each non-test call moves the stored cursor forward. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `start_row` | number | yes | `1` | Start Row. Which row to start from on the first run (before the cursor advances). |
| `header_row` | number | yes | `1` | Header Row. Which row contains the headers? |
| `use_header_names` | boolean | no | `false` | Use header names for keys. Map A/B/C… to the actual column headers (row specified above). |
| `mem_key` | string | yes | `"row_number"` | Memory Key. The key used to store the current row number in flow memory. Changing it starts the walk over. |
| `group_size` | number | yes | `1` | Group Size. The number of rows to get per run. |

Output fields:

- `[].row`: Row Number (number)
- `[].values`: Values (an object whose keys vary)

### `sheets_get_row`

**Get Row by Number.** Reads a single row by its row number, optionally keyed by header names instead of column letters. Use when you already know the exact row number (e.g. from sheets_find_rows); to search by value use sheets_find_rows, and to read an arbitrary cell range use sheets_get_values. Returns {found:false} if the row is past the grid. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `row_number` | number | yes |  | Row Number. The row number you want to retrieve. |
| `header_row` | number | yes | `1` | Header Row Number. The row number where your column headers are located (usually row 1). |
| `use_header_names` | boolean | no | `true` | Use Column Names. Use column names as keys instead of A, B, C. |

Output fields:

- `found`: Found (boolean)
- `row`: Row Number (number)
- `values`: Values (an object whose keys vary)

### `sheets_get_spreadsheet`

**Get Spreadsheet Info.** Fetches a spreadsheet's metadata: its title and the list of worksheets (tabs) with each tab's title, numeric sheet id, and grid size. Use to resolve a tab name to its numeric sheet_id (which the structural atomics need) or to discover what tabs exist before reading them. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `include_grid_data` | boolean | no | `false` | Include Grid Data. When true, also returns the cell data for every worksheet. Leave off (default) for a lightweight metadata-only response. |

Output fields:

- `spreadsheet_id`: Spreadsheet ID
- `title`: Title
- `locale`: Locale
- `time_zone`: Time Zone
- `url`: Spreadsheet URL (url)
- `worksheets`: Worksheets
- `worksheets[].sheet_id`: Worksheet ID (number)
- `worksheets[].title`: Title
- `worksheets[].index`: Index (number)
- `worksheets[].sheet_type`: Sheet Type
- `worksheets[].row_count`: Row Count (number)
- `worksheets[].column_count`: Column Count (number)
- `worksheet_count`: Worksheet Count (number)

### `sheets_get_values`

**Read Cell Range.** Reads cell values from a worksheet using A1 notation (e.g. A1:D10), returning a 2D array of rows or columns. Use when you have explicit cell coordinates; to look up rows by a column value use sheets_find_rows, and to read by row number use sheets_get_row. The worksheet title must match the tab name exactly. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `worksheet_title` | string | yes |  | Worksheet Title. The exact tab title to read from. Must match the tab name exactly (including spacing/case). Resolve via sheets_get_spreadsheet or sheets_find_worksheet. |
| `range` | string | no |  | Range (A1 Notation). The cell range to read, e.g. A1:D10. Leave empty to read the entire worksheet. |
| `major_dimension` | string | yes | `"ROWS"` | Major Dimension. Whether to return rows (default) or columns. "ROWS" returns one array per row; "COLUMNS" returns one array per column. One of `"ROWS"`, `"COLUMNS"`. |
| `value_render_option` | string | yes | `"FORMATTED_VALUE"` | Value Render Option. How values should be represented in the output. One of `"FORMATTED_VALUE"`, `"UNFORMATTED_VALUE"`, `"FORMULA"`. |

Output fields:

- `range`: Range
- `majorDimension`: Major Dimension
- `values`: Values

### `sheets_insert_dimension`

**Insert Rows/Columns.** Inserts blank rows or columns at a position, shifting existing data. Use to make space mid-sheet; to add a column WITH a header name use sheets_add_column, and to append at the end use sheets_append_dimension. Indices are 0-based half-open. Not idempotent — each call inserts more. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id (gid). Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `dimension` | string | yes | `"ROWS"` | Dimension. Whether to insert rows or columns. One of `"ROWS"`, `"COLUMNS"`. |
| `start_index` | number | yes |  | Start Index (0-based). Where to start inserting, 0-based and inclusive. Index 0 = before the first row/column (row 1 / column A). The range is half-open: [start, end). |
| `end_index` | number | yes |  | End Index (0-based, exclusive). The index just past the last inserted row/column (exclusive). The number inserted is (end - start): to insert 1 use start N, end N+1; to insert 3 at the top use start 0, end 3. |
| `inherit_from_before` | boolean | no | `false` | Inherit Formatting From Before. When true, new rows/columns inherit formatting from the row/column before them; when false (default), from the one after. |

Output fields:

- `success`: Success (boolean)
- `spreadsheetId`: Spreadsheet ID

### `sheets_rename_worksheet`

**Rename Worksheet.** Changes the title of an existing worksheet, identified by its numeric sheet id (resolve via sheets_get_spreadsheet). Use to relabel a tab. Safe to retry — re-applying the same name is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id to rename. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `new_name` | string | yes |  | New Sheet Name. |

Output fields:

- `spreadsheetId`: Spreadsheet ID

### `sheets_search_spreadsheets`

**Find Spreadsheets.** Searches Google Drive for spreadsheets whose name matches a query (exact or contains), returning id, name, and links. Use to resolve a spreadsheet id from a human-readable name before acting on it — the resolver for every other atomic's spreadsheet_id. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_name` | string | yes |  | Spreadsheet Name. The name of the spreadsheet to search for. |
| `exact_match` | boolean | no | `false` | Exact Match. If true, only return spreadsheets that exactly match the name. If false, return spreadsheets that contain the name. |

Output fields:

- `found`: Found (boolean)
- `spreadsheets`: Spreadsheets
- `spreadsheets[].id`: Spreadsheet ID
- `spreadsheets[].name`: Name
- `spreadsheets[].webViewLink`: Web View Link (url)
- `spreadsheets[].createdTime`: Created Time (datetime)
- `spreadsheets[].modifiedTime`: Modified Time (datetime)

### `sheets_update_dimension_properties`

**Resize / Hide Rows or Columns.** Sets a fixed pixel width/height for a range of columns/rows, or hides/unhides them. Use for an exact size (vs. content-fit via sheets_auto_resize_dimensions). Safe to retry — re-applying the same size/hidden state is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id (gid). Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `dimension` | string | yes | `"COLUMNS"` | Dimension. Whether to act on columns (width) or rows (height). One of `"COLUMNS"`, `"ROWS"`. |
| `start_index` | number | yes |  | Start Index (0-based). The first column/row to update, 0-based and inclusive. Column A / row 1 is index 0. The range is half-open: [start, end). |
| `end_index` | number | yes |  | End Index (0-based, exclusive). The index just past the last column/row to update (exclusive). To update only column A use start 0, end 1. |
| `pixel_size` | number | no |  | Pixel Size. The fixed width (for columns) or height (for rows) in pixels. Leave empty to only change the hidden state. |
| `hidden` | boolean | no |  | Hidden. Whether the rows/columns are hidden. Leave empty to only change the pixel size. |

Output fields:

- `success`: Success (boolean)
- `spreadsheetId`: Spreadsheet ID

### `sheets_update_multiple_rows`

**Update Multiple Rows.** Overwrites several existing rows in one batch call, each targeted by its own row id. Use to edit multiple known rows efficiently rather than calling sheets_update_row repeatedly; rows without a row id are skipped. Safe to retry — same row ids and values converge. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `header_row` | number | yes | `1` | Header Row. Which row contains the headers? |
| `values` | JSON | yes |  | Values. An array of row objects, each with a numeric "rowId" plus cells keyed by column letter, e.g. [{"rowId":2,"A":"x","B":"y"},{"rowId":5,"A":"z"}]. Rows without a rowId are skipped. |
| `as_string` | boolean | no |  | As String. Inserted values that are dates and formulas will be entered as strings and have no effect. |

Output fields:

- `spreadsheetId`: Spreadsheet ID
- `totalUpdatedRows`: Total Updated Rows (number)
- `totalUpdatedColumns`: Total Updated Columns (number)
- `totalUpdatedCells`: Total Updated Cells (number)
- `totalUpdatedSheets`: Total Updated Sheets (number)

### `sheets_update_row`

**Update Row.** Overwrites the cells of one existing row, identified by its row number, mapping values to columns positionally or by header name. Use when you already know the target row (e.g. from sheets_find_rows); empty values skip (do not clear) cells. Safe to retry — re-running with the same row and values converges. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id. Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `row_id` | number | yes |  | Row Number. The row number to update. |
| `first_row_headers` | boolean | yes | `false` | Values Keyed by Column Letter. When true, "values" is an object keyed by column letter, e.g. {"A":"x","B":"y"}. When false, "values" is a positional array, e.g. ["x","y"] mapped to columns A, B, … in order. |
| `values` | JSON | yes |  | Values. The row values. If "Values Keyed by Column Letter" is on, pass an object like {"A":"x","B":"y"}; otherwise pass an array like ["x","y"]. Empty strings skip (do not clear) the cell. |

Output fields:

- `updates`: Updates
- `updates.spreadsheetId`: Spreadsheet ID
- `updates.updatedRange`: Updated Range
- `updates.updatedRows`: Updated Rows (number)
- `updates.updatedColumns`: Updated Columns (number)
- `updates.updatedCells`: Updated Cells (number)
- `row`: Row Number (number)

### `sheets_update_sheet_properties`

**Update Worksheet Properties.** Updates a worksheet's structural properties: frozen row/column counts, tab color, or hidden state, via a fielded PATCH (rename is handled by sheets_rename_worksheet). Use to freeze headers or color/hide a tab. Safe to retry — re-applying the same values is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `sheet_id` | number | yes |  | Worksheet ID. The numeric worksheet (tab) id (gid). Resolve via sheets_get_spreadsheet or sheets_find_worksheet. The first tab is usually 0. |
| `frozen_row_count` | number | no |  | Frozen Row Count. Number of rows to freeze at the top (e.g. 1 to freeze a header row). Set 0 to unfreeze. |
| `frozen_column_count` | number | no |  | Frozen Column Count. Number of columns to freeze at the left. Set 0 to unfreeze. |
| `tab_color` | string | no |  | Tab Color. HEX color code for the tab, e.g. #FF0000. |
| `hidden` | boolean | no |  | Hidden. Whether the worksheet tab is hidden. |

Output fields:

- `success`: Success (boolean)
- `spreadsheetId`: Spreadsheet ID

### `sheets_update_values`

**Write Cell Range.** Writes a 2D array of values into a worksheet at a specific A1 range, overwriting whatever is there. Use when you have explicit coordinates and a rectangular block of values; to update a row by its header-mapped fields use sheets_update_row, and to append rather than overwrite use sheets_append_values. The values array shape must match the target range. Safe to retry — re-writing the same range is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spreadsheet_id` | string | yes |  | Spreadsheet ID. The ID of the spreadsheet (the Drive file id). Resolve from a name with sheets_search_spreadsheets. |
| `worksheet_title` | string | yes |  | Worksheet Title. The exact tab title to write to. Must match the tab name exactly (including spacing/case). Resolve via sheets_get_spreadsheet or sheets_find_worksheet. |
| `range` | string | yes |  | Range (A1 Notation). The cell range to write to, e.g. A1:D10. The shape of the values array must match this range (a 1x1 range cannot accept a 2x2 array). |
| `values` | JSON | yes |  | Values. A 2D array of values, e.g. [["Name","Age"],["Alice",30]]. Each inner array is one row (when major dimension is ROWS) or one column (when COLUMNS). |
| `value_input_option` | string | yes | `"USER_ENTERED"` | Value Input Option. USER_ENTERED parses values like the Sheets UI (formulas, dates, numbers). RAW stores them verbatim as strings. One of `"USER_ENTERED"`, `"RAW"`. |
| `major_dimension` | string | no | `"ROWS"` | Major Dimension. Whether each inner array of Values is a row (ROWS, default) or a column (COLUMNS). One of `"ROWS"`, `"COLUMNS"`. |

Output fields:

- `updatedRange`: Updated Range
- `updatedRows`: Updated Rows (number)
- `updatedColumns`: Updated Columns (number)
- `updatedCells`: Updated Cells (number)

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

# Microsoft Excel 365

Spreadsheet software by Microsoft

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-excel-365'
  version: '0.8.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> If you'd like to use your own custom Azure app instead of the default app, follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application),
> set the **Redirect URI** to {{redirectUrl}} and add the following **Microsoft Graph (Delegated) permissions** under **API permissions**:
> - Files.ReadWrite
> - Sites.ReadWrite.All
> - offline_access

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cloud` | string | yes | `"login.microsoftonline.com"` | Cloud Environment. Select your Microsoft cloud environment. One of `"login.microsoftonline.com"`, `"login.microsoftonline.us"`. |

## Actions

### `append_row`

**Append Row to Worksheet.** Append a new row of values immediately after the last used row of a worksheet. Pick this to add data without specifying a target cell; values can be mapped by header (when the first row holds headers) or written positionally. Not idempotent: each run inserts an additional row. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `isFirstRowHeaders` | boolean | yes | `false` | Does the first row contain headers?. If the first row is headers. |
| `values` | object | yes |  | Values. The values to insert. An object whose fields depend on other inputs; the product shows them. |

### `append_multiple_rows`

**Append Multiple Rows.** Append several rows of cell values to the bottom of a worksheet in one call, after the last used row. Use for bulk inserts into a plain (non-table) worksheet; for a defined Excel table use Append Rows to a Table instead. Not idempotent — re-running adds duplicate rows. Supports an optional filter to insert only rows whose chosen column matches/does not match a value. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `values` | object | yes |  | Values. The values to insert. An object whose fields depend on other inputs; the product shows them. |
| `filterColumn` | string | no |  | Filter Column. A value the product loads from the provider, such as an id; write the value itself. |
| `filterType` | string | no |  | Filter Type. One of `"TEXT_EXACTLY_MATCHES"`, `"TEXT_DOES_NOT_EXACTLY_MATCH"`, `"TEXT_MATCHES_ANY_OF"`, `"TEXT_MATCHES_NONE_OF"`. |
| `filterValue` | object | no |  | Filter Value. An object whose fields depend on other inputs; the product shows them. |

### `get_worksheets`

**Get Worksheets.** List the worksheets (tabs) in a workbook, returning metadata such as id, name, and position for each sheet. Use to discover available sheets before reading or writing; to look up a sheet by name use Find Worksheet. Read-only and idempotent; returns up to the given limit unless Return All is enabled. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `returnAll` | boolean | no | `false` | Return All. If checked, all worksheets will be returned. |
| `limit` | number | no | `10` | Limit. Limit the number of worksheets returned. |

### `get_worksheet_rows`

**Get Worksheet Rows.** Read rows from a worksheet — either a specific A1-notation range or the entire used range — with optional header-row keying and column filters (text/number/date comparisons, in-list, exists). Use for general worksheet reads; for a defined Excel table use Get Table Rows, or Get Cells in Range for a fixed block. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `range` | string | no |  | Range. Range of the rows to retrieve (e.g., A2:B2) |
| `headerRow` | number | no |  | Header Row. Row number of the header. |
| `firstDataRow` | number | no |  | First Data Row. Row number of the first data row. |
| `useFilter` | boolean | no | `false` | Use Filters ?. Enables the column wise filter. |
| `filterList` | object | no |  | Filter. An object whose fields depend on other inputs; the product shows them. |

### `update_row`

**Update Worksheet Rows.** Overwrite the cells of a specific worksheet row, identified by its row number, with the provided values starting at column A. Use to edit an existing row in place; to add a new row use the append actions, or Delete Row to remove one. Idempotent for a given row number and values — re-running writes the same cells. Values can be keyed by header when the first row holds headers. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `row_number` | number | yes |  | Row number. The row number to update. |
| `isFirstRowHeaders` | boolean | yes | `false` | Does the first row contain headers?. If the first row is headers. |
| `values` | object | yes |  | Values. The values to insert. An object whose fields depend on other inputs; the product shows them. |

### `clear_worksheet`

**Clear Worksheet.** Clear cell contents from a worksheet — either a specific A1-notation range (e.g. A2:B2) or, when no range is given, the entire used range. Removes values only (not formatting) and does not delete rows or shift cells. Idempotent — re-running over the same area has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `range` | string | no |  | Range. The range in A1 notation (e.g., A2:B2) to clear in the worksheet, if not provided, clear the entire worksheet. |

### `delete_worksheet`

**Delete Worksheet.** Delete a single worksheet (tab) from a workbook, leaving the rest of the file intact. Pick this to remove one sheet rather than the whole file (use Delete Workbook for the entire file). Destructive; idempotent by stable worksheet id, so re-running after deletion has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |

### `get_workbooks`

**Get Workbooks.** List .xlsx workbooks in a OneDrive or SharePoint drive, returning id, name, and webUrl for each. Use to browse or enumerate available spreadsheets; to find one specific file by exact name use Find Workbook. Read-only and idempotent; an optional limit caps results, otherwise all matches are returned. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no |  | Limit. Limits the number of workbooks returned, returns all workbooks if empty. |

### `get-worksheet-columns`

**Get Worksheet Columns.** List the header/column values from the first row of a worksheet (read from the used range across A1:ZZ1). Pick this to inspect loose-cell sheet headers before appending or mapping rows. Use Get Table Columns instead when the data is a formal Excel table. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |

### `delete_workbook`

**Delete Workbook.** Permanently delete an entire Excel workbook file from OneDrive or a SharePoint document library. Pick this to remove a whole file, not a single sheet (use Delete Worksheet for that). Destructive and irreversible; idempotent by stable workbook id, so re-running after deletion has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |

### `add_worksheet`

**Add a Worksheet to a Workbook.** Add a new worksheet (tab) to an existing workbook, optionally with a chosen name. Pick this to create a sheet before writing rows or tables into it. Not idempotent: each run adds another worksheet, and re-running can create duplicate or auto-named sheets. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheet_name` | string | no | `"Sheet"` | Worksheet Name. The name of the new worksheet. |

### `get_table_rows`

**Get Table Rows.** List the data rows of a defined Excel table (by table id) in a worksheet, returning each row as an array of cell values. Use for structured tables; for arbitrary worksheet rows use Get Worksheet Rows, or a specific range with Get Cells in Range. Read-only and idempotent; an optional limit caps how many rows are returned. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no |  | Limit. Limit the number of rows retrieved. |

### `get_table_columns`

**Get Table Columns.** List the column names of a specific named table in a worksheet, optionally capped by a limit. Pick this to discover a table schema before mapping fields for row reads or writes. Use Get Worksheet Columns instead when the data is loose cells rather than a formal table. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no |  | Limit. Limit the number of columns retrieved. |

### `create_table`

**Create Table.** Create a structured Excel table from a cell range in a worksheet. Pick this to formalize raw cells into a named table so row/column actions can target it. Choose the range automatically from the worksheet used range or supply it manually in A1 notation, and indicate whether the first row holds column headers. Not idempotent: each run adds a new table. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `selectRange` | string | yes | `"auto"` | Select Range. How to select the range for the table. One of `"auto"`, `"manual"`. |
| `range` | string | no | `"A1:B2"` | Range. The range of cells in A1 notation (e.g., A2:B2) that will be converted to a table. |
| `hasHeaders` | boolean | yes | `true` | Has Headers. Whether the range has column labels. |

### `delete_table`

**Delete Table.** Delete a defined Excel table (by table id) from a worksheet, removing the table object while leaving the underlying cell values in place. Use to drop table formatting/structure, not to clear data. Idempotent in effect — once the table is gone, re-running on the same id targets a non-existent table. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |

### `lookup_table_column`

**Lookup Table Column.** Find rows in a defined Excel table where a named column exactly equals a given value, returning the first match by default or all matches when Return All Matches is enabled. Use to look up table records by a key; throws if the named column does not exist. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `lookup_column` | string | yes |  | Lookup Column. The column name to lookup the value in. |
| `lookup_value` | string | yes |  | Lookup Value. The value to lookup. |
| `return_all_matches` | boolean | no | `false` | Return All Matches. If checked, all matching rows will be returned. |

### `append_table_rows`

**Append Rows to a Table.** Append a row of values to a defined Excel table (by table id), mapped to the table columns. Use for structured tables that auto-expand; for a plain worksheet without a table use Append Multiple Rows. Not idempotent — re-running adds duplicate rows. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `values` | object | yes |  | Values. The values to insert. An object whose fields depend on other inputs; the product shows them. |

### `convert_to_range`

**Convert to Range.** Convert an existing Excel table back into a plain cell range, removing table structure while keeping the data and formatting. Pick this as the inverse of Create Table when you no longer need table behavior. Not idempotent: re-running fails once the table no longer exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |

### `createWorkbook`

**Create Workbook.** Create a new, empty .xlsx workbook file in OneDrive or a SharePoint document library. Use to provision a fresh spreadsheet before adding worksheets or data. Not idempotent — name conflicts are auto-renamed, so re-running produces an additional file rather than reusing an existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. The name of the new workbook. |

### `clear_column`

**Clear Column by Index.** Clear an entire column in a worksheet identified by its 1-based index (1 = A, 2 = B). Choose what to remove via Clear Type: contents, formats, or both. Clears in place without shifting other cells; idempotent — re-running on an already-cleared column has no further effect. To clear a row instead use Clear Row by ID, or a specific range with Clear Worksheet. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `column_index` | number | yes |  | Column Index. The 1-based index of the column to be cleared (e.g., 1 for column A, 2 for column B). |
| `applyTo` | string | yes | `"All"` | Clear Type. Specify what to clear from the column. One of `"All"`, `"Contents"`, `"Formats"`. |

### `clear_range`

**Clear Cells by Range.** Clear a block of cells in A1 notation, choosing to remove contents only, formatting only, or both. Pick this to wipe cell values or styles in place without deleting the worksheet or shifting cells. Idempotent: clearing the same range repeatedly yields the same emptied state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `range` | string | yes |  | Range. The range of cells to clear, in A1 notation (e.g., "A1:C5"). |
| `applyTo` | string | yes | `"All"` | Clear Type. Specify what to clear from the range. One of `"All"`, `"Contents"`, `"Formats"`. |

### `clear_row`

**Clear Row by ID.** Clear an entire row in a worksheet by its 1-based row number. Choose what to remove via Clear Type: contents, formats, or both. Clears in place without deleting the row or shifting cells up — use Delete Row when you need the row removed and rows below shifted. Idempotent — re-running on an already-cleared row has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `row_id` | number | yes |  | Row Number. The number of the row to be cleared (e.g., 5 for the 5th row). |
| `applyTo` | string | yes | `"All"` | Clear Type. Specify what to clear from the row. One of `"All"`, `"Contents"`, `"Formats"`. |

### `delete_row`

**Delete Row.** Delete an entire worksheet row by its 1-based row number and shift the rows below it up. Use when the row must be removed and the gap closed; to only blank a row in place without shifting use Clear Row by ID. Not idempotent — because deletion renumbers rows, re-running with the same number targets a different row. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `row_id` | number | yes |  | Row Number. The number of the row to delete (e.g., 5 to delete the 5th row). Rows below will shift up. |

### `create_worksheet`

**Create Worksheet.** Add a new worksheet (tab) to an existing workbook, optionally writing a header row and creating an Excel table from it. Use to provision a sheet for new data; to add data to an existing sheet use the append/update actions. Not idempotent — re-running creates another worksheet (Excel auto-assigns a default name like Sheet1 when none is given). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Worksheet Name. The name for the new worksheet. If not provided, a default name like 'Sheet1' will be assigned. |
| `headers` | array | no |  | Headers. Optional: A list of headers to add to the first row. A table will be created from these headers. |

### `copy_worksheet`

**Copy Worksheet.** Duplicates an Excel worksheet (tab) into the same or a different workbook by copying its used range — cell values or formulas plus number formats; cell styles, charts, and tables are not carried over. Use to clone a template tab or copy sheet data across workbooks. Not idempotent: each run creates another worksheet, and re-running with the same explicit name fails on the name collision. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `folderId` | string | no |  | Folder. The folder containing the workbook. Leave empty to search the entire drive (up to 1000 folders are listed). A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `destinationWorkbookId` | string | no |  | Destination Workbook. The workbook to copy the worksheet into. Leave empty to copy within the source workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `newWorksheetName` | string | no |  | New Worksheet Name. The name for the copied worksheet. If left empty, Excel assigns a default name. The name must: - Not be blank or exceed 31 characters. - Not contain any of: `/`, `\`, `?`, `*`, `:`, `[`, `]`. - Be unique within the destination workbook, and not be the reserved name "History". |
| `copyMode` | string | yes | `"formulas"` | Copy Mode. Whether to copy the formulas (recalculated in the new sheet) or just the resulting values. One of `"formulas"`, `"values"`. |

### `find_row`

**Find Row.** Search a table for rows where a chosen column matches a given value, returning the matching rows. Pick this to look up rows by content rather than position (use Get Row by ID when the index is known). Applies a temporary column filter and clears it afterward; read-only with respect to data and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `lookup_column` | string | yes |  | Lookup Column. The column to search in. A value the product loads from the provider, such as an id; write the value itself. |
| `lookup_value` | string | yes |  | Lookup Value. The value to find in the lookup column. |

### `find-workbook`

**Find Workbook.** Search a OneDrive or SharePoint drive for an .xlsx workbook by exact file name (the .xlsx extension is added if omitted), returning a found flag plus matching files. Use to resolve a workbook id from a known name before other actions; to browse all workbooks use Get Workbooks. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `fileName` | string | yes |  | File Name. Excel File name to search for without extension. |

### `find-worksheet`

**Find Worksheet.** Search a workbook for worksheets whose name matches a search string, returning a found flag plus the matching sheets. By default matches sheets that contain the string (case-insensitive); enable Exact Match for an exact-name match only. Use to locate a sheet by name; to list every sheet use Get Worksheets. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `sheetName` | string | yes |  | Worksheet Name. |
| `exactMatch` | boolean | no | `false` | Exact Match. If true, only return worksheets that exactly match the name. If false, return worksheets that contain the name. |

### `get_range`

**Get Cells in Range.** Read a specific rectangular cell range from a worksheet using A1 notation (e.g. "A1:C10" or a single cell "B2"). Use when you know the exact addresses to fetch; for full-sheet or header-keyed reads use Get Worksheet Rows. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `range` | string | yes |  | Range. The range of cells to retrieve, in A1 notation (e.g., "A1:C10"). |

### `getRowById`

**Get Row by ID.** Retrieve the full contents of a single table row by its zero-based index within the table. Pick this when you already know the row position; use Find Row instead to locate a row by a column value. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `row_id` | number | yes |  | Row ID (Index). The zero-based index of the row to retrieve (e.g., 0 for the first row, 1 for the second). |

### `get_worksheet`

**Get Worksheet by ID.** Fetch a single worksheet by its id (or name), returning that sheet metadata such as id, name, position, and visibility. Use when you already know which sheet you want; to list all sheets use Get Worksheets, or to search by name use Find Worksheet. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |

### `rename_worksheet`

**Rename Worksheet.** Rename an existing worksheet (tab) within a workbook. Use to relabel a sheet without altering its contents. Effectively idempotent — applying the same target name leaves the sheet in the same state. The new name must be non-blank, 31 characters or fewer, avoid the characters / \ ? * : [ ], and cannot be the reserved name "History". Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storageSource` | string | yes | `"onedrive"` | Excel File Source. One of `"onedrive"`, `"sharepoint"`. |
| `siteId` | string | no |  | Sharepoint Site. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Sharepoint Document Library. A value the product loads from the provider, such as an id; write the value itself. |
| `workbookId` | string | yes |  | Workbook. A value the product loads from the provider, such as an id; write the value itself. |
| `worksheetId` | string | yes |  | Worksheet. A value the product loads from the provider, such as an id; write the value itself. |
| `new_name` | string | yes |  | New Worksheet Name. The new name for the worksheet. The name must adhere to the following rules: - Cannot be blank. - Cannot exceed 31 characters. - Must not contain any of the following characters: `/`, `\`, `?`, `*`, `:`, `[`, `]`. - The name "History" is reserved by Excel and cannot be used. |

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

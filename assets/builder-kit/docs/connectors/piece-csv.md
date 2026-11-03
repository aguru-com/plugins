# CSV

Manipulate CSV text

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-csv'
  version: '0.5.0'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `convert_csv_to_json`

**Convert CSV to JSON.** Parses a CSV or tab-separated text string into a JSON array, treating the first row either as column headers or as plain data depending on the header option. Use this to make CSV text queryable before looping or filtering rows; use Convert JSON to CSV for the reverse direction, and run Convert Excel to CSV first when the source is an .xlsx/.xls file. The chosen delimiter (comma or tab) must match the actual data or columns will not split; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `csv_text` | string | yes | `""` | CSV Text. |
| `has_headers` | boolean | yes | `false` | Does the CSV have headers?. |
| `delimiter_type` | string | yes | `""` | Delimiter Type. Select the delimiter type for the CSV text. One of `","`, `"\t"`. |

### `convert_json_to_csv`

**Convert JSON to CSV.** Serializes a JSON array into delimited CSV text (comma or tab), flattening nested objects so dotted key paths become the column headers. Use this when preparing tabular data for a file, export, or attachment; use Convert CSV to JSON for the reverse direction. The input must be a JSON array of rows, not a single object, and the header row is always emitted; pure transformation, read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `json_array` | JSON | yes | `[{"name":"John","age":30,"address":{"street":"123 Main St","city":"Los Angeles"}},{"name":"Jane","age":25,"address":{"street":"123 Main St","city":"Los Angeles"}}]` | JSON Array. Provide a JSON array to convert to CSV format. |
| `delimiter_type` | string | yes | `","` | Delimiter Type. Select the delimiter type for the CSV file. One of `","`, `"\t"`. |

### `convert_excel_to_csv`

**Convert Excel to CSV.** Reads a binary Excel workbook (.xlsx or .xls) and converts a single sheet to delimited CSV text (comma, tab, or semicolon), selecting either a named sheet or the first sheet when no name is given. Pick this when the source is a spreadsheet file; use Convert CSV to JSON when you already have CSV text. Requires a real Excel file whose signature is validated, so HTML or PDF content is rejected, and any sheet name given must exist in the workbook; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Excel File. The Excel file (.xlsx or .xls) to convert to CSV. Files are not supported; an action that needs one fails. |
| `sheet_name` | string | no |  | Sheet Name. Name of the sheet to convert. Leave blank to use the first sheet. |
| `delimiter_type` | string | yes | `","` | Delimiter. Character used to separate values in the output CSV. One of `","`, `"\t"`, `";"`. |

Output fields:

- `csv`: CSV Text
- `sheet_name`: Sheet Name
- `available_sheets`: Available Sheets

### `read_csv_file`

**Read CSV File.** Parses an uploaded or mapped .csv file into rows keyed by column name, auto-detecting comma, semicolon, tab or pipe delimiters and handling byte-order marks, blank lines, uneven rows and duplicate column names. Pick this when the input is a file; use Convert CSV to JSON or the other CSV actions when you already have CSV text, and Convert Excel to CSV for .xlsx/.xls files. Files up to 20 MB and 100,000 rows; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | CSV File. The .csv file to read. Map a file from an earlier step, or upload one. Files are not supported; an action that needs one fails. |
| `has_header_row` | boolean | no | `true` | Has Header Row. The first row holds column names. Off: column_1, column_2, … |
| `delimiter` | string | no | `"auto"` | Delimiter. The character that separates columns. Auto-detect picks comma, semicolon, tab or pipe from the first rows. One of `"auto"`, `","`, `";"`, `"\t"`, `"\|"`. |
| `trim_whitespace` | boolean | no | `false` | Trim Spaces. Remove spaces around each value. |

Output fields:

- `rows`: Rows
- `row_count`: Row Count (number)
- `headers`: Column Names
- `delimiter`: Delimiter Used

### `create_csv_file`

**Create CSV File.** Builds a .csv file from a JSON array of objects: every key seen in any row becomes a column (nested objects become dotted columns like address.city), booleans are written as true/false and missing values stay blank, with optional column order, delimiter, header row and an Excel-friendly UTF-8 byte-order mark. Text starting with = + - @ is prefixed with an apostrophe by default so spreadsheet apps do not run it as a formula (plain numbers like -5 are left alone). Pick this when the next step needs a file; use Convert JSON to CSV when you only need the CSV text. Up to 100,000 rows; nothing outside the run changes and the same input gives the same file content, so it is idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `json_array` | JSON | yes | `[{"name":"Ann","email":"ann@example.com","paid":true},{"name":"Bob","email":"bob@example.com","paid":false}]` | Rows. A list of objects, one per row, e.g. [{"name":"Ann"}]. |
| `file_name` | string | no | `"export.csv"` | File Name. ".csv" is added if you leave out the extension. |
| `delimiter` | string | no | `","` | Delimiter. The character that separates columns in the file. Many European Excel versions expect semicolons. One of `","`, `";"`, `"\t"`, `"\|"`. |
| `include_header` | boolean | no | `true` | Include Header Row. Write the column names as the first row. |
| `columns` | array | no |  | Columns. Columns to write, in order. Leave empty to write all columns. |
| `add_excel_bom` | boolean | no | `false` | Excel-Friendly Encoding. Adds a byte-order mark so Excel shows accented characters correctly. |
| `escape_formulas` | boolean | no | `true` | Protect Against Spreadsheet Formulas. Stops text starting with = + - @ from running as a formula. |

Output fields:

- `file_name`: File Name
- `url`: File URL (url)
- `row_count`: Row Count (number)
- `columns`: Column Names

### `convert_csv_to_excel`

**Convert CSV to Excel.** Converts CSV text into a one-sheet .xlsx workbook file, keeping values such as zip codes with leading zeros and long ids as text and optionally storing numbers as number cells only when they fit in 15 significant digits, so the value never changes. The header row, when present, always stays text. Pick this when the recipient needs a spreadsheet file; use Convert Excel to CSV for the reverse and Create CSV File when a .csv file is enough. Up to 20 MB and 100,000 rows; the same input gives the same workbook content, so it is idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `csv_text` | string | yes |  | CSV Text. Paste CSV text or map it from an earlier step. |
| `delimiter` | string | no | `"auto"` | Delimiter. The character that separates columns. Auto-detect picks comma, semicolon, tab or pipe from the first rows. One of `"auto"`, `","`, `";"`, `"\t"`, `"\|"`. |
| `has_header_row` | boolean | no | `true` | Has Header Row. The first row holds column names and always stays text. |
| `sheet_name` | string | no | `"Sheet1"` | Sheet Name. Up to 31 characters, without : \ / ? * [ or ]. |
| `file_name` | string | no | `"data.xlsx"` | File Name. ".xlsx" is added if you leave out the extension. |
| `detect_numbers` | boolean | no | `true` | Store Numbers as Numbers. Exact numbers become number cells; values like 01234 stay text. |

Output fields:

- `file_name`: File Name
- `url`: File URL (url)
- `row_count`: Rows Written (incl. header) (number)
- `sheet_name`: Sheet Name

### `filter_csv_rows`

**Filter CSV Rows.** Filters CSV text to the rows whose value in one named column matches a condition (equals, contains, starts/ends with, is empty, greater/less than — compared as numbers when both sides are numbers, otherwise as text, case-insensitive by default). Pick this instead of a Loop plus Branch to narrow rows before sending or saving them. The CSV must have a header row and the column must exist; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `csv_text` | string | yes |  | CSV Text. Paste the CSV, or map CSV text from an earlier step. The first row must be the column names. |
| `delimiter` | string | no | `"auto"` | Delimiter. The character that separates columns. Auto-detect picks comma, semicolon, tab or pipe from the first rows. One of `"auto"`, `","`, `";"`, `"\t"`, `"\|"`. |
| `column` | string | yes |  | Column. The column name to check, exactly as in the header row. |
| `condition` | string | yes | `"equals"` | Condition. One of `"equals"`, `"not_equals"`, `"contains"`, `"not_contains"`, `"starts_with"`, `"ends_with"`, `"is_empty"`, `"is_not_empty"`, `"greater_than"`, `"greater_or_equal"`, `"less_than"`, `"less_or_equal"`. |
| `value` | string | no |  | Value. The value to compare with. Not used for "Is empty" and "Is not empty". |
| `case_sensitive` | boolean | no | `false` | Case Sensitive. On: "Paid" and "paid" are different. |

Output fields:

- `csv`: CSV Text
- `row_count`: Row Count (number)
- `headers`: Column Names
- `rows`: Rows

### `sort_csv_rows`

**Sort CSV Rows.** Sorts the rows of CSV text by one named column, ascending or descending, comparing as text (natural order, so item2 comes before item10), numbers or dates; blank or unreadable values always go last and rows with equal values keep their order. Pick this before taking the top rows or writing an ordered report; for dates use ISO (2026-09-29) or another unambiguous format. The CSV must have a header row; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `csv_text` | string | yes |  | CSV Text. Paste the CSV, or map CSV text from an earlier step. The first row must be the column names. |
| `delimiter` | string | no | `"auto"` | Delimiter. The character that separates columns. Auto-detect picks comma, semicolon, tab or pipe from the first rows. One of `"auto"`, `","`, `";"`, `"\t"`, `"\|"`. |
| `column` | string | yes |  | Column. The column name to sort by, exactly as in the header row. |
| `direction` | string | no | `"asc"` | Direction. One of `"asc"`, `"desc"`. |
| `compare_as` | string | no | `"text"` | Compare As. How to compare values. Unreadable values go last. One of `"text"`, `"number"`, `"date"`. |

Output fields:

- `csv`: CSV Text
- `row_count`: Row Count (number)
- `headers`: Column Names
- `rows`: Rows

### `remove_duplicate_csv_rows`

**Remove Duplicate Rows.** Removes duplicate rows from CSV text, treating rows as duplicates when every value matches or, if key columns are given, when just those columns match (for example the same email), keeping the first or the last occurrence and reporting how many were removed. Pick this to clean a list before importing or emailing it; comparison ignores surrounding spaces and is case-sensitive unless turned off. The CSV must have a header row and key columns must exist; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `csv_text` | string | yes |  | CSV Text. Paste the CSV, or map CSV text from an earlier step. The first row must be the column names. |
| `delimiter` | string | no | `"auto"` | Delimiter. The character that separates columns. Auto-detect picks comma, semicolon, tab or pipe from the first rows. One of `"auto"`, `","`, `";"`, `"\t"`, `"\|"`. |
| `key_columns` | array | no |  | Compare Columns. Columns that must match, e.g. "email". Empty compares whole rows. |
| `keep` | string | no | `"first"` | Keep. One of `"first"`, `"last"`. |
| `case_sensitive` | boolean | no | `true` | Case Sensitive. On: "Ann@x.com" and "ann@x.com" are different. |
| `trim_whitespace` | boolean | no | `true` | Ignore Surrounding Spaces. On: " Ann" and "Ann" count as the same. |

Output fields:

- `csv`: CSV Text
- `row_count`: Row Count (number)
- `headers`: Column Names
- `rows`: Rows
- `removed_count`: Duplicates Removed (number)

### `select_csv_columns`

**Select Columns.** Returns CSV text with only the listed columns in the listed order, or with the listed columns removed when the mode is Remove. Pick this to trim or reorder columns before exporting or inserting rows elsewhere. The CSV must have a header row and every listed column must exist, otherwise it fails with the real column names; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `csv_text` | string | yes |  | CSV Text. Paste the CSV, or map CSV text from an earlier step. The first row must be the column names. |
| `delimiter` | string | no | `"auto"` | Delimiter. The character that separates columns. Auto-detect picks comma, semicolon, tab or pipe from the first rows. One of `"auto"`, `","`, `";"`, `"\t"`, `"\|"`. |
| `columns` | array | yes |  | Columns. Column names as in the header. Keep mode uses this order. |
| `mode` | string | no | `"keep"` | Mode. One of `"keep"`, `"remove"`. |

Output fields:

- `csv`: CSV Text
- `row_count`: Row Count (number)
- `headers`: Column Names
- `rows`: Rows

### `merge_csv`

**Merge CSV Files.** Appends the rows of two or more CSV texts into one, matching columns by header name: the result has every column seen in any input (first-seen order) and cells a source did not have stay blank. Pick this to combine exports with the same or overlapping columns; it stacks rows and does not join or look up rows by a key. Each input needs a header row; up to 100,000 rows in total; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `csv_texts` | array | yes |  | CSV Texts. Two or more CSV texts, one per item. Map each from an earlier step. |
| `delimiter` | string | no | `"auto"` | Delimiter. The character that separates columns. Auto-detect picks comma, semicolon, tab or pipe from the first rows. One of `"auto"`, `","`, `";"`, `"\t"`, `"\|"`. |

Output fields:

- `csv`: CSV Text
- `row_count`: Row Count (number)
- `headers`: Column Names
- `rows`: Rows

### `split_csv`

**Split CSV.** Splits CSV text into chunks of a fixed number of rows (1 to 10,000), each chunk a complete CSV that repeats the header row by default, so a Loop can send or upload them one batch at a time. Pick this for data that fits in memory (up to 20 MB); for larger files use Stream CSV to Subflows, which streams the file and runs a subflow per batch. The CSV must have a header row; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `csv_text` | string | yes |  | CSV Text. Paste the CSV, or map CSV text from an earlier step. The first row must be the column names. |
| `delimiter` | string | no | `"auto"` | Delimiter. The character that separates columns. Auto-detect picks comma, semicolon, tab or pipe from the first rows. One of `"auto"`, `","`, `";"`, `"\t"`, `"\|"`. |
| `rows_per_chunk` | number | yes | `100` | Rows per Chunk. Data rows per chunk (1 to 10,000), not counting the header. |
| `repeat_header` | boolean | no | `true` | Repeat Header Row. Start every chunk with the column names. |

Output fields:

- `chunks`: Chunks
- `chunks[].index`: Chunk Number (number)
- `chunks[].csv`: CSV Text
- `chunks[].row_count`: Row Count (number)
- `chunk_count`: Chunk Count (number)
- `total_rows`: Total Rows (number)
- `headers`: Column Names

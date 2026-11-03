# Google Docs

Create and edit documents online

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-docs'
  version: '0.6.0'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

### `CUSTOM_AUTH`: Service Account (Advanced)

> Connect with a Google Cloud service account.
>
> **How to get the key:**
> 1. Open the [Google Cloud console](https://console.cloud.google.com/iam-admin/serviceaccounts) → **IAM & Admin** → **Service Accounts**.
> 2. Create a service account, or pick an existing one.
> 3. Open **Keys** → **Add key** → **Create new key** → **JSON** and download the file.
> 4. Share each document with the service account's email, or set up [domain-wide delegation](https://support.google.com/a/answer/162106) and fill in **User Email** below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `serviceAccount` | string | yes |  | Service Account JSON Key. Paste the full contents of the downloaded key file. |
| `userEmail` | string | no |  | User Email. Email address of the user to impersonate for domain-wide delegation. |

## Actions

### `create_document`

**Create Document.** Creates a brand-new Google Docs document with the given title and writes the provided text into it. Use when an agent needs to generate a fresh document from content it has produced; to add to an existing document use Append Text instead. Not idempotent: every call creates a separate new document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Document Title. |
| `body` | string | yes |  | Document Content. |

Output fields:

- `documentId`: Document ID
- `writeControl.requiredRevisionId`: Revision ID

### `create_document_based_on_template`

**Edit Template File.** Fills a Google Docs template in place by find-and-replacing placeholder tokens (e.g. [[KEY]] or {{KEY}}) with supplied key/value pairs and swapping placeholder images by object ID. Use when an agent has an existing template document and wants to merge data into it rather than build a doc from scratch. Requires the target document ID and the matching placeholder format; idempotent since re-running with the same values replaces no remaining placeholders and leaves the document unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | string | yes |  | Document. Placeholders in this document are replaced in place. A value the product loads from the provider, such as an id; write the value itself. |
| `placeholder_format` | string | yes | `"square_brackets"` | Placeholder Format. One of `"curly_braces"`, `"square_brackets"`, `"single_curly"`, `"single_square"`. |
| `values` | object | yes |  | Variables. Key names without brackets. Each value replaces its placeholder. |
| `images` | array | no |  | Image Replacements. Each row swaps one image in the document for a new one. Each item: { `imageObjectId`, `url` }. |

Output fields:

- `data.documentId`: Document ID
- `data.writeControl.requiredRevisionId`: Revision ID
- `status`: Status Code (number)
- `statusText`: Status Text

### `read_document`

**Read Document.** Fetches the full content and structure of a Google Docs document by its ID. Use when an agent needs to inspect, summarize, or extract text from a known document. Requires the document ID (not a name or URL); read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `title`: Title
- `documentId`: Document ID
- `revisionId`: Revision ID
- `suggestionsViewMode`: Suggestions View Mode
- `body.content`: Body Content
- `body.content[].startIndex`: Start Index (number)
- `body.content[].endIndex`: End Index (number)
- `body.content[].paragraph.elements`: Paragraph Text
- `body.content[].paragraph.elements[].textRun.content`: Text

### `google-docs-find-document`

**Find Document.** Searches Google Drive for a Google Docs document whose name contains the given text, optionally scoped to a folder, and returns the first match. Use when an agent has a document name but not its ID and needs to resolve it. Idempotent only when used purely for lookup; enabling "Create a new document if not found" makes it create (and optionally move) a new document on each miss, which is a mutating side effect. Needs authentication.

Kind: search, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Document Name. Matches any document whose name contains this text. |
| `folderId` | string | no |  | Folder. Leave empty to include all of Drive. A value the product loads from the provider, such as an id; write the value itself. |
| `createIfNotFound` | boolean | no | `false` | Create If Not Found. |
| `newDocumentProps` | object | no |  | New Document Properties. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `found`: Found (boolean)
- `file`: Document
- `file.id`: Document ID
- `file.name`: Name
- `file.mimeType`: MIME Type
- `file.webViewLink`: Web View Link (url)
- `file.iconLink`: Icon (image)
- `file.thumbnailLink`: Thumbnail (image)
- `file.size`: Size (filesize)
- `file.createdTime`: Created Time (datetime)
- `file.modifiedTime`: Modified Time (datetime)
- `file.trashed`: Trashed (boolean)
- `file.shared`: Shared (boolean)
- `file.starred`: Starred (boolean)
- `file.parents`: Parent Folder IDs
- `file.owners`: Owners
- `file.owners[].displayName`: Name
- `file.owners[].emailAddress`: Email (email)
- `file.owners[].photoLink`: Photo (image)
- `file.lastModifyingUser`: Last Modifying User
- `file.lastModifyingUser.displayName`: Name
- `file.lastModifyingUser.emailAddress`: Email (email)
- `file.lastModifyingUser.photoLink`: Photo (image)

### `get_document_plaintext`

**Get Document Plain Text.** Returns just the body prose of a Google Docs document as a plain string, flattened from the document.get response. Pick this over Read Document when you only need the text to summarize/extract/classify and want to avoid the large nested structural JSON. Only top-level paragraph text is included — tables, headers, footers, footnotes, and tabs are omitted. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to read, found in its URL: 'https://docs.google.com/document/d/<documentId>/edit'. Obtain it from Search Documents or Find Document if you only have a name. |

Output fields:

- `documentId`: Document ID
- `title`: Title
- `plainText`: Plain Text

### `replace_all_text`

**Replace All Text in Document.** Find-and-replaces every occurrence of a literal string across a whole Google Docs document. Pick this for a bare ad-hoc text edit; use Edit Template File instead for placeholder-token merges or image swaps. Idempotent for normal use (a repeat run matches nothing and leaves the same end state); the exception is overlapping find/replace literals (e.g. replacing "a" with "ab"), which can re-match on a second run. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to edit, found in its URL: 'https://docs.google.com/document/d/<documentId>/edit'. |
| `find_text` | string | yes |  | Find Text. The literal text to search for in the document. |
| `replace_text` | string | yes |  | Replace With. The text to replace every matched occurrence with. |
| `match_case` | boolean | no | `false` | Match Case. When enabled, the search is case-sensitive. |

Output fields:

- `documentId`: Document ID
- `occurrencesChanged`: Occurrences Changed (number)

### `search_documents`

**Search Documents.** Searches Drive for Google Docs documents by name and/or full-text content, returning multiple ordered results with their IDs. Pick this over Find Document to discover documents by their content (not just an exact name) or to get more than one match; Find Document returns only the first name match and can also create-if-missing. Read-only and idempotent. At least one of name/content text is required. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name_contains` | string | no |  | Name Contains. Return documents whose name contains this text. Provide this and/or Content Contains. |
| `full_text_contains` | string | no |  | Content Contains. Return documents whose full text content contains this text. Provide this and/or Name Contains. |
| `max_results` | number | no | `10` | Max Results. Maximum number of documents to return (1-100). |
| `order_by` | string | no | `"modifiedTime desc"` | Order By. How to sort the results. One of `"modifiedTime desc"`, `"modifiedTime"`, `"createdTime desc"`, `"createdTime"`, `"name"`, `"name desc"`. |
| `page_token` | string | no |  | Page Token. Token for the next page of results, taken from the nextPageToken of a previous call. Leave empty for the first page. |

Output fields:

- `documents`: Documents
- `documents[].id`: Document ID
- `documents[].name`: Name
- `documents[].createdTime`: Created Time (datetime)
- `documents[].modifiedTime`: Modified Time (datetime)
- `documents[].webViewLink`: Web View Link (url)
- `documents[].ownerEmail`: Owner Email (email)
- `count`: Count (number)
- `nextPageToken`: Next Page Token

### `copy_document`

**Copy Document.** Duplicates an existing Google Docs document into a new file with the given title. Pick this to spin a working copy off a template or snapshot a version before editing; it is distinct from Edit Template File, which merges data in place. Each call creates a new file, so it is not idempotent (retries produce duplicates). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | Source Document ID. The ID of the document to copy, found in its URL: 'https://docs.google.com/document/d/<documentId>/edit'. |
| `title` | string | yes |  | New Document Title. The name to give the copied document. |
| `parents` | string | no |  | Folder. Leave empty to include all of Drive. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Document ID
- `name`: Name
- `webViewLink`: Web View Link (url)
- `parents`: Parent Folder IDs

### `get_document_end_index`

**Get Document End Index.** Returns the end index of a Google Docs document body (the highest character position) so an agent can compute where to insert, delete, or style content. Call this FIRST before any index-based editing atomic (Insert Text with an explicit index, Delete Content Range, etc.) — Google Docs edits are addressed by an integer character index that cannot be guessed. Requires the document ID; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to inspect (from the document URL or Search Documents). |

Output fields:

- `documentId`: Document ID
- `title`: Title
- `endIndex`: End Index (number)
- `maxInsertIndex`: Max Insert Index (number)

### `insert_text`

**Insert Text.** Inserts text into a Google Docs document. If "index" is omitted the text is appended to the end of the document body; if "index" is provided the text is inserted at that character index — obtain a valid index from Get Document End Index first (indices cannot be guessed, must fall inside an existing paragraph, and must be below the body end index). Not idempotent: each call inserts the text again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to insert text into. |
| `text` | string | yes |  | Text. The text to insert. |
| `index` | number | no |  | Index. Character index to insert at. Leave empty to append to the end of the document. Get a valid index from Get Document End Index. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `insertedCharacters`: Inserted Characters (number)
- `mode`: Mode

### `delete_content_range`

**Delete Content Range.** Deletes all content between a start and end character index in a Google Docs document body. Obtain valid indices from Get Document End Index / Read Document first — indices cannot be guessed. Note that every Google Docs segment ends in a newline that cannot be deleted, so the end index must not exceed the body end index minus one. Destructive and not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to edit. |
| `startIndex` | number | yes |  | Start Index. Inclusive start character index. Obtain from Get Document End Index / Read Document. |
| `endIndex` | number | yes |  | End Index. Exclusive end character index. Must be greater than Start Index and not exceed the body end index. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `deletedFrom`: Deleted From Index (number)
- `deletedTo`: Deleted To Index (number)

### `create_document_from_markdown`

**Create Document from Markdown.** Creates a new Google Docs document and populates it from Markdown text, converting headings (#, ##, ###), bullet lists (-, *, +), and paragraphs into native Google Docs formatting. Use when an agent has Markdown content (the format LLMs produce natively) and wants a formatted document in one call. Inline styling such as bold/italic is inserted as plain text. Not idempotent: each call creates a new document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The title (and file name) of the new document. |
| `markdown` | string | yes |  | Markdown Content. Markdown text. Supports headings (#/##/###), bullet lists (-/*/+), and paragraphs. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `title`: Title
- `url`: Document URL (url)

### `get_document`

**Get Document.** Fetches the full content and structure of a Google Docs document by its ID — the raw document JSON including body elements and their character indices. Use when an agent needs the complete structure, e.g. to locate element indices before editing. For only the readable text use Get Document Plaintext; for just the body end index use Get Document End Index. Requires the document ID; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to read (from the document URL or Search Documents). |

Output fields:

- `title`: Title
- `documentId`: Document ID
- `revisionId`: Revision ID
- `suggestionsViewMode`: Suggestions View Mode
- `body.content`: Body Content
- `body.content[].startIndex`: Start Index (number)
- `body.content[].endIndex`: End Index (number)
- `body.content[].paragraph.elements`: Paragraph Text
- `body.content[].paragraph.elements[].textRun.content`: Text

### `create_text_document`

**Create Text Document.** Creates a new Google Docs document with the given title and writes the provided plain text into it, returning the new document metadata (including its ID). Use when an agent has plain text to put in a fresh document; for Markdown-formatted content use Create Document from Markdown instead. Not idempotent: each call creates a separate new document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The title (and file name) of the new document. |
| `body` | string | yes |  | Content. The plain text to write into the new document. |

Output fields:

- `documentId`: Document ID
- `writeControl.requiredRevisionId`: Revision ID

### `create_footer`

**Create Footer.** Creates a footer section in a Google Docs document and returns the new footerId. Use this when you need to add a footer to a document before inserting footer text — the footerId returned here is required by any subsequent Insert Text call targeting the footer segment. Each call creates a new footer; not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to add a footer to (from the document URL or Search Documents). |
| `type` | string | no | `"DEFAULT"` | Footer Type. The type of footer to create. DEFAULT is the standard document footer. One of `"DEFAULT"`. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `footerId`: Footer ID

### `create_footnote`

**Create Footnote.** Inserts a footnote at a specific character index inside an existing paragraph in a Google Docs document, or at the end of the body segment if no index is provided. Returns the new footnoteId, which can then be used to insert text into the footnote segment via Insert Text. The index must fall inside an existing paragraph — obtain a valid index from Get Document End Index or Read Document (cannot be guessed). Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to insert a footnote into (from the document URL or Search Documents). |
| `index` | number | no |  | Index. Character index inside an existing paragraph where the footnote anchor is inserted. Leave empty to append at the end of the body segment. Obtain a valid index from Get Document End Index or Read Document — cannot be guessed. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `footnoteId`: Footnote ID

### `create_header`

**Create Header.** Creates a header section in a Google Docs document and returns the new headerId. Use this when you need to add a header to a document before inserting header text — the headerId returned here is required by any subsequent Insert Text call targeting the header segment. Each call creates a new header; not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to add a header to (from the document URL or Search Documents). |
| `type` | string | no | `"DEFAULT"` | Header Type. The type of header to create. DEFAULT is the standard document header. One of `"DEFAULT"`. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `headerId`: Header ID

### `create_named_range`

**Create Named Range.** Creates a named range over a specified character range in a Google Docs document body and returns the new namedRangeId. Named ranges let you bookmark a region for later operations (e.g. deletion, styling) by ID or by name. The startIndex and endIndex must be valid character positions inside the document body — obtain them from Get Document End Index or Read Document (cannot be guessed). Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to add a named range to (from the document URL or Search Documents). |
| `name` | string | yes |  | Range Name. A human-readable name for the range. Multiple named ranges in the same document can share the same name. |
| `startIndex` | number | yes |  | Start Index. Inclusive start character index of the range. Obtain from Get Document End Index or Read Document — cannot be guessed. |
| `endIndex` | number | yes |  | End Index. Exclusive end character index of the range. Must be greater than Start Index. Obtain from Get Document End Index or Read Document — cannot be guessed. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `name`: Range Name
- `namedRangeId`: Named Range ID

### `create_paragraph_bullets`

**Create Paragraph Bullets.** Applies a bullet list style (e.g. BULLET_DISC_CIRCLE_SQUARE) to all paragraphs within a character range in a Google Docs document. Use this to convert existing paragraphs into a bulleted or numbered list. The startIndex and endIndex must span the paragraphs to bullet — obtain valid indices from Get Document End Index or Read Document (cannot be guessed). Not idempotent (re-running with a different preset changes the glyph style). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to apply bullets to (from the document URL or Search Documents). |
| `startIndex` | number | yes |  | Start Index. Inclusive start character index of the range of paragraphs to bullet. Obtain from Get Document End Index or Read Document — cannot be guessed. |
| `endIndex` | number | yes |  | End Index. Exclusive end character index of the range of paragraphs to bullet. Must be greater than Start Index. Obtain from Get Document End Index or Read Document — cannot be guessed. |
| `bulletPreset` | string | no | `"BULLET_DISC_CIRCLE_SQUARE"` | Bullet Preset. The bullet list glyph preset to apply to the paragraphs. One of `"BULLET_DISC_CIRCLE_SQUARE"`, `"BULLET_DIAMONDX_ARROW3D_SQUARE"`, `"BULLET_CHECKBOX"`, `"BULLET_ARROW_DIAMOND_DISC"`, `"BULLET_STAR_CIRCLE_SQUARE"`, `"BULLET_ARROW3D_CIRCLE_SQUARE"`, `"BULLET_LEFTTRIANGLE_DIAMOND_DISC"`, `"BULLET_DIAMONDX_HOLLOWDIAMOND_SQUARE"`, `"BULLET_DIAMOND_DISC_CIRCLE"`, `"NUMBERED_DECIMAL_ALPHA_ROMAN"`, `"NUMBERED_DECIMAL_ALPHA_ROMAN_PARENS"`, `"NUMBERED_DECIMAL_NESTED"`, `"NUMBERED_UPPERALPHA_ALPHA_ROMAN"`, `"NUMBERED_UPPERROMAN_UPPERALPHA_DECIMAL"`, `"NUMBERED_ZERODECIMAL_ALPHA_ROMAN"`. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `startIndex`: Start Index (number)
- `endIndex`: End Index (number)
- `bulletPreset`: Bullet Preset

### `delete_footer`

**Delete Footer.** Permanently deletes a footer section from a Google Docs document by its footer ID. The footer ID is a hidden identifier — obtain it from the Read Document (gdocs_get_document) response under the document's named styles or sections; it cannot be guessed. Destructive and not idempotent: the footer content is unrecoverable once deleted. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to edit. |
| `footerId` | string | yes |  | Footer ID. The ID of the footer to delete. Obtain from Read Document (gdocs_get_document) — cannot be guessed. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `deletedFooterId`: Deleted Footer ID

### `delete_header`

**Delete Header.** Permanently deletes a header section from a Google Docs document by its header ID. The header ID is a hidden identifier — obtain it from the Read Document (gdocs_get_document) response under the document's named styles or sections; it cannot be guessed. Destructive and not idempotent: the header content is unrecoverable once deleted. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to edit. |
| `headerId` | string | yes |  | Header ID. The ID of the header to delete. Obtain from Read Document (gdocs_get_document) — cannot be guessed. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `deletedHeaderId`: Deleted Header ID

### `delete_named_range`

**Delete Named Range.** Deletes a named range from a Google Docs document. Provide either namedRangeId (targets one specific range — obtain from Read Document gdocs_get_document, cannot be guessed) or name (deletes all named ranges with that name). Re-deleting an already-gone range or name is a no-op, so this call is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to edit. |
| `namedRangeId` | string | no |  | Named Range ID. The ID of the named range to delete. Obtain from Read Document (gdocs_get_document) — cannot be guessed. Provide this OR Name, not both. |
| `name` | string | no |  | Name. The name of the named range(s) to delete. All ranges with this name will be removed. Provide this OR Named Range ID, not both. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `deletedNamedRangeId`: Deleted Named Range ID
- `deletedName`: Deleted Range Name

### `delete_paragraph_bullets`

**Delete Paragraph Bullets.** Removes bullet or numbered list formatting from all paragraphs within the given character index range in a Google Docs document. The paragraphs' text content is preserved; only the list nesting and bullet glyphs are removed. Obtain valid startIndex and endIndex from Get Document End Index (gdocs_get_document_end_index) — indices cannot be guessed. Idempotent: re-running on already plain paragraphs is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to edit. |
| `startIndex` | number | yes |  | Start Index. Inclusive start character index of the range. Obtain from Get Document End Index (gdocs_get_document_end_index). |
| `endIndex` | number | yes |  | End Index. Exclusive end character index of the range. Must be greater than Start Index. Obtain from Get Document End Index (gdocs_get_document_end_index). |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `rangeStart`: Range Start (number)
- `rangeEnd`: Range End (number)

### `delete_table_column`

**Delete Table Column.** Permanently deletes a column from a table in a Google Docs document. The column to delete is addressed by the table's start index plus the row and column coordinates of any cell in that column. All three index values (tableStartIndex, rowIndex, columnIndex) must be obtained from Read Document (gdocs_get_document) — they cannot be guessed. Destructive and not idempotent: all content in the column is permanently removed. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to edit. |
| `tableStartIndex` | number | yes |  | Table Start Index. The character index of the start of the table in the document body. Obtain from Read Document (gdocs_get_document) — cannot be guessed. |
| `rowIndex` | number | yes |  | Row Index. Zero-based row index of any cell in the column to delete. Obtain from Read Document (gdocs_get_document). |
| `columnIndex` | number | yes |  | Column Index. Zero-based column index of the column to delete. Obtain from Read Document (gdocs_get_document). |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `tableStartIndex`: Table Start Index (number)
- `deletedColumnIndex`: Deleted Column Index (number)

### `delete_table_row`

**Delete Table Row.** Permanently deletes a row from a table in a Google Docs document. The row to delete is addressed by the table's start index plus the row and column coordinates of any cell in that row. All three index values (tableStartIndex, rowIndex, columnIndex) must be obtained from Read Document (gdocs_get_document) — they cannot be guessed. Destructive and not idempotent: all content in the row is permanently removed. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to edit. |
| `tableStartIndex` | number | yes |  | Table Start Index. The character index of the start of the table in the document body. Obtain from Read Document (gdocs_get_document) — cannot be guessed. |
| `rowIndex` | number | yes |  | Row Index. Zero-based row index of the row to delete. Obtain from Read Document (gdocs_get_document). |
| `columnIndex` | number | yes |  | Column Index. Zero-based column index of any cell in the row to delete. Obtain from Read Document (gdocs_get_document). |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `tableStartIndex`: Table Start Index (number)
- `deletedRowIndex`: Deleted Row Index (number)

### `insert_table`

**Insert Table.** Inserts a new table with the specified number of rows and columns into a Google Docs document. If "index" is omitted the table is inserted at the end of the document body; if provided the table is inserted at that character index — obtain a valid index from Get Document End Index first. Not idempotent: each call inserts another table. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to insert the table into. |
| `rows` | number | yes |  | Rows. Number of rows in the new table. |
| `columns` | number | yes |  | Columns. Number of columns in the new table. |
| `index` | number | no |  | Index. Character index at which to insert the table. Leave empty to append at the end of the document. Obtain a valid index from Get Document End Index. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `rows`: Rows (number)
- `columns`: Columns (number)
- `mode`: Mode

### `insert_table_column`

**Insert Table Column.** Inserts a new column into an existing table in a Google Docs document. The column is inserted to the left or right of the cell identified by rowIndex and columnIndex. Use "insertRight" to control the insertion side. Not idempotent: each call inserts another column. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document containing the table. |
| `tableStartIndex` | number | yes |  | Table Start Index. Obtain the table start index from Read Document — cannot be guessed. |
| `rowIndex` | number | yes |  | Row Index. Zero-based row index of the reference cell used to identify the column. |
| `columnIndex` | number | yes |  | Column Index. Zero-based column index of the reference cell. |
| `insertRight` | boolean | no | `false` | Insert to the Right. If true, the new column is inserted to the right of the reference cell; if false, to the left. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `tableStartIndex`: Table Start Index (number)
- `rowIndex`: Row Index (number)
- `columnIndex`: Column Index (number)
- `insertRight`: Inserted to the Right (boolean)

### `insert_table_row`

**Insert Table Row.** Inserts a new row into an existing table in a Google Docs document. The row is inserted above or below the cell identified by rowIndex and columnIndex. Use "insertBelow" to control the insertion side. Not idempotent: each call inserts another row. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document containing the table. |
| `tableStartIndex` | number | yes |  | Table Start Index. Obtain the table start index from Read Document — cannot be guessed. |
| `rowIndex` | number | yes |  | Row Index. Zero-based row index of the reference cell used to identify the row. |
| `columnIndex` | number | yes |  | Column Index. Zero-based column index of the reference cell. |
| `insertBelow` | boolean | no | `false` | Insert Below. If true, the new row is inserted below the reference cell; if false, above. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `tableStartIndex`: Table Start Index (number)
- `rowIndex`: Row Index (number)
- `columnIndex`: Column Index (number)
- `insertBelow`: Inserted Below (boolean)

### `insert_text_in_table_cell`

**Insert Text in Table Cell.** Inserts text at the start of a specific table cell in a Google Docs document. The action reads the document to resolve the correct character index for the target cell, then inserts text there. Requires the table start index (from Read Document — cannot be guessed), plus the zero-based row and column index of the target cell. Not idempotent: each call inserts the text again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document containing the table. |
| `tableStartIndex` | number | yes |  | Table Start Index. Obtain the table start index from Read Document — cannot be guessed. |
| `rowIndex` | number | yes |  | Row Index. Zero-based row index of the target cell. |
| `columnIndex` | number | yes |  | Column Index. Zero-based column index of the target cell. |
| `text` | string | yes |  | Text. The text to insert into the table cell. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `tableStartIndex`: Table Start Index (number)
- `rowIndex`: Row Index (number)
- `columnIndex`: Column Index (number)
- `insertedAtIndex`: Inserted At Index (number)
- `insertedCharacters`: Inserted Characters (number)

### `insert_image_in_table_cell`

**Insert Image in Table Cell.** Inserts an inline image at the start of a specific table cell in a Google Docs document. The action reads the document to resolve the correct character index for the target cell, then inserts the image from the given URI. Optionally accepts width and height in points. Requires the table start index (from Read Document — cannot be guessed). Not idempotent: each call inserts another image. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document containing the table. |
| `tableStartIndex` | number | yes |  | Table Start Index. Obtain the table start index from Read Document — cannot be guessed. |
| `rowIndex` | number | yes |  | Row Index. Zero-based row index of the target cell. |
| `columnIndex` | number | yes |  | Column Index. Zero-based column index of the target cell. |
| `uri` | string | yes |  | Image URI. Publicly accessible URL of the image to insert. |
| `width` | number | no |  | Width (points). Optional width of the image in points. If omitted, the image uses its natural size. |
| `height` | number | no |  | Height (points). Optional height of the image in points. If omitted, the image uses its natural size. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `tableStartIndex`: Table Start Index (number)
- `rowIndex`: Row Index (number)
- `columnIndex`: Column Index (number)
- `insertedAtIndex`: Inserted At Index (number)
- `uri`: Image URI (url)

### `unmerge_table_cells`

**Unmerge Table Cells.** Unmerges a range of previously merged table cells in a Google Docs document. The range is specified by the anchor cell (rowIndex, columnIndex) and the span (rowSpan, columnSpan) to unmerge. Requires the table start index from Read Document — cannot be guessed. Idempotent: unmerging already-unmerged cells is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document containing the table. |
| `tableStartIndex` | number | yes |  | Table Start Index. Obtain the table start index from Read Document — cannot be guessed. |
| `rowIndex` | number | yes |  | Row Index. Zero-based row index of the top-left anchor cell of the merged region. |
| `columnIndex` | number | yes |  | Column Index. Zero-based column index of the top-left anchor cell of the merged region. |
| `rowSpan` | number | yes |  | Row Span. Number of rows covered by the merged region to unmerge. |
| `columnSpan` | number | yes |  | Column Span. Number of columns covered by the merged region to unmerge. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `tableStartIndex`: Table Start Index (number)
- `rowIndex`: Row Index (number)
- `columnIndex`: Column Index (number)
- `rowSpan`: Row Span (number)
- `columnSpan`: Column Span (number)

### `update_table_row_style`

**Update Table Row Style.** Updates the minimum height of one or more rows in a Google Docs table. Requires the table start index from Read Document — cannot be guessed. (Google Docs does not support toggling a header row via this request.) Idempotent: applying the same height again is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document containing the table. |
| `tableStartIndex` | number | yes |  | Table Start Index. Obtain the table start index from Read Document — cannot be guessed. |
| `rowIndices` | array | yes |  | Row Indices. Zero-based indices of the rows to update (e.g. [0, 1] to update the first two rows). |
| `minRowHeightPt` | number | yes |  | Minimum Row Height (points). Minimum height of each selected row, in points. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `tableStartIndex`: Table Start Index (number)
- `rowIndices`: Row Indices
- `updatedFields`: Updated Fields

### `insert_inline_image`

**Insert Inline Image.** Inserts an inline image from a publicly fetchable URI into a Google Docs document. If "index" is omitted the image is placed at the end of the document body; if "index" is provided it is inserted at that character index — obtain a valid index from Get Document End Index first (indices cannot be guessed). The URI must be publicly accessible by Google at call time. Not idempotent: each call inserts another copy of the image. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to insert the image into. |
| `uri` | string | yes |  | Image URI. A publicly accessible URL of the image to insert. Google must be able to fetch this URL at the time of the call. |
| `index` | number | no |  | Index. Character index at which to insert the image. Leave empty to insert at the end of the document. Obtain a valid index from Get Document End Index. |
| `widthPt` | number | no |  | Width (pt). Desired width of the image in points. Leave empty to use the image's natural size. |
| `heightPt` | number | no |  | Height (pt). Desired height of the image in points. Leave empty to use the image's natural size. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `insertedObjectId`: Inserted Object ID
- `mode`: Mode

### `insert_page_break`

**Insert Page Break.** Inserts a page break into a Google Docs document. If "index" is omitted the page break is appended at the end of the document body; if "index" is provided it is inserted at that character index — obtain a valid index from Get Document End Index first (indices cannot be guessed and must fall inside an existing paragraph). Not idempotent: each call inserts another page break. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to insert the page break into. |
| `index` | number | no |  | Index. Character index at which to insert the page break. Leave empty to insert at the end of the document. Obtain a valid index from Get Document End Index. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `mode`: Mode

### `replace_image`

**Replace Image.** Swaps an existing inline image (identified by its object ID) for a new image at the given URI. Use this to update a specific image in a document without altering surrounding content. The imageObjectId must come from the document's inlineObjects map — obtain it by calling Read Document first. Re-running with the same URI leaves the document in the same visual state, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document containing the image to replace. |
| `imageObjectId` | string | yes |  | Image Object ID. The object ID of the inline image to replace. This is a hidden ID found in the document's inlineObjects map — obtain it by calling Read Document and inspecting the inlineObjects field. |
| `uri` | string | yes |  | New Image URI. A publicly accessible URL of the replacement image. Google must be able to fetch this URL at the time of the call. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `imageObjectId`: Image Object ID

### `update_document_style`

**Update Document Style.** Updates document-level style properties such as page margins. Only the properties you provide are changed — leave any margin empty to leave it unchanged. Re-applying the same values leaves the document in the same state, so it is idempotent. Use this to set consistent page margins before exporting or sharing a document. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document whose style to update. |
| `marginTopPt` | number | no |  | Top Margin (pt). Top page margin in points. Leave empty to keep the current value. |
| `marginBottomPt` | number | no |  | Bottom Margin (pt). Bottom page margin in points. Leave empty to keep the current value. |
| `marginLeftPt` | number | no |  | Left Margin (pt). Left page margin in points. Leave empty to keep the current value. |
| `marginRightPt` | number | no |  | Right Margin (pt). Right page margin in points. Leave empty to keep the current value. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `updatedFields`: Updated Fields

### `export_as_pdf`

**Export as PDF.** Exports a Google Docs document as a PDF and returns the file for use in later steps (e.g. sending via email or uploading to storage). Uses the Drive export endpoint, so the document must not exceed the Drive 10 MB export limit. Read-only and idempotent — it never modifies the document. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to export as PDF. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `file`: PDF File

### `create_and_populate_table`

**Create and Populate Table.** Inserts a new table at the end of a Google Docs document, sized to the supplied 2D array of strings, and writes each value into its cell in one operation — so an agent can drop a fully-populated table without computing cell indices. The column count is the width of the widest row; shorter rows leave their trailing cells empty. Not idempotent: each call adds another table. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to insert the table into. |
| `data` | JSON | yes |  | Table Data. A 2D array of strings (rows of columns), e.g. [["Name","Age"],["Alice","30"]]. Each string is written into its matching cell. The table width is the widest row; shorter rows leave trailing cells empty. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `rows`: Rows (number)
- `columns`: Columns (number)
- `cellsPopulated`: Cells Populated (number)

### `replace_body_with_markdown`

**Replace Body with Markdown.** Clears the entire body of an existing Google Docs document and repopulates it from Markdown text, converting headings (#, ##, ###), bullet lists (-, *, +), and paragraphs into native Google Docs formatting. Use when an agent wants to overwrite a document wholesale with freshly generated Markdown (the format LLMs produce natively) in one call. Inline styling such as bold/italic is inserted as plain text. Not supported when the body contains a table or table of contents — the action errors clearly instead of partially failing. Destructive and not idempotent: the previous body content is deleted. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to overwrite. |
| `markdown` | string | yes |  | Markdown Content. Markdown text. Supports headings (#/##/###), bullet lists (-/*/+), and paragraphs. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `url`: Document URL (url)

### `replace_section_with_markdown`

**Replace Section with Markdown.** Deletes the content between a start and end character index and replaces it with text rendered from Markdown (headings #/##/###, bullet lists -/*/+, paragraphs converted to native Google Docs formatting). Use when an agent wants to overwrite one section of a document — not the whole body — with freshly generated Markdown. Obtain start and end indices from Read Document first; indices cannot be guessed. If the end index reaches the document end it is clamped to exclude the undeletable terminal newline. Inline styling such as bold/italic is inserted as plain text. Destructive and not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to edit. |
| `startIndex` | number | yes |  | Start Index. Inclusive start character index of the section to replace. Obtain from Read Document. |
| `endIndex` | number | yes |  | End Index. Exclusive end character index of the section to replace. Must be greater than Start Index and obtained from Read Document. |
| `markdown` | string | yes |  | Markdown Content. Markdown text. Supports headings (#/##/###), bullet lists (-/*/+), and paragraphs. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `replacedFrom`: Replaced From Index (number)
- `replacedTo`: Replaced To Index (number)
- `url`: Document URL (url)

### `batch_update`

**Batch Update (Advanced).** Advanced escape hatch that sends a raw array of Google Docs API batchUpdate request objects directly to documents.batchUpdate. Only for callers who know the Google Docs API and need a request kind not covered by a dedicated atomic — prefer the specific atomics (Insert Text, Create Header, Insert Table, Delete Content Range, etc.) for common operations, as they validate inputs and resolve indices for you. Each request is a Docs API Request object, e.g. {"insertText":{"text":"hi","location":{"index":1}}}; requests run in order and indices must already account for prior edits in the same call. Not idempotent in general (depends on the requests supplied). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the document to update. |
| `requests` | JSON | yes |  | Requests. An array of raw Google Docs batchUpdate request objects, e.g. [{"insertText":{"text":"hi","location":{"index":1}}}]. See the Google Docs API documents.batchUpdate reference for the available request kinds. |

Output fields:

- `success`: Success (boolean)
- `documentId`: Document ID
- `appliedRequests`: Applied Requests (number)
- `replies`: Replies

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

### `append_text`

**Append Text.** Appends text to the end of an existing Google Docs document identified by its ID. Use when an agent needs to add content to a known document without altering its existing text. Requires the document ID; not idempotent, since each call inserts the text again, accumulating duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text. Added to the end of the document. |

Output fields:

- `documentId`: Document ID
- `writeControl.requiredRevisionId`: Revision ID

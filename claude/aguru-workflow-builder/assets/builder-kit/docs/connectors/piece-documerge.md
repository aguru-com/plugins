# DocuMerge

Merge and generate documents with dynamic data

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-documerge'
  version: '0.1.8'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Get your API token from your dashboard by clicking API Tokens in the top right corner of your profile.

## Actions

### `combine_files`

**Combine Files.** Merge several source files into one output document on DocuMerge, choosing PDF or DOCX as the combined format; accepts file identifiers plus optional remote URL and inline contents. Use to concatenate documents into a single deliverable. Requires at least one file identifier, and each call produces a new combined file (not idempotent). Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `output` | string | yes |  | Output Format. The format of the combined file. One of `"pdf"`, `"docx"`. |
| `files` | array | yes |  | Files. Array of file identifiers to combine. |
| `name` | string | no |  | Name. Name for the combined file. |
| `url` | string | no |  | URL. URL of a file to include (must be a valid URL) |
| `contents` | string | no |  | Contents. Additional content to include. |

### `convert_file_to_pdf`

**Convert File to PDF.** Convert a single source file to PDF on DocuMerge, supplying the file by name plus an optional remote URL or inline contents. Use when an agent needs a PDF rendering of another document format. Requires a file name; each call generates a fresh PDF (not idempotent). Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileName` | string | yes |  | File Name. Name of the file to convert. |
| `fileUrl` | string | no |  | File URL. URL of the file to convert (must be a valid URL) |
| `contents` | string | no |  | Contents. Additional content to include. |

### `create_data_route_merge`

**Create Data Route Merge.** Submit field data to a configured DocuMerge data route, identified by its route key, to trigger that route's document generation/distribution. Use when populating a predefined route rather than merging a single document. Requires the route key; each submission initiates a new merge run (not idempotent). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `routeKey` | string | yes |  | Route Key. The key of the data route to merge. |
| `fields` | object | no |  | Fields. Field data to merge into the document. |

### `create_document_merge`

**Create Document Merge.** Submit field data to a configured DocuMerge document, identified by its document key, to merge that data into the template and generate the populated document. Use to fill a single predefined template. Requires the document key; each submission starts a new merge run (not idempotent). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentKey` | string | yes |  | Document Key. The key of the document to merge. |
| `fields` | object | no |  | Fields. Field data to merge into the document. |

### `split_pdf`

**Split PDF.** Produce a new PDF on DocuMerge by either extracting a set of pages from a source PDF or removing a set of pages from it, with pages given as numbers or ranges (e.g. "1", "2-5"). Supply the source by name plus an optional URL or base64 contents. Use to subset or trim a PDF. Requires a file name; each call writes a new file (not idempotent). Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileName` | string | yes |  | File Name. Name of the PDF file. |
| `fileUrl` | string | no |  | File URL. URL of the PDF file (must be a valid URL) |
| `contents` | string | no |  | Contents. Base64 encoded file contents. |
| `extract` | array | no |  | Pages to Extract. Page numbers or ranges to extract (e.g., "1", "2-5", "1, 3-5") |
| `remove` | array | no |  | Pages to Remove. Page numbers or ranges to remove (e.g., "1", "2-5", "1, 3-5") |

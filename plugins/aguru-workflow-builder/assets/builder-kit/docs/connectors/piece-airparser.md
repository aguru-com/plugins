# Airparser

Extract structured data from emails, PDFs, or documents with Airparser.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-airparser'
  version: '0.1.7'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can find your API key in the Airparser dashboard under Account Settings.

## Actions

### `extract_data_from_document`

**Get Data from Document.** Fetches the parsed/extracted structured data and metadata for one already-processed Airparser document, identified by its inbox and document ID. Use after a document has finished parsing to read back the extracted fields. Read-only and idempotent; repeating the call returns the same result. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inboxId` | string | yes |  | Inbox. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | yes |  | Document. A value the product loads from the provider, such as an id; write the value itself. |

### `upload_document`

**Upload Document.** Uploads a file to a specified Airparser inbox so it can be parsed into structured data; requires the inbox ID and the file. Use to submit a new document (PDF, email, image, etc.) for extraction. Not idempotent: each call creates a new document, and parsing completes asynchronously, so retrieve the results separately once parsing finishes. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inboxId` | string | yes |  | Inbox. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The document file to upload for parsing. Files are not supported; an action that needs one fails. |
| `fileName` | string | no |  | File Name. |
| `meta` | object | no |  | Metadata. Optional metadata to associate with the document. |

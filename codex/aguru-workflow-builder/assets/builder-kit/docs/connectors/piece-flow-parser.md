# FlowParser

Upload, process, and manage documents programmatically with FlowParser's REST API.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-flow-parser'
  version: '0.1.8'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API Key:
>
> 1. Go to your FlowParser account
> 2. Navigate to API settings
> 3. Copy your API key
> 4. Paste it here

## Actions

### `upload_document`

**Upload Document.** Uploads a document file to FlowParser, which queues it for OCR/parsing and returns its document ID; use this to ingest a file before its parsed data becomes available (typically via the parsed-document triggers). Requires the file binary as input. Not idempotent — each call creates a new document and uploading the same file again produces a separate document. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The document file to upload. Files are not supported; an action that needs one fails. |

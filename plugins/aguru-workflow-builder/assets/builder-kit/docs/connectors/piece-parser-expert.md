# Parser Expert

Parse documents and extract data from PDFs, DOCX files, images, and webpages using Parser Expert's powerful API.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-parser-expert'
  version: '0.1.7'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Parser Expert API key. You can find this in your dashboard under Integration -> New API Key.

## Actions

### `upload_document`

**Upload Document.** Submits a document for parsing into a Parser Expert bucket, accepting either an uploaded file (PDF, DOCX, image, or txt; max 10 pages) or a webpage URL — supply exactly one (the file takes precedence if both are given). Use this to start extraction; it returns a parser ID that you then pass to Get Extracted Data to retrieve the result. Not idempotent: each call queues a new parse job. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bucket_id` | string | yes |  | Bucket ID. The ID of the bucket where the data will be stored. You can find this in your dashboard under Manage Bucket. |
| `file` | file | no |  | File. The file to upload. Supported formats: PDF, DOCX, Image, Txt File (maximum 10 pages per document). This will be ignored if webpage URL is provided. Files are not supported; an action that needs one fails. |
| `webpage_url` | string | no |  | Webpage URL. The URL of the webpage to extract content from. This will be ignored if file is provided. |

### `get_extracted_data`

**Get Extracted Data.** Fetches the extracted/parsed data for a previously uploaded document, keyed by the parser ID returned from Upload Document plus its bucket ID. Use this to poll for or read results after an upload; the response includes a status (pending, parsed, or error), so an agent may need to retry until parsing completes. Idempotent: a read-only lookup with no side effects. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parser_id` | string | yes |  | Parser ID. The ID of the parser. This is returned when content is uploaded. |
| `bucket_id` | string | yes |  | Bucket ID. The ID of the bucket where the data is stored. |

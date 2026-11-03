# DocumentPro

DocumentPro is an AI-powered document processing platform that automates data extraction from various document types using advanced machine learning algorithms.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-documentpro'
  version: '0.2.2'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your DocumentPro API Key:
>
> 1. **Login** to your DocumentPro account
> 2. **Go to** https://app.documentpro.ai/workflows
> 3. **Select** a workflow
> 4. **Change tab** to "Workflow" from the top bar
> 5. **Find** the "Upload" tab
> 6. **Click** "Upload via API"
> 7. **Click** the "Generate API Key" button
> 8. **Copy** your API key and paste it here

## Actions

### `uploadDocument`

**Upload document.** Uploads a document file (PDF, JPEG, PNG, or TIFF, max 6MB) to DocumentPro, returning a document identifier used by later extraction steps. Use this as the first step before running a parser/workflow on the document. Not idempotent: each call uploads a new document and creates a distinct record. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The document file to upload (PDF, JPEG, PNG, or TIFF, max 6MB) Files are not supported; an action that needs one fails. |

### `runExtract`

**Run Extract.** Runs a DocumentPro parser/workflow over an already-uploaded document to extract structured data, keyed by a document ID and a template/workflow ID. Optional OCR mode unlocks layout/table detection and regex-based start/end/split segmentation. Use after uploading a document; idempotent, as it reads and parses the same document with the same parameters without creating new records. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_id` | string | yes |  | Document ID. The unique identifier of the document to parse. |
| `template_id` | string | yes |  | Template ID. The unique identifier of the Workflow/template to use. |
| `use_ocr` | boolean | no | `false` | Use OCR. Enable OCR processing (required for gpt-3.5-turbo or OCR-related parameters) |
| `query_model` | string | no | `"gpt-4o-mini"` | Query Model. The AI model to use for parsing. One of `"gpt-4o-mini"`, `"gpt-4o"`, `"gpt-3.5-turbo"`. |
| `detect_layout` | boolean | no | `false` | Detect Layout. Detect document layout (requires use_ocr=true) |
| `detect_tables` | boolean | no | `false` | Detect Tables. Detect tables in the document (requires use_ocr=true) |
| `page_ranges` | string | no |  | Page Ranges. Specify which pages to parse (e.g., "1-3,5,7-9") |
| `chunk_by_pages` | number | no |  | Chunk by Pages. Number of pages per segment for method 1 segmentation. |
| `rolling_window` | number | no |  | Rolling Window. Window size for method 2 segmentation. |
| `start_regex` | string | no |  | Start Regex. Regex pattern for where parsing should begin (requires use_ocr=true) |
| `end_regex` | string | no |  | End Regex. Regex pattern for where parsing should end (requires use_ocr=true) |
| `split_regex` | string | no |  | Split Regex. Regex pattern to split the document into sections (requires use_ocr=true) |
| `use_all_matches` | boolean | no | `false` | Use All Matches. Use all regex matches instead of just the first (requires use_ocr=true) |

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

# PDFMonkey

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pdfmonkey'
  version: '0.2.1'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key by navigating to [Account Settings](https://dashboard.pdfmonkey.io/account).

## Actions

### `generateDocument`

**Generate Document.** Generate a PDF document in PDFMonkey from a template, merging in a JSON payload of data; optionally set a custom filename, attach metadata, and choose draft vs pending status. Use to produce a PDF from structured data. Each call creates a new document, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_template_id` | string | yes |  | Template ID. A value the product loads from the provider, such as an id; write the value itself. |
| `payload` | JSON | yes |  | Payload. Data to use for the Document generation. |
| `meta` | JSON | no |  | Meta. Meta-Data to attach to the Document. |
| `fileName` | string | no |  | Custom File Name. |
| `status` | string | no | `"draft"` | Document Status. One of `"draft"`, `"pending"`. |

### `deleteDocument`

**Delete Document.** Permanently delete a generated document in PDFMonkey by its document ID. Use to clean up documents no longer needed. The document ID is required; deletion is irreversible, and a repeat call for an already-deleted ID is not a successful no-op, so treat it as not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_id` | string | yes |  | Document ID. A value the product loads from the provider, such as an id; write the value itself. |

### `findDocument`

**Find Document.** Look up a single PDFMonkey document by its document ID, returning its current state including generation status and download URL. Use to check whether a document finished generating or to retrieve its download link. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_id` | string | yes |  | Document ID. A value the product loads from the provider, such as an id; write the value itself. |

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

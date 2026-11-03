# Parseur

Parseur is a document/email parsing tool that extracts structured data from emails, attachments, PDFs, invoices, forms, etc. It supports dynamic templates and table fields, and delivers parsed output to integrations (e.g. via webhook or API). This integration enables reactive workflows based on new…

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-parseur'
  version: '0.2.2'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Create a new API key in Account → API keys in the Parseur app: https://app.parseur.com/account/api-keys

## Actions

### `getParsedDocumentById`

**Get Parsed Document by ID.** Retrieves the parsed/structured data of a single Parseur document by its ID. Use to read back the extracted fields after a document has been processed. Requires the document ID (and the parser/mailbox it belongs to); read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parserId` | string | yes |  | Parser. Select the parser. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | yes |  | Document. Select the document. A value the product loads from the provider, such as an id; write the value itself. |

### `createDocument`

**Create Document.** Submits a new email-style document to Parseur for parsing by sending its subject, sender/recipient addresses, and HTML or plain-text body. Use to push raw email content into a Parseur mailbox so it can be parsed against templates. Each call creates a separate document, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | yes |  | Subject. The subject of the document/email. |
| `from` | string | yes |  | From. The sender email address. |
| `recipient` | string | yes |  | Recipient. The recipient email address. |
| `to` | string | no |  | To. The "To" email address. |
| `cc` | string | no |  | CC. The "CC" email address. |
| `bcc` | string | no |  | BCC. The "BCC" email address. |
| `body_html` | string | no |  | Body HTML. The HTML content of the document/email. |
| `body_plain` | string | no |  | Body Plain. The plain text content of the document/email. |
| `message_headers` | object | no |  | Message Headers. A JSON object representing the email headers (key-value pairs). |

### `createDocumentFromFile`

**Create Document from File.** Uploads a file (e.g. PDF, image, attachment) into a specified Parseur parser/mailbox as a new document for parsing. Use when the source is a binary file rather than email content. Requires the target parser ID and the file; each upload creates a separate document, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parserId` | string | yes |  | Parser. Select the parser. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. Select the file to upload. Files are not supported; an action that needs one fails. |

### `reprocessDocument`

**Reprocess Document.** Re-runs Parseur parsing on an existing document by its ID, typically after a template change so the document is re-evaluated. Requires the document ID and its parser/mailbox. Each call re-triggers processing (and any downstream exports/webhooks), so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parserId` | string | yes |  | Parser. Select the parser. A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | yes |  | Document. Select the document. A value the product loads from the provider, such as an id; write the value itself. |

### `findDocument`

**Find Document.** Lists documents within a given Parseur parser/mailbox, optionally filtered by a case-insensitive name search term; with an empty search it returns all documents in that mailbox. Use to look up a document ID before fetching or reprocessing it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parserId` | string | yes |  | Parser. Select the parser. A value the product loads from the provider, such as an id; write the value itself. |
| `search` | string | no |  | Search. The search term to filter documents by name. Case insensitive. If empty, all documents are returned. |

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

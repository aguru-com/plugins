# Google Document AI

Extract text, entities, form fields and tables from documents with Google Document AI processors.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-document-ai'
  version: '0.0.2'
```

Categories: ARTIFICIAL_INTELLIGENCE, CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Service Account (Recommended)

> Connect with a **service account** from **your own** Google Cloud project (recommended: flows run without anyone signing in):
>
> 1. In [Google Cloud Console](https://console.cloud.google.com/), select or create a project with **billing enabled** (Document AI charges per page). **APIs & Services → Library**: enable **Cloud Document AI API**.
> 2. **Document AI → Processors**: create the processors you need (e.g. Enterprise Document OCR, Form Parser, Invoice Parser) and note their **location** (`us` or `eu`).
> 3. **IAM & Admin → Service Accounts → Create**. Grant it the role **Document AI API User** (`roles/documentai.apiUser`) on the project. Open the account, **Keys → Add key → JSON** and download the key file.
> 4. Paste the **whole JSON key file** below and fill in the processors' location. The project is read from the key file unless you override it.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `keyFile` | string | yes |  | Service Account Key (JSON). The full content of the key file downloaded from Google Cloud (starts with `{ "type": "service_account", …`). |
| `location` | string | yes | `"us"` | Location. Where your processors live, usually `us` or `eu`. |
| `projectId` | string | no |  | Project ID (Override). Only if your processors are in a different project than the key file's. |

### `OAUTH2`: Google Account (OAuth2)

> Sign in with a Google account that can use Document AI in **your own** Google Cloud project:
>
> 1. In [Google Cloud Console](https://console.cloud.google.com/), select or create a project with **billing enabled** (Document AI charges per page). **APIs & Services → Library**: enable **Cloud Document AI API**.
> 2. **APIs & Services → OAuth consent screen**: add the scope `https://www.googleapis.com/auth/cloud-platform`. While the app is in *Testing*, add the Google accounts that will connect as test users. The account needs the **Document AI API User** role on the project.
> 3. **APIs & Services → Credentials → Create credentials → OAuth client ID**, type *Web application*. Add the **Redirect URL shown below** to *Authorized redirect URIs*.
> 4. Paste the **Client ID** and **Client Secret**, fill in the **Project ID** and the processors' **location**, then sign in.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. Your Google Cloud project ID, for example `my-company-prod`. |
| `location` | string | yes | `"us"` | Location. Where your processors live, usually `us` or `eu`. |

## Actions

### `processDocument`

**Process Document.** Extract text, entities, form fields and tables from one document (a flow file or a gs:// Cloud Storage URI) with a Google Document AI processor of the connected project. Use for OCR, form parsing or invoice/ID extraction; online processing takes up to 15 pages (30 in imageless mode), so pick pages or use Custom API Call batchProcess for longer files. Stores nothing, but each call is billed per page; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `processor` | string | yes |  | Processor. The processor to run the document through. A value the product loads from the provider, such as an id; write the value itself. |
| `processorVersion` | string | no |  | Processor Version. For example `pretrained-ocr-v2.1-2024-08-07`. Leave empty to use the processor's default version. |
| `source` | string | yes | `"file"` | Document Source. One of `"file"`, `"gcs"`. |
| `file` | file | no |  | File. The document to process. Up to 15 pages, or 30 with Imageless Mode. Files are not supported; an action that needs one fails. |
| `gcsUri` | string | no |  | Cloud Storage URI. For example `gs://bucket/file.pdf`. |
| `mimeType` | string | no |  | MIME Type. Leave empty to detect it from the file extension. |
| `pages` | string | no |  | Pages. Only process these pages, for example `1,3-5`. |
| `imagelessMode` | boolean | no | `true` | Imageless Mode. Leave page images out of the result and allow up to 30 pages. |
| `includeFullDocument` | boolean | no | `false` | Include Full Document. Also return Google's raw `document` output. Can be several MB. |
| `fieldMask` | string | no |  | Field Mask (Advanced). Comma-separated fields to return, for example `text,entities`. Ignored when Include Full Document is on. |

Output fields:

- `processor`: Processor
- `text`: Text
- `mimeType`: MIME Type
- `pageCount`: Page Count (number)
- `languages`: Languages
- `languages[].languageCode`: Language Code
- `languages[].confidence`: Confidence (number)
- `entities`: Entities
- `entities[].type`: Type
- `entities[].mentionText`: Text
- `entities[].confidence`: Confidence (number)
- `entities[].normalizedText`: Normalized Text
- `entities[].normalizedValue`: Normalized Value
- `entities[].id`: Entity ID
- `entities[].page`: Page (number)
- `entities[].properties`: Properties
- `entities[].properties[].type`: Type
- `entities[].properties[].mentionText`: Text
- `entities[].properties[].confidence`: Confidence (number)
- `entities[].properties[].normalizedText`: Normalized Text
- `entities[].properties[].normalizedValue`: Normalized Value
- `entities[].properties[].id`: Entity ID
- `entities[].properties[].page`: Page (number)
- `formFields`: Form Fields
- `formFields[].page`: Page (number)
- `formFields[].name`: Name
- `formFields[].value`: Value
- `formFields[].nameConfidence`: Name Confidence (number)
- `formFields[].valueConfidence`: Value Confidence (number)
- `formFields[].valueType`: Value Type
- `tables`: Tables
- `tables[].page`: Page (number)
- `tables[].headerRows`: Header Rows
- `tables[].bodyRows`: Body Rows
- `humanReviewStatus`: Human Review Status
- `humanReviewStatus.state`: State
- `humanReviewStatus.stateMessage`: State Message
- `humanReviewStatus.humanReviewOperation`: Human Review Operation
- `document`: Full Document

### `custom_api_call`

**Custom API Call.** Call any Document AI endpoint. Paths start with the version, for example `/v1/projects/{project}/locations/{location}/processors`. Needs authentication.

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

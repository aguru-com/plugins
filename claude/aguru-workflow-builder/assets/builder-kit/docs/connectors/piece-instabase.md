# Instabase

Integrate with Instabase AI Hub to automate document processing and AI workflows

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-instabase'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> ## Instabase AI Hub Connection Setup
>
> ### Prerequisites
> - Create an AI Hub account at [Instabase](https://www.instabase.com)
> - Generate an API token from your account settings
> - Obtain your organization ID or user ID for the IB-Context header
>
> ### Authentication Fields
>
> **API Token**: Your API token from Instabase (required for Bearer authentication)
>
> **IB Context**: Your organization ID or user ID
> - For organization accounts: Use your organization ID
> - For community accounts: Use your user ID or omit this field
>
> **API Root URL**: The base URL for API calls
> - For community accounts: `https://aihub.instabase.com/api`
> - For organization accounts: `https://your-organization.instabase.com/api` (replace with your custom domain)

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiToken` | string | yes |  | API Token. Your Instabase API token. |
| `ibContext` | string | no |  | IB Context. Organization ID (for org accounts) or User ID (for community accounts) |
| `apiRoot` | string | yes |  | API Root URL. API base URL (e.g., https://aihub.instabase.com/api for community accounts) |

## Actions

### `create_conversation`

**Create Conversation and Upload Files.** Creates a new Instabase AI Hub conversation and uploads one or more document files to it for processing, returning the conversation. Use this as the first step before querying documents; at least one file is required and processing options (object/entity detection, fast mode, multilanguage) can be toggled. Not idempotent: each call creates a distinct conversation. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Conversation Name. Name of the conversation. |
| `description` | string | no |  | Description. Description of the conversation. |
| `files` | array | yes |  | Files. Files to upload to the conversation. Each item: { `file` }. |
| `org` | string | no |  | Organization. Organization ID (for organization accounts) |
| `workspace` | string | no |  | Workspace. Workspace name where the conversation is created. |
| `enable_object_detection` | boolean | no | `false` | Enable Object Detection. Enable object detection for extracting tables and checkboxes. |
| `enable_entity_detection` | boolean | no | `true` | Enable Entity Detection. Enable entity detection for signatures and barcodes. |
| `write_converted_image` | boolean | no | `true` | Write Converted Images. Save image files generated when processing documents. |
| `write_thumbnail` | boolean | no | `true` | Write Thumbnails. Generate and save thumbnails of processed documents. |
| `fast_mode` | boolean | no | `false` | Fast Mode. Skip preprocessing steps for faster processing. |
| `enable_multilanguage_support` | boolean | no | `false` | Enable Multilanguage Support. Enable support for non-Latin languages. |
| `enable_multilanguage_advanced_mode` | boolean | no | `false` | Enable Advanced Multilanguage Mode. Enable advanced support for complex non-Latin languages. |

### `converse_with_document`

**Converse with Document.** Asks a natural-language question about one or more uploaded documents within an existing Instabase AI Hub conversation and returns the generated answer. Use after a conversation with processed documents exists; requires the conversation ID, the question, and the target document IDs, and supports selecting a model mode (default, advanced, or fast). Not idempotent: each call submits a new prompt and produces a fresh answer. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation. Select the conversation. A value the product loads from the provider, such as an id; write the value itself. |
| `question` | string | yes |  | Question. The question to ask the document. |
| `document_ids` | array | yes |  | Documents. Select the documents to query. Values the product loads from the provider, such as ids; write an array of them. |
| `mode` | string | no | `"default"` | Model Mode. The model to use to answer the question. One of `"default"`, `"advanced"`, `"fast_mode"`. |
| `fast_mode` | boolean | no | `false` | Fast Mode. Enable fast mode for quicker responses. |

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

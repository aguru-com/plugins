# Chat Aid

AI-powered assistant for your knowledge base.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chat-aid'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Chat Aid API Key

> Generate your API key in the dashboard: https://app.chataid.com/settings/automations

## Actions

### `addCustomSources`

**Add Custom Sources.** Upload one or more files (PDF, Word, text, Markdown, HTML, Excel, CSV, PowerPoint, or images) to a Chat Aid knowledge base as custom sources for training, optionally scoped to a specific team (defaults to org-wide). Use this to ingest new documents the assistant should be able to answer from. Not idempotent: each call appends new sources, so repeating it uploads duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `files` | array | yes |  | Files. One or more files to upload (PDF, Word, Text, Markdown, HTML, Excel, CSV, PowerPoint, PNG, JPEG, GIF) Each item: { `file` }. |
| `teamId` | string | no |  | Team ID. Optional team ID (defaults to org-wide) |

### `askQuestions`

**Ask Questions.** Ask a natural-language question against the Chat Aid knowledge base and get back an AI-generated answer with source citations; the call submits the prompt then polls until the answer is ready (timing out after ~2 minutes). Optionally pass parent and message timestamps to thread follow-up questions within an ongoing conversation. Use this to retrieve answers grounded in ingested sources. Not idempotent: each call generates a fresh completion and conversation turn. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Question. The question to ask the knowledge base. |
| `parentTs` | string | no |  | Parent Timestamp. Optional Unix timestamp for conversation threading. Use the same value for related questions in a conversation. |
| `messageTs` | string | no |  | Message Timestamp. Optional Unix timestamp of current message. Use with parentTs for follow-up questions in a conversation. |

### `getCustomSourceById`

**Get Custom Source by ID.** Fetch the details of a single custom source in the Chat Aid knowledge base by its source ID. Use this to look up or verify a specific source you already have an ID for. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceId` | string | yes |  | Source ID. The ID of the custom source to retrieve. |

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

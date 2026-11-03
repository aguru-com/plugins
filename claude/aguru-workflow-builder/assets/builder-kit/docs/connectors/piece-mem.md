# Mem

Capture and organize your thoughts using Mem.ai

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mem'
  version: '0.2.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key by navigating to **Integrations→ API**.

## Actions

### `create_mem`

**Create Mem.** Sends raw content (HTML, emails, transcripts, or plain notes) to Mem.ai's "mem-it" endpoint, where it is intelligently processed and filed into the knowledge base; optionally accepts processing instructions and background context. Use to capture unstructured material and let Mem decide how to organize it, rather than writing a specific note. Not idempotent: each call ingests the content anew. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `input` | string | yes |  | Input. Raw content you want to remember - HTML, emails, transcripts, or simple notes. |
| `instructions` | string | no |  | Instructions. Optional guidance on how you want this content processed or remembered. |
| `context` | string | no |  | Context. Additional background information to relate this to your existing knowledge. |

### `create_note`

**Create Note.** Creates a Markdown note in Mem, using the first line as the title, and can assign it to one or more collections (creating them if they do not exist). Use when you want to store a specific, ready-formatted note rather than hand raw content to Mem's processor. Not idempotent: a new note is created on each call, even when a Note ID is supplied. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Content. Markdown-formatted content. First line is treated as the note title. |
| `id` | string | no |  | Note ID. Optional UUID to assign to the note. |
| `add_to_collections` | array | no |  | Add to Collections. Collection titles or IDs to assign this note to. New collections will be created if they don’t exist. |

### `delete_note`

**Delete Note.** Permanently deletes a single note in Mem identified by its note ID. Use to remove a note you can address by ID. Destructive and not idempotent: the first call removes the note and a repeat with the same ID will fail because the note no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `note_id` | string | yes |  | Note ID. The ID of the note to delete. |

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

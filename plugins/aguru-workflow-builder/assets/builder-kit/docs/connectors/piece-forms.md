# Human Input

Trigger a flow through human input.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-forms'
  version: '0.5.0'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `return_response`

**Respond on UI.** Sends markdown text and/or one file attachment back to the person waiting on the Web Form or Chat UI trigger that started the flow. Pick it as the replying step when that trigger has "Wait for Response" enabled; it produces nothing visible in flows started any other way. Not idempotent: each call emits a response to the waiting caller and stores a new file for any attachment.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `markdown` | string | no |  | Text. Shown to the person waiting. Markdown is supported. |
| `file` | file | no |  | Attachment. A file the person can download with the response. Files are not supported; an action that needs one fails. |

Output fields:

- `type`: Type
- `value`: Text (Markdown)
- `files`: Files
- `files[].url`: File URL (url)
- `files[].mimeType`: MIME Type

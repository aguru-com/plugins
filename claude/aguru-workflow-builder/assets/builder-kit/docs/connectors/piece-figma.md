# Figma

Collaborative interface design tool

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-figma'
  version: '0.6.3'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `get_file`

**Get File.** Fetch the full document tree and metadata of a Figma design file by its file key (the alphanumeric segment in a Figma file URL). Use to read a file's structure, pages, layers, and properties. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_key` | string | yes |  | File Key. The Figma file key (copy from Figma file URL) |

### `get_comments`

**Get File Comments.** List all comments on a Figma file, identified by its file key (the alphanumeric segment in a Figma file URL). Use to review feedback or discussion threads on a design. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_key` | string | yes |  | File Key. The Figma file key (copy from Figma file URL) |

### `post_comment`

**Post File Comment.** Post a new comment with the given message text onto a Figma file, identified by its file key (the alphanumeric segment in a Figma file URL). Use to leave feedback or notes on a design. Not idempotent: each call appends another distinct comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_key` | string | yes |  | File Key. The Figma file key (copy from Figma file URL) |
| `message` | string | yes |  | Comment. Your comment. |

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

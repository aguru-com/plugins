# Signrequest

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-signrequest'
  version: '0.2.0'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Signrequest API Key

## Actions

### `send_signrequest`

**Send signrequest.** Creates and sends a document signature request via SignRequest, dispatching the document to the listed signers for e-signature. Use to kick off a signing workflow for a contract or form. Requires a title and a JSON array of signer objects (email/name/role); files to sign are an optional JSON array. Not idempotent — each call sends a new, separate signature request. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `subject` | string | no |  | Subject. |
| `message` | string | no |  | Message. |
| `signers` | JSON | yes |  | Signers (JSON array). JSON array of signer objects. Example: [{"email":"john@example.com","name":"John Doe","role":"signer"}]. |
| `files` | JSON | no |  | Files (JSON array). Optional JSON array describing files to attach. Use the shape expected by the Signrequest API (e.g. [{"url":"https://..."}]) |

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

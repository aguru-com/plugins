# ValidatedMails

ValidatedMails validates email addresses in real time and returns status, score, and domain-level deliverability signals.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-validatedmails'
  version: '0.1.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your ValidatedMails API key. You can find it in your ValidatedMails dashboard.

## Actions

### `validateEmail`

**Validate Email.** Validates one email address against the ValidatedMails API and returns deliverability signals (syntax, MX, SMTP, disposable/role/free flags, score, and overall status). Use to verify whether an address is real and deliverable before sending to it or persisting it. Requires the email; the Mode option only switches the HTTP method (POST vs GET) used for the same lookup. Read-only and idempotent: re-running with the same address returns the same result with no side effect. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. The email address to validate. |
| `dnsTimeoutMs` | number | no | `1500` | DNS Timeout (ms). DNS timeout in milliseconds. Value is clamped between 200 and 5000. |
| `mode` | string | yes | `"POST"` | Mode. HTTP method used for validation request. One of `"POST"`, `"GET"`. |

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

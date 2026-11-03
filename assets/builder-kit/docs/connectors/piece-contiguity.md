# Contiguity

Communications for what you're building

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-contiguity'
  version: '0.3.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Authenticate with the Contiguity API using a revocable key. Create one at console.contiguity.com/dashboard/tokens

## Actions

### `send_text`

**Send SMS/MMS.** Sends an outbound SMS (or MMS when attachments are supplied) through Contiguity to a recipient phone number. Choose this to deliver a text notification or message; the recipient number must be in E.164 format, and the body can be empty only when attachments (up to 3 HTTPS file URLs) are provided. Not idempotent: each call dispatches a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | string | yes |  | To. Recipient phone number in E.164 format. |
| `from` | string | no |  | From. Your leased phone number. |
| `message` | string | yes |  | Message. Text message content. |
| `attachments` | array | no |  | Attachments. File URLs (max 3, 5MB total, HTTPS required) Each item: { `url` }. |

### `send_imessage`

**Send iMessage.** Sends an outbound iMessage through Contiguity to a recipient phone number, optionally with attachments (up to 10 HTTPS file URLs) and an SMS/RCS fallback that can trigger when iMessage is unsupported and/or fails. Choose this to message Apple/iMessage recipients; the recipient number must be in E.164 format and the message body is required. Not idempotent: each call dispatches a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | string | yes |  | To. Recipient phone number in E.164 format. |
| `from` | string | no |  | From. Your leased iMessage number. |
| `message` | string | yes |  | Message. iMessage content. |
| `fallback` | boolean | no | `false` | SMS/RCS Fallback. Fallback to SMS/RCS when iMessage fails or unsupported. |
| `fallback_when` | object | yes |  | When to fallback. Conditions that trigger SMS/RCS fallback. An object whose fields depend on other inputs; the product shows them. |
| `attachments` | array | no |  | Attachments. File URLs (max 10, 50MB total, HTTPS required) Each item: { `url` }. |

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

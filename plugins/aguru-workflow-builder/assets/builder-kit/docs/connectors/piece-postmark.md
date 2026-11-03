# Postmark

Transactional email platform for sending email, templates, and retrieving delivery and bounce insights.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-postmark'
  version: '0.1.1'
```

Categories: COMMUNICATION, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Server API Token

> Create or copy a Postmark Server API Token from Servers → API Tokens in Postmark.

## Actions

### `send_email`

**Send Email.** Sends one transactional email through Postmark with an inline subject and body (text, HTML, or both). Use to deliver a one-off ad-hoc message; for content driven by a saved Postmark template use Send Email With Template instead. Requires a From address verified on the Postmark server and at least one of text or HTML body. Not idempotent: each call dispatches a new email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From. Sender email address configured in Postmark. |
| `to` | array | yes |  | To. Recipient email addresses. |
| `cc` | array | no |  | CC. Optional CC recipients. |
| `bcc` | array | no |  | BCC. Optional BCC recipients. |
| `replyTo` | string | no |  | Reply To. Optional reply-to email address. |
| `subject` | string | yes |  | Subject. |
| `textBody` | string | no |  | Text Body. |
| `htmlBody` | string | no |  | HTML Body. |
| `tag` | string | no |  | Tag. |
| `trackOpens` | boolean | no | `true` | Track Opens. |
| `messageStream` | string | no |  | Message Stream. Defaults to outbound if omitted. |

### `send_email_with_template`

**Send Email With Template.** Sends a transactional email rendered from a saved Postmark template, populating it with a template model (the JSON of merge variables). Use when the message content lives in a Postmark template rather than being composed inline; for free-form subject and body use Send Email instead. Requires the numeric template ID and a verified From address. Not idempotent: each call dispatches a new email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From. Sender email address configured in Postmark. |
| `to` | array | yes |  | To. Recipient email addresses. |
| `cc` | array | no |  | CC. |
| `bcc` | array | no |  | BCC. |
| `replyTo` | string | no |  | Reply To. |
| `templateId` | number | yes |  | Template ID. Numeric Postmark template ID. |
| `templateModel` | JSON | yes |  | Template Model. JSON object used to populate the Postmark template. |
| `tag` | string | no |  | Tag. |
| `trackOpens` | boolean | no | `true` | Track Opens. |
| `messageStream` | string | no |  | Message Stream. Defaults to outbound if omitted. |

### `get_email_bounces`

**Get Email Bounces.** Retrieves a paginated list of email bounces recorded on the Postmark server. Use to inspect delivery failures or check whether a specific recipient bounced; optional filters narrow by bounce type, inactive-only, recipient email, or message ID, and leaving them empty returns all bounces. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `count` | number | yes | `25` | Count. Maximum number of bounces to return (max 500). |
| `offset` | number | yes | `0` | Offset. Number of bounces to skip before returning results. |
| `type` | string | no |  | Type. Optional bounce type filter, for example HardBounce. |
| `inactive` | boolean | no |  | Inactive Only. Filter by inactive bounces only. When not set, both active and inactive bounces are returned. |
| `emailFilter` | string | no |  | Email Filter. Filter results by bounced recipient email address. |
| `messageId` | string | no |  | Message ID. Filter results by Postmark message ID. |

### `get_delivery_stats`

**Get Delivery Stats.** Retrieves aggregate delivery statistics for the Postmark server, including bounce-rate breakdowns by type. Use to report on overall email health for the server; it takes no inputs and is scoped to the authenticated server token. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

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

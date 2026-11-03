# Azure Communication Services

Communication services from Microsoft Azure

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-azure-communication-services'
  version: '0.1.7'
```

Categories: COMMUNICATION, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Connection string

## Actions

### `send_email`

**Send Email.** Sends an email through Azure Communication Services from a verified sender address, supporting either plain-text or HTML body via the content type selector. Use to deliver transactional or notification email when the workflow is wired to an Azure Communication Services connection. Requires a sender address provisioned in the Azure resource and at least one recipient; not idempotent — each call dispatches a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | Sender Email (From). Sender email. |
| `to` | array | yes |  | To. Emails of the recipients. |
| `cc` | array | no |  | Cc. List of emails in cc. |
| `bcc` | array | no |  | Bcc. List of emails in bcc. |
| `reply_to` | string | no |  | Reply To. Email to receive replies on (defaults to sender) |
| `subject` | string | yes |  | Subject. |
| `content_type` | string | yes | `"html"` | Content Type. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | Content. HTML is only allowed if you selected HTML as type. |

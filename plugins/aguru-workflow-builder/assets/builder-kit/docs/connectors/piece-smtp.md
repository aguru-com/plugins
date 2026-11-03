# SMTP

Send emails using Simple Mail Transfer Protocol

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-smtp'
  version: '0.5.0'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `host` | string | yes |  | Host. |
| `port` | string | yes |  | Port. 465 encrypts from the start; other ports upgrade to STARTTLS if the server offers it. One of `25`, `465`, `587`, `2525`. |
| `TLS` | boolean | yes | `false` | Require TLS. Fail instead of sending unencrypted if STARTTLS is unavailable. |
| `email` | string | no |  | Email. Login name, usually your email address. Blank if no login is needed. |
| `password` | string | no |  | Password. Leave blank if your mail relay does not require authentication. |

## Actions

### `send-email`

**Send Email.** Sends an email through an arbitrary SMTP relay, delivering the body as either plain text or HTML depending on the chosen body type. Use this when the only mail credentials available are raw SMTP host/port/login details; prefer a provider-specific piece (Gmail, Microsoft Outlook, SendGrid) when the mailbox lives on one of those services. Requires a reachable SMTP connection, a from address, at least one recipient, a subject and a body; not idempotent, since each call sends another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From Email. Must be an address your server lets you send from. |
| `to` | array | yes |  | To. |
| `cc` | array | no |  | Cc. |
| `bcc` | array | no |  | Bcc. |
| `replyTo` | string | no |  | Reply To. Replies go to this address instead of the sender. |
| `subject` | string | yes |  | Subject. |
| `body_type` | string | yes | `"plain_text"` | Body Type. How the text in Body is interpreted. One of `"plain_text"`, `"html"`. |
| `body` | string | yes |  | Body. |
| `attachments` | array | no |  | Attachments. Each item: { `file`, `name`? }. |
| `senderName` | string | no |  | Sender Name. Name shown in the inbox instead of your address. |
| `customHeaders` | object | no |  | Custom Headers. Extra headers added to the email, as name and value pairs. |

Output fields:

- `accepted`: Accepted Recipients
- `rejected`: Rejected Recipients
- `pending`: Pending Recipients
- `messageId`: Message ID
- `response`: SMTP Response
- `envelope`: Envelope
- `envelope.from`: From
- `envelope.to`: To
- `envelopeTime`: Envelope Time (ms) (duration)
- `messageTime`: Message Time (ms) (duration)
- `messageSize`: Message Size (filesize)
- `ehlo`: Server Capabilities (EHLO)

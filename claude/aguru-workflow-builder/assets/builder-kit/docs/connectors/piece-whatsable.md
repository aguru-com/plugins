# Whatsable

Manage your WhatsApp business account

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-whatsable'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Whatsable Auth Token

> The auth token for Whatsable

## Actions

### `sendMessage`

**Send Message.** Sends a WhatsApp text message to a single recipient through a connected Whatsable (WhatsApp Business) account. Use to deliver a one-off outbound message; requires the recipient phone number and the message text. Not idempotent: each call sends a new message, so repeating it delivers duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | string | yes |  | To. The recipient of the message. |
| `text` | string | yes |  | Message. The message to send. |

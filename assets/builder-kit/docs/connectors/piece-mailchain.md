# Mailchain

Mailchain is a simple, secure, and decentralized communications protocol that enables blockchain-based email.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mailchain'
  version: '0.1.6'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Secret Recovery Phrase

> The secret recovery phrase (25-word mnemonic phrase) to authenticate with the Mailchain Protocol. You can obtain this phrase when setting up your Mailchain account.

## Actions

### `getAuthenticatedUser`

**Get Authenticated User.** Resolves the Mailchain identity for the connected secret recovery phrase, returning the account username and Mailchain address. Use to discover the sender identity or verify credentials before sending mail. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

No inputs.

### `sendEmail`

**Send Email.** Sends an email over the Mailchain protocol from the connected account to one or more recipients, which may be blockchain or Mailchain addresses. The same text body is sent as both plain text and HTML. Use to deliver decentralized messages; each call sends a new email, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | array | yes |  | To. The blockchain or mailchain addresses to send the email to. |
| `subject` | string | yes |  | Subject. The subject of the email. |
| `content` | string | yes |  | Content. The content of the email. |

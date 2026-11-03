# KrispCall

KrispCall is a cloud telephony system for modern businesses, offering advanced features for high-growth startups and modern enterprises.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-krisp-call'
  version: '0.1.7'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API key. |

## Actions

### `addContact`

**Add Contact.** Create a contact in the connected KrispCall account, keyed by phone number. Use when an agent needs to register a new contact (name, company, email, address are optional; only the contact number is required). Not idempotent — calling it again with the same number creates or re-submits another contact entry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Enter your name. |
| `number` | string | yes |  | Contact number. Enter contact number. |
| `address` | string | no |  | Address. Enter your address. |
| `company` | string | no |  | Company. Enter your company. |
| `email` | string | no |  | Email. Enter your email. |

### `deleteContacts`

**Delete Contacts.** Delete one or more contacts from the connected KrispCall account, given a list of contacts to remove. Use when an agent needs to clean up or remove KrispCall contacts. Idempotent in effect — re-running after the contacts are gone leaves the account in the same state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contacts` | array | no |  | Contacts. Enter contact which you want to delete. |

### `sendSms`

**Send SMS.** Send a text-only SMS message from one of the connected KrispCall account numbers to a destination phone number. Use when an agent needs to send a plain SMS; the from number must be one provisioned on the account and the message content is required. Not idempotent — each call dispatches a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from_number` | string | yes |  | From Number. Select an Number. A value the product loads from the provider, such as an id; write the value itself. |
| `to_number` | string | yes |  | To Number. Enter the number to which you want to send sms. |
| `content` | string | yes |  | content. Enter your message here. |

### `sendMms`

**Send MMS.** Send an MMS message carrying one or more media URLs from a connected KrispCall account number to a destination phone number, with optional text content. Use when an agent needs to send media (images/files) rather than a plain SMS; the from number must be provisioned on the account and at least one media URL is required. Not idempotent — each call dispatches a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from_number` | string | yes |  | from number. Select an number. A value the product loads from the provider, such as an id; write the value itself. |
| `to_number` | string | yes |  | To Number. Enter the number to which you want to send sms. |
| `content` | string | no |  | content. Enter your message here. |
| `medias` | array | yes |  | Medias url. Enter medias urls. |

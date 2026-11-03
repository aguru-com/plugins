# OpenPhone

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-open-phone'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your OpenPhone API key. You can generate one from the API tab in your workspace settings.

## Actions

### `send_message`

**Send Message.** Sends an SMS/MMS text message from one of the workspace's OpenPhone numbers to a recipient. Choose this to programmatically text a contact or phone number. Requires the sending OpenPhone number (E.164 like +15555555555 or a phone-number ID) and exactly one recipient number in E.164 format; content must be 1-1600 characters. Not idempotent — each call sends a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Message Content. The text content of the message to be sent (1-1600 characters) |
| `from` | string | yes |  | From Phone Number. OpenPhone number to send from (E.164 format: +15555555555) or phone number ID (PN123abc) |
| `to` | array | yes |  | To Phone Numbers. Recipient phone numbers in E.164 format (e.g., +15555555555) Each item: { `phoneNumber` }. |
| `userId` | string | no |  | User ID. The unique identifier of the OpenPhone user sending the message. If not provided, defaults to the phone number owner. |
| `setInboxStatus` | string | no |  | Inbox Status. Set the status of the related OpenPhone inbox conversation. One of `"done"`. |

### `create_contact`

**Create Contact.** Creates a new contact in the OpenPhone workspace with optional emails, phone numbers, company, role, and custom fields. Choose this when adding a brand-new person; use Update Contact to modify an existing one. First name is required. Not idempotent — each call creates a separate contact even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | yes |  | First Name. The contact's first name. |
| `lastName` | string | no |  | Last Name. The contact's last name. |
| `company` | string | no |  | Company. The contact's company name. |
| `role` | string | no |  | Role. The contact's role. |
| `emails` | array | no |  | Email Addresses. List of email addresses for the contact. Each item: { `name`, `value` }. |
| `phoneNumbers` | array | no |  | Phone Numbers. List of phone numbers for the contact. Each item: { `name`, `value` }. |
| `customFields` | array | no |  | Custom Fields. Custom fields for the contact. Each item: { `key`, `value` }. |
| `createdByUserId` | string | no |  | Created By User ID. The unique identifier of the user who created the contact (US123abc format) |
| `source` | string | no | `"public-api"` | Source. The contact's source (defaults to "public-api") |
| `sourceUrl` | string | no |  | Source URL. A link to the contact in the source system. |
| `externalId` | string | no |  | External ID. A unique identifier from an external system. |

### `update_contact`

**Update Contact.** Updates an existing OpenPhone contact identified by its contact ID, changing any of name, company, role, emails, phone numbers, custom fields, or source. Choose this to modify a contact that already exists rather than create one. Requires a valid contact ID and at least one field to change; supplied email/phone arrays replace the existing ones. Idempotent — re-applying the same field values leaves the contact in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `firstName` | string | no |  | First Name. The contact's first name. |
| `lastName` | string | no |  | Last Name. The contact's last name. |
| `company` | string | no |  | Company. The contact's company name. |
| `role` | string | no |  | Role. The contact's role. |
| `emails` | array | no |  | Email Addresses. List of email addresses for the contact (replaces existing emails) Each item: { `name`, `value`?, `id`? }. |
| `phoneNumbers` | array | no |  | Phone Numbers. List of phone numbers for the contact (replaces existing phone numbers) Each item: { `name`, `value`?, `id`? }. |
| `customFields` | array | no |  | Custom Fields. Custom fields for the contact. Each item: { `key`, `value`?, `id`? }. |
| `source` | string | no |  | Source. Update the contact's source. |
| `sourceUrl` | string | no |  | Source URL. Update the link to the contact in the source system. |
| `externalId` | string | no |  | External ID. Update the unique identifier from an external system. |

### `get_call_summary`

**Get Call Summary.** Retrieves the AI-generated summary of a single call identified by its call ID (format AC...). Choose this to fetch the post-call summary text for a known call. Requires a valid call ID and an OpenPhone Business plan (summaries are unavailable otherwise). Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phoneNumberId` | string | yes |  | Phone Number. Select a phone number to get calls from. A value the product loads from the provider, such as an id; write the value itself. |
| `participantNumber` | string | yes |  | Participant Phone Number. Select a participant phone number to filter calls. A value the product loads from the provider, such as an id; write the value itself. |
| `callId` | string | yes |  | Call. Select a call. A value the product loads from the provider, such as an id; write the value itself. |

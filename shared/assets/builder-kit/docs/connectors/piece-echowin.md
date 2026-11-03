# Echowin

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-echowin'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Echowin API Key

> API Key for Echowin. Get it from [Echowin Settings](https://echo.win/portal/settings/integrations)

## Actions

### `createContact`

**Create Contact.** Creates a new contact in the Echowin CRM. Requires a phone number; first/last name, email, and carrier are optional. Use when adding a person to Echowin. Not idempotent — each call creates a separate contact even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | no |  | First Name. Contact's first name. |
| `lastName` | string | no |  | Last Name. Contact's last name. |
| `email` | string | no |  | Email. Contact's email address. |
| `number` | string | yes |  | Phone Number. Contact phone number (will be automatically cleaned) |
| `carrier` | string | no |  | Phone Carrier. Phone carrier name. |

### `deleteContact`

**Delete Contact.** Permanently deletes a contact from the Echowin CRM, identified by its unique contact ID. Use when removing a known contact; obtain the ID from a find/list step first. Idempotent in effect — once the contact is gone, repeating the call leaves it absent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. The unique identifier of the contact to delete. |

### `findContactByName`

**Find Contact .** Looks up contacts in the Echowin CRM. With a search value it filters contacts matching the given name, email, or phone number; leaving search empty returns the full paginated contact list. Use to resolve a contact or browse contacts. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search contacts by name, email, or phone number. |

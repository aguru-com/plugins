# Loops

Loops is an email platform for sending beautiful transactional and marketing emails. Manage contacts, trigger automations with events, and send transactional emails from your workflows.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-loops'
  version: '0.1.1'
```

Categories: COMMUNICATION, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Loops API key. Generate one at [Settings → API](https://app.loops.so/settings?page=api) in your Loops dashboard.

## Actions

### `create_contact`

**Create Contact.** Creates a new contact in Loops keyed on email, optionally setting name, internal user ID, marketing subscription status, user group, source, mailing-list memberships, and arbitrary custom properties. Use to add someone to the Loops audience; it errors if a contact with that email already exists (use the update/upsert path elsewhere for existing contacts). Not idempotent: a second call with the same email fails rather than no-op. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email address of the contact. |
| `firstName` | string | no |  | First Name. The contact's first name. |
| `lastName` | string | no |  | Last Name. The contact's last name. |
| `userId` | string | no |  | User ID. Your internal user ID for this contact. |
| `subscribed` | string | no |  | Subscribed to Marketing. Set subscription status. Leave as "No Change" to preserve existing status on update. One of `"no_change"`, `"true"`, `"false"`. |
| `userGroup` | string | no |  | User Group. A group/segment to assign to this contact. |
| `source` | string | no |  | Source. Where this contact came from (e.g. "signup-form", "import"). |
| `mailingLists` | object | no |  | Mailing Lists. Subscribe or unsubscribe this contact from mailing lists. Provide list IDs as keys with `true` (subscribe) or `false` (unsubscribe) as values. |
| `customProperties` | object | no |  | Custom Properties. Additional custom contact properties as key-value pairs. Reserved fields (email, firstName, lastName, userId, subscribed, userGroup, source) are ignored here. |

### `send_event`

**Send Event.** Sends a named event for a contact to Loops, which can trigger email automations configured in the dashboard; the contact is identified by email or internal user ID (at least one is required), and the call can also attach event properties and update mailing-list memberships or contact properties. Use to fire behavioral events like signup or purchase. The event name must match one set up in Loops. Not idempotent: each call records a new event occurrence. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. The email address of the contact to send the event for. |
| `userId` | string | no |  | User ID. Your internal user ID of the contact (used if email is not provided). |
| `eventName` | string | yes |  | Event Name. The name of the event to send (e.g. "signup", "purchase", "password-reset"). Must match an event set up in Loops. |
| `eventProperties` | object | no |  | Event Properties. Optional key-value pairs to attach to the event (used in email templates). |
| `mailingLists` | object | no |  | Mailing Lists. Subscribe or unsubscribe this contact from mailing lists. Provide list IDs as keys with `true` (subscribe) or `false` (unsubscribe) as values. |
| `contactProperties` | object | no |  | Contact Properties. Optional contact property updates to apply when the event is sent. |

### `send_transactional_email`

**Send Transactional Email.** Sends a transactional email to a single recipient using a pre-built Loops template, populating the template via data variables and optionally adding the recipient to the audience if they are not already a contact. Use for one-off, triggered emails like receipts or password resets. Requires the recipient email and the transactional template ID. Not idempotent: each call delivers another email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | To Email. The recipient's email address. |
| `transactionalId` | string | yes |  | Transactional Email ID. The ID of the transactional email template in Loops (find it in your Loops dashboard). |
| `addToAudience` | boolean | no | `false` | Add to Audience. If true, the recipient will be added to your Loops audience if they are not already a contact. |
| `dataVariables` | object | no |  | Data Variables. Key-value pairs to populate dynamic variables in your email template (e.g. { "name": "Alice", "resetUrl": "https://..." }). |

### `find_contact`

**Find Contact.** Looks up a contact in Loops by a single search field, chosen via a Search By selector that switches between matching on email or on internal user ID (the API allows only one search parameter). Use to check whether a contact exists or to retrieve their details before acting. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchBy` | string | yes |  | Search By. The field to search by. The Loops API only allows one search parameter. One of `"email"`, `"userId"`. |
| `searchValue` | string | yes |  | Value. The email address or user ID to search for. |

### `delete_contact`

**Delete Contact.** Permanently deletes a contact from Loops, identified by email or internal user ID (at least one is required). Use to remove someone from the Loops audience. Idempotent: repeating the call for an already-deleted contact converges on the same removed state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. The email address of the contact to delete. |
| `userId` | string | no |  | User ID. Your internal user ID of the contact to delete. |

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

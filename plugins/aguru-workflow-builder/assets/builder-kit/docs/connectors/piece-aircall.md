# Aircall

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-aircall'
  version: '0.2.1'
```

Categories: BUSINESS_INTELLIGENCE, COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `BASIC_AUTH`: Connection

> You can create API key by naviagting to **Integrations & API** menu.

## Actions

### `commentACall`

**Comment a Call.** Appends a free-text comment (note) to an Aircall call identified by its call ID. Use to annotate a call with context after it happens. Not idempotent: each call adds a new comment, so repeating it duplicates the note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `callId` | string | yes |  | Call. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | Comment Content. |

### `createAContact`

**Create a Contact.** Creates a new contact in Aircall with at least one phone number, plus optional name, company, emails, and free-text information. Use when adding a person not yet in the address book; to change an existing one use Update Contact instead. Not idempotent: each call creates a separate contact even with identical details. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_numbers` | array | yes |  | Phone Numbers. Each item: { `label`, `value` }. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `company_name` | string | no |  | Company Name. |
| `information` | string | no |  | Information. Additional information about the contact. |
| `emails` | array | no |  | Email Addresses. Array of email addresses (optional, max 20) Each item: { `label`, `value` }. |

### `findCalls`

**Find Call.** Searches Aircall calls and returns the single most recent match, optionally narrowed by direction (inbound/outbound), phone number, and tag IDs; with no filters it returns the latest call overall. Use to look up a call before commenting, tagging, or fetching its full details. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `direction` | string | no |  | Call Direction. Filter by call direction. One of `"inbound"`, `"outbound"`. |
| `phone_number` | string | no |  | Phone Number. The calling or receiving phone number of calls. |
| `tags` | array | no |  | Tags. Values the product loads from the provider, such as ids; write an array of them. |

### `findContact`

**Find Contact.** Searches Aircall contacts by phone number and/or email and returns the single best match. Use to resolve a contact ID before updating a contact or to check whether someone already exists. Provide at least one of phone number or email. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number` | string | no |  | Phone Number. Search by phone number (with country code, e.g., +1234567890). |
| `email` | string | no |  | Email. Search by email address. |

### `getCall`

**Get Call.** Retrieves the full details of one Aircall call by its call ID, including the associated contact, short URLs, and call timeline. Use when you already have a call ID and need its complete record. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `callId` | string | yes |  | Call. A value the product loads from the provider, such as an id; write the value itself. |

### `tagACall`

**Tag a Call.** Applies one or more existing tags (by tag ID) to an Aircall call identified by its call ID. Use to categorize or label a call. The supplied tag set replaces the call's current tags, so passing the same tags again leaves the result unchanged; effectively idempotent for a given tag set. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `callId` | string | yes |  | Call. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. Values the product loads from the provider, such as ids; write an array of them. |

### `updateContact`

**Update Contact.** Updates fields (first name, last name, company name, information) on an existing Aircall contact identified by its contact ID; only the fields you supply are changed. Use to edit a known contact rather than create one. Idempotent: applying the same values repeatedly leaves the contact in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. Select the contact to update. A value the product loads from the provider, such as an id; write the value itself. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. Last name of the contact. |
| `company_name` | string | no |  | Company Name. |
| `information` | string | no |  | Information. Additional information about the contact. |

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

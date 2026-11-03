# Respond.io

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-respond-io'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Please follow these steps to get your Respond.io API token:
>
> 1. Log in to your Respond.io account.
> 2. In the left sidebar, navigate to Settings.
> 3. Under Workspace Settings, click on Integrations.
> 4. Locate and click on the Developer API option.
> 5. Within the Developer API section, find your API key or generate a new one if needed.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `token` | string | yes |  | API Token. Your Respond.io API v2 Token. |

## Actions

### `add_comment_to_conversation`

**Add Comment to Conversation.** Posts an internal comment (note visible to team members, not the contact) on a contact's conversation in Respond.io. Use to leave context for agents rather than to message the contact. Requires the contact identifier and comment text (max 1000 chars); supports @-mentioning users via {{@user.ID}}. Not idempotent — each call appends another comment. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Contact. Select the contact. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Comment Text. The internal comment to add (max 1000 characters). You can mention users with {{@user.ID}} format where ID is the user ID. |

### `add_tag_to_contact`

**Add Tag to Contact.** Adds one or more tags to a Respond.io contact, identified by the contact identifier. Use to label or segment a contact. Accepts 1-10 tag names per call. Idempotent on the resulting tag set — re-adding a tag the contact already has leaves it unchanged. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Contact. Select the contact. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | yes |  | Tags. Tags to add to the contact (minimum 1, maximum 10 tags). Each item: { `tag` }. |

### `assign_or_unassign_conversation`

**Assign or Unassign Conversation.** Sets (or clears) the assignee on a contact's conversation in Respond.io. Two modes: provide a user to assign, or leave the assignee empty to unassign. Use to route a conversation to a specific agent or remove ownership. Idempotent — re-applying the same assignee leaves the conversation in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Contact. Select the contact. A value the product loads from the provider, such as an id; write the value itself. |
| `assignee` | string | no |  | Assignee. Select the user to assign the conversation to. Leave empty to unassign. A value the product loads from the provider, such as an id; write the value itself. |

### `create_contact`

**Create Contact.** Creates a new contact in Respond.io, keyed by a unique identifier in `email:...` or `phone:...` form. Use only when adding a brand-new contact; if the contact may already exist, prefer Create or Update Contact, which upserts. Requires the identifier and first name; optional email, phone, language, country, profile picture, and custom fields. Not idempotent — intended to create a fresh record. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Identifier. Must be a unique identifier for the new contact. Use format: `email:user@example.com` or `phone:+60123456789`. |
| `firstName` | string | yes |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `email` | string | no |  | Email. The email address of the contact. |
| `phone` | string | no |  | Phone. The phone number of the contact (in E.164 format). |
| `language` | string | no |  | Language. Language code (e.g., "en", "es") following ISO 639-1. |
| `profilePic` | string | no |  | Profile Picture URL. A direct URL to the contact's profile picture. |
| `countryCode` | string | no |  | Country Code. Country code (e.g., "US", "MY") following ISO 3166-1 alpha-2. |
| `customFields` | array | no |  | Custom Fields. Add custom fields for the contact. Each item: { `name`, `value`? }. |

### `create_or_update_contact`

**Create or Update Contact.** Upserts a Respond.io contact keyed by a unique identifier in `id:...`, `email:...`, or `phone:...` form: updates the matching contact if it exists, otherwise creates one. Prefer this over Create Contact when the contact may already exist. Requires the identifier and first name; optional email, phone, language, country, profile picture, and custom fields. Idempotent — repeating with the same input converges to the same record. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Identifier. Identifier for the contact. Use format: `id:123`, `email:user@example.com`, or `phone:+60123456789`. If contact exists, it will be updated; if not, a new one will be created. |
| `firstName` | string | yes |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `email` | string | no |  | Email. The email address of the contact. |
| `phone` | string | no |  | Phone. The phone number of the contact (in E.164 format). |
| `language` | string | no |  | Language. Language code (e.g., "en", "es") following ISO 639-1. |
| `profilePic` | string | no |  | Profile Picture URL. A direct URL to the contact's profile picture. |
| `countryCode` | string | no |  | Country Code. Country code (e.g., "US", "MY") following ISO 3166-1 alpha-2. |
| `customFields` | array | no |  | Custom Fields. Add custom fields for the contact. Each item: { `name`, `value`? }. |

### `delete_contact`

**Delete Contact.** Permanently deletes a contact from Respond.io, identified by the contact identifier. Destructive and irreversible — use only when the contact should be fully removed. Idempotent on end state: once deleted, repeating leaves the contact absent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Contact. Select the contact. A value the product loads from the provider, such as an id; write the value itself. |

### `find_contact`

**Find Contact.** Searches Respond.io contacts by a free-text term matching name, email, or phone, returning matching contacts. Use to resolve a contact to its ID before acting on it, or to look up contacts. Supports a result limit (1-99, default 10) and cursor-based pagination. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | yes |  | Search Term. The value to search for (e.g., email address, phone number, or name). |
| `timezone` | string | no |  | Timezone. Timezone for the search (e.g., "Asia/Kuala_Lumpur"). Optional. |
| `limit` | number | no | `10` | Result Limit. Number of contacts to return (1-99). Default is 10. |
| `cursorId` | number | no |  | Cursor ID. Contact ID to start from for pagination. Optional. |

### `open_conversation`

**Open Conversation.** Sets a contact's conversation status to open in Respond.io, identified by the contact identifier. Use to (re)open a conversation so it appears in active queues. Idempotent — opening an already-open conversation leaves it open. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Contact. Select the contact. A value the product loads from the provider, such as an id; write the value itself. |

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

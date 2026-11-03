# Heymarket SMS

Heymarket is a business texting platform that gives you the power to engage with people using shared inboxes.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-heymarket-sms'
  version: '0.1.0'
```

Categories: COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Heymarket API Key

> Enter your Heymarket API Key. You can find it in your Heymarket account settings.

## Actions

### `createOrUpdateContact`

**Create or Update Contact.** Upserts a Heymarket contact, keyed on phone number (E.164 without the leading plus, e.g. 14155553434). Supplying a Contact ID updates that existing record; omitting it creates a new contact. Use this to sync contact details (name, email, tags, opt-out) before messaging. Idempotent: re-running with the same phone/Contact ID converges on the same contact rather than duplicating; the Overwrite flag controls whether custom fields are replaced or merged. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone` | string | yes |  | Phone Number. Phone number in E.164 format without the plus sign (e.g. 14155553434) |
| `first` | string | no |  | First Name. First name of the contact. |
| `last` | string | no |  | Last Name. Last name of the contact. |
| `display_name` | string | no |  | Display Name. Display name of the contact. |
| `email` | string | no |  | Email. Email address of the contact. |
| `tags` | array | no |  | Tags. Array of tags. Each item: { `tag_id` }. |
| `is_opted_out` | boolean | no |  | Is Opted Out. Whether the contact is opted out of messaging. |
| `contact_id` | string | no |  | Contact ID. Contact ID for updating an existing contact. If not provided, will attempt to create a new contact. |
| `overwrite` | boolean | no |  | Overwrite Custom Fields. When true, replaces all existing custom fields. When false, merges with existing ones. Note: contact name is always overwritten. |

### `sendCustomMessage`

**Send Custom Message.** Sends a free-form SMS/MMS text from a Heymarket inbox. Route to a single recipient via Phone Number, or supply multiple numbers in Group Targets for a group MMS. Requires the sending Inbox ID and Creator ID (the member sending). Not idempotent: each call dispatches a new message. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inbox_id` | number | yes |  | Inbox ID. Unique identifier for the inbox from which the message will be sent. |
| `creator_id` | number | yes |  | Creator ID. Unique identifier for the sender (member ID from Get Inboxes) |
| `text` | string | yes |  | Message Text. Custom message text body. |
| `phone_number` | string | no |  | Phone Number. Phone number in E.164 format without the plus sign (e.g. 14155553434). Required if not sending to a list or chat. |
| `targets` | array | no |  | Group Targets. Array of phone numbers in E.164 format without the plus sign for group MMS messages. |

### `sendTemplateMessage`

**Send Template Message.** Sends a message built from a saved Heymarket template (by Template ID) from a given inbox. Route to a single recipient via Phone Number, or supply multiple numbers in Group Targets for a group MMS; optional override text supplements the template. Requires the sending Inbox ID and Creator ID. Not idempotent: each call dispatches a new message. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inbox_id` | number | yes |  | Inbox ID. Unique identifier for the inbox from which the message will be sent. |
| `creator_id` | number | yes |  | Creator ID. Unique identifier for the sender (member ID from Get Inboxes) |
| `template_id` | number | yes |  | Template ID. Unique identifier for the Heymarket template to send. |
| `phone_number` | string | no |  | Phone Number. Phone number in E.164 format without the plus sign (e.g. 14155553434). Required if not sending to a list. |
| `targets` | array | no |  | Group Targets. Array of phone numbers in E.164 format without the plus sign for group MMS messages. |
| `text` | string | no |  | Message Text. Optional message text body to override or supplement the template. |

### `updateList`

**Update List.** Updates an existing Heymarket list identified by List ID: rename it and/or add or remove members by phone number (E.164 without the leading plus), or set the full member set via the Members object. List ID and the (possibly unchanged) title are required. Idempotent: re-running with the same inputs converges on the same list membership and name. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | number | yes |  | List ID. Unique identifier for the list to update. |
| `title` | string | yes |  | List Name. Updated name for the list. |
| `add_phone` | string | no |  | Add Phone. Phone number in E.164 format without the plus sign to add to the list (e.g. 14155553434) |
| `remove_phone` | string | no |  | Remove Phone. Phone number in E.164 format without the plus sign to remove from the list (e.g. 14155553434) |
| `members` | JSON | no |  | Members. Object of list targets. Keys are phone numbers, values are objects with optional first name (f) and last name (l) |

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

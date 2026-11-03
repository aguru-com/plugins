# Plunk

Open-source email platform for transactional emails, marketing campaigns, and contact management.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-plunk'
  version: '0.1.0'
```

Categories: MARKETING, COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Find both API keys in your Plunk project's API settings.
>
> - Secret API key (`sk_*`) is required for sending email and managing contacts.
> - Public API key (`pk_*`) is optional.It is only used by the Track Event action.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `secretKey` | string | yes |  | Secret API Key. Used for /v1/send, /v1/contacts, and the Custom API Call action. |
| `publicKey` | string | no |  | Public API Key. Required only for the Track Event action. |

## Actions

### `send_transactional_email`

**Send Transactional Email.** Sends a one-off transactional email through Plunk to one recipient or a comma-separated list of recipients, with an HTML body and optional sender name, from address (must be a verified Plunk address), and reply-to. Choose this for direct/triggered emails rather than marketing campaigns. Not idempotent: each call dispatches a new email, and enabling the subscribed flag will create the recipient as a subscribed contact if they do not already exist. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | string | yes |  | To. Recipient email address. For multiple recipients, separate with commas. |
| `subject` | string | yes |  | Subject. |
| `body` | string | yes |  | Body. HTML body of the email. |
| `name` | string | no |  | Sender Name. Optional sender name. Falls back to the project default. |
| `from` | string | no |  | Sender Email (From). Optional sender email. Must be a verified address on your Plunk project. |
| `reply` | string | no |  | Reply-To. Optional reply-to email. |
| `subscribed` | boolean | no |  | Mark Recipient as Subscribed. When enabled, Plunk creates the recipient as a subscribed contact if they do not already exist. |

### `track_event`

**Track Event.** Records a named event (e.g. order.completed) against a contact identified by email, optionally with arbitrary event metadata, to drive Plunk automations. Use it to signal that something happened for a contact. Requires the Plunk public API key in the connection, and auto-creates the contact if it does not exist. Not idempotent: each call appends another occurrence of the event. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event` | string | yes |  | Event Name. Identifier of the event being tracked, e.g. `order.completed`. |
| `email` | string | yes |  | Contact Email. Email address of the contact the event belongs to. |
| `subscribed` | boolean | no |  | Mark Contact as Subscribed. When enabled, contacts auto-created by this event will be marked as subscribed. |
| `data` | object | no |  | Event Data. Optional metadata stored alongside the event. |

### `get_all_contacts`

**Get All Contacts.** Fetches the full list of contacts in the Plunk project, automatically paging through all results. Use it to enumerate or scan contacts when you do not already have a specific contact ID. Takes no input. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get_contact`

**Get Contact.** Looks up a single Plunk contact by its contact ID. Use it when you already have the exact contact ID; to discover IDs first, list contacts with Get All Contacts. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. The Plunk contact ID. |

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

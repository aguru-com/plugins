# Octopush SMS

Send bulk messaging for your promotions, order tracking, appointment reminders, voice messages, one-time passwords (OTP), 2-way chat sms and much more!

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-octopush-sms'
  version: '0.2.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

>

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `api_login` | string | yes |  | API Login. Your Octopush API Login. |
| `api_key` | string | yes |  | API Key. Your Octopush API Key. |

## Actions

### `addContact`

**Add Contact.** Creates or updates a contact in an Octopush contact list, keyed by phone number (international format required). Use to register or enrich a recipient before messaging; optionally assign it to a named list and a tag. By default an existing contact is updated, but enabling "Do Not Overwrite" makes it skip already-present numbers. Not idempotent: re-running can re-add or re-update the contact. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number` | string | yes |  | Phone Number. The phone number in international format (e.g., +33612345678) |
| `first_name` | string | no |  | First Name. First name of the contact. |
| `last_name` | string | no |  | Last Name. Last name of the contact. |
| `email` | string | no |  | Email. Email address of the contact. |
| `list_name` | string | no |  | List Name. Name of the contact list to add the contact to (optional, max 30 chars) |
| `tag_name` | string | no |  | Tag Name. Tag to attach to the contact (optional, max 20 chars) |
| `do_not_overwrite` | boolean | no | `false` | Do Not Overwrite. If enabled, will skip the contact if it already exists instead of updating it. |
| `auto_remove_blacklisted` | boolean | no | `false` | Auto Remove Blacklisted. If enabled, blacklisted numbers will be automatically removed from the list. |

### `sendANewSms`

**Send a New SMS.** Sends an SMS campaign to a recipient via Octopush, with an optional "Send At" time to schedule delivery instead of sending immediately. Use to deliver alerts, transactional, marketing, or OTP messages; requires the message text and a 3-11 character alphanumeric sender ID, and the recipient phone number in international format. Not idempotent: each call dispatches a new message. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number` | string | yes |  | Phone Number. Recipient phone number in international format (e.g., +33612345678) |
| `first_name` | string | no |  | First Name. Recipient first name (optional) |
| `last_name` | string | no |  | Last Name. Recipient last name (optional) |
| `message` | string | yes |  | Message Text. The SMS message content (1-1224 characters) |
| `sender` | string | yes |  | Sender ID. Sender name/ID (3-11 alphanumeric characters) |
| `purpose` | string | no |  | Purpose. Type of SMS campaign. One of `"alert"`, `"transactional"`, `"marketing"`, `"wholesale"`. |
| `send_at` | string | no |  | Send At. Schedule sending time in ISO8601 format (e.g., 2024-12-25T10:30:00+01:00) - optional. |
| `with_replies` | boolean | no | `false` | Enable Replies. Enable to receive recipient replies. |

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

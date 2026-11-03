# Kudosity

Kudosity is a cloud-based SMS platform that enables businesses to send and receive text messages globally.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-kudosity'
  version: '0.2.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Kudosity API Key

## Actions

### `addUpdateContact`

**Add / Update Contact.** Upsert a contact (list member) in a Kudosity recipient list, keyed on the MSISDN phone number — creates the member if absent or updates their fields if already present. Use to add subscribers or keep contact details in sync. Requires the numeric list ID, the MSISDN (phone with country code), and an email. Safe to repeat: the same input produces the same final record. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | List ID. Numeric ID of the recipient list (found in the list page URL). |
| `msisdn` | string | yes |  | MSISDN. Phone number with country code, e.g., +1234567890. |
| `email` | string | yes |  | Email. |
| `firstName` | string | no |  | First name. |
| `lastName` | string | no |  | Last name. |
| `phone` | string | no |  | Phone. |
| `customFields` | JSON | no |  | Custom fields. |

### `deleteContact`

**Delete Contact.** Remove a contact (list member), identified by MSISDN, from Kudosity recipient lists. If a list ID is supplied the contact is removed only from that list; if omitted the removal applies across lists. Use to unsubscribe or clean up contacts. Safe to repeat — re-running once the contact is gone leaves the same end state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | no |  | List ID. Numeric ID of the recipient list (found in the list page URL). |
| `msisdn` | string | yes |  | MSISDN. Phone number with country code (e.g., +1234567890) |

### `cancelSms`

**Cancel SMS.** Cancel a previously scheduled (not-yet-sent) SMS in Kudosity by its numeric message ID. Use to stop a queued message before delivery. Requires the message ID returned when the SMS was scheduled. Safe to repeat — re-cancelling an already-cancelled message leaves the same end state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Message ID. Numeric ID assigned to the message sent. |

### `formatNumber`

**Format Number.** Normalize a phone number into international E.164 format using a supplied country code or name to resolve the local number. Use to validate or standardize numbers before sending or storing them. Requires the country and the number; this is a pure lookup with no side effect and is safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `country` | string | yes |  | Country. Country code or name (e.g., US, AU, NZ) to determine the number format. |
| `number` | string | yes |  | Number. Phone number in local format (spaces, hyphens, and other characters will be removed) |

### `sendSms`

**Send SMS.** Send an SMS text message to a recipient via Kudosity. Use when an automation needs to deliver an outbound text. Requires a sender (number or alphanumeric ID assigned to the account), a recipient (local or E.164), and the message body; an optional message reference and link tracking can be set. Not idempotent — each call dispatches a new message. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sender` | string | yes |  | Sender. Sender number or alphanumeric sender that is assigned to your account. |
| `recipient` | string | yes |  | Recipient. Destination number (local or E.164 format) |
| `message` | string | yes |  | Message. Body of the SMS message. |
| `messageRef` | string | no |  | Message Reference. Optional reference string to correlate messages with your system. |
| `trackLinks` | boolean | no |  | Track Links. Enable link tracking for this message. |

### `getSmsInfo`

**Get SMS info.** Look up the details and delivery status of a previously sent SMS by its message ID (the UUID returned when the message was sent). Use to check status or fetch metadata for a known message. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Message ID. The message ID to retrieve (UUID returned when sending) |

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

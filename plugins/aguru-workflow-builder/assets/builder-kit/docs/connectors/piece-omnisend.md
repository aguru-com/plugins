# Omnisend

All-in-one ecommerce marketing platform for email, SMS, and push notification campaigns with powerful automation and segmentation.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-omnisend'
  version: '0.1.0'
```

Categories: MARKETING, SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your Omnisend API key:
> 1. Log in to your [Omnisend account](https://app.omnisend.com).
> 2. Go to **Store settings → Integrations & API → API Keys**.
> 3. Click **Create API Key**, give it a name.
> 4. Copy the generated key and paste it here.

## Actions

### `create_or_update_contact`

**Create or Update Contact.** Upsert a contact in Omnisend keyed on the email address: creates the contact if new, otherwise updates fields (name, location, tags) and the email subscription status. Use to add subscribers or sync contact data. Idempotent for an existing contact; re-running with the same input has no extra effect, but enabling Send Welcome Message can trigger a one-time welcome email on first creation. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Contact email address (used as identifier). |
| `emailStatus` | string | yes |  | Email Subscription Status. The subscription status for the email channel. One of `"subscribed"`, `"unsubscribed"`, `"nonSubscribed"`. |
| `firstName` | string | no |  | First Name. Contact first name. |
| `lastName` | string | no |  | Last Name. Contact last name. |
| `country` | string | no |  | Country. Contact country name. |
| `countryCode` | string | no |  | Country Code. Two-letter country code (ISO 3166-1 alpha-2). |
| `city` | string | no |  | City. Contact city. |
| `tags` | array | no |  | Tags. Tags to assign to the contact. |
| `sendWelcomeMessage` | boolean | no | `false` | Send Welcome Message. Send a welcome email to the contact upon creation. |

### `get_contact`

**Get Contact.** Fetch a single Omnisend contact by its contact ID. Use when you already have the contact ID and need its full profile; to find a contact by email instead, use List Contacts with an email filter. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. |

### `list_contacts`

**List Contacts.** List contacts from Omnisend with limit/offset pagination. Leave the email filter empty to browse all contacts, or set it to look up a specific contact by email address (use this rather than Get Contact when you only have an email, not a contact ID). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `50` | Limit. Number of contacts to return (max 250). |
| `offset` | number | no | `0` | Offset. Number of contacts to skip for pagination. |
| `email` | string | no |  | Filter by Email. Filter contacts by email address. |

### `send_customer_event`

**Send Customer Event.** Record a customer event for a contact (identified by email) in Omnisend, which can trigger automations such as welcome emails or abandoned-cart reminders. The event name may be a predefined Omnisend event (e.g. "placed order") or a custom name, with optional key-value properties. Not idempotent: each call appends a new event, so repeating it can re-fire automations. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Contact Email. Email address of the contact to send the event for. |
| `eventName` | string | yes |  | Event Name. The name of the event. Use predefined names (e.g. "added product to cart", "placed order") or a custom event name. |
| `properties` | object | no |  | Event Properties. Custom key-value properties to include with the event (e.g. {"orderId": "12345", "totalPrice": 99.99}). |

### `list_campaigns`

**List Campaigns.** List email campaigns from Omnisend with limit/offset pagination. Leave Status empty to return campaigns of all statuses, or set it to filter to a single state (draft, scheduled, sending, or sent). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `25` | Limit. Number of campaigns to return. |
| `offset` | number | no | `0` | Offset. Number of campaigns to skip for pagination. |
| `status` | string | no |  | Status. Filter campaigns by status. One of `"draft"`, `"scheduled"`, `"sending"`, `"sent"`. |

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

# Kustomer

Create and manage Kustomer customers, conversations, and custom objects.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-kustomer'
  version: '0.1.0'
```

Categories: CUSTOMER_SUPPORT. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> Authenticate using a Kustomer API token.
>
> Paste a private Kustomer API token with access to customers, conversations, and KObjects.

## Actions

### `create-customer`

**Create Customer.** Creates a new customer record in Kustomer from identity and profile fields (name, email, phone, company, externalId, locale, etc.). Use to add a contact to Kustomer; pass externalId to link the record back to your own system. Not idempotent — each call creates a separate customer even with identical input, so guard against duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Full Name. The customer's full name (e.g. "Jane Doe"). |
| `email` | string | no |  | Email Address. Primary email address of the customer. |
| `phone` | string | no |  | Phone Number. Primary phone number in E.164 format (e.g. "+14155551234"). |
| `company` | string | no |  | Company. Name of the company the customer belongs to. |
| `externalId` | string | no |  | External ID. Unique identifier from your own system (e.g. your CRM or database ID). Used to link this Kustomer record back to your data. |
| `username` | string | no |  | Username. The customer's username in your system. |
| `locale` | string | no |  | Locale. Language/locale code for the customer (e.g. "en_US", "fr_FR", "de_DE"). |
| `timeZone` | string | no |  | Time Zone. IANA timezone identifier (e.g. "America/New_York", "Europe/London", "Asia/Tokyo"). |
| `gender` | string | no |  | Gender. The customer's gender. One of `"m"`, `"f"`. |
| `birthdayAt` | string | no |  | Birthday. Customer's birth date in ISO 8601 format (e.g. "1990-06-15T00:00:00.000Z"). |
| `signedUpAt` | string | no |  | Signed Up At. When the customer registered, in ISO 8601 format (e.g. "2024-01-15T10:30:00.000Z"). |
| `avatarUrl` | string | no |  | Avatar URL. URL of the customer's profile image. |

### `create-conversation`

**Create Conversation.** Creates a new conversation in Kustomer attached to an existing customer. Use to open a support thread for a known customer; the customer ID is required (resolve it first via Get Customer). Optional status, priority, direction, and reply channel set the conversation's initial state. Not idempotent — each call creates a separate conversation. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | yes |  | Customer ID. The Kustomer ID of the customer this conversation belongs to. You can get this from the "Get Customer" action or from the URL when viewing a customer in Kustomer. |
| `name` | string | no |  | Conversation Name. A short subject or title for the conversation (max 256 characters). |
| `status` | string | no | `"open"` | Status. The initial status of the conversation. One of `"open"`, `"done"`. |
| `priority` | string | no |  | Priority. Conversation priority from 1 (lowest) to 5 (highest). One of `1`, `2`, `3`, `4`, `5`. |
| `direction` | string | no |  | Direction. "Inbound" means the customer initiated the conversation; "Outbound" means your team initiated it. One of `"in"`, `"out"`. |
| `externalId` | string | no |  | External ID. A unique identifier from your own system to link this conversation (max 256 characters). |
| `replyChannel` | string | no |  | Reply Channel. The channel used to reply in this conversation (e.g. "email", "chat"). Leave empty to use the workspace default. |

### `update-conversation`

**Update Conversation.** Updates an existing Kustomer conversation identified by its conversation ID, changing fields such as status (open/done/snoozed), priority, name, direction, or reply channel. Only the fields you supply are modified. Use to change the state of a known conversation. Idempotent — repeating the same update yields the same end state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | string | yes |  | Conversation ID. The Kustomer ID of the conversation to update. You can get this from the "Create Conversation" action output or from the URL when viewing a conversation in Kustomer. |
| `status` | string | no |  | Status. Change the status of the conversation. One of `"open"`, `"done"`, `"snoozed"`. |
| `priority` | string | no |  | Priority. Conversation priority from 1 (lowest) to 5 (highest). One of `1`, `2`, `3`, `4`, `5`. |
| `name` | string | no |  | Conversation Name. Update the subject or title of the conversation. |
| `direction` | string | no |  | Direction. "Inbound" means the customer initiated the conversation; "Outbound" means your team initiated it. One of `"in"`, `"out"`. |
| `replyChannel` | string | no |  | Reply Channel. The channel used to reply in this conversation (e.g. "email", "chat"). |

### `get-customer`

**Get Customer.** Fetches a single Kustomer customer record by its Kustomer customer ID. Use to look up a customer's details when you already have their ID. Read-only and idempotent. The customer ID is required. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | yes |  | Customer ID. The Kustomer customer ID. |

### `get-custom-objects`

**Get Custom Objects.** Lists the custom objects (KObjects) of a given class in Kustomer, identified by the class's API name (the lowercase identifier, not the display label). Optionally pass a from-date to return only objects created or updated on or after it; leave it empty to return all objects of the class. Use to read or enumerate custom-object records. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `klassName` | string | yes |  | KObject Class Name. The API name of the custom object class to fetch (e.g. "order", "ticket"). You can find this in Kustomer under Settings > Custom Objects — it is the lowercase identifier, not the display label. |
| `fromDate` | string | no |  | From Date. Only return objects created or updated on or after this date. Use ISO 8601 format (e.g. "2024-01-15T00:00:00.000Z"). Leave empty to return all objects. |

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

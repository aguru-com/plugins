# WaitWhile

WaitWhile is an appointment scheduling and queue management platform.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-waitwhile'
  version: '0.1.0'
```

Categories: COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your Waitwhile API Key:
>
> 1. Go to the [Integrations Settings](https://v2.waitwhile.com/account/integrations) page in your Waitwhile account
> 2. Create a new API Key (or use an existing one)
> 3. Copy the API Key and paste it here

## Actions

### `createACustomer`

**Create a customer.** Creates a new customer record in Waitwhile from the provided contact details (first name required; last name, phone, email, and tags optional). Choose this when adding a person to the system before booking or queuing them. Not idempotent: each call creates a separate customer even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | yes |  | First Name. Customer first name. |
| `lastName` | string | no |  | Last Name. Customer last name. |
| `phone` | string | no |  | Phone. Customer phone number. |
| `email` | string | no |  | Email. Customer email address. |
| `tags` | array | no |  | Tags. Tags associated with the customer. |

### `createOrUpdateAVisit`

**Create or Update a Visit.** Creates a new waitlist/appointment visit or updates an existing one in Waitwhile, optionally linking a customer and location and setting notes, party size, and start time. Use to add someone to a queue or modify their visit; supply an existing visit id to update, or omit it to create. Idempotent when keyed on a stable visit id (re-running with the same id and inputs converges to the same record). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | no |  | Visit ID. Select a Visit ID. A value the product loads from the provider, such as an id; write the value itself. |
| `customerId` | string | yes |  | Customer ID. Select a Customer ID. A value the product loads from the provider, such as an id; write the value itself. |
| `locationId` | string | yes |  | Location. Select a Location. A value the product loads from the provider, such as an id; write the value itself. |
| `notes` | string | no |  | Notes. Visit notes. |
| `partySize` | number | no |  | Party Size. Number of people in the party. |
| `startDate` | string | no |  | Start Date. Start date/time in ISO format (e.g., 2024-01-01T10:00:00Z) |

### `deleteAVisit`

**Delete a visit.** Permanently deletes a visit in Waitwhile by its visit id; the visit becomes unretrievable and is excluded from analytics. Use to purge a queue or appointment entry. Requires a valid visit id and is destructive: re-running on the same id will error once the visit is gone. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `visitId` | string | no |  | Visit ID. Select a Visit ID. A value the product loads from the provider, such as an id; write the value itself. |

### `searchCustomers`

**Search customers.** Searches Waitwhile customers by a prefix-match query (name, phone, email, or customer identifier) and optional filters for location, visit state, tag, and a date range, with limit/page pagination. Use to look up an existing customer or filter a customer list before acting; with no query or filters it returns the broader set. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q` | string | no |  | Search Query. Search query for name, phone, email, or customer identifier (prefix match) |
| `locationId` | string | no |  | Location ID. Filter by location identifier. |
| `state` | string | no |  | Visit State. Filter by visit state. One of `"PENDING"`, `"DRAFT"`, `"WAITING"`, `"BOOKED"`, `"SERVING"`, `"COMPLETE"`. |
| `tag` | string | no |  | Tag. Filter by tag associated with visit. |
| `limit` | number | no |  | Limit. Max number of results (1-100, defaults to 20) |
| `page` | number | no |  | Page. Page in results (defaults to 1) |
| `fromDate` | string | no |  | From Date. Start date in ISO-8601 format (e.g., 2024-01-01T00:00:00Z) |
| `toDate` | string | no |  | To Date. End date in ISO-8601 format (e.g., 2024-12-31T23:59:59Z) |

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

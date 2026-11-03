# Freshdesk

Customer support software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-freshdesk'
  version: '0.3.1'
```

Categories: CUSTOMER_SUPPORT. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Get the API token by visiting your profile settings and clicking View API key

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes |  | Base URL. Enter the base URL. |
| `access_token` | string | yes |  | API Token. Enter the API token. |

## Actions

### `get_tickets`

**Get Tickets.** Retrieve the list of support tickets from a Freshdesk account (the default unfiltered tickets endpoint, returning recent tickets). Use to browse or enumerate tickets when you do not have a specific ticket ID or status filter; for status-filtered results use Get All Tickets By Status instead. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `get_contact_from_id`

**Get Contact from ID.** Fetch the full details of a single Freshdesk contact by its numeric contact ID. Use when you already have a specific contact ID and need its record; to look up contacts by email, phone, or other attributes use Get Freshdesk Contacts instead. Requires a valid contact ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactid` | string | yes |  | Contact ID number. The ID number of the contact. |

### `get_ticket_status`

**Get Ticket Status.** Look up a single Freshdesk ticket by its numeric ticket ID and report its workflow state, returning a human-readable status (Open, Pending, Resolved, or Closed) plus whether the ticket is assigned to an agent. Use when you have a specific ticket ID and need just its status/assignment rather than the full ticket record. Requires a valid ticket ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketid` | string | yes |  | Ticket ID. The Ticket ID to return status. |

### `get_contacts`

**Get Freshdesk Contacts.** List Freshdesk contacts, optionally narrowing the results by an attribute filter (email, mobile, phone, company ID, or updated-since) and/or a state filter (blocked, deleted, unverified, verified); with no filters it returns all contacts. Use to search for or enumerate contacts when you do not already have a contact ID. Per-page count caps at 100 (set 0 for the default page). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter_type` | string | no | `""` | Optional Filter. Select one and provide the value. One of `"email"`, `"mobile"`, `"phone"`, `"company_id"`, `"updated_since"`. |
| `filter_value` | string | no | `""` | Filter value. Provide value if previous option selected! |
| `filter_status` | string | no | `""` | Optional Filter Status. Can filter by state: blocked, deleted, unverified or verified. One of `"blocked"`, `"deleted"`, `"unverified"`, `"verified"`. |
| `per_page` | number | yes | `0` | Results to return. Freshdesk calls this per_page - set to 0 for all, if specified maximum is 100. |

### `get_all_tickets_by_status`

**Get All Tickets By Status.** Search Freshdesk tickets filtered to one or more selected workflow states (Open, Pending, Resolved, Closed), combining the chosen statuses with OR. Use when you want tickets matching specific statuses rather than the full unfiltered list from Get Tickets. At least one status must be selected. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_filter` | array | yes |  | Choose Status(es). Select one or status values. One of `"status:2"`, `"status:3"`, `"status:4"`, `"status:5"`. |

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

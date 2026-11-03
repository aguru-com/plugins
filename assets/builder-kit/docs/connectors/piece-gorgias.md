# Gorgias

Helpdesk platform for ecommerce teams to manage tickets, customers, and support conversations.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-gorgias'
  version: '0.1.0'
```

Categories: CUSTOMER_SUPPORT. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Gorgias

> To connect your Gorgias account:
>
> 1. Copy your helpdesk subdomain (for example, `acme` from `https://acme.gorgias.com`).
> 2. In Gorgias, create or copy an API key.
> 3. Use the email address associated with that API key.
>
> Authentication uses HTTP Basic auth with `email:api_key`.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Helpdesk Domain. Your Gorgias subdomain only, for example `acme` from https://acme.gorgias.com. |
| `email` | string | yes |  | Email Address. The email address associated with your Gorgias API key. |
| `api_key` | string | yes |  | API Key. Your Gorgias API key. |

## Actions

### `create_gorgias_ticket`

**Create Ticket.** Open a new support ticket in Gorgias seeded with one initial message, specifying the sender (from) and recipient (to) addresses, subject, body, and the channel/via the message came through. Use to start a fresh conversation rather than reply to an existing thread; to add a follow-up message to a ticket that already exists, use Create Message instead. Not idempotent: each call creates a separate ticket. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromAddress` | string | yes |  | From Address. The sender address for the initial message, typically the customer email. |
| `toAddress` | string | yes |  | To Address. The recipient address for the initial message. |
| `subject` | string | yes |  | Subject. |
| `message` | string | yes |  | Message. Initial ticket message. HTML is accepted by the API. |
| `channel` | string | yes | `"email"` | Channel. One of `"email"`, `"sms"`, `"chat"`, `"facebook"`, `"instagram"`, `"internal-note"`, `"phone"`. |
| `via` | string | yes | `"api"` | Via. How the message reached Gorgias. One of `"help-center"`, `"api"`, `"rule"`, `"manual"`. |

### `get_gorgias_ticket`

**Get Ticket.** Fetch a single Gorgias support ticket by its numeric ID. Use when you already have the ticket ID and need its current details; to discover tickets without an ID, use List Tickets first. Idempotent read-only lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketId` | number | yes |  | Ticket ID. |

### `update_gorgias_ticket`

**Update Ticket.** Modify fields on an existing Gorgias ticket identified by its numeric ID, such as subject, status (e.g. open/closed), channel, attached customer, spam/unread flags, or external ID. Use to change ticket state or metadata; this does not add a reply or message (use Create Message for that). Idempotent: it sets fields to the supplied values, so repeating the same call leaves the ticket in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketId` | number | yes |  | Ticket ID. |
| `subject` | string | no |  | Subject. |
| `status` | string | no |  | Status. One of `"open"`, `"closed"`. |
| `channel` | string | no |  | Channel. One of `"email"`, `"sms"`, `"chat"`, `"facebook"`, `"instagram"`, `"internal-note"`, `"phone"`. |
| `customerId` | number | no |  | Customer ID. Optional customer ID to attach to the ticket. |
| `customerEmail` | string | no |  | Customer Email. Optional customer email to attach alongside the customer ID. |
| `fromAgent` | boolean | no |  | From Agent. Whether the first message of the ticket was sent by your company. |
| `isUnread` | boolean | no |  | Is Unread. |
| `spam` | boolean | no |  | Spam. |
| `externalId` | string | no |  | External ID. |

### `list_gorgias_tickets`

**List Tickets.** List Gorgias support tickets, one page at a time, with optional filtering by customer ID and custom ordering. Use to discover or enumerate tickets when you do not have a specific ID; pass the cursor from a prior response to page through results. Idempotent read-only query. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | number | no |  | Customer ID. Optional customer ID to filter tickets for one customer. |
| `cursor` | string | no |  | Cursor. Optional cursor returned by a previous list response. |
| `limit` | number | no | `25` | Limit. Maximum number of tickets to return in this page. Defaults to 25. |
| `orderBy` | string | no |  | Order By. Optional ordering, for example `created_datetime:desc`. |

### `create_gorgias_ticket_message`

**Create Message.** Append a new message (reply) to an existing Gorgias ticket identified by its numeric ID. The From Agent flag controls direction: when true the message comes from an agent/user (Sender ID is a user, Receiver ID a customer), when false it comes from the customer (the IDs swap). Use to continue an existing conversation; to open a brand-new ticket use Create Ticket. Not idempotent: each call appends another message. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketId` | number | yes |  | Ticket ID. |
| `fromAgent` | boolean | yes | `true` | From Agent. True when the sender is an agent/user; false when the sender is a customer. |
| `senderId` | number | yes |  | Sender ID. User ID when From Agent is true, otherwise Customer ID. |
| `receiverId` | number | yes |  | Receiver ID. Customer ID when From Agent is true, otherwise User ID. |
| `fromAddress` | string | yes |  | From Address. Email or channel address of the sender. |
| `toAddress` | string | yes |  | To Address. Email or channel address of the receiver. |
| `message` | string | yes |  | Message. Message body. HTML is accepted by the API. |
| `subject` | string | no |  | Subject. |
| `channel` | string | yes | `"email"` | Channel. One of `"email"`, `"sms"`, `"chat"`, `"facebook"`, `"instagram"`, `"internal-note"`, `"phone"`. |
| `via` | string | yes | `"api"` | Via. One of `"help-center"`, `"api"`, `"rule"`, `"manual"`. |
| `sentDatetime` | string | no |  | Sent Datetime. Optional ISO-8601 timestamp for when the message was sent. |

### `get_gorgias_customer`

**Get Customer.** Look up a single Gorgias customer, operating in one of two modes: pass a Customer ID to fetch it directly, or omit the ID and pass an Email to search customers server-side and return the match. Use to resolve a customer record before working with their tickets; supply exactly one of the two inputs and the call errors if neither is given or no email match is found. Idempotent read-only lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | number | no |  | Customer ID. Use this when you already know the customer ID. |
| `email` | string | no |  | Email. If Customer ID is not provided, search customers by email using Gorgias server-side filtering. |

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

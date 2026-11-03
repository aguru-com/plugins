# Zoho Desk

Helpdesk management software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-zoho-desk'
  version: '0.2.2'
```

Categories: CUSTOMER_SUPPORT. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Authentication for Zoho Desk

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | string | yes |  | Location. The location of your Zoho Desk account. One of `"zoho.eu"`, `"zoho.com"`, `"zoho.com.au"`, `"zoho.jp"`, `"zoho.in"`, `"zohocloud.ca"`. |

## Actions

### `list_tickets`

**List tickets..** Retrieves tickets from a Zoho Desk organization, optionally expanding related data (contacts, products, departments, team, isRead, assignee) via the include option. Use to browse or page through existing tickets when you do not have a specific ticket ID; requires the organization ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orgId` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `include` | array | no |  | include. Additional information related to the tickets. One of `"contacts"`, `"products"`, `"departments"`, `"team"`, `"isRead"`, `"assignee"`. |

### `create_ticket`

**Create Ticket.** Creates a new support ticket in a Zoho Desk organization. Use when an agent needs to log a new issue or request; requires the organization ID, a department ID, a subject, and a description, with optional contact, status, priority, channel, assignee, and custom fields. Not idempotent — each call creates a separate ticket. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orgId` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `departmentId` | string | yes |  | Department. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | no |  | Contact ID. ID of the contact raising the ticket. |
| `subject` | string | yes |  | Subject. Subject of the ticket. |
| `description` | string | yes |  | Description. Description of the issue in the ticket. |
| `email` | string | no |  | Email. Email address of the contact raising the ticket. |
| `phone` | string | no |  | Phone. Phone number of the contact raising the ticket. |
| `status` | string | no | `"Open"` | Status. Status of the ticket. One of `"Open"`, `"On Hold"`, `"Escalated"`, `"Closed"`. |
| `priority` | string | no | `"Medium"` | Priority. Priority of the ticket. One of `"Low"`, `"Medium"`, `"High"`, `"Urgent"`. |
| `category` | string | no |  | Category. Category of the ticket. |
| `subCategory` | string | no |  | Sub Category. Sub-category of the ticket. |
| `dueDate` | ISO date-time string | no |  | Due Date. Due date for the ticket (ISO format) |
| `channel` | string | no | `"Web"` | Channel. Channel through which the ticket is created. One of `"Email"`, `"Phone"`, `"Chat"`, `"Web"`, `"Social"`. |
| `assigneeId` | string | no |  | Assignee ID. ID of the agent to whom the ticket is assigned. |
| `productId` | string | no |  | Product ID. ID of the product to which the ticket belongs. |
| `classification` | string | no |  | Classification. Classification of the ticket. |
| `language` | string | no | `"English"` | Language. Language of the ticket. |
| `entitySkills` | array | no |  | Entity Skills. Array of skill IDs associated with the ticket. |
| `customFields` | object | no |  | Custom Fields. Custom fields in the ticket. |

### `find-contact`

**Find Contact.** Searches a Zoho Desk organization for contacts matching an exact email address, returning whether any were found along with the matches. Use to resolve a contact (e.g. before creating or routing a ticket) when you have the email rather than an ID; requires the organization ID and email. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orgId` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. |

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
| `orgId` | string | no |  | Organization ID. Select organization ID to include in auth headers. A value the product loads from the provider, such as an id; write the value itself. |

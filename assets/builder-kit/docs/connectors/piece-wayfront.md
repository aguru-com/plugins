# Wayfront

Unify your process, automate steps, and help clients find what they need.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-wayfront'
  version: '0.0.5'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Provide your Wayfront workspace URL and bearer token.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceUrl` | string | yes |  | Workspace URL. Your Wayfront workspace URL (e.g. example.wayfront.com) |
| `apiToken` | string | yes |  | API Token. Your Wayfront bearer token. |

## Actions

### `create_client`

**Create Client.** Creates a new client record in a Wayfront workspace from contact details (name, email, company, phone, address, status, balance, custom fields). Use to onboard a customer or lead into the CRM. All fields are optional, so passing none creates an empty client. Not idempotent: each call adds a separate client even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. The email address of the client. |
| `name_f` | string | no |  | First Name. |
| `name_l` | string | no |  | Last Name. |
| `company` | string | no |  | Company. |
| `phone` | string | no |  | Phone. |
| `note` | string | no |  | Note. |
| `status_id` | number | no |  | Status ID. Numeric ID of the client status. Find status IDs in your Wayfront workspace settings. |
| `referrer_user_id` | number | no |  | Referrer Team Member ID. ID of the team member who referred this client. |
| `tax_id` | string | no |  | Tax ID. |
| `balance` | number | no |  | Balance. Starting account balance for the client. |
| `optin` | string | no |  | Opt-in. Opt-in status for the client, e.g. "Yes" or "No". |
| `stripe_id` | string | no |  | Stripe Customer ID. The Stripe customer ID to link to this client. |
| `created_at` | string | no |  | Created Date. Override the creation date. Format: 2021-09-01T00:00:00+00:00. Leave empty to use the current date. |
| `address_line_1` | string | no |  | Address Line 1. |
| `address_city` | string | no |  | City. |
| `address_state` | string | no |  | State / Province. |
| `address_postcode` | string | no |  | Postcode / ZIP. |
| `address_country` | string | no |  | Country. Two-letter country code, e.g. US or GB. |
| `custom_fields` | object | no |  | Custom Fields. Additional custom fields as key-value pairs. |

### `update_client`

**Update Client.** Updates an existing Wayfront client identified by its user ID, applying a partial patch — only the fields you supply (contact details, status, balance, assigned employees, address, custom fields) are changed; omitted fields are left untouched. Use to edit a known client; requires a valid user ID. Idempotent: re-sending the same patch leaves the client in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | Client. Select a client from your Wayfront workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | no |  | Email. |
| `name_f` | string | no |  | First Name. |
| `name_l` | string | no |  | Last Name. |
| `company` | string | no |  | Company. |
| `phone` | string | no |  | Phone. |
| `note` | string | no |  | Note. |
| `status_id` | number | no |  | Status ID. Numeric ID of the client status. Find status IDs in your Wayfront workspace settings. |
| `referrer_user_id` | number | no |  | Referrer Team Member ID. ID of the team member who referred this client. |
| `employee_id` | string | no |  | Employee IDs. Comma-separated IDs of employees to assign to this client (e.g. 1,2,3). |
| `tax_id` | string | no |  | Tax ID. |
| `balance` | number | no |  | Balance. Updated account balance for the client. |
| `optin` | string | no |  | Opt-in. Opt-in status, e.g. "Yes" or "No". |
| `stripe_id` | string | no |  | Stripe Customer ID. The Stripe customer ID linked to this client. |
| `created_at` | string | no |  | Created Date. Override the creation date. Format: 2021-09-01T00:00:00+00:00. |
| `address_line_1` | string | no |  | Address Line 1. |
| `address_city` | string | no |  | City. |
| `address_state` | string | no |  | State / Province. |
| `address_postcode` | string | no |  | Postcode / ZIP. |
| `address_country` | string | no |  | Country. Two-letter country code, e.g. US or GB. |
| `custom_fields` | object | no |  | Custom Fields. Additional custom fields as key-value pairs. |

### `create_activity`

**Create Activity.** Logs a new activity (note) against a specific Wayfront client, optionally scheduling it for a future date and assigning it to a team member. With no scheduled date it is logged immediately. Use to record an interaction or queue a follow-up; requires the client user ID and content. Not idempotent: each call appends a separate activity. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | Client. Select a client from your Wayfront workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | Content. The activity note or description (max 10,000 characters). |
| `scheduled_at` | string | no |  | Scheduled At. Schedule this activity for a future date and time. Format: 2026-04-15T14:00:00Z (ISO 8601). Leave empty to log it immediately. |
| `assigned_to` | string | no |  | Assigned To. Select a team member to assign this activity to. A value the product loads from the provider, such as an id; write the value itself. |

### `update_activity`

**Update Activity.** Updates an existing activity on a Wayfront client, changing its content and optionally its assignee or scheduled date (rescheduling only applies to already-scheduled activities). Use to edit a known activity; requires both the client user ID and the activity ID. Idempotent: re-sending the same values yields the same activity state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | Client. Select a client from your Wayfront workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `activity_id` | string | yes |  | Activity. Select an activity for the chosen client. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | Content. The updated activity note or description (max 10,000 characters). |
| `scheduled_at` | string | no |  | Scheduled At. Reschedule the activity. Format: 2026-05-01T14:00:00Z (ISO 8601). Only applies to already-scheduled activities. |
| `assigned_to` | string | no |  | Assigned To. Select a team member to assign this activity to. A value the product loads from the provider, such as an id; write the value itself. |

### `complete_activity`

**Complete Activity.** Marks a specific scheduled activity on a Wayfront client as complete. Use to close out a follow-up or task once done; requires both the client user ID and the activity ID. Idempotent: completing an already-completed activity leaves it complete with no additional effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | Client. Select a client from your Wayfront workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `activity_id` | string | yes |  | Activity. Select an activity for the chosen client. A value the product loads from the provider, such as an id; write the value itself. |

### `create_ticket`

**Create Ticket.** Creates a new support ticket for a specific Wayfront client, with a subject and optional note, status, assigned employees, tags, linked order reference, and metadata. Use to open a support case from an inbound request. Requires the client user ID and a subject. Not idempotent: each call opens a separate ticket. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | Client. Select a client from your Wayfront workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `subject` | string | yes |  | Subject. The subject line of the ticket. |
| `note` | string | no |  | Note. An internal note to attach to the ticket. |
| `status` | number | no |  | Status ID. Numeric ID of the ticket status. Find status IDs in your Wayfront workspace settings. |
| `employees` | string | no |  | Assigned Employee IDs. Comma-separated IDs of employees to assign to this ticket (e.g. 1,2,3). |
| `tags` | string | no |  | Tags. Comma-separated list of tags to apply to the ticket (e.g. billing,urgent). |
| `order` | string | no |  | Order Reference. The order number or reference to link to this ticket. |
| `metadata` | string | no |  | Metadata. Comma-separated metadata values to attach to the ticket. |

### `list_tickets`

**List Tickets.** Retrieves a page of support tickets from the Wayfront workspace, newest first, with configurable page size and page number for pagination. Use to browse, scan, or look up recent tickets. Read-only and idempotent: it returns current data without modifying anything. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. Maximum number of tickets to return per page. Defaults to 20. |
| `page` | number | no | `1` | Page. Page number to retrieve when results span multiple pages. Starts at 1. |

### `update_ticket`

**Update Ticket.** Updates an existing Wayfront ticket identified by its reference, applying a partial patch to subject, status, assigned employees, tags, linked order, or metadata; omitted fields are left untouched, but supplying tags replaces all existing tags. Use to change a ticket’s state or routing. Idempotent: re-sending the same patch yields the same ticket state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_ref` | string | yes |  | Ticket. Select a ticket from your Wayfront workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `subject` | string | no |  | Subject. Updated subject line for the ticket. |
| `status` | number | no |  | Status ID. Numeric ID of the ticket status. Find status IDs in your Wayfront workspace settings. |
| `employees` | string | no |  | Assigned Employee IDs. Comma-separated IDs of employees to assign to this ticket (e.g. 1,2,3). |
| `tags` | string | no |  | Tags. Comma-separated list of tags (e.g. billing,urgent). Replaces all existing tags. |
| `order` | string | no |  | Order Reference. The order number or reference to link to this ticket. |
| `metadata` | string | no |  | Metadata. Comma-separated metadata values to attach to the ticket. |

### `list_orders`

**List Orders.** Retrieves a page of orders from the Wayfront workspace, newest first, with configurable page size and page number for pagination. Use to browse, scan, or look up recent orders. Read-only and idempotent: it returns current data without modifying anything. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. Maximum number of orders to return per page. Defaults to 20. |
| `page` | number | no | `1` | Page. Page number to retrieve when results span multiple pages. Starts at 1. |

### `create_order`

**Create Order.** Creates a new order for a specific Wayfront client. Identify the service either by a free-text service title or by an existing service ID (supply one of the two); optionally set status, order number, due/start/completion/created dates, assigned employees, tags, linked orders, and metadata. Requires the client user ID. Not idempotent: each call creates a separate order. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | Client. Select a client from your Wayfront workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `service` | string | no |  | Service / Order Title. The name of the service or title for this order (e.g. "Instagram Followers"). Required if no Service ID is provided. |
| `service_id` | number | no |  | Service ID. ID of an existing service in Wayfront to attach to this order. Required if no Service / Order Title is provided. |
| `note` | string | no |  | Note. An internal note to attach to the order. |
| `status` | number | no |  | Status ID. Numeric ID of the order status. Find status IDs in your Wayfront workspace settings. |
| `number` | string | no |  | Order Number. Custom order reference number (e.g. B1C2D3E4F5). Leave empty to auto-generate. |
| `date_due` | string | no |  | Due Date. Due date for the order. Format: 2021-09-01T00:00:00+00:00 (ISO 8601). |
| `date_started` | string | no |  | Start Date. Date the order was started. Format: 2021-09-01T00:00:00+00:00 (ISO 8601). |
| `date_completed` | string | no |  | Completion Date. Date the order was completed. Format: 2021-09-01T00:00:00+00:00 (ISO 8601). |
| `created_at` | string | no |  | Created Date. Override the creation date. Format: 2021-09-01T00:00:00+00:00. Leave empty to use now. |
| `employees` | string | no |  | Assigned Employee IDs. Comma-separated IDs of employees to assign to this order (e.g. 1,2,3). |
| `tags` | string | no |  | Tags. Comma-separated list of tags to apply to the order (e.g. vip,rush). |
| `linked_orders` | string | no |  | Linked Order Numbers. Comma-separated order numbers to link to this order (e.g. B1C2D3,E4F5G6). |
| `metadata` | string | no |  | Metadata. Comma-separated metadata values to attach to the order. |

### `update_order`

**Update Order.** Updates an existing Wayfront order identified by its reference, applying a partial patch to note, status, service, dates, assigned employees, tags, linked orders, form data, or metadata; omitted fields are left untouched, but supplying tags or linked orders replaces the existing set. Use to advance or amend a known order. Idempotent: re-sending the same patch yields the same order state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_ref` | string | yes |  | Order. Select an order from your Wayfront workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `note` | string | no |  | Note. Updated internal note for the order. |
| `status` | number | no |  | Status ID. Numeric ID of the order status. Find status IDs in your Wayfront workspace settings. |
| `service_id` | number | no |  | Service ID. ID of the service to attach to this order. |
| `date_due` | string | no |  | Due Date. Updated due date. Format: 2021-09-01T00:00:00+00:00 (ISO 8601). |
| `date_started` | string | no |  | Start Date. Updated start date. Format: 2021-09-01T00:00:00+00:00 (ISO 8601). |
| `date_completed` | string | no |  | Completion Date. Updated completion date. Format: 2021-09-01T00:00:00+00:00 (ISO 8601). |
| `created_at` | string | no |  | Created Date. Override the creation date. Format: 2021-09-01T00:00:00+00:00 (ISO 8601). |
| `employees` | string | no |  | Assigned Employee IDs. Comma-separated IDs of employees to assign to this order (e.g. 1,2,3). |
| `tags` | string | no |  | Tags. Comma-separated list of tags (e.g. vip,rush). Replaces all existing tags. |
| `linked_orders` | string | no |  | Linked Order Numbers. Comma-separated order numbers to link (e.g. B1C2D3,E4F5G6). Replaces existing links. |
| `form_data` | string | no |  | Form Data. Comma-separated form data values to attach to the order. |
| `metadata` | string | no |  | Metadata. Comma-separated metadata values to attach to the order. |

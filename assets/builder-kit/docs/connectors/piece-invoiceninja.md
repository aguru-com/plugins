# Invoice Ninja

Free open-source invoicing tool

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-invoiceninja'
  version: '0.4.1'
```

Categories: ACCOUNTING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Please check https://invoice-ninja.readthedocs.io/en/latest/api_tokens.html#create-token
> to see how to get the API token

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes |  | Base URL. Enter the base URL. |
| `access_token` | string | yes |  | API Token. Enter the API token. |

## Actions

### `create_task`

**Create Task.** Creates a billable task in Invoice Ninja, identified by a task/ticket number that must be unique (not previously used). Optionally associates the task with a client and project and applies a custom hourly rate. Not idempotent — each call creates a new task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `number` | string | yes |  | Task or Ticket Number (alphanumeric). A unique task or ticket number that has not been used before in Invoice Ninja. |
| `client_id` | string | no |  | Client ID (alphanumeric). Client ID from Invoice Ninja (optional) |
| `project_id` | string | no |  | Project ID (alphanumeric). Project ID from Invoice Ninja (optional) |
| `description` | string | yes |  | Description of task. Description of task to be billed. |
| `rate` | number | no |  | Custom hourly rate. Custom hourly rate (optional) otherwise default used. |

### `exists_task`

**Check Task Existence.** Checks whether a task with the given task/ticket number already exists in Invoice Ninja, returning a truthy/falsy result. Use to guard against duplicate task creation before calling Create Task. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `number` | string | yes |  | Task or Ticket Number (alphanumeric). A task or ticket number to check. |

### `getclient_task`

**Get Client Details from e-mail.** Looks up a client in Invoice Ninja by email address and returns a trimmed set of their details (id, name, balances, address, contacts). Use to resolve a client id or fetch client info from an email; returns a falsy result when no matching client is found. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Client e-mail address. A valid e-mail address to get client details for. |

### `getinvoices_task`

**Get Invoices.** Retrieves invoices from Invoice Ninja filtered by status (unpaid, paid, overdue, or all) and optionally by client id, capped by a max-results limit. Use to list or report on invoices; omitting the client id returns invoices across all clients. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceStatus` | string | yes |  | Invoice Status. Select the invoice status for filtering. One of `"unpaid"`, `"paid"`, `"overdue"`, `"all"`. |
| `clientID` | string | no |  | Client ID. Filter by Client ID, default is all clients. |
| `numberOfResults` | number | no |  | Max Results. Maximum number of results to return. 9999 is default. |

### `getreport_task`

**Get Report.** Fetches report data from Invoice Ninja for the selected report type (currently invoices) over a fixed last-7-days range, capped by a max-results limit. Use to pull aggregated invoice report data. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reportType` | string | yes |  | Report Type. Select the report type. One of `"invoices"`. |
| `clientID` | string | no |  | Client ID. Filter by Client ID, default is all clients. |
| `numberOfResults` | number | no |  | Max Results. Maximum number of results to return. 9999 is default. |

### `create_invoice`

**Create Invoice.** Creates an invoice for a client in Invoice Ninja from a JSON array of line items (each referencing an existing product_key, whose price and tax are looked up), with optional discount, notes, and due date. Can optionally email the invoice to the client and/or mark it as sent on creation. Requires a valid client id and at least one line item with a known product key. Not idempotent — each call creates a new invoice. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `client_id` | string | yes |  | Client ID (alphanumeric). Client ID from Invoice Ninja. |
| `purchase_order_no` | string | no |  | Purchase Order Number (alphanumeric). Descriptive text or arbitrary number (optional) |
| `discount` | string | yes | `"0"` | Apply discount. Enter a number for the whole invoice discount. |
| `discount_type` | string | yes | `true` | Type of discount. Select either amount or percentage for invoice discount. Applies to line items and invoice. One of `true`, `false`. |
| `public_notes` | string | no |  | Public notes for invoice. Text that may be visible in the client portal (optional) |
| `private_notes` | string | no |  | Private notes for invoice. Text not visible for clients (optional) |
| `order_items_json` | string | yes |  | Order Items JSON string. e.g., [{ "quantity":1,"product_key":"product key", "discount": "0" }]. |
| `send_email` | boolean | yes | `false` | Send invoice to the client by InvoiceNinja e-mail?. Should we send the invoice to the client on creation? |
| `mark_sent` | boolean | yes | `false` | Mark the invoice as sent?. Makes the invoice active otherwise remains pending. |
| `due_date` | ISO date-time string | no |  | Invoice due date. e.g., 2024-01-20. |

### `create_client`

**Create Client.** Creates a new client record in Invoice Ninja with a primary contact, requiring business name, contact email, address line 1, and city; other contact and address fields are optional. Not idempotent — each call creates a new client even if one with the same details already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `client_first_name` | string | no |  | Client First Name (alphanumeric). The contact first name for this client (optional) |
| `client_last_name` | string | no |  | Client Last Name (alphanumeric). The contact last name for this client (optional) |
| `client_phone` | string | no |  | Client Contact No (alphanumeric). The contact number for this client (optional) |
| `client_email` | string | yes |  | Client e-mail (alphanumeric). The contact email for this client (compulsory) |
| `client_send_email` | boolean | yes | `false` | Send invoices to the client. Should we send invoices to the client by e-mail? |
| `client_business_name` | string | yes |  | Business Name (alphanumeric). Name of this business or natural person (compulsory) |
| `client_tax_no` | string | no |  | Client Tax Number (alphanumeric). Leave blank if not a business (optional) |
| `client_private_notes` | string | no |  | Private notes for client. Text not visible for clients (optional) |
| `client_address1` | string | yes |  | Client address 1 (alphanumeric). Usually street name and number (compulsory) |
| `client_address2` | string | no |  | Client address 2 (alphanumeric). Additional address details (optional) |
| `client_city` | string | yes |  | Client City/Town (alphanumeric). City or Town name (compulsory) |
| `client_state` | string | no |  | Client State (alphanumeric). State or county or similar (optional) |
| `client_postcode` | string | no |  | Client Postcode (alphanumeric). Postal code (optional) |

### `create_recurring_invoice`

**Create Recurring Invoice.** Creates a recurring invoice for a client in Invoice Ninja from a JSON array of line items (each referencing an existing product_key), set to bill on a chosen frequency for a given number of cycles starting from a next-send date. The frequency can be picked from the preset list or overridden with a numeric frequency id. Requires a valid client id, at least one line item with a known product key, and a next-send date. Not idempotent — each call creates a new recurring invoice. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `client_id` | string | yes |  | Client ID (alphanumeric). Client ID from Invoice Ninja. |
| `purchase_order_no` | string | no |  | Purchase Order Number (alphanumeric). Descriptive text or arbitrary number (optional) |
| `discount` | string | yes | `"0"` | Apply discount. Enter a number for the whole invoice discount. |
| `discount_type` | string | yes | `true` | Type of discount. Select either amount or percentage for invoice discount. Applies to line items and invoice. One of `true`, `false`. |
| `public_notes` | string | no |  | Public notes for invoice. Text that may be visible in the client portal (optional) |
| `private_notes` | string | no |  | Private notes for invoice. Text not visible for clients (optional) |
| `order_items_json` | string | yes |  | Order Items JSON string. e.g., [{ "quantity":1,"product_key":"product key", "discount": "0" }]. |
| `frequency` | string | yes | `5` | Frequency of billing. Choose one. One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`. |
| `nocycles` | number | no |  | No of billing cycles. Enter a number. How many times should this bill be generated. |
| `auto_frequency` | number | no |  | Override Frequency using Frequency ID (optional). Enter a number. 1-12 - corresponds to dropdown above [Daily being 1, Weekly 2 etc..]! |
| `due_date` | ISO date-time string | yes |  | Invoice next send date. e.g., 2024-01-20. |
| `last_date` | ISO date-time string | no |  | Invoice last sent date. e.g., 2024-01-20. |

### `action_recurring_invoice`

**Perform Action on Recurring Invoice.** Performs a lifecycle action on an existing recurring invoice in Invoice Ninja, identified by its id. The action prop selects which operation to apply: start, stop, send_now, restore, archive, or delete. Requires a valid recurring invoice id. Treat as not idempotent — actions such as send_now and delete have per-call side effects. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recurring_id` | string | yes |  | Recurring Invoice ID (alphanumeric). Recurring Invoice ID from Invoice Ninja. |
| `actionRecurring` | string | yes | `1` | Action to perform. Choose one. One of `"start"`, `"stop"`, `"send_now"`, `"restore"`, `"archive"`, `"delete"`. |

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

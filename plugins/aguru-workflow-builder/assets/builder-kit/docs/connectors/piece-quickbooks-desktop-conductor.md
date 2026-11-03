# QuickBooks Desktop (via Conductor)

Sync invoices, bills, customers, vendors and payments with QuickBooks Desktop through the Conductor API bridge.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-quickbooks-desktop-conductor'
  version: '0.1.2'
```

Categories: ACCOUNTING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> This piece connects to QuickBooks Desktop through [Conductor](https://conductor.is) — Activepieces
> cannot talk to QuickBooks Desktop directly, since it has no cloud API of its own.
>
> 1. In your Conductor dashboard, go to **Settings → API Keys** and copy your **Secret Key**.
> 2. Under **End-Users**, select (or create) the end-user connected to this QuickBooks Desktop
> company file and copy their **End-User ID** (starts with `end_usr_`).
> 3. The end-user must have already completed Conductor's auth flow and installed the QuickBooks
> Web Connector — Conductor's dashboard shows the connection as "Connected" once QuickBooks
> Desktop is reachable. If it shows "Not connected," fix that in Conductor before connecting here.
> 4. **Top setup mistake — read before finishing step 3:** when QuickBooks Desktop first asks to
> authorize the Web Connector, **choose the option that keeps access even when QuickBooks Desktop
> isn't running** (not "ask every time"). Picking the wrong option doesn't error — it just makes
> every sync silently do nothing until someone is sitting at the QuickBooks Desktop machine to
> approve it, which usually isn't noticed until a customer asks why nothing has synced in days.
> See this piece's README for the full walkthrough.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `secretKey` | string | yes |  | Conductor Secret Key. From your Conductor dashboard, Settings → API Keys. |
| `endUserId` | string | yes |  | Conductor End-User ID. The end-user ID for this QuickBooks Desktop company file (starts with end_usr_). |

## Actions

### `upsert_customer`

**Upsert Customer.** Create or update a QuickBooks Desktop customer, matched by exact name. Use this before creating an invoice or receiving a payment for a customer that may not exist yet — it looks the customer up first and updates it instead of creating a duplicate. Safe to retry: calling it again with the same name always resolves to the same customer record. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Customer Name. The exact name of the customer as it should appear in QuickBooks Desktop (max 41 characters). Used to find an existing customer — if one already exists with this exact name, it is updated instead of duplicated. |
| `companyName` | string | no |  | Company Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `note` | string | no |  | Note. |
| `billingLine1` | string | no |  | Address Line 1. |
| `billingCity` | string | no |  | City. |
| `billingState` | string | no |  | State. |
| `billingPostalCode` | string | no |  | Postal Code. |
| `billingCountry` | string | no |  | Country. |

Output fields:

- `id`: Customer ID
- `name`: Name
- `full_name`: Full Name
- `company_name`: Company Name
- `is_active`: Is Active (boolean)
- `email`: Email (email)
- `phone`: Phone
- `note`: Note
- `billing_address_line1`: Billing Address Line 1
- `billing_address_city`: Billing Address City
- `billing_address_state`: Billing Address State
- `billing_address_postal_code`: Billing Address Postal Code
- `billing_address_country`: Billing Address Country
- `revision_number`: Revision Number
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `upsert_vendor`

**Upsert Vendor.** Create or update a QuickBooks Desktop vendor, matched by exact name. Use this before creating a bill or recording a bill payment for a vendor that may not exist yet — it looks the vendor up first and updates it instead of creating a duplicate. Safe to retry: calling it again with the same name always resolves to the same vendor record. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Vendor Name. The exact name of the vendor as it should appear in QuickBooks Desktop (max 41 characters, unique across all vendors). Used to find an existing vendor — if one already exists with this exact name, it is updated instead of duplicated. |
| `companyName` | string | no |  | Company Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `note` | string | no |  | Note. |
| `billingLine1` | string | no |  | Address Line 1. |
| `billingCity` | string | no |  | City. |
| `billingState` | string | no |  | State. |
| `billingPostalCode` | string | no |  | Postal Code. |
| `billingCountry` | string | no |  | Country. |

Output fields:

- `id`: Vendor ID
- `name`: Name
- `company_name`: Company Name
- `is_active`: Is Active (boolean)
- `email`: Email (email)
- `phone`: Phone
- `note`: Note
- `billing_address_line1`: Billing Address Line 1
- `billing_address_city`: Billing Address City
- `billing_address_state`: Billing Address State
- `billing_address_postal_code`: Billing Address Postal Code
- `billing_address_country`: Billing Address Country
- `revision_number`: Revision Number
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `create_invoice`

**Create Invoice.** Create a new invoice for an existing QuickBooks Desktop customer, with one or more line items. Each line item references a Service or Non-Inventory item by its exact name. Not idempotent — each call creates a new invoice, so retries duplicate it; use Query Transactions first to check whether an equivalent invoice already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | yes |  | Customer. The customer this invoice is for. Only customers that already exist in QuickBooks Desktop appear here — use Upsert Customer first if the customer might not exist yet. A value the product loads from the provider, such as an id; write the value itself. |
| `transactionDate` | ISO date-time string | yes |  | Invoice Date. |
| `dueDate` | ISO date-time string | no |  | Due Date. When left blank, QuickBooks Desktop derives it from the customer's default payment terms. |
| `refNumber` | string | no |  | Invoice Number. Optional reference number (max 11 characters). QuickBooks Desktop does not auto-generate one if left blank. |
| `memo` | string | no |  | Memo. Internal note. Appears in reports, not on the invoice sent to the customer. |
| `lineItems` | array | yes |  | Line Items. At least one line item is required. Each item: { `itemName`, `description`?, `quantity`?, `rate`?, `amount`? }. |

Output fields:

- `id`: Invoice ID
- `transaction_date`: Invoice Date (date)
- `due_date`: Due Date (date)
- `ref_number`: Invoice Number
- `memo`: Memo
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `subtotal_amount`: Subtotal (currency)
- `sales_tax_amount`: Sales Tax (currency)
- `total_amount`: Total (currency)
- `balance_remaining`: Balance Remaining (currency)
- `is_paid`: Is Paid (boolean)
- `line_count`: Line Item Count (number)
- `revision_number`: Revision Number
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `create_bill`

**Create Bill.** Record a new bill from an existing vendor, expensed against one or more Chart of Accounts entries (fuel, maintenance, insurance, etc.) — this is the accounts-payable expense-line shape, not an item/inventory purchase. Not idempotent — each call creates a new bill, so retries duplicate it; use Query Transactions first to check whether an equivalent bill already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vendorId` | string | yes |  | Vendor. The vendor this bill is from. Only vendors that already exist in QuickBooks Desktop appear here — use Upsert Vendor first if the vendor might not exist yet. A value the product loads from the provider, such as an id; write the value itself. |
| `transactionDate` | ISO date-time string | yes |  | Bill Date. |
| `dueDate` | ISO date-time string | no |  | Due Date. When left blank, QuickBooks Desktop derives it from the vendor's default payment terms. |
| `refNumber` | string | no |  | Bill Number. Optional reference number (max 20 characters). QuickBooks Desktop does not auto-generate one if left blank. |
| `memo` | string | no |  | Memo. Internal note. Appears in the A/P register and reports, not sent to the vendor. |
| `expenseLines` | array | yes |  | Expense Lines. At least one expense line is required. Each line expenses this bill against one Chart of Accounts entry (e.g. fuel, maintenance, insurance) — not a product/service item. Each item: { `accountName`, `amount`, `memo`? }. |

Output fields:

- `id`: Bill ID
- `transaction_date`: Bill Date (date)
- `due_date`: Due Date (date)
- `ref_number`: Bill Number
- `memo`: Memo
- `vendor_id`: Vendor ID
- `vendor_name`: Vendor Name
- `amount_due`: Amount Due (currency)
- `balance_remaining`: Balance Remaining (currency)
- `is_paid`: Is Paid (boolean)
- `line_count`: Expense Line Count (number)
- `revision_number`: Revision Number
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `record_payment`

**Record Payment.** Record a payment in QuickBooks Desktop — either a customer payment against open invoices (Accounts Receivable) or a vendor bill payment by check or credit card (Accounts Payable), chosen via Payment Type. Not idempotent — each call records a new payment, so retries duplicate it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paymentType` | string | yes |  | Payment Type. One of `"customer_payment"`, `"bill_payment_check"`, `"bill_payment_credit_card"`. |
| `transactionDate` | ISO date-time string | yes |  | Payment Date. |
| `amount` | string | yes |  | Amount. Total payment amount, e.g. "500.00". |
| `refNumber` | string | no |  | Reference / Check Number. Optional. Max 20 characters for a customer payment, max 11 for a bill payment (it's the check number for a check payment). |
| `memo` | string | no |  | Memo. |
| `customerId` | string | no |  | Customer. Required for Customer Payment only. The customer who made this payment. A value the product loads from the provider, such as an id; write the value itself. |
| `applyToSpecificInvoice` | boolean | no | `false` | Apply to a specific invoice. Customer Payment only. When off, QuickBooks Desktop automatically applies the payment to an exact-amount match or the oldest open invoice. |
| `invoiceId` | string | no |  | Invoice. The specific open invoice this payment applies to. A value the product loads from the provider, such as an id; write the value itself. |
| `vendorId` | string | no |  | Vendor. Required for both Bill Payment types. The vendor being paid. A value the product loads from the provider, such as an id; write the value itself. |
| `billId` | string | no |  | Bill. Required for both Bill Payment types. QuickBooks Desktop has no auto-apply for bill payments, so the specific open bill must be picked. A value the product loads from the provider, such as an id; write the value itself. |
| `bankAccountId` | string | no |  | Bank Account. Required for Bill Payment — Check only. The account funds are drawn from. A value the product loads from the provider, such as an id; write the value itself. |
| `creditCardAccountId` | string | no |  | Credit Card Account. Required for Bill Payment — Credit Card only. The account charged. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Payment ID
- `payment_type`: Payment Type
- `transaction_date`: Payment Date (date)
- `ref_number`: Reference / Check Number
- `memo`: Memo
- `amount`: Amount (currency)
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `vendor_id`: Vendor ID
- `vendor_name`: Vendor Name
- `revision_number`: Revision Number
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `query_transactions`

**Query Transactions.** Search QuickBooks Desktop transactions across all types (invoice, bill, receive_payment, bill_payment_check, bill_payment_credit_card, and more) with date-range and payment-status filters. Only common fields are returned (id, type, date, amount, entity, account) — use the type-specific action or Custom API Call for full line-item detail. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transactionDateFrom` | ISO date-time string | no |  | Transaction Date From. |
| `transactionDateTo` | ISO date-time string | no |  | Transaction Date To. |
| `transactionTypes` | array | no |  | Transaction Types. Leave empty to search all types. One of `"invoice"`, `"bill"`, `"receive_payment"`, `"bill_payment_check"`, `"bill_payment_credit_card"`, `"purchase_order"`, `"credit_memo"`, `"sales_receipt"`, `"estimate"`, `"check"`, `"transfer"`. |
| `paymentStatus` | string | no |  | Payment Status. Leave empty to search regardless of payment status. One of `"open"`, `"closed"`, `"either"`. |
| `entityId` | string | no |  | Entity ID. Optional. A customer, vendor, or employee id to filter by — typically chained from another step's output (e.g. Upsert Customer's Customer ID), not typed by hand. |
| `limit` | number | no | `150` | Max Results. Results per page (1–150). |
| `cursor` | string | no |  | Page Cursor. Optional. Pass the Next Cursor from a previous call's output to fetch the next page. |

Output fields:

- `transactions`: Transactions
- `transactions[].transaction_type`: Type
- `transactions[].transaction_id`: Transaction ID
- `transactions[].transaction_date`: Date (date)
- `transactions[].ref_number`: Reference Number
- `transactions[].amount`: Amount (currency)
- `transactions[].memo`: Memo
- `transactions[].entity_id`: Entity ID
- `transactions[].entity_name`: Entity Name
- `transactions[].account_id`: Account ID
- `transactions[].account_name`: Account Name
- `transactions[].created_at`: Created At (datetime)
- `transactions[].updated_at`: Updated At (datetime)
- `count`: Result Count (number)
- `next_cursor`: Next Cursor
- `has_more`: Has More (boolean)

### `list_items`

**List Items.** Search QuickBooks Desktop's Service and Non-Inventory items by name — the two item types Create Invoice's line items accept. Use this to find the exact item name before calling Create Invoice, instead of guessing; typing an item name Create Invoice can't find fails with a clear error naming the bad value, but this avoids that round-trip. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `nameContains` | string | no |  | Name Contains. Search by a substring of the item name. Leave empty to list all items. |
| `status` | string | no | `"active"` | Status. One of `"active"`, `"inactive"`, `"all"`. |
| `limit` | number | no | `150` | Max Results (per item type). Results per item type — up to twice this many total, since Service and Non-Inventory items are searched together (1–150). |

Output fields:

- `items`: Items
- `items[].id`: Item ID
- `items[].name`: Name
- `items[].full_name`: Full Name
- `items[].item_type`: Item Type
- `items[].is_active`: Is Active (boolean)
- `count`: Result Count (number)
- `has_more`: Has More (boolean)

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

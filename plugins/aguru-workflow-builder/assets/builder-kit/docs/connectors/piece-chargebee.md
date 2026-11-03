# Chargebee

Subscription billing and revenue operations platform for managing customers and subscriptions.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chargebee'
  version: '0.1.2'
```

Categories: ACCOUNTING, PAYMENT_PROCESSING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Chargebee

> Go to Settings > Configure Chargebee > API Keys and Webhooks > API Keys tab. Click Add an API Key, select Full-Access Key, and copy the generated key.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site` | string | yes |  | Site. Your Chargebee site subdomain. For acme.chargebee.com, enter acme. |
| `api_key` | string | yes |  | API Key. Go to Settings > Configure Chargebee > API Keys and Webhooks > API Keys tab. Click Add an API Key, select Full-Access Key, and copy the generated key. |

## Actions

### `create_subscription`

**Create Subscription.** Create a new item-price-based subscription for an existing Chargebee customer. Use when an agent needs to start billing a known customer on a specific item price. Requires a valid customer ID and item price ID; optional fields control trial, billing cycles, coupons, and auto-collection. Not idempotent — each call creates a separate subscription. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. |
| `item_price_id` | string | yes |  | Item Price ID. The Chargebee item price ID to subscribe the customer to. |
| `quantity` | number | no |  | Quantity. |
| `auto_collection` | string | no |  | Auto Collection. Whether to automatically charge the customer. Defaults to the customer setting. One of `"on"`, `"off"`. |
| `billing_cycles` | number | no |  | Billing Cycles. Number of billing cycles before the subscription ends. Defaults to the item price setting. |
| `trial_end` | number | no |  | Trial End (Unix Seconds). UTC timestamp in seconds when the trial period ends. Set to 0 for no trial. |
| `start_date` | number | no |  | Start Date (Unix Seconds). UTC timestamp in seconds when the subscription starts. Defaults to now. Provide a past value to backdate. |
| `coupon_ids` | string | no |  | Coupon ID. A coupon ID or code to apply to this subscription. |
| `po_number` | string | no |  | PO Number. Purchase order number to associate with this subscription. |
| `invoice_notes` | string | no |  | Invoice Notes. Customer-facing note added to all invoices for this subscription. |
| `payment_source_id` | string | no |  | Payment Source ID. ID of the payment source to attach to this subscription. |
| `invoice_immediately` | boolean | no |  | Invoice Immediately. Invoice any charges raised at creation time immediately rather than adding them to unbilled charges. |
| `net_term_days` | number | no |  | Net Term Days. Number of days within which invoices for this subscription must be paid (Net D). Must match a value configured in Chargebee. |
| `meta_data` | object | no |  | Metadata. Key-value pairs to store extra information on the subscription. |

### `cancel_subscription`

**Cancel Subscription.** Cancel a Chargebee subscription by ID, with control over timing (immediately, end of term, or a specific date) and, for subscriptions with a contract term, a separate contract-term cancel option plus optional termination fee. Use when an agent needs to end a subscription rather than pause or change it. Requires the subscription ID; the timing and credit/refund handling depend on whether the subscription has a contract term. Repeating the call does not re-cancel an already-cancelled subscription, but it is treated as non-idempotent since options like decommission are irreversible. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscription_id` | string | yes |  | Subscription ID. |
| `cancel_option` | string | no |  | Cancel Option. When to cancel the subscription. Not applicable when the subscription has a contract term — use Contract Term Cancel Option instead. One of `"immediately"`, `"end_of_term"`, `"specific_date"`, `"end_of_billing_term"`. |
| `cancel_at` | number | no |  | Cancel At (Unix Seconds). UTC timestamp in seconds for when to cancel. Required when Cancel Option is "Specific Date". |
| `cancel_reason_code` | string | no |  | Cancel Reason Code. Reason code from Settings > Configure Chargebee > Reason Codes > Subscriptions > Subscription Cancellation. Case-sensitive. |
| `credit_option_for_current_term_charges` | string | no |  | Credit Option for Current Term Charges. How to handle credits for current term charges when canceling immediately. One of `"none"`, `"prorate"`, `"full"`. |
| `unbilled_charges_option` | string | no |  | Unbilled Charges Option. How to handle unbilled charges when canceling immediately. One of `"invoice"`, `"delete"`. |
| `contract_term_cancel_option` | string | no |  | Contract Term Cancel Option. Required when the subscription has a contract term. Determines when to cancel the subscription and contract term. One of `"terminate_immediately"`, `"end_of_contract_term"`, `"specific_date"`, `"end_of_subscription_billing_term"`. |
| `account_receivables_handling` | string | no |  | Account Receivables Handling. How to handle past due invoices when canceling immediately. One of `"no_action"`, `"schedule_payment_collection"`, `"write_off"`. |
| `refundable_credits_handling` | string | no |  | Refundable Credits Handling. How to handle refundable credits when canceling immediately. One of `"no_action"`, `"schedule_refund"`. |
| `invoice_date` | number | no |  | Invoice Date (Unix Seconds). Document date displayed on the invoice PDF. Defaults to the current date. Provide to backdate the invoice. |
| `decommissioned` | boolean | no |  | Decommission. When true, all subscription operations will be disabled except deletion. This is irreversible. |
| `termination_fee_item_price_id` | string | no |  | Termination Fee Item Price ID. The unique ID of the charge item price representing the termination fee. Used only when the subscription has a contract term. |
| `termination_fee_quantity` | number | no |  | Termination Fee Quantity. Quantity for the termination fee. Applicable only for quantity-based item prices. |
| `termination_fee_unit_price` | number | no |  | Termination Fee Unit Price (cents). The termination fee in cents. For quantity-based items, this is the fee per unit. |
| `termination_fee_service_period_days` | number | no |  | Termination Fee Service Period (Days). Service period of the termination fee in days, starting from the current date. |

### `create_customer`

**Create Customer.** Create a new customer record in Chargebee, optionally with contact details, billing address, tax/VAT settings, and metadata. Use when an agent needs to register a customer before subscribing or invoicing them. All fields are optional, including the customer ID (auto-generated if omitted). Not idempotent — each call creates a new customer unless a custom ID is supplied that already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | no |  | Customer ID. Optional custom customer identifier. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `company` | string | no |  | Company. |
| `phone` | string | no |  | Phone. |
| `locale` | string | no |  | Locale. For example: en-US, fr-CA. |
| `preferred_currency_code` | string | no |  | Preferred Currency Code. ISO 4217 currency code (e.g. USD, EUR). Requires Multi-currency pricing to be enabled. |
| `auto_collection` | string | no |  | Auto Collection. Whether invoices should be automatically charged when possible. One of `"on"`, `"off"`. |
| `net_term_days` | number | no |  | Net Term Days. Number of days within which the customer must pay their invoices. |
| `allow_direct_debit` | boolean | no |  | Allow Direct Debit. Whether the customer can pay via Direct Debit. |
| `vat_number` | string | no |  | VAT Number. The VAT/tax registration number for the customer. |
| `taxability` | string | no |  | Taxability. Specifies if the customer is liable for tax. One of `"taxable"`, `"exempt"`. |
| `invoice_notes` | string | no |  | Invoice Notes. A customer-facing note added to all invoices for this customer. |
| `meta_data` | object | no |  | Metadata. Key-value pairs to store extra information on the customer. |
| `billing_address_first_name` | string | no |  | Billing Address: First Name. |
| `billing_address_last_name` | string | no |  | Billing Address: Last Name. |
| `billing_address_line1` | string | no |  | Billing Address: Line 1. |
| `billing_address_line2` | string | no |  | Billing Address: Line 2. |
| `billing_address_city` | string | no |  | Billing Address: City. |
| `billing_address_state` | string | no |  | Billing Address: State. |
| `billing_address_zip` | string | no |  | Billing Address: ZIP / Postal Code. |
| `billing_address_country` | string | no |  | Billing Address: Country. Two-letter ISO 3166-1 alpha-2 country code (e.g. US, GB). |

### `get_customer`

**Get Customer.** Fetch a single Chargebee customer record by its customer ID. Use when an agent needs to read a known customer's details before acting on them. Requires the exact customer ID; does not search by email or other fields. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. |

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

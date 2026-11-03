# Stripe

Online payment processing for internet businesses

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-stripe'
  version: '0.8.1'
```

Categories: COMMERCE, PAYMENT_PROCESSING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Secret API Key

> Paste a secret key (sk_live_ or sk_test_) or a restricted key (rk_).
>
> 1. In the Stripe Dashboard, open Developers > API keys.
> 2. Copy the Secret key, or create a restricted key.
> 3. A restricted key needs read access to Customers to connect, and access to everything your flows use.
> 4. Paste it here.

## Actions

### `create_customer`

**Create Customer.** Creates a new customer record in Stripe from an email and name, with optional contact and address fields. Use when onboarding a new payer before charging, invoicing, or subscribing them. Not idempotent: each call creates a distinct customer even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. Internal note, not shown to the customer. |
| `phone` | string | no |  | Phone. |
| `line1` | string | no |  | Address Line 1. |
| `postal_code` | string | no |  | Postal Code. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State. |
| `country` | string | no |  | Country. Two-letter country code, e.g. US or GB. |

Output fields:

- `id`: Customer ID
- `email`: Email (email)
- `name`: Name
- `description`: Description
- `phone`: Phone
- `address`: Address
- `address.line1`: Line 1
- `address.line2`: Line 2
- `address.city`: City
- `address.state`: State
- `address.postal_code`: Postal Code
- `address.country`: Country
- `balance`: Balance (number)
- `currency`: Currency
- `delinquent`: Delinquent (boolean)
- `invoice_prefix`: Invoice Prefix
- `tax_exempt`: Tax Exempt
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `create_invoice`

**Create Invoice.** Creates a draft invoice in Stripe for an existing customer in the given currency. Use to bill a customer for pending invoice items. Requires a valid Stripe customer ID; not idempotent, as each call creates a separate invoice. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. Starts with cus_. Find it on the customer's page in Stripe. |
| `currency` | string | yes |  | Currency. Three-letter currency code, e.g. usd or eur. |
| `description` | string | no |  | Description. Memo shown to the customer on the invoice. |

Output fields:

- `id`: Invoice ID
- `number`: Number
- `status`: Status
- `currency`: Currency
- `customer`: Customer
- `customer_email`: Customer Email (email)
- `customer_name`: Customer Name
- `customer_phone`: Customer Phone
- `description`: Description
- `collection_method`: Collection Method
- `billing_reason`: Billing Reason
- `amount_due`: Amount Due (number)
- `amount_paid`: Amount Paid (number)
- `amount_remaining`: Amount Remaining (number)
- `subtotal`: Subtotal (number)
- `total`: Total (number)
- `attempt_count`: Attempt Count (number)
- `attempted`: Attempted (boolean)
- `auto_advance`: Auto Advance (boolean)
- `due_date`: Due Date (datetime)
- `created`: Created (datetime)
- `period_start`: Period Start (datetime)
- `period_end`: Period End (datetime)
- `effective_at`: Effective At (datetime)
- `hosted_invoice_url`: Hosted Invoice URL (url)
- `invoice_pdf`: Invoice PDF (url)
- `receipt_number`: Receipt Number
- `starting_balance`: Starting Balance (number)
- `ending_balance`: Ending Balance (number)
- `status_transitions`: Status Transitions
- `status_transitions.finalized_at`: Finalized At (datetime)
- `status_transitions.paid_at`: Paid At (datetime)
- `status_transitions.marked_uncollectible_at`: Marked Uncollectible At (datetime)
- `status_transitions.voided_at`: Voided At (datetime)
- `lines`: Lines
- `lines.data`: Data
- `lines.data[].id`: Line ID
- `lines.data[].description`: Description
- `lines.data[].amount`: Amount (number)
- `lines.data[].currency`: Currency
- `lines.data[].quantity`: Quantity (number)
- `lines.data[].subtotal`: Subtotal (number)
- `lines.data[].invoice`: Invoice
- `lines.data[].period`: Period
- `lines.data[].period.start`: Start (datetime)
- `lines.data[].period.end`: End (datetime)
- `lines.data[].discountable`: Discountable (boolean)
- `lines.data[].livemode`: Live Mode (boolean)
- `lines.data[].metadata`: Metadata (an object whose keys vary)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `search_customer`

**Find Customer by Email.** Looks up Stripe customers matching a given email address. Use to find an existing customer record before creating, updating, or charging one, to avoid duplicates. Read-only and idempotent; matches on the exact email. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |

Output fields:

- `data`: Results
- `data[].id`: Customer ID
- `data[].email`: Email (email)
- `data[].name`: Name
- `data[].description`: Description
- `data[].phone`: Phone
- `data[].address`: Address
- `data[].address.line1`: Line 1
- `data[].address.line2`: Line 2
- `data[].address.city`: City
- `data[].address.state`: State
- `data[].address.postal_code`: Postal Code
- `data[].address.country`: Country
- `data[].balance`: Balance (number)
- `data[].currency`: Currency
- `data[].delinquent`: Delinquent (boolean)
- `data[].invoice_prefix`: Invoice Prefix
- `data[].tax_exempt`: Tax Exempt
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `next_page`: Next Page
- `url`: URL

### `search_subscriptions`

**Search Subscriptions.** Lists and filters Stripe subscriptions by price ID, status, customer ID, and creation date range, optionally expanding full customer details for each. Use to find subscriptions matching criteria or to audit a customer's subscriptions; supports paging through all results. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `price_ids` | string | no |  | Price IDs. Comma-separated price IDs. |
| `status` | string | no |  | Status. Without a status, canceled subscriptions are left out. One of `"active"`, `"past_due"`, `"unpaid"`, `"canceled"`, `"incomplete"`, `"incomplete_expired"`, `"trialing"`, `"paused"`, `"all"`. |
| `customer_id` | string | no |  | Customer ID. Starts with cus_. Find it on the customer's page in Stripe. |
| `created_after` | ISO date-time string | no |  | Created After. Created on or after this date and time. |
| `created_before` | ISO date-time string | no |  | Created Before. Created on or before this date and time. |
| `limit` | number | no | `100` | Max Results. The most subscriptions to return. |
| `fetch_all` | boolean | no | `false` | Fetch All Results. Return every match, up to 5,000. Ignores Max Results. |
| `include_customer_details` | boolean | no | `true` | Include Customer Details. Add each customer's full record to the results. |

Output fields:

- `success`: Success (boolean)
- `count`: Count (number)
- `total_fetched`: Total Fetched (number)
- `requests_made`: Requests Made (number)
- `has_more_available`: Has More Available (boolean)
- `subscriptions`: Subscriptions
- `subscriptions[].id`: Subscription ID
- `subscriptions[].status`: Status
- `subscriptions[].customer`: Customer
- `subscriptions[].currency`: Currency
- `subscriptions[].description`: Description
- `subscriptions[].collection_method`: Collection Method
- `subscriptions[].latest_invoice`: Latest Invoice
- `subscriptions[].default_payment_method`: Default Payment Method
- `subscriptions[].quantity`: Quantity (number)
- `subscriptions[].start_date`: Start Date (datetime)
- `subscriptions[].billing_cycle_anchor`: Billing Cycle Anchor (datetime)
- `subscriptions[].cancel_at`: Cancel At (datetime)
- `subscriptions[].canceled_at`: Canceled At (datetime)
- `subscriptions[].cancel_at_period_end`: Cancel At Period End (boolean)
- `subscriptions[].ended_at`: Ended At (datetime)
- `subscriptions[].trial_start`: Trial Start (datetime)
- `subscriptions[].trial_end`: Trial End (datetime)
- `subscriptions[].items`: Items
- `subscriptions[].items.data`: Data
- `subscriptions[].items.data[].id`: Subscription Item ID
- `subscriptions[].items.data[].quantity`: Quantity (number)
- `subscriptions[].items.data[].subscription`: Subscription
- `subscriptions[].items.data[].current_period_start`: Current Period Start (datetime)
- `subscriptions[].items.data[].current_period_end`: Current Period End (datetime)
- `subscriptions[].items.data[].price`: Price
- `subscriptions[].items.data[].price.id`: Price ID
- `subscriptions[].items.data[].price.active`: Active (boolean)
- `subscriptions[].items.data[].price.currency`: Currency
- `subscriptions[].items.data[].price.product`: Product
- `subscriptions[].items.data[].price.nickname`: Nickname
- `subscriptions[].items.data[].price.unit_amount`: Unit Amount (number)
- `subscriptions[].items.data[].price.unit_amount_decimal`: Unit Amount Decimal
- `subscriptions[].items.data[].price.type`: Type
- `subscriptions[].items.data[].price.billing_scheme`: Billing Scheme
- `subscriptions[].items.data[].price.tax_behavior`: Tax Behavior
- `subscriptions[].items.data[].price.lookup_key`: Lookup Key
- `subscriptions[].items.data[].price.recurring`: Recurring
- `subscriptions[].items.data[].price.recurring.interval`: Interval
- `subscriptions[].items.data[].price.recurring.interval_count`: Interval Count (number)
- `subscriptions[].items.data[].price.recurring.trial_period_days`: Trial Period Days (number)
- `subscriptions[].items.data[].price.recurring.usage_type`: Usage Type
- `subscriptions[].items.data[].price.created`: Created (datetime)
- `subscriptions[].items.data[].price.livemode`: Live Mode (boolean)
- `subscriptions[].items.data[].price.metadata`: Metadata (an object whose keys vary)
- `subscriptions[].items.data[].created`: Created (datetime)
- `subscriptions[].items.data[].metadata`: Metadata (an object whose keys vary)
- `subscriptions[].created`: Created (datetime)
- `subscriptions[].livemode`: Live Mode (boolean)
- `subscriptions[].metadata`: Metadata (an object whose keys vary)

### `retrieve_customer`

**Retrieve Customer.** Fetches the full details of a single Stripe customer by its customer ID (e.g., cus_...). Use when you already have the exact ID and need the current record; for lookup by email use Search Customer instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Customer ID. Starts with cus_. Find it on the customer's page in Stripe. |

Output fields:

- `id`: Customer ID
- `email`: Email (email)
- `name`: Name
- `description`: Description
- `phone`: Phone
- `address`: Address
- `address.line1`: Line 1
- `address.line2`: Line 2
- `address.city`: City
- `address.state`: State
- `address.postal_code`: Postal Code
- `address.country`: Country
- `balance`: Balance (number)
- `currency`: Currency
- `delinquent`: Delinquent (boolean)
- `invoice_prefix`: Invoice Prefix
- `tax_exempt`: Tax Exempt
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `update_customer`

**Update Customer.** Updates fields on an existing Stripe customer (email, name, description, phone, address); only the fields you provide are changed. Use to correct or enrich a customer record identified by its customer ID. Idempotent in effect: repeating the same update yields the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | yes |  | Customer. Only the fields you fill in below are changed. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | no |  | Email. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. Internal note, not shown to the customer. |
| `phone` | string | no |  | Phone. |
| `line1` | string | no |  | Address Line 1. |
| `postal_code` | string | no |  | Postal Code. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State. |
| `country` | string | no |  | Country. Two-letter country code, e.g. US or GB. |

Output fields:

- `id`: Customer ID
- `email`: Email (email)
- `name`: Name
- `description`: Description
- `phone`: Phone
- `address`: Address
- `address.line1`: Line 1
- `address.line2`: Line 2
- `address.city`: City
- `address.state`: State
- `address.postal_code`: Postal Code
- `address.country`: Country
- `balance`: Balance (number)
- `currency`: Currency
- `delinquent`: Delinquent (boolean)
- `invoice_prefix`: Invoice Prefix
- `tax_exempt`: Tax Exempt
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `create_payment_intent`

**Create Payment.** Creates a Stripe PaymentIntent for a given amount and currency to begin collecting a payment, optionally tied to a customer. Can run in two modes: leave it unconfirmed to obtain a client secret for client-side completion, or set confirm to immediately charge a supplied payment method (which then also requires a return URL). Not idempotent: each call starts a separate payment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `amount` | number | yes |  | Amount. In the currency's main unit, e.g. 10.50 for $10.50. |
| `currency` | string | yes |  | Currency. One of `"usd"`, `"eur"`, `"gbp"`, `"aud"`, `"cad"`, `"chf"`, `"cny"`, `"jpy"`, `"inr"`, `"sgd"`. |
| `customer` | string | no |  | Customer. Links the payment to this customer's record. A value the product loads from the provider, such as an id; write the value itself. |
| `payment_method` | string | no |  | Payment Method ID. Starts with pm_. Needed when Charge Now is on. |
| `confirm` | boolean | no | `false` | Charge Now. Charge the payment method right away. |
| `return_url` | string | no |  | Return URL. Where the customer returns after any bank check. |
| `description` | string | no |  | Description. Shown with the payment in your Stripe Dashboard. |
| `receipt_email` | string | no |  | Receipt Email. Send the receipt here instead of the customer's email. |

Output fields:

- `id`: Payment Intent ID
- `amount`: Amount (number)
- `amount_received`: Amount Received (number)
- `amount_capturable`: Amount Capturable (number)
- `currency`: Currency
- `status`: Status
- `customer`: Customer
- `description`: Description
- `payment_method`: Payment Method
- `latest_charge`: Latest Charge
- `capture_method`: Capture Method
- `confirmation_method`: Confirmation Method
- `client_secret`: Client Secret
- `receipt_email`: Receipt Email (email)
- `setup_future_usage`: Setup Future Usage
- `cancellation_reason`: Cancellation Reason
- `canceled_at`: Canceled At (datetime)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `create_product`

**Create Product.** Creates a new product object in Stripe (the catalog item that prices attach to), with optional description, images, URL, and metadata. Use before creating a price or when adding a sellable item. Not idempotent: each call creates a distinct product. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Product Name. Shown to customers at checkout and on invoices. |
| `description` | string | no |  | Description. Shown to customers under the product name. |
| `active` | boolean | no | `true` | Active. Turn off to hide the product from new purchases. |
| `images` | array | no |  | Image URLs. Up to 8 public image links. |
| `url` | string | no |  | Product URL. A public page about this product. |
| `metadata` | JSON | no |  | Metadata. Extra key/value data to store on the product. |

Output fields:

- `id`: Product ID
- `name`: Name
- `description`: Description
- `active`: Active (boolean)
- `default_price`: Default Price
- `images`: Images
- `url`: URL (url)
- `unit_label`: Unit Label
- `type`: Type
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `create_price`

**Create Price.** Creates a price for an existing Stripe product, in either one-time or recurring mode depending on the selected billing interval. Use after creating a product to define what to charge before building a subscription or payment link. Requires the product ID; not idempotent, as each call creates a new price. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product` | string | yes |  | Product. A value the product loads from the provider, such as an id; write the value itself. |
| `unit_amount` | number | yes |  | Amount. In the currency's main unit, e.g. 10.50 for $10.50. |
| `currency` | string | yes |  | Currency. One of `"usd"`, `"eur"`, `"gbp"`, `"aud"`, `"cad"`, `"chf"`, `"cny"`, `"jpy"`, `"inr"`, `"sgd"`. |
| `recurring_interval` | string | yes | `"one_time"` | Billing Interval. Pick One-Time for a single payment. One of `"one_time"`, `"day"`, `"week"`, `"month"`, `"year"`. |
| `recurring_interval_count` | number | no |  | Interval Count. Bill every N intervals, e.g. 3 with Monthly bills quarterly. |

Output fields:

- `id`: Price ID
- `active`: Active (boolean)
- `currency`: Currency
- `product`: Product
- `nickname`: Nickname
- `unit_amount`: Unit Amount (number)
- `unit_amount_decimal`: Unit Amount Decimal
- `type`: Type
- `billing_scheme`: Billing Scheme
- `tax_behavior`: Tax Behavior
- `lookup_key`: Lookup Key
- `recurring`: Recurring
- `recurring.interval`: Interval
- `recurring.interval_count`: Interval Count (number)
- `recurring.trial_period_days`: Trial Period Days (number)
- `recurring.usage_type`: Usage Type
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `create_subscription`

**Create Subscription.** Starts a recurring subscription for an existing customer against one or more price IDs, with optional collection method, trial period, and default payment method. Use to enroll a customer in recurring billing. Requires a customer ID and at least one price; not idempotent, as each call creates a separate subscription. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | yes |  | Customer. A value the product loads from the provider, such as an id; write the value itself. |
| `items` | array | yes |  | Items. The prices to subscribe the customer to. Each item: { `price`, `quantity`? }. |
| `collection_method` | string | no |  | Collection Method. One of `"charge_automatically"`, `"send_invoice"`. |
| `days_until_due` | number | no |  | Days Until Due. Days the customer has to pay. Needed for Send Invoice. |
| `trial_period_days` | number | no |  | Trial Days. Free days before the first bill. |
| `default_payment_method` | string | no |  | Default Payment Method ID. Starts with pm_. Empty uses the customer's default. |
| `metadata` | JSON | no |  | Metadata. Extra key/value data to store on the subscription. |

Output fields:

- `id`: Subscription ID
- `status`: Status
- `customer`: Customer
- `currency`: Currency
- `description`: Description
- `collection_method`: Collection Method
- `latest_invoice`: Latest Invoice
- `default_payment_method`: Default Payment Method
- `quantity`: Quantity (number)
- `start_date`: Start Date (datetime)
- `billing_cycle_anchor`: Billing Cycle Anchor (datetime)
- `cancel_at`: Cancel At (datetime)
- `canceled_at`: Canceled At (datetime)
- `cancel_at_period_end`: Cancel At Period End (boolean)
- `ended_at`: Ended At (datetime)
- `trial_start`: Trial Start (datetime)
- `trial_end`: Trial End (datetime)
- `items`: Items
- `items.data`: Data
- `items.data[].id`: Subscription Item ID
- `items.data[].quantity`: Quantity (number)
- `items.data[].subscription`: Subscription
- `items.data[].current_period_start`: Current Period Start (datetime)
- `items.data[].current_period_end`: Current Period End (datetime)
- `items.data[].price`: Price
- `items.data[].price.id`: Price ID
- `items.data[].price.active`: Active (boolean)
- `items.data[].price.currency`: Currency
- `items.data[].price.product`: Product
- `items.data[].price.nickname`: Nickname
- `items.data[].price.unit_amount`: Unit Amount (number)
- `items.data[].price.unit_amount_decimal`: Unit Amount Decimal
- `items.data[].price.type`: Type
- `items.data[].price.billing_scheme`: Billing Scheme
- `items.data[].price.tax_behavior`: Tax Behavior
- `items.data[].price.lookup_key`: Lookup Key
- `items.data[].price.recurring`: Recurring
- `items.data[].price.recurring.interval`: Interval
- `items.data[].price.recurring.interval_count`: Interval Count (number)
- `items.data[].price.recurring.trial_period_days`: Trial Period Days (number)
- `items.data[].price.recurring.usage_type`: Usage Type
- `items.data[].price.created`: Created (datetime)
- `items.data[].price.livemode`: Live Mode (boolean)
- `items.data[].price.metadata`: Metadata (an object whose keys vary)
- `items.data[].created`: Created (datetime)
- `items.data[].metadata`: Metadata (an object whose keys vary)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `cancel_subscription`

**Cancel Subscription.** Cancels an existing Stripe subscription by its ID, in one of two modes: immediately, or scheduled to end at the close of the current billing period. Use to stop recurring billing for a customer. Effectively idempotent: re-running on an already-canceled subscription leaves it canceled. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscription` | string | yes |  | Subscription. A value the product loads from the provider, such as an id; write the value itself. |
| `cancel_at_period_end` | boolean | no | `false` | Cancel at Period End. On: it stays active until the period ends. Off: it ends now. |

Output fields:

- `id`: Subscription ID
- `status`: Status
- `customer`: Customer
- `currency`: Currency
- `description`: Description
- `collection_method`: Collection Method
- `latest_invoice`: Latest Invoice
- `default_payment_method`: Default Payment Method
- `quantity`: Quantity (number)
- `start_date`: Start Date (datetime)
- `billing_cycle_anchor`: Billing Cycle Anchor (datetime)
- `cancel_at`: Cancel At (datetime)
- `canceled_at`: Canceled At (datetime)
- `cancel_at_period_end`: Cancel At Period End (boolean)
- `ended_at`: Ended At (datetime)
- `trial_start`: Trial Start (datetime)
- `trial_end`: Trial End (datetime)
- `items`: Items
- `items.data`: Data
- `items.data[].id`: Subscription Item ID
- `items.data[].quantity`: Quantity (number)
- `items.data[].subscription`: Subscription
- `items.data[].current_period_start`: Current Period Start (datetime)
- `items.data[].current_period_end`: Current Period End (datetime)
- `items.data[].price`: Price
- `items.data[].price.id`: Price ID
- `items.data[].price.active`: Active (boolean)
- `items.data[].price.currency`: Currency
- `items.data[].price.product`: Product
- `items.data[].price.nickname`: Nickname
- `items.data[].price.unit_amount`: Unit Amount (number)
- `items.data[].price.unit_amount_decimal`: Unit Amount Decimal
- `items.data[].price.type`: Type
- `items.data[].price.billing_scheme`: Billing Scheme
- `items.data[].price.tax_behavior`: Tax Behavior
- `items.data[].price.lookup_key`: Lookup Key
- `items.data[].price.recurring`: Recurring
- `items.data[].price.recurring.interval`: Interval
- `items.data[].price.recurring.interval_count`: Interval Count (number)
- `items.data[].price.recurring.trial_period_days`: Trial Period Days (number)
- `items.data[].price.recurring.usage_type`: Usage Type
- `items.data[].price.created`: Created (datetime)
- `items.data[].price.livemode`: Live Mode (boolean)
- `items.data[].price.metadata`: Metadata (an object whose keys vary)
- `items.data[].created`: Created (datetime)
- `items.data[].metadata`: Metadata (an object whose keys vary)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `retrieve_invoice`

**Retrieve Invoice.** Fetches the full details of a single Stripe invoice by its invoice ID (e.g., in_...). Use when you have the exact invoice ID and need its current status, amounts, or hosted/PDF links. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice_id` | string | yes |  | Invoice. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Invoice ID
- `number`: Number
- `status`: Status
- `currency`: Currency
- `customer`: Customer
- `customer_email`: Customer Email (email)
- `customer_name`: Customer Name
- `customer_phone`: Customer Phone
- `description`: Description
- `collection_method`: Collection Method
- `billing_reason`: Billing Reason
- `amount_due`: Amount Due (number)
- `amount_paid`: Amount Paid (number)
- `amount_remaining`: Amount Remaining (number)
- `subtotal`: Subtotal (number)
- `total`: Total (number)
- `attempt_count`: Attempt Count (number)
- `attempted`: Attempted (boolean)
- `auto_advance`: Auto Advance (boolean)
- `due_date`: Due Date (datetime)
- `created`: Created (datetime)
- `period_start`: Period Start (datetime)
- `period_end`: Period End (datetime)
- `effective_at`: Effective At (datetime)
- `hosted_invoice_url`: Hosted Invoice URL (url)
- `invoice_pdf`: Invoice PDF (url)
- `receipt_number`: Receipt Number
- `starting_balance`: Starting Balance (number)
- `ending_balance`: Ending Balance (number)
- `status_transitions`: Status Transitions
- `status_transitions.finalized_at`: Finalized At (datetime)
- `status_transitions.paid_at`: Paid At (datetime)
- `status_transitions.marked_uncollectible_at`: Marked Uncollectible At (datetime)
- `status_transitions.voided_at`: Voided At (datetime)
- `lines`: Lines
- `lines.data`: Data
- `lines.data[].id`: Line ID
- `lines.data[].description`: Description
- `lines.data[].amount`: Amount (number)
- `lines.data[].currency`: Currency
- `lines.data[].quantity`: Quantity (number)
- `lines.data[].subtotal`: Subtotal (number)
- `lines.data[].invoice`: Invoice
- `lines.data[].period`: Period
- `lines.data[].period.start`: Start (datetime)
- `lines.data[].period.end`: End (datetime)
- `lines.data[].discountable`: Discountable (boolean)
- `lines.data[].livemode`: Live Mode (boolean)
- `lines.data[].metadata`: Metadata (an object whose keys vary)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `retrieve_payout`

**Retrieve Payout.** Fetches the full details of a single Stripe payout (funds sent to your bank account) by its payout ID (e.g., po_...). Use to check a payout's status, amount, or arrival date. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payout_id` | string | yes |  | Payout. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Payout ID
- `amount`: Amount (number)
- `currency`: Currency
- `status`: Status
- `type`: Type
- `method`: Method
- `automatic`: Automatic (boolean)
- `arrival_date`: Arrival Date (datetime)
- `balance_transaction`: Balance Transaction
- `destination`: Destination
- `description`: Description
- `statement_descriptor`: Statement Descriptor
- `source_type`: Source Type
- `failure_code`: Failure Code
- `failure_message`: Failure Message
- `reconciliation_status`: Reconciliation Status
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `create_refund`

**Create Refund.** Issues a refund against a payment identified by its PaymentIntent ID; refunds the full amount by default, or a partial amount if one is given, with an optional reason. Use to return funds to a customer for a captured payment. Not idempotent: each call creates a new refund and moves money again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_intent` | string | yes |  | Payment. Only successful payments are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `amount` | number | no |  | Amount. Amount to refund, e.g. 12.99. Empty refunds the full payment. |
| `reason` | string | no |  | Reason. One of `"duplicate"`, `"fraudulent"`, `"requested_by_customer"`. |
| `metadata` | JSON | no |  | Metadata. Extra key/value data to store on the refund. |

Output fields:

- `id`: Refund ID
- `amount`: Amount (number)
- `currency`: Currency
- `status`: Status
- `charge`: Charge
- `payment_intent`: Payment Intent
- `payment_method`: Payment Method
- `balance_transaction`: Balance Transaction
- `reason`: Reason
- `receipt_number`: Receipt Number
- `created`: Created (datetime)
- `metadata`: Metadata (an object whose keys vary)

### `create_payment_link`

**Create Payment Link.** Creates a reusable, Stripe-hosted payment link for the given line items (price IDs and quantities), with optional after-completion redirect, promotion codes, and billing-address collection. Use to generate a shareable checkout URL without building a custom flow. Not idempotent: each call creates a new payment link. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `line_items` | array | yes |  | Line Items. The prices and quantities buyers pay for. Each item: { `price`, `quantity` }. |
| `after_completion_type` | string | no |  | After Payment. One of `"hosted_confirmation"`, `"redirect"`. |
| `after_completion_redirect_url` | string | no |  | Redirect URL. Used only with Redirect to URL. |
| `allow_promotion_codes` | boolean | no |  | Allow Promotion Codes. Let buyers enter a promotion code at checkout. |
| `billing_address_collection` | string | no |  | Billing Address. Auto asks only when Stripe needs it. One of `"auto"`, `"required"`. |
| `metadata` | JSON | no |  | Metadata. Extra key/value data to store on the link. |

Output fields:

- `id`: Payment Link ID
- `active`: Active (boolean)
- `url`: URL (url)
- `currency`: Currency
- `allow_promotion_codes`: Allow Promotion Codes (boolean)
- `billing_address_collection`: Billing Address Collection
- `customer_creation`: Customer Creation
- `payment_method_collection`: Payment Method Collection
- `submit_type`: Submit Type
- `application_fee_amount`: Application Fee Amount (number)
- `application_fee_percent`: Application Fee Percent (number)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `deactivate_payment_link`

**Deactivate Payment Link.** Deactivates an existing Stripe payment link by its ID so it can no longer accept payments. Use to retire a shared checkout URL. Idempotent in effect: re-running on an already-inactive link leaves it inactive. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_link_id` | string | yes |  | Payment Link. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Payment Link ID
- `active`: Active (boolean)
- `url`: URL (url)
- `currency`: Currency
- `allow_promotion_codes`: Allow Promotion Codes (boolean)
- `billing_address_collection`: Billing Address Collection
- `customer_creation`: Customer Creation
- `payment_method_collection`: Payment Method Collection
- `submit_type`: Submit Type
- `application_fee_amount`: Application Fee Amount (number)
- `application_fee_percent`: Application Fee Percent (number)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `retrieve_payment_intent`

**Retrieve Payment.** Fetches the full details of a single payment by its PaymentIntent ID (e.g., pi_...). Use when you have the exact ID and need the payment's current status, amount, or associated charge. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_intent_id` | string | yes |  | Payment. Only successful payments are listed. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Payment Intent ID
- `amount`: Amount (number)
- `amount_received`: Amount Received (number)
- `amount_capturable`: Amount Capturable (number)
- `currency`: Currency
- `status`: Status
- `customer`: Customer
- `description`: Description
- `payment_method`: Payment Method
- `latest_charge`: Latest Charge
- `capture_method`: Capture Method
- `confirmation_method`: Confirmation Method
- `client_secret`: Client Secret
- `receipt_email`: Receipt Email (email)
- `setup_future_usage`: Setup Future Usage
- `cancellation_reason`: Cancellation Reason
- `canceled_at`: Canceled At (datetime)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `find_invoice`

**Find Invoice.** Fetches a single Stripe invoice by its unique invoice ID (e.g., in_...). Use when you already have the exact invoice ID and need its current details. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice_id` | string | yes |  | Invoice. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Invoice ID
- `number`: Number
- `status`: Status
- `currency`: Currency
- `customer`: Customer
- `customer_email`: Customer Email (email)
- `customer_name`: Customer Name
- `customer_phone`: Customer Phone
- `description`: Description
- `collection_method`: Collection Method
- `billing_reason`: Billing Reason
- `amount_due`: Amount Due (number)
- `amount_paid`: Amount Paid (number)
- `amount_remaining`: Amount Remaining (number)
- `subtotal`: Subtotal (number)
- `total`: Total (number)
- `attempt_count`: Attempt Count (number)
- `attempted`: Attempted (boolean)
- `auto_advance`: Auto Advance (boolean)
- `due_date`: Due Date (datetime)
- `created`: Created (datetime)
- `period_start`: Period Start (datetime)
- `period_end`: Period End (datetime)
- `effective_at`: Effective At (datetime)
- `hosted_invoice_url`: Hosted Invoice URL (url)
- `invoice_pdf`: Invoice PDF (url)
- `receipt_number`: Receipt Number
- `starting_balance`: Starting Balance (number)
- `ending_balance`: Ending Balance (number)
- `status_transitions`: Status Transitions
- `status_transitions.finalized_at`: Finalized At (datetime)
- `status_transitions.paid_at`: Paid At (datetime)
- `status_transitions.marked_uncollectible_at`: Marked Uncollectible At (datetime)
- `status_transitions.voided_at`: Voided At (datetime)
- `lines`: Lines
- `lines.data`: Data
- `lines.data[].id`: Line ID
- `lines.data[].description`: Description
- `lines.data[].amount`: Amount (number)
- `lines.data[].currency`: Currency
- `lines.data[].quantity`: Quantity (number)
- `lines.data[].subtotal`: Subtotal (number)
- `lines.data[].invoice`: Invoice
- `lines.data[].period`: Period
- `lines.data[].period.start`: Start (datetime)
- `lines.data[].period.end`: End (datetime)
- `lines.data[].discountable`: Discountable (boolean)
- `lines.data[].livemode`: Live Mode (boolean)
- `lines.data[].metadata`: Metadata (an object whose keys vary)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `create_customer_ai`

**Create Customer (Agent).** Creates a new Stripe customer from an email and name, with optional phone and address. Use when onboarding a new payer before charging, invoicing, or subscribing them; to avoid duplicates, look the customer up first with Search Customers. Not idempotent: each call creates a distinct customer even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `phone` | string | no |  | Phone. |
| `line1` | string | no |  | Address Line 1. |
| `postal_code` | string | no |  | Postal Code. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State. |
| `country` | string | no |  | Country. |

Output fields:

- `id`: Customer ID
- `email`: Email (email)
- `name`: Name
- `description`: Description
- `phone`: Phone
- `address`: Address
- `address.line1`: Line 1
- `address.line2`: Line 2
- `address.city`: City
- `address.state`: State
- `address.postal_code`: Postal Code
- `address.country`: Country
- `balance`: Balance (number)
- `currency`: Currency
- `delinquent`: Delinquent (boolean)
- `invoice_prefix`: Invoice Prefix
- `tax_exempt`: Tax Exempt
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `get_customer`

**Get Customer (Agent).** Fetches the full details of a single Stripe customer by its customer ID (e.g., cus_...). Use when you already have the exact ID; to look a customer up by email use Search Customers, or List Customers to page through them. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Customer ID. The Stripe customer ID (e.g., cus_...). Obtain it from Search Customers or List Customers. |

Output fields:

- `id`: Customer ID
- `email`: Email (email)
- `name`: Name
- `description`: Description
- `phone`: Phone
- `address`: Address
- `address.line1`: Line 1
- `address.line2`: Line 2
- `address.city`: City
- `address.state`: State
- `address.postal_code`: Postal Code
- `address.country`: Country
- `balance`: Balance (number)
- `currency`: Currency
- `delinquent`: Delinquent (boolean)
- `invoice_prefix`: Invoice Prefix
- `tax_exempt`: Tax Exempt
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `update_customer_ai`

**Update Customer (Agent).** Updates fields on an existing Stripe customer (email, name, description, phone, address); only the fields you supply change. Use to correct or enrich a customer record identified by its customer ID. Idempotent: repeating the same update yields the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | yes |  | Customer ID. The Stripe customer ID (e.g., cus_...) to update. Obtain it from Search Customers or List Customers. |
| `email` | string | no |  | Email. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `phone` | string | no |  | Phone. |
| `line1` | string | no |  | Address Line 1. |
| `postal_code` | string | no |  | Postal Code. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State. |
| `country` | string | no |  | Country. |

Output fields:

- `id`: Customer ID
- `email`: Email (email)
- `name`: Name
- `description`: Description
- `phone`: Phone
- `address`: Address
- `address.line1`: Line 1
- `address.line2`: Line 2
- `address.city`: City
- `address.state`: State
- `address.postal_code`: Postal Code
- `address.country`: Country
- `balance`: Balance (number)
- `currency`: Currency
- `delinquent`: Delinquent (boolean)
- `invoice_prefix`: Invoice Prefix
- `tax_exempt`: Tax Exempt
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `search_customers`

**Search Customers (Agent).** Searches Stripe customers using the Stripe Search Query Language. Pass an email to match customers with that exact email, or supply a raw query for richer filters (e.g. "name:'Jane' OR metadata['plan']:'gold'"). Use to find an existing customer before creating/charging one; use Get Customer when you already have the cus_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. Match customers with this exact email. Ignored if a raw Query is provided. |
| `query` | string | no |  | Query. A raw Stripe search query (e.g. email:'a@b.com', name:'Jane'). Overrides the Email field when set. |

Output fields:

- `data`: Results
- `data[].id`: Customer ID
- `data[].email`: Email (email)
- `data[].name`: Name
- `data[].description`: Description
- `data[].phone`: Phone
- `data[].address`: Address
- `data[].address.line1`: Line 1
- `data[].address.line2`: Line 2
- `data[].address.city`: City
- `data[].address.state`: State
- `data[].address.postal_code`: Postal Code
- `data[].address.country`: Country
- `data[].balance`: Balance (number)
- `data[].currency`: Currency
- `data[].delinquent`: Delinquent (boolean)
- `data[].invoice_prefix`: Invoice Prefix
- `data[].tax_exempt`: Tax Exempt
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `next_page`: Next Page
- `url`: URL

### `create_payment_intent_ai`

**Create Payment Intent (Agent).** Creates a Stripe PaymentIntent for an amount and currency, optionally tied to a customer. Leave it unconfirmed to get a client secret for client-side completion, or set confirm with a payment method ID (and return URL) to charge immediately. Amount is a decimal in the major currency unit (e.g. 10.50 for $10.50). Not idempotent: each call starts a separate payment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `amount` | number | yes |  | Amount. The amount to charge, as a decimal in the major currency unit (e.g., 10.50 for $10.50). |
| `currency` | string | yes |  | Currency. The three-letter ISO currency code (e.g., usd, eur, gbp). |
| `customer` | string | no |  | Customer ID. The Stripe customer ID (e.g., cus_...) to associate. Obtain it from Search Customers or List Customers. |
| `payment_method` | string | no |  | Payment Method ID. The PaymentMethod ID to attach (e.g., pm_...). Required to confirm the payment immediately. |
| `confirm` | boolean | no | `false` | Confirm Payment Immediately. If true, Stripe attempts to charge the provided payment method. Requires a Payment Method ID and a Return URL. |
| `capture_method` | string | no |  | Capture Method. When to capture funds. 'automatic' (default) captures immediately on confirmation; 'manual' authorizes only — funds are held and you capture later with Capture Payment Intent (auth-and-capture). One of `"automatic"`, `"manual"`. |
| `return_url` | string | no |  | Return URL. URL to redirect the customer back to after authenticating the payment. Required when confirming. |
| `description` | string | no |  | Description. |
| `receipt_email` | string | no |  | Receipt Email. Email to send a receipt to. Overrides the customer's email. |

Output fields:

- `id`: Payment Intent ID
- `amount`: Amount (number)
- `amount_received`: Amount Received (number)
- `amount_capturable`: Amount Capturable (number)
- `currency`: Currency
- `status`: Status
- `customer`: Customer
- `description`: Description
- `payment_method`: Payment Method
- `latest_charge`: Latest Charge
- `capture_method`: Capture Method
- `confirmation_method`: Confirmation Method
- `client_secret`: Client Secret
- `receipt_email`: Receipt Email (email)
- `setup_future_usage`: Setup Future Usage
- `cancellation_reason`: Cancellation Reason
- `canceled_at`: Canceled At (datetime)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `get_payment_intent`

**Get Payment Intent (Agent).** Fetches a single payment by its PaymentIntent ID (e.g., pi_...). Use when you have the exact ID and need the current status, amount, or associated charge; use List/Search Payment Intents to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_intent_id` | string | yes |  | Payment Intent ID. The PaymentIntent ID (e.g., pi_...). Obtain it from List Payment Intents or Search Payment Intents. |

Output fields:

- `id`: Payment Intent ID
- `amount`: Amount (number)
- `amount_received`: Amount Received (number)
- `amount_capturable`: Amount Capturable (number)
- `currency`: Currency
- `status`: Status
- `customer`: Customer
- `description`: Description
- `payment_method`: Payment Method
- `latest_charge`: Latest Charge
- `capture_method`: Capture Method
- `confirmation_method`: Confirmation Method
- `client_secret`: Client Secret
- `receipt_email`: Receipt Email (email)
- `setup_future_usage`: Setup Future Usage
- `cancellation_reason`: Cancellation Reason
- `canceled_at`: Canceled At (datetime)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `create_refund_ai`

**Create Refund (Agent).** Issues a refund against a payment identified by its PaymentIntent ID; refunds the full amount by default, or a partial amount if given, with an optional reason. Amount is in the major currency unit as a decimal. Use to return funds for a captured payment. Not idempotent: each call creates a new refund and moves money again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_intent` | string | yes |  | Payment Intent ID. The PaymentIntent ID (e.g., pi_...) to refund. Obtain it from List/Search Payment Intents. |
| `amount` | number | no |  | Amount. The amount to refund as a decimal (e.g., 12.99). If left blank, a full refund is issued. |
| `reason` | string | no |  | Reason. An optional reason for the refund. One of `"duplicate"`, `"fraudulent"`, `"requested_by_customer"`. |
| `metadata` | JSON | no |  | Metadata. A set of key-value pairs to store additional information about the refund. |

Output fields:

- `id`: Refund ID
- `amount`: Amount (number)
- `currency`: Currency
- `status`: Status
- `charge`: Charge
- `payment_intent`: Payment Intent
- `payment_method`: Payment Method
- `balance_transaction`: Balance Transaction
- `reason`: Reason
- `receipt_number`: Receipt Number
- `created`: Created (datetime)
- `metadata`: Metadata (an object whose keys vary)

### `create_invoice_ai`

**Create Invoice (Agent).** Creates a draft invoice for an existing customer in the given currency. Use to bill a customer for pending invoice items; add lines with Create Invoice Item / Add Invoice Lines, then Finalize Invoice and Send Invoice. Requires a valid customer ID. Not idempotent: each call creates a separate invoice. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The Stripe customer ID (e.g., cus_...). Obtain it from Search Customers or List Customers. |
| `currency` | string | yes |  | Currency. The three-letter ISO currency code (e.g., usd). |
| `description` | string | no |  | Description. Description for the invoice. |
| `collection_method` | string | no |  | Collection Method. How to collect payment. 'charge_automatically' (default) charges the customer's default payment method when finalized; 'send_invoice' emails the customer a payable invoice (requires Days Until Due) and is the only method that lets you later call Send Invoice. One of `"charge_automatically"`, `"send_invoice"`. |
| `days_until_due` | number | no |  | Days Until Due. Number of days until the invoice is due. Required when Collection Method is 'send_invoice'. |

Output fields:

- `id`: Invoice ID
- `number`: Number
- `status`: Status
- `currency`: Currency
- `customer`: Customer
- `customer_email`: Customer Email (email)
- `customer_name`: Customer Name
- `customer_phone`: Customer Phone
- `description`: Description
- `collection_method`: Collection Method
- `billing_reason`: Billing Reason
- `amount_due`: Amount Due (number)
- `amount_paid`: Amount Paid (number)
- `amount_remaining`: Amount Remaining (number)
- `subtotal`: Subtotal (number)
- `total`: Total (number)
- `attempt_count`: Attempt Count (number)
- `attempted`: Attempted (boolean)
- `auto_advance`: Auto Advance (boolean)
- `due_date`: Due Date (datetime)
- `created`: Created (datetime)
- `period_start`: Period Start (datetime)
- `period_end`: Period End (datetime)
- `effective_at`: Effective At (datetime)
- `hosted_invoice_url`: Hosted Invoice URL (url)
- `invoice_pdf`: Invoice PDF (url)
- `receipt_number`: Receipt Number
- `starting_balance`: Starting Balance (number)
- `ending_balance`: Ending Balance (number)
- `status_transitions`: Status Transitions
- `status_transitions.finalized_at`: Finalized At (datetime)
- `status_transitions.paid_at`: Paid At (datetime)
- `status_transitions.marked_uncollectible_at`: Marked Uncollectible At (datetime)
- `status_transitions.voided_at`: Voided At (datetime)
- `lines`: Lines
- `lines.data`: Data
- `lines.data[].id`: Line ID
- `lines.data[].description`: Description
- `lines.data[].amount`: Amount (number)
- `lines.data[].currency`: Currency
- `lines.data[].quantity`: Quantity (number)
- `lines.data[].subtotal`: Subtotal (number)
- `lines.data[].invoice`: Invoice
- `lines.data[].period`: Period
- `lines.data[].period.start`: Start (datetime)
- `lines.data[].period.end`: End (datetime)
- `lines.data[].discountable`: Discountable (boolean)
- `lines.data[].livemode`: Live Mode (boolean)
- `lines.data[].metadata`: Metadata (an object whose keys vary)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `get_invoice`

**Get Invoice (Agent).** Fetches a single Stripe invoice by its invoice ID (e.g., in_...). Use when you have the exact ID and need its current status, amounts, lines, or hosted/PDF links; use List/Search Invoices to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice_id` | string | yes |  | Invoice ID. The Stripe invoice ID (e.g., in_...). Obtain it from List Invoices or Search Invoices. |

Output fields:

- `id`: Invoice ID
- `number`: Number
- `status`: Status
- `currency`: Currency
- `customer`: Customer
- `customer_email`: Customer Email (email)
- `customer_name`: Customer Name
- `customer_phone`: Customer Phone
- `description`: Description
- `collection_method`: Collection Method
- `billing_reason`: Billing Reason
- `amount_due`: Amount Due (number)
- `amount_paid`: Amount Paid (number)
- `amount_remaining`: Amount Remaining (number)
- `subtotal`: Subtotal (number)
- `total`: Total (number)
- `attempt_count`: Attempt Count (number)
- `attempted`: Attempted (boolean)
- `auto_advance`: Auto Advance (boolean)
- `due_date`: Due Date (datetime)
- `created`: Created (datetime)
- `period_start`: Period Start (datetime)
- `period_end`: Period End (datetime)
- `effective_at`: Effective At (datetime)
- `hosted_invoice_url`: Hosted Invoice URL (url)
- `invoice_pdf`: Invoice PDF (url)
- `receipt_number`: Receipt Number
- `starting_balance`: Starting Balance (number)
- `ending_balance`: Ending Balance (number)
- `status_transitions`: Status Transitions
- `status_transitions.finalized_at`: Finalized At (datetime)
- `status_transitions.paid_at`: Paid At (datetime)
- `status_transitions.marked_uncollectible_at`: Marked Uncollectible At (datetime)
- `status_transitions.voided_at`: Voided At (datetime)
- `lines`: Lines
- `lines.data`: Data
- `lines.data[].id`: Line ID
- `lines.data[].description`: Description
- `lines.data[].amount`: Amount (number)
- `lines.data[].currency`: Currency
- `lines.data[].quantity`: Quantity (number)
- `lines.data[].subtotal`: Subtotal (number)
- `lines.data[].invoice`: Invoice
- `lines.data[].period`: Period
- `lines.data[].period.start`: Start (datetime)
- `lines.data[].period.end`: End (datetime)
- `lines.data[].discountable`: Discountable (boolean)
- `lines.data[].livemode`: Live Mode (boolean)
- `lines.data[].metadata`: Metadata (an object whose keys vary)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `create_product_ai`

**Create Product (Agent).** Creates a new Stripe product (the catalog item that prices attach to), with optional description, images, URL, and metadata. Use before creating a price or when adding a sellable item; to archive a product use Update Product with active=false. Not idempotent: each call creates a distinct product. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Product Name. The product name, displayable to the customer. |
| `description` | string | no |  | Description. The product description, displayable to the customer. |
| `active` | boolean | no |  | Active. Whether the product is currently available for purchase. Defaults to true. |
| `images` | array | no |  | Image URLs. A list of up to 8 URLs of images for this product. |
| `url` | string | no |  | Product URL. A publicly-accessible online page for this product. |
| `metadata` | JSON | no |  | Metadata. A set of key-value pairs to store additional information about the product. |

Output fields:

- `id`: Product ID
- `name`: Name
- `description`: Description
- `active`: Active (boolean)
- `default_price`: Default Price
- `images`: Images
- `url`: URL (url)
- `unit_label`: Unit Label
- `type`: Type
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `create_price_ai`

**Create Price (Agent).** Creates a price for an existing Stripe product, one-time or recurring depending on the chosen billing interval. Amount is a decimal in the major currency unit. Use after Create Product to define what to charge before building a subscription or payment link. Requires the product ID. Not idempotent: each call creates a new price. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product` | string | yes |  | Product ID. The Stripe product ID (e.g., prod_...) this price attaches to. Obtain it from List/Search Products or Create Product. |
| `unit_amount` | number | yes |  | Unit Amount. The price amount as a decimal (e.g., 25.50 for $25.50). |
| `currency` | string | yes |  | Currency. The three-letter ISO currency code (e.g., usd). |
| `recurring_interval` | string | yes | `"one_time"` | Billing Interval. Billing frequency. Select 'One-Time' for a single, non-recurring payment. One of `"one_time"`, `"day"`, `"week"`, `"month"`, `"year"`. |
| `recurring_interval_count` | number | no |  | Interval Count. Number of intervals between billings (e.g., Monthly + count 3 = every 3 months). Only used for recurring prices. |

Output fields:

- `id`: Price ID
- `active`: Active (boolean)
- `currency`: Currency
- `product`: Product
- `nickname`: Nickname
- `unit_amount`: Unit Amount (number)
- `unit_amount_decimal`: Unit Amount Decimal
- `type`: Type
- `billing_scheme`: Billing Scheme
- `tax_behavior`: Tax Behavior
- `lookup_key`: Lookup Key
- `recurring`: Recurring
- `recurring.interval`: Interval
- `recurring.interval_count`: Interval Count (number)
- `recurring.trial_period_days`: Trial Period Days (number)
- `recurring.usage_type`: Usage Type
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `create_subscription_ai`

**Create Subscription (Agent).** Starts a recurring subscription for an existing customer against one or more price IDs, with optional collection method, trial period, and default payment method. Use to enroll a customer in recurring billing. Requires a customer ID and at least one price. Not idempotent: each call creates a separate subscription. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | yes |  | Customer ID. The Stripe customer ID (e.g., cus_...). Obtain it from Search Customers or List Customers. |
| `items` | array | yes |  | Subscription Items. A list of prices to subscribe the customer to. Each item: { `price`, `quantity`? }. |
| `collection_method` | string | no |  | Collection Method. 'charge_automatically' bills the default payment method; 'send_invoice' emails an invoice. One of `"charge_automatically"`, `"send_invoice"`. |
| `days_until_due` | number | no |  | Days Until Due. Days before an invoice is due. Required if Collection Method is 'Send Invoice'. |
| `trial_period_days` | number | no |  | Trial Period (Days). Number of trial days before the subscription bills for the first time. |
| `default_payment_method` | string | no |  | Default Payment Method ID. ID of the default payment method (e.g., pm_...). |
| `metadata` | JSON | no |  | Metadata. |

Output fields:

- `id`: Subscription ID
- `status`: Status
- `customer`: Customer
- `currency`: Currency
- `description`: Description
- `collection_method`: Collection Method
- `latest_invoice`: Latest Invoice
- `default_payment_method`: Default Payment Method
- `quantity`: Quantity (number)
- `start_date`: Start Date (datetime)
- `billing_cycle_anchor`: Billing Cycle Anchor (datetime)
- `cancel_at`: Cancel At (datetime)
- `canceled_at`: Canceled At (datetime)
- `cancel_at_period_end`: Cancel At Period End (boolean)
- `ended_at`: Ended At (datetime)
- `trial_start`: Trial Start (datetime)
- `trial_end`: Trial End (datetime)
- `items`: Items
- `items.data`: Data
- `items.data[].id`: Subscription Item ID
- `items.data[].quantity`: Quantity (number)
- `items.data[].subscription`: Subscription
- `items.data[].current_period_start`: Current Period Start (datetime)
- `items.data[].current_period_end`: Current Period End (datetime)
- `items.data[].price`: Price
- `items.data[].price.id`: Price ID
- `items.data[].price.active`: Active (boolean)
- `items.data[].price.currency`: Currency
- `items.data[].price.product`: Product
- `items.data[].price.nickname`: Nickname
- `items.data[].price.unit_amount`: Unit Amount (number)
- `items.data[].price.unit_amount_decimal`: Unit Amount Decimal
- `items.data[].price.type`: Type
- `items.data[].price.billing_scheme`: Billing Scheme
- `items.data[].price.tax_behavior`: Tax Behavior
- `items.data[].price.lookup_key`: Lookup Key
- `items.data[].price.recurring`: Recurring
- `items.data[].price.recurring.interval`: Interval
- `items.data[].price.recurring.interval_count`: Interval Count (number)
- `items.data[].price.recurring.trial_period_days`: Trial Period Days (number)
- `items.data[].price.recurring.usage_type`: Usage Type
- `items.data[].price.created`: Created (datetime)
- `items.data[].price.livemode`: Live Mode (boolean)
- `items.data[].price.metadata`: Metadata (an object whose keys vary)
- `items.data[].created`: Created (datetime)
- `items.data[].metadata`: Metadata (an object whose keys vary)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `cancel_subscription_ai`

**Cancel Subscription (Agent).** Cancels an existing Stripe subscription by its ID, either immediately or scheduled to end at the close of the current billing period (via Cancel at Period End). Use to stop recurring billing. Idempotent: re-running on an already-canceled subscription leaves it canceled. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscription` | string | yes |  | Subscription ID. The Stripe subscription ID (e.g., sub_...). Obtain it from List/Search Subscriptions. |
| `cancel_at_period_end` | boolean | no | `false` | Cancel at Period End. If true, the subscription stays active until the end of the current billing period. If false, it cancels immediately. |

Output fields:

- `id`: Subscription ID
- `status`: Status
- `customer`: Customer
- `currency`: Currency
- `description`: Description
- `collection_method`: Collection Method
- `latest_invoice`: Latest Invoice
- `default_payment_method`: Default Payment Method
- `quantity`: Quantity (number)
- `start_date`: Start Date (datetime)
- `billing_cycle_anchor`: Billing Cycle Anchor (datetime)
- `cancel_at`: Cancel At (datetime)
- `canceled_at`: Canceled At (datetime)
- `cancel_at_period_end`: Cancel At Period End (boolean)
- `ended_at`: Ended At (datetime)
- `trial_start`: Trial Start (datetime)
- `trial_end`: Trial End (datetime)
- `items`: Items
- `items.data`: Data
- `items.data[].id`: Subscription Item ID
- `items.data[].quantity`: Quantity (number)
- `items.data[].subscription`: Subscription
- `items.data[].current_period_start`: Current Period Start (datetime)
- `items.data[].current_period_end`: Current Period End (datetime)
- `items.data[].price`: Price
- `items.data[].price.id`: Price ID
- `items.data[].price.active`: Active (boolean)
- `items.data[].price.currency`: Currency
- `items.data[].price.product`: Product
- `items.data[].price.nickname`: Nickname
- `items.data[].price.unit_amount`: Unit Amount (number)
- `items.data[].price.unit_amount_decimal`: Unit Amount Decimal
- `items.data[].price.type`: Type
- `items.data[].price.billing_scheme`: Billing Scheme
- `items.data[].price.tax_behavior`: Tax Behavior
- `items.data[].price.lookup_key`: Lookup Key
- `items.data[].price.recurring`: Recurring
- `items.data[].price.recurring.interval`: Interval
- `items.data[].price.recurring.interval_count`: Interval Count (number)
- `items.data[].price.recurring.trial_period_days`: Trial Period Days (number)
- `items.data[].price.recurring.usage_type`: Usage Type
- `items.data[].price.created`: Created (datetime)
- `items.data[].price.livemode`: Live Mode (boolean)
- `items.data[].price.metadata`: Metadata (an object whose keys vary)
- `items.data[].created`: Created (datetime)
- `items.data[].metadata`: Metadata (an object whose keys vary)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `search_subscriptions_ai`

**Search Subscriptions (Agent).** Lists and filters Stripe subscriptions by price ID, status, customer ID, and creation date range, optionally expanding full customer details. Use to find subscriptions matching criteria or audit a customer's subscriptions; use Get Subscription when you already have the sub_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `price_ids` | string | no |  | Price IDs. Comma-separated list of price IDs to filter by (e.g., price_1ABC123, price_2DEF456) |
| `status` | string | no |  | Subscription Status. Filter by subscription status. One of `""`, `"active"`, `"past_due"`, `"unpaid"`, `"canceled"`, `"incomplete"`, `"incomplete_expired"`, `"trialing"`, `"paused"`. |
| `customer_id` | string | no |  | Customer ID. Filter by specific customer ID (optional) |
| `created_after` | ISO date-time string | no |  | Created After. Filter subscriptions created after this date (YYYY-MM-DD format) |
| `created_before` | ISO date-time string | no |  | Created Before. Filter subscriptions created before this date (YYYY-MM-DD format) |
| `limit` | number | no | `100` | Limit. Maximum number of subscriptions to return (default: 100, set to 0 for all) |
| `fetch_all` | boolean | no | `false` | Fetch All Results. Fetch all matching subscriptions (ignores limit, may take longer for large datasets) |
| `include_customer_details` | boolean | no | `true` | Include Customer Details. Fetch detailed customer information for each subscription. |

Output fields:

- `success`: Success (boolean)
- `count`: Count (number)
- `total_fetched`: Total Fetched (number)
- `requests_made`: Requests Made (number)
- `has_more_available`: Has More Available (boolean)
- `subscriptions`: Subscriptions
- `subscriptions[].id`: Subscription ID
- `subscriptions[].status`: Status
- `subscriptions[].customer`: Customer
- `subscriptions[].currency`: Currency
- `subscriptions[].description`: Description
- `subscriptions[].collection_method`: Collection Method
- `subscriptions[].latest_invoice`: Latest Invoice
- `subscriptions[].default_payment_method`: Default Payment Method
- `subscriptions[].quantity`: Quantity (number)
- `subscriptions[].start_date`: Start Date (datetime)
- `subscriptions[].billing_cycle_anchor`: Billing Cycle Anchor (datetime)
- `subscriptions[].cancel_at`: Cancel At (datetime)
- `subscriptions[].canceled_at`: Canceled At (datetime)
- `subscriptions[].cancel_at_period_end`: Cancel At Period End (boolean)
- `subscriptions[].ended_at`: Ended At (datetime)
- `subscriptions[].trial_start`: Trial Start (datetime)
- `subscriptions[].trial_end`: Trial End (datetime)
- `subscriptions[].items`: Items
- `subscriptions[].items.data`: Data
- `subscriptions[].items.data[].id`: Subscription Item ID
- `subscriptions[].items.data[].quantity`: Quantity (number)
- `subscriptions[].items.data[].subscription`: Subscription
- `subscriptions[].items.data[].current_period_start`: Current Period Start (datetime)
- `subscriptions[].items.data[].current_period_end`: Current Period End (datetime)
- `subscriptions[].items.data[].price`: Price
- `subscriptions[].items.data[].price.id`: Price ID
- `subscriptions[].items.data[].price.active`: Active (boolean)
- `subscriptions[].items.data[].price.currency`: Currency
- `subscriptions[].items.data[].price.product`: Product
- `subscriptions[].items.data[].price.nickname`: Nickname
- `subscriptions[].items.data[].price.unit_amount`: Unit Amount (number)
- `subscriptions[].items.data[].price.unit_amount_decimal`: Unit Amount Decimal
- `subscriptions[].items.data[].price.type`: Type
- `subscriptions[].items.data[].price.billing_scheme`: Billing Scheme
- `subscriptions[].items.data[].price.tax_behavior`: Tax Behavior
- `subscriptions[].items.data[].price.lookup_key`: Lookup Key
- `subscriptions[].items.data[].price.recurring`: Recurring
- `subscriptions[].items.data[].price.recurring.interval`: Interval
- `subscriptions[].items.data[].price.recurring.interval_count`: Interval Count (number)
- `subscriptions[].items.data[].price.recurring.trial_period_days`: Trial Period Days (number)
- `subscriptions[].items.data[].price.recurring.usage_type`: Usage Type
- `subscriptions[].items.data[].price.created`: Created (datetime)
- `subscriptions[].items.data[].price.livemode`: Live Mode (boolean)
- `subscriptions[].items.data[].price.metadata`: Metadata (an object whose keys vary)
- `subscriptions[].items.data[].created`: Created (datetime)
- `subscriptions[].items.data[].metadata`: Metadata (an object whose keys vary)
- `subscriptions[].created`: Created (datetime)
- `subscriptions[].livemode`: Live Mode (boolean)
- `subscriptions[].metadata`: Metadata (an object whose keys vary)

### `create_payment_link_ai`

**Create Payment Link (Agent).** Creates a reusable, Stripe-hosted payment link for the given line items (price IDs and quantities), with optional after-completion redirect, promotion codes, and billing-address collection. Use to generate a shareable checkout URL without building a custom flow; for a richer one-off hosted page use Create Checkout Session. Not idempotent: each call creates a new payment link. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `line_items` | array | yes |  | Line Items. The products and quantities to include in the payment link. Each item: { `price`, `quantity` }. |
| `after_completion_type` | string | no |  | After Completion Behavior. Behavior after purchase completes. Defaults to Stripe's hosted confirmation page. One of `"hosted_confirmation"`, `"redirect"`. |
| `after_completion_redirect_url` | string | no |  | Redirect URL. URL to redirect to after a successful purchase. Only used when behavior is "Redirect to URL". |
| `allow_promotion_codes` | boolean | no |  | Allow Promotion Codes. Allow the customer to enter a promotion code. |
| `billing_address_collection` | string | no |  | Billing Address Collection. Whether Checkout collects the customer's billing address. One of `"auto"`, `"required"`. |
| `metadata` | JSON | no |  | Metadata. |

Output fields:

- `id`: Payment Link ID
- `active`: Active (boolean)
- `url`: URL (url)
- `currency`: Currency
- `allow_promotion_codes`: Allow Promotion Codes (boolean)
- `billing_address_collection`: Billing Address Collection
- `customer_creation`: Customer Creation
- `payment_method_collection`: Payment Method Collection
- `submit_type`: Submit Type
- `application_fee_amount`: Application Fee Amount (number)
- `application_fee_percent`: Application Fee Percent (number)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `deactivate_payment_link_ai`

**Deactivate Payment Link (Agent).** Deactivates an existing Stripe payment link by its ID so it can no longer accept payments (sets active=false). Use to retire a shared checkout URL; use Get/List Payment Links to find the ID. Idempotent: re-running on an already-inactive link leaves it inactive. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_link_id` | string | yes |  | Payment Link ID. The payment link ID (e.g., plink_...). Obtain it from List Payment Links. |

Output fields:

- `id`: Payment Link ID
- `active`: Active (boolean)
- `url`: URL (url)
- `currency`: Currency
- `allow_promotion_codes`: Allow Promotion Codes (boolean)
- `billing_address_collection`: Billing Address Collection
- `customer_creation`: Customer Creation
- `payment_method_collection`: Payment Method Collection
- `submit_type`: Submit Type
- `application_fee_amount`: Application Fee Amount (number)
- `application_fee_percent`: Application Fee Percent (number)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `get_payout`

**Get Payout (Agent).** Fetches a single Stripe payout (funds sent to your bank account) by its payout ID (e.g., po_...). Use to check a payout's status, amount, or arrival date; use List Payouts to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payout_id` | string | yes |  | Payout ID. The Stripe payout ID (e.g., po_...). Obtain it from List Payouts. |

Output fields:

- `id`: Payout ID
- `amount`: Amount (number)
- `currency`: Currency
- `status`: Status
- `type`: Type
- `method`: Method
- `automatic`: Automatic (boolean)
- `arrival_date`: Arrival Date (datetime)
- `balance_transaction`: Balance Transaction
- `destination`: Destination
- `description`: Description
- `statement_descriptor`: Statement Descriptor
- `source_type`: Source Type
- `failure_code`: Failure Code
- `failure_message`: Failure Message
- `reconciliation_status`: Reconciliation Status
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_customers`

**List Customers (Agent).** Pages through Stripe customers, newest first, optionally filtered by an exact email. Use to enumerate customers or resolve a customer ID; for query-language matching use Search Customers, or Get Customer when you have the cus_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. Filter to customers with this exact email. |
| `limit` | number | no |  | Limit. Number of customers to return (1-100, default 10). |
| `starting_after` | string | no |  | Starting After. A customer ID; returns the page of results after this cursor for pagination. |

Output fields:

- `data`: Data
- `data[].id`: Customer ID
- `data[].email`: Email (email)
- `data[].name`: Name
- `data[].description`: Description
- `data[].phone`: Phone
- `data[].address`: Address
- `data[].address.line1`: Line 1
- `data[].address.line2`: Line 2
- `data[].address.city`: City
- `data[].address.state`: State
- `data[].address.postal_code`: Postal Code
- `data[].address.country`: Country
- `data[].balance`: Balance (number)
- `data[].currency`: Currency
- `data[].delinquent`: Delinquent (boolean)
- `data[].invoice_prefix`: Invoice Prefix
- `data[].tax_exempt`: Tax Exempt
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `confirm_payment_intent`

**Confirm Payment Intent (Agent).** Confirms a previously-created PaymentIntent to attempt collecting the payment, optionally supplying a payment method and return URL. Use when a PaymentIntent was created unconfirmed and you now want to charge it; Create Payment Intent can also confirm inline. Money-moving and not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_intent_id` | string | yes |  | Payment Intent ID. The PaymentIntent ID (e.g., pi_...) to confirm. Obtain it from List/Search Payment Intents. |
| `payment_method` | string | no |  | Payment Method ID. The PaymentMethod ID to use (e.g., pm_...). |
| `return_url` | string | no |  | Return URL. URL to redirect to after authentication. Required for redirect-based payment methods. |

Output fields:

- `id`: Payment Intent ID
- `amount`: Amount (number)
- `amount_received`: Amount Received (number)
- `amount_capturable`: Amount Capturable (number)
- `currency`: Currency
- `status`: Status
- `customer`: Customer
- `description`: Description
- `payment_method`: Payment Method
- `latest_charge`: Latest Charge
- `capture_method`: Capture Method
- `confirmation_method`: Confirmation Method
- `client_secret`: Client Secret
- `receipt_email`: Receipt Email (email)
- `setup_future_usage`: Setup Future Usage
- `cancellation_reason`: Cancellation Reason
- `canceled_at`: Canceled At (datetime)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `cancel_payment_intent`

**Cancel Payment Intent (Agent).** Cancels a PaymentIntent that has not yet been captured (e.g., a manual-capture authorization or an abandoned payment), with an optional cancellation reason. Use to release an authorization or abandon a payment. Idempotent: re-running on an already-canceled PaymentIntent leaves it canceled. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_intent_id` | string | yes |  | Payment Intent ID. The PaymentIntent ID (e.g., pi_...) to cancel. Obtain it from List/Search Payment Intents. |
| `cancellation_reason` | string | no |  | Cancellation Reason. An optional reason for the cancellation. One of `"duplicate"`, `"fraudulent"`, `"requested_by_customer"`, `"abandoned"`. |

Output fields:

- `id`: Payment Intent ID
- `amount`: Amount (number)
- `amount_received`: Amount Received (number)
- `amount_capturable`: Amount Capturable (number)
- `currency`: Currency
- `status`: Status
- `customer`: Customer
- `description`: Description
- `payment_method`: Payment Method
- `latest_charge`: Latest Charge
- `capture_method`: Capture Method
- `confirmation_method`: Confirmation Method
- `client_secret`: Client Secret
- `receipt_email`: Receipt Email (email)
- `setup_future_usage`: Setup Future Usage
- `cancellation_reason`: Cancellation Reason
- `canceled_at`: Canceled At (datetime)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `capture_payment_intent`

**Capture Payment Intent (Agent).** Captures the funds of a PaymentIntent that was authorized with manual capture (status requires_capture). Optionally capture a partial amount (in the smallest currency unit, e.g. cents) and mark it as the final capture. Use to settle a held authorization. Money-moving and not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_intent_id` | string | yes |  | Payment Intent ID. The PaymentIntent ID (e.g., pi_...) to capture. Obtain it from List/Search Payment Intents. |
| `amount_to_capture` | number | no |  | Amount to Capture. The amount to capture in the smallest currency unit (e.g., 1050 for $10.50). Defaults to the full authorized amount. |
| `final_capture` | boolean | no |  | Final Capture. If true, the remaining uncaptured amount is released back to the customer. |
| `metadata` | JSON | no |  | Metadata. A set of key-value pairs to attach. |

Output fields:

- `id`: Payment Intent ID
- `amount`: Amount (number)
- `amount_received`: Amount Received (number)
- `amount_capturable`: Amount Capturable (number)
- `currency`: Currency
- `status`: Status
- `customer`: Customer
- `description`: Description
- `payment_method`: Payment Method
- `latest_charge`: Latest Charge
- `capture_method`: Capture Method
- `confirmation_method`: Confirmation Method
- `client_secret`: Client Secret
- `receipt_email`: Receipt Email (email)
- `setup_future_usage`: Setup Future Usage
- `cancellation_reason`: Cancellation Reason
- `canceled_at`: Canceled At (datetime)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_payment_intents`

**List Payment Intents (Agent).** Pages through PaymentIntents, newest first, optionally filtered by customer or a created timestamp range. Use to enumerate payments or resolve a PaymentIntent ID; for query-language matching use Search Payment Intents, or Get Payment Intent when you have the pi_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | no |  | Customer ID. Filter to PaymentIntents for this customer (cus_...). |
| `created_after` | ISO date-time string | no |  | Created After. Only return PaymentIntents created at or after this time. |
| `created_before` | ISO date-time string | no |  | Created Before. Only return PaymentIntents created at or before this time. |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |
| `starting_after` | string | no |  | Starting After. A PaymentIntent ID cursor for pagination. |

Output fields:

- `data`: Data
- `data[].id`: Payment Intent ID
- `data[].amount`: Amount (number)
- `data[].amount_received`: Amount Received (number)
- `data[].amount_capturable`: Amount Capturable (number)
- `data[].currency`: Currency
- `data[].status`: Status
- `data[].customer`: Customer
- `data[].description`: Description
- `data[].payment_method`: Payment Method
- `data[].latest_charge`: Latest Charge
- `data[].capture_method`: Capture Method
- `data[].confirmation_method`: Confirmation Method
- `data[].client_secret`: Client Secret
- `data[].receipt_email`: Receipt Email (email)
- `data[].setup_future_usage`: Setup Future Usage
- `data[].cancellation_reason`: Cancellation Reason
- `data[].canceled_at`: Canceled At (datetime)
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `search_payment_intents`

**Search Payment Intents (Agent).** Searches PaymentIntents using the Stripe Search Query Language (e.g. "status:'succeeded' AND customer:'cus_...'"). Use for ad-hoc filtered lookups; use List Payment Intents for simple paging or Get Payment Intent when you have the pi_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. A Stripe search query (e.g. status:'succeeded' AND amount>1000). |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Results
- `data[].id`: Payment Intent ID
- `data[].amount`: Amount (number)
- `data[].amount_received`: Amount Received (number)
- `data[].amount_capturable`: Amount Capturable (number)
- `data[].currency`: Currency
- `data[].status`: Status
- `data[].customer`: Customer
- `data[].description`: Description
- `data[].payment_method`: Payment Method
- `data[].latest_charge`: Latest Charge
- `data[].capture_method`: Capture Method
- `data[].confirmation_method`: Confirmation Method
- `data[].client_secret`: Client Secret
- `data[].receipt_email`: Receipt Email (email)
- `data[].setup_future_usage`: Setup Future Usage
- `data[].cancellation_reason`: Cancellation Reason
- `data[].canceled_at`: Canceled At (datetime)
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `next_page`: Next Page
- `url`: URL

### `retrieve_charge`

**Retrieve Charge (Agent).** Fetches a single Stripe charge by its charge ID (e.g., ch_...). Charges are the legacy, read-mostly view of a payment; for the modern object use Get Payment Intent. Use List/Search Charges to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `charge_id` | string | yes |  | Charge ID. The Stripe charge ID (e.g., ch_...). Obtain it from List Charges or Search Charges. |

Output fields:

- `id`: Charge ID
- `amount`: Amount (number)
- `amount_captured`: Amount Captured (number)
- `amount_refunded`: Amount Refunded (number)
- `currency`: Currency
- `status`: Status
- `paid`: Paid (boolean)
- `captured`: Captured (boolean)
- `refunded`: Refunded (boolean)
- `disputed`: Disputed (boolean)
- `customer`: Customer
- `description`: Description
- `payment_intent`: Payment Intent
- `payment_method`: Payment Method
- `balance_transaction`: Balance Transaction
- `receipt_url`: Receipt URL (url)
- `receipt_email`: Receipt Email (email)
- `receipt_number`: Receipt Number
- `calculated_statement_descriptor`: Statement Descriptor
- `billing_details`: Billing Details
- `billing_details.name`: Name
- `billing_details.email`: Email (email)
- `billing_details.phone`: Phone
- `billing_details.address`: Address
- `billing_details.address.line1`: Line 1
- `billing_details.address.line2`: Line 2
- `billing_details.address.city`: City
- `billing_details.address.state`: State
- `billing_details.address.postal_code`: Postal Code
- `billing_details.address.country`: Country
- `payment_method_details`: Payment Method Details
- `payment_method_details.type`: Type
- `payment_method_details.card`: Card
- `payment_method_details.card.brand`: Brand
- `payment_method_details.card.last4`: Last 4
- `payment_method_details.card.exp_month`: Expiry Month (number)
- `payment_method_details.card.exp_year`: Expiry Year (number)
- `payment_method_details.card.funding`: Funding
- `payment_method_details.card.country`: Country
- `payment_method_details.card.network`: Network
- `outcome`: Outcome
- `outcome.network_status`: Network Status
- `outcome.risk_level`: Risk Level
- `outcome.risk_score`: Risk Score (number)
- `outcome.seller_message`: Seller Message
- `outcome.type`: Type
- `failure_code`: Failure Code
- `failure_message`: Failure Message
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_charges`

**List Charges (Agent).** Pages through charges, newest first, optionally filtered by customer, PaymentIntent, or a created timestamp range. Use to enumerate charges or resolve a charge ID; for query-language matching use Search Charges. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | no |  | Customer ID. Filter to charges for this customer (cus_...). |
| `payment_intent` | string | no |  | Payment Intent ID. Filter to charges for this PaymentIntent (pi_...). |
| `created_after` | ISO date-time string | no |  | Created After. |
| `created_before` | ISO date-time string | no |  | Created Before. |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Charge ID
- `data[].amount`: Amount (number)
- `data[].amount_captured`: Amount Captured (number)
- `data[].amount_refunded`: Amount Refunded (number)
- `data[].currency`: Currency
- `data[].status`: Status
- `data[].paid`: Paid (boolean)
- `data[].captured`: Captured (boolean)
- `data[].refunded`: Refunded (boolean)
- `data[].disputed`: Disputed (boolean)
- `data[].customer`: Customer
- `data[].description`: Description
- `data[].payment_intent`: Payment Intent
- `data[].payment_method`: Payment Method
- `data[].balance_transaction`: Balance Transaction
- `data[].receipt_url`: Receipt URL (url)
- `data[].receipt_email`: Receipt Email (email)
- `data[].receipt_number`: Receipt Number
- `data[].calculated_statement_descriptor`: Statement Descriptor
- `data[].billing_details`: Billing Details
- `data[].billing_details.name`: Name
- `data[].billing_details.email`: Email (email)
- `data[].billing_details.phone`: Phone
- `data[].billing_details.address`: Address
- `data[].billing_details.address.line1`: Line 1
- `data[].billing_details.address.line2`: Line 2
- `data[].billing_details.address.city`: City
- `data[].billing_details.address.state`: State
- `data[].billing_details.address.postal_code`: Postal Code
- `data[].billing_details.address.country`: Country
- `data[].payment_method_details`: Payment Method Details
- `data[].payment_method_details.type`: Type
- `data[].payment_method_details.card`: Card
- `data[].payment_method_details.card.brand`: Brand
- `data[].payment_method_details.card.last4`: Last 4
- `data[].payment_method_details.card.exp_month`: Expiry Month (number)
- `data[].payment_method_details.card.exp_year`: Expiry Year (number)
- `data[].payment_method_details.card.funding`: Funding
- `data[].payment_method_details.card.country`: Country
- `data[].payment_method_details.card.network`: Network
- `data[].outcome`: Outcome
- `data[].outcome.network_status`: Network Status
- `data[].outcome.risk_level`: Risk Level
- `data[].outcome.risk_score`: Risk Score (number)
- `data[].outcome.seller_message`: Seller Message
- `data[].outcome.type`: Type
- `data[].failure_code`: Failure Code
- `data[].failure_message`: Failure Message
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `search_charges`

**Search Charges (Agent).** Searches charges using the Stripe Search Query Language (e.g. "status:'succeeded' AND amount>1000"). Use for ad-hoc filtered lookups; use List Charges for simple paging or Retrieve Charge when you have the ch_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. A Stripe search query (e.g. metadata['order_id']:'6735'). |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Results
- `data[].id`: Charge ID
- `data[].amount`: Amount (number)
- `data[].amount_captured`: Amount Captured (number)
- `data[].amount_refunded`: Amount Refunded (number)
- `data[].currency`: Currency
- `data[].status`: Status
- `data[].paid`: Paid (boolean)
- `data[].captured`: Captured (boolean)
- `data[].refunded`: Refunded (boolean)
- `data[].disputed`: Disputed (boolean)
- `data[].customer`: Customer
- `data[].description`: Description
- `data[].payment_intent`: Payment Intent
- `data[].payment_method`: Payment Method
- `data[].balance_transaction`: Balance Transaction
- `data[].receipt_url`: Receipt URL (url)
- `data[].receipt_email`: Receipt Email (email)
- `data[].receipt_number`: Receipt Number
- `data[].calculated_statement_descriptor`: Statement Descriptor
- `data[].billing_details`: Billing Details
- `data[].billing_details.name`: Name
- `data[].billing_details.email`: Email (email)
- `data[].billing_details.phone`: Phone
- `data[].billing_details.address`: Address
- `data[].billing_details.address.line1`: Line 1
- `data[].billing_details.address.line2`: Line 2
- `data[].billing_details.address.city`: City
- `data[].billing_details.address.state`: State
- `data[].billing_details.address.postal_code`: Postal Code
- `data[].billing_details.address.country`: Country
- `data[].payment_method_details`: Payment Method Details
- `data[].payment_method_details.type`: Type
- `data[].payment_method_details.card`: Card
- `data[].payment_method_details.card.brand`: Brand
- `data[].payment_method_details.card.last4`: Last 4
- `data[].payment_method_details.card.exp_month`: Expiry Month (number)
- `data[].payment_method_details.card.exp_year`: Expiry Year (number)
- `data[].payment_method_details.card.funding`: Funding
- `data[].payment_method_details.card.country`: Country
- `data[].payment_method_details.card.network`: Network
- `data[].outcome`: Outcome
- `data[].outcome.network_status`: Network Status
- `data[].outcome.risk_level`: Risk Level
- `data[].outcome.risk_score`: Risk Score (number)
- `data[].outcome.seller_message`: Seller Message
- `data[].outcome.type`: Type
- `data[].failure_code`: Failure Code
- `data[].failure_message`: Failure Message
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `next_page`: Next Page
- `url`: URL

### `get_refund`

**Get Refund (Agent).** Fetches a single Stripe refund by its refund ID (e.g., re_...) to check its status and amount. Use List Refunds to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `refund_id` | string | yes |  | Refund ID. The Stripe refund ID (e.g., re_...). Obtain it from List Refunds. |

Output fields:

- `id`: Refund ID
- `amount`: Amount (number)
- `currency`: Currency
- `status`: Status
- `charge`: Charge
- `payment_intent`: Payment Intent
- `payment_method`: Payment Method
- `balance_transaction`: Balance Transaction
- `reason`: Reason
- `receipt_number`: Receipt Number
- `created`: Created (datetime)
- `metadata`: Metadata (an object whose keys vary)

### `list_refunds`

**List Refunds (Agent).** Pages through refunds, newest first, optionally filtered by PaymentIntent or charge. Use to enumerate refunds for a payment or resolve a refund ID; use Get Refund when you have the re_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_intent` | string | no |  | Payment Intent ID. Filter to refunds for this PaymentIntent (pi_...). |
| `charge` | string | no |  | Charge ID. Filter to refunds for this charge (ch_...). |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Refund ID
- `data[].amount`: Amount (number)
- `data[].currency`: Currency
- `data[].status`: Status
- `data[].charge`: Charge
- `data[].payment_intent`: Payment Intent
- `data[].payment_method`: Payment Method
- `data[].balance_transaction`: Balance Transaction
- `data[].reason`: Reason
- `data[].receipt_number`: Receipt Number
- `data[].created`: Created (datetime)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `list_invoices`

**List Invoices (Agent).** Pages through invoices, newest first, optionally filtered by customer, status, or subscription. Use to enumerate invoices or resolve an invoice ID; for query-language matching use Search Invoices, or Get Invoice when you have the in_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | no |  | Customer ID. Filter to invoices for this customer (cus_...). |
| `status` | string | no |  | Status. Filter by invoice status. One of `"draft"`, `"open"`, `"paid"`, `"uncollectible"`, `"void"`. |
| `subscription` | string | no |  | Subscription ID. Filter to invoices for this subscription (sub_...). |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Invoice ID
- `data[].number`: Number
- `data[].status`: Status
- `data[].currency`: Currency
- `data[].customer`: Customer
- `data[].customer_email`: Customer Email (email)
- `data[].customer_name`: Customer Name
- `data[].customer_phone`: Customer Phone
- `data[].description`: Description
- `data[].collection_method`: Collection Method
- `data[].billing_reason`: Billing Reason
- `data[].amount_due`: Amount Due (number)
- `data[].amount_paid`: Amount Paid (number)
- `data[].amount_remaining`: Amount Remaining (number)
- `data[].subtotal`: Subtotal (number)
- `data[].total`: Total (number)
- `data[].attempt_count`: Attempt Count (number)
- `data[].attempted`: Attempted (boolean)
- `data[].auto_advance`: Auto Advance (boolean)
- `data[].due_date`: Due Date (datetime)
- `data[].created`: Created (datetime)
- `data[].period_start`: Period Start (datetime)
- `data[].period_end`: Period End (datetime)
- `data[].effective_at`: Effective At (datetime)
- `data[].hosted_invoice_url`: Hosted Invoice URL (url)
- `data[].invoice_pdf`: Invoice PDF (url)
- `data[].receipt_number`: Receipt Number
- `data[].starting_balance`: Starting Balance (number)
- `data[].ending_balance`: Ending Balance (number)
- `data[].status_transitions`: Status Transitions
- `data[].status_transitions.finalized_at`: Finalized At (datetime)
- `data[].status_transitions.paid_at`: Paid At (datetime)
- `data[].status_transitions.marked_uncollectible_at`: Marked Uncollectible At (datetime)
- `data[].status_transitions.voided_at`: Voided At (datetime)
- `data[].lines`: Lines
- `data[].lines.data`: Data
- `data[].lines.data[].id`: Line ID
- `data[].lines.data[].description`: Description
- `data[].lines.data[].amount`: Amount (number)
- `data[].lines.data[].currency`: Currency
- `data[].lines.data[].quantity`: Quantity (number)
- `data[].lines.data[].subtotal`: Subtotal (number)
- `data[].lines.data[].invoice`: Invoice
- `data[].lines.data[].period`: Period
- `data[].lines.data[].period.start`: Start (datetime)
- `data[].lines.data[].period.end`: End (datetime)
- `data[].lines.data[].discountable`: Discountable (boolean)
- `data[].lines.data[].livemode`: Live Mode (boolean)
- `data[].lines.data[].metadata`: Metadata (an object whose keys vary)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `search_invoices`

**Search Invoices (Agent).** Searches invoices using the Stripe Search Query Language (e.g. "status:'open' AND customer:'cus_...'"). Use for ad-hoc filtered lookups; use List Invoices for simple paging or Get Invoice when you have the in_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. A Stripe search query (e.g. total>1000 AND status:'paid'). |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Results
- `data[].id`: Invoice ID
- `data[].number`: Number
- `data[].status`: Status
- `data[].currency`: Currency
- `data[].customer`: Customer
- `data[].customer_email`: Customer Email (email)
- `data[].customer_name`: Customer Name
- `data[].customer_phone`: Customer Phone
- `data[].description`: Description
- `data[].collection_method`: Collection Method
- `data[].billing_reason`: Billing Reason
- `data[].amount_due`: Amount Due (number)
- `data[].amount_paid`: Amount Paid (number)
- `data[].amount_remaining`: Amount Remaining (number)
- `data[].subtotal`: Subtotal (number)
- `data[].total`: Total (number)
- `data[].attempt_count`: Attempt Count (number)
- `data[].attempted`: Attempted (boolean)
- `data[].auto_advance`: Auto Advance (boolean)
- `data[].due_date`: Due Date (datetime)
- `data[].created`: Created (datetime)
- `data[].period_start`: Period Start (datetime)
- `data[].period_end`: Period End (datetime)
- `data[].effective_at`: Effective At (datetime)
- `data[].hosted_invoice_url`: Hosted Invoice URL (url)
- `data[].invoice_pdf`: Invoice PDF (url)
- `data[].receipt_number`: Receipt Number
- `data[].starting_balance`: Starting Balance (number)
- `data[].ending_balance`: Ending Balance (number)
- `data[].status_transitions`: Status Transitions
- `data[].status_transitions.finalized_at`: Finalized At (datetime)
- `data[].status_transitions.paid_at`: Paid At (datetime)
- `data[].status_transitions.marked_uncollectible_at`: Marked Uncollectible At (datetime)
- `data[].status_transitions.voided_at`: Voided At (datetime)
- `data[].lines`: Lines
- `data[].lines.data`: Data
- `data[].lines.data[].id`: Line ID
- `data[].lines.data[].description`: Description
- `data[].lines.data[].amount`: Amount (number)
- `data[].lines.data[].currency`: Currency
- `data[].lines.data[].quantity`: Quantity (number)
- `data[].lines.data[].subtotal`: Subtotal (number)
- `data[].lines.data[].invoice`: Invoice
- `data[].lines.data[].period`: Period
- `data[].lines.data[].period.start`: Start (datetime)
- `data[].lines.data[].period.end`: End (datetime)
- `data[].lines.data[].discountable`: Discountable (boolean)
- `data[].lines.data[].livemode`: Live Mode (boolean)
- `data[].lines.data[].metadata`: Metadata (an object whose keys vary)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `next_page`: Next Page
- `url`: URL

### `finalize_invoice`

**Finalize Invoice (Agent).** Finalizes a draft Stripe invoice, locking its line items and making it payable. Use after adding all line items and before Send Invoice. Not idempotent: it errors if the invoice is already finalized. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice_id` | string | yes |  | Invoice ID. The draft invoice ID (e.g., in_...). Obtain it from List/Search Invoices. |
| `auto_advance` | boolean | no |  | Auto Advance. If true, Stripe automatically collects the invoice (sends/charges per its settings) after finalizing. |

Output fields:

- `id`: Invoice ID
- `number`: Number
- `status`: Status
- `currency`: Currency
- `customer`: Customer
- `customer_email`: Customer Email (email)
- `customer_name`: Customer Name
- `customer_phone`: Customer Phone
- `description`: Description
- `collection_method`: Collection Method
- `billing_reason`: Billing Reason
- `amount_due`: Amount Due (number)
- `amount_paid`: Amount Paid (number)
- `amount_remaining`: Amount Remaining (number)
- `subtotal`: Subtotal (number)
- `total`: Total (number)
- `attempt_count`: Attempt Count (number)
- `attempted`: Attempted (boolean)
- `auto_advance`: Auto Advance (boolean)
- `due_date`: Due Date (datetime)
- `created`: Created (datetime)
- `period_start`: Period Start (datetime)
- `period_end`: Period End (datetime)
- `effective_at`: Effective At (datetime)
- `hosted_invoice_url`: Hosted Invoice URL (url)
- `invoice_pdf`: Invoice PDF (url)
- `receipt_number`: Receipt Number
- `starting_balance`: Starting Balance (number)
- `ending_balance`: Ending Balance (number)
- `status_transitions`: Status Transitions
- `status_transitions.finalized_at`: Finalized At (datetime)
- `status_transitions.paid_at`: Paid At (datetime)
- `status_transitions.marked_uncollectible_at`: Marked Uncollectible At (datetime)
- `status_transitions.voided_at`: Voided At (datetime)
- `lines`: Lines
- `lines.data`: Data
- `lines.data[].id`: Line ID
- `lines.data[].description`: Description
- `lines.data[].amount`: Amount (number)
- `lines.data[].currency`: Currency
- `lines.data[].quantity`: Quantity (number)
- `lines.data[].subtotal`: Subtotal (number)
- `lines.data[].invoice`: Invoice
- `lines.data[].period`: Period
- `lines.data[].period.start`: Start (datetime)
- `lines.data[].period.end`: End (datetime)
- `lines.data[].discountable`: Discountable (boolean)
- `lines.data[].livemode`: Live Mode (boolean)
- `lines.data[].metadata`: Metadata (an object whose keys vary)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `send_invoice`

**Send Invoice (Agent).** Emails a finalized Stripe invoice to the customer. The invoice must already be finalized (use Finalize Invoice first). Not idempotent: each call sends the invoice email again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice_id` | string | yes |  | Invoice ID. The finalized invoice ID (e.g., in_...). Obtain it from List/Search Invoices. |

Output fields:

- `id`: Invoice ID
- `number`: Number
- `status`: Status
- `currency`: Currency
- `customer`: Customer
- `customer_email`: Customer Email (email)
- `customer_name`: Customer Name
- `customer_phone`: Customer Phone
- `description`: Description
- `collection_method`: Collection Method
- `billing_reason`: Billing Reason
- `amount_due`: Amount Due (number)
- `amount_paid`: Amount Paid (number)
- `amount_remaining`: Amount Remaining (number)
- `subtotal`: Subtotal (number)
- `total`: Total (number)
- `attempt_count`: Attempt Count (number)
- `attempted`: Attempted (boolean)
- `auto_advance`: Auto Advance (boolean)
- `due_date`: Due Date (datetime)
- `created`: Created (datetime)
- `period_start`: Period Start (datetime)
- `period_end`: Period End (datetime)
- `effective_at`: Effective At (datetime)
- `hosted_invoice_url`: Hosted Invoice URL (url)
- `invoice_pdf`: Invoice PDF (url)
- `receipt_number`: Receipt Number
- `starting_balance`: Starting Balance (number)
- `ending_balance`: Ending Balance (number)
- `status_transitions`: Status Transitions
- `status_transitions.finalized_at`: Finalized At (datetime)
- `status_transitions.paid_at`: Paid At (datetime)
- `status_transitions.marked_uncollectible_at`: Marked Uncollectible At (datetime)
- `status_transitions.voided_at`: Voided At (datetime)
- `lines`: Lines
- `lines.data`: Data
- `lines.data[].id`: Line ID
- `lines.data[].description`: Description
- `lines.data[].amount`: Amount (number)
- `lines.data[].currency`: Currency
- `lines.data[].quantity`: Quantity (number)
- `lines.data[].subtotal`: Subtotal (number)
- `lines.data[].invoice`: Invoice
- `lines.data[].period`: Period
- `lines.data[].period.start`: Start (datetime)
- `lines.data[].period.end`: End (datetime)
- `lines.data[].discountable`: Discountable (boolean)
- `lines.data[].livemode`: Live Mode (boolean)
- `lines.data[].metadata`: Metadata (an object whose keys vary)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `add_invoice_lines`

**Add Invoice Lines (Agent).** Adds one or more line items to a draft Stripe invoice in a single call. Each line supplies either a price ID or an ad-hoc amount (smallest currency unit) plus currency, with an optional description and quantity. Use to populate a draft before Finalize Invoice. Not idempotent: each call appends new lines. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice_id` | string | yes |  | Invoice ID. The draft invoice ID (e.g., in_...). Obtain it from List/Search Invoices. |
| `lines` | array | yes |  | Lines. The line items to add to the invoice. Each item: { `description`?, `amount`?, `price`?, `quantity`? }. |

Output fields:

- `id`: Invoice ID
- `number`: Number
- `status`: Status
- `currency`: Currency
- `customer`: Customer
- `customer_email`: Customer Email (email)
- `customer_name`: Customer Name
- `customer_phone`: Customer Phone
- `description`: Description
- `collection_method`: Collection Method
- `billing_reason`: Billing Reason
- `amount_due`: Amount Due (number)
- `amount_paid`: Amount Paid (number)
- `amount_remaining`: Amount Remaining (number)
- `subtotal`: Subtotal (number)
- `total`: Total (number)
- `attempt_count`: Attempt Count (number)
- `attempted`: Attempted (boolean)
- `auto_advance`: Auto Advance (boolean)
- `due_date`: Due Date (datetime)
- `created`: Created (datetime)
- `period_start`: Period Start (datetime)
- `period_end`: Period End (datetime)
- `effective_at`: Effective At (datetime)
- `hosted_invoice_url`: Hosted Invoice URL (url)
- `invoice_pdf`: Invoice PDF (url)
- `receipt_number`: Receipt Number
- `starting_balance`: Starting Balance (number)
- `ending_balance`: Ending Balance (number)
- `status_transitions`: Status Transitions
- `status_transitions.finalized_at`: Finalized At (datetime)
- `status_transitions.paid_at`: Paid At (datetime)
- `status_transitions.marked_uncollectible_at`: Marked Uncollectible At (datetime)
- `status_transitions.voided_at`: Voided At (datetime)
- `lines`: Lines
- `lines.data`: Data
- `lines.data[].id`: Line ID
- `lines.data[].description`: Description
- `lines.data[].amount`: Amount (number)
- `lines.data[].currency`: Currency
- `lines.data[].quantity`: Quantity (number)
- `lines.data[].subtotal`: Subtotal (number)
- `lines.data[].invoice`: Invoice
- `lines.data[].period`: Period
- `lines.data[].period.start`: Start (datetime)
- `lines.data[].period.end`: End (datetime)
- `lines.data[].discountable`: Discountable (boolean)
- `lines.data[].livemode`: Live Mode (boolean)
- `lines.data[].metadata`: Metadata (an object whose keys vary)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_invoice_lines`

**List Invoice Lines (Agent).** Pages through the line items of a single Stripe invoice. Use when you need only the lines; the lines are also returned inline by Get Invoice. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice_id` | string | yes |  | Invoice ID. The invoice ID (e.g., in_...). Obtain it from List/Search Invoices. |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Line ID
- `data[].description`: Description
- `data[].amount`: Amount (number)
- `data[].currency`: Currency
- `data[].quantity`: Quantity (number)
- `data[].subtotal`: Subtotal (number)
- `data[].invoice`: Invoice
- `data[].period`: Period
- `data[].period.start`: Start (datetime)
- `data[].period.end`: End (datetime)
- `data[].discountable`: Discountable (boolean)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `create_invoice_item`

**Create Invoice Item (Agent).** Creates a pending invoice item for a customer that attaches to their next invoice, or to a specific invoice if one is given. Amount is in the smallest currency unit (e.g. cents) — pass a raw integer, not a decimal. Use to add ad-hoc charges before invoicing. Not idempotent: each call creates a new item. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | yes |  | Customer ID. The Stripe customer ID (e.g., cus_...). Obtain it from Search/List Customers. |
| `amount` | number | yes |  | Amount. The amount in the smallest currency unit (e.g., 1050 for $10.50). Raw integer, not a decimal. |
| `currency` | string | yes |  | Currency. The three-letter ISO currency code (e.g., usd). |
| `description` | string | no |  | Description. |
| `invoice` | string | no |  | Invoice ID. Attach to this specific draft invoice (in_...) instead of the next upcoming one. |
| `price` | string | no |  | Price ID. Use a price ID (price_...) instead of an ad-hoc amount. If set, leave Amount/Currency blank. |

Output fields:

- `id`: Invoice Item ID
- `amount`: Amount (number)
- `currency`: Currency
- `customer`: Customer
- `invoice`: Invoice
- `description`: Description
- `quantity`: Quantity (number)
- `date`: Date (datetime)
- `discountable`: Discountable (boolean)
- `proration`: Proration (boolean)
- `period`: Period
- `period.start`: Start (datetime)
- `period.end`: End (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `update_product`

**Update Product (Agent).** Updates a Stripe product (rename, change description/metadata, or set active=false to archive it). Archiving is the agent path to "delete" a product, since products with prices cannot be hard-deleted. Only the fields you supply change. Idempotent: re-applying the same update converges. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product ID (e.g., prod_...). Obtain it from List/Search Products. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `active` | boolean | no |  | Active. Set to false to archive the product. |
| `metadata` | JSON | no |  | Metadata. |

Output fields:

- `id`: Product ID
- `name`: Name
- `description`: Description
- `active`: Active (boolean)
- `default_price`: Default Price
- `images`: Images
- `url`: URL (url)
- `unit_label`: Unit Label
- `type`: Type
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `get_product`

**Get Product (Agent).** Fetches a single Stripe product by its product ID (e.g., prod_...). Use List/Search Products to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product ID (e.g., prod_...). Obtain it from List/Search Products. |

Output fields:

- `id`: Product ID
- `name`: Name
- `description`: Description
- `active`: Active (boolean)
- `default_price`: Default Price
- `images`: Images
- `url`: URL (url)
- `unit_label`: Unit Label
- `type`: Type
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_products`

**List Products (Agent).** Pages through products, newest first, optionally filtered by active status. Use to enumerate the catalog or resolve a product ID; for name matching use Search Products, or Get Product when you have the prod_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `active` | string | no |  | Active. Filter by active state. One of `"true"`, `"false"`. |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Product ID
- `data[].name`: Name
- `data[].description`: Description
- `data[].active`: Active (boolean)
- `data[].default_price`: Default Price
- `data[].images`: Images
- `data[].url`: URL (url)
- `data[].unit_label`: Unit Label
- `data[].type`: Type
- `data[].created`: Created (datetime)
- `data[].updated`: Updated (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `search_products`

**Search Products (Agent).** Searches products using the Stripe Search Query Language (e.g. "active:'true' AND name~'shirt'"). Use for name/metadata matching; use List Products for simple paging or Get Product when you have the prod_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. A Stripe search query (e.g. name~'shirt'). |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Results
- `data[].id`: Product ID
- `data[].name`: Name
- `data[].description`: Description
- `data[].active`: Active (boolean)
- `data[].default_price`: Default Price
- `data[].images`: Images
- `data[].url`: URL (url)
- `data[].unit_label`: Unit Label
- `data[].type`: Type
- `data[].created`: Created (datetime)
- `data[].updated`: Updated (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `next_page`: Next Page
- `url`: URL

### `update_price`

**Update Price (Agent).** Updates a Stripe price (set active=false to archive it, or edit its nickname/metadata). The unit amount is immutable — create a new price to change it. Only the fields you supply change. Idempotent: re-applying the same update converges. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `price_id` | string | yes |  | Price ID. The price ID (e.g., price_...). Obtain it from List/Search Prices. |
| `active` | boolean | no |  | Active. Set to false to archive the price. |
| `nickname` | string | no |  | Nickname. |
| `metadata` | JSON | no |  | Metadata. |

Output fields:

- `id`: Price ID
- `active`: Active (boolean)
- `currency`: Currency
- `product`: Product
- `nickname`: Nickname
- `unit_amount`: Unit Amount (number)
- `unit_amount_decimal`: Unit Amount Decimal
- `type`: Type
- `billing_scheme`: Billing Scheme
- `tax_behavior`: Tax Behavior
- `lookup_key`: Lookup Key
- `recurring`: Recurring
- `recurring.interval`: Interval
- `recurring.interval_count`: Interval Count (number)
- `recurring.trial_period_days`: Trial Period Days (number)
- `recurring.usage_type`: Usage Type
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `get_price`

**Get Price (Agent).** Fetches a single Stripe price by its price ID (e.g., price_...). Use List/Search Prices to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `price_id` | string | yes |  | Price ID. The price ID (e.g., price_...). Obtain it from List/Search Prices. |

Output fields:

- `id`: Price ID
- `active`: Active (boolean)
- `currency`: Currency
- `product`: Product
- `nickname`: Nickname
- `unit_amount`: Unit Amount (number)
- `unit_amount_decimal`: Unit Amount Decimal
- `type`: Type
- `billing_scheme`: Billing Scheme
- `tax_behavior`: Tax Behavior
- `lookup_key`: Lookup Key
- `recurring`: Recurring
- `recurring.interval`: Interval
- `recurring.interval_count`: Interval Count (number)
- `recurring.trial_period_days`: Trial Period Days (number)
- `recurring.usage_type`: Usage Type
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_prices`

**List Prices (Agent).** Pages through prices, newest first, optionally filtered by product, active state, type (one_time/recurring), or currency. Use to enumerate prices or resolve a price ID; for query matching use Search Prices, or Get Price when you have the price_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product` | string | no |  | Product ID. Filter to prices for this product (prod_...). |
| `active` | string | no |  | Active. One of `"true"`, `"false"`. |
| `type` | string | no |  | Type. One of `"one_time"`, `"recurring"`. |
| `currency` | string | no |  | Currency. Three-letter ISO currency code (e.g., usd). |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Price ID
- `data[].active`: Active (boolean)
- `data[].currency`: Currency
- `data[].product`: Product
- `data[].nickname`: Nickname
- `data[].unit_amount`: Unit Amount (number)
- `data[].unit_amount_decimal`: Unit Amount Decimal
- `data[].type`: Type
- `data[].billing_scheme`: Billing Scheme
- `data[].tax_behavior`: Tax Behavior
- `data[].lookup_key`: Lookup Key
- `data[].recurring`: Recurring
- `data[].recurring.interval`: Interval
- `data[].recurring.interval_count`: Interval Count (number)
- `data[].recurring.trial_period_days`: Trial Period Days (number)
- `data[].recurring.usage_type`: Usage Type
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `search_prices`

**Search Prices (Agent).** Searches prices using the Stripe Search Query Language (e.g. "active:'true' AND currency:'usd'"). Use for metadata/attribute matching; use List Prices for simple paging or Get Price when you have the price_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. A Stripe search query (e.g. lookup_key:'standard_monthly'). |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Results
- `data[].id`: Price ID
- `data[].active`: Active (boolean)
- `data[].currency`: Currency
- `data[].product`: Product
- `data[].nickname`: Nickname
- `data[].unit_amount`: Unit Amount (number)
- `data[].unit_amount_decimal`: Unit Amount Decimal
- `data[].type`: Type
- `data[].billing_scheme`: Billing Scheme
- `data[].tax_behavior`: Tax Behavior
- `data[].lookup_key`: Lookup Key
- `data[].recurring`: Recurring
- `data[].recurring.interval`: Interval
- `data[].recurring.interval_count`: Interval Count (number)
- `data[].recurring.trial_period_days`: Trial Period Days (number)
- `data[].recurring.usage_type`: Usage Type
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `next_page`: Next Page
- `url`: URL

### `update_subscription`

**Update Subscription (Agent).** Updates an existing subscription: change its items (price + quantity), proration behavior, metadata, or schedule cancellation at period end. To cancel outright use Cancel Subscription. Only the fields you supply change. Idempotent: re-applying the same update converges. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscription_id` | string | yes |  | Subscription ID. The subscription ID (e.g., sub_...). Obtain it from List/Search Subscriptions. |
| `items` | array | no |  | Items. New/updated items. To modify an existing item include its subscription-item id; to add one supply a price. Each item: { `id`?, `price`?, `quantity`? }. |
| `proration_behavior` | string | no |  | Proration Behavior. One of `"create_prorations"`, `"none"`, `"always_invoice"`. |
| `cancel_at_period_end` | boolean | no |  | Cancel at Period End. |
| `metadata` | JSON | no |  | Metadata. |

Output fields:

- `id`: Subscription ID
- `status`: Status
- `customer`: Customer
- `currency`: Currency
- `description`: Description
- `collection_method`: Collection Method
- `latest_invoice`: Latest Invoice
- `default_payment_method`: Default Payment Method
- `quantity`: Quantity (number)
- `start_date`: Start Date (datetime)
- `billing_cycle_anchor`: Billing Cycle Anchor (datetime)
- `cancel_at`: Cancel At (datetime)
- `canceled_at`: Canceled At (datetime)
- `cancel_at_period_end`: Cancel At Period End (boolean)
- `ended_at`: Ended At (datetime)
- `trial_start`: Trial Start (datetime)
- `trial_end`: Trial End (datetime)
- `items`: Items
- `items.data`: Data
- `items.data[].id`: Subscription Item ID
- `items.data[].quantity`: Quantity (number)
- `items.data[].subscription`: Subscription
- `items.data[].current_period_start`: Current Period Start (datetime)
- `items.data[].current_period_end`: Current Period End (datetime)
- `items.data[].price`: Price
- `items.data[].price.id`: Price ID
- `items.data[].price.active`: Active (boolean)
- `items.data[].price.currency`: Currency
- `items.data[].price.product`: Product
- `items.data[].price.nickname`: Nickname
- `items.data[].price.unit_amount`: Unit Amount (number)
- `items.data[].price.unit_amount_decimal`: Unit Amount Decimal
- `items.data[].price.type`: Type
- `items.data[].price.billing_scheme`: Billing Scheme
- `items.data[].price.tax_behavior`: Tax Behavior
- `items.data[].price.lookup_key`: Lookup Key
- `items.data[].price.recurring`: Recurring
- `items.data[].price.recurring.interval`: Interval
- `items.data[].price.recurring.interval_count`: Interval Count (number)
- `items.data[].price.recurring.trial_period_days`: Trial Period Days (number)
- `items.data[].price.recurring.usage_type`: Usage Type
- `items.data[].price.created`: Created (datetime)
- `items.data[].price.livemode`: Live Mode (boolean)
- `items.data[].price.metadata`: Metadata (an object whose keys vary)
- `items.data[].created`: Created (datetime)
- `items.data[].metadata`: Metadata (an object whose keys vary)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `get_subscription`

**Get Subscription (Agent).** Fetches a single Stripe subscription by its subscription ID (e.g., sub_...). Use List/Search Subscriptions to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscription_id` | string | yes |  | Subscription ID. The subscription ID (e.g., sub_...). Obtain it from List/Search Subscriptions. |

Output fields:

- `id`: Subscription ID
- `status`: Status
- `customer`: Customer
- `currency`: Currency
- `description`: Description
- `collection_method`: Collection Method
- `latest_invoice`: Latest Invoice
- `default_payment_method`: Default Payment Method
- `quantity`: Quantity (number)
- `start_date`: Start Date (datetime)
- `billing_cycle_anchor`: Billing Cycle Anchor (datetime)
- `cancel_at`: Cancel At (datetime)
- `canceled_at`: Canceled At (datetime)
- `cancel_at_period_end`: Cancel At Period End (boolean)
- `ended_at`: Ended At (datetime)
- `trial_start`: Trial Start (datetime)
- `trial_end`: Trial End (datetime)
- `items`: Items
- `items.data`: Data
- `items.data[].id`: Subscription Item ID
- `items.data[].quantity`: Quantity (number)
- `items.data[].subscription`: Subscription
- `items.data[].current_period_start`: Current Period Start (datetime)
- `items.data[].current_period_end`: Current Period End (datetime)
- `items.data[].price`: Price
- `items.data[].price.id`: Price ID
- `items.data[].price.active`: Active (boolean)
- `items.data[].price.currency`: Currency
- `items.data[].price.product`: Product
- `items.data[].price.nickname`: Nickname
- `items.data[].price.unit_amount`: Unit Amount (number)
- `items.data[].price.unit_amount_decimal`: Unit Amount Decimal
- `items.data[].price.type`: Type
- `items.data[].price.billing_scheme`: Billing Scheme
- `items.data[].price.tax_behavior`: Tax Behavior
- `items.data[].price.lookup_key`: Lookup Key
- `items.data[].price.recurring`: Recurring
- `items.data[].price.recurring.interval`: Interval
- `items.data[].price.recurring.interval_count`: Interval Count (number)
- `items.data[].price.recurring.trial_period_days`: Trial Period Days (number)
- `items.data[].price.recurring.usage_type`: Usage Type
- `items.data[].price.created`: Created (datetime)
- `items.data[].price.livemode`: Live Mode (boolean)
- `items.data[].price.metadata`: Metadata (an object whose keys vary)
- `items.data[].created`: Created (datetime)
- `items.data[].metadata`: Metadata (an object whose keys vary)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_subscriptions`

**List Subscriptions (Agent).** Pages through subscriptions, newest first, optionally filtered by customer, status, or price. Use to enumerate or audit a customer's subscriptions; for rich filters/customer-hydration use Search Subscriptions, or Get Subscription when you have the sub_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | no |  | Customer ID. Filter to subscriptions for this customer (cus_...). |
| `status` | string | no |  | Status. One of `"all"`, `"active"`, `"past_due"`, `"unpaid"`, `"canceled"`, `"incomplete"`, `"incomplete_expired"`, `"trialing"`, `"paused"`. |
| `price` | string | no |  | Price ID. Filter to subscriptions containing this price (price_...). |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Subscription ID
- `data[].status`: Status
- `data[].customer`: Customer
- `data[].currency`: Currency
- `data[].description`: Description
- `data[].collection_method`: Collection Method
- `data[].latest_invoice`: Latest Invoice
- `data[].default_payment_method`: Default Payment Method
- `data[].quantity`: Quantity (number)
- `data[].start_date`: Start Date (datetime)
- `data[].billing_cycle_anchor`: Billing Cycle Anchor (datetime)
- `data[].cancel_at`: Cancel At (datetime)
- `data[].canceled_at`: Canceled At (datetime)
- `data[].cancel_at_period_end`: Cancel At Period End (boolean)
- `data[].ended_at`: Ended At (datetime)
- `data[].trial_start`: Trial Start (datetime)
- `data[].trial_end`: Trial End (datetime)
- `data[].items`: Items
- `data[].items.data`: Data
- `data[].items.data[].id`: Subscription Item ID
- `data[].items.data[].quantity`: Quantity (number)
- `data[].items.data[].subscription`: Subscription
- `data[].items.data[].current_period_start`: Current Period Start (datetime)
- `data[].items.data[].current_period_end`: Current Period End (datetime)
- `data[].items.data[].price`: Price
- `data[].items.data[].price.id`: Price ID
- `data[].items.data[].price.active`: Active (boolean)
- `data[].items.data[].price.currency`: Currency
- `data[].items.data[].price.product`: Product
- `data[].items.data[].price.nickname`: Nickname
- `data[].items.data[].price.unit_amount`: Unit Amount (number)
- `data[].items.data[].price.unit_amount_decimal`: Unit Amount Decimal
- `data[].items.data[].price.type`: Type
- `data[].items.data[].price.billing_scheme`: Billing Scheme
- `data[].items.data[].price.tax_behavior`: Tax Behavior
- `data[].items.data[].price.lookup_key`: Lookup Key
- `data[].items.data[].price.recurring`: Recurring
- `data[].items.data[].price.recurring.interval`: Interval
- `data[].items.data[].price.recurring.interval_count`: Interval Count (number)
- `data[].items.data[].price.recurring.trial_period_days`: Trial Period Days (number)
- `data[].items.data[].price.recurring.usage_type`: Usage Type
- `data[].items.data[].price.created`: Created (datetime)
- `data[].items.data[].price.livemode`: Live Mode (boolean)
- `data[].items.data[].price.metadata`: Metadata (an object whose keys vary)
- `data[].items.data[].created`: Created (datetime)
- `data[].items.data[].metadata`: Metadata (an object whose keys vary)
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `list_subscription_items`

**List Subscription Items (Agent).** Pages through the items of a single subscription, returning the subscription-item IDs (si_...) needed to update quantity or report usage. Use before Update Subscription when modifying a specific item. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscription_id` | string | yes |  | Subscription ID. The subscription ID (e.g., sub_...). Obtain it from List/Search Subscriptions. |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Subscription Item ID
- `data[].quantity`: Quantity (number)
- `data[].subscription`: Subscription
- `data[].current_period_start`: Current Period Start (datetime)
- `data[].current_period_end`: Current Period End (datetime)
- `data[].price`: Price
- `data[].price.id`: Price ID
- `data[].price.active`: Active (boolean)
- `data[].price.currency`: Currency
- `data[].price.product`: Product
- `data[].price.nickname`: Nickname
- `data[].price.unit_amount`: Unit Amount (number)
- `data[].price.unit_amount_decimal`: Unit Amount Decimal
- `data[].price.type`: Type
- `data[].price.billing_scheme`: Billing Scheme
- `data[].price.tax_behavior`: Tax Behavior
- `data[].price.lookup_key`: Lookup Key
- `data[].price.recurring`: Recurring
- `data[].price.recurring.interval`: Interval
- `data[].price.recurring.interval_count`: Interval Count (number)
- `data[].price.recurring.trial_period_days`: Trial Period Days (number)
- `data[].price.recurring.usage_type`: Usage Type
- `data[].price.created`: Created (datetime)
- `data[].price.livemode`: Live Mode (boolean)
- `data[].price.metadata`: Metadata (an object whose keys vary)
- `data[].created`: Created (datetime)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `get_payment_link`

**Get Payment Link (Agent).** Fetches a single Stripe payment link by its ID (e.g., plink_...), including its URL, active state, and line items. Use List Payment Links to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_link_id` | string | yes |  | Payment Link ID. The payment link ID (e.g., plink_...). Obtain it from List Payment Links. |

Output fields:

- `id`: Payment Link ID
- `active`: Active (boolean)
- `url`: URL (url)
- `currency`: Currency
- `allow_promotion_codes`: Allow Promotion Codes (boolean)
- `billing_address_collection`: Billing Address Collection
- `customer_creation`: Customer Creation
- `payment_method_collection`: Payment Method Collection
- `submit_type`: Submit Type
- `application_fee_amount`: Application Fee Amount (number)
- `application_fee_percent`: Application Fee Percent (number)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_payment_links`

**List Payment Links (Agent).** Pages through payment links, optionally filtered by active state. Use to enumerate links or resolve a payment link ID; use Get Payment Link when you have the plink_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `active` | string | no |  | Active. One of `"true"`, `"false"`. |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Payment Link ID
- `data[].active`: Active (boolean)
- `data[].url`: URL (url)
- `data[].currency`: Currency
- `data[].allow_promotion_codes`: Allow Promotion Codes (boolean)
- `data[].billing_address_collection`: Billing Address Collection
- `data[].customer_creation`: Customer Creation
- `data[].payment_method_collection`: Payment Method Collection
- `data[].submit_type`: Submit Type
- `data[].application_fee_amount`: Application Fee Amount (number)
- `data[].application_fee_percent`: Application Fee Percent (number)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `create_checkout_session`

**Create Checkout Session (Agent).** Creates a Stripe-hosted Checkout Session for one-time payment, subscription, or setup mode, with line items (price IDs + quantities) and success/cancel URLs. Richer than a payment link for one-off flows; for a reusable shareable URL use Create Payment Link. Not idempotent: each call creates a new session. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mode` | string | yes |  | Mode. The Checkout mode. One of `"payment"`, `"subscription"`, `"setup"`. |
| `line_items` | array | no |  | Line Items. The prices and quantities. Required for payment and subscription modes. Each item: { `price`, `quantity` }. |
| `success_url` | string | no |  | Success URL. URL to redirect to after successful payment. |
| `cancel_url` | string | no |  | Cancel URL. URL to redirect to if the customer cancels. |
| `customer` | string | no |  | Customer ID. An existing customer (cus_...) to associate with the session. |

Output fields:

- `id`: Checkout Session ID
- `status`: Status
- `payment_status`: Payment Status
- `mode`: Mode
- `url`: URL (url)
- `success_url`: Success URL (url)
- `cancel_url`: Cancel URL (url)
- `amount_subtotal`: Amount Subtotal (number)
- `amount_total`: Amount Total (number)
- `currency`: Currency
- `customer`: Customer
- `customer_email`: Customer Email (email)
- `payment_intent`: Payment Intent
- `subscription`: Subscription
- `invoice`: Invoice
- `payment_link`: Payment Link
- `client_reference_id`: Client Reference ID
- `total_details`: Total Details
- `total_details.amount_discount`: Amount Discount (number)
- `total_details.amount_shipping`: Amount Shipping (number)
- `total_details.amount_tax`: Amount Tax (number)
- `expires_at`: Expires At (datetime)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `get_checkout_session`

**Get Checkout Session (Agent).** Fetches a single Checkout Session by its ID (e.g., cs_...), including payment status, customer, and amounts. Use List Checkout Sessions to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session_id` | string | yes |  | Session ID. The Checkout Session ID (e.g., cs_...). Obtain it from List Checkout Sessions. |

Output fields:

- `id`: Checkout Session ID
- `status`: Status
- `payment_status`: Payment Status
- `mode`: Mode
- `url`: URL (url)
- `success_url`: Success URL (url)
- `cancel_url`: Cancel URL (url)
- `amount_subtotal`: Amount Subtotal (number)
- `amount_total`: Amount Total (number)
- `currency`: Currency
- `customer`: Customer
- `customer_email`: Customer Email (email)
- `payment_intent`: Payment Intent
- `subscription`: Subscription
- `invoice`: Invoice
- `payment_link`: Payment Link
- `client_reference_id`: Client Reference ID
- `total_details`: Total Details
- `total_details.amount_discount`: Amount Discount (number)
- `total_details.amount_shipping`: Amount Shipping (number)
- `total_details.amount_tax`: Amount Tax (number)
- `expires_at`: Expires At (datetime)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_checkout_sessions`

**List Checkout Sessions (Agent).** Pages through Checkout Sessions, newest first, optionally filtered by customer, PaymentIntent, or status. Use to enumerate sessions or resolve a session ID; use Get Checkout Session when you have the cs_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | no |  | Customer ID. Filter to sessions for this customer (cus_...). |
| `payment_intent` | string | no |  | Payment Intent ID. Filter to the session for this PaymentIntent (pi_...). |
| `status` | string | no |  | Status. One of `"open"`, `"complete"`, `"expired"`. |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Checkout Session ID
- `data[].status`: Status
- `data[].payment_status`: Payment Status
- `data[].mode`: Mode
- `data[].url`: URL (url)
- `data[].success_url`: Success URL (url)
- `data[].cancel_url`: Cancel URL (url)
- `data[].amount_subtotal`: Amount Subtotal (number)
- `data[].amount_total`: Amount Total (number)
- `data[].currency`: Currency
- `data[].customer`: Customer
- `data[].customer_email`: Customer Email (email)
- `data[].payment_intent`: Payment Intent
- `data[].subscription`: Subscription
- `data[].invoice`: Invoice
- `data[].payment_link`: Payment Link
- `data[].client_reference_id`: Client Reference ID
- `data[].total_details`: Total Details
- `data[].total_details.amount_discount`: Amount Discount (number)
- `data[].total_details.amount_shipping`: Amount Shipping (number)
- `data[].total_details.amount_tax`: Amount Tax (number)
- `data[].expires_at`: Expires At (datetime)
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `create_payment_method`

**Create Payment Method (Agent).** Creates a Stripe PaymentMethod of the given type from a single-use token (e.g. tok_visa, or a token produced by Stripe.js), with optional billing details. NEVER pass raw card numbers — raw PAN entry is restricted to PCI-compliant integrations; supply a token instead. Use before Attach Payment Method. Not idempotent: each call creates a new PaymentMethod. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Type. The PaymentMethod type (e.g., card). |
| `token` | string | no |  | Card Token. A single-use card token (e.g., tok_visa or a Stripe.js token). Required for card type. Do NOT pass a raw card number. |
| `billing_name` | string | no |  | Billing Name. |
| `billing_email` | string | no |  | Billing Email. |

Output fields:

- `id`: Payment Method ID
- `type`: Type
- `customer`: Customer
- `billing_details`: Billing Details
- `billing_details.name`: Name
- `billing_details.email`: Email (email)
- `billing_details.phone`: Phone
- `billing_details.address`: Address
- `billing_details.address.line1`: Line 1
- `billing_details.address.line2`: Line 2
- `billing_details.address.city`: City
- `billing_details.address.state`: State
- `billing_details.address.postal_code`: Postal Code
- `billing_details.address.country`: Country
- `card`: Card
- `card.brand`: Brand
- `card.last4`: Last 4
- `card.exp_month`: Expiry Month (number)
- `card.exp_year`: Expiry Year (number)
- `card.funding`: Funding
- `card.country`: Country
- `card.display_brand`: Display Brand
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `attach_payment_method`

**Attach Payment Method (Agent).** Attaches a PaymentMethod to a customer so it can be charged off-session (e.g. for subscriptions or saved cards). Use after Create Payment Method. Idempotent: re-attaching the same PaymentMethod to the same customer is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_method_id` | string | yes |  | Payment Method ID. The PaymentMethod ID (e.g., pm_...) to attach. Obtain it from Create Payment Method or List Customer Payment Methods. |
| `customer` | string | yes |  | Customer ID. The customer ID (e.g., cus_...) to attach the PaymentMethod to. |

Output fields:

- `id`: Payment Method ID
- `type`: Type
- `customer`: Customer
- `billing_details`: Billing Details
- `billing_details.name`: Name
- `billing_details.email`: Email (email)
- `billing_details.phone`: Phone
- `billing_details.address`: Address
- `billing_details.address.line1`: Line 1
- `billing_details.address.line2`: Line 2
- `billing_details.address.city`: City
- `billing_details.address.state`: State
- `billing_details.address.postal_code`: Postal Code
- `billing_details.address.country`: Country
- `card`: Card
- `card.brand`: Brand
- `card.last4`: Last 4
- `card.exp_month`: Expiry Month (number)
- `card.exp_year`: Expiry Year (number)
- `card.funding`: Funding
- `card.country`: Country
- `card.display_brand`: Display Brand
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `get_payment_method`

**Get Payment Method (Agent).** Fetches a single PaymentMethod by its ID (e.g., pm_...), including type and (masked) card details. Use List Customer Payment Methods to discover a customer's PaymentMethod IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_method_id` | string | yes |  | Payment Method ID. The PaymentMethod ID (e.g., pm_...). Obtain it from List Customer Payment Methods. |

Output fields:

- `id`: Payment Method ID
- `type`: Type
- `customer`: Customer
- `billing_details`: Billing Details
- `billing_details.name`: Name
- `billing_details.email`: Email (email)
- `billing_details.phone`: Phone
- `billing_details.address`: Address
- `billing_details.address.line1`: Line 1
- `billing_details.address.line2`: Line 2
- `billing_details.address.city`: City
- `billing_details.address.state`: State
- `billing_details.address.postal_code`: Postal Code
- `billing_details.address.country`: Country
- `card`: Card
- `card.brand`: Brand
- `card.last4`: Last 4
- `card.exp_month`: Expiry Month (number)
- `card.exp_year`: Expiry Year (number)
- `card.funding`: Funding
- `card.country`: Country
- `card.display_brand`: Display Brand
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_customer_payment_methods`

**List Customer Payment Methods (Agent).** Pages through the PaymentMethods attached to a customer, returning the pm_ IDs you can charge off-session. Use to find a customer's saved card before creating a payment. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The customer ID (e.g., cus_...). Obtain it from Search/List Customers. |
| `type` | string | no |  | Type. Filter by PaymentMethod type (e.g., card). |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Payment Method ID
- `data[].type`: Type
- `data[].customer`: Customer
- `data[].billing_details`: Billing Details
- `data[].billing_details.name`: Name
- `data[].billing_details.email`: Email (email)
- `data[].billing_details.phone`: Phone
- `data[].billing_details.address`: Address
- `data[].billing_details.address.line1`: Line 1
- `data[].billing_details.address.line2`: Line 2
- `data[].billing_details.address.city`: City
- `data[].billing_details.address.state`: State
- `data[].billing_details.address.postal_code`: Postal Code
- `data[].billing_details.address.country`: Country
- `data[].card`: Card
- `data[].card.brand`: Brand
- `data[].card.last4`: Last 4
- `data[].card.exp_month`: Expiry Month (number)
- `data[].card.exp_year`: Expiry Year (number)
- `data[].card.funding`: Funding
- `data[].card.country`: Country
- `data[].card.display_brand`: Display Brand
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `create_coupon`

**Create Coupon (Agent).** Creates a discount coupon — either percent_off or amount_off (the latter requires a currency), with a duration of once, repeating (with duration_in_months), or forever. To expose it to customers wrap it in a Promotion Code. Not idempotent: each call creates a new coupon, and supplying a duplicate stable id returns a 409. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `percent_off` | number | no |  | Percent Off. Percentage discount (e.g., 25 for 25%). Use this OR Amount Off. |
| `amount_off` | number | no |  | Amount Off. Flat discount in the smallest currency unit (e.g., 500 for $5.00). Requires Currency. |
| `currency` | string | no |  | Currency. Three-letter ISO currency code. Required with Amount Off. |
| `duration` | string | yes |  | Duration. How long the discount applies. One of `"once"`, `"repeating"`, `"forever"`. |
| `duration_in_months` | number | no |  | Duration in Months. Number of months the discount lasts. Required if duration is repeating. |
| `name` | string | no |  | Name. Name shown to customers on invoices/receipts. |
| `id` | string | no |  | ID. A custom unique coupon ID. If omitted, Stripe generates one. Reusing an existing id returns an error. |

Output fields:

- `id`: Coupon ID
- `name`: Name
- `amount_off`: Amount Off (number)
- `percent_off`: Percent Off (number)
- `currency`: Currency
- `duration`: Duration
- `duration_in_months`: Duration In Months (number)
- `max_redemptions`: Max Redemptions (number)
- `times_redeemed`: Times Redeemed (number)
- `redeem_by`: Redeem By (datetime)
- `valid`: Valid (boolean)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `get_coupon`

**Get Coupon (Agent).** Fetches a single coupon by its ID. Use List Coupons to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `coupon_id` | string | yes |  | Coupon ID. The coupon ID. Obtain it from List Coupons. |

Output fields:

- `id`: Coupon ID
- `name`: Name
- `amount_off`: Amount Off (number)
- `percent_off`: Percent Off (number)
- `currency`: Currency
- `duration`: Duration
- `duration_in_months`: Duration In Months (number)
- `max_redemptions`: Max Redemptions (number)
- `times_redeemed`: Times Redeemed (number)
- `redeem_by`: Redeem By (datetime)
- `valid`: Valid (boolean)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_coupons`

**List Coupons (Agent).** Pages through coupons, newest first. Use to enumerate coupons or resolve a coupon ID; use Get Coupon when you have the ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Coupon ID
- `data[].name`: Name
- `data[].amount_off`: Amount Off (number)
- `data[].percent_off`: Percent Off (number)
- `data[].currency`: Currency
- `data[].duration`: Duration
- `data[].duration_in_months`: Duration In Months (number)
- `data[].max_redemptions`: Max Redemptions (number)
- `data[].times_redeemed`: Times Redeemed (number)
- `data[].redeem_by`: Redeem By (datetime)
- `data[].valid`: Valid (boolean)
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `create_promotion_code`

**Create Promotion Code (Agent).** Creates a customer-facing promotion code that maps to an existing coupon, with optional custom code string, customer restriction, max redemptions, and expiry. Create the coupon first with Create Coupon. Not idempotent: each call creates a new promotion code. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `coupon` | string | yes |  | Coupon ID. The coupon ID this promotion code applies. Obtain it from List Coupons or Create Coupon. |
| `code` | string | no |  | Code. The customer-facing code (e.g., SUMMER25). If omitted, Stripe generates one. |
| `customer` | string | no |  | Customer ID. Restrict the code to this customer (cus_...). |
| `max_redemptions` | number | no |  | Max Redemptions. Maximum number of times the code can be redeemed. |
| `expires_at` | ISO date-time string | no |  | Expires At. When the promotion code expires. |
| `active` | boolean | no |  | Active. |

Output fields:

- `id`: Promotion Code ID
- `code`: Code
- `active`: Active (boolean)
- `customer`: Customer
- `coupon`: Coupon
- `coupon.id`: Coupon ID
- `coupon.name`: Name
- `coupon.amount_off`: Amount Off (number)
- `coupon.percent_off`: Percent Off (number)
- `coupon.currency`: Currency
- `coupon.duration`: Duration
- `coupon.duration_in_months`: Duration In Months (number)
- `coupon.max_redemptions`: Max Redemptions (number)
- `coupon.times_redeemed`: Times Redeemed (number)
- `coupon.redeem_by`: Redeem By (datetime)
- `coupon.valid`: Valid (boolean)
- `coupon.created`: Created (datetime)
- `coupon.livemode`: Live Mode (boolean)
- `coupon.metadata`: Metadata (an object whose keys vary)
- `expires_at`: Expires At (datetime)
- `max_redemptions`: Max Redemptions (number)
- `times_redeemed`: Times Redeemed (number)
- `restrictions`: Restrictions
- `restrictions.first_time_transaction`: First Time Transaction (boolean)
- `restrictions.minimum_amount`: Minimum Amount (number)
- `restrictions.minimum_amount_currency`: Minimum Amount Currency
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `get_promotion_code`

**Get Promotion Code (Agent).** Fetches a single promotion code by its ID (e.g., promo_...). Use List Promotion Codes to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `promotion_code_id` | string | yes |  | Promotion Code ID. The promotion code ID (e.g., promo_...). Obtain it from List Promotion Codes. |

Output fields:

- `id`: Promotion Code ID
- `code`: Code
- `active`: Active (boolean)
- `customer`: Customer
- `coupon`: Coupon
- `coupon.id`: Coupon ID
- `coupon.name`: Name
- `coupon.amount_off`: Amount Off (number)
- `coupon.percent_off`: Percent Off (number)
- `coupon.currency`: Currency
- `coupon.duration`: Duration
- `coupon.duration_in_months`: Duration In Months (number)
- `coupon.max_redemptions`: Max Redemptions (number)
- `coupon.times_redeemed`: Times Redeemed (number)
- `coupon.redeem_by`: Redeem By (datetime)
- `coupon.valid`: Valid (boolean)
- `coupon.created`: Created (datetime)
- `coupon.livemode`: Live Mode (boolean)
- `coupon.metadata`: Metadata (an object whose keys vary)
- `expires_at`: Expires At (datetime)
- `max_redemptions`: Max Redemptions (number)
- `times_redeemed`: Times Redeemed (number)
- `restrictions`: Restrictions
- `restrictions.first_time_transaction`: First Time Transaction (boolean)
- `restrictions.minimum_amount`: Minimum Amount (number)
- `restrictions.minimum_amount_currency`: Minimum Amount Currency
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_promotion_codes`

**List Promotion Codes (Agent).** Pages through promotion codes, optionally filtered by coupon, active state, or the literal code string. Use to enumerate codes or resolve an ID; use Get Promotion Code when you have the promo_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `coupon` | string | no |  | Coupon ID. Filter to codes for this coupon. |
| `active` | string | no |  | Active. One of `"true"`, `"false"`. |
| `code` | string | no |  | Code. Filter to the literal code string (e.g., SUMMER25). |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Promotion Code ID
- `data[].code`: Code
- `data[].active`: Active (boolean)
- `data[].customer`: Customer
- `data[].coupon`: Coupon
- `data[].coupon.id`: Coupon ID
- `data[].coupon.name`: Name
- `data[].coupon.amount_off`: Amount Off (number)
- `data[].coupon.percent_off`: Percent Off (number)
- `data[].coupon.currency`: Currency
- `data[].coupon.duration`: Duration
- `data[].coupon.duration_in_months`: Duration In Months (number)
- `data[].coupon.max_redemptions`: Max Redemptions (number)
- `data[].coupon.times_redeemed`: Times Redeemed (number)
- `data[].coupon.redeem_by`: Redeem By (datetime)
- `data[].coupon.valid`: Valid (boolean)
- `data[].coupon.created`: Created (datetime)
- `data[].coupon.livemode`: Live Mode (boolean)
- `data[].coupon.metadata`: Metadata (an object whose keys vary)
- `data[].expires_at`: Expires At (datetime)
- `data[].max_redemptions`: Max Redemptions (number)
- `data[].times_redeemed`: Times Redeemed (number)
- `data[].restrictions`: Restrictions
- `data[].restrictions.first_time_transaction`: First Time Transaction (boolean)
- `data[].restrictions.minimum_amount`: Minimum Amount (number)
- `data[].restrictions.minimum_amount_currency`: Minimum Amount Currency
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `retrieve_balance`

**Retrieve Balance (Agent).** Fetches the current Stripe account balance, broken down into available and pending funds by currency. Use to check how much can be paid out. Read-only and idempotent; takes no parameters. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `available`: Available
- `available[].amount`: Amount (number)
- `available[].currency`: Currency
- `pending`: Pending
- `pending[].amount`: Amount (number)
- `pending[].currency`: Currency
- `livemode`: Live Mode (boolean)

### `list_balance_transactions`

**List Balance Transactions (Agent).** Pages through the balance-transaction ledger — every item that affected the account balance (charges, refunds, fees, payouts), newest first. Optionally filter by type, payout, or created range. Use to reconcile activity to a payout. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no |  | Type. Filter by transaction type (e.g., charge, refund, payout). |
| `payout` | string | no |  | Payout ID. Filter to transactions paid out in this payout (po_...). |
| `created_after` | ISO date-time string | no |  | Created After. |
| `created_before` | ISO date-time string | no |  | Created Before. |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Balance Transaction ID
- `data[].amount`: Amount (number)
- `data[].net`: Net (number)
- `data[].fee`: Fee (number)
- `data[].currency`: Currency
- `data[].status`: Status
- `data[].type`: Type
- `data[].description`: Description
- `data[].reporting_category`: Reporting Category
- `data[].source`: Source
- `data[].available_on`: Available On (datetime)
- `data[].created`: Created (datetime)
- `data[].fee_details`: Fee Details
- `data[].fee_details[].amount`: Amount (number)
- `data[].fee_details[].currency`: Currency
- `data[].fee_details[].type`: Type
- `data[].fee_details[].description`: Description
- `has_more`: Has More (boolean)
- `url`: URL

### `list_payouts`

**List Payouts (Agent).** Pages through payouts (funds sent to your bank account), newest first, optionally filtered by status or arrival date. Use to enumerate payouts or resolve a payout ID; use Get Payout when you have the po_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. One of `"pending"`, `"in_transit"`, `"paid"`, `"failed"`, `"canceled"`. |
| `arrival_date_after` | ISO date-time string | no |  | Arrival Date After. |
| `arrival_date_before` | ISO date-time string | no |  | Arrival Date Before. |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Payout ID
- `data[].amount`: Amount (number)
- `data[].currency`: Currency
- `data[].status`: Status
- `data[].type`: Type
- `data[].method`: Method
- `data[].automatic`: Automatic (boolean)
- `data[].arrival_date`: Arrival Date (datetime)
- `data[].balance_transaction`: Balance Transaction
- `data[].destination`: Destination
- `data[].description`: Description
- `data[].statement_descriptor`: Statement Descriptor
- `data[].source_type`: Source Type
- `data[].failure_code`: Failure Code
- `data[].failure_message`: Failure Message
- `data[].reconciliation_status`: Reconciliation Status
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `create_tax_rate`

**Create Tax Rate (Agent).** Creates a manual Stripe tax rate (a fixed percentage with a display name and inclusive/exclusive flag), for applying to invoices or subscriptions. This is the manual tax-rate object, not Stripe Tax automation. Not idempotent: each call creates a new tax rate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `display_name` | string | yes |  | Display Name. Name shown to customers (e.g., VAT). |
| `percentage` | number | yes |  | Percentage. The tax rate percentage (e.g., 20 for 20%). |
| `inclusive` | boolean | yes |  | Inclusive. Whether the tax is included in the price. |
| `jurisdiction` | string | no |  | Jurisdiction. Optional jurisdiction text (e.g., UK). |
| `country` | string | no |  | Country. Two-letter ISO country code. |

Output fields:

- `id`: Tax Rate ID
- `display_name`: Display Name
- `description`: Description
- `active`: Active (boolean)
- `percentage`: Percentage (number)
- `effective_percentage`: Effective Percentage (number)
- `inclusive`: Inclusive (boolean)
- `country`: Country
- `state`: State
- `jurisdiction`: Jurisdiction
- `tax_type`: Tax Type
- `rate_type`: Rate Type
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `get_tax_rate`

**Get Tax Rate (Agent).** Fetches a single tax rate by its ID (e.g., txr_...). Use List Tax Rates to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tax_rate_id` | string | yes |  | Tax Rate ID. The tax rate ID (e.g., txr_...). Obtain it from List Tax Rates. |

Output fields:

- `id`: Tax Rate ID
- `display_name`: Display Name
- `description`: Description
- `active`: Active (boolean)
- `percentage`: Percentage (number)
- `effective_percentage`: Effective Percentage (number)
- `inclusive`: Inclusive (boolean)
- `country`: Country
- `state`: State
- `jurisdiction`: Jurisdiction
- `tax_type`: Tax Type
- `rate_type`: Rate Type
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_tax_rates`

**List Tax Rates (Agent).** Pages through tax rates, optionally filtered by active or inclusive flags. Use to enumerate tax rates or resolve a tax rate ID; use Get Tax Rate when you have the txr_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `active` | string | no |  | Active. One of `"true"`, `"false"`. |
| `inclusive` | string | no |  | Inclusive. One of `"true"`, `"false"`. |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Tax Rate ID
- `data[].display_name`: Display Name
- `data[].description`: Description
- `data[].active`: Active (boolean)
- `data[].percentage`: Percentage (number)
- `data[].effective_percentage`: Effective Percentage (number)
- `data[].inclusive`: Inclusive (boolean)
- `data[].country`: Country
- `data[].state`: State
- `data[].jurisdiction`: Jurisdiction
- `data[].tax_type`: Tax Type
- `data[].rate_type`: Rate Type
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `create_credit_note`

**Create Credit Note (Agent).** Issues a credit note against a finalized invoice — a post-payment adjustment (credit, refund, or out-of-band amount). Supply either a total credit_amount or itemized lines (in the smallest currency unit). The invoice must already be finalized. Not idempotent: each call creates a new credit note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice` | string | yes |  | Invoice ID. The finalized invoice ID (e.g., in_...) to credit. Obtain it from List/Search Invoices. |
| `amount` | number | yes |  | Amount. Total amount of the credit note, in the smallest currency unit (e.g., 500 for $5.00). Stripe requires this (or itemized lines); it must not exceed the invoice total. By default the full amount credits the customer balance unless you also set Credit Amount / Refund Amount to split it. |
| `credit_amount` | number | no |  | Credit Amount. The amount to credit to the customer balance, in the smallest currency unit (e.g., 500 for $5.00). |
| `refund_amount` | number | no |  | Refund Amount. The amount to refund, in the smallest currency unit. Refunds against the original payment. |
| `reason` | string | no |  | Reason. One of `"duplicate"`, `"fraudulent"`, `"order_change"`, `"product_unsatisfactory"`. |
| `memo` | string | no |  | Memo. |

Output fields:

- `id`: Credit Note ID
- `number`: Number
- `amount`: Amount (number)
- `currency`: Currency
- `status`: Status
- `type`: Type
- `reason`: Reason
- `customer`: Customer
- `invoice`: Invoice
- `memo`: Memo
- `subtotal`: Subtotal (number)
- `subtotal_excluding_tax`: Subtotal Excluding Tax (number)
- `total`: Total (number)
- `total_excluding_tax`: Total Excluding Tax (number)
- `discount_amount`: Discount Amount (number)
- `pre_payment_amount`: Pre-Payment Amount (number)
- `post_payment_amount`: Post-Payment Amount (number)
- `pdf`: PDF (url)
- `created`: Created (datetime)
- `effective_at`: Effective At (datetime)
- `voided_at`: Voided At (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `void_credit_note`

**Void Credit Note (Agent).** Voids a Stripe credit note, reversing the credit/refund it represented. Not idempotent: it errors if the credit note is already void. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `credit_note_id` | string | yes |  | Credit Note ID. The credit note ID (e.g., cn_...). Obtain it from List Credit Notes. |

Output fields:

- `id`: Credit Note ID
- `number`: Number
- `amount`: Amount (number)
- `currency`: Currency
- `status`: Status
- `type`: Type
- `reason`: Reason
- `customer`: Customer
- `invoice`: Invoice
- `memo`: Memo
- `subtotal`: Subtotal (number)
- `subtotal_excluding_tax`: Subtotal Excluding Tax (number)
- `total`: Total (number)
- `total_excluding_tax`: Total Excluding Tax (number)
- `discount_amount`: Discount Amount (number)
- `pre_payment_amount`: Pre-Payment Amount (number)
- `post_payment_amount`: Post-Payment Amount (number)
- `pdf`: PDF (url)
- `created`: Created (datetime)
- `effective_at`: Effective At (datetime)
- `voided_at`: Voided At (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `get_credit_note`

**Get Credit Note (Agent).** Fetches a single credit note by its ID (e.g., cn_...), including its line items. Use List Credit Notes to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `credit_note_id` | string | yes |  | Credit Note ID. The credit note ID (e.g., cn_...). Obtain it from List Credit Notes. |

Output fields:

- `id`: Credit Note ID
- `number`: Number
- `amount`: Amount (number)
- `currency`: Currency
- `status`: Status
- `type`: Type
- `reason`: Reason
- `customer`: Customer
- `invoice`: Invoice
- `memo`: Memo
- `subtotal`: Subtotal (number)
- `subtotal_excluding_tax`: Subtotal Excluding Tax (number)
- `total`: Total (number)
- `total_excluding_tax`: Total Excluding Tax (number)
- `discount_amount`: Discount Amount (number)
- `pre_payment_amount`: Pre-Payment Amount (number)
- `post_payment_amount`: Post-Payment Amount (number)
- `pdf`: PDF (url)
- `created`: Created (datetime)
- `effective_at`: Effective At (datetime)
- `voided_at`: Voided At (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_credit_notes`

**List Credit Notes (Agent).** Pages through credit notes, newest first, optionally filtered by invoice or customer. Use to enumerate credit notes or resolve a credit note ID; use Get Credit Note when you have the cn_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice` | string | no |  | Invoice ID. Filter to credit notes for this invoice (in_...). |
| `customer` | string | no |  | Customer ID. Filter to credit notes for this customer (cus_...). |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Credit Note ID
- `data[].number`: Number
- `data[].amount`: Amount (number)
- `data[].currency`: Currency
- `data[].status`: Status
- `data[].type`: Type
- `data[].reason`: Reason
- `data[].customer`: Customer
- `data[].invoice`: Invoice
- `data[].memo`: Memo
- `data[].subtotal`: Subtotal (number)
- `data[].subtotal_excluding_tax`: Subtotal Excluding Tax (number)
- `data[].total`: Total (number)
- `data[].total_excluding_tax`: Total Excluding Tax (number)
- `data[].discount_amount`: Discount Amount (number)
- `data[].pre_payment_amount`: Pre-Payment Amount (number)
- `data[].post_payment_amount`: Post-Payment Amount (number)
- `data[].pdf`: PDF (url)
- `data[].created`: Created (datetime)
- `data[].effective_at`: Effective At (datetime)
- `data[].voided_at`: Voided At (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `list_events`

**List Events (Agent).** Pages through the account event log (the audit feed of everything that happened), newest first, optionally filtered by event type (e.g. invoice.paid) or created range. Use to investigate what happened to a resource. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no |  | Type. Filter by event type (e.g., invoice.paid, charge.refunded). |
| `created_after` | ISO date-time string | no |  | Created After. |
| `created_before` | ISO date-time string | no |  | Created Before. |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Event ID
- `data[].type`: Type
- `data[].api_version`: API Version
- `data[].created`: Created (datetime)
- `data[].pending_webhooks`: Pending Webhooks (number)
- `data[].request`: Request
- `data[].request.id`: Request ID
- `data[].request.idempotency_key`: Idempotency Key
- `data[].data`: Data
- `data[].data.object`: Object
- `data[].livemode`: Live Mode (boolean)
- `has_more`: Has More (boolean)
- `url`: URL

### `get_event`

**Get Event (Agent).** Fetches a single Stripe event by its ID (e.g., evt_...), including the object snapshot it carried. Use List Events or a webhook payload to obtain the ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event_id` | string | yes |  | Event ID. The event ID (e.g., evt_...). Obtain it from List Events or a webhook payload. |

Output fields:

- `id`: Event ID
- `type`: Type
- `api_version`: API Version
- `created`: Created (datetime)
- `pending_webhooks`: Pending Webhooks (number)
- `request`: Request
- `request.id`: Request ID
- `request.idempotency_key`: Idempotency Key
- `data`: Data
- `data.object`: Object
- `livemode`: Live Mode (boolean)

### `get_dispute`

**Get Dispute (Agent).** Fetches a single Stripe dispute (chargeback) by its ID (e.g., dp_...), including its status, reason, and evidence due date. Use List Disputes to discover IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dispute_id` | string | yes |  | Dispute ID. The dispute ID (e.g., dp_...). Obtain it from List Disputes. |

Output fields:

- `id`: Dispute ID
- `amount`: Amount (number)
- `currency`: Currency
- `status`: Status
- `reason`: Reason
- `charge`: Charge
- `payment_intent`: Payment Intent
- `balance_transaction`: Balance Transaction
- `is_charge_refundable`: Is Charge Refundable (boolean)
- `evidence_details`: Evidence Details
- `evidence_details.due_by`: Due By (datetime)
- `evidence_details.has_evidence`: Has Evidence (boolean)
- `evidence_details.past_due`: Past Due (boolean)
- `evidence_details.submission_count`: Submission Count (number)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `list_disputes`

**List Disputes (Agent).** Pages through disputes (chargebacks), newest first, optionally filtered by charge, PaymentIntent, or created range. Use to enumerate disputes or resolve a dispute ID; use Get Dispute when you have the dp_ ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `charge` | string | no |  | Charge ID. Filter to disputes for this charge (ch_...). |
| `payment_intent` | string | no |  | Payment Intent ID. Filter to disputes for this PaymentIntent (pi_...). |
| `created_after` | ISO date-time string | no |  | Created After. |
| `created_before` | ISO date-time string | no |  | Created Before. |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Dispute ID
- `data[].amount`: Amount (number)
- `data[].currency`: Currency
- `data[].status`: Status
- `data[].reason`: Reason
- `data[].charge`: Charge
- `data[].payment_intent`: Payment Intent
- `data[].balance_transaction`: Balance Transaction
- `data[].is_charge_refundable`: Is Charge Refundable (boolean)
- `data[].evidence_details`: Evidence Details
- `data[].evidence_details.due_by`: Due By (datetime)
- `data[].evidence_details.has_evidence`: Has Evidence (boolean)
- `data[].evidence_details.past_due`: Past Due (boolean)
- `data[].evidence_details.submission_count`: Submission Count (number)
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `list_transfers`

**List Transfers (Agent).** Pages through transfers to connected accounts, newest first, optionally filtered by destination. Stripe Connect platforms only — on a standard (non-Connect) account this returns an empty list, which is expected, not an error. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `destination` | string | no |  | Destination Account ID. Filter to transfers to this connected account (acct_...). |
| `limit` | number | no |  | Limit. Number to return (1-100, default 10). |

Output fields:

- `data`: Data
- `data[].id`: Transfer ID
- `data[].amount`: Amount (number)
- `data[].amount_reversed`: Amount Reversed (number)
- `data[].currency`: Currency
- `data[].description`: Description
- `data[].destination`: Destination
- `data[].source_transaction`: Source Transaction
- `data[].transfer_group`: Transfer Group
- `data[].reversed`: Reversed (boolean)
- `data[].balance_transaction`: Balance Transaction
- `data[].created`: Created (datetime)
- `data[].livemode`: Live Mode (boolean)
- `data[].metadata`: Metadata (an object whose keys vary)
- `has_more`: Has More (boolean)
- `url`: URL

### `update_dispute`

**Update Dispute (Agent).** Submits or updates evidence and metadata on a Stripe dispute (chargeback) to contest it. Set submit=true to finalize and submit the evidence to the bank — once submitted, evidence can no longer be changed. Prefer this (contest with evidence) over Close Dispute (which concedes). Idempotent for metadata/evidence edits; submitting is a one-way action. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dispute_id` | string | yes |  | Dispute ID. The dispute ID (e.g., dp_...). Obtain it from List Disputes. |
| `evidence` | JSON | no |  | Evidence. A Stripe dispute evidence object (e.g., {"product_description":"...","customer_name":"..."}). |
| `submit` | boolean | no |  | Submit. If true, finalizes and submits the evidence to the bank. This cannot be undone. |
| `metadata` | JSON | no |  | Metadata. |

Output fields:

- `id`: Dispute ID
- `amount`: Amount (number)
- `currency`: Currency
- `status`: Status
- `reason`: Reason
- `charge`: Charge
- `payment_intent`: Payment Intent
- `balance_transaction`: Balance Transaction
- `is_charge_refundable`: Is Charge Refundable (boolean)
- `evidence_details`: Evidence Details
- `evidence_details.due_by`: Due By (datetime)
- `evidence_details.has_evidence`: Has Evidence (boolean)
- `evidence_details.past_due`: Past Due (boolean)
- `evidence_details.submission_count`: Submission Count (number)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

### `close_dispute`

**Close Dispute (Agent).** DESTRUCTIVE AND IRREVERSIBLE: closing a dispute concedes the chargeback and permanently forfeits the disputed funds — the money is lost and cannot be recovered. Almost always prefer Update Dispute (submit evidence to contest) instead. Only use when you explicitly intend to give up the dispute. Not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dispute_id` | string | yes |  | Dispute ID. The dispute ID (e.g., dp_...) to concede. Obtain it from List Disputes. |

Output fields:

- `id`: Dispute ID
- `amount`: Amount (number)
- `currency`: Currency
- `status`: Status
- `reason`: Reason
- `charge`: Charge
- `payment_intent`: Payment Intent
- `balance_transaction`: Balance Transaction
- `is_charge_refundable`: Is Charge Refundable (boolean)
- `evidence_details`: Evidence Details
- `evidence_details.due_by`: Due By (datetime)
- `evidence_details.has_evidence`: Has Evidence (boolean)
- `evidence_details.past_due`: Past Due (boolean)
- `evidence_details.submission_count`: Submission Count (number)
- `created`: Created (datetime)
- `livemode`: Live Mode (boolean)
- `metadata`: Metadata (an object whose keys vary)

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

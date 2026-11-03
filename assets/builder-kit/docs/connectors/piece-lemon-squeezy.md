# Lemon Squeezy

Lemon Squeezy is a payment gateway for e-commerce and subscription-based businesses.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-lemon-squeezy'
  version: '0.3.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API Key:
>
> 1. Go to your Lemon Squeezy dashboard
> 2. Navigate to Settings » API
> 3. Create a new API key
> 4. Copy the API key and paste it here
>
> Keys created in test mode only see test-mode data, and webhooks for this connection are created in the same mode.

## Actions

### `list_products`

**List Products.** List products from Lemon Squeezy, optionally scoped to one store (leave the store empty to span all stores) with page-based pagination. Use to enumerate a catalog or look up products before referencing a variant in a checkout. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | no |  | Store. Filter products by store. Leave empty to return products from all stores. A value the product loads from the provider, such as an id; write the value itself. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of products to return per page (1–100). Default is 10. |

Output fields:

- `meta`: Meta
- `meta.page`: Page
- `meta.page.currentPage`: Current Page (number)
- `meta.page.from`: From (number)
- `meta.page.lastPage`: Last Page (number)
- `meta.page.perPage`: Per Page (number)
- `meta.page.to`: To (number)
- `meta.page.total`: Total (number)
- `data`: Data
- `data[].type`: Type
- `data[].id`: ID
- `data[].attributes`: Attributes
- `data[].attributes.store_id`: Store ID (number)
- `data[].attributes.name`: Name
- `data[].attributes.slug`: Slug
- `data[].attributes.description`: Description (html)
- `data[].attributes.status`: Status
- `data[].attributes.status_formatted`: Status (Formatted)
- `data[].attributes.thumb_url`: Thumbnail URL (image)
- `data[].attributes.large_thumb_url`: Large Thumbnail URL (image)
- `data[].attributes.price`: Price (number)
- `data[].attributes.price_formatted`: Price (Formatted)
- `data[].attributes.from_price`: From Price (number)
- `data[].attributes.to_price`: To Price (number)
- `data[].attributes.pay_what_you_want`: Pay What You Want (boolean)
- `data[].attributes.buy_now_url`: Buy Now URL (url)
- `data[].attributes.created_at`: Created At (datetime)
- `data[].attributes.updated_at`: Updated At (datetime)
- `data[].attributes.test_mode`: Test Mode (boolean)

### `list_orders`

**List Orders.** List orders from Lemon Squeezy, optionally narrowed by store (empty store spans all stores), customer email, and order status (pending, paid, refunded, etc.), with page-based pagination. Use to find or audit orders by criteria; pair with Get Order for full detail on a single order. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | no |  | Store. Filter orders by store. Leave empty to return orders from all stores. A value the product loads from the provider, such as an id; write the value itself. |
| `userEmail` | string | no |  | Customer Email. Filter orders by customer email address. |
| `status` | string | no |  | Order Status. Filter orders by status. One of `""`, `"pending"`, `"failed"`, `"paid"`, `"refunded"`, `"partial_refund"`, `"chargedback"`. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of orders to return per page (1–100). Default is 10. |

Output fields:

- `meta`: Meta
- `meta.page`: Page
- `meta.page.currentPage`: Current Page (number)
- `meta.page.from`: From (number)
- `meta.page.lastPage`: Last Page (number)
- `meta.page.perPage`: Per Page (number)
- `meta.page.to`: To (number)
- `meta.page.total`: Total (number)
- `data`: Data
- `data[].type`: Type
- `data[].id`: ID
- `data[].attributes`: Attributes
- `data[].attributes.store_id`: Store ID (number)
- `data[].attributes.customer_id`: Customer ID (number)
- `data[].attributes.identifier`: Identifier
- `data[].attributes.order_number`: Order Number (number)
- `data[].attributes.user_name`: Customer Name
- `data[].attributes.user_email`: Customer Email (email)
- `data[].attributes.currency`: Currency
- `data[].attributes.currency_rate`: Currency Rate
- `data[].attributes.subtotal`: Subtotal (number)
- `data[].attributes.setup_fee`: Setup Fee (number)
- `data[].attributes.discount_total`: Discount Total (number)
- `data[].attributes.tax`: Tax (number)
- `data[].attributes.total`: Total (number)
- `data[].attributes.refunded_amount`: Refunded Amount (number)
- `data[].attributes.subtotal_usd`: Subtotal (USD cents) (number)
- `data[].attributes.discount_total_usd`: Discount Total (USD cents) (number)
- `data[].attributes.tax_usd`: Tax (USD cents) (number)
- `data[].attributes.total_usd`: Total (USD cents) (number)
- `data[].attributes.refunded_amount_usd`: Refunded Amount (USD cents) (number)
- `data[].attributes.setup_fee_usd`: Setup Fee (USD cents) (number)
- `data[].attributes.setup_fee_formatted`: Setup Fee (Formatted)
- `data[].attributes.affiliate_id`: Affiliate ID (number)
- `data[].attributes.referral_amount`: Referral Amount (number)
- `data[].attributes.tax_name`: Tax Name
- `data[].attributes.tax_rate`: Tax Rate
- `data[].attributes.tax_inclusive`: Tax Inclusive (boolean)
- `data[].attributes.status`: Status
- `data[].attributes.status_formatted`: Status (Formatted)
- `data[].attributes.refunded`: Refunded (boolean)
- `data[].attributes.refunded_at`: Refunded At (datetime)
- `data[].attributes.subtotal_formatted`: Subtotal (Formatted)
- `data[].attributes.discount_total_formatted`: Discount Total (Formatted)
- `data[].attributes.tax_formatted`: Tax (Formatted)
- `data[].attributes.total_formatted`: Total (Formatted)
- `data[].attributes.refunded_amount_formatted`: Refunded Amount (Formatted)
- `data[].attributes.created_at`: Created At (datetime)
- `data[].attributes.updated_at`: Updated At (datetime)
- `data[].attributes.test_mode`: Test Mode (boolean)
- `data[].attributes.first_order_item`: First Order Item
- `data[].attributes.first_order_item.id`: ID (number)
- `data[].attributes.first_order_item.order_id`: Order ID (number)
- `data[].attributes.first_order_item.product_id`: Product ID (number)
- `data[].attributes.first_order_item.variant_id`: Variant ID (number)
- `data[].attributes.first_order_item.price_id`: Price ID (number)
- `data[].attributes.first_order_item.product_name`: Product Name
- `data[].attributes.first_order_item.variant_name`: Variant Name
- `data[].attributes.first_order_item.price`: Price (number)
- `data[].attributes.first_order_item.quantity`: Quantity (number)
- `data[].attributes.first_order_item.created_at`: Created At (datetime)
- `data[].attributes.first_order_item.updated_at`: Updated At (datetime)
- `data[].attributes.first_order_item.test_mode`: Test Mode (boolean)
- `data[].attributes.urls`: URLs
- `data[].attributes.urls.receipt`: Receipt (url)

### `get_order`

**Get Order.** Retrieve the details of a specific order by its ID. Needs authentication.

Kind: read.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | string | yes |  | Order. The order to retrieve (the list shows up to 1,000 orders). A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `data`: Data
- `data.type`: Type
- `data.id`: ID
- `data.attributes`: Attributes
- `data.attributes.store_id`: Store ID (number)
- `data.attributes.customer_id`: Customer ID (number)
- `data.attributes.identifier`: Identifier
- `data.attributes.order_number`: Order Number (number)
- `data.attributes.user_name`: Customer Name
- `data.attributes.user_email`: Customer Email (email)
- `data.attributes.currency`: Currency
- `data.attributes.currency_rate`: Currency Rate
- `data.attributes.subtotal`: Subtotal (number)
- `data.attributes.setup_fee`: Setup Fee (number)
- `data.attributes.discount_total`: Discount Total (number)
- `data.attributes.tax`: Tax (number)
- `data.attributes.total`: Total (number)
- `data.attributes.refunded_amount`: Refunded Amount (number)
- `data.attributes.subtotal_usd`: Subtotal (USD cents) (number)
- `data.attributes.discount_total_usd`: Discount Total (USD cents) (number)
- `data.attributes.tax_usd`: Tax (USD cents) (number)
- `data.attributes.total_usd`: Total (USD cents) (number)
- `data.attributes.refunded_amount_usd`: Refunded Amount (USD cents) (number)
- `data.attributes.setup_fee_usd`: Setup Fee (USD cents) (number)
- `data.attributes.setup_fee_formatted`: Setup Fee (Formatted)
- `data.attributes.affiliate_id`: Affiliate ID (number)
- `data.attributes.referral_amount`: Referral Amount (number)
- `data.attributes.tax_name`: Tax Name
- `data.attributes.tax_rate`: Tax Rate
- `data.attributes.tax_inclusive`: Tax Inclusive (boolean)
- `data.attributes.status`: Status
- `data.attributes.status_formatted`: Status (Formatted)
- `data.attributes.refunded`: Refunded (boolean)
- `data.attributes.refunded_at`: Refunded At (datetime)
- `data.attributes.subtotal_formatted`: Subtotal (Formatted)
- `data.attributes.discount_total_formatted`: Discount Total (Formatted)
- `data.attributes.tax_formatted`: Tax (Formatted)
- `data.attributes.total_formatted`: Total (Formatted)
- `data.attributes.refunded_amount_formatted`: Refunded Amount (Formatted)
- `data.attributes.created_at`: Created At (datetime)
- `data.attributes.updated_at`: Updated At (datetime)
- `data.attributes.test_mode`: Test Mode (boolean)
- `data.attributes.first_order_item`: First Order Item
- `data.attributes.first_order_item.id`: ID (number)
- `data.attributes.first_order_item.order_id`: Order ID (number)
- `data.attributes.first_order_item.product_id`: Product ID (number)
- `data.attributes.first_order_item.variant_id`: Variant ID (number)
- `data.attributes.first_order_item.price_id`: Price ID (number)
- `data.attributes.first_order_item.product_name`: Product Name
- `data.attributes.first_order_item.variant_name`: Variant Name
- `data.attributes.first_order_item.price`: Price (number)
- `data.attributes.first_order_item.quantity`: Quantity (number)
- `data.attributes.first_order_item.created_at`: Created At (datetime)
- `data.attributes.first_order_item.updated_at`: Updated At (datetime)
- `data.attributes.first_order_item.test_mode`: Test Mode (boolean)
- `data.attributes.urls`: URLs
- `data.attributes.urls.receipt`: Receipt (url)

### `list_subscriptions`

**List Subscriptions.** Retrieve a paginated list of subscriptions from your Lemon Squeezy store. Needs authentication.

Kind: search.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | no |  | Store. Filter subscriptions by store. A value the product loads from the provider, such as an id; write the value itself. |
| `orderId` | string | no |  | Order. Filter subscriptions by order. A value the product loads from the provider, such as an id; write the value itself. |
| `orderItemId` | string | no |  | Order Item ID. Filter subscriptions by a specific order item ID. |
| `productId` | string | no |  | Product. Filter subscriptions by product. A value the product loads from the provider, such as an id; write the value itself. |
| `variantId` | string | no |  | Variant. Filter subscriptions by variant. A value the product loads from the provider, such as an id; write the value itself. |
| `userEmail` | string | no |  | Customer Email. Filter subscriptions by customer email address. |
| `status` | string | no |  | Subscription Status. Filter subscriptions by status. One of `""`, `"on_trial"`, `"active"`, `"paused"`, `"past_due"`, `"unpaid"`, `"cancelled"`, `"expired"`. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of subscriptions to return per page (1–100). Default is 10. |

Output fields:

- `meta`: Meta
- `meta.page`: Page
- `meta.page.currentPage`: Current Page (number)
- `meta.page.from`: From (number)
- `meta.page.lastPage`: Last Page (number)
- `meta.page.perPage`: Per Page (number)
- `meta.page.to`: To (number)
- `meta.page.total`: Total (number)
- `data`: Data
- `data[].type`: Type
- `data[].id`: ID
- `data[].attributes`: Attributes
- `data[].attributes.store_id`: Store ID (number)
- `data[].attributes.customer_id`: Customer ID (number)
- `data[].attributes.order_id`: Order ID (number)
- `data[].attributes.order_item_id`: Order Item ID (number)
- `data[].attributes.product_id`: Product ID (number)
- `data[].attributes.variant_id`: Variant ID (number)
- `data[].attributes.product_name`: Product Name
- `data[].attributes.variant_name`: Variant Name
- `data[].attributes.user_name`: Customer Name
- `data[].attributes.user_email`: Customer Email (email)
- `data[].attributes.status`: Status
- `data[].attributes.status_formatted`: Status (Formatted)
- `data[].attributes.card_brand`: Card Brand
- `data[].attributes.card_last_four`: Card Last Four
- `data[].attributes.payment_processor`: Payment Processor
- `data[].attributes.cancelled`: Cancelled (boolean)
- `data[].attributes.trial_ends_at`: Trial Ends At (datetime)
- `data[].attributes.billing_anchor`: Billing Anchor (day of month) (number)
- `data[].attributes.renews_at`: Renews At (datetime)
- `data[].attributes.ends_at`: Ends At (datetime)
- `data[].attributes.created_at`: Created At (datetime)
- `data[].attributes.updated_at`: Updated At (datetime)
- `data[].attributes.test_mode`: Test Mode (boolean)
- `data[].attributes.pause`: Pause
- `data[].attributes.pause.mode`: Mode
- `data[].attributes.pause.resumes_at`: Resumes At (datetime)
- `data[].attributes.first_subscription_item`: First Subscription Item
- `data[].attributes.first_subscription_item.id`: ID (number)
- `data[].attributes.first_subscription_item.subscription_id`: Subscription ID (number)
- `data[].attributes.first_subscription_item.price_id`: Price ID (number)
- `data[].attributes.first_subscription_item.quantity`: Quantity (number)
- `data[].attributes.first_subscription_item.is_usage_based`: Is Usage Based (boolean)
- `data[].attributes.first_subscription_item.created_at`: Created At (datetime)
- `data[].attributes.first_subscription_item.updated_at`: Updated At (datetime)
- `data[].attributes.urls`: URLs
- `data[].attributes.urls.update_payment_method`: Update Payment Method (url)
- `data[].attributes.urls.customer_portal`: Customer Portal (url)
- `data[].attributes.urls.customer_portal_update_subscription`: Customer Portal (Update Subscription) (url)

### `create_checkout`

**Create Checkout.** Create a hosted Lemon Squeezy checkout URL for a given store and product variant, optionally pre-filling customer email/name, applying a discount code, overriding the price, attaching custom data, or setting a redirect and expiry. Use to generate a payable link to send a customer. Not idempotent: each call creates a new checkout, so repeated calls yield distinct URLs. Requires a store and variant ID. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Store. The store the checkout belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `productId` | string | no |  | Product. Select a product to filter the variant list below. A value the product loads from the provider, such as an id; write the value itself. |
| `variantId` | string | yes |  | Variant. The product variant to create a checkout for. A value the product loads from the provider, such as an id; write the value itself. |
| `customerEmail` | string | no |  | Customer Email. Pre-fill the customer email address on the checkout page. |
| `customerName` | string | no |  | Customer Name. Pre-fill the customer name on the checkout page. |
| `customPrice` | number | no |  | Custom Price (cents). Override the product price in the smallest currency unit (e.g. 999 = $9.99). Only works if custom prices are enabled on the variant. |
| `discountCode` | string | no |  | Discount Code. Pre-apply a discount code to the checkout. |
| `redirectUrl` | string | no |  | Redirect URL. URL to redirect the customer to after a successful purchase. |
| `expiresAt` | string | no |  | Expires At. ISO 8601 datetime when this checkout URL expires (e.g. 2024-12-31T23:59:59Z). Leave empty for no expiry. |
| `customData` | JSON | no |  | Custom Data. Key-value pairs of custom data to attach to the order (accessible via webhooks). |

Output fields:

- `data`: Data
- `data.type`: Type
- `data.id`: ID
- `data.attributes`: Attributes
- `data.attributes.store_id`: Store ID (number)
- `data.attributes.variant_id`: Variant ID (number)
- `data.attributes.custom_price`: Custom Price (number)
- `data.attributes.expires_at`: Expires At (datetime)
- `data.attributes.url`: Checkout URL (url)
- `data.attributes.created_at`: Created At (datetime)
- `data.attributes.updated_at`: Updated At (datetime)
- `data.attributes.test_mode`: Test Mode (boolean)

### `list_customers`

**List Customers.** List customers from Lemon Squeezy, optionally narrowed by store (empty store spans all stores) and email address, with page-based pagination. Use to look up a customer by email or enumerate the customer base. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | no |  | Store. Filter customers by store. Leave empty to return customers from all stores. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | no |  | Email. Filter customers by their email address. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of customers to return per page (1–100). Default is 10. |

Output fields:

- `meta`: Meta
- `meta.page`: Page
- `meta.page.currentPage`: Current Page (number)
- `meta.page.from`: From (number)
- `meta.page.lastPage`: Last Page (number)
- `meta.page.perPage`: Per Page (number)
- `meta.page.to`: To (number)
- `meta.page.total`: Total (number)
- `data`: Data
- `data[].type`: Type
- `data[].id`: ID
- `data[].attributes`: Attributes
- `data[].attributes.store_id`: Store ID (number)
- `data[].attributes.name`: Name
- `data[].attributes.email`: Email (email)
- `data[].attributes.status`: Status
- `data[].attributes.status_formatted`: Status (Formatted)
- `data[].attributes.city`: City
- `data[].attributes.region`: Region
- `data[].attributes.country`: Country
- `data[].attributes.country_formatted`: Country (Formatted)
- `data[].attributes.total_revenue_currency`: Total Revenue (number)
- `data[].attributes.total_revenue_currency_formatted`: Total Revenue (Formatted)
- `data[].attributes.mrr`: MRR (number)
- `data[].attributes.mrr_formatted`: MRR (Formatted)
- `data[].attributes.created_at`: Created At (datetime)
- `data[].attributes.updated_at`: Updated At (datetime)
- `data[].attributes.test_mode`: Test Mode (boolean)
- `data[].attributes.urls`: URLs
- `data[].attributes.urls.customer_portal`: Customer Portal (url)

### `list_stores`

**List Stores.** Lists the Lemon Squeezy stores the connected API key can access, with page-based pagination. Use to find a store ID for other actions (create customer, create discount, create checkout). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of stores to return per page (1–100). Default is 10. |

Output fields:

- `items`: Items
- `items[].id`: ID
- `items[].name`: Name
- `items[].slug`: Slug
- `items[].domain`: Domain
- `items[].url`: URL (url)
- `items[].avatar_url`: Avatar URL (image)
- `items[].plan`: Plan
- `items[].country`: Country
- `items[].country_nicename`: Country Name
- `items[].currency`: Currency
- `items[].total_sales`: Total Sales (number)
- `items[].total_revenue`: Total Revenue (number)
- `items[].thirty_day_sales`: 30-Day Sales (number)
- `items[].thirty_day_revenue`: 30-Day Revenue (number)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `page`: Page (number)
- `last_page`: Last Page (number)
- `per_page`: Per Page (number)
- `total`: Total Matches (number)
- `has_more`: Has More Pages (boolean)

### `get_customer`

**Get Customer.** Fetches one Lemon Squeezy customer by numeric customer ID, including status, revenue, MRR and customer portal URL. Use Find Customer by Email when you only have an email. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | yes |  | Customer ID. The numeric ID of the customer. |

Output fields:

- `id`: ID
- `store_id`: Store ID (number)
- `name`: Name
- `email`: Email (email)
- `status`: Status
- `status_formatted`: Status (Formatted)
- `city`: City
- `region`: Region
- `country`: Country
- `country_formatted`: Country (Formatted)
- `total_revenue_currency`: Total Revenue (number)
- `total_revenue_currency_formatted`: Total Revenue (Formatted)
- `mrr`: MRR (number)
- `mrr_formatted`: MRR (Formatted)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `test_mode`: Test Mode (boolean)
- `urls`: URLs
- `urls.customer_portal`: Customer Portal (url)

### `find_customer_by_email`

**Find Customer by Email.** Finds a Lemon Squeezy customer by exact email address, optionally within one store. Returns found=false (not an error) when no customer matches; when the email exists in several stores, the first match is returned and all matches are listed. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The exact customer email address. |
| `storeId` | string | no |  | Store. Filter by store. Leave empty to include every store the API key can see. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `found`: Found (boolean)
- `customer`: Customer
- `customer.id`: ID
- `customer.store_id`: Store ID (number)
- `customer.name`: Name
- `customer.email`: Email (email)
- `customer.status`: Status
- `customer.status_formatted`: Status (Formatted)
- `customer.city`: City
- `customer.region`: Region
- `customer.country`: Country
- `customer.country_formatted`: Country (Formatted)
- `customer.total_revenue_currency`: Total Revenue (number)
- `customer.total_revenue_currency_formatted`: Total Revenue (Formatted)
- `customer.mrr`: MRR (number)
- `customer.mrr_formatted`: MRR (Formatted)
- `customer.created_at`: Created At (datetime)
- `customer.updated_at`: Updated At (datetime)
- `customer.test_mode`: Test Mode (boolean)
- `customer.urls`: URLs
- `customer.urls.customer_portal`: Customer Portal (url)
- `matches`: All Matches
- `matches[].id`: ID
- `matches[].store_id`: Store ID (number)
- `matches[].name`: Name
- `matches[].email`: Email (email)
- `matches[].status`: Status
- `matches[].status_formatted`: Status (Formatted)
- `matches[].city`: City
- `matches[].region`: Region
- `matches[].country`: Country
- `matches[].country_formatted`: Country (Formatted)
- `matches[].total_revenue_currency`: Total Revenue (number)
- `matches[].total_revenue_currency_formatted`: Total Revenue (Formatted)
- `matches[].mrr`: MRR (number)
- `matches[].mrr_formatted`: MRR (Formatted)
- `matches[].created_at`: Created At (datetime)
- `matches[].updated_at`: Updated At (datetime)
- `matches[].test_mode`: Test Mode (boolean)
- `matches[].urls`: URLs
- `matches[].urls.customer_portal`: Customer Portal (url)

### `create_customer`

**Create Customer.** Creates a customer record in a Lemon Squeezy store with a name and email, and optionally city, region and 2-letter country code. Not idempotent: Lemon Squeezy rejects a second customer with the same email in the same store, so look the email up first with Find Customer by Email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Store. The store to create the customer in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. The customer's full name. |
| `email` | string | yes |  | Email. The customer's email address. |
| `city` | string | no |  | City. |
| `region` | string | no |  | Region. State, county or region. |
| `country` | string | no |  | Country. ISO 3166-1 alpha-2 country code, for example US or DE. |

Output fields:

- `id`: ID
- `store_id`: Store ID (number)
- `name`: Name
- `email`: Email (email)
- `status`: Status
- `status_formatted`: Status (Formatted)
- `city`: City
- `region`: Region
- `country`: Country
- `country_formatted`: Country (Formatted)
- `total_revenue_currency`: Total Revenue (number)
- `total_revenue_currency_formatted`: Total Revenue (Formatted)
- `mrr`: MRR (number)
- `mrr_formatted`: MRR (Formatted)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `test_mode`: Test Mode (boolean)
- `urls`: URLs
- `urls.customer_portal`: Customer Portal (url)

### `update_customer`

**Update Customer.** Updates a Lemon Squeezy customer by ID: name, email, city, region, country (2-letter code), or archives the customer. Only the fields you provide change; at least one is required. Idempotent: repeating the same update leaves the customer unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | yes |  | Customer ID. The numeric ID of the customer. |
| `name` | string | no |  | Name. The customer's full name. |
| `email` | string | no |  | Email. The customer's email address. |
| `city` | string | no |  | City. |
| `region` | string | no |  | Region. State, county or region. |
| `country` | string | no |  | Country. ISO 3166-1 alpha-2 country code, for example US or DE. |
| `archive` | boolean | no | `false` | Archive Customer. Archive the customer (it can be restored in the dashboard). |

Output fields:

- `id`: ID
- `store_id`: Store ID (number)
- `name`: Name
- `email`: Email (email)
- `status`: Status
- `status_formatted`: Status (Formatted)
- `city`: City
- `region`: Region
- `country`: Country
- `country_formatted`: Country (Formatted)
- `total_revenue_currency`: Total Revenue (number)
- `total_revenue_currency_formatted`: Total Revenue (Formatted)
- `mrr`: MRR (number)
- `mrr_formatted`: MRR (Formatted)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `test_mode`: Test Mode (boolean)
- `urls`: URLs
- `urls.customer_portal`: Customer Portal (url)

### `get_order_ai`

**Get Order (AI).** Fetches one Lemon Squeezy order by numeric order ID (not the order number shown to customers), with totals in cents, status, customer email, receipt URL and all order items. Use List Orders to find the ID by email or status. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | string | yes |  | Order ID. The numeric order ID (the "id" field of an order). |

Output fields:

- `id`: ID
- `store_id`: Store ID (number)
- `customer_id`: Customer ID (number)
- `identifier`: Identifier
- `order_number`: Order Number (number)
- `user_name`: Customer Name
- `user_email`: Customer Email (email)
- `currency`: Currency
- `currency_rate`: Currency Rate
- `subtotal`: Subtotal (number)
- `setup_fee`: Setup Fee (number)
- `discount_total`: Discount Total (number)
- `tax`: Tax (number)
- `total`: Total (number)
- `refunded_amount`: Refunded Amount (number)
- `subtotal_usd`: Subtotal (USD cents) (number)
- `discount_total_usd`: Discount Total (USD cents) (number)
- `tax_usd`: Tax (USD cents) (number)
- `total_usd`: Total (USD cents) (number)
- `refunded_amount_usd`: Refunded Amount (USD cents) (number)
- `setup_fee_usd`: Setup Fee (USD cents) (number)
- `setup_fee_formatted`: Setup Fee (Formatted)
- `affiliate_id`: Affiliate ID (number)
- `referral_amount`: Referral Amount (number)
- `tax_name`: Tax Name
- `tax_rate`: Tax Rate
- `tax_inclusive`: Tax Inclusive (boolean)
- `status`: Status
- `status_formatted`: Status (Formatted)
- `refunded`: Refunded (boolean)
- `refunded_at`: Refunded At (datetime)
- `subtotal_formatted`: Subtotal (Formatted)
- `discount_total_formatted`: Discount Total (Formatted)
- `tax_formatted`: Tax (Formatted)
- `total_formatted`: Total (Formatted)
- `refunded_amount_formatted`: Refunded Amount (Formatted)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `test_mode`: Test Mode (boolean)
- `first_order_item`: First Order Item
- `first_order_item.id`: ID (number)
- `first_order_item.order_id`: Order ID (number)
- `first_order_item.product_id`: Product ID (number)
- `first_order_item.variant_id`: Variant ID (number)
- `first_order_item.price_id`: Price ID (number)
- `first_order_item.product_name`: Product Name
- `first_order_item.variant_name`: Variant Name
- `first_order_item.price`: Price (number)
- `first_order_item.quantity`: Quantity (number)
- `first_order_item.created_at`: Created At (datetime)
- `first_order_item.updated_at`: Updated At (datetime)
- `first_order_item.test_mode`: Test Mode (boolean)
- `urls`: URLs
- `urls.receipt`: Receipt (url)
- `order_items`: Order Items
- `order_items[].id`: ID
- `order_items[].order_id`: Order ID (number)
- `order_items[].product_id`: Product ID (number)
- `order_items[].variant_id`: Variant ID (number)
- `order_items[].price_id`: Price ID (number)
- `order_items[].product_name`: Product Name
- `order_items[].variant_name`: Variant Name
- `order_items[].price`: Price (number)
- `order_items[].quantity`: Quantity (number)
- `order_items[].created_at`: Created At (datetime)
- `order_items[].updated_at`: Updated At (datetime)
- `order_items[].test_mode`: Test Mode (boolean)

### `list_order_items`

**List Order Items.** Lists Lemon Squeezy order items (the product and variant lines of orders), optionally filtered by order ID, product ID or variant ID, with page-based pagination. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | string | no |  | Order ID. Only items of this order. |
| `productId` | string | no |  | Product ID. Only items of this product. |
| `variantId` | string | no |  | Variant ID. Only items of this variant. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of order items to return per page (1–100). Default is 10. |

Output fields:

- `items`: Items
- `items[].id`: ID
- `items[].order_id`: Order ID (number)
- `items[].product_id`: Product ID (number)
- `items[].variant_id`: Variant ID (number)
- `items[].price_id`: Price ID (number)
- `items[].product_name`: Product Name
- `items[].variant_name`: Variant Name
- `items[].price`: Price (number)
- `items[].quantity`: Quantity (number)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].test_mode`: Test Mode (boolean)
- `page`: Page (number)
- `last_page`: Last Page (number)
- `per_page`: Per Page (number)
- `total`: Total Matches (number)
- `has_more`: Has More Pages (boolean)

### `generate_order_invoice`

**Generate Order Invoice.** Generates a PDF invoice for a paid Lemon Squeezy order with the billing name and address you give, and returns a temporary download URL. Calling it again regenerates the same invoice with the latest details. Send the URL to the customer; it expires. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | string | yes |  | Order ID. The numeric ID of the order. |
| `name` | string | yes |  | Billing Name. Name or company on the invoice. |
| `address` | string | yes |  | Address. |
| `city` | string | yes |  | City. |
| `state` | string | no |  | State / Region. |
| `zipCode` | string | yes |  | ZIP / Postal Code. |
| `country` | string | yes |  | Country. ISO 3166-1 alpha-2 country code, for example US. |
| `notes` | string | no |  | Notes. Extra text printed on the invoice, such as a VAT number. |
| `locale` | string | no |  | Language. Invoice language code, for example en, de or fr. Defaults to English. |

Output fields:

- `order_id`: Order ID
- `invoice_url`: Invoice Download URL (url)

### `get_product`

**Get Product.** Fetches one Lemon Squeezy product by numeric product ID: name, status, price range in cents and buy-now URL. Use List Variants for its variants. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | string | yes |  | Product ID. The numeric ID of the product. |

Output fields:

- `id`: ID
- `store_id`: Store ID (number)
- `name`: Name
- `slug`: Slug
- `description`: Description (html)
- `status`: Status
- `status_formatted`: Status (Formatted)
- `thumb_url`: Thumbnail URL (image)
- `large_thumb_url`: Large Thumbnail URL (image)
- `price`: Price (number)
- `price_formatted`: Price (Formatted)
- `from_price`: From Price (number)
- `to_price`: To Price (number)
- `pay_what_you_want`: Pay What You Want (boolean)
- `buy_now_url`: Buy Now URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `test_mode`: Test Mode (boolean)

### `list_variants`

**List Variants.** Lists Lemon Squeezy product variants (the purchasable price options), optionally for one product ID and status, with page-based pagination. Use to find a variant ID for checkouts or plan changes. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | string | no |  | Product ID. Only variants of this product. |
| `status` | string | no |  | Status. One of `"published"`, `"draft"`, `"pending"`. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of variants to return per page (1–100). Default is 10. |

Output fields:

- `items`: Items
- `items[].id`: ID
- `items[].product_id`: Product ID (number)
- `items[].name`: Name
- `items[].slug`: Slug
- `items[].description`: Description (html)
- `items[].price`: Price (number)
- `items[].is_subscription`: Is Subscription (boolean)
- `items[].interval`: Interval
- `items[].interval_count`: Interval Count (number)
- `items[].has_free_trial`: Has Free Trial (boolean)
- `items[].trial_interval`: Trial Interval
- `items[].trial_interval_count`: Trial Interval Count (number)
- `items[].pay_what_you_want`: Pay What You Want (boolean)
- `items[].min_price`: Minimum Price (number)
- `items[].suggested_price`: Suggested Price (number)
- `items[].has_license_keys`: Has License Keys (boolean)
- `items[].license_activation_limit`: License Activation Limit (number)
- `items[].is_license_limit_unlimited`: License Limit Unlimited (boolean)
- `items[].license_length_value`: License Length (number)
- `items[].license_length_unit`: License Length Unit
- `items[].is_license_length_unlimited`: License Length Unlimited (boolean)
- `items[].sort`: Sort (number)
- `items[].status`: Status
- `items[].status_formatted`: Status (Formatted)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].test_mode`: Test Mode (boolean)
- `page`: Page (number)
- `last_page`: Last Page (number)
- `per_page`: Per Page (number)
- `total`: Total Matches (number)
- `has_more`: Has More Pages (boolean)

### `get_subscription`

**Get Subscription.** Fetches one Lemon Squeezy subscription by numeric subscription ID: status, plan (product/variant), renewal and end dates, pause state, card and customer portal URLs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionId` | string | yes |  | Subscription ID. The numeric ID of the subscription. |

Output fields:

- `id`: ID
- `store_id`: Store ID (number)
- `customer_id`: Customer ID (number)
- `order_id`: Order ID (number)
- `order_item_id`: Order Item ID (number)
- `product_id`: Product ID (number)
- `variant_id`: Variant ID (number)
- `product_name`: Product Name
- `variant_name`: Variant Name
- `user_name`: Customer Name
- `user_email`: Customer Email (email)
- `status`: Status
- `status_formatted`: Status (Formatted)
- `card_brand`: Card Brand
- `card_last_four`: Card Last Four
- `payment_processor`: Payment Processor
- `cancelled`: Cancelled (boolean)
- `trial_ends_at`: Trial Ends At (datetime)
- `billing_anchor`: Billing Anchor (day of month) (number)
- `renews_at`: Renews At (datetime)
- `ends_at`: Ends At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `test_mode`: Test Mode (boolean)
- `pause`: Pause
- `pause.mode`: Mode
- `pause.resumes_at`: Resumes At (datetime)
- `first_subscription_item`: First Subscription Item
- `first_subscription_item.id`: ID (number)
- `first_subscription_item.subscription_id`: Subscription ID (number)
- `first_subscription_item.price_id`: Price ID (number)
- `first_subscription_item.quantity`: Quantity (number)
- `first_subscription_item.is_usage_based`: Is Usage Based (boolean)
- `first_subscription_item.created_at`: Created At (datetime)
- `first_subscription_item.updated_at`: Updated At (datetime)
- `urls`: URLs
- `urls.update_payment_method`: Update Payment Method (url)
- `urls.customer_portal`: Customer Portal (url)
- `urls.customer_portal_update_subscription`: Customer Portal (Update Subscription) (url)

### `list_subscriptions_ai`

**List Subscriptions (AI).** Lists Lemon Squeezy subscriptions filtered by any of: store ID, order ID, order item ID, product ID, variant ID, exact customer email, status (on_trial, active, paused, past_due, unpaid, cancelled, expired). Page-based; check has_more. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | no |  | Store ID. Numeric store ID. |
| `orderId` | string | no |  | Order ID. Numeric order ID. |
| `orderItemId` | string | no |  | Order Item ID. Numeric order item ID. |
| `productId` | string | no |  | Product ID. Numeric product ID. |
| `variantId` | string | no |  | Variant ID. Numeric variant ID. |
| `userEmail` | string | no |  | Customer Email. Exact customer email address. |
| `status` | string | no |  | Status. One of `"on_trial"`, `"active"`, `"paused"`, `"past_due"`, `"unpaid"`, `"cancelled"`, `"expired"`. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of subscriptions to return per page (1–100). Default is 10. |

Output fields:

- `items`: Items
- `items[].id`: ID
- `items[].store_id`: Store ID (number)
- `items[].customer_id`: Customer ID (number)
- `items[].order_id`: Order ID (number)
- `items[].order_item_id`: Order Item ID (number)
- `items[].product_id`: Product ID (number)
- `items[].variant_id`: Variant ID (number)
- `items[].product_name`: Product Name
- `items[].variant_name`: Variant Name
- `items[].user_name`: Customer Name
- `items[].user_email`: Customer Email (email)
- `items[].status`: Status
- `items[].status_formatted`: Status (Formatted)
- `items[].card_brand`: Card Brand
- `items[].card_last_four`: Card Last Four
- `items[].payment_processor`: Payment Processor
- `items[].cancelled`: Cancelled (boolean)
- `items[].trial_ends_at`: Trial Ends At (datetime)
- `items[].billing_anchor`: Billing Anchor (day of month) (number)
- `items[].renews_at`: Renews At (datetime)
- `items[].ends_at`: Ends At (datetime)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].test_mode`: Test Mode (boolean)
- `items[].pause`: Pause
- `items[].pause.mode`: Mode
- `items[].pause.resumes_at`: Resumes At (datetime)
- `items[].first_subscription_item`: First Subscription Item
- `items[].first_subscription_item.id`: ID (number)
- `items[].first_subscription_item.subscription_id`: Subscription ID (number)
- `items[].first_subscription_item.price_id`: Price ID (number)
- `items[].first_subscription_item.quantity`: Quantity (number)
- `items[].first_subscription_item.is_usage_based`: Is Usage Based (boolean)
- `items[].first_subscription_item.created_at`: Created At (datetime)
- `items[].first_subscription_item.updated_at`: Updated At (datetime)
- `items[].urls`: URLs
- `items[].urls.update_payment_method`: Update Payment Method (url)
- `items[].urls.customer_portal`: Customer Portal (url)
- `items[].urls.customer_portal_update_subscription`: Customer Portal (Update Subscription) (url)
- `page`: Page (number)
- `last_page`: Last Page (number)
- `per_page`: Per Page (number)
- `total`: Total Matches (number)
- `has_more`: Has More Pages (boolean)

### `cancel_subscription`

**Cancel Subscription.** Cancels a subscription at the end of its current billing period; the customer keeps access until then and it can be resumed with Resume Subscription during that grace period. Repeat calls are safe and return the cancelled subscription. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionId` | string | yes |  | Subscription ID. The numeric ID of the subscription. |

Output fields:

- `id`: ID
- `store_id`: Store ID (number)
- `customer_id`: Customer ID (number)
- `order_id`: Order ID (number)
- `order_item_id`: Order Item ID (number)
- `product_id`: Product ID (number)
- `variant_id`: Variant ID (number)
- `product_name`: Product Name
- `variant_name`: Variant Name
- `user_name`: Customer Name
- `user_email`: Customer Email (email)
- `status`: Status
- `status_formatted`: Status (Formatted)
- `card_brand`: Card Brand
- `card_last_four`: Card Last Four
- `payment_processor`: Payment Processor
- `cancelled`: Cancelled (boolean)
- `trial_ends_at`: Trial Ends At (datetime)
- `billing_anchor`: Billing Anchor (day of month) (number)
- `renews_at`: Renews At (datetime)
- `ends_at`: Ends At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `test_mode`: Test Mode (boolean)
- `pause`: Pause
- `pause.mode`: Mode
- `pause.resumes_at`: Resumes At (datetime)
- `first_subscription_item`: First Subscription Item
- `first_subscription_item.id`: ID (number)
- `first_subscription_item.subscription_id`: Subscription ID (number)
- `first_subscription_item.price_id`: Price ID (number)
- `first_subscription_item.quantity`: Quantity (number)
- `first_subscription_item.is_usage_based`: Is Usage Based (boolean)
- `first_subscription_item.created_at`: Created At (datetime)
- `first_subscription_item.updated_at`: Updated At (datetime)
- `urls`: URLs
- `urls.update_payment_method`: Update Payment Method (url)
- `urls.customer_portal`: Customer Portal (url)
- `urls.customer_portal_update_subscription`: Customer Portal (Update Subscription) (url)

### `resume_subscription`

**Resume Subscription.** Resumes a cancelled Lemon Squeezy subscription that is still in its grace period (status cancelled, ends_at in the future), so it renews again. Expired subscriptions cannot be resumed. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionId` | string | yes |  | Subscription ID. The numeric ID of the subscription. |

Output fields:

- `id`: ID
- `store_id`: Store ID (number)
- `customer_id`: Customer ID (number)
- `order_id`: Order ID (number)
- `order_item_id`: Order Item ID (number)
- `product_id`: Product ID (number)
- `variant_id`: Variant ID (number)
- `product_name`: Product Name
- `variant_name`: Variant Name
- `user_name`: Customer Name
- `user_email`: Customer Email (email)
- `status`: Status
- `status_formatted`: Status (Formatted)
- `card_brand`: Card Brand
- `card_last_four`: Card Last Four
- `payment_processor`: Payment Processor
- `cancelled`: Cancelled (boolean)
- `trial_ends_at`: Trial Ends At (datetime)
- `billing_anchor`: Billing Anchor (day of month) (number)
- `renews_at`: Renews At (datetime)
- `ends_at`: Ends At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `test_mode`: Test Mode (boolean)
- `pause`: Pause
- `pause.mode`: Mode
- `pause.resumes_at`: Resumes At (datetime)
- `first_subscription_item`: First Subscription Item
- `first_subscription_item.id`: ID (number)
- `first_subscription_item.subscription_id`: Subscription ID (number)
- `first_subscription_item.price_id`: Price ID (number)
- `first_subscription_item.quantity`: Quantity (number)
- `first_subscription_item.is_usage_based`: Is Usage Based (boolean)
- `first_subscription_item.created_at`: Created At (datetime)
- `first_subscription_item.updated_at`: Updated At (datetime)
- `urls`: URLs
- `urls.update_payment_method`: Update Payment Method (url)
- `urls.customer_portal`: Customer Portal (url)
- `urls.customer_portal_update_subscription`: Customer Portal (Update Subscription) (url)

### `pause_subscription`

**Pause Subscription.** Pauses payment collection on a Lemon Squeezy subscription. Mode "void" stops access while paused; mode "free" keeps access for free. Optional resume date (ISO 8601); without it the pause lasts until Unpause Subscription. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionId` | string | yes |  | Subscription ID. The numeric ID of the subscription. |
| `mode` | string | yes | `"void"` | Pause Mode. Void stops access while paused; Free keeps access without paying. One of `"void"`, `"free"`. |
| `resumesAt` | string | no |  | Resumes At. Auto-resume date (ISO 8601). Empty keeps it paused until unpaused. |

Output fields:

- `id`: ID
- `store_id`: Store ID (number)
- `customer_id`: Customer ID (number)
- `order_id`: Order ID (number)
- `order_item_id`: Order Item ID (number)
- `product_id`: Product ID (number)
- `variant_id`: Variant ID (number)
- `product_name`: Product Name
- `variant_name`: Variant Name
- `user_name`: Customer Name
- `user_email`: Customer Email (email)
- `status`: Status
- `status_formatted`: Status (Formatted)
- `card_brand`: Card Brand
- `card_last_four`: Card Last Four
- `payment_processor`: Payment Processor
- `cancelled`: Cancelled (boolean)
- `trial_ends_at`: Trial Ends At (datetime)
- `billing_anchor`: Billing Anchor (day of month) (number)
- `renews_at`: Renews At (datetime)
- `ends_at`: Ends At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `test_mode`: Test Mode (boolean)
- `pause`: Pause
- `pause.mode`: Mode
- `pause.resumes_at`: Resumes At (datetime)
- `first_subscription_item`: First Subscription Item
- `first_subscription_item.id`: ID (number)
- `first_subscription_item.subscription_id`: Subscription ID (number)
- `first_subscription_item.price_id`: Price ID (number)
- `first_subscription_item.quantity`: Quantity (number)
- `first_subscription_item.is_usage_based`: Is Usage Based (boolean)
- `first_subscription_item.created_at`: Created At (datetime)
- `first_subscription_item.updated_at`: Updated At (datetime)
- `urls`: URLs
- `urls.update_payment_method`: Update Payment Method (url)
- `urls.customer_portal`: Customer Portal (url)
- `urls.customer_portal_update_subscription`: Customer Portal (Update Subscription) (url)

### `unpause_subscription`

**Unpause Subscription.** Ends the pause on a paused Lemon Squeezy subscription so payment collection restarts. Idempotent: unpausing a subscription that is not paused changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionId` | string | yes |  | Subscription ID. The numeric ID of the subscription. |

Output fields:

- `id`: ID
- `store_id`: Store ID (number)
- `customer_id`: Customer ID (number)
- `order_id`: Order ID (number)
- `order_item_id`: Order Item ID (number)
- `product_id`: Product ID (number)
- `variant_id`: Variant ID (number)
- `product_name`: Product Name
- `variant_name`: Variant Name
- `user_name`: Customer Name
- `user_email`: Customer Email (email)
- `status`: Status
- `status_formatted`: Status (Formatted)
- `card_brand`: Card Brand
- `card_last_four`: Card Last Four
- `payment_processor`: Payment Processor
- `cancelled`: Cancelled (boolean)
- `trial_ends_at`: Trial Ends At (datetime)
- `billing_anchor`: Billing Anchor (day of month) (number)
- `renews_at`: Renews At (datetime)
- `ends_at`: Ends At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `test_mode`: Test Mode (boolean)
- `pause`: Pause
- `pause.mode`: Mode
- `pause.resumes_at`: Resumes At (datetime)
- `first_subscription_item`: First Subscription Item
- `first_subscription_item.id`: ID (number)
- `first_subscription_item.subscription_id`: Subscription ID (number)
- `first_subscription_item.price_id`: Price ID (number)
- `first_subscription_item.quantity`: Quantity (number)
- `first_subscription_item.is_usage_based`: Is Usage Based (boolean)
- `first_subscription_item.created_at`: Created At (datetime)
- `first_subscription_item.updated_at`: Updated At (datetime)
- `urls`: URLs
- `urls.update_payment_method`: Update Payment Method (url)
- `urls.customer_portal`: Customer Portal (url)
- `urls.customer_portal_update_subscription`: Customer Portal (Update Subscription) (url)

### `change_subscription_plan`

**Change Subscription Plan.** Moves a Lemon Squeezy subscription to another variant (plan) by subscription ID and variant ID. Can charge the customer: prorated by default, immediately if requested. Repeating the same change leaves the subscription unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionId` | string | yes |  | Subscription ID. The numeric ID of the subscription. |
| `productId` | string | no |  | Product. Select a product to filter the variant list below. A value the product loads from the provider, such as an id; write the value itself. |
| `variantId` | string | yes |  | New Variant. The variant (plan) to move the subscription to. A value the product loads from the provider, such as an id; write the value itself. |
| `invoiceImmediately` | boolean | no | `false` | Charge Prorated Amount Now. Charge the prorated difference now, not at the next renewal. |
| `disableProrations` | boolean | no | `false` | Disable Proration. Bill the new price from the next renewal, without proration. |

Output fields:

- `id`: ID
- `store_id`: Store ID (number)
- `customer_id`: Customer ID (number)
- `order_id`: Order ID (number)
- `order_item_id`: Order Item ID (number)
- `product_id`: Product ID (number)
- `variant_id`: Variant ID (number)
- `product_name`: Product Name
- `variant_name`: Variant Name
- `user_name`: Customer Name
- `user_email`: Customer Email (email)
- `status`: Status
- `status_formatted`: Status (Formatted)
- `card_brand`: Card Brand
- `card_last_four`: Card Last Four
- `payment_processor`: Payment Processor
- `cancelled`: Cancelled (boolean)
- `trial_ends_at`: Trial Ends At (datetime)
- `billing_anchor`: Billing Anchor (day of month) (number)
- `renews_at`: Renews At (datetime)
- `ends_at`: Ends At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `test_mode`: Test Mode (boolean)
- `pause`: Pause
- `pause.mode`: Mode
- `pause.resumes_at`: Resumes At (datetime)
- `first_subscription_item`: First Subscription Item
- `first_subscription_item.id`: ID (number)
- `first_subscription_item.subscription_id`: Subscription ID (number)
- `first_subscription_item.price_id`: Price ID (number)
- `first_subscription_item.quantity`: Quantity (number)
- `first_subscription_item.is_usage_based`: Is Usage Based (boolean)
- `first_subscription_item.created_at`: Created At (datetime)
- `first_subscription_item.updated_at`: Updated At (datetime)
- `urls`: URLs
- `urls.update_payment_method`: Update Payment Method (url)
- `urls.customer_portal`: Customer Portal (url)
- `urls.customer_portal_update_subscription`: Customer Portal (Update Subscription) (url)

### `list_subscription_invoices`

**List Subscription Invoices.** Lists Lemon Squeezy subscription invoices (initial, renewal and plan-change payments), optionally filtered by store, subscription ID, status (paid, pending, void, refunded, partial_refund) or refunded flag, with page-based pagination. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | no |  | Store. Filter by store. Leave empty to include every store the API key can see. A value the product loads from the provider, such as an id; write the value itself. |
| `subscriptionId` | string | no |  | Subscription ID. Only invoices of this subscription. |
| `status` | string | no |  | Status. One of `"paid"`, `"pending"`, `"void"`, `"refunded"`, `"partial_refund"`. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of invoices to return per page (1–100). Default is 10. |

Output fields:

- `items`: Items
- `items[].id`: ID
- `items[].store_id`: Store ID (number)
- `items[].subscription_id`: Subscription ID (number)
- `items[].customer_id`: Customer ID (number)
- `items[].user_name`: Customer Name
- `items[].user_email`: Customer Email (email)
- `items[].billing_reason`: Billing Reason
- `items[].card_brand`: Card Brand
- `items[].card_last_four`: Card Last Four
- `items[].currency`: Currency
- `items[].currency_rate`: Currency Rate
- `items[].status`: Status
- `items[].status_formatted`: Status (Formatted)
- `items[].refunded`: Refunded (boolean)
- `items[].refunded_at`: Refunded At (datetime)
- `items[].subtotal`: Subtotal (number)
- `items[].discount_total`: Discount Total (number)
- `items[].tax`: Tax (number)
- `items[].tax_inclusive`: Tax Inclusive (boolean)
- `items[].total`: Total (number)
- `items[].refunded_amount`: Refunded Amount (number)
- `items[].subtotal_usd`: Subtotal (USD cents) (number)
- `items[].discount_total_usd`: Discount Total (USD cents) (number)
- `items[].tax_usd`: Tax (USD cents) (number)
- `items[].total_usd`: Total (USD cents) (number)
- `items[].refunded_amount_usd`: Refunded Amount (USD cents) (number)
- `items[].affiliate_id`: Affiliate ID (number)
- `items[].referral_amount`: Referral Amount (number)
- `items[].subtotal_formatted`: Subtotal (Formatted)
- `items[].discount_total_formatted`: Discount Total (Formatted)
- `items[].tax_formatted`: Tax (Formatted)
- `items[].total_formatted`: Total (Formatted)
- `items[].refunded_amount_formatted`: Refunded Amount (Formatted)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].test_mode`: Test Mode (boolean)
- `items[].urls`: URLs
- `items[].urls.invoice_url`: Invoice URL (url)
- `page`: Page (number)
- `last_page`: Last Page (number)
- `per_page`: Per Page (number)
- `total`: Total Matches (number)
- `has_more`: Has More Pages (boolean)

### `list_discounts`

**List Discounts.** Lists Lemon Squeezy discount codes, optionally for one store, with page-based pagination. Use to check whether a code exists or find a discount ID to delete. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | no |  | Store. Filter by store. Leave empty to include every store the API key can see. A value the product loads from the provider, such as an id; write the value itself. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of discounts to return per page (1–100). Default is 10. |

Output fields:

- `items`: Items
- `items[].id`: ID
- `items[].store_id`: Store ID (number)
- `items[].name`: Name
- `items[].code`: Code
- `items[].amount`: Amount (number)
- `items[].amount_type`: Amount Type
- `items[].is_limited_to_products`: Limited to Products (boolean)
- `items[].is_limited_redemptions`: Limited Redemptions (boolean)
- `items[].max_redemptions`: Max Redemptions (number)
- `items[].starts_at`: Starts At (datetime)
- `items[].expires_at`: Expires At (datetime)
- `items[].duration`: Duration
- `items[].duration_in_months`: Duration in Months (number)
- `items[].status`: Status
- `items[].status_formatted`: Status (Formatted)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].test_mode`: Test Mode (boolean)
- `page`: Page (number)
- `last_page`: Last Page (number)
- `per_page`: Per Page (number)
- `total`: Total Matches (number)
- `has_more`: Has More Pages (boolean)

### `create_discount`

**Create Discount.** Creates a discount code in a Lemon Squeezy store: percent (1-100) or fixed amount in cents, optional redemption limit, start/expiry dates (ISO 8601) and duration for subscriptions (once, repeating with months, forever). Not idempotent: codes must be unique, so a repeat call with the same code fails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Store. The store the discount belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. Internal name, for example "Black Friday". |
| `code` | string | yes |  | Code. The code customers enter: 3-256 uppercase letters and numbers. |
| `amountType` | string | yes | `"percent"` | Amount Type. One of `"percent"`, `"fixed"`. |
| `amount` | number | yes |  | Amount. Percent off (1-100) or a fixed amount in cents (500 = $5.00). |
| `maxRedemptions` | number | no |  | Max Redemptions. Leave empty for unlimited. |
| `startsAt` | string | no |  | Starts At. ISO 8601 date-time. Leave empty to start now. |
| `expiresAt` | string | no |  | Expires At. ISO 8601 date-time. Leave empty for no expiry. |
| `duration` | string | no | `"once"` | Duration (subscriptions). How long the discount applies to a subscription. One of `"once"`, `"repeating"`, `"forever"`. |
| `durationInMonths` | number | no |  | Duration in Months. Required when Duration is Repeating. |

Output fields:

- `id`: ID
- `store_id`: Store ID (number)
- `name`: Name
- `code`: Code
- `amount`: Amount (number)
- `amount_type`: Amount Type
- `is_limited_to_products`: Limited to Products (boolean)
- `is_limited_redemptions`: Limited Redemptions (boolean)
- `max_redemptions`: Max Redemptions (number)
- `starts_at`: Starts At (datetime)
- `expires_at`: Expires At (datetime)
- `duration`: Duration
- `duration_in_months`: Duration in Months (number)
- `status`: Status
- `status_formatted`: Status (Formatted)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `test_mode`: Test Mode (boolean)

### `delete_discount`

**Delete Discount.** Permanently deletes a Lemon Squeezy discount by numeric discount ID; customers can no longer use the code. Past orders keep their discount. Idempotent: deleting a discount that is already gone returns already_deleted=true. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `discountId` | string | yes |  | Discount ID. The numeric ID of the discount (not the code). |

Output fields:

- `id`: Discount ID
- `deleted`: Deleted (boolean)
- `already_deleted`: Already Deleted (boolean)

### `get_license_key`

**Get License Key.** Fetches one Lemon Squeezy license key by numeric license key ID or by the full key string (give exactly one). Returns the full key, status, activation limit and count, expiry and the owning order/customer. Returns found=false when the key does not exist. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `licenseKeyId` | string | no |  | License Key ID. The numeric license key ID. Leave empty when searching by key. |
| `licenseKey` | string | no |  | License Key. The full license key string. Leave empty when using the ID. |

Output fields:

- `found`: Found (boolean)
- `license_key`: License Key
- `license_key.id`: ID
- `license_key.store_id`: Store ID (number)
- `license_key.customer_id`: Customer ID (number)
- `license_key.order_id`: Order ID (number)
- `license_key.order_item_id`: Order Item ID (number)
- `license_key.product_id`: Product ID (number)
- `license_key.user_name`: Customer Name
- `license_key.user_email`: Customer Email (email)
- `license_key.key`: License Key
- `license_key.key_short`: License Key (Short)
- `license_key.activation_limit`: Activation Limit (number)
- `license_key.instances_count`: Activations (number)
- `license_key.disabled`: Disabled (boolean)
- `license_key.status`: Status
- `license_key.status_formatted`: Status (Formatted)
- `license_key.expires_at`: Expires At (datetime)
- `license_key.created_at`: Created At (datetime)
- `license_key.updated_at`: Updated At (datetime)
- `license_key.test_mode`: Test Mode (boolean)

### `update_license_key`

**Update License Key.** Updates a Lemon Squeezy license key by numeric ID: activation limit (or unlimited), expiry date (ISO 8601, or never), and enable/disable. Only the fields you set change; at least one is required. Disabling blocks activation and validation of the key. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `licenseKeyId` | string | yes |  | License Key ID. The numeric ID of the license key. |
| `activationLimit` | number | no |  | Activation Limit. New maximum number of activations. |
| `unlimitedActivations` | boolean | no | `false` | Unlimited Activations. Remove the activation limit. |
| `expiresAt` | string | no |  | Expires At. New ISO 8601 expiry date-time, for example 2027-01-31T00:00:00Z. |
| `neverExpires` | boolean | no | `false` | Never Expires. Remove the expiry date. |
| `disabled` | string | no |  | Status. Leave empty to keep the current state. One of `"disable"`, `"enable"`. |

Output fields:

- `id`: ID
- `store_id`: Store ID (number)
- `customer_id`: Customer ID (number)
- `order_id`: Order ID (number)
- `order_item_id`: Order Item ID (number)
- `product_id`: Product ID (number)
- `user_name`: Customer Name
- `user_email`: Customer Email (email)
- `key`: License Key
- `key_short`: License Key (Short)
- `activation_limit`: Activation Limit (number)
- `instances_count`: Activations (number)
- `disabled`: Disabled (boolean)
- `status`: Status
- `status_formatted`: Status (Formatted)
- `expires_at`: Expires At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `test_mode`: Test Mode (boolean)

### `list_license_keys`

**List License Keys.** Lists Lemon Squeezy license keys (full key included), optionally filtered by store, order ID, order item ID or product ID, with page-based pagination. Use Get License Key to look up a single key string. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | no |  | Store. Filter by store. Leave empty to include every store the API key can see. A value the product loads from the provider, such as an id; write the value itself. |
| `orderId` | string | no |  | Order ID. Only keys from this order. |
| `orderItemId` | string | no |  | Order Item ID. Only keys from this order item. |
| `productId` | string | no |  | Product ID. Only keys for this product. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of license keys to return per page (1–100). Default is 10. |

Output fields:

- `items`: Items
- `items[].id`: ID
- `items[].store_id`: Store ID (number)
- `items[].customer_id`: Customer ID (number)
- `items[].order_id`: Order ID (number)
- `items[].order_item_id`: Order Item ID (number)
- `items[].product_id`: Product ID (number)
- `items[].user_name`: Customer Name
- `items[].user_email`: Customer Email (email)
- `items[].key`: License Key
- `items[].key_short`: License Key (Short)
- `items[].activation_limit`: Activation Limit (number)
- `items[].instances_count`: Activations (number)
- `items[].disabled`: Disabled (boolean)
- `items[].status`: Status
- `items[].status_formatted`: Status (Formatted)
- `items[].expires_at`: Expires At (datetime)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].test_mode`: Test Mode (boolean)
- `page`: Page (number)
- `last_page`: Last Page (number)
- `per_page`: Per Page (number)
- `total`: Total Matches (number)
- `has_more`: Has More Pages (boolean)

### `get_discount`

**Get Discount.** Fetches one Lemon Squeezy discount by numeric discount ID: code, amount and type, redemption limit, start/expiry dates and status. Use before sharing a code with a customer to confirm it is published and not expired; use List Discounts to find the ID from a code. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `discountId` | string | yes |  | Discount ID. The numeric ID of the discount (not the code). |

Output fields:

- `id`: ID
- `store_id`: Store ID (number)
- `name`: Name
- `code`: Code
- `amount`: Amount (number)
- `amount_type`: Amount Type
- `is_limited_to_products`: Limited to Products (boolean)
- `is_limited_redemptions`: Limited Redemptions (boolean)
- `max_redemptions`: Max Redemptions (number)
- `starts_at`: Starts At (datetime)
- `expires_at`: Expires At (datetime)
- `duration`: Duration
- `duration_in_months`: Duration in Months (number)
- `status`: Status
- `status_formatted`: Status (Formatted)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `test_mode`: Test Mode (boolean)

### `list_license_key_instances`

**List License Key Activations.** Lists the activations (instances, for example a machine or site) of Lemon Squeezy license keys, optionally for one license key ID, with page-based pagination. Use to see where a customer activated a key before raising its activation limit or helping them free a slot. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `licenseKeyId` | string | no |  | License Key ID. Only activations of this license key. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of activations to return per page (1–100). Default is 10. |

Output fields:

- `items`: Items
- `items[].id`: ID
- `items[].license_key_id`: License Key ID (number)
- `items[].identifier`: Instance Identifier
- `items[].name`: Instance Name
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `page`: Page (number)
- `last_page`: Last Page (number)
- `per_page`: Per Page (number)
- `total`: Total Matches (number)
- `has_more`: Has More Pages (boolean)

### `list_affiliates`

**List Affiliates.** Lists Lemon Squeezy affiliates with their status and total/unpaid earnings in cents, optionally filtered by store ID or exact affiliate email, with page-based pagination. Use to look up an affiliate before a payout or to report on the affiliate program. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | no |  | Store ID. Only affiliates of this store. |
| `userEmail` | string | no |  | Affiliate Email. Exact email of the affiliate. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of affiliates to return per page (1–100). Default is 10. |

Output fields:

- `items`: Items
- `items[].id`: ID
- `items[].store_id`: Store ID (number)
- `items[].user_id`: User ID (number)
- `items[].user_name`: Name
- `items[].user_email`: Email (email)
- `items[].share_domain`: Share Domain
- `items[].status`: Status
- `items[].application_note`: Application Note
- `items[].total_earnings`: Total Earnings (number)
- `items[].unpaid_earnings`: Unpaid Earnings (number)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `page`: Page (number)
- `last_page`: Last Page (number)
- `per_page`: Per Page (number)
- `total`: Total Matches (number)
- `has_more`: Has More Pages (boolean)

### `list_discount_redemptions`

**List Discount Redemptions.** Lists Lemon Squeezy discount redemptions (one per order that used a code, with the amount saved in cents), optionally filtered by discount ID or order ID, with page-based pagination. Use to measure how a promotion performed or to check which code an order used. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `discountId` | string | no |  | Discount ID. Only redemptions of this discount. |
| `orderId` | string | no |  | Order ID. Only redemptions on this order. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of redemptions to return per page (1–100). Default is 10. |

Output fields:

- `items`: Items
- `items[].id`: ID
- `items[].discount_id`: Discount ID (number)
- `items[].order_id`: Order ID (number)
- `items[].discount_name`: Discount Name
- `items[].discount_code`: Discount Code
- `items[].discount_amount`: Discount Amount (number)
- `items[].discount_amount_type`: Discount Amount Type
- `items[].amount`: Amount Saved (number)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `page`: Page (number)
- `last_page`: Last Page (number)
- `per_page`: Per Page (number)
- `total`: Total Matches (number)
- `has_more`: Has More Pages (boolean)

### `list_subscription_items`

**List Subscription Items.** Lists Lemon Squeezy subscription items (the price line of a subscription: price ID, quantity, whether it is usage-based), optionally filtered by subscription ID or price ID, with page-based pagination. Use to read a subscription's seat count or find the item ID that usage-based billing needs. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionId` | string | no |  | Subscription ID. Only items of this subscription. |
| `priceId` | string | no |  | Price ID. Only items on this price. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `perPage` | number | no | `10` | Per Page. Number of items to return per page (1–100). Default is 10. |

Output fields:

- `items`: Items
- `items[].id`: ID
- `items[].subscription_id`: Subscription ID (number)
- `items[].price_id`: Price ID (number)
- `items[].quantity`: Quantity (number)
- `items[].is_usage_based`: Is Usage Based (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `page`: Page (number)
- `last_page`: Last Page (number)
- `per_page`: Per Page (number)
- `total`: Total Matches (number)
- `has_more`: Has More Pages (boolean)

### `validate_license`

**Validate License Key.** Checks a Lemon Squeezy license key string (and optionally one activation instance ID) with the License API and returns valid true/false, the reason when invalid, its status, activation limit and usage, expiry, and the product and customer it belongs to. Does not activate the key or use up an activation, and the key itself is not returned. Use when a customer sends a key and you need to confirm it before granting access or support. Idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `licenseKey` | string | yes |  | License Key. The full license key to check. |
| `instanceId` | string | no |  | Instance ID. Also check this activation (instance) of the key. |

Output fields:

- `valid`: Valid (boolean)
- `error`: Error
- `license_key`: License Key
- `license_key.id`: License Key ID (number)
- `license_key.status`: Status
- `license_key.activation_limit`: Activation Limit (number)
- `license_key.activation_usage`: Activations Used (number)
- `license_key.expires_at`: Expires At (datetime)
- `license_key.created_at`: Created At (datetime)
- `license_key.test_mode`: Test Mode (boolean)
- `instance`: Instance
- `instance.id`: Instance ID
- `instance.name`: Name
- `instance.created_at`: Created At (datetime)
- `meta`: Purchase
- `meta.store_id`: Store ID (number)
- `meta.order_id`: Order ID (number)
- `meta.order_item_id`: Order Item ID (number)
- `meta.product_id`: Product ID (number)
- `meta.product_name`: Product Name
- `meta.variant_id`: Variant ID (number)
- `meta.variant_name`: Variant Name
- `meta.customer_id`: Customer ID (number)
- `meta.customer_name`: Customer Name
- `meta.customer_email`: Customer Email (email)

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

# Lightfunnels

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-lightfunnels'
  version: '0.1.7'
```

Categories: SALES_AND_CRM, COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `list_products`

**List Products.** Lists products in a Lightfunnels store, with optional pagination (limit/cursor) and a Lightfunnels query string to filter, sort, and scope results (e.g. "order_by:id order_dir:desc"); an empty query returns all products in default order. Use to browse the catalog or find products by criteria. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first` | number | no | `10` | Limit. Number of products to retrieve (default: 10) |
| `after` | string | no |  | After Cursor. Cursor for pagination (optional) |
| `query` | string | no | `"order_by:id order_dir:desc"` | Query. Filter query (e.g., "order_by:id order_dir:desc last_month") |

### `get_product`

**Get Product.** Fetches the full details of a single Lightfunnels product by its node ID, including variants, options, pricing, and related funnels/stores. Use when you already have a product ID and need its complete record; use List Products first if you only have a name or other criteria. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | string | yes |  | Product ID. The ID of the product to retrieve. |

### `create_product`

**Create Product.** Creates a new product in Lightfunnels with a title, price, and required options and variants arrays (each variant maps option values). Use to add a catalog item; not for updating an existing product. Not idempotent — each call creates a separate product even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The title of the product. |
| `price` | number | yes |  | Price. The price of the product. |
| `description` | string | no |  | Description. The description of the product. |
| `compare_at_price` | number | no |  | Compare at Price. The original price before discount. |
| `sku` | string | no |  | SKU. The SKU of the product. |
| `options` | array | yes |  | Options. Product options like size, color, etc. Each item: { `id`, `label`?, `options`, `type`? }. |
| `variants` | array | yes |  | Variants. Product variants with their details. Each item: { `id`, `sku`?, `price`?, `compare_at_price`?, `options` }. |

### `get_order`

**Get Order.** Fetches the full details of a single Lightfunnels order by its node ID, including line items, payments, refunds, customer, and shipping/billing addresses. Use when you have an order ID and need its complete record; use List Orders first if you only have other criteria. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | string | yes |  | Order ID. The ID of the order to retrieve. |

### `list_orders`

**List Orders.** Lists orders in a Lightfunnels store, with optional pagination (limit/cursor) and a Lightfunnels query string to filter, sort, and scope results (e.g. "order_by:created_at order_dir:desc"); an empty query returns all orders in default order. Use to browse orders or find them by criteria. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first` | number | no | `10` | Limit. Number of orders to retrieve (default: 10) |
| `after` | string | no |  | After Cursor. Cursor for pagination (optional) |
| `query` | string | no | `"order_by:created_at order_dir:desc"` | Query. Filter query (e.g., "order_by:created_at order_dir:desc") |

### `cancel_order`

**Cancel Order.** Cancels a Lightfunnels order by ID with a required reason, optionally notifying the customer and/or issuing a refund. Use to void an order; the order ID must reference an existing, cancellable order. Mutating and not idempotent — refund/notification side effects may recur if re-invoked on an already-cancelled order. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | string | yes |  | Order ID. The ID of the order to cancel. |
| `reason` | string | yes |  | Reason. Reason for cancellation. |
| `notifyCustomer` | boolean | no | `true` | Notify Customer. Whether to notify the customer. |
| `refund` | boolean | no | `false` | Refund. Whether to refund the order. |

### `create_customer`

**Create Customer.** Creates a new customer record in Lightfunnels with first/last name, email, phone, marketing-consent flag, and tags. Use to add a contact; not for updating an existing customer. Not idempotent — each call creates a separate customer even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | yes |  | First Name. First name of the customer. |
| `lastName` | string | yes |  | Last Name. Last name of the customer. |
| `email` | string | yes |  | Email. Email of the customer. |
| `phone` | string | yes |  | Phone. Phone number of the customer eg: +1234567890. |
| `acceptsMarketing` | boolean | yes |  | Accepts Marketing. Whether the customer accepts marketing communications. |
| `tags` | array | yes |  | Tags. Tags to associate with the customer. Each item: { `tag` }. |

### `get_customer`

**Get Customer.** Fetches a single Lightfunnels customer by its node ID, including contact details, location, order count, and expenses. Use when you have a customer ID and need their record; use List Customers first if you only have other criteria. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | yes |  | Customer ID. The ID of the customer to retrieve. |

### `list_customers`

**List Customers.** Lists customers in a Lightfunnels store, with optional pagination (limit/cursor) and a Lightfunnels query string to filter, sort, and scope results (e.g. "order_by:created_at order_dir:desc"); an empty query returns all customers in default order. Use to browse contacts or find them by criteria. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first` | number | no | `10` | Limit. Number of customers to retrieve (default: 10) |
| `after` | string | no |  | After Cursor. Cursor for pagination (optional) |
| `query` | string | no | `"order_by:created_at order_dir:desc"` | Query. Filter query (e.g., "order_by:created_at order_dir:desc") |

### `get_funnel`

**Get Funnel.** Fetches a single Lightfunnels funnel by its node ID, returning its name, slug, and published status. Use when you have a funnel ID and need its record. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `funnelId` | string | yes |  | Funnel ID. The ID of the funnel to retrieve. |

# Cartloom

Sell products beautifully

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-cartloom'
  version: '0.2.0'
```

Categories: COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Cartloom Authentication

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Cartloom Domain. Your cartloom domain will be the subdomain part of your Cartloom URL. Example: https://<strong>mycompany</strong>.cartloom.com. |
| `apiKey` | string | yes |  | API Key. The API key for your Cartloom account. |

## Actions

### `get_products`

**Get Products.** Retrieves the full list of products from the connected Cartloom store. Use to discover available products and their IDs (for example before creating a discount targeting specific products). Takes no input and returns all products; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `get_order`

**Get Order.** Retrieves a single Cartloom order by its invoice ID. Use when you already know the exact invoice ID and want that one order; to find orders without an invoice ID, use the date- or email-based order search instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice` | string | yes |  | Invoice ID. The invoice ID for the order you want to retrieve. |

### `create_discount`

**Create Discount.** Creates a new discount in the connected Cartloom store, as either a fixed-amount or percentage discount applied to all products, selected products, or the order total. Use to set up a promotion or coupon; supply a code for a redeemable coupon or leave it blank for an automatic discount, and provide start/stop dates. Not idempotent — each call creates a separate discount. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Enter the title of the discount. |
| `enabled` | boolean | yes | `false` | Enabled. Is this discount enabled? |
| `auto` | boolean | yes | `false` | Auto. Is this discount automatically applied? |
| `unlimited` | boolean | yes | `false` | Unlimited. Is this discount unlimited? |
| `selfDestruct` | boolean | yes | `false` | Self Destruct. Remove the discount after use. |
| `applyOnce` | boolean | yes | `false` | Apply Once. Apply the discount once per order. |
| `type` | string | yes | `"fixed"` | Type of Discount. Select the type of discount. One of `"fixed"`, `"percent"`. |
| `amount` | number | yes | `0` | Amount. Enter the amount of the discount. |
| `target` | string | yes | `"all"` | Discount Target. Select the target of the discount. One of `"product"`, `"total"`, `"all"`. |
| `startDate` | ISO date-time string | yes |  | Start Date. The start date of the discount. YYYY-MM-DD HH:MM:SS. |
| `stopDate` | ISO date-time string | yes |  | Stop Date. The stop date of the discount. YYYY-MM-DD HH:MM:SS. |
| `code` | string | no |  | Discount Code. Enter the discount code. Leave blank for no code. |
| `targetPids` | array | no |  | Target Products. Select the products to apply the discount to. Values the product loads from the provider, such as ids; write an array of them. |
| `targetAmount` | number | no |  | Target Amount. The target amount for the discount when the target is set to Total. |
| `targetQuantity` | number | no | `0` | Target Quantity. The target quantity for the discount when the target is set to All or Products. |
| `allowance` | number | no |  | Allowance. The number of times the discount can be used. |

### `get_discount`

**Get Discount.** Retrieves the details of a single Cartloom discount by its discount ID. Use when you have a specific discount ID; to list discounts without an ID, use Get All Discounts. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `discountId` | string | yes |  | Discount ID. Enter the ID of the discount you want to retrieve. |

### `get_all_discounts`

**Get All Discounts.** Retrieves the full list of discounts configured in the connected Cartloom store. Use to browse existing discounts or find a discount ID before fetching one specific discount. Takes no input and returns all discounts; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `get_orders_by_date`

**Get Order by Date.** Lists all Cartloom orders placed within a date range. Use to retrieve orders for a period when you do not have specific invoice IDs; to narrow results to one customer, use Get Order by Email instead. Requires a start date; the end date defaults to today. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `start` | ISO date-time string | yes |  | Start Date. Select a date to start the search. |
| `end` | ISO date-time string | no |  | End Date. Select a date to end the search. Defaults to today. |

### `get_orders_by_email`

**Get Order by Email.** Lists Cartloom orders placed by a specific customer email address within a date range. Use to find a customer's order history; use Get Order by Date to list all orders regardless of customer. Requires the email and a start date; the end date defaults to today. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `start` | ISO date-time string | yes |  | Start Date. Select a date to start the search. |
| `end` | ISO date-time string | no |  | End Date. Select a date to end the search. Defaults to today. |
| `email` | string | yes |  | Email. Email address to search for. |

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

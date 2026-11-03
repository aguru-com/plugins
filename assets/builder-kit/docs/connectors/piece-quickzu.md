# Quickzu

Streamline ordering from whatsapp

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-quickzu'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> 1. Login to your Quickzu Dashboard.
> 2. Go to **https://app.quickzu.com/dash/settings/api-webhooks**.
> 3. Copy **API Token** to the clipboard and paste it.

## Actions

### `quickzu_add_product`

**Add Product.** Creates a new product in a Quickzu store, requiring a name, category, MRP price, unit, and unit value. Use to add an item to the catalog. Not idempotent: each call creates a separate product even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `desc` | string | no |  | Description. |
| `categoryId` | string | yes |  | Category. A value the product loads from the provider, such as an id; write the value itself. |
| `mrp` | number | yes |  | MRP Price. |
| `price` | number | no |  | Selling Price. Selling price should be equal or less than MRP. |
| `unit` | string | yes | `"kilogram"` | Unit. One of `"piece"`, `"kilogram"`, `"Gram"`, `"pound"`, `"litre"`, `"mili litre"`, `"dozen"`, `"feet"`, `"meter"`, `"square feet"`, `"square meter"`, `"set"`, `"hour"`, `"day"`, `"service"`, `"combo"`, `"box"`, `"pack"`, `"bottle"`, `"whole"`, `"slice"`, `"bulk"`. |
| `value_per_unit` | number | yes | `1` | Unit Value. |
| `availability` | boolean | yes | `true` | Availability. |
| `exclude_tax` | boolean | yes | `false` | Exclude Tax. |
| `enable_variants` | boolean | yes | `false` | Enable Variants. |
| `status` | boolean | yes | `true` | Status. |

### `quickzu_update_product`

**Update Product.** Updates an existing Quickzu product identified by its product ID; only the provided fields (name, price, category, availability, etc.) are changed. Use to edit a product already in the catalog. Idempotent: repeating with the same input leaves the product in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | string | yes |  | Product. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `desc` | string | no |  | Description. |
| `categoryId` | string | no |  | Category. A value the product loads from the provider, such as an id; write the value itself. |
| `mrp` | number | no |  | MRP Price. |
| `price` | number | no |  | Selling Price. Selling price should be equal or less than MRP. |
| `unit` | string | no |  | Unit. One of `"piece"`, `"kilogram"`, `"Gram"`, `"pound"`, `"litre"`, `"mili litre"`, `"dozen"`, `"feet"`, `"meter"`, `"square feet"`, `"square meter"`, `"set"`, `"hour"`, `"day"`, `"service"`, `"combo"`, `"box"`, `"pack"`, `"bottle"`, `"whole"`, `"slice"`, `"bulk"`. |
| `value_per_unit` | number | no |  | Unit Value. |
| `availability` | boolean | no |  | Availability. |
| `exclude_tax` | boolean | no |  | Exclude Tax. |
| `enable_variants` | boolean | no |  | Enable Variants. |
| `status` | boolean | no |  | Status. |

### `quickzu_delete_product`

**Delete Product.** Permanently removes a product from a Quickzu store by its product ID. Use to delete a catalog item. Idempotent: once the product is gone, repeating the call leaves the store in the same state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | string | yes |  | Product. A value the product loads from the provider, such as an id; write the value itself. |

### `quickzu_list_products`

**List Products.** Retrieves products from a Quickzu store. With no search term or category it returns all products; supplying a name term and/or a category filters the result to matches. Use to look up products or resolve a product ID before another action. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | no |  | Product name that need to be search.. |
| `categoryId` | string | no |  | Category. A value the product loads from the provider, such as an id; write the value itself. |

### `quickzu_create_category`

**Create Category.** Creates a new product category in a Quickzu store from a name and active status. Use to add a category before assigning products to it. Not idempotent: each call creates a separate category even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Category Name. |
| `status` | boolean | yes | `true` | Category Status. |

### `quickzu_update_category`

**Update Category.** Updates an existing Quickzu category identified by its category ID, changing its name and/or active status. Use to rename a category or toggle its visibility. Idempotent: repeating with the same input leaves the category in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `categoryId` | string | yes |  | Category. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Category Name. |
| `status` | boolean | yes | `false` | Category Status. |

### `quickzu_delete_category`

**Delete Category.** Permanently removes a category from a Quickzu store by its category ID. Use to delete a catalog category. Idempotent: once the category is gone, repeating the call leaves the store in the same state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `categoryId` | string | yes |  | Category. A value the product loads from the provider, such as an id; write the value itself. |

### `quickzu_list_categories`

**List Categories.** Retrieves categories from a Quickzu store. With no search term it returns all categories; supplying a name term filters to matches. Use to look up categories or resolve a category ID before another action. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | no |  | Search Term. Category name that need to be search. |

### `quickzu_get_order_details`

**Get Order Details.** Retrieves the full details of a single Quickzu order by its order ID. Use to inspect one specific order (customer, items, totals, status). Requires a known order ID. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | string | yes |  | Order. A value the product loads from the provider, such as an id; write the value itself. |

### `quickzu_list_orders`

**List Orders.** Retrieves a paginated list of all orders for a Quickzu store, controlled by page number and page size. Use to browse order history or find recent orders. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | yes | `1` | Current page number. |
| `limit` | number | yes | `20` | Number of orders per page. |

### `quickzu_list_live_orders`

**List Live Orders.** Retrieves currently active (live) orders for a Quickzu store, grouped by order status, with a per-status limit on how many are returned. Use to monitor in-progress orders rather than full history. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | yes | `15` | Number of live orders that need to be fetched per order status. |

### `quickzu_update_order_status`

**Update Order Status.** Sets the status of an existing Quickzu order (identified by order ID) to one of the predefined status values. Use to advance or change an order in its fulfillment lifecycle. Idempotent: setting the same status repeatedly leaves the order in the same state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | string | yes |  | Order. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | yes |  | Order Status. One of `"pending"`, `"paid"`, `"accepted"`, `"cancelled"`, `"done"`. |

### `quickzu_create_product_discount`

**Create Product Discount.** Creates a new item-level discount in a Quickzu store over a date range. The filter type selects scope: specific categories, specific products, or all products. Use to set up an automatic price reduction (not a coupon code). Not idempotent: each call creates a separate discount. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Promotion / Discount Title. |
| `start_date` | ISO date-time string | yes |  | Valid From. Please use YYYY-MM-DD format. |
| `end_date` | ISO date-time string | yes |  | Valid To. Please use YYYY-MM-DD format. |
| `filter_type` | string | yes |  | Filter. Choose what gets discount (products/categories). One of `"PRODUCTS"`, `"CATEGORIES"`, `"ALL_PRODUCTS"`. |
| `selectedFilterValues` | object | yes |  | Select Option. An object whose fields depend on other inputs; the product shows them. |
| `type` | string | yes |  | Discount. One of `"PERCENTAGE"`, `"FLAT"`, `"FIXED_PRICE"`. |
| `value` | string | yes |  | Discount Value. |
| `is_enabled` | boolean | yes | `true` | Enabled ?. |
| `is_visible` | boolean | yes | `true` | Visibility. |

### `quickzu_create_promo_code`

**Create Promo/Coupon Code.** Creates a customer-redeemable promo/coupon code in a Quickzu store over a date range, with a minimum cart value and a maximum usage limit. The filter type selects scope: specific categories, specific products, or all products. Use to set up a code shoppers enter at checkout (unlike Create Product Discount, which applies automatically). Not idempotent: each call creates a separate promo. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Promotion / Discount Title. |
| `start_date` | ISO date-time string | yes |  | Valid From. Please use YYYY-MM-DD format. |
| `end_date` | ISO date-time string | yes |  | Valid To. Please use YYYY-MM-DD format. |
| `filter_type` | string | yes |  | Filter. Choose what gets discount (products/categories). One of `"PRODUCTS"`, `"CATEGORIES"`, `"ALL_PRODUCTS"`. |
| `selectedFilterValues` | object | yes |  | Select Option. An object whose fields depend on other inputs; the product shows them. |
| `promo_code` | string | yes |  | Promo Code. |
| `minimum_cart_value` | number | yes |  | Minimum Order Amount. |
| `max_users_limit` | number | yes |  | Maximum Promo Code Limit. |
| `type` | string | yes |  | Discount. One of `"PERCENTAGE"`, `"FLAT"`. |
| `value` | string | yes |  | Discount Value. |
| `is_enabled` | boolean | yes | `true` | Enabled ?. |
| `is_visible` | boolean | yes | `true` | Visibility. |

### `quickzu_update_business_time`

**Update Business Time.** Sets the weekly operating hours for a Quickzu store, supplying start/end times and an open/closed status per weekday. Use to configure when the store accepts orders. Idempotent: submitting the same schedule repeatedly leaves the store settings in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `items` | array | yes |  | Business Hours. Each item: { `weekday`, `start`, `end`, `status` }. |

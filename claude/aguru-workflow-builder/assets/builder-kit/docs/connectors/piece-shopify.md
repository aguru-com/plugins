# Shopify

Ecommerce platform for online stores

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-shopify'
  version: '0.9.1'
```

Categories: COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Admin Token (legacy custom app)

> Use this option for custom apps created in the Shopify admin **before January 1, 2026**. Shopify no longer lets you create these apps, but existing ones keep working and their Admin API access token does not expire. For a new app, choose the **Dev Dashboard app** option instead.
>
> **Shop Name**:
>
> You can find your shop name in the URL. For example, if the URL is `https://example.myshopify.com/admin`, then your shop name is **example**.
>
> **Admin Token**:
>
> 1. Log in to your Shopify admin.
> 2. Go to **Settings** -> **Apps and sales channels** -> **Develop apps**.
> 3. Open your existing custom app.
> 4. Under **Configuration**, check that the Admin API scopes include: `read_orders`, `write_orders`, `read_customers`, `write_customers`, `read_products`, `write_products`, `read_draft_orders`, `write_draft_orders`, `read_locations`, `read_inventory`, `write_inventory`, `read_themes`, `write_fulfillments`, `read_publications`, `write_publications`, `write_files`, `read_merchant_managed_fulfillment_orders`, `write_merchant_managed_fulfillment_orders`, `read_fulfillments`, `read_shipping`, `read_discounts`, `write_discounts`, `read_gift_cards`, `write_gift_cards`, `write_themes`, `read_content`, `write_content`, `read_online_store_navigation`, `write_online_store_navigation`, `read_metaobjects`, `write_metaobjects`, `read_metaobject_definitions`, `write_metaobject_definitions`, `read_marketing_events`, `write_marketing_events`, `read_script_tags`, `write_script_tags`, `read_legal_policies`, `read_privacy_settings`, `read_markets`, `write_markets`, `read_payment_terms`, `read_shopify_payments_disputes`, `read_reports`, `write_reports`, `write_analytics_annotations`.
> 5. Under **API credentials**, copy the **Admin API access token**.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `shopName` | string | yes |  | Shop Name. |
| `adminToken` | string | yes |  | Admin Token. |

### `OAUTH2`: Dev Dashboard app

> Use this option for apps created in the Shopify **Dev Dashboard** (all new apps from January 1, 2026). Activepieces exchanges the app's client ID and client secret for an access token and renews it automatically every 24 hours.
>
> **Important:** the app and the store must belong to the **same Shopify organization**, otherwise Shopify rejects the connection.
>
> 1. Go to the [Shopify Dev Dashboard](https://dev.shopify.com/dashboard) and click **Create app**. Give it a name.
> 2. Create a version of the app and, under **Access** -> **Scopes**, select these Admin API scopes: `read_orders`, `write_orders`, `read_customers`, `write_customers`, `read_products`, `write_products`, `read_draft_orders`, `write_draft_orders`, `read_locations`, `read_inventory`, `write_inventory`, `read_themes`, `write_fulfillments`, `read_publications`, `write_publications`, `write_files`, `read_merchant_managed_fulfillment_orders`, `write_merchant_managed_fulfillment_orders`, `read_fulfillments`, `read_shipping`, `read_discounts`, `write_discounts`, `read_gift_cards`, `write_gift_cards`, `write_themes`, `read_content`, `write_content`, `read_online_store_navigation`, `write_online_store_navigation`, `read_metaobjects`, `write_metaobjects`, `read_metaobject_definitions`, `write_metaobject_definitions`, `read_marketing_events`, `write_marketing_events`, `read_script_tags`, `write_script_tags`, `read_legal_policies`, `read_privacy_settings`, `read_markets`, `write_markets`, `read_payment_terms`, `read_shopify_payments_disputes`, `read_reports`, `write_reports`, `write_analytics_annotations`.
> 3. Release a version with these scopes and install/approve it on the store: from the app's **Home** page, click **Install app** and install it on your store (reinstall it if it was installed before the scopes were added). The store must be in the same organization as the app.
> 4. Open the app's **Settings** page and copy the **Client ID** and **Client secret**.
> 5. Enter your shop name below (for `https://example.myshopify.com`, enter **example**), then paste the client ID and client secret.
>
> **Note:** If you change the app's scopes later, reconnect this connection so a new token is issued (tokens keep the scopes they were issued with for up to 24 hours).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `shopName` | string | yes |  | Shop Name. The part before .myshopify.com in your store URL. For https://example.myshopify.com, enter example. |

## Actions

### `adjust_inventory_level`

**Adjust Inventory Level.** Apply a relative change to an inventory item's available quantity at a specific location: positive values increase stock, negative values decrease it. Requires the inventory item ID, location ID, and a delta. Because the adjustment is relative (not an absolute set), each call shifts the count again, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | number | yes |  | Inventory Item. The ID of the inventory item. |
| `locationId` | number | yes |  | Location. The ID of the location. |
| `adjustment` | number | yes |  | Adjustment. Positive values increase inventory, negative values decrease it. |

### `cancel_order`

**Cancel Order.** Cancel an existing Shopify order by its ID, which may trigger refunds and restocking per store settings. Use to void or back out an order; distinct from Close Order, which only marks a fulfilled order complete. Cancelling an already-cancelled order is rejected, so it is not safely repeatable. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | number | yes |  | Order. The ID of the order. |

### `close_order`

**Close Order.** Mark an existing Shopify order as closed (archived/complete) by its ID, without cancelling it. Use to archive a finished order; choose Cancel Order instead to void it and trigger refunds/restock. Closing an already-closed order is rejected, so it is not safely repeatable. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | number | yes |  | Order. The ID of the order. |

### `create_collect`

**Create Collect.** Add a product to a custom collection in Shopify by linking a product ID and collection ID (a "collect"). Use to organize a product into a manual collection; requires both IDs. Each call creates a new link, so repeating it may produce duplicate collects. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | number | yes |  | Product. The ID of the product. |
| `collectionId` | number | yes |  | Collection. The ID of the collection. |

### `create_customer`

**Create Customer.** Create a new Shopify customer record with email, name, phone, tags, and marketing consent. Pick this for a new contact; use Update Customer to edit an existing one. Each call creates a new record, so repeating it may produce duplicate customers. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. |
| `verifiedEmail` | boolean | no | `true` | Verified Email. Whether the customer has verified their email. |
| `sendEmailInvite` | boolean | no | `false` | Send Email Invite. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `phoneNumber` | string | no |  | Phone Number. |
| `tags` | string | no |  | Tags. A string of comma-separated tags for filtering and search. |
| `acceptsMarketing` | boolean | no |  | Accepts Marketing ?. |

### `create_draft_order`

**Create Draft Order.** Create a draft (unfinalized) Shopify order from a single line item and optional customer, for quotes or invoices that are not yet placed. Pick this over Create Order when the order should stay editable and unpaid until completed. Each call creates a new draft, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | number | no |  | Product. The ID of the product to create the order with. |
| `variantId` | number | no |  | Product Variant. The ID of the variant to create the order with. |
| `title` | string | no |  | Title. |
| `quantity` | number | no | `1` | Quantity. |
| `price` | string | no |  | Price. |
| `customerId` | string | no |  | Customer. The ID of the customer to use. |

### `create_fulfillment_event`

**Create Fulfillment Event.** Record a tracking-status event (e.g. in transit, delivered) on an existing fulfillment within an order. Use to post shipment progress updates; requires the order ID, fulfillment ID, and a status. Each call appends a new event, so repeating it adds duplicate events. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | number | yes |  | Order. The ID of the order. |
| `fulfillmentId` | number | yes |  | Fulfillment. The ID of the fulfillment. |
| `status` | string | yes |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | no |  | Message. |

### `create_order`

**Create Order.** Create a new placed Shopify order from a single line item, with optional customer, email, and receipt toggles. Pick this for a finalized order; use Create Draft Order when it should remain an editable, unpaid draft. Each call creates a new order, so repeating it may produce duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | number | no |  | Product. The ID of the product to create the order with. |
| `variantId` | number | no |  | Product Variant. The ID of the variant to create the order with. |
| `title` | string | no |  | Title. |
| `quantity` | number | no | `1` | Quantity. |
| `price` | string | no |  | Price. |
| `customerId` | string | no |  | Customer. The ID of the customer to use. |
| `email` | string | no |  | Email. |
| `sendReceipt` | boolean | no | `false` | Send Receipt. |
| `sendFulfillmentReceipt` | boolean | no | `false` | Send Fulfillment Receipt. |
| `tags` | string | no |  | Tags. A string of comma-separated tags for filtering and search. |

### `create_product`

**Create Product.** Create a new product in the Shopify store with a title and optional description, type, image, status, vendor, and tags. Not idempotent: each call adds a separate product, so calling repeatedly creates duplicates. Use only to add a brand-new product, not to update an existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `bodyHtml` | string | no |  | Description. Product description (supports HTML) |
| `productType` | string | no |  | Product Type. A categorization for the product used for filtering and searching products. |
| `productImage` | file | no |  | Product Image. The public URL or the base64 image to use. Files are not supported; an action that needs one fails. |
| `status` | string | yes | `"draft"` | Status. One of `"active"`, `"draft"`, `"archived"`. |
| `vendor` | string | no |  | Vendor. |
| `tags` | string | no |  | Tags. A string of comma-separated tags for filtering and search. |

### `create_transaction`

**Create Transaction.** Record a payment transaction (capture, refund, void, etc.) against an existing Shopify order; the transaction type/kind and order ID are required, with optional amount, currency, and parent transaction. Use to capture or refund payment on an order. Each call creates a new financial transaction, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | number | yes |  | Order. The ID of the order to create a transaction for. |
| `kind` | string | yes |  | Type. A value the product loads from the provider, such as an id; write the value itself. |
| `currency` | string | no |  | Currency. |
| `amount` | string | no |  | Amount. |
| `authorization` | string | no |  | Authorization Key. |
| `parentId` | number | no |  | Parent ID. The ID of an associated transaction. |
| `source` | string | no |  | Source. An optional origin of the transaction. Set to external to import a cash transaction for the associated order. |
| `test` | boolean | no | `false` | Test. Whether the transaction is a test transaction. |

### `get_asset`

**Get Asset.** Fetch a single asset (e.g. a template, snippet, or stylesheet) from a Shopify theme by asset key and theme ID. Use to read theme file contents; both the asset key and theme ID are required. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | Asset Key. |
| `themeId` | string | yes |  | Theme. The ID of the theme. |

### `get_customer`

**Get Customer.** Fetch a single Shopify customer record by customer ID. Use when you already have the ID and need the full customer details; to search by name or email use a product/customer listing action instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | yes |  | Customer ID. |

### `get_customers`

**Get Customers.** Retrieve the list of customers in the Shopify store. Read-only and repeatable; pick this to browse or enumerate customer records when you do not have a specific customer ID. Returns all customers without filtering. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `get_customer_orders`

**Get Customer Orders.** Retrieve all orders placed by a specific customer, identified by customer ID. Read-only and repeatable; pick this when you need a customer's order history rather than a single order or the full store order list. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | yes |  | Customer ID. |

### `get_fulfillment`

**Get Fulfillment.** Look up a single fulfillment by its fulfillment ID within a given order. Read-only and repeatable; use to inspect shipment/fulfillment details when you already know both the order ID and fulfillment ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | number | yes |  | Order. The ID of the order. |
| `fulfillmentId` | number | yes |  | Fulfillment. The ID of the fulfillment. |

### `get_fulfillments`

**Get Fulfillments.** List the fulfillments (shipments) recorded for a specific Shopify order, given the order ID. Use to find fulfillment IDs and shipment status, e.g. before posting a Create Fulfillment Event. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | number | yes |  | Order. The ID of the order. |

### `get_locations`

**Get Locations.** List all store locations (warehouses, retail outlets) configured in Shopify, with no input required. Use to discover location IDs needed by inventory actions such as Adjust Inventory Level. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `get_product`

**Get Product.** Look up a single product by its product ID. Read-only and repeatable; use to fetch the details of one known product rather than to search or list products. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Product. The ID of the product. |

### `get_product_variant`

**Get Product Variant.** Fetch a single product variant by its variant ID, returning details like price, SKU, and inventory item. Use when you have a specific variant ID; to find variants browse products first via Get Products. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Product Variant. The ID of the product variant. |

### `get_products`

**Get Products.** List Shopify products, optionally filtered by title, to discover products or look up their IDs. Use this read-only search before actions that need a product ID; omit the title to list products broadly. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | no |  | Title. |

### `get_transaction`

**Get Transaction.** Look up a single payment transaction by its transaction ID within a given order. Read-only and repeatable; use to inspect payment, capture, or refund details when you already know both the order ID and transaction ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | number | yes |  | Order. The ID of the order. |
| `transactionId` | number | yes |  | Transaction. The ID of the transaction. |

### `get_transactions`

**Get Order Transactions.** List all payment transactions (authorizations, captures, refunds, voids) recorded against a specific Shopify order, given the order ID. Use to inspect an order's financial history. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | number | yes |  | Order. The ID of the order. |

### `update_customer`

**Update Customer.** Update fields on an existing Shopify customer identified by customer ID (email, name, phone, tags, marketing consent). Pick this to edit a known customer rather than Create Customer; the customer ID is required and only supplied fields are changed. Sets absolute field values, so re-running with the same input is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | yes |  | Customer ID. |
| `email` | string | no |  | Email. |
| `verifiedEmail` | boolean | no | `true` | Verified Email. Whether the customer has verified their email. |
| `sendEmailInvite` | boolean | no | `false` | Send Email Invite. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `phoneNumber` | string | no |  | Phone Number. |
| `tags` | string | no |  | Tags. A string of comma-separated tags for filtering and search. |
| `acceptsMarketing` | boolean | no |  | Accepts Marketing ?. |

### `update_order`

**Update Order.** Update editable fields on an existing Shopify order by order ID (email, phone, tags, note). Use to amend order metadata; this does not change line items, fulfillment, or payment. Sets absolute field values, so re-running with the same input is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Order. The ID of the order. |
| `email` | string | no |  | Email. |
| `phoneNumber` | string | no |  | Phone Number. |
| `tags` | string | no |  | Tags. A string of comma-separated tags for filtering and search. |
| `note` | string | no |  | Note. |

### `update_product`

**Update Product.** Update fields on an existing Shopify product by product ID (title, description, type, vendor, tags, status, and an optional image). Pick this to edit a known product rather than creating one; the product ID is required. Sets absolute field values, but a supplied image is appended on every call, so repeating a call that includes an image adds duplicate images. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Product. The ID of the product. |
| `title` | string | no |  | Title. |
| `bodyHtml` | string | no |  | Description. Product description (supports HTML) |
| `productType` | string | no |  | Product Type. A categorization for the product used for filtering and searching products. |
| `productImage` | file | no |  | Product Image. The public URL or the base64 image to use. Files are not supported; an action that needs one fails. |
| `status` | string | yes | `"draft"` | Status. One of `"active"`, `"draft"`, `"archived"`. |
| `vendor` | string | no |  | Vendor. |
| `tags` | string | no |  | Tags. A string of comma-separated tags for filtering and search. |

### `upload_product_image`

**Upload Product Image.** Add an image to an existing Shopify product from a public URL or base64 file; an optional position of 1 makes it the main image. Use to attach product photos; requires the product ID. Each call adds another image, so repeating it creates duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Product. The ID of the product. |
| `image` | file | yes |  | Image. The public URL or the base64 image to use. Files are not supported; an action that needs one fails. |
| `position` | number | no |  | Position. 1 makes it the main image. |

### `activate_inventory_at_location`

**Stock Item at Location.** Starts stocking one inventory item at one location (creates its inventory level there), optionally with a starting available quantity. Activating an item that is already stocked there leaves it stocked. Generate your own idempotency_key (for example a UUID) on the first call and pass the same key on every retry; the key used is returned and is included in any error message. Undo with deactivate_inventory_at_location. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inventory_item_id` | string | yes |  | Inventory Item ID. The inventory item id, numeric or "gid://shopify/InventoryItem/…" (from get_product_variant_details). |
| `location_id` | string | yes |  | Location ID. The location id, numeric or "gid://shopify/Location/…" (from list_locations). |
| `available` | number | no |  | Starting Available Quantity. Optional whole-number available quantity to start with, for example 10. |
| `idempotency_key` | string | no |  | Idempotency Key. A unique key for this operation, for example a UUID such as "3f1c2a9e-6b1d-4c8e-9a51-2f7d0e4b8c10". Generate your own key on the first call and pass the same key again when retrying after a timeout or error, so Shopify does not repeat the operation. If left empty a key is generated; it is returned … |

Output fields:

- `id`: Inventory Level ID
- `is_active`: Is Active (boolean)
- `can_deactivate`: Can Deactivate (boolean)
- `deactivation_alert`: Deactivation Alert
- `inventory_item_id`: Inventory Item ID
- `sku`: SKU
- `location_id`: Location ID
- `location_name`: Location Name
- `available`: Available (number)
- `on_hand`: On Hand (number)
- `committed`: Committed (number)
- `incoming`: Incoming (number)
- `reserved`: Reserved (number)
- `damaged`: Damaged (number)
- `safety_stock`: Safety Stock (number)
- `quality_control`: Quality Control (number)
- `updated_at`: Updated At (datetime)
- `idempotency_key`: Idempotency Key
- `redacted_fields`: Redacted Fields

### `add_discount_redeem_codes`

**Start Adding Discount Redeem Codes.** Starts adding up to 250 new redeem codes to one existing code discount, for example unique codes for an email campaign. Shopify imports them in the background and returns only a bulk creation: poll get_discount_redeem_code_bulk_creation with bulk_creation_id until done is true, then read imported_count, failed_count and the per-code errors (for example a code that already exists). Every call starts another import. Takes the code discount id (gid://shopify/DiscountCodeNode/… or its plain number). Needs the write_discounts access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `discount_id` | string | yes |  | Discount ID. The code discount id, for example "gid://shopify/DiscountCodeNode/123" or "123". Get it from list_discounts or find_discount_by_code. |
| `codes` | array | yes |  | Codes. The new codes, 1 to 250, for example "WELCOME-A1B2". Duplicates in the list are sent once. |

Output fields:

- `bulk_creation_id`: Bulk Creation ID
- `done`: Done (boolean)
- `codes_count`: Codes Count (number)
- `imported_count`: Imported Count (number)
- `failed_count`: Failed Count (number)
- `created_at`: Created At (datetime)
- `discount_id`: Discount ID
- `codes_sent`: Codes Sent (number)
- `redacted_fields`: Redacted Fields

### `add_product_media`

**Add Product Media.** Adds media to a product from publicly reachable URLs (images, videos, YouTube or Vimeo links, 3D models). New media is appended after the existing media and is processed in the background: status starts as UPLOADED or PROCESSING and becomes READY later (check with list_product_media). Returns the newly added media items (the last ones by position, one per URL sent) with their new ids, however many media the product already had. Each call adds new copies, so retries create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id, numeric or "gid://shopify/Product/…". Find it with search_products. |
| `media` | array | yes |  | Media. The media to add, one entry per file. Each item: { `url`, `alt`?, `media_type`? }. |

Output fields:

- `product_id`: Product ID
- `media`: Added Media
- `media[].id`: Media ID
- `media[].alt`: Alt Text
- `media[].media_content_type`: Media Type
- `media[].status`: Status
- `media[].image_url`: Image URL (image)
- `media[].width`: Width (number)
- `media[].height`: Height (number)
- `media[].mime_type`: MIME Type
- `media[].preview_url`: Preview Image (image)
- `media[].external_url`: External URL (url)
- `media[].filename`: Filename
- `media[].errors`: Errors
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `add_products_to_collection`

**Add Products to Collection.** Adds products to one collection as manual picks. Reads the collection's sources first, then adds the products to its first non-shared conditions source (or to source_id when given); a collection without one gets a new manual-selection source. Shared conditions sources (shareable=true in get_collection, reused by other collections) are never changed: they are skipped when choosing the default, and a shared source_id is refused. Works on manual and rule-based collections alike. Large changes may finish in the background (job_id, poll get_job). Adding a product that is already picked leaves it in the collection. Not available on Starter or Retail plans. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection_id` | string | yes |  | Collection ID. The collection id, numeric or "gid://shopify/Collection/…". Find it with search_collections. |
| `product_ids` | array | yes |  | Product IDs. Products to add, numeric or "gid://shopify/Product/…". |
| `source_id` | string | no |  | Source ID. Optional conditions source to add the picks to (from get_collection sources). Must not be a shared source. Defaults to the first non-shared conditions source. |

Output fields:

- `id`: Collection ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `sort_order`: Sort Order
- `updated_at`: Updated At (datetime)
- `products_count`: Products Count (number)
- `image_url`: Image (image)
- `image_alt`: Image Alt Text
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `sources`: Sources
- `sources[].id`: Source ID
- `sources[].title`: Title
- `sources[].type`: Type
- `sources[].shareable`: Shared (boolean)
- `sources[].app_id`: App ID
- `sources[].target_type`: Target Type
- `sources[].match_type`: Match Type
- `sources[].conditions`: Conditions
- `sources[].conditions[].id`: Condition ID
- `sources[].conditions[].kind`: Kind
- `sources[].conditions[].relation`: Relation
- `sources[].conditions[].values`: Values
- `sources[].conditions[].currency_code`: Currency Code
- `sources[].selected_products`: Selected Products
- `sources[].selected_products[].product_id`: Product ID
- `sources[].selected_products[].product_title`: Product Title
- `sources[].selected_products[].variant_ids`: Variant IDs
- `sources[].selected_products_count`: Selected Products Count (number)
- `sources[].selected_products_truncated`: Selected Products Truncated (boolean)
- `added_product_ids`: Added Product IDs
- `source_id_used`: Source ID Used
- `created_source`: Created Source (boolean)
- `job_id`: Job ID
- `job_done`: Job Done (boolean)
- `redacted_fields`: Redacted Fields

### `add_tags`

**Add Tags.** Adds one or more tags to an order, draft order, customer, product or blog article while keeping its existing tags; prefer this over sending a full tag list to an update action. Adding a tag that is already present changes nothing, so repeating is safe. Returns the resulting tag list. Blog articles need the write_content access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes |  | Resource Type. What kind of record the id belongs to. Used to build the full id when a numeric id is given. One of `"Order"`, `"DraftOrder"`, `"Customer"`, `"Product"`, `"Article"`. |
| `resource_id` | string | yes |  | Resource ID. Numeric id such as "450789469" or a full id such as "gid://shopify/Order/450789469". |
| `tags` | array | yes |  | Tags. Tags to add, for example ["vip", "follow-up"]. |

Output fields:

- `id`: Resource ID
- `tags_added`: Tags Added
- `tags`: Current Tags
- `redacted_fields`: Redacted Fields

### `list_delivery_zones`

**List Delivery Zones.** Lists all shipping zones of one location group in one delivery (shipping) profile, each with its countries and up to 50 rates (name, flat price or carrier service). Use it when list_delivery_profiles reports zones_truncated or rates_truncated, or to read one group in full. Take profile_id and location_group_id from list_delivery_profiles. Paged, at most 10 zones per call even when first is larger: pass end_cursor back as the cursor while has_next_page is true. When a zone has rates_truncated, call again with the zone_token of that zone and rates_after set to its rates_end_cursor to read its next 50 rates (only that zone is returned). Needs the read_shipping access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `profile_id` | string | yes |  | Delivery Profile ID. The profile id from list_delivery_profiles, numeric or "gid://shopify/DeliveryProfile/…". |
| `location_group_id` | string | yes |  | Location Group ID. The location_group_id from list_delivery_profiles, numeric or "gid://shopify/DeliveryLocationGroup/…". |
| `first` | number | no | `25` | Page Size. How many records to return, 1 to 25. Defaults to 25. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |
| `zone_token` | string | no |  | Zone Token. To read more rates of one zone: that zone's zone_token from a previous call. Returns only that zone. |
| `rates_after` | string | no |  | Rates Cursor. With zone_token: the zone's rates_end_cursor from a previous call, to read its next 50 rates. |

Output fields:

- `profile_id`: Delivery Profile ID
- `location_group_id`: Location Group ID
- `items`: Zones
- `items[].zone_id`: Zone ID
- `items[].zone_name`: Zone Name
- `items[].countries`: Countries
- `items[].rates`: Rates
- `items[].rates[].id`: Rate ID
- `items[].rates[].name`: Name
- `items[].rates[].active`: Active (boolean)
- `items[].rates[].description`: Description
- `items[].rates[].price`: Price (number)
- `items[].rates[].currency_code`: Currency Code
- `items[].rates[].carrier_service_id`: Carrier Service ID
- `items[].rates[].carrier_service_name`: Carrier Service Name
- `items[].rates_truncated`: Rates Truncated (boolean)
- `items[].rates_end_cursor`: Rates Cursor
- `items[].zone_token`: Zone Token
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `delete_analytics_annotation`

**Delete Analytics Annotation.** Permanently deletes one analytics annotation, so its marker disappears from the store's analytics charts. Pass the id returned by create_analytics_annotation (there is no action to list annotations). Only annotations this app created can be deleted; any other id fails with NOT_FOUND. Deleting frees a slot when create_analytics_annotation answered LIMIT_REACHED. There is no undo: recreating it gives a new id. Confirm with the user first. A repeat call fails with NOT_FOUND because it is gone. Needs the write_analytics_annotations access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `annotation_id` | string | yes |  | Analytics Annotation ID. The annotation id, numeric or "gid://shopify/AnalyticsAnnotation/…", as returned by create_analytics_annotation. |

Output fields:

- `deleted_annotation_id`: Deleted Annotation ID
- `redacted_fields`: Redacted Fields

### `update_analytics_annotation`

**Update Analytics Annotation.** Changes one analytics annotation and returns it; every field you leave empty keeps its value. Pass the id returned by create_analytics_annotation (there is no action to list annotations). Only annotations this app created can be changed; any other id, or one already deleted, fails with NOT_FOUND. type must be one of the types apps may set; title at most 75 characters, description at most 150 (clear_description removes it). started_at/ended_at are ISO 8601 date-times with a time zone; make_open_ended removes the end so the event shows as still running (use ended_at to close it again). Repeating the same update leaves the same state. Needs the write_analytics_annotations access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `annotation_id` | string | yes |  | Analytics Annotation ID. The annotation id, numeric or "gid://shopify/AnalyticsAnnotation/…", as returned by create_analytics_annotation. |
| `type` | string | no |  | Type. New kind of event. Leave empty to keep it. One of `"product_launch"`, `"product_discontinuation"`, `"collection_launch"`, `"bundle_launch"`, `"preorder_launch"`, `"in_person_event"`, `"campaign"`, `"brand_change"`, `"influencer_collaboration"`, `"brand_collaboration"`, `"channel_launch"`, `"ad_spend_change"`, `"media_mention"`, `"attribution_change"`, `"checkout_offer"`, `"amount_off_products_discount"`, `"free_shipping_discount"`, `"buy_x_get_y_discount"`, `"amount_off_order_discount"`, `"seasonal_promotion"`, `"shipping_promotion"`, `"loyalty_program_offer"`, `"reward_program_offer"`, `"subscription_program_offer"`, `"shop_cash_offer"` and 26 more. |
| `title` | string | no |  | Title. New chart marker text, at most 75 characters. Leave empty to keep it. |
| `description` | string | no |  | Description. New plain-text context, at most 150 characters. Leave empty to keep it. |
| `clear_description` | boolean | no | `false` | Clear Description. Remove the description. Do not combine with Description. |
| `started_at` | string | no |  | Started At. New start, ISO 8601 with a time zone, for example 2026-11-28T00:00:00Z. Leave empty to keep it. |
| `ended_at` | string | no |  | Ended At. New end, ISO 8601 with a time zone. Leave empty to keep it. |
| `make_open_ended` | boolean | no | `false` | Make Open-Ended. Remove the end so the event shows as still running. Do not combine with Ended At. |

Output fields:

- `id`: Analytics Annotation ID
- `type`: Type
- `title`: Title
- `description`: Description
- `started_at`: Started At (datetime)
- `ended_at`: Ended At (datetime)
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `create_analytics_annotation`

**Create Analytics Annotation.** Adds an annotation to the store's analytics timeline, so Shopify Analytics charts show a marker that explains a change in the numbers, for example a campaign, a product launch, a price test or a store redesign. type is one of the annotation types apps may create (for example campaign, product_launch, store_redesign, seasonal_promotion, ad_spend_change, other). title is required (at most 75 characters), description optional (at most 150). started_at and ended_at are ISO 8601 date-times with a time zone, for example 2026-11-28T00:00:00Z: leave ended_at empty for a point-in-time marker, or set open_ended for an event that is still running. The annotation is attributed to this app. There is NO action to list annotations, so keep the returned id: update_analytics_annotation and delete_analytics_annotation need it, and they only work on annotations this app created. Shopify caps how many annotations one app may keep per shop; past the cap it answers LIMIT_REACHED, and then an annotation must be deleted (by its saved id) or Shopify Support asked for a higher limit. Not idempotent: every call adds another annotation, so do not retry after a success. Needs the write_analytics_annotations access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Type. The kind of event, for example campaign, product_launch, store_redesign or other. One of `"product_launch"`, `"product_discontinuation"`, `"collection_launch"`, `"bundle_launch"`, `"preorder_launch"`, `"in_person_event"`, `"campaign"`, `"brand_change"`, `"influencer_collaboration"`, `"brand_collaboration"`, `"channel_launch"`, `"ad_spend_change"`, `"media_mention"`, `"attribution_change"`, `"checkout_offer"`, `"amount_off_products_discount"`, `"free_shipping_discount"`, `"buy_x_get_y_discount"`, `"amount_off_order_discount"`, `"seasonal_promotion"`, `"shipping_promotion"`, `"loyalty_program_offer"`, `"reward_program_offer"`, `"subscription_program_offer"`, `"shop_cash_offer"` and 26 more. |
| `title` | string | yes |  | Title. Text shown on the chart marker, at most 75 characters. |
| `description` | string | no |  | Description. Optional extra context, plain text, at most 150 characters. |
| `started_at` | string | yes |  | Started At. When the event started, ISO 8601 with a time zone, for example 2026-11-28T00:00:00Z. |
| `ended_at` | string | no |  | Ended At. When the event ended, ISO 8601 with a time zone. Leave empty for a point-in-time marker. Must not be before Started At. |
| `open_ended` | boolean | no | `false` | Open-Ended. The event is still running and has no end yet. Do not combine with Ended At. |

Output fields:

- `id`: Analytics Annotation ID
- `type`: Type
- `title`: Title
- `description`: Description
- `started_at`: Started At (datetime)
- `ended_at`: Ended At (datetime)
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `delete_analytics_targets`

**Delete Analytics Targets.** Permanently deletes one or more analytics targets (merchant goals shown in Shopify Analytics). There is no undo; recreating one with create_analytics_target gives it a new id. Confirm with the user first and name the targets (name, metric, period) being removed. Get the ids from list_analytics_targets. Shopify deletes every id it finds even when others are not found: deleted_ids lists what was removed, not_deleted_ids and errors list the rest (for example NOT_FOUND because it was already deleted). The step fails only when nothing at all was deleted. A repeat call reports the ids as not found. Needs the write_reports access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target_ids` | array | yes |  | Analytics Target IDs. Targets to delete, numeric or "gid://shopify/AnalyticsTarget/…". Find them with list_analytics_targets. |

Output fields:

- `deleted_ids`: Deleted Target IDs
- `deleted_count`: Deleted Count (number)
- `not_deleted_ids`: Not Deleted Target IDs
- `errors`: Errors
- `redacted_fields`: Redacted Fields

### `update_analytics_target`

**Update Analytics Target.** Changes one analytics target and returns it; every field you leave empty keeps its value. Use it to raise or lower a goal (expected_value, greater than 0), rename it, move its period (start_date/end_date as YYYY-MM-DD) or change its metric or ShopifyQL filters (for example shipping_country = 'US'). Set clear_filters to make it track the whole store again. Shopify keeps targets unique by metric + start_date + end_date + filters and answers TAKEN when the change would collide with another target. Get the target id from list_analytics_targets or create_analytics_target. Repeating the same update leaves the same state. Needs the write_reports access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target_id` | string | yes |  | Analytics Target ID. The target id, numeric or "gid://shopify/AnalyticsTarget/…". Find it with list_analytics_targets. |
| `name` | string | no |  | Name. New label for the target. Leave empty to keep it. |
| `metric` | string | no |  | Metric. New ShopifyQL metric identifier, for example total_sales or orders. Leave empty to keep it. |
| `start_date` | string | no |  | Start Date. New first day of the period, YYYY-MM-DD. Leave empty to keep it. |
| `end_date` | string | no |  | End Date. New last day of the period, YYYY-MM-DD. Leave empty to keep it. |
| `expected_value` | number | no |  | Expected Value. New goal value, greater than 0. Leave empty to keep it. |
| `filters` | string | no |  | Filters. New ShopifyQL filter expression, for example shipping_country = 'US'. Leave empty to keep the current filters. |
| `clear_filters` | boolean | no | `false` | Clear Filters. Remove the filters so the target tracks the whole store. Do not combine with Filters. |

Output fields:

- `id`: Analytics Target ID
- `name`: Name
- `metric`: Metric
- `start_date`: Start Date (date)
- `end_date`: End Date (date)
- `expected_value`: Expected Value
- `currency_code`: Currency
- `filters`: Filters
- `shopifyql_query`: ShopifyQL Query
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `create_analytics_target`

**Create Analytics Target.** Creates an analytics target: a merchant goal for one metric over a date range, for example total_sales of 50000 from 2026-01-01 to 2026-03-31, or 1000 orders in a month. Shopify Analytics then shows progress toward it. metric is a ShopifyQL metric identifier; Shopify documents total_sales and orders as examples and answers INVALID_METRIC for a metric that cannot have a target. expected_value must be greater than 0 and is in the shop currency for money metrics. filters is an optional ShopifyQL filter expression that narrows the data, for example shipping_country = 'US'. A target is unique by metric + start_date + end_date + filters: if one already exists, this action returns that existing target unchanged with already_existed true (it does not change its name or expected_value; use update_analytics_target for that), so a retry never creates a duplicate. The returned id works with update_analytics_target and delete_analytics_targets; list_analytics_targets finds targets later. Needs the write_reports access scope (read_reports to look up an existing duplicate). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Label for the target, for example "Q1 Sales Target". |
| `metric` | string | yes |  | Metric. ShopifyQL metric identifier in lower case, for example total_sales or orders. Shopify rejects metrics that cannot have a target (INVALID_METRIC). |
| `start_date` | string | yes |  | Start Date. First day of the target period, YYYY-MM-DD. |
| `end_date` | string | yes |  | End Date. Last day of the target period, YYYY-MM-DD. Must not be before the start date. |
| `expected_value` | number | yes |  | Expected Value. The goal value, greater than 0 (for money metrics, an amount in the shop currency). |
| `filters` | string | no |  | Filters. Optional ShopifyQL filter expression that narrows the data, for example shipping_country = 'US'. Leave empty to track the whole store. |

Output fields:

- `id`: Analytics Target ID
- `name`: Name
- `metric`: Metric
- `start_date`: Start Date (date)
- `end_date`: End Date (date)
- `expected_value`: Expected Value
- `currency_code`: Currency
- `filters`: Filters
- `shopifyql_query`: ShopifyQL Query
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `already_existed`: Already Existed (boolean)
- `redacted_fields`: Redacted Fields

### `list_analytics_targets`

**List Analytics Targets.** Lists the store's analytics targets: merchant goals such as "total_sales of 50000 between 2026-01-01 and 2026-03-31". Use it to find a target id for update_analytics_target or delete_analytics_targets, or to check whether a target already exists before create_analytics_target. Each item has id (gid://shopify/AnalyticsTarget/…), name, metric, start_date, end_date, expected_value (exact decimal string), currency_code, filters (ShopifyQL filter expression or empty), shopifyql_query (a ShopifyQL query that returns the current value of the metric for the target, to compare progress) and timestamps. Filter with Shopify search syntax in query: "metric:total_sales", "name:Q1*", "start_date:>=2026-01-01", "end_date:<=2026-03-31", "filters:\"shipping_country = 'US'\"". Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_reports access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify search syntax, for example "metric:total_sales" or "start_date:>=2026-01-01 end_date:<=2026-12-31". Leave empty to list all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to ID. One of `"START_DATE"`, `"END_DATE"`, `"NAME"`, `"METRIC"`, `"EXPECTED_VALUE"`, `"CREATED_AT"`, `"ID"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 100. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Analytics Targets
- `items[].id`: Analytics Target ID
- `items[].name`: Name
- `items[].metric`: Metric
- `items[].start_date`: Start Date (date)
- `items[].end_date`: End Date (date)
- `items[].expected_value`: Expected Value
- `items[].currency_code`: Currency
- `items[].filters`: Filters
- `items[].shopifyql_query`: ShopifyQL Query
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `get_return_policy_profile`

**Get Return Policy Profile.** Returns one return policy profile: name (empty for the default profile), is_default, updated_at, the return rules (return_rules_enabled; when false returns are unrestricted; can_accept_returns, return_window_days where -1 is unlimited, return_window_starting_from, extend_window_to_business_day), the edit/cancellation rules (edit_rules_enabled, can_accept_edits, edit_window_minutes where -1 means until fulfillment) and the markets it applies to. Get the id from list_return_policy_profiles, or from return_policy_profile_id in list_markets / get_market. Needs the read_legal_policies access scope; market names also need read_markets. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `return_policy_profile_id` | string | yes |  | Return Policy Profile ID. The profile id, numeric or "gid://shopify/ReturnPolicyProfile/…". Find it with list_return_policy_profiles or in a market's return_policy_profile_id. |

Output fields:

- `id`: Return Policy Profile ID
- `name`: Name
- `is_default`: Is Default (boolean)
- `updated_at`: Updated At (datetime)
- `return_rules_enabled`: Return Rules Enabled (boolean)
- `can_accept_returns`: Accepts Returns (boolean)
- `return_window_days`: Return Window (Days) (number)
- `return_window_starting_from`: Return Window Starts From
- `extend_window_to_business_day`: Extend To Business Day (boolean)
- `edit_rules_enabled`: Edit Rules Enabled (boolean)
- `can_accept_edits`: Accepts Edits (boolean)
- `edit_window_minutes`: Edit Window (Minutes) (number)
- `markets`: Markets
- `markets[].id`: Market ID
- `markets[].name`: Name
- `markets[].handle`: Handle
- `redacted_fields`: Redacted Fields

### `list_return_policy_profiles`

**List Return Policy Profiles.** Lists the store's return policy profiles: the default profile (is_default true, name empty) and any market-specific ones. Use it to answer "what is the return window in market X" or "which markets use a custom return policy". Each item has id (for get_return_policy_profile), name, is_default, updated_at, the return rules (return_rules_enabled; when false returns are unrestricted; can_accept_returns, return_window_days where -1 is unlimited, return_window_starting_from, extend_window_to_business_day), the edit/cancellation rules (edit_rules_enabled, can_accept_edits, edit_window_minutes where -1 means until fulfillment) and the markets it applies to (id, name, handle; ids work with get_market). Set default to Yes for only the default profile or No for only the custom ones. Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_legal_policies access scope; the market names also need read_markets and are listed in redacted_fields without it. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `default` | string | no |  | Default Profile Only. Yes returns only the default profile, No only the custom profiles. Leave empty for all. One of `"true"`, `"false"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `25` | Page Size. How many records to return, 1 to 25. Defaults to 25. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Return Policy Profiles
- `items[].id`: Return Policy Profile ID
- `items[].name`: Name
- `items[].is_default`: Is Default (boolean)
- `items[].updated_at`: Updated At (datetime)
- `items[].return_rules_enabled`: Return Rules Enabled (boolean)
- `items[].can_accept_returns`: Accepts Returns (boolean)
- `items[].return_window_days`: Return Window (Days) (number)
- `items[].return_window_starting_from`: Return Window Starts From
- `items[].extend_window_to_business_day`: Extend To Business Day (boolean)
- `items[].edit_rules_enabled`: Edit Rules Enabled (boolean)
- `items[].can_accept_edits`: Accepts Edits (boolean)
- `items[].edit_window_minutes`: Edit Window (Minutes) (number)
- `items[].markets`: Markets
- `items[].markets[].id`: Market ID
- `items[].markets[].name`: Name
- `items[].markets[].handle`: Handle
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_market_relationships`

**List Market Relationships.** Lists every parent/child link between the store's Markets in one flat list, so you can rebuild the whole market tree without calling get_market per market. Each item has the relationship id and the parent_market_id/name/handle and child_market_id/name/handle (parent fields can be empty). Shopify rebuilds these links in the background after a market, its conditions or its regions change, so right after such a change the list can still show the old hierarchy: relationships_version identifies the build that was read; read again later and compare it with a previous value to know whether the rebuild has landed. Market ids work with get_market. Paged: pass end_cursor back as the cursor while has_next_page is true; keep the same relationships_version across pages, and if it changes while paging, start over. Needs the read_markets access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 100. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Market Relationships
- `items[].id`: Relationship ID
- `items[].parent_market_id`: Parent Market ID
- `items[].parent_market_name`: Parent Market Name
- `items[].parent_market_handle`: Parent Market Handle
- `items[].child_market_id`: Child Market ID
- `items[].child_market_name`: Child Market Name
- `items[].child_market_handle`: Child Market Handle
- `relationships_version`: Relationships Version
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `get_market`

**Get Market.** Returns one Market in detail: status, type, the conditions that put a buyer in it (condition_types; up to 100 regions with codes; up to 50 retail locations, company locations and channels, each with an application level of SPECIFIED or ALL), parent_markets and child_markets (up to 50 each, with counts), currency settings (base currency, local currencies, rounding), tax- and duties-inclusive pricing, up to 10 catalogs with their price list (id, name, currency), up to 10 web presences with root URLs per locale, and its return policy profile with the return and edit rules. A *_truncated flag is true when Shopify has more than were returned. Parent and child markets are eventually consistent after a hierarchy change (compare relationships_version from list_market_relationships). Get the market id from list_markets. Needs the read_markets access scope; catalogs and price lists also need read_products, company locations read_companies, return policy read_legal_policies; parts the token cannot read are empty and listed in redacted_fields. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `market_id` | string | yes |  | Market ID. The market id, numeric or "gid://shopify/Market/…". Find it with list_markets. |

Output fields:

- `id`: Market ID
- `name`: Name
- `handle`: Handle
- `status`: Status
- `type`: Type
- `condition_types`: Condition Types
- `region_application_level`: Region Application Level
- `regions`: Regions
- `regions[].id`: Region ID
- `regions[].name`: Name
- `regions[].code`: Code
- `regions_truncated`: Regions Truncated (boolean)
- `location_application_level`: Location Application Level
- `locations`: Locations
- `locations[].id`: ID
- `locations[].name`: Name
- `locations_truncated`: Locations Truncated (boolean)
- `company_location_application_level`: Company Location Application Level
- `company_locations`: Company Locations
- `company_locations[].id`: ID
- `company_locations[].name`: Name
- `company_locations_truncated`: Company Locations Truncated (boolean)
- `channel_application_level`: Channel Application Level
- `channels`: Channels
- `channels[].id`: ID
- `channels[].name`: Name
- `channels_truncated`: Channels Truncated (boolean)
- `parent_markets_count`: Parent Markets Count (number)
- `parent_markets`: Parent Markets
- `parent_markets[].id`: Market ID
- `parent_markets[].name`: Name
- `parent_markets[].handle`: Handle
- `parent_markets_truncated`: Parent Markets Truncated (boolean)
- `child_markets_count`: Child Markets Count (number)
- `child_markets`: Child Markets
- `child_markets[].id`: Market ID
- `child_markets[].name`: Name
- `child_markets[].handle`: Handle
- `child_markets_truncated`: Child Markets Truncated (boolean)
- `base_currency_code`: Base Currency
- `base_currency_name`: Base Currency Name
- `local_currencies`: Local Currencies (boolean)
- `rounding_enabled`: Rounding Enabled (boolean)
- `inclusive_tax_pricing_strategy`: Tax-Inclusive Pricing
- `inclusive_duties_pricing_strategy`: Duties-Inclusive Pricing
- `catalogs_count`: Catalogs Count (number)
- `catalogs`: Catalogs
- `catalogs[].id`: Catalog ID
- `catalogs[].title`: Title
- `catalogs[].status`: Status
- `catalogs[].price_list_id`: Price List ID
- `catalogs[].price_list_name`: Price List Name
- `catalogs[].price_list_currency`: Price List Currency
- `catalogs_truncated`: Catalogs Truncated (boolean)
- `web_presences`: Web Presences
- `web_presences[].id`: Web Presence ID
- `web_presences[].subfolder_suffix`: Subfolder Suffix
- `web_presences[].domain_host`: Domain Host
- `web_presences[].default_locale`: Default Locale
- `web_presences[].root_urls`: Root URLs
- `web_presences[].root_urls[].locale`: Locale
- `web_presences[].root_urls[].url`: URL (url)
- `web_presences_truncated`: Web Presences Truncated (boolean)
- `return_policy_profile_id`: Return Policy Profile ID
- `return_policy_profile_name`: Return Policy Profile Name
- `return_policy_profile_is_default`: Uses Default Return Policy (boolean)
- `return_policy`: Return Policy
- `return_policy.return_rules_enabled`: Return Rules Enabled (boolean)
- `return_policy.can_accept_returns`: Accepts Returns (boolean)
- `return_policy.return_window_days`: Return Window (Days) (number)
- `return_policy.return_window_starting_from`: Return Window Starts From
- `return_policy.extend_window_to_business_day`: Extend To Business Day (boolean)
- `return_policy.edit_rules_enabled`: Edit Rules Enabled (boolean)
- `return_policy.can_accept_edits`: Accepts Edits (boolean)
- `return_policy.edit_window_minutes`: Edit Window (Minutes) (number)
- `redacted_fields`: Redacted Fields

### `list_markets`

**List Markets.** Lists the store's Markets (the buyer groups that get their own currency, prices, catalogs, domains and return policy). Use it to find a market id for get_market, to see which countries a market covers, or to see how markets nest. Each item has id (gid://shopify/Market/…), name, handle, status (ACTIVE or DRAFT), type (REGION, LOCATION, COMPANY_LOCATION, CHANNEL or NONE), condition_types, up to 10 regions with their country or subdivision code, up to 10 parent_markets and child_markets (id and name), return_policy_profile_id/name (pass to get_return_policy_profile), base_currency_code, local_currencies and up to 5 web_presences; each *_truncated flag is true when there are more, then call get_market for the full lists. Parent and child markets are eventually consistent after a hierarchy change (see list_market_relationships). Filter with type, or with Shopify search syntax in query: "status:ACTIVE", "name:Europe", "market_type:REGION", "market_condition_types:REGION". Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_markets access scope; the return policy fields also need read_legal_policies and are listed in redacted_fields without it. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify markets search syntax, for example "status:ACTIVE", "name:Europe" or "market_type:REGION". Leave empty to list all. |
| `type` | string | no |  | Market Type. Only return markets of this type. Leave empty for all types. One of `"REGION"`, `"LOCATION"`, `"COMPANY_LOCATION"`, `"CHANNEL"`, `"NONE"`. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to NAME. One of `"NAME"`, `"CREATED_AT"`, `"UPDATED_AT"`, `"STATUS"`, `"MARKET_TYPE"`, `"MARKET_CONDITION_TYPES"`, `"ID"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `15` | Page Size. How many records to return, 1 to 15. Defaults to 15. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Markets
- `items[].id`: Market ID
- `items[].name`: Name
- `items[].handle`: Handle
- `items[].status`: Status
- `items[].type`: Type
- `items[].condition_types`: Condition Types
- `items[].region_application_level`: Region Application Level
- `items[].regions`: Regions
- `items[].regions[].id`: Region ID
- `items[].regions[].name`: Name
- `items[].regions[].code`: Code
- `items[].regions_truncated`: Regions Truncated (boolean)
- `items[].parent_markets`: Parent Markets
- `items[].parent_markets[].id`: Market ID
- `items[].parent_markets[].name`: Name
- `items[].parent_markets_truncated`: Parent Markets Truncated (boolean)
- `items[].child_markets`: Child Markets
- `items[].child_markets[].id`: Market ID
- `items[].child_markets[].name`: Name
- `items[].child_markets_truncated`: Child Markets Truncated (boolean)
- `items[].return_policy_profile_id`: Return Policy Profile ID
- `items[].return_policy_profile_name`: Return Policy Profile Name
- `items[].return_policy_profile_is_default`: Uses Default Return Policy (boolean)
- `items[].base_currency_code`: Base Currency
- `items[].local_currencies`: Local Currencies (boolean)
- `items[].web_presences`: Web Presences
- `items[].web_presences[].id`: Web Presence ID
- `items[].web_presences[].subfolder_suffix`: Subfolder Suffix
- `items[].web_presences[].domain_host`: Domain Host
- `items[].web_presences_truncated`: Web Presences Truncated (boolean)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `send_payment_method_update_email`

**Send Payment Method Update Email.** Emails the customer of one order, draft order or subscription contract a secure link to add a new payment method (for example a credit card) for that resource, such as after a payment method was revoked or a subscription needs payment details. Pick resource_type and pass the matching id: an order id from search_orders, a draft order id from list_draft_orders, or a subscription contract id from the subscription app. Only the sender address and bcc recipients can be set; subject and body are Shopify's. Returns the customer id, which may be null with the path in redacted_fields on stores without protected customer data access (the email is still sent). Needs the write_customers access scope plus read access to the resource (read_orders, read_draft_orders or read_own_subscription_contracts). Not idempotent: each call sends another email, so do not repeat it after a success. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes |  | Resource Type. What the new payment method is for. One of `"ORDERS"`, `"DRAFT_ORDERS"`, `"SUBSCRIPTIONS"`. |
| `resource_id` | string | yes |  | Resource ID. The id of the order, draft order or subscription contract, numeric or a full id such as "gid://shopify/Order/450789469", "gid://shopify/DraftOrder/…" or "gid://shopify/SubscriptionContract/…". It must match the resource type; Shopify receives the number. |
| `from` | string | no |  | Sender Email. Send from this address instead of the store default, for example "support@example.com". |
| `bcc` | array | no |  | BCC Recipients. Email addresses that receive a blind copy, for example ["owner@example.com"]. |

Output fields:

- `customer_id`: Customer ID
- `resource_type`: Resource Type
- `resource_id`: Resource ID
- `redacted_fields`: Redacted Fields

### `resolve_requested_order_edit`

**Resolve Requested Order Edit.** Marks one pending (status REQUESTED) buyer-requested order edit as completed; the status becomes RESOLVED. Use it after the merchant has handled the request (for example removed the items in the Shopify admin). Get the requested_order_edit_id from list_requested_order_edits; use decline_requested_order_edit to refuse a request instead. Returns the edit with the resolved quantity per line item. Needs the write_orders access scope. Not idempotent: an edit that is already resolved or declined is rejected, so check its status with list_requested_order_edits before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `requested_order_edit_id` | string | yes |  | Requested Order Edit ID. The requested order edit id, numeric or "gid://shopify/RequestedOrderEdit/…". Find it with list_requested_order_edits. |

Output fields:

- `id`: Requested Order Edit ID
- `status`: Status
- `requested_at`: Requested At (datetime)
- `request_declined_at`: Declined At (datetime)
- `request_resolved_at`: Resolved At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `order_id`: Order ID
- `order_name`: Order Name
- `order_requested_edit_status`: Order Requested Edit Status
- `removals`: Line Items to Remove
- `removals[].id`: Requested Line Item ID
- `removals[].quantity`: Quantity Requested (number)
- `removals[].resolved_quantity`: Resolved Quantity (number)
- `removals[].line_item_id`: Order Line Item ID
- `removals[].line_item_name`: Line Item Name
- `removals[].line_item_title`: Line Item Title
- `removals[].sku`: SKU
- `removals[].variant_title`: Variant Title
- `removals[].line_item_quantity`: Line Item Ordered Quantity (number)
- `removals[].line_item_current_quantity`: Line Item Current Quantity (number)
- `removals[].line_item_unfulfilled_quantity`: Line Item Unfulfilled Quantity (number)
- `removals[].variant_id`: Variant ID
- `removals[].product_id`: Product ID
- `removals_count`: Removals Returned (number)
- `removals_truncated`: Removals Truncated (boolean)
- `redacted_fields`: Redacted Fields

### `decline_requested_order_edit`

**Decline Requested Order Edit.** Declines one pending (status REQUESTED) buyer-requested order edit; the order itself is not changed and the status becomes DECLINED. The optional decline_note (up to 500 characters) is the message Shopify sends to the buyer about the decline. Get the requested_order_edit_id from list_requested_order_edits. Needs the write_orders access scope. Not idempotent: an edit that is already declined or resolved is rejected, so check its status with list_requested_order_edits before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `requested_order_edit_id` | string | yes |  | Requested Order Edit ID. The requested order edit id, numeric or "gid://shopify/RequestedOrderEdit/…". Find it with list_requested_order_edits. |
| `decline_note` | string | no |  | Decline Note. Message sent to the buyer explaining the decline, at most 500 characters. Leave empty to send none. |

Output fields:

- `id`: Requested Order Edit ID
- `status`: Status
- `requested_at`: Requested At (datetime)
- `request_declined_at`: Declined At (datetime)
- `request_resolved_at`: Resolved At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `order_id`: Order ID
- `order_name`: Order Name
- `order_requested_edit_status`: Order Requested Edit Status
- `removals`: Line Items to Remove
- `removals[].id`: Requested Line Item ID
- `removals[].quantity`: Quantity Requested (number)
- `removals[].resolved_quantity`: Resolved Quantity (number)
- `removals[].line_item_id`: Order Line Item ID
- `removals[].line_item_name`: Line Item Name
- `removals[].line_item_title`: Line Item Title
- `removals[].sku`: SKU
- `removals[].variant_title`: Variant Title
- `removals[].line_item_quantity`: Line Item Ordered Quantity (number)
- `removals[].line_item_current_quantity`: Line Item Current Quantity (number)
- `removals[].line_item_unfulfilled_quantity`: Line Item Unfulfilled Quantity (number)
- `removals[].variant_id`: Variant ID
- `removals[].product_id`: Product ID
- `removals_count`: Removals Returned (number)
- `removals_truncated`: Removals Truncated (boolean)
- `redacted_fields`: Redacted Fields

### `create_requested_order_edit`

**Create Requested Order Edit.** Records, on behalf of the buyer, a request to remove unfulfilled line items (with quantities) from one order. It does not edit the order or move money: it creates a requested order edit with status REQUESTED that the merchant then resolves (resolve_requested_order_edit) or declines (decline_requested_order_edit). Take line item ids and unfulfilled quantities from get_order; the quantity cannot exceed the unfulfilled quantity. Use calculate_requested_order_edit first to preview the amounts. Returns the new requested_order_edit id. Needs the write_orders access scope. If Shopify ever answers that it APPLIED the change but withheld the result, the request exists: do not repeat it. Not idempotent: each call creates another request, so after an error or timeout call list_requested_order_edits on the order and only retry if the request is not there. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |
| `line_items` | array | yes |  | Line Items to Remove. The order line items the buyer wants removed and how many units of each. Line item ids come from get_order (line_items[].id). The quantity cannot exceed the unfulfilled quantity of the line item. Each item: { `line_item_id`, `quantity` }. |

Output fields:

- `id`: Requested Order Edit ID
- `status`: Status
- `requested_at`: Requested At (datetime)
- `request_declined_at`: Declined At (datetime)
- `request_resolved_at`: Resolved At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `order_id`: Order ID
- `order_name`: Order Name
- `order_requested_edit_status`: Order Requested Edit Status
- `removals`: Line Items to Remove
- `removals[].id`: Requested Line Item ID
- `removals[].quantity`: Quantity Requested (number)
- `removals[].resolved_quantity`: Resolved Quantity (number)
- `removals[].line_item_id`: Order Line Item ID
- `removals[].line_item_name`: Line Item Name
- `removals[].line_item_title`: Line Item Title
- `removals[].sku`: SKU
- `removals[].variant_title`: Variant Title
- `removals[].line_item_quantity`: Line Item Ordered Quantity (number)
- `removals[].line_item_current_quantity`: Line Item Current Quantity (number)
- `removals[].line_item_unfulfilled_quantity`: Line Item Unfulfilled Quantity (number)
- `removals[].variant_id`: Variant ID
- `removals[].product_id`: Product ID
- `removals_count`: Removals Returned (number)
- `removals_truncated`: Removals Truncated (boolean)
- `redacted_fields`: Redacted Fields

### `calculate_requested_order_edit`

**Calculate Requested Order Edit.** Previews the financial outcome of a buyer-style order edit that removes unfulfilled line items: the subtotal, order-level discounts, tax and total of the removed items (shop and presentment currency) plus the per-line-item amounts. Nothing is saved and no one is notified. Take the line item ids and unfulfilled quantities from get_order; the quantity per line item cannot exceed its unfulfilled quantity. Run it before create_requested_order_edit to show the buyer or merchant the impact. Needs the read_orders access scope. Without the read_all_orders scope only orders from the last 60 days are visible. Read-only, safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |
| `line_items` | array | yes |  | Line Items to Remove. The order line items the buyer wants removed and how many units of each. Line item ids come from get_order (line_items[].id). The quantity cannot exceed the unfulfilled quantity of the line item. Each item: { `line_item_id`, `quantity` }. |

Output fields:

- `order_id`: Order ID
- `edit_subtotal_before_target_all_discounts`: Subtotal Before Order-Level Discounts
- `edit_order_level_discount_subtotal`: Order-Level Discounts
- `edit_subtotal`: Subtotal
- `edit_subtotal_with_cart_discount`: Subtotal With Order-Level Discounts
- `edit_total_tax`: Total Tax
- `edit_total`: Total
- `currency_code`: Shop Currency Code
- `presentment_edit_subtotal`: Presentment Subtotal
- `presentment_edit_total_tax`: Presentment Total Tax
- `presentment_edit_total`: Presentment Total
- `presentment_currency_code`: Presentment Currency Code
- `removals`: Line Items to Remove
- `removals[].line_item_id`: Order Line Item ID
- `removals[].line_item_name`: Line Item Name
- `removals[].sku`: SKU
- `removals[].line_item_unfulfilled_quantity`: Line Item Unfulfilled Quantity (number)
- `removals[].quantity`: Quantity Removed (number)
- `removals[].subtotal`: Subtotal
- `removals[].total_tax`: Total Tax
- `removals[].presentment_subtotal`: Presentment Subtotal
- `removals[].presentment_total_tax`: Presentment Total Tax
- `removals_count`: Removals Returned (number)
- `removals_truncated`: Removals Truncated (boolean)
- `redacted_fields`: Redacted Fields

### `list_requested_order_edits`

**List Requested Order Edits.** Lists the buyer-requested order edits of one order, each with its id, status (REQUESTED = waiting for the merchant, RESOLVED, DECLINED), request, decline and resolve dates, and the line items the buyer asked to remove with quantities (up to 50 per edit, the most an edit can hold; removals_truncated tells when there are more). Also returns the order-level order_requested_edit_status (NONE, REQUESTED, RESOLVED, DECLINED). Use it to find the requested_order_edit_id for decline_requested_order_edit or resolve_requested_order_edit, and to check whether create_requested_order_edit already took effect before retrying it. Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_orders access scope. Without the read_all_orders scope only orders from the last 60 days are visible. No customer contact fields are read, so protected customer data access is not needed. Read-only. Returns at most 10 edits per call, even when first is larger; pass end_cursor back as after while has_next_page is true. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |
| `first` | number | no | `25` | Page Size. How many records to return, 1 to 25. Defaults to 25. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `order_id`: Order ID
- `order_name`: Order Name
- `order_requested_edit_status`: Order Requested Edit Status
- `items`: Requested Order Edits
- `items[].id`: Requested Order Edit ID
- `items[].status`: Status
- `items[].requested_at`: Requested At (datetime)
- `items[].request_declined_at`: Declined At (datetime)
- `items[].request_resolved_at`: Resolved At (datetime)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].order_id`: Order ID
- `items[].order_name`: Order Name
- `items[].order_requested_edit_status`: Order Requested Edit Status
- `items[].removals`: Line Items to Remove
- `items[].removals[].id`: Requested Line Item ID
- `items[].removals[].quantity`: Quantity Requested (number)
- `items[].removals[].resolved_quantity`: Resolved Quantity (number)
- `items[].removals[].line_item_id`: Order Line Item ID
- `items[].removals[].line_item_name`: Line Item Name
- `items[].removals[].line_item_title`: Line Item Title
- `items[].removals[].sku`: SKU
- `items[].removals[].variant_title`: Variant Title
- `items[].removals[].line_item_quantity`: Line Item Ordered Quantity (number)
- `items[].removals[].line_item_current_quantity`: Line Item Current Quantity (number)
- `items[].removals[].line_item_unfulfilled_quantity`: Line Item Unfulfilled Quantity (number)
- `items[].removals[].variant_id`: Variant ID
- `items[].removals[].product_id`: Product ID
- `items[].removals_count`: Removals Returned (number)
- `items[].removals_truncated`: Removals Truncated (boolean)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `adjust_inventory_quantities`

**Adjust Inventory Quantities.** Changes stock relatively: adds or subtracts a delta (for example -2 or +10) for inventory items at locations, all in one batch under one reason. Every item must already be stocked at its location (see list_inventory_levels); otherwise nothing is changed and you should call activate_inventory_at_location first. Use set_inventory_quantities to set an absolute number instead. Optional expected_quantity per change is a safety check: if the current quantity differs, the whole call fails with CHANGE_FROM_QUANTITY_STALE. Adjusting any quantity name other than "available" needs a ledger_document_uri on every change (a non-Shopify URI such as "gid://my-app/StockMovement/SM-1"). Generate your own idempotency_key (for example a UUID) on the first call and pass the same key on every retry so the delta is not applied twice; the key used is returned and is included in any error message. Inventory item ids come from get_product_variant_details or list_inventory_items, location ids from list_locations. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Quantity Name. Which quantity to adjust. Anything other than "available" needs a ledger document URI on each change. One of `"available"`, `"damaged"`, `"quality_control"`, `"reserved"`, `"safety_stock"`, `"incoming"`. |
| `reason` | string | yes |  | Reason. Why the stock changes; shown in the inventory history. One of `"correction"`, `"cycle_count_available"`, `"damaged"`, `"received"`, `"restock"`, `"shrinkage"`, `"promotion"`, `"quality_control"`, `"safety_stock"`, `"movement_created"`, `"movement_updated"`, `"movement_received"`, `"movement_canceled"`, `"reservation_created"`, `"reservation_updated"`, `"reservation_deleted"`, `"other"`. |
| `changes` | array | yes |  | Changes. One entry per inventory item and location. Each item: { `inventory_item_id`, `location_id`, `delta`, `expected_quantity`?, `ledger_document_uri`? }. |
| `reference_document_uri` | string | no |  | Reference Document URI. Optional URI of the document behind the change, for example "gid://my-app/PurchaseOrder/PO-1". |
| `idempotency_key` | string | no |  | Idempotency Key. A unique key for this operation, for example a UUID such as "3f1c2a9e-6b1d-4c8e-9a51-2f7d0e4b8c10". Generate your own key on the first call and pass the same key again when retrying after a timeout or error, so Shopify does not repeat the operation. If left empty a key is generated; it is returned … |

Output fields:

- `adjustment_group_id`: Adjustment Group ID
- `created_at`: Created At (datetime)
- `reason`: Reason
- `reference_document_uri`: Reference Document URI
- `changes`: Changes
- `changes[].name`: Quantity Name
- `changes[].delta`: Delta (number)
- `changes[].quantity_after_change`: Quantity After Change (number)
- `changes[].ledger_document_uri`: Ledger Document URI
- `changes[].inventory_item_id`: Inventory Item ID
- `changes[].sku`: SKU
- `changes[].location_id`: Location ID
- `changes[].location_name`: Location Name
- `idempotency_key`: Idempotency Key
- `redacted_fields`: Redacted Fields

### `approve_comment`

**Approve Blog Comment.** Approves one blog comment (for example one listed by list_comments with "status:pending") so it shows on the article, and returns the comment with its new status. Approving an already published comment leaves it published, so repeating is safe. Author details may be null without protected customer data access. Needs the write_content access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. The comment id, numeric or "gid://shopify/Comment/…". Find it with list_comments. |

Output fields:

- `id`: Comment ID
- `status`: Status
- `body`: Body
- `body_html`: Body HTML (html)
- `is_published`: Is Published (boolean)
- `published_at`: Published At (datetime)
- `author_name`: Author Name
- `author_email`: Author Email (email)
- `ip`: IP Address
- `user_agent`: User Agent
- `article_id`: Article ID
- `article_title`: Article Title
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `archive_order`

**Archive Order.** Closes an order, which Shopify shows as archived; use it once an order is fully paid and fulfilled. This does not cancel or refund anything, and unarchive_order reopens it. Archiving an already archived order leaves it archived, so repeating is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |

Output fields:

- `id`: Order ID
- `legacy_resource_id`: Numeric ID
- `name`: Order Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `processed_at`: Processed At (datetime)
- `closed`: Closed (boolean)
- `closed_at`: Closed At (datetime)
- `cancelled_at`: Cancelled At (datetime)
- `cancel_reason`: Cancel Reason
- `financial_status`: Financial Status
- `fulfillment_status`: Fulfillment Status
- `test`: Test (boolean)
- `email`: Email (email)
- `phone`: Phone
- `note`: Note
- `tags`: Tags
- `po_number`: PO Number
- `source_name`: Source Name
- `currency_code`: Currency Code
- `subtotal_price`: Subtotal Price (number)
- `total_price`: Total Price (number)
- `total_tax`: Total Tax (number)
- `total_discounts`: Total Discounts (number)
- `total_shipping`: Total Shipping (number)
- `total_refunded`: Total Refunded (number)
- `total_outstanding`: Total Outstanding (number)
- `current_total_price`: Current Total Price (number)
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `customer_email`: Customer Email (email)
- `redacted_fields`: Redacted Fields

### `attach_variant_media`

**Attach Media to Variants.** Attaches media that already belongs to the product to one or more of its variants, so the storefront shows it when that variant is chosen. The media must first be added to the product (add_product_media) and be READY. Media ids come from list_product_media, variant ids from list_product_variants. Attaching the same media again leaves it attached. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id, numeric or "gid://shopify/Product/…". |
| `variant_media` | array | yes |  | Variant Media. Which media to attach to which variant, one entry per pair. Each item: { `variant_id`, `media_id` }. |

Output fields:

- `product_id`: Product ID
- `variants`: Variants
- `variants[].id`: Variant ID
- `variants[].title`: Title
- `variants[].media_ids`: Media IDs
- `redacted_fields`: Redacted Fields

### `bulk_delete_metaobjects`

**Bulk Delete Metaobject Entries.** Starts a background job that permanently deletes metaobject entries and their metafields, and returns only the job; poll get_job with job_id until done is true. scope decides what goes: BY_IDS deletes the listed entry ids (1 to 250); ALL_OF_TYPE deletes EVERY entry of the given type (the type definition itself stays). Cannot be undone. Each call starts a new job, so do not repeat it while the first job runs. Needs the write_metaobjects access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scope` | string | yes |  | Delete Scope. BY_IDS deletes only the listed entries; ALL_OF_TYPE deletes every entry of the type. One of `"BY_IDS"`, `"ALL_OF_TYPE"`. |
| `metaobject_ids` | array | no |  | Metaobject IDs. For BY_IDS: entry ids, numeric or "gid://shopify/Metaobject/…", 1 to 250. |
| `type` | string | no |  | Metaobject Type. For ALL_OF_TYPE: the metaobject type whose entries are all deleted, for example "designer". |

Output fields:

- `job_id`: Job ID
- `done`: Done (boolean)
- `scope`: Scope
- `redacted_fields`: Redacted Fields

### `calculate_refund`

**Calculate Refund.** Previews a refund without moving money: returns the amount, tax, shipping and the suggested refund transactions (parent transaction id, gateway, amount) for the chosen line items and shipping. Every amount is in the shop currency; the presentment_* fields give the same amounts in the customer (presentment) currency. Run it before create_refund and pass its suggested transactions and line items there; when presentment_currency_code differs from currency_code, pass the presentment amounts and presentment_currency_code to create_refund. Read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |
| `line_items` | array | no |  | Line Items to Refund. Line items and quantities to refund. Line item ids come from get_order. Each item: { `line_item_id`, `quantity`, `restock_type`?, `location_id`? }. |
| `refund_shipping` | boolean | no | `false` | Refund All Shipping. Include the full shipping cost in the suggestion. Off by default. |
| `shipping_amount` | number | no |  | Shipping Amount. Refund only this much shipping, for example 4.50. Ignored when refunding all shipping. |
| `suggest_full_refund` | boolean | no | `false` | Suggest Full Refund. Suggest refunding everything still refundable on the order. Off by default. |

Output fields:

- `order_id`: Order ID
- `amount`: Amount (number)
- `currency_code`: Currency Code
- `presentment_amount`: Presentment Amount (number)
- `presentment_currency_code`: Presentment Currency Code
- `subtotal`: Subtotal (number)
- `presentment_subtotal`: Presentment Subtotal (number)
- `total_tax`: Total Tax (number)
- `presentment_total_tax`: Presentment Total Tax (number)
- `maximum_refundable`: Maximum Refundable (number)
- `presentment_maximum_refundable`: Presentment Maximum Refundable (number)
- `discounted_subtotal`: Discounted Subtotal (number)
- `presentment_discounted_subtotal`: Presentment Discounted Subtotal (number)
- `shipping_amount`: Shipping Amount (number)
- `presentment_shipping_amount`: Presentment Shipping Amount (number)
- `shipping_tax`: Shipping Tax (number)
- `presentment_shipping_tax`: Presentment Shipping Tax (number)
- `shipping_maximum_refundable`: Shipping Maximum Refundable (number)
- `presentment_shipping_maximum_refundable`: Presentment Shipping Maximum Refundable (number)
- `refund_line_items`: Refund Line Items
- `refund_line_items[].line_item_id`: Line Item ID
- `refund_line_items[].title`: Title
- `refund_line_items[].sku`: SKU
- `refund_line_items[].quantity`: Quantity (number)
- `refund_line_items[].restock_type`: Restock Type
- `refund_line_items[].location_id`: Location ID
- `refund_line_items[].price`: Price (number)
- `refund_line_items[].presentment_price`: Presentment Price (number)
- `refund_line_items[].subtotal`: Subtotal (number)
- `refund_line_items[].presentment_subtotal`: Presentment Subtotal (number)
- `refund_line_items[].total_tax`: Total Tax (number)
- `refund_line_items[].presentment_total_tax`: Presentment Total Tax (number)
- `suggested_transactions`: Suggested Transactions
- `suggested_transactions[].kind`: Kind
- `suggested_transactions[].gateway`: Gateway
- `suggested_transactions[].parent_transaction_id`: Parent Transaction ID
- `suggested_transactions[].amount`: Amount (number)
- `suggested_transactions[].currency_code`: Currency Code
- `suggested_transactions[].presentment_amount`: Presentment Amount (number)
- `suggested_transactions[].presentment_currency_code`: Presentment Currency Code
- `suggested_transactions[].maximum_refundable`: Maximum Refundable (number)
- `suggested_transactions[].presentment_maximum_refundable`: Presentment Maximum Refundable (number)
- `redacted_fields`: Redacted Fields

### `cancel_bulk_operation`

**Cancel Bulk Operation.** Starts cancelling a running bulk operation and returns it, usually with status CANCELING; it becomes CANCELED shortly after (check with get_bulk_operation). A cancelled bulk query produces no complete result file (partial_data_url may hold what was read), and a cancelled bulk mutation keeps every line it already applied; nothing is rolled back. It cannot be resumed; start a new operation instead. Cancelling an operation that already finished fails with "A bulk operation cannot be canceled when it is completed". Frees a slot when the per-shop limit of running bulk operations is reached. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bulk_operation_id` | string | yes |  | Bulk Operation ID. The bulk operation id, numeric or "gid://shopify/BulkOperation/…". Find running ones with list_bulk_operations. |

Output fields:

- `id`: Bulk Operation ID
- `status`: Status
- `type`: Type
- `error_code`: Error Code
- `created_at`: Created At (datetime)
- `completed_at`: Completed At (datetime)
- `object_count`: Object Count (number)
- `root_object_count`: Root Object Count (number)
- `file_size`: File Size (filesize)
- `url`: Result File URL (url)
- `partial_data_url`: Partial Data URL (url)
- `query`: Query
- `redacted_fields`: Redacted Fields

### `cancel_fulfillment_order`

**Cancel Fulfillment Order.** Cancels one fulfillment order and closes it; Shopify creates replacement_fulfillment_order for the work still to be done. Works only when the fulfillment order was sent to a fulfillment service and its request_status is SUBMITTED (cancelled at once) or CANCELLATION_REQUESTED; for other states Shopify returns an error. A service that already accepted the request may still ship. This does not cancel the order itself (use start_order_cancellation for that). Cannot be undone; a repeat call fails because the fulfillment order is closed. Needs the write_merchant_managed_fulfillment_orders access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fulfillment_order_id` | string | yes |  | Fulfillment Order ID. The fulfillment order to cancel, numeric or "gid://shopify/FulfillmentOrder/…". Find it with list_order_fulfillment_orders. |

Output fields:

- `fulfillment_order`: Fulfillment Order
- `fulfillment_order.id`: Fulfillment Order ID
- `fulfillment_order.status`: Status
- `fulfillment_order.request_status`: Request Status
- `fulfillment_order.order_id`: Order ID
- `fulfillment_order.order_name`: Order Name
- `fulfillment_order.created_at`: Created At (datetime)
- `fulfillment_order.updated_at`: Updated At (datetime)
- `fulfillment_order.fulfill_at`: Fulfill At (datetime)
- `fulfillment_order.fulfill_by`: Fulfill By (datetime)
- `fulfillment_order.assigned_location_id`: Assigned Location ID
- `fulfillment_order.assigned_location_name`: Assigned Location Name
- `fulfillment_order.destination_first_name`: Destination First Name
- `fulfillment_order.destination_last_name`: Destination Last Name
- `fulfillment_order.destination_company`: Destination Company
- `fulfillment_order.destination_address1`: Destination Address 1
- `fulfillment_order.destination_address2`: Destination Address 2
- `fulfillment_order.destination_city`: Destination City
- `fulfillment_order.destination_province`: Destination Province
- `fulfillment_order.destination_zip`: Destination Zip
- `fulfillment_order.destination_country_code`: Destination Country Code
- `fulfillment_order.destination_phone`: Destination Phone
- `fulfillment_order.destination_email`: Destination Email (email)
- `fulfillment_order.delivery_method_type`: Delivery Method Type
- `fulfillment_order.delivery_method_name`: Delivery Method Name
- `fulfillment_order.holds`: Holds
- `fulfillment_order.holds[].id`: Hold ID
- `fulfillment_order.holds[].reason`: Reason
- `fulfillment_order.holds[].reason_notes`: Reason Notes
- `fulfillment_order.holds[].display_reason`: Display Reason
- `fulfillment_order.holds[].handle`: Handle
- `fulfillment_order.holds[].held_by_requesting_app`: Held By This App (boolean)
- `fulfillment_order.supported_actions`: Supported Actions
- `fulfillment_order.line_items`: Line Items
- `fulfillment_order.line_items[].id`: Fulfillment Order Line Item ID
- `fulfillment_order.line_items[].sku`: SKU
- `fulfillment_order.line_items[].product_title`: Product Title
- `fulfillment_order.line_items[].variant_title`: Variant Title
- `fulfillment_order.line_items[].total_quantity`: Total Quantity (number)
- `fulfillment_order.line_items[].remaining_quantity`: Remaining Quantity (number)
- `fulfillment_order.line_items[].requires_shipping`: Requires Shipping (boolean)
- `fulfillment_order.line_items[].line_item_id`: Order Line Item ID
- `fulfillment_order.line_items[].variant_id`: Variant ID
- `fulfillment_order.line_items[].inventory_item_id`: Inventory Item ID
- `fulfillment_order.line_items_truncated`: Line Items Truncated (boolean)
- `fulfillment_order.line_items_end_cursor`: Line Items Cursor
- `replacement_fulfillment_order`: Replacement Fulfillment Order
- `replacement_fulfillment_order.id`: Fulfillment Order ID
- `replacement_fulfillment_order.status`: Status
- `replacement_fulfillment_order.request_status`: Request Status
- `replacement_fulfillment_order.order_id`: Order ID
- `replacement_fulfillment_order.order_name`: Order Name
- `replacement_fulfillment_order.created_at`: Created At (datetime)
- `replacement_fulfillment_order.updated_at`: Updated At (datetime)
- `replacement_fulfillment_order.fulfill_at`: Fulfill At (datetime)
- `replacement_fulfillment_order.fulfill_by`: Fulfill By (datetime)
- `replacement_fulfillment_order.assigned_location_id`: Assigned Location ID
- `replacement_fulfillment_order.assigned_location_name`: Assigned Location Name
- `replacement_fulfillment_order.destination_first_name`: Destination First Name
- `replacement_fulfillment_order.destination_last_name`: Destination Last Name
- `replacement_fulfillment_order.destination_company`: Destination Company
- `replacement_fulfillment_order.destination_address1`: Destination Address 1
- `replacement_fulfillment_order.destination_address2`: Destination Address 2
- `replacement_fulfillment_order.destination_city`: Destination City
- `replacement_fulfillment_order.destination_province`: Destination Province
- `replacement_fulfillment_order.destination_zip`: Destination Zip
- `replacement_fulfillment_order.destination_country_code`: Destination Country Code
- `replacement_fulfillment_order.destination_phone`: Destination Phone
- `replacement_fulfillment_order.destination_email`: Destination Email (email)
- `replacement_fulfillment_order.delivery_method_type`: Delivery Method Type
- `replacement_fulfillment_order.delivery_method_name`: Delivery Method Name
- `replacement_fulfillment_order.holds`: Holds
- `replacement_fulfillment_order.holds[].id`: Hold ID
- `replacement_fulfillment_order.holds[].reason`: Reason
- `replacement_fulfillment_order.holds[].reason_notes`: Reason Notes
- `replacement_fulfillment_order.holds[].display_reason`: Display Reason
- `replacement_fulfillment_order.holds[].handle`: Handle
- `replacement_fulfillment_order.holds[].held_by_requesting_app`: Held By This App (boolean)
- `replacement_fulfillment_order.supported_actions`: Supported Actions
- `replacement_fulfillment_order.line_items`: Line Items
- `replacement_fulfillment_order.line_items[].id`: Fulfillment Order Line Item ID
- `replacement_fulfillment_order.line_items[].sku`: SKU
- `replacement_fulfillment_order.line_items[].product_title`: Product Title
- `replacement_fulfillment_order.line_items[].variant_title`: Variant Title
- `replacement_fulfillment_order.line_items[].total_quantity`: Total Quantity (number)
- `replacement_fulfillment_order.line_items[].remaining_quantity`: Remaining Quantity (number)
- `replacement_fulfillment_order.line_items[].requires_shipping`: Requires Shipping (boolean)
- `replacement_fulfillment_order.line_items[].line_item_id`: Order Line Item ID
- `replacement_fulfillment_order.line_items[].variant_id`: Variant ID
- `replacement_fulfillment_order.line_items[].inventory_item_id`: Inventory Item ID
- `replacement_fulfillment_order.line_items_truncated`: Line Items Truncated (boolean)
- `replacement_fulfillment_order.line_items_end_cursor`: Line Items Cursor
- `redacted_fields`: Redacted Fields

### `cancel_fulfillment`

**Cancel Fulfillment.** Cancels one fulfillment (a shipment already recorded) and returns it with status CANCELLED. Shopify reverses it on the fulfillment orders: the cancelled items get new fulfillment orders so they can be fulfilled again (at the original location when still stocked there, otherwise by the store's fulfillment priority). Tracking on the cancelled fulfillment stops being shown to the customer. Cannot be undone; a repeat call fails because the fulfillment is already cancelled. The required access scope is not documented for this mutation (write_merchant_managed_fulfillment_orders is expected). Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fulfillment_id` | string | yes |  | Fulfillment ID. The fulfillment to cancel, numeric or "gid://shopify/Fulfillment/…". Find it with list_order_fulfillments. |

Output fields:

- `id`: Fulfillment ID
- `legacy_resource_id`: Legacy Resource ID
- `name`: Name
- `status`: Status
- `display_status`: Display Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `in_transit_at`: In Transit At (datetime)
- `delivered_at`: Delivered At (datetime)
- `estimated_delivery_at`: Estimated Delivery At (datetime)
- `total_quantity`: Total Quantity (number)
- `requires_shipping`: Requires Shipping (boolean)
- `tracking_company`: Tracking Company
- `tracking_numbers`: Tracking Numbers
- `tracking_urls`: Tracking URLs
- `location_id`: Location ID
- `location_name`: Location Name
- `service_id`: Fulfillment Service ID
- `service_name`: Fulfillment Service Name
- `order_id`: Order ID
- `order_name`: Order Name
- `redacted_fields`: Redacted Fields

### `capture_order_payment`

**Capture Order Payment.** Moves money: captures all or part of an authorized payment on an order. Needs the authorization transaction id from list_order_transactions and the amount to capture. To release an authorization without charging use void_order_transaction; to record an offline payment use mark_order_as_paid. Each call is a new capture, so do not retry blindly; check list_order_transactions first. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". |
| `parent_transaction_id` | string | yes |  | Authorization Transaction ID. The AUTHORIZATION transaction to capture, numeric or "gid://shopify/OrderTransaction/…". Find it with list_order_transactions. |
| `amount` | number | yes |  | Amount. Amount to capture, for example 49.99. Cannot exceed the authorized amount still capturable. |
| `currency` | string | no |  | Currency. Three-letter currency of the amount, for example "EUR". Required when the order was paid in a currency other than the shop currency. |
| `final_capture` | string | no |  | Final Capture. For payments that allow several captures: Yes releases the rest of the authorization after this capture. Leave empty for the gateway default. One of `"true"`, `"false"`. |

Output fields:

- `id`: Transaction ID
- `kind`: Kind
- `status`: Status
- `gateway`: Gateway
- `formatted_gateway`: Formatted Gateway
- `test`: Test (boolean)
- `amount`: Amount (number)
- `currency_code`: Currency Code
- `total_unsettled`: Total Unsettled (number)
- `maximum_refundable`: Maximum Refundable (number)
- `manually_capturable`: Manually Capturable (boolean)
- `multi_capturable`: Multi Capturable (boolean)
- `authorization_expires_at`: Authorization Expires At (datetime)
- `error_code`: Error Code
- `payment_id`: Payment ID
- `parent_transaction_id`: Parent Transaction ID
- `order_id`: Order ID
- `order_name`: Order Name
- `created_at`: Created At (datetime)
- `processed_at`: Processed At (datetime)
- `redacted_fields`: Redacted Fields

### `complete_draft_order`

**Complete Draft Order.** Converts a draft order into a real order and reserves its inventory; the new order id is returned in order_id. To leave the order payment-pending, set payment terms on the draft first with update_draft_order; without payment terms Shopify records the order as paid. A payment gateway id only chooses the gateway the payment is recorded against; it does not keep the order unpaid. Completing twice fails, so do not repeat it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draft_order_id` | string | yes |  | Draft Order ID. The draft order id, numeric or "gid://shopify/DraftOrder/…". Find it with list_draft_orders. |
| `payment_gateway_id` | string | no |  | Payment Gateway ID. Optional manual payment gateway to record the payment against, as a full id such as "gid://shopify/PaymentGateway/1". |
| `source_name` | string | no |  | Source Name. Optional channel label stored on the order, for example "phone". |

Output fields:

- `id`: Draft Order ID
- `legacy_resource_id`: Numeric ID
- `name`: Draft Order Name
- `status`: Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `invoice_url`: Invoice URL (url)
- `invoice_sent_at`: Invoice Sent At (datetime)
- `email`: Email (email)
- `phone`: Phone
- `note`: Note
- `tags`: Tags
- `po_number`: PO Number
- `ready`: Ready (boolean)
- `currency_code`: Currency Code
- `subtotal_price`: Subtotal Price (number)
- `total_price`: Total Price (number)
- `total_tax`: Total Tax (number)
- `total_discounts`: Total Discounts (number)
- `total_shipping`: Total Shipping (number)
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `order_id`: Order ID
- `order_name`: Order Name
- `reserve_inventory_until`: Reserve Inventory Until (datetime)
- `tax_exempt`: Tax Exempt (boolean)
- `taxes_included`: Taxes Included (boolean)
- `discount_codes`: Discount Codes
- `applied_discount_title`: Applied Discount Title
- `applied_discount_value`: Applied Discount Value (number)
- `applied_discount_value_type`: Applied Discount Value Type
- `applied_discount_amount`: Applied Discount Amount (number)
- `payment_terms_id`: Payment Terms ID
- `payment_terms_name`: Payment Terms Name
- `payment_terms_type`: Payment Terms Type
- `payment_terms_due_in_days`: Payment Terms Due In Days (number)
- `shipping_line_title`: Shipping Line Title
- `shipping_line_price`: Shipping Line Price (number)
- `shipping_name`: Shipping Name
- `shipping_company`: Shipping Company
- `shipping_address1`: Shipping Address 1
- `shipping_address2`: Shipping Address 2
- `shipping_city`: Shipping City
- `shipping_province_code`: Shipping Province Code
- `shipping_country_code`: Shipping Country Code
- `shipping_zip`: Shipping ZIP
- `shipping_phone`: Shipping Phone
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].title`: Title
- `line_items[].sku`: SKU
- `line_items[].quantity`: Quantity (number)
- `line_items[].custom`: Custom Item (boolean)
- `line_items[].original_unit_price`: Original Unit Price (number)
- `line_items[].discounted_total`: Discounted Total (number)
- `line_items[].variant_id`: Variant ID
- `line_items_has_more`: Line Items Has More (boolean)
- `redacted_fields`: Redacted Fields

### `count_abandoned_checkouts`

**Count Abandoned Checkouts.** Counts abandoned checkouts, optionally filtered with search syntax such as "created_at:>=2026-09-01". precision is AT_LEAST when Shopify stopped counting at its limit. Use list_abandoned_checkouts to see them. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify search syntax, for example "created_at:>=2026-09-01". Leave empty to count all. |

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `count_blogs`

**Count Blogs.** Counts the online store's blogs, optionally filtered with search syntax such as "title:News". Shopify stops counting at 10,000 by default; precision is AT_LEAST when it did. Use list_blogs to see them. Needs the read_content access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify blog search syntax, for example "title:News". Leave empty to count all. |

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `count_catalogs`

**Count Catalogs.** Counts catalogs (market, B2B company-location and app catalogs), optionally only one type or those matching Shopify search syntax such as "status:ACTIVE". Plan requirement: B2B company-location catalogs exist only on Shopify Plus stores, so on other plans only market catalogs count. Shopify stops counting at 10,000; precision is AT_LEAST when it did. The required access scope is not documented. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no |  | Catalog Type. Only count catalogs of this type. Leave empty for all types. One of `"MARKET"`, `"COMPANY_LOCATION"`, `"APP"`, `"NONE"`. |
| `query` | string | no |  | Search Query. Shopify catalog search syntax, for example "status:ACTIVE" or "title:wholesale". Leave empty to count all. |

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `count_collections`

**Count Collections.** Counts collections, optionally filtered with search syntax such as "collection_type:smart" or "title:Summer*". precision is AT_LEAST when Shopify stopped counting at its limit. Use search_collections to see them. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify collection search syntax, for example "collection_type:custom". Leave empty to count all. |

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `count_customer_segments`

**Count Customer Segments.** Returns how many customer segments (saved customer groups) the store has. precision is AT_LEAST when Shopify stopped counting at its limit. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `count_customers`

**Count Customers.** Counts customers, optionally filtered by created_at, updated_at or id (for example "created_at:>2026-01-01"). Shopify ignores other filters such as tag or email when counting customers; the action then fails with a clear error instead of returning the count of every customer, so use search_customers to find customers by tag or email. precision is AT_LEAST when Shopify stopped counting at its limit. Use search_customers to see them. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Filter by created_at, updated_at or id, for example "created_at:>2026-01-01". Leave empty to count all. |

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `count_discount_codes`

**Count Discount Codes.** Counts redeem codes (the strings customers type) across all code discounts, optionally filtered with search syntax such as "times_used:0". One code discount can hold many codes, so this differs from count_discounts. Shopify stops counting at 10,000 by default; precision is AT_LEAST when it did. Needs the read_discounts access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Optional Shopify search syntax on the codes, for example "times_used:0". Leave empty to count all. |

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `count_discounts`

**Count Discounts.** Counts the store's discounts, code and automatic, optionally filtered with search syntax such as "status:active" or "method:automatic". This counts discounts, not redeem codes (use count_discount_codes for codes). Shopify stops counting at 10,000 by default; precision is AT_LEAST when it did. Needs the read_discounts access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify discount search syntax, for example "status:active method:code". Leave empty to count all. |

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `count_draft_orders`

**Count Draft Orders.** Counts draft orders, optionally filtered with search syntax such as "status:open". precision is AT_LEAST when Shopify stopped counting at its limit. Use list_draft_orders to see them. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify draft order search syntax, for example "status:open". Leave empty to count all. |

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `count_events`

**Count Store Events.** Counts store events (the activity log), optionally filtered with the same search syntax as list_events, for example "action:'destroy' AND subject_type:'PRODUCT'" or "created_at:>2026-09-01". Shopify stops counting at 10,000; precision is AT_LEAST when it did. No dedicated access scope is documented; the read scope of each subject type is expected to apply (not yet confirmed on a store). Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify event search syntax, for example "subject_type:'ORDER'" or "created_at:>2026-09-01". Leave empty to count all. |

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `count_gift_cards`

**Count Gift Cards.** Counts the store's gift cards (enabled, disabled and fully redeemed alike), optionally filtered with search syntax such as "status:enabled". Shopify stops counting at 10,000 by default; precision is AT_LEAST when it did. Use search_gift_cards to see them. Needs the read_gift_cards access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify gift card search syntax, for example "status:enabled". Leave empty to count all. |

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `count_locations`

**Count Locations.** Counts the store's locations, optionally filtered with search syntax such as "name:Warehouse*". precision is AT_LEAST when Shopify stopped counting at its limit. Use list_locations to see them. Needs the read_locations access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify location search syntax, for example "name:Warehouse*". Leave empty to count all. |

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `count_pages`

**Count Online Store Pages.** Counts all online store content pages, published and hidden alike (Shopify offers no filter for this count). Shopify stops counting at 10,000 by default; precision is AT_LEAST when it did. Use list_pages to see or filter them. Needs the read_content access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `count_products`

**Count Products.** Counts products, optionally filtered with search syntax such as "status:active" or "vendor:Nike". precision is AT_LEAST when Shopify stopped counting at its limit. Use search_products to see them. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify product search syntax, for example "status:active" or "tag:sale". Leave empty to count all. |

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `count_url_redirects`

**Count URL Redirects.** Counts the online store's URL redirects, optionally filtered with search syntax such as "path:/collections". Shopify stops counting at 10,000 by default; precision is AT_LEAST when it did. Use list_url_redirects to see them. Needs the read_online_store_navigation access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify redirect search syntax, for example "path:/collections". Leave empty to count all. |

Output fields:

- `count`: Count (number)
- `precision`: Precision
- `redacted_fields`: Redacted Fields

### `create_article`

**Create Blog Article.** Creates an article in an existing blog and returns it with its id. Needs the blog id (from list_blogs), a title and an author name; the body is HTML. The article is created hidden unless is_published is Yes, so nothing goes live by accident. publish_date alone does not publish or schedule the article; is_published must be Yes as well. Each call creates another article, so do not repeat it after a success. Needs the write_content access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `blog_id` | string | yes |  | Blog ID. The blog to write in, numeric or "gid://shopify/Blog/…". Find it with list_blogs. |
| `title` | string | yes |  | Title. Article title, for example "Our summer collection is here". |
| `author_name` | string | yes |  | Author Name. Name shown as the author, for example "Jane Doe". |
| `body_html` | string | no |  | Body (HTML). Article content, HTML allowed, for example "<p>Hello</p>". |
| `summary_html` | string | no |  | Summary (HTML). Short excerpt shown in blog listings, HTML allowed. |
| `tags` | array | no |  | Tags. Tags for the article, for example ["news", "summer"]. |
| `is_published` | string | no |  | Published. Yes publishes the article on the storefront. Leave empty or No to keep it hidden. One of `"true"`, `"false"`. |
| `publish_date` | ISO date-time string | no |  | Publish Date. Publication date and time, ISO 8601, for example "2026-10-01T09:00:00Z". It does not publish or schedule the article on its own; Published must be Yes as well. |
| `handle` | string | no |  | Handle. URL handle, for example "summer-collection". Leave empty to generate it from the title. |
| `image_url` | string | no |  | Image URL. Public URL of the featured image, for example "https://example.com/banner.jpg". |
| `image_alt_text` | string | no |  | Image Alt Text. Alternative text for the featured image. Needs image_url. |
| `template_suffix` | string | no |  | Template Suffix. Theme template suffix, for example "wide". Leave empty for the default template. |

Output fields:

- `id`: Article ID
- `title`: Title
- `handle`: Handle
- `author_name`: Author Name
- `blog_id`: Blog ID
- `blog_title`: Blog Title
- `summary_html`: Summary (html)
- `tags`: Tags
- `is_published`: Is Published (boolean)
- `published_at`: Published At (datetime)
- `template_suffix`: Template Suffix
- `image_url`: Image (image)
- `image_alt_text`: Image Alt Text
- `comments_count`: Comments Count (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `body_html`: Body HTML (html)
- `redacted_fields`: Redacted Fields

### `create_basic_discount_code`

**Create Amount-Off Discount Code.** Creates an amount-off discount code (percentage or fixed amount) and returns it with its id (gid://shopify/DiscountCodeNode/…). value_type PERCENTAGE takes the percent as a number (15 means 15% off); FIXED_AMOUNT takes an amount in the shop currency. applies_to decides what it discounts: ALL items, specific PRODUCTS (product or variant ids) or COLLECTIONS; left unset it follows the ids given, and is ALL only when no ids are given. eligibility decides who can use it: ALL buyers, specific CUSTOMERS or customer SEGMENTS; left unset it follows the ids given, and is ALL only when no ids are given. Optional minimum subtotal or quantity, usage limit, once per customer, end date, tags and which other discount classes it combines with (all off by default). starts_at defaults to now, so the code is live immediately unless a later start is given. Each call creates another discount; a code that already exists is rejected by Shopify. Needs the write_discounts access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Internal title shown in the admin, for example "Spring sale 15%". |
| `code` | string | yes |  | Code. The code customers enter at checkout, for example "SPRING15". |
| `value_type` | string | yes |  | Value Type. Percentage off or a fixed amount off. One of `"PERCENTAGE"`, `"FIXED_AMOUNT"`. |
| `value` | number | yes |  | Value. For PERCENTAGE the percent, 15 means 15% off (above 0, at most 100). For FIXED_AMOUNT the amount in the shop currency, for example 10. |
| `applies_on_each_item` | string | no |  | Apply Amount To Each Item. FIXED_AMOUNT only: Yes takes the amount off every eligible item, No takes it off once per order. Leave unset for Shopify's default. One of `"true"`, `"false"`. |
| `applies_to` | string | no |  | Applies To. What the discount applies to. Leave unset to infer it from the ids: PRODUCTS when product_ids or variant_ids are given, COLLECTIONS when collection_ids are given, ALL items when no ids are given. One of `"ALL"`, `"PRODUCTS"`, `"COLLECTIONS"`. |
| `product_ids` | array | no |  | Product IDs. With applies_to PRODUCTS: product ids, numeric or "gid://shopify/Product/…". |
| `variant_ids` | array | no |  | Variant IDs. With applies_to PRODUCTS: variant ids, numeric or "gid://shopify/ProductVariant/…". |
| `collection_ids` | array | no |  | Collection IDs. With applies_to COLLECTIONS: collection ids, numeric or "gid://shopify/Collection/…". |
| `eligibility` | string | no |  | Eligibility. Who can use the code. Leave unset to infer it from the ids: CUSTOMERS when customer_ids are given, SEGMENTS when segment_ids are given, ALL buyers when no ids are given. One of `"ALL"`, `"CUSTOMERS"`, `"SEGMENTS"`. |
| `customer_ids` | array | no |  | Customer IDs. With eligibility CUSTOMERS: customer ids, numeric or "gid://shopify/Customer/…". |
| `segment_ids` | array | no |  | Segment IDs. With eligibility SEGMENTS: customer segment ids, numeric or "gid://shopify/Segment/…". |
| `minimum_requirement` | string | no |  | Minimum Requirement. Optional minimum the cart must reach. Leave unset for none. One of `"SUBTOTAL"`, `"QUANTITY"`. |
| `minimum_value` | number | no |  | Minimum Value. With a minimum requirement: the subtotal (for example 50) or the whole-number item quantity (for example 3). |
| `starts_at` | ISO date-time string | no |  | Starts At. When the code becomes usable, ISO 8601. Defaults to now. |
| `ends_at` | ISO date-time string | no |  | Ends At. Optional end, ISO 8601. Leave empty for no end date. |
| `usage_limit` | number | no |  | Usage Limit. Optional total number of times the code can be used across all customers. |
| `applies_once_per_customer` | boolean | no | `false` | Once Per Customer. Each customer can use the code only once. Off by default. |
| `combines_with_product_discounts` | boolean | no | `false` | Combines With Product Discounts. Can be combined with other product discounts. Off by default. |
| `combines_with_order_discounts` | boolean | no | `false` | Combines With Order Discounts. Can be combined with order discounts. Off by default. |
| `combines_with_shipping_discounts` | boolean | no | `false` | Combines With Shipping Discounts. Can be combined with shipping discounts. Off by default. |
| `tags` | array | no |  | Tags. Optional tags for the discount, for example "spring". |

Output fields:

- `id`: Discount ID
- `method`: Method
- `discount_type`: Discount Type
- `title`: Title
- `status`: Status
- `summary`: Summary
- `starts_at`: Starts At (datetime)
- `ends_at`: Ends At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `usage_count`: Usage Count (number)
- `discount_classes`: Discount Classes
- `tags`: Tags
- `combines_with_product_discounts`: Combines With Product Discounts (boolean)
- `combines_with_order_discounts`: Combines With Order Discounts (boolean)
- `combines_with_shipping_discounts`: Combines With Shipping Discounts (boolean)
- `applies_once_per_customer`: Applies Once Per Customer (boolean)
- `usage_limit`: Usage Limit (number)
- `codes_count`: Codes Count (number)
- `codes`: Codes
- `eligibility`: Eligibility
- `customer_ids`: Customer IDs
- `segment_ids`: Segment IDs
- `market_ids`: Market IDs
- `markets_truncated`: Markets Truncated (boolean)
- `value_type`: Value Type
- `percentage`: Percentage (number)
- `amount`: Amount (number)
- `amount_currency`: Amount Currency
- `applies_on_each_item`: Applies On Each Item (boolean)
- `quantity`: Quantity (number)
- `applies_to`: Applies To
- `product_ids`: Product IDs
- `variant_ids`: Variant IDs
- `collection_ids`: Collection IDs
- `items_truncated`: Items Truncated (boolean)
- `buys_type`: Buys Type
- `buys_quantity`: Buys Quantity (number)
- `buys_amount`: Buys Amount (number)
- `buys_applies_to`: Buys Applies To
- `buys_product_ids`: Buys Product IDs
- `buys_variant_ids`: Buys Variant IDs
- `buys_collection_ids`: Buys Collection IDs
- `buys_items_truncated`: Buys Items Truncated (boolean)
- `minimum_quantity`: Minimum Quantity (number)
- `minimum_subtotal`: Minimum Subtotal (number)
- `minimum_subtotal_currency`: Minimum Subtotal Currency
- `maximum_shipping_price`: Maximum Shipping Price (number)
- `destination_all_countries`: Destination All Countries (boolean)
- `destination_countries`: Destination Countries
- `uses_per_order_limit`: Uses Per Order Limit (number)
- `redacted_fields`: Redacted Fields

### `create_blog`

**Create Blog.** Creates a blog on the online store and returns it with its id. Only the title is required; the handle is generated from the title when left empty. comment_policy decides whether readers can comment (CLOSED, MODERATED or AUTO_PUBLISHED); when empty Shopify's default applies. Each call creates another blog, so do not repeat it after a success. Needs the write_content access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Blog title, for example "News". |
| `handle` | string | no |  | Handle. URL handle, for example "news". Leave empty to generate it from the title. |
| `comment_policy` | string | no |  | Comment Policy. Whether readers can comment on articles. Leave empty for the Shopify default. One of `"CLOSED"`, `"MODERATED"`, `"AUTO_PUBLISHED"`. |
| `template_suffix` | string | no |  | Template Suffix. Theme template suffix, for example "wide" for blog.wide.json. Leave empty for the default template. |

Output fields:

- `id`: Blog ID
- `title`: Title
- `handle`: Handle
- `comment_policy`: Comment Policy
- `template_suffix`: Template Suffix
- `articles_count`: Articles Count (number)
- `feed_path`: Feed Path
- `feed_location`: Feed Location (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `create_bxgy_discount_code`

**Create Buy X Get Y Discount Code.** Creates a Buy X Get Y discount code and returns it with its id (gid://shopify/DiscountCodeNode/…). What the customer must buy: buys_type QUANTITY (buys_value is a whole number of items) or AMOUNT (buys_value is a spend in the shop currency), from specific products or variants (buys_product_ids / buys_variant_ids) or collections (buys_collection_ids). What the customer gets: gets_quantity items from gets_product_ids / gets_variant_ids or gets_collection_ids, discounted by gets_percentage (100 means free, the default; 50 means half price). Products and collections cannot be mixed on one side, and each side needs at least one id because Buy X Get Y cannot apply to all items. uses_per_order_limit caps how many times the offer applies in one order. eligibility decides who can use it: ALL buyers, specific CUSTOMERS or customer SEGMENTS; left unset it follows the ids given, and is ALL only when no ids are given. Optional usage limit, once per customer, end date, tags and which other discount classes it combines with (all off by default). starts_at defaults to now, so the code is live immediately unless a later start is given. Each call creates another discount; a code that already exists is rejected by Shopify. Needs the write_discounts access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Internal title shown in the admin, for example "Buy 2 shirts, get 1 cap free". |
| `code` | string | yes |  | Code. The code customers enter at checkout, for example "B2G1CAP". |
| `buys_type` | string | yes |  | Customer Buys. What the customer must buy to unlock the offer: a number of items or a minimum spend. One of `"QUANTITY"`, `"AMOUNT"`. |
| `buys_value` | number | yes |  | Buys Value. For QUANTITY the whole number of qualifying items, for example 2. For AMOUNT the spend on qualifying items in the shop currency, for example 50. |
| `buys_product_ids` | array | no |  | Buys Product IDs. Products that count toward what the customer buys, numeric or "gid://shopify/Product/…". Use products and variants, or collections, not both. |
| `buys_variant_ids` | array | no |  | Buys Variant IDs. Variants that count toward what the customer buys, numeric or "gid://shopify/ProductVariant/…". |
| `buys_collection_ids` | array | no |  | Buys Collection IDs. Collections whose products count toward what the customer buys, numeric or "gid://shopify/Collection/…". |
| `gets_quantity` | number | yes |  | Gets Quantity. How many discounted items the customer gets, a whole number of 1 or more, for example 1. |
| `gets_percentage` | number | no |  | Gets Percentage Off. Percent off the items the customer gets, above 0 and at most 100. 100 (the default) makes them free; 50 is half price. |
| `gets_product_ids` | array | no |  | Gets Product IDs. Products the customer gets at the discount, numeric or "gid://shopify/Product/…". Use products and variants, or collections, not both. |
| `gets_variant_ids` | array | no |  | Gets Variant IDs. Variants the customer gets at the discount, numeric or "gid://shopify/ProductVariant/…". |
| `gets_collection_ids` | array | no |  | Gets Collection IDs. Collections whose products the customer gets at the discount, numeric or "gid://shopify/Collection/…". |
| `uses_per_order_limit` | number | no |  | Uses Per Order Limit. Optional: the most times the offer applies in one order, a whole number of 1 or more. Leave empty for no limit. |
| `eligibility` | string | no |  | Eligibility. Who can use the code. Leave unset to infer it from the ids: CUSTOMERS when customer_ids are given, SEGMENTS when segment_ids are given, ALL buyers when no ids are given. One of `"ALL"`, `"CUSTOMERS"`, `"SEGMENTS"`. |
| `customer_ids` | array | no |  | Customer IDs. With eligibility CUSTOMERS: customer ids, numeric or "gid://shopify/Customer/…". |
| `segment_ids` | array | no |  | Segment IDs. With eligibility SEGMENTS: customer segment ids, numeric or "gid://shopify/Segment/…". |
| `starts_at` | ISO date-time string | no |  | Starts At. When the code becomes usable, ISO 8601. Defaults to now. |
| `ends_at` | ISO date-time string | no |  | Ends At. Optional end, ISO 8601. Leave empty for no end date. |
| `usage_limit` | number | no |  | Usage Limit. Optional total number of times the code can be used across all customers. |
| `applies_once_per_customer` | boolean | no | `false` | Once Per Customer. Each customer can use the code only once. Off by default. |
| `combines_with_product_discounts` | boolean | no | `false` | Combines With Product Discounts. Can be combined with other product discounts. Off by default. |
| `combines_with_order_discounts` | boolean | no | `false` | Combines With Order Discounts. Can be combined with order discounts. Off by default. |
| `combines_with_shipping_discounts` | boolean | no | `false` | Combines With Shipping Discounts. Can be combined with shipping discounts. Off by default. |
| `tags` | array | no |  | Tags. Optional tags for the discount, for example "bogo". |

Output fields:

- `id`: Discount ID
- `method`: Method
- `discount_type`: Discount Type
- `title`: Title
- `status`: Status
- `summary`: Summary
- `starts_at`: Starts At (datetime)
- `ends_at`: Ends At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `usage_count`: Usage Count (number)
- `discount_classes`: Discount Classes
- `tags`: Tags
- `combines_with_product_discounts`: Combines With Product Discounts (boolean)
- `combines_with_order_discounts`: Combines With Order Discounts (boolean)
- `combines_with_shipping_discounts`: Combines With Shipping Discounts (boolean)
- `applies_once_per_customer`: Applies Once Per Customer (boolean)
- `usage_limit`: Usage Limit (number)
- `codes_count`: Codes Count (number)
- `codes`: Codes
- `eligibility`: Eligibility
- `customer_ids`: Customer IDs
- `segment_ids`: Segment IDs
- `market_ids`: Market IDs
- `markets_truncated`: Markets Truncated (boolean)
- `value_type`: Value Type
- `percentage`: Percentage (number)
- `amount`: Amount (number)
- `amount_currency`: Amount Currency
- `applies_on_each_item`: Applies On Each Item (boolean)
- `quantity`: Quantity (number)
- `applies_to`: Applies To
- `product_ids`: Product IDs
- `variant_ids`: Variant IDs
- `collection_ids`: Collection IDs
- `items_truncated`: Items Truncated (boolean)
- `buys_type`: Buys Type
- `buys_quantity`: Buys Quantity (number)
- `buys_amount`: Buys Amount (number)
- `buys_applies_to`: Buys Applies To
- `buys_product_ids`: Buys Product IDs
- `buys_variant_ids`: Buys Variant IDs
- `buys_collection_ids`: Buys Collection IDs
- `buys_items_truncated`: Buys Items Truncated (boolean)
- `minimum_quantity`: Minimum Quantity (number)
- `minimum_subtotal`: Minimum Subtotal (number)
- `minimum_subtotal_currency`: Minimum Subtotal Currency
- `maximum_shipping_price`: Maximum Shipping Price (number)
- `destination_all_countries`: Destination All Countries (boolean)
- `destination_countries`: Destination Countries
- `uses_per_order_limit`: Uses Per Order Limit (number)
- `redacted_fields`: Redacted Fields

### `create_collection`

**Create Collection.** Creates one collection whose products are picked by hand (the equivalent of a custom collection), optionally with the given products already in it. Use create_smart_collection for a rule-based collection, add_products_to_collection to add more products later, and publish_resource to make it visible on a sales channel. Not available on Starter or Retail plans. Each call creates another collection, so retries create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Collection title, for example "Summer Sale". |
| `description_html` | string | no |  | Description (HTML). Collection description, HTML allowed. |
| `handle` | string | no |  | Handle. URL handle, for example "summer-sale". Generated from the title when empty. |
| `product_ids` | array | no |  | Product IDs. Products to put in the collection, numeric or "gid://shopify/Product/…". |
| `sort_order` | string | no |  | Product Sort Order. How products are ordered inside the collection. Manual is required before reorder_collection_products. One of `"MANUAL"`, `"BEST_SELLING"`, `"ALPHA_ASC"`, `"ALPHA_DESC"`, `"PRICE_ASC"`, `"PRICE_DESC"`, `"CREATED_DESC"`, `"CREATED"`, `"MOST_RELEVANT"`. |
| `image_url` | string | no |  | Image URL. Public URL of the collection image. |
| `image_alt` | string | no |  | Image Alt Text. Accessible description of the collection image. |
| `template_suffix` | string | no |  | Template Suffix. Theme template suffix, for example "sale" for collection.sale.liquid. |
| `seo_title` | string | no |  | SEO Title. Page title for search engines. |
| `seo_description` | string | no |  | SEO Description. Meta description for search engines. |

Output fields:

- `id`: Collection ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `sort_order`: Sort Order
- `updated_at`: Updated At (datetime)
- `products_count`: Products Count (number)
- `image_url`: Image (image)
- `image_alt`: Image Alt Text
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `sources`: Sources
- `sources[].id`: Source ID
- `sources[].title`: Title
- `sources[].type`: Type
- `sources[].shareable`: Shared (boolean)
- `sources[].app_id`: App ID
- `sources[].target_type`: Target Type
- `sources[].match_type`: Match Type
- `sources[].conditions`: Conditions
- `sources[].conditions[].id`: Condition ID
- `sources[].conditions[].kind`: Kind
- `sources[].conditions[].relation`: Relation
- `sources[].conditions[].values`: Values
- `sources[].conditions[].currency_code`: Currency Code
- `sources[].selected_products`: Selected Products
- `sources[].selected_products[].product_id`: Product ID
- `sources[].selected_products[].product_title`: Product Title
- `sources[].selected_products[].variant_ids`: Variant IDs
- `sources[].selected_products_count`: Selected Products Count (number)
- `sources[].selected_products_truncated`: Selected Products Truncated (boolean)
- `redacted_fields`: Redacted Fields

### `create_customer_address`

**Create Customer Address.** Adds a new saved address to one customer and optionally makes it the default. Use update_customer_address to change an existing address instead. Each call adds another address, so retries create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The customer id, numeric or "gid://shopify/Customer/…". Find it with search_customers. |
| `first_name` | string | no |  | First Name. First name on the address. |
| `last_name` | string | no |  | Last Name. Last name on the address. |
| `company` | string | no |  | Company. Company name on the address. |
| `address1` | string | no |  | Address Line 1. Street address, for example "150 Elgin Street". |
| `address2` | string | no |  | Address Line 2. Apartment, suite or unit, for example "Suite 800". |
| `city` | string | no |  | City. City, for example "Ottawa". |
| `province_code` | string | no |  | Province / State Code. Region code, for example "ON" or "CA". |
| `country_code` | string | no |  | Country Code. Two-letter ISO country code, for example "CA" or "US". |
| `zip` | string | no |  | Postal Code. Postal or ZIP code, for example "K2P 1L4". |
| `phone` | string | no |  | Phone. Phone number in E.164 format, for example "+16135551111". |
| `set_as_default` | boolean | no | `false` | Set as Default. Make this the customer's default address. Off by default. |

Output fields:

- `customer_id`: Customer ID
- `id`: Address ID
- `first_name`: First Name
- `last_name`: Last Name
- `name`: Name
- `company`: Company
- `address1`: Address 1
- `address2`: Address 2
- `city`: City
- `province`: Province
- `province_code`: Province Code
- `country`: Country
- `country_code`: Country Code
- `zip`: ZIP
- `phone`: Phone
- `redacted_fields`: Redacted Fields

### `create_customer_profile`

**Create Customer.** Creates a customer with name, email, phone, note, tags and locale, optionally recording email marketing consent. Search first with search_customers, because Shopify rejects a duplicate email or phone. Add addresses afterwards with create_customer_address. Each call creates a new customer, so retries fail or duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. Customer email, for example "jane@example.com". Must be unique in the store. |
| `phone` | string | no |  | Phone. Customer phone in E.164 format, for example "+16135551111". Must be unique in the store. |
| `first_name` | string | no |  | First Name. Customer first name. |
| `last_name` | string | no |  | Last Name. Customer last name. |
| `note` | string | no |  | Note. Internal note about the customer. |
| `tags` | array | no |  | Tags. Tags to set, for example ["vip", "wholesale"]. |
| `locale` | string | no |  | Locale. Language for customer emails, for example "en" or "fr-CA". |
| `tax_exempt` | boolean | no | `false` | Tax Exempt. Whether the customer is exempt from taxes. Off by default. |
| `email_marketing_state` | string | no |  | Email Marketing Consent. Record the email marketing consent the customer gave. Leave empty to record none (the customer is not subscribed). Requires an email. One of `"SUBSCRIBED"`, `"NOT_SUBSCRIBED"`, `"UNSUBSCRIBED"`, `"PENDING"`. |
| `email_marketing_opt_in_level` | string | no |  | Email Opt-in Level. How consent was collected. Only used with email marketing consent. One of `"SINGLE_OPT_IN"`, `"CONFIRMED_OPT_IN"`, `"UNKNOWN"`. |

Output fields:

- `id`: Customer ID
- `legacy_resource_id`: Numeric ID
- `display_name`: Display Name
- `first_name`: First Name
- `last_name`: Last Name
- `email`: Email (email)
- `email_marketing_state`: Email Marketing State
- `email_marketing_opt_in_level`: Email Marketing Opt-in Level
- `email_marketing_updated_at`: Email Marketing Updated At (datetime)
- `phone`: Phone
- `note`: Note
- `tags`: Tags
- `state`: Account State
- `verified_email`: Verified Email (boolean)
- `tax_exempt`: Tax Exempt (boolean)
- `locale`: Locale
- `number_of_orders`: Number Of Orders (number)
- `amount_spent`: Amount Spent (number)
- `amount_spent_currency`: Amount Spent Currency
- `can_delete`: Can Delete (boolean)
- `last_order_id`: Last Order ID
- `last_order_name`: Last Order Name
- `default_address_id`: Default Address ID
- `default_address_name`: Default Address Name
- `default_address_company`: Default Address Company
- `default_address_address1`: Default Address Address 1
- `default_address_address2`: Default Address Address 2
- `default_address_city`: Default Address City
- `default_address_province_code`: Default Address Province Code
- `default_address_country_code`: Default Address Country Code
- `default_address_zip`: Default Address ZIP
- `default_address_phone`: Default Address Phone
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `create_draft_order_with_line_items`

**Create Draft Order.** Creates a draft order (a quote the merchant or customer can review) with one or more product-variant or custom line items, an optional customer, order-level discount and shipping line. Nothing is charged and no stock is committed; send it with send_draft_order_invoice or turn it into an order with complete_draft_order. Each call creates a new draft, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `line_items` | array | yes |  | Line Items. The items on the draft. Give either a variant id (price comes from the product) or a title and price for a custom item. Each item: { `variant_id`?, `title`?, `quantity`, `price`?, `sku`? }. |
| `currency` | string | no |  | Currency. Three-letter currency code for the unit prices and shipping price given here, for example "USD". Required when any price is given. Find the shop currency with get_shop. |
| `customer_id` | string | no |  | Customer ID. Customer the draft is for, numeric or "gid://shopify/Customer/…". Find it with search_customers. |
| `use_customer_default_address` | boolean | no | `false` | Use Customer Default Address. Use the customer's default address as the shipping address. Needs a customer. |
| `email` | string | no |  | Email. Email the invoice is sent to, for example "jane@example.com". |
| `phone` | string | no |  | Phone. Contact phone in E.164 format, for example "+16135551111". |
| `note` | string | no |  | Note. Internal note on the draft. |
| `tags` | array | no |  | Tags. Tags to set on the draft, for example ["quote", "b2b"]. |
| `po_number` | string | no |  | PO Number. Purchase order number, for example "PO-2026-114". |
| `discount_value` | number | no |  | Order Discount Value. Discount on the whole draft: a percentage (10 for 10%) or a fixed amount, per the discount type. |
| `discount_value_type` | string | no |  | Order Discount Type. How the order discount value applies. Required with a discount value. One of `"PERCENTAGE"`, `"FIXED_AMOUNT"`. |
| `discount_title` | string | no |  | Order Discount Title. Label shown for the discount, for example "Loyalty discount". |
| `shipping_title` | string | no |  | Shipping Line Title. Name of a custom shipping line, for example "Courier". |
| `shipping_price` | number | no |  | Shipping Price. Price of the custom shipping line, for example 12.00. Requires a shipping title and a currency. |
| `reserve_inventory_until` | ISO date-time string | no |  | Reserve Inventory Until. Hold the stock for this draft until this time (ISO 8601). Leave empty to not reserve stock. |

Output fields:

- `id`: Draft Order ID
- `legacy_resource_id`: Numeric ID
- `name`: Draft Order Name
- `status`: Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `invoice_url`: Invoice URL (url)
- `invoice_sent_at`: Invoice Sent At (datetime)
- `email`: Email (email)
- `phone`: Phone
- `note`: Note
- `tags`: Tags
- `po_number`: PO Number
- `ready`: Ready (boolean)
- `currency_code`: Currency Code
- `subtotal_price`: Subtotal Price (number)
- `total_price`: Total Price (number)
- `total_tax`: Total Tax (number)
- `total_discounts`: Total Discounts (number)
- `total_shipping`: Total Shipping (number)
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `order_id`: Order ID
- `order_name`: Order Name
- `reserve_inventory_until`: Reserve Inventory Until (datetime)
- `tax_exempt`: Tax Exempt (boolean)
- `taxes_included`: Taxes Included (boolean)
- `discount_codes`: Discount Codes
- `applied_discount_title`: Applied Discount Title
- `applied_discount_value`: Applied Discount Value (number)
- `applied_discount_value_type`: Applied Discount Value Type
- `applied_discount_amount`: Applied Discount Amount (number)
- `payment_terms_id`: Payment Terms ID
- `payment_terms_name`: Payment Terms Name
- `payment_terms_type`: Payment Terms Type
- `payment_terms_due_in_days`: Payment Terms Due In Days (number)
- `shipping_line_title`: Shipping Line Title
- `shipping_line_price`: Shipping Line Price (number)
- `shipping_name`: Shipping Name
- `shipping_company`: Shipping Company
- `shipping_address1`: Shipping Address 1
- `shipping_address2`: Shipping Address 2
- `shipping_city`: Shipping City
- `shipping_province_code`: Shipping Province Code
- `shipping_country_code`: Shipping Country Code
- `shipping_zip`: Shipping ZIP
- `shipping_phone`: Shipping Phone
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].title`: Title
- `line_items[].sku`: SKU
- `line_items[].quantity`: Quantity (number)
- `line_items[].custom`: Custom Item (boolean)
- `line_items[].original_unit_price`: Original Unit Price (number)
- `line_items[].discounted_total`: Discounted Total (number)
- `line_items[].variant_id`: Variant ID
- `line_items_has_more`: Line Items Has More (boolean)
- `redacted_fields`: Redacted Fields

### `create_free_shipping_discount_code`

**Create Free Shipping Discount Code.** Creates a free shipping discount code and returns it with its id (gid://shopify/DiscountCodeNode/…). Choose where it applies (all countries, or a list of ISO country codes; left unset it follows country_codes, and is all countries only when none are given), optionally cap the shipping rate it covers (maximum_shipping_price), and who can use it: ALL buyers, specific CUSTOMERS or customer SEGMENTS (left unset it follows the ids given, and is ALL only when no ids are given). Optional minimum subtotal or quantity, usage limit, once per customer, end date, tags and which other discount classes it combines with (all off by default). starts_at defaults to now, so the code is live immediately unless a later start is given. Each call creates another discount; a code that already exists is rejected by Shopify. Needs the write_discounts access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Internal title shown in the admin, for example "Free shipping over 50". |
| `code` | string | yes |  | Code. The code customers enter at checkout, for example "FREESHIP". |
| `destination` | string | no |  | Destination. Where free shipping applies. Leave unset to infer it: COUNTRIES when country_codes are given, ALL countries when none are given. One of `"ALL"`, `"COUNTRIES"`. |
| `country_codes` | array | no |  | Country Codes. With destination COUNTRIES: two-letter ISO country codes, for example "US" and "CA". |
| `maximum_shipping_price` | number | no |  | Maximum Shipping Price. Optional: only shipping rates up to this price qualify, for example 20. Leave empty for any rate. |
| `eligibility` | string | no |  | Eligibility. Who can use the code. Leave unset to infer it from the ids: CUSTOMERS when customer_ids are given, SEGMENTS when segment_ids are given, ALL buyers when no ids are given. One of `"ALL"`, `"CUSTOMERS"`, `"SEGMENTS"`. |
| `customer_ids` | array | no |  | Customer IDs. With eligibility CUSTOMERS: customer ids, numeric or "gid://shopify/Customer/…". |
| `segment_ids` | array | no |  | Segment IDs. With eligibility SEGMENTS: customer segment ids, numeric or "gid://shopify/Segment/…". |
| `minimum_requirement` | string | no |  | Minimum Requirement. Optional minimum the cart must reach. Leave unset for none. One of `"SUBTOTAL"`, `"QUANTITY"`. |
| `minimum_value` | number | no |  | Minimum Value. With a minimum requirement: the subtotal (for example 50) or the whole-number item quantity (for example 3). |
| `starts_at` | ISO date-time string | no |  | Starts At. When the code becomes usable, ISO 8601. Defaults to now. |
| `ends_at` | ISO date-time string | no |  | Ends At. Optional end, ISO 8601. Leave empty for no end date. |
| `usage_limit` | number | no |  | Usage Limit. Optional total number of times the code can be used across all customers. |
| `applies_once_per_customer` | boolean | no | `false` | Once Per Customer. Each customer can use the code only once. Off by default. |
| `combines_with_product_discounts` | boolean | no | `false` | Combines With Product Discounts. Can be combined with product discounts. Off by default. |
| `combines_with_order_discounts` | boolean | no | `false` | Combines With Order Discounts. Can be combined with order discounts. Off by default. |
| `combines_with_shipping_discounts` | boolean | no | `false` | Combines With Shipping Discounts. Can be combined with other shipping discounts. Off by default. |
| `tags` | array | no |  | Tags. Optional tags for the discount, for example "shipping". |

Output fields:

- `id`: Discount ID
- `method`: Method
- `discount_type`: Discount Type
- `title`: Title
- `status`: Status
- `summary`: Summary
- `starts_at`: Starts At (datetime)
- `ends_at`: Ends At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `usage_count`: Usage Count (number)
- `discount_classes`: Discount Classes
- `tags`: Tags
- `combines_with_product_discounts`: Combines With Product Discounts (boolean)
- `combines_with_order_discounts`: Combines With Order Discounts (boolean)
- `combines_with_shipping_discounts`: Combines With Shipping Discounts (boolean)
- `applies_once_per_customer`: Applies Once Per Customer (boolean)
- `usage_limit`: Usage Limit (number)
- `codes_count`: Codes Count (number)
- `codes`: Codes
- `eligibility`: Eligibility
- `customer_ids`: Customer IDs
- `segment_ids`: Segment IDs
- `market_ids`: Market IDs
- `markets_truncated`: Markets Truncated (boolean)
- `value_type`: Value Type
- `percentage`: Percentage (number)
- `amount`: Amount (number)
- `amount_currency`: Amount Currency
- `applies_on_each_item`: Applies On Each Item (boolean)
- `quantity`: Quantity (number)
- `applies_to`: Applies To
- `product_ids`: Product IDs
- `variant_ids`: Variant IDs
- `collection_ids`: Collection IDs
- `items_truncated`: Items Truncated (boolean)
- `buys_type`: Buys Type
- `buys_quantity`: Buys Quantity (number)
- `buys_amount`: Buys Amount (number)
- `buys_applies_to`: Buys Applies To
- `buys_product_ids`: Buys Product IDs
- `buys_variant_ids`: Buys Variant IDs
- `buys_collection_ids`: Buys Collection IDs
- `buys_items_truncated`: Buys Items Truncated (boolean)
- `minimum_quantity`: Minimum Quantity (number)
- `minimum_subtotal`: Minimum Subtotal (number)
- `minimum_subtotal_currency`: Minimum Subtotal Currency
- `maximum_shipping_price`: Maximum Shipping Price (number)
- `destination_all_countries`: Destination All Countries (boolean)
- `destination_countries`: Destination Countries
- `uses_per_order_limit`: Uses Per Order Limit (number)
- `redacted_fields`: Redacted Fields

### `create_fulfillment_tracking_event`

**Create Fulfillment Tracking Event.** Adds one tracking event to a fulfillment, such as IN_TRANSIT, OUT_FOR_DELIVERY, DELIVERED or FAILURE, with an optional message, time, estimated delivery and place. The event updates the shipment status the customer sees. Each call adds another event, so do not repeat it after a success; list_fulfillment_events shows what is already recorded. Needs the write_fulfillments access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fulfillment_id` | string | yes |  | Fulfillment ID. The fulfillment id, numeric or "gid://shopify/Fulfillment/…". Find it with list_order_fulfillments. |
| `status` | string | yes |  | Status. The shipment status this event reports. One of `"LABEL_PURCHASED"`, `"LABEL_PRINTED"`, `"CONFIRMED"`, `"CARRIER_PICKED_UP"`, `"IN_TRANSIT"`, `"OUT_FOR_DELIVERY"`, `"READY_FOR_PICKUP"`, `"ATTEMPTED_DELIVERY"`, `"DELAYED"`, `"DELIVERED"`, `"FAILURE"`. |
| `message` | string | no |  | Message. Optional message, for example "Arrived at sorting facility". |
| `happened_at` | ISO date-time string | no |  | Happened At. When the event happened, ISO 8601. Defaults to now on Shopify's side. |
| `estimated_delivery_at` | ISO date-time string | no |  | Estimated Delivery At. The new estimated delivery time, ISO 8601. |
| `city` | string | no |  | City. City where the event happened, for example "Memphis". |
| `province` | string | no |  | Province. Province or state where the event happened, for example "Tennessee". |
| `country` | string | no |  | Country. Country where the event happened, for example "United States". |
| `zip` | string | no |  | ZIP. Postal code where the event happened. |
| `address1` | string | no |  | Address. Street address where the event happened. |

Output fields:

- `id`: Fulfillment Event ID
- `status`: Status
- `message`: Message
- `happened_at`: Happened At (datetime)
- `created_at`: Created At (datetime)
- `estimated_delivery_at`: Estimated Delivery At (datetime)
- `address1`: Address 1
- `city`: City
- `province`: Province
- `country`: Country
- `zip`: Zip
- `latitude`: Latitude (number)
- `longitude`: Longitude (number)
- `fulfillment_id`: Fulfillment ID
- `redacted_fields`: Redacted Fields

### `create_fulfillment`

**Create Fulfillment.** Fulfills (ships) items of one fulfillment order and returns the new fulfillment. Get the fulfillment order id and its line item ids from list_order_fulfillment_orders first. Leave line_items empty to fulfill everything still remaining on the fulfillment order, or list fulfillment order line items with quantities for a partial shipment. Tracking company, numbers and URLs are optional. notify_customer is sent explicitly and defaults to false; set it to true only when the customer should get the shipping confirmation email. Each call creates another fulfillment, so do not repeat it after a success. Needs the write_merchant_managed_fulfillment_orders access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fulfillment_order_id` | string | yes |  | Fulfillment Order ID. The fulfillment order to fulfill, numeric or "gid://shopify/FulfillmentOrder/…". Find it with list_order_fulfillment_orders. |
| `line_items` | array | no |  | Line Items. Optional partial shipment: the fulfillment order line items and quantities to ship. Leave empty to ship all remaining items of the fulfillment order. Each item: { `fulfillment_order_line_item_id`, `quantity` }. |
| `tracking_company` | string | no |  | Tracking Company. The carrier name, for example "UPS", "USPS", "FedEx" or "DHL Express". With a supported carrier Shopify builds the tracking URL itself. |
| `tracking_numbers` | array | no |  | Tracking Numbers. One or more tracking numbers, for example "1Z999AA10123456784". |
| `tracking_urls` | array | no |  | Tracking URLs. Tracking page URLs, one per tracking number, for example "https://www.ups.com/track?tracknum=1Z999AA10123456784". Only needed for carriers Shopify does not know. |
| `notify_customer` | boolean | no | `false` | Notify Customer. Send the customer a shipping confirmation email. Off by default. |
| `message` | string | no |  | Message. Optional internal message recorded with the fulfillment. |

Output fields:

- `id`: Fulfillment ID
- `legacy_resource_id`: Legacy Resource ID
- `name`: Name
- `status`: Status
- `display_status`: Display Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `in_transit_at`: In Transit At (datetime)
- `delivered_at`: Delivered At (datetime)
- `estimated_delivery_at`: Estimated Delivery At (datetime)
- `total_quantity`: Total Quantity (number)
- `requires_shipping`: Requires Shipping (boolean)
- `tracking_company`: Tracking Company
- `tracking_numbers`: Tracking Numbers
- `tracking_urls`: Tracking URLs
- `location_id`: Location ID
- `location_name`: Location Name
- `service_id`: Fulfillment Service ID
- `service_name`: Fulfillment Service Name
- `order_id`: Order ID
- `order_name`: Order Name
- `origin_address1`: Origin Address 1
- `origin_address2`: Origin Address 2
- `origin_city`: Origin City
- `origin_zip`: Origin Zip
- `origin_province_code`: Origin Province Code
- `origin_country_code`: Origin Country Code
- `line_items`: Line Items
- `line_items[].id`: Fulfillment Line Item ID
- `line_items[].quantity`: Quantity (number)
- `line_items[].line_item_id`: Order Line Item ID
- `line_items[].title`: Title
- `line_items[].sku`: SKU
- `line_items_truncated`: Line Items Truncated (boolean)
- `fulfillment_order_id`: Fulfillment Order ID
- `redacted_fields`: Redacted Fields

### `create_gift_card`

**Create Gift Card.** Issues a new gift card with an initial amount and returns it. The full redeemable code is returned ONLY by this call (as gift_card_code); every later read shows just the last characters, so hand the code to whoever needs it now. Leave code empty to let Shopify generate a random 16-character code. Optionally assign it to a customer, set an expiry date and an internal note, or schedule a notification email to a recipient customer with a message. Each call issues another gift card with real store value, so do not repeat it after a success (also when the output has a warning: the card exists and gift_card_code holds its code). Plan availability of gift cards is to be confirmed on the store. Needs the write_gift_cards access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `amount` | number | yes |  | Initial Amount. The starting balance, for example 50 for 50.00. |
| `currency` | string | yes |  | Currency. ISO currency code of the amount, for example "USD". Normally the shop currency. |
| `code` | string | no |  | Code. Optional custom code customers type at checkout, letters and numbers only, for example "WELCOME2026GIFT". Leave empty for a random 16-character code. |
| `customer_id` | string | no |  | Customer ID. Optional customer who owns the card, numeric or "gid://shopify/Customer/…". |
| `expires_on` | string | no |  | Expires On. Optional expiry date, YYYY-MM-DD, for example "2027-12-31". Leave empty for no expiry. |
| `note` | string | no |  | Note. Optional internal note, not shown to the customer. |
| `recipient_customer_id` | string | no |  | Recipient Customer ID. Optional customer who receives the gift card notification, numeric or "gid://shopify/Customer/…". Needed for the recipient message and notification time. |
| `recipient_preferred_name` | string | no |  | Recipient Preferred Name. Optional name used to greet the recipient, for example "Sam". |
| `recipient_message` | string | no |  | Recipient Message. Optional personal message included in the recipient notification. |
| `send_notification_at` | ISO date-time string | no |  | Send Notification At. Optional time to email the recipient, ISO 8601. Leave empty to send when Shopify processes it. |

Output fields:

- `id`: Gift Card ID
- `last_characters`: Last Characters
- `masked_code`: Masked Code
- `enabled`: Enabled (boolean)
- `is_redeemable`: Is Redeemable (boolean)
- `deactivated_at`: Deactivated At (datetime)
- `expires_on`: Expires On (date)
- `balance`: Balance (number)
- `initial_value`: Initial Value (number)
- `currency_code`: Currency Code
- `note`: Note
- `template_suffix`: Template Suffix
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `order_id`: Order ID
- `order_name`: Order Name
- `recipient_id`: Recipient ID
- `recipient_name`: Recipient Name
- `recipient_preferred_name`: Recipient Preferred Name
- `recipient_message`: Recipient Message
- `send_notification_at`: Send Notification At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `gift_card_code`: Gift Card Code
- `warning`: Warning
- `redacted_fields`: Redacted Fields

### `create_marketing_engagement`

**Report Marketing Engagement.** Records engagement metrics (impressions, clicks, sends, ad spend, sales, conversions and so on) for ONE day, occurred_on, on an external marketing activity (by marketing_activity_id or remote_id) or on a whole channel (by channel_handle); pass exactly one of the three. The numbers are daily values for that day only, never running totals: Shopify phased out cumulative metrics, so this action always sends them as non-cumulative. Send at least one metric. Each call records another engagement entry, so do not repeat a day that was already reported. Needs the write_marketing_events access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `marketing_activity_id` | string | no |  | Marketing Activity ID. The activity id, numeric or "gid://shopify/MarketingActivity/…". Use this, the remote id, or a channel handle. |
| `remote_id` | string | no |  | Remote ID. Your own id the activity was created with, for example "fb-campaign-2026-spring". |
| `channel_handle` | string | no |  | Channel Handle. For channel-level metrics only: the channel handle your Shopify partner manager gave you. Leave empty for activity metrics. |
| `occurred_on` | string | yes |  | Day. The day the metrics cover, YYYY-MM-DD, for example "2026-09-22". |
| `utc_offset` | string | yes |  | UTC Offset. Time zone offset of that day, for example "+00:00" or "-05:00". |
| `impressions_count` | number | no |  | Impressions. Times the content was shown that day. |
| `views_count` | number | no |  | Views. Views that day. |
| `clicks_count` | number | no |  | Clicks. Clicks that day. |
| `shares_count` | number | no |  | Shares. Shares that day. |
| `favorites_count` | number | no |  | Favorites. Favorites or likes that day. |
| `comments_count` | number | no |  | Comments. Comments that day. |
| `unsubscribes_count` | number | no |  | Unsubscribes. Unsubscribes that day. |
| `complaints_count` | number | no |  | Complaints. Spam complaints that day. |
| `fails_count` | number | no |  | Failed Sends. Messages that failed to send that day. |
| `sends_count` | number | no |  | Sends. Messages sent that day. |
| `unique_views_count` | number | no |  | Unique Views. Unique viewers that day. |
| `unique_clicks_count` | number | no |  | Unique Clicks. Unique clickers that day. |
| `sessions_count` | number | no |  | Sessions. Store sessions from the activity that day. |
| `orders` | number | no |  | Orders. Orders attributed to the activity that day (may be fractional for shared attribution). |
| `first_time_customers` | number | no |  | First-Time Customers. New customers attributed that day. |
| `returning_customers` | number | no |  | Returning Customers. Returning customers attributed that day. |
| `primary_conversions` | number | no |  | Primary Conversions. Primary conversions that day. |
| `all_conversions` | number | no |  | All Conversions. All conversions that day. |
| `ad_spend_amount` | number | no |  | Ad Spend. Amount spent that day, in the currency below. |
| `sales_amount` | number | no |  | Sales. Sales attributed that day, in the currency below. |
| `currency` | string | no |  | Currency. ISO currency code of ad spend and sales, for example "USD". Needed when either is set. |

Output fields:

- `occurred_on`: Occurred On (date)
- `utc_offset`: UTC Offset
- `channel_handle`: Channel Handle
- `marketing_activity_id`: Marketing Activity ID
- `marketing_activity_title`: Marketing Activity Title
- `impressions_count`: Impressions (number)
- `views_count`: Views (number)
- `clicks_count`: Clicks (number)
- `shares_count`: Shares (number)
- `favorites_count`: Favorites (number)
- `comments_count`: Comments (number)
- `unsubscribes_count`: Unsubscribes (number)
- `complaints_count`: Complaints (number)
- `fails_count`: Fails (number)
- `sends_count`: Sends (number)
- `unique_views_count`: Unique Views (number)
- `unique_clicks_count`: Unique Clicks (number)
- `sessions_count`: Sessions (number)
- `orders`: Orders (number)
- `first_time_customers`: First-Time Customers (number)
- `returning_customers`: Returning Customers (number)
- `primary_conversions`: Primary Conversions (number)
- `all_conversions`: All Conversions (number)
- `ad_spend_amount`: Ad Spend Amount (number)
- `ad_spend_currency_code`: Ad Spend Currency
- `sales_amount`: Sales Amount (number)
- `sales_currency_code`: Sales Currency
- `redacted_fields`: Redacted Fields

### `create_order_risk_assessment`

**Create Order Risk Assessment.** Adds a fraud-risk assessment from this app to one order: a risk level (high, medium, low, none, pending) and at least one fact explaining it. It is shown to staff in the order's risk panel and feeds the order's risk recommendation; it does not cancel or hold the order. Each call adds another assessment, so do not repeat it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |
| `risk_level` | string | yes |  | Risk Level. The assessed fraud risk. One of `"HIGH"`, `"MEDIUM"`, `"LOW"`, `"NONE"`, `"PENDING"`. |
| `facts` | array | yes |  | Facts. Reasons behind the assessment, at least one. Each item: { `description`, `sentiment` }. |

Output fields:

- `order_id`: Order ID
- `risk_level`: Risk Level
- `provider`: Provider
- `facts`: Facts
- `facts[].description`: Description
- `facts[].sentiment`: Sentiment
- `redacted_fields`: Redacted Fields

### `create_order_with_line_items`

**Create Order.** Creates a committed order (not a draft) with one or more product-variant or custom line items, an optional customer, shipping address, shipping line and at most one discount code. Use create_draft_order_with_line_items instead when the customer should review or pay through an invoice. Each call creates a new order, so retries duplicate; development stores allow 5 orders per minute. No receipt is emailed unless send_receipt is on. For a paid or authorized order give payment_amount, which records an offline (manual gateway) payment: no card is charged. A manual PAID payment can later be refunded; a manual AUTHORIZED one can be marked captured (capture_order_payment) or voided, which only updates the order records. To import an order that already shipped, set fulfillment_location_id (and tracking_numbers, one per package): the order is created fulfilled for all line items. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `line_items` | array | yes |  | Line Items. The items to order. Give either a variant id (price comes from the product) or a title and price for a custom item. Each item: { `variant_id`?, `title`?, `quantity`, `price`?, `sku`? }. |
| `currency` | string | no |  | Currency. Three-letter currency code for every price given here, for example "USD". Required when any unit price, shipping price or fixed discount is given. Find the shop currency with get_shop. |
| `customer_id` | string | no |  | Customer ID. Existing customer to attach, numeric or "gid://shopify/Customer/…". Find it with search_customers. |
| `email` | string | no |  | Email. Order contact email, for example "jane@example.com". |
| `phone` | string | no |  | Phone. Order contact phone in E.164 format, for example "+16135551111". |
| `financial_status` | string | no |  | Financial Status. Payment status of the order. Authorized, Paid and Partially paid need payment_amount, which records a manual payment; without it Shopify would only show the label and the order could not be refunded, captured or marked as paid. Leave empty for pending. One of `"PENDING"`, `"AUTHORIZED"`, `"PAID"`, `"PARTIALLY_PAID"`. |
| `payment_amount` | number | no |  | Payment Amount. Amount already paid (Paid, Partially paid) or authorized (Authorized), recorded as a manual payment in the order currency, for example 40.5. Needed with those financial statuses. |
| `note` | string | no |  | Note. Internal note on the order. |
| `tags` | array | no |  | Tags. Tags to set on the order, for example ["wholesale", "phone-order"]. |
| `discount_code` | string | no |  | Discount Code. One discount code to record on the order, for example "SUMMER10". Only one code is allowed. |
| `discount_type` | string | no |  | Discount Type. How the discount code applies. Required with a discount code. One of `"PERCENTAGE"`, `"FIXED_AMOUNT"`, `"FREE_SHIPPING"`. |
| `discount_value` | number | no |  | Discount Value. Percentage (for example 10 for 10%) or fixed amount, depending on the discount type. |
| `shipping_title` | string | no |  | Shipping Line Title. Name of the shipping method, for example "Standard Shipping". Needs a shipping price. |
| `shipping_price` | number | no |  | Shipping Price. Shipping price in the order currency, for example 5.00 (use 0 for free shipping). Required together with the shipping line title, and needs a currency. |
| `shipping_first_name` | string | no |  | Shipping First Name. First name on the shipping address. |
| `shipping_last_name` | string | no |  | Shipping Last Name. Last name on the shipping address. |
| `shipping_address1` | string | no |  | Shipping Address Line 1. Street address, for example "150 Elgin Street". |
| `shipping_address2` | string | no |  | Shipping Address Line 2. Apartment, suite or unit. |
| `shipping_city` | string | no |  | Shipping City. City, for example "Ottawa". |
| `shipping_province_code` | string | no |  | Shipping Province / State Code. Region code, for example "ON". |
| `shipping_country_code` | string | no |  | Shipping Country Code. Two-letter ISO country code, for example "CA". |
| `shipping_zip` | string | no |  | Shipping Postal Code. Postal or ZIP code. |
| `shipping_phone` | string | no |  | Shipping Phone. Phone on the shipping address. |
| `inventory_behaviour` | string | no |  | Inventory Behaviour. Whether to decrement stock. Leave empty for the Shopify default (bypass, stock is not changed). One of `"BYPASS"`, `"DECREMENT_OBEYING_POLICY"`, `"DECREMENT_IGNORING_POLICY"`. |
| `send_receipt` | boolean | no | `false` | Send Order Receipt. Email the order confirmation to the customer. Off by default. |
| `send_fulfillment_receipt` | boolean | no | `false` | Send Fulfillment Receipt. Email a shipping confirmation when the order is fulfilled. Off by default. |
| `fulfillment_location_id` | string | no |  | Fulfilled From Location ID. Set only when importing an order that was already shipped: the location id (from list_locations) it shipped from. The order is then created fulfilled for all line items. Leave empty for an unfulfilled order. |
| `tracking_numbers` | array | no |  | Tracking Numbers. Tracking numbers of the imported fulfillment, one per package, for example ["1Z999AA10123456784", "1Z999AA10123456785"]. Needs fulfillment_location_id. |
| `tracking_company` | string | no |  | Tracking Company. Carrier of the tracking numbers, for example "UPS", "USPS" or "DHL Express". Needs fulfillment_location_id. |

Output fields:

- `id`: Order ID
- `legacy_resource_id`: Numeric ID
- `name`: Order Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `processed_at`: Processed At (datetime)
- `closed`: Closed (boolean)
- `closed_at`: Closed At (datetime)
- `cancelled_at`: Cancelled At (datetime)
- `cancel_reason`: Cancel Reason
- `financial_status`: Financial Status
- `fulfillment_status`: Fulfillment Status
- `test`: Test (boolean)
- `email`: Email (email)
- `phone`: Phone
- `note`: Note
- `tags`: Tags
- `po_number`: PO Number
- `source_name`: Source Name
- `currency_code`: Currency Code
- `subtotal_price`: Subtotal Price (number)
- `total_price`: Total Price (number)
- `total_tax`: Total Tax (number)
- `total_discounts`: Total Discounts (number)
- `total_shipping`: Total Shipping (number)
- `total_refunded`: Total Refunded (number)
- `total_outstanding`: Total Outstanding (number)
- `current_total_price`: Current Total Price (number)
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `customer_email`: Customer Email (email)
- `number`: Order Number (number)
- `confirmed`: Confirmed (boolean)
- `capturable`: Capturable (boolean)
- `refundable`: Refundable (boolean)
- `fully_paid`: Fully Paid (boolean)
- `unpaid`: Unpaid (boolean)
- `can_mark_as_paid`: Can Mark As Paid (boolean)
- `fulfillments_count`: Fulfillments Count (number)
- `transactions_count`: Transactions Count (number)
- `discount_codes`: Discount Codes
- `payment_gateway_names`: Payment Gateway Names
- `shipping_line_title`: Shipping Line Title
- `shipping_line_price`: Shipping Line Price (number)
- `shipping_name`: Shipping Name
- `shipping_company`: Shipping Company
- `shipping_address1`: Shipping Address 1
- `shipping_address2`: Shipping Address 2
- `shipping_city`: Shipping City
- `shipping_province_code`: Shipping Province Code
- `shipping_country_code`: Shipping Country Code
- `shipping_zip`: Shipping ZIP
- `shipping_phone`: Shipping Phone
- `billing_name`: Billing Name
- `billing_company`: Billing Company
- `billing_address1`: Billing Address 1
- `billing_address2`: Billing Address 2
- `billing_city`: Billing City
- `billing_province_code`: Billing Province Code
- `billing_country_code`: Billing Country Code
- `billing_zip`: Billing ZIP
- `billing_phone`: Billing Phone
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].title`: Title
- `line_items[].sku`: SKU
- `line_items[].variant_title`: Variant Title
- `line_items[].vendor`: Vendor
- `line_items[].quantity`: Quantity (number)
- `line_items[].current_quantity`: Current Quantity (number)
- `line_items[].refundable_quantity`: Refundable Quantity (number)
- `line_items[].unfulfilled_quantity`: Unfulfilled Quantity (number)
- `line_items[].requires_shipping`: Requires Shipping (boolean)
- `line_items[].taxable`: Taxable (boolean)
- `line_items[].original_unit_price`: Original Unit Price (number)
- `line_items[].discounted_total`: Discounted Total (number)
- `line_items[].variant_id`: Variant ID
- `line_items[].product_id`: Product ID
- `line_items_has_more`: Line Items Has More (boolean)
- `redacted_fields`: Redacted Fields

### `create_page`

**Create Online Store Page.** Creates an online store content page (for example an FAQ or About us page) and returns it with its id. Only the title is required; the body is HTML and the handle is generated from the title when left empty. The page is created hidden unless is_published is Yes, so nothing goes live by accident. publish_date alone does not publish or schedule the page; is_published must be Yes as well. Each call creates another page, so do not repeat it after a success. Needs the write_content access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Page title, for example "Frequently asked questions". |
| `body_html` | string | no |  | Body (HTML). Page content, HTML allowed, for example "<h2>Shipping</h2><p>We ship worldwide.</p>". |
| `handle` | string | no |  | Handle. URL handle, for example "faq". Leave empty to generate it from the title. |
| `is_published` | string | no |  | Published. Yes publishes the page on the storefront. Leave empty or No to keep it hidden. One of `"true"`, `"false"`. |
| `publish_date` | ISO date-time string | no |  | Publish Date. Publication date and time, ISO 8601, for example "2026-10-01T09:00:00Z". It does not publish or schedule the page on its own; Published must be Yes as well. |
| `template_suffix` | string | no |  | Template Suffix. Theme template suffix, for example "contact" for page.contact.json. Leave empty for the default template. |

Output fields:

- `id`: Page ID
- `title`: Title
- `handle`: Handle
- `body_summary`: Body Summary
- `is_published`: Is Published (boolean)
- `published_at`: Published At (datetime)
- `template_suffix`: Template Suffix
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `body_html`: Body HTML (html)
- `redacted_fields`: Redacted Fields

### `create_product_options`

**Create Product Options.** Adds one or more options with their values to a product (a product can have up to 3 options). With variant_strategy LEAVE_AS_IS (the default) existing variants get the first value of each new option and no variants are added; CREATE also creates a variant for every new value combination. Returns the product with its options and variants. Adding an option that already exists fails, so do not blindly retry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id, numeric or "gid://shopify/Product/…". Find it with search_products. |
| `options` | array | yes |  | Options. The options to add, for example Color with values "Red, Blue". Each item: { `name`, `values`, `position`? }. |
| `variant_strategy` | string | no |  | Variant Strategy. What happens to variants. Defaults to leaving existing variants as they are. One of `"LEAVE_AS_IS"`, `"CREATE"`. |

Output fields:

- `id`: Product ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `status`: Status
- `vendor`: Vendor
- `product_type`: Product Type
- `tags`: Tags
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `total_inventory`: Total Inventory (number)
- `tracks_inventory`: Tracks Inventory (boolean)
- `has_only_default_variant`: Has Only Default Variant (boolean)
- `variants_count`: Variants Count (number)
- `media_count`: Media Count (number)
- `min_price`: Min Price (number)
- `max_price`: Max Price (number)
- `currency_code`: Currency Code
- `featured_media_id`: Featured Media ID
- `featured_image_url`: Featured Image (image)
- `category_id`: Category ID
- `category_name`: Category Name
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `is_gift_card`: Is Gift Card (boolean)
- `requires_selling_plan`: Requires Selling Plan (boolean)
- `options`: Options
- `options[].id`: Option ID
- `options[].name`: Name
- `options[].position`: Position (number)
- `options[].values`: Values
- `options[].values[].id`: Value ID
- `options[].values[].name`: Name
- `options[].values[].has_variants`: Has Variants (boolean)
- `variants`: Variants
- `variants[].id`: Variant ID
- `variants[].legacy_resource_id`: Numeric ID
- `variants[].title`: Title
- `variants[].display_name`: Display Name
- `variants[].sku`: SKU
- `variants[].barcode`: Barcode
- `variants[].barcodes`: Barcodes
- `variants[].barcodes[].value`: Barcode
- `variants[].barcodes[].type`: Type
- `variants[].price`: Price (number)
- `variants[].compare_at_price`: Compare-at Price (number)
- `variants[].position`: Position (number)
- `variants[].inventory_quantity`: Inventory Quantity (number)
- `variants[].inventory_policy`: Inventory Policy
- `variants[].available_for_sale`: Available for Sale (boolean)
- `variants[].taxable`: Taxable (boolean)
- `variants[].selected_options`: Selected Options
- `variants[].selected_options[].name`: Option
- `variants[].selected_options[].value`: Value
- `variants[].inventory_item_id`: Inventory Item ID
- `variants[].inventory_tracked`: Inventory Tracked (boolean)
- `variants[].requires_shipping`: Requires Shipping (boolean)
- `variants[].product_id`: Product ID
- `variants[].product_title`: Product Title
- `variants[].created_at`: Created At (datetime)
- `variants[].updated_at`: Updated At (datetime)
- `variants_has_more`: More Variants (boolean)
- `media`: Media
- `media[].id`: Media ID
- `media[].alt`: Alt Text
- `media[].media_content_type`: Media Type
- `media[].status`: Status
- `media[].image_url`: Image URL (image)
- `media[].width`: Width (number)
- `media[].height`: Height (number)
- `media[].mime_type`: MIME Type
- `media[].preview_url`: Preview Image (image)
- `media[].external_url`: External URL (url)
- `media[].filename`: Filename
- `media[].errors`: Errors
- `media_has_more`: More Media (boolean)
- `redacted_fields`: Redacted Fields

### `create_product_record`

**Create Product.** Creates one new product with a single default variant. The status defaults to DRAFT so nothing goes live by accident; pass ACTIVE to sell it. Add options and more variants afterwards with create_product_options and create_product_variants, images with add_product_media, and stock with the inventory actions; set_product builds a whole product with options and variants in one call. Each call creates another product, so retries create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Product title, for example "Organic Cotton T-Shirt". |
| `description_html` | string | no |  | Description (HTML). Product description, HTML allowed, for example "<p>Soft organic cotton.</p>". |
| `vendor` | string | no |  | Vendor. Brand or vendor name, for example "Acme Apparel". |
| `product_type` | string | no |  | Product Type. Merchant-defined product type, for example "T-Shirts". |
| `status` | string | no |  | Status. Product status. Defaults to Draft (not visible to customers). One of `"ACTIVE"`, `"DRAFT"`, `"ARCHIVED"`, `"UNLISTED"`. |
| `handle` | string | no |  | Handle. URL handle, for example "organic-cotton-t-shirt". Generated from the title when empty. |
| `tags` | array | no |  | Tags. Tags to add, for example ["summer", "cotton"]. |
| `category_id` | string | no |  | Category ID. Standard product taxonomy category id, for example "gid://shopify/TaxonomyCategory/aa-1-13-8". Find it with search_product_taxonomy. |
| `collection_ids` | array | no |  | Collection IDs. Collections to add the product to, numeric or "gid://shopify/Collection/…". |
| `seo_title` | string | no |  | SEO Title. Page title for search engines. |
| `seo_description` | string | no |  | SEO Description. Meta description for search engines. |

Output fields:

- `id`: Product ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `status`: Status
- `vendor`: Vendor
- `product_type`: Product Type
- `tags`: Tags
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `total_inventory`: Total Inventory (number)
- `tracks_inventory`: Tracks Inventory (boolean)
- `has_only_default_variant`: Has Only Default Variant (boolean)
- `variants_count`: Variants Count (number)
- `media_count`: Media Count (number)
- `min_price`: Min Price (number)
- `max_price`: Max Price (number)
- `currency_code`: Currency Code
- `featured_media_id`: Featured Media ID
- `featured_image_url`: Featured Image (image)
- `category_id`: Category ID
- `category_name`: Category Name
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `is_gift_card`: Is Gift Card (boolean)
- `requires_selling_plan`: Requires Selling Plan (boolean)
- `options`: Options
- `options[].id`: Option ID
- `options[].name`: Name
- `options[].position`: Position (number)
- `options[].values`: Values
- `options[].values[].id`: Value ID
- `options[].values[].name`: Name
- `options[].values[].has_variants`: Has Variants (boolean)
- `variants`: Variants
- `variants[].id`: Variant ID
- `variants[].legacy_resource_id`: Numeric ID
- `variants[].title`: Title
- `variants[].display_name`: Display Name
- `variants[].sku`: SKU
- `variants[].barcode`: Barcode
- `variants[].barcodes`: Barcodes
- `variants[].barcodes[].value`: Barcode
- `variants[].barcodes[].type`: Type
- `variants[].price`: Price (number)
- `variants[].compare_at_price`: Compare-at Price (number)
- `variants[].position`: Position (number)
- `variants[].inventory_quantity`: Inventory Quantity (number)
- `variants[].inventory_policy`: Inventory Policy
- `variants[].available_for_sale`: Available for Sale (boolean)
- `variants[].taxable`: Taxable (boolean)
- `variants[].selected_options`: Selected Options
- `variants[].selected_options[].name`: Option
- `variants[].selected_options[].value`: Value
- `variants[].inventory_item_id`: Inventory Item ID
- `variants[].inventory_tracked`: Inventory Tracked (boolean)
- `variants[].requires_shipping`: Requires Shipping (boolean)
- `variants[].product_id`: Product ID
- `variants[].product_title`: Product Title
- `variants[].created_at`: Created At (datetime)
- `variants[].updated_at`: Updated At (datetime)
- `variants_has_more`: More Variants (boolean)
- `media`: Media
- `media[].id`: Media ID
- `media[].alt`: Alt Text
- `media[].media_content_type`: Media Type
- `media[].status`: Status
- `media[].image_url`: Image URL (image)
- `media[].width`: Width (number)
- `media[].height`: Height (number)
- `media[].mime_type`: MIME Type
- `media[].preview_url`: Preview Image (image)
- `media[].external_url`: External URL (url)
- `media[].filename`: Filename
- `media[].errors`: Errors
- `media_has_more`: More Media (boolean)
- `redacted_fields`: Redacted Fields

### `create_product_variants`

**Create Product Variants.** Adds variants to an existing product in one call. Each variant needs a value for every product option (for example "Color=Red, Size=Large"); new values are added to the options automatically. Optionally stock each new variant at one location. With strategy REMOVE_STANDALONE_VARIANT the placeholder "Default Title" variant is removed. All-or-nothing: if one variant is invalid none is created. Each call creates new variants, so retries create duplicates or fail on existing option combinations. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id, numeric or "gid://shopify/Product/…". Find it with search_products. |
| `variants` | array | yes |  | Variants. The variants to create, one entry per variant. Each needs option values for every product option. Each item: { `option_values`, `price`?, `compare_at_price`?, `sku`?, `barcode`?, `barcode_type`?, `inventory_policy`?, `taxable`?, `location_id`?, `available_quantity`? }. |
| `strategy` | string | no |  | Default Variant Handling. What happens to the placeholder variant of a product without options. Leave empty for the Shopify default. One of `"DEFAULT"`, `"REMOVE_STANDALONE_VARIANT"`, `"PRESERVE_STANDALONE_VARIANT"`. |

Output fields:

- `product_id`: Product ID
- `variants`: Variants
- `variants[].id`: Variant ID
- `variants[].legacy_resource_id`: Numeric ID
- `variants[].title`: Title
- `variants[].display_name`: Display Name
- `variants[].sku`: SKU
- `variants[].barcode`: Barcode
- `variants[].barcodes`: Barcodes
- `variants[].barcodes[].value`: Barcode
- `variants[].barcodes[].type`: Type
- `variants[].price`: Price (number)
- `variants[].compare_at_price`: Compare-at Price (number)
- `variants[].position`: Position (number)
- `variants[].inventory_quantity`: Inventory Quantity (number)
- `variants[].inventory_policy`: Inventory Policy
- `variants[].available_for_sale`: Available for Sale (boolean)
- `variants[].taxable`: Taxable (boolean)
- `variants[].selected_options`: Selected Options
- `variants[].selected_options[].name`: Option
- `variants[].selected_options[].value`: Value
- `variants[].inventory_item_id`: Inventory Item ID
- `variants[].inventory_tracked`: Inventory Tracked (boolean)
- `variants[].requires_shipping`: Requires Shipping (boolean)
- `variants[].product_id`: Product ID
- `variants[].product_title`: Product Title
- `variants[].created_at`: Created At (datetime)
- `variants[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `create_refund`

**Create Refund.** Moves money back to the customer: creates a refund on an order for the given line items, shipping and refund transactions. Run calculate_refund first and pass its suggested transactions (parent transaction id, gateway, amount) and line items. When calculate_refund shows a presentment_currency_code different from the shop currency_code, pass the presentment amounts (presentment_amount, presentment_shipping_amount) and set currency to that presentment code. The customer is emailed only if notify is on. Generate your own idempotency_key (for example a UUID) on the first call and pass the same key again on every retry after an error or timeout so Shopify does not refund twice; the key used is returned and is included in any error message. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |
| `line_items` | array | no |  | Line Items to Refund. Line items and quantities to refund. Line item ids come from get_order. Each item: { `line_item_id`, `quantity`, `restock_type`?, `location_id`? }. |
| `transactions` | array | no |  | Refund Transactions. The money to return, one entry per original payment. Copy parent_transaction_id, gateway and amount from calculate_refund suggested_transactions; when the order has a presentment currency different from the shop currency, copy presentment_amount instead of amount and set currency. Leave empty to re… Each item: { `parent_transaction_id`, `amount`, `gateway` }. |
| `shipping_full_refund` | boolean | no | `false` | Refund All Shipping. Refund the full remaining shipping cost. Off by default. |
| `shipping_amount` | number | no |  | Shipping Amount. Refund only this much shipping, for example 4.50, in the same currency as the transaction amounts. Ignored when refunding all shipping. |
| `currency` | string | no |  | Currency. Presentment (customer) currency of the refund, for example "EUR" (presentment_currency_code from calculate_refund). Required when the presentment currency differs from the shop currency; then every amount given here must be the presentment amount. Leave empty when both currencies are the same. |
| `note` | string | no |  | Note. Internal reason for the refund. |
| `notify` | boolean | no | `false` | Notify Customer. Email the customer a refund notification. Off by default. |
| `idempotency_key` | string | no |  | Idempotency Key. A unique key for this operation, for example a UUID such as "3f1c2a9e-6b1d-4c8e-9a51-2f7d0e4b8c10". Generate your own key on the first call and pass the same key again when retrying after a timeout or error, so Shopify does not repeat the operation. If left empty a key is generated; it is returned … |

Output fields:

- `id`: Refund ID
- `legacy_resource_id`: Numeric ID
- `note`: Note
- `created_at`: Created At (datetime)
- `processed_at`: Processed At (datetime)
- `updated_at`: Updated At (datetime)
- `total_refunded`: Total Refunded (number)
- `currency_code`: Currency Code
- `order_id`: Order ID
- `order_name`: Order Name
- `refund_line_items`: Refund Line Items
- `refund_line_items[].line_item_id`: Line Item ID
- `refund_line_items[].title`: Title
- `refund_line_items[].sku`: SKU
- `refund_line_items[].quantity`: Quantity (number)
- `refund_line_items[].restock_type`: Restock Type
- `refund_line_items[].restocked`: Restocked (boolean)
- `refund_line_items[].subtotal`: Subtotal (number)
- `refund_line_items[].total_tax`: Total Tax (number)
- `transactions`: Transactions
- `transactions[].id`: Transaction ID
- `transactions[].kind`: Kind
- `transactions[].status`: Status
- `transactions[].gateway`: Gateway
- `transactions[].amount`: Amount (number)
- `order_total_refunded`: Order Total Refunded (number)
- `idempotency_key`: Idempotency Key
- `redacted_fields`: Redacted Fields

### `create_script_tag`

**Create Script Tag.** Creates a script tag so the online store loads the given remote JavaScript file on every storefront page, and returns it. The script runs in every shopper's browser with full access to the page, so only add a script URL the merchant explicitly asked for and trusts, and say which URL you are adding. It only works on vintage themes; Online Store 2.0 themes ignore script tags. The display scope is always ONLINE_STORE (the order-status scopes are deprecated). Each call adds another tag, even for the same URL, so check list_script_tags with src first. Needs the write_script_tags access scope. Shopify no longer lets many apps create or update script tags: if it answers "This app can't create or update script tags", do not retry; a theme app extension is needed instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `src` | string | yes |  | Script URL. HTTPS URL of the JavaScript file, for example "https://cdn.example.com/widget.js". |
| `cache` | string | no |  | Cache. Yes lets Shopify serve the script from its CDN cache (changes to the file then show up with a delay). Leave empty for Shopify's default. One of `"true"`, `"false"`. |

Output fields:

- `id`: Script Tag ID
- `legacy_resource_id`: Legacy Resource ID
- `src`: Script URL (url)
- `display_scope`: Display Scope
- `cache`: Cached (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `create_smart_collection`

**Create Smart Collection.** Creates one collection whose products are chosen automatically by conditions, for example product tag TAGGED_WITH "summer" or variant price LESS_THAN 25. match_type ALL requires every condition, ANY requires at least one. Price conditions need currency. Membership is computed by Shopify and may take a moment. Not available on Starter or Retail plans. Each call creates another collection, so retries create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Collection title, for example "Summer Items". |
| `match_type` | string | yes |  | Match. Whether products must match all conditions or any of them. One of `"ALL"`, `"ANY"`. |
| `conditions` | array | yes |  | Conditions. The rules products must match, for example field product_tag, relation TAGGED_WITH, value "summer". Each item: { `field`, `relation`, `value`? }. |
| `currency` | string | no |  | Currency. Shop currency code for price conditions, for example "USD". |
| `description_html` | string | no |  | Description (HTML). Collection description, HTML allowed. |
| `handle` | string | no |  | Handle. URL handle, for example "summer-items". Generated from the title when empty. |
| `sort_order` | string | no |  | Product Sort Order. How products are ordered inside the collection. Manual is required before reorder_collection_products. One of `"MANUAL"`, `"BEST_SELLING"`, `"ALPHA_ASC"`, `"ALPHA_DESC"`, `"PRICE_ASC"`, `"PRICE_DESC"`, `"CREATED_DESC"`, `"CREATED"`, `"MOST_RELEVANT"`. |
| `template_suffix` | string | no |  | Template Suffix. Theme template suffix, for example "sale". |
| `seo_title` | string | no |  | SEO Title. Page title for search engines. |
| `seo_description` | string | no |  | SEO Description. Meta description for search engines. |

Output fields:

- `id`: Collection ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `sort_order`: Sort Order
- `updated_at`: Updated At (datetime)
- `products_count`: Products Count (number)
- `image_url`: Image (image)
- `image_alt`: Image Alt Text
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `sources`: Sources
- `sources[].id`: Source ID
- `sources[].title`: Title
- `sources[].type`: Type
- `sources[].shareable`: Shared (boolean)
- `sources[].app_id`: App ID
- `sources[].target_type`: Target Type
- `sources[].match_type`: Match Type
- `sources[].conditions`: Conditions
- `sources[].conditions[].id`: Condition ID
- `sources[].conditions[].kind`: Kind
- `sources[].conditions[].relation`: Relation
- `sources[].conditions[].values`: Values
- `sources[].conditions[].currency_code`: Currency Code
- `sources[].selected_products`: Selected Products
- `sources[].selected_products[].product_id`: Product ID
- `sources[].selected_products[].product_title`: Product Title
- `sources[].selected_products[].variant_ids`: Variant IDs
- `sources[].selected_products_count`: Selected Products Count (number)
- `sources[].selected_products_truncated`: Selected Products Truncated (boolean)
- `redacted_fields`: Redacted Fields

### `create_theme`

**Create Theme.** Imports a theme from a public ZIP file URL and returns it. The new theme is never live: its role is UNPUBLISHED (default) or DEVELOPMENT, and it is processed in the background (processing is true until get_theme shows it finished). A store holds at most 20 themes. Each call creates another theme. Shopify documents that modifying themes needs the write_themes access scope AND an exemption granted by Shopify; without the exemption the call is refused with an access error, so report that instead of retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source` | string | yes |  | Theme ZIP URL. Public URL of the theme ZIP file, for example "https://example.com/themes/my-theme.zip". |
| `name` | string | no |  | Name. Name for the new theme, for example "Autumn 2026". Leave empty to use the name in the ZIP. |
| `role` | string | no |  | Role. UNPUBLISHED (default) or DEVELOPMENT for a temporary theme. A theme can never be created live. One of `"UNPUBLISHED"`, `"DEVELOPMENT"`. |

Output fields:

- `id`: Theme ID
- `name`: Name
- `role`: Role
- `prefix`: Preview Prefix
- `processing`: Processing (boolean)
- `processing_failed`: Processing Failed (boolean)
- `theme_store_id`: Theme Store ID (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `create_url_redirect`

**Create URL Redirect.** Creates a URL redirect so visitors of an old storefront path (for example "/old-page") are sent to a target path or full URL (for example "/pages/new-page"). The redirect is live immediately. Shopify refuses a second redirect for the same path, so check list_url_redirects with "path:<path>" before retrying. Needs the write_online_store_navigation access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Old Path. The path to redirect from, starting with "/", for example "/old-page" or "/collections/summer-2025". |
| `target` | string | yes |  | Target. Where to send visitors: a path such as "/pages/new-page" or a full URL such as "https://example.com/new". |

Output fields:

- `id`: URL Redirect ID
- `path`: Path
- `target`: Target
- `redacted_fields`: Redacted Fields

### `deactivate_gift_card`

**Deactivate Gift Card.** Deactivates one gift card and returns it with enabled=false and deactivated_at set. IRREVERSIBLE: a deactivated gift card can never be re-enabled and its remaining balance can no longer be spent. Confirm the card (get_gift_card) before calling. A repeat call does not restore anything. Needs the write_gift_cards access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `gift_card_id` | string | yes |  | Gift Card ID. The gift card to deactivate, numeric or "gid://shopify/GiftCard/…". Find it with search_gift_cards. |

Output fields:

- `id`: Gift Card ID
- `last_characters`: Last Characters
- `masked_code`: Masked Code
- `enabled`: Enabled (boolean)
- `is_redeemable`: Is Redeemable (boolean)
- `deactivated_at`: Deactivated At (datetime)
- `expires_on`: Expires On (date)
- `balance`: Balance (number)
- `initial_value`: Initial Value (number)
- `currency_code`: Currency Code
- `note`: Note
- `template_suffix`: Template Suffix
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `order_id`: Order ID
- `order_name`: Order Name
- `recipient_id`: Recipient ID
- `recipient_name`: Recipient Name
- `recipient_preferred_name`: Recipient Preferred Name
- `recipient_message`: Recipient Message
- `send_notification_at`: Send Notification At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `deactivate_inventory_at_location`

**Stop Stocking Item at Location.** Stops stocking one inventory item at one location: looks up the item's inventory level at that location, then removes it, discarding the quantities recorded there. An item must stay stocked at one location at least, and Shopify can refuse for other reasons, for example stock still committed to orders; the refusal reason is returned and nothing is changed. Re-stock with activate_inventory_at_location. A repeat call fails because the level is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inventory_item_id` | string | yes |  | Inventory Item ID. The inventory item id, numeric or "gid://shopify/InventoryItem/…" (from get_product_variant_details). |
| `location_id` | string | yes |  | Location ID. The location id, numeric or "gid://shopify/Location/…" (from list_locations). |

Output fields:

- `deactivated`: Deactivated (boolean)
- `inventory_level_id`: Inventory Level ID
- `inventory_item_id`: Inventory Item ID
- `location_id`: Location ID
- `redacted_fields`: Redacted Fields

### `delete_article`

**Delete Blog Article.** Permanently deletes one blog article together with its comments, and its URL stops working. To only hide it, use update_article with is_published No instead. Cannot be undone; a repeat call fails because the article is gone. Needs the write_content access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `article_id` | string | yes |  | Article ID. The article id, numeric or "gid://shopify/Article/…". Find it with list_articles. |

Output fields:

- `deleted_article_id`: Deleted Article ID
- `redacted_fields`: Redacted Fields

### `delete_blog`

**Delete Blog.** Permanently deletes one blog, and the blog URL stops working. Its articles and their comments may be deleted with it (not yet confirmed on a store), so treat them as lost. Cannot be undone; check the blog with get_blog (articles_count) first. A repeat call fails because the blog is gone. Needs the write_content access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `blog_id` | string | yes |  | Blog ID. The blog id, numeric or "gid://shopify/Blog/…". Find it with list_blogs. |

Output fields:

- `deleted_blog_id`: Deleted Blog ID
- `redacted_fields`: Redacted Fields

### `delete_collection`

**Delete Collection.** Permanently deletes one collection (manual or rule-based) and its membership rules. The products themselves are kept. Cannot be undone; a repeat call fails because the collection is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection_id` | string | yes |  | Collection ID. The collection id, numeric or "gid://shopify/Collection/…". Find it with search_collections. |

Output fields:

- `deleted_collection_id`: Deleted Collection ID
- `redacted_fields`: Redacted Fields

### `delete_comment`

**Delete Blog Comment.** Permanently deletes one blog comment. To hide unwanted comments reversibly, use mark_comment_spam instead. Cannot be undone; a repeat call fails because the comment is gone. Needs the write_content access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. The comment id, numeric or "gid://shopify/Comment/…". Find it with list_comments. |

Output fields:

- `deleted_comment_id`: Deleted Comment ID
- `redacted_fields`: Redacted Fields

### `delete_customer_address`

**Delete Customer Address.** Permanently deletes one saved address of a customer. Find the address id with list_customer_addresses. Cannot be undone; a repeat call fails because the address is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The customer id, numeric or "gid://shopify/Customer/…". |
| `address_id` | string | yes |  | Address ID. The address id from list_customer_addresses, for example "gid://shopify/MailingAddress/1053318585?model_name=CustomerAddress" or its number. |

Output fields:

- `customer_id`: Customer ID
- `deleted_address_id`: Deleted Address ID
- `redacted_fields`: Redacted Fields

### `delete_customer`

**Delete Customer.** Permanently deletes one customer and their addresses. Shopify refuses when the customer has any orders (check can_delete on get_customer_profile). Cannot be undone; a repeat call fails because the customer is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The customer id, numeric or "gid://shopify/Customer/…". Find it with search_customers. |

Output fields:

- `deleted_customer_id`: Deleted Customer ID
- `redacted_fields`: Redacted Fields

### `delete_discount_redeem_codes`

**Start Deleting Discount Redeem Codes.** Starts deleting redeem codes from one code discount, either the listed code ids (from list_discount_redeem_codes) or every code matching a search: "times_used:<n>" (for example "times_used:0") or plain text matched against the code (for example "SUMMER"). Other field filters such as "code:" are rejected, because Shopify ignores them and would delete EVERY code of the discount, including its main code. Shopify splits plain text into words, so "APTEST-A" also matches "APTEST-B1"; for an exact code, find its id with list_discount_redeem_codes and pass code_ids instead. Preview what a search matches with list_discount_redeem_codes (same search) before deleting. Exactly one of code_ids or search is required, so nothing is deleted by accident. The discount itself stays (use delete_discount to remove it). Shopify deletes in the background and returns only a job: poll get_job with job_id until done is true. Deleted codes stop working at checkout and cannot be restored. Takes the code discount id (gid://shopify/DiscountCodeNode/… or its plain number). Needs the write_discounts access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `discount_id` | string | yes |  | Discount ID. The code discount id, for example "gid://shopify/DiscountCodeNode/123" or "123". Get it from list_discounts or find_discount_by_code. |
| `code_ids` | array | no |  | Code IDs. The redeem code ids to delete, for example "gid://shopify/DiscountRedeemCode/241951653" (from list_discount_redeem_codes). Leave empty when using search. |
| `search` | string | no |  | Search. Delete every code of this discount matching this search: "times_used:<n>" such as "times_used:0", or plain text matched against the code such as "SUMMER". Plain text is matched word by word, not exactly, so preview it with list_discount_redeem_codes first. Other field filters (for example "code:") … |

Output fields:

- `discount_id`: Discount ID
- `job_id`: Job ID
- `done`: Done (boolean)
- `redacted_fields`: Redacted Fields

### `delete_discount`

**Delete Discount.** Permanently deletes one discount, code or automatic, with all its redeem codes. Takes the full discount id: gid://shopify/DiscountCodeNode/… deletes a code discount, gid://shopify/DiscountAutomaticNode/… deletes an automatic discount (a gid://shopify/DiscountNode/… id is looked up first to find which kind it is). A plain number is rejected because code and automatic discounts are different objects; get the id from list_discounts, get_discount or find_discount_by_code. Orders that already used the discount keep it. Cannot be undone; a repeat call fails because the discount is gone. Needs the write_discounts access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `discount_id` | string | yes |  | Discount ID. The full discount id, for example "gid://shopify/DiscountCodeNode/123" or "gid://shopify/DiscountAutomaticNode/456". |

Output fields:

- `deleted_discount_id`: Deleted Discount ID
- `method`: Method
- `redacted_fields`: Redacted Fields

### `delete_draft_order`

**Delete Draft Order.** Permanently deletes one draft order. An invoice URL already sent to the customer stops working. Orders created from a completed draft are not affected. Cannot be undone; a repeat call fails because the draft is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draft_order_id` | string | yes |  | Draft Order ID. The draft order id, numeric or "gid://shopify/DraftOrder/…". Find it with list_draft_orders. |

Output fields:

- `deleted_id`: Deleted Draft Order ID
- `redacted_fields`: Redacted Fields

### `delete_external_marketing_activity`

**Delete External Marketing Activity.** Deletes one external marketing activity, identified by exactly one of marketing_activity_id or remote_id, and returns the deleted id. Its reported engagement goes with it and cannot be restored; to keep the history and only mark it as over, use update_external_marketing_activity with an INACTIVE status instead. Shopify refuses to delete an activity that still has child events (code CANNOT_DELETE_ACTIVITY_WITH_CHILD_EVENTS). If Shopify answers that the deletion was queued (code DELETE_JOB_ENQUEUED, not yet confirmed on a store) the output says deletion_queued: true. A repeat call fails because the activity is gone. Needs the write_marketing_events access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `marketing_activity_id` | string | no |  | Marketing Activity ID. The activity id, numeric or "gid://shopify/MarketingActivity/…". Use this or the remote id. |
| `remote_id` | string | no |  | Remote ID. Your own id the activity was created with, for example "fb-campaign-2026-spring". |

Output fields:

- `deleted_marketing_activity_id`: Deleted Marketing Activity ID
- `remote_id`: Remote ID
- `deletion_queued`: Deletion Queued (boolean)
- `redacted_fields`: Redacted Fields

### `delete_fulfillment_service`

**Delete Fulfillment Service.** Deletes one fulfillment service. Only services created by this app can be deleted. inventory_action is required and always sent (Shopify's silent default would be TRANSFER): TRANSFER moves the service location's inventory and commitments to destination_location_id (required, an active merchant-managed location); KEEP keeps the location and its inventory; DELETE removes the location together with its inventory records (the saved docs give no per-value detail for KEEP and DELETE, so prefer TRANSFER when stock must survive). Cannot be undone; a repeat call fails because the service is gone. Needs the write_fulfillments access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fulfillment_service_id` | string | yes |  | Fulfillment Service ID. The fulfillment service, numeric or "gid://shopify/FulfillmentService/…". Find it with list_fulfillment_services. |
| `inventory_action` | string | yes |  | Inventory Action. What happens to the service location and its inventory: TRANSFER to another location, KEEP as a regular location, or DELETE. One of `"TRANSFER"`, `"KEEP"`, `"DELETE"`. |
| `destination_location_id` | string | no |  | Destination Location ID. Required with TRANSFER, not allowed otherwise: the active merchant-managed location that receives the inventory, numeric or "gid://shopify/Location/…". Find it with list_locations. |

Output fields:

- `deleted_id`: Deleted Fulfillment Service ID
- `inventory_action`: Inventory Action
- `redacted_fields`: Redacted Fields

### `delete_metafields`

**Delete Metafields.** Permanently deletes up to 25 metafield values, each identified by the owner's full id, namespace and key. The metafield definition (if any) is kept; only the stored values go. A metafield that does not exist is reported in not_found instead of failing, so repeating the call is safe. Cannot be undone; read values with list_metafields first if they may be needed. Needs the write access scope of each owner type (for example write_products for products). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `metafields` | array | yes |  | Metafields. One entry per metafield to delete, 1 to 25. Each item: { `owner_id`, `namespace`, `key` }. |

Output fields:

- `deleted`: Deleted
- `deleted[].owner_id`: Owner ID
- `deleted[].namespace`: Namespace
- `deleted[].key`: Key
- `not_found`: Not Found
- `not_found[].owner_id`: Owner ID
- `not_found[].namespace`: Namespace
- `not_found[].key`: Key
- `deleted_count`: Deleted Count (number)
- `redacted_fields`: Redacted Fields

### `delete_metaobject_definition`

**Delete Metaobject Definition.** Permanently deletes one metaobject definition (a custom content type) AND every entry of that type; references to those entries from metafields break. Check metaobjects_count with list_metaobject_definitions and confirm before calling. To remove only some entries use delete_metaobject or bulk_delete_metaobjects. Cannot be undone; a repeat call fails because the definition is gone. Needs the write_metaobject_definitions access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `metaobject_definition_id` | string | yes |  | Metaobject Definition ID. The definition id, numeric or "gid://shopify/MetaobjectDefinition/…". Find it with list_metaobject_definitions. |

Output fields:

- `deleted_metaobject_definition_id`: Deleted Metaobject Definition ID
- `redacted_fields`: Redacted Fields

### `delete_metaobject`

**Delete Metaobject Entry.** Permanently deletes one metaobject entry. Metafields and other entries that reference it lose that reference. To hide an entry of a publishable type instead, use upsert_metaobject with status DRAFT. Cannot be undone; a repeat call fails because the entry is gone. Needs the write_metaobjects access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `metaobject_id` | string | yes |  | Metaobject ID. The entry id, numeric or "gid://shopify/Metaobject/…". Find it with list_metaobjects. |

Output fields:

- `deleted_metaobject_id`: Deleted Metaobject ID
- `redacted_fields`: Redacted Fields

### `delete_order`

**Delete Order.** Permanently deletes one order. Shopify refuses orders it does not allow deleting, for example orders paid through an online gateway, POS or gift card that are not archived or cancelled; orders paid manually can be deleted even while open. Prefer archive_order or start_order_cancellation to keep records. Cannot be undone; a repeat call fails because the order is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |

Output fields:

- `deleted_id`: Deleted Order ID
- `redacted_fields`: Redacted Fields

### `delete_page`

**Delete Online Store Page.** Permanently deletes one online store content page, and its URL stops working (menus linking to it break). To only hide it, use update_page with is_published No instead. Cannot be undone; a repeat call fails because the page is gone. Needs the write_content access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page ID. The page id, numeric or "gid://shopify/Page/…". Find it with list_pages. |

Output fields:

- `deleted_page_id`: Deleted Page ID
- `redacted_fields`: Redacted Fields

### `delete_product_media`

**Remove Product Media.** Detaches media from a product: it disappears from the product gallery and from any variant that used it. The file itself stays in the store's Files library (it is not deleted there), except for media whose upload FAILED: Shopify cannot detach those, so they are deleted. Needs the write_files (or write_themes) access scope. Media ids come from list_product_media. A repeat call is not guaranteed to succeed once the media is detached. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product to remove the media from, numeric or "gid://shopify/Product/…". |
| `media_ids` | array | yes |  | Media IDs. Ids of the media to remove, for example ["gid://shopify/MediaImage/1072273219"]. |

Output fields:

- `product_id`: Product ID
- `removed_media_ids`: Removed Media IDs
- `redacted_fields`: Redacted Fields

### `delete_product_options`

**Delete Product Options.** Deletes options from a product. The strategy is required because it decides what happens to variants: NON_DESTRUCTIVE deletes only when no variant has to be deleted, DEFAULT deletes only options that have a single value, POSITION also deletes options with several values and removes the variants that become duplicates, keeping the one with the lowest position. Option ids come from get_product_details. Cannot be undone; a repeat call fails because the options are gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id, numeric or "gid://shopify/Product/…". |
| `option_ids` | array | yes |  | Option IDs. Ids of the options to delete, for example ["gid://shopify/ProductOption/1064576516"]. |
| `strategy` | string | yes |  | Variant Strategy. What happens to variants when the options are removed. One of `"NON_DESTRUCTIVE"`, `"DEFAULT"`, `"POSITION"`. |

Output fields:

- `deleted_option_ids`: Deleted Option IDs
- `id`: Product ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `status`: Status
- `vendor`: Vendor
- `product_type`: Product Type
- `tags`: Tags
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `total_inventory`: Total Inventory (number)
- `tracks_inventory`: Tracks Inventory (boolean)
- `has_only_default_variant`: Has Only Default Variant (boolean)
- `variants_count`: Variants Count (number)
- `media_count`: Media Count (number)
- `min_price`: Min Price (number)
- `max_price`: Max Price (number)
- `currency_code`: Currency Code
- `featured_media_id`: Featured Media ID
- `featured_image_url`: Featured Image (image)
- `category_id`: Category ID
- `category_name`: Category Name
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `is_gift_card`: Is Gift Card (boolean)
- `requires_selling_plan`: Requires Selling Plan (boolean)
- `options`: Options
- `options[].id`: Option ID
- `options[].name`: Name
- `options[].position`: Position (number)
- `options[].values`: Values
- `options[].values[].id`: Value ID
- `options[].values[].name`: Name
- `options[].values[].has_variants`: Has Variants (boolean)
- `variants`: Variants
- `variants[].id`: Variant ID
- `variants[].legacy_resource_id`: Numeric ID
- `variants[].title`: Title
- `variants[].display_name`: Display Name
- `variants[].sku`: SKU
- `variants[].barcode`: Barcode
- `variants[].barcodes`: Barcodes
- `variants[].barcodes[].value`: Barcode
- `variants[].barcodes[].type`: Type
- `variants[].price`: Price (number)
- `variants[].compare_at_price`: Compare-at Price (number)
- `variants[].position`: Position (number)
- `variants[].inventory_quantity`: Inventory Quantity (number)
- `variants[].inventory_policy`: Inventory Policy
- `variants[].available_for_sale`: Available for Sale (boolean)
- `variants[].taxable`: Taxable (boolean)
- `variants[].selected_options`: Selected Options
- `variants[].selected_options[].name`: Option
- `variants[].selected_options[].value`: Value
- `variants[].inventory_item_id`: Inventory Item ID
- `variants[].inventory_tracked`: Inventory Tracked (boolean)
- `variants[].requires_shipping`: Requires Shipping (boolean)
- `variants[].product_id`: Product ID
- `variants[].product_title`: Product Title
- `variants[].created_at`: Created At (datetime)
- `variants[].updated_at`: Updated At (datetime)
- `variants_has_more`: More Variants (boolean)
- `media`: Media
- `media[].id`: Media ID
- `media[].alt`: Alt Text
- `media[].media_content_type`: Media Type
- `media[].status`: Status
- `media[].image_url`: Image URL (image)
- `media[].width`: Width (number)
- `media[].height`: Height (number)
- `media[].mime_type`: MIME Type
- `media[].preview_url`: Preview Image (image)
- `media[].external_url`: External URL (url)
- `media[].filename`: Filename
- `media[].errors`: Errors
- `media_has_more`: More Media (boolean)
- `redacted_fields`: Redacted Fields

### `delete_product_variants`

**Delete Product Variants.** Permanently deletes variants of one product, together with their inventory items and stock. A product always keeps at least one variant. Cannot be undone; a repeat call fails because the variants are gone. Variant ids come from list_product_variants. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product the variants belong to, numeric or "gid://shopify/Product/…". |
| `variant_ids` | array | yes |  | Variant IDs. Ids of the variants to delete, numeric or "gid://shopify/ProductVariant/…". |

Output fields:

- `product_id`: Product ID
- `deleted_variant_ids`: Deleted Variant IDs
- `redacted_fields`: Redacted Fields

### `delete_product`

**Delete Product.** Permanently deletes one product together with all its variants and inventory items. Its media files are deleted too, unless another product also uses them. Cannot be undone; to hide a product instead, set its status to ARCHIVED or DRAFT with update_product_fields. A repeat call fails because the product is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id, numeric or "gid://shopify/Product/…". Find it with search_products. |

Output fields:

- `deleted_product_id`: Deleted Product ID
- `redacted_fields`: Redacted Fields

### `delete_saved_search`

**Delete Saved Search.** Deletes one saved search: a named filter view that staff saved in the Shopify admin (for example "Unfulfilled orders over $100" on the orders list). Staff lose that view for everyone; the records it matched are not touched. Get the id from list_saved_searches (id), choosing the resource_type the search belongs to. Needs the write access scope of the resource the search belongs to (for example write_orders for an order search). A repeat call fails because the search is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `saved_search_id` | string | yes |  | Saved Search ID. The saved search id, numeric or "gid://shopify/SavedSearch/…" (see id from list_saved_searches). |

Output fields:

- `deleted_saved_search_id`: Deleted Saved Search ID
- `redacted_fields`: Redacted Fields

### `delete_script_tag`

**Delete Script Tag.** Deletes one script tag, so the storefront stops loading that JavaScript file at once; whatever the script did (widgets, tracking, chat) stops working on the store. Recreate it with create_script_tag if needed. A repeat call fails because the tag is gone. Needs the write_script_tags access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `script_tag_id` | string | yes |  | Script Tag ID. The script tag id, numeric or "gid://shopify/ScriptTag/…". Find it with list_script_tags. |

Output fields:

- `deleted_script_tag_id`: Deleted Script Tag ID
- `redacted_fields`: Redacted Fields

### `delete_theme_files`

**Delete Theme Files.** Permanently deletes up to 50 files from one theme by path. Deleting a file that a template or section still uses breaks that part of the storefront, and on the live theme (role MAIN, see get_theme) the change is immediate; say so before doing it. Read a file with get_theme_file first if it may be needed again. Cannot be undone; a repeat call may fail for files that are already gone (not yet confirmed on a store). Shopify documents that modifying theme files needs the write_themes access scope AND an exemption granted by Shopify; without the exemption the call is refused with an access error, so report that instead of retrying. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `theme_id` | string | yes |  | Theme ID. The theme id, numeric or "gid://shopify/OnlineStoreTheme/…". Find it with list_themes. |
| `filenames` | array | yes |  | File Paths. Paths of the files to delete, 1 to 50, for example ["snippets/old-banner.liquid"]. |

Output fields:

- `theme_id`: Theme ID
- `deleted_files`: Deleted Files
- `deleted_files[].filename`: Filename
- `deleted_files[].size`: Size (filesize)
- `deleted_files[].checksum_md5`: Checksum MD5
- `deleted_files[].created_at`: Created At (datetime)
- `deleted_files[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `delete_theme`

**Delete Theme.** Permanently deletes one theme with all its files and customizations. Shopify may refuse to delete the live (MAIN) theme (not yet confirmed on a store), so never try it: check the role with get_theme first. Cannot be undone; a repeat call fails because the theme is gone. Shopify documents that modifying themes needs the write_themes access scope AND an exemption granted by Shopify; without the exemption the call is refused with an access error, so report that instead of retrying. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `theme_id` | string | yes |  | Theme ID. The theme id, numeric or "gid://shopify/OnlineStoreTheme/…". Find it with list_themes. |

Output fields:

- `deleted_theme_id`: Deleted Theme ID
- `redacted_fields`: Redacted Fields

### `delete_url_redirect`

**Delete URL Redirect.** Deletes one URL redirect; visitors of its old path get the page at that path again (often a 404). Recreate it with create_url_redirect if needed. A repeat call fails because the redirect is gone. Needs the write_online_store_navigation access scope. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url_redirect_id` | string | yes |  | URL Redirect ID. The redirect id, numeric or "gid://shopify/UrlRedirect/…". Find it with list_url_redirects. |

Output fields:

- `deleted_url_redirect_id`: Deleted URL Redirect ID
- `redacted_fields`: Redacted Fields

### `delete_web_presence`

**Delete Markets Web Presence.** Deletes one Markets web presence: the domain or subfolder (for example example.com/fr-ca) through which a market's shoppers reach the storefront in their languages. Shoppers of those markets immediately lose that URL, links and search results pointing to it stop working, and there is no action here to recreate it (only the Shopify admin can), so confirm with the user first and name the URL being removed. Shopify may refuse to delete the web presence of the shop's primary domain (not yet confirmed on a store). Plan requirement: a web presence only exists when the store uses Markets with an extra domain or subfolder; get its id from list_web_presences (id), which covers subfolder presences too (they have no domain of their own). A repeat call fails because it is gone. Needs the read_markets and write_markets access scopes. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `web_presence_id` | string | yes |  | Web Presence ID. The web presence id, numeric or "gid://shopify/MarketWebPresence/…" (see id from list_web_presences). |

Output fields:

- `deleted_web_presence_id`: Deleted Web Presence ID
- `redacted_fields`: Redacted Fields

### `detach_variant_media`

**Detach Media from Variants.** Detaches media from one or more variants of a product. The media stays on the product itself; to remove it from the product use delete_product_media. Media ids come from list_product_media, variant ids from list_product_variants. Detaching again leaves it detached. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id, numeric or "gid://shopify/Product/…". |
| `variant_media` | array | yes |  | Variant Media. Which media to detach from which variant, one entry per pair. Each item: { `variant_id`, `media_id` }. |

Output fields:

- `product_id`: Product ID
- `variants`: Variants
- `variants[].id`: Variant ID
- `variants[].title`: Title
- `variants[].media_ids`: Media IDs
- `redacted_fields`: Redacted Fields

### `duplicate_product`

**Duplicate Product.** Copies one product (options, variants, prices, tags) into a new product with the given title and returns the new product. Images are copied only when include_images is on; that copy runs in the background and its image_job_id is polled with get_job. The copy keeps the original status unless new_status is set. Very large products may time out. Each call creates another copy, so retries create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product to copy, numeric or "gid://shopify/Product/…". Find it with search_products. |
| `new_title` | string | yes |  | New Title. Title of the copy, for example "Organic Cotton T-Shirt (Copy)". |
| `new_status` | string | no |  | Status. Status of the copy. Leave empty to keep the status of the original. One of `"ACTIVE"`, `"DRAFT"`, `"ARCHIVED"`, `"UNLISTED"`. |
| `include_images` | boolean | no | `false` | Copy Images. Also copy the product images (runs in the background). Off by default. |
| `include_translations` | boolean | no | `false` | Copy Translations. Also copy the product translations. Off by default. |

Output fields:

- `id`: Product ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `status`: Status
- `vendor`: Vendor
- `product_type`: Product Type
- `tags`: Tags
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `total_inventory`: Total Inventory (number)
- `tracks_inventory`: Tracks Inventory (boolean)
- `has_only_default_variant`: Has Only Default Variant (boolean)
- `variants_count`: Variants Count (number)
- `media_count`: Media Count (number)
- `min_price`: Min Price (number)
- `max_price`: Max Price (number)
- `currency_code`: Currency Code
- `featured_media_id`: Featured Media ID
- `featured_image_url`: Featured Image (image)
- `category_id`: Category ID
- `category_name`: Category Name
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `is_gift_card`: Is Gift Card (boolean)
- `requires_selling_plan`: Requires Selling Plan (boolean)
- `options`: Options
- `options[].id`: Option ID
- `options[].name`: Name
- `options[].position`: Position (number)
- `options[].values`: Values
- `options[].values[].id`: Value ID
- `options[].values[].name`: Name
- `options[].values[].has_variants`: Has Variants (boolean)
- `variants`: Variants
- `variants[].id`: Variant ID
- `variants[].legacy_resource_id`: Numeric ID
- `variants[].title`: Title
- `variants[].display_name`: Display Name
- `variants[].sku`: SKU
- `variants[].barcode`: Barcode
- `variants[].barcodes`: Barcodes
- `variants[].barcodes[].value`: Barcode
- `variants[].barcodes[].type`: Type
- `variants[].price`: Price (number)
- `variants[].compare_at_price`: Compare-at Price (number)
- `variants[].position`: Position (number)
- `variants[].inventory_quantity`: Inventory Quantity (number)
- `variants[].inventory_policy`: Inventory Policy
- `variants[].available_for_sale`: Available for Sale (boolean)
- `variants[].taxable`: Taxable (boolean)
- `variants[].selected_options`: Selected Options
- `variants[].selected_options[].name`: Option
- `variants[].selected_options[].value`: Value
- `variants[].inventory_item_id`: Inventory Item ID
- `variants[].inventory_tracked`: Inventory Tracked (boolean)
- `variants[].requires_shipping`: Requires Shipping (boolean)
- `variants[].product_id`: Product ID
- `variants[].product_title`: Product Title
- `variants[].created_at`: Created At (datetime)
- `variants[].updated_at`: Updated At (datetime)
- `variants_has_more`: More Variants (boolean)
- `media`: Media
- `media[].id`: Media ID
- `media[].alt`: Alt Text
- `media[].media_content_type`: Media Type
- `media[].status`: Status
- `media[].image_url`: Image URL (image)
- `media[].width`: Width (number)
- `media[].height`: Height (number)
- `media[].mime_type`: MIME Type
- `media[].preview_url`: Preview Image (image)
- `media[].external_url`: External URL (url)
- `media[].filename`: Filename
- `media[].errors`: Errors
- `media_has_more`: More Media (boolean)
- `source_product_id`: Source Product ID
- `image_job_id`: Image Job ID
- `image_job_done`: Image Job Done (boolean)
- `redacted_fields`: Redacted Fields

### `enable_standard_metaobject_definition`

**Enable Standard Metaobject Definition.** Enables one of Shopify's standard metaobject definitions from its template by type (for example "shopify--color-pattern"), creating that content type with its standard fields, and returns the new definition. If the type is already enabled, Shopify returns the existing definition unchanged, so repeating the call is safe. Needs the write_metaobject_definitions access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Standard Type. The standard metaobject type to enable, for example "shopify--color-pattern". |

Output fields:

- `id`: Definition ID
- `type`: Type
- `name`: Name
- `description`: Description
- `display_name_key`: Display Name Key
- `metaobjects_count`: Metaobjects Count (number)
- `has_thumbnail_field`: Has Thumbnail Field (boolean)
- `publishable`: Publishable (boolean)
- `translatable`: Translatable (boolean)
- `renderable`: Renderable (boolean)
- `online_store`: Online Store (boolean)
- `admin_access`: Admin Access
- `storefront_access`: Storefront Access
- `field_definitions`: Field Definitions
- `field_definitions[].key`: Key
- `field_definitions[].name`: Name
- `field_definitions[].description`: Description
- `field_definitions[].required`: Required (boolean)
- `field_definitions[].type`: Type
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `find_discount_by_code`

**Find Discount By Code.** Finds the code discount behind a code customers type, for example "SPRING15", and returns it with the same fields as get_discount (value, target, eligibility, limits, status). found=false (and every other field null or empty) when no discount uses that code. Use it to check whether a code exists before creating one, or to get the discount id for update_basic_discount_code, delete_discount or the redeem code actions. Needs the read_discounts access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `code` | string | yes |  | Code. The redeem code, for example "SPRING15". |

Output fields:

- `found`: Found (boolean)
- `searched_code`: Searched Code
- `id`: Discount ID
- `method`: Method
- `discount_type`: Discount Type
- `title`: Title
- `status`: Status
- `summary`: Summary
- `starts_at`: Starts At (datetime)
- `ends_at`: Ends At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `usage_count`: Usage Count (number)
- `discount_classes`: Discount Classes
- `tags`: Tags
- `combines_with_product_discounts`: Combines With Product Discounts (boolean)
- `combines_with_order_discounts`: Combines With Order Discounts (boolean)
- `combines_with_shipping_discounts`: Combines With Shipping Discounts (boolean)
- `applies_once_per_customer`: Applies Once Per Customer (boolean)
- `usage_limit`: Usage Limit (number)
- `codes_count`: Codes Count (number)
- `codes`: Codes
- `eligibility`: Eligibility
- `customer_ids`: Customer IDs
- `segment_ids`: Segment IDs
- `market_ids`: Market IDs
- `markets_truncated`: Markets Truncated (boolean)
- `value_type`: Value Type
- `percentage`: Percentage (number)
- `amount`: Amount (number)
- `amount_currency`: Amount Currency
- `applies_on_each_item`: Applies On Each Item (boolean)
- `quantity`: Quantity (number)
- `applies_to`: Applies To
- `product_ids`: Product IDs
- `variant_ids`: Variant IDs
- `collection_ids`: Collection IDs
- `items_truncated`: Items Truncated (boolean)
- `buys_type`: Buys Type
- `buys_quantity`: Buys Quantity (number)
- `buys_amount`: Buys Amount (number)
- `buys_applies_to`: Buys Applies To
- `buys_product_ids`: Buys Product IDs
- `buys_variant_ids`: Buys Variant IDs
- `buys_collection_ids`: Buys Collection IDs
- `buys_items_truncated`: Buys Items Truncated (boolean)
- `minimum_quantity`: Minimum Quantity (number)
- `minimum_subtotal`: Minimum Subtotal (number)
- `minimum_subtotal_currency`: Minimum Subtotal Currency
- `maximum_shipping_price`: Maximum Shipping Price (number)
- `destination_all_countries`: Destination All Countries (boolean)
- `destination_countries`: Destination Countries
- `uses_per_order_limit`: Uses Per Order Limit (number)
- `redacted_fields`: Redacted Fields

### `generate_customer_activation_url`

**Generate Customer Activation URL.** Generates a one-time URL the customer opens to activate a classic customer account and set a password; nothing is emailed (use send_customer_account_invite to email an invite instead). Each call invalidates any earlier activation URL for that customer, so do not repeat it after sharing a link. Only for customers whose account is not yet enabled. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The customer id, numeric or "gid://shopify/Customer/…". Find it with search_customers. |

Output fields:

- `customer_id`: Customer ID
- `account_activation_url`: Account Activation URL (url)
- `redacted_fields`: Redacted Fields

### `get_abandonment`

**Get Abandonment.** Returns one abandonment record by its Abandonment id: whether it was a browse, cart or checkout abandonment, the recovery email state, whether the customer ordered since, and the linked abandoned checkout. Use get_checkout_abandonment when you only have an abandoned checkout id. Customer fields may be null on stores without protected customer data access (see redacted_fields). Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `abandonment_id` | string | yes |  | Abandonment ID. The abandonment id, numeric or "gid://shopify/Abandonment/…". |

Output fields:

- `id`: Abandonment ID
- `abandonment_type`: Abandonment Type
- `most_recent_step`: Most Recent Step
- `created_at`: Created At (datetime)
- `email_state`: Email State
- `email_sent_at`: Email Sent At (datetime)
- `cart_url`: Cart URL (url)
- `inventory_available`: Inventory Available (boolean)
- `is_from_online_store`: From Online Store (boolean)
- `customer_has_no_order_since_abandonment`: No Order Since Abandonment (boolean)
- `last_checkout_abandonment_date`: Last Checkout Abandonment Date (datetime)
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `customer_email`: Customer Email (email)
- `abandoned_checkout_id`: Abandoned Checkout ID
- `abandoned_checkout_name`: Abandoned Checkout Name
- `abandoned_checkout_url`: Abandoned Checkout URL (url)
- `abandoned_checkout_total_price`: Abandoned Checkout Total Price (number)
- `redacted_fields`: Redacted Fields

### `get_article`

**Get Blog Article.** Returns one blog article: title, handle, author, blog, full body HTML, summary, tags, publish state and date, image, template suffix and comments_count. list_comments returns the store's comments, each with its article_id. Needs the read_content access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `article_id` | string | yes |  | Article ID. The article id, numeric or "gid://shopify/Article/…". Find it with list_articles. |

Output fields:

- `id`: Article ID
- `title`: Title
- `handle`: Handle
- `author_name`: Author Name
- `blog_id`: Blog ID
- `blog_title`: Blog Title
- `summary_html`: Summary (html)
- `tags`: Tags
- `is_published`: Is Published (boolean)
- `published_at`: Published At (datetime)
- `template_suffix`: Template Suffix
- `image_url`: Image (image)
- `image_alt_text`: Image Alt Text
- `comments_count`: Comments Count (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `body_html`: Body HTML (html)
- `redacted_fields`: Redacted Fields

### `get_blog`

**Get Blog.** Returns one blog: title, handle, comment policy, template suffix, feed, articles_count and recent_article_tags (the tags used by the blog's 200 most recent articles). Use list_articles with this blog id to read its articles. Needs the read_content access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `blog_id` | string | yes |  | Blog ID. The blog id, numeric or "gid://shopify/Blog/…". Find it with list_blogs. |

Output fields:

- `id`: Blog ID
- `title`: Title
- `handle`: Handle
- `comment_policy`: Comment Policy
- `template_suffix`: Template Suffix
- `articles_count`: Articles Count (number)
- `feed_path`: Feed Path
- `feed_location`: Feed Location (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `recent_article_tags`: Recent Article Tags
- `redacted_fields`: Redacted Fields

### `get_bulk_operation`

**Get Bulk Operation.** Returns one bulk operation (started by start_bulk_query or start_bulk_mutation): its status (CREATED, RUNNING, CANCELING, CANCELED, COMPLETED, FAILED, EXPIRED), type, error code, object counts and, once COMPLETED, the url of the JSONL result file (partial_data_url holds what was produced before a failure). This is a single read, not a wait: call it again later while status is CREATED or RUNNING. Result links expire after seven days. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bulk_operation_id` | string | yes |  | Bulk Operation ID. The bulk_operation_id returned when the operation was started, numeric or "gid://shopify/BulkOperation/…". |

Output fields:

- `id`: Bulk Operation ID
- `status`: Status
- `type`: Type
- `error_code`: Error Code
- `created_at`: Created At (datetime)
- `completed_at`: Completed At (datetime)
- `object_count`: Object Count (number)
- `root_object_count`: Root Object Count (number)
- `file_size`: File Size (filesize)
- `url`: Result File URL (url)
- `partial_data_url`: Partial Data URL (url)
- `query`: Query
- `redacted_fields`: Redacted Fields

### `get_business_entity`

**Get Business Entity.** Returns one business entity (a legal entity the merchant trades through): names, primary and archived flags, legal entity id and address. Leave business_entity_id empty to get the store's primary entity. Pass the id exactly as list_business_entities returned it; non-numeric ids are sent unchanged. The required access scope is not documented; availability on every plan is to be confirmed. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `business_entity_id` | string | no |  | Business Entity ID. The entity id as returned by list_business_entities (a numeric id is read as "gid://shopify/BusinessEntity/…"). Leave empty for the primary entity. |

Output fields:

- `id`: Business Entity ID
- `display_name`: Display Name
- `company_name`: Company Name
- `primary`: Primary (boolean)
- `archived`: Archived (boolean)
- `legal_entity_id`: Legal Entity ID
- `address1`: Address Line 1
- `address2`: Address Line 2
- `city`: City
- `province`: Province
- `zip`: ZIP
- `country_code`: Country Code
- `redacted_fields`: Redacted Fields

### `get_checkout_abandonment`

**Get Checkout Abandonment.** Looks up the abandonment record for an abandoned checkout id (from list_abandoned_checkouts): recovery email state, whether the customer ordered since and the recovery URL. Returns found=false when Shopify does not track an abandonment for that checkout. Customer fields may be null on stores without protected customer data access. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `abandoned_checkout_id` | string | yes |  | Abandoned Checkout ID. The abandoned checkout id, numeric or "gid://shopify/AbandonedCheckout/…". Find it with list_abandoned_checkouts. |

Output fields:

- `found`: Found (boolean)
- `id`: Abandonment ID
- `abandonment_type`: Abandonment Type
- `most_recent_step`: Most Recent Step
- `created_at`: Created At (datetime)
- `email_state`: Email State
- `email_sent_at`: Email Sent At (datetime)
- `cart_url`: Cart URL (url)
- `inventory_available`: Inventory Available (boolean)
- `is_from_online_store`: From Online Store (boolean)
- `customer_has_no_order_since_abandonment`: No Order Since Abandonment (boolean)
- `last_checkout_abandonment_date`: Last Checkout Abandonment Date (datetime)
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `customer_email`: Customer Email (email)
- `abandoned_checkout_id`: Abandoned Checkout ID
- `abandoned_checkout_name`: Abandoned Checkout Name
- `abandoned_checkout_url`: Abandoned Checkout URL (url)
- `abandoned_checkout_total_price`: Abandoned Checkout Total Price (number)
- `redacted_fields`: Redacted Fields

### `get_collection_by_handle`

**Get Collection by Handle.** Returns one collection by its URL handle (the last part of /collections/<handle>), with the same fields as get_collection. Fails when no collection has that handle. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `handle` | string | yes |  | Handle. The collection handle, for example "summer-sale". |

Output fields:

- `id`: Collection ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `sort_order`: Sort Order
- `updated_at`: Updated At (datetime)
- `products_count`: Products Count (number)
- `image_url`: Image (image)
- `image_alt`: Image Alt Text
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `sources`: Sources
- `sources[].id`: Source ID
- `sources[].title`: Title
- `sources[].type`: Type
- `sources[].shareable`: Shared (boolean)
- `sources[].app_id`: App ID
- `sources[].target_type`: Target Type
- `sources[].match_type`: Match Type
- `sources[].conditions`: Conditions
- `sources[].conditions[].id`: Condition ID
- `sources[].conditions[].kind`: Kind
- `sources[].conditions[].relation`: Relation
- `sources[].conditions[].values`: Values
- `sources[].conditions[].currency_code`: Currency Code
- `sources[].selected_products`: Selected Products
- `sources[].selected_products[].product_id`: Product ID
- `sources[].selected_products[].product_title`: Product Title
- `sources[].selected_products[].variant_ids`: Variant IDs
- `sources[].selected_products_count`: Selected Products Count (number)
- `sources[].selected_products_truncated`: Selected Products Truncated (boolean)
- `redacted_fields`: Redacted Fields

### `get_collection`

**Get Collection.** Returns one collection by id: title, handle, description, product sort order, product count, image, SEO and its membership sources. A conditions source holds the rule conditions (each with id, kind, relation, values and, for prices, currency_code) and the manually selected products (the first 25, with selected_products_truncated=true when there are more; list_collection_products lists every member). A source with shareable=true is reused by other collections and is never changed by add_products_to_collection or remove_products_from_collection. The source id and condition ids are what update_collection, add_products_to_collection and remove_products_from_collection work with. Use search_collections to find a collection first. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection_id` | string | yes |  | Collection ID. The collection id, numeric or "gid://shopify/Collection/…". Find it with search_collections. |

Output fields:

- `id`: Collection ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `sort_order`: Sort Order
- `updated_at`: Updated At (datetime)
- `products_count`: Products Count (number)
- `image_url`: Image (image)
- `image_alt`: Image Alt Text
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `sources`: Sources
- `sources[].id`: Source ID
- `sources[].title`: Title
- `sources[].type`: Type
- `sources[].shareable`: Shared (boolean)
- `sources[].app_id`: App ID
- `sources[].target_type`: Target Type
- `sources[].match_type`: Match Type
- `sources[].conditions`: Conditions
- `sources[].conditions[].id`: Condition ID
- `sources[].conditions[].kind`: Kind
- `sources[].conditions[].relation`: Relation
- `sources[].conditions[].values`: Values
- `sources[].conditions[].currency_code`: Currency Code
- `sources[].selected_products`: Selected Products
- `sources[].selected_products[].product_id`: Product ID
- `sources[].selected_products[].product_title`: Product Title
- `sources[].selected_products[].variant_ids`: Variant IDs
- `sources[].selected_products_count`: Selected Products Count (number)
- `sources[].selected_products_truncated`: Selected Products Truncated (boolean)
- `redacted_fields`: Redacted Fields

### `get_customer_profile`

**Get Customer.** Returns one customer by id: name, email and its marketing state, phone, tags, note, account state, order count, amount spent and default address. Use search_customers to find a customer by email, name or phone first. Name, email, phone and address may be null on stores without protected customer data access; such fields are listed in redacted_fields. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The customer id, numeric such as "207119551" or "gid://shopify/Customer/207119551". Find it with search_customers. |

Output fields:

- `id`: Customer ID
- `legacy_resource_id`: Numeric ID
- `display_name`: Display Name
- `first_name`: First Name
- `last_name`: Last Name
- `email`: Email (email)
- `email_marketing_state`: Email Marketing State
- `email_marketing_opt_in_level`: Email Marketing Opt-in Level
- `email_marketing_updated_at`: Email Marketing Updated At (datetime)
- `phone`: Phone
- `note`: Note
- `tags`: Tags
- `state`: Account State
- `verified_email`: Verified Email (boolean)
- `tax_exempt`: Tax Exempt (boolean)
- `locale`: Locale
- `number_of_orders`: Number Of Orders (number)
- `amount_spent`: Amount Spent (number)
- `amount_spent_currency`: Amount Spent Currency
- `can_delete`: Can Delete (boolean)
- `last_order_id`: Last Order ID
- `last_order_name`: Last Order Name
- `default_address_id`: Default Address ID
- `default_address_name`: Default Address Name
- `default_address_company`: Default Address Company
- `default_address_address1`: Default Address Address 1
- `default_address_address2`: Default Address Address 2
- `default_address_city`: Default Address City
- `default_address_province_code`: Default Address Province Code
- `default_address_country_code`: Default Address Country Code
- `default_address_zip`: Default Address ZIP
- `default_address_phone`: Default Address Phone
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `get_discount_redeem_code_bulk_creation`

**Get Discount Redeem Code Bulk Creation.** Reads one redeem code import started by add_discount_redeem_codes: done, how many codes were sent, imported and failed, and one page of the submitted codes with the created code id or the errors for each (for example "has already been taken"). A single read, not a wait: call again later while done is false. Page through the codes with end_cursor while has_next_page is true. Needs the read_discounts access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bulk_creation_id` | string | yes |  | Bulk Creation ID. The bulk_creation_id returned by add_discount_redeem_codes, for example "gid://shopify/DiscountRedeemCodeBulkCreation/989355205" (a plain number is accepted). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 60. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `bulk_creation_id`: Bulk Creation ID
- `done`: Done (boolean)
- `codes_count`: Codes Count (number)
- `imported_count`: Imported Count (number)
- `failed_count`: Failed Count (number)
- `created_at`: Created At (datetime)
- `discount_id`: Discount ID
- `codes`: Codes
- `codes[].code`: Code
- `codes[].discount_redeem_code_id`: Redeem Code ID
- `codes[].errors`: Errors
- `codes[].errors[].field`: Field
- `codes[].errors[].message`: Message
- `codes[].errors[].code`: Code
- `codes_on_page`: Codes On Page (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `get_discount`

**Get Discount.** Returns one discount, code or automatic, of any kind (amount off, buy X get Y, free shipping, app). Includes method (code or automatic), discount_type, title, status, summary, dates, usage count, value (percentage as a percent number, or amount), what it applies to (up to 25 product, variant or collection ids; items_truncated when more), eligibility (ALL, CUSTOMERS or SEGMENTS with ids), minimum requirement, combinations, usage limits and, for code discounts, the code count and up to 10 codes (use list_discount_redeem_codes for all). Takes the full discount id (gid://shopify/DiscountCodeNode/… or gid://shopify/DiscountAutomaticNode/…); a plain number is rejected as ambiguous. Needs the read_discounts access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `discount_id` | string | yes |  | Discount ID. The full discount id, for example "gid://shopify/DiscountCodeNode/123" or "gid://shopify/DiscountAutomaticNode/456". Get it from list_discounts or find_discount_by_code. |

Output fields:

- `id`: Discount ID
- `method`: Method
- `discount_type`: Discount Type
- `title`: Title
- `status`: Status
- `summary`: Summary
- `starts_at`: Starts At (datetime)
- `ends_at`: Ends At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `usage_count`: Usage Count (number)
- `discount_classes`: Discount Classes
- `tags`: Tags
- `combines_with_product_discounts`: Combines With Product Discounts (boolean)
- `combines_with_order_discounts`: Combines With Order Discounts (boolean)
- `combines_with_shipping_discounts`: Combines With Shipping Discounts (boolean)
- `applies_once_per_customer`: Applies Once Per Customer (boolean)
- `usage_limit`: Usage Limit (number)
- `codes_count`: Codes Count (number)
- `codes`: Codes
- `eligibility`: Eligibility
- `customer_ids`: Customer IDs
- `segment_ids`: Segment IDs
- `market_ids`: Market IDs
- `markets_truncated`: Markets Truncated (boolean)
- `value_type`: Value Type
- `percentage`: Percentage (number)
- `amount`: Amount (number)
- `amount_currency`: Amount Currency
- `applies_on_each_item`: Applies On Each Item (boolean)
- `quantity`: Quantity (number)
- `applies_to`: Applies To
- `product_ids`: Product IDs
- `variant_ids`: Variant IDs
- `collection_ids`: Collection IDs
- `items_truncated`: Items Truncated (boolean)
- `buys_type`: Buys Type
- `buys_quantity`: Buys Quantity (number)
- `buys_amount`: Buys Amount (number)
- `buys_applies_to`: Buys Applies To
- `buys_product_ids`: Buys Product IDs
- `buys_variant_ids`: Buys Variant IDs
- `buys_collection_ids`: Buys Collection IDs
- `buys_items_truncated`: Buys Items Truncated (boolean)
- `minimum_quantity`: Minimum Quantity (number)
- `minimum_subtotal`: Minimum Subtotal (number)
- `minimum_subtotal_currency`: Minimum Subtotal Currency
- `maximum_shipping_price`: Maximum Shipping Price (number)
- `destination_all_countries`: Destination All Countries (boolean)
- `destination_countries`: Destination Countries
- `uses_per_order_limit`: Uses Per Order Limit (number)
- `redacted_fields`: Redacted Fields

### `get_domain`

**Get Domain.** Returns one store domain: id, host, URL, whether SSL is on, its default and alternate languages and country, and the Markets web presence it serves (web_presence_id, subfolder suffix and root URLs per language). Leave domain_id empty to get the shop's primary domain. To find other domains, use list_web_presences (domain_id on each domain presence). Read-only. No access scope is documented for this query. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | string | no |  | Domain ID. The domain id, numeric or "gid://shopify/Domain/…" (see domain_id from list_web_presences). Leave empty for the primary domain. |

Output fields:

- `id`: Domain ID
- `host`: Host
- `url`: URL (url)
- `ssl_enabled`: SSL Enabled (boolean)
- `default_locale`: Default Locale
- `alternate_locales`: Alternate Locales
- `country`: Country
- `web_presence_id`: Web Presence ID
- `web_presence_subfolder_suffix`: Web Presence Subfolder Suffix
- `web_presence_root_urls`: Web Presence Root URLs
- `web_presence_root_urls[].locale`: Locale
- `web_presence_root_urls[].url`: URL (url)
- `redacted_fields`: Redacted Fields

### `get_draft_order`

**Get Draft Order.** Returns one draft order by id: status, invoice URL, totals, customer, payment terms, the first 100 line items and, once completed, the resulting order id. Use list_draft_orders to find a draft first. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draft_order_id` | string | yes |  | Draft Order ID. The draft order id, numeric or "gid://shopify/DraftOrder/…". Find it with list_draft_orders. |

Output fields:

- `id`: Draft Order ID
- `legacy_resource_id`: Numeric ID
- `name`: Draft Order Name
- `status`: Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `invoice_url`: Invoice URL (url)
- `invoice_sent_at`: Invoice Sent At (datetime)
- `email`: Email (email)
- `phone`: Phone
- `note`: Note
- `tags`: Tags
- `po_number`: PO Number
- `ready`: Ready (boolean)
- `currency_code`: Currency Code
- `subtotal_price`: Subtotal Price (number)
- `total_price`: Total Price (number)
- `total_tax`: Total Tax (number)
- `total_discounts`: Total Discounts (number)
- `total_shipping`: Total Shipping (number)
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `order_id`: Order ID
- `order_name`: Order Name
- `reserve_inventory_until`: Reserve Inventory Until (datetime)
- `tax_exempt`: Tax Exempt (boolean)
- `taxes_included`: Taxes Included (boolean)
- `discount_codes`: Discount Codes
- `applied_discount_title`: Applied Discount Title
- `applied_discount_value`: Applied Discount Value (number)
- `applied_discount_value_type`: Applied Discount Value Type
- `applied_discount_amount`: Applied Discount Amount (number)
- `payment_terms_id`: Payment Terms ID
- `payment_terms_name`: Payment Terms Name
- `payment_terms_type`: Payment Terms Type
- `payment_terms_due_in_days`: Payment Terms Due In Days (number)
- `shipping_line_title`: Shipping Line Title
- `shipping_line_price`: Shipping Line Price (number)
- `shipping_name`: Shipping Name
- `shipping_company`: Shipping Company
- `shipping_address1`: Shipping Address 1
- `shipping_address2`: Shipping Address 2
- `shipping_city`: Shipping City
- `shipping_province_code`: Shipping Province Code
- `shipping_country_code`: Shipping Country Code
- `shipping_zip`: Shipping ZIP
- `shipping_phone`: Shipping Phone
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].title`: Title
- `line_items[].sku`: SKU
- `line_items[].quantity`: Quantity (number)
- `line_items[].custom`: Custom Item (boolean)
- `line_items[].original_unit_price`: Original Unit Price (number)
- `line_items[].discounted_total`: Discounted Total (number)
- `line_items[].variant_id`: Variant ID
- `line_items_has_more`: Line Items Has More (boolean)
- `redacted_fields`: Redacted Fields

### `get_event`

**Get Store Event.** Returns one store event: its action (for example create, update, destroy, published), message, subject id and type for basic events or the raw comment text for staff comments, the app that caused it and when it happened. A numeric id is read as a basic event; pass the full "gid://shopify/CommentEvent/…" id for a staff comment. Find ids with list_events. No dedicated access scope is documented; the read scope of the event's subject is expected to apply (not yet confirmed on a store). Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event_id` | string | yes |  | Event ID. The event id, numeric (a basic event) or a full id such as "gid://shopify/BasicEvent/422690323" or "gid://shopify/CommentEvent/…". Find it with list_events. |

Output fields:

- `id`: Event ID
- `event_type`: Event Type
- `action`: Action
- `message`: Message (html)
- `secondary_message`: Secondary Message
- `raw_message`: Raw Message
- `subject_id`: Subject ID
- `subject_type`: Subject Type
- `author`: Author
- `app_title`: App Title
- `attribute_to_app`: Attributed To App (boolean)
- `attribute_to_user`: Attributed To User (boolean)
- `critical_alert`: Critical Alert (boolean)
- `edited`: Edited (boolean)
- `created_at`: Created At (datetime)
- `redacted_fields`: Redacted Fields

### `get_fulfillment_details`

**Get Fulfillment Details.** Returns one fulfillment (a recorded shipment): status, shipment status (display_status), tracking company, numbers and URLs, dates (in transit, delivered, estimated delivery), location, fulfillment service, origin address and up to 50 shipped line items with quantities (line_items_truncated tells when there are more). Needs the read_orders access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fulfillment_id` | string | yes |  | Fulfillment ID. The fulfillment id, numeric or "gid://shopify/Fulfillment/…". Find it with list_order_fulfillments. |

Output fields:

- `id`: Fulfillment ID
- `legacy_resource_id`: Legacy Resource ID
- `name`: Name
- `status`: Status
- `display_status`: Display Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `in_transit_at`: In Transit At (datetime)
- `delivered_at`: Delivered At (datetime)
- `estimated_delivery_at`: Estimated Delivery At (datetime)
- `total_quantity`: Total Quantity (number)
- `requires_shipping`: Requires Shipping (boolean)
- `tracking_company`: Tracking Company
- `tracking_numbers`: Tracking Numbers
- `tracking_urls`: Tracking URLs
- `location_id`: Location ID
- `location_name`: Location Name
- `service_id`: Fulfillment Service ID
- `service_name`: Fulfillment Service Name
- `order_id`: Order ID
- `order_name`: Order Name
- `origin_address1`: Origin Address 1
- `origin_address2`: Origin Address 2
- `origin_city`: Origin City
- `origin_zip`: Origin Zip
- `origin_province_code`: Origin Province Code
- `origin_country_code`: Origin Country Code
- `line_items`: Line Items
- `line_items[].id`: Fulfillment Line Item ID
- `line_items[].quantity`: Quantity (number)
- `line_items[].line_item_id`: Order Line Item ID
- `line_items[].title`: Title
- `line_items[].sku`: SKU
- `line_items_truncated`: Line Items Truncated (boolean)
- `redacted_fields`: Redacted Fields

### `get_fulfillment_order`

**Get Fulfillment Order.** Returns one fulfillment order: status and request status, assigned location, destination, delivery method, active holds (with the hold ids release_fulfillment_order_hold needs), the actions Shopify allows on it right now (supported_actions, for example CREATE_FULFILLMENT, HOLD, MOVE, RELEASE_HOLD) and its line items with remaining quantities, 50 per call: while line_items_truncated is true, call again with line_items_after set to line_items_end_cursor to read the next 50. Destination name, email and phone may be redacted on Basic-plan stores (see redacted_fields). Needs the read_merchant_managed_fulfillment_orders access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fulfillment_order_id` | string | yes |  | Fulfillment Order ID. The fulfillment order id, numeric or "gid://shopify/FulfillmentOrder/…". Find it with list_order_fulfillment_orders. |
| `line_items_after` | string | no |  | Line Items Cursor. Leave empty for the first 50 line items. To read more, pass line_items_end_cursor from the previous call. |

Output fields:

- `id`: Fulfillment Order ID
- `status`: Status
- `request_status`: Request Status
- `order_id`: Order ID
- `order_name`: Order Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `fulfill_at`: Fulfill At (datetime)
- `fulfill_by`: Fulfill By (datetime)
- `assigned_location_id`: Assigned Location ID
- `assigned_location_name`: Assigned Location Name
- `destination_first_name`: Destination First Name
- `destination_last_name`: Destination Last Name
- `destination_company`: Destination Company
- `destination_address1`: Destination Address 1
- `destination_address2`: Destination Address 2
- `destination_city`: Destination City
- `destination_province`: Destination Province
- `destination_zip`: Destination Zip
- `destination_country_code`: Destination Country Code
- `destination_phone`: Destination Phone
- `destination_email`: Destination Email (email)
- `delivery_method_type`: Delivery Method Type
- `delivery_method_name`: Delivery Method Name
- `holds`: Holds
- `holds[].id`: Hold ID
- `holds[].reason`: Reason
- `holds[].reason_notes`: Reason Notes
- `holds[].display_reason`: Display Reason
- `holds[].handle`: Handle
- `holds[].held_by_requesting_app`: Held By This App (boolean)
- `supported_actions`: Supported Actions
- `line_items`: Line Items
- `line_items[].id`: Fulfillment Order Line Item ID
- `line_items[].sku`: SKU
- `line_items[].product_title`: Product Title
- `line_items[].variant_title`: Variant Title
- `line_items[].total_quantity`: Total Quantity (number)
- `line_items[].remaining_quantity`: Remaining Quantity (number)
- `line_items[].requires_shipping`: Requires Shipping (boolean)
- `line_items[].line_item_id`: Order Line Item ID
- `line_items[].variant_id`: Variant ID
- `line_items[].inventory_item_id`: Inventory Item ID
- `line_items_truncated`: Line Items Truncated (boolean)
- `line_items_end_cursor`: Line Items Cursor
- `redacted_fields`: Redacted Fields

### `get_gift_card`

**Get Gift Card.** Returns one gift card: balance and initial value with currency, whether it is enabled and redeemable, expiry, deactivation time, owner customer, originating order, recipient details and note. Only the last characters of the code are ever returned (masked_code, last_characters); the full code is shown once, by create_gift_card. Needs the read_gift_cards access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `gift_card_id` | string | yes |  | Gift Card ID. The gift card id, numeric or "gid://shopify/GiftCard/…". Find it with search_gift_cards. |

Output fields:

- `id`: Gift Card ID
- `last_characters`: Last Characters
- `masked_code`: Masked Code
- `enabled`: Enabled (boolean)
- `is_redeemable`: Is Redeemable (boolean)
- `deactivated_at`: Deactivated At (datetime)
- `expires_on`: Expires On (date)
- `balance`: Balance (number)
- `initial_value`: Initial Value (number)
- `currency_code`: Currency Code
- `note`: Note
- `template_suffix`: Template Suffix
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `order_id`: Order ID
- `order_name`: Order Name
- `recipient_id`: Recipient ID
- `recipient_name`: Recipient Name
- `recipient_preferred_name`: Recipient Preferred Name
- `recipient_message`: Recipient Message
- `send_notification_at`: Send Notification At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `get_granted_access_scopes`

**Get Granted Access Scopes.** Lists the access scopes (for example read_orders, write_customers) granted to the connected custom app. Use it to diagnose an "access denied" or missing-scope error before retrying: if the scope is absent, the merchant must add it to the app and reinstall. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `items`: Scopes
- `items[].handle`: Handle
- `items[].description`: Description
- `count`: Count (number)
- `handles`: Handles
- `redacted_fields`: Redacted Fields

### `get_inventory_item`

**Get Inventory Item.** Returns one inventory item (the stock-keeping record behind a variant): SKU, whether stock is tracked, unit cost, weight, customs data (country of origin, HS code), how many locations stock it, and its variant and product. For quantities per location use list_inventory_levels. Needs the read_inventory access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inventory_item_id` | string | yes |  | Inventory Item ID. The inventory item id, numeric or "gid://shopify/InventoryItem/…" (from get_product_variant_details). |

Output fields:

- `id`: Inventory Item ID
- `legacy_resource_id`: Numeric ID
- `sku`: SKU
- `tracked`: Tracked (boolean)
- `requires_shipping`: Requires Shipping (boolean)
- `unit_cost`: Unit Cost (number)
- `unit_cost_currency`: Unit Cost Currency
- `country_code_of_origin`: Country of Origin
- `province_code_of_origin`: Province of Origin
- `harmonized_system_code`: HS Code
- `weight_value`: Weight (number)
- `weight_unit`: Weight Unit
- `locations_count`: Locations Count (number)
- `variant_id`: Variant ID
- `variant_title`: Variant Title
- `product_id`: Product ID
- `product_title`: Product Title
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `get_job`

**Get Job Status.** Reads the status of an asynchronous Shopify job, such as the job returned by start_order_cancellation. Returns done=true once Shopify has finished the work; call it again later while done is false. Shopify also reports done=true for an unknown job id, so pass the exact id you were given. One status read, it never waits. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The job id returned by the start action, for example "gid://shopify/Job/dc9b2604-c73b-45c6-8942-e235bac987e8". A bare UUID such as "dc9b2604-c73b-45c6-8942-e235bac987e8" is also accepted. |

Output fields:

- `id`: Job ID
- `done`: Done (boolean)
- `redacted_fields`: Redacted Fields

### `get_location`

**Get Location.** Returns one location by id: name, address, whether it is active, fulfills online orders, ships inventory, has stock or unfulfilled orders, and whether it can be deactivated or deleted. Use list_locations to find location ids. Needs the read_locations access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location_id` | string | yes |  | Location ID. The location id, numeric or "gid://shopify/Location/…". Find it with list_locations. |

Output fields:

- `id`: Location ID
- `legacy_resource_id`: Numeric ID
- `name`: Name
- `is_active`: Is Active (boolean)
- `activatable`: Activatable (boolean)
- `deactivatable`: Deactivatable (boolean)
- `deletable`: Deletable (boolean)
- `fulfills_online_orders`: Fulfills Online Orders (boolean)
- `ships_inventory`: Ships Inventory (boolean)
- `has_active_inventory`: Has Active Inventory (boolean)
- `has_unfulfilled_orders`: Has Unfulfilled Orders (boolean)
- `is_fulfillment_service`: Is Fulfillment Service (boolean)
- `deactivated_at`: Deactivated At (datetime)
- `address1`: Address Line 1
- `address2`: Address Line 2
- `city`: City
- `province`: Province
- `province_code`: Province Code
- `country`: Country
- `country_code`: Country Code
- `zip`: ZIP
- `phone`: Phone
- `formatted_address`: Formatted Address
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `get_marketing_event`

**Get Marketing Event.** Returns one marketing event: its tactic, channel, remote id, UTM values, start/end times, manage and preview URLs and the app it belongs to. Shopify documents marketing events as tied to the marketing app, so a custom-app token may only be able to read events it created itself (confirm on the store); another app's event can come back as not found. Find ids with list_marketing_events. Needs the read_marketing_events access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `marketing_event_id` | string | yes |  | Marketing Event ID. The marketing event id, numeric or "gid://shopify/MarketingEvent/…". Find it with list_marketing_events. |

Output fields:

- `id`: Marketing Event ID
- `legacy_resource_id`: Legacy Resource ID
- `type`: Type
- `remote_id`: Remote ID
- `description`: Description
- `marketing_channel_type`: Channel Type
- `source_and_medium`: Source and Medium
- `channel_handle`: Channel Handle
- `started_at`: Started At (datetime)
- `ended_at`: Ended At (datetime)
- `scheduled_to_end_at`: Scheduled To End At (datetime)
- `manage_url`: Manage URL (url)
- `preview_url`: Preview URL (url)
- `utm_campaign`: UTM Campaign
- `utm_medium`: UTM Medium
- `utm_source`: UTM Source
- `app_id`: App ID
- `app_title`: App Title
- `redacted_fields`: Redacted Fields

### `get_metafield_definition`

**Get Metafield Definition.** Returns one metafield definition identified by owner type, namespace and key: name, type, description, validations (for example min, max, choices, regex), validation status, pinned position, access, capabilities and how many values exist. Read it before update_metafield_definition, because sending validations there replaces the whole list. Needs the read access scope of the owner type (for example read_products). Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner_type` | string | yes |  | Owner Type. The resource type of the definition, for example PRODUCT. One of `"PRODUCT"`, `"PRODUCTVARIANT"`, `"COLLECTION"`, `"CUSTOMER"`, `"ORDER"`, `"DRAFTORDER"`, `"COMPANY"`, `"COMPANY_LOCATION"`, `"LOCATION"`, `"MARKET"`, `"PAGE"`, `"BLOG"`, `"ARTICLE"`, `"SHOP"`, `"DISCOUNT"`, `"SELLING_PLAN"`, `"GIFT_CARD_TRANSACTION"`. |
| `namespace` | string | yes |  | Namespace. The definition namespace, for example "custom". |
| `key` | string | yes |  | Key. The definition key, for example "care_instructions". |

Output fields:

- `id`: Definition ID
- `name`: Name
- `namespace`: Namespace
- `key`: Key
- `description`: Description
- `owner_type`: Owner Type
- `type`: Type
- `type_category`: Type Category
- `pinned_position`: Pinned Position (number)
- `validation_status`: Validation Status
- `validations`: Validations
- `validations[].name`: Name
- `validations[].type`: Type
- `validations[].value`: Value
- `metafields_count`: Metafields Count (number)
- `admin_access`: Admin Access
- `storefront_access`: Storefront Access
- `customer_account_access`: Customer Account Access
- `admin_filterable`: Admin Filterable (boolean)
- `smart_collection_condition`: Smart Collection Condition (boolean)
- `unique_values`: Unique Values (boolean)
- `redacted_fields`: Redacted Fields

### `get_metafield`

**Get Metafield.** Returns one metafield by its id: namespace, key, type, value, compare_digest, owner type and owner id, and its definition. To read metafields by owner, namespace and key, use list_metafields instead. Needs the read access scope of the owner type (for example read_products). Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `metafield_id` | string | yes |  | Metafield ID. The metafield id, numeric or "gid://shopify/Metafield/…". Find it with list_metafields. |

Output fields:

- `id`: Metafield ID
- `legacy_resource_id`: Legacy Resource ID
- `namespace`: Namespace
- `key`: Key
- `type`: Type
- `value`: Value
- `compare_digest`: Compare Digest
- `translatable`: Translatable (boolean)
- `owner_type`: Owner Type
- `owner_id`: Owner ID
- `definition_id`: Definition ID
- `definition_name`: Definition Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `get_metaobject`

**Get Metaobject Entry.** Returns one metaobject entry by id: type, handle, display name, publish status (DRAFT or ACTIVE when the type is publishable), online store template suffix, its definition, every field value (fields and a values map keyed by field key) and dates. Needs the read_metaobjects access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `metaobject_id` | string | yes |  | Metaobject ID. The entry id, numeric or "gid://shopify/Metaobject/…". Find it with list_metaobjects. |

Output fields:

- `id`: Metaobject ID
- `type`: Type
- `handle`: Handle
- `display_name`: Display Name
- `status`: Status
- `template_suffix`: Template Suffix
- `definition_id`: Definition ID
- `definition_name`: Definition Name
- `fields`: Fields
- `fields[].key`: Key
- `fields[].type`: Type
- `fields[].value`: Value
- `values`: Values (an object whose keys vary)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `get_online_store_settings`

**Get Online Store Settings.** Returns the online store channel settings Shopify exposes: password_protection_enabled is true while the storefront is locked behind a password (typical before launch or on development stores), so shoppers cannot see pages, articles or products yet. The required access scope is not documented. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `password_protection_enabled`: Password Protection Enabled (boolean)
- `redacted_fields`: Redacted Fields

### `get_order_risk_assessments`

**Get Order Risk Assessments.** Returns the fraud-risk summary of one order: the overall recommendation (accept, investigate, cancel) and every risk assessment with its level, provider and supporting facts. Use it before fulfilling or cancelling a suspicious order. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |

Output fields:

- `order_id`: Order ID
- `recommendation`: Recommendation
- `items`: Assessments
- `items[].risk_level`: Risk Level
- `items[].provider`: Provider
- `items[].facts`: Facts
- `items[].facts[].description`: Description
- `items[].facts[].sentiment`: Sentiment
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `get_order_transaction`

**Get Order Transaction.** Returns one order transaction by its id: kind, status, amount, gateway, capturable state, parent transaction and the order it belongs to. Use list_order_transactions when you only know the order. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transaction_id` | string | yes |  | Transaction ID. The transaction id, numeric such as "389404469" or "gid://shopify/OrderTransaction/389404469". Find it with list_order_transactions. |

Output fields:

- `id`: Transaction ID
- `kind`: Kind
- `status`: Status
- `gateway`: Gateway
- `formatted_gateway`: Formatted Gateway
- `test`: Test (boolean)
- `amount`: Amount (number)
- `currency_code`: Currency Code
- `total_unsettled`: Total Unsettled (number)
- `maximum_refundable`: Maximum Refundable (number)
- `manually_capturable`: Manually Capturable (boolean)
- `multi_capturable`: Multi Capturable (boolean)
- `authorization_expires_at`: Authorization Expires At (datetime)
- `error_code`: Error Code
- `payment_id`: Payment ID
- `parent_transaction_id`: Parent Transaction ID
- `order_id`: Order ID
- `order_name`: Order Name
- `created_at`: Created At (datetime)
- `processed_at`: Processed At (datetime)
- `redacted_fields`: Redacted Fields

### `get_order`

**Get Order.** Returns one order by id: status, money totals, customer, shipping and billing address, the first 100 line items, and the fulfillment and transaction counts. Use search_orders to find an order by name, email or date first. Customer contact fields may be null on stores without protected customer data access; such fields are listed in redacted_fields. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id: a numeric id such as "450789469" or a full id such as "gid://shopify/Order/450789469". Find it with search_orders. |

Output fields:

- `id`: Order ID
- `legacy_resource_id`: Numeric ID
- `name`: Order Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `processed_at`: Processed At (datetime)
- `closed`: Closed (boolean)
- `closed_at`: Closed At (datetime)
- `cancelled_at`: Cancelled At (datetime)
- `cancel_reason`: Cancel Reason
- `financial_status`: Financial Status
- `fulfillment_status`: Fulfillment Status
- `test`: Test (boolean)
- `email`: Email (email)
- `phone`: Phone
- `note`: Note
- `tags`: Tags
- `po_number`: PO Number
- `source_name`: Source Name
- `currency_code`: Currency Code
- `subtotal_price`: Subtotal Price (number)
- `total_price`: Total Price (number)
- `total_tax`: Total Tax (number)
- `total_discounts`: Total Discounts (number)
- `total_shipping`: Total Shipping (number)
- `total_refunded`: Total Refunded (number)
- `total_outstanding`: Total Outstanding (number)
- `current_total_price`: Current Total Price (number)
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `customer_email`: Customer Email (email)
- `number`: Order Number (number)
- `confirmed`: Confirmed (boolean)
- `capturable`: Capturable (boolean)
- `refundable`: Refundable (boolean)
- `fully_paid`: Fully Paid (boolean)
- `unpaid`: Unpaid (boolean)
- `can_mark_as_paid`: Can Mark As Paid (boolean)
- `fulfillments_count`: Fulfillments Count (number)
- `transactions_count`: Transactions Count (number)
- `discount_codes`: Discount Codes
- `payment_gateway_names`: Payment Gateway Names
- `shipping_line_title`: Shipping Line Title
- `shipping_line_price`: Shipping Line Price (number)
- `shipping_name`: Shipping Name
- `shipping_company`: Shipping Company
- `shipping_address1`: Shipping Address 1
- `shipping_address2`: Shipping Address 2
- `shipping_city`: Shipping City
- `shipping_province_code`: Shipping Province Code
- `shipping_country_code`: Shipping Country Code
- `shipping_zip`: Shipping ZIP
- `shipping_phone`: Shipping Phone
- `billing_name`: Billing Name
- `billing_company`: Billing Company
- `billing_address1`: Billing Address 1
- `billing_address2`: Billing Address 2
- `billing_city`: Billing City
- `billing_province_code`: Billing Province Code
- `billing_country_code`: Billing Country Code
- `billing_zip`: Billing ZIP
- `billing_phone`: Billing Phone
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].title`: Title
- `line_items[].sku`: SKU
- `line_items[].variant_title`: Variant Title
- `line_items[].vendor`: Vendor
- `line_items[].quantity`: Quantity (number)
- `line_items[].current_quantity`: Current Quantity (number)
- `line_items[].refundable_quantity`: Refundable Quantity (number)
- `line_items[].unfulfilled_quantity`: Unfulfilled Quantity (number)
- `line_items[].requires_shipping`: Requires Shipping (boolean)
- `line_items[].taxable`: Taxable (boolean)
- `line_items[].original_unit_price`: Original Unit Price (number)
- `line_items[].discounted_total`: Discounted Total (number)
- `line_items[].variant_id`: Variant ID
- `line_items[].product_id`: Product ID
- `line_items_has_more`: Line Items Has More (boolean)
- `redacted_fields`: Redacted Fields

### `get_page`

**Get Online Store Page.** Returns one online store content page: title, handle, full body HTML, body summary, publish state and date, and template suffix. Needs the read_content access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page ID. The page id, numeric or "gid://shopify/Page/…". Find it with list_pages. |

Output fields:

- `id`: Page ID
- `title`: Title
- `handle`: Handle
- `body_summary`: Body Summary
- `is_published`: Is Published (boolean)
- `published_at`: Published At (datetime)
- `template_suffix`: Template Suffix
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `body_html`: Body HTML (html)
- `redacted_fields`: Redacted Fields

### `get_product_details`

**Get Product.** Returns one product by id: title, status, vendor, type, tags, price range, SEO, its options with their values, the first 100 variants (price, SKU, stock, option values, inventory item id) and the first 50 media items. Use search_products to find a product by title, SKU, vendor or tag first. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id: a numeric id such as "632910392" or a full id such as "gid://shopify/Product/632910392". Find it with search_products. |

Output fields:

- `id`: Product ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `status`: Status
- `vendor`: Vendor
- `product_type`: Product Type
- `tags`: Tags
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `total_inventory`: Total Inventory (number)
- `tracks_inventory`: Tracks Inventory (boolean)
- `has_only_default_variant`: Has Only Default Variant (boolean)
- `variants_count`: Variants Count (number)
- `media_count`: Media Count (number)
- `min_price`: Min Price (number)
- `max_price`: Max Price (number)
- `currency_code`: Currency Code
- `featured_media_id`: Featured Media ID
- `featured_image_url`: Featured Image (image)
- `category_id`: Category ID
- `category_name`: Category Name
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `is_gift_card`: Is Gift Card (boolean)
- `requires_selling_plan`: Requires Selling Plan (boolean)
- `options`: Options
- `options[].id`: Option ID
- `options[].name`: Name
- `options[].position`: Position (number)
- `options[].values`: Values
- `options[].values[].id`: Value ID
- `options[].values[].name`: Name
- `options[].values[].has_variants`: Has Variants (boolean)
- `variants`: Variants
- `variants[].id`: Variant ID
- `variants[].legacy_resource_id`: Numeric ID
- `variants[].title`: Title
- `variants[].display_name`: Display Name
- `variants[].sku`: SKU
- `variants[].barcode`: Barcode
- `variants[].barcodes`: Barcodes
- `variants[].barcodes[].value`: Barcode
- `variants[].barcodes[].type`: Type
- `variants[].price`: Price (number)
- `variants[].compare_at_price`: Compare-at Price (number)
- `variants[].position`: Position (number)
- `variants[].inventory_quantity`: Inventory Quantity (number)
- `variants[].inventory_policy`: Inventory Policy
- `variants[].available_for_sale`: Available for Sale (boolean)
- `variants[].taxable`: Taxable (boolean)
- `variants[].selected_options`: Selected Options
- `variants[].selected_options[].name`: Option
- `variants[].selected_options[].value`: Value
- `variants[].inventory_item_id`: Inventory Item ID
- `variants[].inventory_tracked`: Inventory Tracked (boolean)
- `variants[].requires_shipping`: Requires Shipping (boolean)
- `variants[].product_id`: Product ID
- `variants[].product_title`: Product Title
- `variants[].created_at`: Created At (datetime)
- `variants[].updated_at`: Updated At (datetime)
- `variants_has_more`: More Variants (boolean)
- `media`: Media
- `media[].id`: Media ID
- `media[].alt`: Alt Text
- `media[].media_content_type`: Media Type
- `media[].status`: Status
- `media[].image_url`: Image URL (image)
- `media[].width`: Width (number)
- `media[].height`: Height (number)
- `media[].mime_type`: MIME Type
- `media[].preview_url`: Preview Image (image)
- `media[].external_url`: External URL (url)
- `media[].filename`: Filename
- `media[].errors`: Errors
- `media_has_more`: More Media (boolean)
- `redacted_fields`: Redacted Fields

### `get_product_duplicate_job`

**Get Product Duplicate Job.** Reads the status of a product duplication job by its id, for duplication jobs started elsewhere (for example in the Shopify admin or by another app). duplicate_product does not need it: it waits and returns the copy directly, and its image copy (image_job_id) is polled with get_job. Returns done=true once Shopify has finished; call it again later while done is false. Shopify also reports done=true for a job id it does not know, so done=true alone does not prove the id was right. One status read, it never waits. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The product duplicate job id, either the bare id or "gid://shopify/ProductDuplicateJob/…". |

Output fields:

- `id`: Job ID
- `done`: Done (boolean)
- `redacted_fields`: Redacted Fields

### `get_product_media`

**Get Product Media.** Returns one media item by id: type, processing status, alt text, URL, size and any processing errors. Use list_product_media to find media ids. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `media_id` | string | yes |  | Media ID. The media id, for example "gid://shopify/MediaImage/1072273219". A bare number is treated as an image id. Find it with list_product_media. |

Output fields:

- `id`: Media ID
- `alt`: Alt Text
- `media_content_type`: Media Type
- `status`: Status
- `image_url`: Image URL (image)
- `width`: Width (number)
- `height`: Height (number)
- `mime_type`: MIME Type
- `preview_url`: Preview Image (image)
- `external_url`: External URL (url)
- `filename`: Filename
- `errors`: Errors
- `redacted_fields`: Redacted Fields

### `get_product_variant_details`

**Get Product Variant.** Returns one product variant by id: title, SKU, barcode, price, compare-at price, stock quantity, out-of-stock policy, option values, its inventory item id (needed by the inventory actions) and its product. Use list_product_variants to find variant ids. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `variant_id` | string | yes |  | Variant ID. The variant id: numeric such as "808950810" or "gid://shopify/ProductVariant/808950810". Find it with list_product_variants. |

Output fields:

- `id`: Variant ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `display_name`: Display Name
- `sku`: SKU
- `barcode`: Barcode
- `barcodes`: Barcodes
- `barcodes[].value`: Barcode
- `barcodes[].type`: Type
- `price`: Price (number)
- `compare_at_price`: Compare-at Price (number)
- `position`: Position (number)
- `inventory_quantity`: Inventory Quantity (number)
- `inventory_policy`: Inventory Policy
- `available_for_sale`: Available for Sale (boolean)
- `taxable`: Taxable (boolean)
- `selected_options`: Selected Options
- `selected_options[].name`: Option
- `selected_options[].value`: Value
- `inventory_item_id`: Inventory Item ID
- `inventory_tracked`: Inventory Tracked (boolean)
- `requires_shipping`: Requires Shipping (boolean)
- `product_id`: Product ID
- `product_title`: Product Title
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `get_publication`

**Get Publication.** Returns one publication by id: its title, catalog and whether new products are published to it automatically. Use list_publications to find publication ids. Needs the read_publications access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `publication_id` | string | yes |  | Publication ID. The publication id, numeric or "gid://shopify/Publication/…". Find it with list_publications. |

Output fields:

- `id`: Publication ID
- `title`: Title
- `catalog_id`: Catalog ID
- `catalog_status`: Catalog Status
- `auto_publish`: Auto Publish (boolean)
- `supports_future_publishing`: Supports Future Publishing (boolean)
- `redacted_fields`: Redacted Fields

### `get_refund`

**Get Refund.** Returns one refund by id with its amount, note, refunded line items, refund transactions and the order it belongs to. Use list_order_refunds when you only know the order. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `refund_id` | string | yes |  | Refund ID. The refund id, numeric or "gid://shopify/Refund/…". Find it with list_order_refunds. |

Output fields:

- `id`: Refund ID
- `legacy_resource_id`: Numeric ID
- `note`: Note
- `created_at`: Created At (datetime)
- `processed_at`: Processed At (datetime)
- `updated_at`: Updated At (datetime)
- `total_refunded`: Total Refunded (number)
- `currency_code`: Currency Code
- `order_id`: Order ID
- `order_name`: Order Name
- `refund_line_items`: Refund Line Items
- `refund_line_items[].line_item_id`: Line Item ID
- `refund_line_items[].title`: Title
- `refund_line_items[].sku`: SKU
- `refund_line_items[].quantity`: Quantity (number)
- `refund_line_items[].restock_type`: Restock Type
- `refund_line_items[].restocked`: Restocked (boolean)
- `refund_line_items[].subtotal`: Subtotal (number)
- `refund_line_items[].total_tax`: Total Tax (number)
- `transactions`: Transactions
- `transactions[].id`: Transaction ID
- `transactions[].kind`: Kind
- `transactions[].status`: Status
- `transactions[].gateway`: Gateway
- `transactions[].amount`: Amount (number)
- `redacted_fields`: Redacted Fields

### `get_script_tag`

**Get Script Tag.** Returns one script tag: the src URL of the JavaScript file the storefront loads, its display scope, cache flag and timestamps. Find ids with list_script_tags. Needs the read_script_tags access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `script_tag_id` | string | yes |  | Script Tag ID. The script tag id, numeric or "gid://shopify/ScriptTag/…". Find it with list_script_tags. |

Output fields:

- `id`: Script Tag ID
- `legacy_resource_id`: Legacy Resource ID
- `src`: Script URL (url)
- `display_scope`: Display Scope
- `cache`: Cached (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `get_shop_billing_preferences`

**Get Shop Billing Currency.** Returns the currency the merchant uses to pay for Shopify apps and services (their billing currency). This is not the currency customers pay in; for that use get_shop (currency_code) or list_enabled_currencies. No access scope needed. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `billing_currency`: Billing Currency
- `redacted_fields`: Redacted Fields

### `get_shop`

**Get Shop.** Returns the connected store: name, domains, shop currency and enabled presentment currencies, IANA timezone, weight unit and plan. Call it first when you need the currency for money fields or the timezone to build date filters for search_orders and other searches. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: Shop ID
- `name`: Name
- `email`: Email (email)
- `contact_email`: Contact Email (email)
- `myshopify_domain`: Myshopify Domain
- `url`: URL (url)
- `primary_domain_host`: Primary Domain Host
- `primary_domain_url`: Primary Domain URL (url)
- `currency_code`: Currency Code
- `enabled_presentment_currencies`: Enabled Presentment Currencies
- `iana_timezone`: IANA Timezone
- `timezone_abbreviation`: Timezone Abbreviation
- `timezone_offset`: Timezone Offset
- `weight_unit`: Weight Unit
- `unit_system`: Unit System
- `taxes_included`: Taxes Included (boolean)
- `tax_shipping`: Tax Shipping (boolean)
- `plan_name`: Plan Name
- `plan_partner_development`: Partner Development Plan (boolean)
- `plan_shopify_plus`: Shopify Plus Plan (boolean)
- `address_city`: Address City
- `address_province_code`: Address Province Code
- `address_country_code`: Address Country Code
- `address_zip`: Address ZIP
- `created_at`: Created At (datetime)
- `redacted_fields`: Redacted Fields

### `get_theme_file`

**Get Theme File.** Reads one file of a theme by its path, for example "templates/index.json", "sections/header.liquid", "snippets/price.liquid", "config/settings_data.json" or "assets/base.css"; use list_theme_files to find the exact paths. Text files return content; binary files return content_base64 or a url (body_type says which). Returns size, checksum_md5 and dates too. Fails when the file does not exist. Needs the read_themes access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `theme_id` | string | yes |  | Theme ID. The theme id, numeric or "gid://shopify/OnlineStoreTheme/…". Find it with list_themes (role MAIN is the live theme). |
| `filename` | string | yes |  | File Path. Path of the file inside the theme, for example "templates/index.json" or "sections/header.liquid". Find it with list_theme_files. |

Output fields:

- `theme_id`: Theme ID
- `theme_name`: Theme Name
- `theme_role`: Theme Role
- `filename`: Filename
- `content_type`: Content Type
- `size`: Size (filesize)
- `checksum_md5`: Checksum MD5
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `body_type`: Body Type
- `content`: Content
- `content_base64`: Content (Base64)
- `url`: URL (url)
- `redacted_fields`: Redacted Fields

### `get_theme`

**Get Theme.** Returns one theme: name, role (MAIN is the live theme), whether it is still processing or failed to process, its Theme Store id and dates. Check the role before changing a theme or its files. Needs the read_themes access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `theme_id` | string | yes |  | Theme ID. The theme id, numeric or "gid://shopify/OnlineStoreTheme/…". Find it with list_themes. |

Output fields:

- `id`: Theme ID
- `name`: Name
- `role`: Role
- `prefix`: Preview Prefix
- `processing`: Processing (boolean)
- `processing_failed`: Processing Failed (boolean)
- `theme_store_id`: Theme Store ID (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `get_url_redirect`

**Get URL Redirect.** Returns one URL redirect: the old path visitors arrive on and the target they are sent to. Use list_url_redirects with "path:/old-page" to find one by path. Needs the read_online_store_navigation access scope. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url_redirect_id` | string | yes |  | URL Redirect ID. The redirect id, numeric or "gid://shopify/UrlRedirect/…". Find it with list_url_redirects. |

Output fields:

- `id`: URL Redirect ID
- `path`: Path
- `target`: Target
- `redacted_fields`: Redacted Fields

### `hold_fulfillment_order`

**Hold Fulfillment Order.** Places a fulfillment hold on one fulfillment order so it cannot be fulfilled until the hold is released with release_fulfillment_order_hold. A reason is required (for example AWAITING_PAYMENT, HIGH_RISK_OF_FRAUD, INCORRECT_ADDRESS, INVENTORY_OUT_OF_STOCK, OTHER). Leave line_items empty to hold the whole fulfillment order, or list fulfillment order line items with quantities to hold only those; Shopify then splits the rest into remaining_fulfillment_order. Returns the new hold (its id is what release_fulfillment_order_hold takes) and the held fulfillment order. Each app can have at most 10 active holds per fulfillment order, and every call adds another hold. notify_merchant is sent explicitly and defaults to false. Needs the write_merchant_managed_fulfillment_orders access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fulfillment_order_id` | string | yes |  | Fulfillment Order ID. The fulfillment order to hold, numeric or "gid://shopify/FulfillmentOrder/…". Find it with list_order_fulfillment_orders. |
| `reason` | string | yes |  | Reason. Why the fulfillment order is held. One of `"AWAITING_PAYMENT"`, `"HIGH_RISK_OF_FRAUD"`, `"INCORRECT_ADDRESS"`, `"INVENTORY_OUT_OF_STOCK"`, `"UNKNOWN_DELIVERY_DATE"`, `"AWAITING_RETURN_ITEMS"`, `"OTHER"`. |
| `reason_notes` | string | no |  | Reason Notes. Optional details shown with the hold, for example "Waiting for the customer to confirm the address". |
| `handle` | string | no |  | Handle. Optional unique name for this hold within your app, for example "address-check". Useful to find the hold again later. |
| `external_id` | string | no |  | External ID. Optional id from your own system that placed the hold. |
| `notify_merchant` | boolean | no | `false` | Notify Merchant. Notify the merchant about the hold. Off by default. |
| `line_items` | array | no |  | Line Items. Optional partial hold: the fulfillment order line items and quantities to hold. Leave empty to hold the whole fulfillment order. Each item: { `fulfillment_order_line_item_id`, `quantity` }. |

Output fields:

- `hold_id`: Hold ID
- `hold_reason`: Hold Reason
- `hold_reason_notes`: Hold Reason Notes
- `hold_display_reason`: Hold Display Reason
- `hold_handle`: Hold Handle
- `fulfillment_order`: Fulfillment Order
- `fulfillment_order.id`: Fulfillment Order ID
- `fulfillment_order.status`: Status
- `fulfillment_order.request_status`: Request Status
- `fulfillment_order.order_id`: Order ID
- `fulfillment_order.order_name`: Order Name
- `fulfillment_order.created_at`: Created At (datetime)
- `fulfillment_order.updated_at`: Updated At (datetime)
- `fulfillment_order.fulfill_at`: Fulfill At (datetime)
- `fulfillment_order.fulfill_by`: Fulfill By (datetime)
- `fulfillment_order.assigned_location_id`: Assigned Location ID
- `fulfillment_order.assigned_location_name`: Assigned Location Name
- `fulfillment_order.destination_first_name`: Destination First Name
- `fulfillment_order.destination_last_name`: Destination Last Name
- `fulfillment_order.destination_company`: Destination Company
- `fulfillment_order.destination_address1`: Destination Address 1
- `fulfillment_order.destination_address2`: Destination Address 2
- `fulfillment_order.destination_city`: Destination City
- `fulfillment_order.destination_province`: Destination Province
- `fulfillment_order.destination_zip`: Destination Zip
- `fulfillment_order.destination_country_code`: Destination Country Code
- `fulfillment_order.destination_phone`: Destination Phone
- `fulfillment_order.destination_email`: Destination Email (email)
- `fulfillment_order.delivery_method_type`: Delivery Method Type
- `fulfillment_order.delivery_method_name`: Delivery Method Name
- `fulfillment_order.holds`: Holds
- `fulfillment_order.holds[].id`: Hold ID
- `fulfillment_order.holds[].reason`: Reason
- `fulfillment_order.holds[].reason_notes`: Reason Notes
- `fulfillment_order.holds[].display_reason`: Display Reason
- `fulfillment_order.holds[].handle`: Handle
- `fulfillment_order.holds[].held_by_requesting_app`: Held By This App (boolean)
- `fulfillment_order.supported_actions`: Supported Actions
- `fulfillment_order.line_items`: Line Items
- `fulfillment_order.line_items[].id`: Fulfillment Order Line Item ID
- `fulfillment_order.line_items[].sku`: SKU
- `fulfillment_order.line_items[].product_title`: Product Title
- `fulfillment_order.line_items[].variant_title`: Variant Title
- `fulfillment_order.line_items[].total_quantity`: Total Quantity (number)
- `fulfillment_order.line_items[].remaining_quantity`: Remaining Quantity (number)
- `fulfillment_order.line_items[].requires_shipping`: Requires Shipping (boolean)
- `fulfillment_order.line_items[].line_item_id`: Order Line Item ID
- `fulfillment_order.line_items[].variant_id`: Variant ID
- `fulfillment_order.line_items[].inventory_item_id`: Inventory Item ID
- `fulfillment_order.line_items_truncated`: Line Items Truncated (boolean)
- `fulfillment_order.line_items_end_cursor`: Line Items Cursor
- `remaining_fulfillment_order`: Remaining Fulfillment Order
- `remaining_fulfillment_order.id`: Fulfillment Order ID
- `remaining_fulfillment_order.status`: Status
- `remaining_fulfillment_order.request_status`: Request Status
- `remaining_fulfillment_order.order_id`: Order ID
- `remaining_fulfillment_order.order_name`: Order Name
- `remaining_fulfillment_order.created_at`: Created At (datetime)
- `remaining_fulfillment_order.updated_at`: Updated At (datetime)
- `remaining_fulfillment_order.fulfill_at`: Fulfill At (datetime)
- `remaining_fulfillment_order.fulfill_by`: Fulfill By (datetime)
- `remaining_fulfillment_order.assigned_location_id`: Assigned Location ID
- `remaining_fulfillment_order.assigned_location_name`: Assigned Location Name
- `remaining_fulfillment_order.destination_first_name`: Destination First Name
- `remaining_fulfillment_order.destination_last_name`: Destination Last Name
- `remaining_fulfillment_order.destination_company`: Destination Company
- `remaining_fulfillment_order.destination_address1`: Destination Address 1
- `remaining_fulfillment_order.destination_address2`: Destination Address 2
- `remaining_fulfillment_order.destination_city`: Destination City
- `remaining_fulfillment_order.destination_province`: Destination Province
- `remaining_fulfillment_order.destination_zip`: Destination Zip
- `remaining_fulfillment_order.destination_country_code`: Destination Country Code
- `remaining_fulfillment_order.destination_phone`: Destination Phone
- `remaining_fulfillment_order.destination_email`: Destination Email (email)
- `remaining_fulfillment_order.delivery_method_type`: Delivery Method Type
- `remaining_fulfillment_order.delivery_method_name`: Delivery Method Name
- `remaining_fulfillment_order.holds`: Holds
- `remaining_fulfillment_order.holds[].id`: Hold ID
- `remaining_fulfillment_order.holds[].reason`: Reason
- `remaining_fulfillment_order.holds[].reason_notes`: Reason Notes
- `remaining_fulfillment_order.holds[].display_reason`: Display Reason
- `remaining_fulfillment_order.holds[].handle`: Handle
- `remaining_fulfillment_order.holds[].held_by_requesting_app`: Held By This App (boolean)
- `remaining_fulfillment_order.supported_actions`: Supported Actions
- `remaining_fulfillment_order.line_items`: Line Items
- `remaining_fulfillment_order.line_items[].id`: Fulfillment Order Line Item ID
- `remaining_fulfillment_order.line_items[].sku`: SKU
- `remaining_fulfillment_order.line_items[].product_title`: Product Title
- `remaining_fulfillment_order.line_items[].variant_title`: Variant Title
- `remaining_fulfillment_order.line_items[].total_quantity`: Total Quantity (number)
- `remaining_fulfillment_order.line_items[].remaining_quantity`: Remaining Quantity (number)
- `remaining_fulfillment_order.line_items[].requires_shipping`: Requires Shipping (boolean)
- `remaining_fulfillment_order.line_items[].line_item_id`: Order Line Item ID
- `remaining_fulfillment_order.line_items[].variant_id`: Variant ID
- `remaining_fulfillment_order.line_items[].inventory_item_id`: Inventory Item ID
- `remaining_fulfillment_order.line_items_truncated`: Line Items Truncated (boolean)
- `remaining_fulfillment_order.line_items_end_cursor`: Line Items Cursor
- `redacted_fields`: Redacted Fields

### `list_abandoned_checkouts`

**List Abandoned Checkouts.** Lists abandoned checkouts with total, customer and the recovery URL to send to the shopper. Supports search syntax such as "created_at:>=2026-09-01". Use get_checkout_abandonment for the marketing-email state of one checkout. Paged: pass end_cursor back as the cursor while has_next_page is true. Customer name and email may be null on stores without protected customer data access (see redacted_fields). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify search syntax, for example "created_at:>=2026-09-01" or "status:open". Leave empty for all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the checkout id. One of `"CREATED_AT"`, `"CHECKOUT_ID"`, `"CUSTOMER_NAME"`, `"TOTAL_PRICE"`, `"RELEVANCE"`, `"ID"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 100. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Abandoned Checkouts
- `items[].id`: Abandoned Checkout ID
- `items[].name`: Name
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].completed_at`: Completed At (datetime)
- `items[].recovery_url`: Recovery URL (url)
- `items[].note`: Note
- `items[].discount_codes`: Discount Codes
- `items[].taxes_included`: Taxes Included (boolean)
- `items[].currency_code`: Currency Code
- `items[].subtotal_price`: Subtotal Price (number)
- `items[].total_price`: Total Price (number)
- `items[].customer_id`: Customer ID
- `items[].customer_name`: Customer Name
- `items[].customer_email`: Customer Email (email)
- `items[].shipping_country_code`: Shipping Country Code
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_article_authors`

**List Article Authors.** Lists the distinct author names used on the store's blog articles, for example to reuse an existing author_name in create_article or to filter list_articles with "author:<name>". Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_content access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Authors
- `items[].name`: Name
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_article_tags`

**List Article Tags.** Lists the tags used across the store's blog articles, sorted alphabetically or by popularity. This list has no paging: limit sets how many tags come back (1 to 250), and truncated is true when the result filled the limit, meaning more tags may exist. For the tags of one blog use get_blog (recent_article_tags). Needs the read_content access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | yes | `50` | Limit. How many tags to return, 1 to 250. |
| `sort` | string | no |  | Sort. Alphabetical (default) or most used first. One of `"ALPHABETICAL"`, `"POPULAR"`. |

Output fields:

- `items`: Tags
- `count`: Count (number)
- `truncated`: Truncated (boolean)
- `redacted_fields`: Redacted Fields

### `list_articles`

**List Blog Articles.** Lists blog articles with title, handle, author, blog, summary, tags, publish state, image and comment count (not the full body; use get_article for that). Set blog_id to stay within one blog, and/or filter with Shopify search syntax such as "tag:news", "author:Jane", "published_status:published" or "updated_at:>2026-01-01". Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_content access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `blog_id` | string | no |  | Blog ID. Only list articles of this blog, numeric or "gid://shopify/Blog/…". Leave empty for every blog. |
| `query` | string | no |  | Search Query. Shopify article search syntax, for example "tag:news published_status:published" or "title:summer". Leave empty to list all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the id. One of `"ID"`, `"TITLE"`, `"PUBLISHED_AT"`, `"UPDATED_AT"`, `"AUTHOR"`, `"BLOG_TITLE"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 160. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Articles
- `items[].id`: Article ID
- `items[].title`: Title
- `items[].handle`: Handle
- `items[].author_name`: Author Name
- `items[].blog_id`: Blog ID
- `items[].blog_title`: Blog Title
- `items[].summary_html`: Summary (html)
- `items[].tags`: Tags
- `items[].is_published`: Is Published (boolean)
- `items[].published_at`: Published At (datetime)
- `items[].template_suffix`: Template Suffix
- `items[].image_url`: Image (image)
- `items[].image_alt_text`: Image Alt Text
- `items[].comments_count`: Comments Count (number)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_available_locales`

**List Available Locales.** Lists every locale Shopify supports (ISO code such as "fr" or "pt-BR" and its name). This is Shopify's full catalogue of languages a shop could enable, not the languages this shop has published. Returns the full list in one call (no paging). No access scope needed. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Locales
- `items[].iso_code`: ISO Code
- `items[].name`: Name
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `list_blogs`

**List Blogs.** Lists the online store's blogs with title, handle, comment policy, article count and feed. Optionally filter with Shopify search syntax such as "title:News" or "handle:news". Paged: pass end_cursor back as the cursor while has_next_page is true. Use get_blog for the recent article tags of one blog. Needs the read_content access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify blog search syntax, for example "title:News" or "handle:news". Leave empty to list all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the id. One of `"ID"`, `"TITLE"`, `"HANDLE"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Blogs
- `items[].id`: Blog ID
- `items[].title`: Title
- `items[].handle`: Handle
- `items[].comment_policy`: Comment Policy
- `items[].template_suffix`: Template Suffix
- `items[].articles_count`: Articles Count (number)
- `items[].feed_path`: Feed Path
- `items[].feed_location`: Feed Location (url)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_bulk_operations`

**List Bulk Operations.** Lists the bulk operations this app token started (bulk queries and bulk mutations), newest first by default, with status, type, counts and result URLs. Use status RUNNING to see what is still in progress before starting another one (up to five of each type can run per shop at the same time from API version 2026-01). Optional filters: status, type, and extra Shopify search syntax such as "created_at:>2026-09-01". Paged: pass end_cursor back as the cursor while has_next_page is true. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. Only operations in this state. One of `"created"`, `"running"`, `"completed"`, `"failed"`, `"canceling"`, `"canceled"`. |
| `operation_type` | string | no |  | Type. Only bulk queries or only bulk mutations. One of `"query"`, `"mutation"`. |
| `query` | string | no |  | Search Query. Extra Shopify search syntax, for example "created_at:>2026-09-01". Leave empty for no extra filter. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the creation time. One of `"CREATED_AT"`, `"COMPLETED_AT"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Bulk Operations
- `items[].id`: Bulk Operation ID
- `items[].status`: Status
- `items[].type`: Type
- `items[].error_code`: Error Code
- `items[].created_at`: Created At (datetime)
- `items[].completed_at`: Completed At (datetime)
- `items[].object_count`: Object Count (number)
- `items[].root_object_count`: Root Object Count (number)
- `items[].file_size`: File Size (filesize)
- `items[].url`: Result File URL (url)
- `items[].partial_data_url`: Partial Data URL (url)
- `items[].query`: Query
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_business_entities`

**List Business Entities.** Lists the store's business entities: the legal entities the merchant trades through (every store has one primary entity; more exist when the merchant sells through several legal entities in different countries). Each has its id, display and company name, primary and archived flags, legal entity id and address. Entity ids are passed through exactly as returned (they are not always numeric), so hand them to get_business_entity unchanged. Returns the full list in one call (no paging). The required access scope is not documented; availability on every plan is to be confirmed. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Business Entities
- `items[].id`: Business Entity ID
- `items[].display_name`: Display Name
- `items[].company_name`: Company Name
- `items[].primary`: Primary (boolean)
- `items[].archived`: Archived (boolean)
- `items[].legal_entity_id`: Legal Entity ID
- `items[].address1`: Address Line 1
- `items[].address2`: Address Line 2
- `items[].city`: City
- `items[].province`: Province
- `items[].zip`: ZIP
- `items[].country_code`: Country Code
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `list_carrier_services`

**List Carrier Services.** Lists the carrier services that provide live shipping rates at checkout (apps or carriers that Shopify calls for rates), with name, whether active, callback URL and whether they support service discovery. Carrier-calculated rates need the Advanced plan or higher (or a development store), so the list is often empty on smaller plans. Optionally filter with search syntax such as "active:true". Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_shipping access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Optional Shopify search syntax, for example "active:true" or "id:123". Leave empty to list all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the id. One of `"ID"`, `"CREATED_AT"`, `"UPDATED_AT"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Carrier Services
- `items[].id`: Carrier Service ID
- `items[].name`: Name
- `items[].formatted_name`: Formatted Name
- `items[].active`: Active (boolean)
- `items[].callback_url`: Callback URL (url)
- `items[].supports_service_discovery`: Supports Service Discovery (boolean)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_catalogs`

**List Catalogs.** Lists catalogs, which control which products are published and at what prices in a given context: market catalogs (per Markets market), company-location catalogs (B2B) and app catalogs. Each item has its type, title, status, price list (id, name, currency), publication id and, for market or company-location catalogs, how many markets or locations use it. Plan requirement: B2B company-location catalogs exist only on Shopify Plus stores, so on other plans expect only market catalogs or an empty list. Filter by type, or with Shopify search syntax such as "title:wholesale", "status:ACTIVE" or "market_id:123". Paged: pass end_cursor back as the cursor while has_next_page is true. The required access scope is not documented (read_products or read_markets expected). Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no |  | Catalog Type. Only catalogs of this type. Leave empty for all types. One of `"MARKET"`, `"COMPANY_LOCATION"`, `"APP"`, `"NONE"`. |
| `query` | string | no |  | Search Query. Shopify catalog search syntax, for example "title:wholesale", "status:ACTIVE" or "company_id:123". Leave empty to list all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the id. One of `"ID"`, `"TITLE"`, `"TYPE"`, `"RELEVANCE"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 200. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Catalogs
- `items[].id`: Catalog ID
- `items[].catalog_type`: Catalog Type
- `items[].title`: Title
- `items[].status`: Status
- `items[].price_list_id`: Price List ID
- `items[].price_list_name`: Price List Name
- `items[].price_list_currency`: Price List Currency
- `items[].publication_id`: Publication ID
- `items[].markets_count`: Markets Count (number)
- `items[].company_locations_count`: Company Locations Count (number)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_collection_products`

**List Collection Products.** Lists the products currently in one collection (manual picks and products matching its conditions) as product summaries. With the default sort the collection's own sort order is used. Paged: pass end_cursor back as the cursor while has_next_page is true. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection_id` | string | yes |  | Collection ID. The collection id, numeric or "gid://shopify/Collection/…". Find it with search_collections. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the collection's own sort order. One of `"COLLECTION_DEFAULT"`, `"MANUAL"`, `"BEST_SELLING"`, `"TITLE"`, `"PRICE"`, `"CREATED"`, `"ID"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 80. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Products
- `items[].id`: Product ID
- `items[].legacy_resource_id`: Numeric ID
- `items[].title`: Title
- `items[].handle`: Handle
- `items[].status`: Status
- `items[].vendor`: Vendor
- `items[].product_type`: Product Type
- `items[].tags`: Tags
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].published_at`: Published At (datetime)
- `items[].total_inventory`: Total Inventory (number)
- `items[].tracks_inventory`: Tracks Inventory (boolean)
- `items[].has_only_default_variant`: Has Only Default Variant (boolean)
- `items[].variants_count`: Variants Count (number)
- `items[].media_count`: Media Count (number)
- `items[].min_price`: Min Price (number)
- `items[].max_price`: Max Price (number)
- `items[].currency_code`: Currency Code
- `items[].featured_media_id`: Featured Media ID
- `items[].featured_image_url`: Featured Image (image)
- `items[].category_id`: Category ID
- `items[].category_name`: Category Name
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_comments`

**List Blog Comments.** Lists blog comments across the store with status (PENDING, UNAPPROVED, PUBLISHED, SPAM, REMOVED), body, author name and email, IP, the article it belongs to and dates. Filter with Shopify search syntax such as "status:pending", "published_status:unpublished" or "created_at:>2026-01-01". Paged: pass end_cursor back as the cursor while has_next_page is true. Author name, email and IP are protected customer data and may be null on stores without that access (listed in redacted_fields). Needs the read_content access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify comment search syntax, for example "status:pending" or "published_status:published". Leave empty to list all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the id. One of `"ID"`, `"CREATED_AT"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Comments
- `items[].id`: Comment ID
- `items[].status`: Status
- `items[].body`: Body
- `items[].body_html`: Body HTML (html)
- `items[].is_published`: Is Published (boolean)
- `items[].published_at`: Published At (datetime)
- `items[].author_name`: Author Name
- `items[].author_email`: Author Email (email)
- `items[].ip`: IP Address
- `items[].user_agent`: User Agent
- `items[].article_id`: Article ID
- `items[].article_title`: Article Title
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_consent_policies`

**List Privacy Consent Policies.** Lists the store's customer privacy consent policies: for each country (and optional region such as a US state), whether visitors must give consent before tracking and whether a data-sale opt-out is required. Optional filters: country_code, region_code (full ISO 3166-2 code such as "USCA"; a short one like "CA" is prefixed with country_code), consent_required, data_sale_opt_out_required, or one policy id. Returns every match in one call (no paging). Use list_consent_policy_regions for the countries and regions a policy can exist for. The read_privacy_settings access scope is expected (not stated on the query page; to be confirmed). Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `country_code` | string | no |  | Country Code. Only policies for this two-letter country code, for example "US" or "DE". |
| `region_code` | string | no |  | Region Code. Only policies for this ISO 3166-2 region code, country prefix included, for example "USCA" for California. A short code such as "CA" is prefixed with the country code when one is given. |
| `consent_required` | string | no |  | Consent Required. Yes returns only policies that require consent, No only those that do not. Leave empty for both. One of `"true"`, `"false"`. |
| `data_sale_opt_out_required` | string | no |  | Data Sale Opt-Out Required. Yes returns only policies that require a data-sale opt-out, No only those that do not. Leave empty for both. One of `"true"`, `"false"`. |
| `policy_id` | string | no |  | Policy ID. Only this policy, numeric or "gid://shopify/ConsentPolicy/…". |

Output fields:

- `items`: Consent Policies
- `items[].id`: Policy ID
- `items[].country_code`: Country Code
- `items[].region_code`: Region Code
- `items[].consent_required`: Consent Required (boolean)
- `items[].data_sale_opt_out_required`: Data Sale Opt-Out Required (boolean)
- `items[].shop_id`: Shop ID
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `list_consent_policy_regions`

**List Consent Policy Regions.** Lists the countries and regions (ISO 3166 country code plus optional region code) for which Shopify lets the store create or update a customer privacy consent policy. It does not say which policies exist; use list_consent_policies for that. Returns the full list in one call (no paging). The read_privacy_settings access scope is expected (not stated on the query page; to be confirmed). Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Regions
- `items[].country_code`: Country Code
- `items[].region_code`: Region Code
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `list_customer_account_pages`

**List Customer Account Pages.** Lists the pages of the store's customer accounts area: built-in pages (orders, profile, settings; page_kind CustomerAccountNativePage with a page_type) and pages added by app extensions (page_kind CustomerAccountAppExtensionPage), each with id, handle, title and default cursor. This belongs to the new customer accounts; a store still on classic accounts may return nothing. Paged: pass end_cursor back as the cursor while has_next_page is true. The required access scope is not documented. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Customer Account Pages
- `items[].id`: Page ID
- `items[].page_kind`: Page Kind
- `items[].handle`: Handle
- `items[].title`: Title
- `items[].default_cursor`: Default Cursor
- `items[].page_type`: Page Type
- `items[].app_extension_uuid`: App Extension UUID
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_customer_addresses`

**List Customer Addresses.** Lists the saved addresses of one customer, marking the default one. Use the address id with update_customer_address, delete_customer_address or set_default_customer_address. Paged: pass end_cursor back as the cursor while has_next_page is true. Address fields may be null on stores without protected customer data access (see redacted_fields). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The customer id, numeric or "gid://shopify/Customer/…". Find it with search_customers. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `customer_id`: Customer ID
- `items`: Addresses
- `items[].id`: Address ID
- `items[].first_name`: First Name
- `items[].last_name`: Last Name
- `items[].name`: Name
- `items[].company`: Company
- `items[].address1`: Address 1
- `items[].address2`: Address 2
- `items[].city`: City
- `items[].province`: Province
- `items[].province_code`: Province Code
- `items[].country`: Country
- `items[].country_code`: Country Code
- `items[].zip`: ZIP
- `items[].phone`: Phone
- `items[].is_default`: Is Default (boolean)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_customer_orders`

**List Customer Orders.** Lists the orders placed by one customer as order summaries (no line items), newest last unless reversed, optionally filtered with order search syntax such as "financial_status:paid". Use get_order for the full order. Paged: pass end_cursor back as the cursor while has_next_page is true. Without the read_all_orders scope only the last 60 days are visible. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The customer id, numeric or "gid://shopify/Customer/…". Find it with search_customers. |
| `query` | string | no |  | Search Query. Optional order search syntax to narrow the list, for example "financial_status:paid" or "created_at:>=2026-01-01". |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the order id. One of `"CREATED_AT"`, `"PROCESSED_AT"`, `"UPDATED_AT"`, `"ORDER_NUMBER"`, `"TOTAL_PRICE"`, `"ID"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `40` | Page Size. How many records to return, 1 to 40. Defaults to 40. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `customer_id`: Customer ID
- `items`: Orders
- `items[].id`: Order ID
- `items[].legacy_resource_id`: Numeric ID
- `items[].name`: Order Name
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].processed_at`: Processed At (datetime)
- `items[].closed`: Closed (boolean)
- `items[].closed_at`: Closed At (datetime)
- `items[].cancelled_at`: Cancelled At (datetime)
- `items[].cancel_reason`: Cancel Reason
- `items[].financial_status`: Financial Status
- `items[].fulfillment_status`: Fulfillment Status
- `items[].test`: Test (boolean)
- `items[].email`: Email (email)
- `items[].phone`: Phone
- `items[].note`: Note
- `items[].tags`: Tags
- `items[].po_number`: PO Number
- `items[].source_name`: Source Name
- `items[].currency_code`: Currency Code
- `items[].subtotal_price`: Subtotal Price (number)
- `items[].total_price`: Total Price (number)
- `items[].total_tax`: Total Tax (number)
- `items[].total_discounts`: Total Discounts (number)
- `items[].total_shipping`: Total Shipping (number)
- `items[].total_refunded`: Total Refunded (number)
- `items[].total_outstanding`: Total Outstanding (number)
- `items[].current_total_price`: Current Total Price (number)
- `items[].customer_id`: Customer ID
- `items[].customer_name`: Customer Name
- `items[].customer_email`: Customer Email (email)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_delivery_profiles`

**List Delivery Profiles.** Lists the store's delivery (shipping) profiles: name, whether it is the default profile, how many variants it covers, and per location group the shipping zones with their countries and up to 3 rates each (name, flat price or carrier service). Up to 2 zones per location group are returned; zones_truncated and rates_truncated tell when there are more; then read that location group in full with list_delivery_zones. This is the GraphQL form of the old shipping zones. Returns one profile per call to stay within the Shopify query cost limit: pass end_cursor back as the cursor while has_next_page is true to read the next profile. Needs the read_shipping access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `merchant_owned_only` | boolean | no | `false` | Merchant Owned Only. Return only profiles created by the merchant, not by apps. Off by default. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `1` | Page Size. How many records to return, 1 to 1. Defaults to 1. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Delivery Profiles
- `items[].id`: Delivery Profile ID
- `items[].name`: Name
- `items[].default`: Default (boolean)
- `items[].version`: Version (number)
- `items[].active_method_definitions_count`: Active Rates Count (number)
- `items[].locations_without_rates_count`: Locations Without Rates (number)
- `items[].origin_location_count`: Origin Locations (number)
- `items[].zone_country_count`: Zone Countries (number)
- `items[].product_variants_count`: Product Variants (number)
- `items[].location_groups`: Location Groups
- `items[].location_groups[].location_group_id`: Location Group ID
- `items[].location_groups[].locations_count`: Locations (number)
- `items[].location_groups[].zones`: Zones
- `items[].location_groups[].zones[].zone_id`: Zone ID
- `items[].location_groups[].zones[].zone_name`: Zone Name
- `items[].location_groups[].zones[].countries`: Countries
- `items[].location_groups[].zones[].rates`: Rates
- `items[].location_groups[].zones[].rates[].id`: Rate ID
- `items[].location_groups[].zones[].rates[].name`: Name
- `items[].location_groups[].zones[].rates[].active`: Active (boolean)
- `items[].location_groups[].zones[].rates[].description`: Description
- `items[].location_groups[].zones[].rates[].price`: Price (number)
- `items[].location_groups[].zones[].rates[].currency_code`: Currency Code
- `items[].location_groups[].zones[].rates[].carrier_service_id`: Carrier Service ID
- `items[].location_groups[].zones[].rates[].carrier_service_name`: Carrier Service Name
- `items[].location_groups[].zones[].rates_truncated`: Rates Truncated (boolean)
- `items[].location_groups[].zones_truncated`: Zones Truncated (boolean)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_discount_redeem_codes`

**List Discount Redeem Codes.** Lists the redeem codes (the strings customers type) of one code discount, with each code's id and usage count; the code ids are what delete_discount_redeem_codes takes. Optionally filter with "times_used:<n>" (for example "times_used:0") or plain text matched against the code (for example "SUMMER"); Shopify ignores other field filters such as "code:" and would list every code, so they are rejected. Plain text is matched word by word, not exactly: "APTEST-A" also matches "APTEST-B1". Takes the code discount id (gid://shopify/DiscountCodeNode/… or its plain number); automatic discounts have no codes. Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_discounts access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `discount_id` | string | yes |  | Discount ID. The code discount id, for example "gid://shopify/DiscountCodeNode/123" or "123". Get it from list_discounts or find_discount_by_code. |
| `query` | string | no |  | Search Query. Optional filter: "times_used:<n>" such as "times_used:0", or plain text matched against the code such as "SUMMER". Other field filters (for example "code:") are rejected. Leave empty to list all. |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `discount_id`: Discount ID
- `discount_type`: Discount Type
- `items`: Redeem Codes
- `items[].id`: Redeem Code ID
- `items[].code`: Code
- `items[].usage_count`: Usage Count (number)
- `items[].created_by_app_id`: Created By App ID
- `items[].created_by_app_title`: Created By App
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_discounts`

**List Discounts.** Lists the store's discounts, code and automatic, of every kind. Filter with Shopify search syntax, for example "status:active", "method:code", "method:automatic", "type:free_shipping", "title:Spring*" or "starts_at:>2026-01-01". Each item has the full discount id (gid://shopify/DiscountCodeNode/… or gid://shopify/DiscountAutomaticNode/…) that the other discount actions take, method, discount_type, title, status, summary, dates, usage count, eligibility, combinations and, for code discounts, the code count and first code. Use get_discount for value and targets. Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_discounts access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify discount search syntax, for example "status:active method:code" or "title:Spring*". Leave empty to list all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the id. One of `"ID"`, `"TITLE"`, `"CREATED_AT"`, `"UPDATED_AT"`, `"STARTS_AT"`, `"ENDS_AT"`, `"RELEVANCE"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `45` | Page Size. How many records to return, 1 to 45. Defaults to 45. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Discounts
- `items[].id`: Discount ID
- `items[].method`: Method
- `items[].discount_type`: Discount Type
- `items[].title`: Title
- `items[].status`: Status
- `items[].summary`: Summary
- `items[].starts_at`: Starts At (datetime)
- `items[].ends_at`: Ends At (datetime)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].usage_count`: Usage Count (number)
- `items[].discount_classes`: Discount Classes
- `items[].tags`: Tags
- `items[].combines_with_product_discounts`: Combines With Product Discounts (boolean)
- `items[].combines_with_order_discounts`: Combines With Order Discounts (boolean)
- `items[].combines_with_shipping_discounts`: Combines With Shipping Discounts (boolean)
- `items[].applies_once_per_customer`: Applies Once Per Customer (boolean)
- `items[].usage_limit`: Usage Limit (number)
- `items[].codes_count`: Codes Count (number)
- `items[].codes`: Codes
- `items[].eligibility`: Eligibility
- `items[].customer_ids`: Customer IDs
- `items[].segment_ids`: Segment IDs
- `items[].market_ids`: Market IDs
- `items[].markets_truncated`: Markets Truncated (boolean)
- `items[].value_type`: Value Type
- `items[].percentage`: Percentage (number)
- `items[].amount`: Amount (number)
- `items[].amount_currency`: Amount Currency
- `items[].applies_on_each_item`: Applies On Each Item (boolean)
- `items[].quantity`: Quantity (number)
- `items[].applies_to`: Applies To
- `items[].product_ids`: Product IDs
- `items[].variant_ids`: Variant IDs
- `items[].collection_ids`: Collection IDs
- `items[].items_truncated`: Items Truncated (boolean)
- `items[].buys_type`: Buys Type
- `items[].buys_quantity`: Buys Quantity (number)
- `items[].buys_amount`: Buys Amount (number)
- `items[].buys_applies_to`: Buys Applies To
- `items[].buys_product_ids`: Buys Product IDs
- `items[].buys_variant_ids`: Buys Variant IDs
- `items[].buys_collection_ids`: Buys Collection IDs
- `items[].buys_items_truncated`: Buys Items Truncated (boolean)
- `items[].minimum_quantity`: Minimum Quantity (number)
- `items[].minimum_subtotal`: Minimum Subtotal (number)
- `items[].minimum_subtotal_currency`: Minimum Subtotal Currency
- `items[].maximum_shipping_price`: Maximum Shipping Price (number)
- `items[].destination_all_countries`: Destination All Countries (boolean)
- `items[].destination_countries`: Destination Countries
- `items[].uses_per_order_limit`: Uses Per Order Limit (number)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_draft_orders`

**List Draft Orders.** Searches draft orders with Shopify search syntax (for example "status:open" or "customer_id:207119551") and returns one page of draft summaries without line items; use get_draft_order for the full draft. Paged: pass end_cursor back as the cursor while has_next_page is true. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify draft order search syntax, for example "status:open", "status:invoice_sent" or "tag:quote". Leave empty for all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the draft id. One of `"UPDATED_AT"`, `"NUMBER"`, `"STATUS"`, `"TOTAL_PRICE"`, `"CUSTOMER_NAME"`, `"RELEVANCE"`, `"ID"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 60. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Draft Orders
- `items[].id`: Draft Order ID
- `items[].legacy_resource_id`: Numeric ID
- `items[].name`: Draft Order Name
- `items[].status`: Status
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].completed_at`: Completed At (datetime)
- `items[].invoice_url`: Invoice URL (url)
- `items[].invoice_sent_at`: Invoice Sent At (datetime)
- `items[].email`: Email (email)
- `items[].phone`: Phone
- `items[].note`: Note
- `items[].tags`: Tags
- `items[].po_number`: PO Number
- `items[].ready`: Ready (boolean)
- `items[].currency_code`: Currency Code
- `items[].subtotal_price`: Subtotal Price (number)
- `items[].total_price`: Total Price (number)
- `items[].total_tax`: Total Tax (number)
- `items[].total_discounts`: Total Discounts (number)
- `items[].total_shipping`: Total Shipping (number)
- `items[].customer_id`: Customer ID
- `items[].customer_name`: Customer Name
- `items[].order_id`: Order ID
- `items[].order_name`: Order Name
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_enabled_currencies`

**List Store Currencies.** Lists the store's currency settings: each currency code and name, whether it is enabled for selling, and its manual exchange rate if the merchant set one (null means Shopify converts automatically). Also returns shop_currency_code, the currency the store reports in, and enabled_presentment_currencies, the currency codes customers can pay in. items can be empty on a store without multi-currency settings (for example without Shopify Payments); enabled_presentment_currencies still lists what customers can pay in, so do not read an empty items list as "no currencies". Paged: pass end_cursor back as the cursor while has_next_page is true. The required access scope is not documented (expected: none beyond the connection). Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `shop_currency_code`: Shop Currency
- `enabled_presentment_currencies`: Currencies Customers Can Pay In
- `items`: Currency Settings
- `items[].currency_code`: Currency Code
- `items[].currency_name`: Currency Name
- `items[].enabled`: Enabled (boolean)
- `items[].manual_rate`: Manual Rate (number)
- `items[].rate_updated_at`: Rate Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_events`

**List Store Events.** Lists store events, the activity log that records actions such as creating, updating, publishing or deleting products, orders, customers, collections, discounts, pages and blog content, plus staff timeline comments. Each event has its action, message, subject id and type (for basic events), the app that caused it and a timestamp. Filter with Shopify search syntax: "action:'destroy' AND subject_type:'PRODUCT'" finds deleted products, "created_at:>2026-09-01" limits the time, "comments:false" leaves out staff comments. No dedicated access scope is documented; the read scope of each subject type is expected to apply (for example read_products for product events; not yet confirmed on a store). Paged: pass end_cursor back as the cursor while has_next_page is true. Use count_events for a total. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify event search syntax, for example "action:'destroy' AND subject_type:'PRODUCT'" or "created_at:>2026-09-01". Leave empty to list all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the id. One of `"ID"`, `"CREATED_AT"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Events
- `items[].id`: Event ID
- `items[].event_type`: Event Type
- `items[].action`: Action
- `items[].message`: Message (html)
- `items[].secondary_message`: Secondary Message
- `items[].raw_message`: Raw Message
- `items[].subject_id`: Subject ID
- `items[].subject_type`: Subject Type
- `items[].author`: Author
- `items[].app_title`: App Title
- `items[].attribute_to_app`: Attributed To App (boolean)
- `items[].attribute_to_user`: Attributed To User (boolean)
- `items[].critical_alert`: Critical Alert (boolean)
- `items[].edited`: Edited (boolean)
- `items[].created_at`: Created At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_fulfillment_events`

**List Fulfillment Events.** Lists the tracking events of one fulfillment (label printed, in transit, out for delivery, delivered, …) with message, time and place. Sorted by when they happened unless another sort is chosen. Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_orders access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fulfillment_id` | string | yes |  | Fulfillment ID. The fulfillment id, numeric or "gid://shopify/Fulfillment/…". Find it with list_order_fulfillments. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to when the event happened. One of `"HAPPENED_AT"`, `"ID"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `fulfillment_id`: Fulfillment ID
- `items`: Fulfillment Events
- `items[].id`: Fulfillment Event ID
- `items[].status`: Status
- `items[].message`: Message
- `items[].happened_at`: Happened At (datetime)
- `items[].created_at`: Created At (datetime)
- `items[].estimated_delivery_at`: Estimated Delivery At (datetime)
- `items[].address1`: Address 1
- `items[].city`: City
- `items[].province`: Province
- `items[].country`: Country
- `items[].zip`: Zip
- `items[].latitude`: Latitude (number)
- `items[].longitude`: Longitude (number)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_fulfillment_order_move_locations`

**List Fulfillment Order Move Locations.** Lists candidate locations for moving one fulfillment order. For each location: movable (true when move_fulfillment_order will accept it), a message explaining why not, and how many of the line items it can and cannot stock. Optionally narrow by location name search or by fulfillment order line item ids. Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_merchant_managed_fulfillment_orders access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fulfillment_order_id` | string | yes |  | Fulfillment Order ID. The fulfillment order to move, numeric or "gid://shopify/FulfillmentOrder/…". Find it with list_order_fulfillment_orders. |
| `query` | string | no |  | Search Query. Optional location search, for example "name:Warehouse*". Leave empty to list all candidates. |
| `line_item_ids` | array | no |  | Fulfillment Order Line Item IDs. Optional: only check these fulfillment order line items (line_items[].id from get_fulfillment_order). Leave empty to check all. |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 200. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `fulfillment_order_id`: Fulfillment Order ID
- `items`: Locations
- `items[].location_id`: Location ID
- `items[].location_name`: Location Name
- `items[].movable`: Movable (boolean)
- `items[].message`: Message
- `items[].available_line_items_count`: Available Line Items (number)
- `items[].unavailable_line_items_count`: Unavailable Line Items (number)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_fulfillment_services`

**List Fulfillment Services.** Lists the store's fulfillment services (third-party warehouses, gift card and manual services) with handle, name, type, callback URL, whether they manage inventory or support tracking, and the location each one uses. Returns the full list in one call (no paging). Needs the read_fulfillments access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Fulfillment Services
- `items[].id`: Fulfillment Service ID
- `items[].handle`: Handle
- `items[].service_name`: Service Name
- `items[].type`: Type
- `items[].callback_url`: Callback URL (url)
- `items[].inventory_management`: Inventory Management (boolean)
- `items[].tracking_support`: Tracking Support (boolean)
- `items[].requires_shipping_method`: Requires Shipping Method (boolean)
- `items[].location_id`: Location ID
- `items[].location_name`: Location Name
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `list_inventory_items`

**Search Inventory Items.** Searches inventory items with Shopify search syntax (for example "sku:TSHIRT-RED-L", "sku:TSHIRT*" or "id:>=30322695") and returns one page with SKU, tracking, cost and the linked variant and product. Use it to turn a SKU into the inventory item id the inventory actions need. Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_inventory access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify inventory item search syntax, for example "sku:TSHIRT-RED-L". Leave empty to list all. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 100. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Inventory Items
- `items[].id`: Inventory Item ID
- `items[].legacy_resource_id`: Numeric ID
- `items[].sku`: SKU
- `items[].tracked`: Tracked (boolean)
- `items[].requires_shipping`: Requires Shipping (boolean)
- `items[].unit_cost`: Unit Cost (number)
- `items[].unit_cost_currency`: Unit Cost Currency
- `items[].country_code_of_origin`: Country of Origin
- `items[].province_code_of_origin`: Province of Origin
- `items[].harmonized_system_code`: HS Code
- `items[].weight_value`: Weight (number)
- `items[].weight_unit`: Weight Unit
- `items[].locations_count`: Locations Count (number)
- `items[].variant_id`: Variant ID
- `items[].variant_title`: Variant Title
- `items[].product_id`: Product ID
- `items[].product_title`: Product Title
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_inventory_levels`

**List Inventory Levels.** Lists inventory levels with their quantities (available, on hand, committed, incoming, reserved, damaged, safety stock, quality control). Give exactly one of inventory_item_id (where is this item stocked, and how much) or location_id (what is stocked at this location). Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_inventory access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inventory_item_id` | string | no |  | Inventory Item ID. List this item's levels at every location, numeric or "gid://shopify/InventoryItem/…". Leave empty when giving a location. |
| `location_id` | string | no |  | Location ID. List every item stocked at this location, numeric or "gid://shopify/Location/…". Leave empty when giving an item. |
| `include_inactive` | boolean | no | `false` | Include Inactive. Also return levels that were deactivated. Off by default. |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 70. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Inventory Levels
- `items[].id`: Inventory Level ID
- `items[].is_active`: Is Active (boolean)
- `items[].can_deactivate`: Can Deactivate (boolean)
- `items[].deactivation_alert`: Deactivation Alert
- `items[].inventory_item_id`: Inventory Item ID
- `items[].sku`: SKU
- `items[].location_id`: Location ID
- `items[].location_name`: Location Name
- `items[].available`: Available (number)
- `items[].on_hand`: On Hand (number)
- `items[].committed`: Committed (number)
- `items[].incoming`: Incoming (number)
- `items[].reserved`: Reserved (number)
- `items[].damaged`: Damaged (number)
- `items[].safety_stock`: Safety Stock (number)
- `items[].quality_control`: Quality Control (number)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_locations`

**List Locations.** Lists the store's locations with name, address, whether they are active, fulfill online orders or ship inventory, and whether they belong to a fulfillment service. The ids are needed by the inventory actions. Optionally filter with search syntax such as "name:Warehouse*". Inactive and legacy (fulfillment service) locations are left out unless asked for. Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_locations access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify location search syntax, for example "name:Warehouse*". Leave empty to list all. |
| `include_inactive` | boolean | no | `false` | Include Inactive. Also return deactivated locations. Off by default. |
| `include_legacy` | boolean | no | `false` | Include Legacy. Also return legacy fulfillment-service locations. Off by default. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the name. One of `"NAME"`, `"ID"`, `"RELEVANCE"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Locations
- `items[].id`: Location ID
- `items[].legacy_resource_id`: Numeric ID
- `items[].name`: Name
- `items[].is_active`: Is Active (boolean)
- `items[].activatable`: Activatable (boolean)
- `items[].deactivatable`: Deactivatable (boolean)
- `items[].deletable`: Deletable (boolean)
- `items[].fulfills_online_orders`: Fulfills Online Orders (boolean)
- `items[].ships_inventory`: Ships Inventory (boolean)
- `items[].has_active_inventory`: Has Active Inventory (boolean)
- `items[].has_unfulfilled_orders`: Has Unfulfilled Orders (boolean)
- `items[].is_fulfillment_service`: Is Fulfillment Service (boolean)
- `items[].deactivated_at`: Deactivated At (datetime)
- `items[].address1`: Address Line 1
- `items[].address2`: Address Line 2
- `items[].city`: City
- `items[].province`: Province
- `items[].province_code`: Province Code
- `items[].country`: Country
- `items[].country_code`: Country Code
- `items[].zip`: ZIP
- `items[].phone`: Phone
- `items[].formatted_address`: Formatted Address
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_marketing_events`

**List Marketing Events.** Lists marketing events: the campaigns, ads, emails and posts that marketing apps recorded on the store, each with its tactic, channel, UTM values, start/end times and the app it belongs to. Shopify documents this list as the events "associated with the marketing app", so a custom-app token may only see the events it created itself (for example with upsert_external_marketing_activity), not those of other marketing apps; an empty list does not prove the store runs no marketing. Filter with Shopify search syntax such as "type:AD", "started_at:>2026-01-01" or description:"<exact event description>" (the description filter matches the whole text only, not a word in it). Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_marketing_events access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify marketing event search syntax, for example "type:AD", "app_id:123" or "started_at:>2026-01-01". Leave empty to list all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the id. One of `"ID"`, `"STARTED_AT"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Marketing Events
- `items[].id`: Marketing Event ID
- `items[].legacy_resource_id`: Legacy Resource ID
- `items[].type`: Type
- `items[].remote_id`: Remote ID
- `items[].description`: Description
- `items[].marketing_channel_type`: Channel Type
- `items[].source_and_medium`: Source and Medium
- `items[].channel_handle`: Channel Handle
- `items[].started_at`: Started At (datetime)
- `items[].ended_at`: Ended At (datetime)
- `items[].scheduled_to_end_at`: Scheduled To End At (datetime)
- `items[].manage_url`: Manage URL (url)
- `items[].preview_url`: Preview URL (url)
- `items[].utm_campaign`: UTM Campaign
- `items[].utm_medium`: UTM Medium
- `items[].utm_source`: UTM Source
- `items[].app_id`: App ID
- `items[].app_title`: App Title
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_metafield_definition_types`

**List Metafield Types.** Lists every metafield type Shopify supports (for example single_line_text_field, number_integer, date, json, product_reference and their list.* variants) with its category and the validation rules it accepts. Use the name as the type in set_metafields, and the validation names in update_metafield_definition. Returns the full list in one call (no paging). No access scope needed. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Types
- `items[].name`: Name
- `items[].category`: Category
- `items[].supports_definition_migrations`: Supports Definition Migrations (boolean)
- `items[].supported_validations`: Supported Validations
- `items[].supported_validations[].name`: Name
- `items[].supported_validations[].type`: Type
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `list_metafield_definitions`

**List Metafield Definitions.** Lists the metafield definitions for one owner type (for example PRODUCT or CUSTOMER): name, namespace, key, type, description, validations, pinned position, access and capabilities, and how many values exist. Use it to learn which namespace, key and type set_metafields expects. Optionally filter by namespace, key, pinned status or a search query. Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read access scope of the owner type (for example read_products). Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner_type` | string | yes |  | Owner Type. The resource type the definitions belong to, for example PRODUCT. One of `"PRODUCT"`, `"PRODUCTVARIANT"`, `"COLLECTION"`, `"CUSTOMER"`, `"ORDER"`, `"DRAFTORDER"`, `"COMPANY"`, `"COMPANY_LOCATION"`, `"LOCATION"`, `"MARKET"`, `"PAGE"`, `"BLOG"`, `"ARTICLE"`, `"SHOP"`, `"DISCOUNT"`, `"SELLING_PLAN"`, `"GIFT_CARD_TRANSACTION"`. |
| `namespace` | string | no |  | Namespace. Only definitions in this namespace, for example "custom". |
| `key` | string | no |  | Key. Only the definition with this key. |
| `pinned_status` | string | no |  | Pinned Status. Only pinned or only unpinned definitions. Leave empty for all. One of `"ANY"`, `"PINNED"`, `"UNPINNED"`. |
| `query` | string | no |  | Search Query. Free-text search over the definitions, for example "care". Leave empty for all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the id. One of `"ID"`, `"NAME"`, `"PINNED_POSITION"`, `"RELEVANCE"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `45` | Page Size. How many records to return, 1 to 45. Defaults to 45. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Metafield Definitions
- `items[].id`: Definition ID
- `items[].name`: Name
- `items[].namespace`: Namespace
- `items[].key`: Key
- `items[].description`: Description
- `items[].owner_type`: Owner Type
- `items[].type`: Type
- `items[].type_category`: Type Category
- `items[].pinned_position`: Pinned Position (number)
- `items[].validation_status`: Validation Status
- `items[].validations`: Validations
- `items[].validations[].name`: Name
- `items[].validations[].type`: Type
- `items[].validations[].value`: Value
- `items[].metafields_count`: Metafields Count (number)
- `items[].admin_access`: Admin Access
- `items[].storefront_access`: Storefront Access
- `items[].customer_account_access`: Customer Account Access
- `items[].admin_filterable`: Admin Filterable (boolean)
- `items[].smart_collection_condition`: Smart Collection Condition (boolean)
- `items[].unique_values`: Unique Values (boolean)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_metafields`

**List Metafields.** Lists the metafields stored on one resource (product, variant, collection, customer, order, draft order, company, location, market, page, blog, article, the shop and more), each with namespace, key, type, value, compare_digest and its definition. Pass the owner's full id, for example "gid://shopify/Product/123" (use the shop id from get_shop for shop metafields); optionally only one namespace. Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read access scope of the owner type (for example read_products). Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner_id` | string | yes |  | Owner ID. Full id of the resource, for example "gid://shopify/Product/123" or "gid://shopify/Customer/456". |
| `namespace` | string | no |  | Namespace. Only return metafields in this namespace, for example "custom". Leave empty for all. |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `owner_id`: Owner ID
- `items`: Metafields
- `items[].id`: Metafield ID
- `items[].legacy_resource_id`: Legacy Resource ID
- `items[].namespace`: Namespace
- `items[].key`: Key
- `items[].type`: Type
- `items[].value`: Value
- `items[].compare_digest`: Compare Digest
- `items[].translatable`: Translatable (boolean)
- `items[].owner_type`: Owner Type
- `items[].owner_id`: Owner ID
- `items[].definition_id`: Definition ID
- `items[].definition_name`: Definition Name
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_metaobject_definitions`

**List Metaobject Definitions.** Lists the store's metaobject definitions (custom content types such as "designer" or "shopify--color-pattern"): type, name, description, entry count, capabilities (publishable, translatable, renderable, online store), access and every field definition (key, name, type, required). Use it to learn the type and field keys for list_metaobjects and upsert_metaobject. Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_metaobject_definitions access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `30` | Page Size. How many records to return, 1 to 30. Defaults to 30. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Metaobject Definitions
- `items[].id`: Definition ID
- `items[].type`: Type
- `items[].name`: Name
- `items[].description`: Description
- `items[].display_name_key`: Display Name Key
- `items[].metaobjects_count`: Metaobjects Count (number)
- `items[].has_thumbnail_field`: Has Thumbnail Field (boolean)
- `items[].publishable`: Publishable (boolean)
- `items[].translatable`: Translatable (boolean)
- `items[].renderable`: Renderable (boolean)
- `items[].online_store`: Online Store (boolean)
- `items[].admin_access`: Admin Access
- `items[].storefront_access`: Storefront Access
- `items[].field_definitions`: Field Definitions
- `items[].field_definitions[].key`: Key
- `items[].field_definitions[].name`: Name
- `items[].field_definitions[].description`: Description
- `items[].field_definitions[].required`: Required (boolean)
- `items[].field_definitions[].type`: Type
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_metaobjects`

**List Metaobject Entries.** Lists the entries of one metaobject type (for example "designer" or "shopify--color-pattern"; see list_metaobject_definitions for the types) with handle, display name, publish status, every field value (fields and a values map keyed by field key) and dates. Filter with Shopify search syntax such as "display_name:Ada" or "fields.country:France". Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_metaobjects access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Metaobject Type. The metaobject definition type, for example "designer". Find it with list_metaobject_definitions. |
| `query` | string | no |  | Search Query. Shopify metaobject search syntax, for example "display_name:Ada" or "fields.country:France". Leave empty to list all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the id. One of `"id"`, `"display_name"`, `"updated_at"`, `"type"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 50. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Metaobjects
- `items[].id`: Metaobject ID
- `items[].type`: Type
- `items[].handle`: Handle
- `items[].display_name`: Display Name
- `items[].status`: Status
- `items[].template_suffix`: Template Suffix
- `items[].definition_id`: Definition ID
- `items[].definition_name`: Definition Name
- `items[].fields`: Fields
- `items[].fields[].key`: Key
- `items[].fields[].type`: Type
- `items[].fields[].value`: Value
- `items[].values`: Values (an object whose keys vary)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_order_fulfillment_orders`

**List Order Fulfillment Orders.** Lists the fulfillment orders of one order. Each fulfillment order groups the items to ship from one location and carries its status (OPEN, IN_PROGRESS, ON_HOLD, SCHEDULED, CLOSED, CANCELLED), holds, supported actions and line items with remaining quantities (up to 50 per fulfillment order; line_items_truncated tells when there are more). Call this before create_fulfillment, hold_fulfillment_order or move_fulfillment_order: those take the fulfillment order id and the fulfillment order line item ids from here, not the order line item ids. Destination name, email and phone may be redacted on Basic-plan stores (see redacted_fields). Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_merchant_managed_fulfillment_orders access scope. Read-only. Each fulfillment order carries up to 50 line items; when line_items_truncated is true, read the rest with get_fulfillment_order and line_items_after. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |
| `query` | string | no |  | Search Query. Optional Shopify search syntax on the fulfillment orders, for example "status:open". Leave empty to list all. |
| `first` | number | no | `4` | Page Size. How many records to return, 1 to 4. Defaults to 4. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `order_id`: Order ID
- `items`: Fulfillment Orders
- `items[].id`: Fulfillment Order ID
- `items[].status`: Status
- `items[].request_status`: Request Status
- `items[].order_id`: Order ID
- `items[].order_name`: Order Name
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].fulfill_at`: Fulfill At (datetime)
- `items[].fulfill_by`: Fulfill By (datetime)
- `items[].assigned_location_id`: Assigned Location ID
- `items[].assigned_location_name`: Assigned Location Name
- `items[].destination_first_name`: Destination First Name
- `items[].destination_last_name`: Destination Last Name
- `items[].destination_company`: Destination Company
- `items[].destination_address1`: Destination Address 1
- `items[].destination_address2`: Destination Address 2
- `items[].destination_city`: Destination City
- `items[].destination_province`: Destination Province
- `items[].destination_zip`: Destination Zip
- `items[].destination_country_code`: Destination Country Code
- `items[].destination_phone`: Destination Phone
- `items[].destination_email`: Destination Email (email)
- `items[].delivery_method_type`: Delivery Method Type
- `items[].delivery_method_name`: Delivery Method Name
- `items[].holds`: Holds
- `items[].holds[].id`: Hold ID
- `items[].holds[].reason`: Reason
- `items[].holds[].reason_notes`: Reason Notes
- `items[].holds[].display_reason`: Display Reason
- `items[].holds[].handle`: Handle
- `items[].holds[].held_by_requesting_app`: Held By This App (boolean)
- `items[].supported_actions`: Supported Actions
- `items[].line_items`: Line Items
- `items[].line_items[].id`: Fulfillment Order Line Item ID
- `items[].line_items[].sku`: SKU
- `items[].line_items[].product_title`: Product Title
- `items[].line_items[].variant_title`: Variant Title
- `items[].line_items[].total_quantity`: Total Quantity (number)
- `items[].line_items[].remaining_quantity`: Remaining Quantity (number)
- `items[].line_items[].requires_shipping`: Requires Shipping (boolean)
- `items[].line_items[].line_item_id`: Order Line Item ID
- `items[].line_items[].variant_id`: Variant ID
- `items[].line_items[].inventory_item_id`: Inventory Item ID
- `items[].line_items_truncated`: Line Items Truncated (boolean)
- `items[].line_items_end_cursor`: Line Items Cursor
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_order_fulfillments`

**List Order Fulfillments.** Lists the fulfillments (shipments already recorded) of one order, up to 50, with status, shipment status, tracking company, numbers and URLs, location and dates. Returns the list in one call (no paging): total_count is Shopify's count of fulfillments on the order, and truncated=true means total_count is larger than the number returned, so only the first 50 are listed. Use get_fulfillment_details for the shipped line items of one fulfillment. Needs the read_orders access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |

Output fields:

- `order_id`: Order ID
- `items`: Fulfillments
- `items[].id`: Fulfillment ID
- `items[].legacy_resource_id`: Legacy Resource ID
- `items[].name`: Name
- `items[].status`: Status
- `items[].display_status`: Display Status
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].in_transit_at`: In Transit At (datetime)
- `items[].delivered_at`: Delivered At (datetime)
- `items[].estimated_delivery_at`: Estimated Delivery At (datetime)
- `items[].total_quantity`: Total Quantity (number)
- `items[].requires_shipping`: Requires Shipping (boolean)
- `items[].tracking_company`: Tracking Company
- `items[].tracking_numbers`: Tracking Numbers
- `items[].tracking_urls`: Tracking URLs
- `items[].location_id`: Location ID
- `items[].location_name`: Location Name
- `items[].service_id`: Fulfillment Service ID
- `items[].service_name`: Fulfillment Service Name
- `items[].order_id`: Order ID
- `items[].order_name`: Order Name
- `count`: Count (number)
- `total_count`: Total Count (number)
- `truncated`: Truncated (boolean)
- `redacted_fields`: Redacted Fields

### `list_order_refunds`

**List Order Refunds.** Lists the refunds of one order (up to 50) with the refunded amount, note and dates. Returns the list in one call (no paging); truncated=true means the order may have more than 50 refunds; use get_refund for the refunded line items and transactions of one refund. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |

Output fields:

- `order_id`: Order ID
- `items`: Refunds
- `items[].id`: Refund ID
- `items[].legacy_resource_id`: Numeric ID
- `items[].note`: Note
- `items[].created_at`: Created At (datetime)
- `items[].processed_at`: Processed At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].total_refunded`: Total Refunded (number)
- `items[].currency_code`: Currency Code
- `count`: Count (number)
- `truncated`: Truncated (boolean)
- `redacted_fields`: Redacted Fields

### `list_order_transactions`

**List Order Transactions.** Lists all payment transactions of one order (authorizations, captures, sales, refunds, voids) with amount, status, gateway and parent transaction. Use it to find the authorization id for capture_order_payment or void_order_transaction, or the parent id and gateway for create_refund. Returns up to 100 transactions in one call (no paging); truncated=true means the order may have more. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |

Output fields:

- `order_id`: Order ID
- `items`: Transactions
- `items[].id`: Transaction ID
- `items[].kind`: Kind
- `items[].status`: Status
- `items[].gateway`: Gateway
- `items[].formatted_gateway`: Formatted Gateway
- `items[].test`: Test (boolean)
- `items[].amount`: Amount (number)
- `items[].currency_code`: Currency Code
- `items[].total_unsettled`: Total Unsettled (number)
- `items[].maximum_refundable`: Maximum Refundable (number)
- `items[].manually_capturable`: Manually Capturable (boolean)
- `items[].multi_capturable`: Multi Capturable (boolean)
- `items[].authorization_expires_at`: Authorization Expires At (datetime)
- `items[].error_code`: Error Code
- `items[].payment_id`: Payment ID
- `items[].parent_transaction_id`: Parent Transaction ID
- `items[].order_id`: Order ID
- `items[].order_name`: Order Name
- `items[].created_at`: Created At (datetime)
- `items[].processed_at`: Processed At (datetime)
- `count`: Count (number)
- `truncated`: Truncated (boolean)
- `redacted_fields`: Redacted Fields

### `list_pages`

**List Online Store Pages.** Lists the online store's content pages (such as About us, FAQ or Shipping policy pages) with title, handle, a plain-text body summary, publish state and template suffix; use get_page for the full body. Filter with Shopify search syntax such as "title:FAQ", "handle:about-us" or "published_status:published". Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_content access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify page search syntax, for example "title:FAQ" or "published_status:unpublished". Leave empty to list all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the id. One of `"ID"`, `"TITLE"`, `"PUBLISHED_AT"`, `"UPDATED_AT"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Pages
- `items[].id`: Page ID
- `items[].title`: Title
- `items[].handle`: Handle
- `items[].body_summary`: Body Summary
- `items[].is_published`: Is Published (boolean)
- `items[].published_at`: Published At (datetime)
- `items[].template_suffix`: Template Suffix
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_payment_disputes`

**List Payment Disputes.** Lists Shopify Payments disputes: chargebacks and inquiries that buyers filed with their card issuer, each with status (for example NEEDS_RESPONSE, UNDER_REVIEW, WON, LOST), type, reason, amount and currency, the evidence due date, when evidence was sent, and the order. Plan requirement: only stores that use Shopify Payments have disputes; on other stores, and on development stores using a test gateway, the list is empty. Filter with Shopify search syntax such as "status:needs_response" or "initiated_at:>2026-09-01". Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_shopify_payments_disputes access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify dispute search syntax, for example "status:needs_response" or "initiated_at:>2026-09-01". Leave empty to list all. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 200. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Disputes
- `items[].id`: Dispute ID
- `items[].legacy_resource_id`: Numeric ID
- `items[].status`: Status
- `items[].type`: Type
- `items[].reason`: Reason
- `items[].network_reason_code`: Network Reason Code
- `items[].amount`: Amount (number)
- `items[].currency_code`: Currency
- `items[].initiated_at`: Initiated At (datetime)
- `items[].evidence_due_by`: Evidence Due By (datetime)
- `items[].evidence_sent_on`: Evidence Sent On (datetime)
- `items[].finalized_on`: Finalized On (datetime)
- `items[].order_id`: Order ID
- `items[].order_name`: Order Name
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_payment_terms_templates`

**List Payment Terms Templates.** Lists the payment terms templates Shopify offers for orders and draft orders that are paid later: due on receipt, due on fulfillment, net terms (for example Net 30 with due_in_days 30) and a fixed date. Each has an id, name, translated name, description, due_in_days and type. Optionally only one type. Returns the full list in one call (no paging). Needs the read_payment_terms access scope (not stated on the query page; to be confirmed). Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_terms_type` | string | no |  | Terms Type. Only templates of this type. Leave empty for all. One of `"RECEIPT"`, `"NET"`, `"FIXED"`, `"FULFILLMENT"`. |

Output fields:

- `items`: Payment Terms Templates
- `items[].id`: Template ID
- `items[].name`: Name
- `items[].translated_name`: Translated Name
- `items[].description`: Description
- `items[].due_in_days`: Due In Days (number)
- `items[].payment_terms_type`: Payment Terms Type
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `list_product_media`

**List Product Media.** Lists the media of one product in display order: id, type, processing status, alt text and URL. The ids are needed by update_product_media, delete_product_media, reorder_product_media and attach_variant_media. Paged: pass end_cursor back as the cursor while has_next_page is true. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id, numeric or "gid://shopify/Product/…". Find it with search_products. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 50. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Media
- `items[].id`: Media ID
- `items[].alt`: Alt Text
- `items[].media_content_type`: Media Type
- `items[].status`: Status
- `items[].image_url`: Image URL (image)
- `items[].width`: Width (number)
- `items[].height`: Height (number)
- `items[].mime_type`: MIME Type
- `items[].preview_url`: Preview Image (image)
- `items[].external_url`: External URL (url)
- `items[].filename`: Filename
- `items[].errors`: Errors
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_product_variants`

**List Product Variants.** Lists the variants of one product with price, SKU, stock, option values and inventory item id. Paged: pass end_cursor back as the cursor while has_next_page is true. Use get_product_variant_details for a single variant. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id, numeric or "gid://shopify/Product/…". Find it with search_products. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to position. One of `"POSITION"`, `"TITLE"`, `"SKU"`, `"INVENTORY_QUANTITY"`, `"ID"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 130. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Variants
- `items[].id`: Variant ID
- `items[].legacy_resource_id`: Numeric ID
- `items[].title`: Title
- `items[].display_name`: Display Name
- `items[].sku`: SKU
- `items[].barcode`: Barcode
- `items[].barcodes`: Barcodes
- `items[].barcodes[].value`: Barcode
- `items[].barcodes[].type`: Type
- `items[].price`: Price (number)
- `items[].compare_at_price`: Compare-at Price (number)
- `items[].position`: Position (number)
- `items[].inventory_quantity`: Inventory Quantity (number)
- `items[].inventory_policy`: Inventory Policy
- `items[].available_for_sale`: Available for Sale (boolean)
- `items[].taxable`: Taxable (boolean)
- `items[].selected_options`: Selected Options
- `items[].selected_options[].name`: Option
- `items[].selected_options[].value`: Value
- `items[].inventory_item_id`: Inventory Item ID
- `items[].inventory_tracked`: Inventory Tracked (boolean)
- `items[].requires_shipping`: Requires Shipping (boolean)
- `items[].product_id`: Product ID
- `items[].product_title`: Product Title
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_publications`

**List Publications.** Lists the store's publications, the targets that publish_resource and unpublish_resource take (for example the Online Store, Point of Sale or a market catalog), with their title and whether new products are published automatically. Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_publications access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `catalog_type` | string | no |  | Catalog Type. Only list publications of this catalog type. Leave empty for all. One of `"APP"`, `"MARKET"`, `"COMPANY_LOCATION"`, `"NONE"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Publications
- `items[].id`: Publication ID
- `items[].title`: Title
- `items[].catalog_id`: Catalog ID
- `items[].catalog_status`: Catalog Status
- `items[].auto_publish`: Auto Publish (boolean)
- `items[].supports_future_publishing`: Supports Future Publishing (boolean)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_sales_channels`

**List Sales Channels.** Lists the sales channels of the store (for example Online Store, Point of Sale, Shop), built from the store's app publications: each item has the channel name and handle (from the channel app) and its publication_id. Put publication_id in publication_ids of publish_resource or unpublish_resource to show or hide products and collections on that channel. Markets and B2B catalogs are not channels and are listed by list_publications. Paged: pass end_cursor back as the cursor while has_next_page is true. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Sales Channels
- `items[].name`: Name
- `items[].handle`: Handle
- `items[].app_id`: App ID
- `items[].publication_id`: Publication ID
- `items[].catalog_id`: Catalog ID
- `items[].catalog_status`: Catalog Status
- `items[].auto_publish`: Auto Publish (boolean)
- `items[].supports_future_publishing`: Supports Scheduled Publishing (boolean)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_saved_searches`

**List Saved Searches.** Lists the saved searches of one admin resource list: the named filter views staff saved in the Shopify admin (for example "Unfulfilled orders over $100" on the orders list). Each item has id (what delete_saved_search takes), name, query (the full filter string), search_terms and resource_type. resource_type is required and picks the list: ORDER, DRAFT_ORDER, PRODUCT, COLLECTION, FILE, URL_REDIRECT, CODE_DISCOUNT, AUTOMATIC_DISCOUNT or DISCOUNT_REDEEM_CODE. Customer saved searches are not listed because Shopify replaced them with customer segments. Needs the read scope of that resource: read_orders, read_draft_orders, read_products (products and collections), read_files or read_themes (files), read_online_store_navigation (URL redirects) or read_discounts (redeem codes); for code and automatic discounts read_discounts is expected (not stated on the query pages; to be confirmed). Paged: pass end_cursor back as the cursor while has_next_page is true. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes |  | Resource Type. Which admin list the saved searches belong to. One of `"ORDER"`, `"DRAFT_ORDER"`, `"PRODUCT"`, `"COLLECTION"`, `"FILE"`, `"URL_REDIRECT"`, `"CODE_DISCOUNT"`, `"AUTOMATIC_DISCOUNT"`, `"DISCOUNT_REDEEM_CODE"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Saved Searches
- `items[].id`: Saved Search ID
- `items[].name`: Name
- `items[].query`: Query
- `items[].search_terms`: Search Terms
- `items[].resource_type`: Resource Type
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_script_tags`

**List Script Tags.** Lists script tags: remote JavaScript files that the storefront loads on every page of a vintage (non-Online Store 2.0) theme, each with its src URL, display scope and cache flag. Script tags are a legacy surface; themes built on Online Store 2.0 ignore them. Filter by exact script URL with src, or with Shopify search syntax such as "src:https://cdn.example.com/widget.js" or "created_at:>2026-01-01". Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_script_tags access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `src` | string | no |  | Script URL. Only return script tags with exactly this src URL, for example "https://cdn.example.com/widget.js". |
| `query` | string | no |  | Search Query. Shopify script tag search syntax, for example "created_at:>2026-01-01" or "id:>=1000". Leave empty to list all. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Script Tags
- `items[].id`: Script Tag ID
- `items[].legacy_resource_id`: Legacy Resource ID
- `items[].src`: Script URL (url)
- `items[].display_scope`: Display Scope
- `items[].cache`: Cached (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_shop_pay_payment_request_receipts`

**List Shop Pay Payment Receipts.** Lists Shop Pay payment request receipts: one per Shop Pay payment request a buyer completed, with its token, your source identifier, creation time, processing state (READY, PROCESSING, COMPLETED, FAILED, ACTION_REQUIRED) with any error, the resulting order and the request totals in the presentment currency. Plan requirement: only stores that take payments through Shopify Payments with Shop Pay payment requests (API 2026-01 and later) have receipts; elsewhere the list is empty. Filter with Shopify search syntax such as "state:COMPLETED", "source_identifier:1282823" or "created_at:>2026-09-01". Paged: pass end_cursor back as the cursor while has_next_page is true. The required access scope is not documented. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify receipt search syntax, for example "state:COMPLETED" or "created_at:>2026-09-01". Leave empty to list all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the id. One of `"ID"`, `"CREATED_AT"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 110. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Receipts
- `items[].token`: Receipt Token
- `items[].source_identifier`: Source Identifier
- `items[].created_at`: Created At (datetime)
- `items[].processing_state`: Processing State
- `items[].processing_message`: Processing Message
- `items[].processing_error_code`: Processing Error Code
- `items[].order_id`: Order ID
- `items[].order_name`: Order Name
- `items[].presentment_currency`: Currency
- `items[].total`: Total (number)
- `items[].subtotal`: Subtotal (number)
- `items[].total_tax`: Total Tax (number)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_shop_policies`

**List Store Policies.** Lists the store's legal policies (refund, shipping, privacy, terms of service, terms of sale, legal notice, subscription, contact information) with their type, title, public URL and full HTML body. Policies the merchant never filled in may be missing from the list. Returns the full list in one call (no paging). Needs the read_legal_policies access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Policies
- `items[].id`: Policy ID
- `items[].type`: Type
- `items[].title`: Title
- `items[].url`: URL (url)
- `items[].body`: Body (html)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `list_standard_metafield_definition_templates`

**List Standard Metafield Templates.** Lists Shopify's ready-made standard metafield definitions (for example product subtitle, care guide or ingredients) with namespace, key, name, type, the owner types they apply to and their validations. exclude_activated Yes hides templates the store already uses. Paged: pass end_cursor back as the cursor while has_next_page is true. No access scope needed. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `exclude_activated` | string | no |  | Exclude Activated. Yes hides templates the store has already enabled. Leave empty to include them. One of `"true"`, `"false"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 60. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Templates
- `items[].id`: Template ID
- `items[].namespace`: Namespace
- `items[].key`: Key
- `items[].name`: Name
- `items[].description`: Description
- `items[].owner_types`: Owner Types
- `items[].type`: Type
- `items[].visible_to_storefront_api`: Visible To Storefront API (boolean)
- `items[].validations`: Validations
- `items[].validations[].name`: Name
- `items[].validations[].type`: Type
- `items[].validations[].value`: Value
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_tender_transactions`

**List Tender Transactions.** Lists tender transactions: the money actually received or refunded across the whole store, with amount, payment method, processed date and order. Use it for payout reconciliation or daily takings; use list_order_transactions for one order. Supports search syntax such as "processed_at:>=2026-09-01". Paged: pass end_cursor back as the cursor while has_next_page is true. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify search syntax, for example "processed_at:>=2026-09-01" or "test:false". Leave empty for all. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 200. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Tender Transactions
- `items[].id`: Tender Transaction ID
- `items[].amount`: Amount (number)
- `items[].currency_code`: Currency Code
- `items[].payment_method`: Payment Method
- `items[].credit_card_company`: Credit Card Company
- `items[].processed_at`: Processed At (datetime)
- `items[].remote_reference`: Remote Reference
- `items[].test`: Test (boolean)
- `items[].order_id`: Order ID
- `items[].order_name`: Order Name
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_theme_files`

**List Theme Files.** Lists the files of one theme without their content: path (filename), content_type, size, checksum_md5 and dates. Use it to find the path to pass to get_theme_file, upsert_theme_files or delete_theme_files. Optional filenames narrows the list to up to 50 paths or patterns, where * matches any characters (for example "templates/*.json" or "sections/*"). Paged: pass end_cursor back as the cursor while has_next_page is true; Shopify may return fewer files than the page size to stay within its payload limit, so rely on has_next_page rather than the count. Any per-path problem Shopify reports (for example NOT_FOUND) comes back in file_errors with the filename and code. Needs the read_themes access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `theme_id` | string | yes |  | Theme ID. The theme id, numeric or "gid://shopify/OnlineStoreTheme/…". Find it with list_themes (role MAIN is the live theme). |
| `filenames` | array | no |  | File Paths or Patterns. Only list these paths, up to 50; * matches any characters, for example ["templates/*.json", "layout/theme.liquid"]. Leave empty for every file. |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `theme_id`: Theme ID
- `theme_name`: Theme Name
- `theme_role`: Theme Role
- `items`: Files
- `items[].filename`: Filename
- `items[].content_type`: Content Type
- `items[].size`: Size (filesize)
- `items[].checksum_md5`: Checksum MD5
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields
- `file_errors`: File Errors
- `file_errors[].filename`: Filename
- `file_errors[].code`: Code

### `list_themes`

**List Themes.** Lists the online store's themes with name, role and processing state. The theme with role MAIN is the live theme shoppers see; UNPUBLISHED and DEVELOPMENT themes are drafts. Filter by roles and/or exact names. Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_themes access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roles` | array | no |  | Roles. Only return themes with these roles, for example MAIN for the live theme. Leave empty for all. One of `"MAIN"`, `"UNPUBLISHED"`, `"DEVELOPMENT"`, `"DEMO"`, `"ARCHIVED"`, `"LOCKED"`. |
| `names` | array | no |  | Names. Only return themes with these exact names, for example ["Dawn"]. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Themes
- `items[].id`: Theme ID
- `items[].name`: Name
- `items[].role`: Role
- `items[].prefix`: Preview Prefix
- `items[].processing`: Processing (boolean)
- `items[].processing_failed`: Processing Failed (boolean)
- `items[].theme_store_id`: Theme Store ID (number)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_url_redirects`

**List URL Redirects.** Lists the online store's URL redirects, each with its old path and target. Filter with Shopify search syntax such as "path:/old-page" or "target:/collections/sale". Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_online_store_navigation access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify redirect search syntax, for example "path:/old-page" or "target:/pages/new". Leave empty to list all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the id. One of `"ID"`, `"PATH"`, `"RELEVANCE"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: URL Redirects
- `items[].id`: URL Redirect ID
- `items[].path`: Path
- `items[].target`: Target
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `list_web_presences`

**List Markets Web Presences.** Lists the store's Markets web presences: the domains or subfolders (for example example.com/fr-ca) through which markets' shoppers reach the storefront. Each item has id (what delete_web_presence takes), kind ("domain" or "subfolder"), subfolder_suffix (for example "fr-ca", empty for a domain presence), domain_id / domain_host / domain_url (empty for a subfolder presence, which has no domain of its own), default_locale and root_urls (the storefront URL per language). A store that does not use Markets with extra domains or subfolders may return only its primary domain presence or nothing. Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_markets access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 60. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Web Presences
- `items[].id`: Web Presence ID
- `items[].kind`: Kind
- `items[].subfolder_suffix`: Subfolder Suffix
- `items[].domain_id`: Domain ID
- `items[].domain_host`: Domain Host
- `items[].domain_url`: Domain URL (url)
- `items[].default_locale`: Default Locale
- `items[].root_urls`: Root URLs
- `items[].root_urls[].locale`: Locale
- `items[].root_urls[].url`: URL (url)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `mark_comment_not_spam`

**Mark Blog Comment as Not Spam.** Marks one blog comment as not spam, undoing mark_comment_spam, and returns the comment with its new status (it may still need approve_comment to be published, depending on the blog's comment policy). Repeating leaves the same state, so it is safe. Author details may be null without protected customer data access. Needs the write_content access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. The comment id, numeric or "gid://shopify/Comment/…". Find it with list_comments ("status:spam"). |

Output fields:

- `id`: Comment ID
- `status`: Status
- `body`: Body
- `body_html`: Body HTML (html)
- `is_published`: Is Published (boolean)
- `published_at`: Published At (datetime)
- `author_name`: Author Name
- `author_email`: Author Email (email)
- `ip`: IP Address
- `user_agent`: User Agent
- `article_id`: Article ID
- `article_title`: Article Title
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `mark_comment_spam`

**Mark Blog Comment as Spam.** Marks one blog comment as spam, which hides it from the article, and returns the comment with its new status. Reversible with mark_comment_not_spam. Marking a comment that is already spam leaves it as spam, so repeating is safe. Author details may be null without protected customer data access. Needs the write_content access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. The comment id, numeric or "gid://shopify/Comment/…". Find it with list_comments. |

Output fields:

- `id`: Comment ID
- `status`: Status
- `body`: Body
- `body_html`: Body HTML (html)
- `is_published`: Is Published (boolean)
- `published_at`: Published At (datetime)
- `author_name`: Author Name
- `author_email`: Author Email (email)
- `ip`: IP Address
- `user_agent`: User Agent
- `article_id`: Article ID
- `article_title`: Article Title
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `mark_order_as_paid`

**Mark Order as Paid.** Changes payment state: records a manual payment for the full outstanding balance of an order (for example cash, bank transfer or cheque received offline). No card is charged. Only works when the order can be marked as paid (see can_mark_as_paid on get_order); use capture_order_payment for card authorizations. Each call adds a payment record, so do not repeat it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |

Output fields:

- `id`: Order ID
- `legacy_resource_id`: Numeric ID
- `name`: Order Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `processed_at`: Processed At (datetime)
- `closed`: Closed (boolean)
- `closed_at`: Closed At (datetime)
- `cancelled_at`: Cancelled At (datetime)
- `cancel_reason`: Cancel Reason
- `financial_status`: Financial Status
- `fulfillment_status`: Fulfillment Status
- `test`: Test (boolean)
- `email`: Email (email)
- `phone`: Phone
- `note`: Note
- `tags`: Tags
- `po_number`: PO Number
- `source_name`: Source Name
- `currency_code`: Currency Code
- `subtotal_price`: Subtotal Price (number)
- `total_price`: Total Price (number)
- `total_tax`: Total Tax (number)
- `total_discounts`: Total Discounts (number)
- `total_shipping`: Total Shipping (number)
- `total_refunded`: Total Refunded (number)
- `total_outstanding`: Total Outstanding (number)
- `current_total_price`: Current Total Price (number)
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `customer_email`: Customer Email (email)
- `number`: Order Number (number)
- `confirmed`: Confirmed (boolean)
- `capturable`: Capturable (boolean)
- `refundable`: Refundable (boolean)
- `fully_paid`: Fully Paid (boolean)
- `unpaid`: Unpaid (boolean)
- `can_mark_as_paid`: Can Mark As Paid (boolean)
- `fulfillments_count`: Fulfillments Count (number)
- `transactions_count`: Transactions Count (number)
- `discount_codes`: Discount Codes
- `payment_gateway_names`: Payment Gateway Names
- `shipping_line_title`: Shipping Line Title
- `shipping_line_price`: Shipping Line Price (number)
- `shipping_name`: Shipping Name
- `shipping_company`: Shipping Company
- `shipping_address1`: Shipping Address 1
- `shipping_address2`: Shipping Address 2
- `shipping_city`: Shipping City
- `shipping_province_code`: Shipping Province Code
- `shipping_country_code`: Shipping Country Code
- `shipping_zip`: Shipping ZIP
- `shipping_phone`: Shipping Phone
- `billing_name`: Billing Name
- `billing_company`: Billing Company
- `billing_address1`: Billing Address 1
- `billing_address2`: Billing Address 2
- `billing_city`: Billing City
- `billing_province_code`: Billing Province Code
- `billing_country_code`: Billing Country Code
- `billing_zip`: Billing ZIP
- `billing_phone`: Billing Phone
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].title`: Title
- `line_items[].sku`: SKU
- `line_items[].variant_title`: Variant Title
- `line_items[].vendor`: Vendor
- `line_items[].quantity`: Quantity (number)
- `line_items[].current_quantity`: Current Quantity (number)
- `line_items[].refundable_quantity`: Refundable Quantity (number)
- `line_items[].unfulfilled_quantity`: Unfulfilled Quantity (number)
- `line_items[].requires_shipping`: Requires Shipping (boolean)
- `line_items[].taxable`: Taxable (boolean)
- `line_items[].original_unit_price`: Original Unit Price (number)
- `line_items[].discounted_total`: Discounted Total (number)
- `line_items[].variant_id`: Variant ID
- `line_items[].product_id`: Product ID
- `line_items_has_more`: Line Items Has More (boolean)
- `redacted_fields`: Redacted Fields

### `move_fulfillment_order`

**Move Fulfillment Order.** Moves one fulfillment order, or some of its items, to another location that will ship them. Check first with list_fulfillment_order_move_locations which locations are movable. Leave line_items empty to move everything; with line_items only those quantities move and Shopify splits the fulfillment order. Returns moved_fulfillment_order (now at the new location), original_fulfillment_order and remaining_fulfillment_order (what stayed behind, if any). Each call moves again, so do not repeat it after a success. Needs the write_merchant_managed_fulfillment_orders access scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fulfillment_order_id` | string | yes |  | Fulfillment Order ID. The fulfillment order to move, numeric or "gid://shopify/FulfillmentOrder/…". Find it with list_order_fulfillment_orders. |
| `new_location_id` | string | yes |  | New Location ID. The location that should ship the items, numeric or "gid://shopify/Location/…". Find a movable one with list_fulfillment_order_move_locations. |
| `line_items` | array | no |  | Line Items. Optional partial move: the fulfillment order line items and quantities to move. Leave empty to move the whole fulfillment order. Each item: { `fulfillment_order_line_item_id`, `quantity` }. |

Output fields:

- `moved_fulfillment_order`: Moved Fulfillment Order
- `moved_fulfillment_order.id`: Fulfillment Order ID
- `moved_fulfillment_order.status`: Status
- `moved_fulfillment_order.request_status`: Request Status
- `moved_fulfillment_order.order_id`: Order ID
- `moved_fulfillment_order.order_name`: Order Name
- `moved_fulfillment_order.created_at`: Created At (datetime)
- `moved_fulfillment_order.updated_at`: Updated At (datetime)
- `moved_fulfillment_order.fulfill_at`: Fulfill At (datetime)
- `moved_fulfillment_order.fulfill_by`: Fulfill By (datetime)
- `moved_fulfillment_order.assigned_location_id`: Assigned Location ID
- `moved_fulfillment_order.assigned_location_name`: Assigned Location Name
- `moved_fulfillment_order.destination_first_name`: Destination First Name
- `moved_fulfillment_order.destination_last_name`: Destination Last Name
- `moved_fulfillment_order.destination_company`: Destination Company
- `moved_fulfillment_order.destination_address1`: Destination Address 1
- `moved_fulfillment_order.destination_address2`: Destination Address 2
- `moved_fulfillment_order.destination_city`: Destination City
- `moved_fulfillment_order.destination_province`: Destination Province
- `moved_fulfillment_order.destination_zip`: Destination Zip
- `moved_fulfillment_order.destination_country_code`: Destination Country Code
- `moved_fulfillment_order.destination_phone`: Destination Phone
- `moved_fulfillment_order.destination_email`: Destination Email (email)
- `moved_fulfillment_order.delivery_method_type`: Delivery Method Type
- `moved_fulfillment_order.delivery_method_name`: Delivery Method Name
- `moved_fulfillment_order.holds`: Holds
- `moved_fulfillment_order.holds[].id`: Hold ID
- `moved_fulfillment_order.holds[].reason`: Reason
- `moved_fulfillment_order.holds[].reason_notes`: Reason Notes
- `moved_fulfillment_order.holds[].display_reason`: Display Reason
- `moved_fulfillment_order.holds[].handle`: Handle
- `moved_fulfillment_order.holds[].held_by_requesting_app`: Held By This App (boolean)
- `moved_fulfillment_order.supported_actions`: Supported Actions
- `moved_fulfillment_order.line_items`: Line Items
- `moved_fulfillment_order.line_items[].id`: Fulfillment Order Line Item ID
- `moved_fulfillment_order.line_items[].sku`: SKU
- `moved_fulfillment_order.line_items[].product_title`: Product Title
- `moved_fulfillment_order.line_items[].variant_title`: Variant Title
- `moved_fulfillment_order.line_items[].total_quantity`: Total Quantity (number)
- `moved_fulfillment_order.line_items[].remaining_quantity`: Remaining Quantity (number)
- `moved_fulfillment_order.line_items[].requires_shipping`: Requires Shipping (boolean)
- `moved_fulfillment_order.line_items[].line_item_id`: Order Line Item ID
- `moved_fulfillment_order.line_items[].variant_id`: Variant ID
- `moved_fulfillment_order.line_items[].inventory_item_id`: Inventory Item ID
- `moved_fulfillment_order.line_items_truncated`: Line Items Truncated (boolean)
- `moved_fulfillment_order.line_items_end_cursor`: Line Items Cursor
- `original_fulfillment_order`: Original Fulfillment Order
- `original_fulfillment_order.id`: Fulfillment Order ID
- `original_fulfillment_order.status`: Status
- `original_fulfillment_order.request_status`: Request Status
- `original_fulfillment_order.order_id`: Order ID
- `original_fulfillment_order.order_name`: Order Name
- `original_fulfillment_order.created_at`: Created At (datetime)
- `original_fulfillment_order.updated_at`: Updated At (datetime)
- `original_fulfillment_order.fulfill_at`: Fulfill At (datetime)
- `original_fulfillment_order.fulfill_by`: Fulfill By (datetime)
- `original_fulfillment_order.assigned_location_id`: Assigned Location ID
- `original_fulfillment_order.assigned_location_name`: Assigned Location Name
- `original_fulfillment_order.destination_first_name`: Destination First Name
- `original_fulfillment_order.destination_last_name`: Destination Last Name
- `original_fulfillment_order.destination_company`: Destination Company
- `original_fulfillment_order.destination_address1`: Destination Address 1
- `original_fulfillment_order.destination_address2`: Destination Address 2
- `original_fulfillment_order.destination_city`: Destination City
- `original_fulfillment_order.destination_province`: Destination Province
- `original_fulfillment_order.destination_zip`: Destination Zip
- `original_fulfillment_order.destination_country_code`: Destination Country Code
- `original_fulfillment_order.destination_phone`: Destination Phone
- `original_fulfillment_order.destination_email`: Destination Email (email)
- `original_fulfillment_order.delivery_method_type`: Delivery Method Type
- `original_fulfillment_order.delivery_method_name`: Delivery Method Name
- `original_fulfillment_order.holds`: Holds
- `original_fulfillment_order.holds[].id`: Hold ID
- `original_fulfillment_order.holds[].reason`: Reason
- `original_fulfillment_order.holds[].reason_notes`: Reason Notes
- `original_fulfillment_order.holds[].display_reason`: Display Reason
- `original_fulfillment_order.holds[].handle`: Handle
- `original_fulfillment_order.holds[].held_by_requesting_app`: Held By This App (boolean)
- `original_fulfillment_order.supported_actions`: Supported Actions
- `original_fulfillment_order.line_items`: Line Items
- `original_fulfillment_order.line_items[].id`: Fulfillment Order Line Item ID
- `original_fulfillment_order.line_items[].sku`: SKU
- `original_fulfillment_order.line_items[].product_title`: Product Title
- `original_fulfillment_order.line_items[].variant_title`: Variant Title
- `original_fulfillment_order.line_items[].total_quantity`: Total Quantity (number)
- `original_fulfillment_order.line_items[].remaining_quantity`: Remaining Quantity (number)
- `original_fulfillment_order.line_items[].requires_shipping`: Requires Shipping (boolean)
- `original_fulfillment_order.line_items[].line_item_id`: Order Line Item ID
- `original_fulfillment_order.line_items[].variant_id`: Variant ID
- `original_fulfillment_order.line_items[].inventory_item_id`: Inventory Item ID
- `original_fulfillment_order.line_items_truncated`: Line Items Truncated (boolean)
- `original_fulfillment_order.line_items_end_cursor`: Line Items Cursor
- `remaining_fulfillment_order`: Remaining Fulfillment Order
- `remaining_fulfillment_order.id`: Fulfillment Order ID
- `remaining_fulfillment_order.status`: Status
- `remaining_fulfillment_order.request_status`: Request Status
- `remaining_fulfillment_order.order_id`: Order ID
- `remaining_fulfillment_order.order_name`: Order Name
- `remaining_fulfillment_order.created_at`: Created At (datetime)
- `remaining_fulfillment_order.updated_at`: Updated At (datetime)
- `remaining_fulfillment_order.fulfill_at`: Fulfill At (datetime)
- `remaining_fulfillment_order.fulfill_by`: Fulfill By (datetime)
- `remaining_fulfillment_order.assigned_location_id`: Assigned Location ID
- `remaining_fulfillment_order.assigned_location_name`: Assigned Location Name
- `remaining_fulfillment_order.destination_first_name`: Destination First Name
- `remaining_fulfillment_order.destination_last_name`: Destination Last Name
- `remaining_fulfillment_order.destination_company`: Destination Company
- `remaining_fulfillment_order.destination_address1`: Destination Address 1
- `remaining_fulfillment_order.destination_address2`: Destination Address 2
- `remaining_fulfillment_order.destination_city`: Destination City
- `remaining_fulfillment_order.destination_province`: Destination Province
- `remaining_fulfillment_order.destination_zip`: Destination Zip
- `remaining_fulfillment_order.destination_country_code`: Destination Country Code
- `remaining_fulfillment_order.destination_phone`: Destination Phone
- `remaining_fulfillment_order.destination_email`: Destination Email (email)
- `remaining_fulfillment_order.delivery_method_type`: Delivery Method Type
- `remaining_fulfillment_order.delivery_method_name`: Delivery Method Name
- `remaining_fulfillment_order.holds`: Holds
- `remaining_fulfillment_order.holds[].id`: Hold ID
- `remaining_fulfillment_order.holds[].reason`: Reason
- `remaining_fulfillment_order.holds[].reason_notes`: Reason Notes
- `remaining_fulfillment_order.holds[].display_reason`: Display Reason
- `remaining_fulfillment_order.holds[].handle`: Handle
- `remaining_fulfillment_order.holds[].held_by_requesting_app`: Held By This App (boolean)
- `remaining_fulfillment_order.supported_actions`: Supported Actions
- `remaining_fulfillment_order.line_items`: Line Items
- `remaining_fulfillment_order.line_items[].id`: Fulfillment Order Line Item ID
- `remaining_fulfillment_order.line_items[].sku`: SKU
- `remaining_fulfillment_order.line_items[].product_title`: Product Title
- `remaining_fulfillment_order.line_items[].variant_title`: Variant Title
- `remaining_fulfillment_order.line_items[].total_quantity`: Total Quantity (number)
- `remaining_fulfillment_order.line_items[].remaining_quantity`: Remaining Quantity (number)
- `remaining_fulfillment_order.line_items[].requires_shipping`: Requires Shipping (boolean)
- `remaining_fulfillment_order.line_items[].line_item_id`: Order Line Item ID
- `remaining_fulfillment_order.line_items[].variant_id`: Variant ID
- `remaining_fulfillment_order.line_items[].inventory_item_id`: Inventory Item ID
- `remaining_fulfillment_order.line_items_truncated`: Line Items Truncated (boolean)
- `remaining_fulfillment_order.line_items_end_cursor`: Line Items Cursor
- `redacted_fields`: Redacted Fields

### `pin_metafield_definition`

**Pin Metafield Definition.** Pins one metafield definition, identified by owner type, namespace and key, so its field appears on that resource's page in the Shopify admin (for example on every product page); returns the definition with its pinned_position. If the definition is already pinned, Shopify refuses the pin with ALREADY_PINNED; this action then reads the definition and returns it unchanged with already_pinned true, so repeating the call is safe and ends in the same state. Shopify limits how many definitions can be pinned per owner type and refuses beyond that (PINNED_LIMIT_REACHED). Needs the write access scope of the owner type (for example write_products). Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner_type` | string | yes |  | Owner Type. The resource type of the definition, for example PRODUCT. One of `"PRODUCT"`, `"PRODUCTVARIANT"`, `"COLLECTION"`, `"CUSTOMER"`, `"ORDER"`, `"DRAFTORDER"`, `"COMPANY"`, `"COMPANY_LOCATION"`, `"LOCATION"`, `"MARKET"`, `"PAGE"`, `"BLOG"`, `"ARTICLE"`, `"SHOP"`, `"DISCOUNT"`, `"SELLING_PLAN"`, `"GIFT_CARD_TRANSACTION"`. |
| `namespace` | string | yes |  | Namespace. The definition namespace, for example "custom". |
| `key` | string | yes |  | Key. The definition key, for example "care_instructions". |

Output fields:

- `id`: Definition ID
- `name`: Name
- `namespace`: Namespace
- `key`: Key
- `description`: Description
- `owner_type`: Owner Type
- `type`: Type
- `type_category`: Type Category
- `pinned_position`: Pinned Position (number)
- `validation_status`: Validation Status
- `validations`: Validations
- `validations[].name`: Name
- `validations[].type`: Type
- `validations[].value`: Value
- `metafields_count`: Metafields Count (number)
- `admin_access`: Admin Access
- `storefront_access`: Storefront Access
- `customer_account_access`: Customer Account Access
- `admin_filterable`: Admin Filterable (boolean)
- `smart_collection_condition`: Smart Collection Condition (boolean)
- `unique_values`: Unique Values (boolean)
- `already_pinned`: Already Pinned (boolean)
- `redacted_fields`: Redacted Fields

### `publish_resource`

**Publish Product or Collection.** Publishes one product or collection to the given publications (find them with list_publications), making it visible on those channels, optionally from a future date. A product is only visible to customers when its status is ACTIVE. Publishing to a publication it is already on leaves it published. Needs the write_publications access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes |  | Resource Type. Whether the id is a product or a collection. One of `"Product"`, `"Collection"`. |
| `resource_id` | string | yes |  | Resource ID. The product or collection id, numeric or a full id such as "gid://shopify/Product/632910392". |
| `publication_ids` | array | yes |  | Publication IDs. Publications to publish to, for example ["gid://shopify/Publication/762454635"]. |
| `publish_date` | ISO date-time string | no |  | Publish Date. Optional future date and time to publish at. Leave empty to publish now. |

Output fields:

- `id`: Resource ID
- `title`: Title
- `published_publications_count`: Published Publications Count (number)
- `publication_ids`: Publication IDs
- `redacted_fields`: Redacted Fields

### `publish_theme`

**Publish Theme.** Publishes one theme as the live theme (role MAIN): it replaces the storefront every shopper sees immediately, and the theme that was live stops being live. Before calling, run list_themes with role MAIN and note the current live theme's id and name, because publishing that theme again is the only way back; then tell the user which theme goes live and which one it replaces, and only continue once they agree. The theme should have finished processing (processing false, see get_theme). Returns the published theme with its role. Publishing the theme that is already live should leave the same state, which is still to be confirmed on a store. Shopify documents that modifying themes needs the write_themes access scope AND an exemption granted by Shopify; without the exemption the call is refused with an access error, so report that instead of retrying. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `theme_id` | string | yes |  | Theme ID. The theme to make live, numeric or "gid://shopify/OnlineStoreTheme/…". Find it with list_themes. |

Output fields:

- `id`: Theme ID
- `name`: Name
- `role`: Role
- `prefix`: Preview Prefix
- `processing`: Processing (boolean)
- `processing_failed`: Processing Failed (boolean)
- `theme_store_id`: Theme Store ID (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `release_fulfillment_order_hold`

**Release Fulfillment Order Hold.** Releases fulfillment holds on one fulfillment order and returns the fulfillment order. release_scope is required: LISTED_HOLDS releases only the hold ids you pass (recommended; get them from get_fulfillment_order holds[].id), ALL_HOLDS releases every hold on the fulfillment order, including holds placed by other apps or staff, which can let items ship too early. When the last hold is gone the fulfillment order becomes fulfillable again. Releasing holds that are already released leaves the same state (confirm at Tier-2). Needs the write_merchant_managed_fulfillment_orders access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fulfillment_order_id` | string | yes |  | Fulfillment Order ID. The held fulfillment order, numeric or "gid://shopify/FulfillmentOrder/…". Find it with list_order_fulfillment_orders. |
| `release_scope` | string | yes |  | Release Scope. Release only the listed holds, or every hold on the fulfillment order. One of `"LISTED_HOLDS"`, `"ALL_HOLDS"`. |
| `hold_ids` | array | no |  | Hold IDs. The holds to release, for example "gid://shopify/FulfillmentHold/123". Required with LISTED_HOLDS, must be empty with ALL_HOLDS. |
| `external_id` | string | no |  | External ID. Optional id from your own system that releases the hold. |

Output fields:

- `id`: Fulfillment Order ID
- `status`: Status
- `request_status`: Request Status
- `order_id`: Order ID
- `order_name`: Order Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `fulfill_at`: Fulfill At (datetime)
- `fulfill_by`: Fulfill By (datetime)
- `assigned_location_id`: Assigned Location ID
- `assigned_location_name`: Assigned Location Name
- `destination_first_name`: Destination First Name
- `destination_last_name`: Destination Last Name
- `destination_company`: Destination Company
- `destination_address1`: Destination Address 1
- `destination_address2`: Destination Address 2
- `destination_city`: Destination City
- `destination_province`: Destination Province
- `destination_zip`: Destination Zip
- `destination_country_code`: Destination Country Code
- `destination_phone`: Destination Phone
- `destination_email`: Destination Email (email)
- `delivery_method_type`: Delivery Method Type
- `delivery_method_name`: Delivery Method Name
- `holds`: Holds
- `holds[].id`: Hold ID
- `holds[].reason`: Reason
- `holds[].reason_notes`: Reason Notes
- `holds[].display_reason`: Display Reason
- `holds[].handle`: Handle
- `holds[].held_by_requesting_app`: Held By This App (boolean)
- `supported_actions`: Supported Actions
- `line_items`: Line Items
- `line_items[].id`: Fulfillment Order Line Item ID
- `line_items[].sku`: SKU
- `line_items[].product_title`: Product Title
- `line_items[].variant_title`: Variant Title
- `line_items[].total_quantity`: Total Quantity (number)
- `line_items[].remaining_quantity`: Remaining Quantity (number)
- `line_items[].requires_shipping`: Requires Shipping (boolean)
- `line_items[].line_item_id`: Order Line Item ID
- `line_items[].variant_id`: Variant ID
- `line_items[].inventory_item_id`: Inventory Item ID
- `line_items_truncated`: Line Items Truncated (boolean)
- `line_items_end_cursor`: Line Items Cursor
- `released_hold_ids`: Released Hold IDs
- `redacted_fields`: Redacted Fields

### `remove_products_from_collection`

**Remove Products from Collection.** Removes manual picks from one collection. Reads the collection's sources first, then removes the products from every non-shared conditions source in one update (or only from source_id when given). Shared conditions sources (shareable=true in get_collection, reused by other collections) are never changed: a shared source_id is refused, and a collection whose only conditions sources are shared is refused with their ids. Only manual selections are removed: a product that still matches one of the collection's conditions stays in the collection; change the conditions with update_collection for that. The products themselves are not deleted. Large changes may finish in the background (job_id, poll get_job). Removing a product that is not picked leaves it unpicked. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection_id` | string | yes |  | Collection ID. The collection id, numeric or "gid://shopify/Collection/…". Find it with search_collections. |
| `product_ids` | array | yes |  | Product IDs. Products to remove, numeric or "gid://shopify/Product/…". |
| `source_id` | string | no |  | Source ID. Optional conditions source to remove the picks from (from get_collection sources). Must not be a shared source. Leave empty to remove from every non-shared conditions source. |

Output fields:

- `id`: Collection ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `sort_order`: Sort Order
- `updated_at`: Updated At (datetime)
- `products_count`: Products Count (number)
- `image_url`: Image (image)
- `image_alt`: Image Alt Text
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `sources`: Sources
- `sources[].id`: Source ID
- `sources[].title`: Title
- `sources[].type`: Type
- `sources[].shareable`: Shared (boolean)
- `sources[].app_id`: App ID
- `sources[].target_type`: Target Type
- `sources[].match_type`: Match Type
- `sources[].conditions`: Conditions
- `sources[].conditions[].id`: Condition ID
- `sources[].conditions[].kind`: Kind
- `sources[].conditions[].relation`: Relation
- `sources[].conditions[].values`: Values
- `sources[].conditions[].currency_code`: Currency Code
- `sources[].selected_products`: Selected Products
- `sources[].selected_products[].product_id`: Product ID
- `sources[].selected_products[].product_title`: Product Title
- `sources[].selected_products[].variant_ids`: Variant IDs
- `sources[].selected_products_count`: Selected Products Count (number)
- `sources[].selected_products_truncated`: Selected Products Truncated (boolean)
- `removed_product_ids`: Removed Product IDs
- `source_ids_used`: Source IDs Used
- `job_id`: Job ID
- `job_done`: Job Done (boolean)
- `redacted_fields`: Redacted Fields

### `remove_tags`

**Remove Tags.** Removes one or more tags from an order, draft order, customer, product or blog article and keeps the others; prefer this over sending a full tag list to an update action. Removing a tag that is not present changes nothing, so repeating is safe. Returns the resulting tag list. Blog articles need the write_content access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes |  | Resource Type. What kind of record the id belongs to. Used to build the full id when a numeric id is given. One of `"Order"`, `"DraftOrder"`, `"Customer"`, `"Product"`, `"Article"`. |
| `resource_id` | string | yes |  | Resource ID. Numeric id such as "450789469" or a full id such as "gid://shopify/Order/450789469". |
| `tags` | array | yes |  | Tags. Tags to remove, for example ["follow-up"]. |

Output fields:

- `id`: Resource ID
- `tags_removed`: Tags Removed
- `tags`: Current Tags
- `redacted_fields`: Redacted Fields

### `reorder_collection_products`

**Start Collection Product Reorder.** Starts moving products to new zero-based positions inside one collection. The collection's sort order must be MANUAL (set it with update_collection first). Shopify does the move in the background and returns only a job: poll get_job with job_id until done is true, then read the order with list_collection_products. Starts a new job on every call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection_id` | string | yes |  | Collection ID. The collection id, numeric or "gid://shopify/Collection/…". |
| `moves` | array | yes |  | Moves. The products to move and their new zero-based positions. Each item: { `product_id`, `new_position` }. |

Output fields:

- `collection_id`: Collection ID
- `job_id`: Job ID
- `done`: Done (boolean)
- `redacted_fields`: Redacted Fields

### `reorder_product_media`

**Start Product Media Reorder.** Starts moving media of one product to new positions (0 is first). Shopify does the move in the background and returns only a job: poll get_job with job_id until done is true, then read the order with list_product_media. Starts a new job on every call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id, numeric or "gid://shopify/Product/…". |
| `moves` | array | yes |  | Moves. The media to move and their new zero-based positions. Each item: { `media_id`, `new_position` }. |

Output fields:

- `product_id`: Product ID
- `job_id`: Job ID
- `done`: Done (boolean)
- `redacted_fields`: Redacted Fields

### `reorder_product_options`

**Reorder Product Options.** Sets the absolute order of a product's options (and optionally the order of each option's values). List every option in the order you want; for each option you can list its value names in order. Variant order follows the new option order. Sending the same order again is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id, numeric or "gid://shopify/Product/…". |
| `options` | array | yes |  | Options in Order. Every option of the product, first to last. Each item: { `option_id`?, `name`?, `values`? }. |

Output fields:

- `id`: Product ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `status`: Status
- `vendor`: Vendor
- `product_type`: Product Type
- `tags`: Tags
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `total_inventory`: Total Inventory (number)
- `tracks_inventory`: Tracks Inventory (boolean)
- `has_only_default_variant`: Has Only Default Variant (boolean)
- `variants_count`: Variants Count (number)
- `media_count`: Media Count (number)
- `min_price`: Min Price (number)
- `max_price`: Max Price (number)
- `currency_code`: Currency Code
- `featured_media_id`: Featured Media ID
- `featured_image_url`: Featured Image (image)
- `category_id`: Category ID
- `category_name`: Category Name
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `is_gift_card`: Is Gift Card (boolean)
- `requires_selling_plan`: Requires Selling Plan (boolean)
- `options`: Options
- `options[].id`: Option ID
- `options[].name`: Name
- `options[].position`: Position (number)
- `options[].values`: Values
- `options[].values[].id`: Value ID
- `options[].values[].name`: Name
- `options[].values[].has_variants`: Has Variants (boolean)
- `variants`: Variants
- `variants[].id`: Variant ID
- `variants[].legacy_resource_id`: Numeric ID
- `variants[].title`: Title
- `variants[].display_name`: Display Name
- `variants[].sku`: SKU
- `variants[].barcode`: Barcode
- `variants[].barcodes`: Barcodes
- `variants[].barcodes[].value`: Barcode
- `variants[].barcodes[].type`: Type
- `variants[].price`: Price (number)
- `variants[].compare_at_price`: Compare-at Price (number)
- `variants[].position`: Position (number)
- `variants[].inventory_quantity`: Inventory Quantity (number)
- `variants[].inventory_policy`: Inventory Policy
- `variants[].available_for_sale`: Available for Sale (boolean)
- `variants[].taxable`: Taxable (boolean)
- `variants[].selected_options`: Selected Options
- `variants[].selected_options[].name`: Option
- `variants[].selected_options[].value`: Value
- `variants[].inventory_item_id`: Inventory Item ID
- `variants[].inventory_tracked`: Inventory Tracked (boolean)
- `variants[].requires_shipping`: Requires Shipping (boolean)
- `variants[].product_id`: Product ID
- `variants[].product_title`: Product Title
- `variants[].created_at`: Created At (datetime)
- `variants[].updated_at`: Updated At (datetime)
- `variants_has_more`: More Variants (boolean)
- `media`: Media
- `media[].id`: Media ID
- `media[].alt`: Alt Text
- `media[].media_content_type`: Media Type
- `media[].status`: Status
- `media[].image_url`: Image URL (image)
- `media[].width`: Width (number)
- `media[].height`: Height (number)
- `media[].mime_type`: MIME Type
- `media[].preview_url`: Preview Image (image)
- `media[].external_url`: External URL (url)
- `media[].filename`: Filename
- `media[].errors`: Errors
- `media_has_more`: More Media (boolean)
- `redacted_fields`: Redacted Fields

### `reorder_product_variants`

**Reorder Product Variants.** Moves variants of one product to absolute positions (1 is first). Variants not listed shift around the moved ones. Returns the product's first 100 variants in their new order. Sending the same positions again is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id, numeric or "gid://shopify/Product/…". |
| `positions` | array | yes |  | New Positions. The variants to move and where. Each item: { `variant_id`, `position` }. |

Output fields:

- `product_id`: Product ID
- `variants`: Variants
- `variants[].id`: Variant ID
- `variants[].legacy_resource_id`: Numeric ID
- `variants[].title`: Title
- `variants[].display_name`: Display Name
- `variants[].sku`: SKU
- `variants[].barcode`: Barcode
- `variants[].barcodes`: Barcodes
- `variants[].barcodes[].value`: Barcode
- `variants[].barcodes[].type`: Type
- `variants[].price`: Price (number)
- `variants[].compare_at_price`: Compare-at Price (number)
- `variants[].position`: Position (number)
- `variants[].inventory_quantity`: Inventory Quantity (number)
- `variants[].inventory_policy`: Inventory Policy
- `variants[].available_for_sale`: Available for Sale (boolean)
- `variants[].taxable`: Taxable (boolean)
- `variants[].selected_options`: Selected Options
- `variants[].selected_options[].name`: Option
- `variants[].selected_options[].value`: Value
- `variants[].inventory_item_id`: Inventory Item ID
- `variants[].inventory_tracked`: Inventory Tracked (boolean)
- `variants[].requires_shipping`: Requires Shipping (boolean)
- `variants[].product_id`: Product ID
- `variants[].product_title`: Product Title
- `variants[].created_at`: Created At (datetime)
- `variants[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `search_collections`

**Search Collections.** Searches collections with Shopify search syntax (for example "title:Summer*", "handle:summer-sale", "collection_type:custom" for manual collections or "collection_type:smart" for rule-based ones) and returns one page of collection summaries with product counts. Use get_collection for sources and conditions. Paged: pass end_cursor back as the cursor while has_next_page is true. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify collection search syntax, for example "title:Summer*" or "collection_type:smart". Leave empty to list all collections. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the collection id. One of `"TITLE"`, `"UPDATED_AT"`, `"RELEVANCE"`, `"ID"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Collections
- `items[].id`: Collection ID
- `items[].legacy_resource_id`: Numeric ID
- `items[].title`: Title
- `items[].handle`: Handle
- `items[].sort_order`: Sort Order
- `items[].updated_at`: Updated At (datetime)
- `items[].products_count`: Products Count (number)
- `items[].image_url`: Image (image)
- `items[].image_alt`: Image Alt Text
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `search_customers`

**Search Customers.** Searches customers with Shopify search syntax (for example "email:jane@example.com", "phone:+16135551111", "tag:vip" or a plain name) and returns one page of customer profiles. Use get_customer_profile when you already have the id. Paged: pass end_cursor back as the cursor while has_next_page is true. Contact fields may be null on stores without protected customer data access (see redacted_fields). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify customer search syntax, for example "email:jane@example.com", "country:Canada" or "orders_count:>5". Leave empty to list all customers. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the customer id. One of `"CREATED_AT"`, `"UPDATED_AT"`, `"NAME"`, `"LOCATION"`, `"RELEVANCE"`, `"ID"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 130. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Customers
- `items[].id`: Customer ID
- `items[].legacy_resource_id`: Numeric ID
- `items[].display_name`: Display Name
- `items[].first_name`: First Name
- `items[].last_name`: Last Name
- `items[].email`: Email (email)
- `items[].email_marketing_state`: Email Marketing State
- `items[].email_marketing_opt_in_level`: Email Marketing Opt-in Level
- `items[].email_marketing_updated_at`: Email Marketing Updated At (datetime)
- `items[].phone`: Phone
- `items[].note`: Note
- `items[].tags`: Tags
- `items[].state`: Account State
- `items[].verified_email`: Verified Email (boolean)
- `items[].tax_exempt`: Tax Exempt (boolean)
- `items[].locale`: Locale
- `items[].number_of_orders`: Number Of Orders (number)
- `items[].amount_spent`: Amount Spent (number)
- `items[].amount_spent_currency`: Amount Spent Currency
- `items[].can_delete`: Can Delete (boolean)
- `items[].last_order_id`: Last Order ID
- `items[].last_order_name`: Last Order Name
- `items[].default_address_id`: Default Address ID
- `items[].default_address_name`: Default Address Name
- `items[].default_address_company`: Default Address Company
- `items[].default_address_address1`: Default Address Address 1
- `items[].default_address_address2`: Default Address Address 2
- `items[].default_address_city`: Default Address City
- `items[].default_address_province_code`: Default Address Province Code
- `items[].default_address_country_code`: Default Address Country Code
- `items[].default_address_zip`: Default Address ZIP
- `items[].default_address_phone`: Default Address Phone
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `search_gift_cards`

**Search Gift Cards.** Searches the store's gift cards with Shopify search syntax, for example "status:enabled", "balance_status:partial", "initial_value:10", "customer_id:123" or "created_at:>2026-01-01". To find a card by its code, pass the full code or its last 4 characters as plain text (for example "1234"); Shopify ignores a "last_characters:" filter and would return every card. Plain text does not match the note. Returns balance, initial value, status, expiry, owner and the last characters of each code (never the full code). Paged: pass end_cursor back as the cursor while has_next_page is true. Needs the read_gift_cards access scope. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify gift card search syntax, for example "status:enabled balance_status:partial", or a code or its last 4 characters as plain text such as "1234". Leave empty to list all. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the id. One of `"ID"`, `"CREATED_AT"`, `"UPDATED_AT"`, `"BALANCE"`, `"INITIAL_VALUE"`, `"AMOUNT_SPENT"`, `"EXPIRES_ON"`, `"DISABLED_AT"`, `"CUSTOMER_NAME"`, `"CODE"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 110. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Gift Cards
- `items[].id`: Gift Card ID
- `items[].last_characters`: Last Characters
- `items[].masked_code`: Masked Code
- `items[].enabled`: Enabled (boolean)
- `items[].is_redeemable`: Is Redeemable (boolean)
- `items[].deactivated_at`: Deactivated At (datetime)
- `items[].expires_on`: Expires On (date)
- `items[].balance`: Balance (number)
- `items[].initial_value`: Initial Value (number)
- `items[].currency_code`: Currency Code
- `items[].note`: Note
- `items[].template_suffix`: Template Suffix
- `items[].customer_id`: Customer ID
- `items[].customer_name`: Customer Name
- `items[].order_id`: Order ID
- `items[].order_name`: Order Name
- `items[].recipient_id`: Recipient ID
- `items[].recipient_name`: Recipient Name
- `items[].recipient_preferred_name`: Recipient Preferred Name
- `items[].recipient_message`: Recipient Message
- `items[].send_notification_at`: Send Notification At (datetime)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `search_orders`

**Search Orders.** Searches orders with Shopify search syntax (for example "financial_status:paid created_at:>=2026-01-01" or "email:jane@example.com" or "name:#1001") and returns one page of order summaries without line items; use get_order for the full order. Paged: pass end_cursor back as the cursor while has_next_page is true. Without the read_all_orders scope only the last 60 days are visible. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify order search syntax, for example "status:open financial_status:paid", "tag:wholesale" or "created_at:>=2026-01-01". Leave empty to list all orders. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the order id. One of `"CREATED_AT"`, `"PROCESSED_AT"`, `"UPDATED_AT"`, `"ORDER_NUMBER"`, `"TOTAL_PRICE"`, `"CUSTOMER_NAME"`, `"FINANCIAL_STATUS"`, `"FULFILLMENT_STATUS"`, `"RELEVANCE"`, `"ID"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `40` | Page Size. How many records to return, 1 to 40. Defaults to 40. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Orders
- `items[].id`: Order ID
- `items[].legacy_resource_id`: Numeric ID
- `items[].name`: Order Name
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].processed_at`: Processed At (datetime)
- `items[].closed`: Closed (boolean)
- `items[].closed_at`: Closed At (datetime)
- `items[].cancelled_at`: Cancelled At (datetime)
- `items[].cancel_reason`: Cancel Reason
- `items[].financial_status`: Financial Status
- `items[].fulfillment_status`: Fulfillment Status
- `items[].test`: Test (boolean)
- `items[].email`: Email (email)
- `items[].phone`: Phone
- `items[].note`: Note
- `items[].tags`: Tags
- `items[].po_number`: PO Number
- `items[].source_name`: Source Name
- `items[].currency_code`: Currency Code
- `items[].subtotal_price`: Subtotal Price (number)
- `items[].total_price`: Total Price (number)
- `items[].total_tax`: Total Tax (number)
- `items[].total_discounts`: Total Discounts (number)
- `items[].total_shipping`: Total Shipping (number)
- `items[].total_refunded`: Total Refunded (number)
- `items[].total_outstanding`: Total Outstanding (number)
- `items[].current_total_price`: Current Total Price (number)
- `items[].customer_id`: Customer ID
- `items[].customer_name`: Customer Name
- `items[].customer_email`: Customer Email (email)
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `search_product_taxonomy`

**Search Product Categories.** Searches Shopify's standard product taxonomy (for example "t-shirts" or "running shoes") and returns categories with their full path, level and id. Pass the id as category_id to create_product_record or update_product_fields. Leave the search empty and give parent_category_id to browse one level down; with neither, the top-level categories are listed. Paged: pass end_cursor back as the cursor while has_next_page is true. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Words to search for, for example "t-shirts". |
| `parent_category_id` | string | no |  | Parent Category ID. List the direct children of this category, for example "aa-1" or "gid://shopify/TaxonomyCategory/aa-1". |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 250. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Categories
- `items[].id`: Category ID
- `items[].name`: Name
- `items[].full_name`: Full Name
- `items[].level`: Level (number)
- `items[].is_leaf`: Is Leaf (boolean)
- `items[].is_root`: Is Root (boolean)
- `items[].is_archived`: Is Archived (boolean)
- `items[].parent_id`: Parent ID
- `items[].children_ids`: Children IDs
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `search_products`

**Search Products.** Searches products with Shopify search syntax (for example "title:*shirt*", "sku:TSHIRT-RED-L", "vendor:Nike", "tag:sale", "status:active" or "product_type:Shoes") and returns one page of product summaries with price range, inventory total and variant count. Use get_product_details for options, variants and media. Paged: pass end_cursor back as the cursor while has_next_page is true. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Shopify product search syntax, for example "title:*shirt*", "sku:TSHIRT-RED-L", "vendor:Nike" or "status:draft". Leave empty to list all products. |
| `sort_key` | string | no |  | Sort By. Field to sort by. Defaults to the product id. One of `"TITLE"`, `"CREATED_AT"`, `"UPDATED_AT"`, `"PUBLISHED_AT"`, `"INVENTORY_TOTAL"`, `"PRODUCT_TYPE"`, `"VENDOR"`, `"RELEVANCE"`, `"ID"`. |
| `reverse` | boolean | no | `false` | Reverse Order. Return results in reverse sort order (for example newest first). |
| `first` | number | no | `50` | Page Size. How many records to return, 1 to 80. Defaults to 50. |
| `after` | string | no |  | Cursor. The end_cursor from the previous page. Leave empty for the first page; pass it only while has_next_page is true. |

Output fields:

- `items`: Products
- `items[].id`: Product ID
- `items[].legacy_resource_id`: Numeric ID
- `items[].title`: Title
- `items[].handle`: Handle
- `items[].status`: Status
- `items[].vendor`: Vendor
- `items[].product_type`: Product Type
- `items[].tags`: Tags
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].published_at`: Published At (datetime)
- `items[].total_inventory`: Total Inventory (number)
- `items[].tracks_inventory`: Tracks Inventory (boolean)
- `items[].has_only_default_variant`: Has Only Default Variant (boolean)
- `items[].variants_count`: Variants Count (number)
- `items[].media_count`: Media Count (number)
- `items[].min_price`: Min Price (number)
- `items[].max_price`: Max Price (number)
- `items[].currency_code`: Currency Code
- `items[].featured_media_id`: Featured Media ID
- `items[].featured_image_url`: Featured Image (image)
- `items[].category_id`: Category ID
- `items[].category_name`: Category Name
- `count`: Count (number)
- `has_next_page`: Has Next Page (boolean)
- `end_cursor`: End Cursor
- `redacted_fields`: Redacted Fields

### `send_customer_account_invite`

**Send Customer Account Invite.** Emails one customer an invitation to activate their classic store account, optionally with a custom subject and message. Use generate_customer_activation_url to get a link without sending an email. Each call sends another email, so do not repeat it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The customer id, numeric or "gid://shopify/Customer/…". Find it with search_customers. |
| `subject` | string | no |  | Subject. Email subject. Leave empty for the store default. |
| `custom_message` | string | no |  | Custom Message. A personal message added to the invitation. |

Output fields:

- `customer_id`: Customer ID
- `state`: Account State
- `redacted_fields`: Redacted Fields

### `send_draft_order_invoice`

**Send Draft Order Invoice.** Sends an email with the draft order invoice and its checkout link so the customer can pay; the draft status becomes invoice sent. Goes to the draft email unless a recipient is given. Each call sends another email, so do not repeat it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draft_order_id` | string | yes |  | Draft Order ID. The draft order id, numeric or "gid://shopify/DraftOrder/…". Find it with list_draft_orders. |
| `to` | string | no |  | Recipient Email. Send to this address instead of the draft email, for example "jane@example.com". |
| `subject` | string | no |  | Subject. Email subject. Leave empty for the store default. |
| `custom_message` | string | no |  | Custom Message. A personal message added to the invoice email. |

Output fields:

- `id`: Draft Order ID
- `legacy_resource_id`: Numeric ID
- `name`: Draft Order Name
- `status`: Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `invoice_url`: Invoice URL (url)
- `invoice_sent_at`: Invoice Sent At (datetime)
- `email`: Email (email)
- `phone`: Phone
- `note`: Note
- `tags`: Tags
- `po_number`: PO Number
- `ready`: Ready (boolean)
- `currency_code`: Currency Code
- `subtotal_price`: Subtotal Price (number)
- `total_price`: Total Price (number)
- `total_tax`: Total Tax (number)
- `total_discounts`: Total Discounts (number)
- `total_shipping`: Total Shipping (number)
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `order_id`: Order ID
- `order_name`: Order Name
- `redacted_fields`: Redacted Fields

### `set_default_customer_address`

**Set Default Customer Address.** Makes one saved address the customer's default address. Find the address id with list_customer_addresses. Setting the address that is already the default changes nothing, so repeating is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The customer id, numeric or "gid://shopify/Customer/…". |
| `address_id` | string | yes |  | Address ID. The address id from list_customer_addresses, for example "gid://shopify/MailingAddress/1053318585?model_name=CustomerAddress" or its number. |

Output fields:

- `customer_id`: Customer ID
- `id`: Address ID
- `first_name`: First Name
- `last_name`: Last Name
- `name`: Name
- `company`: Company
- `address1`: Address 1
- `address2`: Address 2
- `city`: City
- `province`: Province
- `province_code`: Province Code
- `country`: Country
- `country_code`: Country Code
- `zip`: ZIP
- `phone`: Phone
- `redacted_fields`: Redacted Fields

### `set_fulfillment_orders_deadline`

**Set Fulfillment Orders Deadline.** Sets the same fulfillment deadline (fulfill_by) on one or more fulfillment orders. Returns success. Setting the same deadline again leaves the same state. Read the result back with get_fulfillment_order. Needs the write_merchant_managed_fulfillment_orders access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fulfillment_order_ids` | array | yes |  | Fulfillment Order IDs. The fulfillment orders, numeric or "gid://shopify/FulfillmentOrder/…". Find them with list_order_fulfillment_orders. |
| `deadline` | ISO date-time string | yes |  | Deadline. The date and time by which they must be fulfilled, ISO 8601, for example "2026-10-01T17:00:00Z". |

Output fields:

- `success`: Success (boolean)
- `fulfillment_order_ids`: Fulfillment Order IDs
- `deadline`: Deadline (datetime)
- `redacted_fields`: Redacted Fields

### `set_inventory_quantities`

**Set Inventory Quantities.** Sets the available or on-hand quantity of inventory items at locations to an absolute number (for example 25), all in one batch under one reason. Every item must already be stocked at its location (see list_inventory_levels); otherwise nothing is changed and you should call activate_inventory_at_location first. Use adjust_inventory_quantities to add or subtract instead. Optional expected_quantity per entry is a safety check: if the current quantity differs, the whole call fails with CHANGE_FROM_QUANTITY_STALE, and a blind retry after a successful call also fails that way. Generate your own idempotency_key (for example a UUID) on the first call and pass the same key on every retry so a retry is safe; the key used is returned and is included in any error message. Inventory item ids come from get_product_variant_details or list_inventory_items, location ids from list_locations. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Quantity Name. Which quantity to set. One of `"available"`, `"on_hand"`. |
| `reason` | string | yes |  | Reason. Why the stock changes; shown in the inventory history. One of `"correction"`, `"cycle_count_available"`, `"damaged"`, `"received"`, `"restock"`, `"shrinkage"`, `"promotion"`, `"quality_control"`, `"safety_stock"`, `"other"`. |
| `quantities` | array | yes |  | Quantities. One entry per inventory item and location. Each item: { `inventory_item_id`, `location_id`, `quantity`, `expected_quantity`? }. |
| `reference_document_uri` | string | no |  | Reference Document URI. Optional URI of the document behind the change, for example "gid://my-app/CycleCount/CC-1". |
| `idempotency_key` | string | no |  | Idempotency Key. A unique key for this operation, for example a UUID such as "3f1c2a9e-6b1d-4c8e-9a51-2f7d0e4b8c10". Generate your own key on the first call and pass the same key again when retrying after a timeout or error, so Shopify does not repeat the operation. If left empty a key is generated; it is returned … |

Output fields:

- `adjustment_group_id`: Adjustment Group ID
- `created_at`: Created At (datetime)
- `reason`: Reason
- `reference_document_uri`: Reference Document URI
- `changes`: Changes
- `changes[].name`: Quantity Name
- `changes[].delta`: Delta (number)
- `changes[].quantity_after_change`: Quantity After Change (number)
- `changes[].ledger_document_uri`: Ledger Document URI
- `changes[].inventory_item_id`: Inventory Item ID
- `changes[].sku`: SKU
- `changes[].location_id`: Location ID
- `changes[].location_name`: Location Name
- `idempotency_key`: Idempotency Key
- `redacted_fields`: Redacted Fields

### `set_metafields`

**Set Metafields.** Sets up to 25 metafield values in one all-or-nothing call: a metafield that does not exist is created and an existing one (same owner, namespace and key) gets the new value. Each entry needs the owner's full id (for example "gid://shopify/Product/123"; ids from this piece's get/list actions are already in this form), a namespace, a key and the value as a string (lists and references as a JSON string, for example "[\"a\",\"b\"]"). type (for example "single_line_text_field", "number_integer", "json", "list.single_line_text_field") is required for a new metafield without a definition. Optional compare_digest (from list_metafields or get_metafield) makes that entry fail if the value changed since you read it. A retry that reuses the same compare_digest after an earlier call went through fails as stale, even though the stored value is yours: re-read with get_metafield or list_metafields first and send the new compare_digest. Setting the same values again leaves the same state. Needs the write access scope of each owner type (for example write_products for products). Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `metafields` | array | yes |  | Metafields. One entry per metafield to set, 1 to 25. Each item: { `owner_id`, `namespace`, `key`, `value`, `type`?, `compare_digest`? }. |

Output fields:

- `metafields`: Metafields
- `metafields[].id`: Metafield ID
- `metafields[].legacy_resource_id`: Legacy Resource ID
- `metafields[].namespace`: Namespace
- `metafields[].key`: Key
- `metafields[].type`: Type
- `metafields[].value`: Value
- `metafields[].compare_digest`: Compare Digest
- `metafields[].translatable`: Translatable (boolean)
- `metafields[].owner_type`: Owner Type
- `metafields[].owner_id`: Owner ID
- `metafields[].definition_id`: Definition ID
- `metafields[].definition_name`: Definition Name
- `metafields[].created_at`: Created At (datetime)
- `metafields[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `set_product`

**Set Product (Full State).** Declarative create-or-update of a complete product: sends the full list of options and variants you want the product to have. WARNING: on an existing product every variant and every option value not included here is DELETED, together with its stock and sales history links. Use update_product_fields to change single fields, and the variant and option actions for targeted changes. With product_id or product_handle an existing product is overwritten; a handle is looked up first and, if no product has it, the call is refused and nothing is created. Only with neither product_id nor product_handle is a new product created (status defaults to DRAFT); the output field created tells which happened. Tags, when sent, replace all tags. Collections and metafields are not sent by this action, so they are left unchanged. Sending the same full state again to the same product gives the same result; repeating a create (no id or handle) makes another product. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | no |  | Product ID. The product to overwrite, numeric or "gid://shopify/Product/…". Leave empty (and no handle) to create a new product. |
| `product_handle` | string | no |  | Product Handle. Alternative to Product ID: the handle of an existing product to overwrite, for example "organic-cotton-t-shirt". If no product has this handle the call fails; it never creates a product. |
| `title` | string | no |  | Title. Product title. Required when creating a new product. |
| `description_html` | string | no |  | Description (HTML). Product description, HTML allowed. |
| `vendor` | string | no |  | Vendor. Brand or vendor name. |
| `product_type` | string | no |  | Product Type. Merchant-defined product type. |
| `status` | string | no |  | Status. Product status. On a new product defaults to Draft; on an existing product leave empty to keep it. One of `"ACTIVE"`, `"DRAFT"`, `"ARCHIVED"`, `"UNLISTED"`. |
| `tags` | array | no |  | Tags. The complete tag list. Replaces every existing tag; leave empty to keep the current tags. |
| `product_options` | array | yes |  | Options. Every option the product must have, in order, for example Size with values "S, M, L". Options not listed are removed. Each item: { `name`, `values` }. |
| `variants` | array | yes |  | Variants. Every variant the product must have. Variants not listed are deleted. Each item: { `option_values`, `price`?, `compare_at_price`?, `sku`?, `barcode`?, `barcode_type`?, `inventory_policy`? }. |

Output fields:

- `created`: Created (boolean)
- `id`: Product ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `status`: Status
- `vendor`: Vendor
- `product_type`: Product Type
- `tags`: Tags
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `total_inventory`: Total Inventory (number)
- `tracks_inventory`: Tracks Inventory (boolean)
- `has_only_default_variant`: Has Only Default Variant (boolean)
- `variants_count`: Variants Count (number)
- `media_count`: Media Count (number)
- `min_price`: Min Price (number)
- `max_price`: Max Price (number)
- `currency_code`: Currency Code
- `featured_media_id`: Featured Media ID
- `featured_image_url`: Featured Image (image)
- `category_id`: Category ID
- `category_name`: Category Name
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `is_gift_card`: Is Gift Card (boolean)
- `requires_selling_plan`: Requires Selling Plan (boolean)
- `options`: Options
- `options[].id`: Option ID
- `options[].name`: Name
- `options[].position`: Position (number)
- `options[].values`: Values
- `options[].values[].id`: Value ID
- `options[].values[].name`: Name
- `options[].values[].has_variants`: Has Variants (boolean)
- `variants`: Variants
- `variants[].id`: Variant ID
- `variants[].legacy_resource_id`: Numeric ID
- `variants[].title`: Title
- `variants[].display_name`: Display Name
- `variants[].sku`: SKU
- `variants[].barcode`: Barcode
- `variants[].barcodes`: Barcodes
- `variants[].barcodes[].value`: Barcode
- `variants[].barcodes[].type`: Type
- `variants[].price`: Price (number)
- `variants[].compare_at_price`: Compare-at Price (number)
- `variants[].position`: Position (number)
- `variants[].inventory_quantity`: Inventory Quantity (number)
- `variants[].inventory_policy`: Inventory Policy
- `variants[].available_for_sale`: Available for Sale (boolean)
- `variants[].taxable`: Taxable (boolean)
- `variants[].selected_options`: Selected Options
- `variants[].selected_options[].name`: Option
- `variants[].selected_options[].value`: Value
- `variants[].inventory_item_id`: Inventory Item ID
- `variants[].inventory_tracked`: Inventory Tracked (boolean)
- `variants[].requires_shipping`: Requires Shipping (boolean)
- `variants[].product_id`: Product ID
- `variants[].product_title`: Product Title
- `variants[].created_at`: Created At (datetime)
- `variants[].updated_at`: Updated At (datetime)
- `variants_has_more`: More Variants (boolean)
- `media`: Media
- `media[].id`: Media ID
- `media[].alt`: Alt Text
- `media[].media_content_type`: Media Type
- `media[].status`: Status
- `media[].image_url`: Image URL (image)
- `media[].width`: Width (number)
- `media[].height`: Height (number)
- `media[].mime_type`: MIME Type
- `media[].preview_url`: Preview Image (image)
- `media[].external_url`: External URL (url)
- `media[].filename`: Filename
- `media[].errors`: Errors
- `media_has_more`: More Media (boolean)
- `redacted_fields`: Redacted Fields

### `start_bulk_mutation`

**Start Bulk Mutation.** Starts a Shopify bulk mutation operation that runs the given GraphQL mutation once for every object in variables (for example create or update thousands of products), and returns only the operation (bulk_operation_id and status). In one call it uploads the variables as a JSONL file to Shopify's staged upload storage and then starts the operation, so there is nothing else to upload. Poll get_bulk_operation with the id until status is COMPLETED, then download the JSONL result file from its url (one line per input line, including any userErrors per line). The mutation must be a single mutation that takes its input from variables, and it needs the access scopes it would need normally. These are real writes applied in bulk and a started operation cannot be undone, only stopped early with cancel_bulk_operation (lines already processed stay applied), so confirm the mutation and the number of lines with the user first. From API version 2026-01 each app can run up to five bulk mutations per shop at the same time. Each call starts another operation and would apply every line again, so never repeat it after a success. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mutation` | string | yes |  | Mutation. One GraphQL Admin mutation that reads its input from variables, for example "mutation call($product: ProductCreateInput!) { productCreate(product: $product) { product { id title } userErrors { field message } } }". |
| `variables` | JSON | yes |  | Variables per Execution. A JSON array with one object per execution; each object holds the variables for one run of the mutation, for example [{"product": {"title": "Sweater"}}, {"product": {"title": "Scarf"}}]. |
| `client_identifier` | string | no |  | Client Identifier. Optional label of your own to recognise the operation later. |

Output fields:

- `bulk_operation_id`: Bulk Operation ID
- `status`: Status
- `type`: Type
- `error_code`: Error Code
- `created_at`: Created At (datetime)
- `completed_at`: Completed At (datetime)
- `object_count`: Object Count (number)
- `root_object_count`: Root Object Count (number)
- `file_size`: File Size (filesize)
- `url`: Result File URL (url)
- `partial_data_url`: Partial Data URL (url)
- `query`: Query
- `line_count`: Line Count (number)
- `staged_upload_path`: Staged Upload Path
- `redacted_fields`: Redacted Fields

### `start_bulk_query`

**Start Bulk Export Query.** Starts a Shopify bulk query operation that runs the given GraphQL query in the background over the whole dataset (no paging; the background run does not count against the API rate limit) and returns only the operation (bulk_operation_id and status). Poll get_bulk_operation with that id until status is COMPLETED, then download the JSONL file from its url; the file is kept for seven days. Use it for exports too large for the list actions. The query must contain at least one connection field (for example products or orders), supports up to five connections and a nesting depth of two, and is written without first/after arguments on those connections; it needs the same access scopes as running it normally. From API version 2026-01 each app can run up to five bulk queries per shop at the same time; above that Shopify refuses until one finishes (cancel one with cancel_bulk_operation). Each call starts another operation, so do not repeat it while the first one runs. Read-only for store data. Needs authentication.

Kind: search, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Bulk Query. A GraphQL Admin query without paging arguments, for example "{ products { edges { node { id title variants { edges { node { id sku } } } } } } }". |

Output fields:

- `bulk_operation_id`: Bulk Operation ID
- `status`: Status
- `type`: Type
- `error_code`: Error Code
- `created_at`: Created At (datetime)
- `completed_at`: Completed At (datetime)
- `object_count`: Object Count (number)
- `root_object_count`: Root Object Count (number)
- `file_size`: File Size (filesize)
- `url`: Result File URL (url)
- `partial_data_url`: Partial Data URL (url)
- `query`: Query
- `redacted_fields`: Redacted Fields

### `start_order_cancellation`

**Start Order Cancellation.** Starts the irreversible, asynchronous cancellation of one order and returns only a job id; poll get_job until done is true, then read the order with get_order. A reason is required. Stock is restocked only if restock is on, and money is refunded only if a refund method is chosen; authorized (uncaptured) payments are voided either way. The customer is notified only if notify_customer is on. Not safe to repeat. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |
| `reason` | string | yes |  | Reason. Why the order is cancelled. One of `"CUSTOMER"`, `"DECLINED"`, `"FRAUD"`, `"INVENTORY"`, `"STAFF"`, `"OTHER"`. |
| `restock` | boolean | no | `false` | Restock Items. Return the line items to inventory. Off by default. |
| `refund_method` | string | no |  | Refund Method. How to refund captured payments. Leave empty to cancel without refunding captured money (authorized payments are still voided). One of `"ORIGINAL_PAYMENT_METHODS"`, `"STORE_CREDIT"`. |
| `store_credit_expires_at` | ISO date-time string | no |  | Store Credit Expiry. Only for a store credit refund: when the credit expires (ISO 8601). Leave empty for no expiry. |
| `notify_customer` | boolean | no | `false` | Notify Customer. Email the customer about the cancellation. Off by default. |
| `staff_note` | string | no |  | Staff Note. Internal note about the cancellation, not shown to the customer. |

Output fields:

- `order_id`: Order ID
- `job_id`: Job ID
- `job_done`: Job Done (boolean)
- `redacted_fields`: Redacted Fields

### `unarchive_order`

**Unarchive Order.** Reopens an order that was closed with archive_order so it shows as open again. It does not restore a cancelled order. Reopening an open order leaves it open, so repeating is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |

Output fields:

- `id`: Order ID
- `legacy_resource_id`: Numeric ID
- `name`: Order Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `processed_at`: Processed At (datetime)
- `closed`: Closed (boolean)
- `closed_at`: Closed At (datetime)
- `cancelled_at`: Cancelled At (datetime)
- `cancel_reason`: Cancel Reason
- `financial_status`: Financial Status
- `fulfillment_status`: Fulfillment Status
- `test`: Test (boolean)
- `email`: Email (email)
- `phone`: Phone
- `note`: Note
- `tags`: Tags
- `po_number`: PO Number
- `source_name`: Source Name
- `currency_code`: Currency Code
- `subtotal_price`: Subtotal Price (number)
- `total_price`: Total Price (number)
- `total_tax`: Total Tax (number)
- `total_discounts`: Total Discounts (number)
- `total_shipping`: Total Shipping (number)
- `total_refunded`: Total Refunded (number)
- `total_outstanding`: Total Outstanding (number)
- `current_total_price`: Current Total Price (number)
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `customer_email`: Customer Email (email)
- `redacted_fields`: Redacted Fields

### `unpublish_resource`

**Unpublish Product or Collection.** Unpublishes one product or collection from the given publications (find them with list_publications), hiding it on those channels. The product or collection itself is not deleted and can be published again with publish_resource. Unpublishing from a publication it is not on leaves it unpublished. Needs the write_publications access scope. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes |  | Resource Type. Whether the id is a product or a collection. One of `"Product"`, `"Collection"`. |
| `resource_id` | string | yes |  | Resource ID. The product or collection id, numeric or a full id such as "gid://shopify/Product/632910392". |
| `publication_ids` | array | yes |  | Publication IDs. Publications to unpublish from, for example ["gid://shopify/Publication/762454635"]. |

Output fields:

- `id`: Resource ID
- `title`: Title
- `published_publications_count`: Published Publications Count (number)
- `publication_ids`: Publication IDs
- `redacted_fields`: Redacted Fields

### `update_article`

**Update Blog Article.** Updates one blog article and returns it. Only the fields you supply are sent; at least one is required. Sending tags replaces all of the article's tags, so send the complete list, or use add_tags / remove_tags for single tags. is_published Yes makes the article visible on the storefront and No hides it. blog_id moves the article to another blog. Repeating the same update leaves the same state. Needs the write_content access scope. To empty the body or remove every tag, set clear_body or clear_tags instead of sending an empty value. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `article_id` | string | yes |  | Article ID. The article id, numeric or "gid://shopify/Article/…". Find it with list_articles. |
| `title` | string | no |  | Title. New title. |
| `body_html` | string | no |  | Body (HTML). New article content, HTML allowed. Replaces the whole body. |
| `summary_html` | string | no |  | Summary (HTML). New excerpt, HTML allowed. |
| `author_name` | string | no |  | Author Name. New author name. |
| `tags` | array | no |  | Tags. The complete new tag list. Replaces every existing tag; leave empty to keep the current tags (use clear_tags to remove all). |
| `is_published` | string | no |  | Published. Yes publishes the article, No hides it. Leave empty to keep the current state. One of `"true"`, `"false"`. |
| `publish_date` | ISO date-time string | no |  | Publish Date. New publication date and time, ISO 8601. |
| `handle` | string | no |  | Handle. New URL handle, for example "summer-collection-2026". |
| `redirect_new_handle` | string | no |  | Redirect Old Handle. When changing the handle, create a redirect from the old URL. Leave empty for the Shopify default. One of `"true"`, `"false"`. |
| `blog_id` | string | no |  | Move to Blog ID. Move the article to this blog, numeric or "gid://shopify/Blog/…". |
| `image_url` | string | no |  | Image URL. Public URL of a new featured image. |
| `image_alt_text` | string | no |  | Image Alt Text. Alternative text for the featured image. Needs image_url. |
| `template_suffix` | string | no |  | Template Suffix. New theme template suffix. |
| `clear_body` | boolean | no | `false` | Clear Body. Remove the existing content. Leave body_html empty when using this. |
| `clear_tags` | boolean | no | `false` | Clear Tags. Remove every tag. Leave tags empty when using this. |

Output fields:

- `id`: Article ID
- `title`: Title
- `handle`: Handle
- `author_name`: Author Name
- `blog_id`: Blog ID
- `blog_title`: Blog Title
- `summary_html`: Summary (html)
- `tags`: Tags
- `is_published`: Is Published (boolean)
- `published_at`: Published At (datetime)
- `template_suffix`: Template Suffix
- `image_url`: Image (image)
- `image_alt_text`: Image Alt Text
- `comments_count`: Comments Count (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `body_html`: Body HTML (html)
- `redacted_fields`: Redacted Fields

### `update_basic_discount_code`

**Update Amount-Off Discount Code.** Updates one amount-off code discount (created by create_basic_discount_code or in the admin) and returns it. Only the fields you supply are sent; an empty update is rejected. Several parts are REPLACED as a whole when sent, so send them complete: (1) the discount value and target: value_type, value and applies_to must be given together, and with PRODUCTS or COLLECTIONS the ids go in the *_to_add lists (ids to drop in *_to_remove). To change only the value of a product or collection discount, read it with get_discount and re-send its applies_to with one of its current product_ids, variant_ids or collection_ids in the matching *_to_add list, which keeps the targets unchanged; (2) eligibility with its customer or segment ids; (3) combines_with: all three combines_with_* choices together; (4) tags: the full tag list. minimum_requirement NONE removes the minimum; remove_end_date Yes clears the end date so the code never expires, and remove_usage_limit Yes clears the total usage limit (neither can be combined with a new ends_at or usage_limit). Takes the code discount id (gid://shopify/DiscountCodeNode/… or its plain number). Repeating the same update leaves the same state. Automatic discounts cannot be edited here. Needs the write_discounts access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `discount_id` | string | yes |  | Discount ID. The code discount id, for example "gid://shopify/DiscountCodeNode/123" or "123". Get it from list_discounts, get_discount or find_discount_by_code. |
| `title` | string | no |  | Title. New internal title. Leave empty to keep it. |
| `code` | string | no |  | Code. New code customers enter. Leave empty to keep it. |
| `starts_at` | ISO date-time string | no |  | Starts At. New start, ISO 8601. Leave empty to keep it. |
| `ends_at` | ISO date-time string | no |  | Ends At. New end, ISO 8601. Leave empty to keep it. To remove the end date use remove_end_date. |
| `remove_end_date` | string | no |  | Remove End Date. Yes: clear the end date so the code no longer expires. Cannot be combined with ends_at. Leave unset to keep the end date. One of `"true"`, `"false"`. |
| `value_type` | string | no |  | Value Type. Percentage or fixed amount. Send together with value and applies_to. One of `"PERCENTAGE"`, `"FIXED_AMOUNT"`. |
| `value` | number | no |  | Value. For PERCENTAGE the percent (15 means 15% off). For FIXED_AMOUNT the amount in the shop currency. |
| `applies_on_each_item` | string | no |  | Apply Amount To Each Item. FIXED_AMOUNT only: Yes takes the amount off every eligible item, No once per order. One of `"true"`, `"false"`. |
| `applies_to` | string | no |  | Applies To. What the discount applies to. Send together with value_type and value. One of `"ALL"`, `"PRODUCTS"`, `"COLLECTIONS"`. |
| `product_ids_to_add` | array | no |  | Product IDs To Add. With applies_to PRODUCTS: products the discount applies to, numeric or "gid://shopify/Product/…". |
| `product_ids_to_remove` | array | no |  | Product IDs To Remove. With applies_to PRODUCTS: products to take out of the discount. |
| `variant_ids_to_add` | array | no |  | Variant IDs To Add. With applies_to PRODUCTS: variants the discount applies to, numeric or "gid://shopify/ProductVariant/…". |
| `variant_ids_to_remove` | array | no |  | Variant IDs To Remove. With applies_to PRODUCTS: variants to take out of the discount. |
| `collection_ids_to_add` | array | no |  | Collection IDs To Add. With applies_to COLLECTIONS: collections the discount applies to, numeric or "gid://shopify/Collection/…". |
| `collection_ids_to_remove` | array | no |  | Collection IDs To Remove. With applies_to COLLECTIONS: collections to take out of the discount. |
| `eligibility` | string | no |  | Eligibility. Who can use the code. Replaces the current eligibility. One of `"ALL"`, `"CUSTOMERS"`, `"SEGMENTS"`. |
| `customer_ids_to_add` | array | no |  | Customer IDs To Add. With eligibility CUSTOMERS: customers who can use the code, numeric or "gid://shopify/Customer/…". |
| `customer_ids_to_remove` | array | no |  | Customer IDs To Remove. With eligibility CUSTOMERS: customers who should no longer be able to use it. |
| `segment_ids_to_add` | array | no |  | Segment IDs To Add. With eligibility SEGMENTS: segments that can use the code, numeric or "gid://shopify/Segment/…". |
| `segment_ids_to_remove` | array | no |  | Segment IDs To Remove. With eligibility SEGMENTS: segments that should no longer be able to use it. |
| `minimum_requirement` | string | no |  | Minimum Requirement. New minimum, or NONE to remove it. Leave unset to keep the current one. One of `"NONE"`, `"SUBTOTAL"`, `"QUANTITY"`. |
| `minimum_value` | number | no |  | Minimum Value. With SUBTOTAL or QUANTITY: the subtotal or the whole-number item quantity. |
| `usage_limit` | number | no |  | Usage Limit. New total usage limit, a whole number of 1 or more. Leave empty to keep it. To remove the limit use remove_usage_limit. |
| `remove_usage_limit` | string | no |  | Remove Usage Limit. Yes: clear the total usage limit so the code can be used any number of times. Cannot be combined with usage_limit. Leave unset to keep the limit. One of `"true"`, `"false"`. |
| `applies_once_per_customer` | string | no |  | Once Per Customer. Yes: each customer can use it once. No: no per-customer limit. Leave unset to keep it. One of `"true"`, `"false"`. |
| `combines_with_product_discounts` | string | no |  | Combines With Product Discounts. Set all three combines_with choices together; they replace the current combinations. One of `"true"`, `"false"`. |
| `combines_with_order_discounts` | string | no |  | Combines With Order Discounts. Set all three combines_with choices together; they replace the current combinations. One of `"true"`, `"false"`. |
| `combines_with_shipping_discounts` | string | no |  | Combines With Shipping Discounts. Set all three combines_with choices together; they replace the current combinations. One of `"true"`, `"false"`. |
| `tags` | array | no |  | Tags. The complete new tag list; replaces the current tags. Leave empty to keep them. |

Output fields:

- `id`: Discount ID
- `method`: Method
- `discount_type`: Discount Type
- `title`: Title
- `status`: Status
- `summary`: Summary
- `starts_at`: Starts At (datetime)
- `ends_at`: Ends At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `usage_count`: Usage Count (number)
- `discount_classes`: Discount Classes
- `tags`: Tags
- `combines_with_product_discounts`: Combines With Product Discounts (boolean)
- `combines_with_order_discounts`: Combines With Order Discounts (boolean)
- `combines_with_shipping_discounts`: Combines With Shipping Discounts (boolean)
- `applies_once_per_customer`: Applies Once Per Customer (boolean)
- `usage_limit`: Usage Limit (number)
- `codes_count`: Codes Count (number)
- `codes`: Codes
- `eligibility`: Eligibility
- `customer_ids`: Customer IDs
- `segment_ids`: Segment IDs
- `market_ids`: Market IDs
- `markets_truncated`: Markets Truncated (boolean)
- `value_type`: Value Type
- `percentage`: Percentage (number)
- `amount`: Amount (number)
- `amount_currency`: Amount Currency
- `applies_on_each_item`: Applies On Each Item (boolean)
- `quantity`: Quantity (number)
- `applies_to`: Applies To
- `product_ids`: Product IDs
- `variant_ids`: Variant IDs
- `collection_ids`: Collection IDs
- `items_truncated`: Items Truncated (boolean)
- `buys_type`: Buys Type
- `buys_quantity`: Buys Quantity (number)
- `buys_amount`: Buys Amount (number)
- `buys_applies_to`: Buys Applies To
- `buys_product_ids`: Buys Product IDs
- `buys_variant_ids`: Buys Variant IDs
- `buys_collection_ids`: Buys Collection IDs
- `buys_items_truncated`: Buys Items Truncated (boolean)
- `minimum_quantity`: Minimum Quantity (number)
- `minimum_subtotal`: Minimum Subtotal (number)
- `minimum_subtotal_currency`: Minimum Subtotal Currency
- `maximum_shipping_price`: Maximum Shipping Price (number)
- `destination_all_countries`: Destination All Countries (boolean)
- `destination_countries`: Destination Countries
- `uses_per_order_limit`: Uses Per Order Limit (number)
- `redacted_fields`: Redacted Fields

### `update_blog`

**Update Blog.** Updates one blog and returns it. Only the fields you supply are sent; at least one is required. Changing the handle changes the blog URL; redirect_new_handle and redirect_articles decide whether redirects are created from the old blog and article URLs (leave empty for the Shopify default). Articles are not touched. Repeating the same update leaves the same state. Needs the write_content access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `blog_id` | string | yes |  | Blog ID. The blog id, numeric or "gid://shopify/Blog/…". Find it with list_blogs. |
| `title` | string | no |  | Title. New blog title. |
| `handle` | string | no |  | Handle. New URL handle, for example "company-news". |
| `redirect_new_handle` | string | no |  | Redirect Old Blog URL. When changing the handle, create a redirect from the old blog URL. Leave empty for the Shopify default. One of `"true"`, `"false"`. |
| `redirect_articles` | string | no |  | Redirect Old Article URLs. When changing the handle, also redirect the old URLs of the blog's articles. Leave empty for the Shopify default. One of `"true"`, `"false"`. |
| `comment_policy` | string | no |  | Comment Policy. New comment policy. Leave empty to keep the current one. One of `"CLOSED"`, `"MODERATED"`, `"AUTO_PUBLISHED"`. |
| `template_suffix` | string | no |  | Template Suffix. New theme template suffix, for example "wide". Leave empty to keep the current one. |

Output fields:

- `id`: Blog ID
- `title`: Title
- `handle`: Handle
- `comment_policy`: Comment Policy
- `template_suffix`: Template Suffix
- `articles_count`: Articles Count (number)
- `feed_path`: Feed Path
- `feed_location`: Feed Location (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `update_collection`

**Update Collection.** Changes one collection; fields left empty are not sent and keep their values. Rule conditions change only through explicit edits on one conditions source: conditions_to_add adds new conditions, condition_ids_to_delete removes conditions by id, match_type switches ALL/ANY; the source id and condition ids come from get_collection. Nothing is replaced implicitly. Manual product picks are changed with add_products_to_collection and remove_products_from_collection. Membership changes can finish in the background (job_id, poll get_job). Re-running the same field values is safe; adding the same condition twice creates a duplicate condition. A shared conditions source (shareable=true in get_collection, reused by other collections) is refused, so editing one collection never changes another. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection_id` | string | yes |  | Collection ID. The collection id, numeric or "gid://shopify/Collection/…". Find it with search_collections. |
| `title` | string | no |  | Title. New title. |
| `description_html` | string | no |  | Description (HTML). New description, HTML allowed. Replaces the existing description. |
| `handle` | string | no |  | Handle. New URL handle. |
| `redirect_new_handle` | string | no |  | Redirect Old Handle. When changing the handle, create a redirect from the old URL. Leave empty for the Shopify default. One of `"true"`, `"false"`. |
| `sort_order` | string | no |  | Product Sort Order. How products are ordered inside the collection. Manual is required before reorder_collection_products. One of `"MANUAL"`, `"BEST_SELLING"`, `"ALPHA_ASC"`, `"ALPHA_DESC"`, `"PRICE_ASC"`, `"PRICE_DESC"`, `"CREATED_DESC"`, `"CREATED"`, `"MOST_RELEVANT"`. |
| `template_suffix` | string | no |  | Template Suffix. New theme template suffix. |
| `image_url` | string | no |  | Image URL. Public URL of a new collection image. |
| `image_alt` | string | no |  | Image Alt Text. Alt text for the new image. Only used together with an image URL. |
| `seo_title` | string | no |  | SEO Title. New page title for search engines. |
| `seo_description` | string | no |  | SEO Description. New meta description for search engines. |
| `source_id` | string | no |  | Conditions Source ID. The conditions source to edit (from get_collection sources). Required for the condition fields below. |
| `match_type` | string | no |  | Match. Switch the source between matching all conditions or any of them. One of `"ALL"`, `"ANY"`. |
| `conditions_to_add` | array | no |  | Conditions. New conditions to add to the source. Existing conditions are kept. Each item: { `field`, `relation`, `value`? }. |
| `condition_ids_to_delete` | array | no |  | Condition IDs to Delete. Ids of conditions to remove (from get_collection sources[].conditions). |
| `currency` | string | no |  | Currency. Shop currency code for new price conditions, for example "USD". |

Output fields:

- `id`: Collection ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `sort_order`: Sort Order
- `updated_at`: Updated At (datetime)
- `products_count`: Products Count (number)
- `image_url`: Image (image)
- `image_alt`: Image Alt Text
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `sources`: Sources
- `sources[].id`: Source ID
- `sources[].title`: Title
- `sources[].type`: Type
- `sources[].shareable`: Shared (boolean)
- `sources[].app_id`: App ID
- `sources[].target_type`: Target Type
- `sources[].match_type`: Match Type
- `sources[].conditions`: Conditions
- `sources[].conditions[].id`: Condition ID
- `sources[].conditions[].kind`: Kind
- `sources[].conditions[].relation`: Relation
- `sources[].conditions[].values`: Values
- `sources[].conditions[].currency_code`: Currency Code
- `sources[].selected_products`: Selected Products
- `sources[].selected_products[].product_id`: Product ID
- `sources[].selected_products[].product_title`: Product Title
- `sources[].selected_products[].variant_ids`: Variant IDs
- `sources[].selected_products_count`: Selected Products Count (number)
- `sources[].selected_products_truncated`: Selected Products Truncated (boolean)
- `job_id`: Job ID
- `job_done`: Job Done (boolean)
- `redacted_fields`: Redacted Fields

### `update_customer_address`

**Update Customer Address.** Changes one saved address of a customer and can make it the default. Only the address fields you fill in are sent; with no address fields and set_as_default = Yes it only makes the address the default. Find the address id with list_customer_addresses. Re-running with the same values is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The customer id, numeric or "gid://shopify/Customer/…". |
| `address_id` | string | yes |  | Address ID. The address id from list_customer_addresses, for example "gid://shopify/MailingAddress/1053318585?model_name=CustomerAddress" or its number. |
| `first_name` | string | no |  | First Name. First name on the address. |
| `last_name` | string | no |  | Last Name. Last name on the address. |
| `company` | string | no |  | Company. Company name on the address. |
| `address1` | string | no |  | Address Line 1. Street address, for example "150 Elgin Street". |
| `address2` | string | no |  | Address Line 2. Apartment, suite or unit, for example "Suite 800". |
| `city` | string | no |  | City. City, for example "Ottawa". |
| `province_code` | string | no |  | Province / State Code. Region code, for example "ON" or "CA". |
| `country_code` | string | no |  | Country Code. Two-letter ISO country code, for example "CA" or "US". |
| `zip` | string | no |  | Postal Code. Postal or ZIP code, for example "K2P 1L4". |
| `phone` | string | no |  | Phone. Phone number in E.164 format, for example "+16135551111". |
| `set_as_default` | string | no |  | Set as Default. Yes makes this the customer's default address. Leave empty to leave the default unchanged. One of `"true"`, `"false"`. |

Output fields:

- `customer_id`: Customer ID
- `id`: Address ID
- `first_name`: First Name
- `last_name`: Last Name
- `name`: Name
- `company`: Company
- `address1`: Address 1
- `address2`: Address 2
- `city`: City
- `province`: Province
- `province_code`: Province Code
- `country`: Country
- `country_code`: Country Code
- `zip`: ZIP
- `phone`: Phone
- `redacted_fields`: Redacted Fields

### `update_customer_profile`

**Update Customer.** Changes one customer; fields left empty are not sent and keep their values, and marketing consent is never touched. Sending tags replaces all tags, so use add_tags or remove_tags for single tags. Addresses are changed with the customer address actions. Re-running with the same values is safe. To blank the note or remove every tag, set clear_note or clear_tags instead of sending an empty value. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The customer id, numeric or "gid://shopify/Customer/…". Find it with search_customers. |
| `email` | string | no |  | Email. New email, for example "jane@example.com". |
| `phone` | string | no |  | Phone. New phone in E.164 format, for example "+16135551111". |
| `first_name` | string | no |  | First Name. New first name. |
| `last_name` | string | no |  | Last Name. New last name. |
| `note` | string | no |  | Note. New internal note. Replaces the existing note. |
| `tags` | array | no |  | Tags. The complete new tag list. Replaces every existing tag; leave empty to keep the current tags (use clear_tags to remove all). |
| `locale` | string | no |  | Locale. Language for customer emails, for example "en" or "fr-CA". |
| `tax_exempt` | string | no |  | Tax Exempt. Set whether the customer is exempt from taxes. Leave empty to keep the current setting. One of `"true"`, `"false"`. |
| `clear_note` | boolean | no | `false` | Clear Note. Remove the existing note. Leave note empty when using this. |
| `clear_tags` | boolean | no | `false` | Clear Tags. Remove every tag. Leave tags empty when using this. |

Output fields:

- `id`: Customer ID
- `legacy_resource_id`: Numeric ID
- `display_name`: Display Name
- `first_name`: First Name
- `last_name`: Last Name
- `email`: Email (email)
- `email_marketing_state`: Email Marketing State
- `email_marketing_opt_in_level`: Email Marketing Opt-in Level
- `email_marketing_updated_at`: Email Marketing Updated At (datetime)
- `phone`: Phone
- `note`: Note
- `tags`: Tags
- `state`: Account State
- `verified_email`: Verified Email (boolean)
- `tax_exempt`: Tax Exempt (boolean)
- `locale`: Locale
- `number_of_orders`: Number Of Orders (number)
- `amount_spent`: Amount Spent (number)
- `amount_spent_currency`: Amount Spent Currency
- `can_delete`: Can Delete (boolean)
- `last_order_id`: Last Order ID
- `last_order_name`: Last Order Name
- `default_address_id`: Default Address ID
- `default_address_name`: Default Address Name
- `default_address_company`: Default Address Company
- `default_address_address1`: Default Address Address 1
- `default_address_address2`: Default Address Address 2
- `default_address_city`: Default Address City
- `default_address_province_code`: Default Address Province Code
- `default_address_country_code`: Default Address Country Code
- `default_address_zip`: Default Address ZIP
- `default_address_phone`: Default Address Phone
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `update_draft_order`

**Update Draft Order.** Changes an open draft order; fields left empty are not sent and keep their values. Sending line items replaces all existing line items, and sending tags replaces all tags (use add_tags / remove_tags for single tags). Set payment terms here before complete_draft_order to leave the resulting order payment-pending. Re-running with the same values is safe. To blank the note or remove every tag, set clear_note or clear_tags instead of sending an empty value. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draft_order_id` | string | yes |  | Draft Order ID. The draft order id, numeric or "gid://shopify/DraftOrder/…". Find it with list_draft_orders. |
| `line_items` | array | no |  | Line Items. The complete new list of line items. Replaces every existing line item; leave empty to keep the current items. Each item: { `variant_id`?, `title`?, `quantity`, `price`?, `sku`? }. |
| `currency` | string | no |  | Currency. Three-letter currency for the unit prices given in line items, for example "USD". |
| `customer_id` | string | no |  | Customer ID. Customer the draft is for, numeric or "gid://shopify/Customer/…". |
| `email` | string | no |  | Email. Email the invoice is sent to. |
| `phone` | string | no |  | Phone. Contact phone in E.164 format. |
| `note` | string | no |  | Note. New internal note. Replaces the existing note. |
| `tags` | array | no |  | Tags. The complete new tag list. Replaces every existing tag; leave empty to keep the current tags (use clear_tags to remove all). |
| `po_number` | string | no |  | PO Number. Purchase order number. |
| `payment_terms_template_id` | string | no |  | Payment Terms Template ID. Payment terms to apply, as a full id such as "gid://shopify/PaymentTermsTemplate/4". With payment terms, completing the draft leaves the order payment-pending. |
| `payment_issued_at` | ISO date-time string | no |  | Payment Terms Issued At. Start date for net payment terms (for example net 30), ISO 8601. |
| `payment_due_at` | ISO date-time string | no |  | Payment Due At. Due date for fixed-date payment terms, ISO 8601. |
| `reserve_inventory_until` | ISO date-time string | no |  | Reserve Inventory Until. Hold the stock for this draft until this time (ISO 8601). |
| `clear_note` | boolean | no | `false` | Clear Note. Remove the existing note. Leave note empty when using this. |
| `clear_tags` | boolean | no | `false` | Clear Tags. Remove every tag. Leave tags empty when using this. |

Output fields:

- `id`: Draft Order ID
- `legacy_resource_id`: Numeric ID
- `name`: Draft Order Name
- `status`: Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `invoice_url`: Invoice URL (url)
- `invoice_sent_at`: Invoice Sent At (datetime)
- `email`: Email (email)
- `phone`: Phone
- `note`: Note
- `tags`: Tags
- `po_number`: PO Number
- `ready`: Ready (boolean)
- `currency_code`: Currency Code
- `subtotal_price`: Subtotal Price (number)
- `total_price`: Total Price (number)
- `total_tax`: Total Tax (number)
- `total_discounts`: Total Discounts (number)
- `total_shipping`: Total Shipping (number)
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `order_id`: Order ID
- `order_name`: Order Name
- `reserve_inventory_until`: Reserve Inventory Until (datetime)
- `tax_exempt`: Tax Exempt (boolean)
- `taxes_included`: Taxes Included (boolean)
- `discount_codes`: Discount Codes
- `applied_discount_title`: Applied Discount Title
- `applied_discount_value`: Applied Discount Value (number)
- `applied_discount_value_type`: Applied Discount Value Type
- `applied_discount_amount`: Applied Discount Amount (number)
- `payment_terms_id`: Payment Terms ID
- `payment_terms_name`: Payment Terms Name
- `payment_terms_type`: Payment Terms Type
- `payment_terms_due_in_days`: Payment Terms Due In Days (number)
- `shipping_line_title`: Shipping Line Title
- `shipping_line_price`: Shipping Line Price (number)
- `shipping_name`: Shipping Name
- `shipping_company`: Shipping Company
- `shipping_address1`: Shipping Address 1
- `shipping_address2`: Shipping Address 2
- `shipping_city`: Shipping City
- `shipping_province_code`: Shipping Province Code
- `shipping_country_code`: Shipping Country Code
- `shipping_zip`: Shipping ZIP
- `shipping_phone`: Shipping Phone
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].title`: Title
- `line_items[].sku`: SKU
- `line_items[].quantity`: Quantity (number)
- `line_items[].custom`: Custom Item (boolean)
- `line_items[].original_unit_price`: Original Unit Price (number)
- `line_items[].discounted_total`: Discounted Total (number)
- `line_items[].variant_id`: Variant ID
- `line_items_has_more`: Line Items Has More (boolean)
- `redacted_fields`: Redacted Fields

### `update_external_marketing_activity`

**Update External Marketing Activity.** Changes only the fields you send on one external marketing activity and returns it; fields you leave empty keep their value (unlike upsert_external_marketing_activity, which replaces the whole activity). Identify the activity by exactly one of: marketing_activity_id, remote_id, or the three UTM values it was created with. UTM values, the URL parameter, the channel handle, the parent and the hierarchy level cannot be changed here. Repeating the same update leaves the same state. Needs the write_marketing_events access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `marketing_activity_id` | string | no |  | Marketing Activity ID. The activity id, numeric or "gid://shopify/MarketingActivity/…". Use this, the remote id, or the UTM values. |
| `remote_id` | string | no |  | Remote ID. Your own id the activity was created with, for example "fb-campaign-2026-spring". |
| `utm_campaign` | string | no |  | UTM Campaign (to find the activity). utm_campaign the activity was created with. Set all three UTM values to identify the activity by them. |
| `utm_source` | string | no |  | UTM Source (to find the activity). utm_source the activity was created with. |
| `utm_medium` | string | no |  | UTM Medium (to find the activity). utm_medium the activity was created with. |
| `title` | string | no |  | Title. New title. |
| `status` | string | no |  | Status. New state of the activity on the external platform. One of `"ACTIVE"`, `"INACTIVE"`, `"PAUSED"`, `"SCHEDULED"`, `"DELETED_EXTERNALLY"`, `"UNDEFINED"`. |
| `tactic` | string | no |  | Tactic. New tactic. An activity cannot be changed to or from STOREFRONT_APP. One of `"ABANDONED_CART"`, `"AD"`, `"AFFILIATE"`, `"LINK"`, `"LOYALTY"`, `"MESSAGE"`, `"NEWSLETTER"`, `"NOTIFICATION"`, `"POST"`, `"RETARGETING"`, `"TRANSACTIONAL"`, `"STOREFRONT_APP"`, `"SEO"`. |
| `marketing_channel_type` | string | no |  | Channel Type. New channel type. One of `"SEARCH"`, `"DISPLAY"`, `"SOCIAL"`, `"EMAIL"`, `"REFERRAL"`. |
| `remote_url` | string | no |  | Remote URL. New URL where the merchant manages the activity. |
| `remote_preview_image_url` | string | no |  | Preview Image URL. New public preview image URL. |
| `referring_domain` | string | no |  | Referring Domain. New referring domain, for example "facebook.com". |
| `budget_type` | string | no |  | Budget Type. DAILY or LIFETIME. Set together with the budget amount; the pair replaces the stored budget. One of `"DAILY"`, `"LIFETIME"`. |
| `budget_amount` | number | no |  | Budget Amount. New budget total, in the currency below. |
| `ad_spend_amount` | number | no |  | Ad Spend. New total spent so far, in the currency below. |
| `currency` | string | no |  | Currency. ISO currency code of the budget and ad spend, for example "USD". Needed when either is set. |
| `scheduled_start` | ISO date-time string | no |  | Scheduled Start. New planned start time, ISO 8601. |
| `scheduled_end` | ISO date-time string | no |  | Scheduled End. New planned end time, ISO 8601. |
| `start` | ISO date-time string | no |  | Actual Start. When the activity really started, ISO 8601. |
| `end` | ISO date-time string | no |  | Actual End. When the activity really ended, ISO 8601. |

Output fields:

- `id`: Marketing Activity ID
- `title`: Title
- `status`: Status
- `status_label`: Status Label
- `tactic`: Tactic
- `marketing_channel_type`: Channel Type
- `source_and_medium`: Source and Medium
- `is_external`: Is External (boolean)
- `hierarchy_level`: Hierarchy Level
- `parent_remote_id`: Parent Remote ID
- `parent_activity_id`: Parent Activity ID
- `url_parameter_value`: URL Parameter Value
- `activity_list_url`: Activity List URL (url)
- `utm_campaign`: UTM Campaign
- `utm_source`: UTM Source
- `utm_medium`: UTM Medium
- `budget_type`: Budget Type
- `budget_amount`: Budget Amount (number)
- `budget_currency_code`: Budget Currency
- `ad_spend_amount`: Ad Spend Amount (number)
- `ad_spend_currency_code`: Ad Spend Currency
- `marketing_event_id`: Marketing Event ID
- `remote_id`: Remote ID
- `manage_url`: Manage URL (url)
- `preview_url`: Preview URL (url)
- `started_at`: Started At (datetime)
- `ended_at`: Ended At (datetime)
- `scheduled_to_end_at`: Scheduled To End At (datetime)
- `status_transitioned_at`: Status Changed At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `update_free_shipping_discount_code`

**Update Free Shipping Discount Code.** Updates one free shipping code discount (created by create_free_shipping_discount_code or in the admin) and returns it. Only the fields you supply are sent; an empty update is rejected. Several parts are REPLACED as a whole when sent, so send them complete: (1) destination: ALL countries, or COUNTRIES with the codes to add in country_codes_to_add and the codes to drop in country_codes_to_remove (left unset, it becomes COUNTRIES when any country code is given); (2) eligibility with its customer or segment ids; (3) combines_with: all three combines_with_* choices together; (4) tags: the full tag list. minimum_requirement NONE removes the minimum; remove_end_date Yes clears the end date so the code never expires, and remove_usage_limit Yes clears the total usage limit (neither can be combined with a new ends_at or usage_limit). Takes the code discount id (gid://shopify/DiscountCodeNode/… or its plain number). Read the current settings with get_discount first. Repeating the same update leaves the same state. Amount-off codes are edited with update_basic_discount_code; automatic discounts cannot be edited here. Needs the write_discounts access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `discount_id` | string | yes |  | Discount ID. The code discount id, for example "gid://shopify/DiscountCodeNode/123" or "123". Get it from list_discounts, get_discount or find_discount_by_code. |
| `title` | string | no |  | Title. New internal title. Leave empty to keep it. |
| `code` | string | no |  | Code. New code customers enter. Leave empty to keep it. |
| `starts_at` | ISO date-time string | no |  | Starts At. New start, ISO 8601. Leave empty to keep it. |
| `ends_at` | ISO date-time string | no |  | Ends At. New end, ISO 8601. Leave empty to keep it. To remove the end date use remove_end_date. |
| `remove_end_date` | string | no |  | Remove End Date. Yes: clear the end date so the code no longer expires. Cannot be combined with ends_at. Leave unset to keep the end date. One of `"true"`, `"false"`. |
| `destination` | string | no |  | Destination. Where free shipping applies; replaces the current destination. Leave unset to keep it, or to use COUNTRIES when country codes are given. One of `"ALL"`, `"COUNTRIES"`. |
| `country_codes_to_add` | array | no |  | Country Codes To Add. With destination COUNTRIES: two-letter ISO country codes where free shipping should apply, for example "US" and "CA". |
| `country_codes_to_remove` | array | no |  | Country Codes To Remove. With destination COUNTRIES: two-letter ISO country codes to take out, for example "MX". |
| `maximum_shipping_price` | number | no |  | Maximum Shipping Price. New cap on the shipping rate the code covers, above 0, for example 20. Leave empty to keep it. |
| `eligibility` | string | no |  | Eligibility. Who can use the code. Replaces the current eligibility. One of `"ALL"`, `"CUSTOMERS"`, `"SEGMENTS"`. |
| `customer_ids_to_add` | array | no |  | Customer IDs To Add. With eligibility CUSTOMERS: customers who can use the code, numeric or "gid://shopify/Customer/…". |
| `customer_ids_to_remove` | array | no |  | Customer IDs To Remove. With eligibility CUSTOMERS: customers who should no longer be able to use it. |
| `segment_ids_to_add` | array | no |  | Segment IDs To Add. With eligibility SEGMENTS: segments that can use the code, numeric or "gid://shopify/Segment/…". |
| `segment_ids_to_remove` | array | no |  | Segment IDs To Remove. With eligibility SEGMENTS: segments that should no longer be able to use it. |
| `minimum_requirement` | string | no |  | Minimum Requirement. New minimum, or NONE to remove it. Leave unset to keep the current one. One of `"NONE"`, `"SUBTOTAL"`, `"QUANTITY"`. |
| `minimum_value` | number | no |  | Minimum Value. With SUBTOTAL or QUANTITY: the subtotal or the whole-number item quantity. |
| `usage_limit` | number | no |  | Usage Limit. New total usage limit, a whole number of 1 or more. Leave empty to keep it. To remove the limit use remove_usage_limit. |
| `remove_usage_limit` | string | no |  | Remove Usage Limit. Yes: clear the total usage limit so the code can be used any number of times. Cannot be combined with usage_limit. Leave unset to keep the limit. One of `"true"`, `"false"`. |
| `applies_once_per_customer` | string | no |  | Once Per Customer. Yes: each customer can use it once. No: no per-customer limit. Leave unset to keep it. One of `"true"`, `"false"`. |
| `combines_with_product_discounts` | string | no |  | Combines With Product Discounts. Set all three combines_with choices together; they replace the current combinations. One of `"true"`, `"false"`. |
| `combines_with_order_discounts` | string | no |  | Combines With Order Discounts. Set all three combines_with choices together; they replace the current combinations. One of `"true"`, `"false"`. |
| `combines_with_shipping_discounts` | string | no |  | Combines With Shipping Discounts. Set all three combines_with choices together; they replace the current combinations. One of `"true"`, `"false"`. |
| `tags` | array | no |  | Tags. The complete new tag list; replaces the current tags. Leave empty to keep them. |

Output fields:

- `id`: Discount ID
- `method`: Method
- `discount_type`: Discount Type
- `title`: Title
- `status`: Status
- `summary`: Summary
- `starts_at`: Starts At (datetime)
- `ends_at`: Ends At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `usage_count`: Usage Count (number)
- `discount_classes`: Discount Classes
- `tags`: Tags
- `combines_with_product_discounts`: Combines With Product Discounts (boolean)
- `combines_with_order_discounts`: Combines With Order Discounts (boolean)
- `combines_with_shipping_discounts`: Combines With Shipping Discounts (boolean)
- `applies_once_per_customer`: Applies Once Per Customer (boolean)
- `usage_limit`: Usage Limit (number)
- `codes_count`: Codes Count (number)
- `codes`: Codes
- `eligibility`: Eligibility
- `customer_ids`: Customer IDs
- `segment_ids`: Segment IDs
- `market_ids`: Market IDs
- `markets_truncated`: Markets Truncated (boolean)
- `value_type`: Value Type
- `percentage`: Percentage (number)
- `amount`: Amount (number)
- `amount_currency`: Amount Currency
- `applies_on_each_item`: Applies On Each Item (boolean)
- `quantity`: Quantity (number)
- `applies_to`: Applies To
- `product_ids`: Product IDs
- `variant_ids`: Variant IDs
- `collection_ids`: Collection IDs
- `items_truncated`: Items Truncated (boolean)
- `buys_type`: Buys Type
- `buys_quantity`: Buys Quantity (number)
- `buys_amount`: Buys Amount (number)
- `buys_applies_to`: Buys Applies To
- `buys_product_ids`: Buys Product IDs
- `buys_variant_ids`: Buys Variant IDs
- `buys_collection_ids`: Buys Collection IDs
- `buys_items_truncated`: Buys Items Truncated (boolean)
- `minimum_quantity`: Minimum Quantity (number)
- `minimum_subtotal`: Minimum Subtotal (number)
- `minimum_subtotal_currency`: Minimum Subtotal Currency
- `maximum_shipping_price`: Maximum Shipping Price (number)
- `destination_all_countries`: Destination All Countries (boolean)
- `destination_countries`: Destination Countries
- `uses_per_order_limit`: Uses Per Order Limit (number)
- `redacted_fields`: Redacted Fields

### `update_fulfillment_tracking`

**Update Fulfillment Tracking.** Updates the tracking information of one existing fulfillment and returns it. Only the fields you supply are sent. Tracking numbers and tracking URLs are lists that REPLACE the stored lists when sent: to add a number, send the complete list including the numbers already on the fulfillment (read them with get_fulfillment_details first). At least one of tracking_company, tracking_numbers or tracking_urls is required. notify_customer is sent explicitly and defaults to false; with true the customer gets a shipping update email, and every call made with notify_customer=true sends another email, so set it to true only on the one call that should notify (never on retries). Repeating the same call leaves the same tracking in place. Needs the write_merchant_managed_fulfillment_orders access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fulfillment_id` | string | yes |  | Fulfillment ID. The fulfillment id, numeric or "gid://shopify/Fulfillment/…". Find it with list_order_fulfillments. |
| `tracking_company` | string | no |  | Tracking Company. The carrier name, for example "UPS", "USPS", "FedEx" or "DHL Express". |
| `tracking_numbers` | array | no |  | Tracking Numbers. The complete list of tracking numbers. Replaces the stored list; leave empty to keep it. |
| `tracking_urls` | array | no |  | Tracking URLs. The complete list of tracking page URLs, one per tracking number. Replaces the stored list; leave empty to keep it. |
| `notify_customer` | boolean | no | `false` | Notify Customer. Send the customer a shipping update email. Off by default. |

Output fields:

- `id`: Fulfillment ID
- `legacy_resource_id`: Legacy Resource ID
- `name`: Name
- `status`: Status
- `display_status`: Display Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `in_transit_at`: In Transit At (datetime)
- `delivered_at`: Delivered At (datetime)
- `estimated_delivery_at`: Estimated Delivery At (datetime)
- `total_quantity`: Total Quantity (number)
- `requires_shipping`: Requires Shipping (boolean)
- `tracking_company`: Tracking Company
- `tracking_numbers`: Tracking Numbers
- `tracking_urls`: Tracking URLs
- `location_id`: Location ID
- `location_name`: Location Name
- `service_id`: Fulfillment Service ID
- `service_name`: Fulfillment Service Name
- `order_id`: Order ID
- `order_name`: Order Name
- `redacted_fields`: Redacted Fields

### `update_gift_card`

**Update Gift Card.** Updates one gift card and returns it. Only the fields you supply are sent; at least one is required. You can change the internal note, the expiry date, the owner customer, the theme template suffix and the recipient (customer, preferred name, message, notification time). The balance and the code cannot be changed here, and a deactivated card cannot be re-enabled. Repeating the same update leaves the same state. Needs the write_gift_cards access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `gift_card_id` | string | yes |  | Gift Card ID. The gift card id, numeric or "gid://shopify/GiftCard/…". Find it with search_gift_cards. |
| `note` | string | no |  | Note. New internal note. Leave empty to keep the current one. |
| `expires_on` | string | no |  | Expires On. New expiry date, YYYY-MM-DD, for example "2027-12-31". Leave empty to keep the current one. |
| `customer_id` | string | no |  | Customer ID. New owner customer, numeric or "gid://shopify/Customer/…". Leave empty to keep the current owner. |
| `template_suffix` | string | no |  | Template Suffix. Theme template suffix for the gift card page, for example "birthday". Leave empty to keep it. |
| `recipient_customer_id` | string | no |  | Recipient Customer ID. Customer who receives the gift card notification, numeric or "gid://shopify/Customer/…". Required to change any recipient detail. |
| `recipient_preferred_name` | string | no |  | Recipient Preferred Name. Name used to greet the recipient, for example "Sam". |
| `recipient_message` | string | no |  | Recipient Message. Personal message included in the recipient notification. |
| `send_notification_at` | ISO date-time string | no |  | Send Notification At. Time to email the recipient, ISO 8601. |

Output fields:

- `id`: Gift Card ID
- `last_characters`: Last Characters
- `masked_code`: Masked Code
- `enabled`: Enabled (boolean)
- `is_redeemable`: Is Redeemable (boolean)
- `deactivated_at`: Deactivated At (datetime)
- `expires_on`: Expires On (date)
- `balance`: Balance (number)
- `initial_value`: Initial Value (number)
- `currency_code`: Currency Code
- `note`: Note
- `template_suffix`: Template Suffix
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `order_id`: Order ID
- `order_name`: Order Name
- `recipient_id`: Recipient ID
- `recipient_name`: Recipient Name
- `recipient_preferred_name`: Recipient Preferred Name
- `recipient_message`: Recipient Message
- `send_notification_at`: Send Notification At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `update_inventory_item`

**Update Inventory Item.** Changes one inventory item; fields left empty are not sent and keep their values. Turning tracking off stops Shopify from counting stock for the variant. Quantities are not changed here; use set_inventory_quantities or adjust_inventory_quantities. Needs the write_inventory access scope. Re-running with the same values is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inventory_item_id` | string | yes |  | Inventory Item ID. The inventory item id, numeric or "gid://shopify/InventoryItem/…" (from get_product_variant_details). |
| `sku` | string | no |  | SKU. New SKU, for example "TSHIRT-RED-L". |
| `cost` | number | no |  | Unit Cost. New unit cost in the shop currency, for example 7.50. |
| `tracked` | string | no |  | Track Quantity. Whether Shopify tracks stock for this item. Leave empty to keep the current setting. One of `"true"`, `"false"`. |
| `requires_shipping` | string | no |  | Requires Shipping. Whether the item is a physical product that needs shipping. Leave empty to keep the current setting. One of `"true"`, `"false"`. |
| `country_code_of_origin` | string | no |  | Country of Origin. Two-letter ISO country code where the item was made, for example "CN". |
| `province_code_of_origin` | string | no |  | Province of Origin. Province or state code of origin, for example "ON". |
| `harmonized_system_code` | string | no |  | HS Code. Harmonized System code for customs, for example "6109.10". |
| `weight_value` | number | no |  | Weight. Item weight, for example 0.25. Set together with the weight unit. |
| `weight_unit` | string | no |  | Weight Unit. Unit of the weight. One of `"KILOGRAMS"`, `"GRAMS"`, `"POUNDS"`, `"OUNCES"`. |

Output fields:

- `id`: Inventory Item ID
- `legacy_resource_id`: Numeric ID
- `sku`: SKU
- `tracked`: Tracked (boolean)
- `requires_shipping`: Requires Shipping (boolean)
- `unit_cost`: Unit Cost (number)
- `unit_cost_currency`: Unit Cost Currency
- `country_code_of_origin`: Country of Origin
- `province_code_of_origin`: Province of Origin
- `harmonized_system_code`: HS Code
- `weight_value`: Weight (number)
- `weight_unit`: Weight Unit
- `locations_count`: Locations Count (number)
- `variant_id`: Variant ID
- `variant_title`: Variant Title
- `product_id`: Product ID
- `product_title`: Product Title
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `update_metafield_definition`

**Update Metafield Definition.** Updates one metafield definition, identified by owner type, namespace and key (these and the type cannot be changed). Only the fields you supply are sent; at least one is required. Sending validations REPLACES the whole validation list, so read the current list with get_metafield_definition and send every rule you want to keep; remove_all_validations Yes clears them. Changing validations makes Shopify re-check existing values in the background (validation_job_id, poll with get_job) and values that break the new rules become invalid. Repeating the same update leaves the same state. Needs the write access scope of the owner type (for example write_products). Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner_type` | string | yes |  | Owner Type. The resource type of the definition, for example PRODUCT. One of `"PRODUCT"`, `"PRODUCTVARIANT"`, `"COLLECTION"`, `"CUSTOMER"`, `"ORDER"`, `"DRAFTORDER"`, `"COMPANY"`, `"COMPANY_LOCATION"`, `"LOCATION"`, `"MARKET"`, `"PAGE"`, `"BLOG"`, `"ARTICLE"`, `"SHOP"`, `"DISCOUNT"`, `"SELLING_PLAN"`, `"GIFT_CARD_TRANSACTION"`. |
| `namespace` | string | yes |  | Namespace. The definition namespace, for example "custom". |
| `key` | string | yes |  | Key. The definition key, for example "care_instructions". |
| `name` | string | no |  | Name. New display name, for example "Care instructions". |
| `description` | string | no |  | Description. New description shown to staff. |
| `validations` | array | no |  | Validations. The complete new list of validation rules; replaces every existing rule. Leave empty to keep the current rules. Each item: { `name`, `value` }. |
| `remove_all_validations` | string | no |  | Remove All Validations. Yes removes every validation rule. Cannot be combined with validations. One of `"true"`, `"false"`. |

Output fields:

- `id`: Definition ID
- `name`: Name
- `namespace`: Namespace
- `key`: Key
- `description`: Description
- `owner_type`: Owner Type
- `type`: Type
- `type_category`: Type Category
- `pinned_position`: Pinned Position (number)
- `validation_status`: Validation Status
- `validations`: Validations
- `validations[].name`: Name
- `validations[].type`: Type
- `validations[].value`: Value
- `metafields_count`: Metafields Count (number)
- `admin_access`: Admin Access
- `storefront_access`: Storefront Access
- `customer_account_access`: Customer Account Access
- `admin_filterable`: Admin Filterable (boolean)
- `smart_collection_condition`: Smart Collection Condition (boolean)
- `unique_values`: Unique Values (boolean)
- `validation_job_id`: Validation Job ID
- `validation_job_done`: Validation Job Done (boolean)
- `redacted_fields`: Redacted Fields

### `update_order_details`

**Update Order Details.** Changes the contact email, phone, internal note, PO number or tags of one order; fields left empty are not sent and keep their values. Sending tags replaces the whole tag list, so use add_tags or remove_tags to change single tags. Line items and payments cannot be changed here. Re-running with the same values is safe. To blank the note or remove every tag, set clear_note or clear_tags instead of sending an empty value. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The order id, numeric or "gid://shopify/Order/…". Find it with search_orders. |
| `email` | string | no |  | Email. New contact email, for example "jane@example.com". |
| `phone` | string | no |  | Phone. New contact phone in E.164 format, for example "+16135551111". |
| `note` | string | no |  | Note. New internal note. Replaces the existing note. |
| `po_number` | string | no |  | PO Number. Purchase order number, for example "PO-2026-114". |
| `tags` | array | no |  | Tags. The complete new tag list, for example ["wholesale", "priority"]. Replaces every existing tag; leave empty to keep the current tags (use clear_tags to remove all). |
| `clear_note` | boolean | no | `false` | Clear Note. Remove the existing note. Leave note empty when using this. |
| `clear_tags` | boolean | no | `false` | Clear Tags. Remove every tag. Leave tags empty when using this. |

Output fields:

- `id`: Order ID
- `legacy_resource_id`: Numeric ID
- `name`: Order Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `processed_at`: Processed At (datetime)
- `closed`: Closed (boolean)
- `closed_at`: Closed At (datetime)
- `cancelled_at`: Cancelled At (datetime)
- `cancel_reason`: Cancel Reason
- `financial_status`: Financial Status
- `fulfillment_status`: Fulfillment Status
- `test`: Test (boolean)
- `email`: Email (email)
- `phone`: Phone
- `note`: Note
- `tags`: Tags
- `po_number`: PO Number
- `source_name`: Source Name
- `currency_code`: Currency Code
- `subtotal_price`: Subtotal Price (number)
- `total_price`: Total Price (number)
- `total_tax`: Total Tax (number)
- `total_discounts`: Total Discounts (number)
- `total_shipping`: Total Shipping (number)
- `total_refunded`: Total Refunded (number)
- `total_outstanding`: Total Outstanding (number)
- `current_total_price`: Current Total Price (number)
- `customer_id`: Customer ID
- `customer_name`: Customer Name
- `customer_email`: Customer Email (email)
- `number`: Order Number (number)
- `confirmed`: Confirmed (boolean)
- `capturable`: Capturable (boolean)
- `refundable`: Refundable (boolean)
- `fully_paid`: Fully Paid (boolean)
- `unpaid`: Unpaid (boolean)
- `can_mark_as_paid`: Can Mark As Paid (boolean)
- `fulfillments_count`: Fulfillments Count (number)
- `transactions_count`: Transactions Count (number)
- `discount_codes`: Discount Codes
- `payment_gateway_names`: Payment Gateway Names
- `shipping_line_title`: Shipping Line Title
- `shipping_line_price`: Shipping Line Price (number)
- `shipping_name`: Shipping Name
- `shipping_company`: Shipping Company
- `shipping_address1`: Shipping Address 1
- `shipping_address2`: Shipping Address 2
- `shipping_city`: Shipping City
- `shipping_province_code`: Shipping Province Code
- `shipping_country_code`: Shipping Country Code
- `shipping_zip`: Shipping ZIP
- `shipping_phone`: Shipping Phone
- `billing_name`: Billing Name
- `billing_company`: Billing Company
- `billing_address1`: Billing Address 1
- `billing_address2`: Billing Address 2
- `billing_city`: Billing City
- `billing_province_code`: Billing Province Code
- `billing_country_code`: Billing Country Code
- `billing_zip`: Billing ZIP
- `billing_phone`: Billing Phone
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].title`: Title
- `line_items[].sku`: SKU
- `line_items[].variant_title`: Variant Title
- `line_items[].vendor`: Vendor
- `line_items[].quantity`: Quantity (number)
- `line_items[].current_quantity`: Current Quantity (number)
- `line_items[].refundable_quantity`: Refundable Quantity (number)
- `line_items[].unfulfilled_quantity`: Unfulfilled Quantity (number)
- `line_items[].requires_shipping`: Requires Shipping (boolean)
- `line_items[].taxable`: Taxable (boolean)
- `line_items[].original_unit_price`: Original Unit Price (number)
- `line_items[].discounted_total`: Discounted Total (number)
- `line_items[].variant_id`: Variant ID
- `line_items[].product_id`: Product ID
- `line_items_has_more`: Line Items Has More (boolean)
- `redacted_fields`: Redacted Fields

### `update_page`

**Update Online Store Page.** Updates one online store content page and returns it. Only the fields you supply are sent; at least one is required. A new body replaces the whole body. is_published Yes makes the page visible on the storefront and No hides it. Repeating the same update leaves the same state. Needs the write_content access scope. To empty the page content, set clear_body instead of sending an empty body_html. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page ID. The page id, numeric or "gid://shopify/Page/…". Find it with list_pages. |
| `title` | string | no |  | Title. New title. |
| `body_html` | string | no |  | Body (HTML). New page content, HTML allowed. Replaces the whole body. |
| `handle` | string | no |  | Handle. New URL handle, for example "shipping-faq". |
| `redirect_new_handle` | string | no |  | Redirect Old Handle. When changing the handle, create a redirect from the old URL. Leave empty for the Shopify default. One of `"true"`, `"false"`. |
| `is_published` | string | no |  | Published. Yes publishes the page, No hides it. Leave empty to keep the current state. One of `"true"`, `"false"`. |
| `publish_date` | ISO date-time string | no |  | Publish Date. New publication date and time, ISO 8601. |
| `template_suffix` | string | no |  | Template Suffix. New theme template suffix. |
| `clear_body` | boolean | no | `false` | Clear Body. Remove the existing content. Leave body_html empty when using this. |

Output fields:

- `id`: Page ID
- `title`: Title
- `handle`: Handle
- `body_summary`: Body Summary
- `is_published`: Is Published (boolean)
- `published_at`: Published At (datetime)
- `template_suffix`: Template Suffix
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `body_html`: Body HTML (html)
- `redacted_fields`: Redacted Fields

### `update_product_fields`

**Update Product.** Changes one product; fields left empty are not sent and keep their values, and variants, options and media are never touched. Sending tags replaces all tags, so use add_tags or remove_tags for single tags. Setting status to ACTIVE makes the product visible on its sales channels. Re-running with the same values is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id, numeric or "gid://shopify/Product/…". Find it with search_products. |
| `title` | string | no |  | Title. New product title. |
| `description_html` | string | no |  | Description (HTML). New description, HTML allowed. Replaces the existing description. |
| `vendor` | string | no |  | Vendor. New vendor name. |
| `product_type` | string | no |  | Product Type. New product type. |
| `status` | string | no |  | Status. New status. Leave empty to keep the current status. One of `"ACTIVE"`, `"DRAFT"`, `"ARCHIVED"`, `"UNLISTED"`. |
| `handle` | string | no |  | Handle. New URL handle, for example "organic-cotton-t-shirt". |
| `redirect_new_handle` | string | no |  | Redirect Old Handle. When changing the handle, create a redirect from the old URL. Leave empty for the Shopify default. One of `"true"`, `"false"`. |
| `tags` | array | no |  | Tags. The complete new tag list. Replaces every existing tag; leave empty to keep the current tags. |
| `category_id` | string | no |  | Category ID. New taxonomy category id, for example "gid://shopify/TaxonomyCategory/aa-1-13-8". |
| `collections_to_join` | array | no |  | Collections to Join. Collection ids to add the product to, numeric or "gid://shopify/Collection/…". |
| `collections_to_leave` | array | no |  | Collections to Leave. Collection ids to remove the product from. |
| `seo_title` | string | no |  | SEO Title. New page title for search engines. |
| `seo_description` | string | no |  | SEO Description. New meta description for search engines. |

Output fields:

- `id`: Product ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `status`: Status
- `vendor`: Vendor
- `product_type`: Product Type
- `tags`: Tags
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `total_inventory`: Total Inventory (number)
- `tracks_inventory`: Tracks Inventory (boolean)
- `has_only_default_variant`: Has Only Default Variant (boolean)
- `variants_count`: Variants Count (number)
- `media_count`: Media Count (number)
- `min_price`: Min Price (number)
- `max_price`: Max Price (number)
- `currency_code`: Currency Code
- `featured_media_id`: Featured Media ID
- `featured_image_url`: Featured Image (image)
- `category_id`: Category ID
- `category_name`: Category Name
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `is_gift_card`: Is Gift Card (boolean)
- `requires_selling_plan`: Requires Selling Plan (boolean)
- `options`: Options
- `options[].id`: Option ID
- `options[].name`: Name
- `options[].position`: Position (number)
- `options[].values`: Values
- `options[].values[].id`: Value ID
- `options[].values[].name`: Name
- `options[].values[].has_variants`: Has Variants (boolean)
- `variants`: Variants
- `variants[].id`: Variant ID
- `variants[].legacy_resource_id`: Numeric ID
- `variants[].title`: Title
- `variants[].display_name`: Display Name
- `variants[].sku`: SKU
- `variants[].barcode`: Barcode
- `variants[].barcodes`: Barcodes
- `variants[].barcodes[].value`: Barcode
- `variants[].barcodes[].type`: Type
- `variants[].price`: Price (number)
- `variants[].compare_at_price`: Compare-at Price (number)
- `variants[].position`: Position (number)
- `variants[].inventory_quantity`: Inventory Quantity (number)
- `variants[].inventory_policy`: Inventory Policy
- `variants[].available_for_sale`: Available for Sale (boolean)
- `variants[].taxable`: Taxable (boolean)
- `variants[].selected_options`: Selected Options
- `variants[].selected_options[].name`: Option
- `variants[].selected_options[].value`: Value
- `variants[].inventory_item_id`: Inventory Item ID
- `variants[].inventory_tracked`: Inventory Tracked (boolean)
- `variants[].requires_shipping`: Requires Shipping (boolean)
- `variants[].product_id`: Product ID
- `variants[].product_title`: Product Title
- `variants[].created_at`: Created At (datetime)
- `variants[].updated_at`: Updated At (datetime)
- `variants_has_more`: More Variants (boolean)
- `media`: Media
- `media[].id`: Media ID
- `media[].alt`: Alt Text
- `media[].media_content_type`: Media Type
- `media[].status`: Status
- `media[].image_url`: Image URL (image)
- `media[].width`: Width (number)
- `media[].height`: Height (number)
- `media[].mime_type`: MIME Type
- `media[].preview_url`: Preview Image (image)
- `media[].external_url`: External URL (url)
- `media[].filename`: Filename
- `media[].errors`: Errors
- `media_has_more`: More Media (boolean)
- `redacted_fields`: Redacted Fields

### `update_product_media`

**Update Product Media.** Changes one existing media file: its alt text, its filename (the extension must stay the same) or, for images, replaces the file content from a public URL while keeping the same media id. Fields left empty keep their values. The file must be in READY state. Needs the write_files (or write_themes) access scope. Re-running with the same values is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `media_id` | string | yes |  | Media ID. The media id, for example "gid://shopify/MediaImage/1072273219". Find it with list_product_media. |
| `alt` | string | no |  | Alt Text. New accessible description, for example "Red t-shirt, back view". |
| `filename` | string | no |  | Filename. New filename with the same extension, for example "red-shirt-back.jpg". |
| `replacement_url` | string | no |  | Replacement Image URL. Public URL of a new image that replaces the file content, for example "https://example.com/new.jpg". Images only. |

Output fields:

- `id`: Media ID
- `alt`: Alt Text
- `file_status`: File Status
- `image_url`: Image URL (image)
- `preview_url`: Preview Image (image)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `update_product_option`

**Update Product Option.** Changes one product option: its name or position, and its values through explicit changes only (values to add, values to rename by id, value ids to delete). Values not mentioned stay as they are. Deleting a value that variants use needs variant_strategy MANAGE, which also removes those variants. Option and value ids come from get_product_details. Renaming to the same name again is safe; adding a value twice fails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product id, numeric or "gid://shopify/Product/…". |
| `option_id` | string | yes |  | Option ID. The option id, for example "gid://shopify/ProductOption/1064576516". Find it with get_product_details. |
| `name` | string | no |  | New Name. New option name, for example "Colour". |
| `position` | number | no |  | New Position. New position of the option, starting at 1. |
| `values_to_add` | array | no |  | Values to Add. New values for this option, for example ["Purple"]. |
| `values_to_rename` | array | no |  | Values to Rename. Existing values to rename. Each item: { `value_id`, `name` }. |
| `value_ids_to_delete` | array | no |  | Value IDs to Delete. Ids of option values to delete. |
| `variant_strategy` | string | no |  | Variant Strategy. How variants follow value changes. Leave empty for the Shopify default (leave variants as they are). One of `"LEAVE_AS_IS"`, `"MANAGE"`. |

Output fields:

- `id`: Product ID
- `legacy_resource_id`: Numeric ID
- `title`: Title
- `handle`: Handle
- `status`: Status
- `vendor`: Vendor
- `product_type`: Product Type
- `tags`: Tags
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `total_inventory`: Total Inventory (number)
- `tracks_inventory`: Tracks Inventory (boolean)
- `has_only_default_variant`: Has Only Default Variant (boolean)
- `variants_count`: Variants Count (number)
- `media_count`: Media Count (number)
- `min_price`: Min Price (number)
- `max_price`: Max Price (number)
- `currency_code`: Currency Code
- `featured_media_id`: Featured Media ID
- `featured_image_url`: Featured Image (image)
- `category_id`: Category ID
- `category_name`: Category Name
- `description_html`: Description (html)
- `template_suffix`: Template Suffix
- `seo_title`: SEO Title
- `seo_description`: SEO Description
- `is_gift_card`: Is Gift Card (boolean)
- `requires_selling_plan`: Requires Selling Plan (boolean)
- `options`: Options
- `options[].id`: Option ID
- `options[].name`: Name
- `options[].position`: Position (number)
- `options[].values`: Values
- `options[].values[].id`: Value ID
- `options[].values[].name`: Name
- `options[].values[].has_variants`: Has Variants (boolean)
- `variants`: Variants
- `variants[].id`: Variant ID
- `variants[].legacy_resource_id`: Numeric ID
- `variants[].title`: Title
- `variants[].display_name`: Display Name
- `variants[].sku`: SKU
- `variants[].barcode`: Barcode
- `variants[].barcodes`: Barcodes
- `variants[].barcodes[].value`: Barcode
- `variants[].barcodes[].type`: Type
- `variants[].price`: Price (number)
- `variants[].compare_at_price`: Compare-at Price (number)
- `variants[].position`: Position (number)
- `variants[].inventory_quantity`: Inventory Quantity (number)
- `variants[].inventory_policy`: Inventory Policy
- `variants[].available_for_sale`: Available for Sale (boolean)
- `variants[].taxable`: Taxable (boolean)
- `variants[].selected_options`: Selected Options
- `variants[].selected_options[].name`: Option
- `variants[].selected_options[].value`: Value
- `variants[].inventory_item_id`: Inventory Item ID
- `variants[].inventory_tracked`: Inventory Tracked (boolean)
- `variants[].requires_shipping`: Requires Shipping (boolean)
- `variants[].product_id`: Product ID
- `variants[].product_title`: Product Title
- `variants[].created_at`: Created At (datetime)
- `variants[].updated_at`: Updated At (datetime)
- `variants_has_more`: More Variants (boolean)
- `media`: Media
- `media[].id`: Media ID
- `media[].alt`: Alt Text
- `media[].media_content_type`: Media Type
- `media[].status`: Status
- `media[].image_url`: Image URL (image)
- `media[].width`: Width (number)
- `media[].height`: Height (number)
- `media[].mime_type`: MIME Type
- `media[].preview_url`: Preview Image (image)
- `media[].external_url`: External URL (url)
- `media[].filename`: Filename
- `media[].errors`: Errors
- `media_has_more`: More Media (boolean)
- `redacted_fields`: Redacted Fields

### `update_product_variants`

**Update Product Variants.** Changes one or many variants of the same product in one call; fields left empty are not sent and keep their values. All-or-nothing: if any variant is invalid, nothing is changed. Stock quantities are not changed here; use set_inventory_quantities or adjust_inventory_quantities. Variant ids come from list_product_variants. Re-running with the same values is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The product the variants belong to, numeric or "gid://shopify/Product/…". |
| `variants` | array | yes |  | Variants. The variants to change, one entry per variant. Fields left empty keep their values. Each item: { `variant_id`, `option_values`?, `price`?, `compare_at_price`?, `sku`?, `barcode`?, `barcode_type`?, `inventory_policy`?, `taxable`? }. |

Output fields:

- `product_id`: Product ID
- `variants`: Variants
- `variants[].id`: Variant ID
- `variants[].legacy_resource_id`: Numeric ID
- `variants[].title`: Title
- `variants[].display_name`: Display Name
- `variants[].sku`: SKU
- `variants[].barcode`: Barcode
- `variants[].barcodes`: Barcodes
- `variants[].barcodes[].value`: Barcode
- `variants[].barcodes[].type`: Type
- `variants[].price`: Price (number)
- `variants[].compare_at_price`: Compare-at Price (number)
- `variants[].position`: Position (number)
- `variants[].inventory_quantity`: Inventory Quantity (number)
- `variants[].inventory_policy`: Inventory Policy
- `variants[].available_for_sale`: Available for Sale (boolean)
- `variants[].taxable`: Taxable (boolean)
- `variants[].selected_options`: Selected Options
- `variants[].selected_options[].name`: Option
- `variants[].selected_options[].value`: Value
- `variants[].inventory_item_id`: Inventory Item ID
- `variants[].inventory_tracked`: Inventory Tracked (boolean)
- `variants[].requires_shipping`: Requires Shipping (boolean)
- `variants[].product_id`: Product ID
- `variants[].product_title`: Product Title
- `variants[].created_at`: Created At (datetime)
- `variants[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `redacted_fields`: Redacted Fields

### `update_script_tag`

**Update Script Tag.** Changes the src URL and/or the cache flag of one script tag and returns it; what you leave empty keeps its value. A new src makes every storefront page load a different script, so only use a URL the merchant explicitly asked for and trusts. The display scope is not changed. Repeating the same update leaves the same state. Needs the write_script_tags access scope. Shopify no longer lets many apps create or update script tags: if it answers "This app can't create or update script tags", do not retry; a theme app extension is needed instead. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `script_tag_id` | string | yes |  | Script Tag ID. The script tag id, numeric or "gid://shopify/ScriptTag/…". Find it with list_script_tags. |
| `src` | string | no |  | Script URL. New HTTPS URL of the JavaScript file. |
| `cache` | string | no |  | Cache. Yes serves the script from Shopify's CDN cache, No loads it from the source each time. Leave empty to keep the current setting. One of `"true"`, `"false"`. |

Output fields:

- `id`: Script Tag ID
- `legacy_resource_id`: Legacy Resource ID
- `src`: Script URL (url)
- `display_scope`: Display Scope
- `cache`: Cached (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `update_theme`

**Rename Theme.** Renames one theme and returns it; the name is the only theme setting this action changes; to make a theme the live theme use publish_theme instead. Renaming to the same name again leaves the same state. Shopify documents that modifying themes needs the write_themes access scope AND an exemption granted by Shopify; without the exemption the call is refused with an access error, so report that instead of retrying. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `theme_id` | string | yes |  | Theme ID. The theme id, numeric or "gid://shopify/OnlineStoreTheme/…". Find it with list_themes. |
| `name` | string | yes |  | New Name. The new theme name, for example "Dawn - holiday edit". |

Output fields:

- `id`: Theme ID
- `name`: Name
- `role`: Role
- `prefix`: Preview Prefix
- `processing`: Processing (boolean)
- `processing_failed`: Processing Failed (boolean)
- `theme_store_id`: Theme Store ID (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `update_url_redirect`

**Update URL Redirect.** Changes one URL redirect and returns it. Send a new path, a new target, or both; what you leave empty keeps its value. The change is live immediately. Repeating the same update leaves the same state. Needs the write_online_store_navigation access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url_redirect_id` | string | yes |  | URL Redirect ID. The redirect id, numeric or "gid://shopify/UrlRedirect/…". Find it with list_url_redirects. |
| `path` | string | no |  | Old Path. New path to redirect from, starting with "/". |
| `target` | string | no |  | Target. New target path or full URL. |

Output fields:

- `id`: URL Redirect ID
- `path`: Path
- `target`: Target
- `redacted_fields`: Redacted Fields

### `upsert_external_marketing_activity`

**Upsert External Marketing Activity.** Creates an external marketing activity (a campaign, ad or email run outside Shopify) or, when one with the same remote_id already exists, REPLACES it, and returns the activity. Replace means every optional field you leave empty is REMOVED from the existing activity (UTM values, budget, ad spend, schedule, preview image and so on), so always send the complete desired activity; to change only a few fields of an existing activity use update_external_marketing_activity instead. An activity with no hierarchy level must carry either the three UTM values or a url_parameter_value; UTM values, the URL parameter, the channel handle, the parent and the hierarchy level cannot be changed after creation. Repeating the same call leaves the same state. Report engagement numbers afterwards with create_marketing_engagement. Needs the write_marketing_events access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `remote_id` | string | yes |  | Remote ID. Your own unique id for this activity, for example "fb-campaign-2026-spring". The same remote id updates the same activity. |
| `title` | string | yes |  | Title. Name shown in the Shopify marketing section, for example "Spring sale Facebook ads". |
| `status` | string | yes |  | Status. Current state of the activity on the external platform. One of `"ACTIVE"`, `"INACTIVE"`, `"PAUSED"`, `"SCHEDULED"`, `"DELETED_EXTERNALLY"`, `"UNDEFINED"`. |
| `remote_url` | string | yes |  | Remote URL. URL where the merchant manages this activity on the external platform, for example "https://ads.example.com/campaigns/42". |
| `tactic` | string | yes |  | Tactic. The kind of marketing, for example AD, NEWSLETTER or POST. One of `"ABANDONED_CART"`, `"AD"`, `"AFFILIATE"`, `"LINK"`, `"LOYALTY"`, `"MESSAGE"`, `"NEWSLETTER"`, `"NOTIFICATION"`, `"POST"`, `"RETARGETING"`, `"TRANSACTIONAL"`, `"STOREFRONT_APP"`, `"SEO"`. |
| `marketing_channel_type` | string | yes |  | Channel Type. The channel the activity runs on. One of `"SEARCH"`, `"DISPLAY"`, `"SOCIAL"`, `"EMAIL"`, `"REFERRAL"`. |
| `utm_campaign` | string | no |  | UTM Campaign. utm_campaign value of the activity links, for example "spring-sale". Set all three UTM values or none. Cannot be changed later. |
| `utm_source` | string | no |  | UTM Source. utm_source value, for example "facebook". |
| `utm_medium` | string | no |  | UTM Medium. utm_medium value, for example "cpc". |
| `url_parameter_value` | string | no |  | URL Parameter Value. Value of the tracking URL parameter used instead of UTM values. Cannot be changed later. |
| `hierarchy_level` | string | no |  | Hierarchy Level. Optional level when the activity is part of a campaign tree (CAMPAIGN, AD_GROUP or AD). Cannot be changed later. One of `"CAMPAIGN"`, `"AD_GROUP"`, `"AD"`. |
| `parent_remote_id` | string | no |  | Parent Remote ID. Remote id of the parent activity in the campaign tree. Cannot be changed later. |
| `channel_handle` | string | no |  | Channel Handle. Handle of the sales channel the activity belongs to, if your partner manager gave you one. Cannot be changed later. |
| `referring_domain` | string | no |  | Referring Domain. Domain visitors arrive from, for example "facebook.com". |
| `remote_preview_image_url` | string | no |  | Preview Image URL. Public URL of a preview image of the ad or email. |
| `budget_type` | string | no |  | Budget Type. DAILY or LIFETIME. Set together with the budget amount. One of `"DAILY"`, `"LIFETIME"`. |
| `budget_amount` | number | no |  | Budget Amount. Budget total, for example 500 for 500.00, in the currency below. |
| `ad_spend_amount` | number | no |  | Ad Spend. Amount spent so far, in the currency below. |
| `currency` | string | no |  | Currency. ISO currency code of the budget and ad spend, for example "USD". Needed when either is set. |
| `scheduled_start` | ISO date-time string | no |  | Scheduled Start. Planned start time, ISO 8601. |
| `scheduled_end` | ISO date-time string | no |  | Scheduled End. Planned end time, ISO 8601. |
| `start` | ISO date-time string | no |  | Actual Start. When the activity really started, ISO 8601. |
| `end` | ISO date-time string | no |  | Actual End. When the activity really ended, ISO 8601. |

Output fields:

- `id`: Marketing Activity ID
- `title`: Title
- `status`: Status
- `status_label`: Status Label
- `tactic`: Tactic
- `marketing_channel_type`: Channel Type
- `source_and_medium`: Source and Medium
- `is_external`: Is External (boolean)
- `hierarchy_level`: Hierarchy Level
- `parent_remote_id`: Parent Remote ID
- `parent_activity_id`: Parent Activity ID
- `url_parameter_value`: URL Parameter Value
- `activity_list_url`: Activity List URL (url)
- `utm_campaign`: UTM Campaign
- `utm_source`: UTM Source
- `utm_medium`: UTM Medium
- `budget_type`: Budget Type
- `budget_amount`: Budget Amount (number)
- `budget_currency_code`: Budget Currency
- `ad_spend_amount`: Ad Spend Amount (number)
- `ad_spend_currency_code`: Ad Spend Currency
- `marketing_event_id`: Marketing Event ID
- `remote_id`: Remote ID
- `manage_url`: Manage URL (url)
- `preview_url`: Preview URL (url)
- `started_at`: Started At (datetime)
- `ended_at`: Ended At (datetime)
- `scheduled_to_end_at`: Scheduled To End At (datetime)
- `status_transitioned_at`: Status Changed At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `upsert_metaobject`

**Create or Update Metaobject Entry.** Creates or updates one metaobject entry keyed by type + handle: when no entry of that type has the handle it is created, otherwise it is updated. Only the fields you send are written; every other field keeps its current value (a patch, never a full replacement), so send just the keys you want to change. Field keys come from the type's definition (list_metaobject_definitions); values are strings, with lists and references as JSON strings. status (DRAFT or ACTIVE) and template_suffix are sent only when you set them; they apply only to types with the publishable or online store capability, and a new entry otherwise gets Shopify's default status. Sending the same values again leaves the same state. Needs the write_metaobjects access scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Metaobject Type. The metaobject definition type, for example "designer". Find it with list_metaobject_definitions. |
| `handle` | string | yes |  | Handle. Unique handle of the entry within its type, for example "ada-lovelace". Reusing an existing handle updates that entry. |
| `fields` | array | no |  | Fields. Field values to write; fields you leave out keep their current values. Each item: { `key`, `value` }. |
| `status` | string | no |  | Status. DRAFT hides the entry from the storefront, ACTIVE shows it. Only for publishable types; leave empty to keep the current status. One of `"DRAFT"`, `"ACTIVE"`. |
| `template_suffix` | string | no |  | Template Suffix. Online store template suffix for the entry's page. Only for types with the online store capability. |

Output fields:

- `id`: Metaobject ID
- `type`: Type
- `handle`: Handle
- `display_name`: Display Name
- `status`: Status
- `template_suffix`: Template Suffix
- `definition_id`: Definition ID
- `definition_name`: Definition Name
- `fields`: Fields
- `fields[].key`: Key
- `fields[].type`: Type
- `fields[].value`: Value
- `values`: Values (an object whose keys vary)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `redacted_fields`: Redacted Fields

### `upsert_theme_files`

**Create or Update Theme Files.** Writes up to 50 files into one theme: a file that does not exist is created, and a file with the same path is overwritten completely (its previous content is not returned, so read it first with get_theme_file if you may need it). Writing to the live theme (role MAIN, see get_theme) changes the storefront immediately; say so before doing it, and prefer an unpublished copy. Returns the written files and, when Shopify finishes the write in the background, a job_id to poll with get_job. Sending the same files again leaves the same content. Shopify documents that modifying theme files needs the write_themes access scope AND an exemption granted by Shopify; without the exemption the call is refused with an access error, so report that instead of retrying. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `theme_id` | string | yes |  | Theme ID. The theme id, numeric or "gid://shopify/OnlineStoreTheme/…". Find it with list_themes. |
| `files` | array | yes |  | Files. One entry per file, 1 to 50, each path at most once. Each item: { `filename`, `body_type`, `value` }. |

Output fields:

- `theme_id`: Theme ID
- `files`: Files
- `files[].filename`: Filename
- `files[].size`: Size (filesize)
- `files[].checksum_md5`: Checksum MD5
- `files[].created_at`: Created At (datetime)
- `files[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `job_id`: Job ID
- `job_done`: Job Done (boolean)
- `redacted_fields`: Redacted Fields

### `void_order_transaction`

**Void Payment Authorization.** Changes payment state: voids an authorization that has not been captured, releasing the hold on the customer's card so it can no longer be captured. Needs the AUTHORIZATION transaction id from list_order_transactions. Use create_refund instead for money that was already captured. Cannot be undone; a repeat call fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent_transaction_id` | string | yes |  | Authorization Transaction ID. The AUTHORIZATION transaction to void, numeric or "gid://shopify/OrderTransaction/…". Find it with list_order_transactions. |

Output fields:

- `id`: Transaction ID
- `kind`: Kind
- `status`: Status
- `gateway`: Gateway
- `formatted_gateway`: Formatted Gateway
- `test`: Test (boolean)
- `amount`: Amount (number)
- `currency_code`: Currency Code
- `total_unsettled`: Total Unsettled (number)
- `maximum_refundable`: Maximum Refundable (number)
- `manually_capturable`: Manually Capturable (boolean)
- `multi_capturable`: Multi Capturable (boolean)
- `authorization_expires_at`: Authorization Expires At (datetime)
- `error_code`: Error Code
- `payment_id`: Payment ID
- `parent_transaction_id`: Parent Transaction ID
- `order_id`: Order ID
- `order_name`: Order Name
- `created_at`: Created At (datetime)
- `processed_at`: Processed At (datetime)
- `redacted_fields`: Redacted Fields

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

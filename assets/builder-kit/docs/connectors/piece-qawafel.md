# Qawafel

B2B marketplace and ZATCA-compliant document platform — sync products, orders, merchants and invoices with Saudi Arabia's leading wholesale network.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-qawafel'
  version: '0.1.0'
```

Categories: COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> **How to get your Qawafel API Key:**
>
> 1. Sign in to your [Qawafel dashboard](https://qawafel.sa).
> 2. Open **Settings → Developers → API Keys**.
> 3. Click **Create API Key**, give it a name (e.g. "Activepieces") and copy the key.
> 4. Paste the key below. Keep it secret — anyone with the key can read and write your Qawafel data.
>
> **Environment:**
>
> - **Production** — live Qawafel tenant at `core.qawafel.sa`.
> - **Development** — sandbox tenant at `core.development.qawafel.dev` for testing without touching live data.
>
> API keys are scoped to a single environment. Pick the same one the key was created in.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `environment` | string | yes | `"production"` | Environment. Pick the Qawafel environment your API key belongs to. One of `"production"`, `"development"`. |
| `apiKey` | string | yes |  | API Key. Your Qawafel API key. |

## Actions

### `create_product`

**Create Product.** Creates a new product in the Qawafel catalog, in either Sale mode (something you sell) or Purchase mode (something bought from a supplier, which requires a supplier merchant id). Use when syncing a product from an external ERP or storefront into Qawafel; requires a SKU unique within the tenant plus English and Arabic names and a unit price. Not idempotent: each call creates a new product. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes | `"sale"` | Product Type. Pick **Sale** if this is a product you sell. Pick **Purchase** if it is a product you buy from a supplier (you must also pick the supplier below). One of `"sale"`, `"purchase"`. |
| `sku` | string | yes |  | SKU. Stock Keeping Unit — your unique product code. Must be unique within your Qawafel tenant. |
| `name_en` | string | yes |  | Name (English). Product name in English. Shown on invoices and quotations. |
| `name_ar` | string | yes |  | Name (Arabic). Product name in Arabic. Required by Qawafel for ZATCA-compliant invoices. |
| `unit_price` | string | yes |  | Unit Price (SAR). Default price per unit in Saudi Riyals as a decimal string with two places, e.g. `99.00` or `1234.56`. |
| `supplier_id` | string | no |  | Supplier. Required when **Product Type** is `Purchase`. Pick the supplier merchant this product is bought from. Leave blank for `Sale` products. A value the product loads from the provider, such as an id; write the value itself. |
| `is_taxable` | boolean | no | `true` | VAT Applies. Tick this if 15% VAT applies to this product. Untick for VAT-exempt items. |
| `description_en` | string | no |  | Description (English). Optional. Longer description shown on documents. |
| `description_ar` | string | no |  | Description (Arabic). Optional. Longer description in Arabic. |
| `barcode` | string | no |  | Barcode. Optional. UPC, EAN or GTIN barcode. |
| `is_active` | boolean | no | `true` | Active. Active products show up in lookups and can be sold. Untick to soft-disable. |
| `external_ref` | string | no |  | Your Reference ID. Optional. Store an ID from another system here (e.g. your ERP record ID) to link records across systems. Must be unique within Qawafel. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. A UUID v4 — if the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `update_product`

**Update Product.** Updates an existing product identified by its Qawafel product id, applying a partial patch of price, English/Arabic description, or active state — fields left blank are unchanged. Use when modifying a known product rather than creating one. Idempotent: re-applying the same patch leaves the product in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product to update. Pick the product you want to change. Only the 100 most recent products are listed — use "List Products" if you need to find an older one. A value the product loads from the provider, such as an id; write the value itself. |
| `unit_price` | string | no |  | New Unit Price (SAR). Optional. New price per unit as a decimal string, e.g. `129.00`. Leave blank to keep the current price. |
| `description_en` | string | no |  | New Description (English). Optional. New English description. Leave blank to keep the current one. |
| `description_ar` | string | no |  | New Description (Arabic). Optional. New Arabic description. Leave blank to keep the current one. |
| `is_active` | boolean | no |  | Active. Optional. Tick to keep the product active, untick to soft-disable. Leave blank to keep the current value. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. A UUID v4 — if the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `get_product`

**Get Product.** Retrieves a single product by its Qawafel product id (the `prod_` identifier). Use when you already have a product id — from a list, trigger, or earlier step — and need its current details. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The Qawafel product ID (starts with `prod_`). You can find this on a product page in Qawafel, in the output of "List Products", or from a webhook trigger. |

### `list_products`

**List Products.** Lists products from the Qawafel catalog (up to 500). Use to browse or look up products: leave all filters blank to fetch every product, or narrow by type (sale/purchase), supplier id, active status, creation date, or an exact SKU to resolve a single product. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no |  | Product Type (filter). Optional. `Sale` returns products you sell. `Purchase` returns products you buy from suppliers. Leave blank to return both. One of `"sale"`, `"purchase"`. |
| `sku` | string | no |  | SKU (filter). Optional. Return only the product with this exact SKU (case-sensitive). |
| `supplier_id` | string | no |  | Supplier ID (filter). Optional. Only applies when filtering Purchase products. Pass a merchant ID (starts with `mer_`). |
| `is_active` | boolean | no |  | Active only. Tick to return only active products, untick for inactive only. Leave blank to return both. |
| `created_after` | ISO date-time string | no |  | Created after. Optional. Return only products created after this date and time. |

### `create_order`

**Create Completed Order.** Imports an already-completed order into Qawafel directly in Fulfilled state, skipping the normal confirm/pick/deliver workflow — meant for backfilling historical or externally-fulfilled orders, not for orders that still need to move through fulfilment. Requires a customer merchant id, line items, and a delivery address. Not idempotent: each call creates a new order. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `merchant_id` | string | yes |  | Customer. The customer placing the order. Pick from your existing customer merchants — use "Create Merchant" first if they are new. A value the product loads from the provider, such as an id; write the value itself. |
| `line_items` | array | yes |  | Line Items. One row per product on this order. Each row needs a product, quantity, and unit price. Each item: { `product_id`, `quantity`, `unit_price`, `discount_percentage`?, `external_ref`? }. |
| `address_line` | string | yes |  | Delivery Address — Street. Street address line for delivery. |
| `city` | string | yes |  | Delivery Address — City. |
| `postal_code` | string | yes |  | Delivery Address — Postal Code. Postal code (5 digits in Saudi Arabia). |
| `country` | string | yes | `"SA"` | Delivery Address — Country. ISO 3166-1 alpha-2 country code, e.g. `SA` for Saudi Arabia, `AE` for the UAE. |
| `district` | string | no |  | Delivery Address — District. Optional. Neighborhood or district name. |
| `region` | string | no |  | Delivery Address — Region. Optional. Province or region name. |
| `short_address` | string | no |  | Saudi Short Address. Optional. The Saudi National Address short code (4 uppercase letters + 4 digits, e.g. `RHRA1234`). |
| `delivery_option` | string | no |  | Delivery Method. Pick **Vendor** if you (the seller) deliver yourself, or **Courier** to use a delivery service. One of `"vendor"`, `"courier"`. |
| `delivery_fees` | string | no |  | Delivery Fees (SAR). Optional. Delivery fees as a decimal string, e.g. `15.00`. Required if you set a delivery method. |
| `delivery_fees_payer` | string | no |  | Who Pays Delivery. Required if you set a delivery method. Pick **Customer** to bill the buyer, or **Vendor** to absorb the fee. One of `"customer"`, `"vendor"`. |
| `notes` | string | no |  | Notes. Optional. Internal notes attached to the order. |
| `external_ref` | string | no |  | Your Reference ID. Optional. Store an ID from another system here (e.g. your ERP record ID) to link records across systems. Must be unique within Qawafel. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. A UUID v4 — if the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `update_order_status`

**Update Order Status.** Advances an order (by its `ord_` id) to the next fulfilment status via a chosen transition (e.g. confirm, ready for pickup, out for delivery, delivered, fulfilled). Qawafel enforces a strict state machine and rejects transitions invalid from the current state; the Not Delivered transition requires a reason. Use to progress an order; for cancellation use the Cancel Order action. Not idempotent: each call mutates the order state. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The Qawafel order ID (starts with `ord_`). Get it from a webhook trigger, "List Orders", or your dashboard. Once you fill this in, the dropdown below only shows transitions valid for this order's current state. |
| `transition` | string | yes |  | New Status. Pick the next status. Only states reachable from the order's current state appear here. Workflow: Pending → Confirmed → Ready for Pickup → Out for Delivery → Delivered → Fulfilled. A value the product loads from the provider, such as an id; write the value itself. |
| `reason` | string | no |  | Reason (only used when marking Not Delivered). Required when **New Status** is "Mark Not Delivered" — explains why delivery failed (max 500 characters). Ignored for all other transitions. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. A UUID v4 — if the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `cancel_order`

**Cancel Order.** Cancels an open order by its `ord_` id, optionally recording a cancellation reason. This is terminal — a cancelled order cannot be reopened, only replaced by a new one. Use specifically to cancel; to advance an order use Update Order Status. Not idempotent: it mutates order state and will fail if the order is not in a cancellable state. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The Qawafel order ID (starts with `ord_`) you want to cancel. |
| `reason` | string | no |  | Cancellation Reason. Optional but recommended. A short note explaining why the order is being cancelled (max 500 characters). |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. A UUID v4 — if the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `get_order`

**Get Order.** Retrieves a single order by its Qawafel order id (the `ord_` identifier), including line items, totals, delivery details, and current state. Use when you have an order id and need its current details, e.g. to check status before acting. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The Qawafel order ID (starts with `ord_`). You can get this from a trigger, the "List Orders" action, or your dashboard. |

### `list_orders`

**List Orders.** Lists orders (up to 500). Use to browse or search orders: leave filters blank for all, or narrow by order state, customer merchant id, or creation date. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `state` | string | no |  | Status (filter). Optional. Return only orders in this state. Leave blank for all statuses. One of `"pending_vendor_confirmation"`, `"pending_customer_confirmation"`, `"confirmed"`, `"ready_for_pickup"`, `"picked_up_by_courier"`, `"received_in_warehouse"`, `"under_fulfillment"`, `"ready_to_dispatch"`, `"out_for_delivery"`, `"delivered"`, `"not_delivered"`, `"fulfilled"`, `"cancelled_by_vendor"`, `"cancelled_by_admin"`, `"cancelled_by_customer"`. |
| `merchant_id` | string | no |  | Customer (filter). Optional. Return only orders from this customer. Leave blank for all customers. A value the product loads from the provider, such as an id; write the value itself. |
| `created_after` | ISO date-time string | no |  | Created After. Optional. Return only orders created after this date and time. |

### `create_merchant`

**Create Merchant (Customer or Supplier).** Creates a new merchant in the Qawafel tenant as either a Customer (buys from you) or a Supplier (you buy from them). Use when onboarding a B2B partner; requires legal name, English/Arabic trade names, contact email and phone, a Commercial Registration number, a VAT number, and a full address. Not idempotent: each call creates a new merchant. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes | `"customer"` | Merchant Type. Pick **Customer** if this party buys from you, or **Supplier** if you buy from them. One of `"customer"`, `"supplier"`. |
| `legal_name` | string | yes |  | Legal Name. The official registered company name as it appears on the commercial registration. |
| `name_en` | string | yes |  | Trade Name (English). The trade or store name in English. Shown on documents and dashboards. |
| `name_ar` | string | yes |  | Trade Name (Arabic). The trade or store name in Arabic. Required by Qawafel for ZATCA-compliant invoices. |
| `email` | string | yes |  | Email. Primary contact email for this merchant. |
| `phone` | string | yes |  | Phone. Primary phone number, including country code (e.g. `+966500000000`). |
| `cr_number` | string | yes |  | Commercial Registration (CR) Number. 10-digit Saudi Commercial Registration number. |
| `vat_number` | string | yes |  | VAT Number. Optional. 15-digit VAT registration number, starts with `3`. Required if the merchant is VAT-registered. |
| `unified_national_number` | string | no |  | Unified National Number. Optional. Saudi Unified National Number (الرقم الوطني الموحد), 10 digits starting with `7`. |
| `is_taxable` | boolean | no | `true` | VAT Registered. Tick if this merchant is registered for VAT. Affects how invoices to/from them are calculated. |
| `address_line` | string | yes |  | Address — Street. |
| `city` | string | yes |  | Address — City. |
| `postal_code` | string | yes |  | Address — Postal Code. Postal code (5 digits in Saudi Arabia). |
| `country` | string | yes | `"SA"` | Address — Country. ISO 3166-1 alpha-2 country code, e.g. `SA` for Saudi Arabia. |
| `district` | string | no |  | Address — District. Optional. |
| `region` | string | no |  | Address — Region. Optional. |
| `short_address` | string | no |  | Saudi Short Address. Optional. National Address short code (4 letters + 4 digits, e.g. `RHRA1234`). |
| `external_ref` | string | no |  | Your Reference ID. Optional. Store an ID from another system here (e.g. your ERP record ID) to link records across systems. Must be unique within Qawafel. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. A UUID v4 — if the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `update_merchant`

**Update Merchant.** Updates an existing merchant identified by its Qawafel merchant id, applying a partial patch of English/Arabic trade name or active state — fields left blank are unchanged. Identity fields (legal name, CR, VAT) cannot be changed here. Idempotent: re-applying the same patch leaves the merchant in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `merchant_id` | string | yes |  | Merchant to update. Pick the merchant to update. Use "Create Merchant" first if they are not yet in Qawafel. A value the product loads from the provider, such as an id; write the value itself. |
| `name_en` | string | no |  | New Trade Name (English). Optional. Leave blank to keep the current name. |
| `name_ar` | string | no |  | New Trade Name (Arabic). Optional. Leave blank to keep the current name. |
| `is_active` | boolean | no |  | Active. Optional. Tick to keep the merchant active, untick to disable. Leave blank to keep the current value. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. A UUID v4 — if the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `create_invoice`

**Create Invoice.** Creates a draft invoice in Qawafel for a customer merchant, with line items, issue and due dates, and an optional linked order id. The invoice starts in draft and must be finalized separately to issue a ZATCA-compliant copy. Requires the customer merchant id, issue/due dates, and line items. Not idempotent: each call creates a new invoice. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `merchant_id` | string | yes |  | Customer. The customer being invoiced. A value the product loads from the provider, such as an id; write the value itself. |
| `issue_date` | ISO date-time string | yes |  | Issue Date. The date the invoice is issued. Use today for most cases. (YYY-MM-DD format) |
| `due_date` | ISO date-time string | yes |  | Due Date. When payment is due. (YYY-MM-DD format) |
| `line_items` | array | yes |  | Line Items. One row per product on this invoice. Each row needs a product, quantity, unit price, and VAT %. Each item: { `product_id`, `quantity`, `unit_price`, `vat_percentage`, `discount_percentage`?, `external_ref`? }. |
| `order_id` | string | no |  | Linked Order ID. Optional. The Qawafel order ID (`ord_…`) this invoice is for. Linking helps track fulfilment-to-billing. |
| `shipping_fees` | string | no |  | Shipping Fees (SAR). Optional. Delivery / shipping fees as a decimal string excluding VAT, e.g. `25.00`. Defaults to `0.00`. |
| `payment_start_date` | ISO date-time string | no |  | Payment Window Start. Optional. When the payment terms begin. (YYY-MM-DD format) |
| `payment_due_date` | ISO date-time string | no |  | Final Payment Due Date. Optional. The absolute final date payment is due (used for late-payment workflows). (YYY-MM-DD format) |
| `notes` | string | no |  | Notes. Optional. Notes printed on the invoice or kept internal. |
| `external_ref` | string | no |  | Your Reference ID. Optional. Store an ID from another system here (e.g. your ERP record ID) to link records across systems. Must be unique within Qawafel. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. A UUID v4 — if the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `get_invoice`

**Get Invoice.** Retrieves a single invoice by its Qawafel invoice id (the `inv_` identifier), including line items, totals, current state, and the ZATCA PDF URL. Use when you have an invoice id and need its current details or the PDF link. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice_id` | string | yes |  | Invoice ID. The Qawafel invoice ID (starts with `inv_`). Find this in a webhook payload, the "List Invoices" action, or the dashboard. |

### `list_invoices`

**List Invoices.** Lists invoices (up to 500). Use to browse or search invoices: leave filters blank for all, or narrow by invoice state (draft, pushed, sent, paid, rejected, void), customer merchant id, or creation date. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `state` | string | no |  | Status (filter). Optional. Return only invoices in this state. Leave blank for all statuses. One of `"draft"`, `"pushed"`, `"sent"`, `"paid"`, `"rejected"`, `"void"`. |
| `merchant_id` | string | no |  | Customer (filter). Optional. Return only invoices for this customer. Leave blank for all customers. A value the product loads from the provider, such as an id; write the value itself. |
| `created_after` | ISO date-time string | no |  | Created After. Optional. Return only invoices created after this date and time. |

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

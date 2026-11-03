# Shippo

Multi-carrier shipping platform for real-time rates, labels, and tracking

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-shippo'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> Your Shippo API token

## Actions

### `create_order`

**Create Order.** Creates a new order record in Shippo with recipient address, totals, and optional sender address and line items. Use to register an incoming purchase before generating shipments or labels. Requires order number, recipient address, total price, currency, order date, and total package weight; a single line item can be passed via the flat item fields and more via the additional line items JSON array. Not idempotent: each call creates a separate order even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_number` | string | yes |  | Order Number. Custom reference number for the order. |
| `order_status` | string | yes | `"AWAITPAY"` | Order Status. Current status of the order. One of `"UNKNOWN"`, `"AWAITPAY"`, `"PAID"`, `"REFUNDED"`, `"CANCELLED"`, `"PARTIALLY_FULFILLED"`, `"SHIPPED"`. |
| `placed_at` | ISO date-time string | yes |  | Order Date. When the order was placed by the buyer (mandatory) - Format: 2025-10-31T11:56:29.244Z. |
| `total_price` | string | yes |  | Total Price. Total price including shipping and tax. |
| `subtotal_price` | string | no |  | Subtotal Price. Price before shipping and tax (optional) |
| `total_tax` | string | no |  | Total Tax. Total tax amount. |
| `currency` | string | yes | `"USD"` | Currency. Currency code (e.g., USD, EUR) |
| `from_name` | string | no |  | Sender Name. Name of the sender. |
| `from_company` | string | no |  | Sender Company. Company name of the sender. |
| `from_street1` | string | no |  | Sender Street Address. Street address line 1. |
| `from_city` | string | no |  | Sender City. City. |
| `from_state` | string | no |  | Sender State. State/Province. |
| `from_zip` | string | no |  | Sender ZIP Code. ZIP/Postal code. |
| `from_country` | string | no | `"US"` | Sender Country. Two-letter country code (e.g., US) |
| `from_phone` | string | no |  | Sender Phone. |
| `from_email` | string | no |  | Sender Email. |
| `to_name` | string | yes |  | Recipient Name. Name of the recipient. |
| `to_company` | string | no |  | Recipient Company. Company name of the recipient. |
| `to_street1` | string | yes |  | Recipient Street Address. Street address line 1. |
| `to_city` | string | yes |  | Recipient City. City. |
| `to_state` | string | yes |  | Recipient State. State/Province. |
| `to_zip` | string | yes |  | Recipient ZIP Code. ZIP/Postal code. |
| `to_country` | string | yes | `"US"` | Recipient Country. Two-letter country code (e.g., US) |
| `to_phone` | string | no |  | Recipient Phone. |
| `to_email` | string | no |  | Recipient Email. |
| `line_item_title` | string | no |  | Item Title. Name/description of the item (optional) |
| `line_item_quantity` | number | no | `1` | Item Quantity. |
| `line_item_total_price` | string | no |  | Item Total Price. Total price for this line item (quantity × unit price) |
| `line_item_sku` | string | no |  | Item SKU. Stock keeping unit. |
| `line_item_weight` | string | no |  | Item Weight. Weight of a single item (e.g., "0.5") |
| `line_item_weight_unit` | string | no | `"lb"` | Item Weight Unit. One of `"lb"`, `"oz"`, `"kg"`, `"g"`. |
| `weight` | string | yes |  | Total Package Weight. Total weight of the package for shipping (e.g., "2.5") |
| `weight_unit` | string | no | `"lb"` | Package Weight Unit. Unit for total package weight. One of `"lb"`, `"oz"`, `"kg"`, `"g"`. |
| `shipping_cost` | string | no |  | Shipping Cost. Shipping cost amount (e.g., "5.99") |
| `shipping_cost_currency` | string | no | `"USD"` | Shipping Cost Currency. Currency for shipping cost. |
| `shipping_method` | string | no |  | Shipping Method. Shipping method name (e.g., "USPS First Class Package") - optional. |
| `additional_line_items` | JSON | no | `[]` | Additional Line Items. Additional line items in JSON format. Example: [{"title": "Product 2", "quantity": 2, "total_price": "20.00"}]. |

### `find_order`

**Find Order.** Retrieves a single Shippo order by its object ID. Use to look up the full details of a known order. Requires the exact order ID; it does not search by order number or other fields. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. The ID of the order to find. |

### `find_shipping_label`

**Find Shipping Label.** Retrieves a single Shippo shipping label (transaction) by its object ID, including tracking number and label/document URLs. Use to look up a known label. Requires the exact label ID; it does not search by tracking number or other fields. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label_id` | string | yes |  | Label ID. The ID of the shipping label to find. |

# Katana

Katana is a cloud-based manufacturing ERP software for inventory, production, and order management.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-katana'
  version: '0.2.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To generate your API key:
>
> 1. Log in to your Katana account
> 2. Go to **Settings > API**
> 3. Select **Add new API key**
> 4. Copy and paste the key here

## Actions

### `create_customer`

**Create Customer.** Creates a new customer record in the Katana manufacturing ERP, optionally with billing/shipping addresses. Use when registering a new customer; only the display name is required. Not idempotent — each call creates a separate customer, so look the customer up first if you need to avoid duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Customer display name. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `company` | string | no |  | Company. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `currency` | string | no |  | Currency. Currency code (ISO 4217), e.g. USD, EUR, GBP. |
| `reference_id` | string | no |  | Reference ID. External reference ID (max 100 characters). |
| `category` | string | no |  | Category. Customer category (max 100 characters). |
| `comment` | string | no |  | Comment. Additional notes about the customer. |
| `discount_rate` | number | no |  | Discount Rate. Default discount rate for this customer. |
| `addresses` | array | no |  | Addresses. Each item: { `entity_type`, `default`?, `first_name`?, `last_name`?, `company`?, `phone`?, `line_1`?, `line_2`?, `city`?, `state`?, `zip`?, `country`? }. |

### `create_sales_order`

**Create Sales Order.** Creates a sales order (or quote, when status is PENDING) in the Katana manufacturing ERP for an existing customer. Use when placing an order; it requires an order number, a customer ID, and at least one line item (the primary product variant plus quantity), with extra line items optionally passed as a JSON array. Not idempotent — each call creates a new order, so a repeated call yields a duplicate unless the order number is rejected as already used. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_no` | string | yes |  | Order Number. Unique order number. |
| `customer_id` | string | yes |  | Customer. Select the customer. A value the product loads from the provider, such as an id; write the value itself. |
| `variant_id` | string | yes |  | Product Variant. Select the product variant. A value the product loads from the provider, such as an id; write the value itself. |
| `quantity` | number | yes |  | Quantity. Quantity for the product variant. |
| `price_per_unit` | number | no |  | Price Per Unit. Override price per unit. |
| `total_discount` | number | no |  | Total Discount. Discount amount for this line. |
| `tax_rate_id` | string | no |  | Tax Rate. A value the product loads from the provider, such as an id; write the value itself. |
| `additional_order_rows` | JSON | no |  | Additional Order Lines (JSON). Add more line items as JSON array. Each object needs: variant_id, quantity. Optional: price_per_unit, total_discount, tax_rate_id, location_id. |
| `status` | string | no |  | Status. Order status. Use PENDING for quotes. One of `"NOT_SHIPPED"`, `"PENDING"`. |
| `location_id` | string | no |  | Location. A value the product loads from the provider, such as an id; write the value itself. |
| `currency` | string | no |  | Currency. Currency code (ISO 4217), e.g. USD, EUR. |
| `order_created_date` | ISO date-time string | no |  | Order Created Date. |
| `delivery_date` | ISO date-time string | no |  | Delivery Date. |
| `customer_ref` | string | no |  | Customer Reference. Customer reference number (max 255 characters). |
| `additional_info` | string | no |  | Additional Info. Additional notes for this order. |
| `tracking_number` | string | no |  | Tracking Number. Shipping tracking number (max 256 characters). |
| `tracking_number_url` | string | no |  | Tracking URL. URL to track the shipment. |
| `addresses` | array | no |  | Addresses. Each item: { `entity_type`, `first_name`?, `last_name`?, `company`?, `phone`?, `line_1`?, `line_2`?, `city`?, `state`?, `zip`?, `country`? }. |
| `ecommerce_order_type` | string | no |  | E-commerce Order Type. Source platform (e.g. shopify). |
| `ecommerce_store_name` | string | no |  | E-commerce Store Name. Store identifier. |
| `ecommerce_order_id` | string | no |  | E-commerce Order ID. External order ID from the e-commerce platform. |

### `find_customer`

**Find Customer.** Searches customers in the Katana manufacturing ERP, filtering by any combination of name, first/last name, company, email, phone, currency, reference ID, or category; with no filters set it lists all customers (paginated). Use to look up a customer ID before creating an order, to check whether a customer already exists, or to browse the customer list. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Filters customers by name. |
| `first_name` | string | no |  | First Name. Filters customers by first name. |
| `last_name` | string | no |  | Last Name. Filters customers by last name. |
| `company` | string | no |  | Company. Filters customers by company. |
| `email` | string | no |  | Email. Filters customers by email. |
| `phone` | string | no |  | Phone. Filters customers by phone number. |
| `currency` | string | no |  | Currency. Filters customers by currency. |
| `reference_id` | string | no |  | Reference ID. Filters customers by reference ID. |
| `category` | string | no |  | Category. Filters customers by category. |
| `include_deleted` | boolean | no |  | Include Deleted. Include soft-deleted customers in results. |
| `limit` | number | no |  | Limit. Maximum number of results to return (default is 50). |
| `page` | number | no |  | Page. Page number for pagination (default is 1). |

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

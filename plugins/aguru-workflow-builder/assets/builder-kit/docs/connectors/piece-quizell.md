# Quizell

Quiz-based product recommendation and lead capture platform.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-quizell'
  version: '0.1.0'
```

Categories: MARKETING, COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> To get your Quizell API token:
> 1. Log in to your [Quizell](https://quizell.com) account.
> 2. Go to **Settings** in the left sidebar.
> 3. Navigate to **API & Integrations**.
> 4. Copy your API token from there.
>
> Need help? See [Quizell API Docs](https://docs.quizell.com).

## Actions

### `create_customer`

**Create Customer.** Creates a new customer (quiz lead) in Quizell, attached to a specific quiz. Use when capturing a new lead or contact from a quiz response. Requires a quiz_id and email; not idempotent — each call creates another customer record even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `quiz_id` | string | yes |  | Quiz ID. The ID of the quiz this customer responded to. Find it in your Quizell dashboard under the quiz settings URL (e.g. the number at the end of quizell.com/quiz/12345). |
| `email` | string | yes |  | Email Address. The customer's email address. |
| `first_name` | string | no |  | First Name. The customer's first name. |
| `last_name` | string | no |  | Last Name. The customer's last name. |
| `phone` | string | no |  | Phone Number. The customer's phone number (e.g. +1-555-123-4567). |
| `country` | string | no |  | Country. The customer's country (e.g. United States). |
| `city` | string | no |  | City. The customer's city. |
| `address` | string | no |  | Address. The customer's street address. |
| `note` | string | no |  | Note. An internal note about this customer. |

### `update_customer`

**Update Customer.** Updates an existing Quizell customer (quiz lead), identified by customer_id. Use when correcting or enriching a known customer record; requires customer_id, quiz_id, and email. Idempotent — re-sending the same fields leaves the record in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The ID of the customer to update. Use the "List Customers" or "Get Customer" actions to find this ID. |
| `quiz_id` | string | yes |  | Quiz ID. The ID of the quiz associated with this customer. |
| `email` | string | yes |  | Email Address. The customer's email address. |
| `first_name` | string | no |  | First Name. The customer's first name. |
| `last_name` | string | no |  | Last Name. The customer's last name. |
| `phone` | string | no |  | Phone Number. The customer's phone number (e.g. +1-555-123-4567). |
| `country` | string | no |  | Country. The customer's country. |
| `city` | string | no |  | City. The customer's city. |
| `address` | string | no |  | Address. The customer's street address. |
| `note` | string | no |  | Note. An internal note about this customer. |

### `list_customers`

**List Customers.** Retrieves a paginated list of Quizell customers (quiz leads); an empty search returns all customers, while a search term filters by name or email. Use to browse leads or resolve a customer by name/email when you do not have an ID. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Filter customers by name or email. Leave empty to return all customers. |
| `page` | number | no | `1` | Page. Page number for results. Starts at 1. |
| `per_page` | number | no | `25` | Results Per Page. How many customers to return per page. Maximum is 100. |

### `get_customer`

**Get Customer.** Fetches the full details of a single Quizell customer by customer_id, including custom fields. Use when you already have the customer ID (e.g. from List Customers) and need their complete record. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The ID of the customer to retrieve. Use the "List Customers" action to find customer IDs. |

### `search_products`

**Search Products.** Searches the Quizell product catalog with paginated results; leaving title and SKU empty returns all products, while supplying either filters the catalog, and an optional active/inactive status filter narrows further. Use to browse the catalog or resolve a product by title/SKU when you lack its ID. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | no |  | Product Title. Search by product name. Leave empty to return all products. |
| `sku` | string | no |  | SKU. Search by product SKU (stock keeping unit). Leave empty to skip this filter. |
| `status` | string | no | `""` | Status. Filter by product status. One of `""`, `"1"`, `"0"`. |
| `page` | number | no | `1` | Page. Page number for results. Starts at 1. |
| `per_page` | number | no | `25` | Results Per Page. How many products to return per page. |

### `create_product`

**Create Product.** Adds a new product to the Quizell catalog so it can appear in quiz recommendations. Use when introducing a product not yet in Quizell; requires title, price, and active/inactive status. Not idempotent — each call creates another product, so guard against duplicates if syncing from an external store. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Product Title. The name of the product as it will appear in quiz recommendations. |
| `price` | number | yes |  | Price. The selling price of the product (e.g. 29.99). |
| `status` | string | yes | `1` | Status. Whether this product is active and visible in quizzes. One of `1`, `0`. |
| `sku` | string | no |  | SKU. Your internal stock keeping unit code for this product. |
| `description` | string | no |  | Description. A description of the product. |
| `image` | string | no |  | Image URL. A publicly accessible URL to the product image (e.g. https://example.com/product.jpg). |
| `vendor` | string | no |  | Vendor / Brand. The brand or vendor name for this product. |
| `quantity` | number | no |  | Quantity in Stock. The available quantity for this product. |
| `compare_at_price` | number | no |  | Compare-At Price. The original price to show a discount (e.g. 49.99). Leave empty if there is no sale. |
| `tags` | string | no |  | Tags. Comma-separated tags to categorize this product (e.g. "skincare, moisturizer, sensitive-skin"). |
| `detail_link` | string | no |  | Product Page URL. The URL to the product page in your online store. |
| `external_id` | string | no |  | External ID. The product ID from your external system (e.g. Shopify product ID) for syncing. |

### `update_product`

**Update Product.** Updates an existing Quizell catalog product, identified by product_id. Use to change price, stock, status, or other product fields on a known product; requires product_id, title, price, and status. Idempotent — re-sending the same fields leaves the product in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. The ID of the product to update. Use the "Search Products" action to find product IDs. |
| `title` | string | yes |  | Product Title. The name of the product. |
| `price` | number | yes |  | Price. The selling price of the product (e.g. 29.99). |
| `status` | string | yes | `1` | Status. Whether this product is active and visible in quizzes. One of `1`, `0`. |
| `sku` | string | no |  | SKU. Your internal stock keeping unit code for this product. |
| `description` | string | no |  | Description. A description of the product. |
| `image` | string | no |  | Image URL. A publicly accessible URL to the product image. |
| `vendor` | string | no |  | Vendor / Brand. The brand or vendor name for this product. |
| `quantity` | number | no |  | Quantity in Stock. The available quantity for this product. |
| `compare_at_price` | number | no |  | Compare-At Price. The original price to show a discount. Leave empty if there is no sale. |
| `tags` | string | no |  | Tags. Comma-separated tags to categorize this product (e.g. "skincare, moisturizer"). |
| `detail_link` | string | no |  | Product Page URL. The URL to the product page in your online store. |
| `external_id` | string | no |  | External ID. The product ID from your external system for syncing. |

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

# BigCommerce

BigCommerce is a leading e-commerce platform that enables businesses to create and manage online stores.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bigcommerce'
  version: '0.2.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter your BigCommerce API credentials.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `instruction` | markdown | no |  | Markdown. 1. Login to https://www.bigcommerce.com/essentials/ 2. Go to Settings 3. Scroll down to API 4. Click on "Store Level API Accounts" 5. Click "Create API Account" button 6. Enter a name and add required scopes 7. Save - you will get a downloaded file containing your access token and store hash. |
| `storeHash` | string | yes |  | Store Hash. Your BigCommerce store hash (e.g., abcd1234) |
| `accessToken` | string | yes |  | Access Token. Your BigCommerce API access token. |

## Actions

### `createCustomer`

**Create Customer.** Creates a new customer record in a BigCommerce store from an email plus first/last name (company, phone, and notes optional). Use to register a shopper or contact. Not idempotent: each call adds a new customer, and BigCommerce rejects a duplicate email rather than returning the existing one, so call Search Customer or Find or Create Customer first if the customer may already exist. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Customer email address. |
| `first_name` | string | yes |  | First Name. Customer first name. |
| `last_name` | string | yes |  | Last Name. Customer last name. |
| `company` | string | no |  | Company. Customer company name. |
| `phone` | string | no |  | Phone. Customer phone number. |
| `notes` | string | no |  | Notes. Customer notes. |

### `createAProduct`

**Create a Product.** Creates a new catalog product in a BigCommerce store. Use to add an item to the store. Requires name, type (physical or digital), weight, and price; SKU, description, and brand_id are optional. Not idempotent: each call adds a new product, so search the catalog first if it may already exist. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Product Name. Name of the product. |
| `type` | string | yes |  | Product Type. Type of product. One of `"physical"`, `"digital"`. |
| `sku` | string | no |  | SKU. Product SKU. |
| `description` | string | no |  | Description. Product description. |
| `weight` | number | yes |  | Weight. Product weight. |
| `price` | number | yes |  | Price. Product price. |
| `brand_id` | number | no |  | Brand ID. Brand ID. |

### `updateAProduct`

**Update a Product.** Updates an existing catalog product in a BigCommerce store, identified by its productId. Only the fields you supply are sent (null/undefined values are dropped so existing data is preserved), so use it for partial edits to name, type, SKU, description, weight, price, or brand. Idempotent: re-applying the same field values leaves the product in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | string | yes |  | Product ID. The ID of the product to update. |
| `name` | string | no |  | Product Name. Name of the product. |
| `type` | string | no |  | Product Type. Type of product. One of `"physical"`, `"digital"`. |
| `sku` | string | no |  | SKU. Product SKU. |
| `description` | string | no |  | Description. Product description. |
| `weight` | number | no |  | Weight. Product weight. |
| `price` | number | no |  | Price. Product price. |
| `brand_id` | number | no |  | Brand ID. Brand ID. |

### `deleteAProduct`

**Delete a Product.** Permanently deletes a catalog product from a BigCommerce store by its productId. Use to remove an item from the store. This is destructive and cannot be undone. Effectively idempotent: deleting an already-removed product has no further effect, though the call may error if the id no longer exists. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | string | yes |  | Product ID. The ID of the product to delete. |

### `getOrder`

**Get Order.** Retrieves the full details of a single BigCommerce order by its orderId. Use when you already have an order id (e.g. from an order trigger or List Orders) and need its data. Idempotent read-only lookup with no side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | string | yes |  | Order ID. The ID of the order to retrieve. |

### `listOrders`

**List Orders.** Lists orders from a BigCommerce store. With no filters it returns all orders; optionally narrow by customer_id and/or status_id to a subset. Use to browse or find orders when you do not have a specific order id. Idempotent read-only query with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | number | no |  | Customer ID. Filter by customer ID. |
| `status_id` | number | no |  | Status ID. Filter by status ID. |

### `listCategories`

**List Categories.** Lists product categories from a BigCommerce store. With no name filter it returns all categories; provide a name to filter to matching categories. Use to discover category names or ids before assigning products. Idempotent read-only query with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Category Name. Filter by category name. |

### `createBlogPost`

**Create Blog Post.** Creates a blog post in a BigCommerce store's blog. Requires a title and body (HTML supported); author, URL, published date, meta description/keywords, tags, and a published flag are optional. Use to publish store blog content. Not idempotent: each call creates a new post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Blog post title. |
| `body` | string | yes |  | Body. Blog post content (HTML supported) |
| `author` | string | no |  | Author. Author name. |
| `url` | string | no |  | URL. URL for the public blog post. Example - /blog/welcome-bigcommerce/. |
| `published_date` | ISO date-time string | no |  | Published Date. Published Date for the blog post. Example - Wed, 10 Aug 2022 15:39:15 -0500. |
| `meta_description` | string | no |  | Meta Description. Description text for this blog post’s <meta/> element. |
| `meta_keywords` | string | no |  | Meta Keywords. Comma seperated (,) Keywords for this blog post’s <meta/> element. Eg welcome, bigcommerce. |
| `tags` | array | no |  | Tags. Array of tags. |
| `is_published` | boolean | no | `true` | Is Published. Whether the post is published. |

### `createCustomerAddress`

**Create Customer Address.** Adds a new address to an existing BigCommerce customer, identified by customer_id (selected from a dropdown of store customers). Requires name, address line 1, city, state/province, postal code, and an ISO 3166-1 alpha-2 country code. Use to attach a shipping or billing address to a customer. Not idempotent: each call appends a new address even if an identical one exists, so use Find or Create Customer’s Address to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer. Select the customer. A value the product loads from the provider, such as an id; write the value itself. |
| `first_name` | string | yes |  | First Name. |
| `last_name` | string | yes |  | Last Name. |
| `address1` | string | yes |  | Address Line 1. |
| `address2` | string | no |  | Address Line 2. |
| `city` | string | yes |  | City. |
| `state_or_province` | string | yes |  | State/Province. |
| `postal_code` | string | yes |  | Postal Code. |
| `country_code` | string | yes |  | Country Code. ISO 3166-1 alpha-2 country code. |
| `phone` | string | no |  | Phone. |

### `searchCustomer`

**Search Customer.** Searches registered customers in a BigCommerce store by email, phone, and/or name. With no filters it returns all customers; supplying any filter narrows to matches. Use to look up a customer or check whether one exists before creating it. Idempotent read-only query with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. Customer email to search for. |
| `phone` | string | no |  | Phone Number. Phone Number to search for. |
| `name` | string | no |  | Name. Customer name to search for. |

### `searchProduct`

**Search Product.** Searches the BigCommerce product catalog by name, SKU, type, brand, weight, and/or price. With no filters it returns all products; supplying any filter narrows to matches. Use to find a product or its id, or to check whether one exists before creating it. Idempotent read-only query with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Product Name. Product name to search for. |
| `sku` | string | no |  | SKU. Product SKU to search for. |
| `type` | string | no |  | Product Type. One of `"physical"`, `"digital"`. |
| `brand_id` | string | no |  | Brand ID. Brand ID to search for. |
| `weight` | number | no |  | Weight. |
| `price` | number | no |  | Price. |

### `searchCustomerAddress`

**Search Customer Address.** Searches customer addresses in a BigCommerce store, optionally filtered by one or more customer ids and/or a name. With no filters it returns all addresses; supplying filters narrows to matches. Use to look up addresses belonging to specific customers. Idempotent read-only query with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_ids` | array | no |  | Customers. Select the customers. Values the product loads from the provider, such as ids; write an array of them. |
| `name` | string | no |  | Name. Customer name to search for. |

### `findOrCreateCustomer`

**Find or Create Customer.** Looks up a BigCommerce customer by email (and phone if given) and returns the match if found, otherwise creates a new customer from the supplied details. Use this instead of Create Customer when the customer may already exist, to avoid duplicate-email errors. Idempotent: repeated calls match the same existing record rather than creating duplicates. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Customer email address. |
| `first_name` | string | yes |  | First Name. Customer first name. |
| `last_name` | string | yes |  | Last Name. Customer last name. |
| `company` | string | no |  | Company. Customer company name. |
| `phone` | string | no |  | Phone. Customer phone number. |
| `notes` | string | no |  | Notes. Customer notes. |

### `findOrCreateProduct`

**Find or Create Product.** Looks up a catalog product by exact name and returns the match if found, otherwise creates a new product from the supplied details (type, weight, and price required). Use instead of Create a Product when the item may already exist, to avoid duplicates. Idempotent: repeated calls match the same existing product by name rather than creating duplicates. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Product Name. |
| `sku` | string | no |  | SKU. |
| `type` | string | yes |  | Product Type. One of `"physical"`, `"digital"`. |
| `weight` | number | yes |  | Weight. |
| `price` | number | yes |  | Price. |
| `description` | string | no |  | Description. |
| `brand_id` | number | no |  | Brand ID. Brand ID. |

### `findOrCreateCustomersAddress`

**Find or Create Customer’s Address.** For a given customer_id, looks up that customer’s addresses and returns the one matching the supplied address line 1, city, and postal code if it exists, otherwise creates a new address from the supplied details. Use instead of Create Customer Address when the address may already be on file, to avoid duplicates. Idempotent: repeated calls reuse the matching address rather than appending duplicates. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer. Select the customer. A value the product loads from the provider, such as an id; write the value itself. |
| `first_name` | string | yes |  | First Name. |
| `last_name` | string | yes |  | Last Name. |
| `address1` | string | yes |  | Address Line 1. |
| `address2` | string | no |  | Address Line 2. |
| `city` | string | yes |  | City. |
| `state_or_province` | string | yes |  | State/Province. |
| `postal_code` | string | yes |  | Postal Code. |
| `country_code` | string | yes |  | Country Code. ISO 3166-1 alpha-2 country code. |
| `phone` | string | no |  | Phone. |

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

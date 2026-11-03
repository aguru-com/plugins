# WooCommerce

E-commerce platform built on WordPress

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-woocommerce'
  version: '0.4.1'
```

Categories: COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To generate your API credentials, follow the steps below:
> 1. Go to WooCommerce -> Settings -> Advanced tab -> REST API.
> 2. Click on Add Key to create a new key.
> 3. Enter the key description and change the permissions to Read/Write.
> 4. Click Generate Key.
> 5. Copy the Consumer Key and Consumer Secret into the fields below. You will not be able to view the Consumer Secret after exiting the page.
>
> Note that the base URL of your WooCommerce instance needs to be on a secure (HTTPS) connection, or the piece will not work even on local instances on the same device.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes |  | Base URL. The base URL of your app (e.g https://mystore.com) and it should start with HTTPS only. |
| `consumerKey` | string | yes |  | Consumer Key. The consumer key generated from your app. |
| `consumerSecret` | string | yes |  | Consumer Secret. The consumer secret generated from your app. |

## Actions

### `Create Customer`

**Create Customer.** Creates a new customer account in a WooCommerce store with email, name, username, password, and a billing/shipping address (the same address is applied to both). Use when an agent needs to register a shopper. Not idempotent: each call creates a new customer, and email and username must be unique in the store. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Enter the email. |
| `first_name` | string | yes |  | First name. Enter the first name. |
| `last_name` | string | yes |  | Last name. Enter the last name. |
| `username` | string | yes |  | Username. Enter the username. |
| `password` | string | yes |  | Password. Enter the password. |
| `street_address` | string | yes |  | Address. Enter the street address. |
| `city` | string | yes |  | City. Enter the city. |
| `state` | string | yes |  | State. Enter the state. |
| `postcode` | string | yes |  | Postcode. Enter the postcode. |
| `country` | string | yes |  | Country. Enter the country. |
| `phone` | string | yes |  | Phone. Enter the phone. |

Output fields:

- `id`: Customer ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `username`: Username
- `role`: Role
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `billing`: Billing Address
- `billing.first_name`: First Name
- `billing.last_name`: Last Name
- `billing.company`: Company
- `billing.address_1`: Address Line 1
- `billing.address_2`: Address Line 2
- `billing.city`: City
- `billing.state`: State
- `billing.postcode`: Postcode
- `billing.country`: Country
- `billing.email`: Email (email)
- `billing.phone`: Phone
- `shipping`: Shipping Address
- `shipping.first_name`: First Name
- `shipping.last_name`: Last Name
- `shipping.company`: Company
- `shipping.address_1`: Address Line 1
- `shipping.address_2`: Address Line 2
- `shipping.city`: City
- `shipping.state`: State
- `shipping.postcode`: Postcode
- `shipping.country`: Country
- `shipping.phone`: Phone
- `is_paying_customer`: Is Paying Customer (boolean)
- `avatar_url`: Avatar URL (url)
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `Create Coupon`

**Create Coupon.** Creates a new discount coupon in a WooCommerce store with a code, discount type (fixed_cart, fixed_product, percent, or percent_product), amount, and minimum order amount. Use when an agent needs to issue a promotional or discount code. Not idempotent: each call posts a new coupon, and the code must be unique in the store. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `code` | string | yes |  | Coupon code. Enter the coupon code. |
| `discount_type` | string | yes |  | Discount type. Select the discount type. One of `"fixed_cart"`, `"fixed_product"`, `"percent"`, `"percent_product"`. |
| `amount` | number | yes |  | Amount. Enter the amount. |
| `minimum_amount` | number | yes |  | Minimum amount. Enter the minimum amount. |

Output fields:

- `id`: Coupon ID
- `code`: Code
- `amount`: Amount
- `status`: Status
- `discount_type`: Discount Type
- `description`: Description
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `date_expires`: Expires At (datetime)
- `date_expires_gmt`: Expires At (GMT) (datetime)
- `usage_count`: Usage Count (number)
- `individual_use`: Individual Use Only (boolean)
- `product_ids`: Product IDs
- `excluded_product_ids`: Excluded Product IDs
- `usage_limit`: Usage Limit (number)
- `usage_limit_per_user`: Usage Limit Per User (number)
- `limit_usage_to_x_items`: Limit Usage To X Items (number)
- `free_shipping`: Free Shipping (boolean)
- `product_categories`: Product Category IDs
- `excluded_product_categories`: Excluded Product Category IDs
- `exclude_sale_items`: Exclude Sale Items (boolean)
- `minimum_amount`: Minimum Amount
- `maximum_amount`: Maximum Amount
- `email_restrictions`: Email Restrictions
- `used_by`: Used By
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `Create Product`

**Create Product.** Creates a new product in a WooCommerce store with a name, type (simple, grouped, external, or variable), regular price, descriptions, category IDs, and image URLs (categories and images are comma-separated lists). Use when an agent needs to add a catalog item. Not idempotent: each call creates a new product. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Enter the name. |
| `type` | string | yes |  | Type. Select the type. One of `"simple"`, `"grouped"`, `"external"`, `"variable"`. |
| `regular_price` | number | yes |  | Regular price. Enter the regular price. |
| `description` | string | yes |  | Description. Enter the description. |
| `short_description` | string | yes |  | Short description. Enter the short description. |
| `categories` | string | yes |  | Categories. Enter the category IDs (comma separated) |
| `images` | string | yes |  | Images. Enter the URLs of images you want to upload (comma separated) |

Output fields:

- `id`: Product ID
- `name`: Name
- `slug`: Slug
- `permalink`: Permalink (url)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `type`: Type
- `status`: Status
- `featured`: Featured (boolean)
- `catalog_visibility`: Catalog Visibility
- `description`: Description (html)
- `short_description`: Short Description (html)
- `sku`: SKU
- `price`: Price
- `regular_price`: Regular Price
- `sale_price`: Sale Price
- `date_on_sale_from`: On Sale From (datetime)
- `date_on_sale_from_gmt`: On Sale From (GMT) (datetime)
- `date_on_sale_to`: On Sale To (datetime)
- `date_on_sale_to_gmt`: On Sale To (GMT) (datetime)
- `on_sale`: On Sale (boolean)
- `purchasable`: Purchasable (boolean)
- `total_sales`: Total Sales (number)
- `virtual`: Virtual (boolean)
- `downloadable`: Downloadable (boolean)
- `downloads`: Downloads
- `downloads[].id`: Download ID
- `downloads[].name`: File Name
- `downloads[].file`: File URL (url)
- `download_limit`: Download Limit (number)
- `download_expiry`: Download Expiry (Days) (number)
- `external_url`: External URL (url)
- `button_text`: Button Text
- `tax_status`: Tax Status
- `tax_class`: Tax Class
- `manage_stock`: Manage Stock (boolean)
- `stock_quantity`: Stock Quantity (number)
- `stock_status`: Stock Status
- `backorders`: Backorders
- `backorders_allowed`: Backorders Allowed (boolean)
- `backordered`: Backordered (boolean)
- `low_stock_amount`: Low Stock Amount (number)
- `sold_individually`: Sold Individually (boolean)
- `weight`: Weight
- `dimensions`: Dimensions
- `dimensions.length`: Length
- `dimensions.width`: Width
- `dimensions.height`: Height
- `shipping_required`: Shipping Required (boolean)
- `shipping_taxable`: Shipping Taxable (boolean)
- `shipping_class`: Shipping Class
- `shipping_class_id`: Shipping Class ID
- `reviews_allowed`: Reviews Allowed (boolean)
- `average_rating`: Average Rating
- `rating_count`: Rating Count (number)
- `upsell_ids`: Upsell Product IDs
- `cross_sell_ids`: Cross-sell Product IDs
- `related_ids`: Related Product IDs
- `parent_id`: Parent Product ID
- `purchase_note`: Purchase Note
- `categories`: Categories
- `categories[].id`: ID
- `categories[].name`: Name
- `categories[].slug`: Slug
- `tags`: Tags
- `tags[].id`: ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `brands`: Brands
- `brands[].id`: ID
- `brands[].name`: Name
- `brands[].slug`: Slug
- `images`: Images
- `images[].id`: Image ID
- `images[].src`: Source URL (url)
- `images[].thumbnail`: Thumbnail URL (url)
- `images[].name`: Name
- `images[].alt`: Alt Text
- `images[].srcset`: Srcset
- `images[].sizes`: Sizes
- `images[].date_created`: Created At (datetime)
- `images[].date_created_gmt`: Created At (GMT) (datetime)
- `images[].date_modified`: Modified At (datetime)
- `images[].date_modified_gmt`: Modified At (GMT) (datetime)
- `attributes`: Attributes
- `attributes[].id`: Attribute ID
- `attributes[].name`: Name
- `attributes[].slug`: Slug
- `attributes[].position`: Position (number)
- `attributes[].visible`: Visible (boolean)
- `attributes[].variation`: Used For Variations (boolean)
- `attributes[].options`: Options
- `default_attributes`: Default Attributes
- `default_attributes[].id`: Attribute ID
- `default_attributes[].name`: Name
- `default_attributes[].option`: Option
- `variations`: Variation IDs
- `grouped_products`: Grouped Product IDs
- `menu_order`: Menu Order (number)
- `price_html`: Price HTML (html)
- `has_options`: Has Options (boolean)
- `post_password`: Post Password
- `global_unique_id`: Global Unique ID
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `Find Customer`

**Find Customer.** Looks up customers in a WooCommerce store by exact email address. Use when an agent needs to resolve a shopper to their customer record or ID before referencing them. Read-only and idempotent. Requires the email; returns matching customers (empty if none match). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Enter the email. |

Output fields:

- `[].id`: Customer ID
- `[].email`: Email (email)
- `[].first_name`: First Name
- `[].last_name`: Last Name
- `[].username`: Username
- `[].role`: Role
- `[].date_created`: Created At (datetime)
- `[].date_created_gmt`: Created At (GMT) (datetime)
- `[].date_modified`: Modified At (datetime)
- `[].date_modified_gmt`: Modified At (GMT) (datetime)
- `[].billing`: Billing Address
- `[].billing.first_name`: First Name
- `[].billing.last_name`: Last Name
- `[].billing.company`: Company
- `[].billing.address_1`: Address Line 1
- `[].billing.address_2`: Address Line 2
- `[].billing.city`: City
- `[].billing.state`: State
- `[].billing.postcode`: Postcode
- `[].billing.country`: Country
- `[].billing.email`: Email (email)
- `[].billing.phone`: Phone
- `[].shipping`: Shipping Address
- `[].shipping.first_name`: First Name
- `[].shipping.last_name`: Last Name
- `[].shipping.company`: Company
- `[].shipping.address_1`: Address Line 1
- `[].shipping.address_2`: Address Line 2
- `[].shipping.city`: City
- `[].shipping.state`: State
- `[].shipping.postcode`: Postcode
- `[].shipping.country`: Country
- `[].shipping.phone`: Phone
- `[].is_paying_customer`: Is Paying Customer (boolean)
- `[].avatar_url`: Avatar URL (url)
- `[].meta_data`: Meta Data
- `[].meta_data[].id`: Meta ID
- `[].meta_data[].key`: Key
- `[].meta_data[].value`: Value

### `Find Product`

**Find Product.** Retrieves a single product from a WooCommerce store by its numeric product ID. Use when an agent already has a product ID and needs the full product record (price, stock, status, etc.). Read-only and idempotent. Requires the exact product ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Product ID. Enter the product ID. |

Output fields:

- `id`: Product ID
- `name`: Name
- `slug`: Slug
- `permalink`: Permalink (url)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `type`: Type
- `status`: Status
- `featured`: Featured (boolean)
- `catalog_visibility`: Catalog Visibility
- `description`: Description (html)
- `short_description`: Short Description (html)
- `sku`: SKU
- `price`: Price
- `regular_price`: Regular Price
- `sale_price`: Sale Price
- `date_on_sale_from`: On Sale From (datetime)
- `date_on_sale_from_gmt`: On Sale From (GMT) (datetime)
- `date_on_sale_to`: On Sale To (datetime)
- `date_on_sale_to_gmt`: On Sale To (GMT) (datetime)
- `on_sale`: On Sale (boolean)
- `purchasable`: Purchasable (boolean)
- `total_sales`: Total Sales (number)
- `virtual`: Virtual (boolean)
- `downloadable`: Downloadable (boolean)
- `downloads`: Downloads
- `downloads[].id`: Download ID
- `downloads[].name`: File Name
- `downloads[].file`: File URL (url)
- `download_limit`: Download Limit (number)
- `download_expiry`: Download Expiry (Days) (number)
- `external_url`: External URL (url)
- `button_text`: Button Text
- `tax_status`: Tax Status
- `tax_class`: Tax Class
- `manage_stock`: Manage Stock (boolean)
- `stock_quantity`: Stock Quantity (number)
- `stock_status`: Stock Status
- `backorders`: Backorders
- `backorders_allowed`: Backorders Allowed (boolean)
- `backordered`: Backordered (boolean)
- `low_stock_amount`: Low Stock Amount (number)
- `sold_individually`: Sold Individually (boolean)
- `weight`: Weight
- `dimensions`: Dimensions
- `dimensions.length`: Length
- `dimensions.width`: Width
- `dimensions.height`: Height
- `shipping_required`: Shipping Required (boolean)
- `shipping_taxable`: Shipping Taxable (boolean)
- `shipping_class`: Shipping Class
- `shipping_class_id`: Shipping Class ID
- `reviews_allowed`: Reviews Allowed (boolean)
- `average_rating`: Average Rating
- `rating_count`: Rating Count (number)
- `upsell_ids`: Upsell Product IDs
- `cross_sell_ids`: Cross-sell Product IDs
- `related_ids`: Related Product IDs
- `parent_id`: Parent Product ID
- `purchase_note`: Purchase Note
- `categories`: Categories
- `categories[].id`: ID
- `categories[].name`: Name
- `categories[].slug`: Slug
- `tags`: Tags
- `tags[].id`: ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `brands`: Brands
- `brands[].id`: ID
- `brands[].name`: Name
- `brands[].slug`: Slug
- `images`: Images
- `images[].id`: Image ID
- `images[].src`: Source URL (url)
- `images[].thumbnail`: Thumbnail URL (url)
- `images[].name`: Name
- `images[].alt`: Alt Text
- `images[].srcset`: Srcset
- `images[].sizes`: Sizes
- `images[].date_created`: Created At (datetime)
- `images[].date_created_gmt`: Created At (GMT) (datetime)
- `images[].date_modified`: Modified At (datetime)
- `images[].date_modified_gmt`: Modified At (GMT) (datetime)
- `attributes`: Attributes
- `attributes[].id`: Attribute ID
- `attributes[].name`: Name
- `attributes[].slug`: Slug
- `attributes[].position`: Position (number)
- `attributes[].visible`: Visible (boolean)
- `attributes[].variation`: Used For Variations (boolean)
- `attributes[].options`: Options
- `default_attributes`: Default Attributes
- `default_attributes[].id`: Attribute ID
- `default_attributes[].name`: Name
- `default_attributes[].option`: Option
- `variations`: Variation IDs
- `grouped_products`: Grouped Product IDs
- `menu_order`: Menu Order (number)
- `price_html`: Price HTML (html)
- `has_options`: Has Options (boolean)
- `post_password`: Post Password
- `global_unique_id`: Global Unique ID
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `Find Coupon`

**Find Coupon.** Retrieves a single coupon from a WooCommerce store by its numeric coupon ID, including the discount type, amount, usage limits and restrictions. Use when an agent already has a coupon ID and needs the full coupon record. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Coupon ID. Enter the coupon ID. |

Output fields:

- `id`: Coupon ID
- `code`: Code
- `amount`: Amount
- `status`: Status
- `discount_type`: Discount Type
- `description`: Description
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `date_expires`: Expires At (datetime)
- `date_expires_gmt`: Expires At (GMT) (datetime)
- `usage_count`: Usage Count (number)
- `individual_use`: Individual Use Only (boolean)
- `product_ids`: Product IDs
- `excluded_product_ids`: Excluded Product IDs
- `usage_limit`: Usage Limit (number)
- `usage_limit_per_user`: Usage Limit Per User (number)
- `limit_usage_to_x_items`: Limit Usage To X Items (number)
- `free_shipping`: Free Shipping (boolean)
- `product_categories`: Product Category IDs
- `excluded_product_categories`: Excluded Product Category IDs
- `exclude_sale_items`: Exclude Sale Items (boolean)
- `minimum_amount`: Minimum Amount
- `maximum_amount`: Maximum Amount
- `email_restrictions`: Email Restrictions
- `used_by`: Used By
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `Get Customer`

**Get Customer.** Retrieves one customer from a WooCommerce store by their numeric customer ID, including billing and shipping addresses. Use when an agent has a customer ID rather than an email address; Find Customer searches by email instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Customer ID. Enter the customer ID. |

Output fields:

- `id`: Customer ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `username`: Username
- `role`: Role
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `billing`: Billing Address
- `billing.first_name`: First Name
- `billing.last_name`: Last Name
- `billing.company`: Company
- `billing.address_1`: Address Line 1
- `billing.address_2`: Address Line 2
- `billing.city`: City
- `billing.state`: State
- `billing.postcode`: Postcode
- `billing.country`: Country
- `billing.email`: Email (email)
- `billing.phone`: Phone
- `shipping`: Shipping Address
- `shipping.first_name`: First Name
- `shipping.last_name`: Last Name
- `shipping.company`: Company
- `shipping.address_1`: Address Line 1
- `shipping.address_2`: Address Line 2
- `shipping.city`: City
- `shipping.state`: State
- `shipping.postcode`: Postcode
- `shipping.country`: Country
- `shipping.phone`: Phone
- `is_paying_customer`: Is Paying Customer (boolean)
- `avatar_url`: Avatar URL (url)
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `Update Customer`

**Update Customer.** Updates an existing WooCommerce customer by ID. Can change the email, first and last name, and billing phone, city, postcode and country. Only the fields provided are changed. Idempotent: sending the same values twice leaves the customer in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Customer ID. Enter the customer ID. |
| `email` | string | no |  | Email. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `phone` | string | no |  | Billing Phone. |
| `city` | string | no |  | Billing City. |
| `postcode` | string | no |  | Billing Postcode. |
| `country` | string | no |  | Billing Country. Two-letter country code, e.g. GB. |

Output fields:

- `id`: Customer ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `username`: Username
- `role`: Role
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `billing`: Billing Address
- `billing.first_name`: First Name
- `billing.last_name`: Last Name
- `billing.company`: Company
- `billing.address_1`: Address Line 1
- `billing.address_2`: Address Line 2
- `billing.city`: City
- `billing.state`: State
- `billing.postcode`: Postcode
- `billing.country`: Country
- `billing.email`: Email (email)
- `billing.phone`: Phone
- `shipping`: Shipping Address
- `shipping.first_name`: First Name
- `shipping.last_name`: Last Name
- `shipping.company`: Company
- `shipping.address_1`: Address Line 1
- `shipping.address_2`: Address Line 2
- `shipping.city`: City
- `shipping.state`: State
- `shipping.postcode`: Postcode
- `shipping.country`: Country
- `shipping.phone`: Phone
- `is_paying_customer`: Is Paying Customer (boolean)
- `avatar_url`: Avatar URL (url)
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `Update Product`

**Update Product.** Updates an existing WooCommerce product by ID. Commonly used to change price, sale price, stock quantity, or publish status. Only the fields provided are changed; everything else is left untouched. Idempotent: sending the same values twice leaves the product in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Product ID. Enter the product ID. |
| `name` | string | no |  | Name. |
| `regular_price` | number | no |  | Regular Price. |
| `sale_price` | number | no |  | Sale Price. |
| `stock_quantity` | number | no |  | Stock Quantity. Setting this also enables stock management. |
| `status` | string | no |  | Status. One of `"publish"`, `"draft"`, `"pending"`, `"private"`. |
| `description` | string | no |  | Description. |

Output fields:

- `id`: Product ID
- `name`: Name
- `slug`: Slug
- `permalink`: Permalink (url)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `type`: Type
- `status`: Status
- `featured`: Featured (boolean)
- `catalog_visibility`: Catalog Visibility
- `description`: Description (html)
- `short_description`: Short Description (html)
- `sku`: SKU
- `price`: Price
- `regular_price`: Regular Price
- `sale_price`: Sale Price
- `date_on_sale_from`: On Sale From (datetime)
- `date_on_sale_from_gmt`: On Sale From (GMT) (datetime)
- `date_on_sale_to`: On Sale To (datetime)
- `date_on_sale_to_gmt`: On Sale To (GMT) (datetime)
- `on_sale`: On Sale (boolean)
- `purchasable`: Purchasable (boolean)
- `total_sales`: Total Sales (number)
- `virtual`: Virtual (boolean)
- `downloadable`: Downloadable (boolean)
- `downloads`: Downloads
- `downloads[].id`: Download ID
- `downloads[].name`: File Name
- `downloads[].file`: File URL (url)
- `download_limit`: Download Limit (number)
- `download_expiry`: Download Expiry (Days) (number)
- `external_url`: External URL (url)
- `button_text`: Button Text
- `tax_status`: Tax Status
- `tax_class`: Tax Class
- `manage_stock`: Manage Stock (boolean)
- `stock_quantity`: Stock Quantity (number)
- `stock_status`: Stock Status
- `backorders`: Backorders
- `backorders_allowed`: Backorders Allowed (boolean)
- `backordered`: Backordered (boolean)
- `low_stock_amount`: Low Stock Amount (number)
- `sold_individually`: Sold Individually (boolean)
- `weight`: Weight
- `dimensions`: Dimensions
- `dimensions.length`: Length
- `dimensions.width`: Width
- `dimensions.height`: Height
- `shipping_required`: Shipping Required (boolean)
- `shipping_taxable`: Shipping Taxable (boolean)
- `shipping_class`: Shipping Class
- `shipping_class_id`: Shipping Class ID
- `reviews_allowed`: Reviews Allowed (boolean)
- `average_rating`: Average Rating
- `rating_count`: Rating Count (number)
- `upsell_ids`: Upsell Product IDs
- `cross_sell_ids`: Cross-sell Product IDs
- `related_ids`: Related Product IDs
- `parent_id`: Parent Product ID
- `purchase_note`: Purchase Note
- `categories`: Categories
- `categories[].id`: ID
- `categories[].name`: Name
- `categories[].slug`: Slug
- `tags`: Tags
- `tags[].id`: ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `brands`: Brands
- `brands[].id`: ID
- `brands[].name`: Name
- `brands[].slug`: Slug
- `images`: Images
- `images[].id`: Image ID
- `images[].src`: Source URL (url)
- `images[].thumbnail`: Thumbnail URL (url)
- `images[].name`: Name
- `images[].alt`: Alt Text
- `images[].srcset`: Srcset
- `images[].sizes`: Sizes
- `images[].date_created`: Created At (datetime)
- `images[].date_created_gmt`: Created At (GMT) (datetime)
- `images[].date_modified`: Modified At (datetime)
- `images[].date_modified_gmt`: Modified At (GMT) (datetime)
- `attributes`: Attributes
- `attributes[].id`: Attribute ID
- `attributes[].name`: Name
- `attributes[].slug`: Slug
- `attributes[].position`: Position (number)
- `attributes[].visible`: Visible (boolean)
- `attributes[].variation`: Used For Variations (boolean)
- `attributes[].options`: Options
- `default_attributes`: Default Attributes
- `default_attributes[].id`: Attribute ID
- `default_attributes[].name`: Name
- `default_attributes[].option`: Option
- `variations`: Variation IDs
- `grouped_products`: Grouped Product IDs
- `menu_order`: Menu Order (number)
- `price_html`: Price HTML (html)
- `has_options`: Has Options (boolean)
- `post_password`: Post Password
- `global_unique_id`: Global Unique ID
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `Update Coupon`

**Update Coupon.** Updates an existing WooCommerce coupon by ID. Can change the discount amount and type, description, expiry date, usage limit and minimum spend. Only the fields provided are changed. Idempotent: sending the same values twice leaves the coupon in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Coupon ID. Enter the coupon ID. |
| `amount` | number | no |  | Amount. |
| `discount_type` | string | no |  | Discount Type. One of `"percent"`, `"fixed_cart"`, `"fixed_product"`. |
| `description` | string | no |  | Description. |
| `date_expires` | ISO date-time string | no |  | Expires At. Date the coupon stops working. |
| `usage_limit` | number | no |  | Usage Limit. |
| `minimum_amount` | number | no |  | Minimum Spend. |

Output fields:

- `id`: Coupon ID
- `code`: Code
- `amount`: Amount
- `status`: Status
- `discount_type`: Discount Type
- `description`: Description
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `date_expires`: Expires At (datetime)
- `date_expires_gmt`: Expires At (GMT) (datetime)
- `usage_count`: Usage Count (number)
- `individual_use`: Individual Use Only (boolean)
- `product_ids`: Product IDs
- `excluded_product_ids`: Excluded Product IDs
- `usage_limit`: Usage Limit (number)
- `usage_limit_per_user`: Usage Limit Per User (number)
- `limit_usage_to_x_items`: Limit Usage To X Items (number)
- `free_shipping`: Free Shipping (boolean)
- `product_categories`: Product Category IDs
- `excluded_product_categories`: Excluded Product Category IDs
- `exclude_sale_items`: Exclude Sale Items (boolean)
- `minimum_amount`: Minimum Amount
- `maximum_amount`: Maximum Amount
- `email_restrictions`: Email Restrictions
- `used_by`: Used By
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `Get Order`

**Get Order.** Retrieves one order from a WooCommerce store by its numeric order ID, including line items, billing and shipping addresses, totals, and status. Use when an agent already has an order ID and needs the full order record. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Order ID. Enter the order ID. |

Output fields:

- `id`: Order ID
- `number`: Order Number
- `parent_id`: Parent Order ID
- `status`: Status
- `currency`: Currency
- `currency_symbol`: Currency Symbol
- `version`: WooCommerce Version
- `prices_include_tax`: Prices Include Tax (boolean)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `date_completed`: Completed At (datetime)
- `date_completed_gmt`: Completed At (GMT) (datetime)
- `date_paid`: Paid At (datetime)
- `date_paid_gmt`: Paid At (GMT) (datetime)
- `discount_total`: Discount Total
- `discount_tax`: Discount Tax
- `shipping_total`: Shipping Total
- `shipping_tax`: Shipping Tax
- `cart_tax`: Cart Tax
- `total`: Total
- `total_tax`: Total Tax
- `customer_id`: Customer ID
- `order_key`: Order Key
- `billing`: Billing Address
- `billing.first_name`: First Name
- `billing.last_name`: Last Name
- `billing.company`: Company
- `billing.address_1`: Address Line 1
- `billing.address_2`: Address Line 2
- `billing.city`: City
- `billing.state`: State
- `billing.postcode`: Postcode
- `billing.country`: Country
- `billing.email`: Email (email)
- `billing.phone`: Phone
- `shipping`: Shipping Address
- `shipping.first_name`: First Name
- `shipping.last_name`: Last Name
- `shipping.company`: Company
- `shipping.address_1`: Address Line 1
- `shipping.address_2`: Address Line 2
- `shipping.city`: City
- `shipping.state`: State
- `shipping.postcode`: Postcode
- `shipping.country`: Country
- `shipping.phone`: Phone
- `payment_method`: Payment Method
- `payment_method_title`: Payment Method Title
- `transaction_id`: Transaction ID
- `customer_ip_address`: Customer IP Address
- `customer_user_agent`: Customer User Agent
- `created_via`: Created Via
- `customer_note`: Customer Note
- `cart_hash`: Cart Hash
- `payment_url`: Payment URL (url)
- `is_editable`: Is Editable (boolean)
- `needs_payment`: Needs Payment (boolean)
- `needs_processing`: Needs Processing (boolean)
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].product_id`: Product ID
- `line_items[].variation_id`: Variation ID
- `line_items[].quantity`: Quantity (number)
- `line_items[].tax_class`: Tax Class
- `line_items[].subtotal`: Subtotal
- `line_items[].subtotal_tax`: Subtotal Tax
- `line_items[].total`: Total
- `line_items[].total_tax`: Total Tax
- `line_items[].taxes`: Taxes
- `line_items[].taxes[].id`: Rate ID
- `line_items[].taxes[].total`: Total
- `line_items[].taxes[].subtotal`: Subtotal
- `line_items[].meta_data`: Meta Data
- `line_items[].meta_data[].id`: Meta ID
- `line_items[].meta_data[].key`: Key
- `line_items[].meta_data[].value`: Value
- `line_items[].meta_data[].display_key`: Display Key
- `line_items[].meta_data[].display_value`: Display Value
- `line_items[].sku`: SKU
- `line_items[].global_unique_id`: Global Unique ID
- `line_items[].price`: Price
- `line_items[].image`: Image
- `line_items[].image.id`: Image ID
- `line_items[].image.src`: Source URL (url)
- `line_items[].parent_name`: Parent Product Name
- `tax_lines`: Tax Lines
- `tax_lines[].id`: Tax Line ID
- `tax_lines[].rate_code`: Rate Code
- `tax_lines[].rate_id`: Rate ID
- `tax_lines[].label`: Label
- `tax_lines[].compound`: Compound (boolean)
- `tax_lines[].tax_total`: Tax Total
- `tax_lines[].shipping_tax_total`: Shipping Tax Total
- `tax_lines[].rate_percent`: Rate Percent (number)
- `tax_lines[].meta_data`: Meta Data
- `tax_lines[].meta_data[].id`: Meta ID
- `tax_lines[].meta_data[].key`: Key
- `tax_lines[].meta_data[].value`: Value
- `tax_lines[].meta_data[].display_key`: Display Key
- `tax_lines[].meta_data[].display_value`: Display Value
- `shipping_lines`: Shipping Lines
- `shipping_lines[].id`: Shipping Line ID
- `shipping_lines[].method_title`: Method Title
- `shipping_lines[].method_id`: Method ID
- `shipping_lines[].instance_id`: Instance ID
- `shipping_lines[].total`: Total
- `shipping_lines[].total_tax`: Total Tax
- `shipping_lines[].taxes`: Taxes
- `shipping_lines[].taxes[].id`: Rate ID
- `shipping_lines[].taxes[].total`: Total
- `shipping_lines[].taxes[].subtotal`: Subtotal
- `shipping_lines[].tax_status`: Tax Status
- `shipping_lines[].meta_data`: Meta Data
- `shipping_lines[].meta_data[].id`: Meta ID
- `shipping_lines[].meta_data[].key`: Key
- `shipping_lines[].meta_data[].value`: Value
- `shipping_lines[].meta_data[].display_key`: Display Key
- `shipping_lines[].meta_data[].display_value`: Display Value
- `fee_lines`: Fee Lines
- `fee_lines[].id`: Fee Line ID
- `fee_lines[].name`: Name
- `fee_lines[].tax_class`: Tax Class
- `fee_lines[].tax_status`: Tax Status
- `fee_lines[].amount`: Amount
- `fee_lines[].total`: Total
- `fee_lines[].total_tax`: Total Tax
- `fee_lines[].taxes`: Taxes
- `fee_lines[].taxes[].id`: Rate ID
- `fee_lines[].taxes[].total`: Total
- `fee_lines[].taxes[].subtotal`: Subtotal
- `fee_lines[].meta_data`: Meta Data
- `fee_lines[].meta_data[].id`: Meta ID
- `fee_lines[].meta_data[].key`: Key
- `fee_lines[].meta_data[].value`: Value
- `fee_lines[].meta_data[].display_key`: Display Key
- `fee_lines[].meta_data[].display_value`: Display Value
- `coupon_lines`: Coupon Lines
- `coupon_lines[].id`: Coupon Line ID
- `coupon_lines[].code`: Code
- `coupon_lines[].discount`: Discount
- `coupon_lines[].discount_tax`: Discount Tax
- `coupon_lines[].discount_type`: Discount Type
- `coupon_lines[].nominal_amount`: Nominal Amount (number)
- `coupon_lines[].free_shipping`: Free Shipping (boolean)
- `coupon_lines[].meta_data`: Meta Data
- `coupon_lines[].meta_data[].id`: Meta ID
- `coupon_lines[].meta_data[].key`: Key
- `coupon_lines[].meta_data[].value`: Value
- `coupon_lines[].meta_data[].display_key`: Display Key
- `coupon_lines[].meta_data[].display_value`: Display Value
- `refunds`: Refunds
- `refunds[].id`: Refund ID
- `refunds[].reason`: Reason
- `refunds[].total`: Total
- `refunds[].total_tax`: Total Tax
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `Find Orders`

**Find Orders.** Searches orders in a WooCommerce store, optionally narrowed by status, customer ID, or a created-after date, and returns a list of full order records. Use when an agent needs to process a batch of orders rather than one known order. Read-only and idempotent. Returns an array, newest first. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. Only return orders with this status. One of `"any"`, `"pending"`, `"processing"`, `"on-hold"`, `"completed"`, `"cancelled"`, `"refunded"`, `"failed"`, `"trash"`. |
| `customer` | string | no |  | Customer ID. Only return orders belonging to this customer ID. |
| `after` | ISO date-time string | no |  | Created After. Only return orders created after this date. |
| `per_page` | number | no | `10` | Limit. Maximum number of orders to return (1-100, default 10) |

Output fields:

- `[].id`: Order ID
- `[].number`: Order Number
- `[].parent_id`: Parent Order ID
- `[].status`: Status
- `[].currency`: Currency
- `[].currency_symbol`: Currency Symbol
- `[].version`: WooCommerce Version
- `[].prices_include_tax`: Prices Include Tax (boolean)
- `[].date_created`: Created At (datetime)
- `[].date_created_gmt`: Created At (GMT) (datetime)
- `[].date_modified`: Modified At (datetime)
- `[].date_modified_gmt`: Modified At (GMT) (datetime)
- `[].date_completed`: Completed At (datetime)
- `[].date_completed_gmt`: Completed At (GMT) (datetime)
- `[].date_paid`: Paid At (datetime)
- `[].date_paid_gmt`: Paid At (GMT) (datetime)
- `[].discount_total`: Discount Total
- `[].discount_tax`: Discount Tax
- `[].shipping_total`: Shipping Total
- `[].shipping_tax`: Shipping Tax
- `[].cart_tax`: Cart Tax
- `[].total`: Total
- `[].total_tax`: Total Tax
- `[].customer_id`: Customer ID
- `[].order_key`: Order Key
- `[].billing`: Billing Address
- `[].billing.first_name`: First Name
- `[].billing.last_name`: Last Name
- `[].billing.company`: Company
- `[].billing.address_1`: Address Line 1
- `[].billing.address_2`: Address Line 2
- `[].billing.city`: City
- `[].billing.state`: State
- `[].billing.postcode`: Postcode
- `[].billing.country`: Country
- `[].billing.email`: Email (email)
- `[].billing.phone`: Phone
- `[].shipping`: Shipping Address
- `[].shipping.first_name`: First Name
- `[].shipping.last_name`: Last Name
- `[].shipping.company`: Company
- `[].shipping.address_1`: Address Line 1
- `[].shipping.address_2`: Address Line 2
- `[].shipping.city`: City
- `[].shipping.state`: State
- `[].shipping.postcode`: Postcode
- `[].shipping.country`: Country
- `[].shipping.phone`: Phone
- `[].payment_method`: Payment Method
- `[].payment_method_title`: Payment Method Title
- `[].transaction_id`: Transaction ID
- `[].customer_ip_address`: Customer IP Address
- `[].customer_user_agent`: Customer User Agent
- `[].created_via`: Created Via
- `[].customer_note`: Customer Note
- `[].cart_hash`: Cart Hash
- `[].payment_url`: Payment URL (url)
- `[].is_editable`: Is Editable (boolean)
- `[].needs_payment`: Needs Payment (boolean)
- `[].needs_processing`: Needs Processing (boolean)
- `[].line_items`: Line Items
- `[].line_items[].id`: Line Item ID
- `[].line_items[].name`: Name
- `[].line_items[].product_id`: Product ID
- `[].line_items[].variation_id`: Variation ID
- `[].line_items[].quantity`: Quantity (number)
- `[].line_items[].tax_class`: Tax Class
- `[].line_items[].subtotal`: Subtotal
- `[].line_items[].subtotal_tax`: Subtotal Tax
- `[].line_items[].total`: Total
- `[].line_items[].total_tax`: Total Tax
- `[].line_items[].taxes`: Taxes
- `[].line_items[].taxes[].id`: Rate ID
- `[].line_items[].taxes[].total`: Total
- `[].line_items[].taxes[].subtotal`: Subtotal
- `[].line_items[].meta_data`: Meta Data
- `[].line_items[].meta_data[].id`: Meta ID
- `[].line_items[].meta_data[].key`: Key
- `[].line_items[].meta_data[].value`: Value
- `[].line_items[].meta_data[].display_key`: Display Key
- `[].line_items[].meta_data[].display_value`: Display Value
- `[].line_items[].sku`: SKU
- `[].line_items[].global_unique_id`: Global Unique ID
- `[].line_items[].price`: Price
- `[].line_items[].image`: Image
- `[].line_items[].image.id`: Image ID
- `[].line_items[].image.src`: Source URL (url)
- `[].line_items[].parent_name`: Parent Product Name
- `[].tax_lines`: Tax Lines
- `[].tax_lines[].id`: Tax Line ID
- `[].tax_lines[].rate_code`: Rate Code
- `[].tax_lines[].rate_id`: Rate ID
- `[].tax_lines[].label`: Label
- `[].tax_lines[].compound`: Compound (boolean)
- `[].tax_lines[].tax_total`: Tax Total
- `[].tax_lines[].shipping_tax_total`: Shipping Tax Total
- `[].tax_lines[].rate_percent`: Rate Percent (number)
- `[].tax_lines[].meta_data`: Meta Data
- `[].tax_lines[].meta_data[].id`: Meta ID
- `[].tax_lines[].meta_data[].key`: Key
- `[].tax_lines[].meta_data[].value`: Value
- `[].tax_lines[].meta_data[].display_key`: Display Key
- `[].tax_lines[].meta_data[].display_value`: Display Value
- `[].shipping_lines`: Shipping Lines
- `[].shipping_lines[].id`: Shipping Line ID
- `[].shipping_lines[].method_title`: Method Title
- `[].shipping_lines[].method_id`: Method ID
- `[].shipping_lines[].instance_id`: Instance ID
- `[].shipping_lines[].total`: Total
- `[].shipping_lines[].total_tax`: Total Tax
- `[].shipping_lines[].taxes`: Taxes
- `[].shipping_lines[].taxes[].id`: Rate ID
- `[].shipping_lines[].taxes[].total`: Total
- `[].shipping_lines[].taxes[].subtotal`: Subtotal
- `[].shipping_lines[].tax_status`: Tax Status
- `[].shipping_lines[].meta_data`: Meta Data
- `[].shipping_lines[].meta_data[].id`: Meta ID
- `[].shipping_lines[].meta_data[].key`: Key
- `[].shipping_lines[].meta_data[].value`: Value
- `[].shipping_lines[].meta_data[].display_key`: Display Key
- `[].shipping_lines[].meta_data[].display_value`: Display Value
- `[].fee_lines`: Fee Lines
- `[].fee_lines[].id`: Fee Line ID
- `[].fee_lines[].name`: Name
- `[].fee_lines[].tax_class`: Tax Class
- `[].fee_lines[].tax_status`: Tax Status
- `[].fee_lines[].amount`: Amount
- `[].fee_lines[].total`: Total
- `[].fee_lines[].total_tax`: Total Tax
- `[].fee_lines[].taxes`: Taxes
- `[].fee_lines[].taxes[].id`: Rate ID
- `[].fee_lines[].taxes[].total`: Total
- `[].fee_lines[].taxes[].subtotal`: Subtotal
- `[].fee_lines[].meta_data`: Meta Data
- `[].fee_lines[].meta_data[].id`: Meta ID
- `[].fee_lines[].meta_data[].key`: Key
- `[].fee_lines[].meta_data[].value`: Value
- `[].fee_lines[].meta_data[].display_key`: Display Key
- `[].fee_lines[].meta_data[].display_value`: Display Value
- `[].coupon_lines`: Coupon Lines
- `[].coupon_lines[].id`: Coupon Line ID
- `[].coupon_lines[].code`: Code
- `[].coupon_lines[].discount`: Discount
- `[].coupon_lines[].discount_tax`: Discount Tax
- `[].coupon_lines[].discount_type`: Discount Type
- `[].coupon_lines[].nominal_amount`: Nominal Amount (number)
- `[].coupon_lines[].free_shipping`: Free Shipping (boolean)
- `[].coupon_lines[].meta_data`: Meta Data
- `[].coupon_lines[].meta_data[].id`: Meta ID
- `[].coupon_lines[].meta_data[].key`: Key
- `[].coupon_lines[].meta_data[].value`: Value
- `[].coupon_lines[].meta_data[].display_key`: Display Key
- `[].coupon_lines[].meta_data[].display_value`: Display Value
- `[].refunds`: Refunds
- `[].refunds[].id`: Refund ID
- `[].refunds[].reason`: Reason
- `[].refunds[].total`: Total
- `[].refunds[].total_tax`: Total Tax
- `[].meta_data`: Meta Data
- `[].meta_data[].id`: Meta ID
- `[].meta_data[].key`: Key
- `[].meta_data[].value`: Value

### `Create Order`

**Create Order.** Creates a new order in a WooCommerce store from a list of product IDs and quantities, with an optional customer, status, billing email, and payment gateway (payment method id, with an optional display title). Use when an agent needs to place an order on a customer behalf. Not idempotent: each call creates a separate order. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `line_items` | array | yes |  | Line Items. Products to include in the order. Each item: { `product_id`, `quantity` }. |
| `customer_id` | string | no |  | Customer ID. Leave empty for a guest order. |
| `status` | string | no |  | Status. Status the order is created with. One of `"pending"`, `"processing"`, `"on-hold"`, `"completed"`. |
| `billing_email` | string | no |  | Billing Email. Email address for the order. |
| `payment_method` | string | no |  | Payment Method ID. Payment gateway id the order is associated with, e.g. bacs, cheque or cod. |
| `payment_method_title` | string | no |  | Payment Method Title. Human-readable payment method, e.g. Direct bank transfer. |

Output fields:

- `id`: Order ID
- `number`: Order Number
- `parent_id`: Parent Order ID
- `status`: Status
- `currency`: Currency
- `currency_symbol`: Currency Symbol
- `version`: WooCommerce Version
- `prices_include_tax`: Prices Include Tax (boolean)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `date_completed`: Completed At (datetime)
- `date_completed_gmt`: Completed At (GMT) (datetime)
- `date_paid`: Paid At (datetime)
- `date_paid_gmt`: Paid At (GMT) (datetime)
- `discount_total`: Discount Total
- `discount_tax`: Discount Tax
- `shipping_total`: Shipping Total
- `shipping_tax`: Shipping Tax
- `cart_tax`: Cart Tax
- `total`: Total
- `total_tax`: Total Tax
- `customer_id`: Customer ID
- `order_key`: Order Key
- `billing`: Billing Address
- `billing.first_name`: First Name
- `billing.last_name`: Last Name
- `billing.company`: Company
- `billing.address_1`: Address Line 1
- `billing.address_2`: Address Line 2
- `billing.city`: City
- `billing.state`: State
- `billing.postcode`: Postcode
- `billing.country`: Country
- `billing.email`: Email (email)
- `billing.phone`: Phone
- `shipping`: Shipping Address
- `shipping.first_name`: First Name
- `shipping.last_name`: Last Name
- `shipping.company`: Company
- `shipping.address_1`: Address Line 1
- `shipping.address_2`: Address Line 2
- `shipping.city`: City
- `shipping.state`: State
- `shipping.postcode`: Postcode
- `shipping.country`: Country
- `shipping.phone`: Phone
- `payment_method`: Payment Method
- `payment_method_title`: Payment Method Title
- `transaction_id`: Transaction ID
- `customer_ip_address`: Customer IP Address
- `customer_user_agent`: Customer User Agent
- `created_via`: Created Via
- `customer_note`: Customer Note
- `cart_hash`: Cart Hash
- `payment_url`: Payment URL (url)
- `is_editable`: Is Editable (boolean)
- `needs_payment`: Needs Payment (boolean)
- `needs_processing`: Needs Processing (boolean)
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].product_id`: Product ID
- `line_items[].variation_id`: Variation ID
- `line_items[].quantity`: Quantity (number)
- `line_items[].tax_class`: Tax Class
- `line_items[].subtotal`: Subtotal
- `line_items[].subtotal_tax`: Subtotal Tax
- `line_items[].total`: Total
- `line_items[].total_tax`: Total Tax
- `line_items[].taxes`: Taxes
- `line_items[].taxes[].id`: Rate ID
- `line_items[].taxes[].total`: Total
- `line_items[].taxes[].subtotal`: Subtotal
- `line_items[].meta_data`: Meta Data
- `line_items[].meta_data[].id`: Meta ID
- `line_items[].meta_data[].key`: Key
- `line_items[].meta_data[].value`: Value
- `line_items[].meta_data[].display_key`: Display Key
- `line_items[].meta_data[].display_value`: Display Value
- `line_items[].sku`: SKU
- `line_items[].global_unique_id`: Global Unique ID
- `line_items[].price`: Price
- `line_items[].image`: Image
- `line_items[].image.id`: Image ID
- `line_items[].image.src`: Source URL (url)
- `line_items[].parent_name`: Parent Product Name
- `tax_lines`: Tax Lines
- `tax_lines[].id`: Tax Line ID
- `tax_lines[].rate_code`: Rate Code
- `tax_lines[].rate_id`: Rate ID
- `tax_lines[].label`: Label
- `tax_lines[].compound`: Compound (boolean)
- `tax_lines[].tax_total`: Tax Total
- `tax_lines[].shipping_tax_total`: Shipping Tax Total
- `tax_lines[].rate_percent`: Rate Percent (number)
- `tax_lines[].meta_data`: Meta Data
- `tax_lines[].meta_data[].id`: Meta ID
- `tax_lines[].meta_data[].key`: Key
- `tax_lines[].meta_data[].value`: Value
- `tax_lines[].meta_data[].display_key`: Display Key
- `tax_lines[].meta_data[].display_value`: Display Value
- `shipping_lines`: Shipping Lines
- `shipping_lines[].id`: Shipping Line ID
- `shipping_lines[].method_title`: Method Title
- `shipping_lines[].method_id`: Method ID
- `shipping_lines[].instance_id`: Instance ID
- `shipping_lines[].total`: Total
- `shipping_lines[].total_tax`: Total Tax
- `shipping_lines[].taxes`: Taxes
- `shipping_lines[].taxes[].id`: Rate ID
- `shipping_lines[].taxes[].total`: Total
- `shipping_lines[].taxes[].subtotal`: Subtotal
- `shipping_lines[].tax_status`: Tax Status
- `shipping_lines[].meta_data`: Meta Data
- `shipping_lines[].meta_data[].id`: Meta ID
- `shipping_lines[].meta_data[].key`: Key
- `shipping_lines[].meta_data[].value`: Value
- `shipping_lines[].meta_data[].display_key`: Display Key
- `shipping_lines[].meta_data[].display_value`: Display Value
- `fee_lines`: Fee Lines
- `fee_lines[].id`: Fee Line ID
- `fee_lines[].name`: Name
- `fee_lines[].tax_class`: Tax Class
- `fee_lines[].tax_status`: Tax Status
- `fee_lines[].amount`: Amount
- `fee_lines[].total`: Total
- `fee_lines[].total_tax`: Total Tax
- `fee_lines[].taxes`: Taxes
- `fee_lines[].taxes[].id`: Rate ID
- `fee_lines[].taxes[].total`: Total
- `fee_lines[].taxes[].subtotal`: Subtotal
- `fee_lines[].meta_data`: Meta Data
- `fee_lines[].meta_data[].id`: Meta ID
- `fee_lines[].meta_data[].key`: Key
- `fee_lines[].meta_data[].value`: Value
- `fee_lines[].meta_data[].display_key`: Display Key
- `fee_lines[].meta_data[].display_value`: Display Value
- `coupon_lines`: Coupon Lines
- `coupon_lines[].id`: Coupon Line ID
- `coupon_lines[].code`: Code
- `coupon_lines[].discount`: Discount
- `coupon_lines[].discount_tax`: Discount Tax
- `coupon_lines[].discount_type`: Discount Type
- `coupon_lines[].nominal_amount`: Nominal Amount (number)
- `coupon_lines[].free_shipping`: Free Shipping (boolean)
- `coupon_lines[].meta_data`: Meta Data
- `coupon_lines[].meta_data[].id`: Meta ID
- `coupon_lines[].meta_data[].key`: Key
- `coupon_lines[].meta_data[].value`: Value
- `coupon_lines[].meta_data[].display_key`: Display Key
- `coupon_lines[].meta_data[].display_value`: Display Value
- `refunds`: Refunds
- `refunds[].id`: Refund ID
- `refunds[].reason`: Reason
- `refunds[].total`: Total
- `refunds[].total_tax`: Total Tax
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `Update Order`

**Update Order.** Updates an existing WooCommerce order by ID. Most often used to move an order through its lifecycle by setting status (pending, processing, on-hold, completed, cancelled, refunded, failed), and can also set the customer note or transaction ID. Only the fields provided are changed. Idempotent: applying the same status twice leaves the order in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Order ID. Enter the order ID. |
| `status` | string | no |  | Status. New status for the order. One of `"pending"`, `"processing"`, `"on-hold"`, `"completed"`, `"cancelled"`, `"refunded"`, `"failed"`. |
| `customer_note` | string | no |  | Customer Note. Note shown to the customer. |
| `transaction_id` | string | no |  | Transaction ID. Payment transaction reference. |

Output fields:

- `id`: Order ID
- `number`: Order Number
- `parent_id`: Parent Order ID
- `status`: Status
- `currency`: Currency
- `currency_symbol`: Currency Symbol
- `version`: WooCommerce Version
- `prices_include_tax`: Prices Include Tax (boolean)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `date_completed`: Completed At (datetime)
- `date_completed_gmt`: Completed At (GMT) (datetime)
- `date_paid`: Paid At (datetime)
- `date_paid_gmt`: Paid At (GMT) (datetime)
- `discount_total`: Discount Total
- `discount_tax`: Discount Tax
- `shipping_total`: Shipping Total
- `shipping_tax`: Shipping Tax
- `cart_tax`: Cart Tax
- `total`: Total
- `total_tax`: Total Tax
- `customer_id`: Customer ID
- `order_key`: Order Key
- `billing`: Billing Address
- `billing.first_name`: First Name
- `billing.last_name`: Last Name
- `billing.company`: Company
- `billing.address_1`: Address Line 1
- `billing.address_2`: Address Line 2
- `billing.city`: City
- `billing.state`: State
- `billing.postcode`: Postcode
- `billing.country`: Country
- `billing.email`: Email (email)
- `billing.phone`: Phone
- `shipping`: Shipping Address
- `shipping.first_name`: First Name
- `shipping.last_name`: Last Name
- `shipping.company`: Company
- `shipping.address_1`: Address Line 1
- `shipping.address_2`: Address Line 2
- `shipping.city`: City
- `shipping.state`: State
- `shipping.postcode`: Postcode
- `shipping.country`: Country
- `shipping.phone`: Phone
- `payment_method`: Payment Method
- `payment_method_title`: Payment Method Title
- `transaction_id`: Transaction ID
- `customer_ip_address`: Customer IP Address
- `customer_user_agent`: Customer User Agent
- `created_via`: Created Via
- `customer_note`: Customer Note
- `cart_hash`: Cart Hash
- `payment_url`: Payment URL (url)
- `is_editable`: Is Editable (boolean)
- `needs_payment`: Needs Payment (boolean)
- `needs_processing`: Needs Processing (boolean)
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].product_id`: Product ID
- `line_items[].variation_id`: Variation ID
- `line_items[].quantity`: Quantity (number)
- `line_items[].tax_class`: Tax Class
- `line_items[].subtotal`: Subtotal
- `line_items[].subtotal_tax`: Subtotal Tax
- `line_items[].total`: Total
- `line_items[].total_tax`: Total Tax
- `line_items[].taxes`: Taxes
- `line_items[].taxes[].id`: Rate ID
- `line_items[].taxes[].total`: Total
- `line_items[].taxes[].subtotal`: Subtotal
- `line_items[].meta_data`: Meta Data
- `line_items[].meta_data[].id`: Meta ID
- `line_items[].meta_data[].key`: Key
- `line_items[].meta_data[].value`: Value
- `line_items[].meta_data[].display_key`: Display Key
- `line_items[].meta_data[].display_value`: Display Value
- `line_items[].sku`: SKU
- `line_items[].global_unique_id`: Global Unique ID
- `line_items[].price`: Price
- `line_items[].image`: Image
- `line_items[].image.id`: Image ID
- `line_items[].image.src`: Source URL (url)
- `line_items[].parent_name`: Parent Product Name
- `tax_lines`: Tax Lines
- `tax_lines[].id`: Tax Line ID
- `tax_lines[].rate_code`: Rate Code
- `tax_lines[].rate_id`: Rate ID
- `tax_lines[].label`: Label
- `tax_lines[].compound`: Compound (boolean)
- `tax_lines[].tax_total`: Tax Total
- `tax_lines[].shipping_tax_total`: Shipping Tax Total
- `tax_lines[].rate_percent`: Rate Percent (number)
- `tax_lines[].meta_data`: Meta Data
- `tax_lines[].meta_data[].id`: Meta ID
- `tax_lines[].meta_data[].key`: Key
- `tax_lines[].meta_data[].value`: Value
- `tax_lines[].meta_data[].display_key`: Display Key
- `tax_lines[].meta_data[].display_value`: Display Value
- `shipping_lines`: Shipping Lines
- `shipping_lines[].id`: Shipping Line ID
- `shipping_lines[].method_title`: Method Title
- `shipping_lines[].method_id`: Method ID
- `shipping_lines[].instance_id`: Instance ID
- `shipping_lines[].total`: Total
- `shipping_lines[].total_tax`: Total Tax
- `shipping_lines[].taxes`: Taxes
- `shipping_lines[].taxes[].id`: Rate ID
- `shipping_lines[].taxes[].total`: Total
- `shipping_lines[].taxes[].subtotal`: Subtotal
- `shipping_lines[].tax_status`: Tax Status
- `shipping_lines[].meta_data`: Meta Data
- `shipping_lines[].meta_data[].id`: Meta ID
- `shipping_lines[].meta_data[].key`: Key
- `shipping_lines[].meta_data[].value`: Value
- `shipping_lines[].meta_data[].display_key`: Display Key
- `shipping_lines[].meta_data[].display_value`: Display Value
- `fee_lines`: Fee Lines
- `fee_lines[].id`: Fee Line ID
- `fee_lines[].name`: Name
- `fee_lines[].tax_class`: Tax Class
- `fee_lines[].tax_status`: Tax Status
- `fee_lines[].amount`: Amount
- `fee_lines[].total`: Total
- `fee_lines[].total_tax`: Total Tax
- `fee_lines[].taxes`: Taxes
- `fee_lines[].taxes[].id`: Rate ID
- `fee_lines[].taxes[].total`: Total
- `fee_lines[].taxes[].subtotal`: Subtotal
- `fee_lines[].meta_data`: Meta Data
- `fee_lines[].meta_data[].id`: Meta ID
- `fee_lines[].meta_data[].key`: Key
- `fee_lines[].meta_data[].value`: Value
- `fee_lines[].meta_data[].display_key`: Display Key
- `fee_lines[].meta_data[].display_value`: Display Value
- `coupon_lines`: Coupon Lines
- `coupon_lines[].id`: Coupon Line ID
- `coupon_lines[].code`: Code
- `coupon_lines[].discount`: Discount
- `coupon_lines[].discount_tax`: Discount Tax
- `coupon_lines[].discount_type`: Discount Type
- `coupon_lines[].nominal_amount`: Nominal Amount (number)
- `coupon_lines[].free_shipping`: Free Shipping (boolean)
- `coupon_lines[].meta_data`: Meta Data
- `coupon_lines[].meta_data[].id`: Meta ID
- `coupon_lines[].meta_data[].key`: Key
- `coupon_lines[].meta_data[].value`: Value
- `coupon_lines[].meta_data[].display_key`: Display Key
- `coupon_lines[].meta_data[].display_value`: Display Value
- `refunds`: Refunds
- `refunds[].id`: Refund ID
- `refunds[].reason`: Reason
- `refunds[].total`: Total
- `refunds[].total_tax`: Total Tax
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `Add Order Note`

**Add Order Note.** Adds a note to an existing WooCommerce order. A private note is visible only to store staff; a customer note is emailed to the customer and shown on the order page. Use when an agent needs to record why something happened on an order or communicate an update. Not idempotent: each call appends another note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Order ID. Enter the order ID. |
| `note` | string | yes |  | Note. Content of the note. |
| `customer_note` | boolean | no | `false` | Visible To Customer. Email the note to the customer and show it on the order page. |

Output fields:

- `id`: Note ID
- `author`: Author
- `note`: Note
- `customer_note`: Visible To Customer (boolean)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)

### `add_order_note`

**Add Order Note.** Adds a note to one order: a private note for staff, or, with customer note on, a note that is emailed to the customer straight away. Read existing notes with list_order_notes. Each call adds another note, so a retry duplicates it (and resends the email). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Order ID. Enter the order ID. |
| `note` | string | yes |  | Note. Content of the note. |
| `customer_note` | boolean | no | `false` | Visible To Customer. Email the note to the customer and show it on the order page. |

Output fields:

- `id`: Note ID
- `author`: Author
- `note`: Note
- `customer_note`: Visible To Customer (boolean)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)

### `batch_update_products`

**Batch Update Products.** Updates prices, stock quantity or status of 1 to 100 products in a single request; only the fields given for each product change. The call succeeds as a whole even when some products fail, so check each returned entry for an error. For other fields, or a single product, use update_product. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `updates` | array | yes |  | Updates. One entry per product, 1 to 100 entries. Each needs the product id and at least one field to change. Each item: { `id`, `regular_price`?, `sale_price`?, `stock_quantity`?, `status`? }. |

Output fields:

- `update`: Updated Products
- `update[].id`: Product ID
- `update[].name`: Name
- `update[].slug`: Slug
- `update[].permalink`: Permalink (url)
- `update[].date_created`: Created At (datetime)
- `update[].date_created_gmt`: Created At (GMT) (datetime)
- `update[].date_modified`: Modified At (datetime)
- `update[].date_modified_gmt`: Modified At (GMT) (datetime)
- `update[].type`: Type
- `update[].status`: Status
- `update[].featured`: Featured (boolean)
- `update[].catalog_visibility`: Catalog Visibility
- `update[].description`: Description (html)
- `update[].short_description`: Short Description (html)
- `update[].sku`: SKU
- `update[].price`: Price
- `update[].regular_price`: Regular Price
- `update[].sale_price`: Sale Price
- `update[].date_on_sale_from`: On Sale From (datetime)
- `update[].date_on_sale_from_gmt`: On Sale From (GMT) (datetime)
- `update[].date_on_sale_to`: On Sale To (datetime)
- `update[].date_on_sale_to_gmt`: On Sale To (GMT) (datetime)
- `update[].on_sale`: On Sale (boolean)
- `update[].purchasable`: Purchasable (boolean)
- `update[].total_sales`: Total Sales (number)
- `update[].virtual`: Virtual (boolean)
- `update[].downloadable`: Downloadable (boolean)
- `update[].downloads`: Downloads
- `update[].downloads[].id`: Download ID
- `update[].downloads[].name`: File Name
- `update[].downloads[].file`: File URL (url)
- `update[].download_limit`: Download Limit (number)
- `update[].download_expiry`: Download Expiry (Days) (number)
- `update[].external_url`: External URL (url)
- `update[].button_text`: Button Text
- `update[].tax_status`: Tax Status
- `update[].tax_class`: Tax Class
- `update[].manage_stock`: Manage Stock (boolean)
- `update[].stock_quantity`: Stock Quantity (number)
- `update[].stock_status`: Stock Status
- `update[].backorders`: Backorders
- `update[].backorders_allowed`: Backorders Allowed (boolean)
- `update[].backordered`: Backordered (boolean)
- `update[].low_stock_amount`: Low Stock Amount (number)
- `update[].sold_individually`: Sold Individually (boolean)
- `update[].weight`: Weight
- `update[].dimensions`: Dimensions
- `update[].dimensions.length`: Length
- `update[].dimensions.width`: Width
- `update[].dimensions.height`: Height
- `update[].shipping_required`: Shipping Required (boolean)
- `update[].shipping_taxable`: Shipping Taxable (boolean)
- `update[].shipping_class`: Shipping Class
- `update[].shipping_class_id`: Shipping Class ID
- `update[].reviews_allowed`: Reviews Allowed (boolean)
- `update[].average_rating`: Average Rating
- `update[].rating_count`: Rating Count (number)
- `update[].upsell_ids`: Upsell Product IDs
- `update[].cross_sell_ids`: Cross-sell Product IDs
- `update[].related_ids`: Related Product IDs
- `update[].parent_id`: Parent Product ID
- `update[].purchase_note`: Purchase Note
- `update[].categories`: Categories
- `update[].categories[].id`: ID
- `update[].categories[].name`: Name
- `update[].categories[].slug`: Slug
- `update[].tags`: Tags
- `update[].tags[].id`: ID
- `update[].tags[].name`: Name
- `update[].tags[].slug`: Slug
- `update[].brands`: Brands
- `update[].brands[].id`: ID
- `update[].brands[].name`: Name
- `update[].brands[].slug`: Slug
- `update[].images`: Images
- `update[].images[].id`: Image ID
- `update[].images[].src`: Source URL (url)
- `update[].images[].thumbnail`: Thumbnail URL (url)
- `update[].images[].name`: Name
- `update[].images[].alt`: Alt Text
- `update[].images[].srcset`: Srcset
- `update[].images[].sizes`: Sizes
- `update[].images[].date_created`: Created At (datetime)
- `update[].images[].date_created_gmt`: Created At (GMT) (datetime)
- `update[].images[].date_modified`: Modified At (datetime)
- `update[].images[].date_modified_gmt`: Modified At (GMT) (datetime)
- `update[].attributes`: Attributes
- `update[].attributes[].id`: Attribute ID
- `update[].attributes[].name`: Name
- `update[].attributes[].slug`: Slug
- `update[].attributes[].position`: Position (number)
- `update[].attributes[].visible`: Visible (boolean)
- `update[].attributes[].variation`: Used For Variations (boolean)
- `update[].attributes[].options`: Options
- `update[].default_attributes`: Default Attributes
- `update[].default_attributes[].id`: Attribute ID
- `update[].default_attributes[].name`: Name
- `update[].default_attributes[].option`: Option
- `update[].variations`: Variation IDs
- `update[].grouped_products`: Grouped Product IDs
- `update[].menu_order`: Menu Order (number)
- `update[].price_html`: Price HTML (html)
- `update[].has_options`: Has Options (boolean)
- `update[].post_password`: Post Password
- `update[].global_unique_id`: Global Unique ID
- `update[].meta_data`: Meta Data
- `update[].meta_data[].id`: Meta ID
- `update[].meta_data[].key`: Key
- `update[].meta_data[].value`: Value
- `update[].error`: Error
- `update[].error.code`: Error Code
- `update[].error.message`: Error Message

### `create_coupon`

**Create Coupon.** Creates a discount coupon with a code, discount type and amount; optional limits and restrictions are only applied when given. Coupon codes must be unique, and a code that already exists is rejected, so check list_coupons with the code first. Each call creates a new coupon. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `code` | string | yes |  | Code. Coupon code customers enter at checkout. Must be unique. |
| `discount_type` | string | yes |  | Discount Type. Percentage off the cart, a fixed amount off the cart, or a fixed amount off each product. One of `"percent"`, `"fixed_cart"`, `"fixed_product"`. |
| `amount` | string | yes |  | Amount. Discount amount as a decimal string: a percentage for percentage coupons, otherwise money, e.g. 10. |
| `description` | string | no |  | Description. Internal description of the coupon. |
| `date_expires` | ISO date-time string | no |  | Expiry Date. The coupon stops working after this date. |
| `minimum_amount` | string | no |  | Minimum Spend. Minimum cart subtotal needed to use the coupon, e.g. 50.00. |
| `maximum_amount` | string | no |  | Maximum Spend. Maximum cart subtotal allowed when using the coupon. |
| `individual_use` | string | no |  | Individual Use Only. Yes stops this coupon from being combined with other coupons. Leave empty for the store default (No). One of `"yes"`, `"no"`. |
| `exclude_sale_items` | string | no |  | Exclude Sale Items. Yes stops the coupon from applying to items already on sale. Leave empty for the store default (No). One of `"yes"`, `"no"`. |
| `free_shipping` | string | no |  | Free Shipping. Yes lets the coupon unlock free shipping, if a free-shipping method is set up. Leave empty for the store default (No). One of `"yes"`, `"no"`. |
| `usage_limit` | number | no |  | Usage Limit. How many times the coupon can be used in total. |
| `usage_limit_per_user` | number | no |  | Usage Limit Per Customer. How many times each customer can use the coupon. |
| `product_ids` | array | no |  | Product IDs. Ids of the only products the coupon applies to. |
| `excluded_product_ids` | array | no |  | Excluded Product IDs. Ids of products the coupon never applies to. |
| `email_restrictions` | array | no |  | Allowed Emails. Only customers with these billing emails can use the coupon. |

Output fields:

- `id`: Coupon ID
- `code`: Code
- `amount`: Amount
- `status`: Status
- `discount_type`: Discount Type
- `description`: Description
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `date_expires`: Expires At (datetime)
- `date_expires_gmt`: Expires At (GMT) (datetime)
- `usage_count`: Usage Count (number)
- `individual_use`: Individual Use Only (boolean)
- `product_ids`: Product IDs
- `excluded_product_ids`: Excluded Product IDs
- `usage_limit`: Usage Limit (number)
- `usage_limit_per_user`: Usage Limit Per User (number)
- `limit_usage_to_x_items`: Limit Usage To X Items (number)
- `free_shipping`: Free Shipping (boolean)
- `product_categories`: Product Category IDs
- `excluded_product_categories`: Excluded Product Category IDs
- `exclude_sale_items`: Exclude Sale Items (boolean)
- `minimum_amount`: Minimum Amount
- `maximum_amount`: Maximum Amount
- `email_restrictions`: Email Restrictions
- `used_by`: Used By
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `create_customer`

**Create Customer.** Creates a customer account (a WordPress user with the customer role); only the email is required. Check list_customers by email first, because an email that is already registered is rejected. Username and password are generated when the store settings allow it, otherwise a password must be given; the store may email the new customer their account details. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email address of the customer. Must not already be registered. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `username` | string | no |  | Username. Login name. Generated from the email when empty and the store allows it. |
| `password` | string | no |  | Password. Account password. Generated when empty and the store allows it. |
| `billing_company` | string | no |  | Billing Company. |
| `billing_address_1` | string | no |  | Billing Address Line 1. |
| `billing_address_2` | string | no |  | Billing Address Line 2. |
| `billing_city` | string | no |  | Billing City. |
| `billing_state` | string | no |  | Billing State. State or county code, e.g. CA. |
| `billing_postcode` | string | no |  | Billing Postcode. |
| `billing_country` | string | no |  | Billing Country. Two-letter ISO country code, e.g. US. |
| `billing_phone` | string | no |  | Billing Phone. |
| `shipping_company` | string | no |  | Shipping Company. |
| `shipping_address_1` | string | no |  | Shipping Address Line 1. |
| `shipping_address_2` | string | no |  | Shipping Address Line 2. |
| `shipping_city` | string | no |  | Shipping City. |
| `shipping_state` | string | no |  | Shipping State. State or county code, e.g. CA. |
| `shipping_postcode` | string | no |  | Shipping Postcode. |
| `shipping_country` | string | no |  | Shipping Country. Two-letter ISO country code, e.g. US. |

Output fields:

- `id`: Customer ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `username`: Username
- `role`: Role
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `billing`: Billing Address
- `billing.first_name`: First Name
- `billing.last_name`: Last Name
- `billing.company`: Company
- `billing.address_1`: Address Line 1
- `billing.address_2`: Address Line 2
- `billing.city`: City
- `billing.state`: State
- `billing.postcode`: Postcode
- `billing.country`: Country
- `billing.email`: Email (email)
- `billing.phone`: Phone
- `shipping`: Shipping Address
- `shipping.first_name`: First Name
- `shipping.last_name`: Last Name
- `shipping.company`: Company
- `shipping.address_1`: Address Line 1
- `shipping.address_2`: Address Line 2
- `shipping.city`: City
- `shipping.state`: State
- `shipping.postcode`: Postcode
- `shipping.country`: Country
- `shipping.phone`: Phone
- `is_paying_customer`: Is Paying Customer (boolean)
- `avatar_url`: Avatar URL (url)
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `create_order`

**Create Order.** Creates a new order from product ids and quantities, optionally for a customer, with a status, and with a payment gateway; get product ids from list_products (a variation id can be used as the product id), customer ids from list_customers, and payment gateways from list_payment_gateways, passing the gateway id as Payment Method ID and its title as Payment Method Title. Status processing or completed reduces stock and emails the customer, while pending (the default) does neither. Each call creates a separate order. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `line_items` | array | yes |  | Line Items. Products to include in the order. Each item: { `product_id`, `quantity` }. |
| `customer_id` | string | no |  | Customer ID. Leave empty for a guest order. |
| `status` | string | no |  | Status. Status the order is created with. One of `"pending"`, `"processing"`, `"on-hold"`, `"completed"`. |
| `billing_email` | string | no |  | Billing Email. Email address for the order. |
| `payment_method` | string | no |  | Payment Method ID. Payment gateway id the order is associated with, e.g. bacs, cheque or cod. |
| `payment_method_title` | string | no |  | Payment Method Title. Human-readable payment method, e.g. Direct bank transfer. |

Output fields:

- `id`: Order ID
- `number`: Order Number
- `parent_id`: Parent Order ID
- `status`: Status
- `currency`: Currency
- `currency_symbol`: Currency Symbol
- `version`: WooCommerce Version
- `prices_include_tax`: Prices Include Tax (boolean)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `date_completed`: Completed At (datetime)
- `date_completed_gmt`: Completed At (GMT) (datetime)
- `date_paid`: Paid At (datetime)
- `date_paid_gmt`: Paid At (GMT) (datetime)
- `discount_total`: Discount Total
- `discount_tax`: Discount Tax
- `shipping_total`: Shipping Total
- `shipping_tax`: Shipping Tax
- `cart_tax`: Cart Tax
- `total`: Total
- `total_tax`: Total Tax
- `customer_id`: Customer ID
- `order_key`: Order Key
- `billing`: Billing Address
- `billing.first_name`: First Name
- `billing.last_name`: Last Name
- `billing.company`: Company
- `billing.address_1`: Address Line 1
- `billing.address_2`: Address Line 2
- `billing.city`: City
- `billing.state`: State
- `billing.postcode`: Postcode
- `billing.country`: Country
- `billing.email`: Email (email)
- `billing.phone`: Phone
- `shipping`: Shipping Address
- `shipping.first_name`: First Name
- `shipping.last_name`: Last Name
- `shipping.company`: Company
- `shipping.address_1`: Address Line 1
- `shipping.address_2`: Address Line 2
- `shipping.city`: City
- `shipping.state`: State
- `shipping.postcode`: Postcode
- `shipping.country`: Country
- `shipping.phone`: Phone
- `payment_method`: Payment Method
- `payment_method_title`: Payment Method Title
- `transaction_id`: Transaction ID
- `customer_ip_address`: Customer IP Address
- `customer_user_agent`: Customer User Agent
- `created_via`: Created Via
- `customer_note`: Customer Note
- `cart_hash`: Cart Hash
- `payment_url`: Payment URL (url)
- `is_editable`: Is Editable (boolean)
- `needs_payment`: Needs Payment (boolean)
- `needs_processing`: Needs Processing (boolean)
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].product_id`: Product ID
- `line_items[].variation_id`: Variation ID
- `line_items[].quantity`: Quantity (number)
- `line_items[].tax_class`: Tax Class
- `line_items[].subtotal`: Subtotal
- `line_items[].subtotal_tax`: Subtotal Tax
- `line_items[].total`: Total
- `line_items[].total_tax`: Total Tax
- `line_items[].taxes`: Taxes
- `line_items[].taxes[].id`: Rate ID
- `line_items[].taxes[].total`: Total
- `line_items[].taxes[].subtotal`: Subtotal
- `line_items[].meta_data`: Meta Data
- `line_items[].meta_data[].id`: Meta ID
- `line_items[].meta_data[].key`: Key
- `line_items[].meta_data[].value`: Value
- `line_items[].meta_data[].display_key`: Display Key
- `line_items[].meta_data[].display_value`: Display Value
- `line_items[].sku`: SKU
- `line_items[].global_unique_id`: Global Unique ID
- `line_items[].price`: Price
- `line_items[].image`: Image
- `line_items[].image.id`: Image ID
- `line_items[].image.src`: Source URL (url)
- `line_items[].parent_name`: Parent Product Name
- `tax_lines`: Tax Lines
- `tax_lines[].id`: Tax Line ID
- `tax_lines[].rate_code`: Rate Code
- `tax_lines[].rate_id`: Rate ID
- `tax_lines[].label`: Label
- `tax_lines[].compound`: Compound (boolean)
- `tax_lines[].tax_total`: Tax Total
- `tax_lines[].shipping_tax_total`: Shipping Tax Total
- `tax_lines[].rate_percent`: Rate Percent (number)
- `tax_lines[].meta_data`: Meta Data
- `tax_lines[].meta_data[].id`: Meta ID
- `tax_lines[].meta_data[].key`: Key
- `tax_lines[].meta_data[].value`: Value
- `tax_lines[].meta_data[].display_key`: Display Key
- `tax_lines[].meta_data[].display_value`: Display Value
- `shipping_lines`: Shipping Lines
- `shipping_lines[].id`: Shipping Line ID
- `shipping_lines[].method_title`: Method Title
- `shipping_lines[].method_id`: Method ID
- `shipping_lines[].instance_id`: Instance ID
- `shipping_lines[].total`: Total
- `shipping_lines[].total_tax`: Total Tax
- `shipping_lines[].taxes`: Taxes
- `shipping_lines[].taxes[].id`: Rate ID
- `shipping_lines[].taxes[].total`: Total
- `shipping_lines[].taxes[].subtotal`: Subtotal
- `shipping_lines[].tax_status`: Tax Status
- `shipping_lines[].meta_data`: Meta Data
- `shipping_lines[].meta_data[].id`: Meta ID
- `shipping_lines[].meta_data[].key`: Key
- `shipping_lines[].meta_data[].value`: Value
- `shipping_lines[].meta_data[].display_key`: Display Key
- `shipping_lines[].meta_data[].display_value`: Display Value
- `fee_lines`: Fee Lines
- `fee_lines[].id`: Fee Line ID
- `fee_lines[].name`: Name
- `fee_lines[].tax_class`: Tax Class
- `fee_lines[].tax_status`: Tax Status
- `fee_lines[].amount`: Amount
- `fee_lines[].total`: Total
- `fee_lines[].total_tax`: Total Tax
- `fee_lines[].taxes`: Taxes
- `fee_lines[].taxes[].id`: Rate ID
- `fee_lines[].taxes[].total`: Total
- `fee_lines[].taxes[].subtotal`: Subtotal
- `fee_lines[].meta_data`: Meta Data
- `fee_lines[].meta_data[].id`: Meta ID
- `fee_lines[].meta_data[].key`: Key
- `fee_lines[].meta_data[].value`: Value
- `fee_lines[].meta_data[].display_key`: Display Key
- `fee_lines[].meta_data[].display_value`: Display Value
- `coupon_lines`: Coupon Lines
- `coupon_lines[].id`: Coupon Line ID
- `coupon_lines[].code`: Code
- `coupon_lines[].discount`: Discount
- `coupon_lines[].discount_tax`: Discount Tax
- `coupon_lines[].discount_type`: Discount Type
- `coupon_lines[].nominal_amount`: Nominal Amount (number)
- `coupon_lines[].free_shipping`: Free Shipping (boolean)
- `coupon_lines[].meta_data`: Meta Data
- `coupon_lines[].meta_data[].id`: Meta ID
- `coupon_lines[].meta_data[].key`: Key
- `coupon_lines[].meta_data[].value`: Value
- `coupon_lines[].meta_data[].display_key`: Display Key
- `coupon_lines[].meta_data[].display_value`: Display Value
- `refunds`: Refunds
- `refunds[].id`: Refund ID
- `refunds[].reason`: Reason
- `refunds[].total`: Total
- `refunds[].total_tax`: Total Tax
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `create_order_refund`

**Create Order Refund.** Records an irreversible refund of an amount on one order and emails the customer about it; by default no money moves, but the order total drops and a full refund marks the order refunded. With Refund Via Gateway on, real money is sent back through the payment gateway, which fails on gateways without refund support (bank transfer, cheque, cash on delivery). Check list_order_refunds first, because each call adds another refund. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | number | yes |  | Order ID. Id of the order to refund. |
| `amount` | string | yes |  | Amount. Amount to refund as a decimal string, e.g. 10.00. Cannot exceed what is left to refund on the order. |
| `reason` | string | no |  | Reason. Reason for the refund, stored with the refund. |
| `refund_via_gateway` | boolean | no | `false` | Refund Via Gateway. When on, the money is actually sent back to the customer through the payment gateway. When off (the default) the refund is only recorded in WooCommerce. |

Output fields:

- `id`: Refund ID
- `amount`: Amount
- `reason`: Reason
- `refunded_by`: Refunded By User ID
- `refunded_payment`: Refunded Through Gateway (boolean)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `line_items`: Refunded Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].product_id`: Product ID
- `line_items[].variation_id`: Variation ID
- `line_items[].quantity`: Quantity (number)
- `line_items[].tax_class`: Tax Class
- `line_items[].subtotal`: Subtotal
- `line_items[].subtotal_tax`: Subtotal Tax
- `line_items[].total`: Total
- `line_items[].total_tax`: Total Tax
- `line_items[].taxes`: Taxes
- `line_items[].taxes[].id`: Rate ID
- `line_items[].taxes[].total`: Total
- `line_items[].taxes[].subtotal`: Subtotal
- `line_items[].meta_data`: Meta Data
- `line_items[].meta_data[].id`: Meta ID
- `line_items[].meta_data[].key`: Key
- `line_items[].meta_data[].value`: Value
- `line_items[].meta_data[].display_key`: Display Key
- `line_items[].meta_data[].display_value`: Display Value
- `line_items[].sku`: SKU
- `line_items[].global_unique_id`: Global Unique ID
- `line_items[].price`: Price
- `line_items[].image`: Image
- `line_items[].image.id`: Image ID
- `line_items[].image.src`: Source URL (url)
- `line_items[].parent_name`: Parent Product Name
- `shipping_lines`: Refunded Shipping Lines
- `shipping_lines[].id`: Shipping Line ID
- `shipping_lines[].method_title`: Method Title
- `shipping_lines[].method_id`: Method ID
- `shipping_lines[].instance_id`: Instance ID
- `shipping_lines[].total`: Total
- `shipping_lines[].total_tax`: Total Tax
- `shipping_lines[].taxes`: Taxes
- `shipping_lines[].taxes[].id`: Rate ID
- `shipping_lines[].taxes[].total`: Total
- `shipping_lines[].taxes[].subtotal`: Subtotal
- `shipping_lines[].tax_status`: Tax Status
- `shipping_lines[].meta_data`: Meta Data
- `shipping_lines[].meta_data[].id`: Meta ID
- `shipping_lines[].meta_data[].key`: Key
- `shipping_lines[].meta_data[].value`: Value
- `shipping_lines[].meta_data[].display_key`: Display Key
- `shipping_lines[].meta_data[].display_value`: Display Value
- `tax_lines`: Refunded Tax Lines
- `tax_lines[].id`: Tax Line ID
- `tax_lines[].rate_code`: Rate Code
- `tax_lines[].rate_id`: Rate ID
- `tax_lines[].label`: Label
- `tax_lines[].compound`: Compound (boolean)
- `tax_lines[].tax_total`: Tax Total
- `tax_lines[].shipping_tax_total`: Shipping Tax Total
- `tax_lines[].rate_percent`: Rate Percent (number)
- `tax_lines[].meta_data`: Meta Data
- `tax_lines[].meta_data[].id`: Meta ID
- `tax_lines[].meta_data[].key`: Key
- `tax_lines[].meta_data[].value`: Value
- `tax_lines[].meta_data[].display_key`: Display Key
- `tax_lines[].meta_data[].display_value`: Display Value
- `fee_lines`: Refunded Fee Lines
- `fee_lines[].id`: Fee Line ID
- `fee_lines[].name`: Name
- `fee_lines[].tax_class`: Tax Class
- `fee_lines[].tax_status`: Tax Status
- `fee_lines[].amount`: Amount
- `fee_lines[].total`: Total
- `fee_lines[].total_tax`: Total Tax
- `fee_lines[].taxes`: Taxes
- `fee_lines[].taxes[].id`: Rate ID
- `fee_lines[].taxes[].total`: Total
- `fee_lines[].taxes[].subtotal`: Subtotal
- `fee_lines[].meta_data`: Meta Data
- `fee_lines[].meta_data[].id`: Meta ID
- `fee_lines[].meta_data[].key`: Key
- `fee_lines[].meta_data[].value`: Value
- `fee_lines[].meta_data[].display_key`: Display Key
- `fee_lines[].meta_data[].display_value`: Display Value
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `create_product`

**Create Product.** Creates a new product in the store catalog; only the name is required and it is published as a simple product unless told otherwise. Check list_products by SKU or name first, because each call creates a separate product. A variable product is created without variations. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Product name. |
| `type` | string | no |  | Product Type. Defaults to simple. One of `"simple"`, `"variable"`, `"grouped"`, `"external"`. |
| `status` | string | no |  | Status. Defaults to published, which makes the product visible in the shop. One of `"publish"`, `"draft"`, `"pending"`, `"private"`. |
| `regular_price` | string | no |  | Regular Price. Price as a decimal string, e.g. 19.99. |
| `sale_price` | string | no |  | Sale Price. Discounted price as a decimal string. Must be lower than the regular price. |
| `sku` | string | no |  | SKU. Stock keeping unit. Must be unique in the store. |
| `description` | string | no |  | Description. Full product description. HTML is allowed. |
| `short_description` | string | no |  | Short Description. Short summary shown near the price. HTML is allowed. |
| `category_ids` | array | no |  | Category IDs. Ids of the categories to put the product in. Find them with list_product_categories. |
| `tag_ids` | array | no |  | Tag IDs. Ids of the tags to attach. Find them with list_product_tags. |
| `image_urls` | array | no |  | Image URLs. Public image URLs. The first one becomes the main image. The store downloads each one, so an unreachable URL fails the call. |
| `stock_quantity` | number | no |  | Stock Quantity. Units in stock. Setting it turns on stock management for the product. |
| `stock_status` | string | no |  | Stock Status. Stock status. Ignored when a stock quantity is set, because the quantity decides it. One of `"instock"`, `"outofstock"`, `"onbackorder"`. |

Output fields:

- `id`: Product ID
- `name`: Name
- `slug`: Slug
- `permalink`: Permalink (url)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `type`: Type
- `status`: Status
- `featured`: Featured (boolean)
- `catalog_visibility`: Catalog Visibility
- `description`: Description (html)
- `short_description`: Short Description (html)
- `sku`: SKU
- `price`: Price
- `regular_price`: Regular Price
- `sale_price`: Sale Price
- `date_on_sale_from`: On Sale From (datetime)
- `date_on_sale_from_gmt`: On Sale From (GMT) (datetime)
- `date_on_sale_to`: On Sale To (datetime)
- `date_on_sale_to_gmt`: On Sale To (GMT) (datetime)
- `on_sale`: On Sale (boolean)
- `purchasable`: Purchasable (boolean)
- `total_sales`: Total Sales (number)
- `virtual`: Virtual (boolean)
- `downloadable`: Downloadable (boolean)
- `downloads`: Downloads
- `downloads[].id`: Download ID
- `downloads[].name`: File Name
- `downloads[].file`: File URL (url)
- `download_limit`: Download Limit (number)
- `download_expiry`: Download Expiry (Days) (number)
- `external_url`: External URL (url)
- `button_text`: Button Text
- `tax_status`: Tax Status
- `tax_class`: Tax Class
- `manage_stock`: Manage Stock (boolean)
- `stock_quantity`: Stock Quantity (number)
- `stock_status`: Stock Status
- `backorders`: Backorders
- `backorders_allowed`: Backorders Allowed (boolean)
- `backordered`: Backordered (boolean)
- `low_stock_amount`: Low Stock Amount (number)
- `sold_individually`: Sold Individually (boolean)
- `weight`: Weight
- `dimensions`: Dimensions
- `dimensions.length`: Length
- `dimensions.width`: Width
- `dimensions.height`: Height
- `shipping_required`: Shipping Required (boolean)
- `shipping_taxable`: Shipping Taxable (boolean)
- `shipping_class`: Shipping Class
- `shipping_class_id`: Shipping Class ID
- `reviews_allowed`: Reviews Allowed (boolean)
- `average_rating`: Average Rating
- `rating_count`: Rating Count (number)
- `upsell_ids`: Upsell Product IDs
- `cross_sell_ids`: Cross-sell Product IDs
- `related_ids`: Related Product IDs
- `parent_id`: Parent Product ID
- `purchase_note`: Purchase Note
- `categories`: Categories
- `categories[].id`: ID
- `categories[].name`: Name
- `categories[].slug`: Slug
- `tags`: Tags
- `tags[].id`: ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `brands`: Brands
- `brands[].id`: ID
- `brands[].name`: Name
- `brands[].slug`: Slug
- `images`: Images
- `images[].id`: Image ID
- `images[].src`: Source URL (url)
- `images[].thumbnail`: Thumbnail URL (url)
- `images[].name`: Name
- `images[].alt`: Alt Text
- `images[].srcset`: Srcset
- `images[].sizes`: Sizes
- `images[].date_created`: Created At (datetime)
- `images[].date_created_gmt`: Created At (GMT) (datetime)
- `images[].date_modified`: Modified At (datetime)
- `images[].date_modified_gmt`: Modified At (GMT) (datetime)
- `attributes`: Attributes
- `attributes[].id`: Attribute ID
- `attributes[].name`: Name
- `attributes[].slug`: Slug
- `attributes[].position`: Position (number)
- `attributes[].visible`: Visible (boolean)
- `attributes[].variation`: Used For Variations (boolean)
- `attributes[].options`: Options
- `default_attributes`: Default Attributes
- `default_attributes[].id`: Attribute ID
- `default_attributes[].name`: Name
- `default_attributes[].option`: Option
- `variations`: Variation IDs
- `grouped_products`: Grouped Product IDs
- `menu_order`: Menu Order (number)
- `price_html`: Price HTML (html)
- `has_options`: Has Options (boolean)
- `post_password`: Post Password
- `global_unique_id`: Global Unique ID
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `create_product_category`

**Create Product Category.** Creates a new product category, optionally under a parent category. Look it up with list_product_categories first: a category with the same name under the same parent is rejected, and the error message then gives the existing category id to use instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Category name. |
| `parent_id` | number | no |  | Parent Category ID. Id of the parent category. Leave empty for a top-level category. |
| `slug` | string | no |  | Slug. URL-friendly name. Generated from the name when empty. |
| `description` | string | no |  | Description. Category description. HTML is allowed. |

Output fields:

- `id`: Category ID
- `name`: Name
- `slug`: Slug
- `parent`: Parent Category ID
- `description`: Description (html)
- `display`: Display Type
- `image`: Image
- `menu_order`: Menu Order (number)
- `count`: Product Count (number)

### `create_product_tag`

**Create Product Tag.** Creates a new product tag. Look it up with list_product_tags first: a tag with the same name is rejected, and the error message then gives the existing tag id to use instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Tag name. |
| `slug` | string | no |  | Slug. URL-friendly name. Generated from the name when empty. |
| `description` | string | no |  | Description. Tag description. |

Output fields:

- `id`: Tag ID
- `name`: Name
- `slug`: Slug
- `description`: Description
- `count`: Product Count (number)

### `delete_coupon`

**Delete Coupon.** Removes one coupon by id (find it with list_coupons by code) so it can no longer be used. By default it goes to the trash, which a person can restore from the WordPress admin; with permanent it is deleted for good. Trashing an already-trashed coupon fails, so a retry is not safe. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `coupon_id` | number | yes |  | Coupon ID. Id of the coupon to delete. |
| `permanent` | boolean | no | `false` | Delete Permanently. When off (the default) the coupon is moved to the trash and can be restored from the WordPress admin. When on it is deleted for good. |

Output fields:

- `id`: Coupon ID
- `code`: Code
- `amount`: Amount
- `status`: Status
- `discount_type`: Discount Type
- `description`: Description
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `date_expires`: Expires At (datetime)
- `date_expires_gmt`: Expires At (GMT) (datetime)
- `usage_count`: Usage Count (number)
- `individual_use`: Individual Use Only (boolean)
- `product_ids`: Product IDs
- `excluded_product_ids`: Excluded Product IDs
- `usage_limit`: Usage Limit (number)
- `usage_limit_per_user`: Usage Limit Per User (number)
- `limit_usage_to_x_items`: Limit Usage To X Items (number)
- `free_shipping`: Free Shipping (boolean)
- `product_categories`: Product Category IDs
- `excluded_product_categories`: Excluded Product Category IDs
- `exclude_sale_items`: Exclude Sale Items (boolean)
- `minimum_amount`: Minimum Amount
- `maximum_amount`: Maximum Amount
- `email_restrictions`: Email Restrictions
- `used_by`: Used By
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `delete_customer`

**Delete Customer.** Permanently deletes one customer account (its WordPress user); customers have no trash, so it cannot be restored. Only accounts with the customer or subscriber role can be deleted here, so staff and administrators are refused. Their orders stay in the store; optionally reassign their posts to another user id. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | number | yes |  | Customer ID. Id of the customer to delete. Find it with list_customers. |
| `reassign_to_user_id` | number | no |  | Reassign To User ID. Optional id of another user who takes over the posts owned by the deleted customer. Must differ from the customer id. |

Output fields:

- `id`: Customer ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `username`: Username
- `role`: Role
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `billing`: Billing Address
- `billing.first_name`: First Name
- `billing.last_name`: Last Name
- `billing.company`: Company
- `billing.address_1`: Address Line 1
- `billing.address_2`: Address Line 2
- `billing.city`: City
- `billing.state`: State
- `billing.postcode`: Postcode
- `billing.country`: Country
- `billing.email`: Email (email)
- `billing.phone`: Phone
- `shipping`: Shipping Address
- `shipping.first_name`: First Name
- `shipping.last_name`: Last Name
- `shipping.company`: Company
- `shipping.address_1`: Address Line 1
- `shipping.address_2`: Address Line 2
- `shipping.city`: City
- `shipping.state`: State
- `shipping.postcode`: Postcode
- `shipping.country`: Country
- `shipping.phone`: Phone
- `is_paying_customer`: Is Paying Customer (boolean)
- `avatar_url`: Avatar URL (url)
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `delete_order`

**Delete Order.** Removes one order by id; to stop an order without removing it, set its status to cancelled with update_order instead. By default it goes to the trash, which a person can restore from the WordPress admin; with permanent it is deleted for good. Trashing an already-trashed order fails, so a retry is not safe. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | number | yes |  | Order ID. Id of the order to delete. Find it with list_orders. |
| `permanent` | boolean | no | `false` | Delete Permanently. When off (the default) the order is moved to the trash and can be restored from the WordPress admin. When on it is deleted for good. |

Output fields:

- `id`: Order ID
- `number`: Order Number
- `parent_id`: Parent Order ID
- `status`: Status
- `currency`: Currency
- `currency_symbol`: Currency Symbol
- `version`: WooCommerce Version
- `prices_include_tax`: Prices Include Tax (boolean)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `date_completed`: Completed At (datetime)
- `date_completed_gmt`: Completed At (GMT) (datetime)
- `date_paid`: Paid At (datetime)
- `date_paid_gmt`: Paid At (GMT) (datetime)
- `discount_total`: Discount Total
- `discount_tax`: Discount Tax
- `shipping_total`: Shipping Total
- `shipping_tax`: Shipping Tax
- `cart_tax`: Cart Tax
- `total`: Total
- `total_tax`: Total Tax
- `customer_id`: Customer ID
- `order_key`: Order Key
- `billing`: Billing Address
- `billing.first_name`: First Name
- `billing.last_name`: Last Name
- `billing.company`: Company
- `billing.address_1`: Address Line 1
- `billing.address_2`: Address Line 2
- `billing.city`: City
- `billing.state`: State
- `billing.postcode`: Postcode
- `billing.country`: Country
- `billing.email`: Email (email)
- `billing.phone`: Phone
- `shipping`: Shipping Address
- `shipping.first_name`: First Name
- `shipping.last_name`: Last Name
- `shipping.company`: Company
- `shipping.address_1`: Address Line 1
- `shipping.address_2`: Address Line 2
- `shipping.city`: City
- `shipping.state`: State
- `shipping.postcode`: Postcode
- `shipping.country`: Country
- `shipping.phone`: Phone
- `payment_method`: Payment Method
- `payment_method_title`: Payment Method Title
- `transaction_id`: Transaction ID
- `customer_ip_address`: Customer IP Address
- `customer_user_agent`: Customer User Agent
- `created_via`: Created Via
- `customer_note`: Customer Note
- `cart_hash`: Cart Hash
- `payment_url`: Payment URL (url)
- `is_editable`: Is Editable (boolean)
- `needs_payment`: Needs Payment (boolean)
- `needs_processing`: Needs Processing (boolean)
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].product_id`: Product ID
- `line_items[].variation_id`: Variation ID
- `line_items[].quantity`: Quantity (number)
- `line_items[].tax_class`: Tax Class
- `line_items[].subtotal`: Subtotal
- `line_items[].subtotal_tax`: Subtotal Tax
- `line_items[].total`: Total
- `line_items[].total_tax`: Total Tax
- `line_items[].taxes`: Taxes
- `line_items[].taxes[].id`: Rate ID
- `line_items[].taxes[].total`: Total
- `line_items[].taxes[].subtotal`: Subtotal
- `line_items[].meta_data`: Meta Data
- `line_items[].meta_data[].id`: Meta ID
- `line_items[].meta_data[].key`: Key
- `line_items[].meta_data[].value`: Value
- `line_items[].meta_data[].display_key`: Display Key
- `line_items[].meta_data[].display_value`: Display Value
- `line_items[].sku`: SKU
- `line_items[].global_unique_id`: Global Unique ID
- `line_items[].price`: Price
- `line_items[].image`: Image
- `line_items[].image.id`: Image ID
- `line_items[].image.src`: Source URL (url)
- `line_items[].parent_name`: Parent Product Name
- `tax_lines`: Tax Lines
- `tax_lines[].id`: Tax Line ID
- `tax_lines[].rate_code`: Rate Code
- `tax_lines[].rate_id`: Rate ID
- `tax_lines[].label`: Label
- `tax_lines[].compound`: Compound (boolean)
- `tax_lines[].tax_total`: Tax Total
- `tax_lines[].shipping_tax_total`: Shipping Tax Total
- `tax_lines[].rate_percent`: Rate Percent (number)
- `tax_lines[].meta_data`: Meta Data
- `tax_lines[].meta_data[].id`: Meta ID
- `tax_lines[].meta_data[].key`: Key
- `tax_lines[].meta_data[].value`: Value
- `tax_lines[].meta_data[].display_key`: Display Key
- `tax_lines[].meta_data[].display_value`: Display Value
- `shipping_lines`: Shipping Lines
- `shipping_lines[].id`: Shipping Line ID
- `shipping_lines[].method_title`: Method Title
- `shipping_lines[].method_id`: Method ID
- `shipping_lines[].instance_id`: Instance ID
- `shipping_lines[].total`: Total
- `shipping_lines[].total_tax`: Total Tax
- `shipping_lines[].taxes`: Taxes
- `shipping_lines[].taxes[].id`: Rate ID
- `shipping_lines[].taxes[].total`: Total
- `shipping_lines[].taxes[].subtotal`: Subtotal
- `shipping_lines[].tax_status`: Tax Status
- `shipping_lines[].meta_data`: Meta Data
- `shipping_lines[].meta_data[].id`: Meta ID
- `shipping_lines[].meta_data[].key`: Key
- `shipping_lines[].meta_data[].value`: Value
- `shipping_lines[].meta_data[].display_key`: Display Key
- `shipping_lines[].meta_data[].display_value`: Display Value
- `fee_lines`: Fee Lines
- `fee_lines[].id`: Fee Line ID
- `fee_lines[].name`: Name
- `fee_lines[].tax_class`: Tax Class
- `fee_lines[].tax_status`: Tax Status
- `fee_lines[].amount`: Amount
- `fee_lines[].total`: Total
- `fee_lines[].total_tax`: Total Tax
- `fee_lines[].taxes`: Taxes
- `fee_lines[].taxes[].id`: Rate ID
- `fee_lines[].taxes[].total`: Total
- `fee_lines[].taxes[].subtotal`: Subtotal
- `fee_lines[].meta_data`: Meta Data
- `fee_lines[].meta_data[].id`: Meta ID
- `fee_lines[].meta_data[].key`: Key
- `fee_lines[].meta_data[].value`: Value
- `fee_lines[].meta_data[].display_key`: Display Key
- `fee_lines[].meta_data[].display_value`: Display Value
- `coupon_lines`: Coupon Lines
- `coupon_lines[].id`: Coupon Line ID
- `coupon_lines[].code`: Code
- `coupon_lines[].discount`: Discount
- `coupon_lines[].discount_tax`: Discount Tax
- `coupon_lines[].discount_type`: Discount Type
- `coupon_lines[].nominal_amount`: Nominal Amount (number)
- `coupon_lines[].free_shipping`: Free Shipping (boolean)
- `coupon_lines[].meta_data`: Meta Data
- `coupon_lines[].meta_data[].id`: Meta ID
- `coupon_lines[].meta_data[].key`: Key
- `coupon_lines[].meta_data[].value`: Value
- `coupon_lines[].meta_data[].display_key`: Display Key
- `coupon_lines[].meta_data[].display_value`: Display Value
- `refunds`: Refunds
- `refunds[].id`: Refund ID
- `refunds[].reason`: Reason
- `refunds[].total`: Total
- `refunds[].total_tax`: Total Tax
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `delete_order_note`

**Delete Order Note.** Permanently deletes one note from an order (find note ids with list_order_notes); order notes have no trash, so it cannot be restored. Deleting a note sent to the customer does not unsend the email. A second call for the same note fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | number | yes |  | Order ID. Id of the order the note belongs to. |
| `note_id` | number | yes |  | Note ID. Id of the note to delete. |

Output fields:

- `id`: Note ID
- `author`: Author
- `note`: Note
- `customer_note`: Visible To Customer (boolean)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)

### `delete_product`

**Delete Product.** Removes one product by id. By default it goes to the trash, which a person can restore from the WordPress admin; with permanent it is deleted for good, together with all variations of a variable product. Trashing an already-trashed product fails, so a retry is not safe. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | number | yes |  | Product ID. Id of the product to delete. Find it with list_products. |
| `permanent` | boolean | no | `false` | Delete Permanently. When off (the default) the product is moved to the trash and can be restored from the WordPress admin. When on it is deleted for good. |

Output fields:

- `id`: Product ID
- `name`: Name
- `slug`: Slug
- `permalink`: Permalink (url)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `type`: Type
- `status`: Status
- `featured`: Featured (boolean)
- `catalog_visibility`: Catalog Visibility
- `description`: Description (html)
- `short_description`: Short Description (html)
- `sku`: SKU
- `price`: Price
- `regular_price`: Regular Price
- `sale_price`: Sale Price
- `date_on_sale_from`: On Sale From (datetime)
- `date_on_sale_from_gmt`: On Sale From (GMT) (datetime)
- `date_on_sale_to`: On Sale To (datetime)
- `date_on_sale_to_gmt`: On Sale To (GMT) (datetime)
- `on_sale`: On Sale (boolean)
- `purchasable`: Purchasable (boolean)
- `total_sales`: Total Sales (number)
- `virtual`: Virtual (boolean)
- `downloadable`: Downloadable (boolean)
- `downloads`: Downloads
- `downloads[].id`: Download ID
- `downloads[].name`: File Name
- `downloads[].file`: File URL (url)
- `download_limit`: Download Limit (number)
- `download_expiry`: Download Expiry (Days) (number)
- `external_url`: External URL (url)
- `button_text`: Button Text
- `tax_status`: Tax Status
- `tax_class`: Tax Class
- `manage_stock`: Manage Stock (boolean)
- `stock_quantity`: Stock Quantity (number)
- `stock_status`: Stock Status
- `backorders`: Backorders
- `backorders_allowed`: Backorders Allowed (boolean)
- `backordered`: Backordered (boolean)
- `low_stock_amount`: Low Stock Amount (number)
- `sold_individually`: Sold Individually (boolean)
- `weight`: Weight
- `dimensions`: Dimensions
- `dimensions.length`: Length
- `dimensions.width`: Width
- `dimensions.height`: Height
- `shipping_required`: Shipping Required (boolean)
- `shipping_taxable`: Shipping Taxable (boolean)
- `shipping_class`: Shipping Class
- `shipping_class_id`: Shipping Class ID
- `reviews_allowed`: Reviews Allowed (boolean)
- `average_rating`: Average Rating
- `rating_count`: Rating Count (number)
- `upsell_ids`: Upsell Product IDs
- `cross_sell_ids`: Cross-sell Product IDs
- `related_ids`: Related Product IDs
- `parent_id`: Parent Product ID
- `purchase_note`: Purchase Note
- `categories`: Categories
- `categories[].id`: ID
- `categories[].name`: Name
- `categories[].slug`: Slug
- `tags`: Tags
- `tags[].id`: ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `brands`: Brands
- `brands[].id`: ID
- `brands[].name`: Name
- `brands[].slug`: Slug
- `images`: Images
- `images[].id`: Image ID
- `images[].src`: Source URL (url)
- `images[].thumbnail`: Thumbnail URL (url)
- `images[].name`: Name
- `images[].alt`: Alt Text
- `images[].srcset`: Srcset
- `images[].sizes`: Sizes
- `images[].date_created`: Created At (datetime)
- `images[].date_created_gmt`: Created At (GMT) (datetime)
- `images[].date_modified`: Modified At (datetime)
- `images[].date_modified_gmt`: Modified At (GMT) (datetime)
- `attributes`: Attributes
- `attributes[].id`: Attribute ID
- `attributes[].name`: Name
- `attributes[].slug`: Slug
- `attributes[].position`: Position (number)
- `attributes[].visible`: Visible (boolean)
- `attributes[].variation`: Used For Variations (boolean)
- `attributes[].options`: Options
- `default_attributes`: Default Attributes
- `default_attributes[].id`: Attribute ID
- `default_attributes[].name`: Name
- `default_attributes[].option`: Option
- `variations`: Variation IDs
- `grouped_products`: Grouped Product IDs
- `menu_order`: Menu Order (number)
- `price_html`: Price HTML (html)
- `has_options`: Has Options (boolean)
- `post_password`: Post Password
- `global_unique_id`: Global Unique ID
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `get_coupon`

**Get Coupon.** Returns one coupon by its numeric id with its code, discount, limits, restrictions and usage count. To find a coupon by its code use list_coupons. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Coupon ID. Enter the coupon ID. |

Output fields:

- `id`: Coupon ID
- `code`: Code
- `amount`: Amount
- `status`: Status
- `discount_type`: Discount Type
- `description`: Description
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `date_expires`: Expires At (datetime)
- `date_expires_gmt`: Expires At (GMT) (datetime)
- `usage_count`: Usage Count (number)
- `individual_use`: Individual Use Only (boolean)
- `product_ids`: Product IDs
- `excluded_product_ids`: Excluded Product IDs
- `usage_limit`: Usage Limit (number)
- `usage_limit_per_user`: Usage Limit Per User (number)
- `limit_usage_to_x_items`: Limit Usage To X Items (number)
- `free_shipping`: Free Shipping (boolean)
- `product_categories`: Product Category IDs
- `excluded_product_categories`: Excluded Product Category IDs
- `exclude_sale_items`: Exclude Sale Items (boolean)
- `minimum_amount`: Minimum Amount
- `maximum_amount`: Maximum Amount
- `email_restrictions`: Email Restrictions
- `used_by`: Used By
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `get_customer`

**Get Customer.** Returns one customer by numeric id, with role, billing and shipping addresses and whether they have paid for an order. To find a customer by email or name use list_customers first. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Customer ID. Enter the customer ID. |

Output fields:

- `id`: Customer ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `username`: Username
- `role`: Role
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `billing`: Billing Address
- `billing.first_name`: First Name
- `billing.last_name`: Last Name
- `billing.company`: Company
- `billing.address_1`: Address Line 1
- `billing.address_2`: Address Line 2
- `billing.city`: City
- `billing.state`: State
- `billing.postcode`: Postcode
- `billing.country`: Country
- `billing.email`: Email (email)
- `billing.phone`: Phone
- `shipping`: Shipping Address
- `shipping.first_name`: First Name
- `shipping.last_name`: Last Name
- `shipping.company`: Company
- `shipping.address_1`: Address Line 1
- `shipping.address_2`: Address Line 2
- `shipping.city`: City
- `shipping.state`: State
- `shipping.postcode`: Postcode
- `shipping.country`: Country
- `shipping.phone`: Phone
- `is_paying_customer`: Is Paying Customer (boolean)
- `avatar_url`: Avatar URL (url)
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `get_order`

**Get Order.** Returns one order by its numeric id with status, totals, line items, addresses, payment method and refunds. To find orders by status, customer or date use list_orders. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Order ID. Enter the order ID. |

Output fields:

- `id`: Order ID
- `number`: Order Number
- `parent_id`: Parent Order ID
- `status`: Status
- `currency`: Currency
- `currency_symbol`: Currency Symbol
- `version`: WooCommerce Version
- `prices_include_tax`: Prices Include Tax (boolean)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `date_completed`: Completed At (datetime)
- `date_completed_gmt`: Completed At (GMT) (datetime)
- `date_paid`: Paid At (datetime)
- `date_paid_gmt`: Paid At (GMT) (datetime)
- `discount_total`: Discount Total
- `discount_tax`: Discount Tax
- `shipping_total`: Shipping Total
- `shipping_tax`: Shipping Tax
- `cart_tax`: Cart Tax
- `total`: Total
- `total_tax`: Total Tax
- `customer_id`: Customer ID
- `order_key`: Order Key
- `billing`: Billing Address
- `billing.first_name`: First Name
- `billing.last_name`: Last Name
- `billing.company`: Company
- `billing.address_1`: Address Line 1
- `billing.address_2`: Address Line 2
- `billing.city`: City
- `billing.state`: State
- `billing.postcode`: Postcode
- `billing.country`: Country
- `billing.email`: Email (email)
- `billing.phone`: Phone
- `shipping`: Shipping Address
- `shipping.first_name`: First Name
- `shipping.last_name`: Last Name
- `shipping.company`: Company
- `shipping.address_1`: Address Line 1
- `shipping.address_2`: Address Line 2
- `shipping.city`: City
- `shipping.state`: State
- `shipping.postcode`: Postcode
- `shipping.country`: Country
- `shipping.phone`: Phone
- `payment_method`: Payment Method
- `payment_method_title`: Payment Method Title
- `transaction_id`: Transaction ID
- `customer_ip_address`: Customer IP Address
- `customer_user_agent`: Customer User Agent
- `created_via`: Created Via
- `customer_note`: Customer Note
- `cart_hash`: Cart Hash
- `payment_url`: Payment URL (url)
- `is_editable`: Is Editable (boolean)
- `needs_payment`: Needs Payment (boolean)
- `needs_processing`: Needs Processing (boolean)
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].product_id`: Product ID
- `line_items[].variation_id`: Variation ID
- `line_items[].quantity`: Quantity (number)
- `line_items[].tax_class`: Tax Class
- `line_items[].subtotal`: Subtotal
- `line_items[].subtotal_tax`: Subtotal Tax
- `line_items[].total`: Total
- `line_items[].total_tax`: Total Tax
- `line_items[].taxes`: Taxes
- `line_items[].taxes[].id`: Rate ID
- `line_items[].taxes[].total`: Total
- `line_items[].taxes[].subtotal`: Subtotal
- `line_items[].meta_data`: Meta Data
- `line_items[].meta_data[].id`: Meta ID
- `line_items[].meta_data[].key`: Key
- `line_items[].meta_data[].value`: Value
- `line_items[].meta_data[].display_key`: Display Key
- `line_items[].meta_data[].display_value`: Display Value
- `line_items[].sku`: SKU
- `line_items[].global_unique_id`: Global Unique ID
- `line_items[].price`: Price
- `line_items[].image`: Image
- `line_items[].image.id`: Image ID
- `line_items[].image.src`: Source URL (url)
- `line_items[].parent_name`: Parent Product Name
- `tax_lines`: Tax Lines
- `tax_lines[].id`: Tax Line ID
- `tax_lines[].rate_code`: Rate Code
- `tax_lines[].rate_id`: Rate ID
- `tax_lines[].label`: Label
- `tax_lines[].compound`: Compound (boolean)
- `tax_lines[].tax_total`: Tax Total
- `tax_lines[].shipping_tax_total`: Shipping Tax Total
- `tax_lines[].rate_percent`: Rate Percent (number)
- `tax_lines[].meta_data`: Meta Data
- `tax_lines[].meta_data[].id`: Meta ID
- `tax_lines[].meta_data[].key`: Key
- `tax_lines[].meta_data[].value`: Value
- `tax_lines[].meta_data[].display_key`: Display Key
- `tax_lines[].meta_data[].display_value`: Display Value
- `shipping_lines`: Shipping Lines
- `shipping_lines[].id`: Shipping Line ID
- `shipping_lines[].method_title`: Method Title
- `shipping_lines[].method_id`: Method ID
- `shipping_lines[].instance_id`: Instance ID
- `shipping_lines[].total`: Total
- `shipping_lines[].total_tax`: Total Tax
- `shipping_lines[].taxes`: Taxes
- `shipping_lines[].taxes[].id`: Rate ID
- `shipping_lines[].taxes[].total`: Total
- `shipping_lines[].taxes[].subtotal`: Subtotal
- `shipping_lines[].tax_status`: Tax Status
- `shipping_lines[].meta_data`: Meta Data
- `shipping_lines[].meta_data[].id`: Meta ID
- `shipping_lines[].meta_data[].key`: Key
- `shipping_lines[].meta_data[].value`: Value
- `shipping_lines[].meta_data[].display_key`: Display Key
- `shipping_lines[].meta_data[].display_value`: Display Value
- `fee_lines`: Fee Lines
- `fee_lines[].id`: Fee Line ID
- `fee_lines[].name`: Name
- `fee_lines[].tax_class`: Tax Class
- `fee_lines[].tax_status`: Tax Status
- `fee_lines[].amount`: Amount
- `fee_lines[].total`: Total
- `fee_lines[].total_tax`: Total Tax
- `fee_lines[].taxes`: Taxes
- `fee_lines[].taxes[].id`: Rate ID
- `fee_lines[].taxes[].total`: Total
- `fee_lines[].taxes[].subtotal`: Subtotal
- `fee_lines[].meta_data`: Meta Data
- `fee_lines[].meta_data[].id`: Meta ID
- `fee_lines[].meta_data[].key`: Key
- `fee_lines[].meta_data[].value`: Value
- `fee_lines[].meta_data[].display_key`: Display Key
- `fee_lines[].meta_data[].display_value`: Display Value
- `coupon_lines`: Coupon Lines
- `coupon_lines[].id`: Coupon Line ID
- `coupon_lines[].code`: Code
- `coupon_lines[].discount`: Discount
- `coupon_lines[].discount_tax`: Discount Tax
- `coupon_lines[].discount_type`: Discount Type
- `coupon_lines[].nominal_amount`: Nominal Amount (number)
- `coupon_lines[].free_shipping`: Free Shipping (boolean)
- `coupon_lines[].meta_data`: Meta Data
- `coupon_lines[].meta_data[].id`: Meta ID
- `coupon_lines[].meta_data[].key`: Key
- `coupon_lines[].meta_data[].value`: Value
- `coupon_lines[].meta_data[].display_key`: Display Key
- `coupon_lines[].meta_data[].display_value`: Display Value
- `refunds`: Refunds
- `refunds[].id`: Refund ID
- `refunds[].reason`: Reason
- `refunds[].total`: Total
- `refunds[].total_tax`: Total Tax
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `get_order_totals_report`

**Get Order Totals Report.** Returns how many orders the store currently holds in each status (pending payment, processing, on hold, completed, cancelled, refunded, failed and so on), across all time. Use it for a quick overview of the order pipeline; to see the orders themselves use list_orders with a status. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `[].slug`: Status
- `[].name`: Status Name
- `[].total`: Orders (number)

### `get_product`

**Get Product.** Returns one product by its numeric id with prices, stock, categories, tags, images and, for a variable product, its variation ids. To find a product by name or SKU use list_products first; for a single variation use get_product_variation. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Product ID. Enter the product ID. |

Output fields:

- `id`: Product ID
- `name`: Name
- `slug`: Slug
- `permalink`: Permalink (url)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `type`: Type
- `status`: Status
- `featured`: Featured (boolean)
- `catalog_visibility`: Catalog Visibility
- `description`: Description (html)
- `short_description`: Short Description (html)
- `sku`: SKU
- `price`: Price
- `regular_price`: Regular Price
- `sale_price`: Sale Price
- `date_on_sale_from`: On Sale From (datetime)
- `date_on_sale_from_gmt`: On Sale From (GMT) (datetime)
- `date_on_sale_to`: On Sale To (datetime)
- `date_on_sale_to_gmt`: On Sale To (GMT) (datetime)
- `on_sale`: On Sale (boolean)
- `purchasable`: Purchasable (boolean)
- `total_sales`: Total Sales (number)
- `virtual`: Virtual (boolean)
- `downloadable`: Downloadable (boolean)
- `downloads`: Downloads
- `downloads[].id`: Download ID
- `downloads[].name`: File Name
- `downloads[].file`: File URL (url)
- `download_limit`: Download Limit (number)
- `download_expiry`: Download Expiry (Days) (number)
- `external_url`: External URL (url)
- `button_text`: Button Text
- `tax_status`: Tax Status
- `tax_class`: Tax Class
- `manage_stock`: Manage Stock (boolean)
- `stock_quantity`: Stock Quantity (number)
- `stock_status`: Stock Status
- `backorders`: Backorders
- `backorders_allowed`: Backorders Allowed (boolean)
- `backordered`: Backordered (boolean)
- `low_stock_amount`: Low Stock Amount (number)
- `sold_individually`: Sold Individually (boolean)
- `weight`: Weight
- `dimensions`: Dimensions
- `dimensions.length`: Length
- `dimensions.width`: Width
- `dimensions.height`: Height
- `shipping_required`: Shipping Required (boolean)
- `shipping_taxable`: Shipping Taxable (boolean)
- `shipping_class`: Shipping Class
- `shipping_class_id`: Shipping Class ID
- `reviews_allowed`: Reviews Allowed (boolean)
- `average_rating`: Average Rating
- `rating_count`: Rating Count (number)
- `upsell_ids`: Upsell Product IDs
- `cross_sell_ids`: Cross-sell Product IDs
- `related_ids`: Related Product IDs
- `parent_id`: Parent Product ID
- `purchase_note`: Purchase Note
- `categories`: Categories
- `categories[].id`: ID
- `categories[].name`: Name
- `categories[].slug`: Slug
- `tags`: Tags
- `tags[].id`: ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `brands`: Brands
- `brands[].id`: ID
- `brands[].name`: Name
- `brands[].slug`: Slug
- `images`: Images
- `images[].id`: Image ID
- `images[].src`: Source URL (url)
- `images[].thumbnail`: Thumbnail URL (url)
- `images[].name`: Name
- `images[].alt`: Alt Text
- `images[].srcset`: Srcset
- `images[].sizes`: Sizes
- `images[].date_created`: Created At (datetime)
- `images[].date_created_gmt`: Created At (GMT) (datetime)
- `images[].date_modified`: Modified At (datetime)
- `images[].date_modified_gmt`: Modified At (GMT) (datetime)
- `attributes`: Attributes
- `attributes[].id`: Attribute ID
- `attributes[].name`: Name
- `attributes[].slug`: Slug
- `attributes[].position`: Position (number)
- `attributes[].visible`: Visible (boolean)
- `attributes[].variation`: Used For Variations (boolean)
- `attributes[].options`: Options
- `default_attributes`: Default Attributes
- `default_attributes[].id`: Attribute ID
- `default_attributes[].name`: Name
- `default_attributes[].option`: Option
- `variations`: Variation IDs
- `grouped_products`: Grouped Product IDs
- `menu_order`: Menu Order (number)
- `price_html`: Price HTML (html)
- `has_options`: Has Options (boolean)
- `post_password`: Post Password
- `global_unique_id`: Global Unique ID
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `get_product_variation`

**Get Product Variation.** Returns one variation of a variable product by product id and variation id, including its attributes, price and stock. Variation ids come from list_product_variations or from the variations list of get_product. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | number | yes |  | Product ID. Id of the parent variable product. |
| `variation_id` | number | yes |  | Variation ID. Id of the variation. |

Output fields:

- `id`: Variation ID
- `parent_id`: Parent Product ID
- `name`: Name
- `type`: Type
- `status`: Status
- `description`: Description (html)
- `permalink`: Permalink (url)
- `sku`: SKU
- `global_unique_id`: Global Unique ID
- `price`: Price
- `regular_price`: Regular Price
- `sale_price`: Sale Price
- `date_on_sale_from`: On Sale From (datetime)
- `date_on_sale_from_gmt`: On Sale From (GMT) (datetime)
- `date_on_sale_to`: On Sale To (datetime)
- `date_on_sale_to_gmt`: On Sale To (GMT) (datetime)
- `on_sale`: On Sale (boolean)
- `purchasable`: Purchasable (boolean)
- `virtual`: Virtual (boolean)
- `downloadable`: Downloadable (boolean)
- `downloads`: Downloads
- `downloads[].id`: Download ID
- `downloads[].name`: File Name
- `downloads[].file`: File URL (url)
- `download_limit`: Download Limit (number)
- `download_expiry`: Download Expiry (Days) (number)
- `tax_status`: Tax Status
- `tax_class`: Tax Class
- `manage_stock`: Manage Stock
- `stock_quantity`: Stock Quantity (number)
- `stock_status`: Stock Status
- `backorders`: Backorders
- `backorders_allowed`: Backorders Allowed (boolean)
- `backordered`: Backordered (boolean)
- `low_stock_amount`: Low Stock Amount (number)
- `weight`: Weight
- `dimensions`: Dimensions
- `dimensions.length`: Length
- `dimensions.width`: Width
- `dimensions.height`: Height
- `shipping_class`: Shipping Class
- `shipping_class_id`: Shipping Class ID
- `image`: Image
- `image.id`: Image ID
- `image.src`: Source URL (url)
- `image.thumbnail`: Thumbnail URL (url)
- `image.name`: Name
- `image.alt`: Alt Text
- `image.srcset`: Srcset
- `image.sizes`: Sizes
- `image.date_created`: Created At (datetime)
- `image.date_created_gmt`: Created At (GMT) (datetime)
- `image.date_modified`: Modified At (datetime)
- `image.date_modified_gmt`: Modified At (GMT) (datetime)
- `gallery_image_ids`: Gallery Image IDs
- `attributes`: Attributes
- `attributes[].id`: Attribute ID
- `attributes[].name`: Name
- `attributes[].slug`: Slug
- `attributes[].option`: Option
- `menu_order`: Menu Order (number)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `get_sales_report`

**Get Sales Report.** Returns store sales totals (gross and net sales, orders, items, tax, shipping, refunds, discounts) for a preset period or a custom date range, plus a per-day or per-month breakdown. Give either a period or both dates, not both; with neither, the current week is used. For best-selling products use get_top_sellers_report; for order counts by status use get_order_totals_report. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `period` | string | no |  | Period. Preset period to report on. Leave empty when using a date range; if both are empty the current week is used. One of `"week"`, `"month"`, `"last_month"`, `"year"`. |
| `date_min` | string | no |  | Start Date. First day of a custom range, as YYYY-MM-DD. Use together with End Date instead of Period. |
| `date_max` | string | no |  | End Date. Last day of a custom range, as YYYY-MM-DD. Use together with Start Date instead of Period. |

Output fields:

- `[].total_sales`: Total Sales
- `[].net_sales`: Net Sales
- `[].average_sales`: Average Sales Per Day
- `[].total_orders`: Total Orders (number)
- `[].total_items`: Total Items (number)
- `[].total_tax`: Total Tax
- `[].total_shipping`: Total Shipping
- `[].total_refunds`: Total Refunds
- `[].total_discount`: Total Discount
- `[].total_customers`: New Customers (number)
- `[].totals_grouped_by`: Grouped By
- `[].totals`: Totals By Period (an object whose keys vary)
- `[].totals.sales`: Sales
- `[].totals.orders`: Orders (number)
- `[].totals.items`: Items (number)
- `[].totals.tax`: Tax
- `[].totals.shipping`: Shipping
- `[].totals.discount`: Discount
- `[].totals.customers`: New Customers (number)
- `[].totals.refunds`: Refunds

### `get_top_sellers_report`

**Get Top Sellers Report.** Returns the best-selling products with the quantity sold for a preset period or a custom date range, highest first. Give either a period or both dates, not both; with neither, the current week is used. For money totals use get_sales_report. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `period` | string | no |  | Period. Preset period to report on. Leave empty when using a date range; if both are empty the current week is used. One of `"week"`, `"month"`, `"last_month"`, `"year"`. |
| `date_min` | string | no |  | Start Date. First day of a custom range, as YYYY-MM-DD. Use together with End Date instead of Period. |
| `date_max` | string | no |  | End Date. Last day of a custom range, as YYYY-MM-DD. Use together with Start Date instead of Period. |

Output fields:

- `[].name`: Product Name
- `[].product_id`: Product ID
- `[].quantity`: Quantity Sold (number)

### `list_coupons`

**List Coupons.** Lists discount coupons with their codes, amounts, limits and usage counts. Pass code to look up one coupon by its exact code (the way to get a coupon id for get_coupon, update_coupon or delete_coupon, and to check that a code is free before create_coupon). Paged: if a page returns exactly per_page items, request the next page. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `code` | string | no |  | Code. Exact coupon code to find. |
| `search` | string | no |  | Search. Text to match against coupon codes and descriptions. |
| `after` | ISO date-time string | no |  | Created After. Only return coupons created after this date and time (ISO 8601). |
| `before` | ISO date-time string | no |  | Created Before. Only return coupons created before this date and time (ISO 8601). |
| `page` | number | no | `1` | Page. Page number, starting at 1. If a page comes back with exactly per_page items, request the next page to see more. |
| `per_page` | number | no | `10` | Per Page. Number of items per page, from 1 to 100. Defaults to 10. |

Output fields:

- `[].id`: Coupon ID
- `[].code`: Code
- `[].amount`: Amount
- `[].status`: Status
- `[].discount_type`: Discount Type
- `[].description`: Description
- `[].date_created`: Created At (datetime)
- `[].date_created_gmt`: Created At (GMT) (datetime)
- `[].date_modified`: Modified At (datetime)
- `[].date_modified_gmt`: Modified At (GMT) (datetime)
- `[].date_expires`: Expires At (datetime)
- `[].date_expires_gmt`: Expires At (GMT) (datetime)
- `[].usage_count`: Usage Count (number)
- `[].individual_use`: Individual Use Only (boolean)
- `[].product_ids`: Product IDs
- `[].excluded_product_ids`: Excluded Product IDs
- `[].usage_limit`: Usage Limit (number)
- `[].usage_limit_per_user`: Usage Limit Per User (number)
- `[].limit_usage_to_x_items`: Limit Usage To X Items (number)
- `[].free_shipping`: Free Shipping (boolean)
- `[].product_categories`: Product Category IDs
- `[].excluded_product_categories`: Excluded Product Category IDs
- `[].exclude_sale_items`: Exclude Sale Items (boolean)
- `[].minimum_amount`: Minimum Amount
- `[].maximum_amount`: Maximum Amount
- `[].email_restrictions`: Email Restrictions
- `[].used_by`: Used By
- `[].meta_data`: Meta Data
- `[].meta_data[].id`: Meta ID
- `[].meta_data[].key`: Key
- `[].meta_data[].value`: Value

### `list_customers`

**List Customers.** Searches store customers and returns them with their ids, emails and addresses. Use it to find a customer id by exact email or by name before get_customer, update_customer, create_order or list_orders; role defaults to all, so shop staff and administrators are included. Paged: if a page returns exactly per_page items, request the next page. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. Exact email address to match. |
| `search` | string | no |  | Search. Text to match against names, usernames and emails. |
| `role` | string | no | `"all"` | Role. WordPress role to return. Defaults to all roles. One of `"all"`, `"customer"`, `"subscriber"`, `"shop_manager"`, `"administrator"`. |
| `orderby` | string | no |  | Sort By. Field to sort by. Defaults to name. One of `"name"`, `"id"`, `"registered_date"`. |
| `order` | string | no |  | Sort Direction. Ascending or descending. Defaults to ascending. One of `"asc"`, `"desc"`. |
| `page` | number | no | `1` | Page. Page number, starting at 1. If a page comes back with exactly per_page items, request the next page to see more. |
| `per_page` | number | no | `10` | Per Page. Number of items per page, from 1 to 100. Defaults to 10. |

Output fields:

- `[].id`: Customer ID
- `[].email`: Email (email)
- `[].first_name`: First Name
- `[].last_name`: Last Name
- `[].username`: Username
- `[].role`: Role
- `[].date_created`: Created At (datetime)
- `[].date_created_gmt`: Created At (GMT) (datetime)
- `[].date_modified`: Modified At (datetime)
- `[].date_modified_gmt`: Modified At (GMT) (datetime)
- `[].billing`: Billing Address
- `[].billing.first_name`: First Name
- `[].billing.last_name`: Last Name
- `[].billing.company`: Company
- `[].billing.address_1`: Address Line 1
- `[].billing.address_2`: Address Line 2
- `[].billing.city`: City
- `[].billing.state`: State
- `[].billing.postcode`: Postcode
- `[].billing.country`: Country
- `[].billing.email`: Email (email)
- `[].billing.phone`: Phone
- `[].shipping`: Shipping Address
- `[].shipping.first_name`: First Name
- `[].shipping.last_name`: Last Name
- `[].shipping.company`: Company
- `[].shipping.address_1`: Address Line 1
- `[].shipping.address_2`: Address Line 2
- `[].shipping.city`: City
- `[].shipping.state`: State
- `[].shipping.postcode`: Postcode
- `[].shipping.country`: Country
- `[].shipping.phone`: Phone
- `[].is_paying_customer`: Is Paying Customer (boolean)
- `[].avatar_url`: Avatar URL (url)
- `[].meta_data`: Meta Data
- `[].meta_data[].id`: Meta ID
- `[].meta_data[].key`: Key
- `[].meta_data[].value`: Value

### `list_order_notes`

**List Order Notes.** Lists all notes on one order, both private staff notes and notes sent to the customer, including the ones WooCommerce writes itself for status changes and emails. Use it to read an order history or to find a note id for delete_order_note; add a note with add_order_note. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | number | yes |  | Order ID. Id of the order. |
| `type` | string | no |  | Note Type. Which notes to return. Defaults to all. One of `"any"`, `"customer"`, `"internal"`. |

Output fields:

- `[].id`: Note ID
- `[].author`: Author
- `[].note`: Note
- `[].customer_note`: Visible To Customer (boolean)
- `[].date_created`: Created At (datetime)
- `[].date_created_gmt`: Created At (GMT) (datetime)

### `list_order_refunds`

**List Order Refunds.** Lists the refunds already recorded on one order, with amount, reason and whether money was sent back through the gateway. Check it before create_order_refund to avoid refunding twice. Paged: if a page returns exactly per_page items, request the next page. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | number | yes |  | Order ID. Id of the order. |
| `page` | number | no | `1` | Page. Page number, starting at 1. If a page comes back with exactly per_page items, request the next page to see more. |
| `per_page` | number | no | `10` | Per Page. Number of items per page, from 1 to 100. Defaults to 10. |

Output fields:

- `[].id`: Refund ID
- `[].amount`: Amount
- `[].reason`: Reason
- `[].refunded_by`: Refunded By User ID
- `[].refunded_payment`: Refunded Through Gateway (boolean)
- `[].date_created`: Created At (datetime)
- `[].date_created_gmt`: Created At (GMT) (datetime)
- `[].line_items`: Refunded Line Items
- `[].line_items[].id`: Line Item ID
- `[].line_items[].name`: Name
- `[].line_items[].product_id`: Product ID
- `[].line_items[].variation_id`: Variation ID
- `[].line_items[].quantity`: Quantity (number)
- `[].line_items[].tax_class`: Tax Class
- `[].line_items[].subtotal`: Subtotal
- `[].line_items[].subtotal_tax`: Subtotal Tax
- `[].line_items[].total`: Total
- `[].line_items[].total_tax`: Total Tax
- `[].line_items[].taxes`: Taxes
- `[].line_items[].taxes[].id`: Rate ID
- `[].line_items[].taxes[].total`: Total
- `[].line_items[].taxes[].subtotal`: Subtotal
- `[].line_items[].meta_data`: Meta Data
- `[].line_items[].meta_data[].id`: Meta ID
- `[].line_items[].meta_data[].key`: Key
- `[].line_items[].meta_data[].value`: Value
- `[].line_items[].meta_data[].display_key`: Display Key
- `[].line_items[].meta_data[].display_value`: Display Value
- `[].line_items[].sku`: SKU
- `[].line_items[].global_unique_id`: Global Unique ID
- `[].line_items[].price`: Price
- `[].line_items[].image`: Image
- `[].line_items[].image.id`: Image ID
- `[].line_items[].image.src`: Source URL (url)
- `[].line_items[].parent_name`: Parent Product Name
- `[].shipping_lines`: Refunded Shipping Lines
- `[].shipping_lines[].id`: Shipping Line ID
- `[].shipping_lines[].method_title`: Method Title
- `[].shipping_lines[].method_id`: Method ID
- `[].shipping_lines[].instance_id`: Instance ID
- `[].shipping_lines[].total`: Total
- `[].shipping_lines[].total_tax`: Total Tax
- `[].shipping_lines[].taxes`: Taxes
- `[].shipping_lines[].taxes[].id`: Rate ID
- `[].shipping_lines[].taxes[].total`: Total
- `[].shipping_lines[].taxes[].subtotal`: Subtotal
- `[].shipping_lines[].tax_status`: Tax Status
- `[].shipping_lines[].meta_data`: Meta Data
- `[].shipping_lines[].meta_data[].id`: Meta ID
- `[].shipping_lines[].meta_data[].key`: Key
- `[].shipping_lines[].meta_data[].value`: Value
- `[].shipping_lines[].meta_data[].display_key`: Display Key
- `[].shipping_lines[].meta_data[].display_value`: Display Value
- `[].tax_lines`: Refunded Tax Lines
- `[].tax_lines[].id`: Tax Line ID
- `[].tax_lines[].rate_code`: Rate Code
- `[].tax_lines[].rate_id`: Rate ID
- `[].tax_lines[].label`: Label
- `[].tax_lines[].compound`: Compound (boolean)
- `[].tax_lines[].tax_total`: Tax Total
- `[].tax_lines[].shipping_tax_total`: Shipping Tax Total
- `[].tax_lines[].rate_percent`: Rate Percent (number)
- `[].tax_lines[].meta_data`: Meta Data
- `[].tax_lines[].meta_data[].id`: Meta ID
- `[].tax_lines[].meta_data[].key`: Key
- `[].tax_lines[].meta_data[].value`: Value
- `[].tax_lines[].meta_data[].display_key`: Display Key
- `[].tax_lines[].meta_data[].display_value`: Display Value
- `[].fee_lines`: Refunded Fee Lines
- `[].fee_lines[].id`: Fee Line ID
- `[].fee_lines[].name`: Name
- `[].fee_lines[].tax_class`: Tax Class
- `[].fee_lines[].tax_status`: Tax Status
- `[].fee_lines[].amount`: Amount
- `[].fee_lines[].total`: Total
- `[].fee_lines[].total_tax`: Total Tax
- `[].fee_lines[].taxes`: Taxes
- `[].fee_lines[].taxes[].id`: Rate ID
- `[].fee_lines[].taxes[].total`: Total
- `[].fee_lines[].taxes[].subtotal`: Subtotal
- `[].fee_lines[].meta_data`: Meta Data
- `[].fee_lines[].meta_data[].id`: Meta ID
- `[].fee_lines[].meta_data[].key`: Key
- `[].fee_lines[].meta_data[].value`: Value
- `[].fee_lines[].meta_data[].display_key`: Display Key
- `[].fee_lines[].meta_data[].display_value`: Display Value
- `[].meta_data`: Meta Data
- `[].meta_data[].id`: Meta ID
- `[].meta_data[].key`: Key
- `[].meta_data[].value`: Value

### `list_orders`

**List Orders.** Searches orders and returns them with totals, line items and addresses. Use it to find orders by status, customer id, product id, free text (such as an email or name) or creation date range; use get_order when you already have the order id. Paged: if a page returns exactly per_page items, request the next page. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. Only return orders with this status. Leave empty for any status except trash. One of `"pending"`, `"processing"`, `"on-hold"`, `"completed"`, `"cancelled"`, `"refunded"`, `"failed"`, `"trash"`. |
| `customer_id` | number | no |  | Customer ID. Only return orders placed by this customer. Find the id with list_customers. |
| `product_id` | number | no |  | Product ID. Only return orders that contain this product. |
| `search` | string | no |  | Search. Text to match against order fields such as the billing name or email. |
| `after` | ISO date-time string | no |  | Created After. Only return orders created after this date and time (ISO 8601). |
| `before` | ISO date-time string | no |  | Created Before. Only return orders created before this date and time (ISO 8601). |
| `orderby` | string | no |  | Sort By. Field to sort by. Defaults to date. One of `"date"`, `"id"`, `"title"`, `"slug"`. |
| `order` | string | no |  | Sort Direction. Ascending or descending. Defaults to descending. One of `"desc"`, `"asc"`. |
| `page` | number | no | `1` | Page. Page number, starting at 1. If a page comes back with exactly per_page items, request the next page to see more. |
| `per_page` | number | no | `10` | Per Page. Number of items per page, from 1 to 100. Defaults to 10. |

Output fields:

- `[].id`: Order ID
- `[].number`: Order Number
- `[].parent_id`: Parent Order ID
- `[].status`: Status
- `[].currency`: Currency
- `[].currency_symbol`: Currency Symbol
- `[].version`: WooCommerce Version
- `[].prices_include_tax`: Prices Include Tax (boolean)
- `[].date_created`: Created At (datetime)
- `[].date_created_gmt`: Created At (GMT) (datetime)
- `[].date_modified`: Modified At (datetime)
- `[].date_modified_gmt`: Modified At (GMT) (datetime)
- `[].date_completed`: Completed At (datetime)
- `[].date_completed_gmt`: Completed At (GMT) (datetime)
- `[].date_paid`: Paid At (datetime)
- `[].date_paid_gmt`: Paid At (GMT) (datetime)
- `[].discount_total`: Discount Total
- `[].discount_tax`: Discount Tax
- `[].shipping_total`: Shipping Total
- `[].shipping_tax`: Shipping Tax
- `[].cart_tax`: Cart Tax
- `[].total`: Total
- `[].total_tax`: Total Tax
- `[].customer_id`: Customer ID
- `[].order_key`: Order Key
- `[].billing`: Billing Address
- `[].billing.first_name`: First Name
- `[].billing.last_name`: Last Name
- `[].billing.company`: Company
- `[].billing.address_1`: Address Line 1
- `[].billing.address_2`: Address Line 2
- `[].billing.city`: City
- `[].billing.state`: State
- `[].billing.postcode`: Postcode
- `[].billing.country`: Country
- `[].billing.email`: Email (email)
- `[].billing.phone`: Phone
- `[].shipping`: Shipping Address
- `[].shipping.first_name`: First Name
- `[].shipping.last_name`: Last Name
- `[].shipping.company`: Company
- `[].shipping.address_1`: Address Line 1
- `[].shipping.address_2`: Address Line 2
- `[].shipping.city`: City
- `[].shipping.state`: State
- `[].shipping.postcode`: Postcode
- `[].shipping.country`: Country
- `[].shipping.phone`: Phone
- `[].payment_method`: Payment Method
- `[].payment_method_title`: Payment Method Title
- `[].transaction_id`: Transaction ID
- `[].customer_ip_address`: Customer IP Address
- `[].customer_user_agent`: Customer User Agent
- `[].created_via`: Created Via
- `[].customer_note`: Customer Note
- `[].cart_hash`: Cart Hash
- `[].payment_url`: Payment URL (url)
- `[].is_editable`: Is Editable (boolean)
- `[].needs_payment`: Needs Payment (boolean)
- `[].needs_processing`: Needs Processing (boolean)
- `[].line_items`: Line Items
- `[].line_items[].id`: Line Item ID
- `[].line_items[].name`: Name
- `[].line_items[].product_id`: Product ID
- `[].line_items[].variation_id`: Variation ID
- `[].line_items[].quantity`: Quantity (number)
- `[].line_items[].tax_class`: Tax Class
- `[].line_items[].subtotal`: Subtotal
- `[].line_items[].subtotal_tax`: Subtotal Tax
- `[].line_items[].total`: Total
- `[].line_items[].total_tax`: Total Tax
- `[].line_items[].taxes`: Taxes
- `[].line_items[].taxes[].id`: Rate ID
- `[].line_items[].taxes[].total`: Total
- `[].line_items[].taxes[].subtotal`: Subtotal
- `[].line_items[].meta_data`: Meta Data
- `[].line_items[].meta_data[].id`: Meta ID
- `[].line_items[].meta_data[].key`: Key
- `[].line_items[].meta_data[].value`: Value
- `[].line_items[].meta_data[].display_key`: Display Key
- `[].line_items[].meta_data[].display_value`: Display Value
- `[].line_items[].sku`: SKU
- `[].line_items[].global_unique_id`: Global Unique ID
- `[].line_items[].price`: Price
- `[].line_items[].image`: Image
- `[].line_items[].image.id`: Image ID
- `[].line_items[].image.src`: Source URL (url)
- `[].line_items[].parent_name`: Parent Product Name
- `[].tax_lines`: Tax Lines
- `[].tax_lines[].id`: Tax Line ID
- `[].tax_lines[].rate_code`: Rate Code
- `[].tax_lines[].rate_id`: Rate ID
- `[].tax_lines[].label`: Label
- `[].tax_lines[].compound`: Compound (boolean)
- `[].tax_lines[].tax_total`: Tax Total
- `[].tax_lines[].shipping_tax_total`: Shipping Tax Total
- `[].tax_lines[].rate_percent`: Rate Percent (number)
- `[].tax_lines[].meta_data`: Meta Data
- `[].tax_lines[].meta_data[].id`: Meta ID
- `[].tax_lines[].meta_data[].key`: Key
- `[].tax_lines[].meta_data[].value`: Value
- `[].tax_lines[].meta_data[].display_key`: Display Key
- `[].tax_lines[].meta_data[].display_value`: Display Value
- `[].shipping_lines`: Shipping Lines
- `[].shipping_lines[].id`: Shipping Line ID
- `[].shipping_lines[].method_title`: Method Title
- `[].shipping_lines[].method_id`: Method ID
- `[].shipping_lines[].instance_id`: Instance ID
- `[].shipping_lines[].total`: Total
- `[].shipping_lines[].total_tax`: Total Tax
- `[].shipping_lines[].taxes`: Taxes
- `[].shipping_lines[].taxes[].id`: Rate ID
- `[].shipping_lines[].taxes[].total`: Total
- `[].shipping_lines[].taxes[].subtotal`: Subtotal
- `[].shipping_lines[].tax_status`: Tax Status
- `[].shipping_lines[].meta_data`: Meta Data
- `[].shipping_lines[].meta_data[].id`: Meta ID
- `[].shipping_lines[].meta_data[].key`: Key
- `[].shipping_lines[].meta_data[].value`: Value
- `[].shipping_lines[].meta_data[].display_key`: Display Key
- `[].shipping_lines[].meta_data[].display_value`: Display Value
- `[].fee_lines`: Fee Lines
- `[].fee_lines[].id`: Fee Line ID
- `[].fee_lines[].name`: Name
- `[].fee_lines[].tax_class`: Tax Class
- `[].fee_lines[].tax_status`: Tax Status
- `[].fee_lines[].amount`: Amount
- `[].fee_lines[].total`: Total
- `[].fee_lines[].total_tax`: Total Tax
- `[].fee_lines[].taxes`: Taxes
- `[].fee_lines[].taxes[].id`: Rate ID
- `[].fee_lines[].taxes[].total`: Total
- `[].fee_lines[].taxes[].subtotal`: Subtotal
- `[].fee_lines[].meta_data`: Meta Data
- `[].fee_lines[].meta_data[].id`: Meta ID
- `[].fee_lines[].meta_data[].key`: Key
- `[].fee_lines[].meta_data[].value`: Value
- `[].fee_lines[].meta_data[].display_key`: Display Key
- `[].fee_lines[].meta_data[].display_value`: Display Value
- `[].coupon_lines`: Coupon Lines
- `[].coupon_lines[].id`: Coupon Line ID
- `[].coupon_lines[].code`: Code
- `[].coupon_lines[].discount`: Discount
- `[].coupon_lines[].discount_tax`: Discount Tax
- `[].coupon_lines[].discount_type`: Discount Type
- `[].coupon_lines[].nominal_amount`: Nominal Amount (number)
- `[].coupon_lines[].free_shipping`: Free Shipping (boolean)
- `[].coupon_lines[].meta_data`: Meta Data
- `[].coupon_lines[].meta_data[].id`: Meta ID
- `[].coupon_lines[].meta_data[].key`: Key
- `[].coupon_lines[].meta_data[].value`: Value
- `[].coupon_lines[].meta_data[].display_key`: Display Key
- `[].coupon_lines[].meta_data[].display_value`: Display Value
- `[].refunds`: Refunds
- `[].refunds[].id`: Refund ID
- `[].refunds[].reason`: Reason
- `[].refunds[].total`: Total
- `[].refunds[].total_tax`: Total Tax
- `[].meta_data`: Meta Data
- `[].meta_data[].id`: Meta ID
- `[].meta_data[].key`: Key
- `[].meta_data[].value`: Value

### `list_payment_gateways`

**List Payment Gateways.** Lists the payment gateways installed in the store with their ids, titles, whether they are enabled, and what they support (for example refunds). Use it to pick a payment method for create_order, or to check whether a gateway supports refunds before create_order_refund with Refund Via Gateway. Gateway settings and credentials are never returned. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Gateway ID
- `[].title`: Title
- `[].description`: Description
- `[].order`: Sort Order
- `[].enabled`: Enabled (boolean)
- `[].method_title`: Method Title
- `[].method_description`: Method Description (html)
- `[].method_supports`: Supported Features

### `list_product_categories`

**List Product Categories.** Lists product categories with their ids, slugs, parents and product counts. Use it to find a category id for list_products, create_product or update_product, and before create_product_category to avoid a duplicate. Paged: if a page returns exactly per_page items, request the next page. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Text to match against category names. |
| `slug` | string | no |  | Slug. Exact category slug. |
| `parent_id` | number | no |  | Parent Category ID. Only return direct children of this category. Use 0 for top-level categories. |
| `hide_empty` | boolean | no | `false` | Hide Empty. When on, categories without products are left out. |
| `page` | number | no | `1` | Page. Page number, starting at 1. If a page comes back with exactly per_page items, request the next page to see more. |
| `per_page` | number | no | `10` | Per Page. Number of items per page, from 1 to 100. Defaults to 10. |

Output fields:

- `[].id`: Category ID
- `[].name`: Name
- `[].slug`: Slug
- `[].parent`: Parent Category ID
- `[].description`: Description (html)
- `[].display`: Display Type
- `[].image`: Image
- `[].menu_order`: Menu Order (number)
- `[].count`: Product Count (number)

### `list_product_reviews`

**List Product Reviews.** Lists customer product reviews with their rating, text, reviewer and moderation status. Status defaults to all, so reviews on hold or marked as spam are included; use it to find a review id for update_product_review. Paged: if a page returns exactly per_page items, request the next page. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | number | no |  | Product ID. Only return reviews of this product. |
| `status` | string | no | `"all"` | Status. Moderation status to return. Defaults to all. One of `"all"`, `"approved"`, `"hold"`, `"spam"`, `"trash"`. |
| `reviewer_email` | string | no |  | Reviewer Email. Only return reviews written with this email address. |
| `search` | string | no |  | Search. Text to match against the review content. |
| `page` | number | no | `1` | Page. Page number, starting at 1. If a page comes back with exactly per_page items, request the next page to see more. |
| `per_page` | number | no | `10` | Per Page. Number of items per page, from 1 to 100. Defaults to 10. |

Output fields:

- `[].id`: Review ID
- `[].product_id`: Product ID
- `[].product_name`: Product Name
- `[].product_permalink`: Product URL (url)
- `[].status`: Status
- `[].reviewer`: Reviewer
- `[].reviewer_email`: Reviewer Email (email)
- `[].review`: Review (html)
- `[].rating`: Rating (number)
- `[].verified`: Verified Owner (boolean)
- `[].reviewer_avatar_urls`: Reviewer Avatar URLs
- `[].reviewer_avatar_urls.24`: Avatar 24px (url)
- `[].reviewer_avatar_urls.48`: Avatar 48px (url)
- `[].reviewer_avatar_urls.96`: Avatar 96px (url)
- `[].date_created`: Created At (datetime)
- `[].date_created_gmt`: Created At (GMT) (datetime)

### `list_product_tags`

**List Product Tags.** Lists product tags with their ids, slugs and product counts. Use it to find a tag id for list_products, create_product or update_product, and before create_product_tag to avoid a duplicate. Paged: if a page returns exactly per_page items, request the next page. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Text to match against tag names. |
| `slug` | string | no |  | Slug. Exact tag slug. |
| `hide_empty` | boolean | no | `false` | Hide Empty. When on, tags without products are left out. |
| `page` | number | no | `1` | Page. Page number, starting at 1. If a page comes back with exactly per_page items, request the next page to see more. |
| `per_page` | number | no | `10` | Per Page. Number of items per page, from 1 to 100. Defaults to 10. |

Output fields:

- `[].id`: Tag ID
- `[].name`: Name
- `[].slug`: Slug
- `[].description`: Description
- `[].count`: Product Count (number)

### `list_product_variations`

**List Product Variations.** Lists the variations (such as sizes or colours) of one variable product, with their ids, attributes, prices and stock. Use it to find a variation id for get_product_variation or update_product_variation; simple products have no variations. Paged: if a page returns exactly per_page items, request the next page. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | number | yes |  | Product ID. Id of the variable product. Find it with list_products. |
| `sku` | string | no |  | SKU. Only return the variation with this SKU. |
| `stock_status` | string | no |  | Stock Status. Only return variations with this stock status. One of `"instock"`, `"outofstock"`, `"onbackorder"`. |
| `page` | number | no | `1` | Page. Page number, starting at 1. If a page comes back with exactly per_page items, request the next page to see more. |
| `per_page` | number | no | `10` | Per Page. Number of items per page, from 1 to 100. Defaults to 10. |

Output fields:

- `[].id`: Variation ID
- `[].parent_id`: Parent Product ID
- `[].name`: Name
- `[].type`: Type
- `[].status`: Status
- `[].description`: Description (html)
- `[].permalink`: Permalink (url)
- `[].sku`: SKU
- `[].global_unique_id`: Global Unique ID
- `[].price`: Price
- `[].regular_price`: Regular Price
- `[].sale_price`: Sale Price
- `[].date_on_sale_from`: On Sale From (datetime)
- `[].date_on_sale_from_gmt`: On Sale From (GMT) (datetime)
- `[].date_on_sale_to`: On Sale To (datetime)
- `[].date_on_sale_to_gmt`: On Sale To (GMT) (datetime)
- `[].on_sale`: On Sale (boolean)
- `[].purchasable`: Purchasable (boolean)
- `[].virtual`: Virtual (boolean)
- `[].downloadable`: Downloadable (boolean)
- `[].downloads`: Downloads
- `[].downloads[].id`: Download ID
- `[].downloads[].name`: File Name
- `[].downloads[].file`: File URL (url)
- `[].download_limit`: Download Limit (number)
- `[].download_expiry`: Download Expiry (Days) (number)
- `[].tax_status`: Tax Status
- `[].tax_class`: Tax Class
- `[].manage_stock`: Manage Stock
- `[].stock_quantity`: Stock Quantity (number)
- `[].stock_status`: Stock Status
- `[].backorders`: Backorders
- `[].backorders_allowed`: Backorders Allowed (boolean)
- `[].backordered`: Backordered (boolean)
- `[].low_stock_amount`: Low Stock Amount (number)
- `[].weight`: Weight
- `[].dimensions`: Dimensions
- `[].dimensions.length`: Length
- `[].dimensions.width`: Width
- `[].dimensions.height`: Height
- `[].shipping_class`: Shipping Class
- `[].shipping_class_id`: Shipping Class ID
- `[].image`: Image
- `[].image.id`: Image ID
- `[].image.src`: Source URL (url)
- `[].image.thumbnail`: Thumbnail URL (url)
- `[].image.name`: Name
- `[].image.alt`: Alt Text
- `[].image.srcset`: Srcset
- `[].image.sizes`: Sizes
- `[].image.date_created`: Created At (datetime)
- `[].image.date_created_gmt`: Created At (GMT) (datetime)
- `[].image.date_modified`: Modified At (datetime)
- `[].image.date_modified_gmt`: Modified At (GMT) (datetime)
- `[].gallery_image_ids`: Gallery Image IDs
- `[].attributes`: Attributes
- `[].attributes[].id`: Attribute ID
- `[].attributes[].name`: Name
- `[].attributes[].slug`: Slug
- `[].attributes[].option`: Option
- `[].menu_order`: Menu Order (number)
- `[].date_created`: Created At (datetime)
- `[].date_created_gmt`: Created At (GMT) (datetime)
- `[].date_modified`: Modified At (datetime)
- `[].date_modified_gmt`: Modified At (GMT) (datetime)
- `[].meta_data`: Meta Data
- `[].meta_data[].id`: Meta ID
- `[].meta_data[].key`: Key
- `[].meta_data[].value`: Value

### `list_products`

**List Products.** Searches the store catalog and returns matching products, including their ids, prices and stock. Use it to find a product id by name or SKU before get_product, update_product or create_order; variations of a variable product are listed with list_product_variations. Paged: if a page returns exactly per_page items, request the next page. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Text to match against product names and content. |
| `sku` | string | no |  | SKU. Exact SKU to match. Separate several SKUs with commas. |
| `status` | string | no |  | Status. Only return products with this status. Leave empty for any status. One of `"publish"`, `"draft"`, `"pending"`, `"private"`. |
| `type` | string | no |  | Product Type. Only return products of this type. One of `"simple"`, `"variable"`, `"grouped"`, `"external"`. |
| `category_id` | number | no |  | Category ID. Only return products in this category. Find ids with list_product_categories. |
| `tag_id` | number | no |  | Tag ID. Only return products with this tag. Find ids with list_product_tags. |
| `stock_status` | string | no |  | Stock Status. Only return products with this stock status. One of `"instock"`, `"outofstock"`, `"onbackorder"`. |
| `on_sale` | string | no |  | On Sale. Yes returns only products on sale, No only products not on sale. Leave empty for both. One of `"yes"`, `"no"`. |
| `min_price` | string | no |  | Minimum Price. Only return products priced at or above this amount, e.g. 10.00. |
| `max_price` | string | no |  | Maximum Price. Only return products priced at or below this amount, e.g. 99.99. |
| `orderby` | string | no |  | Sort By. Field to sort by. Defaults to date. One of `"date"`, `"id"`, `"title"`, `"slug"`, `"price"`, `"popularity"`, `"rating"`. |
| `order` | string | no |  | Sort Direction. Ascending or descending. Defaults to descending. One of `"desc"`, `"asc"`. |
| `page` | number | no | `1` | Page. Page number, starting at 1. If a page comes back with exactly per_page items, request the next page to see more. |
| `per_page` | number | no | `10` | Per Page. Number of items per page, from 1 to 100. Defaults to 10. |

Output fields:

- `[].id`: Product ID
- `[].name`: Name
- `[].slug`: Slug
- `[].permalink`: Permalink (url)
- `[].date_created`: Created At (datetime)
- `[].date_created_gmt`: Created At (GMT) (datetime)
- `[].date_modified`: Modified At (datetime)
- `[].date_modified_gmt`: Modified At (GMT) (datetime)
- `[].type`: Type
- `[].status`: Status
- `[].featured`: Featured (boolean)
- `[].catalog_visibility`: Catalog Visibility
- `[].description`: Description (html)
- `[].short_description`: Short Description (html)
- `[].sku`: SKU
- `[].price`: Price
- `[].regular_price`: Regular Price
- `[].sale_price`: Sale Price
- `[].date_on_sale_from`: On Sale From (datetime)
- `[].date_on_sale_from_gmt`: On Sale From (GMT) (datetime)
- `[].date_on_sale_to`: On Sale To (datetime)
- `[].date_on_sale_to_gmt`: On Sale To (GMT) (datetime)
- `[].on_sale`: On Sale (boolean)
- `[].purchasable`: Purchasable (boolean)
- `[].total_sales`: Total Sales (number)
- `[].virtual`: Virtual (boolean)
- `[].downloadable`: Downloadable (boolean)
- `[].downloads`: Downloads
- `[].downloads[].id`: Download ID
- `[].downloads[].name`: File Name
- `[].downloads[].file`: File URL (url)
- `[].download_limit`: Download Limit (number)
- `[].download_expiry`: Download Expiry (Days) (number)
- `[].external_url`: External URL (url)
- `[].button_text`: Button Text
- `[].tax_status`: Tax Status
- `[].tax_class`: Tax Class
- `[].manage_stock`: Manage Stock (boolean)
- `[].stock_quantity`: Stock Quantity (number)
- `[].stock_status`: Stock Status
- `[].backorders`: Backorders
- `[].backorders_allowed`: Backorders Allowed (boolean)
- `[].backordered`: Backordered (boolean)
- `[].low_stock_amount`: Low Stock Amount (number)
- `[].sold_individually`: Sold Individually (boolean)
- `[].weight`: Weight
- `[].dimensions`: Dimensions
- `[].dimensions.length`: Length
- `[].dimensions.width`: Width
- `[].dimensions.height`: Height
- `[].shipping_required`: Shipping Required (boolean)
- `[].shipping_taxable`: Shipping Taxable (boolean)
- `[].shipping_class`: Shipping Class
- `[].shipping_class_id`: Shipping Class ID
- `[].reviews_allowed`: Reviews Allowed (boolean)
- `[].average_rating`: Average Rating
- `[].rating_count`: Rating Count (number)
- `[].upsell_ids`: Upsell Product IDs
- `[].cross_sell_ids`: Cross-sell Product IDs
- `[].related_ids`: Related Product IDs
- `[].parent_id`: Parent Product ID
- `[].purchase_note`: Purchase Note
- `[].categories`: Categories
- `[].categories[].id`: ID
- `[].categories[].name`: Name
- `[].categories[].slug`: Slug
- `[].tags`: Tags
- `[].tags[].id`: ID
- `[].tags[].name`: Name
- `[].tags[].slug`: Slug
- `[].brands`: Brands
- `[].brands[].id`: ID
- `[].brands[].name`: Name
- `[].brands[].slug`: Slug
- `[].images`: Images
- `[].images[].id`: Image ID
- `[].images[].src`: Source URL (url)
- `[].images[].thumbnail`: Thumbnail URL (url)
- `[].images[].name`: Name
- `[].images[].alt`: Alt Text
- `[].images[].srcset`: Srcset
- `[].images[].sizes`: Sizes
- `[].images[].date_created`: Created At (datetime)
- `[].images[].date_created_gmt`: Created At (GMT) (datetime)
- `[].images[].date_modified`: Modified At (datetime)
- `[].images[].date_modified_gmt`: Modified At (GMT) (datetime)
- `[].attributes`: Attributes
- `[].attributes[].id`: Attribute ID
- `[].attributes[].name`: Name
- `[].attributes[].slug`: Slug
- `[].attributes[].position`: Position (number)
- `[].attributes[].visible`: Visible (boolean)
- `[].attributes[].variation`: Used For Variations (boolean)
- `[].attributes[].options`: Options
- `[].default_attributes`: Default Attributes
- `[].default_attributes[].id`: Attribute ID
- `[].default_attributes[].name`: Name
- `[].default_attributes[].option`: Option
- `[].variations`: Variation IDs
- `[].grouped_products`: Grouped Product IDs
- `[].menu_order`: Menu Order (number)
- `[].price_html`: Price HTML (html)
- `[].has_options`: Has Options (boolean)
- `[].post_password`: Post Password
- `[].global_unique_id`: Global Unique ID
- `[].meta_data`: Meta Data
- `[].meta_data[].id`: Meta ID
- `[].meta_data[].key`: Key
- `[].meta_data[].value`: Value

### `update_coupon`

**Update Coupon.** Changes the amount, discount type, description, expiry date, usage limit or minimum spend of one coupon by id; fields left empty are kept. Find the id with list_coupons by code. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Coupon ID. Enter the coupon ID. |
| `amount` | number | no |  | Amount. |
| `discount_type` | string | no |  | Discount Type. One of `"percent"`, `"fixed_cart"`, `"fixed_product"`. |
| `description` | string | no |  | Description. |
| `date_expires` | ISO date-time string | no |  | Expires At. Date the coupon stops working. |
| `usage_limit` | number | no |  | Usage Limit. |
| `minimum_amount` | number | no |  | Minimum Spend. |

Output fields:

- `id`: Coupon ID
- `code`: Code
- `amount`: Amount
- `status`: Status
- `discount_type`: Discount Type
- `description`: Description
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `date_expires`: Expires At (datetime)
- `date_expires_gmt`: Expires At (GMT) (datetime)
- `usage_count`: Usage Count (number)
- `individual_use`: Individual Use Only (boolean)
- `product_ids`: Product IDs
- `excluded_product_ids`: Excluded Product IDs
- `usage_limit`: Usage Limit (number)
- `usage_limit_per_user`: Usage Limit Per User (number)
- `limit_usage_to_x_items`: Limit Usage To X Items (number)
- `free_shipping`: Free Shipping (boolean)
- `product_categories`: Product Category IDs
- `excluded_product_categories`: Excluded Product Category IDs
- `exclude_sale_items`: Exclude Sale Items (boolean)
- `minimum_amount`: Minimum Amount
- `maximum_amount`: Maximum Amount
- `email_restrictions`: Email Restrictions
- `used_by`: Used By
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `update_customer`

**Update Customer.** Changes the email, first or last name, or billing phone, city, postcode and country of one customer by id; fields left empty are kept. Find the id with list_customers. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Customer ID. Enter the customer ID. |
| `email` | string | no |  | Email. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `phone` | string | no |  | Billing Phone. |
| `city` | string | no |  | Billing City. |
| `postcode` | string | no |  | Billing Postcode. |
| `country` | string | no |  | Billing Country. Two-letter country code, e.g. GB. |

Output fields:

- `id`: Customer ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `username`: Username
- `role`: Role
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `billing`: Billing Address
- `billing.first_name`: First Name
- `billing.last_name`: Last Name
- `billing.company`: Company
- `billing.address_1`: Address Line 1
- `billing.address_2`: Address Line 2
- `billing.city`: City
- `billing.state`: State
- `billing.postcode`: Postcode
- `billing.country`: Country
- `billing.email`: Email (email)
- `billing.phone`: Phone
- `shipping`: Shipping Address
- `shipping.first_name`: First Name
- `shipping.last_name`: Last Name
- `shipping.company`: Company
- `shipping.address_1`: Address Line 1
- `shipping.address_2`: Address Line 2
- `shipping.city`: City
- `shipping.state`: State
- `shipping.postcode`: Postcode
- `shipping.country`: Country
- `shipping.phone`: Phone
- `is_paying_customer`: Is Paying Customer (boolean)
- `avatar_url`: Avatar URL (url)
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `update_order`

**Update Order.** Changes the status, customer-provided note field or transaction id of one order; fields left empty are kept. Status changes have side effects: processing and completed email the customer, and refunded records a refund for the remaining amount and emails the customer, but moves no money and does not restock (use create_order_refund for partial refunds). The customer note field sends nothing; to message the customer use add_order_note. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Order ID. Enter the order ID. |
| `status` | string | no |  | Status. New status for the order. One of `"pending"`, `"processing"`, `"on-hold"`, `"completed"`, `"cancelled"`, `"refunded"`, `"failed"`. |
| `customer_note` | string | no |  | Customer Note. Note shown to the customer. |
| `transaction_id` | string | no |  | Transaction ID. Payment transaction reference. |

Output fields:

- `id`: Order ID
- `number`: Order Number
- `parent_id`: Parent Order ID
- `status`: Status
- `currency`: Currency
- `currency_symbol`: Currency Symbol
- `version`: WooCommerce Version
- `prices_include_tax`: Prices Include Tax (boolean)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `date_completed`: Completed At (datetime)
- `date_completed_gmt`: Completed At (GMT) (datetime)
- `date_paid`: Paid At (datetime)
- `date_paid_gmt`: Paid At (GMT) (datetime)
- `discount_total`: Discount Total
- `discount_tax`: Discount Tax
- `shipping_total`: Shipping Total
- `shipping_tax`: Shipping Tax
- `cart_tax`: Cart Tax
- `total`: Total
- `total_tax`: Total Tax
- `customer_id`: Customer ID
- `order_key`: Order Key
- `billing`: Billing Address
- `billing.first_name`: First Name
- `billing.last_name`: Last Name
- `billing.company`: Company
- `billing.address_1`: Address Line 1
- `billing.address_2`: Address Line 2
- `billing.city`: City
- `billing.state`: State
- `billing.postcode`: Postcode
- `billing.country`: Country
- `billing.email`: Email (email)
- `billing.phone`: Phone
- `shipping`: Shipping Address
- `shipping.first_name`: First Name
- `shipping.last_name`: Last Name
- `shipping.company`: Company
- `shipping.address_1`: Address Line 1
- `shipping.address_2`: Address Line 2
- `shipping.city`: City
- `shipping.state`: State
- `shipping.postcode`: Postcode
- `shipping.country`: Country
- `shipping.phone`: Phone
- `payment_method`: Payment Method
- `payment_method_title`: Payment Method Title
- `transaction_id`: Transaction ID
- `customer_ip_address`: Customer IP Address
- `customer_user_agent`: Customer User Agent
- `created_via`: Created Via
- `customer_note`: Customer Note
- `cart_hash`: Cart Hash
- `payment_url`: Payment URL (url)
- `is_editable`: Is Editable (boolean)
- `needs_payment`: Needs Payment (boolean)
- `needs_processing`: Needs Processing (boolean)
- `line_items`: Line Items
- `line_items[].id`: Line Item ID
- `line_items[].name`: Name
- `line_items[].product_id`: Product ID
- `line_items[].variation_id`: Variation ID
- `line_items[].quantity`: Quantity (number)
- `line_items[].tax_class`: Tax Class
- `line_items[].subtotal`: Subtotal
- `line_items[].subtotal_tax`: Subtotal Tax
- `line_items[].total`: Total
- `line_items[].total_tax`: Total Tax
- `line_items[].taxes`: Taxes
- `line_items[].taxes[].id`: Rate ID
- `line_items[].taxes[].total`: Total
- `line_items[].taxes[].subtotal`: Subtotal
- `line_items[].meta_data`: Meta Data
- `line_items[].meta_data[].id`: Meta ID
- `line_items[].meta_data[].key`: Key
- `line_items[].meta_data[].value`: Value
- `line_items[].meta_data[].display_key`: Display Key
- `line_items[].meta_data[].display_value`: Display Value
- `line_items[].sku`: SKU
- `line_items[].global_unique_id`: Global Unique ID
- `line_items[].price`: Price
- `line_items[].image`: Image
- `line_items[].image.id`: Image ID
- `line_items[].image.src`: Source URL (url)
- `line_items[].parent_name`: Parent Product Name
- `tax_lines`: Tax Lines
- `tax_lines[].id`: Tax Line ID
- `tax_lines[].rate_code`: Rate Code
- `tax_lines[].rate_id`: Rate ID
- `tax_lines[].label`: Label
- `tax_lines[].compound`: Compound (boolean)
- `tax_lines[].tax_total`: Tax Total
- `tax_lines[].shipping_tax_total`: Shipping Tax Total
- `tax_lines[].rate_percent`: Rate Percent (number)
- `tax_lines[].meta_data`: Meta Data
- `tax_lines[].meta_data[].id`: Meta ID
- `tax_lines[].meta_data[].key`: Key
- `tax_lines[].meta_data[].value`: Value
- `tax_lines[].meta_data[].display_key`: Display Key
- `tax_lines[].meta_data[].display_value`: Display Value
- `shipping_lines`: Shipping Lines
- `shipping_lines[].id`: Shipping Line ID
- `shipping_lines[].method_title`: Method Title
- `shipping_lines[].method_id`: Method ID
- `shipping_lines[].instance_id`: Instance ID
- `shipping_lines[].total`: Total
- `shipping_lines[].total_tax`: Total Tax
- `shipping_lines[].taxes`: Taxes
- `shipping_lines[].taxes[].id`: Rate ID
- `shipping_lines[].taxes[].total`: Total
- `shipping_lines[].taxes[].subtotal`: Subtotal
- `shipping_lines[].tax_status`: Tax Status
- `shipping_lines[].meta_data`: Meta Data
- `shipping_lines[].meta_data[].id`: Meta ID
- `shipping_lines[].meta_data[].key`: Key
- `shipping_lines[].meta_data[].value`: Value
- `shipping_lines[].meta_data[].display_key`: Display Key
- `shipping_lines[].meta_data[].display_value`: Display Value
- `fee_lines`: Fee Lines
- `fee_lines[].id`: Fee Line ID
- `fee_lines[].name`: Name
- `fee_lines[].tax_class`: Tax Class
- `fee_lines[].tax_status`: Tax Status
- `fee_lines[].amount`: Amount
- `fee_lines[].total`: Total
- `fee_lines[].total_tax`: Total Tax
- `fee_lines[].taxes`: Taxes
- `fee_lines[].taxes[].id`: Rate ID
- `fee_lines[].taxes[].total`: Total
- `fee_lines[].taxes[].subtotal`: Subtotal
- `fee_lines[].meta_data`: Meta Data
- `fee_lines[].meta_data[].id`: Meta ID
- `fee_lines[].meta_data[].key`: Key
- `fee_lines[].meta_data[].value`: Value
- `fee_lines[].meta_data[].display_key`: Display Key
- `fee_lines[].meta_data[].display_value`: Display Value
- `coupon_lines`: Coupon Lines
- `coupon_lines[].id`: Coupon Line ID
- `coupon_lines[].code`: Code
- `coupon_lines[].discount`: Discount
- `coupon_lines[].discount_tax`: Discount Tax
- `coupon_lines[].discount_type`: Discount Type
- `coupon_lines[].nominal_amount`: Nominal Amount (number)
- `coupon_lines[].free_shipping`: Free Shipping (boolean)
- `coupon_lines[].meta_data`: Meta Data
- `coupon_lines[].meta_data[].id`: Meta ID
- `coupon_lines[].meta_data[].key`: Key
- `coupon_lines[].meta_data[].value`: Value
- `coupon_lines[].meta_data[].display_key`: Display Key
- `coupon_lines[].meta_data[].display_value`: Display Value
- `refunds`: Refunds
- `refunds[].id`: Refund ID
- `refunds[].reason`: Reason
- `refunds[].total`: Total
- `refunds[].total_tax`: Total Tax
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `update_product`

**Update Product.** Changes only the supplied fields of one product by id; everything else is left as it is. Category IDs and Tag IDs replace the whole list, so include the existing ids you want to keep (read them with get_product). For several products at once use batch_update_products; for a variation use update_product_variation. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | number | yes |  | Product ID. Id of the product to update. Find it with list_products. |
| `name` | string | no |  | Name. New product name. |
| `sku` | string | no |  | SKU. New SKU. Must be unique in the store. |
| `status` | string | no |  | Status. New status. One of `"publish"`, `"draft"`, `"pending"`, `"private"`. |
| `regular_price` | string | no |  | Regular Price. New regular price as a decimal string, e.g. 19.99. |
| `sale_price` | string | no |  | Sale Price. New sale price as a decimal string. To remove a sale use End Sale instead. |
| `end_sale` | boolean | no | `false` | End Sale. When on, clears the sale price so the product sells at its regular price again. |
| `stock_quantity` | number | no |  | Stock Quantity. New number of units in stock. Setting it turns on stock management. |
| `stock_status` | string | no |  | Stock Status. New stock status. Ignored when a stock quantity is set. One of `"instock"`, `"outofstock"`, `"onbackorder"`. |
| `featured` | string | no |  | Featured. Yes marks the product as featured, No removes the mark. Leave empty to keep it. One of `"yes"`, `"no"`. |
| `catalog_visibility` | string | no |  | Catalog Visibility. Where the product is shown. One of `"visible"`, `"catalog"`, `"search"`, `"hidden"`. |
| `description` | string | no |  | Description. New full description. HTML is allowed. |
| `short_description` | string | no |  | Short Description. New short description. HTML is allowed. |
| `category_ids` | array | no |  | Category IDs. Replaces all of the product categories with these ids. Include the ones to keep. |
| `tag_ids` | array | no |  | Tag IDs. Replaces all of the product tags with these ids. Include the ones to keep. |

Output fields:

- `id`: Product ID
- `name`: Name
- `slug`: Slug
- `permalink`: Permalink (url)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `type`: Type
- `status`: Status
- `featured`: Featured (boolean)
- `catalog_visibility`: Catalog Visibility
- `description`: Description (html)
- `short_description`: Short Description (html)
- `sku`: SKU
- `price`: Price
- `regular_price`: Regular Price
- `sale_price`: Sale Price
- `date_on_sale_from`: On Sale From (datetime)
- `date_on_sale_from_gmt`: On Sale From (GMT) (datetime)
- `date_on_sale_to`: On Sale To (datetime)
- `date_on_sale_to_gmt`: On Sale To (GMT) (datetime)
- `on_sale`: On Sale (boolean)
- `purchasable`: Purchasable (boolean)
- `total_sales`: Total Sales (number)
- `virtual`: Virtual (boolean)
- `downloadable`: Downloadable (boolean)
- `downloads`: Downloads
- `downloads[].id`: Download ID
- `downloads[].name`: File Name
- `downloads[].file`: File URL (url)
- `download_limit`: Download Limit (number)
- `download_expiry`: Download Expiry (Days) (number)
- `external_url`: External URL (url)
- `button_text`: Button Text
- `tax_status`: Tax Status
- `tax_class`: Tax Class
- `manage_stock`: Manage Stock (boolean)
- `stock_quantity`: Stock Quantity (number)
- `stock_status`: Stock Status
- `backorders`: Backorders
- `backorders_allowed`: Backorders Allowed (boolean)
- `backordered`: Backordered (boolean)
- `low_stock_amount`: Low Stock Amount (number)
- `sold_individually`: Sold Individually (boolean)
- `weight`: Weight
- `dimensions`: Dimensions
- `dimensions.length`: Length
- `dimensions.width`: Width
- `dimensions.height`: Height
- `shipping_required`: Shipping Required (boolean)
- `shipping_taxable`: Shipping Taxable (boolean)
- `shipping_class`: Shipping Class
- `shipping_class_id`: Shipping Class ID
- `reviews_allowed`: Reviews Allowed (boolean)
- `average_rating`: Average Rating
- `rating_count`: Rating Count (number)
- `upsell_ids`: Upsell Product IDs
- `cross_sell_ids`: Cross-sell Product IDs
- `related_ids`: Related Product IDs
- `parent_id`: Parent Product ID
- `purchase_note`: Purchase Note
- `categories`: Categories
- `categories[].id`: ID
- `categories[].name`: Name
- `categories[].slug`: Slug
- `tags`: Tags
- `tags[].id`: ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `brands`: Brands
- `brands[].id`: ID
- `brands[].name`: Name
- `brands[].slug`: Slug
- `images`: Images
- `images[].id`: Image ID
- `images[].src`: Source URL (url)
- `images[].thumbnail`: Thumbnail URL (url)
- `images[].name`: Name
- `images[].alt`: Alt Text
- `images[].srcset`: Srcset
- `images[].sizes`: Sizes
- `images[].date_created`: Created At (datetime)
- `images[].date_created_gmt`: Created At (GMT) (datetime)
- `images[].date_modified`: Modified At (datetime)
- `images[].date_modified_gmt`: Modified At (GMT) (datetime)
- `attributes`: Attributes
- `attributes[].id`: Attribute ID
- `attributes[].name`: Name
- `attributes[].slug`: Slug
- `attributes[].position`: Position (number)
- `attributes[].visible`: Visible (boolean)
- `attributes[].variation`: Used For Variations (boolean)
- `attributes[].options`: Options
- `default_attributes`: Default Attributes
- `default_attributes[].id`: Attribute ID
- `default_attributes[].name`: Name
- `default_attributes[].option`: Option
- `variations`: Variation IDs
- `grouped_products`: Grouped Product IDs
- `menu_order`: Menu Order (number)
- `price_html`: Price HTML (html)
- `has_options`: Has Options (boolean)
- `post_password`: Post Password
- `global_unique_id`: Global Unique ID
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

### `update_product_review`

**Moderate Product Review.** Changes the moderation status of one product review: approve it, put it on hold, mark or unmark it as spam, or move it to or from the trash. The review text and rating cannot be changed here. Find review ids with list_product_reviews. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `review_id` | number | yes |  | Review ID. Id of the review. |
| `status` | string | yes |  | Status. New moderation status. One of `"approved"`, `"hold"`, `"spam"`, `"unspam"`, `"trash"`, `"untrash"`. |

Output fields:

- `id`: Review ID
- `product_id`: Product ID
- `product_name`: Product Name
- `product_permalink`: Product URL (url)
- `status`: Status
- `reviewer`: Reviewer
- `reviewer_email`: Reviewer Email (email)
- `review`: Review (html)
- `rating`: Rating (number)
- `verified`: Verified Owner (boolean)
- `reviewer_avatar_urls`: Reviewer Avatar URLs
- `reviewer_avatar_urls.24`: Avatar 24px (url)
- `reviewer_avatar_urls.48`: Avatar 48px (url)
- `reviewer_avatar_urls.96`: Avatar 96px (url)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)

### `update_product_variation`

**Update Product Variation.** Changes only the supplied fields (price, SKU, status, stock, description) of one variation of a variable product; everything else is left as it is. Find the ids with list_product_variations. For the parent product itself use update_product. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | number | yes |  | Product ID. Id of the parent variable product. |
| `variation_id` | number | yes |  | Variation ID. Id of the variation to update. |
| `regular_price` | string | no |  | Regular Price. New regular price as a decimal string, e.g. 19.99. |
| `sale_price` | string | no |  | Sale Price. New sale price as a decimal string. To remove a sale use End Sale instead. |
| `end_sale` | boolean | no | `false` | End Sale. When on, clears the sale price so the variation sells at its regular price again. |
| `sku` | string | no |  | SKU. New SKU. Must be unique in the store. |
| `status` | string | no |  | Status. New status. Private hides the variation from customers. One of `"publish"`, `"draft"`, `"pending"`, `"private"`. |
| `stock_quantity` | number | no |  | Stock Quantity. New number of units in stock. Setting it turns on stock management for this variation. |
| `stock_status` | string | no |  | Stock Status. New stock status. Ignored when a stock quantity is set. One of `"instock"`, `"outofstock"`, `"onbackorder"`. |
| `description` | string | no |  | Description. New variation description. |

Output fields:

- `id`: Variation ID
- `parent_id`: Parent Product ID
- `name`: Name
- `type`: Type
- `status`: Status
- `description`: Description (html)
- `permalink`: Permalink (url)
- `sku`: SKU
- `global_unique_id`: Global Unique ID
- `price`: Price
- `regular_price`: Regular Price
- `sale_price`: Sale Price
- `date_on_sale_from`: On Sale From (datetime)
- `date_on_sale_from_gmt`: On Sale From (GMT) (datetime)
- `date_on_sale_to`: On Sale To (datetime)
- `date_on_sale_to_gmt`: On Sale To (GMT) (datetime)
- `on_sale`: On Sale (boolean)
- `purchasable`: Purchasable (boolean)
- `virtual`: Virtual (boolean)
- `downloadable`: Downloadable (boolean)
- `downloads`: Downloads
- `downloads[].id`: Download ID
- `downloads[].name`: File Name
- `downloads[].file`: File URL (url)
- `download_limit`: Download Limit (number)
- `download_expiry`: Download Expiry (Days) (number)
- `tax_status`: Tax Status
- `tax_class`: Tax Class
- `manage_stock`: Manage Stock
- `stock_quantity`: Stock Quantity (number)
- `stock_status`: Stock Status
- `backorders`: Backorders
- `backorders_allowed`: Backorders Allowed (boolean)
- `backordered`: Backordered (boolean)
- `low_stock_amount`: Low Stock Amount (number)
- `weight`: Weight
- `dimensions`: Dimensions
- `dimensions.length`: Length
- `dimensions.width`: Width
- `dimensions.height`: Height
- `shipping_class`: Shipping Class
- `shipping_class_id`: Shipping Class ID
- `image`: Image
- `image.id`: Image ID
- `image.src`: Source URL (url)
- `image.thumbnail`: Thumbnail URL (url)
- `image.name`: Name
- `image.alt`: Alt Text
- `image.srcset`: Srcset
- `image.sizes`: Sizes
- `image.date_created`: Created At (datetime)
- `image.date_created_gmt`: Created At (GMT) (datetime)
- `image.date_modified`: Modified At (datetime)
- `image.date_modified_gmt`: Modified At (GMT) (datetime)
- `gallery_image_ids`: Gallery Image IDs
- `attributes`: Attributes
- `attributes[].id`: Attribute ID
- `attributes[].name`: Name
- `attributes[].slug`: Slug
- `attributes[].option`: Option
- `menu_order`: Menu Order (number)
- `date_created`: Created At (datetime)
- `date_created_gmt`: Created At (GMT) (datetime)
- `date_modified`: Modified At (datetime)
- `date_modified_gmt`: Modified At (GMT) (datetime)
- `meta_data`: Meta Data
- `meta_data[].id`: Meta ID
- `meta_data[].key`: Key
- `meta_data[].value`: Value

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

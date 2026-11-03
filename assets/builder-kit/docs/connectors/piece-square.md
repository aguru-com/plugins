# Square

Payment solutions for every business

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-square'
  version: '1.0.1'
```

Categories: COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Sign in with the Square seller account you want to automate (production accounts only). Connections created before piece version 1.0.0 do not have the payment, inventory and team permissions: reconnect Square to use those actions.

## Actions

### `get_merchant`

**Get Business Profile.** Returns the connected Square seller profile (business name, country, default currency, main location ID). Use it to learn the currency before entering amounts, or which account a connection points at. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: Merchant ID
- `business_name`: Business Name
- `country`: Country
- `language_code`: Language
- `currency`: Currency
- `status`: Status
- `main_location_id`: Main Location ID
- `created_at`: Created At (datetime)

### `list_locations`

**List Locations.** Lists the seller locations with their IDs, currency, time zone and address. Location IDs are needed by orders, payment links and inventory; "main" is also accepted wherever a location ID is optional. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no | `"ACTIVE"` | Status. Which locations to return. One of `"ACTIVE"`, `"INACTIVE"`, `"ALL"`. |

Output fields:

- `count`: Count (This Page) (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `items`: Locations
- `items[].id`: Location ID
- `items[].name`: Name
- `items[].business_name`: Business Name
- `items[].status`: Status
- `items[].type`: Type
- `items[].country`: Country
- `items[].currency`: Currency
- `items[].timezone`: Time Zone
- `items[].language_code`: Language
- `items[].address_line_1`: Address Line 1
- `items[].address_line_2`: Address Line 2
- `items[].city`: City
- `items[].state`: State / Region
- `items[].postal_code`: Postal Code
- `items[].country`: Country
- `items[].phone_number`: Phone
- `items[].business_email`: Business Email (email)
- `items[].website_url`: Website (url)
- `items[].capabilities`: Capabilities
- `items[].merchant_id`: Merchant ID
- `items[].created_at`: Created At (datetime)

### `list_team_members`

**List Team Members.** Lists Square team members (staff) with IDs, names, status and assigned locations, one page at a time. Use it to see who works at which location. Needs the EMPLOYEES_READ permission (reconnect older connections). Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location_id` | string | no |  | Location ID. Square location ID (from List Locations). Leave empty to use the main location. |
| `status` | string | no | `"ACTIVE"` | Status. One of `"ACTIVE"`, `"INACTIVE"`, `"ALL"`. |
| `limit` | number | no | `50` | Limit. How many results to return (1-200, default 50). |
| `cursor` | string | no |  | Cursor. Next Cursor from a previous run, to get the next page. Cursors expire after about 5 minutes. |

Output fields:

- `count`: Count (This Page) (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `items`: Team Members
- `items[].id`: Team Member ID
- `items[].given_name`: First Name
- `items[].family_name`: Last Name
- `items[].email_address`: Email (email)
- `items[].phone_number`: Phone
- `items[].status`: Status
- `items[].is_owner`: Is Owner (boolean)
- `items[].reference_id`: Reference ID
- `items[].assignment_type`: Location Assignment
- `items[].location_ids`: Location IDs
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)

### `create_customer`

**Create Customer.** Creates a Square customer profile; needs at least one of first name, last name, company, email or phone. Square allows duplicate emails, so run Find Customers first to avoid duplicates. A retried step returns the same customer instead of repeating the write, and identical calls within one run (for example a loop with the same input) count as one; set Idempotency Key (for example to the loop item) to keep them separate. A new run writes again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `given_name` | string | no |  | First Name. Given name. |
| `family_name` | string | no |  | Last Name. Family name. |
| `company_name` | string | no |  | Company. |
| `nickname` | string | no |  | Nickname. |
| `email_address` | string | no |  | Email. |
| `phone_number` | string | no |  | Phone. Phone number in international format, for example +14155550123. |
| `birthday` | string | no |  | Birthday. YYYY-MM-DD, or 0000-MM-DD when the year is unknown. |
| `note` | string | no |  | Note. |
| `reference_id` | string | no |  | Reference ID. Your own ID for this customer, for example from your CRM. |
| `address_line_1` | string | no |  | Address Line 1. |
| `address_line_2` | string | no |  | Address Line 2. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State / Region. |
| `postal_code` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. Two-letter country code, for example US. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional, up to 45 characters. Leave empty: a retried step returns the same record, but identical calls in one run (such as a loop with the same input) count as one. Set a unique value, like the loop item, to keep them separate. |

Output fields:

- `id`: Customer ID
- `given_name`: First Name
- `family_name`: Last Name
- `company_name`: Company
- `nickname`: Nickname
- `email_address`: Email (email)
- `phone_number`: Phone
- `birthday`: Birthday
- `note`: Note
- `reference_id`: Reference ID
- `address_line_1`: Address Line 1
- `address_line_2`: Address Line 2
- `city`: City
- `state`: State / Region
- `postal_code`: Postal Code
- `country`: Country
- `email_unsubscribed`: Email Unsubscribed (boolean)
- `creation_source`: Creation Source
- `group_ids`: Group IDs
- `version`: Version (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `find_customers`

**Find Customers.** Searches the Square Customer Directory by email, phone, reference ID and/or creation date and returns one page of matching customers with their IDs. Use it before Create Customer to avoid duplicates, or to get a customer ID for orders and payments. Square cannot search by name, and a customer created seconds ago may not be searchable yet. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_address` | string | no |  | Email. |
| `phone_number` | string | no |  | Phone. For example +14155550123. |
| `reference_id` | string | no |  | Reference ID. |
| `match` | string | no | `"exact"` | Match. Exact match, or partial match (contains) for email, phone and reference ID. One of `"exact"`, `"fuzzy"`. |
| `created_after` | ISO date-time string | no |  | Created After. |
| `created_before` | ISO date-time string | no |  | Created Before. |
| `limit` | number | no | `50` | Limit. How many results to return (1-100, default 50). |
| `cursor` | string | no |  | Cursor. Next Cursor from a previous run, to get the next page. Cursors expire after about 5 minutes. |

Output fields:

- `count`: Count (This Page) (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `items`: Customers
- `items[].id`: Customer ID
- `items[].given_name`: First Name
- `items[].family_name`: Last Name
- `items[].company_name`: Company
- `items[].nickname`: Nickname
- `items[].email_address`: Email (email)
- `items[].phone_number`: Phone
- `items[].birthday`: Birthday
- `items[].note`: Note
- `items[].reference_id`: Reference ID
- `items[].address_line_1`: Address Line 1
- `items[].address_line_2`: Address Line 2
- `items[].city`: City
- `items[].state`: State / Region
- `items[].postal_code`: Postal Code
- `items[].country`: Country
- `items[].email_unsubscribed`: Email Unsubscribed (boolean)
- `items[].creation_source`: Creation Source
- `items[].group_ids`: Group IDs
- `items[].version`: Version (number)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)

### `get_customer`

**Get Customer.** Reads one Square customer picked from a list. Agents use Get Customer (by ID). Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer. Pick a customer. Type an email to search all customers, or part of a name to search up to the 10,000 newest (the search stops after 20 seconds). For an older customer, search by email or map the Customer ID. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Customer ID
- `given_name`: First Name
- `family_name`: Last Name
- `company_name`: Company
- `nickname`: Nickname
- `email_address`: Email (email)
- `phone_number`: Phone
- `birthday`: Birthday
- `note`: Note
- `reference_id`: Reference ID
- `address_line_1`: Address Line 1
- `address_line_2`: Address Line 2
- `city`: City
- `state`: State / Region
- `postal_code`: Postal Code
- `country`: Country
- `email_unsubscribed`: Email Unsubscribed (boolean)
- `creation_source`: Creation Source
- `group_ids`: Group IDs
- `version`: Version (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `update_customer`

**Update Customer.** Updates a Square customer picked from a list; agents use Update Customer (by ID). Only filled fields change. Setting the same values again is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer. Pick a customer. Type an email to search all customers, or part of a name to search up to the 10,000 newest (the search stops after 20 seconds). For an older customer, search by email or map the Customer ID. A value the product loads from the provider, such as an id; write the value itself. |
| `given_name` | string | no |  | First Name. Given name. Leave empty to keep the current value. |
| `family_name` | string | no |  | Last Name. Family name. Leave empty to keep the current value. |
| `company_name` | string | no |  | Company. Leave empty to keep the current value. |
| `nickname` | string | no |  | Nickname. |
| `email_address` | string | no |  | Email. |
| `phone_number` | string | no |  | Phone. Phone number in international format, for example +14155550123. |
| `birthday` | string | no |  | Birthday. YYYY-MM-DD, or 0000-MM-DD when the year is unknown. |
| `note` | string | no |  | Note. |
| `reference_id` | string | no |  | Reference ID. Your own ID for this customer, for example from your CRM. |
| `address_line_1` | string | no |  | Address Line 1. |
| `address_line_2` | string | no |  | Address Line 2. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State / Region. |
| `postal_code` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. Two-letter country code, for example US. |
| `clear_fields` | array | no |  | Fields to Clear. Fields to empty on the customer. A field you also fill above is set, not cleared. Address clears the whole address. One of `"given_name"`, `"family_name"`, `"company_name"`, `"nickname"`, `"email_address"`, `"phone_number"`, `"birthday"`, `"note"`, `"reference_id"`, `"address"`. |

Output fields:

- `id`: Customer ID
- `given_name`: First Name
- `family_name`: Last Name
- `company_name`: Company
- `nickname`: Nickname
- `email_address`: Email (email)
- `phone_number`: Phone
- `birthday`: Birthday
- `note`: Note
- `reference_id`: Reference ID
- `address_line_1`: Address Line 1
- `address_line_2`: Address Line 2
- `city`: City
- `state`: State / Region
- `postal_code`: Postal Code
- `country`: Country
- `email_unsubscribed`: Email Unsubscribed (boolean)
- `creation_source`: Creation Source
- `group_ids`: Group IDs
- `version`: Version (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `delete_customer`

**Delete Customer.** Permanently deletes a Square customer picked from a list; agents use Delete Customer (by ID). Cannot be undone; a second run fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer. Pick a customer. Type an email to search all customers, or part of a name to search up to the 10,000 newest (the search stops after 20 seconds). For an older customer, search by email or map the Customer ID. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: ID
- `deleted`: Deleted (boolean)

### `search_catalog_items`

**Search Catalog Items.** Searches the Square item catalog by text (name, SKU, description), category ID and/or location ID, and returns one page of items with their variations (variation IDs, SKUs and prices). Use it to find the variation ID needed by Create Order, inventory and price updates. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | no |  | Search Text. Words to match in the item name, SKU or description. Leave empty to list items. |
| `category_id` | string | no |  | Category ID. |
| `location_id` | string | no |  | Location ID. Only items enabled at this location. |
| `limit` | number | no | `25` | Limit. How many results to return (1-100, default 25). |
| `cursor` | string | no |  | Cursor. Next Cursor from a previous run, to get the next page. Cursors expire after about 5 minutes. |

Output fields:

- `count`: Count (This Page) (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `items`: Items
- `items[].id`: Item ID
- `items[].type`: Object Type
- `items[].name`: Name
- `items[].description`: Description
- `items[].product_type`: Product Type
- `items[].category_ids`: Category IDs
- `items[].reporting_category_id`: Reporting Category ID
- `items[].is_archived`: Is Archived (boolean)
- `items[].is_deleted`: Is Deleted (boolean)
- `items[].present_at_all_locations`: At All Locations (boolean)
- `items[].version`: Version (number)
- `items[].updated_at`: Updated At (datetime)
- `items[].variation_count`: Variation Count (number)
- `items[].variations_truncated`: Variations Truncated (boolean)
- `items[].variations`: Variations
- `items[].variations[].id`: Variation ID
- `items[].variations[].item_id`: Item ID
- `items[].variations[].name`: Name
- `items[].variations[].sku`: SKU
- `items[].variations[].pricing_type`: Pricing Type
- `items[].variations[].price`: Price
- `items[].variations[].price_minor`: Price (Smallest Unit) (number)
- `items[].variations[].currency`: Currency
- `items[].variations[].version`: Version (number)
- `items[].variations[].is_deleted`: Is Deleted (boolean)
- `items[].variations[].updated_at`: Updated At (datetime)

### `get_catalog_item`

**Get Catalog Item.** Reads one Square catalog item with its variations (IDs, SKUs, prices). Accepts an item ID or a variation ID (then returns the parent item), for example from an order line item. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object_id` | string | yes |  | Item or Variation ID. The catalog item ID, or one of its variation IDs (from Search Catalog Items or an order line item). |

Output fields:

- `id`: Item ID
- `type`: Object Type
- `name`: Name
- `description`: Description
- `product_type`: Product Type
- `category_ids`: Category IDs
- `reporting_category_id`: Reporting Category ID
- `is_archived`: Is Archived (boolean)
- `is_deleted`: Is Deleted (boolean)
- `present_at_all_locations`: At All Locations (boolean)
- `version`: Version (number)
- `updated_at`: Updated At (datetime)
- `variation_count`: Variation Count (number)
- `variations_truncated`: Variations Truncated (boolean)
- `variations`: Variations
- `variations[].id`: Variation ID
- `variations[].item_id`: Item ID
- `variations[].name`: Name
- `variations[].sku`: SKU
- `variations[].pricing_type`: Pricing Type
- `variations[].price`: Price
- `variations[].price_minor`: Price (Smallest Unit) (number)
- `variations[].currency`: Currency
- `variations[].version`: Version (number)
- `variations[].is_deleted`: Is Deleted (boolean)
- `variations[].updated_at`: Updated At (datetime)

### `create_catalog_item`

**Create Catalog Item.** Creates a catalog item with one variation; agents use Create Catalog Item (by ID). A retried step returns the same item instead of repeating the write, and identical calls within one run (for example a loop with the same input) count as one; set Idempotency Key (for example to the loop item) to keep them separate. A new run writes again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `category_id` | string | no |  | Category. The catalog category for the item. A value the product loads from the provider, such as an id; write the value itself. |
| `variation_name` | string | no |  | Variation Name. Defaults to "Regular". |
| `price` | string | no |  | Price. For example 12.50. Leave empty for a variable price set at checkout. |
| `currency` | string | no |  | Currency. Three-letter code such as USD. Leave empty to use your main location currency. |
| `sku` | string | no |  | SKU. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional, up to 45 characters. Leave empty: a retried step returns the same record, but identical calls in one run (such as a loop with the same input) count as one. Set a unique value, like the loop item, to keep them separate. |

Output fields:

- `id`: Item ID
- `type`: Object Type
- `name`: Name
- `description`: Description
- `product_type`: Product Type
- `category_ids`: Category IDs
- `reporting_category_id`: Reporting Category ID
- `is_archived`: Is Archived (boolean)
- `is_deleted`: Is Deleted (boolean)
- `present_at_all_locations`: At All Locations (boolean)
- `version`: Version (number)
- `updated_at`: Updated At (datetime)
- `variation_count`: Variation Count (number)
- `variations_truncated`: Variations Truncated (boolean)
- `variations`: Variations
- `variations[].id`: Variation ID
- `variations[].item_id`: Item ID
- `variations[].name`: Name
- `variations[].sku`: SKU
- `variations[].pricing_type`: Pricing Type
- `variations[].price`: Price
- `variations[].price_minor`: Price (Smallest Unit) (number)
- `variations[].currency`: Currency
- `variations[].version`: Version (number)
- `variations[].is_deleted`: Is Deleted (boolean)
- `variations[].updated_at`: Updated At (datetime)

### `update_item_variation_price`

**Update Item Price.** Updates the price, SKU or name of a variation picked from lists; agents use Update Item Price (by ID). Setting the same values again is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item` | string | yes |  | Item. Pick a catalog item. Type to search by name. A value the product loads from the provider, such as an id; write the value itself. |
| `variation_id` | string | yes |  | Variation. The item variation (size, color, ...). Items without options have a single "Regular" variation. A value the product loads from the provider, such as an id; write the value itself. |
| `price` | string | no |  | New Price. For example 12.50. Leave empty to keep the price. |
| `currency` | string | no |  | Currency. Leave empty to keep the current currency. |
| `sku` | string | no |  | New SKU. |
| `name` | string | no |  | New Variation Name. |

Output fields:

- `id`: Variation ID
- `item_id`: Item ID
- `name`: Name
- `sku`: SKU
- `pricing_type`: Pricing Type
- `price`: Price
- `price_minor`: Price (Smallest Unit) (number)
- `currency`: Currency
- `version`: Version (number)
- `is_deleted`: Is Deleted (boolean)
- `updated_at`: Updated At (datetime)

### `delete_catalog_object`

**Delete Catalog Item.** Permanently deletes a Square catalog object by ID: an item ID deletes the item and all its variations; a variation ID deletes only that variation. Cannot be undone; a second call fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object_id` | string | yes |  | Item or Variation ID. From Search Catalog Items. |

Output fields:

- `id`: Deleted Object ID
- `deleted`: Deleted (boolean)
- `deleted_object_ids`: All Deleted IDs
- `deleted_at`: Deleted At (datetime)

### `get_inventory_count`

**Get Inventory Count.** Reads the stock count of a variation picked from lists; agents use Get Inventory Count (by ID). Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item` | string | yes |  | Item. Pick a catalog item. Type to search by name. A value the product loads from the provider, such as an id; write the value itself. |
| `variation_id` | string | yes |  | Variation. The item variation (size, color, ...). Items without options have a single "Regular" variation. A value the product loads from the provider, such as an id; write the value itself. |
| `location_id` | string | no |  | Location. Leave empty to get the count at every location. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `items`: Inventory Counts
- `items[].variation_id`: Variation ID
- `items[].object_type`: Object Type
- `items[].location_id`: Location ID
- `items[].state`: State
- `items[].quantity`: Quantity
- `items[].calculated_at`: Calculated At (datetime)

### `adjust_inventory`

**Adjust Inventory.** Adds or removes stock for a variation picked from lists; agents use Adjust Inventory (by ID). A retried step returns the same change instead of repeating the write, and identical calls within one run (for example a loop with the same input) count as one; set Idempotency Key (for example to the loop item) to keep them separate. A new run writes again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item` | string | yes |  | Item. Pick a catalog item. Type to search by name. A value the product loads from the provider, such as an id; write the value itself. |
| `variation_id` | string | yes |  | Variation. The item variation (size, color, ...). Items without options have a single "Regular" variation. A value the product loads from the provider, such as an id; write the value itself. |
| `location_id` | string | yes |  | Location. The Square location (store) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `reason` | string | yes | `"RECEIVED"` | Reason. One of `"RECEIVED"`, `"SOLD"`, `"WASTE"`. |
| `quantity` | string | yes |  | Quantity. How many units to add or remove, for example 5 or 1.5. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional, up to 45 characters. Leave empty: a retried step returns the same record, but identical calls in one run (such as a loop with the same input) count as one. Set a unique value, like the loop item, to keep them separate. |

Output fields:

- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `items`: Inventory Counts
- `items[].variation_id`: Variation ID
- `items[].object_type`: Object Type
- `items[].location_id`: Location ID
- `items[].state`: State
- `items[].quantity`: Quantity
- `items[].calculated_at`: Calculated At (datetime)

### `set_inventory_count`

**Set Inventory Count.** Sets the absolute in-stock count of a variation picked from lists; agents use Set Inventory Count (by ID). Setting the same count again is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item` | string | yes |  | Item. Pick a catalog item. Type to search by name. A value the product loads from the provider, such as an id; write the value itself. |
| `variation_id` | string | yes |  | Variation. The item variation (size, color, ...). Items without options have a single "Regular" variation. A value the product loads from the provider, such as an id; write the value itself. |
| `location_id` | string | yes |  | Location. The Square location (store) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `quantity` | string | yes |  | Quantity In Stock. The counted number of units, for example 12. |

Output fields:

- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `items`: Inventory Counts
- `items[].variation_id`: Variation ID
- `items[].object_type`: Object Type
- `items[].location_id`: Location ID
- `items[].state`: State
- `items[].quantity`: Quantity
- `items[].calculated_at`: Calculated At (datetime)

### `create_order`

**Create Order.** Creates an OPEN Square order from items picked in lists; agents use Create Order (by ID). No payment is taken. A retried step returns the same order instead of repeating the write, and identical calls within one run (for example a loop with the same input) count as one; set Idempotency Key (for example to the loop item) to keep them separate. A new run writes again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location_id` | string | no |  | Location. The Square location (store) to use. Leave empty for your main location. A value the product loads from the provider, such as an id; write the value itself. |
| `customer_id` | string | no |  | Customer. Optional. Type part of a name or email to search. A value the product loads from the provider, such as an id; write the value itself. |
| `line_items` | object | yes |  | Line Items. What the order contains. Pick a catalog item, or leave Catalog Item empty and fill Custom Name and Custom Price. An object whose fields depend on other inputs; the product shows them. |
| `reference_id` | string | no |  | Reference ID. Your own ID for this order, for example from your web shop. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional, up to 45 characters. Leave empty: a retried step returns the same record, but identical calls in one run (such as a loop with the same input) count as one. Set a unique value, like the loop item, to keep them separate. |

Output fields:

- `id`: Order ID
- `location_id`: Location ID
- `customer_id`: Customer ID
- `reference_id`: Reference ID
- `state`: State
- `version`: Version (number)
- `source_name`: Source
- `ticket_name`: Ticket Name
- `currency`: Currency
- `total`: Total
- `total_minor`: Total (Smallest Unit) (number)
- `total_tax`: Total Tax
- `total_discount`: Total Discount
- `total_tip`: Total Tip
- `total_service_charge`: Total Service Charge
- `net_amount_due`: Amount Due
- `payment_ids`: Payment IDs
- `fulfillment_states`: Fulfillment States
- `line_item_count`: Line Item Count (number)
- `line_items_truncated`: Line Items Truncated (boolean)
- `line_items`: Line Items
- `line_items[].uid`: Line Item UID
- `line_items[].name`: Name
- `line_items[].variation_name`: Variation Name
- `line_items[].catalog_object_id`: Variation ID
- `line_items[].quantity`: Quantity
- `line_items[].note`: Note
- `line_items[].base_price`: Unit Price
- `line_items[].total`: Total
- `line_items[].total_minor`: Total (Smallest Unit) (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)

### `get_order`

**Get Order.** Reads one Square order by order ID (from an order trigger, Search Orders or a payment): state, customer, totals as decimal strings and up to 100 line items. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. Map it from the New Order trigger or a payment. |

Output fields:

- `id`: Order ID
- `location_id`: Location ID
- `customer_id`: Customer ID
- `reference_id`: Reference ID
- `state`: State
- `version`: Version (number)
- `source_name`: Source
- `ticket_name`: Ticket Name
- `currency`: Currency
- `total`: Total
- `total_minor`: Total (Smallest Unit) (number)
- `total_tax`: Total Tax
- `total_discount`: Total Discount
- `total_tip`: Total Tip
- `total_service_charge`: Total Service Charge
- `net_amount_due`: Amount Due
- `payment_ids`: Payment IDs
- `fulfillment_states`: Fulfillment States
- `line_item_count`: Line Item Count (number)
- `line_items_truncated`: Line Items Truncated (boolean)
- `line_items`: Line Items
- `line_items[].uid`: Line Item UID
- `line_items[].name`: Name
- `line_items[].variation_name`: Variation Name
- `line_items[].catalog_object_id`: Variation ID
- `line_items[].quantity`: Quantity
- `line_items[].note`: Note
- `line_items[].base_price`: Unit Price
- `line_items[].total`: Total
- `line_items[].total_minor`: Total (Smallest Unit) (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)

### `search_orders`

**Search Orders.** Searches Square orders with filters picked from lists; agents use Search Orders (by ID). Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location_id` | string | no |  | Location. Leave empty to search all active locations (up to 10). A value the product loads from the provider, such as an id; write the value itself. |
| `states` | array | no |  | States. Leave empty for all states. One of `"OPEN"`, `"COMPLETED"`, `"CANCELED"`, `"DRAFT"`. |
| `customer_id` | string | no |  | Customer. Pick a customer. Type an email to search all customers, or part of a name to search up to the 10,000 newest (the search stops after 20 seconds). For an older customer, search by email or map the Customer ID. A value the product loads from the provider, such as an id; write the value itself. |
| `created_after` | ISO date-time string | no |  | Created After. |
| `created_before` | ISO date-time string | no |  | Created Before. |
| `limit` | number | no | `50` | Limit. How many results to return (1-500, default 50). |
| `cursor` | string | no |  | Cursor. Next Cursor from a previous run, to get the next page. Cursors expire after about 5 minutes. |

Output fields:

- `count`: Count (This Page) (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `items`: Orders
- `items[].id`: Order ID
- `items[].location_id`: Location ID
- `items[].customer_id`: Customer ID
- `items[].reference_id`: Reference ID
- `items[].state`: State
- `items[].version`: Version (number)
- `items[].source_name`: Source
- `items[].ticket_name`: Ticket Name
- `items[].currency`: Currency
- `items[].total`: Total
- `items[].total_minor`: Total (Smallest Unit) (number)
- `items[].total_tax`: Total Tax
- `items[].total_discount`: Total Discount
- `items[].total_tip`: Total Tip
- `items[].total_service_charge`: Total Service Charge
- `items[].net_amount_due`: Amount Due
- `items[].payment_ids`: Payment IDs
- `items[].fulfillment_states`: Fulfillment States
- `items[].line_item_count`: Line Item Count (number)
- `items[].line_items_truncated`: Line Items Truncated (boolean)
- `items[].line_items`: Line Items
- `items[].line_items[].uid`: Line Item UID
- `items[].line_items[].name`: Name
- `items[].line_items[].variation_name`: Variation Name
- `items[].line_items[].catalog_object_id`: Variation ID
- `items[].line_items[].quantity`: Quantity
- `items[].line_items[].note`: Note
- `items[].line_items[].base_price`: Unit Price
- `items[].line_items[].total`: Total
- `items[].line_items[].total_minor`: Total (Smallest Unit) (number)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].closed_at`: Closed At (datetime)

### `update_order_state`

**Complete or Cancel Order.** Moves an OPEN Square order to COMPLETED (needs all its payments completed) or CANCELED. Canceling cannot be undone. It reads the current version first. A retried step in the same run returns the same order; a later run on an order that is no longer OPEN fails without changing it. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | string | yes |  | Order ID. |
| `state` | string | yes |  | New State. One of `"COMPLETED"`, `"CANCELED"`. |

Output fields:

- `id`: Order ID
- `location_id`: Location ID
- `customer_id`: Customer ID
- `reference_id`: Reference ID
- `state`: State
- `version`: Version (number)
- `source_name`: Source
- `ticket_name`: Ticket Name
- `currency`: Currency
- `total`: Total
- `total_minor`: Total (Smallest Unit) (number)
- `total_tax`: Total Tax
- `total_discount`: Total Discount
- `total_tip`: Total Tip
- `total_service_charge`: Total Service Charge
- `net_amount_due`: Amount Due
- `payment_ids`: Payment IDs
- `fulfillment_states`: Fulfillment States
- `line_item_count`: Line Item Count (number)
- `line_items_truncated`: Line Items Truncated (boolean)
- `line_items`: Line Items
- `line_items[].uid`: Line Item UID
- `line_items[].name`: Name
- `line_items[].variation_name`: Variation Name
- `line_items[].catalog_object_id`: Variation ID
- `line_items[].quantity`: Quantity
- `line_items[].note`: Note
- `line_items[].base_price`: Unit Price
- `line_items[].total`: Total
- `line_items[].total_minor`: Total (Smallest Unit) (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)

### `get_payment`

**Get Payment.** Reads one Square payment by payment ID (from the New Payment trigger, List Payments or an order): status, amounts as decimal strings, refunded amount, card brand and last 4 digits, linked order and customer. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_id` | string | yes |  | Payment ID. Map it from the New Payment trigger or List Payments. |

Output fields:

- `id`: Payment ID
- `status`: Status
- `source_type`: Source Type
- `location_id`: Location ID
- `order_id`: Order ID
- `customer_id`: Customer ID
- `reference_id`: Reference ID
- `note`: Note
- `currency`: Currency
- `amount`: Amount
- `amount_minor`: Amount (Smallest Unit) (number)
- `tip`: Tip
- `total`: Total
- `total_minor`: Total (Smallest Unit) (number)
- `refunded`: Refunded
- `refunded_minor`: Refunded (Smallest Unit) (number)
- `card_brand`: Card Brand
- `card_last_4`: Card Last 4
- `card_entry_method`: Card Entry Method
- `external_type`: External Payment Type
- `external_source`: External Payment Source
- `receipt_number`: Receipt Number
- `receipt_url`: Receipt URL (url)
- `refund_ids`: Refund IDs
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `list_payments`

**List Payments.** Lists Square payments newest first, optionally limited to a location ID and a created-at range (ISO 8601; Square defaults to the last year). Returns one page; pass Next Cursor within about 5 minutes for more. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location_id` | string | no |  | Location ID. Leave empty for all locations. |
| `begin_time` | ISO date-time string | no |  | Created After. |
| `end_time` | ISO date-time string | no |  | Created Before. |
| `limit` | number | no | `50` | Limit. How many results to return (1-100, default 50). |
| `cursor` | string | no |  | Cursor. Next Cursor from a previous run, to get the next page. Cursors expire after about 5 minutes. |

Output fields:

- `count`: Count (This Page) (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `items`: Payments
- `items[].id`: Payment ID
- `items[].status`: Status
- `items[].source_type`: Source Type
- `items[].location_id`: Location ID
- `items[].order_id`: Order ID
- `items[].customer_id`: Customer ID
- `items[].reference_id`: Reference ID
- `items[].note`: Note
- `items[].currency`: Currency
- `items[].amount`: Amount
- `items[].amount_minor`: Amount (Smallest Unit) (number)
- `items[].tip`: Tip
- `items[].total`: Total
- `items[].total_minor`: Total (Smallest Unit) (number)
- `items[].refunded`: Refunded
- `items[].refunded_minor`: Refunded (Smallest Unit) (number)
- `items[].card_brand`: Card Brand
- `items[].card_last_4`: Card Last 4
- `items[].card_entry_method`: Card Entry Method
- `items[].external_type`: External Payment Type
- `items[].external_source`: External Payment Source
- `items[].receipt_number`: Receipt Number
- `items[].receipt_url`: Receipt URL (url)
- `items[].refund_ids`: Refund IDs
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)

### `record_external_payment`

**Record Cash or External Payment.** Records a completed CASH or EXTERNAL payment in Square for money already received elsewhere; it never charges a card. Amount is a decimal string like "12.50" in the location currency; with an Order ID it must equal the order total due. Needs PAYMENTS_WRITE (reconnect older connections). A retried step returns the same payment instead of repeating the write, and identical calls within one run (for example a loop with the same input) count as one; set Idempotency Key (for example to the loop item) to keep them separate. A new run writes again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source` | string | yes | `"CASH"` | Payment Type. One of `"CASH"`, `"EXTERNAL"`. |
| `amount` | string | yes |  | Amount. For example 12.50. |
| `currency` | string | no |  | Currency. Leave empty to use the location currency. |
| `external_type` | string | no |  | External Type. For Other payments: how the money was received. One of `"CHECK"`, `"BANK_TRANSFER"`, `"OTHER_GIFT_CARD"`, `"CRYPTO"`, `"SQUARE_CASH"`, `"SOCIAL"`, `"EXTERNAL"`, `"EMONEY"`, `"CARD"`, `"STORED_BALANCE"`, `"FOOD_VOUCHER"`, `"OTHER"`. |
| `external_source` | string | no |  | External Source. For Other payments: the provider, for example "Venmo" or "Bank of X". |
| `location_id` | string | no |  | Location ID. Leave empty to use the main location. |
| `order_id` | string | no |  | Order ID. Optional order this payment pays for. |
| `customer_id` | string | no |  | Customer ID. |
| `reference_id` | string | no |  | Reference ID. |
| `note` | string | no |  | Note. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional, up to 45 characters. Leave empty: a retried step returns the same record, but identical calls in one run (such as a loop with the same input) count as one. Set a unique value, like the loop item, to keep them separate. |

Output fields:

- `id`: Payment ID
- `status`: Status
- `source_type`: Source Type
- `location_id`: Location ID
- `order_id`: Order ID
- `customer_id`: Customer ID
- `reference_id`: Reference ID
- `note`: Note
- `currency`: Currency
- `amount`: Amount
- `amount_minor`: Amount (Smallest Unit) (number)
- `tip`: Tip
- `total`: Total
- `total_minor`: Total (Smallest Unit) (number)
- `refunded`: Refunded
- `refunded_minor`: Refunded (Smallest Unit) (number)
- `card_brand`: Card Brand
- `card_last_4`: Card Last 4
- `card_entry_method`: Card Entry Method
- `external_type`: External Payment Type
- `external_source`: External Payment Source
- `receipt_number`: Receipt Number
- `receipt_url`: Receipt URL (url)
- `refund_ids`: Refund IDs
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `refund_payment`

**Refund Payment.** Refunds an amount of a completed Square payment back to the buyer; cannot be undone. Not offered to agents. A retried step returns the same refund instead of repeating the write, and identical calls within one run (for example a loop with the same input) count as one; set Idempotency Key (for example to the loop item) to keep them separate. A new run writes again. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_id` | string | yes |  | Payment ID. Map it from the New Payment trigger, Get Payment or List Payments. |
| `amount` | string | yes |  | Amount to Refund. Decimal amount in the payment currency, for example 12.50. Must not exceed what is left to refund. |
| `reason` | string | no |  | Reason. Shown to the buyer on the refund receipt. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional, up to 45 characters. Leave empty: a retried step returns the same record, but identical calls in one run (such as a loop with the same input) count as one. Set a unique value, like the loop item, to keep them separate. |

Output fields:

- `id`: Refund ID
- `status`: Status
- `payment_id`: Payment ID
- `order_id`: Order ID
- `location_id`: Location ID
- `reason`: Reason
- `currency`: Currency
- `amount`: Amount
- `amount_minor`: Amount (Smallest Unit) (number)
- `processing_fee`: Processing Fee
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `get_refund`

**Get Refund.** Reads one Square refund by refund ID (from a payment's refund IDs or List Refunds): status (PENDING, COMPLETED, REJECTED, FAILED), amount and the refunded payment. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `refund_id` | string | yes |  | Refund ID. |

Output fields:

- `id`: Refund ID
- `status`: Status
- `payment_id`: Payment ID
- `order_id`: Order ID
- `location_id`: Location ID
- `reason`: Reason
- `currency`: Currency
- `amount`: Amount
- `amount_minor`: Amount (Smallest Unit) (number)
- `processing_fee`: Processing Fee
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `list_refunds`

**List Refunds.** Lists Square refunds newest first, optionally by location ID, status and created-at range (ISO 8601). Returns one page; pass Next Cursor within about 5 minutes for more. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location_id` | string | no |  | Location ID. Leave empty for all locations. |
| `status` | string | no |  | Status. One of `"PENDING"`, `"COMPLETED"`, `"REJECTED"`, `"FAILED"`. |
| `begin_time` | ISO date-time string | no |  | Created After. |
| `end_time` | ISO date-time string | no |  | Created Before. |
| `limit` | number | no | `50` | Limit. How many results to return (1-100, default 50). |
| `cursor` | string | no |  | Cursor. Next Cursor from a previous run, to get the next page. Cursors expire after about 5 minutes. |

Output fields:

- `count`: Count (This Page) (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `items`: Refunds
- `items[].id`: Refund ID
- `items[].status`: Status
- `items[].payment_id`: Payment ID
- `items[].order_id`: Order ID
- `items[].location_id`: Location ID
- `items[].reason`: Reason
- `items[].currency`: Currency
- `items[].amount`: Amount
- `items[].amount_minor`: Amount (Smallest Unit) (number)
- `items[].processing_fee`: Processing Fee
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)

### `create_payment_link`

**Create Payment Link.** Creates a quick-pay checkout link at a location picked from a list; agents use Create Payment Link (by ID). A retried step returns the same link instead of repeating the write, and identical calls within one run (for example a loop with the same input) count as one; set Idempotency Key (for example to the loop item) to keep them separate. A new run writes again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location_id` | string | no |  | Location. The Square location (store) to use. Leave empty for your main location. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Item Name. What the buyer pays for, shown on the checkout page. |
| `amount` | string | yes |  | Amount. For example 12.50. |
| `currency` | string | no |  | Currency. Leave empty to use the location currency. |
| `description` | string | no |  | Description. Internal description, not shown to the buyer. |
| `payment_note` | string | no |  | Payment Note. Added to the resulting payment. |
| `redirect_url` | string | no |  | Redirect URL. Where to send the buyer after paying. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional, up to 45 characters. Leave empty: a retried step returns the same record, but identical calls in one run (such as a loop with the same input) count as one. Set a unique value, like the loop item, to keep them separate. |

Output fields:

- `id`: Payment Link ID
- `version`: Version (number)
- `url`: Checkout URL (url)
- `long_url`: Long URL (url)
- `order_id`: Order ID
- `description`: Description
- `created_at`: Created At (datetime)

### `get_customer_by_id`

**Get Customer (by ID).** Reads one Square customer (contact details, address, notes, version) by customer ID, as returned by Find Customers or a customer trigger. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. Square customer ID (from Find Customers). |

Output fields:

- `id`: Customer ID
- `given_name`: First Name
- `family_name`: Last Name
- `company_name`: Company
- `nickname`: Nickname
- `email_address`: Email (email)
- `phone_number`: Phone
- `birthday`: Birthday
- `note`: Note
- `reference_id`: Reference ID
- `address_line_1`: Address Line 1
- `address_line_2`: Address Line 2
- `city`: City
- `state`: State / Region
- `postal_code`: Postal Code
- `country`: Country
- `email_unsubscribed`: Email Unsubscribed (boolean)
- `creation_source`: Creation Source
- `group_ids`: Group IDs
- `version`: Version (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `update_customer_by_id`

**Update Customer (by ID).** Updates a Square customer by customer ID: only the fields you pass change, and Fields to Clear empties fields. It reads the current version first, so it does not overwrite concurrent edits silently. Setting the same values again is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. Square customer ID (from Find Customers). |
| `given_name` | string | no |  | First Name. Given name. Leave empty to keep the current value. |
| `family_name` | string | no |  | Last Name. Family name. Leave empty to keep the current value. |
| `company_name` | string | no |  | Company. Leave empty to keep the current value. |
| `nickname` | string | no |  | Nickname. |
| `email_address` | string | no |  | Email. |
| `phone_number` | string | no |  | Phone. Phone number in international format, for example +14155550123. |
| `birthday` | string | no |  | Birthday. YYYY-MM-DD, or 0000-MM-DD when the year is unknown. |
| `note` | string | no |  | Note. |
| `reference_id` | string | no |  | Reference ID. Your own ID for this customer, for example from your CRM. |
| `address_line_1` | string | no |  | Address Line 1. |
| `address_line_2` | string | no |  | Address Line 2. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State / Region. |
| `postal_code` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. Two-letter country code, for example US. |
| `clear_fields` | array | no |  | Fields to Clear. Fields to empty on the customer. A field you also fill above is set, not cleared. Address clears the whole address. One of `"given_name"`, `"family_name"`, `"company_name"`, `"nickname"`, `"email_address"`, `"phone_number"`, `"birthday"`, `"note"`, `"reference_id"`, `"address"`. |

Output fields:

- `id`: Customer ID
- `given_name`: First Name
- `family_name`: Last Name
- `company_name`: Company
- `nickname`: Nickname
- `email_address`: Email (email)
- `phone_number`: Phone
- `birthday`: Birthday
- `note`: Note
- `reference_id`: Reference ID
- `address_line_1`: Address Line 1
- `address_line_2`: Address Line 2
- `city`: City
- `state`: State / Region
- `postal_code`: Postal Code
- `country`: Country
- `email_unsubscribed`: Email Unsubscribed (boolean)
- `creation_source`: Creation Source
- `group_ids`: Group IDs
- `version`: Version (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `delete_customer_by_id`

**Delete Customer (by ID).** Permanently deletes a Square customer by customer ID, including it from the Customer Directory. Cannot be undone; prefer Update Customer (by ID) when the user only wants to change details. A second call fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. Square customer ID (from Find Customers). |

Output fields:

- `id`: ID
- `deleted`: Deleted (boolean)

### `create_catalog_item_by_id`

**Create Catalog Item (by ID).** Creates a Square catalog item with one variation (name, optional price as a decimal like "12.50", SKU, category ID). Price uses the main location currency unless Currency is given; no price means variable pricing. Search Catalog Items first to avoid duplicates. A retried step returns the same item instead of repeating the write, and identical calls within one run (for example a loop with the same input) count as one; set Idempotency Key (for example to the loop item) to keep them separate. A new run writes again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `category_id` | string | no |  | Category ID. |
| `variation_name` | string | no |  | Variation Name. Defaults to "Regular". |
| `price` | string | no |  | Price. Decimal amount, for example 12.50. |
| `currency` | string | no |  | Currency. Three-letter code such as USD. |
| `sku` | string | no |  | SKU. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional, up to 45 characters. Leave empty: a retried step returns the same record, but identical calls in one run (such as a loop with the same input) count as one. Set a unique value, like the loop item, to keep them separate. |

Output fields:

- `id`: Item ID
- `type`: Object Type
- `name`: Name
- `description`: Description
- `product_type`: Product Type
- `category_ids`: Category IDs
- `reporting_category_id`: Reporting Category ID
- `is_archived`: Is Archived (boolean)
- `is_deleted`: Is Deleted (boolean)
- `present_at_all_locations`: At All Locations (boolean)
- `version`: Version (number)
- `updated_at`: Updated At (datetime)
- `variation_count`: Variation Count (number)
- `variations_truncated`: Variations Truncated (boolean)
- `variations`: Variations
- `variations[].id`: Variation ID
- `variations[].item_id`: Item ID
- `variations[].name`: Name
- `variations[].sku`: SKU
- `variations[].pricing_type`: Pricing Type
- `variations[].price`: Price
- `variations[].price_minor`: Price (Smallest Unit) (number)
- `variations[].currency`: Currency
- `variations[].version`: Version (number)
- `variations[].is_deleted`: Is Deleted (boolean)
- `variations[].updated_at`: Updated At (datetime)

### `update_item_variation_price_by_id`

**Update Item Price (by ID).** Sets the price (decimal string like "12.50"), SKU and/or name of one Square item variation by variation ID (from Search Catalog Items > variations, not the item ID). Reads the current version first. Setting the same values again is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `variation_id` | string | yes |  | Variation ID. Item variation ID from Search Catalog Items. |
| `price` | string | no |  | New Price. Decimal amount, for example 12.50. |
| `currency` | string | no |  | Currency. Leave empty to keep the current currency. |
| `sku` | string | no |  | New SKU. |
| `name` | string | no |  | New Variation Name. |

Output fields:

- `id`: Variation ID
- `item_id`: Item ID
- `name`: Name
- `sku`: SKU
- `pricing_type`: Pricing Type
- `price`: Price
- `price_minor`: Price (Smallest Unit) (number)
- `currency`: Currency
- `version`: Version (number)
- `is_deleted`: Is Deleted (boolean)
- `updated_at`: Updated At (datetime)

### `get_inventory_count_by_id`

**Get Inventory Count (by ID).** Reads current stock counts (quantity per location and state such as IN_STOCK) for up to 100 variation IDs, optionally limited to one location. A variation that was never counted returns no rows. Needs the INVENTORY_READ permission (reconnect older connections). Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `variation_ids` | array | yes |  | Variation IDs. Item variation IDs from Search Catalog Items. |
| `location_id` | string | no |  | Location ID. Leave empty for all locations. |
| `limit` | number | no | `100` | Limit. How many results to return (1-1000, default 100). |
| `cursor` | string | no |  | Cursor. Next Cursor from a previous run, to get the next page. Cursors expire after about 5 minutes. |

Output fields:

- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `items`: Inventory Counts
- `items[].variation_id`: Variation ID
- `items[].object_type`: Object Type
- `items[].location_id`: Location ID
- `items[].state`: State
- `items[].quantity`: Quantity
- `items[].calculated_at`: Calculated At (datetime)

### `adjust_inventory_by_id`

**Adjust Inventory (by ID).** Changes stock relative to the current count: RECEIVED adds the quantity to IN_STOCK, SOLD or WASTE removes it. Use Set Inventory Count (by ID) to set an absolute count after a stock take. Needs INVENTORY_WRITE (reconnect older connections). A retried step returns the same change instead of repeating the write, and identical calls within one run (for example a loop with the same input) count as one; set Idempotency Key (for example to the loop item) to keep them separate. A new run writes again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `variation_id` | string | yes |  | Variation ID. Item variation ID from Search Catalog Items. |
| `location_id` | string | yes |  | Location ID. From List Locations. |
| `reason` | string | yes | `"RECEIVED"` | Reason. One of `"RECEIVED"`, `"SOLD"`, `"WASTE"`. |
| `quantity` | string | yes |  | Quantity. Positive number of units, for example 5 or 1.5. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional, up to 45 characters. Leave empty: a retried step returns the same record, but identical calls in one run (such as a loop with the same input) count as one. Set a unique value, like the loop item, to keep them separate. |

Output fields:

- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `items`: Inventory Counts
- `items[].variation_id`: Variation ID
- `items[].object_type`: Object Type
- `items[].location_id`: Location ID
- `items[].state`: State
- `items[].quantity`: Quantity
- `items[].calculated_at`: Calculated At (datetime)

### `set_inventory_count_by_id`

**Set Inventory Count (by ID).** Records a physical count: sets the IN_STOCK quantity of one variation at one location to an absolute number (0 allowed). Use Adjust Inventory (by ID) for relative changes. Needs INVENTORY_WRITE (reconnect older connections). Setting the same count again is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `variation_id` | string | yes |  | Variation ID. Item variation ID from Search Catalog Items. |
| `location_id` | string | yes |  | Location ID. From List Locations. |
| `quantity` | string | yes |  | Quantity In Stock. The counted number of units, for example 12. |

Output fields:

- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `items`: Inventory Counts
- `items[].variation_id`: Variation ID
- `items[].object_type`: Object Type
- `items[].location_id`: Location ID
- `items[].state`: State
- `items[].quantity`: Quantity
- `items[].calculated_at`: Calculated At (datetime)

### `create_order_by_id`

**Create Order (by ID).** Creates an OPEN Square order (no payment taken). Each line item is either a catalog variation ID (from Search Catalog Items) with a quantity, or a custom name plus a decimal price like "12.50" in the location currency. Orders cannot be deleted, only canceled with Update Order State. A retried step returns the same order instead of repeating the write, and identical calls within one run (for example a loop with the same input) count as one; set Idempotency Key (for example to the loop item) to keep them separate. A new run writes again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location_id` | string | no |  | Location ID. Square location ID (from List Locations). Leave empty to use the main location. |
| `customer_id` | string | no |  | Customer ID. Optional, from Find Customers. |
| `line_items` | array | yes |  | Line Items. Each item: { `variation_id`?, `name`?, `price`?, `quantity`?, `note`? }. |
| `reference_id` | string | no |  | Reference ID. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional, up to 45 characters. Leave empty: a retried step returns the same record, but identical calls in one run (such as a loop with the same input) count as one. Set a unique value, like the loop item, to keep them separate. |

Output fields:

- `id`: Order ID
- `location_id`: Location ID
- `customer_id`: Customer ID
- `reference_id`: Reference ID
- `state`: State
- `version`: Version (number)
- `source_name`: Source
- `ticket_name`: Ticket Name
- `currency`: Currency
- `total`: Total
- `total_minor`: Total (Smallest Unit) (number)
- `total_tax`: Total Tax
- `total_discount`: Total Discount
- `total_tip`: Total Tip
- `total_service_charge`: Total Service Charge
- `net_amount_due`: Amount Due
- `payment_ids`: Payment IDs
- `fulfillment_states`: Fulfillment States
- `line_item_count`: Line Item Count (number)
- `line_items_truncated`: Line Items Truncated (boolean)
- `line_items`: Line Items
- `line_items[].uid`: Line Item UID
- `line_items[].name`: Name
- `line_items[].variation_name`: Variation Name
- `line_items[].catalog_object_id`: Variation ID
- `line_items[].quantity`: Quantity
- `line_items[].note`: Note
- `line_items[].base_price`: Unit Price
- `line_items[].total`: Total
- `line_items[].total_minor`: Total (Smallest Unit) (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)

### `search_orders_by_id`

**Search Orders (by ID).** Searches Square orders newest first and returns one page with totals and line items. Filter by up to 10 location IDs (empty = all active locations), states (OPEN, COMPLETED, CANCELED, DRAFT), customer IDs and a created-at range (ISO 8601). Use Next Cursor within about 5 minutes for more. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location_ids` | array | no |  | Location IDs. Up to 10. Leave empty for all active locations. |
| `states` | array | no |  | States. Leave empty for all states. One of `"OPEN"`, `"COMPLETED"`, `"CANCELED"`, `"DRAFT"`. |
| `customer_ids` | array | no |  | Customer IDs. |
| `created_after` | ISO date-time string | no |  | Created After. |
| `created_before` | ISO date-time string | no |  | Created Before. |
| `limit` | number | no | `50` | Limit. How many results to return (1-500, default 50). |
| `cursor` | string | no |  | Cursor. Next Cursor from a previous run, to get the next page. Cursors expire after about 5 minutes. |

Output fields:

- `count`: Count (This Page) (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `items`: Orders
- `items[].id`: Order ID
- `items[].location_id`: Location ID
- `items[].customer_id`: Customer ID
- `items[].reference_id`: Reference ID
- `items[].state`: State
- `items[].version`: Version (number)
- `items[].source_name`: Source
- `items[].ticket_name`: Ticket Name
- `items[].currency`: Currency
- `items[].total`: Total
- `items[].total_minor`: Total (Smallest Unit) (number)
- `items[].total_tax`: Total Tax
- `items[].total_discount`: Total Discount
- `items[].total_tip`: Total Tip
- `items[].total_service_charge`: Total Service Charge
- `items[].net_amount_due`: Amount Due
- `items[].payment_ids`: Payment IDs
- `items[].fulfillment_states`: Fulfillment States
- `items[].line_item_count`: Line Item Count (number)
- `items[].line_items_truncated`: Line Items Truncated (boolean)
- `items[].line_items`: Line Items
- `items[].line_items[].uid`: Line Item UID
- `items[].line_items[].name`: Name
- `items[].line_items[].variation_name`: Variation Name
- `items[].line_items[].catalog_object_id`: Variation ID
- `items[].line_items[].quantity`: Quantity
- `items[].line_items[].note`: Note
- `items[].line_items[].base_price`: Unit Price
- `items[].line_items[].total`: Total
- `items[].line_items[].total_minor`: Total (Smallest Unit) (number)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].closed_at`: Closed At (datetime)

### `create_payment_link_by_id`

**Create Payment Link (by ID).** Creates a Square quick-pay checkout link (URL) for one named item at a fixed decimal amount like "12.50", at a location ID (empty = main location). It only creates the link; nothing is sent to anyone and no money moves until a buyer pays. Needs PAYMENTS_WRITE (reconnect older connections). A retried step returns the same link instead of repeating the write, and identical calls within one run (for example a loop with the same input) count as one; set Idempotency Key (for example to the loop item) to keep them separate. A new run writes again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location_id` | string | no |  | Location ID. Square location ID (from List Locations). Leave empty to use the main location. |
| `name` | string | yes |  | Item Name. What the buyer pays for, shown on the checkout page. |
| `amount` | string | yes |  | Amount. For example 12.50. |
| `currency` | string | no |  | Currency. Leave empty to use the location currency. |
| `description` | string | no |  | Description. Internal description, not shown to the buyer. |
| `payment_note` | string | no |  | Payment Note. Added to the resulting payment. |
| `redirect_url` | string | no |  | Redirect URL. Where to send the buyer after paying. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional, up to 45 characters. Leave empty: a retried step returns the same record, but identical calls in one run (such as a loop with the same input) count as one. Set a unique value, like the loop item, to keep them separate. |

Output fields:

- `id`: Payment Link ID
- `version`: Version (number)
- `url`: Checkout URL (url)
- `long_url`: Long URL (url)
- `order_id`: Order ID
- `description`: Description
- `created_at`: Created At (datetime)

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

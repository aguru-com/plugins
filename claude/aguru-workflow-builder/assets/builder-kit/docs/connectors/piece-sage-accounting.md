# Sage Accounting

Cloud accounting for small businesses — manage contacts, sales invoices, purchase invoices, and payments.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sage-accounting'
  version: '0.0.1'
```

Categories: ACCOUNTING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> 1. In the [Sage Developer Portal](https://developer.sage.com/console/), create an app for the Sage Accounting API and copy the generated **Client ID** and **Client Secret** below.
> 2. Click **Connect**, then sign in with the Sage Accounting user you want this connection to act as, and select the business to connect.
>
> **Note:** All requests act on the user's lead business. If the connected user has access to more than one business, use a dedicated integration user scoped to the business you want to automate.

## Actions

### `create_customer`

**Create Customer.** Create a new customer contact in Sage Accounting. Use when you need to add a customer that does not already exist; for changing an existing customer use Update Contact instead. Each call creates a new customer, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Business Name. The customer's full name or business name, e.g. "Starluck". |
| `reference` | string | no |  | Reference. A unique reference for the contact, e.g. "CUST-002". |
| `notes` | string | no |  | Notes. |
| `creditLimit` | number | no |  | Credit Limit. |
| `creditDays` | number | no |  | Credit Term Days. Number of days before an invoice or bill is due. |
| `taxNumber` | string | no |  | Tax Number. The contact's VAT registration number. |
| `productSalesPriceType` | string | no |  | Product Sales Price Type. The price list this contact is charged from, e.g. "Trade" or "Wholesale". A value the product loads from the provider, such as an id; write the value itself. |
| `mainAddressName` | string | no |  | Main Address Name. |
| `mainAddressLine1` | string | no |  | Main Address Line 1. |
| `mainAddressLine2` | string | no |  | Main Address Line 2. |
| `mainAddressCity` | string | no |  | Main Address City. |
| `mainAddressRegion` | string | no |  | Main Address Region. |
| `mainAddressPostalCode` | string | no |  | Main Address Postal Code. |
| `mainAddressCountry` | string | no |  | Country. The country of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `mainAddressCountryGroup` | string | no |  | Country Group. The country group of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `deliveryAddressName` | string | no |  | Delivery Address Name. |
| `deliveryAddressLine1` | string | no |  | Delivery Address Line 1. |
| `deliveryAddressLine2` | string | no |  | Delivery Address Line 2. |
| `deliveryAddressCity` | string | no |  | Delivery City. |
| `deliveryAddressRegion` | string | no |  | Delivery Region. |
| `deliveryAddressPostalCode` | string | no |  | Delivery Postal Code. |
| `deliveryAddressCountry` | string | no |  | Country. The country of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `deliveryAddressCountryGroup` | string | no |  | Country Group. The country group of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `contactPersonName` | string | no |  | Main Contact Name. |
| `jobTitle` | string | no |  | Main Contact Job Title. |
| `email` | string | no |  | Main Contact Email. |
| `telephone` | string | no |  | Main Contact Telephone. |
| `mobile` | string | no |  | Main Contact Mobile. |
| `fax` | string | no |  | Main Contact Fax. |
| `bankAccountName` | string | no |  | Bank Account Name. |
| `bankAccountNumber` | string | no |  | Bank Account Number. |
| `bankSortCode` | string | no |  | Bank Account Sort Code. |
| `bankBic` | string | no |  | Bank Account BIC. |
| `bankIban` | string | no |  | Bank Account IBAN. |
| `defaultLedgerAccount` | string | no |  | Default Sales Ledger Account. The default ledger account sales to this contact are posted to. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Contact ID
- `name`: Name
- `reference`: Reference
- `contact_types`: Contact Types
- `contact_types[].id`: ID
- `contact_types[].displayed_as`: Name
- `email`: Email (email)
- `credit_limit`: Credit Limit (currency)
- `credit_days`: Credit Term Days (number)
- `is_active`: Active (boolean)
- `main_address`: Main Address
- `main_address.name`: Address Name
- `main_address.address_line_1`: Address Line 1
- `main_address.address_line_2`: Address Line 2
- `main_address.city`: City
- `main_address.region`: Region
- `main_address.postal_code`: Postal Code
- `main_address.country`: Country
- `main_address.country.id`: ID
- `main_address.country.displayed_as`: Name
- `main_address.country_group`: Country Group
- `main_address.country_group.id`: ID
- `main_address.country_group.displayed_as`: Name
- `delivery_address`: Delivery Address
- `delivery_address.name`: Address Name
- `delivery_address.address_line_1`: Address Line 1
- `delivery_address.address_line_2`: Address Line 2
- `delivery_address.city`: City
- `delivery_address.region`: Region
- `delivery_address.postal_code`: Postal Code
- `delivery_address.country`: Country
- `delivery_address.country.id`: ID
- `delivery_address.country.displayed_as`: Name
- `delivery_address.country_group`: Country Group
- `delivery_address.country_group.id`: ID
- `delivery_address.country_group.displayed_as`: Name
- `main_contact_person`: Main Contact Person
- `main_contact_person.name`: Name
- `main_contact_person.job_title`: Job Title
- `main_contact_person.email`: Email (email)
- `main_contact_person.telephone`: Telephone
- `main_contact_person.mobile`: Mobile
- `main_contact_person.fax`: Fax
- `bank_account_details`: Bank Account Details
- `bank_account_details.account_name`: Account Name
- `bank_account_details.account_number`: Account Number
- `bank_account_details.sort_code`: Sort Code
- `bank_account_details.bic`: BIC
- `bank_account_details.iban`: IBAN
- `product_sales_price_type`: Product Sales Price Type
- `product_sales_price_type.id`: ID
- `product_sales_price_type.displayed_as`: Name
- `currency`: Currency
- `currency.id`: ID
- `currency.displayed_as`: Name
- `default_sales_ledger_account`: Default Ledger Account
- `default_sales_ledger_account.id`: ID
- `default_sales_ledger_account.displayed_as`: Name

### `create_vendor`

**Create Vendor.** Create a new vendor contact in Sage Accounting. Use when you need to add a vendor that does not already exist; for changing an existing vendor use Update Contact instead. Each call creates a new vendor, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Business Name. The vendor's full name or business name, e.g. "Acme Supplies". |
| `reference` | string | no |  | Reference. A unique reference for the contact, e.g. "CUST-002". |
| `notes` | string | no |  | Notes. |
| `creditLimit` | number | no |  | Credit Limit. |
| `creditDays` | number | no |  | Credit Term Days. Number of days before an invoice or bill is due. |
| `taxNumber` | string | no |  | Tax Number. The contact's VAT registration number. |
| `productSalesPriceType` | string | no |  | Product Sales Price Type. The price list this contact is charged from, e.g. "Trade" or "Wholesale". A value the product loads from the provider, such as an id; write the value itself. |
| `mainAddressName` | string | no |  | Main Address Name. |
| `mainAddressLine1` | string | no |  | Main Address Line 1. |
| `mainAddressLine2` | string | no |  | Main Address Line 2. |
| `mainAddressCity` | string | no |  | Main Address City. |
| `mainAddressRegion` | string | no |  | Main Address Region. |
| `mainAddressPostalCode` | string | no |  | Main Address Postal Code. |
| `mainAddressCountry` | string | no |  | Country. The country of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `mainAddressCountryGroup` | string | no |  | Country Group. The country group of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `deliveryAddressName` | string | no |  | Delivery Address Name. |
| `deliveryAddressLine1` | string | no |  | Delivery Address Line 1. |
| `deliveryAddressLine2` | string | no |  | Delivery Address Line 2. |
| `deliveryAddressCity` | string | no |  | Delivery City. |
| `deliveryAddressRegion` | string | no |  | Delivery Region. |
| `deliveryAddressPostalCode` | string | no |  | Delivery Postal Code. |
| `deliveryAddressCountry` | string | no |  | Country. The country of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `deliveryAddressCountryGroup` | string | no |  | Country Group. The country group of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `contactPersonName` | string | no |  | Main Contact Name. |
| `jobTitle` | string | no |  | Main Contact Job Title. |
| `email` | string | no |  | Main Contact Email. |
| `telephone` | string | no |  | Main Contact Telephone. |
| `mobile` | string | no |  | Main Contact Mobile. |
| `fax` | string | no |  | Main Contact Fax. |
| `bankAccountName` | string | no |  | Bank Account Name. |
| `bankAccountNumber` | string | no |  | Bank Account Number. |
| `bankSortCode` | string | no |  | Bank Account Sort Code. |
| `bankBic` | string | no |  | Bank Account BIC. |
| `bankIban` | string | no |  | Bank Account IBAN. |
| `defaultLedgerAccount` | string | no |  | Default Purchase Ledger Account. The default ledger account purchases from this contact are posted to. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Contact ID
- `name`: Name
- `reference`: Reference
- `contact_types`: Contact Types
- `contact_types[].id`: ID
- `contact_types[].displayed_as`: Name
- `email`: Email (email)
- `credit_limit`: Credit Limit (currency)
- `credit_days`: Credit Term Days (number)
- `is_active`: Active (boolean)
- `main_address`: Main Address
- `main_address.name`: Address Name
- `main_address.address_line_1`: Address Line 1
- `main_address.address_line_2`: Address Line 2
- `main_address.city`: City
- `main_address.region`: Region
- `main_address.postal_code`: Postal Code
- `main_address.country`: Country
- `main_address.country.id`: ID
- `main_address.country.displayed_as`: Name
- `main_address.country_group`: Country Group
- `main_address.country_group.id`: ID
- `main_address.country_group.displayed_as`: Name
- `delivery_address`: Delivery Address
- `delivery_address.name`: Address Name
- `delivery_address.address_line_1`: Address Line 1
- `delivery_address.address_line_2`: Address Line 2
- `delivery_address.city`: City
- `delivery_address.region`: Region
- `delivery_address.postal_code`: Postal Code
- `delivery_address.country`: Country
- `delivery_address.country.id`: ID
- `delivery_address.country.displayed_as`: Name
- `delivery_address.country_group`: Country Group
- `delivery_address.country_group.id`: ID
- `delivery_address.country_group.displayed_as`: Name
- `main_contact_person`: Main Contact Person
- `main_contact_person.name`: Name
- `main_contact_person.job_title`: Job Title
- `main_contact_person.email`: Email (email)
- `main_contact_person.telephone`: Telephone
- `main_contact_person.mobile`: Mobile
- `main_contact_person.fax`: Fax
- `bank_account_details`: Bank Account Details
- `bank_account_details.account_name`: Account Name
- `bank_account_details.account_number`: Account Number
- `bank_account_details.sort_code`: Sort Code
- `bank_account_details.bic`: BIC
- `bank_account_details.iban`: IBAN
- `product_sales_price_type`: Product Sales Price Type
- `product_sales_price_type.id`: ID
- `product_sales_price_type.displayed_as`: Name
- `currency`: Currency
- `currency.id`: ID
- `currency.displayed_as`: Name
- `default_purchase_ledger_account`: Default Ledger Account
- `default_purchase_ledger_account.id`: ID
- `default_purchase_ledger_account.displayed_as`: Name

### `update_contact`

**Update Contact.** Update fields on an existing Sage Accounting contact (customer or vendor), identified by its ID. Only the fields you provide are changed. Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | string | yes |  | Contact. The contact to update. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `defaultSalesLedgerAccount` | string | no |  | Default Sales Ledger Account. The default ledger account sales to this contact are posted to. A value the product loads from the provider, such as an id; write the value itself. |
| `defaultPurchaseLedgerAccount` | string | no |  | Default Purchase Ledger Account. The default ledger account purchases from this contact are posted to. A value the product loads from the provider, such as an id; write the value itself. |
| `reference` | string | no |  | Reference. A unique reference for the contact, e.g. "CUST-002". |
| `notes` | string | no |  | Notes. |
| `creditLimit` | number | no |  | Credit Limit. |
| `creditDays` | number | no |  | Credit Term Days. Number of days before an invoice or bill is due. |
| `taxNumber` | string | no |  | Tax Number. The contact's VAT registration number. |
| `productSalesPriceType` | string | no |  | Product Sales Price Type. The price list this contact is charged from, e.g. "Trade" or "Wholesale". A value the product loads from the provider, such as an id; write the value itself. |
| `mainAddressName` | string | no |  | Main Address Name. |
| `mainAddressLine1` | string | no |  | Main Address Line 1. |
| `mainAddressLine2` | string | no |  | Main Address Line 2. |
| `mainAddressCity` | string | no |  | Main Address City. |
| `mainAddressRegion` | string | no |  | Main Address Region. |
| `mainAddressPostalCode` | string | no |  | Main Address Postal Code. |
| `mainAddressCountry` | string | no |  | Country. The country of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `mainAddressCountryGroup` | string | no |  | Country Group. The country group of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `deliveryAddressName` | string | no |  | Delivery Address Name. |
| `deliveryAddressLine1` | string | no |  | Delivery Address Line 1. |
| `deliveryAddressLine2` | string | no |  | Delivery Address Line 2. |
| `deliveryAddressCity` | string | no |  | Delivery City. |
| `deliveryAddressRegion` | string | no |  | Delivery Region. |
| `deliveryAddressPostalCode` | string | no |  | Delivery Postal Code. |
| `deliveryAddressCountry` | string | no |  | Country. The country of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `deliveryAddressCountryGroup` | string | no |  | Country Group. The country group of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `contactPersonName` | string | no |  | Main Contact Name. |
| `jobTitle` | string | no |  | Main Contact Job Title. |
| `email` | string | no |  | Main Contact Email. |
| `telephone` | string | no |  | Main Contact Telephone. |
| `mobile` | string | no |  | Main Contact Mobile. |
| `fax` | string | no |  | Main Contact Fax. |
| `bankAccountName` | string | no |  | Bank Account Name. |
| `bankAccountNumber` | string | no |  | Bank Account Number. |
| `bankSortCode` | string | no |  | Bank Account Sort Code. |
| `bankBic` | string | no |  | Bank Account BIC. |
| `bankIban` | string | no |  | Bank Account IBAN. |

Output fields:

- `id`: Contact ID
- `name`: Name
- `reference`: Reference
- `contact_types`: Contact Types
- `contact_types[].id`: ID
- `contact_types[].displayed_as`: Name
- `email`: Email (email)
- `credit_limit`: Credit Limit (currency)
- `credit_days`: Credit Term Days (number)
- `is_active`: Active (boolean)
- `main_address`: Main Address
- `main_address.name`: Address Name
- `main_address.address_line_1`: Address Line 1
- `main_address.address_line_2`: Address Line 2
- `main_address.city`: City
- `main_address.region`: Region
- `main_address.postal_code`: Postal Code
- `main_address.country`: Country
- `main_address.country.id`: ID
- `main_address.country.displayed_as`: Name
- `main_address.country_group`: Country Group
- `main_address.country_group.id`: ID
- `main_address.country_group.displayed_as`: Name
- `delivery_address`: Delivery Address
- `delivery_address.name`: Address Name
- `delivery_address.address_line_1`: Address Line 1
- `delivery_address.address_line_2`: Address Line 2
- `delivery_address.city`: City
- `delivery_address.region`: Region
- `delivery_address.postal_code`: Postal Code
- `delivery_address.country`: Country
- `delivery_address.country.id`: ID
- `delivery_address.country.displayed_as`: Name
- `delivery_address.country_group`: Country Group
- `delivery_address.country_group.id`: ID
- `delivery_address.country_group.displayed_as`: Name
- `main_contact_person`: Main Contact Person
- `main_contact_person.name`: Name
- `main_contact_person.job_title`: Job Title
- `main_contact_person.email`: Email (email)
- `main_contact_person.telephone`: Telephone
- `main_contact_person.mobile`: Mobile
- `main_contact_person.fax`: Fax
- `bank_account_details`: Bank Account Details
- `bank_account_details.account_name`: Account Name
- `bank_account_details.account_number`: Account Number
- `bank_account_details.sort_code`: Sort Code
- `bank_account_details.bic`: BIC
- `bank_account_details.iban`: IBAN
- `product_sales_price_type`: Product Sales Price Type
- `product_sales_price_type.id`: ID
- `product_sales_price_type.displayed_as`: Name
- `currency`: Currency
- `currency.id`: ID
- `currency.displayed_as`: Name
- `default_sales_ledger_account`: Default Sales Ledger Account
- `default_sales_ledger_account.id`: ID
- `default_sales_ledger_account.displayed_as`: Name
- `default_purchase_ledger_account`: Default Purchase Ledger Account
- `default_purchase_ledger_account.id`: ID
- `default_purchase_ledger_account.displayed_as`: Name

### `find_contact`

**Find Contact.** Search Sage Accounting contacts (customers and vendors) by name or reference (partial match). Returns zero or more matches. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Name or Reference contains. Filter by contact name or reference, e.g. "Acme". |
| `maxResults` | number | no | `10` | Max results. |

Output fields:

- `[].id`: Contact ID
- `[].name`: Name
- `[].reference`: Reference
- `[].contact_types`: Contact Types
- `[].contact_types[].id`: ID
- `[].contact_types[].displayed_as`: Name
- `[].email`: Email (email)
- `[].credit_limit`: Credit Limit (currency)
- `[].credit_days`: Credit Term Days (number)
- `[].is_active`: Active (boolean)
- `[].main_address`: Main Address
- `[].main_address.name`: Address Name
- `[].main_address.address_line_1`: Address Line 1
- `[].main_address.address_line_2`: Address Line 2
- `[].main_address.city`: City
- `[].main_address.region`: Region
- `[].main_address.postal_code`: Postal Code
- `[].main_address.country`: Country
- `[].main_address.country.id`: ID
- `[].main_address.country.displayed_as`: Name
- `[].main_address.country_group`: Country Group
- `[].main_address.country_group.id`: ID
- `[].main_address.country_group.displayed_as`: Name
- `[].delivery_address`: Delivery Address
- `[].delivery_address.name`: Address Name
- `[].delivery_address.address_line_1`: Address Line 1
- `[].delivery_address.address_line_2`: Address Line 2
- `[].delivery_address.city`: City
- `[].delivery_address.region`: Region
- `[].delivery_address.postal_code`: Postal Code
- `[].delivery_address.country`: Country
- `[].delivery_address.country.id`: ID
- `[].delivery_address.country.displayed_as`: Name
- `[].delivery_address.country_group`: Country Group
- `[].delivery_address.country_group.id`: ID
- `[].delivery_address.country_group.displayed_as`: Name
- `[].main_contact_person`: Main Contact Person
- `[].main_contact_person.name`: Name
- `[].main_contact_person.job_title`: Job Title
- `[].main_contact_person.email`: Email (email)
- `[].main_contact_person.telephone`: Telephone
- `[].main_contact_person.mobile`: Mobile
- `[].main_contact_person.fax`: Fax
- `[].bank_account_details`: Bank Account Details
- `[].bank_account_details.account_name`: Account Name
- `[].bank_account_details.account_number`: Account Number
- `[].bank_account_details.sort_code`: Sort Code
- `[].bank_account_details.bic`: BIC
- `[].bank_account_details.iban`: IBAN
- `[].product_sales_price_type`: Product Sales Price Type
- `[].product_sales_price_type.id`: ID
- `[].product_sales_price_type.displayed_as`: Name
- `[].currency`: Currency
- `[].currency.id`: ID
- `[].currency.displayed_as`: Name
- `[].default_sales_ledger_account`: Default Sales Ledger Account
- `[].default_sales_ledger_account.id`: ID
- `[].default_sales_ledger_account.displayed_as`: Name
- `[].default_purchase_ledger_account`: Default Purchase Ledger Account
- `[].default_purchase_ledger_account.id`: ID
- `[].default_purchase_ledger_account.displayed_as`: Name

### `find_vendor`

**Find Vendor.** Search Sage Accounting vendor contacts by name or reference (partial match). Returns zero or more matches. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Name or Reference contains. Filter by vendor name or reference, e.g. "Acme". |
| `maxResults` | number | no | `10` | Max results. |

Output fields:

- `[].id`: Contact ID
- `[].name`: Name
- `[].reference`: Reference
- `[].contact_types`: Contact Types
- `[].contact_types[].id`: ID
- `[].contact_types[].displayed_as`: Name
- `[].email`: Email (email)
- `[].credit_limit`: Credit Limit (currency)
- `[].credit_days`: Credit Term Days (number)
- `[].is_active`: Active (boolean)
- `[].main_address`: Main Address
- `[].main_address.name`: Address Name
- `[].main_address.address_line_1`: Address Line 1
- `[].main_address.address_line_2`: Address Line 2
- `[].main_address.city`: City
- `[].main_address.region`: Region
- `[].main_address.postal_code`: Postal Code
- `[].main_address.country`: Country
- `[].main_address.country.id`: ID
- `[].main_address.country.displayed_as`: Name
- `[].main_address.country_group`: Country Group
- `[].main_address.country_group.id`: ID
- `[].main_address.country_group.displayed_as`: Name
- `[].delivery_address`: Delivery Address
- `[].delivery_address.name`: Address Name
- `[].delivery_address.address_line_1`: Address Line 1
- `[].delivery_address.address_line_2`: Address Line 2
- `[].delivery_address.city`: City
- `[].delivery_address.region`: Region
- `[].delivery_address.postal_code`: Postal Code
- `[].delivery_address.country`: Country
- `[].delivery_address.country.id`: ID
- `[].delivery_address.country.displayed_as`: Name
- `[].delivery_address.country_group`: Country Group
- `[].delivery_address.country_group.id`: ID
- `[].delivery_address.country_group.displayed_as`: Name
- `[].main_contact_person`: Main Contact Person
- `[].main_contact_person.name`: Name
- `[].main_contact_person.job_title`: Job Title
- `[].main_contact_person.email`: Email (email)
- `[].main_contact_person.telephone`: Telephone
- `[].main_contact_person.mobile`: Mobile
- `[].main_contact_person.fax`: Fax
- `[].bank_account_details`: Bank Account Details
- `[].bank_account_details.account_name`: Account Name
- `[].bank_account_details.account_number`: Account Number
- `[].bank_account_details.sort_code`: Sort Code
- `[].bank_account_details.bic`: BIC
- `[].bank_account_details.iban`: IBAN
- `[].product_sales_price_type`: Product Sales Price Type
- `[].product_sales_price_type.id`: ID
- `[].product_sales_price_type.displayed_as`: Name
- `[].currency`: Currency
- `[].currency.id`: ID
- `[].currency.displayed_as`: Name
- `[].default_sales_ledger_account`: Default Sales Ledger Account
- `[].default_sales_ledger_account.id`: ID
- `[].default_sales_ledger_account.displayed_as`: Name
- `[].default_purchase_ledger_account`: Default Purchase Ledger Account
- `[].default_purchase_ledger_account.id`: ID
- `[].default_purchase_ledger_account.displayed_as`: Name

### `create_sales_invoice`

**Create Sales Invoice.** Create a new sales invoice billed to a customer, with one or more ledger account lines. Each call creates a new invoice, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | yes |  | Customer. The customer this invoice is billed to. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | ISO date-time string | yes |  | Invoice Date. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `reference` | string | no |  | Reference. |
| `notes` | string | no |  | Notes. |
| `mainAddressLine1` | string | no |  | Main Address Line 1. |
| `mainAddressLine2` | string | no |  | Main Address Line 2. |
| `mainAddressCity` | string | no |  | Main Address City. |
| `mainAddressPostalCode` | string | no |  | Main Address Postal Code or Zipcode. |
| `mainAddressCountry` | string | no |  | Country. The country of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `mainAddressRegion` | string | no |  | Main Address Region. |
| `mainAddressType` | string | no |  | Address Type. The type of this address, e.g. "Billing" or "Delivery". A value the product loads from the provider, such as an id; write the value itself. |
| `deliveryAddressLine1` | string | no |  | Delivery Address Line 1. |
| `deliveryAddressLine2` | string | no |  | Delivery Address Line 2. |
| `deliveryAddressCity` | string | no |  | Delivery Address City. |
| `deliveryAddressPostalCode` | string | no |  | Delivery Address Postal Code or Zipcode. |
| `deliveryAddressCountry` | string | no |  | Country. The country of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `deliveryAddressRegion` | string | no |  | Delivery Address Region. |
| `deliveryAddressType` | string | no |  | Address Type. The type of this address, e.g. "Billing" or "Delivery". A value the product loads from the provider, such as an id; write the value itself. |
| `lines` | array | yes |  | Line Items. Each item: { `ledgerAccountId`, `description`, `quantity`, `unitPrice`, `productId`?, `taxRateId`?, `taxAmount`?, `discountAmount`?, `euGoodsServicesTypeId`?, `euSalesDescriptionId`? }. |

Output fields:

- `id`: Sales Invoice ID
- `reference`: Reference
- `notes`: Notes
- `date`: Date (date)
- `due_date`: Due Date (date)
- `contact`: Customer
- `contact.id`: ID
- `contact.displayed_as`: Name
- `main_address`: Main Address
- `main_address.address_line_1`: Address Line 1
- `main_address.address_line_2`: Address Line 2
- `main_address.city`: City
- `main_address.postal_code`: Postal Code
- `main_address.region`: Region
- `main_address.country`: Country
- `main_address.country.id`: ID
- `main_address.country.displayed_as`: Name
- `main_address.country_group`: Country Group
- `main_address.country_group.id`: ID
- `main_address.country_group.displayed_as`: Name
- `main_address.address_type`: Address Type
- `main_address.address_type.id`: ID
- `main_address.address_type.displayed_as`: Name
- `delivery_address`: Delivery Address
- `delivery_address.address_line_1`: Address Line 1
- `delivery_address.address_line_2`: Address Line 2
- `delivery_address.city`: City
- `delivery_address.postal_code`: Postal Code
- `delivery_address.region`: Region
- `delivery_address.country`: Country
- `delivery_address.country.id`: ID
- `delivery_address.country.displayed_as`: Name
- `delivery_address.country_group`: Country Group
- `delivery_address.country_group.id`: ID
- `delivery_address.country_group.displayed_as`: Name
- `delivery_address.address_type`: Address Type
- `delivery_address.address_type.id`: ID
- `delivery_address.address_type.displayed_as`: Name
- `net_amount`: Net Amount (currency)
- `tax_amount`: Tax Amount (currency)
- `total_amount`: Total Amount (currency)
- `outstanding_amount`: Outstanding Amount (currency)
- `status`: Status
- `status.id`: ID
- `status.displayed_as`: Name
- `currency`: Currency
- `currency.id`: ID
- `currency.displayed_as`: Name
- `invoice_lines`: Invoice Lines
- `invoice_lines[].id`: Line ID
- `invoice_lines[].description`: Description
- `invoice_lines[].product`: Product
- `invoice_lines[].product.id`: ID
- `invoice_lines[].product.displayed_as`: Name
- `invoice_lines[].ledger_account`: Ledger Account
- `invoice_lines[].ledger_account.id`: ID
- `invoice_lines[].ledger_account.displayed_as`: Name
- `invoice_lines[].quantity`: Quantity (number)
- `invoice_lines[].unit_price`: Unit Price (currency)
- `invoice_lines[].tax_rate`: Tax Rate
- `invoice_lines[].tax_rate.id`: ID
- `invoice_lines[].tax_rate.displayed_as`: Name
- `invoice_lines[].net_amount`: Net Amount (currency)
- `invoice_lines[].tax_amount`: Tax Amount (currency)
- `invoice_lines[].discount_amount`: Discount Amount (currency)
- `invoice_lines[].total_amount`: Total Amount (currency)
- `invoice_lines[].eu_goods_services_type`: EU Goods or Services Type
- `invoice_lines[].eu_goods_services_type.id`: ID
- `invoice_lines[].eu_goods_services_type.displayed_as`: Name

### `update_sales_invoice`

**Update Sales Invoice.** Update fields on an existing Sage Accounting sales invoice, identified by its ID. Only the fields you provide are changed. Providing line items replaces the entire line list. Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice` | string | yes |  | Sales Invoice. The sales invoice to update. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | ISO date-time string | no |  | Invoice Date. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `reference` | string | no |  | Reference. |
| `notes` | string | no |  | Notes. |
| `mainAddressLine1` | string | no |  | Main Address Line 1. |
| `mainAddressLine2` | string | no |  | Main Address Line 2. |
| `mainAddressCity` | string | no |  | Main Address City. |
| `mainAddressPostalCode` | string | no |  | Main Address Postal Code or Zipcode. |
| `mainAddressCountry` | string | no |  | Country. The country of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `mainAddressRegion` | string | no |  | Main Address Region. |
| `mainAddressType` | string | no |  | Address Type. The type of this address, e.g. "Billing" or "Delivery". A value the product loads from the provider, such as an id; write the value itself. |
| `deliveryAddressLine1` | string | no |  | Delivery Address Line 1. |
| `deliveryAddressLine2` | string | no |  | Delivery Address Line 2. |
| `deliveryAddressCity` | string | no |  | Delivery Address City. |
| `deliveryAddressPostalCode` | string | no |  | Delivery Address Postal Code or Zipcode. |
| `deliveryAddressCountry` | string | no |  | Country. The country of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `deliveryAddressRegion` | string | no |  | Delivery Address Region. |
| `deliveryAddressType` | string | no |  | Address Type. The type of this address, e.g. "Billing" or "Delivery". A value the product loads from the provider, such as an id; write the value itself. |
| `lines` | array | no |  | Line Items. Replaces the entire invoice line list. Leave blank to keep the existing lines. Each item: { `ledgerAccountId`, `description`, `quantity`, `unitPrice`, `productId`?, `taxRateId`?, `taxAmount`?, `discountAmount`?, `euGoodsServicesTypeId`?, `euSalesDescriptionId`? }. |

Output fields:

- `id`: Sales Invoice ID
- `reference`: Reference
- `notes`: Notes
- `date`: Date (date)
- `due_date`: Due Date (date)
- `contact`: Customer
- `contact.id`: ID
- `contact.displayed_as`: Name
- `main_address`: Main Address
- `main_address.address_line_1`: Address Line 1
- `main_address.address_line_2`: Address Line 2
- `main_address.city`: City
- `main_address.postal_code`: Postal Code
- `main_address.region`: Region
- `main_address.country`: Country
- `main_address.country.id`: ID
- `main_address.country.displayed_as`: Name
- `main_address.country_group`: Country Group
- `main_address.country_group.id`: ID
- `main_address.country_group.displayed_as`: Name
- `main_address.address_type`: Address Type
- `main_address.address_type.id`: ID
- `main_address.address_type.displayed_as`: Name
- `delivery_address`: Delivery Address
- `delivery_address.address_line_1`: Address Line 1
- `delivery_address.address_line_2`: Address Line 2
- `delivery_address.city`: City
- `delivery_address.postal_code`: Postal Code
- `delivery_address.region`: Region
- `delivery_address.country`: Country
- `delivery_address.country.id`: ID
- `delivery_address.country.displayed_as`: Name
- `delivery_address.country_group`: Country Group
- `delivery_address.country_group.id`: ID
- `delivery_address.country_group.displayed_as`: Name
- `delivery_address.address_type`: Address Type
- `delivery_address.address_type.id`: ID
- `delivery_address.address_type.displayed_as`: Name
- `net_amount`: Net Amount (currency)
- `tax_amount`: Tax Amount (currency)
- `total_amount`: Total Amount (currency)
- `outstanding_amount`: Outstanding Amount (currency)
- `status`: Status
- `status.id`: ID
- `status.displayed_as`: Name
- `currency`: Currency
- `currency.id`: ID
- `currency.displayed_as`: Name
- `invoice_lines`: Invoice Lines
- `invoice_lines[].id`: Line ID
- `invoice_lines[].description`: Description
- `invoice_lines[].product`: Product
- `invoice_lines[].product.id`: ID
- `invoice_lines[].product.displayed_as`: Name
- `invoice_lines[].ledger_account`: Ledger Account
- `invoice_lines[].ledger_account.id`: ID
- `invoice_lines[].ledger_account.displayed_as`: Name
- `invoice_lines[].quantity`: Quantity (number)
- `invoice_lines[].unit_price`: Unit Price (currency)
- `invoice_lines[].tax_rate`: Tax Rate
- `invoice_lines[].tax_rate.id`: ID
- `invoice_lines[].tax_rate.displayed_as`: Name
- `invoice_lines[].net_amount`: Net Amount (currency)
- `invoice_lines[].tax_amount`: Tax Amount (currency)
- `invoice_lines[].discount_amount`: Discount Amount (currency)
- `invoice_lines[].total_amount`: Total Amount (currency)
- `invoice_lines[].eu_goods_services_type`: EU Goods or Services Type
- `invoice_lines[].eu_goods_services_type.id`: ID
- `invoice_lines[].eu_goods_services_type.displayed_as`: Name

### `find_sales_invoice`

**Find Sales Invoice.** Search Sage Accounting sales invoices by customer, invoice number (partial match), status, or invoice date range. Returns zero or more matches. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | no |  | Customer. Only return invoices billed to this customer. A value the product loads from the provider, such as an id; write the value itself. |
| `search` | string | no |  | Invoice Number contains. |
| `status` | string | no |  | Status. Only return invoices with this status, e.g. "Paid" or "Overdue". A value the product loads from the provider, such as an id; write the value itself. |
| `dateRange` | object | no |  | Invoice Date. Only return invoices dated within this range. |
| `updatedOrCreatedSince` | ISO date-time string | no |  | Updated or Created Since. Only return invoices changed since this date/time. |
| `maxResults` | number | no | `10` | Max results. |

Output fields:

- `[].id`: Sales Invoice ID
- `[].reference`: Reference
- `[].notes`: Notes
- `[].date`: Date (date)
- `[].due_date`: Due Date (date)
- `[].contact`: Customer
- `[].contact.id`: ID
- `[].contact.displayed_as`: Name
- `[].main_address`: Main Address
- `[].main_address.address_line_1`: Address Line 1
- `[].main_address.address_line_2`: Address Line 2
- `[].main_address.city`: City
- `[].main_address.postal_code`: Postal Code
- `[].main_address.region`: Region
- `[].main_address.country`: Country
- `[].main_address.country.id`: ID
- `[].main_address.country.displayed_as`: Name
- `[].main_address.country_group`: Country Group
- `[].main_address.country_group.id`: ID
- `[].main_address.country_group.displayed_as`: Name
- `[].main_address.address_type`: Address Type
- `[].main_address.address_type.id`: ID
- `[].main_address.address_type.displayed_as`: Name
- `[].delivery_address`: Delivery Address
- `[].delivery_address.address_line_1`: Address Line 1
- `[].delivery_address.address_line_2`: Address Line 2
- `[].delivery_address.city`: City
- `[].delivery_address.postal_code`: Postal Code
- `[].delivery_address.region`: Region
- `[].delivery_address.country`: Country
- `[].delivery_address.country.id`: ID
- `[].delivery_address.country.displayed_as`: Name
- `[].delivery_address.country_group`: Country Group
- `[].delivery_address.country_group.id`: ID
- `[].delivery_address.country_group.displayed_as`: Name
- `[].delivery_address.address_type`: Address Type
- `[].delivery_address.address_type.id`: ID
- `[].delivery_address.address_type.displayed_as`: Name
- `[].net_amount`: Net Amount (currency)
- `[].tax_amount`: Tax Amount (currency)
- `[].total_amount`: Total Amount (currency)
- `[].outstanding_amount`: Outstanding Amount (currency)
- `[].status`: Status
- `[].status.id`: ID
- `[].status.displayed_as`: Name
- `[].currency`: Currency
- `[].currency.id`: ID
- `[].currency.displayed_as`: Name
- `[].invoice_lines`: Invoice Lines
- `[].invoice_lines[].id`: Line ID
- `[].invoice_lines[].description`: Description
- `[].invoice_lines[].product`: Product
- `[].invoice_lines[].product.id`: ID
- `[].invoice_lines[].product.displayed_as`: Name
- `[].invoice_lines[].ledger_account`: Ledger Account
- `[].invoice_lines[].ledger_account.id`: ID
- `[].invoice_lines[].ledger_account.displayed_as`: Name
- `[].invoice_lines[].quantity`: Quantity (number)
- `[].invoice_lines[].unit_price`: Unit Price (currency)
- `[].invoice_lines[].tax_rate`: Tax Rate
- `[].invoice_lines[].tax_rate.id`: ID
- `[].invoice_lines[].tax_rate.displayed_as`: Name
- `[].invoice_lines[].net_amount`: Net Amount (currency)
- `[].invoice_lines[].tax_amount`: Tax Amount (currency)
- `[].invoice_lines[].discount_amount`: Discount Amount (currency)
- `[].invoice_lines[].total_amount`: Total Amount (currency)
- `[].invoice_lines[].eu_goods_services_type`: EU Goods or Services Type
- `[].invoice_lines[].eu_goods_services_type.id`: ID
- `[].invoice_lines[].eu_goods_services_type.displayed_as`: Name

### `create_purchase_invoice`

**Create Purchase Invoice.** Create a new purchase invoice owed to a vendor, with one or more ledger account lines. Each call creates a new invoice, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vendor` | string | yes |  | Vendor. The vendor this invoice is owed to. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | ISO date-time string | yes |  | Invoice Date. |
| `dueDate` | ISO date-time string | yes |  | Due Date. |
| `reference` | string | no |  | Reference. |
| `vendorReference` | string | no |  | Vendor Reference. |
| `notes` | string | no |  | Notes. |
| `lines` | array | yes |  | Line Items. Each item: { `ledgerAccountId`, `description`, `quantity`, `unitPrice`, `productId`?, `taxRateId`?, `taxAmount`?, `euGoodsServicesTypeId`? }. |

Output fields:

- `id`: Purchase Invoice ID
- `reference`: Reference
- `vendor_reference`: Vendor Reference
- `notes`: Notes
- `date`: Date (date)
- `due_date`: Due Date (date)
- `contact`: Vendor
- `contact.id`: ID
- `contact.displayed_as`: Name
- `net_amount`: Net Amount (currency)
- `tax_amount`: Tax Amount (currency)
- `total_amount`: Total Amount (currency)
- `outstanding_amount`: Outstanding Amount (currency)
- `status`: Status
- `status.id`: ID
- `status.displayed_as`: Name
- `currency`: Currency
- `currency.id`: ID
- `currency.displayed_as`: Name
- `invoice_lines`: Invoice Lines
- `invoice_lines[].id`: Line ID
- `invoice_lines[].description`: Description
- `invoice_lines[].product`: Product
- `invoice_lines[].product.id`: ID
- `invoice_lines[].product.displayed_as`: Name
- `invoice_lines[].ledger_account`: Ledger Account
- `invoice_lines[].ledger_account.id`: ID
- `invoice_lines[].ledger_account.displayed_as`: Name
- `invoice_lines[].quantity`: Quantity (number)
- `invoice_lines[].unit_price`: Unit Price (currency)
- `invoice_lines[].tax_rate`: Tax Rate
- `invoice_lines[].tax_rate.id`: ID
- `invoice_lines[].tax_rate.displayed_as`: Name
- `invoice_lines[].net_amount`: Net Amount (currency)
- `invoice_lines[].tax_amount`: Tax Amount (currency)
- `invoice_lines[].total_amount`: Total Amount (currency)
- `invoice_lines[].eu_goods_services_type`: EU Goods or Services Type
- `invoice_lines[].eu_goods_services_type.id`: ID
- `invoice_lines[].eu_goods_services_type.displayed_as`: Name

### `update_purchase_invoice`

**Update Purchase Invoice.** Update fields on an existing Sage Accounting purchase invoice, identified by its ID. Only the fields you provide are changed. Providing line items replaces the entire line list. Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice` | string | yes |  | Purchase Invoice. The purchase invoice to update. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | ISO date-time string | no |  | Invoice Date. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `reference` | string | no |  | Reference. |
| `vendorReference` | string | no |  | Vendor Reference. |
| `notes` | string | no |  | Notes. |
| `lines` | array | no |  | Line Items. Replaces the entire invoice line list. Leave blank to keep the existing lines. Each item: { `ledgerAccountId`, `description`, `quantity`, `unitPrice`, `productId`?, `taxRateId`?, `taxAmount`?, `euGoodsServicesTypeId`? }. |

Output fields:

- `id`: Purchase Invoice ID
- `reference`: Reference
- `vendor_reference`: Vendor Reference
- `notes`: Notes
- `date`: Date (date)
- `due_date`: Due Date (date)
- `contact`: Vendor
- `contact.id`: ID
- `contact.displayed_as`: Name
- `net_amount`: Net Amount (currency)
- `tax_amount`: Tax Amount (currency)
- `total_amount`: Total Amount (currency)
- `outstanding_amount`: Outstanding Amount (currency)
- `status`: Status
- `status.id`: ID
- `status.displayed_as`: Name
- `currency`: Currency
- `currency.id`: ID
- `currency.displayed_as`: Name
- `invoice_lines`: Invoice Lines
- `invoice_lines[].id`: Line ID
- `invoice_lines[].description`: Description
- `invoice_lines[].product`: Product
- `invoice_lines[].product.id`: ID
- `invoice_lines[].product.displayed_as`: Name
- `invoice_lines[].ledger_account`: Ledger Account
- `invoice_lines[].ledger_account.id`: ID
- `invoice_lines[].ledger_account.displayed_as`: Name
- `invoice_lines[].quantity`: Quantity (number)
- `invoice_lines[].unit_price`: Unit Price (currency)
- `invoice_lines[].tax_rate`: Tax Rate
- `invoice_lines[].tax_rate.id`: ID
- `invoice_lines[].tax_rate.displayed_as`: Name
- `invoice_lines[].net_amount`: Net Amount (currency)
- `invoice_lines[].tax_amount`: Tax Amount (currency)
- `invoice_lines[].total_amount`: Total Amount (currency)
- `invoice_lines[].eu_goods_services_type`: EU Goods or Services Type
- `invoice_lines[].eu_goods_services_type.id`: ID
- `invoice_lines[].eu_goods_services_type.displayed_as`: Name

### `find_purchase_invoice`

**Find Purchase Invoice.** Search Sage Accounting purchase invoices by vendor, invoice number (partial match), status, or invoice date range. Returns zero or more matches. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vendor` | string | no |  | Vendor. Only return invoices owed to this vendor. A value the product loads from the provider, such as an id; write the value itself. |
| `search` | string | no |  | Invoice Number contains. |
| `status` | string | no |  | Status. Only return invoices with this status, e.g. "Paid" or "Overdue". A value the product loads from the provider, such as an id; write the value itself. |
| `dateRange` | object | no |  | Invoice Date. Only return invoices dated within this range. |
| `updatedOrCreatedSince` | ISO date-time string | no |  | Updated or Created Since. Only return invoices changed since this date/time. |
| `maxResults` | number | no | `10` | Max results. |

Output fields:

- `[].id`: Purchase Invoice ID
- `[].reference`: Reference
- `[].vendor_reference`: Vendor Reference
- `[].notes`: Notes
- `[].date`: Date (date)
- `[].due_date`: Due Date (date)
- `[].contact`: Vendor
- `[].contact.id`: ID
- `[].contact.displayed_as`: Name
- `[].net_amount`: Net Amount (currency)
- `[].tax_amount`: Tax Amount (currency)
- `[].total_amount`: Total Amount (currency)
- `[].outstanding_amount`: Outstanding Amount (currency)
- `[].status`: Status
- `[].status.id`: ID
- `[].status.displayed_as`: Name
- `[].currency`: Currency
- `[].currency.id`: ID
- `[].currency.displayed_as`: Name
- `[].invoice_lines`: Invoice Lines
- `[].invoice_lines[].id`: Line ID
- `[].invoice_lines[].description`: Description
- `[].invoice_lines[].product`: Product
- `[].invoice_lines[].product.id`: ID
- `[].invoice_lines[].product.displayed_as`: Name
- `[].invoice_lines[].ledger_account`: Ledger Account
- `[].invoice_lines[].ledger_account.id`: ID
- `[].invoice_lines[].ledger_account.displayed_as`: Name
- `[].invoice_lines[].quantity`: Quantity (number)
- `[].invoice_lines[].unit_price`: Unit Price (currency)
- `[].invoice_lines[].tax_rate`: Tax Rate
- `[].invoice_lines[].tax_rate.id`: ID
- `[].invoice_lines[].tax_rate.displayed_as`: Name
- `[].invoice_lines[].net_amount`: Net Amount (currency)
- `[].invoice_lines[].tax_amount`: Tax Amount (currency)
- `[].invoice_lines[].total_amount`: Total Amount (currency)
- `[].invoice_lines[].eu_goods_services_type`: EU Goods or Services Type
- `[].invoice_lines[].eu_goods_services_type.id`: ID
- `[].invoice_lines[].eu_goods_services_type.displayed_as`: Name

### `create_contact_payment`

**Create Contact Payment.** Record a payment received from a customer or made to a vendor in Sage Accounting, optionally allocated against existing invoices. Each call creates a new payment, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | string | yes |  | Contact. The contact to update. A value the product loads from the provider, such as an id; write the value itself. |
| `transactionType` | string | yes |  | Transaction Type. The direction and kind of transaction, e.g. "Customer Receipt" or "Supplier Payment". A value the product loads from the provider, such as an id; write the value itself. |
| `bankAccount` | string | yes |  | Bank Account. The bank account this transaction is recorded against. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | ISO date-time string | yes |  | Date. |
| `totalAmount` | number | yes |  | Total Amount. |
| `paymentMethod` | string | no |  | Payment Method. How the payment was made. A value the product loads from the provider, such as an id; write the value itself. |
| `reference` | string | no |  | Reference. |
| `taxRate` | string | no |  | Tax Rate. The tax rate to apply. A value the product loads from the provider, such as an id; write the value itself. |
| `allocations` | array | no |  | Allocate to Invoices. Optionally apply this payment against one or more existing sales/purchase invoices. Each item: { `artefactId`, `amount`, `discount`? }. |

Output fields:

- `id`: Payment ID
- `reference`: Reference
- `date`: Date (date)
- `total_amount`: Total Amount (currency)
- `net_amount`: Net Amount (currency)
- `tax_amount`: Tax Amount (currency)
- `contact`: Contact
- `contact.id`: ID
- `contact.displayed_as`: Name
- `bank_account`: Bank Account
- `bank_account.id`: ID
- `bank_account.displayed_as`: Name
- `transaction_type`: Transaction Type
- `transaction_type.id`: ID
- `transaction_type.displayed_as`: Name
- `payment_method`: Payment Method
- `payment_method.id`: ID
- `payment_method.displayed_as`: Name
- `tax_rate`: Tax Rate
- `tax_rate.id`: ID
- `tax_rate.displayed_as`: Name
- `currency`: Currency
- `currency.id`: ID
- `currency.displayed_as`: Name

### `update_contact_payment`

**Update Contact Payment.** Update fields on an existing Sage Accounting contact payment, identified by its ID. Only the fields you provide are changed. Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment` | string | yes |  | Contact Payment. The contact payment to update. A value the product loads from the provider, such as an id; write the value itself. |
| `contact` | string | no |  | Contact. The contact of the payment. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | ISO date-time string | no |  | Date. |
| `totalAmount` | number | no |  | Total Amount. |
| `paymentMethod` | string | no |  | Payment Method. How the payment was made. A value the product loads from the provider, such as an id; write the value itself. |
| `bankAccount` | string | no |  | Bank Account. The bank account this transaction is recorded against. A value the product loads from the provider, such as an id; write the value itself. |
| `reference` | string | no |  | Reference. |
| `taxRate` | string | no |  | Tax Rate. The tax rate to apply. A value the product loads from the provider, such as an id; write the value itself. |
| `allocations` | array | no |  | Allocate to Invoices. Optionally apply this payment against one or more existing sales/purchase invoices. Each item: { `artefactId`, `amount`, `discount`? }. |

Output fields:

- `id`: Payment ID
- `reference`: Reference
- `date`: Date (date)
- `total_amount`: Total Amount (currency)
- `net_amount`: Net Amount (currency)
- `tax_amount`: Tax Amount (currency)
- `contact`: Contact
- `contact.id`: ID
- `contact.displayed_as`: Name
- `bank_account`: Bank Account
- `bank_account.id`: ID
- `bank_account.displayed_as`: Name
- `transaction_type`: Transaction Type
- `transaction_type.id`: ID
- `transaction_type.displayed_as`: Name
- `payment_method`: Payment Method
- `payment_method.id`: ID
- `payment_method.displayed_as`: Name
- `tax_rate`: Tax Rate
- `tax_rate.id`: ID
- `tax_rate.displayed_as`: Name
- `currency`: Currency
- `currency.id`: ID
- `currency.displayed_as`: Name

### `find_contact_payment`

**Find Contact Payment.** Search Sage Accounting contact payments by contact or payment date range. Returns zero or more matches. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | string | no |  | Contact. Only return records for this contact. A value the product loads from the provider, such as an id; write the value itself. |
| `bankAccount` | string | no |  | Bank Account. The bank account this transaction is recorded against. A value the product loads from the provider, such as an id; write the value itself. |
| `transactionType` | string | no |  | Transaction Type. The direction and kind of transaction, e.g. "Customer Receipt" or "Supplier Payment". A value the product loads from the provider, such as an id; write the value itself. |
| `updatedOrCreatedSince` | ISO date-time string | no |  | Updated or Created Since. Only return payments changed since this date/time. |
| `dateRange` | object | no |  | Payment Date. Only return payments dated within this range. |
| `maxResults` | number | no | `10` | Max results. |

Output fields:

- `[].id`: Payment ID
- `[].reference`: Reference
- `[].date`: Date (date)
- `[].total_amount`: Total Amount (currency)
- `[].net_amount`: Net Amount (currency)
- `[].tax_amount`: Tax Amount (currency)
- `[].contact`: Contact
- `[].contact.id`: ID
- `[].contact.displayed_as`: Name
- `[].bank_account`: Bank Account
- `[].bank_account.id`: ID
- `[].bank_account.displayed_as`: Name
- `[].transaction_type`: Transaction Type
- `[].transaction_type.id`: ID
- `[].transaction_type.displayed_as`: Name
- `[].payment_method`: Payment Method
- `[].payment_method.id`: ID
- `[].payment_method.displayed_as`: Name
- `[].tax_rate`: Tax Rate
- `[].tax_rate.id`: ID
- `[].tax_rate.displayed_as`: Name
- `[].currency`: Currency
- `[].currency.id`: ID
- `[].currency.displayed_as`: Name

### `create_other_payment`

**Create Other Payment (Money Out).** Record money paid out of the business in Sage Accounting that has no related invoice or bill (e.g. bank charges, owner drawings). Each call creates a new payment, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bankAccount` | string | yes |  | Bank Account. The bank account this transaction is recorded against. A value the product loads from the provider, such as an id; write the value itself. |
| `contact` | string | no |  | Contact. Only return records for this contact. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | ISO date-time string | yes |  | Date. |
| `totalAmount` | number | yes |  | Total Amount. |
| `paymentMethod` | string | no |  | Payment Method. How the payment was made. A value the product loads from the provider, such as an id; write the value itself. |
| `reference` | string | no |  | Reference. |
| `lines` | array | yes |  | Line Items. Each item: { `ledgerAccountId`, `amount`, `taxRateId`?, `details`? }. |

Output fields:

- `id`: Payment ID
- `reference`: Reference
- `date`: Date (date)
- `total_amount`: Total Amount (currency)
- `net_amount`: Net Amount (currency)
- `tax_amount`: Tax Amount (currency)
- `transaction_type`: Transaction Type
- `transaction_type.id`: ID
- `transaction_type.displayed_as`: Name
- `payment_method`: Payment Method
- `payment_method.id`: ID
- `payment_method.displayed_as`: Name
- `contact`: Contact
- `contact.id`: ID
- `contact.displayed_as`: Name
- `bank_account`: Bank Account
- `bank_account.id`: ID
- `bank_account.displayed_as`: Name
- `payment_lines`: Payment Lines
- `payment_lines[].id`: Line ID
- `payment_lines[].details`: Details
- `payment_lines[].ledger_account`: Ledger Account
- `payment_lines[].ledger_account.id`: ID
- `payment_lines[].ledger_account.displayed_as`: Name
- `payment_lines[].tax_rate`: Tax Rate
- `payment_lines[].tax_rate.id`: ID
- `payment_lines[].tax_rate.displayed_as`: Name
- `payment_lines[].net_amount`: Net Amount (currency)
- `payment_lines[].tax_amount`: Tax Amount (currency)
- `payment_lines[].total_amount`: Total Amount (currency)

### `create_other_receipt`

**Create Other Receipt (Money In).** Record money received into the business in Sage Accounting that has no related invoice (e.g. a refund, or interest earned). Each call creates a new receipt, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bankAccount` | string | yes |  | Bank Account. The bank account this transaction is recorded against. A value the product loads from the provider, such as an id; write the value itself. |
| `contact` | string | no |  | Contact. Only return records for this contact. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | ISO date-time string | yes |  | Date. |
| `totalAmount` | number | yes |  | Total Amount. |
| `paymentMethod` | string | no |  | Payment Method. How the payment was made. A value the product loads from the provider, such as an id; write the value itself. |
| `reference` | string | no |  | Reference. |
| `lines` | array | yes |  | Line Items. Each item: { `ledgerAccountId`, `amount`, `taxRateId`?, `details`? }. |

Output fields:

- `id`: Payment ID
- `reference`: Reference
- `date`: Date (date)
- `total_amount`: Total Amount (currency)
- `net_amount`: Net Amount (currency)
- `tax_amount`: Tax Amount (currency)
- `transaction_type`: Transaction Type
- `transaction_type.id`: ID
- `transaction_type.displayed_as`: Name
- `payment_method`: Payment Method
- `payment_method.id`: ID
- `payment_method.displayed_as`: Name
- `contact`: Contact
- `contact.id`: ID
- `contact.displayed_as`: Name
- `bank_account`: Bank Account
- `bank_account.id`: ID
- `bank_account.displayed_as`: Name
- `payment_lines`: Payment Lines
- `payment_lines[].id`: Line ID
- `payment_lines[].details`: Details
- `payment_lines[].ledger_account`: Ledger Account
- `payment_lines[].ledger_account.id`: ID
- `payment_lines[].ledger_account.displayed_as`: Name
- `payment_lines[].tax_rate`: Tax Rate
- `payment_lines[].tax_rate.id`: ID
- `payment_lines[].tax_rate.displayed_as`: Name
- `payment_lines[].net_amount`: Net Amount (currency)
- `payment_lines[].tax_amount`: Tax Amount (currency)
- `payment_lines[].total_amount`: Total Amount (currency)

### `create_product`

**Create Product.** Create a new product in Sage Accounting, for use as a line item on invoices and quotes. Each call creates a new product, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `description` | string | yes |  | Description. |
| `salesLedgerAccount` | string | yes |  | Sales Ledger Account. The ledger account to post sales of this product to. A value the product loads from the provider, such as an id; write the value itself. |
| `purchaseLedgerAccount` | string | yes |  | Purchase Ledger Account. The ledger account to post purchases of this product to. A value the product loads from the provider, such as an id; write the value itself. |
| `itemCode` | string | no |  | Item Code. |
| `salesTaxRate` | string | no |  | Sales Tax Rate. The tax rate to apply when this product is sold. A value the product loads from the provider, such as an id; write the value itself. |
| `purchaseTaxRate` | string | no |  | Purchase Tax Rate. The tax rate to apply when this product is purchased. A value the product loads from the provider, such as an id; write the value itself. |
| `usualSupplier` | string | no |  | Usual Supplier. The vendor this product is usually purchased from. A value the product loads from the provider, such as an id; write the value itself. |
| `costPrice` | number | no |  | Cost Price. |
| `purchaseDescription` | string | no |  | Description on Purchase Forms. |
| `notes` | string | no |  | Notes. |
| `active` | boolean | no | `true` | Active. |
| `salesPrices` | array | no |  | Sales Prices. Optionally set a price for one or more product sales price types (e.g. Trade, Wholesale). Each item: { `productSalesPriceTypeId`, `price`, `priceIncludesTax`? }. |

Output fields:

- `id`: Product ID
- `item_code`: Item Code
- `description`: Description
- `notes`: Notes
- `purchase_description`: Description on Purchase Forms
- `active`: Active (boolean)
- `sales_ledger_account`: Sales Ledger Account
- `sales_ledger_account.id`: ID
- `sales_ledger_account.displayed_as`: Name
- `purchase_ledger_account`: Purchase Ledger Account
- `purchase_ledger_account.id`: ID
- `purchase_ledger_account.displayed_as`: Name
- `sales_tax_rate`: Sales Tax Rate
- `sales_tax_rate.id`: ID
- `sales_tax_rate.displayed_as`: Name
- `purchase_tax_rate`: Purchase Tax Rate
- `purchase_tax_rate.id`: ID
- `purchase_tax_rate.displayed_as`: Name
- `usual_supplier`: Usual Supplier
- `usual_supplier.id`: ID
- `usual_supplier.displayed_as`: Name
- `cost_price`: Cost Price (currency)
- `sales_prices`: Sales Prices
- `sales_prices[].id`: Sales Price ID
- `sales_prices[].price_name`: Price Name
- `sales_prices[].price`: Price (currency)
- `sales_prices[].price_includes_tax`: Price Includes Tax (boolean)
- `sales_prices[].product_sales_price_type`: Product Sales Price Type
- `sales_prices[].product_sales_price_type.id`: ID
- `sales_prices[].product_sales_price_type.displayed_as`: Name
- `catalog_item_type`: Catalog Item Type
- `catalog_item_type.id`: ID
- `catalog_item_type.displayed_as`: Name

### `update_product`

**Update Product.** Update fields on an existing Sage Accounting product, identified by its ID. Only the fields you provide are changed. Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product` | string | yes |  | Product. The product to update. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. |
| `itemCode` | string | no |  | Item Code. |
| `notes` | string | no |  | Notes. |
| `salesLedgerAccount` | string | no |  | Sales Ledger Account. The ledger account to post sales of this product to. A value the product loads from the provider, such as an id; write the value itself. |
| `salesTaxRate` | string | no |  | Sales Tax Rate. The tax rate to apply when this product is sold. A value the product loads from the provider, such as an id; write the value itself. |
| `purchaseLedgerAccount` | string | no |  | Purchase Ledger Account. The ledger account to post purchases of this product to. A value the product loads from the provider, such as an id; write the value itself. |
| `usualSupplier` | string | no |  | Usual Supplier. The vendor this product is usually purchased from. A value the product loads from the provider, such as an id; write the value itself. |
| `purchaseTaxRate` | string | no |  | Purchase Tax Rate. The tax rate to apply when this product is purchased. A value the product loads from the provider, such as an id; write the value itself. |
| `costPrice` | number | no |  | Cost Price. |
| `purchaseDescription` | string | no |  | Description on Purchase Forms. |
| `active` | boolean | no |  | Active. |
| `salesPrices` | array | no |  | Sales Prices. Optionally set a price for one or more product sales price types (e.g. Trade, Wholesale). Each item: { `productSalesPriceTypeId`, `price`, `priceIncludesTax`? }. |

Output fields:

- `id`: Product ID
- `item_code`: Item Code
- `description`: Description
- `notes`: Notes
- `purchase_description`: Description on Purchase Forms
- `active`: Active (boolean)
- `sales_ledger_account`: Sales Ledger Account
- `sales_ledger_account.id`: ID
- `sales_ledger_account.displayed_as`: Name
- `purchase_ledger_account`: Purchase Ledger Account
- `purchase_ledger_account.id`: ID
- `purchase_ledger_account.displayed_as`: Name
- `sales_tax_rate`: Sales Tax Rate
- `sales_tax_rate.id`: ID
- `sales_tax_rate.displayed_as`: Name
- `purchase_tax_rate`: Purchase Tax Rate
- `purchase_tax_rate.id`: ID
- `purchase_tax_rate.displayed_as`: Name
- `usual_supplier`: Usual Supplier
- `usual_supplier.id`: ID
- `usual_supplier.displayed_as`: Name
- `cost_price`: Cost Price (currency)
- `sales_prices`: Sales Prices
- `sales_prices[].id`: Sales Price ID
- `sales_prices[].price_name`: Price Name
- `sales_prices[].price`: Price (currency)
- `sales_prices[].price_includes_tax`: Price Includes Tax (boolean)
- `sales_prices[].product_sales_price_type`: Product Sales Price Type
- `sales_prices[].product_sales_price_type.id`: ID
- `sales_prices[].product_sales_price_type.displayed_as`: Name
- `catalog_item_type`: Catalog Item Type
- `catalog_item_type.id`: ID
- `catalog_item_type.displayed_as`: Name

### `find_product`

**Find Product.** Search Sage Accounting products by description or item code (partial match). Returns zero or more matches. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Description or Item Code contains. |
| `active` | boolean | no |  | Active only. |
| `updatedOrCreatedSince` | ISO date-time string | no |  | Updated or Created Since. Only return products changed since this date/time. |
| `maxResults` | number | no | `10` | Max results. |

Output fields:

- `[].id`: Product ID
- `[].item_code`: Item Code
- `[].description`: Description
- `[].notes`: Notes
- `[].purchase_description`: Description on Purchase Forms
- `[].active`: Active (boolean)
- `[].sales_ledger_account`: Sales Ledger Account
- `[].sales_ledger_account.id`: ID
- `[].sales_ledger_account.displayed_as`: Name
- `[].purchase_ledger_account`: Purchase Ledger Account
- `[].purchase_ledger_account.id`: ID
- `[].purchase_ledger_account.displayed_as`: Name
- `[].sales_tax_rate`: Sales Tax Rate
- `[].sales_tax_rate.id`: ID
- `[].sales_tax_rate.displayed_as`: Name
- `[].purchase_tax_rate`: Purchase Tax Rate
- `[].purchase_tax_rate.id`: ID
- `[].purchase_tax_rate.displayed_as`: Name
- `[].usual_supplier`: Usual Supplier
- `[].usual_supplier.id`: ID
- `[].usual_supplier.displayed_as`: Name
- `[].cost_price`: Cost Price (currency)
- `[].sales_prices`: Sales Prices
- `[].sales_prices[].id`: Sales Price ID
- `[].sales_prices[].price_name`: Price Name
- `[].sales_prices[].price`: Price (currency)
- `[].sales_prices[].price_includes_tax`: Price Includes Tax (boolean)
- `[].sales_prices[].product_sales_price_type`: Product Sales Price Type
- `[].sales_prices[].product_sales_price_type.id`: ID
- `[].sales_prices[].product_sales_price_type.displayed_as`: Name
- `[].catalog_item_type`: Catalog Item Type
- `[].catalog_item_type.id`: ID
- `[].catalog_item_type.displayed_as`: Name

### `create_service`

**Create Service.** Create a new service in Sage Accounting, for use as a line item on invoices and quotes. Each call creates a new service, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `description` | string | yes |  | Description. |
| `salesLedgerAccount` | string | yes |  | Sales Ledger Account. The ledger account to post sales of this product to. A value the product loads from the provider, such as an id; write the value itself. |
| `purchaseLedgerAccount` | string | yes |  | Purchase Ledger Account. The ledger account to post purchases of this product to. A value the product loads from the provider, such as an id; write the value itself. |
| `itemCode` | string | no |  | Item Code. |
| `salesTaxRate` | string | no |  | Sales Tax Rate. The tax rate to apply when this product is sold. A value the product loads from the provider, such as an id; write the value itself. |
| `purchaseTaxRate` | string | no |  | Purchase Tax Rate. The tax rate to apply when this product is purchased. A value the product loads from the provider, such as an id; write the value itself. |
| `usualSupplier` | string | no |  | Usual Supplier. The vendor this product is usually purchased from. A value the product loads from the provider, such as an id; write the value itself. |
| `costPrice` | number | no |  | Cost Price. |
| `purchaseDescription` | string | no |  | Description on Purchase Forms. |
| `notes` | string | no |  | Notes. |
| `active` | boolean | no | `true` | Active. |
| `salesRates` | array | no |  | Sales Rates. Optionally set a rate for one or more service rate types. Each item: { `serviceRateTypeId`, `rate`, `rateIncludesTax`? }. |

Output fields:

- `id`: Service ID
- `item_code`: Item Code
- `description`: Description
- `notes`: Notes
- `purchase_description`: Description on Purchase Forms
- `active`: Active (boolean)
- `sales_ledger_account`: Sales Ledger Account
- `sales_ledger_account.id`: ID
- `sales_ledger_account.displayed_as`: Name
- `purchase_ledger_account`: Purchase Ledger Account
- `purchase_ledger_account.id`: ID
- `purchase_ledger_account.displayed_as`: Name
- `sales_tax_rate`: Sales Tax Rate
- `sales_tax_rate.id`: ID
- `sales_tax_rate.displayed_as`: Name
- `purchase_tax_rate`: Purchase Tax Rate
- `purchase_tax_rate.id`: ID
- `purchase_tax_rate.displayed_as`: Name
- `usual_supplier`: Usual Supplier
- `usual_supplier.id`: ID
- `usual_supplier.displayed_as`: Name
- `cost_price`: Cost Price (currency)
- `sales_rates`: Sales Rates
- `sales_rates[].id`: Sales Rate ID
- `sales_rates[].rate_name`: Rate Name
- `sales_rates[].rate`: Rate (currency)
- `sales_rates[].rate_includes_tax`: Rate Includes Tax (boolean)
- `sales_rates[].service_rate_type`: Service Rate Type
- `sales_rates[].service_rate_type.id`: ID
- `sales_rates[].service_rate_type.displayed_as`: Name

### `update_service`

**Update Service.** Update fields on an existing Sage Accounting service, identified by its ID. Only the fields you provide are changed. Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `service` | string | yes |  | Service. The service to update. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. |
| `itemCode` | string | no |  | Item Code. |
| `notes` | string | no |  | Notes. |
| `salesLedgerAccount` | string | no |  | Sales Ledger Account. The ledger account to post sales of this product to. A value the product loads from the provider, such as an id; write the value itself. |
| `salesTaxRate` | string | no |  | Sales Tax Rate. The tax rate to apply when this product is sold. A value the product loads from the provider, such as an id; write the value itself. |
| `purchaseLedgerAccount` | string | no |  | Purchase Ledger Account. The ledger account to post purchases of this product to. A value the product loads from the provider, such as an id; write the value itself. |
| `usualSupplier` | string | no |  | Usual Supplier. The vendor this product is usually purchased from. A value the product loads from the provider, such as an id; write the value itself. |
| `purchaseTaxRate` | string | no |  | Purchase Tax Rate. The tax rate to apply when this product is purchased. A value the product loads from the provider, such as an id; write the value itself. |
| `costPrice` | number | no |  | Cost Price. |
| `purchaseDescription` | string | no |  | Description on Purchase Forms. |
| `active` | boolean | no |  | Active. |
| `salesRates` | array | no |  | Sales Rates. Optionally set a rate for one or more service rate types. Each item: { `serviceRateTypeId`, `rate`, `rateIncludesTax`? }. |

Output fields:

- `id`: Service ID
- `item_code`: Item Code
- `description`: Description
- `notes`: Notes
- `purchase_description`: Description on Purchase Forms
- `active`: Active (boolean)
- `sales_ledger_account`: Sales Ledger Account
- `sales_ledger_account.id`: ID
- `sales_ledger_account.displayed_as`: Name
- `purchase_ledger_account`: Purchase Ledger Account
- `purchase_ledger_account.id`: ID
- `purchase_ledger_account.displayed_as`: Name
- `sales_tax_rate`: Sales Tax Rate
- `sales_tax_rate.id`: ID
- `sales_tax_rate.displayed_as`: Name
- `purchase_tax_rate`: Purchase Tax Rate
- `purchase_tax_rate.id`: ID
- `purchase_tax_rate.displayed_as`: Name
- `usual_supplier`: Usual Supplier
- `usual_supplier.id`: ID
- `usual_supplier.displayed_as`: Name
- `cost_price`: Cost Price (currency)
- `sales_rates`: Sales Rates
- `sales_rates[].id`: Sales Rate ID
- `sales_rates[].rate_name`: Rate Name
- `sales_rates[].rate`: Rate (currency)
- `sales_rates[].rate_includes_tax`: Rate Includes Tax (boolean)
- `sales_rates[].service_rate_type`: Service Rate Type
- `sales_rates[].service_rate_type.id`: ID
- `sales_rates[].service_rate_type.displayed_as`: Name

### `find_service`

**Find Service.** Search Sage Accounting services by description or item code (partial match). Returns zero or more matches. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Description or Item Code contains. |
| `active` | boolean | no |  | Active only. |
| `updatedOrCreatedSince` | ISO date-time string | no |  | Updated or Created Since. Only return services changed since this date/time. |
| `maxResults` | number | no | `10` | Max results. |

Output fields:

- `[].id`: Service ID
- `[].item_code`: Item Code
- `[].description`: Description
- `[].notes`: Notes
- `[].purchase_description`: Description on Purchase Forms
- `[].active`: Active (boolean)
- `[].sales_ledger_account`: Sales Ledger Account
- `[].sales_ledger_account.id`: ID
- `[].sales_ledger_account.displayed_as`: Name
- `[].purchase_ledger_account`: Purchase Ledger Account
- `[].purchase_ledger_account.id`: ID
- `[].purchase_ledger_account.displayed_as`: Name
- `[].sales_tax_rate`: Sales Tax Rate
- `[].sales_tax_rate.id`: ID
- `[].sales_tax_rate.displayed_as`: Name
- `[].purchase_tax_rate`: Purchase Tax Rate
- `[].purchase_tax_rate.id`: ID
- `[].purchase_tax_rate.displayed_as`: Name
- `[].usual_supplier`: Usual Supplier
- `[].usual_supplier.id`: ID
- `[].usual_supplier.displayed_as`: Name
- `[].cost_price`: Cost Price (currency)
- `[].sales_rates`: Sales Rates
- `[].sales_rates[].id`: Sales Rate ID
- `[].sales_rates[].rate_name`: Rate Name
- `[].sales_rates[].rate`: Rate (currency)
- `[].sales_rates[].rate_includes_tax`: Rate Includes Tax (boolean)
- `[].sales_rates[].service_rate_type`: Service Rate Type
- `[].sales_rates[].service_rate_type.id`: ID
- `[].sales_rates[].service_rate_type.displayed_as`: Name

### `create_stock_item`

**Create Stock Item.** Create a new stock item in Sage Accounting, for use as a line item on invoices and quotes with quantity tracking. Each call creates a new stock item, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `description` | string | yes |  | Description. |
| `salesLedgerAccount` | string | yes |  | Sales Ledger Account. The ledger account to post sales of this product to. A value the product loads from the provider, such as an id; write the value itself. |
| `purchaseLedgerAccount` | string | yes |  | Purchase Ledger Account. The ledger account to post purchases of this product to. A value the product loads from the provider, such as an id; write the value itself. |
| `itemCode` | string | yes |  | Item Code. |
| `salesTaxRate` | string | no |  | Sales Tax Rate. The tax rate to apply when this product is sold. A value the product loads from the provider, such as an id; write the value itself. |
| `purchaseTaxRate` | string | no |  | Purchase Tax Rate. The tax rate to apply when this product is purchased. A value the product loads from the provider, such as an id; write the value itself. |
| `usualSupplier` | string | no |  | Usual Supplier. The vendor this product is usually purchased from. A value the product loads from the provider, such as an id; write the value itself. |
| `costPrice` | number | no |  | Cost Price. |
| `purchaseDescription` | string | no |  | Description on Purchase Forms. |
| `supplierItemCode` | string | no |  | Supplier Item Code. |
| `reorderLevel` | number | no |  | Reorder Level. |
| `reorderQuantity` | number | no |  | Reorder Quantity. |
| `location` | string | no |  | Location. |
| `barcode` | string | no |  | Barcode. |
| `weight` | number | no |  | Weight. |
| `measurementUnit` | string | no |  | Measurement Unit. The unit the weight is measured in, e.g. "kg" or "lb". |
| `notes` | string | no |  | Notes. |
| `active` | boolean | no | `true` | Active. |
| `salesPrices` | array | no |  | Sales Prices. Optionally set a price for one or more product sales price types (e.g. Trade, Wholesale). Each item: { `productSalesPriceTypeId`, `price`, `priceIncludesTax`? }. |

Output fields:

- `id`: Stock Item ID
- `item_code`: Item Code
- `description`: Description
- `notes`: Notes
- `purchase_description`: Description on Purchase Forms
- `supplier_part_number`: Supplier Item Code
- `reorder_level`: Reorder Level (number)
- `reorder_quantity`: Reorder Quantity (number)
- `location`: Location
- `barcode`: Barcode
- `weight`: Weight (number)
- `measurement_unit`: Measurement Unit
- `quantity_in_stock`: Quantity In Stock (number)
- `active`: Active (boolean)
- `sales_ledger_account`: Sales Ledger Account
- `sales_ledger_account.id`: ID
- `sales_ledger_account.displayed_as`: Name
- `purchase_ledger_account`: Purchase Ledger Account
- `purchase_ledger_account.id`: ID
- `purchase_ledger_account.displayed_as`: Name
- `sales_tax_rate`: Sales Tax Rate
- `sales_tax_rate.id`: ID
- `sales_tax_rate.displayed_as`: Name
- `purchase_tax_rate`: Purchase Tax Rate
- `purchase_tax_rate.id`: ID
- `purchase_tax_rate.displayed_as`: Name
- `usual_supplier`: Usual Supplier
- `usual_supplier.id`: ID
- `usual_supplier.displayed_as`: Name
- `cost_price`: Cost Price (currency)
- `sales_prices`: Sales Prices
- `sales_prices[].id`: Sales Price ID
- `sales_prices[].price_name`: Price Name
- `sales_prices[].price`: Price (currency)
- `sales_prices[].price_includes_tax`: Price Includes Tax (boolean)
- `sales_prices[].product_sales_price_type`: Product Sales Price Type
- `sales_prices[].product_sales_price_type.id`: ID
- `sales_prices[].product_sales_price_type.displayed_as`: Name

### `update_stock_item`

**Update Stock Item.** Update fields on an existing Sage Accounting stock item, identified by its ID. Only the fields you provide are changed. Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `stockItem` | string | yes |  | Stock Item. The stock item to update. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. |
| `itemCode` | string | no |  | Item Code. |
| `notes` | string | no |  | Notes. |
| `salesLedgerAccount` | string | no |  | Sales Ledger Account. The ledger account to post sales of this product to. A value the product loads from the provider, such as an id; write the value itself. |
| `salesTaxRate` | string | no |  | Sales Tax Rate. The tax rate to apply when this product is sold. A value the product loads from the provider, such as an id; write the value itself. |
| `purchaseLedgerAccount` | string | no |  | Purchase Ledger Account. The ledger account to post purchases of this product to. A value the product loads from the provider, such as an id; write the value itself. |
| `usualSupplier` | string | no |  | Usual Supplier. The vendor this product is usually purchased from. A value the product loads from the provider, such as an id; write the value itself. |
| `purchaseTaxRate` | string | no |  | Purchase Tax Rate. The tax rate to apply when this product is purchased. A value the product loads from the provider, such as an id; write the value itself. |
| `costPrice` | number | no |  | Cost Price. |
| `purchaseDescription` | string | no |  | Description on Purchase Forms. |
| `supplierItemCode` | string | no |  | Supplier Item Code. |
| `reorderLevel` | number | no |  | Reorder Level. |
| `reorderQuantity` | number | no |  | Reorder Quantity. |
| `location` | string | no |  | Location. |
| `barcode` | string | no |  | Barcode. |
| `weight` | number | no |  | Weight. |
| `measurementUnit` | string | no |  | Measurement Unit. The unit the weight is measured in, e.g. "kg" or "lb". |
| `active` | boolean | no |  | Active. |
| `salesPrices` | array | no |  | Sales Prices. Optionally set a price for one or more product sales price types (e.g. Trade, Wholesale). Each item: { `productSalesPriceTypeId`, `price`, `priceIncludesTax`? }. |

Output fields:

- `id`: Stock Item ID
- `item_code`: Item Code
- `description`: Description
- `notes`: Notes
- `purchase_description`: Description on Purchase Forms
- `supplier_part_number`: Supplier Item Code
- `reorder_level`: Reorder Level (number)
- `reorder_quantity`: Reorder Quantity (number)
- `location`: Location
- `barcode`: Barcode
- `weight`: Weight (number)
- `measurement_unit`: Measurement Unit
- `quantity_in_stock`: Quantity In Stock (number)
- `active`: Active (boolean)
- `sales_ledger_account`: Sales Ledger Account
- `sales_ledger_account.id`: ID
- `sales_ledger_account.displayed_as`: Name
- `purchase_ledger_account`: Purchase Ledger Account
- `purchase_ledger_account.id`: ID
- `purchase_ledger_account.displayed_as`: Name
- `sales_tax_rate`: Sales Tax Rate
- `sales_tax_rate.id`: ID
- `sales_tax_rate.displayed_as`: Name
- `purchase_tax_rate`: Purchase Tax Rate
- `purchase_tax_rate.id`: ID
- `purchase_tax_rate.displayed_as`: Name
- `usual_supplier`: Usual Supplier
- `usual_supplier.id`: ID
- `usual_supplier.displayed_as`: Name
- `cost_price`: Cost Price (currency)
- `sales_prices`: Sales Prices
- `sales_prices[].id`: Sales Price ID
- `sales_prices[].price_name`: Price Name
- `sales_prices[].price`: Price (currency)
- `sales_prices[].price_includes_tax`: Price Includes Tax (boolean)
- `sales_prices[].product_sales_price_type`: Product Sales Price Type
- `sales_prices[].product_sales_price_type.id`: ID
- `sales_prices[].product_sales_price_type.displayed_as`: Name

### `find_stock_item`

**Find Stock Item.** Search Sage Accounting stock items by description or item code (partial match). Returns zero or more matches. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Description or Item Code contains. |
| `active` | boolean | no |  | Active only. |
| `updatedOrCreatedSince` | ISO date-time string | no |  | Updated or Created Since. Only return stock items changed since this date/time. |
| `maxResults` | number | no | `10` | Max results. |

Output fields:

- `[].id`: Stock Item ID
- `[].item_code`: Item Code
- `[].description`: Description
- `[].notes`: Notes
- `[].purchase_description`: Description on Purchase Forms
- `[].supplier_part_number`: Supplier Item Code
- `[].reorder_level`: Reorder Level (number)
- `[].reorder_quantity`: Reorder Quantity (number)
- `[].location`: Location
- `[].barcode`: Barcode
- `[].weight`: Weight (number)
- `[].measurement_unit`: Measurement Unit
- `[].quantity_in_stock`: Quantity In Stock (number)
- `[].active`: Active (boolean)
- `[].sales_ledger_account`: Sales Ledger Account
- `[].sales_ledger_account.id`: ID
- `[].sales_ledger_account.displayed_as`: Name
- `[].purchase_ledger_account`: Purchase Ledger Account
- `[].purchase_ledger_account.id`: ID
- `[].purchase_ledger_account.displayed_as`: Name
- `[].sales_tax_rate`: Sales Tax Rate
- `[].sales_tax_rate.id`: ID
- `[].sales_tax_rate.displayed_as`: Name
- `[].purchase_tax_rate`: Purchase Tax Rate
- `[].purchase_tax_rate.id`: ID
- `[].purchase_tax_rate.displayed_as`: Name
- `[].usual_supplier`: Usual Supplier
- `[].usual_supplier.id`: ID
- `[].usual_supplier.displayed_as`: Name
- `[].cost_price`: Cost Price (currency)
- `[].sales_prices`: Sales Prices
- `[].sales_prices[].id`: Sales Price ID
- `[].sales_prices[].price_name`: Price Name
- `[].sales_prices[].price`: Price (currency)
- `[].sales_prices[].price_includes_tax`: Price Includes Tax (boolean)
- `[].sales_prices[].product_sales_price_type`: Product Sales Price Type
- `[].sales_prices[].product_sales_price_type.id`: ID
- `[].sales_prices[].product_sales_price_type.displayed_as`: Name

### `create_sales_quote`

**Create Sales Quote.** Create a new sales quote for a customer, with one or more ledger account lines. Each call creates a new quote, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | yes |  | Customer. The customer this invoice is billed to. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | ISO date-time string | yes |  | Quote Date. |
| `expiryDate` | ISO date-time string | yes |  | Expiry Date. |
| `reference` | string | no |  | Reference. |
| `notes` | string | no |  | Notes. |
| `mainAddressLine1` | string | no |  | Main Address Line 1. |
| `mainAddressLine2` | string | no |  | Main Address Line 2. |
| `mainAddressCity` | string | no |  | Main Address City. |
| `mainAddressPostalCode` | string | no |  | Main Address Postal Code or Zipcode. |
| `mainAddressCountry` | string | no |  | Country. The country of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `mainAddressRegion` | string | no |  | Main Address Region. |
| `mainAddressType` | string | no |  | Address Type. The type of this address, e.g. "Billing" or "Delivery". A value the product loads from the provider, such as an id; write the value itself. |
| `deliveryAddressLine1` | string | no |  | Delivery Address Line 1. |
| `deliveryAddressLine2` | string | no |  | Delivery Address Line 2. |
| `deliveryAddressCity` | string | no |  | Delivery Address City. |
| `deliveryAddressPostalCode` | string | no |  | Delivery Address Postal Code or Zipcode. |
| `deliveryAddressCountry` | string | no |  | Country. The country of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `deliveryAddressRegion` | string | no |  | Delivery Address Region. |
| `deliveryAddressType` | string | no |  | Address Type. The type of this address, e.g. "Billing" or "Delivery". A value the product loads from the provider, such as an id; write the value itself. |
| `lines` | array | yes |  | Line Items. Each item: { `ledgerAccountId`, `description`, `quantity`, `unitPrice`, `productId`?, `taxRateId`?, `taxAmount`?, `discountAmount`?, `euGoodsServicesTypeId`?, `euSalesDescriptionId`? }. |

Output fields:

- `id`: Sales Quote ID
- `reference`: Reference
- `notes`: Notes
- `date`: Date (date)
- `expiry_date`: Expiry Date (date)
- `contact`: Customer
- `contact.id`: ID
- `contact.displayed_as`: Name
- `main_address`: Main Address
- `main_address.address_line_1`: Address Line 1
- `main_address.address_line_2`: Address Line 2
- `main_address.city`: City
- `main_address.postal_code`: Postal Code
- `main_address.region`: Region
- `main_address.country`: Country
- `main_address.country.id`: ID
- `main_address.country.displayed_as`: Name
- `main_address.country_group`: Country Group
- `main_address.country_group.id`: ID
- `main_address.country_group.displayed_as`: Name
- `main_address.address_type`: Address Type
- `main_address.address_type.id`: ID
- `main_address.address_type.displayed_as`: Name
- `delivery_address`: Delivery Address
- `delivery_address.address_line_1`: Address Line 1
- `delivery_address.address_line_2`: Address Line 2
- `delivery_address.city`: City
- `delivery_address.postal_code`: Postal Code
- `delivery_address.region`: Region
- `delivery_address.country`: Country
- `delivery_address.country.id`: ID
- `delivery_address.country.displayed_as`: Name
- `delivery_address.country_group`: Country Group
- `delivery_address.country_group.id`: ID
- `delivery_address.country_group.displayed_as`: Name
- `delivery_address.address_type`: Address Type
- `delivery_address.address_type.id`: ID
- `delivery_address.address_type.displayed_as`: Name
- `net_amount`: Net Amount (currency)
- `tax_amount`: Tax Amount (currency)
- `total_amount`: Total Amount (currency)
- `status`: Status
- `status.id`: ID
- `status.displayed_as`: Name
- `currency`: Currency
- `currency.id`: ID
- `currency.displayed_as`: Name
- `quote_lines`: Quote Lines
- `quote_lines[].id`: Line ID
- `quote_lines[].description`: Description
- `quote_lines[].product`: Product
- `quote_lines[].product.id`: ID
- `quote_lines[].product.displayed_as`: Name
- `quote_lines[].ledger_account`: Ledger Account
- `quote_lines[].ledger_account.id`: ID
- `quote_lines[].ledger_account.displayed_as`: Name
- `quote_lines[].quantity`: Quantity (number)
- `quote_lines[].unit_price`: Unit Price (currency)
- `quote_lines[].tax_rate`: Tax Rate
- `quote_lines[].tax_rate.id`: ID
- `quote_lines[].tax_rate.displayed_as`: Name
- `quote_lines[].net_amount`: Net Amount (currency)
- `quote_lines[].tax_amount`: Tax Amount (currency)
- `quote_lines[].discount_amount`: Discount Amount (currency)
- `quote_lines[].total_amount`: Total Amount (currency)
- `quote_lines[].eu_goods_services_type`: EU Goods or Services Type
- `quote_lines[].eu_goods_services_type.id`: ID
- `quote_lines[].eu_goods_services_type.displayed_as`: Name

### `update_sales_quote`

**Update Sales Quote.** Update fields on an existing Sage Accounting sales quote, identified by its ID. Only the fields you provide are changed. Providing line items replaces the entire line list. Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `quote` | string | yes |  | Sales Quote. The sales quote to update. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | ISO date-time string | no |  | Quote Date. |
| `expiryDate` | ISO date-time string | no |  | Expiry Date. |
| `reference` | string | no |  | Reference. |
| `notes` | string | no |  | Notes. |
| `mainAddressLine1` | string | no |  | Main Address Line 1. |
| `mainAddressLine2` | string | no |  | Main Address Line 2. |
| `mainAddressCity` | string | no |  | Main Address City. |
| `mainAddressPostalCode` | string | no |  | Main Address Postal Code or Zipcode. |
| `mainAddressCountry` | string | no |  | Country. The country of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `mainAddressRegion` | string | no |  | Main Address Region. |
| `mainAddressType` | string | no |  | Address Type. The type of this address, e.g. "Billing" or "Delivery". A value the product loads from the provider, such as an id; write the value itself. |
| `deliveryAddressLine1` | string | no |  | Delivery Address Line 1. |
| `deliveryAddressLine2` | string | no |  | Delivery Address Line 2. |
| `deliveryAddressCity` | string | no |  | Delivery Address City. |
| `deliveryAddressPostalCode` | string | no |  | Delivery Address Postal Code or Zipcode. |
| `deliveryAddressCountry` | string | no |  | Country. The country of this address. A value the product loads from the provider, such as an id; write the value itself. |
| `deliveryAddressRegion` | string | no |  | Delivery Address Region. |
| `deliveryAddressType` | string | no |  | Address Type. The type of this address, e.g. "Billing" or "Delivery". A value the product loads from the provider, such as an id; write the value itself. |
| `lines` | array | no |  | Line Items. Replaces the entire quote line list. Leave blank to keep the existing lines. Each item: { `ledgerAccountId`, `description`, `quantity`, `unitPrice`, `productId`?, `taxRateId`?, `taxAmount`?, `discountAmount`?, `euGoodsServicesTypeId`?, `euSalesDescriptionId`? }. |

Output fields:

- `id`: Sales Quote ID
- `reference`: Reference
- `notes`: Notes
- `date`: Date (date)
- `expiry_date`: Expiry Date (date)
- `contact`: Customer
- `contact.id`: ID
- `contact.displayed_as`: Name
- `main_address`: Main Address
- `main_address.address_line_1`: Address Line 1
- `main_address.address_line_2`: Address Line 2
- `main_address.city`: City
- `main_address.postal_code`: Postal Code
- `main_address.region`: Region
- `main_address.country`: Country
- `main_address.country.id`: ID
- `main_address.country.displayed_as`: Name
- `main_address.country_group`: Country Group
- `main_address.country_group.id`: ID
- `main_address.country_group.displayed_as`: Name
- `main_address.address_type`: Address Type
- `main_address.address_type.id`: ID
- `main_address.address_type.displayed_as`: Name
- `delivery_address`: Delivery Address
- `delivery_address.address_line_1`: Address Line 1
- `delivery_address.address_line_2`: Address Line 2
- `delivery_address.city`: City
- `delivery_address.postal_code`: Postal Code
- `delivery_address.region`: Region
- `delivery_address.country`: Country
- `delivery_address.country.id`: ID
- `delivery_address.country.displayed_as`: Name
- `delivery_address.country_group`: Country Group
- `delivery_address.country_group.id`: ID
- `delivery_address.country_group.displayed_as`: Name
- `delivery_address.address_type`: Address Type
- `delivery_address.address_type.id`: ID
- `delivery_address.address_type.displayed_as`: Name
- `net_amount`: Net Amount (currency)
- `tax_amount`: Tax Amount (currency)
- `total_amount`: Total Amount (currency)
- `status`: Status
- `status.id`: ID
- `status.displayed_as`: Name
- `currency`: Currency
- `currency.id`: ID
- `currency.displayed_as`: Name
- `quote_lines`: Quote Lines
- `quote_lines[].id`: Line ID
- `quote_lines[].description`: Description
- `quote_lines[].product`: Product
- `quote_lines[].product.id`: ID
- `quote_lines[].product.displayed_as`: Name
- `quote_lines[].ledger_account`: Ledger Account
- `quote_lines[].ledger_account.id`: ID
- `quote_lines[].ledger_account.displayed_as`: Name
- `quote_lines[].quantity`: Quantity (number)
- `quote_lines[].unit_price`: Unit Price (currency)
- `quote_lines[].tax_rate`: Tax Rate
- `quote_lines[].tax_rate.id`: ID
- `quote_lines[].tax_rate.displayed_as`: Name
- `quote_lines[].net_amount`: Net Amount (currency)
- `quote_lines[].tax_amount`: Tax Amount (currency)
- `quote_lines[].discount_amount`: Discount Amount (currency)
- `quote_lines[].total_amount`: Total Amount (currency)
- `quote_lines[].eu_goods_services_type`: EU Goods or Services Type
- `quote_lines[].eu_goods_services_type.id`: ID
- `quote_lines[].eu_goods_services_type.displayed_as`: Name

### `find_sales_quote`

**Find Sales Quote.** Search Sage Accounting sales quotes by customer, quote number (partial match), status, or quote date range. Returns zero or more matches. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer` | string | no |  | Customer. Only return invoices billed to this customer. A value the product loads from the provider, such as an id; write the value itself. |
| `search` | string | no |  | Quote Number contains. |
| `status` | string | no |  | Status. Only return invoices with this status, e.g. "Paid" or "Overdue". A value the product loads from the provider, such as an id; write the value itself. |
| `dateRange` | object | no |  | Quote Date. Only return quotes dated within this range. |
| `updatedOrCreatedSince` | ISO date-time string | no |  | Updated or Created Since. Only return quotes changed since this date/time. |
| `maxResults` | number | no | `10` | Max results. |

Output fields:

- `[].id`: Sales Quote ID
- `[].reference`: Reference
- `[].notes`: Notes
- `[].date`: Date (date)
- `[].expiry_date`: Expiry Date (date)
- `[].contact`: Customer
- `[].contact.id`: ID
- `[].contact.displayed_as`: Name
- `[].main_address`: Main Address
- `[].main_address.address_line_1`: Address Line 1
- `[].main_address.address_line_2`: Address Line 2
- `[].main_address.city`: City
- `[].main_address.postal_code`: Postal Code
- `[].main_address.region`: Region
- `[].main_address.country`: Country
- `[].main_address.country.id`: ID
- `[].main_address.country.displayed_as`: Name
- `[].main_address.country_group`: Country Group
- `[].main_address.country_group.id`: ID
- `[].main_address.country_group.displayed_as`: Name
- `[].main_address.address_type`: Address Type
- `[].main_address.address_type.id`: ID
- `[].main_address.address_type.displayed_as`: Name
- `[].delivery_address`: Delivery Address
- `[].delivery_address.address_line_1`: Address Line 1
- `[].delivery_address.address_line_2`: Address Line 2
- `[].delivery_address.city`: City
- `[].delivery_address.postal_code`: Postal Code
- `[].delivery_address.region`: Region
- `[].delivery_address.country`: Country
- `[].delivery_address.country.id`: ID
- `[].delivery_address.country.displayed_as`: Name
- `[].delivery_address.country_group`: Country Group
- `[].delivery_address.country_group.id`: ID
- `[].delivery_address.country_group.displayed_as`: Name
- `[].delivery_address.address_type`: Address Type
- `[].delivery_address.address_type.id`: ID
- `[].delivery_address.address_type.displayed_as`: Name
- `[].net_amount`: Net Amount (currency)
- `[].tax_amount`: Tax Amount (currency)
- `[].total_amount`: Total Amount (currency)
- `[].status`: Status
- `[].status.id`: ID
- `[].status.displayed_as`: Name
- `[].currency`: Currency
- `[].currency.id`: ID
- `[].currency.displayed_as`: Name
- `[].quote_lines`: Quote Lines
- `[].quote_lines[].id`: Line ID
- `[].quote_lines[].description`: Description
- `[].quote_lines[].product`: Product
- `[].quote_lines[].product.id`: ID
- `[].quote_lines[].product.displayed_as`: Name
- `[].quote_lines[].ledger_account`: Ledger Account
- `[].quote_lines[].ledger_account.id`: ID
- `[].quote_lines[].ledger_account.displayed_as`: Name
- `[].quote_lines[].quantity`: Quantity (number)
- `[].quote_lines[].unit_price`: Unit Price (currency)
- `[].quote_lines[].tax_rate`: Tax Rate
- `[].quote_lines[].tax_rate.id`: ID
- `[].quote_lines[].tax_rate.displayed_as`: Name
- `[].quote_lines[].net_amount`: Net Amount (currency)
- `[].quote_lines[].tax_amount`: Tax Amount (currency)
- `[].quote_lines[].discount_amount`: Discount Amount (currency)
- `[].quote_lines[].total_amount`: Total Amount (currency)
- `[].quote_lines[].eu_goods_services_type`: EU Goods or Services Type
- `[].quote_lines[].eu_goods_services_type.id`: ID
- `[].quote_lines[].eu_goods_services_type.displayed_as`: Name

### `find_ledger_account`

**Find Ledger Account.** Search Sage Accounting ledger accounts (chart of accounts) by nominal code or display name (partial match). Returns zero or more matches. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Nominal Code or Display Name contains. |
| `updatedOrCreatedSince` | ISO date-time string | no |  | Updated or Created Since. Only return ledger accounts changed since this date/time. |
| `maxResults` | number | no | `10` | Max results. |

Output fields:

- `[].id`: Ledger Account ID
- `[].name`: Name
- `[].display_name`: Display Name
- `[].display_formatted`: Display Formatted
- `[].nominal_code`: Nominal Code (number)
- `[].ledger_account_type`: Ledger Account Type
- `[].ledger_account_type.id`: ID
- `[].ledger_account_type.displayed_as`: Name
- `[].ledger_account_group`: Ledger Account Group
- `[].ledger_account_group.id`: ID
- `[].ledger_account_group.displayed_as`: Name
- `[].ledger_account_classification`: Ledger Account Classification
- `[].ledger_account_classification.id`: ID
- `[].ledger_account_classification.displayed_as`: Name
- `[].tax_rate`: Tax Rate
- `[].tax_rate.id`: ID
- `[].tax_rate.displayed_as`: Name
- `[].included_in_chart`: Included In Chart (boolean)
- `[].is_control_account`: Is Control Account (boolean)

### `custom_api_call`

**Custom API Call.** Make a custom API call to a specific endpoint. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `method` | string | yes | `"GET"` | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `headers` | object | no |  | Headers. Authorization headers are injected automatically from your connection. |
| `queryParams` | object | no |  | Query Parameters. Appended to the URL as ?key=value. |
| `body_type` | string | no | `"none"` | Body Type. One of `"none"`, `"json"`, `"form_data"`, `"raw"`. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary. Enable for files like PDFs, images, etc. |
| `failsafe` | boolean | no |  | Return Error as Output. On a failed request, output the error instead of failing the step. |
| `timeout` | number | no |  | Timeout. Seconds to wait for a response. Empty: up to the flow limit (10 min). |
| `followRedirects` | boolean | no | `false` | Follow redirects. Follow 3xx redirects instead of returning them as the response. |

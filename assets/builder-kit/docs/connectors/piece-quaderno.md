# Quaderno

Quaderno is a tax software that handles sales tax, VAT, and GST for your online business. Automatically calculates tax, sends receipts and invoices, and provides instant multi-channel tax reports for your sales around the world.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-quaderno'
  version: '0.1.0'
```

Categories: COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: API Key

> Quaderno API Key

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_name` | string | yes |  | Account Name. Your Quaderno account name https://<your_account_name>.quadernoapp.com/ (the subdomain part of your Quaderno URL) https://<your_account_name>.sandbox-quadernoapp.com/. |
| `api_key` | string | yes |  | API Key. Your Quaderno Private API Key. |

## Actions

### `createContact`

**Create Contact.** Creates a new contact (customer or vendor) in Quaderno via POST, capturing name, address, tax ID/status, and contact details. Use when an agent needs to register a party before billing or recording expenses against them. Requires first name and a 2-letter ISO country code; the Kind prop selects person vs. company. Not idempotent — each call creates another contact even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | yes |  | First Name. The contact's first name (required for person contacts) |
| `lastName` | string | no |  | Last Name. The contact's last name (optional) |
| `email` | string | no |  | Email. The contact's email address. |
| `fullName` | string | no |  | Full Name. The contact's full name. |
| `kind` | string | no |  | Kind. The type of contact. One of `"person"`, `"company"`. |
| `country` | string | yes |  | Country. 2-letter ISO country code (e.g., US, GB) |
| `city` | string | no |  | City. City/District/Suburb/Town/Village. |
| `postalCode` | string | no |  | Postal Code. ZIP or postal code. |
| `region` | string | no |  | Region/State. State/Province/Region. |
| `streetLine1` | string | no |  | Street Address Line 1. Street address or PO Box. |
| `streetLine2` | string | no |  | Street Address Line 2. Apartment/Suite/Unit/Building. |
| `taxId` | string | no |  | Tax ID. Tax identification number (VAT, ABN, etc.) |
| `taxStatus` | string | no |  | Tax Status. Tax status of the contact. One of `"taxable"`, `"exempt"`, `"reverse"`. |
| `language` | string | no |  | Language. 2-letter ISO language code (e.g., EN, FR, ES) |
| `phone` | string | no |  | Phone. The contact's phone number. |
| `website` | string | no |  | Website. The contact's website URL. |
| `discount` | number | no |  | Discount. Default discount for this contact (as a percentage) |
| `notes` | string | no |  | Notes. Internal notes about the contact. |
| `processorId` | string | no |  | Processor ID. The ID assigned by an external payment processor (e.g., Stripe customer ID) |
| `processor` | string | no |  | Processor. The external platform where the contact was imported from (e.g., stripe) |

### `findContact`

**Find Contact.** Looks up contacts in Quaderno via GET. With a search query it filters contacts by name, email, or tax ID; left empty it lists all contacts (capped by the results limit). Use to resolve a contact before referencing it or to check whether one already exists. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchQuery` | string | no |  | Search Query. Search for contacts by name, email, or tax ID (optional) |
| `processorId` | string | no |  | Processor ID. Filter by processor ID (optional) |
| `limit` | number | no | `25` | Results Limit. Maximum number of results to return (default: 25, max: 100) |

### `createExpense`

**Create Expense.** Records a new expense in Quaderno via POST, embedding the vendor contact and a single line item (description, quantity, unit cost) along with currency, issue date, and payment method. Use when an agent needs to log a purchase or bill. Requires issue date, currency, vendor first name/country, item details, payment method, and expense country. Not idempotent — each call creates another expense. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueDate` | string | yes |  | Issue Date. Date when the expense was issued (YYYY-MM-DD) |
| `currency` | string | yes |  | Currency. 3-letter ISO currency code (USD, EUR, GBP, etc.) |
| `contactFirstName` | string | yes |  | Vendor First Name. The vendor's first name. |
| `contactLastName` | string | no |  | Vendor Last Name. The vendor's last name (optional for person contacts) |
| `contactEmail` | string | no |  | Vendor Email. The vendor's email address. |
| `contactCountry` | string | yes |  | Vendor Country. 2-letter ISO country code (e.g., US, GB) |
| `itemDescription` | string | yes |  | Item Description. Description of the expense item. |
| `itemQuantity` | number | yes |  | Item Quantity. Quantity of the expense item. |
| `itemUnitCost` | string | yes |  | Item Unit Cost. Unit cost of the expense item. |
| `paymentMethod` | string | yes |  | Payment Method. How the expense was paid. One of `"credit_card"`, `"cash"`, `"wire_transfer"`, `"direct_debit"`, `"check"`, `"iou"`, `"paypal"`, `"other"`. |
| `country` | string | yes |  | Expense Country. 2-letter ISO country code for the expense location. |
| `poNumber` | string | no |  | Purchase Order Number. Purchase order number (optional) |
| `tagList` | string | no |  | Tags. Tags for the expense, separated by commas. |
| `notes` | string | no |  | Notes. Additional notes about the expense. |

### `createInvoice`

**Create Invoice.** Issues a new invoice in Quaderno via POST, embedding the customer contact and a single line item (description, quantity, unit cost) with currency and issue date, plus optional invoice number, due date, and tags. Use when an agent needs to bill a customer. Requires issue date, currency, customer first name, and item details. Not idempotent — each call creates another invoice even if the invoice number repeats. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueDate` | string | yes |  | Issue Date. Date when the invoice was issued (YYYY-MM-DD) |
| `currency` | string | yes |  | Currency. 3-letter ISO currency code (USD, EUR, GBP, etc.) |
| `invoiceNumber` | string | no |  | Invoice Number. A unique, sequential code that identifies the invoice. |
| `dueDate` | string | no |  | Due Date. Date on which payment for this invoice is due (YYYY-MM-DD) |
| `customerFirstName` | string | yes |  | Customer First Name. The customer's first name. |
| `customerLastName` | string | no |  | Customer Last Name. The customer's last name. |
| `customerEmail` | string | no |  | Customer Email. The customer's email address. |
| `customerCountry` | string | no |  | Customer Country. 2-letter ISO country code (e.g., US, GB) |
| `itemDescription` | string | yes |  | Item Description. Description of the invoice line item. |
| `itemQuantity` | number | yes |  | Item Quantity. Quantity of the invoice item. |
| `itemUnitCost` | string | yes |  | Item Unit Cost. Unit cost of the invoice item. |
| `poNumber` | string | no |  | PO Number. Purchase order number. |
| `tagList` | string | no |  | Tags. Tags attached to the invoice (comma-separated) |
| `notes` | string | no |  | Notes. Extra notes about the invoice. |

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

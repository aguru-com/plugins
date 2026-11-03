# Bokio

Bokio is an accounting software platform which offers digital bookkeeping, invoicing, and financial management tools to help simplify accounting processes.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bokio'
  version: '0.1.0'
```

Categories: ACCOUNTING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Bokio API Key

> Bokio API Key is required to authenticate requests to Bokio

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company ID. Enter your Bokio Company ID. |
| `api_key` | string | yes |  | API Key. Enter your Bokio API Key. |

## Actions

### `createCustomer`

**Create Customer.** Creates a new customer record in a Bokio accounting company. Use to register a person or company before invoicing them; only customer name and type (individual/company) are required, with optional VAT/org number, contact, and address details. Not idempotent — each call creates a separate customer. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerName` | string | yes |  | Customer Name. Name of the customer. |
| `type` | string | yes |  | Customer Type. Type of the customer. One of `"private"`, `"company"`. |
| `vatNumber` | string | no |  | VAT Number. Customer VAT number. |
| `orgNumber` | string | no |  | Organization Number. Customer organization number. |
| `paymentTerms` | string | no |  | Payment Terms. Payment terms for the customer. Payment terms for the invoices. Payment terms can both take free text or days, in digits, until the payment is due. |
| `customerNumber` | string | no |  | Customer Number. Customer number (optional) |
| `email` | string | no |  | Email. Customer email address. |
| `phone` | string | no |  | Phone. Customer phone number. |
| `lin1` | string | no |  | Address line 1. Customer address line 1. |
| `line2` | string | no |  | Address line 2. Customer address line 2. |
| `zipCode` | string | no |  | Zip Code. Customer zip code. |
| `city` | string | no |  | City. Customer city. |
| `country` | string | no |  | Country. Customer country (ISO 3166-1 alpha-2 country code) |

### `createInvoice`

**Create Invoice.** Creates a new draft invoice in a Bokio company with a single line item. Use to start a new customer invoice; invoice date, due date, and item type are required, and the customer is linked by passing the customer UUID. Not idempotent — each call creates a separate draft invoice. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceType` | string | no |  | Invoice Type. Type of invoice. One of `"invoice"`, `"cashInvoice"`. |
| `customerRef` | string | no |  | Customer ID. UUID of the customer. |
| `invoiceDate` | string | yes |  | Invoice Date. Invoice date (YYYY-MM-DD) |
| `dueDate` | string | yes |  | Due Date. Due date (YYYY-MM-DD) |
| `orderNumberReference` | string | no |  | Order Number Reference. The order number associated with the invoice. |
| `currency` | string | no |  | Currency. ISO 4217 currency code (e.g., SEK, EUR, USD) |
| `currencyRate` | number | no |  | Currency Rate. Currency rate (defaults to 1) |
| `itemType` | string | yes |  | Item Type. Type of the line item. One of `"salesItem"`, `"descriptionOnlyItem"`. |
| `dynamicProps` | object | no |  | Item Details. Configure item details based on item type. An object whose fields depend on other inputs; the product shows them. |

### `addLineItemToInvoice`

**Add line item to invoice.** Appends a single line item to an existing draft invoice in Bokio, identified by invoice ID. Use to add a product, service, or description-only row to an invoice that already exists; pricing fields apply only when item type is a sales item. Not idempotent — each call appends another line item. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice. Select the invoice. A value the product loads from the provider, such as an id; write the value itself. |
| `itemType` | string | yes |  | Item Type. Type of the item. One of `"salesItem"`, `"descriptionOnlyItem"`. |
| `dynamicProps` | object | no |  | Item Details. Configure item details based on item type. An object whose fields depend on other inputs; the product shows them. |

### `createAnItem`

**Create an item.** Creates a new reusable item (a sales item with pricing, or a text item) in a Bokio company catalog. Use to define a product or service that can later be referenced on invoices; item type is required. Not idempotent — each call creates a separate item. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemType` | string | yes |  | Item Type. Type of the item. One of `"salesItem"`, `"text"`. |
| `dynamicProps` | object | no |  | Item Details. Configure item details based on item type. An object whose fields depend on other inputs; the product shows them. |

### `createAJournalEntry`

**Create a journal entry.** Records a new bookkeeping journal entry in a Bokio company, posting debit/credit amounts against account numbers. Use for manual double-entry transactions; the entry date is required and items carry the per-account debit/credit lines. Not idempotent — each call posts a separate journal entry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | no |  | Title. Title of the journal entry. |
| `date` | string | yes |  | Date. Journal entry date (YYYY-MM-DD) |
| `items` | array | no |  | Items (JSON). Journal entry items as JSON array. Each item should have: account (account number), debit (optional), credit (optional) Each item: { `account`?, `debit`?, `credit`? }. |

### `updateAnInvoice`

**Update an invoice.** Updates an existing draft invoice in Bokio, identified by invoice ID, replacing fields such as type, customer, dates, currency, and the full line-items list (passed as a JSON array). Use to modify an invoice that already exists rather than create one. Idempotent — repeating the same update yields the same invoice state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice. Select the invoice. A value the product loads from the provider, such as an id; write the value itself. |
| `invoiceType` | string | no |  | Invoice Type. Type of invoice. One of `"invoice"`, `"cashInvoice"`. |
| `customerRef` | string | no |  | Customer ID. UUID of the customer. |
| `invoiceDate` | string | yes |  | Invoice Date. Invoice date (YYYY-MM-DD) |
| `dueDate` | string | yes |  | Due Date. Due date (YYYY-MM-DD) |
| `orderNumberReference` | string | no |  | Order Number Reference. The order number associated with the invoice. |
| `currency` | string | no |  | Currency. ISO 4217 currency code (e.g., SEK, EUR, USD) |
| `currencyRate` | number | no |  | Currency Rate. Currency rate. |
| `lineItemsJson` | string | no |  | Line Items (JSON). Line items as JSON array. Each item should have: itemRef (object with id), description, quantity, unitPrice, unit, itemType (PRODUCT or SERVICE), vat. |

### `findCustomer`

**Find Customer.** Lists customers in a Bokio company with pagination, optionally filtered by name, type, VAT number, or organization number. Leaving the filter empty returns all customers; supplying a filter type and value narrows to matching records. Use to look up a customer or their ID. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filterType` | string | no |  | Filter Type. Type of filter to use. One of `"name"`, `"type"`, `"vatNumber"`, `"orgNumber"`. |
| `filterValue` | string | no |  | Filter Value. Value to filter by. |
| `page` | number | no |  | Page. Page number (defaults to 1) |
| `pageSize` | number | no |  | Page Size. Number of items per page (max 100, defaults to 25) |

### `getDraftInvoiceByCustomerName`

**Get Draft Invoice by Customer Name.** Looks up a Bokio customer by exact name and returns their draft invoices with pagination. Use when you have a customer name (not an ID) and want their pending draft invoices; returns an empty result if no customer matches. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerName` | string | yes |  | Customer Name. Name of the customer to find draft invoices for. |
| `page` | number | no |  | Page. Page number (defaults to 1) |
| `pageSize` | number | no |  | Page Size. Number of items per page (max 100, defaults to 25) |

### `getAnInvoice`

**Get an invoice.** Retrieves a single invoice from a Bokio company by its invoice ID. Use when you already have the invoice ID and need its full details. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice ID. The ID of the invoice to retrieve. |

### `getAJournalEntry`

**Get a journal entry.** Retrieves a single journal entry from a Bokio company by its UUID. Use when you already have the journal entry ID and need its full bookkeeping details. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `journalEntryId` | string | yes |  | Journal Entry ID. UUID of the journal entry. |

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

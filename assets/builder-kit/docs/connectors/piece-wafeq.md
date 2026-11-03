# Wafeq

Cloud accounting software for invoicing, bills, expenses, and tax reporting (ZATCA, UAE FTA).

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-wafeq'
  version: '0.1.0'
```

Categories: ACCOUNTING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> **How to get your Wafeq API Key:**
>
> 1. Log in to your [Wafeq account](https://app.wafeq.com/accounts/signup/).
> 2. In the left-side menu, open the **Developer** section and click **API Keys**.
> 3. Click **Create new key** and copy the key — you won't be able to see it again.
> 4. Click **Enable API**. The API is available on the **Starter plan** or higher (including free trials).
> 5. Paste the key below.

## Actions

### `create_invoice`

**Create Invoice.** Creates a sales (B2B) invoice in Wafeq for a customer contact, with line items, currency, tax handling, and a status (Draft/Sent/Finalized). Choose this for standard customer billing; use Create Simplified Invoice for retail/walk-in sales and Create Quote for estimates. Requires an existing contact ID and a unique invoice_number (reusing one is rejected). Not idempotent — each call posts a new invoice. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | string | yes |  | Customer. Who are you billing? Pick from your Wafeq contacts. A value the product loads from the provider, such as an id; write the value itself. |
| `invoice_number` | string | yes |  | Invoice Number. A unique number for this invoice (e.g. INV-2024-001). If you reuse a number, Wafeq will reject the invoice. |
| `invoice_date` | ISO date-time string | yes |  | Invoice Date. The date shown on the invoice. Usually today. |
| `invoice_due_date` | ISO date-time string | yes |  | Due Date. The date you expect to be paid by. |
| `currency` | string | yes |  | Currency. Which currency the amounts below are in. Pick AED for UAE, SAR for Saudi Arabia, or any other currency you invoice in. One of `"AED"`, `"SAR"`, `"USD"`, `"EUR"`, `"GBP"`, `"QAR"`, `"KWD"`, `"BHD"`, `"OMR"`, `"JOD"`, `"EGP"`, `"TRY"`, `"INR"`, `"CNY"`, `"JPY"`, `"CAD"`, `"AUD"`. |
| `default_account` | string | yes |  | Default Sales Account. Where the money from this invoice is booked (e.g. "Sales Revenue"). This is applied to every line item unless you override it on a specific line. A value the product loads from the provider, such as an id; write the value itself. |
| `default_tax_rate` | string | no |  | Default Tax Rate. Tax applied to every line by default (e.g. "VAT 15%"). Leave blank if this invoice has no tax. A value the product loads from the provider, such as an id; write the value itself. |
| `line_items` | array | yes |  | Line Items. Add one row for each product or service on the document. Each row needs at least a description, quantity, and unit price. Leave the account and tax fields blank to use the defaults you set above. Each item: { `description`, `quantity`, `unit_amount`, `item`?, `account`?, `tax_rate`?, `discount`? }. |
| `prices_include_tax` | string | no | `"TAX_EXCLUSIVE"` | Do the prices above include tax?. If you already baked tax into the unit prices, pick "Yes". If tax should be added on top of the prices, pick "No". Most B2B invoices use "No". One of `"TAX_EXCLUSIVE"`, `"TAX_INCLUSIVE"`. |
| `status` | string | no | `"DRAFT"` | Status. Draft = still editable, not posted to your books yet. Sent = emailed to the customer. Finalized = locked and posted to your books. Start with Draft if unsure. One of `"DRAFT"`, `"SENT"`, `"FINALIZED"`. |
| `language` | string | no | `"en"` | Printed Language. Language used on the PDF invoice sent to the customer. One of `"en"`, `"ar"`. |
| `reference` | string | no |  | Reference. Optional text printed on the invoice (e.g. a project name or the customer's PO number). |
| `notes` | string | no |  | Notes / Message to Customer. Optional notes printed at the bottom of the invoice (e.g. payment instructions, thank-you note). |
| `external_id` | string | no |  | Your Reference ID. Optional. Store an ID from another system here (e.g. the order number from your online store) so you can find this record in Wafeq later. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. If the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `report_invoice_to_tax_authority`

**Report Invoice to Tax Authority.** Submits an already-finalized Wafeq invoice to the government tax authority (ZATCA in Saudi Arabia, FTA in UAE) for e-invoicing compliance. Choose this after an invoice has been created and moved to Finalized status; it will fail on draft invoices. Requires the invoice ID. Not idempotent — it is a reporting submission against the external authority. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice` | string | yes |  | Invoice. Pick which invoice to submit. ⚠️ The invoice must be in "Finalized" status first — if you just created it as a Draft, change its status to Finalized in Wafeq before running this action. A value the product loads from the provider, such as an id; write the value itself. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. If the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `create_contact`

**Create Contact.** Creates a contact (customer, supplier, or both) in Wafeq. Choose this when an invoice/bill needs a contact that does not exist yet; run Find Contact first to avoid duplicates, since this does not de-duplicate. Only name and relationship are required; tax_registration_number is needed for tax-compliant B2B documents. Not idempotent — each call creates a new contact. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The business name (for companies) or full name (for individuals). This is what appears on invoices and bills. |
| `relationship` | array | yes | `["CUSTOMER"]` | Type of Contact. Pick "Customer" if you sell to them, "Supplier" if you buy from them, or both if they're on both sides. One of `"CUSTOMER"`, `"SUPPLIER"`. |
| `email` | string | no |  | Email. Where to send invoices and other documents. Optional but recommended — Wafeq can email invoices directly. |
| `phone` | string | no |  | Phone. Main phone number. |
| `tax_registration_number` | string | no |  | VAT / Tax Number. The contact's VAT registration number (also called TRN in UAE, TIN in some countries). Required for tax-compliant B2B invoices — leave blank for individuals. |
| `country` | string | no |  | Country Code. Two-letter ISO country code: AE = UAE, SA = Saudi Arabia, US = United States, GB = UK, etc. |
| `city` | string | no |  | City. The city name. |
| `address` | string | no |  | Street Address. Street / building address. This appears on printed invoices. |
| `postal_code` | string | no |  | Postal / ZIP Code. The postal code. Must be exactly 5 digits for Saudi Arabia addresses. |
| `external_id` | string | no |  | Your Customer ID. Optional. Store an ID from another system here (e.g. the order number from your online store) so you can find this record in Wafeq later. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. If the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `find_contact`

**Find Contact.** Searches your Wafeq contacts by name, email, phone, or tax number. Choose this to look up a contact ID before creating an invoice/bill, or to check whether a customer already exists. Leaving the search keyword blank lists all contacts (a fetch-all mode); supply a keyword, relationship filter, or external_id to narrow results. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `keyword` | string | no |  | Search For. Type what you're looking for — part of a name, email, phone number, or tax number works. Leave blank to list all contacts. |
| `relationship` | string | no |  | Type of Contact. Only show customers, only suppliers, or both. One of `""`, `"CUSTOMER"`, `"SUPPLIER"`. |
| `external_id` | string | no |  | Your Reference ID (optional). If you stored a reference ID when creating the contact (e.g. your CRM's customer ID), enter it here for an exact match. |
| `limit` | number | no | `50` | Max Results. How many contacts to return at most. Default is 50, maximum is 200. |

### `create_bill`

**Create Bill.** Records a supplier bill (accounts payable) in Wafeq with line items, an expense account, currency, and tax handling, in Draft or Authorized status. Choose this for vendor invoices you owe, as opposed to Create Invoice for money customers owe you. Requires an existing supplier contact ID and a bill_number unique per supplier. Not idempotent — each call creates a new bill. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | string | yes |  | Supplier. Who sent you this bill? Pick from your Wafeq contacts. A value the product loads from the provider, such as an id; write the value itself. |
| `bill_number` | string | yes |  | Bill Number. The invoice number printed on the supplier's bill (so you can match it later). Must be unique per supplier in your Wafeq org. |
| `bill_date` | ISO date-time string | yes |  | Bill Date. The date printed on the supplier's bill. |
| `bill_due_date` | ISO date-time string | yes |  | Due Date. The date you need to pay this bill by. |
| `currency` | string | yes |  | Currency. Which currency the amounts below are in. Pick AED for UAE, SAR for Saudi Arabia, or any other currency you invoice in. One of `"AED"`, `"SAR"`, `"USD"`, `"EUR"`, `"GBP"`, `"QAR"`, `"KWD"`, `"BHD"`, `"OMR"`, `"JOD"`, `"EGP"`, `"TRY"`, `"INR"`, `"CNY"`, `"JPY"`, `"CAD"`, `"AUD"`. |
| `default_account` | string | yes |  | Default Expense Account. Where this cost is booked in your books (e.g. "Office Supplies", "Software Subscriptions"). Applied to every line item unless you override it on a specific line. A value the product loads from the provider, such as an id; write the value itself. |
| `default_tax_rate` | string | no |  | Default Tax Rate. Tax applied to every line by default (e.g. "VAT 15% on purchases"). Leave blank if no tax. A value the product loads from the provider, such as an id; write the value itself. |
| `line_items` | array | yes |  | Line Items. Add one row for each product or service on the document. Each row needs at least a description, quantity, and unit price. Leave the account and tax fields blank to use the defaults you set above. Each item: { `description`, `quantity`, `unit_amount`, `item`?, `account`?, `tax_rate`?, `discount`? }. |
| `prices_include_tax` | string | no | `"TAX_EXCLUSIVE"` | Do the prices above include tax?. If the supplier's prices already include tax, pick "Yes". If tax should be added on top, pick "No". One of `"TAX_EXCLUSIVE"`, `"TAX_INCLUSIVE"`. |
| `status` | string | no | `"DRAFT"` | Status. Draft = still editable, not in your books yet. Authorized = approved and posted to your books. Start with Draft if unsure. One of `"DRAFT"`, `"AUTHORIZED"`. |
| `reference` | string | no |  | Reference. Optional free text (e.g. project name, department). |
| `order_number` | string | no |  | Your PO Number. Optional. The purchase order number from your own system, if you issued one. |
| `notes` | string | no |  | Internal Notes. Optional notes visible in Wafeq. Not printed on anything and not shared with the supplier. |
| `external_id` | string | no |  | Your Reference ID. Optional. Store an ID from another system here (e.g. the order number from your online store) so you can find this record in Wafeq later. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. If the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `record_payment`

**Record Payment.** Records a payment in Wafeq and applies it against a document. A "payment for" selector switches the target between a single invoice, bill, or credit note picked from a list, or an Advanced mode that splits one payment across multiple documents by ID. Choose this to settle or partially settle amounts owed; requires the amount, currency, and the bank/cash/card account the money moved through. Not idempotent — each call posts a new payment. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_for` | string | yes | `"invoice"` | What is this payment for?. Pick what the money was used to pay. "Advanced" lets you split a single payment across multiple invoices or bills. One of `"invoice"`, `"bill"`, `"credit_note"`, `"advanced"`. |
| `target` | object | yes |  | Paying. An object whose fields depend on other inputs; the product shows them. |
| `amount` | number | yes |  | Total Amount Paid. The full amount of the payment, including any fees. For a simple single-document payment, this should match the unpaid balance. |
| `amount_to_pcy` | number | yes |  | Amount in Company Currency. The amount in the payment currency. Must be greater than zero. |
| `currency` | string | yes |  | Currency. Which currency the amounts below are in. Pick AED for UAE, SAR for Saudi Arabia, or any other currency you invoice in. One of `"AED"`, `"SAR"`, `"USD"`, `"EUR"`, `"GBP"`, `"QAR"`, `"KWD"`, `"BHD"`, `"OMR"`, `"JOD"`, `"EGP"`, `"TRY"`, `"INR"`, `"CNY"`, `"JPY"`, `"CAD"`, `"AUD"`. |
| `date` | ISO date-time string | yes |  | Payment Date. When the payment was made or received. Use the date on your bank statement. |
| `paid_through_account` | string | yes |  | Paid Through Account. Which bank, cash, or card account the money moved through. Only payment-enabled accounts are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `contact` | string | no |  | Contact (optional). Optional. The customer or supplier this payment is with. Usually auto-detected from the document. A value the product loads from the provider, such as an id; write the value itself. |
| `payment_fees` | number | no |  | Payment Fees (optional). Optional. Any bank or card processing fees deducted from the payment (e.g. Stripe fee). Leave blank if none. |
| `payment_fees_account` | string | no |  | Fees Account. Only needed if you entered Payment Fees above. Pick the expense account the fees are booked to (e.g. "Bank Charges"). A value the product loads from the provider, such as an id; write the value itself. |
| `reference` | string | no |  | Reference. Optional. A bank transaction ID or any note you want to attach. |
| `external_id` | string | no |  | Your Reference ID. Optional. Store an ID from another system here (e.g. the order number from your online store) so you can find this record in Wafeq later. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. If the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `create_simplified_invoice`

**Create Simplified Invoice.** Creates a simplified (retail/B2C) tax invoice in Wafeq for walk-in or over-the-counter sales, especially under Saudi ZATCA rules. Choose this for point-of-sale receipts where the customer is optional; use Create Invoice for B2B sales to a named contact. Requires line items and the account the money was received into; invoice_number can be auto-generated. Not idempotent — each call creates a new invoice. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice_date` | ISO date-time string | yes |  | Sale Date. The date the sale happened. Usually today. |
| `currency` | string | yes |  | Currency. Which currency the amounts below are in. Pick AED for UAE, SAR for Saudi Arabia, or any other currency you invoice in. One of `"AED"`, `"SAR"`, `"USD"`, `"EUR"`, `"GBP"`, `"QAR"`, `"KWD"`, `"BHD"`, `"OMR"`, `"JOD"`, `"EGP"`, `"TRY"`, `"INR"`, `"CNY"`, `"JPY"`, `"CAD"`, `"AUD"`. |
| `paid_through_account` | string | yes |  | Where was the money received?. Pick the bank, cash drawer, or POS account the customer paid into. Only payment-enabled accounts are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `default_account` | string | yes |  | Default Sales Account. Where the sale is booked (e.g. "Sales Revenue"). Applied to every line unless overridden. A value the product loads from the provider, such as an id; write the value itself. |
| `default_tax_rate` | string | no |  | Default Tax Rate. Tax applied to every line by default (e.g. "VAT 15%"). A value the product loads from the provider, such as an id; write the value itself. |
| `line_items` | array | yes |  | Line Items. Add one row for each product or service on the document. Each row needs at least a description, quantity, and unit price. Leave the account and tax fields blank to use the defaults you set above. Each item: { `description`, `quantity`, `unit_amount`, `item`?, `account`?, `tax_rate`?, `discount`? }. |
| `prices_include_tax` | string | no | `"TAX_INCLUSIVE"` | Do the prices above include tax?. Retail prices almost always include tax, so "Yes" is recommended. One of `"TAX_INCLUSIVE"`, `"TAX_EXCLUSIVE"`. |
| `contact` | string | no |  | Customer (optional). Optional. Most simplified invoices are for walk-in customers and leave this blank. A value the product loads from the provider, such as an id; write the value itself. |
| `invoice_number` | string | no |  | Invoice Number (optional). Leave blank to let Wafeq auto-generate one. |
| `status` | string | no | `"PAID"` | Status. Paid = the sale is complete. Draft = not posted to books yet. One of `"PAID"`, `"DRAFT"`. |
| `language` | string | no | `"en"` | Printed Language. One of `"en"`, `"ar"`. |
| `reference` | string | no |  | Reference. Optional free text shown on the invoice. |
| `notes` | string | no |  | Notes. Optional notes printed on the invoice. |
| `external_id` | string | no |  | Your Reference ID. Optional. Store an ID from another system here (e.g. the order number from your online store) so you can find this record in Wafeq later. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. If the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `create_credit_note`

**Create Credit Note.** Issues a customer credit note in Wafeq to refund, correct an overcharge, or reverse goods, reducing what the customer owes. Choose this to credit back against an earlier sale rather than create a new charge. Requires an existing customer contact ID, line items, and a unique credit_note_number. Not idempotent — each call creates a new credit note. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | string | yes |  | Customer. Which customer is the credit note for? A value the product loads from the provider, such as an id; write the value itself. |
| `credit_note_number` | string | yes |  | Credit Note Number. A unique number for this credit note (e.g. CN-2024-001). |
| `credit_note_date` | ISO date-time string | yes |  | Credit Note Date. The date shown on the credit note. Usually today. |
| `currency` | string | yes |  | Currency. Which currency the amounts below are in. Pick AED for UAE, SAR for Saudi Arabia, or any other currency you invoice in. One of `"AED"`, `"SAR"`, `"USD"`, `"EUR"`, `"GBP"`, `"QAR"`, `"KWD"`, `"BHD"`, `"OMR"`, `"JOD"`, `"EGP"`, `"TRY"`, `"INR"`, `"CNY"`, `"JPY"`, `"CAD"`, `"AUD"`. |
| `default_account` | string | yes |  | Default Sales Account. The sales account the credit reverses against (usually the same account the original invoice posted to). Applied to every line unless overridden per line. A value the product loads from the provider, such as an id; write the value itself. |
| `default_tax_rate` | string | no |  | Default Tax Rate. Tax applied to every line by default. Leave blank for no tax. A value the product loads from the provider, such as an id; write the value itself. |
| `line_items` | array | yes |  | Line Items. Add one row for each product or service on the document. Each row needs at least a description, quantity, and unit price. Leave the account and tax fields blank to use the defaults you set above. Each item: { `description`, `quantity`, `unit_amount`, `item`?, `account`?, `tax_rate`?, `discount`? }. |
| `prices_include_tax` | string | no | `"TAX_EXCLUSIVE"` | Do the prices above include tax?. One of `"TAX_EXCLUSIVE"`, `"TAX_INCLUSIVE"`. |
| `status` | string | no | `"DRAFT"` | Status. Draft = still editable. Sent = marked as sent to the customer. Finalized = locked and posted to your books. One of `"DRAFT"`, `"SENT"`, `"FINALIZED"`. |
| `language` | string | no | `"en"` | Printed Language. One of `"en"`, `"ar"`. |
| `reference` | string | no |  | Reference. Optional text shown on the credit note (e.g. the original invoice number this refunds). |
| `notes` | string | no |  | Notes / Message to Customer. Optional notes printed on the credit note (e.g. reason for the credit). |
| `external_id` | string | no |  | Your Reference ID. Optional. Store an ID from another system here (e.g. the order number from your online store) so you can find this record in Wafeq later. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. If the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `create_quote`

**Create Quote.** Creates a customer quote/estimate in Wafeq with line items, currency, and tax handling, in Draft or Sent status. Choose this to propose pricing before billing; once accepted, turn it into an invoice with Convert Quote to Invoice rather than re-keying. Requires an existing customer contact ID and a unique quote_number. Not idempotent — each call creates a new quote. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | string | yes |  | Customer. Who is the quote for? A value the product loads from the provider, such as an id; write the value itself. |
| `quote_number` | string | yes |  | Quote Number. A unique number for this quote (e.g. QT-2024-001). Must not reuse an existing quote number. |
| `quote_date` | ISO date-time string | yes |  | Quote Date. The date shown on the quote. Usually today. |
| `currency` | string | yes |  | Currency. Which currency the amounts below are in. Pick AED for UAE, SAR for Saudi Arabia, or any other currency you invoice in. One of `"AED"`, `"SAR"`, `"USD"`, `"EUR"`, `"GBP"`, `"QAR"`, `"KWD"`, `"BHD"`, `"OMR"`, `"JOD"`, `"EGP"`, `"TRY"`, `"INR"`, `"CNY"`, `"JPY"`, `"CAD"`, `"AUD"`. |
| `default_account` | string | yes |  | Default Sales Account. Where the revenue is booked when this quote becomes an invoice. Applied to every line unless overridden per line. A value the product loads from the provider, such as an id; write the value itself. |
| `default_tax_rate` | string | no |  | Default Tax Rate. Tax applied to every line by default. Leave blank for no tax. A value the product loads from the provider, such as an id; write the value itself. |
| `line_items` | array | yes |  | Line Items. Add one row for each product or service on the document. Each row needs at least a description, quantity, and unit price. Leave the account and tax fields blank to use the defaults you set above. Each item: { `description`, `quantity`, `unit_amount`, `item`?, `account`?, `tax_rate`?, `discount`? }. |
| `prices_include_tax` | string | no | `"TAX_EXCLUSIVE"` | Do the prices above include tax?. Pick "Yes" if the prices already include tax, "No" if tax should be added on top. One of `"TAX_EXCLUSIVE"`, `"TAX_INCLUSIVE"`. |
| `status` | string | no | `"DRAFT"` | Status. Draft = still editable. Sent = marked as sent to the customer. Start with Draft if unsure. One of `"DRAFT"`, `"SENT"`. |
| `language` | string | no | `"en"` | Printed Language. Language used on the quote PDF. One of `"en"`, `"ar"`. |
| `purchase_order` | string | no |  | Customer's PO Number. Optional. If the customer sent you a purchase order number, enter it here so it appears on the quote. |
| `reference` | string | no |  | Reference. Optional free text shown on the quote (e.g. project name). |
| `notes` | string | no |  | Notes / Message to Customer. Optional notes printed at the bottom of the quote. |
| `external_id` | string | no |  | Your Reference ID. Optional. Store an ID from another system here (e.g. the order number from your online store) so you can find this record in Wafeq later. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. If the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `convert_quote_to_invoice`

**Convert Quote to Invoice.** Converts an existing accepted quote into a new invoice in Wafeq, copying the customer, line items, and totals. Choose this after a quote created via Create Quote is approved, instead of re-entering the data as a fresh invoice. Requires the quote ID. Not idempotent — each call generates a new invoice from the quote. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `quote` | string | yes |  | Quote. Pick the quote you want to convert into an invoice. A value the product loads from the provider, such as an id; write the value itself. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. If the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `download_invoice_pdf`

**Download Invoice PDF.** Fetches an existing Wafeq invoice as a PDF file for downstream use (email attachment, cloud storage, upload). Choose this when a flow needs the rendered invoice document rather than its data fields. Requires the invoice ID; the file name is optional. Read-only and idempotent — re-running downloads the invoice document again without changing anything in Wafeq (the PDF reflects the invoice as it stands at call time). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice` | string | yes |  | Invoice. Pick which invoice to download. A value the product loads from the provider, such as an id; write the value itself. |
| `file_name` | string | no |  | File Name (optional). What to call the downloaded PDF. Leave blank to use "invoice-<id>.pdf". The ".pdf" extension is added automatically if you don't include it. |

### `create_item`

**Create Item.** Creates a catalog item (product or service) in Wafeq with optional pricing, SKU, accounts, and inventory tracking, so it can be reused on invoices, bills, and quotes. Choose this to register a reusable item; only name is required. Not idempotent — each call adds a new catalog item. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. What the product or service is called (e.g. "Pro subscription", "Consulting hour"). This shows up in item pickers. |
| `description` | string | no |  | Description. Optional longer description used as the default line text when this item is added to an invoice. |
| `sku` | string | no |  | SKU / Product Code. Optional short code (e.g. "SUB-PRO-YR"). Useful if you also track the item in another system. |
| `unit_price` | number | no |  | Sale Price. How much you charge customers per unit. Used as the default on invoices and quotes. |
| `unit_cost` | number | no |  | Purchase Cost. How much you pay suppliers per unit. Used as the default on bills. |
| `revenue_account` | string | no |  | Sales Account ID (advanced). Advanced. The account ID sales of this item post to (e.g. "Sales Revenue"). Leave blank to use your org default. |
| `expense_account` | string | no |  | Cost Account ID (advanced). Advanced. The account ID purchases of this item post to. |
| `revenue_tax_rate` | string | no |  | Sales Tax Rate ID (advanced). Advanced. Tax rate ID applied when selling this item. Leave blank for no default tax. |
| `purchase_tax_rate` | string | no |  | Purchase Tax Rate ID (advanced). Advanced. Tax rate ID applied when buying this item. |
| `is_tracked_inventory` | boolean | no | `false` | Track Stock Levels?. Turn on for physical products where you want Wafeq to track inventory counts. Leave off for services and digital products. |
| `is_active` | boolean | no | `true` | Active. Active items can be added to new invoices. Turn off to hide the item from pickers without deleting it. |
| `external_id` | string | no |  | Your Product ID. Optional. Store an ID from another system here (e.g. the order number from your online store) so you can find this record in Wafeq later. |
| `idempotency_key` | string | no |  | Duplicate Protection Key. Advanced. If the flow retries this step, sending the same key prevents creating a duplicate. Most users can leave this blank. |

### `list_items`

**List Items.** Lists catalog items (products and services) from Wafeq, with optional filters for external_id and a created-date range. Choose this to export the catalog or look up item IDs; all filters are optional, so an unfiltered call returns the full catalog up to the result limit. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `external_id` | string | no |  | Your Reference ID (optional). Find a single item by the reference ID you stored when creating it (e.g. your Shopify product ID). |
| `created_after` | ISO date-time string | no |  | Created On or After. Only return items created on or after this date. |
| `created_before` | ISO date-time string | no |  | Created On or Before. Only return items created on or before this date. |
| `limit` | number | no | `50` | Max Results. How many items to return at most. Default is 50, maximum is 200. |

### `list_accounts`

**List Accounts.** Lists accounts from the Wafeq chart of accounts, optionally filtered by classification (Revenue/Expense/Asset/Liability/Equity), payment-enabled status, or external_id. Choose this to resolve the account IDs other actions require (e.g. a sales, expense, or bank account) or to export the chart of accounts. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `classification` | string | no |  | Account Type. Filter to one kind of account. Revenue = sales accounts, Expense = cost accounts, Asset = bank / inventory, Liability = loans / payables, Equity = owner's capital. One of `""`, `"REVENUE"`, `"EXPENSE"`, `"ASSET"`, `"LIABILITY"`, `"EQUITY"`. |
| `is_payment_enabled` | string | no |  | Payment-Enabled Only?. Payment-enabled accounts are the bank, cash, or card accounts you can receive or send money from. One of `""`, `"true"`, `"false"`. |
| `external_id` | string | no |  | Your Reference ID (optional). Return the single account matching this reference ID (if you've stored one). |
| `limit` | number | no | `100` | Max Results. How many accounts to return at most. Default is 100, maximum is 500. |

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

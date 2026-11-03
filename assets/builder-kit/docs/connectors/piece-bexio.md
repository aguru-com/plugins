# Bexio

Swiss business software for accounting, invoicing, and project management

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bexio'
  version: '0.2.1'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `create_manual_entry`

**Create Manual Entry.** Books a manual accounting entry in Bexio in one of three modes: a single debit/credit line, a compound entry distributing a total across several accounts, or a group of multiple complete bookings sharing one reference. Use to post journal entries directly to the ledger; requires a booking date and the entry lines for the chosen mode (account ids resolvable via Find Account). Not idempotent: each call posts new ledger bookings. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes | `"manual_single_entry"` | Entry Type. Choose the type of manual entry. One of `"manual_single_entry"`, `"manual_compound_entry"`, `"manual_group_entry"`. |
| `date` | string | yes |  | Booking Date. Date of the booking (YYYY-MM-DD) |
| `reference_nr` | string | no |  | Reference Number. Reference number for the booking. |
| `entryFields` | object | yes |  | Entry Details. Configure the entry details based on selected type. An object whose fields depend on other inputs; the product shows them. |

### `create_company`

**Create Company.** Creates a new organization (company-type) contact in Bexio with name, address, communication, and grouping fields. Use to add a company; pick Create Person for an individual or Update Company to modify an existing one. Requires a company name plus an assigned user and owner. Not idempotent: each call creates a separate contact, so search first to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name_1` | string | yes |  | Company Name. The name of the company. |
| `name_2` | string | no |  | Company Addition. Additional company name (e.g., "Ltd.", "Inc.") |
| `nr` | string | no |  | Contact Number. Contact number (leave empty to auto-assign) |
| `salutation_id` | string | no |  | Salutation. Salutation for the company. A value the product loads from the provider, such as an id; write the value itself. |
| `title_id` | string | no |  | Title. Title for the company. A value the product loads from the provider, such as an id; write the value itself. |
| `street_name` | string | no |  | Street Name. Street name. |
| `house_number` | string | no |  | House Number. House number. |
| `address_addition` | string | no |  | Address Addition. Additional address information (e.g., "Building C") |
| `postcode` | string | no |  | Postcode. Postal code. |
| `city` | string | no |  | City. City. |
| `country_id` | string | no |  | Country. Country. A value the product loads from the provider, such as an id; write the value itself. |
| `mail` | string | no |  | Email. Primary email address. |
| `mail_second` | string | no |  | Secondary Email. Secondary email address. |
| `phone_fixed` | string | no |  | Phone. Fixed phone number. |
| `phone_fixed_second` | string | no |  | Secondary Phone. Secondary fixed phone number. |
| `phone_mobile` | string | no |  | Mobile Phone. Mobile phone number. |
| `fax` | string | no |  | Fax. Fax number. |
| `url` | string | no |  | Website. Company website URL. |
| `skype_name` | string | no |  | Skype Name. Skype username. |
| `remarks` | string | no |  | Remarks. Additional notes about the company. |
| `language_id` | string | no |  | Language. Preferred language. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_group_ids` | array | no |  | Contact Groups. Select contact groups. Values the product loads from the provider, such as ids; write an array of them. |
| `contact_branch_ids` | array | no |  | Contact Sectors. Select contact sectors. Values the product loads from the provider, such as ids; write an array of them. |
| `user_id` | string | yes |  | User. User assigned to this contact. A value the product loads from the provider, such as an id; write the value itself. |
| `owner_id` | string | yes |  | Owner. Owner of this contact. A value the product loads from the provider, such as an id; write the value itself. |

### `create_person`

**Create Person.** Creates a new individual (person-type) contact in Bexio with name, address, communication, and grouping fields. Use to add an individual; pick Create Company for an organization or Update Person to modify an existing one. Requires a last name plus an assigned user and owner. Not idempotent: each call creates a separate contact, so search first to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name_1` | string | yes |  | Last Name. The last name of the person. |
| `name_2` | string | no |  | First Name. The first name of the person. |
| `nr` | string | no |  | Contact Number. Contact number (leave empty to auto-assign) |
| `salutation_id` | string | no |  | Salutation. Salutation for the person. A value the product loads from the provider, such as an id; write the value itself. |
| `salutation_form` | number | no |  | Salutation Form. Salutation form (optional) |
| `title_id` | string | no |  | Title. Title for the person (e.g., Dr., Prof.) A value the product loads from the provider, such as an id; write the value itself. |
| `birthday` | string | no |  | Birthday. Birthday date (YYYY-MM-DD) |
| `street_name` | string | no |  | Street Name. Street name. |
| `house_number` | string | no |  | House Number. House number. |
| `address_addition` | string | no |  | Address Addition. Additional address information (e.g., "Building C") |
| `postcode` | string | no |  | Postcode. Postal code. |
| `city` | string | no |  | City. City. |
| `country_id` | string | no |  | Country. Country. A value the product loads from the provider, such as an id; write the value itself. |
| `mail` | string | no |  | Email. Primary email address. |
| `mail_second` | string | no |  | Secondary Email. Secondary email address. |
| `phone_fixed` | string | no |  | Phone. Fixed phone number. |
| `phone_fixed_second` | string | no |  | Secondary Phone. Secondary fixed phone number. |
| `phone_mobile` | string | no |  | Mobile Phone. Mobile phone number. |
| `fax` | string | no |  | Fax. Fax number. |
| `url` | string | no |  | Website. Personal website URL. |
| `skype_name` | string | no |  | Skype Name. Skype username. |
| `remarks` | string | no |  | Remarks. Additional notes about the person. |
| `language_id` | string | no |  | Language. Preferred language. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_group_ids` | array | no |  | Contact Groups. Select contact groups. Values the product loads from the provider, such as ids; write an array of them. |
| `contact_branch_ids` | array | no |  | Contact Sectors. Select contact sectors. Values the product loads from the provider, such as ids; write an array of them. |
| `user_id` | string | yes |  | User. User assigned to this contact. A value the product loads from the provider, such as an id; write the value itself. |
| `owner_id` | string | yes |  | Owner. Owner of this contact. A value the product loads from the provider, such as an id; write the value itself. |

### `update_person`

**Update Person.** Updates fields on an existing person-type contact in Bexio identified by its contact id; only supplied fields change. Use to modify a known individual; pick Create Person to add a new one or Update Company for an organization. Resolve the contact id with Find Company or a contact lookup first. Idempotent: re-sending the same values converges to the same contact state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Person. Select the person to update. A value the product loads from the provider, such as an id; write the value itself. |
| `name_1` | string | no |  | Last Name. The last name of the person. |
| `name_2` | string | no |  | First Name. The first name of the person. |
| `nr` | string | no |  | Contact Number. Contact number (leave empty to keep current or auto-assign) |
| `salutation_id` | string | no |  | Salutation. Salutation for the person. A value the product loads from the provider, such as an id; write the value itself. |
| `salutation_form` | number | no |  | Salutation Form. Salutation form (optional) |
| `title_id` | string | no |  | Title. Title for the person (e.g., Dr., Prof.) A value the product loads from the provider, such as an id; write the value itself. |
| `birthday` | string | no |  | Birthday. Birthday date (YYYY-MM-DD) |
| `street_name` | string | no |  | Street Name. Street name. |
| `house_number` | string | no |  | House Number. House number. |
| `address_addition` | string | no |  | Address Addition. Additional address information. |
| `postcode` | string | no |  | Postcode. Postal code. |
| `city` | string | no |  | City. City. |
| `country_id` | string | no |  | Country. Country. A value the product loads from the provider, such as an id; write the value itself. |
| `mail` | string | no |  | Email. Primary email address. |
| `mail_second` | string | no |  | Secondary Email. Secondary email address. |
| `phone_fixed` | string | no |  | Phone. Fixed phone number. |
| `phone_fixed_second` | string | no |  | Secondary Phone. Secondary fixed phone number. |
| `phone_mobile` | string | no |  | Mobile Phone. Mobile phone number. |
| `fax` | string | no |  | Fax. Fax number. |
| `url` | string | no |  | Website URL. Personal website URL. |
| `skype_name` | string | no |  | Skype Name. Skype username. |
| `remarks` | string | no |  | Remarks. Additional notes about the person. |
| `language_id` | string | no |  | Language. Preferred language. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_group_ids` | array | no |  | Contact Groups. Select contact groups. Values the product loads from the provider, such as ids; write an array of them. |
| `contact_branch_ids` | array | no |  | Contact Sectors. Select contact sectors. Values the product loads from the provider, such as ids; write an array of them. |
| `user_id` | string | no |  | User. User assigned to this contact. A value the product loads from the provider, such as an id; write the value itself. |
| `owner_id` | string | no |  | Owner. Owner of this contact. A value the product loads from the provider, such as an id; write the value itself. |

### `update_company`

**Update Company.** Updates fields on an existing company-type contact in Bexio identified by its contact id; only supplied fields change. Use to modify a known organization; pick Create Company to add a new one or Update Person for an individual. Resolve the contact id with Find Company first. Idempotent: re-sending the same values converges to the same contact state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Company. Select the company to update. A value the product loads from the provider, such as an id; write the value itself. |
| `name_1` | string | no |  | Company Name. The name of the company. |
| `name_2` | string | no |  | Company Addition. Additional company name (e.g., "Ltd.", "Inc.") |
| `nr` | string | no |  | Contact Number. Contact number (leave empty to keep current or auto-assign) |
| `salutation_id` | string | no |  | Salutation. Salutation for the company. A value the product loads from the provider, such as an id; write the value itself. |
| `title_id` | string | no |  | Title. Title for the company. A value the product loads from the provider, such as an id; write the value itself. |
| `street_name` | string | no |  | Street Name. Street name. |
| `house_number` | string | no |  | House Number. House number. |
| `address_addition` | string | no |  | Address Addition. Additional address information. |
| `postcode` | string | no |  | Postcode. Postal code. |
| `city` | string | no |  | City. City. |
| `country_id` | string | no |  | Country. Country. A value the product loads from the provider, such as an id; write the value itself. |
| `mail` | string | no |  | Email. Primary email address. |
| `mail_second` | string | no |  | Secondary Email. Secondary email address. |
| `phone_fixed` | string | no |  | Phone. Fixed phone number. |
| `phone_fixed_second` | string | no |  | Secondary Phone. Secondary fixed phone number. |
| `phone_mobile` | string | no |  | Mobile Phone. Mobile phone number. |
| `fax` | string | no |  | Fax. Fax number. |
| `url` | string | no |  | Website URL. Company website URL. |
| `skype_name` | string | no |  | Skype Name. Skype username. |
| `remarks` | string | no |  | Remarks. Additional notes about the company. |
| `language_id` | string | no |  | Language. Preferred language. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_group_ids` | array | no |  | Contact Groups. Select contact groups. Values the product loads from the provider, such as ids; write an array of them. |
| `contact_branch_ids` | array | no |  | Contact Sectors. Select contact sectors. Values the product loads from the provider, such as ids; write an array of them. |
| `user_id` | string | no |  | User. User assigned to this contact. A value the product loads from the provider, such as an id; write the value itself. |
| `owner_id` | string | no |  | Owner. Owner of this contact. A value the product loads from the provider, such as an id; write the value itself. |

### `find_account`

**Find Account.** Searches the Bexio chart of accounts by number, name, type, or account group with operators such as contains, equals, or comparison, with paging. Use to resolve an account to its id before booking a manual entry or assigning an account on a product/position. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_criteria` | array | yes |  | Search Criteria. Search criteria for finding accounts. Each item: { `field`, `value`, `criteria`? }. |
| `limit` | number | no | `500` | Limit. Maximum number of results to return (max 2000) |
| `offset` | number | no | `0` | Offset. Number of results to skip. |

### `find_company`

**Find Company.** Searches Bexio contacts for companies, matching one or more field criteria (name, number, email, city, country, etc.) with operators such as contains, equals, or comparison; results are automatically filtered to company-type contacts. Use to locate a company before referencing or updating it; pick Find Country/Find Product/Find Account for those object types. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_criteria` | array | yes |  | Search Criteria. Search criteria for finding companies. Each item: { `field`, `value`, `criteria`? }. |
| `order_by` | string | no | `"id"` | Order By. Field to order results by. One of `"id"`, `"nr"`, `"name_1"`, `"updated_at"`. |
| `limit` | number | no | `500` | Limit. Maximum number of results to return (max 2000) |
| `offset` | number | no | `0` | Offset. Number of results to skip. |
| `show_archived` | boolean | no | `false` | Show Archived. Show archived contacts only. |

### `find_person`

**Find Person.** Search Bexio person contacts (contact_type 2; companies are excluded) by one or more field/operator/value criteria such as name, email, phone, or contact number. Read-only and repeatable; returns matching person records and supports ordering, limit, and offset paging. Use to look up a person before referencing them in another action; for company contacts use the company-oriented lookup instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_criteria` | array | yes |  | Search Criteria. Search criteria for finding persons. Each item: { `field`, `value`, `criteria`? }. |
| `order_by` | string | no | `"id"` | Order By. Field to sort the results by. One of `"id"`, `"nr"`, `"name_1"`, `"updated_at"`. |
| `order_direction` | string | no | `"asc"` | Order Direction. Sort order. One of `"asc"`, `"desc"`. |
| `limit` | number | no | `500` | Limit. Maximum number of results to return (max 2000) |
| `offset` | number | no | `0` | Offset. Number of results to skip. |
| `show_archived` | boolean | no | `false` | Show Archived. Include archived contacts in the search results. |

### `find_product`

**Find Product.** Searches Bexio products/articles by internal name or internal code with operators such as contains or equals, with ordering and paging. Use to resolve a product to its id before referencing it on an invoice/order position or before Update Product. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_criteria` | array | yes |  | Search Criteria. Search criteria for finding products. Each item: { `field`, `value`, `criteria`? }. |
| `order_by` | string | no | `"id"` | Order By. Field to order results by. One of `"id"`, `"intern_name"`. |
| `limit` | number | no | `500` | Limit. Maximum number of results to return (max 2000) |
| `offset` | number | no | `0` | Offset. Number of results to skip. |

### `find_country`

**Find Country.** Searches the Bexio country list by name or short code with operators such as contains or equals. Use to resolve a country to its id before setting country_id on a contact or other record. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_criteria` | array | yes |  | Search Criteria. Search criteria for finding countries. Each item: { `field`, `value`, `criteria`? }. |
| `order_by` | string | no | `"id"` | Order By. Field to order results by. One of `"id"`, `"name"`, `"name_short"`. |
| `limit` | number | no | `500` | Limit. Maximum number of results to return (max 2000) |
| `offset` | number | no | `0` | Offset. Number of results to skip. |

### `search_invoice`

**Search Invoice.** Searches Bexio sales invoices by one or more field criteria (document number, contact, status, totals, dates, etc.) with operators such as contains, equals, or comparison, with ordering and paging. Use to locate invoices before exporting, sending, or reconciling them; pick Search Order or Search Quote for those document types. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_criteria` | array | yes |  | Search Criteria. Search criteria for finding invoices. Each item: { `field`, `value`, `criteria`? }. |
| `order_by` | string | no | `"id"` | Order By. Field to order results by. One of `"id"`, `"total"`, `"total_net"`, `"total_gross"`, `"updated_at"`. |
| `limit` | number | no | `500` | Limit. Maximum number of results to return (max 2000) |
| `offset` | number | no | `0` | Offset. Number of results to skip. |

### `search_order`

**Search Order.** Searches Bexio sales orders by one or more field criteria (document number, contact, status, totals, dates, etc.) with operators such as contains, equals, or comparison, with ordering and paging. Use to locate orders before referencing or processing them; pick Search Invoice or Search Quote for those document types. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_criteria` | array | yes |  | Search Criteria. Search criteria for finding orders. Each item: { `field`, `value`, `criteria`? }. |
| `order_by` | string | no | `"id"` | Order By. Field to order results by. One of `"id"`, `"total"`, `"total_net"`, `"total_gross"`, `"updated_at"`. |
| `limit` | number | no | `500` | Limit. Maximum number of results to return (max 2000) |
| `offset` | number | no | `0` | Offset. Number of results to skip. |

### `search_quote`

**Search Quote.** Searches Bexio quotes (offers) by one or more field criteria (document number, contact, status, totals, dates, valid-until, etc.) with operators such as contains, equals, or comparison, with ordering and paging. Use to locate quotes before referencing or following up on them; pick Search Invoice or Search Order for those document types. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_criteria` | array | yes |  | Search Criteria. Search criteria for finding quotes. Each item: { `field`, `value`, `criteria`? }. |
| `order_by` | string | no | `"id"` | Order By. Field to order results by. One of `"id"`, `"total"`, `"total_net"`, `"total_gross"`, `"updated_at"`. |
| `limit` | number | no | `500` | Limit. Maximum number of results to return (max 2000) |
| `offset` | number | no | `0` | Offset. Number of results to skip. |

### `create_file`

**Create File.** Uploads a file to the Bexio file manager via multipart form data, returning the stored file metadata. Use to add a document or attachment to Bexio storage; requires the file contents. Not idempotent: each call stores another copy of the file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to upload. Files are not supported; an action that needs one fails. |

### `create_sales_invoice`

**Create Sales Invoice.** Creates a new sales invoice in Bexio from one or more line-item positions (custom, article, text, subtotal, discount, or page-break). Use when billing a customer for products or services; requires a user, language, bank account, currency, payment type, tax handling, and at least one position. Not idempotent: each call creates a separate invoice, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_nr` | string | no |  | Document Number. Invoice number (required if automatic numbering is disabled) |
| `title` | string | no |  | Title. Invoice title. |
| `contact_id` | string | no |  | Contact. The contact for this invoice. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_sub_id` | string | no |  | Contact Sub. Contact sub-address (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `user_id` | string | yes |  | User. User assigned to this invoice. A value the product loads from the provider, such as an id; write the value itself. |
| `pr_project_id` | string | no |  | Project. Project associated with this invoice. A value the product loads from the provider, such as an id; write the value itself. |
| `language_id` | string | yes |  | Language. Language for the invoice. A value the product loads from the provider, such as an id; write the value itself. |
| `bank_account_id` | string | yes |  | Bank Account. Bank account for payment. A value the product loads from the provider, such as an id; write the value itself. |
| `currency_id` | string | yes |  | Currency. A value the product loads from the provider, such as an id; write the value itself. |
| `payment_type_id` | string | yes |  | Payment Type. Payment type for this invoice. A value the product loads from the provider, such as an id; write the value itself. |
| `header` | string | no |  | Header. Header text for the invoice. |
| `footer` | string | no |  | Footer. Footer text for the invoice. |
| `mwst_type` | string | yes | `0` | Tax Type. How taxes are handled. One of `0`, `1`, `2`. |
| `mwst_is_net` | boolean | no | `false` | Tax is Net. If taxes are included, set to true to add taxes to total, false to include in total. |
| `show_position_taxes` | boolean | no | `false` | Show Position Taxes. Show taxes for each position. |
| `is_valid_from` | string | no |  | Valid From. Invoice valid from date (YYYY-MM-DD) |
| `is_valid_to` | string | no |  | Valid To. Invoice valid to date (YYYY-MM-DD) |
| `contact_address_manual` | string | no |  | Manual Contact Address. Override contact address (leave empty to use contact address) |
| `reference` | string | no |  | Reference. Reference number. |
| `api_reference` | string | no |  | API Reference. Reference for API use (can only be edited via API) |
| `template_slug` | string | no |  | Document Template. Document template for the invoice. A value the product loads from the provider, such as an id; write the value itself. |
| `positionFields` | object | yes |  | Invoice Positions. Configure invoice line items. An object whose fields depend on other inputs; the product shows them. |

### `export_invoice_pdf`

**Export Invoice to PDF.** Renders an existing Bexio sales invoice as a PDF and returns the downloadable file, keyed by the invoice id. Use when an agent needs the document itself (to attach or store); pick Send Sales Invoice to email it to a recipient instead. Optionally toggle the letterhead. Read-only and idempotent: it generates the file without changing the invoice. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice_id` | string | yes |  | Invoice. Select the invoice to export. A value the product loads from the provider, such as an id; write the value itself. |
| `logopaper` | string | no | `1` | Letterhead. Whether to include letterhead in the PDF. One of `1`, `0`. |

### `send_sales_invoice`

**Send Sales Invoice.** Emails an existing Bexio sales invoice to a recipient, with subject and message body, optionally marking the invoice as open and attaching the PDF. Use to deliver an invoice to a customer; pick Export Invoice to PDF if you only need the file. Requires the invoice id and a recipient email, and the message must contain a "[Network Link]" placeholder. Not idempotent: each call sends another email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice_id` | string | yes |  | Invoice. Select the invoice to send. A value the product loads from the provider, such as an id; write the value itself. |
| `recipient_email` | string | yes |  | Recipient Email. Email address to send the invoice to. |
| `subject` | string | yes |  | Subject. Email subject line. |
| `message` | string | yes |  | Message. Email message body. Must include "[Network Link]" placeholder. |
| `mark_as_open` | boolean | no | `false` | Mark as Open. Mark the invoice as open. |
| `attach_pdf` | boolean | no | `false` | Attach PDF. Attach PDF directly to the email. |

### `create_product`

**Create Product.** Create a new Bexio article (a physical product or a service) with internal code and name, plus optional pricing, taxes, unit, currency, supplier, stock, and dimension details. Not idempotent: each call adds a separate article even if the code repeats, so check for an existing product first to avoid duplicates. Stock-item fields require the stock_edit scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User. User associated with this product. A value the product loads from the provider, such as an id; write the value itself. |
| `article_type_id` | string | yes | `1` | Product Type. Type of product. One of `1`, `2`. |
| `intern_code` | string | yes |  | Internal Code. Internal product code. |
| `intern_name` | string | yes |  | Internal Name. Internal product name. |
| `intern_description` | string | no |  | Internal Description. Internal product description. |
| `contact_id` | string | no |  | Contact. Contact associated with this product. A value the product loads from the provider, such as an id; write the value itself. |
| `deliverer_code` | string | no |  | Supplier Code. Supplier product code. |
| `deliverer_name` | string | no |  | Supplier Name. Supplier product name. |
| `deliverer_description` | string | no |  | Supplier Description. Supplier product description. |
| `purchase_price` | string | no |  | Purchase Price. Purchase price. |
| `sale_price` | string | no |  | Sale Price. Sale price. |
| `purchase_total` | number | no |  | Purchase Total. Total purchase amount. |
| `sale_total` | number | no |  | Sale Total. Total sale amount. |
| `currency_id` | string | no |  | Currency. A value the product loads from the provider, such as an id; write the value itself. |
| `tax_income_id` | string | no |  | Income Tax. Tax for income/sales. A value the product loads from the provider, such as an id; write the value itself. |
| `tax_expense_id` | string | no |  | Expense Tax. Tax for expenses/purchases. A value the product loads from the provider, such as an id; write the value itself. |
| `unit_id` | string | no |  | Unit. Unit of measurement. A value the product loads from the provider, such as an id; write the value itself. |
| `is_stock` | boolean | no | `false` | Is Stock Item. Whether this is a stock item (requires stock_edit scope) |
| `stock_id` | string | no |  | Stock Location. Stock location. A value the product loads from the provider, such as an id; write the value itself. |
| `stock_place_id` | string | no |  | Stock Area. Stock area/place. A value the product loads from the provider, such as an id; write the value itself. |
| `stock_nr` | number | yes | `0` | Stock Number. Current stock quantity. |
| `stock_min_nr` | number | yes | `0` | Minimum Stock. Minimum stock quantity. |
| `width` | number | no |  | Width. Product width. |
| `height` | number | no |  | Height. Product height. |
| `weight` | number | no |  | Weight. Product weight. |
| `volume` | number | no |  | Volume. Product volume. |
| `remarks` | string | no |  | Remarks. Additional remarks. |
| `delivery_price` | number | no |  | Delivery Price. Delivery price. |
| `article_group_id` | string | no |  | Article Group. Product group/category. A value the product loads from the provider, such as an id; write the value itself. |
| `account_id` | string | no |  | Account. Account for this product. A value the product loads from the provider, such as an id; write the value itself. |
| `expense_account_id` | string | no |  | Expense Account. Expense account for this product. A value the product loads from the provider, such as an id; write the value itself. |

### `update_product`

**Update Product.** Updates fields on an existing Bexio product/article (codes, names, prices, tax, unit, stock, dimensions, accounts) identified by its article id; only supplied fields change. Use to modify a known product; locate the article id with Find Product first. Idempotent: re-sending the same values converges to the same product state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `article_id` | string | yes |  | Product. Select the product to update. A value the product loads from the provider, such as an id; write the value itself. |
| `user_id` | string | no |  | User. User associated with this product. A value the product loads from the provider, such as an id; write the value itself. |
| `intern_code` | string | no |  | Internal Code. Internal product code. |
| `intern_name` | string | no |  | Internal Name. Internal product name. |
| `intern_description` | string | no |  | Internal Description. Internal product description. |
| `contact_id` | string | no |  | Contact. Contact associated with this product. A value the product loads from the provider, such as an id; write the value itself. |
| `deliverer_code` | string | no |  | Supplier Code. Supplier product code. |
| `deliverer_name` | string | no |  | Supplier Name. Supplier product name. |
| `deliverer_description` | string | no |  | Supplier Description. Supplier product description. |
| `purchase_price` | string | no |  | Purchase Price. Purchase price. |
| `sale_price` | string | no |  | Sale Price. Sale price. |
| `purchase_total` | number | no |  | Purchase Total. Total purchase amount. |
| `sale_total` | number | no |  | Sale Total. Total sale amount. |
| `currency_id` | string | no |  | Currency. A value the product loads from the provider, such as an id; write the value itself. |
| `tax_income_id` | string | no |  | Income Tax. Tax for income/sales. A value the product loads from the provider, such as an id; write the value itself. |
| `tax_expense_id` | string | no |  | Expense Tax. Tax for expenses/purchases. A value the product loads from the provider, such as an id; write the value itself. |
| `unit_id` | string | no |  | Unit. Unit of measurement. A value the product loads from the provider, such as an id; write the value itself. |
| `is_stock` | boolean | no |  | Is Stock Item. Whether this is a stock item (requires stock_edit scope) |
| `stock_id` | string | no |  | Stock Location. Stock location. A value the product loads from the provider, such as an id; write the value itself. |
| `stock_place_id` | string | no |  | Stock Area. Stock area/place. A value the product loads from the provider, such as an id; write the value itself. |
| `stock_nr` | number | no |  | Stock Number. Current stock quantity (can only be set if no bookings exist) |
| `stock_min_nr` | number | no |  | Minimum Stock. Minimum stock quantity. |
| `width` | number | no |  | Width. Product width. |
| `height` | number | no |  | Height. Product height. |
| `weight` | number | no |  | Weight. Product weight. |
| `volume` | number | no |  | Volume. Product volume. |
| `remarks` | string | no |  | Remarks. Additional remarks. |
| `delivery_price` | number | no |  | Delivery Price. Delivery price. |
| `article_group_id` | string | no |  | Article Group. Product group/category. A value the product loads from the provider, such as an id; write the value itself. |
| `account_id` | string | no |  | Account. Account for this product. A value the product loads from the provider, such as an id; write the value itself. |
| `expense_account_id` | string | no |  | Expense Account. Expense account for this product. A value the product loads from the provider, such as an id; write the value itself. |

### `create_sales_order`

**Create Sales Order.** Creates a new sales order in Bexio from one or more line-item positions (custom, article, text, subtotal, discount, or page-break). Use when confirming an order for products or services; pick Create Sales Invoice to bill instead. Requires a contact, user, language, bank account, currency, payment type, tax handling, a valid-from date, and at least one position; supports a separate delivery address. Not idempotent: each call creates a separate order. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_nr` | string | no |  | Document Number. Order number (required if automatic numbering is disabled) |
| `title` | string | no |  | Title. Order title. |
| `contact_id` | string | yes |  | Contact. The contact for this order. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_sub_id` | string | no |  | Contact Sub. Contact sub-address (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `user_id` | string | yes |  | User. User responsible for this order. A value the product loads from the provider, such as an id; write the value itself. |
| `pr_project_id` | string | no |  | Project. Project associated with this order. A value the product loads from the provider, such as an id; write the value itself. |
| `language_id` | string | yes |  | Language. Language for the order. A value the product loads from the provider, such as an id; write the value itself. |
| `bank_account_id` | string | yes |  | Bank Account. Bank account for payment. A value the product loads from the provider, such as an id; write the value itself. |
| `currency_id` | string | yes |  | Currency. Currency for this order. A value the product loads from the provider, such as an id; write the value itself. |
| `payment_type_id` | string | yes |  | Payment Type. Payment type for this order. A value the product loads from the provider, such as an id; write the value itself. |
| `header` | string | no |  | Header. Header text for the order. |
| `footer` | string | no |  | Footer. Footer text for the order. |
| `mwst_type` | string | yes | `0` | Tax Type. How taxes are handled. One of `0`, `1`, `2`. |
| `mwst_is_net` | boolean | no | `false` | Tax is Net. If taxes are included, set to true to add taxes to total, false to include in total. |
| `show_position_taxes` | boolean | no | `false` | Show Position Taxes. Show taxes for each position. |
| `is_valid_from` | string | yes |  | Valid From. Order valid from date (YYYY-MM-DD) |
| `contact_address_manual` | string | no |  | Manual Contact Address. Override contact address (leave empty to use contact address) |
| `delivery_address_type` | string | no | `0` | Delivery Address Type. Type of delivery address. One of `0`, `1`. |
| `delivery_address_manual_text` | string | no |  | Manual Delivery Address. Custom delivery address (only used if delivery address type is set to custom) |
| `api_reference` | string | no |  | API Reference. Reference for API use (can only be edited via API) |
| `template_slug` | string | no |  | Document Template. Document template for the order. A value the product loads from the provider, such as an id; write the value itself. |
| `positionFields` | object | yes |  | Order Positions. Configure order line items. An object whose fields depend on other inputs; the product shows them. |

### `create_project`

**Create Project.** Creates a new Bexio project linked to a contact, with status, type, responsible user, optional dates, and optional invoicing/budget settings. Use to set up a project before tracking time or billing against it. Requires a name, project status, project type, contact, and user. Not idempotent: each call creates a separate project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_nr` | string | no |  | Document Number. Project number (required if automatic numbering is disabled) |
| `name` | string | yes |  | Project Name. Name of the project. |
| `start_date` | ISO date-time string | no |  | Start Date. Project start date. |
| `end_date` | ISO date-time string | no |  | End Date. Project end date. |
| `comment` | string | no |  | Comment. Project comment/description. |
| `pr_state_id` | string | yes |  | Project Status. Status of the project. A value the product loads from the provider, such as an id; write the value itself. |
| `pr_project_type_id` | string | yes |  | Project Type. Type of project. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. Contact associated with this project. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_sub_id` | string | no |  | Contact Sub. Contact sub-address (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `pr_invoice_type_id` | string | no |  | Invoice Type. Type of invoicing for this project. One of `1`, `2`, `3`, `4`. |
| `pr_invoice_type_amount` | string | no |  | Invoice Type Amount. Amount for invoice type (only for hourly rate project or fix price) |
| `pr_budget_type_id` | string | no |  | Budget Type. Type of budget for this project. One of `1`, `2`, `3`, `4`. |
| `pr_budget_type_amount` | string | no |  | Budget Type Amount. Amount for budget type (only for total budget costs or total budget hours) |
| `user_id` | string | yes |  | User. User responsible for this project. A value the product loads from the provider, such as an id; write the value itself. |

### `create_sales_quote`

**Create Sales Quote.** Create a new Bexio sales quote (kb_offer) with required user, language, currency, payment type, bank account, tax handling, validity dates, and at least one line-item position (custom, article, text, subtotal, discount, or page-break). Not idempotent: each call creates a separate quote, so guard against duplicates. Requires resolved IDs for contact, currency, taxes, units, and accounts; look these up first if not known. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_nr` | string | no |  | Document Number. Quote number (required if automatic numbering is disabled) |
| `title` | string | no |  | Title. Quote title. |
| `contact_id` | string | no |  | Contact. The contact for this quote. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_sub_id` | string | no |  | Contact Sub. Contact sub-address (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `user_id` | string | yes |  | User. User responsible for this quote. A value the product loads from the provider, such as an id; write the value itself. |
| `pr_project_id` | string | no |  | Project. Project associated with this quote. A value the product loads from the provider, such as an id; write the value itself. |
| `language_id` | string | yes |  | Language. Language for the quote. A value the product loads from the provider, such as an id; write the value itself. |
| `bank_account_id` | string | yes |  | Bank Account. Bank account for payment. A value the product loads from the provider, such as an id; write the value itself. |
| `currency_id` | string | yes |  | Currency. Currency for this quote. A value the product loads from the provider, such as an id; write the value itself. |
| `payment_type_id` | string | yes |  | Payment Type. Payment type for this quote. A value the product loads from the provider, such as an id; write the value itself. |
| `header` | string | no |  | Header. Header text for the quote. |
| `footer` | string | no |  | Footer. Footer text for the quote. |
| `mwst_type` | string | yes | `0` | Tax Type. How taxes are handled. One of `0`, `1`, `2`. |
| `mwst_is_net` | boolean | no | `false` | Tax is Net. If taxes are included, set to true to add taxes to total, false to include in total. |
| `show_position_taxes` | boolean | no | `false` | Show Position Taxes. Show taxes for each position. |
| `is_valid_from` | string | yes |  | Valid From. Quote valid from date (YYYY-MM-DD) |
| `is_valid_until` | string | yes |  | Valid Until. Quote valid until date (YYYY-MM-DD) |
| `contact_address_manual` | string | no |  | Manual Contact Address. Override contact address (leave empty to use contact address) |
| `delivery_address_type` | string | no | `0` | Delivery Address Type. Type of delivery address. One of `0`, `1`. |
| `delivery_address_manual_text` | string | no |  | Manual Delivery Address. Custom delivery address (only used if delivery address type is set to custom) |
| `api_reference` | string | no |  | API Reference. Reference for API use (can only be edited via API) |
| `viewed_by_client_at` | ISO date-time string | no |  | Viewed By Client At. Date when the quote was viewed by the client. |
| `kb_terms_of_payment_template_id` | number | no |  | Terms of Payment Template ID. Terms of payment template ID. |
| `template_slug` | string | no |  | Document Template. Document template for the quote. A value the product loads from the provider, such as an id; write the value itself. |
| `positionFields` | object | yes |  | Quote Positions. Configure quote line items. An object whose fields depend on other inputs; the product shows them. |

### `create_time_tracking`

**Create Time Tracking.** Logs a new timesheet entry in Bexio for a user against a client service/business activity, recording time either as a duration on a date or as a from/to range. Use to record worked or billable hours, optionally tying it to a contact, project, or milestone. Requires a user, client service, billable flag, and the tracking details for the chosen mode. Not idempotent: each call creates a separate entry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User. User for this timesheet entry. A value the product loads from the provider, such as an id; write the value itself. |
| `status_id` | string | no |  | Status. Timesheet status. A value the product loads from the provider, such as an id; write the value itself. |
| `client_service_id` | string | yes |  | Client Service. Business activity/client service. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | no |  | Description. Description of the work performed. |
| `allowable_bill` | boolean | yes | `true` | Allowable Bill. Whether this time is billable. |
| `charge` | string | no |  | Charge. Charge amount. |
| `contact_id` | string | no |  | Contact. Contact associated with this timesheet. A value the product loads from the provider, such as an id; write the value itself. |
| `sub_contact_id` | string | no |  | Sub Contact. Sub contact (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `pr_project_id` | string | no |  | Project. Project associated with this timesheet. A value the product loads from the provider, such as an id; write the value itself. |
| `pr_package_id` | number | no |  | Package ID. Project package ID. |
| `pr_milestone_id` | number | no |  | Milestone ID. Project milestone ID. |
| `estimated_time` | string | no |  | Estimated Time. Estimated time (format: HH:MM) |
| `tracking_type` | string | yes | `"duration"` | Tracking Type. Type of time tracking. One of `"duration"`, `"range"`. |
| `tracking_details` | object | yes |  | Tracking Details. Time tracking details. An object whose fields depend on other inputs; the product shows them. |

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

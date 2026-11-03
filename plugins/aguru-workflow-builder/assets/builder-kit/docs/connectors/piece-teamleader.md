# Teamleader

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-teamleader'
  version: '0.2.0'
```

Categories: SALES_AND_CRM, BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> To obtain your OAuth2 credentials:
>
> 1. Go to the Teamleader Marketplace (https://marketplace.teamleader.eu)
> 2. Log in or create an account
> 3. Go to "Build" and click "Create a new Integration"
> 4. Fill in the required information
> 5. On your integration's settings page, configure:
> - Add `https://cloud.activepieces.com/redirect` to the allowed redirect URIs
> - Select all required scopes for your integration
> 6. Copy the Client ID and Client Secret

## Actions

### `create_contact`

**Create Contact.** Create a new person contact in Teamleader Focus CRM with name, emails, phones, addresses, and other profile fields. Use to add an individual; for a business entity use Create Company instead. Requires first and last name. Not idempotent: each call creates a separate contact even with identical input, so guard against duplicates (e.g. search by email first). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | yes |  | First Name. First name of the contact. |
| `last_name` | string | yes |  | Last Name. Last name of the contact. |
| `salutation` | string | no |  | Salutation. Salutation (e.g., Mr, Mrs, Dr) |
| `emails` | array | no |  | Emails. Email addresses for the contact. Each item: { `type`, `email` }. |
| `telephones` | array | no |  | Phone Numbers. Phone numbers for the contact. Each item: { `type`, `number` }. |
| `website` | string | no |  | Website. Website URL. |
| `addresses` | array | no |  | Addresses. Contact addresses. Each item: { `type`, `line_1`, `postal_code`, `city`, `country`, `area_level_two_id`?, `addressee`? }. |
| `language` | string | no |  | Language. Language code (e.g., en, nl, fr) |
| `gender` | string | no |  | Gender. Gender of the contact. One of `"female"`, `"male"`, `"non_binary"`, `"prefers_not_to_say"`, `"unknown"`. |
| `birthdate` | string | no |  | Birth Date. Birth date (YYYY-MM-DD format) |
| `iban` | string | no |  | IBAN. International Bank Account Number. |
| `bic` | string | no |  | BIC. Bank Identifier Code. |
| `national_identification_number` | string | no |  | National ID Number. National identification number. |
| `remarks` | string | no |  | Remarks. Additional notes (supports Markdown) |
| `tags` | array | no |  | Tags. Contact tags. Each item: { `tag` }. |
| `custom_fields` | array | no |  | Custom Fields. Custom field values. Each item: { `id`, `value` }. |
| `marketing_mails_consent` | boolean | no |  | Marketing Consent. Allow marketing emails. |

### `update_contact`

**Update Contact.** Update fields on an existing Teamleader contact identified by contact ID. Use when you already know the contact and want to change profile data. Only provided fields are sent; note that array fields (emails, phones, addresses, tags) fully replace the existing values rather than appending. Idempotent: re-sending the same values leaves the contact in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact. Select the contact to update. A value the product loads from the provider, such as an id; write the value itself. |
| `first_name` | string | no |  | First Name. First name of the contact. |
| `last_name` | string | no |  | Last Name. Last name of the contact. |
| `salutation` | string | no |  | Salutation. Salutation (e.g., Mr, Mrs, Dr) |
| `emails` | array | no |  | Emails. Email addresses (replaces all existing emails) Each item: { `type`, `email` }. |
| `telephones` | array | no |  | Phone Numbers. Phone numbers (replaces all existing numbers) Each item: { `type`, `number` }. |
| `website` | string | no |  | Website. Website URL. |
| `addresses` | array | no |  | Addresses. Contact addresses (replaces all existing addresses) Each item: { `type`, `line_1`, `postal_code`, `city`, `country`, `area_level_two_id`?, `addressee`? }. |
| `language` | string | no |  | Language. Language code (e.g., en, nl, fr) |
| `gender` | string | no |  | Gender. Gender of the contact. One of `"female"`, `"male"`, `"non_binary"`, `"prefers_not_to_say"`, `"unknown"`. |
| `birthdate` | string | no |  | Birth Date. Birth date (YYYY-MM-DD format) |
| `iban` | string | no |  | IBAN. International Bank Account Number. |
| `bic` | string | no |  | BIC. Bank Identifier Code. |
| `national_identification_number` | string | no |  | National ID Number. National identification number. |
| `remarks` | string | no |  | Remarks. Additional notes (supports Markdown) |
| `tags` | array | no |  | Tags. Contact tags (replaces all existing tags) Each item: { `tag` }. |
| `custom_fields` | array | no |  | Custom Fields. Custom field values. Each item: { `id`, `value` }. |
| `marketing_mails_consent` | boolean | no |  | Marketing Consent. Allow marketing emails. |

### `create_company`

**Create Company.** Create a new company (business entity) in Teamleader Focus CRM with name, VAT number, emails, phones, addresses, and other fields. Use for organizations; for an individual use Create Contact instead. Only the company name is required. Not idempotent: each call creates a separate company even with identical input, so check for an existing match first to avoid duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Company Name. Name of the company. |
| `country_for_business_type` | string | no |  | Country Code. Two-letter country code (e.g., BE, NL, US) for business type selection. |
| `business_type_id` | string | no |  | Business Type. Legal structure of the company. A value the product loads from the provider, such as an id; write the value itself. |
| `vat_number` | string | no |  | VAT Number. VAT/tax identification number. |
| `national_identification_number` | string | no |  | National ID Number. National identification number. |
| `emails` | array | no |  | Emails. Email addresses for the company. Each item: { `type`, `email` }. |
| `telephones` | array | no |  | Phone Numbers. Phone numbers for the company. Each item: { `type`, `number` }. |
| `website` | string | no |  | Website. Company website URL. |
| `addresses` | array | no |  | Addresses. Company addresses. Each item: { `type`, `line_1`, `postal_code`, `city`, `country`, `area_level_two_id`?, `addressee`? }. |
| `iban` | string | no |  | IBAN. International Bank Account Number. |
| `bic` | string | no |  | BIC. Bank Identifier Code. |
| `language` | string | no |  | Language. Language code (e.g., en, nl, fr) |
| `responsible_user_id` | string | no |  | Responsible User ID. ID of the user responsible for this company. |
| `remarks` | string | no |  | Remarks. Additional notes (supports Markdown) |
| `tags` | array | no |  | Tags. Company tags. Each item: { `tag` }. |
| `custom_fields` | array | no |  | Custom Fields. Custom field values. Each item: { `id`, `value` }. |
| `marketing_mails_consent` | boolean | no |  | Marketing Consent. Allow marketing emails. |
| `preferred_currency` | string | no |  | Preferred Currency. Preferred currency for this company. One of `"EUR"`, `"USD"`, `"GBP"`, `"CAD"`, `"CHF"`, `"DKK"`, `"NOK"`, `"SEK"`, `"JPY"`, `"CNY"`, `"CZK"`, `"PLN"`, `"RON"`, `"TRY"`, `"ZAR"`, `"INR"`, `"MXN"`, `"CLP"`, `"COP"`, `"PEN"`, `"MAD"`, `"ISK"`, `"BAM"`. |

### `update_company`

**Update Company.** Update fields on an existing Teamleader company identified by company ID. Use when you already know the company and want to change its data. Only provided fields are sent; array fields (emails, phones, addresses, tags) fully replace the existing values rather than appending. Idempotent: re-sending the same values leaves the company in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_id` | string | yes |  | Company. Select the company to update. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Company Name. Name of the company. |
| `country_for_business_type` | string | no |  | Country Code. Two-letter country code (e.g., BE, NL, US) for business type selection. |
| `business_type_id` | string | no |  | Business Type. Legal structure of the company. A value the product loads from the provider, such as an id; write the value itself. |
| `vat_number` | string | no |  | VAT Number. VAT/tax identification number. |
| `national_identification_number` | string | no |  | National ID Number. National identification number. |
| `emails` | array | no |  | Emails. Email addresses (replaces all existing emails) Each item: { `type`, `email` }. |
| `telephones` | array | no |  | Phone Numbers. Phone numbers (replaces all existing numbers) Each item: { `type`, `number` }. |
| `website` | string | no |  | Website. Company website URL. |
| `addresses` | array | no |  | Addresses. Company addresses (replaces all existing addresses) Each item: { `type`, `line_1`, `postal_code`, `city`, `country`, `area_level_two_id`?, `addressee`? }. |
| `iban` | string | no |  | IBAN. International Bank Account Number. |
| `bic` | string | no |  | BIC. Bank Identifier Code. |
| `language` | string | no |  | Language. Language code (e.g., en, nl, fr) |
| `responsible_user_id` | string | no |  | Responsible User ID. ID of the user responsible for this company. |
| `remarks` | string | no |  | Remarks. Additional notes (supports Markdown) |
| `tags` | array | no |  | Tags. Company tags (replaces all existing tags) Each item: { `tag` }. |
| `custom_fields` | array | no |  | Custom Fields. Custom field values. Each item: { `id`, `value` }. |
| `marketing_mails_consent` | boolean | no |  | Marketing Consent. Allow marketing emails. |
| `preferred_currency` | string | no |  | Preferred Currency. Preferred currency for this company. One of `"EUR"`, `"USD"`, `"GBP"`, `"CAD"`, `"CHF"`, `"DKK"`, `"NOK"`, `"SEK"`, `"JPY"`, `"CNY"`, `"CZK"`, `"PLN"`, `"RON"`, `"TRY"`, `"ZAR"`, `"INR"`, `"MXN"`, `"CLP"`, `"COP"`, `"PEN"`, `"MAD"`, `"ISK"`, `"BAM"`. |

### `link_contact_to_company`

**Link Contact to Company.** Associate an existing contact with an existing company in Teamleader, optionally recording the contact's position and whether they are a decision maker. Use after both records exist to express the employment/relationship link. Requires contact ID and company ID. Idempotent on the link itself: re-running establishes the same association. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact. Select the contact to link. A value the product loads from the provider, such as an id; write the value itself. |
| `company_id` | string | yes |  | Company. Select the company to link to. A value the product loads from the provider, such as an id; write the value itself. |
| `position` | string | no |  | Position. Job title or role (e.g., CEO, Manager) |
| `decision_maker` | boolean | no |  | Decision Maker. Is this contact a decision maker? |

### `unlink_contact_from_company`

**Unlink Contact from Company.** Remove the link between a contact and a company in Teamleader without deleting either record. Use to undo a Link Contact to Company association. Requires contact ID and company ID. Idempotent: if the link is already absent, re-running leaves them unlinked. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact. Select the contact to unlink. A value the product loads from the provider, such as an id; write the value itself. |
| `company_id` | string | yes |  | Company. Select the company to unlink from. A value the product loads from the provider, such as an id; write the value itself. |

### `create_deal`

**Create Deal.** Create a new sales deal/opportunity in Teamleader for a given customer (a company or a contact). Use to open a new pipeline opportunity. Requires a title, a customer type (company or contact), and the matching customer ID; phase, source, department, responsible user, estimated value, and closing date are optional. Not idempotent: each call creates a separate deal. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Deal Title. Title of the deal. |
| `customer_type` | string | yes |  | Customer Type. Type of customer for this deal. One of `"company"`, `"contact"`. |
| `customer_id` | string | yes |  | Customer. Select the customer (company or contact) A value the product loads from the provider, such as an id; write the value itself. |
| `contact_person_id` | string | no |  | Contact Person. Contact person for this deal (for company customers) A value the product loads from the provider, such as an id; write the value itself. |
| `summary` | string | no |  | Summary. Additional information about the deal. |
| `source_id` | string | no |  | Source. How the lead was acquired. A value the product loads from the provider, such as an id; write the value itself. |
| `department_id` | string | no |  | Department. Department responsible for this deal. A value the product loads from the provider, such as an id; write the value itself. |
| `responsible_user_id` | string | no |  | Responsible User. User responsible for this deal. A value the product loads from the provider, such as an id; write the value itself. |
| `phase_id` | string | no |  | Phase. Deal phase or stage. A value the product loads from the provider, such as an id; write the value itself. |
| `estimated_value_amount` | number | no |  | Estimated Value. Deal value amount. |
| `estimated_value_currency` | string | no |  | Value Currency. Currency for the estimated value. One of `"EUR"`, `"USD"`, `"GBP"`, `"CAD"`, `"CHF"`, `"DKK"`, `"NOK"`, `"SEK"`, `"JPY"`, `"CNY"`. |
| `estimated_probability` | number | no |  | Estimated Probability. Win probability (0-1, e.g., 0.75 for 75%) |
| `estimated_closing_date` | ISO date-time string | no |  | Estimated Closing Date. Expected deal closing date. |
| `custom_fields` | array | no |  | Custom Fields. Custom field values. Each item: { `id`, `value` }. |

### `update_deal`

**Update Deal.** Update properties of an existing Teamleader deal identified by deal ID, such as title, customer, summary, source, department, responsible user, estimated value, probability, or closing date. Use when you already know the deal and want to change its data; only provided fields are sent. Idempotent: re-sending the same values leaves the deal unchanged. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `deal_id` | string | yes |  | Deal. Select the deal to update. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Deal Title. Title of the deal. |
| `customer_type` | string | no |  | Customer Type. Type of customer for this deal. One of `"company"`, `"contact"`. |
| `customer_id` | string | no |  | Customer. Select the customer (company or contact) A value the product loads from the provider, such as an id; write the value itself. |
| `contact_person_id` | string | no |  | Contact Person. Contact person for this deal (for company customers) A value the product loads from the provider, such as an id; write the value itself. |
| `summary` | string | no |  | Summary. Additional information about the deal. |
| `source_id` | string | no |  | Source. How the lead was acquired. A value the product loads from the provider, such as an id; write the value itself. |
| `department_id` | string | no |  | Department. Department responsible for this deal. A value the product loads from the provider, such as an id; write the value itself. |
| `responsible_user_id` | string | no |  | Responsible User. User responsible for this deal. A value the product loads from the provider, such as an id; write the value itself. |
| `estimated_value_amount` | number | no |  | Estimated Value. Deal value amount. |
| `estimated_value_currency` | string | no |  | Value Currency. Currency for the estimated value. One of `"EUR"`, `"USD"`, `"GBP"`, `"CAD"`, `"CHF"`, `"DKK"`, `"NOK"`, `"SEK"`, `"JPY"`, `"CNY"`. |
| `estimated_probability` | number | no |  | Estimated Probability. Win probability (0-1, e.g., 0.75 for 75%) |
| `estimated_closing_date` | ISO date-time string | no |  | Estimated Closing Date. Expected deal closing date. |
| `custom_fields` | array | no |  | Custom Fields. Custom field values. Each item: { `id`, `value` }. |

### `search_companies`

**Search Companies.** Look up companies in Teamleader, optionally narrowing by a free-text term, email, VAT number, status, tags, or updated-since date, with paging and sorting. With no filters it lists all companies; supply filters to find specific matches (e.g. resolve a company ID before creating a deal). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | no |  | Search Term. Search by name, VAT number, emails or telephones. |
| `email` | string | no |  | Email. Filter by email address. |
| `vat_number` | string | no |  | VAT Number. Filter by VAT number. |
| `status` | string | no |  | Status. Filter by company status. One of `"active"`, `"deactivated"`. |
| `tags` | string | no |  | Tags. Filter by tag names (comma-separated) |
| `updated_since` | ISO date-time string | no |  | Updated Since. Only companies updated after this date. |
| `sort_field` | string | no |  | Sort Field. Field to sort by. One of `"name"`, `"added_at"`, `"updated_at"`. |
| `sort_order` | string | no |  | Sort Order. Sort direction. One of `"asc"`, `"desc"`. |
| `page_size` | number | no |  | Results Per Page. Number of results per page (default: 20) |
| `page_number` | number | no |  | Page Number. Page number to retrieve (default: 1) |
| `include_custom_fields` | boolean | no |  | Include Custom Fields. Include custom field data in results. |

### `search_contacts`

**Search Contacts.** Look up contacts in Teamleader, optionally narrowing by a free-text term, email, company, status, tags, or updated-since date, with paging and sorting. With no filters it lists all contacts; supply filters to find specific matches (e.g. resolve a contact ID by email before updating or linking). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | no |  | Search Term. Search by first name, last name, email or telephone. |
| `email` | string | no |  | Email. Filter by email address. |
| `company_id` | string | no |  | Company. Filter contacts by company. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. Filter by contact status. One of `"active"`, `"deactivated"`. |
| `tags` | string | no |  | Tags. Filter by tag names (comma-separated) |
| `updated_since` | ISO date-time string | no |  | Updated Since. Only contacts updated after this date. |
| `sort_field` | string | no |  | Sort Field. Field to sort by. One of `"name"`, `"added_at"`, `"updated_at"`. |
| `sort_order` | string | no |  | Sort Order. Sort direction. One of `"asc"`, `"desc"`. |
| `page_size` | number | no |  | Results Per Page. Number of results per page (default: 20) |
| `page_number` | number | no |  | Page Number. Page number to retrieve (default: 1) |
| `include_custom_fields` | boolean | no |  | Include Custom Fields. Include custom field data in results. |

### `search_deals`

**Search Deals.** Look up sales deals in Teamleader, optionally narrowing by a free-text term, customer, phase, status (open/won/lost), responsible user, or closing/updated/created date ranges, with paging and sorting. With no filters it lists all deals; supply filters to find specific matches (e.g. resolve a deal ID before updating). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | no |  | Search Term. Search by title, reference or customer name. |
| `customer_type` | string | no |  | Customer Type. Type of customer to filter by. One of `"company"`, `"contact"`. |
| `customer_id` | string | no |  | Customer. Filter deals by specific customer. A value the product loads from the provider, such as an id; write the value itself. |
| `phase_id` | string | no |  | Deal Phase. Filter by deal phase or stage. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | array | no |  | Status. Filter by deal status (multiple selection) One of `"open"`, `"won"`, `"lost"`. |
| `responsible_user_id` | string | no |  | Responsible User. Filter by user responsible for deals. A value the product loads from the provider, such as an id; write the value itself. |
| `estimated_closing_date` | ISO date-time string | no |  | Exact Closing Date. Filter by specific estimated closing date. |
| `estimated_closing_date_from` | ISO date-time string | no |  | Closing Date From. Filter deals closing after this date (inclusive) |
| `estimated_closing_date_until` | ISO date-time string | no |  | Closing Date Until. Filter deals closing before this date (inclusive) |
| `updated_since` | ISO date-time string | no |  | Updated Since. Only deals updated after this date (inclusive) |
| `created_before` | ISO date-time string | no |  | Created Before. Only deals created before this date (inclusive) |
| `sort_field` | string | no |  | Sort Field. Field to sort by. One of `"created_at"`, `"weighted_value"`. |
| `sort_order` | string | no |  | Sort Order. Sort direction. One of `"asc"`, `"desc"`. |
| `page_size` | number | no |  | Results Per Page. Number of results per page (default: 20) |
| `page_number` | number | no |  | Page Number. Page number to retrieve (default: 1) |
| `include_custom_fields` | boolean | no |  | Include Custom Fields. Include custom field data in results. |

### `search_invoices`

**Search Invoices.** Look up invoices in Teamleader, optionally narrowing by a free-text term, invoice number, customer, department, associated deal/project/subscription, status (draft/outstanding/matched), purchase order or payment reference, or invoice-date/updated date ranges, with paging and sorting. With no filters it lists all invoices; supply filters to find specific matches. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | no |  | Search Term. Search by invoice number, purchase order number, payment reference or customer name. |
| `invoice_number` | string | no |  | Invoice Number. Filter by full invoice number (e.g., "2017 / 5") |
| `customer_type` | string | no |  | Customer Type. Type of customer to filter by. One of `"company"`, `"contact"`. |
| `customer_id` | string | no |  | Customer. Filter invoices by specific customer. A value the product loads from the provider, such as an id; write the value itself. |
| `department_id` | string | no |  | Department. Filter by department (company entity) A value the product loads from the provider, such as an id; write the value itself. |
| `deal_id` | string | no |  | Deal. Filter by associated deal. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | no |  | Project. Filter by associated project. A value the product loads from the provider, such as an id; write the value itself. |
| `subscription_id` | string | no |  | Subscription. Filter by associated subscription. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | array | no |  | Status. Filter by invoice status (multiple selection) One of `"draft"`, `"outstanding"`, `"matched"`. |
| `purchase_order_number` | string | no |  | Purchase Order Number. Filter by purchase order number. |
| `payment_reference` | string | no |  | Payment Reference. Filter by payment reference. |
| `invoice_date_after` | ISO date-time string | no |  | Invoice Date After. Filter invoices with date after this date (inclusive) |
| `invoice_date_before` | ISO date-time string | no |  | Invoice Date Before. Filter invoices with date before this date (inclusive) |
| `updated_since` | ISO date-time string | no |  | Updated Since. Only invoices updated after this date. |
| `sort_field` | string | no |  | Sort Field. Field to sort by. One of `"invoice_number"`, `"invoice_date"`. |
| `sort_order` | string | no |  | Sort Order. Sort direction. One of `"asc"`, `"desc"`. |
| `page_size` | number | no |  | Results Per Page. Number of results per page (default: 20) |
| `page_number` | number | no |  | Page Number. Page number to retrieve (default: 1) |
| `include_late_fees` | boolean | no |  | Include Late Fee Information. Include late fee and interest calculations in response. |

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

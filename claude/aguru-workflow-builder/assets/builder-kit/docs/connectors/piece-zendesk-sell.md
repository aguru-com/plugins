# Zendesk-sell

Sales CRM for pipeline management, lead tracking, and contact organization.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-zendesk-sell'
  version: '0.2.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To get your API token:
> 1. Log in to your Zendesk Sell account.
> 2. Go to **Settings > Integrations > APIs**.
> 3. If no token is active, click **Add API Token**.
> 4. Copy the **API Token**.
>
> You also need your login email.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. Your Zendesk login email address. |
| `api_token` | string | yes |  | API Token. Your Zendesk Sell API Token. |

## Actions

### `create_contact`

**Create Contact.** Creates a new contact (person or organization) in Zendesk Sell. The "Is Organization" flag switches the required field: organizations need a Name, individuals need a Last Name. Use to add a customer or company record to the CRM. Not idempotent — each call creates a separate contact even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `is_organization` | boolean | yes | `false` | Is Organization. Check this box if the contact is an organization. |
| `name` | string | no |  | Organization Name. The name of the organization. Required if "Is Organization" is checked. |
| `last_name` | string | no |  | Last Name. The last name of the individual. Required if "Is Organization" is not checked. |
| `first_name` | string | no |  | First Name. |
| `email` | string | no |  | Email. The contact's primary email address. |
| `phone` | string | no |  | Phone. The contact's phone number. |
| `mobile` | string | no |  | Mobile Phone. The contact's mobile phone number. |
| `tags` | array | no |  | Tags. A list of tags to associate with the record. Values the product loads from the provider, such as ids; write an array of them. |
| `address` | JSON | no | `{"line1":"","city":"","postal_code":"","state":"","country":""}` | Address. An object containing address details (e.g., {"line1": "2726 Smith Street", "city": "Hyannis", "country": "US"}). |
| `custom_fields` | JSON | no | `{}` | Custom Fields. A key-value object for any custom fields (e.g., {"referral_website": "http://www.example.com"}). |
| `other_fields` | JSON | no | `{}` | Other Fields. Enter additional fields as a JSON object (e.g., {"title": "CEO", "website": "http://example.com"}). |

### `create_lead`

**Create Lead.** Creates a new lead in Zendesk Sell. Requires at least one of Last Name or Organization Name. Use to capture a prospect who has not yet been qualified into a contact or deal. Not idempotent — each call creates a separate lead even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `last_name` | string | no |  | Last Name. The lead's last name. Required if Organization Name is empty. |
| `organization_name` | string | no |  | Organization Name. The lead's organization name. Required if Last Name is empty. |
| `first_name` | string | no |  | First Name. |
| `owner_id` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `source_id` | string | no |  | Lead Source. The source of the lead. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. The current status of the lead (e.g., "New"). |
| `title` | string | no |  | Title. The lead's job title. |
| `email` | string | no |  | Email. The lead's email address. |
| `phone` | string | no |  | Phone. The lead's phone number. |
| `mobile` | string | no |  | Mobile Phone. The lead's mobile phone number. |
| `tags` | array | no |  | Tags. A list of tags to associate with the record. Values the product loads from the provider, such as ids; write an array of them. |
| `address` | JSON | no | `{"line1":"","city":"","postal_code":"","state":"","country":""}` | Address. An object containing address details (e.g., {"line1": "123 Main St", "city": "Anytown"}). |
| `custom_fields` | JSON | no | `{}` | Custom Fields. A key-value object for any custom fields (e.g., {"known_via": "tom"}). |
| `other_fields` | JSON | no | `{}` | Other Fields. Enter additional fields as a JSON object (e.g., {"description": "I know him via Tom", "website": "http://example.com"}). |

### `create_deal`

**Create Deal.** Creates a new deal in Zendesk Sell linked to an existing contact. Requires a deal name and a contact ID; optionally set value, currency, pipeline, stage, owner, and source. Use to open a sales opportunity against a known contact. Not idempotent — each call creates a separate deal even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Deal Name. |
| `contact_id` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `value` | string | no |  | Value. The monetary value of the deal (e.g., 15000). |
| `currency` | string | no |  | Currency. 3-character currency code (e.g., USD). |
| `pipeline_id` | string | no |  | Pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `stage_id` | string | no |  | Stage. A value the product loads from the provider, such as an id; write the value itself. |
| `owner_id` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `source_id` | string | no |  | Lead Source. The source of the lead. A value the product loads from the provider, such as an id; write the value itself. |
| `hot` | boolean | no |  | Hot Deal?. Check this box to mark the deal as "hot". |
| `tags` | array | no |  | Tags. A list of tags to associate with the record. Values the product loads from the provider, such as ids; write an array of them. |
| `custom_fields` | JSON | no | `{}` | Custom Fields. A key-value object for any custom fields. |

### `update_contact`

**Update Contact.** Updates fields on an existing Zendesk Sell contact identified by contact ID; only the fields you supply are changed. Use to revise contact details such as name, email, phone, owner, tags, or customer status. Idempotent — re-sending the same field values leaves the contact in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Organization Name. The organization's name (only used for organizational contacts). |
| `first_name` | string | no |  | First Name. The contact's first name (only used for individual contacts). |
| `last_name` | string | no |  | Last Name. The contact's last name (only used for individual contacts). |
| `owner_id` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `customer_status` | string | no |  | Customer Status. One of `"none"`, `"current"`, `"past"`. |
| `email` | string | no |  | Email. The contact's primary email address. |
| `phone` | string | no |  | Phone. The contact's phone number. |
| `tags` | array | no |  | Tags. A list of tags to associate with the record. Values the product loads from the provider, such as ids; write an array of them. |
| `address` | JSON | no |  | Address. An object containing address details (e.g., {"line1": "2726 Smith Street", "city": "Hyannis", "country": "US"}). |
| `custom_fields` | JSON | no |  | Custom Fields. A key-value object for any custom fields (e.g., {"referral_website": "http://www.example.com"}). |
| `other_fields` | JSON | no |  | Other Fields. Enter additional fields as a JSON object (e.g., {"title": "CEO", "website": "http://example.com"}). |

### `update_deal`

**Update Deal.** Updates fields on an existing Zendesk Sell deal identified by deal ID; only the fields you supply are changed, and at least one field must be provided. Use to move a deal between stages or pipelines, change its value, owner, or other attributes. Idempotent — re-sending the same field values leaves the deal in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `deal_id` | string | yes |  | Deal. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Deal Name. |
| `contact_id` | string | no |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `value` | number | no |  | Value (Amount). The monetary value of the deal (e.g., 1500). |
| `currency` | string | no |  | Currency. 3-character currency code (e.g., USD). |
| `estimated_close_date` | string | no |  | Estimated Close Date. The expected close date in YYYY-MM-DD format. |
| `hot` | boolean | no |  | Hot Deal?. Check this box to mark the deal as "hot". |
| `pipeline_id` | string | no |  | Pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `stage_id` | string | no |  | Stage. A value the product loads from the provider, such as an id; write the value itself. |
| `owner_id` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `source_id` | string | no |  | Lead Source. The source of the lead. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. A list of tags to associate with the record. Values the product loads from the provider, such as ids; write an array of them. |
| `custom_fields` | JSON | no | `{}` | Custom Fields. A key-value object for any custom fields. |

### `create_note`

**Create Note.** Attaches a free-text note to a lead, contact, or deal in Zendesk Sell. Select the resource type then the specific record, and provide the note content. Use to log a comment or activity against a CRM record. Not idempotent — each call appends a new note even with identical content. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes |  | Resource Type. The type of resource to attach the note to. One of `"lead"`, `"contact"`, `"deal"`. |
| `dynamic_resource_id` | object | yes |  | Resource ID. Select the specific resource to attach the note to. An object whose fields depend on other inputs; the product shows them. |
| `content` | string | yes |  | Content. The content of the note. |
| `is_important` | boolean | no |  | Important. Mark the note as important (starred). |
| `type` | string | no |  | Visibility. Define the note's visibility. One of `"regular"`, `"restricted"`. |
| `tags` | array | no |  | Tags. An array of tags to add to the note (e.g., ["premium", "follow-up"]). |

### `find_deal`

**Find Deal.** Looks up a single deal in Zendesk Sell, either by its unique deal ID (a direct fetch, prioritized when provided) or by exact deal name (a search that returns the first match). Use to resolve a deal before updating it or to check whether a named deal exists. Requires at least one of ID or name; returns null data when no match is found. Idempotent — a read-only lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `deal_id` | number | no |  | Deal ID. Find a deal by its unique ID. (Prioritized over Name) |
| `deal_name` | string | no |  | Deal Name. Find a deal by its exact name. (Used if Deal ID is not provided) |

### `find_contact`

**Find Contact.** Searches Zendesk Sell contacts by email, name, first/last name, or phone and returns the first match. Use to resolve a contact ID before creating a deal or note, or to check whether a contact already exists. Requires at least one search field; returns null data when no match is found. Idempotent — a read-only lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. |
| `name` | string | no |  | Name. Filter by the contact's full name or organization name. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `phone` | string | no |  | Phone. |

### `find_lead`

**Find Lead.** Searches Zendesk Sell leads filtered by any combination of first/last name, organization name, email, phone, status, source, or owner, and returns the first match. Use to resolve a lead or check whether one already exists before creating it. Requires at least one search field; returns null data when no match is found. Idempotent — a read-only lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `organization_name` | string | no |  | Organization Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `status` | string | no |  | Status. Filter by lead status (e.g., "New"). |
| `source_id` | string | no |  | Lead Source. The source of the lead. A value the product loads from the provider, such as an id; write the value itself. |
| `owner_id` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |

### `find_company`

**Find Company.** Searches Zendesk Sell for an organization-type contact (a company) by name, email, or phone and returns the first match; the search is automatically scoped to organization contacts only. Use to resolve a company record as distinct from an individual contact. Requires at least one search field; returns null data when no match is found. Idempotent — a read-only lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Company Name. The exact name of the company to find. |
| `email` | string | no |  | Email. The company's primary email address. |
| `phone` | string | no |  | Phone. The company's primary phone number. |

### `find_user`

**Find User.** Looks up a Zendesk Sell user (a team member of the account), either by unique user ID (a direct fetch, prioritized when provided) or by filtering on name, email, role, or status and returning the first match. Use to resolve an owner ID for assigning records or to verify a user exists. Requires a user ID or at least one other field; returns null data when no match is found. Idempotent — a read-only lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | number | no |  | User ID. Find a user by their unique ID. (Prioritized over other fields) |
| `name` | string | no |  | Name. Find a user by their full name. |
| `email` | string | no |  | Email. Find a user by their email address. |
| `role` | string | no |  | Role. One of `"user"`, `"admin"`. |
| `status` | string | no |  | Status. One of `"active"`, `"inactive"`. |

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

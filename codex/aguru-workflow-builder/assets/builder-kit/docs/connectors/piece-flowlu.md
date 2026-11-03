# Flowlu

Business management software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-flowlu'
  version: '0.2.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> 1. Log in to your flowlu account.
> 2. Click on your profile-pic(top-right) and navigate to **Portal Settings->API Settings**.
> 3. Create new API key with any name and appropriate scope.
> 4. Copy API Key to your clipboard and paste it in  **API Key** field
> 5. In the Domain field, enter your company from your account URL address. For example, if your account URL address is https://example.flowlu.com, then your domain is **example**.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Your portal name only, for example "example" for https://example.flowlu.com. A pasted portal URL such as https://example.flowlu.com is also accepted. |
| `apiKey` | string | yes |  | API Key. |

## Actions

### `flowlu_create_contact`

**Create CRM Account(Contact).** Creates a new person-type CRM account (a contact) in Flowlu, requiring at least a first name. Use to add an individual to the CRM; for companies use Create CRM Account (Organization) instead. Not idempotent — each call creates a new contact record. For agents use flowlu_account_create. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `honorific_title_id` | string | no |  | Title. A value the product loads from the provider, such as an id; write the value itself. |
| `first_name` | string | yes |  | First Name. |
| `middle_name` | string | no |  | Middle Name. |
| `last_name` | string | no |  | Last Name. |
| `owner_id` | string | no |  | Assignee ID. A value the product loads from the provider, such as an id; write the value itself. |
| `account_category_id` | string | no |  | Account Category. A value the product loads from the provider, such as an id; write the value itself. |
| `industry_id` | string | no |  | Account Industry. A value the product loads from the provider, such as an id; write the value itself. |
| `web` | string | no |  | Website. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Primary Phone Number. |
| `description` | string | no |  | Description. |
| `vat` | string | no |  | VAT or TAX ID. |
| `bank_details` | string | no |  | Bank Details. |
| `telegram` | string | no |  | Telegram. |
| `skype` | string | no |  | Skype Account ID. |
| `link_google` | string | no |  | Link to Google+. Google+ no longer exists and Flowlu has no field for it, so this value is not saved. |
| `link_facebook` | string | no |  | Link to Facebook. |
| `link_linkedin` | string | no |  | Link to Linkedin. |
| `link_instagram` | string | no |  | Link to Instagram. |
| `billing_country` | string | no |  | Billing Country. |
| `billing_state` | string | no |  | Billing State. |
| `billing_city` | string | no |  | Billing City. |
| `billing_zip` | string | no |  | Billing Postal code. |
| `billing_address_line_1` | string | no |  | Billing Address Line 1. |
| `billing_address_line_2` | string | no |  | Billing Address Line 2. |
| `billing_address_line_3` | string | no |  | Billing Address Line 3. |
| `shipping_country` | string | no |  | Shipping Country. |
| `shipping_state` | string | no |  | Shipping State. |
| `shipping_city` | string | no |  | Shipping City. |
| `shipping_zip` | string | no |  | Shipping Postal code. |
| `shipping_address_line_1` | string | no |  | Shipping Address Line 1. |
| `shipping_address_line_2` | string | no |  | Shipping Address Line 2. |
| `shipping_address_line_3` | string | no |  | Shipping Address Line 3. |

Output fields:

- `response`: Account
- `response.id`: Account ID
- `response.type`: Account Type
- `response.name`: Name
- `response.first_name`: First Name
- `response.middle_name`: Middle Name
- `response.last_name`: Last Name
- `response.name_legal_full`: Full Legal Name
- `response.email`: Email (email)
- `response.phone`: Phone
- `response.phone2`: Phone 2
- `response.phone3`: Phone 3
- `response.web`: Website (url)
- `response.owner_id`: Owner User ID
- `response.account_category_id`: Category ID
- `response.industry_id`: Industry ID
- `response.honorific_title_id`: Honorific Title ID
- `response.vat`: VAT or Tax ID
- `response.description`: Description
- `response.telegram`: Telegram
- `response.social_network_link_1`: Skype
- `response.social_network_link_3`: Facebook (url)
- `response.social_network_link_4`: X (Twitter) (url)
- `response.social_network_link_5`: LinkedIn (url)
- `response.social_network_link_6`: Instagram (url)
- `response.billing_country`: Billing Country
- `response.billing_state`: Billing State
- `response.billing_city`: Billing City
- `response.billing_zip`: Billing Postal Code
- `response.billing_address_line_1`: Billing Address
- `response.shipping_country`: Shipping Country
- `response.shipping_city`: Shipping City
- `response.shipping_address_line_1`: Shipping Address
- `response.active`: Active
- `response.created_date`: Created At
- `response.updated_date`: Updated At

### `flowlu_update_contact`

**Update CRM Account(Contact).** Updates fields on an existing CRM account (contact) in Flowlu, identified by its account id. Use to change details such as name, contact info, or category on a known contact. Only the fields you fill are sent, so other fields keep their values; the account type is never changed. The id is required and must reference an existing contact. Idempotent: repeating the same update leaves the contact unchanged. For agents use flowlu_account_update. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact ID. A value the product loads from the provider, such as an id; write the value itself. |
| `honorific_title_id` | string | no |  | Title. A value the product loads from the provider, such as an id; write the value itself. |
| `first_name` | string | no |  | First Name. |
| `middle_name` | string | no |  | Middle Name. |
| `last_name` | string | no |  | Last Name. |
| `owner_id` | string | no |  | Assignee ID. A value the product loads from the provider, such as an id; write the value itself. |
| `account_category_id` | string | no |  | Account Category. A value the product loads from the provider, such as an id; write the value itself. |
| `industry_id` | string | no |  | Account Industry. A value the product loads from the provider, such as an id; write the value itself. |
| `web` | string | no |  | Website. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Primary Phone Number. |
| `description` | string | no |  | Description. |
| `vat` | string | no |  | VAT or TAX ID. |
| `bank_details` | string | no |  | Bank Details. |
| `telegram` | string | no |  | Telegram. |
| `skype` | string | no |  | Skype Account ID. |
| `link_google` | string | no |  | Link to Google+. Google+ no longer exists and Flowlu has no field for it, so this value is not saved. |
| `link_facebook` | string | no |  | Link to Facebook. |
| `link_linkedin` | string | no |  | Link to Linkedin. |
| `link_instagram` | string | no |  | Link to Instagram. |
| `billing_country` | string | no |  | Billing Country. |
| `billing_state` | string | no |  | Billing State. |
| `billing_city` | string | no |  | Billing City. |
| `billing_zip` | string | no |  | Billing Postal code. |
| `billing_address_line_1` | string | no |  | Billing Address Line 1. |
| `billing_address_line_2` | string | no |  | Billing Address Line 2. |
| `billing_address_line_3` | string | no |  | Billing Address Line 3. |
| `shipping_country` | string | no |  | Shipping Country. |
| `shipping_state` | string | no |  | Shipping State. |
| `shipping_city` | string | no |  | Shipping City. |
| `shipping_zip` | string | no |  | Shipping Postal code. |
| `shipping_address_line_1` | string | no |  | Shipping Address Line 1. |
| `shipping_address_line_2` | string | no |  | Shipping Address Line 2. |
| `shipping_address_line_3` | string | no |  | Shipping Address Line 3. |

Output fields:

- `response`: Account
- `response.id`: Account ID
- `response.type`: Account Type
- `response.name`: Name
- `response.first_name`: First Name
- `response.middle_name`: Middle Name
- `response.last_name`: Last Name
- `response.name_legal_full`: Full Legal Name
- `response.email`: Email (email)
- `response.phone`: Phone
- `response.phone2`: Phone 2
- `response.phone3`: Phone 3
- `response.web`: Website (url)
- `response.owner_id`: Owner User ID
- `response.account_category_id`: Category ID
- `response.industry_id`: Industry ID
- `response.honorific_title_id`: Honorific Title ID
- `response.vat`: VAT or Tax ID
- `response.description`: Description
- `response.telegram`: Telegram
- `response.social_network_link_1`: Skype
- `response.social_network_link_3`: Facebook (url)
- `response.social_network_link_4`: X (Twitter) (url)
- `response.social_network_link_5`: LinkedIn (url)
- `response.social_network_link_6`: Instagram (url)
- `response.billing_country`: Billing Country
- `response.billing_state`: Billing State
- `response.billing_city`: Billing City
- `response.billing_zip`: Billing Postal Code
- `response.billing_address_line_1`: Billing Address
- `response.shipping_country`: Shipping Country
- `response.shipping_city`: Shipping City
- `response.shipping_address_line_1`: Shipping Address
- `response.active`: Active
- `response.created_date`: Created At
- `response.updated_date`: Updated At

### `flowlu_delete_contact`

**Delete CRM Account(Contact).** Deletes a CRM account (contact) in Flowlu by its account id. Use to remove a contact record permanently. Effectively idempotent in end state once the record is gone, but it mutates data and a repeat call targets an already-deleted record. For agents use flowlu_account_delete. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact ID. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `response`: Deleted Record
- `response.id`: Deleted ID

### `flowlu_create_organization`

**Create CRM Account(Organization).** Creates a new company-type CRM account (an organization) in Flowlu, requiring an organization name. Use to add a business to the CRM; for individual people use Create CRM Account (Contact) instead. Not idempotent — each call creates a new organization record. For agents use flowlu_account_create. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Organization Name. |
| `name_legal_full` | string | no |  | Full legal name for Organization. |
| `owner_id` | string | no |  | Assignee ID. A value the product loads from the provider, such as an id; write the value itself. |
| `account_category_id` | string | no |  | Account Category. A value the product loads from the provider, such as an id; write the value itself. |
| `industry_id` | string | no |  | Account Industry. A value the product loads from the provider, such as an id; write the value itself. |
| `web` | string | no |  | Website. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Primary Phone Number. |
| `description` | string | no |  | Description. |
| `vat` | string | no |  | VAT or TAX ID. |
| `bank_details` | string | no |  | Bank Details. |
| `telegram` | string | no |  | Telegram. |
| `skype` | string | no |  | Skype Account ID. |
| `link_google` | string | no |  | Link to Google+. Google+ no longer exists and Flowlu has no field for it, so this value is not saved. |
| `link_facebook` | string | no |  | Link to Facebook. |
| `link_linkedin` | string | no |  | Link to Linkedin. |
| `link_instagram` | string | no |  | Link to Instagram. |
| `billing_country` | string | no |  | Billing Country. |
| `billing_state` | string | no |  | Billing State. |
| `billing_city` | string | no |  | Billing City. |
| `billing_zip` | string | no |  | Billing Postal code. |
| `billing_address_line_1` | string | no |  | Billing Address Line 1. |
| `billing_address_line_2` | string | no |  | Billing Address Line 2. |
| `billing_address_line_3` | string | no |  | Billing Address Line 3. |
| `shipping_country` | string | no |  | Shipping Country. |
| `shipping_state` | string | no |  | Shipping State. |
| `shipping_city` | string | no |  | Shipping City. |
| `shipping_zip` | string | no |  | Shipping Postal code. |
| `shipping_address_line_1` | string | no |  | Shipping Address Line 1. |
| `shipping_address_line_2` | string | no |  | Shipping Address Line 2. |
| `shipping_address_line_3` | string | no |  | Shipping Address Line 3. |

Output fields:

- `response`: Account
- `response.id`: Account ID
- `response.type`: Account Type
- `response.name`: Name
- `response.first_name`: First Name
- `response.middle_name`: Middle Name
- `response.last_name`: Last Name
- `response.name_legal_full`: Full Legal Name
- `response.email`: Email (email)
- `response.phone`: Phone
- `response.phone2`: Phone 2
- `response.phone3`: Phone 3
- `response.web`: Website (url)
- `response.owner_id`: Owner User ID
- `response.account_category_id`: Category ID
- `response.industry_id`: Industry ID
- `response.honorific_title_id`: Honorific Title ID
- `response.vat`: VAT or Tax ID
- `response.description`: Description
- `response.telegram`: Telegram
- `response.social_network_link_1`: Skype
- `response.social_network_link_3`: Facebook (url)
- `response.social_network_link_4`: X (Twitter) (url)
- `response.social_network_link_5`: LinkedIn (url)
- `response.social_network_link_6`: Instagram (url)
- `response.billing_country`: Billing Country
- `response.billing_state`: Billing State
- `response.billing_city`: Billing City
- `response.billing_zip`: Billing Postal Code
- `response.billing_address_line_1`: Billing Address
- `response.shipping_country`: Shipping Country
- `response.shipping_city`: Shipping City
- `response.shipping_address_line_1`: Shipping Address
- `response.active`: Active
- `response.created_date`: Created At
- `response.updated_date`: Updated At

### `flowlu_update_organization`

**Update CRM Account(Organization).** Updates fields on an existing CRM organization in Flowlu picked from a list. Only filled fields are sent; the account type is never changed. For agents use flowlu_account_update. Idempotent: repeating the same update leaves the organization unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Organization Name. |
| `name_legal_full` | string | no |  | Full legal name for Organization. |
| `owner_id` | string | no |  | Assignee ID. A value the product loads from the provider, such as an id; write the value itself. |
| `account_category_id` | string | no |  | Account Category. A value the product loads from the provider, such as an id; write the value itself. |
| `industry_id` | string | no |  | Account Industry. A value the product loads from the provider, such as an id; write the value itself. |
| `web` | string | no |  | Website. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Primary Phone Number. |
| `description` | string | no |  | Description. |
| `vat` | string | no |  | VAT or TAX ID. |
| `bank_details` | string | no |  | Bank Details. |
| `telegram` | string | no |  | Telegram. |
| `skype` | string | no |  | Skype Account ID. |
| `link_google` | string | no |  | Link to Google+. Google+ no longer exists and Flowlu has no field for it, so this value is not saved. |
| `link_facebook` | string | no |  | Link to Facebook. |
| `link_linkedin` | string | no |  | Link to Linkedin. |
| `link_instagram` | string | no |  | Link to Instagram. |
| `billing_country` | string | no |  | Billing Country. |
| `billing_state` | string | no |  | Billing State. |
| `billing_city` | string | no |  | Billing City. |
| `billing_zip` | string | no |  | Billing Postal code. |
| `billing_address_line_1` | string | no |  | Billing Address Line 1. |
| `billing_address_line_2` | string | no |  | Billing Address Line 2. |
| `billing_address_line_3` | string | no |  | Billing Address Line 3. |
| `shipping_country` | string | no |  | Shipping Country. |
| `shipping_state` | string | no |  | Shipping State. |
| `shipping_city` | string | no |  | Shipping City. |
| `shipping_zip` | string | no |  | Shipping Postal code. |
| `shipping_address_line_1` | string | no |  | Shipping Address Line 1. |
| `shipping_address_line_2` | string | no |  | Shipping Address Line 2. |
| `shipping_address_line_3` | string | no |  | Shipping Address Line 3. |

Output fields:

- `id`: Account ID
- `type`: Account Type
- `name`: Name
- `first_name`: First Name
- `middle_name`: Middle Name
- `last_name`: Last Name
- `name_legal_full`: Full Legal Name
- `email`: Email (email)
- `phone`: Phone
- `phone2`: Phone 2
- `phone3`: Phone 3
- `web`: Website (url)
- `owner_id`: Owner User ID
- `account_category_id`: Category ID
- `industry_id`: Industry ID
- `honorific_title_id`: Honorific Title ID
- `vat`: VAT or Tax ID
- `description`: Description
- `telegram`: Telegram
- `social_network_link_1`: Skype
- `social_network_link_3`: Facebook (url)
- `social_network_link_4`: X (Twitter) (url)
- `social_network_link_5`: LinkedIn (url)
- `social_network_link_6`: Instagram (url)
- `billing_country`: Billing Country
- `billing_state`: Billing State
- `billing_city`: Billing City
- `billing_zip`: Billing Postal Code
- `billing_address_line_1`: Billing Address
- `shipping_country`: Shipping Country
- `shipping_city`: Shipping City
- `shipping_address_line_1`: Shipping Address
- `active`: Active
- `created_date`: Created At
- `updated_date`: Updated At

### `flowlu_get_account`

**Get CRM Account.** Returns one Flowlu CRM account (contact or organization: names, phones, website, owner, category, addresses) by its numeric account_id. Use to read an account before updating it or linking it; use flowlu_find_accounts to look one up by name or email. Fails if the account does not exist. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. Numeric ID of the contact or organization, such as "42". Map it from an earlier step or from Find CRM Accounts. |

Output fields:

- `id`: Account ID
- `type`: Account Type
- `name`: Name
- `first_name`: First Name
- `middle_name`: Middle Name
- `last_name`: Last Name
- `name_legal_full`: Full Legal Name
- `email`: Email (email)
- `phone`: Phone
- `phone2`: Phone 2
- `phone3`: Phone 3
- `web`: Website (url)
- `owner_id`: Owner User ID
- `account_category_id`: Category ID
- `industry_id`: Industry ID
- `honorific_title_id`: Honorific Title ID
- `vat`: VAT or Tax ID
- `description`: Description
- `telegram`: Telegram
- `social_network_link_1`: Skype
- `social_network_link_3`: Facebook (url)
- `social_network_link_4`: X (Twitter) (url)
- `social_network_link_5`: LinkedIn (url)
- `social_network_link_6`: Instagram (url)
- `billing_country`: Billing Country
- `billing_state`: Billing State
- `billing_city`: Billing City
- `billing_zip`: Billing Postal Code
- `billing_address_line_1`: Billing Address
- `shipping_country`: Shipping Country
- `shipping_city`: Shipping City
- `shipping_address_line_1`: Shipping Address
- `active`: Active
- `created_date`: Created At
- `updated_date`: Updated At

### `flowlu_find_accounts`

**Find CRM Accounts.** Searches Flowlu CRM accounts by text (matches names and other text fields) and optional filters for account type, owner and active state, returning one page of matching contacts/organizations with has_more for paging. Use to find an account ID before getting, updating, linking or deleting it, or to check for duplicates before creating one. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Text to look for in account names and other text fields, such as "Acme". Leave empty to list all. |
| `account_type` | string | no | `"any"` | Account Type. Only contacts, only organizations, or both. One of `"any"`, `"contact"`, `"organization"`. |
| `owner_id` | string | no |  | Owner User ID. Only accounts owned by this user. Numeric user ID from List Users. |
| `include_inactive` | boolean | no | `false` | Include Inactive. Also return accounts marked inactive. |
| `order` | string | no | `"newest"` | Order. Newest first (highest ID first) or oldest first. One of `"newest"`, `"oldest"`. |
| `page` | number | no | `1` | Page. Page of results to return, starting at 1. Use with Limit; check has_more in the output to know if another page exists. |
| `limit` | number | no | `50` | Limit. How many records to return per page, 1 to 100. Default 50. |

Output fields:

- `items`: Accounts
- `items[].id`: Account ID
- `items[].type`: Account Type
- `items[].name`: Name
- `items[].first_name`: First Name
- `items[].middle_name`: Middle Name
- `items[].last_name`: Last Name
- `items[].name_legal_full`: Full Legal Name
- `items[].email`: Email (email)
- `items[].phone`: Phone
- `items[].phone2`: Phone 2
- `items[].phone3`: Phone 3
- `items[].web`: Website (url)
- `items[].owner_id`: Owner User ID
- `items[].account_category_id`: Category ID
- `items[].industry_id`: Industry ID
- `items[].honorific_title_id`: Honorific Title ID
- `items[].VAT`: VAT or Tax ID
- `items[].description`: Description
- `items[].telegram`: Telegram
- `items[].social_network_link_1`: Skype
- `items[].social_network_link_3`: Facebook (url)
- `items[].social_network_link_4`: X (Twitter) (url)
- `items[].social_network_link_5`: LinkedIn (url)
- `items[].social_network_link_6`: Instagram (url)
- `items[].billing_country`: Billing Country
- `items[].billing_state`: Billing State
- `items[].billing_city`: Billing City
- `items[].billing_zip`: Billing Postal Code
- `items[].billing_address_line_1`: Billing Address
- `items[].shipping_country`: Shipping Country
- `items[].shipping_city`: Shipping City
- `items[].shipping_address_line_1`: Shipping Address
- `items[].active`: Active
- `items[].created_date`: Created At
- `items[].updated_date`: Updated At
- `page`: Page (number)
- `count`: Returned (number)
- `total`: Total Matches (number)
- `has_more`: Has More (boolean)

### `flowlu_create_opportunity`

**Create Opportunity.** Creates a new sales opportunity (deal) in Flowlu CRM, requiring a title. Use to open a new deal, optionally linking it to an account, sales pipeline, and stage. Not idempotent — each call creates a new opportunity record. For agents use flowlu_opportunity_create. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Title. |
| `budget` | number | no |  | Opportunity Amount. |
| `description` | string | no |  | Description. |
| `source_id` | string | no |  | Opportunity Source. A value the product loads from the provider, such as an id; write the value itself. |
| `start_date` | ISO date-time string | no |  | Start Date. Please use YYYY-MM-DD HH:mm:ss format. |
| `deadline` | ISO date-time string | no |  | End Date. Please use YYYY-MM-DD HH:mm:ss format. |
| `assignee_id` | string | no |  | Assignee ID. A value the product loads from the provider, such as an id; write the value itself. |
| `customer_id` | string | no |  | Customer ID. This is an id of the CRM company or contact which is needed to be linked with the opportunity. This allows you to link the client to the opportunity. If your client is a company, and you need to relate an opportunity to the person (contact) at this company, then enter his/her id in the contact_id f… A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | no |  | Contact ID. Id of the company-related contact (account_id). A value the product loads from the provider, such as an id; write the value itself. |
| `pipeline_id` | string | no |  | Sales Pipeline ID. A value the product loads from the provider, such as an id; write the value itself. |
| `pipeline_stage_id` | string | no |  | Sales Pipeline Stage ID. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `response`: Opportunity
- `response.id`: Opportunity ID
- `response.name`: Name
- `response.budget`: Amount (number)
- `response.active`: Status
- `response.pipeline_id`: Pipeline ID
- `response.pipeline_stage_id`: Pipeline Stage ID
- `response.source_id`: Source ID
- `response.assignee_id`: Assignee User ID
- `response.start_date`: Start Date (date)
- `response.deadline`: Expected Close Date (date)
- `response.closing_date`: Close Date (date)
- `response.closing_status_id`: Loss Reason ID
- `response.closing_comment`: Closing Comment
- `response.description`: Description
- `response.contact_name`: Contact Name
- `response.contact_email`: Contact Email (email)
- `response.contact_phone`: Contact Phone
- `response.contact_company`: Contact Company
- `response.contact_position`: Contact Position
- `response.created_date`: Created At
- `response.updated_date`: Updated At
- `linked_accounts`: Linked Accounts
- `linked_accounts[].id`: Link ID
- `linked_accounts[].lead_id`: Opportunity ID
- `linked_accounts[].account_id`: Account ID
- `linked_accounts[].account_type`: Account Type
- `linked_accounts[].already_linked`: Already Linked (boolean)
- `link_errors`: Link Errors
- `link_errors[].account_id`: Account ID
- `link_errors[].error`: Error

### `flowlu_update_opportunity`

**Update Opportunity.** Updates fields on an existing sales opportunity (deal) in Flowlu CRM, identified by its opportunity id. Use to change a deal's title, pipeline stage, linked account, or other details, or to mark it won or lost. Only filled fields are sent; a stage without a pipeline is checked against the deal's current pipeline. Idempotent: repeating the same update leaves the deal unchanged, and repeating Won or Lost keeps the existing close date. For agents use flowlu_opportunity_update. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Opportunity ID. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Title. |
| `budget` | number | no |  | Opportunity Amount. |
| `description` | string | no |  | Description. |
| `source_id` | string | no |  | Opportunity Source. A value the product loads from the provider, such as an id; write the value itself. |
| `start_date` | ISO date-time string | no |  | Start Date. Please use YYYY-MM-DD HH:mm:ss format. |
| `deadline` | ISO date-time string | no |  | End Date. Please use YYYY-MM-DD HH:mm:ss format. |
| `assignee_id` | string | no |  | Assignee ID. A value the product loads from the provider, such as an id; write the value itself. |
| `customer_id` | string | no |  | Customer ID. This is an id of the CRM company or contact which is needed to be linked with the opportunity. This allows you to link the client to the opportunity. If your client is a company, and you need to relate an opportunity to the person (contact) at this company, then enter his/her id in the contact_id f… A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | no |  | Contact ID. Id of the company-related contact (account_id). A value the product loads from the provider, such as an id; write the value itself. |
| `pipeline_id` | string | no |  | Sales Pipeline ID. A value the product loads from the provider, such as an id; write the value itself. |
| `pipeline_stage_id` | string | no |  | Sales Pipeline Stage ID. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. Set to Won or Lost to close the opportunity, or In progress to reopen it. Moving it to Won or Lost sets the close date to today; an opportunity that already has that status keeps its close date. Leave empty to keep the current status. One of `1`, `2`, `3`. |
| `closing_status_id` | string | no |  | Loss Reason. Why the opportunity was lost. Only used when Status is Lost. A value the product loads from the provider, such as an id; write the value itself. |
| `closing_comment` | string | no |  | Closing Comment. Note about why the opportunity was won or lost. |

Output fields:

- `response`: Opportunity
- `response.id`: Opportunity ID
- `response.name`: Name
- `response.budget`: Amount (number)
- `response.active`: Status
- `response.pipeline_id`: Pipeline ID
- `response.pipeline_stage_id`: Pipeline Stage ID
- `response.source_id`: Source ID
- `response.assignee_id`: Assignee User ID
- `response.start_date`: Start Date (date)
- `response.deadline`: Expected Close Date (date)
- `response.closing_date`: Close Date (date)
- `response.closing_status_id`: Loss Reason ID
- `response.closing_comment`: Closing Comment
- `response.description`: Description
- `response.contact_name`: Contact Name
- `response.contact_email`: Contact Email (email)
- `response.contact_phone`: Contact Phone
- `response.contact_company`: Contact Company
- `response.contact_position`: Contact Position
- `response.created_date`: Created At
- `response.updated_date`: Updated At
- `linked_accounts`: Linked Accounts
- `linked_accounts[].id`: Link ID
- `linked_accounts[].lead_id`: Opportunity ID
- `linked_accounts[].account_id`: Account ID
- `linked_accounts[].account_type`: Account Type
- `linked_accounts[].already_linked`: Already Linked (boolean)
- `link_errors`: Link Errors
- `link_errors[].account_id`: Account ID
- `link_errors[].error`: Error

### `flowlu_delete_opportunity`

**Delete Opportunity.** Deletes a sales opportunity (deal) in Flowlu CRM by its opportunity id. Use to permanently remove a deal. Effectively idempotent in end state once removed, but it mutates data and a repeat call targets an already-deleted record. For agents use flowlu_opportunity_delete. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Opportunity ID. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `response`: Deleted Record
- `response.id`: Deleted ID

### `flowlu_get_opportunity`

**Get Opportunity.** Returns one Flowlu opportunity (deal: name, amount, pipeline and stage, status, assignee, dates) by its numeric opportunity_id. Use to read a deal before updating or closing it; use flowlu_find_opportunities to look deals up by name or pipeline. Fails if it does not exist. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunity_id` | string | yes |  | Opportunity ID. Numeric opportunity ID, such as "42". Map it from an earlier step or from Find Opportunities. |

Output fields:

- `id`: Opportunity ID
- `name`: Name
- `budget`: Amount (number)
- `active`: Status
- `pipeline_id`: Pipeline ID
- `pipeline_stage_id`: Pipeline Stage ID
- `source_id`: Source ID
- `assignee_id`: Assignee User ID
- `start_date`: Start Date (date)
- `deadline`: Expected Close Date (date)
- `closing_date`: Close Date (date)
- `closing_status_id`: Loss Reason ID
- `closing_comment`: Closing Comment
- `description`: Description
- `contact_name`: Contact Name
- `contact_email`: Contact Email (email)
- `contact_phone`: Contact Phone
- `contact_company`: Contact Company
- `contact_position`: Contact Position
- `created_date`: Created At
- `updated_date`: Updated At

### `flowlu_find_opportunities`

**Find Opportunities.** Searches Flowlu opportunities by text and optional filters for pipeline, stage, status (in progress, lost, won) and assignee, returning one page of deals with has_more for paging. Use to find an opportunity ID before reading, updating, linking or deleting it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Text to look for in opportunity names and other text fields. Leave empty to list all. |
| `pipeline_id` | string | no |  | Pipeline ID. Only opportunities in this pipeline. Numeric ID from List Reference Values (pipelines). |
| `pipeline_stage_id` | string | no |  | Pipeline Stage ID. Only opportunities in this stage. Numeric ID from List Reference Values (pipeline_stages). |
| `status` | string | no |  | Status. Only in-progress, lost or won opportunities. Leave empty for all. One of `1`, `2`, `3`. |
| `assignee_id` | string | no |  | Assignee User ID. Only opportunities assigned to this user. Numeric user ID from List Users. |
| `order` | string | no | `"newest"` | Order. Newest first (highest ID first) or oldest first. One of `"newest"`, `"oldest"`. |
| `page` | number | no | `1` | Page. Page of results to return, starting at 1. Use with Limit; check has_more in the output to know if another page exists. |
| `limit` | number | no | `50` | Limit. How many records to return per page, 1 to 100. Default 50. |

Output fields:

- `items`: Opportunities
- `items[].id`: Opportunity ID
- `items[].name`: Name
- `items[].budget`: Amount (number)
- `items[].active`: Status
- `items[].pipeline_id`: Pipeline ID
- `items[].pipeline_stage_id`: Pipeline Stage ID
- `items[].source_id`: Source ID
- `items[].assignee_id`: Assignee User ID
- `items[].start_date`: Start Date (date)
- `items[].deadline`: Expected Close Date (date)
- `items[].closing_date`: Close Date (date)
- `items[].closing_status_id`: Loss Reason ID
- `items[].closing_comment`: Closing Comment
- `items[].description`: Description
- `items[].contact_name`: Contact Name
- `items[].contact_email`: Contact Email (email)
- `items[].contact_phone`: Contact Phone
- `items[].contact_company`: Contact Company
- `items[].contact_position`: Contact Position
- `items[].created_date`: Created At
- `items[].updated_date`: Updated At
- `page`: Page (number)
- `count`: Returned (number)
- `total`: Total Matches (number)
- `has_more`: Has More (boolean)

### `flowlu_link_account_to_opportunity`

**Link Account to Opportunity.** Links one Flowlu CRM account (contact or organization) to one opportunity, so the deal shows that customer. Checks for an existing link first and returns it with already_linked true instead of adding a duplicate, so it is safe to retry. Needs the opportunity ID, the account ID and whether the account is a contact or an organization. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunity_id` | string | yes |  | Opportunity ID. Numeric opportunity ID, such as "42". |
| `account_id` | string | yes |  | Account ID. Numeric ID of the contact or organization to link, such as "17". |
| `account_type` | string | yes |  | Account Type. Whether the account is a contact (person) or an organization (company). One of `"organization"`, `"contact"`. |

Output fields:

- `id`: Link ID
- `lead_id`: Opportunity ID
- `account_id`: Account ID
- `account_type`: Account Type
- `already_linked`: Already Linked (boolean)

### `flowlu_create_task`

**Create Task.** Creates a new task in Flowlu, requiring a name and optionally setting priority, start/deadline dates, assignee (responsible/owner), type, task workflow stage, project and CRM account. Use to add a to-do or assignment. Not idempotent — each call creates a new task. For agents use flowlu_task_create. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `priority` | string | no |  | Priority. One of `1`, `2`, `3`. |
| `plan_start_date` | ISO date-time string | no |  | Start Date. Please use YYYY-MM-DD HH:mm:ss format. |
| `deadline` | ISO date-time string | no |  | End Date. Please use YYYY-MM-DD HH:mm:ss format. |
| `deadline_allowchange` | boolean | no | `false` | The assignee can change the end date for this task?. |
| `task_checkbyowner` | boolean | no | `false` | This task needs approval from the owner?. |
| `responsible_id` | string | no |  | Assignee ID. A value the product loads from the provider, such as an id; write the value itself. |
| `owner_id` | string | no |  | Owner ID. A value the product loads from the provider, such as an id; write the value itself. |
| `type` | string | no | `0` | Task Type. One of `0`, `1`, `20`, `30`. |
| `workflow_id` | string | no |  | Task Workflow ID. A value the product loads from the provider, such as an id; write the value itself. |
| `workflow_stage_id` | string | no |  | Task Workflow Status ID. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | no |  | Project. Links the task to this project. A value the product loads from the provider, such as an id; write the value itself. |
| `crm_account_id` | string | no |  | CRM Account. Links the task to this CRM contact or organization. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `response`: Task
- `response.id`: Task ID
- `response.name`: Name
- `response.description`: Description
- `response.status`: Status
- `response.priority`: Priority
- `response.type`: Type
- `response.responsible_id`: Assignee User ID
- `response.owner_id`: Owner User ID
- `response.plan_start_date`: Start Date
- `response.deadline`: Deadline
- `response.start_date`: Started At
- `response.closed_date`: Completed At
- `response.workflow_id`: Workflow ID
- `response.workflow_stage_id`: Workflow Status ID
- `response.module`: Linked Module
- `response.model`: Linked Object Type
- `response.model_id`: Linked Object ID
- `response.crm_account_id`: CRM Account ID
- `response.parent_id`: Parent Task ID
- `response.deadline_allowchange`: Assignee Can Change Deadline
- `response.task_checkbyowner`: Needs Owner Approval
- `response.time_estimate`: Estimated Time
- `response.time_spent`: Time Spent
- `response.created_date`: Created At
- `response.updated_date`: Updated At

### `flowlu_update_task`

**Update Task.** Updates fields on an existing task in Flowlu, identified by its task id. Use to change a task's name, priority, dates, assignee, status, project, or workflow stage, or to change its type to Inbox, Event or Task template (choosing Task keeps the current type). Empty fields are not sent; the two approval/deadline checkboxes are always sent. The task id is required and must reference an existing task. Idempotent: repeating the same update leaves the task unchanged. For agents use flowlu_task_update. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `priority` | string | no |  | Priority. One of `1`, `2`, `3`. |
| `plan_start_date` | ISO date-time string | no |  | Start Date. Please use YYYY-MM-DD HH:mm:ss format. |
| `deadline` | ISO date-time string | no |  | End Date. Please use YYYY-MM-DD HH:mm:ss format. |
| `deadline_allowchange` | boolean | no | `false` | The assignee can change the end date for this task?. |
| `task_checkbyowner` | boolean | no | `false` | This task needs approval from the owner?. |
| `responsible_id` | string | no |  | Assignee ID. A value the product loads from the provider, such as an id; write the value itself. |
| `owner_id` | string | no |  | Owner ID. A value the product loads from the provider, such as an id; write the value itself. |
| `type` | string | no | `0` | Task Type. One of `0`, `1`, `20`, `30`. |
| `workflow_id` | string | no |  | Task Workflow ID. A value the product loads from the provider, such as an id; write the value itself. |
| `workflow_stage_id` | string | no |  | Task Workflow Status ID. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | no |  | Project. Links the task to this project. A value the product loads from the provider, such as an id; write the value itself. |
| `crm_account_id` | string | no |  | CRM Account. Links the task to this CRM contact or organization. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. New task status. Leave empty to keep the current status. One of `1`, `3`, `4`, `5`. |

Output fields:

- `response`: Task
- `response.id`: Task ID
- `response.name`: Name
- `response.description`: Description
- `response.status`: Status
- `response.priority`: Priority
- `response.type`: Type
- `response.responsible_id`: Assignee User ID
- `response.owner_id`: Owner User ID
- `response.plan_start_date`: Start Date
- `response.deadline`: Deadline
- `response.start_date`: Started At
- `response.closed_date`: Completed At
- `response.workflow_id`: Workflow ID
- `response.workflow_stage_id`: Workflow Status ID
- `response.module`: Linked Module
- `response.model`: Linked Object Type
- `response.model_id`: Linked Object ID
- `response.crm_account_id`: CRM Account ID
- `response.parent_id`: Parent Task ID
- `response.deadline_allowchange`: Assignee Can Change Deadline
- `response.task_checkbyowner`: Needs Owner Approval
- `response.time_estimate`: Estimated Time
- `response.time_spent`: Time Spent
- `response.created_date`: Created At
- `response.updated_date`: Updated At

### `flowlu_get_task`

**Get Task.** Retrieves a single task from Flowlu by its task id. Use to look up a task's current details before acting on it. Read-only and idempotent. For agents use flowlu_task_get. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `response`: Task
- `response.id`: Task ID
- `response.name`: Name
- `response.description`: Description
- `response.status`: Status
- `response.priority`: Priority
- `response.type`: Type
- `response.responsible_id`: Assignee User ID
- `response.owner_id`: Owner User ID
- `response.plan_start_date`: Start Date
- `response.deadline`: Deadline
- `response.start_date`: Started At
- `response.closed_date`: Completed At
- `response.workflow_id`: Workflow ID
- `response.workflow_stage_id`: Workflow Status ID
- `response.module`: Linked Module
- `response.model`: Linked Object Type
- `response.model_id`: Linked Object ID
- `response.crm_account_id`: CRM Account ID
- `response.parent_id`: Parent Task ID
- `response.deadline_allowchange`: Assignee Can Change Deadline
- `response.task_checkbyowner`: Needs Owner Approval
- `response.time_estimate`: Estimated Time
- `response.time_spent`: Time Spent
- `response.created_date`: Created At
- `response.updated_date`: Updated At

### `flowlu_delete_task`

**Delete Task.** Deletes a task in Flowlu by its task id. Use to permanently remove a task. Effectively idempotent in end state once removed, but it mutates data and a repeat call targets an already-deleted record. For agents use flowlu_task_delete. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `response`: Deleted Record
- `response.id`: Deleted ID

### `flowlu_find_tasks`

**Find Tasks.** Searches Flowlu tasks by text and optional filters for status, assignee and project, returning one page of tasks with has_more for paging. Use to find a task ID before reading, updating or deleting it, or to list a project's open tasks. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Text to look for in task names and other text fields. Leave empty to list all. |
| `status` | string | no |  | Status. Only tasks with this status. Leave empty for all. One of `1`, `3`, `4`, `5`. |
| `responsible_id` | string | no |  | Assignee User ID. Only tasks assigned to this user. Numeric user ID from List Users. |
| `project_id` | string | no |  | Project ID. Only tasks in this project. Numeric ID from Find Projects. |
| `order` | string | no | `"newest"` | Order. Newest first (highest ID first) or oldest first. One of `"newest"`, `"oldest"`. |
| `page` | number | no | `1` | Page. Page of results to return, starting at 1. Use with Limit; check has_more in the output to know if another page exists. |
| `limit` | number | no | `50` | Limit. How many records to return per page, 1 to 100. Default 50. |

Output fields:

- `items`: Tasks
- `items[].id`: Task ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].status`: Status
- `items[].priority`: Priority
- `items[].type`: Type
- `items[].responsible_id`: Assignee User ID
- `items[].owner_id`: Owner User ID
- `items[].plan_start_date`: Start Date
- `items[].deadline`: Deadline
- `items[].start_date`: Started At
- `items[].closed_date`: Completed At
- `items[].workflow_id`: Workflow ID
- `items[].workflow_stage_id`: Workflow Status ID
- `items[].module`: Linked Module
- `items[].model`: Linked Object Type
- `items[].model_id`: Linked Object ID
- `items[].crm_account_id`: CRM Account ID
- `items[].parent_id`: Parent Task ID
- `items[].deadline_allowchange`: Assignee Can Change Deadline
- `items[].task_checkbyowner`: Needs Owner Approval
- `items[].time_estimate`: Estimated Time
- `items[].time_spent`: Time Spent
- `items[].created_date`: Created At
- `items[].updated_date`: Updated At
- `page`: Page (number)
- `count`: Returned (number)
- `total`: Total Matches (number)
- `has_more`: Has More (boolean)

### `flowlu_create_project`

**Create Project.** Creates a new Flowlu project with a manager, customer, dates and template picked from lists. For agents use flowlu_project_create. Not idempotent: each call creates a new project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `project_type_id` | string | no |  | Project Template. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. |
| `manager_id` | string | no |  | Project Manager. A value the product loads from the provider, such as an id; write the value itself. |
| `customer_id` | string | no |  | Customer (Organization). The CRM organization the project is for. A value the product loads from the provider, such as an id; write the value itself. |
| `customer_crm_contact_id` | string | no |  | Customer Contact. The contact person at the customer. A value the product loads from the provider, such as an id; write the value itself. |
| `crm_lead_id` | string | no |  | Opportunity ID. A value the product loads from the provider, such as an id; write the value itself. |
| `startdate` | ISO date-time string | no |  | Start Date. Only the date part is used. |
| `enddate` | ISO date-time string | no |  | End Date. Only the date part is used. |
| `priority` | string | no |  | Priority. One of `1`, `2`, `3`. |
| `portfolio_id` | string | no |  | Portfolio. A value the product loads from the provider, such as an id; write the value itself. |
| `tasks_workflow_id` | string | no |  | Task Workflow ID. A value the product loads from the provider, such as an id; write the value itself. |
| `estimated_revenue` | number | no |  | Contract Amount. Planned revenue for the project. |
| `estimated_expenses` | number | no |  | Planned Expenses. |

Output fields:

- `id`: Project ID
- `name`: Name
- `description`: Description
- `manager_id`: Manager User ID
- `customer_id`: Customer Organization ID
- `customer_crm_contact_id`: Customer Contact ID
- `crm_lead_id`: Opportunity ID
- `project_type_id`: Template ID
- `briefcase_id`: Portfolio ID
- `tasks_workflow_id`: Task Workflow ID
- `priority`: Priority
- `startdate`: Start Date (date)
- `enddate`: End Date (date)
- `estimated_revenue`: Contract Amount (number)
- `estimated_expenses`: Planned Expenses (number)
- `is_archive`: Archived
- `created_date`: Created At
- `updated_date`: Updated At
- `read_back_error`: Read-back Error

### `flowlu_update_project`

**Update Project.** Updates fields on an existing Flowlu project picked from a list, including archiving it. Only filled fields are sent. For agents use flowlu_project_update. Idempotent: repeating the same update leaves the project unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `manager_id` | string | no |  | Project Manager. A value the product loads from the provider, such as an id; write the value itself. |
| `customer_id` | string | no |  | Customer (Organization). The CRM organization the project is for. A value the product loads from the provider, such as an id; write the value itself. |
| `customer_crm_contact_id` | string | no |  | Customer Contact. The contact person at the customer. A value the product loads from the provider, such as an id; write the value itself. |
| `crm_lead_id` | string | no |  | Opportunity ID. A value the product loads from the provider, such as an id; write the value itself. |
| `startdate` | ISO date-time string | no |  | Start Date. Only the date part is used. |
| `enddate` | ISO date-time string | no |  | End Date. Only the date part is used. |
| `priority` | string | no |  | Priority. One of `1`, `2`, `3`. |
| `portfolio_id` | string | no |  | Portfolio. A value the product loads from the provider, such as an id; write the value itself. |
| `tasks_workflow_id` | string | no |  | Task Workflow ID. A value the product loads from the provider, such as an id; write the value itself. |
| `estimated_revenue` | number | no |  | Contract Amount. Planned revenue for the project. |
| `estimated_expenses` | number | no |  | Planned Expenses. |
| `is_archive` | string | no |  | Archived. Archive or restore the project. Leave empty to keep it as is. One of `"yes"`, `"no"`. |

Output fields:

- `id`: Project ID
- `name`: Name
- `description`: Description
- `manager_id`: Manager User ID
- `customer_id`: Customer Organization ID
- `customer_crm_contact_id`: Customer Contact ID
- `crm_lead_id`: Opportunity ID
- `project_type_id`: Template ID
- `briefcase_id`: Portfolio ID
- `tasks_workflow_id`: Task Workflow ID
- `priority`: Priority
- `startdate`: Start Date (date)
- `enddate`: End Date (date)
- `estimated_revenue`: Contract Amount (number)
- `estimated_expenses`: Planned Expenses (number)
- `is_archive`: Archived
- `created_date`: Created At
- `updated_date`: Updated At

### `flowlu_get_project`

**Get Project.** Returns one Flowlu project (name, manager, customer, dates, priority, archive state, planned revenue/expenses) by its numeric project_id. Use to read a project before updating it; use flowlu_find_projects to look projects up by name. Fails if it does not exist. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. Numeric project ID, such as "42". Map it from an earlier step or from Find Projects. |

Output fields:

- `id`: Project ID
- `name`: Name
- `description`: Description
- `manager_id`: Manager User ID
- `customer_id`: Customer Organization ID
- `customer_crm_contact_id`: Customer Contact ID
- `crm_lead_id`: Opportunity ID
- `project_type_id`: Template ID
- `briefcase_id`: Portfolio ID
- `tasks_workflow_id`: Task Workflow ID
- `priority`: Priority
- `startdate`: Start Date (date)
- `enddate`: End Date (date)
- `estimated_revenue`: Contract Amount (number)
- `estimated_expenses`: Planned Expenses (number)
- `is_archive`: Archived
- `created_date`: Created At
- `updated_date`: Updated At

### `flowlu_find_projects`

**Find Projects.** Searches Flowlu projects by text and optional filters for manager and customer organization, skipping archived projects unless include_archived is set, and returns one page with has_more for paging. Use to find a project ID before reading or updating it or adding tasks to it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Text to look for in project names and other text fields. Leave empty to list all. |
| `manager_id` | string | no |  | Manager User ID. Only projects managed by this user. Numeric user ID from List Users. |
| `customer_id` | string | no |  | Customer Organization ID. Only projects for this CRM organization. Numeric ID from Find CRM Accounts. |
| `include_archived` | boolean | no | `false` | Include Archived. Also return archived projects. |
| `order` | string | no | `"newest"` | Order. Newest first (highest ID first) or oldest first. One of `"newest"`, `"oldest"`. |
| `page` | number | no | `1` | Page. Page of results to return, starting at 1. Use with Limit; check has_more in the output to know if another page exists. |
| `limit` | number | no | `50` | Limit. How many records to return per page, 1 to 100. Default 50. |

Output fields:

- `items`: Projects
- `items[].id`: Project ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].manager_id`: Manager User ID
- `items[].customer_id`: Customer Organization ID
- `items[].customer_crm_contact_id`: Customer Contact ID
- `items[].crm_lead_id`: Opportunity ID
- `items[].project_type_id`: Template ID
- `items[].briefcase_id`: Portfolio ID
- `items[].tasks_workflow_id`: Task Workflow ID
- `items[].priority`: Priority
- `items[].startdate`: Start Date (date)
- `items[].enddate`: End Date (date)
- `items[].estimated_revenue`: Contract Amount (number)
- `items[].estimated_expenses`: Planned Expenses (number)
- `items[].is_archive`: Archived
- `items[].created_date`: Created At
- `items[].updated_date`: Updated At
- `page`: Page (number)
- `count`: Returned (number)
- `total`: Total Matches (number)
- `has_more`: Has More (boolean)

### `flowlu_list_users`

**List Users.** Lists Flowlu portal users (id, name, email login, admin flag) with optional text search, one page at a time with has_more. Use to resolve a person's name or email to the user ID needed for task assignee/owner, opportunity assignee, account owner or project manager. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Text to look for in user names and emails, such as "jane". Leave empty to list all. |
| `include_disabled` | boolean | no | `false` | Include Users Without Login. Also return users who are not allowed to log in. |
| `page` | number | no | `1` | Page. Page of results to return, starting at 1. Use with Limit; check has_more in the output to know if another page exists. |
| `limit` | number | no | `50` | Limit. How many records to return per page, 1 to 100. Default 50. |

Output fields:

- `items`: Users
- `items[].id`: User ID
- `items[].name`: Name
- `items[].first_name`: First Name
- `items[].last_name`: Last Name
- `items[].username`: Login Email (email)
- `items[].position`: Position
- `items[].timezone`: Timezone
- `items[].role_admin`: Administrator
- `items[].role_login`: Can Log In
- `items[].last_active`: Last Active
- `page`: Page (number)
- `count`: Returned (number)
- `total`: Total Matches (number)
- `has_more`: Has More (boolean)

### `flowlu_list_lookup_values`

**List Reference Values.** Lists the IDs and names of one kind of Flowlu reference value: sales pipelines, pipeline stages (pass parent_id = pipeline ID), opportunity sources, loss reasons, account categories, industries, honorific titles, task workflows, task statuses (parent_id = workflow ID), project templates or project portfolios. Use to turn a name into the ID that create/update actions need. Returns up to 1000 values with has_more. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity` | string | yes |  | Values. Which kind of reference value to list. One of `"pipelines"`, `"pipeline_stages"`, `"opportunity_sources"`, `"loss_reasons"`, `"account_categories"`, `"industries"`, `"honorific_titles"`, `"task_workflows"`, `"task_statuses"`, `"project_templates"`, `"project_portfolios"`. |
| `parent_id` | string | no |  | Parent ID. For pipeline_stages: the pipeline ID. For task_statuses: the workflow ID. Leave empty to list all. |

Output fields:

- `entity`: Values
- `items`: Values
- `items[].id`: ID
- `items[].name`: Name
- `items[].parent_id`: Parent ID
- `items[].active`: Active
- `count`: Returned (number)
- `total`: Total (number)
- `has_more`: Has More (boolean)

### `flowlu_account_create`

**Create CRM Account.** Creates one Flowlu CRM account, either a contact (person, needs first_name) or an organization (company, needs name), chosen by account_type. Use to add a person or company to the CRM; search with flowlu_find_accounts first to avoid duplicates. Not idempotent: each call creates a new account. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_type` | string | yes |  | Account Type. contact for a person, organization for a company. One of `"contact"`, `"organization"`. |
| `name` | string | no |  | Organization Name. Organization name. Required when creating an organization. |
| `name_legal_full` | string | no |  | Full Legal Name. Full legal name of the organization. |
| `honorific_title_id` | string | no |  | Honorific Title ID. Get IDs from flowlu_list_lookup_values with entity honorific_titles. Numeric ID such as "42". |
| `first_name` | string | no |  | First Name. Contact first name. Required when creating a contact. |
| `middle_name` | string | no |  | Middle Name. Contact middle name. |
| `last_name` | string | no |  | Last Name. Contact last name. |
| `owner_id` | string | no |  | Owner User ID. User responsible for the account. Get user IDs from flowlu_list_users. Numeric ID such as "42". |
| `account_category_id` | string | no |  | Category ID. Get IDs from flowlu_list_lookup_values with entity account_categories. Numeric ID such as "42". |
| `industry_id` | string | no |  | Industry ID. Get IDs from flowlu_list_lookup_values with entity industries. Numeric ID such as "42". |
| `email` | string | no |  | Email. Main email address, such as "jane@example.com". |
| `phone` | string | no |  | Phone. Main phone number. |
| `phone2` | string | no |  | Phone 2. Second phone number. |
| `phone3` | string | no |  | Phone 3. Third phone number. |
| `web` | string | no |  | Website. Website URL, such as "https://example.com". |
| `description` | string | no |  | Description. Notes about the account. |
| `vat` | string | no |  | VAT or Tax ID. VAT or tax identification number. |
| `skype` | string | no |  | Skype. Skype name or link. |
| `telegram` | string | no |  | Telegram. Telegram username. |
| `facebook` | string | no |  | Facebook. Facebook profile link. |
| `x` | string | no |  | X (Twitter). X / Twitter profile link. |
| `linkedin` | string | no |  | LinkedIn. LinkedIn profile link. |
| `instagram` | string | no |  | Instagram. Instagram profile link. |
| `billing_country` | string | no |  | Billing Country. Billing country. |
| `billing_state` | string | no |  | Billing State. Billing state or region. |
| `billing_city` | string | no |  | Billing City. Billing city. |
| `billing_zip` | string | no |  | Billing Postal Code. Billing postal code. |
| `billing_address_line_1` | string | no |  | Billing Address. Billing street address. |
| `shipping_country` | string | no |  | Shipping Country. Shipping country. |
| `shipping_state` | string | no |  | Shipping State. Shipping state or region. |
| `shipping_city` | string | no |  | Shipping City. Shipping city. |
| `shipping_zip` | string | no |  | Shipping Postal Code. Shipping postal code. |
| `shipping_address_line_1` | string | no |  | Shipping Address. Shipping street address. |

Output fields:

- `id`: Account ID
- `type`: Account Type
- `name`: Name
- `first_name`: First Name
- `middle_name`: Middle Name
- `last_name`: Last Name
- `name_legal_full`: Full Legal Name
- `email`: Email (email)
- `phone`: Phone
- `phone2`: Phone 2
- `phone3`: Phone 3
- `web`: Website (url)
- `owner_id`: Owner User ID
- `account_category_id`: Category ID
- `industry_id`: Industry ID
- `honorific_title_id`: Honorific Title ID
- `vat`: VAT or Tax ID
- `description`: Description
- `telegram`: Telegram
- `social_network_link_1`: Skype
- `social_network_link_3`: Facebook (url)
- `social_network_link_4`: X (Twitter) (url)
- `social_network_link_5`: LinkedIn (url)
- `social_network_link_6`: Instagram (url)
- `billing_country`: Billing Country
- `billing_state`: Billing State
- `billing_city`: Billing City
- `billing_zip`: Billing Postal Code
- `billing_address_line_1`: Billing Address
- `shipping_country`: Shipping Country
- `shipping_city`: Shipping City
- `shipping_address_line_1`: Shipping Address
- `active`: Active
- `created_date`: Created At
- `updated_date`: Updated At
- `read_back_error`: Read-back Error

### `flowlu_account_update`

**Update CRM Account.** Changes only the fields you pass on one Flowlu CRM account (contact or organization), identified by account_id; omitted fields keep their value and the account type never changes. Use to correct names, phones, website, owner or address. Requires at least one field. Idempotent: repeating the same update leaves the account unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. Numeric ID of the contact or organization, such as "42". Get it from flowlu_find_accounts. |
| `name` | string | no |  | Organization Name. Organization name. Required when creating an organization. |
| `name_legal_full` | string | no |  | Full Legal Name. Full legal name of the organization. |
| `honorific_title_id` | string | no |  | Honorific Title ID. Get IDs from flowlu_list_lookup_values with entity honorific_titles. Numeric ID such as "42". |
| `first_name` | string | no |  | First Name. Contact first name. Required when creating a contact. |
| `middle_name` | string | no |  | Middle Name. Contact middle name. |
| `last_name` | string | no |  | Last Name. Contact last name. |
| `owner_id` | string | no |  | Owner User ID. User responsible for the account. Get user IDs from flowlu_list_users. Numeric ID such as "42". |
| `account_category_id` | string | no |  | Category ID. Get IDs from flowlu_list_lookup_values with entity account_categories. Numeric ID such as "42". |
| `industry_id` | string | no |  | Industry ID. Get IDs from flowlu_list_lookup_values with entity industries. Numeric ID such as "42". |
| `email` | string | no |  | Email. Main email address, such as "jane@example.com". |
| `phone` | string | no |  | Phone. Main phone number. |
| `phone2` | string | no |  | Phone 2. Second phone number. |
| `phone3` | string | no |  | Phone 3. Third phone number. |
| `web` | string | no |  | Website. Website URL, such as "https://example.com". |
| `description` | string | no |  | Description. Notes about the account. |
| `vat` | string | no |  | VAT or Tax ID. VAT or tax identification number. |
| `skype` | string | no |  | Skype. Skype name or link. |
| `telegram` | string | no |  | Telegram. Telegram username. |
| `facebook` | string | no |  | Facebook. Facebook profile link. |
| `x` | string | no |  | X (Twitter). X / Twitter profile link. |
| `linkedin` | string | no |  | LinkedIn. LinkedIn profile link. |
| `instagram` | string | no |  | Instagram. Instagram profile link. |
| `billing_country` | string | no |  | Billing Country. Billing country. |
| `billing_state` | string | no |  | Billing State. Billing state or region. |
| `billing_city` | string | no |  | Billing City. Billing city. |
| `billing_zip` | string | no |  | Billing Postal Code. Billing postal code. |
| `billing_address_line_1` | string | no |  | Billing Address. Billing street address. |
| `shipping_country` | string | no |  | Shipping Country. Shipping country. |
| `shipping_state` | string | no |  | Shipping State. Shipping state or region. |
| `shipping_city` | string | no |  | Shipping City. Shipping city. |
| `shipping_zip` | string | no |  | Shipping Postal Code. Shipping postal code. |
| `shipping_address_line_1` | string | no |  | Shipping Address. Shipping street address. |

Output fields:

- `id`: Account ID
- `type`: Account Type
- `name`: Name
- `first_name`: First Name
- `middle_name`: Middle Name
- `last_name`: Last Name
- `name_legal_full`: Full Legal Name
- `email`: Email (email)
- `phone`: Phone
- `phone2`: Phone 2
- `phone3`: Phone 3
- `web`: Website (url)
- `owner_id`: Owner User ID
- `account_category_id`: Category ID
- `industry_id`: Industry ID
- `honorific_title_id`: Honorific Title ID
- `vat`: VAT or Tax ID
- `description`: Description
- `telegram`: Telegram
- `social_network_link_1`: Skype
- `social_network_link_3`: Facebook (url)
- `social_network_link_4`: X (Twitter) (url)
- `social_network_link_5`: LinkedIn (url)
- `social_network_link_6`: Instagram (url)
- `billing_country`: Billing Country
- `billing_state`: Billing State
- `billing_city`: Billing City
- `billing_zip`: Billing Postal Code
- `billing_address_line_1`: Billing Address
- `shipping_country`: Shipping Country
- `shipping_city`: Shipping City
- `shipping_address_line_1`: Shipping Address
- `active`: Active
- `created_date`: Created At
- `updated_date`: Updated At

### `flowlu_account_delete`

**Delete CRM Account.** Permanently deletes one Flowlu CRM account (contact or organization) by its numeric account_id. Use only when the record must be removed. Not idempotent: a second call fails because the account no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. Numeric ID of the contact or organization to delete, such as "42". |

Output fields:

- `id`: Deleted ID
- `deleted`: Deleted (boolean)

### `flowlu_opportunity_create`

**Create Opportunity.** Creates one Flowlu sales opportunity (deal) with a name and optional amount, pipeline and stage, source, assignee, dates and free-text contact fields, then links it to a CRM organization and/or contact when organization_id or contact_id is given. Link failures are reported in link_errors without failing the step. Not idempotent: each call creates a new opportunity. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Opportunity name, such as "Website redesign for Acme". |
| `budget` | number | no |  | Amount. Opportunity value in the portal currency, such as 1500. |
| `pipeline_id` | string | no |  | Pipeline ID. Sales pipeline. Get IDs from flowlu_list_lookup_values with entity pipelines. Numeric ID such as "42". |
| `pipeline_stage_id` | string | no |  | Pipeline Stage ID. Stage in the pipeline, checked against it before saving. Creating needs Pipeline ID too; updating without Pipeline ID uses the pipeline the opportunity is already in. Get IDs from flowlu_list_lookup_values with entity pipeline_stages and parent_id = the pipeline ID. Numeric ID such as "42". |
| `source_id` | string | no |  | Source ID. Where the opportunity came from. Get IDs from flowlu_list_lookup_values with entity opportunity_sources. Numeric ID such as "42". |
| `assignee_id` | string | no |  | Assignee User ID. User responsible for the opportunity. Get user IDs from flowlu_list_users. Numeric ID such as "42". |
| `start_date` | ISO date-time string | no |  | Start Date. Start date, such as "2026-10-01". Only the date part is used. |
| `deadline` | ISO date-time string | no |  | Expected Close Date. Planned close date, such as "2026-11-30". Only the date part is used. |
| `description` | string | no |  | Description. Notes about the opportunity. |
| `contact_name` | string | no |  | Contact Name. Free-text contact name stored on the opportunity (not a CRM link). |
| `contact_email` | string | no |  | Contact Email. Free-text contact email stored on the opportunity. |
| `contact_phone` | string | no |  | Contact Phone. Free-text contact phone stored on the opportunity. |
| `contact_company` | string | no |  | Contact Company. Free-text company name stored on the opportunity. |
| `contact_position` | string | no |  | Contact Position. Free-text job title stored on the opportunity. |
| `organization_id` | string | no |  | Organization ID. CRM organization to link to the opportunity. Numeric ID from flowlu_find_accounts. |
| `contact_id` | string | no |  | Contact ID. CRM contact to link to the opportunity. Numeric ID from flowlu_find_accounts. |

Output fields:

- `id`: Opportunity ID
- `name`: Name
- `budget`: Amount (number)
- `active`: Status
- `pipeline_id`: Pipeline ID
- `pipeline_stage_id`: Pipeline Stage ID
- `source_id`: Source ID
- `assignee_id`: Assignee User ID
- `start_date`: Start Date (date)
- `deadline`: Expected Close Date (date)
- `closing_date`: Close Date (date)
- `closing_status_id`: Loss Reason ID
- `closing_comment`: Closing Comment
- `description`: Description
- `contact_name`: Contact Name
- `contact_email`: Contact Email (email)
- `contact_phone`: Contact Phone
- `contact_company`: Contact Company
- `contact_position`: Contact Position
- `created_date`: Created At
- `updated_date`: Updated At
- `read_back_error`: Read-back Error
- `linked_accounts`: Linked Accounts
- `linked_accounts[].id`: Link ID
- `linked_accounts[].lead_id`: Opportunity ID
- `linked_accounts[].account_id`: Account ID
- `linked_accounts[].account_type`: Account Type
- `linked_accounts[].already_linked`: Already Linked (boolean)
- `link_errors`: Link Errors
- `link_errors[].account_id`: Account ID
- `link_errors[].error`: Error

### `flowlu_opportunity_update`

**Update Opportunity.** Changes only the fields you pass on one Flowlu opportunity, identified by opportunity_id; omitted fields keep their value. Use to move it to another pipeline stage, change the amount or assignee, or close it as won or lost (status), optionally with a loss reason and comment. A Pipeline Stage ID without Pipeline ID is checked against the pipeline the opportunity is in. Requires at least one field. Idempotent: repeating the same update leaves the opportunity unchanged, and repeating Won or Lost keeps the existing close date. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunity_id` | string | yes |  | Opportunity ID. Numeric ID of the opportunity, such as "42". Get it from flowlu_find_opportunities. |
| `name` | string | no |  | Name. New opportunity name. |
| `budget` | number | no |  | Amount. Opportunity value in the portal currency, such as 1500. |
| `pipeline_id` | string | no |  | Pipeline ID. Sales pipeline. Get IDs from flowlu_list_lookup_values with entity pipelines. Numeric ID such as "42". |
| `pipeline_stage_id` | string | no |  | Pipeline Stage ID. Stage in the pipeline, checked against it before saving. Creating needs Pipeline ID too; updating without Pipeline ID uses the pipeline the opportunity is already in. Get IDs from flowlu_list_lookup_values with entity pipeline_stages and parent_id = the pipeline ID. Numeric ID such as "42". |
| `source_id` | string | no |  | Source ID. Where the opportunity came from. Get IDs from flowlu_list_lookup_values with entity opportunity_sources. Numeric ID such as "42". |
| `assignee_id` | string | no |  | Assignee User ID. User responsible for the opportunity. Get user IDs from flowlu_list_users. Numeric ID such as "42". |
| `start_date` | ISO date-time string | no |  | Start Date. Start date, such as "2026-10-01". Only the date part is used. |
| `deadline` | ISO date-time string | no |  | Expected Close Date. Planned close date, such as "2026-11-30". Only the date part is used. |
| `description` | string | no |  | Description. Notes about the opportunity. |
| `contact_name` | string | no |  | Contact Name. Free-text contact name stored on the opportunity (not a CRM link). |
| `contact_email` | string | no |  | Contact Email. Free-text contact email stored on the opportunity. |
| `contact_phone` | string | no |  | Contact Phone. Free-text contact phone stored on the opportunity. |
| `contact_company` | string | no |  | Contact Company. Free-text company name stored on the opportunity. |
| `contact_position` | string | no |  | Contact Position. Free-text job title stored on the opportunity. |
| `status` | string | no |  | Status. Won or Lost closes the opportunity; In progress reopens it. One of `1`, `2`, `3`. |
| `closing_date` | ISO date-time string | no |  | Close Date. When the opportunity was won or lost, such as "2026-10-01". When empty and Status moves the opportunity to Won or Lost, today (UTC) is used; an opportunity that already has that status keeps its close date. |
| `closing_status_id` | string | no |  | Loss Reason ID. Why it was lost. Numeric ID from flowlu_list_lookup_values with entity loss_reasons. |
| `closing_comment` | string | no |  | Closing Comment. Note about why the opportunity was won or lost. |

Output fields:

- `id`: Opportunity ID
- `name`: Name
- `budget`: Amount (number)
- `active`: Status
- `pipeline_id`: Pipeline ID
- `pipeline_stage_id`: Pipeline Stage ID
- `source_id`: Source ID
- `assignee_id`: Assignee User ID
- `start_date`: Start Date (date)
- `deadline`: Expected Close Date (date)
- `closing_date`: Close Date (date)
- `closing_status_id`: Loss Reason ID
- `closing_comment`: Closing Comment
- `description`: Description
- `contact_name`: Contact Name
- `contact_email`: Contact Email (email)
- `contact_phone`: Contact Phone
- `contact_company`: Contact Company
- `contact_position`: Contact Position
- `created_date`: Created At
- `updated_date`: Updated At

### `flowlu_opportunity_delete`

**Delete Opportunity.** Permanently deletes one Flowlu opportunity (deal) by its numeric opportunity_id. Use only when the deal must be removed; to close it instead, set status won or lost with flowlu_opportunity_update. Not idempotent: a second call fails because the opportunity no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunity_id` | string | yes |  | Opportunity ID. Numeric ID of the opportunity to delete, such as "42". |

Output fields:

- `id`: Deleted ID
- `deleted`: Deleted (boolean)

### `flowlu_task_create`

**Create Task.** Creates one Flowlu task with a name and optional description, priority, dates, assignee, owner, workflow status, and links to a project (project_id), CRM account or parent task. Use to add a to-do; link it to a project by passing project_id from flowlu_find_projects. Not idempotent: each call creates a new task, so check flowlu_find_tasks first to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Task name, up to 255 characters. |
| `description` | string | no |  | Description. Task description (plain text). |
| `priority` | string | no |  | Priority. Task priority. One of `1`, `2`, `3`. |
| `type` | string | no |  | Type. Task type. Leave empty for a regular task (Flowlu default). One of `0`, `1`, `20`, `21`, `22`, `23`, `30`, `40`. |
| `plan_start_date` | ISO date-time string | no |  | Start Date. Planned start, ISO 8601 such as "2026-10-01T09:00:00Z". Sent as "YYYY-MM-DD HH:mm:ss" in the Activepieces server time (UTC on Activepieces Cloud); Flowlu reads it in the portal timezone. |
| `deadline` | ISO date-time string | no |  | Deadline. End date, ISO 8601 such as "2026-10-05T17:00:00Z". Sent as "YYYY-MM-DD HH:mm:ss" in the Activepieces server time (UTC on Activepieces Cloud); Flowlu reads it in the portal timezone. |
| `responsible_id` | string | no |  | Assignee User ID. User who does the task. Get user IDs from flowlu_list_users. Numeric ID such as "42". |
| `owner_id` | string | no |  | Owner User ID. User who owns (set) the task. Get user IDs from flowlu_list_users. Numeric ID such as "42". |
| `workflow_id` | string | no |  | Workflow ID. Task workflow. Get IDs from flowlu_list_lookup_values with entity task_workflows. Numeric ID such as "42". |
| `workflow_stage_id` | string | no |  | Workflow Status ID. Status within the workflow. Get IDs from flowlu_list_lookup_values with entity task_statuses. Numeric ID such as "42". |
| `project_id` | string | no |  | Project ID. Links the task to this project. Get IDs from flowlu_find_projects. Numeric ID such as "42". |
| `crm_account_id` | string | no |  | CRM Account ID. Links the task to a CRM contact or organization. Get IDs from flowlu_find_accounts. Numeric ID such as "42". |
| `parent_id` | string | no |  | Parent Task ID. Makes this a subtask of that task. Numeric ID such as "42". |
| `deadline_allowchange` | string | no |  | Assignee Can Change Deadline. Yes lets the assignee move the deadline. Leave empty to keep the current setting. One of `"yes"`, `"no"`. |
| `task_checkbyowner` | string | no |  | Needs Owner Approval. Yes means the owner must approve the task before it is completed. Leave empty to keep the current setting. One of `"yes"`, `"no"`. |

Output fields:

- `id`: Task ID
- `name`: Name
- `description`: Description
- `status`: Status
- `priority`: Priority
- `type`: Type
- `responsible_id`: Assignee User ID
- `owner_id`: Owner User ID
- `plan_start_date`: Start Date
- `deadline`: Deadline
- `start_date`: Started At
- `closed_date`: Completed At
- `workflow_id`: Workflow ID
- `workflow_stage_id`: Workflow Status ID
- `module`: Linked Module
- `model`: Linked Object Type
- `model_id`: Linked Object ID
- `crm_account_id`: CRM Account ID
- `parent_id`: Parent Task ID
- `deadline_allowchange`: Assignee Can Change Deadline
- `task_checkbyowner`: Needs Owner Approval
- `time_estimate`: Estimated Time
- `time_spent`: Time Spent
- `created_date`: Created At
- `updated_date`: Updated At
- `read_back_error`: Read-back Error

### `flowlu_task_update`

**Update Task.** Changes only the fields you pass on one Flowlu task, identified by task_id; omitted fields keep their current value. Use to rename, reschedule, reassign, move to another workflow status, or complete a task (status 5). Requires at least one field to change. Idempotent: repeating the same update leaves the task in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. Numeric ID of the task to update, such as "42". Get it from flowlu_find_tasks. |
| `name` | string | no |  | Name. New task name. |
| `status` | string | no |  | Status. New task status. Completed closes the task. One of `1`, `3`, `4`, `5`. |
| `description` | string | no |  | Description. Task description (plain text). |
| `priority` | string | no |  | Priority. Task priority. One of `1`, `2`, `3`. |
| `type` | string | no |  | Type. Task type. Leave empty for a regular task (Flowlu default). One of `0`, `1`, `20`, `21`, `22`, `23`, `30`, `40`. |
| `plan_start_date` | ISO date-time string | no |  | Start Date. Planned start, ISO 8601 such as "2026-10-01T09:00:00Z". Sent as "YYYY-MM-DD HH:mm:ss" in the Activepieces server time (UTC on Activepieces Cloud); Flowlu reads it in the portal timezone. |
| `deadline` | ISO date-time string | no |  | Deadline. End date, ISO 8601 such as "2026-10-05T17:00:00Z". Sent as "YYYY-MM-DD HH:mm:ss" in the Activepieces server time (UTC on Activepieces Cloud); Flowlu reads it in the portal timezone. |
| `responsible_id` | string | no |  | Assignee User ID. User who does the task. Get user IDs from flowlu_list_users. Numeric ID such as "42". |
| `owner_id` | string | no |  | Owner User ID. User who owns (set) the task. Get user IDs from flowlu_list_users. Numeric ID such as "42". |
| `workflow_id` | string | no |  | Workflow ID. Task workflow. Get IDs from flowlu_list_lookup_values with entity task_workflows. Numeric ID such as "42". |
| `workflow_stage_id` | string | no |  | Workflow Status ID. Status within the workflow. Get IDs from flowlu_list_lookup_values with entity task_statuses. Numeric ID such as "42". |
| `project_id` | string | no |  | Project ID. Links the task to this project. Get IDs from flowlu_find_projects. Numeric ID such as "42". |
| `crm_account_id` | string | no |  | CRM Account ID. Links the task to a CRM contact or organization. Get IDs from flowlu_find_accounts. Numeric ID such as "42". |
| `parent_id` | string | no |  | Parent Task ID. Makes this a subtask of that task. Numeric ID such as "42". |
| `deadline_allowchange` | string | no |  | Assignee Can Change Deadline. Yes lets the assignee move the deadline. Leave empty to keep the current setting. One of `"yes"`, `"no"`. |
| `task_checkbyowner` | string | no |  | Needs Owner Approval. Yes means the owner must approve the task before it is completed. Leave empty to keep the current setting. One of `"yes"`, `"no"`. |

Output fields:

- `id`: Task ID
- `name`: Name
- `description`: Description
- `status`: Status
- `priority`: Priority
- `type`: Type
- `responsible_id`: Assignee User ID
- `owner_id`: Owner User ID
- `plan_start_date`: Start Date
- `deadline`: Deadline
- `start_date`: Started At
- `closed_date`: Completed At
- `workflow_id`: Workflow ID
- `workflow_stage_id`: Workflow Status ID
- `module`: Linked Module
- `model`: Linked Object Type
- `model_id`: Linked Object ID
- `crm_account_id`: CRM Account ID
- `parent_id`: Parent Task ID
- `deadline_allowchange`: Assignee Can Change Deadline
- `task_checkbyowner`: Needs Owner Approval
- `time_estimate`: Estimated Time
- `time_spent`: Time Spent
- `created_date`: Created At
- `updated_date`: Updated At

### `flowlu_task_get`

**Get Task.** Returns one Flowlu task (name, status, dates, assignee, workflow, linked project or account) by its numeric task_id. Use to read a task before updating it; use flowlu_find_tasks to look tasks up by name or filter. Fails if the task does not exist. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. Numeric task ID, such as "42". Get it from flowlu_find_tasks. |

Output fields:

- `id`: Task ID
- `name`: Name
- `description`: Description
- `status`: Status
- `priority`: Priority
- `type`: Type
- `responsible_id`: Assignee User ID
- `owner_id`: Owner User ID
- `plan_start_date`: Start Date
- `deadline`: Deadline
- `start_date`: Started At
- `closed_date`: Completed At
- `workflow_id`: Workflow ID
- `workflow_stage_id`: Workflow Status ID
- `module`: Linked Module
- `model`: Linked Object Type
- `model_id`: Linked Object ID
- `crm_account_id`: CRM Account ID
- `parent_id`: Parent Task ID
- `deadline_allowchange`: Assignee Can Change Deadline
- `task_checkbyowner`: Needs Owner Approval
- `time_estimate`: Estimated Time
- `time_spent`: Time Spent
- `created_date`: Created At
- `updated_date`: Updated At

### `flowlu_task_delete`

**Delete Task.** Permanently deletes one Flowlu task by its numeric task_id. Use only when the task should be removed; to close it instead, set status 5 with flowlu_task_update. Not idempotent: a second call fails because the task no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. Numeric ID of the task to delete, such as "42". |

Output fields:

- `id`: Deleted ID
- `deleted`: Deleted (boolean)

### `flowlu_project_create`

**Create Project.** Creates one Flowlu project with a name and optional manager, CRM customer (organization and contact), source opportunity, dates, priority, template, portfolio, task workflow and planned revenue/expenses. Use when work for a client or deal needs its own project; add tasks to it afterwards with flowlu_task_create and project_id. Not idempotent: each call creates a new project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Project name, such as "Acme website relaunch". |
| `description` | string | no |  | Description. Project description. |
| `manager_id` | string | no |  | Manager User ID. Project manager. Get user IDs from flowlu_list_users. Numeric ID such as "42". |
| `customer_id` | string | no |  | Customer Organization ID. CRM organization the project is for. Get IDs from flowlu_find_accounts. Numeric ID such as "42". |
| `customer_crm_contact_id` | string | no |  | Customer Contact ID. CRM contact at the customer. Get IDs from flowlu_find_accounts. Numeric ID such as "42". |
| `crm_lead_id` | string | no |  | Opportunity ID. CRM opportunity the project came from. Get IDs from flowlu_find_opportunities. Numeric ID such as "42". |
| `startdate` | ISO date-time string | no |  | Start Date. Project start, such as "2026-10-01". Only the date part is used. |
| `enddate` | ISO date-time string | no |  | End Date. Project end, such as "2026-12-31". Only the date part is used. |
| `priority` | string | no |  | Priority. Project priority. One of `1`, `2`, `3`. |
| `portfolio_id` | string | no |  | Portfolio ID. Project portfolio. Get IDs from flowlu_list_lookup_values with entity project_portfolios. Numeric ID such as "42". |
| `tasks_workflow_id` | string | no |  | Task Workflow ID. Workflow used by tasks in this project. Get IDs from flowlu_list_lookup_values with entity task_workflows. Numeric ID such as "42". |
| `estimated_revenue` | number | no |  | Contract Amount. Planned revenue (contract sum). |
| `estimated_expenses` | number | no |  | Planned Expenses. Planned expense sum. |
| `project_type_id` | string | no |  | Template ID. Project template to start from. Numeric ID from flowlu_list_lookup_values with entity project_templates. |

Output fields:

- `id`: Project ID
- `name`: Name
- `description`: Description
- `manager_id`: Manager User ID
- `customer_id`: Customer Organization ID
- `customer_crm_contact_id`: Customer Contact ID
- `crm_lead_id`: Opportunity ID
- `project_type_id`: Template ID
- `briefcase_id`: Portfolio ID
- `tasks_workflow_id`: Task Workflow ID
- `priority`: Priority
- `startdate`: Start Date (date)
- `enddate`: End Date (date)
- `estimated_revenue`: Contract Amount (number)
- `estimated_expenses`: Planned Expenses (number)
- `is_archive`: Archived
- `created_date`: Created At
- `updated_date`: Updated At
- `read_back_error`: Read-back Error

### `flowlu_project_update`

**Update Project.** Changes only the fields you pass on one Flowlu project, identified by project_id; omitted fields keep their value. Use to rename, reschedule, reassign the manager, change the customer, or archive/unarchive the project (is_archive). Requires at least one field. Idempotent: repeating the same update leaves the project unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. Numeric ID of the project, such as "42". Get it from flowlu_find_projects. |
| `name` | string | no |  | Name. New project name. |
| `description` | string | no |  | Description. Project description. |
| `manager_id` | string | no |  | Manager User ID. Project manager. Get user IDs from flowlu_list_users. Numeric ID such as "42". |
| `customer_id` | string | no |  | Customer Organization ID. CRM organization the project is for. Get IDs from flowlu_find_accounts. Numeric ID such as "42". |
| `customer_crm_contact_id` | string | no |  | Customer Contact ID. CRM contact at the customer. Get IDs from flowlu_find_accounts. Numeric ID such as "42". |
| `crm_lead_id` | string | no |  | Opportunity ID. CRM opportunity the project came from. Get IDs from flowlu_find_opportunities. Numeric ID such as "42". |
| `startdate` | ISO date-time string | no |  | Start Date. Project start, such as "2026-10-01". Only the date part is used. |
| `enddate` | ISO date-time string | no |  | End Date. Project end, such as "2026-12-31". Only the date part is used. |
| `priority` | string | no |  | Priority. Project priority. One of `1`, `2`, `3`. |
| `portfolio_id` | string | no |  | Portfolio ID. Project portfolio. Get IDs from flowlu_list_lookup_values with entity project_portfolios. Numeric ID such as "42". |
| `tasks_workflow_id` | string | no |  | Task Workflow ID. Workflow used by tasks in this project. Get IDs from flowlu_list_lookup_values with entity task_workflows. Numeric ID such as "42". |
| `estimated_revenue` | number | no |  | Contract Amount. Planned revenue (contract sum). |
| `estimated_expenses` | number | no |  | Planned Expenses. Planned expense sum. |
| `is_archive` | string | no |  | Archived. Yes archives the project, No restores it. Leave empty to keep it as is. One of `"yes"`, `"no"`. |

Output fields:

- `id`: Project ID
- `name`: Name
- `description`: Description
- `manager_id`: Manager User ID
- `customer_id`: Customer Organization ID
- `customer_crm_contact_id`: Customer Contact ID
- `crm_lead_id`: Opportunity ID
- `project_type_id`: Template ID
- `briefcase_id`: Portfolio ID
- `tasks_workflow_id`: Task Workflow ID
- `priority`: Priority
- `startdate`: Start Date (date)
- `enddate`: End Date (date)
- `estimated_revenue`: Contract Amount (number)
- `estimated_expenses`: Planned Expenses (number)
- `is_archive`: Archived
- `created_date`: Created At
- `updated_date`: Updated At

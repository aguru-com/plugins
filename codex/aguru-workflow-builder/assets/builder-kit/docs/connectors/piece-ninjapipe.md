# NinjaPipe

NinjaPipe CRM integration with contacts, companies, deals, tasks (under projects), pipelines, products, budgets, projects, orders, lists, and Databin webhook delivery.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-ninjapipe'
  version: '0.1.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: NinjaPipe API Connection

> Connect to your NinjaPipe workspace.
>
> 1. Log in to NinjaPipe and open **Workspace Settings > NinjaPipe API**.
> 2. Copy your **API key** (starts with `np_`).
> 3. Enter your workspace **API Base URL**. The default is `https://www.ninjapipe.app/api`.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes | `"https://www.ninjapipe.app/api"` | API Base URL. Your workspace API base URL (e.g. https://www.ninjapipe.app/api). |
| `api_key` | string | yes |  | API Key. Your workspace API key from NinjaPipe Settings > API. |

## Actions

### `create_contact`

**Create Contact.** Create a NinjaPipe contact. Email is the only required field; the "If Contact Exists" mode controls duplicate handling (error, skip, get existing, or update existing) when the email already exists. Default mode (error) is non-idempotent and will fail on re-run; pick "update existing" or "upsert-contact" for safe retries. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `email` | string | yes |  | Email. The email address of the contact. |
| `phone` | string | no |  | Phone. |
| `company` | string | no |  | Company. Company name or ID. |
| `status` | string | no |  | Status. |
| `owner` | string | no |  | Owner. |
| `address` | string | no |  | Address. |
| `city` | string | no |  | City. |
| `zip` | string | no |  | ZIP Code. |
| `country` | string | no |  | Country. Select a country. One of `"DE"`, `"AT"`, `"CH"`, `"BE"`, `"NL"`, `"LU"`, `"FR"`, `"IT"`, `"ES"`, `"PT"`, `"PL"`, `"HU"`, `"GB"`, `"US"`, `"CA"`. |
| `state` | string | no |  | State. |
| `notes` | string | no |  | Notes. |
| `customFields` | object | no |  | Custom Fields. Key-value pairs sent as custom_fields. |
| `ifContactExists` | string | no | `"error"` | If Contact Exists. What to do when a contact with this email already exists. One of `"error"`, `"skip"`, `"getExisting"`, `"updateExisting"`. |

### `update_contact`

**Update Contact.** Update an existing contact identified by ID, setting only the fields you provide (name, email, phone, company, status, owner, address fields, notes, or custom fields); omitted fields are left unchanged. Use to edit a known contact, not to create one. Idempotent — re-sending the same values yields the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `company` | string | no |  | Company. |
| `status` | string | no |  | Status. |
| `owner` | string | no |  | Owner. |
| `address` | string | no |  | Address. |
| `city` | string | no |  | City. |
| `zip` | string | no |  | ZIP Code. |
| `country` | string | no |  | Country. Select a country. One of `"DE"`, `"AT"`, `"CH"`, `"BE"`, `"NL"`, `"LU"`, `"FR"`, `"IT"`, `"ES"`, `"PT"`, `"PL"`, `"HU"`, `"GB"`, `"US"`, `"CA"`. |
| `state` | string | no |  | State. |
| `notes` | string | no |  | Notes. |
| `customFields` | object | no |  | Custom Fields. |

### `get_contact`

**Get Contact.** Fetch a single contact by its ID. Read-only lookup for inspecting one known contact; to search or enumerate contacts (e.g. find one by email) use the list-contacts action instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |

### `list_contacts`

**List Contacts.** List contacts with optional search text and status/owner filters. Read-only; supports single-page paging or "Return All" to follow pagination across every page. Use to discover contact IDs or find a contact by name/email before acting on it. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. Maximum number of records to return (1-100). |
| `search` | string | no |  | Search. Search query string. |
| `statusFilter` | string | no |  | Status Filter. Filter records by status. |
| `ownerFilter` | string | no |  | Owner Filter. Filter by owner identifier. |
| `returnAll` | boolean | no | `false` | Return All. Retrieve all contacts using pagination. |
| `page` | number | no | `1` | Page. Page number when not using Return All. |

### `delete_contact`

**Delete Contact.** Permanently delete a contact identified by its ID. Destructive and not reversible; re-running after the contact is gone will fail since the ID no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |

### `upsert_contact`

**Upsert Contact.** Create-or-update a contact keyed on email: if a contact with the given email exists it is updated, otherwise a new one is created. Email is required and serves as the stable match key, making this safe to re-run (idempotent) unlike plain create-contact. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `email` | string | yes |  | Email. Used as the unique key to decide create or update. |
| `phone` | string | no |  | Phone. |
| `company` | string | no |  | Company. |
| `status` | string | no |  | Status. |
| `owner` | string | no |  | Owner. |
| `address` | string | no |  | Address. |
| `city` | string | no |  | City. |
| `zip` | string | no |  | ZIP Code. |
| `country` | string | no |  | Country. Select a country. One of `"DE"`, `"AT"`, `"CH"`, `"BE"`, `"NL"`, `"LU"`, `"FR"`, `"IT"`, `"ES"`, `"PT"`, `"PL"`, `"HU"`, `"GB"`, `"US"`, `"CA"`. |
| `state` | string | no |  | State. |
| `notes` | string | no |  | Notes. |
| `customFields` | object | no |  | Custom Fields. |

### `toggle_client_portal`

**Toggle Client Portal.** Turns client portal access on or off for a given contact via the Enable toggle; the Enable mode optionally sets a portal email and provisions a fresh auto-generated password. Pick this to grant or revoke a customer-facing login. Re-running with the same toggle leaves access in the same on/off state, though enabling again may rotate the password. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `enable` | boolean | yes | `true` | Enable Client Portal. Turn ON to enable, OFF to disable. |
| `email` | string | no |  | Portal Email. Optional. Used only when enabling. Defaults to the contact's email. |

### `create_company`

**Create Company.** Creates a new company (CRM account) in NinjaPipe with optional industry, contact details, address, status, owner, notes, and custom fields. Only Name is required. Not idempotent: each call adds another company, so check List Companies first to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `industry` | string | no |  | Industry. |
| `website` | string | no |  | Website. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `address` | string | no |  | Address. |
| `city` | string | no |  | City. |
| `zip` | string | no |  | ZIP Code. |
| `country` | string | no |  | Country. Select a country. One of `"DE"`, `"AT"`, `"CH"`, `"BE"`, `"NL"`, `"LU"`, `"FR"`, `"IT"`, `"ES"`, `"PT"`, `"PL"`, `"HU"`, `"GB"`, `"US"`, `"CA"`. |
| `state` | string | no |  | State. |
| `status` | string | no |  | Status. |
| `owner` | string | no |  | Owner. |
| `notes` | string | no |  | Notes. |
| `customFields` | object | no |  | Custom Fields. |

### `update_company`

**Update Company.** Updates an existing company (CRM account) identified by Company ID, applying only the fields you supply (name, contact details, address, status, owner, notes, custom fields); omitted fields are left unchanged. Requires a valid company ID; repeating with the same values is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company. Select a company. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `industry` | string | no |  | Industry. |
| `website` | string | no |  | Website. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `address` | string | no |  | Address. |
| `city` | string | no |  | City. |
| `zip` | string | no |  | ZIP Code. |
| `country` | string | no |  | Country. Select a country. One of `"DE"`, `"AT"`, `"CH"`, `"BE"`, `"NL"`, `"LU"`, `"FR"`, `"IT"`, `"ES"`, `"PT"`, `"PL"`, `"HU"`, `"GB"`, `"US"`, `"CA"`. |
| `state` | string | no |  | State. |
| `status` | string | no |  | Status. |
| `owner` | string | no |  | Owner. |
| `notes` | string | no |  | Notes. |
| `customFields` | object | no |  | Custom Fields. |

### `get_company`

**Get Company.** Fetch a single company record by its ID. Read-only lookup for inspecting one company; to enumerate or search companies use a list action instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company. Select a company. A value the product loads from the provider, such as an id; write the value itself. |

### `list_companies`

**List Companies.** Read-only listing of companies (CRM accounts) in NinjaPipe, with optional search text, status/owner filters, and pagination. Pick this to browse or find companies; enable Return All to page through every match instead of a single page. Safe to repeat. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. Maximum number of records to return (1-100). |
| `search` | string | no |  | Search. Search query string. |
| `statusFilter` | string | no |  | Status Filter. Filter records by status. |
| `ownerFilter` | string | no |  | Owner Filter. Filter by owner identifier. |
| `returnAll` | boolean | no | `false` | Return All. Retrieve all companies using pagination. |
| `page` | number | no | `1` | Page. Page number when not using Return All. |

### `delete_company`

**Delete Company.** Permanently delete a company identified by its ID. Destructive and not reversible; re-running after the company is gone will fail since the ID no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company. Select a company. A value the product loads from the provider, such as an id; write the value itself. |

### `create_deal`

**Create Deal.** Creates a new deal (sales opportunity) in NinjaPipe, optionally tied to a pipeline, company, and contact, with value/currency, status, owner, and custom fields. Only Name is required. Not idempotent: each call adds another deal, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `title` | string | no |  | Title. |
| `status` | string | no |  | Status. |
| `value` | number | no |  | Value. |
| `currency` | string | no |  | Currency. e.g. EUR, USD. |
| `owner` | string | no |  | Owner. |
| `pipelineId` | string | no |  | Pipeline. Select a pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `companyId` | string | no |  | Company. Select a company. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | no |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `notes` | string | no |  | Notes. |
| `customFields` | object | no |  | Custom Fields. |

### `update_deal`

**Update Deal.** Update an existing deal identified by its ID. Only supplied fields are changed (name, status, value, currency, owner, or associated pipeline/company/contact). Repeating the same update is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealId` | string | yes |  | Deal. Select a deal. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `title` | string | no |  | Title. |
| `status` | string | no |  | Status. |
| `value` | number | no |  | Value. |
| `currency` | string | no |  | Currency. |
| `owner` | string | no |  | Owner. |
| `pipelineId` | string | no |  | Pipeline. Select a pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `companyId` | string | no |  | Company. Select a company. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | no |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `notes` | string | no |  | Notes. |
| `customFields` | object | no |  | Custom Fields. |

### `get_deal`

**Get Deal.** Fetches a single deal by its ID, returning its full record. Pick this when you already have a deal ID and need its details; use List Deals instead to search or browse. Read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealId` | string | yes |  | Deal. Select a deal. A value the product loads from the provider, such as an id; write the value itself. |

### `list_deals`

**List Deals.** Read-only listing of deals (sales opportunities) in NinjaPipe, with optional search text, status/owner filters, and pagination. Pick this to browse or find deals; enable Return All to page through every match instead of a single page. Safe to repeat. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. Maximum number of records to return (1-100). |
| `search` | string | no |  | Search. Search query string. |
| `statusFilter` | string | no |  | Status Filter. Filter records by status. |
| `ownerFilter` | string | no |  | Owner Filter. Filter by owner identifier. |
| `returnAll` | boolean | no | `false` | Return All. Retrieve all deals using pagination. |
| `page` | number | no | `1` | Page. Page number when not using Return All. |

### `delete_deal`

**Delete Deal.** Permanently delete a deal identified by its ID. Destructive and not reversible; re-running after the deal is gone will fail since the ID no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealId` | string | yes |  | Deal. Select a deal. A value the product loads from the provider, such as an id; write the value itself. |

### `create_product`

**Create Product.** Create a new product with a required name, SKU, and price; optionally set description, currency, status, and custom fields. The SKU must be unique within the workspace, so a duplicate SKU is rejected. Not idempotent — each successful call creates a distinct product. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Product name. |
| `sku` | string | yes |  | SKU. Product SKU. Must be unique within your workspace. |
| `price` | number | yes |  | Price. Product price. |
| `description` | string | no |  | Description. |
| `currency` | string | no |  | Currency. |
| `status` | string | no |  | Status. |
| `customFields` | object | no |  | Custom Fields. |

### `update_product`

**Update Product.** Updates an existing product identified by Product ID, applying only the fields you supply (name, SKU, description, price, currency, status, custom fields); omitted fields are left unchanged. Requires a valid product ID; repeating with the same values is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | string | yes |  | Product. Select a product. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `sku` | string | no |  | SKU. |
| `description` | string | no |  | Description. |
| `price` | number | no |  | Price. |
| `currency` | string | no |  | Currency. |
| `status` | string | no |  | Status. |
| `customFields` | object | no |  | Custom Fields. |

### `get_product`

**Get Product.** Fetch a single product by its ID to read its current details. Use when you already have the product ID; to find a product by name or SKU, list/search products first. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | string | yes |  | Product. Select a product. A value the product loads from the provider, such as an id; write the value itself. |

### `list_products`

**List Products.** List products with optional search text. Read-only; supports single-page paging or "Return All" to follow pagination across every page. Use to discover product IDs or look up a product by name. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. Maximum number of records to return (1-100). |
| `search` | string | no |  | Search. Search query string. |
| `returnAll` | boolean | no | `false` | Return All. Retrieve all products using pagination. |
| `page` | number | no | `1` | Page. Page number when not using Return All. |

### `delete_product`

**Delete Product.** Permanently deletes a product identified by Product ID. Pick this to remove a product from the catalog; the change is destructive and cannot be undone. Re-running after deletion typically fails since the ID no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | string | yes |  | Product. Select a product. A value the product loads from the provider, such as an id; write the value itself. |

### `create_budget`

**Create Budget.** Create a new budget in NinjaPipe with a name and an allocated amount (which must be greater than 0); optionally set category, period, currency (defaults to USD), status, and start/end dates. Not idempotent — each call creates a separate budget, so calling repeatedly produces duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Budget name. |
| `allocated` | number | yes |  | Allocated Amount. Total allocated budget amount. Must be greater than 0. |
| `description` | string | no |  | Description. |
| `category` | string | no |  | Category. Budget category. One of `"Marketing"`, `"Sales"`, `"Product"`, `"Operations"`. |
| `period` | string | no |  | Period. Budget period. One of `"Monthly"`, `"Quarterly"`, `"Yearly"`. |
| `currency` | string | no |  | Currency. Currency code, e.g. USD, EUR. Defaults to USD. |
| `status` | string | no | `"Active"` | Status. Budget status. One of `"Active"`, `"Inactive"`, `"Completed"`. |
| `startDate` | ISO date-time string | no |  | Start Date. |
| `endDate` | ISO date-time string | no |  | End Date. |

### `update_budget`

**Update Budget.** Update an existing budget identified by its ID. Only supplied fields change (name, allocated amount, category, period, currency, status, start/end dates); allocated must be greater than 0 if set. Repeating the same update is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `budgetId` | string | yes |  | Budget. Select a budget. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `allocated` | number | no |  | Allocated Amount. Total allocated budget amount. Must be greater than 0 if set. |
| `description` | string | no |  | Description. |
| `category` | string | no |  | Category. Budget category. One of `"Marketing"`, `"Sales"`, `"Product"`, `"Operations"`. |
| `period` | string | no |  | Period. Budget period. One of `"Monthly"`, `"Quarterly"`, `"Yearly"`. |
| `currency` | string | no |  | Currency. |
| `status` | string | no | `"Active"` | Status. Budget status. One of `"Active"`, `"Inactive"`, `"Completed"`. |
| `startDate` | ISO date-time string | no |  | Start Date. |
| `endDate` | ISO date-time string | no |  | End Date. |

### `get_budget`

**Get Budget.** Fetch a single budget by its ID. Read-only lookup for inspecting one budget; to enumerate or search budgets use a list action instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `budgetId` | string | yes |  | Budget. Select a budget. A value the product loads from the provider, such as an id; write the value itself. |

### `list_budgets`

**List Budgets.** Read-only listing of budgets in NinjaPipe, with optional search text and pagination. Pick this to browse or find budgets; enable Return All to page through every match instead of a single page. Safe to repeat. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. Maximum number of records to return (1-100). |
| `search` | string | no |  | Search. Search query string. |
| `returnAll` | boolean | no | `false` | Return All. Retrieve all budgets using pagination. |
| `page` | number | no | `1` | Page. Page number when not using Return All. |

### `delete_budget`

**Delete Budget.** Permanently deletes a budget identified by Budget ID. Pick this to remove a budget and its tracking; the change is destructive and cannot be undone. Re-running after deletion typically fails since the ID no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `budgetId` | string | yes |  | Budget. Select a budget. A value the product loads from the provider, such as an id; write the value itself. |

### `create_budget_expense`

**Create Budget Expense.** Records an expense against a specific budget, increasing that budget's spent total by the amount given. Requires budget ID, description, amount, category, and date. Not idempotent: each call adds another expense and further increases the spent amount, so avoid duplicate retries. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `budgetId` | string | yes |  | Budget. Select a budget. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | yes |  | Description. Description of the expense. |
| `amount` | number | yes |  | Amount. Expense amount (positive number). |
| `category` | string | yes |  | Category. Expense category (e.g. Marketing, Travel). |
| `date` | ISO date-time string | yes |  | Date. Expense date. |

### `create_project`

**Create Project.** Creates a new project in NinjaPipe with optional description, status, priority, due date, linked contact, team members, tags, and extra settings. Only Name is required. Not idempotent: each call creates another project, so avoid retries that would duplicate it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `status` | string | no | `"Planning"` | Status. Project status. One of `"Planning"`, `"In Progress"`, `"Completed"`, `"On Hold"`, `"Cancelled"`. |
| `priority` | string | no | `"Medium"` | Priority. Priority level. One of `"High"`, `"Medium"`, `"Low"`. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `contactId` | string | no |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `team` | array | no |  | Team. Optional list of team members (account IDs). |
| `tags` | array | no |  | Tags. |
| `settingsJson` | object | no |  | Extra Settings. Optional metadata (e.g. linked contact, custom fields). |

### `update_project`

**Update Project.** Updates an existing project identified by Project ID, applying only the fields you supply (name, description, status, priority, due date, team, tags, extra settings); omitted fields are left unchanged. Requires a valid project ID; repeating with the same values is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the project this task belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `status` | string | no | `"Planning"` | Status. Project status. One of `"Planning"`, `"In Progress"`, `"Completed"`, `"On Hold"`, `"Cancelled"`. |
| `priority` | string | no | `"Medium"` | Priority. Priority level. One of `"High"`, `"Medium"`, `"Low"`. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `team` | array | no |  | Team. |
| `tags` | array | no |  | Tags. |
| `settingsJson` | object | no |  | Extra Settings. |

### `get_project`

**Get Project.** Fetch a single project by its ID. Read-only lookup for inspecting one project; to enumerate or search projects use the list-projects action instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the project this task belongs to. A value the product loads from the provider, such as an id; write the value itself. |

### `list_projects`

**List Projects.** List projects with optional search text and status/owner filters. Read-only; supports single-page paging or "Return All" to follow pagination across every page. Use to discover project IDs before fetching or operating on a project. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. Maximum number of records to return (1-100). |
| `search` | string | no |  | Search. Search query string. |
| `statusFilter` | string | no |  | Status Filter. Filter records by status. |
| `ownerFilter` | string | no |  | Owner Filter. Filter by owner identifier. |
| `returnAll` | boolean | no | `false` | Return All. Retrieve all projects using pagination. |
| `page` | number | no | `1` | Page. Page number when not using Return All. |

### `delete_project`

**Delete Project.** Permanently deletes a project identified by Project ID, including its tasks. Pick this to remove a project entirely; the change is destructive and cannot be undone. Re-running after deletion typically fails since the ID no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the project this task belongs to. A value the product loads from the provider, such as an id; write the value itself. |

### `create_task`

**Create Task.** Creates a task inside a given project, with optional description, status, priority, assignee, due date, tags, and settings. Set Parent Task ID to instead create a subtask under an existing task in the same project. Requires a project ID and title; not idempotent, so each call adds another task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the project this task belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. Task title. |
| `description` | string | no |  | Description. |
| `status` | string | no | `"To Do"` | Status. Task status. One of `"To Do"`, `"In Progress"`, `"Done"`, `"Cancelled"`. |
| `priority` | string | no | `"Medium"` | Priority. Priority level. One of `"High"`, `"Medium"`, `"Low"`. |
| `assigneeId` | string | no |  | Assignee ID. Account ID of the user to assign this task to. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `parentId` | string | no |  | Parent Task ID. Set to make this a subtask of another task in the same project. |
| `tags` | array | no |  | Tags. |
| `settingsJson` | object | no |  | Extra Settings. Additional task settings as a JSON object. |

### `update_task`

**Update Task.** Update fields on an existing task, identified by its project ID and task ID. Only provided fields are changed; use this to set status, priority, assignee, due date, or to re-parent a subtask within the same project. Repeating the same update is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the project this task belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `taskId` | string | yes |  | Task. Select a task. Pick the project first. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. |
| `description` | string | no |  | Description. |
| `status` | string | no | `"To Do"` | Status. Task status. One of `"To Do"`, `"In Progress"`, `"Done"`, `"Cancelled"`. |
| `priority` | string | no | `"Medium"` | Priority. Priority level. One of `"High"`, `"Medium"`, `"Low"`. |
| `assigneeId` | string | no |  | Assignee ID. Account ID of the user to assign this task to. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `parentId` | string | no |  | Parent Task ID. Move under another task in the same project. |
| `tags` | array | no |  | Tags. |
| `settingsJson` | object | no |  | Extra Settings. |

### `get_task`

**Get Task.** Fetch a single task by its ID within a specific project to read its current details; requires both the project ID and the task ID. Use when you already have both IDs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the project this task belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `taskId` | string | yes |  | Task. Select a task. Pick the project first. A value the product loads from the provider, such as an id; write the value itself. |

### `list_tasks`

**List Tasks.** List the tasks of a given project as a flat array, with optional status, priority, and parent-task filters plus sorting. Read-only; pass a parent task ID to fetch its subtasks, or an empty string to fetch only root tasks. Use to discover task IDs before updating a task. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the project this task belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `statusFilter` | string | no |  | Status Filter. One of `"To Do"`, `"In Progress"`, `"Done"`, `"Cancelled"`. |
| `priorityFilter` | string | no |  | Priority Filter. One of `"High"`, `"Medium"`, `"Low"`. |
| `parentId` | string | no |  | Parent Task Filter. Pass a parent task ID to fetch its subtasks. Empty string to fetch only root tasks. |
| `sortBy` | string | no | `"order_index"` | Sort By. One of `"order_index"`, `"created_at"`, `"updated_at"`, `"title"`, `"due_date"`. |
| `sortOrder` | string | no | `"asc"` | Sort Order. One of `"asc"`, `"desc"`. |

### `delete_task`

**Delete Task.** Permanently delete a task by ID within a given project; any subtasks may be cascade-deleted along with it. Requires both the project ID and the task ID. Use only when the task should be removed outright; the operation is irreversible and safe to retry since re-deleting settles to the same removed state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the project this task belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `taskId` | string | yes |  | Task. Select a task. Pick the project first. A value the product loads from the provider, such as an id; write the value itself. |

### `create_pipeline`

**Create Pipeline.** Creates a new pipeline of a given type (contacts, deals, or general) with at least one stage, each stage needing an id, name, and hex color. Requires name, pipeline type, and a non-empty stages array. Not idempotent: each call creates another pipeline. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `pipelineType` | string | yes | `"general"` | Pipeline Type. Required by NinjaPipe — what this pipeline tracks. One of `"contacts"`, `"deals"`, `"general"`. |
| `stages` | array | yes |  | Stages. Pipeline stages. Add at least one. Color must be a hex like #3b82f6. Each item: { `id`, `name`, `color` }. |
| `description` | string | no |  | Description. |
| `status` | string | no |  | Status. |

### `update_pipeline`

**Update Pipeline.** Update an existing pipeline identified by ID, changing only the fields you supply (name, pipeline type, description, or status); omitted fields are left unchanged. Use to edit a known pipeline rather than create one. Idempotent — applying the same field values repeatedly yields the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pipelineId` | string | yes |  | Pipeline. Select a pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `pipelineType` | string | no |  | Pipeline Type. One of `"contacts"`, `"deals"`, `"general"`. |
| `description` | string | no |  | Description. |
| `status` | string | no |  | Status. |

### `get_pipeline`

**Get Pipeline.** Fetch a single NinjaPipe sales pipeline by its ID. Read-only lookup for inspecting one pipeline; to enumerate available pipelines use a list action instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pipelineId` | string | yes |  | Pipeline. Select a pipeline. A value the product loads from the provider, such as an id; write the value itself. |

### `list_pipelines`

**List Pipelines.** List pipelines in the workspace, optionally filtered by a search term, with paging via limit and page. Set Return All to fetch every matching pipeline across pages; otherwise a single page is returned. Use to discover pipelines or resolve a pipeline ID by name. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. Maximum number of records to return (1-100). |
| `search` | string | no |  | Search. Search query string. |
| `returnAll` | boolean | no | `false` | Return All. Retrieve all pipelines using pagination. |
| `page` | number | no | `1` | Page. Page number when not using Return All. |

### `delete_pipeline`

**Delete Pipeline.** Permanently delete a NinjaPipe pipeline by its ID. Pick this only when the pipeline should be removed entirely; deletion is irreversible and cascades to the pipeline's stages. Safe to retry — deleting an already-deleted pipeline settles to the same removed state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pipelineId` | string | yes |  | Pipeline. Select a pipeline. A value the product loads from the provider, such as an id; write the value itself. |

### `create_order`

**Create Order.** Creates a new order with customer details, amounts, status, payment status, dates, priority, and tracking; line items, currency, and custom fields go in Settings JSON. Only Customer Name is required, and Order Number defaults to ORD-<timestamp> if omitted. Not idempotent: each call creates another order. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerName` | string | yes |  | Customer Name. Customer display name. |
| `customerEmail` | string | no |  | Customer Email. |
| `customerCompany` | string | no |  | Customer Company. |
| `contactId` | string | no |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `orderNumber` | string | no |  | Order Number. Defaults to ORD-<timestamp> if omitted. |
| `totalAmount` | number | no |  | Total Amount. |
| `status` | string | no | `"Processing"` | Status. Order status. One of `"Processing"`, `"Shipped"`, `"Delivered"`, `"Cancelled"`. |
| `paymentStatus` | string | no | `"Pending"` | Payment Status. Payment status. One of `"Pending"`, `"Paid"`, `"Refunded"`, `"Failed"`. |
| `orderDate` | ISO date-time string | no |  | Order Date. |
| `deliveryDate` | ISO date-time string | no |  | Delivery Date. |
| `priority` | string | no | `"Medium"` | Priority. Priority level. One of `"High"`, `"Medium"`, `"Low"`. |
| `trackingNumber` | string | no |  | Tracking Number. |
| `notes` | string | no |  | Notes. |
| `settingsJson` | object | no |  | Settings JSON. Line items, currency, and custom fields. Example: {"currency":"USD","items":[{"name":"…","price":10}],"custom_fields":[]}. |

### `update_order`

**Update Order.** Updates an existing order identified by Order ID, applying only the fields you supply (customer details, amounts, status, payment status, dates, priority, tracking, notes); line items, currency, and custom fields go in Settings JSON. Requires a valid order ID; repeating with the same values is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | string | yes |  | Order. Select an order. A value the product loads from the provider, such as an id; write the value itself. |
| `customerName` | string | no |  | Customer Name. |
| `customerEmail` | string | no |  | Customer Email. |
| `customerCompany` | string | no |  | Customer Company. |
| `contactId` | string | no |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `orderNumber` | string | no |  | Order Number. |
| `totalAmount` | number | no |  | Total Amount. |
| `status` | string | no | `"Processing"` | Status. Order status. One of `"Processing"`, `"Shipped"`, `"Delivered"`, `"Cancelled"`. |
| `paymentStatus` | string | no | `"Pending"` | Payment Status. Payment status. One of `"Pending"`, `"Paid"`, `"Refunded"`, `"Failed"`. |
| `orderDate` | ISO date-time string | no |  | Order Date. |
| `deliveryDate` | ISO date-time string | no |  | Delivery Date. |
| `priority` | string | no | `"Medium"` | Priority. Priority level. One of `"High"`, `"Medium"`, `"Low"`. |
| `trackingNumber` | string | no |  | Tracking Number. |
| `notes` | string | no |  | Notes. |
| `settingsJson` | object | no |  | Settings JSON. Line items, currency, and custom fields. |

### `get_order`

**Get Order.** Fetches a single order by its ID, returning its full record. Pick this when you already have an order ID and need its details rather than searching a list. Read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | string | yes |  | Order. Select an order. A value the product loads from the provider, such as an id; write the value itself. |

### `list_orders`

**List Orders.** List orders with optional search text and status filter. Read-only; supports single-page paging or "Return All" to follow pagination across every page. Use to discover order IDs before fetching or deleting an order. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. Maximum number of records to return (1-100). |
| `search` | string | no |  | Search. Search query string. |
| `statusFilter` | string | no |  | Status Filter. Filter records by status. |
| `returnAll` | boolean | no | `false` | Return All. Retrieve all orders using pagination. |
| `page` | number | no | `1` | Page. Page number when not using Return All. |

### `delete_order`

**Delete Order.** Permanently delete an order identified by its ID. Destructive and not reversible; re-running after the order is gone will fail since the ID no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | string | yes |  | Order. Select an order. A value the product loads from the provider, such as an id; write the value itself. |

### `send_to_databin`

**Send to Databin.** Post an arbitrary JSON payload to a NinjaPipe Databin webhook. The webhook URL must be HTTPS, contain /api/webhooks/, and resolve to the same host as the connected workspace, or the call is rejected. Each send is a fresh delivery, so repeated calls are not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhookUrl` | string | yes |  | Databin Webhook URL. The full HTTPS webhook URL from your Databin. Must point to your connected NinjaPipe host and contain /api/webhooks/. |
| `payload` | JSON | yes |  | Payload. JSON object to send. |

### `add_to_list`

**Add to List.** Add a single member to a CRM list by list ID — provide exactly one of a contact ID or a company ID (not both, not neither), and the member type must match the list type. Idempotent — adding a member already on the list is a no-op rather than an error. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | List ID. The list UUID (must belong to your workspace). |
| `contactId` | string | no |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `companyId` | string | no |  | Company. Select a company. A value the product loads from the provider, such as an id; write the value itself. |

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

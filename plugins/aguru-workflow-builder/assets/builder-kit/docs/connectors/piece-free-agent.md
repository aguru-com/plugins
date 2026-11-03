# FreeAgent

Accounting and invoicing software for small businesses

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-free-agent'
  version: '0.1.8'
```

Categories: ACCOUNTING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your FreeAgent account

## Actions

### `create_task`

**Create Task.** Creates a new task within a specific FreeAgent project. Requires a project (selected from the account) and a task name; optionally sets billable status, billing rate/period, and task status. Not idempotent — each call adds a new task, so guard against duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. Select the project to create the task in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Task Name. The name of the task. |
| `is_billable` | boolean | no | `true` | Billable. Whether this task is billable to clients. |
| `billing_rate` | number | no |  | Billing Rate. The rate at which the project is billed per billing period. |
| `billing_period` | string | no | `"hour"` | Billing Period. The period for billing rate. One of `"hour"`, `"day"`. |
| `status` | string | no | `"Active"` | Status. The status of the task. One of `"Active"`, `"Completed"`, `"Hidden"`. |

### `create_contact`

**Create Contact.** Creates a new contact (client or supplier) in FreeAgent. Use when adding a person or organization to bill or work with. Requires either a first and last name or an organization name; all other fields (email, address, tax, payment terms, locale) are optional. Not idempotent — each call creates another contact even with identical details. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | no |  | First Name. First name (required if organization name is not specified) |
| `last_name` | string | no |  | Last Name. Last name (required if organization name is not specified) |
| `organisation_name` | string | no |  | Organization Name. Organization name (required if first and last name are not specified) |
| `email` | string | no |  | Email. Email address. |
| `billing_email` | string | no |  | Billing Email. Billing email address. |
| `phone_number` | string | no |  | Phone Number. Telephone number. |
| `mobile` | string | no |  | Mobile. Mobile number. |
| `address1` | string | no |  | Address Line 1. First line of the address. |
| `address2` | string | no |  | Address Line 2. Second line of the address. |
| `address3` | string | no |  | Address Line 3. Third line of the address. |
| `town` | string | no |  | Town. Town or city. |
| `region` | string | no |  | Region. Region or state. |
| `postcode` | string | no |  | Postcode. Post or ZIP code. |
| `country` | string | no |  | Country. Country. |
| `contact_name_on_invoices` | boolean | no | `false` | Show Contact Name on Invoices. Show contact name as well as organization name on invoices. |
| `default_payment_terms_in_days` | number | no |  | Default Payment Terms (Days). Default payment terms in days. |
| `charge_sales_tax` | string | no | `"Auto"` | Charge Sales Tax. How to handle sales tax for this contact. One of `"Auto"`, `"Always"`, `"Never"`. |
| `sales_tax_registration_number` | string | no |  | Sales Tax Registration Number. Sales tax registration number if applicable. |
| `status` | string | no | `"Active"` | Status. Contact status. One of `"Active"`, `"Hidden"`. |
| `locale` | string | no | `"en"` | Locale. Invoice/estimate language. One of `"en"`, `"en-US"`, `"es"`, `"fr"`, `"de"`, `"nl"`, `"it"`, `"pt-BR"`. |

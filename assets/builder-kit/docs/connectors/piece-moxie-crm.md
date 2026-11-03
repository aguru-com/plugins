# Moxie

CRM build for the freelancers.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-moxie-crm'
  version: '0.4.0'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To connect your Moxie workspace:
>
> 1. Log in to Moxie and click **Workspace Settings** (bottom left).
> 2. Open **Connected Apps** and go to the **Integrations** tab.
> 3. Under **Custom Integration**, click **Enable Custom Integration**.
> 4. Copy the **API Key** and the **Base URL** (it looks like `https://pod01.withmoxie.com/api/public`) and click **Save**.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. The API Key of the Moxie CRM account. |
| `baseUrl` | string | yes |  | Base URL. The Base URL shown next to the API key, for example https://pod01.withmoxie.com/api/public. |

## Actions

### `moxie_create_client`

**Create a Client.** Creates a new client or prospect record in Moxie CRM with contact, address, billing, and rate details. Use when onboarding a new account into the CRM; set Client Type to distinguish a converted Client from a Prospect lead. Not idempotent: each call creates a separate client even if the name matches an existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `clientType` | string | yes | `"Client"` | Client Type. One of `"Client"`, `"Prospect"`. |
| `initials` | string | no |  | Initials. |
| `address1` | string | no |  | Address 1. |
| `address2` | string | no |  | Address 2. |
| `city` | string | no |  | City. |
| `locality` | string | no |  | Locality. |
| `postal` | string | no |  | Postal. |
| `country` | string | no |  | Country. ISO 3166-1 alpha-2 country code. |
| `website` | string | no |  | Website. |
| `phone` | string | no |  | Phone. |
| `color` | string | no |  | Color. |
| `taxId` | string | no |  | Tax ID. |
| `leadSource` | string | no |  | Lead Source. |
| `archive` | boolean | yes | `false` | Archive ?. |
| `payInstructions` | string | no |  | Pay Instructions. |
| `hourlyAmount` | number | no |  | Hourly Amount. |
| `roundingIncrement` | number | no |  | Rounding Increment. |
| `currency` | string | no |  | Currency. Valid 3-Letter ISO 4217 currency code. |
| `stripeClientId` | string | no |  | Stripe Client ID. |
| `notes` | string | no |  | Notes. |

Output fields:

- `id`: Client ID
- `name`: Name
- `clientType`: Client Type
- `initials`: Initials
- `address1`: Address Line 1
- `address2`: Address Line 2
- `city`: City
- `locality`: State or Region
- `postal`: Postal Code
- `country`: Country
- `website`: Website (url)
- `phone`: Phone
- `logo`: Logo (image)
- `color`: Colour
- `taxId`: Tax ID
- `leadSource`: Lead Source
- `archive`: Archived (boolean)
- `hourlyAmount`: Hourly Amount (number)
- `roundingIncrement`: Rounding Increment (number)
- `defaultTaxRate`: Default Tax Rate (number)
- `currency`: Currency
- `payInstructions`: Payment Instructions
- `notes`: Notes
- `stripeClientId`: Stripe Customer ID
- `created`: Created (datetime)
- `lastInvoiceRunDate`: Last Invoice Run Date (date)
- `nextInvoiceRunDate`: Next Invoice Run Date (date)
- `paymentTerms`: Payment Terms
- `paymentTerms.paymentDays`: Payment Days (number)
- `paymentTerms.latePaymentFee`: Late Payment Fee (number)
- `paymentTerms.depositAmount`: Deposit Amount (number)
- `paymentTerms.depositType`: Deposit Type
- `paymentTerms.hourlyAmount`: Hourly Amount (number)
- `paymentTerms.whoPaysCardFees`: Who Pays Card Fees
- `paymentTerms.updatedDate`: Updated Date (datetime)
- `paymentTerms.updatedBy`: Updated By
- `integrationKeys`: Integration Keys
- `integrationKeys.quickbooksId`: QuickBooks ID
- `integrationKeys.xeroId`: Xero ID
- `contacts`: Contacts
- `contacts[].id`: Contact ID
- `contacts[].firstName`: First Name
- `contacts[].lastName`: Last Name
- `contacts[].email`: Email (email)
- `contacts[].phone`: Phone
- `contacts[].mobile`: Mobile
- `contacts[].role`: Role
- `contacts[].clientId`: Client ID
- `contacts[].defaultContact`: Default Contact (boolean)
- `contacts[].invoiceContact`: Invoice Contact (boolean)
- `contacts[].portalAccess`: Portal Access (boolean)
- `contacts[].notes`: Notes
- `contacts[].customValues`: Custom Values
- `contacts[].customValues[].fieldId`: Field ID
- `contacts[].customValues[].mappingKey`: Mapping Key
- `contacts[].customValues[].fieldName`: Field Name
- `contacts[].customValues[].value`: Value
- `contacts[].customValues[].type`: Field Type
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type

### `moxie_create_contact`

**Create a Contact.** Creates a contact in Moxie CRM, optionally attached to an existing client by name. Use when adding a person to an account, or when a lead needs a named contact. Not idempotent: each call creates a separate contact even if the email matches an existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first` | string | yes |  | First Name. |
| `last` | string | yes |  | Last Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `clientName` | string | no |  | Client. The client this contact belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `defaultContact` | boolean | no |  | Default Contact. Make this the primary contact for the client. |
| `invoiceContact` | boolean | no |  | Invoice Contact. Send invoices for the client to this contact. |
| `portalAccess` | boolean | no |  | Portal Access. Allow this contact to sign in to the client portal. |
| `notes` | string | no |  | Notes. |

Output fields:

- `id`: Contact ID
- `firstName`: First Name
- `lastName`: Last Name
- `email`: Email (email)
- `phone`: Phone
- `mobile`: Mobile
- `role`: Role
- `clientId`: Client ID
- `defaultContact`: Default Contact (boolean)
- `invoiceContact`: Invoice Contact (boolean)
- `portalAccess`: Portal Access (boolean)
- `notes`: Notes
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type

### `moxie_create_task`

**Create a Task.** Creates a task (deliverable) inside an existing project in Moxie CRM, with status, dates, priority, assignees, subtasks, and custom values. Use when adding work items to a project. Requires an exact-match client name and a project name owned by that client. Not idempotent: each call creates a separate task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `clientName` | string | yes |  | Client Name. Exact match of a client name in your CRM. A value the product loads from the provider, such as an id; write the value itself. |
| `projectName` | string | yes |  | Project Name. Exact match of a project that is owned by the client. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | yes |  | Status. The stage to place the task in. Stages come from the selected project type. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. |
| `startDate` | ISO date-time string | no |  | Start Date. ISO 8601 format date i.e. 2023-07-20. |
| `dueDate` | ISO date-time string | no |  | Due Date. ISO 8601 format date i.e. 2023-07-20. |
| `priority` | number | no |  | Priority. Numeric priority for sorting in kanban. |
| `tasks` | array | no |  | Subtasks. |
| `assignedTo` | array | no |  | Assigned To. email addresses of users in the workspace. |
| `customValues` | object | no |  | Custom Values. |

Output fields:

- `id`: Task ID
- `name`: Name
- `clientId`: Client ID
- `projectId`: Project ID
- `projectTypeId`: Project Type ID
- `statusId`: Status ID
- `description`: Description
- `descriptionFormat`: Description Format
- `type`: Type
- `priority`: Priority (number)
- `taskPriority`: Priority Label
- `startDate`: Start Date (date)
- `dueDate`: Due Date (date)
- `created`: Created (datetime)
- `completed`: Completed (datetime)
- `archived`: Archived (boolean)
- `approvalRequired`: Approval Required (boolean)
- `approvalRequestedAt`: Approval Requested At (datetime)
- `isSubTask`: Is Subtask (boolean)
- `parentTaskId`: Parent Task ID
- `subTaskSort`: Subtask Sort (number)
- `kanbanSort`: Kanban Sort (number)
- `ticketId`: Ticket ID
- `product`: Product
- `quantity`: Quantity (number)
- `invoiceId`: Invoice ID
- `invoiceNumber`: Invoice Number
- `assignedTo`: Assigned To
- `assignedToList`: Assigned User IDs
- `events`: Events
- `events[].user`: User
- `events[].events`: Events
- `events[].clientEvent`: Client Event (boolean)
- `events[].timestamp`: Timestamp (datetime)
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type
- `tasks`: Subtasks
- `tasks[].id`: Subtask ID
- `tasks[].description`: Description
- `tasks[].complete`: Complete (boolean)

### `moxie_create_project`

**Create a Project.** Creates a new project in Moxie CRM under an existing client, including its fee schedule (hourly, fixed price, retainer, or per item), portal access level, and dates. Use when starting a new engagement for a known client. The Client must already exist and is matched by exact client name. Not idempotent: each call creates a separate project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Project Name. |
| `clientName` | string | yes |  | Client. The client, matched by its exact name. A value the product loads from the provider, such as an id; write the value itself. |
| `startDate` | ISO date-time string | no |  | Start Date. Please enter date in YYYY-MM-DD format. |
| `dueDate` | ISO date-time string | no |  | Due Date. Please enter date in YYYY-MM-DD format. |
| `portalAccess` | string | yes | `"Read only"` | Client Portal Access. One of: None, Overview, Full access, or Read only. One of `"None"`, `"Overview"`, `"Read only"`, `"Full access"`. |
| `showTimeWorkedInPortal` | boolean | no | `true` | Show time worked in portal ?. |
| `feeType` | string | yes |  | Fee Type. One of: Hourly, Fixed Price, Retainer, Per Item. One of `"Hourly"`, `"Fixed Price"`, `"Retainer"`, `"Per Item"`. |
| `amount` | number | no | `0` | Amount. |
| `estimateMax` | number | no | `0` | Estimate maximum Amount. |
| `estimateMin` | number | no | `0` | Estimate minimum Amount. |
| `taxable` | boolean | no | `false` | Is amount taxable ?. |
| `templateName` | string | no |  | Project Template. Exact name of a project template to copy tasks and settings from. Leave empty for none. |
| `customValues` | object | no |  | Custom Values. Custom project field values keyed by field name. |

Output fields:

- `id`: Project ID
- `name`: Name
- `clientId`: Client ID
- `projectTypeId`: Project Type ID
- `active`: Active (boolean)
- `startDate`: Start Date (date)
- `dueDate`: Due Date (date)
- `dateCreated`: Created (datetime)
- `hexColor`: Colour
- `portalAccess`: Client Portal Access
- `portalAccessAssignedOnly`: Portal Access Assigned Only (boolean)
- `showTimeWorkedInPortal`: Show Time Worked In Portal (boolean)
- `proposalId`: Proposal ID
- `proposalName`: Proposal Name
- `feeSchedule`: Fee Schedule
- `feeSchedule.feeType`: Fee Type
- `feeSchedule.amount`: Amount (number)
- `feeSchedule.estimateMin`: Estimate Minimum (number)
- `feeSchedule.estimateMax`: Estimate Maximum (number)
- `feeSchedule.taxable`: Taxable (boolean)
- `feeSchedule.retainerSchedule`: Retainer Schedule
- `feeSchedule.retainerTiming`: Retainer Timing
- `feeSchedule.retainerPeriods`: Retainer Periods (number)
- `feeSchedule.retainerOverageRate`: Retainer Overage Rate (number)
- `feeSchedule.retainerActive`: Retainer Active (boolean)
- `feeSchedule.updatedDate`: Updated Date (datetime)
- `feeSchedule.updatedBy`: Updated By
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type
- `description`: Description
- `dateCompleted`: Date Completed (date)
- `proposalVersion`: Proposal Version (number)
- `clientMini`: Client
- `clientMini.id`: Client ID
- `clientMini.name`: Name
- `clientMini.clientType`: Client Type
- `clientMini.initials`: Initials
- `clientMini.address1`: Address Line 1
- `clientMini.address2`: Address Line 2
- `clientMini.city`: City
- `clientMini.locality`: State or Region
- `clientMini.postal`: Postal Code
- `clientMini.country`: Country
- `clientMini.website`: Website (url)
- `clientMini.phone`: Phone
- `clientMini.logo`: Logo (image)
- `clientMini.color`: Colour
- `clientMini.taxId`: Tax ID
- `clientMini.leadSource`: Lead Source
- `clientMini.archive`: Archived (boolean)
- `clientMini.hourlyAmount`: Hourly Amount (number)
- `clientMini.defaultTaxRate`: Default Tax Rate (number)
- `clientMini.currency`: Currency
- `clientMini.whoPaysCardFees`: Who Pays Card Fees

### `moxie_list_clients`

**List Clients.** Returns all clients and prospects in the Moxie workspace. Use to find a client id or name before creating a project, task or invoice against it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Client ID
- `[].name`: Name
- `[].clientType`: Client Type
- `[].initials`: Initials
- `[].address1`: Address Line 1
- `[].address2`: Address Line 2
- `[].city`: City
- `[].locality`: State or Region
- `[].postal`: Postal Code
- `[].country`: Country
- `[].website`: Website (url)
- `[].phone`: Phone
- `[].logo`: Logo (image)
- `[].color`: Colour
- `[].taxId`: Tax ID
- `[].leadSource`: Lead Source
- `[].archive`: Archived (boolean)
- `[].hourlyAmount`: Hourly Amount (number)
- `[].roundingIncrement`: Rounding Increment (number)
- `[].defaultTaxRate`: Default Tax Rate (number)
- `[].currency`: Currency
- `[].payInstructions`: Payment Instructions
- `[].notes`: Notes
- `[].stripeClientId`: Stripe Customer ID
- `[].created`: Created (datetime)
- `[].lastInvoiceRunDate`: Last Invoice Run Date (date)
- `[].nextInvoiceRunDate`: Next Invoice Run Date (date)
- `[].paymentTerms`: Payment Terms
- `[].paymentTerms.paymentDays`: Payment Days (number)
- `[].paymentTerms.latePaymentFee`: Late Payment Fee (number)
- `[].paymentTerms.depositAmount`: Deposit Amount (number)
- `[].paymentTerms.depositType`: Deposit Type
- `[].paymentTerms.hourlyAmount`: Hourly Amount (number)
- `[].paymentTerms.whoPaysCardFees`: Who Pays Card Fees
- `[].paymentTerms.updatedDate`: Updated Date (datetime)
- `[].paymentTerms.updatedBy`: Updated By
- `[].integrationKeys`: Integration Keys
- `[].integrationKeys.quickbooksId`: QuickBooks ID
- `[].integrationKeys.xeroId`: Xero ID
- `[].contacts`: Contacts
- `[].contacts[].id`: Contact ID
- `[].contacts[].firstName`: First Name
- `[].contacts[].lastName`: Last Name
- `[].contacts[].email`: Email (email)
- `[].contacts[].phone`: Phone
- `[].contacts[].mobile`: Mobile
- `[].contacts[].role`: Role
- `[].contacts[].clientId`: Client ID
- `[].contacts[].defaultContact`: Default Contact (boolean)
- `[].contacts[].invoiceContact`: Invoice Contact (boolean)
- `[].contacts[].portalAccess`: Portal Access (boolean)
- `[].contacts[].notes`: Notes
- `[].contacts[].customValues`: Custom Values
- `[].contacts[].customValues[].fieldId`: Field ID
- `[].contacts[].customValues[].mappingKey`: Mapping Key
- `[].contacts[].customValues[].fieldName`: Field Name
- `[].contacts[].customValues[].value`: Value
- `[].contacts[].customValues[].type`: Field Type
- `[].customValues`: Custom Values
- `[].customValues[].fieldId`: Field ID
- `[].customValues[].mappingKey`: Mapping Key
- `[].customValues[].fieldName`: Field Name
- `[].customValues[].value`: Value
- `[].customValues[].type`: Field Type

### `moxie_search_clients`

**Search Clients.** Searches Moxie clients by client name or phone (starts with), contact email or phone (starts with) or contact full name (contains), or returns the one client with an exact Client ID. Use to resolve a client id or exact client name before creating projects, tasks, invoices or contacts for it. Returns an empty list when nothing matches. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Query. Matches a client name, client phone, contact email or contact phone that starts with this value, or a contact full name that contains it. |
| `id` | string | no |  | Client ID. Exact client id. When set, the query is ignored. |

Output fields:

- `[].id`: Client ID
- `[].name`: Name
- `[].clientType`: Client Type
- `[].initials`: Initials
- `[].address1`: Address Line 1
- `[].address2`: Address Line 2
- `[].city`: City
- `[].locality`: State or Region
- `[].postal`: Postal Code
- `[].country`: Country
- `[].website`: Website (url)
- `[].phone`: Phone
- `[].logo`: Logo (image)
- `[].color`: Colour
- `[].taxId`: Tax ID
- `[].leadSource`: Lead Source
- `[].archive`: Archived (boolean)
- `[].hourlyAmount`: Hourly Amount (number)
- `[].roundingIncrement`: Rounding Increment (number)
- `[].defaultTaxRate`: Default Tax Rate (number)
- `[].currency`: Currency
- `[].payInstructions`: Payment Instructions
- `[].notes`: Notes
- `[].stripeClientId`: Stripe Customer ID
- `[].created`: Created (datetime)
- `[].lastInvoiceRunDate`: Last Invoice Run Date (date)
- `[].nextInvoiceRunDate`: Next Invoice Run Date (date)
- `[].paymentTerms`: Payment Terms
- `[].paymentTerms.paymentDays`: Payment Days (number)
- `[].paymentTerms.latePaymentFee`: Late Payment Fee (number)
- `[].paymentTerms.depositAmount`: Deposit Amount (number)
- `[].paymentTerms.depositType`: Deposit Type
- `[].paymentTerms.hourlyAmount`: Hourly Amount (number)
- `[].paymentTerms.whoPaysCardFees`: Who Pays Card Fees
- `[].paymentTerms.updatedDate`: Updated Date (datetime)
- `[].paymentTerms.updatedBy`: Updated By
- `[].integrationKeys`: Integration Keys
- `[].integrationKeys.quickbooksId`: QuickBooks ID
- `[].integrationKeys.xeroId`: Xero ID
- `[].contacts`: Contacts
- `[].contacts[].id`: Contact ID
- `[].contacts[].firstName`: First Name
- `[].contacts[].lastName`: Last Name
- `[].contacts[].email`: Email (email)
- `[].contacts[].phone`: Phone
- `[].contacts[].mobile`: Mobile
- `[].contacts[].role`: Role
- `[].contacts[].clientId`: Client ID
- `[].contacts[].defaultContact`: Default Contact (boolean)
- `[].contacts[].invoiceContact`: Invoice Contact (boolean)
- `[].contacts[].portalAccess`: Portal Access (boolean)
- `[].contacts[].notes`: Notes
- `[].contacts[].customValues`: Custom Values
- `[].contacts[].customValues[].fieldId`: Field ID
- `[].contacts[].customValues[].mappingKey`: Mapping Key
- `[].contacts[].customValues[].fieldName`: Field Name
- `[].contacts[].customValues[].value`: Value
- `[].contacts[].customValues[].type`: Field Type
- `[].customValues`: Custom Values
- `[].customValues[].fieldId`: Field ID
- `[].customValues[].mappingKey`: Mapping Key
- `[].customValues[].fieldName`: Field Name
- `[].customValues[].value`: Value
- `[].customValues[].type`: Field Type

### `moxie_search_contacts`

**Search Contacts.** Searches Moxie contacts whose first name, last name or email contains the query, or returns the one contact with an exact Contact ID; leave both empty to list every active contact. Each contact carries its clientId (resolve the client with Search Clients by id). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Query. Matches a contact first name, last name or email. Leave empty to return every contact. |
| `id` | string | no |  | Contact ID. Exact contact id. When set, the query is ignored. |

Output fields:

- `[].id`: Contact ID
- `[].firstName`: First Name
- `[].lastName`: Last Name
- `[].email`: Email (email)
- `[].phone`: Phone
- `[].mobile`: Mobile
- `[].role`: Role
- `[].clientId`: Client ID
- `[].defaultContact`: Default Contact (boolean)
- `[].invoiceContact`: Invoice Contact (boolean)
- `[].portalAccess`: Portal Access (boolean)
- `[].notes`: Notes
- `[].customValues`: Custom Values
- `[].customValues[].fieldId`: Field ID
- `[].customValues[].mappingKey`: Mapping Key
- `[].customValues[].fieldName`: Field Name
- `[].customValues[].value`: Value
- `[].customValues[].type`: Field Type

### `moxie_search_projects`

**Search Projects.** Returns the projects of the client whose exact name is given in Query (fails with a not-found error when no client has that name), the one project with an exact Project ID, or every project when both are empty. Use to resolve a project id or exact project name before creating tasks, logging time or invoicing. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Client Name. Exact client name whose projects should be returned. Leave empty to list all projects. |
| `id` | string | no |  | Project ID. Exact project id. When set, the client name is ignored. |

Output fields:

- `[].id`: Project ID
- `[].name`: Name
- `[].clientId`: Client ID
- `[].projectTypeId`: Project Type ID
- `[].active`: Active (boolean)
- `[].startDate`: Start Date (date)
- `[].dueDate`: Due Date (date)
- `[].dateCreated`: Created (datetime)
- `[].hexColor`: Colour
- `[].portalAccess`: Client Portal Access
- `[].portalAccessAssignedOnly`: Portal Access Assigned Only (boolean)
- `[].showTimeWorkedInPortal`: Show Time Worked In Portal (boolean)
- `[].proposalId`: Proposal ID
- `[].proposalName`: Proposal Name
- `[].feeSchedule`: Fee Schedule
- `[].feeSchedule.feeType`: Fee Type
- `[].feeSchedule.amount`: Amount (number)
- `[].feeSchedule.estimateMin`: Estimate Minimum (number)
- `[].feeSchedule.estimateMax`: Estimate Maximum (number)
- `[].feeSchedule.taxable`: Taxable (boolean)
- `[].feeSchedule.retainerSchedule`: Retainer Schedule
- `[].feeSchedule.retainerTiming`: Retainer Timing
- `[].feeSchedule.retainerPeriods`: Retainer Periods (number)
- `[].feeSchedule.retainerOverageRate`: Retainer Overage Rate (number)
- `[].feeSchedule.retainerActive`: Retainer Active (boolean)
- `[].feeSchedule.updatedDate`: Updated Date (datetime)
- `[].feeSchedule.updatedBy`: Updated By
- `[].customValues`: Custom Values
- `[].customValues[].fieldId`: Field ID
- `[].customValues[].mappingKey`: Mapping Key
- `[].customValues[].fieldName`: Field Name
- `[].customValues[].value`: Value
- `[].customValues[].type`: Field Type
- `[].client`: Client
- `[].client.id`: Client ID
- `[].client.name`: Name
- `[].paymentHistory`: Payment History
- `[].paymentHistory[].invoiceId`: Invoice ID
- `[].paymentHistory[].invoiceNumber`: Invoice Number (number)
- `[].paymentHistory[].invoiceNumberFormatted`: Invoice Number Formatted
- `[].paymentHistory[].invoiceStatus`: Invoice Status
- `[].paymentHistory[].invoiceDate`: Invoice Date (date)
- `[].paymentHistory[].dateSent`: Date Sent (date)
- `[].paymentHistory[].dateDue`: Date Due (date)
- `[].paymentHistory[].amount`: Amount (number)
- `[].paymentHistory[].amountDue`: Amount Due (number)
- `[].paymentHistory[].currency`: Currency
- `[].paymentHistory[].description`: Description
- `[].paymentHistory[].itemType`: Item Type

### `moxie_list_pipeline_stages`

**List Pipeline Stages.** Returns the Moxie pipeline stages, each with its id, label, colour and stage type (New, InProgress, OnHold, ClosedWon, ClosedLost or Complete). Use to get the stage label for Create Opportunity or the stage id for Update Opportunity. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Stage ID
- `[].label`: Label
- `[].hexColor`: Colour
- `[].stageType`: Stage Type

### `moxie_list_workspace_users`

**List Workspace Users.** Returns the users in the Moxie workspace with their user type, contact details and project and feature access. Use to resolve the email address of an assignee before creating a task. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].userType`: User Type
- `[].user`: User
- `[].user.userId`: User ID (number)
- `[].user.firstName`: First Name
- `[].user.lastName`: Last Name
- `[].user.email`: Email (email)
- `[].user.phone`: Phone
- `[].user.phoneVerified`: Phone Verified (boolean)
- `[].user.profilePicture`: Profile Picture (image)
- `[].user.uuid`: UUID

### `moxie_list_invoice_templates`

**List Invoice Templates.** Returns the names of the invoice templates configured in the Moxie workspace. Use to pick a valid template name before creating an invoice. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `moxie_add_ticket_comment`

**Add Ticket Comment.** Adds a comment to a Moxie ticket identified by its ticket number, as public reply or private internal note. Needs the email of a workspace user or client contact as author, and only works on tickets that belong to a client. Use to post an update or answer on an existing ticket; ticket numbers come from Search Tickets, List Tickets or Create Ticket. Not idempotent: each call adds another comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketNumber` | number | yes |  | Ticket Number. The ticket number (not the id), from Search Tickets or Create Ticket. |
| `comment` | string | yes |  | Comment. |
| `userEmail` | string | yes |  | Author Email. Email of the workspace user or client contact posting the comment. |
| `privateComment` | boolean | no | `false` | Private Note. On keeps the comment internal; off (default) shows it to the client. |

Output fields:

- `ticket`: Ticket
- `ticket.id`: Ticket ID
- `ticket.ticketNumber`: Ticket Number (number)
- `ticket.subject`: Subject
- `ticket.type`: Ticket Type
- `ticket.status`: Status
- `ticket.open`: Open (boolean)
- `ticket.archived`: Archived (boolean)
- `ticket.unread`: Unread (boolean)
- `ticket.dueDate`: Due Date (date)
- `ticket.summary`: Summary
- `ticket.lastComment`: Last Comment
- `ticket.created`: Created (datetime)
- `ticket.updated`: Updated (datetime)
- `ticket.closed`: Closed (datetime)
- `ticket.clientId`: Client ID
- `ticket.assignedTo`: Assigned User IDs
- `ticket.ccList`: CC List
- `ticket.client`: Client
- `ticket.client.id`: ID
- `ticket.client.name`: Name
- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].commentUserName`: Author
- `comments[].commentUserEmail`: Author Email (email)
- `comments[].comment`: Comment
- `comments[].commentType`: Visibility
- `comments[].created`: Created (datetime)

### `moxie_apply_payment`

**Record Payment.** Records a payment on an open Moxie invoice picked by client and invoice; with a Reference Number a repeat run returns the invoice with already_applied true while it is still open (best-effort: two runs at the same moment can both record it), and fails with not-found once it is fully paid, instead of paying twice. For agents use moxie_payment_create. Not idempotent without a Reference Number. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientName` | string | yes |  | Client. The client, matched by its exact name. A value the product loads from the provider, such as an id; write the value itself. |
| `invoiceNumber` | string | yes |  | Invoice. An open (sent, not fully paid) invoice of the selected client. A value the product loads from the provider, such as an id; write the value itself. |
| `amount` | number | yes |  | Amount. |
| `date` | string | no |  | Payment Date. Date in YYYY-MM-DD format. |
| `paymentType` | string | no |  | Payment Method. One of `"STRIPE"`, `"CHECK"`, `"BANK_TRANSFER"`, `"CASH"`, `"VENMO"`, `"PAYPAL"`, `"ZELLE"`, `"APP_PAYOUT"`, `"CREDIT_CARD"`, `"OTHER"`. |
| `referenceNumber` | string | no |  | Reference Number. External payment reference, such as a bank or Stripe id. A repeat run with the same reference is skipped. |
| `memo` | string | no |  | Memo. Free-text note on the payment. |

Output fields:

- `id`: Invoice ID
- `invoiceNumber`: Invoice Number (number)
- `invoiceNumberFormatted`: Invoice Number Formatted
- `description`: Description
- `clientId`: Client ID
- `status`: Status
- `invoiceType`: Invoice Type
- `dateCreated`: Date Created (date)
- `dateSent`: Date Sent (date)
- `dateDue`: Date Due (date)
- `datePaid`: Date Paid (date)
- `currency`: Currency
- `subTotal`: Subtotal (currency)
- `discountAmount`: Discount Amount (currency)
- `tax`: Tax (currency)
- `taxPercentage`: Tax Percentage (number)
- `total`: Total (currency)
- `paymentTotal`: Payment Total (currency)
- `amountDue`: Amount Due (currency)
- `viewOnlineUrl`: View Online URL (url)
- `clientInfo`: Client
- `clientInfo.id`: Client ID
- `clientInfo.name`: Name
- `clientInfo.taxId`: Tax ID
- `payments`: Payments
- `payments[].id`: Payment ID
- `payments[].amount`: Amount (currency)
- `payments[].currency`: Currency
- `payments[].datePaid`: Date Paid (date)
- `payments[].paidBy`: Paid By
- `payments[].paymentProvider`: Payment Method
- `payments[].referenceNumber`: Reference Number
- `payments[].memo`: Memo
- `payments[].pending`: Pending (boolean)
- `lineItems`: Line Items
- `lineItems[].description`: Description
- `lineItems[].quantity`: Quantity (number)
- `lineItems[].unitPrice`: Unit Price (currency)
- `lineItems[].unit`: Unit
- `lineItems[].taxable`: Taxable (boolean)
- `lineItems[].lineTotal`: Line Total (currency)
- `lineItems[].type`: Type
- `lineItems[].projectName`: Project Name
- `taxBreakdown`: Tax Breakdown
- `taxBreakdown[].name`: Tax Name
- `taxBreakdown[].rate`: Rate (number)
- `taxBreakdown[].taxableAmount`: Taxable Amount (currency)
- `taxBreakdown[].amount`: Amount (currency)
- `already_applied`: Already Applied (boolean)

### `moxie_approve_task`

**Approve Task.** Approves a task (deliverable) waiting for client approval, identified by exact client, project and task names, as if the client signed it off in the portal. Use when the approval arrives outside Moxie, for example by email. Not marked idempotent: a repeat call on an approved task may be rejected. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientName` | string | yes |  | Client Name. Exact client name, from Search Clients. |
| `projectName` | string | yes |  | Project Name. Exact project name, from Search Projects. |
| `taskName` | string | yes |  | Task Name. Exact task name, from Search Tasks or List Tasks. |

Output fields:

- `id`: Task ID
- `name`: Name
- `clientId`: Client ID
- `projectId`: Project ID
- `projectTypeId`: Project Type ID
- `statusId`: Status ID
- `status`: Status
- `description`: Description
- `descriptionFormat`: Description Format
- `priority`: Priority (number)
- `taskPriority`: Priority Label
- `startDate`: Start Date (date)
- `dueDate`: Due Date (date)
- `created`: Created (datetime)
- `completed`: Completed (datetime)
- `archived`: Archived (boolean)
- `approvalRequired`: Approval Required (boolean)
- `isSubTask`: Is Subtask (boolean)
- `parentTaskId`: Parent Task ID
- `subTaskSort`: Subtask Sort (number)
- `kanbanSort`: Kanban Sort (number)
- `ticketId`: Ticket ID
- `product`: Product
- `quantity`: Quantity (number)
- `invoiceId`: Invoice ID
- `invoiceNumber`: Invoice Number
- `assignedTo`: Assigned To
- `assignedToList`: Assigned User IDs
- `project`: Project
- `project.id`: Project ID
- `project.name`: Name
- `project.clientId`: Client ID
- `project.projectTypeId`: Project Type ID
- `project.active`: Active (boolean)
- `project.hexColor`: Colour
- `client`: Client
- `client.id`: Client ID
- `client.name`: Name
- `client.initials`: Initials
- `client.logo`: Logo (image)
- `client.color`: Colour
- `events`: Events
- `events[].user`: User
- `events[].events`: Events
- `events[].clientEvent`: Client Event (boolean)
- `events[].timestamp`: Timestamp (datetime)
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type
- `tasks`: Subtasks
- `tasks[].id`: Subtask ID
- `tasks[].description`: Description
- `tasks[].complete`: Complete (boolean)

### `moxie_attach_file_from_url`

**Attach File from URL.** Makes Moxie download a file from a public https URL and attach it to a client, project, task, opportunity, expense or ticket by id. Use to file a document, receipt or design that already lives online; the URL must be reachable by Moxie without credentials. Not idempotent: each call adds another copy of the file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes |  | Attach To. One of `"CLIENT"`, `"PROJECT"`, `"DELIVERABLE"`, `"OPPORTUNITY"`, `"EXPENSE"`, `"TICKET"`. |
| `objectId` | string | yes |  | Record ID. Id of the client, project, task, opportunity, expense or ticket to attach the file to. |
| `fileUrl` | string | yes |  | File URL. Public https URL of the file. |
| `fileName` | string | yes |  | File Name. Name to store the file under, including its extension. |

Output fields:

- `url`: File URL (url)
- `objectType`: Attached To Type
- `objectId`: Attached To ID
- `fileName`: File Name

### `moxie_create_expense`

**Create Expense.** Records a Moxie expense with vendor and client picked from lists. For agents use moxie_expense_create. Not idempotent: each run records another expense. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `amount` | number | yes |  | Amount. |
| `vendor` | string | no |  | Vendor. A value the product loads from the provider, such as an id; write the value itself. |
| `clientName` | string | no |  | Client. Client to bill the expense to. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | ISO date-time string | no |  | Expense Date. |
| `category` | string | no |  | Category. |
| `currency` | string | no |  | Currency. Three-letter ISO 4217 code, for example USD. |
| `paid` | string | no |  | Paid. Leave empty to not send this value (an update keeps the current one). One of `"yes"`, `"no"`. |
| `reimbursable` | string | no |  | Billable to Client. Yes marks the expense as reimbursable, so it can be billed to the client. One of `"yes"`, `"no"`. |
| `markupPercentage` | number | no |  | Markup Percentage. |
| `billNo` | string | no |  | Bill or Receipt Number. |
| `description` | string | no |  | Description. |
| `notes` | string | no |  | Notes. |

Output fields:

- `id`: Expense ID
- `amount`: Amount (currency)
- `tax`: Tax (currency)
- `taxRate`: Tax Rate (number)
- `total`: Total (currency)
- `totalWithMarkup`: Total With Markup (currency)
- `markupPercent`: Markup Percentage (number)
- `currency`: Currency
- `category`: Category
- `billNo`: Bill Number
- `description`: Description
- `notes`: Notes
- `paid`: Paid (boolean)
- `paidDate`: Paid Date (date)
- `dueDate`: Due Date (date)
- `reimbursable`: Billable to Client (boolean)
- `dateCreated`: Created (datetime)
- `invoiceId`: Invoice ID
- `invoiceNumber`: Invoice Number
- `vendor`: Vendor
- `vendor.id`: ID
- `vendor.name`: Name
- `client`: Client
- `client.id`: ID
- `client.name`: Name
- `project`: Project
- `project.id`: ID
- `project.name`: Name

### `moxie_create_form_submission`

**Submit Lead Form.** Submits a Moxie lead or discovery form by exact form name with the lead contact details and answers, which creates a pipeline lead the same way a website submission does. Use to push leads from other forms or tools into the Moxie pipeline; form names come from List Form Names. Not idempotent: each call creates another submission and lead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formName` | string | yes |  | Form Name. Exact form name, from List Form Names. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `role` | string | no |  | Role. |
| `businessName` | string | no |  | Business Name. |
| `website` | string | no |  | Website. |
| `address1` | string | no |  | Address Line 1. |
| `address2` | string | no |  | Address Line 2. |
| `city` | string | no |  | City. |
| `locality` | string | no |  | State or Region. |
| `postal` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. |
| `taxId` | string | no |  | Tax ID. |
| `sourceUrl` | string | no |  | Source URL. |
| `leadSource` | string | no |  | Lead Source. |
| `pipelineStageName` | string | no |  | Pipeline Stage. Exact stage label to place the lead in (see List Pipeline Stages). |
| `notes` | string | no |  | Notes. |
| `answers` | array | no |  | Answers. Question and answer pairs to store on the submission. Each item: { `question`, `answer`? }. |

Output fields:

- `id`: Submission ID
- `formName`: Form Name
- `clientId`: Client ID
- `opportunityId`: Opportunity ID
- `submittedAt`: Submitted At (datetime)
- `summary`: Summary
- `notes`: Notes
- `formData`: Lead Details
- `formData.firstName`: First Name
- `formData.lastName`: Last Name
- `formData.email`: Email (email)
- `formData.phone`: Phone
- `formData.businessName`: Business Name
- `formData.website`: Website (url)
- `formData.leadSource`: Lead Source

### `moxie_create_invoice`

**Create Invoice.** Creates a Moxie invoice with client, template and email template picked from lists, as a draft unless Send Invoice is on. For agents use moxie_invoice_create. Not idempotent: each run creates another invoice and, when sending, emails the client. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientName` | string | yes |  | Client. The client to bill. A value the product loads from the provider, such as an id; write the value itself. |
| `templateName` | string | no |  | Invoice Template. Leave empty for the default template. A value the product loads from the provider, such as an id; write the value itself. |
| `items` | array | yes |  | Line Items. Each item: { `description`, `quantity`, `rate`, `taxable`?, `projectName`? }. |
| `dueDate` | string | no |  | Due Date. Date in YYYY-MM-DD format. |
| `taxRate` | number | no |  | Tax Rate. Flat tax rate percentage applied to taxable items. |
| `discountPercent` | number | no |  | Discount Percentage. |
| `paymentInstructions` | string | no |  | Payment Instructions. |
| `description` | string | no |  | Description. |
| `invoiceNumber` | string | no |  | Invoice Number. Leave empty to use the next number in the sequence. |
| `send` | boolean | no | `false` | Send Invoice. Off (default) keeps the invoice as a draft. On emails it to the contacts below. |
| `sendToContacts` | array | no |  | Send To Contacts. Contacts of the selected client who receive the invoice email. Used only when Send Invoice is on. Values the product loads from the provider, such as ids; write an array of them. |
| `emailTemplateName` | string | no |  | Email Template. Email used to send the invoice. Only used when Send Invoice is on. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Invoice ID
- `invoiceNumber`: Invoice Number (number)
- `invoiceNumberFormatted`: Invoice Number Formatted
- `description`: Description
- `clientId`: Client ID
- `status`: Status
- `invoiceType`: Invoice Type
- `dateCreated`: Date Created (date)
- `dateSent`: Date Sent (date)
- `dateDue`: Date Due (date)
- `datePaid`: Date Paid (date)
- `currency`: Currency
- `subTotal`: Subtotal (currency)
- `discountAmount`: Discount Amount (currency)
- `tax`: Tax (currency)
- `taxPercentage`: Tax Percentage (number)
- `total`: Total (currency)
- `paymentTotal`: Payment Total (currency)
- `amountDue`: Amount Due (currency)
- `viewOnlineUrl`: View Online URL (url)
- `clientInfo`: Client
- `clientInfo.id`: Client ID
- `clientInfo.name`: Name
- `clientInfo.taxId`: Tax ID
- `payments`: Payments
- `payments[].id`: Payment ID
- `payments[].amount`: Amount (currency)
- `payments[].currency`: Currency
- `payments[].datePaid`: Date Paid (date)
- `payments[].paidBy`: Paid By
- `payments[].paymentProvider`: Payment Method
- `payments[].referenceNumber`: Reference Number
- `payments[].memo`: Memo
- `payments[].pending`: Pending (boolean)
- `lineItems`: Line Items
- `lineItems[].description`: Description
- `lineItems[].quantity`: Quantity (number)
- `lineItems[].unitPrice`: Unit Price (currency)
- `lineItems[].unit`: Unit
- `lineItems[].taxable`: Taxable (boolean)
- `lineItems[].lineTotal`: Line Total (currency)
- `lineItems[].type`: Type
- `lineItems[].projectName`: Project Name
- `taxBreakdown`: Tax Breakdown
- `taxBreakdown[].name`: Tax Name
- `taxBreakdown[].rate`: Rate (number)
- `taxBreakdown[].taxableAmount`: Taxable Amount (currency)
- `taxBreakdown[].amount`: Amount (currency)

### `moxie_create_opportunity`

**Create Opportunity.** Creates a Moxie pipeline opportunity with client and stage picked from lists. For agents use moxie_opportunity_create. Not idempotent: each run creates another opportunity. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Opportunity Name. Name of the deal. |
| `clientName` | string | no |  | Client. The client this deal is for. Leave empty for none. A value the product loads from the provider, such as an id; write the value itself. |
| `stageName` | string | no |  | Pipeline Stage. Leave empty for the default stage. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. |
| `value` | number | no |  | Estimated Value. |
| `estCloseDate` | string | no |  | Estimated Close Date. Date in YYYY-MM-DD format. |
| `customValues` | object | no |  | Custom Values. Custom opportunity field values keyed by field name. |

Output fields:

- `id`: Opportunity ID
- `name`: Name
- `description`: Description
- `clientId`: Client ID
- `statusId`: Stage ID
- `statusLabel`: Stage
- `value`: Value (number)
- `sentiment`: Sentiment (number)
- `timePeriod`: Time Period
- `periods`: Periods (number)
- `estCloseDate`: Estimated Close Date (date)
- `actualCloseDate`: Actual Close Date (date)
- `wonOn`: Won On (date)
- `archive`: Archived (boolean)
- `kanbanSort`: Kanban Sort (number)
- `created`: Created (datetime)
- `formData`: Lead Details
- `formData.firstName`: First Name
- `formData.lastName`: Last Name
- `formData.email`: Email (email)
- `formData.phone`: Phone
- `formData.role`: Role
- `formData.businessName`: Business Name
- `formData.website`: Website (url)
- `formData.address1`: Address Line 1
- `formData.address2`: Address Line 2
- `formData.city`: City
- `formData.locality`: State or Region
- `formData.postal`: Postal Code
- `formData.country`: Country
- `formData.sourceUrl`: Source URL (url)
- `formData.leadSource`: Lead Source
- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].author`: Author
- `comments[].comment`: Comment
- `comments[].clientComment`: Client Comment (boolean)
- `comments[].privateComment`: Private Comment (boolean)
- `comments[].edited`: Edited (boolean)
- `comments[].timestamp`: Timestamp (datetime)
- `workflow`: Workflow
- `workflow[].id`: Item ID
- `workflow[].itemId`: Referenced ID
- `workflow[].itemType`: Item Type
- `workflow[].timestamp`: Timestamp (datetime)
- `client`: Client
- `client.id`: ID
- `client.name`: Name
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type
- `toDos`: To-dos
- `toDos[].id`: To-do ID
- `toDos[].item`: Item
- `toDos[].complete`: Complete (boolean)
- `toDos[].dueDate`: Due Date (date)

### `moxie_create_or_update_calendar_event`

**Create or Update Calendar Event.** Creates a Moxie calendar event when Event ID is empty (Start Time and End Time required), or updates the event with that id; when updating, pass every field the event should keep. Use to block time or mirror meetings from another calendar. Not idempotent in create mode: each call without an Event ID creates another event. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventId` | string | no |  | Event ID. Id of an existing event to update. Leave empty to create a new event. |
| `startTime` | string | no |  | Start Time. ISO 8601 start, for example 2026-10-01T09:00:00Z. Required when creating. |
| `endTime` | string | no |  | End Time. ISO 8601 end, after the start. Required when creating. |
| `timezone` | string | no |  | Time Zone. IANA time zone, for example America/New_York. |
| `fullDay` | string | no |  | All Day. Leave empty to not send this value (an update keeps the current one). One of `"yes"`, `"no"`. |
| `busy` | string | no |  | Show as Busy. Leave empty to not send this value (an update keeps the current one). One of `"yes"`, `"no"`. |
| `summary` | string | no |  | Title. |
| `description` | string | no |  | Description. |
| `location` | string | no |  | Location. |
| `userEmail` | string | no |  | Owner Email. Email of the workspace user who owns the event (see List Workspace Users). |

Output fields:

- `id`: Event ID
- `summary`: Title
- `description`: Description
- `location`: Location
- `startDate`: Start Date (date)
- `startTime`: Start Time
- `endDate`: End Date (date)
- `endTime`: End Time
- `timezone`: Time Zone
- `dateOnly`: All Day (boolean)
- `busyEvent`: Busy (boolean)
- `userId`: Owner User ID (number)

### `moxie_create_ticket`

**Create Ticket.** Opens a Moxie support ticket with a subject, first comment, ticket type label and due date, on behalf of the workspace user or client contact with the given email. Use to log a client request that arrived outside the client portal. Not idempotent: each call opens another ticket. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | yes |  | Subject. Short summary of the request. |
| `comment` | string | no |  | Comment. The first message on the ticket. |
| `userEmail` | string | no |  | Requester Email. Email of the client contact or workspace user who raised the ticket. |
| `ticketType` | string | no |  | Ticket Type. Ticket type label as configured in Moxie, for example Support. |
| `dueDate` | string | no |  | Due Date. Date in YYYY-MM-DD format. |

Output fields:

- `ticket`: Ticket
- `ticket.id`: Ticket ID
- `ticket.ticketNumber`: Ticket Number (number)
- `ticket.subject`: Subject
- `ticket.type`: Ticket Type
- `ticket.status`: Status
- `ticket.open`: Open (boolean)
- `ticket.archived`: Archived (boolean)
- `ticket.unread`: Unread (boolean)
- `ticket.dueDate`: Due Date (date)
- `ticket.summary`: Summary
- `ticket.lastComment`: Last Comment
- `ticket.created`: Created (datetime)
- `ticket.updated`: Updated (datetime)
- `ticket.closed`: Closed (datetime)
- `ticket.clientId`: Client ID
- `ticket.assignedTo`: Assigned User IDs
- `ticket.ccList`: CC List
- `ticket.client`: Client
- `ticket.client.id`: ID
- `ticket.client.name`: Name
- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].commentUserName`: Author
- `comments[].commentUserEmail`: Author Email (email)
- `comments[].comment`: Comment
- `comments[].commentType`: Visibility
- `comments[].created`: Created (datetime)

### `moxie_create_time_entry`

**Log Time.** Logs a Moxie time entry with client, project, task and user picked from lists. For agents use moxie_time_entry_create. Not idempotent: each run logs another entry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `timerStart` | ISO date-time string | yes |  | Start Time. |
| `timerEnd` | ISO date-time string | yes |  | End Time. |
| `clientName` | string | no |  | Client. The client, matched by its exact name. A value the product loads from the provider, such as an id; write the value itself. |
| `projectName` | string | no |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `deliverableName` | string | no |  | Task. The task, matched by its exact name. A value the product loads from the provider, such as an id; write the value itself. |
| `userEmail` | string | no |  | User. The workspace user the time is logged for. A value the product loads from the provider, such as an id; write the value itself. |
| `notes` | string | no |  | Notes. |

Output fields:

- `id`: Time Entry ID
- `userId`: User ID (number)
- `userFullName`: User Full Name
- `timerStart`: Timer Start (datetime)
- `timerEnd`: Timer End (datetime)
- `pausedAt`: Paused At (datetime)
- `pausedSeconds`: Paused Seconds (number)
- `duration`: Duration (duration)
- `wasRounded`: Was Rounded (boolean)
- `billable`: Billable (boolean)
- `notes`: Notes
- `clientId`: Client ID
- `clientName`: Client Name
- `projectId`: Project ID
- `projectName`: Project Name
- `deliverableId`: Task ID
- `deliverableName`: Task Name
- `ticketId`: Ticket ID
- `ticketName`: Ticket Name
- `invoiceId`: Invoice ID
- `invoiceNumber`: Invoice Number
- `timestamp`: Timestamp (datetime)
- `timestampUpdated`: Timestamp Updated (datetime)

### `moxie_delete_calendar_event`

**Delete Calendar Event.** Permanently deletes a Moxie calendar event by its id. Use to remove an event that was cancelled elsewhere. Not idempotent: a second call for the same id fails with a not-found error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventId` | string | yes |  | Event ID. Id of the event, from Create or Update Calendar Event. |

Output fields:

- `id`: Event ID
- `deleted`: Deleted (boolean)

### `moxie_get_email_template`

**Get Email Template.** Returns the subject and raw HTML content of a Moxie email template by id; merge tokens are returned as written, not filled in. Use to reuse Moxie email wording in another tool. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. Template id, from List Email Templates. |

Output fields:

- `id`: Template ID
- `name`: Name
- `subject`: Subject
- `htmlContent`: HTML Content (html)

### `moxie_get_workspace_account`

**Get Workspace Account.** Returns the workspace business identity from Moxie: account name, address, tax id and label, and currency (never bank or payment details). Use when another system needs the supplier details printed on invoices. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `accountId`: Account ID (number)
- `accountName`: Account Name
- `address1`: Address Line 1
- `address2`: Address Line 2
- `city`: City
- `locality`: State or Region
- `postal`: Postal Code
- `country`: Country
- `taxId`: Tax ID
- `taxLabel`: Tax Label
- `currency`: Currency

### `moxie_list_email_templates`

**List Email Templates.** Returns the id and name of every email template in the Moxie workspace. Use to pick a template name for sending an invoice, or an id for Get Email Template. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: ID
- `[].name`: Name

### `moxie_list_form_names`

**List Form Names.** Returns the names of the lead and discovery forms in the Moxie workspace. Use to pick a valid form name before Submit Lead Form. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].name`: Name

### `moxie_list_project_types`

**List Project Types.** Returns the Moxie project types with their task stages and the custom project and task fields each defines. Use to find the stage ids of a specific project type before moving tasks. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Project Type ID
- `[].name`: Name
- `[].isDefaultProjectType`: Default (boolean)
- `[].created`: Created (datetime)
- `[].statusList`: Task Stages
- `[].statusList[].id`: Stage ID
- `[].statusList[].label`: Label
- `[].statusList[].hexColor`: Colour
- `[].statusList[].complete`: Marks Complete (boolean)
- `[].statusList[].clientApproval`: Needs Client Approval (boolean)
- `[].projectFields`: Project Fields
- `[].projectFields[].id`: Field ID
- `[].projectFields[].name`: Name
- `[].projectFields[].mappingKey`: Mapping Key
- `[].projectFields[].type`: Type
- `[].deliverableFields`: Task Fields
- `[].deliverableFields[].id`: Field ID
- `[].deliverableFields[].name`: Name
- `[].deliverableFields[].mappingKey`: Mapping Key
- `[].deliverableFields[].type`: Type

### `moxie_list_task_stages`

**List Task Stages.** Returns the task stages (kanban columns) of a project type, or of the default project type when no id is given, with their id, label and completion and approval flags. Use to get a stage label for Create Task or a stage id for Update Task and List Tasks. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectTypeId` | string | no |  | Project Type ID. Project type id, from List Project Types or a project record. Leave empty for the default project type. |

Output fields:

- `[].id`: Stage ID
- `[].label`: Label
- `[].hexColor`: Colour
- `[].complete`: Marks Complete (boolean)
- `[].clientApproval`: Needs Client Approval (boolean)

### `moxie_list_tasks`

**List Tasks.** Lists Moxie tasks filtered by any mix of project id, client id, stage id and archived state; with no filters it returns every active task (archived ones only when Archived is Yes). Use to review the work on a project or find tasks in a given stage; use Search Tasks to match by name. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | no |  | Project ID. Only tasks of this project, from Search Projects. |
| `clientId` | string | no |  | Client ID. Only tasks of this client, from Search Clients. |
| `statusId` | string | no |  | Stage ID. Only tasks in this stage, from List Task Stages. |
| `archived` | string | no |  | Archived. Yes returns only archived tasks. No or empty returns active ones (the Moxie default). One of `"yes"`, `"no"`. |

Output fields:

- `[].id`: Task ID
- `[].name`: Name
- `[].clientId`: Client ID
- `[].projectId`: Project ID
- `[].projectTypeId`: Project Type ID
- `[].statusId`: Status ID
- `[].status`: Status
- `[].description`: Description
- `[].descriptionFormat`: Description Format
- `[].priority`: Priority (number)
- `[].taskPriority`: Priority Label
- `[].startDate`: Start Date (date)
- `[].dueDate`: Due Date (date)
- `[].created`: Created (datetime)
- `[].completed`: Completed (datetime)
- `[].archived`: Archived (boolean)
- `[].approvalRequired`: Approval Required (boolean)
- `[].isSubTask`: Is Subtask (boolean)
- `[].parentTaskId`: Parent Task ID
- `[].subTaskSort`: Subtask Sort (number)
- `[].kanbanSort`: Kanban Sort (number)
- `[].ticketId`: Ticket ID
- `[].product`: Product
- `[].quantity`: Quantity (number)
- `[].invoiceId`: Invoice ID
- `[].invoiceNumber`: Invoice Number
- `[].assignedTo`: Assigned To
- `[].assignedToList`: Assigned User IDs
- `[].project`: Project
- `[].project.id`: Project ID
- `[].project.name`: Name
- `[].project.clientId`: Client ID
- `[].project.projectTypeId`: Project Type ID
- `[].project.active`: Active (boolean)
- `[].project.hexColor`: Colour
- `[].client`: Client
- `[].client.id`: Client ID
- `[].client.name`: Name
- `[].client.initials`: Initials
- `[].client.logo`: Logo (image)
- `[].client.color`: Colour
- `[].events`: Events
- `[].events[].user`: User
- `[].events[].events`: Events
- `[].events[].clientEvent`: Client Event (boolean)
- `[].events[].timestamp`: Timestamp (datetime)
- `[].customValues`: Custom Values
- `[].customValues[].fieldId`: Field ID
- `[].customValues[].mappingKey`: Mapping Key
- `[].customValues[].fieldName`: Field Name
- `[].customValues[].value`: Value
- `[].customValues[].type`: Field Type
- `[].tasks`: Subtasks
- `[].tasks[].id`: Subtask ID
- `[].tasks[].description`: Description
- `[].tasks[].complete`: Complete (boolean)

### `moxie_list_tickets`

**List Tickets.** Lists Moxie tickets filtered by any mix of client id, open state and archived state; with no filters it returns every active ticket (archived ones only when Archived is Yes). Use to review open requests for a client or build a support report; use Search Tickets to match by text. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | no |  | Client ID. Only tickets of this client, from Search Clients. |
| `open` | string | no |  | Open. Yes returns only open tickets, No only closed ones. Leave empty for both. One of `"yes"`, `"no"`. |
| `archived` | string | no |  | Archived. Yes returns only archived tickets. No or empty returns active ones (the Moxie default). One of `"yes"`, `"no"`. |

Output fields:

- `[].id`: Ticket ID
- `[].ticketNumber`: Ticket Number (number)
- `[].subject`: Subject
- `[].type`: Ticket Type
- `[].status`: Status
- `[].open`: Open (boolean)
- `[].archived`: Archived (boolean)
- `[].unread`: Unread (boolean)
- `[].dueDate`: Due Date (date)
- `[].summary`: Summary
- `[].lastComment`: Last Comment
- `[].created`: Created (datetime)
- `[].updated`: Updated (datetime)
- `[].closed`: Closed (datetime)
- `[].clientId`: Client ID
- `[].assignedTo`: Assigned User IDs
- `[].ccList`: CC List
- `[].client`: Client
- `[].client.id`: ID
- `[].client.name`: Name

### `moxie_list_vendors`

**List Vendors.** Returns the names of the vendors in the Moxie workspace. Use to pick a valid vendor name before creating an expense. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].name`: Name

### `moxie_search_agreements`

**Search Agreements.** Lists Moxie agreements (contracts) with their status and signatures: every one, those of a client id, or the one agreement with an exact Agreement ID. Use to check whether a client has signed before starting work or invoicing. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | no |  | Client ID. Only agreements of this client, from Search Clients. |
| `id` | string | no |  | Agreement ID. Exact agreement id. When set, the client id is ignored. |

Output fields:

- `[].id`: Agreement ID
- `[].name`: Name
- `[].status`: Status
- `[].statusTime`: Status Changed (datetime)
- `[].currency`: Currency
- `[].dateCreated`: Created (datetime)
- `[].dateCompleted`: Completed (datetime)
- `[].fullyExecuted`: Fully Executed (boolean)
- `[].userSigned`: Signed by You (boolean)
- `[].clientSigned`: Signed by Client (boolean)
- `[].client`: Client
- `[].client.id`: ID
- `[].client.name`: Name

### `moxie_search_payable_invoices`

**Search Open Invoices.** Lists outstanding (sent and not fully paid) Moxie invoices with totals, payments and line items: every one, those of the client whose exact name is given (an unknown name returns an empty list), or the one invoice with an exact Invoice ID. Use to find an invoice number before recording a payment or chasing a balance. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientName` | string | no |  | Client Name. Exact client name. Leave empty to list the open invoices of every client. |
| `id` | string | no |  | Invoice ID. Exact invoice id. When set, the client name is ignored. |

Output fields:

- `[].id`: Invoice ID
- `[].invoiceNumber`: Invoice Number (number)
- `[].invoiceNumberFormatted`: Invoice Number Formatted
- `[].description`: Description
- `[].clientId`: Client ID
- `[].status`: Status
- `[].invoiceType`: Invoice Type
- `[].dateCreated`: Date Created (date)
- `[].dateSent`: Date Sent (date)
- `[].dateDue`: Date Due (date)
- `[].datePaid`: Date Paid (date)
- `[].currency`: Currency
- `[].subTotal`: Subtotal (currency)
- `[].discountAmount`: Discount Amount (currency)
- `[].tax`: Tax (currency)
- `[].taxPercentage`: Tax Percentage (number)
- `[].total`: Total (currency)
- `[].paymentTotal`: Payment Total (currency)
- `[].amountDue`: Amount Due (currency)
- `[].viewOnlineUrl`: View Online URL (url)
- `[].clientInfo`: Client
- `[].clientInfo.id`: Client ID
- `[].clientInfo.name`: Name
- `[].clientInfo.taxId`: Tax ID
- `[].payments`: Payments
- `[].payments[].id`: Payment ID
- `[].payments[].amount`: Amount (currency)
- `[].payments[].currency`: Currency
- `[].payments[].datePaid`: Date Paid (date)
- `[].payments[].paidBy`: Paid By
- `[].payments[].paymentProvider`: Payment Method
- `[].payments[].referenceNumber`: Reference Number
- `[].payments[].memo`: Memo
- `[].payments[].pending`: Pending (boolean)
- `[].lineItems`: Line Items
- `[].lineItems[].description`: Description
- `[].lineItems[].quantity`: Quantity (number)
- `[].lineItems[].unitPrice`: Unit Price (currency)
- `[].lineItems[].unit`: Unit
- `[].lineItems[].taxable`: Taxable (boolean)
- `[].lineItems[].lineTotal`: Line Total (currency)
- `[].lineItems[].type`: Type
- `[].lineItems[].projectName`: Project Name
- `[].taxBreakdown`: Tax Breakdown
- `[].taxBreakdown[].name`: Tax Name
- `[].taxBreakdown[].rate`: Rate (number)
- `[].taxBreakdown[].taxableAmount`: Taxable Amount (currency)
- `[].taxBreakdown[].amount`: Amount (currency)

### `moxie_search_tasks`

**Search Tasks.** Searches Moxie tasks whose name or description contains the query (case-insensitive), or returns the one task with an exact Task ID. Use to find a task id before updating or approving it; use List Tasks to filter by project, client or stage instead. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Query. Text to match in the task name or description. |
| `id` | string | no |  | Task ID. Exact task id. When set, the query is ignored. |

Output fields:

- `[].id`: Task ID
- `[].name`: Name
- `[].clientId`: Client ID
- `[].projectId`: Project ID
- `[].projectTypeId`: Project Type ID
- `[].statusId`: Status ID
- `[].status`: Status
- `[].description`: Description
- `[].descriptionFormat`: Description Format
- `[].priority`: Priority (number)
- `[].taskPriority`: Priority Label
- `[].startDate`: Start Date (date)
- `[].dueDate`: Due Date (date)
- `[].created`: Created (datetime)
- `[].completed`: Completed (datetime)
- `[].archived`: Archived (boolean)
- `[].approvalRequired`: Approval Required (boolean)
- `[].isSubTask`: Is Subtask (boolean)
- `[].parentTaskId`: Parent Task ID
- `[].subTaskSort`: Subtask Sort (number)
- `[].kanbanSort`: Kanban Sort (number)
- `[].ticketId`: Ticket ID
- `[].product`: Product
- `[].quantity`: Quantity (number)
- `[].invoiceId`: Invoice ID
- `[].invoiceNumber`: Invoice Number
- `[].assignedTo`: Assigned To
- `[].assignedToList`: Assigned User IDs
- `[].project`: Project
- `[].project.id`: Project ID
- `[].project.name`: Name
- `[].project.clientId`: Client ID
- `[].project.projectTypeId`: Project Type ID
- `[].project.active`: Active (boolean)
- `[].project.hexColor`: Colour
- `[].client`: Client
- `[].client.id`: Client ID
- `[].client.name`: Name
- `[].client.initials`: Initials
- `[].client.logo`: Logo (image)
- `[].client.color`: Colour
- `[].events`: Events
- `[].events[].user`: User
- `[].events[].events`: Events
- `[].events[].clientEvent`: Client Event (boolean)
- `[].events[].timestamp`: Timestamp (datetime)
- `[].customValues`: Custom Values
- `[].customValues[].fieldId`: Field ID
- `[].customValues[].mappingKey`: Mapping Key
- `[].customValues[].fieldName`: Field Name
- `[].customValues[].value`: Value
- `[].customValues[].type`: Field Type
- `[].tasks`: Subtasks
- `[].tasks[].id`: Subtask ID
- `[].tasks[].description`: Description
- `[].tasks[].complete`: Complete (boolean)

### `moxie_search_tickets`

**Search Tickets.** Searches Moxie tickets whose subject, status, summary or number matches the query (case-insensitive), or returns the one ticket with an exact Ticket ID or Ticket Number. Use to find a ticket before commenting on it or changing its status; use List Tickets to filter by client or open state. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Query. Text to match in the subject, status, summary or number. |
| `id` | string | no |  | Ticket ID. Exact ticket id. Overrides the number and the query. |
| `ticketNumber` | number | no |  | Ticket Number. Exact ticket number. Overrides the query. |

Output fields:

- `[].id`: Ticket ID
- `[].ticketNumber`: Ticket Number (number)
- `[].subject`: Subject
- `[].type`: Ticket Type
- `[].status`: Status
- `[].open`: Open (boolean)
- `[].archived`: Archived (boolean)
- `[].unread`: Unread (boolean)
- `[].dueDate`: Due Date (date)
- `[].summary`: Summary
- `[].lastComment`: Last Comment
- `[].created`: Created (datetime)
- `[].updated`: Updated (datetime)
- `[].closed`: Closed (datetime)
- `[].clientId`: Client ID
- `[].assignedTo`: Assigned User IDs
- `[].ccList`: CC List
- `[].client`: Client
- `[].client.id`: ID
- `[].client.name`: Name

### `moxie_update_client`

**Update Client.** Updates fields on a Moxie client picked from a list; only filled fields change. For agents use moxie_client_update, which takes the client id directly. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | yes |  | Client. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `clientType` | string | no |  | Client Type. Client for a paying account, Prospect for a lead. One of `"Client"`, `"Prospect"`. |
| `initials` | string | no |  | Initials. |
| `address1` | string | no |  | Address Line 1. |
| `address2` | string | no |  | Address Line 2. |
| `city` | string | no |  | City. |
| `locality` | string | no |  | State or Region. |
| `postal` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. Two-letter ISO 3166-1 country code, for example US. |
| `website` | string | no |  | Website. |
| `phone` | string | no |  | Phone. |
| `color` | string | no |  | Colour. Hex colour, for example #78909C. |
| `taxId` | string | no |  | Tax ID. |
| `leadSource` | string | no |  | Lead Source. |
| `payInstructions` | string | no |  | Payment Instructions. |
| `hourlyAmount` | number | no |  | Hourly Rate. |
| `roundingIncrement` | number | no |  | Time Rounding Increment. Minutes to round tracked time to. |
| `currency` | string | no |  | Currency. Three-letter ISO 4217 code, for example USD. |
| `notes` | string | no |  | Notes. |
| `archive` | string | no |  | Archived. Yes archives the client, No restores it. Leave empty to keep the current state. One of `"yes"`, `"no"`. |
| `clearFields` | array | no |  | Clear Fields. Fields to blank out on the record. Only text fields can be cleared; dates and numbers keep their value. One of `"initials"`, `"address1"`, `"address2"`, `"city"`, `"locality"`, `"postal"`, `"country"`, `"website"`, `"phone"`, `"taxId"`, `"leadSource"`, `"payInstructions"`, `"notes"`. |

Output fields:

- `id`: Client ID
- `name`: Name
- `clientType`: Client Type
- `initials`: Initials
- `address1`: Address Line 1
- `address2`: Address Line 2
- `city`: City
- `locality`: State or Region
- `postal`: Postal Code
- `country`: Country
- `website`: Website (url)
- `phone`: Phone
- `logo`: Logo (image)
- `color`: Colour
- `taxId`: Tax ID
- `leadSource`: Lead Source
- `archive`: Archived (boolean)
- `hourlyAmount`: Hourly Amount (number)
- `roundingIncrement`: Rounding Increment (number)
- `defaultTaxRate`: Default Tax Rate (number)
- `currency`: Currency
- `payInstructions`: Payment Instructions
- `notes`: Notes
- `stripeClientId`: Stripe Customer ID
- `created`: Created (datetime)
- `lastInvoiceRunDate`: Last Invoice Run Date (date)
- `nextInvoiceRunDate`: Next Invoice Run Date (date)
- `paymentTerms`: Payment Terms
- `paymentTerms.paymentDays`: Payment Days (number)
- `paymentTerms.latePaymentFee`: Late Payment Fee (number)
- `paymentTerms.depositAmount`: Deposit Amount (number)
- `paymentTerms.depositType`: Deposit Type
- `paymentTerms.hourlyAmount`: Hourly Amount (number)
- `paymentTerms.whoPaysCardFees`: Who Pays Card Fees
- `paymentTerms.updatedDate`: Updated Date (datetime)
- `paymentTerms.updatedBy`: Updated By
- `integrationKeys`: Integration Keys
- `integrationKeys.quickbooksId`: QuickBooks ID
- `integrationKeys.xeroId`: Xero ID
- `contacts`: Contacts
- `contacts[].id`: Contact ID
- `contacts[].firstName`: First Name
- `contacts[].lastName`: Last Name
- `contacts[].email`: Email (email)
- `contacts[].phone`: Phone
- `contacts[].mobile`: Mobile
- `contacts[].role`: Role
- `contacts[].clientId`: Client ID
- `contacts[].defaultContact`: Default Contact (boolean)
- `contacts[].invoiceContact`: Invoice Contact (boolean)
- `contacts[].portalAccess`: Portal Access (boolean)
- `contacts[].notes`: Notes
- `contacts[].customValues`: Custom Values
- `contacts[].customValues[].fieldId`: Field ID
- `contacts[].customValues[].mappingKey`: Mapping Key
- `contacts[].customValues[].fieldName`: Field Name
- `contacts[].customValues[].value`: Value
- `contacts[].customValues[].type`: Field Type
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type

### `moxie_update_contact`

**Update Contact.** Updates fields on a Moxie contact picked from a list; only filled fields change. For agents use moxie_contact_update. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `role` | string | no |  | Role. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `mobile` | string | no |  | Mobile. |
| `notes` | string | no |  | Notes. |
| `defaultContact` | string | no |  | Default Contact. Yes makes this the client's primary contact. One of `"yes"`, `"no"`. |
| `invoiceContact` | string | no |  | Invoice Contact. Yes sends invoices for the client to this contact. One of `"yes"`, `"no"`. |
| `portalAccess` | string | no |  | Portal Access. Yes lets this contact sign in to the client portal. One of `"yes"`, `"no"`. |
| `clientId` | string | no |  | Move to Client. Moves the contact to this client. Leave empty to keep the current client. A value the product loads from the provider, such as an id; write the value itself. |
| `clearFields` | array | no |  | Clear Fields. Fields to blank out on the record. Only text fields can be cleared; dates and numbers keep their value. One of `"lastName"`, `"role"`, `"email"`, `"phone"`, `"mobile"`, `"notes"`. |

Output fields:

- `id`: Contact ID
- `firstName`: First Name
- `lastName`: Last Name
- `email`: Email (email)
- `phone`: Phone
- `mobile`: Mobile
- `role`: Role
- `clientId`: Client ID
- `defaultContact`: Default Contact (boolean)
- `invoiceContact`: Invoice Contact (boolean)
- `portalAccess`: Portal Access (boolean)
- `notes`: Notes
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type

### `moxie_update_expense`

**Update Expense.** Updates an existing Moxie expense by id (amount, tax, category, dates, paid and billable flags, client or project); only the fields you pass change and Clear Fields blanks text fields. The expense id comes from Create Expense (Moxie has no expense search). Idempotent: repeating the same update leaves the expense unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `expenseId` | string | yes |  | Expense ID. Id of the expense, from Create Expense. |
| `amount` | number | no |  | Amount. |
| `taxRate` | number | no |  | Tax Rate. Tax rate percentage. |
| `category` | string | no |  | Category. |
| `currency` | string | no |  | Currency. Three-letter ISO 4217 code, for example USD. |
| `paid` | string | no |  | Paid. Leave empty to not send this value (an update keeps the current one). One of `"yes"`, `"no"`. |
| `paidDate` | string | no |  | Paid Date. Date in YYYY-MM-DD format. |
| `dueDate` | string | no |  | Due Date. Date in YYYY-MM-DD format. |
| `reimbursable` | string | no |  | Billable to Client. Leave empty to not send this value (an update keeps the current one). One of `"yes"`, `"no"`. |
| `markupPercent` | number | no |  | Markup Percentage. |
| `billNo` | string | no |  | Bill or Receipt Number. |
| `description` | string | no |  | Description. |
| `notes` | string | no |  | Notes. |
| `clientId` | string | no |  | Client ID. Client to bill the expense to (from Search Clients). |
| `projectId` | string | no |  | Project ID. Project to file the expense under (from Search Projects). |
| `clearFields` | array | no |  | Clear Fields. Fields to blank out on the record. Only text fields can be cleared; dates and numbers keep their value. One of `"category"`, `"billNo"`, `"description"`, `"notes"`. |

Output fields:

- `id`: Expense ID
- `amount`: Amount (currency)
- `tax`: Tax (currency)
- `taxRate`: Tax Rate (number)
- `total`: Total (currency)
- `totalWithMarkup`: Total With Markup (currency)
- `markupPercent`: Markup Percentage (number)
- `currency`: Currency
- `category`: Category
- `billNo`: Bill Number
- `description`: Description
- `notes`: Notes
- `paid`: Paid (boolean)
- `paidDate`: Paid Date (date)
- `dueDate`: Due Date (date)
- `reimbursable`: Billable to Client (boolean)
- `dateCreated`: Created (datetime)
- `invoiceId`: Invoice ID
- `invoiceNumber`: Invoice Number
- `vendor`: Vendor
- `vendor.id`: ID
- `vendor.name`: Name
- `client`: Client
- `client.id`: ID
- `client.name`: Name
- `project`: Project
- `project.id`: ID
- `project.name`: Name

### `moxie_update_opportunity`

**Update Opportunity.** Updates a Moxie opportunity by id with stage and client picked from lists; only filled fields change. For agents use moxie_opportunity_update. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunityId` | string | yes |  | Opportunity ID. Map the id from an opportunity trigger or the Create Opportunity step. |
| `statusId` | string | no |  | Move to Stage. Leave empty to keep the current stage. A value the product loads from the provider, such as an id; write the value itself. |
| `clientId` | string | no |  | Client. Links the deal to this client. Leave empty to keep the current client. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `value` | number | no |  | Estimated Value. |
| `estCloseDate` | string | no |  | Estimated Close Date. Date in YYYY-MM-DD format. |
| `actualCloseDate` | string | no |  | Actual Close Date. Date in YYYY-MM-DD format. |
| `sentiment` | number | no |  | Sentiment. Whole number rating of how the deal is going. |
| `archive` | string | no |  | Archived. Yes archives the opportunity, No restores it. One of `"yes"`, `"no"`. |
| `clearFields` | array | no |  | Clear Fields. Fields to blank out on the record. Only text fields can be cleared; dates and numbers keep their value. One of `"description"`. |

Output fields:

- `id`: Opportunity ID
- `name`: Name
- `description`: Description
- `clientId`: Client ID
- `statusId`: Stage ID
- `statusLabel`: Stage
- `value`: Value (number)
- `sentiment`: Sentiment (number)
- `timePeriod`: Time Period
- `periods`: Periods (number)
- `estCloseDate`: Estimated Close Date (date)
- `actualCloseDate`: Actual Close Date (date)
- `wonOn`: Won On (date)
- `archive`: Archived (boolean)
- `kanbanSort`: Kanban Sort (number)
- `created`: Created (datetime)
- `formData`: Lead Details
- `formData.firstName`: First Name
- `formData.lastName`: Last Name
- `formData.email`: Email (email)
- `formData.phone`: Phone
- `formData.role`: Role
- `formData.businessName`: Business Name
- `formData.website`: Website (url)
- `formData.address1`: Address Line 1
- `formData.address2`: Address Line 2
- `formData.city`: City
- `formData.locality`: State or Region
- `formData.postal`: Postal Code
- `formData.country`: Country
- `formData.sourceUrl`: Source URL (url)
- `formData.leadSource`: Lead Source
- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].author`: Author
- `comments[].comment`: Comment
- `comments[].clientComment`: Client Comment (boolean)
- `comments[].privateComment`: Private Comment (boolean)
- `comments[].edited`: Edited (boolean)
- `comments[].timestamp`: Timestamp (datetime)
- `workflow`: Workflow
- `workflow[].id`: Item ID
- `workflow[].itemId`: Referenced ID
- `workflow[].itemType`: Item Type
- `workflow[].timestamp`: Timestamp (datetime)
- `client`: Client
- `client.id`: ID
- `client.name`: Name
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type
- `toDos`: To-dos
- `toDos[].id`: To-do ID
- `toDos[].item`: Item
- `toDos[].complete`: Complete (boolean)
- `toDos[].dueDate`: Due Date (date)

### `moxie_update_project`

**Update Project.** Updates fields on a Moxie project picked by client and project; only filled fields change. For agents use moxie_project_update. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientName` | string | yes |  | Client. The client, matched by its exact name. A value the product loads from the provider, such as an id; write the value itself. |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `startDate` | string | no |  | Start Date. Date in YYYY-MM-DD format. |
| `dueDate` | string | no |  | Due Date. Date in YYYY-MM-DD format. |
| `active` | string | no |  | Active. No marks the project inactive, Yes reactivates it. One of `"yes"`, `"no"`. |
| `portalAccess` | string | no |  | Client Portal Access. One of `"Full access"`, `"Read only"`, `"Overview"`, `"None"`. |
| `showTimeWorkedInPortal` | string | no |  | Show Time Worked in Portal. Leave empty to not send this value (an update keeps the current one). One of `"yes"`, `"no"`. |
| `hexColor` | string | no |  | Colour. Hex colour, for example #78909C. |
| `clearFields` | array | no |  | Clear Fields. Fields to blank out on the record. Only text fields can be cleared; dates and numbers keep their value. One of `"description"`. |

Output fields:

- `id`: Project ID
- `name`: Name
- `clientId`: Client ID
- `projectTypeId`: Project Type ID
- `active`: Active (boolean)
- `startDate`: Start Date (date)
- `dueDate`: Due Date (date)
- `dateCreated`: Created (datetime)
- `hexColor`: Colour
- `portalAccess`: Client Portal Access
- `portalAccessAssignedOnly`: Portal Access Assigned Only (boolean)
- `showTimeWorkedInPortal`: Show Time Worked In Portal (boolean)
- `proposalId`: Proposal ID
- `proposalName`: Proposal Name
- `feeSchedule`: Fee Schedule
- `feeSchedule.feeType`: Fee Type
- `feeSchedule.amount`: Amount (number)
- `feeSchedule.estimateMin`: Estimate Minimum (number)
- `feeSchedule.estimateMax`: Estimate Maximum (number)
- `feeSchedule.taxable`: Taxable (boolean)
- `feeSchedule.retainerSchedule`: Retainer Schedule
- `feeSchedule.retainerTiming`: Retainer Timing
- `feeSchedule.retainerPeriods`: Retainer Periods (number)
- `feeSchedule.retainerOverageRate`: Retainer Overage Rate (number)
- `feeSchedule.retainerActive`: Retainer Active (boolean)
- `feeSchedule.updatedDate`: Updated Date (datetime)
- `feeSchedule.updatedBy`: Updated By
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type
- `description`: Description
- `dateCompleted`: Date Completed (date)
- `proposalVersion`: Proposal Version (number)
- `clientMini`: Client
- `clientMini.id`: Client ID
- `clientMini.name`: Name
- `clientMini.clientType`: Client Type
- `clientMini.initials`: Initials
- `clientMini.address1`: Address Line 1
- `clientMini.address2`: Address Line 2
- `clientMini.city`: City
- `clientMini.locality`: State or Region
- `clientMini.postal`: Postal Code
- `clientMini.country`: Country
- `clientMini.website`: Website (url)
- `clientMini.phone`: Phone
- `clientMini.logo`: Logo (image)
- `clientMini.color`: Colour
- `clientMini.taxId`: Tax ID
- `clientMini.leadSource`: Lead Source
- `clientMini.archive`: Archived (boolean)
- `clientMini.hourlyAmount`: Hourly Amount (number)
- `clientMini.defaultTaxRate`: Default Tax Rate (number)
- `clientMini.currency`: Currency
- `clientMini.whoPaysCardFees`: Who Pays Card Fees

### `moxie_update_task`

**Update Task.** Updates a Moxie task picked by client, project and task, including its stage and assignees; only filled fields change. For agents use moxie_task_update. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientName` | string | yes |  | Client. The client, matched by its exact name. A value the product loads from the provider, such as an id; write the value itself. |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `taskId` | string | yes |  | Task. A value the product loads from the provider, such as an id; write the value itself. |
| `statusId` | string | no |  | Stage. Moves the task to this stage. Leave empty to keep the current stage. A value the product loads from the provider, such as an id; write the value itself. |
| `assignedToList` | array | no |  | Assignees. Replaces the current assignees. Leave empty to keep them. Values the product loads from the provider, such as ids; write an array of them. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `priority` | number | no |  | Priority. Whole number used to sort the kanban board. |
| `startDate` | string | no |  | Start Date. Date in YYYY-MM-DD format. |
| `dueDate` | string | no |  | Due Date. Date in YYYY-MM-DD format. |
| `clearFields` | array | no |  | Clear Fields. Fields to blank out on the record. Only text fields can be cleared; dates and numbers keep their value. One of `"description"`. |

Output fields:

- `id`: Task ID
- `name`: Name
- `clientId`: Client ID
- `projectId`: Project ID
- `projectTypeId`: Project Type ID
- `statusId`: Status ID
- `description`: Description
- `descriptionFormat`: Description Format
- `type`: Type
- `priority`: Priority (number)
- `taskPriority`: Priority Label
- `startDate`: Start Date (date)
- `dueDate`: Due Date (date)
- `created`: Created (datetime)
- `completed`: Completed (datetime)
- `archived`: Archived (boolean)
- `approvalRequired`: Approval Required (boolean)
- `approvalRequestedAt`: Approval Requested At (datetime)
- `isSubTask`: Is Subtask (boolean)
- `parentTaskId`: Parent Task ID
- `subTaskSort`: Subtask Sort (number)
- `kanbanSort`: Kanban Sort (number)
- `ticketId`: Ticket ID
- `product`: Product
- `quantity`: Quantity (number)
- `invoiceId`: Invoice ID
- `invoiceNumber`: Invoice Number
- `assignedTo`: Assigned To
- `assignedToList`: Assigned User IDs
- `events`: Events
- `events[].user`: User
- `events[].events`: Events
- `events[].clientEvent`: Client Event (boolean)
- `events[].timestamp`: Timestamp (datetime)
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type
- `tasks`: Subtasks
- `tasks[].id`: Subtask ID
- `tasks[].description`: Description
- `tasks[].complete`: Complete (boolean)

### `moxie_update_ticket_status`

**Update Ticket Status.** Changes only the workflow status of a Moxie ticket, identified by its id or its ticket number (give exactly one). The status must be one configured for the ticket type; an unknown status is rejected. Use to close or move a ticket after handling it. Idempotent: setting the same status again leaves the ticket unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketId` | string | no |  | Ticket ID. Exact ticket id, from Search Tickets. Give this or the ticket number. |
| `ticketNumber` | number | no |  | Ticket Number. The ticket number. Give this or the ticket id. |
| `status` | string | yes |  | Status. Status label configured for the ticket type, for example Open. |

Output fields:

- `id`: Ticket ID
- `ticketNumber`: Ticket Number (number)
- `subject`: Subject
- `type`: Ticket Type
- `status`: Status
- `open`: Open (boolean)
- `archived`: Archived (boolean)
- `unread`: Unread (boolean)
- `dueDate`: Due Date (date)
- `summary`: Summary
- `lastComment`: Last Comment
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `closed`: Closed (datetime)
- `clientId`: Client ID
- `assignedTo`: Assigned User IDs
- `ccList`: CC List
- `client`: Client
- `client.id`: ID
- `client.name`: Name

### `moxie_upload_attachment`

**Upload Attachment.** Uploads a file from the flow and attaches it to a Moxie record by id. For agents use moxie_attach_file_from_url. Not idempotent: each run adds another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes |  | Attach To. One of `"CLIENT"`, `"PROJECT"`, `"DELIVERABLE"`, `"OPPORTUNITY"`, `"EXPENSE"`, `"TICKET"`. |
| `objectId` | string | yes |  | Record ID. Id of the record, for example mapped from a trigger or a Search step. |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |

Output fields:

- `url`: File URL (url)
- `objectType`: Attached To Type
- `objectId`: Attached To ID
- `fileName`: File Name

### `moxie_client_create`

**Create Client.** Creates a client or prospect record in Moxie with address, billing and rate details; only Name is required and empty fields are not sent. Use when onboarding a new account, after Search Clients confirms it does not exist yet. Not idempotent: each call creates a separate client, even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `clientType` | string | no |  | Client Type. Client for a paying account, Prospect for a lead. One of `"Client"`, `"Prospect"`. |
| `initials` | string | no |  | Initials. |
| `address1` | string | no |  | Address Line 1. |
| `address2` | string | no |  | Address Line 2. |
| `city` | string | no |  | City. |
| `locality` | string | no |  | State or Region. |
| `postal` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. Two-letter ISO 3166-1 country code, for example US. |
| `website` | string | no |  | Website. |
| `phone` | string | no |  | Phone. |
| `color` | string | no |  | Colour. Hex colour, for example #78909C. |
| `taxId` | string | no |  | Tax ID. |
| `leadSource` | string | no |  | Lead Source. |
| `payInstructions` | string | no |  | Payment Instructions. |
| `hourlyAmount` | number | no |  | Hourly Rate. |
| `roundingIncrement` | number | no |  | Time Rounding Increment. Minutes to round tracked time to. |
| `currency` | string | no |  | Currency. Three-letter ISO 4217 code, for example USD. |
| `notes` | string | no |  | Notes. |
| `archive` | string | no |  | Archived. Yes archives the client, No restores it. Leave empty to keep the current state. One of `"yes"`, `"no"`. |

Output fields:

- `id`: Client ID
- `name`: Name
- `clientType`: Client Type
- `initials`: Initials
- `address1`: Address Line 1
- `address2`: Address Line 2
- `city`: City
- `locality`: State or Region
- `postal`: Postal Code
- `country`: Country
- `website`: Website (url)
- `phone`: Phone
- `logo`: Logo (image)
- `color`: Colour
- `taxId`: Tax ID
- `leadSource`: Lead Source
- `archive`: Archived (boolean)
- `hourlyAmount`: Hourly Amount (number)
- `roundingIncrement`: Rounding Increment (number)
- `defaultTaxRate`: Default Tax Rate (number)
- `currency`: Currency
- `payInstructions`: Payment Instructions
- `notes`: Notes
- `stripeClientId`: Stripe Customer ID
- `created`: Created (datetime)
- `lastInvoiceRunDate`: Last Invoice Run Date (date)
- `nextInvoiceRunDate`: Next Invoice Run Date (date)
- `paymentTerms`: Payment Terms
- `paymentTerms.paymentDays`: Payment Days (number)
- `paymentTerms.latePaymentFee`: Late Payment Fee (number)
- `paymentTerms.depositAmount`: Deposit Amount (number)
- `paymentTerms.depositType`: Deposit Type
- `paymentTerms.hourlyAmount`: Hourly Amount (number)
- `paymentTerms.whoPaysCardFees`: Who Pays Card Fees
- `paymentTerms.updatedDate`: Updated Date (datetime)
- `paymentTerms.updatedBy`: Updated By
- `integrationKeys`: Integration Keys
- `integrationKeys.quickbooksId`: QuickBooks ID
- `integrationKeys.xeroId`: Xero ID
- `contacts`: Contacts
- `contacts[].id`: Contact ID
- `contacts[].firstName`: First Name
- `contacts[].lastName`: Last Name
- `contacts[].email`: Email (email)
- `contacts[].phone`: Phone
- `contacts[].mobile`: Mobile
- `contacts[].role`: Role
- `contacts[].clientId`: Client ID
- `contacts[].defaultContact`: Default Contact (boolean)
- `contacts[].invoiceContact`: Invoice Contact (boolean)
- `contacts[].portalAccess`: Portal Access (boolean)
- `contacts[].notes`: Notes
- `contacts[].customValues`: Custom Values
- `contacts[].customValues[].fieldId`: Field ID
- `contacts[].customValues[].mappingKey`: Mapping Key
- `contacts[].customValues[].fieldName`: Field Name
- `contacts[].customValues[].value`: Value
- `contacts[].customValues[].type`: Field Type
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type

### `moxie_client_update`

**Update Client.** Updates an existing Moxie client by id: only the fields you pass change, and Clear Fields blanks text fields. Use to correct address, billing, rate or archive state once you have the client id from Search Clients or List Clients. Idempotent: repeating the same update leaves the client unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | yes |  | Client ID. Id of the client to update, from Search Clients, List Clients or a client trigger. |
| `name` | string | no |  | Name. |
| `clientType` | string | no |  | Client Type. Client for a paying account, Prospect for a lead. One of `"Client"`, `"Prospect"`. |
| `initials` | string | no |  | Initials. |
| `address1` | string | no |  | Address Line 1. |
| `address2` | string | no |  | Address Line 2. |
| `city` | string | no |  | City. |
| `locality` | string | no |  | State or Region. |
| `postal` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. Two-letter ISO 3166-1 country code, for example US. |
| `website` | string | no |  | Website. |
| `phone` | string | no |  | Phone. |
| `color` | string | no |  | Colour. Hex colour, for example #78909C. |
| `taxId` | string | no |  | Tax ID. |
| `leadSource` | string | no |  | Lead Source. |
| `payInstructions` | string | no |  | Payment Instructions. |
| `hourlyAmount` | number | no |  | Hourly Rate. |
| `roundingIncrement` | number | no |  | Time Rounding Increment. Minutes to round tracked time to. |
| `currency` | string | no |  | Currency. Three-letter ISO 4217 code, for example USD. |
| `notes` | string | no |  | Notes. |
| `archive` | string | no |  | Archived. Yes archives the client, No restores it. Leave empty to keep the current state. One of `"yes"`, `"no"`. |
| `clearFields` | array | no |  | Clear Fields. Fields to blank out on the record. Only text fields can be cleared; dates and numbers keep their value. One of `"initials"`, `"address1"`, `"address2"`, `"city"`, `"locality"`, `"postal"`, `"country"`, `"website"`, `"phone"`, `"taxId"`, `"leadSource"`, `"payInstructions"`, `"notes"`. |

Output fields:

- `id`: Client ID
- `name`: Name
- `clientType`: Client Type
- `initials`: Initials
- `address1`: Address Line 1
- `address2`: Address Line 2
- `city`: City
- `locality`: State or Region
- `postal`: Postal Code
- `country`: Country
- `website`: Website (url)
- `phone`: Phone
- `logo`: Logo (image)
- `color`: Colour
- `taxId`: Tax ID
- `leadSource`: Lead Source
- `archive`: Archived (boolean)
- `hourlyAmount`: Hourly Amount (number)
- `roundingIncrement`: Rounding Increment (number)
- `defaultTaxRate`: Default Tax Rate (number)
- `currency`: Currency
- `payInstructions`: Payment Instructions
- `notes`: Notes
- `stripeClientId`: Stripe Customer ID
- `created`: Created (datetime)
- `lastInvoiceRunDate`: Last Invoice Run Date (date)
- `nextInvoiceRunDate`: Next Invoice Run Date (date)
- `paymentTerms`: Payment Terms
- `paymentTerms.paymentDays`: Payment Days (number)
- `paymentTerms.latePaymentFee`: Late Payment Fee (number)
- `paymentTerms.depositAmount`: Deposit Amount (number)
- `paymentTerms.depositType`: Deposit Type
- `paymentTerms.hourlyAmount`: Hourly Amount (number)
- `paymentTerms.whoPaysCardFees`: Who Pays Card Fees
- `paymentTerms.updatedDate`: Updated Date (datetime)
- `paymentTerms.updatedBy`: Updated By
- `integrationKeys`: Integration Keys
- `integrationKeys.quickbooksId`: QuickBooks ID
- `integrationKeys.xeroId`: Xero ID
- `contacts`: Contacts
- `contacts[].id`: Contact ID
- `contacts[].firstName`: First Name
- `contacts[].lastName`: Last Name
- `contacts[].email`: Email (email)
- `contacts[].phone`: Phone
- `contacts[].mobile`: Mobile
- `contacts[].role`: Role
- `contacts[].clientId`: Client ID
- `contacts[].defaultContact`: Default Contact (boolean)
- `contacts[].invoiceContact`: Invoice Contact (boolean)
- `contacts[].portalAccess`: Portal Access (boolean)
- `contacts[].notes`: Notes
- `contacts[].customValues`: Custom Values
- `contacts[].customValues[].fieldId`: Field ID
- `contacts[].customValues[].mappingKey`: Mapping Key
- `contacts[].customValues[].fieldName`: Field Name
- `contacts[].customValues[].value`: Value
- `contacts[].customValues[].type`: Field Type
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type

### `moxie_contact_create`

**Create Contact.** Creates a contact person in Moxie, attached to a client when Client Name is given (exact name, from Search Clients). Use to add a person to an account or a named lead; check Search Contacts first to avoid duplicates. Not idempotent: each call creates a separate contact, even with the same email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first` | string | yes |  | First Name. |
| `last` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `notes` | string | no |  | Notes. |
| `defaultContact` | string | no |  | Default Contact. Yes makes this the client's primary contact. One of `"yes"`, `"no"`. |
| `invoiceContact` | string | no |  | Invoice Contact. Yes sends invoices for the client to this contact. One of `"yes"`, `"no"`. |
| `portalAccess` | string | no |  | Portal Access. Yes lets this contact sign in to the client portal. One of `"yes"`, `"no"`. |
| `clientName` | string | no |  | Client Name. Exact name of the client to attach the contact to, from Search Clients. Leave empty for a contact without a client. |

Output fields:

- `id`: Contact ID
- `firstName`: First Name
- `lastName`: Last Name
- `email`: Email (email)
- `phone`: Phone
- `mobile`: Mobile
- `role`: Role
- `clientId`: Client ID
- `defaultContact`: Default Contact (boolean)
- `invoiceContact`: Invoice Contact (boolean)
- `portalAccess`: Portal Access (boolean)
- `notes`: Notes
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type

### `moxie_contact_update`

**Update Contact.** Updates an existing Moxie contact by id: only the fields you pass change, Clear Fields blanks text fields, and Client ID moves the contact to another client. Use after finding the contact id with Search Contacts. Idempotent: repeating the same update leaves the contact unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. Id of the contact to update, from Search Contacts. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `role` | string | no |  | Role. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `mobile` | string | no |  | Mobile. |
| `notes` | string | no |  | Notes. |
| `defaultContact` | string | no |  | Default Contact. Yes makes this the client's primary contact. One of `"yes"`, `"no"`. |
| `invoiceContact` | string | no |  | Invoice Contact. Yes sends invoices for the client to this contact. One of `"yes"`, `"no"`. |
| `portalAccess` | string | no |  | Portal Access. Yes lets this contact sign in to the client portal. One of `"yes"`, `"no"`. |
| `clientId` | string | no |  | Client ID. Moves the contact to this client id, from Search Clients. Leave empty to keep the current client. |
| `clearFields` | array | no |  | Clear Fields. Fields to blank out on the record. Only text fields can be cleared; dates and numbers keep their value. One of `"lastName"`, `"role"`, `"email"`, `"phone"`, `"mobile"`, `"notes"`. |

Output fields:

- `id`: Contact ID
- `firstName`: First Name
- `lastName`: Last Name
- `email`: Email (email)
- `phone`: Phone
- `mobile`: Mobile
- `role`: Role
- `clientId`: Client ID
- `defaultContact`: Default Contact (boolean)
- `invoiceContact`: Invoice Contact (boolean)
- `portalAccess`: Portal Access (boolean)
- `notes`: Notes
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type

### `moxie_expense_create`

**Create Expense.** Records an expense with amount, date, vendor, category and billing flags, optionally billed to a client matched by exact name. Use to sync receipts or bills from another tool; vendor names come from List Vendors. Not idempotent: each call records another expense. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `amount` | number | yes |  | Amount. |
| `vendor` | string | no |  | Vendor. Vendor name, from List Vendors. |
| `clientName` | string | no |  | Client Name. Exact client name to bill the expense to, from Search Clients. |
| `date` | string | no |  | Expense Date. ISO 8601 date and time, for example 2026-10-01T09:30:00Z. |
| `category` | string | no |  | Category. |
| `currency` | string | no |  | Currency. Three-letter ISO 4217 code, for example USD. |
| `paid` | string | no |  | Paid. Leave empty to not send this value (an update keeps the current one). One of `"yes"`, `"no"`. |
| `reimbursable` | string | no |  | Billable to Client. Yes marks the expense as reimbursable, so it can be billed to the client. One of `"yes"`, `"no"`. |
| `markupPercentage` | number | no |  | Markup Percentage. |
| `billNo` | string | no |  | Bill or Receipt Number. |
| `description` | string | no |  | Description. |
| `notes` | string | no |  | Notes. |

Output fields:

- `id`: Expense ID
- `amount`: Amount (currency)
- `tax`: Tax (currency)
- `taxRate`: Tax Rate (number)
- `total`: Total (currency)
- `totalWithMarkup`: Total With Markup (currency)
- `markupPercent`: Markup Percentage (number)
- `currency`: Currency
- `category`: Category
- `billNo`: Bill Number
- `description`: Description
- `notes`: Notes
- `paid`: Paid (boolean)
- `paidDate`: Paid Date (date)
- `dueDate`: Due Date (date)
- `reimbursable`: Billable to Client (boolean)
- `dateCreated`: Created (datetime)
- `invoiceId`: Invoice ID
- `invoiceNumber`: Invoice Number
- `vendor`: Vendor
- `vendor.id`: ID
- `vendor.name`: Name
- `client`: Client
- `client.id`: ID
- `client.name`: Name
- `project`: Project
- `project.id`: ID
- `project.name`: Name

### `moxie_invoice_create`

**Create Invoice.** Creates an invoice with line items for a client matched by exact name. It stays a DRAFT unless Send Invoice is on, in which case Moxie emails it to the listed contacts. Use to bill a client; template names come from List Invoice Templates. Not idempotent: each call creates a new invoice, and with Send Invoice on each call emails the client. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientName` | string | yes |  | Client Name. Exact name of the client to bill, from Search Clients. |
| `templateName` | string | no |  | Invoice Template. Exact invoice template name, from List Invoice Templates. Leave empty for the default. |
| `items` | array | yes |  | Line Items. At least one line, each with a description, quantity and rate. Each item: { `description`, `quantity`, `rate`, `taxable`?, `projectName`? }. |
| `dueDate` | string | no |  | Due Date. Date in YYYY-MM-DD format. |
| `taxRate` | number | no |  | Tax Rate. Flat tax rate percentage applied to taxable items. |
| `discountPercent` | number | no |  | Discount Percentage. |
| `paymentInstructions` | string | no |  | Payment Instructions. |
| `description` | string | no |  | Description. |
| `invoiceNumber` | string | no |  | Invoice Number. Leave empty to use the next number in the sequence. |
| `send` | boolean | no | `false` | Send Invoice. Off (default) keeps the invoice as a draft. On emails it to the contacts below. |
| `sendToContacts` | array | no |  | Send To Contacts. Emails of the client contacts who receive the invoice. Only used when Send Invoice is on. |
| `emailTemplateName` | string | no |  | Email Template. Exact email template name for the invoice email, from List Email Templates. Only used when Send Invoice is on. |

Output fields:

- `id`: Invoice ID
- `invoiceNumber`: Invoice Number (number)
- `invoiceNumberFormatted`: Invoice Number Formatted
- `description`: Description
- `clientId`: Client ID
- `status`: Status
- `invoiceType`: Invoice Type
- `dateCreated`: Date Created (date)
- `dateSent`: Date Sent (date)
- `dateDue`: Date Due (date)
- `datePaid`: Date Paid (date)
- `currency`: Currency
- `subTotal`: Subtotal (currency)
- `discountAmount`: Discount Amount (currency)
- `tax`: Tax (currency)
- `taxPercentage`: Tax Percentage (number)
- `total`: Total (currency)
- `paymentTotal`: Payment Total (currency)
- `amountDue`: Amount Due (currency)
- `viewOnlineUrl`: View Online URL (url)
- `clientInfo`: Client
- `clientInfo.id`: Client ID
- `clientInfo.name`: Name
- `clientInfo.taxId`: Tax ID
- `payments`: Payments
- `payments[].id`: Payment ID
- `payments[].amount`: Amount (currency)
- `payments[].currency`: Currency
- `payments[].datePaid`: Date Paid (date)
- `payments[].paidBy`: Paid By
- `payments[].paymentProvider`: Payment Method
- `payments[].referenceNumber`: Reference Number
- `payments[].memo`: Memo
- `payments[].pending`: Pending (boolean)
- `lineItems`: Line Items
- `lineItems[].description`: Description
- `lineItems[].quantity`: Quantity (number)
- `lineItems[].unitPrice`: Unit Price (currency)
- `lineItems[].unit`: Unit
- `lineItems[].taxable`: Taxable (boolean)
- `lineItems[].lineTotal`: Line Total (currency)
- `lineItems[].type`: Type
- `lineItems[].projectName`: Project Name
- `taxBreakdown`: Tax Breakdown
- `taxBreakdown[].name`: Tax Name
- `taxBreakdown[].rate`: Rate (number)
- `taxBreakdown[].taxableAmount`: Taxable Amount (currency)
- `taxBreakdown[].amount`: Amount (currency)

### `moxie_opportunity_create`

**Create Opportunity.** Creates a pipeline opportunity (deal) in Moxie, optionally linked to a client by exact name and placed in a stage by exact stage label. Use to log a new deal or lead; get stage labels from List Pipeline Stages. Not idempotent: each call creates a separate opportunity. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Opportunity Name. Name of the deal. |
| `clientName` | string | no |  | Client Name. Exact name of the client, from Search Clients. Leave empty for a deal without a client. |
| `stageName` | string | no |  | Stage. Exact pipeline stage label, from List Pipeline Stages. Leave empty for the default stage. |
| `description` | string | no |  | Description. |
| `value` | number | no |  | Estimated Value. |
| `estCloseDate` | string | no |  | Estimated Close Date. Date in YYYY-MM-DD format. |
| `customValues` | object | no |  | Custom Values. Custom opportunity field values keyed by field name. |

Output fields:

- `id`: Opportunity ID
- `name`: Name
- `description`: Description
- `clientId`: Client ID
- `statusId`: Stage ID
- `statusLabel`: Stage
- `value`: Value (number)
- `sentiment`: Sentiment (number)
- `timePeriod`: Time Period
- `periods`: Periods (number)
- `estCloseDate`: Estimated Close Date (date)
- `actualCloseDate`: Actual Close Date (date)
- `wonOn`: Won On (date)
- `archive`: Archived (boolean)
- `kanbanSort`: Kanban Sort (number)
- `created`: Created (datetime)
- `formData`: Lead Details
- `formData.firstName`: First Name
- `formData.lastName`: Last Name
- `formData.email`: Email (email)
- `formData.phone`: Phone
- `formData.role`: Role
- `formData.businessName`: Business Name
- `formData.website`: Website (url)
- `formData.address1`: Address Line 1
- `formData.address2`: Address Line 2
- `formData.city`: City
- `formData.locality`: State or Region
- `formData.postal`: Postal Code
- `formData.country`: Country
- `formData.sourceUrl`: Source URL (url)
- `formData.leadSource`: Lead Source
- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].author`: Author
- `comments[].comment`: Comment
- `comments[].clientComment`: Client Comment (boolean)
- `comments[].privateComment`: Private Comment (boolean)
- `comments[].edited`: Edited (boolean)
- `comments[].timestamp`: Timestamp (datetime)
- `workflow`: Workflow
- `workflow[].id`: Item ID
- `workflow[].itemId`: Referenced ID
- `workflow[].itemType`: Item Type
- `workflow[].timestamp`: Timestamp (datetime)
- `client`: Client
- `client.id`: ID
- `client.name`: Name
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type
- `toDos`: To-dos
- `toDos[].id`: To-do ID
- `toDos[].item`: Item
- `toDos[].complete`: Complete (boolean)
- `toDos[].dueDate`: Due Date (date)

### `moxie_opportunity_update`

**Update Opportunity.** Updates an existing Moxie opportunity by id; set Stage ID to move the deal through the pipeline, or change value, dates, sentiment, client or archive state. Only the fields you pass change. The opportunity id comes from Create Opportunity or an opportunity trigger (there is no search). Idempotent: repeating the same update leaves the deal unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunityId` | string | yes |  | Opportunity ID. Id of the opportunity, from Create Opportunity or an opportunity trigger. |
| `statusId` | string | no |  | Stage ID. Moves the deal to this pipeline stage id, from List Pipeline Stages. |
| `clientId` | string | no |  | Client ID. Links the deal to this client id, from Search Clients. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `value` | number | no |  | Estimated Value. |
| `estCloseDate` | string | no |  | Estimated Close Date. Date in YYYY-MM-DD format. |
| `actualCloseDate` | string | no |  | Actual Close Date. Date in YYYY-MM-DD format. |
| `sentiment` | number | no |  | Sentiment. Whole number rating of how the deal is going. |
| `archive` | string | no |  | Archived. Yes archives the opportunity, No restores it. One of `"yes"`, `"no"`. |
| `clearFields` | array | no |  | Clear Fields. Fields to blank out on the record. Only text fields can be cleared; dates and numbers keep their value. One of `"description"`. |

Output fields:

- `id`: Opportunity ID
- `name`: Name
- `description`: Description
- `clientId`: Client ID
- `statusId`: Stage ID
- `statusLabel`: Stage
- `value`: Value (number)
- `sentiment`: Sentiment (number)
- `timePeriod`: Time Period
- `periods`: Periods (number)
- `estCloseDate`: Estimated Close Date (date)
- `actualCloseDate`: Actual Close Date (date)
- `wonOn`: Won On (date)
- `archive`: Archived (boolean)
- `kanbanSort`: Kanban Sort (number)
- `created`: Created (datetime)
- `formData`: Lead Details
- `formData.firstName`: First Name
- `formData.lastName`: Last Name
- `formData.email`: Email (email)
- `formData.phone`: Phone
- `formData.role`: Role
- `formData.businessName`: Business Name
- `formData.website`: Website (url)
- `formData.address1`: Address Line 1
- `formData.address2`: Address Line 2
- `formData.city`: City
- `formData.locality`: State or Region
- `formData.postal`: Postal Code
- `formData.country`: Country
- `formData.sourceUrl`: Source URL (url)
- `formData.leadSource`: Lead Source
- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].author`: Author
- `comments[].comment`: Comment
- `comments[].clientComment`: Client Comment (boolean)
- `comments[].privateComment`: Private Comment (boolean)
- `comments[].edited`: Edited (boolean)
- `comments[].timestamp`: Timestamp (datetime)
- `workflow`: Workflow
- `workflow[].id`: Item ID
- `workflow[].itemId`: Referenced ID
- `workflow[].itemType`: Item Type
- `workflow[].timestamp`: Timestamp (datetime)
- `client`: Client
- `client.id`: ID
- `client.name`: Name
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type
- `toDos`: To-dos
- `toDos[].id`: To-do ID
- `toDos[].item`: Item
- `toDos[].complete`: Complete (boolean)
- `toDos[].dueDate`: Due Date (date)

### `moxie_payment_create`

**Record Payment.** Records a payment on an open (sent, not fully paid) invoice matched by formatted invoice number and exact client name. With a Reference Number, the action first checks the invoice and returns it with already_applied true instead of recording the same payment twice; this check is best-effort, since Moxie has no idempotency key, so two runs started at the same moment can both record it. If the first run paid the invoice in full, the invoice is no longer open and a repeat run fails with a not-found error instead of paying twice. Use to sync payments from another system; find invoices with Search Open Invoices. Not idempotent without a Reference Number. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceNumber` | string | yes |  | Invoice Number. Formatted invoice number, for example E-2026-042, from Search Open Invoices. |
| `clientName` | string | yes |  | Client Name. Exact name of the client the invoice belongs to. |
| `amount` | number | yes |  | Amount. Payment amount, more than 0. |
| `date` | string | no |  | Payment Date. Date in YYYY-MM-DD format. Leave empty to use the Moxie default. |
| `paymentType` | string | no |  | Payment Method. One of `"STRIPE"`, `"CHECK"`, `"BANK_TRANSFER"`, `"CASH"`, `"VENMO"`, `"PAYPAL"`, `"ZELLE"`, `"APP_PAYOUT"`, `"CREDIT_CARD"`, `"OTHER"`. |
| `referenceNumber` | string | no |  | Reference Number. External payment reference. Also used to skip a payment that was already recorded. |
| `memo` | string | no |  | Memo. Free-text note on the payment. |

Output fields:

- `id`: Invoice ID
- `invoiceNumber`: Invoice Number (number)
- `invoiceNumberFormatted`: Invoice Number Formatted
- `description`: Description
- `clientId`: Client ID
- `status`: Status
- `invoiceType`: Invoice Type
- `dateCreated`: Date Created (date)
- `dateSent`: Date Sent (date)
- `dateDue`: Date Due (date)
- `datePaid`: Date Paid (date)
- `currency`: Currency
- `subTotal`: Subtotal (currency)
- `discountAmount`: Discount Amount (currency)
- `tax`: Tax (currency)
- `taxPercentage`: Tax Percentage (number)
- `total`: Total (currency)
- `paymentTotal`: Payment Total (currency)
- `amountDue`: Amount Due (currency)
- `viewOnlineUrl`: View Online URL (url)
- `clientInfo`: Client
- `clientInfo.id`: Client ID
- `clientInfo.name`: Name
- `clientInfo.taxId`: Tax ID
- `payments`: Payments
- `payments[].id`: Payment ID
- `payments[].amount`: Amount (currency)
- `payments[].currency`: Currency
- `payments[].datePaid`: Date Paid (date)
- `payments[].paidBy`: Paid By
- `payments[].paymentProvider`: Payment Method
- `payments[].referenceNumber`: Reference Number
- `payments[].memo`: Memo
- `payments[].pending`: Pending (boolean)
- `lineItems`: Line Items
- `lineItems[].description`: Description
- `lineItems[].quantity`: Quantity (number)
- `lineItems[].unitPrice`: Unit Price (currency)
- `lineItems[].unit`: Unit
- `lineItems[].taxable`: Taxable (boolean)
- `lineItems[].lineTotal`: Line Total (currency)
- `lineItems[].type`: Type
- `lineItems[].projectName`: Project Name
- `taxBreakdown`: Tax Breakdown
- `taxBreakdown[].name`: Tax Name
- `taxBreakdown[].rate`: Rate (number)
- `taxBreakdown[].taxableAmount`: Taxable Amount (currency)
- `taxBreakdown[].amount`: Amount (currency)
- `already_applied`: Already Applied (boolean)

### `moxie_project_create`

**Create Project.** Creates a project under an existing client matched by exact name, with optional dates, portal access, template and fee schedule (the fee schedule is sent only when Fee Type is set). Use when starting a new engagement for a known client. Not idempotent: each call creates a separate project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Project Name. Name of the new project. |
| `clientName` | string | yes |  | Client Name. Exact name of an existing client, from Search Clients. |
| `startDate` | string | no |  | Start Date. Date in YYYY-MM-DD format. |
| `dueDate` | string | no |  | Due Date. Date in YYYY-MM-DD format. |
| `portalAccess` | string | no |  | Client Portal Access. One of `"Full access"`, `"Read only"`, `"Overview"`, `"None"`. |
| `showTimeWorkedInPortal` | string | no |  | Show Time Worked in Portal. Leave empty to not send this value (an update keeps the current one). One of `"yes"`, `"no"`. |
| `templateName` | string | no |  | Project Template. Exact name of a project template to copy tasks and settings from. |
| `customValues` | object | no |  | Custom Values. Custom project field values keyed by field name. |
| `feeType` | string | no |  | Fee Type. Sets the fee schedule. Leave empty to create the project without one. One of `"Hourly"`, `"Fixed Price"`, `"Retainer"`, `"Per Item"`. |
| `amount` | number | no |  | Fee Amount. Hourly rate, fixed price, retainer amount or per-item price, depending on Fee Type. |
| `estimateMin` | number | no |  | Estimate Minimum. |
| `estimateMax` | number | no |  | Estimate Maximum. |
| `taxable` | string | no |  | Fee Taxable. Leave empty to not send this value (an update keeps the current one). One of `"yes"`, `"no"`. |

Output fields:

- `id`: Project ID
- `name`: Name
- `clientId`: Client ID
- `projectTypeId`: Project Type ID
- `active`: Active (boolean)
- `startDate`: Start Date (date)
- `dueDate`: Due Date (date)
- `dateCreated`: Created (datetime)
- `hexColor`: Colour
- `portalAccess`: Client Portal Access
- `portalAccessAssignedOnly`: Portal Access Assigned Only (boolean)
- `showTimeWorkedInPortal`: Show Time Worked In Portal (boolean)
- `proposalId`: Proposal ID
- `proposalName`: Proposal Name
- `feeSchedule`: Fee Schedule
- `feeSchedule.feeType`: Fee Type
- `feeSchedule.amount`: Amount (number)
- `feeSchedule.estimateMin`: Estimate Minimum (number)
- `feeSchedule.estimateMax`: Estimate Maximum (number)
- `feeSchedule.taxable`: Taxable (boolean)
- `feeSchedule.retainerSchedule`: Retainer Schedule
- `feeSchedule.retainerTiming`: Retainer Timing
- `feeSchedule.retainerPeriods`: Retainer Periods (number)
- `feeSchedule.retainerOverageRate`: Retainer Overage Rate (number)
- `feeSchedule.retainerActive`: Retainer Active (boolean)
- `feeSchedule.updatedDate`: Updated Date (datetime)
- `feeSchedule.updatedBy`: Updated By
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type
- `description`: Description
- `dateCompleted`: Date Completed (date)
- `proposalVersion`: Proposal Version (number)
- `clientMini`: Client
- `clientMini.id`: Client ID
- `clientMini.name`: Name
- `clientMini.clientType`: Client Type
- `clientMini.initials`: Initials
- `clientMini.address1`: Address Line 1
- `clientMini.address2`: Address Line 2
- `clientMini.city`: City
- `clientMini.locality`: State or Region
- `clientMini.postal`: Postal Code
- `clientMini.country`: Country
- `clientMini.website`: Website (url)
- `clientMini.phone`: Phone
- `clientMini.logo`: Logo (image)
- `clientMini.color`: Colour
- `clientMini.taxId`: Tax ID
- `clientMini.leadSource`: Lead Source
- `clientMini.archive`: Archived (boolean)
- `clientMini.hourlyAmount`: Hourly Amount (number)
- `clientMini.defaultTaxRate`: Default Tax Rate (number)
- `clientMini.currency`: Currency
- `clientMini.whoPaysCardFees`: Who Pays Card Fees

### `moxie_project_update`

**Update Project.** Updates an existing Moxie project by id (name, description, dates, active state, portal access, colour); only the fields you pass change and Clear Fields blanks the description. Use after finding the project id with Search Projects; the fee schedule is not changed here. Idempotent: repeating the same update leaves the project unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. Id of the project to update, from Search Projects or a project trigger. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `startDate` | string | no |  | Start Date. Date in YYYY-MM-DD format. |
| `dueDate` | string | no |  | Due Date. Date in YYYY-MM-DD format. |
| `active` | string | no |  | Active. No marks the project inactive, Yes reactivates it. One of `"yes"`, `"no"`. |
| `portalAccess` | string | no |  | Client Portal Access. One of `"Full access"`, `"Read only"`, `"Overview"`, `"None"`. |
| `showTimeWorkedInPortal` | string | no |  | Show Time Worked in Portal. Leave empty to not send this value (an update keeps the current one). One of `"yes"`, `"no"`. |
| `hexColor` | string | no |  | Colour. Hex colour, for example #78909C. |
| `clearFields` | array | no |  | Clear Fields. Fields to blank out on the record. Only text fields can be cleared; dates and numbers keep their value. One of `"description"`. |

Output fields:

- `id`: Project ID
- `name`: Name
- `clientId`: Client ID
- `projectTypeId`: Project Type ID
- `active`: Active (boolean)
- `startDate`: Start Date (date)
- `dueDate`: Due Date (date)
- `dateCreated`: Created (datetime)
- `hexColor`: Colour
- `portalAccess`: Client Portal Access
- `portalAccessAssignedOnly`: Portal Access Assigned Only (boolean)
- `showTimeWorkedInPortal`: Show Time Worked In Portal (boolean)
- `proposalId`: Proposal ID
- `proposalName`: Proposal Name
- `feeSchedule`: Fee Schedule
- `feeSchedule.feeType`: Fee Type
- `feeSchedule.amount`: Amount (number)
- `feeSchedule.estimateMin`: Estimate Minimum (number)
- `feeSchedule.estimateMax`: Estimate Maximum (number)
- `feeSchedule.taxable`: Taxable (boolean)
- `feeSchedule.retainerSchedule`: Retainer Schedule
- `feeSchedule.retainerTiming`: Retainer Timing
- `feeSchedule.retainerPeriods`: Retainer Periods (number)
- `feeSchedule.retainerOverageRate`: Retainer Overage Rate (number)
- `feeSchedule.retainerActive`: Retainer Active (boolean)
- `feeSchedule.updatedDate`: Updated Date (datetime)
- `feeSchedule.updatedBy`: Updated By
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type
- `description`: Description
- `dateCompleted`: Date Completed (date)
- `proposalVersion`: Proposal Version (number)
- `clientMini`: Client
- `clientMini.id`: Client ID
- `clientMini.name`: Name
- `clientMini.clientType`: Client Type
- `clientMini.initials`: Initials
- `clientMini.address1`: Address Line 1
- `clientMini.address2`: Address Line 2
- `clientMini.city`: City
- `clientMini.locality`: State or Region
- `clientMini.postal`: Postal Code
- `clientMini.country`: Country
- `clientMini.website`: Website (url)
- `clientMini.phone`: Phone
- `clientMini.logo`: Logo (image)
- `clientMini.color`: Colour
- `clientMini.taxId`: Tax ID
- `clientMini.leadSource`: Lead Source
- `clientMini.archive`: Archived (boolean)
- `clientMini.hourlyAmount`: Hourly Amount (number)
- `clientMini.defaultTaxRate`: Default Tax Rate (number)
- `clientMini.currency`: Currency
- `clientMini.whoPaysCardFees`: Who Pays Card Fees

### `moxie_task_create`

**Create Task.** Creates a task (deliverable) in a project identified by exact client and project names, with optional stage label, dates, priority, subtasks, assignee emails and custom values. Use to add work items to a known project; resolve names with Search Projects and stage labels with List Task Stages. Not idempotent: each call creates a separate task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Task Name. Name of the new task. |
| `clientName` | string | yes |  | Client Name. Exact name of the client that owns the project, from Search Clients. |
| `projectName` | string | yes |  | Project Name. Exact name of the project, from Search Projects. |
| `status` | string | no |  | Stage. Stage label to place the task in, from List Task Stages. Leave empty for the default stage. |
| `description` | string | no |  | Description. |
| `startDate` | string | no |  | Start Date. Date in YYYY-MM-DD format. |
| `dueDate` | string | no |  | Due Date. Date in YYYY-MM-DD format. |
| `priority` | number | no |  | Priority. Whole number used to sort the kanban board. |
| `tasks` | array | no |  | Subtasks. Names of subtasks to add. |
| `assignedTo` | array | no |  | Assignee Emails. Emails of workspace users to assign (see List Workspace Users). |
| `customValues` | object | no |  | Custom Values. Custom task field values keyed by field name. |

Output fields:

- `id`: Task ID
- `name`: Name
- `clientId`: Client ID
- `projectId`: Project ID
- `projectTypeId`: Project Type ID
- `statusId`: Status ID
- `description`: Description
- `descriptionFormat`: Description Format
- `type`: Type
- `priority`: Priority (number)
- `taskPriority`: Priority Label
- `startDate`: Start Date (date)
- `dueDate`: Due Date (date)
- `created`: Created (datetime)
- `completed`: Completed (datetime)
- `archived`: Archived (boolean)
- `approvalRequired`: Approval Required (boolean)
- `approvalRequestedAt`: Approval Requested At (datetime)
- `isSubTask`: Is Subtask (boolean)
- `parentTaskId`: Parent Task ID
- `subTaskSort`: Subtask Sort (number)
- `kanbanSort`: Kanban Sort (number)
- `ticketId`: Ticket ID
- `product`: Product
- `quantity`: Quantity (number)
- `invoiceId`: Invoice ID
- `invoiceNumber`: Invoice Number
- `assignedTo`: Assigned To
- `assignedToList`: Assigned User IDs
- `events`: Events
- `events[].user`: User
- `events[].events`: Events
- `events[].clientEvent`: Client Event (boolean)
- `events[].timestamp`: Timestamp (datetime)
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type
- `tasks`: Subtasks
- `tasks[].id`: Subtask ID
- `tasks[].description`: Description
- `tasks[].complete`: Complete (boolean)

### `moxie_task_update`

**Update Task.** Updates an existing Moxie task by id: rename, change description, dates or priority, move it to another stage with Stage ID, or replace its assignees. Only the fields you pass change. Use after finding the task id with Search Tasks or List Tasks. Idempotent: repeating the same update leaves the task unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. Id of the task to update, from Search Tasks, List Tasks or a task trigger. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `priority` | number | no |  | Priority. Whole number used to sort the kanban board. |
| `startDate` | string | no |  | Start Date. Date in YYYY-MM-DD format. |
| `dueDate` | string | no |  | Due Date. Date in YYYY-MM-DD format. |
| `statusId` | string | no |  | Stage ID. Moves the task to this stage id, from List Task Stages or List Project Types. Leave empty to keep the stage. |
| `assignedToList` | array | no |  | Assignee User IDs. Numeric user ids (user.userId from List Workspace Users). Replaces the current assignees. |
| `clearFields` | array | no |  | Clear Fields. Fields to blank out on the record. Only text fields can be cleared; dates and numbers keep their value. One of `"description"`. |

Output fields:

- `id`: Task ID
- `name`: Name
- `clientId`: Client ID
- `projectId`: Project ID
- `projectTypeId`: Project Type ID
- `statusId`: Status ID
- `description`: Description
- `descriptionFormat`: Description Format
- `type`: Type
- `priority`: Priority (number)
- `taskPriority`: Priority Label
- `startDate`: Start Date (date)
- `dueDate`: Due Date (date)
- `created`: Created (datetime)
- `completed`: Completed (datetime)
- `archived`: Archived (boolean)
- `approvalRequired`: Approval Required (boolean)
- `approvalRequestedAt`: Approval Requested At (datetime)
- `isSubTask`: Is Subtask (boolean)
- `parentTaskId`: Parent Task ID
- `subTaskSort`: Subtask Sort (number)
- `kanbanSort`: Kanban Sort (number)
- `ticketId`: Ticket ID
- `product`: Product
- `quantity`: Quantity (number)
- `invoiceId`: Invoice ID
- `invoiceNumber`: Invoice Number
- `assignedTo`: Assigned To
- `assignedToList`: Assigned User IDs
- `events`: Events
- `events[].user`: User
- `events[].events`: Events
- `events[].clientEvent`: Client Event (boolean)
- `events[].timestamp`: Timestamp (datetime)
- `customValues`: Custom Values
- `customValues[].fieldId`: Field ID
- `customValues[].mappingKey`: Mapping Key
- `customValues[].fieldName`: Field Name
- `customValues[].value`: Value
- `customValues[].type`: Field Type
- `tasks`: Subtasks
- `tasks[].id`: Subtask ID
- `tasks[].description`: Description
- `tasks[].complete`: Complete (boolean)

### `moxie_time_entry_create`

**Log Time.** Logs a time entry between two ISO 8601 timestamps, optionally against a client, project and task matched by exact name and for a given workspace user. The Create options make Moxie create a missing client, project or task instead of failing. Use to sync time from another tracker. Not idempotent: each call logs another entry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `timerStart` | string | yes |  | Start Time. ISO 8601 start, for example 2026-10-01T09:00:00Z. |
| `timerEnd` | string | yes |  | End Time. ISO 8601 end, after the start. |
| `clientName` | string | no |  | Client Name. Exact client name, from Search Clients. |
| `projectName` | string | no |  | Project Name. Exact project name, from Search Projects. |
| `deliverableName` | string | no |  | Task Name. Exact task name, from Search Tasks. |
| `userEmail` | string | no |  | User Email. Email of the workspace user the time is logged for, from List Workspace Users. Leave empty to let Moxie use its default user. |
| `notes` | string | no |  | Notes. |
| `createClient` | boolean | no | `false` | Create Client if Missing. |
| `createProject` | boolean | no | `false` | Create Project if Missing. |
| `createDeliverable` | boolean | no | `false` | Create Task if Missing. |

Output fields:

- `id`: Time Entry ID
- `userId`: User ID (number)
- `userFullName`: User Full Name
- `timerStart`: Timer Start (datetime)
- `timerEnd`: Timer End (datetime)
- `pausedAt`: Paused At (datetime)
- `pausedSeconds`: Paused Seconds (number)
- `duration`: Duration (duration)
- `wasRounded`: Was Rounded (boolean)
- `billable`: Billable (boolean)
- `notes`: Notes
- `clientId`: Client ID
- `clientName`: Client Name
- `projectId`: Project ID
- `projectName`: Project Name
- `deliverableId`: Task ID
- `deliverableName`: Task Name
- `ticketId`: Ticket ID
- `ticketName`: Ticket Name
- `invoiceId`: Invoice ID
- `invoiceNumber`: Invoice Number
- `timestamp`: Timestamp (datetime)
- `timestampUpdated`: Timestamp Updated (datetime)

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

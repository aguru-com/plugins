# Odoo

Open source all-in-one management software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-odoo'
  version: '0.3.2'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect with an Odoo API key.
>
> 1. In Odoo, click your avatar (top right) → **My Profile** (or **Preferences**) → **Account Security** tab.
> 2. Click **New API Key**, confirm your password, give it a name and copy the key. Odoo shows it once.
> 3. The **Username** is the login you sign in with (usually your email).
> 4. The **Database** is shown in the URL of the database manager, or ask your Odoo admin. On Odoo Online it is usually the first part of the address (for **mycompany**.odoo.com it is `mycompany`).
>
> Odoo Online allows the external API only on the Custom plan. API keys can expire, so create a new one if the connection stops working.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes |  | Odoo URL. The address of your Odoo without a port, for example https://mycompany.odoo.com. Put a port in the Port field. |
| `database` | string | yes |  | Odoo Database. The database name, for example mycompany. |
| `username` | string | yes |  | Odoo Username. The login of the Odoo user, usually an email address. |
| `api_key` | string | yes |  | Odoo API Key. The API key created under My Profile → Account Security → New API Key. |
| `port` | number | no |  | Port (optional). Leave empty to use port 443 (the default, right for Odoo Online and most HTTPS setups). Set it only when Odoo listens on another port, for example 8069 for a self-hosted Odoo reached directly. |

## Actions

### `get_contacts`

**Get contacts.** Reads contacts (res.partner records) from Odoo, scoped by a required type flag that selects either individual contacts or companies. Operates in two modes: leave the name blank to fetch all matching records, or supply a name to filter to partners whose name matches it. Read-only and idempotent. Use to look up or list Odoo contacts/companies before acting on them. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Type. Select which contact type to get. One of `false`, `true`. |
| `name` | string | no |  | Contact Name. Would you like to search any specific name? |

### `create_contact`

**Create contact.** Upserts an individual contact (res.partner) in Odoo by name: it searches for a non-company partner with the same name, updating it if found or creating one otherwise. Use to add or refresh a person contact with phone, email, company name, and job title. Not idempotent in effect — the first call may create a record and matching is by exact name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Contact Name. |
| `phone` | string | yes |  | Contact Phone. |
| `email` | string | yes |  | Contact E-mail. |
| `company` | string | yes |  | Company Name. |
| `title` | string | yes |  | Job Title. |

### `create_company`

**Create company.** Upserts a company partner (res.partner with is_company set) in Odoo by name: it searches for a company with the same name, updating it if found or creating one otherwise, setting phone and email. Use to add or refresh a company record. Not idempotent in effect — the first call may create a record and matching is by exact name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Company Name. |
| `phone` | string | yes |  | Company Phone. |
| `email` | string | yes |  | Company E-mail. |

### `get_records`

**Custom Search and read records.** Searches and reads records from any Odoo model via the XML-RPC search_read call, returning the chosen fields with optional offset/limit paging. Supply a model name and an optional Odoo domain (a list of [field, operator, value] criteria); an empty domain returns all records of the model. Read-only and idempotent. Use this generic reader when no model-specific get action fits. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"res.partner"` | Model. Model name. e.g.: res.partner. |
| `domain` | JSON | no | `[["is_company","=",true]]` | Search domains. A domain is a list of criteria, each criterion being a triple of (field_name, operator, value). See https://www.odoo.com/documentation/17.0/developer/reference/backend/orm.html#reference-orm-domains for details. |
| `fields` | array | no |  | Fields. Returns the requested fields of the records. When undefined, returns all fields. |
| `offset` | number | no |  | Offset. |
| `limit` | number | no |  | Limit. |
| `order` | string | no |  | Sort Order. Optional. Field names with asc or desc, separated by commas, for example "create_date desc, id desc". Leave empty for Odoo's default order. |

### `create_record`

**Custom Create Record.** Creates a new record in any Odoo model via the XML-RPC create call, given a model name and a JSON object of field names to values, and returns the new record id. Use this generic writer when no model-specific create action fits. Not idempotent — each call inserts a new record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"res.partner"` | Model. Model name. e.g.: res.partner. |
| `fields` | JSON | yes | `{"name":"New Partner","email":"newpartner@example.com"}` | Fields and Values. JSON object of field names and their corresponding values. |

Output fields:

- `id`: New Record ID (number)

### `update_record`

**Custom Update Record.** Overwrites fields on an existing Odoo record via the XML-RPC write call, given a model name, the target record id, and a JSON object of field names to new values. Requires a known record id (look it up first if needed). Idempotent — writing the same fields to the same id repeatedly leaves the record in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"res.partner"` | Model. Model name. e.g.: res.partner. |
| `recordId` | number | yes |  | Record ID. ID of the record to update. |
| `fields` | JSON | yes | `{"email":"updatedemail@example.com"}` | Fields and Values. JSON object of field names and their corresponding values. |

Output fields:

- `success`: Success (boolean)

### `custom_odoo_api_call`

**Custom API Call.** Invokes any Odoo model method over XML-RPC (e.g. search, read, search_read, create, write, unlink) with arbitrary positional and keyword arguments. Use as an escape hatch when no dedicated Odoo action covers the operation. Idempotency depends on the method called: reads and searches are safe to repeat, while create, write, and unlink are not. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The Odoo model to interact with (e.g., res.partner, product.product) |
| `method` | string | yes |  | Method. The method to call on the model (e.g., search_read, create, write) One of `"read"`, `"search_read"`, `"search_count"`, `"search"`, `"create"`, `"write"`, `"unlink"`, `"fields_get"`. |
| `method_params` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |

### `get_record`

**Get Record.** Reads one Odoo record of any model by ID and returns its fields, with many2one values split into an ID and a name. Use when the record is already known; to find records by criteria use a search action. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The kind of record. Type to search, for example "contact" or "sale". Admin users see every model; other users see the common ones. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. The record to use. Type to search by name. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | array | no |  | Fields. Optional. Field names to return, for example name, email. Leave empty for all fields except files and images. |

Output fields:

- `model`: Model
- `id`: Record ID (number)
- `record`: Record

### `delete_record`

**Delete Record.** Permanently deletes one Odoo record of any model (unlink). Odoo may refuse when other records depend on it; archiving via Run Record Action with action_archive is the recoverable alternative. Not idempotent: a second call fails because the record is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The kind of record. Type to search, for example "contact" or "sale". Admin users see every model; other users see the common ones. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record to Delete. The record to use. Type to search by name. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `model`: Model
- `deleted_id`: Deleted Record ID (number)

### `run_record_action`

**Run Record Action.** Calls a public business method on one Odoo record (for example action_confirm on sale.order, action_post on account.move, action_set_won on crm.lead, action_archive). Methods that return nothing are reported as success. unlink, write, update, create, name_create, load, web_save, copy, browse, sudo, with_user, with_context, with_env and private (_) methods are refused; use Delete Record, Custom Update Record, Custom Create Record or Get Record instead. This list steers you to the right action; it is not a security boundary, and Odoo access rights of the connected user still decide what the call may do. Not idempotent: most actions fail or repeat their effect when run twice. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The kind of record. Type to search, for example "contact" or "sale". Admin users see every model; other users see the common ones. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. The record to use. Type to search by name. A value the product loads from the provider, such as an id; write the value itself. |
| `method` | string | yes |  | Action (method name). The technical name of the button method. Examples: action_confirm (confirm a quotation), action_post (post an invoice), action_set_won (mark a lead won), action_archive (archive any record). Turn on developer mode in Odoo and hover a button to see its name. |
| `kwargs` | JSON | no |  | Extra Arguments. Optional JSON object of named arguments, for example {"lost_reason_id": 3} for action_set_lost. |

Output fields:

- `model`: Model
- `method`: Method
- `record_ids`: Record IDs
- `returned_none`: Method Returned Nothing (boolean)
- `result`: Result

### `post_chatter_message`

**Post Chatter Message.** Posts in the chatter of one Odoo record: an internal note (no email) or a message sent to followers. Works on models with a chatter (contacts, leads, orders, invoices, tasks). Not idempotent: each call posts another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The kind of record. Type to search, for example "contact" or "sale". Admin users see every model; other users see the common ones. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. The record to use. Type to search by name. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Message. Plain text. Odoo shows HTML tags as text when the message comes from the API. |
| `kind` | string | yes | `"note"` | Post As. An internal note is only visible to employees. A message is emailed to the followers of the record. One of `"note"`, `"message"`. |

Output fields:

- `message_id`: Message ID (number)
- `model`: Model
- `record_id`: Record ID (number)
- `message_type`: Posted As

### `attach_file`

**Attach File to Record.** Uploads a file as an attachment (ir.attachment) linked to one Odoo record, shown in its chatter attachments. Not idempotent: each call adds another attachment. If read_back_error is set, the record was created but could not be read back: do not create it again; open it with Get Record using the returned id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The kind of record. Type to search, for example "contact" or "sale". Admin users see every model; other users see the common ones. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. The record to use. Type to search by name. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |
| `file_name` | string | no |  | File Name. Optional. For example contract.pdf. Leave empty to keep the original name. |

Output fields:

- `id`: Attachment ID (number)
- `name`: File Name
- `mimetype`: MIME Type
- `file_size`: Size (filesize)
- `res_model`: Attached To Model
- `res_id`: Attached To Record ID (number)
- `type`: Storage Type
- `url`: URL (url)
- `create_date`: Created On (UTC) (datetime)
- `read_back_error`: Read-Back Error

### `create_lead`

**Create Lead or Opportunity.** Creates one Odoo CRM record (crm.lead) as a lead or an opportunity, with optional customer, contact details, revenue, stage, salesperson and team. Needs the CRM app. Not idempotent: each call creates a new record. If read_back_error is set, the record was created but could not be read back: do not create it again; open it with Get Record using the returned id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Title. For example "Website: 20 office chairs". |
| `lead_type` | string | no | `"opportunity"` | Type. Choose Lead only when Leads are turned on in CRM settings. One of `"opportunity"`, `"lead"`. |
| `partner_id` | string | no |  | Customer. Optional. An existing contact or company. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_name` | string | no |  | Contact Name. |
| `partner_name` | string | no |  | Company Name. Used when there is no existing customer. |
| `email_from` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `expected_revenue` | number | no |  | Expected Revenue. |
| `stage_id` | string | no |  | Stage. Optional. Leave empty for the first stage. A value the product loads from the provider, such as an id; write the value itself. |
| `user_id` | string | no |  | Salesperson. Optional. Leave empty to assign it to the connected user. A value the product loads from the provider, such as an id; write the value itself. |
| `team_id` | string | no |  | Sales Team. Optional. A value the product loads from the provider, such as an id; write the value itself. |
| `date_deadline` | ISO date-time string | no |  | Expected Closing. |
| `description` | string | no |  | Notes. |

Output fields:

- `id`: Lead ID (number)
- `name`: Title
- `type`: Type
- `active`: Active (boolean)
- `stage_id`: Stage ID (number)
- `stage_id_name`: Stage
- `probability`: Probability (%) (number)
- `expected_revenue`: Expected Revenue (number)
- `partner_id`: Customer ID (number)
- `partner_id_name`: Customer
- `contact_name`: Contact Name
- `partner_name`: Company Name
- `email_from`: Email (email)
- `phone`: Phone
- `user_id`: Salesperson ID (number)
- `user_id_name`: Salesperson
- `team_id`: Sales Team ID (number)
- `team_id_name`: Sales Team
- `tag_ids`: Tag IDs
- `priority`: Priority
- `date_deadline`: Expected Closing (date)
- `lost_reason_id`: Lost Reason ID (number)
- `lost_reason_id_name`: Lost Reason
- `won_status`: Won Status
- `create_date`: Created On (UTC) (datetime)
- `write_date`: Last Updated On (UTC) (datetime)
- `read_back_error`: Read-Back Error

### `create_sales_order`

**Create Quotation.** Creates a draft Odoo quotation (sale.order) for a customer with one or more product lines; confirm it afterwards with action_confirm. Needs the Sales app. Not idempotent: each call creates a new quotation. If read_back_error is set, the record was created but could not be read back: do not create it again; open it with Get Record using the returned id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partner_id` | string | yes |  | Customer. The contact or company the quotation is for. A value the product loads from the provider, such as an id; write the value itself. |
| `lines` | array | yes |  | Order Lines. Each item: { `product`, `quantity`?, `price_unit`?, `description`? }. |
| `client_order_ref` | string | no |  | Customer Reference. |
| `validity_date` | ISO date-time string | no |  | Expiration Date. |

Output fields:

- `id`: Order ID (number)
- `name`: Order Reference
- `state`: Status
- `partner_id`: Customer ID (number)
- `partner_id_name`: Customer
- `date_order`: Order Date (UTC) (datetime)
- `validity_date`: Expiration (date)
- `client_order_ref`: Customer Reference
- `amount_untaxed`: Untaxed Amount (number)
- `amount_tax`: Taxes (number)
- `amount_total`: Total (number)
- `currency_id`: Currency ID (number)
- `currency_id_name`: Currency
- `user_id`: Salesperson ID (number)
- `user_id_name`: Salesperson
- `invoice_status`: Invoice Status
- `create_date`: Created On (UTC) (datetime)
- `write_date`: Last Updated On (UTC) (datetime)
- `read_back_error`: Read-Back Error

### `find_invoices`

**Find Invoices.** Searches Odoo invoices, vendor bills and credit notes (account.move) by type, status, payment status, partner (including its contacts), number and invoice/due date ranges, newest first with offset paging. Needs Invoicing. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `move_types` | array | no |  | Type. Leave empty for all four types. One of `"out_invoice"`, `"out_refund"`, `"in_invoice"`, `"in_refund"`. |
| `state` | string | no |  | Status. One of `"draft"`, `"posted"`, `"cancel"`. |
| `payment_states` | array | no |  | Payment Status. One of `"not_paid"`, `"partial"`, `"in_payment"`, `"paid"`, `"reversed"`. |
| `partner_id` | string | no |  | Customer / Vendor. Optional. Includes invoices of its contacts. A value the product loads from the provider, such as an id; write the value itself. |
| `number` | string | no |  | Number or Reference Contains. |
| `invoice_date_from` | ISO date-time string | no |  | Invoice Date From. |
| `invoice_date_to` | ISO date-time string | no |  | Invoice Date To. |
| `due_date_from` | ISO date-time string | no |  | Due Date From. |
| `due_date_to` | ISO date-time string | no |  | Due Date To. |
| `limit` | number | no |  | Limit. Default 50, maximum 500. |
| `offset` | number | no |  | Offset. Skip this many invoices (for paging). |

Output fields:

- `model`: Model
- `count`: Count (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)
- `records`: Invoices
- `records[].id`: Invoice ID (number)
- `records[].name`: Number
- `records[].move_type`: Type
- `records[].state`: Status
- `records[].payment_state`: Payment Status
- `records[].partner_id`: Partner ID (number)
- `records[].partner_id_name`: Partner
- `records[].invoice_date`: Invoice Date (date)
- `records[].invoice_date_due`: Due Date (date)
- `records[].ref`: Reference
- `records[].payment_reference`: Payment Reference
- `records[].invoice_origin`: Source Document
- `records[].amount_untaxed`: Untaxed Amount (number)
- `records[].amount_tax`: Taxes (number)
- `records[].amount_total`: Total (number)
- `records[].amount_residual`: Amount Due (number)
- `records[].currency_id`: Currency ID (number)
- `records[].currency_id_name`: Currency
- `records[].create_date`: Created On (UTC) (datetime)
- `records[].write_date`: Last Updated On (UTC) (datetime)

### `odoo_attach_file`

**Attach File.** Uploads a file (URL or base64) as an Odoo attachment (ir.attachment) linked to one record, for example a PDF on a sale order or invoice. Not idempotent: each call adds another attachment. If read_back_error is set, the record was created but could not be read back: do not create it again; read it with odoo_get_records using the returned id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Technical model name, for example res.partner (contacts), crm.lead, sale.order, account.move (invoices), product.product, project.task. Resolve unknown names with odoo_list_models. |
| `record_id` | number | yes |  | Record ID. ID of the record to attach the file to. |
| `file` | file | yes |  | File. A file URL or base64 content. Files are not supported; an action that needs one fails. |
| `file_name` | string | no |  | File Name. For example contract.pdf. Defaults to the source name. |
| `mimetype` | string | no |  | MIME Type. For example application/pdf. Odoo guesses it when empty. |

Output fields:

- `id`: Attachment ID (number)
- `name`: File Name
- `mimetype`: MIME Type
- `file_size`: Size (filesize)
- `res_model`: Attached To Model
- `res_id`: Attached To Record ID (number)
- `type`: Storage Type
- `url`: URL (url)
- `create_date`: Created On (UTC) (datetime)
- `read_back_error`: Read-Back Error

### `odoo_call_method`

**Call Model Method.** Calls any public Odoo model method (execute_kw) on the given record IDs with extra positional and keyword arguments, for business verbs without a dedicated action, for example action_archive, action_unarchive, message_subscribe, action_cancel. A method that returns nothing is reported as success with returned_none true. unlink, write, update, create, name_create, load, web_save, copy, browse, sudo, with_user, with_context, with_env and private (_) methods are refused: use odoo_delete_records, odoo_update_records, odoo_create_record or odoo_get_records instead. This list steers you to the right action; it is not a security boundary, and Odoo access rights of the connected user still decide what the call may do. Not idempotent in general; depends on the method. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Technical model name, for example res.partner (contacts), crm.lead, sale.order, account.move (invoices), product.product, project.task. Resolve unknown names with odoo_list_models. |
| `method` | string | yes |  | Method. Public method name, for example action_archive. Private (_) and generic CRUD methods such as unlink or write are refused. |
| `ids` | array | no |  | Record IDs. Records to call the method on, for example [12]. Leave empty for model-level methods such as default_get. |
| `args` | JSON | no |  | Extra Positional Arguments. JSON list passed after the record IDs, for example [["name", "email"]] for default_get. Usually empty. |
| `kwargs` | JSON | no |  | Keyword Arguments. JSON object of named arguments, for example {"partner_ids": [7]} for message_subscribe. |

Output fields:

- `model`: Model
- `method`: Method
- `record_ids`: Record IDs
- `returned_none`: Method Returned Nothing (boolean)
- `result`: Result

### `odoo_confirm_sale_order`

**Confirm Quotation.** Confirms one Odoo quotation into a sales order (action_confirm), which can create deliveries and lock pricing. Only draft or sent quotations can be confirmed. Needs the Sales app. Not idempotent: a second call fails because the order is no longer a quotation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_id` | number | yes |  | Order ID. sale.order ID. |

Output fields:

- `id`: Order ID (number)
- `name`: Order Reference
- `state`: Status
- `partner_id`: Customer ID (number)
- `partner_id_name`: Customer
- `date_order`: Order Date (UTC) (datetime)
- `validity_date`: Expiration (date)
- `client_order_ref`: Customer Reference
- `amount_untaxed`: Untaxed Amount (number)
- `amount_tax`: Taxes (number)
- `amount_total`: Total (number)
- `currency_id`: Currency ID (number)
- `currency_id_name`: Currency
- `user_id`: Salesperson ID (number)
- `user_id_name`: Salesperson
- `invoice_status`: Invoice Status
- `create_date`: Created On (UTC) (datetime)
- `write_date`: Last Updated On (UTC) (datetime)

### `odoo_count_records`

**Count Records.** Counts records of any Odoo model matching an Odoo domain (search_count) without reading them. Use for totals, since search results are paged. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Technical model name, for example res.partner (contacts), crm.lead, sale.order, account.move (invoices), product.product, project.task. Resolve unknown names with odoo_list_models. |
| `domain` | JSON | no |  | Domain. Odoo domain: a JSON list of [field, operator, value] conditions, ANDed together; use "\|" before two conditions for OR. Example [["is_company", "=", true], ["country_id.code", "=", "US"]]. Empty = all records. |

Output fields:

- `model`: Model
- `count`: Count (number)

### `odoo_create_invoice`

**Create Invoice.** Creates a draft Odoo invoice (account.move): customer invoice (default), vendor bill or credit note, for a partner with up to 200 lines (product ID/reference and/or description, quantity, unit price, optional tax IDs). Post it with odoo_post_invoice. Needs Invoicing. Not idempotent: each call creates a new draft. If read_back_error is set, the record was created but could not be read back: do not create it again; read it with odoo_get_records using the returned id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `move_type` | string | no |  | Type. out_invoice (default), in_invoice (vendor bill), out_refund, in_refund. One of `"out_invoice"`, `"in_invoice"`, `"out_refund"`, `"in_refund"`. |
| `partner_id` | number | yes |  | Partner ID. Customer or vendor res.partner ID. |
| `lines` | JSON | yes |  | Lines. JSON list, for example [{"product": 12, "quantity": 2}, {"description": "Consulting", "quantity": 3, "price_unit": 150, "tax_ids": [1]}]. Omit tax_ids to use the product default taxes. |
| `invoice_date` | string | no |  | Invoice Date. Date, for example 2026-09-29. Omit to set it when posting. |
| `invoice_date_due` | string | no |  | Due Date. Date. Omit to use the payment terms. |
| `ref` | string | no |  | Reference. Customer reference or vendor bill number. |

Output fields:

- `id`: Invoice ID (number)
- `name`: Number
- `move_type`: Type
- `state`: Status
- `payment_state`: Payment Status
- `partner_id`: Partner ID (number)
- `partner_id_name`: Partner
- `invoice_date`: Invoice Date (date)
- `invoice_date_due`: Due Date (date)
- `ref`: Reference
- `payment_reference`: Payment Reference
- `invoice_origin`: Source Document
- `amount_untaxed`: Untaxed Amount (number)
- `amount_tax`: Taxes (number)
- `amount_total`: Total (number)
- `amount_residual`: Amount Due (number)
- `currency_id`: Currency ID (number)
- `currency_id_name`: Currency
- `create_date`: Created On (UTC) (datetime)
- `write_date`: Last Updated On (UTC) (datetime)
- `read_back_error`: Read-Back Error

### `odoo_create_lead`

**Create Lead.** Creates one Odoo CRM record (crm.lead) as a lead or an opportunity (default), with optional customer ID, contact details, expected revenue, probability, stage, salesperson, team, tags and closing date. Needs the CRM app; the "lead" type only shows in Odoo when Leads are enabled in CRM settings. Not idempotent: each call creates a new record. If read_back_error is set, the record was created but could not be read back: do not create it again; read it with odoo_get_records using the returned id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Title. For example "Website: 20 office chairs". |
| `type` | string | no |  | Type. opportunity (default) or lead. One of `"opportunity"`, `"lead"`. |
| `partner_id` | number | no |  | Customer ID. res.partner ID from odoo_find_partners. |
| `contact_name` | string | no |  | Contact Name. Person to talk to. |
| `partner_name` | string | no |  | Company Name. Company name when there is no customer ID yet. |
| `email_from` | string | no |  | Email. Contact email. |
| `phone` | string | no |  | Phone. Contact phone. |
| `expected_revenue` | number | no |  | Expected Revenue. In the company currency. |
| `probability` | number | no |  | Probability. 0 to 100. Omit to let Odoo compute it. |
| `stage_id` | number | no |  | Stage ID. crm.stage ID from odoo_list_crm_stages. Omit for the first stage. |
| `user_id` | number | no |  | Salesperson User ID. res.users ID from odoo_list_users. Omit for the connected user. |
| `team_id` | number | no |  | Sales Team ID. crm.team ID. |
| `tag_ids` | array | no |  | Tag IDs. crm.tag IDs, for example [1, 3]. Resolve names with odoo_name_search on crm.tag. |
| `priority` | string | no |  | Priority. "0" normal to "3" very high. One of `"0"`, `"1"`, `"2"`, `"3"`. |
| `date_deadline` | string | no |  | Expected Closing. Date, for example 2026-10-31. |
| `description` | string | no |  | Notes. Internal notes. |

Output fields:

- `id`: Lead ID (number)
- `name`: Title
- `type`: Type
- `active`: Active (boolean)
- `stage_id`: Stage ID (number)
- `stage_id_name`: Stage
- `probability`: Probability (%) (number)
- `expected_revenue`: Expected Revenue (number)
- `partner_id`: Customer ID (number)
- `partner_id_name`: Customer
- `contact_name`: Contact Name
- `partner_name`: Company Name
- `email_from`: Email (email)
- `phone`: Phone
- `user_id`: Salesperson ID (number)
- `user_id_name`: Salesperson
- `team_id`: Sales Team ID (number)
- `team_id_name`: Sales Team
- `tag_ids`: Tag IDs
- `priority`: Priority
- `date_deadline`: Expected Closing (date)
- `lost_reason_id`: Lost Reason ID (number)
- `lost_reason_id_name`: Lost Reason
- `won_status`: Won Status
- `create_date`: Created On (UTC) (datetime)
- `write_date`: Last Updated On (UTC) (datetime)
- `read_back_error`: Read-Back Error

### `odoo_create_partner`

**Create Contact.** Creates one Odoo contact (res.partner): a person or a company, optionally linked to a parent company, with email, phone, job, address (country by ISO code) and tax ID. Always creates; call odoo_find_partners first to avoid duplicates. Not idempotent. If read_back_error is set, the record was created but could not be read back: do not create it again; read it with odoo_get_records using the returned id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Full name of the person or company. |
| `is_company` | boolean | no |  | Is a Company. true for a company, false or omitted for a person. |
| `parent_id` | number | no |  | Parent Company ID. For a person: the ID of the company they work for. |
| `email` | string | no |  | Email. For example jane@acme.example. |
| `phone` | string | no |  | Phone. For example +1 555 0100. |
| `function` | string | no |  | Job Position. For example Buyer. |
| `website` | string | no |  | Website. For example https://acme.example. |
| `vat` | string | no |  | Tax ID. VAT or tax number. |
| `ref` | string | no |  | Internal Reference. Your own code for this contact. |
| `street` | string | no |  | Street. Street and number. |
| `street2` | string | no |  | Street 2. Second address line. |
| `city` | string | no |  | City. City. |
| `zip` | string | no |  | ZIP. Postal code. |
| `country_code` | string | no |  | Country Code. Two-letter ISO code, for example US. |
| `customer_rank` | number | no |  | Customer Rank. Needs Invoicing. Set 1 to mark as a customer. |
| `supplier_rank` | number | no |  | Supplier Rank. Needs Invoicing. Set 1 to mark as a vendor. |

Output fields:

- `id`: Contact ID (number)
- `display_name`: Display Name
- `name`: Name
- `is_company`: Is a Company (boolean)
- `parent_id`: Parent Company ID (number)
- `parent_id_name`: Parent Company
- `email`: Email (email)
- `phone`: Phone
- `mobile`: Mobile
- `website`: Website (url)
- `function`: Job Position
- `ref`: Reference
- `vat`: Tax ID
- `street`: Street
- `street2`: Street 2
- `city`: City
- `zip`: ZIP
- `state_id`: State ID (number)
- `state_id_name`: State
- `country_id`: Country ID (number)
- `country_id_name`: Country
- `company_name`: Company Name (free text)
- `lang`: Language
- `active`: Active (boolean)
- `create_date`: Created On (UTC) (datetime)
- `write_date`: Last Updated On (UTC) (datetime)
- `read_back_error`: Read-Back Error

### `odoo_create_product`

**Create Product.** Creates one Odoo product (product.template) of kind goods (default), service or storable (inventory-tracked, needs the Inventory app), with sales price, cost, internal reference and barcode; maps the kind to the right fields for Odoo 16-17 or 18+. Returns the product variant ID used on order and invoice lines (id is null and product_tmpl_id is set if the variant could not be found). Not idempotent: each call creates a new product. If read_back_error is set, the record was created but could not be read back: do not create it again; read it with odoo_get_records using the returned id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Product name. |
| `kind` | string | no |  | Kind. goods (default), service, or storable (inventory-tracked goods). One of `"goods"`, `"service"`, `"storable"`. |
| `list_price` | number | no |  | Sales Price. Unit sales price. |
| `standard_price` | number | no |  | Cost. Unit cost. |
| `default_code` | string | no |  | Internal Reference. For example FURN_7800. |
| `barcode` | string | no |  | Barcode. Must be unique in Odoo. |
| `sale_ok` | boolean | no |  | Can Be Sold. Default true in Odoo. |
| `purchase_ok` | boolean | no |  | Can Be Purchased. Default true in Odoo. |

Output fields:

- `id`: Product Variant ID (number)
- `display_name`: Display Name
- `name`: Name
- `default_code`: Internal Reference
- `barcode`: Barcode
- `lst_price`: Sales Price (number)
- `standard_price`: Cost (number)
- `type`: Product Type
- `detailed_type`: Detailed Type (Odoo 16/17)
- `is_storable`: Track Inventory (Odoo 18+) (boolean)
- `sale_ok`: Can Be Sold (boolean)
- `purchase_ok`: Can Be Purchased (boolean)
- `uom_id`: Unit of Measure ID (number)
- `uom_id_name`: Unit of Measure
- `categ_id`: Category ID (number)
- `categ_id_name`: Category
- `product_tmpl_id`: Product Template ID (number)
- `product_tmpl_id_name`: Product Template
- `active`: Active (boolean)
- `read_back_error`: Read-Back Error

### `odoo_create_record`

**Create Record.** Creates one record in any Odoo model from field values (create) and returns its id and display name. Use when no app-specific create action fits; check required fields with odoo_get_model_fields first. Not idempotent: each call creates a new record. If read_back_error is set, the record was created but could not be read back: do not create it again; read it with odoo_get_records using the returned id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Technical model name, for example res.partner (contacts), crm.lead, sale.order, account.move (invoices), product.product, project.task. Resolve unknown names with odoo_list_models. |
| `values` | JSON | yes |  | Values. JSON object of field values, for example {"name": "Acme", "is_company": true}. Many2one fields take an ID. Many2many/one2many fields take command lists: [[6, 0, [3, 4]]] replaces with IDs 3 and 4, [[4, 7]] adds ID 7, [[0, 0, {"name": "line"}]] creates a line. |

Output fields:

- `id`: New Record ID (number)
- `model`: Model
- `display_name`: Display Name
- `read_back_error`: Read-Back Error

### `odoo_create_sale_order`

**Create Quotation.** Creates a draft Odoo quotation (sale.order) for a customer with up to 200 product lines (product ID or internal reference, quantity, optional unit price and description); prices and taxes come from Odoo when omitted. Confirm it with odoo_confirm_sale_order. Needs the Sales app. Not idempotent: each call creates a new quotation. If read_back_error is set, the record was created but could not be read back: do not create it again; read it with odoo_get_records using the returned id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partner_id` | number | yes |  | Customer ID. res.partner ID from odoo_find_partners. |
| `lines` | JSON | yes |  | Lines. JSON list of lines, for example [{"product": 12, "quantity": 2}, {"product": "FURN_7800", "quantity": 1, "price_unit": 99.5, "description": "Custom desk"}]. product = product.product ID or internal reference. |
| `client_order_ref` | string | no |  | Customer Reference. For example the customer PO number. |
| `validity_date` | string | no |  | Expiration Date. Date, for example 2026-10-31. |
| `user_id` | number | no |  | Salesperson User ID. res.users ID. Omit for the connected user. |

Output fields:

- `id`: Order ID (number)
- `name`: Order Reference
- `state`: Status
- `partner_id`: Customer ID (number)
- `partner_id_name`: Customer
- `date_order`: Order Date (UTC) (datetime)
- `validity_date`: Expiration (date)
- `client_order_ref`: Customer Reference
- `amount_untaxed`: Untaxed Amount (number)
- `amount_tax`: Taxes (number)
- `amount_total`: Total (number)
- `currency_id`: Currency ID (number)
- `currency_id_name`: Currency
- `user_id`: Salesperson ID (number)
- `user_id_name`: Salesperson
- `invoice_status`: Invoice Status
- `create_date`: Created On (UTC) (datetime)
- `write_date`: Last Updated On (UTC) (datetime)
- `read_back_error`: Read-Back Error

### `odoo_create_task`

**Create Task.** Creates one Odoo project task (project.task) in a project, with optional description, assignees, deadline, tags, priority, customer and parent task (sub-task). Needs the Project app. Not idempotent: each call creates a new task. If read_back_error is set, the record was created but could not be read back: do not create it again; read it with odoo_get_records using the returned id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | number | yes |  | Project ID. project.project ID from odoo_list_projects. |
| `name` | string | yes |  | Title. Task title. |
| `description` | string | no |  | Description. Task description (plain text or simple HTML). |
| `user_ids` | array | no |  | Assignee User IDs. res.users IDs from odoo_list_users, for example [2]. |
| `date_deadline` | string | no |  | Deadline. Date, for example 2026-10-15. |
| `tag_ids` | array | no |  | Tag IDs. project.tags IDs. |
| `priority` | string | no |  | Priority. "0" normal (default) or "1" high. One of `"0"`, `"1"`. |
| `partner_id` | number | no |  | Customer ID. res.partner ID. |
| `parent_id` | number | no |  | Parent Task ID. Create as a sub-task of this task. |

Output fields:

- `id`: Task ID (number)
- `name`: Title
- `project_id`: Project ID (number)
- `project_id_name`: Project
- `stage_id`: Stage ID (number)
- `stage_id_name`: Stage
- `user_ids`: Assignee User IDs
- `date_deadline`: Deadline
- `priority`: Priority
- `state`: State (Odoo 17+)
- `kanban_state`: Kanban State (Odoo 16)
- `tag_ids`: Tag IDs
- `parent_id`: Parent Task ID (number)
- `parent_id_name`: Parent Task
- `partner_id`: Customer ID (number)
- `partner_id_name`: Customer
- `create_date`: Created On (UTC) (datetime)
- `write_date`: Last Updated On (UTC) (datetime)
- `read_back_error`: Read-Back Error

### `odoo_delete_records`

**Delete Records.** Permanently deletes records of any Odoo model (unlink); this cannot be undone and Odoo refuses when other records depend on them. Prefer archiving with odoo_call_method action_archive when the record should stay recoverable. Not idempotent: a second call fails because the records are gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Technical model name, for example res.partner (contacts), crm.lead, sale.order, account.move (invoices), product.product, project.task. Resolve unknown names with odoo_list_models. |
| `ids` | array | yes |  | Record IDs. IDs of the records to delete, for example [12]. At most 100. |

Output fields:

- `success`: Success (boolean)
- `model`: Model
- `deleted_ids`: Deleted IDs

### `odoo_download_attachment`

**Download Attachment.** Downloads one Odoo attachment (ir.attachment) by ID and returns it as a file reference usable by later steps; link-type attachments return their URL and no file. Files larger than the instance file limit (AP_MAX_FILE_SIZE_MB, default 25 MB) are refused before download. Get IDs from odoo_list_record_attachments. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `attachment_id` | number | yes |  | Attachment ID. From odoo_list_record_attachments. |

Output fields:

- `id`: Attachment ID (number)
- `name`: File Name
- `mimetype`: MIME Type
- `file_size`: Size (filesize)
- `type`: Storage Type
- `url`: External URL (url)
- `file`: File (url)

### `odoo_find_invoices`

**Find Invoices.** Searches Odoo invoices, vendor bills and credit notes (account.move) by type, status, payment status, partner (including its contacts), number/reference text and invoice or due date ranges, newest first with offset paging. Use for unpaid or overdue invoice questions. Needs Invoicing. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `move_types` | array | no |  | Types. Any of out_invoice, in_invoice, out_refund, in_refund. Omit for all four. |
| `state` | string | no |  | Status. draft, posted or cancel. Omit for all. One of `"draft"`, `"posted"`, `"cancel"`. |
| `payment_states` | array | no |  | Payment Statuses. Any of not_paid, partial, in_payment, paid, reversed (blocked on 18+). For unpaid use ["not_paid", "partial"]. |
| `partner_id` | number | no |  | Partner ID. res.partner ID; includes its contacts. |
| `number` | string | no |  | Number or Reference Contains. For example INV/2026/0007. |
| `invoice_date_from` | string | no |  | Invoice Date From. Date, for example 2026-09-01. |
| `invoice_date_to` | string | no |  | Invoice Date To. Date. |
| `due_date_from` | string | no |  | Due Date From. Date. |
| `due_date_to` | string | no |  | Due Date To. Date. For overdue invoices use yesterday. |
| `limit` | number | no |  | Limit. Maximum records to return. Default 50, maximum 500. Check has_more and pass next_offset as offset for the next page. |
| `offset` | number | no |  | Offset. Number of records to skip, for paging. Use next_offset from the previous call. |

Output fields:

- `model`: Model
- `count`: Count (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)
- `records`: Invoices
- `records[].id`: Invoice ID (number)
- `records[].name`: Number
- `records[].move_type`: Type
- `records[].state`: Status
- `records[].payment_state`: Payment Status
- `records[].partner_id`: Partner ID (number)
- `records[].partner_id_name`: Partner
- `records[].invoice_date`: Invoice Date (date)
- `records[].invoice_date_due`: Due Date (date)
- `records[].ref`: Reference
- `records[].payment_reference`: Payment Reference
- `records[].invoice_origin`: Source Document
- `records[].amount_untaxed`: Untaxed Amount (number)
- `records[].amount_tax`: Taxes (number)
- `records[].amount_total`: Total (number)
- `records[].amount_residual`: Amount Due (number)
- `records[].currency_id`: Currency ID (number)
- `records[].currency_id_name`: Currency
- `records[].create_date`: Created On (UTC) (datetime)
- `records[].write_date`: Last Updated On (UTC) (datetime)

### `odoo_find_leads`

**Find Leads.** Searches Odoo CRM leads and opportunities (crm.lead) by free text (title, contact, company, email), type, stage, salesperson, team, customer and creation date, newest first with offset paging. Lost (archived) records are excluded unless include_lost is true. Needs the CRM app. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Text. Matches title, contact name, company name or email. |
| `type` | string | no |  | Type. Omit for both. One of `"lead"`, `"opportunity"`. |
| `stage_id` | number | no |  | Stage ID. crm.stage ID. |
| `user_id` | number | no |  | Salesperson User ID. res.users ID. |
| `team_id` | number | no |  | Sales Team ID. crm.team ID. |
| `partner_id` | number | no |  | Customer ID. res.partner ID. |
| `created_after` | string | no |  | Created After. ISO date or datetime, for example 2026-09-01 or 2026-09-01T08:00:00Z (UTC when no zone). |
| `include_lost` | boolean | no |  | Include Lost. Also return lost (archived) leads. |
| `limit` | number | no |  | Limit. Maximum records to return. Default 50, maximum 500. Check has_more and pass next_offset as offset for the next page. |
| `offset` | number | no |  | Offset. Number of records to skip, for paging. Use next_offset from the previous call. |

Output fields:

- `model`: Model
- `count`: Count (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)
- `records`: Leads
- `records[].id`: Lead ID (number)
- `records[].name`: Title
- `records[].type`: Type
- `records[].active`: Active (boolean)
- `records[].stage_id`: Stage ID (number)
- `records[].stage_id_name`: Stage
- `records[].probability`: Probability (%) (number)
- `records[].expected_revenue`: Expected Revenue (number)
- `records[].partner_id`: Customer ID (number)
- `records[].partner_id_name`: Customer
- `records[].contact_name`: Contact Name
- `records[].partner_name`: Company Name
- `records[].email_from`: Email (email)
- `records[].phone`: Phone
- `records[].user_id`: Salesperson ID (number)
- `records[].user_id_name`: Salesperson
- `records[].team_id`: Sales Team ID (number)
- `records[].team_id_name`: Sales Team
- `records[].tag_ids`: Tag IDs
- `records[].priority`: Priority
- `records[].date_deadline`: Expected Closing (date)
- `records[].lost_reason_id`: Lost Reason ID (number)
- `records[].lost_reason_id_name`: Lost Reason
- `records[].won_status`: Won Status
- `records[].create_date`: Created On (UTC) (datetime)
- `records[].write_date`: Last Updated On (UTC) (datetime)

### `odoo_find_partners`

**Find Contacts.** Searches Odoo contacts and companies (res.partner) by free text (name, email, phone, reference), exact email, person-or-company, parent company and country code, with offset paging. Use to get a partner ID before creating leads, orders or invoices. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Text. Matches name, email, phone or internal reference (contains, any case). |
| `email` | string | no |  | Email (exact). Exact email address, any case. |
| `is_company` | boolean | no |  | Companies Only. true = only companies, false = only people. Omit for both. |
| `parent_id` | number | no |  | Parent Company ID. Only contacts that belong to this company. |
| `country_code` | string | no |  | Country Code. Two-letter ISO code, for example US or BE. |
| `include_archived` | boolean | no |  | Include Archived. Also return archived contacts. |
| `limit` | number | no |  | Limit. Maximum records to return. Default 50, maximum 500. Check has_more and pass next_offset as offset for the next page. |
| `offset` | number | no |  | Offset. Number of records to skip, for paging. Use next_offset from the previous call. |

Output fields:

- `model`: Model
- `count`: Count (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)
- `records`: Contacts
- `records[].id`: Contact ID (number)
- `records[].display_name`: Display Name
- `records[].name`: Name
- `records[].is_company`: Is a Company (boolean)
- `records[].parent_id`: Parent Company ID (number)
- `records[].parent_id_name`: Parent Company
- `records[].email`: Email (email)
- `records[].phone`: Phone
- `records[].mobile`: Mobile
- `records[].website`: Website (url)
- `records[].function`: Job Position
- `records[].ref`: Reference
- `records[].vat`: Tax ID
- `records[].street`: Street
- `records[].street2`: Street 2
- `records[].city`: City
- `records[].zip`: ZIP
- `records[].state_id`: State ID (number)
- `records[].state_id_name`: State
- `records[].country_id`: Country ID (number)
- `records[].country_id_name`: Country
- `records[].company_name`: Company Name (free text)
- `records[].lang`: Language
- `records[].active`: Active (boolean)
- `records[].create_date`: Created On (UTC) (datetime)
- `records[].write_date`: Last Updated On (UTC) (datetime)

### `odoo_find_products`

**Find Products.** Searches Odoo product variants (product.product) by name, internal reference or barcode, optionally only sellable ones, with offset paging. Returns the variant IDs that sales order and invoice lines need. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Text. Matches name, internal reference or barcode (contains). |
| `sale_ok` | boolean | no |  | Sellable Only. Only products that can be sold. |
| `limit` | number | no |  | Limit. Maximum records to return. Default 50, maximum 500. Check has_more and pass next_offset as offset for the next page. |
| `offset` | number | no |  | Offset. Number of records to skip, for paging. Use next_offset from the previous call. |

Output fields:

- `model`: Model
- `count`: Count (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)
- `records`: Products
- `records[].id`: Product Variant ID (number)
- `records[].display_name`: Display Name
- `records[].name`: Name
- `records[].default_code`: Internal Reference
- `records[].barcode`: Barcode
- `records[].lst_price`: Sales Price (number)
- `records[].standard_price`: Cost (number)
- `records[].type`: Product Type
- `records[].detailed_type`: Detailed Type (Odoo 16/17)
- `records[].is_storable`: Track Inventory (Odoo 18+) (boolean)
- `records[].sale_ok`: Can Be Sold (boolean)
- `records[].purchase_ok`: Can Be Purchased (boolean)
- `records[].uom_id`: Unit of Measure ID (number)
- `records[].uom_id_name`: Unit of Measure
- `records[].categ_id`: Category ID (number)
- `records[].categ_id_name`: Category
- `records[].product_tmpl_id`: Product Template ID (number)
- `records[].product_tmpl_id_name`: Product Template
- `records[].active`: Active (boolean)

### `odoo_find_sale_orders`

**Find Sales Orders.** Searches Odoo quotations and sales orders (sale.order) by status, customer (including its contacts), order reference or customer reference, and order date range, newest first with offset paging. Needs the Sales app. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `states` | array | no |  | Status. draft = quotation, sent = quotation sent, sale = sales order, cancel = cancelled (done = locked, Odoo 16 only). Omit for all. One of `"draft"`, `"sent"`, `"sale"`, `"done"`, `"cancel"`. |
| `partner_id` | number | no |  | Customer ID. res.partner ID; includes orders of its contacts. |
| `reference` | string | no |  | Reference Contains. Matches the order number (S00012) or the customer reference. |
| `date_from` | string | no |  | Order Date From. ISO date or datetime (UTC when no zone). |
| `date_to` | string | no |  | Order Date To. ISO date or datetime (UTC when no zone). A date alone includes that whole day. |
| `limit` | number | no |  | Limit. Maximum records to return. Default 50, maximum 500. Check has_more and pass next_offset as offset for the next page. |
| `offset` | number | no |  | Offset. Number of records to skip, for paging. Use next_offset from the previous call. |

Output fields:

- `model`: Model
- `count`: Count (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)
- `records`: Sales Orders
- `records[].id`: Order ID (number)
- `records[].name`: Order Reference
- `records[].state`: Status
- `records[].partner_id`: Customer ID (number)
- `records[].partner_id_name`: Customer
- `records[].date_order`: Order Date (UTC) (datetime)
- `records[].validity_date`: Expiration (date)
- `records[].client_order_ref`: Customer Reference
- `records[].amount_untaxed`: Untaxed Amount (number)
- `records[].amount_tax`: Taxes (number)
- `records[].amount_total`: Total (number)
- `records[].currency_id`: Currency ID (number)
- `records[].currency_id_name`: Currency
- `records[].user_id`: Salesperson ID (number)
- `records[].user_id_name`: Salesperson
- `records[].invoice_status`: Invoice Status
- `records[].create_date`: Created On (UTC) (datetime)
- `records[].write_date`: Last Updated On (UTC) (datetime)

### `odoo_find_tasks`

**Find Tasks.** Searches Odoo project tasks (project.task) by project, assignee, stage, customer and title text, newest first with offset paging. Needs the Project app. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | number | no |  | Project ID. project.project ID. |
| `user_id` | number | no |  | Assignee User ID. Tasks assigned to this res.users ID. |
| `stage_id` | number | no |  | Stage ID. project.task.type ID. |
| `partner_id` | number | no |  | Customer ID. res.partner ID. |
| `query` | string | no |  | Title Contains. Part of the task title. |
| `limit` | number | no |  | Limit. Maximum records to return. Default 50, maximum 500. Check has_more and pass next_offset as offset for the next page. |
| `offset` | number | no |  | Offset. Number of records to skip, for paging. Use next_offset from the previous call. |

Output fields:

- `model`: Model
- `count`: Count (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)
- `records`: Tasks
- `records[].id`: Task ID (number)
- `records[].name`: Title
- `records[].project_id`: Project ID (number)
- `records[].project_id_name`: Project
- `records[].stage_id`: Stage ID (number)
- `records[].stage_id_name`: Stage
- `records[].user_ids`: Assignee User IDs
- `records[].date_deadline`: Deadline
- `records[].priority`: Priority
- `records[].state`: State (Odoo 17+)
- `records[].kanban_state`: Kanban State (Odoo 16)
- `records[].tag_ids`: Tag IDs
- `records[].parent_id`: Parent Task ID (number)
- `records[].parent_id_name`: Parent Task
- `records[].partner_id`: Customer ID (number)
- `records[].partner_id_name`: Customer
- `records[].create_date`: Created On (UTC) (datetime)
- `records[].write_date`: Last Updated On (UTC) (datetime)

### `odoo_get_connection_info`

**Get Connection Info.** Returns the Odoo server version, the connected user (id, name, company, language, time zone) and which apps this user can use (contacts, CRM, sales, invoicing, products, project, inventory). Call it first to learn which app-specific actions will work and how field names differ by version. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `server_version`: Server Version
- `server_serie`: Server Series
- `protocol_version`: Protocol Version (number)
- `database`: Database
- `uid`: User ID (number)
- `user_name`: User Name
- `user_login`: User Login
- `user_email`: User Email (email)
- `company_id`: Company ID (number)
- `company_id_name`: Company
- `lang`: Language
- `tz`: Time Zone
- `is_admin`: Is Administrator (boolean)
- `has_contacts`: Contacts Available (boolean)
- `has_crm`: CRM Available (boolean)
- `has_sales`: Sales Available (boolean)
- `has_invoicing`: Invoicing Available (boolean)
- `has_products`: Products Available (boolean)
- `has_project`: Project Available (boolean)
- `has_inventory`: Inventory Available (boolean)
- `installed_apps`: Installed Apps

### `odoo_get_model_fields`

**Get Model Fields.** Describes the fields of one Odoo model on this server (fields_get): name, label, type, required, read-only, related model and allowed selection values. Use before creating or updating records or writing a domain, because field names differ between Odoo versions and installed apps. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Technical model name, for example res.partner (contacts), crm.lead, sale.order, account.move (invoices), product.product, project.task. Resolve unknown names with odoo_list_models. |
| `field_names` | array | no |  | Only These Fields. Optional list of field names to describe, for example ["partner_id", "state"]. Empty = all fields. |
| `required_only` | boolean | no |  | Required Fields Only. Only return fields that must be set when creating a record. |

Output fields:

- `model`: Model
- `count`: Count (number)
- `fields`: Fields
- `fields[].name`: Field Name
- `fields[].label`: Label
- `fields[].type`: Type
- `fields[].required`: Required (boolean)
- `fields[].readonly`: Read Only (boolean)
- `fields[].relation`: Related Model
- `fields[].selection`: Allowed Values
- `fields[].selection[].value`: Value
- `fields[].selection[].label`: Label
- `fields[].help`: Help

### `odoo_get_records`

**Get Records by ID.** Reads records of any Odoo model by their IDs (read) and returns the chosen fields, many2one values split into field and field_name. Use when the IDs are known; fails if any ID does not exist or is not readable. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Technical model name, for example res.partner (contacts), crm.lead, sale.order, account.move (invoices), product.product, project.task. Resolve unknown names with odoo_list_models. |
| `ids` | array | yes |  | Record IDs. Record IDs, for example [12, 15]. At most 500. |
| `fields` | array | no |  | Fields. Field names to return, for example ["name", "email", "partner_id"]. Leave empty for every field except binary ones (files, images). Get names from odoo_get_model_fields. |

Output fields:

- `model`: Model
- `count`: Count (number)
- `records`: Records

### `odoo_list_crm_stages`

**List CRM Stages.** Lists Odoo CRM pipeline stages (crm.stage) in pipeline order, with whether each is the won stage and which sales teams use it; optionally only the stages available to one team. Use to get a stage ID for creating or moving leads. Needs the CRM app. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | number | no |  | Sales Team ID. Only stages used by this team, plus shared ones. |
| `limit` | number | no |  | Limit. Maximum records to return. Default 100, maximum 500. Check has_more and pass next_offset as offset for the next page. |
| `offset` | number | no |  | Offset. Number of records to skip, for paging. Use next_offset from the previous call. |

Output fields:

- `model`: Model
- `count`: Count (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)
- `records`: Stages
- `records[].id`: Stage ID (number)
- `records[].name`: Name
- `records[].sequence`: Sequence (number)
- `records[].is_won`: Is Won Stage (boolean)
- `records[].fold`: Folded (boolean)
- `records[].team_ids`: Sales Team IDs

### `odoo_list_models`

**List Models.** Searches the Odoo model registry (ir.model) by technical name or description, for example "invoice" finds account.move, to learn which model to pass to the generic record actions. Returns one page sorted by technical name; when has_more is true, call again with offset = next_offset to get the rest. Needs an Odoo user with Administration / Access Rights; other users get an error and should call odoo_get_model_fields with a known model name instead. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search. Part of the model name or description, for example "lead", "invoice" or "sale". Empty = all models. |
| `limit` | number | no |  | Limit. Maximum records to return. Default 100, maximum 500. Check has_more and pass next_offset as offset for the next page. |
| `offset` | number | no |  | Offset. Number of records to skip, for paging. Use next_offset from the previous call. |

Output fields:

- `count`: Count (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)
- `models`: Models
- `models[].model`: Technical Name
- `models[].name`: Description

### `odoo_list_projects`

**List Projects.** Lists Odoo projects (project.project), optionally filtered by name, with customer, manager, dates and task count. Use to get the project ID for creating or finding tasks. Needs the Project app. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Name Contains. Part of the project name. |
| `limit` | number | no |  | Limit. Maximum records to return. Default 50, maximum 500. Check has_more and pass next_offset as offset for the next page. |
| `offset` | number | no |  | Offset. Number of records to skip, for paging. Use next_offset from the previous call. |

Output fields:

- `model`: Model
- `count`: Count (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)
- `records`: Projects
- `records[].id`: Project ID (number)
- `records[].name`: Name
- `records[].partner_id`: Customer ID (number)
- `records[].partner_id_name`: Customer
- `records[].user_id`: Project Manager ID (number)
- `records[].user_id_name`: Project Manager
- `records[].date_start`: Start Date (date)
- `records[].date`: End Date (date)
- `records[].task_count`: Task Count (number)
- `records[].active`: Active (boolean)
- `records[].create_date`: Created On (UTC) (datetime)

### `odoo_list_record_attachments`

**List Record Attachments.** Lists the attachments linked to one Odoo record (name, type, size, id) without downloading them; pass an id to odoo_download_attachment to get the file. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Technical model name, for example res.partner (contacts), crm.lead, sale.order, account.move (invoices), product.product, project.task. Resolve unknown names with odoo_list_models. |
| `record_id` | number | yes |  | Record ID. ID of the record whose attachments to list. |
| `limit` | number | no |  | Limit. Maximum records to return. Default 50, maximum 200. Check has_more and pass next_offset as offset for the next page. |
| `offset` | number | no |  | Offset. Number of records to skip, for paging. Use next_offset from the previous call. |

Output fields:

- `model`: Model
- `count`: Count (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)
- `records`: Attachments
- `records[].id`: Attachment ID (number)
- `records[].name`: File Name
- `records[].mimetype`: MIME Type
- `records[].file_size`: Size (filesize)
- `records[].res_model`: Attached To Model
- `records[].res_id`: Attached To Record ID (number)
- `records[].type`: Storage Type
- `records[].url`: URL (url)
- `records[].create_date`: Created On (UTC) (datetime)

### `odoo_list_users`

**List Users.** Lists internal Odoo users (res.users, portal users excluded), optionally filtered by name, login or email. Use to get the user ID for salesperson, project manager or task assignee fields. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Text. Matches name, login or email (contains). |
| `limit` | number | no |  | Limit. Maximum records to return. Default 50, maximum 500. Check has_more and pass next_offset as offset for the next page. |
| `offset` | number | no |  | Offset. Number of records to skip, for paging. Use next_offset from the previous call. |

Output fields:

- `model`: Model
- `count`: Count (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)
- `records`: Users
- `records[].id`: User ID (number)
- `records[].name`: Name
- `records[].login`: Login
- `records[].email`: Email (email)
- `records[].partner_id`: Related Contact ID (number)
- `records[].partner_id_name`: Related Contact
- `records[].active`: Active (boolean)

### `odoo_mark_lead_lost`

**Mark Lead Lost.** Marks one Odoo CRM lead or opportunity as lost (action_set_lost), which archives it, with an optional lost reason. Recover it later with odoo_mark_lead_won or odoo_call_method action_unarchive. Needs the CRM app. Idempotent: a second call leaves it lost. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | number | yes |  | Lead ID. crm.lead ID from odoo_find_leads. |
| `lost_reason_id` | number | no |  | Lost Reason ID. crm.lost.reason ID. Resolve with odoo_name_search on crm.lost.reason. |

Output fields:

- `id`: Lead ID (number)
- `name`: Title
- `type`: Type
- `active`: Active (boolean)
- `stage_id`: Stage ID (number)
- `stage_id_name`: Stage
- `probability`: Probability (%) (number)
- `expected_revenue`: Expected Revenue (number)
- `partner_id`: Customer ID (number)
- `partner_id_name`: Customer
- `contact_name`: Contact Name
- `partner_name`: Company Name
- `email_from`: Email (email)
- `phone`: Phone
- `user_id`: Salesperson ID (number)
- `user_id_name`: Salesperson
- `team_id`: Sales Team ID (number)
- `team_id_name`: Sales Team
- `tag_ids`: Tag IDs
- `priority`: Priority
- `date_deadline`: Expected Closing (date)
- `lost_reason_id`: Lost Reason ID (number)
- `lost_reason_id_name`: Lost Reason
- `won_status`: Won Status
- `create_date`: Created On (UTC) (datetime)
- `write_date`: Last Updated On (UTC) (datetime)

### `odoo_mark_lead_won`

**Mark Lead Won.** Marks one Odoo CRM lead or opportunity as won (action_set_won): moves it to the won stage and sets probability to 100, restoring it first if it was lost. Needs the CRM app. Idempotent: a second call leaves it won. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | number | yes |  | Lead ID. crm.lead ID from odoo_find_leads. |

Output fields:

- `id`: Lead ID (number)
- `name`: Title
- `type`: Type
- `active`: Active (boolean)
- `stage_id`: Stage ID (number)
- `stage_id_name`: Stage
- `probability`: Probability (%) (number)
- `expected_revenue`: Expected Revenue (number)
- `partner_id`: Customer ID (number)
- `partner_id_name`: Customer
- `contact_name`: Contact Name
- `partner_name`: Company Name
- `email_from`: Email (email)
- `phone`: Phone
- `user_id`: Salesperson ID (number)
- `user_id_name`: Salesperson
- `team_id`: Sales Team ID (number)
- `team_id_name`: Sales Team
- `tag_ids`: Tag IDs
- `priority`: Priority
- `date_deadline`: Expected Closing (date)
- `lost_reason_id`: Lost Reason ID (number)
- `lost_reason_id_name`: Lost Reason
- `won_status`: Won Status
- `create_date`: Created On (UTC) (datetime)
- `write_date`: Last Updated On (UTC) (datetime)

### `odoo_name_search`

**Find ID by Name.** Resolves a name to record IDs the way Odoo selection fields do (name_search), for example a customer, product, stage, user, country or tag name to the ID needed in create or update values. Returns id and name pairs, best matches first; has_more is true when more records match than the limit, so narrow the name or raise the limit. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Technical model name, for example res.partner (contacts), crm.lead, sale.order, account.move (invoices), product.product, project.task. Resolve unknown names with odoo_list_models. |
| `name` | string | no |  | Name. Text to match, for example "Acme". Empty = first records. |
| `domain` | JSON | no |  | Domain. Odoo domain: a JSON list of [field, operator, value] conditions, ANDed together; use "\|" before two conditions for OR. Example [["is_company", "=", true], ["country_id.code", "=", "US"]]. Empty = all records. |
| `operator` | string | no |  | Match. ilike = contains (default), = = exact name. One of `"ilike"`, `"="`, `"=ilike"`. |
| `limit` | number | no |  | Limit. Maximum records to return. Default 10, maximum 100. Check has_more and pass next_offset as offset for the next page. |

Output fields:

- `model`: Model
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `results`: Matches
- `results[].id`: ID (number)
- `results[].name`: Name

### `odoo_post_invoice`

**Post Invoice.** Posts one draft Odoo invoice, bill or credit note (action_post): it gets its final number and becomes due; fails if Odoo asks for an extra confirmation step. Needs Invoicing. Not idempotent: a second call fails because only drafts can be posted. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice_id` | number | yes |  | Invoice ID. account.move ID from odoo_create_invoice or odoo_find_invoices. |

Output fields:

- `id`: Invoice ID (number)
- `name`: Number
- `move_type`: Type
- `state`: Status
- `payment_state`: Payment Status
- `partner_id`: Partner ID (number)
- `partner_id_name`: Partner
- `invoice_date`: Invoice Date (date)
- `invoice_date_due`: Due Date (date)
- `ref`: Reference
- `payment_reference`: Payment Reference
- `invoice_origin`: Source Document
- `amount_untaxed`: Untaxed Amount (number)
- `amount_tax`: Taxes (number)
- `amount_total`: Total (number)
- `amount_residual`: Amount Due (number)
- `currency_id`: Currency ID (number)
- `currency_id_name`: Currency
- `create_date`: Created On (UTC) (datetime)
- `write_date`: Last Updated On (UTC) (datetime)

### `odoo_post_message`

**Post Message on Record.** Posts in the chatter of one Odoo record (message_post): an internal note (default, no email) or a message emailed to the followers and to extra partners. Works on models with a chatter such as res.partner, crm.lead, sale.order, account.move, project.task. Not idempotent: each call posts another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Technical model name, for example res.partner (contacts), crm.lead, sale.order, account.move (invoices), product.product, project.task. Resolve unknown names with odoo_list_models. |
| `record_id` | number | yes |  | Record ID. ID of the record to post on. |
| `body` | string | yes |  | Body. Plain text of the message. HTML tags are shown as text. |
| `kind` | string | no |  | Kind. note = internal note (default). message = sent to followers by email. One of `"note"`, `"message"`. |
| `partner_ids` | array | no |  | Also Notify Partner IDs. Contact IDs (res.partner) to notify in addition to followers, for example [7]. Only used with kind "message". |

Output fields:

- `message_id`: Message ID (number)
- `model`: Model
- `record_id`: Record ID (number)
- `message_type`: Posted As

### `odoo_search_records`

**Search Records.** Searches records of any Odoo model with an Odoo domain and returns the chosen fields (search_read), with sort order and offset paging (has_more / next_offset). Many2one values come back as field (id) plus field_name. Prefer the app-specific find actions (partners, leads, orders, invoices, products, tasks) when they fit. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Technical model name, for example res.partner (contacts), crm.lead, sale.order, account.move (invoices), product.product, project.task. Resolve unknown names with odoo_list_models. |
| `domain` | JSON | no |  | Domain. Odoo domain: a JSON list of [field, operator, value] conditions, ANDed together; use "\|" before two conditions for OR. Example [["is_company", "=", true], ["country_id.code", "=", "US"]]. Empty = all records. |
| `fields` | array | no |  | Fields. Field names to return, for example ["name", "email", "partner_id"]. Leave empty for every field except binary ones (files, images). Get names from odoo_get_model_fields. |
| `order` | string | no |  | Order. Sort, for example "create_date desc, id desc". Empty = the model default order. |
| `limit` | number | no |  | Limit. Maximum records to return. Default 50, maximum 500. Check has_more and pass next_offset as offset for the next page. |
| `offset` | number | no |  | Offset. Number of records to skip, for paging. Use next_offset from the previous call. |

Output fields:

- `model`: Model
- `count`: Count (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)
- `records`: Records

### `odoo_update_records`

**Update Records.** Writes the given field values to one or more records of any Odoo model (write). Only the fields in Values change; every other field keeps its value. Send null or false to clear a field. Idempotent for plain values: writing the same values again leaves the records unchanged. x2many commands such as [0, 0, {...}] add lines on every call, so a retry can duplicate them; that is why this action is marked not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Technical model name, for example res.partner (contacts), crm.lead, sale.order, account.move (invoices), product.product, project.task. Resolve unknown names with odoo_list_models. |
| `ids` | array | yes |  | Record IDs. IDs of the records to update, for example [12]. At most 500. |
| `values` | JSON | yes |  | Values. JSON object with only the fields to change, for example {"phone": "+1 555 0100"}. Same value format as odoo_create_record (IDs for many2one, command lists for many2many). |

Output fields:

- `success`: Success (boolean)
- `model`: Model
- `ids`: Updated IDs
- `updated_count`: Updated Count (number)

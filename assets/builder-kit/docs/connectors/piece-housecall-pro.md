# Housecall Pro

Manage your home service business with Housecall Pro CRM integration

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-housecall-pro'
  version: '0.2.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Housecall Pro API Key. You can find it in your Housecall Pro account settings under API.

## Actions

### `create_customer`

**Create Customer.** Create a new Housecall Pro customer record with contact details, tags, and optional inline addresses. Not idempotent: each call creates a separate customer, so repeating it can produce duplicates. At least one of first name, last name, email, mobile/home/work number is required. To change an existing customer use Update Customer. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `mobile_number` | string | no |  | Mobile Number. |
| `home_number` | string | no |  | Home Number. |
| `work_number` | string | no |  | Work Number. |
| `company` | string | no |  | Company. |
| `notifications_enabled` | boolean | no | `true` | Notifications Enabled. Will the customer receive notifications. |
| `lead_source` | string | no |  | Lead Source. |
| `notes` | string | no |  | Notes. |
| `tags` | array | no |  | Tags. Array of tags to assign to the customer. |
| `addresses` | array | no |  | Addresses. Array of address objects. |

### `get_customers`

**Get Customers.** List Housecall Pro customers with optional full-text search (name, email, mobile, address), location filtering, sorting, and pagination. Read-only and idempotent. Use the q search query to locate a customer by name or contact details before referencing their ID in other actions. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. Page number for pagination (starts from 1) |
| `page_size` | number | no | `50` | Page Size. Number of customers per page (max 100) |
| `q` | string | no |  | Search Query. Search customers by name, email, mobile number, and address. |
| `expand` | array | no |  | Expand. Expand related data. One of `"attachments"`, `"do_not_service"`. |
| `location_ids` | array | no |  | Location IDs. IDs of locations from which to pull customers. |
| `sort_by` | string | no |  | Sort By. The customer attribute by which to sort the results. One of `"created_at"`, `"updated_at"`, `"last_name"`. |
| `sort_direction` | string | no |  | Sort Direction. The order of sorting (ascending or descending) One of `"asc"`, `"desc"`. |

### `get_customer`

**Get Customer.** Fetch one Housecall Pro customer by its customer ID, optionally expanding attachments and do-not-service status. Read-only and repeatable. Requires a known customer ID; it does not search by name or email. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The ID of the customer to retrieve. |
| `expand` | array | no |  | Expand. Expand related data. One of `"attachments"`, `"do_not_service"`. |

### `update_customer`

**Update Customer.** Update fields on an existing Housecall Pro customer identified by customer ID; only supplied fields change. Effectively idempotent because it targets a stable ID, but note that providing tags replaces the existing tag set rather than appending. To create a new customer use Create Customer instead. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The ID of the customer to update. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `mobile_number` | string | no |  | Mobile Number. |
| `home_number` | string | no |  | Home Number. |
| `work_number` | string | no |  | Work Number. |
| `company` | string | no |  | Company. |
| `notes` | string | no |  | Notes. |
| `tags` | array | no |  | Tags. Array of tags to assign to the customer (replaces existing tags) |
| `notifications_enabled` | boolean | no |  | Notifications Enabled. Will the customer receive notifications. |
| `lead_source` | string | no |  | Lead Source. |
| `addresses` | array | no |  | Addresses. Array of address objects (if provided, each address must include an id) |

### `get_customer_addresses`

**Get All of a Customer's Addresses.** List all addresses belonging to a given Housecall Pro customer, with pagination and sorting by created/updated time. Read-only and repeatable. Requires a known customer ID. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The ID of the customer. |
| `page` | number | no | `1` | Page. Paginated page number. |
| `page_size` | number | no | `50` | Page Size. Number of addresses returned per page. |
| `sort_by` | string | no |  | Sort By. Address attribute to sort by. One of `"created_at"`, `"updated_at"`. |
| `sort_direction` | string | no |  | Sort Direction. Ascending or descending. One of `"asc"`, `"desc"`. |

### `create_customer_address`

**Create an Address on a Customer.** Add a new address to an existing Housecall Pro customer. Not idempotent: each call creates another address on the customer, so repeating can produce duplicates. Street, city, state, zip, and country are required. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The ID of the customer to add address to. |
| `street` | string | yes |  | Street. Street address. |
| `street_line_2` | string | no |  | Street Line 2. Additional street address line. |
| `city` | string | yes |  | City. City. |
| `state` | string | yes |  | State. State. |
| `zip` | string | yes |  | ZIP. ZIP code. |
| `country` | string | yes |  | Country. Country. |
| `latitude` | number | no |  | Latitude. Latitude (one of number) |
| `longitude` | number | no |  | Longitude. Longitude (one of number) |

### `get_customer_address`

**Get a Customer's Address.** Read-only: fetches a single customer address in Housecall Pro by its customer ID and address ID. Use when both IDs are known and you need the details of one specific address; safe to retry. Does not list all addresses for a customer and does not modify any data. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The ID of the customer. |
| `address_id` | string | yes |  | Address ID. The ID of the address. |

### `create_job`

**Create Job.** Create a new Housecall Pro job for an existing customer and address, with optional schedule, assigned employees, tags, line items, and pricing/job fields. Not idempotent: each call creates a separate job. Requires existing customer ID and address ID; the customer and address must be created first. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. The ID of the customer this job is for. |
| `address_id` | string | yes |  | Address ID. The ID of the address for this job. |
| `invoice_number` | number | no |  | Invoice Number. Invoice number must be unique across all of a company's jobs. If left blank, one will be automatically generated. |
| `scheduled_start` | ISO date-time string | no |  | Scheduled Start. Start time of job in ISO8601 format (e.g., 2021-01-14T20:14:00) |
| `scheduled_end` | ISO date-time string | no |  | Scheduled End. End time of job in ISO8601 format (e.g., 2021-01-14T21:14:00) |
| `arrival_window` | number | no |  | Arrival Window (minutes). Integer value in minutes of arrival window. |
| `assigned_employee_ids` | array | no |  | Assigned Employee IDs. Array of employee IDs to assign to the job. |
| `tags` | array | no |  | Tags. Array of tags to assign to the job. |
| `lead_source` | string | no |  | Lead Source. |
| `notes` | string | no |  | Notes. |
| `line_items` | array | no |  | Line Items. Array of line items for the job. |
| `pricing_form` | JSON | no |  | Pricing Form. Pricing form object with fields and options (use UUIDs from GET price form endpoint) |
| `job_fields` | JSON | no |  | Job Fields. Job fields object (e.g., job_type_id, business_unit_id) |

### `get_jobs`

**Get Jobs.** List or search Housecall Pro jobs with optional filters (customer, employees, locations, scheduled date ranges, work status) plus pagination and sorting. Read-only and repeatable. Use to discover jobs matching criteria; when you already have a single job ID, use Get a Job instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | no |  | Customer ID. Filters jobs by a single customer ID. |
| `employee_ids` | array | no |  | Employee IDs. Array of employee IDs to filter jobs. |
| `expand` | array | no |  | Expand. Array of strings to expand response body. One of `"attachments"`, `"appointments"`. |
| `location_ids` | array | no |  | Location IDs. IDs of locations to retrieve jobs from. |
| `page` | number | no | `1` | Page. The paginated page number. |
| `page_size` | number | no | `10` | Page Size. The number of jobs returned per page. |
| `scheduled_start_min` | ISO date-time string | no |  | Scheduled Start Min. Filters jobs with a starting time greater than or equal to the date sent. |
| `scheduled_start_max` | ISO date-time string | no |  | Scheduled Start Max. Filters jobs with a starting time less than or equal to the date sent. |
| `scheduled_end_min` | ISO date-time string | no |  | Scheduled End Min. Filters jobs with an end time greater than or equal to the date sent. |
| `scheduled_end_max` | ISO date-time string | no |  | Scheduled End Max. Filters jobs with an end time less than or equal to the date sent. |
| `sort_by` | string | no |  | Sort By. The attribute to sort the results by. One of `"created_at"`, `"updated_at"`, `"invoice_number"`, `"id"`, `"description"`, `"work_status"`. |
| `sort_direction` | string | no | `"desc"` | Sort Direction. The sorting order. One of `"asc"`, `"desc"`. |
| `work_status` | array | no |  | Work Status. Filters jobs by their work status. If empty, returns jobs from all statuses. One of `"unscheduled"`, `"scheduled"`, `"in_progress"`, `"completed"`, `"canceled"`. |

### `get_job`

**Get a Job.** Fetch one Housecall Pro job by its job ID, optionally expanding attachments and/or appointments. Read-only and repeatable. Use when you already have a job ID; to discover jobs by customer, status, or date range use Get Jobs instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job to retrieve. |
| `expand` | array | no |  | Expand. Expand related data (attachments, appointments) One of `"attachments"`, `"appointments"`. |

### `update_job_schedule`

**Update Job Schedule.** Overwrites the schedule (start time, end time, arrival window, dispatched employees) of an existing Housecall Pro job, identified by job ID. Use to reschedule or re-dispatch a single-appointment job; not idempotent since it mutates the job and can trigger customer/pro notifications on each call. Cannot update multi-day jobs that contain more than one appointment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job to update schedule for. |
| `start_time` | string | yes |  | Start Time. Start time of job in ISO8601 format (e.g., 2021-01-14T20:14:00) |
| `end_time` | string | yes |  | End Time. End time of job in ISO8601 format (e.g., 2021-01-14T21:14:00) |
| `arrival_window_in_minutes` | number | no |  | Arrival Window (minutes). Integer value in minutes of arrival window. |
| `notify` | boolean | no | `true` | Notify. Notify the customer of the update schedule. |
| `notify_pro` | boolean | no | `true` | Notify Pro. Notify the pros of the update schedule. |
| `expand` | array | no |  | Expand. Expand related entities. One of `"assigned_employees"`. |
| `dispatched_employees` | array | no |  | Dispatched Employees. Array of employee objects with employee_id. |

### `delete_job_schedule`

**Delete Job Schedule.** Remove the schedule (start/end times) from a Housecall Pro job by job ID, leaving the job itself intact. Idempotent: deleting an already-unscheduled job's schedule has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job to delete schedule from. |

### `create_job_appointment`

**Create appointment.** Add a new appointment to a Housecall Pro job, specifying start/end times, the dispatched-employee list, and an optional arrival window. Not idempotent: repeated calls create duplicate appointments on the job. Use update-appointment to modify an existing appointment instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job. |
| `start_time` | ISO date-time string | yes |  | Start Time. Start time of job appointment in iso8601. |
| `end_time` | ISO date-time string | yes |  | End Time. End time of job appointment in iso8601. |
| `arrival_window_minutes` | number | no |  | Arrival Window (minutes). Integer value in minutes of arrival window. |
| `dispatched_employees_ids` | array | yes |  | Dispatched Employees IDs. List of pros ids to be assign in appointment. |

### `get_job_appointments`

**Get Appointments.** List all appointments scheduled on a Housecall Pro job identified by job ID. Read-only and idempotent. Use create-appointment or update-appointment to modify scheduling. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job. |

### `update_job_appointment`

**Update Appointment.** Update an existing appointment on a Housecall Pro job, replacing its start/end times, dispatched-employee list, and optional arrival window. Requires both the job ID and the appointment ID. Idempotent: re-applying the same values yields the same appointment state. Use create-appointment to add a new appointment rather than modify one. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appointment_id` | string | yes |  | Appointment ID. The ID of the appointment. |
| `job_id` | string | yes |  | Job ID. The ID of the job. |
| `start_time` | ISO date-time string | yes |  | Start Time. Start time of job appointment in iso8601. |
| `end_time` | ISO date-time string | yes |  | End Time. End time of job appointment in iso8601. |
| `arrival_window_minutes` | number | no |  | Arrival Window (minutes). Integer value in minutes of arrival window. |
| `dispatched_employees_ids` | array | yes |  | Dispatched Employees IDs. List of pros ids to be assign in appointment. |

### `delete_job_appointment`

**Delete appointment.** Permanently delete an appointment from a Housecall Pro job, identified by job ID and appointment ID. Idempotent on the target since the appointment ends up gone; a repeat call on an already-deleted appointment simply has no further effect. Destructive and not reversible. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appointment_id` | string | yes |  | Appointment ID. The ID of the appointment. |
| `job_id` | string | yes |  | Job ID. The ID of the job. |

### `add_job_note`

**Add job note.** Append a text note to a Housecall Pro job by job ID. Not idempotent: each call adds another note, so repeating it creates duplicate notes. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job. |
| `content` | string | yes |  | Content. The content of the note. |

### `delete_job_note`

**Delete job note.** Delete a single note from a Housecall Pro job, identified by job ID and note ID. Idempotent: deleting an already-removed note has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job. |
| `note_id` | string | yes |  | Note ID. The ID of the note to delete. |

### `add_job_attachment`

**Add an attachment to a job.** Upload a file attachment to a Housecall Pro job identified by job ID, sent as multipart form data. Not idempotent: repeated calls add duplicate attachments. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job to add attachment to. |
| `file` | file | yes |  | File. The file to upload. Files are not supported; an action that needs one fails. |

### `add_job_line_item`

**Add a line item to a job.** Append a single line item (name plus optional price, cost, quantity, kind, and tax settings) to a Housecall Pro job. Not idempotent: each call adds another line item, so repeating it creates duplicates. This endpoint is rate limited. To change an existing line item use Update a single line item for a job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job. |
| `name` | string | yes |  | Name. The name of the line item. |
| `description` | string | no |  | Description. The description of the line item. |
| `unit_price` | number | no |  | Unit Price. The unit price of the line item. |
| `unit_cost` | number | no |  | Unit Cost. The unit cost of the line item. |
| `quantity` | number | no |  | Quantity. The number of items being sold. This can be a float up to two decimal places. |
| `tax_surcharge_type` | string | no |  | Tax/Surcharge Type. The type of tax or surcharge. One of `"material"`, `"labor"`, `"flat_quantity"`, `"fixed_discount"`, `"percent_discount"`. |
| `kind` | string | no |  | Kind. The kind of line item. One of `"material"`, `"labor"`, `"flat_quantity"`, `"fixed_discount"`, `"percent_discount"`. |
| `taxable` | boolean | no |  | Taxable. Whether the line item is taxable. |
| `service_line_id` | string | no |  | Service Line ID. The ID of the service line. |
| `service_line_type` | string | no |  | Service Line Type. The type of service line. One of `"custom_place"`, `"organization"`, `"pricebok_material"`. |

### `update_job_line_item`

**Update a single line item for a job.** Update fields on an existing line item of a Housecall Pro job, identified by job ID and line item ID; only supplied fields change. Idempotent because it targets a stable line item ID. To add a new line item use Add a line item to a job instead. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job. |
| `id` | string | yes |  | Line Item ID. The ID of the line item. |
| `service_line_id` | string | no |  | Service Line ID. The ID of the service line. |
| `service_line_type` | string | no |  | Service Line Type. The type of service line. One of `"custom_place"`, `"organization"`, `"pricebok_material"`. |
| `name` | string | no |  | Name. The name of the line item. |
| `unit_price` | number | no |  | Unit Price. The unit price of the line item. |
| `unit_cost` | number | no |  | Unit Cost. The unit cost of the line item. |
| `quantity` | number | no |  | Quantity. The number of items being sold. |
| `kind` | string | no |  | Kind. The kind of line item. One of `"material"`, `"labor"`, `"flat_quantity"`, `"fixed_discount"`, `"percent_discount"`. |
| `taxable` | boolean | no |  | Taxable. Whether the line item is taxable. |
| `description` | string | no |  | Description. The description of the line item. |

### `delete_job_line_item`

**Delete a single line item for a job.** Destructive: permanently removes one line item from a Housecall Pro job, identified by the job ID and line item ID. Use only when you intend to delete that specific item; not safe to blindly retry, as a repeat call after success will error because the item no longer exists. Affects only the named line item, not the whole job. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job. |
| `id` | string | yes |  | Line Item ID. The ID of the line item to delete. |

### `get_job_line_items`

**Lists all line items for a job.** List every line item (services, materials, charges) on a Housecall Pro job identified by job ID. Read-only and idempotent. Use bulk-update-job-line-items to modify these line items. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job. |

### `add_job_tag`

**Add job tag.** Attach a tag (by tag ID) to a Housecall Pro job. Effectively idempotent since adding a tag already present leaves the job's tag set unchanged. To detach a tag use Remove job tag. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job. |
| `tag_id` | string | yes |  | Tag ID. The ID of the tag to add. |

### `remove_job_tag`

**Remove job tag.** Detach a tag (by tag ID) from a Housecall Pro job. Effectively idempotent since removing a tag that is not present leaves the job's tag set unchanged. To attach a tag use Add job tag. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job. |
| `tag_id` | string | yes |  | Tag ID. The ID of the tag to remove. |

### `create_job_link`

**Create Job Link.** Attach a titled hyperlink (title + URL) to a Housecall Pro job identified by job ID. Not idempotent: repeated calls add duplicate links to the job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job. |
| `title` | string | yes |  | Title. The title of the link. |
| `url` | string | yes |  | URL. The URL of the link. |

### `get_job_invoices`

**Get Job Invoices.** Read-only: returns the invoices attached to a Housecall Pro job, given a job ID. Use to inspect billing/invoice records for a known job before reading or reconciling them; safe to retry. Requires the job_id; does not create or modify invoices. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job to retrieve invoices for. |

### `get_job_input_materials`

**Lists all job input materials for a job.** Read-only: lists all input materials recorded on a Housecall Pro job, given a job ID. Use to inspect the materials/line costs logged against a known job; safe to retry. Requires the job_id and does not add or change materials. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job. |

### `bulk_update_job_line_items`

**Bulk update a job's line items.** Bulk replace or upsert the line items on a Housecall Pro job in a single call. Line items carrying a stable identifier are upserted in place; those without are added as new, so the result is only idempotent when every item is keyed for upsert. Set append_line_items to add to existing items rather than replacing the set. Use get-job-line-items first to read current items. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job. |
| `line_items` | array | yes |  | Line Items. Array of line items to update. |
| `append_line_items` | boolean | no | `false` | Append Line Items. Append line items to the job. |

### `bulk_update_job_input_materials`

**Bulk update a job's input materials.** Upsert a job's input materials in bulk for a given job ID. Entries that supply an existing material ID are updated; entries without one are created as new, so omitting IDs on a repeat call will add duplicates rather than no-op. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job. |
| `job_input_materials` | array | yes |  | Job Input Materials. Array of job input materials to update. |

### `dispatch_job_to_employees`

**Dispatch job to employees.** Dispatch a Housecall Pro job to a set of employees, identified by job ID and an array of employee IDs. The call sets the dispatched employees for the job, so re-sending the same list is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job to dispatch. |
| `dispatched_employees` | array | yes |  | Dispatched Employees. Array of employees with employee_id to dispatch to. |

### `lock_job`

**Lock Job.** Lock a Housecall Pro job by its job ID, preventing further edits. Targets a stable job ID, so re-running on an already-locked job is harmless. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The ID of the job to lock. |

### `lock_jobs`

**Lock Jobs.** Bulk-lock all completed or scheduled Housecall Pro jobs falling within a start/end datetime range, preventing further edits to them. Effectively idempotent: re-running the same range re-locks already-locked jobs with no additional effect. Acts on every matching job in the window, not a single job. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `starting_at` | ISO date-time string | yes |  | Starting At. Lock jobs starting from this date/time. |
| `ending_at` | ISO date-time string | yes |  | Ending At. Lock jobs until this date/time. |

### `create_estimate`

**Create estimate.** Create a new Housecall Pro estimate, optionally attaching it to an existing customer, address, schedule, and one or more priced options. Not idempotent: each call creates a separate estimate even with identical inputs unless you supply your own unique estimate_number. Use the dedicated address/schedule/estimate-fields objects when known; the additional_fields object merges raw fields into the request body for anything not surfaced as a prop. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `estimate_number` | number | no |  | Estimate Number. Unique estimate number. If blank, one will be automatically generated. |
| `message` | string | no |  | Note Message. |
| `customer_id` | string | no |  | Customer ID. |
| `assigned_employee_ids` | array | no |  | Assigned Employee IDs. |
| `address_id` | string | no |  | Address ID. |
| `address` | JSON | no |  | Address. Address object with fields: street, street_line_2, city, state, zip. |
| `schedule` | JSON | no |  | Schedule. Schedule object with fields: start_time, end_time, arrival_window_in_minutes, notify_customer. |
| `estimate_fields` | JSON | no |  | Estimate Fields. Estimate fields object with: job_type_id, business_unit_id. |
| `options` | array | no |  | Options (array of option objects). Each option object corresponds to an estimate option to create. |
| `additional_fields` | JSON | no |  | Additional Fields (advanced). Advanced: provide raw fields merged into the request body. |

### `get_estimate`

**Get estimate by ID.** Fetch a single Housecall Pro estimate by its ID, optionally expanding related customer, address, assigned-employees, options, or attachments inline. Read-only and idempotent. Use the get-estimates list action instead when you need to search or filter across multiple estimates rather than look one up by known ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `estimate_id` | string | yes |  | Estimate ID. |
| `expand` | array | no |  | Expand. One of `"customer"`, `"address"`, `"assigned_employees"`, `"options"`, `"attachments"`. |

### `get_estimates`

**Get estimates.** List Housecall Pro estimates with filtering (customer, employees, locations, work status, scheduled-time ranges), sorting, and pagination. Read-only and idempotent. Use this to search or browse estimates; use get-estimate-by-id when you already know the estimate's ID. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | no |  | Customer ID. Filter estimates by a single customer ID. |
| `employee_ids` | array | no |  | Employee IDs. Filter estimates by assigned employee IDs. |
| `expand` | array | no |  | Expand. Array of strings to expand response body. One of `"customer"`, `"address"`, `"assigned_employees"`, `"options"`, `"attachments"`. |
| `location_ids` | array | no |  | Location IDs. IDs of locations to retrieve estimates from. |
| `page` | number | no | `1` | Page. The paginated page number. |
| `page_size` | number | no | `50` | Page Size. The number of estimates returned per page. |
| `scheduled_end_max` | ISO date-time string | no |  | Scheduled End Max. Filters estimates with an end time less than or equal to the date sent. |
| `scheduled_end_min` | ISO date-time string | no |  | Scheduled End Min. Filters estimates with an end time greater than or equal to the date sent. |
| `scheduled_start_max` | ISO date-time string | no |  | Scheduled Start Max. Filters estimates with a starting time less than or equal to the date sent. |
| `scheduled_start_min` | ISO date-time string | no |  | Scheduled Start Min. Filters estimates with a starting time greater than or equal to the date sent. |
| `sort_by` | string | no |  | Sort By. The attribute to sort the results by. One of `"created_at"`, `"updated_at"`, `"id"`. |
| `sort_direction` | string | no |  | Sort Direction. The sorting order. One of `"asc"`, `"desc"`. |
| `work_status` | array | no |  | Work Status. Filters estimates by their work status. One of `"unscheduled"`, `"scheduled"`, `"in_progress"`, `"completed"`, `"canceled"`. |

### `create_estimate_option_note`

**Create estimate option note.** Add a free-text note to a specific option within a Housecall Pro estimate, identified by estimate ID and option ID. Not idempotent: repeated calls create additional notes. Use delete-estimate-option-note to remove a note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `estimate_id` | string | yes |  | Estimate ID. |
| `option_id` | string | yes |  | Option ID. |
| `content` | string | yes |  | Content. |

### `delete_estimate_option_note`

**Delete estimate option note.** Delete a single note from an estimate option, identified by estimate ID, option ID, and note ID. Idempotent: deleting an already-removed note has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `estimate_id` | string | yes |  | Estimate ID. |
| `option_id` | string | yes |  | Option ID. |
| `note_id` | string | yes |  | Note ID. |

### `create_estimate_option_attachment`

**Create estimate option attachment.** Upload a file as an attachment to a specific option of a Housecall Pro estimate, identified by estimate ID and option ID. Not idempotent: each call uploads another attachment, so repeating it creates duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `estimate_id` | string | yes |  | Estimate ID. |
| `option_id` | string | yes |  | Option ID. |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |

### `create_estimate_option_link`

**Create estimate option link.** Attach a titled hyperlink (title + URL) to a specific option within a Housecall Pro estimate, identified by estimate ID and option ID. Not idempotent: repeated calls add duplicate links to the option. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `estimate_id` | string | yes |  | Estimate ID. |
| `option_id` | string | yes |  | Option ID. |
| `title` | string | yes |  | Title. |
| `url` | string | yes |  | URL. |

### `update_estimate_option_schedule`

**Update estimate option schedule.** Set the schedule (start/end time, arrival window, and dispatched employees) for a specific option of a Housecall Pro estimate, identified by estimate ID and option ID. Idempotent since it overwrites the option's schedule. Can optionally notify the customer and the pro. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `estimate_id` | string | yes |  | Estimate ID. |
| `option_id` | string | yes |  | Option ID. |
| `start_time` | ISO date-time string | yes |  | Start Time. |
| `end_time` | ISO date-time string | yes |  | End Time. |
| `arrival_window_in_minutes` | number | yes |  | Arrival Window (minutes). |
| `notify` | boolean | yes | `true` | Notify Customer. |
| `notify_pro` | boolean | yes | `true` | Notify Pro. |
| `expand` | array | no |  | Expand. One of `"assigned_employees"`. |
| `dispatched_employees` | array | no |  | Dispatched Employees. Array of objects with employee_id. |

### `create_lead`

**Create Lead.** Create a new sales lead in Housecall Pro, tied to an existing customer via customer_id. Not idempotent: repeated calls create duplicate leads for the same customer. Optional contact, lead-source, tag, address, and assigned-employee fields can be supplied; use the convert-lead action afterward to turn a lead into an estimate or job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID. Either the ID of customer required. |
| `customer` | object | no |  | Customer. Either the ID of customer required. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `notifications_enabled` | boolean | no |  | Notifications Enabled. Will the customer receive notifications. |
| `mobile_number` | string | no |  | Mobile Number. |
| `home_number` | string | no |  | Home Number. |
| `work_number` | string | no |  | Work Number. |
| `lead_source` | string | no |  | Lead Source. |
| `notes` | string | no |  | Notes. |
| `tags` | array | no |  | Tags. |
| `addresses` | array | no |  | Addresses. |
| `assigned_employees` | array | no |  | Assigned Employees. |

### `get_lead`

**Get Lead.** Fetch a single Housecall Pro lead by its lead ID. Read-only and repeatable. Requires a known lead ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Lead ID. |

### `get_leads`

**Get Leads.** List Housecall Pro leads with filtering by customer, employees, locations, lead source, status, and tags, plus sorting and pagination. Read-only and idempotent. Use to find leads before converting one into an estimate or job. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | no |  | Customer ID. Filter leads by a single customer ID (String) |
| `employee_ids` | array | no |  | Employee IDs. Filter leads by a list of employee IDs (String array) |
| `lead_source` | string | no |  | Lead Source. Filter leads by a single lead_source. |
| `location_ids` | array | no |  | Location IDs. If a location you want to get from / If a Company-kit header is set, location_ids will be ignored. |
| `page` | number | no |  | Page. Paginated page number. |
| `page_size` | number | no |  | Page Size. Number of leads returned per page. |
| `sort_by` | string | no |  | Sort By. Attribute to sort by. |
| `sort_direction` | string | no |  | Sort Direction. Allowed values: asc, desc. |
| `status` | string | no |  | Status. Filter leads by status. |
| `tag_ids` | array | no |  | Tag IDs. Filter leads by a list of tags. |

### `convert_lead_to_estimate_or_job`

**Convert Lead to Estimate or Job.** Convert an existing Housecall Pro lead (by lead ID) into either an estimate or a job, selected via the type field ('estimate' or 'job'). Not idempotent: each call performs a fresh conversion that creates a new estimate or job record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Lead ID. |
| `type` | string | yes |  | Type. The type to convert the lead to. Must be either 'estimate' or 'job'. |

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

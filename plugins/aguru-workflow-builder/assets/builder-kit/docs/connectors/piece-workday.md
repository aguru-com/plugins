# Workday

Cloud-based enterprise platform for human resources, finance, and planning.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-workday'
  version: '0.3.0'
```

Categories: HUMAN_RESOURCES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Authenticate with Workday

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `authHost` | string | yes | `"impl.workday.com"` | Authorization Host. The Authorization Endpoint from **View API Clients**, without https:// and without `/<tenant>/authorize`, e.g. `wd2-impl.workday.com` or `impl.wd5.myworkday.com/wday/authgwy`. |
| `apiHost` | string | yes | `"wd2-impl-services1.workday.com"` | API Host. Your Workday services host, without https://, e.g. `wd2-impl-services1.workday.com`. It is the host of the Token Endpoint or Workday REST API Endpoint shown in **View API Clients**. |
| `tenant` | string | yes |  | Tenant. Your Workday tenant name, e.g. `acme_impl`. It is the part after the host in your Workday URL (`https://<host>/<tenant>/...`). |
| `isuUsername` | string | no |  | ISU Username (for write operations). Integration System User username for SOAP API write operations (create, update, hire). Format: username@tenant. |
| `isuPassword` | string | no |  | ISU Password (for write operations). Integration System User password for SOAP API write operations. |
| `wwsVersion` | string | no | `"v47.0"` | WWS Version. Workday Web Services (SOAP) version, e.g. `v47.0`. Leave empty for v47.0. |

### `CUSTOM_AUTH`: Integration System User

> Connect with a Workday Integration System User (ISU) instead of OAuth 2.0.
>
> This connection runs SOAP actions (hire, job changes, time off, suppliers, invoices, Call Operation in SOAP mode) and Get Report / Scheduled Report Fetch. Actions that use Workday's REST API or WQL need the OAuth 2.0 connection.
>
> The ISU needs a security group with access to the domains and business processes your flows use. For reports, share the report with the ISU.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiHost` | string | yes |  | API Host. Your Workday services host, without https://, e.g. `wd2-impl-services1.workday.com`. It is the host of the Token Endpoint or Workday REST API Endpoint shown in **View API Clients**. |
| `tenant` | string | yes |  | Tenant. Your Workday tenant name, e.g. `acme_impl`. It is the part after the host in your Workday URL (`https://<host>/<tenant>/...`). |
| `username` | string | yes |  | Username. The ISU username, e.g. `isu_activepieces` (`@<tenant>` is added for SOAP when missing). |
| `password` | string | yes |  | Password. |
| `wwsVersion` | string | no | `"v47.0"` | WWS Version. Workday Web Services (SOAP) version, e.g. `v47.0`. Leave empty for v47.0. |

## Actions

### `approve_task`

**Approve Task.** Approves a pending Workday business-process inbox task, identified by its task WID, optionally attaching an approval comment. Use to advance an awaiting-approval step (e.g. a time-off or hiring request) once a decision is made. Not idempotent: it submits an approval event each call and the task can only be approved once. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. The ID of the inbox task to approve. |
| `comment` | string | no |  | Comment. Optional comment for the approval. |

### `change_job`

**Change Job.** Initiates and auto-completes a Change Job business process for an existing worker (by worker WID), effective on a given date with a reason WID, optionally moving them to a new job profile, supervisory organization, and/or position. Use to record a worker's transfer, promotion, or reorganization. Not idempotent: each call submits a new job-change event. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workerId` | string | yes |  | Worker ID. The ID of the worker whose job to change. |
| `effectiveDate` | string | yes |  | Effective Date. Effective date of the job change (YYYY-MM-DD). |
| `reasonId` | string | yes |  | Reason ID. The reason for the job change. |
| `jobProfileId` | string | no |  | Job Profile ID. New job profile reference ID. |
| `supervisoryOrganizationId` | string | no |  | Supervisory Organization ID. New supervisory organization reference ID. |
| `positionId` | string | no |  | Position ID. New position reference ID. |

### `create_job_requisition`

**Create Job Requisition.** Creates and auto-completes a job requisition under a supervisory organization (by WID) with a creation-reason WID, posting title, and number of openings, optionally setting job profile, location, recruiting-start, and target-hire dates. Use to open a new req before recruiting/hiring. Not idempotent: each call creates a separate requisition. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `supervisoryOrganizationId` | string | yes |  | Supervisory Organization ID. The supervisory organization for the requisition. |
| `reasonId` | string | yes |  | Reason ID. Creation reason as a General_Event_Subcategory_ID (e.g. `Create_Job_Requisition_Administrative_Non_Competitive_Fill_No_Recruiting_Required`) or a WID. |
| `jobPostingTitle` | string | yes |  | Job Posting Title. The title for the job posting. |
| `numberOfOpenings` | number | no | `1` | Number of Openings. Number of openings (default: 1). |
| `jobProfileId` | string | no |  | Job Profile ID. Job profile reference ID. |
| `workerTypeId` | string | no |  | Worker Type ID. Worker type reference ID (Worker_Type_ID), e.g. `EE`. Required when the tenant has no default. |
| `workerSubTypeId` | string | no |  | Worker Sub-Type ID. Worker sub-type reference ID (Employee_Type_ID), e.g. `Regular`. Required when the tenant has no default. |
| `primaryLocationId` | string | no |  | Primary Location ID. Primary location WID, also used as the primary job posting location. |
| `recruitingStartDate` | string | yes |  | Recruiting Start Date. Date to start recruiting (YYYY-MM-DD). Required by Workday. |
| `targetHireDate` | string | yes |  | Target Hire Date. Target date for hiring (YYYY-MM-DD). Required by Workday. |

### `create_pre_hire`

**Create Pre-Hire.** Creates a pre-hire/applicant record in Workday with legal name, contact details (email plus optional phone), and an ISO 3166-1 Alpha-3 country code. Use to register a candidate before running the Hire Employee action against them. Country is required by Workday. Not idempotent: each call submits a new applicant, with no key to update an existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | yes |  | First Name. Legal first name of the pre-hire. |
| `lastName` | string | yes |  | Last Name. Legal last name of the pre-hire. |
| `email` | string | yes |  | Email. Email address (at least one of email, phone, or address is required). |
| `phone` | string | no |  | Phone. Phone number. |
| `country` | string | yes | `"USA"` | Country. ISO 3166-1 Alpha-3 country code (e.g., "USA", "GBR", "DEU"). Required by Workday. |

### `create_supplier_credit_memo`

**Create Supplier Credit Memo.** Submits a supplier invoice adjustment (credit memo) against a supplier (by WID) with an adjustment date and control-total amount, plus an optional memo. Use to record a credit owed by a supplier. Not idempotent: each call submits a separate credit memo. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `supplierId` | string | yes |  | Supplier ID. The ID of the supplier. |
| `memoDate` | string | yes |  | Memo Date. Credit memo date (YYYY-MM-DD). |
| `amount` | string | yes |  | Amount. Credit memo amount. |
| `description` | string | no |  | Description. Description of the credit memo. |

### `create_time_off_request`

**Create Time Off Request.** Submits and auto-completes a time-off request for a worker (by WID) of a given time-off type, entering 8 requested hours for each day in the inclusive start-to-end date range, with an optional comment. Use to book vacation, sick, or other leave on a worker’s behalf. Not idempotent: each call enters a new time-off request. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workerId` | string | yes |  | Worker ID. The ID of the worker requesting time off. |
| `timeOffTypeId` | string | yes |  | Time Off Type ID. Time off type as a Time_Off_Type_ID (e.g. `Vacation_Hours`, `Sick_Hours`) or a WID. |
| `startDate` | string | yes |  | Start Date. Start date of the time off (YYYY-MM-DD). |
| `endDate` | string | yes |  | End Date. End date of the time off (YYYY-MM-DD). |
| `comment` | string | no |  | Comment. Optional comment for the request. |
| `hoursPerDay` | number | no | `8` | Hours per Day. Hours requested for each weekday in the range (default: 8). Weekends are skipped. |

### `create_worker_time_block`

**Create Worker Time Block.** Reports a time block for a worker (by WID) on a given date with a quantity of hours, optionally tagged with a time-entry-code WID and a comment. Use to log hours worked into Workday Time Tracking. Not idempotent: each call appends another reported time block. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workerId` | string | yes |  | Worker ID. The ID of the worker. |
| `date` | string | yes |  | Date. Date of the time block (YYYY-MM-DD). |
| `hours` | number | yes |  | Hours. Number of hours worked. |
| `timeTypeId` | string | no |  | Time Type ID. Time type reference ID. |
| `comment` | string | no |  | Comment. Optional comment. |

### `find_purchase_order`

**Find Purchase Order.** Looks up a single purchase order by its ID via a Workday Query Language (WQL) query against the purchaseOrders dataset. Use to resolve or verify a purchase order when you already have its ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `purchaseOrderId` | string | yes |  | Purchase Order ID. The ID of the purchase order to find. |

### `find_records_wql`

**Find Records (WQL).** Runs an arbitrary read-only Workday Query Language (WQL) query (e.g. SELECT workdayID, fullName FROM allWorkers) and returns the matching rows. Use as the general-purpose escape hatch to fetch any Workday data when no dedicated find action fits; you must supply a valid WQL statement. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | WQL Query. The Workday Query Language (WQL) query to execute (e.g., "SELECT workdayID, fullName FROM allWorkers"). |

### `find_supplier`

**Find Supplier.** Looks up a single supplier by its ID via a Workday Query Language (WQL) query against the suppliers dataset, returning the supplier and its name. Use to resolve or verify a supplier when you already have its ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `supplierId` | string | yes |  | Supplier ID. The ID of the supplier to find. |

### `find_supplier_invoice`

**Find Supplier Invoice.** Looks up a single supplier invoice through the Resource_Management Get_Supplier_Invoices web service, by its Workday ID (32-character WID) or its Supplier Invoice ID (e.g. `SUPPLIER_INVOICE-11-894`). The supplier-facing invoice number (e.g. `SINV-10000885`) is not a lookup key. Returns the invoice data with its reference IDs. Requires ISU credentials on the connection. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice ID. The invoice Workday ID (WID) or Supplier Invoice ID, e.g. `SUPPLIER_INVOICE-11-894`. The invoice number (e.g. `SINV-10000885`) is not accepted. |

### `find_supplier_payment`

**Find Supplier Payment.** Searches supplier payments via a Workday Query Language (WQL) query against the supplierPayments dataset. Both filters are optional: supply a supplier ID and/or a specific payment ID to narrow results, or omit both to list all supplier payments. Use to look up a payment or enumerate a supplier’s payments. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `supplierId` | string | no |  | Supplier ID. Filter payments by supplier ID. |
| `paymentId` | string | no |  | Payment ID. The ID of a specific payment to find. |

### `hire_employee`

**Hire Employee.** Initiates and auto-completes a Hire Employee business process, converting an existing applicant/pre-hire (by WID) into a worker effective on a hire date, optionally filling a specific position. Use after a pre-hire record exists to formally hire the candidate. Not idempotent: each call submits a new hire event. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `applicantId` | string | yes |  | Applicant / Pre-Hire ID. The ID of the pre-hire or applicant to hire. |
| `hireDate` | string | yes |  | Hire Date. Hire date (YYYY-MM-DD). |
| `jobProfileId` | string | no |  | Job Profile ID. Job profile reference ID. |
| `supervisoryOrganizationId` | string | no |  | Supervisory Organization ID. Supervisory organization reference ID. |
| `positionId` | string | no |  | Position ID. Position reference ID. |
| `hireReasonId` | string | no | `"Hire_Employee_Hire_Employee_New_Hire"` | Hire Reason ID. Hire reason reference ID (General_Event_Subcategory_ID), e.g. `Hire_Employee_Hire_Employee_New_Hire`. |
| `employeeTypeId` | string | no | `"Regular"` | Employee Type ID. Employee type reference ID (Employee_Type_ID), e.g. `Regular`. |

### `update_supplier`

**Update Supplier.** Updates an existing supplier (identified by its supplier WID) in Workday, setting any of name, a tax ID with its Tax ID Type (e.g. USA-EIN; other tax IDs are kept), and payment-terms WID. Use to amend supplier master data. Idempotent: keyed on the supplier ID, so re-sending the same field values converges to the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `supplierId` | string | yes |  | Supplier ID. The ID of the supplier to update. |
| `supplierName` | string | no |  | Supplier Name. Updated supplier name. |
| `taxId` | string | no |  | Tax ID. Supplier tax identification number. Needs Tax ID Type. Adds or replaces the tax ID of that type only; other tax IDs are kept. |
| `taxIdType` | string | no |  | Tax ID Type. Workday Tax ID Type reference ID, e.g. `USA-EIN`. Required when Tax ID is set. |
| `paymentTermsId` | string | no |  | Payment Terms ID. Payment terms reference ID. |

### `update_supplier_invoice`

**Update Supplier Invoice.** Updates an existing supplier invoice (identified by its invoice WID) in Workday, setting any of invoice date, invoice number, and total amount. Use to amend an existing supplier invoice. Idempotent: keyed on the invoice ID, so re-sending the same field values converges to the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice ID. The ID of the supplier invoice to update. |
| `invoiceDate` | string | no |  | Invoice Date. Invoice date (YYYY-MM-DD). |
| `invoiceNumber` | string | no |  | Invoice Number. Invoice number. |
| `total` | string | no |  | Total Amount. Invoice total amount. |

### `get_business_object_details_batch`

**Get Business Object Details (Batch).** Fetches the full record for one or more Workday business objects by ID in a single step, for one object type. With the SOAP source (the default, needs ISU credentials) it fetches all IDs in one request for Worker, Organization, Job Profile, Location, Job Family, Job Family Group, Job Classification Group, Position, Worker Document, Citizenship Status, Job Requisition, Evergreen Requisition, Applicant, Payee, or Customer Contract; IDs may be WIDs or the object ID (e.g. Employee ID), and an unknown ID fails the step with Workday's error. With the REST source it reads a module's Worker, Case, or Time Entry record or a custom REST path. Use when the record IDs are already known; use Search Business Object (Batch) to find records by criteria. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source` | string | no | `"wws"` | Source. Workday Web Services (SOAP) reaches every object in the list and needs ISU credentials on the connection. REST covers fewer objects. One of `"wws"`, `"rest"`. |
| `module` | string | no |  | Module. Workday functional area: Recruiting, Onboarding, or HR Services & Time Tracking. Only used with the REST source. One of `"recruiting"`, `"onboarding"`, `"hr_services_time_tracking"`. |
| `businessObject` | object | yes |  | Business Object. An object whose fields depend on other inputs; the product shows them. |
| `objectIds` | array | yes |  | Object IDs. One or more record IDs to retrieve: WIDs, or with the SOAP source also the object ID (e.g. Employee ID for workers). Each item: { `id` }. |

### `search_business_object_batch`

**Search Business Object (Batch).** Pages through a Workday business object collection and returns every matching record, for one object type. With the SOAP source (the default, needs ISU credentials) it lists records of Worker, Organization, Job Profile, Location, Job Family, Job Family Group, Job Classification Group, Position, Worker Document, Citizenship Status, Job Requisition, Evergreen Requisition, Applicant, or Customer Contract, up to the Limit (default 100, max 1000); Payees can only be fetched by ID with Get Business Object Details. With the REST source it pages a module's Worker, Case, or Time Entry collection or a custom REST path, and optional JSON query parameters narrow the results. Use to find records by criteria, and Get Business Object Details (Batch) when the IDs are already known. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source` | string | no | `"wws"` | Source. Workday Web Services (SOAP) reaches every object in the list and needs ISU credentials on the connection. REST covers fewer objects. One of `"wws"`, `"rest"`. |
| `module` | string | no |  | Module. Workday functional area: Recruiting, Onboarding, or HR Services & Time Tracking. Only used with the REST source. One of `"recruiting"`, `"onboarding"`, `"hr_services_time_tracking"`. |
| `businessObject` | object | yes |  | Business Object. An object whose fields depend on other inputs; the product shows them. |
| `limit` | number | no | `100` | Limit. Maximum number of records to return with the SOAP source (default 100, max 1000). Workday records are large, so keep this low. |
| `queryParams` | JSON | no |  | Query Parameters (JSON). Optional REST query parameters, e.g. `{ "limit": 50, "status": "Open" }`. Only used with the REST source. |

### `update_business_object`

**Update Business Object.** Updates one existing Workday business object by its ID, sending the new field values as a JSON body, after selecting the module (Recruiting, Onboarding, or HR Services & Time Tracking) and an object type (Worker, Case, or Time Entry), or supplying a custom REST path instead. Use for generic edits to worker, case, or time-entry records, and prefer the dedicated action (e.g. Update Supplier, Change Job) when one exists. Requires the record ID and a JSON body. Idempotent: keyed on the object ID, so re-sending the same body converges to the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. Workday functional area: Recruiting, Onboarding, or HR Services & Time Tracking. One of `"recruiting"`, `"onboarding"`, `"hr_services_time_tracking"`. |
| `businessObject` | object | yes |  | Business Object. An object whose fields depend on other inputs; the product shows them. |
| `objectId` | string | yes |  | Object ID. Workday ID of the record to update. |
| `body` | JSON | yes |  | Request Body (JSON). JSON payload for create or update operations. |

### `call_operation`

**Call Operation.** Invokes a Workday operation that has no dedicated action, in one of two modes: a REST sub-resource call (POST, PUT, or PATCH against a business-object path such as /cases/{id}/reopen) or a raw SOAP operation against a named web service such as Staffing. Use as the escape hatch for verbs like approve, close, or submit, and prefer the specific action (e.g. Approve Task, Update Business Object) whenever one exists. Requires the operation name, plus the SOAP service name when running in SOAP mode. Not idempotent: each call submits the operation as a fresh event. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. Workday functional area: Recruiting, Onboarding, or HR Services & Time Tracking. One of `"recruiting"`, `"onboarding"`, `"hr_services_time_tracking"`. |
| `businessObject` | object | yes |  | Business Object. An object whose fields depend on other inputs; the product shows them. |
| `operationType` | string | yes | `"rest"` | Operation Type. One of `"rest"`, `"soap"`. |
| `operationName` | string | yes |  | Operation Name. REST sub-resource or SOAP operation path, e.g. `/cases/{id}/reopen` or `Close_Job_Requisition`. |
| `soapService` | string | no |  | SOAP Service. Workday Web Service that owns the operation. Required for SOAP operations. One of `"Absence_Management"`, `"Benefits_Administration"`, `"Cash_Management"`, `"Compensation"`, `"Compensation_Review"`, `"Financial_Management"`, `"Human_Resources"`, `"Identity_Management"`, `"Integrations"`, `"Learning"`, `"Payroll"`, `"Payroll_Interface"`, `"Performance_Management"`, `"Recruiting"`, `"Resource_Management"`, `"Revenue_Management"`, `"Staffing"`, `"Talent"`, `"Time_Tracking"`, `"Workforce_Planning"`. |
| `soapVersion` | string | no |  | SOAP Version. Workday Web Services version for this call, e.g. `v45.0`. Leave empty to use the connection version (default v47.0). |
| `httpMethod` | string | no | `"POST"` | HTTP Method. One of `"POST"`, `"PUT"`, `"PATCH"`. |
| `body` | JSON | no |  | Request Body (JSON). JSON payload for REST operations. |
| `soapBody` | string | no |  | SOAP Body (XML). Raw SOAP operation XML, used only for SOAP operations. Leave empty to send an empty operation element. |

### `get_custom_objects`

**Get Custom Objects.** Retrieves one record of a tenant-defined Workday custom object, addressed by the definition alias plus either the record ID or, for a single-instance object, the ID of the record it is attached to (e.g. the worker WID). Call List Custom Object Definitions (Batch) first to discover the alias, and use Get Business Object Details (Batch) for standard objects such as workers or job requisitions. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `definitionId` | string | yes |  | Custom Object Definition. The custom object definition; its value is the definition alias, e.g. `apTestInfo`. A value the product loads from the provider, such as an id; write the value itself. |
| `objectId` | string | yes |  | Record ID. The custom object record ID, or for a single-instance object the ID of the record it is attached to (e.g. the worker WID). |

### `get_report`

**Get Report.** Runs a Workday custom report that is enabled as a web service (RaaS), addressed by its RaaS URL or `owner/report_name`, and returns its rows as JSON or the raw CSV, optionally passing prompt values keyed by prompt XML alias. Use when the data is already shaped by a report definition in the tenant; prefer Find Records (WQL) or Get Report using WQL (Batch) when the query can be expressed in WQL instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reportId` | string | yes |  | Report. The custom report's RaaS URL (on the report: Actions → Web Service → View URLs, copy the JSON link) or `owner/report_name`, e.g. `lmcneil/PT_Workers`. The report must have Enable As Web Service ticked. Prompt values in a pasted URL are kept. |
| `reportParameters` | JSON | no |  | Report Prompts (JSON). Prompt values keyed by the prompt XML alias, e.g. `{ "Start_Date": "2026-10-01", "Organizations!WID": "<WID>" }`. A list is sent as multiple values. These override prompts in a pasted URL. |
| `format` | string | no | `"json"` | Format. JSON returns the rows; CSV returns the report as CSV text. One of `"json"`, `"csv"`. |

### `get_report_wql_batch`

**Get Report using WQL (Batch).** Runs a Workday Query Language (WQL) query and pages through every result row, returning the complete set in one call. Use for report-style extracts where the whole dataset is needed rather than the single page Find Records (WQL) returns, and use Get Report when the data comes from a published report definition. Requires a valid WQL statement. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | WQL Query. Workday Query Language query. Include a date/timestamp column for polling triggers. |

### `list_custom_object_definitions_batch`

**List Custom Object Definitions (Batch).** Lists every custom object definition configured in the connected Workday tenant. Use as the discovery step before Get Custom Objects or Create/Update Custom Object, which both need a definition ID. Takes no inputs. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `create_update_custom_object`

**Create/Update Custom Object.** Writes a record of a tenant-defined Workday custom object, chosen by its definition alias, with the field values supplied as a JSON body keyed by field alias. Without a record ID the body must name the record it is attached to, e.g. `{ "worker": { "id": "<worker WID>" }, "note": "..." }`; a single-instance object that already has a record is updated instead of duplicated. With a record ID only the given fields of that record are updated. Call List Custom Object Definitions (Batch) first when the alias is unknown. Not idempotent for multi-instance objects: with no record ID every call creates another record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `definitionId` | string | yes |  | Custom Object Definition. The custom object definition; its value is the definition alias, e.g. `apTestInfo`. A value the product loads from the provider, such as an id; write the value itself. |
| `objectId` | string | no |  | Record ID. Record ID to update. Leave blank to create; the body must then reference the record it is attached to, e.g. `{ "worker": { "id": "..." } }`. |
| `body` | JSON | yes |  | Request Body (JSON). JSON payload for create or update operations. |

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

# Salesforce

CRM software solutions and enterprise cloud computing

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-salesforce'
  version: '0.9.4'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Authenticate with Salesforce

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `environment` | string | yes | `"login.salesforce.com"` | Salesforce Domain. Enter your Salesforce domain. Use "login.salesforce.com" for Production, "test.salesforce.com" for Sandbox, or your custom My Domain (e.g. "mycompany.my.salesforce.com" or "mycompany.sandbox.my.salesforce.com"). |

## Actions

### `add_contact_to_campaign`

**Add Contact to Campaign.** Add a Contact to a Campaign by creating a CampaignMember linking the two, with an optional member status. Not idempotent — re-adding the same contact to the same campaign errors on the existing membership. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | yes |  | Status. The campaign member status (e.g., 'Sent', 'Responded'). A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `errors`: Errors

### `add_file_to_record`

**Add File to Record.** Upload a file and attach it to an existing Salesforce record by creating a ContentVersion linked to the target record Id. Use when you need to attach a document, image, or other binary to a record. Not idempotent: each call creates a new file version, so re-running attaches a duplicate file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Select the Object. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. The record to select. The list shows the 20 most recently created records. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to upload. Files are not supported; an action that needs one fails. |
| `file_name` | string | yes |  | File Name. The name of the file, including its extension (e.g., "report.pdf"). |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `errors`: Errors

### `add_lead_to_campaign`

**Add Lead to Campaign.** Link an existing Lead to an existing Campaign by creating a CampaignMember with the given member status. Use to enroll a known lead in a campaign. Not idempotent: re-running creates another CampaignMember, and Salesforce rejects a duplicate lead/campaign pairing with an error. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `lead_id` | string | yes |  | Lead. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | yes |  | Status. The campaign member status (e.g., 'Sent', 'Responded'). A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `errors`: Errors

### `create_attachment`

**Create Attachment (Legacy).** Attach a file to a record using the legacy Attachment object (single parent, no sharing). Prefer modern Files/ContentDocument when available; this is for older orgs or when a classic Attachment is specifically required. Not idempotent — repeated calls create duplicate attachments. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Select the Object. A value the product loads from the provider, such as an id; write the value itself. |
| `parent_id` | string | yes |  | Record. The record to select. The list shows the 20 most recently created records. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to attach. Files are not supported; an action that needs one fails. |
| `file_name` | string | yes |  | File Name. The name of the file, including its extension (e.g., "attachment.pdf"). |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `errors`: Errors

### `create_case`

**Create Case.** Create a new support Case (customer issue/problem) with a required Subject and optional status, priority, origin, and links to an Account or Contact. Not idempotent — each call opens a separate Case, so guard against duplicate submissions. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `Subject` | string | yes |  | Subject. |
| `Description` | string | no |  | Description. |
| `Status` | string | no |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `Priority` | string | no |  | Priority. A value the product loads from the provider, such as an id; write the value itself. |
| `Origin` | string | no |  | Origin. A value the product loads from the provider, such as an id; write the value itself. |
| `AccountId` | string | no |  | Account. A value the product loads from the provider, such as an id; write the value itself. |
| `ContactId` | string | no |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `other_fields` | JSON | no |  | Other Fields. Enter additional fields as a JSON object. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `errors`: Errors

### `create_contact`

**Create Contact.** Create a new Contact in Salesforce; Last Name is required and the contact can be linked to an existing Account. Not idempotent — calling it twice creates duplicate contacts, so check for an existing match (e.g. via Find Record) first if dedup matters. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `LastName` | string | yes |  | Last Name. |
| `FirstName` | string | no |  | First Name. |
| `AccountId` | string | no |  | Account. A value the product loads from the provider, such as an id; write the value itself. |
| `Email` | string | no |  | Email. |
| `Phone` | string | no |  | Phone. |
| `Title` | string | no |  | Title. |
| `other_fields` | JSON | no |  | Other Fields. Enter additional fields as a JSON object. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `errors`: Errors

### `create_lead`

**Create Lead.** Create a new Lead; Last Name and Company are required. Not idempotent — each call adds another Lead, so dedup beforehand if needed. Use Update Lead to modify an existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `LastName` | string | yes |  | Last Name. |
| `Company` | string | yes |  | Company. |
| `FirstName` | string | no |  | First Name. |
| `Email` | string | no |  | Email. |
| `Phone` | string | no |  | Phone. |
| `LeadSource` | string | no |  | Lead Source. A value the product loads from the provider, such as an id; write the value itself. |
| `other_fields` | JSON | no |  | Other Fields. Enter additional fields as a JSON object (e.g., {"Title": "Manager", "Website": "http://example.com"}). |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `errors`: Errors

### `create_note`

**Create Note.** Create a classic Salesforce Note (title and body) and attach it to a parent record via its record Id. Use to add a free-text note to an existing record. Not idempotent: each call creates a new Note, so re-running adds a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Select the Object. A value the product loads from the provider, such as an id; write the value itself. |
| `parent_id` | string | yes |  | Record. The record to select. The list shows the 20 most recently created records. A value the product loads from the provider, such as an id; write the value itself. |
| `Title` | string | yes |  | Title. |
| `Body` | string | yes |  | Body. The content of the note. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `errors`: Errors

### `create_opportunity`

**Create Opportunity.** Create a new sales Opportunity; Name, Close Date (YYYY-MM-DD), and Stage are required, with an optional Account link and Amount. Not idempotent — each call creates another Opportunity. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `Name` | string | yes |  | Name. |
| `CloseDate` | string | yes |  | Close Date. The expected close date in YYYY-MM-DD format. |
| `StageName` | string | yes |  | Stage. A value the product loads from the provider, such as an id; write the value itself. |
| `AccountId` | string | no |  | Account. A value the product loads from the provider, such as an id; write the value itself. |
| `Amount` | number | no |  | Amount. |
| `other_fields` | JSON | no |  | Other Fields. Enter additional fields as a JSON object. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `errors`: Errors

### `create_record`

**Create Record.** Create a new Salesforce record of any standard or custom object (Account, Contact, Lead, etc.) by supplying the object API name plus a JSON map of field values. Pick this for the general "insert one record" case; use Create Object (Advanced) only when you need the raw API response envelope rather than the record body. Not idempotent: each call inserts a new record with a new Id, so re-running creates duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Select the Object. A value the product loads from the provider, such as an id; write the value itself. |
| `data` | JSON | yes | `{}` | Record Data. Enter the fields for the new record as a JSON object. For example: {"Name": "My New Account", "Industry": "Technology"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `errors`: Errors

### `create_task`

**Create Task.** Create a new activity Task with a required Subject and optional owner, status, priority, and links to a Contact/Lead (WhoId) or other object (WhatId). Not idempotent — each call creates a separate task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `Subject` | string | yes |  | Subject. |
| `OwnerId` | string | yes |  | Owner. The owner of the task. A value the product loads from the provider, such as an id; write the value itself. |
| `Status` | string | yes |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `Priority` | string | yes |  | Priority. A value the product loads from the provider, such as an id; write the value itself. |
| `Description` | string | no |  | Description. |
| `WhoId` | string | no |  | Related To (Contact/Lead ID). The ID of a Contact or Lead to relate the task to. |
| `WhatId` | string | no |  | Related To (Other Object ID). The ID of an Account, Opportunity, or other object to relate the task to. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `errors`: Errors

### `delete_opportunity`

**Delete Opportunity.** Delete a single Opportunity by its ID. Destructive and irreversible; not idempotent, since deleting an already-removed Opportunity errors. For other object types use the generic Delete Record. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunity_id` | string | yes |  | Opportunity. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)

### `delete_record`

**Delete Record.** Delete a single record of any object by its ID. Destructive and irreversible from here; not idempotent, since a repeat call on an already-deleted ID errors. Use this generic delete for objects without a dedicated one (Delete Opportunity exists separately). Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Select the Object. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. The record to select. The list shows the 20 most recently created records. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)

### `export_report`

**Export Report .** Run an existing Salesforce report by its ID and return its results as a downloadable Excel (.xlsx) file. Read-only — it does not change the report or any records, and the report definition must already exist. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `report_id` | string | yes |  | Report. A value the product loads from the provider, such as an id; write the value itself. |

### `find_child_records`

**Find Child Records.** List the child records on one side of a parent record relationship (e.g. the Contacts under an Account) by parent ID and child-relationship name (read-only). Use when you already have a parent record and want its related records via a defined relationship; for arbitrary filtered lookups use Run Query instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent_object` | string | yes |  | Object. Select the Object. A value the product loads from the provider, such as an id; write the value itself. |
| `parent_id` | string | yes |  | Parent Record. The parent record to find child records for. The list shows the 20 most recently created records. A value the product loads from the provider, such as an id; write the value itself. |
| `child_relationship` | string | yes |  | Child Relationship. The child relationship to retrieve records from. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `count`: Records Returned (number)
- `records`: Records
- `records[].id`: Record ID
- `records[].apiName`: Object
- `records[].fields`: Fields (an object whose keys vary)
- `records[].lastModifiedById`: Last Modified By ID
- `records[].lastModifiedDate`: Last Modified Date (datetime)
- `records[].recordTypeId`: Record Type ID
- `nextPageToken`: Next Page Token
- `nextPageUrl`: Next Page URL

### `find_record`

**Find Record.** Look up records of a chosen Salesforce object where a single field equals an exact value (read-only, returns up to 200 matches). Pick this for simple equality lookups by a known field such as Email or Name; for multi-condition filters, joins, or sorting use Run Query (SOQL) instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Select the Object. A value the product loads from the provider, such as an id; write the value itself. |
| `field` | string | yes |  | Field. Select the Field. A value the product loads from the provider, such as an id; write the value itself. |
| `search_value` | string | yes |  | Search Value. The value to search for in the selected field. |

Output fields:

- `totalSize`: Total Matching Records (number)
- `done`: All Records Returned (boolean)
- `records`: Records

### `find_records_by_query`

**Find Records by Query (Advanced).** Search records of one Salesforce object by providing the object API name and a SOQL WHERE clause (no "WHERE" keyword); returns up to 200 matching records with all fields. Use this to look up or filter existing records by field conditions. Read-only and idempotent. Constraint: the WHERE clause is interpolated directly into the query, so it must be valid SOQL and properly escaped. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Select the Object. A value the product loads from the provider, such as an id; write the value itself. |
| `where_clause` | string | yes |  | WHERE Clause. Enter the WHERE clause for your SOQL query. For example: `Name = 'Acme' AND Industry = 'Technology'`. Do not include the 'WHERE' keyword. |

Output fields:

- `totalSize`: Total Matching Records (number)
- `done`: All Records Returned (boolean)
- `records`: Records

### `get_record_attachments`

**Get Record Attachments.** List the files attached to a record, covering both legacy Attachment objects and modern Files (ContentDocument) in one read-only call. Use to discover what is attached to a record by its ID; it returns metadata only, not the file contents. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Select the Object. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. The record to select. The list shows the 20 most recently created records. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `classic_attachments`: Classic Attachments
- `classic_attachments[].Id`: Attachment ID
- `classic_attachments[].Name`: Name
- `classic_attachments[].BodyLength`: Size (filesize)
- `classic_attachments[].ContentType`: Content Type
- `files`: Files
- `files[].Id`: Content Document ID
- `files[].Title`: Title

### `run_query`

**Run Query (Advanced).** Run an arbitrary SOQL query string and return the matching records (read-only). Use this for any read needing multiple conditions, field selection, relationships, ordering, or aggregation that the simpler Find Record lookup cannot express; the caller must supply valid SOQL. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Enter the query. |

Output fields:

- `status`: HTTP Status (number)
- `body`: Result
- `body.totalSize`: Total Matching Records (number)
- `body.done`: All Records Returned (boolean)
- `body.records`: Records

### `run_report`

**Run Report.** Run an existing Salesforce analytics report by its report Id and get back flattened rows (detail and grouping columns) instead of raw factMap structures. Optionally pass dynamic filters to override the report's saved filters for this run. Use to read aggregated/reported data rather than to query raw records. Read-only and idempotent — it executes the report without changing it. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `report_id` | string | yes |  | Report. A value the product loads from the provider, such as an id; write the value itself. |
| `filters` | JSON | no | `[{"column":"ACCOUNT.NAME","operator":"equals","value":"Acme"}]` | Filters. Apply dynamic filters to the report run. Leave empty to use the report's saved filters. |

Output fields:

- `reportName`: Report Name
- `reportId`: Report ID
- `totalRows`: Total Rows (number)
- `columns`: Columns
- `rows`: Rows

### `send_email`

**Send Email.** Send an email to a Contact or Lead (body may be plain text or HTML) and log it as an EmailMessage, optionally related to another record. Not idempotent — each call sends and records another email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recipientId` | string | yes |  | Recipient. A value the product loads from the provider, such as an id; write the value itself. |
| `subject` | string | yes |  | Subject. |
| `body` | string | yes |  | Body. The content of the email. Can be plain text or HTML. |
| `relatedToId` | string | no |  | Related To ID (Optional). The ID of a record to relate the email to (e.g., an Account, Opportunity, or Case ID). |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `errors`: Errors

### `update_contact`

**Update Contact.** Update fields (name, email, phone, title, account, or arbitrary extra fields) on an existing Salesforce Contact identified by its record Id. Use when you already have the contact Id and want to modify it rather than create one. Idempotent: re-applying the same field values to the same Id yields the same result; omitted fields are left unchanged, and a call with no fields is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `FirstName` | string | no |  | First Name. |
| `LastName` | string | no |  | Last Name. |
| `AccountId` | string | no |  | Account. A value the product loads from the provider, such as an id; write the value itself. |
| `Email` | string | no |  | Email. |
| `Phone` | string | no |  | Phone. |
| `Title` | string | no |  | Title. |
| `other_fields` | JSON | no |  | Other Fields (Advanced). Enter any additional fields to update as a JSON object. |

Output fields:

- `success`: Success (boolean)

### `update_lead`

**Update Lead.** Update fields on an existing Lead selected by its ID; only the fields you provide are changed and the Lead must already exist. Use Create Lead to add a new one; this does not convert the Lead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | yes |  | Lead. A value the product loads from the provider, such as an id; write the value itself. |
| `FirstName` | string | no |  | First Name. |
| `LastName` | string | no |  | Last Name. |
| `Company` | string | no |  | Company. |
| `Email` | string | no |  | Email. |
| `Phone` | string | no |  | Phone. |
| `LeadSource` | string | no |  | Lead Source. A value the product loads from the provider, such as an id; write the value itself. |
| `other_fields` | JSON | no |  | Other Fields (Advanced). Enter any additional fields to update as a JSON object. |

Output fields:

- `success`: Success (boolean)

### `update_record`

**Update Record.** Update an existing record of any object, selected by object type and record ID, with a JSON map of fields to change; only supplied fields are modified and the record must already exist. The standard update action — use a stable record ID, not an external ID (use Batch/Bulk Upsert for external-ID matching). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Select the Object. A value the product loads from the provider, such as an id; write the value itself. |
| `record_id` | string | yes |  | Record. The record to select. The list shows the 20 most recently created records. A value the product loads from the provider, such as an id; write the value itself. |
| `data` | JSON | yes | `{}` | Data to Update. Enter the fields to update as a JSON object. For example: {"BillingCity": "San Francisco"}. |

Output fields:

- `success`: Success (boolean)

### `upsert_by_external_id`

**Batch Upsert (Advanced).** Insert-or-update a small batch of records via the composite API, matching on a stable external-ID field and accepting JSON input. Idempotent on the external ID — rerunning with the same data updates rather than duplicates. Use Bulk Upsert for large CSV loads. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Select the Object. A value the product loads from the provider, such as an id; write the value itself. |
| `external_field` | string | yes |  | External Field. Select the External Field. |
| `records` | JSON | yes | `{"records":[]}` | Records. Select the Records. |

Output fields:

- `status`: HTTP Status (number)
- `body`: Results
- `body[].id`: Record ID
- `body[].success`: Success (boolean)
- `body[].created`: Created (boolean)
- `body[].errors`: Errors

### `upsert_by_external_id_bulk`

**Bulk Upsert (Advanced).** Insert-or-update many records at once via the Bulk API, matching on a stable external-ID field and accepting CSV input. Idempotent on the external ID — rerunning with the same data does not create duplicates. Pick this for large batches; use Batch Upsert for small JSON payloads. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Select the Object. A value the product loads from the provider, such as an id; write the value itself. |
| `external_field` | string | yes |  | External Field. Select the External Field. |
| `records` | string | yes |  | Records. Select the Records (CSV format) |

Output fields:

- `status`: HTTP Status (number)
- `body`: Bulk Job
- `body.id`: Job ID
- `body.state`: State
- `body.object`: Object
- `body.operation`: Operation
- `body.externalIdFieldName`: External ID Field
- `body.numberRecordsProcessed`: Records Processed (number)
- `body.numberRecordsFailed`: Records Failed (number)
- `body.createdById`: Created By ID
- `body.createdDate`: Created Date (datetime)
- `body.systemModstamp`: Last Modified Date (datetime)

### `add_contact_to_campaign_member`

**Add Contact to Campaign.** Enrolls an existing Contact in a Campaign by creating a CampaignMember, with an optional member status (e.g. Sent or Responded; defaults to the campaign default). Use Add Lead to Campaign for leads and Remove Campaign Member to take it out. Not idempotent: Salesforce rejects the call if the contact is already a member of that campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign ID. |
| `contact_id` | string | yes |  | Contact ID. |
| `status` | string | no |  | Member Status. Campaign member status, e.g. Sent. Leave empty for the default. |

Output fields:

- `id`: Campaign Member ID
- `success`: Success (boolean)
- `campaign_id`: Campaign ID
- `contact_id`: Contact ID

### `add_lead_to_campaign_member`

**Add Lead to Campaign.** Enrolls an existing Lead in a Campaign by creating a CampaignMember, with an optional member status (e.g. Sent or Responded; defaults to the campaign default). Use Add Contact to Campaign for contacts and Remove Campaign Member to take it out. Not idempotent: Salesforce rejects the call if the lead is already a member of that campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign ID. |
| `lead_id` | string | yes |  | Lead ID. |
| `status` | string | no |  | Member Status. Campaign member status, e.g. Sent. Leave empty for the default. |

Output fields:

- `id`: Campaign Member ID
- `success`: Success (boolean)
- `campaign_id`: Campaign ID
- `lead_id`: Lead ID

### `add_opportunity_product`

**Add Opportunity Product.** Adds a product line item (OpportunityLineItem) to an Opportunity from a price book entry, with a quantity and exactly one of unit price or total price. Get the entry id from List Price Books with entries included; the entry must belong to the opportunity's price book (set it with Update Opportunity first if empty). Not idempotent: each call adds another line. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunity_id` | string | yes |  | Opportunity ID. |
| `pricebook_entry_id` | string | yes |  | Price Book Entry ID. |
| `quantity` | number | yes |  | Quantity. |
| `unit_price` | number | no |  | Unit Price. Sales price per unit. Do not combine with Total Price. |
| `total_price` | number | no |  | Total Price. Quantity times price. Do not combine with Unit Price. |
| `description` | string | no |  | Line Description. |

Output fields:

- `id`: Opportunity Product ID
- `success`: Success (boolean)
- `opportunity_id`: Opportunity ID
- `pricebook_entry_id`: Price Book Entry ID
- `quantity`: Quantity (number)

### `apply_lead_assignment_rules`

**Apply Lead Assignment Rules.** Runs the org's active lead assignment rule on an existing Lead so it gets routed to the right owner or queue, and reports the owner before and after. Use it after Create Lead or Update Lead when ownership should follow the org's routing; to set an owner directly use Update Lead with Owner ID. Needs an active lead assignment rule in the org, otherwise the owner does not change. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | yes |  | Lead ID. |

Output fields:

- `id`: Lead ID
- `previous_owner_id`: Previous Owner ID
- `owner_id`: Owner ID
- `reassigned`: Reassigned (boolean)

### `complete_task`

**Complete Task.** Marks an existing Salesforce Task as done by setting its status to the org's first closed task status (usually Completed), optionally appending a closing note to its description. Use Update Task for other changes. Safe to retry, but a closing note is appended again on every call. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. |
| `closing_note` | string | no |  | Closing Note. Text appended to the task description. |

Output fields:

- `id`: Task ID
- `success`: Success (boolean)
- `status`: Status
- `updated_fields`: Updated Fields

### `create_account`

**Create Account.** Creates a Salesforce Account (company) with a required Name and optional phone, website, industry, billing address, owner and parent account; put custom fields in Additional Fields. Use Search Accounts first to avoid duplicates, and Update Account to change an existing one. Not idempotent: each call creates a new Account. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `Name` | string | yes |  | Account Name. |
| `Phone` | string | no |  | Phone. |
| `Website` | string | no |  | Website. |
| `Industry` | string | no |  | Industry. Industry picklist value, e.g. Technology. |
| `Type` | string | no |  | Type. Account type picklist value, e.g. Customer - Direct or Prospect. |
| `BillingStreet` | string | no |  | Billing Street. |
| `BillingCity` | string | no |  | Billing City. |
| `BillingState` | string | no |  | Billing State. |
| `BillingPostalCode` | string | no |  | Billing Postal Code. |
| `BillingCountry` | string | no |  | Billing Country. |
| `Description` | string | no |  | Description. |
| `OwnerId` | string | no |  | Owner ID. User id of the account owner. |
| `ParentId` | string | no |  | Parent Account ID. |
| `additional_fields` | JSON | no |  | Additional Fields. Any other fields, including custom ones, as a JSON object of API name to value, e.g. {"My_Field__c": "x"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `name`: Account Name

### `create_bulk_query_job`

**Create Bulk Query Job.** Starts an asynchronous Bulk API 2.0 SOQL query and returns the job id immediately. Poll Get Bulk Query Job until JobComplete, then page through rows with Get Bulk Query Results. Use it for exports of many thousands of rows; for small result sets use the regular SOQL query action. queryAll also returns deleted and archived records. Starts a new job every call. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | SOQL Query. e.g. SELECT Id, Name FROM Account. Bulk queries do not support GROUP BY, OFFSET or TYPEOF. |
| `operation` | string | yes | `"query"` | Operation. One of `"query"`, `"queryAll"`. |

Output fields:

- `job_id`: Job ID
- `state`: State
- `object`: Object
- `operation`: Operation

### `create_campaign`

**Create Campaign.** Creates a Salesforce Campaign with a required Name and optional type, status, start/end dates (YYYY-MM-DD), active flag, budget, expected revenue and parent campaign; custom fields go in Additional Fields. Use Update Campaign to change one, and Add Lead to Campaign / Add Contact to Campaign to enroll members. The user needs the Marketing User permission. Not idempotent: each call creates a new Campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `Name` | string | yes |  | Name. |
| `Type` | string | no |  | Type. Campaign type picklist value, e.g. Webinar or Email. |
| `Status` | string | no |  | Status. Campaign status picklist value, e.g. Planned. |
| `StartDate` | string | no |  | Start Date. YYYY-MM-DD. |
| `EndDate` | string | no |  | End Date. YYYY-MM-DD. |
| `IsActive` | boolean | no |  | Active. |
| `BudgetedCost` | number | no |  | Budgeted Cost. |
| `ExpectedRevenue` | number | no |  | Expected Revenue. |
| `Description` | string | no |  | Description. |
| `ParentId` | string | no |  | Parent Campaign ID. |
| `additional_fields` | JSON | no |  | Additional Fields. Any other fields, including custom ones, as a JSON object of API name to value, e.g. {"My_Field__c": "x"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `name`: Campaign Name

### `create_record_tree`

**Create Record Tree.** Creates parent records of one object together with nested child records (e.g. an Account with its Contacts and Opportunities) in a single all-or-nothing call, returning the new id for each referenceId. Use it when children must be linked to parents created in the same step; for flat inserts use Create Records Batch. Limits: 200 records in total across all levels, up to 5 levels deep, insert only. Not idempotent: every call creates new records. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Root Object. API name of the top-level records, e.g. Account. |
| `records` | JSON | yes |  | Records. JSON array of top-level records. Nest children under their relationship name, e.g. [{"Name": "Acme", "Contacts": {"records": [{"attributes": {"type": "Contact", "referenceId": "c1"}, "LastName": "Doe"}]}}]. Top-level attributes are filled in when omitted. |

Output fields:

- `has_errors`: Has Errors (boolean)
- `results`: Results
- `results[].reference_id`: Reference ID
- `results[].id`: Record ID
- `results[].errors`: Errors

### `create_records_batch`

**Create Records Batch.** Creates up to 200 records of one Salesforce object in a single call and returns a per-record result (id or error) in input order. Use it instead of repeated Create Record calls; to create parents with nested children use Create Record Tree, and to avoid duplicates on an external id use Upsert Records Batch. With All or None on, one failure rolls back the whole batch. Not idempotent: every call creates new records. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account, Contact or My_Object__c. |
| `records` | JSON | yes |  | Records. JSON array of up to 200 objects of field API names to values, e.g. [{"Name": "Acme"}, {"Name": "Globex"}]. |
| `all_or_none` | boolean | no | `false` | All or None. Roll back every record if any record fails. |

Output fields:

- `results`: Results
- `results[].index`: Index (number)
- `results[].id`: Record ID
- `results[].success`: Success (boolean)
- `results[].errors`: Errors
- `success_count`: Succeeded (number)
- `failure_count`: Failed (number)

### `create_sf_contact`

**Create Contact.** Creates a Salesforce Contact with a required Last Name and optional name, email, phones, title, department, account link, mailing location, lead source and owner; custom fields go in Additional Fields. Use Search Contacts first to avoid duplicates and Update Contact to change an existing one; for unqualified prospects use Create Lead instead. Not idempotent: each call creates a new Contact. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `LastName` | string | yes |  | Last Name. |
| `FirstName` | string | no |  | First Name. |
| `Email` | string | no |  | Email. |
| `Phone` | string | no |  | Phone. |
| `MobilePhone` | string | no |  | Mobile Phone. |
| `Title` | string | no |  | Title. |
| `Department` | string | no |  | Department. |
| `AccountId` | string | no |  | Account ID. |
| `MailingCity` | string | no |  | Mailing City. |
| `MailingCountry` | string | no |  | Mailing Country. |
| `LeadSource` | string | no |  | Lead Source. Lead source picklist value, e.g. Web. |
| `Description` | string | no |  | Description. |
| `OwnerId` | string | no |  | Owner ID. |
| `additional_fields` | JSON | no |  | Additional Fields. Any other fields, including custom ones, as a JSON object of API name to value, e.g. {"My_Field__c": "x"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `last_name`: Last Name
- `email`: Email (email)

### `create_sf_lead`

**Create Lead.** Creates a Salesforce Lead with a required Last Name and Company plus optional contact details, status, lead source, industry, website, location and owner; custom fields go in Additional Fields. Use Search Leads first to avoid duplicates, Update Lead to change one, and Apply Lead Assignment Rules to route it to an owner. Not idempotent: each call creates a new Lead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `LastName` | string | yes |  | Last Name. |
| `Company` | string | yes |  | Company. |
| `FirstName` | string | no |  | First Name. |
| `Email` | string | no |  | Email. |
| `Phone` | string | no |  | Phone. |
| `Title` | string | no |  | Title. |
| `Status` | string | no |  | Status. Lead status picklist value, e.g. Open - Not Contacted. |
| `LeadSource` | string | no |  | Lead Source. |
| `Industry` | string | no |  | Industry. |
| `Website` | string | no |  | Website. |
| `City` | string | no |  | City. |
| `Country` | string | no |  | Country. |
| `Description` | string | no |  | Description. |
| `OwnerId` | string | no |  | Owner ID. User or queue id. |
| `additional_fields` | JSON | no |  | Additional Fields. Any other fields, including custom ones, as a JSON object of API name to value, e.g. {"My_Field__c": "x"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `last_name`: Last Name
- `company`: Company

### `create_sf_note`

**Create Note.** Attaches a classic Salesforce Note (title and plain-text body, up to 32 KB) to any record such as an Account, Contact, Lead, Opportunity or Case, optionally private to the owner. Use Create Task or Log Call for activities instead of free-text notes. Not idempotent: each call adds another note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ParentId` | string | yes |  | Parent Record ID. The record the note belongs to. |
| `Title` | string | yes |  | Title. |
| `Body` | string | no |  | Body. |
| `IsPrivate` | boolean | no |  | Private. Only the owner and admins can see it. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `parent_id`: Parent Record ID
- `title`: Title

### `create_sf_opportunity`

**Create Opportunity.** Creates a Salesforce Opportunity with a required Name, Stage and Close Date (YYYY-MM-DD) plus optional account, amount, probability, type, source, next step, owner and price book; custom fields go in Additional Fields. Use Update Opportunity to change one and Add Opportunity Product to add line items (set Price Book ID here or it must be set before adding products). Not idempotent: each call creates a new Opportunity. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `Name` | string | yes |  | Name. |
| `StageName` | string | yes |  | Stage. Stage picklist value, e.g. Prospecting. |
| `CloseDate` | string | yes |  | Close Date. YYYY-MM-DD. |
| `AccountId` | string | no |  | Account ID. |
| `Amount` | number | no |  | Amount. |
| `Probability` | number | no |  | Probability (%). |
| `Type` | string | no |  | Type. |
| `LeadSource` | string | no |  | Lead Source. |
| `NextStep` | string | no |  | Next Step. |
| `Description` | string | no |  | Description. |
| `OwnerId` | string | no |  | Owner ID. |
| `Pricebook2Id` | string | no |  | Price Book ID. |
| `additional_fields` | JSON | no |  | Additional Fields. Any other fields, including custom ones, as a JSON object of API name to value, e.g. {"My_Field__c": "x"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `name`: Opportunity Name
- `stage`: Stage
- `close_date`: Close Date (date)

### `create_sf_task`

**Create Task.** Creates a Salesforce Task with a required Subject, optionally linked to a Contact or Lead (Who ID) and to an Account, Opportunity or other record (What ID), with owner, due date (YYYY-MM-DD), status, priority and description. Use Log Call to record a call that already happened, and Complete Task to close one. Not idempotent: each call creates a new Task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `Subject` | string | yes |  | Subject. |
| `WhoId` | string | no |  | Who ID. Contact or Lead id. |
| `WhatId` | string | no |  | What ID. Account, Opportunity, Case or other record id. |
| `OwnerId` | string | no |  | Assigned To (User ID). |
| `ActivityDate` | string | no |  | Due Date. YYYY-MM-DD. |
| `Status` | string | no |  | Status. Task status picklist value, e.g. Not Started. |
| `Priority` | string | no |  | Priority. e.g. High, Normal or Low. |
| `Description` | string | no |  | Description. |
| `additional_fields` | JSON | no |  | Additional Fields. Any other fields, including custom ones, as a JSON object of API name to value, e.g. {"My_Field__c": "x"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `subject`: Subject

### `create_sobject_record`

**Create Record.** Creates a single record of any Salesforce object (standard or custom) from a JSON object of field API names to values. Use it for one record; for up to 200 records in one call use Create Records Batch, and to create-or-update on an external id use Upsert Record by External ID. Required fields depend on the object (see Describe Object). Not idempotent: every call creates a new record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account, Contact, Lead or My_Object__c. |
| `fields` | JSON | yes |  | Fields. JSON object of field API names to values, e.g. {"Name": "Acme", "Industry": "Technology"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `object`: Object

### `delete_file`

**Delete File.** Permanently deletes a Salesforce File, all of its versions and its links to records, by its content document id (starts with 069). Destructive: confirm the id with Get File Info first; the file goes to the Recycle Bin and disappears from every record it was shared on. Not idempotent: a second call fails because the file no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content_document_id` | string | yes |  | Content Document ID. File id starting with 069. |

Output fields:

- `id`: Deleted ID
- `deleted`: Deleted (boolean)

### `delete_records_batch`

**Delete Records Batch.** Deletes up to 200 Salesforce records by id in a single call (ids may belong to different objects) and returns a per-record result in input order; deleted records go to the Recycle Bin. For a single record use Delete Record. With All or None on, one failure rolls back every delete. Not idempotent: already-deleted ids fail on a second call. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `record_ids` | array | yes |  | Record IDs. Up to 200 record ids to delete. |
| `all_or_none` | boolean | no | `false` | All or None. Roll back every delete if any delete fails. |

Output fields:

- `results`: Results
- `results[].index`: Index (number)
- `results[].id`: Record ID
- `results[].success`: Success (boolean)
- `results[].errors`: Errors
- `success_count`: Succeeded (number)
- `failure_count`: Failed (number)

### `delete_sobject_record`

**Delete Record.** Deletes a single record of any Salesforce object by id; the record goes to the Recycle Bin (recoverable for about 15 days) and cascade-deletes master-detail children. For up to 200 ids in one call use Delete Records Batch. Not idempotent: a second call on the same id fails because the record is already deleted. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account, Contact or My_Object__c. |
| `record_id` | string | yes |  | Record ID. |

Output fields:

- `id`: Deleted ID
- `deleted`: Deleted (boolean)

### `describe_object`

**Describe Object.** Returns the schema of one Salesforce object: every field (API name, label, type, required-ness, create/update permission, external id flag, lookup targets, active picklist values), its child relationships and its record types. Call it before writing SOQL or creating/updating records to get exact field API names and valid picklist values; to find the object API name first use List Objects. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account, Opportunity or My_Object__c. |

Output fields:

- `name`: API Name
- `label`: Label
- `custom`: Custom (boolean)
- `key_prefix`: Key Prefix
- `fields`: Fields
- `fields[].name`: API Name
- `fields[].label`: Label
- `fields[].type`: Type
- `fields[].length`: Length (number)
- `fields[].nillable`: Nillable (boolean)
- `fields[].createable`: Createable (boolean)
- `fields[].updateable`: Updateable (boolean)
- `fields[].custom`: Custom (boolean)
- `fields[].external_id`: External ID (boolean)
- `fields[].reference_to`: References
- `fields[].picklist_values`: Picklist Values
- `fields[].picklist_values[].value`: Value
- `fields[].picklist_values[].label`: Label
- `child_relationships`: Child Relationships
- `child_relationships[].relationship_name`: Relationship Name
- `child_relationships[].child_object`: Child Object
- `child_relationships[].field`: Field
- `record_types`: Record Types
- `record_types[].name`: Name
- `record_types[].developer_name`: Developer Name
- `record_types[].record_type_id`: Record Type ID
- `record_types[].active`: Active (boolean)
- `record_types[].master`: Master (boolean)

### `download_file`

**Download File.** Downloads the latest version of a Salesforce File by its content document id (starts with 069) and returns it as a file reference with its name, size and MIME type. Use Get File Info when you only need metadata. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content_document_id` | string | yes |  | Content Document ID. File id starting with 069. |

Output fields:

- `file`: File (url)
- `file_name`: File Name
- `size`: Size (filesize)
- `mime_type`: MIME Type

### `get_bulk_ingest_job`

**Get Bulk Ingest Job.** Returns the state and processed/failed record counts of a Bulk API 2.0 ingest job started by Run Bulk Ingest Job. Poll it until the state is JobComplete, Failed or Aborted, then call Get Bulk Ingest Results. For query jobs use Get Bulk Query Job. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. |

Output fields:

- `id`: Job ID
- `state`: State
- `object`: Object
- `operation`: Operation
- `numberRecordsProcessed`: Records Processed (number)
- `numberRecordsFailed`: Records Failed (number)
- `errorMessage`: Error Message
- `createdDate`: Created Date (datetime)
- `systemModstamp`: Last Modified Date (datetime)
- `totalProcessingTime`: Total Processing Time (ms) (number)

### `get_bulk_ingest_results`

**Get Bulk Ingest Results.** Returns the per-row outcome of a Bulk API 2.0 ingest job as rows: successful rows carry sf__Id and sf__Created, failed rows carry sf__Error. Results only exist once Get Bulk Ingest Job reports JobComplete or Failed; unprocessed rows are those never attempted (e.g. after an abort). Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. |
| `result_type` | string | yes | `"successfulResults"` | Result Type. One of `"successfulResults"`, `"failedResults"`, `"unprocessedrecords"`. |

Output fields:

- `rows`: Rows
- `count`: Row Count (number)

### `get_bulk_query_job`

**Get Bulk Query Job.** Returns the state and processed record count of a Bulk API 2.0 query job started by Create Bulk Query Job. Poll it until the state is JobComplete (then call Get Bulk Query Results), Failed or Aborted. For ingest jobs use Get Bulk Ingest Job. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. |

Output fields:

- `id`: Job ID
- `state`: State
- `object`: Object
- `operation`: Operation
- `numberRecordsProcessed`: Records Processed (number)
- `numberRecordsFailed`: Records Failed (number)
- `errorMessage`: Error Message
- `createdDate`: Created Date (datetime)
- `systemModstamp`: Last Modified Date (datetime)
- `totalProcessingTime`: Total Processing Time (ms) (number)

### `get_bulk_query_results`

**Get Bulk Query Results.** Returns one page of rows from a Bulk API 2.0 query job once Get Bulk Query Job reports JobComplete. Pass the returned next_locator to fetch the next page; next_locator is null when there are no more rows. Page size defaults to 1000 and is capped at 10000. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. |
| `locator` | string | no |  | Locator. next_locator from the previous page. Leave empty for the first page. |
| `max_records` | number | no | `1000` | Max Records. Rows per page (default 1000, max 10000). |

Output fields:

- `rows`: Rows
- `count`: Row Count (number)
- `next_locator`: Next Locator

### `get_child_records`

**Get Child Records.** Lists the child records under one parent record through a child relationship name, e.g. Contacts or Opportunities on an Account, or Cases on a Contact. Relationship names come from Describe Object (childRelationships); for filtered or sorted child lookups use Run SOQL Query instead. If next_records_url is not null, fetch more with Get Next Query Page. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Parent Object. Parent object API name, e.g. Account. |
| `record_id` | string | yes |  | Parent Record ID. |
| `relationship_name` | string | yes |  | Relationship Name. Child relationship name, e.g. Contacts, Opportunities or My_Children__r. |
| `fields` | array | no |  | Fields. Child field API names to return. Leave empty for all fields. |

Output fields:

- `records`: Records
- `count`: Records Returned (number)
- `total_size`: Total Matching Records (number)
- `done`: All Records Returned (boolean)
- `next_records_url`: Next Records URL

### `get_current_user`

**Get Current User.** Returns the Salesforce user behind this connection (user id, username, name, email, locale, time zone, user type) and the org id. Use it to resolve "me" or "my" in a request, e.g. to filter by OwnerId in Run SOQL Query or to assign records to the current user. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `user_id`: User ID
- `organization_id`: Organization ID
- `username`: Username
- `name`: Name
- `email`: Email (email)
- `locale`: Locale
- `zoneinfo`: Time Zone
- `user_type`: User Type

### `get_dashboard`

**Get Dashboard.** Describes a Salesforce dashboard by id: name, folder, filters and each component with its header, title, type and source report id. Use the report ids with Run Report Sync to get the underlying data; use List Dashboards to find the id. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dashboard_id` | string | yes |  | Dashboard ID. Dashboard id starting with 01Z. |

Output fields:

- `id`: Dashboard ID
- `name`: Name
- `developer_name`: Developer Name
- `folder_id`: Folder ID
- `components`: Components
- `components[].id`: Component ID
- `components[].header`: Header
- `components[].title`: Title
- `components[].type`: Type
- `components[].visualization_type`: Visualization Type
- `components[].report_id`: Report ID
- `filters`: Filters
- `filters[].name`: Name
- `filters[].options`: Options
- `filters[].options[].id`: Option ID
- `filters[].options[].alias`: Alias
- `filters[].options[].operation`: Operation
- `filters[].options[].value`: Value

### `get_file_info`

**Get File Info.** Returns the metadata of a Salesforce File (title, extension, type, size, MIME type, owner, dates, version) by its content document id (starts with 069). Use it to inspect a file; to get the bytes use Download File. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content_document_id` | string | yes |  | Content Document ID. File id starting with 069. |

Output fields:

- `id`: Content Document ID
- `title`: Title
- `name`: Name
- `file_extension`: File Extension
- `file_type`: File Type
- `content_size`: Size (filesize)
- `mime_type`: MIME Type
- `owner_id`: Owner ID
- `owner_name`: Owner Name
- `created_date`: Created Date (datetime)
- `modified_date`: Modified Date (datetime)
- `version_number`: Version Number
- `download_url`: Download Path

### `get_list_view_metadata`

**Get List View Metadata.** Returns the columns, ordering, filter and underlying SOQL query of one list view (ids from List List Views). Use it to reuse or adapt the list view's query; to read its rows directly use Get List View Records. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account. |
| `list_view_id` | string | yes |  | List View ID. |

Output fields:

- `id`: List View ID
- `sobject_type`: Object
- `query`: SOQL Query
- `columns`: Columns
- `columns[].field_name_or_path`: Field
- `columns[].label`: Label
- `columns[].sortable`: Sortable (boolean)
- `columns[].type`: Type
- `order_by`: Order By
- `order_by[].fieldNameOrPath`: Field
- `order_by[].sortDirection`: Sort Direction
- `order_by[].nullsPosition`: Nulls Position
- `where_condition`: Filter
- `where_condition.conjunction`: Conjunction
- `where_condition.conditions`: Conditions

### `get_list_view_records`

**Get List View Records.** Returns the records of one list view (ids from List List Views) as flat rows keyed by the list view's columns, exactly as a user sees them. Use it to reuse a saved filter; for custom filtering write a SOQL query instead. Page with Offset; Limit defaults to 50, max 200. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account. |
| `list_view_id` | string | yes |  | List View ID. |
| `limit` | number | no | `50` | Limit. Rows to return (default 50, max 200). |
| `offset` | number | no |  | Offset. Rows to skip, for paging. |

Output fields:

- `records`: Records
- `count`: Records Returned (number)
- `size`: List View Size (number)
- `done`: All Records Returned (boolean)

### `get_next_query_page`

**Get Next Query Page.** Fetches the next batch of records for a query whose result had a non-null next_records_url, from Run SOQL Query, Run SOQL Query All, Run Tooling Query or Get Child Records. Pass that next_records_url exactly as returned (or just the query locator); keep calling until next_records_url is null. Read-only; safe to retry while the cursor is alive (about 15 minutes of inactivity). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `next_records_url` | string | yes |  | Next Records URL. The next_records_url from a previous query result, e.g. /services/data/v56.0/query/01gD0000002HU6KIAW-2000. |

Output fields:

- `records`: Records
- `count`: Records Returned (number)
- `total_size`: Total Matching Records (number)
- `done`: All Records Returned (boolean)
- `next_records_url`: Next Records URL

### `get_org_limits`

**Get Org Limits.** Returns the Salesforce org limits (e.g. DailyApiRequests, DataStorageMB, DailyBulkApiBatches) with max, remaining and used values. Use it to check API or storage headroom before heavy work; for per-object record totals use Get Record Counts. Filter with Name to return only matching limits. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Only return limits whose name contains this text (case-insensitive), e.g. Api or Storage. |

Output fields:

- `limits`: Limits
- `limits[].name`: Limit
- `limits[].max`: Max (number)
- `limits[].remaining`: Remaining (number)
- `limits[].used`: Used (number)
- `count`: Count (number)

### `get_quick_action_defaults`

**Get Quick Action Defaults.** Returns the field values a quick action pre-fills, optionally in the context of a parent record (e.g. an Account id for Account.NewContact). Call it before Run Quick Action to see which fields to send. Names come from List Quick Actions. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `action_name` | string | yes |  | Quick Action Name. Name exactly as returned by List Quick Actions: Object.Action for object-specific actions (e.g. Account.NewContact), a bare name for global ones (e.g. LogACall). |
| `context_id` | string | no |  | Context Record ID. Id of the record the action runs against. Optional. |

### `get_record_by_external_id`

**Get Record by External ID.** Returns a single Salesforce record matched on an external id field (a field marked External ID or unique, e.g. My_Ext_Id__c) instead of the Salesforce id. Use it when you know an id from another system; if you have the Salesforce id use Get Record. Fails with 404 when nothing matches and 300 when several records match. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account or My_Object__c. |
| `external_id_field` | string | yes |  | External ID Field. API name of the external id field, e.g. My_Ext_Id__c. |
| `external_id_value` | string | yes |  | External ID Value. |
| `fields` | array | no |  | Fields. Field API names to return. Leave empty for all fields. |

Output fields:

- `Id`: Record ID

### `get_record_counts`

**Get Record Counts.** Returns the approximate number of records stored for each listed object (or every object when none are listed), as used for org storage. Use it for a quick size overview; counts are refreshed periodically and can lag, so for an exact filtered count use Run SOQL Query with SELECT COUNT(). Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objects` | array | no |  | Objects. Object API names to count, e.g. Account, Contact. Leave empty for all objects. |

Output fields:

- `counts`: Record Counts
- `counts[].name`: Object
- `counts[].count`: Record Count (number)
- `count`: Objects Counted (number)

### `get_record`

**Get Record.** Returns a single Salesforce record of any object (Account, Contact, Lead, Opportunity, Case, custom objects…) by its 15- or 18-character id, with all fields or only the ones you list. Use it after a search or query returned an id; to fetch many records of one object at once use Get Records Batch. Field and object names are API names from Describe Object. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account, Contact, Opportunity or My_Object__c. |
| `record_id` | string | yes |  | Record ID. |
| `fields` | array | no |  | Fields. Field API names to return. Leave empty for all fields. |

Output fields:

- `Id`: Record ID

### `get_records_batch`

**Get Records Batch.** Returns up to 2000 records of one Salesforce object by id in a single call, with the fields you list (at least one field is required). Use it instead of calling Get Record repeatedly; to find records by criteria use Run SOQL Query. Ids that do not exist come back as null entries in the same position, so the output stays aligned with the input. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account, Contact or My_Object__c. |
| `record_ids` | array | yes |  | Record IDs. Up to 2000 record ids of this object. |
| `fields` | array | yes |  | Fields. Field API names to return, e.g. Id, Name. At least one is required. |

Output fields:

- `records`: Records
- `records[].requested_id`: Requested ID
- `records[].found`: Found (boolean)
- `records[].record`: Record (an object whose keys vary)
- `count`: Records Requested (number)
- `found_count`: Records Found (number)

### `get_report_instance`

**Get Report Instance.** Returns the status of a report run started with Run Report Async (New, Running, Success or Error) and, once the status is Success, its flat rows keyed by column label. Call it again later while the status is New or Running. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `report_id` | string | yes |  | Report ID. Report id starting with 00O. |
| `instance_id` | string | yes |  | Instance ID. Instance id returned by Run Report Async. |

Output fields:

- `instance_id`: Instance ID
- `status`: Status
- `reportName`: Report Name
- `reportId`: Report ID
- `totalRows`: Total Rows (number)
- `columns`: Columns
- `rows`: Rows

### `get_report`

**Get Report.** Describes a Salesforce report by id without running it: format, report type, detail columns with labels, groupings, saved filters and filter logic. Use it to learn the column API names before passing filters to Run Report Sync or Run Report Async; use List Reports to find the id. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `report_id` | string | yes |  | Report ID. Report id starting with 00O. |

Output fields:

- `id`: Report ID
- `name`: Name
- `developer_name`: Developer Name
- `format`: Format
- `report_type`: Report Type
- `report_type_label`: Report Type Label
- `detail_columns`: Detail Columns
- `groupings_down`: Row Groupings
- `filters`: Filters
- `filter_logic`: Filter Logic
- `columns`: Columns
- `columns[].api_name`: API Name
- `columns[].label`: Label
- `columns[].data_type`: Data Type

### `get_updated_record_ids`

**Get Updated Record IDs.** Returns the ids of records of one Salesforce object that were created or updated between a start and end time, plus the latest time covered. Use it for incremental sync; to fetch the records afterwards use Get Records Batch, and to filter on other criteria use Run SOQL Query. The window must fall within the last 30 days; times are UTC at minute precision. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account or My_Object__c. |
| `start` | ISO date-time string | yes |  | Start. ISO 8601 start time, within the last 30 days, e.g. 2026-09-01T00:00:00Z. |
| `end` | ISO date-time string | no |  | End. ISO 8601 end time. Defaults to now. |

Output fields:

- `ids`: Record IDs
- `count`: Count (number)
- `latest_date_covered`: Latest Date Covered (datetime)

### `list_dashboards`

**List Dashboards.** Lists Salesforce dashboards (id, title, developer name, folder, description) filtered by title. Use it to find a dashboard id for Get Dashboard, which lists its components and their source reports. Returns at most 200 dashboards per call. Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title_contains` | string | no |  | Title Contains. Only dashboards whose title contains this text. |
| `limit` | number | no |  | Limit. Maximum dashboards to return (1-200, default 50). |

Output fields:

- `records`: Dashboards
- `records[].Id`: Dashboard ID
- `records[].Title`: Title
- `records[].DeveloperName`: Developer Name
- `records[].FolderName`: Folder Name
- `records[].Description`: Description
- `records[].LastModifiedDate`: Last Modified Date (datetime)
- `count`: Records Returned (number)
- `total_size`: Total Matching Records (number)
- `done`: All Records Returned (boolean)
- `next_records_url`: Next Records URL

### `list_email_templates`

**List Email Templates.** Lists Salesforce email templates (classic and Lightning) with their folder, type, subject and active flag, filtered by name, folder id or active only. Use it to look up a template id or developer name; it does not send anything, use Send Email Message for that. Returns at most 200 templates per call. Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name_contains` | string | no |  | Name Contains. Only templates whose name contains this text. |
| `folder_id` | string | no |  | Folder ID. Only templates in this folder. |
| `active_only` | boolean | no | `false` | Active Only. |
| `limit` | number | no |  | Limit. Maximum templates to return (1-200, default 50). |

Output fields:

- `records`: Email Templates
- `records[].Id`: Template ID
- `records[].Name`: Name
- `records[].DeveloperName`: Developer Name
- `records[].Subject`: Subject
- `records[].FolderId`: Folder ID
- `records[].TemplateType`: Template Type
- `records[].IsActive`: Active (boolean)
- `records[].LastModifiedDate`: Last Modified Date (datetime)
- `count`: Records Returned (number)
- `total_size`: Total Matching Records (number)
- `done`: All Records Returned (boolean)
- `next_records_url`: Next Records URL

### `list_invocable_actions`

**List Invocable Actions.** Lists invocable actions you can call with Run Invocable Action. Scope standard returns built-in actions (e.g. emailSimple, postToChatter); scope custom with no type returns the available custom action types (flow, apex, quickAction, emailAlert…), and with a type returns the actions of that type. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scope` | string | yes | `"standard"` | Scope. One of `"standard"`, `"custom"`. |
| `custom_type` | string | no |  | Custom Action Type. For custom scope: flow, apex, quickAction, emailAlert… Leave empty to list the available types. |

Output fields:

- `actions`: Actions
- `actions[].name`: Name
- `actions[].label`: Label
- `actions[].type`: Type
- `actions[].url`: API Path
- `count`: Count (number)

### `list_list_views`

**List List Views.** Lists the list views of one object (e.g. "My Open Opportunities" on Opportunity) with their ids. Pass an id to Get List View Metadata to see its columns and SOQL, or to Get List View Records to read its rows. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account or Opportunity. |

Output fields:

- `list_views`: List Views
- `list_views[].id`: List View ID
- `list_views[].label`: Label
- `list_views[].developer_name`: Developer Name
- `list_views[].soql_compatible`: SOQL Compatible (boolean)
- `list_views[].results_url`: Results URL
- `count`: Count (number)

### `list_objects`

**List Objects.** Lists the standard and custom objects in the Salesforce org with their API name, label and what the current user may do with them (query, create, update, delete). Use it to discover the right object API name before calling other tools; for one object's fields and relationships use Describe Object. Narrow the list with Search or Custom Only, since orgs often have hundreds of objects. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Only return objects whose API name or label contains this text (case-insensitive). |
| `custom_only` | boolean | no | `false` | Custom Only. Only return custom objects. |

Output fields:

- `objects`: Objects
- `objects[].name`: API Name
- `objects[].label`: Label
- `objects[].custom`: Custom (boolean)
- `objects[].queryable`: Queryable (boolean)
- `objects[].createable`: Createable (boolean)
- `objects[].updateable`: Updateable (boolean)
- `objects[].deletable`: Deletable (boolean)
- `objects[].key_prefix`: Key Prefix
- `count`: Count (number)

### `list_pricebooks`

**List Price Books.** Lists Salesforce price books (id, name, active, standard) and, when Include Entries is on, their price book entries with product name, code and list price, filtered by price book id and product name. Use it to find the Price Book ID for Create Opportunity and the Price Book Entry ID for Add Opportunity Product. Each list returns at most 200 rows (default 50). Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pricebook_id` | string | no |  | Price Book ID. Only this price book. |
| `active_only` | boolean | no | `false` | Active Only. |
| `include_entries` | boolean | no | `false` | Include Entries. Also return product entries. |
| `product_name` | string | no |  | Product Name Contains. Filters entries. |
| `limit` | number | no |  | Limit. Maximum records to return (default 50, max 200). |

Output fields:

- `pricebooks`: Price Books
- `pricebooks.records`: Price Books
- `pricebooks.records[].Id`: Price Book ID
- `pricebooks.records[].Name`: Name
- `pricebooks.records[].IsActive`: Active (boolean)
- `pricebooks.records[].IsStandard`: Standard (boolean)
- `pricebooks.records[].Description`: Description
- `pricebooks.count`: Records Returned (number)
- `pricebooks.total_size`: Total Matching Records (number)
- `pricebooks.done`: All Records Returned (boolean)
- `pricebooks.next_records_url`: Next Records URL
- `entries`: Price Book Entries
- `entries.records`: Entries
- `entries.records[].Id`: Price Book Entry ID
- `entries.records[].Pricebook2Id`: Price Book ID
- `entries.records[].Product2Id`: Product ID
- `entries.records[].Product2`: Product
- `entries.records[].Product2.Name`: Product Name
- `entries.records[].ProductCode`: Product Code
- `entries.records[].UnitPrice`: Unit Price (number)
- `entries.records[].IsActive`: Active (boolean)
- `entries.count`: Records Returned (number)
- `entries.total_size`: Total Matching Records (number)
- `entries.done`: All Records Returned (boolean)
- `entries.next_records_url`: Next Records URL

### `list_quick_actions`

**List Quick Actions.** Lists quick actions (e.g. LogACall, NewTask, custom create/update actions) either globally or for one object. Pass the returned names unchanged to Get Quick Action Defaults and Run Quick Action. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | no |  | Object. Object API name, e.g. Account. Leave empty for global quick actions. |

Output fields:

- `actions`: Quick Actions
- `actions[].name`: Name
- `actions[].label`: Label
- `actions[].type`: Type
- `actions[].sobject_type`: Object
- `count`: Count (number)

### `list_reports`

**List Reports.** Lists Salesforce analytics reports (id, name, folder, format, last run) filtered by name or exact folder name. Use it to find a report id, then Get Report to see its columns or Run Report Sync / Run Report Async to get data. Returns at most 200 reports per call. Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name_contains` | string | no |  | Name Contains. Only reports whose name contains this text. |
| `folder_name` | string | no |  | Folder Name. Only reports in the folder with exactly this name. |
| `limit` | number | no |  | Limit. Maximum reports to return (1-200, default 50). |

Output fields:

- `records`: Reports
- `records[].Id`: Report ID
- `records[].Name`: Name
- `records[].DeveloperName`: Developer Name
- `records[].FolderName`: Folder Name
- `records[].Format`: Format
- `records[].Description`: Description
- `records[].LastRunDate`: Last Run Date (datetime)
- `records[].LastModifiedDate`: Last Modified Date (datetime)
- `count`: Records Returned (number)
- `total_size`: Total Matching Records (number)
- `done`: All Records Returned (boolean)
- `next_records_url`: Next Records URL

### `log_call`

**Log Call.** Logs a phone call that already happened as a closed Call task on a Contact or Lead (Who ID) and/or an Account, Opportunity or other record (What ID), with duration, direction, outcome and notes; the date defaults to today (UTC). Use Create Task for a to-do that is still open. Not idempotent: each call logs another activity. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | yes |  | Subject. e.g. Call with Jane about renewal. |
| `who_id` | string | no |  | Who ID. Contact or Lead id. |
| `what_id` | string | no |  | What ID. Account, Opportunity, Case or other record id. |
| `call_type` | string | no |  | Call Type. One of `"Inbound"`, `"Outbound"`, `"Internal"`. |
| `duration_seconds` | number | no |  | Duration (Seconds). |
| `call_disposition` | string | no |  | Call Result. Outcome, e.g. Left voicemail. |
| `description` | string | no |  | Notes. |
| `activity_date` | string | no |  | Call Date. YYYY-MM-DD. Defaults to today. |
| `owner_id` | string | no |  | Owner ID. User who made the call. Defaults to you. |

Output fields:

- `id`: Task ID
- `success`: Success (boolean)
- `subject`: Subject
- `status`: Status
- `activity_date`: Call Date (date)

### `log_email_activity`

**Log Email Activity.** Creates an EmailMessage record marked as sent for a Contact or Lead, optionally related to another record, so the email shows in the activity history. It only records the email and does NOT deliver anything; to actually send an email use Send Email Message. Not idempotent: every call logs another email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recipient_id` | string | yes |  | Recipient ID. Id of the Contact or Lead the email was sent to. |
| `subject` | string | yes |  | Subject. |
| `body` | string | yes |  | Body. Email content, plain text or HTML. |
| `related_record_id` | string | no |  | Related Record ID. Id of a record (Account, Opportunity, Case…) to relate the email to. |

Output fields:

- `id`: Email Message ID
- `success`: Success (boolean)
- `recipient_id`: Recipient ID
- `related_record_id`: Related Record ID
- `subject`: Subject

### `remove_campaign_member`

**Remove Campaign Member.** Removes a Lead or Contact from a Campaign by deleting its CampaignMember record; give the campaign id and exactly one of lead id or contact id. The lead or contact itself is not deleted. Use Add Lead to Campaign / Add Contact to Campaign to enroll again. Reports deleted: false when it is not a member. Not idempotent: it deletes a record. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign ID. |
| `lead_id` | string | no |  | Lead ID. Give this or Contact ID. |
| `contact_id` | string | no |  | Contact ID. Give this or Lead ID. |

Output fields:

- `id`: Deleted ID
- `deleted`: Deleted (boolean)

### `run_bulk_ingest_job`

**Run Bulk Ingest Job.** Creates a Bulk API 2.0 ingest job, uploads the CSV and queues it for processing in one call, returning the job id right away while Salesforce works asynchronously. Poll Get Bulk Ingest Job until the state is JobComplete, Failed or Aborted, then read per-row outcomes with Get Bulk Ingest Results. Use it for thousands of rows; the CSV header must be field API names (Id for update/delete), and upsert needs an external id field. Not idempotent: rerunning inserts again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account or My_Object__c. |
| `operation` | string | yes |  | Operation. One of `"insert"`, `"update"`, `"upsert"`, `"delete"`. |
| `external_id_field` | string | no |  | External ID Field. Field API name to match on. Required for upsert. |
| `csv` | string | yes |  | CSV. Records as CSV with a header row of field API names, lines separated by LF. |

Output fields:

- `job_id`: Job ID
- `state`: State
- `object`: Object
- `operation`: Operation

### `run_invocable_action`

**Run Invocable Action.** Invokes a standard action (e.g. emailSimple) or a custom action (flow, apex, emailAlert…) with one or more input sets and returns each invocation's success, errors and output values. Find names and types with List Invocable Actions; flows must be active and autolaunched, and for Apex the name is the class name. Not idempotent: each call runs the action again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `action_type` | string | no |  | Custom Action Type. flow, apex, quickAction, emailAlert… Leave empty for a standard action. |
| `action_name` | string | yes |  | Action Name. Action API name, e.g. emailSimple or My_Autolaunched_Flow. |
| `inputs` | JSON | no |  | Inputs. JSON array of input objects, one per invocation (a single object is also accepted), e.g. [{"recordId": "001..."}]. |

Output fields:

- `results`: Results
- `results[].action_name`: Action Name
- `results[].is_success`: Success (boolean)
- `results[].errors`: Errors
- `results[].output_values`: Output Values (an object whose keys vary)
- `count`: Count (number)
- `failed_count`: Failed (number)

### `run_quick_action`

**Run Quick Action.** Executes a quick action (e.g. LogACall, NewContact) and returns the id of the record it created or updated. Find names with List Quick Actions and pre-filled fields with Get Quick Action Defaults; pass the name exactly as listed (Object.Action or a bare global name) and a Context Record ID when the action acts on a parent record. Not idempotent: each call creates again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `action_name` | string | yes |  | Quick Action Name. Name exactly as returned by List Quick Actions: Object.Action for object-specific actions (e.g. Account.NewContact), a bare name for global ones (e.g. LogACall). |
| `context_id` | string | no |  | Context Record ID. Id of the parent record the action runs against. Optional. |
| `record` | JSON | yes |  | Fields. JSON object of field API names to values, e.g. {"Subject": "Call", "Description": "Notes"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `created`: Created (boolean)
- `context_id`: Context Record ID
- `feed_item_ids`: Feed Item IDs
- `errors`: Errors

### `run_report_async`

**Run Report Async.** Starts an asynchronous run of a Salesforce report by id, optionally with filters overriding the saved ones, and returns the instance id right away. Poll Get Report Instance with the report id and instance id until the status is Success to get the rows; use it instead of Run Report Sync for reports over 2,000 detail rows. Results are kept for 24 hours. Not idempotent: every call starts another run. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `report_id` | string | yes |  | Report ID. Report id starting with 00O. |
| `filters` | JSON | no |  | Filters. Optional JSON array of {column, operator, value} using column API names from Get Report, e.g. [{"column":"ACCOUNT.NAME","operator":"equals","value":"Acme"}]. |

Output fields:

- `instance_id`: Instance ID
- `status`: Status
- `report_id`: Report ID
- `request_date`: Request Date (datetime)

### `run_report_sync`

**Run Report Sync.** Runs a Salesforce report by id and waits for the result, returning flat rows keyed by column label (grouping columns included), optionally with filters that override the saved ones for this run. Synchronous runs return at most 2,000 detail rows; for bigger reports use Run Report Async then Get Report Instance. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `report_id` | string | yes |  | Report ID. Report id starting with 00O. |
| `filters` | JSON | no |  | Filters. Optional JSON array of {column, operator, value} using column API names from Get Report, e.g. [{"column":"ACCOUNT.NAME","operator":"equals","value":"Acme"}]. |

Output fields:

- `reportName`: Report Name
- `reportId`: Report ID
- `totalRows`: Total Rows (number)
- `columns`: Columns
- `rows`: Rows

### `run_soql_query_all`

**Run SOQL Query All.** Runs a SOQL query that also returns records in the Recycle Bin and archived records (e.g. old Tasks and Events); filter on IsDeleted = true to find only deleted ones. Use it for recovery or audit; for normal reads use Run SOQL Query. Always add a LIMIT; if next_records_url is not null, fetch more with Get Next Query Page. Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | SOQL Query. A complete SOQL statement with explicit fields and a LIMIT. |

Output fields:

- `records`: Records
- `count`: Records Returned (number)
- `total_size`: Total Matching Records (number)
- `done`: All Records Returned (boolean)
- `next_records_url`: Next Records URL

### `run_soql_query`

**Run SOQL Query.** Runs a SOQL query (e.g. SELECT Id, Name FROM Account WHERE Industry = 'Technology' LIMIT 50) and returns the matching records, excluding deleted and archived ones. Use it for filtered, sorted, related or aggregate reads; to include the Recycle Bin use Run SOQL Query All, for keyword search across objects use Search Records (SOSL), and for setup metadata use Run Tooling Query. Always add a LIMIT; if next_records_url is not null, fetch more with Get Next Query Page. Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | SOQL Query. A complete SOQL statement with explicit fields and a LIMIT. |

Output fields:

- `records`: Records
- `count`: Records Returned (number)
- `total_size`: Total Matching Records (number)
- `done`: All Records Returned (boolean)
- `next_records_url`: Next Records URL

### `run_tooling_query`

**Run Tooling Query.** Runs a SOQL query against the Tooling API to read setup metadata such as ApexClass, ApexTrigger, CustomField, Flow, ValidationRule or FieldDefinition. Use it for questions about org configuration and code; for business records use Run SOQL Query, and for a single object's fields Describe Object is simpler. Requires a user with View Setup permission; always add a LIMIT and page with Get Next Query Page. Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | SOQL Query. A Tooling API SOQL statement, e.g. SELECT Id, Name FROM ApexClass LIMIT 50. |

Output fields:

- `records`: Records
- `count`: Records Returned (number)
- `total_size`: Total Matching Records (number)
- `done`: All Records Returned (boolean)
- `next_records_url`: Next Records URL

### `search_accounts`

**Search Accounts.** Finds Salesforce Accounts matching all the filters you give (name contains, exact industry, type, billing city/country, owner id), newest-modified first; with no filters it lists recent accounts. Use it to get an account id before Update Account or to link contacts and opportunities; for arbitrary conditions use a SOQL query action instead. Returns at most 200 rows (default 50). Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name Contains. |
| `industry` | string | no |  | Industry. |
| `type` | string | no |  | Type. |
| `billing_city` | string | no |  | Billing City. |
| `billing_country` | string | no |  | Billing Country. |
| `owner_id` | string | no |  | Owner ID. |
| `limit` | number | no |  | Limit. Maximum records to return (default 50, max 200). |

Output fields:

- `records`: Accounts
- `records[].Id`: Account ID
- `records[].Name`: Name
- `records[].Phone`: Phone
- `records[].Website`: Website (url)
- `records[].Industry`: Industry
- `records[].Type`: Type
- `records[].BillingCity`: Billing City
- `records[].BillingState`: Billing State
- `records[].BillingCountry`: Billing Country
- `records[].OwnerId`: Owner ID
- `records[].ParentId`: Parent Account ID
- `records[].CreatedDate`: Created Date (datetime)
- `records[].LastModifiedDate`: Last Modified Date (datetime)
- `count`: Records Returned (number)
- `total_size`: Total Matching Records (number)
- `done`: All Records Returned (boolean)
- `next_records_url`: Next Records URL

### `search_contacts`

**Search Contacts.** Finds Salesforce Contacts matching all the filters you give (name contains, exact email, account id, title contains), newest-modified first; with no filters it lists recent contacts. Use it to get a contact id before Update Contact, Add Contact to Campaign or Create Task; for leads use Search Leads. Returns at most 200 rows (default 50). Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name Contains. |
| `email` | string | no |  | Email. Exact email address. |
| `account_id` | string | no |  | Account ID. |
| `title` | string | no |  | Title Contains. |
| `limit` | number | no |  | Limit. Maximum records to return (default 50, max 200). |

Output fields:

- `records`: Contacts
- `records[].Id`: Contact ID
- `records[].FirstName`: First Name
- `records[].LastName`: Last Name
- `records[].Name`: Full Name
- `records[].Email`: Email (email)
- `records[].Phone`: Phone
- `records[].MobilePhone`: Mobile Phone
- `records[].Title`: Title
- `records[].Department`: Department
- `records[].AccountId`: Account ID
- `records[].Account`: Account
- `records[].Account.Name`: Account Name
- `records[].OwnerId`: Owner ID
- `records[].CreatedDate`: Created Date (datetime)
- `records[].LastModifiedDate`: Last Modified Date (datetime)
- `count`: Records Returned (number)
- `total_size`: Total Matching Records (number)
- `done`: All Records Returned (boolean)
- `next_records_url`: Next Records URL

### `search_knowledge_articles`

**Search Knowledge Articles.** Searches published Salesforce Knowledge articles by keyword in one language and returns titles, summaries and ids. Use it to answer support questions from the knowledge base; the id is the KnowledgeArticle id, not an article version id. Requires Knowledge enabled and a Knowledge User license on the connected user; page size defaults to 20, max 100. Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Text. |
| `language` | string | no | `"en-US"` | Language. Article language locale, e.g. en-US. |
| `channel` | string | no |  | Channel. One of `"App"`, `"Pkb"`, `"Csp"`, `"Prm"`. |
| `page_size` | number | no | `20` | Page Size. Articles to return (default 20, max 100). |

Output fields:

- `articles`: Articles
- `articles[].id`: Article ID
- `articles[].article_number`: Article Number
- `articles[].title`: Title
- `articles[].summary`: Summary
- `articles[].url_name`: URL Name
- `articles[].last_published_date`: Last Published Date (datetime)
- `articles[].view_count`: View Count (number)
- `count`: Count (number)

### `search_leads`

**Search Leads.** Finds Salesforce Leads matching all the filters you give (name contains, exact email, company contains, status, lead source, converted yes/no), newest-modified first; with no filters it lists recent leads. Use it to get a lead id before Update Lead or Add Lead to Campaign; for contacts use Search Contacts. Returns at most 200 rows (default 50). Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name Contains. |
| `email` | string | no |  | Email. Exact email address. |
| `company` | string | no |  | Company Contains. |
| `status` | string | no |  | Status. |
| `lead_source` | string | no |  | Lead Source. |
| `is_converted` | string | no |  | Converted. Leave empty for both converted and unconverted leads. One of `true`, `false`. |
| `limit` | number | no |  | Limit. Maximum records to return (default 50, max 200). |

Output fields:

- `records`: Leads
- `records[].Id`: Lead ID
- `records[].FirstName`: First Name
- `records[].LastName`: Last Name
- `records[].Name`: Full Name
- `records[].Company`: Company
- `records[].Email`: Email (email)
- `records[].Phone`: Phone
- `records[].Title`: Title
- `records[].Status`: Status
- `records[].LeadSource`: Lead Source
- `records[].Industry`: Industry
- `records[].IsConverted`: Converted (boolean)
- `records[].ConvertedContactId`: Converted Contact ID
- `records[].ConvertedAccountId`: Converted Account ID
- `records[].OwnerId`: Owner ID
- `records[].CreatedDate`: Created Date (datetime)
- `records[].LastModifiedDate`: Last Modified Date (datetime)
- `count`: Records Returned (number)
- `total_size`: Total Matching Records (number)
- `done`: All Records Returned (boolean)
- `next_records_url`: Next Records URL

### `search_opportunities`

**Search Opportunities.** Finds Salesforce Opportunities matching all the filters you give (name contains, account id, exact stage, closed / won yes-no, close date range in YYYY-MM-DD, minimum amount), newest-modified first; with no filters it lists recent opportunities. Use it to get an opportunity id before Update Opportunity or Add Opportunity Product, or to review a pipeline. Returns at most 200 rows (default 50). Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name Contains. |
| `account_id` | string | no |  | Account ID. |
| `stage` | string | no |  | Stage. |
| `is_closed` | string | no |  | Closed. Leave empty for open and closed. One of `true`, `false`. |
| `is_won` | string | no |  | Won. Leave empty for won and not won. One of `true`, `false`. |
| `close_date_from` | string | no |  | Close Date From. YYYY-MM-DD, inclusive. |
| `close_date_to` | string | no |  | Close Date To. YYYY-MM-DD, inclusive. |
| `min_amount` | number | no |  | Minimum Amount. |
| `limit` | number | no |  | Limit. Maximum records to return (default 50, max 200). |

Output fields:

- `records`: Opportunities
- `records[].Id`: Opportunity ID
- `records[].Name`: Name
- `records[].AccountId`: Account ID
- `records[].Account`: Account
- `records[].Account.Name`: Account Name
- `records[].StageName`: Stage
- `records[].Amount`: Amount (number)
- `records[].Probability`: Probability (%) (number)
- `records[].CloseDate`: Close Date (date)
- `records[].IsClosed`: Closed (boolean)
- `records[].IsWon`: Won (boolean)
- `records[].Type`: Type
- `records[].LeadSource`: Lead Source
- `records[].NextStep`: Next Step
- `records[].Pricebook2Id`: Price Book ID
- `records[].OwnerId`: Owner ID
- `records[].CreatedDate`: Created Date (datetime)
- `records[].LastModifiedDate`: Last Modified Date (datetime)
- `count`: Records Returned (number)
- `total_size`: Total Matching Records (number)
- `done`: All Records Returned (boolean)
- `next_records_url`: Next Records URL

### `search_records_sosl`

**Search Records (SOSL).** Full-text searches a word or phrase across all searchable fields of one or more objects (e.g. find "Acme" in Accounts, Contacts and Leads) and returns matches tagged with their object type. Use it when you only know a name, email or phrase and not which object or field holds it; for exact field filters use Run SOQL Query. The term needs at least 2 characters and results are capped by Limit (default 50, max 200). Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_term` | string | yes |  | Search Term. Word or phrase to search for, e.g. Acme or jane@example.com. |
| `objects` | array | no |  | Objects. Object API names to search, e.g. Account, Contact, Lead. Leave empty to search all searchable objects. |
| `fields` | array | no |  | Fields. Field API names to return for every object listed (Id is always returned), e.g. Name. Every field must exist on every listed object. |
| `limit` | number | no | `50` | Limit. Maximum number of records to return (default 50, max 200). |

Output fields:

- `records`: Records
- `count`: Records Returned (number)

### `send_email_message`

**Send Email Message.** Actually delivers an email from Salesforce (the standard Send Email action) to email addresses and/or a Contact, Lead or User id, optionally logged against a related record. Pick it when the email must reach the inbox; to only record an email that was sent elsewhere use Log Email Activity. Counts against the org daily external email limit, which is very small on Developer Edition orgs. Not idempotent: every call sends another email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_addresses` | array | no |  | Email Addresses. Recipient email addresses. Required unless Recipient ID is set. |
| `recipient_id` | string | no |  | Recipient ID. Id of a Contact, Lead or User to send to. |
| `subject` | string | yes |  | Subject. |
| `body` | string | yes |  | Body. Plain-text email body. |
| `sender_type` | string | no |  | Sender Type. Who the email is sent from. Defaults to the current user. One of `"CurrentUser"`, `"DefaultWorkflowUser"`, `"OrgWideEmailAddress"`. |
| `sender_address` | string | no |  | Sender Address. Verified org-wide email address. Required when Sender Type is Org-Wide Email Address. |
| `related_record_id` | string | no |  | Related Record ID. Id of a record (Account, Opportunity, Case…) to log the email against. |
| `use_line_breaks` | boolean | no |  | Use Line Breaks. Keep the line breaks of the body in the sent email. |

Output fields:

- `success`: Success (boolean)
- `email_addresses`: Email Addresses
- `recipient_id`: Recipient ID
- `related_record_id`: Related Record ID
- `subject`: Subject

### `update_account`

**Update Account.** Updates an existing Salesforce Account by id; only the fields you supply are changed, everything else is left as is. Use Create Account for new accounts and Search Accounts to find the id. At least one field is required; custom fields go in Additional Fields (set a value to null there to clear it). Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. |
| `Name` | string | no |  | Account Name. |
| `Phone` | string | no |  | Phone. |
| `Website` | string | no |  | Website. |
| `Industry` | string | no |  | Industry. |
| `Type` | string | no |  | Type. |
| `BillingStreet` | string | no |  | Billing Street. |
| `BillingCity` | string | no |  | Billing City. |
| `BillingState` | string | no |  | Billing State. |
| `BillingPostalCode` | string | no |  | Billing Postal Code. |
| `BillingCountry` | string | no |  | Billing Country. |
| `Description` | string | no |  | Description. |
| `OwnerId` | string | no |  | Owner ID. |
| `ParentId` | string | no |  | Parent Account ID. |
| `additional_fields` | JSON | no |  | Additional Fields. Any other fields, including custom ones, as a JSON object of API name to value, e.g. {"My_Field__c": "x"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `updated_fields`: Updated Fields

### `update_campaign`

**Update Campaign.** Updates an existing Salesforce Campaign by id, e.g. its status, dates (YYYY-MM-DD), active flag or budget; only the fields you supply change. Use Create Campaign for new campaigns. At least one field is required; custom fields go in Additional Fields (null clears a value). Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign ID. |
| `Name` | string | no |  | Name. |
| `Type` | string | no |  | Type. |
| `Status` | string | no |  | Status. |
| `StartDate` | string | no |  | Start Date. YYYY-MM-DD. |
| `EndDate` | string | no |  | End Date. YYYY-MM-DD. |
| `IsActive` | string | no |  | Active. Leave empty to keep the current value. One of `true`, `false`. |
| `BudgetedCost` | number | no |  | Budgeted Cost. |
| `ExpectedRevenue` | number | no |  | Expected Revenue. |
| `Description` | string | no |  | Description. |
| `ParentId` | string | no |  | Parent Campaign ID. |
| `additional_fields` | JSON | no |  | Additional Fields. Any other fields, including custom ones, as a JSON object of API name to value, e.g. {"My_Field__c": "x"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `updated_fields`: Updated Fields

### `update_opportunity`

**Update Opportunity.** Updates an existing Salesforce Opportunity by id, e.g. to move its stage, change the amount or push the close date (YYYY-MM-DD); only the fields you supply change. Use Create Opportunity for new deals and Search Opportunities to find the id. At least one field is required; custom fields go in Additional Fields (null clears a value). Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunity_id` | string | yes |  | Opportunity ID. |
| `Name` | string | no |  | Name. |
| `StageName` | string | no |  | Stage. |
| `CloseDate` | string | no |  | Close Date. YYYY-MM-DD. |
| `AccountId` | string | no |  | Account ID. |
| `Amount` | number | no |  | Amount. |
| `Probability` | number | no |  | Probability (%). |
| `Type` | string | no |  | Type. |
| `LeadSource` | string | no |  | Lead Source. |
| `NextStep` | string | no |  | Next Step. |
| `Description` | string | no |  | Description. |
| `OwnerId` | string | no |  | Owner ID. |
| `Pricebook2Id` | string | no |  | Price Book ID. |
| `additional_fields` | JSON | no |  | Additional Fields. Any other fields, including custom ones, as a JSON object of API name to value, e.g. {"My_Field__c": "x"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `updated_fields`: Updated Fields

### `update_sf_contact`

**Update Contact.** Updates an existing Salesforce Contact by id; only the fields you supply change, the rest stay as they are. Set Account ID to move the contact to another account. Use Create Contact for new people and Search Contacts to find the id. At least one field is required; custom fields go in Additional Fields (null clears a value). Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact ID. |
| `LastName` | string | no |  | Last Name. |
| `FirstName` | string | no |  | First Name. |
| `Email` | string | no |  | Email. |
| `Phone` | string | no |  | Phone. |
| `MobilePhone` | string | no |  | Mobile Phone. |
| `Title` | string | no |  | Title. |
| `Department` | string | no |  | Department. |
| `AccountId` | string | no |  | Account ID. |
| `MailingCity` | string | no |  | Mailing City. |
| `MailingCountry` | string | no |  | Mailing Country. |
| `LeadSource` | string | no |  | Lead Source. |
| `Description` | string | no |  | Description. |
| `OwnerId` | string | no |  | Owner ID. |
| `additional_fields` | JSON | no |  | Additional Fields. Any other fields, including custom ones, as a JSON object of API name to value, e.g. {"My_Field__c": "x"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `updated_fields`: Updated Fields

### `update_sf_lead`

**Update Lead.** Updates an existing Salesforce Lead by id; only the fields you supply change, the rest stay as they are. It does not convert the lead. Use Create Lead for new leads and Search Leads to find the id. At least one field is required; custom fields go in Additional Fields (null clears a value). Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | yes |  | Lead ID. |
| `LastName` | string | no |  | Last Name. |
| `Company` | string | no |  | Company. |
| `FirstName` | string | no |  | First Name. |
| `Email` | string | no |  | Email. |
| `Phone` | string | no |  | Phone. |
| `Title` | string | no |  | Title. |
| `Status` | string | no |  | Status. |
| `LeadSource` | string | no |  | Lead Source. |
| `Industry` | string | no |  | Industry. |
| `Website` | string | no |  | Website. |
| `City` | string | no |  | City. |
| `Country` | string | no |  | Country. |
| `Description` | string | no |  | Description. |
| `OwnerId` | string | no |  | Owner ID. |
| `additional_fields` | JSON | no |  | Additional Fields. Any other fields, including custom ones, as a JSON object of API name to value, e.g. {"My_Field__c": "x"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `updated_fields`: Updated Fields

### `update_sobject_record`

**Update Record.** Updates a single record of any Salesforce object by id; only the field API names you send change, every other field stays untouched (send null to clear a field). Use it when you have the record id; to match on an external id instead use Upsert Record by External ID, and for many records use Upsert Records Batch. Idempotent: resending the same values leaves the record in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account, Contact or My_Object__c. |
| `record_id` | string | yes |  | Record ID. |
| `fields` | JSON | yes |  | Fields. JSON object of field API names to new values. Only these fields change; use null to clear a field. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `updated_fields`: Updated Fields

### `update_task`

**Update Task.** Updates an existing Salesforce Task by id, e.g. its subject, due date (YYYY-MM-DD), status, priority, assignee or linked records; only the fields you supply change. To simply mark it done use Complete Task. At least one field is required; custom fields go in Additional Fields (null clears a value). Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. |
| `Subject` | string | no |  | Subject. |
| `WhoId` | string | no |  | Who ID. Contact or Lead id. |
| `WhatId` | string | no |  | What ID. Account, Opportunity, Case or other record id. |
| `OwnerId` | string | no |  | Assigned To (User ID). |
| `ActivityDate` | string | no |  | Due Date. YYYY-MM-DD. |
| `Status` | string | no |  | Status. |
| `Priority` | string | no |  | Priority. |
| `Description` | string | no |  | Description. |
| `additional_fields` | JSON | no |  | Additional Fields. Any other fields, including custom ones, as a JSON object of API name to value, e.g. {"My_Field__c": "x"}. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `updated_fields`: Updated Fields

### `upload_file`

**Upload File.** Uploads a file to Salesforce Files (creates a ContentVersion) and, when a record id is given, shares it on that record. Returns the content document id (starts with 069), which is what Get File Info, Download File and Delete File take. Not idempotent: every call uploads another file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |
| `file_name` | string | no |  | File Name. Name with extension, e.g. report.pdf. Defaults to the uploaded file name. |
| `record_id` | string | no |  | Record ID. Id of the record to attach the file to. |

Output fields:

- `content_version_id`: Content Version ID
- `content_document_id`: Content Document ID
- `title`: Title
- `record_id`: Linked Record ID

### `upsert_record_by_external_id`

**Upsert Record by External ID.** Creates or updates a single Salesforce record matched on an external id field: updates the match if one exists, otherwise creates it, and reports which happened. Use it to sync from another system without duplicates; for up to 200 records use Upsert Records Batch, and to update by Salesforce id use Update Record. Do not include the external id field inside Fields. Idempotent on the external id: rerunning updates rather than duplicates. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account or My_Object__c. |
| `external_id_field` | string | yes |  | External ID Field. API name of the external id field, e.g. My_Ext_Id__c. |
| `external_id_value` | string | yes |  | External ID Value. |
| `fields` | JSON | yes |  | Fields. JSON object of field API names to values to set on the record. |

Output fields:

- `id`: Record ID
- `success`: Success (boolean)
- `created`: Created (boolean)
- `external_id_field`: External ID Field
- `external_id_value`: External ID Value
- `updated_fields`: Updated Fields

### `upsert_records_batch`

**Upsert Records Batch.** Creates or updates up to 200 records of one Salesforce object in a single call, matching each on an external id field, and returns a per-record result with a created flag in input order. Use it to sync many records from another system; for one record use Upsert Record by External ID. Every record must include the external id field. Idempotent on the external id: rerunning updates rather than duplicates. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. Object API name, e.g. Account or My_Object__c. |
| `external_id_field` | string | yes |  | External ID Field. API name of the external id field used to match, e.g. My_Ext_Id__c. |
| `records` | JSON | yes |  | Records. JSON array of up to 200 objects; each must include the external id field, e.g. [{"My_Ext_Id__c": "A-1", "Name": "Acme"}]. |
| `all_or_none` | boolean | no | `false` | All or None. Roll back every record if any record fails. |

Output fields:

- `results`: Results
- `results[].index`: Index (number)
- `results[].id`: Record ID
- `results[].success`: Success (boolean)
- `results[].errors`: Errors
- `results[].created`: Created (boolean)
- `success_count`: Succeeded (number)
- `failure_count`: Failed (number)

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

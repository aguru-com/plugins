# SmartSuite

Collaborative work management platform combining databases with spreadsheets.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-smartsuite'
  version: '0.3.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> You can obtain API key by navigate to **My Profile->API Key** from top-right corner.
>
> You can obtain Account ID from browser URL.For example, if smartsuite workspace URL is https://app.smartsuite.com/xyz/home, your Account ID is **xyz**.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. |
| `accountId` | string | yes |  | Account ID. |

## Actions

### `create_record`

**Create a Record.** Adds a new record (row) to a SmartSuite table using form fields built from the table schema; the output is keyed by field label. Agents should use Create Record (by Table ID) instead. Not idempotent: each call creates a separate record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Record ID
- `Title`: Title
- `application_id`: Table ID
- `application_slug`: Table Slug
- `First Created`: First Created
- `First Created.on`: At (datetime)
- `First Created.by`: By (Member ID)
- `Last Updated`: Last Updated
- `Last Updated.on`: At (datetime)
- `Last Updated.by`: By (Member ID)

### `update_record`

**Update a Record.** Patches an existing SmartSuite record using form fields built from the table schema; only filled-in fields are sent and the output is keyed by field label. Agents should use Update Record Fields (by ID) instead. Idempotent: re-applying the same values leaves the record unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. |
| `fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Record ID
- `Title`: Title
- `application_id`: Table ID
- `application_slug`: Table Slug
- `First Created`: First Created
- `First Created.on`: At (datetime)
- `First Created.by`: By (Member ID)
- `Last Updated`: Last Updated
- `Last Updated.on`: At (datetime)
- `Last Updated.by`: By (Member ID)

### `delete_record`

**Delete a Record.** Moves one SmartSuite record to the solution trash (it can be brought back with Restore Record). Agents should use Delete Record (by ID). Idempotent: deleting a record that is already in the trash succeeds again, and a record that no longer exists at all (404) succeeds with alreadyDeleted true. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. |

Output fields:

- `id`: Record ID
- `deleted`: Deleted (boolean)
- `alreadyDeleted`: Already Deleted (boolean)

### `upload_file`

**Upload File.** Uploads a file to a Files & Images field picked from the table schema, then returns the files now in that field. Agents should use Attach File to Record (by ID). Not idempotent: each call adds another attachment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. |
| `field` | string | yes |  | File Field. The Files & Images field to attach the file to. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to upload (up to 100 MB). Files are not supported; an action that needs one fails. |

Output fields:

- `recordId`: Record ID
- `field`: File Field Slug
- `fileName`: File Name
- `files`: Files In Field
- `files[].handle`: File Handle
- `files[].metadata`: Metadata
- `files[].metadata.filename`: File Name
- `files[].metadata.mimetype`: MIME Type
- `files[].metadata.size`: Size (bytes) (number)
- `files[].created_on`: Created On (datetime)

### `find_records`

**Find Records.** Finds SmartSuite records where one chosen field equals a value, keyed by field label. Agents should use List Records (by Table ID) with a filter instead. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `searchField` | string | yes |  | Search Field. A value the product loads from the provider, such as an id; write the value itself. |
| `searchValue` | string | yes |  | Search Value. |
| `maxRecords` | number | no |  | Max Records. Stop after this many matches (1-10000). Leave empty to return all matches up to 10000; Has More tells you if more exist. |

Output fields:

- `found`: Found (boolean)
- `result`: Records
- `result[].id`: Record ID
- `result[].Title`: Title
- `result[].application_id`: Table ID
- `result[].application_slug`: Table Slug
- `result[].First Created`: First Created
- `result[].First Created.on`: At (datetime)
- `result[].First Created.by`: By (Member ID)
- `result[].Last Updated`: Last Updated
- `result[].Last Updated.on`: At (datetime)
- `result[].Last Updated.by`: By (Member ID)
- `result[]`: All Fields (an object whose keys vary)
- `hasMore`: Has More (boolean)

### `get_record`

**Get a Record.** Fetches a single SmartSuite record by its record ID, with fields keyed by their table label (for example "Title", "Status"). Agents should use Get Record (by ID), which returns values keyed by field slug. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. |

Output fields:

- `id`: Record ID
- `Title`: Title
- `application_id`: Table ID
- `application_slug`: Table Slug
- `First Created`: First Created
- `First Created.on`: At (datetime)
- `First Created.by`: By (Member ID)
- `Last Updated`: Last Updated
- `Last Updated.on`: At (datetime)
- `Last Updated.by`: By (Member ID)

### `list_solutions`

**List Solutions.** Returns every SmartSuite solution the connected user can access, with ID, name, status and table/record counts. Use first to find a Solution ID, then List Tables. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeHidden` | boolean | no | `false` | Include Hidden Solutions. Also return hidden and system solutions. |

Output fields:

- `items`: Solutions
- `items[].id`: Solution ID
- `items[].name`: Name
- `items[].slug`: Slug
- `items[].status`: Status
- `items[].hidden`: Hidden (boolean)
- `items[].applications_count`: Tables (number)
- `items[].records_count`: Records (number)
- `items[].members_count`: Members (number)
- `items[].created`: Created (datetime)
- `items[].updated`: Updated (datetime)
- `count`: Count (number)

### `get_solution`

**Get Solution.** Builder version with a solution picker; agents should use Get Solution (by ID). Returns the solution name, status, permissions and counts. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Solution ID
- `name`: Name
- `slug`: Slug
- `status`: Status
- `hidden`: Hidden (boolean)
- `applications_count`: Tables (number)
- `records_count`: Records (number)
- `members_count`: Members (number)
- `created`: Created (datetime)
- `updated`: Updated (datetime)

### `get_solution_by_id`

**Get Solution (by ID).** Returns one SmartSuite solution by its Solution ID from List Solutions (name, status, permissions, counts). Next: List Tables (by ID) for its tables. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution ID. The SmartSuite solution ID (24 characters). Get it from List Solutions. |

Output fields:

- `id`: Solution ID
- `name`: Name
- `slug`: Slug
- `status`: Status
- `hidden`: Hidden (boolean)
- `applications_count`: Tables (number)
- `records_count`: Records (number)
- `members_count`: Members (number)
- `created`: Created (datetime)
- `updated`: Updated (datetime)

### `list_tables`

**List Tables.** Builder version with a solution picker; agents should use List Tables (by ID). Returns the tables of the solution with ID, name, slug and field count. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `items`: Tables
- `items[].id`: Table ID
- `items[].name`: Name
- `items[].slug`: Slug
- `items[].solution`: Solution ID
- `items[].status`: Status
- `items[].primary_field`: Primary Field Slug
- `items[].fields_count`: Fields (number)
- `count`: Count (number)

### `list_tables_by_id`

**List Tables (by ID).** Returns the tables (SmartSuite calls them applications) in one solution, with ID, name, slug and field count. Needs a Solution ID from List Solutions. Next: Get Table Schema (by ID) to learn the field slugs before reading or writing records. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution ID. The SmartSuite solution ID (24 characters). Get it from List Solutions. |

Output fields:

- `items`: Tables
- `items[].id`: Table ID
- `items[].name`: Name
- `items[].slug`: Slug
- `items[].solution`: Solution ID
- `items[].status`: Status
- `items[].primary_field`: Primary Field Slug
- `items[].fields_count`: Fields (number)
- `count`: Count (number)

### `get_table_schema`

**Get Table Schema.** Builder version with solution and table pickers; agents should use Get Table Schema (by ID). Returns every field of the table with slug, label, type, required/system flags and choices. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Table ID
- `name`: Name
- `slug`: Slug
- `solution`: Solution ID
- `status`: Status
- `primary_field`: Primary Field Slug
- `fields_count`: Fields (number)
- `fields`: Fields
- `fields[].slug`: Field Slug
- `fields[].label`: Label
- `fields[].field_type`: Field Type
- `fields[].required`: Required (boolean)
- `fields[].system`: System Field (boolean)
- `fields[].linked_table_id`: Linked Table ID
- `fields[].choices`: Choices
- `fields[].choices[].label`: Label
- `fields[].choices[].value`: Value

### `get_table_schema_by_id`

**Get Table Schema (by ID).** Returns a SmartSuite table (Table ID from List Tables (by ID)) with every field: slug (the key to use in record JSON), label, type, whether it is required or system-managed, the choice values of select/status fields and the linked table of linked-record fields. Call this before List Records, Create Record (by Table ID), Update Record Fields or the bulk actions. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. The SmartSuite table (application) ID. Get it from List Tables. |

Output fields:

- `id`: Table ID
- `name`: Name
- `slug`: Slug
- `solution`: Solution ID
- `status`: Status
- `primary_field`: Primary Field Slug
- `fields_count`: Fields (number)
- `fields`: Fields
- `fields[].slug`: Field Slug
- `fields[].label`: Label
- `fields[].field_type`: Field Type
- `fields[].required`: Required (boolean)
- `fields[].system`: System Field (boolean)
- `fields[].linked_table_id`: Linked Table ID
- `fields[].choices`: Choices
- `fields[].choices[].label`: Label
- `fields[].choices[].value`: Value

### `bulk_create_records`

**Create Records (Bulk).** Builder version with solution and table pickers; agents should use Create Records (Bulk, by ID). Creates 1-25 records. SmartSuite applies the batch as one request, so it fails or succeeds as a whole. Returns the created records with their ids. Not idempotent: running it again creates duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `records` | JSON | yes |  | Records. JSON array of up to 25 objects keyed by field slug, for example [{"title":"A"},{"title":"B"}]. Use Get Table Schema to see the slugs. |

Output fields:

- `items`: Records
- `items[].id`: Record ID
- `items[].title`: Title
- `items[].application_id`: Table ID
- `items[].application_slug`: Table Slug
- `items[].first_created`: First Created
- `items[].first_created.on`: At (datetime)
- `items[].first_created.by`: By (Member ID)
- `items[].last_updated`: Last Updated
- `items[].last_updated.on`: At (datetime)
- `items[].last_updated.by`: By (Member ID)
- `items[].autonumber`: Auto Number (number)
- `items[].comments_count`: Open Comments (number)
- `items[]`: All Fields (an object whose keys vary)
- `count`: Count (number)

### `bulk_create_records_by_id`

**Create Records (Bulk, by ID).** Creates 1-25 SmartSuite records in one table (Table ID from List Tables (by ID)) with a single request. Records is a JSON array of objects keyed by field slug; call Get Table Schema (by ID) first for slugs and choice values. SmartSuite applies the batch as one request, so it fails or succeeds as a whole. Returns the created records with their ids. Not idempotent: running it again creates duplicates. Next: Update Records (Bulk, by ID) or Get Record (by ID) with the returned ids. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. The SmartSuite table (application) ID. Get it from List Tables. |
| `records` | JSON | yes |  | Records. JSON array of up to 25 objects keyed by field slug, for example [{"title":"A"},{"title":"B"}]. Use Get Table Schema to see the slugs. |

Output fields:

- `items`: Records
- `items[].id`: Record ID
- `items[].title`: Title
- `items[].application_id`: Table ID
- `items[].application_slug`: Table Slug
- `items[].first_created`: First Created
- `items[].first_created.on`: At (datetime)
- `items[].first_created.by`: By (Member ID)
- `items[].last_updated`: Last Updated
- `items[].last_updated.on`: At (datetime)
- `items[].last_updated.by`: By (Member ID)
- `items[].autonumber`: Auto Number (number)
- `items[].comments_count`: Open Comments (number)
- `items[]`: All Fields (an object whose keys vary)
- `count`: Count (number)

### `bulk_update_records`

**Update Records (Bulk).** Builder version with solution and table pickers; agents should use Update Records (Bulk, by ID). Updates 1-25 records. Each item has "id" plus the field slugs to change; omitted fields keep their value. Returns the updated records. Idempotent: sending the same values again leaves the records unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `records` | JSON | yes |  | Records. JSON array of up to 25 objects, each with "id" and the field slugs to change, for example [{"id":"64f...","status":{"value":"complete"}}]. |

Output fields:

- `items`: Records
- `items[].id`: Record ID
- `items[].title`: Title
- `items[].application_id`: Table ID
- `items[].application_slug`: Table Slug
- `items[].first_created`: First Created
- `items[].first_created.on`: At (datetime)
- `items[].first_created.by`: By (Member ID)
- `items[].last_updated`: Last Updated
- `items[].last_updated.on`: At (datetime)
- `items[].last_updated.by`: By (Member ID)
- `items[].autonumber`: Auto Number (number)
- `items[].comments_count`: Open Comments (number)
- `items[]`: All Fields (an object whose keys vary)
- `count`: Count (number)

### `bulk_update_records_by_id`

**Update Records (Bulk, by ID).** Updates 1-25 SmartSuite records in one table (Table ID from List Tables (by ID)) with a single request. Get record ids from List Records and slugs from Get Table Schema (by ID). Each item has "id" plus the field slugs to change; omitted fields keep their value. Returns the updated records. Idempotent: sending the same values again leaves the records unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. The SmartSuite table (application) ID. Get it from List Tables. |
| `records` | JSON | yes |  | Records. JSON array of up to 25 objects, each with "id" and the field slugs to change, for example [{"id":"64f...","status":{"value":"complete"}}]. |

Output fields:

- `items`: Records
- `items[].id`: Record ID
- `items[].title`: Title
- `items[].application_id`: Table ID
- `items[].application_slug`: Table Slug
- `items[].first_created`: First Created
- `items[].first_created.on`: At (datetime)
- `items[].first_created.by`: By (Member ID)
- `items[].last_updated`: Last Updated
- `items[].last_updated.on`: At (datetime)
- `items[].last_updated.by`: By (Member ID)
- `items[].autonumber`: Auto Number (number)
- `items[].comments_count`: Open Comments (number)
- `items[]`: All Fields (an object whose keys vary)
- `count`: Count (number)

### `bulk_delete_records`

**Delete Records (Bulk).** Builder version with solution and table pickers; agents should use Delete Records (Bulk, by ID). Deletes 1-25 records. Moves the records to the solution trash in a single request; they can be brought back with Restore Record. Returns the IDs SmartSuite reports as deleted. Idempotent in effect: deleting records that are already in the trash leaves them deleted. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordIds` | array | yes |  | Record IDs. Up to 25 record IDs to delete. |

Output fields:

- `deletedIds`: Deleted Record IDs
- `count`: Count (number)

### `bulk_delete_records_by_id`

**Delete Records (Bulk, by ID).** Deletes 1-25 SmartSuite records (record IDs from List Records) from one table (Table ID from List Tables (by ID)). Moves the records to the solution trash in a single request; they can be brought back with Restore Record. Returns the IDs SmartSuite reports as deleted. Idempotent in effect: deleting records that are already in the trash leaves them deleted. To undo, use List Deleted Records (by ID) then Restore Record (by ID). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. The SmartSuite table (application) ID. Get it from List Tables. |
| `recordIds` | array | yes |  | Record IDs. Up to 25 record IDs to delete. |

Output fields:

- `deletedIds`: Deleted Record IDs
- `count`: Count (number)

### `upsert_record`

**Create or Update Record.** Builder version with solution, table and field pickers; agents should use Create or Update Record (by ID). One match: patches it. No match: creates a record with the match value (formatted for the field type, for example an array for email fields) plus the fields. More than one match: fails without changing anything. Not atomic: two runs at the same moment can both create. Idempotent for sequential runs with the same input. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `matchField` | string | yes |  | Match Field. The field that identifies the record, for example an email or external ID field. A value the product loads from the provider, such as an id; write the value itself. |
| `matchValue` | string | yes |  | Match Value. |
| `fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `action`: Action
- `record`: Record
- `record.id`: Record ID
- `record.title`: Title
- `record.application_id`: Table ID
- `record.application_slug`: Table Slug
- `record.first_created`: First Created
- `record.first_created.on`: At (datetime)
- `record.first_created.by`: By (Member ID)
- `record.last_updated`: Last Updated
- `record.last_updated.on`: At (datetime)
- `record.last_updated.by`: By (Member ID)
- `record.autonumber`: Auto Number (number)
- `record.comments_count`: Open Comments (number)
- `record`: All Fields (an object whose keys vary)

### `upsert_record_by_id`

**Create or Update Record (by ID).** Looks for a record in the table (Table ID from List Tables) whose Match Field (slug from Get Table Schema (by ID)) equals Match Value. One match: patches it. No match: creates a record with the match value plus the fields. More than one match: fails without changing anything. Not atomic: two runs at the same moment can both create. Idempotent for sequential runs with the same input. If the match field needs another value format, such as an array for email fields, put it in Fields too; Fields wins. Returns action (created/updated) and the record; use its id with Get Record (by ID) or Add Comment (by ID). Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. The SmartSuite table (application) ID. Get it from List Tables. |
| `matchField` | string | yes |  | Match Field Slug. Slug of the field that identifies the record, for example an email or external ID field. Get slugs from Get Table Schema (by ID). |
| `matchValue` | string | yes |  | Match Value. |
| `fields` | JSON | yes |  | Fields. JSON object keyed by field slug with the values to set, for example {"status":{"value":"complete"}}. |

Output fields:

- `action`: Action
- `record`: Record
- `record.id`: Record ID
- `record.title`: Title
- `record.application_id`: Table ID
- `record.application_slug`: Table Slug
- `record.first_created`: First Created
- `record.first_created.on`: At (datetime)
- `record.first_created.by`: By (Member ID)
- `record.last_updated`: Last Updated
- `record.last_updated.on`: At (datetime)
- `record.last_updated.by`: By (Member ID)
- `record.autonumber`: Auto Number (number)
- `record.comments_count`: Open Comments (number)
- `record`: All Fields (an object whose keys vary)

### `list_deleted_records`

**List Deleted Records.** Builder version with a solution picker; agents should use List Deleted Records (by ID). Returns the deleted records (trash) of one SmartSuite solution with record ID, title, table and deletion date. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `items`: Deleted Records
- `items[].id`: Record ID
- `items[].title`: Title
- `items[].application_id`: Table ID
- `items[].application_name`: Table Name
- `items[].solution_id`: Solution ID
- `items[].deleted_by`: Deleted By (Member ID)
- `items[].deleted_date`: Deleted Date
- `items[].deleted_date.date`: Date (datetime)
- `count`: Count (number)

### `list_deleted_records_by_id`

**List Deleted Records (by ID).** Returns the deleted records (trash) of one SmartSuite solution with record ID, title, table and deletion date. Read-only and idempotent. Needs a Solution ID from List Solutions. Next: pass a returned id and application_id to Restore Record (by ID) to bring it back. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution ID. The SmartSuite solution ID (24 characters). Get it from List Solutions. |

Output fields:

- `items`: Deleted Records
- `items[].id`: Record ID
- `items[].title`: Title
- `items[].application_id`: Table ID
- `items[].application_name`: Table Name
- `items[].solution_id`: Solution ID
- `items[].deleted_by`: Deleted By (Member ID)
- `items[].deleted_date`: Deleted Date
- `items[].deleted_date.date`: Date (datetime)
- `count`: Count (number)

### `restore_record`

**Restore Record.** Builder version that picks the record from the table trash; agents should use Restore Record (by ID). Restores one deleted SmartSuite record from the solution trash and returns it keyed by field slug. Idempotent: restoring a record that is not deleted leaves it as it is. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Deleted Record. A record in the trash of the selected table. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Record ID
- `title`: Title
- `application_id`: Table ID
- `application_slug`: Table Slug
- `first_created`: First Created
- `first_created.on`: At (datetime)
- `first_created.by`: By (Member ID)
- `last_updated`: Last Updated
- `last_updated.on`: At (datetime)
- `last_updated.by`: By (Member ID)
- `autonumber`: Auto Number (number)
- `comments_count`: Open Comments (number)

### `restore_record_by_id`

**Restore Record (by ID).** Restores one deleted SmartSuite record from the solution trash and returns it keyed by field slug. Idempotent: restoring a record that is not deleted leaves it as it is. Get the Record ID and its Table ID (application_id) from List Deleted Records (by ID). Next: Get Record (by ID) or Update Record Fields. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. The SmartSuite table (application) ID. Get it from List Tables. |
| `recordId` | string | yes |  | Record ID. The record ID. Get it from List Records or a create step. |

Output fields:

- `id`: Record ID
- `title`: Title
- `application_id`: Table ID
- `application_slug`: Table Slug
- `first_created`: First Created
- `first_created.on`: At (datetime)
- `first_created.by`: By (Member ID)
- `last_updated`: Last Updated
- `last_updated.on`: At (datetime)
- `last_updated.by`: By (Member ID)
- `autonumber`: Auto Number (number)
- `comments_count`: Open Comments (number)

### `list_comments`

**List Comments.** Builder version with solution, table and record pickers; agents should use List Comments (by ID). Returns every comment on the record (author member ID, created time, message HTML and text). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `items`: Comments
- `items[].id`: Comment ID
- `items[].record`: Record ID
- `items[].application`: Table ID
- `items[].solution`: Solution ID
- `items[].member`: Author (Member ID)
- `items[].created_on`: Created On (datetime)
- `items[].message`: Message
- `items[].message.html`: HTML
- `items[].message.preview`: Preview
- `items[].parent_comment`: Parent Comment ID
- `items[].assigned_to`: Assigned To
- `count`: Count (number)

### `list_comments_by_id`

**List Comments (by ID).** Returns every comment on one SmartSuite record (author member ID, created time, message HTML and text). Needs the Record ID from List Records or Get Record (by ID). Resolve author IDs with Get Member (by ID); reply with Add Comment (by ID). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recordId` | string | yes |  | Record ID. The record ID. Get it from List Records or a create step. |

Output fields:

- `items`: Comments
- `items[].id`: Comment ID
- `items[].record`: Record ID
- `items[].application`: Table ID
- `items[].solution`: Solution ID
- `items[].member`: Author (Member ID)
- `items[].created_on`: Created On (datetime)
- `items[].message`: Message
- `items[].message.html`: HTML
- `items[].message.preview`: Preview
- `items[].parent_comment`: Parent Comment ID
- `items[].assigned_to`: Assigned To
- `count`: Count (number)

### `add_comment`

**Add Comment.** Builder version with solution, table, record and member pickers; agents should use Add Comment (by ID). Posts a plain-text comment on one SmartSuite record (line breaks become paragraphs). Record followers are notified. Optionally assigns the comment to a member. Returns the comment with its ID. Not idempotent: each call posts another comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | yes |  | Message. |
| `assignedTo` | string | no |  | Assign To. Optional member to assign the comment to. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Comment ID
- `record`: Record ID
- `application`: Table ID
- `solution`: Solution ID
- `member`: Author (Member ID)
- `created_on`: Created On (datetime)
- `message`: Message
- `message.html`: HTML
- `message.preview`: Preview
- `parent_comment`: Parent Comment ID
- `assigned_to`: Assigned To

### `add_comment_by_id`

**Add Comment (by ID).** Posts a plain-text comment on one SmartSuite record (line breaks become paragraphs). Record followers are notified. Optionally assigns the comment to a member. Returns the comment with its ID. Not idempotent: each call posts another comment. Needs the Table ID (List Tables (by ID)) and Record ID (List Records). Assign To takes a member ID from List Members. Check List Comments (by ID) first if a retry could post a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. The SmartSuite table (application) ID. Get it from List Tables. |
| `recordId` | string | yes |  | Record ID. The record ID. Get it from List Records or a create step. |
| `message` | string | yes |  | Message. |
| `assignedTo` | string | no |  | Assign To (Member ID). Optional member ID to assign the comment to. Get it from List Members. |

Output fields:

- `id`: Comment ID
- `record`: Record ID
- `application`: Table ID
- `solution`: Solution ID
- `member`: Author (Member ID)
- `created_on`: Created On (datetime)
- `message`: Message
- `message.html`: HTML
- `message.preview`: Preview
- `parent_comment`: Parent Comment ID
- `assigned_to`: Assigned To

### `list_members`

**List Members.** Returns one page of SmartSuite workspace members (member ID, full name, emails, role, job title). Use member IDs for user fields and comment assignment. Page with offset. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `100` | Limit. How many items to return in one call (1-1000, default 100). |
| `offset` | number | no | `0` | Offset. How many items to skip. Use the previous offset plus the number of items returned to get the next page. |

Output fields:

- `items`: Members
- `items[].id`: Member ID
- `items[].full_name`: Full Name
- `items[].full_name.sys_root`: Full Name
- `items[].full_name.first_name`: First Name
- `items[].full_name.last_name`: Last Name
- `items[].email`: Emails
- `items[].job_title`: Job Title
- `items[].role`: Role
- `items[].type`: Type
- `items[].timezone`: Time Zone
- `items[].status`: Status
- `items[].status.value`: Value
- `total`: Total Matches (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `hasMore`: Has More (boolean)

### `get_member`

**Get Member.** Builder version with a member picker; agents should use Get Member (by ID). Returns full name, emails, role, job title and time zone. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `memberId` | string | yes |  | Member. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Member ID
- `full_name`: Full Name
- `full_name.sys_root`: Full Name
- `full_name.first_name`: First Name
- `full_name.last_name`: Last Name
- `email`: Emails
- `job_title`: Job Title
- `role`: Role
- `type`: Type
- `timezone`: Time Zone
- `status`: Status
- `status.value`: Value

### `get_member_by_id`

**Get Member (by ID).** Returns one SmartSuite workspace member by member ID (the IDs found in user fields, "by" values, comment authors and List Members): full name, emails, role, job title, time zone. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `memberId` | string | yes |  | Member ID. The member ID. Get it from List Members. |

Output fields:

- `id`: Member ID
- `full_name`: Full Name
- `full_name.sys_root`: Full Name
- `full_name.first_name`: First Name
- `full_name.last_name`: Last Name
- `email`: Emails
- `job_title`: Job Title
- `role`: Role
- `type`: Type
- `timezone`: Time Zone
- `status`: Status
- `status.value`: Value

### `list_teams`

**List Teams.** Returns one page of SmartSuite teams with team ID, name, owner IDs and member IDs. Page with offset. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `100` | Limit. How many items to return in one call (1-1000, default 100). |
| `offset` | number | no | `0` | Offset. How many items to skip. Use the previous offset plus the number of items returned to get the next page. |

Output fields:

- `items`: Teams
- `items[].id`: Team ID
- `items[].name`: Name
- `items[].owners`: Owner IDs
- `items[].members`: Member IDs
- `total`: Total Matches (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `hasMore`: Has More (boolean)

### `download_record_file`

**Get File Download URLs.** Builder version that picks the record and Files & Images field; agents should use Get File Download URL (by Handle). Returns a temporary URL for each file in the field (up to 50). Files are not downloaded. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record. A value the product loads from the provider, such as an id; write the value itself. |
| `field` | string | yes |  | File Field. The Files & Images field to read. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `recordId`: Record ID
- `field`: File Field Slug
- `files`: Files
- `files[].handle`: File Handle
- `files[].name`: File Name
- `files[].url`: Download URL (url)
- `count`: Count (number)

### `download_record_file_by_handle`

**Get File Download URL (by Handle).** Returns a temporary download URL for one SmartSuite file, given its file handle (the "handle" value inside a Files & Images field of a record from Get Record (by ID) or List Records). The file itself is not downloaded; the URL expires, so use it soon. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileHandle` | string | yes |  | File Handle. The "handle" of the file, found in the record's Files & Images field. |

Output fields:

- `handle`: File Handle
- `url`: Download URL (url)

### `create_table`

**Create Table.** Builder version with a solution picker; agents should use Create Table (by ID). SmartSuite adds its default fields (Title, Description, Assigned To, Status, Due Date, Priority and system fields). Needs permission to change the solution. Returns the table and its fields. Not idempotent: each call creates another table. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Table Name. |

Output fields:

- `id`: Table ID
- `name`: Name
- `slug`: Slug
- `solution`: Solution ID
- `status`: Status
- `primary_field`: Primary Field Slug
- `fields_count`: Fields (number)
- `fields`: Fields
- `fields[].slug`: Field Slug
- `fields[].label`: Label
- `fields[].field_type`: Field Type
- `fields[].required`: Required (boolean)
- `fields[].system`: System Field (boolean)
- `fields[].linked_table_id`: Linked Table ID
- `fields[].choices`: Choices
- `fields[].choices[].label`: Label
- `fields[].choices[].value`: Value

### `create_table_by_id`

**Create Table (by ID).** Creates a new SmartSuite table (application) in a solution (Solution ID from List Solutions). SmartSuite adds its default fields (Title, Description, Assigned To, Status, Due Date, Priority and system fields). Needs permission to change the solution. Returns the table and its fields. Not idempotent: each call creates another table. Check List Tables (by ID) first to avoid a duplicate name. Next: Add Field (by ID) with the returned id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution ID. The SmartSuite solution ID (24 characters). Get it from List Solutions. |
| `name` | string | yes |  | Table Name. |

Output fields:

- `id`: Table ID
- `name`: Name
- `slug`: Slug
- `solution`: Solution ID
- `status`: Status
- `primary_field`: Primary Field Slug
- `fields_count`: Fields (number)
- `fields`: Fields
- `fields[].slug`: Field Slug
- `fields[].label`: Label
- `fields[].field_type`: Field Type
- `fields[].required`: Required (boolean)
- `fields[].system`: System Field (boolean)
- `fields[].linked_table_id`: Linked Table ID
- `fields[].choices`: Choices
- `fields[].choices[].label`: Label
- `fields[].choices[].value`: Value

### `add_field`

**Add Field.** Builder version with solution and table pickers; agents should use Add Field (by ID). Adds one field: text, text area, number, currency, percent, date, yes/no, email, link, single or multiple select (with choices) or files. Changes the table schema for everyone using it and needs permission to edit the solution. Returns the new field with its slug. Not idempotent: each call adds another field. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `solutionId` | string | yes |  | Solution. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table. A value the product loads from the provider, such as an id; write the value itself. |
| `label` | string | yes |  | Field Label. |
| `fieldType` | string | yes |  | Field Type. One of `"textfield"`, `"textareafield"`, `"numberfield"`, `"currencyfield"`, `"percentfield"`, `"datefield"`, `"yesnofield"`, `"emailfield"`, `"linkfield"`, `"singleselectfield"`, `"multipleselectfield"`, `"filefield"`. |
| `choices` | array | no |  | Choices. Options for a single or multiple select field. |
| `slug` | string | no |  | Field Slug. Optional key for the field (lowercase letters, digits and _, starting with a letter, up to 30 characters). Generated when empty. |

Output fields:

- `tableId`: Table ID
- `field`: Field
- `field.slug`: Field Slug
- `field.label`: Label
- `field.field_type`: Field Type
- `field.required`: Required (boolean)
- `field.system`: System Field (boolean)
- `field.linked_table_id`: Linked Table ID
- `field.choices`: Choices
- `field.choices[].label`: Label
- `field.choices[].value`: Value

### `add_field_by_id`

**Add Field (by ID).** Adds a field to a SmartSuite table (Table ID from List Tables (by ID)). Adds one field: text, text area, number, currency, percent, date, yes/no, email, link, single or multiple select (with choices) or files. Changes the table schema for everyone using it and needs permission to edit the solution. Returns the new field with its slug. Not idempotent: each call adds another field. Check Get Table Schema (by ID) first so you do not add a field that already exists; use the returned slug in record JSON. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. The SmartSuite table (application) ID. Get it from List Tables. |
| `label` | string | yes |  | Field Label. |
| `fieldType` | string | yes |  | Field Type. One of `"textfield"`, `"textareafield"`, `"numberfield"`, `"currencyfield"`, `"percentfield"`, `"datefield"`, `"yesnofield"`, `"emailfield"`, `"linkfield"`, `"singleselectfield"`, `"multipleselectfield"`, `"filefield"`. |
| `choices` | array | no |  | Choices. Options for a single or multiple select field. |
| `slug` | string | no |  | Field Slug. Optional key for the field (lowercase letters, digits and _, starting with a letter, up to 30 characters). Generated when empty. |

Output fields:

- `tableId`: Table ID
- `field`: Field
- `field.slug`: Field Slug
- `field.label`: Label
- `field.field_type`: Field Type
- `field.required`: Required (boolean)
- `field.system`: System Field (boolean)
- `field.linked_table_id`: Linked Table ID
- `field.choices`: Choices
- `field.choices[].label`: Label
- `field.choices[].value`: Value

### `list_records`

**List Records (by Table ID).** Returns one page of records from a SmartSuite table, keyed by field slug, plus total and hasMore. Filter is SmartSuite filter JSON, for example {"operator":"and","fields":[{"field":"status","comparison":"is","value":"complete"}]}; sort is an array like [{"field":"first_created","direction":"desc"}]. Use Get Table Schema (by ID) to learn field slugs. Page with offset. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. The SmartSuite table (application) ID. Get it from List Tables. |
| `filter` | JSON | no |  | Filter. SmartSuite filter object: {"operator":"and"\|"or","fields":[{"field":"<slug>","comparison":"is","value":"..."}]}. Leave empty for all records. |
| `sort` | JSON | no |  | Sort. Array of {"field":"<slug>","direction":"asc"\|"desc"}. |
| `limit` | number | no | `100` | Limit. How many items to return in one call (1-1000, default 100). |
| `offset` | number | no | `0` | Offset. How many items to skip. Use the previous offset plus the number of items returned to get the next page. |

Output fields:

- `items`: Records
- `items[].id`: Record ID
- `items[].title`: Title
- `items[].application_id`: Table ID
- `items[].application_slug`: Table Slug
- `items[].first_created`: First Created
- `items[].first_created.on`: At (datetime)
- `items[].first_created.by`: By (Member ID)
- `items[].last_updated`: Last Updated
- `items[].last_updated.on`: At (datetime)
- `items[].last_updated.by`: By (Member ID)
- `items[].autonumber`: Auto Number (number)
- `items[].comments_count`: Open Comments (number)
- `items[]`: All Fields (an object whose keys vary)
- `total`: Total Matches (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `hasMore`: Has More (boolean)

### `get_record_by_id`

**Get Record (by ID).** Returns one SmartSuite record with values keyed by field slug (the same keys you pass to create or update). Needs the Table ID (List Tables (by ID)) and Record ID (List Records). Next: Update Record Fields to change it, List Comments (by ID) for its discussion, or Get File Download URL (by Handle) for file handles. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. The SmartSuite table (application) ID. Get it from List Tables. |
| `recordId` | string | yes |  | Record ID. The record ID. Get it from List Records or a create step. |

Output fields:

- `id`: Record ID
- `title`: Title
- `application_id`: Table ID
- `application_slug`: Table Slug
- `first_created`: First Created
- `first_created.on`: At (datetime)
- `first_created.by`: By (Member ID)
- `last_updated`: Last Updated
- `last_updated.on`: At (datetime)
- `last_updated.by`: By (Member ID)
- `autonumber`: Auto Number (number)
- `comments_count`: Open Comments (number)

### `create_record_by_id`

**Create Record (by Table ID).** Creates one SmartSuite record. Fields is a JSON object keyed by field slug, in SmartSuite's value format: text/number as plain values, single select as the choice value, status as {"value":"<choice>"}, date as {"date":"2026-10-12T00:00:00Z","include_time":false}, linked records/users as arrays of IDs, emails and links as arrays of strings. Get slugs and choice values from Get Table Schema (by ID). Returns the created record with its id. Not idempotent: each call creates another record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. The SmartSuite table (application) ID. Get it from List Tables. |
| `fields` | JSON | yes |  | Fields. JSON object keyed by field slug, for example {"title": "New task", "priority": "high"}. |

Output fields:

- `id`: Record ID
- `title`: Title
- `application_id`: Table ID
- `application_slug`: Table Slug
- `first_created`: First Created
- `first_created.on`: At (datetime)
- `first_created.by`: By (Member ID)
- `last_updated`: Last Updated
- `last_updated.on`: At (datetime)
- `last_updated.by`: By (Member ID)
- `autonumber`: Auto Number (number)
- `comments_count`: Open Comments (number)

### `update_record_fields`

**Update Record Fields (by ID).** Patches one SmartSuite record. Only the slugs present in Fields are changed; omitted fields keep their value. To clear a field send its empty value ("" for text, [] for lists, null for single values). Same value format as Create Record (by Table ID). Returns the updated record. Idempotent: sending the same fields again leaves the record unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. The SmartSuite table (application) ID. Get it from List Tables. |
| `recordId` | string | yes |  | Record ID. The record ID. Get it from List Records or a create step. |
| `fields` | JSON | yes |  | Fields. JSON object keyed by field slug with the new values. |

Output fields:

- `id`: Record ID
- `title`: Title
- `application_id`: Table ID
- `application_slug`: Table Slug
- `first_created`: First Created
- `first_created.on`: At (datetime)
- `first_created.by`: By (Member ID)
- `last_updated`: Last Updated
- `last_updated.on`: At (datetime)
- `last_updated.by`: By (Member ID)
- `autonumber`: Auto Number (number)
- `comments_count`: Open Comments (number)

### `delete_record_by_id`

**Delete Record (by ID).** Moves one SmartSuite record to the solution trash, given the Table ID and Record ID. It can be brought back with Restore Record (by ID). Use Delete Records (Bulk, by ID) for several. Idempotent: deleting a record already in the trash succeeds again, and a record that no longer exists (404) returns alreadyDeleted true. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. The SmartSuite table (application) ID. Get it from List Tables. |
| `recordId` | string | yes |  | Record ID. The record ID. Get it from List Records or a create step. |

Output fields:

- `id`: Record ID
- `deleted`: Deleted (boolean)
- `alreadyDeleted`: Already Deleted (boolean)

### `attach_file_by_id`

**Attach File to Record (by ID).** Uploads one file (a file URL or file from an earlier step, up to 100 MB) into a Files & Images field of a SmartSuite record, given Table ID, Record ID and the field slug (field_type filefield in Get Table Schema (by ID)). Returns the files now in that field with their handles. Not idempotent: each call adds another attachment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tableId` | string | yes |  | Table ID. The SmartSuite table (application) ID. Get it from List Tables. |
| `recordId` | string | yes |  | Record ID. The record ID. Get it from List Records or a create step. |
| `fieldSlug` | string | yes |  | File Field Slug. Slug of a Files & Images field. Get it from Get Table Schema. |
| `file` | file | yes |  | File. The file to upload (up to 100 MB). Files are not supported; an action that needs one fails. |

Output fields:

- `recordId`: Record ID
- `field`: File Field Slug
- `fileName`: File Name
- `files`: Files In Field
- `files[].handle`: File Handle
- `files[].metadata`: Metadata
- `files[].metadata.filename`: File Name
- `files[].metadata.mimetype`: MIME Type
- `files[].metadata.size`: Size (bytes) (number)
- `files[].created_on`: Created On (datetime)

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
